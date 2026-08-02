# 123-dtc-lookbook

## 来源与静态化口径

- 军哥动态模板：`home_dtc_lookbook`
- 忠实保留画册结构：小刊头、通栏视觉墙、商品封面墙备用分支、按系列分组的画面陈列和极简联系入口。
- 图集是首屏主角，商品信息保持克制；不加入旗舰店的畅销、数字、评价或 FAQ 模块。
- 原始 `dl-wrap`、全部 `dl-*` 与共享 `dt-*` 类名、章节顺序和视觉比例完整保留。

## 文件清单

- `index.html`：DTC Lookbook 首页完整静态化。
- `article.html`：Soft Form 系列编辑手记。
- `tool.html`：柔和、中性与温暖三组画册色彩索引。
- `legal.html`：图像、颜色、系列状态和授权说明。
- `404.html`、`robots.txt`、`sitemap.xml`：静态站配套。
- `public.css`：军哥公共 `style.css` 原样副本。
- `static/dtc-lookbook.css`：画册墙、系列章节与内页样式。
- `static/dtc-lookbook.js`：移动索引与色彩切换交互。

## 可替换占位符

`[[LANG]]`、`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_DESC]]`、`[[SITE_TAGLINE]]`、`[[HERO_EYEBROW]]`、`[[HERO_TITLE]]`、`[[HERO_DESCRIPTION]]`、`[[CONTACT_CHANNEL]]`

部署前应替换占位符、真实画册图片、系列商品、编辑内容和授权说明。
