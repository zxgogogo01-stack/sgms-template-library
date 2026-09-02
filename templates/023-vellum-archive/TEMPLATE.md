# 023-vellum-archive

## 定位

高端文献档案馆模板。视觉以羊皮纸留白、酒红书脊、档案蓝索引、烫金页码和不对称卷宗构图为核心；桌面采用固定书脊导航与展开书页，移动端折叠为横向馆藏索引，与课程工坊、报刊和仪表台模板保持实质差异。

## 后续 AI 只填文字

31 条公开路由、12 种卷宗文章骨架、3 间馆藏室、5 件真实本地档案工具、7 个独立合规页、12 对独立封面、社交图、SEO 头部、RSS 与响应式交互均已完成。后续 AI 只替换变量并写入经核实的文字，不改路径、class、CSS、JS、工具算法或页面结构。

1. 首页为形态 A：首屏显示邀请码、复制控件、弹性利益点和政策脚注；无外部转化直链，仅有一处编辑推荐式内容入口。
2. `records/accession-note.html` 只是注册类内容的空白卷宗外壳，也是唯一 `%AFFILIATE_URL%` 槽位；模板不代写注册教程或平台事实。
3. 十二篇分别采用封蜡入藏笺、来源链、版本双联、时间轴、脚注札、扫描检查、页边注、田野日志、政策拼页、口述转录、术语卷和研究卷宗十二种结构。
4. 五件工具完全在浏览器本地运行：馆藏编号、引用卡、日期间隔、版本指纹和阅读优先级。工具不联网，不保存输入，也不代替事实核验。
5. 封面保持同名 PNG/WebP、1200×630、无图中文字，并保留预加载、alt、尺寸与高优先级标记；页脚保留真人可见 RSS 入口。

## 页面角色表

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "article.html",
  "articles": [
    "records/accession-note.html",
    "records/source-chain.html",
    "records/version-compare.html",
    "records/date-triad.html",
    "records/citation-return.html",
    "records/scan-quality.html",
    "records/context-margin.html",
    "records/field-note.html",
    "records/policy-variant.html",
    "records/oral-history.html",
    "records/archive-glossary.html",
    "records/research-dossier.html"
  ],
  "cornerstones": [
    "records/accession-note.html",
    "records/source-chain.html"
  ],
  "registrationGuide": "records/accession-note.html",
  "articleCovers": {
    "records/accession-note.html": {
      "display": "assets/covers/accession-note.webp",
      "og": "assets/covers/accession-note.png"
    },
    "records/source-chain.html": {
      "display": "assets/covers/source-chain.webp",
      "og": "assets/covers/source-chain.png"
    },
    "records/version-compare.html": {
      "display": "assets/covers/version-compare.webp",
      "og": "assets/covers/version-compare.png"
    },
    "records/date-triad.html": {
      "display": "assets/covers/date-triad.webp",
      "og": "assets/covers/date-triad.png"
    },
    "records/citation-return.html": {
      "display": "assets/covers/citation-return.webp",
      "og": "assets/covers/citation-return.png"
    },
    "records/scan-quality.html": {
      "display": "assets/covers/scan-quality.webp",
      "og": "assets/covers/scan-quality.png"
    },
    "records/context-margin.html": {
      "display": "assets/covers/context-margin.webp",
      "og": "assets/covers/context-margin.png"
    },
    "records/field-note.html": {
      "display": "assets/covers/field-note.webp",
      "og": "assets/covers/field-note.png"
    },
    "records/policy-variant.html": {
      "display": "assets/covers/policy-variant.webp",
      "og": "assets/covers/policy-variant.png"
    },
    "records/oral-history.html": {
      "display": "assets/covers/oral-history.webp",
      "og": "assets/covers/oral-history.png"
    },
    "records/archive-glossary.html": {
      "display": "assets/covers/archive-glossary.webp",
      "og": "assets/covers/archive-glossary.png"
    },
    "records/research-dossier.html": {
      "display": "assets/covers/research-dossier.webp",
      "og": "assets/covers/research-dossier.png"
    }
  },
  "categories": [
    {
      "path": "collections/provenance-room.html",
      "label": "%COLLECTION_01_TITLE%",
      "articles": [
        "records/accession-note.html",
        "records/source-chain.html",
        "records/version-compare.html",
        "records/date-triad.html"
      ]
    },
    {
      "path": "collections/context-room.html",
      "label": "%COLLECTION_02_TITLE%",
      "articles": [
        "records/citation-return.html",
        "records/scan-quality.html",
        "records/context-margin.html",
        "records/field-note.html"
      ]
    },
    {
      "path": "collections/interpretation-room.html",
      "label": "%COLLECTION_03_TITLE%",
      "articles": [
        "records/policy-variant.html",
        "records/oral-history.html",
        "records/archive-glossary.html",
        "records/research-dossier.html"
      ]
    }
  ],
  "toolIndex": "tool.html",
  "tools": [
    "instruments/accession-id.html",
    "instruments/citation-card.html",
    "instruments/date-gap.html",
    "instruments/version-fingerprint.html",
    "instruments/reading-priority.html"
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

## 验收范围

- 31 条路由需在桌面、390px、360px共 93 次浏览器巡检。
- 实测首页复制与主题、目录筛选、五工具正常/错误/边界/重置/复制、唯一推广槽位属性、404、图片、溢出、触控和控制台。
- 下游 AI 仅负责文字与事实核验，不再设计 UI、补组件、编写工具逻辑或生成通用视觉资产。

## 完整变量清单

- `%ABOUT_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_H2_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_H2_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_META_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_NOTE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_NOTE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_SIDENOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%AFFILIATE_DISCLOSURE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%AFFILIATE_URL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARCHIVE_MAP_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARCHIVE_STATUS%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_INDEX_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_INDEX_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_INDEX_META_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_INDEX_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%AUTHOR_BIO%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%AUTHOR_NAME%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%BENEFIT_DISCLAIMER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%BENEFIT_RATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%BRAND_EN%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CALCULATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CATALOG_CARD_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CATALOG_FIELD_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CATALOG_FIELD_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CATALOG_FIELD_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_01_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_01_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_01_META_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_01_NOTE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_01_NOTE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_01_SHELF_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_01_SHELF_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_02_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_02_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_02_META_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_02_NOTE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_02_NOTE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_02_SHELF_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_02_SHELF_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_03_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_03_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_03_META_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_03_NOTE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_03_NOTE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_03_SHELF_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_03_SHELF_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_NAV_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_EMAIL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_H2_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_H2_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_META_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_NOTE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_NOTE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_SIDENOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COPY_CODE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COPY_FAILURE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COPY_RESULT%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COPY_SUCCESS%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_H2_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_H2_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_META_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_NOTE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_NOTE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_SIDENOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COVER_ALT_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COVER_ALT_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COVER_ALT_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COVER_ALT_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COVER_ALT_05%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COVER_ALT_06%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COVER_ALT_07%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COVER_ALT_08%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COVER_ALT_09%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COVER_ALT_10%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COVER_ALT_11%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COVER_ALT_12%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COVER_CAPTION_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COVER_CAPTION_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COVER_CAPTION_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COVER_CAPTION_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COVER_CAPTION_05%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COVER_CAPTION_06%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COVER_CAPTION_07%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COVER_CAPTION_08%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COVER_CAPTION_09%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COVER_CAPTION_10%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COVER_CAPTION_11%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COVER_CAPTION_12%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CURRENT_YEAR%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DATE_MODIFIED%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_H2_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_H2_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_META_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_NOTE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_NOTE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_SIDENOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_H2_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_H2_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_LINK%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_META_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_NOTE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_NOTE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_SIDENOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITION_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_H2_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_H2_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_META_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_NOTE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_NOTE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_SIDENOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ERROR_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ERROR_HOME%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ERROR_LINKS_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ERROR_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ERROR_META_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ERROR_RANGE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ERROR_RECORDS%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ERROR_REQUIRED%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ERROR_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ERROR_TOOLS%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%FILTER_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%FILTER_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%FILTER_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%FILTER_ALL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%FILTER_STATUS_ALL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%FILTER_STATUS_PREFIX%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%FILTER_STATUS_SUFFIX%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_COLLECTIONS_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_COLLECTIONS_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_DECK%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_EDITORIAL_ENTRY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_EDITORIAL_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_H1_LINE_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_H1_LINE_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_META_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_REGISTER_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_REGISTER_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_TOOL_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_TOOL_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%INVITE_CODE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%INVITE_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%INVITE_PANEL_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%LANG%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%LOCAL_NOTE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%LOCAL_NOTE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%MAP_COLLECTIONS_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%MAP_POLICIES_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%MAP_RECORDS_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%MAP_TOOLS_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%NAV_ABOUT%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%NAV_COLLECTIONS%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%NAV_HOME%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%NAV_INSTRUMENTS%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%NAV_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%NAV_RECORDS%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_H2_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_H2_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_META_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_NOTE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_NOTE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_SIDENOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_01_ACCESS_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_01_ACCESS_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_01_ACCESS_LINK%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_01_ACCESS_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_01_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_01_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_01_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_01_CATALOG_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_01_CATALOG_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_01_CATALOG_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_01_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_01_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_01_FAQ_A1%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_01_FAQ_A2%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_01_FAQ_Q1%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_01_FAQ_Q2%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_01_FAQ_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_01_FEED_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_01_FEED_SUMMARY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_01_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_01_H2_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_01_H2_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_01_LEDE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_01_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_01_STATUS%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_01_TOC_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_01_TYPE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_02_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_02_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_02_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_02_CATALOG_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_02_CATALOG_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_02_CATALOG_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_02_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_02_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_02_FAQ_A1%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_02_FAQ_A2%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_02_FAQ_Q1%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_02_FAQ_Q2%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_02_FAQ_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_02_FEED_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_02_FEED_SUMMARY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_02_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_02_H2_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_02_H2_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_02_LEDE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_02_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_02_STATUS%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_02_TOC_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_02_TYPE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_03_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_03_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_03_CATALOG_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_03_CATALOG_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_03_CATALOG_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_03_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_03_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_03_FAQ_A1%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_03_FAQ_A2%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_03_FAQ_Q1%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_03_FAQ_Q2%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_03_FAQ_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_03_FEED_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_03_FEED_SUMMARY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_03_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_03_H2_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_03_H2_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_03_LEDE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_03_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_03_PANEL_01_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_03_PANEL_02_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_03_STATUS%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_03_TABLE_A1%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_03_TABLE_A2%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_03_TABLE_B1%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_03_TABLE_B2%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_03_TABLE_H1%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_03_TABLE_H2%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_03_TOC_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_03_TYPE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_04_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_04_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_04_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_04_CATALOG_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_04_CATALOG_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_04_CATALOG_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_04_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_04_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_04_FAQ_A1%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_04_FAQ_A2%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_04_FAQ_Q1%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_04_FAQ_Q2%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_04_FAQ_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_04_FEED_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_04_FEED_SUMMARY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_04_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_04_H2_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_04_H2_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_04_LEDE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_04_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_04_STATUS%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_04_TIME_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_04_TIME_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_04_TIME_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_04_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_04_TOC_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_04_TYPE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_05_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_05_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_05_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_05_CATALOG_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_05_CATALOG_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_05_CATALOG_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_05_CITATION_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_05_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_05_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_05_FAQ_A1%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_05_FAQ_A2%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_05_FAQ_Q1%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_05_FAQ_Q2%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_05_FAQ_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_05_FEED_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_05_FEED_SUMMARY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_05_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_05_H2_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_05_H2_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_05_LEDE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_05_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_05_QUOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_05_STATUS%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_05_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_05_TOC_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_05_TYPE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_06_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_06_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_06_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_06_CATALOG_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_06_CATALOG_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_06_CATALOG_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_06_CHECK_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_06_CHECK_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_06_CHECK_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_06_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_06_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_06_FAQ_A1%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_06_FAQ_A2%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_06_FAQ_Q1%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_06_FAQ_Q2%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_06_FAQ_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_06_FEED_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_06_FEED_SUMMARY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_06_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_06_H2_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_06_H2_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_06_LEDE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_06_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_06_SCORE_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_06_SCORE_VALUE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_06_STATUS%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_06_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_06_TOC_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_06_TYPE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_07_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_07_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_07_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_07_CATALOG_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_07_CATALOG_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_07_CATALOG_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_07_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_07_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_07_FAQ_A1%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_07_FAQ_A2%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_07_FAQ_Q1%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_07_FAQ_Q2%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_07_FAQ_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_07_FEED_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_07_FEED_SUMMARY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_07_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_07_H2_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_07_H2_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_07_LEDE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_07_MARGIN_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_07_MARGIN_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_07_MARGIN_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_07_MARGIN_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_07_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_07_STATUS%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_07_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_07_TOC_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_07_TYPE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_08_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_08_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_08_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_08_CATALOG_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_08_CATALOG_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_08_CATALOG_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_08_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_08_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_08_FAQ_A1%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_08_FAQ_A2%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_08_FAQ_Q1%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_08_FAQ_Q2%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_08_FAQ_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_08_FEED_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_08_FEED_SUMMARY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_08_FIELD_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_08_FIELD_VALUE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_08_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_08_H2_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_08_H2_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_08_LEDE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_08_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_08_STATUS%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_08_TERM_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_08_TERM_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_08_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_08_TOC_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_08_TYPE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_08_VALUE_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_08_VALUE_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_09_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_09_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_09_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_09_CATALOG_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_09_CATALOG_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_09_CATALOG_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_09_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_09_DELETE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_09_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_09_FAQ_A1%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_09_FAQ_A2%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_09_FAQ_Q1%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_09_FAQ_Q2%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_09_FAQ_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_09_FEED_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_09_FEED_SUMMARY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_09_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_09_H2_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_09_H2_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_09_INSERT%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_09_LEDE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_09_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_09_STATUS%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_09_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_09_TOC_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_09_TYPE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_10_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_10_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_10_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_10_CATALOG_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_10_CATALOG_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_10_CATALOG_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_10_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_10_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_10_FAQ_A1%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_10_FAQ_A2%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_10_FAQ_Q1%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_10_FAQ_Q2%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_10_FAQ_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_10_FEED_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_10_FEED_SUMMARY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_10_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_10_H2_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_10_H2_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_10_LEDE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_10_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_10_NOTE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_10_SPEAKER_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_10_SPEAKER_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_10_STATUS%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_10_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_10_TOC_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_10_TYPE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_11_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_11_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_11_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_11_CATALOG_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_11_CATALOG_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_11_CATALOG_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_11_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_11_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_11_FAQ_A1%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_11_FAQ_A2%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_11_FAQ_Q1%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_11_FAQ_Q2%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_11_FAQ_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_11_FEED_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_11_FEED_SUMMARY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_11_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_11_H2_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_11_H2_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_11_LEDE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_11_LEXICON_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_11_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_11_STATUS%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_11_TERM_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_11_TERM_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_11_TERM_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_11_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_11_TOC_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_11_TYPE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_12_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_12_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_12_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_12_CATALOG_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_12_CATALOG_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_12_CATALOG_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_12_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_12_DECISION_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_12_DECISION_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_12_DECISION_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_12_DECISION_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_12_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_12_FAQ_A1%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_12_FAQ_A2%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_12_FAQ_Q1%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_12_FAQ_Q2%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_12_FAQ_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_12_FEED_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_12_FEED_SUMMARY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_12_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_12_H2_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_12_H2_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_12_LEDE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_12_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_12_STATUS%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_12_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_12_TOC_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_12_TYPE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_AUTHOR_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_DATE_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RECORD_STATUS_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%REGISTER_FILTER_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%REGISTER_TABLE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RELATED_INSTRUMENTS%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RELATED_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RELATED_METHOD%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RELATED_REGISTER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RESET%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RESULT_ERROR%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RESULT_IDLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RESULT_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RSS_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RSS_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RSS_VISIBLE_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SECURITY_EMAIL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SECURITY_EXPIRES%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SECURITY_LANGS%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITEMAP_LASTMOD%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITE_DOMAIN%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITE_NAME%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SKIP_LINK%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%THEME_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_ERROR_CODE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_ERROR_OVERFLOW%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_FIELD_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_FIELD_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_FIELD_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_FIELD_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_FIELD_05%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_BODY_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_BODY_05%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_H3_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_H3_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_H3_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_H3_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_H3_05%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_LIMITS_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_LIMITS_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_TYPE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_ERROR_URL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_FIELD_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_FIELD_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_FIELD_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_FIELD_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_FIELD_05%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_BODY_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_BODY_05%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_H3_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_H3_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_H3_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_H3_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_H3_05%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_LIMITS_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_LIMITS_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_STYLE_CATALOG%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_STYLE_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_TYPE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_ERROR_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_ERROR_ORDER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_FIELD_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_FIELD_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_FIELD_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_BODY_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_BODY_05%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_H3_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_H3_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_H3_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_H3_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_H3_05%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_LIMITS_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_LIMITS_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_RESULT_EVENT_PUBLISH%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_RESULT_PUBLISH_VERIFY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_RESULT_TOTAL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_TYPE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_ERROR_LENGTH%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_FIELD_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_FIELD_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_BODY_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_BODY_05%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_H3_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_H3_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_H3_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_H3_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_H3_05%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_LIMITS_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_LIMITS_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_MODE_EXACT%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_MODE_NORMALIZED%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_RESULT_CHARS%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_RESULT_HASH%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_RESULT_LINES%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_RESULT_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_TYPE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_BAND_HIGH%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_BAND_LOW%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_BAND_MIDDLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_FIELD_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_FIELD_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_FIELD_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_FIELD_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_BODY_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_BODY_05%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_H3_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_H3_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_H3_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_H3_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_H3_05%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_LIMITS_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_LIMITS_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_RESULT_BAND%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_RESULT_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_RESULT_SCORE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_TYPE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_INDEX_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_INDEX_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_INDEX_META_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_INDEX_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_INPUT_LEGEND%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%VIEW_ALL_RECORDS%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%VIEW_FULL_REGISTER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
