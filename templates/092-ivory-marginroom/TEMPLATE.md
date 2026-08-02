# 092-ivory-marginroom

## 来源与静态化口径

- 军哥动态模板：`home_margin_reading_room`
- 忠实保留三段式导语、七个阅读镜头、主阅读区、五篇伴读和完整书目台账。
- 原始 `margin-reading-room-page`、全部 `mr-*` 类名与模块顺序完整保留；Go 条件和循环展开为静态示例。

## 文件清单

- `index.html`：Margin Reading Room 首页完整静态化。
- `article.html`：三步页边批注正文。
- `tool.html`：概念、证据与行动阅读卡。
- `legal.html`：来源、摘录、批注和联系说明。
- `404.html`、`robots.txt`、`sitemap.xml`：静态站配套。
- `public.css`：军哥公共 `style.css` 的原样副本。
- `static/margin.css`：补齐源包未提供的 `mr-*` 专属样式与内页样式。
- `static/margin.js`：移动导航及阅读卡交互。

## 可替换占位符

`[[LANG]]`、`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_DESC]]`、`[[SITE_TAGLINE]]`、`[[HERO_EYEBROW]]`、`[[HERO_TITLE]]`、`[[HERO_DESCRIPTION]]`、`[[HOME_FEATURED_LABEL]]`、`[[HOME_LATEST_LABEL]]`、`[[CONTACT_CHANNEL]]`

模板不包含注册、邀请或导流组件；部署前应替换占位符与示例书目。
