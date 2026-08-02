# 083-lime-typecascade（军哥 home_type_cascade 忠实静态化）

## 适合什么站

适合新闻、专栏和标题驱动型内容站：置顶大标题、01–06 编号瀑布、逐级缩进行和栏目索引形成强烈但可读的排版层级。

## 复刻说明

- 首页沿用 `home_type_cascade` 的 `type-cascade-page`、`tc-cascade`、`tc-feature`、`tc-index`、`tc-feature-main`、`tc-feature-detail`、`tc-rows`、`tc-row` 与 `tc-category-index` 原始骨架、类名和顺序。
- Go 条件与循环已静态化为一条置顶稿、五条编号内容行和五项栏目索引；分类、标题、日期、摘要及阅读入口均保留。
- `public.css` 是军哥公共样式表的原样副本；`css/cascade.css` 只负责现有铅字瀑布、荧光柠点缀、递进缩进、深浅色和窄屏适配。
- 旧版邀请码硬阴影条及复制逻辑已删除，首页不再增加源模板之外的转化组件。

## 页面与文件

`index.html`、`article.html`、`tool.html`、`legal.html`、`404.html`、`robots.txt`、`sitemap.xml`、`TEMPLATE.md`、`public.css`、`css/cascade.css`、`cascade.js`

## 占位符清单（`__x__` 小写双下划线语法）

`__site_name__`、`__brand_en__`、`__site_domain__`、`__site_tagline__`、`__site_desc__`、`__contact_email__`、`__lang__`

## 可调项

- 瀑布行可按真实内容铺开，编号顺延并循环使用缩进类；手机端保持缩进归零。
- 荧光柠可通过 `--limehi` 与 `--limehi-deep` 整体换色；启用封面分支时填写真实尺寸、替代文本和链接。
