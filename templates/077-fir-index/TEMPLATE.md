# 077-fir-index（军哥 home_index 忠实静态化）

## 适合什么站

适合资料库、知识索引和高密度内容站：Hero 文案配散点快捷入口，正文用编号、标题、栏目和日期组成四列表格。

## 复刻说明

- 首页沿用 `home_index` 的 `index-wrap`、`index-head`、`index-scatter`、`index-table` 和 `index-item` 原始骨架、类名与信息顺序。
- Go 循环已静态化为五个散点入口和八条索引记录；首条精选内容、编号、栏目与日期均按源模板字段落位。
- `public.css` 是军哥公共样式表的原样副本；本地 `style.css` 只保留现有站点外壳、散点布局、表格样式与响应式适配。
- 原旧版邀请码条及复制逻辑已删除，首页不再添加源模板之外的转换组件。

## 页面与文件

`index.html`、`article.html`、`tool.html`、`legal.html`、`404.html`、`robots.txt`、`sitemap.xml`、`TEMPLATE.md`、`public.css`、`style.css`、`roster.js`。

## 占位符清单（`~X~` 语法）

`~SITE_NAME~`、`~BRAND_EN~`、`~SITE_DOMAIN~`、`~SITE_TAGLINE~`、`~SITE_DESC~`、`~CONTACT_EMAIL~`、`~LANG~`

## 可调项

- 索引行和散点入口可按真实内容增删，新增静态行时需顺延编号。
- 栏目和日期在窄屏会按既有规则收纳，深浅色模式保持可用。
