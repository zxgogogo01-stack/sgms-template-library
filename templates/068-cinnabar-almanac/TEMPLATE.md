# Cinnabar Almanac — 朱砂年鉴完整静态框架

## 交付与范围

只制作模板：后续 AI 填写经核实文字、文章与变量，不再搭页面、UI、工具或资产；不写注册教程，不部署生产。registrationGuide 仅是旧检查器兼容字段，指向 reference-gate 通用内容外壳，不预定文章选题。

保留本地年鉴封面、朱砂印章、横笺纸纹、三卷登记与门户，原首页类名及 almanac.css 字节完整保留；bindery.css 负责补全框架。动态原包目前没有可复验状态，因此原包忠实度未核验；本次仅按用户授权完善本地视觉，不能称忠实复刻。

34 个 HTML：30 个可索引页面、404、三个 noindex 旧入口。三卷各四篇，十二种独立模块，三种开场和收尾、多式目录与问答；七个合规页。默认 day，可切 night；localStorage 仅保存主题。导航可无 JS 阅读，折叠组件使用原生 details。

首页首屏代码、复制、利益点及脚注齐全，无推广 href；唯一静态推广槽位位于 reference-gate，带 blank 和 sponsored nofollow noopener noreferrer、邻近代码及披露。Feed 为九项摘要，不含代码或链接正文。工具均本地计算，不上传、不持久化输入。

## 工具契约

1. 条目间隔：原值 10,000 Unicode 码点、120 非空行；NFKC 后每行恰好一个竖线，题名非空且不超过 80 码点；日期为 2000–2099 的真实 YYYY-MM-DD。稳定排序，同日保留全部记录；统计相邻唯一日期间隔，全部输出，不截断 20 项。
2. 月格排版：四位年份 2000–2099，月份 1–12；周一或周日为首列。空格是月外位置，所有日号只出现一次。公历规则，不含农历或节假日。
3. 日序换算：日期 → 年内日序，或 年份＋日序 → 日期。1-based，平年最多 365，闰年最多 366；只校验启用方向，切换会清除结果。
4. 星期计数：2000–2099 闭区间，含首尾；结束不得早于开始。输出七类与周一至周五合计；不等于法定工作日，不计算调休。
5. 逐月锚点：间隔 1–12 月，候选月份 1–36 个，首个是原始月份。始终保留原始日号；clamp 截齐月底，skip 跳过但仍占候选名额。任何候选月份越过 2099 即整体报错，不给部分报告。

输入采用控件原值而非 FormData；拒绝非法控制字符、不完整 Unicode，不做隐式截断。数字只接受十进制整数。完整结果通过 textContent，修改输入立即清空结果、禁用复制；异步复制使用修订号，避免旧反馈覆盖新状态。错误关联字段并聚焦；拒绝剪贴板时保留手动复制提示。所有计算使用 UTC 整日，仅作公历运算而非本地时区事件。

## 后续 AI 接入

变量格式 %%UPPER_CASE%%，A1_–A12_ 对应十二卷叶；全部变量清单见下。保留 ca68- 类名、id、data-*、结构和脚本。只填写文字，不删必要页面、工具说明、目录、作者、来源和披露。BRAND_EN 使用英文或罗马字，BRAND_MARK 建议 1–3 个 ASCII 字符；COVER_SEAL 建议一个装饰汉字，不用机构商标。首页标题建议 8–16 字，说明 25–60 字；长利益脚注自动换行不能截断。

SITE_DOMAIN 只填主机名，AFFILIATE_URL 填经核实 HTTPS；来源 URL 经核实 HTTP(S)，禁止脚本协议。分别对 HTML 文本、属性及 XML 转义；JSON-LD 重新序列化，安全处理小于号及脚本结束片段。发布日期、更新、查证日期使用 ISO 日期；RSS_DATE 使用 RFC 822，SECURITY_EXPIRES 为未来一年内 UTC 时间。身份、经历、来源、政策与利益必须查证，不得虚构。

封面 12 套 SVG 源，WebP/PNG 均 1200×630；页面封面预加载并 fetchpriority high。社交 PNG 1200×630，apple 180×180，ICO 16/32/48。模板根即站点根；未知深路径 404 使用根 base；实际服务器仍须返回 HTTP 404。没有生产配置或站点间互链。

## 角色表

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "leaf-register.html",
  "articles": [
    "leaves/date-leaf.html",
    "leaves/facing-notes.html",
    "leaves/event-ribbon.html",
    "leaves/field-notebook.html",
    "leaves/source-register.html",
    "leaves/month-folio.html",
    "leaves/comparison-lines.html",
    "leaves/margin-lexicon.html",
    "leaves/revision-slips.html",
    "leaves/decision-branches.html",
    "leaves/excerpt-window.html",
    "leaves/reference-gate.html"
  ],
  "cornerstones": [
    "leaves/date-leaf.html",
    "leaves/comparison-lines.html"
  ],
  "registrationGuide": "leaves/reference-gate.html",
  "articleCovers": {
    "leaves/date-leaf.html": {
      "display": "assets/leaves/date-leaf.webp",
      "og": "assets/leaves/date-leaf.png"
    },
    "leaves/facing-notes.html": {
      "display": "assets/leaves/facing-notes.webp",
      "og": "assets/leaves/facing-notes.png"
    },
    "leaves/event-ribbon.html": {
      "display": "assets/leaves/event-ribbon.webp",
      "og": "assets/leaves/event-ribbon.png"
    },
    "leaves/field-notebook.html": {
      "display": "assets/leaves/field-notebook.webp",
      "og": "assets/leaves/field-notebook.png"
    },
    "leaves/source-register.html": {
      "display": "assets/leaves/source-register.webp",
      "og": "assets/leaves/source-register.png"
    },
    "leaves/month-folio.html": {
      "display": "assets/leaves/month-folio.webp",
      "og": "assets/leaves/month-folio.png"
    },
    "leaves/comparison-lines.html": {
      "display": "assets/leaves/comparison-lines.webp",
      "og": "assets/leaves/comparison-lines.png"
    },
    "leaves/margin-lexicon.html": {
      "display": "assets/leaves/margin-lexicon.webp",
      "og": "assets/leaves/margin-lexicon.png"
    },
    "leaves/revision-slips.html": {
      "display": "assets/leaves/revision-slips.webp",
      "og": "assets/leaves/revision-slips.png"
    },
    "leaves/decision-branches.html": {
      "display": "assets/leaves/decision-branches.webp",
      "og": "assets/leaves/decision-branches.png"
    },
    "leaves/excerpt-window.html": {
      "display": "assets/leaves/excerpt-window.webp",
      "og": "assets/leaves/excerpt-window.png"
    },
    "leaves/reference-gate.html": {
      "display": "assets/leaves/reference-gate.webp",
      "og": "assets/leaves/reference-gate.png"
    }
  },
  "categories": [
    {
      "path": "volumes/first-impressions.html",
      "label": "起笔卷",
      "articles": [
        "leaves/date-leaf.html",
        "leaves/facing-notes.html",
        "leaves/event-ribbon.html",
        "leaves/field-notebook.html"
      ]
    },
    {
      "path": "volumes/collation-desk.html",
      "label": "对读卷",
      "articles": [
        "leaves/source-register.html",
        "leaves/month-folio.html",
        "leaves/comparison-lines.html",
        "leaves/margin-lexicon.html"
      ]
    },
    {
      "path": "volumes/after-notes.html",
      "label": "复校卷",
      "articles": [
        "leaves/revision-slips.html",
        "leaves/decision-branches.html",
        "leaves/excerpt-window.html",
        "leaves/reference-gate.html"
      ]
    }
  ],
  "toolIndex": "ruler-room.html",
  "tools": [
    "rulers/entry-gap.html",
    "rulers/month-grid.html",
    "rulers/ordinal-day.html",
    "rulers/weekday-tally.html",
    "rulers/monthly-anchor.html"
  ],
  "legal": {
    "about": "annotations/about.html",
    "contact": "annotations/contact.html",
    "disclosure": "annotations/disclosure.html",
    "disclaimer": "annotations/disclaimer.html",
    "privacy": "annotations/privacy.html",
    "corrections": "annotations/corrections.html",
    "editorial": "annotations/editorial.html"
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

node tools/validate.js templates/068-cinnabar-almanac
node tools/audit-template.js templates/068-cinnabar-almanac
node tools/audit-workflow-readiness.js templates/068-cinnabar-almanac
node tools/check-similarity.js
node tools/qa/068-cinnabar-almanac-browser.js

逐页 1440、768、390、360 × day/night；检测溢出、图片、44px 目标、重复 id、主题、H1；实点复制、菜单、筛选、TOC、FAQ、Guide、五工具正常/错误/边界/重置/异步状态、深路径404、键盘、无JS及降动效；人工复核首页、十二模块、工具及移动开场截图。相似度只是代理指标，不能保证搜索引擎不可识别。

## 变量清单

- `%%A10_BODY_1%%`
- `%%A10_BODY_2%%`
- `%%A10_BODY_3%%`
- `%%A10_BODY_3_MORE%%`
- `%%A10_BODY_4%%`
- `%%A10_BODY_4_MORE%%`
- `%%A10_BRANCH_1_NOTE%%`
- `%%A10_BRANCH_1_TEXT%%`
- `%%A10_BRANCH_1_TITLE%%`
- `%%A10_BRANCH_2_NOTE%%`
- `%%A10_BRANCH_2_TEXT%%`
- `%%A10_BRANCH_2_TITLE%%`
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
- `%%A10_H2_4%%`
- `%%A10_INTRO%%`
- `%%A10_MODIFIED%%`
- `%%A10_NOTE_TEXT%%`
- `%%A10_NOTE_TITLE%%`
- `%%A10_PUBLISHED%%`
- `%%A10_ROOT_TEXT%%`
- `%%A10_ROOT_TITLE%%`
- `%%A10_SECTION_1_LABEL%%`
- `%%A10_SECTION_2_LABEL%%`
- `%%A10_SECTION_3_LABEL%%`
- `%%A10_SECTION_4_LABEL%%`
- `%%A10_SOURCE_LABEL%%`
- `%%A10_SOURCE_URL%%`
- `%%A10_SUMMARY%%`
- `%%A10_TITLE%%`
- `%%A11_BODY_1%%`
- `%%A11_BODY_2%%`
- `%%A11_BODY_3%%`
- `%%A11_BODY_3_MORE%%`
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
- `%%A11_INTRO%%`
- `%%A11_MODIFIED%%`
- `%%A11_NOTE_TEXT%%`
- `%%A11_NOTE_TITLE%%`
- `%%A11_PUBLISHED%%`
- `%%A11_QUOTE%%`
- `%%A11_QUOTE_NOTE%%`
- `%%A11_QUOTE_SOURCE%%`
- `%%A11_RSS_DATE%%`
- `%%A11_SECTION_1_LABEL%%`
- `%%A11_SECTION_2_LABEL%%`
- `%%A11_SECTION_3_LABEL%%`
- `%%A11_SOURCE_LABEL%%`
- `%%A11_SOURCE_URL%%`
- `%%A11_SUMMARY%%`
- `%%A11_TITLE%%`
- `%%A12_BODY_1%%`
- `%%A12_BODY_2%%`
- `%%A12_BODY_3%%`
- `%%A12_BODY_3_MORE%%`
- `%%A12_BODY_4%%`
- `%%A12_BODY_4_MORE%%`
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
- `%%A12_H2_4%%`
- `%%A12_INTRO%%`
- `%%A12_MODIFIED%%`
- `%%A12_NOTE_TEXT%%`
- `%%A12_NOTE_TITLE%%`
- `%%A12_PUBLISHED%%`
- `%%A12_RSS_DATE%%`
- `%%A12_SECTION_1_LABEL%%`
- `%%A12_SECTION_2_LABEL%%`
- `%%A12_SECTION_3_LABEL%%`
- `%%A12_SECTION_4_LABEL%%`
- `%%A12_SOURCE_LABEL%%`
- `%%A12_SOURCE_URL%%`
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
- `%%A1_FAQ_A_1%%`
- `%%A1_FAQ_A_2%%`
- `%%A1_FAQ_Q_1%%`
- `%%A1_FAQ_Q_2%%`
- `%%A1_FAQ_TITLE%%`
- `%%A1_FIELD_1%%`
- `%%A1_FIELD_2%%`
- `%%A1_FIELD_3%%`
- `%%A1_FIELD_4%%`
- `%%A1_H2_1%%`
- `%%A1_H2_2%%`
- `%%A1_H2_3%%`
- `%%A1_INTRO%%`
- `%%A1_MODIFIED%%`
- `%%A1_NOTE_TEXT%%`
- `%%A1_NOTE_TITLE%%`
- `%%A1_PUBLISHED%%`
- `%%A1_RSS_DATE%%`
- `%%A1_SECTION_1_LABEL%%`
- `%%A1_SECTION_2_LABEL%%`
- `%%A1_SECTION_3_LABEL%%`
- `%%A1_SOURCE_LABEL%%`
- `%%A1_SOURCE_URL%%`
- `%%A1_SUMMARY%%`
- `%%A1_TITLE%%`
- `%%A1_VALUE_1%%`
- `%%A1_VALUE_2%%`
- `%%A1_VALUE_3%%`
- `%%A1_VALUE_4%%`
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
- `%%A2_SIDE_1_LABEL%%`
- `%%A2_SIDE_1_NOTE%%`
- `%%A2_SIDE_1_TEXT%%`
- `%%A2_SIDE_1_TITLE%%`
- `%%A2_SIDE_2_LABEL%%`
- `%%A2_SIDE_2_NOTE%%`
- `%%A2_SIDE_2_TEXT%%`
- `%%A2_SIDE_2_TITLE%%`
- `%%A2_SOURCE_LABEL%%`
- `%%A2_SOURCE_URL%%`
- `%%A2_SUMMARY%%`
- `%%A2_TITLE%%`
- `%%A3_BODY_1%%`
- `%%A3_BODY_2%%`
- `%%A3_BODY_3%%`
- `%%A3_BODY_3_MORE%%`
- `%%A3_CHECKED%%`
- `%%A3_CLOSE_TEXT%%`
- `%%A3_CLOSE_TITLE%%`
- `%%A3_COVER_ALT%%`
- `%%A3_COVER_CAPTION%%`
- `%%A3_EVENT_1_LABEL%%`
- `%%A3_EVENT_1_TEXT%%`
- `%%A3_EVENT_1_TITLE%%`
- `%%A3_EVENT_2_LABEL%%`
- `%%A3_EVENT_2_TEXT%%`
- `%%A3_EVENT_2_TITLE%%`
- `%%A3_EVENT_3_LABEL%%`
- `%%A3_EVENT_3_TEXT%%`
- `%%A3_EVENT_3_TITLE%%`
- `%%A3_EVENT_4_LABEL%%`
- `%%A3_EVENT_4_TEXT%%`
- `%%A3_EVENT_4_TITLE%%`
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
- `%%A3_SUMMARY%%`
- `%%A3_TITLE%%`
- `%%A4_BODY_1%%`
- `%%A4_BODY_2%%`
- `%%A4_BODY_3%%`
- `%%A4_BODY_3_MORE%%`
- `%%A4_BODY_4%%`
- `%%A4_BODY_4_MORE%%`
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
- `%%A4_FIELD_1%%`
- `%%A4_FIELD_2%%`
- `%%A4_FIELD_3%%`
- `%%A4_H2_1%%`
- `%%A4_H2_2%%`
- `%%A4_H2_3%%`
- `%%A4_H2_4%%`
- `%%A4_INTRO%%`
- `%%A4_MODIFIED%%`
- `%%A4_NOTE_MARK%%`
- `%%A4_NOTE_SUMMARY%%`
- `%%A4_NOTE_TEXT%%`
- `%%A4_NOTE_TITLE%%`
- `%%A4_PUBLISHED%%`
- `%%A4_SECTION_1_LABEL%%`
- `%%A4_SECTION_2_LABEL%%`
- `%%A4_SECTION_3_LABEL%%`
- `%%A4_SECTION_4_LABEL%%`
- `%%A4_SOURCE_LABEL%%`
- `%%A4_SOURCE_URL%%`
- `%%A4_SUMMARY%%`
- `%%A4_TITLE%%`
- `%%A4_VALUE_1%%`
- `%%A4_VALUE_2%%`
- `%%A4_VALUE_3%%`
- `%%A5_BODY_1%%`
- `%%A5_BODY_2%%`
- `%%A5_BODY_3%%`
- `%%A5_BODY_3_MORE%%`
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
- `%%A5_INTRO%%`
- `%%A5_MODIFIED%%`
- `%%A5_NOTE_TEXT%%`
- `%%A5_NOTE_TITLE%%`
- `%%A5_PUBLISHED%%`
- `%%A5_RSS_DATE%%`
- `%%A5_SECTION_1_LABEL%%`
- `%%A5_SECTION_2_LABEL%%`
- `%%A5_SECTION_3_LABEL%%`
- `%%A5_SOURCE_1_LABEL%%`
- `%%A5_SOURCE_1_NOTE%%`
- `%%A5_SOURCE_1_TEXT%%`
- `%%A5_SOURCE_1_TITLE%%`
- `%%A5_SOURCE_1_URL%%`
- `%%A5_SOURCE_2_LABEL%%`
- `%%A5_SOURCE_2_NOTE%%`
- `%%A5_SOURCE_2_TEXT%%`
- `%%A5_SOURCE_2_TITLE%%`
- `%%A5_SOURCE_2_URL%%`
- `%%A5_SOURCE_3_LABEL%%`
- `%%A5_SOURCE_3_NOTE%%`
- `%%A5_SOURCE_3_TEXT%%`
- `%%A5_SOURCE_3_TITLE%%`
- `%%A5_SOURCE_3_URL%%`
- `%%A5_SOURCE_LABEL%%`
- `%%A5_SOURCE_URL%%`
- `%%A5_SUMMARY%%`
- `%%A5_TITLE%%`
- `%%A6_BODY_1%%`
- `%%A6_BODY_2%%`
- `%%A6_BODY_3%%`
- `%%A6_BODY_3_MORE%%`
- `%%A6_BODY_4%%`
- `%%A6_BODY_4_MORE%%`
- `%%A6_CELL_1_TEXT%%`
- `%%A6_CELL_1_TITLE%%`
- `%%A6_CELL_2_TEXT%%`
- `%%A6_CELL_2_TITLE%%`
- `%%A6_CELL_3_TEXT%%`
- `%%A6_CELL_3_TITLE%%`
- `%%A6_CELL_4_TEXT%%`
- `%%A6_CELL_4_TITLE%%`
- `%%A6_CELL_5_TEXT%%`
- `%%A6_CELL_5_TITLE%%`
- `%%A6_CELL_6_TEXT%%`
- `%%A6_CELL_6_TITLE%%`
- `%%A6_CHECKED%%`
- `%%A6_CLOSE_TEXT%%`
- `%%A6_CLOSE_TITLE%%`
- `%%A6_COVER_ALT%%`
- `%%A6_COVER_CAPTION%%`
- `%%A6_EYEBROW%%`
- `%%A6_FAQ_A_1%%`
- `%%A6_FAQ_A_2%%`
- `%%A6_FAQ_Q_1%%`
- `%%A6_FAQ_Q_2%%`
- `%%A6_FAQ_TITLE%%`
- `%%A6_FOLIO_INTRO%%`
- `%%A6_FOLIO_MARK%%`
- `%%A6_H2_1%%`
- `%%A6_H2_2%%`
- `%%A6_H2_3%%`
- `%%A6_H2_4%%`
- `%%A6_INTRO%%`
- `%%A6_MODIFIED%%`
- `%%A6_NOTE_TEXT%%`
- `%%A6_NOTE_TITLE%%`
- `%%A6_PUBLISHED%%`
- `%%A6_RSS_DATE%%`
- `%%A6_SECTION_1_LABEL%%`
- `%%A6_SECTION_2_LABEL%%`
- `%%A6_SECTION_3_LABEL%%`
- `%%A6_SECTION_4_LABEL%%`
- `%%A6_SOURCE_LABEL%%`
- `%%A6_SOURCE_URL%%`
- `%%A6_SUMMARY%%`
- `%%A6_TITLE%%`
- `%%A7_BODY_1%%`
- `%%A7_BODY_2%%`
- `%%A7_BODY_3%%`
- `%%A7_BODY_3_MORE%%`
- `%%A7_CELL_1_2%%`
- `%%A7_CELL_1_3%%`
- `%%A7_CELL_2_2%%`
- `%%A7_CELL_2_3%%`
- `%%A7_CELL_3_2%%`
- `%%A7_CELL_3_3%%`
- `%%A7_CELL_4_2%%`
- `%%A7_CELL_4_3%%`
- `%%A7_CHECKED%%`
- `%%A7_CLOSE_TEXT%%`
- `%%A7_CLOSE_TITLE%%`
- `%%A7_COL_1%%`
- `%%A7_COL_2%%`
- `%%A7_COL_3%%`
- `%%A7_COVER_ALT%%`
- `%%A7_COVER_CAPTION%%`
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
- `%%A7_ROW_1%%`
- `%%A7_ROW_2%%`
- `%%A7_ROW_3%%`
- `%%A7_ROW_4%%`
- `%%A7_SECTION_1_LABEL%%`
- `%%A7_SECTION_2_LABEL%%`
- `%%A7_SECTION_3_LABEL%%`
- `%%A7_SOURCE_LABEL%%`
- `%%A7_SOURCE_URL%%`
- `%%A7_SUMMARY%%`
- `%%A7_TABLE_CAPTION%%`
- `%%A7_TABLE_LABEL%%`
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
- `%%A8_DEFINITION_1%%`
- `%%A8_DEFINITION_2%%`
- `%%A8_DEFINITION_3%%`
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
- `%%A8_RSS_DATE%%`
- `%%A8_SECTION_1_LABEL%%`
- `%%A8_SECTION_2_LABEL%%`
- `%%A8_SECTION_3_LABEL%%`
- `%%A8_SECTION_4_LABEL%%`
- `%%A8_SOURCE_LABEL%%`
- `%%A8_SOURCE_URL%%`
- `%%A8_SUMMARY%%`
- `%%A8_TERM_1%%`
- `%%A8_TERM_1_NOTE%%`
- `%%A8_TERM_2%%`
- `%%A8_TERM_2_NOTE%%`
- `%%A8_TERM_3%%`
- `%%A8_TERM_3_NOTE%%`
- `%%A8_TITLE%%`
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
- `%%A9_FIELD_1%%`
- `%%A9_FIELD_2%%`
- `%%A9_FIELD_3%%`
- `%%A9_H2_1%%`
- `%%A9_H2_2%%`
- `%%A9_H2_3%%`
- `%%A9_INTRO%%`
- `%%A9_MODIFIED%%`
- `%%A9_NOTE_TEXT%%`
- `%%A9_NOTE_TITLE%%`
- `%%A9_PUBLISHED%%`
- `%%A9_REVISION_1_TEXT%%`
- `%%A9_REVISION_1_TITLE%%`
- `%%A9_REVISION_2_TEXT%%`
- `%%A9_REVISION_2_TITLE%%`
- `%%A9_REVISION_3_TEXT%%`
- `%%A9_REVISION_3_TITLE%%`
- `%%A9_RSS_DATE%%`
- `%%A9_SECTION_1_LABEL%%`
- `%%A9_SECTION_2_LABEL%%`
- `%%A9_SECTION_3_LABEL%%`
- `%%A9_SOURCE_LABEL%%`
- `%%A9_SOURCE_URL%%`
- `%%A9_SUMMARY%%`
- `%%A9_TITLE%%`
- `%%A9_VALUE_1%%`
- `%%A9_VALUE_2%%`
- `%%A9_VALUE_3%%`
- `%%ABOUT_H2_1%%`
- `%%ABOUT_H2_2%%`
- `%%ABOUT_H2_3%%`
- `%%ABOUT_INTRO%%`
- `%%ABOUT_LABEL%%`
- `%%ABOUT_NOTE%%`
- `%%ABOUT_NOTE_TITLE%%`
- `%%ABOUT_TEXT_1%%`
- `%%ABOUT_TEXT_2%%`
- `%%ABOUT_TEXT_3%%`
- `%%ABOUT_UPDATED%%`
- `%%AFFILIATE_DISCLOSURE%%`
- `%%AFFILIATE_LABEL%%`
- `%%AFFILIATE_NOTE%%`
- `%%AFFILIATE_URL%%`
- `%%AUTHOR_BIO%%`
- `%%AUTHOR_NAME%%`
- `%%BENEFIT_DISCLAIMER%%`
- `%%BENEFIT_RATE%%`
- `%%BRAND_EN%%`
- `%%BRAND_LINE%%`
- `%%BRAND_MARK%%`
- `%%CONTACT_EMAIL%%`
- `%%CONTACT_H2_1%%`
- `%%CONTACT_H2_2%%`
- `%%CONTACT_H2_3%%`
- `%%CONTACT_INTRO%%`
- `%%CONTACT_LABEL%%`
- `%%CONTACT_NOTE%%`
- `%%CONTACT_NOTE_TITLE%%`
- `%%CONTACT_TEXT_1%%`
- `%%CONTACT_TEXT_2%%`
- `%%CONTACT_TEXT_3%%`
- `%%CONTACT_UPDATED%%`
- `%%CORRECTIONS_H2_1%%`
- `%%CORRECTIONS_H2_2%%`
- `%%CORRECTIONS_H2_3%%`
- `%%CORRECTIONS_INTRO%%`
- `%%CORRECTIONS_LABEL%%`
- `%%CORRECTIONS_NOTE%%`
- `%%CORRECTIONS_NOTE_TITLE%%`
- `%%CORRECTIONS_TEXT_1%%`
- `%%CORRECTIONS_TEXT_2%%`
- `%%CORRECTIONS_TEXT_3%%`
- `%%CORRECTIONS_UPDATED%%`
- `%%COVER_LINE%%`
- `%%COVER_SEAL%%`
- `%%DISCLAIMER_H2_1%%`
- `%%DISCLAIMER_H2_2%%`
- `%%DISCLAIMER_H2_3%%`
- `%%DISCLAIMER_INTRO%%`
- `%%DISCLAIMER_LABEL%%`
- `%%DISCLAIMER_NOTE%%`
- `%%DISCLAIMER_NOTE_TITLE%%`
- `%%DISCLAIMER_TEXT_1%%`
- `%%DISCLAIMER_TEXT_2%%`
- `%%DISCLAIMER_TEXT_3%%`
- `%%DISCLAIMER_UPDATED%%`
- `%%DISCLOSURE_H2_1%%`
- `%%DISCLOSURE_H2_2%%`
- `%%DISCLOSURE_H2_3%%`
- `%%DISCLOSURE_INTRO%%`
- `%%DISCLOSURE_LABEL%%`
- `%%DISCLOSURE_NOTE%%`
- `%%DISCLOSURE_NOTE_TITLE%%`
- `%%DISCLOSURE_TEXT_1%%`
- `%%DISCLOSURE_TEXT_2%%`
- `%%DISCLOSURE_TEXT_3%%`
- `%%DISCLOSURE_UPDATED%%`
- `%%EDITORIAL_H2_1%%`
- `%%EDITORIAL_H2_2%%`
- `%%EDITORIAL_H2_3%%`
- `%%EDITORIAL_INTRO%%`
- `%%EDITORIAL_LABEL%%`
- `%%EDITORIAL_NOTE%%`
- `%%EDITORIAL_NOTE_TITLE%%`
- `%%EDITORIAL_TEXT_1%%`
- `%%EDITORIAL_TEXT_2%%`
- `%%EDITORIAL_TEXT_3%%`
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
- `%%NOTE_LABEL%%`
- `%%NOTE_TEXT%%`
- `%%NOTE_TITLE%%`
- `%%PRIVACY_H2_1%%`
- `%%PRIVACY_H2_2%%`
- `%%PRIVACY_H2_3%%`
- `%%PRIVACY_INTRO%%`
- `%%PRIVACY_LABEL%%`
- `%%PRIVACY_NOTE%%`
- `%%PRIVACY_NOTE_TITLE%%`
- `%%PRIVACY_TEXT_1%%`
- `%%PRIVACY_TEXT_2%%`
- `%%PRIVACY_TEXT_3%%`
- `%%PRIVACY_UPDATED%%`
- `%%REGISTER_INTRO%%`
- `%%REGISTER_TITLE%%`
- `%%RISK_NOTE%%`
- `%%RULERS_INTRO%%`
- `%%RULERS_LABEL%%`
- `%%RULERS_TITLE%%`
- `%%RULE_1_TEXT%%`
- `%%RULE_1_TITLE%%`
- `%%RULE_2_TEXT%%`
- `%%RULE_2_TITLE%%`
- `%%RULE_3_TEXT%%`
- `%%RULE_3_TITLE%%`
- `%%RULE_4_TEXT%%`
- `%%RULE_4_TITLE%%`
- `%%SECURITY_EMAIL%%`
- `%%SECURITY_EXPIRES%%`
- `%%SEO_TITLE%%`
- `%%SITE_DESC%%`
- `%%SITE_DOMAIN%%`
- `%%SITE_NAME%%`
- `%%SITE_TAGLINE%%`
- `%%VOLUMES_INTRO%%`
- `%%VOLUMES_TITLE%%`
- `%%VOLUME_1_INTRO%%`
- `%%VOLUME_1_LABEL%%`
- `%%VOLUME_1_NOTE%%`
- `%%VOLUME_1_NOTE_TITLE%%`
- `%%VOLUME_2_INTRO%%`
- `%%VOLUME_2_LABEL%%`
- `%%VOLUME_2_NOTE%%`
- `%%VOLUME_2_NOTE_TITLE%%`
- `%%VOLUME_3_INTRO%%`
- `%%VOLUME_3_LABEL%%`
- `%%VOLUME_3_NOTE%%`
- `%%VOLUME_3_NOTE_TITLE%%`
