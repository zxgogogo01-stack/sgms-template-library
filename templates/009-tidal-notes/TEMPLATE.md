# 009-tidal-notes

## 模板定位

以海岸田野手账、潮位刻度、测深分区和抽屉式潮具构成的高端观察型内容站。模板只提供完整 UI、文章骨架和真工具，不含可发布文章、注册教程正文或具体平台事实；下游 AI 只填写站点变量与经核实的文字。

## 接入顺序

1. 替换品牌、域名、语言、作者、联系、邀请码与利益说明变量。
2. 按 N01–N12 填写正文，保留 route、window、log、warning、specimen 五种文章结构。
3. 只在 registrationGuide 角色页使用唯一注册链接槽位；其余页面保持零交易所转化直链。
4. 核实日期、来源、风险与问答后，运行三套审计并逐页做桌面和手机验收。

## 页面与工具

- 31 个 HTML：1 首页、1 日志索引、12 日志外壳、3 测深分区、1 潮具索引、5 个真工具、7 个合规页与 1 个 404。
- 五件潮具：日期潮差尺、月龄近似盘、坐标岸距仪、观测节拍表、样本窗口尺；均覆盖正常、错误、边界、重置和复制状态。
- 12 张独立 1200×630 PNG/WebP 程序化海岸图，另有社交图、favicon 与 apple-touch-icon。

## 链接治理

- 首页采用形态 A：邀请码可复制，利益点使用弹性变量并带政策变化脚注，首页没有交易所直链。
- `field-notes/first-safe-harbor.html` 是唯一 registrationGuide 外壳，含恰好一个静态 `{{AFFILIATE_URL}}`，具备新窗口、完整 rel 与紧邻披露。
- 信息页、其他文章、潮具、合规页、导航、页脚和 404 不含转化直链。
- 模板不写死费率、限额、收益、确认数、监管结论、用户数或平台可用性。

## 实际占位符清单

- `{{ABOUT_BODY_2}}`
- `{{ABOUT_BODY}}`
- `{{ABOUT_DESC}}`
- `{{ABOUT_H2_1}}`
- `{{ABOUT_H2_2}}`
- `{{ABOUT_NOTE_BODY}}`
- `{{ABOUT_NOTE_TITLE}}`
- `{{AFFILIATE_CTA}}`
- `{{AFFILIATE_URL}}`
- `{{ARTICLE_INDEX_DESC}}`
- `{{ARTICLE_INDEX_LEAD}}`
- `{{AUTHOR_BIO}}`
- `{{AUTHOR_NAME}}`
- `{{BENEFIT_DISCLAIMER}}`
- `{{BENEFIT_RATE}}`
- `{{BRAND_EN}}`
- `{{CONTACT_BODY_2}}`
- `{{CONTACT_BODY}}`
- `{{CONTACT_DESC}}`
- `{{CONTACT_EMAIL}}`
- `{{CONTACT_H2_1}}`
- `{{CONTACT_H2_2}}`
- `{{CONTACT_NOTE_BODY}}`
- `{{CONTACT_NOTE_TITLE}}`
- `{{CORRECTIONS_BODY_2}}`
- `{{CORRECTIONS_BODY}}`
- `{{CORRECTIONS_DESC}}`
- `{{CORRECTIONS_H2_1}}`
- `{{CORRECTIONS_H2_2}}`
- `{{CORRECTIONS_NOTE_BODY}}`
- `{{CORRECTIONS_NOTE_TITLE}}`
- `{{DATE_MODIFIED}}`
- `{{DATE_PUBLISHED}}`
- `{{DISCLOSURE_BODY_2}}`
- `{{DISCLOSURE_BODY}}`
- `{{DISCLOSURE_DESC}}`
- `{{DISCLOSURE_H2_1}}`
- `{{DISCLOSURE_H2_2}}`
- `{{DISCLOSURE_NOTE_BODY}}`
- `{{DISCLOSURE_NOTE_TITLE}}`
- `{{EDITORIAL_BODY_2}}`
- `{{EDITORIAL_BODY}}`
- `{{EDITORIAL_DESC}}`
- `{{EDITORIAL_H2_1}}`
- `{{EDITORIAL_H2_2}}`
- `{{EDITORIAL_NOTE_BODY}}`
- `{{EDITORIAL_NOTE_TITLE}}`
- `{{FEED_TITLE}}`
- `{{GROUP_CURRENT_INTRO}}`
- `{{GROUP_DEPARTURE_INTRO}}`
- `{{GROUP_WEATHER_INTRO}}`
- `{{INVITE_CODE}}`
- `{{LANG}}`
- `{{LEGAL_BODY_2}}`
- `{{LEGAL_BODY}}`
- `{{LEGAL_DESC}}`
- `{{LEGAL_H2_1}}`
- `{{LEGAL_H2_2}}`
- `{{LEGAL_NOTE_BODY}}`
- `{{LEGAL_NOTE_TITLE}}`
- `{{N01_AFFILIATE_DISCLOSURE}}`
- `{{N01_BODY_1}}`
- `{{N01_BODY_2}}`
- `{{N01_BOUNDARY}}`
- `{{N01_COVER_ALT}}`
- `{{N01_COVER_CAPTION}}`
- `{{N01_DATE}}`
- `{{N01_DESC}}`
- `{{N01_FAQ_A1}}`
- `{{N01_FAQ_A2}}`
- `{{N01_FAQ_Q1}}`
- `{{N01_FAQ_Q2}}`
- `{{N01_H2_1}}`
- `{{N01_H2_2}}`
- `{{N01_LEAD}}`
- `{{N01_LINK_CONTEXT}}`
- `{{N01_PUBDATE_RFC822}}`
- `{{N01_READING}}`
- `{{N01_ROUTE_1}}`
- `{{N01_ROUTE_2}}`
- `{{N01_ROUTE_3}}`
- `{{N01_ROUTE_NOTE_1}}`
- `{{N01_ROUTE_NOTE_2}}`
- `{{N01_ROUTE_NOTE_3}}`
- `{{N01_TITLE}}`
- `{{N02_BODY_1}}`
- `{{N02_BODY_2}}`
- `{{N02_COVER_ALT}}`
- `{{N02_COVER_CAPTION}}`
- `{{N02_DATE}}`
- `{{N02_DESC}}`
- `{{N02_FAQ_A1}}`
- `{{N02_FAQ_Q1}}`
- `{{N02_H2_1}}`
- `{{N02_H2_2}}`
- `{{N02_LEAD}}`
- `{{N02_OPTION_A_NOTE}}`
- `{{N02_OPTION_A}}`
- `{{N02_OPTION_B_NOTE}}`
- `{{N02_OPTION_B}}`
- `{{N02_PUBDATE_RFC822}}`
- `{{N02_READING}}`
- `{{N02_TABLE_A1}}`
- `{{N02_TABLE_A2}}`
- `{{N02_TABLE_A3}}`
- `{{N02_TABLE_B1}}`
- `{{N02_TABLE_B2}}`
- `{{N02_TABLE_B3}}`
- `{{N02_TABLE_H1}}`
- `{{N02_TABLE_H2}}`
- `{{N02_TABLE_H3}}`
- `{{N02_TITLE}}`
- `{{N03_BODY_1}}`
- `{{N03_BODY_2}}`
- `{{N03_COVER_ALT}}`
- `{{N03_COVER_CAPTION}}`
- `{{N03_DATE}}`
- `{{N03_DESC}}`
- `{{N03_H2_1}}`
- `{{N03_H2_2}}`
- `{{N03_LEAD}}`
- `{{N03_LOG_MARK_1}}`
- `{{N03_LOG_MARK_2}}`
- `{{N03_LOG_MARK_3}}`
- `{{N03_LOG_VALUE_1}}`
- `{{N03_LOG_VALUE_2}}`
- `{{N03_LOG_VALUE_3}}`
- `{{N03_PUBDATE_RFC822}}`
- `{{N03_QUOTE}}`
- `{{N03_READING}}`
- `{{N03_REVIEW_DATE}}`
- `{{N03_REVIEW_LABEL}}`
- `{{N03_TITLE}}`
- `{{N04_ALERT_BODY}}`
- `{{N04_ALERT_LEVEL}}`
- `{{N04_ALERT_TITLE}}`
- `{{N04_BODY_1}}`
- `{{N04_BODY_2}}`
- `{{N04_CHECK_1}}`
- `{{N04_CHECK_2}}`
- `{{N04_CHECK_3}}`
- `{{N04_COVER_ALT}}`
- `{{N04_COVER_CAPTION}}`
- `{{N04_DATE}}`
- `{{N04_DESC}}`
- `{{N04_FAQ_A1}}`
- `{{N04_FAQ_A2}}`
- `{{N04_FAQ_Q1}}`
- `{{N04_FAQ_Q2}}`
- `{{N04_H2_1}}`
- `{{N04_H2_2}}`
- `{{N04_LEAD}}`
- `{{N04_PUBDATE_RFC822}}`
- `{{N04_READING}}`
- `{{N04_STOP_RULE}}`
- `{{N04_TITLE}}`
- `{{N05_BODY_1}}`
- `{{N05_BODY_2}}`
- `{{N05_COVER_ALT}}`
- `{{N05_COVER_CAPTION}}`
- `{{N05_DATE}}`
- `{{N05_DESC}}`
- `{{N05_FAQ_A1}}`
- `{{N05_FAQ_Q1}}`
- `{{N05_H2_1}}`
- `{{N05_H2_2}}`
- `{{N05_LEAD}}`
- `{{N05_METHOD_1}}`
- `{{N05_METHOD_2}}`
- `{{N05_METHOD_3}}`
- `{{N05_PUBDATE_RFC822}}`
- `{{N05_READING}}`
- `{{N05_SAMPLE_1}}`
- `{{N05_SAMPLE_2}}`
- `{{N05_SAMPLE_3}}`
- `{{N05_SAMPLE_NOTE_1}}`
- `{{N05_SAMPLE_NOTE_2}}`
- `{{N05_SAMPLE_NOTE_3}}`
- `{{N05_TITLE}}`
- `{{N06_BODY_1}}`
- `{{N06_BODY_2}}`
- `{{N06_COVER_ALT}}`
- `{{N06_COVER_CAPTION}}`
- `{{N06_DATE}}`
- `{{N06_DESC}}`
- `{{N06_H2_1}}`
- `{{N06_H2_2}}`
- `{{N06_LEAD}}`
- `{{N06_LOG_MARK_1}}`
- `{{N06_LOG_MARK_2}}`
- `{{N06_LOG_MARK_3}}`
- `{{N06_LOG_VALUE_1}}`
- `{{N06_LOG_VALUE_2}}`
- `{{N06_LOG_VALUE_3}}`
- `{{N06_PUBDATE_RFC822}}`
- `{{N06_QUOTE}}`
- `{{N06_READING}}`
- `{{N06_REVIEW_DATE}}`
- `{{N06_REVIEW_LABEL}}`
- `{{N06_TITLE}}`
- `{{N07_BODY_1}}`
- `{{N07_BODY_2}}`
- `{{N07_COVER_ALT}}`
- `{{N07_COVER_CAPTION}}`
- `{{N07_DATE}}`
- `{{N07_DESC}}`
- `{{N07_FAQ_A1}}`
- `{{N07_FAQ_Q1}}`
- `{{N07_H2_1}}`
- `{{N07_H2_2}}`
- `{{N07_LEAD}}`
- `{{N07_OPTION_A_NOTE}}`
- `{{N07_OPTION_A}}`
- `{{N07_OPTION_B_NOTE}}`
- `{{N07_OPTION_B}}`
- `{{N07_PUBDATE_RFC822}}`
- `{{N07_READING}}`
- `{{N07_TABLE_A1}}`
- `{{N07_TABLE_A2}}`
- `{{N07_TABLE_A3}}`
- `{{N07_TABLE_B1}}`
- `{{N07_TABLE_B2}}`
- `{{N07_TABLE_B3}}`
- `{{N07_TABLE_H1}}`
- `{{N07_TABLE_H2}}`
- `{{N07_TABLE_H3}}`
- `{{N07_TITLE}}`
- `{{N08_BODY_1}}`
- `{{N08_BODY_2}}`
- `{{N08_COVER_ALT}}`
- `{{N08_COVER_CAPTION}}`
- `{{N08_DATE}}`
- `{{N08_DESC}}`
- `{{N08_FAQ_A1}}`
- `{{N08_FAQ_Q1}}`
- `{{N08_H2_1}}`
- `{{N08_H2_2}}`
- `{{N08_LEAD}}`
- `{{N08_METHOD_1}}`
- `{{N08_METHOD_2}}`
- `{{N08_METHOD_3}}`
- `{{N08_PUBDATE_RFC822}}`
- `{{N08_READING}}`
- `{{N08_SAMPLE_1}}`
- `{{N08_SAMPLE_2}}`
- `{{N08_SAMPLE_3}}`
- `{{N08_SAMPLE_NOTE_1}}`
- `{{N08_SAMPLE_NOTE_2}}`
- `{{N08_SAMPLE_NOTE_3}}`
- `{{N08_TITLE}}`
- `{{N09_ALERT_BODY}}`
- `{{N09_ALERT_LEVEL}}`
- `{{N09_ALERT_TITLE}}`
- `{{N09_BODY_1}}`
- `{{N09_BODY_2}}`
- `{{N09_CHECK_1}}`
- `{{N09_CHECK_2}}`
- `{{N09_CHECK_3}}`
- `{{N09_COVER_ALT}}`
- `{{N09_COVER_CAPTION}}`
- `{{N09_DATE}}`
- `{{N09_DESC}}`
- `{{N09_FAQ_A1}}`
- `{{N09_FAQ_A2}}`
- `{{N09_FAQ_Q1}}`
- `{{N09_FAQ_Q2}}`
- `{{N09_H2_1}}`
- `{{N09_H2_2}}`
- `{{N09_LEAD}}`
- `{{N09_PUBDATE_RFC822}}`
- `{{N09_READING}}`
- `{{N09_STOP_RULE}}`
- `{{N09_TITLE}}`
- `{{N10_BODY_1}}`
- `{{N10_BODY_2}}`
- `{{N10_COVER_ALT}}`
- `{{N10_COVER_CAPTION}}`
- `{{N10_DATE}}`
- `{{N10_DESC}}`
- `{{N10_H2_1}}`
- `{{N10_H2_2}}`
- `{{N10_LEAD}}`
- `{{N10_LOG_MARK_1}}`
- `{{N10_LOG_MARK_2}}`
- `{{N10_LOG_MARK_3}}`
- `{{N10_LOG_VALUE_1}}`
- `{{N10_LOG_VALUE_2}}`
- `{{N10_LOG_VALUE_3}}`
- `{{N10_PUBDATE_RFC822}}`
- `{{N10_QUOTE}}`
- `{{N10_READING}}`
- `{{N10_REVIEW_DATE}}`
- `{{N10_REVIEW_LABEL}}`
- `{{N10_TITLE}}`
- `{{N11_BODY_1}}`
- `{{N11_BODY_2}}`
- `{{N11_COVER_ALT}}`
- `{{N11_COVER_CAPTION}}`
- `{{N11_DATE}}`
- `{{N11_DESC}}`
- `{{N11_FAQ_A1}}`
- `{{N11_FAQ_Q1}}`
- `{{N11_H2_1}}`
- `{{N11_H2_2}}`
- `{{N11_LEAD}}`
- `{{N11_METHOD_1}}`
- `{{N11_METHOD_2}}`
- `{{N11_METHOD_3}}`
- `{{N11_PUBDATE_RFC822}}`
- `{{N11_READING}}`
- `{{N11_SAMPLE_1}}`
- `{{N11_SAMPLE_2}}`
- `{{N11_SAMPLE_3}}`
- `{{N11_SAMPLE_NOTE_1}}`
- `{{N11_SAMPLE_NOTE_2}}`
- `{{N11_SAMPLE_NOTE_3}}`
- `{{N11_TITLE}}`
- `{{N12_BODY_1}}`
- `{{N12_BODY_2}}`
- `{{N12_BOUNDARY}}`
- `{{N12_COVER_ALT}}`
- `{{N12_COVER_CAPTION}}`
- `{{N12_DATE}}`
- `{{N12_DESC}}`
- `{{N12_FAQ_A1}}`
- `{{N12_FAQ_A2}}`
- `{{N12_FAQ_Q1}}`
- `{{N12_FAQ_Q2}}`
- `{{N12_H2_1}}`
- `{{N12_H2_2}}`
- `{{N12_LEAD}}`
- `{{N12_PUBDATE_RFC822}}`
- `{{N12_READING}}`
- `{{N12_ROUTE_1}}`
- `{{N12_ROUTE_2}}`
- `{{N12_ROUTE_3}}`
- `{{N12_ROUTE_NOTE_1}}`
- `{{N12_ROUTE_NOTE_2}}`
- `{{N12_ROUTE_NOTE_3}}`
- `{{N12_TITLE}}`
- `{{PRIVACY_BODY_2}}`
- `{{PRIVACY_BODY}}`
- `{{PRIVACY_DESC}}`
- `{{PRIVACY_H2_1}}`
- `{{PRIVACY_H2_2}}`
- `{{PRIVACY_NOTE_BODY}}`
- `{{PRIVACY_NOTE_TITLE}}`
- `{{SECURITY_EXPIRES}}`
- `{{SITE_DESC}}`
- `{{SITE_DOMAIN}}`
- `{{SITE_NAME}}`
- `{{SITE_TAGLINE}}`
- `{{TOOL_01_DESC}}`
- `{{TOOL_01_GUIDE_BODY}}`
- `{{TOOL_01_GUIDE_H1}}`
- `{{TOOL_01_GUIDE_H2}}`
- `{{TOOL_01_GUIDE_H3}}`
- `{{TOOL_01_GUIDE_H4}}`
- `{{TOOL_01_GUIDE_H5}}`
- `{{TOOL_01_GUIDE_P1}}`
- `{{TOOL_01_GUIDE_P2}}`
- `{{TOOL_01_GUIDE_P3}}`
- `{{TOOL_01_GUIDE_P4}}`
- `{{TOOL_01_GUIDE_P5}}`
- `{{TOOL_01_GUIDE_TITLE}}`
- `{{TOOL_01_LIMIT}}`
- `{{TOOL_02_DESC}}`
- `{{TOOL_02_GUIDE_BODY}}`
- `{{TOOL_02_GUIDE_H1}}`
- `{{TOOL_02_GUIDE_H2}}`
- `{{TOOL_02_GUIDE_H3}}`
- `{{TOOL_02_GUIDE_H4}}`
- `{{TOOL_02_GUIDE_H5}}`
- `{{TOOL_02_GUIDE_P1}}`
- `{{TOOL_02_GUIDE_P2}}`
- `{{TOOL_02_GUIDE_P3}}`
- `{{TOOL_02_GUIDE_P4}}`
- `{{TOOL_02_GUIDE_P5}}`
- `{{TOOL_02_GUIDE_TITLE}}`
- `{{TOOL_02_LIMIT}}`
- `{{TOOL_03_DESC}}`
- `{{TOOL_03_GUIDE_BODY}}`
- `{{TOOL_03_GUIDE_H1}}`
- `{{TOOL_03_GUIDE_H2}}`
- `{{TOOL_03_GUIDE_H3}}`
- `{{TOOL_03_GUIDE_H4}}`
- `{{TOOL_03_GUIDE_H5}}`
- `{{TOOL_03_GUIDE_P1}}`
- `{{TOOL_03_GUIDE_P2}}`
- `{{TOOL_03_GUIDE_P3}}`
- `{{TOOL_03_GUIDE_P4}}`
- `{{TOOL_03_GUIDE_P5}}`
- `{{TOOL_03_GUIDE_TITLE}}`
- `{{TOOL_03_LIMIT}}`
- `{{TOOL_04_DESC}}`
- `{{TOOL_04_GUIDE_BODY}}`
- `{{TOOL_04_GUIDE_H1}}`
- `{{TOOL_04_GUIDE_H2}}`
- `{{TOOL_04_GUIDE_H3}}`
- `{{TOOL_04_GUIDE_H4}}`
- `{{TOOL_04_GUIDE_H5}}`
- `{{TOOL_04_GUIDE_P1}}`
- `{{TOOL_04_GUIDE_P2}}`
- `{{TOOL_04_GUIDE_P3}}`
- `{{TOOL_04_GUIDE_P4}}`
- `{{TOOL_04_GUIDE_P5}}`
- `{{TOOL_04_GUIDE_TITLE}}`
- `{{TOOL_04_LIMIT}}`
- `{{TOOL_05_DESC}}`
- `{{TOOL_05_GUIDE_BODY}}`
- `{{TOOL_05_GUIDE_H1}}`
- `{{TOOL_05_GUIDE_H2}}`
- `{{TOOL_05_GUIDE_H3}}`
- `{{TOOL_05_GUIDE_H4}}`
- `{{TOOL_05_GUIDE_H5}}`
- `{{TOOL_05_GUIDE_P1}}`
- `{{TOOL_05_GUIDE_P2}}`
- `{{TOOL_05_GUIDE_P3}}`
- `{{TOOL_05_GUIDE_P4}}`
- `{{TOOL_05_GUIDE_P5}}`
- `{{TOOL_05_GUIDE_TITLE}}`
- `{{TOOL_05_LIMIT}}`
- `{{TOOL_INDEX_DESC}}`
- `{{TOOL_INDEX_LEAD}}`
- `{{YEAR}}`

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "article.html",
  "articles": [
    "field-notes/first-safe-harbor.html",
    "field-notes/reading-cost-currents.html",
    "field-notes/status-change-watch.html",
    "field-notes/identity-paper-weather.html",
    "field-notes/transfer-route-notes.html",
    "field-notes/recovery-lantern-log.html",
    "field-notes/cost-sample-sheet.html",
    "field-notes/session-weather-map.html",
    "field-notes/hold-window-log.html",
    "field-notes/policy-shoreline-change.html",
    "field-notes/evidence-field-kit.html",
    "field-notes/message-weather-check.html"
  ],
  "cornerstones": [
    "field-notes/reading-cost-currents.html",
    "field-notes/cost-sample-sheet.html"
  ],
  "registrationGuide": "field-notes/first-safe-harbor.html",
  "articleCovers": {
    "field-notes/first-safe-harbor.html": {
      "display": "assets/covers/first-safe-harbor.webp",
      "og": "assets/covers/first-safe-harbor.png"
    },
    "field-notes/reading-cost-currents.html": {
      "display": "assets/covers/reading-cost-currents.webp",
      "og": "assets/covers/reading-cost-currents.png"
    },
    "field-notes/status-change-watch.html": {
      "display": "assets/covers/status-change-watch.webp",
      "og": "assets/covers/status-change-watch.png"
    },
    "field-notes/identity-paper-weather.html": {
      "display": "assets/covers/identity-paper-weather.webp",
      "og": "assets/covers/identity-paper-weather.png"
    },
    "field-notes/transfer-route-notes.html": {
      "display": "assets/covers/transfer-route-notes.webp",
      "og": "assets/covers/transfer-route-notes.png"
    },
    "field-notes/recovery-lantern-log.html": {
      "display": "assets/covers/recovery-lantern-log.webp",
      "og": "assets/covers/recovery-lantern-log.png"
    },
    "field-notes/cost-sample-sheet.html": {
      "display": "assets/covers/cost-sample-sheet.webp",
      "og": "assets/covers/cost-sample-sheet.png"
    },
    "field-notes/session-weather-map.html": {
      "display": "assets/covers/session-weather-map.webp",
      "og": "assets/covers/session-weather-map.png"
    },
    "field-notes/hold-window-log.html": {
      "display": "assets/covers/hold-window-log.webp",
      "og": "assets/covers/hold-window-log.png"
    },
    "field-notes/policy-shoreline-change.html": {
      "display": "assets/covers/policy-shoreline-change.webp",
      "og": "assets/covers/policy-shoreline-change.png"
    },
    "field-notes/evidence-field-kit.html": {
      "display": "assets/covers/evidence-field-kit.webp",
      "og": "assets/covers/evidence-field-kit.png"
    },
    "field-notes/message-weather-check.html": {
      "display": "assets/covers/message-weather-check.webp",
      "og": "assets/covers/message-weather-check.png"
    }
  },
  "categories": [
    {
      "path": "soundings/departure-soundings.html",
      "label": "启程测深",
      "articles": [
        "field-notes/first-safe-harbor.html",
        "field-notes/reading-cost-currents.html",
        "field-notes/status-change-watch.html",
        "field-notes/identity-paper-weather.html"
      ]
    },
    {
      "path": "soundings/current-observations.html",
      "label": "水流观测",
      "articles": [
        "field-notes/transfer-route-notes.html",
        "field-notes/recovery-lantern-log.html",
        "field-notes/cost-sample-sheet.html",
        "field-notes/session-weather-map.html"
      ]
    },
    {
      "path": "soundings/weather-boundaries.html",
      "label": "天气边界",
      "articles": [
        "field-notes/hold-window-log.html",
        "field-notes/policy-shoreline-change.html",
        "field-notes/evidence-field-kit.html",
        "field-notes/message-weather-check.html"
      ]
    }
  ],
  "toolIndex": "tool.html",
  "tools": [
    "instruments/date-gap-tide.html",
    "instruments/lunar-age-dial.html",
    "instruments/shore-distance.html",
    "instruments/cadence-planner.html",
    "instruments/sample-window.html"
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
    "siteDomain": "{{SITE_DOMAIN}}",
    "siteName": "{{SITE_NAME}}",
    "wordmark": "{{BRAND_EN}}",
    "inviteCode": "{{INVITE_CODE}}",
    "benefitRate": "{{BENEFIT_RATE}}",
    "benefitDisclaimer": "{{BENEFIT_DISCLAIMER}}",
    "affiliateUrl": "{{AFFILIATE_URL}}"
  }
}
```
