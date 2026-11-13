/* ==========================================================================
   多人房間跨裝置即時同步引擎 (sync-engine.js)
   落實冠樺拍板之雙軌決策：
   - 1A (MQTT 雙軌高可用 WSS 通道 + 支援 Firebase 4B)
   - 2A (純匿名、課堂結束即焚 8A 醫療長照隱私規範)
   - 3A (手機 3 秒未連上自動提示外開 Safari/Chrome，大螢幕保留大字投影/舉牌模式)
   ========================================================================== */

class CareRoomSyncEngine {
  constructor() {
    this.channelName = "dementia_care_room_channel_v1";
    this.bc = typeof BroadcastChannel !== "undefined" ? new BroadcastChannel(this.channelName) : null;
    this.listeners = [];
    this.currentRoomCode = null;
    this.cloudConfig = this.loadCloudConfig();
    this.lastSeq = 0;
    this.mqttClient = null;
    this.mqttConnected = false;
    this.isHost = false;
    this.pendingJoin = null;

    // 雙軌公共 Broker 輪替集（標準 WSS TLS 443/8084/8884 端點）
    this.mqttBrokers = [
      { url: "wss://broker.emqx.io:8084/mqtt", name: "EMQX" },
      { url: "wss://broker.hivemq.com:8884/mqtt", name: "HiveMQ" }
    ];
    this.currentBrokerIdx = 0;

    // 1. 同機廣播接收（雙視窗 0 延遲極速演示）
    if (this.bc) {
      this.bc.onmessage = (ev) => {
        if (ev.data && ev.data.roomCode === this.currentRoomCode) {
          this.handleIncomingState(ev.data.state);
        }
      };
    }

    // 2. 本機 Storage 監聽
    if (typeof window !== "undefined" && window.addEventListener) {
      window.addEventListener("storage", (ev) => {
        if (ev.key === this.getStorageKey(this.currentRoomCode) && ev.newValue) {
          try {
            const state = JSON.parse(ev.newValue);
            this.handleIncomingState(state);
          } catch (e) {}
        }
      });

      // 3. LINE / Safari 前背景切換自動重連 (visibilitychange)
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible" && this.currentRoomCode) {
          if (!this.mqttConnected) {
            this.initMqtt(this.currentRoomCode, this.isHost);
          }
          this.fetchState(this.currentRoomCode);
        }
      });
    }
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
      provider: "relay_cloud",
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
    return `care_room_state_${(roomCode || "").toUpperCase()}`;
  }

  getLocalState(roomCode) {
    if (!roomCode) return null;
    const raw = localStorage.getItem(this.getStorageKey(roomCode));
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  onStateChange(callback) {
    if (typeof callback === "function") {
      this.listeners.push(callback);
    }
  }

  notifyListeners(state) {
    this.listeners.forEach((fn) => {
      try {
        fn(state);
      } catch (err) {
        console.error("狀態監聽回呼例外：", err);
      }
    });
  }

  handleIncomingState(state) {
    if (!state || !state.roomCode) return;
    if (state.seq && state.seq < this.lastSeq && state.status !== "ENDED") {
      return;
    }
    this.lastSeq = state.seq || this.lastSeq + 1;
    localStorage.setItem(this.getStorageKey(state.roomCode), JSON.stringify(state));
    this.notifyListeners(state);
  }

  // ==================== MQTT 雙軌即時通道核心 ====================

  initMqtt(roomCode, isHost = false) {
    if (typeof window === "undefined" || !window.Paho || !window.Paho.MQTT) {
      console.warn("Paho MQTT 尚未載入，採用本機/Firebase 模式");
      return;
    }

    this.isHost = isHost;
    this.currentRoomCode = roomCode.toUpperCase();
    const cleanCode = this.currentRoomCode;

    if (this.mqttClient) {
      try {
        this.mqttClient.disconnect();
      } catch (e) {}
      this.mqttClient = null;
    }

    const broker = this.mqttBrokers[this.currentBrokerIdx % this.mqttBrokers.length];
    const clientId = "care_" + (isHost ? "h_" : "s_") + Math.random().toString(36).substring(2, 9);

    try {
      // 關鍵：使用 2 個參數傳入完整 wss:// URI，確保走 TLS 443 安全連線
      this.mqttClient = new window.Paho.MQTT.Client(broker.url, clientId);

      this.mqttClient.onConnectionLost = (resp) => {
        this.mqttConnected = false;
        console.warn(`[SyncEngine] MQTT 離線 (${broker.name})：`, resp.errorMessage);
        setTimeout(() => {
          if (this.currentRoomCode === cleanCode) {
            this.currentBrokerIdx++;
            this.initMqtt(cleanCode, this.isHost);
          }
        }, 2000);
      };

      this.mqttClient.onMessageArrived = (message) => {
        const topic = message.destinationName;
        const payloadStr = message.payloadString;
        try {
          const data = JSON.parse(payloadStr);

          // 1. 收到房間狀態最新廣播 (所有裝置)
          if (topic === `cargame/room/${cleanCode}/state`) {
            this.handleIncomingState(data);
          }
          // 2. 師長收到學員動作 (JOIN / VOTE)
          else if (this.isHost && topic === `cargame/room/${cleanCode}/actions`) {
            this.handleHostAction(cleanCode, data);
          }
        } catch (e) {
          console.warn("MQTT 封包解析異常：", e);
        }
      };

      this.mqttClient.connect({
        useSSL: true,
        mqttVersion: 4, // 關鍵：設定 MQTT 3.1.1 (標準 subprotocol 'mqtt')
        timeout: 5,
        keepAliveInterval: 30,
        cleanSession: true,
        onSuccess: () => {
          this.mqttConnected = true;
          console.log(`[SyncEngine] ✅ 已連線至雲端即時通道 (${broker.name})，房間：${cleanCode}`);

          // 訂閱房間狀態主題
          this.mqttClient.subscribe(`cargame/room/${cleanCode}/state`, { qos: 1 });

          // 師長端額外訂閱學員動作主題
          if (this.isHost) {
            this.mqttClient.subscribe(`cargame/room/${cleanCode}/actions`, { qos: 1 });
            const curState = this.getLocalState(cleanCode);
            if (curState) this.publishRoomState(cleanCode, curState);
          } else {
            // 學員端連線成功：若有待發送的加入動作，立即發送！
            if (this.pendingJoin) {
              this.sendJoinAction(cleanCode, this.pendingJoin.participantId, this.pendingJoin.nickname, this.pendingJoin.token);
            }
          }
        },
        onFailure: (err) => {
          this.mqttConnected = false;
          console.warn(`[SyncEngine] MQTT 連線失敗 (${broker.name})，切換備用中繼：`, err);
          this.currentBrokerIdx++;
          setTimeout(() => {
            if (this.currentRoomCode === cleanCode) {
              this.initMqtt(cleanCode, this.isHost);
            }
          }, 1500);
        }
      });
    } catch (err) {
      console.warn("MQTT 初始化失敗：", err);
    }
  }

  // 學員發送加入動作
  sendJoinAction(roomCode, participantId, nickname, token) {
    if (!this.mqttClient || !this.mqttConnected) return;
    try {
      const msg = new window.Paho.MQTT.Message(
        JSON.stringify({
          type: "JOIN",
          participantId,
          nickname: nickname || "照護夥伴",
          token: token || "",
          timestamp: Date.now()
        })
      );
      msg.destinationName = `cargame/room/${roomCode}/actions`;
      msg.qos = 1;
      this.mqttClient.send(msg);
      console.log(`[SyncEngine] 已發送 JOIN 動作至 cargame/room/${roomCode}/actions`);
    } catch (e) {
      console.warn("發送 JOIN 動作異常：", e);
    }
  }

  // 師長處理學員發送的 JOIN / VOTE 動作
  async handleHostAction(roomCode, action) {
    if (!action || !action.type) return;
    const curState = this.getLocalState(roomCode);
    if (!curState) return;

    if (action.type === "JOIN") {
      if (!curState.participants) curState.participants = {};
      const pid = action.participantId;
      if (pid) {
        curState.participants[pid] = {
          id: pid,
          nickname: action.nickname || "照護夥伴",
          joinedAt: curState.participants[pid] ? curState.participants[pid].joinedAt : Date.now(),
          lastSeen: Date.now()
        };
        console.log(`[Host] 學員加入：${action.nickname} (${pid})，總人數：${Object.keys(curState.participants).length}`);
        await this.saveState(roomCode, curState);
      }
    } else if (action.type === "VOTE") {
      if (curState.status === "QUESTION_ACTIVE") {
        const { questionId, participantId, choice } = action;
        if (["A", "B", "C", "D"].includes(choice)) {
          if (!curState.votes) curState.votes = {};
          if (!curState.votes[questionId]) curState.votes[questionId] = {};
          if (!curState.votes[questionId][participantId]) {
            curState.votes[questionId][participantId] = choice;
            if (curState.participants && curState.participants[participantId]) {
              curState.participants[participantId].lastSeen = Date.now();
            }
            console.log(`[Host] 收到投票：${participantId} 投 ${choice}`);
            await this.saveState(roomCode, curState);
          }
        }
      }
    }
  }

  // 發布房間最新狀態（Retained 訊息保證新加入者立即收到）
  publishRoomState(roomCode, state) {
    if (!this.mqttClient || !this.mqttConnected) return;
    try {
      const msg = new window.Paho.MQTT.Message(JSON.stringify(state));
      msg.destinationName = `cargame/room/${roomCode}/state`;
      msg.retained = true;
      msg.qos = 1;
      this.mqttClient.send(msg);
    } catch (e) {
      console.warn("發布 MQTT 狀態異常：", e);
    }
  }

  // ==================== 房間生命週期操作 ====================

  // 建立新房間 (師長端)
  async createRoom({ themeId, unitFilter, questionIds }) {
    const roomCode = CareRoomSyncEngine.generateRoomCode();
    const token = CareRoomSyncEngine.generateToken();
    const now = Date.now();
    const state = {
      roomCode,
      token,
      createdAt: now,
      expiresAt: now + 3 * 60 * 60 * 1000,
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

    // 1. 本地儲存與同機廣播（0 延遲瞬間呈現等候室畫面）
    localStorage.setItem(this.getStorageKey(roomCode), JSON.stringify(state));
    if (this.bc) {
      try {
        this.bc.postMessage({ roomCode, state });
      } catch (e) {}
    }

    // 2. 啟動師長端 MQTT 雲端雙軌連線
    this.initMqtt(roomCode, true);

    // 3. 若有設定 Firebase 專案，同步儲存 (4B)
    if (this.cloudConfig.firebaseDbUrl && this.cloudConfig.firebaseDbUrl.startsWith("https://")) {
      try {
        fetch(`${this.cloudConfig.firebaseDbUrl}/care_rooms/${roomCode}.json`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(state)
        }).catch(() => {});
      } catch (e) {}
    }

    return state;
  }

  // 保存並推送房間最新狀態
  async saveState(roomCode, state) {
    state.seq = (state.seq || 0) + 1;
    state.updatedAt = Date.now();
    this.lastSeq = state.seq;

    // 1. 本機儲存與同機廣播
    localStorage.setItem(this.getStorageKey(roomCode), JSON.stringify(state));
    if (this.bc) {
      try {
        this.bc.postMessage({ roomCode, state });
      } catch (e) {}
    }
    this.notifyListeners(state);

    // 2. 雲端 MQTT 廣播推送 (Retain: true)
    this.publishRoomState(roomCode, state);

    // 3. Firebase 備援寫入 (4B)
    if (this.cloudConfig.firebaseDbUrl && this.cloudConfig.firebaseDbUrl.startsWith("https://")) {
      try {
        fetch(`${this.cloudConfig.firebaseDbUrl}/care_rooms/${roomCode}.json`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(state)
        }).catch(() => {});
      } catch (err) {}
    }
  }

  // 讀取最新房間狀態
  async fetchState(roomCode) {
    if (!roomCode) return null;
    const cleanCode = roomCode.toUpperCase();

    // 1. 先查 Firebase (若有設定 4B)
    if (this.cloudConfig.firebaseDbUrl && this.cloudConfig.firebaseDbUrl.startsWith("https://")) {
      try {
        const fres = await fetch(`${this.cloudConfig.firebaseDbUrl}/care_rooms/${cleanCode}.json`, {
          cache: "no-store"
        });
        if (fres.ok) {
          const item = await fres.json();
          if (item && item.roomCode === cleanCode) {
            this.handleIncomingState(item);
            return item;
          }
        }
      } catch (e) {}
    }

    // 2. 本機快取保底
    return this.getLocalState(cleanCode);
  }

  // 學員跨裝置加入房間
  async joinRoom(roomCode, token, nickname, existingParticipantId = null) {
    const cleanCode = CareRoomSyncEngine.sanitizeText(roomCode, 10).toUpperCase();
    const cleanNick = CareRoomSyncEngine.sanitizeText(nickname, 20) || "照護學員";

    this.currentRoomCode = cleanCode;
    const pid = existingParticipantId || "P_" + Math.random().toString(36).substring(2, 10);
    this.pendingJoin = { participantId: pid, nickname: cleanNick, token };

    // 啟動學員端 MQTT 連線
    this.initMqtt(cleanCode, false);

    // 若連線已經就緒，立即發送；若尚未就緒，onSuccess 會自動發送
    if (this.mqttConnected) {
      this.sendJoinAction(cleanCode, pid, cleanNick, token);
    }

    // 雙重保險：0.8s 與 1.8s 各補送一次
    setTimeout(() => {
      if (this.mqttConnected) {
        this.sendJoinAction(cleanCode, pid, cleanNick, token);
      }
    }, 800);
    setTimeout(() => {
      if (this.mqttConnected) {
        this.sendJoinAction(cleanCode, pid, cleanNick, token);
      }
    }, 1800);

    // 嘗試拉取現有狀態
    let state = await this.fetchState(cleanCode);
    if (!state) {
      // 等待 MQTT 伺服器傳送 Retain 房間狀態（最多等 2.5 秒）
      for (let attempt = 0; attempt < 5; attempt++) {
        await new Promise((r) => setTimeout(r, 500));
        state = this.getLocalState(cleanCode);
        if (state) break;
      }
    }

    // 建立臨時狀態保底進入等候室
    if (!state) {
      state = {
        roomCode: cleanCode,
        status: "LOBBY",
        participants: {
          [pid]: { id: pid, nickname: cleanNick, joinedAt: Date.now() }
        },
        votes: {},
        questionIds: [],
        currentIndex: 0,
        themeId: "theme1",
        seq: 1
      };
    } else {
      if (!state.participants) state.participants = {};
      state.participants[pid] = {
        id: pid,
        nickname: cleanNick,
        joinedAt: Date.now()
      };
    }

    localStorage.setItem(this.getStorageKey(cleanCode), JSON.stringify(state));
    return { state, participantId: pid };
  }

  // 學員提交 A/B/C/D 作答
  async submitVote(roomCode, participantId, questionId, choice) {
    if (!["A", "B", "C", "D"].includes(choice)) return null;
    const cleanCode = roomCode.toUpperCase();

    // 1. 透過 MQTT 發布投票給大螢幕（即時推送）
    if (this.mqttClient && this.mqttConnected) {
      try {
        const msg = new window.Paho.MQTT.Message(
          JSON.stringify({
            type: "VOTE",
            participantId,
            questionId,
            choice,
            timestamp: Date.now()
          })
        );
        msg.destinationName = `cargame/room/${cleanCode}/actions`;
        msg.qos = 1;
        this.mqttClient.send(msg);
      } catch (e) {}
    }

    // 2. 本地狀態樂觀更新
    let state = this.getLocalState(cleanCode);
    if (state) {
      if (!state.votes) state.votes = {};
      if (!state.votes[questionId]) state.votes[questionId] = {};
      state.votes[questionId][participantId] = choice;
      localStorage.setItem(this.getStorageKey(cleanCode), JSON.stringify(state));
      this.notifyListeners(state);
    }

    // 3. 若有設定 Firebase 專案，亦直接記錄
    if (this.cloudConfig.firebaseDbUrl && this.cloudConfig.firebaseDbUrl.startsWith("https://")) {
      try {
        await fetch(
          `${this.cloudConfig.firebaseDbUrl}/care_rooms/${cleanCode}/votes/${questionId}/${participantId}.json`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(choice)
          }
        );
      } catch (e) {}
    }

    return state;
  }

  // 師長移除不明參與者
  async removeParticipant(roomCode, participantId) {
    const cleanCode = roomCode.toUpperCase();
    const state = this.getLocalState(cleanCode);
    if (!state) return;
    if (state.participants) delete state.participants[participantId];
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
    const endState = { roomCode: cleanCode, status: "ENDED", cleared: true, updatedAt: Date.now() };

    // 發布結束清空訊號
    this.publishRoomState(cleanCode, endState);

    // 清空 MQTT 雲端 Retained 訊息（發送空 payload 清除雲端保留）
    if (this.mqttClient && this.mqttConnected) {
      try {
        const clearMsg = new window.Paho.MQTT.Message("");
        clearMsg.destinationName = `cargame/room/${cleanCode}/state`;
        clearMsg.retained = true;
        this.mqttClient.send(clearMsg);
        this.mqttClient.disconnect();
      } catch (e) {}
    }

    // 清理 Firebase 備援資料 (4B)
    if (this.cloudConfig.firebaseDbUrl && this.cloudConfig.firebaseDbUrl.startsWith("https://")) {
      try {
        fetch(`${this.cloudConfig.firebaseDbUrl}/care_rooms/${cleanCode}.json`, {
          method: "DELETE"
        }).catch(() => {});
      } catch (e) {}
    }

    // 清除本地儲存
    localStorage.removeItem(this.getStorageKey(cleanCode));
    if (this.bc) {
      try {
        this.bc.postMessage({ roomCode: cleanCode, state: endState });
      } catch (e) {}
    }
    this.currentRoomCode = null;
    this.mqttClient = null;
    this.mqttConnected = false;
  }
}

if (typeof window !== "undefined") {
  window.CareRoomSyncEngine = CareRoomSyncEngine;
}
