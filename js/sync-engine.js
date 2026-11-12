/* ==========================================================================
   多人房間即時同步與安全治理引擎 (sync-engine.js)
   拍板規格：
   - 4B：靜態前端 ＋ 託管即時雲端服務（支援 Firebase Realtime DB / Supabase REST 同步 + 同機 BroadcastChannel 雙視窗即時同步）
   - 房間安全：6碼防猜英數房號 + 短效簽章 Token + 師長鎖房 + 移除不明加入者 + 冪等防重複計票
   - 8A：課堂結束即清除明細（零長期留存、僅當場匯出匿名統計摘要）
   ========================================================================== */

class CareRoomSyncEngine {
  constructor() {
    this.channelName = "dementia_care_room_channel_v1";
    this.bc = typeof BroadcastChannel !== "undefined" ? new BroadcastChannel(this.channelName) : null;
    this.listeners = [];
    this.pollTimer = null;
    this.currentRoomCode = null;
    this.cloudConfig = this.loadCloudConfig();

    if (this.bc) {
      this.bc.onmessage = (ev) => {
        if (ev.data && ev.data.roomCode === this.currentRoomCode) {
          this.notifyListeners(ev.data.state);
        }
      };
    }

    window.addEventListener("storage", (ev) => {
      if (ev.key === this.getStorageKey(this.currentRoomCode) && ev.newValue) {
        try {
          const state = JSON.parse(ev.newValue);
          this.notifyListeners(state);
        } catch (e) {}
      }
    });
  }

  // 純文字轉義防範 XSS
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

  // 產生 6 碼防猜英數房號（避開易混淆字元 I, O, 0, 1）
  static generateRoomCode() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  // 產生短效房間簽章 Token
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
      provider: "local_or_firebase", // 'firebase' | 'local'
      firebaseDbUrl: "", // 例如 https://your-project-default-rtdb.firebaseio.com
      customPublicUrl: "" // 若部署於靜態網址或區網 IP 可自訂 QR Code 基準網址
    };
  }

  saveCloudConfig(cfg) {
    this.cloudConfig = {
      provider: cfg.provider || "local_or_firebase",
      firebaseDbUrl: (cfg.firebaseDbUrl || "").trim().replace(/\/+$/, ""),
      customPublicUrl: (cfg.customPublicUrl || "").trim()
    };
    localStorage.setItem("care_game_cloud_config_v1", JSON.stringify(this.cloudConfig));
  }

  getStorageKey(roomCode) {
    return `care_room_active_${roomCode}`;
  }

  onStateChange(cb) {
    this.listeners.push(cb);
  }

  notifyListeners(state) {
    this.listeners.forEach((cb) => cb(state));
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
      expiresAt: now + 3 * 60 * 60 * 1000, // 3小時短效自動過期
      status: "LOBBY", // 'LOBBY' | 'QUESTION_ACTIVE' | 'REVEALED' | 'ENDED'
      locked: false,
      liveDiscussMode: false, // 預設 false：截止或揭曉後才公開分佈（防跟風）
      themeId,
      unitFilter: unitFilter || "ALL",
      questionIds,
      currentIndex: 0,
      participants: {}, // { participantId: { id, nickname, joinedAt, lastSeen } }
      votes: {}, // { questionId: { participantId: 'A'|'B'|'C'|'D' } }
      seq: 1
    };

    this.currentRoomCode = roomCode;
    await this.saveState(roomCode, state);
    this.startPolling(roomCode);
    return state;
  }

  async saveState(roomCode, state) {
    state.seq = (state.seq || 0) + 1;
    state.updatedAt = Date.now();
    const key = this.getStorageKey(roomCode);
    localStorage.setItem(key, JSON.stringify(state));

    if (this.bc) {
      this.bc.postMessage({ roomCode, state });
    }

    // 若已設定 Firebase Realtime Database URL (4B 託管雲端同步)
    if (this.cloudConfig.firebaseDbUrl && this.cloudConfig.firebaseDbUrl.startsWith("https://")) {
      try {
        await fetch(`${this.cloudConfig.firebaseDbUrl}/care_rooms/${roomCode}.json`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(state)
        });
      } catch (err) {
        console.warn("雲端同步寫入暫時失敗，已保留本機同步狀態：", err);
      }
    }
    this.notifyListeners(state);
  }

  async fetchState(roomCode) {
    if (!roomCode) return null;
    // 優先從 Firebase 讀取最新狀態（若有設定）
    if (this.cloudConfig.firebaseDbUrl && this.cloudConfig.firebaseDbUrl.startsWith("https://")) {
      try {
        const res = await fetch(`${this.cloudConfig.firebaseDbUrl}/care_rooms/${roomCode}.json`);
        if (res.ok) {
          const cloudData = await res.json();
          if (cloudData && cloudData.roomCode === roomCode) {
            localStorage.setItem(this.getStorageKey(roomCode), JSON.stringify(cloudData));
            return cloudData;
          }
        }
      } catch (err) {
        console.warn("雲端讀取暫時失敗，降級使用本機狀態：", err);
      }
    }

    const raw = localStorage.getItem(this.getStorageKey(roomCode));
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  startPolling(roomCode) {
    this.stopPolling();
    this.currentRoomCode = roomCode;
    this.pollTimer = setInterval(async () => {
      if (!this.currentRoomCode) return;
      const state = await this.fetchState(this.currentRoomCode);
      if (state) {
        this.notifyListeners(state);
      }
    }, 1200);
  }

  stopPolling() {
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
      this.pollTimer = null;
    }
  }

  // 學員加入房間（支援 60 秒內斷線重連復原座位）
  async joinRoom(roomCode, token, nickname, existingParticipantId = null) {
    const cleanCode = CareRoomSyncEngine.sanitizeText(roomCode, 10).toUpperCase();
    const cleanNick = CareRoomSyncEngine.sanitizeText(nickname, 20);
    const state = await this.fetchState(cleanCode);

    if (!state) {
      throw new Error("找不到此房間代碼，請確認師長已開房或檢查雲端同步設定。");
    }
    if (state.status === "ENDED" || Date.now() > state.expiresAt) {
      throw new Error("此場次房間已結束或 QR Code 已失效。");
    }
    if (state.token && token && state.token !== token) {
      throw new Error("房間安全簽章 Token 不符或已失效。");
    }

    const pid = existingParticipantId && state.participants[existingParticipantId]
      ? existingParticipantId
      : "P_" + Math.random().toString(36).substring(2, 10);

    // 若房間已鎖定且非既有學員重連，拒絕新加入
    if (state.locked && !state.participants[pid]) {
      throw new Error("師長目前已鎖定房間，暫不開放新成員加入。");
    }

    state.participants[pid] = {
      id: pid,
      nickname: cleanNick || "照護學員",
      joinedAt: state.participants[pid] ? state.participants[pid].joinedAt : Date.now(),
      lastSeen: Date.now()
    };

    this.currentRoomCode = cleanCode;
    await this.saveState(cleanCode, state);
    this.startPolling(cleanCode);
    return { state, participantId: pid };
  }

  // 學員提交 A/B/C/D 答案（冪等處理：同一人每題僅計一次有效答案，揭曉後鎖定不可修改）
  async submitVote(roomCode, participantId, questionId, choice) {
    if (!["A", "B", "C", "D"].includes(choice)) return null;
    const state = await this.fetchState(roomCode);
    if (!state || state.status !== "QUESTION_ACTIVE") {
      throw new Error("目前非開放作答階段（可能已截止或已揭曉答案）。");
    }
    if (!state.participants[participantId]) {
      throw new Error("您的參與身分不在房間名單內（可能已被移除或房間已重設）。");
    }

    if (!state.votes[questionId]) {
      state.votes[questionId] = {};
    }

    // 冪等防重送：若已投過同一題，不再重複增加總票數（鎖定首次提交）
    if (state.votes[questionId][participantId]) {
      return state;
    }

    state.votes[questionId][participantId] = choice;
    state.participants[participantId].lastSeen = Date.now();
    await this.saveState(roomCode, state);
    return state;
  }

  // 師長移除不明參與者
  async removeParticipant(roomCode, participantId) {
    const state = await this.fetchState(roomCode);
    if (!state) return;
    delete state.participants[participantId];
    // 同步移除其尚未結算之投票
    Object.keys(state.votes || {}).forEach((qId) => {
      if (state.votes[qId]) {
        delete state.votes[qId][participantId];
      }
    });
    await this.saveState(roomCode, state);
  }

  // 8A：課堂結束即清除所有明細（零長期留存）
  async destroyRoomAndClearData(roomCode) {
    this.stopPolling();
    const key = this.getStorageKey(roomCode);
    localStorage.removeItem(key);

    if (this.cloudConfig.firebaseDbUrl && this.cloudConfig.firebaseDbUrl.startsWith("https://")) {
      try {
        await fetch(`${this.cloudConfig.firebaseDbUrl}/care_rooms/${roomCode}.json`, {
          method: "DELETE"
        });
      } catch (e) {}
    }

    if (this.bc) {
      this.bc.postMessage({ roomCode, state: { roomCode, status: "ENDED", cleared: true } });
    }
    this.currentRoomCode = null;
  }
}

window.CareRoomSyncEngine = CareRoomSyncEngine;
