# 110-vermilion-couplet

## 来源与静态化口径

- 军哥动态模板：`home_couplet`
- 忠实保留居中牌匾页头、左右楹柱竖排文字、居中内容台、主打堂记、最新行列与底部胶囊。
- 原始 `cpl-wrap`、全部 `cpl-*` 类名、模块层级与顺序完整保留；Go 条件和循环展开为静态示例。

## 文件清单

- `index.html`：Couplet 首页完整静态化。
- `article.html`：上联、堂记三节与下联。
- `tool.html`：按空间、时节和祝愿切换的择联台。
- `legal.html`：楹联、图像、隐私与修订说明。
- `404.html`、`robots.txt`、`sitemap.xml`：静态站配套。
- `public.css`：军哥公共 `style.css` 的原样副本。
- `static/couplet.css`：补齐源包未提供的 `cpl-*` 专属样式与内页样式。
- `static/couplet.js`：移动导航及择联交互。

## 可替换占位符

`[[LANG]]`、`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_DESC]]`、`[[SITE_TAGLINE]]`、`[[HERO_EYEBROW]]`、`[[HERO_TITLE]]`、`[[HERO_DESCRIPTION]]`、`[[HOME_FEATURED_LABEL]]`、`[[HOME_LATEST_LABEL]]`、`[[CONTACT_CHANNEL]]`

部署前应替换占位符、示例楹联与题款说明。
