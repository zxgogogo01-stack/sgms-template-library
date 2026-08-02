# 109-stone-archway

## 来源与静态化口径

- 军哥动态模板：`home_archway`
- 忠实保留居中门坊、拱门线框精选、菱形花标条目行与居中双列小卡。
- 原始 `aw-wrap`、全部 `aw-*` 类名、模块层级与顺序完整保留；Go 条件和循环展开为静态示例。

## 文件清单

- `index.html`：Archway 首页完整静态化。
- `article.html`：门外、门中、门内三节正文。
- `tool.html`：按空间、材料和年代切换的寻径导览。
- `legal.html`：建筑、图像、隐私与修订说明。
- `404.html`、`robots.txt`、`sitemap.xml`：静态站配套。
- `public.css`：军哥公共 `style.css` 的原样副本。
- `static/archway.css`：补齐源包未提供的 `aw-*` 专属样式与内页样式。
- `static/archway.js`：移动导航及寻径交互。

## 可替换占位符

`[[LANG]]`、`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_DESC]]`、`[[SITE_TAGLINE]]`、`[[HERO_EYEBROW]]`、`[[HERO_TITLE]]`、`[[HERO_DESCRIPTION]]`、`[[HOME_FEATURED_LABEL]]`、`[[HOME_LATEST_LABEL]]`、`[[CONTACT_CHANNEL]]`

部署前应替换占位符、示例内容与资料说明。
