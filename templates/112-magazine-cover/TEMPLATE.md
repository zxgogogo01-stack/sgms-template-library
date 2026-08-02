# 112-magazine-cover

## 来源与静态化口径

- 军哥动态模板：`home_cover`
- 忠实保留 3:4 杂志封面大卡、刊期行、900 字重刊名、主封面故事、四条封面线与条码。
- 原始 `cv-desk`、全部 `cv-*` 类名、模块层级与顺序完整保留；Go 条件和循环展开为静态示例。
- 推荐书架、后续目录和分类导航按源模板顺序落在封面下方，没有改造成常规卡片首页。

## 文件清单

- `index.html`：Cover 首页完整静态化。
- `article.html`：与封面视觉体系一致的长文页。
- `tool.html`：可切换主故事、刊名与封面线层级的排版台。
- `legal.html`：内容、图像、隐私与修订说明。
- `404.html`、`robots.txt`、`sitemap.xml`：静态站配套。
- `public.css`：军哥公共 `style.css` 的原样副本。
- `static/cover.css`：补齐源包未提供的 `cv-*` 专属样式与内页样式。
- `static/cover.js`：移动导航和排版台交互。

## 可替换占位符

`[[LANG]]`、`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_DESC]]`、`[[SITE_TAGLINE]]`、`[[HERO_EYEBROW]]`、`[[HERO_TITLE]]`、`[[HERO_DESCRIPTION]]`、`[[HOME_FEATURED_LABEL]]`、`[[HOME_LATEST_LABEL]]`、`[[CONTACT_CHANNEL]]`

部署前应替换占位符、示例文章、封面视觉与授权说明。
