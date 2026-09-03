# 050-stacked-stanza

## 完整框架

翡翠底色、旧纸叠页、黄铜页签、页边批注与独立排版公式构成书笺界面。包含 30 个可索引页面、404 与三个兼容入口、十二种书笺模块、三种文章开场、三册分类、五件本地工具和七页合规框架。

## 下游 AI 内容接入边界

- 只填写站点变量和经核实的文字，不重建布局、组件、工具或视觉资产。保留 sz50 类名、data 属性、表单 name 和页内锚点。
- 内容页已提供目录、封面、引用、表格、批注、FAQ、作者、收尾与相关页。章节和 FAQ 数量随内容结构变化。
- registrationGuide 仅为旧检查器兼容字段，实际对应通用推广组件外壳，不是撰写注册教程的任务。唯一链接为静态 href，保留四个 rel 值、新窗口和紧邻披露。
- 五工具分别采用骑马订页序、等宽分栏、混合文本时长、最小平方空白断行与稳定分层拓扑排序；完整说明和输入边界已写入工具页面。输入不上传、不持久化。
- 首屏标题分两段填写；更换标题、品牌、利益说明和代码后复验 360px/390px。工具计算不依赖任何真实站点或交易所事实。
- HTML/XML 字符串需要实体转义，JSON-LD 使用 JSON 字符串编码；日期采用 ISO 格式。可见标题、摘要与元数据保持一致。
- 所有公开业务事实、作者经历、政策和法律正文留给下游查证填写；不把示例页面当作可直接发布的事实文章。

## workflow-ready-v2

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "leaves.html",
  "articles": [
    "leaves/fold-map.html",
    "leaves/reading-measure.html",
    "leaves/paper-dialogue.html",
    "leaves/term-cards.html",
    "leaves/annotation-path.html",
    "leaves/page-grid.html",
    "leaves/sequence-fold.html",
    "leaves/source-leaf.html",
    "leaves/margin-notes.html",
    "leaves/revision-slip.html",
    "leaves/reading-return.html",
    "leaves/access-leaf.html"
  ],
  "cornerstones": [
    "leaves/fold-map.html",
    "leaves/reading-measure.html"
  ],
  "registrationGuide": "leaves/access-leaf.html",
  "articleCovers": {
    "leaves/fold-map.html": {
      "display": "assets/covers/fold-map.webp",
      "og": "assets/covers/fold-map.png"
    },
    "leaves/reading-measure.html": {
      "display": "assets/covers/reading-measure.webp",
      "og": "assets/covers/reading-measure.png"
    },
    "leaves/paper-dialogue.html": {
      "display": "assets/covers/paper-dialogue.webp",
      "og": "assets/covers/paper-dialogue.png"
    },
    "leaves/term-cards.html": {
      "display": "assets/covers/term-cards.webp",
      "og": "assets/covers/term-cards.png"
    },
    "leaves/annotation-path.html": {
      "display": "assets/covers/annotation-path.webp",
      "og": "assets/covers/annotation-path.png"
    },
    "leaves/page-grid.html": {
      "display": "assets/covers/page-grid.webp",
      "og": "assets/covers/page-grid.png"
    },
    "leaves/sequence-fold.html": {
      "display": "assets/covers/sequence-fold.webp",
      "og": "assets/covers/sequence-fold.png"
    },
    "leaves/source-leaf.html": {
      "display": "assets/covers/source-leaf.webp",
      "og": "assets/covers/source-leaf.png"
    },
    "leaves/margin-notes.html": {
      "display": "assets/covers/margin-notes.webp",
      "og": "assets/covers/margin-notes.png"
    },
    "leaves/revision-slip.html": {
      "display": "assets/covers/revision-slip.webp",
      "og": "assets/covers/revision-slip.png"
    },
    "leaves/reading-return.html": {
      "display": "assets/covers/reading-return.webp",
      "og": "assets/covers/reading-return.png"
    },
    "leaves/access-leaf.html": {
      "display": "assets/covers/access-leaf.webp",
      "og": "assets/covers/access-leaf.png"
    }
  },
  "categories": [
    {
      "path": "shelves/first-fold.html",
      "label": "首折探索",
      "articles": [
        "leaves/fold-map.html",
        "leaves/reading-measure.html",
        "leaves/paper-dialogue.html",
        "leaves/term-cards.html"
      ]
    },
    {
      "path": "shelves/middle-leaves.html",
      "label": "内页展开",
      "articles": [
        "leaves/annotation-path.html",
        "leaves/page-grid.html",
        "leaves/sequence-fold.html",
        "leaves/source-leaf.html"
      ]
    },
    {
      "path": "shelves/closing-tabs.html",
      "label": "尾签回看",
      "articles": [
        "leaves/margin-notes.html",
        "leaves/revision-slip.html",
        "leaves/reading-return.html",
        "leaves/access-leaf.html"
      ]
    }
  ],
  "toolIndex": "desk.html",
  "tools": [
    "desk/signature-planner.html",
    "desk/column-fit.html",
    "desk/reading-pace.html",
    "desk/balanced-lines.html",
    "desk/dependency-order.html"
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
  "socialImage": "assets/stanza-social.png",
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

## 占位符（532）

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
- `~ACCESS_LEAF_ACCESS_NOTE~`
- `~ACCESS_LEAF_ACCESS_TITLE~`
- `~ACCESS_LEAF_BODY_1~`
- `~ACCESS_LEAF_BODY_2~`
- `~ACCESS_LEAF_BODY_3~`
- `~ACCESS_LEAF_BODY_4~`
- `~ACCESS_LEAF_COVER_ALT~`
- `~ACCESS_LEAF_COVER_CAPTION~`
- `~ACCESS_LEAF_DECK~`
- `~ACCESS_LEAF_ENDING_LABEL~`
- `~ACCESS_LEAF_ENDING_NOTE~`
- `~ACCESS_LEAF_FAQ_A_1~`
- `~ACCESS_LEAF_FAQ_A_2~`
- `~ACCESS_LEAF_FAQ_HEADING~`
- `~ACCESS_LEAF_FAQ_Q_1~`
- `~ACCESS_LEAF_FAQ_Q_2~`
- `~ACCESS_LEAF_H2_1~`
- `~ACCESS_LEAF_H2_2~`
- `~ACCESS_LEAF_H2_3~`
- `~ACCESS_LEAF_H2_4~`
- `~ACCESS_LEAF_INTRO~`
- `~ACCESS_LEAF_KICKER~`
- `~ACCESS_LEAF_MARGIN_LABEL~`
- `~ACCESS_LEAF_MARGIN_NOTE~`
- `~ACCESS_LEAF_QUOTE_SOURCE~`
- `~ACCESS_LEAF_QUOTE~`
- `~ACCESS_LEAF_READING_NOTE~`
- `~ACCESS_LEAF_TITLE~`
- `~AFFILIATE_DISCLOSURE~`
- `~AFFILIATE_LABEL~`
- `~AFFILIATE_URL~`
- `~ANNOTATION_PATH_ANNOTATION_1~`
- `~ANNOTATION_PATH_ANNOTATION_2~`
- `~ANNOTATION_PATH_ANNOTATION_3~`
- `~ANNOTATION_PATH_BODY_1~`
- `~ANNOTATION_PATH_BODY_2~`
- `~ANNOTATION_PATH_BODY_3~`
- `~ANNOTATION_PATH_BODY_4~`
- `~ANNOTATION_PATH_CONTEXT_1~`
- `~ANNOTATION_PATH_CONTEXT_2~`
- `~ANNOTATION_PATH_CONTEXT_3~`
- `~ANNOTATION_PATH_COVER_ALT~`
- `~ANNOTATION_PATH_COVER_CAPTION~`
- `~ANNOTATION_PATH_DECK~`
- `~ANNOTATION_PATH_ENDING_LABEL~`
- `~ANNOTATION_PATH_ENDING_NOTE~`
- `~ANNOTATION_PATH_FAQ_A_1~`
- `~ANNOTATION_PATH_FAQ_A_2~`
- `~ANNOTATION_PATH_FAQ_HEADING~`
- `~ANNOTATION_PATH_FAQ_Q_1~`
- `~ANNOTATION_PATH_FAQ_Q_2~`
- `~ANNOTATION_PATH_H2_1~`
- `~ANNOTATION_PATH_H2_2~`
- `~ANNOTATION_PATH_H2_3~`
- `~ANNOTATION_PATH_H2_4~`
- `~ANNOTATION_PATH_INTRO~`
- `~ANNOTATION_PATH_KICKER~`
- `~ANNOTATION_PATH_MARGIN_LABEL~`
- `~ANNOTATION_PATH_MARGIN_NOTE~`
- `~ANNOTATION_PATH_MARK_1~`
- `~ANNOTATION_PATH_MARK_2~`
- `~ANNOTATION_PATH_MARK_3~`
- `~ANNOTATION_PATH_QUOTE_SOURCE~`
- `~ANNOTATION_PATH_QUOTE~`
- `~ANNOTATION_PATH_READING_NOTE~`
- `~ANNOTATION_PATH_TITLE~`
- `~ARTICLE_ALIAS_DESCRIPTION~`
- `~ARTICLE_ALIAS_TITLE~`
- `~AUTHOR_BIO~`
- `~AUTHOR_NAME~`
- `~BALANCED_LINES_DESCRIPTION~`
- `~BALANCED_LINES_USE_CASE~`
- `~BENEFIT_DISCLAIMER~`
- `~BENEFIT_LABEL~`
- `~BENEFIT_RATE~`
- `~CLOSING_TABS_DESCRIPTION~`
- `~CLOSING_TABS_SIDE_NOTE~`
- `~CLOSING_TABS_TEASER~`
- `~COLUMN_FIT_DESCRIPTION~`
- `~COLUMN_FIT_USE_CASE~`
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
- `~DEPENDENCY_ORDER_DESCRIPTION~`
- `~DEPENDENCY_ORDER_USE_CASE~`
- `~DESK_DESCRIPTION~`
- `~DESK_HEADING~`
- `~DESK_INTRO~`
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
- `~EDITOR_NOTE~`
- `~EDITOR_QUOTE_SOURCE~`
- `~EDITOR_QUOTE~`
- `~ERROR_DESCRIPTION~`
- `~ERROR_TITLE~`
- `~FEED_DESCRIPTION~`
- `~FEED_LABEL~`
- `~FIRST_FOLD_DESCRIPTION~`
- `~FIRST_FOLD_SIDE_NOTE~`
- `~FIRST_FOLD_TEASER~`
- `~FOLD_MAP_BODY_1~`
- `~FOLD_MAP_BODY_2~`
- `~FOLD_MAP_BODY_3~`
- `~FOLD_MAP_BODY_4~`
- `~FOLD_MAP_BODY_5~`
- `~FOLD_MAP_COVER_ALT~`
- `~FOLD_MAP_COVER_CAPTION~`
- `~FOLD_MAP_DECK~`
- `~FOLD_MAP_ENDING_LABEL~`
- `~FOLD_MAP_ENDING_NOTE~`
- `~FOLD_MAP_FAQ_A_1~`
- `~FOLD_MAP_FAQ_HEADING~`
- `~FOLD_MAP_FAQ_Q_1~`
- `~FOLD_MAP_FOLD_1~`
- `~FOLD_MAP_FOLD_2~`
- `~FOLD_MAP_FOLD_3~`
- `~FOLD_MAP_FOLD_CAPTION~`
- `~FOLD_MAP_FOLD_NOTE_1~`
- `~FOLD_MAP_FOLD_NOTE_2~`
- `~FOLD_MAP_FOLD_NOTE_3~`
- `~FOLD_MAP_H2_1~`
- `~FOLD_MAP_H2_2~`
- `~FOLD_MAP_H2_3~`
- `~FOLD_MAP_H2_4~`
- `~FOLD_MAP_H2_5~`
- `~FOLD_MAP_INTRO~`
- `~FOLD_MAP_KICKER~`
- `~FOLD_MAP_MARGIN_LABEL~`
- `~FOLD_MAP_MARGIN_NOTE~`
- `~FOLD_MAP_QUOTE_SOURCE~`
- `~FOLD_MAP_QUOTE~`
- `~FOLD_MAP_READING_NOTE~`
- `~FOLD_MAP_TITLE~`
- `~HOME_DESCRIPTION~`
- `~HOME_H1_A~`
- `~HOME_H1_B~`
- `~HOME_LEDE~`
- `~HOME_TITLE~`
- `~INVITE_CODE~`
- `~LANG~`
- `~LEAVES_DESCRIPTION~`
- `~LEAVES_HEADING~`
- `~LEAVES_INTRO~`
- `~LEAVES_TITLE~`
- `~LEGAL_ALIAS_DESCRIPTION~`
- `~LEGAL_ALIAS_TITLE~`
- `~MARGIN_NOTES_BODY_1~`
- `~MARGIN_NOTES_BODY_2~`
- `~MARGIN_NOTES_BODY_3~`
- `~MARGIN_NOTES_BODY_4~`
- `~MARGIN_NOTES_BODY_5~`
- `~MARGIN_NOTES_BODY_6~`
- `~MARGIN_NOTES_COVER_ALT~`
- `~MARGIN_NOTES_COVER_CAPTION~`
- `~MARGIN_NOTES_DECK~`
- `~MARGIN_NOTES_ENDING_LABEL~`
- `~MARGIN_NOTES_ENDING_NOTE~`
- `~MARGIN_NOTES_H2_1~`
- `~MARGIN_NOTES_H2_2~`
- `~MARGIN_NOTES_H2_3~`
- `~MARGIN_NOTES_H2_4~`
- `~MARGIN_NOTES_H2_5~`
- `~MARGIN_NOTES_H2_6~`
- `~MARGIN_NOTES_INTRO~`
- `~MARGIN_NOTES_KICKER~`
- `~MARGIN_NOTES_MAIN_NOTE~`
- `~MARGIN_NOTES_MARGIN_CONTEXT~`
- `~MARGIN_NOTES_MARGIN_LABEL~`
- `~MARGIN_NOTES_MARGIN_NOTE~`
- `~MARGIN_NOTES_MARGIN_TEXT~`
- `~MARGIN_NOTES_MARGIN_TITLE~`
- `~MARGIN_NOTES_QUOTE_SOURCE~`
- `~MARGIN_NOTES_QUOTE~`
- `~MARGIN_NOTES_READING_NOTE~`
- `~MARGIN_NOTES_TITLE~`
- `~MIDDLE_LEAVES_DESCRIPTION~`
- `~MIDDLE_LEAVES_SIDE_NOTE~`
- `~MIDDLE_LEAVES_TEASER~`
- `~MODIFIED_DATE~`
- `~PAGE_GRID_BODY_1~`
- `~PAGE_GRID_BODY_2~`
- `~PAGE_GRID_BODY_3~`
- `~PAGE_GRID_BODY_4~`
- `~PAGE_GRID_BODY_5~`
- `~PAGE_GRID_COL_A~`
- `~PAGE_GRID_COL_B~`
- `~PAGE_GRID_COL_C~`
- `~PAGE_GRID_CONSTRAINT_1~`
- `~PAGE_GRID_CONSTRAINT_2~`
- `~PAGE_GRID_CONSTRAINT_3~`
- `~PAGE_GRID_COVER_ALT~`
- `~PAGE_GRID_COVER_CAPTION~`
- `~PAGE_GRID_DECK~`
- `~PAGE_GRID_ENDING_LABEL~`
- `~PAGE_GRID_ENDING_NOTE~`
- `~PAGE_GRID_GRID_TITLE~`
- `~PAGE_GRID_H2_1~`
- `~PAGE_GRID_H2_2~`
- `~PAGE_GRID_H2_3~`
- `~PAGE_GRID_H2_4~`
- `~PAGE_GRID_H2_5~`
- `~PAGE_GRID_INTRO~`
- `~PAGE_GRID_KICKER~`
- `~PAGE_GRID_MARGIN_LABEL~`
- `~PAGE_GRID_MARGIN_NOTE~`
- `~PAGE_GRID_OPTION_1~`
- `~PAGE_GRID_OPTION_2~`
- `~PAGE_GRID_OPTION_3~`
- `~PAGE_GRID_QUOTE_SOURCE~`
- `~PAGE_GRID_QUOTE~`
- `~PAGE_GRID_READING_NOTE~`
- `~PAGE_GRID_ROW_1~`
- `~PAGE_GRID_ROW_2~`
- `~PAGE_GRID_ROW_3~`
- `~PAGE_GRID_TITLE~`
- `~PAPER_DIALOGUE_BODY_1~`
- `~PAPER_DIALOGUE_BODY_2~`
- `~PAPER_DIALOGUE_BODY_3~`
- `~PAPER_DIALOGUE_COVER_ALT~`
- `~PAPER_DIALOGUE_COVER_CAPTION~`
- `~PAPER_DIALOGUE_DECK~`
- `~PAPER_DIALOGUE_ENDING_LABEL~`
- `~PAPER_DIALOGUE_ENDING_NOTE~`
- `~PAPER_DIALOGUE_FAQ_A_1~`
- `~PAPER_DIALOGUE_FAQ_A_2~`
- `~PAPER_DIALOGUE_FAQ_A_3~`
- `~PAPER_DIALOGUE_FAQ_HEADING~`
- `~PAPER_DIALOGUE_FAQ_Q_1~`
- `~PAPER_DIALOGUE_FAQ_Q_2~`
- `~PAPER_DIALOGUE_FAQ_Q_3~`
- `~PAPER_DIALOGUE_H2_1~`
- `~PAPER_DIALOGUE_H2_2~`
- `~PAPER_DIALOGUE_H2_3~`
- `~PAPER_DIALOGUE_INTRO~`
- `~PAPER_DIALOGUE_KICKER~`
- `~PAPER_DIALOGUE_MARGIN_LABEL~`
- `~PAPER_DIALOGUE_MARGIN_NOTE~`
- `~PAPER_DIALOGUE_QUOTE_SOURCE~`
- `~PAPER_DIALOGUE_QUOTE~`
- `~PAPER_DIALOGUE_READING_NOTE~`
- `~PAPER_DIALOGUE_SOURCE_1~`
- `~PAPER_DIALOGUE_SOURCE_2~`
- `~PAPER_DIALOGUE_STATEMENT_1~`
- `~PAPER_DIALOGUE_STATEMENT_2~`
- `~PAPER_DIALOGUE_TITLE~`
- `~PAPER_DIALOGUE_VOICE_1~`
- `~PAPER_DIALOGUE_VOICE_2~`
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
- `~READING_MEASURE_BODY_1~`
- `~READING_MEASURE_BODY_2~`
- `~READING_MEASURE_BODY_3~`
- `~READING_MEASURE_BODY_4~`
- `~READING_MEASURE_COVER_ALT~`
- `~READING_MEASURE_COVER_CAPTION~`
- `~READING_MEASURE_DECK~`
- `~READING_MEASURE_ENDING_LABEL~`
- `~READING_MEASURE_ENDING_NOTE~`
- `~READING_MEASURE_H2_1~`
- `~READING_MEASURE_H2_2~`
- `~READING_MEASURE_H2_3~`
- `~READING_MEASURE_H2_4~`
- `~READING_MEASURE_HIGH_LABEL~`
- `~READING_MEASURE_HIGH_NOTE~`
- `~READING_MEASURE_INTRO~`
- `~READING_MEASURE_KICKER~`
- `~READING_MEASURE_LOW_LABEL~`
- `~READING_MEASURE_LOW_NOTE~`
- `~READING_MEASURE_MARGIN_LABEL~`
- `~READING_MEASURE_MARGIN_NOTE~`
- `~READING_MEASURE_MEASURE_NOTE~`
- `~READING_MEASURE_MEASURE_TITLE~`
- `~READING_MEASURE_QUOTE_SOURCE~`
- `~READING_MEASURE_QUOTE~`
- `~READING_MEASURE_READING_NOTE~`
- `~READING_MEASURE_TITLE~`
- `~READING_PACE_DESCRIPTION~`
- `~READING_PACE_USE_CASE~`
- `~READING_RETURN_BODY_1~`
- `~READING_RETURN_BODY_2~`
- `~READING_RETURN_BODY_3~`
- `~READING_RETURN_BODY_4~`
- `~READING_RETURN_BODY_5~`
- `~READING_RETURN_COVER_ALT~`
- `~READING_RETURN_COVER_CAPTION~`
- `~READING_RETURN_DECK~`
- `~READING_RETURN_ENDING_LABEL~`
- `~READING_RETURN_ENDING_NOTE~`
- `~READING_RETURN_FAQ_A_1~`
- `~READING_RETURN_FAQ_HEADING~`
- `~READING_RETURN_FAQ_Q_1~`
- `~READING_RETURN_H2_1~`
- `~READING_RETURN_H2_2~`
- `~READING_RETURN_H2_3~`
- `~READING_RETURN_H2_4~`
- `~READING_RETURN_H2_5~`
- `~READING_RETURN_INTRO~`
- `~READING_RETURN_KICKER~`
- `~READING_RETURN_MARGIN_LABEL~`
- `~READING_RETURN_MARGIN_NOTE~`
- `~READING_RETURN_QUOTE_SOURCE~`
- `~READING_RETURN_QUOTE~`
- `~READING_RETURN_READING_NOTE~`
- `~READING_RETURN_RETURN_NOTE_1~`
- `~READING_RETURN_RETURN_NOTE_2~`
- `~READING_RETURN_RETURN_NOTE_3~`
- `~READING_RETURN_RETURN_QUESTION_1~`
- `~READING_RETURN_RETURN_QUESTION_2~`
- `~READING_RETURN_RETURN_QUESTION_3~`
- `~READING_RETURN_RETURN_TITLE~`
- `~READING_RETURN_TITLE~`
- `~REVISION_SLIP_BODY_1~`
- `~REVISION_SLIP_BODY_2~`
- `~REVISION_SLIP_BODY_3~`
- `~REVISION_SLIP_COVER_ALT~`
- `~REVISION_SLIP_COVER_CAPTION~`
- `~REVISION_SLIP_DECK~`
- `~REVISION_SLIP_ENDING_LABEL~`
- `~REVISION_SLIP_ENDING_NOTE~`
- `~REVISION_SLIP_FAQ_A_1~`
- `~REVISION_SLIP_FAQ_A_2~`
- `~REVISION_SLIP_FAQ_A_3~`
- `~REVISION_SLIP_FAQ_HEADING~`
- `~REVISION_SLIP_FAQ_Q_1~`
- `~REVISION_SLIP_FAQ_Q_2~`
- `~REVISION_SLIP_FAQ_Q_3~`
- `~REVISION_SLIP_H2_1~`
- `~REVISION_SLIP_H2_2~`
- `~REVISION_SLIP_H2_3~`
- `~REVISION_SLIP_INTRO~`
- `~REVISION_SLIP_KICKER~`
- `~REVISION_SLIP_MARGIN_LABEL~`
- `~REVISION_SLIP_MARGIN_NOTE~`
- `~REVISION_SLIP_QUOTE_SOURCE~`
- `~REVISION_SLIP_QUOTE~`
- `~REVISION_SLIP_READING_NOTE~`
- `~REVISION_SLIP_REFERENCE_1~`
- `~REVISION_SLIP_REFERENCE_2~`
- `~REVISION_SLIP_REFERENCE_3~`
- `~REVISION_SLIP_REVISION_1~`
- `~REVISION_SLIP_REVISION_2~`
- `~REVISION_SLIP_REVISION_3~`
- `~REVISION_SLIP_REVISION_TITLE~`
- `~REVISION_SLIP_TITLE~`
- `~REVISION_SLIP_VERSION_1~`
- `~REVISION_SLIP_VERSION_2~`
- `~REVISION_SLIP_VERSION_3~`
- `~SECURITY_EMAIL~`
- `~SECURITY_EXPIRES~`
- `~SEQUENCE_FOLD_BODY_1~`
- `~SEQUENCE_FOLD_BODY_2~`
- `~SEQUENCE_FOLD_BODY_3~`
- `~SEQUENCE_FOLD_COVER_ALT~`
- `~SEQUENCE_FOLD_COVER_CAPTION~`
- `~SEQUENCE_FOLD_DECK~`
- `~SEQUENCE_FOLD_ENDING_LABEL~`
- `~SEQUENCE_FOLD_ENDING_NOTE~`
- `~SEQUENCE_FOLD_FAQ_A_1~`
- `~SEQUENCE_FOLD_FAQ_HEADING~`
- `~SEQUENCE_FOLD_FAQ_Q_1~`
- `~SEQUENCE_FOLD_H2_1~`
- `~SEQUENCE_FOLD_H2_2~`
- `~SEQUENCE_FOLD_H2_3~`
- `~SEQUENCE_FOLD_INTRO~`
- `~SEQUENCE_FOLD_KICKER~`
- `~SEQUENCE_FOLD_MARGIN_LABEL~`
- `~SEQUENCE_FOLD_MARGIN_NOTE~`
- `~SEQUENCE_FOLD_QUOTE_SOURCE~`
- `~SEQUENCE_FOLD_QUOTE~`
- `~SEQUENCE_FOLD_READING_NOTE~`
- `~SEQUENCE_FOLD_STEP_1~`
- `~SEQUENCE_FOLD_STEP_2~`
- `~SEQUENCE_FOLD_STEP_3~`
- `~SEQUENCE_FOLD_STEP_4~`
- `~SEQUENCE_FOLD_STEP_NOTE_1~`
- `~SEQUENCE_FOLD_STEP_NOTE_2~`
- `~SEQUENCE_FOLD_STEP_NOTE_3~`
- `~SEQUENCE_FOLD_STEP_NOTE_4~`
- `~SEQUENCE_FOLD_TITLE~`
- `~SIGNATURE_PLANNER_DESCRIPTION~`
- `~SIGNATURE_PLANNER_USE_CASE~`
- `~SITE_DOMAIN~`
- `~SITE_NAME~`
- `~SOURCE_LEAF_BODY_1~`
- `~SOURCE_LEAF_BODY_2~`
- `~SOURCE_LEAF_BODY_3~`
- `~SOURCE_LEAF_BODY_4~`
- `~SOURCE_LEAF_COVER_ALT~`
- `~SOURCE_LEAF_COVER_CAPTION~`
- `~SOURCE_LEAF_DECK~`
- `~SOURCE_LEAF_ENDING_LABEL~`
- `~SOURCE_LEAF_ENDING_NOTE~`
- `~SOURCE_LEAF_FAQ_A_1~`
- `~SOURCE_LEAF_FAQ_A_2~`
- `~SOURCE_LEAF_FAQ_HEADING~`
- `~SOURCE_LEAF_FAQ_Q_1~`
- `~SOURCE_LEAF_FAQ_Q_2~`
- `~SOURCE_LEAF_H2_1~`
- `~SOURCE_LEAF_H2_2~`
- `~SOURCE_LEAF_H2_3~`
- `~SOURCE_LEAF_H2_4~`
- `~SOURCE_LEAF_INTRO~`
- `~SOURCE_LEAF_KICKER~`
- `~SOURCE_LEAF_LIMIT_LABEL~`
- `~SOURCE_LEAF_LIMIT_NOTE~`
- `~SOURCE_LEAF_MARGIN_LABEL~`
- `~SOURCE_LEAF_MARGIN_NOTE~`
- `~SOURCE_LEAF_PROVENANCE_LABEL~`
- `~SOURCE_LEAF_PROVENANCE_NOTE~`
- `~SOURCE_LEAF_QUOTE_SOURCE~`
- `~SOURCE_LEAF_QUOTE~`
- `~SOURCE_LEAF_READING_NOTE~`
- `~SOURCE_LEAF_SOURCE_CITATION~`
- `~SOURCE_LEAF_SOURCE_QUOTE~`
- `~SOURCE_LEAF_TITLE~`
- `~TERM_CARDS_BODY_1~`
- `~TERM_CARDS_BODY_2~`
- `~TERM_CARDS_BODY_3~`
- `~TERM_CARDS_BODY_4~`
- `~TERM_CARDS_BODY_5~`
- `~TERM_CARDS_BODY_6~`
- `~TERM_CARDS_COVER_ALT~`
- `~TERM_CARDS_COVER_CAPTION~`
- `~TERM_CARDS_DECK~`
- `~TERM_CARDS_DEFINITION_1~`
- `~TERM_CARDS_DEFINITION_2~`
- `~TERM_CARDS_DEFINITION_3~`
- `~TERM_CARDS_ENDING_LABEL~`
- `~TERM_CARDS_ENDING_NOTE~`
- `~TERM_CARDS_EXAMPLE_1~`
- `~TERM_CARDS_EXAMPLE_2~`
- `~TERM_CARDS_EXAMPLE_3~`
- `~TERM_CARDS_FAQ_A_1~`
- `~TERM_CARDS_FAQ_HEADING~`
- `~TERM_CARDS_FAQ_Q_1~`
- `~TERM_CARDS_H2_1~`
- `~TERM_CARDS_H2_2~`
- `~TERM_CARDS_H2_3~`
- `~TERM_CARDS_H2_4~`
- `~TERM_CARDS_H2_5~`
- `~TERM_CARDS_H2_6~`
- `~TERM_CARDS_INTRO~`
- `~TERM_CARDS_KICKER~`
- `~TERM_CARDS_MARGIN_LABEL~`
- `~TERM_CARDS_MARGIN_NOTE~`
- `~TERM_CARDS_QUOTE_SOURCE~`
- `~TERM_CARDS_QUOTE~`
- `~TERM_CARDS_READING_NOTE~`
- `~TERM_CARDS_TERM_1~`
- `~TERM_CARDS_TERM_2~`
- `~TERM_CARDS_TERM_3~`
- `~TERM_CARDS_TITLE~`
- `~TOOL_ALIAS_DESCRIPTION~`
- `~TOOL_ALIAS_TITLE~`
- `~VERIFIED_DATE~`
- `~WORDMARK~`
