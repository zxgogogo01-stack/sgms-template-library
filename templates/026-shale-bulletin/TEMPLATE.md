# 026-shale-bulletin

## 定位

高端页岩发布公告板模板。大块岩层切面、纸白校样、矿物紫、警戒橙与青绿状态线构成不对称发布控制台；首页是“访问票据 + 版本层理 + 变更总档”的组合，不复用词典、清单、报刊或通用 SaaS 仪表盘外观。

## 后续 AI 只填文字

31 条公开路由、12 种文章骨架、3 本独立命名层理册、5 个真实本地发布工具、7 个独立合规页、12 对语义封面、社交图、SEO 头部、RSS、深浅主题、无障碍和响应式均已搭好。后续 AI 只替换变量并写经核实的正文，不改 UI、路径、class、CSS、JS 或工具算法。

- 首页采用形态 A：首屏显示邀请码、复制控件、弹性利益点和脚注；无外部转化直链，仅有一处编辑注记式注册内容入口。
- `dispatches/entry-pass.html` 只是注册类内容空白 UI 外壳，也是全模板唯一 `%AFFILIATE_URL%` 槽位；不含注册步骤、平台数字或教程事实。
- 十二篇分别使用访问票据、变更解剖、迁移路线、破坏性提示、兼容矩阵、回退分叉、弃用窗口、前后差异、问题账、版本时序、维护者问答和发布复盘结构。
- 五个工具完全在浏览器本地运行：语义版本先后、变更日志归组、兼容条件核对、发布风险评分、维护时间窗换算；输入不上传、不保存。
- 所有页面保留独立运营声明、站内推广披露入口与可见 RSS。

## 页面角色表

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "article.html",
  "articles": [
    "dispatches/entry-pass.html",
    "dispatches/change-anatomy.html",
    "dispatches/migration-route.html",
    "dispatches/breaking-note.html",
    "dispatches/compatibility-matrix.html",
    "dispatches/rollback-plan.html",
    "dispatches/deprecation-window.html",
    "dispatches/api-diff.html",
    "dispatches/issue-ledger.html",
    "dispatches/version-timeline.html",
    "dispatches/maintainer-interview.html",
    "dispatches/release-retrospective.html"
  ],
  "cornerstones": [
    "dispatches/entry-pass.html",
    "dispatches/change-anatomy.html"
  ],
  "registrationGuide": "dispatches/entry-pass.html",
  "articleCovers": {
    "dispatches/entry-pass.html": {
      "display": "assets/covers/entry-pass.webp",
      "og": "assets/covers/entry-pass.png"
    },
    "dispatches/change-anatomy.html": {
      "display": "assets/covers/change-anatomy.webp",
      "og": "assets/covers/change-anatomy.png"
    },
    "dispatches/migration-route.html": {
      "display": "assets/covers/migration-route.webp",
      "og": "assets/covers/migration-route.png"
    },
    "dispatches/breaking-note.html": {
      "display": "assets/covers/breaking-note.webp",
      "og": "assets/covers/breaking-note.png"
    },
    "dispatches/compatibility-matrix.html": {
      "display": "assets/covers/compatibility-matrix.webp",
      "og": "assets/covers/compatibility-matrix.png"
    },
    "dispatches/rollback-plan.html": {
      "display": "assets/covers/rollback-plan.webp",
      "og": "assets/covers/rollback-plan.png"
    },
    "dispatches/deprecation-window.html": {
      "display": "assets/covers/deprecation-window.webp",
      "og": "assets/covers/deprecation-window.png"
    },
    "dispatches/api-diff.html": {
      "display": "assets/covers/api-diff.webp",
      "og": "assets/covers/api-diff.png"
    },
    "dispatches/issue-ledger.html": {
      "display": "assets/covers/issue-ledger.webp",
      "og": "assets/covers/issue-ledger.png"
    },
    "dispatches/version-timeline.html": {
      "display": "assets/covers/version-timeline.webp",
      "og": "assets/covers/version-timeline.png"
    },
    "dispatches/maintainer-interview.html": {
      "display": "assets/covers/maintainer-interview.webp",
      "og": "assets/covers/maintainer-interview.png"
    },
    "dispatches/release-retrospective.html": {
      "display": "assets/covers/release-retrospective.webp",
      "og": "assets/covers/release-retrospective.png"
    }
  },
  "categories": [
    {
      "path": "registers/current-stratum.html",
      "label": "%REGISTER_01_TITLE%",
      "articles": [
        "dispatches/entry-pass.html",
        "dispatches/change-anatomy.html",
        "dispatches/migration-route.html",
        "dispatches/breaking-note.html"
      ]
    },
    {
      "path": "registers/fault-line.html",
      "label": "%REGISTER_02_TITLE%",
      "articles": [
        "dispatches/compatibility-matrix.html",
        "dispatches/rollback-plan.html",
        "dispatches/deprecation-window.html",
        "dispatches/api-diff.html"
      ]
    },
    {
      "path": "registers/archive-core.html",
      "label": "%REGISTER_03_TITLE%",
      "articles": [
        "dispatches/issue-ledger.html",
        "dispatches/version-timeline.html",
        "dispatches/maintainer-interview.html",
        "dispatches/release-retrospective.html"
      ]
    }
  ],
  "toolIndex": "tool.html",
  "tools": [
    "instruments/semver-order.html",
    "instruments/changelog-sorter.html",
    "instruments/compatibility-check.html",
    "instruments/release-risk.html",
    "instruments/maintenance-window.html"
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

- 31 条路由在桌面、390px、360px共 93 次浏览器巡检。
- 实测首页邀请码复制、主题、目录、文章筛选、五工具正常/错误/边界/重置/复制、唯一推广槽位属性、404、图片、溢出、触控和控制台。
- 下游 AI 仅负责站点变量、经查证的文字与文章内容，不再设计页面、补组件或生成通用视觉资产。

## 完整变量清单

- `%ABOUT_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_BODY_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_H2_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_H2_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_H2_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_NOTE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_NOTE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_SIDENOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_UPDATED%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%AFFILIATE_DISCLOSURE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%AFFILIATE_URL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_AFFILIATE_CTA%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_CAPTION%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_CLOSE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_CLOSE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_COVER_ALT%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_DATE_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_STEP_01_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_STEP_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_STEP_02_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_STEP_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_STEP_03_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_STEP_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_CAPTION%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_COVER_ALT%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_DATE_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_PART_01_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_PART_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_PART_02_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_PART_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_PART_03_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_PART_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_PART_04_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_PART_04_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_RSS_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_RSS_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_CAPTION%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_CLOSE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_CLOSE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_COVER_ALT%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_DATE_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_ROUTE_01_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_ROUTE_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_ROUTE_02_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_ROUTE_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_ROUTE_03_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_ROUTE_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_ROUTE_04_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_ROUTE_04_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_RSS_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_RSS_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_ACTION_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_ACTION_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_CAPTION%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_COVER_ALT%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_DATE_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_FALLBACK_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_FALLBACK_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_IMPACT_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_IMPACT_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_QUOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_RSS_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_RSS_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_CAPTION%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_COVER_ALT%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_DATE_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_ROW_01_A%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_ROW_01_B%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_ROW_01_C%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_ROW_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_ROW_02_A%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_ROW_02_B%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_ROW_02_C%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_ROW_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_ROW_03_A%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_ROW_03_B%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_ROW_03_C%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_ROW_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_RSS_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_RSS_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_TABLE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_TH_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_TH_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_TH_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_TH_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_ASIDE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_CAPTION%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_COVER_ALT%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_DATE_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_FORK_01_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_FORK_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_FORK_02_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_FORK_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_FORK_03_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_FORK_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_RSS_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_RSS_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_CAPTION%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_COVER_ALT%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_DATE_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_PHASE_01_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_PHASE_01_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_PHASE_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_PHASE_02_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_PHASE_02_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_PHASE_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_PHASE_03_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_PHASE_03_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_PHASE_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_RSS_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_RSS_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_AFTER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_BEFORE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_CAPTION%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_CHANGE_01_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_CHANGE_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_CHANGE_02_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_CHANGE_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_COVER_ALT%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_DATE_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_RSS_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_RSS_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_CAPTION%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_COVER_ALT%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_DATE_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_ISSUE_01_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_ISSUE_01_STATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_ISSUE_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_ISSUE_02_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_ISSUE_02_STATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_ISSUE_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_ISSUE_03_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_ISSUE_03_STATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_ISSUE_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_ISSUE_04_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_ISSUE_04_STATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_ISSUE_04_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_RSS_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_RSS_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_CAPTION%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_COVER_ALT%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_DATE_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_RSS_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_RSS_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_STAGE_01_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_STAGE_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_STAGE_02_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_STAGE_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_STAGE_03_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_STAGE_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_STAGE_04_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_STAGE_04_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_TIME_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_TIME_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_TIME_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_TIME_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_ANSWER_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_ANSWER_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_ANSWER_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_CAPTION%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_COVER_ALT%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_DATE_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_QUESTION_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_QUESTION_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_QUESTION_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_CAPTION%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_CHANGE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_CHANGE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_COVER_ALT%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_DATE_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_KEEP_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_KEEP_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_SIGNOFF%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_WATCH_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_WATCH_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_INDEX_EMPTY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_INDEX_INTRO%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_INDEX_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_INDEX_META_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_INDEX_SEARCH_HINT%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_INDEX_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%AUTHOR_NAME%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%BENEFIT_DISCLAIMER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%BENEFIT_RATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%BRAND_EN%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_BODY_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_H2_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_H2_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_H2_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_NOTE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_NOTE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_SIDENOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_UPDATED%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COPY_FALLBACK%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COPY_SUCCESS%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_BODY_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_H2_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_H2_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_H2_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_NOTE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_NOTE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_SIDENOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_UPDATED%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_BODY_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_H2_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_H2_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_H2_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_NOTE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_NOTE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_SIDENOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_UPDATED%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_BODY_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_H2_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_H2_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_H2_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_NOTE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_NOTE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_SIDENOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_UPDATED%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_BODY_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_H2_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_H2_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_H2_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_NOTE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_NOTE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_SIDENOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_UPDATED%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_ACCESS_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_GUIDE_TEASER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_INTRO%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_LAYERS_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_LAYERS_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_META_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_REFERENCE_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_REFERENCE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_REGISTER_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_REGISTER_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_TITLE_LINE_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_TITLE_LINE_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_TOOLS_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%INVITE_CODE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%LANG%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%NOT_FOUND_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%NOT_FOUND_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%NOT_FOUND_META_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%NOT_FOUND_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_BODY_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_H2_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_H2_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_H2_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_NOTE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_NOTE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_SIDENOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_UPDATED%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%REGISTER_01_ENTRY_01_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%REGISTER_01_ENTRY_02_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%REGISTER_01_ENTRY_03_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%REGISTER_01_ENTRY_04_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%REGISTER_01_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%REGISTER_01_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%REGISTER_01_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%REGISTER_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%REGISTER_02_ENTRY_01_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%REGISTER_02_ENTRY_02_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%REGISTER_02_ENTRY_03_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%REGISTER_02_ENTRY_04_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%REGISTER_02_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%REGISTER_02_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%REGISTER_02_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%REGISTER_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%REGISTER_03_ENTRY_01_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%REGISTER_03_ENTRY_02_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%REGISTER_03_ENTRY_03_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%REGISTER_03_ENTRY_04_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%REGISTER_03_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%REGISTER_03_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%REGISTER_03_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%REGISTER_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RSS_BUILD_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RSS_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RSS_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SECURITY_EMAIL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SECURITY_EXPIRES%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SECURITY_LANGS%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITEMAP_LASTMOD%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITE_DOMAIN%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITE_EDITION%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITE_NAME%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_FIELD_01_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_FIELD_02_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_05%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_FIELD_01_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_FIELD_02_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_05%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_OPTION_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_OPTION_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_FIELD_01_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_FIELD_02_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_05%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_FIELDSET_LEGEND%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_FIELD_02_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_05%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_RISK_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_RISK_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_RISK_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_RISK_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_FIELD_01_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_FIELD_02_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_FIELD_03_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_05%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_CHANGELOG_EMPTY_ERROR%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_COPY_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_GENERIC_ERROR%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_GUIDE_H3_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_GUIDE_H3_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_GUIDE_H3_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_GUIDE_H3_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_GUIDE_H3_05%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_GUIDE_SUMMARY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_INDEX_INTRO%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_INDEX_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_INDEX_META_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_INDEX_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_LIST_EMPTY_ERROR%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_LIST_FORMAT_ERROR%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_LOCAL_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_LOCAL_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_RESET_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_RESULT_EMPTY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_RESULT_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_RISK_GRADE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_RISK_HIGH%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_RISK_LOW%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_RISK_MEDIUM%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_RISK_RANGE_ERROR%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_RISK_SCORE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_RUN_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_VERSION_ERROR%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_WINDOW_DATE_ERROR%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_WINDOW_FULL_END%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_WINDOW_RANGE_ERROR%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_WINDOW_START%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_WINDOW_TOTAL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_WINDOW_WORK_END%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
