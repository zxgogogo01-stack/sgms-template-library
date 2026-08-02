# 072-rust-manual（军哥 home_manual 忠实静态化）

## 适合什么站

适合手册、知识库和教程型站点：左侧章节目录，中间为导语与编号条目流，右侧放置置顶条目和速查入口。

## 复刻说明

- 首页严格沿用 `home_manual` 的 `mn-wrap / mn-grid / mn-rail / mn-doc / mn-side` 三栏骨架、原始 `mn-*` 类名和节点层级。
- Go 条件与循环已静态化：章节、六条最新内容、置顶条目和三条速查入口均提供可直接替换的示例数据。
- `public.css` 为军哥公共样式表的原样副本；`css/handbook.css` 仅保留既有站点外壳和适配样式，不改变首页信息架构。
- 原旧版邀请码模块及复制逻辑已删除，首页不再添加源模板之外的转换组件。

## 页面与文件

`index.html`、`article.html`、`tool.html`、`legal.html`、`404.html`、`robots.txt`、`sitemap.xml`、`TEMPLATE.md`、`public.css`、`css/handbook.css`、`handbook.js`。

## 占位符清单（`~X~` 语法）

`~SITE_NAME~`、`~BRAND_EN~`、`~SITE_DOMAIN~`、`~SITE_TAGLINE~`、`~SITE_DESC~`、`~CONTACT_EMAIL~`、`~LANG~`

## 可调项

- 章节、条目、置顶内容和速查入口可替换为真实内容；编号会跟随 DOM 顺序自动更新。
- `tool.html` 的自查项目可增删，进度会按照项目总数自动折算。
