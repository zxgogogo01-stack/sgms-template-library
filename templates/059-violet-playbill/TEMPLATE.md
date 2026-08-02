# 059-violet-playbill（忠实静态化自军哥 `home_poster`）

## 适合什么站

强调视觉记忆的返佣特刊站：全屏封面、精选详情、栏目瓦片、编号索引和横向专题条组成五折页面。

## 复刻口径

- 首页恢复源模板 `poster-scroll` 下五个 `poster-fold` 的原始顺序、层级和全部 `poster-*` 类名。
- 静态版本采用无封面首字生成分支，展开四行侧边标题、栏目、最新文章和专题卡。
- `public.css` 是军哥源库 `partials/style.css` 的原样副本；旧类仅用于复用现有静态样式，不替代源结构。
- Go 条件、循环、动态链接和时间方法已改为静态内容及本地链接；额外邀请码模块已移除。

## 页面与文件

`index.html` / `article.html` / `tool.html` / `legal.html` / `404.html` / `robots.txt` / `sitemap.xml` / `TEMPLATE.md`，以及 `public.css`、`assets/poster.css`、`assets/poster.js`。

## 首页占位符

`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_TAGLINE]]`、`[[SITE_DESC]]`、`[[SEO_TITLE]]`、`[[HERO_EYEBROW]]`、`[[HERO_TITLE]]`、`[[HERO_DESCRIPTION]]`、`[[HOME_FEATURED_LABEL]]`、`[[HOME_LATEST_LABEL]]`、`[[HOME_LINKS_LABEL]]`、`[[LANG]]`。

## 可调项

- 可增减 `poster-cat`、`poster-row` 和 `poster-card`，但应保留五折页面结构和源类名。
