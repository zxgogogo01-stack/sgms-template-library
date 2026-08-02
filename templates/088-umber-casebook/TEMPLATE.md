# 088-umber-casebook

## 来源与静态化口径

- 军哥动态模板：`home_casebook`
- 忠实保留原版提案区、编号主案例、六行业索引、四个精选案例和案例台账结构。
- 原始 `casebook-page`、`cb-*` 类名与模块顺序全部保留；Go 条件、循环和翻译字段展开为静态示例。

## 文件清单

- `index.html`：Casebook 首页完整静态化。
- `article.html`：时间线与证据清单案例正文。
- `tool.html`：三类问题可切换的核验清单。
- `legal.html`：案例选取、核验、匿名与免责说明。
- `404.html`、`robots.txt`、`sitemap.xml`：静态站配套文件。
- `public.css`：军哥源库公共 `style.css` 的原样副本。
- `static/casebook.css`：补齐源包未提供的 `cb-*` 专属样式与内页样式。
- `static/casebook.js`：移动导航及核验清单交互。

## 可替换占位符

`[[LANG]]`、`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_DESC]]`、`[[SITE_TAGLINE]]`、`[[HERO_EYEBROW]]`、`[[HERO_TITLE]]`、`[[HERO_DESCRIPTION]]`、`[[HOME_FEATURED_LABEL]]`、`[[HOME_LATEST_LABEL]]`、`[[CONTACT_CHANNEL]]`

模板不包含注册、邀请或导流组件；部署前应替换占位符与示例案例数据。
