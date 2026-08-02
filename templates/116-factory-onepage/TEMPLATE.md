# 116-factory-onepage

## 来源与静态化口径

- 军哥动态模板：`home_factory_onepage`
- 忠实保留整站一页滚到底的最短转化路径：首页导航直接锚定产品、实力、流程、FAQ 与联系。
- 保留居中大字 Hero、机械图纸视觉、图像备用形态、警示胶带条、三张主打产品大卡、实力数字、四步流程、FAQ 和联系 CTA。
- 原始 `fo-wrap`、全部 `fo-*`、共享 `f-*` 类名、模块层级与顺序完整保留；产品与文章内页仍使用常规路由。

## 文件清单

- `index.html`：Factory Onepage 首页完整静态化。
- `article.html`：项目案例文章页。
- `tool.html`：图纸、数量和交付三步项目信息清单。
- `legal.html`：图纸、报价、样品和交付说明。
- `404.html`、`robots.txt`、`sitemap.xml`：静态站配套。
- `public.css`：军哥公共 `style.css` 原样副本。
- `static/factory-onepage.css`：单页首页、共享工厂组件与内页样式。
- `static/factory-onepage.js`：移动锚点导航、FAQ 单开与项目清单交互。

## 可替换占位符

`[[LANG]]`、`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_DESC]]`、`[[SITE_TAGLINE]]`、`[[HERO_EYEBROW]]`、`[[HERO_TITLE]]`、`[[HERO_DESCRIPTION]]`、`[[CONTACT_CHANNEL]]`

部署前应替换占位符、产品参数、案例、资质和合作条款。
