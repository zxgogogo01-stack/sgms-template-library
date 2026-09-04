# 060-mist-collage · 雾青剪贴

## 完整 UI 与来源边界

保留原 css/glue.css 全部字节、雾青纸感、胶带卡墙、证据路径图与三枚入口标签；css/shelves.css 补齐 mc60 命名空间中的阅读、工具和响应式。原动态源包忠实度未核验，不把本地框架验收当作复刻证明。

## 后续 AI 只替换文字与变量

- 12 个 C1–C12 内容槽位：三种拼贴开场，十二种纸卡组件，4/3/5 个正文 H2、3/2/4 个 FAQ、三种原生目录和收尾；三间分区、五件真工具、七页站务、发布资源与 404 已齐备。保留路径、类名、id、data、ARIA、表单字段和组件布局，不再补 UI。
- 仅填经核实文章和站点变量，作者身份、经历、来源、日期与政策结论不得虚构；抽象图形是版式封面，不代表实拍证据。增删内容须同步索引、分类、内链、sitemap 与 RSS。
- 使用单层 {UPPER_CASE} 占位符。字标为英文或罗马字；按 HTML/XML、属性及 JSON 字符串上下文分别转义，JSON-LD 安全转义小于号。SITE_DOMAIN 不带协议或路径，SOURCE_URL 为经核实 HTTPS 来源。日期为 ISO；RSS_DATE 为 RFC822；SECURITY_EXPIRES 为未来 RFC3339。
- 首页标题、条件、脚注与邀请码保持简短，填写后复看 360px 首屏。首页只明文与真复制，不含推广直链。registrationGuide 是审计器兼容字段，只指向 invitation-stub.html 的通用推广 UI 槽位，不指定注册教程选题。该页仅一个静态推广 href，附四项 rel 和邻近披露。
- 明暗主题是唯一 localStorage 项，未保存时跟随系统；无 JS 能阅读/导航/展开目录，筛选隐藏、提交复制禁用。表单材料不上传、不保存，修改或重置立即失效旧输出，异步复制不回写旧结果。
- 工具分别为 URL 规范化盘点、标签共现矩阵、码点重叠分窗、sRGB 文字对比、BigInt 有理数居中适配。每件都有格式、示例、上限、错误和意义边界；不是来源可信度或投资判断。
- 12 张独立 SVG/PNG/WebP 封面均为 1200×630；WebP 显示与高优先级预载，各页 PNG 用于 OG；完整 favicon/ICO、180px apple、站点社交图已备。RSS 放第 1/2/3/5/6/8/9/11 篇摘要，不含推广和邀请码。
- article.html/tool.html/legal.html 是 noindex 兼容入口，不自动跳转。服务器应对未知深层路径返回真实 404 并映射 404.html，本轮不配置或部署。真实内容填入后仍需单站事实、合规与发布验收。

## 工具公式事实源

色签工具的亮度及普通/大字 AA/AAA 阈值核对于 2026-09-04：[W3C 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)、[W3C 1.4.6](https://www.w3.org/WAI/WCAG22/Understanding/contrast-enhanced.html)。用未舍入比值判定，不声称整页 WCAG 合规。

## workflow-ready-v2

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "wall-index.html",
  "articles": [
    "pins/anchor-card.html",
    "pins/source-window.html",
    "pins/margin-strip.html",
    "pins/trace-string.html",
    "pins/swatch-grid.html",
    "pins/foldout-sheet.html",
    "pins/annotation-pairs.html",
    "pins/evidence-tabs.html",
    "pins/quote-mount.html",
    "pins/revision-layers.html",
    "pins/cross-reference.html",
    "pins/invitation-stub.html"
  ],
  "cornerstones": [
    "pins/anchor-card.html",
    "pins/source-window.html"
  ],
  "registrationGuide": "pins/invitation-stub.html",
  "articleCovers": {
    "pins/anchor-card.html": {
      "display": "assets/covers/anchor-card.webp",
      "og": "assets/covers/anchor-card.png"
    },
    "pins/source-window.html": {
      "display": "assets/covers/source-window.webp",
      "og": "assets/covers/source-window.png"
    },
    "pins/margin-strip.html": {
      "display": "assets/covers/margin-strip.webp",
      "og": "assets/covers/margin-strip.png"
    },
    "pins/trace-string.html": {
      "display": "assets/covers/trace-string.webp",
      "og": "assets/covers/trace-string.png"
    },
    "pins/swatch-grid.html": {
      "display": "assets/covers/swatch-grid.webp",
      "og": "assets/covers/swatch-grid.png"
    },
    "pins/foldout-sheet.html": {
      "display": "assets/covers/foldout-sheet.webp",
      "og": "assets/covers/foldout-sheet.png"
    },
    "pins/annotation-pairs.html": {
      "display": "assets/covers/annotation-pairs.webp",
      "og": "assets/covers/annotation-pairs.png"
    },
    "pins/evidence-tabs.html": {
      "display": "assets/covers/evidence-tabs.webp",
      "og": "assets/covers/evidence-tabs.png"
    },
    "pins/quote-mount.html": {
      "display": "assets/covers/quote-mount.webp",
      "og": "assets/covers/quote-mount.png"
    },
    "pins/revision-layers.html": {
      "display": "assets/covers/revision-layers.webp",
      "og": "assets/covers/revision-layers.png"
    },
    "pins/cross-reference.html": {
      "display": "assets/covers/cross-reference.webp",
      "og": "assets/covers/cross-reference.png"
    },
    "pins/invitation-stub.html": {
      "display": "assets/covers/invitation-stub.webp",
      "og": "assets/covers/invitation-stub.png"
    }
  },
  "categories": [
    {
      "path": "collections/source-bench.html",
      "label": "来源桌",
      "articles": [
        "pins/anchor-card.html",
        "pins/source-window.html",
        "pins/trace-string.html",
        "pins/evidence-tabs.html"
      ]
    },
    {
      "path": "collections/margin-room.html",
      "label": "页边室",
      "articles": [
        "pins/margin-strip.html",
        "pins/swatch-grid.html",
        "pins/foldout-sheet.html",
        "pins/quote-mount.html"
      ]
    },
    {
      "path": "collections/revisit-drawer.html",
      "label": "复看屉",
      "articles": [
        "pins/annotation-pairs.html",
        "pins/revision-layers.html",
        "pins/cross-reference.html",
        "pins/invitation-stub.html"
      ]
    }
  ],
  "toolIndex": "cutting-room.html",
  "tools": [
    "cutting/source-links.html",
    "cutting/tag-intersections.html",
    "cutting/excerpt-windows.html",
    "cutting/swatch-contrast.html",
    "cutting/image-fit.html"
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
    "siteDomain": "{SITE_DOMAIN}",
    "siteName": "{SITE_NAME}",
    "wordmark": "{BRAND_EN}",
    "inviteCode": "{INVITE_CODE}",
    "benefitRate": "{BENEFIT_RATE}",
    "benefitDisclaimer": "{BENEFIT_DISCLAIMER}",
    "affiliateUrl": "{AFFILIATE_URL}"
  }
}
```

## 全部变量登记

- `{ABOUT_CONTACT_NOTE}`
- `{ABOUT_DESC}`
- `{ABOUT_HEAD_1}`
- `{ABOUT_HEAD_2}`
- `{ABOUT_HEAD_3}`
- `{ABOUT_HEAD_4}`
- `{ABOUT_INTRO}`
- `{ABOUT_MODIFIED}`
- `{ABOUT_TEXT_1}`
- `{ABOUT_TEXT_2}`
- `{ABOUT_TEXT_3}`
- `{ABOUT_TEXT_4}`
- `{AFFILIATE_DISCLOSURE}`
- `{AFFILIATE_INTRO}`
- `{AFFILIATE_LABEL}`
- `{AFFILIATE_TITLE}`
- `{AFFILIATE_URL}`
- `{AUTHOR_BIO}`
- `{AUTHOR_NAME}`
- `{BENEFIT_DISCLAIMER}`
- `{BENEFIT_RATE}`
- `{BRAND_EN}`
- `{C10_CHECKED}`
- `{C10_CLOSING_TEXT}`
- `{C10_CLOSING_TITLE}`
- `{C10_COVER_ALT}`
- `{C10_COVER_CAPTION}`
- `{C10_FAQ_A_1}`
- `{C10_FAQ_A_2}`
- `{C10_FAQ_A_3}`
- `{C10_FAQ_Q_1}`
- `{C10_FAQ_Q_2}`
- `{C10_FAQ_Q_3}`
- `{C10_FAQ_TITLE}`
- `{C10_H2_1}`
- `{C10_H2_2}`
- `{C10_H2_3}`
- `{C10_H2_4}`
- `{C10_MODIFIED}`
- `{C10_MODULE_HEAD_1}`
- `{C10_MODULE_HEAD_2}`
- `{C10_MODULE_HEAD_3}`
- `{C10_MODULE_TEXT_1}`
- `{C10_MODULE_TEXT_2}`
- `{C10_MODULE_TEXT_3}`
- `{C10_PUBLISHED}`
- `{C10_QUOTE_SOURCE}`
- `{C10_QUOTE}`
- `{C10_SOURCES_TITLE}`
- `{C10_SOURCE_LABEL_1}`
- `{C10_SOURCE_LABEL_2}`
- `{C10_SOURCE_NOTE_1}`
- `{C10_SOURCE_NOTE_2}`
- `{C10_SOURCE_URL_1}`
- `{C10_SOURCE_URL_2}`
- `{C10_STATUS}`
- `{C10_SUMMARY}`
- `{C10_TABLE_CAPTION}`
- `{C10_TABLE_CELL_1_1}`
- `{C10_TABLE_CELL_1_2}`
- `{C10_TABLE_CELL_2_1}`
- `{C10_TABLE_CELL_2_2}`
- `{C10_TABLE_CELL_3_1}`
- `{C10_TABLE_CELL_3_2}`
- `{C10_TABLE_COL_1}`
- `{C10_TABLE_COL_2}`
- `{C10_TABLE_COL_3}`
- `{C10_TABLE_ROW_1}`
- `{C10_TABLE_ROW_2}`
- `{C10_TABLE_ROW_3}`
- `{C10_TEXT_1}`
- `{C10_TEXT_2}`
- `{C10_TEXT_3}`
- `{C10_TEXT_4}`
- `{C10_TITLE}`
- `{C11_CHECKED}`
- `{C11_CLOSING_TEXT}`
- `{C11_CLOSING_TITLE}`
- `{C11_COVER_ALT}`
- `{C11_COVER_CAPTION}`
- `{C11_FAQ_A_1}`
- `{C11_FAQ_A_2}`
- `{C11_FAQ_Q_1}`
- `{C11_FAQ_Q_2}`
- `{C11_FAQ_TITLE}`
- `{C11_H2_1}`
- `{C11_H2_2}`
- `{C11_H2_3}`
- `{C11_MODIFIED}`
- `{C11_MODULE_HEAD_1}`
- `{C11_MODULE_HEAD_2}`
- `{C11_MODULE_TEXT_1}`
- `{C11_MODULE_TEXT_2}`
- `{C11_MODULE_TEXT_3}`
- `{C11_PUBLISHED}`
- `{C11_QUOTE_SOURCE}`
- `{C11_QUOTE}`
- `{C11_RSS_DATE}`
- `{C11_SOURCES_TITLE}`
- `{C11_SOURCE_LABEL_1}`
- `{C11_SOURCE_LABEL_2}`
- `{C11_SOURCE_NOTE_1}`
- `{C11_SOURCE_NOTE_2}`
- `{C11_SOURCE_URL_1}`
- `{C11_SOURCE_URL_2}`
- `{C11_STATUS}`
- `{C11_SUMMARY}`
- `{C11_TABLE_CAPTION}`
- `{C11_TABLE_CELL_1_1}`
- `{C11_TABLE_CELL_1_2}`
- `{C11_TABLE_CELL_2_1}`
- `{C11_TABLE_CELL_2_2}`
- `{C11_TABLE_CELL_3_1}`
- `{C11_TABLE_CELL_3_2}`
- `{C11_TABLE_COL_1}`
- `{C11_TABLE_COL_2}`
- `{C11_TABLE_COL_3}`
- `{C11_TABLE_ROW_1}`
- `{C11_TABLE_ROW_2}`
- `{C11_TABLE_ROW_3}`
- `{C11_TEXT_1}`
- `{C11_TEXT_2}`
- `{C11_TEXT_3}`
- `{C11_TITLE}`
- `{C12_CHECKED}`
- `{C12_CLOSING_TEXT}`
- `{C12_CLOSING_TITLE}`
- `{C12_COVER_ALT}`
- `{C12_COVER_CAPTION}`
- `{C12_FAQ_A_1}`
- `{C12_FAQ_A_2}`
- `{C12_FAQ_A_3}`
- `{C12_FAQ_A_4}`
- `{C12_FAQ_Q_1}`
- `{C12_FAQ_Q_2}`
- `{C12_FAQ_Q_3}`
- `{C12_FAQ_Q_4}`
- `{C12_FAQ_TITLE}`
- `{C12_H2_1}`
- `{C12_H2_2}`
- `{C12_H2_3}`
- `{C12_H2_4}`
- `{C12_H2_5}`
- `{C12_MODIFIED}`
- `{C12_MODULE_HEAD_1}`
- `{C12_MODULE_HEAD_2}`
- `{C12_MODULE_HEAD_3}`
- `{C12_MODULE_TEXT_1}`
- `{C12_MODULE_TEXT_2}`
- `{C12_MODULE_TEXT_3}`
- `{C12_PUBLISHED}`
- `{C12_QUOTE_SOURCE}`
- `{C12_QUOTE}`
- `{C12_SOURCES_TITLE}`
- `{C12_SOURCE_LABEL_1}`
- `{C12_SOURCE_LABEL_2}`
- `{C12_SOURCE_NOTE_1}`
- `{C12_SOURCE_NOTE_2}`
- `{C12_SOURCE_URL_1}`
- `{C12_SOURCE_URL_2}`
- `{C12_STATUS}`
- `{C12_SUMMARY}`
- `{C12_TABLE_CAPTION}`
- `{C12_TABLE_CELL_1_1}`
- `{C12_TABLE_CELL_1_2}`
- `{C12_TABLE_CELL_2_1}`
- `{C12_TABLE_CELL_2_2}`
- `{C12_TABLE_CELL_3_1}`
- `{C12_TABLE_CELL_3_2}`
- `{C12_TABLE_COL_1}`
- `{C12_TABLE_COL_2}`
- `{C12_TABLE_COL_3}`
- `{C12_TABLE_ROW_1}`
- `{C12_TABLE_ROW_2}`
- `{C12_TABLE_ROW_3}`
- `{C12_TEXT_1}`
- `{C12_TEXT_2}`
- `{C12_TEXT_3}`
- `{C12_TEXT_4}`
- `{C12_TEXT_5}`
- `{C12_TITLE}`
- `{C1_CHECKED}`
- `{C1_CLOSING_TEXT}`
- `{C1_CLOSING_TITLE}`
- `{C1_COVER_ALT}`
- `{C1_COVER_CAPTION}`
- `{C1_FAQ_A_1}`
- `{C1_FAQ_A_2}`
- `{C1_FAQ_A_3}`
- `{C1_FAQ_Q_1}`
- `{C1_FAQ_Q_2}`
- `{C1_FAQ_Q_3}`
- `{C1_FAQ_TITLE}`
- `{C1_H2_1}`
- `{C1_H2_2}`
- `{C1_H2_3}`
- `{C1_H2_4}`
- `{C1_MODIFIED}`
- `{C1_MODULE_HEAD_1}`
- `{C1_MODULE_HEAD_2}`
- `{C1_MODULE_HEAD_3}`
- `{C1_MODULE_TEXT_1}`
- `{C1_MODULE_TEXT_2}`
- `{C1_MODULE_TEXT_3}`
- `{C1_PUBLISHED}`
- `{C1_QUOTE_SOURCE}`
- `{C1_QUOTE}`
- `{C1_RSS_DATE}`
- `{C1_SOURCES_TITLE}`
- `{C1_SOURCE_LABEL_1}`
- `{C1_SOURCE_LABEL_2}`
- `{C1_SOURCE_NOTE_1}`
- `{C1_SOURCE_NOTE_2}`
- `{C1_SOURCE_URL_1}`
- `{C1_SOURCE_URL_2}`
- `{C1_STATUS}`
- `{C1_SUMMARY}`
- `{C1_TABLE_CAPTION}`
- `{C1_TABLE_CELL_1_1}`
- `{C1_TABLE_CELL_1_2}`
- `{C1_TABLE_CELL_2_1}`
- `{C1_TABLE_CELL_2_2}`
- `{C1_TABLE_CELL_3_1}`
- `{C1_TABLE_CELL_3_2}`
- `{C1_TABLE_COL_1}`
- `{C1_TABLE_COL_2}`
- `{C1_TABLE_COL_3}`
- `{C1_TABLE_ROW_1}`
- `{C1_TABLE_ROW_2}`
- `{C1_TABLE_ROW_3}`
- `{C1_TEXT_1}`
- `{C1_TEXT_2}`
- `{C1_TEXT_3}`
- `{C1_TEXT_4}`
- `{C1_TITLE}`
- `{C2_CHECKED}`
- `{C2_CLOSING_TEXT}`
- `{C2_CLOSING_TITLE}`
- `{C2_COVER_ALT}`
- `{C2_COVER_CAPTION}`
- `{C2_FAQ_A_1}`
- `{C2_FAQ_A_2}`
- `{C2_FAQ_Q_1}`
- `{C2_FAQ_Q_2}`
- `{C2_FAQ_TITLE}`
- `{C2_H2_1}`
- `{C2_H2_2}`
- `{C2_H2_3}`
- `{C2_MODIFIED}`
- `{C2_MODULE_HEAD_1}`
- `{C2_MODULE_HEAD_2}`
- `{C2_MODULE_HEAD_3}`
- `{C2_MODULE_TEXT_1}`
- `{C2_MODULE_TEXT_2}`
- `{C2_MODULE_TEXT_3}`
- `{C2_PUBLISHED}`
- `{C2_QUOTE_SOURCE}`
- `{C2_QUOTE}`
- `{C2_RSS_DATE}`
- `{C2_SOURCES_TITLE}`
- `{C2_SOURCE_LABEL_1}`
- `{C2_SOURCE_LABEL_2}`
- `{C2_SOURCE_NOTE_1}`
- `{C2_SOURCE_NOTE_2}`
- `{C2_SOURCE_URL_1}`
- `{C2_SOURCE_URL_2}`
- `{C2_STATUS}`
- `{C2_SUMMARY}`
- `{C2_TABLE_CAPTION}`
- `{C2_TABLE_CELL_1_1}`
- `{C2_TABLE_CELL_1_2}`
- `{C2_TABLE_CELL_2_1}`
- `{C2_TABLE_CELL_2_2}`
- `{C2_TABLE_CELL_3_1}`
- `{C2_TABLE_CELL_3_2}`
- `{C2_TABLE_COL_1}`
- `{C2_TABLE_COL_2}`
- `{C2_TABLE_COL_3}`
- `{C2_TABLE_ROW_1}`
- `{C2_TABLE_ROW_2}`
- `{C2_TABLE_ROW_3}`
- `{C2_TEXT_1}`
- `{C2_TEXT_2}`
- `{C2_TEXT_3}`
- `{C2_TITLE}`
- `{C3_CHECKED}`
- `{C3_CLOSING_TEXT}`
- `{C3_CLOSING_TITLE}`
- `{C3_COVER_ALT}`
- `{C3_COVER_CAPTION}`
- `{C3_FAQ_A_1}`
- `{C3_FAQ_A_2}`
- `{C3_FAQ_A_3}`
- `{C3_FAQ_A_4}`
- `{C3_FAQ_Q_1}`
- `{C3_FAQ_Q_2}`
- `{C3_FAQ_Q_3}`
- `{C3_FAQ_Q_4}`
- `{C3_FAQ_TITLE}`
- `{C3_H2_1}`
- `{C3_H2_2}`
- `{C3_H2_3}`
- `{C3_H2_4}`
- `{C3_H2_5}`
- `{C3_MODIFIED}`
- `{C3_MODULE_HEAD_1}`
- `{C3_MODULE_HEAD_2}`
- `{C3_MODULE_HEAD_3}`
- `{C3_MODULE_TEXT_1}`
- `{C3_MODULE_TEXT_2}`
- `{C3_MODULE_TEXT_3}`
- `{C3_PUBLISHED}`
- `{C3_QUOTE_SOURCE}`
- `{C3_QUOTE}`
- `{C3_RSS_DATE}`
- `{C3_SOURCES_TITLE}`
- `{C3_SOURCE_LABEL_1}`
- `{C3_SOURCE_LABEL_2}`
- `{C3_SOURCE_NOTE_1}`
- `{C3_SOURCE_NOTE_2}`
- `{C3_SOURCE_URL_1}`
- `{C3_SOURCE_URL_2}`
- `{C3_STATUS}`
- `{C3_SUMMARY}`
- `{C3_TABLE_CAPTION}`
- `{C3_TABLE_CELL_1_1}`
- `{C3_TABLE_CELL_1_2}`
- `{C3_TABLE_CELL_2_1}`
- `{C3_TABLE_CELL_2_2}`
- `{C3_TABLE_CELL_3_1}`
- `{C3_TABLE_CELL_3_2}`
- `{C3_TABLE_COL_1}`
- `{C3_TABLE_COL_2}`
- `{C3_TABLE_COL_3}`
- `{C3_TABLE_ROW_1}`
- `{C3_TABLE_ROW_2}`
- `{C3_TABLE_ROW_3}`
- `{C3_TEXT_1}`
- `{C3_TEXT_2}`
- `{C3_TEXT_3}`
- `{C3_TEXT_4}`
- `{C3_TEXT_5}`
- `{C3_TITLE}`
- `{C4_CHECKED}`
- `{C4_CLOSING_TEXT}`
- `{C4_CLOSING_TITLE}`
- `{C4_COVER_ALT}`
- `{C4_COVER_CAPTION}`
- `{C4_FAQ_A_1}`
- `{C4_FAQ_A_2}`
- `{C4_FAQ_A_3}`
- `{C4_FAQ_Q_1}`
- `{C4_FAQ_Q_2}`
- `{C4_FAQ_Q_3}`
- `{C4_FAQ_TITLE}`
- `{C4_H2_1}`
- `{C4_H2_2}`
- `{C4_H2_3}`
- `{C4_H2_4}`
- `{C4_MODIFIED}`
- `{C4_MODULE_HEAD_1}`
- `{C4_MODULE_HEAD_2}`
- `{C4_MODULE_HEAD_3}`
- `{C4_MODULE_HEAD_4}`
- `{C4_MODULE_TEXT_1}`
- `{C4_MODULE_TEXT_2}`
- `{C4_MODULE_TEXT_3}`
- `{C4_MODULE_TEXT_4}`
- `{C4_PUBLISHED}`
- `{C4_QUOTE_SOURCE}`
- `{C4_QUOTE}`
- `{C4_SOURCES_TITLE}`
- `{C4_SOURCE_LABEL_1}`
- `{C4_SOURCE_LABEL_2}`
- `{C4_SOURCE_NOTE_1}`
- `{C4_SOURCE_NOTE_2}`
- `{C4_SOURCE_URL_1}`
- `{C4_SOURCE_URL_2}`
- `{C4_STATUS}`
- `{C4_SUMMARY}`
- `{C4_TABLE_CAPTION}`
- `{C4_TABLE_CELL_1_1}`
- `{C4_TABLE_CELL_1_2}`
- `{C4_TABLE_CELL_2_1}`
- `{C4_TABLE_CELL_2_2}`
- `{C4_TABLE_CELL_3_1}`
- `{C4_TABLE_CELL_3_2}`
- `{C4_TABLE_COL_1}`
- `{C4_TABLE_COL_2}`
- `{C4_TABLE_COL_3}`
- `{C4_TABLE_ROW_1}`
- `{C4_TABLE_ROW_2}`
- `{C4_TABLE_ROW_3}`
- `{C4_TEXT_1}`
- `{C4_TEXT_2}`
- `{C4_TEXT_3}`
- `{C4_TEXT_4}`
- `{C4_TITLE}`
- `{C5_CHECKED}`
- `{C5_CLOSING_TEXT}`
- `{C5_CLOSING_TITLE}`
- `{C5_COVER_ALT}`
- `{C5_COVER_CAPTION}`
- `{C5_FAQ_A_1}`
- `{C5_FAQ_A_2}`
- `{C5_FAQ_Q_1}`
- `{C5_FAQ_Q_2}`
- `{C5_FAQ_TITLE}`
- `{C5_H2_1}`
- `{C5_H2_2}`
- `{C5_H2_3}`
- `{C5_MODIFIED}`
- `{C5_MODULE_HEAD_1}`
- `{C5_MODULE_HEAD_2}`
- `{C5_MODULE_HEAD_3}`
- `{C5_MODULE_HEAD_4}`
- `{C5_MODULE_TEXT_1}`
- `{C5_MODULE_TEXT_2}`
- `{C5_MODULE_TEXT_3}`
- `{C5_MODULE_TEXT_4}`
- `{C5_PUBLISHED}`
- `{C5_QUOTE_SOURCE}`
- `{C5_QUOTE}`
- `{C5_RSS_DATE}`
- `{C5_SOURCES_TITLE}`
- `{C5_SOURCE_LABEL_1}`
- `{C5_SOURCE_LABEL_2}`
- `{C5_SOURCE_NOTE_1}`
- `{C5_SOURCE_NOTE_2}`
- `{C5_SOURCE_URL_1}`
- `{C5_SOURCE_URL_2}`
- `{C5_STATUS}`
- `{C5_SUMMARY}`
- `{C5_TABLE_CAPTION}`
- `{C5_TABLE_CELL_1_1}`
- `{C5_TABLE_CELL_1_2}`
- `{C5_TABLE_CELL_2_1}`
- `{C5_TABLE_CELL_2_2}`
- `{C5_TABLE_CELL_3_1}`
- `{C5_TABLE_CELL_3_2}`
- `{C5_TABLE_COL_1}`
- `{C5_TABLE_COL_2}`
- `{C5_TABLE_COL_3}`
- `{C5_TABLE_ROW_1}`
- `{C5_TABLE_ROW_2}`
- `{C5_TABLE_ROW_3}`
- `{C5_TEXT_1}`
- `{C5_TEXT_2}`
- `{C5_TEXT_3}`
- `{C5_TITLE}`
- `{C6_CHECKED}`
- `{C6_CLOSING_TEXT}`
- `{C6_CLOSING_TITLE}`
- `{C6_COVER_ALT}`
- `{C6_COVER_CAPTION}`
- `{C6_FAQ_A_1}`
- `{C6_FAQ_A_2}`
- `{C6_FAQ_A_3}`
- `{C6_FAQ_A_4}`
- `{C6_FAQ_Q_1}`
- `{C6_FAQ_Q_2}`
- `{C6_FAQ_Q_3}`
- `{C6_FAQ_Q_4}`
- `{C6_FAQ_TITLE}`
- `{C6_H2_1}`
- `{C6_H2_2}`
- `{C6_H2_3}`
- `{C6_H2_4}`
- `{C6_H2_5}`
- `{C6_MODIFIED}`
- `{C6_MODULE_HEAD_1}`
- `{C6_MODULE_HEAD_2}`
- `{C6_MODULE_HEAD_3}`
- `{C6_MODULE_TEXT_1}`
- `{C6_MODULE_TEXT_2}`
- `{C6_MODULE_TEXT_3}`
- `{C6_PUBLISHED}`
- `{C6_QUOTE_SOURCE}`
- `{C6_QUOTE}`
- `{C6_RSS_DATE}`
- `{C6_SOURCES_TITLE}`
- `{C6_SOURCE_LABEL_1}`
- `{C6_SOURCE_LABEL_2}`
- `{C6_SOURCE_NOTE_1}`
- `{C6_SOURCE_NOTE_2}`
- `{C6_SOURCE_URL_1}`
- `{C6_SOURCE_URL_2}`
- `{C6_STATUS}`
- `{C6_SUMMARY}`
- `{C6_TABLE_CAPTION}`
- `{C6_TABLE_CELL_1_1}`
- `{C6_TABLE_CELL_1_2}`
- `{C6_TABLE_CELL_2_1}`
- `{C6_TABLE_CELL_2_2}`
- `{C6_TABLE_CELL_3_1}`
- `{C6_TABLE_CELL_3_2}`
- `{C6_TABLE_COL_1}`
- `{C6_TABLE_COL_2}`
- `{C6_TABLE_COL_3}`
- `{C6_TABLE_ROW_1}`
- `{C6_TABLE_ROW_2}`
- `{C6_TABLE_ROW_3}`
- `{C6_TEXT_1}`
- `{C6_TEXT_2}`
- `{C6_TEXT_3}`
- `{C6_TEXT_4}`
- `{C6_TEXT_5}`
- `{C6_TITLE}`
- `{C7_CHECKED}`
- `{C7_CLOSING_TEXT}`
- `{C7_CLOSING_TITLE}`
- `{C7_COVER_ALT}`
- `{C7_COVER_CAPTION}`
- `{C7_FAQ_A_1}`
- `{C7_FAQ_A_2}`
- `{C7_FAQ_A_3}`
- `{C7_FAQ_Q_1}`
- `{C7_FAQ_Q_2}`
- `{C7_FAQ_Q_3}`
- `{C7_FAQ_TITLE}`
- `{C7_H2_1}`
- `{C7_H2_2}`
- `{C7_H2_3}`
- `{C7_H2_4}`
- `{C7_MODIFIED}`
- `{C7_MODULE_HEAD_1}`
- `{C7_MODULE_HEAD_2}`
- `{C7_MODULE_HEAD_3}`
- `{C7_MODULE_TEXT_1}`
- `{C7_MODULE_TEXT_2}`
- `{C7_MODULE_TEXT_3}`
- `{C7_PUBLISHED}`
- `{C7_QUOTE_SOURCE}`
- `{C7_QUOTE}`
- `{C7_SOURCES_TITLE}`
- `{C7_SOURCE_LABEL_1}`
- `{C7_SOURCE_LABEL_2}`
- `{C7_SOURCE_NOTE_1}`
- `{C7_SOURCE_NOTE_2}`
- `{C7_SOURCE_URL_1}`
- `{C7_SOURCE_URL_2}`
- `{C7_STATUS}`
- `{C7_SUMMARY}`
- `{C7_TABLE_CAPTION}`
- `{C7_TABLE_CELL_1_1}`
- `{C7_TABLE_CELL_1_2}`
- `{C7_TABLE_CELL_2_1}`
- `{C7_TABLE_CELL_2_2}`
- `{C7_TABLE_CELL_3_1}`
- `{C7_TABLE_CELL_3_2}`
- `{C7_TABLE_COL_1}`
- `{C7_TABLE_COL_2}`
- `{C7_TABLE_COL_3}`
- `{C7_TABLE_ROW_1}`
- `{C7_TABLE_ROW_2}`
- `{C7_TABLE_ROW_3}`
- `{C7_TEXT_1}`
- `{C7_TEXT_2}`
- `{C7_TEXT_3}`
- `{C7_TEXT_4}`
- `{C7_TITLE}`
- `{C8_CHECKED}`
- `{C8_CLOSING_TEXT}`
- `{C8_CLOSING_TITLE}`
- `{C8_COVER_ALT}`
- `{C8_COVER_CAPTION}`
- `{C8_FAQ_A_1}`
- `{C8_FAQ_A_2}`
- `{C8_FAQ_Q_1}`
- `{C8_FAQ_Q_2}`
- `{C8_FAQ_TITLE}`
- `{C8_H2_1}`
- `{C8_H2_2}`
- `{C8_H2_3}`
- `{C8_MODIFIED}`
- `{C8_MODULE_HEAD_1}`
- `{C8_MODULE_HEAD_2}`
- `{C8_MODULE_HEAD_3}`
- `{C8_MODULE_TEXT_1}`
- `{C8_MODULE_TEXT_2}`
- `{C8_MODULE_TEXT_3}`
- `{C8_PUBLISHED}`
- `{C8_QUOTE_SOURCE}`
- `{C8_QUOTE}`
- `{C8_RSS_DATE}`
- `{C8_SOURCES_TITLE}`
- `{C8_SOURCE_LABEL_1}`
- `{C8_SOURCE_LABEL_2}`
- `{C8_SOURCE_NOTE_1}`
- `{C8_SOURCE_NOTE_2}`
- `{C8_SOURCE_URL_1}`
- `{C8_SOURCE_URL_2}`
- `{C8_STATUS}`
- `{C8_SUMMARY}`
- `{C8_TABLE_CAPTION}`
- `{C8_TABLE_CELL_1_1}`
- `{C8_TABLE_CELL_1_2}`
- `{C8_TABLE_CELL_2_1}`
- `{C8_TABLE_CELL_2_2}`
- `{C8_TABLE_CELL_3_1}`
- `{C8_TABLE_CELL_3_2}`
- `{C8_TABLE_COL_1}`
- `{C8_TABLE_COL_2}`
- `{C8_TABLE_COL_3}`
- `{C8_TABLE_ROW_1}`
- `{C8_TABLE_ROW_2}`
- `{C8_TABLE_ROW_3}`
- `{C8_TEXT_1}`
- `{C8_TEXT_2}`
- `{C8_TEXT_3}`
- `{C8_TITLE}`
- `{C9_CHECKED}`
- `{C9_CLOSING_TEXT}`
- `{C9_CLOSING_TITLE}`
- `{C9_COVER_ALT}`
- `{C9_COVER_CAPTION}`
- `{C9_FAQ_A_1}`
- `{C9_FAQ_A_2}`
- `{C9_FAQ_A_3}`
- `{C9_FAQ_A_4}`
- `{C9_FAQ_Q_1}`
- `{C9_FAQ_Q_2}`
- `{C9_FAQ_Q_3}`
- `{C9_FAQ_Q_4}`
- `{C9_FAQ_TITLE}`
- `{C9_H2_1}`
- `{C9_H2_2}`
- `{C9_H2_3}`
- `{C9_H2_4}`
- `{C9_H2_5}`
- `{C9_MODIFIED}`
- `{C9_MODULE_HEAD_2}`
- `{C9_MODULE_HEAD_3}`
- `{C9_MODULE_TEXT_1}`
- `{C9_MODULE_TEXT_2}`
- `{C9_MODULE_TEXT_3}`
- `{C9_PUBLISHED}`
- `{C9_QUOTE_SOURCE}`
- `{C9_QUOTE}`
- `{C9_RSS_DATE}`
- `{C9_SOURCES_TITLE}`
- `{C9_SOURCE_LABEL_1}`
- `{C9_SOURCE_LABEL_2}`
- `{C9_SOURCE_NOTE_1}`
- `{C9_SOURCE_NOTE_2}`
- `{C9_SOURCE_URL_1}`
- `{C9_SOURCE_URL_2}`
- `{C9_STATUS}`
- `{C9_SUMMARY}`
- `{C9_TABLE_CAPTION}`
- `{C9_TABLE_CELL_1_1}`
- `{C9_TABLE_CELL_1_2}`
- `{C9_TABLE_CELL_2_1}`
- `{C9_TABLE_CELL_2_2}`
- `{C9_TABLE_CELL_3_1}`
- `{C9_TABLE_CELL_3_2}`
- `{C9_TABLE_COL_1}`
- `{C9_TABLE_COL_2}`
- `{C9_TABLE_COL_3}`
- `{C9_TABLE_ROW_1}`
- `{C9_TABLE_ROW_2}`
- `{C9_TABLE_ROW_3}`
- `{C9_TEXT_1}`
- `{C9_TEXT_2}`
- `{C9_TEXT_3}`
- `{C9_TEXT_4}`
- `{C9_TEXT_5}`
- `{C9_TITLE}`
- `{CONTACT_CONTACT_NOTE}`
- `{CONTACT_DESC}`
- `{CONTACT_EMAIL}`
- `{CONTACT_HEAD_1}`
- `{CONTACT_HEAD_2}`
- `{CONTACT_HEAD_3}`
- `{CONTACT_INTRO}`
- `{CONTACT_MODIFIED}`
- `{CONTACT_TEXT_1}`
- `{CONTACT_TEXT_2}`
- `{CONTACT_TEXT_3}`
- `{CORRECTIONS_CONTACT_NOTE}`
- `{CORRECTIONS_DESC}`
- `{CORRECTIONS_HEAD_1}`
- `{CORRECTIONS_HEAD_2}`
- `{CORRECTIONS_HEAD_3}`
- `{CORRECTIONS_INTRO}`
- `{CORRECTIONS_MODIFIED}`
- `{CORRECTIONS_TEXT_1}`
- `{CORRECTIONS_TEXT_2}`
- `{CORRECTIONS_TEXT_3}`
- `{DISCLAIMER_CONTACT_NOTE}`
- `{DISCLAIMER_DESC}`
- `{DISCLAIMER_HEAD_1}`
- `{DISCLAIMER_HEAD_2}`
- `{DISCLAIMER_HEAD_3}`
- `{DISCLAIMER_HEAD_4}`
- `{DISCLAIMER_INTRO}`
- `{DISCLAIMER_MODIFIED}`
- `{DISCLAIMER_TEXT_1}`
- `{DISCLAIMER_TEXT_2}`
- `{DISCLAIMER_TEXT_3}`
- `{DISCLAIMER_TEXT_4}`
- `{DISCLOSURE_CONTACT_NOTE}`
- `{DISCLOSURE_DESC}`
- `{DISCLOSURE_HEAD_1}`
- `{DISCLOSURE_HEAD_2}`
- `{DISCLOSURE_HEAD_3}`
- `{DISCLOSURE_HEAD_4}`
- `{DISCLOSURE_HEAD_5}`
- `{DISCLOSURE_INTRO}`
- `{DISCLOSURE_MODIFIED}`
- `{DISCLOSURE_TEXT_1}`
- `{DISCLOSURE_TEXT_2}`
- `{DISCLOSURE_TEXT_3}`
- `{DISCLOSURE_TEXT_4}`
- `{DISCLOSURE_TEXT_5}`
- `{EDITORIAL_CONTACT_NOTE}`
- `{EDITORIAL_DESC}`
- `{EDITORIAL_HEAD_1}`
- `{EDITORIAL_HEAD_2}`
- `{EDITORIAL_HEAD_3}`
- `{EDITORIAL_HEAD_4}`
- `{EDITORIAL_INTRO}`
- `{EDITORIAL_MODIFIED}`
- `{EDITORIAL_TEXT_1}`
- `{EDITORIAL_TEXT_2}`
- `{EDITORIAL_TEXT_3}`
- `{EDITORIAL_TEXT_4}`
- `{HERO_DESCRIPTION}`
- `{HERO_EYEBROW}`
- `{HERO_TITLE}`
- `{HOME_FEATURED_LABEL}`
- `{HOME_ISSUE_LABEL}`
- `{HOME_LATEST_LABEL}`
- `{HOME_LINKS_LABEL}`
- `{HOME_METHOD_1}`
- `{HOME_METHOD_2}`
- `{HOME_METHOD_3}`
- `{HOME_QUOTE}`
- `{HOME_TOOLS_TITLE}`
- `{INDEPENDENCE_NOTE}`
- `{INDEX_DESC}`
- `{INDEX_INTRO}`
- `{INVITE_CODE}`
- `{INVITE_LABEL}`
- `{LANG}`
- `{MAP_NOTE}`
- `{MAP_STEP_1}`
- `{MAP_STEP_2}`
- `{MAP_STEP_3}`
- `{MAP_STEP_4}`
- `{MAP_TITLE}`
- `{MARGIN_ROOM_DESC}`
- `{MARGIN_ROOM_INTRO}`
- `{PRIVACY_CONTACT_NOTE}`
- `{PRIVACY_DESC}`
- `{PRIVACY_HEAD_1}`
- `{PRIVACY_HEAD_2}`
- `{PRIVACY_HEAD_3}`
- `{PRIVACY_HEAD_4}`
- `{PRIVACY_HEAD_5}`
- `{PRIVACY_INTRO}`
- `{PRIVACY_MODIFIED}`
- `{PRIVACY_TEXT_1}`
- `{PRIVACY_TEXT_2}`
- `{PRIVACY_TEXT_3}`
- `{PRIVACY_TEXT_4}`
- `{PRIVACY_TEXT_5}`
- `{REVISIT_DRAWER_DESC}`
- `{REVISIT_DRAWER_INTRO}`
- `{RISK_NOTE}`
- `{SECURITY_EMAIL}`
- `{SECURITY_EXPIRES}`
- `{SEO_TITLE}`
- `{SITE_DESC}`
- `{SITE_DOMAIN}`
- `{SITE_NAME}`
- `{SITE_TAGLINE}`
- `{SOURCE_BENCH_DESC}`
- `{SOURCE_BENCH_INTRO}`
- `{TOOLS_DESC}`
- `{TOOLS_INTRO}`
- `{WALL_TITLE}`

## 验收记录

2026-09-04 · workflow-ready v2 完整框架验收通过，仅代表模板 UI 与功能就绪。

- 84 个文件、34 个 HTML（30 个可索引页面、独立 404、3 个 noindex 兼容入口）；三项静态审计通过，本套 P0/P1/P2 均为 0。
- 原 css/glue.css 字节保持不变，首页原有 15 个类名全部保留；雾青纸面、胶带卡墙、证据路径图和三枚分类入口延续。三种阅读开场、十二拼贴组件、三个交叉分组、七页站务和五件本地工具完整。
- 34 页 × 1440/768/390/360px × 明暗主题，共 272 次最终渲染；518 项功能、算法与边界检查全部通过，控制台和网络错误为 0。复验脚本：`tools/qa/060-mist-collage-browser.js`；本地证据：`artifacts/qa/060-mist-collage-v2-2026-09-04/`。
- 来源链接覆盖大小写/默认端口/点段/片段合并、保留查询顺序、IDN、IPv6、Unicode 路径、30 行/2000 字符边界，以及凭据/控制字符/反斜杠/协议/错误转义拒绝；无效行只给行号和原因，不回显可能敏感的输入。
- 标签共现覆盖 40 卡、12 标签、NFKC、大小写、重复/空行/分隔符/长度边界，并以 8 组独立集合交并算例核对每一标签对。分窗覆盖码点、空格/换行/制表、组合重音/ZWJ/旗帜、4000 码点、500 窗上限，独立验证逐窗内容、全覆盖、重复计量和不生成冗余尾窗。
- 色签对比覆盖黑白、同色、全角、AA/AAA 临界附近、sRGB 分段边界、对称性与非法格式；以独立通道查表算法复验比值和未舍入阈值。图像适配覆盖 contain/cover、极端纵横比、20000px 边界、半分位舍入，以独立浮点几何核对显示尺寸、偏移及原图裁切框，生产逻辑全程采用 BigInt 分数计算。
- 首屏真复制、主题跟随系统与持久化、移动菜单焦点及 Escape、首页/索引组合筛选与清空、原生目录、唯一推广 UI 槽位和邻近披露、404 三态及深层真实 404、无 JS 阅读/导航/目录及禁用提交、原生粘贴与 Enter/Tab、复制拒绝和异步旧结果失效、reduced-motion、阅读进度、明暗原生控件与对比度通过。
- 人工复核首页、目录、三种开场、全部十二组件、五工具输入与结果、移动表格、暗色错误及独立封面。首轮发现所有页脚 RSS 控件宽度不足，已修为至少 44px；随后修正平板和手机胶带装饰遮字，并新增几何遮挡检查，最终完整重验通过。未把前两轮结果冒充最终无问题版本。
- 782 个文字/变量槽位已登记，34 块 JSON-LD 可解析，82 个页内锚点有效，12 张 PNG 封面内容互异；本地资源、非符号链接及敏感模式扫描通过。
- 相邻 059 的类名重合 1.9%、DOM 标签二元组 32.6%、CSS 属性序列 34.2%；全库类名最高 9.1%，仅历史两组 CSS 参考警告。这些是差异化参考指标，不是不可识别保证。
- 原动态源包忠实度仍未核验，不作为本轮 UI 就绪证明。后续填入真实内容仍须进行单站事实、合规与发布验收；本套不代写业务文章或注册教程，未调用 CI，未部署生产。
