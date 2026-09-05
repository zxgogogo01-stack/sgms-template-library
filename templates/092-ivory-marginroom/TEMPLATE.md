# 092-ivory-marginroom

## 交付定位

象牙页边阅览室的 workflow-ready v2 完整 UI 框架。后续 AI 只替换已声明变量、核实后的标题、摘要与正文，不增加页面、组件、工具、资源或导航。模板不包含可发布业务文章。

## 强制使用规则

1. 保留 `im92-` 类名、`data-im92-*` 钩子、路径和脚本。
2. 十二个文章外壳分别使用 address、edition、window、ring、separation、definition、footnote、counter、scope、handoff、correction、access 组件，不互换结构。
3. 唯一 `%%AFFILIATE_URL%%` 静态链接只保留在 `notes/public-bookmark.html`；首页只展示识别码与利益点。
4. 五工具逻辑与状态 UI 已完成，后续不重写。

## 页面与变量

- 全局：`%%LANG%%`、`%%SITE_NAME%%`、`%%BRAND_EN%%`、`%%SITE_DOMAIN%%`、`%%SITE_TAGLINE%%`、`%%SITE_DESC%%`、`%%CONTACT_EMAIL%%`。
- 首页：`%%HERO_TITLE%%`、`%%HERO_ACCENT%%`、`%%HERO_DESC%%`、`%%PLATE_QUOTE%%`、`%%PLATE_NOTE%%`、`%%ACCESS_TITLE%%`。
- 访问位：`%%INVITE_CODE%%`、`%%BENEFIT_RATE%%`、`%%BENEFIT_DISCLAIMER%%`、`%%AFFILIATE_URL%%`、`%%AFFILIATE_DISCLOSURE%%`、`%%ACCESS_CTA%%`。
- 日期：`%%PUBLISHED_ISO%%`、`%%PUBLISHED_LABEL%%`、`%%MODIFIED_ISO%%`、`%%MODIFIED_LABEL%%`、`%%REVIEW_DATE%%`、`%%SECURITY_EXPIRES_ISO%%`。
- 正文：`%%ARTICLE_TITLE%%`、`%%ARTICLE_ACCENT%%`、`%%ARTICLE_DESC%%`、`%%ARTICLE_LEAD%%`、`%%SECTION_1_TITLE%%` 至 `%%SECTION_4_BODY%%`、`%%MODULE_TITLE%%`、`%%MODULE_ITEM_1_TEXT%%` 至 `%%MODULE_ITEM_4_TEXT%%`、`%%FAQ_1_QUESTION%%` 至 `%%FAQ_2_ANSWER%%`。
- 来源模块：`%%SOURCE_TITLE%%`、`%%SOURCE_AUTHOR%%`、`%%SOURCE_VERSION%%`、`%%SOURCE_LOCATOR%%`、`%%EDITION_DELTA%%`。
- 分类、工具、公开页与修订页中的其余大写双百分号字段均为可换字 UI 槽位，不需要增加结构。

## 工具合同

五工具均限制 1–300 个非空行和 40,000 个 Unicode 字符，执行 NFKC，拒绝控制符与不完整 Unicode；使用 textContent 输出，覆盖错误聚焦、重置、旧结果失效、完整复制和异步复制竞态。

## 发布前模板验收

运行三套静态审计、全库相似度检查和浏览器全页/双主题/四视口/五工具边界审计。

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "reading-register.html",
  "articles": [
    "notes/source-address.html",
    "notes/edition-note.html",
    "notes/quote-window.html",
    "notes/context-ring.html",
    "notes/statement-separation.html",
    "notes/definition-margin.html",
    "notes/evidence-footnote.html",
    "notes/counterexample-note.html",
    "notes/scope-boundary.html",
    "notes/review-handoff.html",
    "notes/correction-layer.html",
    "notes/public-bookmark.html"
  ],
  "cornerstones": [
    "notes/source-address.html",
    "notes/scope-boundary.html"
  ],
  "registrationGuide": "notes/public-bookmark.html",
  "articleCovers": {
    "notes/source-address.html": {
      "display": "assets/notes/source-address.webp",
      "og": "assets/notes/source-address.png"
    },
    "notes/edition-note.html": {
      "display": "assets/notes/edition-note.webp",
      "og": "assets/notes/edition-note.png"
    },
    "notes/quote-window.html": {
      "display": "assets/notes/quote-window.webp",
      "og": "assets/notes/quote-window.png"
    },
    "notes/context-ring.html": {
      "display": "assets/notes/context-ring.webp",
      "og": "assets/notes/context-ring.png"
    },
    "notes/statement-separation.html": {
      "display": "assets/notes/statement-separation.webp",
      "og": "assets/notes/statement-separation.png"
    },
    "notes/definition-margin.html": {
      "display": "assets/notes/definition-margin.webp",
      "og": "assets/notes/definition-margin.png"
    },
    "notes/evidence-footnote.html": {
      "display": "assets/notes/evidence-footnote.webp",
      "og": "assets/notes/evidence-footnote.png"
    },
    "notes/counterexample-note.html": {
      "display": "assets/notes/counterexample-note.webp",
      "og": "assets/notes/counterexample-note.png"
    },
    "notes/scope-boundary.html": {
      "display": "assets/notes/scope-boundary.webp",
      "og": "assets/notes/scope-boundary.png"
    },
    "notes/review-handoff.html": {
      "display": "assets/notes/review-handoff.webp",
      "og": "assets/notes/review-handoff.png"
    },
    "notes/correction-layer.html": {
      "display": "assets/notes/correction-layer.webp",
      "og": "assets/notes/correction-layer.png"
    },
    "notes/public-bookmark.html": {
      "display": "assets/notes/public-bookmark.webp",
      "og": "assets/notes/public-bookmark.png"
    }
  },
  "categories": [
    {
      "path": "shelves/source-shelf.html",
      "label": "来源书架",
      "articles": [
        "notes/source-address.html",
        "notes/edition-note.html",
        "notes/quote-window.html"
      ]
    },
    {
      "path": "shelves/reading-shelf.html",
      "label": "解释书架",
      "articles": [
        "notes/context-ring.html",
        "notes/statement-separation.html",
        "notes/definition-margin.html"
      ]
    },
    {
      "path": "shelves/boundary-shelf.html",
      "label": "边界书架",
      "articles": [
        "notes/evidence-footnote.html",
        "notes/counterexample-note.html",
        "notes/scope-boundary.html"
      ]
    },
    {
      "path": "shelves/revision-shelf.html",
      "label": "修订书架",
      "articles": [
        "notes/review-handoff.html",
        "notes/correction-layer.html",
        "notes/public-bookmark.html"
      ]
    }
  ],
  "toolIndex": "margin-tools.html",
  "tools": [
    "instruments/citation-fields.html",
    "instruments/quote-locator.html",
    "instruments/annotation-inventory.html",
    "instruments/edition-pairs.html",
    "instruments/reading-gates.html"
  ],
  "legal": {
    "about": "about-room.html",
    "contact": "contact-desk.html",
    "disclosure": "relationship-note.html",
    "disclaimer": "scope-notice.html",
    "privacy": "desk-privacy.html",
    "corrections": "correction-ledger.html",
    "editorial": "editorial-rules.html"
  },
  "error404": "404.html",
  "robots": "robots.txt",
  "sitemap": "sitemap.xml",
  "feed": "feed.xml",
  "security": ".well-known/security.txt",
  "favicon": "favicon.ico",
  "appleTouchIcon": "apple-touch-icon.png",
  "socialImage": "assets/margin-social.png",
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
