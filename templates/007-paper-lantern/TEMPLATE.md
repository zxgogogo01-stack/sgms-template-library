# 007-paper-lantern

## 模板定位

纸张、朱红书脊与灯下校样构成的高端概念词典。它不是注册教程成品，也不包含任何交易所事实；下游 AI 只负责替换站点变量、经核实的正文和文章字段，不需要重新设计 UI、补页面、写工具逻辑或生成通用视觉资产。

## 使用顺序

1. 先替换全站变量并确定站点语言、域名和品牌。
2. 逐个填写 12 个词条外壳；保留三种版式与既有页面职责。
3. 只在 registrationGuide 角色页填写经核实的注册类正文；该页恰有一个注册链接槽位，其他页面不要增加交易所直链。
4. 按真实来源填写作者、日期、问答与图片替代文本，运行三套审计和浏览器验收后再进入单站发布流程。

## 全站替换变量

- `{{SITE_NAME}}`、`{{SITE_DOMAIN}}`、`{{SITE_TAGLINE}}`、`{{SITE_DESC}}`、`{{BRAND_EN}}`
- `{{LANG}}`、`{{YEAR}}`、`{{CONTACT_EMAIL}}`、`{{AUTHOR_NAME}}`、`{{AUTHOR_BIO}}`
- `{{DATE_PUBLISHED}}`、`{{DATE_MODIFIED}}`
- `{{INVITE_CODE}}`、`{{BENEFIT_RATE}}`、`{{BENEFIT_DISCLAIMER}}`
- `{{AFFILIATE_URL}}`、`{{AFFILIATE_CTA}}`
- `{{SHELF_ENTRY_INTRO}}`、`{{SHELF_EVIDENCE_INTRO}}`、`{{SHELF_DECISION_INTRO}}`
- `{{ABOUT_SCOPE}}`、`{{ABOUT_USE}}`、`{{CONTACT_POLICY}}`、`{{CORRECTIONS_LOG}}`

## 文章字段映射

- `A01`：{{A01_TITLE}}。该前缀下包含 `TITLE`、`DESC`、`LEAD`、`READING`、`COVER_ALT`、`COVER_CAPTION`、正文结构字段与两组 FAQ 字段；必须按页面逐项填写，不复制上一页内容。
- `A02`：{{A02_TITLE}}。该前缀下包含 `TITLE`、`DESC`、`LEAD`、`READING`、`COVER_ALT`、`COVER_CAPTION`、正文结构字段与两组 FAQ 字段；必须按页面逐项填写，不复制上一页内容。
- `A03`：{{A03_TITLE}}。该前缀下包含 `TITLE`、`DESC`、`LEAD`、`READING`、`COVER_ALT`、`COVER_CAPTION`、正文结构字段与两组 FAQ 字段；必须按页面逐项填写，不复制上一页内容。
- `A04`：{{A04_TITLE}}。该前缀下包含 `TITLE`、`DESC`、`LEAD`、`READING`、`COVER_ALT`、`COVER_CAPTION`、正文结构字段与两组 FAQ 字段；必须按页面逐项填写，不复制上一页内容。
- `A05`：{{A05_TITLE}}。该前缀下包含 `TITLE`、`DESC`、`LEAD`、`READING`、`COVER_ALT`、`COVER_CAPTION`、正文结构字段与两组 FAQ 字段；必须按页面逐项填写，不复制上一页内容。
- `A06`：{{A06_TITLE}}。该前缀下包含 `TITLE`、`DESC`、`LEAD`、`READING`、`COVER_ALT`、`COVER_CAPTION`、正文结构字段与两组 FAQ 字段；必须按页面逐项填写，不复制上一页内容。
- `A07`：{{A07_TITLE}}。该前缀下包含 `TITLE`、`DESC`、`LEAD`、`READING`、`COVER_ALT`、`COVER_CAPTION`、正文结构字段与两组 FAQ 字段；必须按页面逐项填写，不复制上一页内容。
- `A08`：{{A08_TITLE}}。该前缀下包含 `TITLE`、`DESC`、`LEAD`、`READING`、`COVER_ALT`、`COVER_CAPTION`、正文结构字段与两组 FAQ 字段；必须按页面逐项填写，不复制上一页内容。
- `A09`：{{A09_TITLE}}。该前缀下包含 `TITLE`、`DESC`、`LEAD`、`READING`、`COVER_ALT`、`COVER_CAPTION`、正文结构字段与两组 FAQ 字段；必须按页面逐项填写，不复制上一页内容。
- `A10`：{{A10_TITLE}}。该前缀下包含 `TITLE`、`DESC`、`LEAD`、`READING`、`COVER_ALT`、`COVER_CAPTION`、正文结构字段与两组 FAQ 字段；必须按页面逐项填写，不复制上一页内容。
- `A11`：{{A11_TITLE}}。该前缀下包含 `TITLE`、`DESC`、`LEAD`、`READING`、`COVER_ALT`、`COVER_CAPTION`、正文结构字段与两组 FAQ 字段；必须按页面逐项填写，不复制上一页内容。
- `A12`：{{A12_TITLE}}。该前缀下包含 `TITLE`、`DESC`、`LEAD`、`READING`、`COVER_ALT`、`COVER_CAPTION`、正文结构字段与两组 FAQ 字段；必须按页面逐项填写，不复制上一页内容。

三种文章外壳分别是定义页、对照页和顺序页。字段后缀以对应 HTML 为准；所有占位符均为文字槽位，不代表事实。封面 PNG/WebP 已按词条语义生成，填内容时只需核对 alt 与 caption。

## 实际占位符清单

- `{{A01_BODY_1}}`
- `{{A01_BODY_2}}`
- `{{A01_BOUNDARY}}`
- `{{A01_COVER_ALT}}`
- `{{A01_COVER_CAPTION}}`
- `{{A01_DESC}}`
- `{{A01_FAQ_A1}}`
- `{{A01_FAQ_A2}}`
- `{{A01_FAQ_Q1}}`
- `{{A01_FAQ_Q2}}`
- `{{A01_H2_1}}`
- `{{A01_LEAD}}`
- `{{A01_READING}}`
- `{{A01_STEP_1}}`
- `{{A01_STEP_2}}`
- `{{A01_STEP_3}}`
- `{{A01_STEP_NOTE_1}}`
- `{{A01_STEP_NOTE_2}}`
- `{{A01_STEP_NOTE_3}}`
- `{{A01_TITLE}}`
- `{{A02_BODY_1}}`
- `{{A02_BODY_2}}`
- `{{A02_BODY_3}}`
- `{{A02_BOUNDARY}}`
- `{{A02_CONTEXT}}`
- `{{A02_COVER_ALT}}`
- `{{A02_COVER_CAPTION}}`
- `{{A02_DEFINITION}}`
- `{{A02_DESC}}`
- `{{A02_FAQ_A1}}`
- `{{A02_FAQ_A2}}`
- `{{A02_FAQ_Q1}}`
- `{{A02_FAQ_Q2}}`
- `{{A02_H2_1}}`
- `{{A02_H2_2}}`
- `{{A02_LEAD}}`
- `{{A02_NEAR_TERM}}`
- `{{A02_READING}}`
- `{{A02_TITLE}}`
- `{{A03_BODY_1}}`
- `{{A03_CELL_A1}}`
- `{{A03_CELL_A2}}`
- `{{A03_CELL_B1}}`
- `{{A03_CELL_B2}}`
- `{{A03_COVER_ALT}}`
- `{{A03_COVER_CAPTION}}`
- `{{A03_DESC}}`
- `{{A03_FAQ_A1}}`
- `{{A03_FAQ_A2}}`
- `{{A03_FAQ_Q1}}`
- `{{A03_FAQ_Q2}}`
- `{{A03_H2_1}}`
- `{{A03_LEAD}}`
- `{{A03_QUOTE}}`
- `{{A03_READING}}`
- `{{A03_ROW_1}}`
- `{{A03_ROW_2}}`
- `{{A03_SIDE_A}}`
- `{{A03_SIDE_B}}`
- `{{A03_TERM_A}}`
- `{{A03_TERM_B}}`
- `{{A03_TITLE}}`
- `{{A04_BODY_1}}`
- `{{A04_BODY_2}}`
- `{{A04_BODY_3}}`
- `{{A04_BOUNDARY}}`
- `{{A04_CONTEXT}}`
- `{{A04_COVER_ALT}}`
- `{{A04_COVER_CAPTION}}`
- `{{A04_DEFINITION}}`
- `{{A04_DESC}}`
- `{{A04_FAQ_A1}}`
- `{{A04_FAQ_A2}}`
- `{{A04_FAQ_Q1}}`
- `{{A04_FAQ_Q2}}`
- `{{A04_H2_1}}`
- `{{A04_H2_2}}`
- `{{A04_LEAD}}`
- `{{A04_NEAR_TERM}}`
- `{{A04_READING}}`
- `{{A04_TITLE}}`
- `{{A05_BODY_1}}`
- `{{A05_BODY_2}}`
- `{{A05_BOUNDARY}}`
- `{{A05_COVER_ALT}}`
- `{{A05_COVER_CAPTION}}`
- `{{A05_DESC}}`
- `{{A05_FAQ_A1}}`
- `{{A05_FAQ_A2}}`
- `{{A05_FAQ_Q1}}`
- `{{A05_FAQ_Q2}}`
- `{{A05_H2_1}}`
- `{{A05_LEAD}}`
- `{{A05_READING}}`
- `{{A05_STEP_1}}`
- `{{A05_STEP_2}}`
- `{{A05_STEP_3}}`
- `{{A05_STEP_NOTE_1}}`
- `{{A05_STEP_NOTE_2}}`
- `{{A05_STEP_NOTE_3}}`
- `{{A05_TITLE}}`
- `{{A06_BODY_1}}`
- `{{A06_CELL_A1}}`
- `{{A06_CELL_A2}}`
- `{{A06_CELL_B1}}`
- `{{A06_CELL_B2}}`
- `{{A06_COVER_ALT}}`
- `{{A06_COVER_CAPTION}}`
- `{{A06_DESC}}`
- `{{A06_FAQ_A1}}`
- `{{A06_FAQ_A2}}`
- `{{A06_FAQ_Q1}}`
- `{{A06_FAQ_Q2}}`
- `{{A06_H2_1}}`
- `{{A06_LEAD}}`
- `{{A06_QUOTE}}`
- `{{A06_READING}}`
- `{{A06_ROW_1}}`
- `{{A06_ROW_2}}`
- `{{A06_SIDE_A}}`
- `{{A06_SIDE_B}}`
- `{{A06_TERM_A}}`
- `{{A06_TERM_B}}`
- `{{A06_TITLE}}`
- `{{A07_BODY_1}}`
- `{{A07_BODY_2}}`
- `{{A07_BODY_3}}`
- `{{A07_BOUNDARY}}`
- `{{A07_CONTEXT}}`
- `{{A07_COVER_ALT}}`
- `{{A07_COVER_CAPTION}}`
- `{{A07_DEFINITION}}`
- `{{A07_DESC}}`
- `{{A07_FAQ_A1}}`
- `{{A07_FAQ_A2}}`
- `{{A07_FAQ_Q1}}`
- `{{A07_FAQ_Q2}}`
- `{{A07_H2_1}}`
- `{{A07_H2_2}}`
- `{{A07_LEAD}}`
- `{{A07_NEAR_TERM}}`
- `{{A07_READING}}`
- `{{A07_TITLE}}`
- `{{A08_BODY_1}}`
- `{{A08_BODY_2}}`
- `{{A08_BOUNDARY}}`
- `{{A08_COVER_ALT}}`
- `{{A08_COVER_CAPTION}}`
- `{{A08_DESC}}`
- `{{A08_FAQ_A1}}`
- `{{A08_FAQ_A2}}`
- `{{A08_FAQ_Q1}}`
- `{{A08_FAQ_Q2}}`
- `{{A08_H2_1}}`
- `{{A08_LEAD}}`
- `{{A08_READING}}`
- `{{A08_STEP_1}}`
- `{{A08_STEP_2}}`
- `{{A08_STEP_3}}`
- `{{A08_STEP_NOTE_1}}`
- `{{A08_STEP_NOTE_2}}`
- `{{A08_STEP_NOTE_3}}`
- `{{A08_TITLE}}`
- `{{A09_BODY_1}}`
- `{{A09_CELL_A1}}`
- `{{A09_CELL_A2}}`
- `{{A09_CELL_B1}}`
- `{{A09_CELL_B2}}`
- `{{A09_COVER_ALT}}`
- `{{A09_COVER_CAPTION}}`
- `{{A09_DESC}}`
- `{{A09_FAQ_A1}}`
- `{{A09_FAQ_A2}}`
- `{{A09_FAQ_Q1}}`
- `{{A09_FAQ_Q2}}`
- `{{A09_H2_1}}`
- `{{A09_LEAD}}`
- `{{A09_QUOTE}}`
- `{{A09_READING}}`
- `{{A09_ROW_1}}`
- `{{A09_ROW_2}}`
- `{{A09_SIDE_A}}`
- `{{A09_SIDE_B}}`
- `{{A09_TERM_A}}`
- `{{A09_TERM_B}}`
- `{{A09_TITLE}}`
- `{{A10_BODY_1}}`
- `{{A10_BODY_2}}`
- `{{A10_BODY_3}}`
- `{{A10_BOUNDARY}}`
- `{{A10_CONTEXT}}`
- `{{A10_COVER_ALT}}`
- `{{A10_COVER_CAPTION}}`
- `{{A10_DEFINITION}}`
- `{{A10_DESC}}`
- `{{A10_FAQ_A1}}`
- `{{A10_FAQ_A2}}`
- `{{A10_FAQ_Q1}}`
- `{{A10_FAQ_Q2}}`
- `{{A10_H2_1}}`
- `{{A10_H2_2}}`
- `{{A10_LEAD}}`
- `{{A10_NEAR_TERM}}`
- `{{A10_READING}}`
- `{{A10_TITLE}}`
- `{{A11_BODY_1}}`
- `{{A11_BODY_2}}`
- `{{A11_BOUNDARY}}`
- `{{A11_COVER_ALT}}`
- `{{A11_COVER_CAPTION}}`
- `{{A11_DESC}}`
- `{{A11_FAQ_A1}}`
- `{{A11_FAQ_A2}}`
- `{{A11_FAQ_Q1}}`
- `{{A11_FAQ_Q2}}`
- `{{A11_H2_1}}`
- `{{A11_LEAD}}`
- `{{A11_READING}}`
- `{{A11_STEP_1}}`
- `{{A11_STEP_2}}`
- `{{A11_STEP_3}}`
- `{{A11_STEP_NOTE_1}}`
- `{{A11_STEP_NOTE_2}}`
- `{{A11_STEP_NOTE_3}}`
- `{{A11_TITLE}}`
- `{{A12_BODY_1}}`
- `{{A12_CELL_A1}}`
- `{{A12_CELL_A2}}`
- `{{A12_CELL_B1}}`
- `{{A12_CELL_B2}}`
- `{{A12_COVER_ALT}}`
- `{{A12_COVER_CAPTION}}`
- `{{A12_DESC}}`
- `{{A12_FAQ_A1}}`
- `{{A12_FAQ_A2}}`
- `{{A12_FAQ_Q1}}`
- `{{A12_FAQ_Q2}}`
- `{{A12_H2_1}}`
- `{{A12_LEAD}}`
- `{{A12_QUOTE}}`
- `{{A12_READING}}`
- `{{A12_ROW_1}}`
- `{{A12_ROW_2}}`
- `{{A12_SIDE_A}}`
- `{{A12_SIDE_B}}`
- `{{A12_TERM_A}}`
- `{{A12_TERM_B}}`
- `{{A12_TITLE}}`
- `{{ABOUT_SCOPE}}`
- `{{ABOUT_USE}}`
- `{{AFFILIATE_CTA}}`
- `{{AFFILIATE_URL}}`
- `{{AUTHOR_BIO}}`
- `{{AUTHOR_NAME}}`
- `{{BENEFIT_DISCLAIMER}}`
- `{{BENEFIT_RATE}}`
- `{{BRAND_EN}}`
- `{{CONTACT_EMAIL}}`
- `{{CONTACT_POLICY}}`
- `{{CORRECTIONS_LOG}}`
- `{{DATE_MODIFIED}}`
- `{{DATE_PUBLISHED}}`
- `{{INVITE_CODE}}`
- `{{LANG}}`
- `{{SECURITY_EXPIRES}}`
- `{{SHELF_DECISION_INTRO}}`
- `{{SHELF_ENTRY_INTRO}}`
- `{{SHELF_EVIDENCE_INTRO}}`
- `{{SITE_DESC}}`
- `{{SITE_DOMAIN}}`
- `{{SITE_NAME}}`
- `{{SITE_TAGLINE}}`
- `{{YEAR}}`

## 五个工具

- `workshop/term-pair-builder.html`：词对拆分台；把两个容易混淆的术语拆成共同点与差异字段。
- `workshop/example-boundary-check.html`：例子边界尺；把例子、适用范围和反例排成一张边界卡。
- `workshop/revision-window.html`：校订期限钟；按两个日期与复核期限计算资料是否需要重查。
- `workshop/source-weighting.html`：来源配重盘；用三类证据评分形成可解释的加权读数。
- `workshop/card-session-plan.html`：词卡分轮器；按词条数、轮数与复现次数安排记忆卡练习。

每个工具都预搭正常、错误、边界、重置和复制状态。输入只在浏览器本地处理。

## 链接治理

- 首页、索引、分类、工具、合规页、404 和普通词条均没有交易所转化直链。
- `entries/account-safety-lexeme.html` 是唯一 registrationGuide 外壳，恰有一个静态 `{{AFFILIATE_URL}}`，带 `target="_blank"` 与完整 rel 四件套，并紧邻推广披露文字。
- 首页是默认形态 A：显示 `{{INVITE_CODE}}`、最高 `{{BENEFIT_RATE}}` 与 `{{BENEFIT_DISCLAIMER}}`，只提供复制，不放交易所直链。
- 模板不预设费率、限额、确认数、收益、监管判断或平台可用性。

## 页面角色表

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "article.html",
  "articles": [
    "entries/account-safety-lexeme.html",
    "entries/fee-language-map.html",
    "entries/order-intent-notes.html",
    "entries/custody-boundary-term.html",
    "entries/identity-check-gloss.html",
    "entries/spread-depth-pair.html",
    "entries/evidence-age-rule.html",
    "entries/transfer-state-vocabulary.html",
    "entries/risk-label-reading.html",
    "entries/policy-source-hierarchy.html",
    "entries/review-trigger-grammar.html",
    "entries/comparison-window-terms.html"
  ],
  "cornerstones": [
    "entries/fee-language-map.html",
    "entries/evidence-age-rule.html"
  ],
  "registrationGuide": "entries/account-safety-lexeme.html",
  "articleCovers": {
    "entries/account-safety-lexeme.html": {
      "display": "assets/covers/account-safety-lexeme.webp",
      "og": "assets/covers/account-safety-lexeme.png"
    },
    "entries/fee-language-map.html": {
      "display": "assets/covers/fee-language-map.webp",
      "og": "assets/covers/fee-language-map.png"
    },
    "entries/order-intent-notes.html": {
      "display": "assets/covers/order-intent-notes.webp",
      "og": "assets/covers/order-intent-notes.png"
    },
    "entries/custody-boundary-term.html": {
      "display": "assets/covers/custody-boundary-term.webp",
      "og": "assets/covers/custody-boundary-term.png"
    },
    "entries/identity-check-gloss.html": {
      "display": "assets/covers/identity-check-gloss.webp",
      "og": "assets/covers/identity-check-gloss.png"
    },
    "entries/spread-depth-pair.html": {
      "display": "assets/covers/spread-depth-pair.webp",
      "og": "assets/covers/spread-depth-pair.png"
    },
    "entries/evidence-age-rule.html": {
      "display": "assets/covers/evidence-age-rule.webp",
      "og": "assets/covers/evidence-age-rule.png"
    },
    "entries/transfer-state-vocabulary.html": {
      "display": "assets/covers/transfer-state-vocabulary.webp",
      "og": "assets/covers/transfer-state-vocabulary.png"
    },
    "entries/risk-label-reading.html": {
      "display": "assets/covers/risk-label-reading.webp",
      "og": "assets/covers/risk-label-reading.png"
    },
    "entries/policy-source-hierarchy.html": {
      "display": "assets/covers/policy-source-hierarchy.webp",
      "og": "assets/covers/policy-source-hierarchy.png"
    },
    "entries/review-trigger-grammar.html": {
      "display": "assets/covers/review-trigger-grammar.webp",
      "og": "assets/covers/review-trigger-grammar.png"
    },
    "entries/comparison-window-terms.html": {
      "display": "assets/covers/comparison-window-terms.webp",
      "og": "assets/covers/comparison-window-terms.png"
    }
  },
  "categories": [
    {
      "path": "shelves/entry-terms.html",
      "label": "起步词页",
      "articles": [
        "entries/account-safety-lexeme.html",
        "entries/fee-language-map.html",
        "entries/order-intent-notes.html",
        "entries/custody-boundary-term.html"
      ]
    },
    {
      "path": "shelves/evidence-terms.html",
      "label": "证据词页",
      "articles": [
        "entries/identity-check-gloss.html",
        "entries/spread-depth-pair.html",
        "entries/evidence-age-rule.html",
        "entries/transfer-state-vocabulary.html"
      ]
    },
    {
      "path": "shelves/decision-terms.html",
      "label": "判断词页",
      "articles": [
        "entries/risk-label-reading.html",
        "entries/policy-source-hierarchy.html",
        "entries/review-trigger-grammar.html",
        "entries/comparison-window-terms.html"
      ]
    }
  ],
  "toolIndex": "tool.html",
  "tools": [
    "workshop/term-pair-builder.html",
    "workshop/example-boundary-check.html",
    "workshop/revision-window.html",
    "workshop/source-weighting.html",
    "workshop/card-session-plan.html"
  ],
  "legal": {
    "about": "about.html",
    "contact": "contact.html",
    "disclosure": "disclosure.html",
    "disclaimer": "legal.html",
    "privacy": "privacy.html",
    "corrections": "corrections.html",
    "editorial": "editorial.html"
  },
  "error404": "404.html",
  "robots": "robots.txt",
  "sitemap": "sitemap.xml",
  "feed": "feed.xml",
  "security": ".well-known/security.txt",
  "favicon": "favicon.ico",
  "appleTouchIcon": "apple-touch-icon.png",
  "socialImage": "assets/social-card.png",
  "variables": {
    "siteDomain": "{{SITE_DOMAIN}}",
    "siteName": "{{SITE_NAME}}",
    "wordmark": "{{BRAND_EN}}",
    "inviteCode": "{{INVITE_CODE}}",
    "benefitRate": "{{BENEFIT_RATE}}",
    "benefitDisclaimer": "{{BENEFIT_DISCLAIMER}}",
    "affiliateUrl": "{{AFFILIATE_URL}}"
  }
}
```
