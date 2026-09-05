# 088 Umber Casebook · 工作流 v2 接入契约

## 范围与风格

只制作完整网站 UI 模板，不编写业务文章、说明教程或生产内容，不部署。原 `casefile.css` 与 `records.js` 字节保留；扩展采用赭色案卷、证物袋、索引签与纸张/暗房双主题。动态源包未取得，原包忠实度未核验。

36 个 HTML：32 个完整展示页、404、3 个 noindex 兼容入口。`registrationGuide` 仅是检查器兼容字段，实际为通用公开访问记录与推广披露组件，不承载教程。

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "case-register.html",
  "articles": [
    "case-notes/question-frame.html",
    "case-notes/event-timeline.html",
    "case-notes/scope-boundary.html",
    "case-notes/source-chain.html",
    "case-notes/custody-label.html",
    "case-notes/corroboration-grid.html",
    "case-notes/counterevidence-file.html",
    "case-notes/uncertainty-stamp.html",
    "case-notes/competing-explanations.html",
    "case-notes/decision-log.html",
    "case-notes/reopening-trigger.html",
    "case-notes/public-access-record.html"
  ],
  "cornerstones": [
    "case-notes/question-frame.html",
    "case-notes/source-chain.html"
  ],
  "registrationGuide": "case-notes/public-access-record.html",
  "articleCovers": {
    "case-notes/question-frame.html": {
      "display": "assets/case-notes/question-frame.webp",
      "og": "assets/case-notes/question-frame.png"
    },
    "case-notes/event-timeline.html": {
      "display": "assets/case-notes/event-timeline.webp",
      "og": "assets/case-notes/event-timeline.png"
    },
    "case-notes/scope-boundary.html": {
      "display": "assets/case-notes/scope-boundary.webp",
      "og": "assets/case-notes/scope-boundary.png"
    },
    "case-notes/source-chain.html": {
      "display": "assets/case-notes/source-chain.webp",
      "og": "assets/case-notes/source-chain.png"
    },
    "case-notes/custody-label.html": {
      "display": "assets/case-notes/custody-label.webp",
      "og": "assets/case-notes/custody-label.png"
    },
    "case-notes/corroboration-grid.html": {
      "display": "assets/case-notes/corroboration-grid.webp",
      "og": "assets/case-notes/corroboration-grid.png"
    },
    "case-notes/counterevidence-file.html": {
      "display": "assets/case-notes/counterevidence-file.webp",
      "og": "assets/case-notes/counterevidence-file.png"
    },
    "case-notes/uncertainty-stamp.html": {
      "display": "assets/case-notes/uncertainty-stamp.webp",
      "og": "assets/case-notes/uncertainty-stamp.png"
    },
    "case-notes/competing-explanations.html": {
      "display": "assets/case-notes/competing-explanations.webp",
      "og": "assets/case-notes/competing-explanations.png"
    },
    "case-notes/decision-log.html": {
      "display": "assets/case-notes/decision-log.webp",
      "og": "assets/case-notes/decision-log.png"
    },
    "case-notes/reopening-trigger.html": {
      "display": "assets/case-notes/reopening-trigger.webp",
      "og": "assets/case-notes/reopening-trigger.png"
    },
    "case-notes/public-access-record.html": {
      "display": "assets/case-notes/public-access-record.webp",
      "og": "assets/case-notes/public-access-record.png"
    }
  },
  "categories": [
    {
      "path": "case-desks/intake-desk.html",
      "label": "受理桌",
      "articles": [
        "case-notes/question-frame.html",
        "case-notes/event-timeline.html",
        "case-notes/scope-boundary.html"
      ]
    },
    {
      "path": "case-desks/evidence-desk.html",
      "label": "证物桌",
      "articles": [
        "case-notes/source-chain.html",
        "case-notes/custody-label.html",
        "case-notes/corroboration-grid.html"
      ]
    },
    {
      "path": "case-desks/challenge-desk.html",
      "label": "质证桌",
      "articles": [
        "case-notes/counterevidence-file.html",
        "case-notes/uncertainty-stamp.html",
        "case-notes/competing-explanations.html"
      ]
    },
    {
      "path": "case-desks/closure-desk.html",
      "label": "归档桌",
      "articles": [
        "case-notes/decision-log.html",
        "case-notes/reopening-trigger.html",
        "case-notes/public-access-record.html"
      ]
    }
  ],
  "toolIndex": "case-instruments.html",
  "tools": [
    "instruments/claim-state-inventory.html",
    "instruments/source-coverage.html",
    "instruments/timeline-gap.html",
    "instruments/chain-of-custody.html",
    "instruments/closure-gate.html"
  ],
  "legal": {
    "about": "casebook-charter.html",
    "contact": "contact-desk.html",
    "disclosure": "relationship-record.html",
    "disclaimer": "case-boundary.html",
    "privacy": "local-custody.html",
    "corrections": "correction-docket.html",
    "editorial": "editorial-protocol.html"
  },
  "error404": "404.html",
  "robots": "robots.txt",
  "sitemap": "sitemap.xml",
  "feed": "feed.xml",
  "security": ".well-known/security.txt",
  "favicon": "favicon.ico",
  "appleTouchIcon": "apple-touch-icon.png",
  "socialImage": "assets/casebook-cover.png",
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

1. 保留路径、`uc88-*` 类名、`data-uc88-*` 属性、ID、表单合同、结构化数据、图片尺寸与内链，只替换已核实文字。
2. 全局变量：`%%LANG%%`、`%%SITE_DOMAIN%%`、`%%SITE_NAME%%`、`%%BRAND_EN%%`、`%%SITE_DESC%%`、`%%SITE_TAGLINE%%`、`%%INDEPENDENCE_NOTE%%`、`%%AUTHOR_NAME%%`、`%%CONTACT_EMAIL%%`。
3. 首页变量：`%%HOME_TITLE%%`、`%%HERO_TITLE_LINE_1%%`、`%%HERO_TITLE_LINE_2%%`、`%%HERO_DESCRIPTION%%`、`%%PRIMARY_CTA%%`、`%%SECONDARY_CTA%%`、`%%ACCESS_CARD_TITLE%%`、`%%ACCESS_CARD_DESC%%`、`%%HOME_DESKS_TITLE%%`、`%%HOME_DESKS_DESC%%`、`%%HOME_REGISTER_TITLE%%`、`%%HOME_REGISTER_DESC%%`、`%%INVITE_CODE%%`、`%%BENEFIT_RATE%%`、`%%BENEFIT_DISCLAIMER%%`。
   首页展示还直接使用：`%%DESK_1_TITLE%%`、`%%DESK_1_DESC%%`、`%%DESK_2_TITLE%%`、`%%DESK_2_DESC%%`、`%%DESK_3_TITLE%%`、`%%DESK_3_DESC%%`、`%%DESK_4_TITLE%%`、`%%DESK_4_DESC%%`、`%%A01_TITLE%%`、`%%A01_DESC%%`、`%%A02_TITLE%%`、`%%A02_DESC%%`、`%%A03_TITLE%%`、`%%A03_DESC%%`、`%%A04_TITLE%%`、`%%A04_DESC%%`。
4. 十二个文章 UI 空壳使用 `%%A01_*%%` 至 `%%A12_*%%`；四个分类使用 `%%DESK_1_*%%` 至 `%%DESK_4_*%%`；五件工具使用 `%%TOOL_1_*%%` 至 `%%TOOL_5_*%%`。
5. 唯一外部推广槽位位于 `case-notes/public-access-record.html`，变量为 `%%AFFILIATE_URL%%`、`%%AFFILIATE_LABEL%%`、`%%AFFILIATE_DISCLOSURE%%`；必须保留紧邻披露、rel 和 target。
6. 索引变量：`%%REGISTER_TITLE%%`、`%%REGISTER_DESC%%`、`%%REGISTER_ACCENT%%`、`%%TOOLS_INDEX_TITLE%%`、`%%TOOLS_INDEX_DESC%%`、`%%TOOLS_INDEX_ACCENT%%`。公开页使用 `%%PUBLIC_*%%`；错误页使用 `%%NOT_FOUND_TITLE%%`、`%%NOT_FOUND_DESC%%`。
7. 兼容入口变量：`%%COMPAT_ARTICLE_TITLE%%`、`%%COMPAT_ARTICLE_DESC%%`、`%%COMPAT_TOOL_TITLE%%`、`%%COMPAT_TOOL_DESC%%`、`%%COMPAT_LEGAL_TITLE%%`、`%%COMPAT_LEGAL_DESC%%`。
8. 不引入远程字体、图片、CDN、统计或第三方脚本。五个工具均在浏览器本地运行；输入合同或算法变化时同步更新测试。

## 完整审计

- 运行三套静态审计和相似度检查。
- 渲染全部 36 页于 1440/768/390/360px、纸张/暗房双主题。
- 复验菜单焦点/Escape、主题持久化、筛选、阅读进度、复制竞态、404 安全文本、无 JS 导航和五工具正常/错误/上限/全角/Unicode 边界。
