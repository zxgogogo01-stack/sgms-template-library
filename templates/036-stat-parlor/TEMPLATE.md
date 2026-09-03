# 036 — Stat Parlor / 统计会客室

这是一套 workflow-ready v2 的高端统计研究模板。视觉来自午夜会客室、下沉式圆形沙发、黄铜门牌、来宾卡与分析吧台；窄体大字、酒红天鹅绒、香槟金和冰蓝共同形成独立识别。

后续 AI 只需替换站点变量、经过核验的文字、来源和文章正文，不需要重做 UI、响应式、SEO、文章版式、房间分类、合规页、封面或工具算法。模板不包含可发布的注册教程，也不写死平台费率、限额、监管结论或实时数据。

## 已搭建框架

- 首页形态 A：移动端先展示来宾卡，桌面端嵌入圆形会客区；邀请码、复制、弹性利益点、政策脚注与一处编辑选读入口都在首屏，首页没有外部推广链接。
- 十二种研究册结构、三间主题房间、五件纯本地统计仪器、七张责任页、独立 404、RSS、安全联系、图标、社交图和十二组独立 1200×630 PNG/WebP 封面。
- 五工具覆盖正常、错误、边界、输入后旧结果失效、重置与复制；Guide 默认折叠并提供五个可抓取章节。

## 来宾通行页边界

`folios/guest-pass.html` 只是内容和界面外壳，不含注册步骤或教程文字。页面恰好保留一个静态 `__AFFILIATE_URL__` 链接槽位、完整 `target` / `rel` 属性、邀请码与紧邻披露字段；其他页面没有转化直链。

## 内容接入顺序

1. 替换站名、域名、英文 wordmark、作者、邮箱、日期、邀请码、利益比例及政策脚注。
2. 按事实调研填写十二份研究文字，保留各自不同的开场、H2、FAQ、目录、收尾与封面。
3. 只替换文字、链接与 alt；保留 `sp36-` class、`data-sp36-*` 属性、表单 id、ARIA、图片尺寸与脚本引用。
4. 默认保持首页形态 A；生产发布、域名、Cloudflare、VPS、SiteCtl 与 GSC 不属于模板资产。
5. 内容完成后重跑三套静态审计与全库相似度检查，并在桌面、390px、360px 实测 31 条路由和全部工具状态。

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "article.html",
  "articles": [
    "folios/sample-anatomy.html",
    "folios/distribution-portrait.html",
    "folios/uncertainty-window.html",
    "folios/time-change.html",
    "folios/cohort-table.html",
    "folios/correlation-room.html",
    "folios/ratio-ledger.html",
    "folios/outlier-case.html",
    "folios/survey-method.html",
    "folios/experiment-brief.html",
    "folios/metric-glossary.html",
    "folios/guest-pass.html"
  ],
  "cornerstones": [
    "folios/sample-anatomy.html",
    "folios/survey-method.html"
  ],
  "registrationGuide": "folios/guest-pass.html",
  "articleCovers": {
    "folios/sample-anatomy.html": {
      "display": "assets/covers/sample-anatomy.webp",
      "og": "assets/covers/sample-anatomy.png"
    },
    "folios/distribution-portrait.html": {
      "display": "assets/covers/distribution-portrait.webp",
      "og": "assets/covers/distribution-portrait.png"
    },
    "folios/uncertainty-window.html": {
      "display": "assets/covers/uncertainty-window.webp",
      "og": "assets/covers/uncertainty-window.png"
    },
    "folios/time-change.html": {
      "display": "assets/covers/time-change.webp",
      "og": "assets/covers/time-change.png"
    },
    "folios/cohort-table.html": {
      "display": "assets/covers/cohort-table.webp",
      "og": "assets/covers/cohort-table.png"
    },
    "folios/correlation-room.html": {
      "display": "assets/covers/correlation-room.webp",
      "og": "assets/covers/correlation-room.png"
    },
    "folios/ratio-ledger.html": {
      "display": "assets/covers/ratio-ledger.webp",
      "og": "assets/covers/ratio-ledger.png"
    },
    "folios/outlier-case.html": {
      "display": "assets/covers/outlier-case.webp",
      "og": "assets/covers/outlier-case.png"
    },
    "folios/survey-method.html": {
      "display": "assets/covers/survey-method.webp",
      "og": "assets/covers/survey-method.png"
    },
    "folios/experiment-brief.html": {
      "display": "assets/covers/experiment-brief.webp",
      "og": "assets/covers/experiment-brief.png"
    },
    "folios/metric-glossary.html": {
      "display": "assets/covers/metric-glossary.webp",
      "og": "assets/covers/metric-glossary.png"
    },
    "folios/guest-pass.html": {
      "display": "assets/covers/guest-pass.webp",
      "og": "assets/covers/guest-pass.png"
    }
  },
  "categories": [
    {
      "path": "rooms/measurement.html",
      "label": "测量前厅",
      "articles": [
        "folios/sample-anatomy.html",
        "folios/distribution-portrait.html",
        "folios/uncertainty-window.html",
        "folios/time-change.html"
      ]
    },
    {
      "path": "rooms/comparison.html",
      "label": "比较包厢",
      "articles": [
        "folios/cohort-table.html",
        "folios/correlation-room.html",
        "folios/ratio-ledger.html",
        "folios/outlier-case.html"
      ]
    },
    {
      "path": "rooms/interpretation.html",
      "label": "解读圆厅",
      "articles": [
        "folios/survey-method.html",
        "folios/experiment-brief.html",
        "folios/metric-glossary.html",
        "folios/guest-pass.html"
      ]
    }
  ],
  "toolIndex": "tool.html",
  "tools": [
    "instruments/weighted-mean.html",
    "instruments/margin-window.html",
    "instruments/percentile-seat.html",
    "instruments/rate-difference.html",
    "instruments/rebase-index.html"
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
- `__ARTICLE_INDEX_DESCRIPTION__`
- `__ARTICLE_INDEX_INTRODUCTION__`
- `__ARTICLE_INDEX_TITLE__`
- `__AUTHOR_BIO__`
- `__AUTHOR_NAME__`
- `__BENEFIT_DISCLAIMER__`
- `__BENEFIT_RATE__`
- `__BRAND_EN__`
- `__CHANGE_CALLOUT__`
- `__CHANGE_COVER_ALT__`
- `__CHANGE_COVER_CAPTION__`
- `__CHANGE_DECK__`
- `__CHANGE_DESCRIPTION__`
- `__CHANGE_FAQ_ANSWER_1__`
- `__CHANGE_FAQ_ANSWER_2__`
- `__CHANGE_FAQ_QUESTION_1__`
- `__CHANGE_FAQ_QUESTION_2__`
- `__CHANGE_FAQ_TITLE__`
- `__CHANGE_POINT_1__`
- `__CHANGE_POINT_2__`
- `__CHANGE_POINT_3__`
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
- `__CHANGE_TIME_1__`
- `__CHANGE_TIME_2__`
- `__CHANGE_TIME_3__`
- `__CHANGE_TITLE__`
- `__COHORT_CALLOUT__`
- `__COHORT_COVER_ALT__`
- `__COHORT_COVER_CAPTION__`
- `__COHORT_DECK__`
- `__COHORT_DESCRIPTION__`
- `__COHORT_FAQ_ANSWER_1__`
- `__COHORT_FAQ_ANSWER_2__`
- `__COHORT_FAQ_QUESTION_1__`
- `__COHORT_FAQ_QUESTION_2__`
- `__COHORT_FAQ_TITLE__`
- `__COHORT_READING_TIME__`
- `__COHORT_SECTION_1_BODY__`
- `__COHORT_SECTION_1_TITLE__`
- `__COHORT_SECTION_2_BODY__`
- `__COHORT_SECTION_2_TITLE__`
- `__COHORT_SECTION_3_BODY__`
- `__COHORT_SECTION_3_TITLE__`
- `__COHORT_SECTION_4_BODY__`
- `__COHORT_SECTION_4_TITLE__`
- `__COHORT_SECTION_5_BODY__`
- `__COHORT_SECTION_5_TITLE__`
- `__COHORT_SOURCE_NOTE__`
- `__COHORT_TABLE_1__`
- `__COHORT_TABLE_2__`
- `__COHORT_TABLE_3__`
- `__COHORT_TABLE_4__`
- `__COHORT_TABLE_5__`
- `__COHORT_TABLE_6__`
- `__COHORT_TABLE_H1__`
- `__COHORT_TABLE_H2__`
- `__COHORT_TABLE_H3__`
- `__COHORT_TITLE__`
- `__COMPARISON_ROOM_DESCRIPTION__`
- `__COMPARISON_ROOM_INTRODUCTION__`
- `__COMPARISON_ROOM_TITLE__`
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
- `__CORRELATION_CALLOUT__`
- `__CORRELATION_COVER_ALT__`
- `__CORRELATION_COVER_CAPTION__`
- `__CORRELATION_DECK__`
- `__CORRELATION_DESCRIPTION__`
- `__CORRELATION_FAQ_ANSWER_1__`
- `__CORRELATION_FAQ_ANSWER_2__`
- `__CORRELATION_FAQ_QUESTION_1__`
- `__CORRELATION_FAQ_QUESTION_2__`
- `__CORRELATION_FAQ_TITLE__`
- `__CORRELATION_OPENING__`
- `__CORRELATION_READING_TIME__`
- `__CORRELATION_SECTION_1_BODY__`
- `__CORRELATION_SECTION_1_TITLE__`
- `__CORRELATION_SECTION_2_BODY__`
- `__CORRELATION_SECTION_2_TITLE__`
- `__CORRELATION_SECTION_3_BODY__`
- `__CORRELATION_SECTION_3_TITLE__`
- `__CORRELATION_SECTION_4_BODY__`
- `__CORRELATION_SECTION_4_TITLE__`
- `__CORRELATION_SECTION_5_BODY__`
- `__CORRELATION_SECTION_5_TITLE__`
- `__CORRELATION_SOURCE_NOTE__`
- `__CORRELATION_TITLE__`
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
- `__DISTRIBUTION_CALLOUT__`
- `__DISTRIBUTION_COVER_ALT__`
- `__DISTRIBUTION_COVER_CAPTION__`
- `__DISTRIBUTION_DECK__`
- `__DISTRIBUTION_DESCRIPTION__`
- `__DISTRIBUTION_FAQ_ANSWER_1__`
- `__DISTRIBUTION_FAQ_ANSWER_2__`
- `__DISTRIBUTION_FAQ_QUESTION_1__`
- `__DISTRIBUTION_FAQ_QUESTION_2__`
- `__DISTRIBUTION_FAQ_TITLE__`
- `__DISTRIBUTION_OPENING__`
- `__DISTRIBUTION_READING_TIME__`
- `__DISTRIBUTION_SECTION_1_BODY__`
- `__DISTRIBUTION_SECTION_1_TITLE__`
- `__DISTRIBUTION_SECTION_2_BODY__`
- `__DISTRIBUTION_SECTION_2_TITLE__`
- `__DISTRIBUTION_SECTION_3_BODY__`
- `__DISTRIBUTION_SECTION_3_TITLE__`
- `__DISTRIBUTION_SECTION_4_BODY__`
- `__DISTRIBUTION_SECTION_4_TITLE__`
- `__DISTRIBUTION_SECTION_5_BODY__`
- `__DISTRIBUTION_SECTION_5_TITLE__`
- `__DISTRIBUTION_SOURCE_NOTE__`
- `__DISTRIBUTION_TITLE__`
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
- `__EXPERIMENT_CALLOUT__`
- `__EXPERIMENT_COVER_ALT__`
- `__EXPERIMENT_COVER_CAPTION__`
- `__EXPERIMENT_DECK__`
- `__EXPERIMENT_DESCRIPTION__`
- `__EXPERIMENT_FAQ_ANSWER_1__`
- `__EXPERIMENT_FAQ_ANSWER_2__`
- `__EXPERIMENT_FAQ_QUESTION_1__`
- `__EXPERIMENT_FAQ_QUESTION_2__`
- `__EXPERIMENT_FAQ_TITLE__`
- `__EXPERIMENT_GROUP_A__`
- `__EXPERIMENT_GROUP_B__`
- `__EXPERIMENT_POINT_1__`
- `__EXPERIMENT_POINT_2__`
- `__EXPERIMENT_READING_TIME__`
- `__EXPERIMENT_SECTION_1_BODY__`
- `__EXPERIMENT_SECTION_1_TITLE__`
- `__EXPERIMENT_SECTION_2_BODY__`
- `__EXPERIMENT_SECTION_2_TITLE__`
- `__EXPERIMENT_SECTION_3_BODY__`
- `__EXPERIMENT_SECTION_3_TITLE__`
- `__EXPERIMENT_SECTION_4_BODY__`
- `__EXPERIMENT_SECTION_4_TITLE__`
- `__EXPERIMENT_SECTION_5_BODY__`
- `__EXPERIMENT_SECTION_5_TITLE__`
- `__EXPERIMENT_SOURCE_NOTE__`
- `__EXPERIMENT_TITLE__`
- `__GLOSSARY_CALLOUT__`
- `__GLOSSARY_COVER_ALT__`
- `__GLOSSARY_COVER_CAPTION__`
- `__GLOSSARY_DECK__`
- `__GLOSSARY_DEFINITION_1__`
- `__GLOSSARY_DEFINITION_2__`
- `__GLOSSARY_DEFINITION_3__`
- `__GLOSSARY_DESCRIPTION__`
- `__GLOSSARY_FAQ_ANSWER_1__`
- `__GLOSSARY_FAQ_ANSWER_2__`
- `__GLOSSARY_FAQ_QUESTION_1__`
- `__GLOSSARY_FAQ_QUESTION_2__`
- `__GLOSSARY_FAQ_TITLE__`
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
- `__GLOSSARY_TITLE__`
- `__HOME_DESCRIPTION__`
- `__HOME_INTRODUCTION__`
- `__HOME_TITLE__`
- `__INTERPRETATION_ROOM_DESCRIPTION__`
- `__INTERPRETATION_ROOM_INTRODUCTION__`
- `__INTERPRETATION_ROOM_TITLE__`
- `__INVITE_CODE__`
- `__LANG__`
- `__MARGIN_GUIDE_BOUNDARY__`
- `__MARGIN_GUIDE_INPUT__`
- `__MARGIN_GUIDE_METHOD__`
- `__MARGIN_GUIDE_PRIVACY__`
- `__MARGIN_GUIDE_REVIEW__`
- `__MARGIN_TOOL_DESCRIPTION__`
- `__MARGIN_TOOL_INTRODUCTION__`
- `__MARGIN_TOOL_TITLE__`
- `__MEASUREMENT_ROOM_DESCRIPTION__`
- `__MEASUREMENT_ROOM_INTRODUCTION__`
- `__MEASUREMENT_ROOM_TITLE__`
- `__MODIFIED_DATE__`
- `__OUTLIER_CALLOUT__`
- `__OUTLIER_CASE_TITLE__`
- `__OUTLIER_COVER_ALT__`
- `__OUTLIER_COVER_CAPTION__`
- `__OUTLIER_DECK__`
- `__OUTLIER_DESCRIPTION__`
- `__OUTLIER_FAQ_ANSWER_1__`
- `__OUTLIER_FAQ_ANSWER_2__`
- `__OUTLIER_FAQ_QUESTION_1__`
- `__OUTLIER_FAQ_QUESTION_2__`
- `__OUTLIER_FAQ_TITLE__`
- `__OUTLIER_LABEL_1__`
- `__OUTLIER_OPENING__`
- `__OUTLIER_READING_TIME__`
- `__OUTLIER_SECTION_1_BODY__`
- `__OUTLIER_SECTION_1_TITLE__`
- `__OUTLIER_SECTION_2_BODY__`
- `__OUTLIER_SECTION_2_TITLE__`
- `__OUTLIER_SECTION_3_BODY__`
- `__OUTLIER_SECTION_3_TITLE__`
- `__OUTLIER_SECTION_4_BODY__`
- `__OUTLIER_SECTION_4_TITLE__`
- `__OUTLIER_SECTION_5_BODY__`
- `__OUTLIER_SECTION_5_TITLE__`
- `__OUTLIER_SOURCE_NOTE__`
- `__OUTLIER_TITLE__`
- `__OUTLIER_VALUE_1__`
- `__PASS_CALLOUT__`
- `__PASS_COVER_ALT__`
- `__PASS_COVER_CAPTION__`
- `__PASS_DECK__`
- `__PASS_DESCRIPTION__`
- `__PASS_FAQ_ANSWER_1__`
- `__PASS_FAQ_ANSWER_2__`
- `__PASS_FAQ_QUESTION_1__`
- `__PASS_FAQ_QUESTION_2__`
- `__PASS_FAQ_TITLE__`
- `__PASS_OPENING__`
- `__PASS_READING_TIME__`
- `__PASS_SECTION_1_BODY__`
- `__PASS_SECTION_1_TITLE__`
- `__PASS_SECTION_2_BODY__`
- `__PASS_SECTION_2_TITLE__`
- `__PASS_SECTION_3_BODY__`
- `__PASS_SECTION_3_TITLE__`
- `__PASS_SECTION_4_BODY__`
- `__PASS_SECTION_4_TITLE__`
- `__PASS_SECTION_5_BODY__`
- `__PASS_SECTION_5_TITLE__`
- `__PASS_SOURCE_NOTE__`
- `__PASS_TITLE__`
- `__PERCENTILE_GUIDE_BOUNDARY__`
- `__PERCENTILE_GUIDE_INPUT__`
- `__PERCENTILE_GUIDE_METHOD__`
- `__PERCENTILE_GUIDE_PRIVACY__`
- `__PERCENTILE_GUIDE_REVIEW__`
- `__PERCENTILE_TOOL_DESCRIPTION__`
- `__PERCENTILE_TOOL_INTRODUCTION__`
- `__PERCENTILE_TOOL_TITLE__`
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
- `__RATE_GUIDE_BOUNDARY__`
- `__RATE_GUIDE_INPUT__`
- `__RATE_GUIDE_METHOD__`
- `__RATE_GUIDE_PRIVACY__`
- `__RATE_GUIDE_REVIEW__`
- `__RATE_TOOL_DESCRIPTION__`
- `__RATE_TOOL_INTRODUCTION__`
- `__RATE_TOOL_TITLE__`
- `__RATIO_CALLOUT__`
- `__RATIO_COVER_ALT__`
- `__RATIO_COVER_CAPTION__`
- `__RATIO_DECK__`
- `__RATIO_DESCRIPTION__`
- `__RATIO_FAQ_ANSWER_1__`
- `__RATIO_FAQ_ANSWER_2__`
- `__RATIO_FAQ_QUESTION_1__`
- `__RATIO_FAQ_QUESTION_2__`
- `__RATIO_FAQ_TITLE__`
- `__RATIO_LABEL_1__`
- `__RATIO_LABEL_2__`
- `__RATIO_LABEL_3__`
- `__RATIO_OPENING__`
- `__RATIO_READING_TIME__`
- `__RATIO_SECTION_1_BODY__`
- `__RATIO_SECTION_1_TITLE__`
- `__RATIO_SECTION_2_BODY__`
- `__RATIO_SECTION_2_TITLE__`
- `__RATIO_SECTION_3_BODY__`
- `__RATIO_SECTION_3_TITLE__`
- `__RATIO_SECTION_4_BODY__`
- `__RATIO_SECTION_4_TITLE__`
- `__RATIO_SECTION_5_BODY__`
- `__RATIO_SECTION_5_TITLE__`
- `__RATIO_SOURCE_NOTE__`
- `__RATIO_TITLE__`
- `__REBASE_GUIDE_BOUNDARY__`
- `__REBASE_GUIDE_INPUT__`
- `__REBASE_GUIDE_METHOD__`
- `__REBASE_GUIDE_PRIVACY__`
- `__REBASE_GUIDE_REVIEW__`
- `__REBASE_TOOL_DESCRIPTION__`
- `__REBASE_TOOL_INTRODUCTION__`
- `__REBASE_TOOL_TITLE__`
- `__SAMPLE_CALLOUT__`
- `__SAMPLE_COVER_ALT__`
- `__SAMPLE_COVER_CAPTION__`
- `__SAMPLE_DECK__`
- `__SAMPLE_DESCRIPTION__`
- `__SAMPLE_FAQ_ANSWER_1__`
- `__SAMPLE_FAQ_ANSWER_2__`
- `__SAMPLE_FAQ_QUESTION_1__`
- `__SAMPLE_FAQ_QUESTION_2__`
- `__SAMPLE_FAQ_TITLE__`
- `__SAMPLE_LABEL_1__`
- `__SAMPLE_LABEL_2__`
- `__SAMPLE_OPENING__`
- `__SAMPLE_READING_TIME__`
- `__SAMPLE_SECTION_1_BODY__`
- `__SAMPLE_SECTION_1_TITLE__`
- `__SAMPLE_SECTION_2_BODY__`
- `__SAMPLE_SECTION_2_TITLE__`
- `__SAMPLE_SECTION_3_BODY__`
- `__SAMPLE_SECTION_3_TITLE__`
- `__SAMPLE_SECTION_4_BODY__`
- `__SAMPLE_SECTION_4_TITLE__`
- `__SAMPLE_SECTION_5_BODY__`
- `__SAMPLE_SECTION_5_TITLE__`
- `__SAMPLE_SOURCE_NOTE__`
- `__SAMPLE_TITLE__`
- `__SAMPLE_VALUE_1__`
- `__SAMPLE_VALUE_2__`
- `__SITE_DOMAIN__`
- `__SITE_NAME__`
- `__SURVEY_CALLOUT__`
- `__SURVEY_COVER_ALT__`
- `__SURVEY_COVER_CAPTION__`
- `__SURVEY_DECK__`
- `__SURVEY_DESCRIPTION__`
- `__SURVEY_FAQ_ANSWER_1__`
- `__SURVEY_FAQ_ANSWER_2__`
- `__SURVEY_FAQ_QUESTION_1__`
- `__SURVEY_FAQ_QUESTION_2__`
- `__SURVEY_FAQ_TITLE__`
- `__SURVEY_POINT_1__`
- `__SURVEY_POINT_2__`
- `__SURVEY_POINT_3__`
- `__SURVEY_READING_TIME__`
- `__SURVEY_SECTION_1_BODY__`
- `__SURVEY_SECTION_1_TITLE__`
- `__SURVEY_SECTION_2_BODY__`
- `__SURVEY_SECTION_2_TITLE__`
- `__SURVEY_SECTION_3_BODY__`
- `__SURVEY_SECTION_3_TITLE__`
- `__SURVEY_SECTION_4_BODY__`
- `__SURVEY_SECTION_4_TITLE__`
- `__SURVEY_SECTION_5_BODY__`
- `__SURVEY_SECTION_5_TITLE__`
- `__SURVEY_SOURCE_NOTE__`
- `__SURVEY_TITLE__`
- `__TOOL_INDEX_DESCRIPTION__`
- `__TOOL_INDEX_INTRODUCTION__`
- `__TOOL_INDEX_TITLE__`
- `__UNCERTAINTY_BAND_CENTER__`
- `__UNCERTAINTY_BAND_HIGH__`
- `__UNCERTAINTY_BAND_LOW__`
- `__UNCERTAINTY_CALLOUT__`
- `__UNCERTAINTY_COVER_ALT__`
- `__UNCERTAINTY_COVER_CAPTION__`
- `__UNCERTAINTY_DECK__`
- `__UNCERTAINTY_DESCRIPTION__`
- `__UNCERTAINTY_FAQ_ANSWER_1__`
- `__UNCERTAINTY_FAQ_ANSWER_2__`
- `__UNCERTAINTY_FAQ_QUESTION_1__`
- `__UNCERTAINTY_FAQ_QUESTION_2__`
- `__UNCERTAINTY_FAQ_TITLE__`
- `__UNCERTAINTY_OPENING__`
- `__UNCERTAINTY_READING_TIME__`
- `__UNCERTAINTY_SECTION_1_BODY__`
- `__UNCERTAINTY_SECTION_1_TITLE__`
- `__UNCERTAINTY_SECTION_2_BODY__`
- `__UNCERTAINTY_SECTION_2_TITLE__`
- `__UNCERTAINTY_SECTION_3_BODY__`
- `__UNCERTAINTY_SECTION_3_TITLE__`
- `__UNCERTAINTY_SECTION_4_BODY__`
- `__UNCERTAINTY_SECTION_4_TITLE__`
- `__UNCERTAINTY_SECTION_5_BODY__`
- `__UNCERTAINTY_SECTION_5_TITLE__`
- `__UNCERTAINTY_SOURCE_NOTE__`
- `__UNCERTAINTY_TITLE__`
- `__VERIFIED_DATE__`
- `__WEIGHTED_GUIDE_BOUNDARY__`
- `__WEIGHTED_GUIDE_INPUT__`
- `__WEIGHTED_GUIDE_METHOD__`
- `__WEIGHTED_GUIDE_PRIVACY__`
- `__WEIGHTED_GUIDE_REVIEW__`
- `__WEIGHTED_TOOL_DESCRIPTION__`
- `__WEIGHTED_TOOL_INTRODUCTION__`
- `__WEIGHTED_TOOL_TITLE__`

## 不应重做的 UI

保留下沉圆厅、来宾卡、十二种研究开场、房间页、分析吧、责任页、明暗主题与移动席位索引。下游 AI 只负责文字和事实，不需要再消耗工作量搭界面。
