# Midnight Constellation — 航海星图完整静态框架

## 范围与原视觉

本套只制作网站模板，后续 AI 仅填写经核实的文字、文章和站点变量，不再补 UI、工具、响应式、页面或通用资源。不代写业务文章或注册教程，不部署生产。角色表 registrationGuide 仅为旧检查器兼容字段，指向唯一推广组件所在的通用图版外壳，不表示教程选题。

保留本地黄铜星盘、四星区、航图登记与资料入口、首页原类名和 celestial.css 字节；新增 cartography.css 负责完整框架。动态原包没有可复验状态，原包忠实度未核验；用户已授权按本地风格完善，不冒称忠实复刻。

35 个 HTML，31 个可索引页、独立 404 和三个 noindex 旧入口。四个交叉星区每组 3 篇图版；文章三种开场、十二种专属模块、原生目录、多式 FAQ 与收尾俱全。默认纸图 paper，可切墨夜 night。星盘是装饰，不是实际天文观测，不包含未经查证的星位或导航建议。

首页首屏代码明文、真复制、利益变量及脚注齐全，无推广 href。horizon-gate 外壳有且只有一个静态推广地址槽位，带 blank 和四项 rel，附近说明推广链接与代码。其余区域不含推广 href。Feed 10 项摘要，次序独立，无代码或推广链接。

## 工具契约

五工具均本地运行，说明可抓取、Guide 默认折叠。完整结果使用 textContent；输入更改立即清空旧结果，复制使用修订号阻止异步旧状态回写。没有输入上传或存储，localStorage 只保存主题。无 JS 仍可阅读及使用导航，计算按钮不可用。

1. 标签共现：8000 码点、100 非空候选行、每行最多 12 个不同标签、单标签 30 码点、80 唯一标签。整行 NFKC 后逗号分隔，空标签忽略，每行去重；重复记录仍计次数。全连接输出，不截断 20 项。次数降序、规范化键 UTF-16 次序；孤立标签单列。
2. 最短路径：10000 码点、200 非空行、80 节点，A | B 为有向边。NFKC 后每行必须一个竖线，两端非空且最多 30 码点；重复边去重，自环允许。BFS 最少边数，等长按首次输入邻接序；同点零步，不可达为正常报告。起终点控件原输入最多 60 码点，规范化后仍最多 30 码点。
3. 前置层级：相同图输入，A 是 B 前置，逐层 Kahn 剥离。层内按节点初次出现序；残留包含环成员及依赖环的节点，不能将整个残留都判成环成员。
4. 连通群岛：相同输入，忽略方向。无向边去重，自环单列；并查集合并。群岛和组内依首次出现顺序输出；A | A 可登记孤立节点。
5. 集合重合：两边逐行标签，各 8000 码点/200 非空行/100 唯一项，单标签 30 码点，允许空集。NFKC、修剪、固定 toLowerCase 键；左显示名优先。输出交并、双差集和 Jaccard 至两位小数；两空集按明确约定显示 100%。

全部输入拒绝非法控制字符和不完整 Unicode。先读控件原值，不通过会替换代理项的 FormData。所有图关系与统计只来自当前输入，不声称因果、内容质量、搜索价值或真实导航精度。

## 后续 AI 填写规则

变量为 %%UPPER_CASE%%，A1_ 至 A12_ 对应图版。保留 cn67- 类名、id、data-*、脚本和结构，只填写经核实文字。推荐首页标题 8–16 个中文字符、说明 25–60 字，利益脚注不能截断。BRAND_EN 使用英文/罗马字；BRAND_MARK 是短标识，CHART_MARK 是短装饰刻度，不用真实机构商标或未经核实坐标。

文本、HTML 属性和 XML 分别转义；JSON-LD 重新序列化并安全转义小于号和脚本结束片段。SITE_DOMAIN 只填主机名，AFFILIATE_URL 仅经核实 HTTPS，SOURCE_URL 经核实 HTTP(S)，禁止脚本协议。日期为 ISO，RSS 日期为 RFC 822；SECURITY_EXPIRES 采用未来一年内 UTC 时间。身份、经历、来源、政策、利益、状态和日期均需查证，不能虚构。

12 套独立 SVG 源及 1200×630 WebP/PNG 封面已提供，均预加载。站点社交 PNG 1200×630，触摸图标 180×180，ICO 含 16/32/48。模板根即网站根；404 的根 base 支持未知深路径，实际服务器仍须返回 HTTP 404。生产、语种选择和内容事实审计由单站流程执行。

## 角色表

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "chart-register.html",
  "articles": [
    "plates/meridian-record.html",
    "plates/aperture-lens.html",
    "plates/bearing-comparison.html",
    "plates/latitude-strips.html",
    "plates/source-anchors.html",
    "plates/transit-sequence.html",
    "plates/margin-glossary.html",
    "plates/coordinate-table.html",
    "plates/uncertainty-fan.html",
    "plates/revision-windows.html",
    "plates/route-forks.html",
    "plates/horizon-gate.html"
  ],
  "cornerstones": [
    "plates/meridian-record.html",
    "plates/coordinate-table.html"
  ],
  "registrationGuide": "plates/horizon-gate.html",
  "articleCovers": {
    "plates/meridian-record.html": {
      "display": "assets/plates/meridian-record.webp",
      "og": "assets/plates/meridian-record.png"
    },
    "plates/aperture-lens.html": {
      "display": "assets/plates/aperture-lens.webp",
      "og": "assets/plates/aperture-lens.png"
    },
    "plates/bearing-comparison.html": {
      "display": "assets/plates/bearing-comparison.webp",
      "og": "assets/plates/bearing-comparison.png"
    },
    "plates/latitude-strips.html": {
      "display": "assets/plates/latitude-strips.webp",
      "og": "assets/plates/latitude-strips.png"
    },
    "plates/source-anchors.html": {
      "display": "assets/plates/source-anchors.webp",
      "og": "assets/plates/source-anchors.png"
    },
    "plates/transit-sequence.html": {
      "display": "assets/plates/transit-sequence.webp",
      "og": "assets/plates/transit-sequence.png"
    },
    "plates/margin-glossary.html": {
      "display": "assets/plates/margin-glossary.webp",
      "og": "assets/plates/margin-glossary.png"
    },
    "plates/coordinate-table.html": {
      "display": "assets/plates/coordinate-table.webp",
      "og": "assets/plates/coordinate-table.png"
    },
    "plates/uncertainty-fan.html": {
      "display": "assets/plates/uncertainty-fan.webp",
      "og": "assets/plates/uncertainty-fan.png"
    },
    "plates/revision-windows.html": {
      "display": "assets/plates/revision-windows.webp",
      "og": "assets/plates/revision-windows.png"
    },
    "plates/route-forks.html": {
      "display": "assets/plates/route-forks.webp",
      "og": "assets/plates/route-forks.png"
    },
    "plates/horizon-gate.html": {
      "display": "assets/plates/horizon-gate.webp",
      "og": "assets/plates/horizon-gate.png"
    }
  },
  "categories": [
    {
      "path": "sectors/origin-stars.html",
      "label": "起点星区",
      "articles": [
        "plates/meridian-record.html",
        "plates/source-anchors.html",
        "plates/uncertainty-fan.html"
      ]
    },
    {
      "path": "sectors/witness-stars.html",
      "label": "见证星区",
      "articles": [
        "plates/aperture-lens.html",
        "plates/transit-sequence.html",
        "plates/revision-windows.html"
      ]
    },
    {
      "path": "sectors/interpretive-stars.html",
      "label": "解释星区",
      "articles": [
        "plates/bearing-comparison.html",
        "plates/margin-glossary.html",
        "plates/route-forks.html"
      ]
    },
    {
      "path": "sectors/distant-stars.html",
      "label": "远界星区",
      "articles": [
        "plates/latitude-strips.html",
        "plates/coordinate-table.html",
        "plates/horizon-gate.html"
      ]
    }
  ],
  "toolIndex": "navigation-desk.html",
  "tools": [
    "calculations/cooccurrence-map.html",
    "calculations/shortest-route.html",
    "calculations/dependency-layers.html",
    "calculations/connected-islands.html",
    "calculations/set-overlap.html"
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

## 完整变量登记

- %%A10_BODY_1%%
- %%A10_BODY_2%%
- %%A10_BODY_3%%
- %%A10_BODY_4%%
- %%A10_CHECKED%%
- %%A10_CLOSING_TEXT%%
- %%A10_COVER_ALT%%
- %%A10_COVER_CAPTION%%
- %%A10_DATE_LABEL%%
- %%A10_EYEBROW%%
- %%A10_FAQ_A1%%
- %%A10_FAQ_A2%%
- %%A10_FAQ_A3%%
- %%A10_FAQ_Q1%%
- %%A10_FAQ_Q2%%
- %%A10_FAQ_Q3%%
- %%A10_FAQ_TITLE%%
- %%A10_H2_1%%
- %%A10_H2_2%%
- %%A10_H2_3%%
- %%A10_H2_4%%
- %%A10_INTRO%%
- %%A10_MODIFIED%%
- %%A10_POINT_1%%
- %%A10_POINT_2%%
- %%A10_POINT_3%%
- %%A10_PUBLISHED%%
- %%A10_QUOTE_NOTE%%
- %%A10_QUOTE_TEXT%%
- %%A10_RSS_DATE%%
- %%A10_SOURCE_LABEL%%
- %%A10_SOURCE_NOTE%%
- %%A10_SOURCE_TITLE%%
- %%A10_SOURCE_URL%%
- %%A10_SUMMARY%%
- %%A10_TITLE%%
- %%A10_WINDOW_LABEL_1%%
- %%A10_WINDOW_LABEL_2%%
- %%A10_WINDOW_LABEL_3%%
- %%A10_WINDOW_NOTE_1%%
- %%A10_WINDOW_NOTE_2%%
- %%A10_WINDOW_NOTE_3%%
- %%A10_WINDOW_TEXT_1%%
- %%A10_WINDOW_TEXT_2%%
- %%A10_WINDOW_TEXT_3%%
- %%A10_WINDOW_TITLE_1%%
- %%A10_WINDOW_TITLE_2%%
- %%A10_WINDOW_TITLE_3%%
- %%A11_BODY_1%%
- %%A11_BODY_2%%
- %%A11_BODY_3%%
- %%A11_BODY_4%%
- %%A11_CHECKED%%
- %%A11_CLOSING_TEXT%%
- %%A11_COVER_ALT%%
- %%A11_COVER_CAPTION%%
- %%A11_DATE_LABEL%%
- %%A11_EYEBROW%%
- %%A11_FAQ_A1%%
- %%A11_FAQ_A2%%
- %%A11_FAQ_A3%%
- %%A11_FAQ_Q1%%
- %%A11_FAQ_Q2%%
- %%A11_FAQ_Q3%%
- %%A11_FAQ_TITLE%%
- %%A11_FORK_NOTE_1%%
- %%A11_FORK_NOTE_2%%
- %%A11_FORK_NOTE_3%%
- %%A11_FORK_TEXT_1%%
- %%A11_FORK_TEXT_2%%
- %%A11_FORK_TEXT_3%%
- %%A11_FORK_TITLE_1%%
- %%A11_FORK_TITLE_2%%
- %%A11_FORK_TITLE_3%%
- %%A11_H2_1%%
- %%A11_H2_2%%
- %%A11_H2_3%%
- %%A11_H2_4%%
- %%A11_INTRO%%
- %%A11_MODIFIED%%
- %%A11_PLATE_MARK%%
- %%A11_POINT_1%%
- %%A11_POINT_2%%
- %%A11_POINT_3%%
- %%A11_PUBLISHED%%
- %%A11_QUOTE_NOTE%%
- %%A11_QUOTE_TEXT%%
- %%A11_SOURCE_LABEL%%
- %%A11_SOURCE_NOTE%%
- %%A11_SOURCE_TITLE%%
- %%A11_SOURCE_URL%%
- %%A11_SUMMARY%%
- %%A11_TITLE%%
- %%A12_BODY_1%%
- %%A12_BODY_2%%
- %%A12_BODY_3%%
- %%A12_BODY_4%%
- %%A12_CHECKED%%
- %%A12_CLOSING_TEXT%%
- %%A12_COVER_ALT%%
- %%A12_COVER_CAPTION%%
- %%A12_DATE_LABEL%%
- %%A12_EYEBROW%%
- %%A12_FAQ_A1%%
- %%A12_FAQ_A2%%
- %%A12_FAQ_A3%%
- %%A12_FAQ_Q1%%
- %%A12_FAQ_Q2%%
- %%A12_FAQ_Q3%%
- %%A12_FAQ_TITLE%%
- %%A12_H2_1%%
- %%A12_H2_2%%
- %%A12_H2_3%%
- %%A12_H2_4%%
- %%A12_HORIZON_NOTE%%
- %%A12_HORIZON_TEXT_1%%
- %%A12_HORIZON_TEXT_2%%
- %%A12_HORIZON_TITLE_1%%
- %%A12_HORIZON_TITLE_2%%
- %%A12_INTRO%%
- %%A12_MODIFIED%%
- %%A12_POINT_1%%
- %%A12_POINT_2%%
- %%A12_POINT_3%%
- %%A12_PUBLISHED%%
- %%A12_QUOTE_NOTE%%
- %%A12_QUOTE_TEXT%%
- %%A12_SOURCE_LABEL%%
- %%A12_SOURCE_NOTE%%
- %%A12_SOURCE_TITLE%%
- %%A12_SOURCE_URL%%
- %%A12_SUMMARY%%
- %%A12_TITLE%%
- %%A1_BODY_1%%
- %%A1_BODY_2%%
- %%A1_BODY_3%%
- %%A1_BODY_4%%
- %%A1_CHECKED%%
- %%A1_CLOSING_TEXT%%
- %%A1_COVER_ALT%%
- %%A1_COVER_CAPTION%%
- %%A1_DATE_LABEL%%
- %%A1_EYEBROW%%
- %%A1_FAQ_A1%%
- %%A1_FAQ_A2%%
- %%A1_FAQ_A3%%
- %%A1_FAQ_Q1%%
- %%A1_FAQ_Q2%%
- %%A1_FAQ_Q3%%
- %%A1_FAQ_TITLE%%
- %%A1_H2_1%%
- %%A1_H2_2%%
- %%A1_H2_3%%
- %%A1_H2_4%%
- %%A1_INTRO%%
- %%A1_MODIFIED%%
- %%A1_POINT_1%%
- %%A1_POINT_2%%
- %%A1_POINT_3%%
- %%A1_PUBLISHED%%
- %%A1_QUOTE_NOTE%%
- %%A1_QUOTE_TEXT%%
- %%A1_RECORD_DETAIL_1%%
- %%A1_RECORD_DETAIL_2%%
- %%A1_RECORD_DETAIL_3%%
- %%A1_RECORD_DETAIL_4%%
- %%A1_RECORD_LABEL%%
- %%A1_RECORD_NOTE%%
- %%A1_RECORD_TERM_1%%
- %%A1_RECORD_TERM_2%%
- %%A1_RECORD_TERM_3%%
- %%A1_RECORD_TERM_4%%
- %%A1_RECORD_VALUE%%
- %%A1_RSS_DATE%%
- %%A1_SOURCE_LABEL%%
- %%A1_SOURCE_NOTE%%
- %%A1_SOURCE_TITLE%%
- %%A1_SOURCE_URL%%
- %%A1_SUMMARY%%
- %%A1_TITLE%%
- %%A2_BODY_1%%
- %%A2_BODY_2%%
- %%A2_BODY_3%%
- %%A2_BODY_4%%
- %%A2_CHECKED%%
- %%A2_CLOSING_TEXT%%
- %%A2_COVER_ALT%%
- %%A2_COVER_CAPTION%%
- %%A2_DATE_LABEL%%
- %%A2_EYEBROW%%
- %%A2_FAQ_A1%%
- %%A2_FAQ_A2%%
- %%A2_FAQ_A3%%
- %%A2_FAQ_Q1%%
- %%A2_FAQ_Q2%%
- %%A2_FAQ_Q3%%
- %%A2_FAQ_TITLE%%
- %%A2_H2_1%%
- %%A2_H2_2%%
- %%A2_H2_3%%
- %%A2_H2_4%%
- %%A2_INTRO%%
- %%A2_LENS_EDGE%%
- %%A2_LENS_FOCUS%%
- %%A2_LENS_LABEL%%
- %%A2_LENS_NOTE%%
- %%A2_LENS_TEXT%%
- %%A2_MODIFIED%%
- %%A2_PLATE_MARK%%
- %%A2_POINT_1%%
- %%A2_POINT_2%%
- %%A2_POINT_3%%
- %%A2_PUBLISHED%%
- %%A2_QUOTE_NOTE%%
- %%A2_QUOTE_TEXT%%
- %%A2_RSS_DATE%%
- %%A2_SOURCE_LABEL%%
- %%A2_SOURCE_NOTE%%
- %%A2_SOURCE_TITLE%%
- %%A2_SOURCE_URL%%
- %%A2_SUMMARY%%
- %%A2_TITLE%%
- %%A3_BEARING_1_DETAIL_1%%
- %%A3_BEARING_1_DETAIL_2%%
- %%A3_BEARING_1_TERM_1%%
- %%A3_BEARING_1_TERM_2%%
- %%A3_BEARING_2_DETAIL_1%%
- %%A3_BEARING_2_DETAIL_2%%
- %%A3_BEARING_2_TERM_1%%
- %%A3_BEARING_2_TERM_2%%
- %%A3_BEARING_LABEL_1%%
- %%A3_BEARING_LABEL_2%%
- %%A3_BEARING_TEXT_1%%
- %%A3_BEARING_TEXT_2%%
- %%A3_BEARING_TITLE_1%%
- %%A3_BEARING_TITLE_2%%
- %%A3_BODY_1%%
- %%A3_BODY_2%%
- %%A3_BODY_3%%
- %%A3_BODY_4%%
- %%A3_CHECKED%%
- %%A3_CLOSING_TEXT%%
- %%A3_COVER_ALT%%
- %%A3_COVER_CAPTION%%
- %%A3_DATE_LABEL%%
- %%A3_EYEBROW%%
- %%A3_FAQ_A1%%
- %%A3_FAQ_A2%%
- %%A3_FAQ_A3%%
- %%A3_FAQ_Q1%%
- %%A3_FAQ_Q2%%
- %%A3_FAQ_Q3%%
- %%A3_FAQ_TITLE%%
- %%A3_H2_1%%
- %%A3_H2_2%%
- %%A3_H2_3%%
- %%A3_H2_4%%
- %%A3_INTRO%%
- %%A3_MODIFIED%%
- %%A3_POINT_1%%
- %%A3_POINT_2%%
- %%A3_POINT_3%%
- %%A3_PUBLISHED%%
- %%A3_QUOTE_NOTE%%
- %%A3_QUOTE_TEXT%%
- %%A3_RSS_DATE%%
- %%A3_SOURCE_LABEL%%
- %%A3_SOURCE_NOTE%%
- %%A3_SOURCE_TITLE%%
- %%A3_SOURCE_URL%%
- %%A3_SUMMARY%%
- %%A3_TITLE%%
- %%A4_BODY_1%%
- %%A4_BODY_2%%
- %%A4_BODY_3%%
- %%A4_BODY_4%%
- %%A4_CHECKED%%
- %%A4_CLOSING_TEXT%%
- %%A4_COVER_ALT%%
- %%A4_COVER_CAPTION%%
- %%A4_DATE_LABEL%%
- %%A4_EYEBROW%%
- %%A4_FAQ_A1%%
- %%A4_FAQ_A2%%
- %%A4_FAQ_A3%%
- %%A4_FAQ_Q1%%
- %%A4_FAQ_Q2%%
- %%A4_FAQ_Q3%%
- %%A4_FAQ_TITLE%%
- %%A4_H2_1%%
- %%A4_H2_2%%
- %%A4_H2_3%%
- %%A4_H2_4%%
- %%A4_INTRO%%
- %%A4_LATITUDE_TEXT_1%%
- %%A4_LATITUDE_TEXT_2%%
- %%A4_LATITUDE_TEXT_3%%
- %%A4_LATITUDE_TEXT_4%%
- %%A4_LATITUDE_TITLE_1%%
- %%A4_LATITUDE_TITLE_2%%
- %%A4_LATITUDE_TITLE_3%%
- %%A4_LATITUDE_TITLE_4%%
- %%A4_MODIFIED%%
- %%A4_POINT_1%%
- %%A4_POINT_2%%
- %%A4_POINT_3%%
- %%A4_PUBLISHED%%
- %%A4_QUOTE_NOTE%%
- %%A4_QUOTE_TEXT%%
- %%A4_RSS_DATE%%
- %%A4_SOURCE_LABEL%%
- %%A4_SOURCE_NOTE%%
- %%A4_SOURCE_TITLE%%
- %%A4_SOURCE_URL%%
- %%A4_SUMMARY%%
- %%A4_TITLE%%
- %%A5_ANCHOR_LABEL_1%%
- %%A5_ANCHOR_LABEL_2%%
- %%A5_ANCHOR_LABEL_3%%
- %%A5_ANCHOR_NOTE_1%%
- %%A5_ANCHOR_NOTE_2%%
- %%A5_ANCHOR_NOTE_3%%
- %%A5_ANCHOR_TEXT_1%%
- %%A5_ANCHOR_TEXT_2%%
- %%A5_ANCHOR_TEXT_3%%
- %%A5_BODY_1%%
- %%A5_BODY_2%%
- %%A5_BODY_3%%
- %%A5_BODY_4%%
- %%A5_CHECKED%%
- %%A5_CLOSING_TEXT%%
- %%A5_COVER_ALT%%
- %%A5_COVER_CAPTION%%
- %%A5_DATE_LABEL%%
- %%A5_EYEBROW%%
- %%A5_FAQ_A1%%
- %%A5_FAQ_A2%%
- %%A5_FAQ_A3%%
- %%A5_FAQ_Q1%%
- %%A5_FAQ_Q2%%
- %%A5_FAQ_Q3%%
- %%A5_FAQ_TITLE%%
- %%A5_H2_1%%
- %%A5_H2_2%%
- %%A5_H2_3%%
- %%A5_H2_4%%
- %%A5_INTRO%%
- %%A5_MODIFIED%%
- %%A5_PLATE_MARK%%
- %%A5_POINT_1%%
- %%A5_POINT_2%%
- %%A5_POINT_3%%
- %%A5_PUBLISHED%%
- %%A5_QUOTE_NOTE%%
- %%A5_QUOTE_TEXT%%
- %%A5_RSS_DATE%%
- %%A5_SOURCE_LABEL%%
- %%A5_SOURCE_NOTE%%
- %%A5_SOURCE_TITLE%%
- %%A5_SOURCE_URL%%
- %%A5_SUMMARY%%
- %%A5_TITLE%%
- %%A6_BODY_1%%
- %%A6_BODY_2%%
- %%A6_BODY_3%%
- %%A6_BODY_4%%
- %%A6_CHECKED%%
- %%A6_CLOSING_TEXT%%
- %%A6_COVER_ALT%%
- %%A6_COVER_CAPTION%%
- %%A6_DATE_LABEL%%
- %%A6_EYEBROW%%
- %%A6_FAQ_A1%%
- %%A6_FAQ_A2%%
- %%A6_FAQ_A3%%
- %%A6_FAQ_Q1%%
- %%A6_FAQ_Q2%%
- %%A6_FAQ_Q3%%
- %%A6_FAQ_TITLE%%
- %%A6_H2_1%%
- %%A6_H2_2%%
- %%A6_H2_3%%
- %%A6_H2_4%%
- %%A6_INTRO%%
- %%A6_MODIFIED%%
- %%A6_POINT_1%%
- %%A6_POINT_2%%
- %%A6_POINT_3%%
- %%A6_PUBLISHED%%
- %%A6_QUOTE_NOTE%%
- %%A6_QUOTE_TEXT%%
- %%A6_RSS_DATE%%
- %%A6_SOURCE_LABEL%%
- %%A6_SOURCE_NOTE%%
- %%A6_SOURCE_TITLE%%
- %%A6_SOURCE_URL%%
- %%A6_SUMMARY%%
- %%A6_TITLE%%
- %%A6_TRANSIT_LABEL_1%%
- %%A6_TRANSIT_LABEL_2%%
- %%A6_TRANSIT_LABEL_3%%
- %%A6_TRANSIT_LABEL_4%%
- %%A6_TRANSIT_TEXT_1%%
- %%A6_TRANSIT_TEXT_2%%
- %%A6_TRANSIT_TEXT_3%%
- %%A6_TRANSIT_TEXT_4%%
- %%A6_TRANSIT_TITLE_1%%
- %%A6_TRANSIT_TITLE_2%%
- %%A6_TRANSIT_TITLE_3%%
- %%A6_TRANSIT_TITLE_4%%
- %%A7_BODY_1%%
- %%A7_BODY_2%%
- %%A7_BODY_3%%
- %%A7_BODY_4%%
- %%A7_CHECKED%%
- %%A7_CLOSING_TEXT%%
- %%A7_COVER_ALT%%
- %%A7_COVER_CAPTION%%
- %%A7_DATE_LABEL%%
- %%A7_EYEBROW%%
- %%A7_FAQ_A1%%
- %%A7_FAQ_A2%%
- %%A7_FAQ_A3%%
- %%A7_FAQ_Q1%%
- %%A7_FAQ_Q2%%
- %%A7_FAQ_Q3%%
- %%A7_FAQ_TITLE%%
- %%A7_GLOSSARY_MARK_1%%
- %%A7_GLOSSARY_MARK_2%%
- %%A7_GLOSSARY_MARK_3%%
- %%A7_GLOSSARY_MARK_4%%
- %%A7_GLOSSARY_NOTE_1%%
- %%A7_GLOSSARY_NOTE_2%%
- %%A7_GLOSSARY_NOTE_3%%
- %%A7_GLOSSARY_NOTE_4%%
- %%A7_GLOSSARY_TERM_1%%
- %%A7_GLOSSARY_TERM_2%%
- %%A7_GLOSSARY_TERM_3%%
- %%A7_GLOSSARY_TERM_4%%
- %%A7_GLOSSARY_TEXT_1%%
- %%A7_GLOSSARY_TEXT_2%%
- %%A7_GLOSSARY_TEXT_3%%
- %%A7_GLOSSARY_TEXT_4%%
- %%A7_H2_1%%
- %%A7_H2_2%%
- %%A7_H2_3%%
- %%A7_H2_4%%
- %%A7_INTRO%%
- %%A7_MODIFIED%%
- %%A7_POINT_1%%
- %%A7_POINT_2%%
- %%A7_POINT_3%%
- %%A7_PUBLISHED%%
- %%A7_QUOTE_NOTE%%
- %%A7_QUOTE_TEXT%%
- %%A7_RSS_DATE%%
- %%A7_SOURCE_LABEL%%
- %%A7_SOURCE_NOTE%%
- %%A7_SOURCE_TITLE%%
- %%A7_SOURCE_URL%%
- %%A7_SUMMARY%%
- %%A7_TITLE%%
- %%A8_BODY_1%%
- %%A8_BODY_2%%
- %%A8_BODY_3%%
- %%A8_BODY_4%%
- %%A8_CHECKED%%
- %%A8_CLOSING_TEXT%%
- %%A8_COVER_ALT%%
- %%A8_COVER_CAPTION%%
- %%A8_DATE_LABEL%%
- %%A8_EYEBROW%%
- %%A8_FAQ_A1%%
- %%A8_FAQ_A2%%
- %%A8_FAQ_A3%%
- %%A8_FAQ_Q1%%
- %%A8_FAQ_Q2%%
- %%A8_FAQ_Q3%%
- %%A8_FAQ_TITLE%%
- %%A8_H2_1%%
- %%A8_H2_2%%
- %%A8_H2_3%%
- %%A8_H2_4%%
- %%A8_INTRO%%
- %%A8_MATRIX_1_1%%
- %%A8_MATRIX_1_2%%
- %%A8_MATRIX_1_3%%
- %%A8_MATRIX_2_1%%
- %%A8_MATRIX_2_2%%
- %%A8_MATRIX_2_3%%
- %%A8_MATRIX_3_1%%
- %%A8_MATRIX_3_2%%
- %%A8_MATRIX_3_3%%
- %%A8_MATRIX_4_1%%
- %%A8_MATRIX_4_2%%
- %%A8_MATRIX_4_3%%
- %%A8_MATRIX_CAPTION%%
- %%A8_MATRIX_COL_1%%
- %%A8_MATRIX_COL_2%%
- %%A8_MATRIX_COL_3%%
- %%A8_MATRIX_COL_4%%
- %%A8_MATRIX_ROW_1%%
- %%A8_MATRIX_ROW_2%%
- %%A8_MATRIX_ROW_3%%
- %%A8_MATRIX_ROW_4%%
- %%A8_MODIFIED%%
- %%A8_PLATE_MARK%%
- %%A8_POINT_1%%
- %%A8_POINT_2%%
- %%A8_POINT_3%%
- %%A8_PUBLISHED%%
- %%A8_QUOTE_NOTE%%
- %%A8_QUOTE_TEXT%%
- %%A8_RSS_DATE%%
- %%A8_SOURCE_LABEL%%
- %%A8_SOURCE_NOTE%%
- %%A8_SOURCE_TITLE%%
- %%A8_SOURCE_URL%%
- %%A8_SUMMARY%%
- %%A8_TITLE%%
- %%A9_BODY_1%%
- %%A9_BODY_2%%
- %%A9_BODY_3%%
- %%A9_BODY_4%%
- %%A9_CHECKED%%
- %%A9_CLOSING_TEXT%%
- %%A9_COVER_ALT%%
- %%A9_COVER_CAPTION%%
- %%A9_DATE_LABEL%%
- %%A9_EYEBROW%%
- %%A9_FAN_LABEL%%
- %%A9_FAN_POINT_1%%
- %%A9_FAN_POINT_2%%
- %%A9_FAN_POINT_3%%
- %%A9_FAN_TEXT%%
- %%A9_FAN_TITLE%%
- %%A9_FAQ_A1%%
- %%A9_FAQ_A2%%
- %%A9_FAQ_A3%%
- %%A9_FAQ_Q1%%
- %%A9_FAQ_Q2%%
- %%A9_FAQ_Q3%%
- %%A9_FAQ_TITLE%%
- %%A9_H2_1%%
- %%A9_H2_2%%
- %%A9_H2_3%%
- %%A9_H2_4%%
- %%A9_INTRO%%
- %%A9_MODIFIED%%
- %%A9_POINT_1%%
- %%A9_POINT_2%%
- %%A9_POINT_3%%
- %%A9_PUBLISHED%%
- %%A9_QUOTE_NOTE%%
- %%A9_QUOTE_TEXT%%
- %%A9_RSS_DATE%%
- %%A9_SOURCE_LABEL%%
- %%A9_SOURCE_NOTE%%
- %%A9_SOURCE_TITLE%%
- %%A9_SOURCE_URL%%
- %%A9_SUMMARY%%
- %%A9_TITLE%%
- %%ABOUT_CONTACT_NOTE%%
- %%ABOUT_H2_1%%
- %%ABOUT_H2_2%%
- %%ABOUT_H2_3%%
- %%ABOUT_H2_4%%
- %%ABOUT_INTRO%%
- %%ABOUT_TEXT_1%%
- %%ABOUT_TEXT_2%%
- %%ABOUT_TEXT_3%%
- %%ABOUT_TEXT_4%%
- %%AFFILIATE_DISCLOSURE%%
- %%AFFILIATE_LABEL%%
- %%AFFILIATE_NOTE%%
- %%AFFILIATE_URL%%
- %%AUTHOR_BIO%%
- %%AUTHOR_NAME%%
- %%BENEFIT_DISCLAIMER%%
- %%BENEFIT_RATE%%
- %%BRAND_EN%%
- %%BRAND_LINE%%
- %%BRAND_MARK%%
- %%CHART_LABEL%%
- %%CHART_MARK%%
- %%CHART_NOTE%%
- %%CONTACT_CONTACT_NOTE%%
- %%CONTACT_EMAIL%%
- %%CONTACT_H2_1%%
- %%CONTACT_H2_2%%
- %%CONTACT_H2_3%%
- %%CONTACT_H2_4%%
- %%CONTACT_INTRO%%
- %%CONTACT_TEXT_1%%
- %%CONTACT_TEXT_2%%
- %%CONTACT_TEXT_3%%
- %%CONTACT_TEXT_4%%
- %%CORRECTIONS_CONTACT_NOTE%%
- %%CORRECTIONS_H2_1%%
- %%CORRECTIONS_H2_2%%
- %%CORRECTIONS_H2_3%%
- %%CORRECTIONS_H2_4%%
- %%CORRECTIONS_INTRO%%
- %%CORRECTIONS_TEXT_1%%
- %%CORRECTIONS_TEXT_2%%
- %%CORRECTIONS_TEXT_3%%
- %%CORRECTIONS_TEXT_4%%
- %%DESK_INTRO%%
- %%DESK_LABEL%%
- %%DESK_TITLE%%
- %%DISCLAIMER_CONTACT_NOTE%%
- %%DISCLAIMER_H2_1%%
- %%DISCLAIMER_H2_2%%
- %%DISCLAIMER_H2_3%%
- %%DISCLAIMER_H2_4%%
- %%DISCLAIMER_INTRO%%
- %%DISCLAIMER_TEXT_1%%
- %%DISCLAIMER_TEXT_2%%
- %%DISCLAIMER_TEXT_3%%
- %%DISCLAIMER_TEXT_4%%
- %%DISCLOSURE_CONTACT_NOTE%%
- %%DISCLOSURE_H2_1%%
- %%DISCLOSURE_H2_2%%
- %%DISCLOSURE_H2_3%%
- %%DISCLOSURE_H2_4%%
- %%DISCLOSURE_INTRO%%
- %%DISCLOSURE_TEXT_1%%
- %%DISCLOSURE_TEXT_2%%
- %%DISCLOSURE_TEXT_3%%
- %%DISCLOSURE_TEXT_4%%
- %%EDITORIAL_CONTACT_NOTE%%
- %%EDITORIAL_H2_1%%
- %%EDITORIAL_H2_2%%
- %%EDITORIAL_H2_3%%
- %%EDITORIAL_H2_4%%
- %%EDITORIAL_INTRO%%
- %%EDITORIAL_TEXT_1%%
- %%EDITORIAL_TEXT_2%%
- %%EDITORIAL_TEXT_3%%
- %%EDITORIAL_TEXT_4%%
- %%ERROR_INTRO%%
- %%HERO_DESCRIPTION%%
- %%HERO_EYEBROW%%
- %%HERO_FIELD_1%%
- %%HERO_FIELD_2%%
- %%HERO_FIELD_3%%
- %%HERO_TITLE%%
- %%HERO_VALUE_1%%
- %%HERO_VALUE_2%%
- %%HERO_VALUE_3%%
- %%HOME_FEATURED_LABEL%%
- %%HOME_LATEST_LABEL%%
- %%HOME_LINKS_LABEL%%
- %%INDEPENDENCE_NOTE%%
- %%INVITE_CODE%%
- %%INVITE_LABEL%%
- %%LANG%%
- %%LEGACY_ARTICLE_INTRO%%
- %%LEGACY_LEGAL_INTRO%%
- %%LEGACY_TOOL_INTRO%%
- %%LEGAL_CHECKED%%
- %%PRIVACY_CONTACT_NOTE%%
- %%PRIVACY_H2_1%%
- %%PRIVACY_H2_2%%
- %%PRIVACY_H2_3%%
- %%PRIVACY_H2_4%%
- %%PRIVACY_INTRO%%
- %%PRIVACY_TEXT_1%%
- %%PRIVACY_TEXT_2%%
- %%PRIVACY_TEXT_3%%
- %%PRIVACY_TEXT_4%%
- %%REGISTER_INTRO%%
- %%REGISTER_LABEL%%
- %%REGISTER_TITLE%%
- %%RISK_NOTE%%
- %%SECTORS_INTRO%%
- %%SECTORS_TITLE%%
- %%SECTOR_1_DESC%%
- %%SECTOR_2_DESC%%
- %%SECTOR_3_DESC%%
- %%SECTOR_4_DESC%%
- %%SECURITY_EMAIL%%
- %%SECURITY_EXPIRES%%
- %%SEO_TITLE%%
- %%SITE_DESC%%
- %%SITE_DOMAIN%%
- %%SITE_NAME%%
- %%SITE_TAGLINE%%

## 本地复验

运行 validate.js、audit-template.js、audit-workflow-readiness.js 与 check-similarity.js；tools/qa/067-midnight-constellation-browser.js 枚举所有页面的四宽度双主题，并复验独立算法基准、完整复制、错误/边界、无 JS、键盘、首屏、深层 404、主题和响应式。人工查看首页、十二组件、三开场、五工具与图形资源后才记账。原包忠实度与框架就绪分开记录。
