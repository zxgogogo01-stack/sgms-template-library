# 048-tacked-tidings

## 完整网站 UI 模板

深绿布告墙、暖纸页、橙色钉头与黄纸条构成独立视觉系统。30 个可索引页面、独立 404、三个兼容入口；12 个内容外壳、3 类纸轨、5 个本地工具、7 个治理页面与完整发布资源。原示例活动和金融事实均已移除。

## 文字接入规则

- 后续 AI 仅填写站点变量与经核实的正文，不需要重建 UI、页面体系、工具算法或图像资产。保留 tt48 类名、data 钩子、表单 name 和页内 id。
- 内容外壳含三种开场、十二种独立模块、不同章节/FAQ 数量、目录、引用、作者区、收尾和相关内容。所有文章均有独立 WebP 展示封面与 PNG 社交图。
- registrationGuide 仅为检查器兼容字段，对应通用推广 UI 槽位，不代表注册教程选题或正文要求。唯一静态推广链接保留 rel 四件套、新窗口和相邻披露。
- 工具为日期间隔、场次排程、最大余数整数分配、同长任务并行批次和 LCS 逐行文本比对；全部在本地运行，不发送输入。填写工具说明文字时保持与实现边界一致。
- HTML/XML 文本与属性需实体转义，JSON-LD 需 JSON 字符串编码；不要直接拼接含引号或标签的输入。日期采用 ISO 格式，联系方式与链接由站主提供。
- 首屏标题按两段填写；替换品牌、标题、邀请码、利益点和脚注后，复跑 360px/390px 首屏与长文本测试。

## workflow-ready-v2

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "bulletins.html",
  "articles": [
    "notices/pin-map.html",
    "notices/change-strip.html",
    "notices/evidence-card.html",
    "notices/deadline-sheet.html",
    "notices/capacity-note.html",
    "notices/handover-path.html",
    "notices/exception-window.html",
    "notices/agenda-fold.html",
    "notices/revision-pair.html",
    "notices/source-register.html",
    "notices/field-glossary.html",
    "notices/access-stub.html"
  ],
  "cornerstones": [
    "notices/pin-map.html",
    "notices/change-strip.html"
  ],
  "registrationGuide": "notices/access-stub.html",
  "articleCovers": {
    "notices/pin-map.html": {
      "display": "assets/covers/pin-map.webp",
      "og": "assets/covers/pin-map.png"
    },
    "notices/change-strip.html": {
      "display": "assets/covers/change-strip.webp",
      "og": "assets/covers/change-strip.png"
    },
    "notices/evidence-card.html": {
      "display": "assets/covers/evidence-card.webp",
      "og": "assets/covers/evidence-card.png"
    },
    "notices/deadline-sheet.html": {
      "display": "assets/covers/deadline-sheet.webp",
      "og": "assets/covers/deadline-sheet.png"
    },
    "notices/capacity-note.html": {
      "display": "assets/covers/capacity-note.webp",
      "og": "assets/covers/capacity-note.png"
    },
    "notices/handover-path.html": {
      "display": "assets/covers/handover-path.webp",
      "og": "assets/covers/handover-path.png"
    },
    "notices/exception-window.html": {
      "display": "assets/covers/exception-window.webp",
      "og": "assets/covers/exception-window.png"
    },
    "notices/agenda-fold.html": {
      "display": "assets/covers/agenda-fold.webp",
      "og": "assets/covers/agenda-fold.png"
    },
    "notices/revision-pair.html": {
      "display": "assets/covers/revision-pair.webp",
      "og": "assets/covers/revision-pair.png"
    },
    "notices/source-register.html": {
      "display": "assets/covers/source-register.webp",
      "og": "assets/covers/source-register.png"
    },
    "notices/field-glossary.html": {
      "display": "assets/covers/field-glossary.webp",
      "og": "assets/covers/field-glossary.png"
    },
    "notices/access-stub.html": {
      "display": "assets/covers/access-stub.webp",
      "og": "assets/covers/access-stub.png"
    }
  },
  "categories": [
    {
      "path": "rails/time-notes.html",
      "label": "时间便签",
      "articles": [
        "notices/pin-map.html",
        "notices/change-strip.html",
        "notices/evidence-card.html",
        "notices/deadline-sheet.html"
      ]
    },
    {
      "path": "rails/shared-pins.html",
      "label": "协作钉位",
      "articles": [
        "notices/capacity-note.html",
        "notices/handover-path.html",
        "notices/exception-window.html",
        "notices/agenda-fold.html"
      ]
    },
    {
      "path": "rails/archive-clips.html",
      "label": "存档纸夹",
      "articles": [
        "notices/revision-pair.html",
        "notices/source-register.html",
        "notices/field-glossary.html",
        "notices/access-stub.html"
      ]
    }
  ],
  "toolIndex": "desk.html",
  "tools": [
    "desk/date-span.html",
    "desk/session-planner.html",
    "desk/capacity-split.html",
    "desk/parallel-batches.html",
    "desk/notice-diff.html"
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
  "socialImage": "assets/board-social.png",
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

## 占位符 (529)

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
- `~ACCESS_STUB_BODY_1~`
- `~ACCESS_STUB_BODY_2~`
- `~ACCESS_STUB_BODY_3~`
- `~ACCESS_STUB_BODY_4~`
- `~ACCESS_STUB_BODY_5~`
- `~ACCESS_STUB_CLOSING_LABEL~`
- `~ACCESS_STUB_CLOSING~`
- `~ACCESS_STUB_COVER_ALT~`
- `~ACCESS_STUB_COVER_CAPTION~`
- `~ACCESS_STUB_DECK~`
- `~ACCESS_STUB_FAQ_A_1~`
- `~ACCESS_STUB_FAQ_A_2~`
- `~ACCESS_STUB_FAQ_A_3~`
- `~ACCESS_STUB_FAQ_HEADING~`
- `~ACCESS_STUB_FAQ_Q_1~`
- `~ACCESS_STUB_FAQ_Q_2~`
- `~ACCESS_STUB_FAQ_Q_3~`
- `~ACCESS_STUB_H2_1~`
- `~ACCESS_STUB_H2_2~`
- `~ACCESS_STUB_H2_3~`
- `~ACCESS_STUB_H2_4~`
- `~ACCESS_STUB_H2_5~`
- `~ACCESS_STUB_INTRO~`
- `~ACCESS_STUB_KICKER~`
- `~ACCESS_STUB_QUOTE_SOURCE~`
- `~ACCESS_STUB_QUOTE~`
- `~ACCESS_STUB_SLOT_DESCRIPTION~`
- `~ACCESS_STUB_SLOT_TITLE~`
- `~ACCESS_STUB_STATUS_LABEL~`
- `~ACCESS_STUB_TITLE~`
- `~AFFILIATE_DISCLOSURE~`
- `~AFFILIATE_LABEL~`
- `~AFFILIATE_URL~`
- `~AGENDA_FOLD_AGENDA_1~`
- `~AGENDA_FOLD_AGENDA_2~`
- `~AGENDA_FOLD_AGENDA_3~`
- `~AGENDA_FOLD_BODY_1~`
- `~AGENDA_FOLD_BODY_2~`
- `~AGENDA_FOLD_BODY_3~`
- `~AGENDA_FOLD_BODY_4~`
- `~AGENDA_FOLD_CLOSING_LABEL~`
- `~AGENDA_FOLD_CLOSING~`
- `~AGENDA_FOLD_CONTEXT_1~`
- `~AGENDA_FOLD_CONTEXT_2~`
- `~AGENDA_FOLD_CONTEXT_3~`
- `~AGENDA_FOLD_COVER_ALT~`
- `~AGENDA_FOLD_COVER_CAPTION~`
- `~AGENDA_FOLD_DECK~`
- `~AGENDA_FOLD_FAQ_A_1~`
- `~AGENDA_FOLD_FAQ_HEADING~`
- `~AGENDA_FOLD_FAQ_Q_1~`
- `~AGENDA_FOLD_H2_1~`
- `~AGENDA_FOLD_H2_2~`
- `~AGENDA_FOLD_H2_3~`
- `~AGENDA_FOLD_H2_4~`
- `~AGENDA_FOLD_INTRO~`
- `~AGENDA_FOLD_KICKER~`
- `~AGENDA_FOLD_QUOTE_SOURCE~`
- `~AGENDA_FOLD_QUOTE~`
- `~AGENDA_FOLD_STATUS_LABEL~`
- `~AGENDA_FOLD_TIME_1~`
- `~AGENDA_FOLD_TIME_2~`
- `~AGENDA_FOLD_TIME_3~`
- `~AGENDA_FOLD_TITLE~`
- `~ARCHIVE_CLIPS_DESCRIPTION~`
- `~ARTICLE_ALIAS_DESCRIPTION~`
- `~ARTICLE_ALIAS_TITLE~`
- `~AUTHOR_BIO~`
- `~AUTHOR_NAME~`
- `~BENEFIT_DISCLAIMER~`
- `~BENEFIT_LABEL~`
- `~BENEFIT_RATE~`
- `~BOARD_HEADING~`
- `~BOARD_INTRO~`
- `~BULLETINS_DESCRIPTION~`
- `~BULLETINS_TITLE~`
- `~CAPACITY_NOTE_BODY_1~`
- `~CAPACITY_NOTE_BODY_2~`
- `~CAPACITY_NOTE_BODY_3~`
- `~CAPACITY_NOTE_BODY_4~`
- `~CAPACITY_NOTE_BOUNDARY_1~`
- `~CAPACITY_NOTE_BOUNDARY_2~`
- `~CAPACITY_NOTE_BOUNDARY_3~`
- `~CAPACITY_NOTE_CLOSING_LABEL~`
- `~CAPACITY_NOTE_CLOSING~`
- `~CAPACITY_NOTE_COLUMN_A~`
- `~CAPACITY_NOTE_COLUMN_B~`
- `~CAPACITY_NOTE_COLUMN_C~`
- `~CAPACITY_NOTE_COVER_ALT~`
- `~CAPACITY_NOTE_COVER_CAPTION~`
- `~CAPACITY_NOTE_DECK~`
- `~CAPACITY_NOTE_H2_1~`
- `~CAPACITY_NOTE_H2_2~`
- `~CAPACITY_NOTE_H2_3~`
- `~CAPACITY_NOTE_H2_4~`
- `~CAPACITY_NOTE_INTRO~`
- `~CAPACITY_NOTE_KICKER~`
- `~CAPACITY_NOTE_QUOTE_SOURCE~`
- `~CAPACITY_NOTE_QUOTE~`
- `~CAPACITY_NOTE_ROW_1~`
- `~CAPACITY_NOTE_ROW_2~`
- `~CAPACITY_NOTE_ROW_3~`
- `~CAPACITY_NOTE_STATUS_LABEL~`
- `~CAPACITY_NOTE_TABLE_CAPTION~`
- `~CAPACITY_NOTE_TITLE~`
- `~CAPACITY_NOTE_VALUE_1~`
- `~CAPACITY_NOTE_VALUE_2~`
- `~CAPACITY_NOTE_VALUE_3~`
- `~CAPACITY_SPLIT_DESCRIPTION~`
- `~CAPACITY_SPLIT_GUIDE_1~`
- `~CAPACITY_SPLIT_GUIDE_2~`
- `~CAPACITY_SPLIT_GUIDE_3~`
- `~CAPACITY_SPLIT_GUIDE_4~`
- `~CAPACITY_SPLIT_GUIDE_5~`
- `~CAPACITY_SPLIT_USE_CASE~`
- `~CHANGE_STRIP_BODY_1~`
- `~CHANGE_STRIP_BODY_2~`
- `~CHANGE_STRIP_BODY_3~`
- `~CHANGE_STRIP_BODY_4~`
- `~CHANGE_STRIP_BODY_5~`
- `~CHANGE_STRIP_BODY_6~`
- `~CHANGE_STRIP_CHANGE_1~`
- `~CHANGE_STRIP_CHANGE_2~`
- `~CHANGE_STRIP_CHANGE_3~`
- `~CHANGE_STRIP_CLOSING_LABEL~`
- `~CHANGE_STRIP_CLOSING~`
- `~CHANGE_STRIP_COVER_ALT~`
- `~CHANGE_STRIP_COVER_CAPTION~`
- `~CHANGE_STRIP_DECK~`
- `~CHANGE_STRIP_H2_1~`
- `~CHANGE_STRIP_H2_2~`
- `~CHANGE_STRIP_H2_3~`
- `~CHANGE_STRIP_H2_4~`
- `~CHANGE_STRIP_H2_5~`
- `~CHANGE_STRIP_H2_6~`
- `~CHANGE_STRIP_INTRO~`
- `~CHANGE_STRIP_KICKER~`
- `~CHANGE_STRIP_MARK_1~`
- `~CHANGE_STRIP_MARK_2~`
- `~CHANGE_STRIP_MARK_3~`
- `~CHANGE_STRIP_NOTE_1~`
- `~CHANGE_STRIP_NOTE_2~`
- `~CHANGE_STRIP_NOTE_3~`
- `~CHANGE_STRIP_QUOTE_SOURCE~`
- `~CHANGE_STRIP_QUOTE~`
- `~CHANGE_STRIP_STATUS_LABEL~`
- `~CHANGE_STRIP_TITLE~`
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
- `~DATE_SPAN_DESCRIPTION~`
- `~DATE_SPAN_GUIDE_1~`
- `~DATE_SPAN_GUIDE_2~`
- `~DATE_SPAN_GUIDE_3~`
- `~DATE_SPAN_GUIDE_4~`
- `~DATE_SPAN_GUIDE_5~`
- `~DATE_SPAN_USE_CASE~`
- `~DEADLINE_SHEET_BODY_1~`
- `~DEADLINE_SHEET_BODY_2~`
- `~DEADLINE_SHEET_BODY_3~`
- `~DEADLINE_SHEET_BODY_4~`
- `~DEADLINE_SHEET_BODY_5~`
- `~DEADLINE_SHEET_CLOSING_LABEL~`
- `~DEADLINE_SHEET_CLOSING~`
- `~DEADLINE_SHEET_COVER_ALT~`
- `~DEADLINE_SHEET_COVER_CAPTION~`
- `~DEADLINE_SHEET_DECK~`
- `~DEADLINE_SHEET_END_LABEL~`
- `~DEADLINE_SHEET_END_NOTE~`
- `~DEADLINE_SHEET_FAQ_A_1~`
- `~DEADLINE_SHEET_FAQ_A_2~`
- `~DEADLINE_SHEET_FAQ_A_3~`
- `~DEADLINE_SHEET_FAQ_HEADING~`
- `~DEADLINE_SHEET_FAQ_Q_1~`
- `~DEADLINE_SHEET_FAQ_Q_2~`
- `~DEADLINE_SHEET_FAQ_Q_3~`
- `~DEADLINE_SHEET_H2_1~`
- `~DEADLINE_SHEET_H2_2~`
- `~DEADLINE_SHEET_H2_3~`
- `~DEADLINE_SHEET_H2_4~`
- `~DEADLINE_SHEET_H2_5~`
- `~DEADLINE_SHEET_INTRO~`
- `~DEADLINE_SHEET_KICKER~`
- `~DEADLINE_SHEET_QUOTE_SOURCE~`
- `~DEADLINE_SHEET_QUOTE~`
- `~DEADLINE_SHEET_READING_NOTE~`
- `~DEADLINE_SHEET_START_LABEL~`
- `~DEADLINE_SHEET_START_NOTE~`
- `~DEADLINE_SHEET_STATUS_LABEL~`
- `~DEADLINE_SHEET_TITLE~`
- `~DEADLINE_SHEET_WINDOW~`
- `~DESK_DESCRIPTION~`
- `~DESK_HEADING~`
- `~DESK_INTRO~`
- `~DESK_NOTE~`
- `~DESK_TITLE~`
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
- `~EDITION_LABEL~`
- `~EDITION_NOTE~`
- `~EDITION_NO~`
- `~EDITION_THREAD~`
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
- `~ERROR_DESCRIPTION~`
- `~ERROR_TITLE~`
- `~EVIDENCE_CARD_BODY_1~`
- `~EVIDENCE_CARD_BODY_2~`
- `~EVIDENCE_CARD_BODY_3~`
- `~EVIDENCE_CARD_CLAIM_1~`
- `~EVIDENCE_CARD_CLAIM_2~`
- `~EVIDENCE_CARD_CLAIM_3~`
- `~EVIDENCE_CARD_CLOSING_LABEL~`
- `~EVIDENCE_CARD_CLOSING~`
- `~EVIDENCE_CARD_COVER_ALT~`
- `~EVIDENCE_CARD_COVER_CAPTION~`
- `~EVIDENCE_CARD_DECK~`
- `~EVIDENCE_CARD_EVIDENCE_1~`
- `~EVIDENCE_CARD_EVIDENCE_2~`
- `~EVIDENCE_CARD_EVIDENCE_3~`
- `~EVIDENCE_CARD_FAQ_A_1~`
- `~EVIDENCE_CARD_FAQ_A_2~`
- `~EVIDENCE_CARD_FAQ_HEADING~`
- `~EVIDENCE_CARD_FAQ_Q_1~`
- `~EVIDENCE_CARD_FAQ_Q_2~`
- `~EVIDENCE_CARD_H2_1~`
- `~EVIDENCE_CARD_H2_2~`
- `~EVIDENCE_CARD_H2_3~`
- `~EVIDENCE_CARD_INTRO~`
- `~EVIDENCE_CARD_KICKER~`
- `~EVIDENCE_CARD_QUOTE_SOURCE~`
- `~EVIDENCE_CARD_QUOTE~`
- `~EVIDENCE_CARD_STATUS_LABEL~`
- `~EVIDENCE_CARD_TITLE~`
- `~EXCEPTION_WINDOW_BODY_1~`
- `~EXCEPTION_WINDOW_BODY_2~`
- `~EXCEPTION_WINDOW_BODY_3~`
- `~EXCEPTION_WINDOW_BODY_4~`
- `~EXCEPTION_WINDOW_BODY_5~`
- `~EXCEPTION_WINDOW_BODY_6~`
- `~EXCEPTION_WINDOW_CLOSING_LABEL~`
- `~EXCEPTION_WINDOW_CLOSING~`
- `~EXCEPTION_WINDOW_COVER_ALT~`
- `~EXCEPTION_WINDOW_COVER_CAPTION~`
- `~EXCEPTION_WINDOW_DECK~`
- `~EXCEPTION_WINDOW_DEFAULT~`
- `~EXCEPTION_WINDOW_EXCEPTION_LABEL~`
- `~EXCEPTION_WINDOW_EXCEPTION~`
- `~EXCEPTION_WINDOW_FAQ_A_1~`
- `~EXCEPTION_WINDOW_FAQ_A_2~`
- `~EXCEPTION_WINDOW_FAQ_HEADING~`
- `~EXCEPTION_WINDOW_FAQ_Q_1~`
- `~EXCEPTION_WINDOW_FAQ_Q_2~`
- `~EXCEPTION_WINDOW_H2_1~`
- `~EXCEPTION_WINDOW_H2_2~`
- `~EXCEPTION_WINDOW_H2_3~`
- `~EXCEPTION_WINDOW_H2_4~`
- `~EXCEPTION_WINDOW_H2_5~`
- `~EXCEPTION_WINDOW_H2_6~`
- `~EXCEPTION_WINDOW_INTRO~`
- `~EXCEPTION_WINDOW_KICKER~`
- `~EXCEPTION_WINDOW_LIMIT~`
- `~EXCEPTION_WINDOW_QUOTE_SOURCE~`
- `~EXCEPTION_WINDOW_QUOTE~`
- `~EXCEPTION_WINDOW_STATUS_LABEL~`
- `~EXCEPTION_WINDOW_TITLE~`
- `~FEED_DESCRIPTION~`
- `~FEED_LABEL~`
- `~FIELD_GLOSSARY_BODY_1~`
- `~FIELD_GLOSSARY_BODY_2~`
- `~FIELD_GLOSSARY_BODY_3~`
- `~FIELD_GLOSSARY_BODY_4~`
- `~FIELD_GLOSSARY_CLOSING_LABEL~`
- `~FIELD_GLOSSARY_CLOSING~`
- `~FIELD_GLOSSARY_COVER_ALT~`
- `~FIELD_GLOSSARY_COVER_CAPTION~`
- `~FIELD_GLOSSARY_DECK~`
- `~FIELD_GLOSSARY_FAQ_A_1~`
- `~FIELD_GLOSSARY_FAQ_HEADING~`
- `~FIELD_GLOSSARY_FAQ_Q_1~`
- `~FIELD_GLOSSARY_H2_1~`
- `~FIELD_GLOSSARY_H2_2~`
- `~FIELD_GLOSSARY_H2_3~`
- `~FIELD_GLOSSARY_H2_4~`
- `~FIELD_GLOSSARY_INTRO~`
- `~FIELD_GLOSSARY_KICKER~`
- `~FIELD_GLOSSARY_MEANING_1~`
- `~FIELD_GLOSSARY_MEANING_2~`
- `~FIELD_GLOSSARY_MEANING_3~`
- `~FIELD_GLOSSARY_QUOTE_SOURCE~`
- `~FIELD_GLOSSARY_QUOTE~`
- `~FIELD_GLOSSARY_STATUS_LABEL~`
- `~FIELD_GLOSSARY_TERM_1~`
- `~FIELD_GLOSSARY_TERM_2~`
- `~FIELD_GLOSSARY_TERM_3~`
- `~FIELD_GLOSSARY_TITLE~`
- `~HANDOVER_PATH_BODY_1~`
- `~HANDOVER_PATH_BODY_2~`
- `~HANDOVER_PATH_BODY_3~`
- `~HANDOVER_PATH_CLOSING_LABEL~`
- `~HANDOVER_PATH_CLOSING~`
- `~HANDOVER_PATH_COVER_ALT~`
- `~HANDOVER_PATH_COVER_CAPTION~`
- `~HANDOVER_PATH_DECK~`
- `~HANDOVER_PATH_FAQ_A_1~`
- `~HANDOVER_PATH_FAQ_HEADING~`
- `~HANDOVER_PATH_FAQ_Q_1~`
- `~HANDOVER_PATH_H2_1~`
- `~HANDOVER_PATH_H2_2~`
- `~HANDOVER_PATH_H2_3~`
- `~HANDOVER_PATH_HANDOFF_1~`
- `~HANDOVER_PATH_HANDOFF_2~`
- `~HANDOVER_PATH_HANDOFF_3~`
- `~HANDOVER_PATH_HANDOFF_4~`
- `~HANDOVER_PATH_INPUT_1~`
- `~HANDOVER_PATH_INPUT_2~`
- `~HANDOVER_PATH_INPUT_3~`
- `~HANDOVER_PATH_INPUT_4~`
- `~HANDOVER_PATH_INTRO~`
- `~HANDOVER_PATH_KICKER~`
- `~HANDOVER_PATH_QUOTE_SOURCE~`
- `~HANDOVER_PATH_QUOTE~`
- `~HANDOVER_PATH_STATUS_LABEL~`
- `~HANDOVER_PATH_TITLE~`
- `~HOME_DESCRIPTION~`
- `~HOME_H1_A~`
- `~HOME_H1_B~`
- `~HOME_LEDE~`
- `~HOME_TITLE~`
- `~INVITE_CODE~`
- `~LANG~`
- `~LEDGER_CAPTION~`
- `~LEDGER_DISCLOSURE_BODY~`
- `~LEDGER_DISCLOSURE_TITLE~`
- `~LEDGER_HEADING~`
- `~LEDGER_NOTE~`
- `~LEGAL_ALIAS_DESCRIPTION~`
- `~LEGAL_ALIAS_TITLE~`
- `~MODIFIED_DATE~`
- `~NOTICE_DIFF_DESCRIPTION~`
- `~NOTICE_DIFF_GUIDE_1~`
- `~NOTICE_DIFF_GUIDE_2~`
- `~NOTICE_DIFF_GUIDE_3~`
- `~NOTICE_DIFF_GUIDE_4~`
- `~NOTICE_DIFF_GUIDE_5~`
- `~NOTICE_DIFF_USE_CASE~`
- `~PARALLEL_BATCHES_DESCRIPTION~`
- `~PARALLEL_BATCHES_GUIDE_1~`
- `~PARALLEL_BATCHES_GUIDE_2~`
- `~PARALLEL_BATCHES_GUIDE_3~`
- `~PARALLEL_BATCHES_GUIDE_4~`
- `~PARALLEL_BATCHES_GUIDE_5~`
- `~PARALLEL_BATCHES_USE_CASE~`
- `~PIN_MAP_BODY_1~`
- `~PIN_MAP_BODY_2~`
- `~PIN_MAP_BODY_3~`
- `~PIN_MAP_BODY_4~`
- `~PIN_MAP_CENTRE~`
- `~PIN_MAP_CLOSING_LABEL~`
- `~PIN_MAP_CLOSING~`
- `~PIN_MAP_CONTEXT~`
- `~PIN_MAP_COVER_ALT~`
- `~PIN_MAP_COVER_CAPTION~`
- `~PIN_MAP_DECK~`
- `~PIN_MAP_FAQ_A_1~`
- `~PIN_MAP_FAQ_HEADING~`
- `~PIN_MAP_FAQ_Q_1~`
- `~PIN_MAP_H2_1~`
- `~PIN_MAP_H2_2~`
- `~PIN_MAP_H2_3~`
- `~PIN_MAP_H2_4~`
- `~PIN_MAP_INTRO~`
- `~PIN_MAP_KICKER~`
- `~PIN_MAP_LEFT_PIN~`
- `~PIN_MAP_QUOTE_SOURCE~`
- `~PIN_MAP_QUOTE~`
- `~PIN_MAP_READING_NOTE~`
- `~PIN_MAP_RIGHT_PIN~`
- `~PIN_MAP_STATUS_LABEL~`
- `~PIN_MAP_TITLE~`
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
- `~PUBLISHED_DATE~`
- `~REVISION_PAIR_AFTER_LABEL~`
- `~REVISION_PAIR_AFTER~`
- `~REVISION_PAIR_BEFORE_LABEL~`
- `~REVISION_PAIR_BEFORE~`
- `~REVISION_PAIR_BODY_1~`
- `~REVISION_PAIR_BODY_2~`
- `~REVISION_PAIR_BODY_3~`
- `~REVISION_PAIR_BODY_4~`
- `~REVISION_PAIR_BODY_5~`
- `~REVISION_PAIR_CLOSING_LABEL~`
- `~REVISION_PAIR_CLOSING~`
- `~REVISION_PAIR_COVER_ALT~`
- `~REVISION_PAIR_COVER_CAPTION~`
- `~REVISION_PAIR_DECK~`
- `~REVISION_PAIR_H2_1~`
- `~REVISION_PAIR_H2_2~`
- `~REVISION_PAIR_H2_3~`
- `~REVISION_PAIR_H2_4~`
- `~REVISION_PAIR_H2_5~`
- `~REVISION_PAIR_INTRO~`
- `~REVISION_PAIR_KICKER~`
- `~REVISION_PAIR_QUOTE_SOURCE~`
- `~REVISION_PAIR_QUOTE~`
- `~REVISION_PAIR_READING_NOTE~`
- `~REVISION_PAIR_REASON~`
- `~REVISION_PAIR_STATUS_LABEL~`
- `~REVISION_PAIR_TITLE~`
- `~SECURITY_EMAIL~`
- `~SECURITY_EXPIRES~`
- `~SESSION_PLANNER_DESCRIPTION~`
- `~SESSION_PLANNER_GUIDE_1~`
- `~SESSION_PLANNER_GUIDE_2~`
- `~SESSION_PLANNER_GUIDE_3~`
- `~SESSION_PLANNER_GUIDE_4~`
- `~SESSION_PLANNER_GUIDE_5~`
- `~SESSION_PLANNER_USE_CASE~`
- `~SHARED_PINS_DESCRIPTION~`
- `~SITE_DOMAIN~`
- `~SITE_NAME~`
- `~SOURCE_REGISTER_BODY_1~`
- `~SOURCE_REGISTER_BODY_2~`
- `~SOURCE_REGISTER_BODY_3~`
- `~SOURCE_REGISTER_CLOSING_LABEL~`
- `~SOURCE_REGISTER_CLOSING~`
- `~SOURCE_REGISTER_COVER_ALT~`
- `~SOURCE_REGISTER_COVER_CAPTION~`
- `~SOURCE_REGISTER_DECK~`
- `~SOURCE_REGISTER_FAQ_A_1~`
- `~SOURCE_REGISTER_FAQ_A_2~`
- `~SOURCE_REGISTER_FAQ_HEADING~`
- `~SOURCE_REGISTER_FAQ_Q_1~`
- `~SOURCE_REGISTER_FAQ_Q_2~`
- `~SOURCE_REGISTER_H2_1~`
- `~SOURCE_REGISTER_H2_2~`
- `~SOURCE_REGISTER_H2_3~`
- `~SOURCE_REGISTER_INTRO~`
- `~SOURCE_REGISTER_KICKER~`
- `~SOURCE_REGISTER_QUOTE_SOURCE~`
- `~SOURCE_REGISTER_QUOTE~`
- `~SOURCE_REGISTER_SCOPE_1~`
- `~SOURCE_REGISTER_SCOPE_2~`
- `~SOURCE_REGISTER_SCOPE_3~`
- `~SOURCE_REGISTER_SOURCE_1~`
- `~SOURCE_REGISTER_SOURCE_2~`
- `~SOURCE_REGISTER_SOURCE_3~`
- `~SOURCE_REGISTER_STATUS_LABEL~`
- `~SOURCE_REGISTER_TITLE~`
- `~SOURCE_REGISTER_VERIFIED_1~`
- `~SOURCE_REGISTER_VERIFIED_2~`
- `~SOURCE_REGISTER_VERIFIED_3~`
- `~TIME_NOTES_DESCRIPTION~`
- `~TOOL_ALIAS_DESCRIPTION~`
- `~TOOL_ALIAS_TITLE~`
- `~VERIFIED_DATE~`
- `~WORDMARK~`
