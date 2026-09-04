# 075 Denim Catalog · 工作流 v2 接入契约

## 范围与风格

只制作完整网站模板，不写业务文章或注册教程，不部署。原 atelier.css 字节保留，新 cutting-room.css 承担完整目录、文章组件、工具、公开说明与响应式。保留原首页全部 dc75 类名、侧边布标、丹宁纸样、黄色车线与 24 格刻度。动态源包未取得，原包忠实度未核验；不得把 UI 验收当作保真证明。

35 个 HTML：31 可索引页、404、3 个 noindex 手动旧入口。十二篇文章框架、四个交叉部门各三篇、五工具、七页公开说明。cornerstone 为容量角色；registrationGuide 只是兼容字段名，指通用出库推广组件页，不指定教程。

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "pattern-book.html",
  "articles": [
    "patterns/grain-map.html",
    "patterns/seam-ledger.html",
    "patterns/source-pocket.html",
    "patterns/notch-sequence.html",
    "patterns/selvage-scope.html",
    "patterns/wash-test.html",
    "patterns/fit-matrix.html",
    "patterns/stitch-history.html",
    "patterns/size-translation.html",
    "patterns/repair-ticket.html",
    "patterns/layout-marker.html",
    "patterns/dispatch-label.html"
  ],
  "cornerstones": [
    "patterns/grain-map.html",
    "patterns/seam-ledger.html"
  ],
  "registrationGuide": "patterns/dispatch-label.html",
  "articleCovers": {
    "patterns/grain-map.html": {
      "display": "assets/cuts/grain-map.webp",
      "og": "assets/cuts/grain-map.png"
    },
    "patterns/seam-ledger.html": {
      "display": "assets/cuts/seam-ledger.webp",
      "og": "assets/cuts/seam-ledger.png"
    },
    "patterns/source-pocket.html": {
      "display": "assets/cuts/source-pocket.webp",
      "og": "assets/cuts/source-pocket.png"
    },
    "patterns/notch-sequence.html": {
      "display": "assets/cuts/notch-sequence.webp",
      "og": "assets/cuts/notch-sequence.png"
    },
    "patterns/selvage-scope.html": {
      "display": "assets/cuts/selvage-scope.webp",
      "og": "assets/cuts/selvage-scope.png"
    },
    "patterns/wash-test.html": {
      "display": "assets/cuts/wash-test.webp",
      "og": "assets/cuts/wash-test.png"
    },
    "patterns/fit-matrix.html": {
      "display": "assets/cuts/fit-matrix.webp",
      "og": "assets/cuts/fit-matrix.png"
    },
    "patterns/stitch-history.html": {
      "display": "assets/cuts/stitch-history.webp",
      "og": "assets/cuts/stitch-history.png"
    },
    "patterns/size-translation.html": {
      "display": "assets/cuts/size-translation.webp",
      "og": "assets/cuts/size-translation.png"
    },
    "patterns/repair-ticket.html": {
      "display": "assets/cuts/repair-ticket.webp",
      "og": "assets/cuts/repair-ticket.png"
    },
    "patterns/layout-marker.html": {
      "display": "assets/cuts/layout-marker.webp",
      "og": "assets/cuts/layout-marker.png"
    },
    "patterns/dispatch-label.html": {
      "display": "assets/cuts/dispatch-label.webp",
      "og": "assets/cuts/dispatch-label.png"
    }
  },
  "categories": [
    {
      "path": "departments/reference-pocket.html",
      "label": "来源口袋",
      "articles": [
        "patterns/grain-map.html",
        "patterns/selvage-scope.html",
        "patterns/size-translation.html"
      ]
    },
    {
      "path": "departments/structure-bench.html",
      "label": "结构裁床",
      "articles": [
        "patterns/seam-ledger.html",
        "patterns/wash-test.html",
        "patterns/repair-ticket.html"
      ]
    },
    {
      "path": "departments/maintenance-rail.html",
      "label": "维护挂轨",
      "articles": [
        "patterns/source-pocket.html",
        "patterns/fit-matrix.html",
        "patterns/layout-marker.html"
      ]
    },
    {
      "path": "departments/dispatch-drawer.html",
      "label": "出库抽屉",
      "articles": [
        "patterns/notch-sequence.html",
        "patterns/stitch-history.html",
        "patterns/dispatch-label.html"
      ]
    }
  ],
  "toolIndex": "tool-cabinet.html",
  "tools": [
    "tools/grid-allocation.html",
    "tools/line-cut-plan.html",
    "tools/heading-notches.html",
    "tools/revision-distance.html",
    "tools/asset-bundle.html"
  ],
  "legal": {
    "about": "atelier-room.html",
    "contact": "repair-post.html",
    "disclosure": "relation-label.html",
    "disclaimer": "wear-scope.html",
    "privacy": "data-pocket.html",
    "corrections": "mending-log.html",
    "editorial": "cutting-standard.html"
  },
  "error404": "404.html",
  "robots": "robots.txt",
  "sitemap": "sitemap.xml",
  "feed": "feed.xml",
  "security": ".well-known/security.txt",
  "favicon": "favicon.ico",
  "appleTouchIcon": "apple-touch-icon.png",
  "socialImage": "assets/catalog-cover.png",
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

## 后续 AI 接手

- 只填经核实的正文与变量，不再补 UI、工具、目录、资源或移动端样式；保留页面角色、锚点、表单、data 属性与 ARIA。
- 三种文章开场、十二种组件已建好：经纬图例、线缝账、来源口袋、缺口序列、布边范围、洗测状态、适配矩阵、针脚历史、尺码标尺、修补工单、排料图、出库标签；不要统一成同款卡片。
- FAQ、目录与三种收尾已建好；表格局部滚动，details 无需 JavaScript。事实、作者经历、来源和日期不得虚构。
- 首页形态 A 只有邀请码复制、弹性利益点和脚注，没有推广直链。dispatch-label.html 恰留一处静态推广槽；保留 target、rel 四值与紧邻披露。
- 首页可到达全部可索引页面；旧入口不自动跳转。纸样图只是抽象编辑视觉，不是真实商品、证据或检测结果。
- QA 示例文案只用于本地渲染，不能作为正式文章发布。

## 变量格式与容量

BRAND_EN 为 3–24 个英文或罗马字；首页标题 8–20 个中文字，说明 35–65 字；邀请码 4–28 ASCII 字符；利益脚注 16–45 字。文章摘要 40–100 字，正文槽 100–800 字，可在槽内增加自然段但不改组件与锚点。短标签建议 2–12 字。

SITE_DOMAIN 为纯域名；AFFILIATE_URL 与 SOURCE_URL 为核实的绝对 HTTPS URL，拒绝脚本协议。邮箱纯地址；LANG 为真实 BCP47；PUBLISHED/MODIFIED 为 ISO 日期；RSS_DATE 为 RFC2822 UTC；SECURITY_EXPIRES 为未来 RFC3339 UTC。

替换必须按上下文转义：HTML 文本、属性、XML 和 JSON-LD 分别正确编码，JSON 字符串中的 < 写为 \u003c。不能未转义全局替换，不能把 HTML 塞进纯文字变量。事实、合规与生产验收仍属单站流程。

## 五个本地工具

1. 二十四格栏目配比尺：2–12 条“名称 | 1–1000 权重”，总权重不超过 10000；用精确整数商与余数按原序稳定补足 24 格，报告全部栏目。
2. 版心行长切分尺：1–80 个非空段，单段 NFKC 后最多 500 码点；ASCII 算半单位，其他码点算一单位，按 10–80 单位行宽向上取整，保留原始行号。
3. 标题缺口层级检查：1–100 条“1–6 | 标题”；恰有一个一级标题且必须在首行，后续层级最多加一，输出完整层级编号。
4. 修订针距量尺：1–80 条“名称 | 修改前 | 修改后”；逐码点 Levenshtein 距离，单槽最多 200 码点，输出全部条目和总距离。
5. 页面资源出库核对：清单 1–200 个唯一资源，引用 1–80 页、每页 1–20 项；输出全部页面、缺件和闲置件。

所有工具先查原值长度、控制字符和不完整 Unicode，再做 NFKC；错误聚焦字段并关联 aria-errormessage。输入变化立即使旧报告和复制失效，复制完成也不能覆盖新状态。只在浏览器本地处理，不上传、不保存。

## 全部变量

- %%A10_AUTHOR_NOTE%%
- %%A10_BODY_1_A%%
- %%A10_BODY_1_B%%
- %%A10_BODY_2_A%%
- %%A10_BODY_2_B%%
- %%A10_BODY_3_A%%
- %%A10_BODY_3_B%%
- %%A10_BODY_4_A%%
- %%A10_BODY_4_B%%
- %%A10_CONCLUSION%%
- %%A10_COVER_ALT%%
- %%A10_COVER_CAPTION%%
- %%A10_EYEBROW%%
- %%A10_FAQ_A_1%%
- %%A10_FAQ_A_2%%
- %%A10_FAQ_Q_1%%
- %%A10_FAQ_Q_2%%
- %%A10_FAQ_TITLE%%
- %%A10_H2_1%%
- %%A10_H2_2%%
- %%A10_H2_3%%
- %%A10_H2_4%%
- %%A10_MODIFIED%%
- %%A10_PUBLISHED%%
- %%A10_READING_NOTE%%
- %%A10_RSS_DATE%%
- %%A10_SECTION_LABEL_1%%
- %%A10_SECTION_LABEL_2%%
- %%A10_SECTION_LABEL_3%%
- %%A10_SECTION_LABEL_4%%
- %%A10_SUMMARY%%
- %%A10_TICKET_STATE_1%%
- %%A10_TICKET_STATE_2%%
- %%A10_TICKET_STATE_3%%
- %%A10_TICKET_TEXT_1%%
- %%A10_TICKET_TEXT_2%%
- %%A10_TICKET_TEXT_3%%
- %%A10_TICKET_TITLE_1%%
- %%A10_TICKET_TITLE_2%%
- %%A10_TICKET_TITLE_3%%
- %%A10_TITLE%%
- %%A11_AUTHOR_NOTE%%
- %%A11_BODY_1_A%%
- %%A11_BODY_1_B%%
- %%A11_BODY_2_A%%
- %%A11_BODY_2_B%%
- %%A11_BODY_3_A%%
- %%A11_BODY_3_B%%
- %%A11_BODY_4_A%%
- %%A11_BODY_4_B%%
- %%A11_CONCLUSION%%
- %%A11_COVER_ALT%%
- %%A11_COVER_CAPTION%%
- %%A11_EYEBROW%%
- %%A11_FAQ_A_1%%
- %%A11_FAQ_A_2%%
- %%A11_FAQ_Q_1%%
- %%A11_FAQ_Q_2%%
- %%A11_FAQ_TITLE%%
- %%A11_H2_1%%
- %%A11_H2_2%%
- %%A11_H2_3%%
- %%A11_H2_4%%
- %%A11_LAYOUT_CAPTION%%
- %%A11_MODIFIED%%
- %%A11_PIECE_1%%
- %%A11_PIECE_2%%
- %%A11_PIECE_3%%
- %%A11_PIECE_4%%
- %%A11_PUBLISHED%%
- %%A11_READING_NOTE%%
- %%A11_RSS_DATE%%
- %%A11_SECTION_LABEL_1%%
- %%A11_SECTION_LABEL_2%%
- %%A11_SECTION_LABEL_3%%
- %%A11_SECTION_LABEL_4%%
- %%A11_SUMMARY%%
- %%A11_TITLE%%
- %%A12_AUTHOR_NOTE%%
- %%A12_BODY_1_A%%
- %%A12_BODY_1_B%%
- %%A12_BODY_2_A%%
- %%A12_BODY_2_B%%
- %%A12_BODY_3_A%%
- %%A12_BODY_3_B%%
- %%A12_BODY_4_A%%
- %%A12_BODY_4_B%%
- %%A12_CONCLUSION%%
- %%A12_COVER_ALT%%
- %%A12_COVER_CAPTION%%
- %%A12_DISPATCH_TEXT%%
- %%A12_DISPATCH_TITLE%%
- %%A12_EYEBROW%%
- %%A12_FAQ_A_1%%
- %%A12_FAQ_A_2%%
- %%A12_FAQ_Q_1%%
- %%A12_FAQ_Q_2%%
- %%A12_FAQ_TITLE%%
- %%A12_H2_1%%
- %%A12_H2_2%%
- %%A12_H2_3%%
- %%A12_H2_4%%
- %%A12_MODIFIED%%
- %%A12_PUBLISHED%%
- %%A12_READING_NOTE%%
- %%A12_RSS_DATE%%
- %%A12_SECTION_LABEL_1%%
- %%A12_SECTION_LABEL_2%%
- %%A12_SECTION_LABEL_3%%
- %%A12_SECTION_LABEL_4%%
- %%A12_SUMMARY%%
- %%A12_TITLE%%
- %%A1_AUTHOR_NOTE%%
- %%A1_BODY_1_A%%
- %%A1_BODY_1_B%%
- %%A1_BODY_2_A%%
- %%A1_BODY_2_B%%
- %%A1_BODY_3_A%%
- %%A1_BODY_3_B%%
- %%A1_BODY_4_A%%
- %%A1_BODY_4_B%%
- %%A1_COMPONENT_NOTE%%
- %%A1_COMPONENT_TITLE%%
- %%A1_CONCLUSION%%
- %%A1_COVER_ALT%%
- %%A1_COVER_CAPTION%%
- %%A1_EYEBROW%%
- %%A1_FAQ_A_1%%
- %%A1_FAQ_A_2%%
- %%A1_FAQ_Q_1%%
- %%A1_FAQ_Q_2%%
- %%A1_FAQ_TITLE%%
- %%A1_H2_1%%
- %%A1_H2_2%%
- %%A1_H2_3%%
- %%A1_H2_4%%
- %%A1_MODIFIED%%
- %%A1_PUBLISHED%%
- %%A1_READING_NOTE%%
- %%A1_RSS_DATE%%
- %%A1_SECTION_LABEL_1%%
- %%A1_SECTION_LABEL_2%%
- %%A1_SECTION_LABEL_3%%
- %%A1_SECTION_LABEL_4%%
- %%A1_SUMMARY%%
- %%A1_SWATCH_LABEL_1%%
- %%A1_SWATCH_LABEL_2%%
- %%A1_SWATCH_LABEL_3%%
- %%A1_SWATCH_LABEL_4%%
- %%A1_SWATCH_TEXT_1%%
- %%A1_SWATCH_TEXT_2%%
- %%A1_SWATCH_TEXT_3%%
- %%A1_SWATCH_TEXT_4%%
- %%A1_SWATCH_TITLE_1%%
- %%A1_SWATCH_TITLE_2%%
- %%A1_SWATCH_TITLE_3%%
- %%A1_SWATCH_TITLE_4%%
- %%A1_TITLE%%
- %%A2_AUTHOR_NOTE%%
- %%A2_BODY_1_A%%
- %%A2_BODY_1_B%%
- %%A2_BODY_2_A%%
- %%A2_BODY_2_B%%
- %%A2_BODY_3_A%%
- %%A2_BODY_3_B%%
- %%A2_BODY_4_A%%
- %%A2_BODY_4_B%%
- %%A2_CONCLUSION%%
- %%A2_COVER_ALT%%
- %%A2_COVER_CAPTION%%
- %%A2_EYEBROW%%
- %%A2_FAQ_A_1%%
- %%A2_FAQ_A_2%%
- %%A2_FAQ_Q_1%%
- %%A2_FAQ_Q_2%%
- %%A2_FAQ_TITLE%%
- %%A2_H2_1%%
- %%A2_H2_2%%
- %%A2_H2_3%%
- %%A2_H2_4%%
- %%A2_MODIFIED%%
- %%A2_PUBLISHED%%
- %%A2_READING_NOTE%%
- %%A2_RSS_DATE%%
- %%A2_SEAM_NOTE_1%%
- %%A2_SEAM_NOTE_2%%
- %%A2_SEAM_NOTE_3%%
- %%A2_SEAM_NOTE_4%%
- %%A2_SEAM_TERM_1%%
- %%A2_SEAM_TERM_2%%
- %%A2_SEAM_TERM_3%%
- %%A2_SEAM_TERM_4%%
- %%A2_SEAM_VALUE_1%%
- %%A2_SEAM_VALUE_2%%
- %%A2_SEAM_VALUE_3%%
- %%A2_SEAM_VALUE_4%%
- %%A2_SECTION_LABEL_1%%
- %%A2_SECTION_LABEL_2%%
- %%A2_SECTION_LABEL_3%%
- %%A2_SECTION_LABEL_4%%
- %%A2_SUMMARY%%
- %%A2_TITLE%%
- %%A3_AUTHOR_NOTE%%
- %%A3_BODY_1_A%%
- %%A3_BODY_1_B%%
- %%A3_BODY_2_A%%
- %%A3_BODY_2_B%%
- %%A3_BODY_3_A%%
- %%A3_BODY_3_B%%
- %%A3_BODY_4_A%%
- %%A3_BODY_4_B%%
- %%A3_CONCLUSION%%
- %%A3_COVER_ALT%%
- %%A3_COVER_CAPTION%%
- %%A3_EYEBROW%%
- %%A3_FAQ_A_1%%
- %%A3_FAQ_A_2%%
- %%A3_FAQ_Q_1%%
- %%A3_FAQ_Q_2%%
- %%A3_FAQ_TITLE%%
- %%A3_H2_1%%
- %%A3_H2_2%%
- %%A3_H2_3%%
- %%A3_H2_4%%
- %%A3_MODIFIED%%
- %%A3_POCKET_LABEL_1%%
- %%A3_POCKET_LABEL_2%%
- %%A3_POCKET_LABEL_3%%
- %%A3_POCKET_TEXT_1%%
- %%A3_POCKET_TEXT_2%%
- %%A3_POCKET_TEXT_3%%
- %%A3_POCKET_TITLE_1%%
- %%A3_POCKET_TITLE_2%%
- %%A3_POCKET_TITLE_3%%
- %%A3_PUBLISHED%%
- %%A3_READING_NOTE%%
- %%A3_RSS_DATE%%
- %%A3_SECTION_LABEL_1%%
- %%A3_SECTION_LABEL_2%%
- %%A3_SECTION_LABEL_3%%
- %%A3_SECTION_LABEL_4%%
- %%A3_SOURCE_URL_1%%
- %%A3_SOURCE_URL_2%%
- %%A3_SOURCE_URL_3%%
- %%A3_SUMMARY%%
- %%A3_TITLE%%
- %%A4_AUTHOR_NOTE%%
- %%A4_BODY_1_A%%
- %%A4_BODY_1_B%%
- %%A4_BODY_2_A%%
- %%A4_BODY_2_B%%
- %%A4_BODY_3_A%%
- %%A4_BODY_3_B%%
- %%A4_BODY_4_A%%
- %%A4_BODY_4_B%%
- %%A4_CONCLUSION%%
- %%A4_COVER_ALT%%
- %%A4_COVER_CAPTION%%
- %%A4_EYEBROW%%
- %%A4_FAQ_A_1%%
- %%A4_FAQ_A_2%%
- %%A4_FAQ_Q_1%%
- %%A4_FAQ_Q_2%%
- %%A4_FAQ_TITLE%%
- %%A4_H2_1%%
- %%A4_H2_2%%
- %%A4_H2_3%%
- %%A4_H2_4%%
- %%A4_MODIFIED%%
- %%A4_NOTCH_LABEL_1%%
- %%A4_NOTCH_LABEL_2%%
- %%A4_NOTCH_LABEL_3%%
- %%A4_NOTCH_LABEL_4%%
- %%A4_NOTCH_TEXT_1%%
- %%A4_NOTCH_TEXT_2%%
- %%A4_NOTCH_TEXT_3%%
- %%A4_NOTCH_TEXT_4%%
- %%A4_NOTCH_TITLE_1%%
- %%A4_NOTCH_TITLE_2%%
- %%A4_NOTCH_TITLE_3%%
- %%A4_NOTCH_TITLE_4%%
- %%A4_PUBLISHED%%
- %%A4_READING_NOTE%%
- %%A4_RSS_DATE%%
- %%A4_SECTION_LABEL_1%%
- %%A4_SECTION_LABEL_2%%
- %%A4_SECTION_LABEL_3%%
- %%A4_SECTION_LABEL_4%%
- %%A4_SUMMARY%%
- %%A4_TITLE%%
- %%A5_AUTHOR_NOTE%%
- %%A5_BODY_1_A%%
- %%A5_BODY_1_B%%
- %%A5_BODY_2_A%%
- %%A5_BODY_2_B%%
- %%A5_BODY_3_A%%
- %%A5_BODY_3_B%%
- %%A5_BODY_4_A%%
- %%A5_BODY_4_B%%
- %%A5_CONCLUSION%%
- %%A5_COVER_ALT%%
- %%A5_COVER_CAPTION%%
- %%A5_EYEBROW%%
- %%A5_FAQ_A_1%%
- %%A5_FAQ_A_2%%
- %%A5_FAQ_Q_1%%
- %%A5_FAQ_Q_2%%
- %%A5_FAQ_TITLE%%
- %%A5_H2_1%%
- %%A5_H2_2%%
- %%A5_H2_3%%
- %%A5_H2_4%%
- %%A5_MODIFIED%%
- %%A5_PUBLISHED%%
- %%A5_READING_NOTE%%
- %%A5_RSS_DATE%%
- %%A5_SCOPE_MARK_1%%
- %%A5_SCOPE_MARK_2%%
- %%A5_SCOPE_MARK_3%%
- %%A5_SCOPE_TEXT_1%%
- %%A5_SCOPE_TEXT_2%%
- %%A5_SCOPE_TEXT_3%%
- %%A5_SCOPE_TITLE_1%%
- %%A5_SCOPE_TITLE_2%%
- %%A5_SCOPE_TITLE_3%%
- %%A5_SECTION_LABEL_1%%
- %%A5_SECTION_LABEL_2%%
- %%A5_SECTION_LABEL_3%%
- %%A5_SECTION_LABEL_4%%
- %%A5_SUMMARY%%
- %%A5_TITLE%%
- %%A6_AUTHOR_NOTE%%
- %%A6_BODY_1_A%%
- %%A6_BODY_1_B%%
- %%A6_BODY_2_A%%
- %%A6_BODY_2_B%%
- %%A6_BODY_3_A%%
- %%A6_BODY_3_B%%
- %%A6_BODY_4_A%%
- %%A6_BODY_4_B%%
- %%A6_CONCLUSION%%
- %%A6_COVER_ALT%%
- %%A6_COVER_CAPTION%%
- %%A6_EYEBROW%%
- %%A6_FAQ_A_1%%
- %%A6_FAQ_A_2%%
- %%A6_FAQ_Q_1%%
- %%A6_FAQ_Q_2%%
- %%A6_FAQ_TITLE%%
- %%A6_H2_1%%
- %%A6_H2_2%%
- %%A6_H2_3%%
- %%A6_H2_4%%
- %%A6_MODIFIED%%
- %%A6_PUBLISHED%%
- %%A6_READING_NOTE%%
- %%A6_RSS_DATE%%
- %%A6_SECTION_LABEL_1%%
- %%A6_SECTION_LABEL_2%%
- %%A6_SECTION_LABEL_3%%
- %%A6_SECTION_LABEL_4%%
- %%A6_SUMMARY%%
- %%A6_TEST_STATE_1%%
- %%A6_TEST_STATE_2%%
- %%A6_TEST_STATE_3%%
- %%A6_TEST_STATE_4%%
- %%A6_TEST_TEXT_1%%
- %%A6_TEST_TEXT_2%%
- %%A6_TEST_TEXT_3%%
- %%A6_TEST_TEXT_4%%
- %%A6_TEST_TITLE_1%%
- %%A6_TEST_TITLE_2%%
- %%A6_TEST_TITLE_3%%
- %%A6_TEST_TITLE_4%%
- %%A6_TEST_VALUE_1%%
- %%A6_TEST_VALUE_2%%
- %%A6_TEST_VALUE_3%%
- %%A6_TEST_VALUE_4%%
- %%A6_TITLE%%
- %%A7_AUTHOR_NOTE%%
- %%A7_BODY_1_A%%
- %%A7_BODY_1_B%%
- %%A7_BODY_2_A%%
- %%A7_BODY_2_B%%
- %%A7_BODY_3_A%%
- %%A7_BODY_3_B%%
- %%A7_BODY_4_A%%
- %%A7_BODY_4_B%%
- %%A7_COL_1%%
- %%A7_COL_2%%
- %%A7_COL_3%%
- %%A7_COL_4%%
- %%A7_CONCLUSION%%
- %%A7_COVER_ALT%%
- %%A7_COVER_CAPTION%%
- %%A7_EYEBROW%%
- %%A7_FAQ_A_1%%
- %%A7_FAQ_A_2%%
- %%A7_FAQ_Q_1%%
- %%A7_FAQ_Q_2%%
- %%A7_FAQ_TITLE%%
- %%A7_H2_1%%
- %%A7_H2_2%%
- %%A7_H2_3%%
- %%A7_H2_4%%
- %%A7_MATRIX_CAPTION%%
- %%A7_MODIFIED%%
- %%A7_PUBLISHED%%
- %%A7_READING_NOTE%%
- %%A7_ROW_1_A%%
- %%A7_ROW_1_B%%
- %%A7_ROW_1_C%%
- %%A7_ROW_1_LABEL%%
- %%A7_ROW_2_A%%
- %%A7_ROW_2_B%%
- %%A7_ROW_2_C%%
- %%A7_ROW_2_LABEL%%
- %%A7_ROW_3_A%%
- %%A7_ROW_3_B%%
- %%A7_ROW_3_C%%
- %%A7_ROW_3_LABEL%%
- %%A7_ROW_4_A%%
- %%A7_ROW_4_B%%
- %%A7_ROW_4_C%%
- %%A7_ROW_4_LABEL%%
- %%A7_RSS_DATE%%
- %%A7_SECTION_LABEL_1%%
- %%A7_SECTION_LABEL_2%%
- %%A7_SECTION_LABEL_3%%
- %%A7_SECTION_LABEL_4%%
- %%A7_SUMMARY%%
- %%A7_TITLE%%
- %%A8_AUTHOR_NOTE%%
- %%A8_BODY_1_A%%
- %%A8_BODY_1_B%%
- %%A8_BODY_2_A%%
- %%A8_BODY_2_B%%
- %%A8_BODY_3_A%%
- %%A8_BODY_3_B%%
- %%A8_BODY_4_A%%
- %%A8_BODY_4_B%%
- %%A8_CONCLUSION%%
- %%A8_COVER_ALT%%
- %%A8_COVER_CAPTION%%
- %%A8_EYEBROW%%
- %%A8_FAQ_A_1%%
- %%A8_FAQ_A_2%%
- %%A8_FAQ_Q_1%%
- %%A8_FAQ_Q_2%%
- %%A8_FAQ_TITLE%%
- %%A8_H2_1%%
- %%A8_H2_2%%
- %%A8_H2_3%%
- %%A8_H2_4%%
- %%A8_MODIFIED%%
- %%A8_PUBLISHED%%
- %%A8_READING_NOTE%%
- %%A8_RSS_DATE%%
- %%A8_SECTION_LABEL_1%%
- %%A8_SECTION_LABEL_2%%
- %%A8_SECTION_LABEL_3%%
- %%A8_SECTION_LABEL_4%%
- %%A8_STITCH_DATE_1%%
- %%A8_STITCH_DATE_2%%
- %%A8_STITCH_DATE_3%%
- %%A8_STITCH_DATE_4%%
- %%A8_STITCH_TEXT_1%%
- %%A8_STITCH_TEXT_2%%
- %%A8_STITCH_TEXT_3%%
- %%A8_STITCH_TEXT_4%%
- %%A8_STITCH_TITLE_1%%
- %%A8_STITCH_TITLE_2%%
- %%A8_STITCH_TITLE_3%%
- %%A8_STITCH_TITLE_4%%
- %%A8_SUMMARY%%
- %%A8_TITLE%%
- %%A9_AUTHOR_NOTE%%
- %%A9_BODY_1_A%%
- %%A9_BODY_1_B%%
- %%A9_BODY_2_A%%
- %%A9_BODY_2_B%%
- %%A9_BODY_3_A%%
- %%A9_BODY_3_B%%
- %%A9_BODY_4_A%%
- %%A9_BODY_4_B%%
- %%A9_CONCLUSION%%
- %%A9_COVER_ALT%%
- %%A9_COVER_CAPTION%%
- %%A9_EYEBROW%%
- %%A9_FAQ_A_1%%
- %%A9_FAQ_A_2%%
- %%A9_FAQ_Q_1%%
- %%A9_FAQ_Q_2%%
- %%A9_FAQ_TITLE%%
- %%A9_H2_1%%
- %%A9_H2_2%%
- %%A9_H2_3%%
- %%A9_H2_4%%
- %%A9_MODIFIED%%
- %%A9_PUBLISHED%%
- %%A9_READING_NOTE%%
- %%A9_RSS_DATE%%
- %%A9_RULER_CAPTION%%
- %%A9_SECTION_LABEL_1%%
- %%A9_SECTION_LABEL_2%%
- %%A9_SECTION_LABEL_3%%
- %%A9_SECTION_LABEL_4%%
- %%A9_SIZE_1%%
- %%A9_SIZE_2%%
- %%A9_SIZE_3%%
- %%A9_SIZE_4%%
- %%A9_SIZE_5%%
- %%A9_SIZE_NOTE_1%%
- %%A9_SIZE_NOTE_2%%
- %%A9_SIZE_NOTE_3%%
- %%A9_SIZE_NOTE_4%%
- %%A9_SIZE_NOTE_5%%
- %%A9_SUMMARY%%
- %%A9_TITLE%%
- %%AFFILIATE_URL%%
- %%AUTHOR_NAME%%
- %%BENEFIT_DISCLAIMER%%
- %%BENEFIT_RATE%%
- %%BRAND_EN%%
- %%CATALOG_DESC%%
- %%CATALOG_INTRO%%
- %%CATALOG_TITLE%%
- %%CONTACT_EMAIL%%
- %%CONTACT_NOTE%%
- %%DEPARTMENT_1_INTRO%%
- %%DEPARTMENT_1_NOTE%%
- %%DEPARTMENT_2_INTRO%%
- %%DEPARTMENT_2_NOTE%%
- %%DEPARTMENT_3_INTRO%%
- %%DEPARTMENT_3_NOTE%%
- %%DEPARTMENT_4_INTRO%%
- %%DEPARTMENT_4_NOTE%%
- %%DEPARTMENT_TITLE%%
- %%FOOTER_NOTE%%
- %%HERO_DESCRIPTION%%
- %%HERO_NOTE%%
- %%HERO_TITLE%%
- %%INDEPENDENCE_NOTE%%
- %%INVITE_CODE%%
- %%INVITE_LABEL%%
- %%LANG%%
- %%LEGAL_1_INTRO%%
- %%LEGAL_1_LABEL_1%%
- %%LEGAL_1_LABEL_2%%
- %%LEGAL_1_LABEL_3%%
- %%LEGAL_1_LABEL_4%%
- %%LEGAL_1_TEXT_1%%
- %%LEGAL_1_TEXT_2%%
- %%LEGAL_1_TEXT_3%%
- %%LEGAL_1_TEXT_4%%
- %%LEGAL_1_TITLE_1%%
- %%LEGAL_1_TITLE_2%%
- %%LEGAL_1_TITLE_3%%
- %%LEGAL_1_TITLE_4%%
- %%LEGAL_2_INTRO%%
- %%LEGAL_2_LABEL_1%%
- %%LEGAL_2_LABEL_2%%
- %%LEGAL_2_LABEL_3%%
- %%LEGAL_2_LABEL_4%%
- %%LEGAL_2_TEXT_1%%
- %%LEGAL_2_TEXT_2%%
- %%LEGAL_2_TEXT_3%%
- %%LEGAL_2_TEXT_4%%
- %%LEGAL_2_TITLE_1%%
- %%LEGAL_2_TITLE_2%%
- %%LEGAL_2_TITLE_3%%
- %%LEGAL_2_TITLE_4%%
- %%LEGAL_3_INTRO%%
- %%LEGAL_3_LABEL_1%%
- %%LEGAL_3_LABEL_2%%
- %%LEGAL_3_LABEL_3%%
- %%LEGAL_3_LABEL_4%%
- %%LEGAL_3_TEXT_1%%
- %%LEGAL_3_TEXT_2%%
- %%LEGAL_3_TEXT_3%%
- %%LEGAL_3_TEXT_4%%
- %%LEGAL_3_TITLE_1%%
- %%LEGAL_3_TITLE_2%%
- %%LEGAL_3_TITLE_3%%
- %%LEGAL_3_TITLE_4%%
- %%LEGAL_4_INTRO%%
- %%LEGAL_4_LABEL_1%%
- %%LEGAL_4_LABEL_2%%
- %%LEGAL_4_LABEL_3%%
- %%LEGAL_4_LABEL_4%%
- %%LEGAL_4_TEXT_1%%
- %%LEGAL_4_TEXT_2%%
- %%LEGAL_4_TEXT_3%%
- %%LEGAL_4_TEXT_4%%
- %%LEGAL_4_TITLE_1%%
- %%LEGAL_4_TITLE_2%%
- %%LEGAL_4_TITLE_3%%
- %%LEGAL_4_TITLE_4%%
- %%LEGAL_5_INTRO%%
- %%LEGAL_5_LABEL_1%%
- %%LEGAL_5_LABEL_2%%
- %%LEGAL_5_LABEL_3%%
- %%LEGAL_5_LABEL_4%%
- %%LEGAL_5_TEXT_1%%
- %%LEGAL_5_TEXT_2%%
- %%LEGAL_5_TEXT_3%%
- %%LEGAL_5_TEXT_4%%
- %%LEGAL_5_TITLE_1%%
- %%LEGAL_5_TITLE_2%%
- %%LEGAL_5_TITLE_3%%
- %%LEGAL_5_TITLE_4%%
- %%LEGAL_6_INTRO%%
- %%LEGAL_6_LABEL_1%%
- %%LEGAL_6_LABEL_2%%
- %%LEGAL_6_LABEL_3%%
- %%LEGAL_6_LABEL_4%%
- %%LEGAL_6_TEXT_1%%
- %%LEGAL_6_TEXT_2%%
- %%LEGAL_6_TEXT_3%%
- %%LEGAL_6_TEXT_4%%
- %%LEGAL_6_TITLE_1%%
- %%LEGAL_6_TITLE_2%%
- %%LEGAL_6_TITLE_3%%
- %%LEGAL_6_TITLE_4%%
- %%LEGAL_7_INTRO%%
- %%LEGAL_7_LABEL_1%%
- %%LEGAL_7_LABEL_2%%
- %%LEGAL_7_LABEL_3%%
- %%LEGAL_7_LABEL_4%%
- %%LEGAL_7_TEXT_1%%
- %%LEGAL_7_TEXT_2%%
- %%LEGAL_7_TEXT_3%%
- %%LEGAL_7_TEXT_4%%
- %%LEGAL_7_TITLE_1%%
- %%LEGAL_7_TITLE_2%%
- %%LEGAL_7_TITLE_3%%
- %%LEGAL_7_TITLE_4%%
- %%METHOD_MARK_1%%
- %%METHOD_MARK_2%%
- %%METHOD_MARK_3%%
- %%PATTERN_ALT%%
- %%RISK_NOTE%%
- %%SECURITY_EMAIL%%
- %%SECURITY_EXPIRES%%
- %%SEO_TITLE%%
- %%SITEMAP_LASTMOD%%
- %%SITE_DESC%%
- %%SITE_DOMAIN%%
- %%SITE_NAME%%
- %%SITE_TAGLINE%%
- %%TOOLS_TITLE%%
- %%TOOL_INDEX_DESC%%
- %%TOOL_INDEX_INTRO%%
- %%TOOL_INDEX_TITLE%%
