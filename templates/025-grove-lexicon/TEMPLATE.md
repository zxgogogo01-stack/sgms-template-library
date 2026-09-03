# 025-grove-lexicon

## 定位

高端林间术语研究台模板。视觉由深莓色树皮、苔藓绿、荧光嫩叶、珊瑚校订标与纵向字母轨组成；首页像一张不对称的植物标本索引，内页则把词条写作变成根系、枝条、林冠三层编目。它不复用安全控制台、新闻报刊、课程卡片或浅色衬线文献馆的外观。

## 后续 AI 只填文字

31 条公开路由、12 种文章骨架、3 个独立命名标本集、5 个真实本地术语仪器、7 个独立合规页、12 对语义封面、社交图、SEO 头部、RSS、深浅主题、无障碍和响应式均已搭好。后续 AI 只替换变量并写经核实的正文，不再改 UI、路径、class、CSS、JS 或工具算法。

- 首页采用形态 A：首屏显示邀请码、复制控件、弹性利益点和脚注；无外部转化直链，仅有一处编辑选读式注册内容入口。
- `entries/entry-gate.html` 只是注册类内容的空白 UI 外壳，也是全模板唯一 `%AFFILIATE_URL%` 槽位；没有注册步骤、平台数字或未经核实的教程事实。
- 文章骨架分别使用门槛步骤、根系定义、词源路径、义项枝条、双语境、连续谱、易混档案、平行翻译、田野注释、时间环、比较矩阵与编辑简报，内容 AI 直接逐槽填写。
- 五个仪器完全在浏览器本地运行：语境索引、节奏轮廓、术语交集、变体归一与词条卡编排；输入不上传、不保存。
- 所有页面保留独立运营声明、站内推广披露入口与可见 RSS。

## 页面角色表

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "article.html",
  "articles": [
    "entries/entry-gate.html",
    "entries/root-definition.html",
    "entries/word-origin.html",
    "entries/meaning-branches.html",
    "entries/context-pair.html",
    "entries/usage-spectrum.html",
    "entries/false-friend.html",
    "entries/translation-notes.html",
    "entries/field-example.html",
    "entries/term-timeline.html",
    "entries/comparison-grid.html",
    "entries/editor-brief.html"
  ],
  "cornerstones": [
    "entries/entry-gate.html",
    "entries/root-definition.html"
  ],
  "registrationGuide": "entries/entry-gate.html",
  "articleCovers": {
    "entries/entry-gate.html": {
      "display": "assets/covers/entry-gate.webp",
      "og": "assets/covers/entry-gate.png"
    },
    "entries/root-definition.html": {
      "display": "assets/covers/root-definition.webp",
      "og": "assets/covers/root-definition.png"
    },
    "entries/word-origin.html": {
      "display": "assets/covers/word-origin.webp",
      "og": "assets/covers/word-origin.png"
    },
    "entries/meaning-branches.html": {
      "display": "assets/covers/meaning-branches.webp",
      "og": "assets/covers/meaning-branches.png"
    },
    "entries/context-pair.html": {
      "display": "assets/covers/context-pair.webp",
      "og": "assets/covers/context-pair.png"
    },
    "entries/usage-spectrum.html": {
      "display": "assets/covers/usage-spectrum.webp",
      "og": "assets/covers/usage-spectrum.png"
    },
    "entries/false-friend.html": {
      "display": "assets/covers/false-friend.webp",
      "og": "assets/covers/false-friend.png"
    },
    "entries/translation-notes.html": {
      "display": "assets/covers/translation-notes.webp",
      "og": "assets/covers/translation-notes.png"
    },
    "entries/field-example.html": {
      "display": "assets/covers/field-example.webp",
      "og": "assets/covers/field-example.png"
    },
    "entries/term-timeline.html": {
      "display": "assets/covers/term-timeline.webp",
      "og": "assets/covers/term-timeline.png"
    },
    "entries/comparison-grid.html": {
      "display": "assets/covers/comparison-grid.webp",
      "og": "assets/covers/comparison-grid.png"
    },
    "entries/editor-brief.html": {
      "display": "assets/covers/editor-brief.webp",
      "og": "assets/covers/editor-brief.png"
    }
  },
  "categories": [
    {
      "path": "collections/root-system.html",
      "label": "%COLLECTION_01_TITLE%",
      "articles": [
        "entries/entry-gate.html",
        "entries/root-definition.html",
        "entries/word-origin.html",
        "entries/meaning-branches.html"
      ]
    },
    {
      "path": "collections/branch-notes.html",
      "label": "%COLLECTION_02_TITLE%",
      "articles": [
        "entries/context-pair.html",
        "entries/usage-spectrum.html",
        "entries/false-friend.html",
        "entries/translation-notes.html"
      ]
    },
    {
      "path": "collections/canopy-records.html",
      "label": "%COLLECTION_03_TITLE%",
      "articles": [
        "entries/field-example.html",
        "entries/term-timeline.html",
        "entries/comparison-grid.html",
        "entries/editor-brief.html"
      ]
    }
  ],
  "toolIndex": "tool.html",
  "tools": [
    "instruments/context-concordance.html",
    "instruments/rhythm-profile.html",
    "instruments/term-overlap.html",
    "instruments/variant-normalizer.html",
    "instruments/glossary-cards.html"
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

## 验收范围

- 31 条路由在桌面、390px、360px共 93 次浏览器巡检。
- 实测首页邀请码复制、主题、目录、文章筛选、五工具正常/错误/边界/重置/复制、唯一推广槽位属性、404、图片、溢出、触控和控制台。
- 后续 AI 只负责站点变量、经查证的文字与文章，不再生成页面框架或通用视觉资产。

## 完整变量清单

- `%ABOUT_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_BODY_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_H2_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_H2_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_H2_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_NOTE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_NOTE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_SIDENOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_UPDATED%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%AFFILIATE_DISCLOSURE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%AFFILIATE_URL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_AFFILIATE_CTA%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_CAPTION%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_CLOSE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_CLOSE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_COVER_ALT%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_DATE_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_STEP_01_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_STEP_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_STEP_02_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_STEP_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_STEP_03_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_STEP_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_CAPTION%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_CLOSE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_CLOSE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_COVER_ALT%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_DATE_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_DEFINITION%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_QUOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_RSS_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_RSS_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_TERM_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_TERM_01_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_TERM_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_TERM_02_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_TERM_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_TERM_03_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_ASIDE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_CAPTION%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_CLOSE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_CLOSE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_COVER_ALT%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_DATE_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_RSS_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_RSS_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_STAGE_01_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_STAGE_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_STAGE_02_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_STAGE_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_STAGE_03_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_STAGE_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_BRANCH_01_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_BRANCH_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_BRANCH_02_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_BRANCH_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_BRANCH_03_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_BRANCH_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_BRANCH_04_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_BRANCH_04_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_CAPTION%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_CLOSE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_CLOSE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_COVER_ALT%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_DATE_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_RSS_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_RSS_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_BRIDGE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_BRIDGE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_CAPTION%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_COVER_ALT%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_DATE_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_QUOTE_A%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_QUOTE_B%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_RSS_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_RSS_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_SIDE_A_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_SIDE_A_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_SIDE_B_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_SIDE_B_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_CAPTION%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_COVER_ALT%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_DATE_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_LEVEL_01_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_LEVEL_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_LEVEL_02_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_LEVEL_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_LEVEL_03_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_LEVEL_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_LEVEL_04_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_LEVEL_04_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_RSS_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_RSS_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_TABLE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_TD_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_TD_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_TD_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_TD_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_TD_05%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_TD_06%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_TH_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_TH_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_TH_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_CAPTION%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_CARD_01_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_CARD_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_CARD_02_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_CARD_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_CARD_03_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_CARD_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_COVER_ALT%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_DATE_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_RSS_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_RSS_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_CAPTION%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_CLOSE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_CLOSE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_COVER_ALT%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_DATE_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_NOTE_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_NOTE_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_NOTE_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_RSS_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_RSS_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_SOURCE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_SOURCE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_TARGET_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_TARGET_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_ANNOTATION_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_ANNOTATION_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_ANNOTATION_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_CAPTION%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_COVER_ALT%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_DATE_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_META_01_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_META_01_VALUE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_META_02_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_META_02_VALUE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_META_03_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_META_03_VALUE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_RSS_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_RSS_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_CAPTION%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_COVER_ALT%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_DATE_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_RSS_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_RSS_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_STAGE_01_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_STAGE_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_STAGE_02_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_STAGE_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_STAGE_03_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_STAGE_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_STAGE_04_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_STAGE_04_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_TIME_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_TIME_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_TIME_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_TIME_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_CAPTION%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_CELL_01_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_CELL_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_CELL_02_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_CELL_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_CELL_03_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_CELL_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_CELL_04_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_CELL_04_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_CLOSE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_CLOSE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_COVER_ALT%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_DATE_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_RSS_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_RSS_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_ANSWER_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_ANSWER_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_ANSWER_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_CAPTION%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_COVER_ALT%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_DATE_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_QUESTION_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_QUESTION_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_QUESTION_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_SIGNOFF%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_INDEX_EMPTY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_INDEX_INTRO%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_INDEX_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_INDEX_META_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_INDEX_SEARCH_HINT%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_INDEX_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%AUTHOR_NAME%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%BENEFIT_DISCLAIMER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%BENEFIT_RATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%BRAND_EN%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_01_ENTRY_01_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_01_ENTRY_02_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_01_ENTRY_03_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_01_ENTRY_04_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_01_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_01_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_01_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_02_ENTRY_01_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_02_ENTRY_02_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_02_ENTRY_03_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_02_ENTRY_04_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_02_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_02_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_02_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_03_ENTRY_01_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_03_ENTRY_02_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_03_ENTRY_03_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_03_ENTRY_04_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_03_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_03_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_03_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_BODY_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_H2_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_H2_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_H2_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_NOTE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_NOTE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_SIDENOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_UPDATED%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_BODY_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_H2_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_H2_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_H2_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_NOTE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_NOTE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_SIDENOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_UPDATED%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_BODY_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_H2_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_H2_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_H2_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_NOTE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_NOTE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_SIDENOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_UPDATED%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_BODY_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_H2_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_H2_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_H2_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_NOTE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_NOTE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_SIDENOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_UPDATED%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_BODY_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_H2_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_H2_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_H2_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_NOTE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_NOTE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_SIDENOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_UPDATED%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_COLLECTIONS_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_GUIDE_TEASER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_INDEX_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_INDEX_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_INTRO%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_META_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_REFERENCE_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_REFERENCE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_TITLE_LINE_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_TITLE_LINE_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_TOOLS_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%INVITE_CODE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%LANG%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%NOT_FOUND_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%NOT_FOUND_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%NOT_FOUND_META_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%NOT_FOUND_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_BODY_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_H2_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_H2_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_H2_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_NOTE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_NOTE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_SIDENOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_UPDATED%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RSS_BUILD_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RSS_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RSS_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SECURITY_EMAIL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SECURITY_EXPIRES%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SECURITY_LANGS%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITEMAP_LASTMOD%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITE_DOMAIN%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITE_EDITION%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITE_NAME%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_FIELD_01_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_FIELD_02_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_05%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_FIELD_01_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_FIELD_02_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_05%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_FIELD_01_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_FIELD_02_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_05%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_FIELD_01_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_FIELD_02_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_05%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_OPTION_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_OPTION_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_FIELD_01_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_FIELD_02_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_05%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_COPY_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_GUIDE_H3_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_GUIDE_H3_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_GUIDE_H3_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_GUIDE_H3_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_GUIDE_H3_05%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_GUIDE_SUMMARY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_INDEX_INTRO%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_INDEX_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_INDEX_META_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_INDEX_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_LOCAL_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_LOCAL_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_RESET_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_RESULT_EMPTY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_RESULT_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_RUN_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
