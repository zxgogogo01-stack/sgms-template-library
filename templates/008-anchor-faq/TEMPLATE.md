# 008-anchor-faq

## 模板定位

深海蓝响应总台、信号橙状态标记与三条问题通道构成的高端支持中心。模板不包含可发布注册教程或平台事实；下游 AI 只替换站点变量、经核实正文和文章字段，无需重做 UI、页面体系、工具逻辑或通用视觉资产。

## 使用顺序

1. 替换全站品牌、域名、语言、作者与联系变量。
2. 按 Q01–Q12 逐页填写正文，保留 checklist、decision、diagnostic、evidence 四种结构。
3. 只有 registrationGuide 角色页可使用唯一注册链接槽位；其他页面不得增加交易所转化直链。
4. 核对来源、日期、问答和封面 alt 后运行三套静态审计与浏览器验收。

## 核心变量

- `{{SITE_NAME}}`、`{{SITE_DOMAIN}}`、`{{SITE_TAGLINE}}`、`{{SITE_DESC}}`、`{{BRAND_EN}}`、`{{LANG}}`、`{{YEAR}}`
- `{{CONTACT_EMAIL}}`、`{{AUTHOR_NAME}}`、`{{AUTHOR_BIO}}`、`{{DATE_PUBLISHED}}`、`{{DATE_MODIFIED}}`
- `{{INVITE_CODE}}`、`{{BENEFIT_RATE}}`、`{{BENEFIT_DISCLAIMER}}`、`{{AFFILIATE_URL}}`、`{{AFFILIATE_CTA}}`
- 通道、关于、联系与修订字段以实际占位符清单为准。

## 文章字段

- `Q01`：{{Q01_TITLE}}；包含 TITLE、DESC、LEAD、READING、COVER_ALT、COVER_CAPTION、版式专用正文和两组 FAQ 字段。
- `Q02`：{{Q02_TITLE}}；包含 TITLE、DESC、LEAD、READING、COVER_ALT、COVER_CAPTION、版式专用正文和两组 FAQ 字段。
- `Q03`：{{Q03_TITLE}}；包含 TITLE、DESC、LEAD、READING、COVER_ALT、COVER_CAPTION、版式专用正文和两组 FAQ 字段。
- `Q04`：{{Q04_TITLE}}；包含 TITLE、DESC、LEAD、READING、COVER_ALT、COVER_CAPTION、版式专用正文和两组 FAQ 字段。
- `Q05`：{{Q05_TITLE}}；包含 TITLE、DESC、LEAD、READING、COVER_ALT、COVER_CAPTION、版式专用正文和两组 FAQ 字段。
- `Q06`：{{Q06_TITLE}}；包含 TITLE、DESC、LEAD、READING、COVER_ALT、COVER_CAPTION、版式专用正文和两组 FAQ 字段。
- `Q07`：{{Q07_TITLE}}；包含 TITLE、DESC、LEAD、READING、COVER_ALT、COVER_CAPTION、版式专用正文和两组 FAQ 字段。
- `Q08`：{{Q08_TITLE}}；包含 TITLE、DESC、LEAD、READING、COVER_ALT、COVER_CAPTION、版式专用正文和两组 FAQ 字段。
- `Q09`：{{Q09_TITLE}}；包含 TITLE、DESC、LEAD、READING、COVER_ALT、COVER_CAPTION、版式专用正文和两组 FAQ 字段。
- `Q10`：{{Q10_TITLE}}；包含 TITLE、DESC、LEAD、READING、COVER_ALT、COVER_CAPTION、版式专用正文和两组 FAQ 字段。
- `Q11`：{{Q11_TITLE}}；包含 TITLE、DESC、LEAD、READING、COVER_ALT、COVER_CAPTION、版式专用正文和两组 FAQ 字段。
- `Q12`：{{Q12_TITLE}}；包含 TITLE、DESC、LEAD、READING、COVER_ALT、COVER_CAPTION、版式专用正文和两组 FAQ 字段。

## 五个工具

- `desk/ticket-composer.html`：工单信息编排器；把问题、期望、时间和已尝试步骤排成可复制的问题报告。
- `desk/timezone-stamp.html`：跨时区时间戳；把一个本地时间换算成 UTC 与指定时区的提交记录。
- `desk/reference-mask.html`：参考号遮罩尺；保留首尾字符并隐藏中间段，生成可分享的脱敏参考号。
- `desk/checklist-gap.html`：排查缺口计数器；计算已完成步骤、关键缺口和剩余排查量。
- `desk/response-priority.html`：响应优先级标尺；按影响、紧急度和范围形成透明的支持优先级读数。

每个工具均有正常、错误、边界、重置与复制状态，全部在本地运行。

## 链接治理

- 首页为默认形态 A：显示并复制邀请码、最高利益比例与政策变化脚注，不含交易所直链。
- `answers/secure-access-path.html` 为唯一 registrationGuide 外壳，恰有一个静态 `{{AFFILIATE_URL}}`，带 target 与完整 rel 四件套并紧邻推广披露。
- 其他文章、索引、通道、工具、合规页、导航、页脚和 404 均为零转化直链。
- 模板不写死费率、限额、确认数、收益、用户数、监管结论或平台可用性。

## 实际占位符清单

- `{{ABOUT_AUDIENCE}}`
- `{{ABOUT_SCOPE}}`
- `{{AFFILIATE_CTA}}`
- `{{AFFILIATE_URL}}`
- `{{AUTHOR_BIO}}`
- `{{AUTHOR_NAME}}`
- `{{BENEFIT_DISCLAIMER}}`
- `{{BENEFIT_RATE}}`
- `{{BRAND_EN}}`
- `{{CHANNEL_ACCESS_INTRO}}`
- `{{CHANNEL_EVIDENCE_INTRO}}`
- `{{CHANNEL_TRANSACTION_INTRO}}`
- `{{CONTACT_EMAIL}}`
- `{{CONTACT_POLICY}}`
- `{{CORRECTIONS_LOG}}`
- `{{DATE_MODIFIED}}`
- `{{DATE_PUBLISHED}}`
- `{{INVITE_CODE}}`
- `{{LANG}}`
- `{{Q01_BOUNDARY}}`
- `{{Q01_COVER_ALT}}`
- `{{Q01_COVER_CAPTION}}`
- `{{Q01_DESC}}`
- `{{Q01_FAQ_A1}}`
- `{{Q01_FAQ_A2}}`
- `{{Q01_FAQ_Q1}}`
- `{{Q01_FAQ_Q2}}`
- `{{Q01_H2_1}}`
- `{{Q01_LEAD}}`
- `{{Q01_PREP_NOTE}}`
- `{{Q01_PREP}}`
- `{{Q01_READING}}`
- `{{Q01_STEP_1}}`
- `{{Q01_STEP_2}}`
- `{{Q01_STEP_3}}`
- `{{Q01_STEP_NOTE_1}}`
- `{{Q01_STEP_NOTE_2}}`
- `{{Q01_STEP_NOTE_3}}`
- `{{Q01_TITLE}}`
- `{{Q02_BODY_1}}`
- `{{Q02_BODY_2}}`
- `{{Q02_COVER_ALT}}`
- `{{Q02_COVER_CAPTION}}`
- `{{Q02_DESC}}`
- `{{Q02_FAQ_A1}}`
- `{{Q02_FAQ_A2}}`
- `{{Q02_FAQ_Q1}}`
- `{{Q02_FAQ_Q2}}`
- `{{Q02_H2_1}}`
- `{{Q02_H2_2}}`
- `{{Q02_IF_A}}`
- `{{Q02_IF_B}}`
- `{{Q02_LEAD}}`
- `{{Q02_QUOTE}}`
- `{{Q02_READING}}`
- `{{Q02_THEN_A}}`
- `{{Q02_THEN_B}}`
- `{{Q02_TITLE}}`
- `{{Q03_BODY_1}}`
- `{{Q03_BODY_2}}`
- `{{Q03_COVER_ALT}}`
- `{{Q03_COVER_CAPTION}}`
- `{{Q03_DESC}}`
- `{{Q03_ESCALATE}}`
- `{{Q03_EXCLUDE}}`
- `{{Q03_FAQ_A1}}`
- `{{Q03_FAQ_A2}}`
- `{{Q03_FAQ_Q1}}`
- `{{Q03_FAQ_Q2}}`
- `{{Q03_H2_1}}`
- `{{Q03_H2_2}}`
- `{{Q03_LEAD}}`
- `{{Q03_READING}}`
- `{{Q03_SIGNAL}}`
- `{{Q03_TITLE}}`
- `{{Q03_WARNING}}`
- `{{Q04_BOUNDARY}}`
- `{{Q04_COVER_ALT}}`
- `{{Q04_COVER_CAPTION}}`
- `{{Q04_DESC}}`
- `{{Q04_FAQ_A1}}`
- `{{Q04_FAQ_A2}}`
- `{{Q04_FAQ_Q1}}`
- `{{Q04_FAQ_Q2}}`
- `{{Q04_H2_1}}`
- `{{Q04_LEAD}}`
- `{{Q04_PREP_NOTE}}`
- `{{Q04_PREP}}`
- `{{Q04_READING}}`
- `{{Q04_STEP_1}}`
- `{{Q04_STEP_2}}`
- `{{Q04_STEP_3}}`
- `{{Q04_STEP_NOTE_1}}`
- `{{Q04_STEP_NOTE_2}}`
- `{{Q04_STEP_NOTE_3}}`
- `{{Q04_TITLE}}`
- `{{Q05_BODY_1}}`
- `{{Q05_BODY_2}}`
- `{{Q05_COVER_ALT}}`
- `{{Q05_COVER_CAPTION}}`
- `{{Q05_DESC}}`
- `{{Q05_ESCALATE}}`
- `{{Q05_EXCLUDE}}`
- `{{Q05_FAQ_A1}}`
- `{{Q05_FAQ_A2}}`
- `{{Q05_FAQ_Q1}}`
- `{{Q05_FAQ_Q2}}`
- `{{Q05_H2_1}}`
- `{{Q05_H2_2}}`
- `{{Q05_LEAD}}`
- `{{Q05_READING}}`
- `{{Q05_SIGNAL}}`
- `{{Q05_TITLE}}`
- `{{Q05_WARNING}}`
- `{{Q06_BOUNDARY}}`
- `{{Q06_COVER_ALT}}`
- `{{Q06_COVER_CAPTION}}`
- `{{Q06_DESC}}`
- `{{Q06_FAQ_A1}}`
- `{{Q06_FAQ_A2}}`
- `{{Q06_FAQ_Q1}}`
- `{{Q06_FAQ_Q2}}`
- `{{Q06_H2_1}}`
- `{{Q06_LEAD}}`
- `{{Q06_PREP_NOTE}}`
- `{{Q06_PREP}}`
- `{{Q06_READING}}`
- `{{Q06_STEP_1}}`
- `{{Q06_STEP_2}}`
- `{{Q06_STEP_3}}`
- `{{Q06_STEP_NOTE_1}}`
- `{{Q06_STEP_NOTE_2}}`
- `{{Q06_STEP_NOTE_3}}`
- `{{Q06_TITLE}}`
- `{{Q07_BODY_1}}`
- `{{Q07_BODY_2}}`
- `{{Q07_COVER_ALT}}`
- `{{Q07_COVER_CAPTION}}`
- `{{Q07_DESC}}`
- `{{Q07_EVIDENCE_1}}`
- `{{Q07_EVIDENCE_2}}`
- `{{Q07_EVIDENCE_3}}`
- `{{Q07_EVIDENCE_NOTE_1}}`
- `{{Q07_EVIDENCE_NOTE_2}}`
- `{{Q07_EVIDENCE_NOTE_3}}`
- `{{Q07_FAQ_A1}}`
- `{{Q07_FAQ_A2}}`
- `{{Q07_FAQ_Q1}}`
- `{{Q07_FAQ_Q2}}`
- `{{Q07_H2_1}}`
- `{{Q07_H2_2}}`
- `{{Q07_LEAD}}`
- `{{Q07_READING}}`
- `{{Q07_TITLE}}`
- `{{Q08_BODY_1}}`
- `{{Q08_BODY_2}}`
- `{{Q08_COVER_ALT}}`
- `{{Q08_COVER_CAPTION}}`
- `{{Q08_DESC}}`
- `{{Q08_ESCALATE}}`
- `{{Q08_EXCLUDE}}`
- `{{Q08_FAQ_A1}}`
- `{{Q08_FAQ_A2}}`
- `{{Q08_FAQ_Q1}}`
- `{{Q08_FAQ_Q2}}`
- `{{Q08_H2_1}}`
- `{{Q08_H2_2}}`
- `{{Q08_LEAD}}`
- `{{Q08_READING}}`
- `{{Q08_SIGNAL}}`
- `{{Q08_TITLE}}`
- `{{Q08_WARNING}}`
- `{{Q09_BODY_1}}`
- `{{Q09_BODY_2}}`
- `{{Q09_COVER_ALT}}`
- `{{Q09_COVER_CAPTION}}`
- `{{Q09_DESC}}`
- `{{Q09_EVIDENCE_1}}`
- `{{Q09_EVIDENCE_2}}`
- `{{Q09_EVIDENCE_3}}`
- `{{Q09_EVIDENCE_NOTE_1}}`
- `{{Q09_EVIDENCE_NOTE_2}}`
- `{{Q09_EVIDENCE_NOTE_3}}`
- `{{Q09_FAQ_A1}}`
- `{{Q09_FAQ_A2}}`
- `{{Q09_FAQ_Q1}}`
- `{{Q09_FAQ_Q2}}`
- `{{Q09_H2_1}}`
- `{{Q09_H2_2}}`
- `{{Q09_LEAD}}`
- `{{Q09_READING}}`
- `{{Q09_TITLE}}`
- `{{Q10_BODY_1}}`
- `{{Q10_BODY_2}}`
- `{{Q10_COVER_ALT}}`
- `{{Q10_COVER_CAPTION}}`
- `{{Q10_DESC}}`
- `{{Q10_FAQ_A1}}`
- `{{Q10_FAQ_A2}}`
- `{{Q10_FAQ_Q1}}`
- `{{Q10_FAQ_Q2}}`
- `{{Q10_H2_1}}`
- `{{Q10_H2_2}}`
- `{{Q10_IF_A}}`
- `{{Q10_IF_B}}`
- `{{Q10_LEAD}}`
- `{{Q10_QUOTE}}`
- `{{Q10_READING}}`
- `{{Q10_THEN_A}}`
- `{{Q10_THEN_B}}`
- `{{Q10_TITLE}}`
- `{{Q11_BOUNDARY}}`
- `{{Q11_COVER_ALT}}`
- `{{Q11_COVER_CAPTION}}`
- `{{Q11_DESC}}`
- `{{Q11_FAQ_A1}}`
- `{{Q11_FAQ_A2}}`
- `{{Q11_FAQ_Q1}}`
- `{{Q11_FAQ_Q2}}`
- `{{Q11_H2_1}}`
- `{{Q11_LEAD}}`
- `{{Q11_PREP_NOTE}}`
- `{{Q11_PREP}}`
- `{{Q11_READING}}`
- `{{Q11_STEP_1}}`
- `{{Q11_STEP_2}}`
- `{{Q11_STEP_3}}`
- `{{Q11_STEP_NOTE_1}}`
- `{{Q11_STEP_NOTE_2}}`
- `{{Q11_STEP_NOTE_3}}`
- `{{Q11_TITLE}}`
- `{{Q12_BODY_1}}`
- `{{Q12_BODY_2}}`
- `{{Q12_COVER_ALT}}`
- `{{Q12_COVER_CAPTION}}`
- `{{Q12_DESC}}`
- `{{Q12_ESCALATE}}`
- `{{Q12_EXCLUDE}}`
- `{{Q12_FAQ_A1}}`
- `{{Q12_FAQ_A2}}`
- `{{Q12_FAQ_Q1}}`
- `{{Q12_FAQ_Q2}}`
- `{{Q12_H2_1}}`
- `{{Q12_H2_2}}`
- `{{Q12_LEAD}}`
- `{{Q12_READING}}`
- `{{Q12_SIGNAL}}`
- `{{Q12_TITLE}}`
- `{{Q12_WARNING}}`
- `{{SECURITY_EXPIRES}}`
- `{{SITE_DESC}}`
- `{{SITE_DOMAIN}}`
- `{{SITE_NAME}}`
- `{{SITE_TAGLINE}}`
- `{{YEAR}}`

## 页面角色表

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "article.html",
  "articles": [
    "answers/secure-access-path.html",
    "answers/fee-display-decoder.html",
    "answers/order-status-triage.html",
    "answers/identity-review-prep.html",
    "answers/transfer-state-map.html",
    "answers/account-recovery-sequence.html",
    "answers/charge-record-audit.html",
    "answers/device-session-review.html",
    "answers/withdrawal-hold-questions.html",
    "answers/policy-change-reading.html",
    "answers/support-evidence-bundle.html",
    "answers/suspicious-message-triage.html"
  ],
  "cornerstones": [
    "answers/fee-display-decoder.html",
    "answers/charge-record-audit.html"
  ],
  "registrationGuide": "answers/secure-access-path.html",
  "articleCovers": {
    "answers/secure-access-path.html": {
      "display": "assets/covers/secure-access-path.webp",
      "og": "assets/covers/secure-access-path.png"
    },
    "answers/fee-display-decoder.html": {
      "display": "assets/covers/fee-display-decoder.webp",
      "og": "assets/covers/fee-display-decoder.png"
    },
    "answers/order-status-triage.html": {
      "display": "assets/covers/order-status-triage.webp",
      "og": "assets/covers/order-status-triage.png"
    },
    "answers/identity-review-prep.html": {
      "display": "assets/covers/identity-review-prep.webp",
      "og": "assets/covers/identity-review-prep.png"
    },
    "answers/transfer-state-map.html": {
      "display": "assets/covers/transfer-state-map.webp",
      "og": "assets/covers/transfer-state-map.png"
    },
    "answers/account-recovery-sequence.html": {
      "display": "assets/covers/account-recovery-sequence.webp",
      "og": "assets/covers/account-recovery-sequence.png"
    },
    "answers/charge-record-audit.html": {
      "display": "assets/covers/charge-record-audit.webp",
      "og": "assets/covers/charge-record-audit.png"
    },
    "answers/device-session-review.html": {
      "display": "assets/covers/device-session-review.webp",
      "og": "assets/covers/device-session-review.png"
    },
    "answers/withdrawal-hold-questions.html": {
      "display": "assets/covers/withdrawal-hold-questions.webp",
      "og": "assets/covers/withdrawal-hold-questions.png"
    },
    "answers/policy-change-reading.html": {
      "display": "assets/covers/policy-change-reading.webp",
      "og": "assets/covers/policy-change-reading.png"
    },
    "answers/support-evidence-bundle.html": {
      "display": "assets/covers/support-evidence-bundle.webp",
      "og": "assets/covers/support-evidence-bundle.png"
    },
    "answers/suspicious-message-triage.html": {
      "display": "assets/covers/suspicious-message-triage.webp",
      "og": "assets/covers/suspicious-message-triage.png"
    }
  },
  "categories": [
    {
      "path": "channels/access-desk.html",
      "label": "访问响应台",
      "articles": [
        "answers/secure-access-path.html",
        "answers/fee-display-decoder.html",
        "answers/order-status-triage.html",
        "answers/identity-review-prep.html"
      ]
    },
    {
      "path": "channels/transaction-desk.html",
      "label": "状态响应台",
      "articles": [
        "answers/transfer-state-map.html",
        "answers/account-recovery-sequence.html",
        "answers/charge-record-audit.html",
        "answers/device-session-review.html"
      ]
    },
    {
      "path": "channels/evidence-desk.html",
      "label": "证据响应台",
      "articles": [
        "answers/withdrawal-hold-questions.html",
        "answers/policy-change-reading.html",
        "answers/support-evidence-bundle.html",
        "answers/suspicious-message-triage.html"
      ]
    }
  ],
  "toolIndex": "tool.html",
  "tools": [
    "desk/ticket-composer.html",
    "desk/timezone-stamp.html",
    "desk/reference-mask.html",
    "desk/checklist-gap.html",
    "desk/response-priority.html"
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
