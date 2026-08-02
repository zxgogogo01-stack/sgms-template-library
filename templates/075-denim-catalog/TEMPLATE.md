# 075-denim-catalog（军哥 home_catalog 忠实静态化）

## 适合什么站

适合资源目录、工具集合和导购型站点：Hero 双栏展示橱窗，下面依次是部门导航、商品卡货架和文章导购列表。

## 复刻说明

- 首页沿用 `home_catalog` 的 `ct-wrap`、`ct-hero`、`ct-window`、`ct-depts`、`ct-products` 和 `ct-guides` 原始骨架、类名与信息顺序。
- Go 循环已静态化为三个部门、三张商品卡和五条导购；分类、日期、摘要和操作入口均保留。
- `public.css` 是军哥公共样式表的原样副本；`css/shelf.css` 仅承担现有外壳、配色与响应式适配。
- 原旧版邀请码吊牌及复制逻辑已删除，首页不再添加源模板之外的转换组件。

## 页面与文件

`index.html`、`article.html`、`tool.html`、`legal.html`、`404.html`、`robots.txt`、`sitemap.xml`、`TEMPLATE.md`、`public.css`、`css/shelf.css`、`shelf.js`。

## 占位符清单（`{X}` 单花括号语法）

`{SITE_NAME}`、`{BRAND_EN}`、`{SITE_DOMAIN}`、`{SITE_TAGLINE}`、`{SITE_DESC}`、`{CONTACT_EMAIL}`、`{LANG}`
（JSON-LD 内花括号为 JSON 语法，替换时按整词精确匹配）

## 可调项

- 货架、导购和部门导航可按真实内容增删，卡片顺序即页面陈列顺序。
- 橱窗卡可替换为最新或重点文章，深浅色模式保持可用。
