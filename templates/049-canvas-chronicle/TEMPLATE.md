# 049-canvas-chronicle

## 完整 UI 与内容接口

深靛极光、青绿时标、来源星图与纵向变更流构成独立编年界面。包含 30 个可索引页面、独立 404、三个兼容入口、十二个内容外壳、三条轨道、五件本地仪器与七页治理框架。旧示例平台、费率与实时状态已改为可填写变量。

## 下游文字接入

- 只填写站点变量、核实后的文字和文章内容，不重建 UI、组件、工具算法或图像资产。保留 cc49 类名、data 钩子、表单 name 与页内锚点。
- 三种记录开场、十二种独立模块、不同章节/FAQ/收尾，以及目录、引用、作者区、相关内容和封面均已预搭。
- registrationGuide 是兼容字段，指向唯一推广组件的通用记录外壳，不是注册教程任务。其静态链接、新窗口、rel 四件套及相邻披露均需保留。
- 工具分别处理半开区间并集、固定 UTC 偏移换算、序号缺口、相对坐标和数字片段版本排序；所有输入只在本地处理，不读取真实平台数据。版本工具不是完整 SemVer 解析器，不支持预发布标签。
- 内容替换需分别进行 HTML/XML 实体转义与 JSON-LD 字符串编码。站名、标题、摘要在可见内容与元数据中保持一致；日期为 ISO 格式。
- 首屏标题分两段填写。替换英文品牌、标题、邀请码、利益点与脚注后，复验 360px/390px 首屏和长文本布局。

## workflow-ready-v2

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "chronicle.html",
  "articles": [
    "records/epochs-map.html",
    "records/change-window.html",
    "records/before-after.html",
    "records/scope-panel.html",
    "records/source-constellation.html",
    "records/time-mark.html",
    "records/revision-trail.html",
    "records/impact-lens.html",
    "records/archive-bridge.html",
    "records/verification-grid.html",
    "records/term-orbit.html",
    "records/access-record.html"
  ],
  "cornerstones": [
    "records/epochs-map.html",
    "records/change-window.html"
  ],
  "registrationGuide": "records/access-record.html",
  "articleCovers": {
    "records/epochs-map.html": {
      "display": "assets/covers/epochs-map.webp",
      "og": "assets/covers/epochs-map.png"
    },
    "records/change-window.html": {
      "display": "assets/covers/change-window.webp",
      "og": "assets/covers/change-window.png"
    },
    "records/before-after.html": {
      "display": "assets/covers/before-after.webp",
      "og": "assets/covers/before-after.png"
    },
    "records/scope-panel.html": {
      "display": "assets/covers/scope-panel.webp",
      "og": "assets/covers/scope-panel.png"
    },
    "records/source-constellation.html": {
      "display": "assets/covers/source-constellation.webp",
      "og": "assets/covers/source-constellation.png"
    },
    "records/time-mark.html": {
      "display": "assets/covers/time-mark.webp",
      "og": "assets/covers/time-mark.png"
    },
    "records/revision-trail.html": {
      "display": "assets/covers/revision-trail.webp",
      "og": "assets/covers/revision-trail.png"
    },
    "records/impact-lens.html": {
      "display": "assets/covers/impact-lens.webp",
      "og": "assets/covers/impact-lens.png"
    },
    "records/archive-bridge.html": {
      "display": "assets/covers/archive-bridge.webp",
      "og": "assets/covers/archive-bridge.png"
    },
    "records/verification-grid.html": {
      "display": "assets/covers/verification-grid.webp",
      "og": "assets/covers/verification-grid.png"
    },
    "records/term-orbit.html": {
      "display": "assets/covers/term-orbit.webp",
      "og": "assets/covers/term-orbit.png"
    },
    "records/access-record.html": {
      "display": "assets/covers/access-record.webp",
      "og": "assets/covers/access-record.png"
    }
  },
  "categories": [
    {
      "path": "bands/instants.html",
      "label": "时点刻度",
      "articles": [
        "records/epochs-map.html",
        "records/change-window.html",
        "records/before-after.html",
        "records/scope-panel.html"
      ]
    },
    {
      "path": "bands/spans.html",
      "label": "跨度视窗",
      "articles": [
        "records/source-constellation.html",
        "records/time-mark.html",
        "records/revision-trail.html",
        "records/impact-lens.html"
      ]
    },
    {
      "path": "bands/provenance.html",
      "label": "溯源轨道",
      "articles": [
        "records/archive-bridge.html",
        "records/verification-grid.html",
        "records/term-orbit.html",
        "records/access-record.html"
      ]
    }
  ],
  "toolIndex": "workbench.html",
  "tools": [
    "workbench/interval-union.html",
    "workbench/utc-offset.html",
    "workbench/sequence-gaps.html",
    "workbench/timeline-position.html",
    "workbench/version-order.html"
  ],
  "legal": {
    "about": "about.html",
    "contact": "contact.html",
    "disclosure": "disclosure.html",
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
  "socialImage": "assets/chronicle-social.png",
  "variables": {
    "siteDomain": "~SITE_DOMAIN~",
    "siteName": "~SITE_NAME~",
    "wordmark": "~WORDMARK~",
    "inviteCode": "~INVITE_CODE~",
    "benefitRate": "~BENEFIT_RATE~",
    "benefitDisclaimer": "~BENEFIT_DISCLAIMER~",
    "affiliateUrl": "~AFFILIATE_URL~"
  }
}
```

## 占位符 (556)

- `~ABOUT_BODY_1~`
- `~ABOUT_BODY_2~`
- `~ABOUT_BODY_3~`
- `~ABOUT_BODY_4~`
- `~ABOUT_DESCRIPTION~`
- `~ABOUT_H2_1~`
- `~ABOUT_H2_2~`
- `~ABOUT_H2_3~`
- `~ABOUT_H2_4~`
- `~ABOUT_INTRO~`
- `~ABOUT_TITLE~`
- `~ACCESS_RECORD_BODY_1~`
- `~ACCESS_RECORD_BODY_2~`
- `~ACCESS_RECORD_BODY_3~`
- `~ACCESS_RECORD_BODY_4~`
- `~ACCESS_RECORD_CLOSING_LABEL~`
- `~ACCESS_RECORD_CLOSING~`
- `~ACCESS_RECORD_COVER_ALT~`
- `~ACCESS_RECORD_COVER_CAPTION~`
- `~ACCESS_RECORD_DECK~`
- `~ACCESS_RECORD_FAQ_A_1~`
- `~ACCESS_RECORD_FAQ_A_2~`
- `~ACCESS_RECORD_FAQ_HEADING~`
- `~ACCESS_RECORD_FAQ_Q_1~`
- `~ACCESS_RECORD_FAQ_Q_2~`
- `~ACCESS_RECORD_FROM_LABEL~`
- `~ACCESS_RECORD_FROM_NOTE~`
- `~ACCESS_RECORD_H2_1~`
- `~ACCESS_RECORD_H2_2~`
- `~ACCESS_RECORD_H2_3~`
- `~ACCESS_RECORD_H2_4~`
- `~ACCESS_RECORD_INTRO~`
- `~ACCESS_RECORD_KICKER~`
- `~ACCESS_RECORD_QUOTE_SOURCE~`
- `~ACCESS_RECORD_QUOTE~`
- `~ACCESS_RECORD_SLOT_DESCRIPTION~`
- `~ACCESS_RECORD_SLOT_TITLE~`
- `~ACCESS_RECORD_STATE_LABEL~`
- `~ACCESS_RECORD_TITLE~`
- `~ACCESS_RECORD_TO_LABEL~`
- `~ACCESS_RECORD_TO_NOTE~`
- `~AFFILIATE_DISCLOSURE~`
- `~AFFILIATE_LABEL~`
- `~AFFILIATE_URL~`
- `~ARCHIVE_BRIDGE_BODY_1~`
- `~ARCHIVE_BRIDGE_BODY_2~`
- `~ARCHIVE_BRIDGE_BODY_3~`
- `~ARCHIVE_BRIDGE_BODY_4~`
- `~ARCHIVE_BRIDGE_BRIDGE_NOTE~`
- `~ARCHIVE_BRIDGE_CLOSING_LABEL~`
- `~ARCHIVE_BRIDGE_CLOSING~`
- `~ARCHIVE_BRIDGE_COVER_ALT~`
- `~ARCHIVE_BRIDGE_COVER_CAPTION~`
- `~ARCHIVE_BRIDGE_DECK~`
- `~ARCHIVE_BRIDGE_FAQ_A_1~`
- `~ARCHIVE_BRIDGE_FAQ_A_2~`
- `~ARCHIVE_BRIDGE_FAQ_HEADING~`
- `~ARCHIVE_BRIDGE_FAQ_Q_1~`
- `~ARCHIVE_BRIDGE_FAQ_Q_2~`
- `~ARCHIVE_BRIDGE_FROM_LABEL~`
- `~ARCHIVE_BRIDGE_FROM_NOTE~`
- `~ARCHIVE_BRIDGE_H2_1~`
- `~ARCHIVE_BRIDGE_H2_2~`
- `~ARCHIVE_BRIDGE_H2_3~`
- `~ARCHIVE_BRIDGE_H2_4~`
- `~ARCHIVE_BRIDGE_INTRO~`
- `~ARCHIVE_BRIDGE_KICKER~`
- `~ARCHIVE_BRIDGE_PAST_LABEL~`
- `~ARCHIVE_BRIDGE_PAST~`
- `~ARCHIVE_BRIDGE_PRESENT_LABEL~`
- `~ARCHIVE_BRIDGE_PRESENT~`
- `~ARCHIVE_BRIDGE_QUOTE_SOURCE~`
- `~ARCHIVE_BRIDGE_QUOTE~`
- `~ARCHIVE_BRIDGE_STATE_LABEL~`
- `~ARCHIVE_BRIDGE_TITLE~`
- `~ARCHIVE_BRIDGE_TO_LABEL~`
- `~ARCHIVE_BRIDGE_TO_NOTE~`
- `~ARCHIVE_HEADING~`
- `~ARCHIVE_INTRO~`
- `~ARCHIVE_NOTE~`
- `~ARTICLE_ALIAS_DESCRIPTION~`
- `~ARTICLE_ALIAS_TITLE~`
- `~AUTHOR_BIO~`
- `~AUTHOR_NAME~`
- `~BEFORE_AFTER_AFTER_LABEL~`
- `~BEFORE_AFTER_AFTER~`
- `~BEFORE_AFTER_BEFORE_LABEL~`
- `~BEFORE_AFTER_BEFORE~`
- `~BEFORE_AFTER_BODY_1~`
- `~BEFORE_AFTER_BODY_2~`
- `~BEFORE_AFTER_BODY_3~`
- `~BEFORE_AFTER_BODY_4~`
- `~BEFORE_AFTER_BODY_5~`
- `~BEFORE_AFTER_BODY_6~`
- `~BEFORE_AFTER_CLOSING_LABEL~`
- `~BEFORE_AFTER_CLOSING~`
- `~BEFORE_AFTER_COVER_ALT~`
- `~BEFORE_AFTER_COVER_CAPTION~`
- `~BEFORE_AFTER_DECK~`
- `~BEFORE_AFTER_DELTA_NOTE~`
- `~BEFORE_AFTER_FROM_LABEL~`
- `~BEFORE_AFTER_FROM_NOTE~`
- `~BEFORE_AFTER_H2_1~`
- `~BEFORE_AFTER_H2_2~`
- `~BEFORE_AFTER_H2_3~`
- `~BEFORE_AFTER_H2_4~`
- `~BEFORE_AFTER_H2_5~`
- `~BEFORE_AFTER_H2_6~`
- `~BEFORE_AFTER_INTRO~`
- `~BEFORE_AFTER_KICKER~`
- `~BEFORE_AFTER_QUOTE_SOURCE~`
- `~BEFORE_AFTER_QUOTE~`
- `~BEFORE_AFTER_STATE_LABEL~`
- `~BEFORE_AFTER_TITLE~`
- `~BEFORE_AFTER_TO_LABEL~`
- `~BEFORE_AFTER_TO_NOTE~`
- `~BENEFIT_DISCLAIMER~`
- `~BENEFIT_LABEL~`
- `~BENEFIT_RATE~`
- `~CHANGE_WINDOW_BODY_1~`
- `~CHANGE_WINDOW_BODY_2~`
- `~CHANGE_WINDOW_BODY_3~`
- `~CHANGE_WINDOW_BODY_4~`
- `~CHANGE_WINDOW_CLOSE~`
- `~CHANGE_WINDOW_CLOSING_LABEL~`
- `~CHANGE_WINDOW_CLOSING~`
- `~CHANGE_WINDOW_COVER_ALT~`
- `~CHANGE_WINDOW_COVER_CAPTION~`
- `~CHANGE_WINDOW_DECK~`
- `~CHANGE_WINDOW_EXCLUSION~`
- `~CHANGE_WINDOW_FAQ_A_1~`
- `~CHANGE_WINDOW_FAQ_A_2~`
- `~CHANGE_WINDOW_FAQ_A_3~`
- `~CHANGE_WINDOW_FAQ_HEADING~`
- `~CHANGE_WINDOW_FAQ_Q_1~`
- `~CHANGE_WINDOW_FAQ_Q_2~`
- `~CHANGE_WINDOW_FAQ_Q_3~`
- `~CHANGE_WINDOW_FROM_LABEL~`
- `~CHANGE_WINDOW_FROM_NOTE~`
- `~CHANGE_WINDOW_H2_1~`
- `~CHANGE_WINDOW_H2_2~`
- `~CHANGE_WINDOW_H2_3~`
- `~CHANGE_WINDOW_H2_4~`
- `~CHANGE_WINDOW_INTRO~`
- `~CHANGE_WINDOW_KICKER~`
- `~CHANGE_WINDOW_OPEN~`
- `~CHANGE_WINDOW_QUOTE_SOURCE~`
- `~CHANGE_WINDOW_QUOTE~`
- `~CHANGE_WINDOW_STATE_LABEL~`
- `~CHANGE_WINDOW_TITLE~`
- `~CHANGE_WINDOW_TO_LABEL~`
- `~CHANGE_WINDOW_TO_NOTE~`
- `~CHANGE_WINDOW_WINDOW_NOTE~`
- `~CHRONICLE_DESCRIPTION~`
- `~CHRONICLE_TITLE~`
- `~CONTACT_BODY_1~`
- `~CONTACT_BODY_2~`
- `~CONTACT_BODY_3~`
- `~CONTACT_BODY_4~`
- `~CONTACT_DESCRIPTION~`
- `~CONTACT_EMAIL~`
- `~CONTACT_H2_1~`
- `~CONTACT_H2_2~`
- `~CONTACT_H2_3~`
- `~CONTACT_H2_4~`
- `~CONTACT_INTRO~`
- `~CONTACT_TITLE~`
- `~CORRECTIONS_BODY_1~`
- `~CORRECTIONS_BODY_2~`
- `~CORRECTIONS_BODY_3~`
- `~CORRECTIONS_BODY_4~`
- `~CORRECTIONS_DESCRIPTION~`
- `~CORRECTIONS_H2_1~`
- `~CORRECTIONS_H2_2~`
- `~CORRECTIONS_H2_3~`
- `~CORRECTIONS_H2_4~`
- `~CORRECTIONS_INTRO~`
- `~CORRECTIONS_TITLE~`
- `~CURRENT_YEAR~`
- `~DISCLAIMER_BODY_1~`
- `~DISCLAIMER_BODY_2~`
- `~DISCLAIMER_BODY_3~`
- `~DISCLAIMER_BODY_4~`
- `~DISCLAIMER_DESCRIPTION~`
- `~DISCLAIMER_H2_1~`
- `~DISCLAIMER_H2_2~`
- `~DISCLAIMER_H2_3~`
- `~DISCLAIMER_H2_4~`
- `~DISCLAIMER_INTRO~`
- `~DISCLAIMER_TITLE~`
- `~DISCLOSURE_BODY_1~`
- `~DISCLOSURE_BODY_2~`
- `~DISCLOSURE_BODY_3~`
- `~DISCLOSURE_BODY_4~`
- `~DISCLOSURE_DESCRIPTION~`
- `~DISCLOSURE_H2_1~`
- `~DISCLOSURE_H2_2~`
- `~DISCLOSURE_H2_3~`
- `~DISCLOSURE_H2_4~`
- `~DISCLOSURE_INTRO~`
- `~DISCLOSURE_TITLE~`
- `~EDITION_DESCRIPTION~`
- `~EDITION_LABEL~`
- `~EDITION_NOTE~`
- `~EDITION_NO~`
- `~EDITION_SCOPE~`
- `~EDITION_TAG~`
- `~EDITION_TOPIC~`
- `~EDITORIAL_BODY_1~`
- `~EDITORIAL_BODY_2~`
- `~EDITORIAL_BODY_3~`
- `~EDITORIAL_BODY_4~`
- `~EDITORIAL_DESCRIPTION~`
- `~EDITORIAL_H2_1~`
- `~EDITORIAL_H2_2~`
- `~EDITORIAL_H2_3~`
- `~EDITORIAL_H2_4~`
- `~EDITORIAL_INTRO~`
- `~EDITORIAL_TITLE~`
- `~EPOCHS_MAP_BODY_1~`
- `~EPOCHS_MAP_BODY_2~`
- `~EPOCHS_MAP_BODY_3~`
- `~EPOCHS_MAP_BODY_4~`
- `~EPOCHS_MAP_BODY_5~`
- `~EPOCHS_MAP_CLOSING_LABEL~`
- `~EPOCHS_MAP_CLOSING~`
- `~EPOCHS_MAP_COVER_ALT~`
- `~EPOCHS_MAP_COVER_CAPTION~`
- `~EPOCHS_MAP_DECK~`
- `~EPOCHS_MAP_EPOCH~`
- `~EPOCHS_MAP_FAQ_A_1~`
- `~EPOCHS_MAP_FAQ_HEADING~`
- `~EPOCHS_MAP_FAQ_Q_1~`
- `~EPOCHS_MAP_FROM_LABEL~`
- `~EPOCHS_MAP_FROM_NOTE~`
- `~EPOCHS_MAP_H2_1~`
- `~EPOCHS_MAP_H2_2~`
- `~EPOCHS_MAP_H2_3~`
- `~EPOCHS_MAP_H2_4~`
- `~EPOCHS_MAP_H2_5~`
- `~EPOCHS_MAP_HORIZON~`
- `~EPOCHS_MAP_INTRO~`
- `~EPOCHS_MAP_KICKER~`
- `~EPOCHS_MAP_MAP_NOTE~`
- `~EPOCHS_MAP_ORIGIN~`
- `~EPOCHS_MAP_QUOTE_SOURCE~`
- `~EPOCHS_MAP_QUOTE~`
- `~EPOCHS_MAP_STATE_LABEL~`
- `~EPOCHS_MAP_TITLE~`
- `~EPOCHS_MAP_TO_LABEL~`
- `~EPOCHS_MAP_TO_NOTE~`
- `~ERROR_DESCRIPTION~`
- `~ERROR_TITLE~`
- `~FEED_DESCRIPTION~`
- `~FEED_LABEL~`
- `~HOME_DESCRIPTION~`
- `~HOME_H1_A~`
- `~HOME_H1_B~`
- `~HOME_LEDE~`
- `~HOME_TITLE~`
- `~IMPACT_LENS_BODY_1~`
- `~IMPACT_LENS_BODY_2~`
- `~IMPACT_LENS_BODY_3~`
- `~IMPACT_LENS_BODY_4~`
- `~IMPACT_LENS_BODY_5~`
- `~IMPACT_LENS_BODY_6~`
- `~IMPACT_LENS_CLOSING_LABEL~`
- `~IMPACT_LENS_CLOSING~`
- `~IMPACT_LENS_COVER_ALT~`
- `~IMPACT_LENS_COVER_CAPTION~`
- `~IMPACT_LENS_DECK~`
- `~IMPACT_LENS_EFFECT_1~`
- `~IMPACT_LENS_EFFECT_2~`
- `~IMPACT_LENS_EFFECT_3~`
- `~IMPACT_LENS_FAQ_A_1~`
- `~IMPACT_LENS_FAQ_HEADING~`
- `~IMPACT_LENS_FAQ_Q_1~`
- `~IMPACT_LENS_FOCUS~`
- `~IMPACT_LENS_FROM_LABEL~`
- `~IMPACT_LENS_FROM_NOTE~`
- `~IMPACT_LENS_H2_1~`
- `~IMPACT_LENS_H2_2~`
- `~IMPACT_LENS_H2_3~`
- `~IMPACT_LENS_H2_4~`
- `~IMPACT_LENS_H2_5~`
- `~IMPACT_LENS_H2_6~`
- `~IMPACT_LENS_INTRO~`
- `~IMPACT_LENS_KICKER~`
- `~IMPACT_LENS_OUTSIDE_SCOPE~`
- `~IMPACT_LENS_QUOTE_SOURCE~`
- `~IMPACT_LENS_QUOTE~`
- `~IMPACT_LENS_STATE_LABEL~`
- `~IMPACT_LENS_TITLE~`
- `~IMPACT_LENS_TO_LABEL~`
- `~IMPACT_LENS_TO_NOTE~`
- `~INSTANTS_DESCRIPTION~`
- `~INSTANTS_NOTE~`
- `~INTERVAL_UNION_DESCRIPTION~`
- `~INTERVAL_UNION_USE_CASE~`
- `~INVITE_CODE~`
- `~LANG~`
- `~LEGAL_ALIAS_DESCRIPTION~`
- `~LEGAL_ALIAS_TITLE~`
- `~MODIFIED_DATE~`
- `~PRIVACY_BODY_1~`
- `~PRIVACY_BODY_2~`
- `~PRIVACY_BODY_3~`
- `~PRIVACY_BODY_4~`
- `~PRIVACY_DESCRIPTION~`
- `~PRIVACY_H2_1~`
- `~PRIVACY_H2_2~`
- `~PRIVACY_H2_3~`
- `~PRIVACY_H2_4~`
- `~PRIVACY_INTRO~`
- `~PRIVACY_TITLE~`
- `~PROVENANCE_DESCRIPTION~`
- `~PROVENANCE_NOTE~`
- `~PUBLISHED_DATE~`
- `~REVISION_TRAIL_BODY_1~`
- `~REVISION_TRAIL_BODY_2~`
- `~REVISION_TRAIL_BODY_3~`
- `~REVISION_TRAIL_CLOSING_LABEL~`
- `~REVISION_TRAIL_CLOSING~`
- `~REVISION_TRAIL_COVER_ALT~`
- `~REVISION_TRAIL_COVER_CAPTION~`
- `~REVISION_TRAIL_DECK~`
- `~REVISION_TRAIL_FAQ_A_1~`
- `~REVISION_TRAIL_FAQ_A_2~`
- `~REVISION_TRAIL_FAQ_A_3~`
- `~REVISION_TRAIL_FAQ_HEADING~`
- `~REVISION_TRAIL_FAQ_Q_1~`
- `~REVISION_TRAIL_FAQ_Q_2~`
- `~REVISION_TRAIL_FAQ_Q_3~`
- `~REVISION_TRAIL_FROM_LABEL~`
- `~REVISION_TRAIL_FROM_NOTE~`
- `~REVISION_TRAIL_H2_1~`
- `~REVISION_TRAIL_H2_2~`
- `~REVISION_TRAIL_H2_3~`
- `~REVISION_TRAIL_INTRO~`
- `~REVISION_TRAIL_KICKER~`
- `~REVISION_TRAIL_QUOTE_SOURCE~`
- `~REVISION_TRAIL_QUOTE~`
- `~REVISION_TRAIL_REFERENCE_1~`
- `~REVISION_TRAIL_REFERENCE_2~`
- `~REVISION_TRAIL_REFERENCE_3~`
- `~REVISION_TRAIL_REVISION_1~`
- `~REVISION_TRAIL_REVISION_2~`
- `~REVISION_TRAIL_REVISION_3~`
- `~REVISION_TRAIL_STATE_LABEL~`
- `~REVISION_TRAIL_TITLE~`
- `~REVISION_TRAIL_TO_LABEL~`
- `~REVISION_TRAIL_TO_NOTE~`
- `~REVISION_TRAIL_VERSION_1~`
- `~REVISION_TRAIL_VERSION_2~`
- `~REVISION_TRAIL_VERSION_3~`
- `~SCOPE_PANEL_BODY_1~`
- `~SCOPE_PANEL_BODY_2~`
- `~SCOPE_PANEL_BODY_3~`
- `~SCOPE_PANEL_CLOSING_LABEL~`
- `~SCOPE_PANEL_CLOSING~`
- `~SCOPE_PANEL_CONDITION_1~`
- `~SCOPE_PANEL_CONDITION_2~`
- `~SCOPE_PANEL_CONDITION_3~`
- `~SCOPE_PANEL_COVER_ALT~`
- `~SCOPE_PANEL_COVER_CAPTION~`
- `~SCOPE_PANEL_DECK~`
- `~SCOPE_PANEL_FAQ_A_1~`
- `~SCOPE_PANEL_FAQ_A_2~`
- `~SCOPE_PANEL_FAQ_HEADING~`
- `~SCOPE_PANEL_FAQ_Q_1~`
- `~SCOPE_PANEL_FAQ_Q_2~`
- `~SCOPE_PANEL_FROM_LABEL~`
- `~SCOPE_PANEL_FROM_NOTE~`
- `~SCOPE_PANEL_H2_1~`
- `~SCOPE_PANEL_H2_2~`
- `~SCOPE_PANEL_H2_3~`
- `~SCOPE_PANEL_INTRO~`
- `~SCOPE_PANEL_KICKER~`
- `~SCOPE_PANEL_QUOTE_SOURCE~`
- `~SCOPE_PANEL_QUOTE~`
- `~SCOPE_PANEL_SCOPE_1~`
- `~SCOPE_PANEL_SCOPE_2~`
- `~SCOPE_PANEL_SCOPE_3~`
- `~SCOPE_PANEL_STATE_LABEL~`
- `~SCOPE_PANEL_TITLE~`
- `~SCOPE_PANEL_TO_LABEL~`
- `~SCOPE_PANEL_TO_NOTE~`
- `~SECURITY_EMAIL~`
- `~SECURITY_EXPIRES~`
- `~SEQUENCE_GAPS_DESCRIPTION~`
- `~SEQUENCE_GAPS_USE_CASE~`
- `~SITE_DOMAIN~`
- `~SITE_NAME~`
- `~SOURCE_CONSTELLATION_BODY_1~`
- `~SOURCE_CONSTELLATION_BODY_2~`
- `~SOURCE_CONSTELLATION_BODY_3~`
- `~SOURCE_CONSTELLATION_BODY_4~`
- `~SOURCE_CONSTELLATION_CLOSING_LABEL~`
- `~SOURCE_CONSTELLATION_CLOSING~`
- `~SOURCE_CONSTELLATION_COVER_ALT~`
- `~SOURCE_CONSTELLATION_COVER_CAPTION~`
- `~SOURCE_CONSTELLATION_DECK~`
- `~SOURCE_CONSTELLATION_FAQ_A_1~`
- `~SOURCE_CONSTELLATION_FAQ_HEADING~`
- `~SOURCE_CONSTELLATION_FAQ_Q_1~`
- `~SOURCE_CONSTELLATION_FROM_LABEL~`
- `~SOURCE_CONSTELLATION_FROM_NOTE~`
- `~SOURCE_CONSTELLATION_H2_1~`
- `~SOURCE_CONSTELLATION_H2_2~`
- `~SOURCE_CONSTELLATION_H2_3~`
- `~SOURCE_CONSTELLATION_H2_4~`
- `~SOURCE_CONSTELLATION_INTRO~`
- `~SOURCE_CONSTELLATION_KICKER~`
- `~SOURCE_CONSTELLATION_QUOTE_SOURCE~`
- `~SOURCE_CONSTELLATION_QUOTE~`
- `~SOURCE_CONSTELLATION_SOURCE_1~`
- `~SOURCE_CONSTELLATION_SOURCE_2~`
- `~SOURCE_CONSTELLATION_SOURCE_3~`
- `~SOURCE_CONSTELLATION_SOURCE_4~`
- `~SOURCE_CONSTELLATION_STATE_LABEL~`
- `~SOURCE_CONSTELLATION_TITLE~`
- `~SOURCE_CONSTELLATION_TO_LABEL~`
- `~SOURCE_CONSTELLATION_TO_NOTE~`
- `~SOURCE_CONSTELLATION_TRACE_1~`
- `~SOURCE_CONSTELLATION_TRACE_2~`
- `~SOURCE_CONSTELLATION_TRACE_3~`
- `~SOURCE_CONSTELLATION_TRACE_4~`
- `~SPANS_DESCRIPTION~`
- `~SPANS_NOTE~`
- `~TERM_ORBIT_BODY_1~`
- `~TERM_ORBIT_BODY_2~`
- `~TERM_ORBIT_BODY_3~`
- `~TERM_ORBIT_CLOSING_LABEL~`
- `~TERM_ORBIT_CLOSING~`
- `~TERM_ORBIT_COVER_ALT~`
- `~TERM_ORBIT_COVER_CAPTION~`
- `~TERM_ORBIT_DECK~`
- `~TERM_ORBIT_FAQ_A_1~`
- `~TERM_ORBIT_FAQ_HEADING~`
- `~TERM_ORBIT_FAQ_Q_1~`
- `~TERM_ORBIT_FROM_LABEL~`
- `~TERM_ORBIT_FROM_NOTE~`
- `~TERM_ORBIT_H2_1~`
- `~TERM_ORBIT_H2_2~`
- `~TERM_ORBIT_H2_3~`
- `~TERM_ORBIT_INTRO~`
- `~TERM_ORBIT_KICKER~`
- `~TERM_ORBIT_MEANING_1~`
- `~TERM_ORBIT_MEANING_2~`
- `~TERM_ORBIT_MEANING_3~`
- `~TERM_ORBIT_QUOTE_SOURCE~`
- `~TERM_ORBIT_QUOTE~`
- `~TERM_ORBIT_STATE_LABEL~`
- `~TERM_ORBIT_TERM_1~`
- `~TERM_ORBIT_TERM_2~`
- `~TERM_ORBIT_TERM_3~`
- `~TERM_ORBIT_TITLE~`
- `~TERM_ORBIT_TO_LABEL~`
- `~TERM_ORBIT_TO_NOTE~`
- `~TIMELINE_POSITION_DESCRIPTION~`
- `~TIMELINE_POSITION_USE_CASE~`
- `~TIME_MARK_ACCURACY_LABEL~`
- `~TIME_MARK_ACCURACY_NOTE~`
- `~TIME_MARK_BODY_1~`
- `~TIME_MARK_BODY_2~`
- `~TIME_MARK_BODY_3~`
- `~TIME_MARK_BODY_4~`
- `~TIME_MARK_BODY_5~`
- `~TIME_MARK_CLOSING_LABEL~`
- `~TIME_MARK_CLOSING~`
- `~TIME_MARK_COVER_ALT~`
- `~TIME_MARK_COVER_CAPTION~`
- `~TIME_MARK_DECK~`
- `~TIME_MARK_FROM_LABEL~`
- `~TIME_MARK_FROM_NOTE~`
- `~TIME_MARK_H2_1~`
- `~TIME_MARK_H2_2~`
- `~TIME_MARK_H2_3~`
- `~TIME_MARK_H2_4~`
- `~TIME_MARK_H2_5~`
- `~TIME_MARK_INTRO~`
- `~TIME_MARK_KICKER~`
- `~TIME_MARK_QUOTE_SOURCE~`
- `~TIME_MARK_QUOTE~`
- `~TIME_MARK_STAMP~`
- `~TIME_MARK_STATE_LABEL~`
- `~TIME_MARK_TIMEZONE_LABEL~`
- `~TIME_MARK_TIMEZONE_NOTE~`
- `~TIME_MARK_TITLE~`
- `~TIME_MARK_TO_LABEL~`
- `~TIME_MARK_TO_NOTE~`
- `~TOOLS_HEADING~`
- `~TOOLS_INTRO~`
- `~TOOL_ALIAS_DESCRIPTION~`
- `~TOOL_ALIAS_TITLE~`
- `~TRACE_CAPTION~`
- `~TRACE_HEADING~`
- `~TRACE_LABEL_1~`
- `~TRACE_LABEL_2~`
- `~TRACE_LABEL_3~`
- `~TRACE_LABEL_4~`
- `~TRACE_LEDE~`
- `~TRACE_NOTE_1~`
- `~TRACE_NOTE_2~`
- `~TRACE_NOTE_3~`
- `~TRACE_NOTE_4~`
- `~TRACE_REFERENCE_1~`
- `~TRACE_REFERENCE_2~`
- `~TRACE_REFERENCE_3~`
- `~TRACE_REFERENCE_4~`
- `~UTC_OFFSET_DESCRIPTION~`
- `~UTC_OFFSET_USE_CASE~`
- `~VERIFICATION_GRID_BODY_1~`
- `~VERIFICATION_GRID_BODY_2~`
- `~VERIFICATION_GRID_BODY_3~`
- `~VERIFICATION_GRID_BODY_4~`
- `~VERIFICATION_GRID_BODY_5~`
- `~VERIFICATION_GRID_CHECK_1~`
- `~VERIFICATION_GRID_CHECK_2~`
- `~VERIFICATION_GRID_CHECK_3~`
- `~VERIFICATION_GRID_CLOSING_LABEL~`
- `~VERIFICATION_GRID_CLOSING~`
- `~VERIFICATION_GRID_COLUMN_A~`
- `~VERIFICATION_GRID_COLUMN_B~`
- `~VERIFICATION_GRID_COLUMN_C~`
- `~VERIFICATION_GRID_COVER_ALT~`
- `~VERIFICATION_GRID_COVER_CAPTION~`
- `~VERIFICATION_GRID_DECK~`
- `~VERIFICATION_GRID_EVIDENCE_1~`
- `~VERIFICATION_GRID_EVIDENCE_2~`
- `~VERIFICATION_GRID_EVIDENCE_3~`
- `~VERIFICATION_GRID_FROM_LABEL~`
- `~VERIFICATION_GRID_FROM_NOTE~`
- `~VERIFICATION_GRID_H2_1~`
- `~VERIFICATION_GRID_H2_2~`
- `~VERIFICATION_GRID_H2_3~`
- `~VERIFICATION_GRID_H2_4~`
- `~VERIFICATION_GRID_H2_5~`
- `~VERIFICATION_GRID_INTRO~`
- `~VERIFICATION_GRID_KICKER~`
- `~VERIFICATION_GRID_LIMIT_1~`
- `~VERIFICATION_GRID_LIMIT_2~`
- `~VERIFICATION_GRID_LIMIT_3~`
- `~VERIFICATION_GRID_QUOTE_SOURCE~`
- `~VERIFICATION_GRID_QUOTE~`
- `~VERIFICATION_GRID_STATE_LABEL~`
- `~VERIFICATION_GRID_TABLE_CAPTION~`
- `~VERIFICATION_GRID_TITLE~`
- `~VERIFICATION_GRID_TO_LABEL~`
- `~VERIFICATION_GRID_TO_NOTE~`
- `~VERIFIED_DATE~`
- `~VERSION_ORDER_DESCRIPTION~`
- `~VERSION_ORDER_USE_CASE~`
- `~WORDMARK~`
- `~WORKBENCH_DESCRIPTION~`
- `~WORKBENCH_TITLE~`
