# 098-olive-shelfindex

## 来源与静态化口径

- 军哥动态模板：`home_shelf_index`
- 忠实保留双栏 Hero、重点文章、五层主题书架及最新条目表。
- 原始 `shelf-index-page`、全部 `si-*` 与动画类名、模块顺序完整保留；Go 条件和循环展开为静态示例。

## 文件清单

- `index.html`：Shelf Index 首页完整静态化。
- `article.html`：主题、关系与状态的索引札记。
- `tool.html`：主题、状态与下一步三层索引器。
- `legal.html`：来源、引用、隐私和修订说明。
- `404.html`、`robots.txt`、`sitemap.xml`：静态站配套。
- `public.css`：军哥公共 `style.css` 的原样副本。
- `static/shelf.css`：补齐源包未提供的 `si-*` 专属样式与内页样式。
- `static/shelf.js`：移动导航及三层索引器交互。

## 可替换占位符

`[[LANG]]`、`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_DESC]]`、`[[SITE_TAGLINE]]`、`[[HERO_EYEBROW]]`、`[[HERO_TITLE]]`、`[[HERO_DESCRIPTION]]`、`[[HOME_FEATURED_LABEL]]`、`[[HOME_LATEST_LABEL]]`、`[[CONTACT_CHANNEL]]`

模板不包含注册、邀请或导流组件；部署前应替换占位符与示例内容。
