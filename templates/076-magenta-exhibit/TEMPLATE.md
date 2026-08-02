# 076-magenta-exhibit（军哥 home_exhibit 忠实静态化）

## 适合什么站

适合策展、作品集和精选内容站：展签式标题、展厅分区、非对称作品墙与编号观展指南共同构成完整首页。

## 复刻说明

- 首页沿用 `home_exhibit` 的 `ex-wrap`、`ex-hero`、`ex-rooms`、`ex-show`、`ex-wall` 和 `ex-guide` 原始骨架、类名与信息顺序。
- Go 循环已静态化为一个主展、四件普通作品和三条观展指南；编号、展签、分类、日期及箭头均保留。
- `public.css` 为军哥公共样式表的原样副本；`assets/gallery.css` 只负责现有画廊外壳、配色、非对称栅格与响应式适配。
- 原旧版邀请码访客证及复制逻辑已删除，首页不再添加源模板之外的转换组件。

## 页面与文件

`index.html`、`article.html`、`tool.html`、`legal.html`、`404.html`、`robots.txt`、`sitemap.xml`、`TEMPLATE.md`、`public.css`、`assets/gallery.css`、`assets/gallery.js`。

## 占位符清单（`%%X%%` 语法）

`%%SITE_NAME%%`、`%%BRAND_EN%%`、`%%SITE_DOMAIN%%`、`%%SITE_TAGLINE%%`、`%%SITE_DESC%%`、`%%CONTACT_EMAIL%%`、`%%LANG%%`

## 可调项

- 作品墙可按真实内容增删，主展跨位与普通画框比例可在现有栅格中调整。
- 展期文案可按上线时间替换，深浅色模式保持可用。
