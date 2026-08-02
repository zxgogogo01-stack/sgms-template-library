# 115-factory-showcase

## 来源与静态化口径

- 军哥动态模板：`home_factory_showcase`
- 忠实保留大图纸 Hero、机械动画视觉、三张精选产品大卡、分类入口、实力数字与认证徽章条，以及流程、行业、图集、FAQ、动态和询盘通栏。
- Hero 的 `has-img`、`has-anim` 与 `fs-hero-img` 备用形态一并保留；当前默认展示源模板描述的机械图纸动画。
- 原始 `fs-wrap`、全部 `fs-*`、共享 `f-*` 类名、模块层级和顺序完整保留，不改造成目录密集布局。

## 文件清单

- `index.html`：Factory Showcase 首页完整静态化。
- `article.html`：项目案例文章页。
- `tool.html`：产品、制造和交付三阶段项目准备清单。
- `legal.html`：资料、样品、检验、交付和展示授权说明。
- `404.html`、`robots.txt`、`sitemap.xml`：静态站配套。
- `public.css`：军哥公共 `style.css` 原样副本。
- `static/factory-showcase.css`：展台、共享工厂组件与内页样式。
- `static/factory-showcase.js`：移动导航、FAQ 单开与项目清单交互。

## 可替换占位符

`[[LANG]]`、`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_DESC]]`、`[[SITE_TAGLINE]]`、`[[HERO_EYEBROW]]`、`[[HERO_TITLE]]`、`[[HERO_DESCRIPTION]]`、`[[CONTACT_CHANNEL]]`

部署前应替换占位符、产品参数、项目案例、资质与合作条款。
