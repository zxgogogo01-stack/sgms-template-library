# 095-white-seamlesscanvas

## 来源与静态化口径

- 军哥动态模板：`home_seamless_canvas`
- 忠实保留媒体 Hero、主叙事、四项入口索引、重点内容、六条最新内容和 3+4 策展区。
- 原始 `seamless-canvas-page`、全部 `sc-*` 与动画类名、模块顺序完整保留；Go 条件和循环展开为静态示例。

## 文件清单

- `index.html`：Seamless Canvas 首页完整静态化。
- `article.html`：三阶段视觉编辑札记。
- `tool.html`：收集、筛选、成组三步编排器。
- `legal.html`：来源、隐私、修订和联系说明。
- `404.html`、`robots.txt`、`sitemap.xml`：静态站配套。
- `public.css`：军哥公共 `style.css` 的原样副本。
- `static/canvas.css`：补齐源包未提供的 `sc-*` 专属样式与内页样式。
- `static/canvas.js`：移动导航及三步编排器交互。

## 可替换占位符

`[[LANG]]`、`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_DESC]]`、`[[SITE_TAGLINE]]`、`[[HERO_EYEBROW]]`、`[[HERO_TITLE]]`、`[[HERO_DESCRIPTION]]`、`[[HOME_FEATURED_LABEL]]`、`[[HOME_LATEST_LABEL]]`、`[[CONTACT_CHANNEL]]`

模板不包含注册、邀请或导流组件；部署前应替换占位符与示例内容。
