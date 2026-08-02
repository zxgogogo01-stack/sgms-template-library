# 096-sky-openascent

## 来源与静态化口径

- 军哥动态模板：`home_open_ascent`
- 忠实保留 Hero 媒体、主叙事、三条导读、重点文章、五项分类和 3+4 策展区。
- 原始 `open-ascent-page`、全部 `oa-*` 与动画类名、模块顺序完整保留；Go 条件和循环展开为静态示例。

## 文件清单

- `index.html`：Open Ascent 首页完整静态化。
- `article.html`：起步、爬升与回望三阶段札记。
- `tool.html`：三高度路线规划器。
- `legal.html`：来源、安全、隐私和联系说明。
- `404.html`、`robots.txt`、`sitemap.xml`：静态站配套。
- `public.css`：军哥公共 `style.css` 的原样副本。
- `static/ascent.css`：补齐源包未提供的 `oa-*` 专属样式与内页样式。
- `static/ascent.js`：移动导航及路线规划器交互。

## 可替换占位符

`[[LANG]]`、`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_DESC]]`、`[[SITE_TAGLINE]]`、`[[HERO_EYEBROW]]`、`[[HERO_TITLE]]`、`[[HERO_DESCRIPTION]]`、`[[HOME_FEATURED_LABEL]]`、`[[CONTACT_CHANNEL]]`

模板不包含注册、邀请或导流组件；部署前应替换占位符与示例内容。
