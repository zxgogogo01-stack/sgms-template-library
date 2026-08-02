# 101-cream-bistro

## 来源与静态化口径

- 军哥动态模板：`home_bistro`
- 忠实保留居中双线菜单、店徽、主标题、本日特供、虚线引导菜品、分类条和底部链接。
- 原始 `bt-wrap`、全部 `bt-*` 类名、模块层级与顺序完整保留；Go 条件和循环展开为静态示例。

## 文件清单

- `index.html`：Bistro 首页完整静态化。
- `article.html`：本日特供三阶段做法札记。
- `tool.html`：清爽、温暖和丰盛三种配餐器。
- `legal.html`：食材、过敏、来源和修订说明。
- `404.html`、`robots.txt`、`sitemap.xml`：静态站配套。
- `public.css`：军哥公共 `style.css` 的原样副本。
- `static/bistro.css`：补齐源包未提供的 `bt-*` 专属样式与内页样式。
- `static/bistro.js`：移动导航及配餐器交互。

## 可替换占位符

`[[LANG]]`、`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_DESC]]`、`[[SITE_TAGLINE]]`、`[[HERO_EYEBROW]]`、`[[HERO_TITLE]]`、`[[HERO_DESCRIPTION]]`、`[[HOME_FEATURED_LABEL]]`、`[[HOME_LATEST_LABEL]]`、`[[CONTACT_CHANNEL]]`

模板不包含注册、邀请或导流组件；部署前应替换占位符与示例内容。
