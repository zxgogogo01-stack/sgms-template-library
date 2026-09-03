# 039 Rustic Register — workflow-ready v2

## 用途

高端乡野登记册完整框架。后续 AI 只填写站点变量、经核实的文字与文章内容；纸张视觉、十二种卷宗结构、三册索引、五张校对台、响应式、封面、合规与 SEO 资产均已完成。

## 页面角色

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "registry.html",
  "articles": [
    "entries/market-stall.html",
    "entries/workshop-profile.html",
    "entries/neighborhood-walk.html",
    "entries/community-library.html",
    "entries/repair-studio.html",
    "entries/seasonal-kitchen.html",
    "entries/accessible-guesthouse.html",
    "entries/ferry-route.html",
    "entries/shared-courtyard.html",
    "entries/craft-cooperative.html",
    "entries/archive-provenance.html",
    "entries/submission-pass.html"
  ],
  "cornerstones": [
    "entries/market-stall.html",
    "entries/archive-provenance.html"
  ],
  "registrationGuide": "entries/submission-pass.html",
  "articleCovers": {
    "entries/market-stall.html": {
      "display": "assets/covers/market-stall.webp",
      "og": "assets/covers/market-stall.png"
    },
    "entries/workshop-profile.html": {
      "display": "assets/covers/workshop-profile.webp",
      "og": "assets/covers/workshop-profile.png"
    },
    "entries/neighborhood-walk.html": {
      "display": "assets/covers/neighborhood-walk.webp",
      "og": "assets/covers/neighborhood-walk.png"
    },
    "entries/community-library.html": {
      "display": "assets/covers/community-library.webp",
      "og": "assets/covers/community-library.png"
    },
    "entries/repair-studio.html": {
      "display": "assets/covers/repair-studio.webp",
      "og": "assets/covers/repair-studio.png"
    },
    "entries/seasonal-kitchen.html": {
      "display": "assets/covers/seasonal-kitchen.webp",
      "og": "assets/covers/seasonal-kitchen.png"
    },
    "entries/accessible-guesthouse.html": {
      "display": "assets/covers/accessible-guesthouse.webp",
      "og": "assets/covers/accessible-guesthouse.png"
    },
    "entries/ferry-route.html": {
      "display": "assets/covers/ferry-route.webp",
      "og": "assets/covers/ferry-route.png"
    },
    "entries/shared-courtyard.html": {
      "display": "assets/covers/shared-courtyard.webp",
      "og": "assets/covers/shared-courtyard.png"
    },
    "entries/craft-cooperative.html": {
      "display": "assets/covers/craft-cooperative.webp",
      "og": "assets/covers/craft-cooperative.png"
    },
    "entries/archive-provenance.html": {
      "display": "assets/covers/archive-provenance.webp",
      "og": "assets/covers/archive-provenance.png"
    },
    "entries/submission-pass.html": {
      "display": "assets/covers/submission-pass.webp",
      "og": "assets/covers/submission-pass.png"
    }
  },
  "categories": [
    {
      "path": "folios/table-folio.html",
      "label": "餐桌与市集册",
      "articles": [
        "entries/market-stall.html",
        "entries/seasonal-kitchen.html",
        "entries/shared-courtyard.html",
        "entries/submission-pass.html"
      ]
    },
    {
      "path": "folios/craft-folio.html",
      "label": "工坊与器物册",
      "articles": [
        "entries/workshop-profile.html",
        "entries/repair-studio.html",
        "entries/craft-cooperative.html",
        "entries/archive-provenance.html"
      ]
    },
    {
      "path": "folios/road-folio.html",
      "label": "道路与停留册",
      "articles": [
        "entries/neighborhood-walk.html",
        "entries/community-library.html",
        "entries/accessible-guesthouse.html",
        "entries/ferry-route.html"
      ]
    }
  ],
  "toolIndex": "workbench.html",
  "tools": [
    "workbench/name-likeness.html",
    "workbench/hours-overlap.html",
    "workbench/visit-duration.html",
    "workbench/accessibility-score.html",
    "workbench/record-freshness.html"
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
  "socialImage": "assets/register-social.png",
  "variables": {
    "siteDomain": "__SITE_DOMAIN__",
    "siteName": "__SITE_NAME__",
    "wordmark": "__WORDMARK__",
    "inviteCode": "__INVITE_CODE__",
    "benefitRate": "__BENEFIT_RATE__",
    "benefitDisclaimer": "__BENEFIT_DISCLAIMER__",
    "affiliateUrl": "__AFFILIATE_URL__"
  }
}
```

## 接入凭单边界

`entries/submission-pass.html` 只是界面与内容槽位，不含注册步骤、平台事实或教程正文。页面恰好保留一个静态 `__AFFILIATE_URL__` 槽位，具备完整 `target` / `rel` 属性、邀请码与紧邻披露字段；其他页面不含转化直链。

## 后续 AI 内容接入顺序

1. 替换全局站点、日期、作者、联系方式、利益点及风险说明变量。
2. 分别填写十二份卷宗的标题、开场、章节、问答、来源与封面替代文字，不改变既有版式和组件。
3. 接入凭单只在单站事实核验完成后填写实际文字与注册链接；模板库不承载平台操作事实。
4. 单站发布前重新核对 canonical、schema、sitemap、feed、推广披露和真实链接目标。

## 五张本地校对台

- 名称近似校对台：Unicode 规范化、编辑距离与相似阈值。
- 开放时段交集尺：计算两个同日时段的交集。
- 到访用时估算板：合计路程、驻点数量和停留时间。
- 无障碍记录完整度尺：汇总已记录、未记录和待确认项目。
- 卷宗复核周期表：用明确的记录日期与参照日期判断期限。

每张工具都有正常、错误、边界、复制、重置和输入变化失效旧结果状态，并带默认折叠的五段 Guide。

## 兼容入口

`article.html` 与 `tool.html` 是仓库旧五页审计所需的完整只读兼容索引，均为 `noindex,follow`，canonical 分别指向 `registry.html` 和 `workbench.html`，不计入公开索引集合。

## 变量清单

- `__ABOUT_ASIDE__`
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
- `__ACCESSIBLE_CHECK_1_LABEL__`
- `__ACCESSIBLE_CHECK_2_LABEL__`
- `__ACCESSIBLE_CHECK_3_LABEL__`
- `__ACCESSIBLE_CHECK_4_LABEL__`
- `__ACCESSIBLE_CHECK_5_LABEL__`
- `__ACCESSIBLE_GUIDE_1_BODY__`
- `__ACCESSIBLE_GUIDE_1_TITLE__`
- `__ACCESSIBLE_GUIDE_2_BODY__`
- `__ACCESSIBLE_GUIDE_2_TITLE__`
- `__ACCESSIBLE_GUIDE_3_BODY__`
- `__ACCESSIBLE_GUIDE_3_TITLE__`
- `__ACCESSIBLE_GUIDE_4_BODY__`
- `__ACCESSIBLE_GUIDE_4_TITLE__`
- `__ACCESSIBLE_GUIDE_5_BODY__`
- `__ACCESSIBLE_GUIDE_5_TITLE__`
- `__ACCESSIBLE_TOOL_DESCRIPTION__`
- `__ACCESSIBLE_TOOL_INTRODUCTION__`
- `__ACCESSIBLE_TOOL_TITLE__`
- `__ACCESS_CALLOUT__`
- `__ACCESS_COVER_ALT__`
- `__ACCESS_COVER_CAPTION__`
- `__ACCESS_DECK__`
- `__ACCESS_DESCRIPTION__`
- `__ACCESS_FAQ_ANSWER_1__`
- `__ACCESS_FAQ_QUESTION_1__`
- `__ACCESS_FAQ_TITLE__`
- `__ACCESS_OPENING__`
- `__ACCESS_READING_TIME__`
- `__ACCESS_SECTION_1_BODY__`
- `__ACCESS_SECTION_1_TITLE__`
- `__ACCESS_SECTION_2_BODY__`
- `__ACCESS_SECTION_2_TITLE__`
- `__ACCESS_SECTION_3_BODY__`
- `__ACCESS_SECTION_3_TITLE__`
- `__ACCESS_SECTION_4_BODY__`
- `__ACCESS_SECTION_4_TITLE__`
- `__ACCESS_SOURCE_NOTE__`
- `__ACCESS_TITLE__`
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
- `__COMPAT_ARTICLE_INDEX_DESCRIPTION__`
- `__COMPAT_ARTICLE_INDEX_TITLE__`
- `__COMPAT_TOOL_INDEX_DESCRIPTION__`
- `__COMPAT_TOOL_INDEX_TITLE__`
- `__CONTACT_ASIDE__`
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
- `__COOPERATIVE_CALLOUT__`
- `__COOPERATIVE_COVER_ALT__`
- `__COOPERATIVE_COVER_CAPTION__`
- `__COOPERATIVE_DECK__`
- `__COOPERATIVE_DESCRIPTION__`
- `__COOPERATIVE_FAQ_ANSWER_1__`
- `__COOPERATIVE_FAQ_ANSWER_2__`
- `__COOPERATIVE_FAQ_ANSWER_3__`
- `__COOPERATIVE_FAQ_QUESTION_1__`
- `__COOPERATIVE_FAQ_QUESTION_2__`
- `__COOPERATIVE_FAQ_QUESTION_3__`
- `__COOPERATIVE_FAQ_TITLE__`
- `__COOPERATIVE_FEED_SUMMARY__`
- `__COOPERATIVE_NEW_1__`
- `__COOPERATIVE_NEW_2__`
- `__COOPERATIVE_NEW_3__`
- `__COOPERATIVE_OLD_1__`
- `__COOPERATIVE_OLD_2__`
- `__COOPERATIVE_OLD_3__`
- `__COOPERATIVE_OPENING__`
- `__COOPERATIVE_PUBDATE_RFC822__`
- `__COOPERATIVE_READING_TIME__`
- `__COOPERATIVE_SECTION_1_BODY__`
- `__COOPERATIVE_SECTION_1_TITLE__`
- `__COOPERATIVE_SECTION_2_BODY__`
- `__COOPERATIVE_SECTION_2_TITLE__`
- `__COOPERATIVE_SECTION_3_BODY__`
- `__COOPERATIVE_SECTION_3_TITLE__`
- `__COOPERATIVE_SECTION_4_BODY__`
- `__COOPERATIVE_SECTION_4_TITLE__`
- `__COOPERATIVE_SECTION_5_BODY__`
- `__COOPERATIVE_SECTION_5_TITLE__`
- `__COOPERATIVE_SECTION_6_BODY__`
- `__COOPERATIVE_SECTION_6_TITLE__`
- `__COOPERATIVE_SOURCE_NOTE__`
- `__COOPERATIVE_TITLE__`
- `__CORRECTIONS_ASIDE__`
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
- `__COURTYARD_CALLOUT__`
- `__COURTYARD_COVER_ALT__`
- `__COURTYARD_COVER_CAPTION__`
- `__COURTYARD_DECK__`
- `__COURTYARD_DESCRIPTION__`
- `__COURTYARD_FEED_SUMMARY__`
- `__COURTYARD_PUBDATE_RFC822__`
- `__COURTYARD_READING_TIME__`
- `__COURTYARD_SECTION_1_BODY__`
- `__COURTYARD_SECTION_1_TITLE__`
- `__COURTYARD_SECTION_2_BODY__`
- `__COURTYARD_SECTION_2_TITLE__`
- `__COURTYARD_SECTION_3_BODY__`
- `__COURTYARD_SECTION_3_TITLE__`
- `__COURTYARD_SECTION_4_BODY__`
- `__COURTYARD_SECTION_4_TITLE__`
- `__COURTYARD_SOURCE_NOTE__`
- `__COURTYARD_TITLE__`
- `__COURTYARD_VIEW_A__`
- `__COURTYARD_VIEW_B__`
- `__CRAFT_FOLIO_DESCRIPTION__`
- `__CRAFT_FOLIO_INTRODUCTION__`
- `__CRAFT_FOLIO_TITLE__`
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
- `__EDITION_CODE__`
- `__EDITION_LABEL__`
- `__EDITORIAL_ASIDE__`
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
- `__FEED_BUILD_RFC822__`
- `__FEED_DESCRIPTION__`
- `__FEED_TITLE__`
- `__FERRY_CALLOUT__`
- `__FERRY_COVER_ALT__`
- `__FERRY_COVER_CAPTION__`
- `__FERRY_DECK__`
- `__FERRY_DESCRIPTION__`
- `__FERRY_FAQ_ANSWER_1__`
- `__FERRY_FAQ_ANSWER_2__`
- `__FERRY_FAQ_QUESTION_1__`
- `__FERRY_FAQ_QUESTION_2__`
- `__FERRY_FAQ_TITLE__`
- `__FERRY_FEED_SUMMARY__`
- `__FERRY_PUBDATE_RFC822__`
- `__FERRY_READING_TIME__`
- `__FERRY_SECTION_1_BODY__`
- `__FERRY_SECTION_1_TITLE__`
- `__FERRY_SECTION_2_BODY__`
- `__FERRY_SECTION_2_TITLE__`
- `__FERRY_SECTION_3_BODY__`
- `__FERRY_SECTION_3_TITLE__`
- `__FERRY_SECTION_4_BODY__`
- `__FERRY_SECTION_4_TITLE__`
- `__FERRY_SECTION_5_BODY__`
- `__FERRY_SECTION_5_TITLE__`
- `__FERRY_SOURCE_NOTE__`
- `__FERRY_STOP_1_NOTE__`
- `__FERRY_STOP_1_TITLE__`
- `__FERRY_STOP_2_NOTE__`
- `__FERRY_STOP_2_TITLE__`
- `__FERRY_STOP_3_NOTE__`
- `__FERRY_STOP_3_TITLE__`
- `__FERRY_TITLE__`
- `__FRESHNESS_GUIDE_1_BODY__`
- `__FRESHNESS_GUIDE_1_TITLE__`
- `__FRESHNESS_GUIDE_2_BODY__`
- `__FRESHNESS_GUIDE_2_TITLE__`
- `__FRESHNESS_GUIDE_3_BODY__`
- `__FRESHNESS_GUIDE_3_TITLE__`
- `__FRESHNESS_GUIDE_4_BODY__`
- `__FRESHNESS_GUIDE_4_TITLE__`
- `__FRESHNESS_GUIDE_5_BODY__`
- `__FRESHNESS_GUIDE_5_TITLE__`
- `__FRESHNESS_TOOL_DESCRIPTION__`
- `__FRESHNESS_TOOL_INTRODUCTION__`
- `__FRESHNESS_TOOL_TITLE__`
- `__GUESTHOUSE_CALLOUT__`
- `__GUESTHOUSE_COVER_ALT__`
- `__GUESTHOUSE_COVER_CAPTION__`
- `__GUESTHOUSE_DECK__`
- `__GUESTHOUSE_DESCRIPTION__`
- `__GUESTHOUSE_FAQ_ANSWER_1__`
- `__GUESTHOUSE_FAQ_QUESTION_1__`
- `__GUESTHOUSE_FAQ_TITLE__`
- `__GUESTHOUSE_FEED_SUMMARY__`
- `__GUESTHOUSE_OPENING__`
- `__GUESTHOUSE_PUBDATE_RFC822__`
- `__GUESTHOUSE_READING_TIME__`
- `__GUESTHOUSE_SEASON_1__`
- `__GUESTHOUSE_SEASON_2__`
- `__GUESTHOUSE_SEASON_3__`
- `__GUESTHOUSE_SEASON_4__`
- `__GUESTHOUSE_SECTION_1_BODY__`
- `__GUESTHOUSE_SECTION_1_TITLE__`
- `__GUESTHOUSE_SECTION_2_BODY__`
- `__GUESTHOUSE_SECTION_2_TITLE__`
- `__GUESTHOUSE_SECTION_3_BODY__`
- `__GUESTHOUSE_SECTION_3_TITLE__`
- `__GUESTHOUSE_SECTION_4_BODY__`
- `__GUESTHOUSE_SECTION_4_TITLE__`
- `__GUESTHOUSE_SECTION_5_BODY__`
- `__GUESTHOUSE_SECTION_5_TITLE__`
- `__GUESTHOUSE_SECTION_6_BODY__`
- `__GUESTHOUSE_SECTION_6_TITLE__`
- `__GUESTHOUSE_SOURCE_NOTE__`
- `__GUESTHOUSE_TITLE__`
- `__HOME_DESCRIPTION__`
- `__HOME_INTRODUCTION__`
- `__HOME_TITLE__`
- `__HOURS_GUIDE_1_BODY__`
- `__HOURS_GUIDE_1_TITLE__`
- `__HOURS_GUIDE_2_BODY__`
- `__HOURS_GUIDE_2_TITLE__`
- `__HOURS_GUIDE_3_BODY__`
- `__HOURS_GUIDE_3_TITLE__`
- `__HOURS_GUIDE_4_BODY__`
- `__HOURS_GUIDE_4_TITLE__`
- `__HOURS_GUIDE_5_BODY__`
- `__HOURS_GUIDE_5_TITLE__`
- `__HOURS_TOOL_DESCRIPTION__`
- `__HOURS_TOOL_INTRODUCTION__`
- `__HOURS_TOOL_TITLE__`
- `__INVITE_CODE__`
- `__KITCHEN_CALLOUT__`
- `__KITCHEN_COVER_ALT__`
- `__KITCHEN_COVER_CAPTION__`
- `__KITCHEN_DECK__`
- `__KITCHEN_DESCRIPTION__`
- `__KITCHEN_FAQ_ANSWER_1__`
- `__KITCHEN_FAQ_ANSWER_2__`
- `__KITCHEN_FAQ_ANSWER_3__`
- `__KITCHEN_FAQ_QUESTION_1__`
- `__KITCHEN_FAQ_QUESTION_2__`
- `__KITCHEN_FAQ_QUESTION_3__`
- `__KITCHEN_FAQ_TITLE__`
- `__KITCHEN_FEED_SUMMARY__`
- `__KITCHEN_OPENING__`
- `__KITCHEN_PUBDATE_RFC822__`
- `__KITCHEN_QUESTION__`
- `__KITCHEN_READING_TIME__`
- `__KITCHEN_SECTION_1_BODY__`
- `__KITCHEN_SECTION_1_TITLE__`
- `__KITCHEN_SECTION_2_BODY__`
- `__KITCHEN_SECTION_2_TITLE__`
- `__KITCHEN_SECTION_3_BODY__`
- `__KITCHEN_SECTION_3_TITLE__`
- `__KITCHEN_SECTION_4_BODY__`
- `__KITCHEN_SECTION_4_TITLE__`
- `__KITCHEN_SECTION_5_BODY__`
- `__KITCHEN_SECTION_5_TITLE__`
- `__KITCHEN_SOURCE_NOTE__`
- `__KITCHEN_TITLE__`
- `__LANG__`
- `__LEGAL_RISK_NOTE__`
- `__LIBRARY_CALLOUT__`
- `__LIBRARY_COVER_ALT__`
- `__LIBRARY_COVER_CAPTION__`
- `__LIBRARY_DECK__`
- `__LIBRARY_DESCRIPTION__`
- `__LIBRARY_FAQ_ANSWER_1__`
- `__LIBRARY_FAQ_QUESTION_1__`
- `__LIBRARY_FAQ_TITLE__`
- `__LIBRARY_FEED_SUMMARY__`
- `__LIBRARY_NOTE_MARGIN__`
- `__LIBRARY_OPENING_TITLE__`
- `__LIBRARY_OPENING__`
- `__LIBRARY_PUBDATE_RFC822__`
- `__LIBRARY_READING_TIME__`
- `__LIBRARY_SECTION_1_BODY__`
- `__LIBRARY_SECTION_1_TITLE__`
- `__LIBRARY_SECTION_2_BODY__`
- `__LIBRARY_SECTION_2_TITLE__`
- `__LIBRARY_SECTION_3_BODY__`
- `__LIBRARY_SECTION_3_TITLE__`
- `__LIBRARY_SECTION_4_BODY__`
- `__LIBRARY_SECTION_4_TITLE__`
- `__LIBRARY_SECTION_5_BODY__`
- `__LIBRARY_SECTION_5_TITLE__`
- `__LIBRARY_SECTION_6_BODY__`
- `__LIBRARY_SECTION_6_TITLE__`
- `__LIBRARY_SOURCE_NOTE__`
- `__LIBRARY_TITLE__`
- `__MARKET_CALLOUT__`
- `__MARKET_COVER_ALT__`
- `__MARKET_COVER_CAPTION__`
- `__MARKET_DECK__`
- `__MARKET_DESCRIPTION__`
- `__MARKET_FAQ_ANSWER_1__`
- `__MARKET_FAQ_ANSWER_2__`
- `__MARKET_FAQ_ANSWER_3__`
- `__MARKET_FAQ_QUESTION_1__`
- `__MARKET_FAQ_QUESTION_2__`
- `__MARKET_FAQ_QUESTION_3__`
- `__MARKET_FAQ_TITLE__`
- `__MARKET_FEED_SUMMARY__`
- `__MARKET_FIELD_1_LABEL__`
- `__MARKET_FIELD_1_VALUE__`
- `__MARKET_FIELD_2_LABEL__`
- `__MARKET_FIELD_2_VALUE__`
- `__MARKET_FIELD_3_LABEL__`
- `__MARKET_FIELD_3_VALUE__`
- `__MARKET_FIELD_4_LABEL__`
- `__MARKET_FIELD_4_VALUE__`
- `__MARKET_FIELD_5_LABEL__`
- `__MARKET_FIELD_5_VALUE__`
- `__MARKET_FIELD_6_LABEL__`
- `__MARKET_FIELD_6_VALUE__`
- `__MARKET_OPENING__`
- `__MARKET_PUBDATE_RFC822__`
- `__MARKET_READING_TIME__`
- `__MARKET_SECTION_1_BODY__`
- `__MARKET_SECTION_1_TITLE__`
- `__MARKET_SECTION_2_BODY__`
- `__MARKET_SECTION_2_TITLE__`
- `__MARKET_SECTION_3_BODY__`
- `__MARKET_SECTION_3_TITLE__`
- `__MARKET_SECTION_4_BODY__`
- `__MARKET_SECTION_4_TITLE__`
- `__MARKET_SECTION_5_BODY__`
- `__MARKET_SECTION_5_TITLE__`
- `__MARKET_SECTION_6_BODY__`
- `__MARKET_SECTION_6_TITLE__`
- `__MARKET_SOURCE_NOTE__`
- `__MARKET_TITLE__`
- `__MODIFIED_DATE__`
- `__NAME_GUIDE_1_BODY__`
- `__NAME_GUIDE_1_TITLE__`
- `__NAME_GUIDE_2_BODY__`
- `__NAME_GUIDE_2_TITLE__`
- `__NAME_GUIDE_3_BODY__`
- `__NAME_GUIDE_3_TITLE__`
- `__NAME_GUIDE_4_BODY__`
- `__NAME_GUIDE_4_TITLE__`
- `__NAME_GUIDE_5_BODY__`
- `__NAME_GUIDE_5_TITLE__`
- `__NAME_TOOL_DESCRIPTION__`
- `__NAME_TOOL_INTRODUCTION__`
- `__NAME_TOOL_TITLE__`
- `__PRIVACY_ASIDE__`
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
- `__PROVENANCE_CALLOUT__`
- `__PROVENANCE_COVER_ALT__`
- `__PROVENANCE_COVER_CAPTION__`
- `__PROVENANCE_DECK__`
- `__PROVENANCE_DESCRIPTION__`
- `__PROVENANCE_FAQ_ANSWER_1__`
- `__PROVENANCE_FAQ_ANSWER_2__`
- `__PROVENANCE_FAQ_QUESTION_1__`
- `__PROVENANCE_FAQ_QUESTION_2__`
- `__PROVENANCE_FAQ_TITLE__`
- `__PROVENANCE_FEED_SUMMARY__`
- `__PROVENANCE_OPENING__`
- `__PROVENANCE_PUBDATE_RFC822__`
- `__PROVENANCE_READING_TIME__`
- `__PROVENANCE_SECTION_1_BODY__`
- `__PROVENANCE_SECTION_1_TITLE__`
- `__PROVENANCE_SECTION_2_BODY__`
- `__PROVENANCE_SECTION_2_TITLE__`
- `__PROVENANCE_SECTION_3_BODY__`
- `__PROVENANCE_SECTION_3_TITLE__`
- `__PROVENANCE_SECTION_4_BODY__`
- `__PROVENANCE_SECTION_4_TITLE__`
- `__PROVENANCE_SECTION_5_BODY__`
- `__PROVENANCE_SECTION_5_TITLE__`
- `__PROVENANCE_SOURCE_NOTE__`
- `__PROVENANCE_TITLE__`
- `__PUBLISHED_DATE__`
- `__REPAIR_CALLOUT__`
- `__REPAIR_COVER_ALT__`
- `__REPAIR_COVER_CAPTION__`
- `__REPAIR_DECK__`
- `__REPAIR_DESCRIPTION__`
- `__REPAIR_FEED_SUMMARY__`
- `__REPAIR_OBJECT_1__`
- `__REPAIR_OBJECT_2__`
- `__REPAIR_OBJECT_3__`
- `__REPAIR_OBJECT_4__`
- `__REPAIR_OBJECT_5__`
- `__REPAIR_OPENING_TITLE__`
- `__REPAIR_OPENING__`
- `__REPAIR_PUBDATE_RFC822__`
- `__REPAIR_READING_TIME__`
- `__REPAIR_SECTION_1_BODY__`
- `__REPAIR_SECTION_1_TITLE__`
- `__REPAIR_SECTION_2_BODY__`
- `__REPAIR_SECTION_2_TITLE__`
- `__REPAIR_SECTION_3_BODY__`
- `__REPAIR_SECTION_3_TITLE__`
- `__REPAIR_SECTION_4_BODY__`
- `__REPAIR_SECTION_4_TITLE__`
- `__REPAIR_SOURCE_NOTE__`
- `__REPAIR_TITLE__`
- `__ROAD_FOLIO_DESCRIPTION__`
- `__ROAD_FOLIO_INTRODUCTION__`
- `__ROAD_FOLIO_TITLE__`
- `__SECURITY_EMAIL__`
- `__SECURITY_EXPIRES_ISO__`
- `__SECURITY_LANGUAGES__`
- `__SITE_DOMAIN__`
- `__SITE_NAME__`
- `__TABLE_FOLIO_DESCRIPTION__`
- `__TABLE_FOLIO_INTRODUCTION__`
- `__TABLE_FOLIO_TITLE__`
- `__TOOL_INDEX_DESCRIPTION__`
- `__TOOL_INDEX_INTRODUCTION__`
- `__TOOL_INDEX_TITLE__`
- `__VERIFIED_DATE__`
- `__VISIT_GUIDE_1_BODY__`
- `__VISIT_GUIDE_1_TITLE__`
- `__VISIT_GUIDE_2_BODY__`
- `__VISIT_GUIDE_2_TITLE__`
- `__VISIT_GUIDE_3_BODY__`
- `__VISIT_GUIDE_3_TITLE__`
- `__VISIT_GUIDE_4_BODY__`
- `__VISIT_GUIDE_4_TITLE__`
- `__VISIT_GUIDE_5_BODY__`
- `__VISIT_GUIDE_5_TITLE__`
- `__VISIT_TOOL_DESCRIPTION__`
- `__VISIT_TOOL_INTRODUCTION__`
- `__VISIT_TOOL_TITLE__`
- `__WALK_CALLOUT__`
- `__WALK_COVER_ALT__`
- `__WALK_COVER_CAPTION__`
- `__WALK_DECK__`
- `__WALK_DESCRIPTION__`
- `__WALK_FAQ_ANSWER_1__`
- `__WALK_FAQ_ANSWER_2__`
- `__WALK_FAQ_QUESTION_1__`
- `__WALK_FAQ_QUESTION_2__`
- `__WALK_FAQ_TITLE__`
- `__WALK_FEED_SUMMARY__`
- `__WALK_OPENING__`
- `__WALK_PUBDATE_RFC822__`
- `__WALK_READING_TIME__`
- `__WALK_SECTION_1_BODY__`
- `__WALK_SECTION_1_TITLE__`
- `__WALK_SECTION_2_BODY__`
- `__WALK_SECTION_2_TITLE__`
- `__WALK_SECTION_3_BODY__`
- `__WALK_SECTION_3_TITLE__`
- `__WALK_SECTION_4_BODY__`
- `__WALK_SECTION_4_TITLE__`
- `__WALK_SECTION_5_BODY__`
- `__WALK_SECTION_5_TITLE__`
- `__WALK_SOURCE_NOTE__`
- `__WALK_TITLE__`
- `__WORDMARK__`
- `__WORKSHOP_CALLOUT__`
- `__WORKSHOP_COVER_ALT__`
- `__WORKSHOP_COVER_CAPTION__`
- `__WORKSHOP_DECK__`
- `__WORKSHOP_DESCRIPTION__`
- `__WORKSHOP_FEED_SUMMARY__`
- `__WORKSHOP_OPENING_TITLE__`
- `__WORKSHOP_OPENING__`
- `__WORKSHOP_PUBDATE_RFC822__`
- `__WORKSHOP_READING_TIME__`
- `__WORKSHOP_SEAL_LABEL__`
- `__WORKSHOP_SECTION_1_BODY__`
- `__WORKSHOP_SECTION_1_TITLE__`
- `__WORKSHOP_SECTION_2_BODY__`
- `__WORKSHOP_SECTION_2_TITLE__`
- `__WORKSHOP_SECTION_3_BODY__`
- `__WORKSHOP_SECTION_3_TITLE__`
- `__WORKSHOP_SECTION_4_BODY__`
- `__WORKSHOP_SECTION_4_TITLE__`
- `__WORKSHOP_SOURCE_NOTE__`
- `__WORKSHOP_TITLE__`
