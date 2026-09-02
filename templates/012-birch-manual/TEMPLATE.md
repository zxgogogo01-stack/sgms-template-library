# 012-birch-manual

## 定位

白桦野外手册：象牙纸、墨绿书脊、朱砂修订线、页码与标本标签构成一册有装订感的知识网站。首页是封面与总目录，文章像不同用途的活页，工具像五件校读器；不依赖外部字体、图库或接口。

## 后续 AI 的工作边界

这套模板已经把 UI、31 条页面路径、12 篇文章编排、3 个章节、5 个真实工具、SEO 头部、图片、合规页、RSS、sitemap 和交互全部接好。后续 AI 只替换百分号变量并撰写文字，不改路径、class、CSS、JS、工具算法和导航结构。

1. 先全局替换站名、域名、英文 wordmark、邀请码、利益点、日期、作者与说明变量，再逐页填正文。
2. entries/registration-field-note.html 是唯一 registrationGuide；只在这里保留且恰好保留一个 %AFFILIATE_URL%，并核对 target、rel 四件套与紧邻披露。首页维持形态 A，不添加交易平台直链。
3. 首页的铅笔标记是唯一编辑推荐式注册内容入口。其余文章、工具、章节、导航、页脚、合规页与 404 不得加入推广直链，也不要增加统一导流 CTA。
4. 12 篇文章的开场、表格、问答、时间线、清单、侧注和章节数已经错开。只替换对应文字，不能把它们改回相同正文骨架。
5. 五个工具全部纯前端本地计算，不抓实时数据。说明文字不得声称调用 API、实时价格或官方数据源。
6. 图片均为本地 1200×630 PNG/WebP；文章 WebP 首屏预加载并带尺寸。更换图片时必须成对替换，保持文件名与尺寸。

## 页面角色表

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "article.html",
  "articles": [
    "entries/registration-field-note.html",
    "entries/fee-map.html",
    "entries/identity-checkpoints.html",
    "entries/transfer-ledger.html",
    "entries/custody-rules.html",
    "entries/recovery-sequence.html",
    "entries/evidence-index.html",
    "entries/policy-revision-log.html",
    "entries/account-safety-card.html",
    "entries/source-evaluation-sheet.html",
    "entries/dispute-notebook.html",
    "entries/monthly-review-routine.html"
  ],
  "cornerstones": [
    "entries/registration-field-note.html",
    "entries/fee-map.html"
  ],
  "registrationGuide": "entries/registration-field-note.html",
  "articleCovers": {
    "entries/registration-field-note.html": {
      "display": "assets/covers/registration-field-note.webp",
      "og": "assets/covers/registration-field-note.png"
    },
    "entries/fee-map.html": {
      "display": "assets/covers/fee-map.webp",
      "og": "assets/covers/fee-map.png"
    },
    "entries/identity-checkpoints.html": {
      "display": "assets/covers/identity-checkpoints.webp",
      "og": "assets/covers/identity-checkpoints.png"
    },
    "entries/transfer-ledger.html": {
      "display": "assets/covers/transfer-ledger.webp",
      "og": "assets/covers/transfer-ledger.png"
    },
    "entries/custody-rules.html": {
      "display": "assets/covers/custody-rules.webp",
      "og": "assets/covers/custody-rules.png"
    },
    "entries/recovery-sequence.html": {
      "display": "assets/covers/recovery-sequence.webp",
      "og": "assets/covers/recovery-sequence.png"
    },
    "entries/evidence-index.html": {
      "display": "assets/covers/evidence-index.webp",
      "og": "assets/covers/evidence-index.png"
    },
    "entries/policy-revision-log.html": {
      "display": "assets/covers/policy-revision-log.webp",
      "og": "assets/covers/policy-revision-log.png"
    },
    "entries/account-safety-card.html": {
      "display": "assets/covers/account-safety-card.webp",
      "og": "assets/covers/account-safety-card.png"
    },
    "entries/source-evaluation-sheet.html": {
      "display": "assets/covers/source-evaluation-sheet.webp",
      "og": "assets/covers/source-evaluation-sheet.png"
    },
    "entries/dispute-notebook.html": {
      "display": "assets/covers/dispute-notebook.webp",
      "og": "assets/covers/dispute-notebook.png"
    },
    "entries/monthly-review-routine.html": {
      "display": "assets/covers/monthly-review-routine.webp",
      "og": "assets/covers/monthly-review-routine.png"
    }
  },
  "categories": [
    {
      "path": "sections/foundations.html",
      "label": "%CHAPTER_A_TITLE%",
      "articles": [
        "entries/registration-field-note.html",
        "entries/fee-map.html",
        "entries/identity-checkpoints.html",
        "entries/transfer-ledger.html"
      ]
    },
    {
      "path": "sections/practices.html",
      "label": "%CHAPTER_B_TITLE%",
      "articles": [
        "entries/custody-rules.html",
        "entries/recovery-sequence.html",
        "entries/evidence-index.html",
        "entries/policy-revision-log.html"
      ]
    },
    {
      "path": "sections/stewardship.html",
      "label": "%CHAPTER_C_TITLE%",
      "articles": [
        "entries/account-safety-card.html",
        "entries/source-evaluation-sheet.html",
        "entries/dispute-notebook.html",
        "entries/monthly-review-routine.html"
      ]
    }
  ],
  "toolIndex": "tool.html",
  "tools": [
    "tools/reading-time.html",
    "tools/heading-outline.html",
    "tools/excerpt-balance.html",
    "tools/review-calendar.html",
    "tools/source-mix.html"
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

## 交互验收

- 首页：邀请码复制成功与剪贴板失败降级、主题切换、360px 首屏完整利益信息。
- 每个工具：正常、空值或非法值、边界、重置、复制结果五种状态。
- 全站：桌面、390px、360px 无横向溢出，图片加载成功，触控目标不小于 44px，控制台无错误。

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
- %ARTICLE_01_H2_06%
- %ARTICLE_01_LEDE%
- %ARTICLE_01_LINK_EYEBROW%
- %ARTICLE_01_QUESTION_01%
- %ARTICLE_01_QUESTION_02%
- %ARTICLE_01_SECTION_01%
- %ARTICLE_01_SECTION_02%
- %ARTICLE_01_SECTION_03%
- %ARTICLE_01_SECTION_04%
- %ARTICLE_01_SECTION_05%
- %ARTICLE_01_SECTION_06%
- %ARTICLE_01_SIGNOFF%
- %ARTICLE_01_STEP_A%
- %ARTICLE_01_STEP_B%
- %ARTICLE_01_STEP_C%
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
- %ARTICLE_03_MARGIN_NOTE%
- %ARTICLE_03_SECTION_01%
- %ARTICLE_03_SECTION_02%
- %ARTICLE_03_SECTION_03%
- %ARTICLE_03_SECTION_04%
- %ARTICLE_03_SECTION_05%
- %ARTICLE_03_SIGNOFF%
- %ARTICLE_03_STEP_A%
- %ARTICLE_03_STEP_B%
- %ARTICLE_03_STEP_C%
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
- %ARTICLE_05_H2_06%
- %ARTICLE_05_LEDE%
- %ARTICLE_05_OPENING%
- %ARTICLE_05_PULLQUOTE%
- %ARTICLE_05_SECTION_01%
- %ARTICLE_05_SECTION_02%
- %ARTICLE_05_SECTION_03%
- %ARTICLE_05_SECTION_04%
- %ARTICLE_05_SECTION_05%
- %ARTICLE_05_SECTION_06%
- %ARTICLE_05_SIDEBAR_BODY%
- %ARTICLE_05_SIDEBAR_TITLE%
- %ARTICLE_05_SIGNOFF%
- %ARTICLE_06_ANSWER_01%
- %ARTICLE_06_ANSWER_02%
- %ARTICLE_06_ANSWER_03%
- %ARTICLE_06_CAPTION%
- %ARTICLE_06_H2_01%
- %ARTICLE_06_H2_02%
- %ARTICLE_06_H2_03%
- %ARTICLE_06_H2_04%
- %ARTICLE_06_LEDE%
- %ARTICLE_06_QUESTION_01%
- %ARTICLE_06_QUESTION_02%
- %ARTICLE_06_QUESTION_03%
- %ARTICLE_06_SECTION_01%
- %ARTICLE_06_SECTION_02%
- %ARTICLE_06_SECTION_03%
- %ARTICLE_06_SECTION_04%
- %ARTICLE_06_SIGNOFF%
- %ARTICLE_07_CAPTION%
- %ARTICLE_07_DEFINITION_BODY%
- %ARTICLE_07_DEFINITION_TERM%
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
- %ARTICLE_07_SOURCE_A%
- %ARTICLE_07_SOURCE_B%
- %ARTICLE_07_SOURCE_C%
- %ARTICLE_08_CAPTION%
- %ARTICLE_08_H2_01%
- %ARTICLE_08_H2_02%
- %ARTICLE_08_H2_03%
- %ARTICLE_08_H2_04%
- %ARTICLE_08_LEDE%
- %ARTICLE_08_MOMENT_A%
- %ARTICLE_08_MOMENT_A_BODY%
- %ARTICLE_08_MOMENT_B%
- %ARTICLE_08_MOMENT_B_BODY%
- %ARTICLE_08_MOMENT_C%
- %ARTICLE_08_MOMENT_C_BODY%
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
- %ARTICLE_09_STEP_D%
- %ARTICLE_10_CAPTION%
- %ARTICLE_10_H2_01%
- %ARTICLE_10_H2_02%
- %ARTICLE_10_H2_03%
- %ARTICLE_10_H2_04%
- %ARTICLE_10_H2_05%
- %ARTICLE_10_LEDE%
- %ARTICLE_10_RUBRIC_A%
- %ARTICLE_10_RUBRIC_A_BODY%
- %ARTICLE_10_RUBRIC_B%
- %ARTICLE_10_RUBRIC_B_BODY%
- %ARTICLE_10_RUBRIC_C%
- %ARTICLE_10_RUBRIC_C_BODY%
- %ARTICLE_10_SECTION_01%
- %ARTICLE_10_SECTION_02%
- %ARTICLE_10_SECTION_03%
- %ARTICLE_10_SECTION_04%
- %ARTICLE_10_SECTION_05%
- %ARTICLE_10_SIGNOFF%
- %ARTICLE_11_CAPTION%
- %ARTICLE_11_CASE_A%
- %ARTICLE_11_CASE_B%
- %ARTICLE_11_CASE_LABEL_A%
- %ARTICLE_11_CASE_LABEL_B%
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
- %ARTICLE_12_CHECK_A%
- %ARTICLE_12_CHECK_B%
- %ARTICLE_12_CHECK_C%
- %ARTICLE_12_CHECK_D%
- %ARTICLE_12_H2_01%
- %ARTICLE_12_H2_02%
- %ARTICLE_12_H2_03%
- %ARTICLE_12_H2_04%
- %ARTICLE_12_H2_05%
- %ARTICLE_12_LEDE%
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
- %CHAPTER_A_INTRO%
- %CHAPTER_A_TITLE%
- %CHAPTER_B_INTRO%
- %CHAPTER_B_TITLE%
- %CHAPTER_C_INTRO%
- %CHAPTER_C_TITLE%
- %CHAPTER_NOTE_BODY%
- %CHAPTER_NOTE_TITLE%
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
- %HOME_BINDING_CAPTION%
- %HOME_BINDING_NOTE%
- %HOME_DATA_NOTE%
- %HOME_KICKER%
- %HOME_TITLE%
- %INVITE_CODE%
- %ISSUE_LABEL%
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
