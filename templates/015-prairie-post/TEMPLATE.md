# 015-prairie-post

## 定位

一份沿地平线展开的高端草原邮报：墨绿电报架、砖红邮戳、麦秆纸、日出黄与蓝灰天空。首页以“地平线晨版—读者邮戳—县域分栏—测具棚—邮袋目录”组织内容，不使用常见卡片式 SaaS 首屏；移动端收拢成一张可纵向阅读的窄幅报纸。

## 后续 AI 只填文字

31 条公开页面、12 种文章版式、3 个县域分类、5 件真实本地工具、7 个合规页面、12 对独立封面、社交图、SEO 头部与交互已完整接好。后续 AI 只替换变量并填写经过核实的文字，不修改路径、class、CSS、JS、导航数量或工具算法。

1. 先统一替换站名、域名、罗马字品牌、邀请码、利益比例与政策脚注、作者、日期和联系邮箱。
2. 再逐页填写现有文字槽位。12 篇分别采用电报路线、田野报告、勘界图、门廊访谈、天气日志、分叉决策、说法核验、里程时间线、双田对照、打孔清单、白话词典与四季年鉴，不能把它们改成同一种文章排法。
3. `dispatches/entry-telegram.html` 是唯一 registrationGuide 外壳，也是全站唯一 `%AFFILIATE_URL%` 链接槽位。它只提供页面结构与变量，不含可直接发布的注册教程正文；不要新增第二条推广链接。
4. 首页保持形态 A：显眼展示邀请码、复制控件、弹性利益点、政策脚注和一处编辑推荐式文章入口，不含交易平台直链。
5. 五件测具均为浏览器本地计算，分别处理刊期步距、阅读时长、变化幅度、日期新鲜度与逐行去重；不得描述为实时行情、官方接口或联网结果。
6. 替换文章封面时保持同名 PNG/WebP 成对、1200×630、无图中文字，并保留现有 preload、尺寸、alt 与 fetchpriority。

## 页面角色表

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "article.html",
  "articles": [
    "dispatches/entry-telegram.html",
    "dispatches/signal-field-report.html",
    "dispatches/route-survey.html",
    "dispatches/porch-interview.html",
    "dispatches/weather-ledger.html",
    "dispatches/forked-trail.html",
    "dispatches/myth-bulletin.html",
    "dispatches/incident-mileposts.html",
    "dispatches/two-field-comparison.html",
    "dispatches/packing-checklist.html",
    "dispatches/plain-language-glossary.html",
    "dispatches/seasonal-almanac.html"
  ],
  "cornerstones": [
    "dispatches/entry-telegram.html",
    "dispatches/signal-field-report.html"
  ],
  "registrationGuide": "dispatches/entry-telegram.html",
  "articleCovers": {
    "dispatches/entry-telegram.html": {
      "display": "assets/covers/entry-telegram.webp",
      "og": "assets/covers/entry-telegram.png"
    },
    "dispatches/signal-field-report.html": {
      "display": "assets/covers/signal-field-report.webp",
      "og": "assets/covers/signal-field-report.png"
    },
    "dispatches/route-survey.html": {
      "display": "assets/covers/route-survey.webp",
      "og": "assets/covers/route-survey.png"
    },
    "dispatches/porch-interview.html": {
      "display": "assets/covers/porch-interview.webp",
      "og": "assets/covers/porch-interview.png"
    },
    "dispatches/weather-ledger.html": {
      "display": "assets/covers/weather-ledger.webp",
      "og": "assets/covers/weather-ledger.png"
    },
    "dispatches/forked-trail.html": {
      "display": "assets/covers/forked-trail.webp",
      "og": "assets/covers/forked-trail.png"
    },
    "dispatches/myth-bulletin.html": {
      "display": "assets/covers/myth-bulletin.webp",
      "og": "assets/covers/myth-bulletin.png"
    },
    "dispatches/incident-mileposts.html": {
      "display": "assets/covers/incident-mileposts.webp",
      "og": "assets/covers/incident-mileposts.png"
    },
    "dispatches/two-field-comparison.html": {
      "display": "assets/covers/two-field-comparison.webp",
      "og": "assets/covers/two-field-comparison.png"
    },
    "dispatches/packing-checklist.html": {
      "display": "assets/covers/packing-checklist.webp",
      "og": "assets/covers/packing-checklist.png"
    },
    "dispatches/plain-language-glossary.html": {
      "display": "assets/covers/plain-language-glossary.webp",
      "og": "assets/covers/plain-language-glossary.png"
    },
    "dispatches/seasonal-almanac.html": {
      "display": "assets/covers/seasonal-almanac.webp",
      "og": "assets/covers/seasonal-almanac.png"
    }
  },
  "categories": [
    {
      "path": "counties/first-mile.html",
      "label": "%COUNTY_A_TITLE%",
      "articles": [
        "dispatches/entry-telegram.html",
        "dispatches/signal-field-report.html",
        "dispatches/route-survey.html",
        "dispatches/porch-interview.html"
      ]
    },
    {
      "path": "counties/safe-passage.html",
      "label": "%COUNTY_B_TITLE%",
      "articles": [
        "dispatches/weather-ledger.html",
        "dispatches/forked-trail.html",
        "dispatches/myth-bulletin.html",
        "dispatches/incident-mileposts.html"
      ]
    },
    {
      "path": "counties/field-practice.html",
      "label": "%COUNTY_C_TITLE%",
      "articles": [
        "dispatches/two-field-comparison.html",
        "dispatches/packing-checklist.html",
        "dispatches/plain-language-glossary.html",
        "dispatches/seasonal-almanac.html"
      ]
    }
  ],
  "toolIndex": "tool.html",
  "tools": [
    "gauges/publishing-pace.html",
    "gauges/reading-clock.html",
    "gauges/change-gauge.html",
    "gauges/freshness-almanac.html",
    "gauges/line-sifter.html"
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

## 完整验收范围

- 31 页分别核验桌面、390px 与 360px；检查首屏、横向溢出、坏图、触控尺寸、控制台与明暗主题。
- 首页实点邀请码复制与主题；五工具逐一覆盖正常、错误、边界、重置和复制结果。
- 注册页只核验变量槽位、静态链接属性、披露邻接和无 JavaScript 依赖；文章文字仍由后续 AI 按事实源完成。

## 完整变量清单

- %ABOUT_BODY_01%
- %ABOUT_BODY_02%
- %ABOUT_BODY_03%
- %ABOUT_DESC%
- %ABOUT_H2_01%
- %ABOUT_H2_02%
- %ABOUT_H2_03%
- %ABOUT_NOTE_BODY%
- %ABOUT_NOTE_TITLE%
- %ABOUT_TITLE%
- %AFFILIATE_DISCLOSURE%
- %AFFILIATE_LINK_LABEL%
- %AFFILIATE_URL%
- %ARCHIVE_DESC%
- %ARCHIVE_TITLE%
- %ARTICLE_01_ANSWER%
- %ARTICLE_01_CAPTION%
- %ARTICLE_01_COVER_ALT%
- %ARTICLE_01_DESC%
- %ARTICLE_01_FAQ_A1%
- %ARTICLE_01_FAQ_A2%
- %ARTICLE_01_FAQ_A3%
- %ARTICLE_01_FAQ_Q1%
- %ARTICLE_01_FAQ_Q2%
- %ARTICLE_01_FAQ_Q3%
- %ARTICLE_01_FEED_SUMMARY%
- %ARTICLE_01_H2_01%
- %ARTICLE_01_H2_02%
- %ARTICLE_01_H2_03%
- %ARTICLE_01_H2_04%
- %ARTICLE_01_KICKER%
- %ARTICLE_01_NOTE_01_BODY%
- %ARTICLE_01_NOTE_01_TITLE%
- %ARTICLE_01_NOTE_02_BODY%
- %ARTICLE_01_NOTE_02_TITLE%
- %ARTICLE_01_PUBDATE%
- %ARTICLE_01_QUOTE%
- %ARTICLE_01_SECTION_01%
- %ARTICLE_01_SECTION_03%
- %ARTICLE_01_SIGNOFF_BODY%
- %ARTICLE_01_SIGNOFF_TITLE%
- %ARTICLE_01_STEP_01_BODY%
- %ARTICLE_01_STEP_01_TITLE%
- %ARTICLE_01_STEP_02_BODY%
- %ARTICLE_01_STEP_02_TITLE%
- %ARTICLE_01_STEP_03_BODY%
- %ARTICLE_01_STEP_03_TITLE%
- %ARTICLE_01_STEP_04_BODY%
- %ARTICLE_01_STEP_04_TITLE%
- %ARTICLE_01_TITLE%
- %ARTICLE_01_TOC_01%
- %ARTICLE_01_TOC_02%
- %ARTICLE_01_TOC_03%
- %ARTICLE_01_TOC_04%
- %ARTICLE_02_ANSWER%
- %ARTICLE_02_CAPTION%
- %ARTICLE_02_COVER_ALT%
- %ARTICLE_02_DATUM_01%
- %ARTICLE_02_DATUM_02%
- %ARTICLE_02_DATUM_03%
- %ARTICLE_02_DESC%
- %ARTICLE_02_DETAIL_01%
- %ARTICLE_02_FEED_SUMMARY%
- %ARTICLE_02_H2_01%
- %ARTICLE_02_H2_02%
- %ARTICLE_02_H2_03%
- %ARTICLE_02_H3_01%
- %ARTICLE_02_KICKER%
- %ARTICLE_02_PUBDATE%
- %ARTICLE_02_QUOTE%
- %ARTICLE_02_SECTION_01%
- %ARTICLE_02_SECTION_02%
- %ARTICLE_02_SECTION_03%
- %ARTICLE_02_SIDE_NOTE%
- %ARTICLE_02_SIGNOFF_BODY%
- %ARTICLE_02_SIGNOFF_TITLE%
- %ARTICLE_02_TABLE_A1%
- %ARTICLE_02_TABLE_A2%
- %ARTICLE_02_TABLE_B1%
- %ARTICLE_02_TABLE_B2%
- %ARTICLE_02_TABLE_H1%
- %ARTICLE_02_TABLE_H2%
- %ARTICLE_02_TITLE%
- %ARTICLE_03_ANSWER%
- %ARTICLE_03_CAPTION%
- %ARTICLE_03_COORDINATE_LABEL%
- %ARTICLE_03_COORDINATE_NOTE%
- %ARTICLE_03_COVER_ALT%
- %ARTICLE_03_DESC%
- %ARTICLE_03_FEED_SUMMARY%
- %ARTICLE_03_H2_01%
- %ARTICLE_03_H2_02%
- %ARTICLE_03_H2_03%
- %ARTICLE_03_H2_04%
- %ARTICLE_03_KICKER%
- %ARTICLE_03_LEGEND%
- %ARTICLE_03_PUBDATE%
- %ARTICLE_03_SECTION_01%
- %ARTICLE_03_SECTION_02%
- %ARTICLE_03_SECTION_03%
- %ARTICLE_03_SECTION_04%
- %ARTICLE_03_SIGNOFF_BODY%
- %ARTICLE_03_SIGNOFF_TITLE%
- %ARTICLE_03_TITLE%
- %ARTICLE_04_ANSWER%
- %ARTICLE_04_ANSWER_01%
- %ARTICLE_04_ANSWER_02%
- %ARTICLE_04_ANSWER_03%
- %ARTICLE_04_ANSWER_04%
- %ARTICLE_04_CAPTION%
- %ARTICLE_04_COVER_ALT%
- %ARTICLE_04_DESC%
- %ARTICLE_04_FEED_SUMMARY%
- %ARTICLE_04_INTERLUDE%
- %ARTICLE_04_KICKER%
- %ARTICLE_04_PUBDATE%
- %ARTICLE_04_QUESTION_01%
- %ARTICLE_04_QUESTION_02%
- %ARTICLE_04_QUESTION_03%
- %ARTICLE_04_QUESTION_04%
- %ARTICLE_04_SIGNOFF_BODY%
- %ARTICLE_04_SIGNOFF_TITLE%
- %ARTICLE_04_TITLE%
- %ARTICLE_05_ANSWER%
- %ARTICLE_05_CAPTION%
- %ARTICLE_05_COL_01%
- %ARTICLE_05_COL_02%
- %ARTICLE_05_COL_03%
- %ARTICLE_05_COVER_ALT%
- %ARTICLE_05_DESC%
- %ARTICLE_05_FEED_SUMMARY%
- %ARTICLE_05_H2_01%
- %ARTICLE_05_H2_02%
- %ARTICLE_05_KICKER%
- %ARTICLE_05_LEDE%
- %ARTICLE_05_NOTE_BODY%
- %ARTICLE_05_NOTE_TITLE%
- %ARTICLE_05_PUBDATE%
- %ARTICLE_05_ROW_1_A%
- %ARTICLE_05_ROW_1_B%
- %ARTICLE_05_ROW_1_C%
- %ARTICLE_05_ROW_2_A%
- %ARTICLE_05_ROW_2_B%
- %ARTICLE_05_ROW_2_C%
- %ARTICLE_05_ROW_3_A%
- %ARTICLE_05_ROW_3_B%
- %ARTICLE_05_ROW_3_C%
- %ARTICLE_05_ROW_4_A%
- %ARTICLE_05_ROW_4_B%
- %ARTICLE_05_ROW_4_C%
- %ARTICLE_05_SECTION_02%
- %ARTICLE_05_SIGNOFF_BODY%
- %ARTICLE_05_SIGNOFF_TITLE%
- %ARTICLE_05_STATUS%
- %ARTICLE_05_TITLE%
- %ARTICLE_06_ANSWER%
- %ARTICLE_06_BRANCH_A_BODY%
- %ARTICLE_06_BRANCH_A_END%
- %ARTICLE_06_BRANCH_A_TITLE%
- %ARTICLE_06_BRANCH_B_BODY%
- %ARTICLE_06_BRANCH_B_END%
- %ARTICLE_06_BRANCH_B_TITLE%
- %ARTICLE_06_BRANCH_C_BODY%
- %ARTICLE_06_BRANCH_C_END%
- %ARTICLE_06_BRANCH_C_TITLE%
- %ARTICLE_06_CAPTION%
- %ARTICLE_06_COVER_ALT%
- %ARTICLE_06_DESC%
- %ARTICLE_06_FEED_SUMMARY%
- %ARTICLE_06_H2_01%
- %ARTICLE_06_H2_02%
- %ARTICLE_06_KICKER%
- %ARTICLE_06_PUBDATE%
- %ARTICLE_06_SECTION_02%
- %ARTICLE_06_SIGNOFF_BODY%
- %ARTICLE_06_SIGNOFF_TITLE%
- %ARTICLE_06_TITLE%
- %ARTICLE_07_ANSWER%
- %ARTICLE_07_CAPTION%
- %ARTICLE_07_CLAIM_1_BODY%
- %ARTICLE_07_CLAIM_1_NOTE%
- %ARTICLE_07_CLAIM_1_TITLE%
- %ARTICLE_07_CLAIM_2_BODY%
- %ARTICLE_07_CLAIM_2_NOTE%
- %ARTICLE_07_CLAIM_2_TITLE%
- %ARTICLE_07_CLAIM_3_BODY%
- %ARTICLE_07_CLAIM_3_NOTE%
- %ARTICLE_07_CLAIM_3_TITLE%
- %ARTICLE_07_CLAIM_4_BODY%
- %ARTICLE_07_CLAIM_4_NOTE%
- %ARTICLE_07_CLAIM_4_TITLE%
- %ARTICLE_07_COVER_ALT%
- %ARTICLE_07_DESC%
- %ARTICLE_07_FEED_SUMMARY%
- %ARTICLE_07_KICKER%
- %ARTICLE_07_PUBDATE%
- %ARTICLE_07_SIGNOFF_BODY%
- %ARTICLE_07_SIGNOFF_TITLE%
- %ARTICLE_07_TITLE%
- %ARTICLE_08_AFTER_BODY%
- %ARTICLE_08_AFTER_TITLE%
- %ARTICLE_08_ANSWER%
- %ARTICLE_08_CAPTION%
- %ARTICLE_08_COVER_ALT%
- %ARTICLE_08_DESC%
- %ARTICLE_08_FEED_SUMMARY%
- %ARTICLE_08_H2_01%
- %ARTICLE_08_H2_02%
- %ARTICLE_08_H2_03%
- %ARTICLE_08_H2_04%
- %ARTICLE_08_H2_05%
- %ARTICLE_08_KICKER%
- %ARTICLE_08_LEDE%
- %ARTICLE_08_PUBDATE%
- %ARTICLE_08_SECTION_01%
- %ARTICLE_08_SECTION_02%
- %ARTICLE_08_SECTION_03%
- %ARTICLE_08_SECTION_04%
- %ARTICLE_08_SECTION_05%
- %ARTICLE_08_SIGNOFF_BODY%
- %ARTICLE_08_SIGNOFF_TITLE%
- %ARTICLE_08_TIME_1%
- %ARTICLE_08_TIME_2%
- %ARTICLE_08_TIME_3%
- %ARTICLE_08_TIME_4%
- %ARTICLE_08_TIME_5%
- %ARTICLE_08_TITLE%
- %ARTICLE_09_ANSWER%
- %ARTICLE_09_CAPTION%
- %ARTICLE_09_COVER_ALT%
- %ARTICLE_09_DESC%
- %ARTICLE_09_FEED_SUMMARY%
- %ARTICLE_09_H2_03%
- %ARTICLE_09_KICKER%
- %ARTICLE_09_OPTION_A_BODY%
- %ARTICLE_09_OPTION_A_POINT_1%
- %ARTICLE_09_OPTION_A_POINT_2%
- %ARTICLE_09_OPTION_A_POINT_3%
- %ARTICLE_09_OPTION_A_TITLE%
- %ARTICLE_09_OPTION_B_BODY%
- %ARTICLE_09_OPTION_B_POINT_1%
- %ARTICLE_09_OPTION_B_POINT_2%
- %ARTICLE_09_OPTION_B_POINT_3%
- %ARTICLE_09_OPTION_B_TITLE%
- %ARTICLE_09_PUBDATE%
- %ARTICLE_09_SECTION_03%
- %ARTICLE_09_SIGNOFF_BODY%
- %ARTICLE_09_SIGNOFF_TITLE%
- %ARTICLE_09_TITLE%
- %ARTICLE_09_VERDICT_LABEL%
- %ARTICLE_10_ANSWER%
- %ARTICLE_10_CAPTION%
- %ARTICLE_10_COVER_ALT%
- %ARTICLE_10_DESC%
- %ARTICLE_10_FEED_SUMMARY%
- %ARTICLE_10_ITEM_1_BODY%
- %ARTICLE_10_ITEM_1_TITLE%
- %ARTICLE_10_ITEM_2_BODY%
- %ARTICLE_10_ITEM_2_TITLE%
- %ARTICLE_10_ITEM_3_BODY%
- %ARTICLE_10_ITEM_3_TITLE%
- %ARTICLE_10_ITEM_4_BODY%
- %ARTICLE_10_ITEM_4_TITLE%
- %ARTICLE_10_ITEM_5_BODY%
- %ARTICLE_10_ITEM_5_TITLE%
- %ARTICLE_10_ITEM_6_BODY%
- %ARTICLE_10_ITEM_6_TITLE%
- %ARTICLE_10_KICKER%
- %ARTICLE_10_LEDE%
- %ARTICLE_10_PUBDATE%
- %ARTICLE_10_SIGNOFF_BODY%
- %ARTICLE_10_SIGNOFF_TITLE%
- %ARTICLE_10_TITLE%
- %ARTICLE_11_ANSWER%
- %ARTICLE_11_CAPTION%
- %ARTICLE_11_COVER_ALT%
- %ARTICLE_11_DESC%
- %ARTICLE_11_FEED_SUMMARY%
- %ARTICLE_11_KICKER%
- %ARTICLE_11_PUBDATE%
- %ARTICLE_11_SIGNOFF_BODY%
- %ARTICLE_11_SIGNOFF_TITLE%
- %ARTICLE_11_TERM_1%
- %ARTICLE_11_TERM_1_BODY%
- %ARTICLE_11_TERM_1_SHORT%
- %ARTICLE_11_TERM_2%
- %ARTICLE_11_TERM_2_BODY%
- %ARTICLE_11_TERM_2_SHORT%
- %ARTICLE_11_TERM_3%
- %ARTICLE_11_TERM_3_BODY%
- %ARTICLE_11_TERM_3_SHORT%
- %ARTICLE_11_TERM_4%
- %ARTICLE_11_TERM_4_BODY%
- %ARTICLE_11_TERM_4_SHORT%
- %ARTICLE_11_TERM_5%
- %ARTICLE_11_TERM_5_BODY%
- %ARTICLE_11_TERM_5_SHORT%
- %ARTICLE_11_TERM_6%
- %ARTICLE_11_TERM_6_BODY%
- %ARTICLE_11_TERM_6_SHORT%
- %ARTICLE_11_TITLE%
- %ARTICLE_12_ANSWER%
- %ARTICLE_12_CAPTION%
- %ARTICLE_12_COVER_ALT%
- %ARTICLE_12_DESC%
- %ARTICLE_12_H2_01%
- %ARTICLE_12_H2_02%
- %ARTICLE_12_KICKER%
- %ARTICLE_12_SEASON_1_BODY%
- %ARTICLE_12_SEASON_1_LABEL%
- %ARTICLE_12_SEASON_1_NOTE%
- %ARTICLE_12_SEASON_1_TITLE%
- %ARTICLE_12_SEASON_2_BODY%
- %ARTICLE_12_SEASON_2_LABEL%
- %ARTICLE_12_SEASON_2_NOTE%
- %ARTICLE_12_SEASON_2_TITLE%
- %ARTICLE_12_SEASON_3_BODY%
- %ARTICLE_12_SEASON_3_LABEL%
- %ARTICLE_12_SEASON_3_NOTE%
- %ARTICLE_12_SEASON_3_TITLE%
- %ARTICLE_12_SEASON_4_BODY%
- %ARTICLE_12_SEASON_4_LABEL%
- %ARTICLE_12_SEASON_4_NOTE%
- %ARTICLE_12_SEASON_4_TITLE%
- %ARTICLE_12_SECTION_02%
- %ARTICLE_12_SIGNOFF_BODY%
- %ARTICLE_12_SIGNOFF_TITLE%
- %ARTICLE_12_TITLE%
- %AUTHOR_NAME%
- %BENEFIT_DISCLAIMER%
- %BENEFIT_RATE%
- %BRAND_EN%
- %CONTACT_BODY_01%
- %CONTACT_BODY_02%
- %CONTACT_BODY_03%
- %CONTACT_DESC%
- %CONTACT_EMAIL%
- %CONTACT_H2_01%
- %CONTACT_H2_02%
- %CONTACT_H2_03%
- %CONTACT_NOTE_BODY%
- %CONTACT_NOTE_TITLE%
- %CONTACT_TITLE%
- %CORRECTIONS_BODY_01%
- %CORRECTIONS_BODY_02%
- %CORRECTIONS_BODY_03%
- %CORRECTIONS_DESC%
- %CORRECTIONS_H2_01%
- %CORRECTIONS_H2_02%
- %CORRECTIONS_H2_03%
- %CORRECTIONS_NOTE_BODY%
- %CORRECTIONS_NOTE_TITLE%
- %CORRECTIONS_TITLE%
- %COUNTY_A_DESC%
- %COUNTY_A_NOTE_BODY%
- %COUNTY_A_NOTE_TITLE%
- %COUNTY_A_TITLE%
- %COUNTY_B_DESC%
- %COUNTY_B_NOTE_BODY%
- %COUNTY_B_NOTE_TITLE%
- %COUNTY_B_TITLE%
- %COUNTY_C_DESC%
- %COUNTY_C_NOTE_BODY%
- %COUNTY_C_NOTE_TITLE%
- %COUNTY_C_TITLE%
- %CURRENT_YEAR%
- %DATE_MODIFIED%
- %DATE_PUBLISHED%
- %DISCLAIMER_BODY_01%
- %DISCLAIMER_BODY_02%
- %DISCLAIMER_BODY_03%
- %DISCLAIMER_DESC%
- %DISCLAIMER_H2_01%
- %DISCLAIMER_H2_02%
- %DISCLAIMER_H2_03%
- %DISCLAIMER_NOTE_BODY%
- %DISCLAIMER_NOTE_TITLE%
- %DISCLAIMER_TITLE%
- %DISCLOSURE_BODY_01%
- %DISCLOSURE_BODY_02%
- %DISCLOSURE_BODY_03%
- %DISCLOSURE_DESC%
- %DISCLOSURE_H2_01%
- %DISCLOSURE_H2_02%
- %DISCLOSURE_H2_03%
- %DISCLOSURE_NOTE_BODY%
- %DISCLOSURE_NOTE_TITLE%
- %DISCLOSURE_TITLE%
- %EDITORIAL_BODY_01%
- %EDITORIAL_BODY_02%
- %EDITORIAL_BODY_03%
- %EDITORIAL_DESC%
- %EDITORIAL_H2_01%
- %EDITORIAL_H2_02%
- %EDITORIAL_H2_03%
- %EDITORIAL_NOTE_BODY%
- %EDITORIAL_NOTE_TITLE%
- %EDITORIAL_TITLE%
- %HOME_ARCHIVE_DESC%
- %HOME_ARCHIVE_TITLE%
- %HOME_COUNTY_DESC%
- %HOME_COUNTY_TITLE%
- %HOME_DESC%
- %HOME_GUIDE_KICKER%
- %HOME_GUIDE_LABEL%
- %HOME_GUIDE_NOTE%
- %HOME_INDEX_NOTE%
- %HOME_TITLE%
- %INVITE_CODE%
- %JURISDICTION_NOTICE%
- %LANG%
- %NOT_FOUND_DESC%
- %NOT_FOUND_TITLE%
- %PRIVACY_BODY_01%
- %PRIVACY_BODY_02%
- %PRIVACY_BODY_03%
- %PRIVACY_DESC%
- %PRIVACY_H2_01%
- %PRIVACY_H2_02%
- %PRIVACY_H2_03%
- %PRIVACY_NOTE_BODY%
- %PRIVACY_NOTE_TITLE%
- %PRIVACY_TITLE%
- %READING_LABEL%
- %RISK_NOTICE%
- %RISK_TITLE%
- %RSS_BUILD_DATE%
- %RSS_DESC%
- %RSS_LABEL%
- %RSS_TITLE%
- %SECURITY_EXPIRES%
- %SITE_DESC%
- %SITE_DOMAIN%
- %SITE_NAME%
- %TOOLS_DESC%
- %TOOLS_NOTE_BODY%
- %TOOLS_NOTE_TITLE%
- %TOOLS_TITLE%
- %TOOL_01_DESC%
- %TOOL_01_GUIDE_H1%
- %TOOL_01_GUIDE_H2%
- %TOOL_01_GUIDE_H3%
- %TOOL_01_GUIDE_H4%
- %TOOL_01_GUIDE_H5%
- %TOOL_01_GUIDE_P1%
- %TOOL_01_GUIDE_P2%
- %TOOL_01_GUIDE_P3%
- %TOOL_01_GUIDE_P4%
- %TOOL_01_GUIDE_P5%
- %TOOL_01_GUIDE_TITLE%
- %TOOL_01_SHORT%
- %TOOL_01_TITLE%
- %TOOL_02_DESC%
- %TOOL_02_GUIDE_H1%
- %TOOL_02_GUIDE_H2%
- %TOOL_02_GUIDE_H3%
- %TOOL_02_GUIDE_H4%
- %TOOL_02_GUIDE_H5%
- %TOOL_02_GUIDE_P1%
- %TOOL_02_GUIDE_P2%
- %TOOL_02_GUIDE_P3%
- %TOOL_02_GUIDE_P4%
- %TOOL_02_GUIDE_P5%
- %TOOL_02_GUIDE_TITLE%
- %TOOL_02_SHORT%
- %TOOL_02_TITLE%
- %TOOL_03_DESC%
- %TOOL_03_GUIDE_H1%
- %TOOL_03_GUIDE_H2%
- %TOOL_03_GUIDE_H3%
- %TOOL_03_GUIDE_H4%
- %TOOL_03_GUIDE_H5%
- %TOOL_03_GUIDE_P1%
- %TOOL_03_GUIDE_P2%
- %TOOL_03_GUIDE_P3%
- %TOOL_03_GUIDE_P4%
- %TOOL_03_GUIDE_P5%
- %TOOL_03_GUIDE_TITLE%
- %TOOL_03_SHORT%
- %TOOL_03_TITLE%
- %TOOL_04_DESC%
- %TOOL_04_GUIDE_H1%
- %TOOL_04_GUIDE_H2%
- %TOOL_04_GUIDE_H3%
- %TOOL_04_GUIDE_H4%
- %TOOL_04_GUIDE_H5%
- %TOOL_04_GUIDE_P1%
- %TOOL_04_GUIDE_P2%
- %TOOL_04_GUIDE_P3%
- %TOOL_04_GUIDE_P4%
- %TOOL_04_GUIDE_P5%
- %TOOL_04_GUIDE_TITLE%
- %TOOL_04_SHORT%
- %TOOL_04_TITLE%
- %TOOL_05_DESC%
- %TOOL_05_GUIDE_H1%
- %TOOL_05_GUIDE_H2%
- %TOOL_05_GUIDE_H3%
- %TOOL_05_GUIDE_H4%
- %TOOL_05_GUIDE_H5%
- %TOOL_05_GUIDE_P1%
- %TOOL_05_GUIDE_P2%
- %TOOL_05_GUIDE_P3%
- %TOOL_05_GUIDE_P4%
- %TOOL_05_GUIDE_P5%
- %TOOL_05_GUIDE_TITLE%
- %TOOL_05_SHORT%
- %TOOL_05_TITLE%
