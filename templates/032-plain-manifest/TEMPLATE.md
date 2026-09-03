# 032 — Plain Manifest / 素面章程

这是一套 workflow-ready v2 的高端公开章程模板。它保留原作最有辨识度的暖纸、编辑蓝、批注红、荧光签章和语义化 data 属性，用封面装订、章节册、责任记录、修订档案与本地校对台组织完整网站；不复用上一套数据晨报的版次栏、统计表格或城市读数叙事。

后续 AI 只需替换站点变量、经核验的文字、来源与文章正文，不需要重新设计导航、响应式、SEO 元数据、封面、分类、法律页或五件工具。变量只是文字接入口，不代表已经核验的事实。

## 已完成框架

- 首页形态 A：首屏邀请码、复制功能、弹性利益点、脚注与唯一编辑式访问附录入口；没有外部推广直链。
- 12 篇文章分别使用证据记录、决策路径、例外窗口、交接勾选、会议纪要、修订台账、公开路线图、贡献约定、事件简报、术语索引、验证刻度和访问附录结构。
- 三册独立章节、五件纯本地文字工具、七个合规页、404、RSS、安全联系、图标、社交图与 12 套 1200×630 PNG/WebP 封面均已接好。
- 五件工具分别处理字符宽度、锚点编目、规范强度、版本行差异和证据行完整度；各自具有正常、错误、边界、重置、复制与输入后旧结果失效状态。

## 访问附录边界

`clauses/access-appendix.html` 只是内容与 UI 外壳，不含注册步骤、平台规则、费率或监管事实。它恰好保留一个静态 `AFFILIATE_URL` href，带 `target=_blank`、`rel=sponsored nofollow noopener noreferrer`，并紧邻可见的推荐/推广链接披露；其余页面没有推广直链。

## 内容接入顺序

1. 替换站名、域名、英文 wordmark、作者、联系、日期、邀请码、利益比例和脚注。
2. 按实际关键词与事实调研填写十二篇文字；保留十二种内容结构。数字、费用、限制与监管信息必须核验来源和日期。
3. 只替换文字、链接和 alt；保留 data 属性、DOM 主骨架、表单 id、ARIA、封面尺寸和脚本引用。
4. 默认保持首页形态 A。具体站如需形态 B，必须由站主在单站流程中明确授权。
5. 文字完成后重跑三套静态审计、相似度检查，并在桌面、390px、360px 实测 31 条路由、首页复制/主题/菜单/筛选、五工具全部状态、访问链接属性和 404 三出口。

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "article.html",
  "articles": [
    "clauses/evidence-record.html",
    "clauses/decision-log.html",
    "clauses/exception-window.html",
    "clauses/handoff-sheet.html",
    "clauses/meeting-minutes.html",
    "clauses/change-note.html",
    "clauses/public-roadmap.html",
    "clauses/contributor-agreement.html",
    "clauses/incident-brief.html",
    "clauses/glossary-standard.html",
    "clauses/verification-protocol.html",
    "clauses/access-appendix.html"
  ],
  "cornerstones": [
    "clauses/evidence-record.html",
    "clauses/verification-protocol.html"
  ],
  "registrationGuide": "clauses/access-appendix.html",
  "articleCovers": {
    "clauses/evidence-record.html": {
      "display": "assets/covers/evidence-record.webp",
      "og": "assets/covers/evidence-record.png"
    },
    "clauses/decision-log.html": {
      "display": "assets/covers/decision-log.webp",
      "og": "assets/covers/decision-log.png"
    },
    "clauses/exception-window.html": {
      "display": "assets/covers/exception-window.webp",
      "og": "assets/covers/exception-window.png"
    },
    "clauses/handoff-sheet.html": {
      "display": "assets/covers/handoff-sheet.webp",
      "og": "assets/covers/handoff-sheet.png"
    },
    "clauses/meeting-minutes.html": {
      "display": "assets/covers/meeting-minutes.webp",
      "og": "assets/covers/meeting-minutes.png"
    },
    "clauses/change-note.html": {
      "display": "assets/covers/change-note.webp",
      "og": "assets/covers/change-note.png"
    },
    "clauses/public-roadmap.html": {
      "display": "assets/covers/public-roadmap.webp",
      "og": "assets/covers/public-roadmap.png"
    },
    "clauses/contributor-agreement.html": {
      "display": "assets/covers/contributor-agreement.webp",
      "og": "assets/covers/contributor-agreement.png"
    },
    "clauses/incident-brief.html": {
      "display": "assets/covers/incident-brief.webp",
      "og": "assets/covers/incident-brief.png"
    },
    "clauses/glossary-standard.html": {
      "display": "assets/covers/glossary-standard.webp",
      "og": "assets/covers/glossary-standard.png"
    },
    "clauses/verification-protocol.html": {
      "display": "assets/covers/verification-protocol.webp",
      "og": "assets/covers/verification-protocol.png"
    },
    "clauses/access-appendix.html": {
      "display": "assets/covers/access-appendix.webp",
      "og": "assets/covers/access-appendix.png"
    }
  },
  "categories": [
    {
      "path": "chapters/clarity.html",
      "label": "明文原则",
      "articles": [
        "clauses/evidence-record.html",
        "clauses/decision-log.html",
        "clauses/exception-window.html",
        "clauses/handoff-sheet.html"
      ]
    },
    {
      "path": "chapters/accountability.html",
      "label": "责任记录",
      "articles": [
        "clauses/meeting-minutes.html",
        "clauses/change-note.html",
        "clauses/public-roadmap.html",
        "clauses/contributor-agreement.html"
      ]
    },
    {
      "path": "chapters/revision.html",
      "label": "修订档案",
      "articles": [
        "clauses/incident-brief.html",
        "clauses/glossary-standard.html",
        "clauses/verification-protocol.html",
        "clauses/access-appendix.html"
      ]
    }
  ],
  "toolIndex": "tool.html",
  "tools": [
    "workbench/width-normalizer.html",
    "workbench/anchor-maker.html",
    "workbench/requirement-counter.html",
    "workbench/revision-diff.html",
    "workbench/evidence-checker.html"
  ],
  "legal": {
    "about": "about.html",
    "contact": "contact.html",
    "disclosure": "legal.html",
    "disclaimer": "disclaimer.html",
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
    "siteDomain": "__SITE_DOMAIN__",
    "siteName": "__SITE_NAME__",
    "wordmark": "__BRAND_EN__",
    "inviteCode": "__INVITE_CODE__",
    "benefitRate": "__BENEFIT_RATE__",
    "benefitDisclaimer": "__BENEFIT_DISCLAIMER__",
    "affiliateUrl": "__AFFILIATE_URL__"
  }
}
```

## 变量清单

- `__ABOUT_AUTHORSHIP__`
- `__ABOUT_CONTACT_NOTE__`
- `__ABOUT_DESCRIPTION__`
- `__ABOUT_INDEPENDENCE__`
- `__ABOUT_SCOPE__`
- `__ABOUT_TITLE__`
- `__ACCESS_COVER_ALT__`
- `__ACCESS_COVER_CAPTION__`
- `__ACCESS_DECK__`
- `__ACCESS_DESCRIPTION__`
- `__ACCESS_FACT_1_LABEL__`
- `__ACCESS_FACT_1_VALUE__`
- `__ACCESS_FACT_2_LABEL__`
- `__ACCESS_FACT_2_VALUE__`
- `__ACCESS_FAQ_ANSWER__`
- `__ACCESS_FAQ_QUESTION__`
- `__ACCESS_READING_TIME__`
- `__ACCESS_SECTION_1_BODY__`
- `__ACCESS_SECTION_1_TITLE__`
- `__ACCESS_SECTION_2_BODY__`
- `__ACCESS_SECTION_2_TITLE__`
- `__ACCESS_SECTION_3_BODY__`
- `__ACCESS_SECTION_3_TITLE__`
- `__ACCESS_SECTION_4_BODY__`
- `__ACCESS_SECTION_4_TITLE__`
- `__ACCESS_SECTION_5_BODY__`
- `__ACCESS_SECTION_5_TITLE__`
- `__ACCESS_SOURCE_NOTE__`
- `__ACCESS_TITLE__`
- `__ACCOUNTABILITY_CHAPTER_DESCRIPTION__`
- `__ACCOUNTABILITY_CHAPTER_TITLE__`
- `__AFFILIATE_DISCLOSURE__`
- `__AFFILIATE_LINK_LABEL__`
- `__AFFILIATE_URL__`
- `__AGREEMENT_HEADER_NOTE__`
- `__ANCHOR_GUIDE_BOUNDARY__`
- `__ANCHOR_GUIDE_INPUT__`
- `__ANCHOR_GUIDE_METHOD__`
- `__ANCHOR_GUIDE_PRIVACY__`
- `__ANCHOR_GUIDE_RESULT__`
- `__ANCHOR_INPUT_PLACEHOLDER__`
- `__ANCHOR_SECONDARY_PLACEHOLDER__`
- `__ARTICLE_INDEX_DESCRIPTION__`
- `__ARTICLE_INDEX_INTRODUCTION__`
- `__ARTICLE_INDEX_TITLE__`
- `__AUTHOR_NAME__`
- `__BENEFIT_DISCLAIMER__`
- `__BENEFIT_RATE__`
- `__BRAND_EN__`
- `__CHANGE_CELL_1__`
- `__CHANGE_CELL_2__`
- `__CHANGE_CELL_3__`
- `__CHANGE_COL_1__`
- `__CHANGE_COL_2__`
- `__CHANGE_COL_3__`
- `__CHANGE_COVER_ALT__`
- `__CHANGE_COVER_CAPTION__`
- `__CHANGE_DECK__`
- `__CHANGE_DESCRIPTION__`
- `__CHANGE_READING_TIME__`
- `__CHANGE_SECTION_1_BODY__`
- `__CHANGE_SECTION_1_TITLE__`
- `__CHANGE_SECTION_2_BODY__`
- `__CHANGE_SECTION_2_TITLE__`
- `__CHANGE_SECTION_3_BODY__`
- `__CHANGE_SECTION_3_TITLE__`
- `__CHANGE_SECTION_4_BODY__`
- `__CHANGE_SECTION_4_TITLE__`
- `__CHANGE_SECTION_5_BODY__`
- `__CHANGE_SECTION_5_TITLE__`
- `__CHANGE_SOURCE_NOTE__`
- `__CHANGE_TABLE_CAPTION__`
- `__CHANGE_TITLE__`
- `__CLARITY_CHAPTER_DESCRIPTION__`
- `__CLARITY_CHAPTER_TITLE__`
- `__CONTACT_BOUNDARY__`
- `__CONTACT_CORRECTION__`
- `__CONTACT_DESCRIPTION__`
- `__CONTACT_EMAIL__`
- `__CONTACT_GENERAL__`
- `__CONTACT_SECURITY__`
- `__CONTACT_TITLE__`
- `__CONTRIBUTOR_COVER_ALT__`
- `__CONTRIBUTOR_COVER_CAPTION__`
- `__CONTRIBUTOR_DECK__`
- `__CONTRIBUTOR_DESCRIPTION__`
- `__CONTRIBUTOR_READING_TIME__`
- `__CONTRIBUTOR_SECTION_1_BODY__`
- `__CONTRIBUTOR_SECTION_1_TITLE__`
- `__CONTRIBUTOR_SECTION_2_BODY__`
- `__CONTRIBUTOR_SECTION_2_TITLE__`
- `__CONTRIBUTOR_SECTION_3_BODY__`
- `__CONTRIBUTOR_SECTION_3_TITLE__`
- `__CONTRIBUTOR_SECTION_4_BODY__`
- `__CONTRIBUTOR_SECTION_4_TITLE__`
- `__CONTRIBUTOR_SECTION_5_BODY__`
- `__CONTRIBUTOR_SECTION_5_TITLE__`
- `__CONTRIBUTOR_SOURCE_NOTE__`
- `__CONTRIBUTOR_TITLE__`
- `__CORRECTIONS_DESCRIPTION__`
- `__CORRECTIONS_LOG__`
- `__CORRECTIONS_PROCESS__`
- `__CORRECTIONS_REQUIRED__`
- `__CORRECTIONS_SUBMIT__`
- `__CORRECTIONS_TITLE__`
- `__DECISION_COVER_ALT__`
- `__DECISION_COVER_CAPTION__`
- `__DECISION_DECK__`
- `__DECISION_DESCRIPTION__`
- `__DECISION_READING_TIME__`
- `__DECISION_SECTION_1_BODY__`
- `__DECISION_SECTION_1_TITLE__`
- `__DECISION_SECTION_2_BODY__`
- `__DECISION_SECTION_2_TITLE__`
- `__DECISION_SECTION_3_BODY__`
- `__DECISION_SECTION_3_TITLE__`
- `__DECISION_SECTION_4_BODY__`
- `__DECISION_SECTION_4_TITLE__`
- `__DECISION_SECTION_5_BODY__`
- `__DECISION_SECTION_5_TITLE__`
- `__DECISION_SOURCE_NOTE__`
- `__DECISION_TITLE__`
- `__DIFF_GUIDE_BOUNDARY__`
- `__DIFF_GUIDE_INPUT__`
- `__DIFF_GUIDE_METHOD__`
- `__DIFF_GUIDE_PRIVACY__`
- `__DIFF_GUIDE_RESULT__`
- `__DIFF_INPUT_PLACEHOLDER__`
- `__DIFF_SECONDARY_PLACEHOLDER__`
- `__DISCLAIMER_DESCRIPTION__`
- `__DISCLAIMER_GENERAL__`
- `__DISCLAIMER_RISK__`
- `__DISCLAIMER_TIMELINESS__`
- `__DISCLAIMER_TITLE__`
- `__DISCLAIMER_VERIFY__`
- `__DISCLOSURE_COST__`
- `__DISCLOSURE_DESCRIPTION__`
- `__DISCLOSURE_EDITORIAL__`
- `__DISCLOSURE_LINKS__`
- `__DISCLOSURE_RELATIONSHIP__`
- `__DISCLOSURE_TITLE__`
- `__EDITORIAL_DATES__`
- `__EDITORIAL_DESCRIPTION__`
- `__EDITORIAL_FACTS__`
- `__EDITORIAL_SOURCES__`
- `__EDITORIAL_TITLE__`
- `__EDITORIAL_TOOLS__`
- `__EVIDENCE_COVER_ALT__`
- `__EVIDENCE_COVER_CAPTION__`
- `__EVIDENCE_DECK__`
- `__EVIDENCE_DESCRIPTION__`
- `__EVIDENCE_FIELD_1_LABEL__`
- `__EVIDENCE_FIELD_1_VALUE__`
- `__EVIDENCE_FIELD_2_LABEL__`
- `__EVIDENCE_FIELD_2_VALUE__`
- `__EVIDENCE_READING_TIME__`
- `__EVIDENCE_SECTION_1_BODY__`
- `__EVIDENCE_SECTION_1_TITLE__`
- `__EVIDENCE_SECTION_2_BODY__`
- `__EVIDENCE_SECTION_2_TITLE__`
- `__EVIDENCE_SECTION_3_BODY__`
- `__EVIDENCE_SECTION_3_TITLE__`
- `__EVIDENCE_SECTION_4_BODY__`
- `__EVIDENCE_SECTION_4_TITLE__`
- `__EVIDENCE_SECTION_5_BODY__`
- `__EVIDENCE_SECTION_5_TITLE__`
- `__EVIDENCE_SOURCE_NOTE__`
- `__EVIDENCE_TITLE__`
- `__EXCEPTION_COVER_ALT__`
- `__EXCEPTION_COVER_CAPTION__`
- `__EXCEPTION_DECK__`
- `__EXCEPTION_DESCRIPTION__`
- `__EXCEPTION_QUOTE_1__`
- `__EXCEPTION_QUOTE_2__`
- `__EXCEPTION_READING_TIME__`
- `__EXCEPTION_SECTION_1_BODY__`
- `__EXCEPTION_SECTION_1_TITLE__`
- `__EXCEPTION_SECTION_2_BODY__`
- `__EXCEPTION_SECTION_2_TITLE__`
- `__EXCEPTION_SECTION_3_BODY__`
- `__EXCEPTION_SECTION_3_TITLE__`
- `__EXCEPTION_SECTION_4_BODY__`
- `__EXCEPTION_SECTION_4_TITLE__`
- `__EXCEPTION_SECTION_5_BODY__`
- `__EXCEPTION_SECTION_5_TITLE__`
- `__EXCEPTION_SOURCE_NOTE__`
- `__EXCEPTION_TITLE__`
- `__FEED_DESCRIPTION__`
- `__FEED_PUBDATE__`
- `__FORCE_GUIDE_BOUNDARY__`
- `__FORCE_GUIDE_INPUT__`
- `__FORCE_GUIDE_METHOD__`
- `__FORCE_GUIDE_PRIVACY__`
- `__FORCE_GUIDE_RESULT__`
- `__FORCE_INPUT_PLACEHOLDER__`
- `__GLOSSARY_COVER_ALT__`
- `__GLOSSARY_COVER_CAPTION__`
- `__GLOSSARY_DECK__`
- `__GLOSSARY_DESCRIPTION__`
- `__GLOSSARY_READING_TIME__`
- `__GLOSSARY_SECTION_1_BODY__`
- `__GLOSSARY_SECTION_1_TITLE__`
- `__GLOSSARY_SECTION_2_BODY__`
- `__GLOSSARY_SECTION_2_TITLE__`
- `__GLOSSARY_SECTION_3_BODY__`
- `__GLOSSARY_SECTION_3_TITLE__`
- `__GLOSSARY_SECTION_4_BODY__`
- `__GLOSSARY_SECTION_4_TITLE__`
- `__GLOSSARY_SECTION_5_BODY__`
- `__GLOSSARY_SECTION_5_TITLE__`
- `__GLOSSARY_SOURCE_NOTE__`
- `__GLOSSARY_TERM_1__`
- `__GLOSSARY_TERM_2__`
- `__GLOSSARY_TERM_3__`
- `__GLOSSARY_TERM_4__`
- `__GLOSSARY_TERM_5__`
- `__GLOSSARY_TITLE__`
- `__HANDOFF_CHECK_1__`
- `__HANDOFF_CHECK_2__`
- `__HANDOFF_CHECK_3__`
- `__HANDOFF_CHECK_4__`
- `__HANDOFF_CHECK_5__`
- `__HANDOFF_COVER_ALT__`
- `__HANDOFF_COVER_CAPTION__`
- `__HANDOFF_DECK__`
- `__HANDOFF_DESCRIPTION__`
- `__HANDOFF_READING_TIME__`
- `__HANDOFF_SECTION_1_BODY__`
- `__HANDOFF_SECTION_1_TITLE__`
- `__HANDOFF_SECTION_2_BODY__`
- `__HANDOFF_SECTION_2_TITLE__`
- `__HANDOFF_SECTION_3_BODY__`
- `__HANDOFF_SECTION_3_TITLE__`
- `__HANDOFF_SECTION_4_BODY__`
- `__HANDOFF_SECTION_4_TITLE__`
- `__HANDOFF_SECTION_5_BODY__`
- `__HANDOFF_SECTION_5_TITLE__`
- `__HANDOFF_SOURCE_NOTE__`
- `__HANDOFF_TITLE__`
- `__HOME_DESCRIPTION__`
- `__HOME_INTRODUCTION__`
- `__HOME_TITLE__`
- `__INCIDENT_COVER_ALT__`
- `__INCIDENT_COVER_CAPTION__`
- `__INCIDENT_DECK__`
- `__INCIDENT_DESCRIPTION__`
- `__INCIDENT_READING_TIME__`
- `__INCIDENT_SECTION_1_BODY__`
- `__INCIDENT_SECTION_1_TITLE__`
- `__INCIDENT_SECTION_2_BODY__`
- `__INCIDENT_SECTION_2_TITLE__`
- `__INCIDENT_SECTION_3_BODY__`
- `__INCIDENT_SECTION_3_TITLE__`
- `__INCIDENT_SECTION_4_BODY__`
- `__INCIDENT_SECTION_4_TITLE__`
- `__INCIDENT_SECTION_5_BODY__`
- `__INCIDENT_SECTION_5_TITLE__`
- `__INCIDENT_SEVERITY_NOTE__`
- `__INCIDENT_SOURCE_NOTE__`
- `__INCIDENT_TITLE__`
- `__INVITE_CODE__`
- `__LANG__`
- `__MINUTES_COVER_ALT__`
- `__MINUTES_COVER_CAPTION__`
- `__MINUTES_DECK__`
- `__MINUTES_DESCRIPTION__`
- `__MINUTES_READING_TIME__`
- `__MINUTES_SECTION_1_BODY__`
- `__MINUTES_SECTION_1_TITLE__`
- `__MINUTES_SECTION_2_BODY__`
- `__MINUTES_SECTION_2_TITLE__`
- `__MINUTES_SECTION_3_BODY__`
- `__MINUTES_SECTION_3_TITLE__`
- `__MINUTES_SECTION_4_BODY__`
- `__MINUTES_SECTION_4_TITLE__`
- `__MINUTES_SECTION_5_BODY__`
- `__MINUTES_SECTION_5_TITLE__`
- `__MINUTES_SOURCE_NOTE__`
- `__MINUTES_TIME_1__`
- `__MINUTES_TIME_2__`
- `__MINUTES_TIME_3__`
- `__MINUTES_TIME_4__`
- `__MINUTES_TIME_5__`
- `__MINUTES_TITLE__`
- `__MODIFIED_DATE__`
- `__PRIVACY_CONTACT__`
- `__PRIVACY_DESCRIPTION__`
- `__PRIVACY_EXTERNAL__`
- `__PRIVACY_HOSTING__`
- `__PRIVACY_LOCAL__`
- `__PRIVACY_TITLE__`
- `__PROOF_GUIDE_BOUNDARY__`
- `__PROOF_GUIDE_INPUT__`
- `__PROOF_GUIDE_METHOD__`
- `__PROOF_GUIDE_PRIVACY__`
- `__PROOF_GUIDE_RESULT__`
- `__PROOF_INPUT_PLACEHOLDER__`
- `__PROOF_SECONDARY_PLACEHOLDER__`
- `__PUBLISHED_DATE__`
- `__REVISION_CHAPTER_DESCRIPTION__`
- `__REVISION_CHAPTER_TITLE__`
- `__ROADMAP_COVER_ALT__`
- `__ROADMAP_COVER_CAPTION__`
- `__ROADMAP_DECK__`
- `__ROADMAP_DESCRIPTION__`
- `__ROADMAP_READING_TIME__`
- `__ROADMAP_SECTION_1_BODY__`
- `__ROADMAP_SECTION_1_TITLE__`
- `__ROADMAP_SECTION_2_BODY__`
- `__ROADMAP_SECTION_2_TITLE__`
- `__ROADMAP_SECTION_3_BODY__`
- `__ROADMAP_SECTION_3_TITLE__`
- `__ROADMAP_SECTION_4_BODY__`
- `__ROADMAP_SECTION_4_TITLE__`
- `__ROADMAP_SECTION_5_BODY__`
- `__ROADMAP_SECTION_5_TITLE__`
- `__ROADMAP_SOURCE_NOTE__`
- `__ROADMAP_TITLE__`
- `__SECURITY_EXPIRES__`
- `__SITE_DOMAIN__`
- `__SITE_NAME__`
- `__TOOL_INDEX_DESCRIPTION__`
- `__TOOL_INDEX_TITLE__`
- `__VERIFY_COVER_ALT__`
- `__VERIFY_COVER_CAPTION__`
- `__VERIFY_DECK__`
- `__VERIFY_DESCRIPTION__`
- `__VERIFY_READING_TIME__`
- `__VERIFY_SECTION_1_BODY__`
- `__VERIFY_SECTION_1_TITLE__`
- `__VERIFY_SECTION_2_BODY__`
- `__VERIFY_SECTION_2_TITLE__`
- `__VERIFY_SECTION_3_BODY__`
- `__VERIFY_SECTION_3_TITLE__`
- `__VERIFY_SECTION_4_BODY__`
- `__VERIFY_SECTION_4_TITLE__`
- `__VERIFY_SECTION_5_BODY__`
- `__VERIFY_SECTION_5_TITLE__`
- `__VERIFY_SOURCE_NOTE__`
- `__VERIFY_TITLE__`
- `__WIDTH_GUIDE_BOUNDARY__`
- `__WIDTH_GUIDE_INPUT__`
- `__WIDTH_GUIDE_METHOD__`
- `__WIDTH_GUIDE_PRIVACY__`
- `__WIDTH_GUIDE_RESULT__`
- `__WIDTH_INPUT_PLACEHOLDER__`
- `__WIDTH_SECONDARY_PLACEHOLDER__`
