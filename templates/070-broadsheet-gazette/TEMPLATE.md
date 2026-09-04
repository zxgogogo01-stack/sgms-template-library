# Broadsheet Gazette · 对开公报完整框架

## 范围与视觉

仅制作网站模板，不代写文章或注册教程，不部署。后续 AI 只填经核实的文字、文章与变量，不再补 UI、页面、组件、工具或资产。registrationGuide 是检查器兼容字段，指向通用推广组件外壳 colophon-slip，不指定教程选题。

保留本地大报刊头、头条与校样环、三席编辑台、新闻线、双线分栏和门户，首页全部旧类名及 broadsheet.css 字节保留；press-layout.css 扩展完整版面。动态原包缺少可复验材料，原包忠实度未核验；本轮按用户授权完善本地风格，不声称忠实复刻。

34 个 HTML：30 个可索引页、独立 404、三个 noindex 旧入口。三版各四篇、十二种正文组件、三式开场/收尾与多式原生目录问答；七页公示与十二套独立封面齐全。默认 ink 黑白纸版，可切 sepia 深棕版；仅保存主题。无 JavaScript 可导航阅读，处理按钮禁用。

首页首屏为代码真复制、利益点与脚注，不含推广 href。仅第十二篇有一个静态推广 href，带 blank 与 sponsored nofollow noopener noreferrer，紧邻代码和披露。九条 Feed 摘要无代码与正文链接。新闻线不写死时间和假实时状态。

## 工具契约

1. 引语归属清单：10,000 原始码点、100 条记录；说话者 1–40 码点，引语 1–500 码点。 每行必须且只能含一个竖线，左边为说话者、右边为引语。先 NFKC 并修剪两端，不折叠引语内部空白。 说话者与引语各按固定小写比较。重复引语指向首次记录，跨人重复相对于该首次说话者计算。 保留全部 100 条的引语正文、归属与原始行号；重复不代表错误归属或抄袭。

2. 等格分栏编排器：10,000 原始码点、100 非空段、每段最多 800 码点；每行 10–80 格，每栏 5–100 行。 每个非空输入行视为一段；NFKC、两端修剪、内部连续空白折叠成一个空格。 每个 Unicode 码点抽象为一格，从左至右硬换行；段间可选零或一空行，空行也占栏高。按固定栏高连续分栏，末栏不补空行。 这是抽象等格模型，不测量字形、字距或真实 CSS 布局，不能代替浏览器或印刷排版。

3. 书帖配页推演器：内容页数 1–256；每帖容量仅 4、8、16 或 32 页；末帖按四页补齐。 以左侧装订的逻辑页序推演。每帖最多所选页数，末帖向上补为四的倍数。空白仅出现在内容页之后。 由外至内逐张列出正面左/右与反面左/右；第一帖四页时正面为 4|1，反面为 2|3。 只提供逻辑页对，不决定纸张旋转、双面翻转或打印机设置；实际输出必须用测试纸验证。

4. 成对引号核对器：文本最多 10,000 码点，最多 1,000 个受检引号；ASCII 单双引号不参与。 受检五组为 “ ”、‘ ’、「 」、『 』、《 》。按 Unicode 码点扫描，位置与行列从 1 起算。 左符号入栈；右符号与最近未配对左符号配对。类型不符记交叉错误并消耗双方；没有左符号记孤立右符号；末尾剩余记未闭合。 这里只检查符号结构，不判断引用事实、中文文风或语义；不会处理 ASCII 引号和转义语法。

5. 页码覆盖检查器：100 条范围，页码与总页数均为 1–500；输入最多 10,000 码点。 每行填写一个页码或闭区间，例如 3 或 5-9。整行 NFKC 后修剪，允许连字符两侧空格。 所有范围必须落在 1 到总页数内；逐页累计覆盖，重叠页会列出全部原始输入行号。 报告列出完整缺页、重叠页、连续范围摘要和所有输入范围；重复覆盖未必是出版错误。

全部直接读取实际控件值，原值先检查码点上限、非法控制字符与不完整 Unicode，再规范化；逐行协议保留原始行号。引号核对不规范化、不改变大小写或空白。报告全部 textContent 输出，不解析 HTML、不截断条目；修改即清空、复制有修订号守卫、错误关联字段并聚焦、重置遵循原生默认动作之后的时序。输入不上网、不持久化。

## 文字与变量接入

使用 %%UPPER_CASE%%；A1_–A12_ 为十二篇。只替换文字与变量，保留 bg70- 类名、id、data-*、样式、脚本与路径。BRAND_EN 必须为英文或罗马字，建议 10–24 字符；PLATE_MARK 建议 1–3 个 ASCII 字符。首页标题建议 8–16 字、导语 25–55 字，首屏利益与脚注建议短句；长段落放正文。A5_TIME_n 用已核实的短时间标签或阶段短语，建议 2–12 字，不填整段说明。不要用真实机构标志、虚构状态、作者经历或未经核实的利益数字。

SITE_DOMAIN 仅主机名；AFFILIATE_URL 为经核实的 HTTPS，SOURCE_URL 为核实的 HTTP(S)，拒绝脚本协议。HTML 文本/属性/XML 分别转义；JSON-LD 重新安全序列化，处理小于号与脚本结束片段。日期使用 ISO；RSS_DATE 使用 RFC 822；SECURITY_EXPIRES 为未来一年内 UTC 时间。

十二个 SVG 源与 1200×630 PNG/WebP 封面已备，每篇预加载各自 WebP，PNG 用于 OG；站点社交 PNG 1200×630，Apple 180×180，ICO 16/32/48。根目录作为网站根，404 根 base 适配未知深路径，实际服务器仍须返回 HTTP 404。生产与事实审计留给单站流程。

## 角色表

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "report-index.html",
  "articles": [
    "reports/lead-brief.html",
    "reports/source-dossier.html",
    "reports/witness-column.html",
    "reports/evidence-grid.html",
    "reports/timeline-column.html",
    "reports/paired-dispatch.html",
    "reports/margin-ledger.html",
    "reports/method-strip.html",
    "reports/crosshead-notes.html",
    "reports/correction-proof.html",
    "reports/reader-exchange.html",
    "reports/colophon-slip.html"
  ],
  "cornerstones": [
    "reports/lead-brief.html",
    "reports/method-strip.html"
  ],
  "registrationGuide": "reports/colophon-slip.html",
  "articleCovers": {
    "reports/lead-brief.html": {
      "display": "assets/plates/lead-brief.webp",
      "og": "assets/plates/lead-brief.png"
    },
    "reports/source-dossier.html": {
      "display": "assets/plates/source-dossier.webp",
      "og": "assets/plates/source-dossier.png"
    },
    "reports/witness-column.html": {
      "display": "assets/plates/witness-column.webp",
      "og": "assets/plates/witness-column.png"
    },
    "reports/evidence-grid.html": {
      "display": "assets/plates/evidence-grid.webp",
      "og": "assets/plates/evidence-grid.png"
    },
    "reports/timeline-column.html": {
      "display": "assets/plates/timeline-column.webp",
      "og": "assets/plates/timeline-column.png"
    },
    "reports/paired-dispatch.html": {
      "display": "assets/plates/paired-dispatch.webp",
      "og": "assets/plates/paired-dispatch.png"
    },
    "reports/margin-ledger.html": {
      "display": "assets/plates/margin-ledger.webp",
      "og": "assets/plates/margin-ledger.png"
    },
    "reports/method-strip.html": {
      "display": "assets/plates/method-strip.webp",
      "og": "assets/plates/method-strip.png"
    },
    "reports/crosshead-notes.html": {
      "display": "assets/plates/crosshead-notes.webp",
      "og": "assets/plates/crosshead-notes.png"
    },
    "reports/correction-proof.html": {
      "display": "assets/plates/correction-proof.webp",
      "og": "assets/plates/correction-proof.png"
    },
    "reports/reader-exchange.html": {
      "display": "assets/plates/reader-exchange.webp",
      "og": "assets/plates/reader-exchange.png"
    },
    "reports/colophon-slip.html": {
      "display": "assets/plates/colophon-slip.webp",
      "og": "assets/plates/colophon-slip.png"
    }
  },
  "categories": [
    {
      "path": "editions/field-desk.html",
      "label": "采写版",
      "articles": [
        "reports/lead-brief.html",
        "reports/witness-column.html",
        "reports/timeline-column.html",
        "reports/crosshead-notes.html"
      ]
    },
    {
      "path": "editions/proof-desk.html",
      "label": "核对版",
      "articles": [
        "reports/source-dossier.html",
        "reports/evidence-grid.html",
        "reports/method-strip.html",
        "reports/correction-proof.html"
      ]
    },
    {
      "path": "editions/reader-desk.html",
      "label": "读者版",
      "articles": [
        "reports/paired-dispatch.html",
        "reports/margin-ledger.html",
        "reports/reader-exchange.html",
        "reports/colophon-slip.html"
      ]
    }
  ],
  "toolIndex": "press-room.html",
  "tools": [
    "press-tools/quote-attribution.html",
    "press-tools/column-flow.html",
    "press-tools/signature-imposition.html",
    "press-tools/quotation-balance.html",
    "press-tools/page-coverage.html"
  ],
  "legal": {
    "about": "public-notices/about.html",
    "contact": "public-notices/contact.html",
    "disclosure": "public-notices/disclosure.html",
    "disclaimer": "public-notices/disclaimer.html",
    "privacy": "public-notices/privacy.html",
    "corrections": "public-notices/corrections.html",
    "editorial": "public-notices/editorial.html"
  },
  "error404": "404.html",
  "robots": "robots.txt",
  "sitemap": "sitemap.xml",
  "feed": "feed.xml",
  "security": ".well-known/security.txt",
  "favicon": "favicon.ico",
  "appleTouchIcon": "apple-touch-icon.png",
  "socialImage": "assets/press-card.png",
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

## 完整变量登记

- `%%A10_AFTER_LABEL%%`
- `%%A10_AFTER_TEXT%%`
- `%%A10_BEFORE_LABEL%%`
- `%%A10_BEFORE_TEXT%%`
- `%%A10_CAVEAT_LABEL%%`
- `%%A10_CAVEAT_TEXT%%`
- `%%A10_CHECKED%%`
- `%%A10_CORRECTION_NOTE%%`
- `%%A10_CORRECTION_SOURCE%%`
- `%%A10_COVER_ALT%%`
- `%%A10_COVER_CAPTION%%`
- `%%A10_END_TEXT%%`
- `%%A10_END_TITLE%%`
- `%%A10_EYEBROW%%`
- `%%A10_FAQ_A_1%%`
- `%%A10_FAQ_A_2%%`
- `%%A10_FAQ_A_3%%`
- `%%A10_FAQ_Q_1%%`
- `%%A10_FAQ_Q_2%%`
- `%%A10_FAQ_Q_3%%`
- `%%A10_FAQ_TITLE%%`
- `%%A10_H2_1%%`
- `%%A10_H2_2%%`
- `%%A10_H2_3%%`
- `%%A10_H2_4%%`
- `%%A10_MODIFIED%%`
- `%%A10_PUBLISHED%%`
- `%%A10_READING_NOTE%%`
- `%%A10_RSS_DATE%%`
- `%%A10_SECOND_QUOTE%%`
- `%%A10_SOURCE_LABEL%%`
- `%%A10_SOURCE_NOTE%%`
- `%%A10_SOURCE_URL%%`
- `%%A10_SUMMARY%%`
- `%%A10_TEXT_1%%`
- `%%A10_TEXT_2%%`
- `%%A10_TEXT_3%%`
- `%%A10_TEXT_4%%`
- `%%A10_TITLE%%`
- `%%A11_CAVEAT_LABEL%%`
- `%%A11_CAVEAT_TEXT%%`
- `%%A11_CHECKED%%`
- `%%A11_COVER_ALT%%`
- `%%A11_COVER_CAPTION%%`
- `%%A11_END_TEXT%%`
- `%%A11_END_TITLE%%`
- `%%A11_EYEBROW%%`
- `%%A11_FAQ_A_1%%`
- `%%A11_FAQ_A_2%%`
- `%%A11_FAQ_A_3%%`
- `%%A11_FAQ_Q_1%%`
- `%%A11_FAQ_Q_2%%`
- `%%A11_FAQ_Q_3%%`
- `%%A11_FAQ_TITLE%%`
- `%%A11_H2_1%%`
- `%%A11_H2_2%%`
- `%%A11_H2_3%%`
- `%%A11_H2_4%%`
- `%%A11_MODIFIED%%`
- `%%A11_PUBLISHED%%`
- `%%A11_READER_A_1%%`
- `%%A11_READER_A_2%%`
- `%%A11_READER_A_3%%`
- `%%A11_READER_Q_1%%`
- `%%A11_READER_Q_2%%`
- `%%A11_READER_Q_3%%`
- `%%A11_READING_NOTE%%`
- `%%A11_RSS_DATE%%`
- `%%A11_SECOND_QUOTE%%`
- `%%A11_SOURCE_LABEL%%`
- `%%A11_SOURCE_NOTE%%`
- `%%A11_SOURCE_URL%%`
- `%%A11_SUMMARY%%`
- `%%A11_TEXT_1%%`
- `%%A11_TEXT_2%%`
- `%%A11_TEXT_3%%`
- `%%A11_TEXT_4%%`
- `%%A11_TITLE%%`
- `%%A12_CAVEAT_LABEL%%`
- `%%A12_CAVEAT_TEXT%%`
- `%%A12_CHECKED%%`
- `%%A12_COVER_ALT%%`
- `%%A12_COVER_CAPTION%%`
- `%%A12_END_TEXT%%`
- `%%A12_END_TITLE%%`
- `%%A12_EYEBROW%%`
- `%%A12_FAQ_A_1%%`
- `%%A12_FAQ_A_2%%`
- `%%A12_FAQ_A_3%%`
- `%%A12_FAQ_Q_1%%`
- `%%A12_FAQ_Q_2%%`
- `%%A12_FAQ_Q_3%%`
- `%%A12_FAQ_TITLE%%`
- `%%A12_H2_1%%`
- `%%A12_H2_2%%`
- `%%A12_H2_3%%`
- `%%A12_H2_4%%`
- `%%A12_MODIFIED%%`
- `%%A12_PUBLISHED%%`
- `%%A12_READING_NOTE%%`
- `%%A12_SECOND_QUOTE%%`
- `%%A12_SLIP_HEAD%%`
- `%%A12_SLIP_LABEL%%`
- `%%A12_SLIP_TEXT%%`
- `%%A12_SOURCE_LABEL%%`
- `%%A12_SOURCE_NOTE%%`
- `%%A12_SOURCE_URL%%`
- `%%A12_SUMMARY%%`
- `%%A12_TEXT_1%%`
- `%%A12_TEXT_2%%`
- `%%A12_TEXT_3%%`
- `%%A12_TEXT_4%%`
- `%%A12_TITLE%%`
- `%%A1_BRIEF_LABEL_1%%`
- `%%A1_BRIEF_LABEL_2%%`
- `%%A1_BRIEF_LABEL_3%%`
- `%%A1_BRIEF_TEXT_1%%`
- `%%A1_BRIEF_TEXT_2%%`
- `%%A1_BRIEF_TEXT_3%%`
- `%%A1_CAVEAT_LABEL%%`
- `%%A1_CAVEAT_TEXT%%`
- `%%A1_CHECKED%%`
- `%%A1_COVER_ALT%%`
- `%%A1_COVER_CAPTION%%`
- `%%A1_END_TEXT%%`
- `%%A1_END_TITLE%%`
- `%%A1_EYEBROW%%`
- `%%A1_FAQ_A_1%%`
- `%%A1_FAQ_A_2%%`
- `%%A1_FAQ_A_3%%`
- `%%A1_FAQ_Q_1%%`
- `%%A1_FAQ_Q_2%%`
- `%%A1_FAQ_Q_3%%`
- `%%A1_FAQ_TITLE%%`
- `%%A1_H2_1%%`
- `%%A1_H2_2%%`
- `%%A1_H2_3%%`
- `%%A1_H2_4%%`
- `%%A1_MODIFIED%%`
- `%%A1_PUBLISHED%%`
- `%%A1_READING_NOTE%%`
- `%%A1_RSS_DATE%%`
- `%%A1_SECOND_QUOTE%%`
- `%%A1_SOURCE_LABEL%%`
- `%%A1_SOURCE_NOTE%%`
- `%%A1_SOURCE_URL%%`
- `%%A1_SUMMARY%%`
- `%%A1_TEXT_1%%`
- `%%A1_TEXT_2%%`
- `%%A1_TEXT_3%%`
- `%%A1_TEXT_4%%`
- `%%A1_TITLE%%`
- `%%A2_CAVEAT_LABEL%%`
- `%%A2_CAVEAT_TEXT%%`
- `%%A2_CHECKED%%`
- `%%A2_COVER_ALT%%`
- `%%A2_COVER_CAPTION%%`
- `%%A2_END_TEXT%%`
- `%%A2_END_TITLE%%`
- `%%A2_EYEBROW%%`
- `%%A2_FAQ_A_1%%`
- `%%A2_FAQ_A_2%%`
- `%%A2_FAQ_A_3%%`
- `%%A2_FAQ_Q_1%%`
- `%%A2_FAQ_Q_2%%`
- `%%A2_FAQ_Q_3%%`
- `%%A2_FAQ_TITLE%%`
- `%%A2_H2_1%%`
- `%%A2_H2_2%%`
- `%%A2_H2_3%%`
- `%%A2_H2_4%%`
- `%%A2_MODIFIED%%`
- `%%A2_PUBLISHED%%`
- `%%A2_READING_NOTE%%`
- `%%A2_RSS_DATE%%`
- `%%A2_SECOND_QUOTE%%`
- `%%A2_SOURCE_HEAD_1%%`
- `%%A2_SOURCE_HEAD_2%%`
- `%%A2_SOURCE_HEAD_3%%`
- `%%A2_SOURCE_LABEL%%`
- `%%A2_SOURCE_NOTE%%`
- `%%A2_SOURCE_NOTE_1%%`
- `%%A2_SOURCE_NOTE_2%%`
- `%%A2_SOURCE_NOTE_3%%`
- `%%A2_SOURCE_TEXT_1%%`
- `%%A2_SOURCE_TEXT_2%%`
- `%%A2_SOURCE_TEXT_3%%`
- `%%A2_SOURCE_URL%%`
- `%%A2_SUMMARY%%`
- `%%A2_TEXT_1%%`
- `%%A2_TEXT_2%%`
- `%%A2_TEXT_3%%`
- `%%A2_TEXT_4%%`
- `%%A2_TITLE%%`
- `%%A3_CAVEAT_LABEL%%`
- `%%A3_CAVEAT_TEXT%%`
- `%%A3_CHECKED%%`
- `%%A3_COVER_ALT%%`
- `%%A3_COVER_CAPTION%%`
- `%%A3_END_TEXT%%`
- `%%A3_END_TITLE%%`
- `%%A3_EYEBROW%%`
- `%%A3_FAQ_A_1%%`
- `%%A3_FAQ_A_2%%`
- `%%A3_FAQ_A_3%%`
- `%%A3_FAQ_Q_1%%`
- `%%A3_FAQ_Q_2%%`
- `%%A3_FAQ_Q_3%%`
- `%%A3_FAQ_TITLE%%`
- `%%A3_H2_1%%`
- `%%A3_H2_2%%`
- `%%A3_H2_3%%`
- `%%A3_H2_4%%`
- `%%A3_MODIFIED%%`
- `%%A3_PUBLISHED%%`
- `%%A3_QUOTE%%`
- `%%A3_QUOTE_NOTE%%`
- `%%A3_QUOTE_SOURCE%%`
- `%%A3_READING_NOTE%%`
- `%%A3_RSS_DATE%%`
- `%%A3_SECOND_QUOTE%%`
- `%%A3_SOURCE_LABEL%%`
- `%%A3_SOURCE_NOTE%%`
- `%%A3_SOURCE_URL%%`
- `%%A3_SUMMARY%%`
- `%%A3_TEXT_1%%`
- `%%A3_TEXT_2%%`
- `%%A3_TEXT_3%%`
- `%%A3_TEXT_4%%`
- `%%A3_TITLE%%`
- `%%A4_CAVEAT_LABEL%%`
- `%%A4_CAVEAT_TEXT%%`
- `%%A4_CELL_1_1%%`
- `%%A4_CELL_1_2%%`
- `%%A4_CELL_2_1%%`
- `%%A4_CELL_2_2%%`
- `%%A4_CELL_3_1%%`
- `%%A4_CELL_3_2%%`
- `%%A4_CELL_4_1%%`
- `%%A4_CELL_4_2%%`
- `%%A4_CHECKED%%`
- `%%A4_COL_1%%`
- `%%A4_COL_2%%`
- `%%A4_COL_3%%`
- `%%A4_COVER_ALT%%`
- `%%A4_COVER_CAPTION%%`
- `%%A4_END_TEXT%%`
- `%%A4_END_TITLE%%`
- `%%A4_EYEBROW%%`
- `%%A4_FAQ_A_1%%`
- `%%A4_FAQ_A_2%%`
- `%%A4_FAQ_A_3%%`
- `%%A4_FAQ_Q_1%%`
- `%%A4_FAQ_Q_2%%`
- `%%A4_FAQ_Q_3%%`
- `%%A4_FAQ_TITLE%%`
- `%%A4_H2_1%%`
- `%%A4_H2_2%%`
- `%%A4_H2_3%%`
- `%%A4_H2_4%%`
- `%%A4_MODIFIED%%`
- `%%A4_PUBLISHED%%`
- `%%A4_READING_NOTE%%`
- `%%A4_ROW_1%%`
- `%%A4_ROW_2%%`
- `%%A4_ROW_3%%`
- `%%A4_ROW_4%%`
- `%%A4_SECOND_QUOTE%%`
- `%%A4_SOURCE_LABEL%%`
- `%%A4_SOURCE_NOTE%%`
- `%%A4_SOURCE_URL%%`
- `%%A4_SUMMARY%%`
- `%%A4_TABLE_CAPTION%%`
- `%%A4_TEXT_1%%`
- `%%A4_TEXT_2%%`
- `%%A4_TEXT_3%%`
- `%%A4_TEXT_4%%`
- `%%A4_TITLE%%`
- `%%A5_CAVEAT_LABEL%%`
- `%%A5_CAVEAT_TEXT%%`
- `%%A5_CHECKED%%`
- `%%A5_COVER_ALT%%`
- `%%A5_COVER_CAPTION%%`
- `%%A5_END_TEXT%%`
- `%%A5_END_TITLE%%`
- `%%A5_EYEBROW%%`
- `%%A5_FAQ_A_1%%`
- `%%A5_FAQ_A_2%%`
- `%%A5_FAQ_A_3%%`
- `%%A5_FAQ_Q_1%%`
- `%%A5_FAQ_Q_2%%`
- `%%A5_FAQ_Q_3%%`
- `%%A5_FAQ_TITLE%%`
- `%%A5_H2_1%%`
- `%%A5_H2_2%%`
- `%%A5_H2_3%%`
- `%%A5_H2_4%%`
- `%%A5_MODIFIED%%`
- `%%A5_PUBLISHED%%`
- `%%A5_READING_NOTE%%`
- `%%A5_RSS_DATE%%`
- `%%A5_SECOND_QUOTE%%`
- `%%A5_SOURCE_LABEL%%`
- `%%A5_SOURCE_NOTE%%`
- `%%A5_SOURCE_URL%%`
- `%%A5_SUMMARY%%`
- `%%A5_TEXT_1%%`
- `%%A5_TEXT_2%%`
- `%%A5_TEXT_3%%`
- `%%A5_TEXT_4%%`
- `%%A5_TIME_1%%`
- `%%A5_TIME_2%%`
- `%%A5_TIME_3%%`
- `%%A5_TIME_4%%`
- `%%A5_TIME_HEAD_1%%`
- `%%A5_TIME_HEAD_2%%`
- `%%A5_TIME_HEAD_3%%`
- `%%A5_TIME_HEAD_4%%`
- `%%A5_TIME_TEXT_1%%`
- `%%A5_TIME_TEXT_2%%`
- `%%A5_TIME_TEXT_3%%`
- `%%A5_TIME_TEXT_4%%`
- `%%A5_TITLE%%`
- `%%A6_CAVEAT_LABEL%%`
- `%%A6_CAVEAT_TEXT%%`
- `%%A6_CHECKED%%`
- `%%A6_COVER_ALT%%`
- `%%A6_COVER_CAPTION%%`
- `%%A6_END_TEXT%%`
- `%%A6_END_TITLE%%`
- `%%A6_EYEBROW%%`
- `%%A6_FAQ_A_1%%`
- `%%A6_FAQ_A_2%%`
- `%%A6_FAQ_A_3%%`
- `%%A6_FAQ_Q_1%%`
- `%%A6_FAQ_Q_2%%`
- `%%A6_FAQ_Q_3%%`
- `%%A6_FAQ_TITLE%%`
- `%%A6_H2_1%%`
- `%%A6_H2_2%%`
- `%%A6_H2_3%%`
- `%%A6_H2_4%%`
- `%%A6_MODIFIED%%`
- `%%A6_PAIR_HEAD_1%%`
- `%%A6_PAIR_HEAD_2%%`
- `%%A6_PAIR_LABEL_1%%`
- `%%A6_PAIR_LABEL_2%%`
- `%%A6_PAIR_NOTE_1%%`
- `%%A6_PAIR_NOTE_2%%`
- `%%A6_PAIR_TEXT_1%%`
- `%%A6_PAIR_TEXT_2%%`
- `%%A6_PUBLISHED%%`
- `%%A6_READING_NOTE%%`
- `%%A6_RSS_DATE%%`
- `%%A6_SECOND_QUOTE%%`
- `%%A6_SOURCE_LABEL%%`
- `%%A6_SOURCE_NOTE%%`
- `%%A6_SOURCE_URL%%`
- `%%A6_SUMMARY%%`
- `%%A6_TEXT_1%%`
- `%%A6_TEXT_2%%`
- `%%A6_TEXT_3%%`
- `%%A6_TEXT_4%%`
- `%%A6_TITLE%%`
- `%%A7_CAVEAT_LABEL%%`
- `%%A7_CAVEAT_TEXT%%`
- `%%A7_CHECKED%%`
- `%%A7_COVER_ALT%%`
- `%%A7_COVER_CAPTION%%`
- `%%A7_END_TEXT%%`
- `%%A7_END_TITLE%%`
- `%%A7_EYEBROW%%`
- `%%A7_FAQ_A_1%%`
- `%%A7_FAQ_A_2%%`
- `%%A7_FAQ_A_3%%`
- `%%A7_FAQ_Q_1%%`
- `%%A7_FAQ_Q_2%%`
- `%%A7_FAQ_Q_3%%`
- `%%A7_FAQ_TITLE%%`
- `%%A7_H2_1%%`
- `%%A7_H2_2%%`
- `%%A7_H2_3%%`
- `%%A7_H2_4%%`
- `%%A7_MARGIN_NOTE_1%%`
- `%%A7_MARGIN_NOTE_2%%`
- `%%A7_MARGIN_NOTE_3%%`
- `%%A7_MARGIN_QUOTE%%`
- `%%A7_MODIFIED%%`
- `%%A7_PUBLISHED%%`
- `%%A7_READING_NOTE%%`
- `%%A7_RSS_DATE%%`
- `%%A7_SECOND_QUOTE%%`
- `%%A7_SOURCE_LABEL%%`
- `%%A7_SOURCE_NOTE%%`
- `%%A7_SOURCE_URL%%`
- `%%A7_SUMMARY%%`
- `%%A7_TEXT_1%%`
- `%%A7_TEXT_2%%`
- `%%A7_TEXT_3%%`
- `%%A7_TEXT_4%%`
- `%%A7_TITLE%%`
- `%%A8_CAVEAT_LABEL%%`
- `%%A8_CAVEAT_TEXT%%`
- `%%A8_CHECKED%%`
- `%%A8_COVER_ALT%%`
- `%%A8_COVER_CAPTION%%`
- `%%A8_END_TEXT%%`
- `%%A8_END_TITLE%%`
- `%%A8_EYEBROW%%`
- `%%A8_FAQ_A_1%%`
- `%%A8_FAQ_A_2%%`
- `%%A8_FAQ_A_3%%`
- `%%A8_FAQ_Q_1%%`
- `%%A8_FAQ_Q_2%%`
- `%%A8_FAQ_Q_3%%`
- `%%A8_FAQ_TITLE%%`
- `%%A8_H2_1%%`
- `%%A8_H2_2%%`
- `%%A8_H2_3%%`
- `%%A8_H2_4%%`
- `%%A8_METHOD_HEAD_1%%`
- `%%A8_METHOD_HEAD_2%%`
- `%%A8_METHOD_HEAD_3%%`
- `%%A8_METHOD_HEAD_4%%`
- `%%A8_METHOD_TEXT_1%%`
- `%%A8_METHOD_TEXT_2%%`
- `%%A8_METHOD_TEXT_3%%`
- `%%A8_METHOD_TEXT_4%%`
- `%%A8_MODIFIED%%`
- `%%A8_PUBLISHED%%`
- `%%A8_READING_NOTE%%`
- `%%A8_RSS_DATE%%`
- `%%A8_SECOND_QUOTE%%`
- `%%A8_SOURCE_LABEL%%`
- `%%A8_SOURCE_NOTE%%`
- `%%A8_SOURCE_URL%%`
- `%%A8_SUMMARY%%`
- `%%A8_TEXT_1%%`
- `%%A8_TEXT_2%%`
- `%%A8_TEXT_3%%`
- `%%A8_TEXT_4%%`
- `%%A8_TITLE%%`
- `%%A9_CAVEAT_LABEL%%`
- `%%A9_CAVEAT_TEXT%%`
- `%%A9_CHECKED%%`
- `%%A9_COVER_ALT%%`
- `%%A9_COVER_CAPTION%%`
- `%%A9_CROSS_HEAD_1%%`
- `%%A9_CROSS_HEAD_2%%`
- `%%A9_CROSS_HEAD_3%%`
- `%%A9_CROSS_TEXT_1%%`
- `%%A9_CROSS_TEXT_2%%`
- `%%A9_CROSS_TEXT_3%%`
- `%%A9_END_TEXT%%`
- `%%A9_END_TITLE%%`
- `%%A9_EYEBROW%%`
- `%%A9_FAQ_A_1%%`
- `%%A9_FAQ_A_2%%`
- `%%A9_FAQ_A_3%%`
- `%%A9_FAQ_Q_1%%`
- `%%A9_FAQ_Q_2%%`
- `%%A9_FAQ_Q_3%%`
- `%%A9_FAQ_TITLE%%`
- `%%A9_H2_1%%`
- `%%A9_H2_2%%`
- `%%A9_H2_3%%`
- `%%A9_H2_4%%`
- `%%A9_MODIFIED%%`
- `%%A9_PUBLISHED%%`
- `%%A9_READING_NOTE%%`
- `%%A9_SECOND_QUOTE%%`
- `%%A9_SOURCE_LABEL%%`
- `%%A9_SOURCE_NOTE%%`
- `%%A9_SOURCE_URL%%`
- `%%A9_SUMMARY%%`
- `%%A9_TEXT_1%%`
- `%%A9_TEXT_2%%`
- `%%A9_TEXT_3%%`
- `%%A9_TEXT_4%%`
- `%%A9_TITLE%%`
- `%%ABOUT_CONTACT_TEXT%%`
- `%%ABOUT_CONTACT_TITLE%%`
- `%%ABOUT_H2_1%%`
- `%%ABOUT_H2_2%%`
- `%%ABOUT_H2_3%%`
- `%%ABOUT_H2_4%%`
- `%%ABOUT_INTRO%%`
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
- `%%CONTACT_CONTACT_TEXT%%`
- `%%CONTACT_CONTACT_TITLE%%`
- `%%CONTACT_EMAIL%%`
- `%%CONTACT_H2_1%%`
- `%%CONTACT_H2_2%%`
- `%%CONTACT_H2_3%%`
- `%%CONTACT_H2_4%%`
- `%%CONTACT_INTRO%%`
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
- `%%CORRECTIONS_TEXT_1%%`
- `%%CORRECTIONS_TEXT_2%%`
- `%%CORRECTIONS_TEXT_3%%`
- `%%CORRECTIONS_TEXT_4%%`
- `%%CORRECTIONS_UPDATED%%`
- `%%DESK_TITLE%%`
- `%%DISCLAIMER_CONTACT_TEXT%%`
- `%%DISCLAIMER_CONTACT_TITLE%%`
- `%%DISCLAIMER_H2_1%%`
- `%%DISCLAIMER_H2_2%%`
- `%%DISCLAIMER_H2_3%%`
- `%%DISCLAIMER_H2_4%%`
- `%%DISCLAIMER_INTRO%%`
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
- `%%DISCLOSURE_TEXT_1%%`
- `%%DISCLOSURE_TEXT_2%%`
- `%%DISCLOSURE_TEXT_3%%`
- `%%DISCLOSURE_TEXT_4%%`
- `%%DISCLOSURE_UPDATED%%`
- `%%EDITION_LABEL%%`
- `%%EDITORIAL_CONTACT_TEXT%%`
- `%%EDITORIAL_CONTACT_TITLE%%`
- `%%EDITORIAL_H2_1%%`
- `%%EDITORIAL_H2_2%%`
- `%%EDITORIAL_H2_3%%`
- `%%EDITORIAL_H2_4%%`
- `%%EDITORIAL_INTRO%%`
- `%%EDITORIAL_TEXT_1%%`
- `%%EDITORIAL_TEXT_2%%`
- `%%EDITORIAL_TEXT_3%%`
- `%%EDITORIAL_TEXT_4%%`
- `%%EDITORIAL_UPDATED%%`
- `%%EDITOR_NOTE%%`
- `%%G1_INTRO%%`
- `%%G1_LABEL%%`
- `%%G1_NOTE%%`
- `%%G1_NOTE_TITLE%%`
- `%%G2_INTRO%%`
- `%%G2_LABEL%%`
- `%%G2_NOTE%%`
- `%%G2_NOTE_TITLE%%`
- `%%G3_INTRO%%`
- `%%G3_LABEL%%`
- `%%G3_NOTE%%`
- `%%G3_NOTE_TITLE%%`
- `%%HERO_DESCRIPTION%%`
- `%%HERO_TITLE%%`
- `%%HOME_FEATURED_LABEL%%`
- `%%HOME_LATEST_LABEL%%`
- `%%HOME_LINKS_LABEL%%`
- `%%INDEPENDENCE_NOTE%%`
- `%%INVITE_CODE%%`
- `%%INVITE_LABEL%%`
- `%%LANG%%`
- `%%MAST_LEFT%%`
- `%%MAST_NOTE%%`
- `%%PLATE_LABEL%%`
- `%%PLATE_MARK%%`
- `%%PRIVACY_CONTACT_TEXT%%`
- `%%PRIVACY_CONTACT_TITLE%%`
- `%%PRIVACY_H2_1%%`
- `%%PRIVACY_H2_2%%`
- `%%PRIVACY_H2_3%%`
- `%%PRIVACY_H2_4%%`
- `%%PRIVACY_INTRO%%`
- `%%PRIVACY_TEXT_1%%`
- `%%PRIVACY_TEXT_2%%`
- `%%PRIVACY_TEXT_3%%`
- `%%PRIVACY_TEXT_4%%`
- `%%PRIVACY_UPDATED%%`
- `%%RISK_NOTE%%`
- `%%SECURITY_EMAIL%%`
- `%%SECURITY_EXPIRES%%`
- `%%SEO_TITLE%%`
- `%%SITE_DESC%%`
- `%%SITE_DOMAIN%%`
- `%%SITE_NAME%%`
- `%%SITE_TAGLINE%%`
- `%%TOOLS_INTRO%%`
- `%%TOOLS_LABEL%%`
- `%%TOOLS_TITLE%%`
- `%%WIRE_1_LABEL%%`
- `%%WIRE_2_LABEL%%`
- `%%WIRE_3_LABEL%%`
- `%%WIRE_LABEL%%`
