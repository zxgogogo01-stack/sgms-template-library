# 054-bands-primer（忠实静态化自军哥 `home_bands`）

## 适合什么站

返佣入门站或分层内容站：Hero、精选、常用入口、最新文章按四段横向色带依次展开。

## 复刻口径

- 首页保留源模板的 `bands-band`、`bands-hero`、`bands-featured`、`bands-links`、`bands-latest` 以及各子元素原始类名与排列顺序。
- `public.css` 是军哥源库 `partials/style.css` 的原样副本；`css/tone.css` 只补足独立静态站外壳、响应式和源类名对应样式。
- Go 条件分支、循环、动态链接和图片属性已转换为固定示例内容、本地链接与内联静态封面。
- 首页不添加源模板之外的邀请码条或营销模块。

## 页面与文件

`index.html` / `article.html` / `tool.html` / `legal.html` / `404.html` / `robots.txt` / `sitemap.xml` / `TEMPLATE.md`，以及 `public.css`、`css/tone.css`、`lift.js`。

## 首页占位符

`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_TAGLINE]]`、`[[SITE_DESC]]`、`[[SEO_TITLE]]`、`[[HERO_EYEBROW]]`、`[[HERO_TITLE]]`、`[[HERO_DESCRIPTION]]`、`[[HOME_FEATURED_LABEL]]`、`[[HOME_LINKS_LABEL]]`、`[[HOME_LATEST_LABEL]]`、`[[CONTACT_EMAIL]]`、`[[LANG]]`。

## 可调项

- 可按内容增减 `bands-link` 与 `bands-row`，但应保留源模板四个色带分区及其顺序。
- 可替换封面和文案，不要重命名或移除首页源类名。
