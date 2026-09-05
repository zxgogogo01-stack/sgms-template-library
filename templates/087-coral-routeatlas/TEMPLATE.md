# 087 Coral Route Atlas · 工作流 v2 接入契约

## 范围与风格

只制作完整网站 UI 模板，不编写业务内容，不部署。原 `cartograph.css` 与 `navigator.js` 字节保留；新扩展继续使用珊瑚、深青、纸张/夜航双主题、折叠地图、坐标带与四站航线。动态源包未取得，原包忠实度未核验。

36 个 HTML：32 个完整展示页、404、3 个 noindex 兼容入口。`registrationGuide` 是工作流兼容字段，指向通用公开访问航标与推广披露 UI。

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "route-register.html",
  "articles": [
    "field-notes/destination-coordinate.html",
    "field-notes/scope-contour.html",
    "field-notes/constraint-marker.html",
    "field-notes/observation-transect.html",
    "field-notes/source-coordinate.html",
    "field-notes/unknown-water.html",
    "field-notes/fork-card.html",
    "field-notes/turnaround-marker.html",
    "field-notes/timebox-ribbon.html",
    "field-notes/handoff-trace.html",
    "field-notes/deviation-overlay.html",
    "field-notes/public-access-beacon.html"
  ],
  "cornerstones": [
    "field-notes/destination-coordinate.html",
    "field-notes/source-coordinate.html"
  ],
  "registrationGuide": "field-notes/public-access-beacon.html",
  "articleCovers": {
    "field-notes/destination-coordinate.html": {
      "display": "assets/field-notes/destination-coordinate.webp",
      "og": "assets/field-notes/destination-coordinate.png"
    },
    "field-notes/scope-contour.html": {
      "display": "assets/field-notes/scope-contour.webp",
      "og": "assets/field-notes/scope-contour.png"
    },
    "field-notes/constraint-marker.html": {
      "display": "assets/field-notes/constraint-marker.webp",
      "og": "assets/field-notes/constraint-marker.png"
    },
    "field-notes/observation-transect.html": {
      "display": "assets/field-notes/observation-transect.webp",
      "og": "assets/field-notes/observation-transect.png"
    },
    "field-notes/source-coordinate.html": {
      "display": "assets/field-notes/source-coordinate.webp",
      "og": "assets/field-notes/source-coordinate.png"
    },
    "field-notes/unknown-water.html": {
      "display": "assets/field-notes/unknown-water.webp",
      "og": "assets/field-notes/unknown-water.png"
    },
    "field-notes/fork-card.html": {
      "display": "assets/field-notes/fork-card.webp",
      "og": "assets/field-notes/fork-card.png"
    },
    "field-notes/turnaround-marker.html": {
      "display": "assets/field-notes/turnaround-marker.webp",
      "og": "assets/field-notes/turnaround-marker.png"
    },
    "field-notes/timebox-ribbon.html": {
      "display": "assets/field-notes/timebox-ribbon.webp",
      "og": "assets/field-notes/timebox-ribbon.png"
    },
    "field-notes/handoff-trace.html": {
      "display": "assets/field-notes/handoff-trace.webp",
      "og": "assets/field-notes/handoff-trace.png"
    },
    "field-notes/deviation-overlay.html": {
      "display": "assets/field-notes/deviation-overlay.webp",
      "og": "assets/field-notes/deviation-overlay.png"
    },
    "field-notes/public-access-beacon.html": {
      "display": "assets/field-notes/public-access-beacon.webp",
      "og": "assets/field-notes/public-access-beacon.png"
    }
  },
  "categories": [
    {
      "path": "map-sheets/frame-sheet.html",
      "label": "起点图幅",
      "articles": [
        "field-notes/destination-coordinate.html",
        "field-notes/scope-contour.html",
        "field-notes/constraint-marker.html"
      ]
    },
    {
      "path": "map-sheets/survey-sheet.html",
      "label": "勘测图幅",
      "articles": [
        "field-notes/observation-transect.html",
        "field-notes/source-coordinate.html",
        "field-notes/unknown-water.html"
      ]
    },
    {
      "path": "map-sheets/navigation-sheet.html",
      "label": "导航图幅",
      "articles": [
        "field-notes/fork-card.html",
        "field-notes/turnaround-marker.html",
        "field-notes/timebox-ribbon.html"
      ]
    },
    {
      "path": "map-sheets/review-sheet.html",
      "label": "回看图幅",
      "articles": [
        "field-notes/handoff-trace.html",
        "field-notes/deviation-overlay.html",
        "field-notes/public-access-beacon.html"
      ]
    }
  ],
  "toolIndex": "map-instruments.html",
  "tools": [
    "instruments/waypoint-order.html",
    "instruments/segment-ledger.html",
    "instruments/schedule-gap.html",
    "instruments/grid-trace.html",
    "instruments/checkpoint-capacity.html"
  ],
  "legal": {
    "about": "atlas-charter.html",
    "contact": "contact-coordinate.html",
    "disclosure": "relationship-legend.html",
    "disclaimer": "navigation-boundary.html",
    "privacy": "local-map-privacy.html",
    "corrections": "correction-route.html",
    "editorial": "cartographic-method.html"
  },
  "error404": "404.html",
  "robots": "robots.txt",
  "sitemap": "sitemap.xml",
  "feed": "feed.xml",
  "security": ".well-known/security.txt",
  "favicon": "favicon.ico",
  "appleTouchIcon": "apple-touch-icon.png",
  "socialImage": "assets/routeatlas-cover.png",
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

1. 保留路径、`ca87-*` 类名、`data-ca87-*` 属性、ID、表单合同、结构化数据和内链，只替换已核实文字。
2. 全局变量：`%%LANG%%`、`%%SITE_DOMAIN%%`、`%%SITE_NAME%%`、`%%BRAND_EN%%`、`%%SITE_DESC%%`、`%%SITE_TAGLINE%%`、`%%INDEPENDENCE_NOTE%%`、`%%AUTHOR_NAME%%`、`%%CONTACT_EMAIL%%`。
3. 首页变量：`%%HOME_TITLE%%`、`%%HERO_DESCRIPTION%%`、`%%HOME_MAP_CAPTION%%`、`%%HOME_LEGEND_1%%`、`%%HOME_LEGEND_2%%`、`%%HOME_LEGEND_3%%`、`%%HOME_SECTION_TITLE%%`、`%%HOME_SECTION_DESC%%`、`%%HOME_NOTE_TITLE%%`、`%%HOME_QUOTE%%`、`%%HOME_QUOTE_CREDIT%%`、`%%SHEET_1_DESC%%`、`%%SHEET_2_DESC%%`、`%%SHEET_3_DESC%%`、`%%SHEET_4_DESC%%`、`%%INVITE_CODE%%`、`%%BENEFIT_RATE%%`、`%%BENEFIT_DISCLAIMER%%`。
4. 十二篇使用 `%%A01_*%%` 至 `%%A12_*%%`；四图幅使用 `%%SHEET_1_*%%` 至 `%%SHEET_4_*%%`；五仪表使用 `%%TOOL_1_*%%` 至 `%%TOOL_5_*%%`。
5. 唯一外部推广槽在 `field-notes/public-access-beacon.html`，使用 `%%AFFILIATE_URL%%`、`%%AFFILIATE_LABEL%%`、`%%AFFILIATE_DISCLOSURE%%`；保留紧邻披露、rel 与 target。
6. 入口变量：`%%REGISTER_TITLE%%`、`%%REGISTER_DESC%%`、`%%TOOLS_INDEX_TITLE%%`、`%%TOOLS_INDEX_DESC%%`；公开页使用各自前缀；错误页使用 `%%NOT_FOUND_TITLE%%`、`%%NOT_FOUND_DESC%%`。
7. 兼容入口变量：`%%COMPAT_ARTICLE_TITLE%%`、`%%COMPAT_ARTICLE_DESC%%`、`%%COMPAT_TOOL_TITLE%%`、`%%COMPAT_TOOL_DESC%%`、`%%COMPAT_LEGAL_TITLE%%`、`%%COMPAT_LEGAL_DESC%%`。
8. 不要引入远程字体、图片、CDN、统计或第三方脚本。工具算法或输入范围变更时，同步更新说明与完整测试。

## 发布前完整审计

- 运行三套静态审计，再渲染全部 36 页于 1440/768/390/360px 和纸张/夜航双主题。
- 复验菜单焦点与 Escape、主题持久化、筛选、阅读进度、复制竞态、404 文本搜索、无 JS 导航与五仪表正常/错误/上限/全角/Unicode 边界。
