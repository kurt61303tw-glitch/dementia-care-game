/* ==========================================================================
   Q 版長照機構場景與尊嚴長者／照護人員 SVG 插畫引擎 (illustrations.js)
   嚴格遵守：成人長者比例與體面服裝、溫暖日照交誼廳與日常場域、去 3C 感
   ========================================================================== */

window.CareIllustrations = {
  /**
   * 根據場景類型與角色情緒狀態繪製 Q 版長照機構舞台 SVG
   * @param {string} sceneType - 'lounge' | 'corridor' | 'dining' | 'bathroom' | 'garden'
   * @param {string} mood - 'warm' | 'confused' | 'reassured' | 'alert'
   * @param {string} badgeText - 場景右上角木牌文字
   */
  renderSceneSVG(sceneType = 'lounge', mood = 'warm', badgeText = '陽光長照機構・日常劇場') {
    const bgPalettes = {
      lounge: { wall: '#FFF8E7', floor: '#E6CCB2', trim: '#B08968', windowSky: '#E1F5FE', windowFrame: '#8D6E63', label: '陽光交誼廳' },
      corridor: { wall: '#FAF3E0', floor: '#D7CCC8', trim: '#8D6E63', windowSky: '#FFF9C4', windowFrame: '#795548', label: '溫馨無障礙走廊' },
      dining: { wall: '#FFFDF7', floor: '#E6CCB2', trim: '#A1887F', windowSky: '#FFE0B2', windowFrame: '#6D4C41', label: '暖心懷舊餐廳' },
      bathroom: { wall: '#F1F8E9', floor: '#DCEDC8', trim: '#689F38', windowSky: '#E0F7FA', windowFrame: '#558B2F', label: '安全尊嚴盥洗區外' },
      garden: { wall: '#E8F5E9', floor: '#C8E6C9', trim: '#4E9F6E', windowSky: '#B3E5FC', windowFrame: '#388E3C', label: '陽光療癒花園步道' }
    };

    const pal = bgPalettes[sceneType] || bgPalettes.lounge;

    // 長者表情（困擾疑問 vs 安心微笑）
    const elderMouth = mood === 'confused' || mood === 'alert'
      ? `<path d="M 243 136 Q 250 131 257 136" stroke="#5D4037" stroke-width="2.5" fill="none" stroke-linecap="round"/>`
      : `<path d="M 242 133 Q 250 140 258 133" stroke="#5D4037" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;

    const elderBrows = mood === 'confused' || mood === 'alert'
      ? `<path d="M 234 114 L 243 117 M 266 114 L 257 117" stroke="#5D4037" stroke-width="2.2" stroke-linecap="round"/>`
      : `<path d="M 234 115 Q 239 112 244 115 M 256 115 Q 261 112 266 115" stroke="#5D4037" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;

    // 情緒氣泡（不醜化，用溫和符號表示需求或安心）
    let moodBubble = '';
    if (mood === 'confused') {
      moodBubble = `
        <g class="q-float">
          <rect x="285" y="55" width="76" height="40" rx="14" fill="#FFF8E7" stroke="#E67E22" stroke-width="2.5"/>
          <text x="323" y="81" text-anchor="middle" font-size="18" font-weight="bold" fill="#D35400">？ 焦急</text>
        </g>`;
    } else if (mood === 'reassured') {
      moodBubble = `
        <g class="q-pulse">
          <rect x="285" y="55" width="84" height="40" rx="14" fill="#E8F5E9" stroke="#2E7D32" stroke-width="2.5"/>
          <text x="327" y="81" text-anchor="middle" font-size="16" font-weight="bold" fill="#1B5E20">♥ 安心信任</text>
        </g>`;
    } else if (mood === 'alert') {
      moodBubble = `
        <g class="q-pulse">
          <rect x="280" y="55" width="102" height="40" rx="14" fill="#FDEDEC" stroke="#C0392B" stroke-width="2.5"/>
          <text x="331" y="81" text-anchor="middle" font-size="15" font-weight="bold" fill="#B71C1C">⚠ 需安全評估</text>
        </g>`;
    } else {
      moodBubble = `
        <g class="q-float">
          <rect x="285" y="55" width="88" height="38" rx="14" fill="#FFF8E7" stroke="#8D6E63" stroke-width="2"/>
          <text x="329" y="79" text-anchor="middle" font-size="14" font-weight="bold" fill="#5D4037">☀ 溫馨陪伴</text>
        </g>`;
    }

    return `
    <svg viewBox="0 0 800 230" width="100%" height="230" role="img" aria-label="${pal.label}情境插畫" style="max-width:800px; display:block;">
      <!-- 背景牆面與木地板 -->
      <rect x="0" y="0" width="800" height="170" fill="${pal.wall}"/>
      <rect x="0" y="162" width="800" height="10" fill="${pal.trim}"/>
      <rect x="0" y="172" width="800" height="58" fill="${pal.floor}"/>

      <!-- 機構陽光木窗 -->
      <g transform="translate(55, 22)">
        <rect x="0" y="0" width="130" height="105" rx="8" fill="${pal.windowSky}" stroke="${pal.windowFrame}" stroke-width="6"/>
        <line x1="65" y1="0" x2="65" y2="105" stroke="${pal.windowFrame}" stroke-width="5"/>
        <line x1="0" y1="52" x2="130" y2="52" stroke="${pal.windowFrame}" stroke-width="5"/>
        <circle cx="34" cy="26" r="12" fill="#FFD54F" opacity="0.85"/>
        <!-- 暖色窗簾 -->
        <path d="M -6 -4 Q 16 45 4 108 L -10 108 Z" fill="#FFCCBC" stroke="#8D6E63" stroke-width="2"/>
        <path d="M 136 -4 Q 114 45 126 108 L 140 108 Z" fill="#FFCCBC" stroke="#8D6E63" stroke-width="2"/>
      </g>

      <!-- 懷舊大字日曆與時鐘（長照現實導向元素） -->
      <g transform="translate(415, 24)">
        <rect x="0" y="0" width="74" height="86" rx="6" fill="#FFFFFF" stroke="#8D6E63" stroke-width="3"/>
        <rect x="0" y="0" width="74" height="24" rx="4" fill="#E67E22"/>
        <text x="37" y="17" text-anchor="middle" font-size="12" font-weight="bold" fill="#FFFFFF">平安日曆</text>
        <text x="37" y="56" text-anchor="middle" font-size="24" font-weight="900" fill="#3E2723">12</text>
        <text x="37" y="75" text-anchor="middle" font-size="11" font-weight="bold" fill="#6D4C41">陽光好日</text>
      </g>

      <!-- 綠色療癒植栽 -->
      <g transform="translate(690, 95)">
        <rect x="14" y="45" width="36" height="32" rx="4" fill="#D35400" stroke="#6D4C41" stroke-width="2.5"/>
        <ellipse cx="32" cy="30" rx="22" ry="18" fill="#66BB6A"/>
        <ellipse cx="18" cy="36" rx="14" ry="12" fill="#4CAF50"/>
        <ellipse cx="46" cy="36" rx="14" ry="12" fill="#81C784"/>
      </g>

      <!-- 場景標示木牌 -->
      <g transform="translate(555, 18)">
        <rect x="0" y="0" width="215" height="36" rx="10" fill="#795548" stroke="#4E342E" stroke-width="2.5"/>
        <text x="107" y="23" text-anchor="middle" font-size="13" font-weight="bold" fill="#FFF8E7">${badgeText}</text>
      </g>

      <!-- Q版尊嚴長者角色（林爺爺／陳奶奶：體面毛衣開襟衫、銀白髮、溫和成人比例） -->
      <g class="q-float" transform="translate(0, 4)">
        <!-- 身體與溫暖針織衫 -->
        <path d="M 214 198 C 214 156 286 156 286 198 Z" fill="#8D6E63" stroke="#4E342E" stroke-width="3"/>
        <path d="M 235 162 L 250 185 L 265 162 Z" fill="#FFF8E7"/>
        <!-- 臉龐與銀髮 -->
        <circle cx="250" cy="122" r="32" fill="#FFE0B2" stroke="#5D4037" stroke-width="3"/>
        <path d="M 218 118 C 216 88 284 88 282 118 C 272 104 228 104 218 118 Z" fill="#ECEFF1" stroke="#78909C" stroke-width="2.5"/>
        <!-- 溫和老花眼鏡與眼神 -->
        <circle cx="239" cy="123" r="7" fill="none" stroke="#6D4C41" stroke-width="2"/>
        <circle cx="261" cy="123" r="7" fill="none" stroke="#6D4C41" stroke-width="2"/>
        <line x1="246" y1="123" x2="254" y2="123" stroke="#6D4C41" stroke-width="2"/>
        <circle cx="239" cy="123" r="2.8" fill="#3E2723"/>
        <circle cx="261" cy="123" r="2.8" fill="#3E2723"/>
        ${elderBrows}
        ${elderMouth}
        <!-- 臉頰溫暖氣色 -->
        <ellipse cx="229" cy="130" rx="5" ry="3" fill="#FFAB91" opacity="0.6"/>
        <ellipse cx="271" cy="130" rx="5" ry="3" fill="#FFAB91" opacity="0.6"/>
        <rect x="218" y="200" width="64" height="20" rx="8" fill="#5D4037"/>
        <text x="250" y="214" text-anchor="middle" font-size="11" font-weight="bold" fill="#FFF8E7">機構長輩</text>
      </g>

      ${moodBubble}

      <!-- Q版專業照護夥伴角色（眼神平視、微笑傾聽姿態） -->
      <g class="q-float" transform="translate(270, 6)">
        <!-- 照護服 -->
        <path d="M 214 196 C 214 154 286 154 286 196 Z" fill="#4E9F6E" stroke="#1B5E20" stroke-width="3"/>
        <rect x="242" y="160" width="16" height="28" rx="4" fill="#FFF8E7"/>
        <!-- 臉龐與髮型 -->
        <circle cx="250" cy="122" r="30" fill="#FFE0B2" stroke="#5D4037" stroke-width="3"/>
        <path d="M 220 120 C 218 86 282 86 280 120 C 268 102 232 102 220 120 Z" fill="#4E342E" stroke="#3E2723" stroke-width="2"/>
        <!-- 友善眼睛與微笑 -->
        <circle cx="240" cy="123" r="3.2" fill="#3E2723"/>
        <circle cx="260" cy="123" r="3.2" fill="#3E2723"/>
        <path d="M 242 134 Q 250 141 258 134" stroke="#5D4037" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <ellipse cx="231" cy="130" rx="5" ry="3" fill="#FFAB91" opacity="0.65"/>
        <ellipse cx="269" cy="130" rx="5" ry="3" fill="#FFAB91" opacity="0.65"/>
        <rect x="214" y="198" width="72" height="20" rx="8" fill="#2E7D32"/>
        <text x="250" y="212" text-anchor="middle" font-size="11" font-weight="bold" fill="#FFFFFF">照護夥伴</text>
      </g>
    </svg>`;
  }
};
