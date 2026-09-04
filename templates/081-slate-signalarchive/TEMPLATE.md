# 081 Slate Signalarchive · 工作流 v2 接入契约

## 范围与风格

只制作完整网站模板，不写业务文章或注册教程，不部署。原 `microfilm.css` 字节保留，新 `microfilm-extension.css` 补齐四卷目录、十二种信号组件、五件本地摘要仪器、八项公开说明与响应式。保留原首页全部 sa81 类名和灰蓝胶片、穿孔、波形、流程条及登记册。动态源包未取得，原包忠实度未核验；UI 验收不能代替保真证明。

36 个 HTML：32 个可索引页、404、3 个 noindex 兼容入口。`registrationGuide` 只是工作流兼容字段，指通用发布保管链组件，不是注册教程。

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "archive-register.html",
  "articles": [
    "dossiers/capture-envelope.html",
    "dossiers/source-identity-frame.html",
    "dossiers/version-boundary-strip.html",
    "dossiers/encoding-freeze.html",
    "dossiers/newline-calibration.html",
    "dossiers/normalization-log.html",
    "dossiers/digest-ledger.html",
    "dossiers/duplicate-fingerprint.html",
    "dossiers/byte-drift-scope.html",
    "dossiers/provenance-context-card.html",
    "dossiers/authenticity-boundary.html",
    "dossiers/release-custody.html"
  ],
  "cornerstones": [
    "dossiers/capture-envelope.html",
    "dossiers/digest-ledger.html"
  ],
  "registrationGuide": "dossiers/release-custody.html",
  "articleCovers": {
    "dossiers/capture-envelope.html": {
      "display": "assets/dossiers/capture-envelope.webp",
      "og": "assets/dossiers/capture-envelope.png"
    },
    "dossiers/source-identity-frame.html": {
      "display": "assets/dossiers/source-identity-frame.webp",
      "og": "assets/dossiers/source-identity-frame.png"
    },
    "dossiers/version-boundary-strip.html": {
      "display": "assets/dossiers/version-boundary-strip.webp",
      "og": "assets/dossiers/version-boundary-strip.png"
    },
    "dossiers/encoding-freeze.html": {
      "display": "assets/dossiers/encoding-freeze.webp",
      "og": "assets/dossiers/encoding-freeze.png"
    },
    "dossiers/newline-calibration.html": {
      "display": "assets/dossiers/newline-calibration.webp",
      "og": "assets/dossiers/newline-calibration.png"
    },
    "dossiers/normalization-log.html": {
      "display": "assets/dossiers/normalization-log.webp",
      "og": "assets/dossiers/normalization-log.png"
    },
    "dossiers/digest-ledger.html": {
      "display": "assets/dossiers/digest-ledger.webp",
      "og": "assets/dossiers/digest-ledger.png"
    },
    "dossiers/duplicate-fingerprint.html": {
      "display": "assets/dossiers/duplicate-fingerprint.webp",
      "og": "assets/dossiers/duplicate-fingerprint.png"
    },
    "dossiers/byte-drift-scope.html": {
      "display": "assets/dossiers/byte-drift-scope.webp",
      "og": "assets/dossiers/byte-drift-scope.png"
    },
    "dossiers/provenance-context-card.html": {
      "display": "assets/dossiers/provenance-context-card.webp",
      "og": "assets/dossiers/provenance-context-card.png"
    },
    "dossiers/authenticity-boundary.html": {
      "display": "assets/dossiers/authenticity-boundary.webp",
      "og": "assets/dossiers/authenticity-boundary.png"
    },
    "dossiers/release-custody.html": {
      "display": "assets/dossiers/release-custody.webp",
      "og": "assets/dossiers/release-custody.png"
    }
  },
  "categories": [
    {
      "path": "reels/capture-reel.html",
      "label": "捕获卷",
      "articles": [
        "dossiers/capture-envelope.html",
        "dossiers/source-identity-frame.html",
        "dossiers/version-boundary-strip.html"
      ]
    },
    {
      "path": "reels/normalize-reel.html",
      "label": "规范卷",
      "articles": [
        "dossiers/encoding-freeze.html",
        "dossiers/newline-calibration.html",
        "dossiers/normalization-log.html"
      ]
    },
    {
      "path": "reels/fingerprint-reel.html",
      "label": "指纹卷",
      "articles": [
        "dossiers/digest-ledger.html",
        "dossiers/duplicate-fingerprint.html",
        "dossiers/byte-drift-scope.html"
      ]
    },
    {
      "path": "reels/context-reel.html",
      "label": "语境卷",
      "articles": [
        "dossiers/provenance-context-card.html",
        "dossiers/authenticity-boundary.html",
        "dossiers/release-custody.html"
      ]
    }
  ],
  "toolIndex": "instrument-bay.html",
  "tools": [
    "instruments/digest-register.html",
    "instruments/prefix-collision.html",
    "instruments/hamming-scope.html",
    "instruments/byte-manifest.html",
    "instruments/capture-chain.html"
  ],
  "legal": {
    "about": "archive-charter.html",
    "contact": "signal-desk.html",
    "corrections": "amendment-log.html",
    "disclosure": "relation-frame.html",
    "disclaimer": "integrity-boundary.html",
    "privacy": "local-privacy.html",
    "updates": "reel-changelog.html",
    "editorial": "capture-method.html"
  },
  "error404": "404.html",
  "robots": "robots.txt",
  "sitemap": "sitemap.xml",
  "feed": "feed.xml",
  "security": ".well-known/security.txt",
  "favicon": "favicon.ico",
  "appleTouchIcon": "apple-touch-icon.png",
  "socialImage": "assets/signalarchive-cover.png",
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

- 只填经核实的正文与变量，不再补 UI、页面、封面、工具或移动端样式；保留角色、路径、锚点、表单、data-sa81-* 与 ARIA。
- 首页只展示邀请码复制、弹性利益点与脚注，不含推广直链。`dossiers/release-custody.html` 恰留一处推广链接槽，保留四值 rel、target 和紧邻披露。
- 摘要相同只能描述输入摘要相同，不能写成来源真实、事实正确或发布者可信。图形是抽象胶片，不是证据。

## 变量格式与容量

BRAND_EN 为 3–24 个英文或罗马字；标题建议 8–22 个中文字；摘要 40–100 字；正文槽 100–800 字。邀请码 4–28 ASCII；利益脚注 16–45 字。SHA-256 为 64 位十六进制；域名纯域名；URL 为已核验绝对 HTTPS；日期 YYYY-MM-DD。按 HTML、属性、XML、JSON-LD 上下文分别转义，不得未转义全局替换。

## 五件本地仪器

1. 摘要重复登记器：1–200 行 `title | SHA-256`，报告标题和摘要重复组。
2. 前缀碰撞分片器：1–300 行 `id | SHA-256`，按 2/4/6/8/10/12 位前缀完整归桶。
3. 摘要位差显微镜：1–300 行 `id | hashA | hashB`，按十六进制 XOR 精确计算 256 位汉明距离。
4. 字节清单汇总器：1–300 行 `file | bytes | SHA-256`，以 BigInt 汇总字节并标出重复摘要。
5. 捕获链连续性扫描器：1–300 行 `id | predecessor-or-ROOT | SHA-256`，检查缺父、自指、循环、分叉与根数。

工具先检查原值长度、控制字符、不完整 Unicode与行数，再 NFKC；双摘要的位差显微镜最多 50,000 个 Unicode 字符，其余工具最多 30,000 个，以便 300 条双摘要记录确实可用。输入改变立即使旧报告和异步复制失效。工具不联网、不生成摘要、不读取文件。

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
- %%ARCHIVE_MEDIUM%%
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
- %%D01_BOUNDARY%%
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
- %%D01_RSS_DATE%%
- %%D01_SOURCE_URL%%
- %%D01_STATE%%
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
- %%D02_BOUNDARY%%
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
- %%D02_MODULE_MARK%%
- %%D02_MODULE_NOTE%%
- %%D02_MODULE_RIGHT%%
- %%D02_PUBLISHED%%
- %%D02_RSS_DATE%%
- %%D02_SOURCE_URL%%
- %%D02_STATE%%
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
- %%D03_BOUNDARY%%
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
- %%D03_MODULE_NOTE%%
- %%D03_PUBLISHED%%
- %%D03_RSS_DATE%%
- %%D03_SOURCE_URL%%
- %%D03_STATE%%
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
- %%D04_BOUNDARY%%
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
- %%D04_MODULE_NOTE%%
- %%D04_PUBLISHED%%
- %%D04_RSS_DATE%%
- %%D04_SOURCE_URL%%
- %%D04_STATE%%
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
- %%D05_BOUNDARY%%
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
- %%D05_MODULE_ALT%%
- %%D05_MODULE_NOTE%%
- %%D05_PUBLISHED%%
- %%D05_RSS_DATE%%
- %%D05_SOURCE_URL%%
- %%D05_STATE%%
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
- %%D06_BOUNDARY%%
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
- %%D06_RSS_DATE%%
- %%D06_SOURCE_URL%%
- %%D06_STATE%%
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
- %%D07_BOUNDARY%%
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
- %%D07_MODULE_NOTE%%
- %%D07_PUBLISHED%%
- %%D07_RSS_DATE%%
- %%D07_SOURCE_URL%%
- %%D07_STATE%%
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
- %%D08_BOUNDARY%%
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
- %%D08_RSS_DATE%%
- %%D08_SOURCE_URL%%
- %%D08_STATE%%
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
- %%D09_BOUNDARY%%
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
- %%D09_MODULE_LEFT%%
- %%D09_MODULE_NOTE%%
- %%D09_MODULE_RIGHT%%
- %%D09_PUBLISHED%%
- %%D09_RSS_DATE%%
- %%D09_SOURCE_URL%%
- %%D09_STATE%%
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
- %%D10_BOUNDARY%%
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
- %%D10_MODULE_NOTE%%
- %%D10_PUBLISHED%%
- %%D10_RSS_DATE%%
- %%D10_SOURCE_URL%%
- %%D10_STATE%%
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
- %%D11_BOUNDARY%%
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
- %%D11_MODULE_NOTE%%
- %%D11_PUBLISHED%%
- %%D11_RSS_DATE%%
- %%D11_SOURCE_URL%%
- %%D11_STATE%%
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
- %%D12_BOUNDARY%%
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
- %%D12_RSS_DATE%%
- %%D12_SOURCE_URL%%
- %%D12_STATE%%
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
- %%FLOW_1%%
- %%FLOW_2%%
- %%FLOW_3%%
- %%FLOW_4%%
- %%HERO_DESCRIPTION%%
- %%HOME_RELEASE%%
- %%HOME_SECTION_TITLE%%
- %%HOME_TITLE%%
- %%INDEPENDENCE_NOTE%%
- %%INVITE_CODE%%
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
- %%SIGNAL_DESC%%
- %%SIGNAL_DIGEST_SAMPLE%%
- %%SIGNAL_STATE%%
- %%SIGNAL_TITLE%%
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
