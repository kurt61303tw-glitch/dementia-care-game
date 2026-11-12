/* ==========================================================================
   《暖心時光屋：長照失智情境解題室》主程式控制器 (app.js)
   嚴格落實冠樺拍板之 8 項決策：
   1A (照護人員/實習生/家屬受眾) | 2A (單人練習+師長開房雙模式) | 3A (單人模式不顯示虛構分佈)
   4B (靜態前端+託管雲端同步/雙視窗同步) | 5A (純匿名班級分佈+照護筆記，無排行榜)
   6B (兩大主題8單元共96題完整題庫) | 7A (五關卡審核發布制) | 8A (課後即清除明細+當場匯出匿名摘要)
   ========================================================================== */

(function () {
  const syncEngine = new window.CareRoomSyncEngine();

  // 取得全題庫（預設 96 題 + 本機送審題庫）
  function getAllQuestions() {
    const base = [
      ...(window.QUESTIONS_THEME_1 || []),
      ...(window.QUESTIONS_THEME_2 || [])
    ];
    let custom = [];
    try {
      const raw = localStorage.getItem("care_game_custom_questions_v1");
      if (raw) custom = JSON.parse(raw);
    } catch (e) {}
    return [...base, ...custom];
  }

  // 7A：僅通過全部五關卡審核（auditStatus === 'published'）的題目才可進入正式課堂與練習
  function getPublishedQuestions(themeId, unitFilter = "ALL") {
    return getAllQuestions().filter((q) => {
      const isPublished =
        q.auditStatus === "published" &&
        q.auditTrail &&
        q.auditTrail.draft &&
        q.auditTrail.clinical &&
        q.auditTrail.education &&
        q.auditTrail.sop &&
        q.auditTrail.published;
      if (!isPublished) return false;
      if (themeId && themeId !== "ALL" && q.themeId !== themeId) return false;
      if (unitFilter && unitFilter !== "ALL" && q.unitId !== unitFilter) return false;
      return true;
    });
  }

  // 溫馨音效合成器（Web Audio API，預設需使用者手勢且支援一鍵靜音）
  const SoundFX = {
    muted: false,
    ctx: null,
    play(type) {
      if (this.muted) return;
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        if (!this.ctx) this.ctx = new AudioCtx();
        if (this.ctx.state === "suspended") this.ctx.resume();

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        if (type === "click") {
          osc.type = "sine";
          osc.frequency.setValueAtTime(520, now);
          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
          osc.start(now);
          osc.stop(now + 0.08);
        } else if (type === "reveal") {
          osc.type = "triangle";
          osc.frequency.setValueAtTime(440, now);
          osc.frequency.setValueAtTime(554.37, now + 0.1);
          osc.frequency.setValueAtTime(659.25, now + 0.2);
          gain.gain.setValueAtTime(0.1, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
          osc.start(now);
          osc.stop(now + 0.45);
        }
      } catch (e) {}
    }
  };

  // 應用程式狀態
  const AppState = {
    view: "HOME", // 'HOME' | 'SOLO_PLAY' | 'SOLO_SUMMARY' | 'HOST_LOBBY' | 'HOST_GAME' | 'HOST_SUMMARY' | 'STUDENT_JOIN' | 'STUDENT_GAME'
    largeText: false,
    reducedMotion: false,
    // 單人模式狀態 (2A + 3A)
    solo: {
      themeId: "theme1",
      unitFilter: "ALL",
      questions: [],
      currentIndex: 0,
      selectedChoice: null,
      revealed: false,
      history: [] // [{ questionId, userChoice, correctChoice, isCorrect }]
    },
    // 師長開房模式狀態 (4B + 5A + 8A)
    host: {
      roomState: null
    },
    // 學員模式狀態
    student: {
      roomCode: "",
      token: "",
      participantId: "",
      nickname: "",
      roomState: null
    }
  };

  // 單元清單定義
  const UNIT_CATALOG = {
    theme1: [
      { id: "ALL", title: "全部單元（共 48 題）" },
      { id: "T1-U1", title: "單元一：建立安全感與承接情緒（12題）" },
      { id: "T1-U2", title: "單元二：聽懂非語言訊息與環境調整（12題）" },
      { id: "T1-U3", title: "單元三：簡短肯定句與有限選擇（12題）" },
      { id: "T1-U4", title: "單元四：維護成人尊嚴與自主感（12題）" }
    ],
    theme2: [
      { id: "ALL", title: "全部單元（共 48 題）" },
      { id: "T2-U1", title: "單元一：飲食與飲水支持（12題）" },
      { id: "T2-U2", title: "單元二：沐浴、更衣與如廁清潔（12題）" },
      { id: "T2-U3", title: "單元三：作息調整與黃昏時段焦躁（12題）" },
      { id: "T2-U4", title: "單元四：物品遺失懷疑與安全異常辨識（12題）" }
    ]
  };

  const RISK_LABELS = {
    green: { text: "綠色分級：普遍溝通與日常尊嚴支持", cls: "risk-green", icon: "🌿" },
    yellow: { text: "黃色分級：需搭配個別照護計畫與生理評估", cls: "risk-yellow", icon: "🌼" },
    red: { text: "紅色高風險：急症與安全異常（僅測辨識、初步保護與依SOP通報）", cls: "risk-red", icon: "🚨" }
  };

  const OPTION_ICONS = { A: "🌻", B: "🍀", C: "💧", D: "🍊" };

  // 繪製可視化簡易 QR Code SVG（確保離線或無外部 CDN 時仍可產生真實幾何定位標記與連結）
  function renderQRCodeBox(containerEl, urlText) {
    if (!containerEl) return;
    containerEl.innerHTML = "";
    // 若載入了外部 QRCode 庫則優先使用，否則使用內建 SVG QR 矩陣渲染器
    if (typeof window.QRCode === "function") {
      new window.QRCode(containerEl, {
        text: urlText,
        width: 190,
        height: 190,
        colorDark: "#3E2723",
        colorLight: "#FFFFFF"
      });
      return;
    }
    // 內建高對比度 QR 視覺示意與可點擊掃碼框（當無外網載入 CDN 時保底）
    const size = 21;
    let rects = "";
    const drawFinder = (ox, oy) => {
      rects += `<rect x="${ox}" y="${oy}" width="7" height="7" fill="#3E2723"/>`;
      rects += `<rect x="${ox + 1}" y="${oy + 1}" width="5" height="5" fill="#FFFFFF"/>`;
      rects += `<rect x="${ox + 2}" y="${oy + 2}" width="3" height="3" fill="#3E2723"/>`;
    };
    drawFinder(0, 0);
    drawFinder(size - 7, 0);
    drawFinder(0, size - 7);
    let hash = 0;
    for (let i = 0; i < urlText.length; i++) {
      hash = (hash * 31 + urlText.charCodeAt(i)) >>> 0;
    }
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const inFinder =
          (x < 8 && y < 8) ||
          (x >= size - 8 && y < 8) ||
          (x < 8 && y >= size - 8);
        if (inFinder) continue;
        const bit = ((x * 17 + y * 29 + hash + (urlText.charCodeAt((x + y) % urlText.length) || 0)) % 3) === 0;
        if (bit) {
          rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="#3E2723"/>`;
        }
      }
    }
    containerEl.innerHTML = `
      <svg viewBox="-1 -1 ${size + 2} ${size + 2}" width="185" height="185" role="img" aria-label="房間加入QR碼">
        <rect x="-1" y="-1" width="${size + 2}" height="${size + 2}" fill="#FFFFFF"/>
        ${rects}
      </svg>`;
  }

  // 建立加入網址
  function buildJoinUrl(roomCode, token) {
    const base = syncEngine.cloudConfig.customPublicUrl || window.location.href.split("?")[0];
    return `${base}?room=${encodeURIComponent(roomCode)}&token=${encodeURIComponent(token)}`;
  }

  // 主畫面渲染調度
  function renderApp() {
    const root = document.getElementById("app-stage");
    if (!root) return;

    switch (AppState.view) {
      case "HOME":
        renderHomeView(root);
        break;
      case "SOLO_PLAY":
        renderSoloPlayView(root);
        break;
      case "SOLO_SUMMARY":
        renderSoloSummaryView(root);
        break;
      case "HOST_LOBBY":
        renderHostLobbyView(root);
        break;
      case "HOST_GAME":
        renderHostGameView(root);
        break;
      case "HOST_SUMMARY":
        renderHostSummaryView(root);
        break;
      case "STUDENT_JOIN":
        renderStudentJoinView(root);
        break;
      case "STUDENT_GAME":
        renderStudentGameView(root);
        break;
      default:
        renderHomeView(root);
    }
  }

  // ==================== 1. 首頁：陽光交誼廳與兩扇主題門 ====================
  function renderHomeView(root) {
    const t1Count = getPublishedQuestions("theme1").length;
    const t2Count = getPublishedQuestions("theme2").length;
    const cloudConfigured = Boolean(syncEngine.cloudConfig.firebaseDbUrl);

    root.innerHTML = `
      <div class="scene-stage-box">
        <div class="scene-header-strip">
          <span>🏡 場景：陽光長照機構・溫馨交誼廳（去 3C 感 Q 版互動教室）</span>
          <span>📚 已審定發布題庫：共 <strong>${t1Count + t2Count}</strong> 題（五關卡審核通過）</span>
        </div>
        <div class="scene-canvas-wrap">
          ${window.CareIllustrations.renderSceneSVG("lounge", "warm", "陽光長照中心・照護學習交誼廳")}
        </div>
      </div>

      <!-- 快速入房／模式說明橫幅 -->
      <div class="mode-banner-grid">
        <div class="mode-box">
          <div style="font-weight:800; color:var(--wood-dark); font-size:1.05rem;">📱 學員掃碼或輸入房號加入遊戲室</div>
          <p style="font-size:0.9rem; color:var(--text-sub);">若師長已開啟遊戲室，請掃描投影幕上的 QR Code，或在下方輸入 6 碼房間代碼直接加入：</p>
          <div style="display:flex; gap:8px; margin-top:auto;">
            <input type="text" id="quick-room-code" class="form-input" placeholder="輸入6碼房號 (如 K8M4P2)" maxlength="8" style="text-transform:uppercase; font-weight:800;" />
            <button class="wood-btn primary" id="btn-go-student-join" style="white-space:nowrap;">進入房間</button>
          </div>
        </div>

        <div class="mode-box">
          <div style="font-weight:800; color:var(--wood-dark); font-size:1.05rem;">🛡️ 教學治理與隱私安全承諾（1A/5A/7A/8A）</div>
          <p style="font-size:0.88rem; color:var(--text-sub);">
            • <strong>受眾定位（1A）</strong>：專為照護人員、實習生與家屬設計。<br/>
            • <strong>心理安全（5A）</strong>：純匿名全班 ABCD 分佈與照護筆記，不計個人排名。<br/>
            • <strong>即開即清（8A）</strong>：課堂結束自動清除房間作答明細，僅供當場下載匿名統計。<br/>
            • <strong>連線狀態（4B）</strong>：${cloudConfigured ? '<span style="color:#1B5E20;font-weight:800;">✅ 已連結雲端同步資料庫</span>' : '<span style="color:#D35400;font-weight:800;">💻 本機雙視窗同步模式（可點右上角「雲端連線設定」啟用跨手機雲端同步）</span>'}
          </p>
        </div>
      </div>

      <h2 style="font-size:1.45rem; color:var(--wood-dark); margin-bottom:6px; text-align:center;">
        🌟 請選擇今日互動學習主題（可自由選擇「單人練習」或「師長開房多人互動」）
      </h2>
      <p style="text-align:center; color:var(--text-sub); font-size:0.95rem; margin-bottom:16px;">
        每題皆提供 A、B、C、D 選項；師長開房可統計全班 ABCD 人數分佈，答錯時立即顯示正確答案與臨床照護解析。
      </p>

      <div class="theme-doors-grid">
        <!-- 主題一卡片 -->
        <div class="theme-door-card theme-1">
          <div>
            <span class="door-tag">主題選項 1 · 已審定 ${t1Count} 題</span>
            <h3 style="font-size:1.35rem; color:var(--text-main); margin-bottom:8px;">
              🗣️ 長照失智長者的溝通方法與原則
            </h3>
            <p style="color:var(--text-sub); font-size:0.95rem;">
              練習不爭辯事實、先承接情緒與確認安全、讀懂非語言疼痛與如廁訊號、使用簡短肯定句與有限二選一，維護成人長輩尊嚴。
            </p>
            <div class="unit-pills">
              <span class="unit-pill">① 建立安全感與承接情緒 (12題)</span>
              <span class="unit-pill">② 聽懂非語言訊息與環境調整 (12題)</span>
              <span class="unit-pill">③ 簡短肯定句與有限選擇 (12題)</span>
              <span class="unit-pill">④ 維護成人尊嚴與自主感 (12題)</span>
            </div>
            <div class="form-group">
              <label for="select-unit-t1">選擇練習／開房單元範圍：</label>
              <select id="select-unit-t1" class="form-select">
                ${UNIT_CATALOG.theme1.map((u) => `<option value="${u.id}">${u.title}</option>`).join("")}
              </select>
            </div>
          </div>
          <div class="door-actions">
            <button class="wood-btn primary" data-action="host-room" data-theme="theme1" style="flex:1; justify-content:center;">
              👩‍🏫 師長開房（多人掃碼答題）
            </button>
            <button class="wood-btn" data-action="solo-play" data-theme="theme1" style="flex:1; justify-content:center;">
              🌱 單人自主練習（3A）
            </button>
          </div>
        </div>

        <!-- 主題二卡片 -->
        <div class="theme-door-card theme-2">
          <div>
            <span class="door-tag">主題選項 2 · 已審定 ${t2Count} 題</span>
            <h3 style="font-size:1.35rem; color:var(--text-main); margin-bottom:8px;">
              🍵 失智長者的照顧方式（日常生活常見問題）
            </h3>
            <p style="color:var(--text-sub); font-size:0.95rem;">
              聚焦日常最常見照護挑戰：拒食與重複索食、拒澡與穿衣失用、黃昏症候群吵著回家、懷疑物品被偷，以及紅色高風險急症辨識與通報。
            </p>
            <div class="unit-pills">
              <span class="unit-pill">① 飲食與飲水支持 (12題)</span>
              <span class="unit-pill">② 沐浴、更衣與如廁清潔 (12題)</span>
              <span class="unit-pill">③ 作息調整與黃昏時段焦躁 (12題)</span>
              <span class="unit-pill">④ 物品遺失懷疑與安全異常辨識 (12題)</span>
            </div>
            <div class="form-group">
              <label for="select-unit-t2">選擇練習／開房單元範圍：</label>
              <select id="select-unit-t2" class="form-select">
                ${UNIT_CATALOG.theme2.map((u) => `<option value="${u.id}">${u.title}</option>`).join("")}
              </select>
            </div>
          </div>
          <div class="door-actions">
            <button class="wood-btn green" data-action="host-room" data-theme="theme2" style="flex:1; justify-content:center;">
              👩‍🏫 師長開房（多人掃碼答題）
            </button>
            <button class="wood-btn" data-action="solo-play" data-theme="theme2" style="flex:1; justify-content:center;">
              🌱 單人自主練習（3A）
            </button>
          </div>
        </div>
      </div>
    `;

    // 綁定首頁事件
    const btnJoin = document.getElementById("btn-go-student-join");
    if (btnJoin) {
      btnJoin.onclick = () => {
        SoundFX.play("click");
        const codeInput = document.getElementById("quick-room-code");
        AppState.student.roomCode = codeInput ? codeInput.value.trim().toUpperCase() : "";
        AppState.view = "STUDENT_JOIN";
        renderApp();
      };
    }

    root.querySelectorAll("[data-action='solo-play']").forEach((btn) => {
      btn.onclick = () => {
        SoundFX.play("click");
        const themeId = btn.getAttribute("data-theme");
        const selEl = document.getElementById(themeId === "theme1" ? "select-unit-t1" : "select-unit-t2");
        const unitFilter = selEl ? selEl.value : "ALL";
        startSoloMode(themeId, unitFilter);
      };
    });

    root.querySelectorAll("[data-action='host-room']").forEach((btn) => {
      btn.onclick = async () => {
        SoundFX.play("click");
        const themeId = btn.getAttribute("data-theme");
        const selEl = document.getElementById(themeId === "theme1" ? "select-unit-t1" : "select-unit-t2");
        const unitFilter = selEl ? selEl.value : "ALL";
        await startHostLobby(themeId, unitFilter);
      };
    });
  }

  // ==================== 2. 單人自主練習模式 (2A + 3A) ====================
  function startSoloMode(themeId, unitFilter) {
    const pool = getPublishedQuestions(themeId, unitFilter);
    if (!pool.length) {
      alert("目前所選範圍沒有已發布之題目。");
      return;
    }
    AppState.solo = {
      themeId,
      unitFilter,
      questions: pool,
      currentIndex: 0,
      selectedChoice: null,
      revealed: false,
      history: []
    };
    AppState.view = "SOLO_PLAY";
    renderApp();
  }

  function renderSoloPlayView(root) {
    const { questions, currentIndex, selectedChoice, revealed } = AppState.solo;
    const q = questions[currentIndex];
    if (!q) {
      AppState.view = "SOLO_SUMMARY";
      renderApp();
      return;
    }

    const risk = RISK_LABELS[q.riskLevel] || RISK_LABELS.green;
    const isCorrect = selectedChoice === q.correct;
    const mood = !revealed
      ? q.riskLevel === "red"
        ? "alert"
        : "confused"
      : isCorrect
      ? "reassured"
      : "warm";

    root.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:14px;">
        <div>
          <span class="risk-badge ${risk.cls}">${risk.icon} ${risk.text}</span>
          <span style="margin-left:8px; font-weight:800; color:var(--wood-dark);">
            【單人自主練習】第 ${currentIndex + 1} / ${questions.length} 題（題號：${q.id}）
          </span>
        </div>
        <div style="display:flex; gap:8px;">
          <button class="wood-btn" id="btn-solo-finish-early">📊 結束練習看總結</button>
          <button class="wood-btn" id="btn-solo-back-home">🏠 返回交誼廳首頁</button>
        </div>
      </div>

      <div class="scene-stage-box">
        <div class="scene-header-strip">
          <span>📍 ${q.themeTitle} ＞ ${q.unitTitle}</span>
          <span>🔎 審核版本：${q.version}｜複審日：${q.reviewDate}</span>
        </div>
        <div class="scene-canvas-wrap">
          ${window.CareIllustrations.renderSceneSVG(q.scene, mood, q.unitTitle)}
        </div>
      </div>

      <div class="question-card">
        <div style="font-size:0.9rem; font-weight:800; color:var(--accent-orange);">💬 機構現場情境題幹：</div>
        <div class="question-stem">${q.stem}</div>

        <div class="options-grid">
          ${["A", "B", "C", "D"]
            .map((letter) => {
              let stateCls = "";
              if (revealed) {
                if (letter === q.correct) stateCls = "correct-choice";
                else if (letter === selectedChoice && selectedChoice !== q.correct) stateCls = "wrong-choice";
              } else if (letter === selectedChoice) {
                stateCls = "selected-choice";
              }
              return `
                <button class="option-card opt-${letter} ${stateCls}" data-choice="${letter}" ${revealed ? "disabled" : ""}>
                  <span class="opt-letter-badge">${letter}</span>
                  <div style="flex:1;">
                    <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:2px;">選項 ${letter} ${OPTION_ICONS[letter]}</div>
                    <div>${q.options[letter]}</div>
                  </div>
                </button>
              `;
            })
            .join("")}
        </div>
      </div>

      ${
        revealed
          ? `
        <!-- 3A 規範：單人模式不顯示虛構人數分佈，誠實呈現正解與完整四選項照護筆記 -->
        <div class="care-notebook">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
            <h3 style="font-size:1.3rem; color:${isCorrect ? "#1B5E20" : "#C0392B"};">
              ${
                isCorrect
                  ? `✅ 回答正確！正確答案是【${q.correct}】`
                  : `💡 您選擇了【${selectedChoice}】，本題最適合的正確答案是【${q.correct}】`
              }
            </h3>
            <span style="font-size:0.85rem; background:#EFEBE9; padding:4px 10px; border-radius:8px; color:var(--wood-dark); font-weight:700;">
              📌 單人練習模式（依 3A 規範：僅顯示正確答案與解析，不顯示模擬人數分佈）
            </span>
          </div>

          <div style="background:#E8F5E9; border:2px solid #81C784; border-radius:12px; padding:12px 16px; margin-bottom:14px;">
            <strong>🌟 本題核心照護原則：</strong> ${q.corePrinciple}
          </div>

          <h4 style="color:var(--wood-dark); margin-bottom:8px;">📖 A、B、C、D 各選項臨床影響與原因解析：</h4>
          <div class="option-analysis-list">
            ${["A", "B", "C", "D"]
              .map((letter) => {
                const cls =
                  letter === q.correct
                    ? "is-correct"
                    : letter === selectedChoice
                    ? "is-user-wrong"
                    : "";
                const tag =
                  letter === q.correct
                    ? "【正確答案】"
                    : letter === selectedChoice
                    ? "【您的選擇】"
                    : "";
                return `
                  <div class="option-analysis-item ${cls}">
                    <strong>選項 ${letter} ${tag}：</strong> ${q.optionReasons[letter]}
                  </div>
                `;
              })
              .join("")}
          </div>

          <div class="sop-alert-box ${q.riskLevel === "red" ? "red-alert" : ""}">
            <div><strong>📋 機構 SOP 對照：</strong> ${q.sopReference}</div>
            <div style="margin-top:6px;"><strong>⚠️ 安全界線與通報提醒：</strong> ${q.redFlagAlert}</div>
            <div style="margin-top:6px; font-size:0.85rem; color:var(--text-muted);">
              參考依據：${q.source}｜現場實際處置仍應先排除身體不適，並依長輩個別照護計畫與機構 SOP 辦理。
            </div>
          </div>

          <div style="display:flex; justify-content:flex-end; gap:12px; margin-top:18px;">
            ${
              currentIndex > 0
                ? `<button class="wood-btn" id="btn-solo-prev">⬅️ 上一題</button>`
                : ""
            }
            <button class="wood-btn primary" id="btn-solo-next">
              ${currentIndex + 1 < questions.length ? "下一題 ➡️" : "完成練習並查看學習回饋 🎉"}
            </button>
          </div>
        </div>
      `
          : ""
      }
    `;

    root.querySelectorAll(".option-card").forEach((btn) => {
      btn.onclick = () => {
        if (AppState.solo.revealed) return;
        const choice = btn.getAttribute("data-choice");
        AppState.solo.selectedChoice = choice;
        AppState.solo.revealed = true;
        AppState.solo.history.push({
          questionId: q.id,
          stem: q.stem,
          userChoice: choice,
          correctChoice: q.correct,
          isCorrect: choice === q.correct,
          corePrinciple: q.corePrinciple
        });
        SoundFX.play("reveal");
        renderApp();
      };
    });

    const btnBack = document.getElementById("btn-solo-back-home");
    if (btnBack) {
      btnBack.onclick = () => {
        AppState.view = "HOME";
        renderApp();
      };
    }

    const btnFinish = document.getElementById("btn-solo-finish-early");
    if (btnFinish) {
      btnFinish.onclick = () => {
        AppState.view = "SOLO_SUMMARY";
        renderApp();
      };
    }

    const btnPrev = document.getElementById("btn-solo-prev");
    if (btnPrev) {
      btnPrev.onclick = () => {
        if (AppState.solo.currentIndex > 0) {
          AppState.solo.currentIndex--;
          const prevRecord = AppState.solo.history.find(
            (h) => h.questionId === AppState.solo.questions[AppState.solo.currentIndex].id
          );
          AppState.solo.selectedChoice = prevRecord ? prevRecord.userChoice : null;
          AppState.solo.revealed = Boolean(prevRecord);
          renderApp();
        }
      };
    }

    const btnNext = document.getElementById("btn-solo-next");
    if (btnNext) {
      btnNext.onclick = () => {
        SoundFX.play("click");
        if (AppState.solo.currentIndex + 1 < AppState.solo.questions.length) {
          AppState.solo.currentIndex++;
          AppState.solo.selectedChoice = null;
          AppState.solo.revealed = false;
          renderApp();
        } else {
          AppState.view = "SOLO_SUMMARY";
          renderApp();
        }
      };
    }
  }

  function renderSoloSummaryView(root) {
    const hist = AppState.solo.history;
    const wrongItems = hist.filter((h) => !h.isCorrect);

    root.innerHTML = `
      <div class="question-card">
        <h2 style="color:var(--wood-dark); margin-bottom:10px;">🌿 單人自主練習・照護觀念回顧筆記</h2>
        <p style="color:var(--text-sub); margin-bottom:16px;">
          本次共練習 <strong>${hist.length}</strong> 道情境題，需特別留意的觀念題共 <strong>${wrongItems.length}</strong> 題。
        </p>

        ${
          wrongItems.length === 0
            ? `<div style="background:#E8F5E9; padding:18px; border-radius:12px; color:#1B5E20; font-weight:700;">
                🌟 太棒了！本次練習的所有情境題皆掌握了正確的同理溝通與安全照護原則！
              </div>`
            : `
              <h3 style="color:#C0392B; margin:14px 0 10px;">📌 建議重點溫習之照護原則：</h3>
              <div class="option-analysis-list">
                ${wrongItems
                  .map(
                    (item) => `
                  <div class="option-analysis-item is-user-wrong">
                    <div><strong>[${item.questionId}]</strong> ${item.stem}</div>
                    <div style="margin-top:6px;">您的選擇：【${item.userChoice}】｜<strong>正確答案：【${item.correctChoice}】</strong></div>
                    <div style="margin-top:4px; color:#1B5E20; font-weight:700;">👉 行動心法：${item.corePrinciple}</div>
                  </div>
                `
                  )
                  .join("")}
              </div>
            `
        }

        <div style="display:flex; gap:12px; margin-top:22px;">
          <button class="wood-btn primary" id="btn-solo-restart">🔄 重新練習本單元</button>
          <button class="wood-btn" id="btn-solo-home">🏠 返回交誼廳首頁</button>
        </div>
      </div>
    `;

    document.getElementById("btn-solo-restart").onclick = () => {
      startSoloMode(AppState.solo.themeId, AppState.solo.unitFilter);
    };
    document.getElementById("btn-solo-home").onclick = () => {
      AppState.view = "HOME";
      renderApp();
    };
  }

  // ==================== 3. 師長開房模式：等候室與控場 (4B + 5A + 8A) ====================
  async function startHostLobby(themeId, unitFilter) {
    const pool = getPublishedQuestions(themeId, unitFilter);
    if (!pool.length) {
      alert("所選範圍無已審定題目。");
      return;
    }
    const questionIds = pool.map((q) => q.id);
    const roomState = await syncEngine.createRoom({
      themeId,
      unitFilter,
      questionIds
    });
    AppState.host.roomState = roomState;
    AppState.view = "HOST_LOBBY";
    renderApp();
  }

  function renderHostLobbyView(root) {
    const st = AppState.host.roomState;
    if (!st) return;
    const joinUrl = buildJoinUrl(st.roomCode, st.token);
    const participants = Object.values(st.participants || {});

    root.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:16px;">
        <h2 style="color:var(--wood-dark);">👩‍🏫 師長開房等候室（掃描 QR Code 或輸入房號加入）</h2>
        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          <button class="wood-btn" id="btn-open-sim-student" title="在同一台電腦打開學員手機視窗測試即時互動">
            📱 開啟「學員手機模擬視窗」測試
          </button>
          <button class="wood-btn ${st.locked ? "active-toggle" : ""}" id="btn-toggle-lock">
            ${st.locked ? "🔒 已鎖房（點擊解鎖）" : "🔓 房間開放中（點擊鎖房）"}
          </button>
          <button class="wood-btn danger" id="btn-close-room-lobby">✖ 關閉房間並清除資料</button>
        </div>
      </div>

      <div class="lobby-grid">
        <!-- 左側木框 QR Code -->
        <div class="qr-wooden-frame">
          <div style="font-weight:800; color:var(--wood-dark);">學員手機掃描加入遊戲室</div>
          <div id="qrcode-container"></div>
          <div style="font-size:0.88rem; color:var(--text-sub);">房間 6 碼安全代碼：</div>
          <div class="room-code-pill">${st.roomCode}</div>
          <div style="font-size:0.8rem; color:var(--text-muted); margin-top:4px; word-break:break-all;">
            短效簽章連結：<br/>${joinUrl}
          </div>
          <button class="wood-btn" id="btn-copy-join-url" style="margin-top:10px; width:100%; justify-content:center;">
            📋 複製學員加入連結
          </button>
        </div>

        <!-- 右側已加入學員名單與開課控制 -->
        <div class="question-card" style="margin-bottom:0; display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
              <h3 style="color:var(--wood-dark);">👥 已進入交誼廳的學員（共 ${participants.length} 人）</h3>
              <span style="font-size:0.88rem; color:var(--accent-green); font-weight:700;">
                題組規模：共 ${st.questionIds.length} 題（每場結束後 QR 自動失效）
              </span>
            </div>
            <p style="font-size:0.9rem; color:var(--text-sub); margin-top:6px;">
              點擊學員名稱右側的「✖」可移除不明加入者。預設採「作答截止／揭曉後才公開 ABCD 人數分佈」以防止跟風。
            </p>

            <div class="participant-chip-list">
              ${
                participants.length === 0
                  ? `<div style="padding:24px; color:var(--text-muted); font-weight:700;">
                      ⏳ 等待學員掃描 QR Code 加入中……（您也可以點上方「📱 開啟學員手機模擬視窗」立即體驗雙視窗同步作答！）
                    </div>`
                  : participants
                      .map(
                        (p) => `
                        <div class="participant-chip">
                          <span>👤 ${p.nickname}</span>
                          <button class="wood-btn danger" data-kick-id="${p.id}" style="padding:2px 8px; min-height:26px; font-size:0.78rem;">✖</button>
                        </div>
                      `
                      )
                      .join("")
              }
            </div>
          </div>

          <div style="border-top:2px dashed var(--wood-border); padding-top:16px; margin-top:20px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
            <label style="display:flex; align-items:center; gap:8px; font-weight:700; cursor:pointer;">
              <input type="checkbox" id="chk-live-discuss" ${st.liveDiscussMode ? "checked" : ""} style="width:18px; height:18px;" />
              開啟「破冰討論模式（作答期間即時跳動 ABCD 人數分佈）」
            </label>
            <button class="wood-btn primary" id="btn-host-start-q1" style="font-size:1.1rem; padding:12px 28px;">
              ▶️ 開始第一題互動解題
            </button>
          </div>
        </div>
      </div>
    `;

    renderQRCodeBox(document.getElementById("qrcode-container"), joinUrl);

    document.getElementById("btn-copy-join-url").onclick = () => {
      navigator.clipboard?.writeText(joinUrl);
      alert("已複製學員加入連結！可貼給學員或在新分頁開啟。");
    };

    document.getElementById("btn-open-sim-student").onclick = () => {
      window.open(joinUrl, "_blank", "width=430,height=780");
    };

    document.getElementById("btn-toggle-lock").onclick = async () => {
      st.locked = !st.locked;
      await syncEngine.saveState(st.roomCode, st);
    };

    document.getElementById("chk-live-discuss").onchange = async (e) => {
      st.liveDiscussMode = e.target.checked;
      await syncEngine.saveState(st.roomCode, st);
    };

    root.querySelectorAll("[data-kick-id]").forEach((btn) => {
      btn.onclick = async () => {
        const pid = btn.getAttribute("data-kick-id");
        await syncEngine.removeParticipant(st.roomCode, pid);
      };
    });

    document.getElementById("btn-host-start-q1").onclick = async () => {
      SoundFX.play("click");
      st.status = "QUESTION_ACTIVE";
      st.currentIndex = 0;
      await syncEngine.saveState(st.roomCode, st);
      AppState.view = "HOST_GAME";
      renderApp();
    };

    document.getElementById("btn-close-room-lobby").onclick = async () => {
      if (confirm("確定要關閉房間並清除本場次所有連線資料嗎？")) {
        await syncEngine.destroyRoomAndClearData(st.roomCode);
        AppState.host.roomState = null;
        AppState.view = "HOME";
        renderApp();
      }
    };
  }

  // 計算單題 ABCD 人數分佈
  function computeDistribution(st, questionId) {
    const qVotes = (st && st.votes && st.votes[questionId]) || {};
    const counts = { A: 0, B: 0, C: 0, D: 0 };
    let total = 0;
    Object.values(qVotes).forEach((choice) => {
      if (counts[choice] !== undefined) {
        counts[choice]++;
        total++;
      }
    });
    const pct = {
      A: total ? Math.round((counts.A / total) * 100) : 0,
      B: total ? Math.round((counts.B / total) * 100) : 0,
      C: total ? Math.round((counts.C / total) * 100) : 0,
      D: total ? Math.round((counts.D / total) * 100) : 0
    };
    return { counts, pct, total };
  }

  // 渲染布告欄四色貼紙 ABCD 人數分佈組件
  function renderCorkboardDistributionHTML(q, dist, isRevealed) {
    const colors = { A: "#EF6C00", B: "#2E7D32", C: "#1565C0", D: "#6A1B9A" };
    return `
      <div class="corkboard-panel">
        <div class="corkboard-title">
          📌 陽光布告欄・全班 A / B / C / D 作答人數分佈（共 ${dist.total} 人作答）
        </div>
        ${["A", "B", "C", "D"]
          .map((letter) => {
            const count = dist.counts[letter];
            const percentage = dist.pct[letter];
            const isAns = isRevealed && letter === q.correct;
            const stickers = "🟠".repeat(Math.min(count, 15)) + (count > 15 ? ` +${count - 15}` : "");
            return `
              <div class="distribution-row" style="${isAns ? "border:3px solid #2E7D32; background:#E8F5E9;" : ""}">
                <div style="display:flex; justify-content:space-between; align-items:center; font-weight:800;">
                  <span>
                    選項 ${letter} ${OPTION_ICONS[letter]}
                    ${isAns ? '<strong style="color:#1B5E20; margin-left:6px;">✅【正確答案】</strong>' : ""}
                  </span>
                  <span style="font-size:1.05rem; color:${colors[letter]};">
                    ${count} 人（${percentage}%）
                  </span>
                </div>
                <div class="dist-bar-track">
                  <div class="dist-bar-fill" style="width:${Math.max(percentage, count > 0 ? 8 : 0)}%; background:${colors[letter]}; color:#FFF; font-weight:800; font-size:0.85rem;">
                    ${count > 0 ? `${stickers} (${count}票)` : ""}
                  </div>
                </div>
              </div>
            `;
          })
          .join("")}
      </div>
    `;
  }

  function renderHostGameView(root) {
    const st = AppState.host.roomState;
    if (!st) return;
    const allQ = getAllQuestions();
    const qId = st.questionIds[st.currentIndex];
    const q = allQ.find((item) => item.id === qId) || allQ[0];
    const isRevealed = st.status === "REVEALED";
    const participantCount = Object.keys(st.participants || {}).length;
    const dist = computeDistribution(st, q.id);
    const risk = RISK_LABELS[q.riskLevel] || RISK_LABELS.green;
    const joinUrl = buildJoinUrl(st.roomCode, st.token);

    root.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:14px;">
        <div>
          <span class="risk-badge ${risk.cls}">${risk.icon} ${risk.text}</span>
          <span style="margin-left:8px; font-weight:800; color:var(--wood-dark);">
            【房號：${st.roomCode}】第 ${st.currentIndex + 1} / ${st.questionIds.length} 題｜在線學員：${participantCount} 人
          </span>
        </div>
        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          <button class="wood-btn" id="btn-host-sim-student">📱 開啟學員模擬視窗</button>
          <button class="wood-btn" id="btn-host-end-session">📊 結算本場次並匯出報告</button>
        </div>
      </div>

      <div class="scene-stage-box">
        <div class="scene-header-strip">
          <span>📍 ${q.themeTitle} ＞ ${q.unitTitle}（題號：${q.id}）</span>
          <span>📬 本題已作答人數：<strong>${dist.total} / ${participantCount}</strong> 人</span>
        </div>
        <div class="scene-canvas-wrap">
          ${window.CareIllustrations.renderSceneSVG(
            q.scene,
            isRevealed ? "reassured" : q.riskLevel === "red" ? "alert" : "confused",
            `房號 ${st.roomCode}・第 ${st.currentIndex + 1} 題`
          )}
        </div>
      </div>

      <div class="question-card">
        <div class="question-stem">${q.stem}</div>
        <div class="options-grid">
          ${["A", "B", "C", "D"]
            .map((letter) => {
              const isAns = isRevealed && letter === q.correct;
              return `
                <div class="option-card opt-${letter} ${isAns ? "correct-choice" : ""}" style="cursor:default;">
                  <span class="opt-letter-badge">${letter}</span>
                  <div style="flex:1;">
                    <div style="font-size:0.85rem; color:var(--text-muted);">選項 ${letter} ${OPTION_ICONS[letter]}</div>
                    <div>${q.options[letter]}</div>
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>

        <div style="margin-top:20px; padding-top:16px; border-top:2px dashed var(--wood-border); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <div style="font-weight:800; color:var(--wood-dark);">
            ${
              isRevealed
                ? "✅ 已鎖定作答並揭曉正確答案與全班 ABCD 分佈"
                : `⏳ 學員手機作答中（目前已收到 ${dist.total} 張作答卡）`
            }
          </div>
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            ${
              !isRevealed
                ? `<button class="wood-btn primary" id="btn-host-reveal">📣 鎖定作答並揭曉 ABCD 人數分佈＆正解</button>`
                : `
                  <button class="wood-btn" id="btn-host-reopen">🔄 重新開放本題作答</button>
                  <button class="wood-btn primary" id="btn-host-next-q">
                    ${st.currentIndex + 1 < st.questionIds.length ? "進入下一題 ➡️" : "進入課後班級總結報告 📊"}
                  </button>
                `
            }
          </div>
        </div>
      </div>

      ${
        isRevealed || st.liveDiscussMode
          ? renderCorkboardDistributionHTML(q, dist, isRevealed)
          : ""
      }

      ${
        isRevealed
          ? `
        <div class="care-notebook">
          <h3 style="color:#1B5E20; margin-bottom:10px;">✅ 正確答案：【選項 ${q.correct}】</h3>
          <div style="background:#E8F5E9; border:2px solid #81C784; border-radius:12px; padding:12px 16px; margin-bottom:14px;">
            <strong>🌟 核心照護原則：</strong> ${q.corePrinciple}
          </div>
          <h4 style="color:var(--wood-dark); margin-bottom:8px;">📖 A、B、C、D 各選項臨床解析（供師長帶動團隊討論）：</h4>
          <div class="option-analysis-list">
            ${["A", "B", "C", "D"]
              .map(
                (letter) => `
              <div class="option-analysis-item ${letter === q.correct ? "is-correct" : ""}">
                <strong>選項 ${letter} ${letter === q.correct ? "【正確答案】" : ""}：</strong> ${q.optionReasons[letter]}
              </div>
            `
              )
              .join("")}
          </div>
          <div class="sop-alert-box ${q.riskLevel === "red" ? "red-alert" : ""}">
            <div><strong>📋 機構 SOP 對照：</strong> ${q.sopReference}</div>
            <div style="margin-top:6px;"><strong>⚠️ 安全界線與通報提醒：</strong> ${q.redFlagAlert}</div>
          </div>
        </div>
      `
          : ""
      }
    `;

    const btnSim = document.getElementById("btn-host-sim-student");
    if (btnSim) {
      btnSim.onclick = () => window.open(joinUrl, "_blank", "width=430,height=780");
    }

    const btnReveal = document.getElementById("btn-host-reveal");
    if (btnReveal) {
      btnReveal.onclick = async () => {
        SoundFX.play("reveal");
        st.status = "REVEALED";
        await syncEngine.saveState(st.roomCode, st);
      };
    }

    const btnReopen = document.getElementById("btn-host-reopen");
    if (btnReopen) {
      btnReopen.onclick = async () => {
        st.status = "QUESTION_ACTIVE";
        await syncEngine.saveState(st.roomCode, st);
      };
    }

    const btnNext = document.getElementById("btn-host-next-q");
    if (btnNext) {
      btnNext.onclick = async () => {
        SoundFX.play("click");
        if (st.currentIndex + 1 < st.questionIds.length) {
          st.currentIndex++;
          st.status = "QUESTION_ACTIVE";
          await syncEngine.saveState(st.roomCode, st);
        } else {
          st.status = "ENDED";
          await syncEngine.saveState(st.roomCode, st);
          AppState.view = "HOST_SUMMARY";
          renderApp();
        }
      };
    }

    const btnEnd = document.getElementById("btn-host-end-session");
    if (btnEnd) {
      btnEnd.onclick = async () => {
        st.status = "ENDED";
        await syncEngine.saveState(st.roomCode, st);
        AppState.view = "HOST_SUMMARY";
        renderApp();
      };
    }
  }

  // 8A：課後匿名班級報告與當場清除明細
  function renderHostSummaryView(root) {
    const st = AppState.host.roomState;
    if (!st) {
      AppState.view = "HOME";
      renderApp();
      return;
    }

    const allQ = getAllQuestions();
    const answeredQuestions = st.questionIds
      .map((id) => allQ.find((q) => q.id === id))
      .filter(Boolean);

    const rows = answeredQuestions.map((q) => {
      const dist = computeDistribution(st, q.id);
      const correctCount = dist.counts[q.correct] || 0;
      const accuracy = dist.total ? Math.round((correctCount / dist.total) * 100) : 0;
      return { q, dist, accuracy };
    });

    root.innerHTML = `
      <div class="question-card">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:14px;">
          <div>
            <h2 style="color:var(--wood-dark);">📊 本班匿名學習分佈摘要報告（房號：${st.roomCode}）</h2>
            <p style="color:var(--text-sub); font-size:0.92rem;">
              依拍板決策 <strong>5A（純匿名全班統計，無個人排名）</strong> 與 <strong>8A（課堂結束即清除明細）</strong>，請師長於下方當場下載匿名統計摘要，關閉房間時將自動銷毀所有連線明細。
            </p>
          </div>
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <button class="wood-btn green" id="btn-export-csv">📥 下載本班匿名統計摘要 (.CSV)</button>
            <button class="wood-btn danger" id="btn-clear-and-exit">🧹 立即清除房間明細並返回首頁 (8A)</button>
          </div>
        </div>

        <div class="option-analysis-list">
          ${rows
            .map(
              ({ q, dist, accuracy }, idx) => `
              <div class="option-analysis-item ${dist.total > 0 && accuracy < 60 ? "is-user-wrong" : "is-correct"}">
                <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:8px; font-weight:800;">
                  <span>第 ${idx + 1} 題 [${q.id}]（正解：${q.correct}）</span>
                  <span>作答人數：${dist.total} 人｜答對比例：${accuracy}%（A:${dist.counts.A} / B:${dist.counts.B} / C:${dist.counts.C} / D:${dist.counts.D}）</span>
                </div>
                <div style="margin-top:4px; font-size:0.92rem;">題幹：${q.stem}</div>
                <div style="margin-top:4px; font-size:0.88rem; color:#1B5E20; font-weight:700;">👉 核心原則：${q.corePrinciple}</div>
              </div>
            `
            )
            .join("")}
        </div>
      </div>
    `;

    document.getElementById("btn-export-csv").onclick = () => {
      const header = ["題號", "主題", "單元", "風險等級", "正確答案", "總作答人數", "選A人數", "選B人數", "選C人數", "選D人數", "答對率(%)", "核心照護原則"];
      const csvLines = [
        header.join(","),
        ...rows.map(({ q, dist, accuracy }) =>
          [
            q.id,
            `"${q.themeTitle}"`,
            `"${q.unitTitle}"`,
            q.riskLevel,
            q.correct,
            dist.total,
            dist.counts.A,
            dist.counts.B,
            dist.counts.C,
            dist.counts.D,
            accuracy,
            `"${q.corePrinciple.replace(/"/g, '""')}"`
          ].join(",")
        )
      ];
      const blob = new Blob(["\uFEFF" + csvLines.join("\n")], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `長照失智解題室_匿名班級統計_${st.roomCode}_${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    };

    document.getElementById("btn-clear-and-exit").onclick = async () => {
      await syncEngine.destroyRoomAndClearData(st.roomCode);
      AppState.host.roomState = null;
      alert("已依 8A 規範完整清除本場次所有參與者暱稱與作答明細！");
      AppState.view = "HOME";
      renderApp();
    };
  }

  // ==================== 4. 學員手機端：加入房間與作答 ====================
  function renderStudentJoinView(root) {
    root.innerHTML = `
      <div class="question-card" style="max-width:520px; margin:20px auto;">
        <h2 style="color:var(--wood-dark); margin-bottom:8px;">📱 加入《暖心時光屋》互動遊戲室</h2>
        <p style="color:var(--text-sub); font-size:0.92rem; margin-bottom:16px;">
          本系統採匿名全班統計與溫馨照護筆記回饋，請放心輸入課堂代稱加入（請勿輸入真實病歷或身分證號）。
        </p>

        <div class="form-group">
          <label for="stu-room-code">房間 6 碼安全代碼：</label>
          <input type="text" id="stu-room-code" class="form-input" value="${AppState.student.roomCode}" placeholder="例如 K8M4P2" style="text-transform:uppercase; font-weight:800; font-size:1.2rem;" />
        </div>

        <div class="form-group">
          <label for="stu-nickname">您的課堂暱稱／代稱：</label>
          <input type="text" id="stu-nickname" class="form-input" value="${AppState.student.nickname}" placeholder="例如：小太陽、A組照服員、家屬陳先生" maxlength="18" />
        </div>

        <div style="display:flex; gap:10px; margin-top:18px;">
          <button class="wood-btn primary" id="btn-stu-do-join" style="flex:1; justify-content:center; font-size:1.05rem;">
            🚪 進入陽光交誼廳等候室
          </button>
          <button class="wood-btn" id="btn-stu-cancel">返回首頁</button>
        </div>
      </div>
    `;

    document.getElementById("btn-stu-cancel").onclick = () => {
      AppState.view = "HOME";
      renderApp();
    };

    document.getElementById("btn-stu-do-join").onclick = async () => {
      const code = document.getElementById("stu-room-code").value.trim().toUpperCase();
      const nick = document.getElementById("stu-nickname").value.trim() || "照護學員";
      if (!code) {
        alert("請輸入 6 碼房間代碼！");
        return;
      }
      try {
        // 檢查 60 秒內同房斷線重連 session
        const savedSessionRaw = sessionStorage.getItem(`stu_session_${code}`);
        let existingPid = null;
        if (savedSessionRaw) {
          try {
            existingPid = JSON.parse(savedSessionRaw).participantId;
          } catch (e) {}
        }

        const { state, participantId } = await syncEngine.joinRoom(
          code,
          AppState.student.token,
          nick,
          existingPid
        );
        AppState.student.roomCode = code;
        AppState.student.nickname = nick;
        AppState.student.participantId = participantId;
        AppState.student.roomState = state;
        sessionStorage.setItem(
          `stu_session_${code}`,
          JSON.stringify({ participantId, nickname: nick })
        );
        SoundFX.play("click");
        AppState.view = "STUDENT_GAME";
        renderApp();
      } catch (err) {
        alert(err.message || "加入房間失敗");
      }
    };
  }

  function renderStudentGameView(root) {
    const st = AppState.student.roomState;
    if (!st || st.status === "ENDED" || st.cleared) {
      root.innerHTML = `
        <div class="question-card" style="max-width:560px; margin:24px auto; text-align:center;">
          <h2 style="color:var(--wood-dark); margin-bottom:10px;">🌿 本場次課程已圓滿結束</h2>
          <p style="color:var(--text-sub); margin-bottom:18px;">
            感謝您的投入參與！依 8A 隱私規範，本房間的作答明細已於課程結束時自動清除。
          </p>
          <button class="wood-btn primary" id="btn-stu-ended-home">🏠 返回交誼廳首頁</button>
        </div>
      `;
      document.getElementById("btn-stu-ended-home").onclick = () => {
        syncEngine.stopPolling();
        AppState.view = "HOME";
        renderApp();
      };
      return;
    }

    if (st.status === "LOBBY") {
      root.innerHTML = `
        <div class="question-card" style="max-width:560px; margin:20px auto; text-align:center;">
          <div style="font-size:2.4rem; margin-bottom:8px;">🏡</div>
          <h2 style="color:var(--wood-dark);">已進入陽光交誼廳（房號：${st.roomCode}）</h2>
          <p style="color:var(--accent-green); font-weight:800; margin:8px 0;">
            👤 您的代稱：${AppState.student.nickname}
          </p>
          <p style="color:var(--text-sub);">
            請稍候，待師長在大螢幕按下「開始第一題」後，您的手機畫面將自動同步出現 A、B、C、D 作答選項！
          </p>
        </div>
      `;
      return;
    }

    const allQ = getAllQuestions();
    const qId = st.questionIds[st.currentIndex];
    const q = allQ.find((item) => item.id === qId) || allQ[0];
    const myVote =
      st.votes && st.votes[q.id] ? st.votes[q.id][AppState.student.participantId] : null;
    const isRevealed = st.status === "REVEALED";
    const dist = computeDistribution(st, q.id);
    const risk = RISK_LABELS[q.riskLevel] || RISK_LABELS.green;

    root.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:12px;">
        <span class="risk-badge ${risk.cls}">${risk.icon} 第 ${st.currentIndex + 1} / ${st.questionIds.length} 題</span>
        <span style="font-weight:800; color:var(--wood-dark);">👤 ${AppState.student.nickname}（房號：${st.roomCode}）</span>
      </div>

      <div class="question-card">
        <div class="question-stem">${q.stem}</div>
        <div class="options-grid">
          ${["A", "B", "C", "D"]
            .map((letter) => {
              let cls = "";
              if (isRevealed) {
                if (letter === q.correct) cls = "correct-choice";
                else if (letter === myVote && myVote !== q.correct) cls = "wrong-choice";
              } else if (letter === myVote) {
                cls = "selected-choice";
              }
              return `
                <button class="option-card opt-${letter} ${cls}" data-stu-choice="${letter}" ${myVote || isRevealed ? "disabled" : ""}>
                  <span class="opt-letter-badge">${letter}</span>
                  <div style="flex:1;">
                    <div style="font-size:0.85rem; color:var(--text-muted);">選項 ${letter} ${OPTION_ICONS[letter]}</div>
                    <div>${q.options[letter]}</div>
                  </div>
                </button>
              `;
            })
            .join("")}
        </div>

        <div style="margin-top:16px; text-align:center; font-weight:800; color:var(--wood-dark);">
          ${
            !isRevealed
              ? myVote
                ? `✅ 您已投出【選項 ${myVote}】！請等待師長揭曉全班 A/B/C/D 人數分佈与正確答案。`
                : "👆 請點選上方 A、B、C、D 其中一個選項送出答案"
              : myVote === q.correct
              ? `🎉 答對了！正確答案正是【選項 ${q.correct}】`
              : `💡 正確答案為【選項 ${q.correct}】（您剛才選了【${myVote || "未作答"}】）`
          }
        </div>
      </div>

      ${isRevealed || st.liveDiscussMode ? renderCorkboardDistributionHTML(q, dist, isRevealed) : ""}

      ${
        isRevealed
          ? `
        <div class="care-notebook">
          <h3 style="color:${myVote === q.correct ? "#1B5E20" : "#C0392B"}; margin-bottom:10px;">
            ${
              myVote === q.correct
                ? `✅ 正確答案：【選項 ${q.correct}】`
                : `📌 答錯溫馨提醒：本題正確答案是【選項 ${q.correct}】`
            }
          </h3>
          <div style="background:#E8F5E9; border:2px solid #81C784; border-radius:12px; padding:12px 16px; margin-bottom:14px;">
            <strong>🌟 核心照護原則：</strong> ${q.corePrinciple}
          </div>
          <div class="option-analysis-list">
            ${["A", "B", "C", "D"]
              .map(
                (letter) => `
              <div class="option-analysis-item ${
                letter === q.correct
                  ? "is-correct"
                  : letter === myVote
                  ? "is-user-wrong"
                  : ""
              }">
                <strong>選項 ${letter} ${
                  letter === q.correct ? "【正確答案】" : letter === myVote ? "【您的選擇】" : ""
                }：</strong> ${q.optionReasons[letter]}
              </div>
            `
              )
              .join("")}
          </div>
          <div class="sop-alert-box ${q.riskLevel === "red" ? "red-alert" : ""}">
            <div><strong>📋 機構 SOP 對照：</strong> ${q.sopReference}</div>
            <div style="margin-top:6px;"><strong>⚠️ 安全界線：</strong> ${q.redFlagAlert}</div>
          </div>
        </div>
      `
          : ""
      }
    `;

    root.querySelectorAll("[data-stu-choice]").forEach((btn) => {
      btn.onclick = async () => {
        const choice = btn.getAttribute("data-stu-choice");
        try {
          SoundFX.play("click");
          const updated = await syncEngine.submitVote(
            AppState.student.roomCode,
            AppState.student.participantId,
            q.id,
            choice
          );
          if (updated) {
            AppState.student.roomState = updated;
            renderApp();
          }
        } catch (err) {
          alert(err.message);
        }
      };
    });
  }

  // ==================== 5. 五關卡題庫審核與治理中心 (7A) ====================
  function openAuditModal() {
    const modal = document.getElementById("modal-container");
    if (!modal) return;
    modal.classList.remove("hidden");

    const renderModalContent = (filterTheme = "ALL") => {
      const allQ = getAllQuestions();
      const filtered = allQ.filter((q) => filterTheme === "ALL" || q.themeId === filterTheme);
      const publishedCount = allQ.filter((q) => q.auditStatus === "published").length;
      const draftCount = allQ.length - publishedCount;

      modal.innerHTML = `
        <div class="modal-window">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
            <h2 style="color:var(--wood-dark);">🛡️ 題庫五關卡審核與治理中心（7A 嚴格審核發布制）</h2>
            <button class="wood-btn" id="btn-close-modal">✖ 關閉</button>
          </div>

          <p style="font-size:0.9rem; color:var(--text-sub); margin-bottom:12px;">
            依拍板決策 <strong>6B（96題完整題庫）</strong> 與 <strong>7A（五關卡審核發布制）</strong>，所有題目必須完整通過「①撰題草稿 → ②失智專業審核 → ③教育訓練審核 → ④機構SOP對照 → ⑤正式發布」五道關卡才可進入課堂。目前正式發布：<strong>${publishedCount}</strong> 題｜待審草稿：<strong>${draftCount}</strong> 題。
          </p>

          <details style="background:#FFF8E7; border:2px solid var(--wood-border); border-radius:12px; padding:14px; margin-bottom:16px;">
            <summary style="font-weight:800; cursor:pointer; color:var(--accent-orange);">
              ➕ 新增撰題草稿（送入五關卡審核流程，未完成五關審核前不會進入課堂題庫）
            </summary>
            <div style="margin-top:12px; display:grid; gap:10px;">
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                <div>
                  <label>歸屬主題：</label>
                  <select id="new-q-theme" class="form-select">
                    <option value="theme1">主題一：溝通方法與原則</option>
                    <option value="theme2">主題二：照顧方式（日常問題）</option>
                  </select>
                </div>
                <div>
                  <label>風險分級（綠/黃/紅）：</label>
                  <select id="new-q-risk" class="form-select">
                    <option value="green">綠色：一般溝通與支持</option>
                    <option value="yellow">黃色：需搭配個別照護計畫</option>
                    <option value="red">紅色：急症異常（僅測辨識與通報）</option>
                  </select>
                </div>
              </div>
              <div>
                <label>去識別化情境題幹：</label>
                <textarea id="new-q-stem" class="form-textarea" rows="2" placeholder="請輸入100%去識別化之長照情境題幹..."></textarea>
              </div>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                <input id="new-q-optA" class="form-input" placeholder="選項 A 內容" />
                <input id="new-q-optB" class="form-input" placeholder="選項 B 內容" />
                <input id="new-q-optC" class="form-input" placeholder="選項 C 內容" />
                <input id="new-q-optD" class="form-input" placeholder="選項 D 內容" />
              </div>
              <div style="display:grid; grid-template-columns:140px 1fr; gap:8px;">
                <select id="new-q-correct" class="form-select">
                  <option value="A">正解：A</option>
                  <option value="B">正解：B</option>
                  <option value="C" selected>正解：C</option>
                  <option value="D">正解：D</option>
                </select>
                <input id="new-q-principle" class="form-input" placeholder="核心照護原則與為什麼較合適..." />
              </div>
              <div>
                <input id="new-q-sop" class="form-input" placeholder="對應之機構 SOP 名稱與需通報警示條件..." />
              </div>
              <button class="wood-btn primary" id="btn-submit-draft">📥 建立第 1 關「撰題草稿」並送審</button>
            </div>
          </details>

          <div style="display:flex; gap:8px; margin-bottom:12px;">
            <button class="wood-btn ${filterTheme === "ALL" ? "active-toggle" : ""}" data-filter-t="ALL">全部 (${allQ.length})</button>
            <button class="wood-btn ${filterTheme === "theme1" ? "active-toggle" : ""}" data-filter-t="theme1">主題一：溝通原則</button>
            <button class="wood-btn ${filterTheme === "theme2" ? "active-toggle" : ""}" data-filter-t="theme2">主題二：日常照顧</button>
          </div>

          <div style="max-height:380px; overflow-y:auto; display:grid; gap:10px;">
            ${filtered
              .map(
                (q) => `
              <div style="background:#FFFFFF; border:2px solid #D7CCC8; border-radius:12px; padding:12px;">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">
                  <strong>[${q.id}] ${q.unitTitle}（正解：${q.correct}）</strong>
                  <span class="risk-badge ${RISK_LABELS[q.riskLevel]?.cls || "risk-green"}">${q.riskLevel.toUpperCase()}</span>
                </div>
                <div style="font-size:0.9rem; margin:6px 0;">${q.stem}</div>
                <div class="audit-pipeline">
                  <span class="audit-step ${q.auditTrail?.draft ? "done" : ""}">① 撰題草稿</span>
                  <span class="audit-step ${q.auditTrail?.clinical ? "done" : ""}">② 失智專業審核</span>
                  <span class="audit-step ${q.auditTrail?.education ? "done" : ""}">③ 教育訓練審核</span>
                  <span class="audit-step ${q.auditTrail?.sop ? "done" : ""}">④ SOP對照</span>
                  <span class="audit-step ${q.auditTrail?.published ? "done" : ""}">⑤ 正式發布</span>
                </div>
                ${
                  q.auditStatus !== "published"
                    ? `<button class="wood-btn green" data-approve-id="${q.id}" style="font-size:0.8rem; padding:4px 12px;">
                        ✅ 完成五關卡審核簽核並發布
                      </button>`
                    : `<div style="font-size:0.8rem; color:var(--text-muted);">SOP對照：${q.sopReference}｜複審日：${q.reviewDate}</div>`
                }
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      `;

      document.getElementById("btn-close-modal").onclick = () => {
        modal.classList.add("hidden");
        renderApp();
      };

      modal.querySelectorAll("[data-filter-t]").forEach((btn) => {
        btn.onclick = () => renderModalContent(btn.getAttribute("data-filter-t"));
      });

      const btnDraft = document.getElementById("btn-submit-draft");
      if (btnDraft) {
        btnDraft.onclick = () => {
          const themeId = document.getElementById("new-q-theme").value;
          const riskLevel = document.getElementById("new-q-risk").value;
          const stem = window.CareRoomSyncEngine.sanitizeText(document.getElementById("new-q-stem").value, 240);
          const optA = window.CareRoomSyncEngine.sanitizeText(document.getElementById("new-q-optA").value, 140);
          const optB = window.CareRoomSyncEngine.sanitizeText(document.getElementById("new-q-optB").value, 140);
          const optC = window.CareRoomSyncEngine.sanitizeText(document.getElementById("new-q-optC").value, 140);
          const optD = window.CareRoomSyncEngine.sanitizeText(document.getElementById("new-q-optD").value, 140);
          const correct = document.getElementById("new-q-correct").value;
          const principle = window.CareRoomSyncEngine.sanitizeText(document.getElementById("new-q-principle").value, 200);
          const sop = window.CareRoomSyncEngine.sanitizeText(document.getElementById("new-q-sop").value, 200);

          if (!stem || !optA || !optB || !optC || !optD || !principle || !sop) {
            alert("請完整填寫情境題幹、四個選項、核心原則與機構SOP對照！");
            return;
          }

          let custom = [];
          try {
            custom = JSON.parse(localStorage.getItem("care_game_custom_questions_v1") || "[]");
          } catch (e) {}

          const newId = `CUST-${custom.length + 1}`;
          custom.unshift({
            id: newId,
            themeId,
            themeTitle: themeId === "theme1" ? "長照失智長者的溝通方法與原則" : "失智長者的照顧方式（日常生活常見問題）",
            unitId: themeId === "theme1" ? "T1-U1" : "T2-U1",
            unitTitle: "自訂送審單元",
            scene: "lounge",
            riskLevel,
            stem,
            options: { A: optA, B: optB, C: optC, D: optD },
            correct,
            optionReasons: {
              A: correct === "A" ? `正確！${principle}` : "此選項未優先考量長者情緒或安全需求。",
              B: correct === "B" ? `正確！${principle}` : "此選項未優先考量長者情緒或安全需求。",
              C: correct === "C" ? `正確！${principle}` : "此選項未優先考量長者情緒或安全需求。",
              D: correct === "D" ? `正確！${principle}` : "此選項未優先考量長者情緒或安全需求。"
            },
            corePrinciple: principle,
            sopReference: sop,
            redFlagAlert: "現場請依長輩個別照護計畫與機構 SOP 辦理。",
            source: "機構自訂送審題目",
            version: "v1.0-draft",
            auditStatus: "draft", // 7A：預設為草稿，需經五關卡簽核才可發布
            auditTrail: { draft: true, clinical: false, education: false, sop: false, published: false },
            reviewDate: "2027-05-12"
          });
          localStorage.setItem("care_game_custom_questions_v1", JSON.stringify(custom));
          renderModalContent(filterTheme);
        };
      }

      modal.querySelectorAll("[data-approve-id]").forEach((btn) => {
        btn.onclick = () => {
          const qid = btn.getAttribute("data-approve-id");
          let custom = [];
          try {
            custom = JSON.parse(localStorage.getItem("care_game_custom_questions_v1") || "[]");
          } catch (e) {}
          const target = custom.find((item) => item.id === qid);
          if (target) {
            target.auditStatus = "published";
            target.version = "v1.0";
            target.auditTrail = { draft: true, clinical: true, education: true, sop: true, published: true };
            localStorage.setItem("care_game_custom_questions_v1", JSON.stringify(custom));
            renderModalContent(filterTheme);
          }
        };
      });
    };

    renderModalContent("ALL");
  }

  // ==================== 6. 雲端同步設定面板 (4B) ====================
  function openCloudConfigModal() {
    const modal = document.getElementById("modal-container");
    if (!modal) return;
    modal.classList.remove("hidden");
    const cfg = syncEngine.cloudConfig;

    modal.innerHTML = `
      <div class="modal-window">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
          <h2 style="color:var(--wood-dark);">☁️ 多人連線與託管雲端同步設定（4B 架構）</h2>
          <button class="wood-btn" id="btn-close-cloud-modal">✖ 關閉</button>
        </div>

        <div style="background:#FFF8E7; border:2px solid var(--wood-border); border-radius:12px; padding:14px; margin-bottom:16px; font-size:0.92rem;">
          <strong>💡 兩種連線方式說明：</strong>
          <ol style="margin-left:20px; margin-top:6px;">
            <li><strong>同機雙視窗預覽模式（免設定，立即可用）</strong>：在同一台電腦點擊「開啟學員手機模擬視窗」，即可透過瀏覽器 <code>BroadcastChannel</code> 100% 即時同步體驗師長開房、學員投票與 ABCD 人數分佈。</li>
            <li><strong>跨手機掃 QR Code 雲端同步（Firebase Realtime Database）</strong>：將本網站部署至 GitHub Pages / Vercel / 區網伺服器後，於下方填入您的免費 Firebase Realtime Database 網址（例如 <code>https://your-app-default-rtdb.firebaseio.com</code>），全班學員即可用各自手機掃描 QR Code 即時同步作答！</li>
          </ol>
        </div>

        <div class="form-group">
          <label for="cfg-firebase-url">Firebase Realtime Database URL（選填，留空則使用本機雙視窗同步）：</label>
          <input type="url" id="cfg-firebase-url" class="form-input" value="${cfg.firebaseDbUrl || ""}" placeholder="https://your-project-default-rtdb.firebaseio.com" />
        </div>

        <div class="form-group">
          <label for="cfg-public-url">自訂 QR Code 公開網址基準（選填，留空自動抓取當前網頁網址）：</label>
          <input type="url" id="cfg-public-url" class="form-input" value="${cfg.customPublicUrl || ""}" placeholder="例如 https://your-name.github.io/dementia-care-game/" />
        </div>

        <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:18px;">
          <button class="wood-btn primary" id="btn-save-cloud-cfg">💾 儲存連線設定</button>
        </div>
      </div>
    `;

    document.getElementById("btn-close-cloud-modal").onclick = () => {
      modal.classList.add("hidden");
    };

    document.getElementById("btn-save-cloud-cfg").onclick = () => {
      const fbUrl = document.getElementById("cfg-firebase-url").value;
      const pubUrl = document.getElementById("cfg-public-url").value;
      syncEngine.saveCloudConfig({
        provider: fbUrl ? "firebase" : "local_or_firebase",
        firebaseDbUrl: fbUrl,
        customPublicUrl: pubUrl
      });
      modal.classList.add("hidden");
      renderApp();
    };
  }

  // 初始化與監聽同步事件
  function init() {
    // 監聽房間狀態更新
    syncEngine.onStateChange((newState) => {
      if (
        (AppState.view === "HOST_LOBBY" || AppState.view === "HOST_GAME") &&
        AppState.host.roomState &&
        newState.roomCode === AppState.host.roomState.roomCode
      ) {
        AppState.host.roomState = newState;
        renderApp();
      } else if (
        AppState.view === "STUDENT_GAME" &&
        AppState.student.roomCode === newState.roomCode
      ) {
        AppState.student.roomState = newState;
        renderApp();
      }
    });

    // 頂部工具列按鈕綁定
    const brandHome = document.getElementById("brand-home-link");
    if (brandHome) {
      brandHome.onclick = () => {
        AppState.view = "HOME";
        renderApp();
      };
    }

    const btnAudit = document.getElementById("btn-open-audit");
    if (btnAudit) btnAudit.onclick = () => openAuditModal();

    const btnCloud = document.getElementById("btn-open-cloud");
    if (btnCloud) btnCloud.onclick = () => openCloudConfigModal();

    const btnLargeText = document.getElementById("btn-toggle-large-text");
    if (btnLargeText) {
      btnLargeText.onclick = () => {
        AppState.largeText = !AppState.largeText;
        document.body.classList.toggle("large-text-mode", AppState.largeText);
        btnLargeText.classList.toggle("active-toggle", AppState.largeText);
      };
    }

    const btnMotion = document.getElementById("btn-toggle-motion");
    if (btnMotion) {
      btnMotion.onclick = () => {
        AppState.reducedMotion = !AppState.reducedMotion;
        document.body.classList.toggle("reduced-motion", AppState.reducedMotion);
        btnMotion.classList.toggle("active-toggle", AppState.reducedMotion);
      };
    }

    const btnMute = document.getElementById("btn-toggle-mute");
    if (btnMute) {
      btnMute.onclick = () => {
        SoundFX.muted = !SoundFX.muted;
        btnMute.textContent = SoundFX.muted ? "🔇 音效已關" : "🔊 溫馨音效";
        btnMute.classList.toggle("active-toggle", SoundFX.muted);
      };
    }

    // 檢查網址是否帶有 ?room=XXXXXX&token=YYYY（掃描 QR Code 自動跳轉學員加入畫面）
    const params = new URLSearchParams(window.location.search);
    const roomParam = params.get("room");
    const tokenParam = params.get("token");
    if (roomParam) {
      AppState.student.roomCode = roomParam.trim().toUpperCase();
      AppState.student.token = tokenParam ? tokenParam.trim() : "";
      AppState.view = "STUDENT_JOIN";
    }

    renderApp();
  }

  window.addEventListener("DOMContentLoaded", init);
})();
