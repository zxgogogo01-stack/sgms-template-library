# 094-black-nightcorridor

## 来源与静态化口径

- 军哥动态模板：`home_night_corridor`
- 忠实保留夜廊媒体、主叙事、五条导览、五个入口索引、三篇策展文章和四条资源链接。
- 原始 `night-corridor-page`、全部 `nc-*` 与动画类名、模块顺序完整保留；Go 条件和循环展开为静态示例。

## 文件清单

- `index.html`：Night Corridor 首页完整静态化。
- `article.html`：夜间告警三节点复盘。
- `tool.html`：即时信号、交接与恢复清单。
- `legal.html`：记录、隐私、修订与联系说明。
- `404.html`、`robots.txt`、`sitemap.xml`：静态站配套。
- `public.css`：军哥公共 `style.css` 的原样副本。
- `static/night.css`：补齐源包未提供的 `nc-*` 专属样式与内页样式。
- `static/night.js`：移动导航及值守清单交互。

## 可替换占位符

`[[LANG]]`、`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_DESC]]`、`[[SITE_TAGLINE]]`、`[[HERO_EYEBROW]]`、`[[HERO_TITLE]]`、`[[HERO_DESCRIPTION]]`、`[[HOME_FEATURED_LABEL]]`、`[[HOME_LATEST_LABEL]]`、`[[CONTACT_CHANNEL]]`

模板不包含注册、邀请或导流组件；部署前应替换占位符与示例内容。
