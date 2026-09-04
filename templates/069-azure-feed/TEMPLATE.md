# Azure Feed — 天青快讯台完整静态框架

## 范围与原视觉

只制作网站模板。后续 AI 只填写经核实的文字、文章和站点变量，不再搭 UI、页面、组件、工具或资产。不代写注册教程、不部署生产。registrationGuide 仅为检查器兼容字段，指向 outbound-slip 通用推广组件外壳，不指定教程选题。

保留本地侧边播报轨、信号环、置顶动态、横线背景、四项脉冲和门户；首页旧类名和 azure-wire.css 字节保留，signal-room.css 补齐完整框架。动态原包无可复验状态，原包忠实度未核验；本次按用户授权完善本地风格，不冒称忠实复刻。信号图是装饰，不表示直播、事实认证或实时数据。

35 个 HTML：31 个可索引页、独立 404、三个 noindex 旧入口。四条交叉频道每组三篇，十二个不同模块，三种开场及收尾、原生目录和多式问答、七页公开资料俱全。默认 light，可切 deep；存储仅保存主题，不保存输入。桌面固定侧轨可滚动，手机折叠菜单；无 JS 仍可导航阅读。

首页首屏有代码、真实复制、利益点和脚注，无推广 href。仅 outbound-slip 有一个静态推广地址，blank 加 sponsored nofollow noopener noreferrer，邻近代码与披露。Feed 十一项摘要，无代码或链接正文。无跨站导航和生产配置。

## 五工具契约

1. 动态卡分段器：10,000 原始码点、60 张卡、单卡规范化后最多 1,000 码点；280 码点仅为建议线。 先统一换行，再以空白行拆分；每卡 NFKC 与空白折叠后按固定小写键判完全重复，重复指向首次出现卡。

2. 逐行修订对照器：每侧 8,000 原始码点、100 行、每行最多 300 码点；空文本是零行，末尾换行保留空行。 大小写和空格均参与比较，只统一 CRLF/CR 为 LF；最长公共子序列等长时优先删除旧行，再新增新行。

3. UTF-8 字节预算器：文本最多 10,000 码点，可为空；容量为 1–100,000 的十进制整数。 使用 TextEncoder 编码实际控件文本，不修剪、不作 NFKC；原始换行和空白均计入。分行字节不含分隔符，另外列出换行字节。

4. 原文查找定位器：原文 4,000 码点，查找文字 1–100 码点；最多输出原文长度数量的匹配，不截断。 不正则、不忽略大小写、不作 NFKC；位置按 Unicode 码点，从 1 起算。列号不是可见宽度，组合字符会各占位置。

5. 键值字段索引器：10,000 原始码点、120 非空行、60 个不同键；键 1–40 码点、值至多 200 码点，允许空值。 整行 NFKC 后以第一个冒号分割，修剪键与值；键使用固定小写比较，显示首次拼写；重复键的全部值与原始行号保留。

全部读取原始控件值，不经 FormData；先检查原值上限、非法控制字符和不完整 Unicode，再按各自规则处理。除必要换行统一外，不擅自改变精确对照和定位文本。UTF-8 以浏览器控件实际值计量，不代表磁盘文件原编码。输出通过 textContent，无 HTML 解析；完整输出无 20 项截断。修改输入立即清空结果；异步复制由修订号守卫。错误关联字段并聚焦；重置延迟至原生默认动作之后恢复界面。输入不上传、不持久化。

## 后续 AI 接入

变量为 %%UPPER_CASE%%，A1_–A12_ 对应十二篇外壳。保留 af69- 类名、id、data-*、脚本和结构。填写文字即可，不新增 UI，不删来源、作者、边界、目录、FAQ 和披露。BRAND_EN 使用英文或罗马字；BRAND_MARK 建议 1–3 个 ASCII 字符，SIGNAL_MARK 建议不超过 7 个 ASCII 字符，是短装饰标记，不用真实机构图标。首页标题建议 8–16 字、导语 25–60 字；PULSE_n_TEXT 建议 4–12 字的短语，不填长段落或未经证实的数据；脚注自然换行而非截断。

SITE_DOMAIN 仅主机名；AFFILIATE_URL 经核实 HTTPS；SOURCE_URL 经核实 HTTP(S)，禁止脚本协议。HTML 文本、属性及 XML 分别转义；JSON-LD 重新序列化，安全处理小于号和脚本结束片段。日期用 ISO，RSS_DATE 用 RFC 822，SECURITY_EXPIRES 为未来一年内 UTC 时间。状态、时间、作者经历、来源和政策都要查证，不能虚构“已验证”“正在直播”等事实。

十二套 SVG 源与 1200×630 WebP/PNG 封面已备，每篇预加载独立封面。站点 PNG 1200×630，Apple 180×180，ICO 16/32/48。根目录作为网站根；404 的根 base 适配未知深路径，实际服务器必须返回 HTTP 404。后续事实、语种和生产发布由单站流程执行。

## 角色表

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "dispatch-index.html",
  "articles": [
    "dispatches/signal-memo.html",
    "dispatches/source-window.html",
    "dispatches/reading-sequence.html",
    "dispatches/unknown-quadrant.html",
    "dispatches/paired-voices.html",
    "dispatches/reference-table.html",
    "dispatches/inline-notes.html",
    "dispatches/revision-track.html",
    "dispatches/question-exchange.html",
    "dispatches/scope-switchboard.html",
    "dispatches/decision-stack.html",
    "dispatches/outbound-slip.html"
  ],
  "cornerstones": [
    "dispatches/signal-memo.html",
    "dispatches/scope-switchboard.html"
  ],
  "registrationGuide": "dispatches/outbound-slip.html",
  "articleCovers": {
    "dispatches/signal-memo.html": {
      "display": "assets/dispatches/signal-memo.webp",
      "og": "assets/dispatches/signal-memo.png"
    },
    "dispatches/source-window.html": {
      "display": "assets/dispatches/source-window.webp",
      "og": "assets/dispatches/source-window.png"
    },
    "dispatches/reading-sequence.html": {
      "display": "assets/dispatches/reading-sequence.webp",
      "og": "assets/dispatches/reading-sequence.png"
    },
    "dispatches/unknown-quadrant.html": {
      "display": "assets/dispatches/unknown-quadrant.webp",
      "og": "assets/dispatches/unknown-quadrant.png"
    },
    "dispatches/paired-voices.html": {
      "display": "assets/dispatches/paired-voices.webp",
      "og": "assets/dispatches/paired-voices.png"
    },
    "dispatches/reference-table.html": {
      "display": "assets/dispatches/reference-table.webp",
      "og": "assets/dispatches/reference-table.png"
    },
    "dispatches/inline-notes.html": {
      "display": "assets/dispatches/inline-notes.webp",
      "og": "assets/dispatches/inline-notes.png"
    },
    "dispatches/revision-track.html": {
      "display": "assets/dispatches/revision-track.webp",
      "og": "assets/dispatches/revision-track.png"
    },
    "dispatches/question-exchange.html": {
      "display": "assets/dispatches/question-exchange.webp",
      "og": "assets/dispatches/question-exchange.png"
    },
    "dispatches/scope-switchboard.html": {
      "display": "assets/dispatches/scope-switchboard.webp",
      "og": "assets/dispatches/scope-switchboard.png"
    },
    "dispatches/decision-stack.html": {
      "display": "assets/dispatches/decision-stack.webp",
      "og": "assets/dispatches/decision-stack.png"
    },
    "dispatches/outbound-slip.html": {
      "display": "assets/dispatches/outbound-slip.webp",
      "og": "assets/dispatches/outbound-slip.png"
    }
  },
  "categories": [
    {
      "path": "channels/first-reports.html",
      "label": "首发线",
      "articles": [
        "dispatches/signal-memo.html",
        "dispatches/paired-voices.html",
        "dispatches/question-exchange.html"
      ]
    },
    {
      "path": "channels/source-notes.html",
      "label": "来处线",
      "articles": [
        "dispatches/source-window.html",
        "dispatches/reference-table.html",
        "dispatches/scope-switchboard.html"
      ]
    },
    {
      "path": "channels/readout-methods.html",
      "label": "释读线",
      "articles": [
        "dispatches/reading-sequence.html",
        "dispatches/inline-notes.html",
        "dispatches/decision-stack.html"
      ]
    },
    {
      "path": "channels/open-questions.html",
      "label": "留白线",
      "articles": [
        "dispatches/unknown-quadrant.html",
        "dispatches/revision-track.html",
        "dispatches/outbound-slip.html"
      ]
    }
  ],
  "toolIndex": "processor-desk.html",
  "tools": [
    "processors/card-segments.html",
    "processors/line-revision.html",
    "processors/byte-budget.html",
    "processors/literal-locator.html",
    "processors/field-inventory.html"
  ],
  "legal": {
    "about": "public-desk/about.html",
    "contact": "public-desk/contact.html",
    "disclosure": "public-desk/disclosure.html",
    "disclaimer": "public-desk/disclaimer.html",
    "privacy": "public-desk/privacy.html",
    "corrections": "public-desk/corrections.html",
    "editorial": "public-desk/editorial.html"
  },
  "error404": "404.html",
  "robots": "robots.txt",
  "sitemap": "sitemap.xml",
  "feed": "feed.xml",
  "security": ".well-known/security.txt",
  "favicon": "favicon.ico",
  "appleTouchIcon": "apple-touch-icon.png",
  "socialImage": "assets/social-card.png",
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

## 验收

node tools/validate.js templates/069-azure-feed
node tools/audit-template.js templates/069-azure-feed
node tools/audit-workflow-readiness.js templates/069-azure-feed
node tools/check-similarity.js
node tools/qa/069-azure-feed-browser.js

每页 1440/768/390/360 × light/deep 检查；实点代码复制、主题、菜单、筛选、目录、问答、Guide、五工具正常/错误/边界/重置/复制，检查无 JS、真实 404、键盘、对比度与降动效；人工复核首页、十二模块、工具和移动开场。相似度只是差异参考，不能承诺搜索引擎无法关联。

## 变量清单

- `%%A10_BODY_1%%`
- `%%A10_BODY_2%%`
- `%%A10_BODY_3%%`
- `%%A10_BODY_3_MORE%%`
- `%%A10_CHECKED%%`
- `%%A10_CLOSE_TEXT%%`
- `%%A10_CLOSE_TITLE%%`
- `%%A10_COVER_ALT%%`
- `%%A10_COVER_CAPTION%%`
- `%%A10_EYEBROW%%`
- `%%A10_FAQ_A_1%%`
- `%%A10_FAQ_A_2%%`
- `%%A10_FAQ_Q_1%%`
- `%%A10_FAQ_Q_2%%`
- `%%A10_FAQ_TITLE%%`
- `%%A10_H2_1%%`
- `%%A10_H2_2%%`
- `%%A10_H2_3%%`
- `%%A10_INTRO%%`
- `%%A10_MODIFIED%%`
- `%%A10_NOTE_TEXT%%`
- `%%A10_NOTE_TITLE%%`
- `%%A10_PUBLISHED%%`
- `%%A10_RSS_DATE%%`
- `%%A10_SCOPE_1_LABEL%%`
- `%%A10_SCOPE_1_LIMIT%%`
- `%%A10_SCOPE_1_LIMIT_LABEL%%`
- `%%A10_SCOPE_1_TEXT%%`
- `%%A10_SCOPE_2_LABEL%%`
- `%%A10_SCOPE_2_LIMIT%%`
- `%%A10_SCOPE_2_LIMIT_LABEL%%`
- `%%A10_SCOPE_2_TEXT%%`
- `%%A10_SCOPE_3_LABEL%%`
- `%%A10_SCOPE_3_LIMIT%%`
- `%%A10_SCOPE_3_LIMIT_LABEL%%`
- `%%A10_SCOPE_3_TEXT%%`
- `%%A10_SCOPE_INTRO%%`
- `%%A10_SCOPE_TITLE%%`
- `%%A10_SECTION_1_LABEL%%`
- `%%A10_SECTION_2_LABEL%%`
- `%%A10_SECTION_3_LABEL%%`
- `%%A10_SOURCE_LABEL%%`
- `%%A10_SOURCE_URL%%`
- `%%A10_STATUS_LABEL%%`
- `%%A10_SUMMARY%%`
- `%%A10_TITLE%%`
- `%%A11_BODY_1%%`
- `%%A11_BODY_2%%`
- `%%A11_BODY_3%%`
- `%%A11_BODY_3_MORE%%`
- `%%A11_BODY_4%%`
- `%%A11_BODY_4_MORE%%`
- `%%A11_BRANCH_1_LABEL%%`
- `%%A11_BRANCH_1_NOTE%%`
- `%%A11_BRANCH_1_TEXT%%`
- `%%A11_BRANCH_1_TITLE%%`
- `%%A11_BRANCH_2_LABEL%%`
- `%%A11_BRANCH_2_NOTE%%`
- `%%A11_BRANCH_2_TEXT%%`
- `%%A11_BRANCH_2_TITLE%%`
- `%%A11_BRANCH_3_LABEL%%`
- `%%A11_BRANCH_3_NOTE%%`
- `%%A11_BRANCH_3_TEXT%%`
- `%%A11_BRANCH_3_TITLE%%`
- `%%A11_CHECKED%%`
- `%%A11_CLOSE_TEXT%%`
- `%%A11_CLOSE_TITLE%%`
- `%%A11_COVER_ALT%%`
- `%%A11_COVER_CAPTION%%`
- `%%A11_EYEBROW%%`
- `%%A11_FAQ_A_1%%`
- `%%A11_FAQ_A_2%%`
- `%%A11_FAQ_Q_1%%`
- `%%A11_FAQ_Q_2%%`
- `%%A11_FAQ_TITLE%%`
- `%%A11_H2_1%%`
- `%%A11_H2_2%%`
- `%%A11_H2_3%%`
- `%%A11_H2_4%%`
- `%%A11_INTRO%%`
- `%%A11_MODIFIED%%`
- `%%A11_NOTE_TEXT%%`
- `%%A11_NOTE_TITLE%%`
- `%%A11_PUBLISHED%%`
- `%%A11_RSS_DATE%%`
- `%%A11_SECTION_1_LABEL%%`
- `%%A11_SECTION_2_LABEL%%`
- `%%A11_SECTION_3_LABEL%%`
- `%%A11_SECTION_4_LABEL%%`
- `%%A11_SOURCE_LABEL%%`
- `%%A11_SOURCE_URL%%`
- `%%A11_STATUS_LABEL%%`
- `%%A11_STREAM_LABEL%%`
- `%%A11_SUMMARY%%`
- `%%A11_TITLE%%`
- `%%A12_BODY_1%%`
- `%%A12_BODY_2%%`
- `%%A12_BODY_3%%`
- `%%A12_BODY_3_MORE%%`
- `%%A12_CHECKED%%`
- `%%A12_CLOSE_TEXT%%`
- `%%A12_CLOSE_TITLE%%`
- `%%A12_COVER_ALT%%`
- `%%A12_COVER_CAPTION%%`
- `%%A12_EYEBROW%%`
- `%%A12_FAQ_A_1%%`
- `%%A12_FAQ_A_2%%`
- `%%A12_FAQ_Q_1%%`
- `%%A12_FAQ_Q_2%%`
- `%%A12_FAQ_TITLE%%`
- `%%A12_GATE_LABEL%%`
- `%%A12_GATE_TEXT%%`
- `%%A12_GATE_TITLE%%`
- `%%A12_H2_1%%`
- `%%A12_H2_2%%`
- `%%A12_H2_3%%`
- `%%A12_INTRO%%`
- `%%A12_MODIFIED%%`
- `%%A12_NOTE_TEXT%%`
- `%%A12_NOTE_TITLE%%`
- `%%A12_PUBLISHED%%`
- `%%A12_RSS_DATE%%`
- `%%A12_SECTION_1_LABEL%%`
- `%%A12_SECTION_2_LABEL%%`
- `%%A12_SECTION_3_LABEL%%`
- `%%A12_SOURCE_LABEL%%`
- `%%A12_SOURCE_URL%%`
- `%%A12_STATUS_LABEL%%`
- `%%A12_SUMMARY%%`
- `%%A12_TITLE%%`
- `%%A1_BODY_1%%`
- `%%A1_BODY_2%%`
- `%%A1_BODY_3%%`
- `%%A1_BODY_3_MORE%%`
- `%%A1_CHECKED%%`
- `%%A1_CLOSE_TEXT%%`
- `%%A1_CLOSE_TITLE%%`
- `%%A1_COVER_ALT%%`
- `%%A1_COVER_CAPTION%%`
- `%%A1_EYEBROW%%`
- `%%A1_FACT_1_LABEL%%`
- `%%A1_FACT_1_TEXT%%`
- `%%A1_FACT_2_LABEL%%`
- `%%A1_FACT_2_TEXT%%`
- `%%A1_FACT_3_LABEL%%`
- `%%A1_FACT_3_TEXT%%`
- `%%A1_FAQ_A_1%%`
- `%%A1_FAQ_A_2%%`
- `%%A1_FAQ_Q_1%%`
- `%%A1_FAQ_Q_2%%`
- `%%A1_FAQ_TITLE%%`
- `%%A1_H2_1%%`
- `%%A1_H2_2%%`
- `%%A1_H2_3%%`
- `%%A1_INTRO%%`
- `%%A1_MODIFIED%%`
- `%%A1_NOTE_TEXT%%`
- `%%A1_NOTE_TITLE%%`
- `%%A1_PUBLISHED%%`
- `%%A1_SECTION_1_LABEL%%`
- `%%A1_SECTION_2_LABEL%%`
- `%%A1_SECTION_3_LABEL%%`
- `%%A1_SOURCE_LABEL%%`
- `%%A1_SOURCE_URL%%`
- `%%A1_STATUS_LABEL%%`
- `%%A1_STREAM_LABEL%%`
- `%%A1_SUMMARY%%`
- `%%A1_TITLE%%`
- `%%A2_BODY_1%%`
- `%%A2_BODY_2%%`
- `%%A2_BODY_3%%`
- `%%A2_BODY_3_MORE%%`
- `%%A2_BODY_4%%`
- `%%A2_BODY_4_MORE%%`
- `%%A2_CHECKED%%`
- `%%A2_CLOSE_TEXT%%`
- `%%A2_CLOSE_TITLE%%`
- `%%A2_COVER_ALT%%`
- `%%A2_COVER_CAPTION%%`
- `%%A2_EYEBROW%%`
- `%%A2_FAQ_A_1%%`
- `%%A2_FAQ_A_2%%`
- `%%A2_FAQ_Q_1%%`
- `%%A2_FAQ_Q_2%%`
- `%%A2_FAQ_TITLE%%`
- `%%A2_H2_1%%`
- `%%A2_H2_2%%`
- `%%A2_H2_3%%`
- `%%A2_H2_4%%`
- `%%A2_INTRO%%`
- `%%A2_MODIFIED%%`
- `%%A2_NOTE_TEXT%%`
- `%%A2_NOTE_TITLE%%`
- `%%A2_PUBLISHED%%`
- `%%A2_RSS_DATE%%`
- `%%A2_SECTION_1_LABEL%%`
- `%%A2_SECTION_2_LABEL%%`
- `%%A2_SECTION_3_LABEL%%`
- `%%A2_SECTION_4_LABEL%%`
- `%%A2_SOURCE_LABEL%%`
- `%%A2_SOURCE_TEXT%%`
- `%%A2_SOURCE_TITLE%%`
- `%%A2_SOURCE_URL%%`
- `%%A2_STATUS_LABEL%%`
- `%%A2_SUMMARY%%`
- `%%A2_TITLE%%`
- `%%A2_WINDOW_LABEL%%`
- `%%A2_WINDOW_SOURCE_LABEL%%`
- `%%A2_WINDOW_SOURCE_URL%%`
- `%%A2_WINDOW_TEXT%%`
- `%%A2_WINDOW_TITLE%%`
- `%%A3_BODY_1%%`
- `%%A3_BODY_2%%`
- `%%A3_BODY_3%%`
- `%%A3_BODY_3_MORE%%`
- `%%A3_CHECKED%%`
- `%%A3_CLOSE_TEXT%%`
- `%%A3_CLOSE_TITLE%%`
- `%%A3_COVER_ALT%%`
- `%%A3_COVER_CAPTION%%`
- `%%A3_EYEBROW%%`
- `%%A3_FAQ_A_1%%`
- `%%A3_FAQ_A_2%%`
- `%%A3_FAQ_Q_1%%`
- `%%A3_FAQ_Q_2%%`
- `%%A3_FAQ_TITLE%%`
- `%%A3_H2_1%%`
- `%%A3_H2_2%%`
- `%%A3_H2_3%%`
- `%%A3_INTRO%%`
- `%%A3_MODIFIED%%`
- `%%A3_NOTE_TEXT%%`
- `%%A3_NOTE_TITLE%%`
- `%%A3_PUBLISHED%%`
- `%%A3_RSS_DATE%%`
- `%%A3_SECTION_1_LABEL%%`
- `%%A3_SECTION_2_LABEL%%`
- `%%A3_SECTION_3_LABEL%%`
- `%%A3_SOURCE_LABEL%%`
- `%%A3_SOURCE_URL%%`
- `%%A3_STATUS_LABEL%%`
- `%%A3_STEP_1_TEXT%%`
- `%%A3_STEP_1_TITLE%%`
- `%%A3_STEP_2_TEXT%%`
- `%%A3_STEP_2_TITLE%%`
- `%%A3_STEP_3_TEXT%%`
- `%%A3_STEP_3_TITLE%%`
- `%%A3_STEP_4_TEXT%%`
- `%%A3_STEP_4_TITLE%%`
- `%%A3_SUMMARY%%`
- `%%A3_TITLE%%`
- `%%A4_BODY_1%%`
- `%%A4_BODY_2%%`
- `%%A4_BODY_3%%`
- `%%A4_BODY_3_MORE%%`
- `%%A4_CHECKED%%`
- `%%A4_CLOSE_TEXT%%`
- `%%A4_CLOSE_TITLE%%`
- `%%A4_COVER_ALT%%`
- `%%A4_COVER_CAPTION%%`
- `%%A4_EYEBROW%%`
- `%%A4_FAQ_A_1%%`
- `%%A4_FAQ_A_2%%`
- `%%A4_FAQ_Q_1%%`
- `%%A4_FAQ_Q_2%%`
- `%%A4_FAQ_TITLE%%`
- `%%A4_H2_1%%`
- `%%A4_H2_2%%`
- `%%A4_H2_3%%`
- `%%A4_INTRO%%`
- `%%A4_MODIFIED%%`
- `%%A4_NOTE_TEXT%%`
- `%%A4_NOTE_TITLE%%`
- `%%A4_PUBLISHED%%`
- `%%A4_RSS_DATE%%`
- `%%A4_SECTION_1_LABEL%%`
- `%%A4_SECTION_2_LABEL%%`
- `%%A4_SECTION_3_LABEL%%`
- `%%A4_SOURCE_LABEL%%`
- `%%A4_SOURCE_URL%%`
- `%%A4_STATUS_LABEL%%`
- `%%A4_STREAM_LABEL%%`
- `%%A4_SUMMARY%%`
- `%%A4_TITLE%%`
- `%%A4_ZONE_1_LABEL%%`
- `%%A4_ZONE_1_NOTE%%`
- `%%A4_ZONE_1_TEXT%%`
- `%%A4_ZONE_1_TITLE%%`
- `%%A4_ZONE_2_LABEL%%`
- `%%A4_ZONE_2_NOTE%%`
- `%%A4_ZONE_2_TEXT%%`
- `%%A4_ZONE_2_TITLE%%`
- `%%A4_ZONE_3_LABEL%%`
- `%%A4_ZONE_3_NOTE%%`
- `%%A4_ZONE_3_TEXT%%`
- `%%A4_ZONE_3_TITLE%%`
- `%%A4_ZONE_4_LABEL%%`
- `%%A4_ZONE_4_NOTE%%`
- `%%A4_ZONE_4_TEXT%%`
- `%%A4_ZONE_4_TITLE%%`
- `%%A5_BODY_1%%`
- `%%A5_BODY_2%%`
- `%%A5_BODY_3%%`
- `%%A5_BODY_3_MORE%%`
- `%%A5_BODY_4%%`
- `%%A5_BODY_4_MORE%%`
- `%%A5_CHECKED%%`
- `%%A5_CLOSE_TEXT%%`
- `%%A5_CLOSE_TITLE%%`
- `%%A5_COVER_ALT%%`
- `%%A5_COVER_CAPTION%%`
- `%%A5_EYEBROW%%`
- `%%A5_FAQ_A_1%%`
- `%%A5_FAQ_A_2%%`
- `%%A5_FAQ_Q_1%%`
- `%%A5_FAQ_Q_2%%`
- `%%A5_FAQ_TITLE%%`
- `%%A5_H2_1%%`
- `%%A5_H2_2%%`
- `%%A5_H2_3%%`
- `%%A5_H2_4%%`
- `%%A5_INTRO%%`
- `%%A5_MODIFIED%%`
- `%%A5_NOTE_TEXT%%`
- `%%A5_NOTE_TITLE%%`
- `%%A5_PUBLISHED%%`
- `%%A5_QUOTE_1%%`
- `%%A5_QUOTE_1_NOTE%%`
- `%%A5_QUOTE_1_SOURCE%%`
- `%%A5_QUOTE_2%%`
- `%%A5_QUOTE_2_NOTE%%`
- `%%A5_QUOTE_2_SOURCE%%`
- `%%A5_RSS_DATE%%`
- `%%A5_SECTION_1_LABEL%%`
- `%%A5_SECTION_2_LABEL%%`
- `%%A5_SECTION_3_LABEL%%`
- `%%A5_SECTION_4_LABEL%%`
- `%%A5_SOURCE_LABEL%%`
- `%%A5_SOURCE_URL%%`
- `%%A5_STATUS_LABEL%%`
- `%%A5_SUMMARY%%`
- `%%A5_TITLE%%`
- `%%A6_BODY_1%%`
- `%%A6_BODY_2%%`
- `%%A6_BODY_3%%`
- `%%A6_BODY_3_MORE%%`
- `%%A6_CELL_1_2%%`
- `%%A6_CELL_1_3%%`
- `%%A6_CELL_2_2%%`
- `%%A6_CELL_2_3%%`
- `%%A6_CELL_3_2%%`
- `%%A6_CELL_3_3%%`
- `%%A6_CELL_4_2%%`
- `%%A6_CELL_4_3%%`
- `%%A6_CHECKED%%`
- `%%A6_CLOSE_TEXT%%`
- `%%A6_CLOSE_TITLE%%`
- `%%A6_COL_1%%`
- `%%A6_COL_2%%`
- `%%A6_COL_3%%`
- `%%A6_COVER_ALT%%`
- `%%A6_COVER_CAPTION%%`
- `%%A6_EYEBROW%%`
- `%%A6_FAQ_A_1%%`
- `%%A6_FAQ_A_2%%`
- `%%A6_FAQ_Q_1%%`
- `%%A6_FAQ_Q_2%%`
- `%%A6_FAQ_TITLE%%`
- `%%A6_H2_1%%`
- `%%A6_H2_2%%`
- `%%A6_H2_3%%`
- `%%A6_INTRO%%`
- `%%A6_MODIFIED%%`
- `%%A6_NOTE_TEXT%%`
- `%%A6_NOTE_TITLE%%`
- `%%A6_PUBLISHED%%`
- `%%A6_ROW_1%%`
- `%%A6_ROW_2%%`
- `%%A6_ROW_3%%`
- `%%A6_ROW_4%%`
- `%%A6_RSS_DATE%%`
- `%%A6_SECTION_1_LABEL%%`
- `%%A6_SECTION_2_LABEL%%`
- `%%A6_SECTION_3_LABEL%%`
- `%%A6_SOURCE_LABEL%%`
- `%%A6_SOURCE_URL%%`
- `%%A6_STATUS_LABEL%%`
- `%%A6_STREAM_LABEL%%`
- `%%A6_SUMMARY%%`
- `%%A6_TABLE_CAPTION%%`
- `%%A6_TABLE_LABEL%%`
- `%%A6_TITLE%%`
- `%%A7_ANNOTATION_1_LABEL%%`
- `%%A7_ANNOTATION_1_TEXT%%`
- `%%A7_ANNOTATION_2_LABEL%%`
- `%%A7_ANNOTATION_2_TEXT%%`
- `%%A7_ANNOTATION_3_LABEL%%`
- `%%A7_ANNOTATION_3_TEXT%%`
- `%%A7_BODY_1%%`
- `%%A7_BODY_2%%`
- `%%A7_BODY_3%%`
- `%%A7_BODY_3_MORE%%`
- `%%A7_CHECKED%%`
- `%%A7_CLOSE_TEXT%%`
- `%%A7_CLOSE_TITLE%%`
- `%%A7_COVER_ALT%%`
- `%%A7_COVER_CAPTION%%`
- `%%A7_EXCERPT_1%%`
- `%%A7_EXCERPT_2%%`
- `%%A7_EXCERPT_MARK%%`
- `%%A7_EXCERPT_TITLE%%`
- `%%A7_EYEBROW%%`
- `%%A7_FAQ_A_1%%`
- `%%A7_FAQ_A_2%%`
- `%%A7_FAQ_Q_1%%`
- `%%A7_FAQ_Q_2%%`
- `%%A7_FAQ_TITLE%%`
- `%%A7_H2_1%%`
- `%%A7_H2_2%%`
- `%%A7_H2_3%%`
- `%%A7_INTRO%%`
- `%%A7_MODIFIED%%`
- `%%A7_NOTE_TEXT%%`
- `%%A7_NOTE_TITLE%%`
- `%%A7_PUBLISHED%%`
- `%%A7_RSS_DATE%%`
- `%%A7_SECTION_1_LABEL%%`
- `%%A7_SECTION_2_LABEL%%`
- `%%A7_SECTION_3_LABEL%%`
- `%%A7_SOURCE_LABEL%%`
- `%%A7_SOURCE_URL%%`
- `%%A7_STATUS_LABEL%%`
- `%%A7_SUMMARY%%`
- `%%A7_TITLE%%`
- `%%A8_BODY_1%%`
- `%%A8_BODY_2%%`
- `%%A8_BODY_3%%`
- `%%A8_BODY_3_MORE%%`
- `%%A8_BODY_4%%`
- `%%A8_BODY_4_MORE%%`
- `%%A8_CHECKED%%`
- `%%A8_CLOSE_TEXT%%`
- `%%A8_CLOSE_TITLE%%`
- `%%A8_COVER_ALT%%`
- `%%A8_COVER_CAPTION%%`
- `%%A8_EYEBROW%%`
- `%%A8_FAQ_A_1%%`
- `%%A8_FAQ_A_2%%`
- `%%A8_FAQ_Q_1%%`
- `%%A8_FAQ_Q_2%%`
- `%%A8_FAQ_TITLE%%`
- `%%A8_H2_1%%`
- `%%A8_H2_2%%`
- `%%A8_H2_3%%`
- `%%A8_H2_4%%`
- `%%A8_INTRO%%`
- `%%A8_MODIFIED%%`
- `%%A8_NOTE_TEXT%%`
- `%%A8_NOTE_TITLE%%`
- `%%A8_PUBLISHED%%`
- `%%A8_REVISION_1_LABEL%%`
- `%%A8_REVISION_1_NOTE%%`
- `%%A8_REVISION_1_TEXT%%`
- `%%A8_REVISION_1_TITLE%%`
- `%%A8_REVISION_2_LABEL%%`
- `%%A8_REVISION_2_NOTE%%`
- `%%A8_REVISION_2_TEXT%%`
- `%%A8_REVISION_2_TITLE%%`
- `%%A8_REVISION_3_LABEL%%`
- `%%A8_REVISION_3_NOTE%%`
- `%%A8_REVISION_3_TEXT%%`
- `%%A8_REVISION_3_TITLE%%`
- `%%A8_RSS_DATE%%`
- `%%A8_SECTION_1_LABEL%%`
- `%%A8_SECTION_2_LABEL%%`
- `%%A8_SECTION_3_LABEL%%`
- `%%A8_SECTION_4_LABEL%%`
- `%%A8_SOURCE_LABEL%%`
- `%%A8_SOURCE_URL%%`
- `%%A8_STATUS_LABEL%%`
- `%%A8_SUMMARY%%`
- `%%A8_TITLE%%`
- `%%A9_ANSWER_1%%`
- `%%A9_ANSWER_1_NOTE%%`
- `%%A9_ANSWER_2%%`
- `%%A9_ANSWER_2_NOTE%%`
- `%%A9_ANSWER_3%%`
- `%%A9_ANSWER_3_NOTE%%`
- `%%A9_BODY_1%%`
- `%%A9_BODY_2%%`
- `%%A9_BODY_3%%`
- `%%A9_BODY_3_MORE%%`
- `%%A9_CHECKED%%`
- `%%A9_CLOSE_TEXT%%`
- `%%A9_CLOSE_TITLE%%`
- `%%A9_COVER_ALT%%`
- `%%A9_COVER_CAPTION%%`
- `%%A9_EYEBROW%%`
- `%%A9_FAQ_A_1%%`
- `%%A9_FAQ_A_2%%`
- `%%A9_FAQ_Q_1%%`
- `%%A9_FAQ_Q_2%%`
- `%%A9_FAQ_TITLE%%`
- `%%A9_H2_1%%`
- `%%A9_H2_2%%`
- `%%A9_H2_3%%`
- `%%A9_INTRO%%`
- `%%A9_MODIFIED%%`
- `%%A9_NOTE_TEXT%%`
- `%%A9_NOTE_TITLE%%`
- `%%A9_PUBLISHED%%`
- `%%A9_QUESTION_1%%`
- `%%A9_QUESTION_1_LABEL%%`
- `%%A9_QUESTION_2%%`
- `%%A9_QUESTION_2_LABEL%%`
- `%%A9_QUESTION_3%%`
- `%%A9_QUESTION_3_LABEL%%`
- `%%A9_RSS_DATE%%`
- `%%A9_SECTION_1_LABEL%%`
- `%%A9_SECTION_2_LABEL%%`
- `%%A9_SECTION_3_LABEL%%`
- `%%A9_SOURCE_LABEL%%`
- `%%A9_SOURCE_URL%%`
- `%%A9_STATUS_LABEL%%`
- `%%A9_SUMMARY%%`
- `%%A9_TITLE%%`
- `%%ABOUT_CONTACT_TEXT%%`
- `%%ABOUT_CONTACT_TITLE%%`
- `%%ABOUT_H2_1%%`
- `%%ABOUT_H2_2%%`
- `%%ABOUT_H2_3%%`
- `%%ABOUT_H2_4%%`
- `%%ABOUT_INTRO%%`
- `%%ABOUT_LABEL%%`
- `%%ABOUT_TEXT_1%%`
- `%%ABOUT_TEXT_2%%`
- `%%ABOUT_TEXT_3%%`
- `%%ABOUT_TEXT_4%%`
- `%%ABOUT_UPDATED%%`
- `%%AFFILIATE_DISCLOSURE%%`
- `%%AFFILIATE_LABEL%%`
- `%%AFFILIATE_NOTE%%`
- `%%AFFILIATE_URL%%`
- `%%ARCHIVE_INTRO%%`
- `%%ARCHIVE_LABEL%%`
- `%%ARCHIVE_TITLE%%`
- `%%AUTHOR_BIO%%`
- `%%AUTHOR_NAME%%`
- `%%BENEFIT_DISCLAIMER%%`
- `%%BENEFIT_RATE%%`
- `%%BRAND_EN%%`
- `%%BRAND_LINE%%`
- `%%BRAND_MARK%%`
- `%%BRIEF_TEXT%%`
- `%%BRIEF_TITLE%%`
- `%%CHANNELS_INTRO%%`
- `%%CHANNELS_LABEL%%`
- `%%CHANNELS_TITLE%%`
- `%%CHANNEL_1_INTRO%%`
- `%%CHANNEL_1_LABEL%%`
- `%%CHANNEL_1_NOTE%%`
- `%%CHANNEL_1_NOTE_TITLE%%`
- `%%CHANNEL_2_INTRO%%`
- `%%CHANNEL_2_LABEL%%`
- `%%CHANNEL_2_NOTE%%`
- `%%CHANNEL_2_NOTE_TITLE%%`
- `%%CHANNEL_3_INTRO%%`
- `%%CHANNEL_3_LABEL%%`
- `%%CHANNEL_3_NOTE%%`
- `%%CHANNEL_3_NOTE_TITLE%%`
- `%%CHANNEL_4_INTRO%%`
- `%%CHANNEL_4_LABEL%%`
- `%%CHANNEL_4_NOTE%%`
- `%%CHANNEL_4_NOTE_TITLE%%`
- `%%CONTACT_CONTACT_TEXT%%`
- `%%CONTACT_CONTACT_TITLE%%`
- `%%CONTACT_EMAIL%%`
- `%%CONTACT_H2_1%%`
- `%%CONTACT_H2_2%%`
- `%%CONTACT_H2_3%%`
- `%%CONTACT_H2_4%%`
- `%%CONTACT_INTRO%%`
- `%%CONTACT_LABEL%%`
- `%%CONTACT_TEXT_1%%`
- `%%CONTACT_TEXT_2%%`
- `%%CONTACT_TEXT_3%%`
- `%%CONTACT_TEXT_4%%`
- `%%CONTACT_UPDATED%%`
- `%%CORRECTIONS_CONTACT_TEXT%%`
- `%%CORRECTIONS_CONTACT_TITLE%%`
- `%%CORRECTIONS_H2_1%%`
- `%%CORRECTIONS_H2_2%%`
- `%%CORRECTIONS_H2_3%%`
- `%%CORRECTIONS_H2_4%%`
- `%%CORRECTIONS_INTRO%%`
- `%%CORRECTIONS_LABEL%%`
- `%%CORRECTIONS_TEXT_1%%`
- `%%CORRECTIONS_TEXT_2%%`
- `%%CORRECTIONS_TEXT_3%%`
- `%%CORRECTIONS_TEXT_4%%`
- `%%CORRECTIONS_UPDATED%%`
- `%%DISCLAIMER_CONTACT_TEXT%%`
- `%%DISCLAIMER_CONTACT_TITLE%%`
- `%%DISCLAIMER_H2_1%%`
- `%%DISCLAIMER_H2_2%%`
- `%%DISCLAIMER_H2_3%%`
- `%%DISCLAIMER_H2_4%%`
- `%%DISCLAIMER_INTRO%%`
- `%%DISCLAIMER_LABEL%%`
- `%%DISCLAIMER_TEXT_1%%`
- `%%DISCLAIMER_TEXT_2%%`
- `%%DISCLAIMER_TEXT_3%%`
- `%%DISCLAIMER_TEXT_4%%`
- `%%DISCLAIMER_UPDATED%%`
- `%%DISCLOSURE_CONTACT_TEXT%%`
- `%%DISCLOSURE_CONTACT_TITLE%%`
- `%%DISCLOSURE_H2_1%%`
- `%%DISCLOSURE_H2_2%%`
- `%%DISCLOSURE_H2_3%%`
- `%%DISCLOSURE_H2_4%%`
- `%%DISCLOSURE_INTRO%%`
- `%%DISCLOSURE_LABEL%%`
- `%%DISCLOSURE_TEXT_1%%`
- `%%DISCLOSURE_TEXT_2%%`
- `%%DISCLOSURE_TEXT_3%%`
- `%%DISCLOSURE_TEXT_4%%`
- `%%DISCLOSURE_UPDATED%%`
- `%%EDITORIAL_CONTACT_TEXT%%`
- `%%EDITORIAL_CONTACT_TITLE%%`
- `%%EDITORIAL_H2_1%%`
- `%%EDITORIAL_H2_2%%`
- `%%EDITORIAL_H2_3%%`
- `%%EDITORIAL_H2_4%%`
- `%%EDITORIAL_INTRO%%`
- `%%EDITORIAL_LABEL%%`
- `%%EDITORIAL_TEXT_1%%`
- `%%EDITORIAL_TEXT_2%%`
- `%%EDITORIAL_TEXT_3%%`
- `%%EDITORIAL_TEXT_4%%`
- `%%EDITORIAL_UPDATED%%`
- `%%HERO_DESCRIPTION%%`
- `%%HERO_EYEBROW%%`
- `%%HERO_TITLE%%`
- `%%HOME_FEATURED_LABEL%%`
- `%%HOME_LATEST_LABEL%%`
- `%%HOME_LINKS_LABEL%%`
- `%%INDEPENDENCE_NOTE%%`
- `%%INVITE_CODE%%`
- `%%INVITE_LABEL%%`
- `%%LANG%%`
- `%%PINNED_LABEL%%`
- `%%PRIVACY_CONTACT_TEXT%%`
- `%%PRIVACY_CONTACT_TITLE%%`
- `%%PRIVACY_H2_1%%`
- `%%PRIVACY_H2_2%%`
- `%%PRIVACY_H2_3%%`
- `%%PRIVACY_H2_4%%`
- `%%PRIVACY_INTRO%%`
- `%%PRIVACY_LABEL%%`
- `%%PRIVACY_TEXT_1%%`
- `%%PRIVACY_TEXT_2%%`
- `%%PRIVACY_TEXT_3%%`
- `%%PRIVACY_TEXT_4%%`
- `%%PRIVACY_UPDATED%%`
- `%%PROCESSORS_INTRO%%`
- `%%PROCESSORS_LABEL%%`
- `%%PROCESSORS_TITLE%%`
- `%%PULSE_1_LABEL%%`
- `%%PULSE_1_TEXT%%`
- `%%PULSE_2_LABEL%%`
- `%%PULSE_2_TEXT%%`
- `%%PULSE_3_LABEL%%`
- `%%PULSE_3_TEXT%%`
- `%%PULSE_4_LABEL%%`
- `%%PULSE_4_TEXT%%`
- `%%RAIL_LABEL%%`
- `%%RAIL_NOTE%%`
- `%%RISK_NOTE%%`
- `%%SECURITY_EMAIL%%`
- `%%SECURITY_EXPIRES%%`
- `%%SEO_TITLE%%`
- `%%SIGNAL_LABEL%%`
- `%%SIGNAL_MARK%%`
- `%%SITE_DESC%%`
- `%%SITE_DOMAIN%%`
- `%%SITE_NAME%%`
- `%%SITE_TAGLINE%%`
- `%%STREAM_INTRO%%`
- `%%STREAM_TITLE%%`
- `%%TOPLINE_LABEL%%`
