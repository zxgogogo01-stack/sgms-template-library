# 071 Plum Inbox · 工作流 v2 接入契约

## 范围与视觉保留

只做静态网站模板，不写注册教程或可发布文章，不部署生产站。保留原始 correspondence.css 全字节与首页全部 pi71- 类名，以独立 letterpress.css 扩充梅紫信封、收件行、信夹与回邮版式。旧外部动态参考不可复验，保真状态单列为未验证，不宣称与原站像素一致。

34 个 HTML：30 可索引、独立 404、3 个 noindex 手动旧入口。12 文章、3 信夹、5 真工具、7 独立公开说明；两篇 cornerstone 是容量角色，不预定正文或选题。registrationGuide 仅为兼容字段，指通用推广组件外壳。

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "letter-register.html",
  "articles": [
    "letters/open-letter.html",
    "letters/subject-ribbon.html",
    "letters/source-pockets.html",
    "letters/enclosure-list.html",
    "letters/reply-sequence.html",
    "letters/quoted-context.html",
    "letters/copy-routing.html",
    "letters/unsettled-slips.html",
    "letters/folded-outline.html",
    "letters/margin-amendment.html",
    "letters/reader-mailbag.html",
    "letters/return-receipt.html"
  ],
  "cornerstones": [
    "letters/open-letter.html",
    "letters/subject-ribbon.html"
  ],
  "registrationGuide": "letters/return-receipt.html",
  "articleCovers": {
    "letters/open-letter.html": {
      "display": "assets/covers/open-letter.webp",
      "og": "assets/covers/open-letter.png"
    },
    "letters/subject-ribbon.html": {
      "display": "assets/covers/subject-ribbon.webp",
      "og": "assets/covers/subject-ribbon.png"
    },
    "letters/source-pockets.html": {
      "display": "assets/covers/source-pockets.webp",
      "og": "assets/covers/source-pockets.png"
    },
    "letters/enclosure-list.html": {
      "display": "assets/covers/enclosure-list.webp",
      "og": "assets/covers/enclosure-list.png"
    },
    "letters/reply-sequence.html": {
      "display": "assets/covers/reply-sequence.webp",
      "og": "assets/covers/reply-sequence.png"
    },
    "letters/quoted-context.html": {
      "display": "assets/covers/quoted-context.webp",
      "og": "assets/covers/quoted-context.png"
    },
    "letters/copy-routing.html": {
      "display": "assets/covers/copy-routing.webp",
      "og": "assets/covers/copy-routing.png"
    },
    "letters/unsettled-slips.html": {
      "display": "assets/covers/unsettled-slips.webp",
      "og": "assets/covers/unsettled-slips.png"
    },
    "letters/folded-outline.html": {
      "display": "assets/covers/folded-outline.webp",
      "og": "assets/covers/folded-outline.png"
    },
    "letters/margin-amendment.html": {
      "display": "assets/covers/margin-amendment.webp",
      "og": "assets/covers/margin-amendment.png"
    },
    "letters/reader-mailbag.html": {
      "display": "assets/covers/reader-mailbag.webp",
      "og": "assets/covers/reader-mailbag.png"
    },
    "letters/return-receipt.html": {
      "display": "assets/covers/return-receipt.webp",
      "og": "assets/covers/return-receipt.png"
    }
  },
  "categories": [
    {
      "path": "folders/first-reading.html",
      "label": "初阅信夹",
      "articles": [
        "letters/open-letter.html",
        "letters/subject-ribbon.html",
        "letters/source-pockets.html",
        "letters/enclosure-list.html"
      ]
    },
    {
      "path": "folders/context-kept.html",
      "label": "续线信夹",
      "articles": [
        "letters/reply-sequence.html",
        "letters/quoted-context.html",
        "letters/copy-routing.html",
        "letters/unsettled-slips.html"
      ]
    },
    {
      "path": "folders/return-file.html",
      "label": "回存信夹",
      "articles": [
        "letters/folded-outline.html",
        "letters/margin-amendment.html",
        "letters/reader-mailbag.html",
        "letters/return-receipt.html"
      ]
    }
  ],
  "toolIndex": "sorting-room.html",
  "tools": [
    "sorting/subject-thread.html",
    "sorting/enclosure-budget.html",
    "sorting/overlap-window.html",
    "sorting/quote-depth.html",
    "sorting/turnaround-log.html"
  ],
  "legal": {
    "about": "archive-room.html",
    "contact": "postbox.html",
    "disclosure": "relationship-seal.html",
    "disclaimer": "reading-boundary.html",
    "privacy": "data-envelope.html",
    "corrections": "amendment-desk.html",
    "editorial": "letter-policy.html"
  },
  "error404": "404.html",
  "robots": "robots.txt",
  "sitemap": "sitemap.xml",
  "feed": "feed.xml",
  "security": ".well-known/security.txt",
  "favicon": "favicon.ico",
  "appleTouchIcon": "apple-touch-icon.png",
  "socialImage": "assets/postal-card.png",
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

## 内容填充规则

- 先填全站文字与变量，再逐篇写经核实的内容。变量表覆盖每个页面槽位；不新增 UI、工具或页面才能使用。
- 首页形态 A：首屏代码、复制、利益说明、脚注；首页零外部推广链接。仅 return-receipt.html 存在一个静态外部推广槽位，保留 rel、target 和紧邻披露。无跨站推荐或共享人物。
- 文章首屏为拆信式、附件式、封缄式；十二个主组件依次为地址栏、线程带、来源袋、附件表、回信阶段、引语封套、抄送分工、待核便笺、折页层次、页边修订、读者信袋、回执。已有目录、FAQ、作者、更正、相关页与三种收尾。
- 12 个独立 SVG 源图已生成各自 1200×630 WebP 与 PNG；这是抽象编辑图形，不证明内容事实或作者身份。站点卡、180px apple 图标、16/32/48 ICO 均预制。
- 主导航只有 5 个稳定入口。每个文章可从首页、总目、独有信夹到达；通用页从全部页脚可达；工具从首页、总目、工具总目可达。
- 不替换类名、数据属性、输入协议、校验边界或脚本算法；正文可用既有结构容纳长文，增段时保留对应标题 ID 和目录一致。不能把多段 HTML 直接塞进文本变量。
- 不编造平台数字、品牌背书、用户、作者身份、日期或政策。图片无需后续 AI 再设计；文字太长时按以下长度预算调整，而非修改布局。

## 变量格式与长度

纯文字：标题 8–28 中文字，首页标题 8–18 字；眉题与短标签 2–20 字；A5_STAGE_MARK_1 至 4 为 2–10 字；摘要 40–100 字；首屏利益脚注 16–45 字；品牌为 3–24 英文/罗马字；代码 4–28 ASCII 字符。列表短状态如 UPDATED_LABEL 用 4–12 字。正文每槽可为 100–800 字，按内容层次增段而非字数填充。

SITE_DOMAIN：仅主机名，无协议/尾斜线/路径。AFFILIATE_URL 与 SOURCE_n_URL：经核实的绝对 HTTPS URL；不允许脚本协议。CONTACT_EMAIL/SECURITY_EMAIL：纯邮箱。LANG：真实单站 BCP47。PUBLISHED/MODIFIED：真实 ISO 日期；RSS_DATE：真实 RFC 2822 UTC 日期；SECURITY_EXPIRES：未来 RFC3339 UTC 到期时间。不得沿用 QA 样例。

HTML 文本转义 & < >；属性另转义双引号；XML 转义 & < > 和引号；JSON-LD 使用 JSON 字符串转义并将 < 写为 \u003c，避免关闭 script。不要以单次未经上下文转义的全局替换发布。所有变量必须消解并重新运行审计。工具演示数据仅为确定性的非业务输入示例，不是站点事实。

## 五工具算法与边界

### 主题行线程器

主题行，不是正文或邮箱。空白行忽略，结果保留原始行号。

先 NFKC、合并空白；最多剥离 20 层 Re、Fw、Fwd、答复、回复、转发与冒号；核心以 Unicode 小写形式比较。

每组列出核心、行号和前缀总数；全部 100 组均可显示与复制，不截断。

不移除方括号标签，不判断事件、收件人或语义是否相同；归一化后仍保留真实主题差别。

内容只在当前页面内存处理，不发送邮件、不上传；离开前自行清理敏感主题。

### 附件体积估算

以 KiB（1024 字节）和 MiB（1048576 字节）输入；最多 100 条、原文 10000 码点。名称不是文件路径，不访问磁盘。

编码字符数为 4 × ceil(字节 / 3)，按每行 76 字符计 CRLF；无尾部 CRLF，换行字节为 2 × floor((字符数 − 1) / 76)。

每附件编码字节再加指定额外字节，逐条列账；总值与整封上限比较并给剩余或超出字节。

不含正文、传输封装、服务商差异或压缩；这是固定假设估算，不是可发送、上传或投递保证。

仅处理手输名称与数字。不会读取文件、上传附件或联系任何邮件服务器。

### 固定偏移交集

六项全部填写，24 小时制时刻精确到分钟。偏移值限定 15 分钟步长。

将两窗口的本地分钟分别减去固定偏移，映射到 1440 分钟循环日；逐分钟取交集。

连续分钟合并为 UTC 区间，午夜处分开；同时给出 A、B 本地对应区间与跨午夜标记。

这是重复日内时段的交集，不指定具体日期。无夏令时、节假日、工作日或地区可用性推断。

计算完全本地。工具不读取日历、不创建预约，也不发送邀请。

### 引用层级图

一行一段，空白行忽略但仍保留输入行号；NFKC 后去首尾空白。

连续的前导 > 作为层级，中间可有空格。最多 20 层；符号后必须有正文。

以前一非空行层级为基准，第一行基准为 0；新层级大于前级加 1 记为跳级。全部内容按行回放。

层级下降不视为错误，文本中间的 > 不计层级；不识别 HTML blockquote 或邮件元数据。

只检查字符串结构，不解释对话事实、责任归属或邮件真实来源。内容不离开本页。

### 往返时长账

每行恰有两个 |。时间为 UTC，不带秒或地区名；原始文本最多 10000 码点。

逐项验证公历日期，以结束 UTC 毫秒减开始，再除 60000；结束不得早于开始，允许 0 分钟。

完整列出每条时长、总和、最短、最长、算术平均、中位数；P90 使用最近秩 ceil(0.9 × 条数)，从 1 起数。

均值保留两位小数；中位数取两个中间值均值。结果不扣工作外时间，不代表服务承诺、时效预测或因果。

手输时间在本地处理。不抓取信箱或联系人，不确认邮件是否真正发出、接收或阅读。

全工具拒绝不成对代理项与禁止控制符；文字长度按 Unicode 码点而非 UTF-16 单元；不静默截断；错误聚焦对应字段并关联 aria-errormessage。输入或重置使旧报告失效，复制有版本守卫防止异步成功消息污染新状态。无 JavaScript 时提交/复制禁用，菜单、所有内容与原生 details 仍可读。主题存储键仅 plum-inbox-071-mail，不储存用户输入。

## 验收与交接

执行 validate.js、audit-template.js、audit-workflow-readiness.js；再执行 tools/qa/071-plum-inbox-browser.js 的逐页 4 宽度 × 2 主题矩阵与独立算法/错误/边界/复制/键盘/无 JS 检验。人工查看全部版式、表格、工具结果及移动首屏。最终证据与计数以 batches/workflow-readiness-progress.md 为准，未通过前不登记完成。全库相似度是结构信号，不是不可识别承诺。

## 完整变量登记

- %%A10_AFTER_LABEL%%
- %%A10_AFTER_TEXT%%
- %%A10_AMENDMENT_LABEL%%
- %%A10_AMENDMENT_REASON%%
- %%A10_BEFORE_LABEL%%
- %%A10_BEFORE_TEXT%%
- %%A10_BODY_1_A%%
- %%A10_BODY_1_B%%
- %%A10_BODY_2_A%%
- %%A10_BODY_2_B%%
- %%A10_BODY_3_A%%
- %%A10_BODY_3_B%%
- %%A10_BODY_4_A%%
- %%A10_BODY_4_B%%
- %%A10_BOUNDARY_NOTE%%
- %%A10_CHECKED_NOTE%%
- %%A10_COVER_ALT%%
- %%A10_COVER_CAPTION%%
- %%A10_ENDING_LABEL%%
- %%A10_ENDING_TEXT%%
- %%A10_ENDING_TITLE%%
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
- %%A10_PART_1_LABEL%%
- %%A10_PART_2_LABEL%%
- %%A10_PART_3_LABEL%%
- %%A10_PART_4_LABEL%%
- %%A10_POINT_1%%
- %%A10_POINT_2%%
- %%A10_POINT_3%%
- %%A10_PUBLISHED%%
- %%A10_PULL_QUOTE%%
- %%A10_RSS_DATE%%
- %%A10_SUMMARY%%
- %%A10_TITLE%%
- %%A10_TOC_LABEL%%
- %%A10_UPDATED_LABEL%%
- %%A11_BODY_1_A%%
- %%A11_BODY_1_B%%
- %%A11_BODY_2_A%%
- %%A11_BODY_2_B%%
- %%A11_BODY_3_A%%
- %%A11_BODY_3_B%%
- %%A11_BODY_4_A%%
- %%A11_BODY_4_B%%
- %%A11_BOUNDARY_NOTE%%
- %%A11_CHECKED_NOTE%%
- %%A11_COVER_ALT%%
- %%A11_COVER_CAPTION%%
- %%A11_ENDING_LABEL%%
- %%A11_ENDING_TEXT%%
- %%A11_ENDING_TITLE%%
- %%A11_EYEBROW%%
- %%A11_FAQ_A_1%%
- %%A11_FAQ_A_2%%
- %%A11_FAQ_Q_1%%
- %%A11_FAQ_Q_2%%
- %%A11_FAQ_TITLE%%
- %%A11_H2_1%%
- %%A11_H2_2%%
- %%A11_H2_3%%
- %%A11_H2_4%%
- %%A11_MODIFIED%%
- %%A11_PART_1_LABEL%%
- %%A11_PART_2_LABEL%%
- %%A11_PART_3_LABEL%%
- %%A11_PART_4_LABEL%%
- %%A11_POINT_1%%
- %%A11_POINT_2%%
- %%A11_POINT_3%%
- %%A11_PUBLISHED%%
- %%A11_PULL_QUOTE%%
- %%A11_READER_A_1%%
- %%A11_READER_A_2%%
- %%A11_READER_A_3%%
- %%A11_READER_Q_1%%
- %%A11_READER_Q_2%%
- %%A11_READER_Q_3%%
- %%A11_RSS_DATE%%
- %%A11_SUMMARY%%
- %%A11_TITLE%%
- %%A11_TOC_LABEL%%
- %%A11_UPDATED_LABEL%%
- %%A12_BODY_1_A%%
- %%A12_BODY_1_B%%
- %%A12_BODY_2_A%%
- %%A12_BODY_2_B%%
- %%A12_BODY_3_A%%
- %%A12_BODY_3_B%%
- %%A12_BODY_4_A%%
- %%A12_BODY_4_B%%
- %%A12_BOUNDARY_NOTE%%
- %%A12_CHECKED_NOTE%%
- %%A12_COVER_ALT%%
- %%A12_COVER_CAPTION%%
- %%A12_ENDING_LABEL%%
- %%A12_ENDING_TEXT%%
- %%A12_ENDING_TITLE%%
- %%A12_EYEBROW%%
- %%A12_FAQ_A_1%%
- %%A12_FAQ_A_2%%
- %%A12_FAQ_A_3%%
- %%A12_FAQ_Q_1%%
- %%A12_FAQ_Q_2%%
- %%A12_FAQ_Q_3%%
- %%A12_FAQ_TITLE%%
- %%A12_H2_1%%
- %%A12_H2_2%%
- %%A12_H2_3%%
- %%A12_H2_4%%
- %%A12_MODIFIED%%
- %%A12_OPENING_LABEL%%
- %%A12_OPENING_NOTE%%
- %%A12_PART_1_LABEL%%
- %%A12_PART_2_LABEL%%
- %%A12_PART_3_LABEL%%
- %%A12_PART_4_LABEL%%
- %%A12_POINT_1%%
- %%A12_POINT_2%%
- %%A12_POINT_3%%
- %%A12_PUBLISHED%%
- %%A12_PULL_QUOTE%%
- %%A12_RECEIPT_LABEL%%
- %%A12_RECEIPT_NOTE%%
- %%A12_RECEIPT_TERM_1%%
- %%A12_RECEIPT_TERM_2%%
- %%A12_RECEIPT_TERM_3%%
- %%A12_RECEIPT_TEXT_1%%
- %%A12_RECEIPT_TEXT_2%%
- %%A12_RECEIPT_TEXT_3%%
- %%A12_RSS_DATE%%
- %%A12_SUMMARY%%
- %%A12_TITLE%%
- %%A12_TOC_LABEL%%
- %%A12_UPDATED_LABEL%%
- %%A1_ADDRESS_LABEL_1%%
- %%A1_ADDRESS_LABEL_2%%
- %%A1_ADDRESS_LABEL_3%%
- %%A1_ADDRESS_LABEL_4%%
- %%A1_ADDRESS_TEXT_1%%
- %%A1_ADDRESS_TEXT_2%%
- %%A1_ADDRESS_TEXT_3%%
- %%A1_ADDRESS_TEXT_4%%
- %%A1_BODY_1_A%%
- %%A1_BODY_1_B%%
- %%A1_BODY_2_A%%
- %%A1_BODY_2_B%%
- %%A1_BODY_3_A%%
- %%A1_BODY_3_B%%
- %%A1_BODY_4_A%%
- %%A1_BODY_4_B%%
- %%A1_BOUNDARY_NOTE%%
- %%A1_CHECKED_NOTE%%
- %%A1_COVER_ALT%%
- %%A1_COVER_CAPTION%%
- %%A1_ENDING_LABEL%%
- %%A1_ENDING_TEXT%%
- %%A1_ENDING_TITLE%%
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
- %%A1_PART_1_LABEL%%
- %%A1_PART_2_LABEL%%
- %%A1_PART_3_LABEL%%
- %%A1_PART_4_LABEL%%
- %%A1_POINT_1%%
- %%A1_POINT_2%%
- %%A1_POINT_3%%
- %%A1_PUBLISHED%%
- %%A1_PULL_QUOTE%%
- %%A1_RSS_DATE%%
- %%A1_SUMMARY%%
- %%A1_TITLE%%
- %%A1_TOC_LABEL%%
- %%A1_UPDATED_LABEL%%
- %%A2_BODY_1_A%%
- %%A2_BODY_1_B%%
- %%A2_BODY_2_A%%
- %%A2_BODY_2_B%%
- %%A2_BODY_3_A%%
- %%A2_BODY_3_B%%
- %%A2_BODY_4_A%%
- %%A2_BODY_4_B%%
- %%A2_BOUNDARY_NOTE%%
- %%A2_CHECKED_NOTE%%
- %%A2_COVER_ALT%%
- %%A2_COVER_CAPTION%%
- %%A2_ENDING_LABEL%%
- %%A2_ENDING_TEXT%%
- %%A2_ENDING_TITLE%%
- %%A2_EYEBROW%%
- %%A2_FAQ_A_1%%
- %%A2_FAQ_A_2%%
- %%A2_FAQ_Q_1%%
- %%A2_FAQ_Q_2%%
- %%A2_FAQ_TITLE%%
- %%A2_H2_1%%
- %%A2_H2_2%%
- %%A2_H2_3%%
- %%A2_H2_4%%
- %%A2_MODIFIED%%
- %%A2_PART_1_LABEL%%
- %%A2_PART_2_LABEL%%
- %%A2_PART_3_LABEL%%
- %%A2_PART_4_LABEL%%
- %%A2_POINT_1%%
- %%A2_POINT_2%%
- %%A2_POINT_3%%
- %%A2_PUBLISHED%%
- %%A2_PULL_QUOTE%%
- %%A2_RSS_DATE%%
- %%A2_SUMMARY%%
- %%A2_THREAD_LABEL_1%%
- %%A2_THREAD_LABEL_2%%
- %%A2_THREAD_LABEL_3%%
- %%A2_THREAD_LABEL_4%%
- %%A2_THREAD_TEXT_1%%
- %%A2_THREAD_TEXT_2%%
- %%A2_THREAD_TEXT_3%%
- %%A2_THREAD_TEXT_4%%
- %%A2_TITLE%%
- %%A2_TOC_LABEL%%
- %%A2_UPDATED_LABEL%%
- %%A3_BODY_1_A%%
- %%A3_BODY_1_B%%
- %%A3_BODY_2_A%%
- %%A3_BODY_2_B%%
- %%A3_BODY_3_A%%
- %%A3_BODY_3_B%%
- %%A3_BODY_4_A%%
- %%A3_BODY_4_B%%
- %%A3_BOUNDARY_NOTE%%
- %%A3_CHECKED_NOTE%%
- %%A3_COVER_ALT%%
- %%A3_COVER_CAPTION%%
- %%A3_ENDING_LABEL%%
- %%A3_ENDING_TEXT%%
- %%A3_ENDING_TITLE%%
- %%A3_EYEBROW%%
- %%A3_FAQ_A_1%%
- %%A3_FAQ_A_2%%
- %%A3_FAQ_A_3%%
- %%A3_FAQ_Q_1%%
- %%A3_FAQ_Q_2%%
- %%A3_FAQ_Q_3%%
- %%A3_FAQ_TITLE%%
- %%A3_H2_1%%
- %%A3_H2_2%%
- %%A3_H2_3%%
- %%A3_H2_4%%
- %%A3_MODIFIED%%
- %%A3_OPENING_LABEL%%
- %%A3_OPENING_NOTE%%
- %%A3_PART_1_LABEL%%
- %%A3_PART_2_LABEL%%
- %%A3_PART_3_LABEL%%
- %%A3_PART_4_LABEL%%
- %%A3_POCKET_TEXT_1%%
- %%A3_POCKET_TEXT_2%%
- %%A3_POCKET_TEXT_3%%
- %%A3_POCKET_TITLE_1%%
- %%A3_POCKET_TITLE_2%%
- %%A3_POCKET_TITLE_3%%
- %%A3_POINT_1%%
- %%A3_POINT_2%%
- %%A3_POINT_3%%
- %%A3_PUBLISHED%%
- %%A3_PULL_QUOTE%%
- %%A3_RSS_DATE%%
- %%A3_SOURCE_1_LABEL%%
- %%A3_SOURCE_1_URL%%
- %%A3_SOURCE_2_LABEL%%
- %%A3_SOURCE_2_URL%%
- %%A3_SOURCE_3_LABEL%%
- %%A3_SOURCE_3_URL%%
- %%A3_SUMMARY%%
- %%A3_TITLE%%
- %%A3_TOC_LABEL%%
- %%A3_UPDATED_LABEL%%
- %%A4_BODY_1_A%%
- %%A4_BODY_1_B%%
- %%A4_BODY_2_A%%
- %%A4_BODY_2_B%%
- %%A4_BODY_3_A%%
- %%A4_BODY_3_B%%
- %%A4_BODY_4_A%%
- %%A4_BODY_4_B%%
- %%A4_BOUNDARY_NOTE%%
- %%A4_CELL_1_1%%
- %%A4_CELL_1_2%%
- %%A4_CELL_1_3%%
- %%A4_CELL_2_1%%
- %%A4_CELL_2_2%%
- %%A4_CELL_2_3%%
- %%A4_CELL_3_1%%
- %%A4_CELL_3_2%%
- %%A4_CELL_3_3%%
- %%A4_CHECKED_NOTE%%
- %%A4_COL_1%%
- %%A4_COL_2%%
- %%A4_COL_3%%
- %%A4_COL_4%%
- %%A4_COVER_ALT%%
- %%A4_COVER_CAPTION%%
- %%A4_ENDING_LABEL%%
- %%A4_ENDING_TEXT%%
- %%A4_ENDING_TITLE%%
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
- %%A4_PART_1_LABEL%%
- %%A4_PART_2_LABEL%%
- %%A4_PART_3_LABEL%%
- %%A4_PART_4_LABEL%%
- %%A4_POINT_1%%
- %%A4_POINT_2%%
- %%A4_POINT_3%%
- %%A4_PUBLISHED%%
- %%A4_PULL_QUOTE%%
- %%A4_ROW_1%%
- %%A4_ROW_2%%
- %%A4_ROW_3%%
- %%A4_RSS_DATE%%
- %%A4_SUMMARY%%
- %%A4_TABLE_LABEL%%
- %%A4_TITLE%%
- %%A4_TOC_LABEL%%
- %%A4_UPDATED_LABEL%%
- %%A5_BODY_1_A%%
- %%A5_BODY_1_B%%
- %%A5_BODY_2_A%%
- %%A5_BODY_2_B%%
- %%A5_BODY_3_A%%
- %%A5_BODY_3_B%%
- %%A5_BODY_4_A%%
- %%A5_BODY_4_B%%
- %%A5_BOUNDARY_NOTE%%
- %%A5_CHECKED_NOTE%%
- %%A5_COVER_ALT%%
- %%A5_COVER_CAPTION%%
- %%A5_ENDING_LABEL%%
- %%A5_ENDING_TEXT%%
- %%A5_ENDING_TITLE%%
- %%A5_EYEBROW%%
- %%A5_FAQ_A_1%%
- %%A5_FAQ_A_2%%
- %%A5_FAQ_Q_1%%
- %%A5_FAQ_Q_2%%
- %%A5_FAQ_TITLE%%
- %%A5_H2_1%%
- %%A5_H2_2%%
- %%A5_H2_3%%
- %%A5_H2_4%%
- %%A5_MODIFIED%%
- %%A5_PART_1_LABEL%%
- %%A5_PART_2_LABEL%%
- %%A5_PART_3_LABEL%%
- %%A5_PART_4_LABEL%%
- %%A5_POINT_1%%
- %%A5_POINT_2%%
- %%A5_POINT_3%%
- %%A5_PUBLISHED%%
- %%A5_PULL_QUOTE%%
- %%A5_RSS_DATE%%
- %%A5_STAGE_MARK_1%%
- %%A5_STAGE_MARK_2%%
- %%A5_STAGE_MARK_3%%
- %%A5_STAGE_MARK_4%%
- %%A5_STAGE_TEXT_1%%
- %%A5_STAGE_TEXT_2%%
- %%A5_STAGE_TEXT_3%%
- %%A5_STAGE_TEXT_4%%
- %%A5_STAGE_TITLE_1%%
- %%A5_STAGE_TITLE_2%%
- %%A5_STAGE_TITLE_3%%
- %%A5_STAGE_TITLE_4%%
- %%A5_SUMMARY%%
- %%A5_TITLE%%
- %%A5_TOC_LABEL%%
- %%A5_UPDATED_LABEL%%
- %%A6_BODY_1_A%%
- %%A6_BODY_1_B%%
- %%A6_BODY_2_A%%
- %%A6_BODY_2_B%%
- %%A6_BODY_3_A%%
- %%A6_BODY_3_B%%
- %%A6_BODY_4_A%%
- %%A6_BODY_4_B%%
- %%A6_BOUNDARY_NOTE%%
- %%A6_CHECKED_NOTE%%
- %%A6_COVER_ALT%%
- %%A6_COVER_CAPTION%%
- %%A6_ENDING_LABEL%%
- %%A6_ENDING_TEXT%%
- %%A6_ENDING_TITLE%%
- %%A6_EYEBROW%%
- %%A6_FAQ_A_1%%
- %%A6_FAQ_A_2%%
- %%A6_FAQ_A_3%%
- %%A6_FAQ_Q_1%%
- %%A6_FAQ_Q_2%%
- %%A6_FAQ_Q_3%%
- %%A6_FAQ_TITLE%%
- %%A6_H2_1%%
- %%A6_H2_2%%
- %%A6_H2_3%%
- %%A6_H2_4%%
- %%A6_MODIFIED%%
- %%A6_OPENING_LABEL%%
- %%A6_OPENING_NOTE%%
- %%A6_PART_1_LABEL%%
- %%A6_PART_2_LABEL%%
- %%A6_PART_3_LABEL%%
- %%A6_PART_4_LABEL%%
- %%A6_POINT_1%%
- %%A6_POINT_2%%
- %%A6_POINT_3%%
- %%A6_PUBLISHED%%
- %%A6_PULL_QUOTE%%
- %%A6_QUOTE_1%%
- %%A6_QUOTE_2%%
- %%A6_QUOTE_CONTEXT_1%%
- %%A6_QUOTE_CONTEXT_2%%
- %%A6_QUOTE_SOURCE_1%%
- %%A6_QUOTE_SOURCE_2%%
- %%A6_RSS_DATE%%
- %%A6_SUMMARY%%
- %%A6_TITLE%%
- %%A6_TOC_LABEL%%
- %%A6_UPDATED_LABEL%%
- %%A7_BODY_1_A%%
- %%A7_BODY_1_B%%
- %%A7_BODY_2_A%%
- %%A7_BODY_2_B%%
- %%A7_BODY_3_A%%
- %%A7_BODY_3_B%%
- %%A7_BODY_4_A%%
- %%A7_BODY_4_B%%
- %%A7_BOUNDARY_NOTE%%
- %%A7_CHECKED_NOTE%%
- %%A7_COVER_ALT%%
- %%A7_COVER_CAPTION%%
- %%A7_ENDING_LABEL%%
- %%A7_ENDING_TEXT%%
- %%A7_ENDING_TITLE%%
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
- %%A7_PART_1_LABEL%%
- %%A7_PART_2_LABEL%%
- %%A7_PART_3_LABEL%%
- %%A7_PART_4_LABEL%%
- %%A7_POINT_1%%
- %%A7_POINT_2%%
- %%A7_POINT_3%%
- %%A7_PUBLISHED%%
- %%A7_PULL_QUOTE%%
- %%A7_ROUTE_LABEL_1%%
- %%A7_ROUTE_LABEL_2%%
- %%A7_ROUTE_LABEL_3%%
- %%A7_ROUTE_NAME_1%%
- %%A7_ROUTE_NAME_2%%
- %%A7_ROUTE_NAME_3%%
- %%A7_ROUTE_TEXT_1%%
- %%A7_ROUTE_TEXT_2%%
- %%A7_ROUTE_TEXT_3%%
- %%A7_RSS_DATE%%
- %%A7_SUMMARY%%
- %%A7_TITLE%%
- %%A7_TOC_LABEL%%
- %%A7_UPDATED_LABEL%%
- %%A8_BODY_1_A%%
- %%A8_BODY_1_B%%
- %%A8_BODY_2_A%%
- %%A8_BODY_2_B%%
- %%A8_BODY_3_A%%
- %%A8_BODY_3_B%%
- %%A8_BODY_4_A%%
- %%A8_BODY_4_B%%
- %%A8_BOUNDARY_NOTE%%
- %%A8_CHECKED_NOTE%%
- %%A8_COVER_ALT%%
- %%A8_COVER_CAPTION%%
- %%A8_ENDING_LABEL%%
- %%A8_ENDING_TEXT%%
- %%A8_ENDING_TITLE%%
- %%A8_EYEBROW%%
- %%A8_FAQ_A_1%%
- %%A8_FAQ_A_2%%
- %%A8_FAQ_Q_1%%
- %%A8_FAQ_Q_2%%
- %%A8_FAQ_TITLE%%
- %%A8_H2_1%%
- %%A8_H2_2%%
- %%A8_H2_3%%
- %%A8_H2_4%%
- %%A8_MODIFIED%%
- %%A8_PART_1_LABEL%%
- %%A8_PART_2_LABEL%%
- %%A8_PART_3_LABEL%%
- %%A8_PART_4_LABEL%%
- %%A8_POINT_1%%
- %%A8_POINT_2%%
- %%A8_POINT_3%%
- %%A8_PUBLISHED%%
- %%A8_PULL_QUOTE%%
- %%A8_RSS_DATE%%
- %%A8_SLIP_LABEL_1%%
- %%A8_SLIP_LABEL_2%%
- %%A8_SLIP_LABEL_3%%
- %%A8_SLIP_TEXT_1%%
- %%A8_SLIP_TEXT_2%%
- %%A8_SLIP_TEXT_3%%
- %%A8_SLIP_TITLE_1%%
- %%A8_SLIP_TITLE_2%%
- %%A8_SLIP_TITLE_3%%
- %%A8_SUMMARY%%
- %%A8_TITLE%%
- %%A8_TOC_LABEL%%
- %%A8_UPDATED_LABEL%%
- %%A9_BODY_1_A%%
- %%A9_BODY_1_B%%
- %%A9_BODY_2_A%%
- %%A9_BODY_2_B%%
- %%A9_BODY_3_A%%
- %%A9_BODY_3_B%%
- %%A9_BODY_4_A%%
- %%A9_BODY_4_B%%
- %%A9_BOUNDARY_NOTE%%
- %%A9_CHECKED_NOTE%%
- %%A9_COVER_ALT%%
- %%A9_COVER_CAPTION%%
- %%A9_ENDING_LABEL%%
- %%A9_ENDING_TEXT%%
- %%A9_ENDING_TITLE%%
- %%A9_EYEBROW%%
- %%A9_FAQ_A_1%%
- %%A9_FAQ_A_2%%
- %%A9_FAQ_A_3%%
- %%A9_FAQ_Q_1%%
- %%A9_FAQ_Q_2%%
- %%A9_FAQ_Q_3%%
- %%A9_FAQ_TITLE%%
- %%A9_FOLD_1_TEXT_1%%
- %%A9_FOLD_1_TEXT_2%%
- %%A9_FOLD_2_TEXT_1%%
- %%A9_FOLD_2_TEXT_2%%
- %%A9_FOLD_3_TEXT_1%%
- %%A9_FOLD_3_TEXT_2%%
- %%A9_FOLD_TITLE_1%%
- %%A9_FOLD_TITLE_2%%
- %%A9_FOLD_TITLE_3%%
- %%A9_H2_1%%
- %%A9_H2_2%%
- %%A9_H2_3%%
- %%A9_H2_4%%
- %%A9_MODIFIED%%
- %%A9_OPENING_LABEL%%
- %%A9_OPENING_NOTE%%
- %%A9_PART_1_LABEL%%
- %%A9_PART_2_LABEL%%
- %%A9_PART_3_LABEL%%
- %%A9_PART_4_LABEL%%
- %%A9_POINT_1%%
- %%A9_POINT_2%%
- %%A9_POINT_3%%
- %%A9_PUBLISHED%%
- %%A9_PULL_QUOTE%%
- %%A9_RSS_DATE%%
- %%A9_SUMMARY%%
- %%A9_TITLE%%
- %%A9_TOC_LABEL%%
- %%A9_UPDATED_LABEL%%
- %%ABOUT_BODY_1%%
- %%ABOUT_BODY_2%%
- %%ABOUT_BODY_3%%
- %%ABOUT_BODY_4%%
- %%ABOUT_CONTACT_NOTE%%
- %%ABOUT_EYEBROW%%
- %%ABOUT_H2_1%%
- %%ABOUT_H2_2%%
- %%ABOUT_H2_3%%
- %%ABOUT_H2_4%%
- %%ABOUT_SUMMARY%%
- %%ABOUT_UPDATED_NOTE%%
- %%AFFILIATE_DISCLOSURE%%
- %%AFFILIATE_LABEL%%
- %%AFFILIATE_NOTE%%
- %%AFFILIATE_URL%%
- %%AUTHOR_BIO%%
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
- %%CONTACT_EMAIL%%
- %%CONTACT_EYEBROW%%
- %%CONTACT_H2_1%%
- %%CONTACT_H2_2%%
- %%CONTACT_H2_3%%
- %%CONTACT_H2_4%%
- %%CONTACT_SUMMARY%%
- %%CONTACT_UPDATED_NOTE%%
- %%CORRECTIONS_BODY_1%%
- %%CORRECTIONS_BODY_2%%
- %%CORRECTIONS_BODY_3%%
- %%CORRECTIONS_BODY_4%%
- %%CORRECTIONS_CONTACT_NOTE%%
- %%CORRECTIONS_EYEBROW%%
- %%CORRECTIONS_H2_1%%
- %%CORRECTIONS_H2_2%%
- %%CORRECTIONS_H2_3%%
- %%CORRECTIONS_H2_4%%
- %%CORRECTIONS_SUMMARY%%
- %%CORRECTIONS_UPDATED_NOTE%%
- %%DISCLAIMER_BODY_1%%
- %%DISCLAIMER_BODY_2%%
- %%DISCLAIMER_BODY_3%%
- %%DISCLAIMER_BODY_4%%
- %%DISCLAIMER_CONTACT_NOTE%%
- %%DISCLAIMER_EYEBROW%%
- %%DISCLAIMER_H2_1%%
- %%DISCLAIMER_H2_2%%
- %%DISCLAIMER_H2_3%%
- %%DISCLAIMER_H2_4%%
- %%DISCLAIMER_SUMMARY%%
- %%DISCLAIMER_UPDATED_NOTE%%
- %%DISCLOSURE_BODY_1%%
- %%DISCLOSURE_BODY_2%%
- %%DISCLOSURE_BODY_3%%
- %%DISCLOSURE_BODY_4%%
- %%DISCLOSURE_CONTACT_NOTE%%
- %%DISCLOSURE_EYEBROW%%
- %%DISCLOSURE_H2_1%%
- %%DISCLOSURE_H2_2%%
- %%DISCLOSURE_H2_3%%
- %%DISCLOSURE_H2_4%%
- %%DISCLOSURE_SUMMARY%%
- %%DISCLOSURE_UPDATED_NOTE%%
- %%EDITORIAL_BODY_1%%
- %%EDITORIAL_BODY_2%%
- %%EDITORIAL_BODY_3%%
- %%EDITORIAL_BODY_4%%
- %%EDITORIAL_CONTACT_NOTE%%
- %%EDITORIAL_EYEBROW%%
- %%EDITORIAL_H2_1%%
- %%EDITORIAL_H2_2%%
- %%EDITORIAL_H2_3%%
- %%EDITORIAL_H2_4%%
- %%EDITORIAL_SUMMARY%%
- %%EDITORIAL_UPDATED_NOTE%%
- %%ENVELOPE_CAPTION%%
- %%ENVELOPE_LABEL%%
- %%FOLDER_1_INTRO%%
- %%FOLDER_1_LABEL%%
- %%FOLDER_2_INTRO%%
- %%FOLDER_2_LABEL%%
- %%FOLDER_3_INTRO%%
- %%FOLDER_3_LABEL%%
- %%FOOTER_NOTE%%
- %%HERO_DESCRIPTION%%
- %%HERO_EYEBROW%%
- %%HERO_TITLE%%
- %%HOME_FEATURED_LABEL%%
- %%HOME_LATEST_LABEL%%
- %%HOME_LINKS_LABEL%%
- %%INBOX_INTRO%%
- %%INBOX_TITLE%%
- %%INDEPENDENCE_NOTE%%
- %%INVITE_CODE%%
- %%INVITE_LABEL%%
- %%LANG%%
- %%PRIVACY_BODY_1%%
- %%PRIVACY_BODY_2%%
- %%PRIVACY_BODY_3%%
- %%PRIVACY_BODY_4%%
- %%PRIVACY_CONTACT_NOTE%%
- %%PRIVACY_EYEBROW%%
- %%PRIVACY_H2_1%%
- %%PRIVACY_H2_2%%
- %%PRIVACY_H2_3%%
- %%PRIVACY_H2_4%%
- %%PRIVACY_SUMMARY%%
- %%PRIVACY_UPDATED_NOTE%%
- %%REGISTER_INTRO%%
- %%REGISTER_LABEL%%
- %%REGISTER_TITLE%%
- %%REPLY_CARD_TEXT%%
- %%REPLY_CARD_TITLE%%
- %%RISK_NOTE%%
- %%SECURITY_EMAIL%%
- %%SECURITY_EXPIRES%%
- %%SEO_TITLE%%
- %%SITE_DESC%%
- %%SITE_DOMAIN%%
- %%SITE_NAME%%
- %%SITE_TAGLINE%%
- %%TOOLS_INTRO%%
- %%TOOLS_LABEL%%
- %%TOOLS_TITLE%%
