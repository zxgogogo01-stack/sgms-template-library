# 034 — Booth Briefing / 摊位产业简报

这是一套 workflow-ready v2 的高端产业展会简报模板。视觉语言来自临时展馆、悬挂导视、访客证、亚克力展板与透视地面：钴蓝、酸性黄绿、石墨黑和冷银构成独立识别，不复用账页、章程或报刊结构。

后续 AI 只需替换站点变量、经核验的文字、来源与文章正文，不需要重建 UI、导航、响应式、SEO、封面、分类、法律页或工具逻辑。变量只是内容接入口，不代表已经核验的事实。

## 已完成框架

- 首页形态 A：首屏访客证包含明文邀请码、复制真功能、弹性利益点、政策脚注及编辑式访问证入口；首页没有外部推广直链。
- 十二种文章展板、三座主题展廊、五件纯本地采购工具、七个合规页、404、RSS、安全联系、图标、社交图及十二套独立 1200×630 PNG/WebP 封面。
- 五工具覆盖正常、错误、边界、重置、复制和输入后旧结果失效；不加载外部依赖，不宣称实时数据。

## 访问证边界

`briefs/access-pass.html` 只提供内容与 UI 外壳，不含注册步骤、平台规则、费率或监管事实。页面恰好保留一个静态 `__AFFILIATE_URL__` href，并带 `target=_blank` 与完整 sponsored/nofollow/noopener/noreferrer 属性，紧邻可见推广披露。其余页面没有推广直链。

## 内容接入顺序

1. 替换站名、域名、英文 wordmark、作者、联系方式、日期、邀请码、利益比例和脚注。
2. 按事实调研填写十二篇文字并保留十二种展板结构；数字、费用、限制和监管结论必须附来源与核验日期。
3. 只替换文字、链接和 alt；保留 class、data 属性、DOM 主骨架、表单 id、ARIA、封面尺寸及脚本引用。
4. 默认保持首页形态 A；任何形态或推广策略改变均留给单站工作流。
5. 内容完成后重跑三套静态审计和相似度检查，并在桌面、390px、360px 实测 31 条路由、首页复制/主题/菜单/筛选、五工具所有状态、访问链接属性和 404 出口。

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "article.html",
  "articles": [
    "briefs/market-radar.html",
    "briefs/vendor-scorecard.html",
    "briefs/supply-chain-route.html",
    "briefs/material-board.html",
    "briefs/buyer-interview.html",
    "briefs/price-ladder.html",
    "briefs/compliance-gate.html",
    "briefs/launch-calendar.html",
    "briefs/spec-comparison.html",
    "briefs/risk-wall.html",
    "briefs/field-glossary.html",
    "briefs/access-pass.html"
  ],
  "cornerstones": [
    "briefs/market-radar.html",
    "briefs/compliance-gate.html"
  ],
  "registrationGuide": "briefs/access-pass.html",
  "articleCovers": {
    "briefs/market-radar.html": {
      "display": "assets/covers/market-radar.webp",
      "og": "assets/covers/market-radar.png"
    },
    "briefs/vendor-scorecard.html": {
      "display": "assets/covers/vendor-scorecard.webp",
      "og": "assets/covers/vendor-scorecard.png"
    },
    "briefs/supply-chain-route.html": {
      "display": "assets/covers/supply-chain-route.webp",
      "og": "assets/covers/supply-chain-route.png"
    },
    "briefs/material-board.html": {
      "display": "assets/covers/material-board.webp",
      "og": "assets/covers/material-board.png"
    },
    "briefs/buyer-interview.html": {
      "display": "assets/covers/buyer-interview.webp",
      "og": "assets/covers/buyer-interview.png"
    },
    "briefs/price-ladder.html": {
      "display": "assets/covers/price-ladder.webp",
      "og": "assets/covers/price-ladder.png"
    },
    "briefs/compliance-gate.html": {
      "display": "assets/covers/compliance-gate.webp",
      "og": "assets/covers/compliance-gate.png"
    },
    "briefs/launch-calendar.html": {
      "display": "assets/covers/launch-calendar.webp",
      "og": "assets/covers/launch-calendar.png"
    },
    "briefs/spec-comparison.html": {
      "display": "assets/covers/spec-comparison.webp",
      "og": "assets/covers/spec-comparison.png"
    },
    "briefs/risk-wall.html": {
      "display": "assets/covers/risk-wall.webp",
      "og": "assets/covers/risk-wall.png"
    },
    "briefs/field-glossary.html": {
      "display": "assets/covers/field-glossary.webp",
      "og": "assets/covers/field-glossary.png"
    },
    "briefs/access-pass.html": {
      "display": "assets/covers/access-pass.webp",
      "og": "assets/covers/access-pass.png"
    }
  },
  "categories": [
    {
      "path": "pavilions/sourcing.html",
      "label": "采购展廊",
      "articles": [
        "briefs/market-radar.html",
        "briefs/vendor-scorecard.html",
        "briefs/supply-chain-route.html",
        "briefs/material-board.html"
      ]
    },
    {
      "path": "pavilions/operations.html",
      "label": "履约中庭",
      "articles": [
        "briefs/buyer-interview.html",
        "briefs/price-ladder.html",
        "briefs/compliance-gate.html",
        "briefs/launch-calendar.html"
      ]
    },
    {
      "path": "pavilions/decisions.html",
      "label": "决策看台",
      "articles": [
        "briefs/spec-comparison.html",
        "briefs/risk-wall.html",
        "briefs/field-glossary.html",
        "briefs/access-pass.html"
      ]
    }
  ],
  "toolIndex": "tool.html",
  "tools": [
    "lab/supplier-scorer.html",
    "lab/reorder-point.html",
    "lab/container-fit.html",
    "lab/sku-comparator.html",
    "lab/procurement-timeline.html"
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
- `__ARTICLE_INDEX_DESCRIPTION__`
- `__ARTICLE_INDEX_INTRODUCTION__`
- `__ARTICLE_INDEX_TITLE__`
- `__AUTHOR_NAME__`
- `__BENEFIT_DISCLAIMER__`
- `__BENEFIT_RATE__`
- `__BRAND_EN__`
- `__BUYER_COVER_ALT__`
- `__BUYER_COVER_CAPTION__`
- `__BUYER_DECK__`
- `__BUYER_DESCRIPTION__`
- `__BUYER_FAQ_ANSWER__`
- `__BUYER_FAQ_QUESTION__`
- `__BUYER_READING_TIME__`
- `__BUYER_SECTION_1_BODY__`
- `__BUYER_SECTION_1_TITLE__`
- `__BUYER_SECTION_2_BODY__`
- `__BUYER_SECTION_2_TITLE__`
- `__BUYER_SECTION_3_BODY__`
- `__BUYER_SECTION_3_TITLE__`
- `__BUYER_SECTION_4_BODY__`
- `__BUYER_SECTION_4_TITLE__`
- `__BUYER_SECTION_5_BODY__`
- `__BUYER_SECTION_5_TITLE__`
- `__BUYER_SOURCE_NOTE__`
- `__BUYER_TITLE__`
- `__CALENDAR_COVER_ALT__`
- `__CALENDAR_COVER_CAPTION__`
- `__CALENDAR_DECK__`
- `__CALENDAR_DESCRIPTION__`
- `__CALENDAR_FAQ_ANSWER__`
- `__CALENDAR_FAQ_QUESTION__`
- `__CALENDAR_READING_TIME__`
- `__CALENDAR_SECTION_1_BODY__`
- `__CALENDAR_SECTION_1_TITLE__`
- `__CALENDAR_SECTION_2_BODY__`
- `__CALENDAR_SECTION_2_TITLE__`
- `__CALENDAR_SECTION_3_BODY__`
- `__CALENDAR_SECTION_3_TITLE__`
- `__CALENDAR_SECTION_4_BODY__`
- `__CALENDAR_SECTION_4_TITLE__`
- `__CALENDAR_SECTION_5_BODY__`
- `__CALENDAR_SECTION_5_TITLE__`
- `__CALENDAR_SOURCE_NOTE__`
- `__CALENDAR_TITLE__`
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
- `__CONTAINER_GUIDE_BOUNDARY__`
- `__CONTAINER_GUIDE_INPUT__`
- `__CONTAINER_GUIDE_METHOD__`
- `__CONTAINER_GUIDE_PRIVACY__`
- `__CONTAINER_GUIDE_RESULT__`
- `__CONTAINER_TOOL_DESCRIPTION__`
- `__CONTAINER_TOOL_INTRODUCTION__`
- `__CONTAINER_TOOL_TITLE__`
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
- `__DECISIONS_CATEGORY_DESCRIPTION__`
- `__DECISIONS_CATEGORY_INTRODUCTION__`
- `__DECISIONS_CATEGORY_TITLE__`
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
- `__GATE_COVER_ALT__`
- `__GATE_COVER_CAPTION__`
- `__GATE_DECK__`
- `__GATE_DESCRIPTION__`
- `__GATE_FAQ_ANSWER__`
- `__GATE_FAQ_QUESTION__`
- `__GATE_READING_TIME__`
- `__GATE_SECTION_1_BODY__`
- `__GATE_SECTION_1_TITLE__`
- `__GATE_SECTION_2_BODY__`
- `__GATE_SECTION_2_TITLE__`
- `__GATE_SECTION_3_BODY__`
- `__GATE_SECTION_3_TITLE__`
- `__GATE_SECTION_4_BODY__`
- `__GATE_SECTION_4_TITLE__`
- `__GATE_SECTION_5_BODY__`
- `__GATE_SECTION_5_TITLE__`
- `__GATE_SOURCE_NOTE__`
- `__GATE_TITLE__`
- `__GLOSSARY_COVER_ALT__`
- `__GLOSSARY_COVER_CAPTION__`
- `__GLOSSARY_DECK__`
- `__GLOSSARY_DESCRIPTION__`
- `__GLOSSARY_FAQ_ANSWER__`
- `__GLOSSARY_FAQ_QUESTION__`
- `__GLOSSARY_READING_TIME__`
- `__GLOSSARY_SECTION_1_BODY__`
- `__GLOSSARY_SECTION_1_TITLE__`
- `__GLOSSARY_SECTION_2_BODY__`
- `__GLOSSARY_SECTION_2_TITLE__`
- `__GLOSSARY_SECTION_3_BODY__`
- `__GLOSSARY_SECTION_3_TITLE__`
- `__GLOSSARY_SECTION_4_BODY__`
- `__GLOSSARY_SECTION_4_TITLE__`
- `__GLOSSARY_SECTION_5_BODY__`
- `__GLOSSARY_SECTION_5_TITLE__`
- `__GLOSSARY_SOURCE_NOTE__`
- `__GLOSSARY_TITLE__`
- `__HOME_DESCRIPTION__`
- `__HOME_INTRODUCTION__`
- `__HOME_TITLE__`
- `__INVITE_CODE__`
- `__LANG__`
- `__MATERIAL_COVER_ALT__`
- `__MATERIAL_COVER_CAPTION__`
- `__MATERIAL_DECK__`
- `__MATERIAL_DESCRIPTION__`
- `__MATERIAL_FAQ_ANSWER__`
- `__MATERIAL_FAQ_QUESTION__`
- `__MATERIAL_READING_TIME__`
- `__MATERIAL_SECTION_1_BODY__`
- `__MATERIAL_SECTION_1_TITLE__`
- `__MATERIAL_SECTION_2_BODY__`
- `__MATERIAL_SECTION_2_TITLE__`
- `__MATERIAL_SECTION_3_BODY__`
- `__MATERIAL_SECTION_3_TITLE__`
- `__MATERIAL_SECTION_4_BODY__`
- `__MATERIAL_SECTION_4_TITLE__`
- `__MATERIAL_SECTION_5_BODY__`
- `__MATERIAL_SECTION_5_TITLE__`
- `__MATERIAL_SOURCE_NOTE__`
- `__MATERIAL_TITLE__`
- `__MODIFIED_DATE__`
- `__OPERATIONS_CATEGORY_DESCRIPTION__`
- `__OPERATIONS_CATEGORY_INTRODUCTION__`
- `__OPERATIONS_CATEGORY_TITLE__`
- `__PRICE_COVER_ALT__`
- `__PRICE_COVER_CAPTION__`
- `__PRICE_DECK__`
- `__PRICE_DESCRIPTION__`
- `__PRICE_FAQ_ANSWER__`
- `__PRICE_FAQ_QUESTION__`
- `__PRICE_READING_TIME__`
- `__PRICE_SECTION_1_BODY__`
- `__PRICE_SECTION_1_TITLE__`
- `__PRICE_SECTION_2_BODY__`
- `__PRICE_SECTION_2_TITLE__`
- `__PRICE_SECTION_3_BODY__`
- `__PRICE_SECTION_3_TITLE__`
- `__PRICE_SECTION_4_BODY__`
- `__PRICE_SECTION_4_TITLE__`
- `__PRICE_SECTION_5_BODY__`
- `__PRICE_SECTION_5_TITLE__`
- `__PRICE_SOURCE_NOTE__`
- `__PRICE_TITLE__`
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
- `__RADAR_COVER_ALT__`
- `__RADAR_COVER_CAPTION__`
- `__RADAR_DECK__`
- `__RADAR_DESCRIPTION__`
- `__RADAR_FAQ_ANSWER__`
- `__RADAR_FAQ_QUESTION__`
- `__RADAR_READING_TIME__`
- `__RADAR_SECTION_1_BODY__`
- `__RADAR_SECTION_1_TITLE__`
- `__RADAR_SECTION_2_BODY__`
- `__RADAR_SECTION_2_TITLE__`
- `__RADAR_SECTION_3_BODY__`
- `__RADAR_SECTION_3_TITLE__`
- `__RADAR_SECTION_4_BODY__`
- `__RADAR_SECTION_4_TITLE__`
- `__RADAR_SECTION_5_BODY__`
- `__RADAR_SECTION_5_TITLE__`
- `__RADAR_SOURCE_NOTE__`
- `__RADAR_TITLE__`
- `__REORDER_GUIDE_BOUNDARY__`
- `__REORDER_GUIDE_INPUT__`
- `__REORDER_GUIDE_METHOD__`
- `__REORDER_GUIDE_PRIVACY__`
- `__REORDER_GUIDE_RESULT__`
- `__REORDER_TOOL_DESCRIPTION__`
- `__REORDER_TOOL_INTRODUCTION__`
- `__REORDER_TOOL_TITLE__`
- `__RISK_COVER_ALT__`
- `__RISK_COVER_CAPTION__`
- `__RISK_DECK__`
- `__RISK_DESCRIPTION__`
- `__RISK_FAQ_ANSWER__`
- `__RISK_FAQ_QUESTION__`
- `__RISK_READING_TIME__`
- `__RISK_SECTION_1_BODY__`
- `__RISK_SECTION_1_TITLE__`
- `__RISK_SECTION_2_BODY__`
- `__RISK_SECTION_2_TITLE__`
- `__RISK_SECTION_3_BODY__`
- `__RISK_SECTION_3_TITLE__`
- `__RISK_SECTION_4_BODY__`
- `__RISK_SECTION_4_TITLE__`
- `__RISK_SECTION_5_BODY__`
- `__RISK_SECTION_5_TITLE__`
- `__RISK_SOURCE_NOTE__`
- `__RISK_TITLE__`
- `__ROUTE_COVER_ALT__`
- `__ROUTE_COVER_CAPTION__`
- `__ROUTE_DECK__`
- `__ROUTE_DESCRIPTION__`
- `__ROUTE_FAQ_ANSWER__`
- `__ROUTE_FAQ_QUESTION__`
- `__ROUTE_READING_TIME__`
- `__ROUTE_SECTION_1_BODY__`
- `__ROUTE_SECTION_1_TITLE__`
- `__ROUTE_SECTION_2_BODY__`
- `__ROUTE_SECTION_2_TITLE__`
- `__ROUTE_SECTION_3_BODY__`
- `__ROUTE_SECTION_3_TITLE__`
- `__ROUTE_SECTION_4_BODY__`
- `__ROUTE_SECTION_4_TITLE__`
- `__ROUTE_SECTION_5_BODY__`
- `__ROUTE_SECTION_5_TITLE__`
- `__ROUTE_SOURCE_NOTE__`
- `__ROUTE_TITLE__`
- `__SCORER_GUIDE_BOUNDARY__`
- `__SCORER_GUIDE_INPUT__`
- `__SCORER_GUIDE_METHOD__`
- `__SCORER_GUIDE_PRIVACY__`
- `__SCORER_GUIDE_RESULT__`
- `__SCORER_TOOL_DESCRIPTION__`
- `__SCORER_TOOL_INTRODUCTION__`
- `__SCORER_TOOL_TITLE__`
- `__SITE_DOMAIN__`
- `__SITE_NAME__`
- `__SKU_GUIDE_BOUNDARY__`
- `__SKU_GUIDE_INPUT__`
- `__SKU_GUIDE_METHOD__`
- `__SKU_GUIDE_PRIVACY__`
- `__SKU_GUIDE_RESULT__`
- `__SKU_TOOL_DESCRIPTION__`
- `__SKU_TOOL_INTRODUCTION__`
- `__SKU_TOOL_TITLE__`
- `__SOURCING_CATEGORY_DESCRIPTION__`
- `__SOURCING_CATEGORY_INTRODUCTION__`
- `__SOURCING_CATEGORY_TITLE__`
- `__SPEC_COVER_ALT__`
- `__SPEC_COVER_CAPTION__`
- `__SPEC_DECK__`
- `__SPEC_DESCRIPTION__`
- `__SPEC_FAQ_ANSWER__`
- `__SPEC_FAQ_QUESTION__`
- `__SPEC_READING_TIME__`
- `__SPEC_SECTION_1_BODY__`
- `__SPEC_SECTION_1_TITLE__`
- `__SPEC_SECTION_2_BODY__`
- `__SPEC_SECTION_2_TITLE__`
- `__SPEC_SECTION_3_BODY__`
- `__SPEC_SECTION_3_TITLE__`
- `__SPEC_SECTION_4_BODY__`
- `__SPEC_SECTION_4_TITLE__`
- `__SPEC_SECTION_5_BODY__`
- `__SPEC_SECTION_5_TITLE__`
- `__SPEC_SOURCE_NOTE__`
- `__SPEC_TITLE__`
- `__TIMELINE_GUIDE_BOUNDARY__`
- `__TIMELINE_GUIDE_INPUT__`
- `__TIMELINE_GUIDE_METHOD__`
- `__TIMELINE_GUIDE_PRIVACY__`
- `__TIMELINE_GUIDE_RESULT__`
- `__TIMELINE_TOOL_DESCRIPTION__`
- `__TIMELINE_TOOL_INTRODUCTION__`
- `__TIMELINE_TOOL_TITLE__`
- `__TOOL_INDEX_DESCRIPTION__`
- `__TOOL_INDEX_INTRODUCTION__`
- `__TOOL_INDEX_TITLE__`
- `__VENDOR_COVER_ALT__`
- `__VENDOR_COVER_CAPTION__`
- `__VENDOR_DECK__`
- `__VENDOR_DESCRIPTION__`
- `__VENDOR_FAQ_ANSWER__`
- `__VENDOR_FAQ_QUESTION__`
- `__VENDOR_READING_TIME__`
- `__VENDOR_SECTION_1_BODY__`
- `__VENDOR_SECTION_1_TITLE__`
- `__VENDOR_SECTION_2_BODY__`
- `__VENDOR_SECTION_2_TITLE__`
- `__VENDOR_SECTION_3_BODY__`
- `__VENDOR_SECTION_3_TITLE__`
- `__VENDOR_SECTION_4_BODY__`
- `__VENDOR_SECTION_4_TITLE__`
- `__VENDOR_SECTION_5_BODY__`
- `__VENDOR_SECTION_5_TITLE__`
- `__VENDOR_SOURCE_NOTE__`
- `__VENDOR_TITLE__`
- `__VERIFIED_DATE__`
