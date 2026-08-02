# 093-blue-progressbulletin

## 来源与静态化口径

- 军哥动态模板：`home_progress_bulletin`
- 忠实保留可单列/双列 Hero、精选公报、六栏目状态板和完整更新台账。
- 原始 `progress-bulletin-page`、全部 `pb-*` 类名与模块顺序完整保留；Go 条件和循环展开为静态示例。

## 文件清单

- `index.html`：Progress Bulletin 首页完整静态化。
- `article.html`：季度节点与风险记录。
- `tool.html`：已完成、进行中与风险项状态卡。
- `legal.html`：状态口径、验证、修订和联系说明。
- `404.html`、`robots.txt`、`sitemap.xml`：静态站配套。
- `public.css`：军哥公共 `style.css` 的原样副本。
- `static/progress.css`：补齐源包未提供的 `pb-*` 专属样式与内页样式。
- `static/progress.js`：移动导航及状态卡交互。

## 可替换占位符

`[[LANG]]`、`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_DESC]]`、`[[SITE_TAGLINE]]`、`[[HERO_EYEBROW]]`、`[[HERO_TITLE]]`、`[[HERO_DESCRIPTION]]`、`[[HOME_FEATURED_LABEL]]`、`[[HOME_LATEST_LABEL]]`、`[[CONTACT_CHANNEL]]`

模板不包含注册、邀请或导流组件；部署前应替换占位符与示例公报。
