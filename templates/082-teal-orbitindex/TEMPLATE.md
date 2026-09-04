# 082 Teal Orbitindex · 工作流 v2 接入契约

## 范围与风格

只制作完整网站模板，不写业务文章或注册教程，不部署。原 `observatory.css` 字节保留，新 `orbit-extension.css` 补齐四条内容轨道、十二种观测组件、五台本地几何/时间仪器、八项公开说明与响应式。保留原首页全部 oi82 类名、深青双环轨道、节点、坐标带、周期卡和传输札记。动态源包未取得，原包忠实度未核验；UI 验收不能替代保真证明。

36 个 HTML：32 个可索引页、404、3 个 noindex 兼容入口。`registrationGuide` 只是工作流兼容字段，指通用发布窗口与访问通行证组件，不是注册教程。

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "ephemeris-register.html",
  "articles": [
    "observations/observation-aperture.html",
    "observations/source-parallax.html",
    "observations/capture-vector.html",
    "observations/cadence-wheel.html",
    "observations/epoch-ruler.html",
    "observations/freshness-arc.html",
    "observations/evidence-ellipse.html",
    "observations/claim-conjunction.html",
    "observations/dependency-transit.html",
    "observations/version-trail.html",
    "observations/handoff-alignment.html",
    "observations/release-window.html"
  ],
  "cornerstones": [
    "observations/observation-aperture.html",
    "observations/evidence-ellipse.html"
  ],
  "registrationGuide": "observations/release-window.html",
  "articleCovers": {
    "observations/observation-aperture.html": {
      "display": "assets/observations/observation-aperture.webp",
      "og": "assets/observations/observation-aperture.png"
    },
    "observations/source-parallax.html": {
      "display": "assets/observations/source-parallax.webp",
      "og": "assets/observations/source-parallax.png"
    },
    "observations/capture-vector.html": {
      "display": "assets/observations/capture-vector.webp",
      "og": "assets/observations/capture-vector.png"
    },
    "observations/cadence-wheel.html": {
      "display": "assets/observations/cadence-wheel.webp",
      "og": "assets/observations/cadence-wheel.png"
    },
    "observations/epoch-ruler.html": {
      "display": "assets/observations/epoch-ruler.webp",
      "og": "assets/observations/epoch-ruler.png"
    },
    "observations/freshness-arc.html": {
      "display": "assets/observations/freshness-arc.webp",
      "og": "assets/observations/freshness-arc.png"
    },
    "observations/evidence-ellipse.html": {
      "display": "assets/observations/evidence-ellipse.webp",
      "og": "assets/observations/evidence-ellipse.png"
    },
    "observations/claim-conjunction.html": {
      "display": "assets/observations/claim-conjunction.webp",
      "og": "assets/observations/claim-conjunction.png"
    },
    "observations/dependency-transit.html": {
      "display": "assets/observations/dependency-transit.webp",
      "og": "assets/observations/dependency-transit.png"
    },
    "observations/version-trail.html": {
      "display": "assets/observations/version-trail.webp",
      "og": "assets/observations/version-trail.png"
    },
    "observations/handoff-alignment.html": {
      "display": "assets/observations/handoff-alignment.webp",
      "og": "assets/observations/handoff-alignment.png"
    },
    "observations/release-window.html": {
      "display": "assets/observations/release-window.webp",
      "og": "assets/observations/release-window.png"
    }
  },
  "categories": [
    {
      "path": "orbits/capture-orbit.html",
      "label": "捕获轨道",
      "articles": [
        "observations/observation-aperture.html",
        "observations/source-parallax.html",
        "observations/capture-vector.html"
      ]
    },
    {
      "path": "orbits/cadence-orbit.html",
      "label": "节拍轨道",
      "articles": [
        "observations/cadence-wheel.html",
        "observations/epoch-ruler.html",
        "observations/freshness-arc.html"
      ]
    },
    {
      "path": "orbits/relation-orbit.html",
      "label": "关系轨道",
      "articles": [
        "observations/evidence-ellipse.html",
        "observations/claim-conjunction.html",
        "observations/dependency-transit.html"
      ]
    },
    {
      "path": "orbits/release-orbit.html",
      "label": "发布轨道",
      "articles": [
        "observations/version-trail.html",
        "observations/handoff-alignment.html",
        "observations/release-window.html"
      ]
    }
  ],
  "toolIndex": "calibration-deck.html",
  "tools": [
    "instruments/coordinate-normalizer.html",
    "instruments/angular-separation.html",
    "instruments/right-ascension-delta.html",
    "instruments/observation-window.html",
    "instruments/phase-locator.html"
  ],
  "legal": {
    "about": "station-charter.html",
    "contact": "observer-contact.html",
    "corrections": "correction-ephemeris.html",
    "disclosure": "commercial-orbit.html",
    "disclaimer": "scope-horizon.html",
    "privacy": "local-observation-privacy.html",
    "updates": "ephemeris-changelog.html",
    "editorial": "observation-method.html"
  },
  "error404": "404.html",
  "robots": "robots.txt",
  "sitemap": "sitemap.xml",
  "feed": "feed.xml",
  "security": ".well-known/security.txt",
  "favicon": "favicon.ico",
  "appleTouchIcon": "apple-touch-icon.png",
  "socialImage": "assets/orbitindex-cover.png",
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

- 只填经核实的正文与变量，不再补 UI、页面、封面、工具或移动端样式；保留角色、路径、锚点、表单、data-oi82-* 与 ARIA。
- 首页只展示邀请码复制、弹性利益点与脚注，不含推广直链。`observations/release-window.html` 恰留一处推广链接槽，保留四值 rel、target 和紧邻披露。
- 坐标与时间工具仅描述输入的数学关系，不查询星表、不识别对象、不证明材料来源或事实正确。

## 变量格式与容量

BRAND_EN 为 3–24 个英文或罗马字；标题建议 8–22 个中文字；摘要 40–100 字；正文槽 100–800 字；轮盘标记不超过 8 个字符。邀请码 4–28 ASCII；利益脚注 16–45 字。域名为纯域名；URL 为已核验绝对 HTTPS；日期 YYYY-MM-DD。按 HTML、属性、XML、JSON-LD 上下文分别转义，不得未转义全局替换。

## 五台本地仪器

1. 赤经赤纬归一：1–200 行 `name | HH:MM:SS | ±DD:MM:SS`，精确到整数角秒后输出六位小数度。
2. 球面角距：1–200 行 `id | RA1° | DEC1° | RA2° | DEC2°`，稳定 haversine 形式输出角距。
3. 赤经短弧差：1–300 行 `id | RA-A° | RA-B°`，十进制最多六位，以 BigInt 微度计算最短有向弧。
4. 环日观测窗：1–300 行 `label | start-minute | end-minute`，合并普通/跨午夜半开窗口并列出覆盖与空档。
5. 周期相位：1–300 行 `id | period-sec | offset-sec | timestamp-sec`，以 BigInt 计算标准余数、相位及下一过境。

工具先检查原值 40,000 字符、控制字符、不完整 Unicode 与行数，再 NFKC；输入改变立即使旧报告和异步复制失效。工具不联网、不读取文件。

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
- %%HOME_QUOTE%%
- %%HOME_QUOTE_SOURCE%%
- %%HOME_QUOTE_TITLE%%
- %%HOME_SECTION_INTRO%%
- %%HOME_SECTION_TITLE%%
- %%HOME_TITLE%%
- %%INDEPENDENCE_NOTE%%
- %%INVITE_CODE%%
- %%INVITE_TITLE%%
- %%LANG%%
- %%NEXT_PASS%%
- %%O01_AUTHOR_NOTE%%
- %%O01_BODY_1_A%%
- %%O01_BODY_1_B%%
- %%O01_BODY_2_A%%
- %%O01_BODY_2_B%%
- %%O01_BODY_3_A%%
- %%O01_BODY_3_B%%
- %%O01_BODY_4_A%%
- %%O01_BODY_4_B%%
- %%O01_BOUNDARY%%
- %%O01_CONCLUSION%%
- %%O01_COVER_ALT%%
- %%O01_COVER_CAPTION%%
- %%O01_FAQ_A_1%%
- %%O01_FAQ_A_2%%
- %%O01_FAQ_Q_1%%
- %%O01_FAQ_Q_2%%
- %%O01_FAQ_TITLE%%
- %%O01_H2_1%%
- %%O01_H2_2%%
- %%O01_H2_3%%
- %%O01_H2_4%%
- %%O01_HANDOFF_TEXT%%
- %%O01_MODIFIED%%
- %%O01_MODULE_MARK%%
- %%O01_MODULE_NOTE%%
- %%O01_PUBLISHED%%
- %%O01_RSS_DATE%%
- %%O01_SOURCE_URL%%
- %%O01_SUMMARY%%
- %%O01_TITLE%%
- %%O02_AUTHOR_NOTE%%
- %%O02_BODY_1_A%%
- %%O02_BODY_1_B%%
- %%O02_BODY_2_A%%
- %%O02_BODY_2_B%%
- %%O02_BODY_3_A%%
- %%O02_BODY_3_B%%
- %%O02_BODY_4_A%%
- %%O02_BODY_4_B%%
- %%O02_BOUNDARY%%
- %%O02_CONCLUSION%%
- %%O02_COVER_ALT%%
- %%O02_COVER_CAPTION%%
- %%O02_FAQ_A_1%%
- %%O02_FAQ_A_2%%
- %%O02_FAQ_Q_1%%
- %%O02_FAQ_Q_2%%
- %%O02_FAQ_TITLE%%
- %%O02_H2_1%%
- %%O02_H2_2%%
- %%O02_H2_3%%
- %%O02_H2_4%%
- %%O02_HANDOFF_TEXT%%
- %%O02_MODIFIED%%
- %%O02_MODULE_CENTER%%
- %%O02_MODULE_NOTE%%
- %%O02_PUBLISHED%%
- %%O02_RSS_DATE%%
- %%O02_SOURCE_URL%%
- %%O02_SUMMARY%%
- %%O02_TITLE%%
- %%O03_AUTHOR_NOTE%%
- %%O03_BODY_1_A%%
- %%O03_BODY_1_B%%
- %%O03_BODY_2_A%%
- %%O03_BODY_2_B%%
- %%O03_BODY_3_A%%
- %%O03_BODY_3_B%%
- %%O03_BODY_4_A%%
- %%O03_BODY_4_B%%
- %%O03_BOUNDARY%%
- %%O03_CONCLUSION%%
- %%O03_COVER_ALT%%
- %%O03_COVER_CAPTION%%
- %%O03_FAQ_A_1%%
- %%O03_FAQ_A_2%%
- %%O03_FAQ_Q_1%%
- %%O03_FAQ_Q_2%%
- %%O03_FAQ_TITLE%%
- %%O03_H2_1%%
- %%O03_H2_2%%
- %%O03_H2_3%%
- %%O03_H2_4%%
- %%O03_HANDOFF_TEXT%%
- %%O03_MODIFIED%%
- %%O03_MODULE_ALT%%
- %%O03_MODULE_NOTE%%
- %%O03_PUBLISHED%%
- %%O03_RSS_DATE%%
- %%O03_SOURCE_URL%%
- %%O03_SUMMARY%%
- %%O03_TITLE%%
- %%O04_AUTHOR_NOTE%%
- %%O04_BODY_1_A%%
- %%O04_BODY_1_B%%
- %%O04_BODY_2_A%%
- %%O04_BODY_2_B%%
- %%O04_BODY_3_A%%
- %%O04_BODY_3_B%%
- %%O04_BODY_4_A%%
- %%O04_BODY_4_B%%
- %%O04_BOUNDARY%%
- %%O04_CONCLUSION%%
- %%O04_COVER_ALT%%
- %%O04_COVER_CAPTION%%
- %%O04_FAQ_A_1%%
- %%O04_FAQ_A_2%%
- %%O04_FAQ_Q_1%%
- %%O04_FAQ_Q_2%%
- %%O04_FAQ_TITLE%%
- %%O04_H2_1%%
- %%O04_H2_2%%
- %%O04_H2_3%%
- %%O04_H2_4%%
- %%O04_HANDOFF_TEXT%%
- %%O04_MODIFIED%%
- %%O04_MODULE_MARK%%
- %%O04_MODULE_NOTE%%
- %%O04_PUBLISHED%%
- %%O04_RSS_DATE%%
- %%O04_SOURCE_URL%%
- %%O04_SUMMARY%%
- %%O04_TITLE%%
- %%O05_AUTHOR_NOTE%%
- %%O05_BODY_1_A%%
- %%O05_BODY_1_B%%
- %%O05_BODY_2_A%%
- %%O05_BODY_2_B%%
- %%O05_BODY_3_A%%
- %%O05_BODY_3_B%%
- %%O05_BODY_4_A%%
- %%O05_BODY_4_B%%
- %%O05_BOUNDARY%%
- %%O05_CONCLUSION%%
- %%O05_COVER_ALT%%
- %%O05_COVER_CAPTION%%
- %%O05_FAQ_A_1%%
- %%O05_FAQ_A_2%%
- %%O05_FAQ_Q_1%%
- %%O05_FAQ_Q_2%%
- %%O05_FAQ_TITLE%%
- %%O05_H2_1%%
- %%O05_H2_2%%
- %%O05_H2_3%%
- %%O05_H2_4%%
- %%O05_HANDOFF_TEXT%%
- %%O05_MODIFIED%%
- %%O05_MODULE_1%%
- %%O05_MODULE_2%%
- %%O05_MODULE_3%%
- %%O05_MODULE_4%%
- %%O05_MODULE_NOTE%%
- %%O05_PUBLISHED%%
- %%O05_RSS_DATE%%
- %%O05_SOURCE_URL%%
- %%O05_SUMMARY%%
- %%O05_TITLE%%
- %%O06_AUTHOR_NOTE%%
- %%O06_BODY_1_A%%
- %%O06_BODY_1_B%%
- %%O06_BODY_2_A%%
- %%O06_BODY_2_B%%
- %%O06_BODY_3_A%%
- %%O06_BODY_3_B%%
- %%O06_BODY_4_A%%
- %%O06_BODY_4_B%%
- %%O06_BOUNDARY%%
- %%O06_CONCLUSION%%
- %%O06_COVER_ALT%%
- %%O06_COVER_CAPTION%%
- %%O06_FAQ_A_1%%
- %%O06_FAQ_A_2%%
- %%O06_FAQ_Q_1%%
- %%O06_FAQ_Q_2%%
- %%O06_FAQ_TITLE%%
- %%O06_H2_1%%
- %%O06_H2_2%%
- %%O06_H2_3%%
- %%O06_H2_4%%
- %%O06_HANDOFF_TEXT%%
- %%O06_MODIFIED%%
- %%O06_MODULE_ALT%%
- %%O06_MODULE_NOTE%%
- %%O06_PUBLISHED%%
- %%O06_RSS_DATE%%
- %%O06_SOURCE_URL%%
- %%O06_SUMMARY%%
- %%O06_TITLE%%
- %%O07_AUTHOR_NOTE%%
- %%O07_BODY_1_A%%
- %%O07_BODY_1_B%%
- %%O07_BODY_2_A%%
- %%O07_BODY_2_B%%
- %%O07_BODY_3_A%%
- %%O07_BODY_3_B%%
- %%O07_BODY_4_A%%
- %%O07_BODY_4_B%%
- %%O07_BOUNDARY%%
- %%O07_CONCLUSION%%
- %%O07_COVER_ALT%%
- %%O07_COVER_CAPTION%%
- %%O07_FAQ_A_1%%
- %%O07_FAQ_A_2%%
- %%O07_FAQ_Q_1%%
- %%O07_FAQ_Q_2%%
- %%O07_FAQ_TITLE%%
- %%O07_H2_1%%
- %%O07_H2_2%%
- %%O07_H2_3%%
- %%O07_H2_4%%
- %%O07_HANDOFF_TEXT%%
- %%O07_MODIFIED%%
- %%O07_MODULE_CENTER%%
- %%O07_MODULE_NOTE%%
- %%O07_PUBLISHED%%
- %%O07_RSS_DATE%%
- %%O07_SOURCE_URL%%
- %%O07_SUMMARY%%
- %%O07_TITLE%%
- %%O08_AUTHOR_NOTE%%
- %%O08_BODY_1_A%%
- %%O08_BODY_1_B%%
- %%O08_BODY_2_A%%
- %%O08_BODY_2_B%%
- %%O08_BODY_3_A%%
- %%O08_BODY_3_B%%
- %%O08_BODY_4_A%%
- %%O08_BODY_4_B%%
- %%O08_BOUNDARY%%
- %%O08_CONCLUSION%%
- %%O08_COVER_ALT%%
- %%O08_COVER_CAPTION%%
- %%O08_FAQ_A_1%%
- %%O08_FAQ_A_2%%
- %%O08_FAQ_Q_1%%
- %%O08_FAQ_Q_2%%
- %%O08_FAQ_TITLE%%
- %%O08_H2_1%%
- %%O08_H2_2%%
- %%O08_H2_3%%
- %%O08_H2_4%%
- %%O08_HANDOFF_TEXT%%
- %%O08_MODIFIED%%
- %%O08_MODULE_CENTER%%
- %%O08_MODULE_NOTE%%
- %%O08_PUBLISHED%%
- %%O08_RSS_DATE%%
- %%O08_SOURCE_URL%%
- %%O08_SUMMARY%%
- %%O08_TITLE%%
- %%O09_AUTHOR_NOTE%%
- %%O09_BODY_1_A%%
- %%O09_BODY_1_B%%
- %%O09_BODY_2_A%%
- %%O09_BODY_2_B%%
- %%O09_BODY_3_A%%
- %%O09_BODY_3_B%%
- %%O09_BODY_4_A%%
- %%O09_BODY_4_B%%
- %%O09_BOUNDARY%%
- %%O09_CONCLUSION%%
- %%O09_COVER_ALT%%
- %%O09_COVER_CAPTION%%
- %%O09_FAQ_A_1%%
- %%O09_FAQ_A_2%%
- %%O09_FAQ_Q_1%%
- %%O09_FAQ_Q_2%%
- %%O09_FAQ_TITLE%%
- %%O09_H2_1%%
- %%O09_H2_2%%
- %%O09_H2_3%%
- %%O09_H2_4%%
- %%O09_HANDOFF_TEXT%%
- %%O09_MODIFIED%%
- %%O09_MODULE_LEFT%%
- %%O09_MODULE_NOTE%%
- %%O09_MODULE_RIGHT%%
- %%O09_PUBLISHED%%
- %%O09_RSS_DATE%%
- %%O09_SOURCE_URL%%
- %%O09_SUMMARY%%
- %%O09_TITLE%%
- %%O10_AUTHOR_NOTE%%
- %%O10_BODY_1_A%%
- %%O10_BODY_1_B%%
- %%O10_BODY_2_A%%
- %%O10_BODY_2_B%%
- %%O10_BODY_3_A%%
- %%O10_BODY_3_B%%
- %%O10_BODY_4_A%%
- %%O10_BODY_4_B%%
- %%O10_BOUNDARY%%
- %%O10_CONCLUSION%%
- %%O10_COVER_ALT%%
- %%O10_COVER_CAPTION%%
- %%O10_FAQ_A_1%%
- %%O10_FAQ_A_2%%
- %%O10_FAQ_Q_1%%
- %%O10_FAQ_Q_2%%
- %%O10_FAQ_TITLE%%
- %%O10_H2_1%%
- %%O10_H2_2%%
- %%O10_H2_3%%
- %%O10_H2_4%%
- %%O10_HANDOFF_TEXT%%
- %%O10_MODIFIED%%
- %%O10_MODULE_1%%
- %%O10_MODULE_2%%
- %%O10_MODULE_3%%
- %%O10_MODULE_4%%
- %%O10_MODULE_NOTE%%
- %%O10_PUBLISHED%%
- %%O10_RSS_DATE%%
- %%O10_SOURCE_URL%%
- %%O10_SUMMARY%%
- %%O10_TITLE%%
- %%O11_AUTHOR_NOTE%%
- %%O11_BODY_1_A%%
- %%O11_BODY_1_B%%
- %%O11_BODY_2_A%%
- %%O11_BODY_2_B%%
- %%O11_BODY_3_A%%
- %%O11_BODY_3_B%%
- %%O11_BODY_4_A%%
- %%O11_BODY_4_B%%
- %%O11_BOUNDARY%%
- %%O11_CONCLUSION%%
- %%O11_COVER_ALT%%
- %%O11_COVER_CAPTION%%
- %%O11_FAQ_A_1%%
- %%O11_FAQ_A_2%%
- %%O11_FAQ_Q_1%%
- %%O11_FAQ_Q_2%%
- %%O11_FAQ_TITLE%%
- %%O11_H2_1%%
- %%O11_H2_2%%
- %%O11_H2_3%%
- %%O11_H2_4%%
- %%O11_HANDOFF_TEXT%%
- %%O11_MODIFIED%%
- %%O11_MODULE_LEFT%%
- %%O11_MODULE_NOTE%%
- %%O11_MODULE_RIGHT%%
- %%O11_PUBLISHED%%
- %%O11_RSS_DATE%%
- %%O11_SOURCE_URL%%
- %%O11_SUMMARY%%
- %%O11_TITLE%%
- %%O12_AUTHOR_NOTE%%
- %%O12_BODY_1_A%%
- %%O12_BODY_1_B%%
- %%O12_BODY_2_A%%
- %%O12_BODY_2_B%%
- %%O12_BODY_3_A%%
- %%O12_BODY_3_B%%
- %%O12_BODY_4_A%%
- %%O12_BODY_4_B%%
- %%O12_BOUNDARY%%
- %%O12_CONCLUSION%%
- %%O12_COVER_ALT%%
- %%O12_COVER_CAPTION%%
- %%O12_FAQ_A_1%%
- %%O12_FAQ_A_2%%
- %%O12_FAQ_Q_1%%
- %%O12_FAQ_Q_2%%
- %%O12_FAQ_TITLE%%
- %%O12_H2_1%%
- %%O12_H2_2%%
- %%O12_H2_3%%
- %%O12_H2_4%%
- %%O12_HANDOFF_TEXT%%
- %%O12_MODIFIED%%
- %%O12_MODULE_LEFT%%
- %%O12_MODULE_NOTE%%
- %%O12_PROMO_DISCLOSURE%%
- %%O12_PROMO_LABEL%%
- %%O12_PUBLISHED%%
- %%O12_RSS_DATE%%
- %%O12_SOURCE_URL%%
- %%O12_SUMMARY%%
- %%O12_TITLE%%
- %%ORRERY_CAPTION%%
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
- %%REVISION_ID%%
- %%RISK_NOTE%%
- %%SECURITY_EMAIL%%
- %%SECURITY_EXPIRES%%
- %%SITE_DESC%%
- %%SITE_DOMAIN%%
- %%SITE_NAME%%
- %%SITE_TAGLINE%%
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
