# 024-breeze-checklist

## 定位

高端清风安全控制台模板。视觉以冰薄荷底色、深海蓝指挥舱、珊瑚进度环、流线型信号条和分层检查卡为核心；首页是带十二项本地状态的分屏控制台，文章页按十二种安全协议结构展开，区别于文献档案馆、课程工坊与报刊式模板。

## 后续 AI 只填文字

31 条公开路由、12 种文章骨架、3 个阶段清单、5 个真实本地检查工具、7 个独立合规页、12 对独立封面、社交图、SEO 头部、RSS、主题和响应式交互均已完成。后续 AI 只替换变量并写入经核实的文字，不改路径、class、CSS、JS、工具算法或页面结构。

1. 首页为形态 A：首屏显示邀请码、复制控件、弹性利益点与脚注；无外部转化直链，仅有一处编辑式注册内容入口。
2. `protocols/access-check.html` 只是注册类内容的空白 UI 外壳，也是唯一 `%AFFILIATE_URL%` 槽位；模板不包含注册教程、平台流程或未经核实事实。
3. 十二篇采用通行门、威胁雷达、起飞序列、恢复路线、设备层、权限矩阵、证据夹、事件时钟、协作接力、异常分诊、术语板和复核简报十二种独立结构。
4. 五个工具完全在浏览器本地运行：随机抽样、口令空间估算、权限风险评分、恢复就绪评分与事件时间窗。输入不联网、不保存，结果仅供自查。
5. 所有内容页保留独立封面、逐页 SEO/Schema、RSS、完整站内导航、独立运营与推广披露入口。

## 页面角色表

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "article.html",
  "articles": [
    "protocols/access-check.html",
    "protocols/threat-model.html",
    "protocols/preflight-sequence.html",
    "protocols/recovery-path.html",
    "protocols/device-hygiene.html",
    "protocols/permission-audit.html",
    "protocols/identity-proof.html",
    "protocols/incident-window.html",
    "protocols/team-handoff.html",
    "protocols/anomaly-triage.html",
    "protocols/glossary-board.html",
    "protocols/review-brief.html"
  ],
  "cornerstones": [
    "protocols/access-check.html",
    "protocols/threat-model.html"
  ],
  "registrationGuide": "protocols/access-check.html",
  "articleCovers": {
    "protocols/access-check.html": {
      "display": "assets/covers/access-check.webp",
      "og": "assets/covers/access-check.png"
    },
    "protocols/threat-model.html": {
      "display": "assets/covers/threat-model.webp",
      "og": "assets/covers/threat-model.png"
    },
    "protocols/preflight-sequence.html": {
      "display": "assets/covers/preflight-sequence.webp",
      "og": "assets/covers/preflight-sequence.png"
    },
    "protocols/recovery-path.html": {
      "display": "assets/covers/recovery-path.webp",
      "og": "assets/covers/recovery-path.png"
    },
    "protocols/device-hygiene.html": {
      "display": "assets/covers/device-hygiene.webp",
      "og": "assets/covers/device-hygiene.png"
    },
    "protocols/permission-audit.html": {
      "display": "assets/covers/permission-audit.webp",
      "og": "assets/covers/permission-audit.png"
    },
    "protocols/identity-proof.html": {
      "display": "assets/covers/identity-proof.webp",
      "og": "assets/covers/identity-proof.png"
    },
    "protocols/incident-window.html": {
      "display": "assets/covers/incident-window.webp",
      "og": "assets/covers/incident-window.png"
    },
    "protocols/team-handoff.html": {
      "display": "assets/covers/team-handoff.webp",
      "og": "assets/covers/team-handoff.png"
    },
    "protocols/anomaly-triage.html": {
      "display": "assets/covers/anomaly-triage.webp",
      "og": "assets/covers/anomaly-triage.png"
    },
    "protocols/glossary-board.html": {
      "display": "assets/covers/glossary-board.webp",
      "og": "assets/covers/glossary-board.png"
    },
    "protocols/review-brief.html": {
      "display": "assets/covers/review-brief.webp",
      "og": "assets/covers/review-brief.png"
    }
  },
  "categories": [
    {
      "path": "checklists/before-action.html",
      "label": "%CHECKLIST_01_TITLE%",
      "articles": [
        "protocols/access-check.html",
        "protocols/threat-model.html",
        "protocols/preflight-sequence.html",
        "protocols/recovery-path.html"
      ]
    },
    {
      "path": "checklists/while-active.html",
      "label": "%CHECKLIST_02_TITLE%",
      "articles": [
        "protocols/device-hygiene.html",
        "protocols/permission-audit.html",
        "protocols/identity-proof.html",
        "protocols/incident-window.html"
      ]
    },
    {
      "path": "checklists/after-event.html",
      "label": "%CHECKLIST_03_TITLE%",
      "articles": [
        "protocols/team-handoff.html",
        "protocols/anomaly-triage.html",
        "protocols/glossary-board.html",
        "protocols/review-brief.html"
      ]
    }
  ],
  "toolIndex": "tool.html",
  "tools": [
    "checks/sample-picker.html",
    "checks/passphrase-meter.html",
    "checks/permission-score.html",
    "checks/recovery-readiness.html",
    "checks/incident-window.html"
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
- 实测首页清单、总进度、重置、邀请码复制、主题、文章筛选、五工具正常/错误/边界/重置/复制、唯一推广槽位属性、404、图片、溢出、触控和控制台。
- 下游 AI 仅负责文字与事实核验，不再设计 UI、补组件、编写工具逻辑或生成通用视觉资产。

## 完整变量清单

- `%ABOUT_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_BODY_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_H2_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_H2_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_H2_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_LINK%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_META_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_NOTE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_NOTE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_SIDENOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_UPDATED%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%AFFILIATE_DISCLOSURE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%AFFILIATE_URL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_ACCESS_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_ACCESS_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_AFFILIATE_CTA%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_CAPTION%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_CLOSE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_CLOSE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_GATE_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_INTRO%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_RSS_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_STEP_01_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_STEP_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_STEP_02_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_STEP_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_STEP_03_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_STEP_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_CAPTION%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_CLOSE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_CLOSE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_POINT_01_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_POINT_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_POINT_02_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_POINT_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_POINT_03_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_POINT_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_RADAR_CENTER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_RSS_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_ASIDE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_ASIDE_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_ASIDE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_CAPTION%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_CLOSE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_CLOSE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_RSS_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_STEP_01_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_STEP_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_STEP_02_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_STEP_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_STEP_03_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_STEP_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_STEP_04_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_STEP_04_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_CAPTION%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_CLOSE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_CLOSE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_QUOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_ROUTE_01_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_ROUTE_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_ROUTE_02_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_ROUTE_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_ROUTE_03_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_ROUTE_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_RSS_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_04_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_CAPTION%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_CLOSE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_CLOSE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_LAYER_01_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_LAYER_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_LAYER_02_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_LAYER_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_LAYER_03_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_LAYER_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_RSS_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_05_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_CAPTION%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_CELL_01_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_CELL_01_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_CELL_01_STATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_CELL_02_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_CELL_02_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_CELL_02_STATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_CELL_03_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_CELL_03_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_CELL_03_STATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_CELL_04_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_CELL_04_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_CELL_04_STATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_CLOSE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_CLOSE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_RSS_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_TABLE_ARIA%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_06_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_ASIDE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_ASIDE_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_ASIDE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_CAPTION%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_CLOSE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_CLOSE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_EVIDENCE_01_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_EVIDENCE_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_EVIDENCE_02_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_EVIDENCE_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_EVIDENCE_03_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_EVIDENCE_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_RSS_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_07_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_CAPTION%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_CLOSE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_CLOSE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_RSS_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_WINDOW_01_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_WINDOW_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_WINDOW_02_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_WINDOW_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_WINDOW_03_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_08_WINDOW_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_CAPTION%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_CLOSE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_CLOSE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_HANDOFF_LINE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_ROLE_01_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_ROLE_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_ROLE_02_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_ROLE_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_ROLE_03_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_ROLE_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_RSS_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_09_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_CAPTION%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_CLOSE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_CLOSE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_LEVEL_01_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_LEVEL_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_LEVEL_02_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_LEVEL_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_LEVEL_03_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_LEVEL_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_RSS_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_10_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_CAPTION%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_CLOSE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_CLOSE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_DEF_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_DEF_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_DEF_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_DEF_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_DEF_05%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_DEF_06%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_RSS_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_TERM_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_TERM_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_TERM_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_TERM_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_TERM_05%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_TERM_06%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_11_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_BRIEF_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_CAPTION%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_CLOSE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_CLOSE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_RSS_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_SECTION_01_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_SECTION_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_SECTION_02_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_SECTION_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_SECTION_03_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_SECTION_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_SECTION_04_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_SECTION_04_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_12_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_CLOSE_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_INDEX_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_INDEX_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_INDEX_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_INDEX_META_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_INDEX_NOTE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_INDEX_NOTE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_INDEX_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_PAGINATION_ARIA%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%BENEFIT_DISCLAIMER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%BENEFIT_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%BENEFIT_RATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%BRAND_EN%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%BRAND_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%BREADCRUMB_ARIA%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CALCULATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CHECKLIST_01_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CHECKLIST_01_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CHECKLIST_01_META_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CHECKLIST_01_NOTE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CHECKLIST_01_NOTE_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CHECKLIST_01_NOTE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CHECKLIST_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CHECKLIST_02_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CHECKLIST_02_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CHECKLIST_02_META_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CHECKLIST_02_NOTE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CHECKLIST_02_NOTE_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CHECKLIST_02_NOTE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CHECKLIST_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CHECKLIST_03_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CHECKLIST_03_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CHECKLIST_03_META_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CHECKLIST_03_NOTE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CHECKLIST_03_NOTE_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CHECKLIST_03_NOTE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CHECKLIST_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CHECKLIST_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CHECKLIST_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CHECKLIST_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COLLECTION_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_BODY_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_H2_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_H2_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_H2_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_LINK%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_META_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_NOTE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_NOTE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_SIDENOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_UPDATED%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COPYRIGHT%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COPY_CODE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COPY_FAILURE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COPY_RESULT%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%COPY_SUCCESS%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_BODY_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_H2_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_H2_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_H2_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_LINK%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_META_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_NOTE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_NOTE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_SIDENOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_UPDATED%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
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
- `%DISCLAIMER_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_BODY_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_H2_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_H2_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_H2_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_LINK%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_META_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_NOTE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_NOTE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_SIDENOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_UPDATED%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_BODY_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_H2_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_H2_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_H2_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_LINK%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_META_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_NOTE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_NOTE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_SIDENOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_UPDATED%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_BODY_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_H2_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_H2_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_H2_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_LINK%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_META_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_NOTE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_NOTE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_SIDENOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_UPDATED%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ERROR_ARTICLE_CTA%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ERROR_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ERROR_HOME_CTA%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ERROR_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ERROR_META_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ERROR_RANGE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ERROR_REQUIRED%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ERROR_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%ERROR_TOOL_CTA%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%FEATURED_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%FEATURED_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%FEED_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%FILTER_ALL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%FILTER_ARIA%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%FILTER_INITIAL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%FILTER_STATUS_PREFIX%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%FILTER_STATUS_SUFFIX%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%FOOTER_STATEMENT%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%GUIDE_SUMMARY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_CHECK_01_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_CHECK_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_CHECK_02_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_CHECK_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_CHECK_03_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_CHECK_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_CHECK_04_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_CHECK_04_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_CHECK_05_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_CHECK_05_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_CHECK_06_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_CHECK_06_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_CHECK_07_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_CHECK_07_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_CHECK_08_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_CHECK_08_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_CHECK_09_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_CHECK_09_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_CHECK_10_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_CHECK_10_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_CHECK_11_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_CHECK_11_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_CHECK_12_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_CHECK_12_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_META_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_PRIMARY_CTA%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_SECONDARY_CTA%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_TITLE_LINE_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_TITLE_LINE_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_TRUST_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_TRUST_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%HOME_TRUST_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%INDEPENDENT_DISCLOSURE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%INVITE_CODE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%INVITE_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%LANG%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%LASTMOD%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%LEGAL_NAV_ARIA%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%LOCAL_ONLY_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%NAV_ABOUT%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%NAV_CHECKS%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%NAV_HOME%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%NAV_PROTOCOLS%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%OPEN_TOOL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%POLICY_UPDATED_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIMARY_NAV_ARIA%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_BODY_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_BODY_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_BODY_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_BODY_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_H2_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_H2_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_H2_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_H2_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_LINK%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_META_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_NOTE_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_NOTE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_SIDENOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_UPDATED%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%READ_PROTOCOL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%REGISTRATION_EDITORIAL_LINK%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RESET%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RESET_ALL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RESULT_ERROR%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%RESULT_IDLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SECURITY_EMAIL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SECURITY_EXPIRES%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SESSION_DONE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SESSION_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SESSION_LOCAL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SESSION_MODE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SESSION_PENDING%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SESSION_PROGRESS%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SESSION_STORAGE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SESSION_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SIGNAL_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SIGNAL_STATUS%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITE_DOMAIN%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITE_LINK_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITE_LINK_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITE_LINK_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITE_LINK_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITE_LINK_05%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITE_LINK_06%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITE_LINK_07%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITE_LINK_08%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITE_LINK_09%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITE_LINK_10%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITE_LINK_11%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITE_LINK_12%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITE_LINK_13%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITE_LINK_14%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITE_LINK_15%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITE_LINK_16%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITE_LINK_17%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITE_LINK_18%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITE_LINK_19%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITE_LINK_20%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITE_LINK_21%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITE_LINK_22%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITE_LINK_23%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITE_LINK_24%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITE_LINK_25%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITE_LINK_26%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITE_LINK_27%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITE_LINK_28%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITE_LINK_29%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITE_LINK_30%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITE_MAP_ARIA%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITE_MAP_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SITE_NAME%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%SKIP_LINK%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%STREAM_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%STREAM_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%THEME_DARK%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%THEME_LIGHT%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOLS_TEASE_CTA%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOLS_TEASE_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOLS_TEASE_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOLS_TEASE_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_ERROR_COUNT%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_ERROR_ITEMS%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_FIELD_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_FIELD_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_01_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_02_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_03_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_04_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_04_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_05_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_05_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_PLACEHOLDER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_RESULT_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_TYPE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_BAND_HIGH%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_BAND_LOW%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_BAND_MID%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_ERROR_LENGTH%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_FIELD_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_FIELD_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_01_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_02_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_03_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_04_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_04_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_05_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_05_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_MODEL_MIXED%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_MODEL_WORDS%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_RESULT_BAND%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_RESULT_BITS%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_RESULT_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_TYPE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_BAND_HIGH%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_BAND_LOW%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_BAND_MID%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_ERROR_SELECT%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_FIELDSET%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_FIELD_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_01_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_02_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_03_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_04_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_04_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_05_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_05_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_OPTION_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_OPTION_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_OPTION_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_OPTION_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_OPTION_05%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_RESULT_BAND%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_RESULT_NOTE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_RESULT_SCORE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_SCOPE_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_SCOPE_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_SCOPE_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_TYPE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_ERROR_SELECT%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_FIELDSET%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_01_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_02_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_03_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_04_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_04_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_05_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_05_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_OPTION_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_OPTION_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_OPTION_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_OPTION_04%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_OPTION_05%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_OPTION_06%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_RESULT_COMPLETE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_RESULT_PENDING%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_RESULT_READY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_RESULT_SCORE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_TYPE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_ERROR_DATE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_ERROR_ORDER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_FIELD_01%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_FIELD_02%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_FIELD_03%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_01_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_02_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_03_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_04_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_04_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_05_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_05_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_RESULT_DELTA%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_RESULT_DURATION%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_RESULT_OUTSIDE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_RESULT_TARGET%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_RESULT_WITHIN%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_TYPE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_INDEX_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_INDEX_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_INDEX_META_DESC%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_INDEX_META_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_INDEX_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_INPUT_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_KICKER%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_OUTPUT_LABEL%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_PRINCIPLE_01_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_PRINCIPLE_01_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_PRINCIPLE_02_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_PRINCIPLE_02_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_PRINCIPLE_03_BODY%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%TOOL_PRINCIPLE_03_TITLE%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
- `%VIEW_ALL_ARTICLES%`：由内容 AI 填入对应的经核实文字、日期、标签或站点资料。
