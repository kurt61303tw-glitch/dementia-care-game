/* ==========================================================================
   主題二題庫：失智長者的照顧方式（日常生活常見問題）（4 單元 × 12 題 ＝ 48 題）
   拍板規格：6B (96題完整規模) + 7A (五關卡審核發布制) + 綠/黃/紅風險分級
   ========================================================================== */

window.QUESTIONS_THEME_2 = [
  // ================= 單元 1：飲食與飲水支持（12題） =================
  {
    id: "T2-U1-01",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U1",
    unitTitle: "單元一：飲食與飲水支持",
    scene: "dining",
    riskLevel: "yellow",
    stem: "79歲的陳爺爺中午12點才剛吃完一整份便當，12點半又走到護理站生氣地說：「你們今天中午怎麼沒給我飯吃？想餓死我嗎？」此時最合適的照護處理為何？",
    options: {
      A: "拿出空便當盒給他看並大聲說：「陳爺爺，這盒就是您剛才吃光的便當，您記憶力退化忘記了啦！」",
      B: "直接再給他吃一個全滿的大便當，不管他一天吃幾餐。",
      C: "不爭辯他是否吃過，先溫和同理：「陳爺爺，肚子覺得有點餓了對不對？正餐我們剛用過，廚房現在有準備溫熱的低糖銀耳湯（或小份水果／薄餅乾），我們先去餐廳坐著吃一點好嗎？」並同步留意其進食總量與血糖／代謝狀況。",
      D: "叫他回房間喝自來水止餓。"
    },
    correct: "C",
    optionReasons: {
      A: "拿證據跟長者爭辯「您已經吃過了」只會讓長者覺得被騙或被羞辱，引發更大怒氣。",
      B: "無節制重複給予正餐可能導致消化不良、血糖飆升或肥胖。",
      C: "正確！先接納「覺得餓／想吃東西」的感受，不爭辯記憶；準備低熱量、好消化的健康小點心（少量多餐概念）滿足口慾與安全感，並請護理師/營養師評估飲食計畫。",
      D: "敷衍且不尊重長者需求。"
    },
    corePrinciple: "面對重複索食，不爭辯「已經吃過了」，改以「同理感受＋提供少量健康點心／分段供餐」並評估生理因素。",
    sopReference: "失智飲食照護SOP：重複索食之少量多餐分裝法與營養評估流程。",
    redFlagAlert: "可將正餐預留約1/4份量作為餐後30分鐘索食時提供；若伴隨體重異常變化或內分泌藥物影響應請醫師評估。",
    source: "衛福部失智照護資源手冊／營養照護指引",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U1-02",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U1",
    unitTitle: "單元一：飲食與飲水支持",
    scene: "dining",
    riskLevel: "yellow",
    stem: "平時胃口不錯的林奶奶，這兩天吃飯時把碗推開、緊閉嘴巴搖頭拒食。照護人員在嘗試哄她吃飯前，最優先應該先檢查或排除什麼？",
    options: {
      A: "直接認定她是失智症惡化在鬧脾氣，強行撬開嘴巴灌食。",
      B: "優先排除生理與環境因素：檢查口腔有無破皮潰瘍、牙痛、假牙鬆動磨破牙齦、便祕腹脹、發燒感染，或餐點溫度／軟硬度不合。",
      C: "馬上幫她申請插鼻胃管。",
      D: "處罰她今天不准看電視。"
    },
    correct: "B",
    optionReasons: {
      A: "強行灌食極易造成吸入性肺炎與口腔外傷，且完全忽略潛在病痛。",
      B: "正確！失智長者拒食最常見的原因並非故意抗拒，而是「牙痛、口腔潰瘍、鵝口瘡、假牙不合或便祕腹脹」卻說不出來；務必先檢查口腔與生理狀況。",
      C: "未找出原因前不應貿然侵入性處置。",
      D: "懲罰無助於解決拒食根因。"
    },
    corePrinciple: "失智長者突然拒食，第一優先是「檢查口腔（牙痛／潰瘍／假牙）與排除便祕、感染等生理不適」。",
    sopReference: "拒食評估與處置SOP：口腔檢查、排便紀錄核對與跨專業營養照會流程。",
    redFlagAlert: "若連續兩餐進食量低於50%或伴隨吞嚥疼痛、發燒，應立即通報護理師評估。",
    source: "臺北榮總高齡醫學中心失智照護指引",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U1-03",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U1",
    unitTitle: "單元一：飲食與飲水支持",
    scene: "dining",
    riskLevel: "green",
    stem: "張爺爺用餐時常被餐廳裡走動的人影、電視聲以及餐盤上同時擺放的五、六個小碟子分心，結果吃兩口就停下來玩筷子。如何調整最能幫助他專心用餐？",
    options: {
      A: "在餐桌上多擺幾樣玩具讓他邊玩邊吃。",
      B: "簡化用餐環境與桌面：關閉電視干擾、安排靠牆或安靜座位，桌面一次只放 1 至 2 道菜與單一好拿的餐具（如湯匙）。",
      C: "站在他後面拿碼錶倒數計時催他快吃。",
      D: "把所有飯菜湯全部倒進果汁機打成黑糊狀給他喝。"
    },
    correct: "B",
    optionReasons: {
      A: "增加桌面雜物會讓注意力更分散。",
      B: "正確！失智長者容易因視覺與聽覺刺激過多而分心；「降噪＋簡化桌面（一次1~2道菜、單一餐具）」能顯著提升進食專注度。",
      C: "倒數催促會造成焦慮與嗆咳。",
      D: "若長者仍有咀嚼能力，將所有食物混打成糊會破壞食慾與視覺美感。"
    },
    corePrinciple: "用餐時「關閉電視雜音、簡化桌面擺設（一次呈現少數菜色與單一餐具）」，減少分心刺激。",
    sopReference: "失智專區用餐環境管理SOP：低干擾進食空間配置。",
    redFlagAlert: "桌面避免擺放外型酷似食物之清潔用品、裝飾假水果或醬料包，防範誤食。",
    source: "WHO iSupport 飲食照護篇",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U1-04",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U1",
    unitTitle: "單元一：飲食與飲水支持",
    scene: "dining",
    riskLevel: "yellow",
    stem: "中重度失智的黃奶奶吃飯時常把飯含在嘴巴裡許久不吞下去（含飯行為）。在排除口腔疼痛後，下列哪種照護技巧最恰當？",
    options: {
      A: "趁她含著一大口飯時，趕快再塞第二大口進去把前一口擠下去。",
      B: "用手捏住她的鼻子逼她吞下去。",
      C: "改用小湯匙一口一口餵、避免單口份量過大；以空湯匙輕觸下唇或搭配語言與動作示範（「黃奶奶，我們嚼一嚼，咕嚕吞下去喔」），並可交替提供溫潤帶點酸甜感或合適質地的食物誘發吞嚥反射。",
      D: "直接讓她含著飯去躺平睡午覺。"
    },
    correct: "C",
    optionReasons: {
      A: "口中還有食物時強塞下一口，極易導致窒息或吸入性肺炎！",
      B: "捏鼻子逼吞極度危險，會導致食物在換氣時直接吸入氣管。",
      C: "正確！確認前一口吞乾淨再給下一口；利用小口進食、口語與吞嚥動作示範及適度感官刺激，能安全引導吞嚥啟動。",
      D: "含著食物躺平睡覺會在睡夢中發生致命誤吸與窒息！餐後務必執行口腔檢查清口。"
    },
    corePrinciple: "處理含飯行為須「確認吞完再給下一口、小口進食、動作示範引導」，且餐後必做口腔檢查確保無殘留。",
    sopReference: "失智含飯與延遲吞嚥照護SOP：一口量控制與餐後口腔檢查規範。",
    redFlagAlert: "餐後務必維持坐姿至少30分鐘，並檢查兩側臉頰齒齦溝有無殘留飯粒。",
    source: "長照吞嚥安全與失智飲食照護指引",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U1-05",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U1",
    unitTitle: "單元一：飲食與飲水支持",
    scene: "lounge",
    riskLevel: "green",
    stem: "失智的趙爺爺口渴感退化，每次端一大馬克杯（500ml）白開水請他喝，他都搖頭說「喝不下、不要」。如何調整最能幫助他補足每日水分？",
    options: {
      A: "規定他一口氣喝完 500ml 才能離開座位。",
      B: "改用小巧輕便、他喜歡的茶杯，「少量多次（每次約 50~100ml）」邀請乾杯，並可搭配富含水分的食物（如冬瓜湯、愛玉、蒸蛋、水果泥或淡花果茶）增加飲水意願。",
      C: "既然他不愛喝水，就整天都不給他水喝，這樣還不用換尿布。",
      D: "在白開水裡加大量鹽巴。"
    },
    correct: "B",
    optionReasons: {
      A: "過大容器與強迫牛飲會造成長輩心理負擔與嗆咳。",
      B: "正確！高齡與失智長者口渴中樞退化，採用「小杯具、少量多次、乾杯儀式感、結合含水點心與湯品」最能自然達成每日水分目標。",
      C: "水分攝取不足會導致脫水、便祕、泌尿道感染與急性譫妄！",
      D: "亂加大量鹽巴會造成高血鈉與心血管負擔。"
    },
    corePrinciple: "運用「小杯少量多次、乾杯互動、搭配含水點心湯品」，預防失智長者因口渴感退化而脫水。",
    sopReference: "高齡失智水分補充SOP：每日水分攝取監測與多元補水技巧。",
    redFlagAlert: "若長者有心臟衰竭或慢性腎病醫囑限水，每日總水量應嚴格依醫師與護理師指示辦理。",
    source: "衛福部高齡營養與水分照護建議",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U1-06",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U1",
    unitTitle: "單元一：飲食與飲水支持",
    scene: "dining",
    riskLevel: "green",
    stem: "呂奶奶因為失用症（Apraxia）漸漸不會使用筷子與湯匙，看著飯菜不知如何下手，有時會想直接用手抓來吃。照護人員如何支持最兼顧營養與尊嚴？",
    options: {
      A: "拍打她的手說：「手那麼髒怎麼可以用手抓飯吃！」",
      B: "餐前先溫和帶呂奶奶洗淨雙手，並與廚房配合準備好拿取、不沾手的「手指食物（Finger foods，如小飯糰、切塊軟質蔬菜、小蒸餃、雞肉條）」，讓她能優雅自主地進食。",
      C: "把她的雙手綁在輪椅扶手上，全部由別人餵。",
      D: "把飯菜收走不讓她吃。"
    },
    correct: "B",
    optionReasons: {
      A: "拍打與斥責會讓長者感到羞愧而拒食。",
      B: "正確！當長者失去餐具操作能力但手部仍能抓握時，餐前洗手並提供設計良好的「手指食物（Finger foods）」，能讓長者維持自己進食的樂趣與自尊。",
      C: "不當身體約束嚴重違法且違背照護倫理。",
      D: "收走飯菜會造成營養不良。"
    },
    corePrinciple: "當長者不會使用餐具時，餐前清潔雙手並提供「手指食物（Finger foods）」，維持自主進食能力。",
    sopReference: "失智自立進食支持SOP：手指食物設計與手部衛生規範。",
    redFlagAlert: "手指食物應切成適口大小且質地軟嫩，避免湯圓、整顆貢丸或大塊年糕等易噎住食物。",
    source: "國際失智照護飲食指引（Finger Foods in Dementia）",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U1-07",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U1",
    unitTitle: "單元一：飲食與飲水支持",
    scene: "dining",
    riskLevel: "yellow",
    stem: "施爺爺最近吃飯時突然懷疑「飯菜裡被人下了毒」，緊閉嘴巴不敢吃。照護人員在安撫與引導進食時，下列哪個做法較能建立他的信任？",
    options: {
      A: "大聲罵他：「我們是合格長照機構，誰吃飽太閒給您下毒！」",
      B: "把藥粉偷偷拌在他的白飯裡，被他發現苦味也沒關係。",
      C: "不爭辯下毒妄想，讓他看到食物是從大家共用的大餐盤或密封包裝取出的，或由照護員用乾淨公筷先夾一小口同鍋菜品嚐示範：「施爺爺，今天這鍋高麗菜好甜喔，我們大家都是吃這一鍋，您也來嚐一口好嗎？」",
      D: "強行捏開他的嘴巴把飯塞進去。"
    },
    correct: "C",
    optionReasons: {
      A: "爭辯無法消除被害妄想，反而讓長者覺得你在掩飾。",
      B: "大忌！把藥物偷偷混入飯菜會改變食物味道，一旦被有被害妄想的長者吃出苦味，會徹底證實「飯裡有毒」的信念，從此完全拒食！",
      C: "正確！透過「共鍋共享視覺見證、公筷示範品嚐」或提供完整未拆封點心，且絕不將藥物混入正餐，能有效降低長者的防戒心。",
      D: "強行塞食會引發激烈反抗與嗆咳。"
    },
    corePrinciple: "面對懷疑飯菜有毒的長者，採「同鍋視覺見證／公筷示範」，且嚴禁將苦味藥物偷偷混入正餐飯菜中。",
    sopReference: "失智被害妄想拒食處置SOP與給藥倫理規範。",
    redFlagAlert: "若長者因妄想導致長期拒絕服藥與進食，應通報醫師與藥師評估調整劑型或治療方案。",
    source: "失智症BPSD臨床照護指引",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U1-08",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U1",
    unitTitle: "單元一：飲食與飲水支持",
    scene: "dining",
    riskLevel: "green",
    stem: "有些失智長輩在用餐時間坐不住，吃兩口就站起來在餐廳走動（邊走邊動）。在不影響吞嚥安全的前提下，如何協助這類高活動量長輩攝取足夠營養？",
    options: {
      A: "用約束帶把他綁在餐椅上直到吃完為止。",
      B: "只要他一站起來就把碗收走，整餐不給他吃。",
      C: "理解其久坐耐受度較低，先陪伴走一小段後再溫和邀回座位吃幾口（分段進食），或準備營養密度高、方便拿取的軟質小點心（如小包子、營養補充飲品）於休息時分段補充。",
      D: "在他跑步的時候追在後面把湯灌進他嘴裡。"
    },
    correct: "C",
    optionReasons: {
      A: "為了吃飯而使用約束帶違反最小限制原則，且會引發劇烈掙扎。",
      B: "收走餐點會導致熱量消耗大卻攝取不足，造成體重快速減輕。",
      C: "正確！採用「分段進食＋高營養密度小份量點心」，並在安全坐定時才進食，兼顧防嗆安全與熱量補充。",
      D: "行走或跑動中餵食湯水極易發生嗆咳與誤吸！"
    },
    corePrinciple: "對久坐困難之失智長者採「少量多餐分段進食＋高營養密度小點」，但務必於停下坐穩時才入口防嗆。",
    sopReference: "遊走型失智長者營養支持SOP：分段供餐與防嗆安全規範。",
    redFlagAlert: "每月定期監測體重變化，若一個月體重減輕超過5%應照會營養師介入。",
    source: "長照機構營養與失智照護實務",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U1-09",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U1",
    unitTitle: "單元一：飲食與飲水支持",
    scene: "dining",
    riskLevel: "green",
    stem: "失智長輩隨著味覺退化，常覺得食物「沒味道」而食慾下降，有時只想吃重甜或重鹹的食物。照護與備餐上如何調整最健康有效？",
    options: {
      A: "每餐都幫他倒半罐醬油跟兩大匙白糖。",
      B: "善用天然辛香料與食材原味（如蔥、薑、蒜、九層塔、番茄、檸檬微酸、香菇、柴魚高湯）提香增味，並保持食物溫熱散發香氣，減少對高鈉高糖的依賴。",
      C: "規定他只能吃完全不加任何調味料的水煮菜。",
      D: "罵他挑嘴難伺候。"
    },
    correct: "B",
    optionReasons: {
      A: "過量醬油與糖分會造成高血壓、水腫與血糖失控。",
      B: "正確！利用天然香氣食材、微酸開胃風味與溫熱色澤刺激嗅覺與味蕾，能在不增加腎臟心血管負擔下提升食慾。",
      C: "完全無味的水煮餐會讓高齡長者徹底失去食慾。",
      D: "味蕾退化是生理現象而非挑嘴。"
    },
    corePrinciple: "味覺退化時，善用「天然香料、微酸甘甜食材與溫熱香氣」刺激食慾，避免過量鹽糖。",
    sopReference: "高齡失智快樂餐飲設計指引。",
    redFlagAlert: "餐前帶領長輩做簡單的「健口操（唾液腺按摩與舌頭運動）」，也能促進唾液分泌與味覺感受。",
    source: "衛福部高齡營養飲食手冊",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U1-10",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U1",
    unitTitle: "單元一：飲食與飲水支持",
    scene: "dining",
    riskLevel: "green",
    stem: "協助吞嚥功能較弱的失智長輩喝增稠水或進食時，關於「進食姿勢與餵食角度」，下列哪一項最安全？",
    options: {
      A: "讓長輩頭往後仰 45 度，照護員站著由上往下灌。",
      B: "讓長輩端坐約 90 度、頭部微向前傾（收下巴 Chin-tuck 姿勢），照護員坐在與長輩平視或略低的位置，由下往上平穩遞送小湯匙。",
      C: "讓長輩完全平躺在床上吃果凍。",
      D: "讓長輩歪著頭邊講話邊吞飯。"
    },
    correct: "B",
    optionReasons: {
      A: "極度危險！頭往後仰會使氣道打開、食道受壓，食物極易直接滑入氣管造成吸入性肺炎。",
      B: "正確！端坐90度搭配微收下巴（Chin-tuck），且照護者坐著平視由下往上送匙，能防止長輩因抬頭看照護者而仰頭嗆咳。",
      C: "平躺進食極易嗆窒。",
      D: "邊講話邊吞嚥會使會厭軟骨來不及關閉氣道。"
    },
    corePrinciple: "安全進食姿勢：「端坐90度、微收下巴、照護者坐著平視由下往上送食」，嚴禁站著由上往下餵使長者仰頭。",
    sopReference: "安全餵食與防嗆咳標準技術SOP。",
    redFlagAlert: "液體增稠比例須嚴格依照語言治療師評估建議調配，過稀或過稠皆可能影響吞嚥安全。",
    source: "臨床吞嚥復健與長照安全餵食指引",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U1-11",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U1",
    unitTitle: "單元一：飲食與飲水支持",
    scene: "lounge",
    riskLevel: "yellow",
    stem: "中重度失智的鄭爺爺出現「異食傾向（Pica）」，曾把桌上的衛生紙團或塑膠裝飾花當成點心往嘴裡塞。日常環境與照護上應如何防範？",
    options: {
      A: "在桌上擺滿彩色洗衣球跟乾燥劑測試他會不會吃。",
      B: "落實環境安全巡檢：將清潔劑、藥物、乾燥劑、硬幣、電池、假花等非食物鎖入高處櫃中，桌面保持單純，並在可視範圍內準備安全可食用的小點心轉移其口慾需求。",
      C: "只要看到他拿衛生紙就用力打他的手。",
      D: "不讓他離開床鋪半步。"
    },
    correct: "B",
    optionReasons: {
      A: "彩色洗衣球與乾燥劑外觀極像糖果，放在桌上會造成致命誤食中毒！",
      B: "正確！針對有異食風險（視覺失認症或口慾期退化）的長輩，最根本的防線是「環境毒物／小物件清零上鎖＋提供安全可食用替代點心」。",
      C: "打手無法改善視覺失認，反而可能讓長者搶著把東西吞下去。",
      D: "不當限制活動違反照護原則。"
    },
    corePrinciple: "防範失智長者誤食非食物（異食症），必須落實「環境危險物品上鎖清零＋安全點心替代」。",
    sopReference: "失智專區環境安全管理SOP：防誤食危險物品清點與上鎖規範。",
    redFlagAlert: "食品包裝內的「脫氧劑／乾燥劑」應於拆封時由工作人員立即丟棄，切勿連袋交給失智長輩。",
    source: "衛福部失智安全環境查核表",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U1-12",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U1",
    unitTitle: "單元一：飲食與飲水支持",
    scene: "dining",
    riskLevel: "red",
    stem: "【紅色安全題】失智的何奶奶在吃點心時，突然雙手緊抓自己的喉嚨、瞪大眼睛無法發出聲音、臉色與嘴唇開始發紫。此時照護人員應立即採取什麼行動？",
    options: {
      A: "趕快餵她喝一大碗熱湯把食物沖下去。",
      B: "把手直接伸進她喉嚨深處亂挖。",
      C: "立即辨識為「重度異物梗塞（Choking）」，大聲呼救請同仁啟動緊急醫療救護（119／護理師），並立即施予「哈姆立克法（腹部推壓法）」直到異物排出或醫護接手。",
      D: "先扶她回房間躺平再慢慢想辦法。"
    },
    correct: "C",
    optionReasons: {
      A: "氣道已完全阻塞時灌湯水只會徹底堵死呼吸道！",
      B: "盲目伸手進咽喉深處挖取（Blind finger sweep）會將異物推得更深，卡死聲門。",
      C: "正確！雙手抓喉、無法發聲、發紺是典型的重度氣道異物梗塞紅色危急徵象，必須分秒必爭呼救並執行哈姆立克急救法（若失去意識則立即開始CPR）。",
      D: "延誤急救數分鐘內即會造成缺氧性腦損傷或死亡。"
    },
    corePrinciple: "出現「雙手掐脖、無法發聲、發紺」屬重度異物梗塞危急狀況，須立即呼救並執行哈姆立克急救SOP。",
    sopReference: "機構異物梗塞急救SOP（BLS/哈姆立克操作規範）。",
    redFlagAlert: "紅色高風險安全題：若長者失去意識倒下，應立即安置於平坦地面啟動CPR並於每次吹氣前檢查口中是否有可見異物。",
    source: "衛福部急救教育訓練指引／機構BLS標準流程",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },

  // ================= 單元 2：沐浴、更衣與如廁清潔（12題） =================
  {
    id: "T2-U2-01",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U2",
    unitTitle: "單元二：沐浴、更衣與如廁清潔",
    scene: "bathroom",
    riskLevel: "green",
    stem: "每到洗澡時間，失智的吳奶奶就緊抓著門框大喊：「我今天早上已經洗過了！不要脫我衣服！」照服員如何應對最溫和有效？",
    options: {
      A: "大聲跟她爭論：「您明明三天沒洗了，全身都臭酸了還說洗過！」",
      B: "兩個人合力把她手扳開、直接抬進浴室沖冷水。",
      C: "不爭辯是否洗過，先預熱浴室確保溫暖、尊重隱私；改用不提「洗澡」的正向邀約（如：「吳奶奶，今天流了點汗，我們用溫毛巾擦擦背、泡個舒服的溫水腳，換件香香的乾淨衣服好嗎？」）循序漸進。",
      D: "在交誼廳當眾宣布吳奶奶不愛乾淨。"
    },
    correct: "C",
    optionReasons: {
      A: "爭辯與羞辱「全身臭酸」會引發長者強烈的防禦與憤怒。",
      B: "強行拖拽與無預警沖水會讓長者把浴室視為恐怖刑場，此後更加抗拒。",
      C: "正確！拒澡常源於「怕冷、怕跌倒、羞恥感或記憶認為已洗過」；先暖室、從局部溫水擦拭／泡腳過渡到淋浴，最能降低抗拒。",
      D: "公開羞辱違反專業倫理。"
    },
    corePrinciple: "面對拒澡不爭辯，先「預熱浴室、保護隱私」，並善用「溫水泡腳／擦背換香衣」循序漸進引導。",
    sopReference: "失智長者溫和沐浴照護SOP：環境預熱、隱私遮蔽與減敏引導流程。",
    redFlagAlert: "若當下長者情緒極度激動，切勿硬碰硬強洗，可先暫緩30分鐘或改由長者熟悉信任的同性別照服員協助。",
    source: "臺北市失智照護資源手冊／BPSD沐浴照護",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U2-02",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U2",
    unitTitle: "單元二：沐浴、更衣與如廁清潔",
    scene: "bathroom",
    riskLevel: "green",
    stem: "在幫失智長輩淋浴時，為什麼「蓮蓬頭千萬不要一開始就直接從長輩頭頂往下沖水」？",
    options: {
      A: "因為這樣比較浪費水。",
      B: "因為水柱直接沖擊臉部與頭頂會造成「溺水窒息般的驚恐感」與水溫驚嚇；應先讓長輩用手背試水溫，從腳掌、小腿由下往上慢慢淋濕，並用大毛巾披肩保暖。",
      C: "因為蓮蓬頭會壞掉。",
      D: "沒有這個規定，從頭淋最快。"
    },
    correct: "B",
    optionReasons: {
      A: "重點在於心理與生理安全而非水量。",
      B: "正確！失智長者對感官刺激與水溫調節較敏感，無預警從頭沖水會引發極度恐慌與揮打；「先試水溫→由腳往上分段淋水→大毛巾覆蓋胸背保暖與遮羞」是黃金法則。",
      C: "與器材無關。",
      D: "從頭直沖是造成浴室衝突與驚嚇的主因。"
    },
    corePrinciple: "淋浴時務必「先試水溫、由四肢遠端（手腳）往身體中心分段沖洗、披毛巾遮蔽保暖」，絕不直接從頭頂沖水。",
    sopReference: "失智舒適沐浴技術SOP：水溫測試與分段覆蓋沖洗法。",
    redFlagAlert: "水溫應維持在約 38~40°C（先用手腕內側測試），並全程使用穩固防滑沐浴椅與扶手。",
    source: "日本自立支援與溫和沐浴照護實務",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U2-03",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U2",
    unitTitle: "單元二：沐浴、更衣與如廁清潔",
    scene: "lounge",
    riskLevel: "green",
    stem: "大熱天（室溫28度），失智的徐爺爺卻在身上穿了三件毛衣加一件厚羽絨外套，滿頭大汗卻堅持不肯脫。照護人員應如何處理？",
    options: {
      A: "直接衝過去把他的羽絨衣跟毛衣全部硬扒下來。",
      B: "嘲笑他是笨蛋不怕熱。",
      C: "先同理他可能因體溫調節退化或缺乏安全感而想穿熟悉的厚衣，準備一件他同樣喜歡、顏色相近但透氣輕薄的長袖襯衫說：「徐爺爺，這件厚外套沾到汗濕濕的，我幫您拿去晾乾收好，我們先換這件乾爽帥氣的襯衫好嗎？」並適度調節空調與補充水分。",
      D: "不管他，讓他穿四件去大太陽底下跑步。"
    },
    correct: "C",
    optionReasons: {
      A: "強行扒衣服會引發強烈抗拒與拉扯受傷。",
      B: "嘲笑無助於解決問題。",
      C: "正確！利用「流汗濕了幫您收好＋換上外型熟悉的薄長袖（以物易物）」的方式，溫和替換過厚衣物，預防熱衰竭與汗疹。",
      D: "高溫穿厚衣活動極易導致中暑與熱衰竭。"
    },
    corePrinciple: "處理穿衣不合時宜時，避免強行扒衣，善用「衣物微濕需整理＋同色系薄衣替換法」，並留意散熱補水。",
    sopReference: "失智更衣照護SOP：換季衣櫃分類管理與替代換衣技巧。",
    redFlagAlert: "換季時建議與家屬合作將非當季厚重衣物先收妥於非開放式收納區，減少長輩混穿機會。",
    source: "WHO iSupport 更衣照護篇",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U2-04",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U2",
    unitTitle: "單元二：沐浴、更衣與如廁清潔",
    scene: "lounge",
    riskLevel: "green",
    stem: "孫奶奶穿衣服時因為「著衣失用症」，常把褲子當成上衣往頭上套，或把內衣穿在毛衣外面。照護人員在早上準備衣物時，可以用什麼小巧思幫她順利穿對？",
    options: {
      A: "把所有衣服褲子揉成一團丟在她床上叫她自己穿。",
      B: "依照「穿衣先後順序」將衣物由上而下疊放好（最上面放內衣、接著上衣、最下面放褲子），一次遞給她一件，並協助將領口或褲管方向攤開對準。",
      C: "站在旁邊看她穿錯再大聲笑她。",
      D: "以後都不讓她自己動手穿衣服了。"
    },
    correct: "B",
    optionReasons: {
      A: "揉成一團會讓視覺空間與執行功能退化的長輩完全無法分辨正反與順序。",
      B: "正確！「依穿著順序疊放＋一次遞一件＋對準開口方向」能大幅降低著衣失用症的混亂，讓長輩靠殘存能力自己穿好。",
      C: "嘲笑會摧毀長輩自信。",
      D: "完全代勞會加速上肢關節僵硬與功能退化。"
    },
    corePrinciple: "針對穿衣順序混亂（著衣失用症），採「依序疊放、一次遞一件、預先對準開口」協助自立穿衣。",
    sopReference: "ADL自立支援更衣SOP：順序提示與分段協助法。",
    redFlagAlert: "若長者有一側肢體偏癱或關節疼痛，應遵循「穿衣先穿患側（痛側）、脫衣先脫健側」原則。",
    source: "職能治療失智日常生活訓練指引",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U2-05",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U2",
    unitTitle: "單元二：沐浴、更衣與如廁清潔",
    scene: "bathroom",
    riskLevel: "green",
    stem: "失智的胡爺爺進入全白磁磚、白色馬桶蓋的廁所後，常常站在裡面不知所措，甚至尿在馬桶旁邊的地上。從環境視覺設計來看，如何改善最有效？",
    options: {
      A: "把廁所燈關掉讓他摸黑上廁所。",
      B: "將馬桶座圈更換為與白色瓷器及地板「對比鮮明的顏色（如暖橘色、深藍色）」，並維持明亮照明與清楚扶手，讓長輩一眼就能定位馬桶位置。",
      C: "罰他自己拿拖把刷廁所。",
      D: "不准他再用廁所，強迫包尿布。"
    },
    correct: "B",
    optionReasons: {
      A: "摸黑如廁極易跌倒且更找不到馬桶。",
      B: "正確！白牆、白地、白馬桶對視覺對比退化的失智長者而言像一片白霧；換上高對比色馬桶座圈能立即改善對準與坐下定位。",
      C: "懲罰無助於改善視覺辨識。",
      D: "過早放棄如廁而全面包尿布會加速失禁與喪失尊嚴。"
    },
    corePrinciple: "浴廁採用「高對比色馬桶座圈與扶手」，幫助視空間退化的失智長者準確辨識馬桶位置。",
    sopReference: "失智友善浴廁環境規範：色彩對比與防滑安全標準。",
    redFlagAlert: "注意廁所地板勿使用帶有立體深色格紋或反光水波紋磁磚，以免長者誤以為地上有水或坑洞而不敢踩入。",
    source: "英國斯特靈大學（University of Stirling）失智友善設計指南",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U2-06",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U2",
    unitTitle: "單元二：沐浴、更衣與如廁清潔",
    scene: "bathroom",
    riskLevel: "green",
    stem: "為了減少失智長輩發生尿失禁的窘境，下列哪一種「規律如廁支持（Prompted Voiding）」作法最符合實證照護？",
    options: {
      A: "等長輩尿濕褲子之後再去罵他為什麼不早講。",
      B: "觀察並記錄長輩數日的排尿時間規律（排尿日誌），在起床後、三餐飯後、午睡後及睡前等固定時段，每 2 至 3 小時溫和邀請帶長輩去一趟洗手間。",
      C: "規定長輩全天不准喝水，這樣就不會尿失禁。",
      D: "每十分鐘就強迫他坐馬桶一次。"
    },
    correct: "B",
    optionReasons: {
      A: "失智長者常因膀胱飽脹感傳導延遲或找不到廁所而來不及說，事後責備毫無幫助。",
      B: "正確！透過排尿日誌掌握個別規律，並於固定生活作息節點（約2~3小時）溫和引導定時如廁，能大幅減少功能性尿失禁。",
      C: "限水防失禁會造成嚴重脫水、泌尿道感染與便祕！",
      D: "過於頻繁催促如廁會造成長輩煩躁抗拒。"
    },
    corePrinciple: "運用「排尿日誌＋定時溫和引導如廁（起床、餐後、睡前）」，取代被動等待或限水。",
    sopReference: "排泄自立支援SOP：定時提示如廁法（Prompted Voiding）與排尿日誌紀錄。",
    redFlagAlert: "長者服裝建議選擇鬆緊帶或魔鬼氈易穿脫長褲，減少到了馬桶前卻因解不開皮帶鈕扣而尿濕的遺憾。",
    source: "衛福部排泄自立支援照護手冊",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U2-07",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U2",
    unitTitle: "單元二：沐浴、更衣與如廁清潔",
    scene: "corridor",
    riskLevel: "yellow",
    stem: "照服員發現失智的廖奶奶不小心尿濕了外褲，但廖奶奶因為羞愧而大聲否認：「我沒有尿褲子！這是剛剛洗碗水潑到的！」此時照服員怎麼說最能顧及她的尊嚴並順利換好褲子？",
    options: {
      A: "「明明就是尿騷味還狡辯說是洗碗水！大家快來看！」",
      B: "順著她給的台階下，私密且溫和地說：「對吼，洗碗水潑到褲子濕濕涼涼的穿起來不舒服，很容易感冒耶！我們趕快回房間換一條乾爽溫暖的長褲好嗎？」",
      C: "強行在走廊把她褲子脫下來檢查。",
      D: "既然她說是水，那就讓她穿著濕尿褲一整天。"
    },
    correct: "B",
    optionReasons: {
      A: "拆穿並羞辱長者會引發強烈自卑與激烈抗拒換衣。",
      B: "正確！長者否認失禁是因為保有羞恥心與成人自尊；順著「水潑到濕涼不舒服」的台階，既保全長輩面子，又能順利帶回房間完成清潔換衣。",
      C: "公開脫褲嚴重侵害隱私。",
      D: "長時間穿著尿濕衣物會導致失禁性皮膚炎與泌尿道感染。"
    },
    corePrinciple: "當長者因羞愧否認失禁時，應「順著長者的台階保全其面子（如：衣服不小心沾濕了，我們換乾爽的）」，私密完成清潔。",
    sopReference: "失禁尊嚴照護SOP：隱私保護與去羞辱化溝通技巧。",
    redFlagAlert: "清潔會陰與臀部時應使用溫水輕柔擦洗並拍乾，塗抹適當隔離保護霜預防紅臀。",
    source: "WHO iSupport 如廁與失禁照護",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U2-08",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U2",
    unitTitle: "單元二：沐浴、更衣與如廁清潔",
    scene: "bathroom",
    riskLevel: "green",
    stem: "協助失智長輩進行口腔清潔（刷牙／洗假牙）時，長輩若緊閉雙唇抗拒牙刷伸入，下列哪個減敏與引導步驟較合適？",
    options: {
      A: "拿硬木棒或金屬湯匙硬撬開他的牙齒。",
      B: "先檢查口腔周圍有無疼痛，讓長輩自己握住牙刷柄、照護者採「手把手（Hand-over-hand）」引導；或先從塗抹溫水於嘴唇、按摩臉頰口輪匝肌做減敏，再使用軟毛小頭牙刷溫和清潔。",
      C: "只要他閉嘴，就一個月都不幫他刷牙。",
      D: "趁他打哈欠時把漱口水整杯灌進喉嚨。"
    },
    correct: "B",
    optionReasons: {
      A: "硬撬牙關極易造成牙齒斷裂脫落誤吸或顳顎關節受傷！",
      B: "正確！口腔是高度敏感區，透過「面部唇周減敏按摩＋手把手共同握柄（提升控制感）＋軟毛小頭牙刷」能顯著降低防衛反射（Bite reflex）。",
      C: "長期不潔牙會導致口腔細菌滋生，大幅提高吸入性肺炎風險。",
      D: "灌漱口水極易造成嗆咳誤吸。"
    },
    corePrinciple: "口腔照護抗拒時，採「唇周減敏按摩＋手把手引導握持＋軟毛小頭牙刷」，嚴禁硬撬牙關。",
    sopReference: "失智長者特殊口腔照護SOP：減敏按摩與手把手引導技術。",
    redFlagAlert: "夜晚睡前應取下活動假牙刷淨並浸泡於專屬假牙清潔盒之清水中，同時檢查牙床黏膜。",
    source: "衛福部特殊需求者口腔照護指引",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U2-09",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U2",
    unitTitle: "單元二：沐浴、更衣與如廁清潔",
    scene: "lounge",
    riskLevel: "green",
    stem: "失智的田奶奶特別喜歡某一件花襯衫，每天都堅持要穿那一件，晚上洗澡時也不肯脫下來洗。家屬與照護團隊可以用什麼方法最聰明地解決這個困擾？",
    options: {
      A: "把那件花襯衫當著她的面剪破丟進垃圾桶。",
      B: "請家屬幫忙準備 2 至 3 件「款式、花色一模一樣」的同款襯衫，趁洗澡時自然替換清洗，讓田奶奶每天都能安心穿上她最熟悉的心愛衣服。",
      C: "每天為這件衣服跟她吵架半小時。",
      D: "讓她同一件衣服連穿三個月都不洗。"
    },
    correct: "B",
    optionReasons: {
      A: "毀損長輩心愛衣物會造成極大創傷與憤怒。",
      B: "正確！準備 2~3 件完全同款同色的衣物輪流替換，是最省力且最能滿足失智長者對「熟悉感與安全感」需求的實戰妙招！",
      C: "每天爭執既消耗照護人力又破壞關係。",
      D: "不清洗衣物會導致皮膚感染與異味。"
    },
    corePrinciple: "當長者固著只穿特定一件衣服時，準備「2～3件同款同色衣物輪替清洗」，最小摩擦解決問題。",
    sopReference: "失智生活固著行為調適指引：同款衣物替換法。",
    redFlagAlert: "新買的同款衣物可先下水洗軟並剪除刺癢領標，提升長者穿著舒適度。",
    source: "Alzheimer's Society 日常更衣照護建議",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U2-10",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U2",
    unitTitle: "單元二：沐浴、更衣與如廁清潔",
    scene: "bathroom",
    riskLevel: "yellow",
    stem: "失智的柯爺爺有穿紙尿褲，最近下午常把手伸進褲子裡抓撓，甚至把排泄物塗抹在床欄上（挖便行為）。照護人員應如何探究原因並處理？",
    options: {
      A: "大聲痛罵他噁心，並給他戴上硬式棒球手套綁住雙手。",
      B: "理解「伸手進尿褲／挖便」通常是因為排泄後尿褲悶濕異物感、臀部搔癢、或是便祕硬便卡在肛門口不舒服，長輩想自己把異物弄掉；應增加定時如廁與巡視換褲頻率、治療便祕與皮膚搔癢，並以乾淨毛巾溫和請他擦手。",
      C: "罰他不准吃晚餐。",
      D: "在交誼廳向所有人廣播柯爺爺的行為。"
    },
    correct: "B",
    optionReasons: {
      A: "羞辱與強制約束無法消除肛門異物感與皮膚搔癢，只會加劇躁動。",
      B: "正確！挖便行為背後幾乎都是「生理不適（便祕糞石嵌塞、失禁悶濕搔癢）＋想自己清理卻不知如何處理」；定時引導如廁、即時更換保持乾爽與改善便祕才是治本之道。",
      C: "禁食懲罰完全錯誤。",
      D: "嚴重侵害長者隱私與尊嚴。"
    },
    corePrinciple: "挖便行為多源於「便祕解不乾淨、尿褲悶濕異物感或皮膚搔癢」，應以定時如廁、保持乾爽與處理便祕治本。",
    sopReference: "失智排泄異常行為處置SOP：糞石嵌塞排除、定時換褲與皮膚照護流程。",
    redFlagAlert: "若長者多日未解便或僅滲出少量水便，應通報護理師評估是否為嚴重便祕造成之假性腹瀉（糞便嵌塞）。",
    source: "長照失智排泄照護實務指引",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U2-11",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U2",
    unitTitle: "單元二：沐浴、更衣與如廁清潔",
    scene: "bathroom",
    riskLevel: "green",
    stem: "考量許多年長者的生活習慣與生理時鐘，若失智長輩固定在「傍晚四、五點」特別容易疲倦躁動，拒絕洗澡，照護團隊可以如何彈性調整沐浴安排？",
    options: {
      A: "堅持機構規定一定要在傍晚五點整洗，不洗就硬拉去洗。",
      B: "配合長輩個別生活史與精神最佳時段（例如改至上午十點陽光溫暖、長輩心情最愉悅時，或依其過往習慣在睡前洗溫水澡助眠），彈性調整沐浴時間。",
      C: "既然傍晚不洗，就永遠不要幫他洗澡。",
      D: "半夜兩點把他叫起來洗冷水澡。"
    },
    correct: "B",
    optionReasons: {
      A: "在長輩黃昏症候群最疲憊躁動的時段強行洗澡，衝突率最高。",
      B: "正確！以人為本的機構照護不應把所有住民當成生產線統一時間沖洗；配合長輩精神穩定時段與過往生活習慣調整沐浴時間，能事半功倍。",
      C: "放棄個人衛生照護不恰當。",
      D: "半夜洗冷水澡嚴重危害健康與睡眠。"
    },
    corePrinciple: "配合長輩「精神最穩定的時段與過往生活習慣」彈性調整沐浴時間，避開黃昏疲憊躁動期。",
    sopReference: "個別化生活作息照護計畫：彈性沐浴時段安排準則。",
    redFlagAlert: "餐後1小時內及空腹低血糖時不宜立即進行高溫全身泡澡，以免頭暈或血壓波動。",
    source: "Person-Centered Care 沐浴照護指引",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U2-12",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U2",
    unitTitle: "單元二：沐浴、更衣與如廁清潔",
    scene: "bathroom",
    riskLevel: "red",
    stem: "【紅色安全題】照服員在協助失智的鍾爺爺如廁與沐浴時，發現鍾爺爺今天排尿時表情痛苦皺眉、尿液混濁且帶有明顯惡臭（甚至微帶血絲），同時人變得比平常嗜睡混亂。此時最優先的處置為何？",
    options: {
      A: "幫他多噴一點香水蓋過尿味就好。",
      B: "當作是天氣熱火氣大，不用告訴護理師。",
      C: "立即警覺這是「急性泌尿道感染（UTI）合併意識改變」的紅色警訊，先協助爺爺安全穿好衣物保暖休息，保留尿液觀察資訊並立即依機構SOP通報護理師與醫師評估治療。",
      D: "自己拿別人的抗生素給他吃。"
    },
    correct: "C",
    optionReasons: {
      A: "掩蓋氣味會延誤感染診斷，可能惡化為腎盂腎炎或敗血症。",
      B: "高齡失智長者泌尿道感染常不見得發高燒，而是以「尿混濁惡臭、解尿疼痛皺眉、突發嗜睡或躁動（譫妄）」表現，絕不可輕忽。",
      C: "正確！辨識解尿疼痛、尿液混濁血尿與意識改變等紅色感染徵兆，立即依SOP通報護理師量測生命徵象並安排就醫檢驗。",
      D: "嚴禁私自給予未經醫師處方之藥物！"
    },
    corePrinciple: "發現「解尿皺眉疼痛、尿液混濁惡臭／血尿、伴隨嗜睡或混亂」屬急性泌尿道感染紅色警訊，須立即通報護理師。",
    sopReference: "機構感染管制與泌尿道感染（UTI）監測通報SOP。",
    redFlagAlert: "紅色高風險安全題：高齡失智者泌尿道感染極易引發敗血症或急性譫妄，須立即通報專業醫療評估。",
    source: "衛福部長照機構感染管制手冊",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },

  // ================= 單元 3：作息調整與黃昏時段焦躁（12題） =================
  {
    id: "T2-U3-01",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U3",
    unitTitle: "單元三：作息調整與黃昏時段焦躁",
    scene: "lounge",
    riskLevel: "green",
    stem: "每天下午四點太陽快下山時，失智的楊奶奶就會開始坐立不安、打包衣服吵著說：「天黑了我要趕快回家煮晚飯給小孩吃！」（黃昏症候群 Sundowning）。下列哪項環境與照護調整最有效？",
    options: {
      A: "把窗簾全部拉開讓她看夕陽西下，並把室內燈關暗省電。",
      B: "在傍晚光線變暗前（約下午3:30~4:00），提早打開室內溫暖明亮的燈光並拉上窗簾減少「天黑與長陰影」的視覺焦慮，並安排她熟悉的輕柔活動（如幫忙挑菜、摺餐巾或聽懷舊老歌）陪伴。",
      C: "大聲罵她：「您小孩都五十幾歲了不用您煮飯！」",
      D: "叫她在下午一點到四點連睡三小時午覺。"
    },
    correct: "B",
    optionReasons: {
      A: "夕陽昏暗光線與室內拉長的黑影會加劇黃昏症候群的視錯覺與恐慌。",
      B: "正確！黃昏症候群與生理時鐘退化、傍晚光線昏暗陰影及午後疲勞有關；「提早開亮室內暖光＋拉上窗簾避開天黑焦慮＋安排熟悉安撫活動」是最有效的預防策略。",
      C: "爭辯事實會讓長輩更急著想衝出門。",
      D: "下午睡太久會導致生理時鐘更混亂、晚上徹底失眠。"
    },
    corePrinciple: "預防黃昏症候群：傍晚前「提早開亮室內燈光、拉窗簾減少昏暗陰影」，並安排熟悉溫和的陪伴活動。",
    sopReference: "失智症黃昏症候群（Sundowning）非藥物介入與光照調節SOP。",
    redFlagAlert: "傍晚時段應避免交接班人員大聲喧嘩或環境過度吵雜，減少感官刺激。",
    source: "衛福部失智症行為心理症狀照護指引",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U3-02",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U3",
    unitTitle: "單元三：作息調整與黃昏時段焦躁",
    scene: "garden",
    riskLevel: "green",
    stem: "朱爺爺白天在交誼廳總是打瞌睡，到了半夜卻精神百倍在走廊遊走唱歌（日夜顛倒）。為了幫他重整大腦生理時鐘（褪黑激素節律），白天的照護安排應該怎麼做？",
    options: {
      A: "白天把房間窗簾全部拉黑，讓他從早睡到晚。",
      B: "安排「上午充足的自然陽光照射（或明亮光照）」與適度日間體能／社交活動，並將午睡控制在 30 至 60 分鐘內（下午三點後不午睡）。",
      C: "晚餐時間請他喝兩杯濃茶或黑咖啡提神。",
      D: "半夜他醒來時開大燈陪他打麻將。"
    },
    correct: "B",
    optionReasons: {
      A: "白天缺乏光照且嗜睡，會讓大腦分不清日夜，夜間失眠更嚴重。",
      B: "正確！上午接受充足自然光照與適度活動、限制午睡不超過1小時，能有效重設視交叉上核生理時鐘，幫助夜間褪黑激素正常分泌。",
      C: "午後與傍晚攝取咖啡因會嚴重干擾夜間睡眠。",
      D: "半夜開強光與高刺激活動會徹底固化日夜顛倒。"
    },
    corePrinciple: "改善日夜顛倒關鍵在白天：「上午充足陽光照射＋適度活動＋午睡不超過1小時且午後不嗜睡」。",
    sopReference: "失智睡眠與日夜節律調整SOP：日間光照與活動量管理。",
    redFlagAlert: "若調整作息後仍嚴重失眠，應請醫師檢視日常用藥（如利尿劑、部分失智藥或精神科藥物之服藥時間）。",
    source: "高齡睡眠醫學與失智照護指引",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U3-03",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U3",
    unitTitle: "單元三：作息調整與黃昏時段焦躁",
    scene: "corridor",
    riskLevel: "green",
    stem: "失智的秦奶奶在走廊持續來回走動（遊走行為 Wandering）。在確保安全的前提下，照護團隊應該如何看待與處理長輩的遊走？",
    options: {
      A: "只要看到她走路就馬上把她推進房間鎖門。",
      B: "先評估有無飢餓、口渴、想上廁所、疼痛或尋找熟悉事物的需求；若無不適，提供「安全無障礙、動線成迴圈（無死角盡頭）、光線充足且設有休息座椅」的空間讓她安全行走，並適時陪伴補充水分。",
      C: "把走廊堆滿雜物擋住她的路。",
      D: "叫她穿高跟鞋或拖鞋走。"
    },
    correct: "B",
    optionReasons: {
      A: "強制限制行動與鎖門會引發劇烈幽閉恐懼與拍門受傷。",
      B: "正確！遊走本身不一定是壞事，常是長者釋放精力或尋找熟悉感的方式；先排除生理需求，再提供穿妥防滑鞋、無障礙迴圈動線與中途休息椅的安全環境，是最佳照護。",
      C: "堆放雜物會造成嚴重絆倒骨折風險！",
      D: "拖鞋與高跟鞋極易滑倒，應協助穿合腳包覆式防滑鞋。"
    },
    corePrinciple: "面對遊走行為，先「排除如廁／飢渴／疼痛需求」，再提供「穿妥防滑鞋、安全無障礙且設有休息椅的空間」支持安全走動。",
    sopReference: "失智遊走安全管理與防走失SOP。",
    redFlagAlert: "出入口與樓梯間應設有安全門禁與緩衝視覺設計（如彩繪隱藏門或門鈴感應提示），防止意外走出機構。",
    source: "衛福部失智專區環境與安全照護指引",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U3-04",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U3",
    unitTitle: "單元三：作息調整與黃昏時段焦躁",
    scene: "lounge",
    riskLevel: "green",
    stem: "當失智長輩不斷吵著「我要回家！這裡不是我家！」時，他口中的「家」在心理層面上通常代表什麼意義？",
    options: {
      A: "代表他很清楚自己家裡的門牌地址與郵遞區號。",
      B: "「家」往往代表一種「有安全感、熟悉、溫暖、被愛與有歸屬感的狀態」；即使長輩人已經在自己家裡，感到陌生不安時也會吵著要回家。",
      C: "代表他想考照護員地理常識。",
      D: "代表他想去買房子。"
    },
    correct: "B",
    optionReasons: {
      A: "長者常記不得現居地址，甚至想回的是童年老家。",
      B: "正確！臨床上許多住在家裡的失智長者傍晚也會對家人說「我要回家」，因為「我想回家」本質上是「我現在覺得陌生、不安，我想回到安心的地方」。",
      C: "非考驗地理常識。",
      D: "與買房無關。"
    },
    corePrinciple: "「我要回家」的本質是「我現在覺得陌生不安，渴望安全感與熟悉感」；回應重點在於給予溫暖歸屬感而非爭辯地點。",
    sopReference: "失智心理需求解讀與同理安撫指引。",
    redFlagAlert: "在長者床頭與視線可及處擺放熟悉的舊家具、老照片與慣用被毯，能強化「家」的安全感。",
    source: "WHO iSupport 失智行為理解篇",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U3-05",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U3",
    unitTitle: "單元三：作息調整與黃昏時段焦躁",
    scene: "corridor",
    riskLevel: "green",
    stem: "半夜兩點，失智的尤爺爺醒來穿好外套走出房門說：「天亮了，我要去工廠打卡上班了！」夜班照護人員如何回應最溫和且能引導他再休息？",
    options: {
      A: "大聲吼他：「現在才半夜兩點！工廠早就倒了，快滾回床上睡覺！」",
      B: "把走廊所有大燈全部開到最亮跟他說話。",
      C: "保持柔和夜燈與輕聲細語，肯定他的責任感並提供時間線索：「尤爺爺，您對工作最準時負責了！我們看一下窗外還黑黑的，現在才凌晨兩點，工廠還沒開門喔；您先回床上再歇一會兒，天亮時間到我一定準時叫您！」並先帶他去上個廁所。",
      D: "直接把他反鎖在廁所裡。"
    },
    correct: "C",
    optionReasons: {
      A: "半夜吼叫與否定會讓長者瞬間暴怒清醒，整晚無法再入睡。",
      B: "半夜開強白光會抑制褪黑激素，讓大腦誤以為真的天亮了。",
      C: "正確！維持低光源柔和語調、肯定其負責任的心態、引導看窗外夜色並承諾「天亮一定叫您」，同時順便如廁排空膀胱，長輩最容易安心回床。",
      D: "反鎖住民嚴重違法。"
    },
    corePrinciple: "夜間醒來吵著上班時，維持「低光源與輕柔語調、肯定責任感、引導看窗外夜色並順便如廁」，溫和引導回床。",
    sopReference: "失智夜間覺醒與遊走照護SOP。",
    redFlagAlert: "夜間走廊與床邊應設有柔和感應地燈（琥珀色暖光），預防夜間下床如廁跌倒。",
    source: "長照夜班失智照護實務手冊",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U3-06",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U3",
    unitTitle: "單元三：作息調整與黃昏時段焦躁",
    scene: "lounge",
    riskLevel: "green",
    stem: "為什麼「固定且可預測的每日生活作息表（Routine）」對失智長輩的情緒穩定非常有幫助？",
    options: {
      A: "因為這樣機構不用設計新活動。",
      B: "因為失智長輩短期記憶與應變新變化的能力退化，規律可預測的作息（固定時間起床、用餐、活動、休息）能建立身體記憶與秩序感，大幅減少未知帶來的焦慮。",
      C: "因為這樣可以讓長輩更快忘記時間。",
      D: "沒有任何幫助，每天時間隨機變動才刺激。"
    },
    correct: "B",
    optionReasons: {
      A: "規律作息仍可包含豐富多元的主題活動。",
      B: "正確！當外在環境與作息具有高度規律與可預測性時，失智長者的大腦不必時時刻刻處於「現在要幹嘛？我會不會做錯？」的驚慌中，能有效穩定情緒。",
      C: "規律作息是幫助建立時間定向感而非忘記時間。",
      D: "作息混亂隨機變動會直接誘發焦躁行為。"
    },
    corePrinciple: "維持「規律、穩定、可預測的日常作息節奏」，能給予失智長者最大的秩序感與安全感。",
    sopReference: "失智專區日常作息結構化管理SOP。",
    redFlagAlert: "若因看診或特殊節慶需變更作息，應提前以溫和簡短方式分段預告並安排熟悉人員陪伴。",
    source: "NIA 日常照護建議",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U3-07",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U3",
    unitTitle: "單元三：作息調整與黃昏時段焦躁",
    scene: "lounge",
    riskLevel: "green",
    stem: "下午時段，失智的許奶奶雙手一直反覆抓扯自己的衣角或撕衛生紙，神情有些無聊與煩躁。照護人員提供什麼支持最能滿足她的手部觸覺需求？",
    options: {
      A: "把她的手綁起來不准她抓衣角。",
      B: "提供安全柔軟的「觸覺安撫物／忙碌抱枕（Fidget blanket，縫有大鈕扣、緞帶、柔軟絨毛布塊的安撫巾）」或請她幫忙把毛線球繞好、摺小毛巾，讓雙手有安全且具成就感的事做。",
      C: "給她一把鋒利的剪刀讓她剪紙。",
      D: "大聲喝止她不要再弄亂衛生紙了。"
    },
    correct: "B",
    optionReasons: {
      A: "身體約束會造成更大恐慌與掙扎。",
      B: "正確！反覆抓扯衣角或撕紙常源於感官刺激不足或焦慮；提供安全的觸覺安撫巾（Fidget quilt）或簡單手部家務，能有效安撫手部躁動。",
      C: "單獨給予鋒利剪刀有刺傷風險。",
      D: "喝止無法解決背後的無聊與觸覺需求。"
    },
    corePrinciple: "當長者出現反覆抓扯衣物或撕紙行為時，提供「觸覺安撫抱枕／安全手部家務（如摺毛巾）」滿足感官與操作需求。",
    sopReference: "失智感官安撫輔具（觸覺巾／懷舊娃娃）應用指引。",
    redFlagAlert: "使用觸覺安撫巾時，若長者有異食傾向，須確認所有配件皆牢固縫死無脫落誤食風險。",
    source: "失智症職能治療感官調節實務",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U3-08",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U3",
    unitTitle: "單元三：作息調整與黃昏時段焦躁",
    scene: "lounge",
    riskLevel: "yellow",
    stem: "失智的沈爺爺在傍晚突然情緒激動、握緊拳頭對著工作人員揮舞並大聲咆哮。在確保現場安全時，照護人員應遵守哪項應對原則？",
    options: {
      A: "三個人立刻撲上去跟他扭打壓制。",
      B: "站在牆角死胡同裡跟他對罵。",
      C: "保持冷靜、退開至少一個手臂以上的安全距離（避免背靠死角），移開周圍危險物品與其他長輩，雙手自然垂放不擺出威脅姿勢，以低沉平緩語氣安撫並找出觸發原因。",
      D: "拿掃把揮舞嚇阻他。"
    },
    correct: "C",
    optionReasons: {
      A: "直接撲上壓制極易造成長者骨折與工作人員受傷。",
      B: "站在死角對罵會激化攻擊行為且無退路。",
      C: "正確！面對急性激躁或肢體揮擊，首要原則是「降溫減壓（De-escalation）」：拉開一臂以上安全距離、疏散旁人、不擺防衛攻擊姿態、平緩語調安撫，待情緒緩和再處理。",
      D: "拿器具威嚇會引發更劇烈的防衛性攻擊。"
    },
    corePrinciple: "面對激躁揮擊時，執行「衝突降溫法」：保持一臂以上安全距離、清空周圍危險物、姿態柔和不對峙、低沉語調安撫。",
    sopReference: "失智急性激躁與攻擊行為安全應變SOP。",
    redFlagAlert: "事後應採用 ABC 行為觀察法（前因 Antecedent → 行為 Behavior → 結果 Consequence）分析誘發點，預防再次發生。",
    source: "衛福部失智BPSD危機處理指引",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U3-09",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U3",
    unitTitle: "單元三：作息調整與黃昏時段焦躁",
    scene: "lounge",
    riskLevel: "green",
    stem: "為了幫助失智長輩在夜晚能夠順利放鬆入睡，睡前 1 小時的「睡眠衛生與環境準備」包含下列哪一項？",
    options: {
      A: "睡前看緊張刺激的動作片，並喝兩大碗湯。",
      B: "依序進行溫和睡前儀式：先帶長輩如廁排空膀胱、調暗室內主燈改開柔和暖色小夜燈、減少環境噪音、播放輕柔音樂或溫水足浴，營造寧靜睡眠氛圍。",
      C: "睡前跟長輩爭論白天的事情。",
      D: "把房間溫度調到 16 度超冷。"
    },
    correct: "B",
    optionReasons: {
      A: "刺激影片會讓交感神經興奮，睡前喝大量湯水會導致整夜頻尿起床跌倒。",
      B: "正確！「睡前如廁排空＋調暗燈光留暖色夜燈＋安靜舒緩儀式」能幫助大腦順利切換至睡眠模式並減少夜尿中斷。",
      C: "睡前爭執會導致焦慮失眠。",
      D: "過冷室溫會影響睡眠並誘發心血管收縮。"
    },
    corePrinciple: "建立固定的「睡前放鬆儀式（如廁排空、調暗強光留暖色夜燈、安靜溫馨環境）」，幫助長者安穩入眠。",
    sopReference: "失智夜間睡眠促進與防跌環境SOP。",
    redFlagAlert: "床鋪高度應調整至長輩坐床緣時雙腳能平穩踏地，並確認床欄或離床感應墊運作正常。",
    source: "高齡失智非藥物睡眠照護指引",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U3-10",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U3",
    unitTitle: "單元三：作息調整與黃昏時段焦躁",
    scene: "corridor",
    riskLevel: "green",
    stem: "為了預防失智長輩走出安全區域發生走失意外，同時不讓長輩覺得像被關在監獄裡，長照機構在大門設計上常採用什麼「視覺環境巧思」？",
    options: {
      A: "在大門上掛滿大鐵鍊跟「禁止外出」的紅字警告牌。",
      B: "將不需住民進出的工作門／安全門彩繪成「與牆面一致的書櫃、花店櫥窗或風景壁畫」，或以布簾遮蔽門把，並在門口旁設置溫馨的「懷舊候車亭／茶座」作為緩衝留步區。",
      C: "在門口放一隻大狗嚇長輩。",
      D: "把大門拆掉不裝門。"
    },
    correct: "B",
    optionReasons: {
      A: "鐵鍊與警告紅字會直接刺激長輩「想要打開逃出去」的衝動。",
      B: "正確！運用視覺偽裝（書櫃壁畫）減少「看到門就想推開」的視覺誘因，並結合懷舊候車亭／奉茶區讓想外出的長輩自然坐下休息、由人員陪伴轉移，兼具安全與人性尊嚴。",
      C: "恐嚇手法違反照護倫理且易致跌倒。",
      D: "無門禁保護會導致走失危險。"
    },
    corePrinciple: "善用「視覺隱藏門（書櫃／風景壁畫）＋溫馨緩衝留步區（如懷舊奉茶座）」，以人性化環境設計取代冰冷鐵鎖。",
    sopReference: "失智專區防走失環境設計與緩衝引導SOP。",
    redFlagAlert: "所有隱藏彩繪門仍須完全符合消防法規之緊急逃生開啟功能，工作人員須熟知緊急開啟位置。",
    source: "歐洲與台灣失智專區創新環境設計實務",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U3-11",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U3",
    unitTitle: "單元三：作息調整與黃昏時段焦躁",
    scene: "lounge",
    riskLevel: "green",
    stem: "在分析與交班失智長輩的焦躁行為時，團隊使用「ABC 行為觀察紀錄法」。請問其中的 A、B、C 分別代表什麼？",
    options: {
      A: "A是蘋果、B是香蕉、C是櫻桃。",
      B: "A 是前因／觸發情境（Antecedent：事發前發生什麼事、誰在場、幾點）、B 是具體行為表現（Behavior）、C 是處理方式與後續結果（Consequence）。",
      C: "A是生氣、B是無聊、C是愛哭。",
      D: "A是早上、B是中午、C是晚上。"
    },
    correct: "B",
    optionReasons: {
      A: "與行為觀察無關。",
      B: "正確！透過記錄「前因（A）→ 行為（B）→ 結果（C）」，團隊才能找出長輩每次躁動的真正規律（例如：原來每次都是下午四點肚子餓或電視太吵才發作），而非只貼上「他很躁動」的標籤。",
      C: "非ABC行為分析定義。",
      D: "非時段代號。"
    },
    corePrinciple: "運用「ABC 行為觀察法（前因 Antecedent → 行為 Behavior → 結果 Consequence）」找出行為背後的規律與觸發點。",
    sopReference: "失智症BPSD個別化行為分析與交班紀錄SOP。",
    redFlagAlert: "交班時應描述「具體觀察到的事實與有效安撫法」，避免只寫「今天很盧、不配合」等主觀形容詞。",
    source: "衛福部失智症照護專業人員訓練教材",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U3-12",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U3",
    unitTitle: "單元三：作息調整與黃昏時段焦躁",
    scene: "corridor",
    riskLevel: "red",
    stem: "【紅色安全題】失智的崔爺爺昨晚因失眠焦躁，家屬或醫師剛調整了鎮靜安眠／精神科相關藥物；今天早上崔爺爺起床走路時「雙腳發軟、頭暈搖晃、眼皮沉重打不開、差點跪倒」。照護人員應立即如何處置？",
    options: {
      A: "叫他去跑步提振精神，把藥效流汗排掉。",
      B: "繼續讓他自己一個人去浴室洗澡。",
      C: "立即警覺這是「藥物副作用（如姿勢性低血壓、過度鎮靜、錐體外症候群）引發之極高跌倒風險」，先立即攙扶協助坐臥休息防跌、量測血壓與生命徵象，並馬上依機構SOP通報護理師與醫師評估調整用藥。",
      D: "自己決定把他的藥全部丟進垃圾桶停藥。"
    },
    correct: "C",
    optionReasons: {
      A: "在頭暈腿軟與姿勢性低血壓狀態下強迫運動，必定發生嚴重跌倒骨折！",
      B: "獨自進濕滑浴室極度危險。",
      C: "正確！新開立或調整鎮靜／精神科藥物後，最需防範過度鎮靜、步態不穩與姿勢性低血壓跌倒；必須立即保護防跌、量血壓並通報醫護團隊。",
      D: "照服員不得擅自停藥或丟藥，應通報護理師與醫師依醫囑調整。"
    },
    corePrinciple: "用藥調整後若出現「嗜睡、步態搖晃、頭暈腿軟」屬高跌倒風險紅色警訊，須立即保護防跌、量測血壓並通報醫護評估。",
    sopReference: "機構高跌倒風險藥物監測與異常反應通報SOP。",
    redFlagAlert: "紅色高風險安全題：鎮靜安眠與抗精神病藥物調整後前72小時為跌倒最高峰期，下床務必落實漸進式坐起與人員陪伴。",
    source: "高齡用藥安全與防跌臨床指引",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },

  // ================= 單元 4：物品遺失懷疑與安全異常辨識（12題） =================
  {
    id: "T2-U4-01",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U4",
    unitTitle: "單元四：物品遺失懷疑與安全異常辨識",
    scene: "lounge",
    riskLevel: "yellow",
    stem: "失智的林奶奶把自己的紅包袋塞進枕頭套夾層裡，過十分鐘卻忘記了，焦急地在房間大喊：「我的錢包被人偷拿走了！你們這裡有小偷！」此時照護人員應如何回應與處理？",
    options: {
      A: "大聲回嗆：「林奶奶您不要血口噴人！都是您自己亂藏忘記的，誰稀罕您的錢！」",
      B: "叫林奶奶自己找，找不到就不理她。",
      C: "不爭辯有沒有小偷、不指責她健忘，先溫和同理她找不到重要物品的焦急：「林奶奶，紅包不見了您一定很著急對不對？我陪您一起找找看！」接著自然引導到她常藏東西的幾個位置（如枕頭下、抽屜），並「引導讓林奶奶自己親眼發現並拿出來」。",
      D: "附和她說：「對！我也看到剛剛有個穿黑衣服的小偷從窗戶跳進來偷走了！」"
    },
    correct: "C",
    optionReasons: {
      A: "對立爭辯會讓長者覺得照護者在包庇小偷，加深敵意。",
      B: "置之不理會讓長者持續恐慌翻找。",
      C: "正確！面對被偷妄想，黃金步驟是「不爭辯、同理著急情緒、陪伴一起找、且找到時盡量引導長輩自己伸手拿出來」（若照護員秒掏出來，長輩反而會懷疑是你偷藏又拿回來的！）。",
      D: "錯誤強化妄想！編造黑衣小偷爬窗會讓長輩整晚恐懼不敢睡覺。"
    },
    corePrinciple: "處理懷疑物品被偷：不爭辯、不編造恐怖故事強化妄想；「同理焦急＋陪伴一起找＋引導長輩親手發現」。",
    sopReference: "失智被偷妄想處置SOP：陪伴尋物與高頻藏物點紀錄原則。",
    redFlagAlert: "平時可與家屬及長輩共同紀錄長輩習慣藏放物品的「秘密基地（如枕頭下、餅乾盒、外套口袋）」，加快協尋速度。",
    source: "雙軌互審去汙名化與妄想照護共識／衛福部指引",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U4-02",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U4",
    unitTitle: "單元四：物品遺失懷疑與安全異常辨識",
    scene: "lounge",
    riskLevel: "green",
    stem: "失智的陳爺爺每天都要摸摸口袋裡的皮夾跟老花眼鏡才安心，但又常隨手放著找不到。家屬與照護團隊可以預先做什麼準備，大幅減少找不到東西的焦慮？",
    options: {
      A: "禁止陳爺爺擁有任何皮夾與眼鏡。",
      B: "為常用必需品準備「備份雙胞胎（如兩副同度數同款老花眼鏡、一個放有少量零錢與平安卡的安心專用皮夾）」，並在他的固定桌面設置清楚標示的「陳爺爺專屬百寶盒」固定擺放。",
      C: "每次他弄丟就罰他抄寫心經。",
      D: "把他的眼鏡用強力膠黏在臉上。"
    },
    correct: "B",
    optionReasons: {
      A: "剝奪隨身安心物會造成長輩整天焦躁不安。",
      B: "正確！「重要日常用品準備備份＋固定專屬百寶盤定位＋平安皮夾（不放大額真鈔與正本證件）」，能大幅減少遺失恐慌。",
      C: "懲罰無效且傷自尊。",
      D: "荒謬且不人道。"
    },
    corePrinciple: "善用「常用物品備份（眼鏡／鑰匙圈）＋固定桌面百寶盒＋安心小皮夾」，從源頭減少遺失焦慮。",
    sopReference: "失智個人物品管理SOP：安心皮夾配置與固定定位盒設計。",
    redFlagAlert: "身分證、健保卡正本、存摺印章與高價金飾建議由家屬或機構依規定妥善保管，隨身皮夾僅放少量小額零錢或複印卡。",
    source: "Alzheimer's Association 日常物品管理建議",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U4-03",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U4",
    unitTitle: "單元四：物品遺失懷疑與安全異常辨識",
    scene: "dining",
    riskLevel: "green",
    stem: "失智的王奶奶有把重要東西（如活動假牙、戒指）用衛生紙包起來塞進口袋或放餐盤上的習慣。為了避免昂貴的假牙被當成垃圾丟掉，照護團隊應落實哪項習慣？",
    options: {
      A: "看到桌上有衛生紙團連看都不看，直接全部掃進垃圾桶倒掉。",
      B: "建立「清理桌面、床單與洗衣服前，必定先捏一捏、打開檢查衛生紙團與口袋」的標準防呆習慣，並為王奶奶提供顏色鮮明、貼有名字的專屬假牙盒。",
      C: "不准王奶奶再用任何衛生紙。",
      D: "弄丟了就怪王奶奶自己活該。"
    },
    correct: "B",
    optionReasons: {
      A: "失智專區最常發生「假牙包在衛生紙裡被當廚餘丟掉」的意外，直接掃掉風險極高！",
      B: "正確！失智長者常習慣用衛生紙包覆貴重物或假牙；養成「丟棄衛生紙團與洗滌衣物前必檢視口袋與紙團」及使用鮮明專屬盒，是機構防遺失關鍵SOP。",
      C: "不提供衛生紙不切實際。",
      D: "推卸責任會引發家屬糾紛。"
    },
    corePrinciple: "失智長者常將「假牙或貴重物包在衛生紙團裡」，收餐盤與清理床鋪前務必先檢查紙團與衣物口袋。",
    sopReference: "住民假牙與隨身物品防遺失查核SOP。",
    redFlagAlert: "餐後與睡前應定時清點活動假牙在位情形，避免長者誤丟或混入床單送洗。",
    source: "長照機構品質管理與防遺失實務",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U4-04",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U4",
    unitTitle: "單元四：物品遺失懷疑與安全異常辨識",
    scene: "lounge",
    riskLevel: "yellow",
    stem: "失智的戴奶奶喜歡收集各種空紙盒、廣告單跟吃完的果凍空杯塞在床頭櫃，塞滿了甚至放到床上（囤積與藏物行為）。照護人員清理時應注意什麼？",
    options: {
      A: "當著戴奶奶的面把她的寶貝紙盒全部踩扁丟進大垃圾桶，罵她製造垃圾。",
      B: "尊重其收集行為背後的「安全感與佔有需求」，與她約定一個專屬的「百寶收納箱」限制收集範圍；對於會腐敗發臭的果凍盒或生鮮食物，在陪伴轉移注意力時以乾淨安全的紙盒／色紙溫和替換清理。",
      C: "任由腐爛的食物跟果凍盒發霉長蟲都不清理。",
      D: "把她的床頭櫃搬走不給她用。"
    },
    correct: "B",
    optionReasons: {
      A: "當面暴力清空囤積物會讓長者遭受極大失落感與憤怒反撲。",
      B: "正確！採用「設立安全收集專區（可控範圍）＋優先替換易腐敗發霉物品（保障衛生安全）＋不當面粗暴清空」的平衡策略最穩妥。",
      C: "放任食物腐敗會引來蟑螂螞蟻並導致長者誤食中毒。",
      D: "搬走家具會讓長者把東西改藏進棉被或床底下。"
    },
    corePrinciple: "面對收集與藏物行為，採「提供專屬百寶箱控管範圍＋溫和替換易腐敗危险物」，不當面粗暴清空。",
    sopReference: "失智囤積與藏物行為環境衛生管理SOP。",
    redFlagAlert: "每日應配合長輩活動離房時段，安全巡檢床頭櫃是否有藏放易腐壞熟食、未吞服藥物或尖銳物。",
    source: "WHO iSupport 失智日常行為照護",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U4-05",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U4",
    unitTitle: "單元四：物品遺失懷疑與安全異常辨識",
    scene: "lounge",
    riskLevel: "yellow",
    stem: "失智的魏爺爺看著前來探視的結縭五十年妻子，卻突然搖頭說：「妳長得很像我太太，但妳不是她，妳是冒充的！」（卡普格拉症候群 Capgras syndrome／冒充者妄想）。此時家屬非常傷心，照護人員如何協助溝通最恰當？",
    options: {
      A: "逼魏爺爺背出結婚紀念日，背不出來就罵他忘恩負義。",
      B: "先私下安撫妻子：「這不是爺爺不愛您，而是失智症大腦『視覺辨識與熟悉情感連結線路』暫時搭不上線造成的症狀」；建議妻子先短暫退出視線，改用「打電話／在門外先出聲問候（聽覺熟悉通道未受損）」或一起喝茶不強求他立刻相認。",
      C: "叫妻子以後都不要再來探視了。",
      D: "跟著爺爺一起質疑妻子是假冒的。"
    },
    correct: "B",
    optionReasons: {
      A: "強逼相認只會讓長者更堅信眼前人是騙子，家屬也更受傷。",
      B: "正確！這是大腦視覺面部辨識區與邊緣系統情感區連結受損所致（看得見臉但產生不了熟悉感），然而「聽覺聲音辨識」往往還保留著！衛教家屬理解疾病機轉並改由聲音溫和開場，能大幅緩解衝突與傷心。",
      C: "中斷親情探視並非正確解方。",
      D: "附和冒充者妄想會加深恐懼。"
    },
    corePrinciple: "當長者出現「親人被冒充」之妄想時，衛教家屬理解這是大腦視覺情感連結受損，不強逼相認，可善用「熟悉聲音開場」重建安全感。",
    sopReference: "失智症錯認症候群（Misidentification）家屬心理支持與溝通SOP。",
    redFlagAlert: "照顧者與家屬面對「不被親人認出」常有高度心理悲傷，應主動提供家屬情緒支持與喘息資源。",
    source: "臨床失智症神經心理學與家屬支持指引",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U4-06",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U4",
    unitTitle: "單元四：物品遺失懷疑與安全異常辨識",
    scene: "lounge",
    riskLevel: "green",
    stem: "為了保障失智長輩在機構或居家環境的日常安全，下列哪一項「環境安全設施配置」最符合標準？",
    options: {
      A: "熱水瓶直接放在失智長輩隨手可按出100度滾水的矮桌上，旁邊放消毒漂白水。",
      B: "飲水機熱水端設有安全兒童／防燙鎖（或限制出水水溫）、清潔化學藥劑與利器專櫃上鎖、窗戶加裝防墜安全限位器（開口不超過10~15公分）、全區地面平整防滑無門檻。",
      C: "走廊到處拉滿延長線跟插座。",
      D: "把滅火器藏起來不讓任何人看到。"
    },
    correct: "B",
    optionReasons: {
      A: "100度滾水與漂白水放在隨手處會造成嚴重燙傷與誤食灼傷！",
      B: "正確！防燙鎖、化學品與利器上鎖、窗戶安全限位器與無障礙防滑地面，是失智照護環境安全的四大基石。",
      C: "地面延長線極易絆倒長輩。",
      D: "滅火器應合規配置並防止誤拿，而非藏匿。"
    },
    corePrinciple: "落實失智環境四大安全防線：「熱水防燙鎖、化學品與利器上鎖、窗戶防墜限位器、無障礙防滑無雜物地面」。",
    sopReference: "失智專區環境安全每日巡檢表SOP。",
    redFlagAlert: "未使用的低處電源插座應加裝安全防護蓋，防範失智長者拿金屬物插弄觸電。",
    source: "衛福部長照機構公共安全與失智環境標準",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U4-07",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U4",
    unitTitle: "單元四：物品遺失懷疑與安全異常辨識",
    scene: "lounge",
    riskLevel: "yellow",
    stem: "失智的廖爺爺最近三天完全沒有解大便，今天下午突然在交誼廳走來走去、臉色潮紅、頻頻拍打自己的肚子並對靠近的人發脾氣。照護人員應優先考慮什麼問題？",
    options: {
      A: "認為他只是個性突然變壞。",
      B: "優先考慮「便祕與腹脹不適」引發之行為心理症狀（BPSD），先安撫情緒並立即通報護理師評估腸音與腹部狀況，依醫囑與照護計畫處理排便問題。",
      C: "叫他多吃兩塊乾硬的年糕。",
      D: "把他關進房間不理他。"
    },
    correct: "B",
    optionReasons: {
      A: "忽略三天未解便的明確生理線索。",
      B: "正確！便祕是長照機構失智長者「突然烦躁、拒食、拍打肚子、甚至急性混亂」最常見卻最常被忽略的生理誘因之一；解決便祕後躁動常隨之緩解。",
      C: "乾硬年糕難消化且易噎住。",
      D: "隔離無法解決便祕腹痛。"
    },
    corePrinciple: "當失智長者超過2～3天未解便且出現煩躁、拍肚或拒食時，務必優先通報護理師評估並處理「便祕腹脹」。",
    sopReference: "機構住民排便監測與便祕處置SOP。",
    redFlagAlert: "日常應結合充足水分、膳食纖維、規律下床活動與順時針腹部溫和按摩預防便祕。",
    source: "高齡失智BPSD生理誘因評估指引",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U4-08",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U4",
    unitTitle: "單元四：物品遺失懷疑與安全異常辨識",
    scene: "corridor",
    riskLevel: "red",
    stem: "【紅色安全題】如果機構照護人員在巡房時，發現失智的周爺爺不在房間與交誼廳，疑似已經走出機構大門不知去向（疑似走失）。此時第一時間的標準應變步驟為何？",
    options: {
      A: "先隱瞞不報，自己一個人偷偷騎機車出去找兩小時，找不到再說。",
      B: "立即啟動「機構住民走失緊急應變SOP」：第一時間通報主管與護理站、分工清查機構內部死角（如樓梯間、浴廁、花園）與調閱監視器確認離院方向、備妥長輩近期清晰照片與當日衣著特徵、同步聯繫家屬並立即報警協尋。",
      C: "等明天早上天亮再慢慢找。",
      D: "怪門口的警衛，自己繼續做常規清潔工作。"
    },
    correct: "B",
    optionReasons: {
      A: "隱瞞延誤黃金協尋前30分鐘，失智長者可能已走上大馬路或搭車遠離，造成致命危險！",
      B: "正確！走失應變分秒必爭，必須立即通報啟動全院協尋SOP（內部死角清查＋監視器方向確認＋當日衣著特徵與防走失定位／手鍊資訊＋家屬聯繫與報警）。",
      C: "夜間低溫與視線不良對走失長者極度危險。",
      D: "推卸責任延誤救援。"
    },
    corePrinciple: "發現疑似走失，嚴禁隱瞞單獨尋找，必須「立即通報啟動走失緊急應變SOP：內部死角清查、確認當日衣著與監視器方向、通知家屬並報警」。",
    sopReference: "機構住民走失預防與緊急協尋通報SOP。",
    redFlagAlert: "紅色高風險安全題：長者找到返院後，務必由護理師進行全身皮膚外傷、脫水、體溫與生命徵象檢查並給予溫暖安撫，絕不責罵長者。",
    source: "衛福部長照機構緊急事件處理SOP",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U4-09",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U4",
    unitTitle: "單元四：物品遺失懷疑與安全異常辨識",
    scene: "lounge",
    riskLevel: "red",
    stem: "【紅色安全題】患有糖尿病且失智的林奶奶，在下午三點突然出現「全身冒冷汗、雙手發抖、臉色蒼白、眼神呆滯且步態不穩」。此時最優先應懷疑並啟動哪項緊急處置？",
    options: {
      A: "當作她是冷氣吹太多覺得冷，幫她蓋三件厚棉被讓她睡覺。",
      B: "立即懷疑是「急性低血糖（Hypoglycemia）」紅色危急徵象！立即保護防跌、請護理師現場立刻檢測指尖血糖，並依機構低血糖緊急處置SOP辦理（若意識清楚可吞嚥，依醫護指示補充15公克速效糖分；若意識不清則嚴禁灌食並緊急送醫／靜脈給糖）。",
      C: "叫她去跑操場運動流汗。",
      D: "再幫她打一針胰島素。"
    },
    correct: "B",
    optionReasons: {
      A: "大忌！把低血糖冒冷汗當成愛睏蓋被睡覺，會在睡夢中發生低血糖昏迷甚至腦死！",
      B: "正確！冒冷汗、手抖、蒼白、突發呆滯或躁動是糖尿病失智長者典型的急性低血糖表現，須立即測血糖並依意識與吞嚥狀態啟動低血糖急救SOP。",
      C: "運動會消耗更多血糖，加速昏迷。",
      D: "低血糖再打胰島素會致命！"
    },
    corePrinciple: "糖尿病失智長者出現「冒冷汗、手抖、蒼白、突發呆滯或意識改變」，須立即懷疑急性低血糖並通報護理師測血糖與急救。",
    sopReference: "機構急性低血糖辨識與緊急處置SOP（15/15法則與意識不清禁食規範）。",
    redFlagAlert: "紅色高風險安全題：若長者已意識不清或無法安全吞嚥，切勿將糖水硬灌入口中以免窒息，應立即由醫護人員處置並送醫。",
    source: "糖尿病臨床照護指引／機構急救SOP",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U4-10",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U4",
    unitTitle: "單元四：物品遺失懷疑與安全異常辨識",
    scene: "lounge",
    riskLevel: "red",
    stem: "【紅色安全題】失智的陳伯伯今天早上吃飯時突然變得異常嗜睡、呼吸速度明顯變快且費力（每分鐘呼吸超過26次）、嘴唇微暗，咳嗽有濃痰但體溫只有37.3度。照護人員應如何判斷？",
    options: {
      A: "因為體溫沒有超過38度，所以絕對沒有生病，讓他繼續睡就好。",
      B: "高度警覺這是「高齡者非典型肺炎／呼吸道感染（常不發高燒，而以呼吸急促、嗜睡、食慾驟降表現）」的紅色警訊，立即協助採半坐臥姿維持呼吸道通暢，並馬上通報護理師量測血氧（SpO2）與啟動就醫評估SOP。",
      C: "幫他把窗戶關緊、棉被拉到頭頂悶汗。",
      D: "餵他喝冰水退熱。"
    },
    correct: "B",
    optionReasons: {
      A: "危險盲點！高齡長者免疫反應較弱，發生嚴重肺炎或敗血症時，常不會發高燒，而是以「呼吸變快（>24~25次/分）、嗜睡、混亂、拒食」為最早警訊！",
      B: "正確！辨識高齡感染的「非典型紅旗指標（呼吸急促、嗜睡、血氧下降）」，立即協助半坐臥並通報護理師量測血氧與送醫評估。",
      C: "悶頭蓋被會加重呼吸困難與缺氧。",
      D: "嗜睡呼吸喘時灌水極易吸入性肺炎。"
    },
    corePrinciple: "高齡失智者感染常「不發高燒」，一旦出現「呼吸變快費力、突發嗜睡、拒食或血氧下降」屬肺炎／敗血症紅色警訊，須立即通報醫護。",
    sopReference: "高齡非典型感染徵兆監測與緊急轉介SOP。",
    redFlagAlert: "紅色高風險安全題：密切監測呼吸速率（RR）與血氧飽和度（SpO2 < 92~94% 需立即通報護理師處置）。",
    source: "老年醫學非典型感染症臨床指引",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U4-11",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U4",
    unitTitle: "單元四：物品遺失懷疑與安全異常辨識",
    scene: "lounge",
    riskLevel: "green",
    stem: "在設計與執行這套長照失智教育訓練題庫時，為了保護住民與家屬的個人資料與隱私（符合個資法與機構倫理），案例編寫必須遵守什麼底線？",
    options: {
      A: "直接把機構真實住民的全名、身分證字號、病歷號與照片貼在遊戲題目裡，這樣最真實。",
      B: "所有教學案例與課堂討論必須「100% 去識別化（使用虛構代稱、移除可回推特定個人之特徵與照片）」，且嚴禁在系統中輸入真實住民病歷個資。",
      C: "把真實住民的洗澡影片上傳到公開網站當題目。",
      D: "只在房間門外貼真實病歷。"
    },
    correct: "B",
    optionReasons: {
      A: "直接放真實姓名、病歷號與照片嚴重違反《個人資料保護法》與醫事人員保密義務！",
      B: "正確！教育訓練案例必須完全去識別化，使用虛構人物情境，且不得將真實住民個資輸入教學系統。",
      C: "嚴重違法且侵犯人性尊嚴。",
      D: "公開張貼病歷同樣違反個資與隱私規範。"
    },
    corePrinciple: "教學案例與課堂討論必須「100% 去識別化」，嚴禁輸入真實住民姓名、病歷號或未授權照片。",
    sopReference: "機構教育訓練個資保護與案例去識別化治理SOP。",
    redFlagAlert: "課後匯出之班級學習報告亦應遵守最小必要與去識別化原則。",
    source: "個人資料保護法／長照機構資訊安全規範",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  },
  {
    id: "T2-U4-12",
    themeId: "theme2",
    themeTitle: "失智長者的照顧方式（日常生活常見問題）",
    unitId: "T2-U4",
    unitTitle: "單元四：物品遺失懷疑與安全異常辨識",
    scene: "lounge",
    riskLevel: "green",
    stem: "當照服員、護理師、社工與家屬面對失智長輩複雜的日常照顧問題時，為什麼需要「跨專業團隊合作與對照個別照護計畫（Care Plan）」？",
    options: {
      A: "因為這樣出事的時候可以互相推卸責任。",
      B: "因為每位失智長輩的生命史、病程、共病與藥物都不同；遊戲中的通則有助於建立同理與安全基本功，但現場實際處置務必依「長輩個別照護計畫、機構SOP與跨專業團隊評估」彈性調整。",
      C: "因為只要背熟標準答案，就可以套用在全世界所有長輩身上。",
      D: "完全不需要團隊合作，每個人照自己的習慣做就好。"
    },
    correct: "B",
    optionReasons: {
      A: "團隊合作是為了提升照護品質與安全，而非推卸責任。",
      B: "正確！失智照護沒有一體適用的死板公式；透過基本原則建立「先同理情緒、先排除生理不適、維護尊嚴安全」的共識後，現場務必回歸個別照護計畫與機構SOP。",
      C: "機械式套用標準答案而忽略個別差異，反而可能造成風險。",
      D: "照護方式不一致會讓失智長輩更加混亂。"
    },
    corePrinciple: "掌握「同理、尊嚴、安全」核心原則，並在現場結合「長者個別照護計畫、機構SOP與跨專業團隊評估」落實照護。",
    sopReference: "跨專業團隊整合照護（ISP/個別化支持計畫）執行規範。",
    redFlagAlert: "發現長者日常功能或行為與既有照護計畫不符時，應主動於交班與跨專業會議提出修訂討論。",
    source: "衛福部失智共同照護中心指引／雙軌互審總結共識",
    version: "v1.0",
    auditStatus: "published",
    auditTrail: { draft: true, clinical: true, education: true, sop: true, published: true },
    reviewDate: "2027-05-12"
  }
];

