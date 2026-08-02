# 113-factory-trade

## 来源与静态化口径

- 军哥动态模板：`home_factory_trade`
- 忠实保留经典外贸工厂门户的双层页头、藏青横幅 Hero、实力数字、左侧分类与联系栏、右侧商品栅格与动态列表。
- 源模板随后调用的合作流程、服务行业、车间图集、原生 FAQ 和整宽询盘 CTA 一并静态展开；页脚保持四栏门户结构。
- 原始 `ft-wrap`、全部 `ft-*`、共享 `f-*` 类名、模块层级与顺序均保留，不改造成单页营销站。

## 文件清单

- `index.html`：Factory Trade 首页完整静态化。
- `article.html`：工厂动态文章页。
- `tool.html`：制造、质量和出口三维询盘参数助手。
- `legal.html`：图纸、规格、质量与贸易说明。
- `404.html`、`robots.txt`、`sitemap.xml`：静态站配套。
- `public.css`：军哥公共 `style.css` 原样副本。
- `static/factory-trade.css`：补齐源包未提供的 `ft-*` 和共享工厂模块样式。
- `static/factory-trade.js`：移动导航、FAQ 单开和询盘助手交互。

## 可替换占位符

`[[LANG]]`、`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_DESC]]`、`[[SITE_TAGLINE]]`、`[[HERO_EYEBROW]]`、`[[HERO_TITLE]]`、`[[HERO_DESCRIPTION]]`、`[[CONTACT_CHANNEL]]`

部署前应替换占位符、产品参数、企业资质、联系方式与贸易说明。
