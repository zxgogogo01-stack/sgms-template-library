# 074 Amber Broadcast · 工作流 v2 接入契约

## 范围与风格

只制作完整网站模板，不写业务文章或注册教程，不部署。原 broadcast-console.css 字节保留，新 transmission-room.css 完成双主题、阅读、控制室与响应式。保留原首页全部类名、模拟调谐盘、三路电平和节目单结构。动态源包未取得，原包忠实度未核验；不得把 UI 验收当作保真证明。

35 个 HTML：31 可索引页、404、3 个 noindex 手动旧入口。十二篇文章框架、四条交叉频段各三篇、五工具、七页公开说明。cornerstone 为容量角色；registrationGuide 只是兼容字段名，指通用推广组件页，不指定教程。

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "programme-log.html",
  "articles": [
    "transcripts/opening-cue.html",
    "transcripts/speaker-track.html",
    "transcripts/source-patch.html",
    "transcripts/breath-mark.html",
    "transcripts/timing-board.html",
    "transcripts/pending-channel.html",
    "transcripts/isolated-quote.html",
    "transcripts/pronunciation-card.html",
    "transcripts/signal-ledger.html",
    "transcripts/revision-reel.html",
    "transcripts/room-handoff.html",
    "transcripts/off-air-note.html"
  ],
  "cornerstones": [
    "transcripts/opening-cue.html",
    "transcripts/speaker-track.html"
  ],
  "registrationGuide": "transcripts/off-air-note.html",
  "articleCovers": {
    "transcripts/opening-cue.html": {
      "display": "assets/reels/opening-cue.webp",
      "og": "assets/reels/opening-cue.png"
    },
    "transcripts/speaker-track.html": {
      "display": "assets/reels/speaker-track.webp",
      "og": "assets/reels/speaker-track.png"
    },
    "transcripts/source-patch.html": {
      "display": "assets/reels/source-patch.webp",
      "og": "assets/reels/source-patch.png"
    },
    "transcripts/breath-mark.html": {
      "display": "assets/reels/breath-mark.webp",
      "og": "assets/reels/breath-mark.png"
    },
    "transcripts/timing-board.html": {
      "display": "assets/reels/timing-board.webp",
      "og": "assets/reels/timing-board.png"
    },
    "transcripts/pending-channel.html": {
      "display": "assets/reels/pending-channel.webp",
      "og": "assets/reels/pending-channel.png"
    },
    "transcripts/isolated-quote.html": {
      "display": "assets/reels/isolated-quote.webp",
      "og": "assets/reels/isolated-quote.png"
    },
    "transcripts/pronunciation-card.html": {
      "display": "assets/reels/pronunciation-card.webp",
      "og": "assets/reels/pronunciation-card.png"
    },
    "transcripts/signal-ledger.html": {
      "display": "assets/reels/signal-ledger.webp",
      "og": "assets/reels/signal-ledger.png"
    },
    "transcripts/revision-reel.html": {
      "display": "assets/reels/revision-reel.webp",
      "og": "assets/reels/revision-reel.png"
    },
    "transcripts/room-handoff.html": {
      "display": "assets/reels/room-handoff.webp",
      "og": "assets/reels/room-handoff.png"
    },
    "transcripts/off-air-note.html": {
      "display": "assets/reels/off-air-note.webp",
      "og": "assets/reels/off-air-note.png"
    }
  },
  "categories": [
    {
      "path": "frequencies/front-mic.html",
      "label": "台前频段",
      "articles": [
        "transcripts/opening-cue.html",
        "transcripts/timing-board.html",
        "transcripts/signal-ledger.html"
      ]
    },
    {
      "path": "frequencies/field-mic.html",
      "label": "现场频段",
      "articles": [
        "transcripts/speaker-track.html",
        "transcripts/pending-channel.html",
        "transcripts/revision-reel.html"
      ]
    },
    {
      "path": "frequencies/proof-mic.html",
      "label": "校读频段",
      "articles": [
        "transcripts/source-patch.html",
        "transcripts/isolated-quote.html",
        "transcripts/room-handoff.html"
      ]
    },
    {
      "path": "frequencies/replay-mic.html",
      "label": "回听频段",
      "articles": [
        "transcripts/breath-mark.html",
        "transcripts/pronunciation-card.html",
        "transcripts/off-air-note.html"
      ]
    }
  ],
  "toolIndex": "control-room.html",
  "tools": [
    "console/voice-ruler.html",
    "console/crossfade-rundown.html",
    "console/pcm-budget.html",
    "console/insertion-window.html",
    "console/pronunciation-locator.html"
  ],
  "legal": {
    "about": "station-room.html",
    "contact": "listener-post.html",
    "disclosure": "interest-channel.html",
    "disclaimer": "scope-channel.html",
    "privacy": "data-channel.html",
    "corrections": "correction-log.html",
    "editorial": "editing-standard.html"
  },
  "error404": "404.html",
  "robots": "robots.txt",
  "sitemap": "sitemap.xml",
  "feed": "feed.xml",
  "security": ".well-known/security.txt",
  "favicon": "favicon.ico",
  "appleTouchIcon": "apple-touch-icon.png",
  "socialImage": "assets/station-frequency.png",
  "variables": {
    "siteDomain": "%%SITE_DOMAIN%%",
    "siteName": "%%SITE_NAME%%",
    "wordmark": "%%BRAND_EN%%",
    "inviteCode": "%%INVITE_CODE%%",
    "benefitRate": "%%BENEFIT_RATE%%",
    "benefitDisclaimer": "%%BENEFIT_DISCLAIMER%%",
    "affiliateUrl": "%%AFFILIATE_URL%%"
  }
}
```

## 后续 AI 接手

- 只填经核实的正文和变量，不再补 UI、工具、目录、资源或移动端样式。保留锚点、标签关系与页面角色。
- 三种文章开场，十二组件：开场提示条、说话者轨道、来源接线板、呼吸符、时间看板、待核频道、独立引用、发音卡、信号账、修订卷、可复制交接单、离台说明；不要统一为同款卡片。
- FAQ、目录与三种收尾均已建好，表格局部滚动，折叠组件无需 JS。正文与作者经历不得虚构。
- 首页形态 A 仅代码复制、利益点和脚注，无推广直链。off-air-note.html 只留一处静态推广槽，保留 target、rel 四值及邻近披露。
- 首页可以到达全部可索引页面，各内页至少三个站内入链，主导航五入口；旧入口不自动跳转。
- 调谐盘和电平为抽象静态模拟，不是正在直播或音频测量。十二套 SVG/PNG/WebP 封面不是真实录音证据，站点社交 PNG 为 1200×630，Apple 为 180px，ICO 为 16/32/48px。
- QA 测试文案只在本地内存渲染，不能当成正式站点文章发布。

## 变量格式与容量

BRAND_EN 3–24 英文或罗马字；STATION_ID、DIAL_ID 1–3 ASCII 字符；DIAL_LABEL 2–12 英文字母；DIAL_SCALE_n 为 1–4 字符刻度；首页标题 8–20 中文字，首页说明 35–65 字；代码 4–28 ASCII 字符，利益脚注 16–45 字。SIGNAL、CHANNEL_MARK、CHANNEL_LABEL、GROUP_n_SHORT 为 2–12 字符短标。文章摘要 40–100 字，正文槽 100–800 字，可按内容加自然段，不改组件和锚点。

SITE_DOMAIN 为纯域名；AFFILIATE_URL 与 SOURCE_n_URL 为核实的绝对 HTTPS URL，拒绝脚本协议。邮箱纯地址；LANG 为真实 BCP47；PUBLISHED/MODIFIED 为真实 ISO 日期；RSS_DATE 为 RFC2822 UTC 日期；SECURITY_EXPIRES 为未来 RFC3339 UTC 到期日期。

替换必须按上下文转义：HTML 文本转义 & < >，属性还需转义双引号，XML 使用 XML 转义，JSON-LD 使用 JSON 字符串转义并将 < 写为 \u003c。不能未转义全局替换，不能把 HTML 塞入纯文字变量。事实、合规和生产验收仍属单站流程。

## 五个本地工具

### 口播段落计时尺

每个非空行是一段，保留原始行号；1–80 段，输入最多 10000 Unicode 码点，单段 NFKC 后最多 500 码点。

NFKC 后折叠段内空白。空白不计，Unicode 标点算半单位，其他字符算一单位；每段秒数为 ceil(半单位数 × 30 / 语速)，再逐段累加。

例如“甲乙。”为 2.5 单位，在 180 单位/分钟档为 1 秒。报告输出全部段落，超过 45 秒才标长段。

不分析发音、音乐或真实音频；标点与字母权重只是编辑模型，不是真人录音时长。

仅浏览器内计算，不上传、不保存逐字稿；代码与完整报告可复制。

### 交接叠化排程

每行恰好两个 |；段名 1–60 码点且忽略大小写后唯一，段长 1–3600 整数秒，重叠为 0–3600 整数秒。原值最多 10000 码点，1–80 段。

第一段从 0 开始且重叠必须为 0；后段开始=前段结束−本段重叠，结束=开始+本段时长。重叠不得超过前后任一段时长。

60 秒、120 秒且重叠 5 秒，第二段从 55 秒到 175 秒，总时长 175 秒。

这是相邻段落排程。允许完全重叠和三段并存；不证明混音可听性，不输出实际音频。

全部输入和报告留在浏览器，修改任一输入立即使旧报告失效。

### PCM 容量预算

采样率仅限 8000/16000/22050/24000/44100/48000/88200/96000/192000 Hz；位深为 8/16/24/32，声道 1–8，时长 1–86400 整数秒。

每声道样本数=采样率×秒数；每秒字节=采样率×位深÷8×声道；净字节=每秒字节×秒数。整数运算使用 BigInt。

48000 Hz、24 bit、双声道、60 秒：每秒 288000 字节，净数据 17280000 字节。MB 以 1000000、MiB 以 1048576 换算。

十进制和二进制容量显示六位小数并四舍五入，精确值以整数字节为准。不含容器头、元数据、压缩与文件系统开销。

不读取或生成音频，不推荐录制规格；所有输入只在本地计算。

### 可用插播窗口

占用区间每行恰好一个 |，最多 100 行，原值最多 6000 码点。所有端点为 0–86400 整数且 0 ≤ 开始 < 结束 ≤ 节目边界。空清单合法。

区间按左闭右开处理；先按开始、结束排序，再合并相交或相邻区间，取 [0,节目边界) 的补集。

空档 [40,60) 长 20 秒，10 秒插播的最早起点为 40、最晚为 50。恰好等于空档长度也可以放入。

报告保留全部输入区间、合并占用、每个空档及最早/最晚候选起点；不匹配时明确给出无可用窗口。不是实时播出调度器。

输入不上传，不修改真实节目单，只有用户主动复制时写入剪贴板。

### 发音词表定位

词表 1–50 行，每行一个 |；原词 NFKC 后为 1–40 非空白码点、读法 1–100 码点。原词区分大小写且不可重复，词表原值最多 8000 码点。

文本原值最多 20000 码点，统一换行后 NFKC；从左到右，每个位置选最长匹配词，命中后越过该词，不重复输出其内部短词。

词表含“广播台”和“广播”时，“广播台”只匹配较长词。报告给出规范化文本的一基码点位置、行列、词条、读法和每条词的次数。

最多 1000 命中，超出则拒绝整份报告，不静默截断。位置属于规范化后文本，不是原始字节或字符偏移；不验证读法是否正确。

按字面文本匹配，不执行正则或 HTML；词表和文字不上传、不写存储。

所有工具在归一化与裁剪前检查原值长度及 Unicode 完整性，拒绝禁止控制符；不静默截断。错误聚焦并关联字段；输入、选项和重置立即清空旧报告；异步复制用修订号避免迟到反馈。仅主题保存在 amber-broadcast-074-studio，不保存用户文字或清单。无 JS 时计算与复制禁用、导航和正文可读。

## 审计

运行 tools/validate.js、tools/audit-template.js、tools/audit-workflow-readiness.js、tools/check-similarity.js，再运行 tools/qa/074-amber-broadcast-browser.js。逐页检查 1440/768/390/360px 双主题、五工具独立算法、输入错误与极值、键盘、复制失效、无 JS 与深路径 404，再人工审阅所有版式。全部通过后才能记完成。

## 完整变量登记

- %%A10_AUTHOR_NOTE%%
- %%A10_BODY_1_A%%
- %%A10_BODY_1_B%%
- %%A10_BODY_2_A%%
- %%A10_BODY_2_B%%
- %%A10_BODY_3_A%%
- %%A10_BODY_3_B%%
- %%A10_BODY_4_A%%
- %%A10_BODY_4_B%%
- %%A10_CHANNEL_LABEL%%
- %%A10_CHANNEL_MARK%%
- %%A10_CHANNEL_NOTE%%
- %%A10_CONCLUSION%%
- %%A10_COVER_ALT%%
- %%A10_COVER_CAPTION%%
- %%A10_EYEBROW%%
- %%A10_FAQ_A_1%%
- %%A10_FAQ_A_2%%
- %%A10_FAQ_Q_1%%
- %%A10_FAQ_Q_2%%
- %%A10_FAQ_TITLE%%
- %%A10_H2_1%%
- %%A10_H2_2%%
- %%A10_H2_3%%
- %%A10_H2_4%%
- %%A10_MODIFIED%%
- %%A10_PUBLISHED%%
- %%A10_REVISION_MARK_1%%
- %%A10_REVISION_MARK_2%%
- %%A10_REVISION_MARK_3%%
- %%A10_REVISION_MARK_4%%
- %%A10_REVISION_TEXT_1%%
- %%A10_REVISION_TEXT_2%%
- %%A10_REVISION_TEXT_3%%
- %%A10_REVISION_TEXT_4%%
- %%A10_REVISION_TITLE_1%%
- %%A10_REVISION_TITLE_2%%
- %%A10_REVISION_TITLE_3%%
- %%A10_REVISION_TITLE_4%%
- %%A10_RSS_DATE%%
- %%A10_SECTION_LABEL_1%%
- %%A10_SECTION_LABEL_2%%
- %%A10_SECTION_LABEL_3%%
- %%A10_SECTION_LABEL_4%%
- %%A10_SIGNAL%%
- %%A10_SUMMARY%%
- %%A10_TITLE%%
- %%A10_TOC_LABEL%%
- %%A11_AUTHOR_NOTE%%
- %%A11_BODY_1_A%%
- %%A11_BODY_1_B%%
- %%A11_BODY_2_A%%
- %%A11_BODY_2_B%%
- %%A11_BODY_3_A%%
- %%A11_BODY_3_B%%
- %%A11_BODY_4_A%%
- %%A11_BODY_4_B%%
- %%A11_CHANNEL_LABEL%%
- %%A11_CHANNEL_MARK%%
- %%A11_CHANNEL_NOTE%%
- %%A11_CONCLUSION%%
- %%A11_COVER_ALT%%
- %%A11_COVER_CAPTION%%
- %%A11_ENDING_LABEL%%
- %%A11_EYEBROW%%
- %%A11_FAQ_A_1%%
- %%A11_FAQ_A_2%%
- %%A11_FAQ_A_3%%
- %%A11_FAQ_Q_1%%
- %%A11_FAQ_Q_2%%
- %%A11_FAQ_Q_3%%
- %%A11_FAQ_TITLE%%
- %%A11_H2_1%%
- %%A11_H2_2%%
- %%A11_H2_3%%
- %%A11_H2_4%%
- %%A11_HANDOFF_INTRO%%
- %%A11_HANDOFF_LABEL%%
- %%A11_HANDOFF_LINE_1%%
- %%A11_HANDOFF_LINE_2%%
- %%A11_HANDOFF_LINE_3%%
- %%A11_HANDOFF_LINE_4%%
- %%A11_HANDOFF_TITLE%%
- %%A11_MODIFIED%%
- %%A11_PUBLISHED%%
- %%A11_RSS_DATE%%
- %%A11_SECTION_LABEL_1%%
- %%A11_SECTION_LABEL_2%%
- %%A11_SECTION_LABEL_3%%
- %%A11_SECTION_LABEL_4%%
- %%A11_SIGNAL%%
- %%A11_SUMMARY%%
- %%A11_TITLE%%
- %%A11_TOC_LABEL%%
- %%A12_ACCESS_INTRO%%
- %%A12_ACCESS_LABEL%%
- %%A12_ACCESS_RISK%%
- %%A12_ACCESS_TITLE%%
- %%A12_AFFILIATE_DISCLOSURE%%
- %%A12_AUTHOR_NOTE%%
- %%A12_BODY_1_A%%
- %%A12_BODY_1_B%%
- %%A12_BODY_2_A%%
- %%A12_BODY_2_B%%
- %%A12_BODY_3_A%%
- %%A12_BODY_3_B%%
- %%A12_BODY_4_A%%
- %%A12_BODY_4_B%%
- %%A12_CHANNEL_LABEL%%
- %%A12_CHANNEL_MARK%%
- %%A12_CHANNEL_NOTE%%
- %%A12_CONCLUSION%%
- %%A12_COVER_ALT%%
- %%A12_COVER_CAPTION%%
- %%A12_ENDING_LABEL%%
- %%A12_END_LABEL_1%%
- %%A12_END_LABEL_2%%
- %%A12_END_MARK%%
- %%A12_END_NOTE_1%%
- %%A12_END_NOTE_2%%
- %%A12_END_TEXT%%
- %%A12_END_TITLE%%
- %%A12_EYEBROW%%
- %%A12_FAQ_A_1%%
- %%A12_FAQ_A_2%%
- %%A12_FAQ_Q_1%%
- %%A12_FAQ_Q_2%%
- %%A12_FAQ_TITLE%%
- %%A12_H2_1%%
- %%A12_H2_2%%
- %%A12_H2_3%%
- %%A12_H2_4%%
- %%A12_MODIFIED%%
- %%A12_PUBLISHED%%
- %%A12_RSS_DATE%%
- %%A12_SECTION_LABEL_1%%
- %%A12_SECTION_LABEL_2%%
- %%A12_SECTION_LABEL_3%%
- %%A12_SECTION_LABEL_4%%
- %%A12_SIGNAL%%
- %%A12_SUMMARY%%
- %%A12_TITLE%%
- %%A12_TOC_LABEL%%
- %%A1_AUTHOR_NOTE%%
- %%A1_BODY_1_A%%
- %%A1_BODY_1_B%%
- %%A1_BODY_2_A%%
- %%A1_BODY_2_B%%
- %%A1_BODY_3_A%%
- %%A1_BODY_3_B%%
- %%A1_BODY_4_A%%
- %%A1_BODY_4_B%%
- %%A1_CHANNEL_LABEL%%
- %%A1_CHANNEL_MARK%%
- %%A1_CHANNEL_NOTE%%
- %%A1_CONCLUSION%%
- %%A1_COVER_ALT%%
- %%A1_COVER_CAPTION%%
- %%A1_CUE_MARK_1%%
- %%A1_CUE_MARK_2%%
- %%A1_CUE_MARK_3%%
- %%A1_CUE_NOTE_1%%
- %%A1_CUE_NOTE_2%%
- %%A1_CUE_NOTE_3%%
- %%A1_CUE_TEXT_1%%
- %%A1_CUE_TEXT_2%%
- %%A1_CUE_TEXT_3%%
- %%A1_CUE_TITLE_1%%
- %%A1_CUE_TITLE_2%%
- %%A1_CUE_TITLE_3%%
- %%A1_EYEBROW%%
- %%A1_FAQ_A_1%%
- %%A1_FAQ_A_2%%
- %%A1_FAQ_Q_1%%
- %%A1_FAQ_Q_2%%
- %%A1_FAQ_TITLE%%
- %%A1_H2_1%%
- %%A1_H2_2%%
- %%A1_H2_3%%
- %%A1_H2_4%%
- %%A1_MODIFIED%%
- %%A1_PUBLISHED%%
- %%A1_RSS_DATE%%
- %%A1_SECTION_LABEL_1%%
- %%A1_SECTION_LABEL_2%%
- %%A1_SECTION_LABEL_3%%
- %%A1_SECTION_LABEL_4%%
- %%A1_SIGNAL%%
- %%A1_SUMMARY%%
- %%A1_TITLE%%
- %%A1_TOC_LABEL%%
- %%A2_AUTHOR_NOTE%%
- %%A2_BODY_1_A%%
- %%A2_BODY_1_B%%
- %%A2_BODY_2_A%%
- %%A2_BODY_2_B%%
- %%A2_BODY_3_A%%
- %%A2_BODY_3_B%%
- %%A2_BODY_4_A%%
- %%A2_BODY_4_B%%
- %%A2_CHANNEL_LABEL%%
- %%A2_CHANNEL_MARK%%
- %%A2_CHANNEL_NOTE%%
- %%A2_CONCLUSION%%
- %%A2_COVER_ALT%%
- %%A2_COVER_CAPTION%%
- %%A2_ENDING_LABEL%%
- %%A2_EYEBROW%%
- %%A2_FAQ_A_1%%
- %%A2_FAQ_A_2%%
- %%A2_FAQ_A_3%%
- %%A2_FAQ_Q_1%%
- %%A2_FAQ_Q_2%%
- %%A2_FAQ_Q_3%%
- %%A2_FAQ_TITLE%%
- %%A2_H2_1%%
- %%A2_H2_2%%
- %%A2_H2_3%%
- %%A2_H2_4%%
- %%A2_MODIFIED%%
- %%A2_PUBLISHED%%
- %%A2_RSS_DATE%%
- %%A2_SECTION_LABEL_1%%
- %%A2_SECTION_LABEL_2%%
- %%A2_SECTION_LABEL_3%%
- %%A2_SECTION_LABEL_4%%
- %%A2_SIGNAL%%
- %%A2_SPEAKER_1%%
- %%A2_SPEAKER_2%%
- %%A2_SPEAKER_3%%
- %%A2_SPEAKER_4%%
- %%A2_SPEAKER_NOTE_1%%
- %%A2_SPEAKER_NOTE_2%%
- %%A2_SPEAKER_NOTE_3%%
- %%A2_SPEAKER_NOTE_4%%
- %%A2_SPEECH_1%%
- %%A2_SPEECH_2%%
- %%A2_SPEECH_3%%
- %%A2_SPEECH_4%%
- %%A2_SUMMARY%%
- %%A2_TITLE%%
- %%A2_TOC_LABEL%%
- %%A3_AUTHOR_NOTE%%
- %%A3_BODY_1_A%%
- %%A3_BODY_1_B%%
- %%A3_BODY_2_A%%
- %%A3_BODY_2_B%%
- %%A3_BODY_3_A%%
- %%A3_BODY_3_B%%
- %%A3_BODY_4_A%%
- %%A3_BODY_4_B%%
- %%A3_CHANNEL_LABEL%%
- %%A3_CHANNEL_MARK%%
- %%A3_CHANNEL_NOTE%%
- %%A3_CONCLUSION%%
- %%A3_COVER_ALT%%
- %%A3_COVER_CAPTION%%
- %%A3_ENDING_LABEL%%
- %%A3_EYEBROW%%
- %%A3_FAQ_A_1%%
- %%A3_FAQ_A_2%%
- %%A3_FAQ_Q_1%%
- %%A3_FAQ_Q_2%%
- %%A3_FAQ_TITLE%%
- %%A3_H2_1%%
- %%A3_H2_2%%
- %%A3_H2_3%%
- %%A3_H2_4%%
- %%A3_MODIFIED%%
- %%A3_PATCH_LABEL_1%%
- %%A3_PATCH_LABEL_2%%
- %%A3_PATCH_LABEL_3%%
- %%A3_PATCH_TEXT_1%%
- %%A3_PATCH_TEXT_2%%
- %%A3_PATCH_TEXT_3%%
- %%A3_PATCH_TITLE_1%%
- %%A3_PATCH_TITLE_2%%
- %%A3_PATCH_TITLE_3%%
- %%A3_PUBLISHED%%
- %%A3_RSS_DATE%%
- %%A3_SECTION_LABEL_1%%
- %%A3_SECTION_LABEL_2%%
- %%A3_SECTION_LABEL_3%%
- %%A3_SECTION_LABEL_4%%
- %%A3_SIGNAL%%
- %%A3_SOURCE_1_LABEL%%
- %%A3_SOURCE_1_URL%%
- %%A3_SOURCE_2_LABEL%%
- %%A3_SOURCE_2_URL%%
- %%A3_SOURCE_3_LABEL%%
- %%A3_SOURCE_3_URL%%
- %%A3_SUMMARY%%
- %%A3_TITLE%%
- %%A3_TOC_LABEL%%
- %%A4_AUTHOR_NOTE%%
- %%A4_BODY_1_A%%
- %%A4_BODY_1_B%%
- %%A4_BODY_2_A%%
- %%A4_BODY_2_B%%
- %%A4_BODY_3_A%%
- %%A4_BODY_3_B%%
- %%A4_BODY_4_A%%
- %%A4_BODY_4_B%%
- %%A4_BREATH_NOTE_1%%
- %%A4_BREATH_NOTE_2%%
- %%A4_BREATH_NOTE_3%%
- %%A4_BREATH_TEXT_1%%
- %%A4_BREATH_TEXT_2%%
- %%A4_BREATH_TEXT_3%%
- %%A4_BREATH_TITLE_1%%
- %%A4_BREATH_TITLE_2%%
- %%A4_BREATH_TITLE_3%%
- %%A4_CHANNEL_LABEL%%
- %%A4_CHANNEL_MARK%%
- %%A4_CHANNEL_NOTE%%
- %%A4_CONCLUSION%%
- %%A4_COVER_ALT%%
- %%A4_COVER_CAPTION%%
- %%A4_EYEBROW%%
- %%A4_FAQ_A_1%%
- %%A4_FAQ_A_2%%
- %%A4_FAQ_Q_1%%
- %%A4_FAQ_Q_2%%
- %%A4_FAQ_TITLE%%
- %%A4_H2_1%%
- %%A4_H2_2%%
- %%A4_H2_3%%
- %%A4_H2_4%%
- %%A4_MODIFIED%%
- %%A4_PUBLISHED%%
- %%A4_RSS_DATE%%
- %%A4_SECTION_LABEL_1%%
- %%A4_SECTION_LABEL_2%%
- %%A4_SECTION_LABEL_3%%
- %%A4_SECTION_LABEL_4%%
- %%A4_SIGNAL%%
- %%A4_SUMMARY%%
- %%A4_TITLE%%
- %%A4_TOC_LABEL%%
- %%A5_AUTHOR_NOTE%%
- %%A5_BODY_1_A%%
- %%A5_BODY_1_B%%
- %%A5_BODY_2_A%%
- %%A5_BODY_2_B%%
- %%A5_BODY_3_A%%
- %%A5_BODY_3_B%%
- %%A5_BODY_4_A%%
- %%A5_BODY_4_B%%
- %%A5_CELL_1_1%%
- %%A5_CELL_1_2%%
- %%A5_CELL_1_3%%
- %%A5_CELL_2_1%%
- %%A5_CELL_2_2%%
- %%A5_CELL_2_3%%
- %%A5_CELL_3_1%%
- %%A5_CELL_3_2%%
- %%A5_CELL_3_3%%
- %%A5_CELL_4_1%%
- %%A5_CELL_4_2%%
- %%A5_CELL_4_3%%
- %%A5_CHANNEL_LABEL%%
- %%A5_CHANNEL_MARK%%
- %%A5_CHANNEL_NOTE%%
- %%A5_COL_1%%
- %%A5_COL_2%%
- %%A5_COL_3%%
- %%A5_COL_4%%
- %%A5_CONCLUSION%%
- %%A5_COVER_ALT%%
- %%A5_COVER_CAPTION%%
- %%A5_ENDING_LABEL%%
- %%A5_EYEBROW%%
- %%A5_FAQ_A_1%%
- %%A5_FAQ_A_2%%
- %%A5_FAQ_A_3%%
- %%A5_FAQ_Q_1%%
- %%A5_FAQ_Q_2%%
- %%A5_FAQ_Q_3%%
- %%A5_FAQ_TITLE%%
- %%A5_H2_1%%
- %%A5_H2_2%%
- %%A5_H2_3%%
- %%A5_H2_4%%
- %%A5_MODIFIED%%
- %%A5_PUBLISHED%%
- %%A5_ROW_1%%
- %%A5_ROW_2%%
- %%A5_ROW_3%%
- %%A5_ROW_4%%
- %%A5_RSS_DATE%%
- %%A5_SECTION_LABEL_1%%
- %%A5_SECTION_LABEL_2%%
- %%A5_SECTION_LABEL_3%%
- %%A5_SECTION_LABEL_4%%
- %%A5_SIGNAL%%
- %%A5_SUMMARY%%
- %%A5_TABLE_CAPTION%%
- %%A5_TABLE_LABEL%%
- %%A5_TITLE%%
- %%A5_TOC_LABEL%%
- %%A6_AUTHOR_NOTE%%
- %%A6_BODY_1_A%%
- %%A6_BODY_1_B%%
- %%A6_BODY_2_A%%
- %%A6_BODY_2_B%%
- %%A6_BODY_3_A%%
- %%A6_BODY_3_B%%
- %%A6_BODY_4_A%%
- %%A6_BODY_4_B%%
- %%A6_CHANNEL_LABEL%%
- %%A6_CHANNEL_MARK%%
- %%A6_CHANNEL_NOTE%%
- %%A6_CONCLUSION%%
- %%A6_COVER_ALT%%
- %%A6_COVER_CAPTION%%
- %%A6_ENDING_LABEL%%
- %%A6_EYEBROW%%
- %%A6_FAQ_A_1%%
- %%A6_FAQ_A_2%%
- %%A6_FAQ_Q_1%%
- %%A6_FAQ_Q_2%%
- %%A6_FAQ_TITLE%%
- %%A6_H2_1%%
- %%A6_H2_2%%
- %%A6_H2_3%%
- %%A6_H2_4%%
- %%A6_MODIFIED%%
- %%A6_PENDING_NOTE_1%%
- %%A6_PENDING_NOTE_2%%
- %%A6_PENDING_NOTE_3%%
- %%A6_PENDING_TEXT_1%%
- %%A6_PENDING_TEXT_2%%
- %%A6_PENDING_TEXT_3%%
- %%A6_PENDING_TITLE_1%%
- %%A6_PENDING_TITLE_2%%
- %%A6_PENDING_TITLE_3%%
- %%A6_PUBLISHED%%
- %%A6_RSS_DATE%%
- %%A6_SECTION_LABEL_1%%
- %%A6_SECTION_LABEL_2%%
- %%A6_SECTION_LABEL_3%%
- %%A6_SECTION_LABEL_4%%
- %%A6_SIGNAL%%
- %%A6_SUMMARY%%
- %%A6_TITLE%%
- %%A6_TOC_LABEL%%
- %%A7_AUTHOR_NOTE%%
- %%A7_BODY_1_A%%
- %%A7_BODY_1_B%%
- %%A7_BODY_2_A%%
- %%A7_BODY_2_B%%
- %%A7_BODY_3_A%%
- %%A7_BODY_3_B%%
- %%A7_BODY_4_A%%
- %%A7_BODY_4_B%%
- %%A7_CHANNEL_LABEL%%
- %%A7_CHANNEL_MARK%%
- %%A7_CHANNEL_NOTE%%
- %%A7_CONCLUSION%%
- %%A7_COVER_ALT%%
- %%A7_COVER_CAPTION%%
- %%A7_EYEBROW%%
- %%A7_FAQ_A_1%%
- %%A7_FAQ_A_2%%
- %%A7_FAQ_Q_1%%
- %%A7_FAQ_Q_2%%
- %%A7_FAQ_TITLE%%
- %%A7_H2_1%%
- %%A7_H2_2%%
- %%A7_H2_3%%
- %%A7_H2_4%%
- %%A7_MODIFIED%%
- %%A7_PUBLISHED%%
- %%A7_QUOTE_LABEL%%
- %%A7_QUOTE_LIMIT%%
- %%A7_QUOTE_SOURCE%%
- %%A7_QUOTE_TEXT%%
- %%A7_RSS_DATE%%
- %%A7_SECTION_LABEL_1%%
- %%A7_SECTION_LABEL_2%%
- %%A7_SECTION_LABEL_3%%
- %%A7_SECTION_LABEL_4%%
- %%A7_SIGNAL%%
- %%A7_SUMMARY%%
- %%A7_TITLE%%
- %%A7_TOC_LABEL%%
- %%A8_AUTHOR_NOTE%%
- %%A8_BODY_1_A%%
- %%A8_BODY_1_B%%
- %%A8_BODY_2_A%%
- %%A8_BODY_2_B%%
- %%A8_BODY_3_A%%
- %%A8_BODY_3_B%%
- %%A8_BODY_4_A%%
- %%A8_BODY_4_B%%
- %%A8_CHANNEL_LABEL%%
- %%A8_CHANNEL_MARK%%
- %%A8_CHANNEL_NOTE%%
- %%A8_CONCLUSION%%
- %%A8_COVER_ALT%%
- %%A8_COVER_CAPTION%%
- %%A8_ENDING_LABEL%%
- %%A8_EYEBROW%%
- %%A8_FAQ_A_1%%
- %%A8_FAQ_A_2%%
- %%A8_FAQ_A_3%%
- %%A8_FAQ_Q_1%%
- %%A8_FAQ_Q_2%%
- %%A8_FAQ_Q_3%%
- %%A8_FAQ_TITLE%%
- %%A8_H2_1%%
- %%A8_H2_2%%
- %%A8_H2_3%%
- %%A8_H2_4%%
- %%A8_MODIFIED%%
- %%A8_PUBLISHED%%
- %%A8_READING_1%%
- %%A8_READING_2%%
- %%A8_READING_3%%
- %%A8_READING_4%%
- %%A8_RSS_DATE%%
- %%A8_SECTION_LABEL_1%%
- %%A8_SECTION_LABEL_2%%
- %%A8_SECTION_LABEL_3%%
- %%A8_SECTION_LABEL_4%%
- %%A8_SIGNAL%%
- %%A8_SUMMARY%%
- %%A8_TERM_1%%
- %%A8_TERM_2%%
- %%A8_TERM_3%%
- %%A8_TERM_4%%
- %%A8_TERM_NOTE_1%%
- %%A8_TERM_NOTE_2%%
- %%A8_TERM_NOTE_3%%
- %%A8_TERM_NOTE_4%%
- %%A8_TITLE%%
- %%A8_TOC_LABEL%%
- %%A9_AUTHOR_NOTE%%
- %%A9_BODY_1_A%%
- %%A9_BODY_1_B%%
- %%A9_BODY_2_A%%
- %%A9_BODY_2_B%%
- %%A9_BODY_3_A%%
- %%A9_BODY_3_B%%
- %%A9_BODY_4_A%%
- %%A9_BODY_4_B%%
- %%A9_CHANNEL_LABEL%%
- %%A9_CHANNEL_MARK%%
- %%A9_CHANNEL_NOTE%%
- %%A9_CONCLUSION%%
- %%A9_COVER_ALT%%
- %%A9_COVER_CAPTION%%
- %%A9_ENDING_LABEL%%
- %%A9_EYEBROW%%
- %%A9_FAQ_A_1%%
- %%A9_FAQ_A_2%%
- %%A9_FAQ_Q_1%%
- %%A9_FAQ_Q_2%%
- %%A9_FAQ_TITLE%%
- %%A9_H2_1%%
- %%A9_H2_2%%
- %%A9_H2_3%%
- %%A9_H2_4%%
- %%A9_MODIFIED%%
- %%A9_PUBLISHED%%
- %%A9_RSS_DATE%%
- %%A9_SECTION_LABEL_1%%
- %%A9_SECTION_LABEL_2%%
- %%A9_SECTION_LABEL_3%%
- %%A9_SECTION_LABEL_4%%
- %%A9_SIGNAL%%
- %%A9_SIGNAL_NOTE_1%%
- %%A9_SIGNAL_NOTE_2%%
- %%A9_SIGNAL_NOTE_3%%
- %%A9_SIGNAL_NOTE_4%%
- %%A9_SIGNAL_TEXT_1%%
- %%A9_SIGNAL_TEXT_2%%
- %%A9_SIGNAL_TEXT_3%%
- %%A9_SIGNAL_TEXT_4%%
- %%A9_SIGNAL_TITLE_1%%
- %%A9_SIGNAL_TITLE_2%%
- %%A9_SIGNAL_TITLE_3%%
- %%A9_SIGNAL_TITLE_4%%
- %%A9_SUMMARY%%
- %%A9_TITLE%%
- %%A9_TOC_LABEL%%
- %%ABOUT_BODY_1%%
- %%ABOUT_BODY_2%%
- %%ABOUT_BODY_3%%
- %%ABOUT_BODY_4%%
- %%ABOUT_CONTACT_NOTE%%
- %%ABOUT_CONTACT_TITLE%%
- %%ABOUT_EYEBROW%%
- %%ABOUT_H2_1%%
- %%ABOUT_H2_2%%
- %%ABOUT_H2_3%%
- %%ABOUT_H2_4%%
- %%ABOUT_LABEL_1%%
- %%ABOUT_LABEL_2%%
- %%ABOUT_LABEL_3%%
- %%ABOUT_LABEL_4%%
- %%ABOUT_SUMMARY%%
- %%ABOUT_UPDATED_NOTE%%
- %%AFFILIATE_URL%%
- %%AUTHOR_NAME%%
- %%BENEFIT_DISCLAIMER%%
- %%BENEFIT_RATE%%
- %%BRAND_EN%%
- %%BRAND_LINE%%
- %%CONTACT_BODY_1%%
- %%CONTACT_BODY_2%%
- %%CONTACT_BODY_3%%
- %%CONTACT_BODY_4%%
- %%CONTACT_CONTACT_NOTE%%
- %%CONTACT_CONTACT_TITLE%%
- %%CONTACT_EMAIL%%
- %%CONTACT_EYEBROW%%
- %%CONTACT_H2_1%%
- %%CONTACT_H2_2%%
- %%CONTACT_H2_3%%
- %%CONTACT_H2_4%%
- %%CONTACT_LABEL_1%%
- %%CONTACT_LABEL_2%%
- %%CONTACT_LABEL_3%%
- %%CONTACT_LABEL_4%%
- %%CONTACT_SUMMARY%%
- %%CONTACT_UPDATED_NOTE%%
- %%CORRECTIONS_BODY_1%%
- %%CORRECTIONS_BODY_2%%
- %%CORRECTIONS_BODY_3%%
- %%CORRECTIONS_BODY_4%%
- %%CORRECTIONS_CONTACT_NOTE%%
- %%CORRECTIONS_CONTACT_TITLE%%
- %%CORRECTIONS_EYEBROW%%
- %%CORRECTIONS_H2_1%%
- %%CORRECTIONS_H2_2%%
- %%CORRECTIONS_H2_3%%
- %%CORRECTIONS_H2_4%%
- %%CORRECTIONS_LABEL_1%%
- %%CORRECTIONS_LABEL_2%%
- %%CORRECTIONS_LABEL_3%%
- %%CORRECTIONS_LABEL_4%%
- %%CORRECTIONS_SUMMARY%%
- %%CORRECTIONS_UPDATED_NOTE%%
- %%DIAL_ALT%%
- %%DIAL_ID%%
- %%DIAL_LABEL%%
- %%DIAL_SCALE_1%%
- %%DIAL_SCALE_2%%
- %%DIAL_SCALE_3%%
- %%DIAL_SCALE_4%%
- %%DIAL_SCALE_5%%
- %%DIAL_SCALE_6%%
- %%DISCLAIMER_BODY_1%%
- %%DISCLAIMER_BODY_2%%
- %%DISCLAIMER_BODY_3%%
- %%DISCLAIMER_BODY_4%%
- %%DISCLAIMER_CONTACT_NOTE%%
- %%DISCLAIMER_CONTACT_TITLE%%
- %%DISCLAIMER_EYEBROW%%
- %%DISCLAIMER_H2_1%%
- %%DISCLAIMER_H2_2%%
- %%DISCLAIMER_H2_3%%
- %%DISCLAIMER_H2_4%%
- %%DISCLAIMER_LABEL_1%%
- %%DISCLAIMER_LABEL_2%%
- %%DISCLAIMER_LABEL_3%%
- %%DISCLAIMER_LABEL_4%%
- %%DISCLAIMER_SUMMARY%%
- %%DISCLAIMER_UPDATED_NOTE%%
- %%DISCLOSURE_BODY_1%%
- %%DISCLOSURE_BODY_2%%
- %%DISCLOSURE_BODY_3%%
- %%DISCLOSURE_BODY_4%%
- %%DISCLOSURE_CONTACT_NOTE%%
- %%DISCLOSURE_CONTACT_TITLE%%
- %%DISCLOSURE_EYEBROW%%
- %%DISCLOSURE_H2_1%%
- %%DISCLOSURE_H2_2%%
- %%DISCLOSURE_H2_3%%
- %%DISCLOSURE_H2_4%%
- %%DISCLOSURE_LABEL_1%%
- %%DISCLOSURE_LABEL_2%%
- %%DISCLOSURE_LABEL_3%%
- %%DISCLOSURE_LABEL_4%%
- %%DISCLOSURE_SUMMARY%%
- %%DISCLOSURE_UPDATED_NOTE%%
- %%EDITORIAL_BODY_1%%
- %%EDITORIAL_BODY_2%%
- %%EDITORIAL_BODY_3%%
- %%EDITORIAL_BODY_4%%
- %%EDITORIAL_CONTACT_NOTE%%
- %%EDITORIAL_CONTACT_TITLE%%
- %%EDITORIAL_EYEBROW%%
- %%EDITORIAL_H2_1%%
- %%EDITORIAL_H2_2%%
- %%EDITORIAL_H2_3%%
- %%EDITORIAL_H2_4%%
- %%EDITORIAL_LABEL_1%%
- %%EDITORIAL_LABEL_2%%
- %%EDITORIAL_LABEL_3%%
- %%EDITORIAL_LABEL_4%%
- %%EDITORIAL_SUMMARY%%
- %%EDITORIAL_UPDATED_NOTE%%
- %%FOOTER_NOTE%%
- %%GROUP_1_INTRO%%
- %%GROUP_1_LABEL%%
- %%GROUP_1_SHORT%%
- %%GROUP_2_INTRO%%
- %%GROUP_2_LABEL%%
- %%GROUP_2_SHORT%%
- %%GROUP_3_INTRO%%
- %%GROUP_3_LABEL%%
- %%GROUP_3_SHORT%%
- %%GROUP_4_INTRO%%
- %%GROUP_4_LABEL%%
- %%GROUP_4_SHORT%%
- %%HERO_DESCRIPTION%%
- %%HERO_EYEBROW%%
- %%HERO_TITLE%%
- %%HOME_FEATURED_LABEL%%
- %%HOME_LATEST_LABEL%%
- %%INDEPENDENCE_NOTE%%
- %%INDEX_INTRO%%
- %%INDEX_LABEL%%
- %%INDEX_TITLE%%
- %%INVITE_CODE%%
- %%INVITE_LABEL%%
- %%LANG%%
- %%METER_NOTE%%
- %%PRIVACY_BODY_1%%
- %%PRIVACY_BODY_2%%
- %%PRIVACY_BODY_3%%
- %%PRIVACY_BODY_4%%
- %%PRIVACY_CONTACT_NOTE%%
- %%PRIVACY_CONTACT_TITLE%%
- %%PRIVACY_EYEBROW%%
- %%PRIVACY_H2_1%%
- %%PRIVACY_H2_2%%
- %%PRIVACY_H2_3%%
- %%PRIVACY_H2_4%%
- %%PRIVACY_LABEL_1%%
- %%PRIVACY_LABEL_2%%
- %%PRIVACY_LABEL_3%%
- %%PRIVACY_LABEL_4%%
- %%PRIVACY_SUMMARY%%
- %%PRIVACY_UPDATED_NOTE%%
- %%RETURN_NOTE%%
- %%RISK_NOTE%%
- %%RUNDOWN_INTRO%%
- %%RUNDOWN_TITLE%%
- %%SECURITY_EMAIL%%
- %%SECURITY_EXPIRES%%
- %%SEO_TITLE%%
- %%SITE_DESC%%
- %%SITE_DOMAIN%%
- %%SITE_NAME%%
- %%SITE_TAGLINE%%
- %%STATION_ID%%
- %%TOOLS_INTRO%%
- %%TOOLS_LABEL%%
- %%TOOLS_TITLE%%
