# 029 — Iron Almanac / 铁皮年鉴

这是一套 workflow-ready v2 行业数据年鉴框架。视觉采用高反差报表纸、黑色铁牌、酸性黄绿、氧化橙与横向刻度，首页像可折叠的年度总表；文章则在同一出版系统中分别使用数字铭牌、年代带、比较矩阵、图表批注、区域卡、方法活页、修订纸带、来源阶梯、情景带、访谈双栏、词汇索引与访问资料十二种结构。

后续 AI 只需替换站点变量、经核实的文字、数字、来源和日期，不需要重做导航、响应式、SEO 元数据、文章封面、分类体系、合规页或工具逻辑。模板内出现的方括号字段都是内容接入口，不代表真实行业事实。

## 页面框架

- 首页形态 A：首屏识别码、复制、弹性利益点、脚注，以及一处非促销式访问资料入口；没有外部推广直链。
- 文章：12 个独立内容结构；annual-keyplate 与 methodology-folio 为长篇 cornerstone 外壳，access-ledger 仅提供文字与字段接入口。
- 分类：年度数列台、方法校准桌、现场观察柜三只抽屉。
- 工具：复合增长路径尺、基期指数规整器、百分位定位仪、逐年变化排版机、数量级换算拨盘；全部本地计算。
- 合规：about、contact、disclosure、disclaimer、privacy、corrections、editorial 七页，另有独立 404、RSS、安全联系与完整索引资产。

## 变量与文字接入

全站核心变量：SITE_NAME、SITE_DOMAIN、BRAND_EN、INVITE_CODE、BENEFIT_RATE、BENEFIT_DISCLAIMER、AFFILIATE_URL、AFFILIATE_LINK_LABEL、CONTACT_EMAIL、SECURITY_EMAIL、SECURITY_EXPIRES、AUTHOR_NAME、PUBLISHED_DATE、MODIFIED_DATE、EDITION_LABEL、EDITION_YEAR。

首页与出版变量：HOME_TITLE、HOME_DESCRIPTION、HOME_INTRODUCTION、CURRENT_EDITION_NOTE、ANNUAL_REGISTER_TITLE、ANNUAL_REGISTER_DESCRIPTION、METHOD_REGISTER_TITLE、METHOD_REGISTER_DESCRIPTION、FIELD_REGISTER_TITLE、FIELD_REGISTER_DESCRIPTION、REGISTER_USAGE_NOTE_1 至 REGISTER_USAGE_NOTE_3。

文章变量按页面前缀分组：KEYPLATE、CHRONOLOGY、MATRIX、CHART、REGIONAL、METHODOLOGY、REVISION、SOURCE、SCENARIO、INTERVIEW、GLOSSARY、REGISTRATION。每页 title、deck、caption、section、body、note、table、question、answer、fact 等字段均保持该前缀；逐页替换即可。通用数据格使用 METRIC_A 至 METRIC_D 及对应 NOTE；年代带使用 YEAR_ONE 至 YEAR_THREE；术语页使用 TERM_ONE 至 TERM_FOUR。

工具说明变量为 TOOL_1_GUIDE_* 至 TOOL_5_GUIDE_*，每组包含 PURPOSE、INPUT、METHOD、READING、LIMITS。合规变量按 ABOUT、CONTACT、DISCLOSURE、DISCLAIMER、PRIVACY、CORRECTIONS、EDITORIAL 前缀替换。RSS 使用 FEED_DESCRIPTION、FEED_DATE_01 至 FEED_DATE_10、FEED_SUMMARY_01 至 FEED_SUMMARY_10。

## 访问资料页的严格边界

access-ledger.html 只是一套编辑版式和文字字段，不含注册教程、平台规则或未经核验的操作事实。它恰好保留一个静态 AFFILIATE_URL href，具备 target=_blank、rel=sponsored nofollow noopener noreferrer，并在相邻可见文字标明“推荐链接/推广链接”。除该页外，全站没有推广直链。

## 后续 AI 接入顺序

1. 先替换站名、域名、英文 wordmark、作者、联系与日期，再填首页说明。
2. 根据已完成的主题与关键词调研编写十二篇正文；数字、费用、限制与监管结论必须核实来源和日期。不要把演示文案当事实，也不要把十二种文章结构改回同一种。
3. 只替换 article、category、legal 与 Guide 中的文字字段；保留 class、DOM 主骨架、表单 name、data 属性、ARIA 关系、封面尺寸与脚本引用。
4. 若具体站获准采用首页形态 B，应在单站流程中按授权单独改；模板库默认保持形态 A。
5. 内容完成后重跑全套审计，并在桌面、390px、360px 实测 31 条路由、首页复制/主题/目录、文章筛选、五工具正常/错误/边界/重置/复制与输入后旧结果失效。

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "article.html",
  "articles": [
    "articles/annual-keyplate.html",
    "articles/chronology-ribbon.html",
    "articles/comparison-matrix.html",
    "articles/annotated-chart.html",
    "articles/regional-plates.html",
    "articles/methodology-folio.html",
    "articles/revision-ledger.html",
    "articles/source-trail.html",
    "articles/scenario-bands.html",
    "articles/field-interview.html",
    "articles/glossary-index.html",
    "articles/access-ledger.html"
  ],
  "cornerstones": [
    "articles/annual-keyplate.html",
    "articles/methodology-folio.html"
  ],
  "registrationGuide": "articles/access-ledger.html",
  "articleCovers": {
    "articles/annual-keyplate.html": {
      "display": "assets/covers/annual-keyplate.webp",
      "og": "assets/covers/annual-keyplate.png"
    },
    "articles/chronology-ribbon.html": {
      "display": "assets/covers/chronology-ribbon.webp",
      "og": "assets/covers/chronology-ribbon.png"
    },
    "articles/comparison-matrix.html": {
      "display": "assets/covers/comparison-matrix.webp",
      "og": "assets/covers/comparison-matrix.png"
    },
    "articles/annotated-chart.html": {
      "display": "assets/covers/annotated-chart.webp",
      "og": "assets/covers/annotated-chart.png"
    },
    "articles/regional-plates.html": {
      "display": "assets/covers/regional-plates.webp",
      "og": "assets/covers/regional-plates.png"
    },
    "articles/methodology-folio.html": {
      "display": "assets/covers/methodology-folio.webp",
      "og": "assets/covers/methodology-folio.png"
    },
    "articles/revision-ledger.html": {
      "display": "assets/covers/revision-ledger.webp",
      "og": "assets/covers/revision-ledger.png"
    },
    "articles/source-trail.html": {
      "display": "assets/covers/source-trail.webp",
      "og": "assets/covers/source-trail.png"
    },
    "articles/scenario-bands.html": {
      "display": "assets/covers/scenario-bands.webp",
      "og": "assets/covers/scenario-bands.png"
    },
    "articles/field-interview.html": {
      "display": "assets/covers/field-interview.webp",
      "og": "assets/covers/field-interview.png"
    },
    "articles/glossary-index.html": {
      "display": "assets/covers/glossary-index.webp",
      "og": "assets/covers/glossary-index.png"
    },
    "articles/access-ledger.html": {
      "display": "assets/covers/access-ledger.webp",
      "og": "assets/covers/access-ledger.png"
    }
  },
  "categories": [
    {
      "path": "registers/annual-numbers.html",
      "label": "年度数列台",
      "articles": [
        "articles/annual-keyplate.html",
        "articles/chronology-ribbon.html",
        "articles/comparison-matrix.html",
        "articles/annotated-chart.html"
      ]
    },
    {
      "path": "registers/method-desk.html",
      "label": "方法校准桌",
      "articles": [
        "articles/regional-plates.html",
        "articles/methodology-folio.html",
        "articles/revision-ledger.html",
        "articles/source-trail.html"
      ]
    },
    {
      "path": "registers/field-notes.html",
      "label": "现场观察柜",
      "articles": [
        "articles/scenario-bands.html",
        "articles/field-interview.html",
        "articles/glossary-index.html",
        "articles/access-ledger.html"
      ]
    }
  ],
  "toolIndex": "tool.html",
  "tools": [
    "instruments/cagr-path.html",
    "instruments/base-index.html",
    "instruments/percentile-rank.html",
    "instruments/yoy-table.html",
    "instruments/unit-scale.html"
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
    "siteDomain": "[[SITE_DOMAIN]]",
    "siteName": "[[SITE_NAME]]",
    "wordmark": "[[BRAND_EN]]",
    "inviteCode": "[[INVITE_CODE]]",
    "benefitRate": "[[BENEFIT_RATE]]",
    "benefitDisclaimer": "[[BENEFIT_DISCLAIMER]]",
    "affiliateUrl": "[[AFFILIATE_URL]]"
  }
}
```

## 完整占位字段索引

[[ABOUT_AUTHORSHIP]]、[[ABOUT_SCOPE]]、[[ACCESS_LEDGER_CAPTION]]、[[AFFILIATE_LINK_LABEL]]、[[AFFILIATE_URL]]、[[ANNOTATED_CHART_CAPTION]]、[[ANNUAL_KEYPLATE_CAPTION]]、[[ANNUAL_REGISTER_DESCRIPTION]]、[[ANNUAL_REGISTER_TITLE]]、[[AUTHOR_NAME]]、[[BENEFIT_DISCLAIMER]]、[[BENEFIT_RATE]]、[[BRAND_EN]]、[[CHART_ACCESSIBLE_SUMMARY]]、[[CHART_DECK]]、[[CHART_NOTE_ONE]]、[[CHART_NOTE_THREE]]、[[CHART_NOTE_TWO]]、[[CHART_SECTION_BODY]]、[[CHART_SECTION_TITLE]]、[[CHART_TITLE]]、[[CHRONOLOGY_DECK]]、[[CHRONOLOGY_RIBBON_CAPTION]]、[[CHRONOLOGY_TITLE]]、[[CHRONOLOGY_VERDICT]]、[[COMPARISON_MATRIX_CAPTION]]、[[CONTACT_CORRECTION_NOTE]]、[[CONTACT_EMAIL]]、[[CONTACT_INTRO]]、[[CORRECTIONS_SUBMISSION]]、[[CURRENT_EDITION_NOTE]]、[[DISCLAIMER_INFORMATION_SCOPE]]、[[DISCLAIMER_JURISDICTION_NOTE]]、[[DISCLOSURE_LINK_POLICY]]、[[EDITION_LABEL]]、[[EDITION_YEAR]]、[[EDITORIAL_SELECTION]]、[[EDITORIAL_UPDATE_POLICY]]、[[EDITORIAL_VERIFICATION]]、[[FEED_DATE_01]]、[[FEED_DATE_02]]、[[FEED_DATE_03]]、[[FEED_DATE_04]]、[[FEED_DATE_05]]、[[FEED_DATE_06]]、[[FEED_DATE_07]]、[[FEED_DATE_08]]、[[FEED_DATE_09]]、[[FEED_DATE_10]]、[[FEED_DESCRIPTION]]、[[FEED_SUMMARY_01]]、[[FEED_SUMMARY_02]]、[[FEED_SUMMARY_03]]、[[FEED_SUMMARY_04]]、[[FEED_SUMMARY_05]]、[[FEED_SUMMARY_06]]、[[FEED_SUMMARY_07]]、[[FEED_SUMMARY_08]]、[[FEED_SUMMARY_09]]、[[FEED_SUMMARY_10]]、[[FIELD_INTERVIEW_CAPTION]]、[[FIELD_REGISTER_DESCRIPTION]]、[[FIELD_REGISTER_TITLE]]、[[GLOSSARY_DECK]]、[[GLOSSARY_INDEX_CAPTION]]、[[GLOSSARY_TITLE]]、[[HOME_DESCRIPTION]]、[[HOME_INTRODUCTION]]、[[HOME_TITLE]]、[[INTERVIEW_ANSWER_ONE]]、[[INTERVIEW_ANSWER_THREE]]、[[INTERVIEW_ANSWER_TWO]]、[[INTERVIEW_DECK]]、[[INTERVIEW_QUESTION_ONE]]、[[INTERVIEW_QUESTION_THREE]]、[[INTERVIEW_QUESTION_TWO]]、[[INTERVIEW_SUBJECT_NOTE]]、[[INTERVIEW_TITLE]]、[[INVITE_CODE]]、[[KEYPLATE_DECK]]、[[KEYPLATE_PULL_QUOTE]]、[[KEYPLATE_SECTION_ONE_BODY]]、[[KEYPLATE_SECTION_ONE_TITLE]]、[[KEYPLATE_SECTION_TWO_BODY]]、[[KEYPLATE_SECTION_TWO_TITLE]]、[[KEYPLATE_TITLE]]、[[MATRIX_CELL_1]]、[[MATRIX_CELL_2]]、[[MATRIX_CELL_3]]、[[MATRIX_CELL_4]]、[[MATRIX_CELL_5]]、[[MATRIX_CELL_6]]、[[MATRIX_COLUMN_A]]、[[MATRIX_COLUMN_B]]、[[MATRIX_COLUMN_C]]、[[MATRIX_COLUMN_D]]、[[MATRIX_DECK]]、[[MATRIX_READING_NOTE]]、[[MATRIX_ROW_ONE]]、[[MATRIX_ROW_TWO]]、[[MATRIX_SECTION_TITLE]]、[[MATRIX_TITLE]]、[[METHODOLOGY_DECK]]、[[METHODOLOGY_FOLIO_CAPTION]]、[[METHODOLOGY_TITLE]]、[[METHOD_EDITION_NOTE]]、[[METHOD_LIMIT_BODY]]、[[METHOD_LIMIT_TITLE]]、[[METHOD_REGISTER_DESCRIPTION]]、[[METHOD_REGISTER_TITLE]]、[[METHOD_SCOPE_BODY]]、[[METHOD_SCOPE_TITLE]]、[[METHOD_SOURCE_BODY]]、[[METHOD_SOURCE_TITLE]]、[[METRIC_A]]、[[METRIC_A_NOTE]]、[[METRIC_B]]、[[METRIC_B_NOTE]]、[[METRIC_C]]、[[METRIC_C_NOTE]]、[[METRIC_D]]、[[METRIC_D_NOTE]]、[[MODIFIED_DATE]]、[[PRIOR_EDITION_NOTE]]、[[PRIVACY_CONTACT_POLICY]]、[[PRIVACY_LOG_POLICY]]、[[PUBLISHED_DATE]]、[[REGIONAL_DECK]]、[[REGIONAL_FOOTNOTE]]、[[REGIONAL_PLATES_CAPTION]]、[[REGIONAL_TITLE]]、[[REGION_ONE_BODY]]、[[REGION_ONE_TITLE]]、[[REGION_THREE_BODY]]、[[REGION_THREE_TITLE]]、[[REGION_TWO_BODY]]、[[REGION_TWO_TITLE]]、[[REGISTER_USAGE_NOTE_1]]、[[REGISTER_USAGE_NOTE_2]]、[[REGISTER_USAGE_NOTE_3]]、[[REGISTRATION_ARTICLE_DECK]]、[[REGISTRATION_ARTICLE_TITLE]]、[[REGISTRATION_CONTEXT_NOTE]]、[[REGISTRATION_FACT_ONE_LABEL]]、[[REGISTRATION_FACT_ONE_VALUE]]、[[REGISTRATION_FACT_TWO_LABEL]]、[[REGISTRATION_FACT_TWO_VALUE]]、[[REGISTRATION_FAQ_ANSWER]]、[[REGISTRATION_FAQ_QUESTION]]、[[REGISTRATION_FAQ_TITLE]]、[[REGISTRATION_SECTION_ONE_BODY]]、[[REGISTRATION_SECTION_ONE_TITLE]]、[[REGISTRATION_SECTION_THREE_BODY]]、[[REGISTRATION_SECTION_THREE_TITLE]]、[[REGISTRATION_SECTION_TWO_TITLE]]、[[REVISION_DATE_ONE]]、[[REVISION_DATE_THREE]]、[[REVISION_DATE_TWO]]、[[REVISION_DECK]]、[[REVISION_ITEM_ONE]]、[[REVISION_ITEM_THREE]]、[[REVISION_ITEM_TWO]]、[[REVISION_LEDGER_CAPTION]]、[[REVISION_REASON_ONE]]、[[REVISION_REASON_THREE]]、[[REVISION_REASON_TWO]]、[[REVISION_STATUS_ONE]]、[[REVISION_STATUS_THREE]]、[[REVISION_STATUS_TWO]]、[[REVISION_TITLE]]、[[SCENARIO_BANDS_CAPTION]]、[[SCENARIO_CAVEAT]]、[[SCENARIO_CENTRAL_BODY]]、[[SCENARIO_CENTRAL_TITLE]]、[[SCENARIO_DECK]]、[[SCENARIO_LOW_BODY]]、[[SCENARIO_LOW_TITLE]]、[[SCENARIO_TITLE]]、[[SCENARIO_UP_BODY]]、[[SCENARIO_UP_TITLE]]、[[SECURITY_EMAIL]]、[[SECURITY_EXPIRES]]、[[SITE_DOMAIN]]、[[SITE_NAME]]、[[SOURCE_CHECK_BODY]]、[[SOURCE_CHECK_TITLE]]、[[SOURCE_CITATION_FORMAT]]、[[SOURCE_DECK]]、[[SOURCE_PRIMARY_BODY]]、[[SOURCE_PRIMARY_TITLE]]、[[SOURCE_SECONDARY_BODY]]、[[SOURCE_SECONDARY_TITLE]]、[[SOURCE_TITLE]]、[[SOURCE_TRAIL_CAPTION]]、[[TERM_FOUR]]、[[TERM_FOUR_DEFINITION]]、[[TERM_ONE]]、[[TERM_ONE_DEFINITION]]、[[TERM_THREE]]、[[TERM_THREE_DEFINITION]]、[[TERM_TWO]]、[[TERM_TWO_DEFINITION]]、[[TOOL_1_GUIDE_INPUT]]、[[TOOL_1_GUIDE_LIMITS]]、[[TOOL_1_GUIDE_METHOD]]、[[TOOL_1_GUIDE_PURPOSE]]、[[TOOL_1_GUIDE_READING]]、[[TOOL_2_GUIDE_INPUT]]、[[TOOL_2_GUIDE_LIMITS]]、[[TOOL_2_GUIDE_METHOD]]、[[TOOL_2_GUIDE_PURPOSE]]、[[TOOL_2_GUIDE_READING]]、[[TOOL_3_GUIDE_INPUT]]、[[TOOL_3_GUIDE_LIMITS]]、[[TOOL_3_GUIDE_METHOD]]、[[TOOL_3_GUIDE_PURPOSE]]、[[TOOL_3_GUIDE_READING]]、[[TOOL_4_GUIDE_INPUT]]、[[TOOL_4_GUIDE_LIMITS]]、[[TOOL_4_GUIDE_METHOD]]、[[TOOL_4_GUIDE_PURPOSE]]、[[TOOL_4_GUIDE_READING]]、[[TOOL_5_GUIDE_INPUT]]、[[TOOL_5_GUIDE_LIMITS]]、[[TOOL_5_GUIDE_METHOD]]、[[TOOL_5_GUIDE_PURPOSE]]、[[TOOL_5_GUIDE_READING]]、[[YEAR_ONE]]、[[YEAR_ONE_BODY]]、[[YEAR_ONE_TITLE]]、[[YEAR_THREE]]、[[YEAR_THREE_BODY]]、[[YEAR_THREE_TITLE]]、[[YEAR_TWO]]、[[YEAR_TWO_BODY]]、[[YEAR_TWO_TITLE]]
