# 107-openbook-gutter

## 来源与静态化口径

- 军哥动态模板：`home_gutter`
- 忠实保留摊开书本、左页刊首语、立体中缝、圆章、竖排分类导航与右页目录行。
- 原始 `gt-wrap`、全部 `gt-*` 类名、模块层级与顺序完整保留；Go 条件和循环展开为静态示例。

## 文件清单

- `index.html`：Gutter 首页完整静态化。
- `article.html`：跨页四节正文。
- `tool.html`：按主题、页码和批注切换的翻页索引。
- `legal.html`：内容、转载、隐私与修订说明。
- `404.html`、`robots.txt`、`sitemap.xml`：静态站配套。
- `public.css`：军哥公共 `style.css` 的原样副本。
- `static/gutter.css`：补齐源包未提供的 `gt-*` 专属样式与内页样式。
- `static/gutter.js`：移动导航及索引交互。

## 可替换占位符

`[[LANG]]`、`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_DESC]]`、`[[SITE_TAGLINE]]`、`[[HERO_EYEBROW]]`、`[[HERO_TITLE]]`、`[[HERO_DESCRIPTION]]`、`[[HOME_FEATURED_LABEL]]`、`[[HOME_LATEST_LABEL]]`、`[[CONTACT_CHANNEL]]`

部署前应替换占位符、示例内容与版权说明。
