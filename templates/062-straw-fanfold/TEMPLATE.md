# 062-straw-fanfold · 草编折扇

## 完整框架与来源边界

保留 style.css 全部字节、草纸纹理、酒红印记、折扇主视觉、四片编纂路径、抽屉索引和页签导航。binding.css 扩展完整阅读与工具系统。原动态源包忠实度未核验，本地 UI 就绪不代表已验证源包复刻。

## 后续 AI 只填写文字和变量

- F1–F12 是十二个内容槽位，已具备三种开场、十二种编纂组件、3/5/4 个正文 H2、4/2/3 个 FAQ、三种原生目录和收尾；四个交叉内容夹各含三篇，五工具、七站务页、404 与发布资产齐全。保留路径、class、id、data、ARIA、字段名和组件结构，不必补 UI。
- 只填写经核实的文章与站点变量。作者身份、经历、来源、日期与政策结论不得虚构；抽象封面不是观测图或实拍证据。增删文章须同步索引、分类、内链、sitemap 和 RSS。
- 占位语法 %%UPPER_CASE%%；wordmark 用英文或罗马字。HTML/XML、属性和 JSON 字符串各按上下文转义，JSON-LD 安全转义小于号。SITE_DOMAIN 不带协议或路径，SOURCE_URL 仅填核实的 HTTPS 来源；日期为 ISO，DATE_LABEL 为短日期文本，RSS_DATE 为 RFC822，SECURITY_EXPIRES 为未来 RFC3339。
- 首页标题、邀请码、利益点及脚注保持简短，替换后复查 360px 首屏。首页只有明文与真复制，无推广直链。registrationGuide 仅为旧审计器兼容字段，指向 reference-envelope.html 的通用推广组件，不指定注册教程题材；该页唯一静态推广 href 带四项 rel 和邻近披露。
- 默认 straw 日读，可切换 ink 夜读；主题是唯一 localStorage 项。输入、筛选与结果不保存、不上传。无 JS 可阅读和导航，目录及折叠批注可原生操作；筛选隐藏，提交和复制禁用。变更与重置使旧结果立即失效，异步复制不能复活旧记录。
- 五工具是沿用原 NFKC/NFKD 唯一锚点编排、理想骑马订页序、1–3999 规范罗马页码互换、数字引用频次/集合对账、码点行列括号栈检查。各页提供格式、例子、边界与不能推断的事项；不生成业务文章或生产印刷文件。
- 12 张独立 SVG/PNG/WebP 封面均为 1200×630；正文与预载用对应 WebP，OG 各用独立 PNG。另有站点社交图、SVG/ICO、180px apple 和抓取资源。RSS 只放第 1/2/3/4/6/8/9/10/11 篇摘要，不含邀请码或推广。
- article.html/tool.html/legal.html 是 noindex 兼容入口，无自动跳转。服务器应对未知深层 URL 返回真实 404 并映射 404.html；本轮不配置或部署。填实后仍须单站事实、合规与发布验收。

## workflow-ready-v2

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "leaf-catalog.html",
  "articles": [
    "leaves/entry-slip.html",
    "leaves/scope-weave.html",
    "leaves/edge-mark.html",
    "leaves/evidence-pocket.html",
    "leaves/parallel-strip.html",
    "leaves/quote-fan.html",
    "leaves/sequence-stitch.html",
    "leaves/revision-inlay.html",
    "leaves/source-knot.html",
    "leaves/exception-tab.html",
    "leaves/review-loop.html",
    "leaves/reference-envelope.html"
  ],
  "cornerstones": [
    "leaves/entry-slip.html",
    "leaves/scope-weave.html"
  ],
  "registrationGuide": "leaves/reference-envelope.html",
  "articleCovers": {
    "leaves/entry-slip.html": {
      "display": "assets/covers/entry-slip.webp",
      "og": "assets/covers/entry-slip.png"
    },
    "leaves/scope-weave.html": {
      "display": "assets/covers/scope-weave.webp",
      "og": "assets/covers/scope-weave.png"
    },
    "leaves/edge-mark.html": {
      "display": "assets/covers/edge-mark.webp",
      "og": "assets/covers/edge-mark.png"
    },
    "leaves/evidence-pocket.html": {
      "display": "assets/covers/evidence-pocket.webp",
      "og": "assets/covers/evidence-pocket.png"
    },
    "leaves/parallel-strip.html": {
      "display": "assets/covers/parallel-strip.webp",
      "og": "assets/covers/parallel-strip.png"
    },
    "leaves/quote-fan.html": {
      "display": "assets/covers/quote-fan.webp",
      "og": "assets/covers/quote-fan.png"
    },
    "leaves/sequence-stitch.html": {
      "display": "assets/covers/sequence-stitch.webp",
      "og": "assets/covers/sequence-stitch.png"
    },
    "leaves/revision-inlay.html": {
      "display": "assets/covers/revision-inlay.webp",
      "og": "assets/covers/revision-inlay.png"
    },
    "leaves/source-knot.html": {
      "display": "assets/covers/source-knot.webp",
      "og": "assets/covers/source-knot.png"
    },
    "leaves/exception-tab.html": {
      "display": "assets/covers/exception-tab.webp",
      "og": "assets/covers/exception-tab.png"
    },
    "leaves/review-loop.html": {
      "display": "assets/covers/review-loop.webp",
      "og": "assets/covers/review-loop.png"
    },
    "leaves/reference-envelope.html": {
      "display": "assets/covers/reference-envelope.webp",
      "og": "assets/covers/reference-envelope.png"
    }
  },
  "categories": [
    {
      "path": "gatherings/opening-slip.html",
      "label": "入册夹",
      "articles": [
        "leaves/entry-slip.html",
        "leaves/parallel-strip.html",
        "leaves/source-knot.html"
      ]
    },
    {
      "path": "gatherings/margin-weave.html",
      "label": "页边编",
      "articles": [
        "leaves/scope-weave.html",
        "leaves/quote-fan.html",
        "leaves/exception-tab.html"
      ]
    },
    {
      "path": "gatherings/stitched-register.html",
      "label": "缝线簿",
      "articles": [
        "leaves/edge-mark.html",
        "leaves/sequence-stitch.html",
        "leaves/review-loop.html"
      ]
    },
    {
      "path": "gatherings/closing-pocket.html",
      "label": "合页袋",
      "articles": [
        "leaves/evidence-pocket.html",
        "leaves/revision-inlay.html",
        "leaves/reference-envelope.html"
      ]
    }
  ],
  "toolIndex": "workroom.html",
  "tools": [
    "workroom/heading-anchors.html",
    "workroom/saddle-order.html",
    "workroom/roman-folios.html",
    "workroom/citation-tally.html",
    "workroom/bracket-binding.html"
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
- `%%ABOUT_HEAD_4%%`
- `%%ABOUT_INTRO%%`
- `%%ABOUT_MODIFIED%%`
- `%%ABOUT_TEXT_1%%`
- `%%ABOUT_TEXT_2%%`
- `%%ABOUT_TEXT_3%%`
- `%%ABOUT_TEXT_4%%`
- `%%AFFILIATE_DISCLOSURE%%`
- `%%AFFILIATE_INTRO%%`
- `%%AFFILIATE_LABEL%%`
- `%%AFFILIATE_TITLE%%`
- `%%AFFILIATE_URL%%`
- `%%AUTHOR_BIO%%`
- `%%AUTHOR_NAME%%`
- `%%BENEFIT_DISCLAIMER%%`
- `%%BENEFIT_RATE%%`
- `%%BRAND_EN%%`
- `%%CABINET_TITLE%%`
- `%%CLOSING_POCKET_DESC%%`
- `%%CLOSING_POCKET_INTRO%%`
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
- `%%CORRECTIONS_HEAD_4%%`
- `%%CORRECTIONS_INTRO%%`
- `%%CORRECTIONS_MODIFIED%%`
- `%%CORRECTIONS_TEXT_1%%`
- `%%CORRECTIONS_TEXT_2%%`
- `%%CORRECTIONS_TEXT_3%%`
- `%%CORRECTIONS_TEXT_4%%`
- `%%DISCLAIMER_CONTACT_NOTE%%`
- `%%DISCLAIMER_DESC%%`
- `%%DISCLAIMER_HEAD_1%%`
- `%%DISCLAIMER_HEAD_2%%`
- `%%DISCLAIMER_HEAD_3%%`
- `%%DISCLAIMER_HEAD_4%%`
- `%%DISCLAIMER_INTRO%%`
- `%%DISCLAIMER_MODIFIED%%`
- `%%DISCLAIMER_TEXT_1%%`
- `%%DISCLAIMER_TEXT_2%%`
- `%%DISCLAIMER_TEXT_3%%`
- `%%DISCLAIMER_TEXT_4%%`
- `%%DISCLOSURE_CONTACT_NOTE%%`
- `%%DISCLOSURE_DESC%%`
- `%%DISCLOSURE_HEAD_1%%`
- `%%DISCLOSURE_HEAD_2%%`
- `%%DISCLOSURE_HEAD_3%%`
- `%%DISCLOSURE_HEAD_4%%`
- `%%DISCLOSURE_HEAD_5%%`
- `%%DISCLOSURE_INTRO%%`
- `%%DISCLOSURE_MODIFIED%%`
- `%%DISCLOSURE_TEXT_1%%`
- `%%DISCLOSURE_TEXT_2%%`
- `%%DISCLOSURE_TEXT_3%%`
- `%%DISCLOSURE_TEXT_4%%`
- `%%DISCLOSURE_TEXT_5%%`
- `%%EDITORIAL_CONTACT_NOTE%%`
- `%%EDITORIAL_DESC%%`
- `%%EDITORIAL_HEAD_1%%`
- `%%EDITORIAL_HEAD_2%%`
- `%%EDITORIAL_HEAD_3%%`
- `%%EDITORIAL_HEAD_4%%`
- `%%EDITORIAL_HEAD_5%%`
- `%%EDITORIAL_INTRO%%`
- `%%EDITORIAL_MODIFIED%%`
- `%%EDITORIAL_TEXT_1%%`
- `%%EDITORIAL_TEXT_2%%`
- `%%EDITORIAL_TEXT_3%%`
- `%%EDITORIAL_TEXT_4%%`
- `%%EDITORIAL_TEXT_5%%`
- `%%F10_CHECKED%%`
- `%%F10_CLOSING_TEXT%%`
- `%%F10_CLOSING_TITLE%%`
- `%%F10_COVER_ALT%%`
- `%%F10_COVER_CAPTION%%`
- `%%F10_DATE_LABEL%%`
- `%%F10_FAQ_A_1%%`
- `%%F10_FAQ_A_2%%`
- `%%F10_FAQ_A_3%%`
- `%%F10_FAQ_A_4%%`
- `%%F10_FAQ_Q_1%%`
- `%%F10_FAQ_Q_2%%`
- `%%F10_FAQ_Q_3%%`
- `%%F10_FAQ_Q_4%%`
- `%%F10_FAQ_TITLE%%`
- `%%F10_H2_1%%`
- `%%F10_H2_2%%`
- `%%F10_H2_3%%`
- `%%F10_MODIFIED%%`
- `%%F10_MODULE_HEAD_1%%`
- `%%F10_MODULE_HEAD_2%%`
- `%%F10_MODULE_HEAD_3%%`
- `%%F10_MODULE_TEXT_1%%`
- `%%F10_MODULE_TEXT_2%%`
- `%%F10_MODULE_TEXT_3%%`
- `%%F10_PUBLISHED%%`
- `%%F10_QUOTE%%`
- `%%F10_QUOTE_SOURCE%%`
- `%%F10_RSS_DATE%%`
- `%%F10_SOURCES_TITLE%%`
- `%%F10_SOURCE_LABEL_1%%`
- `%%F10_SOURCE_LABEL_2%%`
- `%%F10_SOURCE_NOTE_1%%`
- `%%F10_SOURCE_NOTE_2%%`
- `%%F10_SOURCE_URL_1%%`
- `%%F10_SOURCE_URL_2%%`
- `%%F10_STATUS%%`
- `%%F10_SUMMARY%%`
- `%%F10_TABLE_CAPTION%%`
- `%%F10_TABLE_CELL_1_1%%`
- `%%F10_TABLE_CELL_1_2%%`
- `%%F10_TABLE_CELL_2_1%%`
- `%%F10_TABLE_CELL_2_2%%`
- `%%F10_TABLE_CELL_3_1%%`
- `%%F10_TABLE_CELL_3_2%%`
- `%%F10_TABLE_COL_1%%`
- `%%F10_TABLE_COL_2%%`
- `%%F10_TABLE_COL_3%%`
- `%%F10_TABLE_ROW_1%%`
- `%%F10_TABLE_ROW_2%%`
- `%%F10_TABLE_ROW_3%%`
- `%%F10_TEXT_1%%`
- `%%F10_TEXT_2%%`
- `%%F10_TEXT_3%%`
- `%%F10_TITLE%%`
- `%%F11_CHECKED%%`
- `%%F11_CLOSING_TEXT%%`
- `%%F11_CLOSING_TITLE%%`
- `%%F11_COVER_ALT%%`
- `%%F11_COVER_CAPTION%%`
- `%%F11_DATE_LABEL%%`
- `%%F11_FAQ_A_1%%`
- `%%F11_FAQ_A_2%%`
- `%%F11_FAQ_Q_1%%`
- `%%F11_FAQ_Q_2%%`
- `%%F11_FAQ_TITLE%%`
- `%%F11_H2_1%%`
- `%%F11_H2_2%%`
- `%%F11_H2_3%%`
- `%%F11_H2_4%%`
- `%%F11_H2_5%%`
- `%%F11_MODIFIED%%`
- `%%F11_MODULE_HEAD_1%%`
- `%%F11_MODULE_HEAD_2%%`
- `%%F11_MODULE_HEAD_3%%`
- `%%F11_MODULE_HEAD_4%%`
- `%%F11_MODULE_TEXT_1%%`
- `%%F11_MODULE_TEXT_2%%`
- `%%F11_MODULE_TEXT_3%%`
- `%%F11_MODULE_TEXT_4%%`
- `%%F11_PUBLISHED%%`
- `%%F11_QUOTE%%`
- `%%F11_QUOTE_SOURCE%%`
- `%%F11_RSS_DATE%%`
- `%%F11_SOURCES_TITLE%%`
- `%%F11_SOURCE_LABEL_1%%`
- `%%F11_SOURCE_LABEL_2%%`
- `%%F11_SOURCE_NOTE_1%%`
- `%%F11_SOURCE_NOTE_2%%`
- `%%F11_SOURCE_URL_1%%`
- `%%F11_SOURCE_URL_2%%`
- `%%F11_STATUS%%`
- `%%F11_SUMMARY%%`
- `%%F11_TABLE_CAPTION%%`
- `%%F11_TABLE_CELL_1_1%%`
- `%%F11_TABLE_CELL_1_2%%`
- `%%F11_TABLE_CELL_2_1%%`
- `%%F11_TABLE_CELL_2_2%%`
- `%%F11_TABLE_CELL_3_1%%`
- `%%F11_TABLE_CELL_3_2%%`
- `%%F11_TABLE_COL_1%%`
- `%%F11_TABLE_COL_2%%`
- `%%F11_TABLE_COL_3%%`
- `%%F11_TABLE_ROW_1%%`
- `%%F11_TABLE_ROW_2%%`
- `%%F11_TABLE_ROW_3%%`
- `%%F11_TEXT_1%%`
- `%%F11_TEXT_2%%`
- `%%F11_TEXT_3%%`
- `%%F11_TEXT_4%%`
- `%%F11_TEXT_5%%`
- `%%F11_TITLE%%`
- `%%F12_CHECKED%%`
- `%%F12_CLOSING_TEXT%%`
- `%%F12_CLOSING_TITLE%%`
- `%%F12_COVER_ALT%%`
- `%%F12_COVER_CAPTION%%`
- `%%F12_DATE_LABEL%%`
- `%%F12_FAQ_A_1%%`
- `%%F12_FAQ_A_2%%`
- `%%F12_FAQ_A_3%%`
- `%%F12_FAQ_Q_1%%`
- `%%F12_FAQ_Q_2%%`
- `%%F12_FAQ_Q_3%%`
- `%%F12_FAQ_TITLE%%`
- `%%F12_H2_1%%`
- `%%F12_H2_2%%`
- `%%F12_H2_3%%`
- `%%F12_H2_4%%`
- `%%F12_MODIFIED%%`
- `%%F12_MODULE_HEAD_1%%`
- `%%F12_MODULE_HEAD_2%%`
- `%%F12_MODULE_HEAD_3%%`
- `%%F12_MODULE_TEXT_1%%`
- `%%F12_MODULE_TEXT_2%%`
- `%%F12_MODULE_TEXT_3%%`
- `%%F12_PUBLISHED%%`
- `%%F12_QUOTE%%`
- `%%F12_QUOTE_SOURCE%%`
- `%%F12_SOURCES_TITLE%%`
- `%%F12_SOURCE_LABEL_1%%`
- `%%F12_SOURCE_LABEL_2%%`
- `%%F12_SOURCE_NOTE_1%%`
- `%%F12_SOURCE_NOTE_2%%`
- `%%F12_SOURCE_URL_1%%`
- `%%F12_SOURCE_URL_2%%`
- `%%F12_STATUS%%`
- `%%F12_SUMMARY%%`
- `%%F12_TABLE_CAPTION%%`
- `%%F12_TABLE_CELL_1_1%%`
- `%%F12_TABLE_CELL_1_2%%`
- `%%F12_TABLE_CELL_2_1%%`
- `%%F12_TABLE_CELL_2_2%%`
- `%%F12_TABLE_CELL_3_1%%`
- `%%F12_TABLE_CELL_3_2%%`
- `%%F12_TABLE_COL_1%%`
- `%%F12_TABLE_COL_2%%`
- `%%F12_TABLE_COL_3%%`
- `%%F12_TABLE_ROW_1%%`
- `%%F12_TABLE_ROW_2%%`
- `%%F12_TABLE_ROW_3%%`
- `%%F12_TEXT_1%%`
- `%%F12_TEXT_2%%`
- `%%F12_TEXT_3%%`
- `%%F12_TEXT_4%%`
- `%%F12_TITLE%%`
- `%%F1_CHECKED%%`
- `%%F1_CLOSING_TEXT%%`
- `%%F1_CLOSING_TITLE%%`
- `%%F1_COVER_ALT%%`
- `%%F1_COVER_CAPTION%%`
- `%%F1_DATE_LABEL%%`
- `%%F1_FAQ_A_1%%`
- `%%F1_FAQ_A_2%%`
- `%%F1_FAQ_A_3%%`
- `%%F1_FAQ_A_4%%`
- `%%F1_FAQ_Q_1%%`
- `%%F1_FAQ_Q_2%%`
- `%%F1_FAQ_Q_3%%`
- `%%F1_FAQ_Q_4%%`
- `%%F1_FAQ_TITLE%%`
- `%%F1_H2_1%%`
- `%%F1_H2_2%%`
- `%%F1_H2_3%%`
- `%%F1_MODIFIED%%`
- `%%F1_MODULE_HEAD_1%%`
- `%%F1_MODULE_HEAD_2%%`
- `%%F1_MODULE_TEXT_1%%`
- `%%F1_MODULE_TEXT_2%%`
- `%%F1_PUBLISHED%%`
- `%%F1_QUOTE%%`
- `%%F1_QUOTE_SOURCE%%`
- `%%F1_RSS_DATE%%`
- `%%F1_SOURCES_TITLE%%`
- `%%F1_SOURCE_LABEL_1%%`
- `%%F1_SOURCE_LABEL_2%%`
- `%%F1_SOURCE_NOTE_1%%`
- `%%F1_SOURCE_NOTE_2%%`
- `%%F1_SOURCE_URL_1%%`
- `%%F1_SOURCE_URL_2%%`
- `%%F1_STATUS%%`
- `%%F1_SUMMARY%%`
- `%%F1_TABLE_CAPTION%%`
- `%%F1_TABLE_CELL_1_1%%`
- `%%F1_TABLE_CELL_1_2%%`
- `%%F1_TABLE_CELL_2_1%%`
- `%%F1_TABLE_CELL_2_2%%`
- `%%F1_TABLE_CELL_3_1%%`
- `%%F1_TABLE_CELL_3_2%%`
- `%%F1_TABLE_COL_1%%`
- `%%F1_TABLE_COL_2%%`
- `%%F1_TABLE_COL_3%%`
- `%%F1_TABLE_ROW_1%%`
- `%%F1_TABLE_ROW_2%%`
- `%%F1_TABLE_ROW_3%%`
- `%%F1_TEXT_1%%`
- `%%F1_TEXT_2%%`
- `%%F1_TEXT_3%%`
- `%%F1_TITLE%%`
- `%%F2_CHECKED%%`
- `%%F2_CLOSING_TEXT%%`
- `%%F2_CLOSING_TITLE%%`
- `%%F2_COVER_ALT%%`
- `%%F2_COVER_CAPTION%%`
- `%%F2_DATE_LABEL%%`
- `%%F2_FAQ_A_1%%`
- `%%F2_FAQ_A_2%%`
- `%%F2_FAQ_Q_1%%`
- `%%F2_FAQ_Q_2%%`
- `%%F2_FAQ_TITLE%%`
- `%%F2_H2_1%%`
- `%%F2_H2_2%%`
- `%%F2_H2_3%%`
- `%%F2_H2_4%%`
- `%%F2_H2_5%%`
- `%%F2_MODIFIED%%`
- `%%F2_MODULE_HEAD_1%%`
- `%%F2_MODULE_HEAD_2%%`
- `%%F2_MODULE_HEAD_3%%`
- `%%F2_MODULE_HEAD_4%%`
- `%%F2_MODULE_TEXT_1%%`
- `%%F2_MODULE_TEXT_2%%`
- `%%F2_MODULE_TEXT_3%%`
- `%%F2_MODULE_TEXT_4%%`
- `%%F2_PUBLISHED%%`
- `%%F2_QUOTE%%`
- `%%F2_QUOTE_SOURCE%%`
- `%%F2_RSS_DATE%%`
- `%%F2_SOURCES_TITLE%%`
- `%%F2_SOURCE_LABEL_1%%`
- `%%F2_SOURCE_LABEL_2%%`
- `%%F2_SOURCE_NOTE_1%%`
- `%%F2_SOURCE_NOTE_2%%`
- `%%F2_SOURCE_URL_1%%`
- `%%F2_SOURCE_URL_2%%`
- `%%F2_STATUS%%`
- `%%F2_SUMMARY%%`
- `%%F2_TABLE_CAPTION%%`
- `%%F2_TABLE_CELL_1_1%%`
- `%%F2_TABLE_CELL_1_2%%`
- `%%F2_TABLE_CELL_2_1%%`
- `%%F2_TABLE_CELL_2_2%%`
- `%%F2_TABLE_CELL_3_1%%`
- `%%F2_TABLE_CELL_3_2%%`
- `%%F2_TABLE_COL_1%%`
- `%%F2_TABLE_COL_2%%`
- `%%F2_TABLE_COL_3%%`
- `%%F2_TABLE_ROW_1%%`
- `%%F2_TABLE_ROW_2%%`
- `%%F2_TABLE_ROW_3%%`
- `%%F2_TEXT_1%%`
- `%%F2_TEXT_2%%`
- `%%F2_TEXT_3%%`
- `%%F2_TEXT_4%%`
- `%%F2_TEXT_5%%`
- `%%F2_TITLE%%`
- `%%F3_CHECKED%%`
- `%%F3_CLOSING_TEXT%%`
- `%%F3_CLOSING_TITLE%%`
- `%%F3_COVER_ALT%%`
- `%%F3_COVER_CAPTION%%`
- `%%F3_DATE_LABEL%%`
- `%%F3_FAQ_A_1%%`
- `%%F3_FAQ_A_2%%`
- `%%F3_FAQ_A_3%%`
- `%%F3_FAQ_Q_1%%`
- `%%F3_FAQ_Q_2%%`
- `%%F3_FAQ_Q_3%%`
- `%%F3_FAQ_TITLE%%`
- `%%F3_H2_1%%`
- `%%F3_H2_2%%`
- `%%F3_H2_3%%`
- `%%F3_H2_4%%`
- `%%F3_MODIFIED%%`
- `%%F3_MODULE_HEAD_1%%`
- `%%F3_MODULE_HEAD_2%%`
- `%%F3_MODULE_HEAD_3%%`
- `%%F3_MODULE_TEXT_1%%`
- `%%F3_MODULE_TEXT_2%%`
- `%%F3_MODULE_TEXT_3%%`
- `%%F3_PUBLISHED%%`
- `%%F3_QUOTE%%`
- `%%F3_QUOTE_SOURCE%%`
- `%%F3_RSS_DATE%%`
- `%%F3_SOURCES_TITLE%%`
- `%%F3_SOURCE_LABEL_1%%`
- `%%F3_SOURCE_LABEL_2%%`
- `%%F3_SOURCE_NOTE_1%%`
- `%%F3_SOURCE_NOTE_2%%`
- `%%F3_SOURCE_URL_1%%`
- `%%F3_SOURCE_URL_2%%`
- `%%F3_STATUS%%`
- `%%F3_SUMMARY%%`
- `%%F3_TABLE_CAPTION%%`
- `%%F3_TABLE_CELL_1_1%%`
- `%%F3_TABLE_CELL_1_2%%`
- `%%F3_TABLE_CELL_2_1%%`
- `%%F3_TABLE_CELL_2_2%%`
- `%%F3_TABLE_CELL_3_1%%`
- `%%F3_TABLE_CELL_3_2%%`
- `%%F3_TABLE_COL_1%%`
- `%%F3_TABLE_COL_2%%`
- `%%F3_TABLE_COL_3%%`
- `%%F3_TABLE_ROW_1%%`
- `%%F3_TABLE_ROW_2%%`
- `%%F3_TABLE_ROW_3%%`
- `%%F3_TEXT_1%%`
- `%%F3_TEXT_2%%`
- `%%F3_TEXT_3%%`
- `%%F3_TEXT_4%%`
- `%%F3_TITLE%%`
- `%%F4_CHECKED%%`
- `%%F4_CLOSING_TEXT%%`
- `%%F4_CLOSING_TITLE%%`
- `%%F4_COVER_ALT%%`
- `%%F4_COVER_CAPTION%%`
- `%%F4_DATE_LABEL%%`
- `%%F4_FAQ_A_1%%`
- `%%F4_FAQ_A_2%%`
- `%%F4_FAQ_A_3%%`
- `%%F4_FAQ_A_4%%`
- `%%F4_FAQ_Q_1%%`
- `%%F4_FAQ_Q_2%%`
- `%%F4_FAQ_Q_3%%`
- `%%F4_FAQ_Q_4%%`
- `%%F4_FAQ_TITLE%%`
- `%%F4_H2_1%%`
- `%%F4_H2_2%%`
- `%%F4_H2_3%%`
- `%%F4_MODIFIED%%`
- `%%F4_MODULE_HEAD_1%%`
- `%%F4_MODULE_HEAD_2%%`
- `%%F4_MODULE_HEAD_3%%`
- `%%F4_MODULE_TEXT_1%%`
- `%%F4_MODULE_TEXT_2%%`
- `%%F4_MODULE_TEXT_3%%`
- `%%F4_PUBLISHED%%`
- `%%F4_QUOTE%%`
- `%%F4_QUOTE_SOURCE%%`
- `%%F4_RSS_DATE%%`
- `%%F4_SOURCES_TITLE%%`
- `%%F4_SOURCE_LABEL_1%%`
- `%%F4_SOURCE_LABEL_2%%`
- `%%F4_SOURCE_NOTE_1%%`
- `%%F4_SOURCE_NOTE_2%%`
- `%%F4_SOURCE_URL_1%%`
- `%%F4_SOURCE_URL_2%%`
- `%%F4_STATUS%%`
- `%%F4_SUMMARY%%`
- `%%F4_TABLE_CAPTION%%`
- `%%F4_TABLE_CELL_1_1%%`
- `%%F4_TABLE_CELL_1_2%%`
- `%%F4_TABLE_CELL_2_1%%`
- `%%F4_TABLE_CELL_2_2%%`
- `%%F4_TABLE_CELL_3_1%%`
- `%%F4_TABLE_CELL_3_2%%`
- `%%F4_TABLE_COL_1%%`
- `%%F4_TABLE_COL_2%%`
- `%%F4_TABLE_COL_3%%`
- `%%F4_TABLE_ROW_1%%`
- `%%F4_TABLE_ROW_2%%`
- `%%F4_TABLE_ROW_3%%`
- `%%F4_TEXT_1%%`
- `%%F4_TEXT_2%%`
- `%%F4_TEXT_3%%`
- `%%F4_TITLE%%`
- `%%F5_CHECKED%%`
- `%%F5_CLOSING_TEXT%%`
- `%%F5_CLOSING_TITLE%%`
- `%%F5_COVER_ALT%%`
- `%%F5_COVER_CAPTION%%`
- `%%F5_DATE_LABEL%%`
- `%%F5_FAQ_A_1%%`
- `%%F5_FAQ_A_2%%`
- `%%F5_FAQ_Q_1%%`
- `%%F5_FAQ_Q_2%%`
- `%%F5_FAQ_TITLE%%`
- `%%F5_H2_1%%`
- `%%F5_H2_2%%`
- `%%F5_H2_3%%`
- `%%F5_H2_4%%`
- `%%F5_H2_5%%`
- `%%F5_MODIFIED%%`
- `%%F5_MODULE_HEAD_1%%`
- `%%F5_MODULE_HEAD_2%%`
- `%%F5_MODULE_TEXT_1%%`
- `%%F5_MODULE_TEXT_2%%`
- `%%F5_PUBLISHED%%`
- `%%F5_QUOTE%%`
- `%%F5_QUOTE_SOURCE%%`
- `%%F5_SOURCES_TITLE%%`
- `%%F5_SOURCE_LABEL_1%%`
- `%%F5_SOURCE_LABEL_2%%`
- `%%F5_SOURCE_NOTE_1%%`
- `%%F5_SOURCE_NOTE_2%%`
- `%%F5_SOURCE_URL_1%%`
- `%%F5_SOURCE_URL_2%%`
- `%%F5_STATUS%%`
- `%%F5_SUMMARY%%`
- `%%F5_TABLE_CAPTION%%`
- `%%F5_TABLE_CELL_1_1%%`
- `%%F5_TABLE_CELL_1_2%%`
- `%%F5_TABLE_CELL_2_1%%`
- `%%F5_TABLE_CELL_2_2%%`
- `%%F5_TABLE_CELL_3_1%%`
- `%%F5_TABLE_CELL_3_2%%`
- `%%F5_TABLE_COL_1%%`
- `%%F5_TABLE_COL_2%%`
- `%%F5_TABLE_COL_3%%`
- `%%F5_TABLE_ROW_1%%`
- `%%F5_TABLE_ROW_2%%`
- `%%F5_TABLE_ROW_3%%`
- `%%F5_TEXT_1%%`
- `%%F5_TEXT_2%%`
- `%%F5_TEXT_3%%`
- `%%F5_TEXT_4%%`
- `%%F5_TEXT_5%%`
- `%%F5_TITLE%%`
- `%%F6_CHECKED%%`
- `%%F6_CLOSING_TEXT%%`
- `%%F6_CLOSING_TITLE%%`
- `%%F6_COVER_ALT%%`
- `%%F6_COVER_CAPTION%%`
- `%%F6_DATE_LABEL%%`
- `%%F6_FAQ_A_1%%`
- `%%F6_FAQ_A_2%%`
- `%%F6_FAQ_A_3%%`
- `%%F6_FAQ_Q_1%%`
- `%%F6_FAQ_Q_2%%`
- `%%F6_FAQ_Q_3%%`
- `%%F6_FAQ_TITLE%%`
- `%%F6_H2_1%%`
- `%%F6_H2_2%%`
- `%%F6_H2_3%%`
- `%%F6_H2_4%%`
- `%%F6_MODIFIED%%`
- `%%F6_MODULE_HEAD_1%%`
- `%%F6_MODULE_HEAD_2%%`
- `%%F6_MODULE_TEXT_1%%`
- `%%F6_MODULE_TEXT_2%%`
- `%%F6_PUBLISHED%%`
- `%%F6_QUOTE%%`
- `%%F6_QUOTE_SOURCE%%`
- `%%F6_RSS_DATE%%`
- `%%F6_SOURCES_TITLE%%`
- `%%F6_SOURCE_LABEL_1%%`
- `%%F6_SOURCE_LABEL_2%%`
- `%%F6_SOURCE_NOTE_1%%`
- `%%F6_SOURCE_NOTE_2%%`
- `%%F6_SOURCE_URL_1%%`
- `%%F6_SOURCE_URL_2%%`
- `%%F6_STATUS%%`
- `%%F6_SUMMARY%%`
- `%%F6_TABLE_CAPTION%%`
- `%%F6_TABLE_CELL_1_1%%`
- `%%F6_TABLE_CELL_1_2%%`
- `%%F6_TABLE_CELL_2_1%%`
- `%%F6_TABLE_CELL_2_2%%`
- `%%F6_TABLE_CELL_3_1%%`
- `%%F6_TABLE_CELL_3_2%%`
- `%%F6_TABLE_COL_1%%`
- `%%F6_TABLE_COL_2%%`
- `%%F6_TABLE_COL_3%%`
- `%%F6_TABLE_ROW_1%%`
- `%%F6_TABLE_ROW_2%%`
- `%%F6_TABLE_ROW_3%%`
- `%%F6_TEXT_1%%`
- `%%F6_TEXT_2%%`
- `%%F6_TEXT_3%%`
- `%%F6_TEXT_4%%`
- `%%F6_TITLE%%`
- `%%F7_CHECKED%%`
- `%%F7_CLOSING_TEXT%%`
- `%%F7_CLOSING_TITLE%%`
- `%%F7_COVER_ALT%%`
- `%%F7_COVER_CAPTION%%`
- `%%F7_DATE_LABEL%%`
- `%%F7_FAQ_A_1%%`
- `%%F7_FAQ_A_2%%`
- `%%F7_FAQ_A_3%%`
- `%%F7_FAQ_A_4%%`
- `%%F7_FAQ_Q_1%%`
- `%%F7_FAQ_Q_2%%`
- `%%F7_FAQ_Q_3%%`
- `%%F7_FAQ_Q_4%%`
- `%%F7_FAQ_TITLE%%`
- `%%F7_H2_1%%`
- `%%F7_H2_2%%`
- `%%F7_H2_3%%`
- `%%F7_MODIFIED%%`
- `%%F7_MODULE_HEAD_1%%`
- `%%F7_MODULE_HEAD_2%%`
- `%%F7_MODULE_HEAD_3%%`
- `%%F7_MODULE_HEAD_4%%`
- `%%F7_MODULE_TEXT_1%%`
- `%%F7_MODULE_TEXT_2%%`
- `%%F7_MODULE_TEXT_3%%`
- `%%F7_MODULE_TEXT_4%%`
- `%%F7_PUBLISHED%%`
- `%%F7_QUOTE%%`
- `%%F7_QUOTE_SOURCE%%`
- `%%F7_SOURCES_TITLE%%`
- `%%F7_SOURCE_LABEL_1%%`
- `%%F7_SOURCE_LABEL_2%%`
- `%%F7_SOURCE_NOTE_1%%`
- `%%F7_SOURCE_NOTE_2%%`
- `%%F7_SOURCE_URL_1%%`
- `%%F7_SOURCE_URL_2%%`
- `%%F7_STATUS%%`
- `%%F7_SUMMARY%%`
- `%%F7_TABLE_CAPTION%%`
- `%%F7_TABLE_CELL_1_1%%`
- `%%F7_TABLE_CELL_1_2%%`
- `%%F7_TABLE_CELL_2_1%%`
- `%%F7_TABLE_CELL_2_2%%`
- `%%F7_TABLE_CELL_3_1%%`
- `%%F7_TABLE_CELL_3_2%%`
- `%%F7_TABLE_COL_1%%`
- `%%F7_TABLE_COL_2%%`
- `%%F7_TABLE_COL_3%%`
- `%%F7_TABLE_ROW_1%%`
- `%%F7_TABLE_ROW_2%%`
- `%%F7_TABLE_ROW_3%%`
- `%%F7_TEXT_1%%`
- `%%F7_TEXT_2%%`
- `%%F7_TEXT_3%%`
- `%%F7_TITLE%%`
- `%%F8_CHECKED%%`
- `%%F8_CLOSING_TEXT%%`
- `%%F8_CLOSING_TITLE%%`
- `%%F8_COVER_ALT%%`
- `%%F8_COVER_CAPTION%%`
- `%%F8_DATE_LABEL%%`
- `%%F8_FAQ_A_1%%`
- `%%F8_FAQ_A_2%%`
- `%%F8_FAQ_Q_1%%`
- `%%F8_FAQ_Q_2%%`
- `%%F8_FAQ_TITLE%%`
- `%%F8_H2_1%%`
- `%%F8_H2_2%%`
- `%%F8_H2_3%%`
- `%%F8_H2_4%%`
- `%%F8_H2_5%%`
- `%%F8_MODIFIED%%`
- `%%F8_MODULE_HEAD_1%%`
- `%%F8_MODULE_HEAD_2%%`
- `%%F8_MODULE_HEAD_3%%`
- `%%F8_MODULE_TEXT_1%%`
- `%%F8_MODULE_TEXT_2%%`
- `%%F8_MODULE_TEXT_3%%`
- `%%F8_PUBLISHED%%`
- `%%F8_QUOTE%%`
- `%%F8_QUOTE_SOURCE%%`
- `%%F8_RSS_DATE%%`
- `%%F8_SOURCES_TITLE%%`
- `%%F8_SOURCE_LABEL_1%%`
- `%%F8_SOURCE_LABEL_2%%`
- `%%F8_SOURCE_NOTE_1%%`
- `%%F8_SOURCE_NOTE_2%%`
- `%%F8_SOURCE_URL_1%%`
- `%%F8_SOURCE_URL_2%%`
- `%%F8_STATUS%%`
- `%%F8_SUMMARY%%`
- `%%F8_TABLE_CAPTION%%`
- `%%F8_TABLE_CELL_1_1%%`
- `%%F8_TABLE_CELL_1_2%%`
- `%%F8_TABLE_CELL_2_1%%`
- `%%F8_TABLE_CELL_2_2%%`
- `%%F8_TABLE_CELL_3_1%%`
- `%%F8_TABLE_CELL_3_2%%`
- `%%F8_TABLE_COL_1%%`
- `%%F8_TABLE_COL_2%%`
- `%%F8_TABLE_COL_3%%`
- `%%F8_TABLE_ROW_1%%`
- `%%F8_TABLE_ROW_2%%`
- `%%F8_TABLE_ROW_3%%`
- `%%F8_TEXT_1%%`
- `%%F8_TEXT_2%%`
- `%%F8_TEXT_3%%`
- `%%F8_TEXT_4%%`
- `%%F8_TEXT_5%%`
- `%%F8_TITLE%%`
- `%%F9_CHECKED%%`
- `%%F9_CLOSING_TEXT%%`
- `%%F9_CLOSING_TITLE%%`
- `%%F9_COVER_ALT%%`
- `%%F9_COVER_CAPTION%%`
- `%%F9_DATE_LABEL%%`
- `%%F9_FAQ_A_1%%`
- `%%F9_FAQ_A_2%%`
- `%%F9_FAQ_A_3%%`
- `%%F9_FAQ_Q_1%%`
- `%%F9_FAQ_Q_2%%`
- `%%F9_FAQ_Q_3%%`
- `%%F9_FAQ_TITLE%%`
- `%%F9_H2_1%%`
- `%%F9_H2_2%%`
- `%%F9_H2_3%%`
- `%%F9_H2_4%%`
- `%%F9_MODIFIED%%`
- `%%F9_MODULE_HEAD_1%%`
- `%%F9_MODULE_HEAD_2%%`
- `%%F9_MODULE_HEAD_3%%`
- `%%F9_MODULE_TEXT_1%%`
- `%%F9_MODULE_TEXT_2%%`
- `%%F9_MODULE_TEXT_3%%`
- `%%F9_PUBLISHED%%`
- `%%F9_QUOTE%%`
- `%%F9_QUOTE_SOURCE%%`
- `%%F9_RSS_DATE%%`
- `%%F9_SOURCES_TITLE%%`
- `%%F9_SOURCE_LABEL_1%%`
- `%%F9_SOURCE_LABEL_2%%`
- `%%F9_SOURCE_NOTE_1%%`
- `%%F9_SOURCE_NOTE_2%%`
- `%%F9_SOURCE_URL_1%%`
- `%%F9_SOURCE_URL_2%%`
- `%%F9_STATUS%%`
- `%%F9_SUMMARY%%`
- `%%F9_TABLE_CAPTION%%`
- `%%F9_TABLE_CELL_1_1%%`
- `%%F9_TABLE_CELL_1_2%%`
- `%%F9_TABLE_CELL_2_1%%`
- `%%F9_TABLE_CELL_2_2%%`
- `%%F9_TABLE_CELL_3_1%%`
- `%%F9_TABLE_CELL_3_2%%`
- `%%F9_TABLE_COL_1%%`
- `%%F9_TABLE_COL_2%%`
- `%%F9_TABLE_COL_3%%`
- `%%F9_TABLE_ROW_1%%`
- `%%F9_TABLE_ROW_2%%`
- `%%F9_TABLE_ROW_3%%`
- `%%F9_TEXT_1%%`
- `%%F9_TEXT_2%%`
- `%%F9_TEXT_3%%`
- `%%F9_TEXT_4%%`
- `%%F9_TITLE%%`
- `%%FAN_CAPTION%%`
- `%%FOLDS_INTRO%%`
- `%%FOLDS_TITLE%%`
- `%%GATHERING_NOTE_1%%`
- `%%GATHERING_NOTE_2%%`
- `%%GATHERING_NOTE_3%%`
- `%%GATHERING_NOTE_4%%`
- `%%HERO_DESCRIPTION%%`
- `%%HERO_EYEBROW%%`
- `%%HERO_TITLE%%`
- `%%HOME_FEATURED_LABEL%%`
- `%%HOME_LATEST_LABEL%%`
- `%%HOME_LINKS_LABEL%%`
- `%%INDEPENDENCE_NOTE%%`
- `%%INDEX_DESC%%`
- `%%INDEX_INTRO%%`
- `%%INVITE_CODE%%`
- `%%INVITE_LABEL%%`
- `%%LANG%%`
- `%%MARGIN_WEAVE_DESC%%`
- `%%MARGIN_WEAVE_INTRO%%`
- `%%OPENING_SLIP_DESC%%`
- `%%OPENING_SLIP_INTRO%%`
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
- `%%RIBBON_LABEL_1%%`
- `%%RIBBON_LABEL_2%%`
- `%%RIBBON_LABEL_3%%`
- `%%RIBBON_LABEL_4%%`
- `%%RIBBON_TEXT_1%%`
- `%%RIBBON_TEXT_2%%`
- `%%RIBBON_TEXT_3%%`
- `%%RIBBON_TEXT_4%%`
- `%%RISK_NOTE%%`
- `%%SECURITY_EMAIL%%`
- `%%SECURITY_EXPIRES%%`
- `%%SEO_TITLE%%`
- `%%SITE_DESC%%`
- `%%SITE_DOMAIN%%`
- `%%SITE_NAME%%`
- `%%SITE_TAGLINE%%`
- `%%STITCHED_REGISTER_DESC%%`
- `%%STITCHED_REGISTER_INTRO%%`
- `%%TOOLS_DESC%%`
- `%%TOOLS_INTRO%%`
- `%%WORKBENCH_TITLE%%`

## 验收记录

2026-09-04 · workflow-ready v2 完整框架验收通过，仅代表模板 UI 与功能就绪。

- 85 个文件、35 个 HTML（31 个可索引页面、独立 404、3 个 noindex 兼容入口）；三项静态审计通过，本套 P0/P1/P2 均为 0。
- 原 style.css 字节不变，首页原有 13 个类名全部保留；草纸纹理、酒红印记、折扇主视觉、四片路径与抽屉索引延续。三种阅读开场、十二编纂组件、四个交叉内容夹、七页站务和五个本地工具完整。
- 35 页 × 1440/768/390/360px × straw/ink 主题，共 280 次最终渲染；946 项功能、算法与边界检查全部通过，控制台和网络错误为 0。复验脚本：`tools/qa/062-straw-fanfold-browser.js`；本地证据：`artifacts/qa/062-straw-fanfold-v2-2026-09-04/`。
- 锚点以独立逐字符处理和可用后缀搜索对照，覆盖 12 组标题及两种分隔符、两种前缀策略、冲突、NFKC、50 行、5000 码点和单行 120 个补充平面字符。骑马订以独立双端队列逐页复验 4–256 的全部四倍数、两种装订方向及每页恰好一次；只提供理想页序，不冒充可直接印刷的生产拼版。
- 罗马页码以独立位值查表完整复验 1–3999 双向互换，覆盖大小写、兼容字符、100 行批次、非规范写法及整批失败。引用对账以独立频次表和集合核对 12 组生成输入，覆盖 200 次引用、100 来源、9999 编号、重复和缺失。
- 括号以平衡语法生成和明确错位坐标复验七类括号、ASCII 模式、20 层嵌套、1000 条完整问题、CRLF、组合字符、ZWJ 和补充平面字符；不做 NFKC，不解释引号或代码。控制字符、孤立代理项、超长或非法选项均有拒绝检查。
- 首屏真复制、默认日读及主题持久化、菜单焦点和 Escape、首页/索引组合筛选及重置、三种原生目录、原生折叠批注、唯一推广 UI 槽位与邻近披露、404 三态及深层真实 404、无 JS 阅读/导航及禁用提交、原生粘贴和 Enter/Tab、复制拒绝及异步旧结果失效、reduced-motion、阅读进度、明暗原生控件与对比度通过。
- 人工复核 36 张最终截图：首页四宽度双主题、目录、三种开场、十二组件、五工具输入与结果、移动表格和暗色错误，并另看社交图。首轮机械检查通过后发现折扇末片压住图注，已调整扇面与图注间距、加入图注几何断言并完整重跑；未把首轮直接计为最终验收。RSS 首次不足八项，现为九篇摘要并重验。
- 799 个文字/变量槽位已登记，35 块 JSON-LD 可解析，83 个页内锚点有效，12 张 PNG 封面内容互异；25 张封面/社交栅格图均为 1200×630，apple 为 180px，ICO 含 16/32/48px。敏感模式与符号链接检查未发现问题，无远程计算、危险 HTML 注入或输入持久化。
- 相邻 061 的类名重合 1.8%、DOM 标签二元组 41.0%、CSS 属性序列 33.5%；全库类名最高 9.1%，仅历史两组 CSS 参考警告。这些是差异化参考指标，不是不可识别保证。
- 原动态源包忠实度仍未核验，不作为本轮 UI 就绪证明。后续填入真实内容仍须进行单站事实、合规与发布验收；本套不代写业务文章或注册教程，未调用 CI，未部署生产。
