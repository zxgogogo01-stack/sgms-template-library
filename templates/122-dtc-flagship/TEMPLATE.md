# 122-dtc-flagship

## 来源与静态化口径

- 军哥动态模板：`home_dtc_flagship`
- 忠实保留零售旗舰结构：生活方式 Hero、系列大卡、畅销品、品牌数字、生活场景图集、评价配置槽、FAQ 与柔和联系卡。
- Hero 当前采用 DTC 专属光斑与浮动产品卡动画；图片与 SVG 分支作为静态备用保留，不使用工厂齿轮视觉。
- 源模板禁止虚构评价，因此 `dtc_testimonials` 结构保留在未渲染模板槽中，不填写假用户内容。
- 原始 `df-*`、`dt-*`、`da-*` 类名、模块顺序和零售叙事完整保留。

## 文件清单

- `index.html`：DTC Flagship 首页完整静态化。
- `article.html`：产品设计与使用场景品牌手记。
- `tool.html`：空间、节奏与送礼三种风格探索方式。
- `legal.html`：商品信息、色差、养护、配送与售后说明。
- `404.html`、`robots.txt`、`sitemap.xml`：静态站配套。
- `public.css`：军哥公共 `style.css` 原样副本。
- `static/dtc-flagship.css`：旗舰店首页与内页样式。
- `static/dtc-flagship.js`：移动导航、FAQ 单开与风格搭配交互。

## 可替换占位符

`[[LANG]]`、`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_DESC]]`、`[[SITE_TAGLINE]]`、`[[HERO_EYEBROW]]`、`[[HERO_TITLE]]`、`[[HERO_DESCRIPTION]]`、`[[CONTACT_CHANNEL]]`

部署前应替换占位符、真实商品、场景图片、品牌数据、真实评价和购物政策。
