# 114-factory-catalog

## 来源与静态化口径

- 军哥动态模板：`home_factory_catalog`
- 忠实保留目录型 Hero、实力数字、分区编号眉标、4px 重分隔线、分类入口卡、紧凑产品栅格，以及流程、行业、图集、FAQ、资料列表和通栏询盘。
- 源文件内的共享工厂组件和未启用的机械动画蓝图也作为静态备用结构保留。
- 原始 `fc-wrap`、全部 `fc-*`、共享 `f-*` 与 `fa-*` 类名、模块层级和顺序完整保留。

## 文件清单

- `index.html`：Factory Catalog 首页完整静态化。
- `article.html`：技术资料文章页。
- `tool.html`：环境、结构和交付三阶段选型清单。
- `legal.html`：目录、定制、检验和交付说明。
- `404.html`、`robots.txt`、`sitemap.xml`：静态站配套。
- `public.css`：军哥公共 `style.css` 原样副本。
- `static/factory-catalog.css`：目录首页、共享工厂组件和内页样式。
- `static/factory-catalog.js`：移动导航、FAQ 单开与选型交互。

## 可替换占位符

`[[LANG]]`、`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_DESC]]`、`[[SITE_TAGLINE]]`、`[[HERO_EYEBROW]]`、`[[HERO_TITLE]]`、`[[HERO_DESCRIPTION]]`、`[[CONTACT_CHANNEL]]`

部署前应替换占位符、产品参数、技术资料、企业资质和交付条款。
