# 063-noir-cinema · 黑色电影资料馆

## 完整框架与来源边界

保留原 style.css 全部字节、黑色电影放映机、调查长片、镜次列表、片尾索引与 nc63 命名空间；screen.css 扩展全部内页。原动态源包忠实度未核验，本地 UI 就绪不代表源包复刻已验证。

## 后续 AI 只替换文字与变量

- 十二个 S1–S12 场刊槽位、三种开场、十二种分镜组件、4/3/5 个 H2、3/4/2 个 FAQ、三种目录及收尾、三间交叉放映厅、五工具、七站务页和独立 404 均已搭好。保留路径、类名、id、data、ARIA 与字段，不需要补 UI。
- 只填写经核实文字，不编造身份、经历、来源、日期、利益或政策结论；抽象图形不是实拍或事实证据。工具固定文字说明算法边界，不是业务文章。新增或删除文章须同步目录、分区、内链、sitemap 和 RSS。
- 变量语法 %%UPPER_CASE%%。BRAND_EN 填英文或罗马字；SITE_DOMAIN 无协议或路径；SOURCE_URL 只填核实的 HTTPS 来源。HTML/XML/属性/JSON 各按上下文转义，JSON-LD 安全转义小于号。日期 ISO，DATE_LABEL 为短标签，RSS_DATE 为 RFC822，SECURITY_EXPIRES 为未来 RFC3339。
- 首屏邀请码、利益点及脚注要简短，填实后重查 360px 首屏。首页只提供真复制，不放推广直链。registrationGuide 是旧审计器角色名，仅指 external-credit.html 的通用推广 UI，不是注册教程选题。该页唯一静态推广 href 具备四项 rel 和紧邻披露。
- 默认 noir 黑场、可切换 house 亮灯；localStorage 只存主题，输入和结果不保存、不上传。无 JS 仍可阅读、导航及使用原生目录/折叠批注；筛选隐藏，提交与复制禁用。变更输入或重置清除旧结果，异步复制不会恢复失效状态。
- 五工具：沿用原连续镜次时间码算法、整数帧率非丢帧互换、毫秒字幕区间交叠/空档、BigInt 等分中点取帧、稳定首次适配降序装箱。详见每工具的完整 Guide；不读取媒体，不生成生产文件，不保证装箱最优。
- 十二张独立 SVG/PNG/WebP 封面为 1200×630，正文及预载使用对应 WebP，OG 使用独立 PNG；另有社交图、SVG/ICO、180px apple。RSS 只含第 1/3/4/5/6/7/8/9/10/11 篇摘要，无邀请码和推广。
- article.html/tool.html/legal.html 是 noindex 兼容入口，不自动跳转。服务器需将未知深层 URL 映射至 404.html 并返回真实 404；本轮不配置或部署。填实后仍需单站事实、合规和发布验收。

## workflow-ready-v2

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "screening-list.html",
  "articles": [
    "shots/lens-entry.html",
    "shots/border-mask.html",
    "shots/contact-print.html",
    "shots/evidence-reel.html",
    "shots/split-cut.html",
    "shots/voice-track.html",
    "shots/sequence-board.html",
    "shots/revision-splice.html",
    "shots/source-focus.html",
    "shots/exception-loop.html",
    "shots/review-mark.html",
    "shots/external-credit.html"
  ],
  "cornerstones": [
    "shots/lens-entry.html",
    "shots/border-mask.html"
  ],
  "registrationGuide": "shots/external-credit.html",
  "articleCovers": {
    "shots/lens-entry.html": {
      "display": "assets/covers/lens-entry.webp",
      "og": "assets/covers/lens-entry.png"
    },
    "shots/border-mask.html": {
      "display": "assets/covers/border-mask.webp",
      "og": "assets/covers/border-mask.png"
    },
    "shots/contact-print.html": {
      "display": "assets/covers/contact-print.webp",
      "og": "assets/covers/contact-print.png"
    },
    "shots/evidence-reel.html": {
      "display": "assets/covers/evidence-reel.webp",
      "og": "assets/covers/evidence-reel.png"
    },
    "shots/split-cut.html": {
      "display": "assets/covers/split-cut.webp",
      "og": "assets/covers/split-cut.png"
    },
    "shots/voice-track.html": {
      "display": "assets/covers/voice-track.webp",
      "og": "assets/covers/voice-track.png"
    },
    "shots/sequence-board.html": {
      "display": "assets/covers/sequence-board.webp",
      "og": "assets/covers/sequence-board.png"
    },
    "shots/revision-splice.html": {
      "display": "assets/covers/revision-splice.webp",
      "og": "assets/covers/revision-splice.png"
    },
    "shots/source-focus.html": {
      "display": "assets/covers/source-focus.webp",
      "og": "assets/covers/source-focus.png"
    },
    "shots/exception-loop.html": {
      "display": "assets/covers/exception-loop.webp",
      "og": "assets/covers/exception-loop.png"
    },
    "shots/review-mark.html": {
      "display": "assets/covers/review-mark.webp",
      "og": "assets/covers/review-mark.png"
    },
    "shots/external-credit.html": {
      "display": "assets/covers/external-credit.webp",
      "og": "assets/covers/external-credit.png"
    }
  },
  "categories": [
    {
      "path": "rooms/opening-room.html",
      "label": "开场放映厅",
      "articles": [
        "shots/lens-entry.html",
        "shots/evidence-reel.html",
        "shots/sequence-board.html",
        "shots/exception-loop.html"
      ]
    },
    {
      "path": "rooms/cross-cut-room.html",
      "label": "交叉剪辑室",
      "articles": [
        "shots/border-mask.html",
        "shots/split-cut.html",
        "shots/revision-splice.html",
        "shots/review-mark.html"
      ]
    },
    {
      "path": "rooms/closing-room.html",
      "label": "片尾档案室",
      "articles": [
        "shots/contact-print.html",
        "shots/voice-track.html",
        "shots/source-focus.html",
        "shots/external-credit.html"
      ]
    }
  ],
  "toolIndex": "projection-booth.html",
  "tools": [
    "booth/cue-timeline.html",
    "booth/frame-counter.html",
    "booth/subtitle-windows.html",
    "booth/contact-sampler.html",
    "booth/reel-packing.html"
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
  "socialImage": "assets/social-card.png",
  "variables": {
    "siteDomain": "%%SITE_DOMAIN%%",
    "siteName": "%%SITE_NAME%%",
    "wordmark": "%%BRAND_EN%%",
    "inviteCode": "%%INVITE_CODE%%",
    "benefitRate": "%%BENEFIT_RATE%%",
    "benefitDisclaimer": "%%BENEFIT_DISCLAIMER%%",
    "affiliateUrl": "%%AFFILIATE_URL%%"
  }
}
```

## 全部变量登记

- `%%ABOUT_CONTACT_NOTE%%`
- `%%ABOUT_DESC%%`
- `%%ABOUT_HEAD_1%%`
- `%%ABOUT_HEAD_2%%`
- `%%ABOUT_HEAD_3%%`
- `%%ABOUT_INTRO%%`
- `%%ABOUT_MODIFIED%%`
- `%%ABOUT_TEXT_1%%`
- `%%ABOUT_TEXT_2%%`
- `%%ABOUT_TEXT_3%%`
- `%%AFFILIATE_DISCLOSURE%%`
- `%%AFFILIATE_LABEL%%`
- `%%AFFILIATE_URL%%`
- `%%ARCHIVE_TITLE%%`
- `%%AUTHOR_BIO%%`
- `%%AUTHOR_NAME%%`
- `%%BENEFIT_DISCLAIMER%%`
- `%%BENEFIT_RATE%%`
- `%%BOOTH_TITLE%%`
- `%%BRAND_EN%%`
- `%%CATALOG_DESC%%`
- `%%CATALOG_INTRO%%`
- `%%CLOSING_ROOM_DESC%%`
- `%%CLOSING_ROOM_INTRO%%`
- `%%COMPAT_ARTICLE_DESC%%`
- `%%COMPAT_LEGAL_DESC%%`
- `%%COMPAT_TOOL_DESC%%`
- `%%CONTACT_CONTACT_NOTE%%`
- `%%CONTACT_DESC%%`
- `%%CONTACT_EMAIL%%`
- `%%CONTACT_HEAD_1%%`
- `%%CONTACT_HEAD_2%%`
- `%%CONTACT_HEAD_3%%`
- `%%CONTACT_INTRO%%`
- `%%CONTACT_MODIFIED%%`
- `%%CONTACT_TEXT_1%%`
- `%%CONTACT_TEXT_2%%`
- `%%CONTACT_TEXT_3%%`
- `%%CORRECTIONS_CONTACT_NOTE%%`
- `%%CORRECTIONS_DESC%%`
- `%%CORRECTIONS_HEAD_1%%`
- `%%CORRECTIONS_HEAD_2%%`
- `%%CORRECTIONS_HEAD_3%%`
- `%%CORRECTIONS_INTRO%%`
- `%%CORRECTIONS_MODIFIED%%`
- `%%CORRECTIONS_TEXT_1%%`
- `%%CORRECTIONS_TEXT_2%%`
- `%%CORRECTIONS_TEXT_3%%`
- `%%CROSS_CUT_ROOM_DESC%%`
- `%%CROSS_CUT_ROOM_INTRO%%`
- `%%CUES_INTRO%%`
- `%%CUES_TITLE%%`
- `%%DISCLAIMER_CONTACT_NOTE%%`
- `%%DISCLAIMER_DESC%%`
- `%%DISCLAIMER_HEAD_1%%`
- `%%DISCLAIMER_HEAD_2%%`
- `%%DISCLAIMER_HEAD_3%%`
- `%%DISCLAIMER_INTRO%%`
- `%%DISCLAIMER_MODIFIED%%`
- `%%DISCLAIMER_TEXT_1%%`
- `%%DISCLAIMER_TEXT_2%%`
- `%%DISCLAIMER_TEXT_3%%`
- `%%DISCLOSURE_CONTACT_NOTE%%`
- `%%DISCLOSURE_DESC%%`
- `%%DISCLOSURE_HEAD_1%%`
- `%%DISCLOSURE_HEAD_2%%`
- `%%DISCLOSURE_HEAD_3%%`
- `%%DISCLOSURE_INTRO%%`
- `%%DISCLOSURE_MODIFIED%%`
- `%%DISCLOSURE_TEXT_1%%`
- `%%DISCLOSURE_TEXT_2%%`
- `%%DISCLOSURE_TEXT_3%%`
- `%%EDITORIAL_CONTACT_NOTE%%`
- `%%EDITORIAL_DESC%%`
- `%%EDITORIAL_HEAD_1%%`
- `%%EDITORIAL_HEAD_2%%`
- `%%EDITORIAL_HEAD_3%%`
- `%%EDITORIAL_HEAD_4%%`
- `%%EDITORIAL_INTRO%%`
- `%%EDITORIAL_MODIFIED%%`
- `%%EDITORIAL_TEXT_1%%`
- `%%EDITORIAL_TEXT_2%%`
- `%%EDITORIAL_TEXT_3%%`
- `%%EDITORIAL_TEXT_4%%`
- `%%ERROR_DESC%%`
- `%%ERROR_INTRO%%`
- `%%FEATURED_LABEL%%`
- `%%FEATURED_META_LABEL_1%%`
- `%%FEATURED_META_LABEL_2%%`
- `%%FEATURED_META_LABEL_3%%`
- `%%FEATURED_META_TEXT_1%%`
- `%%FEATURED_META_TEXT_2%%`
- `%%FEATURED_META_TEXT_3%%`
- `%%HERO_DESCRIPTION%%`
- `%%HERO_EYEBROW%%`
- `%%HERO_TITLE%%`
- `%%HOME_FEATURED_LABEL%%`
- `%%HOME_LATEST_LABEL%%`
- `%%HOME_LINKS_LABEL%%`
- `%%INDEPENDENCE_NOTE%%`
- `%%INVITE_CODE%%`
- `%%INVITE_LABEL%%`
- `%%LANG%%`
- `%%OPENING_ROOM_DESC%%`
- `%%OPENING_ROOM_INTRO%%`
- `%%PRIVACY_CONTACT_NOTE%%`
- `%%PRIVACY_DESC%%`
- `%%PRIVACY_HEAD_1%%`
- `%%PRIVACY_HEAD_2%%`
- `%%PRIVACY_HEAD_3%%`
- `%%PRIVACY_INTRO%%`
- `%%PRIVACY_MODIFIED%%`
- `%%PRIVACY_TEXT_1%%`
- `%%PRIVACY_TEXT_2%%`
- `%%PRIVACY_TEXT_3%%`
- `%%PROJECTOR_CAPTION%%`
- `%%RISK_NOTE%%`
- `%%S10_CLOSING_TEXT%%`
- `%%S10_CLOSING_TITLE%%`
- `%%S10_COVER_ALT%%`
- `%%S10_COVER_CAPTION%%`
- `%%S10_DATE_LABEL%%`
- `%%S10_FAQ_A_1%%`
- `%%S10_FAQ_A_2%%`
- `%%S10_FAQ_A_3%%`
- `%%S10_FAQ_Q_1%%`
- `%%S10_FAQ_Q_2%%`
- `%%S10_FAQ_Q_3%%`
- `%%S10_H2_1%%`
- `%%S10_H2_2%%`
- `%%S10_H2_3%%`
- `%%S10_H2_4%%`
- `%%S10_INTRO%%`
- `%%S10_MODIFIED%%`
- `%%S10_MODULE_HEAD_1%%`
- `%%S10_MODULE_HEAD_2%%`
- `%%S10_MODULE_HEAD_3%%`
- `%%S10_MODULE_TEXT_1%%`
- `%%S10_MODULE_TEXT_2%%`
- `%%S10_MODULE_TEXT_3%%`
- `%%S10_PUBLISHED%%`
- `%%S10_QUOTE%%`
- `%%S10_QUOTE_SOURCE%%`
- `%%S10_RSS_DATE%%`
- `%%S10_SOURCE_CHECKED%%`
- `%%S10_SOURCE_LABEL_1%%`
- `%%S10_SOURCE_LABEL_2%%`
- `%%S10_SOURCE_NOTE_1%%`
- `%%S10_SOURCE_NOTE_2%%`
- `%%S10_SOURCE_URL_1%%`
- `%%S10_SOURCE_URL_2%%`
- `%%S10_STATUS%%`
- `%%S10_SUMMARY%%`
- `%%S10_TABLE_CAPTION%%`
- `%%S10_TABLE_CELL_1_1%%`
- `%%S10_TABLE_CELL_1_2%%`
- `%%S10_TABLE_CELL_2_1%%`
- `%%S10_TABLE_CELL_2_2%%`
- `%%S10_TABLE_CELL_3_1%%`
- `%%S10_TABLE_CELL_3_2%%`
- `%%S10_TABLE_COL_1%%`
- `%%S10_TABLE_COL_2%%`
- `%%S10_TABLE_COL_3%%`
- `%%S10_TABLE_ROW_1%%`
- `%%S10_TABLE_ROW_2%%`
- `%%S10_TABLE_ROW_3%%`
- `%%S10_TEXT_1%%`
- `%%S10_TEXT_2%%`
- `%%S10_TEXT_3%%`
- `%%S10_TEXT_4%%`
- `%%S10_TITLE%%`
- `%%S11_CLOSING_TEXT%%`
- `%%S11_CLOSING_TITLE%%`
- `%%S11_COVER_ALT%%`
- `%%S11_COVER_CAPTION%%`
- `%%S11_DATE_LABEL%%`
- `%%S11_FAQ_A_1%%`
- `%%S11_FAQ_A_2%%`
- `%%S11_FAQ_A_3%%`
- `%%S11_FAQ_A_4%%`
- `%%S11_FAQ_Q_1%%`
- `%%S11_FAQ_Q_2%%`
- `%%S11_FAQ_Q_3%%`
- `%%S11_FAQ_Q_4%%`
- `%%S11_H2_1%%`
- `%%S11_H2_2%%`
- `%%S11_H2_3%%`
- `%%S11_INTRO%%`
- `%%S11_MODIFIED%%`
- `%%S11_MODULE_HEAD_1%%`
- `%%S11_MODULE_HEAD_2%%`
- `%%S11_MODULE_HEAD_3%%`
- `%%S11_MODULE_HEAD_4%%`
- `%%S11_MODULE_TEXT_1%%`
- `%%S11_MODULE_TEXT_2%%`
- `%%S11_MODULE_TEXT_3%%`
- `%%S11_MODULE_TEXT_4%%`
- `%%S11_PUBLISHED%%`
- `%%S11_QUOTE%%`
- `%%S11_QUOTE_SOURCE%%`
- `%%S11_RSS_DATE%%`
- `%%S11_SOURCE_CHECKED%%`
- `%%S11_SOURCE_LABEL_1%%`
- `%%S11_SOURCE_LABEL_2%%`
- `%%S11_SOURCE_NOTE_1%%`
- `%%S11_SOURCE_NOTE_2%%`
- `%%S11_SOURCE_URL_1%%`
- `%%S11_SOURCE_URL_2%%`
- `%%S11_STATUS%%`
- `%%S11_SUMMARY%%`
- `%%S11_TABLE_CAPTION%%`
- `%%S11_TABLE_CELL_1_1%%`
- `%%S11_TABLE_CELL_1_2%%`
- `%%S11_TABLE_CELL_2_1%%`
- `%%S11_TABLE_CELL_2_2%%`
- `%%S11_TABLE_CELL_3_1%%`
- `%%S11_TABLE_CELL_3_2%%`
- `%%S11_TABLE_COL_1%%`
- `%%S11_TABLE_COL_2%%`
- `%%S11_TABLE_COL_3%%`
- `%%S11_TABLE_ROW_1%%`
- `%%S11_TABLE_ROW_2%%`
- `%%S11_TABLE_ROW_3%%`
- `%%S11_TEXT_1%%`
- `%%S11_TEXT_2%%`
- `%%S11_TEXT_3%%`
- `%%S11_TITLE%%`
- `%%S12_CLOSING_TEXT%%`
- `%%S12_CLOSING_TITLE%%`
- `%%S12_COVER_ALT%%`
- `%%S12_COVER_CAPTION%%`
- `%%S12_DATE_LABEL%%`
- `%%S12_EXTERNAL_TEXT%%`
- `%%S12_EXTERNAL_TITLE%%`
- `%%S12_FAQ_A_1%%`
- `%%S12_FAQ_A_2%%`
- `%%S12_FAQ_Q_1%%`
- `%%S12_FAQ_Q_2%%`
- `%%S12_H2_1%%`
- `%%S12_H2_2%%`
- `%%S12_H2_3%%`
- `%%S12_H2_4%%`
- `%%S12_H2_5%%`
- `%%S12_INTRO%%`
- `%%S12_MODIFIED%%`
- `%%S12_MODULE_HEAD_1%%`
- `%%S12_MODULE_HEAD_2%%`
- `%%S12_MODULE_TEXT_1%%`
- `%%S12_MODULE_TEXT_2%%`
- `%%S12_PUBLISHED%%`
- `%%S12_QUOTE%%`
- `%%S12_QUOTE_SOURCE%%`
- `%%S12_SOURCE_CHECKED%%`
- `%%S12_SOURCE_LABEL_1%%`
- `%%S12_SOURCE_LABEL_2%%`
- `%%S12_SOURCE_NOTE_1%%`
- `%%S12_SOURCE_NOTE_2%%`
- `%%S12_SOURCE_URL_1%%`
- `%%S12_SOURCE_URL_2%%`
- `%%S12_STATUS%%`
- `%%S12_SUMMARY%%`
- `%%S12_TABLE_CAPTION%%`
- `%%S12_TABLE_CELL_1_1%%`
- `%%S12_TABLE_CELL_1_2%%`
- `%%S12_TABLE_CELL_2_1%%`
- `%%S12_TABLE_CELL_2_2%%`
- `%%S12_TABLE_CELL_3_1%%`
- `%%S12_TABLE_CELL_3_2%%`
- `%%S12_TABLE_COL_1%%`
- `%%S12_TABLE_COL_2%%`
- `%%S12_TABLE_COL_3%%`
- `%%S12_TABLE_ROW_1%%`
- `%%S12_TABLE_ROW_2%%`
- `%%S12_TABLE_ROW_3%%`
- `%%S12_TEXT_1%%`
- `%%S12_TEXT_2%%`
- `%%S12_TEXT_3%%`
- `%%S12_TEXT_4%%`
- `%%S12_TEXT_5%%`
- `%%S12_TITLE%%`
- `%%S1_CLOSING_TEXT%%`
- `%%S1_CLOSING_TITLE%%`
- `%%S1_COVER_ALT%%`
- `%%S1_COVER_CAPTION%%`
- `%%S1_DATE_LABEL%%`
- `%%S1_FAQ_A_1%%`
- `%%S1_FAQ_A_2%%`
- `%%S1_FAQ_A_3%%`
- `%%S1_FAQ_Q_1%%`
- `%%S1_FAQ_Q_2%%`
- `%%S1_FAQ_Q_3%%`
- `%%S1_H2_1%%`
- `%%S1_H2_2%%`
- `%%S1_H2_3%%`
- `%%S1_H2_4%%`
- `%%S1_INTRO%%`
- `%%S1_MODIFIED%%`
- `%%S1_MODULE_HEAD_1%%`
- `%%S1_MODULE_HEAD_2%%`
- `%%S1_MODULE_TEXT_1%%`
- `%%S1_MODULE_TEXT_2%%`
- `%%S1_PUBLISHED%%`
- `%%S1_QUOTE%%`
- `%%S1_QUOTE_SOURCE%%`
- `%%S1_RSS_DATE%%`
- `%%S1_SOURCE_CHECKED%%`
- `%%S1_SOURCE_LABEL_1%%`
- `%%S1_SOURCE_LABEL_2%%`
- `%%S1_SOURCE_NOTE_1%%`
- `%%S1_SOURCE_NOTE_2%%`
- `%%S1_SOURCE_URL_1%%`
- `%%S1_SOURCE_URL_2%%`
- `%%S1_STATUS%%`
- `%%S1_SUMMARY%%`
- `%%S1_TABLE_CAPTION%%`
- `%%S1_TABLE_CELL_1_1%%`
- `%%S1_TABLE_CELL_1_2%%`
- `%%S1_TABLE_CELL_2_1%%`
- `%%S1_TABLE_CELL_2_2%%`
- `%%S1_TABLE_CELL_3_1%%`
- `%%S1_TABLE_CELL_3_2%%`
- `%%S1_TABLE_COL_1%%`
- `%%S1_TABLE_COL_2%%`
- `%%S1_TABLE_COL_3%%`
- `%%S1_TABLE_ROW_1%%`
- `%%S1_TABLE_ROW_2%%`
- `%%S1_TABLE_ROW_3%%`
- `%%S1_TEXT_1%%`
- `%%S1_TEXT_2%%`
- `%%S1_TEXT_3%%`
- `%%S1_TEXT_4%%`
- `%%S1_TITLE%%`
- `%%S2_CLOSING_TEXT%%`
- `%%S2_CLOSING_TITLE%%`
- `%%S2_COVER_ALT%%`
- `%%S2_COVER_CAPTION%%`
- `%%S2_DATE_LABEL%%`
- `%%S2_FAQ_A_1%%`
- `%%S2_FAQ_A_2%%`
- `%%S2_FAQ_A_3%%`
- `%%S2_FAQ_A_4%%`
- `%%S2_FAQ_Q_1%%`
- `%%S2_FAQ_Q_2%%`
- `%%S2_FAQ_Q_3%%`
- `%%S2_FAQ_Q_4%%`
- `%%S2_H2_1%%`
- `%%S2_H2_2%%`
- `%%S2_H2_3%%`
- `%%S2_INTRO%%`
- `%%S2_MODIFIED%%`
- `%%S2_MODULE_HEAD_1%%`
- `%%S2_MODULE_HEAD_2%%`
- `%%S2_MODULE_HEAD_3%%`
- `%%S2_MODULE_HEAD_4%%`
- `%%S2_MODULE_TEXT_1%%`
- `%%S2_MODULE_TEXT_2%%`
- `%%S2_MODULE_TEXT_3%%`
- `%%S2_MODULE_TEXT_4%%`
- `%%S2_PUBLISHED%%`
- `%%S2_QUOTE%%`
- `%%S2_QUOTE_SOURCE%%`
- `%%S2_SOURCE_CHECKED%%`
- `%%S2_SOURCE_LABEL_1%%`
- `%%S2_SOURCE_LABEL_2%%`
- `%%S2_SOURCE_NOTE_1%%`
- `%%S2_SOURCE_NOTE_2%%`
- `%%S2_SOURCE_URL_1%%`
- `%%S2_SOURCE_URL_2%%`
- `%%S2_STATUS%%`
- `%%S2_SUMMARY%%`
- `%%S2_TABLE_CAPTION%%`
- `%%S2_TABLE_CELL_1_1%%`
- `%%S2_TABLE_CELL_1_2%%`
- `%%S2_TABLE_CELL_2_1%%`
- `%%S2_TABLE_CELL_2_2%%`
- `%%S2_TABLE_CELL_3_1%%`
- `%%S2_TABLE_CELL_3_2%%`
- `%%S2_TABLE_COL_1%%`
- `%%S2_TABLE_COL_2%%`
- `%%S2_TABLE_COL_3%%`
- `%%S2_TABLE_ROW_1%%`
- `%%S2_TABLE_ROW_2%%`
- `%%S2_TABLE_ROW_3%%`
- `%%S2_TEXT_1%%`
- `%%S2_TEXT_2%%`
- `%%S2_TEXT_3%%`
- `%%S2_TITLE%%`
- `%%S3_CLOSING_TEXT%%`
- `%%S3_CLOSING_TITLE%%`
- `%%S3_COVER_ALT%%`
- `%%S3_COVER_CAPTION%%`
- `%%S3_DATE_LABEL%%`
- `%%S3_FAQ_A_1%%`
- `%%S3_FAQ_A_2%%`
- `%%S3_FAQ_Q_1%%`
- `%%S3_FAQ_Q_2%%`
- `%%S3_H2_1%%`
- `%%S3_H2_2%%`
- `%%S3_H2_3%%`
- `%%S3_H2_4%%`
- `%%S3_H2_5%%`
- `%%S3_INTRO%%`
- `%%S3_MODIFIED%%`
- `%%S3_MODULE_HEAD_1%%`
- `%%S3_MODULE_HEAD_2%%`
- `%%S3_MODULE_HEAD_3%%`
- `%%S3_MODULE_TEXT_1%%`
- `%%S3_MODULE_TEXT_2%%`
- `%%S3_MODULE_TEXT_3%%`
- `%%S3_PUBLISHED%%`
- `%%S3_QUOTE%%`
- `%%S3_QUOTE_SOURCE%%`
- `%%S3_RSS_DATE%%`
- `%%S3_SOURCE_CHECKED%%`
- `%%S3_SOURCE_LABEL_1%%`
- `%%S3_SOURCE_LABEL_2%%`
- `%%S3_SOURCE_NOTE_1%%`
- `%%S3_SOURCE_NOTE_2%%`
- `%%S3_SOURCE_URL_1%%`
- `%%S3_SOURCE_URL_2%%`
- `%%S3_STATUS%%`
- `%%S3_SUMMARY%%`
- `%%S3_TABLE_CAPTION%%`
- `%%S3_TABLE_CELL_1_1%%`
- `%%S3_TABLE_CELL_1_2%%`
- `%%S3_TABLE_CELL_2_1%%`
- `%%S3_TABLE_CELL_2_2%%`
- `%%S3_TABLE_CELL_3_1%%`
- `%%S3_TABLE_CELL_3_2%%`
- `%%S3_TABLE_COL_1%%`
- `%%S3_TABLE_COL_2%%`
- `%%S3_TABLE_COL_3%%`
- `%%S3_TABLE_ROW_1%%`
- `%%S3_TABLE_ROW_2%%`
- `%%S3_TABLE_ROW_3%%`
- `%%S3_TEXT_1%%`
- `%%S3_TEXT_2%%`
- `%%S3_TEXT_3%%`
- `%%S3_TEXT_4%%`
- `%%S3_TEXT_5%%`
- `%%S3_TITLE%%`
- `%%S4_CLOSING_TEXT%%`
- `%%S4_CLOSING_TITLE%%`
- `%%S4_COVER_ALT%%`
- `%%S4_COVER_CAPTION%%`
- `%%S4_DATE_LABEL%%`
- `%%S4_FAQ_A_1%%`
- `%%S4_FAQ_A_2%%`
- `%%S4_FAQ_A_3%%`
- `%%S4_FAQ_Q_1%%`
- `%%S4_FAQ_Q_2%%`
- `%%S4_FAQ_Q_3%%`
- `%%S4_H2_1%%`
- `%%S4_H2_2%%`
- `%%S4_H2_3%%`
- `%%S4_H2_4%%`
- `%%S4_INTRO%%`
- `%%S4_MODIFIED%%`
- `%%S4_MODULE_HEAD_1%%`
- `%%S4_MODULE_HEAD_2%%`
- `%%S4_MODULE_TEXT_1%%`
- `%%S4_MODULE_TEXT_2%%`
- `%%S4_PUBLISHED%%`
- `%%S4_QUOTE%%`
- `%%S4_QUOTE_SOURCE%%`
- `%%S4_RSS_DATE%%`
- `%%S4_SOURCE_CHECKED%%`
- `%%S4_SOURCE_LABEL_1%%`
- `%%S4_SOURCE_LABEL_2%%`
- `%%S4_SOURCE_NOTE_1%%`
- `%%S4_SOURCE_NOTE_2%%`
- `%%S4_SOURCE_URL_1%%`
- `%%S4_SOURCE_URL_2%%`
- `%%S4_STATUS%%`
- `%%S4_SUMMARY%%`
- `%%S4_TABLE_CAPTION%%`
- `%%S4_TABLE_CELL_1_1%%`
- `%%S4_TABLE_CELL_1_2%%`
- `%%S4_TABLE_CELL_2_1%%`
- `%%S4_TABLE_CELL_2_2%%`
- `%%S4_TABLE_CELL_3_1%%`
- `%%S4_TABLE_CELL_3_2%%`
- `%%S4_TABLE_COL_1%%`
- `%%S4_TABLE_COL_2%%`
- `%%S4_TABLE_COL_3%%`
- `%%S4_TABLE_ROW_1%%`
- `%%S4_TABLE_ROW_2%%`
- `%%S4_TABLE_ROW_3%%`
- `%%S4_TEXT_1%%`
- `%%S4_TEXT_2%%`
- `%%S4_TEXT_3%%`
- `%%S4_TEXT_4%%`
- `%%S4_TITLE%%`
- `%%S5_CLOSING_TEXT%%`
- `%%S5_CLOSING_TITLE%%`
- `%%S5_COVER_ALT%%`
- `%%S5_COVER_CAPTION%%`
- `%%S5_DATE_LABEL%%`
- `%%S5_FAQ_A_1%%`
- `%%S5_FAQ_A_2%%`
- `%%S5_FAQ_A_3%%`
- `%%S5_FAQ_A_4%%`
- `%%S5_FAQ_Q_1%%`
- `%%S5_FAQ_Q_2%%`
- `%%S5_FAQ_Q_3%%`
- `%%S5_FAQ_Q_4%%`
- `%%S5_H2_1%%`
- `%%S5_H2_2%%`
- `%%S5_H2_3%%`
- `%%S5_INTRO%%`
- `%%S5_MODIFIED%%`
- `%%S5_MODULE_HEAD_1%%`
- `%%S5_MODULE_HEAD_2%%`
- `%%S5_MODULE_TEXT_1%%`
- `%%S5_MODULE_TEXT_2%%`
- `%%S5_PUBLISHED%%`
- `%%S5_QUOTE%%`
- `%%S5_QUOTE_SOURCE%%`
- `%%S5_RSS_DATE%%`
- `%%S5_SOURCE_CHECKED%%`
- `%%S5_SOURCE_LABEL_1%%`
- `%%S5_SOURCE_LABEL_2%%`
- `%%S5_SOURCE_NOTE_1%%`
- `%%S5_SOURCE_NOTE_2%%`
- `%%S5_SOURCE_URL_1%%`
- `%%S5_SOURCE_URL_2%%`
- `%%S5_STATUS%%`
- `%%S5_SUMMARY%%`
- `%%S5_TABLE_CAPTION%%`
- `%%S5_TABLE_CELL_1_1%%`
- `%%S5_TABLE_CELL_1_2%%`
- `%%S5_TABLE_CELL_2_1%%`
- `%%S5_TABLE_CELL_2_2%%`
- `%%S5_TABLE_CELL_3_1%%`
- `%%S5_TABLE_CELL_3_2%%`
- `%%S5_TABLE_COL_1%%`
- `%%S5_TABLE_COL_2%%`
- `%%S5_TABLE_COL_3%%`
- `%%S5_TABLE_ROW_1%%`
- `%%S5_TABLE_ROW_2%%`
- `%%S5_TABLE_ROW_3%%`
- `%%S5_TEXT_1%%`
- `%%S5_TEXT_2%%`
- `%%S5_TEXT_3%%`
- `%%S5_TITLE%%`
- `%%S6_CLOSING_TEXT%%`
- `%%S6_CLOSING_TITLE%%`
- `%%S6_COVER_ALT%%`
- `%%S6_COVER_CAPTION%%`
- `%%S6_DATE_LABEL%%`
- `%%S6_FAQ_A_1%%`
- `%%S6_FAQ_A_2%%`
- `%%S6_FAQ_Q_1%%`
- `%%S6_FAQ_Q_2%%`
- `%%S6_H2_1%%`
- `%%S6_H2_2%%`
- `%%S6_H2_3%%`
- `%%S6_H2_4%%`
- `%%S6_H2_5%%`
- `%%S6_INTRO%%`
- `%%S6_MODIFIED%%`
- `%%S6_MODULE_HEAD_1%%`
- `%%S6_MODULE_HEAD_2%%`
- `%%S6_MODULE_TEXT_1%%`
- `%%S6_MODULE_TEXT_2%%`
- `%%S6_PUBLISHED%%`
- `%%S6_QUOTE%%`
- `%%S6_QUOTE_SOURCE%%`
- `%%S6_RSS_DATE%%`
- `%%S6_SOURCE_CHECKED%%`
- `%%S6_SOURCE_LABEL_1%%`
- `%%S6_SOURCE_LABEL_2%%`
- `%%S6_SOURCE_NOTE_1%%`
- `%%S6_SOURCE_NOTE_2%%`
- `%%S6_SOURCE_URL_1%%`
- `%%S6_SOURCE_URL_2%%`
- `%%S6_STATUS%%`
- `%%S6_SUMMARY%%`
- `%%S6_TABLE_CAPTION%%`
- `%%S6_TABLE_CELL_1_1%%`
- `%%S6_TABLE_CELL_1_2%%`
- `%%S6_TABLE_CELL_2_1%%`
- `%%S6_TABLE_CELL_2_2%%`
- `%%S6_TABLE_CELL_3_1%%`
- `%%S6_TABLE_CELL_3_2%%`
- `%%S6_TABLE_COL_1%%`
- `%%S6_TABLE_COL_2%%`
- `%%S6_TABLE_COL_3%%`
- `%%S6_TABLE_ROW_1%%`
- `%%S6_TABLE_ROW_2%%`
- `%%S6_TABLE_ROW_3%%`
- `%%S6_TEXT_1%%`
- `%%S6_TEXT_2%%`
- `%%S6_TEXT_3%%`
- `%%S6_TEXT_4%%`
- `%%S6_TEXT_5%%`
- `%%S6_TITLE%%`
- `%%S7_CLOSING_TEXT%%`
- `%%S7_CLOSING_TITLE%%`
- `%%S7_COVER_ALT%%`
- `%%S7_COVER_CAPTION%%`
- `%%S7_DATE_LABEL%%`
- `%%S7_FAQ_A_1%%`
- `%%S7_FAQ_A_2%%`
- `%%S7_FAQ_A_3%%`
- `%%S7_FAQ_Q_1%%`
- `%%S7_FAQ_Q_2%%`
- `%%S7_FAQ_Q_3%%`
- `%%S7_H2_1%%`
- `%%S7_H2_2%%`
- `%%S7_H2_3%%`
- `%%S7_H2_4%%`
- `%%S7_INTRO%%`
- `%%S7_MODIFIED%%`
- `%%S7_MODULE_HEAD_1%%`
- `%%S7_MODULE_HEAD_2%%`
- `%%S7_MODULE_HEAD_3%%`
- `%%S7_MODULE_HEAD_4%%`
- `%%S7_MODULE_TEXT_1%%`
- `%%S7_MODULE_TEXT_2%%`
- `%%S7_MODULE_TEXT_3%%`
- `%%S7_MODULE_TEXT_4%%`
- `%%S7_PUBLISHED%%`
- `%%S7_QUOTE%%`
- `%%S7_QUOTE_SOURCE%%`
- `%%S7_RSS_DATE%%`
- `%%S7_SOURCE_CHECKED%%`
- `%%S7_SOURCE_LABEL_1%%`
- `%%S7_SOURCE_LABEL_2%%`
- `%%S7_SOURCE_NOTE_1%%`
- `%%S7_SOURCE_NOTE_2%%`
- `%%S7_SOURCE_URL_1%%`
- `%%S7_SOURCE_URL_2%%`
- `%%S7_STATUS%%`
- `%%S7_SUMMARY%%`
- `%%S7_TABLE_CAPTION%%`
- `%%S7_TABLE_CELL_1_1%%`
- `%%S7_TABLE_CELL_1_2%%`
- `%%S7_TABLE_CELL_2_1%%`
- `%%S7_TABLE_CELL_2_2%%`
- `%%S7_TABLE_CELL_3_1%%`
- `%%S7_TABLE_CELL_3_2%%`
- `%%S7_TABLE_COL_1%%`
- `%%S7_TABLE_COL_2%%`
- `%%S7_TABLE_COL_3%%`
- `%%S7_TABLE_ROW_1%%`
- `%%S7_TABLE_ROW_2%%`
- `%%S7_TABLE_ROW_3%%`
- `%%S7_TEXT_1%%`
- `%%S7_TEXT_2%%`
- `%%S7_TEXT_3%%`
- `%%S7_TEXT_4%%`
- `%%S7_TITLE%%`
- `%%S8_CLOSING_TEXT%%`
- `%%S8_CLOSING_TITLE%%`
- `%%S8_COVER_ALT%%`
- `%%S8_COVER_CAPTION%%`
- `%%S8_DATE_LABEL%%`
- `%%S8_FAQ_A_1%%`
- `%%S8_FAQ_A_2%%`
- `%%S8_FAQ_A_3%%`
- `%%S8_FAQ_A_4%%`
- `%%S8_FAQ_Q_1%%`
- `%%S8_FAQ_Q_2%%`
- `%%S8_FAQ_Q_3%%`
- `%%S8_FAQ_Q_4%%`
- `%%S8_H2_1%%`
- `%%S8_H2_2%%`
- `%%S8_H2_3%%`
- `%%S8_INTRO%%`
- `%%S8_MODIFIED%%`
- `%%S8_MODULE_HEAD_1%%`
- `%%S8_MODULE_HEAD_2%%`
- `%%S8_MODULE_HEAD_3%%`
- `%%S8_MODULE_TEXT_1%%`
- `%%S8_MODULE_TEXT_2%%`
- `%%S8_MODULE_TEXT_3%%`
- `%%S8_PUBLISHED%%`
- `%%S8_QUOTE%%`
- `%%S8_QUOTE_SOURCE%%`
- `%%S8_RSS_DATE%%`
- `%%S8_SOURCE_CHECKED%%`
- `%%S8_SOURCE_LABEL_1%%`
- `%%S8_SOURCE_LABEL_2%%`
- `%%S8_SOURCE_NOTE_1%%`
- `%%S8_SOURCE_NOTE_2%%`
- `%%S8_SOURCE_URL_1%%`
- `%%S8_SOURCE_URL_2%%`
- `%%S8_STATUS%%`
- `%%S8_SUMMARY%%`
- `%%S8_TABLE_CAPTION%%`
- `%%S8_TABLE_CELL_1_1%%`
- `%%S8_TABLE_CELL_1_2%%`
- `%%S8_TABLE_CELL_2_1%%`
- `%%S8_TABLE_CELL_2_2%%`
- `%%S8_TABLE_CELL_3_1%%`
- `%%S8_TABLE_CELL_3_2%%`
- `%%S8_TABLE_COL_1%%`
- `%%S8_TABLE_COL_2%%`
- `%%S8_TABLE_COL_3%%`
- `%%S8_TABLE_ROW_1%%`
- `%%S8_TABLE_ROW_2%%`
- `%%S8_TABLE_ROW_3%%`
- `%%S8_TEXT_1%%`
- `%%S8_TEXT_2%%`
- `%%S8_TEXT_3%%`
- `%%S8_TITLE%%`
- `%%S9_CLOSING_TEXT%%`
- `%%S9_CLOSING_TITLE%%`
- `%%S9_COVER_ALT%%`
- `%%S9_COVER_CAPTION%%`
- `%%S9_DATE_LABEL%%`
- `%%S9_FAQ_A_1%%`
- `%%S9_FAQ_A_2%%`
- `%%S9_FAQ_Q_1%%`
- `%%S9_FAQ_Q_2%%`
- `%%S9_H2_1%%`
- `%%S9_H2_2%%`
- `%%S9_H2_3%%`
- `%%S9_H2_4%%`
- `%%S9_H2_5%%`
- `%%S9_INTRO%%`
- `%%S9_MODIFIED%%`
- `%%S9_MODULE_HEAD_1%%`
- `%%S9_MODULE_HEAD_2%%`
- `%%S9_MODULE_HEAD_3%%`
- `%%S9_MODULE_TEXT_1%%`
- `%%S9_MODULE_TEXT_2%%`
- `%%S9_MODULE_TEXT_3%%`
- `%%S9_PUBLISHED%%`
- `%%S9_QUOTE%%`
- `%%S9_QUOTE_SOURCE%%`
- `%%S9_RSS_DATE%%`
- `%%S9_SOURCE_CHECKED%%`
- `%%S9_SOURCE_LABEL_1%%`
- `%%S9_SOURCE_LABEL_2%%`
- `%%S9_SOURCE_NOTE_1%%`
- `%%S9_SOURCE_NOTE_2%%`
- `%%S9_SOURCE_URL_1%%`
- `%%S9_SOURCE_URL_2%%`
- `%%S9_STATUS%%`
- `%%S9_SUMMARY%%`
- `%%S9_TABLE_CAPTION%%`
- `%%S9_TABLE_CELL_1_1%%`
- `%%S9_TABLE_CELL_1_2%%`
- `%%S9_TABLE_CELL_2_1%%`
- `%%S9_TABLE_CELL_2_2%%`
- `%%S9_TABLE_CELL_3_1%%`
- `%%S9_TABLE_CELL_3_2%%`
- `%%S9_TABLE_COL_1%%`
- `%%S9_TABLE_COL_2%%`
- `%%S9_TABLE_COL_3%%`
- `%%S9_TABLE_ROW_1%%`
- `%%S9_TABLE_ROW_2%%`
- `%%S9_TABLE_ROW_3%%`
- `%%S9_TEXT_1%%`
- `%%S9_TEXT_2%%`
- `%%S9_TEXT_3%%`
- `%%S9_TEXT_4%%`
- `%%S9_TEXT_5%%`
- `%%S9_TITLE%%`
- `%%SECURITY_EMAIL%%`
- `%%SECURITY_EXPIRES%%`
- `%%SEO_TITLE%%`
- `%%SITE_DESC%%`
- `%%SITE_DOMAIN%%`
- `%%SITE_NAME%%`
- `%%SITE_TAGLINE%%`
- `%%TICKER_1%%`
- `%%TICKER_2%%`
- `%%TICKER_3%%`
- `%%TICKER_4%%`
- `%%TOOLS_DESC%%`
- `%%TOOLS_INTRO%%`

## 验收记录

2026-09-04 · workflow-ready v2 完整框架验收通过，仅代表模板 UI 与功能就绪。

- 84 个文件、34 个 HTML（30 个可索引页面、独立 404、3 个 noindex 兼容入口）；三项静态审计通过，本套 P0/P1/P2 均为 0。
- 原 style.css 字节不变，首页原有 14 个类名全部保留。黑色电影放映机、调查长片、镜次列表和片尾索引延续；三种阅读开场、十二分镜组件、三间交叉放映厅、七页站务和五个本地工具完整。
- 34 页 × 1440/768/390/360px × noir/house 主题，共 272 次最终渲染；594 项功能、算法与边界检查全部通过，控制台和网络错误为 0。复验脚本：`tools/qa/063-noir-cinema-browser.js`；本地证据：`artifacts/qa/063-noir-cinema-v2-2026-09-04/`。
- 连续镜次以独立整数秒累加和日期格式化复验 12 组序列、60 镜、恰好 12 小时、80 码点标题、全角和非法时长。帧时间码以独立逐级商余数拆分复验六种整数帧率的零位、跨秒/分/小时、99 小时上界、生成样本及双向映射，并覆盖 100 行、帧位越界和非规范输入；不支持小数帧率或丢帧。
- 字幕窗口以逐毫秒占用格独立核对 12 组区间的交叠长度、空档总长、空档数与相邻倒序；覆盖相接、嵌套、全角、80 个重叠窗口及完整 3160 对输出。不会把内部嵌套错误计为空档，不把相接算成交叠。
- 接触印样以 BigInt 不等式证明每个选中整数紧邻分段中点，并检查唯一性、升序和范围；覆盖 1 帧、全量取样、质数、10 亿帧、200 张及两种编号方式。分卷用另一种剩余容量循环核对 12 组精确成员顺序，覆盖同量稳定排序、60 卷/60000000 总量及错误输入；首次适配降序仍是启发式，不保证最优。
- 首屏真复制、默认黑场与主题持久化、菜单焦点和 Escape、首页/目录组合筛选、三种原生目录、原生折叠批注、唯一推广 UI 槽位与邻近披露、404 三态及深层真实 404、无 JS 阅读/导航及禁用提交、原生粘贴和 Enter/Tab、复制拒绝及异步旧结果失效、reduced-motion、阅读进度、明暗控件与对比度通过。
- 人工复核首页四宽度双主题、十二组件、三种开场、目录、五工具输入与结果、移动表格、暗色错误和社交图。首轮发现平板推荐标题链接仅 41px，补至至少 44px 后重验；随后修正侧栏目录数字折行和手机标题孤字，新增 12 项目录编号及 12 项小标题断行断言，最终完整重跑并复看修订处。未把中间轮次当作最终验收。
- 774 个公开变量已登记，34 块 JSON-LD 可解析，82 个页内锚点有效；12 张 PNG 封面互异，25 张封面/社交栅格均为 1200×630，apple 为 180px，ICO 含 16/32/48px。敏感模式、危险 API、符号链接及其他模板遗留标识扫描未发现问题；无远程计算、危险 HTML 注入或输入持久化。
- 相邻 062 的类名重合 1.0%、DOM 标签二元组 49.2%、CSS 属性序列 36.8%；全库类名最高 9.1%，仅历史两组 CSS 参考警告。这些是差异化参考指标，不是不可识别保证。
- 原动态源包忠实度仍未核验。后续填实仍须单站事实、合规与发布验收；本套不代写业务文章或注册教程，未调用 CI，未部署生产。
