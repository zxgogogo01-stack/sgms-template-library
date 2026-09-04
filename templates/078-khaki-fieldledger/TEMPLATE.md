# 078 Khaki Field Ledger · 工作流 v2 接入契约

## 范围与风格

只制作完整网站模板，不写业务文章或注册教程，不部署。原 excavation.css 字节保留，新 excavation-extension.css 补齐四个档案区、十二种文章组件、五工具、公开说明和响应式。保留原首页全部 ka78 类名、赭石探方、固定编号书脊和地层条。动态源包未取得，原包忠实度未核验；不得把 UI 验收当作保真证明。

36 个 HTML：32 个可索引页、404、3 个 noindex 手动兼容入口。registrationGuide 只是兼容字段名，指通用交接入藏组件页，不指定教程。

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "field-register.html",
  "articles": [
    "records/provenance-chain.html",
    "records/primary-label.html",
    "records/source-bag.html",
    "records/layer-matrix.html",
    "records/cut-fill-profile.html",
    "records/conflict-section.html",
    "records/coordinate-grid.html",
    "records/scale-bar.html",
    "records/find-density.html",
    "records/accession-seal.html",
    "records/correction-ledger.html",
    "records/custody-handoff.html"
  ],
  "cornerstones": [
    "records/provenance-chain.html",
    "records/layer-matrix.html"
  ],
  "registrationGuide": "records/custody-handoff.html",
  "articleCovers": {
    "records/provenance-chain.html": {
      "display": "assets/records/provenance-chain.webp",
      "og": "assets/records/provenance-chain.png"
    },
    "records/primary-label.html": {
      "display": "assets/records/primary-label.webp",
      "og": "assets/records/primary-label.png"
    },
    "records/source-bag.html": {
      "display": "assets/records/source-bag.webp",
      "og": "assets/records/source-bag.png"
    },
    "records/layer-matrix.html": {
      "display": "assets/records/layer-matrix.webp",
      "og": "assets/records/layer-matrix.png"
    },
    "records/cut-fill-profile.html": {
      "display": "assets/records/cut-fill-profile.webp",
      "og": "assets/records/cut-fill-profile.png"
    },
    "records/conflict-section.html": {
      "display": "assets/records/conflict-section.webp",
      "og": "assets/records/conflict-section.png"
    },
    "records/coordinate-grid.html": {
      "display": "assets/records/coordinate-grid.webp",
      "og": "assets/records/coordinate-grid.png"
    },
    "records/scale-bar.html": {
      "display": "assets/records/scale-bar.webp",
      "og": "assets/records/scale-bar.png"
    },
    "records/find-density.html": {
      "display": "assets/records/find-density.webp",
      "og": "assets/records/find-density.png"
    },
    "records/accession-seal.html": {
      "display": "assets/records/accession-seal.webp",
      "og": "assets/records/accession-seal.png"
    },
    "records/correction-ledger.html": {
      "display": "assets/records/correction-ledger.webp",
      "og": "assets/records/correction-ledger.png"
    },
    "records/custody-handoff.html": {
      "display": "assets/records/custody-handoff.webp",
      "og": "assets/records/custody-handoff.png"
    }
  },
  "categories": [
    {
      "path": "drawers/provenance-trench.html",
      "label": "来源探沟",
      "articles": [
        "records/provenance-chain.html",
        "records/cut-fill-profile.html",
        "records/find-density.html"
      ]
    },
    {
      "path": "drawers/stratigraphy-section.html",
      "label": "层位剖面",
      "articles": [
        "records/primary-label.html",
        "records/conflict-section.html",
        "records/accession-seal.html"
      ]
    },
    {
      "path": "drawers/context-grid.html",
      "label": "坐标探方",
      "articles": [
        "records/source-bag.html",
        "records/coordinate-grid.html",
        "records/correction-ledger.html"
      ]
    },
    {
      "path": "drawers/custody-store.html",
      "label": "入藏库房",
      "articles": [
        "records/layer-matrix.html",
        "records/scale-bar.html",
        "records/custody-handoff.html"
      ]
    }
  ],
  "toolIndex": "survey-bench.html",
  "tools": [
    "tools/accession-series-auditor.html",
    "tools/strata-order-resolver.html",
    "tools/grid-coordinate-register.html",
    "tools/custody-timeline-checker.html",
    "tools/context-density-calculator.html"
  ],
  "legal": {
    "about": "archive-office.html",
    "contact": "contact-drawer.html",
    "corrections": "correction-desk.html",
    "disclosure": "relation-note.html",
    "disclaimer": "scope-marker.html",
    "privacy": "data-handling.html",
    "updates": "accession-log.html",
    "editorial": "editorial-protocol.html"
  },
  "error404": "404.html",
  "robots": "robots.txt",
  "sitemap": "sitemap.xml",
  "feed": "feed.xml",
  "security": ".well-known/security.txt",
  "favicon": "favicon.ico",
  "appleTouchIcon": "apple-touch-icon.png",
  "socialImage": "assets/excavation-cover.png",
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

- 只填经核实的正文和变量，不再补 UI、目录、资源、工具或移动端样式；保留页面角色、锚点、表单、data 属性和 ARIA。
- 首页只有邀请码复制、弹性利益点与脚注，没有推广直链。custody-handoff.html 恰留一处静态推广槽；保留 target、rel 四值和紧邻披露。
- 抽象探方、地层与标本签不是证据、真实遗址或现场记录。QA 示例文字不能作为业务文章发布。

## 变量格式与容量

BRAND_EN 为 3–24 个英文或罗马字；首页标题 8–20 个中文字，说明 35–65 字；邀请码 4–28 ASCII 字符；利益脚注 16–45 字。文章摘要 40–100 字，正文槽 100–800 字。

SITE_DOMAIN 为纯域名；AFFILIATE_URL 与 SOURCE_URL 为核实的绝对 HTTPS URL；邮箱纯地址；LANG 为真实 BCP47；日期使用页面声明格式。按 HTML 文本、属性、XML 和 JSON-LD 上下文分别转义，不能未转义全局替换。

## 五个本地工具

1. 入藏编号序列审计器：1–500 个统一前缀和位宽编号，完整输出范围、缺号与重复。
2. 层位先后关系解析器：1–200 条大写 ASCII 上下关系，拒绝自指、重复和闭环，按首次出现稳定拓扑排序并输出层级。
3. 探方坐标登记器：1–200 个唯一项目和三个整数坐标，输出全部点、边界、跨度与算术质心。
4. 交接时间链检查器：1–300 条对象、真实日期与保管人，分组排序并输出完整转移和日间隔，拒绝同日冲突。
5. 探方密度换算器：1–200 个唯一探方、整数计数与正面积，使用 BigInt 交叉乘积排序和四位定点舍入，输出每平方米或每十平方米密度及加权总值。

所有工具先检查原值长度、控制字符和不完整 Unicode，再做 NFKC；错误聚焦并关联 aria-errormessage。输入变化立即让旧报告和复制失效。

## 全部变量

- %%ABOUT_TEXT_1%%
- %%ABOUT_TEXT_2%%
- %%ABOUT_TEXT_3%%
- %%ABOUT_TEXT_4%%
- %%ABOUT_TEXT_5%%
- %%ABOUT_TITLE_1%%
- %%ABOUT_TITLE_2%%
- %%ABOUT_TITLE_3%%
- %%ABOUT_TITLE_4%%
- %%ABOUT_TITLE_5%%
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
- %%CONTACT_TEXT_1%%
- %%CONTACT_TEXT_2%%
- %%CONTACT_TEXT_3%%
- %%CONTACT_TEXT_4%%
- %%CONTACT_TEXT_5%%
- %%CONTACT_TITLE%%
- %%CONTACT_TITLE_1%%
- %%CONTACT_TITLE_2%%
- %%CONTACT_TITLE_3%%
- %%CONTACT_TITLE_4%%
- %%CONTACT_TITLE_5%%
- %%CORRECTIONS_TEXT_1%%
- %%CORRECTIONS_TEXT_2%%
- %%CORRECTIONS_TEXT_3%%
- %%CORRECTIONS_TEXT_4%%
- %%CORRECTIONS_TEXT_5%%
- %%CORRECTIONS_TITLE_1%%
- %%CORRECTIONS_TITLE_2%%
- %%CORRECTIONS_TITLE_3%%
- %%CORRECTIONS_TITLE_4%%
- %%CORRECTIONS_TITLE_5%%
- %%CURRENT_YEAR%%
- %%DISCLAIMER_TEXT_1%%
- %%DISCLAIMER_TEXT_2%%
- %%DISCLAIMER_TEXT_3%%
- %%DISCLAIMER_TEXT_4%%
- %%DISCLAIMER_TEXT_5%%
- %%DISCLAIMER_TITLE_1%%
- %%DISCLAIMER_TITLE_2%%
- %%DISCLAIMER_TITLE_3%%
- %%DISCLAIMER_TITLE_4%%
- %%DISCLAIMER_TITLE_5%%
- %%DISCLOSURE_TEXT_1%%
- %%DISCLOSURE_TEXT_2%%
- %%DISCLOSURE_TEXT_3%%
- %%DISCLOSURE_TEXT_4%%
- %%DISCLOSURE_TEXT_5%%
- %%DISCLOSURE_TITLE_1%%
- %%DISCLOSURE_TITLE_2%%
- %%DISCLOSURE_TITLE_3%%
- %%DISCLOSURE_TITLE_4%%
- %%DISCLOSURE_TITLE_5%%
- %%DRAWERS_TITLE%%
- %%DRAWER_1_INTRO%%
- %%DRAWER_1_NOTE%%
- %%DRAWER_2_INTRO%%
- %%DRAWER_2_NOTE%%
- %%DRAWER_3_INTRO%%
- %%DRAWER_3_NOTE%%
- %%DRAWER_4_INTRO%%
- %%DRAWER_4_NOTE%%
- %%EDITORIAL_TEXT_1%%
- %%EDITORIAL_TEXT_2%%
- %%EDITORIAL_TEXT_3%%
- %%EDITORIAL_TEXT_4%%
- %%EDITORIAL_TEXT_5%%
- %%EDITORIAL_TITLE_1%%
- %%EDITORIAL_TITLE_2%%
- %%EDITORIAL_TITLE_3%%
- %%EDITORIAL_TITLE_4%%
- %%EDITORIAL_TITLE_5%%
- %%FOOTER_NOTE%%
- %%GRID_ALT%%
- %%GRID_NOTE%%
- %%GRID_STATE%%
- %%HERO_DESCRIPTION%%
- %%HERO_NOTE%%
- %%HERO_TITLE%%
- %%INDEPENDENCE_NOTE%%
- %%INVITE_CODE%%
- %%INVITE_LABEL%%
- %%LANG%%
- %%PRIVACY_TEXT_1%%
- %%PRIVACY_TEXT_2%%
- %%PRIVACY_TEXT_3%%
- %%PRIVACY_TEXT_4%%
- %%PRIVACY_TEXT_5%%
- %%PRIVACY_TITLE_1%%
- %%PRIVACY_TITLE_2%%
- %%PRIVACY_TITLE_3%%
- %%PRIVACY_TITLE_4%%
- %%PRIVACY_TITLE_5%%
- %%R01_AUTHOR_NOTE%%
- %%R01_BODY_1_A%%
- %%R01_BODY_1_B%%
- %%R01_BODY_2_A%%
- %%R01_BODY_2_B%%
- %%R01_BODY_3_A%%
- %%R01_BODY_3_B%%
- %%R01_BODY_4_A%%
- %%R01_BODY_4_B%%
- %%R01_CARD_NOTE%%
- %%R01_CONCLUSION%%
- %%R01_COVER_ALT%%
- %%R01_COVER_CAPTION%%
- %%R01_EYEBROW%%
- %%R01_FAQ_A_1%%
- %%R01_FAQ_A_2%%
- %%R01_FAQ_Q_1%%
- %%R01_FAQ_Q_2%%
- %%R01_FAQ_TITLE%%
- %%R01_H2_1%%
- %%R01_H2_2%%
- %%R01_H2_3%%
- %%R01_H2_4%%
- %%R01_MODIFIED%%
- %%R01_MODULE_1%%
- %%R01_MODULE_2%%
- %%R01_MODULE_3%%
- %%R01_MODULE_4%%
- %%R01_MODULE_5%%
- %%R01_MODULE_6%%
- %%R01_MODULE_7%%
- %%R01_MODULE_8%%
- %%R01_PUBLISHED%%
- %%R01_READING_NOTE%%
- %%R01_RSS_DATE%%
- %%R01_SECTION_LABEL_1%%
- %%R01_SECTION_LABEL_2%%
- %%R01_SECTION_LABEL_3%%
- %%R01_SECTION_LABEL_4%%
- %%R01_SUMMARY%%
- %%R01_TITLE%%
- %%R02_AUTHOR_NOTE%%
- %%R02_BODY_1_A%%
- %%R02_BODY_1_B%%
- %%R02_BODY_2_A%%
- %%R02_BODY_2_B%%
- %%R02_BODY_3_A%%
- %%R02_BODY_3_B%%
- %%R02_BODY_4_A%%
- %%R02_BODY_4_B%%
- %%R02_CARD_NOTE%%
- %%R02_CONCLUSION%%
- %%R02_COVER_ALT%%
- %%R02_COVER_CAPTION%%
- %%R02_EYEBROW%%
- %%R02_FAQ_A_1%%
- %%R02_FAQ_A_2%%
- %%R02_FAQ_Q_1%%
- %%R02_FAQ_Q_2%%
- %%R02_FAQ_TITLE%%
- %%R02_H2_1%%
- %%R02_H2_2%%
- %%R02_H2_3%%
- %%R02_H2_4%%
- %%R02_MODIFIED%%
- %%R02_MODULE_1%%
- %%R02_MODULE_10%%
- %%R02_MODULE_11%%
- %%R02_MODULE_2%%
- %%R02_MODULE_3%%
- %%R02_MODULE_4%%
- %%R02_MODULE_5%%
- %%R02_MODULE_6%%
- %%R02_MODULE_7%%
- %%R02_MODULE_8%%
- %%R02_MODULE_9%%
- %%R02_PUBLISHED%%
- %%R02_READING_NOTE%%
- %%R02_RSS_DATE%%
- %%R02_SECTION_LABEL_1%%
- %%R02_SECTION_LABEL_2%%
- %%R02_SECTION_LABEL_3%%
- %%R02_SECTION_LABEL_4%%
- %%R02_SUMMARY%%
- %%R02_TITLE%%
- %%R03_AUTHOR_NOTE%%
- %%R03_BODY_1_A%%
- %%R03_BODY_1_B%%
- %%R03_BODY_2_A%%
- %%R03_BODY_2_B%%
- %%R03_BODY_3_A%%
- %%R03_BODY_3_B%%
- %%R03_BODY_4_A%%
- %%R03_BODY_4_B%%
- %%R03_CARD_NOTE%%
- %%R03_CONCLUSION%%
- %%R03_COVER_ALT%%
- %%R03_COVER_CAPTION%%
- %%R03_EYEBROW%%
- %%R03_FAQ_A_1%%
- %%R03_FAQ_A_2%%
- %%R03_FAQ_Q_1%%
- %%R03_FAQ_Q_2%%
- %%R03_FAQ_TITLE%%
- %%R03_H2_1%%
- %%R03_H2_2%%
- %%R03_H2_3%%
- %%R03_H2_4%%
- %%R03_MODIFIED%%
- %%R03_MODULE_1%%
- %%R03_MODULE_2%%
- %%R03_MODULE_3%%
- %%R03_MODULE_4%%
- %%R03_MODULE_5%%
- %%R03_MODULE_6%%
- %%R03_MODULE_7%%
- %%R03_PUBLISHED%%
- %%R03_READING_NOTE%%
- %%R03_RSS_DATE%%
- %%R03_SECTION_LABEL_1%%
- %%R03_SECTION_LABEL_2%%
- %%R03_SECTION_LABEL_3%%
- %%R03_SECTION_LABEL_4%%
- %%R03_SOURCE_URL_1%%
- %%R03_SOURCE_URL_2%%
- %%R03_SOURCE_URL_3%%
- %%R03_SUMMARY%%
- %%R03_TITLE%%
- %%R04_AUTHOR_NOTE%%
- %%R04_BODY_1_A%%
- %%R04_BODY_1_B%%
- %%R04_BODY_2_A%%
- %%R04_BODY_2_B%%
- %%R04_BODY_3_A%%
- %%R04_BODY_3_B%%
- %%R04_BODY_4_A%%
- %%R04_BODY_4_B%%
- %%R04_CARD_NOTE%%
- %%R04_CONCLUSION%%
- %%R04_COVER_ALT%%
- %%R04_COVER_CAPTION%%
- %%R04_EYEBROW%%
- %%R04_FAQ_A_1%%
- %%R04_FAQ_A_2%%
- %%R04_FAQ_Q_1%%
- %%R04_FAQ_Q_2%%
- %%R04_FAQ_TITLE%%
- %%R04_H2_1%%
- %%R04_H2_2%%
- %%R04_H2_3%%
- %%R04_H2_4%%
- %%R04_MODIFIED%%
- %%R04_MODULE_1%%
- %%R04_MODULE_10%%
- %%R04_MODULE_11%%
- %%R04_MODULE_12%%
- %%R04_MODULE_13%%
- %%R04_MODULE_2%%
- %%R04_MODULE_3%%
- %%R04_MODULE_4%%
- %%R04_MODULE_5%%
- %%R04_MODULE_6%%
- %%R04_MODULE_7%%
- %%R04_MODULE_8%%
- %%R04_MODULE_9%%
- %%R04_PUBLISHED%%
- %%R04_READING_NOTE%%
- %%R04_RSS_DATE%%
- %%R04_SECTION_LABEL_1%%
- %%R04_SECTION_LABEL_2%%
- %%R04_SECTION_LABEL_3%%
- %%R04_SECTION_LABEL_4%%
- %%R04_SUMMARY%%
- %%R04_TITLE%%
- %%R05_AUTHOR_NOTE%%
- %%R05_BODY_1_A%%
- %%R05_BODY_1_B%%
- %%R05_BODY_2_A%%
- %%R05_BODY_2_B%%
- %%R05_BODY_3_A%%
- %%R05_BODY_3_B%%
- %%R05_BODY_4_A%%
- %%R05_BODY_4_B%%
- %%R05_CARD_NOTE%%
- %%R05_CONCLUSION%%
- %%R05_COVER_ALT%%
- %%R05_COVER_CAPTION%%
- %%R05_EYEBROW%%
- %%R05_FAQ_A_1%%
- %%R05_FAQ_A_2%%
- %%R05_FAQ_Q_1%%
- %%R05_FAQ_Q_2%%
- %%R05_FAQ_TITLE%%
- %%R05_H2_1%%
- %%R05_H2_2%%
- %%R05_H2_3%%
- %%R05_H2_4%%
- %%R05_MODIFIED%%
- %%R05_MODULE_1%%
- %%R05_MODULE_2%%
- %%R05_MODULE_3%%
- %%R05_MODULE_4%%
- %%R05_MODULE_5%%
- %%R05_PUBLISHED%%
- %%R05_READING_NOTE%%
- %%R05_RSS_DATE%%
- %%R05_SECTION_LABEL_1%%
- %%R05_SECTION_LABEL_2%%
- %%R05_SECTION_LABEL_3%%
- %%R05_SECTION_LABEL_4%%
- %%R05_SUMMARY%%
- %%R05_TITLE%%
- %%R06_AUTHOR_NOTE%%
- %%R06_BODY_1_A%%
- %%R06_BODY_1_B%%
- %%R06_BODY_2_A%%
- %%R06_BODY_2_B%%
- %%R06_BODY_3_A%%
- %%R06_BODY_3_B%%
- %%R06_BODY_4_A%%
- %%R06_BODY_4_B%%
- %%R06_CARD_NOTE%%
- %%R06_CONCLUSION%%
- %%R06_COVER_ALT%%
- %%R06_COVER_CAPTION%%
- %%R06_EYEBROW%%
- %%R06_FAQ_A_1%%
- %%R06_FAQ_A_2%%
- %%R06_FAQ_Q_1%%
- %%R06_FAQ_Q_2%%
- %%R06_FAQ_TITLE%%
- %%R06_H2_1%%
- %%R06_H2_2%%
- %%R06_H2_3%%
- %%R06_H2_4%%
- %%R06_MODIFIED%%
- %%R06_MODULE_1%%
- %%R06_MODULE_2%%
- %%R06_MODULE_3%%
- %%R06_MODULE_4%%
- %%R06_MODULE_5%%
- %%R06_MODULE_6%%
- %%R06_MODULE_7%%
- %%R06_PUBLISHED%%
- %%R06_READING_NOTE%%
- %%R06_RSS_DATE%%
- %%R06_SECTION_LABEL_1%%
- %%R06_SECTION_LABEL_2%%
- %%R06_SECTION_LABEL_3%%
- %%R06_SECTION_LABEL_4%%
- %%R06_SUMMARY%%
- %%R06_TITLE%%
- %%R07_AUTHOR_NOTE%%
- %%R07_BODY_1_A%%
- %%R07_BODY_1_B%%
- %%R07_BODY_2_A%%
- %%R07_BODY_2_B%%
- %%R07_BODY_3_A%%
- %%R07_BODY_3_B%%
- %%R07_BODY_4_A%%
- %%R07_BODY_4_B%%
- %%R07_CARD_NOTE%%
- %%R07_CONCLUSION%%
- %%R07_COVER_ALT%%
- %%R07_COVER_CAPTION%%
- %%R07_EYEBROW%%
- %%R07_FAQ_A_1%%
- %%R07_FAQ_A_2%%
- %%R07_FAQ_Q_1%%
- %%R07_FAQ_Q_2%%
- %%R07_FAQ_TITLE%%
- %%R07_H2_1%%
- %%R07_H2_2%%
- %%R07_H2_3%%
- %%R07_H2_4%%
- %%R07_MODIFIED%%
- %%R07_MODULE_1%%
- %%R07_MODULE_2%%
- %%R07_MODULE_3%%
- %%R07_MODULE_4%%
- %%R07_MODULE_5%%
- %%R07_MODULE_6%%
- %%R07_MODULE_7%%
- %%R07_MODULE_8%%
- %%R07_MODULE_9%%
- %%R07_PUBLISHED%%
- %%R07_READING_NOTE%%
- %%R07_RSS_DATE%%
- %%R07_SECTION_LABEL_1%%
- %%R07_SECTION_LABEL_2%%
- %%R07_SECTION_LABEL_3%%
- %%R07_SECTION_LABEL_4%%
- %%R07_SUMMARY%%
- %%R07_TITLE%%
- %%R08_AUTHOR_NOTE%%
- %%R08_BODY_1_A%%
- %%R08_BODY_1_B%%
- %%R08_BODY_2_A%%
- %%R08_BODY_2_B%%
- %%R08_BODY_3_A%%
- %%R08_BODY_3_B%%
- %%R08_BODY_4_A%%
- %%R08_BODY_4_B%%
- %%R08_CARD_NOTE%%
- %%R08_CONCLUSION%%
- %%R08_COVER_ALT%%
- %%R08_COVER_CAPTION%%
- %%R08_EYEBROW%%
- %%R08_FAQ_A_1%%
- %%R08_FAQ_A_2%%
- %%R08_FAQ_Q_1%%
- %%R08_FAQ_Q_2%%
- %%R08_FAQ_TITLE%%
- %%R08_H2_1%%
- %%R08_H2_2%%
- %%R08_H2_3%%
- %%R08_H2_4%%
- %%R08_MODIFIED%%
- %%R08_MODULE_1%%
- %%R08_MODULE_2%%
- %%R08_MODULE_3%%
- %%R08_MODULE_4%%
- %%R08_MODULE_5%%
- %%R08_MODULE_6%%
- %%R08_MODULE_7%%
- %%R08_PUBLISHED%%
- %%R08_READING_NOTE%%
- %%R08_RSS_DATE%%
- %%R08_SECTION_LABEL_1%%
- %%R08_SECTION_LABEL_2%%
- %%R08_SECTION_LABEL_3%%
- %%R08_SECTION_LABEL_4%%
- %%R08_SUMMARY%%
- %%R08_TITLE%%
- %%R09_AUTHOR_NOTE%%
- %%R09_BODY_1_A%%
- %%R09_BODY_1_B%%
- %%R09_BODY_2_A%%
- %%R09_BODY_2_B%%
- %%R09_BODY_3_A%%
- %%R09_BODY_3_B%%
- %%R09_BODY_4_A%%
- %%R09_BODY_4_B%%
- %%R09_CARD_NOTE%%
- %%R09_CONCLUSION%%
- %%R09_COVER_ALT%%
- %%R09_COVER_CAPTION%%
- %%R09_EYEBROW%%
- %%R09_FAQ_A_1%%
- %%R09_FAQ_A_2%%
- %%R09_FAQ_Q_1%%
- %%R09_FAQ_Q_2%%
- %%R09_FAQ_TITLE%%
- %%R09_H2_1%%
- %%R09_H2_2%%
- %%R09_H2_3%%
- %%R09_H2_4%%
- %%R09_MODIFIED%%
- %%R09_MODULE_1%%
- %%R09_MODULE_2%%
- %%R09_MODULE_3%%
- %%R09_MODULE_4%%
- %%R09_MODULE_5%%
- %%R09_MODULE_6%%
- %%R09_MODULE_7%%
- %%R09_MODULE_8%%
- %%R09_PUBLISHED%%
- %%R09_READING_NOTE%%
- %%R09_RSS_DATE%%
- %%R09_SECTION_LABEL_1%%
- %%R09_SECTION_LABEL_2%%
- %%R09_SECTION_LABEL_3%%
- %%R09_SECTION_LABEL_4%%
- %%R09_SUMMARY%%
- %%R09_TITLE%%
- %%R10_AUTHOR_NOTE%%
- %%R10_BODY_1_A%%
- %%R10_BODY_1_B%%
- %%R10_BODY_2_A%%
- %%R10_BODY_2_B%%
- %%R10_BODY_3_A%%
- %%R10_BODY_3_B%%
- %%R10_BODY_4_A%%
- %%R10_BODY_4_B%%
- %%R10_CARD_NOTE%%
- %%R10_CONCLUSION%%
- %%R10_COVER_ALT%%
- %%R10_COVER_CAPTION%%
- %%R10_EYEBROW%%
- %%R10_FAQ_A_1%%
- %%R10_FAQ_A_2%%
- %%R10_FAQ_Q_1%%
- %%R10_FAQ_Q_2%%
- %%R10_FAQ_TITLE%%
- %%R10_H2_1%%
- %%R10_H2_2%%
- %%R10_H2_3%%
- %%R10_H2_4%%
- %%R10_MODIFIED%%
- %%R10_MODULE_1%%
- %%R10_MODULE_2%%
- %%R10_MODULE_3%%
- %%R10_PUBLISHED%%
- %%R10_READING_NOTE%%
- %%R10_RSS_DATE%%
- %%R10_SECTION_LABEL_1%%
- %%R10_SECTION_LABEL_2%%
- %%R10_SECTION_LABEL_3%%
- %%R10_SECTION_LABEL_4%%
- %%R10_SUMMARY%%
- %%R10_TITLE%%
- %%R11_AUTHOR_NOTE%%
- %%R11_BODY_1_A%%
- %%R11_BODY_1_B%%
- %%R11_BODY_2_A%%
- %%R11_BODY_2_B%%
- %%R11_BODY_3_A%%
- %%R11_BODY_3_B%%
- %%R11_BODY_4_A%%
- %%R11_BODY_4_B%%
- %%R11_CARD_NOTE%%
- %%R11_CONCLUSION%%
- %%R11_COVER_ALT%%
- %%R11_COVER_CAPTION%%
- %%R11_DATE_1%%
- %%R11_DATE_2%%
- %%R11_DATE_3%%
- %%R11_DATE_4%%
- %%R11_EYEBROW%%
- %%R11_FAQ_A_1%%
- %%R11_FAQ_A_2%%
- %%R11_FAQ_Q_1%%
- %%R11_FAQ_Q_2%%
- %%R11_FAQ_TITLE%%
- %%R11_H2_1%%
- %%R11_H2_2%%
- %%R11_H2_3%%
- %%R11_H2_4%%
- %%R11_MODIFIED%%
- %%R11_MODULE_1%%
- %%R11_MODULE_2%%
- %%R11_MODULE_3%%
- %%R11_MODULE_4%%
- %%R11_MODULE_5%%
- %%R11_MODULE_6%%
- %%R11_MODULE_7%%
- %%R11_MODULE_8%%
- %%R11_PUBLISHED%%
- %%R11_READING_NOTE%%
- %%R11_RSS_DATE%%
- %%R11_SECTION_LABEL_1%%
- %%R11_SECTION_LABEL_2%%
- %%R11_SECTION_LABEL_3%%
- %%R11_SECTION_LABEL_4%%
- %%R11_SUMMARY%%
- %%R11_TITLE%%
- %%R12_AUTHOR_NOTE%%
- %%R12_BODY_1_A%%
- %%R12_BODY_1_B%%
- %%R12_BODY_2_A%%
- %%R12_BODY_2_B%%
- %%R12_BODY_3_A%%
- %%R12_BODY_3_B%%
- %%R12_BODY_4_A%%
- %%R12_BODY_4_B%%
- %%R12_CARD_NOTE%%
- %%R12_CONCLUSION%%
- %%R12_COVER_ALT%%
- %%R12_COVER_CAPTION%%
- %%R12_EYEBROW%%
- %%R12_FAQ_A_1%%
- %%R12_FAQ_A_2%%
- %%R12_FAQ_Q_1%%
- %%R12_FAQ_Q_2%%
- %%R12_FAQ_TITLE%%
- %%R12_H2_1%%
- %%R12_H2_2%%
- %%R12_H2_3%%
- %%R12_H2_4%%
- %%R12_MODIFIED%%
- %%R12_MODULE_1%%
- %%R12_MODULE_2%%
- %%R12_PUBLISHED%%
- %%R12_READING_NOTE%%
- %%R12_RSS_DATE%%
- %%R12_SECTION_LABEL_1%%
- %%R12_SECTION_LABEL_2%%
- %%R12_SECTION_LABEL_3%%
- %%R12_SECTION_LABEL_4%%
- %%R12_SUMMARY%%
- %%R12_TITLE%%
- %%RISK_NOTE%%
- %%SECURITY_EMAIL%%
- %%SECURITY_EXPIRES%%
- %%SEO_TITLE%%
- %%SITEMAP_LASTMOD%%
- %%SITE_DESC%%
- %%SITE_DOMAIN%%
- %%SITE_NAME%%
- %%SITE_TAGLINE%%
- %%STRATA_1%%
- %%STRATA_2%%
- %%STRATA_3%%
- %%STRATA_4%%
- %%TOOLS_INTRO%%
- %%TOOLS_TITLE%%
- %%UPDATES_TEXT_1%%
- %%UPDATES_TEXT_2%%
- %%UPDATES_TEXT_3%%
- %%UPDATES_TEXT_4%%
- %%UPDATES_TEXT_5%%
- %%UPDATES_TITLE_1%%
- %%UPDATES_TITLE_2%%
- %%UPDATES_TITLE_3%%
- %%UPDATES_TITLE_4%%
- %%UPDATES_TITLE_5%%
