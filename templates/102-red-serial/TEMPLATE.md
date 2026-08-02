# 102-red-serial

## 来源与静态化口径

- 军哥动态模板：`home_serial`
- 忠实保留书口装饰、竖排小签、续读条、卷页签、汉字序号目录、连载书架和待续印章。
- 原始 `srl-wrap`、全部 `srl-*` 类名、模块层级与顺序完整保留；Go 条件和循环展开为静态示例。

## 文件清单

- `index.html`：Serial 首页完整静态化。
- `article.html`：第十二回三节正文。
- `tool.html`：按卷、人物和时间线切换的阅读进度。
- `legal.html`：作品、引用、隐私和修订说明。
- `404.html`、`robots.txt`、`sitemap.xml`：静态站配套。
- `public.css`：军哥公共 `style.css` 的原样副本。
- `static/serial.css`：补齐源包未提供的 `srl-*` 专属样式与内页样式。
- `static/serial.js`：移动导航及阅读进度交互。

## 可替换占位符

`[[LANG]]`、`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_DESC]]`、`[[SITE_TAGLINE]]`、`[[HERO_EYEBROW]]`、`[[HERO_TITLE]]`、`[[HERO_DESCRIPTION]]`、`[[HOME_FEATURED_LABEL]]`、`[[HOME_LATEST_LABEL]]`、`[[CONTACT_CHANNEL]]`

模板不包含注册、邀请或导流组件；部署前应替换占位符与示例内容。
