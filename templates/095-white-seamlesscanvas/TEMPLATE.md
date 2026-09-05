# 095-white-seamlesscanvas

## 交付定位

无边界白色策展画布的 workflow-ready v2 完整 UI 框架。后续 AI 只替换已声明变量与核实文字，不增加页面、组件、工具、资源或导航；模板不包含可发布业务文章或注册教程。

## 强制使用规则

1. 保留 ws95- 类名、data-ws95-* 钩子、路径、seamless.css 与 framer.js。
2. 十二个正文外壳分别使用 source、scale、crop、space、color、sequence、credit、caption、alt、permission、overlay、edition 模块，不互换结构。
3. 唯一 AFFILIATE_URL 静态链接只保留在 studies/public-edition.html；首页只展示识别码、利益点与条件脚注。
4. 五件本地比例尺的算法、错误态、极限态、重置、复制与人工复核 Guide 已完成，后续不重写。

## 工具合同

全部工具限制 1–300 个非空行和 40,000 个 Unicode 字符，执行 NFKC，拒绝控制符与不完整 Unicode；使用 textContent 输出，覆盖重复、非法数字/枚举、错误聚焦、重置、旧结果失效、完整复制和异步复制竞态。

## 发布前模板验收

运行三套静态审计、全库相似度检查和浏览器全页、双主题、四视口、五工具边界审计。

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "canvas-index.html",
  "articles": [
    "studies/source-field.html",
    "studies/native-scale.html",
    "studies/crop-witness.html",
    "studies/negative-space.html",
    "studies/color-notation.html",
    "studies/sequence-ribbon.html",
    "studies/credit-line.html",
    "studies/caption-baseline.html",
    "studies/alt-text-lanes.html",
    "studies/permission-frame.html",
    "studies/revision-overlay.html",
    "studies/public-edition.html"
  ],
  "cornerstones": [
    "studies/source-field.html",
    "studies/permission-frame.html"
  ],
  "registrationGuide": "studies/public-edition.html",
  "articleCovers": {
    "studies/source-field.html": {
      "display": "assets/studies/source-field.webp",
      "og": "assets/studies/source-field.png"
    },
    "studies/native-scale.html": {
      "display": "assets/studies/native-scale.webp",
      "og": "assets/studies/native-scale.png"
    },
    "studies/crop-witness.html": {
      "display": "assets/studies/crop-witness.webp",
      "og": "assets/studies/crop-witness.png"
    },
    "studies/negative-space.html": {
      "display": "assets/studies/negative-space.webp",
      "og": "assets/studies/negative-space.png"
    },
    "studies/color-notation.html": {
      "display": "assets/studies/color-notation.webp",
      "og": "assets/studies/color-notation.png"
    },
    "studies/sequence-ribbon.html": {
      "display": "assets/studies/sequence-ribbon.webp",
      "og": "assets/studies/sequence-ribbon.png"
    },
    "studies/credit-line.html": {
      "display": "assets/studies/credit-line.webp",
      "og": "assets/studies/credit-line.png"
    },
    "studies/caption-baseline.html": {
      "display": "assets/studies/caption-baseline.webp",
      "og": "assets/studies/caption-baseline.png"
    },
    "studies/alt-text-lanes.html": {
      "display": "assets/studies/alt-text-lanes.webp",
      "og": "assets/studies/alt-text-lanes.png"
    },
    "studies/permission-frame.html": {
      "display": "assets/studies/permission-frame.webp",
      "og": "assets/studies/permission-frame.png"
    },
    "studies/revision-overlay.html": {
      "display": "assets/studies/revision-overlay.webp",
      "og": "assets/studies/revision-overlay.png"
    },
    "studies/public-edition.html": {
      "display": "assets/studies/public-edition.webp",
      "og": "assets/studies/public-edition.png"
    }
  },
  "categories": [
    {
      "path": "fields/collection-field.html",
      "label": "收集画布",
      "articles": [
        "studies/source-field.html",
        "studies/native-scale.html",
        "studies/crop-witness.html"
      ]
    },
    {
      "path": "fields/composition-field.html",
      "label": "编排画布",
      "articles": [
        "studies/negative-space.html",
        "studies/color-notation.html",
        "studies/sequence-ribbon.html"
      ]
    },
    {
      "path": "fields/attribution-field.html",
      "label": "署名画布",
      "articles": [
        "studies/credit-line.html",
        "studies/caption-baseline.html",
        "studies/alt-text-lanes.html"
      ]
    },
    {
      "path": "fields/publication-field.html",
      "label": "发行画布",
      "articles": [
        "studies/permission-frame.html",
        "studies/revision-overlay.html",
        "studies/public-edition.html"
      ]
    }
  ],
  "toolIndex": "canvas-tools.html",
  "tools": [
    "instruments/ratio-reducer.html",
    "instruments/crop-fit.html",
    "instruments/sequence-gaps.html",
    "instruments/text-balance.html",
    "instruments/rights-gates.html"
  ],
  "legal": {
    "about": "about-canvas.html",
    "contact": "contact-studio.html",
    "disclosure": "relationship-note.html",
    "disclaimer": "viewing-boundary.html",
    "privacy": "privacy-canvas.html",
    "corrections": "revision-register.html",
    "editorial": "curation-method.html"
  },
  "error404": "404.html",
  "robots": "robots.txt",
  "sitemap": "sitemap.xml",
  "feed": "feed.xml",
  "security": ".well-known/security.txt",
  "favicon": "favicon.ico",
  "appleTouchIcon": "apple-touch-icon.png",
  "socialImage": "assets/seamless-social.png",
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
- %%COVER_ALT%%
- %%COVER_CAPTION%%
- %%FAQ_1_ANSWER%%
- %%FAQ_1_QUESTION%%
- %%FAQ_2_ANSWER%%
- %%FAQ_2_QUESTION%%
- %%FIELD_ACCENT%%
- %%FIELD_DESC%%
- %%FIELD_TITLE%%
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
- %%NEXT_REVIEW_DATE%%
- %%NEXT_REVIEW_TITLE%%
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
- %%SECURITY_EXPIRES_ISO%%
- %%SEQUENCE_NOTE%%
- %%SITE_DESC%%
- %%SITE_DOMAIN%%
- %%SITE_NAME%%
- %%SITE_TAGLINE%%
- %%TOOL_GUIDE_1%%
- %%TOOL_GUIDE_2%%
- %%TOOL_GUIDE_3%%
- %%TOOL_GUIDE_4%%
- %%TOOL_GUIDE_5%%
