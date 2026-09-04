# 076 Magenta Exhibit · 工作流 v2 接入契约

## 范围与风格

只制作完整网站模板，不写业务文章或注册教程，不部署。原 proof-room.css 字节保留，新 gallery-extension.css 补齐目录、十二种文章组件、五工具、公开说明和响应式。保留原首页全部 mp76 类名、洋红套准标、CMYK 色片与校样纸结构。动态源包未取得，原包忠实度未核验；不得把 UI 验收当作保真证明。

35 个 HTML：31 可索引页、404、3 个 noindex 手动兼容入口。四个交叉校样台各三篇，十二篇文章框架、五工具、七页公开说明。cornerstone 是容量角色；registrationGuide 只是兼容字段名，指通用出库签印组件页，不指定教程。

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "proof-book.html",
  "articles": [
    "proofs/source-register.html",
    "proofs/statement-layers.html",
    "proofs/date-strip.html",
    "proofs/scope-stencil.html",
    "proofs/inference-branches.html",
    "proofs/quote-proof.html",
    "proofs/number-alignment.html",
    "proofs/term-plates.html",
    "proofs/revision-marks.html",
    "proofs/accessibility-pass.html",
    "proofs/mobile-fold.html",
    "proofs/release-seal.html"
  ],
  "cornerstones": [
    "proofs/source-register.html",
    "proofs/statement-layers.html"
  ],
  "registrationGuide": "proofs/release-seal.html",
  "articleCovers": {
    "proofs/source-register.html": {
      "display": "assets/plates/source-register.webp",
      "og": "assets/plates/source-register.png"
    },
    "proofs/statement-layers.html": {
      "display": "assets/plates/statement-layers.webp",
      "og": "assets/plates/statement-layers.png"
    },
    "proofs/date-strip.html": {
      "display": "assets/plates/date-strip.webp",
      "og": "assets/plates/date-strip.png"
    },
    "proofs/scope-stencil.html": {
      "display": "assets/plates/scope-stencil.webp",
      "og": "assets/plates/scope-stencil.png"
    },
    "proofs/inference-branches.html": {
      "display": "assets/plates/inference-branches.webp",
      "og": "assets/plates/inference-branches.png"
    },
    "proofs/quote-proof.html": {
      "display": "assets/plates/quote-proof.webp",
      "og": "assets/plates/quote-proof.png"
    },
    "proofs/number-alignment.html": {
      "display": "assets/plates/number-alignment.webp",
      "og": "assets/plates/number-alignment.png"
    },
    "proofs/term-plates.html": {
      "display": "assets/plates/term-plates.webp",
      "og": "assets/plates/term-plates.png"
    },
    "proofs/revision-marks.html": {
      "display": "assets/plates/revision-marks.webp",
      "og": "assets/plates/revision-marks.png"
    },
    "proofs/accessibility-pass.html": {
      "display": "assets/plates/accessibility-pass.webp",
      "og": "assets/plates/accessibility-pass.png"
    },
    "proofs/mobile-fold.html": {
      "display": "assets/plates/mobile-fold.webp",
      "og": "assets/plates/mobile-fold.png"
    },
    "proofs/release-seal.html": {
      "display": "assets/plates/release-seal.webp",
      "og": "assets/plates/release-seal.png"
    }
  },
  "categories": [
    {
      "path": "stations/evidence-table.html",
      "label": "取证台",
      "articles": [
        "proofs/source-register.html",
        "proofs/inference-branches.html",
        "proofs/revision-marks.html"
      ]
    },
    {
      "path": "stations/language-booth.html",
      "label": "文字台",
      "articles": [
        "proofs/statement-layers.html",
        "proofs/quote-proof.html",
        "proofs/accessibility-pass.html"
      ]
    },
    {
      "path": "stations/layout-wall.html",
      "label": "版式墙",
      "articles": [
        "proofs/date-strip.html",
        "proofs/number-alignment.html",
        "proofs/mobile-fold.html"
      ]
    },
    {
      "path": "stations/release-gate.html",
      "label": "签印门",
      "articles": [
        "proofs/scope-stencil.html",
        "proofs/term-plates.html",
        "proofs/release-seal.html"
      ]
    }
  ],
  "toolIndex": "tool-room.html",
  "tools": [
    "tools/claim-source-matrix.html",
    "tools/freshness-window.html",
    "tools/headline-measure.html",
    "tools/plate-overlap.html",
    "tools/signoff-dependencies.html"
  ],
  "legal": {
    "about": "proof-office.html",
    "contact": "correction-desk.html",
    "disclosure": "relation-imprint.html",
    "disclaimer": "press-limit.html",
    "privacy": "data-plate.html",
    "corrections": "correction-register.html",
    "editorial": "editorial-standard.html"
  },
  "error404": "404.html",
  "robots": "robots.txt",
  "sitemap": "sitemap.xml",
  "feed": "feed.xml",
  "security": ".well-known/security.txt",
  "favicon": "favicon.ico",
  "appleTouchIcon": "apple-touch-icon.png",
  "socialImage": "assets/proof-cover.png",
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

- 只填经核实的正文和变量，不再补 UI、工具、目录、资源或移动端样式；保留页面角色、锚点、表单、data 属性和 ARIA。
- 三种文章开场、十二种组件已建好：来源套准框、陈述分色片、日期校样带、范围镂空版、推断分支图、引语批注稿、数字套准表、术语色版条、修订边批、无障碍签字格、移动折页图、出库签印。
- 首页只有邀请码复制、弹性利益点和脚注，没有推广直链。release-seal.html 恰留一处静态推广槽；保留 target、rel 四值和紧邻披露。
- 旧入口不自动跳转；抽象校样图不是证据、真实商品或检测结果。QA 示例文案不能作为正式文章发布。

## 变量格式与容量

BRAND_EN 为 3–24 个英文或罗马字；首页标题 8–20 个中文字，说明 35–65 字；邀请码 4–28 ASCII 字符；利益脚注 16–45 字。文章摘要 40–100 字，正文槽 100–800 字。短标签建议 2–12 字。

SITE_DOMAIN 为纯域名；AFFILIATE_URL 与 SOURCE_URL 为核实的绝对 HTTPS URL，拒绝脚本协议。邮箱纯地址；LANG 为真实 BCP47；PUBLISHED/MODIFIED 为 ISO 日期；RSS_DATE 为 RFC2822 UTC；SECURITY_EXPIRES 为未来 RFC3339 UTC。

替换按 HTML 文本、属性、XML 和 JSON-LD 上下文分别转义，不能未转义全局替换，不能把 HTML 塞进纯文字变量。事实、合规与生产验收仍属单站流程。

## 五个本地工具

1. 陈述来源套准表：1–100 行“陈述 | 来源编号 | fact/inference”，同一陈述唯一；输出全部映射和两类计数。
2. 核对日期保鲜窗：1–100 行“条目 | YYYY-MM-DD | 0–3650 天”，参考日同为真公历；按 UTC 整日差输出全部状态。
3. 标题视觉宽度尺：1–80 行标题；空格半单位，汉字/假名/韩文/Emoji 两单位，其余一码点一单位，按 24/32/40 向上取整。
4. 页面色版叠印账：1–100 行“页面 | C,M,Y,K 子集”，页面唯一、色版不重复；输出逐页集合和各版覆盖计数。
5. 签字依赖闸：1–100 行“编号 | done/pending | 依赖或 -”；检查缺失、自指、循环，以递归祖先阻塞输出每项状态。

所有工具先查原值长度、控制字符和不完整 Unicode，再做 NFKC；错误聚焦字段并关联 aria-errormessage。输入变化立即让旧报告和复制失效，复制完成也不能覆盖新状态。只在浏览器本地处理。

## 全部变量

- %%AFFILIATE_URL%%
- %%AUTHOR_NAME%%
- %%BENEFIT_DISCLAIMER%%
- %%BENEFIT_RATE%%
- %%BRAND_EN%%
- %%CATALOG_DESC%%
- %%CATALOG_INTRO%%
- %%CATALOG_TITLE%%
- %%CHECK_1%%
- %%CHECK_2%%
- %%CHECK_3%%
- %%CHECK_4%%
- %%CONTACT_EMAIL%%
- %%CONTACT_NOTE%%
- %%CURRENT_YEAR%%
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
- %%P01_AUTHOR_NOTE%%
- %%P01_BODY_1_A%%
- %%P01_BODY_1_B%%
- %%P01_BODY_2_A%%
- %%P01_BODY_2_B%%
- %%P01_BODY_3_A%%
- %%P01_BODY_3_B%%
- %%P01_BODY_4_A%%
- %%P01_BODY_4_B%%
- %%P01_CARD_NOTE%%
- %%P01_COMPONENT_NOTE%%
- %%P01_COMPONENT_TITLE%%
- %%P01_CONCLUSION%%
- %%P01_COVER_ALT%%
- %%P01_COVER_CAPTION%%
- %%P01_EYEBROW%%
- %%P01_FAQ_A_1%%
- %%P01_FAQ_A_2%%
- %%P01_FAQ_Q_1%%
- %%P01_FAQ_Q_2%%
- %%P01_FAQ_TITLE%%
- %%P01_H2_1%%
- %%P01_H2_2%%
- %%P01_H2_3%%
- %%P01_H2_4%%
- %%P01_MODIFIED%%
- %%P01_PUBLISHED%%
- %%P01_READING_NOTE%%
- %%P01_RSS_DATE%%
- %%P01_SECTION_LABEL_1%%
- %%P01_SECTION_LABEL_2%%
- %%P01_SECTION_LABEL_3%%
- %%P01_SECTION_LABEL_4%%
- %%P01_SOURCE_LABEL_1%%
- %%P01_SOURCE_LABEL_2%%
- %%P01_SOURCE_LABEL_3%%
- %%P01_SOURCE_TEXT_1%%
- %%P01_SOURCE_TEXT_2%%
- %%P01_SOURCE_TEXT_3%%
- %%P01_SOURCE_TITLE_1%%
- %%P01_SOURCE_TITLE_2%%
- %%P01_SOURCE_TITLE_3%%
- %%P01_SOURCE_URL_1%%
- %%P01_SOURCE_URL_2%%
- %%P01_SOURCE_URL_3%%
- %%P01_SUMMARY%%
- %%P01_TITLE%%
- %%P02_AUTHOR_NOTE%%
- %%P02_BODY_1_A%%
- %%P02_BODY_1_B%%
- %%P02_BODY_2_A%%
- %%P02_BODY_2_B%%
- %%P02_BODY_3_A%%
- %%P02_BODY_3_B%%
- %%P02_BODY_4_A%%
- %%P02_BODY_4_B%%
- %%P02_CARD_NOTE%%
- %%P02_CONCLUSION%%
- %%P02_COVER_ALT%%
- %%P02_COVER_CAPTION%%
- %%P02_EYEBROW%%
- %%P02_FAQ_A_1%%
- %%P02_FAQ_A_2%%
- %%P02_FAQ_Q_1%%
- %%P02_FAQ_Q_2%%
- %%P02_FAQ_TITLE%%
- %%P02_H2_1%%
- %%P02_H2_2%%
- %%P02_H2_3%%
- %%P02_H2_4%%
- %%P02_LAYER_LABEL_1%%
- %%P02_LAYER_LABEL_2%%
- %%P02_LAYER_LABEL_3%%
- %%P02_LAYER_LABEL_4%%
- %%P02_LAYER_TEXT_1%%
- %%P02_LAYER_TEXT_2%%
- %%P02_LAYER_TEXT_3%%
- %%P02_LAYER_TEXT_4%%
- %%P02_LAYER_TITLE_1%%
- %%P02_LAYER_TITLE_2%%
- %%P02_LAYER_TITLE_3%%
- %%P02_LAYER_TITLE_4%%
- %%P02_MODIFIED%%
- %%P02_PUBLISHED%%
- %%P02_READING_NOTE%%
- %%P02_RSS_DATE%%
- %%P02_SECTION_LABEL_1%%
- %%P02_SECTION_LABEL_2%%
- %%P02_SECTION_LABEL_3%%
- %%P02_SECTION_LABEL_4%%
- %%P02_SUMMARY%%
- %%P02_TITLE%%
- %%P03_AUTHOR_NOTE%%
- %%P03_BODY_1_A%%
- %%P03_BODY_1_B%%
- %%P03_BODY_2_A%%
- %%P03_BODY_2_B%%
- %%P03_BODY_3_A%%
- %%P03_BODY_3_B%%
- %%P03_BODY_4_A%%
- %%P03_BODY_4_B%%
- %%P03_CARD_NOTE%%
- %%P03_CONCLUSION%%
- %%P03_COVER_ALT%%
- %%P03_COVER_CAPTION%%
- %%P03_DATE_1%%
- %%P03_DATE_2%%
- %%P03_DATE_3%%
- %%P03_DATE_4%%
- %%P03_DATE_ISO_1%%
- %%P03_DATE_ISO_2%%
- %%P03_DATE_ISO_3%%
- %%P03_DATE_ISO_4%%
- %%P03_DATE_TEXT_1%%
- %%P03_DATE_TEXT_2%%
- %%P03_DATE_TEXT_3%%
- %%P03_DATE_TEXT_4%%
- %%P03_DATE_TITLE_1%%
- %%P03_DATE_TITLE_2%%
- %%P03_DATE_TITLE_3%%
- %%P03_DATE_TITLE_4%%
- %%P03_EYEBROW%%
- %%P03_FAQ_A_1%%
- %%P03_FAQ_A_2%%
- %%P03_FAQ_Q_1%%
- %%P03_FAQ_Q_2%%
- %%P03_FAQ_TITLE%%
- %%P03_H2_1%%
- %%P03_H2_2%%
- %%P03_H2_3%%
- %%P03_H2_4%%
- %%P03_MODIFIED%%
- %%P03_PUBLISHED%%
- %%P03_READING_NOTE%%
- %%P03_RSS_DATE%%
- %%P03_SECTION_LABEL_1%%
- %%P03_SECTION_LABEL_2%%
- %%P03_SECTION_LABEL_3%%
- %%P03_SECTION_LABEL_4%%
- %%P03_SUMMARY%%
- %%P03_TITLE%%
- %%P04_AUTHOR_NOTE%%
- %%P04_BODY_1_A%%
- %%P04_BODY_1_B%%
- %%P04_BODY_2_A%%
- %%P04_BODY_2_B%%
- %%P04_BODY_3_A%%
- %%P04_BODY_3_B%%
- %%P04_BODY_4_A%%
- %%P04_BODY_4_B%%
- %%P04_CARD_NOTE%%
- %%P04_CONCLUSION%%
- %%P04_COVER_ALT%%
- %%P04_COVER_CAPTION%%
- %%P04_EYEBROW%%
- %%P04_FAQ_A_1%%
- %%P04_FAQ_A_2%%
- %%P04_FAQ_Q_1%%
- %%P04_FAQ_Q_2%%
- %%P04_FAQ_TITLE%%
- %%P04_H2_1%%
- %%P04_H2_2%%
- %%P04_H2_3%%
- %%P04_H2_4%%
- %%P04_MODIFIED%%
- %%P04_PUBLISHED%%
- %%P04_READING_NOTE%%
- %%P04_RSS_DATE%%
- %%P04_SCOPE_HEADING_1%%
- %%P04_SCOPE_HEADING_2%%
- %%P04_SCOPE_HEADING_3%%
- %%P04_SCOPE_MARK_1%%
- %%P04_SCOPE_MARK_2%%
- %%P04_SCOPE_MARK_3%%
- %%P04_SCOPE_TEXT_1%%
- %%P04_SCOPE_TEXT_2%%
- %%P04_SCOPE_TEXT_3%%
- %%P04_SCOPE_TITLE%%
- %%P04_SECTION_LABEL_1%%
- %%P04_SECTION_LABEL_2%%
- %%P04_SECTION_LABEL_3%%
- %%P04_SECTION_LABEL_4%%
- %%P04_SUMMARY%%
- %%P04_TITLE%%
- %%P05_AUTHOR_NOTE%%
- %%P05_BODY_1_A%%
- %%P05_BODY_1_B%%
- %%P05_BODY_2_A%%
- %%P05_BODY_2_B%%
- %%P05_BODY_3_A%%
- %%P05_BODY_3_B%%
- %%P05_BODY_4_A%%
- %%P05_BODY_4_B%%
- %%P05_BRANCH_1%%
- %%P05_BRANCH_2%%
- %%P05_BRANCH_3%%
- %%P05_BRANCH_NOTE%%
- %%P05_CARD_NOTE%%
- %%P05_CONCLUSION%%
- %%P05_COVER_ALT%%
- %%P05_COVER_CAPTION%%
- %%P05_EYEBROW%%
- %%P05_FAQ_A_1%%
- %%P05_FAQ_A_2%%
- %%P05_FAQ_Q_1%%
- %%P05_FAQ_Q_2%%
- %%P05_FAQ_TITLE%%
- %%P05_H2_1%%
- %%P05_H2_2%%
- %%P05_H2_3%%
- %%P05_H2_4%%
- %%P05_MODIFIED%%
- %%P05_PUBLISHED%%
- %%P05_READING_NOTE%%
- %%P05_ROOT%%
- %%P05_RSS_DATE%%
- %%P05_SECTION_LABEL_1%%
- %%P05_SECTION_LABEL_2%%
- %%P05_SECTION_LABEL_3%%
- %%P05_SECTION_LABEL_4%%
- %%P05_SUMMARY%%
- %%P05_TITLE%%
- %%P06_AUTHOR_NOTE%%
- %%P06_BODY_1_A%%
- %%P06_BODY_1_B%%
- %%P06_BODY_2_A%%
- %%P06_BODY_2_B%%
- %%P06_BODY_3_A%%
- %%P06_BODY_3_B%%
- %%P06_BODY_4_A%%
- %%P06_BODY_4_B%%
- %%P06_CARD_NOTE%%
- %%P06_CONCLUSION%%
- %%P06_COVER_ALT%%
- %%P06_COVER_CAPTION%%
- %%P06_EYEBROW%%
- %%P06_FAQ_A_1%%
- %%P06_FAQ_A_2%%
- %%P06_FAQ_Q_1%%
- %%P06_FAQ_Q_2%%
- %%P06_FAQ_TITLE%%
- %%P06_H2_1%%
- %%P06_H2_2%%
- %%P06_H2_3%%
- %%P06_H2_4%%
- %%P06_MODIFIED%%
- %%P06_PUBLISHED%%
- %%P06_QUOTE%%
- %%P06_QUOTE_NOTE%%
- %%P06_QUOTE_SOURCE%%
- %%P06_READING_NOTE%%
- %%P06_RSS_DATE%%
- %%P06_SECTION_LABEL_1%%
- %%P06_SECTION_LABEL_2%%
- %%P06_SECTION_LABEL_3%%
- %%P06_SECTION_LABEL_4%%
- %%P06_SOURCE_URL_1%%
- %%P06_SUMMARY%%
- %%P06_TITLE%%
- %%P07_AUTHOR_NOTE%%
- %%P07_BODY_1_A%%
- %%P07_BODY_1_B%%
- %%P07_BODY_2_A%%
- %%P07_BODY_2_B%%
- %%P07_BODY_3_A%%
- %%P07_BODY_3_B%%
- %%P07_BODY_4_A%%
- %%P07_BODY_4_B%%
- %%P07_CARD_NOTE%%
- %%P07_CONCLUSION%%
- %%P07_COVER_ALT%%
- %%P07_COVER_CAPTION%%
- %%P07_EYEBROW%%
- %%P07_FAQ_A_1%%
- %%P07_FAQ_A_2%%
- %%P07_FAQ_Q_1%%
- %%P07_FAQ_Q_2%%
- %%P07_FAQ_TITLE%%
- %%P07_H2_1%%
- %%P07_H2_2%%
- %%P07_H2_3%%
- %%P07_H2_4%%
- %%P07_MODIFIED%%
- %%P07_PUBLISHED%%
- %%P07_READING_NOTE%%
- %%P07_ROW_1%%
- %%P07_ROW_2%%
- %%P07_ROW_3%%
- %%P07_ROW_4%%
- %%P07_RSS_DATE%%
- %%P07_SECTION_LABEL_1%%
- %%P07_SECTION_LABEL_2%%
- %%P07_SECTION_LABEL_3%%
- %%P07_SECTION_LABEL_4%%
- %%P07_SUMMARY%%
- %%P07_TABLE_CAPTION%%
- %%P07_TH_1%%
- %%P07_TH_2%%
- %%P07_TH_3%%
- %%P07_TITLE%%
- %%P07_VALUE_1%%
- %%P07_VALUE_2%%
- %%P07_VALUE_3%%
- %%P07_VALUE_4%%
- %%P07_VALUE_NOTE_1%%
- %%P07_VALUE_NOTE_2%%
- %%P07_VALUE_NOTE_3%%
- %%P07_VALUE_NOTE_4%%
- %%P08_AUTHOR_NOTE%%
- %%P08_BODY_1_A%%
- %%P08_BODY_1_B%%
- %%P08_BODY_2_A%%
- %%P08_BODY_2_B%%
- %%P08_BODY_3_A%%
- %%P08_BODY_3_B%%
- %%P08_BODY_4_A%%
- %%P08_BODY_4_B%%
- %%P08_CARD_NOTE%%
- %%P08_CONCLUSION%%
- %%P08_COVER_ALT%%
- %%P08_COVER_CAPTION%%
- %%P08_DEFINITION_1%%
- %%P08_DEFINITION_2%%
- %%P08_DEFINITION_3%%
- %%P08_DEFINITION_4%%
- %%P08_EYEBROW%%
- %%P08_FAQ_A_1%%
- %%P08_FAQ_A_2%%
- %%P08_FAQ_Q_1%%
- %%P08_FAQ_Q_2%%
- %%P08_FAQ_TITLE%%
- %%P08_H2_1%%
- %%P08_H2_2%%
- %%P08_H2_3%%
- %%P08_H2_4%%
- %%P08_MODIFIED%%
- %%P08_PUBLISHED%%
- %%P08_READING_NOTE%%
- %%P08_RSS_DATE%%
- %%P08_SECTION_LABEL_1%%
- %%P08_SECTION_LABEL_2%%
- %%P08_SECTION_LABEL_3%%
- %%P08_SECTION_LABEL_4%%
- %%P08_SUMMARY%%
- %%P08_TERM_1%%
- %%P08_TERM_2%%
- %%P08_TERM_3%%
- %%P08_TERM_4%%
- %%P08_TERM_NOTE_1%%
- %%P08_TERM_NOTE_2%%
- %%P08_TERM_NOTE_3%%
- %%P08_TERM_NOTE_4%%
- %%P08_TITLE%%
- %%P09_AUTHOR_NOTE%%
- %%P09_BODY_1_A%%
- %%P09_BODY_1_B%%
- %%P09_BODY_2_A%%
- %%P09_BODY_2_B%%
- %%P09_BODY_3_A%%
- %%P09_BODY_3_B%%
- %%P09_BODY_4_A%%
- %%P09_BODY_4_B%%
- %%P09_CARD_NOTE%%
- %%P09_CONCLUSION%%
- %%P09_COVER_ALT%%
- %%P09_COVER_CAPTION%%
- %%P09_EYEBROW%%
- %%P09_FAQ_A_1%%
- %%P09_FAQ_A_2%%
- %%P09_FAQ_Q_1%%
- %%P09_FAQ_Q_2%%
- %%P09_FAQ_TITLE%%
- %%P09_H2_1%%
- %%P09_H2_2%%
- %%P09_H2_3%%
- %%P09_H2_4%%
- %%P09_MODIFIED%%
- %%P09_NEW_1%%
- %%P09_NEW_2%%
- %%P09_NEW_3%%
- %%P09_OLD_1%%
- %%P09_OLD_2%%
- %%P09_OLD_3%%
- %%P09_PUBLISHED%%
- %%P09_READING_NOTE%%
- %%P09_REVISION_DATE_1%%
- %%P09_REVISION_DATE_2%%
- %%P09_REVISION_DATE_3%%
- %%P09_REVISION_REASON_1%%
- %%P09_REVISION_REASON_2%%
- %%P09_REVISION_REASON_3%%
- %%P09_RSS_DATE%%
- %%P09_SECTION_LABEL_1%%
- %%P09_SECTION_LABEL_2%%
- %%P09_SECTION_LABEL_3%%
- %%P09_SECTION_LABEL_4%%
- %%P09_SUMMARY%%
- %%P09_TITLE%%
- %%P10_ACCESS_STATE_1%%
- %%P10_ACCESS_STATE_2%%
- %%P10_ACCESS_STATE_3%%
- %%P10_ACCESS_STATE_4%%
- %%P10_ACCESS_STATE_5%%
- %%P10_ACCESS_TEXT_1%%
- %%P10_ACCESS_TEXT_2%%
- %%P10_ACCESS_TEXT_3%%
- %%P10_ACCESS_TEXT_4%%
- %%P10_ACCESS_TEXT_5%%
- %%P10_ACCESS_TITLE_1%%
- %%P10_ACCESS_TITLE_2%%
- %%P10_ACCESS_TITLE_3%%
- %%P10_ACCESS_TITLE_4%%
- %%P10_ACCESS_TITLE_5%%
- %%P10_AUTHOR_NOTE%%
- %%P10_BODY_1_A%%
- %%P10_BODY_1_B%%
- %%P10_BODY_2_A%%
- %%P10_BODY_2_B%%
- %%P10_BODY_3_A%%
- %%P10_BODY_3_B%%
- %%P10_BODY_4_A%%
- %%P10_BODY_4_B%%
- %%P10_CARD_NOTE%%
- %%P10_CONCLUSION%%
- %%P10_COVER_ALT%%
- %%P10_COVER_CAPTION%%
- %%P10_EYEBROW%%
- %%P10_FAQ_A_1%%
- %%P10_FAQ_A_2%%
- %%P10_FAQ_Q_1%%
- %%P10_FAQ_Q_2%%
- %%P10_FAQ_TITLE%%
- %%P10_H2_1%%
- %%P10_H2_2%%
- %%P10_H2_3%%
- %%P10_H2_4%%
- %%P10_MODIFIED%%
- %%P10_PUBLISHED%%
- %%P10_READING_NOTE%%
- %%P10_RSS_DATE%%
- %%P10_SECTION_LABEL_1%%
- %%P10_SECTION_LABEL_2%%
- %%P10_SECTION_LABEL_3%%
- %%P10_SECTION_LABEL_4%%
- %%P10_SUMMARY%%
- %%P10_TITLE%%
- %%P11_AUTHOR_NOTE%%
- %%P11_BODY_1_A%%
- %%P11_BODY_1_B%%
- %%P11_BODY_2_A%%
- %%P11_BODY_2_B%%
- %%P11_BODY_3_A%%
- %%P11_BODY_3_B%%
- %%P11_BODY_4_A%%
- %%P11_BODY_4_B%%
- %%P11_CARD_NOTE%%
- %%P11_CONCLUSION%%
- %%P11_COVER_ALT%%
- %%P11_COVER_CAPTION%%
- %%P11_EYEBROW%%
- %%P11_FAQ_A_1%%
- %%P11_FAQ_A_2%%
- %%P11_FAQ_Q_1%%
- %%P11_FAQ_Q_2%%
- %%P11_FAQ_TITLE%%
- %%P11_FRAME_1%%
- %%P11_FRAME_2%%
- %%P11_FRAME_3%%
- %%P11_FRAME_NOTE%%
- %%P11_H2_1%%
- %%P11_H2_2%%
- %%P11_H2_3%%
- %%P11_H2_4%%
- %%P11_MODIFIED%%
- %%P11_PUBLISHED%%
- %%P11_READING_NOTE%%
- %%P11_RSS_DATE%%
- %%P11_SECTION_LABEL_1%%
- %%P11_SECTION_LABEL_2%%
- %%P11_SECTION_LABEL_3%%
- %%P11_SECTION_LABEL_4%%
- %%P11_SUMMARY%%
- %%P11_TITLE%%
- %%P12_AUTHOR_NOTE%%
- %%P12_BODY_1_A%%
- %%P12_BODY_1_B%%
- %%P12_BODY_2_A%%
- %%P12_BODY_2_B%%
- %%P12_BODY_3_A%%
- %%P12_BODY_3_B%%
- %%P12_BODY_4_A%%
- %%P12_BODY_4_B%%
- %%P12_CARD_NOTE%%
- %%P12_CONCLUSION%%
- %%P12_COVER_ALT%%
- %%P12_COVER_CAPTION%%
- %%P12_EYEBROW%%
- %%P12_FAQ_A_1%%
- %%P12_FAQ_A_2%%
- %%P12_FAQ_Q_1%%
- %%P12_FAQ_Q_2%%
- %%P12_FAQ_TITLE%%
- %%P12_H2_1%%
- %%P12_H2_2%%
- %%P12_H2_3%%
- %%P12_H2_4%%
- %%P12_MODIFIED%%
- %%P12_PUBLISHED%%
- %%P12_READING_NOTE%%
- %%P12_RSS_DATE%%
- %%P12_SEAL_TEXT%%
- %%P12_SEAL_TITLE%%
- %%P12_SECTION_LABEL_1%%
- %%P12_SECTION_LABEL_2%%
- %%P12_SECTION_LABEL_3%%
- %%P12_SECTION_LABEL_4%%
- %%P12_SUMMARY%%
- %%P12_TITLE%%
- %%PROOF_TABLE_NOTE%%
- %%PROOF_TABLE_TITLE%%
- %%REGISTRATION_ALT%%
- %%RISK_NOTE%%
- %%SECURITY_EMAIL%%
- %%SECURITY_EXPIRES%%
- %%SEO_TITLE%%
- %%SITEMAP_LASTMOD%%
- %%SITE_DESC%%
- %%SITE_DOMAIN%%
- %%SITE_NAME%%
- %%SITE_TAGLINE%%
- %%STATION_1_INTRO%%
- %%STATION_1_NOTE%%
- %%STATION_2_INTRO%%
- %%STATION_2_NOTE%%
- %%STATION_3_INTRO%%
- %%STATION_3_NOTE%%
- %%STATION_4_INTRO%%
- %%STATION_4_NOTE%%
- %%TOOLS_TITLE%%
- %%TOOL_INDEX_DESC%%
- %%TOOL_INDEX_INTRO%%
- %%TOOL_INDEX_TITLE%%
