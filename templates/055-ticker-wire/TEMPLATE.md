# 055-ticker-wire（忠实静态化自军哥 `home_ticker`）

## 适合什么站

费率行情快讯站：顶部循环栏目条、双栏 Hero、按时间排列的快讯主栏，以及分类和常用入口侧栏。

## 复刻口径

- 首页保留源模板 `tick-marquee`、`tick-hero`、`tick-feat`、`tick-main`、`tick-side` 等原始结构、类名和顺序。
- 静态版本选用“有精选、有分类、有常用链接”的源模板合法分支；跑马灯内容按源逻辑重复两份。
- `public.css` 是军哥源库 `partials/style.css` 的原样副本；`skin.css` 只补足独立静态站外壳、响应式和源类名样式。
- Go 条件、循环、日期方法和动态内容链接已转换为固定示例条目及本地页面链接；未保留源模板之外的邀请码模块。

## 页面与文件

`index.html` / `article.html` / `tool.html` / `legal.html` / `404.html` / `robots.txt` / `sitemap.xml` / `TEMPLATE.md`，以及 `public.css`、`skin.css`、`deck.js`。

## 首页占位符

`{SITE_NAME}`、`{BRAND_EN}`、`{SITE_DOMAIN}`、`{SITE_TAGLINE}`、`{SITE_DESC}`、`{SEO_TITLE}`、`{HERO_EYEBROW}`、`{HERO_TITLE}`、`{HERO_DESCRIPTION}`、`{HOME_FEATURED_LABEL}`、`{HOME_LATEST_LABEL}`、`{HOME_LINKS_LABEL}`、`{CONTACT_EMAIL}`、`{LANG}`。

## 可调项

- 可按内容增减 `tick-chip`、`tick-row`、`tick-board-row` 和 `tick-link`，但不要重命名首页源类名。
- 若改用源模板的无精选分支，可用 `tick-board` 替换右侧 `tick-feat`。
