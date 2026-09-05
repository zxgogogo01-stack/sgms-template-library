# 089 Sage Answerdesk · 工作流 v2 接入契约

## 范围与风格

只制作完整网站 UI 模板，不编写业务文章、说明性流程或生产内容，不部署。原 `switchboard.css` 与 `operator.js` 字节保留；扩展采用鼠尾草问答交换台、彩色跳线、圆形插孔、频率表与日间/夜间双主题。动态源包未取得，原包忠实度未核验。

36 个 HTML：31 个可收录页面、1 个版本记录、404、3 个 noindex 兼容入口。`registrationGuide` 仅是检查器兼容字段，实际为通用公开访问线路与推广披露组件，不承载流程说明。

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "answer-register.html",
  "articles": [
    "answer-lines/question-restatement.html",
    "answer-lines/condition-map.html",
    "answer-lines/time-scope.html",
    "answer-lines/primary-reference.html",
    "answer-lines/citation-date.html",
    "answer-lines/inference-label.html",
    "answer-lines/exception-router.html",
    "answer-lines/risk-escalation.html",
    "answer-lines/answer-version.html",
    "answer-lines/correction-signal.html",
    "answer-lines/faq-coverage.html",
    "answer-lines/public-access-line.html"
  ],
  "cornerstones": [
    "answer-lines/question-restatement.html",
    "answer-lines/primary-reference.html"
  ],
  "registrationGuide": "answer-lines/public-access-line.html",
  "articleCovers": {
    "answer-lines/question-restatement.html": {
      "display": "assets/answer-lines/question-restatement.webp",
      "og": "assets/answer-lines/question-restatement.png"
    },
    "answer-lines/condition-map.html": {
      "display": "assets/answer-lines/condition-map.webp",
      "og": "assets/answer-lines/condition-map.png"
    },
    "answer-lines/time-scope.html": {
      "display": "assets/answer-lines/time-scope.webp",
      "og": "assets/answer-lines/time-scope.png"
    },
    "answer-lines/primary-reference.html": {
      "display": "assets/answer-lines/primary-reference.webp",
      "og": "assets/answer-lines/primary-reference.png"
    },
    "answer-lines/citation-date.html": {
      "display": "assets/answer-lines/citation-date.webp",
      "og": "assets/answer-lines/citation-date.png"
    },
    "answer-lines/inference-label.html": {
      "display": "assets/answer-lines/inference-label.webp",
      "og": "assets/answer-lines/inference-label.png"
    },
    "answer-lines/exception-router.html": {
      "display": "assets/answer-lines/exception-router.webp",
      "og": "assets/answer-lines/exception-router.png"
    },
    "answer-lines/risk-escalation.html": {
      "display": "assets/answer-lines/risk-escalation.webp",
      "og": "assets/answer-lines/risk-escalation.png"
    },
    "answer-lines/answer-version.html": {
      "display": "assets/answer-lines/answer-version.webp",
      "og": "assets/answer-lines/answer-version.png"
    },
    "answer-lines/correction-signal.html": {
      "display": "assets/answer-lines/correction-signal.webp",
      "og": "assets/answer-lines/correction-signal.png"
    },
    "answer-lines/faq-coverage.html": {
      "display": "assets/answer-lines/faq-coverage.webp",
      "og": "assets/answer-lines/faq-coverage.png"
    },
    "answer-lines/public-access-line.html": {
      "display": "assets/answer-lines/public-access-line.webp",
      "og": "assets/answer-lines/public-access-line.png"
    }
  },
  "categories": [
    {
      "path": "channels/intake-channel.html",
      "label": "INTAKE",
      "articles": [
        "answer-lines/question-restatement.html",
        "answer-lines/condition-map.html",
        "answer-lines/time-scope.html"
      ]
    },
    {
      "path": "channels/evidence-channel.html",
      "label": "EVIDENCE",
      "articles": [
        "answer-lines/primary-reference.html",
        "answer-lines/citation-date.html",
        "answer-lines/inference-label.html"
      ]
    },
    {
      "path": "channels/boundary-channel.html",
      "label": "BOUNDARY",
      "articles": [
        "answer-lines/exception-router.html",
        "answer-lines/risk-escalation.html",
        "answer-lines/answer-version.html"
      ]
    },
    {
      "path": "channels/update-channel.html",
      "label": "UPDATE",
      "articles": [
        "answer-lines/correction-signal.html",
        "answer-lines/faq-coverage.html",
        "answer-lines/public-access-line.html"
      ]
    }
  ],
  "toolIndex": "operator-tools.html",
  "tools": [
    "operator-instruments/question-deduper.html",
    "operator-instruments/field-coverage.html",
    "operator-instruments/answer-age.html",
    "operator-instruments/source-tier.html",
    "operator-instruments/route-readiness.html"
  ],
  "legal": {
    "about": "answerdesk-charter.html",
    "contact": "contact-channel.html",
    "disclosure": "source-disclosure.html",
    "disclaimer": "answer-boundary.html",
    "privacy": "local-signal-privacy.html",
    "corrections": "correction-channel.html",
    "editorial": "editorial-switching.html"
  },
  "error404": "404.html",
  "robots": "robots.txt",
  "sitemap": "sitemap.xml",
  "feed": "feed.xml",
  "security": ".well-known/security.txt",
  "favicon": "favicon.ico",
  "appleTouchIcon": "apple-touch-icon.png",
  "socialImage": "assets/answerdesk-social.png",
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

1. 保留路径、`sa89-*` 类名、`data-sa89-*` 属性、ID、表单合同、结构化数据、图片尺寸与内链，只替换已核实文字。
2. 全局变量：`%%LANG%%`、`%%SITE_DOMAIN%%`、`%%SITE_NAME%%`、`%%BRAND_EN%%`、`%%SITE_DESC%%`、`%%SITE_TAGLINE%%`、`%%INDEPENDENCE_NOTE%%`、`%%CONTACT_EMAIL%%`。
3. 首页变量：`%%HOME_TITLE%%`、`%%HOME_DESC%%`、`%%HERO_TITLE_LINE_1%%`、`%%HERO_TITLE_LINE_2%%`、`%%HERO_DESCRIPTION%%`、`%%PRIMARY_CTA%%`、`%%SECONDARY_CTA%%`、`%%BOARD_LABEL%%`、`%%ACCESS_CARD_TITLE%%`、`%%ACCESS_CARD_DESC%%`、`%%HOME_CHANNELS_TITLE%%`、`%%HOME_CHANNELS_DESC%%`、`%%HOME_REGISTER_TITLE%%`、`%%HOME_REGISTER_DESC%%`、`%%HOME_MATRIX_TITLE%%`、`%%HOME_MATRIX_DESC%%`、`%%HOME_MATRIX_CAPTION%%`、`%%HOME_MATRIX_1_INPUT%%`、`%%HOME_MATRIX_1_OUTPUT%%`、`%%HOME_MATRIX_2_INPUT%%`、`%%HOME_MATRIX_2_OUTPUT%%`、`%%HOME_MATRIX_3_INPUT%%`、`%%HOME_MATRIX_3_OUTPUT%%`、`%%INVITE_CODE%%`、`%%BENEFIT_RATE%%`、`%%BENEFIT_DISCLAIMER%%`。
4. 十二个文章 UI 空壳使用 `%%A01_*%%` 至 `%%A12_*%%`；四个频道使用 `%%CHANNEL_1_TITLE%%`、`%%CHANNEL_1_DESC%%`、`%%CHANNEL_2_TITLE%%`、`%%CHANNEL_2_DESC%%`、`%%CHANNEL_3_TITLE%%`、`%%CHANNEL_3_DESC%%`、`%%CHANNEL_4_TITLE%%`、`%%CHANNEL_4_DESC%%` 及各自的 `*_ACCENT`；五件工具使用 `%%TOOL_1_*%%` 至 `%%TOOL_5_*%%`。
5. 唯一外部推广槽位位于 `answer-lines/public-access-line.html`，变量为 `%%AFFILIATE_URL%%`、`%%AFFILIATE_LABEL%%`、`%%AFFILIATE_DISCLOSURE%%`、`%%AFFILIATE_CTA%%`；必须保留紧邻披露、rel 和 target。
6. 索引变量：`%%REGISTER_TITLE%%`、`%%REGISTER_DESC%%`、`%%REGISTER_ACCENT%%`、`%%TOOLS_INDEX_TITLE%%`、`%%TOOLS_INDEX_DESC%%`、`%%TOOLS_INDEX_ACCENT%%`。公开页使用 `%%PUBLIC_*%%`；版本页使用 `%%CHANGELOG_*%%`；错误页使用 `%%NOT_FOUND_TITLE%%`、`%%NOT_FOUND_DESC%%`。
7. 兼容入口变量：`%%COMPAT_ARTICLE_TITLE%%`、`%%COMPAT_ARTICLE_DESC%%`、`%%COMPAT_TOOL_TITLE%%`、`%%COMPAT_TOOL_DESC%%`、`%%COMPAT_LEGAL_TITLE%%`、`%%COMPAT_LEGAL_DESC%%`。
8. 不引入远程字体、图片、CDN、统计或第三方脚本。五个工具均在浏览器本地运行；输入合同或算法变化时同步更新测试。

## 完整审计

- 运行三套静态审计和相似度检查。
- 渲染全部 36 页于 1440/768/390/360px、日间/夜间双主题。
- 复验菜单焦点/Escape、主题持久化、筛选、阅读进度、复制竞态、404 安全文本、无 JS 导航和五工具正常/错误/上限/全角/Unicode 边界。
