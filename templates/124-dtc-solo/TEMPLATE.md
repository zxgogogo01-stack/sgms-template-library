# 124-dtc-solo

## 来源与静态化口径

- 军哥动态模板：`home_dtc_solo`
- 忠实保留单品长转化流：痛点 Hero、商品视觉、属性标签、左右交替卖点、信任数字、完整规格、使用场景、评价、FAQ 与底部购买 CTA。
- Hero 采用无外部资源的 DTC 产品光影动画；图片和 SVG 分支以静态备用结构保留。
- 原始 `ds-*`、`dt-*`、`f-*` 类名、区块顺序和信息层级完整保留，仅将 Go 条件、循环与内容调用转为静态示例。

## 文件清单

- `index.html`：DTC Solo 单品长页完整静态化。
- `article.html`：产品设计、光线与材料手记。
- `tool.html`：雾灰、沙米、苔绿三色选择工具。
- `legal.html`：颜色、充电、防护、保修与退换说明。
- `404.html`、`robots.txt`、`sitemap.xml`：静态站配套。
- `public.css`：军哥公共 `style.css` 原样副本。
- `static/dtc-solo.css`：单品首页与内页样式。
- `static/dtc-solo.js`：移动导航、FAQ 单开与颜色选择交互。

## 可替换占位符

`[[LANG]]`、`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_DESC]]`、`[[SITE_TAGLINE]]`、`[[HERO_EYEBROW]]`、`[[HERO_TITLE]]`、`[[HERO_DESCRIPTION]]`、`[[PRODUCT_NAME]]`、`[[CONTACT_CHANNEL]]`

部署前应替换占位符、真实商品图片、规格、统计数据、评价、联系渠道和当地销售政策。
