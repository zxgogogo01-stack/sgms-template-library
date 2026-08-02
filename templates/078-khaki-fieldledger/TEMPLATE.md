# 078-khaki-fieldledger（军哥 home_field_ledger 忠实静态化）

## 适合什么站

适合研究记录、调查简报和高密度资料站：三格刊头、分类信号条、置顶记录、编号台账行与实时索引侧栏组成完整首页。

## 复刻说明

- 首页沿用 `home_field_ledger` 的 `field-ledger-page`、`fl-mast`、`fl-signals`、`fl-content`、`fl-stream` 和 `fl-index` 原始骨架、类名与顺序。
- Go 循环已静态化为三个分类信号、一个置顶记录、五条台账行和五条实时索引，编号、分类与日期均对应源字段。
- `public.css` 是军哥公共样式表的原样副本；`css/field.css` 仅承担现有外壳、卡其配色、粗线框与响应式适配。
- 原旧版邀请码通行条及复制逻辑已删除，首页不再添加源模板之外的转换组件。

## 页面与文件

`index.html`、`article.html`、`tool.html`、`legal.html`、`404.html`、`robots.txt`、`sitemap.xml`、`TEMPLATE.md`、`public.css`、`css/field.css`、`field.js`。

## 占位符清单（`__x__` 小写双下划线语法）

`__site_name__`、`__brand_en__`、`__site_domain__`、`__site_tagline__`、`__site_desc__`、`__contact_email__`、`__lang__`

## 可调项

- 台账行、分类信号和实时索引可按真实内容增删，计数窗数字应同步为真实总数。
- 侧栏默认显示最近五条记录，深浅色模式保持可用。
