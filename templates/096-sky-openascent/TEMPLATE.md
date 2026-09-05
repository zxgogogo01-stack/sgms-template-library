# 096-sky-openascent

## 交付定位

天空海拔路线观测台的 workflow-ready v2 完整 UI 框架。后续 AI 只替换已声明变量与核实文字，不增加页面、组件、工具、资源或导航；模板不包含可直接发布的业务文章或操作教程。

## 强制使用规则

1. 保留 `ao96-` 与 `as96-` 类名、全部 `data-*` 钩子、路径、`altitude.css` 与 `routebook.js`。
2. 十二个正文外壳分别使用基线、来源、停止线、坡段、下降负荷、折返、天气窗、转身门、未知带、交接、修订和公开路线凭条组件，不互换结构。
3. 唯一 `%%AFFILIATE_URL%%` 静态链接只保留在 `notes/public-route-pass.html`；首页只展示识别码、利益点与条件脚注。
4. 五件本地飞行仪的算法、错误态、极限态、重置、复制与人工复核 Guide 已完成，后续不重写。

## 工具合同

全部工具限制 1–300 个非空行和 40,000 个 Unicode 字符，执行 NFKC，拒绝控制符与不完整 Unicode；使用 `textContent` 输出，覆盖重复、非法数字/时间/枚举、错误聚焦、重置、旧结果失效、完整复制和异步复制竞态。

## 发布前模板验收

运行三套静态审计、全库相似度检查和浏览器全页、双主题、四视口、五工具边界审计。

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "route-atlas.html",
  "articles": [
    "notes/baseline-marker.html",
    "notes/source-altimeter.html",
    "notes/stop-line.html",
    "notes/grade-break.html",
    "notes/descent-debt.html",
    "notes/switchback-note.html",
    "notes/weather-window.html",
    "notes/turnaround-trigger.html",
    "notes/uncertainty-band.html",
    "notes/waypoint-handoff.html",
    "notes/revision-route.html",
    "notes/public-route-pass.html"
  ],
  "cornerstones": [
    "notes/baseline-marker.html",
    "notes/turnaround-trigger.html"
  ],
  "registrationGuide": "notes/public-route-pass.html",
  "articleCovers": {
    "notes/baseline-marker.html": {
      "display": "assets/notes/baseline-marker.webp",
      "og": "assets/notes/baseline-marker.png"
    },
    "notes/source-altimeter.html": {
      "display": "assets/notes/source-altimeter.webp",
      "og": "assets/notes/source-altimeter.png"
    },
    "notes/stop-line.html": {
      "display": "assets/notes/stop-line.webp",
      "og": "assets/notes/stop-line.png"
    },
    "notes/grade-break.html": {
      "display": "assets/notes/grade-break.webp",
      "og": "assets/notes/grade-break.png"
    },
    "notes/descent-debt.html": {
      "display": "assets/notes/descent-debt.webp",
      "og": "assets/notes/descent-debt.png"
    },
    "notes/switchback-note.html": {
      "display": "assets/notes/switchback-note.webp",
      "og": "assets/notes/switchback-note.png"
    },
    "notes/weather-window.html": {
      "display": "assets/notes/weather-window.webp",
      "og": "assets/notes/weather-window.png"
    },
    "notes/turnaround-trigger.html": {
      "display": "assets/notes/turnaround-trigger.webp",
      "og": "assets/notes/turnaround-trigger.png"
    },
    "notes/uncertainty-band.html": {
      "display": "assets/notes/uncertainty-band.webp",
      "og": "assets/notes/uncertainty-band.png"
    },
    "notes/waypoint-handoff.html": {
      "display": "assets/notes/waypoint-handoff.webp",
      "og": "assets/notes/waypoint-handoff.png"
    },
    "notes/revision-route.html": {
      "display": "assets/notes/revision-route.webp",
      "og": "assets/notes/revision-route.png"
    },
    "notes/public-route-pass.html": {
      "display": "assets/notes/public-route-pass.webp",
      "og": "assets/notes/public-route-pass.png"
    }
  },
  "categories": [
    {
      "path": "routes/baseline-deck.html",
      "label": "基线甲板",
      "articles": [
        "notes/baseline-marker.html",
        "notes/source-altimeter.html",
        "notes/stop-line.html"
      ]
    },
    {
      "path": "routes/terrain-deck.html",
      "label": "地形甲板",
      "articles": [
        "notes/grade-break.html",
        "notes/descent-debt.html",
        "notes/switchback-note.html"
      ]
    },
    {
      "path": "routes/decision-deck.html",
      "label": "决策甲板",
      "articles": [
        "notes/weather-window.html",
        "notes/turnaround-trigger.html",
        "notes/uncertainty-band.html"
      ]
    },
    {
      "path": "routes/handoff-deck.html",
      "label": "交接甲板",
      "articles": [
        "notes/waypoint-handoff.html",
        "notes/revision-route.html",
        "notes/public-route-pass.html"
      ]
    }
  ],
  "toolIndex": "flight-instruments.html",
  "tools": [
    "instruments/elevation-ledger.html",
    "instruments/segment-gradient.html",
    "instruments/checkpoint-window.html",
    "instruments/route-order.html",
    "instruments/handoff-gates.html"
  ],
  "legal": {
    "about": "about-observatory.html",
    "contact": "contact-route.html",
    "disclosure": "relationship-disclosure.html",
    "disclaimer": "route-boundary.html",
    "privacy": "privacy-altitude.html",
    "corrections": "correction-log.html",
    "editorial": "editorial-flightplan.html"
  },
  "error404": "404.html",
  "robots": "robots.txt",
  "sitemap": "sitemap.xml",
  "feed": "feed.xml",
  "security": ".well-known/security.txt",
  "favicon": "favicon.ico",
  "appleTouchIcon": "apple-touch-icon.png",
  "socialImage": "assets/ascent-social.png",
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

## 完整变量登记

- `%%ACCESS_CTA%%`
- `%%ACCESS_TITLE%%`
- `%%AFFILIATE_DISCLOSURE%%`
- `%%AFFILIATE_URL%%`
- `%%ARTICLE_ACCENT%%`
- `%%ARTICLE_DESC%%`
- `%%ARTICLE_HANDOFF%%`
- `%%ARTICLE_LEAD%%`
- `%%ARTICLE_TITLE%%`
- `%%BENEFIT_DISCLAIMER%%`
- `%%BENEFIT_RATE%%`
- `%%BRAND_EN%%`
- `%%CARD_01_DESC%%`
- `%%CARD_01_TITLE%%`
- `%%CARD_02_DESC%%`
- `%%CARD_02_TITLE%%`
- `%%CARD_03_DESC%%`
- `%%CARD_03_TITLE%%`
- `%%CARD_04_DESC%%`
- `%%CARD_04_TITLE%%`
- `%%CARD_05_DESC%%`
- `%%CARD_05_TITLE%%`
- `%%CARD_06_DESC%%`
- `%%CARD_06_TITLE%%`
- `%%CARD_07_DESC%%`
- `%%CARD_07_TITLE%%`
- `%%CARD_08_DESC%%`
- `%%CARD_08_TITLE%%`
- `%%CARD_09_DESC%%`
- `%%CARD_09_TITLE%%`
- `%%CARD_10_DESC%%`
- `%%CARD_10_TITLE%%`
- `%%CARD_11_DESC%%`
- `%%CARD_11_TITLE%%`
- `%%CARD_12_DESC%%`
- `%%CARD_12_TITLE%%`
- `%%CHANGELOG_DESC%%`
- `%%CHANGE_REASON%%`
- `%%CONTACT_EMAIL%%`
- `%%COVER_ALT%%`
- `%%COVER_CAPTION%%`
- `%%DECK_ACCENT%%`
- `%%DECK_DESC%%`
- `%%DECK_TITLE%%`
- `%%FAQ_1_ANSWER%%`
- `%%FAQ_1_QUESTION%%`
- `%%FAQ_2_ANSWER%%`
- `%%FAQ_2_QUESTION%%`
- `%%HERO_ACCENT%%`
- `%%HERO_DESC%%`
- `%%HERO_TITLE%%`
- `%%INVITE_CODE%%`
- `%%LANG%%`
- `%%MODIFIED_ISO%%`
- `%%MODIFIED_LABEL%%`
- `%%MODULE_ITEM_1_TEXT%%`
- `%%MODULE_ITEM_2_TEXT%%`
- `%%MODULE_ITEM_3_TEXT%%`
- `%%MODULE_ITEM_4_TEXT%%`
- `%%MODULE_TITLE%%`
- `%%NEW_STATEMENT%%`
- `%%NEXT_REVIEW_DATE%%`
- `%%NEXT_REVIEW_TITLE%%`
- `%%OLD_STATEMENT%%`
- `%%PUBLIC_FOOTNOTE%%`
- `%%PUBLIC_OWNER%%`
- `%%PUBLIC_SECTION_1_BODY%%`
- `%%PUBLIC_SECTION_2_BODY%%`
- `%%PUBLIC_SECTION_3_BODY%%`
- `%%READ_TIME%%`
- `%%REVIEW_DATE%%`
- `%%SECTION_1_BODY%%`
- `%%SECTION_1_TITLE%%`
- `%%SECTION_2_BODY%%`
- `%%SECTION_2_TITLE%%`
- `%%SECTION_3_BODY%%`
- `%%SECTION_3_TITLE%%`
- `%%SECTION_4_BODY%%`
- `%%SECTION_4_TITLE%%`
- `%%SECURITY_EXPIRES_ISO%%`
- `%%SITE_DESC%%`
- `%%SITE_DOMAIN%%`
- `%%SITE_NAME%%`
- `%%SITE_TAGLINE%%`
- `%%TOOL_GUIDE_1%%`
- `%%TOOL_GUIDE_2%%`
- `%%TOOL_GUIDE_3%%`
- `%%TOOL_GUIDE_4%%`
- `%%TOOL_GUIDE_5%%`
