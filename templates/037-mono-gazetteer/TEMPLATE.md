# 037 Mono Gazetteer — workflow-ready v2

## 用途

高端等宽地名录完整框架。后续 AI 只填写站点变量、经核实的正文与文章内容；页面架构、响应式视觉、五件工具逻辑、封面、合规与 SEO 资产均已完成。

## 页面角色

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "article.html",
  "articles": [
    "entries/place-name-file.html",
    "entries/alias-revision.html",
    "entries/romanization-card.html",
    "entries/water-name.html",
    "entries/coordinate-record.html",
    "entries/boundary-note.html",
    "entries/pass-elevation.html",
    "entries/settlement-index.html",
    "entries/source-lineage.html",
    "entries/disputed-label.html",
    "entries/field-notebook.html",
    "entries/access-docket.html"
  ],
  "cornerstones": [
    "entries/place-name-file.html",
    "entries/source-lineage.html"
  ],
  "registrationGuide": "entries/access-docket.html",
  "articleCovers": {
    "entries/place-name-file.html": {
      "display": "assets/covers/place-name-file.webp",
      "og": "assets/covers/place-name-file.png"
    },
    "entries/alias-revision.html": {
      "display": "assets/covers/alias-revision.webp",
      "og": "assets/covers/alias-revision.png"
    },
    "entries/romanization-card.html": {
      "display": "assets/covers/romanization-card.webp",
      "og": "assets/covers/romanization-card.png"
    },
    "entries/water-name.html": {
      "display": "assets/covers/water-name.webp",
      "og": "assets/covers/water-name.png"
    },
    "entries/coordinate-record.html": {
      "display": "assets/covers/coordinate-record.webp",
      "og": "assets/covers/coordinate-record.png"
    },
    "entries/boundary-note.html": {
      "display": "assets/covers/boundary-note.webp",
      "og": "assets/covers/boundary-note.png"
    },
    "entries/pass-elevation.html": {
      "display": "assets/covers/pass-elevation.webp",
      "og": "assets/covers/pass-elevation.png"
    },
    "entries/settlement-index.html": {
      "display": "assets/covers/settlement-index.webp",
      "og": "assets/covers/settlement-index.png"
    },
    "entries/source-lineage.html": {
      "display": "assets/covers/source-lineage.webp",
      "og": "assets/covers/source-lineage.png"
    },
    "entries/disputed-label.html": {
      "display": "assets/covers/disputed-label.webp",
      "og": "assets/covers/disputed-label.png"
    },
    "entries/field-notebook.html": {
      "display": "assets/covers/field-notebook.webp",
      "og": "assets/covers/field-notebook.png"
    },
    "entries/access-docket.html": {
      "display": "assets/covers/access-docket.webp",
      "og": "assets/covers/access-docket.png"
    }
  },
  "categories": [
    {
      "path": "collections/names-register.html",
      "label": "名称登记册",
      "articles": [
        "entries/place-name-file.html",
        "entries/alias-revision.html",
        "entries/romanization-card.html",
        "entries/water-name.html"
      ]
    },
    {
      "path": "collections/coordinates-register.html",
      "label": "坐标图册",
      "articles": [
        "entries/coordinate-record.html",
        "entries/boundary-note.html",
        "entries/pass-elevation.html",
        "entries/settlement-index.html"
      ]
    },
    {
      "path": "collections/evidence-register.html",
      "label": "证据卷宗",
      "articles": [
        "entries/source-lineage.html",
        "entries/disputed-label.html",
        "entries/field-notebook.html",
        "entries/access-docket.html"
      ]
    }
  ],
  "toolIndex": "tool.html",
  "tools": [
    "instruments/coordinate-format.html",
    "instruments/great-circle-distance.html",
    "instruments/initial-bearing.html",
    "instruments/extent-envelope.html",
    "instruments/record-sorter.html"
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
    "wordmark": "__WORDMARK__",
    "inviteCode": "__INVITE_CODE__",
    "benefitRate": "__BENEFIT_RATE__",
    "benefitDisclaimer": "__BENEFIT_DISCLAIMER__",
    "affiliateUrl": "__AFFILIATE_URL__"
  }
}
```

## 查阅申请页边界

`entries/access-docket.html` 只是内容与界面外壳，不含注册步骤或教程文字。页面恰好保留一个静态 `__AFFILIATE_URL__` 链接槽位、完整 `target` / `rel` 属性、邀请码与紧邻披露字段；其他页面不含转化直链。

## 内容接入顺序

1. 先替换全局变量、站点身份、经核实的利益说明与作者资料。
2. 再为十二份记录填写相互独立的标题、开场、章节、FAQ、来源和封面替代文字；不要删除任何既有结构。
3. 查阅申请页仅在单站事实核验完成后填写正文和注册链接；模板库不承载平台注册事实。
4. 上线前按单站流程复核 canonical、schema、sitemap、feed、推广披露与链接目标。

## 五件本地量具

- 坐标格式转换尺：十进制度与度分秒互换。
- 大圆距离测算盘：Haversine 球面距离估算。
- 初始方位角罗盘：两点间初始航向角。
- 坐标范围封套：坐标集边界、中心与数量。
- 档案编号排序机：编号自然排序与重复编号拒绝。

工具输入只在浏览器本地处理。每件工具都具备正常、错误、边界、复制、重置与输入变化失效旧结果状态，且有默认折叠的五段说明。

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
- `__ABOUT_SECTION_5_BODY__`
- `__ABOUT_SECTION_5_TITLE__`
- `__ABOUT_TITLE__`
- `__ACCESS_CALLOUT__`
- `__ACCESS_COVER_ALT__`
- `__ACCESS_COVER_CAPTION__`
- `__ACCESS_DECK__`
- `__ACCESS_DESCRIPTION__`
- `__ACCESS_FAQ_ANSWER_1__`
- `__ACCESS_FAQ_ANSWER_2__`
- `__ACCESS_FAQ_QUESTION_1__`
- `__ACCESS_FAQ_QUESTION_2__`
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
- `__ACCESS_SECTION_5_BODY__`
- `__ACCESS_SECTION_5_TITLE__`
- `__ACCESS_SOURCE_NOTE__`
- `__ACCESS_TITLE__`
- `__AFFILIATE_DISCLOSURE__`
- `__AFFILIATE_LINK_LABEL__`
- `__AFFILIATE_URL__`
- `__ALIAS_CALLOUT__`
- `__ALIAS_COVER_ALT__`
- `__ALIAS_COVER_CAPTION__`
- `__ALIAS_DATE_1__`
- `__ALIAS_DATE_2__`
- `__ALIAS_DATE_3__`
- `__ALIAS_DECK__`
- `__ALIAS_DESCRIPTION__`
- `__ALIAS_FAQ_ANSWER_1__`
- `__ALIAS_FAQ_ANSWER_2__`
- `__ALIAS_FAQ_QUESTION_1__`
- `__ALIAS_FAQ_QUESTION_2__`
- `__ALIAS_FAQ_TITLE__`
- `__ALIAS_FEED_SUMMARY__`
- `__ALIAS_LABEL_1__`
- `__ALIAS_LABEL_2__`
- `__ALIAS_LABEL_3__`
- `__ALIAS_PUBDATE_RFC822__`
- `__ALIAS_READING_TIME__`
- `__ALIAS_SECTION_1_BODY__`
- `__ALIAS_SECTION_1_TITLE__`
- `__ALIAS_SECTION_2_BODY__`
- `__ALIAS_SECTION_2_TITLE__`
- `__ALIAS_SECTION_3_BODY__`
- `__ALIAS_SECTION_3_TITLE__`
- `__ALIAS_SECTION_4_BODY__`
- `__ALIAS_SECTION_4_TITLE__`
- `__ALIAS_SECTION_5_BODY__`
- `__ALIAS_SECTION_5_TITLE__`
- `__ALIAS_SOURCE_NOTE__`
- `__ALIAS_TITLE__`
- `__ARTICLE_INDEX_DESCRIPTION__`
- `__ARTICLE_INDEX_INTRODUCTION__`
- `__ARTICLE_INDEX_TITLE__`
- `__AUTHOR_BIO__`
- `__AUTHOR_NAME__`
- `__BEARING_GUIDE_1_BODY__`
- `__BEARING_GUIDE_1_TITLE__`
- `__BEARING_GUIDE_2_BODY__`
- `__BEARING_GUIDE_2_TITLE__`
- `__BEARING_GUIDE_3_BODY__`
- `__BEARING_GUIDE_3_TITLE__`
- `__BEARING_GUIDE_4_BODY__`
- `__BEARING_GUIDE_4_TITLE__`
- `__BEARING_GUIDE_5_BODY__`
- `__BEARING_GUIDE_5_TITLE__`
- `__BEARING_TOOL_DESCRIPTION__`
- `__BEARING_TOOL_INTRODUCTION__`
- `__BEARING_TOOL_TITLE__`
- `__BENEFIT_DISCLAIMER__`
- `__BENEFIT_RATE__`
- `__BOUNDARY_CALLOUT__`
- `__BOUNDARY_COVER_ALT__`
- `__BOUNDARY_COVER_CAPTION__`
- `__BOUNDARY_DECK__`
- `__BOUNDARY_DESCRIPTION__`
- `__BOUNDARY_FAQ_ANSWER_1__`
- `__BOUNDARY_FAQ_ANSWER_2__`
- `__BOUNDARY_FAQ_QUESTION_1__`
- `__BOUNDARY_FAQ_QUESTION_2__`
- `__BOUNDARY_FAQ_TITLE__`
- `__BOUNDARY_FEED_SUMMARY__`
- `__BOUNDARY_PUBDATE_RFC822__`
- `__BOUNDARY_READING_TIME__`
- `__BOUNDARY_SECTION_1_BODY__`
- `__BOUNDARY_SECTION_1_TITLE__`
- `__BOUNDARY_SECTION_2_BODY__`
- `__BOUNDARY_SECTION_2_TITLE__`
- `__BOUNDARY_SECTION_3_BODY__`
- `__BOUNDARY_SECTION_3_TITLE__`
- `__BOUNDARY_SECTION_4_BODY__`
- `__BOUNDARY_SECTION_4_TITLE__`
- `__BOUNDARY_SECTION_5_BODY__`
- `__BOUNDARY_SECTION_5_TITLE__`
- `__BOUNDARY_SIDE_A_NOTE__`
- `__BOUNDARY_SIDE_A_TITLE__`
- `__BOUNDARY_SIDE_B_NOTE__`
- `__BOUNDARY_SIDE_B_TITLE__`
- `__BOUNDARY_SOURCE_NOTE__`
- `__BOUNDARY_TITLE__`
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
- `__CONTACT_SECTION_5_BODY__`
- `__CONTACT_SECTION_5_TITLE__`
- `__CONTACT_TITLE__`
- `__COORDINATES_COLLECTION_DESCRIPTION__`
- `__COORDINATES_COLLECTION_INTRODUCTION__`
- `__COORDINATES_COLLECTION_TITLE__`
- `__COORD_CALLOUT__`
- `__COORD_COORDINATE_STRING__`
- `__COORD_COVER_ALT__`
- `__COORD_COVER_CAPTION__`
- `__COORD_DECK__`
- `__COORD_DESCRIPTION__`
- `__COORD_EAST__`
- `__COORD_FAQ_ANSWER_1__`
- `__COORD_FAQ_ANSWER_2__`
- `__COORD_FAQ_QUESTION_1__`
- `__COORD_FAQ_QUESTION_2__`
- `__COORD_FAQ_TITLE__`
- `__COORD_FEED_SUMMARY__`
- `__COORD_NORTH__`
- `__COORD_OPENING__`
- `__COORD_PUBDATE_RFC822__`
- `__COORD_READING_TIME__`
- `__COORD_SECTION_1_BODY__`
- `__COORD_SECTION_1_TITLE__`
- `__COORD_SECTION_2_BODY__`
- `__COORD_SECTION_2_TITLE__`
- `__COORD_SECTION_3_BODY__`
- `__COORD_SECTION_3_TITLE__`
- `__COORD_SECTION_4_BODY__`
- `__COORD_SECTION_4_TITLE__`
- `__COORD_SECTION_5_BODY__`
- `__COORD_SECTION_5_TITLE__`
- `__COORD_SOURCE_NOTE__`
- `__COORD_TITLE__`
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
- `__CORRECTIONS_SECTION_5_BODY__`
- `__CORRECTIONS_SECTION_5_TITLE__`
- `__CORRECTIONS_TITLE__`
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
- `__DISCLAIMER_SECTION_5_BODY__`
- `__DISCLAIMER_SECTION_5_TITLE__`
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
- `__DISCLOSURE_SECTION_5_BODY__`
- `__DISCLOSURE_SECTION_5_TITLE__`
- `__DISCLOSURE_TITLE__`
- `__DISPUTE_CALLOUT__`
- `__DISPUTE_COVER_ALT__`
- `__DISPUTE_COVER_CAPTION__`
- `__DISPUTE_DECK__`
- `__DISPUTE_DESCRIPTION__`
- `__DISPUTE_FAQ_ANSWER_1__`
- `__DISPUTE_FAQ_ANSWER_2__`
- `__DISPUTE_FAQ_QUESTION_1__`
- `__DISPUTE_FAQ_QUESTION_2__`
- `__DISPUTE_FAQ_TITLE__`
- `__DISPUTE_FEED_SUMMARY__`
- `__DISPUTE_OPENING__`
- `__DISPUTE_PUBDATE_RFC822__`
- `__DISPUTE_QUESTION__`
- `__DISPUTE_READING_TIME__`
- `__DISPUTE_SECTION_1_BODY__`
- `__DISPUTE_SECTION_1_TITLE__`
- `__DISPUTE_SECTION_2_BODY__`
- `__DISPUTE_SECTION_2_TITLE__`
- `__DISPUTE_SECTION_3_BODY__`
- `__DISPUTE_SECTION_3_TITLE__`
- `__DISPUTE_SECTION_4_BODY__`
- `__DISPUTE_SECTION_4_TITLE__`
- `__DISPUTE_SECTION_5_BODY__`
- `__DISPUTE_SECTION_5_TITLE__`
- `__DISPUTE_SOURCE_NOTE__`
- `__DISPUTE_STATUS__`
- `__DISPUTE_TITLE__`
- `__DISTANCE_GUIDE_1_BODY__`
- `__DISTANCE_GUIDE_1_TITLE__`
- `__DISTANCE_GUIDE_2_BODY__`
- `__DISTANCE_GUIDE_2_TITLE__`
- `__DISTANCE_GUIDE_3_BODY__`
- `__DISTANCE_GUIDE_3_TITLE__`
- `__DISTANCE_GUIDE_4_BODY__`
- `__DISTANCE_GUIDE_4_TITLE__`
- `__DISTANCE_GUIDE_5_BODY__`
- `__DISTANCE_GUIDE_5_TITLE__`
- `__DISTANCE_TOOL_DESCRIPTION__`
- `__DISTANCE_TOOL_INTRODUCTION__`
- `__DISTANCE_TOOL_TITLE__`
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
- `__EDITORIAL_SECTION_5_BODY__`
- `__EDITORIAL_SECTION_5_TITLE__`
- `__EDITORIAL_TITLE__`
- `__ELEVATION_CALLOUT__`
- `__ELEVATION_COVER_ALT__`
- `__ELEVATION_COVER_CAPTION__`
- `__ELEVATION_DECK__`
- `__ELEVATION_DESCRIPTION__`
- `__ELEVATION_FAQ_ANSWER_1__`
- `__ELEVATION_FAQ_ANSWER_2__`
- `__ELEVATION_FAQ_QUESTION_1__`
- `__ELEVATION_FAQ_QUESTION_2__`
- `__ELEVATION_FAQ_TITLE__`
- `__ELEVATION_FEED_SUMMARY__`
- `__ELEVATION_HEIGHT__`
- `__ELEVATION_OPENING_TITLE__`
- `__ELEVATION_OPENING__`
- `__ELEVATION_PUBDATE_RFC822__`
- `__ELEVATION_READING_TIME__`
- `__ELEVATION_SECTION_1_BODY__`
- `__ELEVATION_SECTION_1_TITLE__`
- `__ELEVATION_SECTION_2_BODY__`
- `__ELEVATION_SECTION_2_TITLE__`
- `__ELEVATION_SECTION_3_BODY__`
- `__ELEVATION_SECTION_3_TITLE__`
- `__ELEVATION_SECTION_4_BODY__`
- `__ELEVATION_SECTION_4_TITLE__`
- `__ELEVATION_SECTION_5_BODY__`
- `__ELEVATION_SECTION_5_TITLE__`
- `__ELEVATION_SOURCE_NOTE__`
- `__ELEVATION_TITLE__`
- `__EVIDENCE_COLLECTION_DESCRIPTION__`
- `__EVIDENCE_COLLECTION_INTRODUCTION__`
- `__EVIDENCE_COLLECTION_TITLE__`
- `__EXTENT_GUIDE_1_BODY__`
- `__EXTENT_GUIDE_1_TITLE__`
- `__EXTENT_GUIDE_2_BODY__`
- `__EXTENT_GUIDE_2_TITLE__`
- `__EXTENT_GUIDE_3_BODY__`
- `__EXTENT_GUIDE_3_TITLE__`
- `__EXTENT_GUIDE_4_BODY__`
- `__EXTENT_GUIDE_4_TITLE__`
- `__EXTENT_GUIDE_5_BODY__`
- `__EXTENT_GUIDE_5_TITLE__`
- `__EXTENT_TOOL_DESCRIPTION__`
- `__EXTENT_TOOL_INTRODUCTION__`
- `__EXTENT_TOOL_TITLE__`
- `__FEED_DESCRIPTION__`
- `__FEED_TITLE__`
- `__FIELD_CALLOUT__`
- `__FIELD_COVER_ALT__`
- `__FIELD_COVER_CAPTION__`
- `__FIELD_DECK__`
- `__FIELD_DESCRIPTION__`
- `__FIELD_FAQ_ANSWER_1__`
- `__FIELD_FAQ_ANSWER_2__`
- `__FIELD_FAQ_QUESTION_1__`
- `__FIELD_FAQ_QUESTION_2__`
- `__FIELD_FAQ_TITLE__`
- `__FIELD_OBSERVER__`
- `__FIELD_OPENING__`
- `__FIELD_READING_TIME__`
- `__FIELD_SECTION_1_BODY__`
- `__FIELD_SECTION_1_TITLE__`
- `__FIELD_SECTION_2_BODY__`
- `__FIELD_SECTION_2_TITLE__`
- `__FIELD_SECTION_3_BODY__`
- `__FIELD_SECTION_3_TITLE__`
- `__FIELD_SECTION_4_BODY__`
- `__FIELD_SECTION_4_TITLE__`
- `__FIELD_SECTION_5_BODY__`
- `__FIELD_SECTION_5_TITLE__`
- `__FIELD_SOURCE_NOTE__`
- `__FIELD_TITLE__`
- `__FIELD_VISIT_DATE__`
- `__FORMAT_GUIDE_1_BODY__`
- `__FORMAT_GUIDE_1_TITLE__`
- `__FORMAT_GUIDE_2_BODY__`
- `__FORMAT_GUIDE_2_TITLE__`
- `__FORMAT_GUIDE_3_BODY__`
- `__FORMAT_GUIDE_3_TITLE__`
- `__FORMAT_GUIDE_4_BODY__`
- `__FORMAT_GUIDE_4_TITLE__`
- `__FORMAT_GUIDE_5_BODY__`
- `__FORMAT_GUIDE_5_TITLE__`
- `__FORMAT_TOOL_DESCRIPTION__`
- `__FORMAT_TOOL_INTRODUCTION__`
- `__FORMAT_TOOL_TITLE__`
- `__HOME_COORDINATE_LABEL__`
- `__HOME_DESCRIPTION__`
- `__HOME_INTRODUCTION__`
- `__HOME_TITLE__`
- `__INVITE_CODE__`
- `__LANG__`
- `__MODIFIED_DATE__`
- `__NAMES_COLLECTION_DESCRIPTION__`
- `__NAMES_COLLECTION_INTRODUCTION__`
- `__NAMES_COLLECTION_TITLE__`
- `__PLACE_CALLOUT__`
- `__PLACE_COVER_ALT__`
- `__PLACE_COVER_CAPTION__`
- `__PLACE_DECK__`
- `__PLACE_DESCRIPTION__`
- `__PLACE_FAQ_ANSWER_1__`
- `__PLACE_FAQ_ANSWER_2__`
- `__PLACE_FAQ_QUESTION_1__`
- `__PLACE_FAQ_QUESTION_2__`
- `__PLACE_FAQ_TITLE__`
- `__PLACE_FEED_SUMMARY__`
- `__PLACE_LATITUDE__`
- `__PLACE_LONGITUDE__`
- `__PLACE_OPENING__`
- `__PLACE_PRIMARY_NAME__`
- `__PLACE_PUBDATE_RFC822__`
- `__PLACE_READING_TIME__`
- `__PLACE_RECORD_ID__`
- `__PLACE_SECTION_1_BODY__`
- `__PLACE_SECTION_1_TITLE__`
- `__PLACE_SECTION_2_BODY__`
- `__PLACE_SECTION_2_TITLE__`
- `__PLACE_SECTION_3_BODY__`
- `__PLACE_SECTION_3_TITLE__`
- `__PLACE_SECTION_4_BODY__`
- `__PLACE_SECTION_4_TITLE__`
- `__PLACE_SECTION_5_BODY__`
- `__PLACE_SECTION_5_TITLE__`
- `__PLACE_SOURCE_NOTE__`
- `__PLACE_TITLE__`
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
- `__PRIVACY_SECTION_5_BODY__`
- `__PRIVACY_SECTION_5_TITLE__`
- `__PRIVACY_TITLE__`
- `__PUBLISHED_DATE__`
- `__ROMAN_CALLOUT__`
- `__ROMAN_COVER_ALT__`
- `__ROMAN_COVER_CAPTION__`
- `__ROMAN_DECK__`
- `__ROMAN_DESCRIPTION__`
- `__ROMAN_FAQ_ANSWER_1__`
- `__ROMAN_FAQ_ANSWER_2__`
- `__ROMAN_FAQ_QUESTION_1__`
- `__ROMAN_FAQ_QUESTION_2__`
- `__ROMAN_FAQ_TITLE__`
- `__ROMAN_FEED_SUMMARY__`
- `__ROMAN_LOCAL_1__`
- `__ROMAN_LOCAL_2__`
- `__ROMAN_OPENING__`
- `__ROMAN_PUBDATE_RFC822__`
- `__ROMAN_READING_TIME__`
- `__ROMAN_ROMAN_1__`
- `__ROMAN_ROMAN_2__`
- `__ROMAN_SECTION_1_BODY__`
- `__ROMAN_SECTION_1_TITLE__`
- `__ROMAN_SECTION_2_BODY__`
- `__ROMAN_SECTION_2_TITLE__`
- `__ROMAN_SECTION_3_BODY__`
- `__ROMAN_SECTION_3_TITLE__`
- `__ROMAN_SECTION_4_BODY__`
- `__ROMAN_SECTION_4_TITLE__`
- `__ROMAN_SECTION_5_BODY__`
- `__ROMAN_SECTION_5_TITLE__`
- `__ROMAN_SOURCE_NOTE__`
- `__ROMAN_TITLE__`
- `__SECURITY_EMAIL__`
- `__SECURITY_EXPIRES_ISO__`
- `__SECURITY_LANGUAGES__`
- `__SETTLEMENT_CALLOUT__`
- `__SETTLEMENT_COUNT_LABEL__`
- `__SETTLEMENT_COVER_ALT__`
- `__SETTLEMENT_COVER_CAPTION__`
- `__SETTLEMENT_DECK__`
- `__SETTLEMENT_DESCRIPTION__`
- `__SETTLEMENT_FAQ_ANSWER_1__`
- `__SETTLEMENT_FAQ_ANSWER_2__`
- `__SETTLEMENT_FAQ_QUESTION_1__`
- `__SETTLEMENT_FAQ_QUESTION_2__`
- `__SETTLEMENT_FAQ_TITLE__`
- `__SETTLEMENT_FEED_SUMMARY__`
- `__SETTLEMENT_OPENING_TITLE__`
- `__SETTLEMENT_OPENING__`
- `__SETTLEMENT_PUBDATE_RFC822__`
- `__SETTLEMENT_READING_TIME__`
- `__SETTLEMENT_SECTION_1_BODY__`
- `__SETTLEMENT_SECTION_1_TITLE__`
- `__SETTLEMENT_SECTION_2_BODY__`
- `__SETTLEMENT_SECTION_2_TITLE__`
- `__SETTLEMENT_SECTION_3_BODY__`
- `__SETTLEMENT_SECTION_3_TITLE__`
- `__SETTLEMENT_SECTION_4_BODY__`
- `__SETTLEMENT_SECTION_4_TITLE__`
- `__SETTLEMENT_SECTION_5_BODY__`
- `__SETTLEMENT_SECTION_5_TITLE__`
- `__SETTLEMENT_SOURCE_NOTE__`
- `__SETTLEMENT_TITLE__`
- `__SITE_DOMAIN__`
- `__SITE_NAME__`
- `__SORT_GUIDE_1_BODY__`
- `__SORT_GUIDE_1_TITLE__`
- `__SORT_GUIDE_2_BODY__`
- `__SORT_GUIDE_2_TITLE__`
- `__SORT_GUIDE_3_BODY__`
- `__SORT_GUIDE_3_TITLE__`
- `__SORT_GUIDE_4_BODY__`
- `__SORT_GUIDE_4_TITLE__`
- `__SORT_GUIDE_5_BODY__`
- `__SORT_GUIDE_5_TITLE__`
- `__SORT_TOOL_DESCRIPTION__`
- `__SORT_TOOL_INTRODUCTION__`
- `__SORT_TOOL_TITLE__`
- `__SOURCE_CALLOUT__`
- `__SOURCE_COVER_ALT__`
- `__SOURCE_COVER_CAPTION__`
- `__SOURCE_DECK__`
- `__SOURCE_DESCRIPTION__`
- `__SOURCE_FAQ_ANSWER_1__`
- `__SOURCE_FAQ_ANSWER_2__`
- `__SOURCE_FAQ_QUESTION_1__`
- `__SOURCE_FAQ_QUESTION_2__`
- `__SOURCE_FAQ_TITLE__`
- `__SOURCE_FEED_SUMMARY__`
- `__SOURCE_OPENING__`
- `__SOURCE_PUBDATE_RFC822__`
- `__SOURCE_READING_TIME__`
- `__SOURCE_SECTION_1_BODY__`
- `__SOURCE_SECTION_1_TITLE__`
- `__SOURCE_SECTION_2_BODY__`
- `__SOURCE_SECTION_2_TITLE__`
- `__SOURCE_SECTION_3_BODY__`
- `__SOURCE_SECTION_3_TITLE__`
- `__SOURCE_SECTION_4_BODY__`
- `__SOURCE_SECTION_4_TITLE__`
- `__SOURCE_SECTION_5_BODY__`
- `__SOURCE_SECTION_5_TITLE__`
- `__SOURCE_SOURCE_1__`
- `__SOURCE_SOURCE_2__`
- `__SOURCE_SOURCE_3__`
- `__SOURCE_SOURCE_NOTE__`
- `__SOURCE_TITLE__`
- `__TOOL_INDEX_BOUNDARY_NOTE__`
- `__TOOL_INDEX_DESCRIPTION__`
- `__TOOL_INDEX_INTRODUCTION__`
- `__TOOL_INDEX_TITLE__`
- `__VERIFIED_DATE__`
- `__WATER_CALLOUT__`
- `__WATER_COVER_ALT__`
- `__WATER_COVER_CAPTION__`
- `__WATER_DECK__`
- `__WATER_DESCRIPTION__`
- `__WATER_FAQ_ANSWER_1__`
- `__WATER_FAQ_ANSWER_2__`
- `__WATER_FAQ_QUESTION_1__`
- `__WATER_FAQ_QUESTION_2__`
- `__WATER_FAQ_TITLE__`
- `__WATER_FEED_SUMMARY__`
- `__WATER_OPENING_TITLE__`
- `__WATER_OPENING__`
- `__WATER_PUBDATE_RFC822__`
- `__WATER_READING_TIME__`
- `__WATER_SECTION_1_BODY__`
- `__WATER_SECTION_1_TITLE__`
- `__WATER_SECTION_2_BODY__`
- `__WATER_SECTION_2_TITLE__`
- `__WATER_SECTION_3_BODY__`
- `__WATER_SECTION_3_TITLE__`
- `__WATER_SECTION_4_BODY__`
- `__WATER_SECTION_4_TITLE__`
- `__WATER_SECTION_5_BODY__`
- `__WATER_SECTION_5_TITLE__`
- `__WATER_SOURCE_NOTE__`
- `__WATER_TITLE__`
- `__WORDMARK__`
