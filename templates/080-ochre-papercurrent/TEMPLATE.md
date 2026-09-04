# 080 Ochre Papercurrent · 工作流 v2 接入契约

## 范围与风格

只制作完整网站模板，不写业务文章或注册教程，不部署。原 `paperfold.css` 字节保留，新 `paperfold-extension.css` 补齐四叶目录、十二种编辑组件、五个本地工具、八项公开说明与响应式。保留原首页全部 pc80 类名以及赤陶折页、状态条、展开目录和书尾页。动态源包未取得，原包忠实度未核验；不得把 UI 验收当作保真证明。

36 个 HTML：32 个可索引页、404、3 个 noindex 手动兼容入口。`registrationGuide` 只是工作流兼容字段名，指通用披露插页组件，不是注册教程。

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "folio-register.html",
  "articles": [
    "folios/source-margin.html",
    "folios/claim-thread.html",
    "folios/context-panel.html",
    "folios/citation-footnote.html",
    "folios/annotated-gutter.html",
    "folios/note-apparatus.html",
    "folios/version-corrigenda.html",
    "folios/revision-fold.html",
    "folios/date-colophon.html",
    "folios/editorial-handoff.html",
    "folios/publication-check.html",
    "folios/disclosure-insert.html"
  ],
  "cornerstones": [
    "folios/source-margin.html",
    "folios/citation-footnote.html"
  ],
  "registrationGuide": "folios/disclosure-insert.html",
  "articleCovers": {
    "folios/source-margin.html": {
      "display": "assets/folios/source-margin.webp",
      "og": "assets/folios/source-margin.png"
    },
    "folios/claim-thread.html": {
      "display": "assets/folios/claim-thread.webp",
      "og": "assets/folios/claim-thread.png"
    },
    "folios/context-panel.html": {
      "display": "assets/folios/context-panel.webp",
      "og": "assets/folios/context-panel.png"
    },
    "folios/citation-footnote.html": {
      "display": "assets/folios/citation-footnote.webp",
      "og": "assets/folios/citation-footnote.png"
    },
    "folios/annotated-gutter.html": {
      "display": "assets/folios/annotated-gutter.webp",
      "og": "assets/folios/annotated-gutter.png"
    },
    "folios/note-apparatus.html": {
      "display": "assets/folios/note-apparatus.webp",
      "og": "assets/folios/note-apparatus.png"
    },
    "folios/version-corrigenda.html": {
      "display": "assets/folios/version-corrigenda.webp",
      "og": "assets/folios/version-corrigenda.png"
    },
    "folios/revision-fold.html": {
      "display": "assets/folios/revision-fold.webp",
      "og": "assets/folios/revision-fold.png"
    },
    "folios/date-colophon.html": {
      "display": "assets/folios/date-colophon.webp",
      "og": "assets/folios/date-colophon.png"
    },
    "folios/editorial-handoff.html": {
      "display": "assets/folios/editorial-handoff.webp",
      "og": "assets/folios/editorial-handoff.png"
    },
    "folios/publication-check.html": {
      "display": "assets/folios/publication-check.webp",
      "og": "assets/folios/publication-check.png"
    },
    "folios/disclosure-insert.html": {
      "display": "assets/folios/disclosure-insert.webp",
      "og": "assets/folios/disclosure-insert.png"
    }
  },
  "categories": [
    {
      "path": "leaves/source-leaf.html",
      "label": "材料叶",
      "articles": [
        "folios/source-margin.html",
        "folios/claim-thread.html",
        "folios/context-panel.html"
      ]
    },
    {
      "path": "leaves/context-leaf.html",
      "label": "语境叶",
      "articles": [
        "folios/citation-footnote.html",
        "folios/annotated-gutter.html",
        "folios/note-apparatus.html"
      ]
    },
    {
      "path": "leaves/revision-leaf.html",
      "label": "修订叶",
      "articles": [
        "folios/version-corrigenda.html",
        "folios/revision-fold.html",
        "folios/date-colophon.html"
      ]
    },
    {
      "path": "leaves/handoff-leaf.html",
      "label": "交接叶",
      "articles": [
        "folios/editorial-handoff.html",
        "folios/publication-check.html",
        "folios/disclosure-insert.html"
      ]
    }
  ],
  "toolIndex": "proofing-desk.html",
  "tools": [
    "tools/footnote-bijection.html",
    "tools/fold-pagination.html",
    "tools/citation-density.html",
    "tools/revision-chronology.html",
    "tools/claim-evidence.html"
  ],
  "legal": {
    "about": "edition-charter.html",
    "contact": "editorial-desk.html",
    "corrections": "corrigenda-policy.html",
    "disclosure": "relation-insert.html",
    "disclaimer": "reading-boundary.html",
    "privacy": "local-privacy.html",
    "updates": "edition-changelog.html",
    "editorial": "editorial-method.html"
  },
  "error404": "404.html",
  "robots": "robots.txt",
  "sitemap": "sitemap.xml",
  "feed": "feed.xml",
  "security": ".well-known/security.txt",
  "favicon": "favicon.ico",
  "appleTouchIcon": "apple-touch-icon.png",
  "socialImage": "assets/papercurrent-cover.png",
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

- 只填写经过核实的正文和变量，不再补 UI、目录、资源、组件、工具或移动端样式；保留页面角色、路径、锚点、表单、`data-pc80-*` 与 ARIA。
- 首页仅有邀请码复制、弹性利益点与脚注，没有推广直链。`folios/disclosure-insert.html` 恰留一处推广链接槽，必须保留四值 rel、target 与紧邻披露。
- 文章封面为编辑折页抽象图，不是事实证据。示例结构和工具演示输入不能作为业务内容发布。

## 变量格式与容量

`BRAND_EN` 为 3–24 个英文或罗马字；首页标题建议 8–22 个中文字；摘要 40–100 字；正文槽 100–800 字。邀请码 4–28 个 ASCII 字符；利益脚注 16–45 字。域名为纯域名；URL 必须是已核验的绝对 HTTPS URL；日期使用 YYYY-MM-DD；邮箱为纯地址。必须按 HTML 文本、属性、XML 与 JSON-LD 上下文分别转义，禁止未转义的全局替换。

## 五个本地工具

1. 脚注双向对照器：1–300 行，`ID | ref | location` 或 `ID | note | source`，每个 ID 恰有一条引用和一条定义。
2. 折页页序规划器：1–200 行 `leaf | pages`，页数 1–9999，书帖 4/8/16 页，使用整数页序与补白。
3. 引用密度描图器：1–300 行 `section | words | citations`，整数输入，使用 BigInt 固定精度计算每千字密度。
4. 修订年表整理器：1–300 行 `id | YYYY-MM-DD | stage`，按日期与原序稳定排序，报告同日重复阶段。
5. 陈述证据覆盖器：1–300 行 `claim | source1,source2`，去重来源，按 1–4 门槛完整输出合格与不足项。

所有工具先检查原始长度、控制字符、异常代理项与行数，再 NFKC；输入变化使旧报告和复制按钮立即失效。工具不联网、不写 localStorage、不发送表单内容。

## 全部替换变量

- %%ABOUT_DESC%%
- %%ABOUT_INTRO%%
- %%ABOUT_NOTE%%
- %%ABOUT_NOTE_TITLE%%
- %%ABOUT_SECTION_TEXT_1%%
- %%ABOUT_SECTION_TEXT_2%%
- %%ABOUT_SECTION_TEXT_3%%
- %%ABOUT_SECTION_TEXT_4%%
- %%ABOUT_SECTION_TEXT_5%%
- %%ABOUT_SECTION_TITLE_1%%
- %%ABOUT_SECTION_TITLE_2%%
- %%ABOUT_SECTION_TITLE_3%%
- %%ABOUT_SECTION_TITLE_4%%
- %%ABOUT_SECTION_TITLE_5%%
- %%ABOUT_TITLE%%
- %%AFFILIATE_URL%%
- %%AUTHOR_NAME%%
- %%BENEFIT_DISCLAIMER%%
- %%BENEFIT_RATE%%
- %%BRAND_EN%%
- %%CATEGORY_1_DESC%%
- %%CATEGORY_1_INTRO%%
- %%CATEGORY_1_NOTE%%
- %%CATEGORY_1_TITLE%%
- %%CATEGORY_2_DESC%%
- %%CATEGORY_2_INTRO%%
- %%CATEGORY_2_NOTE%%
- %%CATEGORY_2_TITLE%%
- %%CATEGORY_3_DESC%%
- %%CATEGORY_3_INTRO%%
- %%CATEGORY_3_NOTE%%
- %%CATEGORY_3_TITLE%%
- %%CATEGORY_4_DESC%%
- %%CATEGORY_4_INTRO%%
- %%CATEGORY_4_NOTE%%
- %%CATEGORY_4_TITLE%%
- %%CONTACT_DESC%%
- %%CONTACT_EMAIL%%
- %%CONTACT_INTRO%%
- %%CONTACT_NOTE%%
- %%CONTACT_NOTE_TITLE%%
- %%CONTACT_SECTION_TEXT_1%%
- %%CONTACT_SECTION_TEXT_2%%
- %%CONTACT_SECTION_TEXT_3%%
- %%CONTACT_SECTION_TEXT_4%%
- %%CONTACT_SECTION_TEXT_5%%
- %%CONTACT_SECTION_TITLE_1%%
- %%CONTACT_SECTION_TITLE_2%%
- %%CONTACT_SECTION_TITLE_3%%
- %%CONTACT_SECTION_TITLE_4%%
- %%CONTACT_SECTION_TITLE_5%%
- %%CONTACT_TITLE%%
- %%CORRECTIONS_DESC%%
- %%CORRECTIONS_INTRO%%
- %%CORRECTIONS_NOTE%%
- %%CORRECTIONS_NOTE_TITLE%%
- %%CORRECTIONS_SECTION_TEXT_1%%
- %%CORRECTIONS_SECTION_TEXT_2%%
- %%CORRECTIONS_SECTION_TEXT_3%%
- %%CORRECTIONS_SECTION_TEXT_4%%
- %%CORRECTIONS_SECTION_TEXT_5%%
- %%CORRECTIONS_SECTION_TITLE_1%%
- %%CORRECTIONS_SECTION_TITLE_2%%
- %%CORRECTIONS_SECTION_TITLE_3%%
- %%CORRECTIONS_SECTION_TITLE_4%%
- %%CORRECTIONS_SECTION_TITLE_5%%
- %%CORRECTIONS_TITLE%%
- %%CURRENT_YEAR%%
- %%D01_AUTHOR_NOTE%%
- %%D01_BODY_1_A%%
- %%D01_BODY_1_B%%
- %%D01_BODY_2_A%%
- %%D01_BODY_2_B%%
- %%D01_BODY_3_A%%
- %%D01_BODY_3_B%%
- %%D01_BODY_4_A%%
- %%D01_BODY_4_B%%
- %%D01_CONCLUSION%%
- %%D01_COVER_ALT%%
- %%D01_COVER_CAPTION%%
- %%D01_FAQ_A_1%%
- %%D01_FAQ_A_2%%
- %%D01_FAQ_Q_1%%
- %%D01_FAQ_Q_2%%
- %%D01_FAQ_TITLE%%
- %%D01_H2_1%%
- %%D01_H2_2%%
- %%D01_H2_3%%
- %%D01_H2_4%%
- %%D01_HANDOFF_TEXT%%
- %%D01_MODIFIED%%
- %%D01_MODULE_LEFT%%
- %%D01_MODULE_NOTE%%
- %%D01_MODULE_RIGHT%%
- %%D01_PUBLISHED%%
- %%D01_READING_NOTE%%
- %%D01_RSS_DATE%%
- %%D01_SECTION_LABEL_1%%
- %%D01_SECTION_LABEL_2%%
- %%D01_SECTION_LABEL_3%%
- %%D01_SECTION_LABEL_4%%
- %%D01_SOURCE_URL%%
- %%D01_SUMMARY%%
- %%D01_TITLE%%
- %%D02_AUTHOR_NOTE%%
- %%D02_BODY_1_A%%
- %%D02_BODY_1_B%%
- %%D02_BODY_2_A%%
- %%D02_BODY_2_B%%
- %%D02_BODY_3_A%%
- %%D02_BODY_3_B%%
- %%D02_BODY_4_A%%
- %%D02_BODY_4_B%%
- %%D02_CONCLUSION%%
- %%D02_COVER_ALT%%
- %%D02_COVER_CAPTION%%
- %%D02_FAQ_A_1%%
- %%D02_FAQ_A_2%%
- %%D02_FAQ_Q_1%%
- %%D02_FAQ_Q_2%%
- %%D02_FAQ_TITLE%%
- %%D02_H2_1%%
- %%D02_H2_2%%
- %%D02_H2_3%%
- %%D02_H2_4%%
- %%D02_HANDOFF_TEXT%%
- %%D02_MODIFIED%%
- %%D02_MODULE_LEFT%%
- %%D02_MODULE_MIDDLE%%
- %%D02_MODULE_NOTE%%
- %%D02_MODULE_RIGHT%%
- %%D02_PUBLISHED%%
- %%D02_READING_NOTE%%
- %%D02_RSS_DATE%%
- %%D02_SECTION_LABEL_1%%
- %%D02_SECTION_LABEL_2%%
- %%D02_SECTION_LABEL_3%%
- %%D02_SECTION_LABEL_4%%
- %%D02_SOURCE_URL%%
- %%D02_SUMMARY%%
- %%D02_TITLE%%
- %%D03_AUTHOR_NOTE%%
- %%D03_BODY_1_A%%
- %%D03_BODY_1_B%%
- %%D03_BODY_2_A%%
- %%D03_BODY_2_B%%
- %%D03_BODY_3_A%%
- %%D03_BODY_3_B%%
- %%D03_BODY_4_A%%
- %%D03_BODY_4_B%%
- %%D03_CONCLUSION%%
- %%D03_COVER_ALT%%
- %%D03_COVER_CAPTION%%
- %%D03_FAQ_A_1%%
- %%D03_FAQ_A_2%%
- %%D03_FAQ_Q_1%%
- %%D03_FAQ_Q_2%%
- %%D03_FAQ_TITLE%%
- %%D03_H2_1%%
- %%D03_H2_2%%
- %%D03_H2_3%%
- %%D03_H2_4%%
- %%D03_HANDOFF_TEXT%%
- %%D03_MODIFIED%%
- %%D03_MODULE_LEFT%%
- %%D03_MODULE_NOTE%%
- %%D03_MODULE_RIGHT%%
- %%D03_PUBLISHED%%
- %%D03_READING_NOTE%%
- %%D03_RSS_DATE%%
- %%D03_SECTION_LABEL_1%%
- %%D03_SECTION_LABEL_2%%
- %%D03_SECTION_LABEL_3%%
- %%D03_SECTION_LABEL_4%%
- %%D03_SOURCE_URL%%
- %%D03_SUMMARY%%
- %%D03_TITLE%%
- %%D04_AUTHOR_NOTE%%
- %%D04_BODY_1_A%%
- %%D04_BODY_1_B%%
- %%D04_BODY_2_A%%
- %%D04_BODY_2_B%%
- %%D04_BODY_3_A%%
- %%D04_BODY_3_B%%
- %%D04_BODY_4_A%%
- %%D04_BODY_4_B%%
- %%D04_CONCLUSION%%
- %%D04_COVER_ALT%%
- %%D04_COVER_CAPTION%%
- %%D04_FAQ_A_1%%
- %%D04_FAQ_A_2%%
- %%D04_FAQ_Q_1%%
- %%D04_FAQ_Q_2%%
- %%D04_FAQ_TITLE%%
- %%D04_H2_1%%
- %%D04_H2_2%%
- %%D04_H2_3%%
- %%D04_H2_4%%
- %%D04_HANDOFF_TEXT%%
- %%D04_MODIFIED%%
- %%D04_MODULE_LEFT%%
- %%D04_MODULE_MIDDLE%%
- %%D04_MODULE_NOTE%%
- %%D04_MODULE_RIGHT%%
- %%D04_PUBLISHED%%
- %%D04_READING_NOTE%%
- %%D04_RSS_DATE%%
- %%D04_SECTION_LABEL_1%%
- %%D04_SECTION_LABEL_2%%
- %%D04_SECTION_LABEL_3%%
- %%D04_SECTION_LABEL_4%%
- %%D04_SOURCE_URL%%
- %%D04_SUMMARY%%
- %%D04_TITLE%%
- %%D05_AUTHOR_NOTE%%
- %%D05_BODY_1_A%%
- %%D05_BODY_1_B%%
- %%D05_BODY_2_A%%
- %%D05_BODY_2_B%%
- %%D05_BODY_3_A%%
- %%D05_BODY_3_B%%
- %%D05_BODY_4_A%%
- %%D05_BODY_4_B%%
- %%D05_CONCLUSION%%
- %%D05_COVER_ALT%%
- %%D05_COVER_CAPTION%%
- %%D05_FAQ_A_1%%
- %%D05_FAQ_A_2%%
- %%D05_FAQ_Q_1%%
- %%D05_FAQ_Q_2%%
- %%D05_FAQ_TITLE%%
- %%D05_H2_1%%
- %%D05_H2_2%%
- %%D05_H2_3%%
- %%D05_H2_4%%
- %%D05_HANDOFF_TEXT%%
- %%D05_MODIFIED%%
- %%D05_MODULE_LEFT%%
- %%D05_MODULE_MIDDLE%%
- %%D05_MODULE_NOTE%%
- %%D05_MODULE_RIGHT%%
- %%D05_PUBLISHED%%
- %%D05_READING_NOTE%%
- %%D05_RSS_DATE%%
- %%D05_SECTION_LABEL_1%%
- %%D05_SECTION_LABEL_2%%
- %%D05_SECTION_LABEL_3%%
- %%D05_SECTION_LABEL_4%%
- %%D05_SOURCE_URL%%
- %%D05_SUMMARY%%
- %%D05_TITLE%%
- %%D06_AUTHOR_NOTE%%
- %%D06_BODY_1_A%%
- %%D06_BODY_1_B%%
- %%D06_BODY_2_A%%
- %%D06_BODY_2_B%%
- %%D06_BODY_3_A%%
- %%D06_BODY_3_B%%
- %%D06_BODY_4_A%%
- %%D06_BODY_4_B%%
- %%D06_CONCLUSION%%
- %%D06_COVER_ALT%%
- %%D06_COVER_CAPTION%%
- %%D06_FAQ_A_1%%
- %%D06_FAQ_A_2%%
- %%D06_FAQ_Q_1%%
- %%D06_FAQ_Q_2%%
- %%D06_FAQ_TITLE%%
- %%D06_H2_1%%
- %%D06_H2_2%%
- %%D06_H2_3%%
- %%D06_H2_4%%
- %%D06_HANDOFF_TEXT%%
- %%D06_MODIFIED%%
- %%D06_MODULE_LEFT%%
- %%D06_MODULE_MIDDLE%%
- %%D06_MODULE_NOTE%%
- %%D06_MODULE_RIGHT%%
- %%D06_PUBLISHED%%
- %%D06_READING_NOTE%%
- %%D06_RSS_DATE%%
- %%D06_SECTION_LABEL_1%%
- %%D06_SECTION_LABEL_2%%
- %%D06_SECTION_LABEL_3%%
- %%D06_SECTION_LABEL_4%%
- %%D06_SOURCE_URL%%
- %%D06_SUMMARY%%
- %%D06_TITLE%%
- %%D07_AUTHOR_NOTE%%
- %%D07_BODY_1_A%%
- %%D07_BODY_1_B%%
- %%D07_BODY_2_A%%
- %%D07_BODY_2_B%%
- %%D07_BODY_3_A%%
- %%D07_BODY_3_B%%
- %%D07_BODY_4_A%%
- %%D07_BODY_4_B%%
- %%D07_CONCLUSION%%
- %%D07_COVER_ALT%%
- %%D07_COVER_CAPTION%%
- %%D07_FAQ_A_1%%
- %%D07_FAQ_A_2%%
- %%D07_FAQ_Q_1%%
- %%D07_FAQ_Q_2%%
- %%D07_FAQ_TITLE%%
- %%D07_H2_1%%
- %%D07_H2_2%%
- %%D07_H2_3%%
- %%D07_H2_4%%
- %%D07_HANDOFF_TEXT%%
- %%D07_MODIFIED%%
- %%D07_MODULE_LEFT%%
- %%D07_MODULE_NOTE%%
- %%D07_MODULE_RIGHT%%
- %%D07_PUBLISHED%%
- %%D07_READING_NOTE%%
- %%D07_RSS_DATE%%
- %%D07_SECTION_LABEL_1%%
- %%D07_SECTION_LABEL_2%%
- %%D07_SECTION_LABEL_3%%
- %%D07_SECTION_LABEL_4%%
- %%D07_SOURCE_URL%%
- %%D07_SUMMARY%%
- %%D07_TITLE%%
- %%D08_AUTHOR_NOTE%%
- %%D08_BODY_1_A%%
- %%D08_BODY_1_B%%
- %%D08_BODY_2_A%%
- %%D08_BODY_2_B%%
- %%D08_BODY_3_A%%
- %%D08_BODY_3_B%%
- %%D08_BODY_4_A%%
- %%D08_BODY_4_B%%
- %%D08_CONCLUSION%%
- %%D08_COVER_ALT%%
- %%D08_COVER_CAPTION%%
- %%D08_FAQ_A_1%%
- %%D08_FAQ_A_2%%
- %%D08_FAQ_Q_1%%
- %%D08_FAQ_Q_2%%
- %%D08_FAQ_TITLE%%
- %%D08_H2_1%%
- %%D08_H2_2%%
- %%D08_H2_3%%
- %%D08_H2_4%%
- %%D08_HANDOFF_TEXT%%
- %%D08_MODIFIED%%
- %%D08_MODULE_LEFT%%
- %%D08_MODULE_NOTE%%
- %%D08_MODULE_RIGHT%%
- %%D08_PUBLISHED%%
- %%D08_READING_NOTE%%
- %%D08_RSS_DATE%%
- %%D08_SECTION_LABEL_1%%
- %%D08_SECTION_LABEL_2%%
- %%D08_SECTION_LABEL_3%%
- %%D08_SECTION_LABEL_4%%
- %%D08_SOURCE_URL%%
- %%D08_SUMMARY%%
- %%D08_TITLE%%
- %%D09_AUTHOR_NOTE%%
- %%D09_BODY_1_A%%
- %%D09_BODY_1_B%%
- %%D09_BODY_2_A%%
- %%D09_BODY_2_B%%
- %%D09_BODY_3_A%%
- %%D09_BODY_3_B%%
- %%D09_BODY_4_A%%
- %%D09_BODY_4_B%%
- %%D09_CONCLUSION%%
- %%D09_COVER_ALT%%
- %%D09_COVER_CAPTION%%
- %%D09_FAQ_A_1%%
- %%D09_FAQ_A_2%%
- %%D09_FAQ_Q_1%%
- %%D09_FAQ_Q_2%%
- %%D09_FAQ_TITLE%%
- %%D09_H2_1%%
- %%D09_H2_2%%
- %%D09_H2_3%%
- %%D09_H2_4%%
- %%D09_HANDOFF_TEXT%%
- %%D09_MODIFIED%%
- %%D09_MODULE_NOTE%%
- %%D09_PUBLISHED%%
- %%D09_READING_NOTE%%
- %%D09_RSS_DATE%%
- %%D09_SECTION_LABEL_1%%
- %%D09_SECTION_LABEL_2%%
- %%D09_SECTION_LABEL_3%%
- %%D09_SECTION_LABEL_4%%
- %%D09_SOURCE_URL%%
- %%D09_SUMMARY%%
- %%D09_TITLE%%
- %%D10_AUTHOR_NOTE%%
- %%D10_BODY_1_A%%
- %%D10_BODY_1_B%%
- %%D10_BODY_2_A%%
- %%D10_BODY_2_B%%
- %%D10_BODY_3_A%%
- %%D10_BODY_3_B%%
- %%D10_BODY_4_A%%
- %%D10_BODY_4_B%%
- %%D10_CONCLUSION%%
- %%D10_COVER_ALT%%
- %%D10_COVER_CAPTION%%
- %%D10_FAQ_A_1%%
- %%D10_FAQ_A_2%%
- %%D10_FAQ_Q_1%%
- %%D10_FAQ_Q_2%%
- %%D10_FAQ_TITLE%%
- %%D10_H2_1%%
- %%D10_H2_2%%
- %%D10_H2_3%%
- %%D10_H2_4%%
- %%D10_HANDOFF_TEXT%%
- %%D10_MODIFIED%%
- %%D10_MODULE_LEFT%%
- %%D10_MODULE_NOTE%%
- %%D10_MODULE_RIGHT%%
- %%D10_PUBLISHED%%
- %%D10_READING_NOTE%%
- %%D10_RSS_DATE%%
- %%D10_SECTION_LABEL_1%%
- %%D10_SECTION_LABEL_2%%
- %%D10_SECTION_LABEL_3%%
- %%D10_SECTION_LABEL_4%%
- %%D10_SOURCE_URL%%
- %%D10_SUMMARY%%
- %%D10_TITLE%%
- %%D11_AUTHOR_NOTE%%
- %%D11_BODY_1_A%%
- %%D11_BODY_1_B%%
- %%D11_BODY_2_A%%
- %%D11_BODY_2_B%%
- %%D11_BODY_3_A%%
- %%D11_BODY_3_B%%
- %%D11_BODY_4_A%%
- %%D11_BODY_4_B%%
- %%D11_CONCLUSION%%
- %%D11_COVER_ALT%%
- %%D11_COVER_CAPTION%%
- %%D11_FAQ_A_1%%
- %%D11_FAQ_A_2%%
- %%D11_FAQ_Q_1%%
- %%D11_FAQ_Q_2%%
- %%D11_FAQ_TITLE%%
- %%D11_H2_1%%
- %%D11_H2_2%%
- %%D11_H2_3%%
- %%D11_H2_4%%
- %%D11_HANDOFF_TEXT%%
- %%D11_MODIFIED%%
- %%D11_MODULE_LEFT%%
- %%D11_MODULE_MIDDLE%%
- %%D11_MODULE_NOTE%%
- %%D11_MODULE_RIGHT%%
- %%D11_PUBLISHED%%
- %%D11_READING_NOTE%%
- %%D11_RSS_DATE%%
- %%D11_SECTION_LABEL_1%%
- %%D11_SECTION_LABEL_2%%
- %%D11_SECTION_LABEL_3%%
- %%D11_SECTION_LABEL_4%%
- %%D11_SOURCE_URL%%
- %%D11_SUMMARY%%
- %%D11_TITLE%%
- %%D12_AUTHOR_NOTE%%
- %%D12_BODY_1_A%%
- %%D12_BODY_1_B%%
- %%D12_BODY_2_A%%
- %%D12_BODY_2_B%%
- %%D12_BODY_3_A%%
- %%D12_BODY_3_B%%
- %%D12_BODY_4_A%%
- %%D12_BODY_4_B%%
- %%D12_CONCLUSION%%
- %%D12_COVER_ALT%%
- %%D12_COVER_CAPTION%%
- %%D12_FAQ_A_1%%
- %%D12_FAQ_A_2%%
- %%D12_FAQ_Q_1%%
- %%D12_FAQ_Q_2%%
- %%D12_FAQ_TITLE%%
- %%D12_H2_1%%
- %%D12_H2_2%%
- %%D12_H2_3%%
- %%D12_H2_4%%
- %%D12_HANDOFF_TEXT%%
- %%D12_MODIFIED%%
- %%D12_MODULE_LEFT%%
- %%D12_MODULE_NOTE%%
- %%D12_PROMO_DISCLOSURE%%
- %%D12_PROMO_LABEL%%
- %%D12_PUBLISHED%%
- %%D12_READING_NOTE%%
- %%D12_RSS_DATE%%
- %%D12_SECTION_LABEL_1%%
- %%D12_SECTION_LABEL_2%%
- %%D12_SECTION_LABEL_3%%
- %%D12_SECTION_LABEL_4%%
- %%D12_SOURCE_URL%%
- %%D12_SUMMARY%%
- %%D12_TITLE%%
- %%DISCLAIMER_DESC%%
- %%DISCLAIMER_INTRO%%
- %%DISCLAIMER_NOTE%%
- %%DISCLAIMER_NOTE_TITLE%%
- %%DISCLAIMER_SECTION_TEXT_1%%
- %%DISCLAIMER_SECTION_TEXT_2%%
- %%DISCLAIMER_SECTION_TEXT_3%%
- %%DISCLAIMER_SECTION_TEXT_4%%
- %%DISCLAIMER_SECTION_TEXT_5%%
- %%DISCLAIMER_SECTION_TITLE_1%%
- %%DISCLAIMER_SECTION_TITLE_2%%
- %%DISCLAIMER_SECTION_TITLE_3%%
- %%DISCLAIMER_SECTION_TITLE_4%%
- %%DISCLAIMER_SECTION_TITLE_5%%
- %%DISCLAIMER_TITLE%%
- %%DISCLOSURE_DESC%%
- %%DISCLOSURE_INTRO%%
- %%DISCLOSURE_NOTE%%
- %%DISCLOSURE_NOTE_TITLE%%
- %%DISCLOSURE_SECTION_TEXT_1%%
- %%DISCLOSURE_SECTION_TEXT_2%%
- %%DISCLOSURE_SECTION_TEXT_3%%
- %%DISCLOSURE_SECTION_TEXT_4%%
- %%DISCLOSURE_SECTION_TEXT_5%%
- %%DISCLOSURE_SECTION_TITLE_1%%
- %%DISCLOSURE_SECTION_TITLE_2%%
- %%DISCLOSURE_SECTION_TITLE_3%%
- %%DISCLOSURE_SECTION_TITLE_4%%
- %%DISCLOSURE_SECTION_TITLE_5%%
- %%DISCLOSURE_TITLE%%
- %%EDITORIAL_DESC%%
- %%EDITORIAL_INTRO%%
- %%EDITORIAL_NOTE%%
- %%EDITORIAL_NOTE_TITLE%%
- %%EDITORIAL_SECTION_TEXT_1%%
- %%EDITORIAL_SECTION_TEXT_2%%
- %%EDITORIAL_SECTION_TEXT_3%%
- %%EDITORIAL_SECTION_TEXT_4%%
- %%EDITORIAL_SECTION_TEXT_5%%
- %%EDITORIAL_SECTION_TITLE_1%%
- %%EDITORIAL_SECTION_TITLE_2%%
- %%EDITORIAL_SECTION_TITLE_3%%
- %%EDITORIAL_SECTION_TITLE_4%%
- %%EDITORIAL_SECTION_TITLE_5%%
- %%EDITORIAL_TITLE%%
- %%HERO_DESCRIPTION%%
- %%HOME_COLOPHON%%
- %%HOME_QUOTE%%
- %%HOME_QUOTE_SOURCE%%
- %%HOME_SECTION_INTRO%%
- %%HOME_SECTION_TITLE%%
- %%HOME_TITLE%%
- %%INDEPENDENCE_NOTE%%
- %%INVITE_CODE%%
- %%INVITE_INTRO%%
- %%INVITE_TITLE%%
- %%LANG%%
- %%PRIVACY_DESC%%
- %%PRIVACY_INTRO%%
- %%PRIVACY_NOTE%%
- %%PRIVACY_NOTE_TITLE%%
- %%PRIVACY_SECTION_TEXT_1%%
- %%PRIVACY_SECTION_TEXT_2%%
- %%PRIVACY_SECTION_TEXT_3%%
- %%PRIVACY_SECTION_TEXT_4%%
- %%PRIVACY_SECTION_TEXT_5%%
- %%PRIVACY_SECTION_TITLE_1%%
- %%PRIVACY_SECTION_TITLE_2%%
- %%PRIVACY_SECTION_TITLE_3%%
- %%PRIVACY_SECTION_TITLE_4%%
- %%PRIVACY_SECTION_TITLE_5%%
- %%PRIVACY_TITLE%%
- %%REGISTER_DESC%%
- %%REGISTER_INTRO%%
- %%REGISTER_TITLE%%
- %%RISK_NOTE%%
- %%SECURITY_EMAIL%%
- %%SECURITY_EXPIRES%%
- %%SITE_DESC%%
- %%SITE_DOMAIN%%
- %%SITE_NAME%%
- %%SITE_TAGLINE%%
- %%STATUS_1%%
- %%STATUS_2%%
- %%STATUS_3%%
- %%STATUS_4%%
- %%TOOL_01_DESC%%
- %%TOOL_01_FORMAT%%
- %%TOOL_01_GUIDE_TEXT_1%%
- %%TOOL_01_GUIDE_TEXT_2%%
- %%TOOL_01_GUIDE_TEXT_3%%
- %%TOOL_01_GUIDE_TEXT_4%%
- %%TOOL_01_GUIDE_TEXT_5%%
- %%TOOL_01_GUIDE_TITLE_1%%
- %%TOOL_01_GUIDE_TITLE_2%%
- %%TOOL_01_GUIDE_TITLE_3%%
- %%TOOL_01_GUIDE_TITLE_4%%
- %%TOOL_01_GUIDE_TITLE_5%%
- %%TOOL_01_INTRO%%
- %%TOOL_01_TITLE%%
- %%TOOL_02_DESC%%
- %%TOOL_02_FORMAT%%
- %%TOOL_02_GUIDE_TEXT_1%%
- %%TOOL_02_GUIDE_TEXT_2%%
- %%TOOL_02_GUIDE_TEXT_3%%
- %%TOOL_02_GUIDE_TEXT_4%%
- %%TOOL_02_GUIDE_TEXT_5%%
- %%TOOL_02_GUIDE_TITLE_1%%
- %%TOOL_02_GUIDE_TITLE_2%%
- %%TOOL_02_GUIDE_TITLE_3%%
- %%TOOL_02_GUIDE_TITLE_4%%
- %%TOOL_02_GUIDE_TITLE_5%%
- %%TOOL_02_INTRO%%
- %%TOOL_02_TITLE%%
- %%TOOL_03_DESC%%
- %%TOOL_03_FORMAT%%
- %%TOOL_03_GUIDE_TEXT_1%%
- %%TOOL_03_GUIDE_TEXT_2%%
- %%TOOL_03_GUIDE_TEXT_3%%
- %%TOOL_03_GUIDE_TEXT_4%%
- %%TOOL_03_GUIDE_TEXT_5%%
- %%TOOL_03_GUIDE_TITLE_1%%
- %%TOOL_03_GUIDE_TITLE_2%%
- %%TOOL_03_GUIDE_TITLE_3%%
- %%TOOL_03_GUIDE_TITLE_4%%
- %%TOOL_03_GUIDE_TITLE_5%%
- %%TOOL_03_INTRO%%
- %%TOOL_03_TITLE%%
- %%TOOL_04_DESC%%
- %%TOOL_04_FORMAT%%
- %%TOOL_04_GUIDE_TEXT_1%%
- %%TOOL_04_GUIDE_TEXT_2%%
- %%TOOL_04_GUIDE_TEXT_3%%
- %%TOOL_04_GUIDE_TEXT_4%%
- %%TOOL_04_GUIDE_TEXT_5%%
- %%TOOL_04_GUIDE_TITLE_1%%
- %%TOOL_04_GUIDE_TITLE_2%%
- %%TOOL_04_GUIDE_TITLE_3%%
- %%TOOL_04_GUIDE_TITLE_4%%
- %%TOOL_04_GUIDE_TITLE_5%%
- %%TOOL_04_INTRO%%
- %%TOOL_04_TITLE%%
- %%TOOL_05_DESC%%
- %%TOOL_05_FORMAT%%
- %%TOOL_05_GUIDE_TEXT_1%%
- %%TOOL_05_GUIDE_TEXT_2%%
- %%TOOL_05_GUIDE_TEXT_3%%
- %%TOOL_05_GUIDE_TEXT_4%%
- %%TOOL_05_GUIDE_TEXT_5%%
- %%TOOL_05_GUIDE_TITLE_1%%
- %%TOOL_05_GUIDE_TITLE_2%%
- %%TOOL_05_GUIDE_TITLE_3%%
- %%TOOL_05_GUIDE_TITLE_4%%
- %%TOOL_05_GUIDE_TITLE_5%%
- %%TOOL_05_INTRO%%
- %%TOOL_05_TITLE%%
- %%TOOL_INDEX_DESC%%
- %%TOOL_INDEX_INTRO%%
- %%TOOL_INDEX_TITLE%%
- %%UPDATED_DATE%%
- %%UPDATES_DESC%%
- %%UPDATES_INTRO%%
- %%UPDATES_NOTE%%
- %%UPDATES_NOTE_TITLE%%
- %%UPDATES_SECTION_TEXT_1%%
- %%UPDATES_SECTION_TEXT_2%%
- %%UPDATES_SECTION_TEXT_3%%
- %%UPDATES_SECTION_TEXT_4%%
- %%UPDATES_SECTION_TEXT_5%%
- %%UPDATES_SECTION_TITLE_1%%
- %%UPDATES_SECTION_TITLE_2%%
- %%UPDATES_SECTION_TITLE_3%%
- %%UPDATES_SECTION_TITLE_4%%
- %%UPDATES_SECTION_TITLE_5%%
- %%UPDATES_TITLE%%
