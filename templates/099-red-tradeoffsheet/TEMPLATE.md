# 099-red-tradeoffsheet

## 来源与静态化口径

- 军哥动态模板：`home_tradeoff_sheet`
- 忠实保留双栏 Hero、重点决定、全部视角与分类镜头、表格式最新清单。
- 原始 `tradeoff-sheet-page`、全部 `ts-*` 与动画类名、模块顺序完整保留；Go 条件和循环展开为静态示例。

## 文件清单

- `index.html`：Tradeoff Sheet 首页完整静态化。
- `article.html`：约束、代价与可逆性决策札记。
- `tool.html`：三步权衡器。
- `legal.html`：依据、边界、隐私和修订说明。
- `404.html`、`robots.txt`、`sitemap.xml`：静态站配套。
- `public.css`：军哥公共 `style.css` 的原样副本。
- `static/tradeoff.css`：补齐源包未提供的 `ts-*` 专属样式与内页样式。
- `static/tradeoff.js`：移动导航及三步权衡器交互。

## 可替换占位符

`[[LANG]]`、`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_DESC]]`、`[[SITE_TAGLINE]]`、`[[HERO_EYEBROW]]`、`[[HERO_TITLE]]`、`[[HERO_DESCRIPTION]]`、`[[HOME_FEATURED_LABEL]]`、`[[HOME_LATEST_LABEL]]`、`[[CONTACT_CHANNEL]]`

模板不包含注册、邀请或导流组件；部署前应替换占位符与示例内容。
