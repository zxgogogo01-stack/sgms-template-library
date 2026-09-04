# 056-pine-board · 松木知识泳道

## 完整 UI 与来源边界

保留松木绿、米白纸面、金色节点、置顶横幅、结构图与三条知识泳道，保留 pb56 命名和原 static/app.css。static/groves.css 补齐完整阅读与工具框架。原始军哥动态源包忠实度未核验，本地 UI 完整验收不作为原包复刻证明。

## 后续 AI 内容接入

只填写经核实的文字、文章与站点变量，无需补 UI、页面、封面、表格、目录、工具或通用发布资源。保留 class、id、data、form name、aria 关系与相对路径。三类文章开场、十二内容组件、不同 H2/FAQ 数量和三种收尾已预搭。

- C1–C12 是独立文章变量，不将同一正文铺满所有卡片。作者经历、来源、政策、日期、联系方式及利益条件由后续内容流程核实，模板不声称已有真实证据。图形是抽象 UI 资产，不代表实测照片或证据。
- registrationGuide 仅为旧检查器兼容字段，指向 access-stub.html 的通用推广 UI；不预定注册教程或业务文章。首页只有邀请码、真复制、利益点和政策脚注，没有推广直链；唯一静态推广链接在该通用内容壳内，紧邻披露，保留 target 与 sponsored nofollow noopener noreferrer。
- 字标使用英文或罗马字。HTML/XML 文字和属性按上下文转义；JSON-LD 按 JSON 字符串编码，并安全转义小于号。域名不带协议/路径；URL 仅使用经核实的 HTTPS 地址，来源 URL 不得填成推广地址。ISO 日期；RSS_DATE 为 RFC822；SECURITY_EXPIRES 为未来 RFC3339。
- 首页标题、介绍、利益说明与脚注保持简短；真实填充后再次核对 360px 首屏、长词、明暗主题与表格。三条泳道各四篇卡片，结构图以编号关联可点击图注；增删文章后同步清单、入链、图注与元数据。
- 首页/目录的泳道聚焦只改变当前页面视图。主题是唯一 localStorage 项；表单、结果、筛选不保存、不上传。无 JS 时阅读与导航可用，筛选控件隐藏，工具提交禁用。
- 五工具分别为 Hamilton 最大余数分配、在制量账本、编号集合对账、LPT 审阅安排、精确最小标签覆盖。每页 Guide 给出输入、算法、样例和边界；输入变化、重置与异步复制均使旧结果失效。LPT 不保证全局最优；标签覆盖只核对输入标签，不证明正文充分性。
- article.html、tool.html、legal.html 是 noindex 兼容入口，不自动跳转。未知深层 URL 须由单站服务器返回真实 404 并映射到 404.html，本轮不配置或部署服务器。
- 自带十二套 SVG/PNG/WebP 封面、独立首页竖幅 SVG、1200×630 PNG 社交图、SVG/ICO 图标与 180px apple-touch-icon。RSS 选第 1、2、3、5、6、7、9、11、12 篇摘要，不含邀请码或推广链接。

## workflow-ready-v2

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "library.html",
  "articles": [
    "cards/root-note.html",
    "cards/context-leaf.html",
    "cards/premise-board.html",
    "cards/example-nest.html",
    "cards/method-rungs.html",
    "cards/comparison-wings.html",
    "cards/exception-pocket.html",
    "cards/evidence-tray.html",
    "cards/review-ring.html",
    "cards/open-branch.html",
    "cards/change-graft.html",
    "cards/access-stub.html"
  ],
  "cornerstones": [
    "cards/root-note.html",
    "cards/context-leaf.html"
  ],
  "registrationGuide": "cards/access-stub.html",
  "articleCovers": {
    "cards/root-note.html": {
      "display": "assets/covers/root-note.webp",
      "og": "assets/covers/root-note.png"
    },
    "cards/context-leaf.html": {
      "display": "assets/covers/context-leaf.webp",
      "og": "assets/covers/context-leaf.png"
    },
    "cards/premise-board.html": {
      "display": "assets/covers/premise-board.webp",
      "og": "assets/covers/premise-board.png"
    },
    "cards/example-nest.html": {
      "display": "assets/covers/example-nest.webp",
      "og": "assets/covers/example-nest.png"
    },
    "cards/method-rungs.html": {
      "display": "assets/covers/method-rungs.webp",
      "og": "assets/covers/method-rungs.png"
    },
    "cards/comparison-wings.html": {
      "display": "assets/covers/comparison-wings.webp",
      "og": "assets/covers/comparison-wings.png"
    },
    "cards/exception-pocket.html": {
      "display": "assets/covers/exception-pocket.webp",
      "og": "assets/covers/exception-pocket.png"
    },
    "cards/evidence-tray.html": {
      "display": "assets/covers/evidence-tray.webp",
      "og": "assets/covers/evidence-tray.png"
    },
    "cards/review-ring.html": {
      "display": "assets/covers/review-ring.webp",
      "og": "assets/covers/review-ring.png"
    },
    "cards/open-branch.html": {
      "display": "assets/covers/open-branch.webp",
      "og": "assets/covers/open-branch.png"
    },
    "cards/change-graft.html": {
      "display": "assets/covers/change-graft.webp",
      "og": "assets/covers/change-graft.png"
    },
    "cards/access-stub.html": {
      "display": "assets/covers/access-stub.webp",
      "og": "assets/covers/access-stub.png"
    }
  },
  "categories": [
    {
      "path": "groves/seed-notes.html",
      "label": "植根栏",
      "articles": [
        "cards/root-note.html",
        "cards/context-leaf.html",
        "cards/premise-board.html",
        "cards/example-nest.html"
      ]
    },
    {
      "path": "groves/practice-branches.html",
      "label": "枝干栏",
      "articles": [
        "cards/method-rungs.html",
        "cards/comparison-wings.html",
        "cards/exception-pocket.html",
        "cards/evidence-tray.html"
      ]
    },
    {
      "path": "groves/return-canopy.html",
      "label": "回看栏",
      "articles": [
        "cards/review-ring.html",
        "cards/open-branch.html",
        "cards/change-graft.html",
        "cards/access-stub.html"
      ]
    }
  ],
  "toolIndex": "workshop.html",
  "tools": [
    "workshop/lane-capacity.html",
    "workshop/wip-ledger.html",
    "workshop/card-reconcile.html",
    "workshop/review-balance.html",
    "workshop/tag-cover.html"
  ],
  "legal": {
    "about": "about.html",
    "contact": "contact.html",
    "disclosure": "disclosure.html",
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
    "siteDomain": "%%SITE_DOMAIN%%",
    "siteName": "%%SITE_NAME%%",
    "wordmark": "%%BRAND_EN%%",
    "inviteCode": "%%INVITE_CODE%%",
    "benefitRate": "%%BENEFIT_RATE%%",
    "benefitDisclaimer": "%%BENEFIT_DISCLAIMER%%",
    "affiliateUrl": "%%AFFILIATE_URL%%"
  }
}
```

## 变量清单

- `%%404_DESC%%`
- `%%ABOUT_DESC%%`
- `%%ABOUT_H2_1%%`
- `%%ABOUT_H2_2%%`
- `%%ABOUT_H2_3%%`
- `%%ABOUT_INTRO%%`
- `%%ABOUT_MODIFIED%%`
- `%%ABOUT_NOTE%%`
- `%%ABOUT_TEXT_1%%`
- `%%ABOUT_TEXT_2%%`
- `%%ABOUT_TEXT_3%%`
- `%%AFFILIATE_DISCLOSURE%%`
- `%%AFFILIATE_URL%%`
- `%%ARTICLE_ENTRY_DESC%%`
- `%%AUTHOR_BIO%%`
- `%%AUTHOR_NAME%%`
- `%%BENEFIT_DISCLAIMER%%`
- `%%BENEFIT_RATE%%`
- `%%BRAND_EN%%`
- `%%C10_CHECKED%%`
- `%%C10_COVER_ALT%%`
- `%%C10_COVER_CAPTION%%`
- `%%C10_DESC%%`
- `%%C10_END_TEXT%%`
- `%%C10_END_TITLE%%`
- `%%C10_FAQ_A1%%`
- `%%C10_FAQ_A2%%`
- `%%C10_FAQ_A3%%`
- `%%C10_FAQ_A4%%`
- `%%C10_FAQ_Q1%%`
- `%%C10_FAQ_Q2%%`
- `%%C10_FAQ_Q3%%`
- `%%C10_FAQ_Q4%%`
- `%%C10_H2_1%%`
- `%%C10_H2_2%%`
- `%%C10_H2_3%%`
- `%%C10_H2_4%%`
- `%%C10_INTRO%%`
- `%%C10_MODIFIED%%`
- `%%C10_M_LABEL%%`
- `%%C10_M_LABEL_1%%`
- `%%C10_M_LABEL_2%%`
- `%%C10_M_LABEL_3%%`
- `%%C10_M_TEXT_1%%`
- `%%C10_M_TEXT_2%%`
- `%%C10_M_TEXT_3%%`
- `%%C10_PUBLISHED%%`
- `%%C10_QUOTE%%`
- `%%C10_QUOTE_ATTRIBUTION%%`
- `%%C10_SOURCE_LABEL_1%%`
- `%%C10_SOURCE_LABEL_2%%`
- `%%C10_SOURCE_NOTE_1%%`
- `%%C10_SOURCE_NOTE_2%%`
- `%%C10_SOURCE_URL_1%%`
- `%%C10_SOURCE_URL_2%%`
- `%%C10_SUMMARY%%`
- `%%C10_TABLE_CAPTION%%`
- `%%C10_TABLE_CELL_1_1%%`
- `%%C10_TABLE_CELL_1_2%%`
- `%%C10_TABLE_CELL_2_1%%`
- `%%C10_TABLE_CELL_2_2%%`
- `%%C10_TABLE_CELL_3_1%%`
- `%%C10_TABLE_CELL_3_2%%`
- `%%C10_TABLE_COL_1%%`
- `%%C10_TABLE_COL_2%%`
- `%%C10_TABLE_COL_3%%`
- `%%C10_TABLE_ROW_1%%`
- `%%C10_TABLE_ROW_2%%`
- `%%C10_TABLE_ROW_3%%`
- `%%C10_TEXT_1%%`
- `%%C10_TEXT_2%%`
- `%%C10_TEXT_3%%`
- `%%C10_TEXT_4%%`
- `%%C10_TITLE%%`
- `%%C11_CHECKED%%`
- `%%C11_COVER_ALT%%`
- `%%C11_COVER_CAPTION%%`
- `%%C11_DESC%%`
- `%%C11_END_TEXT%%`
- `%%C11_END_TITLE%%`
- `%%C11_FAQ_A1%%`
- `%%C11_FAQ_A2%%`
- `%%C11_FAQ_Q1%%`
- `%%C11_FAQ_Q2%%`
- `%%C11_H2_1%%`
- `%%C11_H2_2%%`
- `%%C11_H2_3%%`
- `%%C11_H2_4%%`
- `%%C11_H2_5%%`
- `%%C11_INTRO%%`
- `%%C11_MODIFIED%%`
- `%%C11_M_DATE_1%%`
- `%%C11_M_DATE_2%%`
- `%%C11_M_DATE_3%%`
- `%%C11_M_LABEL_1%%`
- `%%C11_M_LABEL_2%%`
- `%%C11_M_LABEL_3%%`
- `%%C11_M_TEXT_1%%`
- `%%C11_M_TEXT_2%%`
- `%%C11_M_TEXT_3%%`
- `%%C11_PUBLISHED%%`
- `%%C11_QUOTE%%`
- `%%C11_QUOTE_ATTRIBUTION%%`
- `%%C11_RSS_DATE%%`
- `%%C11_SOURCE_LABEL_1%%`
- `%%C11_SOURCE_LABEL_2%%`
- `%%C11_SOURCE_NOTE_1%%`
- `%%C11_SOURCE_NOTE_2%%`
- `%%C11_SOURCE_URL_1%%`
- `%%C11_SOURCE_URL_2%%`
- `%%C11_SUMMARY%%`
- `%%C11_TABLE_CAPTION%%`
- `%%C11_TABLE_CELL_1_1%%`
- `%%C11_TABLE_CELL_1_2%%`
- `%%C11_TABLE_CELL_2_1%%`
- `%%C11_TABLE_CELL_2_2%%`
- `%%C11_TABLE_CELL_3_1%%`
- `%%C11_TABLE_CELL_3_2%%`
- `%%C11_TABLE_COL_1%%`
- `%%C11_TABLE_COL_2%%`
- `%%C11_TABLE_COL_3%%`
- `%%C11_TABLE_ROW_1%%`
- `%%C11_TABLE_ROW_2%%`
- `%%C11_TABLE_ROW_3%%`
- `%%C11_TEXT_1%%`
- `%%C11_TEXT_2%%`
- `%%C11_TEXT_3%%`
- `%%C11_TEXT_4%%`
- `%%C11_TEXT_5%%`
- `%%C11_TITLE%%`
- `%%C12_CHECKED%%`
- `%%C12_COVER_ALT%%`
- `%%C12_COVER_CAPTION%%`
- `%%C12_CTA_LABEL%%`
- `%%C12_DESC%%`
- `%%C12_END_TEXT%%`
- `%%C12_END_TITLE%%`
- `%%C12_FAQ_A1%%`
- `%%C12_FAQ_A2%%`
- `%%C12_FAQ_A3%%`
- `%%C12_FAQ_Q1%%`
- `%%C12_FAQ_Q2%%`
- `%%C12_FAQ_Q3%%`
- `%%C12_H2_1%%`
- `%%C12_H2_2%%`
- `%%C12_H2_3%%`
- `%%C12_INTRO%%`
- `%%C12_MODIFIED%%`
- `%%C12_M_LABEL%%`
- `%%C12_M_TEXT%%`
- `%%C12_PUBLISHED%%`
- `%%C12_QUOTE%%`
- `%%C12_QUOTE_ATTRIBUTION%%`
- `%%C12_RSS_DATE%%`
- `%%C12_SOURCE_LABEL_1%%`
- `%%C12_SOURCE_LABEL_2%%`
- `%%C12_SOURCE_NOTE_1%%`
- `%%C12_SOURCE_NOTE_2%%`
- `%%C12_SOURCE_URL_1%%`
- `%%C12_SOURCE_URL_2%%`
- `%%C12_SUMMARY%%`
- `%%C12_TABLE_CAPTION%%`
- `%%C12_TABLE_CELL_1_1%%`
- `%%C12_TABLE_CELL_1_2%%`
- `%%C12_TABLE_CELL_2_1%%`
- `%%C12_TABLE_CELL_2_2%%`
- `%%C12_TABLE_CELL_3_1%%`
- `%%C12_TABLE_CELL_3_2%%`
- `%%C12_TABLE_COL_1%%`
- `%%C12_TABLE_COL_2%%`
- `%%C12_TABLE_COL_3%%`
- `%%C12_TABLE_ROW_1%%`
- `%%C12_TABLE_ROW_2%%`
- `%%C12_TABLE_ROW_3%%`
- `%%C12_TEXT_1%%`
- `%%C12_TEXT_2%%`
- `%%C12_TEXT_3%%`
- `%%C12_TITLE%%`
- `%%C1_CHECKED%%`
- `%%C1_COVER_ALT%%`
- `%%C1_COVER_CAPTION%%`
- `%%C1_DESC%%`
- `%%C1_END_TEXT%%`
- `%%C1_END_TITLE%%`
- `%%C1_FAQ_A1%%`
- `%%C1_FAQ_A2%%`
- `%%C1_FAQ_A3%%`
- `%%C1_FAQ_A4%%`
- `%%C1_FAQ_Q1%%`
- `%%C1_FAQ_Q2%%`
- `%%C1_FAQ_Q3%%`
- `%%C1_FAQ_Q4%%`
- `%%C1_H2_1%%`
- `%%C1_H2_2%%`
- `%%C1_H2_3%%`
- `%%C1_H2_4%%`
- `%%C1_INTRO%%`
- `%%C1_MODIFIED%%`
- `%%C1_M_LABEL%%`
- `%%C1_M_LABEL_1%%`
- `%%C1_M_LABEL_2%%`
- `%%C1_M_TEXT%%`
- `%%C1_M_TEXT_1%%`
- `%%C1_M_TEXT_2%%`
- `%%C1_PUBLISHED%%`
- `%%C1_QUOTE%%`
- `%%C1_QUOTE_ATTRIBUTION%%`
- `%%C1_RSS_DATE%%`
- `%%C1_SOURCE_LABEL_1%%`
- `%%C1_SOURCE_LABEL_2%%`
- `%%C1_SOURCE_NOTE_1%%`
- `%%C1_SOURCE_NOTE_2%%`
- `%%C1_SOURCE_URL_1%%`
- `%%C1_SOURCE_URL_2%%`
- `%%C1_SUMMARY%%`
- `%%C1_TABLE_CAPTION%%`
- `%%C1_TABLE_CELL_1_1%%`
- `%%C1_TABLE_CELL_1_2%%`
- `%%C1_TABLE_CELL_2_1%%`
- `%%C1_TABLE_CELL_2_2%%`
- `%%C1_TABLE_CELL_3_1%%`
- `%%C1_TABLE_CELL_3_2%%`
- `%%C1_TABLE_COL_1%%`
- `%%C1_TABLE_COL_2%%`
- `%%C1_TABLE_COL_3%%`
- `%%C1_TABLE_ROW_1%%`
- `%%C1_TABLE_ROW_2%%`
- `%%C1_TABLE_ROW_3%%`
- `%%C1_TEXT_1%%`
- `%%C1_TEXT_2%%`
- `%%C1_TEXT_3%%`
- `%%C1_TEXT_4%%`
- `%%C1_TITLE%%`
- `%%C2_CHECKED%%`
- `%%C2_COVER_ALT%%`
- `%%C2_COVER_CAPTION%%`
- `%%C2_DESC%%`
- `%%C2_END_TEXT%%`
- `%%C2_END_TITLE%%`
- `%%C2_FAQ_A1%%`
- `%%C2_FAQ_A2%%`
- `%%C2_FAQ_Q1%%`
- `%%C2_FAQ_Q2%%`
- `%%C2_H2_1%%`
- `%%C2_H2_2%%`
- `%%C2_H2_3%%`
- `%%C2_H2_4%%`
- `%%C2_H2_5%%`
- `%%C2_INTRO%%`
- `%%C2_MODIFIED%%`
- `%%C2_M_LABEL_1%%`
- `%%C2_M_LABEL_2%%`
- `%%C2_M_TEXT_1%%`
- `%%C2_M_TEXT_2%%`
- `%%C2_PUBLISHED%%`
- `%%C2_QUOTE%%`
- `%%C2_QUOTE_ATTRIBUTION%%`
- `%%C2_RSS_DATE%%`
- `%%C2_SOURCE_LABEL_1%%`
- `%%C2_SOURCE_LABEL_2%%`
- `%%C2_SOURCE_NOTE_1%%`
- `%%C2_SOURCE_NOTE_2%%`
- `%%C2_SOURCE_URL_1%%`
- `%%C2_SOURCE_URL_2%%`
- `%%C2_SUMMARY%%`
- `%%C2_TABLE_CAPTION%%`
- `%%C2_TABLE_CELL_1_1%%`
- `%%C2_TABLE_CELL_1_2%%`
- `%%C2_TABLE_CELL_2_1%%`
- `%%C2_TABLE_CELL_2_2%%`
- `%%C2_TABLE_CELL_3_1%%`
- `%%C2_TABLE_CELL_3_2%%`
- `%%C2_TABLE_COL_1%%`
- `%%C2_TABLE_COL_2%%`
- `%%C2_TABLE_COL_3%%`
- `%%C2_TABLE_ROW_1%%`
- `%%C2_TABLE_ROW_2%%`
- `%%C2_TABLE_ROW_3%%`
- `%%C2_TEXT_1%%`
- `%%C2_TEXT_2%%`
- `%%C2_TEXT_3%%`
- `%%C2_TEXT_4%%`
- `%%C2_TEXT_5%%`
- `%%C2_TITLE%%`
- `%%C3_CHECKED%%`
- `%%C3_COVER_ALT%%`
- `%%C3_COVER_CAPTION%%`
- `%%C3_DESC%%`
- `%%C3_END_TEXT%%`
- `%%C3_END_TITLE%%`
- `%%C3_FAQ_A1%%`
- `%%C3_FAQ_A2%%`
- `%%C3_FAQ_A3%%`
- `%%C3_FAQ_Q1%%`
- `%%C3_FAQ_Q2%%`
- `%%C3_FAQ_Q3%%`
- `%%C3_H2_1%%`
- `%%C3_H2_2%%`
- `%%C3_H2_3%%`
- `%%C3_INTRO%%`
- `%%C3_MODIFIED%%`
- `%%C3_M_LABEL_1%%`
- `%%C3_M_LABEL_2%%`
- `%%C3_M_LABEL_3%%`
- `%%C3_M_TEXT_1%%`
- `%%C3_M_TEXT_2%%`
- `%%C3_M_TEXT_3%%`
- `%%C3_PUBLISHED%%`
- `%%C3_QUOTE%%`
- `%%C3_QUOTE_ATTRIBUTION%%`
- `%%C3_RSS_DATE%%`
- `%%C3_SOURCE_LABEL_1%%`
- `%%C3_SOURCE_LABEL_2%%`
- `%%C3_SOURCE_NOTE_1%%`
- `%%C3_SOURCE_NOTE_2%%`
- `%%C3_SOURCE_URL_1%%`
- `%%C3_SOURCE_URL_2%%`
- `%%C3_SUMMARY%%`
- `%%C3_TABLE_CAPTION%%`
- `%%C3_TABLE_CELL_1_1%%`
- `%%C3_TABLE_CELL_1_2%%`
- `%%C3_TABLE_CELL_2_1%%`
- `%%C3_TABLE_CELL_2_2%%`
- `%%C3_TABLE_CELL_3_1%%`
- `%%C3_TABLE_CELL_3_2%%`
- `%%C3_TABLE_COL_1%%`
- `%%C3_TABLE_COL_2%%`
- `%%C3_TABLE_COL_3%%`
- `%%C3_TABLE_ROW_1%%`
- `%%C3_TABLE_ROW_2%%`
- `%%C3_TABLE_ROW_3%%`
- `%%C3_TEXT_1%%`
- `%%C3_TEXT_2%%`
- `%%C3_TEXT_3%%`
- `%%C3_TITLE%%`
- `%%C4_CHECKED%%`
- `%%C4_COVER_ALT%%`
- `%%C4_COVER_CAPTION%%`
- `%%C4_DESC%%`
- `%%C4_END_TEXT%%`
- `%%C4_END_TITLE%%`
- `%%C4_FAQ_A1%%`
- `%%C4_FAQ_A2%%`
- `%%C4_FAQ_A3%%`
- `%%C4_FAQ_A4%%`
- `%%C4_FAQ_Q1%%`
- `%%C4_FAQ_Q2%%`
- `%%C4_FAQ_Q3%%`
- `%%C4_FAQ_Q4%%`
- `%%C4_H2_1%%`
- `%%C4_H2_2%%`
- `%%C4_H2_3%%`
- `%%C4_H2_4%%`
- `%%C4_INTRO%%`
- `%%C4_MODIFIED%%`
- `%%C4_M_LABEL%%`
- `%%C4_M_LABEL_1%%`
- `%%C4_M_LABEL_2%%`
- `%%C4_M_TEXT%%`
- `%%C4_M_TEXT_1%%`
- `%%C4_M_TEXT_2%%`
- `%%C4_PUBLISHED%%`
- `%%C4_QUOTE%%`
- `%%C4_QUOTE_ATTRIBUTION%%`
- `%%C4_SOURCE_LABEL_1%%`
- `%%C4_SOURCE_LABEL_2%%`
- `%%C4_SOURCE_NOTE_1%%`
- `%%C4_SOURCE_NOTE_2%%`
- `%%C4_SOURCE_URL_1%%`
- `%%C4_SOURCE_URL_2%%`
- `%%C4_SUMMARY%%`
- `%%C4_TABLE_CAPTION%%`
- `%%C4_TABLE_CELL_1_1%%`
- `%%C4_TABLE_CELL_1_2%%`
- `%%C4_TABLE_CELL_2_1%%`
- `%%C4_TABLE_CELL_2_2%%`
- `%%C4_TABLE_CELL_3_1%%`
- `%%C4_TABLE_CELL_3_2%%`
- `%%C4_TABLE_COL_1%%`
- `%%C4_TABLE_COL_2%%`
- `%%C4_TABLE_COL_3%%`
- `%%C4_TABLE_ROW_1%%`
- `%%C4_TABLE_ROW_2%%`
- `%%C4_TABLE_ROW_3%%`
- `%%C4_TEXT_1%%`
- `%%C4_TEXT_2%%`
- `%%C4_TEXT_3%%`
- `%%C4_TEXT_4%%`
- `%%C4_TITLE%%`
- `%%C5_CHECKED%%`
- `%%C5_COVER_ALT%%`
- `%%C5_COVER_CAPTION%%`
- `%%C5_DESC%%`
- `%%C5_END_TEXT%%`
- `%%C5_END_TITLE%%`
- `%%C5_FAQ_A1%%`
- `%%C5_FAQ_A2%%`
- `%%C5_FAQ_Q1%%`
- `%%C5_FAQ_Q2%%`
- `%%C5_H2_1%%`
- `%%C5_H2_2%%`
- `%%C5_H2_3%%`
- `%%C5_H2_4%%`
- `%%C5_H2_5%%`
- `%%C5_INTRO%%`
- `%%C5_MODIFIED%%`
- `%%C5_M_LABEL_1%%`
- `%%C5_M_LABEL_2%%`
- `%%C5_M_LABEL_3%%`
- `%%C5_M_TEXT_1%%`
- `%%C5_M_TEXT_2%%`
- `%%C5_M_TEXT_3%%`
- `%%C5_PUBLISHED%%`
- `%%C5_QUOTE%%`
- `%%C5_QUOTE_ATTRIBUTION%%`
- `%%C5_RSS_DATE%%`
- `%%C5_SOURCE_LABEL_1%%`
- `%%C5_SOURCE_LABEL_2%%`
- `%%C5_SOURCE_NOTE_1%%`
- `%%C5_SOURCE_NOTE_2%%`
- `%%C5_SOURCE_URL_1%%`
- `%%C5_SOURCE_URL_2%%`
- `%%C5_SUMMARY%%`
- `%%C5_TABLE_CAPTION%%`
- `%%C5_TABLE_CELL_1_1%%`
- `%%C5_TABLE_CELL_1_2%%`
- `%%C5_TABLE_CELL_2_1%%`
- `%%C5_TABLE_CELL_2_2%%`
- `%%C5_TABLE_CELL_3_1%%`
- `%%C5_TABLE_CELL_3_2%%`
- `%%C5_TABLE_COL_1%%`
- `%%C5_TABLE_COL_2%%`
- `%%C5_TABLE_COL_3%%`
- `%%C5_TABLE_ROW_1%%`
- `%%C5_TABLE_ROW_2%%`
- `%%C5_TABLE_ROW_3%%`
- `%%C5_TEXT_1%%`
- `%%C5_TEXT_2%%`
- `%%C5_TEXT_3%%`
- `%%C5_TEXT_4%%`
- `%%C5_TEXT_5%%`
- `%%C5_TITLE%%`
- `%%C6_CHECKED%%`
- `%%C6_COVER_ALT%%`
- `%%C6_COVER_CAPTION%%`
- `%%C6_DESC%%`
- `%%C6_END_TEXT%%`
- `%%C6_END_TITLE%%`
- `%%C6_FAQ_A1%%`
- `%%C6_FAQ_A2%%`
- `%%C6_FAQ_A3%%`
- `%%C6_FAQ_Q1%%`
- `%%C6_FAQ_Q2%%`
- `%%C6_FAQ_Q3%%`
- `%%C6_H2_1%%`
- `%%C6_H2_2%%`
- `%%C6_H2_3%%`
- `%%C6_INTRO%%`
- `%%C6_MODIFIED%%`
- `%%C6_M_LABEL_1%%`
- `%%C6_M_LABEL_2%%`
- `%%C6_M_NOTE%%`
- `%%C6_M_TEXT_1%%`
- `%%C6_M_TEXT_2%%`
- `%%C6_PUBLISHED%%`
- `%%C6_QUOTE%%`
- `%%C6_QUOTE_ATTRIBUTION%%`
- `%%C6_RSS_DATE%%`
- `%%C6_SOURCE_LABEL_1%%`
- `%%C6_SOURCE_LABEL_2%%`
- `%%C6_SOURCE_NOTE_1%%`
- `%%C6_SOURCE_NOTE_2%%`
- `%%C6_SOURCE_URL_1%%`
- `%%C6_SOURCE_URL_2%%`
- `%%C6_SUMMARY%%`
- `%%C6_TABLE_CAPTION%%`
- `%%C6_TABLE_CELL_1_1%%`
- `%%C6_TABLE_CELL_1_2%%`
- `%%C6_TABLE_CELL_2_1%%`
- `%%C6_TABLE_CELL_2_2%%`
- `%%C6_TABLE_CELL_3_1%%`
- `%%C6_TABLE_CELL_3_2%%`
- `%%C6_TABLE_COL_1%%`
- `%%C6_TABLE_COL_2%%`
- `%%C6_TABLE_COL_3%%`
- `%%C6_TABLE_ROW_1%%`
- `%%C6_TABLE_ROW_2%%`
- `%%C6_TABLE_ROW_3%%`
- `%%C6_TEXT_1%%`
- `%%C6_TEXT_2%%`
- `%%C6_TEXT_3%%`
- `%%C6_TITLE%%`
- `%%C7_CHECKED%%`
- `%%C7_COVER_ALT%%`
- `%%C7_COVER_CAPTION%%`
- `%%C7_DESC%%`
- `%%C7_END_TEXT%%`
- `%%C7_END_TITLE%%`
- `%%C7_FAQ_A1%%`
- `%%C7_FAQ_A2%%`
- `%%C7_FAQ_A3%%`
- `%%C7_FAQ_A4%%`
- `%%C7_FAQ_Q1%%`
- `%%C7_FAQ_Q2%%`
- `%%C7_FAQ_Q3%%`
- `%%C7_FAQ_Q4%%`
- `%%C7_H2_1%%`
- `%%C7_H2_2%%`
- `%%C7_H2_3%%`
- `%%C7_H2_4%%`
- `%%C7_INTRO%%`
- `%%C7_MODIFIED%%`
- `%%C7_M_LABEL%%`
- `%%C7_M_TEXT_1%%`
- `%%C7_M_TEXT_2%%`
- `%%C7_M_TEXT_3%%`
- `%%C7_PUBLISHED%%`
- `%%C7_QUOTE%%`
- `%%C7_QUOTE_ATTRIBUTION%%`
- `%%C7_RSS_DATE%%`
- `%%C7_SOURCE_LABEL_1%%`
- `%%C7_SOURCE_LABEL_2%%`
- `%%C7_SOURCE_NOTE_1%%`
- `%%C7_SOURCE_NOTE_2%%`
- `%%C7_SOURCE_URL_1%%`
- `%%C7_SOURCE_URL_2%%`
- `%%C7_SUMMARY%%`
- `%%C7_TABLE_CAPTION%%`
- `%%C7_TABLE_CELL_1_1%%`
- `%%C7_TABLE_CELL_1_2%%`
- `%%C7_TABLE_CELL_2_1%%`
- `%%C7_TABLE_CELL_2_2%%`
- `%%C7_TABLE_CELL_3_1%%`
- `%%C7_TABLE_CELL_3_2%%`
- `%%C7_TABLE_COL_1%%`
- `%%C7_TABLE_COL_2%%`
- `%%C7_TABLE_COL_3%%`
- `%%C7_TABLE_ROW_1%%`
- `%%C7_TABLE_ROW_2%%`
- `%%C7_TABLE_ROW_3%%`
- `%%C7_TEXT_1%%`
- `%%C7_TEXT_2%%`
- `%%C7_TEXT_3%%`
- `%%C7_TEXT_4%%`
- `%%C7_TITLE%%`
- `%%C8_CHECKED%%`
- `%%C8_COVER_ALT%%`
- `%%C8_COVER_CAPTION%%`
- `%%C8_DESC%%`
- `%%C8_END_TEXT%%`
- `%%C8_END_TITLE%%`
- `%%C8_FAQ_A1%%`
- `%%C8_FAQ_A2%%`
- `%%C8_FAQ_Q1%%`
- `%%C8_FAQ_Q2%%`
- `%%C8_H2_1%%`
- `%%C8_H2_2%%`
- `%%C8_H2_3%%`
- `%%C8_H2_4%%`
- `%%C8_H2_5%%`
- `%%C8_INTRO%%`
- `%%C8_MODIFIED%%`
- `%%C8_M_LABEL_1%%`
- `%%C8_M_LABEL_2%%`
- `%%C8_M_LABEL_3%%`
- `%%C8_M_TEXT_1%%`
- `%%C8_M_TEXT_2%%`
- `%%C8_M_TEXT_3%%`
- `%%C8_PUBLISHED%%`
- `%%C8_QUOTE%%`
- `%%C8_QUOTE_ATTRIBUTION%%`
- `%%C8_SOURCE_LABEL_1%%`
- `%%C8_SOURCE_LABEL_2%%`
- `%%C8_SOURCE_NOTE_1%%`
- `%%C8_SOURCE_NOTE_2%%`
- `%%C8_SOURCE_URL_1%%`
- `%%C8_SOURCE_URL_2%%`
- `%%C8_SUMMARY%%`
- `%%C8_TABLE_CAPTION%%`
- `%%C8_TABLE_CELL_1_1%%`
- `%%C8_TABLE_CELL_1_2%%`
- `%%C8_TABLE_CELL_2_1%%`
- `%%C8_TABLE_CELL_2_2%%`
- `%%C8_TABLE_CELL_3_1%%`
- `%%C8_TABLE_CELL_3_2%%`
- `%%C8_TABLE_COL_1%%`
- `%%C8_TABLE_COL_2%%`
- `%%C8_TABLE_COL_3%%`
- `%%C8_TABLE_ROW_1%%`
- `%%C8_TABLE_ROW_2%%`
- `%%C8_TABLE_ROW_3%%`
- `%%C8_TEXT_1%%`
- `%%C8_TEXT_2%%`
- `%%C8_TEXT_3%%`
- `%%C8_TEXT_4%%`
- `%%C8_TEXT_5%%`
- `%%C8_TITLE%%`
- `%%C9_CHECKED%%`
- `%%C9_COVER_ALT%%`
- `%%C9_COVER_CAPTION%%`
- `%%C9_DESC%%`
- `%%C9_END_TEXT%%`
- `%%C9_END_TITLE%%`
- `%%C9_FAQ_A1%%`
- `%%C9_FAQ_A2%%`
- `%%C9_FAQ_A3%%`
- `%%C9_FAQ_Q1%%`
- `%%C9_FAQ_Q2%%`
- `%%C9_FAQ_Q3%%`
- `%%C9_H2_1%%`
- `%%C9_H2_2%%`
- `%%C9_H2_3%%`
- `%%C9_INTRO%%`
- `%%C9_MODIFIED%%`
- `%%C9_M_LABEL_1%%`
- `%%C9_M_LABEL_2%%`
- `%%C9_M_LABEL_3%%`
- `%%C9_M_TEXT_1%%`
- `%%C9_M_TEXT_2%%`
- `%%C9_M_TEXT_3%%`
- `%%C9_PUBLISHED%%`
- `%%C9_QUOTE%%`
- `%%C9_QUOTE_ATTRIBUTION%%`
- `%%C9_RSS_DATE%%`
- `%%C9_SOURCE_LABEL_1%%`
- `%%C9_SOURCE_LABEL_2%%`
- `%%C9_SOURCE_NOTE_1%%`
- `%%C9_SOURCE_NOTE_2%%`
- `%%C9_SOURCE_URL_1%%`
- `%%C9_SOURCE_URL_2%%`
- `%%C9_SUMMARY%%`
- `%%C9_TABLE_CAPTION%%`
- `%%C9_TABLE_CELL_1_1%%`
- `%%C9_TABLE_CELL_1_2%%`
- `%%C9_TABLE_CELL_2_1%%`
- `%%C9_TABLE_CELL_2_2%%`
- `%%C9_TABLE_CELL_3_1%%`
- `%%C9_TABLE_CELL_3_2%%`
- `%%C9_TABLE_COL_1%%`
- `%%C9_TABLE_COL_2%%`
- `%%C9_TABLE_COL_3%%`
- `%%C9_TABLE_ROW_1%%`
- `%%C9_TABLE_ROW_2%%`
- `%%C9_TABLE_ROW_3%%`
- `%%C9_TEXT_1%%`
- `%%C9_TEXT_2%%`
- `%%C9_TEXT_3%%`
- `%%C9_TITLE%%`
- `%%CANOPY_NOTE%%`
- `%%CANOPY_TITLE%%`
- `%%CONTACT_DESC%%`
- `%%CONTACT_EMAIL%%`
- `%%CONTACT_H2_1%%`
- `%%CONTACT_H2_2%%`
- `%%CONTACT_H2_3%%`
- `%%CONTACT_INTRO%%`
- `%%CONTACT_MODIFIED%%`
- `%%CONTACT_NOTE%%`
- `%%CONTACT_TEXT_1%%`
- `%%CONTACT_TEXT_2%%`
- `%%CONTACT_TEXT_3%%`
- `%%CORRECTIONS_DESC%%`
- `%%CORRECTIONS_H2_1%%`
- `%%CORRECTIONS_H2_2%%`
- `%%CORRECTIONS_H2_3%%`
- `%%CORRECTIONS_INTRO%%`
- `%%CORRECTIONS_MODIFIED%%`
- `%%CORRECTIONS_NOTE%%`
- `%%CORRECTIONS_TEXT_1%%`
- `%%CORRECTIONS_TEXT_2%%`
- `%%CORRECTIONS_TEXT_3%%`
- `%%DISCLAIMER_DESC%%`
- `%%DISCLAIMER_H2_1%%`
- `%%DISCLAIMER_H2_2%%`
- `%%DISCLAIMER_H2_3%%`
- `%%DISCLAIMER_INTRO%%`
- `%%DISCLAIMER_MODIFIED%%`
- `%%DISCLAIMER_NOTE%%`
- `%%DISCLAIMER_TEXT_1%%`
- `%%DISCLAIMER_TEXT_2%%`
- `%%DISCLAIMER_TEXT_3%%`
- `%%DISCLOSURE_DESC%%`
- `%%DISCLOSURE_H2_1%%`
- `%%DISCLOSURE_H2_2%%`
- `%%DISCLOSURE_H2_3%%`
- `%%DISCLOSURE_INTRO%%`
- `%%DISCLOSURE_MODIFIED%%`
- `%%DISCLOSURE_NOTE%%`
- `%%DISCLOSURE_TEXT_1%%`
- `%%DISCLOSURE_TEXT_2%%`
- `%%DISCLOSURE_TEXT_3%%`
- `%%EDITORIAL_DESC%%`
- `%%EDITORIAL_H2_1%%`
- `%%EDITORIAL_H2_2%%`
- `%%EDITORIAL_H2_3%%`
- `%%EDITORIAL_INTRO%%`
- `%%EDITORIAL_MODIFIED%%`
- `%%EDITORIAL_NOTE%%`
- `%%EDITORIAL_TEXT_1%%`
- `%%EDITORIAL_TEXT_2%%`
- `%%EDITORIAL_TEXT_3%%`
- `%%GROVE1_DESC%%`
- `%%GROVE1_INTRO%%`
- `%%GROVE2_DESC%%`
- `%%GROVE2_INTRO%%`
- `%%GROVE3_DESC%%`
- `%%GROVE3_INTRO%%`
- `%%HERO_DESCRIPTION%%`
- `%%HERO_EYEBROW%%`
- `%%HERO_TITLE%%`
- `%%HOME_COVER_ALT%%`
- `%%HOME_FEATURED_LABEL%%`
- `%%HOME_LATEST_LABEL%%`
- `%%HOME_LINKS_LABEL%%`
- `%%INDEPENDENCE_NOTE%%`
- `%%INVITE_CODE%%`
- `%%LANG%%`
- `%%LEGAL_ENTRY_DESC%%`
- `%%LIBRARY_DESC%%`
- `%%LIBRARY_INTRO%%`
- `%%PASS_LABEL%%`
- `%%PRIVACY_DESC%%`
- `%%PRIVACY_H2_1%%`
- `%%PRIVACY_H2_2%%`
- `%%PRIVACY_H2_3%%`
- `%%PRIVACY_INTRO%%`
- `%%PRIVACY_MODIFIED%%`
- `%%PRIVACY_NOTE%%`
- `%%PRIVACY_TEXT_1%%`
- `%%PRIVACY_TEXT_2%%`
- `%%PRIVACY_TEXT_3%%`
- `%%RISK_NOTE%%`
- `%%SECURITY_EMAIL%%`
- `%%SECURITY_EXPIRES%%`
- `%%SEO_TITLE%%`
- `%%SITE_DESC%%`
- `%%SITE_DOMAIN%%`
- `%%SITE_NAME%%`
- `%%SITE_TAGLINE%%`
- `%%TOOL_ENTRY_DESC%%`
- `%%WORKSHOP_DESC%%`
- `%%WORKSHOP_INTRO%%`

## 验收记录

- 2026-09-04：validate、audit-template、audit-workflow-readiness 均通过，P0/P1/P2 均为 0。共 85 个文件、34 个 HTML，30 个可索引页面；保留首页原有 56 个类名，原 static/app.css 字节不变。变量登记、JSON-LD、页内锚点、十二封面独立性与敏感模式检查通过。
- `node tools/qa/056-pine-board-browser.js`：34 页 × 1440/768/390/360px × 明暗主题，共 272 次渲染、314 项功能与边界检查，零失败、零控制台或网络错误。证据保存在本地 `artifacts/qa/056-pine-board-v2-2026-09-04/`，生成产物不提交 Git。
- 五工具覆盖正常/错误/上限/Unicode/重置/原生粘贴与回车、复制拒绝及异步旧结果失效；Hamilton 分配有总数与舍入不变量，LPT 用反例确认不承诺全局最优，最小标签覆盖与独立子集枚举结果交叉核对。首页首屏复制、主题持久化、菜单焦点/Escape、两处泳道筛选、404 三态及深层真实 404、唯一推广 UI 槽位、无 JS 阅读及禁用提交、reduced-motion、阅读进度与原生键盘跳转通过。
- 人工复核首页、三种开场、十二内容模块、五工具、移动端表格、夜间错误与聚焦目录。修正夜间跳转链接对比度、聚焦单泳道宽度和封面文字压线后完整重验；跳转链接测试环境曾因浏览器目标未获焦点误报，已显式激活页面并用原生 Tab/Enter 重验。
- 与相邻 055 比较：类名 1.1%、DOM 标签二元组 43.3%、CSS 属性序列 33.7%。全库 160 套类名最高 9.1%；仍只有既有 003×004、005×006 两组 CSS 参考警告。这些指标不等于不存在任何可识别共性。
- 原始动态源包忠实度仍未核验，不以 UI 就绪代替来源证明。本轮仅制作模板，不写注册教程或业务文章，未触发 CI、未部署生产。真实文字、事实及变量填入后仍需执行单站内容与发布审计。
