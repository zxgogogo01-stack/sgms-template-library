# 013-signal-digest

## 定位

铜线周讯编辑台：奶油报纸底、深咖报头、氧化铜强调色、广播刻度、信号波形与分栏排版。首页像一张正在值班的周刊头版，文章是十二种不同报讯单，工具是五块本地仪表；不依赖外部字体、图片、接口或运行时。

## 后续 AI 只填文字

31 条公开页面、12 篇文章外壳、3 个频道、5 个真实工具、7 个合规页面、SEO 头部、封面、图标、RSS、sitemap 与交互已经完整接好。后续 AI 只替换百分号变量并写经核实的内容，不改路径、class、CSS、JS、导航、页面数量和工具算法。

1. 先全局替换站名、域名、英文 wordmark、邀请码、利益点、日期、作者与站级说明，再逐页填写文章和合规内容。
2. issues/entry-bulletin.html 是唯一 registrationGuide；这里只保留一个 %AFFILIATE_URL%，发布前核对目标、邀请码、rel 四件套、target 与紧邻披露。首页保持形态 A，不放交易平台直链。
3. 首页“本期编辑先读”是唯一编辑推荐式注册内容入口。其他文章、频道、工具、法律页、导航、页脚、404 不添加推广直链或统一导流块。
4. 十二篇文章采用答复单、数字跨页、标记带、矩阵、侧栏、时序、注释、日期牌、警报、评分盘、个案、回顾十二种编排；只换文字，不统一骨架。
5. 五个工具只做本地输入计算，不获取实时行情。说明不得声称连接 API、官方数据或实时价格。
6. 每篇封面均有独立 1200×630 PNG/WebP。替换视觉时必须同名成对替换，并保持尺寸与首屏预加载。

## 页面角色表

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "article.html",
  "articles": [
    "issues/entry-bulletin.html",
    "issues/fee-shift-monitor.html",
    "issues/identity-rule-watch.html",
    "issues/transfer-window-notes.html",
    "issues/custody-policy-scan.html",
    "issues/recovery-change-log.html",
    "issues/evidence-signal-review.html",
    "issues/policy-effective-date.html",
    "issues/account-alert-brief.html",
    "issues/source-quality-pulse.html",
    "issues/dispute-status-wire.html",
    "issues/monthly-signal-recap.html"
  ],
  "cornerstones": [
    "issues/entry-bulletin.html",
    "issues/fee-shift-monitor.html"
  ],
  "registrationGuide": "issues/entry-bulletin.html",
  "articleCovers": {
    "issues/entry-bulletin.html": {
      "display": "assets/covers/entry-bulletin.webp",
      "og": "assets/covers/entry-bulletin.png"
    },
    "issues/fee-shift-monitor.html": {
      "display": "assets/covers/fee-shift-monitor.webp",
      "og": "assets/covers/fee-shift-monitor.png"
    },
    "issues/identity-rule-watch.html": {
      "display": "assets/covers/identity-rule-watch.webp",
      "og": "assets/covers/identity-rule-watch.png"
    },
    "issues/transfer-window-notes.html": {
      "display": "assets/covers/transfer-window-notes.webp",
      "og": "assets/covers/transfer-window-notes.png"
    },
    "issues/custody-policy-scan.html": {
      "display": "assets/covers/custody-policy-scan.webp",
      "og": "assets/covers/custody-policy-scan.png"
    },
    "issues/recovery-change-log.html": {
      "display": "assets/covers/recovery-change-log.webp",
      "og": "assets/covers/recovery-change-log.png"
    },
    "issues/evidence-signal-review.html": {
      "display": "assets/covers/evidence-signal-review.webp",
      "og": "assets/covers/evidence-signal-review.png"
    },
    "issues/policy-effective-date.html": {
      "display": "assets/covers/policy-effective-date.webp",
      "og": "assets/covers/policy-effective-date.png"
    },
    "issues/account-alert-brief.html": {
      "display": "assets/covers/account-alert-brief.webp",
      "og": "assets/covers/account-alert-brief.png"
    },
    "issues/source-quality-pulse.html": {
      "display": "assets/covers/source-quality-pulse.webp",
      "og": "assets/covers/source-quality-pulse.png"
    },
    "issues/dispute-status-wire.html": {
      "display": "assets/covers/dispute-status-wire.webp",
      "og": "assets/covers/dispute-status-wire.png"
    },
    "issues/monthly-signal-recap.html": {
      "display": "assets/covers/monthly-signal-recap.webp",
      "og": "assets/covers/monthly-signal-recap.png"
    }
  },
  "categories": [
    {
      "path": "desks/rules-wire.html",
      "label": "%DESK_A_TITLE%",
      "articles": [
        "issues/entry-bulletin.html",
        "issues/fee-shift-monitor.html",
        "issues/identity-rule-watch.html",
        "issues/transfer-window-notes.html"
      ]
    },
    {
      "path": "desks/methods-wire.html",
      "label": "%DESK_B_TITLE%",
      "articles": [
        "issues/custody-policy-scan.html",
        "issues/recovery-change-log.html",
        "issues/evidence-signal-review.html",
        "issues/policy-effective-date.html"
      ]
    },
    {
      "path": "desks/review-wire.html",
      "label": "%DESK_C_TITLE%",
      "articles": [
        "issues/account-alert-brief.html",
        "issues/source-quality-pulse.html",
        "issues/dispute-status-wire.html",
        "issues/monthly-signal-recap.html"
      ]
    }
  ],
  "toolIndex": "tool.html",
  "tools": [
    "instruments/change-rate.html",
    "instruments/range-position.html",
    "instruments/moving-average.html",
    "instruments/outlier-finder.html",
    "instruments/cadence-check.html"
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

## 完整验收

- 首页：邀请码复制成功/失败降级、主题切换、360px 首屏利益点与脚注。
- 五工具：正常、错误、边界、重置、复制结果。
- 全站：31 页桌面/390px/360px、坏图、横向溢出、触控尺寸、控制台、推广链接与 404。

## 完整变量清单

- %ABOUT_DECK%
- %ABOUT_SECTION_01%
- %ABOUT_SECTION_02%
- %ABOUT_SECTION_03%
- %AFFILIATE_DISCLOSURE%
- %AFFILIATE_LINK_LABEL%
- %AFFILIATE_URL%
- %ARTICLE_01_ANSWER%
- %ARTICLE_01_ANSWER_01%
- %ARTICLE_01_ANSWER_02%
- %ARTICLE_01_ANSWER_LABEL%
- %ARTICLE_01_CAPTION%
- %ARTICLE_01_FAQ_TITLE%
- %ARTICLE_01_H2_01%
- %ARTICLE_01_H2_02%
- %ARTICLE_01_H2_03%
- %ARTICLE_01_H2_04%
- %ARTICLE_01_H2_05%
- %ARTICLE_01_LEDE%
- %ARTICLE_01_LINK_EYEBROW%
- %ARTICLE_01_QUESTION_01%
- %ARTICLE_01_QUESTION_02%
- %ARTICLE_01_SECTION_01%
- %ARTICLE_01_SECTION_02%
- %ARTICLE_01_SECTION_03%
- %ARTICLE_01_SECTION_04%
- %ARTICLE_01_SECTION_05%
- %ARTICLE_01_SIGNOFF%
- %ARTICLE_01_STEP_A%
- %ARTICLE_01_STEP_B%
- %ARTICLE_01_STEP_C%
- %ARTICLE_02_CAPTION%
- %ARTICLE_02_FIGURE_A%
- %ARTICLE_02_FIGURE_A_LABEL%
- %ARTICLE_02_FIGURE_B%
- %ARTICLE_02_FIGURE_B_LABEL%
- %ARTICLE_02_FIGURE_NOTE%
- %ARTICLE_02_H2_01%
- %ARTICLE_02_H2_02%
- %ARTICLE_02_H2_03%
- %ARTICLE_02_H2_04%
- %ARTICLE_02_H2_05%
- %ARTICLE_02_H2_06%
- %ARTICLE_02_LEDE%
- %ARTICLE_02_SECTION_01%
- %ARTICLE_02_SECTION_02%
- %ARTICLE_02_SECTION_03%
- %ARTICLE_02_SECTION_04%
- %ARTICLE_02_SECTION_05%
- %ARTICLE_02_SECTION_06%
- %ARTICLE_02_SIGNOFF%
- %ARTICLE_03_CAPTION%
- %ARTICLE_03_H2_01%
- %ARTICLE_03_H2_02%
- %ARTICLE_03_H2_03%
- %ARTICLE_03_H2_04%
- %ARTICLE_03_H2_05%
- %ARTICLE_03_LEDE%
- %ARTICLE_03_MARKER_A%
- %ARTICLE_03_MARKER_B%
- %ARTICLE_03_MARKER_C%
- %ARTICLE_03_PULLQUOTE%
- %ARTICLE_03_SECTION_01%
- %ARTICLE_03_SECTION_02%
- %ARTICLE_03_SECTION_03%
- %ARTICLE_03_SECTION_04%
- %ARTICLE_03_SECTION_05%
- %ARTICLE_03_SIGNOFF%
- %ARTICLE_04_CAPTION%
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
- %ARTICLE_04_TABLE_A1%
- %ARTICLE_04_TABLE_A2%
- %ARTICLE_04_TABLE_A3%
- %ARTICLE_04_TABLE_B1%
- %ARTICLE_04_TABLE_B2%
- %ARTICLE_04_TABLE_B3%
- %ARTICLE_04_TABLE_H1%
- %ARTICLE_04_TABLE_H2%
- %ARTICLE_04_TABLE_H3%
- %ARTICLE_05_CAPTION%
- %ARTICLE_05_H2_01%
- %ARTICLE_05_H2_02%
- %ARTICLE_05_H2_03%
- %ARTICLE_05_H2_04%
- %ARTICLE_05_H2_05%
- %ARTICLE_05_LEDE%
- %ARTICLE_05_OPENING%
- %ARTICLE_05_SECTION_01%
- %ARTICLE_05_SECTION_02%
- %ARTICLE_05_SECTION_03%
- %ARTICLE_05_SECTION_04%
- %ARTICLE_05_SECTION_05%
- %ARTICLE_05_SIDEBAR_BODY%
- %ARTICLE_05_SIDEBAR_TITLE%
- %ARTICLE_05_SIGNOFF%
- %ARTICLE_06_CAPTION%
- %ARTICLE_06_H2_01%
- %ARTICLE_06_H2_02%
- %ARTICLE_06_H2_03%
- %ARTICLE_06_H2_04%
- %ARTICLE_06_LEDE%
- %ARTICLE_06_MOMENT_A%
- %ARTICLE_06_MOMENT_A_BODY%
- %ARTICLE_06_MOMENT_B%
- %ARTICLE_06_MOMENT_B_BODY%
- %ARTICLE_06_MOMENT_C%
- %ARTICLE_06_MOMENT_C_BODY%
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
- %ARTICLE_07_NOTE_A%
- %ARTICLE_07_NOTE_B%
- %ARTICLE_07_NOTE_C%
- %ARTICLE_07_SECTION_01%
- %ARTICLE_07_SECTION_02%
- %ARTICLE_07_SECTION_03%
- %ARTICLE_07_SECTION_04%
- %ARTICLE_07_SECTION_05%
- %ARTICLE_07_SIGNOFF%
- %ARTICLE_07_SOURCE_EXCERPT%
- %ARTICLE_07_SOURCE_LABEL%
- %ARTICLE_08_CAPTION%
- %ARTICLE_08_DATE_A%
- %ARTICLE_08_DATE_A_LABEL%
- %ARTICLE_08_DATE_B%
- %ARTICLE_08_DATE_B_LABEL%
- %ARTICLE_08_DATE_C%
- %ARTICLE_08_DATE_C_LABEL%
- %ARTICLE_08_H2_01%
- %ARTICLE_08_H2_02%
- %ARTICLE_08_H2_03%
- %ARTICLE_08_H2_04%
- %ARTICLE_08_LEDE%
- %ARTICLE_08_SECTION_01%
- %ARTICLE_08_SECTION_02%
- %ARTICLE_08_SECTION_03%
- %ARTICLE_08_SECTION_04%
- %ARTICLE_08_SIGNOFF%
- %ARTICLE_09_ACTION_A%
- %ARTICLE_09_ACTION_B%
- %ARTICLE_09_ACTION_C%
- %ARTICLE_09_ACTION_D%
- %ARTICLE_09_ANSWER_01%
- %ARTICLE_09_ANSWER_02%
- %ARTICLE_09_CAPTION%
- %ARTICLE_09_FAQ_TITLE%
- %ARTICLE_09_H2_01%
- %ARTICLE_09_H2_02%
- %ARTICLE_09_H2_03%
- %ARTICLE_09_LEDE%
- %ARTICLE_09_LEVEL%
- %ARTICLE_09_LEVEL_BODY%
- %ARTICLE_09_LEVEL_TITLE%
- %ARTICLE_09_QUESTION_01%
- %ARTICLE_09_QUESTION_02%
- %ARTICLE_09_SECTION_01%
- %ARTICLE_09_SECTION_02%
- %ARTICLE_09_SECTION_03%
- %ARTICLE_09_SIGNOFF%
- %ARTICLE_10_CAPTION%
- %ARTICLE_10_H2_01%
- %ARTICLE_10_H2_02%
- %ARTICLE_10_H2_03%
- %ARTICLE_10_H2_04%
- %ARTICLE_10_H2_05%
- %ARTICLE_10_LEDE%
- %ARTICLE_10_SCORE_A%
- %ARTICLE_10_SCORE_A_BODY%
- %ARTICLE_10_SCORE_B%
- %ARTICLE_10_SCORE_B_BODY%
- %ARTICLE_10_SCORE_C%
- %ARTICLE_10_SCORE_C_BODY%
- %ARTICLE_10_SECTION_01%
- %ARTICLE_10_SECTION_02%
- %ARTICLE_10_SECTION_03%
- %ARTICLE_10_SECTION_04%
- %ARTICLE_10_SECTION_05%
- %ARTICLE_10_SIGNOFF%
- %ARTICLE_11_CAPTION%
- %ARTICLE_11_CASE_A%
- %ARTICLE_11_CASE_A_LABEL%
- %ARTICLE_11_CASE_B%
- %ARTICLE_11_CASE_B_LABEL%
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
- %ARTICLE_12_RECAP_A%
- %ARTICLE_12_RECAP_B%
- %ARTICLE_12_RECAP_C%
- %ARTICLE_12_RECAP_D%
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
- %ARTICLE_INDEX_NOTE%
- %ARTICLE_INDEX_NOTE_TITLE%
- %ARTICLE_INDEX_TITLE%
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
- %DESK_A_INTRO%
- %DESK_A_TITLE%
- %DESK_B_INTRO%
- %DESK_B_TITLE%
- %DESK_C_INTRO%
- %DESK_C_TITLE%
- %DESK_NOTE_BODY%
- %DESK_NOTE_TITLE%
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
- %FEED_BUILD_DATE%
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
- %FEED_DATE_11%
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
- %FEED_SUMMARY_11%
- %HOME_DATA_NOTE%
- %HOME_KICKER%
- %HOME_METHOD_NOTE%
- %HOME_SCOPE_NOTE%
- %HOME_TITLE%
- %INVITE_CODE%
- %ISSUE_DATE%
- %ISSUE_LABEL%
- %ISSUE_NUMBER%
- %LANG%
- %LEGAL_HEADING_01%
- %LEGAL_HEADING_02%
- %LEGAL_HEADING_03%
- %PRIVACY_DECK%
- %PRIVACY_SECTION_01%
- %PRIVACY_SECTION_02%
- %PRIVACY_SECTION_03%
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
- %TOOL_INDEX_NOTE%
