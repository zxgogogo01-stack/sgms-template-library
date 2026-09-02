# 011-harbor-column

## 定位

港湾编辑部专栏：深海蓝固定船坞、暖纸港刊、信号橙航标、潮位刻度与不对称报纸编排。它保留旧模板的作者型专栏气质，但已预搭完整网站框架；不使用卡片 SaaS 皮，也不复制 010 的工业砖墙结构。

## 页面职责

- 首页采用形态 A：首屏展示邀请码、真复制按钮、弹性利益点与脚注，首页没有交易平台直链；“编辑放在封面的读物”是唯一注册内容入口。
- 港刊总表承载 12 个文章槽位；各文章按 permit、chart、check、forecast、watch、signal、manifest、tide、drill、review、bridge、ledger 十二种编排变化。
- 三座主题码头为“靠岸码头 / 航务码头 / 值守码头”，每座收录四篇文章，文章能返回所属码头。
- 水尺房包含五个真实本地算法：双语阅读时长、Markdown 标题跨级、摘要长度、复核日期排程、来源比例。
- 七个独立合规页面、404、sitemap、RSS、安全联系与整套图标/社交图已经接好。

## 后续 AI 只做文字

1. 先全局替换站点变量，再填写各页文字变量；不要改 class、CSS、JS、路径、页面数量与工具算法。
2. dispatches/harbor-entry-permit.html 是 registrationGuide。这里只写经核实的注册内容，保留且只保留一个 %AFFILIATE_URL%，发布前核对目的地、邀请码、披露和适用地区。
3. 其余文章、工具、合规、列表、分类、导航、页脚与 404 不添加推广直链。首页若要改形态 B，必须在具体建站流程另获授权。
4. 文章变量按页码独立命名；章节数、目录、问答、表格、引文与侧栏已按文章结构错开，不要再把它们统一成同一种正文模板。
5. 工具说明只填写真实用途、算法解释与限制。工具均为纯前端本地运算，不要写成实时 API 或外部数据源。
6. 更正页三条记录、作者笔名、编辑规则、日期和地区风险说明必须按单站事实填写，不得编造经历或平台规则。

## 文件分工

- css/style.css：完整色彩、船坞布局、文章变体、工具仪表与响应式。
- js/site.js：主题、邀请码复制、首页筛选、五件工具、结果复制与重置。
- assets/covers/：12 套独立的 1200×630 PNG/WebP 港湾图形封面。

## 完整变量清单

- %ABOUT_DECK%
- %ABOUT_SECTION_01%
- %ABOUT_SECTION_02%
- %ABOUT_SECTION_03%
- %AFFILIATE_DISCLOSURE%
- %AFFILIATE_LINK_LABEL%
- %AFFILIATE_URL%
- %ARTICLE_01_ANSWER_01%
- %ARTICLE_01_ANSWER_02%
- %ARTICLE_01_CAPTION%
- %ARTICLE_01_FAQ_TITLE%
- %ARTICLE_01_H2_01%
- %ARTICLE_01_H2_02%
- %ARTICLE_01_H2_03%
- %ARTICLE_01_H2_04%
- %ARTICLE_01_H2_05%
- %ARTICLE_01_H2_06%
- %ARTICLE_01_LEDE%
- %ARTICLE_01_QUESTION_01%
- %ARTICLE_01_QUESTION_02%
- %ARTICLE_01_SECTION_01%
- %ARTICLE_01_SECTION_02%
- %ARTICLE_01_SECTION_03%
- %ARTICLE_01_SECTION_04%
- %ARTICLE_01_SECTION_05%
- %ARTICLE_01_SECTION_06%
- %ARTICLE_01_SIGNOFF%
- %ARTICLE_02_CAPTION%
- %ARTICLE_02_FACT_A_LABEL%
- %ARTICLE_02_FACT_A_VALUE%
- %ARTICLE_02_FACT_B_LABEL%
- %ARTICLE_02_FACT_B_VALUE%
- %ARTICLE_02_FACT_NOTE%
- %ARTICLE_02_H2_01%
- %ARTICLE_02_H2_02%
- %ARTICLE_02_H2_03%
- %ARTICLE_02_H2_04%
- %ARTICLE_02_H2_05%
- %ARTICLE_02_H2_06%
- %ARTICLE_02_H2_07%
- %ARTICLE_02_LEDE%
- %ARTICLE_02_SECTION_01%
- %ARTICLE_02_SECTION_02%
- %ARTICLE_02_SECTION_03%
- %ARTICLE_02_SECTION_04%
- %ARTICLE_02_SECTION_05%
- %ARTICLE_02_SECTION_06%
- %ARTICLE_02_SECTION_07%
- %ARTICLE_02_SIGNOFF%
- %ARTICLE_03_CAPTION%
- %ARTICLE_03_H2_01%
- %ARTICLE_03_H2_02%
- %ARTICLE_03_H2_03%
- %ARTICLE_03_H2_04%
- %ARTICLE_03_H2_05%
- %ARTICLE_03_LEDE%
- %ARTICLE_03_SECTION_01%
- %ARTICLE_03_SECTION_02%
- %ARTICLE_03_SECTION_03%
- %ARTICLE_03_SECTION_04%
- %ARTICLE_03_SECTION_05%
- %ARTICLE_03_SIGNOFF%
- %ARTICLE_03_STEP_A%
- %ARTICLE_03_STEP_B%
- %ARTICLE_03_STEP_C%
- %ARTICLE_04_ANSWER_01%
- %ARTICLE_04_ANSWER_02%
- %ARTICLE_04_CAPTION%
- %ARTICLE_04_FAQ_TITLE%
- %ARTICLE_04_H2_01%
- %ARTICLE_04_H2_02%
- %ARTICLE_04_H2_03%
- %ARTICLE_04_H2_04%
- %ARTICLE_04_LEDE%
- %ARTICLE_04_MOMENT_A%
- %ARTICLE_04_MOMENT_B%
- %ARTICLE_04_MOMENT_C%
- %ARTICLE_04_QUESTION_01%
- %ARTICLE_04_QUESTION_02%
- %ARTICLE_04_SECTION_01%
- %ARTICLE_04_SECTION_02%
- %ARTICLE_04_SECTION_03%
- %ARTICLE_04_SECTION_04%
- %ARTICLE_04_SIGNOFF%
- %ARTICLE_05_CAPTION%
- %ARTICLE_05_H2_01%
- %ARTICLE_05_H2_02%
- %ARTICLE_05_H2_03%
- %ARTICLE_05_H2_04%
- %ARTICLE_05_H2_05%
- %ARTICLE_05_H2_06%
- %ARTICLE_05_LEDE%
- %ARTICLE_05_SECTION_01%
- %ARTICLE_05_SECTION_02%
- %ARTICLE_05_SECTION_03%
- %ARTICLE_05_SECTION_04%
- %ARTICLE_05_SECTION_05%
- %ARTICLE_05_SECTION_06%
- %ARTICLE_05_SIDEBAR_BODY%
- %ARTICLE_05_SIDEBAR_TITLE%
- %ARTICLE_05_SIGNOFF%
- %ARTICLE_06_CAPTION%
- %ARTICLE_06_H2_01%
- %ARTICLE_06_H2_02%
- %ARTICLE_06_H2_03%
- %ARTICLE_06_H2_04%
- %ARTICLE_06_LEDE%
- %ARTICLE_06_PULLQUOTE%
- %ARTICLE_06_SECTION_01%
- %ARTICLE_06_SECTION_02%
- %ARTICLE_06_SECTION_03%
- %ARTICLE_06_SECTION_04%
- %ARTICLE_06_SIGNOFF%
- %ARTICLE_07_CAPTION%
- %ARTICLE_07_H2_01%
- %ARTICLE_07_H2_02%
- %ARTICLE_07_H2_03%
- %ARTICLE_07_H2_04%
- %ARTICLE_07_H2_05%
- %ARTICLE_07_LEDE%
- %ARTICLE_07_SECTION_01%
- %ARTICLE_07_SECTION_02%
- %ARTICLE_07_SECTION_03%
- %ARTICLE_07_SECTION_04%
- %ARTICLE_07_SECTION_05%
- %ARTICLE_07_SIGNOFF%
- %ARTICLE_07_TABLE_A1%
- %ARTICLE_07_TABLE_A2%
- %ARTICLE_07_TABLE_A3%
- %ARTICLE_07_TABLE_B1%
- %ARTICLE_07_TABLE_B2%
- %ARTICLE_07_TABLE_B3%
- %ARTICLE_07_TABLE_H1%
- %ARTICLE_07_TABLE_H2%
- %ARTICLE_07_TABLE_H3%
- %ARTICLE_08_CAPTION%
- %ARTICLE_08_H2_01%
- %ARTICLE_08_H2_02%
- %ARTICLE_08_H2_03%
- %ARTICLE_08_H2_04%
- %ARTICLE_08_LEDE%
- %ARTICLE_08_MOMENT_A%
- %ARTICLE_08_MOMENT_B%
- %ARTICLE_08_MOMENT_C%
- %ARTICLE_08_SECTION_01%
- %ARTICLE_08_SECTION_02%
- %ARTICLE_08_SECTION_03%
- %ARTICLE_08_SECTION_04%
- %ARTICLE_08_SIGNOFF%
- %ARTICLE_09_ANSWER_01%
- %ARTICLE_09_ANSWER_02%
- %ARTICLE_09_CAPTION%
- %ARTICLE_09_FAQ_TITLE%
- %ARTICLE_09_H2_01%
- %ARTICLE_09_H2_02%
- %ARTICLE_09_H2_03%
- %ARTICLE_09_H2_04%
- %ARTICLE_09_H2_05%
- %ARTICLE_09_LEDE%
- %ARTICLE_09_QUESTION_01%
- %ARTICLE_09_QUESTION_02%
- %ARTICLE_09_SECTION_01%
- %ARTICLE_09_SECTION_02%
- %ARTICLE_09_SECTION_03%
- %ARTICLE_09_SECTION_04%
- %ARTICLE_09_SECTION_05%
- %ARTICLE_09_SIGNOFF%
- %ARTICLE_09_STEP_A%
- %ARTICLE_09_STEP_B%
- %ARTICLE_09_STEP_C%
- %ARTICLE_10_CAPTION%
- %ARTICLE_10_H2_01%
- %ARTICLE_10_H2_02%
- %ARTICLE_10_H2_03%
- %ARTICLE_10_H2_04%
- %ARTICLE_10_H2_05%
- %ARTICLE_10_H2_06%
- %ARTICLE_10_LEDE%
- %ARTICLE_10_SECTION_01%
- %ARTICLE_10_SECTION_02%
- %ARTICLE_10_SECTION_03%
- %ARTICLE_10_SECTION_04%
- %ARTICLE_10_SECTION_05%
- %ARTICLE_10_SECTION_06%
- %ARTICLE_10_SIDEBAR_BODY%
- %ARTICLE_10_SIDEBAR_TITLE%
- %ARTICLE_10_SIGNOFF%
- %ARTICLE_11_CAPTION%
- %ARTICLE_11_H2_01%
- %ARTICLE_11_H2_02%
- %ARTICLE_11_H2_03%
- %ARTICLE_11_H2_04%
- %ARTICLE_11_LEDE%
- %ARTICLE_11_PULLQUOTE%
- %ARTICLE_11_SECTION_01%
- %ARTICLE_11_SECTION_02%
- %ARTICLE_11_SECTION_03%
- %ARTICLE_11_SECTION_04%
- %ARTICLE_11_SIGNOFF%
- %ARTICLE_12_CAPTION%
- %ARTICLE_12_H2_01%
- %ARTICLE_12_H2_02%
- %ARTICLE_12_H2_03%
- %ARTICLE_12_H2_04%
- %ARTICLE_12_H2_05%
- %ARTICLE_12_LEDE%
- %ARTICLE_12_LEDGER_A%
- %ARTICLE_12_LEDGER_A_BODY%
- %ARTICLE_12_LEDGER_B%
- %ARTICLE_12_LEDGER_B_BODY%
- %ARTICLE_12_SECTION_01%
- %ARTICLE_12_SECTION_02%
- %ARTICLE_12_SECTION_03%
- %ARTICLE_12_SECTION_04%
- %ARTICLE_12_SECTION_05%
- %ARTICLE_12_SIGNOFF%
- %ARTICLE_DESC_01%
- %ARTICLE_DESC_02%
- %ARTICLE_DESC_03%
- %ARTICLE_DESC_04%
- %ARTICLE_DESC_05%
- %ARTICLE_DESC_06%
- %ARTICLE_DESC_07%
- %ARTICLE_DESC_08%
- %ARTICLE_DESC_09%
- %ARTICLE_DESC_10%
- %ARTICLE_DESC_11%
- %ARTICLE_DESC_12%
- %ARTICLE_INDEX_INTRO%
- %ARTICLE_TITLE_01%
- %ARTICLE_TITLE_02%
- %ARTICLE_TITLE_03%
- %ARTICLE_TITLE_04%
- %ARTICLE_TITLE_05%
- %ARTICLE_TITLE_06%
- %ARTICLE_TITLE_07%
- %ARTICLE_TITLE_08%
- %ARTICLE_TITLE_09%
- %ARTICLE_TITLE_10%
- %ARTICLE_TITLE_11%
- %ARTICLE_TITLE_12%
- %AUTHOR_NAME%
- %BENEFIT_DISCLAIMER%
- %BENEFIT_RATE%
- %BRAND_EN%
- %CONTACT_DECK%
- %CONTACT_EMAIL%
- %CONTACT_SECTION_01%
- %CONTACT_SECTION_02%
- %CONTACT_SECTION_03%
- %CORRECTIONS_DECK%
- %CORRECTIONS_SECTION_01%
- %CORRECTIONS_SECTION_02%
- %CORRECTIONS_SECTION_03%
- %DATE_MODIFIED%
- %DATE_PUBLISHED%
- %DISCLAIMER_DECK%
- %DISCLAIMER_SECTION_01%
- %DISCLAIMER_SECTION_02%
- %DISCLAIMER_SECTION_03%
- %DISCLOSURE_DECK%
- %DISCLOSURE_SECTION_01%
- %DISCLOSURE_SECTION_02%
- %DISCLOSURE_SECTION_03%
- %EDITORIAL_DECK%
- %EDITORIAL_SECTION_01%
- %EDITORIAL_SECTION_02%
- %EDITORIAL_SECTION_03%
- %FEED_SUMMARY_01%
- %FEED_SUMMARY_02%
- %FEED_SUMMARY_03%
- %FEED_SUMMARY_04%
- %FEED_SUMMARY_05%
- %FEED_SUMMARY_06%
- %FEED_SUMMARY_07%
- %FEED_SUMMARY_08%
- %FEED_SUMMARY_09%
- %FEED_SUMMARY_10%
- %HOME_KICKER%
- %HOME_TITLE%
- %INVITE_CODE%
- %ISSUE_LABEL%
- %LANG%
- %PIER_A_INTRO%
- %PIER_B_INTRO%
- %PIER_C_INTRO%
- %PRIVACY_DECK%
- %PRIVACY_SECTION_01%
- %PRIVACY_SECTION_02%
- %PRIVACY_SECTION_03%
- %REGISTRATION_LINK_CONTEXT%
- %REGISTRATION_LINK_HEADING%
- %SECURITY_EXPIRES%
- %SITE_DESC%
- %SITE_DOMAIN%
- %SITE_NAME%
- %SITE_TAGLINE%
- %TOOL_01_GUIDE_01%
- %TOOL_01_GUIDE_02%
- %TOOL_01_GUIDE_03%
- %TOOL_01_GUIDE_04%
- %TOOL_01_GUIDE_05%
- %TOOL_02_GUIDE_01%
- %TOOL_02_GUIDE_02%
- %TOOL_02_GUIDE_03%
- %TOOL_02_GUIDE_04%
- %TOOL_02_GUIDE_05%
- %TOOL_03_GUIDE_01%
- %TOOL_03_GUIDE_02%
- %TOOL_03_GUIDE_03%
- %TOOL_03_GUIDE_04%
- %TOOL_03_GUIDE_05%
- %TOOL_04_GUIDE_01%
- %TOOL_04_GUIDE_02%
- %TOOL_04_GUIDE_03%
- %TOOL_04_GUIDE_04%
- %TOOL_04_GUIDE_05%
- %TOOL_05_GUIDE_01%
- %TOOL_05_GUIDE_02%
- %TOOL_05_GUIDE_03%
- %TOOL_05_GUIDE_04%
- %TOOL_05_GUIDE_05%
- %TOOL_INDEX_INTRO%

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "article.html",
  "articles": [
    "dispatches/harbor-entry-permit.html",
    "dispatches/fee-current-chart.html",
    "dispatches/identity-mooring-check.html",
    "dispatches/transfer-weather-log.html",
    "dispatches/custody-watch-notes.html",
    "dispatches/recovery-signal-card.html",
    "dispatches/evidence-cargo-list.html",
    "dispatches/policy-tide-table.html",
    "dispatches/account-safety-drill.html",
    "dispatches/source-depth-review.html",
    "dispatches/dispute-bridge-log.html",
    "dispatches/monthly-harbor-reset.html"
  ],
  "cornerstones": [
    "dispatches/harbor-entry-permit.html",
    "dispatches/fee-current-chart.html"
  ],
  "registrationGuide": "dispatches/harbor-entry-permit.html",
  "articleCovers": {
    "dispatches/harbor-entry-permit.html": {
      "display": "assets/covers/harbor-entry-permit.webp",
      "og": "assets/covers/harbor-entry-permit.png"
    },
    "dispatches/fee-current-chart.html": {
      "display": "assets/covers/fee-current-chart.webp",
      "og": "assets/covers/fee-current-chart.png"
    },
    "dispatches/identity-mooring-check.html": {
      "display": "assets/covers/identity-mooring-check.webp",
      "og": "assets/covers/identity-mooring-check.png"
    },
    "dispatches/transfer-weather-log.html": {
      "display": "assets/covers/transfer-weather-log.webp",
      "og": "assets/covers/transfer-weather-log.png"
    },
    "dispatches/custody-watch-notes.html": {
      "display": "assets/covers/custody-watch-notes.webp",
      "og": "assets/covers/custody-watch-notes.png"
    },
    "dispatches/recovery-signal-card.html": {
      "display": "assets/covers/recovery-signal-card.webp",
      "og": "assets/covers/recovery-signal-card.png"
    },
    "dispatches/evidence-cargo-list.html": {
      "display": "assets/covers/evidence-cargo-list.webp",
      "og": "assets/covers/evidence-cargo-list.png"
    },
    "dispatches/policy-tide-table.html": {
      "display": "assets/covers/policy-tide-table.webp",
      "og": "assets/covers/policy-tide-table.png"
    },
    "dispatches/account-safety-drill.html": {
      "display": "assets/covers/account-safety-drill.webp",
      "og": "assets/covers/account-safety-drill.png"
    },
    "dispatches/source-depth-review.html": {
      "display": "assets/covers/source-depth-review.webp",
      "og": "assets/covers/source-depth-review.png"
    },
    "dispatches/dispute-bridge-log.html": {
      "display": "assets/covers/dispute-bridge-log.webp",
      "og": "assets/covers/dispute-bridge-log.png"
    },
    "dispatches/monthly-harbor-reset.html": {
      "display": "assets/covers/monthly-harbor-reset.webp",
      "og": "assets/covers/monthly-harbor-reset.png"
    }
  },
  "categories": [
    {
      "path": "berths/approach-pier.html",
      "label": "靠岸码头",
      "articles": [
        "dispatches/harbor-entry-permit.html",
        "dispatches/identity-mooring-check.html",
        "dispatches/recovery-signal-card.html",
        "dispatches/account-safety-drill.html"
      ]
    },
    {
      "path": "berths/operations-pier.html",
      "label": "航务码头",
      "articles": [
        "dispatches/fee-current-chart.html",
        "dispatches/transfer-weather-log.html",
        "dispatches/evidence-cargo-list.html",
        "dispatches/source-depth-review.html"
      ]
    },
    {
      "path": "berths/records-pier.html",
      "label": "值守码头",
      "articles": [
        "dispatches/custody-watch-notes.html",
        "dispatches/policy-tide-table.html",
        "dispatches/dispute-bridge-log.html",
        "dispatches/monthly-harbor-reset.html"
      ]
    }
  ],
  "toolIndex": "tool.html",
  "tools": [
    "instruments/readtime-gauge.html",
    "instruments/heading-depth-check.html",
    "instruments/excerpt-draught.html",
    "instruments/review-watch.html",
    "instruments/source-ballast.html"
  ],
  "legal": {
    "about": "about.html",
    "contact": "contact.html",
    "disclosure": "disclosure.html",
    "disclaimer": "legal.html",
    "privacy": "privacy.html",
    "corrections": "corrections.html",
    "editorial": "editorial.html"
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
    "siteDomain": "%SITE_DOMAIN%",
    "siteName": "%SITE_NAME%",
    "wordmark": "%BRAND_EN%",
    "inviteCode": "%INVITE_CODE%",
    "benefitRate": "%BENEFIT_RATE%",
    "benefitDisclaimer": "%BENEFIT_DISCLAIMER%",
    "affiliateUrl": "%AFFILIATE_URL%"
  }
}
```
