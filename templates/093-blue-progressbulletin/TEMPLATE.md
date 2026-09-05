# 093-blue-progressbulletin

## 交付定位

钴蓝工业进度公报的 workflow-ready v2 完整 UI 框架。后续 AI 只替换已声明变量与核实后的状态文字，不增加页面、组件、工具、资源或导航。模板不包含可发布业务文章。

## 强制使用规则

1. 保留 bp93- 类名、data-bp93-* 钩子、路径和脚本。
2. 十二个正文外壳分别使用 acceptance、evidence、definition、active、owner、dependency、risk、fallback、gate、delta、correction、access 组件，不互换结构。
3. 唯一 AFFILIATE_URL 静态链接只保留在 reports/public-signal.html；首页只展示识别码、利益点与条件脚注。
4. 五个本地核对台的算法、错误态、极限态、重置、复制和人工复核 Guide 已完成，后续不重写。

## 页面与变量

- 全局、首页、访问位、日期、正文、分类、工具、公开页与修订页中的大写双百分号字段均为可换字 UI 槽位，不需要增加结构。
- 唯一推广目标变量为 %%AFFILIATE_URL%%；站点域名、名称、英文标识、识别码、利益点与条件脚注均已登记在角色表。

## 工具合同

五个工具均限制 1–300 个非空行和 40,000 个 Unicode 字符，执行 NFKC，拒绝控制符与不完整 Unicode；使用 textContent 输出，覆盖重复、非法枚举、数字与依赖、错误聚焦、重置、旧结果失效、完整复制和异步复制竞态。

## 发布前模板验收

运行三套静态审计、全库相似度检查和浏览器全页、双主题、四视口、五工具边界审计。

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "bulletin-register.html",
  "articles": [
    "reports/accepted-scope.html",
    "reports/evidence-ledger.html",
    "reports/definition-of-done.html",
    "reports/active-node.html",
    "reports/owner-handoff.html",
    "reports/dependency-window.html",
    "reports/risk-signal.html",
    "reports/fallback-route.html",
    "reports/decision-gate.html",
    "reports/status-change.html",
    "reports/correction-window.html",
    "reports/public-signal.html"
  ],
  "cornerstones": [
    "reports/accepted-scope.html",
    "reports/risk-signal.html"
  ],
  "registrationGuide": "reports/public-signal.html",
  "articleCovers": {
    "reports/accepted-scope.html": {
      "display": "assets/reports/accepted-scope.webp",
      "og": "assets/reports/accepted-scope.png"
    },
    "reports/evidence-ledger.html": {
      "display": "assets/reports/evidence-ledger.webp",
      "og": "assets/reports/evidence-ledger.png"
    },
    "reports/definition-of-done.html": {
      "display": "assets/reports/definition-of-done.webp",
      "og": "assets/reports/definition-of-done.png"
    },
    "reports/active-node.html": {
      "display": "assets/reports/active-node.webp",
      "og": "assets/reports/active-node.png"
    },
    "reports/owner-handoff.html": {
      "display": "assets/reports/owner-handoff.webp",
      "og": "assets/reports/owner-handoff.png"
    },
    "reports/dependency-window.html": {
      "display": "assets/reports/dependency-window.webp",
      "og": "assets/reports/dependency-window.png"
    },
    "reports/risk-signal.html": {
      "display": "assets/reports/risk-signal.webp",
      "og": "assets/reports/risk-signal.png"
    },
    "reports/fallback-route.html": {
      "display": "assets/reports/fallback-route.webp",
      "og": "assets/reports/fallback-route.png"
    },
    "reports/decision-gate.html": {
      "display": "assets/reports/decision-gate.webp",
      "og": "assets/reports/decision-gate.png"
    },
    "reports/status-change.html": {
      "display": "assets/reports/status-change.webp",
      "og": "assets/reports/status-change.png"
    },
    "reports/correction-window.html": {
      "display": "assets/reports/correction-window.webp",
      "og": "assets/reports/correction-window.png"
    },
    "reports/public-signal.html": {
      "display": "assets/reports/public-signal.webp",
      "og": "assets/reports/public-signal.png"
    }
  },
  "categories": [
    {
      "path": "desks/accepted-board.html",
      "label": "验收台",
      "articles": [
        "reports/accepted-scope.html",
        "reports/evidence-ledger.html",
        "reports/definition-of-done.html"
      ]
    },
    {
      "path": "desks/active-board.html",
      "label": "进行台",
      "articles": [
        "reports/active-node.html",
        "reports/owner-handoff.html",
        "reports/dependency-window.html"
      ]
    },
    {
      "path": "desks/risk-board.html",
      "label": "风险台",
      "articles": [
        "reports/risk-signal.html",
        "reports/fallback-route.html",
        "reports/decision-gate.html"
      ]
    },
    {
      "path": "desks/decision-board.html",
      "label": "变更台",
      "articles": [
        "reports/status-change.html",
        "reports/correction-window.html",
        "reports/public-signal.html"
      ]
    }
  ],
  "toolIndex": "bulletin-tools.html",
  "tools": [
    "calculators/schedule-delta.html",
    "calculators/scope-gate.html",
    "calculators/dependency-order.html",
    "calculators/risk-register.html",
    "calculators/milestone-chain.html"
  ],
  "legal": {
    "about": "about-bureau.html",
    "contact": "contact-window.html",
    "disclosure": "relationship-register.html",
    "disclaimer": "scope-method.html",
    "privacy": "privacy-record.html",
    "corrections": "correction-register.html",
    "editorial": "editorial-method.html"
  },
  "error404": "404.html",
  "robots": "robots.txt",
  "sitemap": "sitemap.xml",
  "feed": "feed.xml",
  "security": ".well-known/security.txt",
  "favicon": "favicon.ico",
  "appleTouchIcon": "apple-touch-icon.png",
  "socialImage": "assets/bulletin-social.png",
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

- %%ACCEPTED_COUNT%%
- %%ACCESS_CTA%%
- %%ACCESS_TITLE%%
- %%ACTIVE_COUNT%%
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
- %%CHANGELOG_ACCENT%%
- %%CHANGELOG_DESC%%
- %%CHANGE_REASON%%
- %%COVER_ALT%%
- %%COVER_CAPTION%%
- %%DELTA_LABEL%%
- %%DELTA_VALUE%%
- %%DESK_ACCENT%%
- %%DESK_DESC%%
- %%FAQ_1_ANSWER%%
- %%FAQ_1_QUESTION%%
- %%FAQ_2_ANSWER%%
- %%FAQ_2_QUESTION%%
- %%HERO_ACCENT%%
- %%HERO_DESC%%
- %%HERO_TITLE%%
- %%INVITE_CODE%%
- %%LANG%%
- %%MODIFIED_LABEL%%
- %%MODULE_ITEM_1_TEXT%%
- %%MODULE_ITEM_2_TEXT%%
- %%MODULE_ITEM_3_TEXT%%
- %%MODULE_ITEM_4_TEXT%%
- %%MODULE_TITLE%%
- %%NEW_STATEMENT%%
- %%NEXT_GATE_DAY%%
- %%NEXT_GATE_LABEL%%
- %%NEXT_GATE_MONTH%%
- %%NEXT_GATE_TITLE%%
- %%OLD_STATEMENT%%
- %%PROGRESS_VALUE%%
- %%PUBLIC_ACCENT%%
- %%PUBLIC_SECTION_1_BODY%%
- %%PUBLIC_SECTION_1_TITLE%%
- %%PUBLIC_SECTION_2_BODY%%
- %%PUBLIC_SECTION_2_TITLE%%
- %%PUBLIC_SECTION_3_BODY%%
- %%PUBLIC_SECTION_3_TITLE%%
- %%READ_TIME%%
- %%REPORTING_WINDOW%%
- %%RISK_COUNT%%
- %%SECTION_1_BODY%%
- %%SECTION_1_TITLE%%
- %%SECTION_2_BODY%%
- %%SECTION_2_TITLE%%
- %%SECTION_3_BODY%%
- %%SECTION_3_TITLE%%
- %%SECTION_4_BODY%%
- %%SECTION_4_TITLE%%
- %%SITE_DESC%%
- %%SITE_DOMAIN%%
- %%SITE_NAME%%
- %%SITE_TAGLINE%%
- %%TIME_VALUE%%
- %%TOOL_GUIDE_1%%
- %%TOOL_GUIDE_2%%
- %%TOOL_GUIDE_3%%
- %%TOOL_GUIDE_4%%
- %%TOOL_GUIDE_5%%
