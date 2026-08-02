# 111-altar-triptych

## 来源与静态化口径

- 军哥动态模板：`home_triptych`
- 忠实保留楣梁页头、左翼/中央拱顶/右翼三联结构、中央主画与两翼紧凑条目列。
- 原始 `tp-wrap`、全部 `tp-*` 类名、模块层级与顺序完整保留；Go 条件和循环展开为静态示例。

## 文件清单

- `index.html`：Triptych 首页完整静态化。
- `article.html`：左翼、中央与右翼三联正文。
- `tool.html`：按叙事、色调和视角切换的三联导览。
- `legal.html`：作品、图像、隐私与修订说明。
- `404.html`、`robots.txt`、`sitemap.xml`：静态站配套。
- `public.css`：军哥公共 `style.css` 的原样副本。
- `static/triptych.css`：补齐源包未提供的 `tp-*` 专属样式与内页样式。
- `static/triptych.js`：移动导航及导览交互。

## 可替换占位符

`[[LANG]]`、`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_DESC]]`、`[[SITE_TAGLINE]]`、`[[HERO_EYEBROW]]`、`[[HERO_TITLE]]`、`[[HERO_DESCRIPTION]]`、`[[HOME_FEATURED_LABEL]]`、`[[HOME_LATEST_LABEL]]`、`[[CONTACT_CHANNEL]]`

部署前应替换占位符、示例作品与授权说明。
