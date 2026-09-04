# 051-bento-desk

## 完整 UI 框架与来源边界

保留本地版本的六列便当格、靛蓝与琥珀视觉、页头页脚和决策桌结构，补齐 30 个可索引页面、404 与 3 个兼容入口。两份旧 CSS 保留原有规则，新增框架规则独立追加；不据此宣称已完成军哥动态原包忠实度审计。

## 下游 AI 内容接入

只填写变量和经核实的文字，保留 bd51 类名、id、data 属性、表单 name 和文件引用。不需要重新设计 UI、开发工具或生成通用资产。内容页有三种开场、十二种语义组件、不同章节与 FAQ 数量、三种收尾及引用/作者/相关内容区。工具说明是确定的算法使用说明，不含站点事实。

- registrationGuide 是检查器兼容字段，对应通用推广组件外壳，不是注册教程。唯一静态链接在 access-panel.html，保留四个 rel 值、新窗口与紧邻披露。
- HTML/XML 填值前进行实体转义；JSON-LD 使用 JSON 字符串编码。日期用 ISO 格式，域名不带协议和路径，推广 URL 必须是核验过的 HTTPS URL。语言、标题、摘要、日期、作者、联系方式、政策正文均由单站流程查证填写。
- 每页 A1–A12 标题、摘要、正文、来源、FAQ 和收尾变量互相独立；首屏不得用超长段落挤出复制区。新文字完成后复查 360px 与深浅主题。
- 工具不上传、不持久化输入；复制只在点击后执行，输入变更使旧结果失效，错误聚焦输入。每件工具的范围和公式见默认折叠 Guide。
- article.html、tool.html、legal.html 是 noindex 兼容入口，不自动跳转；上线服务器需把缺页状态映射至 404.html 并返回真实 404 状态码，这不属于模板自动部署行为。
- 保留全部本地封面 SVG/PNG/WebP 和社交图、favicon、apple-touch-icon。字标填英文或罗马字。

## workflow-ready-v2

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "cases.html",
  "articles": [
    "cases/criteria-board.html",
    "cases/weight-dial.html",
    "cases/option-pairs.html",
    "cases/evidence-cards.html",
    "cases/confidence-range.html",
    "cases/constraint-map.html",
    "cases/tradeoff-window.html",
    "cases/comparison-table.html",
    "cases/source-pocket.html",
    "cases/exception-tray.html",
    "cases/review-loop.html",
    "cases/access-panel.html"
  ],
  "cornerstones": [
    "cases/criteria-board.html",
    "cases/weight-dial.html"
  ],
  "registrationGuide": "cases/access-panel.html",
  "articleCovers": {
    "cases/criteria-board.html": {
      "display": "assets/covers/criteria-board.webp",
      "og": "assets/covers/criteria-board.png"
    },
    "cases/weight-dial.html": {
      "display": "assets/covers/weight-dial.webp",
      "og": "assets/covers/weight-dial.png"
    },
    "cases/option-pairs.html": {
      "display": "assets/covers/option-pairs.webp",
      "og": "assets/covers/option-pairs.png"
    },
    "cases/evidence-cards.html": {
      "display": "assets/covers/evidence-cards.webp",
      "og": "assets/covers/evidence-cards.png"
    },
    "cases/confidence-range.html": {
      "display": "assets/covers/confidence-range.webp",
      "og": "assets/covers/confidence-range.png"
    },
    "cases/constraint-map.html": {
      "display": "assets/covers/constraint-map.webp",
      "og": "assets/covers/constraint-map.png"
    },
    "cases/tradeoff-window.html": {
      "display": "assets/covers/tradeoff-window.webp",
      "og": "assets/covers/tradeoff-window.png"
    },
    "cases/comparison-table.html": {
      "display": "assets/covers/comparison-table.webp",
      "og": "assets/covers/comparison-table.png"
    },
    "cases/source-pocket.html": {
      "display": "assets/covers/source-pocket.webp",
      "og": "assets/covers/source-pocket.png"
    },
    "cases/exception-tray.html": {
      "display": "assets/covers/exception-tray.webp",
      "og": "assets/covers/exception-tray.png"
    },
    "cases/review-loop.html": {
      "display": "assets/covers/review-loop.webp",
      "og": "assets/covers/review-loop.png"
    },
    "cases/access-panel.html": {
      "display": "assets/covers/access-panel.webp",
      "og": "assets/covers/access-panel.png"
    }
  },
  "categories": [
    {
      "path": "lanes/compare-lens.html",
      "label": "比较镜面",
      "articles": [
        "cases/criteria-board.html",
        "cases/weight-dial.html",
        "cases/option-pairs.html",
        "cases/evidence-cards.html"
      ]
    },
    {
      "path": "lanes/signal-pieces.html",
      "label": "证据拼块",
      "articles": [
        "cases/confidence-range.html",
        "cases/constraint-map.html",
        "cases/tradeoff-window.html",
        "cases/comparison-table.html"
      ]
    },
    {
      "path": "lanes/decision-notes.html",
      "label": "决策札记",
      "articles": [
        "cases/source-pocket.html",
        "cases/exception-tray.html",
        "cases/review-loop.html",
        "cases/access-panel.html"
      ]
    }
  ],
  "toolIndex": "instruments.html",
  "tools": [
    "instruments/weighted-score.html",
    "instruments/pareto-frontier.html",
    "instruments/contingency-count.html",
    "instruments/top-k-overlap.html",
    "instruments/resource-combination.html"
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
  "socialImage": "assets/desk-social.png",
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

## 变量清单

`%%404_HTML_DESC%%`、`%%A10_ANSWER0%%`、`%%A10_ANSWER1%%`、`%%A10_BODY_0%%`、`%%A10_BODY_1%%`、`%%A10_BODY_2%%`、`%%A10_CITATION%%`、`%%A10_CLOSING%%`、`%%A10_CLOSING_TITLE%%`、`%%A10_COVER_CAPTION%%`、`%%A10_EXCEPTION0%%`、`%%A10_EXCEPTION0_DETAIL%%`、`%%A10_EXCEPTION1%%`、`%%A10_EXCEPTION1_DETAIL%%`、`%%A10_EXCEPTION2%%`、`%%A10_EXCEPTION2_DETAIL%%`、`%%A10_FAQ_TITLE%%`、`%%A10_H2_0%%`、`%%A10_H2_1%%`、`%%A10_H2_2%%`、`%%A10_MODIFIED%%`、`%%A10_POINT_2_A%%`、`%%A10_POINT_2_B%%`、`%%A10_PUBLISHED%%`、`%%A10_Q0%%`、`%%A10_Q1%%`、`%%A10_QUOTE%%`、`%%A10_SCOPE%%`、`%%A10_SCOPE_LABEL%%`、`%%A10_SOURCES%%`、`%%A10_SOURCE_CHECKED_1%%`、`%%A10_SOURCE_CHECKED_2%%`、`%%A10_SOURCE_CHECKED_3%%`、`%%A10_SOURCE_LABEL_1%%`、`%%A10_SOURCE_LABEL_2%%`、`%%A10_SOURCE_LABEL_3%%`、`%%A10_SOURCE_URL_1%%`、`%%A10_SOURCE_URL_2%%`、`%%A10_SOURCE_URL_3%%`、`%%A10_SUMMARY%%`、`%%A10_TITLE%%`、`%%A11_ANSWER0%%`、`%%A11_ANSWER1%%`、`%%A11_ANSWER2%%`、`%%A11_BODY_0%%`、`%%A11_BODY_1%%`、`%%A11_BODY_2%%`、`%%A11_BODY_3%%`、`%%A11_CITATION%%`、`%%A11_CLOSING_TITLE%%`、`%%A11_COVER_CAPTION%%`、`%%A11_FAQ_TITLE%%`、`%%A11_H2_0%%`、`%%A11_H2_1%%`、`%%A11_H2_2%%`、`%%A11_H2_3%%`、`%%A11_KEEP%%`、`%%A11_KEEP_LABEL%%`、`%%A11_MODIFIED%%`、`%%A11_OPEN%%`、`%%A11_OPEN_LABEL%%`、`%%A11_POINT_2_A%%`、`%%A11_POINT_2_B%%`、`%%A11_POINT_3_A%%`、`%%A11_POINT_3_B%%`、`%%A11_PUBLISHED%%`、`%%A11_Q0%%`、`%%A11_Q1%%`、`%%A11_Q2%%`、`%%A11_QUOTE%%`、`%%A11_REVIEW0%%`、`%%A11_REVIEW0_TEXT%%`、`%%A11_REVIEW1%%`、`%%A11_REVIEW1_TEXT%%`、`%%A11_REVIEW2%%`、`%%A11_REVIEW2_TEXT%%`、`%%A11_REVIEW3%%`、`%%A11_REVIEW3_TEXT%%`、`%%A11_SCOPE%%`、`%%A11_SCOPE_LABEL%%`、`%%A11_SOURCES%%`、`%%A11_SOURCE_CHECKED_1%%`、`%%A11_SOURCE_CHECKED_2%%`、`%%A11_SOURCE_CHECKED_3%%`、`%%A11_SOURCE_LABEL_1%%`、`%%A11_SOURCE_LABEL_2%%`、`%%A11_SOURCE_LABEL_3%%`、`%%A11_SOURCE_URL_1%%`、`%%A11_SOURCE_URL_2%%`、`%%A11_SOURCE_URL_3%%`、`%%A11_SUMMARY%%`、`%%A11_TITLE%%`、`%%A12_ANSWER0%%`、`%%A12_ANSWER1%%`、`%%A12_ANSWER2%%`、`%%A12_ANSWER3%%`、`%%A12_BODY_0%%`、`%%A12_BODY_1%%`、`%%A12_BODY_2%%`、`%%A12_BODY_3%%`、`%%A12_BODY_4%%`、`%%A12_CITATION%%`、`%%A12_CLOSING%%`、`%%A12_CLOSING_TITLE%%`、`%%A12_COMPONENT_TEXT%%`、`%%A12_COMPONENT_TITLE%%`、`%%A12_COVER_CAPTION%%`、`%%A12_FAQ_TITLE%%`、`%%A12_H2_0%%`、`%%A12_H2_1%%`、`%%A12_H2_2%%`、`%%A12_H2_3%%`、`%%A12_H2_4%%`、`%%A12_LINK_LABEL%%`、`%%A12_MODIFIED%%`、`%%A12_POINT_2_A%%`、`%%A12_POINT_2_B%%`、`%%A12_POINT_3_A%%`、`%%A12_POINT_3_B%%`、`%%A12_POINT_4_A%%`、`%%A12_POINT_4_B%%`、`%%A12_PUBLISHED%%`、`%%A12_Q0%%`、`%%A12_Q1%%`、`%%A12_Q2%%`、`%%A12_Q3%%`、`%%A12_QUOTE%%`、`%%A12_SCOPE%%`、`%%A12_SCOPE_LABEL%%`、`%%A12_SOURCES%%`、`%%A12_SOURCE_CHECKED_1%%`、`%%A12_SOURCE_CHECKED_2%%`、`%%A12_SOURCE_CHECKED_3%%`、`%%A12_SOURCE_LABEL_1%%`、`%%A12_SOURCE_LABEL_2%%`、`%%A12_SOURCE_LABEL_3%%`、`%%A12_SOURCE_URL_1%%`、`%%A12_SOURCE_URL_2%%`、`%%A12_SOURCE_URL_3%%`、`%%A12_SUMMARY%%`、`%%A12_TITLE%%`、`%%A1_ANSWER0%%`、`%%A1_ANSWER1%%`、`%%A1_BODY_0%%`、`%%A1_BODY_1%%`、`%%A1_BODY_2%%`、`%%A1_CELL_0_LABEL%%`、`%%A1_CELL_0_TEXT%%`、`%%A1_CELL_1_LABEL%%`、`%%A1_CELL_1_TEXT%%`、`%%A1_CELL_2_LABEL%%`、`%%A1_CELL_2_TEXT%%`、`%%A1_CELL_3_LABEL%%`、`%%A1_CELL_3_TEXT%%`、`%%A1_CITATION%%`、`%%A1_CLOSING%%`、`%%A1_CLOSING_TITLE%%`、`%%A1_COVER_CAPTION%%`、`%%A1_FAQ_TITLE%%`、`%%A1_H2_0%%`、`%%A1_H2_1%%`、`%%A1_H2_2%%`、`%%A1_MODIFIED%%`、`%%A1_POINT_2_A%%`、`%%A1_POINT_2_B%%`、`%%A1_PUBLISHED%%`、`%%A1_Q0%%`、`%%A1_Q1%%`、`%%A1_QUOTE%%`、`%%A1_SCOPE%%`、`%%A1_SCOPE_LABEL%%`、`%%A1_SOURCES%%`、`%%A1_SOURCE_CHECKED_1%%`、`%%A1_SOURCE_CHECKED_2%%`、`%%A1_SOURCE_CHECKED_3%%`、`%%A1_SOURCE_LABEL_1%%`、`%%A1_SOURCE_LABEL_2%%`、`%%A1_SOURCE_LABEL_3%%`、`%%A1_SOURCE_URL_1%%`、`%%A1_SOURCE_URL_2%%`、`%%A1_SOURCE_URL_3%%`、`%%A1_SUMMARY%%`、`%%A1_TITLE%%`、`%%A2_ANSWER0%%`、`%%A2_ANSWER1%%`、`%%A2_ANSWER2%%`、`%%A2_BODY_0%%`、`%%A2_BODY_1%%`、`%%A2_BODY_2%%`、`%%A2_BODY_3%%`、`%%A2_CELL_0_LABEL%%`、`%%A2_CELL_0_TEXT%%`、`%%A2_CELL_1_LABEL%%`、`%%A2_CELL_1_TEXT%%`、`%%A2_CELL_2_LABEL%%`、`%%A2_CELL_2_TEXT%%`、`%%A2_CELL_3_LABEL%%`、`%%A2_CELL_3_TEXT%%`、`%%A2_CITATION%%`、`%%A2_CLOSING_TITLE%%`、`%%A2_COVER_CAPTION%%`、`%%A2_FAQ_TITLE%%`、`%%A2_H2_0%%`、`%%A2_H2_1%%`、`%%A2_H2_2%%`、`%%A2_H2_3%%`、`%%A2_KEEP%%`、`%%A2_KEEP_LABEL%%`、`%%A2_MODIFIED%%`、`%%A2_OPEN%%`、`%%A2_OPEN_LABEL%%`、`%%A2_POINT_2_A%%`、`%%A2_POINT_2_B%%`、`%%A2_POINT_3_A%%`、`%%A2_POINT_3_B%%`、`%%A2_PUBLISHED%%`、`%%A2_Q0%%`、`%%A2_Q1%%`、`%%A2_Q2%%`、`%%A2_QUOTE%%`、`%%A2_SCOPE%%`、`%%A2_SCOPE_LABEL%%`、`%%A2_SOURCES%%`、`%%A2_SOURCE_CHECKED_1%%`、`%%A2_SOURCE_CHECKED_2%%`、`%%A2_SOURCE_CHECKED_3%%`、`%%A2_SOURCE_LABEL_1%%`、`%%A2_SOURCE_LABEL_2%%`、`%%A2_SOURCE_LABEL_3%%`、`%%A2_SOURCE_URL_1%%`、`%%A2_SOURCE_URL_2%%`、`%%A2_SOURCE_URL_3%%`、`%%A2_SUMMARY%%`、`%%A2_TITLE%%`、`%%A3_ANSWER0%%`、`%%A3_ANSWER1%%`、`%%A3_ANSWER2%%`、`%%A3_ANSWER3%%`、`%%A3_BODY_0%%`、`%%A3_BODY_1%%`、`%%A3_BODY_2%%`、`%%A3_BODY_3%%`、`%%A3_BODY_4%%`、`%%A3_CITATION%%`、`%%A3_CLOSING%%`、`%%A3_CLOSING_TITLE%%`、`%%A3_COVER_CAPTION%%`、`%%A3_FAQ_TITLE%%`、`%%A3_H2_0%%`、`%%A3_H2_1%%`、`%%A3_H2_2%%`、`%%A3_H2_3%%`、`%%A3_H2_4%%`、`%%A3_MODIFIED%%`、`%%A3_OPTION0%%`、`%%A3_OPTION0_LIMIT%%`、`%%A3_OPTION0_PLUS%%`、`%%A3_OPTION0_TEXT%%`、`%%A3_OPTION1%%`、`%%A3_OPTION1_LIMIT%%`、`%%A3_OPTION1_PLUS%%`、`%%A3_OPTION1_TEXT%%`、`%%A3_POINT_2_A%%`、`%%A3_POINT_2_B%%`、`%%A3_POINT_3_A%%`、`%%A3_POINT_3_B%%`、`%%A3_POINT_4_A%%`、`%%A3_POINT_4_B%%`、`%%A3_PUBLISHED%%`、`%%A3_Q0%%`、`%%A3_Q1%%`、`%%A3_Q2%%`、`%%A3_Q3%%`、`%%A3_QUOTE%%`、`%%A3_SCOPE%%`、`%%A3_SCOPE_LABEL%%`、`%%A3_SOURCES%%`、`%%A3_SOURCE_CHECKED_1%%`、`%%A3_SOURCE_CHECKED_2%%`、`%%A3_SOURCE_CHECKED_3%%`、`%%A3_SOURCE_LABEL_1%%`、`%%A3_SOURCE_LABEL_2%%`、`%%A3_SOURCE_LABEL_3%%`、`%%A3_SOURCE_URL_1%%`、`%%A3_SOURCE_URL_2%%`、`%%A3_SOURCE_URL_3%%`、`%%A3_SUMMARY%%`、`%%A3_TITLE%%`、`%%A4_ANSWER0%%`、`%%A4_ANSWER1%%`、`%%A4_BODY_0%%`、`%%A4_BODY_1%%`、`%%A4_BODY_2%%`、`%%A4_CITATION%%`、`%%A4_CLOSING%%`、`%%A4_CLOSING_TITLE%%`、`%%A4_COVER_CAPTION%%`、`%%A4_EVIDENCE0%%`、`%%A4_EVIDENCE1%%`、`%%A4_EVIDENCE2%%`、`%%A4_FAQ_TITLE%%`、`%%A4_H2_0%%`、`%%A4_H2_1%%`、`%%A4_H2_2%%`、`%%A4_MODIFIED%%`、`%%A4_POINT_2_A%%`、`%%A4_POINT_2_B%%`、`%%A4_PUBLISHED%%`、`%%A4_Q0%%`、`%%A4_Q1%%`、`%%A4_QUOTE%%`、`%%A4_SCOPE%%`、`%%A4_SCOPE_LABEL%%`、`%%A4_SOURCE0%%`、`%%A4_SOURCE1%%`、`%%A4_SOURCE2%%`、`%%A4_SOURCES%%`、`%%A4_SOURCE_CHECKED_1%%`、`%%A4_SOURCE_CHECKED_2%%`、`%%A4_SOURCE_CHECKED_3%%`、`%%A4_SOURCE_LABEL_1%%`、`%%A4_SOURCE_LABEL_2%%`、`%%A4_SOURCE_LABEL_3%%`、`%%A4_SOURCE_URL_1%%`、`%%A4_SOURCE_URL_2%%`、`%%A4_SOURCE_URL_3%%`、`%%A4_SUMMARY%%`、`%%A4_TITLE%%`、`%%A5_ANSWER0%%`、`%%A5_ANSWER1%%`、`%%A5_ANSWER2%%`、`%%A5_BODY_0%%`、`%%A5_BODY_1%%`、`%%A5_BODY_2%%`、`%%A5_BODY_3%%`、`%%A5_CELL_0_LABEL%%`、`%%A5_CELL_0_TEXT%%`、`%%A5_CELL_1_LABEL%%`、`%%A5_CELL_1_TEXT%%`、`%%A5_CELL_2_LABEL%%`、`%%A5_CELL_2_TEXT%%`、`%%A5_CELL_3_LABEL%%`、`%%A5_CELL_3_TEXT%%`、`%%A5_CITATION%%`、`%%A5_CLOSING_TITLE%%`、`%%A5_COVER_CAPTION%%`、`%%A5_FAQ_TITLE%%`、`%%A5_H2_0%%`、`%%A5_H2_1%%`、`%%A5_H2_2%%`、`%%A5_H2_3%%`、`%%A5_KEEP%%`、`%%A5_KEEP_LABEL%%`、`%%A5_MODIFIED%%`、`%%A5_OPEN%%`、`%%A5_OPEN_LABEL%%`、`%%A5_POINT_2_A%%`、`%%A5_POINT_2_B%%`、`%%A5_POINT_3_A%%`、`%%A5_POINT_3_B%%`、`%%A5_PUBLISHED%%`、`%%A5_Q0%%`、`%%A5_Q1%%`、`%%A5_Q2%%`、`%%A5_QUOTE%%`、`%%A5_RANGE_LIMIT%%`、`%%A5_SCOPE%%`、`%%A5_SCOPE_LABEL%%`、`%%A5_SOURCES%%`、`%%A5_SOURCE_CHECKED_1%%`、`%%A5_SOURCE_CHECKED_2%%`、`%%A5_SOURCE_CHECKED_3%%`、`%%A5_SOURCE_LABEL_1%%`、`%%A5_SOURCE_LABEL_2%%`、`%%A5_SOURCE_LABEL_3%%`、`%%A5_SOURCE_URL_1%%`、`%%A5_SOURCE_URL_2%%`、`%%A5_SOURCE_URL_3%%`、`%%A5_SUMMARY%%`、`%%A5_TITLE%%`、`%%A6_ANSWER0%%`、`%%A6_ANSWER1%%`、`%%A6_ANSWER2%%`、`%%A6_ANSWER3%%`、`%%A6_BODY_0%%`、`%%A6_BODY_1%%`、`%%A6_BODY_2%%`、`%%A6_BODY_3%%`、`%%A6_BODY_4%%`、`%%A6_CITATION%%`、`%%A6_CLOSING%%`、`%%A6_CLOSING_TITLE%%`、`%%A6_COL1%%`、`%%A6_COL2%%`、`%%A6_COL3%%`、`%%A6_COVER_CAPTION%%`、`%%A6_FAQ_TITLE%%`、`%%A6_H2_0%%`、`%%A6_H2_1%%`、`%%A6_H2_2%%`、`%%A6_H2_3%%`、`%%A6_H2_4%%`、`%%A6_MODIFIED%%`、`%%A6_NOTE0%%`、`%%A6_NOTE1%%`、`%%A6_NOTE2%%`、`%%A6_POINT_2_A%%`、`%%A6_POINT_2_B%%`、`%%A6_POINT_3_A%%`、`%%A6_POINT_3_B%%`、`%%A6_POINT_4_A%%`、`%%A6_POINT_4_B%%`、`%%A6_PUBLISHED%%`、`%%A6_Q0%%`、`%%A6_Q1%%`、`%%A6_Q2%%`、`%%A6_Q3%%`、`%%A6_QUOTE%%`、`%%A6_ROW0%%`、`%%A6_ROW1%%`、`%%A6_ROW2%%`、`%%A6_SCOPE%%`、`%%A6_SCOPE_LABEL%%`、`%%A6_SOURCES%%`、`%%A6_SOURCE_CHECKED_1%%`、`%%A6_SOURCE_CHECKED_2%%`、`%%A6_SOURCE_CHECKED_3%%`、`%%A6_SOURCE_LABEL_1%%`、`%%A6_SOURCE_LABEL_2%%`、`%%A6_SOURCE_LABEL_3%%`、`%%A6_SOURCE_URL_1%%`、`%%A6_SOURCE_URL_2%%`、`%%A6_SOURCE_URL_3%%`、`%%A6_SUMMARY%%`、`%%A6_TABLE_CAPTION%%`、`%%A6_TITLE%%`、`%%A6_VALUE0%%`、`%%A6_VALUE1%%`、`%%A6_VALUE2%%`、`%%A7_ANSWER0%%`、`%%A7_ANSWER1%%`、`%%A7_BODY_0%%`、`%%A7_BODY_1%%`、`%%A7_BODY_2%%`、`%%A7_CELL_0_LABEL%%`、`%%A7_CELL_0_TEXT%%`、`%%A7_CELL_1_LABEL%%`、`%%A7_CELL_1_TEXT%%`、`%%A7_CELL_2_LABEL%%`、`%%A7_CELL_2_TEXT%%`、`%%A7_CELL_3_LABEL%%`、`%%A7_CELL_3_TEXT%%`、`%%A7_CITATION%%`、`%%A7_CLOSING%%`、`%%A7_CLOSING_TITLE%%`、`%%A7_COVER_CAPTION%%`、`%%A7_FAQ_TITLE%%`、`%%A7_H2_0%%`、`%%A7_H2_1%%`、`%%A7_H2_2%%`、`%%A7_MODIFIED%%`、`%%A7_POINT_2_A%%`、`%%A7_POINT_2_B%%`、`%%A7_PUBLISHED%%`、`%%A7_Q0%%`、`%%A7_Q1%%`、`%%A7_QUOTE%%`、`%%A7_SCOPE%%`、`%%A7_SCOPE_LABEL%%`、`%%A7_SOURCES%%`、`%%A7_SOURCE_CHECKED_1%%`、`%%A7_SOURCE_CHECKED_2%%`、`%%A7_SOURCE_CHECKED_3%%`、`%%A7_SOURCE_LABEL_1%%`、`%%A7_SOURCE_LABEL_2%%`、`%%A7_SOURCE_LABEL_3%%`、`%%A7_SOURCE_URL_1%%`、`%%A7_SOURCE_URL_2%%`、`%%A7_SOURCE_URL_3%%`、`%%A7_SUMMARY%%`、`%%A7_TITLE%%`、`%%A8_ANSWER0%%`、`%%A8_ANSWER1%%`、`%%A8_ANSWER2%%`、`%%A8_BODY_0%%`、`%%A8_BODY_1%%`、`%%A8_BODY_2%%`、`%%A8_BODY_3%%`、`%%A8_CITATION%%`、`%%A8_CLOSING_TITLE%%`、`%%A8_COL1%%`、`%%A8_COL2%%`、`%%A8_COL3%%`、`%%A8_COVER_CAPTION%%`、`%%A8_FAQ_TITLE%%`、`%%A8_H2_0%%`、`%%A8_H2_1%%`、`%%A8_H2_2%%`、`%%A8_H2_3%%`、`%%A8_KEEP%%`、`%%A8_KEEP_LABEL%%`、`%%A8_MODIFIED%%`、`%%A8_NOTE0%%`、`%%A8_NOTE1%%`、`%%A8_NOTE2%%`、`%%A8_OPEN%%`、`%%A8_OPEN_LABEL%%`、`%%A8_POINT_2_A%%`、`%%A8_POINT_2_B%%`、`%%A8_POINT_3_A%%`、`%%A8_POINT_3_B%%`、`%%A8_PUBLISHED%%`、`%%A8_Q0%%`、`%%A8_Q1%%`、`%%A8_Q2%%`、`%%A8_QUOTE%%`、`%%A8_ROW0%%`、`%%A8_ROW1%%`、`%%A8_ROW2%%`、`%%A8_SCOPE%%`、`%%A8_SCOPE_LABEL%%`、`%%A8_SOURCES%%`、`%%A8_SOURCE_CHECKED_1%%`、`%%A8_SOURCE_CHECKED_2%%`、`%%A8_SOURCE_CHECKED_3%%`、`%%A8_SOURCE_LABEL_1%%`、`%%A8_SOURCE_LABEL_2%%`、`%%A8_SOURCE_LABEL_3%%`、`%%A8_SOURCE_URL_1%%`、`%%A8_SOURCE_URL_2%%`、`%%A8_SOURCE_URL_3%%`、`%%A8_SUMMARY%%`、`%%A8_TABLE_CAPTION%%`、`%%A8_TITLE%%`、`%%A8_VALUE0%%`、`%%A8_VALUE1%%`、`%%A8_VALUE2%%`、`%%A9_ANSWER0%%`、`%%A9_ANSWER1%%`、`%%A9_ANSWER2%%`、`%%A9_ANSWER3%%`、`%%A9_BODY_0%%`、`%%A9_BODY_1%%`、`%%A9_BODY_2%%`、`%%A9_BODY_3%%`、`%%A9_BODY_4%%`、`%%A9_CELL_0_LABEL%%`、`%%A9_CELL_0_TEXT%%`、`%%A9_CELL_1_LABEL%%`、`%%A9_CELL_1_TEXT%%`、`%%A9_CELL_2_LABEL%%`、`%%A9_CELL_2_TEXT%%`、`%%A9_CELL_3_LABEL%%`、`%%A9_CELL_3_TEXT%%`、`%%A9_CITATION%%`、`%%A9_CLOSING%%`、`%%A9_CLOSING_TITLE%%`、`%%A9_COVER_CAPTION%%`、`%%A9_FAQ_TITLE%%`、`%%A9_H2_0%%`、`%%A9_H2_1%%`、`%%A9_H2_2%%`、`%%A9_H2_3%%`、`%%A9_H2_4%%`、`%%A9_MODIFIED%%`、`%%A9_POINT_2_A%%`、`%%A9_POINT_2_B%%`、`%%A9_POINT_3_A%%`、`%%A9_POINT_3_B%%`、`%%A9_POINT_4_A%%`、`%%A9_POINT_4_B%%`、`%%A9_PUBLISHED%%`、`%%A9_Q0%%`、`%%A9_Q1%%`、`%%A9_Q2%%`、`%%A9_Q3%%`、`%%A9_QUOTE%%`、`%%A9_SCOPE%%`、`%%A9_SCOPE_LABEL%%`、`%%A9_SOURCES%%`、`%%A9_SOURCE_CHECKED_1%%`、`%%A9_SOURCE_CHECKED_2%%`、`%%A9_SOURCE_CHECKED_3%%`、`%%A9_SOURCE_LABEL_1%%`、`%%A9_SOURCE_LABEL_2%%`、`%%A9_SOURCE_LABEL_3%%`、`%%A9_SOURCE_NOTE%%`、`%%A9_SOURCE_URL_1%%`、`%%A9_SOURCE_URL_2%%`、`%%A9_SOURCE_URL_3%%`、`%%A9_SUMMARY%%`、`%%A9_TITLE%%`、`%%ABOUT_HTML_DESC%%`、`%%ABOUT_INTRO%%`、`%%ABOUT_SECTION_0%%`、`%%ABOUT_SECTION_1%%`、`%%ABOUT_SECTION_2%%`、`%%ABOUT_SECTION_3%%`、`%%AFFILIATE_DISCLOSURE%%`、`%%AFFILIATE_URL%%`、`%%ARTICLE_ENTRY_NOTE%%`、`%%ARTICLE_HTML_DESC%%`、`%%AUTHOR_BIO%%`、`%%AUTHOR_NAME%%`、`%%BENEFIT_DISCLAIMER%%`、`%%BENEFIT_RATE%%`、`%%BRAND_EN%%`、`%%CASES_HTML_DESC%%`、`%%CASES_INTRO%%`、`%%CAT1_DESC%%`、`%%CAT2_DESC%%`、`%%CAT3_DESC%%`、`%%CONTACT_EMAIL%%`、`%%CONTACT_HTML_DESC%%`、`%%CONTACT_INTRO%%`、`%%CONTACT_SECTION_0%%`、`%%CONTACT_SECTION_1%%`、`%%CONTACT_SECTION_2%%`、`%%CONTACT_SECTION_3%%`、`%%CORRECTIONS_HTML_DESC%%`、`%%CORRECTIONS_INTRO%%`、`%%CORRECTIONS_SECTION_0%%`、`%%CORRECTIONS_SECTION_1%%`、`%%CORRECTIONS_SECTION_2%%`、`%%CORRECTIONS_SECTION_3%%`、`%%DESK_ASIDE_TEXT%%`、`%%DESK_ASIDE_TITLE%%`、`%%DESK_CAPTION%%`、`%%DESK_CONSTRAINTS%%`、`%%DESK_CRITERIA%%`、`%%DESK_EVIDENCE%%`、`%%DESK_FOOTNOTE%%`、`%%DESK_LABEL%%`、`%%DESK_NOTE_0%%`、`%%DESK_NOTE_1%%`、`%%DESK_NOTE_2%%`、`%%DESK_NOTE_3%%`、`%%DESK_RESULT%%`、`%%DESK_TITLE%%`、`%%DISCLAIMER_HTML_DESC%%`、`%%DISCLAIMER_INTRO%%`、`%%DISCLAIMER_SECTION_0%%`、`%%DISCLAIMER_SECTION_1%%`、`%%DISCLAIMER_SECTION_2%%`、`%%DISCLAIMER_SECTION_3%%`、`%%DISCLOSURE_HTML_DESC%%`、`%%DISCLOSURE_INTRO%%`、`%%DISCLOSURE_SECTION_0%%`、`%%DISCLOSURE_SECTION_1%%`、`%%DISCLOSURE_SECTION_2%%`、`%%DISCLOSURE_SECTION_3%%`、`%%EDITORIAL_HTML_DESC%%`、`%%EDITORIAL_INTRO%%`、`%%EDITORIAL_SECTION_0%%`、`%%EDITORIAL_SECTION_1%%`、`%%EDITORIAL_SECTION_2%%`、`%%EDITORIAL_SECTION_3%%`、`%%FOOTER_NOTE%%`、`%%HERO_DESCRIPTION%%`、`%%HERO_EYEBROW%%`、`%%HERO_TITLE%%`、`%%HOME_FEATURED_LABEL%%`、`%%INDEPENDENCE_NOTE%%`、`%%INSTRUMENTS_HTML_DESC%%`、`%%INVITE_CODE%%`、`%%LANES_COMPARE_LENS_HTML_DESC%%`、`%%LANES_DECISION_NOTES_HTML_DESC%%`、`%%LANES_SIGNAL_PIECES_HTML_DESC%%`、`%%LANG%%`、`%%LEGAL_ENTRY_NOTE%%`、`%%LEGAL_HTML_DESC%%`、`%%POLICY_MODIFIED%%`、`%%PRIVACY_HTML_DESC%%`、`%%PRIVACY_INTRO%%`、`%%PRIVACY_SECTION_0%%`、`%%PRIVACY_SECTION_1%%`、`%%PRIVACY_SECTION_2%%`、`%%PRIVACY_SECTION_3%%`、`%%RISK_NOTE%%`、`%%SECURITY_EMAIL%%`、`%%SECURITY_EXPIRES%%`、`%%SECURITY_LANGUAGES%%`、`%%SEO_TITLE%%`、`%%SITE_DESC%%`、`%%SITE_DOMAIN%%`、`%%SITE_NAME%%`、`%%TOOL_ENTRY_NOTE%%`、`%%TOOL_HTML_DESC%%`
