# 106-vinyl-tracklist

## 来源与静态化口径

- 军哥动态模板：`home_tracklist`
- 忠实保留左侧专辑封面、CSS 黑胶盘、右侧分面导航、主打曲、编号曲目单与双列 Credits。
- 原始 `tl-wrap`、全部 `tl-*` 类名、模块层级与顺序完整保留；Go 条件和循环展开为静态示例。

## 文件清单

- `index.html`：Tracklist 首页完整静态化。
- `article.html`：单曲歌词与制作信息。
- `tool.html`：按时段、场景和节奏切换的选曲台。
- `legal.html`：作品、授权、隐私与修订说明。
- `404.html`、`robots.txt`、`sitemap.xml`：静态站配套。
- `public.css`：军哥公共 `style.css` 的原样副本。
- `static/tracklist.css`：补齐源包未提供的 `tl-*` 专属样式与内页样式。
- `static/tracklist.js`：移动导航及选曲交互。

## 可替换占位符

`[[LANG]]`、`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_DESC]]`、`[[SITE_TAGLINE]]`、`[[HERO_EYEBROW]]`、`[[HERO_TITLE]]`、`[[HERO_DESCRIPTION]]`、`[[HOME_FEATURED_LABEL]]`、`[[HOME_LATEST_LABEL]]`、`[[CONTACT_CHANNEL]]`

部署前应替换占位符、示例曲目与版权说明。
