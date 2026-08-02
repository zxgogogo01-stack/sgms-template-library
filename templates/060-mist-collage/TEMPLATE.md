# 060-mist-collage（忠实静态化自军哥 `home_collage`）

## 适合什么站

剪贴簿式返佣内容站：Hero、栏目标签云、精选拍立得、散落文章卡和便签入口组成内容墙。

## 复刻口径

- 首页恢复源模板 `col-wrap`、`col-hero`、`col-cloud`、`col-featwrap`、`col-scatter`、`col-tapes` 及子元素原始类名与顺序。
- 静态版本采用无封面首字生成分支，展开栏目、精选、文章卡和便签链接。
- `public.css` 是军哥源库 `partials/style.css` 的原样副本；旧类仅用于兼容现有静态样式，不替代源结构。
- Go 条件、循环、日期方法和动态链接已转换为静态示例及本地链接；额外邀请码模块已移除。

## 页面与文件

`index.html` / `article.html` / `tool.html` / `legal.html` / `404.html` / `robots.txt` / `sitemap.xml` / `TEMPLATE.md`，以及 `public.css`、`css/glue.css`、`glue.js`。

## 首页占位符

`{SITE_NAME}`、`{BRAND_EN}`、`{SITE_DOMAIN}`、`{SITE_TAGLINE}`、`{SITE_DESC}`、`{SEO_TITLE}`、`{HERO_EYEBROW}`、`{HERO_TITLE}`、`{HERO_DESCRIPTION}`、`{HOME_FEATURED_LABEL}`、`{HOME_LATEST_LABEL}`、`{HOME_LINKS_LABEL}`、`{LANG}`。

## 可调项

- 可增减 `col-tag`、`col-card` 和 `col-tape`，但应保留源区块顺序和原始类名。
