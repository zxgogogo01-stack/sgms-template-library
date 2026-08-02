# 087-coral-routeatlas

## 来源与静态化口径

- 军哥动态模板：`home_route_atlas`
- 忠实保留原版三栏路线图布局、`ra-*` 原始类名、模块顺序和可用公共样式。
- Go 的条件、循环与字段输出已展开成可直接预览的静态示例，不对原布局做防同源式重设计。

## 文件清单

- `index.html`：路线索引、主视觉、三段导读、补给链接和最近更新。
- `article.html`：三步核对文章与移动端可滚动数据表。
- `tool.html`：三种情境可切换的路线规划器。
- `legal.html`：来源、更新、免责和联系说明。
- `404.html`、`robots.txt`、`sitemap.xml`：完整静态站配套。
- `public.css`：军哥源库公共 `style.css` 的原样副本。
- `static/route.css`：补齐原包未提供的 `ra-*` 页面专属样式和内页样式。
- `static/route.js`：移动导航及本地路线规划交互。

## 可替换占位符

`[[LANG]]`、`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_DESC]]`、`[[SITE_TAGLINE]]`、`[[SEO_TITLE]]`、`[[HERO_EYEBROW]]`、`[[HERO_TITLE]]`、`[[HERO_DESCRIPTION]]`、`[[HOME_FEATURED_LABEL]]`、`[[HOME_LATEST_LABEL]]`、`[[ALL_CONTENT_TITLE]]`、`[[CONTACT_CHANNEL]]`

模板不包含注册、邀请或导流代码；部署前应替换占位符，并用真实栏目数据替换静态示例。
