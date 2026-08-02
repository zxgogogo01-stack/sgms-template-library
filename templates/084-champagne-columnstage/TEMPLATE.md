# 084-champagne-columnstage（军哥 home_column_stage 忠实静态化）

## 适合什么站

适合栏目、杂志和专题内容站：宣言条、五根舞台立柱、居中置顶台柱和编号溢出行构成完整的专栏首页。

## 复刻说明

- 首页沿用 `home_column_stage` 的 `column-stage-page`、`cs-manifesto`、`cs-stage`、`cs-panel`、`cs-panel-copy`、各编号面板、`cs-panel-feature`、`cs-read` 与 `cs-overflow-row` 原始骨架、类名和顺序。
- Go 条件与循环已静态化为四根普通立柱、一根居中置顶台柱和三条溢出记录；编号、分类计数、日期、标题、摘要及阅读入口均保留。
- `public.css` 是军哥公共样式表的原样副本；`static/stage.css` 只负责现有香槟舞台、台柱反色、深浅色和响应式适配。
- 旧版邀请码香槟条及复制逻辑已删除，首页不再增加源模板之外的转化组件。

## 页面与文件

`index.html`、`article.html`、`tool.html`、`legal.html`、`404.html`、`robots.txt`、`sitemap.xml`、`TEMPLATE.md`、`public.css`、`static/stage.css`、`static/stage.js`

## 占位符清单（`[[X]]` 语法）

`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_TAGLINE]]`、`[[SITE_DESC]]`、`[[CONTACT_EMAIL]]`、`[[LANG]]`

## 可调项

- 五根立柱的顺序和内容可替换，台柱对应置顶稿；增减数量时同步调整网格列。
- 溢出记录可继续追加；启用封面分支时填写真实尺寸、替代文本和链接。
