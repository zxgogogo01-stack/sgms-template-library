# 035 — Cedar Field Handbook / 雪松现场手册

这是一套 workflow-ready v2 的高端现场知识手册模板。视觉语言来自雪松皮革书脊、折叠地形图、黄铜许可签、纵向札记与野外工具包；纸张、苔绿、树皮锈色和深林绿构成独立识别。

后续 AI 只需替换站点变量、经核验的文字、来源和文章正文，不需要重建 UI、组件、响应式、SEO、分类、合规页、封面或工具逻辑。模板不包含可发布的注册教程正文，也不写死平台规则、费率、限额、监管结论或实时数据。

## 已搭建框架

- 首页形态 A：首屏黄铜许可签包含邀请码、一键复制、弹性利益点、政策脚注与一处编辑式访问许可入口；首页没有外部推广链接。
- 十二种文章地形、三条主题路线、五件纯本地现场工具、七张责任页、独立 404、RSS、安全联系、图标、社交图及十二套独立 1200×630 PNG/WebP 封面。
- 五工具具备正常、错误、边界、重置、复制和输入变化后旧结果失效状态；Guide 默认折叠且每页含五个说明章节。

## 访问许可边界

`fieldnotes/permit-page.html` 只是待填充的访问内容外壳。它不包含注册步骤或教程文字，只保留一个静态 `__AFFILIATE_URL__` 链接槽位、完整的 `target` / `rel` 属性、邀请码与紧邻披露字段。其余页面无转化直链。

## 内容接入顺序

1. 替换站名、域名、英文 wordmark、作者、联系邮箱、日期、邀请码、利益比例及政策脚注。
2. 按核验结果填写十二篇文章变量，保留每篇不同的开场、目录、H2、FAQ、收尾和封面结构。
3. 只替换可见文字、链接与 alt；保留 `ch35-` class、`data-ch35-*` 属性、表单 id、ARIA、图片尺寸和脚本引用。
4. 默认保持首页形态 A。推广策略、生产发布、域名、Cloudflare、VPS 与 GSC 不属于此模板。
5. 接入内容后重跑三套静态审计、相似度检查，并在桌面、390px、360px 实测 31 条路由和全部交互状态。

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "article.html",
  "articles": [
    "fieldnotes/site-orientation.html",
    "fieldnotes/operating-sequence.html",
    "fieldnotes/equipment-anatomy.html",
    "fieldnotes/condition-log.html",
    "fieldnotes/decision-tree.html",
    "fieldnotes/maintenance-cycle.html",
    "fieldnotes/handover-card.html",
    "fieldnotes/incident-trace.html",
    "fieldnotes/spec-sheet.html",
    "fieldnotes/crew-dialogue.html",
    "fieldnotes/field-glossary.html",
    "fieldnotes/permit-page.html"
  ],
  "cornerstones": [
    "fieldnotes/site-orientation.html",
    "fieldnotes/decision-tree.html"
  ],
  "registrationGuide": "fieldnotes/permit-page.html",
  "articleCovers": {
    "fieldnotes/site-orientation.html": {
      "display": "assets/covers/site-orientation.webp",
      "og": "assets/covers/site-orientation.png"
    },
    "fieldnotes/operating-sequence.html": {
      "display": "assets/covers/operating-sequence.webp",
      "og": "assets/covers/operating-sequence.png"
    },
    "fieldnotes/equipment-anatomy.html": {
      "display": "assets/covers/equipment-anatomy.webp",
      "og": "assets/covers/equipment-anatomy.png"
    },
    "fieldnotes/condition-log.html": {
      "display": "assets/covers/condition-log.webp",
      "og": "assets/covers/condition-log.png"
    },
    "fieldnotes/decision-tree.html": {
      "display": "assets/covers/decision-tree.webp",
      "og": "assets/covers/decision-tree.png"
    },
    "fieldnotes/maintenance-cycle.html": {
      "display": "assets/covers/maintenance-cycle.webp",
      "og": "assets/covers/maintenance-cycle.png"
    },
    "fieldnotes/handover-card.html": {
      "display": "assets/covers/handover-card.webp",
      "og": "assets/covers/handover-card.png"
    },
    "fieldnotes/incident-trace.html": {
      "display": "assets/covers/incident-trace.webp",
      "og": "assets/covers/incident-trace.png"
    },
    "fieldnotes/spec-sheet.html": {
      "display": "assets/covers/spec-sheet.webp",
      "og": "assets/covers/spec-sheet.png"
    },
    "fieldnotes/crew-dialogue.html": {
      "display": "assets/covers/crew-dialogue.webp",
      "og": "assets/covers/crew-dialogue.png"
    },
    "fieldnotes/field-glossary.html": {
      "display": "assets/covers/field-glossary.webp",
      "og": "assets/covers/field-glossary.png"
    },
    "fieldnotes/permit-page.html": {
      "display": "assets/covers/permit-page.webp",
      "og": "assets/covers/permit-page.png"
    }
  },
  "categories": [
    {
      "path": "trailheads/orientation.html",
      "label": "起点营地",
      "articles": [
        "fieldnotes/site-orientation.html",
        "fieldnotes/operating-sequence.html",
        "fieldnotes/equipment-anatomy.html",
        "fieldnotes/condition-log.html"
      ]
    },
    {
      "path": "trailheads/operations.html",
      "label": "林线工位",
      "articles": [
        "fieldnotes/decision-tree.html",
        "fieldnotes/maintenance-cycle.html",
        "fieldnotes/handover-card.html",
        "fieldnotes/incident-trace.html"
      ]
    },
    {
      "path": "trailheads/stewardship.html",
      "label": "回程档案",
      "articles": [
        "fieldnotes/spec-sheet.html",
        "fieldnotes/crew-dialogue.html",
        "fieldnotes/field-glossary.html",
        "fieldnotes/permit-page.html"
      ]
    }
  ],
  "toolIndex": "tool.html",
  "tools": [
    "kit/shift-coverage.html",
    "kit/checklist-progress.html",
    "kit/maintenance-schedule.html",
    "kit/sampling-grid.html",
    "kit/pack-weight.html"
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

- `__ABOUT_CONTACT_NOTE__`
- `__ABOUT_DESCRIPTION__`
- `__ABOUT_INTRODUCTION__`
- `__ABOUT_SECTION_1_BODY__`
- `__ABOUT_SECTION_1_TITLE__`
- `__ABOUT_SECTION_2_BODY__`
- `__ABOUT_SECTION_2_TITLE__`
- `__ABOUT_SECTION_3_BODY__`
- `__ABOUT_SECTION_3_TITLE__`
- `__ABOUT_SECTION_4_BODY__`
- `__ABOUT_SECTION_4_TITLE__`
- `__ABOUT_TITLE__`
- `__AFFILIATE_DISCLOSURE__`
- `__AFFILIATE_LINK_LABEL__`
- `__AFFILIATE_URL__`
- `__ANATOMY_CALLOUT__`
- `__ANATOMY_COVER_ALT__`
- `__ANATOMY_COVER_CAPTION__`
- `__ANATOMY_DECK__`
- `__ANATOMY_DESCRIPTION__`
- `__ANATOMY_FAQ_ANSWER_1__`
- `__ANATOMY_FAQ_ANSWER_2__`
- `__ANATOMY_FAQ_QUESTION_1__`
- `__ANATOMY_FAQ_QUESTION_2__`
- `__ANATOMY_FAQ_TITLE__`
- `__ANATOMY_MARKER_1__`
- `__ANATOMY_MARKER_2__`
- `__ANATOMY_MARKER_3__`
- `__ANATOMY_MARKER_4__`
- `__ANATOMY_READING_TIME__`
- `__ANATOMY_SECTION_1_BODY__`
- `__ANATOMY_SECTION_1_TITLE__`
- `__ANATOMY_SECTION_2_BODY__`
- `__ANATOMY_SECTION_2_TITLE__`
- `__ANATOMY_SECTION_3_BODY__`
- `__ANATOMY_SECTION_3_TITLE__`
- `__ANATOMY_SECTION_4_BODY__`
- `__ANATOMY_SECTION_4_TITLE__`
- `__ANATOMY_SECTION_5_BODY__`
- `__ANATOMY_SECTION_5_TITLE__`
- `__ANATOMY_SOURCE_NOTE__`
- `__ANATOMY_TITLE__`
- `__ARTICLE_INDEX_DESCRIPTION__`
- `__ARTICLE_INDEX_INTRODUCTION__`
- `__ARTICLE_INDEX_TITLE__`
- `__AUTHOR_BIO__`
- `__AUTHOR_NAME__`
- `__BENEFIT_DISCLAIMER__`
- `__BENEFIT_RATE__`
- `__BRANCH_BRANCH_QUESTION__`
- `__BRANCH_CALLOUT__`
- `__BRANCH_COVER_ALT__`
- `__BRANCH_COVER_CAPTION__`
- `__BRANCH_DECK__`
- `__BRANCH_DESCRIPTION__`
- `__BRANCH_FAQ_ANSWER_1__`
- `__BRANCH_FAQ_ANSWER_2__`
- `__BRANCH_FAQ_QUESTION_1__`
- `__BRANCH_FAQ_QUESTION_2__`
- `__BRANCH_FAQ_TITLE__`
- `__BRANCH_MARKER_1__`
- `__BRANCH_MARKER_2__`
- `__BRANCH_MARKER_3__`
- `__BRANCH_READING_TIME__`
- `__BRANCH_SECTION_1_BODY__`
- `__BRANCH_SECTION_1_TITLE__`
- `__BRANCH_SECTION_2_BODY__`
- `__BRANCH_SECTION_2_TITLE__`
- `__BRANCH_SECTION_3_BODY__`
- `__BRANCH_SECTION_3_TITLE__`
- `__BRANCH_SECTION_4_BODY__`
- `__BRANCH_SECTION_4_TITLE__`
- `__BRANCH_SECTION_5_BODY__`
- `__BRANCH_SECTION_5_TITLE__`
- `__BRANCH_SOURCE_NOTE__`
- `__BRANCH_TITLE__`
- `__BRAND_EN__`
- `__CHECKLIST_GUIDE_BOUNDARY__`
- `__CHECKLIST_GUIDE_INPUT__`
- `__CHECKLIST_GUIDE_METHOD__`
- `__CHECKLIST_GUIDE_PRIVACY__`
- `__CHECKLIST_GUIDE_REVIEW__`
- `__CHECKLIST_TOOL_DESCRIPTION__`
- `__CHECKLIST_TOOL_INTRODUCTION__`
- `__CHECKLIST_TOOL_TITLE__`
- `__CONTACT_CONTACT_NOTE__`
- `__CONTACT_DESCRIPTION__`
- `__CONTACT_EMAIL__`
- `__CONTACT_INTRODUCTION__`
- `__CONTACT_SECTION_1_BODY__`
- `__CONTACT_SECTION_1_TITLE__`
- `__CONTACT_SECTION_2_BODY__`
- `__CONTACT_SECTION_2_TITLE__`
- `__CONTACT_SECTION_3_BODY__`
- `__CONTACT_SECTION_3_TITLE__`
- `__CONTACT_SECTION_4_BODY__`
- `__CONTACT_SECTION_4_TITLE__`
- `__CONTACT_TITLE__`
- `__CORRECTIONS_CONTACT_NOTE__`
- `__CORRECTIONS_DESCRIPTION__`
- `__CORRECTIONS_INTRODUCTION__`
- `__CORRECTIONS_SECTION_1_BODY__`
- `__CORRECTIONS_SECTION_1_TITLE__`
- `__CORRECTIONS_SECTION_2_BODY__`
- `__CORRECTIONS_SECTION_2_TITLE__`
- `__CORRECTIONS_SECTION_3_BODY__`
- `__CORRECTIONS_SECTION_3_TITLE__`
- `__CORRECTIONS_SECTION_4_BODY__`
- `__CORRECTIONS_SECTION_4_TITLE__`
- `__CORRECTIONS_TITLE__`
- `__COVERAGE_GUIDE_BOUNDARY__`
- `__COVERAGE_GUIDE_INPUT__`
- `__COVERAGE_GUIDE_METHOD__`
- `__COVERAGE_GUIDE_PRIVACY__`
- `__COVERAGE_GUIDE_REVIEW__`
- `__COVERAGE_TOOL_DESCRIPTION__`
- `__COVERAGE_TOOL_INTRODUCTION__`
- `__COVERAGE_TOOL_TITLE__`
- `__CYCLE_CALLOUT__`
- `__CYCLE_COVER_ALT__`
- `__CYCLE_COVER_CAPTION__`
- `__CYCLE_DECK__`
- `__CYCLE_DESCRIPTION__`
- `__CYCLE_FAQ_ANSWER_1__`
- `__CYCLE_FAQ_ANSWER_2__`
- `__CYCLE_FAQ_QUESTION_1__`
- `__CYCLE_FAQ_QUESTION_2__`
- `__CYCLE_FAQ_TITLE__`
- `__CYCLE_OPENING__`
- `__CYCLE_READING_TIME__`
- `__CYCLE_SECTION_1_BODY__`
- `__CYCLE_SECTION_1_TITLE__`
- `__CYCLE_SECTION_2_BODY__`
- `__CYCLE_SECTION_2_TITLE__`
- `__CYCLE_SECTION_3_BODY__`
- `__CYCLE_SECTION_3_TITLE__`
- `__CYCLE_SECTION_4_BODY__`
- `__CYCLE_SECTION_4_TITLE__`
- `__CYCLE_SECTION_5_BODY__`
- `__CYCLE_SECTION_5_TITLE__`
- `__CYCLE_SOURCE_NOTE__`
- `__CYCLE_TITLE__`
- `__DISCLAIMER_CONTACT_NOTE__`
- `__DISCLAIMER_DESCRIPTION__`
- `__DISCLAIMER_INTRODUCTION__`
- `__DISCLAIMER_SECTION_1_BODY__`
- `__DISCLAIMER_SECTION_1_TITLE__`
- `__DISCLAIMER_SECTION_2_BODY__`
- `__DISCLAIMER_SECTION_2_TITLE__`
- `__DISCLAIMER_SECTION_3_BODY__`
- `__DISCLAIMER_SECTION_3_TITLE__`
- `__DISCLAIMER_SECTION_4_BODY__`
- `__DISCLAIMER_SECTION_4_TITLE__`
- `__DISCLAIMER_TITLE__`
- `__DISCLOSURE_CONTACT_NOTE__`
- `__DISCLOSURE_DESCRIPTION__`
- `__DISCLOSURE_INTRODUCTION__`
- `__DISCLOSURE_SECTION_1_BODY__`
- `__DISCLOSURE_SECTION_1_TITLE__`
- `__DISCLOSURE_SECTION_2_BODY__`
- `__DISCLOSURE_SECTION_2_TITLE__`
- `__DISCLOSURE_SECTION_3_BODY__`
- `__DISCLOSURE_SECTION_3_TITLE__`
- `__DISCLOSURE_SECTION_4_BODY__`
- `__DISCLOSURE_SECTION_4_TITLE__`
- `__DISCLOSURE_TITLE__`
- `__EDITORIAL_CONTACT_NOTE__`
- `__EDITORIAL_DESCRIPTION__`
- `__EDITORIAL_INTRODUCTION__`
- `__EDITORIAL_SECTION_1_BODY__`
- `__EDITORIAL_SECTION_1_TITLE__`
- `__EDITORIAL_SECTION_2_BODY__`
- `__EDITORIAL_SECTION_2_TITLE__`
- `__EDITORIAL_SECTION_3_BODY__`
- `__EDITORIAL_SECTION_3_TITLE__`
- `__EDITORIAL_SECTION_4_BODY__`
- `__EDITORIAL_SECTION_4_TITLE__`
- `__EDITORIAL_TITLE__`
- `__GRID_GUIDE_BOUNDARY__`
- `__GRID_GUIDE_INPUT__`
- `__GRID_GUIDE_METHOD__`
- `__GRID_GUIDE_PRIVACY__`
- `__GRID_GUIDE_REVIEW__`
- `__GRID_TOOL_DESCRIPTION__`
- `__GRID_TOOL_INTRODUCTION__`
- `__GRID_TOOL_TITLE__`
- `__HANDOVER_CALLOUT__`
- `__HANDOVER_COVER_ALT__`
- `__HANDOVER_COVER_CAPTION__`
- `__HANDOVER_DECK__`
- `__HANDOVER_DESCRIPTION__`
- `__HANDOVER_FAQ_ANSWER_1__`
- `__HANDOVER_FAQ_ANSWER_2__`
- `__HANDOVER_FAQ_QUESTION_1__`
- `__HANDOVER_FAQ_QUESTION_2__`
- `__HANDOVER_FAQ_TITLE__`
- `__HANDOVER_MARKER_1__`
- `__HANDOVER_MARKER_2__`
- `__HANDOVER_MARKER_3__`
- `__HANDOVER_READING_TIME__`
- `__HANDOVER_SECTION_1_BODY__`
- `__HANDOVER_SECTION_1_TITLE__`
- `__HANDOVER_SECTION_2_BODY__`
- `__HANDOVER_SECTION_2_TITLE__`
- `__HANDOVER_SECTION_3_BODY__`
- `__HANDOVER_SECTION_3_TITLE__`
- `__HANDOVER_SECTION_4_BODY__`
- `__HANDOVER_SECTION_4_TITLE__`
- `__HANDOVER_SECTION_5_BODY__`
- `__HANDOVER_SECTION_5_TITLE__`
- `__HANDOVER_SOURCE_NOTE__`
- `__HANDOVER_TITLE__`
- `__HOME_DESCRIPTION__`
- `__HOME_INTRODUCTION__`
- `__HOME_TITLE__`
- `__INVITE_CODE__`
- `__LABELS_CALLOUT__`
- `__LABELS_COVER_ALT__`
- `__LABELS_COVER_CAPTION__`
- `__LABELS_DECK__`
- `__LABELS_DEFINITION_1__`
- `__LABELS_DEFINITION_2__`
- `__LABELS_DEFINITION_3__`
- `__LABELS_DESCRIPTION__`
- `__LABELS_FAQ_ANSWER_1__`
- `__LABELS_FAQ_ANSWER_2__`
- `__LABELS_FAQ_QUESTION_1__`
- `__LABELS_FAQ_QUESTION_2__`
- `__LABELS_FAQ_TITLE__`
- `__LABELS_READING_TIME__`
- `__LABELS_SECTION_1_BODY__`
- `__LABELS_SECTION_1_TITLE__`
- `__LABELS_SECTION_2_BODY__`
- `__LABELS_SECTION_2_TITLE__`
- `__LABELS_SECTION_3_BODY__`
- `__LABELS_SECTION_3_TITLE__`
- `__LABELS_SECTION_4_BODY__`
- `__LABELS_SECTION_4_TITLE__`
- `__LABELS_SECTION_5_BODY__`
- `__LABELS_SECTION_5_TITLE__`
- `__LABELS_SOURCE_NOTE__`
- `__LABELS_TERM_1__`
- `__LABELS_TERM_2__`
- `__LABELS_TERM_3__`
- `__LABELS_TITLE__`
- `__LANG__`
- `__LOG_CALLOUT__`
- `__LOG_COVER_ALT__`
- `__LOG_COVER_CAPTION__`
- `__LOG_DECK__`
- `__LOG_DESCRIPTION__`
- `__LOG_FAQ_ANSWER_1__`
- `__LOG_FAQ_ANSWER_2__`
- `__LOG_FAQ_QUESTION_1__`
- `__LOG_FAQ_QUESTION_2__`
- `__LOG_FAQ_TITLE__`
- `__LOG_OPENING__`
- `__LOG_READING_TIME__`
- `__LOG_SECTION_1_BODY__`
- `__LOG_SECTION_1_TITLE__`
- `__LOG_SECTION_2_BODY__`
- `__LOG_SECTION_2_TITLE__`
- `__LOG_SECTION_3_BODY__`
- `__LOG_SECTION_3_TITLE__`
- `__LOG_SECTION_4_BODY__`
- `__LOG_SECTION_4_TITLE__`
- `__LOG_SECTION_5_BODY__`
- `__LOG_SECTION_5_TITLE__`
- `__LOG_SOURCE_NOTE__`
- `__LOG_TABLE_CELL_1__`
- `__LOG_TABLE_CELL_2__`
- `__LOG_TABLE_HEAD_1__`
- `__LOG_TABLE_HEAD_2__`
- `__LOG_TITLE__`
- `__MODIFIED_DATE__`
- `__OPERATIONS_CATEGORY_DESCRIPTION__`
- `__OPERATIONS_CATEGORY_INTRODUCTION__`
- `__OPERATIONS_CATEGORY_TITLE__`
- `__ORIENTATION_CATEGORY_DESCRIPTION__`
- `__ORIENTATION_CATEGORY_INTRODUCTION__`
- `__ORIENTATION_CATEGORY_TITLE__`
- `__ORIENT_CALLOUT__`
- `__ORIENT_COVER_ALT__`
- `__ORIENT_COVER_CAPTION__`
- `__ORIENT_DECK__`
- `__ORIENT_DESCRIPTION__`
- `__ORIENT_FAQ_ANSWER_1__`
- `__ORIENT_FAQ_ANSWER_2__`
- `__ORIENT_FAQ_QUESTION_1__`
- `__ORIENT_FAQ_QUESTION_2__`
- `__ORIENT_FAQ_TITLE__`
- `__ORIENT_MARKER_1__`
- `__ORIENT_MARKER_2__`
- `__ORIENT_MARKER_3__`
- `__ORIENT_MARKER_4__`
- `__ORIENT_OPENING__`
- `__ORIENT_READING_TIME__`
- `__ORIENT_SECTION_1_BODY__`
- `__ORIENT_SECTION_1_TITLE__`
- `__ORIENT_SECTION_2_BODY__`
- `__ORIENT_SECTION_2_TITLE__`
- `__ORIENT_SECTION_3_BODY__`
- `__ORIENT_SECTION_3_TITLE__`
- `__ORIENT_SECTION_4_BODY__`
- `__ORIENT_SECTION_4_TITLE__`
- `__ORIENT_SECTION_5_BODY__`
- `__ORIENT_SECTION_5_TITLE__`
- `__ORIENT_SOURCE_NOTE__`
- `__ORIENT_TITLE__`
- `__PERMIT_CALLOUT__`
- `__PERMIT_COVER_ALT__`
- `__PERMIT_COVER_CAPTION__`
- `__PERMIT_DECK__`
- `__PERMIT_DESCRIPTION__`
- `__PERMIT_FAQ_ANSWER_1__`
- `__PERMIT_FAQ_ANSWER_2__`
- `__PERMIT_FAQ_QUESTION_1__`
- `__PERMIT_FAQ_QUESTION_2__`
- `__PERMIT_FAQ_TITLE__`
- `__PERMIT_OPENING__`
- `__PERMIT_READING_TIME__`
- `__PERMIT_SECTION_1_BODY__`
- `__PERMIT_SECTION_1_TITLE__`
- `__PERMIT_SECTION_2_BODY__`
- `__PERMIT_SECTION_2_TITLE__`
- `__PERMIT_SECTION_3_BODY__`
- `__PERMIT_SECTION_3_TITLE__`
- `__PERMIT_SECTION_4_BODY__`
- `__PERMIT_SECTION_4_TITLE__`
- `__PERMIT_SECTION_5_BODY__`
- `__PERMIT_SECTION_5_TITLE__`
- `__PERMIT_SOURCE_NOTE__`
- `__PERMIT_TITLE__`
- `__PRIVACY_CONTACT_NOTE__`
- `__PRIVACY_DESCRIPTION__`
- `__PRIVACY_INTRODUCTION__`
- `__PRIVACY_SECTION_1_BODY__`
- `__PRIVACY_SECTION_1_TITLE__`
- `__PRIVACY_SECTION_2_BODY__`
- `__PRIVACY_SECTION_2_TITLE__`
- `__PRIVACY_SECTION_3_BODY__`
- `__PRIVACY_SECTION_3_TITLE__`
- `__PRIVACY_SECTION_4_BODY__`
- `__PRIVACY_SECTION_4_TITLE__`
- `__PRIVACY_TITLE__`
- `__RADIO_CALLOUT__`
- `__RADIO_COVER_ALT__`
- `__RADIO_COVER_CAPTION__`
- `__RADIO_DECK__`
- `__RADIO_DESCRIPTION__`
- `__RADIO_FAQ_ANSWER_1__`
- `__RADIO_FAQ_ANSWER_2__`
- `__RADIO_FAQ_QUESTION_1__`
- `__RADIO_FAQ_QUESTION_2__`
- `__RADIO_FAQ_TITLE__`
- `__RADIO_QUOTE_1__`
- `__RADIO_QUOTE_2__`
- `__RADIO_QUOTE_3__`
- `__RADIO_READING_TIME__`
- `__RADIO_SECTION_1_BODY__`
- `__RADIO_SECTION_1_TITLE__`
- `__RADIO_SECTION_2_BODY__`
- `__RADIO_SECTION_2_TITLE__`
- `__RADIO_SECTION_3_BODY__`
- `__RADIO_SECTION_3_TITLE__`
- `__RADIO_SECTION_4_BODY__`
- `__RADIO_SECTION_4_TITLE__`
- `__RADIO_SECTION_5_BODY__`
- `__RADIO_SECTION_5_TITLE__`
- `__RADIO_SOURCE_NOTE__`
- `__RADIO_TITLE__`
- `__SCHEDULE_GUIDE_BOUNDARY__`
- `__SCHEDULE_GUIDE_INPUT__`
- `__SCHEDULE_GUIDE_METHOD__`
- `__SCHEDULE_GUIDE_PRIVACY__`
- `__SCHEDULE_GUIDE_REVIEW__`
- `__SCHEDULE_TOOL_DESCRIPTION__`
- `__SCHEDULE_TOOL_INTRODUCTION__`
- `__SCHEDULE_TOOL_TITLE__`
- `__SEQUENCE_CALLOUT__`
- `__SEQUENCE_COVER_ALT__`
- `__SEQUENCE_COVER_CAPTION__`
- `__SEQUENCE_DECK__`
- `__SEQUENCE_DESCRIPTION__`
- `__SEQUENCE_FAQ_ANSWER_1__`
- `__SEQUENCE_FAQ_ANSWER_2__`
- `__SEQUENCE_FAQ_QUESTION_1__`
- `__SEQUENCE_FAQ_QUESTION_2__`
- `__SEQUENCE_FAQ_TITLE__`
- `__SEQUENCE_MARKER_1__`
- `__SEQUENCE_MARKER_2__`
- `__SEQUENCE_MARKER_3__`
- `__SEQUENCE_READING_TIME__`
- `__SEQUENCE_SECTION_1_BODY__`
- `__SEQUENCE_SECTION_1_TITLE__`
- `__SEQUENCE_SECTION_2_BODY__`
- `__SEQUENCE_SECTION_2_TITLE__`
- `__SEQUENCE_SECTION_3_BODY__`
- `__SEQUENCE_SECTION_3_TITLE__`
- `__SEQUENCE_SECTION_4_BODY__`
- `__SEQUENCE_SECTION_4_TITLE__`
- `__SEQUENCE_SECTION_5_BODY__`
- `__SEQUENCE_SECTION_5_TITLE__`
- `__SEQUENCE_SOURCE_NOTE__`
- `__SEQUENCE_TITLE__`
- `__SITE_DOMAIN__`
- `__SITE_NAME__`
- `__SPEC_CALLOUT__`
- `__SPEC_COVER_ALT__`
- `__SPEC_COVER_CAPTION__`
- `__SPEC_DECK__`
- `__SPEC_DESCRIPTION__`
- `__SPEC_FAQ_ANSWER_1__`
- `__SPEC_FAQ_ANSWER_2__`
- `__SPEC_FAQ_QUESTION_1__`
- `__SPEC_FAQ_QUESTION_2__`
- `__SPEC_FAQ_TITLE__`
- `__SPEC_READING_TIME__`
- `__SPEC_SECTION_1_BODY__`
- `__SPEC_SECTION_1_TITLE__`
- `__SPEC_SECTION_2_BODY__`
- `__SPEC_SECTION_2_TITLE__`
- `__SPEC_SECTION_3_BODY__`
- `__SPEC_SECTION_3_TITLE__`
- `__SPEC_SECTION_4_BODY__`
- `__SPEC_SECTION_4_TITLE__`
- `__SPEC_SECTION_5_BODY__`
- `__SPEC_SECTION_5_TITLE__`
- `__SPEC_SOURCE_NOTE__`
- `__SPEC_TABLE_CELL_1__`
- `__SPEC_TABLE_CELL_2__`
- `__SPEC_TABLE_CELL_3__`
- `__SPEC_TABLE_CELL_4__`
- `__SPEC_TABLE_CELL_5__`
- `__SPEC_TABLE_CELL_6__`
- `__SPEC_TABLE_HEAD_1__`
- `__SPEC_TABLE_HEAD_2__`
- `__SPEC_TABLE_HEAD_3__`
- `__SPEC_TITLE__`
- `__STEWARDSHIP_CATEGORY_DESCRIPTION__`
- `__STEWARDSHIP_CATEGORY_INTRODUCTION__`
- `__STEWARDSHIP_CATEGORY_TITLE__`
- `__TOOL_INDEX_DESCRIPTION__`
- `__TOOL_INDEX_INTRODUCTION__`
- `__TOOL_INDEX_TITLE__`
- `__TRACE_CALLOUT__`
- `__TRACE_COVER_ALT__`
- `__TRACE_COVER_CAPTION__`
- `__TRACE_DECK__`
- `__TRACE_DESCRIPTION__`
- `__TRACE_FAQ_ANSWER_1__`
- `__TRACE_FAQ_ANSWER_2__`
- `__TRACE_FAQ_QUESTION_1__`
- `__TRACE_FAQ_QUESTION_2__`
- `__TRACE_FAQ_TITLE__`
- `__TRACE_MARKER_1__`
- `__TRACE_MARKER_2__`
- `__TRACE_MARKER_3__`
- `__TRACE_READING_TIME__`
- `__TRACE_SECTION_1_BODY__`
- `__TRACE_SECTION_1_TITLE__`
- `__TRACE_SECTION_2_BODY__`
- `__TRACE_SECTION_2_TITLE__`
- `__TRACE_SECTION_3_BODY__`
- `__TRACE_SECTION_3_TITLE__`
- `__TRACE_SECTION_4_BODY__`
- `__TRACE_SECTION_4_TITLE__`
- `__TRACE_SECTION_5_BODY__`
- `__TRACE_SECTION_5_TITLE__`
- `__TRACE_SOURCE_NOTE__`
- `__TRACE_TIME_1__`
- `__TRACE_TIME_2__`
- `__TRACE_TIME_3__`
- `__TRACE_TITLE__`
- `__VERIFIED_DATE__`
- `__WEIGHT_GUIDE_BOUNDARY__`
- `__WEIGHT_GUIDE_INPUT__`
- `__WEIGHT_GUIDE_METHOD__`
- `__WEIGHT_GUIDE_PRIVACY__`
- `__WEIGHT_GUIDE_REVIEW__`
- `__WEIGHT_TOOL_DESCRIPTION__`
- `__WEIGHT_TOOL_INTRODUCTION__`
- `__WEIGHT_TOOL_TITLE__`

## 不应重做的 UI

保留皮革装订轨、折图首屏、许可签、十二种文章开场、路线页、工具台、责任页、明暗主题和移动索引。后续 AI 只负责文字与事实，不需要在模板 UI 上消耗工作量。
