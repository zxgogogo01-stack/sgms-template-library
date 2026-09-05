# 091-duotone-counterpoint

## 交付定位

双色对位刊物的 workflow-ready v2 完整 UI 框架。后续 AI 只替换已声明变量、核实后的标题、摘要与正文，不增加页面、组件、工具、资源或导航。模板不包含可发布业务文章。

## 强制使用规则

1. 保留 `cp91-` 类名、`data-cp91-*` 钩子、路径和脚本。
2. 全局替换变量后逐页核对 canonical、结构化数据、日期、联系信息和披露。
3. 十二个文章外壳分别使用 pair、ledger、switch、ladder、scales、asymmetry、exchange、band、window、gate、delta、access 组件，不互换结构。
4. 唯一 `%%AFFILIATE_URL%%` 静态链接只保留在 `arguments/public-access-frame.html`；首页只展示识别码和利益点，不放外链。
5. 五个工具算法和状态 UI 已完成，后续不重写。

## 页面与变量

- 全局：`%%LANG%%`、`%%SITE_NAME%%`、`%%BRAND_EN%%`、`%%SITE_DOMAIN%%`、`%%SITE_DESC%%`、`%%CONTACT_EMAIL%%`。
- 访问位：`%%INVITE_CODE%%`、`%%BENEFIT_RATE%%`、`%%BENEFIT_DISCLAIMER%%`、`%%AFFILIATE_URL%%`、`%%AFFILIATE_DISCLOSURE%%`、`%%ACCESS_CTA%%`。
- 日期：`%%PUBLISHED_ISO%%`、`%%PUBLISHED_LABEL%%`、`%%MODIFIED_ISO%%`、`%%MODIFIED_LABEL%%`、`%%SECURITY_EXPIRES_ISO%%`。
- 正文：`%%ARTICLE_TITLE%%`、`%%ARTICLE_ACCENT%%`、`%%ARTICLE_DESC%%`、`%%ARTICLE_LEAD%%`、`%%SECTION_1_TITLE%%` 至 `%%SECTION_3_BODY%%`、`%%MODULE_TITLE%%`、`%%MODULE_ITEM_1_TITLE%%` 至 `%%MODULE_ITEM_4_TEXT%%`、`%%FAQ_1_QUESTION%%` 至 `%%FAQ_2_ANSWER%%`。
- 首页：`%%HERO_A_LABEL%%`、`%%HERO_A_TITLE%%`、`%%HERO_A_DESC%%`、`%%HERO_A_NOTE%%`、`%%HERO_TITLE%%`、`%%HERO_ACCENT%%`、`%%VENN_LEFT%%`、`%%VENN_CENTER%%`、`%%VENN_RIGHT%%`、`%%HERO_B_LABEL%%`、`%%HERO_B_TITLE%%`、`%%HERO_B_DESC%%`、`%%HERO_B_NOTE%%`、`%%ACCESS_PANEL_TITLE%%`、`%%ACCESS_PANEL_DESC%%`。
- 分类、工具与公开页中的其余大写双百分号字段均为可换字 UI 槽位，不需要增加结构。

## 工具合同

五工具均限制 1–300 个非空行和 40,000 个 Unicode 字符，执行 NFKC，拒绝控制符与不完整 Unicode；使用 `textContent` 输出，覆盖错误聚焦、重置、旧结果失效、完整复制和异步复制竞态。具体输入格式写在各工具页。

## 发布前模板验收

运行 `validate.js`、`audit-template.js`、`audit-workflow-readiness.js`、全库相似度检查和浏览器全页/双主题/四视口/五工具边界审计。

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "argument-register.html",
  "articles": [
    "arguments/question-frame.html",
    "arguments/premise-ledger.html",
    "arguments/definition-split.html",
    "arguments/evidence-ladder.html",
    "arguments/source-weight.html",
    "arguments/asymmetry-note.html",
    "arguments/counterexample-swap.html",
    "arguments/uncertainty-band.html",
    "arguments/boundary-window.html",
    "arguments/synthesis-gate.html",
    "arguments/correction-delta.html",
    "arguments/public-access-frame.html"
  ],
  "cornerstones": [
    "arguments/question-frame.html",
    "arguments/synthesis-gate.html"
  ],
  "registrationGuide": "arguments/public-access-frame.html",
  "articleCovers": {
    "arguments/question-frame.html": {
      "display": "assets/arguments/question-frame.webp",
      "og": "assets/arguments/question-frame.png"
    },
    "arguments/premise-ledger.html": {
      "display": "assets/arguments/premise-ledger.webp",
      "og": "assets/arguments/premise-ledger.png"
    },
    "arguments/definition-split.html": {
      "display": "assets/arguments/definition-split.webp",
      "og": "assets/arguments/definition-split.png"
    },
    "arguments/evidence-ladder.html": {
      "display": "assets/arguments/evidence-ladder.webp",
      "og": "assets/arguments/evidence-ladder.png"
    },
    "arguments/source-weight.html": {
      "display": "assets/arguments/source-weight.webp",
      "og": "assets/arguments/source-weight.png"
    },
    "arguments/asymmetry-note.html": {
      "display": "assets/arguments/asymmetry-note.webp",
      "og": "assets/arguments/asymmetry-note.png"
    },
    "arguments/counterexample-swap.html": {
      "display": "assets/arguments/counterexample-swap.webp",
      "og": "assets/arguments/counterexample-swap.png"
    },
    "arguments/uncertainty-band.html": {
      "display": "assets/arguments/uncertainty-band.webp",
      "og": "assets/arguments/uncertainty-band.png"
    },
    "arguments/boundary-window.html": {
      "display": "assets/arguments/boundary-window.webp",
      "og": "assets/arguments/boundary-window.png"
    },
    "arguments/synthesis-gate.html": {
      "display": "assets/arguments/synthesis-gate.webp",
      "og": "assets/arguments/synthesis-gate.png"
    },
    "arguments/correction-delta.html": {
      "display": "assets/arguments/correction-delta.webp",
      "og": "assets/arguments/correction-delta.png"
    },
    "arguments/public-access-frame.html": {
      "display": "assets/arguments/public-access-frame.webp",
      "og": "assets/arguments/public-access-frame.png"
    }
  },
  "categories": [
    {
      "path": "lenses/premise-lens.html",
      "label": "前提透镜",
      "articles": [
        "arguments/question-frame.html",
        "arguments/premise-ledger.html",
        "arguments/definition-split.html"
      ]
    },
    {
      "path": "lenses/evidence-lens.html",
      "label": "证据透镜",
      "articles": [
        "arguments/evidence-ladder.html",
        "arguments/source-weight.html",
        "arguments/asymmetry-note.html"
      ]
    },
    {
      "path": "lenses/stress-lens.html",
      "label": "压力透镜",
      "articles": [
        "arguments/counterexample-swap.html",
        "arguments/uncertainty-band.html",
        "arguments/boundary-window.html"
      ]
    },
    {
      "path": "lenses/decision-lens.html",
      "label": "决策透镜",
      "articles": [
        "arguments/synthesis-gate.html",
        "arguments/correction-delta.html",
        "arguments/public-access-frame.html"
      ]
    }
  ],
  "toolIndex": "instrument-deck.html",
  "tools": [
    "instruments/premise-parity.html",
    "instruments/definition-map.html",
    "instruments/evidence-weight.html",
    "instruments/counterexample-test.html",
    "instruments/synthesis-gates.html"
  ],
  "legal": {
    "about": "about.html",
    "contact": "contact.html",
    "disclosure": "relationship-disclosure.html",
    "disclaimer": "content-boundary.html",
    "privacy": "local-privacy.html",
    "corrections": "correction-log.html",
    "editorial": "editorial-standard.html"
  },
  "error404": "404.html",
  "robots": "robots.txt",
  "sitemap": "sitemap.xml",
  "feed": "feed.xml",
  "security": ".well-known/security.txt",
  "favicon": "favicon.ico",
  "appleTouchIcon": "apple-touch-icon.png",
  "socialImage": "assets/counterpoint-social.png",
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
