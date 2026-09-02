# 016-gleam-tracker

## 定位

一座以暗室、光谱与精密测量为视觉语言的高端指标观测台。侧向校准脊柱、棱镜光束、荧光读数与黑曜石工作面组成独立系统；它不是新闻报纸、SaaS 卡片墙或传统博客。

## 后续 AI 只填文字

31 条公开页面、12 种文章结构、3 个观察范围、5 件真实本地仪器、7 个合规页面、12 对独立封面、社交图、SEO 头部与交互已全部接好。后续 AI 只替换变量并填写经核实的文字，不改路径、class、CSS、JS、导航结构或工具算法。

1. 统一填写站名、域名、罗马字品牌、邀请码、弹性利益点与政策脚注、作者、日期、联系邮箱。
2. 12 篇依次使用基线接入、基准拆读、来源图谱、分析对谈、节奏台账、分歧树、噪声核验、异常记录、双镜对照、核验序列、指标词表与远景扫描，保留各自结构差异。
3. `signals/access-baseline.html` 是唯一 registrationGuide，也是全站唯一 `%AFFILIATE_URL%` 槽位；这里只提供完整 UI 骨架，不含可发布的注册教程正文。
4. 首页保持形态 A：邀请码明文、真复制按钮、弹性利益点、政策脚注与一处编辑推荐入口；首页没有平台直链。
5. 五件工具均在浏览器本地运行，分别处理标准分、移动平均、样本量估计、信号共识与量程映射。不得描述为实时行情、官方 API 或联网结果。
6. 替换封面时保留同名 PNG/WebP、1200×630、无图中文字，以及 preload、alt、width/height 与 fetchpriority。

## 页面角色表

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "article.html",
  "articles": [
    "signals/access-baseline.html",
    "signals/benchmark-brief.html",
    "signals/source-map.html",
    "signals/analyst-dialogue.html",
    "signals/cadence-ledger.html",
    "signals/divergence-tree.html",
    "signals/noise-myths.html",
    "signals/anomaly-record.html",
    "signals/twin-lens.html",
    "signals/verification-sequence.html",
    "signals/metric-glossary.html",
    "signals/horizon-scan.html"
  ],
  "cornerstones": [
    "signals/access-baseline.html",
    "signals/benchmark-brief.html"
  ],
  "registrationGuide": "signals/access-baseline.html",
  "articleCovers": {
    "signals/access-baseline.html": {
      "display": "assets/covers/access-baseline.webp",
      "og": "assets/covers/access-baseline.png"
    },
    "signals/benchmark-brief.html": {
      "display": "assets/covers/benchmark-brief.webp",
      "og": "assets/covers/benchmark-brief.png"
    },
    "signals/source-map.html": {
      "display": "assets/covers/source-map.webp",
      "og": "assets/covers/source-map.png"
    },
    "signals/analyst-dialogue.html": {
      "display": "assets/covers/analyst-dialogue.webp",
      "og": "assets/covers/analyst-dialogue.png"
    },
    "signals/cadence-ledger.html": {
      "display": "assets/covers/cadence-ledger.webp",
      "og": "assets/covers/cadence-ledger.png"
    },
    "signals/divergence-tree.html": {
      "display": "assets/covers/divergence-tree.webp",
      "og": "assets/covers/divergence-tree.png"
    },
    "signals/noise-myths.html": {
      "display": "assets/covers/noise-myths.webp",
      "og": "assets/covers/noise-myths.png"
    },
    "signals/anomaly-record.html": {
      "display": "assets/covers/anomaly-record.webp",
      "og": "assets/covers/anomaly-record.png"
    },
    "signals/twin-lens.html": {
      "display": "assets/covers/twin-lens.webp",
      "og": "assets/covers/twin-lens.png"
    },
    "signals/verification-sequence.html": {
      "display": "assets/covers/verification-sequence.webp",
      "og": "assets/covers/verification-sequence.png"
    },
    "signals/metric-glossary.html": {
      "display": "assets/covers/metric-glossary.webp",
      "og": "assets/covers/metric-glossary.png"
    },
    "signals/horizon-scan.html": {
      "display": "assets/covers/horizon-scan.webp",
      "og": "assets/covers/horizon-scan.png"
    }
  },
  "categories": [
    {
      "path": "ranges/instrument-basics.html",
      "label": "%RANGE_A_TITLE%",
      "articles": [
        "signals/access-baseline.html",
        "signals/benchmark-brief.html",
        "signals/source-map.html",
        "signals/analyst-dialogue.html"
      ]
    },
    {
      "path": "ranges/signal-reading.html",
      "label": "%RANGE_B_TITLE%",
      "articles": [
        "signals/cadence-ledger.html",
        "signals/divergence-tree.html",
        "signals/noise-myths.html",
        "signals/anomaly-record.html"
      ]
    },
    {
      "path": "ranges/review-discipline.html",
      "label": "%RANGE_C_TITLE%",
      "articles": [
        "signals/twin-lens.html",
        "signals/verification-sequence.html",
        "signals/metric-glossary.html",
        "signals/horizon-scan.html"
      ]
    }
  ],
  "toolIndex": "tool.html",
  "tools": [
    "instruments/z-score-bench.html",
    "instruments/moving-window.html",
    "instruments/sample-size-lens.html",
    "instruments/signal-consensus.html",
    "instruments/range-mapper.html"
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

- 31 页按桌面、390px、360px 共 93 次渲染巡检；检查首屏、坏图、溢出、触控尺寸、主题与控制台。
- 首页实点复制与主题；五工具逐一覆盖正常、错误、边界、重置、复制。
- 注册页只核验链接槽位、四项 rel、披露邻接与无 JavaScript 依赖；文章事实与正文由下游 AI 完成。

## 完整变量清单

| 变量 | 用途 |
|---|---|
| `%ABOUT_BODY_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ABOUT_BODY_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ABOUT_BODY_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ABOUT_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ABOUT_H2_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ABOUT_H2_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ABOUT_H2_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ABOUT_META_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ABOUT_META_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ABOUT_NOTE_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ABOUT_NOTE_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ABOUT_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%AFFILIATE_DISCLOSURE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%AFFILIATE_URL%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARCHIVE_NOTE_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARCHIVE_NOTE_LINK%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARCHIVE_NOTE_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_01_ANSWER%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_01_CAPTION%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_01_COVER_ALT%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_01_CTA_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_01_CTA_LABEL%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_01_CTA_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_01_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_01_FAQ_A1%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_01_FAQ_A2%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_01_FAQ_Q1%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_01_FAQ_Q2%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_01_FAQ_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_01_FEED_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_01_H2_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_01_H2_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_01_H2_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_01_KICKER%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_01_QUICK_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_01_QUICK_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_01_RELAY_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_01_RELAY_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_01_SECTION_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_01_SECTION_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_01_SECTION_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_01_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_02_ANSWER%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_02_CAPTION%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_02_COVER_ALT%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_02_DATUM_01_LABEL%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_02_DATUM_01_VALUE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_02_DATUM_02_LABEL%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_02_DATUM_02_VALUE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_02_DATUM_03_LABEL%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_02_DATUM_03_VALUE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_02_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_02_DETAIL_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_02_FEED_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_02_H2_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_02_H2_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_02_H2_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_02_H3_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_02_KICKER%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_02_QUOTE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_02_RELAY_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_02_RELAY_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_02_SECTION_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_02_SECTION_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_02_SECTION_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_02_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_03_CAPTION%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_03_COVER_ALT%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_03_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_03_FEED_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_03_H2_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_03_H2_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_03_H2_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_03_KICKER%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_03_RELAY_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_03_RELAY_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_03_SECTION_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_03_SECTION_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_03_SECTION_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_03_SOURCE_01_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_03_SOURCE_01_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_03_SOURCE_02_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_03_SOURCE_02_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_03_SOURCE_03_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_03_SOURCE_03_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_03_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_03_TRACE_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_03_TRACE_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_04_A1%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_04_A2%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_04_A3%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_04_ANSWER%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_04_CAPTION%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_04_CODA%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_04_COVER_ALT%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_04_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_04_FEED_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_04_KICKER%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_04_MARGIN_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_04_MARGIN_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_04_Q1%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_04_Q2%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_04_Q3%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_04_RELAY_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_04_RELAY_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_04_SCENE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_04_SPEAKER_A%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_04_SPEAKER_B%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_04_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_05_ANSWER%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_05_CAPTION%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_05_COVER_ALT%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_05_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_05_DETAIL_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_05_FEED_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_05_H2_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_05_H2_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_05_H2_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_05_H3_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_05_KEY_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_05_KEY_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_05_KEY_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_05_KICKER%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_05_RELAY_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_05_RELAY_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_05_SECTION_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_05_SECTION_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_05_SECTION_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_05_TIME_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_05_TIME_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_05_TIME_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_05_TIME_04%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_05_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_06_ANSWER%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_06_A_POINT_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_06_A_POINT_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_06_BRANCH_A_LABEL%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_06_BRANCH_B_LABEL%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_06_BRANCH_C_LABEL%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_06_B_POINT_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_06_B_POINT_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_06_CAPTION%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_06_COVER_ALT%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_06_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_06_EXIT_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_06_EXIT_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_06_FEED_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_06_H2_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_06_H2_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_06_H2_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_06_KICKER%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_06_QUESTION%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_06_RELAY_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_06_RELAY_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_06_SECTION_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_06_SECTION_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_06_SECTION_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_06_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_07_CAPTION%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_07_CLAIM_01_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_07_CLAIM_01_LABEL%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_07_CLAIM_01_NOTE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_07_CLAIM_01_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_07_CLAIM_02_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_07_CLAIM_02_LABEL%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_07_CLAIM_02_NOTE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_07_CLAIM_02_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_07_CLAIM_03_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_07_CLAIM_03_LABEL%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_07_CLAIM_03_NOTE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_07_CLAIM_03_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_07_COVER_ALT%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_07_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_07_FEED_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_07_KICKER%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_07_METER_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_07_METER_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_07_RELAY_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_07_RELAY_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_07_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_08_ANSWER%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_08_CAPTION%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_08_COVER_ALT%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_08_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_08_FEED_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_08_H2_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_08_H2_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_08_H2_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_08_KICKER%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_08_POST_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_08_POST_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_08_RELAY_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_08_RELAY_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_08_SECTION_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_08_SECTION_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_08_SECTION_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_08_STATUS_LABEL%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_08_STATUS_VALUE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_08_TIME_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_08_TIME_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_08_TIME_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_08_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_08_WINDOW_LABEL%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_08_WINDOW_VALUE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_09_ANSWER%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_09_CAPTION%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_09_COVER_ALT%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_09_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_09_FEED_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_09_H2_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_09_KICKER%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_09_LEFT_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_09_LEFT_K1%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_09_LEFT_K2%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_09_LEFT_LABEL%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_09_LEFT_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_09_LEFT_V1%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_09_LEFT_V2%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_09_QUESTION%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_09_RELAY_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_09_RELAY_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_09_RIGHT_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_09_RIGHT_K1%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_09_RIGHT_K2%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_09_RIGHT_LABEL%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_09_RIGHT_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_09_RIGHT_V1%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_09_RIGHT_V2%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_09_SECTION_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_09_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_10_ANSWER%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_10_CAPTION%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_10_COVER_ALT%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_10_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_10_FEED_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_10_KICKER%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_10_RELAY_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_10_RELAY_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_10_RESULT_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_10_RESULT_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_10_SEQUENCE_NOTE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_10_STEP_01_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_10_STEP_01_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_10_STEP_02_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_10_STEP_02_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_10_STEP_03_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_10_STEP_03_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_10_STEP_04_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_10_STEP_04_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_10_STEP_05_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_10_STEP_05_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_10_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_11_CAPTION%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_11_CAUTION%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_11_COVER_ALT%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_11_DEF_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_11_DEF_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_11_DEF_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_11_DEF_04%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_11_DEF_05%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_11_DEF_06%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_11_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_11_H2_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_11_KICKER%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_11_NOTE_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_11_NOTE_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_11_NOTE_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_11_NOTE_04%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_11_NOTE_05%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_11_NOTE_06%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_11_RELAY_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_11_RELAY_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_11_SECTION_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_11_TERM_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_11_TERM_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_11_TERM_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_11_TERM_04%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_11_TERM_05%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_11_TERM_06%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_11_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_12_ANSWER%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_12_CAPTION%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_12_COVER_ALT%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_12_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_12_H2_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_12_KICKER%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_12_QUESTION%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_12_RELAY_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_12_RELAY_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_12_SCENARIO_01_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_12_SCENARIO_01_LABEL%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_12_SCENARIO_01_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_12_SCENARIO_02_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_12_SCENARIO_02_LABEL%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_12_SCENARIO_02_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_12_SCENARIO_03_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_12_SCENARIO_03_LABEL%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_12_SCENARIO_03_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_12_SCENARIO_04_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_12_SCENARIO_04_LABEL%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_12_SCENARIO_04_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_12_SECTION_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_12_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_12_WATCH_NOTE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_INDEX_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_INDEX_META_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_INDEX_META_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%ARTICLE_INDEX_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%AUTHOR_NAME%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%BENEFIT_DISCLAIMER%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%BENEFIT_RATE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%BRAND_EN%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%CONTACT_BODY_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%CONTACT_BODY_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%CONTACT_BODY_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%CONTACT_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%CONTACT_EMAIL%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%CONTACT_H2_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%CONTACT_H2_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%CONTACT_H2_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%CONTACT_META_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%CONTACT_META_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%CONTACT_NOTE_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%CONTACT_NOTE_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%CONTACT_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%CORRECTIONS_BODY_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%CORRECTIONS_BODY_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%CORRECTIONS_BODY_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%CORRECTIONS_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%CORRECTIONS_H2_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%CORRECTIONS_H2_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%CORRECTIONS_H2_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%CORRECTIONS_META_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%CORRECTIONS_META_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%CORRECTIONS_NOTE_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%CORRECTIONS_NOTE_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%CORRECTIONS_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%CURRENT_YEAR%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%DATE_MODIFIED%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%DATE_PUBLISHED%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%DISCLAIMER_BODY_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%DISCLAIMER_BODY_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%DISCLAIMER_BODY_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%DISCLAIMER_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%DISCLAIMER_H2_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%DISCLAIMER_H2_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%DISCLAIMER_H2_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%DISCLAIMER_META_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%DISCLAIMER_META_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%DISCLAIMER_NOTE_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%DISCLAIMER_NOTE_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%DISCLAIMER_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%DISCLOSURE_BODY_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%DISCLOSURE_BODY_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%DISCLOSURE_BODY_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%DISCLOSURE_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%DISCLOSURE_H2_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%DISCLOSURE_H2_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%DISCLOSURE_H2_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%DISCLOSURE_META_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%DISCLOSURE_META_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%DISCLOSURE_NOTE_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%DISCLOSURE_NOTE_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%DISCLOSURE_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%EDITORIAL_BODY_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%EDITORIAL_BODY_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%EDITORIAL_BODY_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%EDITORIAL_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%EDITORIAL_H2_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%EDITORIAL_H2_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%EDITORIAL_H2_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%EDITORIAL_META_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%EDITORIAL_META_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%EDITORIAL_NOTE_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%EDITORIAL_NOTE_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%EDITORIAL_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%HERO_DATUM_01_LABEL%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%HERO_DATUM_01_VALUE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%HERO_DATUM_02_LABEL%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%HERO_DATUM_02_VALUE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%HERO_DATUM_03_LABEL%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%HERO_DATUM_03_VALUE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%HERO_VISUAL_LABEL%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%HOME_ARTICLES_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%HOME_ARTICLES_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%HOME_H1%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%HOME_INDEX_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%HOME_INDEX_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%HOME_LEDE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%HOME_META_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%HOME_META_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%HOME_PICK_LABEL%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%HOME_PICK_NOTE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%HOME_TOOLS_LINK%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%HOME_TOOLS_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%INVITE_CODE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%JURISDICTION_NOTICE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%LANG%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%NOT_FOUND_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%NOT_FOUND_META_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%NOT_FOUND_META_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%NOT_FOUND_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%PRIVACY_BODY_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%PRIVACY_BODY_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%PRIVACY_BODY_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%PRIVACY_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%PRIVACY_H2_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%PRIVACY_H2_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%PRIVACY_H2_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%PRIVACY_META_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%PRIVACY_META_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%PRIVACY_NOTE_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%PRIVACY_NOTE_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%PRIVACY_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%RANGE_A_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%RANGE_A_META_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%RANGE_A_META_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%RANGE_A_NOTE_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%RANGE_A_NOTE_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%RANGE_A_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%RANGE_BACK_LABEL%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%RANGE_B_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%RANGE_B_META_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%RANGE_B_META_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%RANGE_B_NOTE_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%RANGE_B_NOTE_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%RANGE_B_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%RANGE_C_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%RANGE_C_META_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%RANGE_C_META_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%RANGE_C_NOTE_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%RANGE_C_NOTE_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%RANGE_C_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%READING_LABEL%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%RISK_NOTICE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%RISK_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%RSS_DATE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%RSS_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%RSS_LABEL%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%RSS_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%SECURITY_EXPIRES%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%SIGNAL_01_LABEL%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%SIGNAL_01_NOTE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%SIGNAL_01_VALUE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%SIGNAL_02_LABEL%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%SIGNAL_02_NOTE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%SIGNAL_02_VALUE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%SIGNAL_03_LABEL%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%SIGNAL_03_NOTE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%SIGNAL_03_VALUE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%SIGNAL_04_LABEL%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%SIGNAL_04_NOTE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%SIGNAL_04_VALUE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%SIGNAL_BOARD_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%SIGNAL_BOARD_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%SITE_DOMAIN%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%SITE_NAME%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_01_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_01_GUIDE_H3_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_01_GUIDE_H3_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_01_GUIDE_H3_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_01_GUIDE_H3_04%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_01_GUIDE_H3_05%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_01_GUIDE_P_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_01_GUIDE_P_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_01_GUIDE_P_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_01_GUIDE_P_04%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_01_GUIDE_P_05%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_01_GUIDE_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_01_META_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_01_META_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_01_SIDE_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_01_SIDE_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_01_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_02_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_02_GUIDE_H3_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_02_GUIDE_H3_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_02_GUIDE_H3_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_02_GUIDE_H3_04%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_02_GUIDE_H3_05%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_02_GUIDE_P_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_02_GUIDE_P_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_02_GUIDE_P_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_02_GUIDE_P_04%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_02_GUIDE_P_05%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_02_GUIDE_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_02_META_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_02_META_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_02_SIDE_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_02_SIDE_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_02_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_03_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_03_GUIDE_H3_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_03_GUIDE_H3_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_03_GUIDE_H3_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_03_GUIDE_H3_04%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_03_GUIDE_H3_05%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_03_GUIDE_P_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_03_GUIDE_P_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_03_GUIDE_P_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_03_GUIDE_P_04%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_03_GUIDE_P_05%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_03_GUIDE_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_03_META_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_03_META_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_03_SIDE_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_03_SIDE_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_03_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_04_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_04_GUIDE_H3_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_04_GUIDE_H3_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_04_GUIDE_H3_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_04_GUIDE_H3_04%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_04_GUIDE_H3_05%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_04_GUIDE_P_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_04_GUIDE_P_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_04_GUIDE_P_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_04_GUIDE_P_04%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_04_GUIDE_P_05%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_04_GUIDE_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_04_META_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_04_META_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_04_SIDE_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_04_SIDE_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_04_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_05_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_05_GUIDE_H3_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_05_GUIDE_H3_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_05_GUIDE_H3_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_05_GUIDE_H3_04%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_05_GUIDE_H3_05%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_05_GUIDE_P_01%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_05_GUIDE_P_02%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_05_GUIDE_P_03%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_05_GUIDE_P_04%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_05_GUIDE_P_05%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_05_GUIDE_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_05_META_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_05_META_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_05_SIDE_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_05_SIDE_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_05_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_BOUNDARY_BODY%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_BOUNDARY_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_INDEX_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_INDEX_META_DESC%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_INDEX_META_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
| `%TOOL_INDEX_TITLE%` | 填写对应页面的文字、事实、日期或站点变量 |
