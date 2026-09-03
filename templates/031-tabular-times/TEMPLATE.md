# 031 — Tabular Times / 表格时报

这是一套 workflow-ready v2 的高端数据出版模板。新闻纸底、编辑蓝、警示橙、密排版线、版次栏和不对称表格共同形成一份可翻阅的晨报；它不复用上一套深海海图、浮标、岛屿或暗色航线结构。

后续 AI 只需替换站点变量、经核验的文字、来源、日期和文章正文，不需要重新设计导航、响应式、SEO 元数据、十二张封面、分类、法律页或五件工具。占位符只是文字接入口，不代表已核验事实。

## 已完成框架

- 首页形态 A：首屏邀请码、复制功能、弹性利益点、脚注与唯一编辑式访问资料入口；没有外部推广直链。
- 12 篇文章分别使用头版台账、时间轴、双栏对照、页边批注、片区卡、现场规程、修订台、来源簿、窗口带、编辑访谈、术语表和访问专栏结构。
- 三张独立版组桌、五件纯本地算具、七个合规页、404、RSS、安全联系、图标、社交图与 12 套 1200×630 PNG/WebP 封面均已接好。
- 五件算具分别处理变化率、加权均值、百分位位置、滚动均值和日期间隔；各自具有正常、错误、边界、重置、复制与输入后旧结果失效状态。

## 访问资料页边界

`dispatches/access-column.html` 只是内容与 UI 外壳，不含注册步骤、平台规则、费率或监管事实。它恰好保留一个静态 `AFFILIATE_URL` href，带 `target=_blank`、`rel=sponsored nofollow noopener noreferrer`，并紧邻可见的推荐/推广链接披露；其余页面没有推广直链。

## 内容接入顺序

1. 替换站名、域名、英文 wordmark、作者、联系、日期、邀请码、利益比例和脚注。
2. 按实际关键词与事实调研填写十二篇文字；保留十二种内容结构。数字、费用、限制与监管信息必须核验来源和日期。
3. 只替换文字、链接和 alt；保留 `data-*` 选择器、DOM 主骨架、表单 id、ARIA、封面尺寸和脚本引用。
4. 默认保持首页形态 A。具体站如需形态 B，必须由站主在单站流程中明确授权。
5. 完成文字后重跑三套静态审计、相似度检查，并在桌面、390px、360px 实测 31 条路由、首页复制/主题/菜单/筛选、五工具全部状态、访问资料链接属性和 404 三出口。

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "article.html",
  "articles": [
    "dispatches/morning-ledger.html",
    "dispatches/signal-timeline.html",
    "dispatches/district-compare.html",
    "dispatches/anomaly-notes.html",
    "dispatches/station-cards.html",
    "dispatches/field-protocol.html",
    "dispatches/revision-desk.html",
    "dispatches/source-register.html",
    "dispatches/weather-board.html",
    "dispatches/desk-interview.html",
    "dispatches/measure-glossary.html",
    "dispatches/access-column.html"
  ],
  "cornerstones": [
    "dispatches/morning-ledger.html",
    "dispatches/field-protocol.html"
  ],
  "registrationGuide": "dispatches/access-column.html",
  "articleCovers": {
    "dispatches/morning-ledger.html": {
      "display": "assets/covers/morning-ledger.webp",
      "og": "assets/covers/morning-ledger.png"
    },
    "dispatches/signal-timeline.html": {
      "display": "assets/covers/signal-timeline.webp",
      "og": "assets/covers/signal-timeline.png"
    },
    "dispatches/district-compare.html": {
      "display": "assets/covers/district-compare.webp",
      "og": "assets/covers/district-compare.png"
    },
    "dispatches/anomaly-notes.html": {
      "display": "assets/covers/anomaly-notes.webp",
      "og": "assets/covers/anomaly-notes.png"
    },
    "dispatches/station-cards.html": {
      "display": "assets/covers/station-cards.webp",
      "og": "assets/covers/station-cards.png"
    },
    "dispatches/field-protocol.html": {
      "display": "assets/covers/field-protocol.webp",
      "og": "assets/covers/field-protocol.png"
    },
    "dispatches/revision-desk.html": {
      "display": "assets/covers/revision-desk.webp",
      "og": "assets/covers/revision-desk.png"
    },
    "dispatches/source-register.html": {
      "display": "assets/covers/source-register.webp",
      "og": "assets/covers/source-register.png"
    },
    "dispatches/weather-board.html": {
      "display": "assets/covers/weather-board.webp",
      "og": "assets/covers/weather-board.png"
    },
    "dispatches/desk-interview.html": {
      "display": "assets/covers/desk-interview.webp",
      "og": "assets/covers/desk-interview.png"
    },
    "dispatches/measure-glossary.html": {
      "display": "assets/covers/measure-glossary.webp",
      "og": "assets/covers/measure-glossary.png"
    },
    "dispatches/access-column.html": {
      "display": "assets/covers/access-column.webp",
      "og": "assets/covers/access-column.png"
    }
  },
  "categories": [
    {
      "path": "registers/street-signals.html",
      "label": "街道读数",
      "articles": [
        "dispatches/morning-ledger.html",
        "dispatches/signal-timeline.html",
        "dispatches/district-compare.html",
        "dispatches/anomaly-notes.html"
      ]
    },
    {
      "path": "registers/civic-life.html",
      "label": "公共生活",
      "articles": [
        "dispatches/station-cards.html",
        "dispatches/field-protocol.html",
        "dispatches/revision-desk.html",
        "dispatches/source-register.html"
      ]
    },
    {
      "path": "registers/newsroom-methods.html",
      "label": "编辑现场",
      "articles": [
        "dispatches/weather-board.html",
        "dispatches/desk-interview.html",
        "dispatches/measure-glossary.html",
        "dispatches/access-column.html"
      ]
    }
  ],
  "toolIndex": "tool.html",
  "tools": [
    "calculators/percentage-change.html",
    "calculators/weighted-mean.html",
    "calculators/percentile-rank.html",
    "calculators/rolling-average.html",
    "calculators/date-gap.html"
  ],
  "legal": {
    "about": "colophon.html",
    "contact": "contact.html",
    "disclosure": "legal.html",
    "disclaimer": "limits.html",
    "privacy": "privacy.html",
    "corrections": "corrections.html",
    "editorial": "standards.html"
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

- `__ABOUT_AUTHORSHIP__`
- `__ABOUT_CONTACT_NOTE__`
- `__ABOUT_DESCRIPTION__`
- `__ABOUT_SCOPE__`
- `__ABOUT_TITLE__`
- `__ACCESS_COVER_ALT__`
- `__ACCESS_COVER_CAPTION__`
- `__ACCESS_DECK__`
- `__ACCESS_DESCRIPTION__`
- `__ACCESS_FACT_ONE_LABEL__`
- `__ACCESS_FACT_ONE_VALUE__`
- `__ACCESS_FACT_TWO_LABEL__`
- `__ACCESS_FACT_TWO_VALUE__`
- `__ACCESS_FAQ_ANSWER__`
- `__ACCESS_FAQ_QUESTION__`
- `__ACCESS_READING_TIME__`
- `__ACCESS_SECTION_1_BODY__`
- `__ACCESS_SECTION_1_TITLE__`
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
- `__ANOMALY_COVER_ALT__`
- `__ANOMALY_COVER_CAPTION__`
- `__ANOMALY_DECK__`
- `__ANOMALY_DESCRIPTION__`
- `__ANOMALY_NOTE_1__`
- `__ANOMALY_NOTE_2__`
- `__ANOMALY_NOTE_3__`
- `__ANOMALY_NOTE_4__`
- `__ANOMALY_NOTE_5__`
- `__ANOMALY_READING_TIME__`
- `__ANOMALY_SECTION_1_BODY__`
- `__ANOMALY_SECTION_1_TITLE__`
- `__ANOMALY_SECTION_2_BODY__`
- `__ANOMALY_SECTION_2_TITLE__`
- `__ANOMALY_SECTION_3_BODY__`
- `__ANOMALY_SECTION_3_TITLE__`
- `__ANOMALY_SECTION_4_BODY__`
- `__ANOMALY_SECTION_4_TITLE__`
- `__ANOMALY_SECTION_5_BODY__`
- `__ANOMALY_SECTION_5_TITLE__`
- `__ANOMALY_SOURCE_NOTE__`
- `__ANOMALY_TITLE__`
- `__ARTICLE_INDEX_DESCRIPTION__`
- `__ARTICLE_INDEX_INTRODUCTION__`
- `__ARTICLE_INDEX_TITLE__`
- `__AUTHOR_NAME__`
- `__BENEFIT_DISCLAIMER__`
- `__BENEFIT_RATE__`
- `__BRAND_EN__`
- `__CIVIC_REGISTER_DESCRIPTION__`
- `__CIVIC_REGISTER_TITLE__`
- `__COMPARE_COVER_ALT__`
- `__COMPARE_COVER_CAPTION__`
- `__COMPARE_DECK__`
- `__COMPARE_DESCRIPTION__`
- `__COMPARE_READING_TIME__`
- `__COMPARE_SECTION_1_TITLE__`
- `__COMPARE_SECTION_2_TITLE__`
- `__COMPARE_SECTION_3_TITLE__`
- `__COMPARE_SECTION_4_TITLE__`
- `__COMPARE_SECTION_5_TITLE__`
- `__COMPARE_SIDE_A_1__`
- `__COMPARE_SIDE_A_2__`
- `__COMPARE_SIDE_A_3__`
- `__COMPARE_SIDE_A_4__`
- `__COMPARE_SIDE_A_5__`
- `__COMPARE_SIDE_A_LABEL__`
- `__COMPARE_SIDE_B_1__`
- `__COMPARE_SIDE_B_2__`
- `__COMPARE_SIDE_B_3__`
- `__COMPARE_SIDE_B_4__`
- `__COMPARE_SIDE_B_5__`
- `__COMPARE_SIDE_B_LABEL__`
- `__COMPARE_SOURCE_NOTE__`
- `__COMPARE_TITLE__`
- `__CONTACT_CORRECTION_NOTE__`
- `__CONTACT_DESCRIPTION__`
- `__CONTACT_EMAIL__`
- `__CONTACT_INTRODUCTION__`
- `__CONTACT_TITLE__`
- `__CORRECTIONS_DESCRIPTION__`
- `__CORRECTIONS_POLICY__`
- `__CORRECTIONS_SUBMISSION__`
- `__CORRECTIONS_TITLE__`
- `__CORRECTION_DATE_ONE__`
- `__CORRECTION_DATE_THREE__`
- `__CORRECTION_DATE_TWO__`
- `__CORRECTION_LOG_ONE__`
- `__CORRECTION_LOG_THREE__`
- `__CORRECTION_LOG_TWO__`
- `__DATEGAP_GUIDE_BOUNDARY__`
- `__DATEGAP_GUIDE_INPUT__`
- `__DATEGAP_GUIDE_METHOD__`
- `__DATEGAP_GUIDE_PRIVACY__`
- `__DATEGAP_GUIDE_RESULT__`
- `__DISCLAIMER_DESCRIPTION__`
- `__DISCLAIMER_EXTERNAL_NOTE__`
- `__DISCLAIMER_INFORMATION_SCOPE__`
- `__DISCLAIMER_JURISDICTION_NOTE__`
- `__DISCLAIMER_TITLE__`
- `__DISCLOSURE_COST_NOTE__`
- `__DISCLOSURE_DESCRIPTION__`
- `__DISCLOSURE_EDITORIAL_NOTE__`
- `__DISCLOSURE_LINK_POLICY__`
- `__DISCLOSURE_RELATIONSHIP__`
- `__DISCLOSURE_TITLE__`
- `__EDITORIAL_DATE_POLICY__`
- `__EDITORIAL_DESCRIPTION__`
- `__EDITORIAL_FACT_CHECK__`
- `__EDITORIAL_SOURCES__`
- `__EDITORIAL_TITLE__`
- `__EDITORIAL_TOOL_POLICY__`
- `__FEED_DESCRIPTION__`
- `__FEED_PUBDATE__`
- `__GLOSSARY_COVER_ALT__`
- `__GLOSSARY_COVER_CAPTION__`
- `__GLOSSARY_DECK__`
- `__GLOSSARY_DESCRIPTION__`
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
- `__INDEX_INTRODUCTION__`
- `__INTERVIEW_ANSWER_1__`
- `__INTERVIEW_ANSWER_2__`
- `__INTERVIEW_ANSWER_3__`
- `__INTERVIEW_ANSWER_4__`
- `__INTERVIEW_ANSWER_5__`
- `__INTERVIEW_COVER_ALT__`
- `__INTERVIEW_COVER_CAPTION__`
- `__INTERVIEW_DECK__`
- `__INTERVIEW_DESCRIPTION__`
- `__INTERVIEW_QUESTION_1__`
- `__INTERVIEW_QUESTION_2__`
- `__INTERVIEW_QUESTION_3__`
- `__INTERVIEW_QUESTION_4__`
- `__INTERVIEW_QUESTION_5__`
- `__INTERVIEW_READING_TIME__`
- `__INTERVIEW_SECTION_1_TITLE__`
- `__INTERVIEW_SECTION_2_TITLE__`
- `__INTERVIEW_SECTION_3_TITLE__`
- `__INTERVIEW_SECTION_4_TITLE__`
- `__INTERVIEW_SECTION_5_TITLE__`
- `__INTERVIEW_SOURCE_NOTE__`
- `__INTERVIEW_TITLE__`
- `__INVITE_CODE__`
- `__LANG__`
- `__MODIFIED_DATE__`
- `__MORNING_COVER_ALT__`
- `__MORNING_COVER_CAPTION__`
- `__MORNING_DECK__`
- `__MORNING_DESCRIPTION__`
- `__MORNING_METRIC_ONE_LABEL__`
- `__MORNING_METRIC_ONE_VALUE__`
- `__MORNING_METRIC_THREE_LABEL__`
- `__MORNING_METRIC_THREE_VALUE__`
- `__MORNING_METRIC_TWO_LABEL__`
- `__MORNING_METRIC_TWO_VALUE__`
- `__MORNING_PULLQUOTE__`
- `__MORNING_READING_TIME__`
- `__MORNING_SECTION_1_BODY__`
- `__MORNING_SECTION_1_LABEL__`
- `__MORNING_SECTION_1_TITLE__`
- `__MORNING_SECTION_2_BODY__`
- `__MORNING_SECTION_2_LABEL__`
- `__MORNING_SECTION_2_TITLE__`
- `__MORNING_SECTION_3_BODY__`
- `__MORNING_SECTION_3_LABEL__`
- `__MORNING_SECTION_3_TITLE__`
- `__MORNING_SECTION_4_BODY__`
- `__MORNING_SECTION_4_LABEL__`
- `__MORNING_SECTION_4_TITLE__`
- `__MORNING_SECTION_5_BODY__`
- `__MORNING_SECTION_5_LABEL__`
- `__MORNING_SECTION_5_TITLE__`
- `__MORNING_SOURCE_NOTE__`
- `__MORNING_TITLE__`
- `__NEWSROOM_REGISTER_DESCRIPTION__`
- `__NEWSROOM_REGISTER_TITLE__`
- `__PERCENT_GUIDE_BOUNDARY__`
- `__PERCENT_GUIDE_INPUT__`
- `__PERCENT_GUIDE_METHOD__`
- `__PERCENT_GUIDE_PRIVACY__`
- `__PERCENT_GUIDE_RESULT__`
- `__PRIVACY_CONTACT_NOTE__`
- `__PRIVACY_DESCRIPTION__`
- `__PRIVACY_EXTERNAL_LINKS__`
- `__PRIVACY_HOSTING_LOGS__`
- `__PRIVACY_LOCAL_PROCESSING__`
- `__PRIVACY_TITLE__`
- `__PROTOCOL_CELL_ONE__`
- `__PROTOCOL_CELL_THREE__`
- `__PROTOCOL_CELL_TWO__`
- `__PROTOCOL_COLUMN_ONE__`
- `__PROTOCOL_COLUMN_THREE__`
- `__PROTOCOL_COLUMN_TWO__`
- `__PROTOCOL_COVER_ALT__`
- `__PROTOCOL_COVER_CAPTION__`
- `__PROTOCOL_DECK__`
- `__PROTOCOL_DESCRIPTION__`
- `__PROTOCOL_READING_TIME__`
- `__PROTOCOL_SECTION_1_BODY__`
- `__PROTOCOL_SECTION_1_TITLE__`
- `__PROTOCOL_SECTION_2_BODY__`
- `__PROTOCOL_SECTION_2_TITLE__`
- `__PROTOCOL_SECTION_3_BODY__`
- `__PROTOCOL_SECTION_3_TITLE__`
- `__PROTOCOL_SECTION_4_BODY__`
- `__PROTOCOL_SECTION_4_TITLE__`
- `__PROTOCOL_SECTION_5_BODY__`
- `__PROTOCOL_SECTION_5_TITLE__`
- `__PROTOCOL_SOURCE_NOTE__`
- `__PROTOCOL_TABLE_CAPTION__`
- `__PROTOCOL_TITLE__`
- `__PUBLISHED_DATE__`
- `__RANK_GUIDE_BOUNDARY__`
- `__RANK_GUIDE_INPUT__`
- `__RANK_GUIDE_METHOD__`
- `__RANK_GUIDE_PRIVACY__`
- `__RANK_GUIDE_RESULT__`
- `__RANK_SECONDARY_PLACEHOLDER__`
- `__REVISION_COVER_ALT__`
- `__REVISION_COVER_CAPTION__`
- `__REVISION_DECK__`
- `__REVISION_DESCRIPTION__`
- `__REVISION_READING_TIME__`
- `__REVISION_REVISION_1_DATE__`
- `__REVISION_REVISION_1_STATUS__`
- `__REVISION_REVISION_2_DATE__`
- `__REVISION_REVISION_2_STATUS__`
- `__REVISION_REVISION_3_DATE__`
- `__REVISION_REVISION_3_STATUS__`
- `__REVISION_REVISION_4_DATE__`
- `__REVISION_REVISION_4_STATUS__`
- `__REVISION_REVISION_5_DATE__`
- `__REVISION_REVISION_5_STATUS__`
- `__REVISION_SECTION_1_BODY__`
- `__REVISION_SECTION_1_TITLE__`
- `__REVISION_SECTION_2_BODY__`
- `__REVISION_SECTION_2_TITLE__`
- `__REVISION_SECTION_3_BODY__`
- `__REVISION_SECTION_3_TITLE__`
- `__REVISION_SECTION_4_BODY__`
- `__REVISION_SECTION_4_TITLE__`
- `__REVISION_SECTION_5_BODY__`
- `__REVISION_SECTION_5_TITLE__`
- `__REVISION_SOURCE_NOTE__`
- `__REVISION_TITLE__`
- `__ROLLING_GUIDE_BOUNDARY__`
- `__ROLLING_GUIDE_INPUT__`
- `__ROLLING_GUIDE_METHOD__`
- `__ROLLING_GUIDE_PRIVACY__`
- `__ROLLING_GUIDE_RESULT__`
- `__ROLLING_SECONDARY_PLACEHOLDER__`
- `__SECURITY_EXPIRES__`
- `__SITE_DOMAIN__`
- `__SITE_NAME__`
- `__SOURCE_COVER_ALT__`
- `__SOURCE_COVER_CAPTION__`
- `__SOURCE_DECK__`
- `__SOURCE_DESCRIPTION__`
- `__SOURCE_READING_TIME__`
- `__SOURCE_SECTION_1_BODY__`
- `__SOURCE_SECTION_1_TITLE__`
- `__SOURCE_SECTION_2_BODY__`
- `__SOURCE_SECTION_2_TITLE__`
- `__SOURCE_SECTION_3_BODY__`
- `__SOURCE_SECTION_3_TITLE__`
- `__SOURCE_SECTION_4_BODY__`
- `__SOURCE_SECTION_4_TITLE__`
- `__SOURCE_SECTION_5_BODY__`
- `__SOURCE_SECTION_5_TITLE__`
- `__SOURCE_SOURCE_1_LABEL__`
- `__SOURCE_SOURCE_1_VALUE__`
- `__SOURCE_SOURCE_2_LABEL__`
- `__SOURCE_SOURCE_2_VALUE__`
- `__SOURCE_SOURCE_3_LABEL__`
- `__SOURCE_SOURCE_3_VALUE__`
- `__SOURCE_SOURCE_4_LABEL__`
- `__SOURCE_SOURCE_4_VALUE__`
- `__SOURCE_SOURCE_5_LABEL__`
- `__SOURCE_SOURCE_5_VALUE__`
- `__SOURCE_SOURCE_NOTE__`
- `__SOURCE_TITLE__`
- `__STATION_CARD_1_FOOT__`
- `__STATION_CARD_2_FOOT__`
- `__STATION_CARD_3_FOOT__`
- `__STATION_CARD_4_FOOT__`
- `__STATION_CARD_5_FOOT__`
- `__STATION_COVER_ALT__`
- `__STATION_COVER_CAPTION__`
- `__STATION_DECK__`
- `__STATION_DESCRIPTION__`
- `__STATION_READING_TIME__`
- `__STATION_SECTION_1_BODY__`
- `__STATION_SECTION_1_TITLE__`
- `__STATION_SECTION_2_BODY__`
- `__STATION_SECTION_2_TITLE__`
- `__STATION_SECTION_3_BODY__`
- `__STATION_SECTION_3_TITLE__`
- `__STATION_SECTION_4_BODY__`
- `__STATION_SECTION_4_TITLE__`
- `__STATION_SECTION_5_BODY__`
- `__STATION_SECTION_5_TITLE__`
- `__STATION_SOURCE_NOTE__`
- `__STATION_TITLE__`
- `__STREETS_REGISTER_DESCRIPTION__`
- `__STREETS_REGISTER_TITLE__`
- `__TIMELINE_COVER_ALT__`
- `__TIMELINE_COVER_CAPTION__`
- `__TIMELINE_DECK__`
- `__TIMELINE_DESCRIPTION__`
- `__TIMELINE_POINT_1_TIME__`
- `__TIMELINE_POINT_2_TIME__`
- `__TIMELINE_POINT_3_TIME__`
- `__TIMELINE_POINT_4_TIME__`
- `__TIMELINE_POINT_5_TIME__`
- `__TIMELINE_READING_TIME__`
- `__TIMELINE_SECTION_1_BODY__`
- `__TIMELINE_SECTION_1_TITLE__`
- `__TIMELINE_SECTION_2_BODY__`
- `__TIMELINE_SECTION_2_TITLE__`
- `__TIMELINE_SECTION_3_BODY__`
- `__TIMELINE_SECTION_3_TITLE__`
- `__TIMELINE_SECTION_4_BODY__`
- `__TIMELINE_SECTION_4_TITLE__`
- `__TIMELINE_SECTION_5_BODY__`
- `__TIMELINE_SECTION_5_TITLE__`
- `__TIMELINE_SOURCE_NOTE__`
- `__TIMELINE_TITLE__`
- `__TOOL_INDEX_DESCRIPTION__`
- `__TOOL_INDEX_INTRODUCTION__`
- `__TOOL_INDEX_TITLE__`
- `__WEATHER_BAND_1_WINDOW__`
- `__WEATHER_BAND_2_WINDOW__`
- `__WEATHER_BAND_3_WINDOW__`
- `__WEATHER_BAND_4_WINDOW__`
- `__WEATHER_BAND_5_WINDOW__`
- `__WEATHER_COVER_ALT__`
- `__WEATHER_COVER_CAPTION__`
- `__WEATHER_DECK__`
- `__WEATHER_DESCRIPTION__`
- `__WEATHER_READING_TIME__`
- `__WEATHER_SECTION_1_BODY__`
- `__WEATHER_SECTION_1_TITLE__`
- `__WEATHER_SECTION_2_BODY__`
- `__WEATHER_SECTION_2_TITLE__`
- `__WEATHER_SECTION_3_BODY__`
- `__WEATHER_SECTION_3_TITLE__`
- `__WEATHER_SECTION_4_BODY__`
- `__WEATHER_SECTION_4_TITLE__`
- `__WEATHER_SECTION_5_BODY__`
- `__WEATHER_SECTION_5_TITLE__`
- `__WEATHER_SOURCE_NOTE__`
- `__WEATHER_TITLE__`
- `__WEIGHTED_GUIDE_BOUNDARY__`
- `__WEIGHTED_GUIDE_INPUT__`
- `__WEIGHTED_GUIDE_METHOD__`
- `__WEIGHTED_GUIDE_PRIVACY__`
- `__WEIGHTED_GUIDE_RESULT__`
