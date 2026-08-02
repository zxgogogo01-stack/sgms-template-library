# 058-graphite-line（忠实静态化自军哥 `home_timeline`）

## 适合什么站

费率、返佣或政策变动档案站：Hero 与分类筛选后，以纵向时间轴展示置顶记录和最新更新。

## 复刻口径

- 首页恢复源模板 `tl-wrap`、`tl-hero`、`tl-filters`、`tl-spine`、`tl-node`、`tl-links`、`tl-foot` 的原始层级、类名和顺序。
- 静态展开分类、精选节点、普通节点和常用链接；精选封面采用源模板的首字生成分支。
- `public.css` 是军哥源库 `partials/style.css` 的原样副本；既有旧类仅作为静态套件样式兼容，不替代或改变源类结构。
- Go 条件、循环、时间格式及动态链接已改为静态示例和本地链接；源模板之外的邀请码模块已移除。

## 页面与文件

`index.html` / `article.html` / `tool.html` / `legal.html` / `404.html` / `robots.txt` / `sitemap.xml` / `TEMPLATE.md`，以及 `public.css`、`css/line.css`、`line.js`。

## 首页占位符

`__site_name__`、`__brand_en__`、`__site_domain__`、`__site_tagline__`、`__site_desc__`、`__seo_title__`、`__hero_eyebrow__`、`__hero_title__`、`__hero_description__`、`__home_featured_label__`、`__home_latest_label__`、`__home_links_label__`、`__lang__`。

## 可调项

- 可增减 `tl-chip`、`tl-node` 和 `tl-link`，但应保留时间轴语义和源类名。
