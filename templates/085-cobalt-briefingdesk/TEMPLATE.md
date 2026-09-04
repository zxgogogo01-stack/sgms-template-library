# 085 Cobalt Briefingdesk · 工作流 v2 接入契约

## 范围与风格

只制作完整网站 UI 模板，不写业务文章、注册教程或开户教程，不部署。原 `dispatch.css` 与 `briefing.js` 字节保留；`dispatch-extension.css` 和新脚本扩成四道工作桌、十二种正文组件、五件本地仪表、七项公开说明与完整响应式。首页保留钴蓝、信号橙、公共简报章、5W1H 六问板和全部十二个原始 `bd85-*` 首页类。动态源包未取得，原包忠实度未核验；UI 验收不代替保真证明。

36 个 HTML：32 个完整可展示页（其中 31 个为角色表可索引页，另含版本记录）、404、3 个 noindex 兼容入口。`registrationGuide` 仅为工作流审计字段，实际指向通用访问分发单与推广披露组件，不是教程。

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "brief-register.html",
  "articles": [
    "briefs/scope-card.html",
    "briefs/source-triage.html",
    "briefs/situation-snapshot.html",
    "briefs/assumption-split.html",
    "briefs/option-matrix.html",
    "briefs/confidence-band.html",
    "briefs/owner-line.html",
    "briefs/deadline-window.html",
    "briefs/escalation-route.html",
    "briefs/outcome-delta.html",
    "briefs/decision-log.html",
    "briefs/distribution-slip.html"
  ],
  "cornerstones": [
    "briefs/scope-card.html",
    "briefs/option-matrix.html"
  ],
  "registrationGuide": "briefs/distribution-slip.html",
  "articleCovers": {
    "briefs/scope-card.html": {
      "display": "assets/briefs/scope-card.webp",
      "og": "assets/briefs/scope-card.png"
    },
    "briefs/source-triage.html": {
      "display": "assets/briefs/source-triage.webp",
      "og": "assets/briefs/source-triage.png"
    },
    "briefs/situation-snapshot.html": {
      "display": "assets/briefs/situation-snapshot.webp",
      "og": "assets/briefs/situation-snapshot.png"
    },
    "briefs/assumption-split.html": {
      "display": "assets/briefs/assumption-split.webp",
      "og": "assets/briefs/assumption-split.png"
    },
    "briefs/option-matrix.html": {
      "display": "assets/briefs/option-matrix.webp",
      "og": "assets/briefs/option-matrix.png"
    },
    "briefs/confidence-band.html": {
      "display": "assets/briefs/confidence-band.webp",
      "og": "assets/briefs/confidence-band.png"
    },
    "briefs/owner-line.html": {
      "display": "assets/briefs/owner-line.webp",
      "og": "assets/briefs/owner-line.png"
    },
    "briefs/deadline-window.html": {
      "display": "assets/briefs/deadline-window.webp",
      "og": "assets/briefs/deadline-window.png"
    },
    "briefs/escalation-route.html": {
      "display": "assets/briefs/escalation-route.webp",
      "og": "assets/briefs/escalation-route.png"
    },
    "briefs/outcome-delta.html": {
      "display": "assets/briefs/outcome-delta.webp",
      "og": "assets/briefs/outcome-delta.png"
    },
    "briefs/decision-log.html": {
      "display": "assets/briefs/decision-log.webp",
      "og": "assets/briefs/decision-log.png"
    },
    "briefs/distribution-slip.html": {
      "display": "assets/briefs/distribution-slip.webp",
      "og": "assets/briefs/distribution-slip.png"
    }
  },
  "categories": [
    {
      "path": "desks/intake-desk.html",
      "label": "收件桌",
      "articles": [
        "briefs/scope-card.html",
        "briefs/source-triage.html",
        "briefs/situation-snapshot.html"
      ]
    },
    {
      "path": "desks/analysis-desk.html",
      "label": "研判桌",
      "articles": [
        "briefs/assumption-split.html",
        "briefs/option-matrix.html",
        "briefs/confidence-band.html"
      ]
    },
    {
      "path": "desks/action-desk.html",
      "label": "行动桌",
      "articles": [
        "briefs/owner-line.html",
        "briefs/deadline-window.html",
        "briefs/escalation-route.html"
      ]
    },
    {
      "path": "desks/review-desk.html",
      "label": "复盘桌",
      "articles": [
        "briefs/outcome-delta.html",
        "briefs/decision-log.html",
        "briefs/distribution-slip.html"
      ]
    }
  ],
  "toolIndex": "instrument-drawer.html",
  "tools": [
    "instruments/brief-completeness.html",
    "instruments/option-score.html",
    "instruments/raci-audit.html",
    "instruments/critical-path.html",
    "instruments/sensitivity-threshold.html"
  ],
  "legal": {
    "about": "operating-note.html",
    "contact": "contact-desk.html",
    "disclosure": "commercial-disclosure.html",
    "disclaimer": "reading-boundary.html",
    "privacy": "local-data-note.html",
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
  "socialImage": "assets/briefingdesk-cover.png",
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

1. 保留路径、`bd85-*` 类名、`data-bd85-*` 属性、表单合同、结构化数据和站内链接，只替换已核实文字。
2. 全局变量：`%%LANG%%`、`%%SITE_DOMAIN%%`、`%%SITE_NAME%%`、`%%BRAND_EN%%`、`%%SITE_DESC%%`、`%%SITE_TAGLINE%%`、`%%INDEPENDENCE_NOTE%%`、`%%RISK_NOTE%%`。
3. 首页逐项变量：`%%HOME_TITLE%%`、`%%HERO_DESCRIPTION%%`、`%%HOME_REVIEW_CADENCE%%`、`%%HOME_DATE%%`、`%%HOME_SECTION_TITLE%%`、`%%HOME_SECTION_DESC%%`、`%%HOME_QUOTE%%`、`%%HOME_QUOTE_CREDIT%%`、`%%INVITE_CODE%%`、`%%BENEFIT_RATE%%`、`%%BENEFIT_DISCLAIMER%%`；所有比例、期限、条件都必须依据真实资料填写。
4. 十二份简报使用 `%%A01_*%%` 至 `%%A12_*%%`，四个桌面使用 `%%DESK_1_*%%` 至 `%%DESK_4_*%%`，五件仪表使用 `%%TOOL_1_*%%` 至 `%%TOOL_5_*%%`。
5. 唯一外部推广槽在 `briefs/distribution-slip.html`，使用 `%%AFFILIATE_URL%%`、`%%AFFILIATE_LABEL%%`、`%%AFFILIATE_DISCLOSURE%%`；必须保留紧邻披露、rel 和 target。
6. 公开说明使用 `%%ABOUT_*%%`、`%%CONTACT_*%%`、`%%DISCLOSURE_*%%`、`%%DISCLAIMER_*%%`、`%%PRIVACY_*%%`、`%%CORRECTIONS_*%%`、`%%EDITORIAL_*%%`。先核实再写，不用教程填充正文。
7. 工具算法为固定 UI 框架；若修改输入范围或语义，必须同步更新脚本、说明和完整测试。不要引入远程字体、图片、CDN、统计或第三方脚本。
8. 桌面摘要逐项变量：`%%DESK_1_DESC%%`、`%%DESK_2_DESC%%`、`%%DESK_3_DESC%%`、`%%DESK_4_DESC%%`。兼容入口逐项变量：`%%COMPAT_ARTICLE_TITLE%%`、`%%COMPAT_ARTICLE_DESC%%`、`%%COMPAT_TOOL_TITLE%%`、`%%COMPAT_TOOL_DESC%%`、`%%COMPAT_LEGAL_TITLE%%`、`%%COMPAT_LEGAL_DESC%%`。错误页逐项变量：`%%NOT_FOUND_TITLE%%`、`%%NOT_FOUND_DESC%%`。

## 发布前完整审计

- 运行 `node tools/validate.js templates/085-cobalt-briefingdesk`、`node tools/audit-template.js templates/085-cobalt-briefingdesk`、`node tools/audit-workflow-readiness.js templates/085-cobalt-briefingdesk`。
- 渲染全部 36 页在 1440 / 768 / 390 / 360 px 与钴蓝 / 纸本主题，检查横向溢出、触控尺寸、重复 ID、坏图、坏链、控制台和网络错误。
- 复验菜单焦点与 Escape、主题持久化、筛选、阅读进度、复制成功/失败/竞态、404 文本搜索、无 JS 导航和五件仪表的正常/错误/上限/全角/Unicode 边界。
