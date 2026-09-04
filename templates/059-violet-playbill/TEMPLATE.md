# 059-violet-playbill · 紫罗兰节目单

## 完整框架与来源边界

保留原 assets/poster.css、紫罗兰开幕帷幕、金色聚光区、角色票根和节目表；assets/repertory.css 补齐完整阅读与工具 UI，保持 vp59 命名空间。原始动态源包忠实度未核验，本地 UI 就绪不等于复刻证明。

## 后续 AI 只接入文字与变量

- 12 个 S1–S12 文章槽位，三种节目单开场、十二种舞台组件、5/4/3 个正文 H2、2/4/3 个 FAQ、三种页签及散场收尾已完成。作者身份、经历、日期、状态、来源与政策结论必须核实；抽象封面不是现场照片或真实证据。
- 保留所有路径、class、id、data、form name、ARIA 关系与组件布局。只填站点变量和经查证文章文字，不需增加页面、设计工具、补封面或修移动 UI。增删场次时同步文章索引、分类、首页、相关内容、sitemap 与 RSS。
- registrationGuide 仅为旧审计器字段，指向 invitation-ticket.html 内的通用推广 UI 外壳，不指定注册教程选题或正文。该页唯一静态推广 href 带 sponsored/nofollow/noopener/noreferrer，邻近披露；首页只显示并真复制邀请码，没有推广直链。
- 字标填英文或罗马字；HTML/XML 内容及属性按上下文转义，JSON-LD 用 JSON 字符串编码且安全转义小于号。域名不带协议或路径；来源只填经核实 HTTPS 地址，不填推广链接。时间用 ISO，RSS_DATE 用 RFC822，SECURITY_EXPIRES 用未来 RFC3339。
- 首页标题、邀请码与条件保持简短，替换后复查 360px 首屏与长词；正文不同组件按用途填内容，不虚构经历或实测。三幕各四篇，首两个槽位为 cornerstone。
- 明暗主题是唯一 localStorage 项，默认暗色；输入、筛选与结果不保存、不上传。无 JS 可阅读和导航，筛选隐藏，提交与复制禁用；原生目录 details 可展开。输入/重置使旧输出失效，异步复制不会复活旧状态。
- 五工具为规范化行集合对照、整数秒串场编排、增广路径最大二分匹配、Luhn 数字校验位、固定大小组合枚举；各 Guide 有格式、样例与边界，不输出投资或事实判断。Luhn 不是防伪或身份验证；不输入敏感号码。
- 12 套独立 1200×630 SVG/PNG/WebP 封面，WebP 显示并高优先级预载、对应独立 PNG 用于 OG；站点社交图、SVG/ICO、180px apple、robots、sitemap、security.txt 已备齐。RSS 为第 1/2/4/5/7/8/9/11/12 篇摘要，不含邀请码或推广。
- article.html/tool.html/legal.html 是 noindex 兼容入口，不自动跳转；服务器应把未知深层 URL 以真实 404 映射到 404.html，本轮不配置或部署服务器。填实内容后需另做单站事实、合规与发布验收。

## workflow-ready-v2

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "programme.html",
  "articles": [
    "scenes/opening-score.html",
    "scenes/source-footlights.html",
    "scenes/role-map.html",
    "scenes/script-dialogue.html",
    "scenes/act-clock.html",
    "scenes/stage-blocking.html",
    "scenes/prop-inventory.html",
    "scenes/director-margins.html",
    "scenes/scene-ladder.html",
    "scenes/continuity-pair.html",
    "scenes/revival-notes.html",
    "scenes/invitation-ticket.html"
  ],
  "cornerstones": [
    "scenes/opening-score.html",
    "scenes/source-footlights.html"
  ],
  "registrationGuide": "scenes/invitation-ticket.html",
  "articleCovers": {
    "scenes/opening-score.html": {
      "display": "assets/covers/opening-score.webp",
      "og": "assets/covers/opening-score.png"
    },
    "scenes/source-footlights.html": {
      "display": "assets/covers/source-footlights.webp",
      "og": "assets/covers/source-footlights.png"
    },
    "scenes/role-map.html": {
      "display": "assets/covers/role-map.webp",
      "og": "assets/covers/role-map.png"
    },
    "scenes/script-dialogue.html": {
      "display": "assets/covers/script-dialogue.webp",
      "og": "assets/covers/script-dialogue.png"
    },
    "scenes/act-clock.html": {
      "display": "assets/covers/act-clock.webp",
      "og": "assets/covers/act-clock.png"
    },
    "scenes/stage-blocking.html": {
      "display": "assets/covers/stage-blocking.webp",
      "og": "assets/covers/stage-blocking.png"
    },
    "scenes/prop-inventory.html": {
      "display": "assets/covers/prop-inventory.webp",
      "og": "assets/covers/prop-inventory.png"
    },
    "scenes/director-margins.html": {
      "display": "assets/covers/director-margins.webp",
      "og": "assets/covers/director-margins.png"
    },
    "scenes/scene-ladder.html": {
      "display": "assets/covers/scene-ladder.webp",
      "og": "assets/covers/scene-ladder.png"
    },
    "scenes/continuity-pair.html": {
      "display": "assets/covers/continuity-pair.webp",
      "og": "assets/covers/continuity-pair.png"
    },
    "scenes/revival-notes.html": {
      "display": "assets/covers/revival-notes.webp",
      "og": "assets/covers/revival-notes.png"
    },
    "scenes/invitation-ticket.html": {
      "display": "assets/covers/invitation-ticket.webp",
      "og": "assets/covers/invitation-ticket.png"
    }
  },
  "categories": [
    {
      "path": "acts/first-reading.html",
      "label": "开场读本",
      "articles": [
        "scenes/opening-score.html",
        "scenes/source-footlights.html",
        "scenes/role-map.html",
        "scenes/script-dialogue.html"
      ]
    },
    {
      "path": "acts/backstage-notes.html",
      "label": "幕后场记",
      "articles": [
        "scenes/act-clock.html",
        "scenes/stage-blocking.html",
        "scenes/prop-inventory.html",
        "scenes/director-margins.html"
      ]
    },
    {
      "path": "acts/encore-review.html",
      "label": "返场复看",
      "articles": [
        "scenes/scene-ladder.html",
        "scenes/continuity-pair.html",
        "scenes/revival-notes.html",
        "scenes/invitation-ticket.html"
      ]
    }
  ],
  "toolIndex": "workshop.html",
  "tools": [
    "workshop/line-comparison.html",
    "workshop/cue-runtime.html",
    "workshop/cast-matching.html",
    "workshop/luhn-ticket.html",
    "workshop/programme-combinations.html"
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
    "siteDomain": "[[SITE_DOMAIN]]",
    "siteName": "[[SITE_NAME]]",
    "wordmark": "[[BRAND_EN]]",
    "inviteCode": "[[INVITE_CODE]]",
    "benefitRate": "[[BENEFIT_RATE]]",
    "benefitDisclaimer": "[[BENEFIT_DISCLAIMER]]",
    "affiliateUrl": "[[AFFILIATE_URL]]"
  }
}
```

## 变量表

- `[[ABOUT_DESC]]`
- `[[ABOUT_H2_1]]`
- `[[ABOUT_H2_2]]`
- `[[ABOUT_H2_3]]`
- `[[ABOUT_INTRO]]`
- `[[ABOUT_MODIFIED]]`
- `[[ABOUT_NOTE]]`
- `[[ABOUT_TEXT_1]]`
- `[[ABOUT_TEXT_2]]`
- `[[ABOUT_TEXT_3]]`
- `[[ACT1_DESC]]`
- `[[ACT1_INTRO]]`
- `[[ACT2_DESC]]`
- `[[ACT2_INTRO]]`
- `[[ACT3_DESC]]`
- `[[ACT3_INTRO]]`
- `[[AFFILIATE_DISCLOSURE]]`
- `[[AFFILIATE_LABEL]]`
- `[[AFFILIATE_URL]]`
- `[[AUTHOR_BIO]]`
- `[[AUTHOR_NAME]]`
- `[[BENEFIT_DISCLAIMER]]`
- `[[BENEFIT_RATE]]`
- `[[BRAND_EN]]`
- `[[CAST_NOTE_1]]`
- `[[CAST_NOTE_2]]`
- `[[CAST_NOTE_3]]`
- `[[CAST_NOTE_4]]`
- `[[CAST_TITLE]]`
- `[[CONTACT_DESC]]`
- `[[CONTACT_EMAIL]]`
- `[[CONTACT_H2_1]]`
- `[[CONTACT_H2_2]]`
- `[[CONTACT_H2_3]]`
- `[[CONTACT_INTRO]]`
- `[[CONTACT_MODIFIED]]`
- `[[CONTACT_NOTE]]`
- `[[CONTACT_TEXT_1]]`
- `[[CONTACT_TEXT_2]]`
- `[[CONTACT_TEXT_3]]`
- `[[CORRECTIONS_DESC]]`
- `[[CORRECTIONS_H2_1]]`
- `[[CORRECTIONS_H2_2]]`
- `[[CORRECTIONS_H2_3]]`
- `[[CORRECTIONS_INTRO]]`
- `[[CORRECTIONS_MODIFIED]]`
- `[[CORRECTIONS_NOTE]]`
- `[[CORRECTIONS_TEXT_1]]`
- `[[CORRECTIONS_TEXT_2]]`
- `[[CORRECTIONS_TEXT_3]]`
- `[[DISCLAIMER_DESC]]`
- `[[DISCLAIMER_H2_1]]`
- `[[DISCLAIMER_H2_2]]`
- `[[DISCLAIMER_H2_3]]`
- `[[DISCLAIMER_INTRO]]`
- `[[DISCLAIMER_MODIFIED]]`
- `[[DISCLAIMER_NOTE]]`
- `[[DISCLAIMER_TEXT_1]]`
- `[[DISCLAIMER_TEXT_2]]`
- `[[DISCLAIMER_TEXT_3]]`
- `[[DISCLOSURE_DESC]]`
- `[[DISCLOSURE_H2_1]]`
- `[[DISCLOSURE_H2_2]]`
- `[[DISCLOSURE_H2_3]]`
- `[[DISCLOSURE_INTRO]]`
- `[[DISCLOSURE_MODIFIED]]`
- `[[DISCLOSURE_NOTE]]`
- `[[DISCLOSURE_TEXT_1]]`
- `[[DISCLOSURE_TEXT_2]]`
- `[[DISCLOSURE_TEXT_3]]`
- `[[EDITORIAL_DESC]]`
- `[[EDITORIAL_H2_1]]`
- `[[EDITORIAL_H2_2]]`
- `[[EDITORIAL_H2_3]]`
- `[[EDITORIAL_INTRO]]`
- `[[EDITORIAL_MODIFIED]]`
- `[[EDITORIAL_NOTE]]`
- `[[EDITORIAL_TEXT_1]]`
- `[[EDITORIAL_TEXT_2]]`
- `[[EDITORIAL_TEXT_3]]`
- `[[HERO_DESCRIPTION]]`
- `[[HERO_EYEBROW]]`
- `[[HERO_TITLE]]`
- `[[HOME_ACT_1]]`
- `[[HOME_ACT_2]]`
- `[[HOME_ACT_3]]`
- `[[HOME_FEATURED_LABEL]]`
- `[[HOME_ISSUE_LABEL]]`
- `[[HOME_LATEST_LABEL]]`
- `[[HOME_LINKS_LABEL]]`
- `[[HOME_TOOLS_TITLE]]`
- `[[INDEPENDENCE_NOTE]]`
- `[[INVITE_CODE]]`
- `[[INVITE_LABEL]]`
- `[[LANG]]`
- `[[PRIVACY_DESC]]`
- `[[PRIVACY_H2_1]]`
- `[[PRIVACY_H2_2]]`
- `[[PRIVACY_H2_3]]`
- `[[PRIVACY_INTRO]]`
- `[[PRIVACY_MODIFIED]]`
- `[[PRIVACY_NOTE]]`
- `[[PRIVACY_TEXT_1]]`
- `[[PRIVACY_TEXT_2]]`
- `[[PRIVACY_TEXT_3]]`
- `[[PROGRAMME_DESC]]`
- `[[PROGRAMME_INTRO]]`
- `[[RISK_NOTE]]`
- `[[RUNNING_TITLE]]`
- `[[S10_CHECKED]]`
- `[[S10_COVER_ALT]]`
- `[[S10_COVER_CAPTION]]`
- `[[S10_DESC]]`
- `[[S10_END_TEXT]]`
- `[[S10_END_TITLE]]`
- `[[S10_FAQ_A1]]`
- `[[S10_FAQ_A2]]`
- `[[S10_FAQ_Q1]]`
- `[[S10_FAQ_Q2]]`
- `[[S10_H2_1]]`
- `[[S10_H2_2]]`
- `[[S10_H2_3]]`
- `[[S10_H2_4]]`
- `[[S10_H2_5]]`
- `[[S10_INTRO]]`
- `[[S10_MODIFIED]]`
- `[[S10_M_LABEL_1]]`
- `[[S10_M_LABEL_2]]`
- `[[S10_M_TEXT_1]]`
- `[[S10_M_TEXT_2]]`
- `[[S10_PUBLISHED]]`
- `[[S10_QUOTE]]`
- `[[S10_QUOTE_ATTRIBUTION]]`
- `[[S10_SOURCE_LABEL_1]]`
- `[[S10_SOURCE_LABEL_2]]`
- `[[S10_SOURCE_NOTE_1]]`
- `[[S10_SOURCE_NOTE_2]]`
- `[[S10_SOURCE_URL_1]]`
- `[[S10_SOURCE_URL_2]]`
- `[[S10_STATUS]]`
- `[[S10_SUMMARY]]`
- `[[S10_TABLE_CAPTION]]`
- `[[S10_TABLE_CELL_1_1]]`
- `[[S10_TABLE_CELL_1_2]]`
- `[[S10_TABLE_CELL_2_1]]`
- `[[S10_TABLE_CELL_2_2]]`
- `[[S10_TABLE_CELL_3_1]]`
- `[[S10_TABLE_CELL_3_2]]`
- `[[S10_TABLE_COL_1]]`
- `[[S10_TABLE_COL_2]]`
- `[[S10_TABLE_COL_3]]`
- `[[S10_TABLE_ROW_1]]`
- `[[S10_TABLE_ROW_2]]`
- `[[S10_TABLE_ROW_3]]`
- `[[S10_TEXT_1]]`
- `[[S10_TEXT_2]]`
- `[[S10_TEXT_3]]`
- `[[S10_TEXT_4]]`
- `[[S10_TEXT_5]]`
- `[[S10_TITLE]]`
- `[[S11_CHECKED]]`
- `[[S11_COVER_ALT]]`
- `[[S11_COVER_CAPTION]]`
- `[[S11_DESC]]`
- `[[S11_END_TEXT]]`
- `[[S11_END_TITLE]]`
- `[[S11_FAQ_A1]]`
- `[[S11_FAQ_A2]]`
- `[[S11_FAQ_A3]]`
- `[[S11_FAQ_A4]]`
- `[[S11_FAQ_Q1]]`
- `[[S11_FAQ_Q2]]`
- `[[S11_FAQ_Q3]]`
- `[[S11_FAQ_Q4]]`
- `[[S11_H2_1]]`
- `[[S11_H2_2]]`
- `[[S11_H2_3]]`
- `[[S11_H2_4]]`
- `[[S11_INTRO]]`
- `[[S11_MODIFIED]]`
- `[[S11_M_LABEL]]`
- `[[S11_M_LABEL_1]]`
- `[[S11_M_LABEL_2]]`
- `[[S11_M_LABEL_3]]`
- `[[S11_M_TEXT]]`
- `[[S11_M_TEXT_1]]`
- `[[S11_M_TEXT_2]]`
- `[[S11_M_TEXT_3]]`
- `[[S11_PUBLISHED]]`
- `[[S11_QUOTE]]`
- `[[S11_QUOTE_ATTRIBUTION]]`
- `[[S11_RSS_DATE]]`
- `[[S11_SOURCE_LABEL_1]]`
- `[[S11_SOURCE_LABEL_2]]`
- `[[S11_SOURCE_NOTE_1]]`
- `[[S11_SOURCE_NOTE_2]]`
- `[[S11_SOURCE_URL_1]]`
- `[[S11_SOURCE_URL_2]]`
- `[[S11_STATUS]]`
- `[[S11_SUMMARY]]`
- `[[S11_TABLE_CAPTION]]`
- `[[S11_TABLE_CELL_1_1]]`
- `[[S11_TABLE_CELL_1_2]]`
- `[[S11_TABLE_CELL_2_1]]`
- `[[S11_TABLE_CELL_2_2]]`
- `[[S11_TABLE_CELL_3_1]]`
- `[[S11_TABLE_CELL_3_2]]`
- `[[S11_TABLE_COL_1]]`
- `[[S11_TABLE_COL_2]]`
- `[[S11_TABLE_COL_3]]`
- `[[S11_TABLE_ROW_1]]`
- `[[S11_TABLE_ROW_2]]`
- `[[S11_TABLE_ROW_3]]`
- `[[S11_TEXT_1]]`
- `[[S11_TEXT_2]]`
- `[[S11_TEXT_3]]`
- `[[S11_TEXT_4]]`
- `[[S11_TITLE]]`
- `[[S12_CHECKED]]`
- `[[S12_COVER_ALT]]`
- `[[S12_COVER_CAPTION]]`
- `[[S12_DESC]]`
- `[[S12_END_TEXT]]`
- `[[S12_END_TITLE]]`
- `[[S12_FAQ_A1]]`
- `[[S12_FAQ_A2]]`
- `[[S12_FAQ_A3]]`
- `[[S12_FAQ_Q1]]`
- `[[S12_FAQ_Q2]]`
- `[[S12_FAQ_Q3]]`
- `[[S12_H2_1]]`
- `[[S12_H2_2]]`
- `[[S12_H2_3]]`
- `[[S12_INTRO]]`
- `[[S12_MODIFIED]]`
- `[[S12_M_LABEL]]`
- `[[S12_M_TEXT]]`
- `[[S12_PUBLISHED]]`
- `[[S12_QUOTE]]`
- `[[S12_QUOTE_ATTRIBUTION]]`
- `[[S12_RSS_DATE]]`
- `[[S12_SOURCE_LABEL_1]]`
- `[[S12_SOURCE_LABEL_2]]`
- `[[S12_SOURCE_NOTE_1]]`
- `[[S12_SOURCE_NOTE_2]]`
- `[[S12_SOURCE_URL_1]]`
- `[[S12_SOURCE_URL_2]]`
- `[[S12_STATUS]]`
- `[[S12_SUMMARY]]`
- `[[S12_TABLE_CAPTION]]`
- `[[S12_TABLE_CELL_1_1]]`
- `[[S12_TABLE_CELL_1_2]]`
- `[[S12_TABLE_CELL_2_1]]`
- `[[S12_TABLE_CELL_2_2]]`
- `[[S12_TABLE_CELL_3_1]]`
- `[[S12_TABLE_CELL_3_2]]`
- `[[S12_TABLE_COL_1]]`
- `[[S12_TABLE_COL_2]]`
- `[[S12_TABLE_COL_3]]`
- `[[S12_TABLE_ROW_1]]`
- `[[S12_TABLE_ROW_2]]`
- `[[S12_TABLE_ROW_3]]`
- `[[S12_TEXT_1]]`
- `[[S12_TEXT_2]]`
- `[[S12_TEXT_3]]`
- `[[S12_TITLE]]`
- `[[S1_CHECKED]]`
- `[[S1_COVER_ALT]]`
- `[[S1_COVER_CAPTION]]`
- `[[S1_DESC]]`
- `[[S1_END_TEXT]]`
- `[[S1_END_TITLE]]`
- `[[S1_FAQ_A1]]`
- `[[S1_FAQ_A2]]`
- `[[S1_FAQ_Q1]]`
- `[[S1_FAQ_Q2]]`
- `[[S1_H2_1]]`
- `[[S1_H2_2]]`
- `[[S1_H2_3]]`
- `[[S1_H2_4]]`
- `[[S1_H2_5]]`
- `[[S1_INTRO]]`
- `[[S1_MODIFIED]]`
- `[[S1_M_LABEL]]`
- `[[S1_M_LABEL_1]]`
- `[[S1_M_LABEL_2]]`
- `[[S1_M_LABEL_3]]`
- `[[S1_M_LABEL_4]]`
- `[[S1_M_TEXT_1]]`
- `[[S1_M_TEXT_2]]`
- `[[S1_M_TEXT_3]]`
- `[[S1_M_TEXT_4]]`
- `[[S1_PUBLISHED]]`
- `[[S1_QUOTE]]`
- `[[S1_QUOTE_ATTRIBUTION]]`
- `[[S1_RSS_DATE]]`
- `[[S1_SOURCE_LABEL_1]]`
- `[[S1_SOURCE_LABEL_2]]`
- `[[S1_SOURCE_NOTE_1]]`
- `[[S1_SOURCE_NOTE_2]]`
- `[[S1_SOURCE_URL_1]]`
- `[[S1_SOURCE_URL_2]]`
- `[[S1_STATUS]]`
- `[[S1_SUMMARY]]`
- `[[S1_TABLE_CAPTION]]`
- `[[S1_TABLE_CELL_1_1]]`
- `[[S1_TABLE_CELL_1_2]]`
- `[[S1_TABLE_CELL_2_1]]`
- `[[S1_TABLE_CELL_2_2]]`
- `[[S1_TABLE_CELL_3_1]]`
- `[[S1_TABLE_CELL_3_2]]`
- `[[S1_TABLE_COL_1]]`
- `[[S1_TABLE_COL_2]]`
- `[[S1_TABLE_COL_3]]`
- `[[S1_TABLE_ROW_1]]`
- `[[S1_TABLE_ROW_2]]`
- `[[S1_TABLE_ROW_3]]`
- `[[S1_TEXT_1]]`
- `[[S1_TEXT_2]]`
- `[[S1_TEXT_3]]`
- `[[S1_TEXT_4]]`
- `[[S1_TEXT_5]]`
- `[[S1_TITLE]]`
- `[[S2_CHECKED]]`
- `[[S2_COVER_ALT]]`
- `[[S2_COVER_CAPTION]]`
- `[[S2_DESC]]`
- `[[S2_END_TEXT]]`
- `[[S2_END_TITLE]]`
- `[[S2_FAQ_A1]]`
- `[[S2_FAQ_A2]]`
- `[[S2_FAQ_A3]]`
- `[[S2_FAQ_A4]]`
- `[[S2_FAQ_Q1]]`
- `[[S2_FAQ_Q2]]`
- `[[S2_FAQ_Q3]]`
- `[[S2_FAQ_Q4]]`
- `[[S2_H2_1]]`
- `[[S2_H2_2]]`
- `[[S2_H2_3]]`
- `[[S2_H2_4]]`
- `[[S2_INTRO]]`
- `[[S2_MODIFIED]]`
- `[[S2_M_LABEL_1]]`
- `[[S2_M_LABEL_2]]`
- `[[S2_M_LABEL_3]]`
- `[[S2_M_TEXT_1]]`
- `[[S2_M_TEXT_2]]`
- `[[S2_M_TEXT_3]]`
- `[[S2_PUBLISHED]]`
- `[[S2_QUOTE]]`
- `[[S2_QUOTE_ATTRIBUTION]]`
- `[[S2_RSS_DATE]]`
- `[[S2_SOURCE_LABEL_1]]`
- `[[S2_SOURCE_LABEL_2]]`
- `[[S2_SOURCE_NOTE_1]]`
- `[[S2_SOURCE_NOTE_2]]`
- `[[S2_SOURCE_URL_1]]`
- `[[S2_SOURCE_URL_2]]`
- `[[S2_STATUS]]`
- `[[S2_SUMMARY]]`
- `[[S2_TABLE_CAPTION]]`
- `[[S2_TABLE_CELL_1_1]]`
- `[[S2_TABLE_CELL_1_2]]`
- `[[S2_TABLE_CELL_2_1]]`
- `[[S2_TABLE_CELL_2_2]]`
- `[[S2_TABLE_CELL_3_1]]`
- `[[S2_TABLE_CELL_3_2]]`
- `[[S2_TABLE_COL_1]]`
- `[[S2_TABLE_COL_2]]`
- `[[S2_TABLE_COL_3]]`
- `[[S2_TABLE_ROW_1]]`
- `[[S2_TABLE_ROW_2]]`
- `[[S2_TABLE_ROW_3]]`
- `[[S2_TEXT_1]]`
- `[[S2_TEXT_2]]`
- `[[S2_TEXT_3]]`
- `[[S2_TEXT_4]]`
- `[[S2_TITLE]]`
- `[[S3_CHECKED]]`
- `[[S3_COVER_ALT]]`
- `[[S3_COVER_CAPTION]]`
- `[[S3_DESC]]`
- `[[S3_END_TEXT]]`
- `[[S3_END_TITLE]]`
- `[[S3_FAQ_A1]]`
- `[[S3_FAQ_A2]]`
- `[[S3_FAQ_A3]]`
- `[[S3_FAQ_Q1]]`
- `[[S3_FAQ_Q2]]`
- `[[S3_FAQ_Q3]]`
- `[[S3_H2_1]]`
- `[[S3_H2_2]]`
- `[[S3_H2_3]]`
- `[[S3_INTRO]]`
- `[[S3_MODIFIED]]`
- `[[S3_M_LABEL_1]]`
- `[[S3_M_LABEL_2]]`
- `[[S3_M_LABEL_3]]`
- `[[S3_M_TEXT_1]]`
- `[[S3_M_TEXT_2]]`
- `[[S3_M_TEXT_3]]`
- `[[S3_PUBLISHED]]`
- `[[S3_QUOTE]]`
- `[[S3_QUOTE_ATTRIBUTION]]`
- `[[S3_SOURCE_LABEL_1]]`
- `[[S3_SOURCE_LABEL_2]]`
- `[[S3_SOURCE_NOTE_1]]`
- `[[S3_SOURCE_NOTE_2]]`
- `[[S3_SOURCE_URL_1]]`
- `[[S3_SOURCE_URL_2]]`
- `[[S3_STATUS]]`
- `[[S3_SUMMARY]]`
- `[[S3_TABLE_CAPTION]]`
- `[[S3_TABLE_CELL_1_1]]`
- `[[S3_TABLE_CELL_1_2]]`
- `[[S3_TABLE_CELL_2_1]]`
- `[[S3_TABLE_CELL_2_2]]`
- `[[S3_TABLE_CELL_3_1]]`
- `[[S3_TABLE_CELL_3_2]]`
- `[[S3_TABLE_COL_1]]`
- `[[S3_TABLE_COL_2]]`
- `[[S3_TABLE_COL_3]]`
- `[[S3_TABLE_ROW_1]]`
- `[[S3_TABLE_ROW_2]]`
- `[[S3_TABLE_ROW_3]]`
- `[[S3_TEXT_1]]`
- `[[S3_TEXT_2]]`
- `[[S3_TEXT_3]]`
- `[[S3_TITLE]]`
- `[[S4_CHECKED]]`
- `[[S4_COVER_ALT]]`
- `[[S4_COVER_CAPTION]]`
- `[[S4_DESC]]`
- `[[S4_END_TEXT]]`
- `[[S4_END_TITLE]]`
- `[[S4_FAQ_A1]]`
- `[[S4_FAQ_A2]]`
- `[[S4_FAQ_Q1]]`
- `[[S4_FAQ_Q2]]`
- `[[S4_H2_1]]`
- `[[S4_H2_2]]`
- `[[S4_H2_3]]`
- `[[S4_H2_4]]`
- `[[S4_H2_5]]`
- `[[S4_INTRO]]`
- `[[S4_MODIFIED]]`
- `[[S4_M_LABEL_1]]`
- `[[S4_M_LABEL_2]]`
- `[[S4_M_TEXT_1]]`
- `[[S4_M_TEXT_2]]`
- `[[S4_PUBLISHED]]`
- `[[S4_QUOTE]]`
- `[[S4_QUOTE_ATTRIBUTION]]`
- `[[S4_RSS_DATE]]`
- `[[S4_SOURCE_LABEL_1]]`
- `[[S4_SOURCE_LABEL_2]]`
- `[[S4_SOURCE_NOTE_1]]`
- `[[S4_SOURCE_NOTE_2]]`
- `[[S4_SOURCE_URL_1]]`
- `[[S4_SOURCE_URL_2]]`
- `[[S4_STATUS]]`
- `[[S4_SUMMARY]]`
- `[[S4_TABLE_CAPTION]]`
- `[[S4_TABLE_CELL_1_1]]`
- `[[S4_TABLE_CELL_1_2]]`
- `[[S4_TABLE_CELL_2_1]]`
- `[[S4_TABLE_CELL_2_2]]`
- `[[S4_TABLE_CELL_3_1]]`
- `[[S4_TABLE_CELL_3_2]]`
- `[[S4_TABLE_COL_1]]`
- `[[S4_TABLE_COL_2]]`
- `[[S4_TABLE_COL_3]]`
- `[[S4_TABLE_ROW_1]]`
- `[[S4_TABLE_ROW_2]]`
- `[[S4_TABLE_ROW_3]]`
- `[[S4_TEXT_1]]`
- `[[S4_TEXT_2]]`
- `[[S4_TEXT_3]]`
- `[[S4_TEXT_4]]`
- `[[S4_TEXT_5]]`
- `[[S4_TITLE]]`
- `[[S5_CHECKED]]`
- `[[S5_COVER_ALT]]`
- `[[S5_COVER_CAPTION]]`
- `[[S5_DESC]]`
- `[[S5_END_TEXT]]`
- `[[S5_END_TITLE]]`
- `[[S5_FAQ_A1]]`
- `[[S5_FAQ_A2]]`
- `[[S5_FAQ_A3]]`
- `[[S5_FAQ_A4]]`
- `[[S5_FAQ_Q1]]`
- `[[S5_FAQ_Q2]]`
- `[[S5_FAQ_Q3]]`
- `[[S5_FAQ_Q4]]`
- `[[S5_H2_1]]`
- `[[S5_H2_2]]`
- `[[S5_H2_3]]`
- `[[S5_H2_4]]`
- `[[S5_INTRO]]`
- `[[S5_MODIFIED]]`
- `[[S5_M_DATE_1]]`
- `[[S5_M_DATE_2]]`
- `[[S5_M_DATE_3]]`
- `[[S5_M_LABEL_1]]`
- `[[S5_M_LABEL_2]]`
- `[[S5_M_LABEL_3]]`
- `[[S5_M_TEXT_1]]`
- `[[S5_M_TEXT_2]]`
- `[[S5_M_TEXT_3]]`
- `[[S5_PUBLISHED]]`
- `[[S5_QUOTE]]`
- `[[S5_QUOTE_ATTRIBUTION]]`
- `[[S5_RSS_DATE]]`
- `[[S5_SOURCE_LABEL_1]]`
- `[[S5_SOURCE_LABEL_2]]`
- `[[S5_SOURCE_NOTE_1]]`
- `[[S5_SOURCE_NOTE_2]]`
- `[[S5_SOURCE_URL_1]]`
- `[[S5_SOURCE_URL_2]]`
- `[[S5_STATUS]]`
- `[[S5_SUMMARY]]`
- `[[S5_TABLE_CAPTION]]`
- `[[S5_TABLE_CELL_1_1]]`
- `[[S5_TABLE_CELL_1_2]]`
- `[[S5_TABLE_CELL_2_1]]`
- `[[S5_TABLE_CELL_2_2]]`
- `[[S5_TABLE_CELL_3_1]]`
- `[[S5_TABLE_CELL_3_2]]`
- `[[S5_TABLE_COL_1]]`
- `[[S5_TABLE_COL_2]]`
- `[[S5_TABLE_COL_3]]`
- `[[S5_TABLE_ROW_1]]`
- `[[S5_TABLE_ROW_2]]`
- `[[S5_TABLE_ROW_3]]`
- `[[S5_TEXT_1]]`
- `[[S5_TEXT_2]]`
- `[[S5_TEXT_3]]`
- `[[S5_TEXT_4]]`
- `[[S5_TITLE]]`
- `[[S6_CHECKED]]`
- `[[S6_COVER_ALT]]`
- `[[S6_COVER_CAPTION]]`
- `[[S6_DESC]]`
- `[[S6_END_TEXT]]`
- `[[S6_END_TITLE]]`
- `[[S6_FAQ_A1]]`
- `[[S6_FAQ_A2]]`
- `[[S6_FAQ_A3]]`
- `[[S6_FAQ_Q1]]`
- `[[S6_FAQ_Q2]]`
- `[[S6_FAQ_Q3]]`
- `[[S6_H2_1]]`
- `[[S6_H2_2]]`
- `[[S6_H2_3]]`
- `[[S6_INTRO]]`
- `[[S6_MODIFIED]]`
- `[[S6_M_LABEL]]`
- `[[S6_M_LABEL_1]]`
- `[[S6_M_LABEL_2]]`
- `[[S6_M_LABEL_3]]`
- `[[S6_M_LABEL_4]]`
- `[[S6_M_TEXT_1]]`
- `[[S6_M_TEXT_2]]`
- `[[S6_M_TEXT_3]]`
- `[[S6_M_TEXT_4]]`
- `[[S6_PUBLISHED]]`
- `[[S6_QUOTE]]`
- `[[S6_QUOTE_ATTRIBUTION]]`
- `[[S6_SOURCE_LABEL_1]]`
- `[[S6_SOURCE_LABEL_2]]`
- `[[S6_SOURCE_NOTE_1]]`
- `[[S6_SOURCE_NOTE_2]]`
- `[[S6_SOURCE_URL_1]]`
- `[[S6_SOURCE_URL_2]]`
- `[[S6_STATUS]]`
- `[[S6_SUMMARY]]`
- `[[S6_TABLE_CAPTION]]`
- `[[S6_TABLE_CELL_1_1]]`
- `[[S6_TABLE_CELL_1_2]]`
- `[[S6_TABLE_CELL_2_1]]`
- `[[S6_TABLE_CELL_2_2]]`
- `[[S6_TABLE_CELL_3_1]]`
- `[[S6_TABLE_CELL_3_2]]`
- `[[S6_TABLE_COL_1]]`
- `[[S6_TABLE_COL_2]]`
- `[[S6_TABLE_COL_3]]`
- `[[S6_TABLE_ROW_1]]`
- `[[S6_TABLE_ROW_2]]`
- `[[S6_TABLE_ROW_3]]`
- `[[S6_TEXT_1]]`
- `[[S6_TEXT_2]]`
- `[[S6_TEXT_3]]`
- `[[S6_TITLE]]`
- `[[S7_CHECKED]]`
- `[[S7_COVER_ALT]]`
- `[[S7_COVER_CAPTION]]`
- `[[S7_DESC]]`
- `[[S7_END_TEXT]]`
- `[[S7_END_TITLE]]`
- `[[S7_FAQ_A1]]`
- `[[S7_FAQ_A2]]`
- `[[S7_FAQ_Q1]]`
- `[[S7_FAQ_Q2]]`
- `[[S7_H2_1]]`
- `[[S7_H2_2]]`
- `[[S7_H2_3]]`
- `[[S7_H2_4]]`
- `[[S7_H2_5]]`
- `[[S7_INTRO]]`
- `[[S7_MODIFIED]]`
- `[[S7_M_LABEL]]`
- `[[S7_M_LABEL_1]]`
- `[[S7_M_LABEL_2]]`
- `[[S7_M_LABEL_3]]`
- `[[S7_M_LABEL_4]]`
- `[[S7_M_TEXT_1]]`
- `[[S7_M_TEXT_2]]`
- `[[S7_M_TEXT_3]]`
- `[[S7_M_TEXT_4]]`
- `[[S7_PUBLISHED]]`
- `[[S7_QUOTE]]`
- `[[S7_QUOTE_ATTRIBUTION]]`
- `[[S7_RSS_DATE]]`
- `[[S7_SOURCE_LABEL_1]]`
- `[[S7_SOURCE_LABEL_2]]`
- `[[S7_SOURCE_NOTE_1]]`
- `[[S7_SOURCE_NOTE_2]]`
- `[[S7_SOURCE_URL_1]]`
- `[[S7_SOURCE_URL_2]]`
- `[[S7_STATUS]]`
- `[[S7_SUMMARY]]`
- `[[S7_TABLE_CAPTION]]`
- `[[S7_TABLE_CELL_1_1]]`
- `[[S7_TABLE_CELL_1_2]]`
- `[[S7_TABLE_CELL_2_1]]`
- `[[S7_TABLE_CELL_2_2]]`
- `[[S7_TABLE_CELL_3_1]]`
- `[[S7_TABLE_CELL_3_2]]`
- `[[S7_TABLE_COL_1]]`
- `[[S7_TABLE_COL_2]]`
- `[[S7_TABLE_COL_3]]`
- `[[S7_TABLE_ROW_1]]`
- `[[S7_TABLE_ROW_2]]`
- `[[S7_TABLE_ROW_3]]`
- `[[S7_TEXT_1]]`
- `[[S7_TEXT_2]]`
- `[[S7_TEXT_3]]`
- `[[S7_TEXT_4]]`
- `[[S7_TEXT_5]]`
- `[[S7_TITLE]]`
- `[[S8_CHECKED]]`
- `[[S8_COVER_ALT]]`
- `[[S8_COVER_CAPTION]]`
- `[[S8_DESC]]`
- `[[S8_END_TEXT]]`
- `[[S8_END_TITLE]]`
- `[[S8_FAQ_A1]]`
- `[[S8_FAQ_A2]]`
- `[[S8_FAQ_A3]]`
- `[[S8_FAQ_A4]]`
- `[[S8_FAQ_Q1]]`
- `[[S8_FAQ_Q2]]`
- `[[S8_FAQ_Q3]]`
- `[[S8_FAQ_Q4]]`
- `[[S8_H2_1]]`
- `[[S8_H2_2]]`
- `[[S8_H2_3]]`
- `[[S8_H2_4]]`
- `[[S8_INTRO]]`
- `[[S8_MODIFIED]]`
- `[[S8_M_LABEL]]`
- `[[S8_M_LABEL_1]]`
- `[[S8_M_LABEL_2]]`
- `[[S8_M_TEXT]]`
- `[[S8_M_TEXT_1]]`
- `[[S8_M_TEXT_2]]`
- `[[S8_PUBLISHED]]`
- `[[S8_QUOTE]]`
- `[[S8_QUOTE_ATTRIBUTION]]`
- `[[S8_RSS_DATE]]`
- `[[S8_SOURCE_LABEL_1]]`
- `[[S8_SOURCE_LABEL_2]]`
- `[[S8_SOURCE_NOTE_1]]`
- `[[S8_SOURCE_NOTE_2]]`
- `[[S8_SOURCE_URL_1]]`
- `[[S8_SOURCE_URL_2]]`
- `[[S8_STATUS]]`
- `[[S8_SUMMARY]]`
- `[[S8_TABLE_CAPTION]]`
- `[[S8_TABLE_CELL_1_1]]`
- `[[S8_TABLE_CELL_1_2]]`
- `[[S8_TABLE_CELL_2_1]]`
- `[[S8_TABLE_CELL_2_2]]`
- `[[S8_TABLE_CELL_3_1]]`
- `[[S8_TABLE_CELL_3_2]]`
- `[[S8_TABLE_COL_1]]`
- `[[S8_TABLE_COL_2]]`
- `[[S8_TABLE_COL_3]]`
- `[[S8_TABLE_ROW_1]]`
- `[[S8_TABLE_ROW_2]]`
- `[[S8_TABLE_ROW_3]]`
- `[[S8_TEXT_1]]`
- `[[S8_TEXT_2]]`
- `[[S8_TEXT_3]]`
- `[[S8_TEXT_4]]`
- `[[S8_TITLE]]`
- `[[S9_CHECKED]]`
- `[[S9_COVER_ALT]]`
- `[[S9_COVER_CAPTION]]`
- `[[S9_DESC]]`
- `[[S9_END_TEXT]]`
- `[[S9_END_TITLE]]`
- `[[S9_FAQ_A1]]`
- `[[S9_FAQ_A2]]`
- `[[S9_FAQ_A3]]`
- `[[S9_FAQ_Q1]]`
- `[[S9_FAQ_Q2]]`
- `[[S9_FAQ_Q3]]`
- `[[S9_H2_1]]`
- `[[S9_H2_2]]`
- `[[S9_H2_3]]`
- `[[S9_INTRO]]`
- `[[S9_MODIFIED]]`
- `[[S9_M_LABEL_1]]`
- `[[S9_M_LABEL_2]]`
- `[[S9_M_LABEL_3]]`
- `[[S9_M_TEXT_1]]`
- `[[S9_M_TEXT_2]]`
- `[[S9_M_TEXT_3]]`
- `[[S9_PUBLISHED]]`
- `[[S9_QUOTE]]`
- `[[S9_QUOTE_ATTRIBUTION]]`
- `[[S9_RSS_DATE]]`
- `[[S9_SOURCE_LABEL_1]]`
- `[[S9_SOURCE_LABEL_2]]`
- `[[S9_SOURCE_NOTE_1]]`
- `[[S9_SOURCE_NOTE_2]]`
- `[[S9_SOURCE_URL_1]]`
- `[[S9_SOURCE_URL_2]]`
- `[[S9_STATUS]]`
- `[[S9_SUMMARY]]`
- `[[S9_TABLE_CAPTION]]`
- `[[S9_TABLE_CELL_1_1]]`
- `[[S9_TABLE_CELL_1_2]]`
- `[[S9_TABLE_CELL_2_1]]`
- `[[S9_TABLE_CELL_2_2]]`
- `[[S9_TABLE_CELL_3_1]]`
- `[[S9_TABLE_CELL_3_2]]`
- `[[S9_TABLE_COL_1]]`
- `[[S9_TABLE_COL_2]]`
- `[[S9_TABLE_COL_3]]`
- `[[S9_TABLE_ROW_1]]`
- `[[S9_TABLE_ROW_2]]`
- `[[S9_TABLE_ROW_3]]`
- `[[S9_TEXT_1]]`
- `[[S9_TEXT_2]]`
- `[[S9_TEXT_3]]`
- `[[S9_TITLE]]`
- `[[SECURITY_EMAIL]]`
- `[[SECURITY_EXPIRES]]`
- `[[SEO_TITLE]]`
- `[[SITE_DESC]]`
- `[[SITE_DOMAIN]]`
- `[[SITE_NAME]]`
- `[[SITE_TAGLINE]]`
- `[[SPOTLIGHT_LABEL]]`
- `[[WORKSHOP_DESC]]`
- `[[WORKSHOP_INTRO]]`

## 验收记录

2026-09-04 · workflow-ready v2 完整框架验收通过，仅代表模板 UI 与功能就绪。

- 84 个文件、34 个 HTML（30 个可索引页、独立 404、3 个 noindex 兼容入口）；三项静态审计通过，P0/P1/P2 均为 0。
- 保留原 assets/poster.css 的全部字节与首页原有 14 个类名；延续紫罗兰帷幕、金色聚光、角色票根及节目表。三种节目单开场、十二舞台组件、三幕各四篇、七页站务与五工具完整。
- 1440/768/390/360px × 明暗主题 × 34 页，共 272 次最终渲染；557 项功能、算法与边界检查，零失败、零控制台与网络错误。浏览器脚本：`tools/qa/059-violet-playbill-browser.js`；本地证据：`artifacts/qa/059-violet-playbill-v2-2026-09-04/`。
- 逐行对照覆盖 49 组集合对照、50 项/200 码点/6000 字符上限、NFKC、大小写、原序、换行与控制字符；场次编排覆盖 40 场上限、零间隔、无末尾间隔、多日越界，并以独立整数秒算术验证每段及合计。
- 角色匹配覆盖重分配、Hall 缺额、空关系、12×12/72 边上限与 12 组随机图，以独立穷举对照最大数量并核对配对有效性和唯一性。Luhn 覆盖已知号码、失败校验、前导零、全角数字、长度边界及单位置换，以另一方向的奇偶表算法复验。组合枚举覆盖 1/1、5/1、5/3、6/6、8/4、12/6，用独立位掩码集合验证数量、内容和次序，最大 924 组。
- 首屏真复制、主题持久化、菜单焦点与 Escape、首页/文章目录组合筛选与清空、三种原生目录、唯一推广 UI 槽位与邻近披露、404 三态及深层真实 404、无 JS 阅读/导航/目录及禁用提交、原生粘贴与 Enter/Tab、复制拒绝和异步旧结果失效、reduced-motion、阅读进度及明暗原生控件配色通过。
- 人工复核首页、节目目录、三种开场、全部十二组件、五工具输入和输出、封面、移动表格与暗色错误。奶油阅读纸面保持独立高对比配色；完成纸面焦点环与浅色角色卡悬停对比度修正后，首轮完整浏览器审计全部通过。
- 770 个文字/变量槽位已登记，34 块 JSON-LD 可解析，106 个页内锚点有效，12 张 PNG 封面内容互异；所有本地发布资源存在，敏感信息扫描通过。
- 与相邻 058 的类名重合 2.1%、DOM 标签二元组 29.2%、CSS 属性序列 29.6%；全库类名最高 9.1%，只有历史两组 CSS 参考警告。这些是差异检查指标，不是不可识别的保证。
- 原始动态源包忠实度未核验，单独记录而不冒充复刻证明。填入真实内容后仍须执行单站事实、合规与发布审计；本套不代写业务文章或注册教程，未触发 CI、未部署。
