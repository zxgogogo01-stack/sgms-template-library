# 052-split-observer（忠实静态化自军哥 `home_split`）

## 适合什么站

返佣平台观察站、评测型内容站：左文右特稿分屏首屏，下接带编号的最新内容清单。

## 复刻口径

- 首页恢复并保留源模板的 `split-*`、`sr-*`、`btn` 原始类名和主要 DOM 层级。
- `public.css` 是军哥源库 `partials/style.css` 的原样副本，用于承接源模板公共样式。
- `style.css` 只补足这一套模板的页面布局、导航、页脚及静态站响应式表现，不改变源版式方向。
- Go 动态字段、条件分支和循环已改成静态占位符及固定示例内容；首页不额外加入邀请卡、营销卡等源模板没有的模块。

## 页面与文件

`index.html` / `article.html` / `tool.html` / `legal.html` / `404.html` / `robots.txt` / `sitemap.xml` / `TEMPLATE.md`，以及 `public.css`、`style.css`、`boot.js`。

## 占位符

`~SITE_NAME~`、`~BRAND_EN~`、`~SITE_DOMAIN~`、`~SITE_TAGLINE~`、`~SITE_DESC~`、`~SEO_TITLE~`、`~HERO_EYEBROW~`、`~HERO_TITLE~`、`~HERO_DESCRIPTION~`、`~HOME_FEATURED_LABEL~`、`~HOME_LATEST_LABEL~`、`~FOOTER_NOTE~`、`~CONTACT_EMAIL~`、`~LANG~`。

## 可调项

- 静态文章行可以按实际内容数量增减，但应保留源模板四列清单结构。
- 站点色彩、字体与响应式细节集中在 `style.css`；不要重命名或移除首页的源类名。
