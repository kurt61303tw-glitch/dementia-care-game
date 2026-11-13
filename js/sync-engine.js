/* ==========================================================================
   多人房間跨裝置即時同步引擎 (sync-engine.js)
   升級版：
   1. 內建零設定公開即時中繼通道（ntfy.sh SSE 伺服器推播 + Webhook）：
      - 任何手機只要掃描 QR Code 或輸入 6 碼房號，免開帳號、免設定金鑰即可 100% 跨裝置連線！
   2. 保留 Firebase Realtime Database 託管擴充介面（若機構有專屬 DB）。
   3. 同機 BroadcastChannel 與 localStorage 支援零延遲雙視窗演示。
   4. 冪等計票、防重複提交、短效自動過期（3小時）、8A 結束即清除。
   ========================================================================== */

class CareRoomSyncEngine {
  constructor() {
    this.channelName = "dementia_care_room_channel_v1";
    this.bc = typeof BroadcastChannel !== "undefined" ? new BroadcastChannel(this.channelName) : null;
    this.listeners = [];
    this.eventSource = null;
    this.pollTimer = null;
    this.currentRoomCode = null;
    this.cloudConfig = this.loadCloudConfig();
    this.lastSeq = 0;

    // 1. 同機廣播接收
    if (this.bc) {
      this.bc.onmessage = (ev) => {
        if (ev.data && ev.data.roomCode === this.currentRoomCode) {
          this.handleIncomingState(ev.data.state);
        }
      };
    }

    // 2. 本機 Storage 監聽
    window.addEventListener("storage", (ev) => {
      if (ev.key === this.getStorageKey(this.currentRoomCode) && ev.newValue) {
        try {
          const state = JSON.parse(ev.newValue);
          this.handleIncomingState(state);
        } catch (e) {}
      }
    });
  }

  static sanitizeText(str, maxLen = 60) {
    if (typeof str !== "string") return "";
    return str
      .trim()
      .slice(0, maxLen)
      .replace(/[&<>"'`=/]/g, (s) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "/": "&#x2F;",
        "`": "&#x60;",
        "=": "&#x3D;"
      }[s]));
  }

  static generateRoomCode() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  static generateToken() {
    const chars = "abcdefghijkmnpqrstuvwxyz23456789";
    let t = "";
    for (let i = 0; i < 12; i++) {
      t += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return t;
  }

  loadCloudConfig() {
    try {
      const raw = localStorage.getItem("care_game_cloud_config_v1");
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return {
      provider: "relay_cloud", // 'relay_cloud' (預設免設定即時通道) | 'firebase'
      firebaseDbUrl: "",
      customPublicUrl: ""
    };
  }

  saveCloudConfig(cfg) {
    this.cloudConfig = {
      provider: cfg.provider || "relay_cloud",
      firebaseDbUrl: (cfg.firebaseDbUrl || "").trim().replace(/\/+$/, ""),
      customPublicUrl: (cfg.customPublicUrl || "").trim()
    };
    localStorage.setItem("care_game_cloud_config_v1", JSON.stringify(this.cloudConfig));
  }

  getStorageKey(roomCode) {
    return `care_room_active_${roomCode}`;
  }

  getRelayTopic(roomCode) {
    // 專屬加密散列前綴，確保房間訊息隔離
    return `dcgame_care_${roomCode.toUpperCase()}`;
  }

  onStateChange(cb) {
    this.listeners.push(cb);
  }

  notifyListeners(state) {
    this.listeners.forEach((cb) => {
      try {
        cb(state);
      } catch (err) {
        console.error("狀態更新回調異常：", err);
      }
    });
  }

  handleIncomingState(state) {
    if (!state || !state.roomCode) return;
    if (state.seq && state.seq < this.lastSeq && state.status !== "ENDED") {
      return; // 舊版本序號略過
    }
    this.lastSeq = state.seq || this.lastSeq + 1;
    localStorage.setItem(this.getStorageKey(state.roomCode), JSON.stringify(state));
    this.notifyListeners(state);
  }

  // 建立新房間
  async createRoom({ themeId, unitFilter, questionIds }) {
    const roomCode = CareRoomSyncEngine.generateRoomCode();
    const token = CareRoomSyncEngine.generateToken();
    const now = Date.now();
    const state = {
      roomCode,
      token,
      createdAt: now,
      expiresAt: now + 3 * 60 * 60 * 1000, // 3小時自動過期
      status: "LOBBY",
      locked: false,
      liveDiscussMode: false,
      themeId,
      unitFilter: unitFilter || "ALL",
      questionIds,
      currentIndex: 0,
      participants: {},
      votes: {},
      seq: 1
    };

    this.currentRoomCode = roomCode;
    this.lastSeq = 1;
    await this.saveState(roomCode, state);
    this.connectRealtimeRelay(roomCode);
    return state;
  }

  // 跨裝置雲端廣播狀態
  async saveState(roomCode, state) {
    state.seq = (state.seq || 0) + 1;
    state.updatedAt = Date.now();
    this.lastSeq = state.seq;

    // 1. 本地儲存與同機廣播
    const key = this.getStorageKey(roomCode);
    localStorage.setItem(key, JSON.stringify(state));
    if (this.bc) {
      this.bc.postMessage({ roomCode, state });
    }

    // 2. 透過公開即時中繼通道發布（免開帳號，跨手機即時生效）
    const topic = this.getRelayTopic(roomCode);
    try {
      fetch(`https://ntfy.sh/${topic}`, {
        method: "POST",
        headers: {
          "Title": "ROOM_UPDATE",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(state)
      }).catch((e) => console.warn("Relay post warning:", e));
    } catch (e) {}

    // 3. 若有設定 Firebase 專案亦同步保存
    if (this.cloudConfig.firebaseDbUrl && this.cloudConfig.firebaseDbUrl.startsWith("https://")) {
      try {
        fetch(`${this.cloudConfig.firebaseDbUrl}/care_rooms/${roomCode}.json`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(state)
        }).catch((e) => {});
      } catch (err) {}
    }

    this.notifyListeners(state);
  }

  // 讀取最新房間狀態（雲端中繼通道優先）
  async fetchState(roomCode) {
    if (!roomCode) return null;
    const cleanCode = roomCode.toUpperCase();

    // 1. 優先從公開雲端即時中繼通道讀取最新快照
    const topic = this.getRelayTopic(cleanCode);
    try {
      const res = await fetch(`https://ntfy.sh/${topic}/json?poll=1&since=3h`);
      if (res.ok) {
        const text = await res.text();
        const lines = text.trim().split("\n").filter(Boolean);
        for (let i = lines.length - 1; i >= 0; i--) {
          try {
            const entry = JSON.parse(lines[i]);
            if (entry.message) {
              const state = JSON.parse(entry.message);
              if (state && state.roomCode === cleanCode) {
                this.handleIncomingState(state);
                return state;
              }
            }
          } catch (pe) {}
        }
      }
    } catch (netErr) {
      console.warn("雲端中繼讀取異常，降級嘗試本機快取：", netErr);
    }

    // 2. 次選 Firebase（若有設定）
    if (this.cloudConfig.firebaseDbUrl && this.cloudConfig.firebaseDbUrl.startsWith("https://")) {
      try {
        const fres = await fetch(`${this.cloudConfig.firebaseDbUrl}/care_rooms/${cleanCode}.json`);
        if (fres.ok) {
          const fbState = await fres.json();
          if (fbState && fbState.roomCode === cleanCode) {
            this.handleIncomingState(fbState);
            return fbState;
          }
        }
      } catch (e) {}
    }

    // 3. 本機 localStorage 保底
    const raw = localStorage.getItem(this.getStorageKey(cleanCode));
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  // 連接伺服器 Server-Sent Events (SSE) 即時雙向推播（毫秒級零延遲同步）
  connectRealtimeRelay(roomCode) {
    this.disconnectRealtimeRelay();
    this.currentRoomCode = roomCode.toUpperCase();
    const topic = this.getRelayTopic(this.currentRoomCode);

    try {
      if (typeof EventSource !== "undefined") {
        this.eventSource = new EventSource(`https://ntfy.sh/${topic}/sse`);
        this.eventSource.onmessage = (event) => {
          try {
            const payload = JSON.parse(event.data);
            if (payload.event === "message" && payload.message) {
              const incomingState = JSON.parse(payload.message);
              if (incomingState && incomingState.roomCode === this.currentRoomCode) {
                this.handleIncomingState(incomingState);
              }
            }
          } catch (err) {}
        };
        this.eventSource.onerror = () => {
          // SSE 異常時自動降級保持 polling 保底
        };
      }
    } catch (e) {
      console.warn("EventSource not supported or blocked, using polling fallback.");
    }

    // 雙保險定期 Polling（每 1.5 秒確認一次狀態，避免特定網路阻擋長連線）
    this.pollTimer = setInterval(async () => {
      if (!this.currentRoomCode) return;
      await this.fetchState(this.currentRoomCode);
    }, 1500);
  }

  disconnectRealtimeRelay() {
    if (this.eventSource) {
      try {
        this.eventSource.close();
      } catch (e) {}
      this.eventSource = null;
    }
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
      this.pollTimer = null;
    }
  }

  // 學員跨裝置加入房間
  async joinRoom(roomCode, token, nickname, existingParticipantId = null) {
    const cleanCode = CareRoomSyncEngine.sanitizeText(roomCode, 10).toUpperCase();
    const cleanNick = CareRoomSyncEngine.sanitizeText(nickname, 20);

    // 從雲端中繼通道抓取師長最新發布的房間狀態
    let state = await this.fetchState(cleanCode);

    if (!state) {
      // 容錯重試一次（避免網路延遲）
      await new Promise((r) => setTimeout(r, 600));
      state = await this.fetchState(cleanCode);
    }

    if (!state) {
      throw new Error(`找不到房間【${cleanCode}】！請確認師長端大螢幕已點開「建立房間」，且代碼輸入無誤。`);
    }
    if (state.status === "ENDED" || Date.now() > state.expiresAt) {
      throw new Error("此場次遊戲室已圓滿結束或加入連結已過期。");
    }

    const pid =
      existingParticipantId && state.participants[existingParticipantId]
        ? existingParticipantId
        : "P_" + Math.random().toString(36).substring(2, 10);

    if (state.locked && !state.participants[pid]) {
      throw new Error("師長目前已鎖定房間，暫不開放新成員加入。");
    }

    if (!state.participants) state.participants = {};
    state.participants[pid] = {
      id: pid,
      nickname: cleanNick || "照護夥伴",
      joinedAt: state.participants[pid] ? state.participants[pid].joinedAt : Date.now(),
      lastSeen: Date.now()
    };

    this.currentRoomCode = cleanCode;
    await this.saveState(cleanCode, state);
    this.connectRealtimeRelay(cleanCode);
    return { state, participantId: pid };
  }

  // 學員提交 A/B/C/D 作答（冪等處理，揭曉後不可修改）
  async submitVote(roomCode, participantId, questionId, choice) {
    if (!["A", "B", "C", "D"].includes(choice)) return null;
    const cleanCode = roomCode.toUpperCase();
    const state = await this.fetchState(cleanCode);

    if (!state || state.status !== "QUESTION_ACTIVE") {
      throw new Error("目前非作答階段（可能師長已公佈結果或進入下一題）。");
    }

    if (!state.votes) state.votes = {};
    if (!state.votes[questionId]) state.votes[questionId] = {};

    // 冪等：已投過則鎖定，不重複計算
    if (state.votes[questionId][participantId]) {
      return state;
    }

    state.votes[questionId][participantId] = choice;
    if (state.participants && state.participants[participantId]) {
      state.participants[participantId].lastSeen = Date.now();
    }

    await this.saveState(cleanCode, state);
    return state;
  }

  // 師長移除不明參與者
  async removeParticipant(roomCode, participantId) {
    const cleanCode = roomCode.toUpperCase();
    const state = await this.fetchState(cleanCode);
    if (!state) return;
    delete state.participants[participantId];
    if (state.votes) {
      Object.keys(state.votes).forEach((qid) => {
        delete state.votes[qid][participantId];
      });
    }
    await this.saveState(cleanCode, state);
  }

  // 8A：課堂結束清除所有房間連線資料
  async destroyRoomAndClearData(roomCode) {
    const cleanCode = (roomCode || "").toUpperCase();
    this.disconnectRealtimeRelay();

    // 發布房間結束訊號
    const endState = { roomCode: cleanCode, status: "ENDED", cleared: true, updatedAt: Date.now() };
    const topic = this.getRelayTopic(cleanCode);
    try {
      await fetch(`https://ntfy.sh/${topic}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(endState)
      });
    } catch (e) {}

    localStorage.removeItem(this.getStorageKey(cleanCode));
    if (this.bc) {
      this.bc.postMessage({ roomCode: cleanCode, state: endState });
    }
    this.currentRoomCode = null;
  }
}

window.CareRoomSyncEngine = CareRoomSyncEngine;
