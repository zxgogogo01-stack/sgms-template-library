# 083 Lime Typecascade · 工作流 v2 接入契约

## 范围与风格

只制作完整网站模板，不写业务文章或注册教程，不部署。原 `typeset.css` 字节保留，新 `cascade-extension.css` 扩展四个字模部、十二种文章排印组件、五台本地校样工具、七项公开说明与响应式。首页保留原有铅字瀑布、黑墨/纸样主题、荧光柠檬色、错位标题与全部旧 `tc83-*` 类名。动态源包未取得，原包忠实度未核验；UI 验收不能替代保真证明。

36 个 HTML：32 个可索引页、404、3 个 noindex 兼容入口。`registrationGuide` 只是工作流兼容字段，指通用发行铭牌与访问凭条组件，不是注册教程。

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "proof-register.html",
  "articles": [
    "galleys/outline-map.html",
    "galleys/heading-hierarchy.html",
    "galleys/semantic-weight.html",
    "galleys/measure-rhythm.html",
    "galleys/baseline-cadence.html",
    "galleys/rag-composition.html",
    "galleys/voice-contrast.html",
    "galleys/caption-register.html",
    "galleys/quote-counterpoint.html",
    "galleys/revision-strike.html",
    "galleys/handoff-colophon.html",
    "galleys/release-imprint.html"
  ],
  "cornerstones": [
    "galleys/outline-map.html",
    "galleys/measure-rhythm.html"
  ],
  "registrationGuide": "galleys/release-imprint.html",
  "articleCovers": {
    "galleys/outline-map.html": {
      "display": "assets/galleys/outline-map.webp",
      "og": "assets/galleys/outline-map.png"
    },
    "galleys/heading-hierarchy.html": {
      "display": "assets/galleys/heading-hierarchy.webp",
      "og": "assets/galleys/heading-hierarchy.png"
    },
    "galleys/semantic-weight.html": {
      "display": "assets/galleys/semantic-weight.webp",
      "og": "assets/galleys/semantic-weight.png"
    },
    "galleys/measure-rhythm.html": {
      "display": "assets/galleys/measure-rhythm.webp",
      "og": "assets/galleys/measure-rhythm.png"
    },
    "galleys/baseline-cadence.html": {
      "display": "assets/galleys/baseline-cadence.webp",
      "og": "assets/galleys/baseline-cadence.png"
    },
    "galleys/rag-composition.html": {
      "display": "assets/galleys/rag-composition.webp",
      "og": "assets/galleys/rag-composition.png"
    },
    "galleys/voice-contrast.html": {
      "display": "assets/galleys/voice-contrast.webp",
      "og": "assets/galleys/voice-contrast.png"
    },
    "galleys/caption-register.html": {
      "display": "assets/galleys/caption-register.webp",
      "og": "assets/galleys/caption-register.png"
    },
    "galleys/quote-counterpoint.html": {
      "display": "assets/galleys/quote-counterpoint.webp",
      "og": "assets/galleys/quote-counterpoint.png"
    },
    "galleys/revision-strike.html": {
      "display": "assets/galleys/revision-strike.webp",
      "og": "assets/galleys/revision-strike.png"
    },
    "galleys/handoff-colophon.html": {
      "display": "assets/galleys/handoff-colophon.webp",
      "og": "assets/galleys/handoff-colophon.png"
    },
    "galleys/release-imprint.html": {
      "display": "assets/galleys/release-imprint.webp",
      "og": "assets/galleys/release-imprint.png"
    }
  },
  "categories": [
    {
      "path": "formes/structure-forme.html",
      "label": "结构字模部",
      "articles": [
        "galleys/outline-map.html",
        "galleys/heading-hierarchy.html",
        "galleys/semantic-weight.html"
      ]
    },
    {
      "path": "formes/rhythm-forme.html",
      "label": "节律字模部",
      "articles": [
        "galleys/measure-rhythm.html",
        "galleys/baseline-cadence.html",
        "galleys/rag-composition.html"
      ]
    },
    {
      "path": "formes/voice-forme.html",
      "label": "声部字模部",
      "articles": [
        "galleys/voice-contrast.html",
        "galleys/caption-register.html",
        "galleys/quote-counterpoint.html"
      ]
    },
    {
      "path": "formes/release-forme.html",
      "label": "发行字模部",
      "articles": [
        "galleys/revision-strike.html",
        "galleys/handoff-colophon.html",
        "galleys/release-imprint.html"
      ]
    }
  ],
  "toolIndex": "proof-room.html",
  "tools": [
    "proofs/outline-proofer.html",
    "proofs/measure-planner.html",
    "proofs/baseline-concordance.html",
    "proofs/rag-composer.html",
    "proofs/widow-audit.html"
  ],
  "legal": {
    "about": "press-charter.html",
    "contact": "editor-contact.html",
    "disclosure": "commercial-note.html",
    "disclaimer": "reading-boundary.html",
    "privacy": "local-proof-privacy.html",
    "corrections": "correction-slip.html",
    "editorial": "editorial-standard.html"
  },
  "error404": "404.html",
  "robots": "robots.txt",
  "sitemap": "sitemap.xml",
  "feed": "feed.xml",
  "security": ".well-known/security.txt",
  "favicon": "favicon.ico",
  "appleTouchIcon": "apple-touch-icon.png",
  "socialImage": "assets/typecascade-cover.png",
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

- 只填经核实的正文与变量，不再补 UI、页面、封面、工具或移动端样式；保留角色、路径、锚点、表单、`data-tc83-*` 与 ARIA。
- 首页只展示邀请码复制、弹性利益点和脚注，不含推广直链。`galleys/release-imprint.html` 恰留一处推广链接槽，并带四值 rel、target 与紧邻披露。
- 五台工具仅计算输入文本的结构和排版数学关系，不解析真实网页、不证明事实、排名、合规或辅助技术表现。

## 变量格式与容量

BRAND_EN 为 3–24 个英文或罗马字；标题建议 8–24 个中文字；摘要 40–100 字；正文槽 100–800 字；邀请码 4–28 ASCII；利益脚注 16–45 字。域名为纯域名；URL 为已核验绝对 HTTPS；日期为 YYYY-MM-DD。按 HTML、属性、XML 与 JSON-LD 上下文分别转义，不得未转义全局替换。

## 五台本地校样工具

1. 层级大纲校样器：1–200 行 `层级 | 标题`，检查唯一 H1、首项、跳级、重复和完整输出。
2. 版心行长规划尺：1–300 行 `方案 | 版心宽 px | 字号 px | 平均字宽 em`，以三位定点整数计算容量。
3. 基线公约数仪：1–300 行 `区块 | 字号 px | 行高 px | 行数`，以 BigInt 千分之一像素计算高度和公共基线步长。
4. 参差边断行台：1–300 行 `段落 | 每行字符 | 文字`，动态规划最小化非末行平方余量。
5. 孤行寡行分页尺：1–300 行 `段落 | 段落行数 | 每页行数 | 当前页已用行数`，模拟分页并标注单行碎片。

所有工具先检查原值 40,000 Unicode 字符、控制字符、不完整代理对与行数，再进行 NFKC；输入改变立即使旧报告及异步复制失效。工具不联网、不读文件。

## 全部替换变量

- %%A01_AUTHOR_NOTE%%
- %%A01_BODY_1_A%%
- %%A01_BODY_1_B%%
- %%A01_BODY_2_A%%
- %%A01_BODY_2_B%%
- %%A01_BODY_3_A%%
- %%A01_BODY_3_B%%
- %%A01_BODY_4_A%%
- %%A01_BODY_4_B%%
- %%A01_BOUNDARY%%
- %%A01_CONCLUSION%%
- %%A01_COVER_ALT%%
- %%A01_COVER_CAPTION%%
- %%A01_FAQ_A_1%%
- %%A01_FAQ_A_2%%
- %%A01_FAQ_Q_1%%
- %%A01_FAQ_Q_2%%
- %%A01_FAQ_TITLE%%
- %%A01_H2_1%%
- %%A01_H2_2%%
- %%A01_H2_3%%
- %%A01_H2_4%%
- %%A01_HANDOFF_TEXT%%
- %%A01_MODIFIED%%
- %%A01_MODULE_1%%
- %%A01_MODULE_2%%
- %%A01_MODULE_3%%
- %%A01_MODULE_4%%
- %%A01_MODULE_NOTE%%
- %%A01_PUBLISHED%%
- %%A01_RSS_DATE%%
- %%A01_SOURCE_URL%%
- %%A01_SUMMARY%%
- %%A01_TITLE%%
- %%A02_AUTHOR_NOTE%%
- %%A02_BODY_1_A%%
- %%A02_BODY_1_B%%
- %%A02_BODY_2_A%%
- %%A02_BODY_2_B%%
- %%A02_BODY_3_A%%
- %%A02_BODY_3_B%%
- %%A02_BODY_4_A%%
- %%A02_BODY_4_B%%
- %%A02_BOUNDARY%%
- %%A02_CONCLUSION%%
- %%A02_COVER_ALT%%
- %%A02_COVER_CAPTION%%
- %%A02_FAQ_A_1%%
- %%A02_FAQ_A_2%%
- %%A02_FAQ_Q_1%%
- %%A02_FAQ_Q_2%%
- %%A02_FAQ_TITLE%%
- %%A02_H2_1%%
- %%A02_H2_2%%
- %%A02_H2_3%%
- %%A02_H2_4%%
- %%A02_HANDOFF_TEXT%%
- %%A02_MODIFIED%%
- %%A02_MODULE_1%%
- %%A02_MODULE_2%%
- %%A02_MODULE_3%%
- %%A02_MODULE_NOTE%%
- %%A02_PUBLISHED%%
- %%A02_RSS_DATE%%
- %%A02_SOURCE_URL%%
- %%A02_SUMMARY%%
- %%A02_TITLE%%
- %%A03_AUTHOR_NOTE%%
- %%A03_BODY_1_A%%
- %%A03_BODY_1_B%%
- %%A03_BODY_2_A%%
- %%A03_BODY_2_B%%
- %%A03_BODY_3_A%%
- %%A03_BODY_3_B%%
- %%A03_BODY_4_A%%
- %%A03_BODY_4_B%%
- %%A03_BOUNDARY%%
- %%A03_CONCLUSION%%
- %%A03_COVER_ALT%%
- %%A03_COVER_CAPTION%%
- %%A03_FAQ_A_1%%
- %%A03_FAQ_A_2%%
- %%A03_FAQ_Q_1%%
- %%A03_FAQ_Q_2%%
- %%A03_FAQ_TITLE%%
- %%A03_H2_1%%
- %%A03_H2_2%%
- %%A03_H2_3%%
- %%A03_H2_4%%
- %%A03_HANDOFF_TEXT%%
- %%A03_MODIFIED%%
- %%A03_MODULE_1%%
- %%A03_MODULE_2%%
- %%A03_MODULE_3%%
- %%A03_MODULE_NOTE%%
- %%A03_PUBLISHED%%
- %%A03_RSS_DATE%%
- %%A03_SOURCE_URL%%
- %%A03_SUMMARY%%
- %%A03_TITLE%%
- %%A04_AUTHOR_NOTE%%
- %%A04_BODY_1_A%%
- %%A04_BODY_1_B%%
- %%A04_BODY_2_A%%
- %%A04_BODY_2_B%%
- %%A04_BODY_3_A%%
- %%A04_BODY_3_B%%
- %%A04_BODY_4_A%%
- %%A04_BODY_4_B%%
- %%A04_BOUNDARY%%
- %%A04_CONCLUSION%%
- %%A04_COVER_ALT%%
- %%A04_COVER_CAPTION%%
- %%A04_FAQ_A_1%%
- %%A04_FAQ_A_2%%
- %%A04_FAQ_Q_1%%
- %%A04_FAQ_Q_2%%
- %%A04_FAQ_TITLE%%
- %%A04_H2_1%%
- %%A04_H2_2%%
- %%A04_H2_3%%
- %%A04_H2_4%%
- %%A04_HANDOFF_TEXT%%
- %%A04_MODIFIED%%
- %%A04_MODULE_MARK%%
- %%A04_MODULE_NOTE%%
- %%A04_PUBLISHED%%
- %%A04_RSS_DATE%%
- %%A04_SOURCE_URL%%
- %%A04_SUMMARY%%
- %%A04_TITLE%%
- %%A05_AUTHOR_NOTE%%
- %%A05_BODY_1_A%%
- %%A05_BODY_1_B%%
- %%A05_BODY_2_A%%
- %%A05_BODY_2_B%%
- %%A05_BODY_3_A%%
- %%A05_BODY_3_B%%
- %%A05_BODY_4_A%%
- %%A05_BODY_4_B%%
- %%A05_BOUNDARY%%
- %%A05_CONCLUSION%%
- %%A05_COVER_ALT%%
- %%A05_COVER_CAPTION%%
- %%A05_FAQ_A_1%%
- %%A05_FAQ_A_2%%
- %%A05_FAQ_Q_1%%
- %%A05_FAQ_Q_2%%
- %%A05_FAQ_TITLE%%
- %%A05_H2_1%%
- %%A05_H2_2%%
- %%A05_H2_3%%
- %%A05_H2_4%%
- %%A05_HANDOFF_TEXT%%
- %%A05_MODIFIED%%
- %%A05_MODULE_1%%
- %%A05_MODULE_2%%
- %%A05_MODULE_3%%
- %%A05_MODULE_NOTE%%
- %%A05_PUBLISHED%%
- %%A05_RSS_DATE%%
- %%A05_SOURCE_URL%%
- %%A05_SUMMARY%%
- %%A05_TITLE%%
- %%A06_AUTHOR_NOTE%%
- %%A06_BODY_1_A%%
- %%A06_BODY_1_B%%
- %%A06_BODY_2_A%%
- %%A06_BODY_2_B%%
- %%A06_BODY_3_A%%
- %%A06_BODY_3_B%%
- %%A06_BODY_4_A%%
- %%A06_BODY_4_B%%
- %%A06_BOUNDARY%%
- %%A06_CONCLUSION%%
- %%A06_COVER_ALT%%
- %%A06_COVER_CAPTION%%
- %%A06_FAQ_A_1%%
- %%A06_FAQ_A_2%%
- %%A06_FAQ_Q_1%%
- %%A06_FAQ_Q_2%%
- %%A06_FAQ_TITLE%%
- %%A06_H2_1%%
- %%A06_H2_2%%
- %%A06_H2_3%%
- %%A06_H2_4%%
- %%A06_HANDOFF_TEXT%%
- %%A06_MODIFIED%%
- %%A06_MODULE_MARK%%
- %%A06_MODULE_NOTE%%
- %%A06_PUBLISHED%%
- %%A06_RSS_DATE%%
- %%A06_SOURCE_URL%%
- %%A06_SUMMARY%%
- %%A06_TITLE%%
- %%A07_AUTHOR_NOTE%%
- %%A07_BODY_1_A%%
- %%A07_BODY_1_B%%
- %%A07_BODY_2_A%%
- %%A07_BODY_2_B%%
- %%A07_BODY_3_A%%
- %%A07_BODY_3_B%%
- %%A07_BODY_4_A%%
- %%A07_BODY_4_B%%
- %%A07_BOUNDARY%%
- %%A07_CONCLUSION%%
- %%A07_COVER_ALT%%
- %%A07_COVER_CAPTION%%
- %%A07_FAQ_A_1%%
- %%A07_FAQ_A_2%%
- %%A07_FAQ_Q_1%%
- %%A07_FAQ_Q_2%%
- %%A07_FAQ_TITLE%%
- %%A07_H2_1%%
- %%A07_H2_2%%
- %%A07_H2_3%%
- %%A07_H2_4%%
- %%A07_HANDOFF_TEXT%%
- %%A07_MODIFIED%%
- %%A07_MODULE_1%%
- %%A07_MODULE_2%%
- %%A07_MODULE_NOTE%%
- %%A07_PUBLISHED%%
- %%A07_RSS_DATE%%
- %%A07_SOURCE_URL%%
- %%A07_SUMMARY%%
- %%A07_TITLE%%
- %%A08_AUTHOR_NOTE%%
- %%A08_BODY_1_A%%
- %%A08_BODY_1_B%%
- %%A08_BODY_2_A%%
- %%A08_BODY_2_B%%
- %%A08_BODY_3_A%%
- %%A08_BODY_3_B%%
- %%A08_BODY_4_A%%
- %%A08_BODY_4_B%%
- %%A08_BOUNDARY%%
- %%A08_CONCLUSION%%
- %%A08_COVER_ALT%%
- %%A08_COVER_CAPTION%%
- %%A08_FAQ_A_1%%
- %%A08_FAQ_A_2%%
- %%A08_FAQ_Q_1%%
- %%A08_FAQ_Q_2%%
- %%A08_FAQ_TITLE%%
- %%A08_H2_1%%
- %%A08_H2_2%%
- %%A08_H2_3%%
- %%A08_H2_4%%
- %%A08_HANDOFF_TEXT%%
- %%A08_MODIFIED%%
- %%A08_MODULE_1%%
- %%A08_MODULE_2%%
- %%A08_MODULE_NOTE%%
- %%A08_PUBLISHED%%
- %%A08_RSS_DATE%%
- %%A08_SOURCE_URL%%
- %%A08_SUMMARY%%
- %%A08_TITLE%%
- %%A09_AUTHOR_NOTE%%
- %%A09_BODY_1_A%%
- %%A09_BODY_1_B%%
- %%A09_BODY_2_A%%
- %%A09_BODY_2_B%%
- %%A09_BODY_3_A%%
- %%A09_BODY_3_B%%
- %%A09_BODY_4_A%%
- %%A09_BODY_4_B%%
- %%A09_BOUNDARY%%
- %%A09_CONCLUSION%%
- %%A09_COVER_ALT%%
- %%A09_COVER_CAPTION%%
- %%A09_FAQ_A_1%%
- %%A09_FAQ_A_2%%
- %%A09_FAQ_Q_1%%
- %%A09_FAQ_Q_2%%
- %%A09_FAQ_TITLE%%
- %%A09_H2_1%%
- %%A09_H2_2%%
- %%A09_H2_3%%
- %%A09_H2_4%%
- %%A09_HANDOFF_TEXT%%
- %%A09_MODIFIED%%
- %%A09_MODULE_1%%
- %%A09_MODULE_2%%
- %%A09_MODULE_NOTE%%
- %%A09_PUBLISHED%%
- %%A09_RSS_DATE%%
- %%A09_SOURCE_URL%%
- %%A09_SUMMARY%%
- %%A09_TITLE%%
- %%A10_AUTHOR_NOTE%%
- %%A10_BODY_1_A%%
- %%A10_BODY_1_B%%
- %%A10_BODY_2_A%%
- %%A10_BODY_2_B%%
- %%A10_BODY_3_A%%
- %%A10_BODY_3_B%%
- %%A10_BODY_4_A%%
- %%A10_BODY_4_B%%
- %%A10_BOUNDARY%%
- %%A10_CONCLUSION%%
- %%A10_COVER_ALT%%
- %%A10_COVER_CAPTION%%
- %%A10_FAQ_A_1%%
- %%A10_FAQ_A_2%%
- %%A10_FAQ_Q_1%%
- %%A10_FAQ_Q_2%%
- %%A10_FAQ_TITLE%%
- %%A10_H2_1%%
- %%A10_H2_2%%
- %%A10_H2_3%%
- %%A10_H2_4%%
- %%A10_HANDOFF_TEXT%%
- %%A10_MODIFIED%%
- %%A10_MODULE_1%%
- %%A10_MODULE_2%%
- %%A10_MODULE_MARK%%
- %%A10_MODULE_NOTE%%
- %%A10_PUBLISHED%%
- %%A10_RSS_DATE%%
- %%A10_SOURCE_URL%%
- %%A10_SUMMARY%%
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
- %%A11_BOUNDARY%%
- %%A11_CONCLUSION%%
- %%A11_COVER_ALT%%
- %%A11_COVER_CAPTION%%
- %%A11_FAQ_A_1%%
- %%A11_FAQ_A_2%%
- %%A11_FAQ_Q_1%%
- %%A11_FAQ_Q_2%%
- %%A11_FAQ_TITLE%%
- %%A11_H2_1%%
- %%A11_H2_2%%
- %%A11_H2_3%%
- %%A11_H2_4%%
- %%A11_HANDOFF_TEXT%%
- %%A11_MODIFIED%%
- %%A11_MODULE_1%%
- %%A11_MODULE_2%%
- %%A11_MODULE_3%%
- %%A11_MODULE_LABEL_1%%
- %%A11_MODULE_LABEL_2%%
- %%A11_MODULE_LABEL_3%%
- %%A11_MODULE_NOTE%%
- %%A11_PUBLISHED%%
- %%A11_RSS_DATE%%
- %%A11_SOURCE_URL%%
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
- %%A12_BOUNDARY%%
- %%A12_CONCLUSION%%
- %%A12_COVER_ALT%%
- %%A12_COVER_CAPTION%%
- %%A12_FAQ_A_1%%
- %%A12_FAQ_A_2%%
- %%A12_FAQ_Q_1%%
- %%A12_FAQ_Q_2%%
- %%A12_FAQ_TITLE%%
- %%A12_H2_1%%
- %%A12_H2_2%%
- %%A12_H2_3%%
- %%A12_H2_4%%
- %%A12_HANDOFF_TEXT%%
- %%A12_MODIFIED%%
- %%A12_MODULE_MARK%%
- %%A12_PUBLISHED%%
- %%A12_RSS_DATE%%
- %%A12_SOURCE_URL%%
- %%A12_SUMMARY%%
- %%A12_TITLE%%
- %%ABOUT_DESC%%
- %%ABOUT_INTRO%%
- %%ABOUT_NOTE%%
- %%ABOUT_NOTE_TITLE%%
- %%ABOUT_SECTION_LABEL_1%%
- %%ABOUT_SECTION_LABEL_2%%
- %%ABOUT_SECTION_LABEL_3%%
- %%ABOUT_SECTION_LABEL_4%%
- %%ABOUT_SECTION_LABEL_5%%
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
- %%AFFILIATE_DISCLOSURE%%
- %%AFFILIATE_LABEL%%
- %%AFFILIATE_URL%%
- %%AUTHOR_NAME%%
- %%BENEFIT_DISCLAIMER%%
- %%BENEFIT_RATE%%
- %%BRAND_EN%%
- %%CHANGELOG_DESC%%
- %%CHANGELOG_INTRO%%
- %%CHANGELOG_TITLE%%
- %%CHANGE_1_DATE%%
- %%CHANGE_1_TEXT%%
- %%CHANGE_1_TITLE%%
- %%CHANGE_2_DATE%%
- %%CHANGE_2_TEXT%%
- %%CHANGE_2_TITLE%%
- %%CHANGE_3_DATE%%
- %%CHANGE_3_TEXT%%
- %%CHANGE_3_TITLE%%
- %%CHANGE_4_DATE%%
- %%CHANGE_4_TEXT%%
- %%CHANGE_4_TITLE%%
- %%CONTACT_DESC%%
- %%CONTACT_EMAIL%%
- %%CONTACT_INTRO%%
- %%CONTACT_NOTE%%
- %%CONTACT_NOTE_TITLE%%
- %%CONTACT_SECTION_LABEL_1%%
- %%CONTACT_SECTION_LABEL_2%%
- %%CONTACT_SECTION_LABEL_3%%
- %%CONTACT_SECTION_LABEL_4%%
- %%CONTACT_SECTION_LABEL_5%%
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
- %%CORRECTIONS_SECTION_LABEL_1%%
- %%CORRECTIONS_SECTION_LABEL_2%%
- %%CORRECTIONS_SECTION_LABEL_3%%
- %%CORRECTIONS_SECTION_LABEL_4%%
- %%CORRECTIONS_SECTION_LABEL_5%%
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
- %%DISCLAIMER_SECTION_LABEL_1%%
- %%DISCLAIMER_SECTION_LABEL_2%%
- %%DISCLAIMER_SECTION_LABEL_3%%
- %%DISCLAIMER_SECTION_LABEL_4%%
- %%DISCLAIMER_SECTION_LABEL_5%%
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
- %%DISCLOSURE_SECTION_LABEL_1%%
- %%DISCLOSURE_SECTION_LABEL_2%%
- %%DISCLOSURE_SECTION_LABEL_3%%
- %%DISCLOSURE_SECTION_LABEL_4%%
- %%DISCLOSURE_SECTION_LABEL_5%%
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
- %%EDITORIAL_SECTION_LABEL_1%%
- %%EDITORIAL_SECTION_LABEL_2%%
- %%EDITORIAL_SECTION_LABEL_3%%
- %%EDITORIAL_SECTION_LABEL_4%%
- %%EDITORIAL_SECTION_LABEL_5%%
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
- %%GROUP_1_DESC%%
- %%GROUP_1_INTRO%%
- %%GROUP_1_NOTE%%
- %%GROUP_1_TITLE%%
- %%GROUP_2_DESC%%
- %%GROUP_2_INTRO%%
- %%GROUP_2_NOTE%%
- %%GROUP_2_TITLE%%
- %%GROUP_3_DESC%%
- %%GROUP_3_INTRO%%
- %%GROUP_3_NOTE%%
- %%GROUP_3_TITLE%%
- %%GROUP_4_DESC%%
- %%GROUP_4_INTRO%%
- %%GROUP_4_NOTE%%
- %%GROUP_4_TITLE%%
- %%HERO_DESCRIPTION%%
- %%HOME_QUOTE%%
- %%HOME_QUOTE_SOURCE%%
- %%HOME_QUOTE_TITLE%%
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
- %%PRIVACY_SECTION_LABEL_1%%
- %%PRIVACY_SECTION_LABEL_2%%
- %%PRIVACY_SECTION_LABEL_3%%
- %%PRIVACY_SECTION_LABEL_4%%
- %%PRIVACY_SECTION_LABEL_5%%
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
- %%SITEMAP_LASTMOD%%
- %%SITE_DESC%%
- %%SITE_DOMAIN%%
- %%SITE_NAME%%
- %%SITE_TAGLINE%%
- %%TOOLS_INDEX_DESC%%
- %%TOOLS_INDEX_INTRO%%
- %%TOOLS_INDEX_NOTE%%
- %%TOOLS_INDEX_TITLE%%
- %%TOOL_1_BOUNDARY%%
- %%TOOL_1_DESC%%
- %%TOOL_1_FORMAT%%
- %%TOOL_1_GUIDE_1%%
- %%TOOL_1_GUIDE_2%%
- %%TOOL_1_GUIDE_3%%
- %%TOOL_1_GUIDE_4%%
- %%TOOL_1_GUIDE_5%%
- %%TOOL_1_INTRO%%
- %%TOOL_1_REPORT_TITLE%%
- %%TOOL_1_TITLE%%
- %%TOOL_2_BOUNDARY%%
- %%TOOL_2_DESC%%
- %%TOOL_2_FORMAT%%
- %%TOOL_2_GUIDE_1%%
- %%TOOL_2_GUIDE_2%%
- %%TOOL_2_GUIDE_3%%
- %%TOOL_2_GUIDE_4%%
- %%TOOL_2_GUIDE_5%%
- %%TOOL_2_INTRO%%
- %%TOOL_2_REPORT_TITLE%%
- %%TOOL_2_TITLE%%
- %%TOOL_3_BOUNDARY%%
- %%TOOL_3_DESC%%
- %%TOOL_3_FORMAT%%
- %%TOOL_3_GUIDE_1%%
- %%TOOL_3_GUIDE_2%%
- %%TOOL_3_GUIDE_3%%
- %%TOOL_3_GUIDE_4%%
- %%TOOL_3_GUIDE_5%%
- %%TOOL_3_INTRO%%
- %%TOOL_3_REPORT_TITLE%%
- %%TOOL_3_TITLE%%
- %%TOOL_4_BOUNDARY%%
- %%TOOL_4_DESC%%
- %%TOOL_4_FORMAT%%
- %%TOOL_4_GUIDE_1%%
- %%TOOL_4_GUIDE_2%%
- %%TOOL_4_GUIDE_3%%
- %%TOOL_4_GUIDE_4%%
- %%TOOL_4_GUIDE_5%%
- %%TOOL_4_INTRO%%
- %%TOOL_4_REPORT_TITLE%%
- %%TOOL_4_TITLE%%
- %%TOOL_5_BOUNDARY%%
- %%TOOL_5_DESC%%
- %%TOOL_5_FORMAT%%
- %%TOOL_5_GUIDE_1%%
- %%TOOL_5_GUIDE_2%%
- %%TOOL_5_GUIDE_3%%
- %%TOOL_5_GUIDE_4%%
- %%TOOL_5_GUIDE_5%%
- %%TOOL_5_INTRO%%
- %%TOOL_5_REPORT_TITLE%%
- %%TOOL_5_TITLE%%
