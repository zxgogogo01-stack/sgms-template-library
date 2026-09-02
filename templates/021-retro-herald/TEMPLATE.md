# 021-retro-herald

## 定位

高端复古都市商报模板。暖米新闻纸、酒红刊头、黄铜细节、墨绿收市板与活字式层级组成鲜明的晚报视觉；首页不是营销落地页，而是一张有主版、收市板、电讯栏和栏目号的完整头版。

## 后续 AI 只填文字

31 条公开路由、12 种文章版式、3 个栏目、5 件真实本地计算工具、7 个独立合规页、12 对独立封面、社交图、SEO 头部、RSS 与响应式交互均已搭好。后续 AI 只替换下列变量并写入经查证文字，不改路径、class、CSS、JS、工具算法或页面框架。

1. 首页使用形态 A：首屏有邀请码明文、复制按钮、弹性利益点和政策脚注；没有外部转化直链，只有一处编辑推荐式内容页入口。
2. `stories/entry-ledger.html` 只是注册类内容的结构外壳，也是唯一的 `%AFFILIATE_URL%` 链接槽位；不得把模板本身扩写成可发布教程或写死平台事实。
3. 十二篇分别采用登记簿、剖面稿、会议时间线、数据表、术语年鉴、方法卡、风险象限、公式账页、情境分支、双栏案卷、访谈记录和周末合刊结构。
4. 五件工具完全在浏览器本地运行：费项叠算、保本变化、权重分配、涨跌变化和现金跑道。结果只作演算辅助，不描述为实时数据、官方接口或专业建议。
5. 文章封面保持同名 PNG/WebP、1200×630、无图中文字，并保留 preload、alt、尺寸和 fetchpriority。页脚 RSS 是可见入口。

## 页面角色表

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "article.html",
  "articles": [
    "stories/entry-ledger.html",
    "stories/market-anatomy.html",
    "stories/company-minute.html",
    "stories/earnings-sheet.html",
    "stories/terms-almanac.html",
    "stories/method-note.html",
    "stories/risk-quadrant.html",
    "stories/fee-ledger.html",
    "stories/scenario-brief.html",
    "stories/comparison-docket.html",
    "stories/desk-interview.html",
    "stories/weekly-close.html"
  ],
  "cornerstones": [
    "stories/entry-ledger.html",
    "stories/market-anatomy.html"
  ],
  "registrationGuide": "stories/entry-ledger.html",
  "articleCovers": {
    "stories/entry-ledger.html": {
      "display": "assets/covers/entry-ledger.webp",
      "og": "assets/covers/entry-ledger.png"
    },
    "stories/market-anatomy.html": {
      "display": "assets/covers/market-anatomy.webp",
      "og": "assets/covers/market-anatomy.png"
    },
    "stories/company-minute.html": {
      "display": "assets/covers/company-minute.webp",
      "og": "assets/covers/company-minute.png"
    },
    "stories/earnings-sheet.html": {
      "display": "assets/covers/earnings-sheet.webp",
      "og": "assets/covers/earnings-sheet.png"
    },
    "stories/terms-almanac.html": {
      "display": "assets/covers/terms-almanac.webp",
      "og": "assets/covers/terms-almanac.png"
    },
    "stories/method-note.html": {
      "display": "assets/covers/method-note.webp",
      "og": "assets/covers/method-note.png"
    },
    "stories/risk-quadrant.html": {
      "display": "assets/covers/risk-quadrant.webp",
      "og": "assets/covers/risk-quadrant.png"
    },
    "stories/fee-ledger.html": {
      "display": "assets/covers/fee-ledger.webp",
      "og": "assets/covers/fee-ledger.png"
    },
    "stories/scenario-brief.html": {
      "display": "assets/covers/scenario-brief.webp",
      "og": "assets/covers/scenario-brief.png"
    },
    "stories/comparison-docket.html": {
      "display": "assets/covers/comparison-docket.webp",
      "og": "assets/covers/comparison-docket.png"
    },
    "stories/desk-interview.html": {
      "display": "assets/covers/desk-interview.webp",
      "og": "assets/covers/desk-interview.png"
    },
    "stories/weekly-close.html": {
      "display": "assets/covers/weekly-close.webp",
      "og": "assets/covers/weekly-close.png"
    }
  },
  "categories": [
    {
      "path": "columns/city-ledger.html",
      "label": "%COLUMN_CITY_TITLE%",
      "articles": [
        "stories/entry-ledger.html",
        "stories/market-anatomy.html",
        "stories/company-minute.html",
        "stories/earnings-sheet.html"
      ]
    },
    {
      "path": "columns/exchange-room.html",
      "label": "%COLUMN_EXCHANGE_TITLE%",
      "articles": [
        "stories/terms-almanac.html",
        "stories/method-note.html",
        "stories/risk-quadrant.html",
        "stories/fee-ledger.html"
      ]
    },
    {
      "path": "columns/closing-edition.html",
      "label": "%COLUMN_CLOSING_TITLE%",
      "articles": [
        "stories/scenario-brief.html",
        "stories/comparison-docket.html",
        "stories/desk-interview.html",
        "stories/weekly-close.html"
      ]
    }
  ],
  "toolIndex": "tool.html",
  "tools": [
    "calculators/fee-stack.html",
    "calculators/break-even.html",
    "calculators/allocation-compositor.html",
    "calculators/change-column.html",
    "calculators/runway-clock.html"
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

- 31 条路由须在桌面、390px、360px 共 93 次浏览器巡检。
- 首页复制与主题、五工具正常/错误/边界/重置/复制、唯一推广槽位属性、404、坏图、横向溢出、触控尺寸和控制台均需实测。
- 下游 AI 仅负责事实核验和文字，不再设计 UI、补页面框架或实现工具逻辑。

## 完整变量清单

- `%ABOUT_BODY_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_BODY_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_BODY_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_H2_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_H2_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_H2_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_META_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_META_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_NOTE_BODY%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_NOTE_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%AFFILIATE_DISCLOSURE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%AFFILIATE_URL%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_INDEX_COLUMN_LABEL%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_INDEX_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_INDEX_META_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_INDEX_META_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_INDEX_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%AUTHOR_BIO%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%AUTHOR_NAME%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%BENEFIT_DISCLAIMER%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%BENEFIT_RATE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%BRAND_EN%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%CALCULATE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%CHARTER_INDEX_LABEL%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COLUMN_01_META_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COLUMN_02_META_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COLUMN_03_META_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COLUMN_ARCHIVE_LINK%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COLUMN_CITE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COLUMN_CITY_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COLUMN_CITY_QUOTE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COLUMN_CITY_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COLUMN_CLOSING_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COLUMN_CLOSING_QUOTE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COLUMN_CLOSING_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COLUMN_EXCHANGE_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COLUMN_EXCHANGE_QUOTE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COLUMN_EXCHANGE_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COLUMN_NOTE_BODY%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COLUMN_NOTE_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COLUMN_STORY_LABEL%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_BODY_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_BODY_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_BODY_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_EMAIL%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_H2_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_H2_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_H2_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_META_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_META_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_NOTE_BODY%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_NOTE_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COPY_CODE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COPY_FAILURE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COPY_RESULT%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COPY_SUCCESS%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_BODY_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_BODY_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_BODY_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_H2_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_H2_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_H2_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_META_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_META_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_NOTE_BODY%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_NOTE_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_ALT_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_ALT_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_ALT_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_ALT_04%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_ALT_05%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_ALT_06%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_ALT_07%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_ALT_08%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_ALT_09%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_ALT_10%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_ALT_11%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_ALT_12%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_CAPTION_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_CAPTION_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_CAPTION_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_CAPTION_04%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_CAPTION_05%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_CAPTION_06%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_CAPTION_07%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_CAPTION_08%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_CAPTION_09%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_CAPTION_10%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_CAPTION_11%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_CAPTION_12%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%CURRENT_YEAR%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%DATE_MODIFIED%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%DATE_PUBLISHED%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%DIRECTORY_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%DIR_HOME%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_BODY_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_BODY_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_BODY_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_H2_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_H2_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_H2_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_META_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_META_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_NOTE_BODY%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_NOTE_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_BODY_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_BODY_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_BODY_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_H2_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_H2_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_H2_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_LINK%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_META_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_META_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_NOTE_BODY%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_NOTE_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%EDITION_DATE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%EDITION_LABEL%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_BODY_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_BODY_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_BODY_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_H2_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_H2_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_H2_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_META_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_META_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_NOTE_BODY%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_NOTE_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%ERROR_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%ERROR_HOME%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%ERROR_META_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%ERROR_META_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%ERROR_NUMBER%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%ERROR_REPORTS%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%ERROR_REQUIRED%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%ERROR_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%ERROR_TOOLS%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%FEED_DATE_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%FEED_DATE_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%FEED_DATE_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%FEED_DATE_04%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%FEED_DATE_05%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%FEED_DATE_06%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%FEED_DATE_07%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%FEED_DATE_08%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%FEED_DATE_09%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%FEED_DATE_10%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%FEED_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%FOOTER_PROMISE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%HOME_BOARD_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%HOME_BOARD_LINK%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%HOME_BOARD_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%HOME_COLUMNS_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%HOME_COLUMNS_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%HOME_EDITOR_PICK%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%HOME_H1%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%HOME_KICKER%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%HOME_LEDE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%HOME_META_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%HOME_META_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%HOME_METRIC_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%HOME_METRIC_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%HOME_METRIC_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%HOME_METRIC_NOTE_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%HOME_METRIC_NOTE_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%HOME_METRIC_NOTE_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%HOME_METRIC_VALUE_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%HOME_METRIC_VALUE_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%HOME_METRIC_VALUE_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%HOME_SERVICE_LINKS_LABEL%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%HOME_STAMP_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%HOME_STAMP_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%HOME_STAMP_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%HOME_WIRE_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%INVITE_CODE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%INVITE_EYEBROW%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%INVITE_PANEL_LABEL%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%LANG%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%NAV_ABOUT%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%NAV_COLUMNS%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%NAV_HOME%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%NAV_LABEL%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%NAV_REPORTS%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%NAV_TOOLS%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%OPEN_TOOL%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_BODY_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_BODY_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_BODY_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_H2_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_H2_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_H2_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_META_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_META_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_NOTE_BODY%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_NOTE_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%RELATED_ALL_REPORTS%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%RELATED_METHOD%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%RELATED_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%RELATED_TOOLS%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%RESET%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%RESULT_ERROR%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%RESULT_IDLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%RESULT_LABEL%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%RSS_LABEL%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%SECURITY_EMAIL%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%SECURITY_EXPIRES%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%SITE_DOMAIN%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%SITE_NAME%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%SITE_TAGLINE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%SKIP_LINK%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_01_ACCESS_LINK%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_01_ACCESS_NOTE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_01_ACCESS_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_01_BODY_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_01_BODY_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_01_BODY_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_01_FAQ_A1%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_01_FAQ_A2%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_01_FAQ_Q1%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_01_FAQ_Q2%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_01_FAQ_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_01_H2_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_01_H2_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_01_H2_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_01_LEDE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_01_META_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_01_RUBRIC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_01_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_01_TOC_LABEL%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_01_TOC_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_02_BODY_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_02_BODY_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_02_BODY_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_02_FAQ_A1%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_02_FAQ_A2%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_02_FAQ_Q1%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_02_FAQ_Q2%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_02_FAQ_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_02_H2_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_02_H2_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_02_H2_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_02_LEDE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_02_META_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_02_POINT_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_02_POINT_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_02_POINT_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_02_PULLQUOTE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_02_RUBRIC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_02_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_02_TOC_LABEL%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_02_TOC_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_03_BODY_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_03_BODY_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_03_BODY_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_03_FAQ_A1%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_03_FAQ_A2%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_03_FAQ_Q1%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_03_FAQ_Q2%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_03_FAQ_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_03_H2_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_03_H2_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_03_H2_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_03_LEDE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_03_META_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_03_RUBRIC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_03_TIME_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_03_TIME_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_03_TIME_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_03_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_03_TOC_LABEL%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_03_TOC_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_04_BODY_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_04_BODY_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_04_BODY_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_04_CELL_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_04_CELL_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_04_CELL_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_04_CELL_04%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_04_COL_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_04_COL_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_04_COL_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_04_FAQ_A1%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_04_FAQ_A2%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_04_FAQ_Q1%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_04_FAQ_Q2%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_04_FAQ_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_04_H2_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_04_H2_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_04_H2_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_04_LEDE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_04_META_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_04_ROW_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_04_ROW_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_04_RUBRIC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_04_TABLE_CAPTION%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_04_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_04_TOC_LABEL%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_04_TOC_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_05_BODY_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_05_BODY_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_05_BODY_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_05_DEF_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_05_DEF_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_05_DEF_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_05_FAQ_A1%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_05_FAQ_A2%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_05_FAQ_Q1%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_05_FAQ_Q2%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_05_FAQ_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_05_H2_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_05_H2_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_05_H2_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_05_LEDE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_05_META_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_05_RUBRIC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_05_TERM_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_05_TERM_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_05_TERM_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_05_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_05_TOC_LABEL%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_05_TOC_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_06_BODY_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_06_BODY_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_06_FAQ_A1%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_06_FAQ_A2%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_06_FAQ_Q1%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_06_FAQ_Q2%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_06_FAQ_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_06_H2_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_06_H2_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_06_H2_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_06_LEDE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_06_META_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_06_RUBRIC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_06_STEP_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_06_STEP_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_06_STEP_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_06_STEP_04%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_06_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_06_TOC_LABEL%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_06_TOC_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_07_BODY_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_07_BODY_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_07_BODY_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_07_BODY_04%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_07_FAQ_A1%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_07_FAQ_A2%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_07_FAQ_Q1%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_07_FAQ_Q2%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_07_FAQ_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_07_H2_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_07_H2_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_07_H2_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_07_H2_04%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_07_LEDE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_07_META_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_07_RUBRIC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_07_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_07_TOC_LABEL%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_07_TOC_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_08_BODY_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_08_BODY_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_08_BODY_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_08_FAQ_A1%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_08_FAQ_A2%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_08_FAQ_Q1%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_08_FAQ_Q2%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_08_FAQ_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_08_FORMULA_LEFT%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_08_FORMULA_RIGHT%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_08_H2_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_08_H2_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_08_H2_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_08_LEDE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_08_META_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_08_RUBRIC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_08_SOURCE_BODY%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_08_SOURCE_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_08_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_08_TOC_LABEL%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_08_TOC_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_09_BODY_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_09_BODY_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_09_BODY_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_09_FAQ_A1%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_09_FAQ_A2%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_09_FAQ_Q1%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_09_FAQ_Q2%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_09_FAQ_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_09_H2_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_09_H2_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_09_H2_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_09_LEDE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_09_META_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_09_RUBRIC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_09_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_09_TOC_LABEL%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_09_TOC_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_10_BODY_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_10_BODY_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_10_BODY_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_10_FAQ_A1%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_10_FAQ_A2%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_10_FAQ_Q1%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_10_FAQ_Q2%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_10_FAQ_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_10_H2_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_10_H2_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_10_H2_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_10_LEDE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_10_META_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_10_RUBRIC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_10_SIDE_A_LABEL%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_10_SIDE_B_LABEL%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_10_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_10_TOC_LABEL%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_10_TOC_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_11_BODY_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_11_BODY_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_11_BODY_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_11_FAQ_A1%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_11_FAQ_A2%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_11_FAQ_Q1%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_11_FAQ_Q2%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_11_FAQ_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_11_H2_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_11_H2_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_11_H2_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_11_LEDE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_11_META_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_11_RUBRIC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_11_SPEAKER_A%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_11_SPEAKER_Q%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_11_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_11_TOC_LABEL%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_11_TOC_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_12_BODY_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_12_BODY_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_12_BODY_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_12_DAY_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_12_DAY_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_12_DAY_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_12_FAQ_A1%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_12_FAQ_A2%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_12_FAQ_Q1%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_12_FAQ_Q2%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_12_FAQ_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_12_H2_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_12_H2_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_12_H2_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_12_LEDE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_12_META_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_12_RUBRIC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_12_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_12_TOC_LABEL%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%STORY_12_TOC_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%THEME_DARK%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%THEME_LIGHT%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_ERROR_RANGE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_FIELD_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_FIELD_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_FIELD_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_BODY_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_BODY_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_BODY_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_BODY_04%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_BODY_05%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_H3_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_H3_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_H3_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_H3_04%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_H3_05%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_RESULT_CHARGED%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_RESULT_RAW%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_RESULT_SHARE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_ERROR_DENOMINATOR%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_ERROR_RANGE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_FIELD_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_FIELD_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_FIELD_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_BODY_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_BODY_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_BODY_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_BODY_04%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_BODY_05%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_H3_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_H3_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_H3_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_H3_04%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_H3_05%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_RESULT_CHANGE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_RESULT_NOTE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_RESULT_PRICE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_ERROR_RANGE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_ERROR_TOTAL%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_ERROR_WEIGHTS%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_FIELD_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_FIELD_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_FIELD_HELP%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_BODY_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_BODY_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_BODY_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_BODY_04%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_BODY_05%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_H3_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_H3_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_H3_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_H3_04%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_H3_05%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_RESULT_ITEM%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_DOWN%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_ERROR_ZERO%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_FIELD_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_FIELD_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_FLAT%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_BODY_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_BODY_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_BODY_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_BODY_04%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_BODY_05%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_H3_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_H3_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_H3_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_H3_04%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_H3_05%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_RESULT_DELTA%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_RESULT_DIRECTION%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_RESULT_RATE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_UP%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_ERROR_RANGE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_FIELD_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_FIELD_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_FIELD_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_BODY_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_BODY_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_BODY_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_BODY_04%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_BODY_05%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_H3_01%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_H3_02%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_H3_03%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_H3_04%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_H3_05%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_RESULT_DAYS%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_RESULT_MONTHS%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_RESULT_NET%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_RESULT_NET_BURN%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_RESULT_NON_BURN%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_INDEX_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_INDEX_META_DESC%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_INDEX_META_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_INDEX_PRINCIPLES_BODY%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_INDEX_PRINCIPLES_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_INDEX_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_INPUT_LEGEND%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_NOTE_BODY%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_NOTE_TITLE%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
- `%VIEW_COLUMN%`：由内容 AI 填写该字段对应的经核实文字、日期、标签或站点资料。
