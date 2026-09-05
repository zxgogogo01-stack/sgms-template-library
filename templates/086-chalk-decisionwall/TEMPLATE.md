# 086 Chalk Decisionwall · 工作流 v2 接入契约

## 范围与风格

只制作完整网站 UI 模板，不写业务文章、注册教程或开户教程，不部署。原 `decisionwall.css` 与 `wallroom.js` 字节保留；新扩展保留夜间黑板/日光板、问题便签、反证托盘、粉笔状态线、四轮流程和全部十二个原始首页类。动态源包未取得，原包忠实度未核验；UI 验收不代替保真证明。

36 个 HTML：32 个完整展示页、404、3 个 noindex 兼容入口。`registrationGuide` 只是工作流字段，实际指向通用公开访问卡与推广披露组件，不是教程。

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "wall-register.html",
  "articles": [
    "notes/decision-question.html",
    "notes/scope-boundary.html",
    "notes/constraint-tape.html",
    "notes/criteria-deck.html",
    "notes/weight-rationale.html",
    "notes/hard-gate.html",
    "notes/evidence-board.html",
    "notes/counterproof-switch.html",
    "notes/uncertainty-window.html",
    "notes/decision-record.html",
    "notes/outcome-review.html",
    "notes/public-entry-card.html"
  ],
  "cornerstones": [
    "notes/decision-question.html",
    "notes/evidence-board.html"
  ],
  "registrationGuide": "notes/public-entry-card.html",
  "articleCovers": {
    "notes/decision-question.html": {
      "display": "assets/notes/decision-question.webp",
      "og": "assets/notes/decision-question.png"
    },
    "notes/scope-boundary.html": {
      "display": "assets/notes/scope-boundary.webp",
      "og": "assets/notes/scope-boundary.png"
    },
    "notes/constraint-tape.html": {
      "display": "assets/notes/constraint-tape.webp",
      "og": "assets/notes/constraint-tape.png"
    },
    "notes/criteria-deck.html": {
      "display": "assets/notes/criteria-deck.webp",
      "og": "assets/notes/criteria-deck.png"
    },
    "notes/weight-rationale.html": {
      "display": "assets/notes/weight-rationale.webp",
      "og": "assets/notes/weight-rationale.png"
    },
    "notes/hard-gate.html": {
      "display": "assets/notes/hard-gate.webp",
      "og": "assets/notes/hard-gate.png"
    },
    "notes/evidence-board.html": {
      "display": "assets/notes/evidence-board.webp",
      "og": "assets/notes/evidence-board.png"
    },
    "notes/counterproof-switch.html": {
      "display": "assets/notes/counterproof-switch.webp",
      "og": "assets/notes/counterproof-switch.png"
    },
    "notes/uncertainty-window.html": {
      "display": "assets/notes/uncertainty-window.webp",
      "og": "assets/notes/uncertainty-window.png"
    },
    "notes/decision-record.html": {
      "display": "assets/notes/decision-record.webp",
      "og": "assets/notes/decision-record.png"
    },
    "notes/outcome-review.html": {
      "display": "assets/notes/outcome-review.webp",
      "og": "assets/notes/outcome-review.png"
    },
    "notes/public-entry-card.html": {
      "display": "assets/notes/public-entry-card.webp",
      "og": "assets/notes/public-entry-card.png"
    }
  },
  "categories": [
    {
      "path": "walls/frame-wall.html",
      "label": "问题墙",
      "articles": [
        "notes/decision-question.html",
        "notes/scope-boundary.html",
        "notes/constraint-tape.html"
      ]
    },
    {
      "path": "walls/criteria-wall.html",
      "label": "标准墙",
      "articles": [
        "notes/criteria-deck.html",
        "notes/weight-rationale.html",
        "notes/hard-gate.html"
      ]
    },
    {
      "path": "walls/challenge-wall.html",
      "label": "反证墙",
      "articles": [
        "notes/evidence-board.html",
        "notes/counterproof-switch.html",
        "notes/uncertainty-window.html"
      ]
    },
    {
      "path": "walls/review-wall.html",
      "label": "复盘墙",
      "articles": [
        "notes/decision-record.html",
        "notes/outcome-review.html",
        "notes/public-entry-card.html"
      ]
    }
  ],
  "toolIndex": "chalk-instruments.html",
  "tools": [
    "calculators/pairwise-vote.html",
    "calculators/weight-reduction.html",
    "calculators/evidence-balance.html",
    "calculators/gate-coverage.html",
    "calculators/minimax-regret.html"
  ],
  "legal": {
    "about": "wall-charter.html",
    "contact": "contact-board.html",
    "disclosure": "relationship-note.html",
    "disclaimer": "decision-boundary.html",
    "privacy": "local-wall-privacy.html",
    "corrections": "correction-chalkline.html",
    "editorial": "editorial-method.html"
  },
  "error404": "404.html",
  "robots": "robots.txt",
  "sitemap": "sitemap.xml",
  "feed": "feed.xml",
  "security": ".well-known/security.txt",
  "favicon": "favicon.ico",
  "appleTouchIcon": "apple-touch-icon.png",
  "socialImage": "assets/decisionwall-cover.png",
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

1. 保留路径、`dw86-*` 类名、`data-dw86-*` 属性、ID、表单合同、结构化数据和内链，只替换已核实文字。
2. 全局变量：`%%LANG%%`、`%%SITE_DOMAIN%%`、`%%SITE_NAME%%`、`%%BRAND_EN%%`、`%%SITE_DESC%%`、`%%SITE_TAGLINE%%`、`%%INDEPENDENCE_NOTE%%`、`%%RISK_NOTE%%`。
3. 首页逐项变量：`%%HOME_TITLE%%`、`%%HERO_DESCRIPTION%%`、`%%HOME_NOTE_1%%`、`%%HOME_NOTE_2%%`、`%%HOME_NOTE_3%%`、`%%HOME_CHALLENGE_TITLE%%`、`%%HOME_CHALLENGE_QUOTE%%`、`%%HOME_CHALLENGE_CREDIT%%`、`%%HOME_EVIDENCE_STATE%%`、`%%HOME_CHALLENGE_DETAIL%%`、`%%HOME_SECTION_TITLE%%`、`%%HOME_SECTION_DESC%%`、`%%HOME_VERDICT_TITLE%%`、`%%HOME_QUOTE%%`、`%%HOME_QUOTE_CREDIT%%`、`%%INVITE_CODE%%`、`%%BENEFIT_RATE%%`、`%%BENEFIT_DISCLAIMER%%`。
4. 十二篇使用 `%%A01_*%%` 至 `%%A12_*%%`；四墙使用 `%%WALL_1_*%%` 至 `%%WALL_4_*%%`，首页摘要逐项变量为 `%%WALL_1_DESC%%`、`%%WALL_2_DESC%%`、`%%WALL_3_DESC%%`、`%%WALL_4_DESC%%`；五工具使用 `%%TOOL_1_*%%` 至 `%%TOOL_5_*%%`。
5. 唯一外部推广槽在 `notes/public-entry-card.html`，使用 `%%AFFILIATE_URL%%`、`%%AFFILIATE_LABEL%%`、`%%AFFILIATE_DISCLOSURE%%`；保留紧邻披露、rel 与 target。
6. 公开说明使用 `%%ABOUT_*%%`、`%%CONTACT_*%%`、`%%DISCLOSURE_*%%`、`%%DISCLAIMER_*%%`、`%%PRIVACY_*%%`、`%%CORRECTIONS_*%%`、`%%EDITORIAL_*%%`。入口变量：`%%REGISTER_TITLE%%`、`%%REGISTER_DESC%%`、`%%TOOLS_INDEX_TITLE%%`、`%%TOOLS_INDEX_DESC%%`。
7. 兼容入口变量：`%%COMPAT_ARTICLE_TITLE%%`、`%%COMPAT_ARTICLE_DESC%%`、`%%COMPAT_TOOL_TITLE%%`、`%%COMPAT_TOOL_DESC%%`、`%%COMPAT_LEGAL_TITLE%%`、`%%COMPAT_LEGAL_DESC%%`；错误页变量：`%%NOT_FOUND_TITLE%%`、`%%NOT_FOUND_DESC%%`。
8. 工具算法是固定 UI 框架；改变输入范围或语义时同步更新脚本、说明和完整测试。不要引入远程字体、图片、CDN、统计或第三方脚本。

## 发布前完整审计

- 运行三套静态审计，再渲染全部 36 页于 1440/768/390/360px 和夜间/日光双主题。
- 复验菜单焦点与 Escape、主题持久化、筛选、阅读进度、复制成功/失败/竞态、404 文本搜索、无 JS 导航和五工具正常/错误/上限/全角/Unicode 边界。
