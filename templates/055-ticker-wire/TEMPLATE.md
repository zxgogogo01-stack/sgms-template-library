# 055-ticker-wire · 霓虹快讯台

## 完整 UI 与来源边界

保留本地霓虹跑马栏目、快讯核验队列、双栏编辑机架、深色青绿与珊瑚点缀、tw55 命名以及原 skin.css。framework.css 负责完整页面和响应式扩展。原始军哥动态源包忠实度未核验；本地 UI 验收不证明原包复刻。

## 后续 AI 内容接入

只填写经核实的文字、文章和站点变量；不需重新设计 UI、补页面、封面、表格、工具或发布资源。保留 class、id、data 属性、表单 name、aria 关联及相对路径。三种开场、十二种核验组件、不同 H2/FAQ 数量与三种收尾已预搭。

- registrationGuide 仅为旧检查器兼容字段，指向 access-terminal.html 的通用推广 UI；不预定注册教程，也不代写文章。首页只展示邀请码、真复制、利益点和脚注；唯一静态推广链接在该通用内容壳内，紧邻推广披露，保留 target 与 sponsored nofollow noopener noreferrer。
- D1–D12 为相互独立的文章变量，不用相同正文填满全部文章。作者身份、来源、日期、政策、联系方式与利益条件由内容流程核实，不伪造经历、证据或适用性。封面是抽象 UI 图，不代表实测证据。
- 字标用英文或罗马字。HTML/XML 文字与属性分别转义；JSON-LD 按 JSON 字符串编码并安全转义小于号。域名不含协议或路径；URL 仅填写核实的 HTTPS 地址，来源 URL 不得写成推广地址。
- 日期 ISO；RSS_DATE 为 RFC822；SECURITY_EXPIRES 为未来 RFC3339 时间。首页标题、摘要及利益脚注保持简短，真实填充后再次核对 360px 首屏和长词。
- SIGNAL1–3_STATE 仅接受 verified、review、pending，对应 STATE_LABEL 为已核验、待复核、待确认。按真实编辑状态填写，不默认声称已核验；未知状态在 JS 下降为待确认，无 JS 使用已填标签。筛选只是本地视图，不联网核验或自动更新。
- 桌面动态栏、闪烁光标和状态点可暂停，系统 reduced-motion 优先；620px 以下隐藏动态栏，同时让光标与状态点静止，避免不可暂停的残留动画。默认深色，主题是唯一 localStorage 项；输入、结果、筛选与动态暂停不持久化。无 JS 时动态静止、阅读导航可用、工具提交禁用。
- 五个工具分别实现 UTC 时效阈值、LCS 逐行对照、最近秩分位值、CRC-32/ISO-HDLC 与 BigInt 序号缺口。各自 Guide 给出范围、样例和算法限制。所有输入在当前页面内处理，不上传；编辑和重置让旧结果失效。CRC 是非加密校验，不用于安全认证。
- article.html、tool.html、legal.html 为 noindex 兼容入口，无自动跳转。深层未知地址须由单站服务器返回真实 404 并映射到 404.html；本轮不配置或部署服务器。
- 12 套独立 SVG/PNG/WebP 封面；1200×630 PNG 社交图、SVG/ICO 图标及 180px apple-touch-icon。RSS 选第 1、3、4、6、7、9、10、12 篇摘要，不含邀请码或推广链接。

## workflow-ready-v2

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "dispatches.html",
  "articles": [
    "dispatch/source-ticket.html",
    "dispatch/update-window.html",
    "dispatch/field-scan.html",
    "dispatch/impact-radar.html",
    "dispatch/version-panel.html",
    "dispatch/quote-channel.html",
    "dispatch/scope-gates.html",
    "dispatch/time-rail.html",
    "dispatch/evidence-stack.html",
    "dispatch/open-issues.html",
    "dispatch/revision-route.html",
    "dispatch/access-terminal.html"
  ],
  "cornerstones": [
    "dispatch/source-ticket.html",
    "dispatch/update-window.html"
  ],
  "registrationGuide": "dispatch/access-terminal.html",
  "articleCovers": {
    "dispatch/source-ticket.html": {
      "display": "assets/covers/source-ticket.webp",
      "og": "assets/covers/source-ticket.png"
    },
    "dispatch/update-window.html": {
      "display": "assets/covers/update-window.webp",
      "og": "assets/covers/update-window.png"
    },
    "dispatch/field-scan.html": {
      "display": "assets/covers/field-scan.webp",
      "og": "assets/covers/field-scan.png"
    },
    "dispatch/impact-radar.html": {
      "display": "assets/covers/impact-radar.webp",
      "og": "assets/covers/impact-radar.png"
    },
    "dispatch/version-panel.html": {
      "display": "assets/covers/version-panel.webp",
      "og": "assets/covers/version-panel.png"
    },
    "dispatch/quote-channel.html": {
      "display": "assets/covers/quote-channel.webp",
      "og": "assets/covers/quote-channel.png"
    },
    "dispatch/scope-gates.html": {
      "display": "assets/covers/scope-gates.webp",
      "og": "assets/covers/scope-gates.png"
    },
    "dispatch/time-rail.html": {
      "display": "assets/covers/time-rail.webp",
      "og": "assets/covers/time-rail.png"
    },
    "dispatch/evidence-stack.html": {
      "display": "assets/covers/evidence-stack.webp",
      "og": "assets/covers/evidence-stack.png"
    },
    "dispatch/open-issues.html": {
      "display": "assets/covers/open-issues.webp",
      "og": "assets/covers/open-issues.png"
    },
    "dispatch/revision-route.html": {
      "display": "assets/covers/revision-route.webp",
      "og": "assets/covers/revision-route.png"
    },
    "dispatch/access-terminal.html": {
      "display": "assets/covers/access-terminal.webp",
      "og": "assets/covers/access-terminal.png"
    }
  },
  "categories": [
    {
      "path": "channels/source-desk.html",
      "label": "来源席",
      "articles": [
        "dispatch/source-ticket.html",
        "dispatch/update-window.html",
        "dispatch/field-scan.html",
        "dispatch/impact-radar.html"
      ]
    },
    {
      "path": "channels/scope-line.html",
      "label": "范围线",
      "articles": [
        "dispatch/version-panel.html",
        "dispatch/quote-channel.html",
        "dispatch/scope-gates.html",
        "dispatch/time-rail.html"
      ]
    },
    {
      "path": "channels/follow-up-rack.html",
      "label": "跟进架",
      "articles": [
        "dispatch/evidence-stack.html",
        "dispatch/open-issues.html",
        "dispatch/revision-route.html",
        "dispatch/access-terminal.html"
      ]
    }
  ],
  "toolIndex": "workbench.html",
  "tools": [
    "instruments/freshness-window.html",
    "instruments/line-changes.html",
    "instruments/latency-profile.html",
    "instruments/text-checksum.html",
    "instruments/sequence-gaps.html"
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

## 变量清单

- `{404_DESC}`
- `{ABOUT_DESC}`
- `{ABOUT_H2_1}`
- `{ABOUT_H2_2}`
- `{ABOUT_H2_3}`
- `{ABOUT_INTRO}`
- `{ABOUT_MODIFIED}`
- `{ABOUT_NOTE}`
- `{ABOUT_TEXT_1}`
- `{ABOUT_TEXT_2}`
- `{ABOUT_TEXT_3}`
- `{AFFILIATE_DISCLOSURE}`
- `{AFFILIATE_URL}`
- `{ARTICLE_ENTRY_DESC}`
- `{AUTHOR_BIO}`
- `{AUTHOR_NAME}`
- `{BENEFIT_DISCLAIMER}`
- `{BENEFIT_RATE}`
- `{BRAND_EN}`
- `{CHANNEL1_DESC}`
- `{CHANNEL1_INTRO}`
- `{CHANNEL2_DESC}`
- `{CHANNEL2_INTRO}`
- `{CHANNEL3_DESC}`
- `{CHANNEL3_INTRO}`
- `{CONTACT_DESC}`
- `{CONTACT_EMAIL}`
- `{CONTACT_H2_1}`
- `{CONTACT_H2_2}`
- `{CONTACT_H2_3}`
- `{CONTACT_INTRO}`
- `{CONTACT_MODIFIED}`
- `{CONTACT_NOTE}`
- `{CONTACT_TEXT_1}`
- `{CONTACT_TEXT_2}`
- `{CONTACT_TEXT_3}`
- `{CORRECTIONS_DESC}`
- `{CORRECTIONS_H2_1}`
- `{CORRECTIONS_H2_2}`
- `{CORRECTIONS_H2_3}`
- `{CORRECTIONS_INTRO}`
- `{CORRECTIONS_MODIFIED}`
- `{CORRECTIONS_NOTE}`
- `{CORRECTIONS_TEXT_1}`
- `{CORRECTIONS_TEXT_2}`
- `{CORRECTIONS_TEXT_3}`
- `{D10_CHECKED}`
- `{D10_COVER_ALT}`
- `{D10_COVER_CAPTION}`
- `{D10_DESC}`
- `{D10_END_TEXT}`
- `{D10_END_TITLE}`
- `{D10_FAQ_A1}`
- `{D10_FAQ_A2}`
- `{D10_FAQ_Q1}`
- `{D10_FAQ_Q2}`
- `{D10_H2_1}`
- `{D10_H2_2}`
- `{D10_H2_3}`
- `{D10_INTRO}`
- `{D10_MODIFIED}`
- `{D10_M_LABEL}`
- `{D10_M_NOTE}`
- `{D10_M_TEXT_1}`
- `{D10_M_TEXT_2}`
- `{D10_M_TEXT_3}`
- `{D10_PUBLISHED}`
- `{D10_QUOTE}`
- `{D10_QUOTE_ATTRIBUTION}`
- `{D10_RSS_DATE}`
- `{D10_SOURCE_LABEL_1}`
- `{D10_SOURCE_LABEL_2}`
- `{D10_SOURCE_NOTE_1}`
- `{D10_SOURCE_NOTE_2}`
- `{D10_SOURCE_URL_1}`
- `{D10_SOURCE_URL_2}`
- `{D10_SUMMARY}`
- `{D10_TABLE_CAPTION}`
- `{D10_TABLE_CELL_1_1}`
- `{D10_TABLE_CELL_1_2}`
- `{D10_TABLE_CELL_2_1}`
- `{D10_TABLE_CELL_2_2}`
- `{D10_TABLE_CELL_3_1}`
- `{D10_TABLE_CELL_3_2}`
- `{D10_TABLE_COL_1}`
- `{D10_TABLE_COL_2}`
- `{D10_TABLE_COL_3}`
- `{D10_TABLE_ROW_1}`
- `{D10_TABLE_ROW_2}`
- `{D10_TABLE_ROW_3}`
- `{D10_TEXT_1}`
- `{D10_TEXT_2}`
- `{D10_TEXT_3}`
- `{D10_TITLE}`
- `{D11_CHECKED}`
- `{D11_COVER_ALT}`
- `{D11_COVER_CAPTION}`
- `{D11_DESC}`
- `{D11_END_TEXT}`
- `{D11_END_TITLE}`
- `{D11_FAQ_A1}`
- `{D11_FAQ_A2}`
- `{D11_FAQ_A3}`
- `{D11_FAQ_Q1}`
- `{D11_FAQ_Q2}`
- `{D11_FAQ_Q3}`
- `{D11_H2_1}`
- `{D11_H2_2}`
- `{D11_H2_3}`
- `{D11_H2_4}`
- `{D11_INTRO}`
- `{D11_MODIFIED}`
- `{D11_M_LABEL_1}`
- `{D11_M_LABEL_2}`
- `{D11_M_LABEL_3}`
- `{D11_M_TEXT_1}`
- `{D11_M_TEXT_2}`
- `{D11_M_TEXT_3}`
- `{D11_PUBLISHED}`
- `{D11_QUOTE}`
- `{D11_QUOTE_ATTRIBUTION}`
- `{D11_SOURCE_LABEL_1}`
- `{D11_SOURCE_LABEL_2}`
- `{D11_SOURCE_NOTE_1}`
- `{D11_SOURCE_NOTE_2}`
- `{D11_SOURCE_URL_1}`
- `{D11_SOURCE_URL_2}`
- `{D11_SUMMARY}`
- `{D11_TABLE_CAPTION}`
- `{D11_TABLE_CELL_1_1}`
- `{D11_TABLE_CELL_1_2}`
- `{D11_TABLE_CELL_2_1}`
- `{D11_TABLE_CELL_2_2}`
- `{D11_TABLE_CELL_3_1}`
- `{D11_TABLE_CELL_3_2}`
- `{D11_TABLE_COL_1}`
- `{D11_TABLE_COL_2}`
- `{D11_TABLE_COL_3}`
- `{D11_TABLE_ROW_1}`
- `{D11_TABLE_ROW_2}`
- `{D11_TABLE_ROW_3}`
- `{D11_TEXT_1}`
- `{D11_TEXT_2}`
- `{D11_TEXT_3}`
- `{D11_TEXT_4}`
- `{D11_TITLE}`
- `{D12_CHECKED}`
- `{D12_COVER_ALT}`
- `{D12_COVER_CAPTION}`
- `{D12_CTA_LABEL}`
- `{D12_DESC}`
- `{D12_END_TEXT}`
- `{D12_END_TITLE}`
- `{D12_FAQ_A1}`
- `{D12_FAQ_A2}`
- `{D12_FAQ_A3}`
- `{D12_FAQ_A4}`
- `{D12_FAQ_Q1}`
- `{D12_FAQ_Q2}`
- `{D12_FAQ_Q3}`
- `{D12_FAQ_Q4}`
- `{D12_H2_1}`
- `{D12_H2_2}`
- `{D12_H2_3}`
- `{D12_H2_4}`
- `{D12_H2_5}`
- `{D12_INTRO}`
- `{D12_MODIFIED}`
- `{D12_M_LABEL}`
- `{D12_M_TEXT}`
- `{D12_PUBLISHED}`
- `{D12_QUOTE}`
- `{D12_QUOTE_ATTRIBUTION}`
- `{D12_RSS_DATE}`
- `{D12_SOURCE_LABEL_1}`
- `{D12_SOURCE_LABEL_2}`
- `{D12_SOURCE_NOTE_1}`
- `{D12_SOURCE_NOTE_2}`
- `{D12_SOURCE_URL_1}`
- `{D12_SOURCE_URL_2}`
- `{D12_SUMMARY}`
- `{D12_TABLE_CAPTION}`
- `{D12_TABLE_CELL_1_1}`
- `{D12_TABLE_CELL_1_2}`
- `{D12_TABLE_CELL_2_1}`
- `{D12_TABLE_CELL_2_2}`
- `{D12_TABLE_CELL_3_1}`
- `{D12_TABLE_CELL_3_2}`
- `{D12_TABLE_COL_1}`
- `{D12_TABLE_COL_2}`
- `{D12_TABLE_COL_3}`
- `{D12_TABLE_ROW_1}`
- `{D12_TABLE_ROW_2}`
- `{D12_TABLE_ROW_3}`
- `{D12_TEXT_1}`
- `{D12_TEXT_2}`
- `{D12_TEXT_3}`
- `{D12_TEXT_4}`
- `{D12_TEXT_5}`
- `{D12_TITLE}`
- `{D1_CHECKED}`
- `{D1_COVER_ALT}`
- `{D1_COVER_CAPTION}`
- `{D1_DESC}`
- `{D1_END_TEXT}`
- `{D1_END_TITLE}`
- `{D1_FAQ_A1}`
- `{D1_FAQ_A2}`
- `{D1_FAQ_Q1}`
- `{D1_FAQ_Q2}`
- `{D1_H2_1}`
- `{D1_H2_2}`
- `{D1_H2_3}`
- `{D1_INTRO}`
- `{D1_MODIFIED}`
- `{D1_M_LABEL_1}`
- `{D1_M_LABEL_2}`
- `{D1_M_LABEL_3}`
- `{D1_M_TEXT_1}`
- `{D1_M_TEXT_2}`
- `{D1_M_TEXT_3}`
- `{D1_PUBLISHED}`
- `{D1_QUOTE}`
- `{D1_QUOTE_ATTRIBUTION}`
- `{D1_RSS_DATE}`
- `{D1_SOURCE_LABEL_1}`
- `{D1_SOURCE_LABEL_2}`
- `{D1_SOURCE_NOTE_1}`
- `{D1_SOURCE_NOTE_2}`
- `{D1_SOURCE_URL_1}`
- `{D1_SOURCE_URL_2}`
- `{D1_SUMMARY}`
- `{D1_TABLE_CAPTION}`
- `{D1_TABLE_CELL_1_1}`
- `{D1_TABLE_CELL_1_2}`
- `{D1_TABLE_CELL_2_1}`
- `{D1_TABLE_CELL_2_2}`
- `{D1_TABLE_CELL_3_1}`
- `{D1_TABLE_CELL_3_2}`
- `{D1_TABLE_COL_1}`
- `{D1_TABLE_COL_2}`
- `{D1_TABLE_COL_3}`
- `{D1_TABLE_ROW_1}`
- `{D1_TABLE_ROW_2}`
- `{D1_TABLE_ROW_3}`
- `{D1_TEXT_1}`
- `{D1_TEXT_2}`
- `{D1_TEXT_3}`
- `{D1_TITLE}`
- `{D2_CHECKED}`
- `{D2_COVER_ALT}`
- `{D2_COVER_CAPTION}`
- `{D2_DESC}`
- `{D2_END_TEXT}`
- `{D2_END_TITLE}`
- `{D2_FAQ_A1}`
- `{D2_FAQ_A2}`
- `{D2_FAQ_A3}`
- `{D2_FAQ_Q1}`
- `{D2_FAQ_Q2}`
- `{D2_FAQ_Q3}`
- `{D2_H2_1}`
- `{D2_H2_2}`
- `{D2_H2_3}`
- `{D2_H2_4}`
- `{D2_INTRO}`
- `{D2_MODIFIED}`
- `{D2_M_DATE_1}`
- `{D2_M_DATE_2}`
- `{D2_M_LABEL_1}`
- `{D2_M_LABEL_2}`
- `{D2_M_NOTE}`
- `{D2_M_TEXT_1}`
- `{D2_M_TEXT_2}`
- `{D2_PUBLISHED}`
- `{D2_QUOTE}`
- `{D2_QUOTE_ATTRIBUTION}`
- `{D2_SOURCE_LABEL_1}`
- `{D2_SOURCE_LABEL_2}`
- `{D2_SOURCE_NOTE_1}`
- `{D2_SOURCE_NOTE_2}`
- `{D2_SOURCE_URL_1}`
- `{D2_SOURCE_URL_2}`
- `{D2_SUMMARY}`
- `{D2_TABLE_CAPTION}`
- `{D2_TABLE_CELL_1_1}`
- `{D2_TABLE_CELL_1_2}`
- `{D2_TABLE_CELL_2_1}`
- `{D2_TABLE_CELL_2_2}`
- `{D2_TABLE_CELL_3_1}`
- `{D2_TABLE_CELL_3_2}`
- `{D2_TABLE_COL_1}`
- `{D2_TABLE_COL_2}`
- `{D2_TABLE_COL_3}`
- `{D2_TABLE_ROW_1}`
- `{D2_TABLE_ROW_2}`
- `{D2_TABLE_ROW_3}`
- `{D2_TEXT_1}`
- `{D2_TEXT_2}`
- `{D2_TEXT_3}`
- `{D2_TEXT_4}`
- `{D2_TITLE}`
- `{D3_CHECKED}`
- `{D3_COVER_ALT}`
- `{D3_COVER_CAPTION}`
- `{D3_DESC}`
- `{D3_END_TEXT}`
- `{D3_END_TITLE}`
- `{D3_FAQ_A1}`
- `{D3_FAQ_A2}`
- `{D3_FAQ_A3}`
- `{D3_FAQ_A4}`
- `{D3_FAQ_Q1}`
- `{D3_FAQ_Q2}`
- `{D3_FAQ_Q3}`
- `{D3_FAQ_Q4}`
- `{D3_H2_1}`
- `{D3_H2_2}`
- `{D3_H2_3}`
- `{D3_H2_4}`
- `{D3_H2_5}`
- `{D3_INTRO}`
- `{D3_MODIFIED}`
- `{D3_M_LABEL_1}`
- `{D3_M_LABEL_2}`
- `{D3_M_LABEL_3}`
- `{D3_M_TEXT_1}`
- `{D3_M_TEXT_2}`
- `{D3_M_TEXT_3}`
- `{D3_PUBLISHED}`
- `{D3_QUOTE}`
- `{D3_QUOTE_ATTRIBUTION}`
- `{D3_RSS_DATE}`
- `{D3_SOURCE_LABEL_1}`
- `{D3_SOURCE_LABEL_2}`
- `{D3_SOURCE_NOTE_1}`
- `{D3_SOURCE_NOTE_2}`
- `{D3_SOURCE_URL_1}`
- `{D3_SOURCE_URL_2}`
- `{D3_SUMMARY}`
- `{D3_TABLE_CAPTION}`
- `{D3_TABLE_CELL_1_1}`
- `{D3_TABLE_CELL_1_2}`
- `{D3_TABLE_CELL_2_1}`
- `{D3_TABLE_CELL_2_2}`
- `{D3_TABLE_CELL_3_1}`
- `{D3_TABLE_CELL_3_2}`
- `{D3_TABLE_COL_1}`
- `{D3_TABLE_COL_2}`
- `{D3_TABLE_COL_3}`
- `{D3_TABLE_ROW_1}`
- `{D3_TABLE_ROW_2}`
- `{D3_TABLE_ROW_3}`
- `{D3_TEXT_1}`
- `{D3_TEXT_2}`
- `{D3_TEXT_3}`
- `{D3_TEXT_4}`
- `{D3_TEXT_5}`
- `{D3_TITLE}`
- `{D4_CHECKED}`
- `{D4_COVER_ALT}`
- `{D4_COVER_CAPTION}`
- `{D4_DESC}`
- `{D4_END_TEXT}`
- `{D4_END_TITLE}`
- `{D4_FAQ_A1}`
- `{D4_FAQ_A2}`
- `{D4_FAQ_Q1}`
- `{D4_FAQ_Q2}`
- `{D4_H2_1}`
- `{D4_H2_2}`
- `{D4_H2_3}`
- `{D4_INTRO}`
- `{D4_MODIFIED}`
- `{D4_M_LABEL_1}`
- `{D4_M_LABEL_2}`
- `{D4_M_LABEL_3}`
- `{D4_M_LABEL_4}`
- `{D4_M_TEXT_1}`
- `{D4_M_TEXT_2}`
- `{D4_M_TEXT_3}`
- `{D4_M_TEXT_4}`
- `{D4_PUBLISHED}`
- `{D4_QUOTE}`
- `{D4_QUOTE_ATTRIBUTION}`
- `{D4_RSS_DATE}`
- `{D4_SOURCE_LABEL_1}`
- `{D4_SOURCE_LABEL_2}`
- `{D4_SOURCE_NOTE_1}`
- `{D4_SOURCE_NOTE_2}`
- `{D4_SOURCE_URL_1}`
- `{D4_SOURCE_URL_2}`
- `{D4_SUMMARY}`
- `{D4_TABLE_CAPTION}`
- `{D4_TABLE_CELL_1_1}`
- `{D4_TABLE_CELL_1_2}`
- `{D4_TABLE_CELL_2_1}`
- `{D4_TABLE_CELL_2_2}`
- `{D4_TABLE_CELL_3_1}`
- `{D4_TABLE_CELL_3_2}`
- `{D4_TABLE_COL_1}`
- `{D4_TABLE_COL_2}`
- `{D4_TABLE_COL_3}`
- `{D4_TABLE_ROW_1}`
- `{D4_TABLE_ROW_2}`
- `{D4_TABLE_ROW_3}`
- `{D4_TEXT_1}`
- `{D4_TEXT_2}`
- `{D4_TEXT_3}`
- `{D4_TITLE}`
- `{D5_CHECKED}`
- `{D5_COVER_ALT}`
- `{D5_COVER_CAPTION}`
- `{D5_DESC}`
- `{D5_END_TEXT}`
- `{D5_END_TITLE}`
- `{D5_FAQ_A1}`
- `{D5_FAQ_A2}`
- `{D5_FAQ_A3}`
- `{D5_FAQ_Q1}`
- `{D5_FAQ_Q2}`
- `{D5_FAQ_Q3}`
- `{D5_H2_1}`
- `{D5_H2_2}`
- `{D5_H2_3}`
- `{D5_H2_4}`
- `{D5_INTRO}`
- `{D5_MODIFIED}`
- `{D5_M_LABEL}`
- `{D5_M_LABEL_1}`
- `{D5_M_LABEL_2}`
- `{D5_M_NOTE}`
- `{D5_M_TEXT_1}`
- `{D5_M_TEXT_2}`
- `{D5_PUBLISHED}`
- `{D5_QUOTE}`
- `{D5_QUOTE_ATTRIBUTION}`
- `{D5_SOURCE_LABEL_1}`
- `{D5_SOURCE_LABEL_2}`
- `{D5_SOURCE_NOTE_1}`
- `{D5_SOURCE_NOTE_2}`
- `{D5_SOURCE_URL_1}`
- `{D5_SOURCE_URL_2}`
- `{D5_SUMMARY}`
- `{D5_TABLE_CAPTION}`
- `{D5_TABLE_CELL_1_1}`
- `{D5_TABLE_CELL_1_2}`
- `{D5_TABLE_CELL_2_1}`
- `{D5_TABLE_CELL_2_2}`
- `{D5_TABLE_CELL_3_1}`
- `{D5_TABLE_CELL_3_2}`
- `{D5_TABLE_COL_1}`
- `{D5_TABLE_COL_2}`
- `{D5_TABLE_COL_3}`
- `{D5_TABLE_ROW_1}`
- `{D5_TABLE_ROW_2}`
- `{D5_TABLE_ROW_3}`
- `{D5_TEXT_1}`
- `{D5_TEXT_2}`
- `{D5_TEXT_3}`
- `{D5_TEXT_4}`
- `{D5_TITLE}`
- `{D6_CHECKED}`
- `{D6_COVER_ALT}`
- `{D6_COVER_CAPTION}`
- `{D6_DESC}`
- `{D6_END_TEXT}`
- `{D6_END_TITLE}`
- `{D6_FAQ_A1}`
- `{D6_FAQ_A2}`
- `{D6_FAQ_A3}`
- `{D6_FAQ_A4}`
- `{D6_FAQ_Q1}`
- `{D6_FAQ_Q2}`
- `{D6_FAQ_Q3}`
- `{D6_FAQ_Q4}`
- `{D6_H2_1}`
- `{D6_H2_2}`
- `{D6_H2_3}`
- `{D6_H2_4}`
- `{D6_H2_5}`
- `{D6_INTRO}`
- `{D6_MODIFIED}`
- `{D6_M_LABEL}`
- `{D6_M_NOTE}`
- `{D6_M_TEXT}`
- `{D6_PUBLISHED}`
- `{D6_QUOTE}`
- `{D6_QUOTE_ATTRIBUTION}`
- `{D6_RSS_DATE}`
- `{D6_SOURCE_LABEL_1}`
- `{D6_SOURCE_LABEL_2}`
- `{D6_SOURCE_NOTE_1}`
- `{D6_SOURCE_NOTE_2}`
- `{D6_SOURCE_URL_1}`
- `{D6_SOURCE_URL_2}`
- `{D6_SUMMARY}`
- `{D6_TABLE_CAPTION}`
- `{D6_TABLE_CELL_1_1}`
- `{D6_TABLE_CELL_1_2}`
- `{D6_TABLE_CELL_2_1}`
- `{D6_TABLE_CELL_2_2}`
- `{D6_TABLE_CELL_3_1}`
- `{D6_TABLE_CELL_3_2}`
- `{D6_TABLE_COL_1}`
- `{D6_TABLE_COL_2}`
- `{D6_TABLE_COL_3}`
- `{D6_TABLE_ROW_1}`
- `{D6_TABLE_ROW_2}`
- `{D6_TABLE_ROW_3}`
- `{D6_TEXT_1}`
- `{D6_TEXT_2}`
- `{D6_TEXT_3}`
- `{D6_TEXT_4}`
- `{D6_TEXT_5}`
- `{D6_TITLE}`
- `{D7_CHECKED}`
- `{D7_COVER_ALT}`
- `{D7_COVER_CAPTION}`
- `{D7_DESC}`
- `{D7_END_TEXT}`
- `{D7_END_TITLE}`
- `{D7_FAQ_A1}`
- `{D7_FAQ_A2}`
- `{D7_FAQ_Q1}`
- `{D7_FAQ_Q2}`
- `{D7_H2_1}`
- `{D7_H2_2}`
- `{D7_H2_3}`
- `{D7_INTRO}`
- `{D7_MODIFIED}`
- `{D7_M_LABEL_1}`
- `{D7_M_LABEL_2}`
- `{D7_M_LABEL_3}`
- `{D7_M_TEXT_1}`
- `{D7_M_TEXT_2}`
- `{D7_M_TEXT_3}`
- `{D7_PUBLISHED}`
- `{D7_QUOTE}`
- `{D7_QUOTE_ATTRIBUTION}`
- `{D7_RSS_DATE}`
- `{D7_SOURCE_LABEL_1}`
- `{D7_SOURCE_LABEL_2}`
- `{D7_SOURCE_NOTE_1}`
- `{D7_SOURCE_NOTE_2}`
- `{D7_SOURCE_URL_1}`
- `{D7_SOURCE_URL_2}`
- `{D7_SUMMARY}`
- `{D7_TABLE_CAPTION}`
- `{D7_TABLE_CELL_1_1}`
- `{D7_TABLE_CELL_1_2}`
- `{D7_TABLE_CELL_2_1}`
- `{D7_TABLE_CELL_2_2}`
- `{D7_TABLE_CELL_3_1}`
- `{D7_TABLE_CELL_3_2}`
- `{D7_TABLE_COL_1}`
- `{D7_TABLE_COL_2}`
- `{D7_TABLE_COL_3}`
- `{D7_TABLE_ROW_1}`
- `{D7_TABLE_ROW_2}`
- `{D7_TABLE_ROW_3}`
- `{D7_TEXT_1}`
- `{D7_TEXT_2}`
- `{D7_TEXT_3}`
- `{D7_TITLE}`
- `{D8_CHECKED}`
- `{D8_COVER_ALT}`
- `{D8_COVER_CAPTION}`
- `{D8_DESC}`
- `{D8_END_TEXT}`
- `{D8_END_TITLE}`
- `{D8_FAQ_A1}`
- `{D8_FAQ_A2}`
- `{D8_FAQ_A3}`
- `{D8_FAQ_Q1}`
- `{D8_FAQ_Q2}`
- `{D8_FAQ_Q3}`
- `{D8_H2_1}`
- `{D8_H2_2}`
- `{D8_H2_3}`
- `{D8_H2_4}`
- `{D8_INTRO}`
- `{D8_MODIFIED}`
- `{D8_M_DATE_1}`
- `{D8_M_DATE_2}`
- `{D8_M_DATE_3}`
- `{D8_M_LABEL_1}`
- `{D8_M_LABEL_2}`
- `{D8_M_LABEL_3}`
- `{D8_M_TEXT_1}`
- `{D8_M_TEXT_2}`
- `{D8_M_TEXT_3}`
- `{D8_PUBLISHED}`
- `{D8_QUOTE}`
- `{D8_QUOTE_ATTRIBUTION}`
- `{D8_SOURCE_LABEL_1}`
- `{D8_SOURCE_LABEL_2}`
- `{D8_SOURCE_NOTE_1}`
- `{D8_SOURCE_NOTE_2}`
- `{D8_SOURCE_URL_1}`
- `{D8_SOURCE_URL_2}`
- `{D8_SUMMARY}`
- `{D8_TABLE_CAPTION}`
- `{D8_TABLE_CELL_1_1}`
- `{D8_TABLE_CELL_1_2}`
- `{D8_TABLE_CELL_2_1}`
- `{D8_TABLE_CELL_2_2}`
- `{D8_TABLE_CELL_3_1}`
- `{D8_TABLE_CELL_3_2}`
- `{D8_TABLE_COL_1}`
- `{D8_TABLE_COL_2}`
- `{D8_TABLE_COL_3}`
- `{D8_TABLE_ROW_1}`
- `{D8_TABLE_ROW_2}`
- `{D8_TABLE_ROW_3}`
- `{D8_TEXT_1}`
- `{D8_TEXT_2}`
- `{D8_TEXT_3}`
- `{D8_TEXT_4}`
- `{D8_TITLE}`
- `{D9_CHECKED}`
- `{D9_COVER_ALT}`
- `{D9_COVER_CAPTION}`
- `{D9_DESC}`
- `{D9_END_TEXT}`
- `{D9_END_TITLE}`
- `{D9_FAQ_A1}`
- `{D9_FAQ_A2}`
- `{D9_FAQ_A3}`
- `{D9_FAQ_A4}`
- `{D9_FAQ_Q1}`
- `{D9_FAQ_Q2}`
- `{D9_FAQ_Q3}`
- `{D9_FAQ_Q4}`
- `{D9_H2_1}`
- `{D9_H2_2}`
- `{D9_H2_3}`
- `{D9_H2_4}`
- `{D9_H2_5}`
- `{D9_INTRO}`
- `{D9_MODIFIED}`
- `{D9_M_LABEL_1}`
- `{D9_M_LABEL_2}`
- `{D9_M_LABEL_3}`
- `{D9_M_TEXT_1}`
- `{D9_M_TEXT_2}`
- `{D9_M_TEXT_3}`
- `{D9_PUBLISHED}`
- `{D9_QUOTE}`
- `{D9_QUOTE_ATTRIBUTION}`
- `{D9_RSS_DATE}`
- `{D9_SOURCE_LABEL_1}`
- `{D9_SOURCE_LABEL_2}`
- `{D9_SOURCE_NOTE_1}`
- `{D9_SOURCE_NOTE_2}`
- `{D9_SOURCE_URL_1}`
- `{D9_SOURCE_URL_2}`
- `{D9_SUMMARY}`
- `{D9_TABLE_CAPTION}`
- `{D9_TABLE_CELL_1_1}`
- `{D9_TABLE_CELL_1_2}`
- `{D9_TABLE_CELL_2_1}`
- `{D9_TABLE_CELL_2_2}`
- `{D9_TABLE_CELL_3_1}`
- `{D9_TABLE_CELL_3_2}`
- `{D9_TABLE_COL_1}`
- `{D9_TABLE_COL_2}`
- `{D9_TABLE_COL_3}`
- `{D9_TABLE_ROW_1}`
- `{D9_TABLE_ROW_2}`
- `{D9_TABLE_ROW_3}`
- `{D9_TEXT_1}`
- `{D9_TEXT_2}`
- `{D9_TEXT_3}`
- `{D9_TEXT_4}`
- `{D9_TEXT_5}`
- `{D9_TITLE}`
- `{DISCLAIMER_DESC}`
- `{DISCLAIMER_H2_1}`
- `{DISCLAIMER_H2_2}`
- `{DISCLAIMER_H2_3}`
- `{DISCLAIMER_INTRO}`
- `{DISCLAIMER_MODIFIED}`
- `{DISCLAIMER_NOTE}`
- `{DISCLAIMER_TEXT_1}`
- `{DISCLAIMER_TEXT_2}`
- `{DISCLAIMER_TEXT_3}`
- `{DISCLOSURE_DESC}`
- `{DISCLOSURE_H2_1}`
- `{DISCLOSURE_H2_2}`
- `{DISCLOSURE_H2_3}`
- `{DISCLOSURE_INTRO}`
- `{DISCLOSURE_MODIFIED}`
- `{DISCLOSURE_NOTE}`
- `{DISCLOSURE_TEXT_1}`
- `{DISCLOSURE_TEXT_2}`
- `{DISCLOSURE_TEXT_3}`
- `{DISPATCHES_DESC}`
- `{DISPATCHES_INTRO}`
- `{EDITORIAL_DESC}`
- `{EDITORIAL_H2_1}`
- `{EDITORIAL_H2_2}`
- `{EDITORIAL_H2_3}`
- `{EDITORIAL_INTRO}`
- `{EDITORIAL_MODIFIED}`
- `{EDITORIAL_NOTE}`
- `{EDITORIAL_TEXT_1}`
- `{EDITORIAL_TEXT_2}`
- `{EDITORIAL_TEXT_3}`
- `{HERO_DESCRIPTION}`
- `{HERO_EYEBROW}`
- `{HERO_TITLE}`
- `{HOME_FEATURED_LABEL}`
- `{HOME_LATEST_LABEL}`
- `{HOME_LINKS_LABEL}`
- `{INDEPENDENCE_NOTE}`
- `{INVITE_CODE}`
- `{LANG}`
- `{LEGAL_ENTRY_DESC}`
- `{PRIVACY_DESC}`
- `{PRIVACY_H2_1}`
- `{PRIVACY_H2_2}`
- `{PRIVACY_H2_3}`
- `{PRIVACY_INTRO}`
- `{PRIVACY_MODIFIED}`
- `{PRIVACY_NOTE}`
- `{PRIVACY_TEXT_1}`
- `{PRIVACY_TEXT_2}`
- `{PRIVACY_TEXT_3}`
- `{QUEUE_TITLE}`
- `{RISK_NOTE}`
- `{SECURITY_EMAIL}`
- `{SECURITY_EXPIRES}`
- `{SEO_TITLE}`
- `{SIGNAL1_BODY}`
- `{SIGNAL1_CITE}`
- `{SIGNAL1_DATE}`
- `{SIGNAL1_STATE}`
- `{SIGNAL1_STATE_LABEL}`
- `{SIGNAL1_TITLE}`
- `{SIGNAL2_BODY}`
- `{SIGNAL2_CITE}`
- `{SIGNAL2_DATE}`
- `{SIGNAL2_STATE}`
- `{SIGNAL2_STATE_LABEL}`
- `{SIGNAL2_TITLE}`
- `{SIGNAL3_BODY}`
- `{SIGNAL3_CITE}`
- `{SIGNAL3_DATE}`
- `{SIGNAL3_STATE}`
- `{SIGNAL3_STATE_LABEL}`
- `{SIGNAL3_TITLE}`
- `{SITE_DESC}`
- `{SITE_DOMAIN}`
- `{SITE_NAME}`
- `{SITE_TAGLINE}`
- `{TOOL_ENTRY_DESC}`
- `{WORKBENCH_DESC}`
- `{WORKBENCH_INTRO}`

## 验收记录

2026-09-04：完整框架验收通过。34 个 HTML、30 个可索引页、84 个模板文件；旧 skin.css 字节未改，首页原有 64 个类名全部保留。原包忠实度仍未核验。

- `node tools/validate.js templates/055-ticker-wire`、`node tools/audit-template.js templates/055-ticker-wire`、`node tools/audit-workflow-readiness.js templates/055-ticker-wire` 通过，本套 P0/P1/P2 均为 0。
- `node tools/qa/055-ticker-wire-browser.js`：34 页 × 1440/768/390/360px × 明暗两主题，共 272 次最终渲染；284 项交互、边界与降级检查，零失败、零控制台或网络错误。测试站点变量只在本地 HTTP fixture 中替换，不写入可部署模板。
- 五工具覆盖默认值、非法输入、上限、闰年和状态边界、LCS 重复行与删除优先、最近秩分位、独立 Python zlib CRC 对照、Unicode/空文本、超出 Number 安全范围的精确序号、重置、原生粘贴与回车、复制拒绝及异步旧结果失效。
- 首页首屏邀请码/复制/利益脚注、主题持久化、菜单焦点与 Escape、三态核验队列、栏目筛选、唯一推广链接属性与披露、404 标题搜索及深层真实 404、无 JS 阅读与禁用提交、动画暂停/reduced-motion/手机静止、阅读进度及局部表格滚动通过。
- 人工复核首页、三类开场、十二种组件、五工具、手机表格和暗色错误状态；浅色小字与链接对比度、移动动画已修正并完整重验。首次测试的主题初始化偏差已修正，不将误报算作模板通过证据。
- 变量登记、JSON-LD 解析、页内锚点、十二封面哈希独立性与敏感模式扫描通过。相邻 054 的类名重合 1.3%、DOM 骨架 44.4%、CSS 属性序列 36.5%；全库类名最高 9.1%，仅历史 003×004、005×006 两组 CSS 参考警告。
- 最终本地证据：`artifacts/qa/055-ticker-wire-v2-2026-09-04`（忽略的渲染产物目录）；全部在本机验证，未触发 CI、未部署生产。只验收模板 UI，不替代真实内容接入后的事实、SEO 语义和合规审核。
