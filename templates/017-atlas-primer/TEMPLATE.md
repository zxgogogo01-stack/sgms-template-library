# 017-atlas-primer

## 定位

一册可展开的高端野外图集：沙色绘图纸、靛蓝制图墨、朱红定位针、黄铜坐标与折页阴影。首页采用整张折叠地图而不是侧栏仪表盘或报纸结构；移动端收成纵向旅行图册。

## 后续 AI 只填文字

31 条公开页面、12 种课页结构、3 个图集分区、5 件真实本地测绘工具、7 个合规页面、12 对独立封面、社交图、SEO 头部与交互均已搭好。后续 AI 只替换变量并填写经核实的文字，不改路径、class、CSS、JS、导航或工具算法。

1. 先统一填写站名、域名、罗马字品牌、邀请码、弹性利益点与政策脚注、作者、日期和联系邮箱。
2. 12 篇依次采用入门航图、等高线札记、比例尺推演、图例拆解、方位日志、路线裁决、符号辨误、野外事件簿、双图对读、行前清单、地形词典与季节路线图；不要压回同一种文章排法。
3. `lessons/entry-chart.html` 是唯一 registrationGuide 与唯一 `%AFFILIATE_URL%` 链接槽位，只提供 UI 与变量框架，不包含可发布的注册教程正文。
4. 首页为形态 A：邀请码明文、复制真功能、弹性利益点、政策脚注和一处策展式课页入口，首页无平台直链。
5. 五件工具在浏览器本地处理方位、比例尺、坡度、坐标中点和行程步速；不得描述成实时导航、官方接口或联网数据。
6. 文章封面替换时保持同名 PNG/WebP、1200×630、无图中文字，并保留 preload、alt、尺寸与 fetchpriority。

## 页面角色表

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "article.html",
  "articles": [
    "lessons/entry-chart.html",
    "lessons/contour-reading.html",
    "lessons/distance-scale.html",
    "lessons/legend-decoder.html",
    "lessons/bearing-notebook.html",
    "lessons/route-decision.html",
    "lessons/symbol-myths.html",
    "lessons/field-incident.html",
    "lessons/map-comparison.html",
    "lessons/packing-sequence.html",
    "lessons/terrain-glossary.html",
    "lessons/seasonal-route.html"
  ],
  "cornerstones": [
    "lessons/entry-chart.html",
    "lessons/contour-reading.html"
  ],
  "registrationGuide": "lessons/entry-chart.html",
  "articleCovers": {
    "lessons/entry-chart.html": {
      "display": "assets/covers/entry-chart.webp",
      "og": "assets/covers/entry-chart.png"
    },
    "lessons/contour-reading.html": {
      "display": "assets/covers/contour-reading.webp",
      "og": "assets/covers/contour-reading.png"
    },
    "lessons/distance-scale.html": {
      "display": "assets/covers/distance-scale.webp",
      "og": "assets/covers/distance-scale.png"
    },
    "lessons/legend-decoder.html": {
      "display": "assets/covers/legend-decoder.webp",
      "og": "assets/covers/legend-decoder.png"
    },
    "lessons/bearing-notebook.html": {
      "display": "assets/covers/bearing-notebook.webp",
      "og": "assets/covers/bearing-notebook.png"
    },
    "lessons/route-decision.html": {
      "display": "assets/covers/route-decision.webp",
      "og": "assets/covers/route-decision.png"
    },
    "lessons/symbol-myths.html": {
      "display": "assets/covers/symbol-myths.webp",
      "og": "assets/covers/symbol-myths.png"
    },
    "lessons/field-incident.html": {
      "display": "assets/covers/field-incident.webp",
      "og": "assets/covers/field-incident.png"
    },
    "lessons/map-comparison.html": {
      "display": "assets/covers/map-comparison.webp",
      "og": "assets/covers/map-comparison.png"
    },
    "lessons/packing-sequence.html": {
      "display": "assets/covers/packing-sequence.webp",
      "og": "assets/covers/packing-sequence.png"
    },
    "lessons/terrain-glossary.html": {
      "display": "assets/covers/terrain-glossary.webp",
      "og": "assets/covers/terrain-glossary.png"
    },
    "lessons/seasonal-route.html": {
      "display": "assets/covers/seasonal-route.webp",
      "og": "assets/covers/seasonal-route.png"
    }
  },
  "categories": [
    {
      "path": "regions/orientation-foundations.html",
      "label": "%REGION_A_TITLE%",
      "articles": [
        "lessons/entry-chart.html",
        "lessons/contour-reading.html",
        "lessons/distance-scale.html",
        "lessons/legend-decoder.html"
      ]
    },
    {
      "path": "regions/map-language.html",
      "label": "%REGION_B_TITLE%",
      "articles": [
        "lessons/bearing-notebook.html",
        "lessons/route-decision.html",
        "lessons/symbol-myths.html",
        "lessons/field-incident.html"
      ]
    },
    {
      "path": "regions/field-decisions.html",
      "label": "%REGION_C_TITLE%",
      "articles": [
        "lessons/map-comparison.html",
        "lessons/packing-sequence.html",
        "lessons/terrain-glossary.html",
        "lessons/seasonal-route.html"
      ]
    }
  ],
  "toolIndex": "tool.html",
  "tools": [
    "instruments/bearing-rose.html",
    "instruments/scale-distance.html",
    "instruments/slope-reader.html",
    "instruments/coordinate-midpoint.html",
    "instruments/pace-estimator.html"
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

- 31 页在桌面、390px、360px 共 93 次浏览器巡检。
- 首页复制与主题、五工具正常/错误/边界/重置/复制、唯一推广槽位属性、404、坏图、横向溢出、触控尺寸与控制台全部实测。
- 下游 AI 负责经查证的文章事实与文字，不需要再设计通用 UI 或工具逻辑。

## 完整变量清单

| 变量 | 用途 |
|---|---|
| `%ABOUT_BODY_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%ABOUT_BODY_02%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%ABOUT_BODY_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%ABOUT_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%ABOUT_H2_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%ABOUT_H2_02%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%ABOUT_H2_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%ABOUT_META_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%ABOUT_META_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%ABOUT_NOTE_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%ABOUT_NOTE_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%ABOUT_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%AFFILIATE_DISCLOSURE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%AFFILIATE_URL%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%ARTICLE_INDEX_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%ARTICLE_INDEX_META_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%ARTICLE_INDEX_META_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%ARTICLE_INDEX_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%AUTHOR_NAME%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%BENEFIT_DISCLAIMER%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%BENEFIT_RATE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%BRAND_EN%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%CATALOG_NOTE_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%CATALOG_NOTE_LINK%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%CATALOG_NOTE_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%CONTACT_BODY_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%CONTACT_BODY_02%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%CONTACT_BODY_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%CONTACT_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%CONTACT_EMAIL%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%CONTACT_H2_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%CONTACT_H2_02%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%CONTACT_H2_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%CONTACT_META_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%CONTACT_META_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%CONTACT_NOTE_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%CONTACT_NOTE_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%CONTACT_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%CORRECTIONS_BODY_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%CORRECTIONS_BODY_02%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%CORRECTIONS_BODY_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%CORRECTIONS_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%CORRECTIONS_H2_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%CORRECTIONS_H2_02%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%CORRECTIONS_H2_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%CORRECTIONS_META_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%CORRECTIONS_META_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%CORRECTIONS_NOTE_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%CORRECTIONS_NOTE_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%CORRECTIONS_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%CURRENT_YEAR%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%DATE_MODIFIED%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%DATE_PUBLISHED%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%DISCLAIMER_BODY_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%DISCLAIMER_BODY_02%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%DISCLAIMER_BODY_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%DISCLAIMER_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%DISCLAIMER_H2_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%DISCLAIMER_H2_02%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%DISCLAIMER_H2_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%DISCLAIMER_META_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%DISCLAIMER_META_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%DISCLAIMER_NOTE_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%DISCLAIMER_NOTE_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%DISCLAIMER_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%DISCLOSURE_BODY_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%DISCLOSURE_BODY_02%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%DISCLOSURE_BODY_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%DISCLOSURE_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%DISCLOSURE_H2_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%DISCLOSURE_H2_02%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%DISCLOSURE_H2_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%DISCLOSURE_META_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%DISCLOSURE_META_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%DISCLOSURE_NOTE_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%DISCLOSURE_NOTE_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%DISCLOSURE_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%EDITORIAL_BODY_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%EDITORIAL_BODY_02%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%EDITORIAL_BODY_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%EDITORIAL_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%EDITORIAL_H2_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%EDITORIAL_H2_02%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%EDITORIAL_H2_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%EDITORIAL_META_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%EDITORIAL_META_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%EDITORIAL_NOTE_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%EDITORIAL_NOTE_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%EDITORIAL_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%HERO_COORD_01_LABEL%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%HERO_COORD_01_VALUE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%HERO_COORD_02_LABEL%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%HERO_COORD_02_VALUE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%HERO_MAP_LABEL%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%HOME_H1%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%HOME_INDEX_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%HOME_INDEX_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%HOME_LEDE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%HOME_META_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%HOME_META_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%HOME_PICK_LABEL%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%HOME_PICK_NOTE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%HOME_ROUTE_ALL_LABEL%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%HOME_ROUTE_CAPTION%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%HOME_ROUTE_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%HOME_ROUTE_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%HOME_TOOLS_LINK%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%HOME_TOOLS_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%INVITE_CODE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%JURISDICTION_NOTICE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LANG%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_01_ANSWER%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_01_CAPTION%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_01_COVER_ALT%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_01_CTA_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_01_CTA_LABEL%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_01_CTA_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_01_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_01_FAQ_A1%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_01_FAQ_A2%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_01_FAQ_Q1%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_01_FAQ_Q2%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_01_FAQ_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_01_FEED_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_01_H2_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_01_H2_02%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_01_H2_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_01_KICKER%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_01_QUICK_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_01_QUICK_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_01_RELAY_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_01_RELAY_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_01_SECTION_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_01_SECTION_02%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_01_SECTION_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_01_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_02_CAPTION%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_02_COVER_ALT%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_02_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_02_FEED_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_02_H2_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_02_H2_02%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_02_H2_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_02_H2_04%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_02_KICKER%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_02_LEVEL_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_02_LEVEL_02%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_02_LEVEL_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_02_QUOTE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_02_RELAY_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_02_RELAY_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_02_SECTION_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_02_SECTION_02%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_02_SECTION_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_02_SECTION_04%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_02_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_03_ANSWER%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_03_CAPTION%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_03_COVER_ALT%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_03_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_03_DETAIL_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_03_FEED_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_03_GROUND_LABEL%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_03_GROUND_VALUE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_03_H2_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_03_H2_02%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_03_H2_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_03_H3_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_03_KICKER%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_03_MAP_LABEL%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_03_MAP_VALUE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_03_RATIO_LABEL%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_03_RATIO_VALUE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_03_RELAY_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_03_RELAY_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_03_SECTION_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_03_SECTION_02%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_03_SECTION_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_03_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_04_ANSWER%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_04_CAPTION%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_04_COVER_ALT%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_04_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_04_FEED_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_04_ITEM_01_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_04_ITEM_01_NOTE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_04_ITEM_01_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_04_ITEM_02_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_04_ITEM_02_NOTE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_04_ITEM_02_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_04_ITEM_03_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_04_ITEM_03_NOTE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_04_ITEM_03_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_04_ITEM_04_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_04_ITEM_04_NOTE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_04_ITEM_04_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_04_KEY_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_04_KEY_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_04_KICKER%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_04_RELAY_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_04_RELAY_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_04_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_05_ANSWER%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_05_BEARING_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_05_BEARING_02%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_05_BEARING_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_05_BEARING_04%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_05_CAPTION%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_05_COVER_ALT%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_05_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_05_FEED_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_05_H2_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_05_H2_02%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_05_H2_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_05_H2_04%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_05_KICKER%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_05_RELAY_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_05_RELAY_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_05_SECTION_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_05_SECTION_02%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_05_SECTION_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_05_SECTION_04%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_05_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_06_ANSWER%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_06_CAPTION%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_06_COVER_ALT%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_06_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_06_FEED_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_06_KICKER%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_06_QUESTION%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_06_RELAY_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_06_RELAY_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_06_ROUTE_A_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_06_ROUTE_A_LABEL%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_06_ROUTE_A_POINT_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_06_ROUTE_A_POINT_02%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_06_ROUTE_A_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_06_ROUTE_B_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_06_ROUTE_B_LABEL%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_06_ROUTE_B_POINT_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_06_ROUTE_B_POINT_02%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_06_ROUTE_B_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_06_RULING_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_06_RULING_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_06_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_07_CAPTION%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_07_CLAIM_01_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_07_CLAIM_01_LABEL%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_07_CLAIM_01_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_07_CLAIM_01_VERDICT%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_07_CLAIM_02_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_07_CLAIM_02_LABEL%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_07_CLAIM_02_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_07_CLAIM_02_VERDICT%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_07_CLAIM_03_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_07_CLAIM_03_LABEL%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_07_CLAIM_03_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_07_CLAIM_03_VERDICT%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_07_COVER_ALT%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_07_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_07_FEED_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_07_KICKER%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_07_METER_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_07_METER_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_07_RELAY_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_07_RELAY_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_07_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_08_AFTER_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_08_AFTER_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_08_ANSWER%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_08_CAPTION%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_08_COVER_ALT%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_08_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_08_FEED_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_08_H2_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_08_H2_02%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_08_H2_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_08_KICKER%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_08_LOC_LABEL%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_08_LOC_VALUE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_08_RELAY_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_08_RELAY_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_08_SECTION_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_08_SECTION_02%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_08_SECTION_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_08_STATE_LABEL%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_08_STATE_VALUE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_08_TIME_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_08_TIME_02%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_08_TIME_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_08_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_09_ANSWER%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_09_CAPTION%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_09_COVER_ALT%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_09_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_09_FEED_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_09_H2_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_09_KICKER%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_09_LEFT_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_09_LEFT_K1%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_09_LEFT_K2%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_09_LEFT_LABEL%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_09_LEFT_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_09_LEFT_V1%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_09_LEFT_V2%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_09_QUESTION%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_09_RELAY_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_09_RELAY_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_09_RIGHT_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_09_RIGHT_K1%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_09_RIGHT_K2%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_09_RIGHT_LABEL%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_09_RIGHT_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_09_RIGHT_V1%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_09_RIGHT_V2%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_09_SECTION_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_09_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_10_ANSWER%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_10_CAPTION%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_10_COVER_ALT%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_10_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_10_FEED_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_10_ITEM_01_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_10_ITEM_01_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_10_ITEM_02_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_10_ITEM_02_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_10_ITEM_03_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_10_ITEM_03_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_10_ITEM_04_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_10_ITEM_04_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_10_ITEM_05_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_10_ITEM_05_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_10_KICKER%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_10_KIT_NOTE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_10_RELAY_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_10_RELAY_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_10_RESULT_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_10_RESULT_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_10_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_11_CAPTION%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_11_CAUTION%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_11_COVER_ALT%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_11_DEF_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_11_DEF_02%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_11_DEF_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_11_DEF_04%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_11_DEF_05%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_11_DEF_06%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_11_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_11_FEED_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_11_H2_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_11_KICKER%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_11_NOTE_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_11_NOTE_02%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_11_NOTE_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_11_NOTE_04%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_11_NOTE_05%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_11_NOTE_06%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_11_RELAY_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_11_RELAY_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_11_SECTION_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_11_TERM_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_11_TERM_02%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_11_TERM_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_11_TERM_04%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_11_TERM_05%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_11_TERM_06%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_11_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_12_ANSWER%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_12_CAPTION%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_12_COVER_ALT%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_12_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_12_H2_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_12_KICKER%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_12_QUESTION%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_12_RELAY_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_12_RELAY_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_12_SEASON_01_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_12_SEASON_01_LABEL%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_12_SEASON_01_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_12_SEASON_02_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_12_SEASON_02_LABEL%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_12_SEASON_02_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_12_SEASON_03_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_12_SEASON_03_LABEL%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_12_SEASON_03_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_12_SEASON_04_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_12_SEASON_04_LABEL%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_12_SEASON_04_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_12_SECTION_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_12_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%LESSON_12_WATCH_NOTE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%NOT_FOUND_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%NOT_FOUND_META_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%NOT_FOUND_META_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%NOT_FOUND_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%PRIVACY_BODY_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%PRIVACY_BODY_02%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%PRIVACY_BODY_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%PRIVACY_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%PRIVACY_H2_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%PRIVACY_H2_02%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%PRIVACY_H2_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%PRIVACY_META_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%PRIVACY_META_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%PRIVACY_NOTE_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%PRIVACY_NOTE_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%PRIVACY_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%READING_LABEL%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%REGION_A_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%REGION_A_META_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%REGION_A_META_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%REGION_A_NOTE_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%REGION_A_NOTE_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%REGION_A_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%REGION_BACK_LABEL%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%REGION_B_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%REGION_B_META_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%REGION_B_META_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%REGION_B_NOTE_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%REGION_B_NOTE_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%REGION_B_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%REGION_C_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%REGION_C_META_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%REGION_C_META_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%REGION_C_NOTE_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%REGION_C_NOTE_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%REGION_C_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%RISK_NOTICE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%RISK_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%RSS_DATE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%RSS_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%RSS_LABEL%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%RSS_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%SECURITY_EXPIRES%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%SITE_DOMAIN%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%SITE_NAME%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_01_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_01_GUIDE_H3_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_01_GUIDE_H3_02%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_01_GUIDE_H3_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_01_GUIDE_H3_04%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_01_GUIDE_H3_05%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_01_GUIDE_P_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_01_GUIDE_P_02%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_01_GUIDE_P_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_01_GUIDE_P_04%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_01_GUIDE_P_05%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_01_GUIDE_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_01_META_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_01_META_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_01_SIDE_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_01_SIDE_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_01_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_02_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_02_GUIDE_H3_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_02_GUIDE_H3_02%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_02_GUIDE_H3_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_02_GUIDE_H3_04%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_02_GUIDE_H3_05%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_02_GUIDE_P_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_02_GUIDE_P_02%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_02_GUIDE_P_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_02_GUIDE_P_04%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_02_GUIDE_P_05%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_02_GUIDE_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_02_META_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_02_META_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_02_SIDE_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_02_SIDE_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_02_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_03_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_03_GUIDE_H3_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_03_GUIDE_H3_02%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_03_GUIDE_H3_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_03_GUIDE_H3_04%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_03_GUIDE_H3_05%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_03_GUIDE_P_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_03_GUIDE_P_02%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_03_GUIDE_P_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_03_GUIDE_P_04%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_03_GUIDE_P_05%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_03_GUIDE_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_03_META_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_03_META_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_03_SIDE_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_03_SIDE_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_03_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_04_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_04_GUIDE_H3_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_04_GUIDE_H3_02%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_04_GUIDE_H3_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_04_GUIDE_H3_04%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_04_GUIDE_H3_05%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_04_GUIDE_P_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_04_GUIDE_P_02%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_04_GUIDE_P_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_04_GUIDE_P_04%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_04_GUIDE_P_05%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_04_GUIDE_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_04_META_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_04_META_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_04_SIDE_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_04_SIDE_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_04_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_05_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_05_GUIDE_H3_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_05_GUIDE_H3_02%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_05_GUIDE_H3_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_05_GUIDE_H3_04%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_05_GUIDE_H3_05%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_05_GUIDE_P_01%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_05_GUIDE_P_02%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_05_GUIDE_P_03%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_05_GUIDE_P_04%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_05_GUIDE_P_05%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_05_GUIDE_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_05_META_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_05_META_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_05_SIDE_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_05_SIDE_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_05_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_BOUNDARY_BODY%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_BOUNDARY_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_INDEX_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_INDEX_META_DESC%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_INDEX_META_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
| `%TOOL_INDEX_TITLE%` | 填写对应页面的站点信息、文字、事实或日期 |
