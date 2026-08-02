# 053-axis-answers（忠实静态化自军哥 `home_axis`）

## 适合什么站

返佣答疑站或知识问答站：居中 Hero、单列中轴内容流，首条重点展示并附摘要。

## 复刻口径

- 首页保留源模板的 `axis-wrap`、`axis-hero`、`axis-list`、`axis-item`、`ax-*` 等原始类名和 DOM 顺序。
- `public.css` 是军哥源库 `partials/style.css` 的原样副本；`assets/main.css` 只补足独立静态站的页面外壳、响应式和源类名可用样式。
- Go 条件、循环、翻译方法和内容链接已转换为静态占位符、固定示例条目及本地页面链接。
- 首页不添加源模板没有的邀请码卡、营销卡等转化模块。

## 页面与文件

`index.html` / `article.html` / `tool.html` / `legal.html` / `404.html` / `robots.txt` / `sitemap.xml` / `TEMPLATE.md`，以及 `public.css`、`assets/main.css`、`assets/wire.js`。

## 占位符

`~SITE_NAME~`、`~BRAND_EN~`、`~SITE_DOMAIN~`、`~SITE_TAGLINE~`、`~SITE_DESC~`、`~SEO_TITLE~`、`~HERO_EYEBROW~`、`~HERO_TITLE~`、`~HERO_DESCRIPTION~`、`~HOME_LATEST_LABEL~`、`~CONTACT_EMAIL~`、`~LANG~`。

## 可调项

- `axis-item` 可按内容数量增减，首条保留 `is-feat` 与 `ax-x` 摘要。
- 可以替换文案、日期和链接，但不要重命名或移除首页源类名。
