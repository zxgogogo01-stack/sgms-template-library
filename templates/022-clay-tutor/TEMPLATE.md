# 022-clay-tutor

## 定位

高端陶土课程工坊模板。陶土红、鼠尾草绿、奶油釉面与手工器皿曲线构成温暖的学习空间；首页以纵向教学提纲、雕塑式标题、邀请码泥牌和三间课程工坊展开，与报刊、评测柜和常规卡片落地页保持明显差异。

## 后续 AI 只填文字

31 条公开路由、12 种课程文章骨架、3 间学习工坊、5 件真实本地数学教具、7 个独立合规页、12 对独立封面、社交图、SEO 头部、RSS 与响应式交互均已完成。后续 AI 只替换变量并写入经核实的课程文字，不改路径、class、CSS、JS、工具算法或页面结构。

1. 首页为形态 A：首屏显示邀请码、复制控件、弹性利益点和政策脚注；无外部转化直链，只有一次编辑式课程入口。
2. `lessons/access-slip.html` 只是注册类内容的页面外壳，也是唯一 `%AFFILIATE_URL%` 槽位；不得在模板阶段写注册教程正文或具体平台事实。
3. 十二篇采用入场笺、概念画布、公式板、手算账页、误区陶片、双情境比较、问题梯、假设工作纸、案例实验、术语墙、计算札记与结课计划十二种结构。
4. 五件工具完全在浏览器本地运行：增长路径、投入时点比较、费用拖累、实际价值折算和目标费率反求。只作为数学教学，不是预测或个性化建议。
5. 封面保持同名 PNG/WebP、1200×630、无图中文字，并保留预加载、alt、尺寸与高优先级标记；页脚保留真人可见 RSS 入口。

## 页面角色表

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "article.html",
  "articles": [
    "lessons/access-slip.html",
    "lessons/growth-intuition.html",
    "lessons/rate-and-time.html",
    "lessons/contribution-rhythm.html",
    "lessons/cost-friction.html",
    "lessons/negative-periods.html",
    "lessons/scenario-reading.html",
    "lessons/assumption-audit.html",
    "lessons/comparison-practice.html",
    "lessons/question-studio.html",
    "lessons/calculation-notes.html",
    "lessons/capstone-plan.html"
  ],
  "cornerstones": [
    "lessons/access-slip.html",
    "lessons/growth-intuition.html"
  ],
  "registrationGuide": "lessons/access-slip.html",
  "articleCovers": {
    "lessons/access-slip.html": {
      "display": "assets/covers/access-slip.webp",
      "og": "assets/covers/access-slip.png"
    },
    "lessons/growth-intuition.html": {
      "display": "assets/covers/growth-intuition.webp",
      "og": "assets/covers/growth-intuition.png"
    },
    "lessons/rate-and-time.html": {
      "display": "assets/covers/rate-and-time.webp",
      "og": "assets/covers/rate-and-time.png"
    },
    "lessons/contribution-rhythm.html": {
      "display": "assets/covers/contribution-rhythm.webp",
      "og": "assets/covers/contribution-rhythm.png"
    },
    "lessons/cost-friction.html": {
      "display": "assets/covers/cost-friction.webp",
      "og": "assets/covers/cost-friction.png"
    },
    "lessons/negative-periods.html": {
      "display": "assets/covers/negative-periods.webp",
      "og": "assets/covers/negative-periods.png"
    },
    "lessons/scenario-reading.html": {
      "display": "assets/covers/scenario-reading.webp",
      "og": "assets/covers/scenario-reading.png"
    },
    "lessons/assumption-audit.html": {
      "display": "assets/covers/assumption-audit.webp",
      "og": "assets/covers/assumption-audit.png"
    },
    "lessons/comparison-practice.html": {
      "display": "assets/covers/comparison-practice.webp",
      "og": "assets/covers/comparison-practice.png"
    },
    "lessons/question-studio.html": {
      "display": "assets/covers/question-studio.webp",
      "og": "assets/covers/question-studio.png"
    },
    "lessons/calculation-notes.html": {
      "display": "assets/covers/calculation-notes.webp",
      "og": "assets/covers/calculation-notes.png"
    },
    "lessons/capstone-plan.html": {
      "display": "assets/covers/capstone-plan.webp",
      "og": "assets/covers/capstone-plan.png"
    }
  },
  "categories": [
    {
      "path": "studios/foundation-wheel.html",
      "label": "%STUDIO_FOUNDATION_TITLE%",
      "articles": [
        "lessons/access-slip.html",
        "lessons/growth-intuition.html",
        "lessons/rate-and-time.html",
        "lessons/contribution-rhythm.html"
      ]
    },
    {
      "path": "studios/kiln-practice.html",
      "label": "%STUDIO_KILN_TITLE%",
      "articles": [
        "lessons/cost-friction.html",
        "lessons/negative-periods.html",
        "lessons/scenario-reading.html",
        "lessons/assumption-audit.html"
      ]
    },
    {
      "path": "studios/glaze-review.html",
      "label": "%STUDIO_GLAZE_TITLE%",
      "articles": [
        "lessons/comparison-practice.html",
        "lessons/question-studio.html",
        "lessons/calculation-notes.html",
        "lessons/capstone-plan.html"
      ]
    }
  ],
  "toolIndex": "tool.html",
  "tools": [
    "workbench/growth-path.html",
    "workbench/cadence-comparator.html",
    "workbench/fee-drag-lens.html",
    "workbench/real-value-lens.html",
    "workbench/target-rate-wheel.html"
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

- 31 条路由需在桌面、390px、360px 共 93 次浏览器巡检。
- 实测首页复制与主题、五工具正常/错误/边界/重置/复制、唯一推广槽位属性、404、图片、溢出、触控和控制台。
- 下游 AI 仅负责文字和事实核验，不再设计 UI、补组件或编写工具。

## 完整变量清单

- `%ABOUT_BODY_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_BODY_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_BODY_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_H2_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_H2_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_H2_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_META_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_META_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_NOTE_BODY%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_NOTE_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%ABOUT_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%AFFILIATE_DISCLOSURE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%AFFILIATE_URL%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_INDEX_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_INDEX_META_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_INDEX_META_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%ARTICLE_INDEX_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%AUTHOR_BIO%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%AUTHOR_NAME%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%BENEFIT_DISCLAIMER%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%BENEFIT_RATE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%BRAND_EN%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%CALCULATE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%CHARTER_NAV_LABEL%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_BODY_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_BODY_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_BODY_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_EMAIL%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_H2_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_H2_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_H2_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_META_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_META_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_NOTE_BODY%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_NOTE_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%CONTACT_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%COPY_CODE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%COPY_FAILURE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%COPY_RESULT%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%COPY_SUCCESS%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_BODY_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_BODY_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_BODY_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_H2_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_H2_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_H2_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_META_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_META_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_NOTE_BODY%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_NOTE_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%CORRECTIONS_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%COURSE_LEVEL%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_ALT_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_ALT_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_ALT_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_ALT_04%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_ALT_05%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_ALT_06%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_ALT_07%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_ALT_08%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_ALT_09%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_ALT_10%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_ALT_11%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_ALT_12%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_CAPTION_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_CAPTION_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_CAPTION_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_CAPTION_04%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_CAPTION_05%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_CAPTION_06%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_CAPTION_07%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_CAPTION_08%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_CAPTION_09%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_CAPTION_10%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_CAPTION_11%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%COVER_CAPTION_12%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%CURRENT_YEAR%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%CURRICULUM_KICKER%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%DATE_MODIFIED%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%DATE_PUBLISHED%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%DIRECTORY_LABEL%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%DIR_HOME%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_BODY_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_BODY_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_BODY_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_H2_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_H2_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_H2_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_META_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_META_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_NOTE_BODY%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_NOTE_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLAIMER_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_BODY_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_BODY_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_BODY_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_H2_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_H2_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_H2_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_LINK%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_META_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_META_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_NOTE_BODY%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_NOTE_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%DISCLOSURE_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%EDITION_DATE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_BODY_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_BODY_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_BODY_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_H2_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_H2_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_H2_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_META_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_META_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_NOTE_BODY%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_NOTE_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%EDITORIAL_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%ENTER_STUDIO%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%ERROR_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%ERROR_DISPLAY_RANGE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%ERROR_HOME%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%ERROR_LESSONS%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%ERROR_META_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%ERROR_META_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%ERROR_NUMBER%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%ERROR_PERIOD_RANGE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%ERROR_REQUIRED%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%ERROR_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%ERROR_TOOLS%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%FEED_DATE_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%FEED_DATE_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%FEED_DATE_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%FEED_DATE_04%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%FEED_DATE_05%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%FEED_DATE_06%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%FEED_DATE_07%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%FEED_DATE_08%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%FEED_DATE_09%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%FEED_DATE_10%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%FEED_DATE_11%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%FEED_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%FEED_TTL%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%FOOTER_NOTE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%HOME_EDITORIAL_ENTRY%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%HOME_H1%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%HOME_KICKER%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%HOME_LEDE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%HOME_LESSONS_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%HOME_LESSONS_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%HOME_META_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%HOME_META_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%HOME_SERVICE_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%HOME_STEP_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%HOME_STEP_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%HOME_STEP_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%HOME_STEP_04%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%HOME_STUDIOS_LABEL%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%HOME_SYLLABUS_LABEL%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%INVITE_CODE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%INVITE_LABEL%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LANG%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_01_ACCESS_BODY%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_01_ACCESS_LINK%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_01_ACCESS_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_01_BODY_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_01_BODY_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_01_BODY_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_01_FAQ_A1%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_01_FAQ_A2%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_01_FAQ_Q1%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_01_FAQ_Q2%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_01_FAQ_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_01_H2_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_01_H2_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_01_H2_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_01_LEDE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_01_META_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_01_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_01_TOC_LABEL%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_02_BODY_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_02_BODY_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_02_BODY_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_02_CONCEPT_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_02_CONCEPT_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_02_CONCEPT_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_02_H2_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_02_H2_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_02_H2_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_02_LEDE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_02_META_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_02_QUOTE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_02_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_02_TOC_LABEL%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_03_BODY_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_03_BODY_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_03_BODY_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_03_FORMULA_LEFT%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_03_FORMULA_MIDDLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_03_FORMULA_NOTE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_03_FORMULA_RIGHT%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_03_H2_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_03_H2_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_03_H2_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_03_LEDE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_03_META_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_03_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_03_TOC_LABEL%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_04_BODY_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_04_BODY_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_04_BODY_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_04_CELL_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_04_CELL_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_04_CELL_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_04_CELL_04%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_04_COL_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_04_COL_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_04_COL_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_04_H2_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_04_H2_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_04_H2_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_04_LEDE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_04_META_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_04_ROW_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_04_ROW_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_04_TABLE_CAPTION%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_04_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_04_TOC_LABEL%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_05_BODY_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_05_BODY_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_05_BODY_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_05_CHECK_LABEL%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_05_H2_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_05_H2_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_05_H2_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_05_KEEP_LABEL%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_05_LEDE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_05_META_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_05_MYTH_LABEL%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_05_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_05_TOC_LABEL%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_06_BODY_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_06_BODY_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_06_BODY_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_06_H2_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_06_H2_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_06_H2_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_06_LEDE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_06_META_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_06_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_06_TOC_LABEL%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_07_BODY_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_07_BODY_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_07_BODY_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_07_H2_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_07_H2_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_07_H2_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_07_LEDE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_07_META_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_07_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_07_TOC_LABEL%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_08_BODY_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_08_BODY_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_08_BODY_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_08_CHECK_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_08_CHECK_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_08_CHECK_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_08_H2_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_08_H2_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_08_H2_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_08_LEDE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_08_META_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_08_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_08_TOC_LABEL%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_08_WORKSHEET_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_09_BODY_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_09_BODY_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_09_BODY_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_09_CASE_NOTE_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_09_CASE_NOTE_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_09_CASE_NOTE_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_09_H2_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_09_H2_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_09_H2_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_09_LEDE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_09_META_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_09_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_09_TOC_LABEL%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_10_BODY_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_10_BODY_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_10_BODY_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_10_H2_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_10_H2_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_10_H2_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_10_LEDE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_10_META_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_10_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_10_TOC_LABEL%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_11_BODY_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_11_BODY_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_11_BODY_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_11_H2_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_11_H2_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_11_H2_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_11_LEDE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_11_MARGIN_NOTE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_11_META_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_11_PROMPT_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_11_PROMPT_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_11_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_11_TOC_LABEL%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_12_BODY_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_12_BODY_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_12_BODY_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_12_CAPSTONE_CLOSE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_12_CAPSTONE_LABEL%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_12_H2_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_12_H2_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_12_H2_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_12_LEDE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_12_META_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_12_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%LESSON_12_TOC_LABEL%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%NAV_ABOUT%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%NAV_HOME%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%NAV_LABEL%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%NAV_LESSONS%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%NAV_STUDIOS%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%NAV_WORKBENCH%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%OPEN_TOOL%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_BODY_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_BODY_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_BODY_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_H2_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_H2_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_H2_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_META_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_META_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_NOTE_BODY%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_NOTE_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%PRIVACY_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%RELATED_ALL%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%RELATED_LABEL%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%RELATED_METHOD%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%RELATED_TOOLS%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%RESET%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%RESULT_ERROR%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%RESULT_IDLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%RESULT_LABEL%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%RSS_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%RSS_VISIBLE_LABEL%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%SECURITY_EMAIL%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%SECURITY_EXPIRES%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%SITE_DOMAIN%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%SITE_NAME%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%SKIP_LINK%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%STUDIO_01_META_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%STUDIO_02_META_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%STUDIO_03_META_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%STUDIO_ALL_LESSONS%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%STUDIO_FOUNDATION_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%STUDIO_FOUNDATION_NOTE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%STUDIO_FOUNDATION_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%STUDIO_GLAZE_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%STUDIO_GLAZE_NOTE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%STUDIO_GLAZE_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%STUDIO_KILN_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%STUDIO_KILN_NOTE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%STUDIO_KILN_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%STUDIO_LESSON_LABEL%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%STUDIO_MENTOR%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%STUDIO_NOTE_BODY%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%STUDIO_NOTE_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%THEME_DARK%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%THEME_LABEL%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%THEME_LIGHT%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_ERROR_RANGE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_FIELD_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_FIELD_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_FIELD_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_BODY_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_BODY_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_BODY_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_BODY_04%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_BODY_05%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_H3_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_H3_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_H3_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_H3_04%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_H3_05%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_GUIDE_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_RESULT_CHANGE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_RESULT_END%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_RESULT_FACTOR%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_01_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_ERROR_RANGE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_FIELD_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_FIELD_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_FIELD_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_BODY_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_BODY_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_BODY_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_BODY_04%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_BODY_05%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_H3_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_H3_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_H3_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_H3_04%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_H3_05%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_GUIDE_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_RESULT_END%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_RESULT_GAP%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_RESULT_START%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_02_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_ERROR_NET%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_ERROR_RANGE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_FIELD_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_FIELD_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_FIELD_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_FIELD_04%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_BODY_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_BODY_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_BODY_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_BODY_04%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_BODY_05%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_H3_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_H3_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_H3_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_H3_04%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_H3_05%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_GUIDE_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_RESULT_DRAG%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_RESULT_GROSS%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_RESULT_NET%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_03_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_ERROR_RANGE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_FIELD_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_FIELD_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_FIELD_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_BODY_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_BODY_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_BODY_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_BODY_04%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_BODY_05%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_H3_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_H3_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_H3_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_H3_04%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_H3_05%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_GUIDE_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_RESULT_FACTOR%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_RESULT_GAP%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_RESULT_REAL%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_04_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_ERROR_RANGE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_ERROR_SOLUTION%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_FIELD_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_FIELD_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_FIELD_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_BODY_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_BODY_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_BODY_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_BODY_04%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_BODY_05%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_H3_01%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_H3_02%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_H3_03%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_H3_04%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_H3_05%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_GUIDE_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_RESULT_FACTOR%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_RESULT_NOTE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_RESULT_RATE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_05_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_BOUNDARY_BODY%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_BOUNDARY_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_INDEX_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_INDEX_META_DESC%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_INDEX_META_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_INDEX_NOTE_BODY%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_INDEX_NOTE_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_INDEX_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
- `%TOOL_INPUT_TITLE%`：由内容 AI 填入该字段对应的经核实文字、日期、标签或站点资料。
