# 084 Champagne Columnstage · 工作流 v2 接入契约

## 范围与风格

只制作完整网站模板，不写业务文章或教程，不部署。原 `salon.css` 字节保留，新 `salon-extension.css` 扩展四间内容厅、十二种文章组件、五台本地工具、七项公开说明与响应式。首页保留香槟柱廊、酒红幕布、拱顶舞台和全部原 `cc84-*` 首页类名。动态源包未取得，原包忠实度未核验；UI 验收不代替保真证明。

36 个 HTML：32 个可索引页、404、3 个 noindex 兼容入口。`registrationGuide` 只是工作流审计必需字段，实际指向通用访问凭条与披露组件，不是注册或开户教程。

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "program-register.html",
  "articles": [
    "programs/audience-program.html",
    "programs/question-stage.html",
    "programs/evidence-plinth.html",
    "programs/entry-arch.html",
    "programs/column-tension.html",
    "programs/sequence-cue.html",
    "programs/cadence-bill.html",
    "programs/change-bell.html",
    "programs/review-balcony.html",
    "programs/handoff-key.html",
    "programs/release-program.html",
    "programs/access-pass.html"
  ],
  "cornerstones": [
    "programs/audience-program.html",
    "programs/column-tension.html"
  ],
  "registrationGuide": "programs/access-pass.html",
  "articleCovers": {
    "programs/audience-program.html": {
      "display": "assets/programs/audience-program.webp",
      "og": "assets/programs/audience-program.png"
    },
    "programs/question-stage.html": {
      "display": "assets/programs/question-stage.webp",
      "og": "assets/programs/question-stage.png"
    },
    "programs/evidence-plinth.html": {
      "display": "assets/programs/evidence-plinth.webp",
      "og": "assets/programs/evidence-plinth.png"
    },
    "programs/entry-arch.html": {
      "display": "assets/programs/entry-arch.webp",
      "og": "assets/programs/entry-arch.png"
    },
    "programs/column-tension.html": {
      "display": "assets/programs/column-tension.webp",
      "og": "assets/programs/column-tension.png"
    },
    "programs/sequence-cue.html": {
      "display": "assets/programs/sequence-cue.webp",
      "og": "assets/programs/sequence-cue.png"
    },
    "programs/cadence-bill.html": {
      "display": "assets/programs/cadence-bill.webp",
      "og": "assets/programs/cadence-bill.png"
    },
    "programs/change-bell.html": {
      "display": "assets/programs/change-bell.webp",
      "og": "assets/programs/change-bell.png"
    },
    "programs/review-balcony.html": {
      "display": "assets/programs/review-balcony.webp",
      "og": "assets/programs/review-balcony.png"
    },
    "programs/handoff-key.html": {
      "display": "assets/programs/handoff-key.webp",
      "og": "assets/programs/handoff-key.png"
    },
    "programs/release-program.html": {
      "display": "assets/programs/release-program.webp",
      "og": "assets/programs/release-program.png"
    },
    "programs/access-pass.html": {
      "display": "assets/programs/access-pass.webp",
      "og": "assets/programs/access-pass.png"
    }
  },
  "categories": [
    {
      "path": "rooms/audience-room.html",
      "label": "观众厅",
      "articles": [
        "programs/audience-program.html",
        "programs/question-stage.html",
        "programs/evidence-plinth.html"
      ]
    },
    {
      "path": "rooms/composition-room.html",
      "label": "编排厅",
      "articles": [
        "programs/entry-arch.html",
        "programs/column-tension.html",
        "programs/sequence-cue.html"
      ]
    },
    {
      "path": "rooms/cadence-room.html",
      "label": "节奏厅",
      "articles": [
        "programs/cadence-bill.html",
        "programs/change-bell.html",
        "programs/review-balcony.html"
      ]
    },
    {
      "path": "rooms/stewardship-room.html",
      "label": "保管厅",
      "articles": [
        "programs/handoff-key.html",
        "programs/release-program.html",
        "programs/access-pass.html"
      ]
    }
  ],
  "toolIndex": "atelier-register.html",
  "tools": [
    "ateliers/column-stage.html",
    "ateliers/weighted-balcony.html",
    "ateliers/cue-sequence.html",
    "ateliers/cadence-call.html",
    "ateliers/coverage-curtain.html"
  ],
  "legal": {
    "about": "salon-charter.html",
    "contact": "editor-desk.html",
    "disclosure": "commercial-note.html",
    "disclaimer": "audience-boundary.html",
    "privacy": "local-atelier-privacy.html",
    "corrections": "correction-ledger.html",
    "editorial": "editorial-score.html"
  },
  "error404": "404.html",
  "robots": "robots.txt",
  "sitemap": "sitemap.xml",
  "feed": "feed.xml",
  "security": ".well-known/security.txt",
  "favicon": "favicon.ico",
  "appleTouchIcon": "apple-touch-icon.png",
  "socialImage": "assets/columnstage-cover.png",
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

1. 按页面和变量分组填入已核实内容；保留路径、`cc84-*` 类名、`data-cc84-*` 属性、ID、表单合同、结构化数据和链接关系。
2. 文章只需替换 `%%A01_*%%` 至 `%%A12_*%%` 等文字，不需要重做首屏、栏目页、正文组件、FAQ、工具、声明、响应式或双主题 UI。
3. 全局变量有 `%%LANG%%`、`%%SITE_DOMAIN%%`、`%%SITE_NAME%%`、`%%BRAND_EN%%`、`%%SITE_DESC%%`、`%%SITE_TAGLINE%%`、`%%INDEPENDENCE_NOTE%%`、`%%RISK_NOTE%%`。
   根入口的逐项占位符是 `%%HOME_TITLE%%`、`%%HERO_DESCRIPTION%%`、`%%HOME_SECTION_TITLE%%`、`%%HOME_SECTION_DESC%%`、`%%HOME_QUOTE%%`、`%%HOME_QUOTE_CREDIT%%`、`%%COMPAT_ARTICLE_TITLE%%`、`%%COMPAT_ARTICLE_DESC%%`、`%%COMPAT_TOOL_TITLE%%`、`%%COMPAT_TOOL_DESC%%`、`%%COMPAT_LEGAL_TITLE%%`、`%%COMPAT_LEGAL_DESC%%`、`%%NOT_FOUND_TITLE%%`、`%%NOT_FOUND_DESC%%`。
4. 首页变量有 `%%HOME_*%%`、`%%INVITE_TITLE%%`、`%%INVITE_CODE%%`、`%%BENEFIT_RATE%%`、`%%BENEFIT_DISCLAIMER%%`；所有比例、期限和条件必须按真实资料填写。
5. 唯一外部推广槽在 `programs/access-pass.html`，变量为 `%%AFFILIATE_URL%%`、`%%AFFILIATE_LABEL%%`、`%%AFFILIATE_DISCLOSURE%%`；保留紧邻披露、`rel` 与 `target`。
6. 分类使用 `%%ROOM_1_*%%` 至 `%%ROOM_4_*%%`；工具使用 `%%TOOL_1_*%%` 至 `%%TOOL_5_*%%`；公开说明使用 `%%ABOUT_*%%`、`%%CONTACT_*%%`、`%%DISCLOSURE_*%%`、`%%DISCLAIMER_*%%`、`%%PRIVACY_*%%`、`%%CORRECTIONS_*%%`、`%%EDITORIAL_*%%` 与 `%%CHANGELOG_*%%`。
7. 元数据与联系变量包括 `%%AUTHOR_NAME%%`、`%%CONTACT_EMAIL%%`、`%%SECURITY_EMAIL%%`、`%%SECURITY_EXPIRES%%`、`%%SITEMAP_LASTMOD%%`、`%%RSS_DATE_01%%` 至 `%%RSS_DATE_12%%`、`%%NOT_FOUND_*%%` 和 `%%COMPAT_*%%`。
8. 工具算法是固定框架；若改变范围或语义，必须同步更新界面说明、脚本和完整测试。不要引入远程字体、图片、CDN、统计或第三方脚本。

## 发布前完整审计

- 运行 `node tools/validate.js templates/084-champagne-columnstage`、`node tools/audit-template.js templates/084-champagne-columnstage`、`node tools/audit-workflow-readiness.js templates/084-champagne-columnstage`。
- 渲染 36 页在 1440 / 768 / 390 / 360 px 和晚场 / 晨场主题，检查横向溢出、坏图、坏链、控制台、触控尺寸与对比度。
- 复验菜单焦点与 Escape、主题持久化、筛选、阅读进度、复制失败/竞态、404 文本化搜索、无 JS 导航与五个工具的正常/错误/上限/全角/Unicode 边界。
