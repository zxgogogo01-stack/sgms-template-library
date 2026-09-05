# 094-black-nightcorridor

## 交付定位

电影感黑色夜间值守走廊的 workflow-ready v2 完整 UI 框架。后续 AI 只替换已声明变量与核实文字，不增加页面、组件、工具、资源或导航；模板不包含可发布业务文章或注册教程。

## 强制使用规则

1. 保留 nx94- 类名、data-nx94-* 钩子、路径、nightshift.css 与 watchclock.js。
2. 十二个正文外壳分别使用 wave、seal、lantern、track、key、lock、curve、ticks、echo、aperture、revision、keycard 模块，不互换结构。
3. 唯一 AFFILIATE_URL 静态链接只保留在 records/public-keycard.html；首页只展示识别码、利益点与条件脚注。
4. 五个本地核对站的算法、错误态、极限态、重置、复制与人工复核 Guide 已完成，后续不重写。

## 工具合同

全部工具限制 1–300 个非空行和 40,000 个 Unicode 字符，执行 NFKC，拒绝控制符与不完整 Unicode；使用 textContent 输出，覆盖重复、非法枚举、真实日期、错误聚焦、重置、旧结果失效、完整复制和异步复制竞态。

## 发布前模板验收

运行三套静态审计、全库相似度检查和浏览器全页、双主题、四视口、五工具边界审计。

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "watch-register.html",
  "articles": [
    "records/signal-capture.html",
    "records/timestamp-seal.html",
    "records/evidence-lantern.html",
    "records/action-log.html",
    "records/owner-shift.html",
    "records/dependency-door.html",
    "records/recovery-window.html",
    "records/observation-watch.html",
    "records/recurrence-trace.html",
    "records/daylight-review.html",
    "records/correction-log.html",
    "records/public-keycard.html"
  ],
  "cornerstones": [
    "records/signal-capture.html",
    "records/recovery-window.html"
  ],
  "registrationGuide": "records/public-keycard.html",
  "articleCovers": {
    "records/signal-capture.html": {
      "display": "assets/records/signal-capture.webp",
      "og": "assets/records/signal-capture.png"
    },
    "records/timestamp-seal.html": {
      "display": "assets/records/timestamp-seal.webp",
      "og": "assets/records/timestamp-seal.png"
    },
    "records/evidence-lantern.html": {
      "display": "assets/records/evidence-lantern.webp",
      "og": "assets/records/evidence-lantern.png"
    },
    "records/action-log.html": {
      "display": "assets/records/action-log.webp",
      "og": "assets/records/action-log.png"
    },
    "records/owner-shift.html": {
      "display": "assets/records/owner-shift.webp",
      "og": "assets/records/owner-shift.png"
    },
    "records/dependency-door.html": {
      "display": "assets/records/dependency-door.webp",
      "og": "assets/records/dependency-door.png"
    },
    "records/recovery-window.html": {
      "display": "assets/records/recovery-window.webp",
      "og": "assets/records/recovery-window.png"
    },
    "records/observation-watch.html": {
      "display": "assets/records/observation-watch.webp",
      "og": "assets/records/observation-watch.png"
    },
    "records/recurrence-trace.html": {
      "display": "assets/records/recurrence-trace.webp",
      "og": "assets/records/recurrence-trace.png"
    },
    "records/daylight-review.html": {
      "display": "assets/records/daylight-review.webp",
      "og": "assets/records/daylight-review.png"
    },
    "records/correction-log.html": {
      "display": "assets/records/correction-log.webp",
      "og": "assets/records/correction-log.png"
    },
    "records/public-keycard.html": {
      "display": "assets/records/public-keycard.webp",
      "og": "assets/records/public-keycard.png"
    }
  },
  "categories": [
    {
      "path": "corridors/capture-corridor.html",
      "label": "捕获廊",
      "articles": [
        "records/signal-capture.html",
        "records/timestamp-seal.html",
        "records/evidence-lantern.html"
      ]
    },
    {
      "path": "corridors/response-corridor.html",
      "label": "响应廊",
      "articles": [
        "records/action-log.html",
        "records/owner-shift.html",
        "records/dependency-door.html"
      ]
    },
    {
      "path": "corridors/observe-corridor.html",
      "label": "观察廊",
      "articles": [
        "records/recovery-window.html",
        "records/observation-watch.html",
        "records/recurrence-trace.html"
      ]
    },
    {
      "path": "corridors/review-corridor.html",
      "label": "复核廊",
      "articles": [
        "records/daylight-review.html",
        "records/correction-log.html",
        "records/public-keycard.html"
      ]
    }
  ],
  "toolIndex": "night-tools.html",
  "tools": [
    "stations/timestamp-order.html",
    "stations/shift-overlap.html",
    "stations/observation-window.html",
    "stations/incident-sequence.html",
    "stations/handoff-gates.html"
  ],
  "legal": {
    "about": "about-corridor.html",
    "contact": "contact-watch.html",
    "disclosure": "relationship-log.html",
    "disclaimer": "scope-boundary.html",
    "privacy": "privacy-shield.html",
    "corrections": "correction-register.html",
    "editorial": "editorial-protocol.html"
  },
  "error404": "404.html",
  "robots": "robots.txt",
  "sitemap": "sitemap.xml",
  "feed": "feed.xml",
  "security": ".well-known/security.txt",
  "favicon": "favicon.ico",
  "appleTouchIcon": "apple-touch-icon.png",
  "socialImage": "assets/night-corridor-social.png",
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

- %%ACCESS_CTA%%
- %%ACCESS_TITLE%%
- %%AFFILIATE_DISCLOSURE%%
- %%AFFILIATE_URL%%
- %%ARTICLE_ACCENT%%
- %%ARTICLE_DESC%%
- %%ARTICLE_HANDOFF%%
- %%ARTICLE_LEAD%%
- %%ARTICLE_TITLE%%
- %%BENEFIT_DISCLAIMER%%
- %%BENEFIT_RATE%%
- %%BRAND_EN%%
- %%CARD_01_DESC%%
- %%CARD_01_TITLE%%
- %%CARD_02_DESC%%
- %%CARD_02_TITLE%%
- %%CARD_03_DESC%%
- %%CARD_03_TITLE%%
- %%CARD_04_DESC%%
- %%CARD_04_TITLE%%
- %%CARD_05_DESC%%
- %%CARD_05_TITLE%%
- %%CARD_06_DESC%%
- %%CARD_06_TITLE%%
- %%CARD_07_DESC%%
- %%CARD_07_TITLE%%
- %%CARD_08_DESC%%
- %%CARD_08_TITLE%%
- %%CARD_09_DESC%%
- %%CARD_09_TITLE%%
- %%CARD_10_DESC%%
- %%CARD_10_TITLE%%
- %%CARD_11_DESC%%
- %%CARD_11_TITLE%%
- %%CARD_12_DESC%%
- %%CARD_12_TITLE%%
- %%CHANGELOG_ACCENT%%
- %%CHANGELOG_DESC%%
- %%CHANGE_REASON%%
- %%CONTACT_EMAIL%%
- %%CORRIDOR_ACCENT%%
- %%CORRIDOR_DESC%%
- %%CORRIDOR_TITLE%%
- %%COVER_ALT%%
- %%COVER_CAPTION%%
- %%FAQ_1_ANSWER%%
- %%FAQ_1_QUESTION%%
- %%FAQ_2_ANSWER%%
- %%FAQ_2_QUESTION%%
- %%HERO_ACCENT%%
- %%HERO_DESC%%
- %%HERO_TITLE%%
- %%INVITE_CODE%%
- %%LANG%%
- %%MODIFIED_ISO%%
- %%MODIFIED_LABEL%%
- %%MODULE_ITEM_1_TEXT%%
- %%MODULE_ITEM_2_TEXT%%
- %%MODULE_ITEM_3_TEXT%%
- %%MODULE_ITEM_4_TEXT%%
- %%MODULE_TITLE%%
- %%NEW_STATEMENT%%
- %%NEXT_SHIFT_LABEL%%
- %%NEXT_SHIFT_TIME%%
- %%NEXT_SHIFT_TITLE%%
- %%OLD_STATEMENT%%
- %%PUBLIC_ACCENT%%
- %%PUBLIC_FOOTNOTE%%
- %%PUBLIC_OWNER%%
- %%PUBLIC_SECTION_1_BODY%%
- %%PUBLIC_SECTION_2_BODY%%
- %%PUBLIC_SECTION_3_BODY%%
- %%READ_TIME%%
- %%REVIEW_DATE%%
- %%SECTION_1_BODY%%
- %%SECTION_1_TITLE%%
- %%SECTION_2_BODY%%
- %%SECTION_2_TITLE%%
- %%SECTION_3_BODY%%
- %%SECTION_3_TITLE%%
- %%SECTION_4_BODY%%
- %%SECTION_4_TITLE%%
- %%SITE_DESC%%
- %%SITE_DOMAIN%%
- %%SITE_NAME%%
- %%SITE_TAGLINE%%
- %%TOOL_GUIDE_1%%
- %%TOOL_GUIDE_2%%
- %%TOOL_GUIDE_3%%
- %%TOOL_GUIDE_4%%
- %%TOOL_GUIDE_5%%
- %%WATCH_ZONE%%
