# 020-north-gazette

## 定位

高端北境独立报刊：午夜海军蓝、冰川青、信号朱红与雾白构成寒区头版。首页用读者剪报、巨幅标题、等压线图、纵向电讯和三张编辑台形成真正的报纸节奏，不复用评测柜、电讯纸带或常规营销卡片构图。

## 后续 AI 只填文字

31 条公开路由、12 种报道版式、3 张编辑台、5 件真实本地新闻工具、7 个独立合规页、12 对独立封面、社交图、SEO 头部和响应式交互已搭好。后续 AI 只替换变量并写入经核实的文字，不改路径、class、CSS、JS、导航、工具算法或页面框架。

1. 首页为形态 A：明文邀请码、一键复制、弹性利益点和政策脚注齐全；首页没有平台转化直链，只有一处编辑推荐式内容页入口。
2. `reports/entry-desk.html` 只是注册类内容的页面外壳，也是唯一 `%AFFILIATE_URL%` 链接槽位。页面提供章节、FAQ、邀请码和披露 UI，但不含可发布的注册教程正文或平台事实。
3. 12 篇分别采用注册信息剪报、深度调查、事件时间线、数据表、来源交叉核验、双栏辩论、访谈、公共告示、事件台、读者清单、术语电讯和周末合刊结构；写作时保留各自结构。
4. 五件工具完全在浏览器本地运行：来源去重排序、日期线规范化、引号平衡检查、双标题比较和公报逐行修订核对。结果只作编辑辅助，不描述为实时数据、官方接口或专业建议。
5. 替换封面时保持同名 PNG/WebP、1200×630、无图中文字，并保留 preload、alt、尺寸和 fetchpriority。

## 页面角色表

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "article.html",
  "articles": [
    "reports/entry-desk.html",
    "reports/deep-freeze-investigation.html",
    "reports/event-line.html",
    "reports/data-desk.html",
    "reports/source-crosscheck.html",
    "reports/two-column-debate.html",
    "reports/field-interview.html",
    "reports/public-notice.html",
    "reports/incident-desk.html",
    "reports/reader-checklist.html",
    "reports/terms-wire.html",
    "reports/weekend-edition.html"
  ],
  "cornerstones": [
    "reports/entry-desk.html",
    "reports/deep-freeze-investigation.html"
  ],
  "registrationGuide": "reports/entry-desk.html",
  "articleCovers": {
    "reports/entry-desk.html": {
      "display": "assets/covers/entry-desk.webp",
      "og": "assets/covers/entry-desk.png"
    },
    "reports/deep-freeze-investigation.html": {
      "display": "assets/covers/deep-freeze-investigation.webp",
      "og": "assets/covers/deep-freeze-investigation.png"
    },
    "reports/event-line.html": {
      "display": "assets/covers/event-line.webp",
      "og": "assets/covers/event-line.png"
    },
    "reports/data-desk.html": {
      "display": "assets/covers/data-desk.webp",
      "og": "assets/covers/data-desk.png"
    },
    "reports/source-crosscheck.html": {
      "display": "assets/covers/source-crosscheck.webp",
      "og": "assets/covers/source-crosscheck.png"
    },
    "reports/two-column-debate.html": {
      "display": "assets/covers/two-column-debate.webp",
      "og": "assets/covers/two-column-debate.png"
    },
    "reports/field-interview.html": {
      "display": "assets/covers/field-interview.webp",
      "og": "assets/covers/field-interview.png"
    },
    "reports/public-notice.html": {
      "display": "assets/covers/public-notice.webp",
      "og": "assets/covers/public-notice.png"
    },
    "reports/incident-desk.html": {
      "display": "assets/covers/incident-desk.webp",
      "og": "assets/covers/incident-desk.png"
    },
    "reports/reader-checklist.html": {
      "display": "assets/covers/reader-checklist.webp",
      "og": "assets/covers/reader-checklist.png"
    },
    "reports/terms-wire.html": {
      "display": "assets/covers/terms-wire.webp",
      "og": "assets/covers/terms-wire.png"
    },
    "reports/weekend-edition.html": {
      "display": "assets/covers/weekend-edition.webp",
      "og": "assets/covers/weekend-edition.png"
    }
  },
  "categories": [
    {
      "path": "desks/civic.html",
      "label": "%DESK_CIVIC_TITLE%",
      "articles": [
        "reports/entry-desk.html",
        "reports/deep-freeze-investigation.html",
        "reports/event-line.html",
        "reports/data-desk.html"
      ]
    },
    {
      "path": "desks/signals.html",
      "label": "%DESK_SIGNALS_TITLE%",
      "articles": [
        "reports/source-crosscheck.html",
        "reports/two-column-debate.html",
        "reports/field-interview.html",
        "reports/public-notice.html"
      ]
    },
    {
      "path": "desks/decisions.html",
      "label": "%DESK_DECISIONS_TITLE%",
      "articles": [
        "reports/incident-desk.html",
        "reports/reader-checklist.html",
        "reports/terms-wire.html",
        "reports/weekend-edition.html"
      ]
    }
  ],
  "toolIndex": "tool.html",
  "tools": [
    "newsroom/source-sorter.html",
    "newsroom/dateline-normalizer.html",
    "newsroom/quote-balance.html",
    "newsroom/headline-comparator.html",
    "newsroom/bulletin-diff.html"
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

- 31 条路由须在桌面、390px、360px 共 93 次浏览器巡检。
- 首页复制与主题、五工具正常/错误/边界/重置/复制、唯一推广槽位属性、404、坏图、横向溢出、触控尺寸和控制台均需实测。
- 下游 AI 只负责核实事实和撰写文字；不再设计 UI、补页面框架或实现工具逻辑。

## 完整变量清单

- `%ABOUT_BODY_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%ABOUT_BODY_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%ABOUT_BODY_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%ABOUT_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%ABOUT_H2_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%ABOUT_H2_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%ABOUT_H2_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%ABOUT_META_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%ABOUT_META_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%ABOUT_NOTE_BODY%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%ABOUT_NOTE_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%ABOUT_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%AFFILIATE_DISCLOSURE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%AFFILIATE_URL%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%ARTICLE_INDEX_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%ARTICLE_INDEX_META_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%ARTICLE_INDEX_META_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%ARTICLE_INDEX_NOTE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%ARTICLE_INDEX_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%AUTHOR_NAME%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%BENEFIT_DISCLAIMER%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%BENEFIT_RATE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%BRAND_EN%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%CONTACT_BODY_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%CONTACT_BODY_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%CONTACT_BODY_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%CONTACT_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%CONTACT_EMAIL%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%CONTACT_H2_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%CONTACT_H2_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%CONTACT_H2_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%CONTACT_META_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%CONTACT_META_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%CONTACT_NOTE_BODY%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%CONTACT_NOTE_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%CONTACT_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%CORRECTIONS_BODY_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%CORRECTIONS_BODY_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%CORRECTIONS_BODY_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%CORRECTIONS_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%CORRECTIONS_H2_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%CORRECTIONS_H2_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%CORRECTIONS_H2_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%CORRECTIONS_META_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%CORRECTIONS_META_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%CORRECTIONS_NOTE_BODY%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%CORRECTIONS_NOTE_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%CORRECTIONS_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%COVER_CAPTION_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%COVER_CAPTION_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%COVER_CAPTION_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%COVER_CAPTION_04%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%COVER_CAPTION_05%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%COVER_CAPTION_06%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%COVER_CAPTION_07%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%COVER_CAPTION_08%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%COVER_CAPTION_09%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%COVER_CAPTION_10%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%COVER_CAPTION_11%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%COVER_CAPTION_12%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%CURRENT_YEAR%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DATE_MODIFIED%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DATE_PUBLISHED%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DESK_CIVIC_CITE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DESK_CIVIC_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DESK_CIVIC_META_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DESK_CIVIC_META_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DESK_CIVIC_QUOTE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DESK_CIVIC_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DESK_DECISIONS_CITE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DESK_DECISIONS_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DESK_DECISIONS_META_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DESK_DECISIONS_META_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DESK_DECISIONS_QUOTE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DESK_DECISIONS_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DESK_POLICY_BODY%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DESK_POLICY_LINK%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DESK_POLICY_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DESK_SIGNALS_CITE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DESK_SIGNALS_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DESK_SIGNALS_META_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DESK_SIGNALS_META_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DESK_SIGNALS_QUOTE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DESK_SIGNALS_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DISCLAIMER_BODY_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DISCLAIMER_BODY_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DISCLAIMER_BODY_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DISCLAIMER_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DISCLAIMER_H2_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DISCLAIMER_H2_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DISCLAIMER_H2_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DISCLAIMER_META_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DISCLAIMER_META_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DISCLAIMER_NOTE_BODY%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DISCLAIMER_NOTE_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DISCLAIMER_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DISCLOSURE_BODY_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DISCLOSURE_BODY_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DISCLOSURE_BODY_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DISCLOSURE_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DISCLOSURE_H2_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DISCLOSURE_H2_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DISCLOSURE_H2_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DISCLOSURE_META_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DISCLOSURE_META_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DISCLOSURE_NOTE_BODY%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DISCLOSURE_NOTE_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%DISCLOSURE_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%EDITION_LABEL%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%EDITORIAL_BODY_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%EDITORIAL_BODY_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%EDITORIAL_BODY_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%EDITORIAL_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%EDITORIAL_H2_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%EDITORIAL_H2_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%EDITORIAL_H2_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%EDITORIAL_META_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%EDITORIAL_META_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%EDITORIAL_NOTE_BODY%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%EDITORIAL_NOTE_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%EDITORIAL_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%ERROR_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%ERROR_META_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%ERROR_META_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%ERROR_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%HOME_DESKS_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%HOME_DESKS_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%HOME_H1%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%HOME_LEDE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%HOME_MAP_CAPTION%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%HOME_MAP_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%HOME_META_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%HOME_META_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%HOME_METHOD_CELL_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%HOME_METHOD_CELL_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%HOME_METHOD_CITE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%HOME_METHOD_COL_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%HOME_METHOD_COL_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%HOME_METHOD_COL_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%HOME_METHOD_QUOTE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%HOME_METHOD_ROW_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%HOME_METHOD_ROW_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%HOME_METHOD_TABLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%HOME_METHOD_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%HOME_PICK_LABEL%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%HOME_PICK_NOTE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%HOME_RUBRIC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%HOME_TOOLS_LINK%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%HOME_TOOLS_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%HOME_WIRE_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%INVITE_CODE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%LANG%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_01_BENCH_NOTE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_01_BENCH_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_01_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_01_GUIDE_BODY_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_01_GUIDE_BODY_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_01_GUIDE_BODY_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_01_GUIDE_BODY_04%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_01_GUIDE_BODY_05%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_01_GUIDE_H3_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_01_GUIDE_H3_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_01_GUIDE_H3_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_01_GUIDE_H3_04%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_01_GUIDE_H3_05%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_01_GUIDE_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_01_META_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_01_META_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_01_PLACEHOLDER%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_01_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_02_BENCH_NOTE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_02_BENCH_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_02_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_02_GUIDE_BODY_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_02_GUIDE_BODY_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_02_GUIDE_BODY_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_02_GUIDE_BODY_04%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_02_GUIDE_BODY_05%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_02_GUIDE_H3_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_02_GUIDE_H3_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_02_GUIDE_H3_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_02_GUIDE_H3_04%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_02_GUIDE_H3_05%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_02_GUIDE_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_02_META_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_02_META_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_02_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_03_BENCH_NOTE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_03_BENCH_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_03_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_03_GUIDE_BODY_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_03_GUIDE_BODY_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_03_GUIDE_BODY_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_03_GUIDE_BODY_04%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_03_GUIDE_BODY_05%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_03_GUIDE_H3_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_03_GUIDE_H3_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_03_GUIDE_H3_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_03_GUIDE_H3_04%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_03_GUIDE_H3_05%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_03_GUIDE_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_03_META_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_03_META_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_03_PLACEHOLDER%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_03_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_04_BENCH_NOTE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_04_BENCH_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_04_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_04_GUIDE_BODY_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_04_GUIDE_BODY_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_04_GUIDE_BODY_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_04_GUIDE_BODY_04%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_04_GUIDE_BODY_05%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_04_GUIDE_H3_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_04_GUIDE_H3_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_04_GUIDE_H3_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_04_GUIDE_H3_04%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_04_GUIDE_H3_05%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_04_GUIDE_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_04_META_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_04_META_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_04_PLACEHOLDER_A%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_04_PLACEHOLDER_B%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_04_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_05_BENCH_NOTE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_05_BENCH_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_05_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_05_GUIDE_BODY_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_05_GUIDE_BODY_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_05_GUIDE_BODY_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_05_GUIDE_BODY_04%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_05_GUIDE_BODY_05%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_05_GUIDE_H3_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_05_GUIDE_H3_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_05_GUIDE_H3_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_05_GUIDE_H3_04%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_05_GUIDE_H3_05%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_05_GUIDE_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_05_META_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_05_META_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_05_PLACEHOLDER_NEW%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_05_PLACEHOLDER_OLD%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%NEWSROOM_05_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%PRIVACY_BODY_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%PRIVACY_BODY_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%PRIVACY_BODY_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%PRIVACY_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%PRIVACY_H2_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%PRIVACY_H2_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%PRIVACY_H2_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%PRIVACY_META_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%PRIVACY_META_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%PRIVACY_NOTE_BODY%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%PRIVACY_NOTE_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%PRIVACY_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_01_AUTHOR_NOTE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_01_A_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_01_A_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_01_BODY_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_01_BODY_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_01_BODY_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_01_COVER_ALT%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_01_CTA_LABEL%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_01_CTA_TEXT%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_01_DATE_LABEL%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_01_DECK%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_01_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_01_EYEBROW%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_01_FAQ_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_01_H2_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_01_H2_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_01_H2_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_01_META_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_01_META_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_01_NAV_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_01_NAV_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_01_NAV_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_01_POINT_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_01_POINT_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_01_POINT_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_01_Q_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_01_Q_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_01_READ_TIME%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_01_RUBRIC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_01_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_02_AUTHOR_NOTE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_02_BODY_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_02_BODY_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_02_BODY_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_02_BODY_04%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_02_CITE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_02_COVER_ALT%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_02_DATE_LABEL%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_02_DECK%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_02_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_02_EYEBROW%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_02_H2_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_02_H2_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_02_H2_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_02_META_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_02_META_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_02_QUOTE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_02_READ_TIME%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_02_RUBRIC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_02_SIDE_BODY%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_02_SIDE_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_02_SOURCE_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_02_SOURCE_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_02_SOURCE_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_02_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_03_AUTHOR_NOTE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_03_BODY_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_03_BODY_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_03_COVER_ALT%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_03_DATE_LABEL%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_03_DECK%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_03_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_03_EVENT_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_03_EVENT_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_03_EVENT_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_03_EVENT_BODY_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_03_EVENT_BODY_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_03_EVENT_BODY_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_03_EYEBROW%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_03_H2_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_03_H2_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_03_META_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_03_META_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_03_READ_TIME%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_03_RUBRIC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_03_TIME_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_03_TIME_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_03_TIME_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_03_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_04_AUTHOR_NOTE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_04_BODY_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_04_BODY_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_04_CELL_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_04_CELL_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_04_COL_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_04_COL_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_04_COL_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_04_COVER_ALT%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_04_DATE_LABEL%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_04_DECK%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_04_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_04_EYEBROW%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_04_H2_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_04_H2_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_04_META_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_04_META_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_04_NOTE_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_04_NOTE_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_04_READ_TIME%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_04_ROW_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_04_ROW_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_04_RUBRIC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_04_TABLE_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_04_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_05_AUTHOR_NOTE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_05_BODY_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_05_CLAIM_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_05_CLAIM_BODY_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_05_COVER_ALT%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_05_DATE_LABEL%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_05_DECK%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_05_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_05_EYEBROW%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_05_H2_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_05_H2_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_05_LIMIT_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_05_LIMIT_BODY_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_05_META_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_05_META_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_05_READ_TIME%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_05_RECORD_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_05_RECORD_BODY_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_05_RUBRIC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_05_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_06_AUTHOR_NOTE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_06_BODY_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_06_BODY_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_06_BODY_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_06_BODY_04%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_06_COVER_ALT%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_06_DATE_LABEL%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_06_DECK%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_06_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_06_EYEBROW%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_06_H2_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_06_H2_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_06_INTRO%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_06_META_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_06_META_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_06_READ_TIME%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_06_RUBRIC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_06_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_06_VERDICT%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_06_VOICE_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_06_VOICE_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_07_AUTHOR_NOTE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_07_A_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_07_A_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_07_A_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_07_BODY_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_07_COVER_ALT%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_07_DATE_LABEL%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_07_DECK%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_07_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_07_EYEBROW%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_07_H2_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_07_H2_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_07_INTRO%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_07_META_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_07_META_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_07_Q_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_07_Q_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_07_Q_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_07_READ_TIME%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_07_RUBRIC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_07_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_08_AUTHOR_NOTE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_08_BODY_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_08_BODY_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_08_BODY_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_08_CLAUSE_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_08_CLAUSE_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_08_CLAUSE_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_08_COVER_ALT%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_08_DATE_LABEL%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_08_DECK%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_08_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_08_EYEBROW%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_08_H2_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_08_INTRO%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_08_MARGIN_NOTE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_08_META_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_08_META_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_08_READ_TIME%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_08_RUBRIC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_08_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_09_AUTHOR_NOTE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_09_BODY_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_09_BODY_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_09_BODY_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_09_COVER_ALT%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_09_DATE_LABEL%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_09_DECK%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_09_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_09_EVENT_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_09_EVENT_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_09_EYEBROW%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_09_H2_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_09_H2_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_09_INTRO%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_09_META_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_09_META_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_09_READ_TIME%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_09_RUBRIC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_09_STATUS%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_09_TIME_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_09_TIME_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_09_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_10_AUTHOR_NOTE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_10_BODY_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_10_BODY_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_10_BODY_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_10_CHECK_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_10_CHECK_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_10_CHECK_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_10_COVER_ALT%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_10_DATE_LABEL%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_10_DECK%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_10_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_10_EYEBROW%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_10_H2_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_10_H2_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_10_INTRO%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_10_META_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_10_META_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_10_NOTE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_10_READ_TIME%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_10_RUBRIC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_10_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_11_AUTHOR_NOTE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_11_BODY_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_11_COVER_ALT%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_11_DATE_LABEL%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_11_DECK%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_11_DEF_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_11_DEF_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_11_DEF_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_11_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_11_EYEBROW%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_11_H2_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_11_H2_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_11_INTRO%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_11_META_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_11_META_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_11_READ_TIME%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_11_RUBRIC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_11_TERM_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_11_TERM_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_11_TERM_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_11_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_12_AUTHOR_NOTE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_12_BODY_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_12_BODY_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_12_BODY_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_12_BODY_04%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_12_BODY_05%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_12_COVER_ALT%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_12_DATE_LABEL%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_12_DECK%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_12_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_12_EYEBROW%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_12_H2_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_12_H2_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_12_H3_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_12_H3_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_12_H3_04%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_12_LABEL_01%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_12_LABEL_02%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_12_LABEL_03%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_12_LABEL_04%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_12_META_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_12_META_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_12_READ_TIME%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_12_RUBRIC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%REPORT_12_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%RSS_BUILD_DATE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%RSS_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%RSS_ITEM_01_DATE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%RSS_ITEM_02_DATE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%RSS_ITEM_03_DATE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%RSS_ITEM_04_DATE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%RSS_ITEM_05_DATE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%RSS_ITEM_06_DATE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%RSS_ITEM_07_DATE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%RSS_ITEM_08_DATE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%RSS_ITEM_09_DATE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%RSS_ITEM_10_DATE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%RSS_ITEM_11_DATE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%RSS_ITEM_12_DATE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%RSS_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%SECURITY_EXPIRES%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%SITE_DOMAIN%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%SITE_NAME%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%TOOL_INDEX_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%TOOL_INDEX_META_DESC%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%TOOL_INDEX_META_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%TOOL_INDEX_NOTE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%TOOL_INDEX_NOTE_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
- `%TOOL_INDEX_TITLE%`：填写该页面对应的经核实文字、日期、标签或站点信息。
