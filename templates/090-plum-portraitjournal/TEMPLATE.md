# 090 Plum Portrait Journal · 工作流 v2 接入契约

## 范围与风格

只制作完整网站 UI 模板，不编写人物稿、业务文章或生产内容，不部署。原 `journal.css` 与 `editor.js` 字节保留；扩展采用梅紫人物刊物、抽象半色调肖像、装订书脊、裁切线与纸张/梅紫双主题。动态源包未取得，原包忠实度未核验。

36 个 HTML：31 个可收录页面、1 个版本记录、404、3 个 noindex 兼容入口。`registrationGuide` 仅为检查器兼容字段，实际是通用公开访问印样与推广披露组件，不承载流程内容。

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "portrait-register.html",
  "articles": [
    "portraits/context-opening.html",
    "portraits/timeline-portrait.html",
    "portraits/turning-point.html",
    "portraits/voice-notes.html",
    "portraits/method-routine.html",
    "portraits/source-portrait.html",
    "portraits/consent-boundary.html",
    "portraits/identity-minimization.html",
    "portraits/context-window.html",
    "portraits/quotation-review.html",
    "portraits/correction-trail.html",
    "portraits/public-access-portrait.html"
  ],
  "cornerstones": [
    "portraits/context-opening.html",
    "portraits/voice-notes.html"
  ],
  "registrationGuide": "portraits/public-access-portrait.html",
  "articleCovers": {
    "portraits/context-opening.html": {
      "display": "assets/portraits/context-opening.webp",
      "og": "assets/portraits/context-opening.png"
    },
    "portraits/timeline-portrait.html": {
      "display": "assets/portraits/timeline-portrait.webp",
      "og": "assets/portraits/timeline-portrait.png"
    },
    "portraits/turning-point.html": {
      "display": "assets/portraits/turning-point.webp",
      "og": "assets/portraits/turning-point.png"
    },
    "portraits/voice-notes.html": {
      "display": "assets/portraits/voice-notes.webp",
      "og": "assets/portraits/voice-notes.png"
    },
    "portraits/method-routine.html": {
      "display": "assets/portraits/method-routine.webp",
      "og": "assets/portraits/method-routine.png"
    },
    "portraits/source-portrait.html": {
      "display": "assets/portraits/source-portrait.webp",
      "og": "assets/portraits/source-portrait.png"
    },
    "portraits/consent-boundary.html": {
      "display": "assets/portraits/consent-boundary.webp",
      "og": "assets/portraits/consent-boundary.png"
    },
    "portraits/identity-minimization.html": {
      "display": "assets/portraits/identity-minimization.webp",
      "og": "assets/portraits/identity-minimization.png"
    },
    "portraits/context-window.html": {
      "display": "assets/portraits/context-window.webp",
      "og": "assets/portraits/context-window.png"
    },
    "portraits/quotation-review.html": {
      "display": "assets/portraits/quotation-review.webp",
      "og": "assets/portraits/quotation-review.png"
    },
    "portraits/correction-trail.html": {
      "display": "assets/portraits/correction-trail.webp",
      "og": "assets/portraits/correction-trail.png"
    },
    "portraits/public-access-portrait.html": {
      "display": "assets/portraits/public-access-portrait.webp",
      "og": "assets/portraits/public-access-portrait.png"
    }
  },
  "categories": [
    {
      "path": "folios/background-folio.html",
      "label": "BACKGROUND",
      "articles": [
        "portraits/context-opening.html",
        "portraits/timeline-portrait.html",
        "portraits/turning-point.html"
      ]
    },
    {
      "path": "folios/practice-folio.html",
      "label": "PRACTICE",
      "articles": [
        "portraits/voice-notes.html",
        "portraits/method-routine.html",
        "portraits/source-portrait.html"
      ]
    },
    {
      "path": "folios/boundary-folio.html",
      "label": "BOUNDARY",
      "articles": [
        "portraits/consent-boundary.html",
        "portraits/identity-minimization.html",
        "portraits/context-window.html"
      ]
    },
    {
      "path": "folios/review-folio.html",
      "label": "REVIEW",
      "articles": [
        "portraits/quotation-review.html",
        "portraits/correction-trail.html",
        "portraits/public-access-portrait.html"
      ]
    }
  ],
  "toolIndex": "studio-tools.html",
  "tools": [
    "studio-instruments/identity-map.html",
    "studio-instruments/quote-source.html",
    "studio-instruments/consent-scope.html",
    "studio-instruments/portrait-timeline.html",
    "studio-instruments/release-gate.html"
  ],
  "legal": {
    "about": "portrait-charter.html",
    "contact": "contact-sheet.html",
    "disclosure": "relationship-disclosure.html",
    "disclaimer": "portrait-boundary.html",
    "privacy": "local-proof-privacy.html",
    "corrections": "correction-proof.html",
    "editorial": "editorial-sittings.html"
  },
  "error404": "404.html",
  "robots": "robots.txt",
  "sitemap": "sitemap.xml",
  "feed": "feed.xml",
  "security": ".well-known/security.txt",
  "favicon": "favicon.ico",
  "appleTouchIcon": "apple-touch-icon.png",
  "socialImage": "assets/portrait-social.png",
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

## 后续 AI 只替换文字与变量

1. 保留路径、`pj90-*` 类名、`data-pj90-*` 属性、ID、表单合同、结构化数据、图片尺寸与内链，只替换已核实文字。
2. 全局变量：`%%LANG%%`、`%%SITE_DOMAIN%%`、`%%SITE_NAME%%`、`%%BRAND_EN%%`、`%%SITE_DESC%%`、`%%SITE_TAGLINE%%`、`%%INDEPENDENCE_NOTE%%`、`%%CONTACT_EMAIL%%`。
3. 首页变量：`%%HOME_TITLE%%`、`%%HOME_DESC%%`、`%%HOME_SPINE%%`、`%%ISSUE_DATE_ISO%%`、`%%ISSUE_DATE_LABEL%%`、`%%HERO_TITLE_LINE_1%%`、`%%HERO_TITLE_LINE_2%%`、`%%HERO_QUOTE%%`、`%%HERO_QUOTE_NOTE%%`、`%%PRIMARY_CTA%%`、`%%SECONDARY_CTA%%`、`%%HOME_PORTRAIT_LABEL%%`、`%%HOME_PORTRAIT_TITLE%%`、`%%HOME_PORTRAIT_NOTE%%`、`%%ACCESS_CARD_TITLE%%`、`%%ACCESS_CARD_DESC%%`、`%%HOME_FOLIOS_TITLE%%`、`%%HOME_FOLIOS_DESC%%`、`%%HOME_MARGIN_TITLE%%`、`%%HOME_MARGIN_BODY_1%%`、`%%HOME_MARGIN_BODY_2%%`、`%%HOME_MARGIN_OLD%%`、`%%HOME_MARGIN_NEW%%`、`%%INVITE_CODE%%`、`%%BENEFIT_RATE%%`、`%%BENEFIT_DISCLAIMER%%`。
4. 十二个内容外壳使用 `%%A01_*%%` 至 `%%A12_*%%`；四个分册使用 `%%FOLIO_1_TITLE%%`、`%%FOLIO_1_DESC%%`、`%%FOLIO_2_TITLE%%`、`%%FOLIO_2_DESC%%`、`%%FOLIO_3_TITLE%%`、`%%FOLIO_3_DESC%%`、`%%FOLIO_4_TITLE%%`、`%%FOLIO_4_DESC%%` 及各自的 `*_ACCENT`；五件工具使用 `%%TOOL_1_*%%` 至 `%%TOOL_5_*%%`。
5. 唯一外部推广槽位位于 `portraits/public-access-portrait.html`，变量为 `%%AFFILIATE_URL%%`、`%%AFFILIATE_LABEL%%`、`%%AFFILIATE_DISCLOSURE%%`、`%%AFFILIATE_CTA%%`；必须保留紧邻披露、rel 与 target。
6. 索引变量：`%%REGISTER_TITLE%%`、`%%REGISTER_DESC%%`、`%%REGISTER_ACCENT%%`、`%%TOOLS_INDEX_TITLE%%`、`%%TOOLS_INDEX_DESC%%`、`%%TOOLS_INDEX_ACCENT%%`。公开页使用 `%%PUBLIC_*%%`，版本页使用 `%%CHANGELOG_*%%`，错误页使用 `%%NOT_FOUND_TITLE%%`、`%%NOT_FOUND_DESC%%`。
7. 兼容入口变量：`%%COMPAT_ARTICLE_TITLE%%`、`%%COMPAT_ARTICLE_DESC%%`、`%%COMPAT_TOOL_TITLE%%`、`%%COMPAT_TOOL_DESC%%`、`%%COMPAT_LEGAL_TITLE%%`、`%%COMPAT_LEGAL_DESC%%`。
8. 不引入远程字体、图片、CDN、统计或第三方脚本。五个工具均在浏览器本地运行；输入合同或算法变化时同步更新测试。

## 完整审计

- 运行三套静态审计与相似度检查。
- 渲染全部 36 页于 1440/768/390/360px、纸张/梅紫双主题。
- 复验菜单焦点/Escape、主题持久化、筛选、阅读进度、复制竞态、404 安全文本、无 JS 导航及五工具正常/错误/上限/全角/Unicode 边界。
