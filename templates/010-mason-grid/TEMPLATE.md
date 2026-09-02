# 010-mason-grid

## 定位

工业编辑部资源墙：混凝土底、砖红主平面、警示黄施工标、十二栏砌筑网格和窄体编号系统。它适合“先整理证据，再形成判断”的内容站；页面不是卡片 SaaS 皮，也不复用前九套的信息架构。

## 页面职责

- 首页是宽内链墙，首屏固定为形态 A：展示并复制邀请码、弹性利益点与脚注，不放推广直链；下方含三类实时筛选。
- 文章库承载 12 个写作位置；各文章分别采用 permit、blueprint、timeline、kit、route、check、call、poster、window、docket、sequence、ledger 的内容结构。
- 三片分区为“来源料场 / 行动工位 / 记录仓”，每片接四篇文章；文章页均能返回自己的分区。
- 工具间包含五个真实本地算法：日期跨度、权重归一化、FNV-1a 文本指纹、复核节奏和有限总体抽样估算。
- 7 个独立合规页、404、sitemap、RSS、安全联系与图标资产已经接好。

## 后续 AI 只做文字的顺序

1. 全局替换站点变量，再逐页填写对应的标题、描述、正文、说明和日期变量；不改 class、CSS、JS、路径或页面数量。
2. dispatches/access-entry-brief.html 是 registrationGuide。这里只填经核实的注册内容；保留且只保留一个 {{AFFILIATE_URL}}，同时核对链接目的地、邀请码、披露和适用条件。
3. 其余文章、工具、合规、列表、分类、导航、页脚与 404 不添加推广直链。首页需要形态 B 时，必须在具体建站流程取得站主授权后另改。
4. 每篇正文变量按页码命名：{{ARTICLE_TITLE_01}} / {{ARTICLE_DESC_01}} / {{ARTICLE_01_LEDE}} / {{ARTICLE_01_H2_01}} / {{ARTICLE_01_SECTION_01}} 等；FAQ、证据块、步骤块、图注与收尾同理。不要把不同页面改成相同章节顺序。
5. 工具说明变量为 {{TOOL_01_GUIDE_01}} 至对应页的第 6 段；工具算法已经完成，只填真实用途、算法来源和限制，不改脚本。
6. 法律与编辑信息使用 {{ABOUT_BODY}}、{{CONTACT_BODY}}、{{DISCLOSURE_BODY}}、{{DISCLAIMER_BODY}}、{{PRIVACY_BODY}}、{{CORRECTIONS_BODY}}、{{EDITORIAL_BODY}}，以及 {{LEGAL_XX_*}}、{{RISK_NOTICE}}。更正页的三条初始记录必须填写真实建站期更正。

## 站点级变量

{{LANG}}、{{SITE_NAME}}、{{SITE_DOMAIN}}、{{SITE_DESC}}、{{SITE_TAGLINE}}、{{BRAND_EN}}、{{INVITE_CODE}}、{{BENEFIT_RATE}}、{{BENEFIT_DISCLAIMER}}、{{AFFILIATE_URL}}、{{AFFILIATE_LINK_LABEL}}、{{AFFILIATE_DISCLOSURE}}、{{AUTHOR_NAME}}、{{REVIEWER_NAME}}、{{CONTACT_EMAIL}}、{{DATE_PUBLISHED}}、{{DATE_MODIFIED}}、{{HOME_KICKER}}、{{HOME_TITLE}}、{{HOME_SUBMISSION_TEXT}}、{{REGISTRATION_LINK_HEADING}}、{{REGISTRATION_LINK_CONTEXT}}。

文章库索引还使用以下标题与描述变量：

- {{ARTICLE_TITLE_01}} / {{ARTICLE_DESC_01}}
- {{ARTICLE_TITLE_02}} / {{ARTICLE_DESC_02}}
- {{ARTICLE_TITLE_03}} / {{ARTICLE_DESC_03}}
- {{ARTICLE_TITLE_04}} / {{ARTICLE_DESC_04}}
- {{ARTICLE_TITLE_05}} / {{ARTICLE_DESC_05}}
- {{ARTICLE_TITLE_06}} / {{ARTICLE_DESC_06}}
- {{ARTICLE_TITLE_07}} / {{ARTICLE_DESC_07}}
- {{ARTICLE_TITLE_08}} / {{ARTICLE_DESC_08}}
- {{ARTICLE_TITLE_09}} / {{ARTICLE_DESC_09}}
- {{ARTICLE_TITLE_10}} / {{ARTICLE_DESC_10}}
- {{ARTICLE_TITLE_11}} / {{ARTICLE_DESC_11}}
- {{ARTICLE_TITLE_12}} / {{ARTICLE_DESC_12}}

风险边界页使用：{{LEGAL_04_HEADING_01}}、{{LEGAL_04_SECTION_01}}、{{LEGAL_04_HEADING_02}}、{{LEGAL_04_SECTION_02}}、{{LEGAL_04_HEADING_03}}、{{LEGAL_04_SECTION_03}}。

## 文件分工

- assets/mortar.css：色彩、排版、基础控件、主题与可访问性。
- assets/blocks.css：桌面砌筑网格和 900/620/390px 重排。
- assets/finish.css：页面身份、文章变体、工具台和交互状态。
- assets/yard.js：主题、复制、首页筛选以及五工具逻辑。
- assets/covers/：12 套独立 1200×630 PNG/WebP 文章封面。

## 完整变量清单

- {{ABOUT_BODY}}
- {{AFFILIATE_DISCLOSURE}}
- {{AFFILIATE_LINK_LABEL}}
- {{AFFILIATE_URL}}
- {{ARTICLE_01_ANSWER_01}}
- {{ARTICLE_01_ANSWER_02}}
- {{ARTICLE_01_CAPTION}}
- {{ARTICLE_01_FAQ_TITLE}}
- {{ARTICLE_01_H2_01}}
- {{ARTICLE_01_H2_02}}
- {{ARTICLE_01_H2_03}}
- {{ARTICLE_01_H2_04}}
- {{ARTICLE_01_H2_05}}
- {{ARTICLE_01_H2_06}}
- {{ARTICLE_01_LEDE}}
- {{ARTICLE_01_QUESTION_01}}
- {{ARTICLE_01_QUESTION_02}}
- {{ARTICLE_01_SECTION_01}}
- {{ARTICLE_01_SECTION_02}}
- {{ARTICLE_01_SECTION_03}}
- {{ARTICLE_01_SECTION_04}}
- {{ARTICLE_01_SECTION_05}}
- {{ARTICLE_01_SECTION_06}}
- {{ARTICLE_01_SIGNOFF}}
- {{ARTICLE_02_CAPTION}}
- {{ARTICLE_02_EVIDENCE_A_BODY}}
- {{ARTICLE_02_EVIDENCE_A_TITLE}}
- {{ARTICLE_02_EVIDENCE_B_BODY}}
- {{ARTICLE_02_EVIDENCE_B_TITLE}}
- {{ARTICLE_02_H2_01}}
- {{ARTICLE_02_H2_02}}
- {{ARTICLE_02_H2_03}}
- {{ARTICLE_02_H2_04}}
- {{ARTICLE_02_H2_05}}
- {{ARTICLE_02_H2_06}}
- {{ARTICLE_02_H2_07}}
- {{ARTICLE_02_LEDE}}
- {{ARTICLE_02_SECTION_01}}
- {{ARTICLE_02_SECTION_02}}
- {{ARTICLE_02_SECTION_03}}
- {{ARTICLE_02_SECTION_04}}
- {{ARTICLE_02_SECTION_05}}
- {{ARTICLE_02_SECTION_06}}
- {{ARTICLE_02_SECTION_07}}
- {{ARTICLE_02_SIGNOFF}}
- {{ARTICLE_03_CAPTION}}
- {{ARTICLE_03_H2_01}}
- {{ARTICLE_03_H2_02}}
- {{ARTICLE_03_H2_03}}
- {{ARTICLE_03_H2_04}}
- {{ARTICLE_03_LEDE}}
- {{ARTICLE_03_SECTION_01}}
- {{ARTICLE_03_SECTION_02}}
- {{ARTICLE_03_SECTION_03}}
- {{ARTICLE_03_SECTION_04}}
- {{ARTICLE_03_SIGNOFF}}
- {{ARTICLE_03_STEP_A}}
- {{ARTICLE_03_STEP_B}}
- {{ARTICLE_03_STEP_C}}
- {{ARTICLE_04_ANSWER_01}}
- {{ARTICLE_04_ANSWER_02}}
- {{ARTICLE_04_CAPTION}}
- {{ARTICLE_04_FAQ_TITLE}}
- {{ARTICLE_04_H2_01}}
- {{ARTICLE_04_H2_02}}
- {{ARTICLE_04_H2_03}}
- {{ARTICLE_04_H2_04}}
- {{ARTICLE_04_H2_05}}
- {{ARTICLE_04_LEDE}}
- {{ARTICLE_04_QUESTION_01}}
- {{ARTICLE_04_QUESTION_02}}
- {{ARTICLE_04_SECTION_01}}
- {{ARTICLE_04_SECTION_02}}
- {{ARTICLE_04_SECTION_03}}
- {{ARTICLE_04_SECTION_04}}
- {{ARTICLE_04_SECTION_05}}
- {{ARTICLE_04_SIGNOFF}}
- {{ARTICLE_05_CAPTION}}
- {{ARTICLE_05_EVIDENCE_A_BODY}}
- {{ARTICLE_05_EVIDENCE_A_TITLE}}
- {{ARTICLE_05_EVIDENCE_B_BODY}}
- {{ARTICLE_05_EVIDENCE_B_TITLE}}
- {{ARTICLE_05_H2_01}}
- {{ARTICLE_05_H2_02}}
- {{ARTICLE_05_H2_03}}
- {{ARTICLE_05_H2_04}}
- {{ARTICLE_05_H2_05}}
- {{ARTICLE_05_H2_06}}
- {{ARTICLE_05_LEDE}}
- {{ARTICLE_05_SECTION_01}}
- {{ARTICLE_05_SECTION_02}}
- {{ARTICLE_05_SECTION_03}}
- {{ARTICLE_05_SECTION_04}}
- {{ARTICLE_05_SECTION_05}}
- {{ARTICLE_05_SECTION_06}}
- {{ARTICLE_05_SIGNOFF}}
- {{ARTICLE_06_CAPTION}}
- {{ARTICLE_06_H2_01}}
- {{ARTICLE_06_H2_02}}
- {{ARTICLE_06_H2_03}}
- {{ARTICLE_06_H2_04}}
- {{ARTICLE_06_LEDE}}
- {{ARTICLE_06_SECTION_01}}
- {{ARTICLE_06_SECTION_02}}
- {{ARTICLE_06_SECTION_03}}
- {{ARTICLE_06_SECTION_04}}
- {{ARTICLE_06_SIGNOFF}}
- {{ARTICLE_06_STEP_A}}
- {{ARTICLE_06_STEP_B}}
- {{ARTICLE_06_STEP_C}}
- {{ARTICLE_07_ANSWER_01}}
- {{ARTICLE_07_ANSWER_02}}
- {{ARTICLE_07_CAPTION}}
- {{ARTICLE_07_FAQ_TITLE}}
- {{ARTICLE_07_H2_01}}
- {{ARTICLE_07_H2_02}}
- {{ARTICLE_07_H2_03}}
- {{ARTICLE_07_H2_04}}
- {{ARTICLE_07_H2_05}}
- {{ARTICLE_07_LEDE}}
- {{ARTICLE_07_QUESTION_01}}
- {{ARTICLE_07_QUESTION_02}}
- {{ARTICLE_07_SECTION_01}}
- {{ARTICLE_07_SECTION_02}}
- {{ARTICLE_07_SECTION_03}}
- {{ARTICLE_07_SECTION_04}}
- {{ARTICLE_07_SECTION_05}}
- {{ARTICLE_07_SIGNOFF}}
- {{ARTICLE_08_CAPTION}}
- {{ARTICLE_08_H2_01}}
- {{ARTICLE_08_H2_02}}
- {{ARTICLE_08_H2_03}}
- {{ARTICLE_08_LEDE}}
- {{ARTICLE_08_SECTION_01}}
- {{ARTICLE_08_SECTION_02}}
- {{ARTICLE_08_SECTION_03}}
- {{ARTICLE_08_SIGNOFF}}
- {{ARTICLE_09_CAPTION}}
- {{ARTICLE_09_EVIDENCE_A_BODY}}
- {{ARTICLE_09_EVIDENCE_A_TITLE}}
- {{ARTICLE_09_EVIDENCE_B_BODY}}
- {{ARTICLE_09_EVIDENCE_B_TITLE}}
- {{ARTICLE_09_H2_01}}
- {{ARTICLE_09_H2_02}}
- {{ARTICLE_09_H2_03}}
- {{ARTICLE_09_H2_04}}
- {{ARTICLE_09_H2_05}}
- {{ARTICLE_09_LEDE}}
- {{ARTICLE_09_SECTION_01}}
- {{ARTICLE_09_SECTION_02}}
- {{ARTICLE_09_SECTION_03}}
- {{ARTICLE_09_SECTION_04}}
- {{ARTICLE_09_SECTION_05}}
- {{ARTICLE_09_SIGNOFF}}
- {{ARTICLE_10_ANSWER_01}}
- {{ARTICLE_10_ANSWER_02}}
- {{ARTICLE_10_CAPTION}}
- {{ARTICLE_10_FAQ_TITLE}}
- {{ARTICLE_10_H2_01}}
- {{ARTICLE_10_H2_02}}
- {{ARTICLE_10_H2_03}}
- {{ARTICLE_10_H2_04}}
- {{ARTICLE_10_H2_05}}
- {{ARTICLE_10_H2_06}}
- {{ARTICLE_10_LEDE}}
- {{ARTICLE_10_QUESTION_01}}
- {{ARTICLE_10_QUESTION_02}}
- {{ARTICLE_10_SECTION_01}}
- {{ARTICLE_10_SECTION_02}}
- {{ARTICLE_10_SECTION_03}}
- {{ARTICLE_10_SECTION_04}}
- {{ARTICLE_10_SECTION_05}}
- {{ARTICLE_10_SECTION_06}}
- {{ARTICLE_10_SIGNOFF}}
- {{ARTICLE_10_STEP_A}}
- {{ARTICLE_10_STEP_B}}
- {{ARTICLE_10_STEP_C}}
- {{ARTICLE_11_CAPTION}}
- {{ARTICLE_11_EVIDENCE_A_BODY}}
- {{ARTICLE_11_EVIDENCE_A_TITLE}}
- {{ARTICLE_11_EVIDENCE_B_BODY}}
- {{ARTICLE_11_EVIDENCE_B_TITLE}}
- {{ARTICLE_11_H2_01}}
- {{ARTICLE_11_H2_02}}
- {{ARTICLE_11_H2_03}}
- {{ARTICLE_11_H2_04}}
- {{ARTICLE_11_LEDE}}
- {{ARTICLE_11_SECTION_01}}
- {{ARTICLE_11_SECTION_02}}
- {{ARTICLE_11_SECTION_03}}
- {{ARTICLE_11_SECTION_04}}
- {{ARTICLE_11_SIGNOFF}}
- {{ARTICLE_12_CAPTION}}
- {{ARTICLE_12_H2_01}}
- {{ARTICLE_12_H2_02}}
- {{ARTICLE_12_H2_03}}
- {{ARTICLE_12_H2_04}}
- {{ARTICLE_12_H2_05}}
- {{ARTICLE_12_LEDE}}
- {{ARTICLE_12_SECTION_01}}
- {{ARTICLE_12_SECTION_02}}
- {{ARTICLE_12_SECTION_03}}
- {{ARTICLE_12_SECTION_04}}
- {{ARTICLE_12_SECTION_05}}
- {{ARTICLE_12_SIGNOFF}}
- {{ARTICLE_DESC_01}}
- {{ARTICLE_DESC_02}}
- {{ARTICLE_DESC_03}}
- {{ARTICLE_DESC_04}}
- {{ARTICLE_DESC_05}}
- {{ARTICLE_DESC_06}}
- {{ARTICLE_DESC_07}}
- {{ARTICLE_DESC_08}}
- {{ARTICLE_DESC_09}}
- {{ARTICLE_DESC_10}}
- {{ARTICLE_DESC_11}}
- {{ARTICLE_DESC_12}}
- {{ARTICLE_TITLE_01}}
- {{ARTICLE_TITLE_02}}
- {{ARTICLE_TITLE_03}}
- {{ARTICLE_TITLE_04}}
- {{ARTICLE_TITLE_05}}
- {{ARTICLE_TITLE_06}}
- {{ARTICLE_TITLE_07}}
- {{ARTICLE_TITLE_08}}
- {{ARTICLE_TITLE_09}}
- {{ARTICLE_TITLE_10}}
- {{ARTICLE_TITLE_11}}
- {{ARTICLE_TITLE_12}}
- {{AUTHOR_NAME}}
- {{BENEFIT_DISCLAIMER}}
- {{BENEFIT_RATE}}
- {{BRAND_EN}}
- {{CATEGORY_01_NOTE_BODY}}
- {{CATEGORY_01_NOTE_TITLE}}
- {{CATEGORY_02_NOTE_BODY}}
- {{CATEGORY_02_NOTE_TITLE}}
- {{CATEGORY_03_NOTE_BODY}}
- {{CATEGORY_03_NOTE_TITLE}}
- {{CONTACT_BODY}}
- {{CONTACT_EMAIL}}
- {{CORRECTIONS_BODY}}
- {{CORRECTION_DATE_01}}
- {{CORRECTION_DATE_02}}
- {{CORRECTION_DATE_03}}
- {{CORRECTION_ITEM_01}}
- {{CORRECTION_ITEM_02}}
- {{CORRECTION_ITEM_03}}
- {{DATE_MODIFIED}}
- {{DATE_PUBLISHED}}
- {{DISCLAIMER_BODY}}
- {{DISCLOSURE_BODY}}
- {{EDITORIAL_BODY}}
- {{HOME_KICKER}}
- {{HOME_SUBMISSION_TEXT}}
- {{HOME_TITLE}}
- {{INVITE_CODE}}
- {{LANG}}
- {{LEGAL_01_HEADING_01}}
- {{LEGAL_01_HEADING_02}}
- {{LEGAL_01_HEADING_03}}
- {{LEGAL_01_SECTION_01}}
- {{LEGAL_01_SECTION_02}}
- {{LEGAL_01_SECTION_03}}
- {{LEGAL_02_HEADING_01}}
- {{LEGAL_02_HEADING_02}}
- {{LEGAL_02_HEADING_03}}
- {{LEGAL_02_SECTION_01}}
- {{LEGAL_02_SECTION_02}}
- {{LEGAL_02_SECTION_03}}
- {{LEGAL_03_HEADING_01}}
- {{LEGAL_03_HEADING_02}}
- {{LEGAL_03_HEADING_03}}
- {{LEGAL_03_SECTION_01}}
- {{LEGAL_03_SECTION_02}}
- {{LEGAL_03_SECTION_03}}
- {{LEGAL_04_HEADING_01}}
- {{LEGAL_04_HEADING_02}}
- {{LEGAL_04_HEADING_03}}
- {{LEGAL_04_SECTION_01}}
- {{LEGAL_04_SECTION_02}}
- {{LEGAL_04_SECTION_03}}
- {{LEGAL_05_HEADING_01}}
- {{LEGAL_05_HEADING_02}}
- {{LEGAL_05_HEADING_03}}
- {{LEGAL_05_SECTION_01}}
- {{LEGAL_05_SECTION_02}}
- {{LEGAL_05_SECTION_03}}
- {{LEGAL_07_HEADING_01}}
- {{LEGAL_07_HEADING_02}}
- {{LEGAL_07_HEADING_03}}
- {{LEGAL_07_SECTION_01}}
- {{LEGAL_07_SECTION_02}}
- {{LEGAL_07_SECTION_03}}
- {{PRIVACY_BODY}}
- {{REGISTRATION_LINK_CONTEXT}}
- {{REGISTRATION_LINK_HEADING}}
- {{REVIEWER_NAME}}
- {{RISK_NOTICE}}
- {{SECURITY_EXPIRES}}
- {{SITE_DESC}}
- {{SITE_DOMAIN}}
- {{SITE_NAME}}
- {{SITE_TAGLINE}}
- {{TOOL_01_GUIDE_01}}
- {{TOOL_01_GUIDE_02}}
- {{TOOL_01_GUIDE_03}}
- {{TOOL_01_GUIDE_04}}
- {{TOOL_01_GUIDE_05}}
- {{TOOL_01_GUIDE_06}}
- {{TOOL_02_GUIDE_01}}
- {{TOOL_02_GUIDE_02}}
- {{TOOL_02_GUIDE_03}}
- {{TOOL_02_GUIDE_04}}
- {{TOOL_02_GUIDE_05}}
- {{TOOL_02_GUIDE_06}}
- {{TOOL_03_GUIDE_01}}
- {{TOOL_03_GUIDE_02}}
- {{TOOL_03_GUIDE_03}}
- {{TOOL_03_GUIDE_04}}
- {{TOOL_03_GUIDE_05}}
- {{TOOL_03_GUIDE_06}}
- {{TOOL_04_GUIDE_01}}
- {{TOOL_04_GUIDE_02}}
- {{TOOL_04_GUIDE_03}}
- {{TOOL_04_GUIDE_04}}
- {{TOOL_04_GUIDE_05}}
- {{TOOL_04_GUIDE_06}}
- {{TOOL_05_GUIDE_01}}
- {{TOOL_05_GUIDE_02}}
- {{TOOL_05_GUIDE_03}}
- {{TOOL_05_GUIDE_04}}
- {{TOOL_05_GUIDE_05}}
- {{TOOL_05_GUIDE_06}}

## 验收

运行基础体检、严格审计、工作流就绪审计与全库相似度审计；随后逐页检查桌面、390px、360px，实点首页复制/主题/筛选、五工具正常/错误/边界/重置/复制、唯一推广链接槽位和 404 三条出口。

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "article.html",
  "articles": [
    "dispatches/access-entry-brief.html",
    "dispatches/fee-source-map.html",
    "dispatches/policy-change-log.html",
    "dispatches/identity-evidence-kit.html",
    "dispatches/custody-route-board.html",
    "dispatches/transfer-checklist.html",
    "dispatches/recovery-contact-sheet.html",
    "dispatches/session-safety-poster.html",
    "dispatches/quote-window-notes.html",
    "dispatches/dispute-record-pack.html",
    "dispatches/proof-reading-sequence.html",
    "dispatches/monthly-wall-reset.html"
  ],
  "cornerstones": [
    "dispatches/access-entry-brief.html",
    "dispatches/fee-source-map.html"
  ],
  "registrationGuide": "dispatches/access-entry-brief.html",
  "articleCovers": {
    "dispatches/access-entry-brief.html": {
      "display": "assets/covers/access-entry-brief.webp",
      "og": "assets/covers/access-entry-brief.png"
    },
    "dispatches/fee-source-map.html": {
      "display": "assets/covers/fee-source-map.webp",
      "og": "assets/covers/fee-source-map.png"
    },
    "dispatches/policy-change-log.html": {
      "display": "assets/covers/policy-change-log.webp",
      "og": "assets/covers/policy-change-log.png"
    },
    "dispatches/identity-evidence-kit.html": {
      "display": "assets/covers/identity-evidence-kit.webp",
      "og": "assets/covers/identity-evidence-kit.png"
    },
    "dispatches/custody-route-board.html": {
      "display": "assets/covers/custody-route-board.webp",
      "og": "assets/covers/custody-route-board.png"
    },
    "dispatches/transfer-checklist.html": {
      "display": "assets/covers/transfer-checklist.webp",
      "og": "assets/covers/transfer-checklist.png"
    },
    "dispatches/recovery-contact-sheet.html": {
      "display": "assets/covers/recovery-contact-sheet.webp",
      "og": "assets/covers/recovery-contact-sheet.png"
    },
    "dispatches/session-safety-poster.html": {
      "display": "assets/covers/session-safety-poster.webp",
      "og": "assets/covers/session-safety-poster.png"
    },
    "dispatches/quote-window-notes.html": {
      "display": "assets/covers/quote-window-notes.webp",
      "og": "assets/covers/quote-window-notes.png"
    },
    "dispatches/dispute-record-pack.html": {
      "display": "assets/covers/dispute-record-pack.webp",
      "og": "assets/covers/dispute-record-pack.png"
    },
    "dispatches/proof-reading-sequence.html": {
      "display": "assets/covers/proof-reading-sequence.webp",
      "og": "assets/covers/proof-reading-sequence.png"
    },
    "dispatches/monthly-wall-reset.html": {
      "display": "assets/covers/monthly-wall-reset.webp",
      "og": "assets/covers/monthly-wall-reset.png"
    }
  },
  "categories": [
    {
      "path": "bays/source-bay.html",
      "label": "来源料场",
      "articles": [
        "dispatches/fee-source-map.html",
        "dispatches/policy-change-log.html",
        "dispatches/quote-window-notes.html",
        "dispatches/proof-reading-sequence.html"
      ]
    },
    {
      "path": "bays/action-bay.html",
      "label": "行动工位",
      "articles": [
        "dispatches/access-entry-brief.html",
        "dispatches/identity-evidence-kit.html",
        "dispatches/transfer-checklist.html",
        "dispatches/recovery-contact-sheet.html"
      ]
    },
    {
      "path": "bays/record-bay.html",
      "label": "记录仓",
      "articles": [
        "dispatches/custody-route-board.html",
        "dispatches/session-safety-poster.html",
        "dispatches/dispute-record-pack.html",
        "dispatches/monthly-wall-reset.html"
      ]
    }
  ],
  "toolIndex": "tool.html",
  "tools": [
    "instruments/date-span.html",
    "instruments/weight-balance.html",
    "instruments/text-fingerprint.html",
    "instruments/review-cadence.html",
    "instruments/sample-budget.html"
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
