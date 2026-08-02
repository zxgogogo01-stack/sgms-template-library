# 091-duotone-counterpoint

## 来源与静态化口径

- 军哥动态模板：`home_counterpoint`
- 忠实保留左右对位 Hero、命题条、四段交替阅读路径和五条底部台账。
- 原始 `counterpoint-page`、全部 `cp-*` 类名与模块顺序完整保留；Go 条件和循环展开为静态示例。

## 文件清单

- `index.html`：Counterpoint 首页完整静态化。
- `article.html`：双向论证正文。
- `tool.html`：前提、证据与边界观点对照工具。
- `legal.html`：来源、对位、修订与免责说明。
- `404.html`、`robots.txt`、`sitemap.xml`：静态站配套。
- `public.css`：军哥公共 `style.css` 的原样副本。
- `static/counterpoint.css`：补齐源包未提供的 `cp-*` 专属样式和内页样式。
- `static/counterpoint.js`：移动导航及观点对照交互。

## 可替换占位符

`[[LANG]]`、`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_DESC]]`、`[[SITE_TAGLINE]]`、`[[HERO_EYEBROW]]`、`[[HERO_TITLE]]`、`[[HERO_DESCRIPTION]]`、`[[HOME_FEATURED_LABEL]]`、`[[HOME_LATEST_LABEL]]`、`[[CONTACT_CHANNEL]]`

模板不包含注册、邀请或导流组件；部署前应替换占位符与示例内容。
