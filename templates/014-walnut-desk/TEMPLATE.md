# 014-walnut-desk

## 定位

一间可展开的胡桃木秘书桌：深色木纹柜体、黄铜铭牌、青绿色书写毡、奶油案卷和酒红封蜡。首页不是通用卡片网格，而是“桌面—抽屉—案卷—量具”四层空间；移动端会折叠成紧凑的随身写字柜。

## 后续 AI 只填文字

31 条公开页面、12 种文章案卷、3 只主题柜、5 件真实本地工具、7 个合规页面、12 对封面、SEO 头部、RSS、站点图标和全部交互已经接好。后续 AI 只替换变量并写经过核实的文字，不改路径、class、CSS、JS、导航、页面数量或工具算法。

1. 先替换站名、域名、罗马字品牌、邀请码、利益比例与脚注、作者、日期、邮箱等站级变量。
2. 再按各页面已有的文字槽位填写内容。十二篇案卷已分别预置快答抽屉、拓印页、边注账、标本格、蓝图、库存表、信笺、对照账、时间轨、证据板、工坊日志与月度卷宗；不要把它们抹平成同一种正文结构。
3. `folios/entry-drawer.html` 是唯一 registrationGuide 外壳，也是全站唯一 `%AFFILIATE_URL%` 链接槽位。这里只填写文章文字；不要增加第二条推广链接。首页保持形态 A，只展示邀请码、复制控件、弹性利益点与脚注。
4. 首页“编辑留笺”是唯一编辑推荐式 registrationGuide 内链。其余栏目、文章、工具、合规页、导航和页脚不增加统一导流块。
5. 五件工具都在浏览器本地计算，不读取接口或实时行情。工具说明不得声称连接 API、官方数据或实时价格。
6. 文章封面必须同名成对替换 PNG 与 WebP，并保持 1200×630、页面预加载和真实 alt。

## 页面角色表

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "article.html",
  "articles": [
    "folios/entry-drawer.html",
    "folios/cost-rubbing.html",
    "folios/identity-folio.html",
    "folios/transfer-pattern.html",
    "folios/custody-blueprint.html",
    "folios/recovery-inventory.html",
    "folios/evidence-letter.html",
    "folios/policy-comparison.html",
    "folios/account-timeline.html",
    "folios/source-pinboard.html",
    "folios/decision-worklog.html",
    "folios/monthly-folio.html"
  ],
  "cornerstones": [
    "folios/entry-drawer.html",
    "folios/cost-rubbing.html"
  ],
  "registrationGuide": "folios/entry-drawer.html",
  "articleCovers": {
    "folios/entry-drawer.html": {
      "display": "assets/covers/entry-drawer.webp",
      "og": "assets/covers/entry-drawer.png"
    },
    "folios/cost-rubbing.html": {
      "display": "assets/covers/cost-rubbing.webp",
      "og": "assets/covers/cost-rubbing.png"
    },
    "folios/identity-folio.html": {
      "display": "assets/covers/identity-folio.webp",
      "og": "assets/covers/identity-folio.png"
    },
    "folios/transfer-pattern.html": {
      "display": "assets/covers/transfer-pattern.webp",
      "og": "assets/covers/transfer-pattern.png"
    },
    "folios/custody-blueprint.html": {
      "display": "assets/covers/custody-blueprint.webp",
      "og": "assets/covers/custody-blueprint.png"
    },
    "folios/recovery-inventory.html": {
      "display": "assets/covers/recovery-inventory.webp",
      "og": "assets/covers/recovery-inventory.png"
    },
    "folios/evidence-letter.html": {
      "display": "assets/covers/evidence-letter.webp",
      "og": "assets/covers/evidence-letter.png"
    },
    "folios/policy-comparison.html": {
      "display": "assets/covers/policy-comparison.webp",
      "og": "assets/covers/policy-comparison.png"
    },
    "folios/account-timeline.html": {
      "display": "assets/covers/account-timeline.webp",
      "og": "assets/covers/account-timeline.png"
    },
    "folios/source-pinboard.html": {
      "display": "assets/covers/source-pinboard.webp",
      "og": "assets/covers/source-pinboard.png"
    },
    "folios/decision-worklog.html": {
      "display": "assets/covers/decision-worklog.webp",
      "og": "assets/covers/decision-worklog.png"
    },
    "folios/monthly-folio.html": {
      "display": "assets/covers/monthly-folio.webp",
      "og": "assets/covers/monthly-folio.png"
    }
  },
  "categories": [
    {
      "path": "cabinets/joinery-notes.html",
      "label": "%CABINET_A_TITLE%",
      "articles": [
        "folios/entry-drawer.html",
        "folios/cost-rubbing.html",
        "folios/identity-folio.html",
        "folios/transfer-pattern.html"
      ]
    },
    {
      "path": "cabinets/keeping-drawer.html",
      "label": "%CABINET_B_TITLE%",
      "articles": [
        "folios/custody-blueprint.html",
        "folios/recovery-inventory.html",
        "folios/evidence-letter.html",
        "folios/policy-comparison.html"
      ]
    },
    {
      "path": "cabinets/review-cabinet.html",
      "label": "%CABINET_C_TITLE%",
      "articles": [
        "folios/account-timeline.html",
        "folios/source-pinboard.html",
        "folios/decision-worklog.html",
        "folios/monthly-folio.html"
      ]
    }
  ],
  "toolIndex": "tool.html",
  "tools": [
    "tools/drawer-divider.html",
    "tools/unit-cost.html",
    "tools/interval-overlap.html",
    "tools/mod97-check.html",
    "tools/decision-matrix.html"
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

## 完整审计范围

- 首页：桌面与 390px/360px 首屏可见邀请码、复制、利益点、脚注和唯一编辑留笺；形态 A 无交易平台直链。
- 五工具：分别覆盖正常、错误、边界、重置、复制结果；所有输入只在本地处理。
- 全站：31 页逐个检查桌面/390px/360px、横向溢出、图片、触控尺寸、明暗主题、结构化数据、坏链、推广槽位、404 与控制台。

## 完整变量清单

- %ABOUT_DESC%
- %ABOUT_H2_01%
- %ABOUT_H2_02%
- %ABOUT_H2_03%
- %ABOUT_TITLE%
- %AFFILIATE_DISCLOSURE%
- %AFFILIATE_LINK_LABEL%
- %AFFILIATE_URL%
- %ARCHIVE_DESC%
- %ARCHIVE_TITLE%
- %ARTICLE_01_ANSWER%
- %ARTICLE_01_ANSWER_01%
- %ARTICLE_01_ANSWER_02%
- %ARTICLE_01_ANSWER_NOTE%
- %ARTICLE_01_CAPTION%
- %ARTICLE_01_COVER_ALT%
- %ARTICLE_01_DESC%
- %ARTICLE_01_FAQ_TITLE%
- %ARTICLE_01_FEED_SUMMARY%
- %ARTICLE_01_H2_01%
- %ARTICLE_01_H2_02%
- %ARTICLE_01_H2_03%
- %ARTICLE_01_H2_04%
- %ARTICLE_01_H2_05%
- %ARTICLE_01_LEDE%
- %ARTICLE_01_QUESTION_01%
- %ARTICLE_01_QUESTION_02%
- %ARTICLE_01_SECTION_01%
- %ARTICLE_01_SECTION_02%
- %ARTICLE_01_SECTION_03%
- %ARTICLE_01_SECTION_04%
- %ARTICLE_01_SECTION_05%
- %ARTICLE_01_SIGNOFF%
- %ARTICLE_01_STEP_01%
- %ARTICLE_01_STEP_02%
- %ARTICLE_01_STEP_03%
- %ARTICLE_01_TITLE%
- %ARTICLE_02_CAPTION%
- %ARTICLE_02_COVER_ALT%
- %ARTICLE_02_DESC%
- %ARTICLE_02_FEED_SUMMARY%
- %ARTICLE_02_FIGURE_LABEL%
- %ARTICLE_02_FIGURE_NOTE%
- %ARTICLE_02_FIGURE_VALUE%
- %ARTICLE_02_H2_01%
- %ARTICLE_02_H2_02%
- %ARTICLE_02_H2_03%
- %ARTICLE_02_H2_04%
- %ARTICLE_02_H2_05%
- %ARTICLE_02_H2_06%
- %ARTICLE_02_LEDE%
- %ARTICLE_02_QUOTE%
- %ARTICLE_02_SECTION_01%
- %ARTICLE_02_SECTION_02%
- %ARTICLE_02_SECTION_03%
- %ARTICLE_02_SECTION_04%
- %ARTICLE_02_SECTION_05%
- %ARTICLE_02_SECTION_06%
- %ARTICLE_02_SIGNOFF%
- %ARTICLE_02_TITLE%
- %ARTICLE_03_CAPTION%
- %ARTICLE_03_COVER_ALT%
- %ARTICLE_03_DESC%
- %ARTICLE_03_FEED_SUMMARY%
- %ARTICLE_03_H2_01%
- %ARTICLE_03_H2_02%
- %ARTICLE_03_H2_03%
- %ARTICLE_03_H2_04%
- %ARTICLE_03_H2_05%
- %ARTICLE_03_LEDE%
- %ARTICLE_03_MARGIN_01%
- %ARTICLE_03_MARGIN_02%
- %ARTICLE_03_MARGIN_03%
- %ARTICLE_03_SECTION_01%
- %ARTICLE_03_SECTION_02%
- %ARTICLE_03_SECTION_03%
- %ARTICLE_03_SECTION_04%
- %ARTICLE_03_SECTION_05%
- %ARTICLE_03_SIGNOFF%
- %ARTICLE_03_TITLE%
- %ARTICLE_04_CAPTION%
- %ARTICLE_04_COVER_ALT%
- %ARTICLE_04_DESC%
- %ARTICLE_04_FEED_SUMMARY%
- %ARTICLE_04_H2_01%
- %ARTICLE_04_H2_02%
- %ARTICLE_04_H2_03%
- %ARTICLE_04_H2_04%
- %ARTICLE_04_LEDE%
- %ARTICLE_04_SECTION_01%
- %ARTICLE_04_SECTION_02%
- %ARTICLE_04_SECTION_03%
- %ARTICLE_04_SECTION_04%
- %ARTICLE_04_SIGNOFF%
- %ARTICLE_04_SPECIMEN_A%
- %ARTICLE_04_SPECIMEN_B%
- %ARTICLE_04_SPECIMEN_C%
- %ARTICLE_04_TABLE_A1%
- %ARTICLE_04_TABLE_A2%
- %ARTICLE_04_TABLE_B1%
- %ARTICLE_04_TABLE_B2%
- %ARTICLE_04_TABLE_H1%
- %ARTICLE_04_TABLE_H2%
- %ARTICLE_04_TITLE%
- %ARTICLE_05_CAPTION%
- %ARTICLE_05_COVER_ALT%
- %ARTICLE_05_DESC%
- %ARTICLE_05_FEED_SUMMARY%
- %ARTICLE_05_H2_01%
- %ARTICLE_05_H2_02%
- %ARTICLE_05_H2_03%
- %ARTICLE_05_H2_04%
- %ARTICLE_05_H2_05%
- %ARTICLE_05_LEDE%
- %ARTICLE_05_PLAN_01%
- %ARTICLE_05_PLAN_02%
- %ARTICLE_05_PLAN_03%
- %ARTICLE_05_SECTION_01%
- %ARTICLE_05_SECTION_02%
- %ARTICLE_05_SECTION_03%
- %ARTICLE_05_SECTION_04%
- %ARTICLE_05_SECTION_05%
- %ARTICLE_05_SIGNOFF%
- %ARTICLE_05_TITLE%
- %ARTICLE_06_CAPTION%
- %ARTICLE_06_CHECK_01%
- %ARTICLE_06_CHECK_02%
- %ARTICLE_06_CHECK_03%
- %ARTICLE_06_CHECK_04%
- %ARTICLE_06_COVER_ALT%
- %ARTICLE_06_DESC%
- %ARTICLE_06_FEED_SUMMARY%
- %ARTICLE_06_H2_01%
- %ARTICLE_06_H2_02%
- %ARTICLE_06_H2_03%
- %ARTICLE_06_H2_04%
- %ARTICLE_06_LEDE%
- %ARTICLE_06_NOTE_BODY%
- %ARTICLE_06_NOTE_TITLE%
- %ARTICLE_06_SECTION_01%
- %ARTICLE_06_SECTION_02%
- %ARTICLE_06_SECTION_03%
- %ARTICLE_06_SECTION_04%
- %ARTICLE_06_SIGNOFF%
- %ARTICLE_06_TITLE%
- %ARTICLE_07_CAPTION%
- %ARTICLE_07_COVER_ALT%
- %ARTICLE_07_DATE%
- %ARTICLE_07_DESC%
- %ARTICLE_07_FEED_SUMMARY%
- %ARTICLE_07_H2_01%
- %ARTICLE_07_H2_02%
- %ARTICLE_07_H2_03%
- %ARTICLE_07_H2_04%
- %ARTICLE_07_H2_05%
- %ARTICLE_07_LEDE%
- %ARTICLE_07_OPENING%
- %ARTICLE_07_SECTION_01%
- %ARTICLE_07_SECTION_02%
- %ARTICLE_07_SECTION_03%
- %ARTICLE_07_SECTION_04%
- %ARTICLE_07_SECTION_05%
- %ARTICLE_07_SIGNOFF%
- %ARTICLE_07_TITLE%
- %ARTICLE_07_TO%
- %ARTICLE_08_CAPTION%
- %ARTICLE_08_COVER_ALT%
- %ARTICLE_08_DESC%
- %ARTICLE_08_FEED_SUMMARY%
- %ARTICLE_08_H2_01%
- %ARTICLE_08_H2_02%
- %ARTICLE_08_H2_03%
- %ARTICLE_08_H2_04%
- %ARTICLE_08_H2_05%
- %ARTICLE_08_LEDE%
- %ARTICLE_08_SECTION_01%
- %ARTICLE_08_SECTION_02%
- %ARTICLE_08_SECTION_03%
- %ARTICLE_08_SECTION_04%
- %ARTICLE_08_SECTION_05%
- %ARTICLE_08_SIGNOFF%
- %ARTICLE_08_TABLE_A1%
- %ARTICLE_08_TABLE_A2%
- %ARTICLE_08_TABLE_A3%
- %ARTICLE_08_TABLE_B1%
- %ARTICLE_08_TABLE_B2%
- %ARTICLE_08_TABLE_B3%
- %ARTICLE_08_TABLE_H1%
- %ARTICLE_08_TABLE_H2%
- %ARTICLE_08_TABLE_H3%
- %ARTICLE_08_TITLE%
- %ARTICLE_09_CAPTION%
- %ARTICLE_09_COVER_ALT%
- %ARTICLE_09_DESC%
- %ARTICLE_09_FEED_SUMMARY%
- %ARTICLE_09_H2_01%
- %ARTICLE_09_H2_02%
- %ARTICLE_09_H2_03%
- %ARTICLE_09_H2_04%
- %ARTICLE_09_LEDE%
- %ARTICLE_09_MOMENT_01%
- %ARTICLE_09_MOMENT_02%
- %ARTICLE_09_MOMENT_03%
- %ARTICLE_09_MOMENT_BODY_01%
- %ARTICLE_09_MOMENT_BODY_02%
- %ARTICLE_09_MOMENT_BODY_03%
- %ARTICLE_09_SECTION_01%
- %ARTICLE_09_SECTION_02%
- %ARTICLE_09_SECTION_03%
- %ARTICLE_09_SECTION_04%
- %ARTICLE_09_SIGNOFF%
- %ARTICLE_09_TIME_01%
- %ARTICLE_09_TIME_02%
- %ARTICLE_09_TIME_03%
- %ARTICLE_09_TITLE%
- %ARTICLE_10_CAPTION%
- %ARTICLE_10_COVER_ALT%
- %ARTICLE_10_DESC%
- %ARTICLE_10_FEED_SUMMARY%
- %ARTICLE_10_H2_01%
- %ARTICLE_10_H2_02%
- %ARTICLE_10_H2_03%
- %ARTICLE_10_H2_04%
- %ARTICLE_10_H2_05%
- %ARTICLE_10_LEDE%
- %ARTICLE_10_SECTION_01%
- %ARTICLE_10_SECTION_02%
- %ARTICLE_10_SECTION_03%
- %ARTICLE_10_SECTION_04%
- %ARTICLE_10_SECTION_05%
- %ARTICLE_10_SIGNOFF%
- %ARTICLE_10_SOURCE_01%
- %ARTICLE_10_SOURCE_02%
- %ARTICLE_10_SOURCE_03%
- %ARTICLE_10_SOURCE_NOTE_01%
- %ARTICLE_10_SOURCE_NOTE_02%
- %ARTICLE_10_SOURCE_NOTE_03%
- %ARTICLE_10_TITLE%
- %ARTICLE_11_CAPTION%
- %ARTICLE_11_COVER_ALT%
- %ARTICLE_11_DECISION_BODY%
- %ARTICLE_11_DECISION_LABEL%
- %ARTICLE_11_DESC%
- %ARTICLE_11_H2_01%
- %ARTICLE_11_H2_02%
- %ARTICLE_11_H2_03%
- %ARTICLE_11_H2_04%
- %ARTICLE_11_H2_05%
- %ARTICLE_11_H2_06%
- %ARTICLE_11_LEDE%
- %ARTICLE_11_METER_LABEL%
- %ARTICLE_11_METER_NOTE%
- %ARTICLE_11_METER_VALUE%
- %ARTICLE_11_SECTION_01%
- %ARTICLE_11_SECTION_02%
- %ARTICLE_11_SECTION_03%
- %ARTICLE_11_SECTION_04%
- %ARTICLE_11_SECTION_05%
- %ARTICLE_11_SECTION_06%
- %ARTICLE_11_SIGNOFF%
- %ARTICLE_11_TITLE%
- %ARTICLE_12_ANSWER_01%
- %ARTICLE_12_ANSWER_02%
- %ARTICLE_12_ANSWER_03%
- %ARTICLE_12_CAPTION%
- %ARTICLE_12_COVER_ALT%
- %ARTICLE_12_DESC%
- %ARTICLE_12_FAQ_TITLE%
- %ARTICLE_12_H2_01%
- %ARTICLE_12_H2_02%
- %ARTICLE_12_H2_03%
- %ARTICLE_12_H2_04%
- %ARTICLE_12_H2_05%
- %ARTICLE_12_LEDE%
- %ARTICLE_12_OPENING%
- %ARTICLE_12_QUESTION_01%
- %ARTICLE_12_QUESTION_02%
- %ARTICLE_12_QUESTION_03%
- %ARTICLE_12_SECTION_01%
- %ARTICLE_12_SECTION_02%
- %ARTICLE_12_SECTION_03%
- %ARTICLE_12_SECTION_04%
- %ARTICLE_12_SECTION_05%
- %ARTICLE_12_SIDEBAR_BODY%
- %ARTICLE_12_SIDEBAR_TITLE%
- %ARTICLE_12_SIGNOFF%
- %ARTICLE_12_TITLE%
- %AUTHOR%
- %BENEFIT_DISCLAIMER%
- %BENEFIT_RATE%
- %BRAND_EN%
- %CABINET_A_DESC%
- %CABINET_A_NOTE_BODY%
- %CABINET_A_NOTE_TITLE%
- %CABINET_A_TITLE%
- %CABINET_B_DESC%
- %CABINET_B_NOTE_BODY%
- %CABINET_B_NOTE_TITLE%
- %CABINET_B_TITLE%
- %CABINET_C_DESC%
- %CABINET_C_NOTE_BODY%
- %CABINET_C_NOTE_TITLE%
- %CABINET_C_TITLE%
- %CONTACT_DESC%
- %CONTACT_EMAIL%
- %CONTACT_H2_01%
- %CONTACT_H2_02%
- %CONTACT_H2_03%
- %CONTACT_TITLE%
- %CORRECTIONS_DESC%
- %CORRECTIONS_H2_01%
- %CORRECTIONS_H2_02%
- %CORRECTIONS_H2_03%
- %CORRECTIONS_TITLE%
- %CURRENT_YEAR%
- %DISCLAIMER_DESC%
- %DISCLAIMER_H2_01%
- %DISCLAIMER_H2_02%
- %DISCLAIMER_H2_03%
- %DISCLAIMER_TITLE%
- %DISCLOSURE_DESC%
- %DISCLOSURE_H2_01%
- %DISCLOSURE_H2_02%
- %DISCLOSURE_H2_03%
- %DISCLOSURE_TITLE%
- %EDITORIAL_DESC%
- %EDITORIAL_H2_01%
- %EDITORIAL_H2_02%
- %EDITORIAL_H2_03%
- %EDITORIAL_TITLE%
- %FEED_DATE_01%
- %FEED_DATE_02%
- %FEED_DATE_03%
- %FEED_DATE_04%
- %FEED_DATE_05%
- %FEED_DATE_06%
- %FEED_DATE_07%
- %FEED_DATE_08%
- %FEED_DATE_09%
- %FEED_DATE_10%
- %HOME_ARCHIVE_DESC%
- %HOME_ARCHIVE_TITLE%
- %HOME_CABINET_DESC%
- %HOME_CABINET_TITLE%
- %HOME_DESC%
- %HOME_GUIDE_LABEL%
- %HOME_GUIDE_NOTE%
- %HOME_TITLE%
- %INVITE_CODE%
- %LANG%
- %LEGAL_01_SECTION_01%
- %LEGAL_01_SECTION_02%
- %LEGAL_01_SECTION_03%
- %LEGAL_02_SECTION_01%
- %LEGAL_02_SECTION_02%
- %LEGAL_02_SECTION_03%
- %LEGAL_03_SECTION_01%
- %LEGAL_03_SECTION_02%
- %LEGAL_03_SECTION_03%
- %LEGAL_04_SECTION_01%
- %LEGAL_04_SECTION_02%
- %LEGAL_04_SECTION_03%
- %LEGAL_05_SECTION_01%
- %LEGAL_05_SECTION_02%
- %LEGAL_05_SECTION_03%
- %LEGAL_06_SECTION_01%
- %LEGAL_06_SECTION_02%
- %LEGAL_06_SECTION_03%
- %LEGAL_07_SECTION_01%
- %LEGAL_07_SECTION_02%
- %LEGAL_07_SECTION_03%
- %LEGAL_COMMON_NOTE%
- %LEGAL_COMMON_TITLE%
- %MODIFIED_DATE%
- %PRIVACY_DESC%
- %PRIVACY_H2_01%
- %PRIVACY_H2_02%
- %PRIVACY_H2_03%
- %PRIVACY_TITLE%
- %PUBLISHED_DATE%
- %RSS_DESC%
- %RSS_TITLE%
- %SECURITY_EXPIRES%
- %SITE_DESC%
- %SITE_DOMAIN%
- %SITE_NAME%
- %TOOLS_DESC%
- %TOOLS_NOTE_BODY%
- %TOOLS_NOTE_TITLE%
- %TOOLS_TITLE%
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
