# 104-amber-departure-board

## 来源与静态化口径

- 军哥动态模板：`home_departure`
- 忠实保留车站带状页头、信息牌表头、放大首班车、行列时刻表、换乘推荐与候车厅指路牌。
- 原始 `dp-wrap`、全部 `dp-*` 类名、模块层级与顺序完整保留；Go 条件和循环展开为静态示例。

## 文件清单

- `index.html`：Departure 首页完整静态化。
- `article.html`：三站行程正文。
- `tool.html`：按方向、时间和站台切换的信息检索。
- `legal.html`：示例信息、来源、隐私与修订说明。
- `404.html`、`robots.txt`、`sitemap.xml`：静态站配套。
- `public.css`：军哥公共 `style.css` 的原样副本。
- `static/departure.css`：补齐源包未提供的 `dp-*` 专属样式与内页样式。
- `static/departure.js`：移动导航及信息牌筛选交互。

## 可替换占位符

`[[LANG]]`、`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_DESC]]`、`[[SITE_TAGLINE]]`、`[[HERO_EYEBROW]]`、`[[HERO_TITLE]]`、`[[HERO_DESCRIPTION]]`、`[[HOME_FEATURED_LABEL]]`、`[[HOME_LATEST_LABEL]]`、`[[CONTACT_CHANNEL]]`

所有交通信息均为静态示例；部署前应替换占位符、内容和合规说明。
