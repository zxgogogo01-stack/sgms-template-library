# 074-amber-broadcast（军哥 home_broadcast 忠实静态化）

## 适合什么站

适合播客、声音杂志和栏目型内容站：广播状态头、主打播放器、频道刻度、编号节目单与联播资源形成完整的电台首页。

## 复刻说明

- 首页沿用 `home_broadcast` 的 `bc-wrap`、`bc-head`、`bc-player`、`bc-dial`、`bc-programs` 和 `bc-network` 原始骨架、类名与节点顺序。
- Go 循环已静态化为三个频道、五期节目和三条联播资源；阅读时长、分类、日期和播放标识均保留。
- `public.css` 为军哥公共样式表的原样副本；`radio.css` 只保留已有电台外壳、配色、动画和响应式适配。
- 原旧版邀请码模块及复制逻辑已删除，首页不再插入源模板之外的转换组件。

## 页面与文件

`index.html`、`article.html`、`tool.html`、`legal.html`、`404.html`、`robots.txt`、`sitemap.xml`、`TEMPLATE.md`、`public.css`、`radio.css`、`radio.js`。

## 占位符清单（`[[X]]` 语法）

`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_TAGLINE]]`、`[[SITE_DESC]]`、`[[CONTACT_EMAIL]]`、`[[LANG]]`

## 可调项

- 节目单和联播资源可按真实内容增删，时长标注可替换或移除。
- 波形条数量与高度可在 CSS 的 `nth-child` 规则中调节，深浅色模式保持可用。
