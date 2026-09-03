# 033 — Ledger Loom / 织机台账

这是一套 workflow-ready v2 的高端经营账页模板。视觉语言来自织机的经线、纬带、梭子和布边：暖象牙纸、深茄紫、陈铜与灰青构成独立的编辑识别，不复用上一套章程装订或前一套数据报纸的结构。

后续 AI 只需替换站点变量、经核验的文字、来源与文章正文，不需要重建 UI、导航、响应式、SEO、封面、分类、法律页或工具逻辑。变量只是内容接入口，不代表已经核验的事实。

## 已完成框架

- 首页形态 A：首屏明文邀请码、复制真功能、弹性利益点、政策脚注及编辑式访问页入口；首页没有外部推广直链。
- 十二种文章织法、三本独立经纬册、五件纯本地经营工具、七个合规页、404、RSS、安全联系、图标、社交图及十二套独立 1200×630 PNG/WebP 封面。
- 五工具覆盖正常、错误、边界、重置、复制和输入后旧结果失效；不加载外部依赖，不宣称实时数据。

## 访问页边界

`folios/access-folio.html` 只提供内容与 UI 外壳，不含注册步骤、平台规则、费率或监管事实。页面恰好保留一个静态 `AFFILIATE_URL` href，并带 `target=_blank` 与完整 sponsored/nofollow/noopener/noreferrer 属性，紧邻可见推广披露。其余页面没有推广直链。

## 内容接入顺序

1. 替换站名、域名、英文 wordmark、作者、联系方式、日期、邀请码、利益比例和脚注。
2. 按事实调研填写十二篇文字；保留十二种内容结构。数字、费用、限制和监管结论必须附来源与核验日期。
3. 只替换文字、链接和 alt；保留 class、data 属性、DOM 主骨架、表单 id、ARIA、封面尺寸及脚本引用。
4. 默认保持首页形态 A；任何形态或推广策略改变均留给单站工作流。
5. 内容完成后重跑三套静态审计和相似度检查，并在桌面、390px、360px 实测 31 条路由、首页复制/主题/菜单/筛选、五工具所有状态、访问链接属性和 404 出口。

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "article.html",
  "articles": [
    "folios/opening-balance.html",
    "folios/cashflow-weave.html",
    "folios/double-entry.html",
    "folios/invoice-anatomy.html",
    "folios/variance-ribbons.html",
    "folios/cost-patches.html",
    "folios/reconciliation.html",
    "folios/margin-notes.html",
    "folios/quarterly-staircase.html",
    "folios/founder-ledger.html",
    "folios/glossary-swatches.html",
    "folios/access-folio.html"
  ],
  "cornerstones": [
    "folios/opening-balance.html",
    "folios/reconciliation.html"
  ],
  "registrationGuide": "folios/access-folio.html",
  "articleCovers": {
    "folios/opening-balance.html": {
      "display": "assets/covers/opening-balance.webp",
      "og": "assets/covers/opening-balance.png"
    },
    "folios/cashflow-weave.html": {
      "display": "assets/covers/cashflow-weave.webp",
      "og": "assets/covers/cashflow-weave.png"
    },
    "folios/double-entry.html": {
      "display": "assets/covers/double-entry.webp",
      "og": "assets/covers/double-entry.png"
    },
    "folios/invoice-anatomy.html": {
      "display": "assets/covers/invoice-anatomy.webp",
      "og": "assets/covers/invoice-anatomy.png"
    },
    "folios/variance-ribbons.html": {
      "display": "assets/covers/variance-ribbons.webp",
      "og": "assets/covers/variance-ribbons.png"
    },
    "folios/cost-patches.html": {
      "display": "assets/covers/cost-patches.webp",
      "og": "assets/covers/cost-patches.png"
    },
    "folios/reconciliation.html": {
      "display": "assets/covers/reconciliation.webp",
      "og": "assets/covers/reconciliation.png"
    },
    "folios/margin-notes.html": {
      "display": "assets/covers/margin-notes.webp",
      "og": "assets/covers/margin-notes.png"
    },
    "folios/quarterly-staircase.html": {
      "display": "assets/covers/quarterly-staircase.webp",
      "og": "assets/covers/quarterly-staircase.png"
    },
    "folios/founder-ledger.html": {
      "display": "assets/covers/founder-ledger.webp",
      "og": "assets/covers/founder-ledger.png"
    },
    "folios/glossary-swatches.html": {
      "display": "assets/covers/glossary-swatches.webp",
      "og": "assets/covers/glossary-swatches.png"
    },
    "folios/access-folio.html": {
      "display": "assets/covers/access-folio.webp",
      "og": "assets/covers/access-folio.png"
    }
  },
  "categories": [
    {
      "path": "books/receipts.html",
      "label": "收支经纬",
      "articles": [
        "folios/opening-balance.html",
        "folios/cashflow-weave.html",
        "folios/double-entry.html",
        "folios/invoice-anatomy.html"
      ]
    },
    {
      "path": "books/reconciliation.html",
      "label": "核对纬带",
      "articles": [
        "folios/variance-ribbons.html",
        "folios/cost-patches.html",
        "folios/reconciliation.html",
        "folios/margin-notes.html"
      ]
    },
    {
      "path": "books/decisions.html",
      "label": "经营梭路",
      "articles": [
        "folios/quarterly-staircase.html",
        "folios/founder-ledger.html",
        "folios/glossary-swatches.html",
        "folios/access-folio.html"
      ]
    }
  ],
  "toolIndex": "tool.html",
  "tools": [
    "loomroom/runway-calculator.html",
    "loomroom/break-even-calculator.html",
    "loomroom/due-date-scheduler.html",
    "loomroom/reconciliation-matcher.html",
    "loomroom/allocation-splitter.html"
  ],
  "legal": {
    "about": "about.html",
    "contact": "contact.html",
    "disclosure": "legal.html",
    "disclaimer": "disclaimer.html",
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
    "siteDomain": "__SITE_DOMAIN__",
    "siteName": "__SITE_NAME__",
    "wordmark": "__BRAND_EN__",
    "inviteCode": "__INVITE_CODE__",
    "benefitRate": "__BENEFIT_RATE__",
    "benefitDisclaimer": "__BENEFIT_DISCLAIMER__",
    "affiliateUrl": "__AFFILIATE_URL__"
  }
}
```

## 变量清单

- `__ABOUT_CONTACT_NOTE__`
- `__ABOUT_DESCRIPTION__`
- `__ABOUT_INTRODUCTION__`
- `__ABOUT_SECTION_1_BODY__`
- `__ABOUT_SECTION_1_TITLE__`
- `__ABOUT_SECTION_2_BODY__`
- `__ABOUT_SECTION_2_TITLE__`
- `__ABOUT_SECTION_3_BODY__`
- `__ABOUT_SECTION_3_TITLE__`
- `__ABOUT_TITLE__`
- `__ACCESS_COVER_ALT__`
- `__ACCESS_COVER_CAPTION__`
- `__ACCESS_DECK__`
- `__ACCESS_DESCRIPTION__`
- `__ACCESS_FACT_1_LABEL__`
- `__ACCESS_FACT_1_VALUE__`
- `__ACCESS_FACT_2_LABEL__`
- `__ACCESS_FACT_2_VALUE__`
- `__ACCESS_FAQ_ANSWER__`
- `__ACCESS_FAQ_QUESTION__`
- `__ACCESS_READING_TIME__`
- `__ACCESS_SECTION_1_BODY__`
- `__ACCESS_SECTION_1_TITLE__`
- `__ACCESS_SECTION_2_BODY__`
- `__ACCESS_SECTION_2_TITLE__`
- `__ACCESS_SECTION_3_BODY__`
- `__ACCESS_SECTION_3_TITLE__`
- `__ACCESS_SECTION_4_BODY__`
- `__ACCESS_SECTION_4_TITLE__`
- `__ACCESS_SECTION_5_BODY__`
- `__ACCESS_SECTION_5_TITLE__`
- `__ACCESS_SOURCE_NOTE__`
- `__ACCESS_TITLE__`
- `__AFFILIATE_DISCLOSURE__`
- `__AFFILIATE_LINK_LABEL__`
- `__AFFILIATE_URL__`
- `__ALLOCATE_GUIDE_BOUNDARY__`
- `__ALLOCATE_GUIDE_INPUT__`
- `__ALLOCATE_GUIDE_METHOD__`
- `__ALLOCATE_GUIDE_PRIVACY__`
- `__ALLOCATE_GUIDE_RESULT__`
- `__ALLOCATE_TOOL_DESCRIPTION__`
- `__ALLOCATE_TOOL_INTRODUCTION__`
- `__ALLOCATE_TOOL_TITLE__`
- `__ARTICLE_INDEX_DESCRIPTION__`
- `__ARTICLE_INDEX_INTRODUCTION__`
- `__ARTICLE_INDEX_TITLE__`
- `__AUTHOR_NAME__`
- `__BENEFIT_DISCLAIMER__`
- `__BENEFIT_RATE__`
- `__BRAND_EN__`
- `__BREAKEVEN_GUIDE_BOUNDARY__`
- `__BREAKEVEN_GUIDE_INPUT__`
- `__BREAKEVEN_GUIDE_METHOD__`
- `__BREAKEVEN_GUIDE_PRIVACY__`
- `__BREAKEVEN_GUIDE_RESULT__`
- `__BREAKEVEN_TOOL_DESCRIPTION__`
- `__BREAKEVEN_TOOL_INTRODUCTION__`
- `__BREAKEVEN_TOOL_TITLE__`
- `__CASHFLOW_COVER_ALT__`
- `__CASHFLOW_COVER_CAPTION__`
- `__CASHFLOW_DECK__`
- `__CASHFLOW_DESCRIPTION__`
- `__CASHFLOW_FAQ_ANSWER__`
- `__CASHFLOW_FAQ_QUESTION__`
- `__CASHFLOW_READING_TIME__`
- `__CASHFLOW_SECTION_1_BODY__`
- `__CASHFLOW_SECTION_1_TITLE__`
- `__CASHFLOW_SECTION_2_BODY__`
- `__CASHFLOW_SECTION_2_TITLE__`
- `__CASHFLOW_SECTION_3_BODY__`
- `__CASHFLOW_SECTION_3_TITLE__`
- `__CASHFLOW_SECTION_4_BODY__`
- `__CASHFLOW_SECTION_4_TITLE__`
- `__CASHFLOW_SECTION_5_BODY__`
- `__CASHFLOW_SECTION_5_TITLE__`
- `__CASHFLOW_SOURCE_NOTE__`
- `__CASHFLOW_TITLE__`
- `__CONTACT_CONTACT_NOTE__`
- `__CONTACT_DESCRIPTION__`
- `__CONTACT_EMAIL__`
- `__CONTACT_INTRODUCTION__`
- `__CONTACT_SECTION_1_BODY__`
- `__CONTACT_SECTION_1_TITLE__`
- `__CONTACT_SECTION_2_BODY__`
- `__CONTACT_SECTION_2_TITLE__`
- `__CONTACT_SECTION_3_BODY__`
- `__CONTACT_SECTION_3_TITLE__`
- `__CONTACT_TITLE__`
- `__CORRECTIONS_CONTACT_NOTE__`
- `__CORRECTIONS_DESCRIPTION__`
- `__CORRECTIONS_INTRODUCTION__`
- `__CORRECTIONS_SECTION_1_BODY__`
- `__CORRECTIONS_SECTION_1_TITLE__`
- `__CORRECTIONS_SECTION_2_BODY__`
- `__CORRECTIONS_SECTION_2_TITLE__`
- `__CORRECTIONS_SECTION_3_BODY__`
- `__CORRECTIONS_SECTION_3_TITLE__`
- `__CORRECTIONS_TITLE__`
- `__COST_COVER_ALT__`
- `__COST_COVER_CAPTION__`
- `__COST_DECK__`
- `__COST_DESCRIPTION__`
- `__COST_FAQ_ANSWER__`
- `__COST_FAQ_QUESTION__`
- `__COST_READING_TIME__`
- `__COST_SECTION_1_BODY__`
- `__COST_SECTION_1_TITLE__`
- `__COST_SECTION_2_BODY__`
- `__COST_SECTION_2_TITLE__`
- `__COST_SECTION_3_BODY__`
- `__COST_SECTION_3_TITLE__`
- `__COST_SECTION_4_BODY__`
- `__COST_SECTION_4_TITLE__`
- `__COST_SECTION_5_BODY__`
- `__COST_SECTION_5_TITLE__`
- `__COST_SOURCE_NOTE__`
- `__COST_TITLE__`
- `__DECISIONS_BOOK_DESCRIPTION__`
- `__DECISIONS_BOOK_INTRODUCTION__`
- `__DECISIONS_BOOK_TITLE__`
- `__DISCLAIMER_CONTACT_NOTE__`
- `__DISCLAIMER_DESCRIPTION__`
- `__DISCLAIMER_INTRODUCTION__`
- `__DISCLAIMER_SECTION_1_BODY__`
- `__DISCLAIMER_SECTION_1_TITLE__`
- `__DISCLAIMER_SECTION_2_BODY__`
- `__DISCLAIMER_SECTION_2_TITLE__`
- `__DISCLAIMER_SECTION_3_BODY__`
- `__DISCLAIMER_SECTION_3_TITLE__`
- `__DISCLAIMER_TITLE__`
- `__DISCLOSURE_CONTACT_NOTE__`
- `__DISCLOSURE_DESCRIPTION__`
- `__DISCLOSURE_INTRODUCTION__`
- `__DISCLOSURE_SECTION_1_BODY__`
- `__DISCLOSURE_SECTION_1_TITLE__`
- `__DISCLOSURE_SECTION_2_BODY__`
- `__DISCLOSURE_SECTION_2_TITLE__`
- `__DISCLOSURE_SECTION_3_BODY__`
- `__DISCLOSURE_SECTION_3_TITLE__`
- `__DISCLOSURE_TITLE__`
- `__DOUBLE_BALANCE_NOTE__`
- `__DOUBLE_COVER_ALT__`
- `__DOUBLE_COVER_CAPTION__`
- `__DOUBLE_DECK__`
- `__DOUBLE_DESCRIPTION__`
- `__DOUBLE_FAQ_ANSWER__`
- `__DOUBLE_FAQ_QUESTION__`
- `__DOUBLE_READING_TIME__`
- `__DOUBLE_SECTION_1_BODY__`
- `__DOUBLE_SECTION_1_TITLE__`
- `__DOUBLE_SECTION_2_BODY__`
- `__DOUBLE_SECTION_2_TITLE__`
- `__DOUBLE_SECTION_3_BODY__`
- `__DOUBLE_SECTION_3_TITLE__`
- `__DOUBLE_SECTION_4_BODY__`
- `__DOUBLE_SECTION_4_TITLE__`
- `__DOUBLE_SECTION_5_BODY__`
- `__DOUBLE_SECTION_5_TITLE__`
- `__DOUBLE_SOURCE_NOTE__`
- `__DOUBLE_TITLE__`
- `__DUE_GUIDE_BOUNDARY__`
- `__DUE_GUIDE_INPUT__`
- `__DUE_GUIDE_METHOD__`
- `__DUE_GUIDE_PRIVACY__`
- `__DUE_GUIDE_RESULT__`
- `__DUE_TOOL_DESCRIPTION__`
- `__DUE_TOOL_INTRODUCTION__`
- `__DUE_TOOL_TITLE__`
- `__EDITORIAL_CONTACT_NOTE__`
- `__EDITORIAL_DESCRIPTION__`
- `__EDITORIAL_INTRODUCTION__`
- `__EDITORIAL_SECTION_1_BODY__`
- `__EDITORIAL_SECTION_1_TITLE__`
- `__EDITORIAL_SECTION_2_BODY__`
- `__EDITORIAL_SECTION_2_TITLE__`
- `__EDITORIAL_SECTION_3_BODY__`
- `__EDITORIAL_SECTION_3_TITLE__`
- `__EDITORIAL_TITLE__`
- `__FEED_DESCRIPTION__`
- `__FEED_PUB_DATE__`
- `__FOUNDER_ANSWER_2__`
- `__FOUNDER_ANSWER_3__`
- `__FOUNDER_ANSWER_4__`
- `__FOUNDER_COVER_ALT__`
- `__FOUNDER_COVER_CAPTION__`
- `__FOUNDER_DECK__`
- `__FOUNDER_DESCRIPTION__`
- `__FOUNDER_FAQ_ANSWER__`
- `__FOUNDER_FAQ_QUESTION__`
- `__FOUNDER_QUESTION_2__`
- `__FOUNDER_QUESTION_3__`
- `__FOUNDER_QUESTION_4__`
- `__FOUNDER_READING_TIME__`
- `__FOUNDER_SECTION_1_BODY__`
- `__FOUNDER_SECTION_1_TITLE__`
- `__FOUNDER_SECTION_5_BODY__`
- `__FOUNDER_SECTION_5_TITLE__`
- `__FOUNDER_SOURCE_NOTE__`
- `__FOUNDER_TITLE__`
- `__GLOSSARY_COVER_ALT__`
- `__GLOSSARY_COVER_CAPTION__`
- `__GLOSSARY_DECK__`
- `__GLOSSARY_DEFINITION_1__`
- `__GLOSSARY_DEFINITION_2__`
- `__GLOSSARY_DEFINITION_3__`
- `__GLOSSARY_DEFINITION_4__`
- `__GLOSSARY_DESCRIPTION__`
- `__GLOSSARY_FAQ_ANSWER__`
- `__GLOSSARY_FAQ_QUESTION__`
- `__GLOSSARY_READING_TIME__`
- `__GLOSSARY_SECTION_5_BODY__`
- `__GLOSSARY_SECTION_5_TITLE__`
- `__GLOSSARY_SOURCE_NOTE__`
- `__GLOSSARY_TERM_1__`
- `__GLOSSARY_TERM_2__`
- `__GLOSSARY_TERM_3__`
- `__GLOSSARY_TERM_4__`
- `__GLOSSARY_TITLE__`
- `__HOME_DESCRIPTION__`
- `__HOME_INTRODUCTION__`
- `__HOME_TITLE__`
- `__INVITE_CODE__`
- `__INVOICE_COVER_ALT__`
- `__INVOICE_COVER_CAPTION__`
- `__INVOICE_DECK__`
- `__INVOICE_DESCRIPTION__`
- `__INVOICE_DOC_CODE__`
- `__INVOICE_DOC_LABEL__`
- `__INVOICE_FAQ_ANSWER__`
- `__INVOICE_FAQ_QUESTION__`
- `__INVOICE_FIELD_1__`
- `__INVOICE_FIELD_2__`
- `__INVOICE_FIELD_3__`
- `__INVOICE_READING_TIME__`
- `__INVOICE_SECTION_1_BODY__`
- `__INVOICE_SECTION_1_TITLE__`
- `__INVOICE_SECTION_2_BODY__`
- `__INVOICE_SECTION_2_TITLE__`
- `__INVOICE_SECTION_3_BODY__`
- `__INVOICE_SECTION_3_TITLE__`
- `__INVOICE_SECTION_4_BODY__`
- `__INVOICE_SECTION_4_TITLE__`
- `__INVOICE_SECTION_5_BODY__`
- `__INVOICE_SECTION_5_TITLE__`
- `__INVOICE_SOURCE_NOTE__`
- `__INVOICE_TITLE__`
- `__INVOICE_VALUE_1__`
- `__INVOICE_VALUE_2__`
- `__INVOICE_VALUE_3__`
- `__LANG__`
- `__MARGIN_COVER_ALT__`
- `__MARGIN_COVER_CAPTION__`
- `__MARGIN_DECK__`
- `__MARGIN_DESCRIPTION__`
- `__MARGIN_FAQ_ANSWER__`
- `__MARGIN_FAQ_QUESTION__`
- `__MARGIN_MARGIN_NOTE__`
- `__MARGIN_QUOTE__`
- `__MARGIN_READING_TIME__`
- `__MARGIN_SECTION_1_BODY__`
- `__MARGIN_SECTION_1_TITLE__`
- `__MARGIN_SECTION_2_BODY__`
- `__MARGIN_SECTION_2_TITLE__`
- `__MARGIN_SECTION_3_BODY__`
- `__MARGIN_SECTION_3_TITLE__`
- `__MARGIN_SECTION_4_BODY__`
- `__MARGIN_SECTION_4_TITLE__`
- `__MARGIN_SECTION_5_BODY__`
- `__MARGIN_SECTION_5_TITLE__`
- `__MARGIN_SOURCE_NOTE__`
- `__MARGIN_TITLE__`
- `__MATCH_GUIDE_BOUNDARY__`
- `__MATCH_GUIDE_INPUT__`
- `__MATCH_GUIDE_METHOD__`
- `__MATCH_GUIDE_PRIVACY__`
- `__MATCH_GUIDE_RESULT__`
- `__MATCH_TOOL_DESCRIPTION__`
- `__MATCH_TOOL_INTRODUCTION__`
- `__MATCH_TOOL_TITLE__`
- `__MODIFIED_DATE__`
- `__OPENING_CELL_1__`
- `__OPENING_CELL_2__`
- `__OPENING_CELL_3__`
- `__OPENING_CELL_4__`
- `__OPENING_COL_1__`
- `__OPENING_COL_2__`
- `__OPENING_COVER_ALT__`
- `__OPENING_COVER_CAPTION__`
- `__OPENING_DECK__`
- `__OPENING_DESCRIPTION__`
- `__OPENING_FAQ_ANSWER__`
- `__OPENING_FAQ_QUESTION__`
- `__OPENING_QUOTE__`
- `__OPENING_READING_TIME__`
- `__OPENING_SECTION_1_BODY__`
- `__OPENING_SECTION_1_TITLE__`
- `__OPENING_SECTION_2_BODY__`
- `__OPENING_SECTION_2_TITLE__`
- `__OPENING_SECTION_3_BODY__`
- `__OPENING_SECTION_3_TITLE__`
- `__OPENING_SECTION_4_BODY__`
- `__OPENING_SECTION_4_TITLE__`
- `__OPENING_SECTION_5_BODY__`
- `__OPENING_SECTION_5_TITLE__`
- `__OPENING_SOURCE_NOTE__`
- `__OPENING_TABLE_CAPTION__`
- `__OPENING_TITLE__`
- `__PRIVACY_CONTACT_NOTE__`
- `__PRIVACY_DESCRIPTION__`
- `__PRIVACY_INTRODUCTION__`
- `__PRIVACY_SECTION_1_BODY__`
- `__PRIVACY_SECTION_1_TITLE__`
- `__PRIVACY_SECTION_2_BODY__`
- `__PRIVACY_SECTION_2_TITLE__`
- `__PRIVACY_SECTION_3_BODY__`
- `__PRIVACY_SECTION_3_TITLE__`
- `__PRIVACY_TITLE__`
- `__PUBLISHED_DATE__`
- `__QUARTER_COVER_ALT__`
- `__QUARTER_COVER_CAPTION__`
- `__QUARTER_DECK__`
- `__QUARTER_DESCRIPTION__`
- `__QUARTER_FAQ_ANSWER__`
- `__QUARTER_FAQ_QUESTION__`
- `__QUARTER_READING_TIME__`
- `__QUARTER_SECTION_1_BODY__`
- `__QUARTER_SECTION_1_TITLE__`
- `__QUARTER_SECTION_2_BODY__`
- `__QUARTER_SECTION_2_TITLE__`
- `__QUARTER_SECTION_3_BODY__`
- `__QUARTER_SECTION_3_TITLE__`
- `__QUARTER_SECTION_4_BODY__`
- `__QUARTER_SECTION_4_TITLE__`
- `__QUARTER_SECTION_5_BODY__`
- `__QUARTER_SECTION_5_TITLE__`
- `__QUARTER_SOURCE_NOTE__`
- `__QUARTER_TITLE__`
- `__RECEIPTS_BOOK_DESCRIPTION__`
- `__RECEIPTS_BOOK_INTRODUCTION__`
- `__RECEIPTS_BOOK_TITLE__`
- `__RECONCILIATION_BOOK_BOOK_DESCRIPTION__`
- `__RECONCILIATION_BOOK_BOOK_INTRODUCTION__`
- `__RECONCILIATION_BOOK_BOOK_TITLE__`
- `__RECON_COVER_ALT__`
- `__RECON_COVER_CAPTION__`
- `__RECON_DECK__`
- `__RECON_DESCRIPTION__`
- `__RECON_FAQ_ANSWER__`
- `__RECON_FAQ_QUESTION__`
- `__RECON_READING_TIME__`
- `__RECON_SECTION_1_BODY__`
- `__RECON_SECTION_1_TITLE__`
- `__RECON_SECTION_2_BODY__`
- `__RECON_SECTION_2_TITLE__`
- `__RECON_SECTION_3_BODY__`
- `__RECON_SECTION_3_TITLE__`
- `__RECON_SECTION_4_BODY__`
- `__RECON_SECTION_4_TITLE__`
- `__RECON_SECTION_5_BODY__`
- `__RECON_SECTION_5_TITLE__`
- `__RECON_SOURCE_NOTE__`
- `__RECON_TITLE__`
- `__RUNWAY_GUIDE_BOUNDARY__`
- `__RUNWAY_GUIDE_INPUT__`
- `__RUNWAY_GUIDE_METHOD__`
- `__RUNWAY_GUIDE_PRIVACY__`
- `__RUNWAY_GUIDE_RESULT__`
- `__RUNWAY_TOOL_DESCRIPTION__`
- `__RUNWAY_TOOL_INTRODUCTION__`
- `__RUNWAY_TOOL_TITLE__`
- `__SECURITY_EMAIL__`
- `__SECURITY_EXPIRES__`
- `__SITE_DOMAIN__`
- `__SITE_NAME__`
- `__TOOL_INDEX_DESCRIPTION__`
- `__TOOL_INDEX_INTRODUCTION__`
- `__TOOL_INDEX_TITLE__`
- `__VARIANCE_COVER_ALT__`
- `__VARIANCE_COVER_CAPTION__`
- `__VARIANCE_DECK__`
- `__VARIANCE_DESCRIPTION__`
- `__VARIANCE_FAQ_ANSWER__`
- `__VARIANCE_FAQ_QUESTION__`
- `__VARIANCE_READING_TIME__`
- `__VARIANCE_SECTION_1_BODY__`
- `__VARIANCE_SECTION_1_TITLE__`
- `__VARIANCE_SECTION_2_BODY__`
- `__VARIANCE_SECTION_2_TITLE__`
- `__VARIANCE_SECTION_3_BODY__`
- `__VARIANCE_SECTION_3_TITLE__`
- `__VARIANCE_SECTION_4_BODY__`
- `__VARIANCE_SECTION_4_TITLE__`
- `__VARIANCE_SECTION_5_BODY__`
- `__VARIANCE_SECTION_5_TITLE__`
- `__VARIANCE_SOURCE_NOTE__`
- `__VARIANCE_TITLE__`
