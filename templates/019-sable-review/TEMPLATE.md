# 019-sable-review

## 定位

高端独立评测工坊：深紫暗房、冷白展台、荧光标尺与薰衣草银构成盲测样本柜。首页以垂直评分标尺、样品轨道和非对称检视台组织内容，与新闻、电讯、地图、手册和常规卡片站完全不同。

## 后续 AI 只填文字

31 条公开页面、12 种文章结构、3 枚阅读镜片、5 件真实本地工具、7 个合规页面、12 对独立封面、社交图、SEO 头部与交互已搭好。后续 AI 只替换变量和写入经核实文字，不改路径、class、CSS、JS、导航或工具算法。

1. 首页为形态 A：明文邀请码、一键复制、弹性利益点、政策脚注，以及唯一一处策展式注册指南入口；首页不含平台转化直链。
2. `dossiers/registration-dossier.html` 是唯一 registrationGuide，也是唯一 `%AFFILIATE_URL%` 链接槽位。这里只提供内容结构、FAQ 与披露 UI，不含可发布的注册教程正文。
3. 12 篇分别采用步骤卷宗、权重评分、盲测分屏、长期日记、证据账、双项对照、失败剖面、价值收据、方法透镜、购买清单、术语量规和月度短名单。文章正文写作时保留各自结构。
4. 五件工具在浏览器本地运行：加权评分、重复评分一致性、两项成对选择、误差范围估算、单位功能成本归一化。结果只作本地辅助，不描述为实时数据、官方接口或投资建议。
5. 替换封面时保持同名 PNG/WebP、1200×630、无图中文字，并保留 preload、alt、尺寸和 fetchpriority。

## 页面角色表

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "article.html",
  "articles": [
    "dossiers/registration-dossier.html",
    "dossiers/weighted-verdict.html",
    "dossiers/blind-test-notes.html",
    "dossiers/long-term-diary.html",
    "dossiers/evidence-ledger.html",
    "dossiers/comparison-proof.html",
    "dossiers/failure-autopsy.html",
    "dossiers/value-breakdown.html",
    "dossiers/method-under-glass.html",
    "dossiers/buyer-checklist.html",
    "dossiers/terminology-rubric.html",
    "dossiers/monthly-shortlist.html"
  ],
  "cornerstones": [
    "dossiers/registration-dossier.html",
    "dossiers/weighted-verdict.html"
  ],
  "registrationGuide": "dossiers/registration-dossier.html",
  "articleCovers": {
    "dossiers/registration-dossier.html": {
      "display": "assets/covers/registration-dossier.webp",
      "og": "assets/covers/registration-dossier.png"
    },
    "dossiers/weighted-verdict.html": {
      "display": "assets/covers/weighted-verdict.webp",
      "og": "assets/covers/weighted-verdict.png"
    },
    "dossiers/blind-test-notes.html": {
      "display": "assets/covers/blind-test-notes.webp",
      "og": "assets/covers/blind-test-notes.png"
    },
    "dossiers/long-term-diary.html": {
      "display": "assets/covers/long-term-diary.webp",
      "og": "assets/covers/long-term-diary.png"
    },
    "dossiers/evidence-ledger.html": {
      "display": "assets/covers/evidence-ledger.webp",
      "og": "assets/covers/evidence-ledger.png"
    },
    "dossiers/comparison-proof.html": {
      "display": "assets/covers/comparison-proof.webp",
      "og": "assets/covers/comparison-proof.png"
    },
    "dossiers/failure-autopsy.html": {
      "display": "assets/covers/failure-autopsy.webp",
      "og": "assets/covers/failure-autopsy.png"
    },
    "dossiers/value-breakdown.html": {
      "display": "assets/covers/value-breakdown.webp",
      "og": "assets/covers/value-breakdown.png"
    },
    "dossiers/method-under-glass.html": {
      "display": "assets/covers/method-under-glass.webp",
      "og": "assets/covers/method-under-glass.png"
    },
    "dossiers/buyer-checklist.html": {
      "display": "assets/covers/buyer-checklist.webp",
      "og": "assets/covers/buyer-checklist.png"
    },
    "dossiers/terminology-rubric.html": {
      "display": "assets/covers/terminology-rubric.webp",
      "og": "assets/covers/terminology-rubric.png"
    },
    "dossiers/monthly-shortlist.html": {
      "display": "assets/covers/monthly-shortlist.webp",
      "og": "assets/covers/monthly-shortlist.png"
    }
  },
  "categories": [
    {
      "path": "lenses/access.html",
      "label": "%LENS_ACCESS_TITLE%",
      "articles": [
        "dossiers/registration-dossier.html",
        "dossiers/weighted-verdict.html",
        "dossiers/blind-test-notes.html",
        "dossiers/long-term-diary.html"
      ]
    },
    {
      "path": "lenses/evidence.html",
      "label": "%LENS_EVIDENCE_TITLE%",
      "articles": [
        "dossiers/evidence-ledger.html",
        "dossiers/comparison-proof.html",
        "dossiers/failure-autopsy.html",
        "dossiers/value-breakdown.html"
      ]
    },
    {
      "path": "lenses/decisions.html",
      "label": "%LENS_DECISIONS_TITLE%",
      "articles": [
        "dossiers/method-under-glass.html",
        "dossiers/buyer-checklist.html",
        "dossiers/terminology-rubric.html",
        "dossiers/monthly-shortlist.html"
      ]
    }
  ],
  "toolIndex": "tool.html",
  "tools": [
    "lab/weighted-score.html",
    "lab/consistency-range.html",
    "lab/pairwise-choice.html",
    "lab/margin-estimator.html",
    "lab/feature-normalizer.html"
  ],
  "legal": {
    "about": "about.html",
    "contact": "contact.html",
    "disclosure": "disclosure.html",
    "disclaimer": "legal.html",
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
    "siteDomain": "%SITE_DOMAIN%",
    "siteName": "%SITE_NAME%",
    "wordmark": "%BRAND_EN%",
    "inviteCode": "%INVITE_CODE%",
    "benefitRate": "%BENEFIT_RATE%",
    "benefitDisclaimer": "%BENEFIT_DISCLAIMER%",
    "affiliateUrl": "%AFFILIATE_URL%"
  }
}
```

## 完整验收范围

- 31 页须在桌面、390px、360px 共 93 次浏览器巡检。
- 首页复制与主题、五工具正常/错误/边界/重置/复制、唯一推广槽位属性、404、坏图、横向溢出、触控尺寸与控制台均需实测。
- 下游 AI 负责经查证的事实与文章文字，不再设计 UI、信息架构或工具逻辑。

## 完整变量清单

- `%ABOUT_BODY_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%ABOUT_BODY_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%ABOUT_BODY_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%ABOUT_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%ABOUT_H2_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%ABOUT_H2_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%ABOUT_H2_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%ABOUT_META_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%ABOUT_META_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%ABOUT_NOTE_BODY%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%ABOUT_NOTE_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%ABOUT_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%AFFILIATE_DISCLOSURE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%AFFILIATE_URL%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%ARTICLE_INDEX_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%ARTICLE_INDEX_META_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%ARTICLE_INDEX_META_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%ARTICLE_INDEX_NOTE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%ARTICLE_INDEX_NOTE_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%ARTICLE_INDEX_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%AUTHOR_NAME%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%BENEFIT_DISCLAIMER%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%BENEFIT_RATE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%BRAND_EN%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%CONTACT_BODY_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%CONTACT_BODY_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%CONTACT_BODY_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%CONTACT_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%CONTACT_EMAIL%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%CONTACT_H2_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%CONTACT_H2_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%CONTACT_H2_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%CONTACT_META_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%CONTACT_META_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%CONTACT_NOTE_BODY%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%CONTACT_NOTE_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%CONTACT_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%CORRECTIONS_BODY_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%CORRECTIONS_BODY_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%CORRECTIONS_BODY_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%CORRECTIONS_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%CORRECTIONS_H2_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%CORRECTIONS_H2_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%CORRECTIONS_H2_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%CORRECTIONS_META_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%CORRECTIONS_META_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%CORRECTIONS_NOTE_BODY%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%CORRECTIONS_NOTE_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%CORRECTIONS_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%COVER_CAPTION_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%COVER_CAPTION_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%COVER_CAPTION_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%COVER_CAPTION_04%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%COVER_CAPTION_05%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%COVER_CAPTION_06%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%COVER_CAPTION_07%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%COVER_CAPTION_08%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%COVER_CAPTION_09%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%COVER_CAPTION_10%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%COVER_CAPTION_11%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%COVER_CAPTION_12%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%CURRENT_YEAR%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DATE_MODIFIED%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DATE_PUBLISHED%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DISCLAIMER_BODY_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DISCLAIMER_BODY_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DISCLAIMER_BODY_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DISCLAIMER_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DISCLAIMER_H2_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DISCLAIMER_H2_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DISCLAIMER_H2_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DISCLAIMER_META_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DISCLAIMER_META_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DISCLAIMER_NOTE_BODY%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DISCLAIMER_NOTE_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DISCLAIMER_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DISCLOSURE_BODY_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DISCLOSURE_BODY_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DISCLOSURE_BODY_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DISCLOSURE_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DISCLOSURE_H2_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DISCLOSURE_H2_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DISCLOSURE_H2_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DISCLOSURE_META_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DISCLOSURE_META_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DISCLOSURE_NOTE_BODY%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DISCLOSURE_NOTE_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DISCLOSURE_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_01_A_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_01_A_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_01_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_01_FAQ_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_01_H2_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_01_H2_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_01_H2_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_01_META_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_01_META_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_01_P_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_01_P_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_01_P_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_01_Q_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_01_Q_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_01_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_02_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_02_H2_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_02_H2_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_02_H2_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_02_META_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_02_META_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_02_METRIC_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_02_METRIC_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_02_METRIC_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_02_P_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_02_P_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_02_P_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_02_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_02_VALUE_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_02_VALUE_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_02_VALUE_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_03_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_03_H2_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_03_H2_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_03_H2_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_03_META_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_03_META_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_03_P_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_03_P_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_03_P_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_03_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_04_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_04_H2_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_04_H2_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_04_H2_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_04_META_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_04_META_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_04_P_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_04_P_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_04_P_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_04_TIME_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_04_TIME_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_04_TIME_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_04_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_05_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_05_H2_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_05_H2_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_05_H2_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_05_LIMIT_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_05_LIMIT_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_05_LIMIT_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_05_META_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_05_META_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_05_P_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_05_P_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_05_P_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_05_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_06_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_06_H2_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_06_H2_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_06_H2_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_06_META_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_06_META_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_06_P_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_06_P_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_06_P_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_06_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_07_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_07_H2_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_07_H2_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_07_H2_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_07_META_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_07_META_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_07_P_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_07_P_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_07_P_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_07_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_08_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_08_FOOTNOTE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_08_H2_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_08_H2_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_08_H2_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_08_LINE_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_08_LINE_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_08_LINE_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_08_META_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_08_META_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_08_P_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_08_P_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_08_P_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_08_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_08_TOTAL%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_09_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_09_H2_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_09_H2_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_09_H2_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_09_META_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_09_META_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_09_P_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_09_P_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_09_P_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_09_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_10_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_10_H2_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_10_H2_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_10_H2_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_10_META_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_10_META_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_10_P_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_10_P_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_10_P_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_10_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_11_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_11_H2_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_11_H2_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_11_H2_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_11_META_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_11_META_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_11_P_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_11_P_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_11_P_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_11_TEST_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_11_TEST_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_11_TEST_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_11_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_12_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_12_H2_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_12_H2_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_12_H2_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_12_META_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_12_META_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_12_NOTE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_12_P_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_12_P_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_12_P_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%DOSSIER_12_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%EDITORIAL_BODY_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%EDITORIAL_BODY_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%EDITORIAL_BODY_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%EDITORIAL_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%EDITORIAL_H2_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%EDITORIAL_H2_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%EDITORIAL_H2_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%EDITORIAL_META_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%EDITORIAL_META_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%EDITORIAL_NOTE_BODY%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%EDITORIAL_NOTE_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%EDITORIAL_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%ENTRY_CODE_LABEL%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%ENTRY_LINK_LABEL%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%HOME_DIRECTORY_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%HOME_DIRECTORY_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%HOME_FEATURE_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%HOME_FEATURE_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%HOME_H1%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%HOME_LAB_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%HOME_LAB_LINK%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%HOME_LAB_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%HOME_LEDE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%HOME_LENSES_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%HOME_META_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%HOME_META_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%HOME_PICK_LABEL%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%HOME_PICK_NOTE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%INVITE_CODE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_01_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_01_FORM_LEGEND%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_01_GUIDE_H3_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_01_GUIDE_H3_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_01_GUIDE_H3_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_01_GUIDE_H3_04%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_01_GUIDE_H3_05%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_01_GUIDE_P_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_01_GUIDE_P_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_01_GUIDE_P_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_01_GUIDE_P_04%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_01_GUIDE_P_05%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_01_GUIDE_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_01_META_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_01_META_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_01_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_02_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_02_FORM_LEGEND%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_02_GUIDE_H3_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_02_GUIDE_H3_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_02_GUIDE_H3_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_02_GUIDE_H3_04%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_02_GUIDE_H3_05%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_02_GUIDE_P_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_02_GUIDE_P_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_02_GUIDE_P_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_02_GUIDE_P_04%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_02_GUIDE_P_05%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_02_GUIDE_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_02_META_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_02_META_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_02_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_03_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_03_FORM_LEGEND%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_03_GUIDE_H3_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_03_GUIDE_H3_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_03_GUIDE_H3_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_03_GUIDE_H3_04%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_03_GUIDE_H3_05%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_03_GUIDE_P_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_03_GUIDE_P_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_03_GUIDE_P_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_03_GUIDE_P_04%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_03_GUIDE_P_05%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_03_GUIDE_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_03_META_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_03_META_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_03_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_04_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_04_FORM_LEGEND%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_04_GUIDE_H3_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_04_GUIDE_H3_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_04_GUIDE_H3_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_04_GUIDE_H3_04%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_04_GUIDE_H3_05%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_04_GUIDE_P_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_04_GUIDE_P_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_04_GUIDE_P_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_04_GUIDE_P_04%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_04_GUIDE_P_05%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_04_GUIDE_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_04_META_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_04_META_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_04_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_05_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_05_FORM_LEGEND%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_05_GUIDE_H3_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_05_GUIDE_H3_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_05_GUIDE_H3_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_05_GUIDE_H3_04%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_05_GUIDE_H3_05%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_05_GUIDE_P_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_05_GUIDE_P_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_05_GUIDE_P_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_05_GUIDE_P_04%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_05_GUIDE_P_05%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_05_GUIDE_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_05_META_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_05_META_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LAB_05_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LANG%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LENS_ACCESS_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LENS_ACCESS_META_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LENS_ACCESS_META_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LENS_ACCESS_NOTE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LENS_ACCESS_NOTE_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LENS_ACCESS_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LENS_DECISIONS_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LENS_DECISIONS_META_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LENS_DECISIONS_META_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LENS_DECISIONS_NOTE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LENS_DECISIONS_NOTE_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LENS_DECISIONS_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LENS_EVIDENCE_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LENS_EVIDENCE_META_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LENS_EVIDENCE_META_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LENS_EVIDENCE_NOTE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LENS_EVIDENCE_NOTE_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%LENS_EVIDENCE_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%NOT_FOUND_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%NOT_FOUND_META_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%NOT_FOUND_META_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%PRIVACY_BODY_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%PRIVACY_BODY_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%PRIVACY_BODY_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%PRIVACY_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%PRIVACY_H2_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%PRIVACY_H2_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%PRIVACY_H2_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%PRIVACY_META_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%PRIVACY_META_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%PRIVACY_NOTE_BODY%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%PRIVACY_NOTE_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%PRIVACY_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%PROTOCOL_ABBR%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%PROTOCOL_ABBR_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%PROTOCOL_CELL_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%PROTOCOL_CELL_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%PROTOCOL_CITE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%PROTOCOL_COL_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%PROTOCOL_COL_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%PROTOCOL_COL_03%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%PROTOCOL_QUOTE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%PROTOCOL_REVIEW_DATE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%PROTOCOL_ROW_01%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%PROTOCOL_ROW_02%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%PROTOCOL_TABLE_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%PROTOCOL_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%RSS_DESCRIPTION%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%RSS_PUB_DATE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%RSS_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%SECURITY_EMAIL%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%SECURITY_EXPIRES%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%SITE_DOMAIN%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%SITE_NAME%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%TOOL_INDEX_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%TOOL_INDEX_META_DESC%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%TOOL_INDEX_META_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%TOOL_INDEX_NOTE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%TOOL_INDEX_NOTE_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
- `%TOOL_INDEX_TITLE%`：填写对应页面的站点信息、经核实文字、日期或界面标签。
