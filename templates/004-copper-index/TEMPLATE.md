# 004-copper-index

## 适合什么站

分类目录 / 导航站 / 研究资源库：分区块陈列带状态的条目卡片，顶部有分区快捷索引。

## 结构特点

- 铜版目录式双层网格：左侧分类标识、右侧三列资源条目；移动端按阅读顺序纵向展开
- BEM 类名（`ridge__*`、`shelf__*`、`alpha-rail__*`），保留原始结构，便于批量增删条目
- 首屏巨型索引水印 + 吸顶分区导航（锚点跳转）
- `assets/` 下 root / grids / skin / boutique 四个样式文件 + 单 IIFE 的 nav.js
- 断点为 820px；桌面、平板与手机均无横向溢出，深色模式自适应
- article / legal 使用深色铜版阅读版式，tool 使用浅色双栏工作台，404 使用独立故障页构图
- 收录说明包含维护概况、四步检查、状态体系与纠错入口
- 链接整理台支持忽略末尾斜线、移除锚点、无效过滤、错误/成功/清空状态

## 占位符清单（`{{X}}` 语法）

`{{SITE_NAME}}`、`{{SITE_DOMAIN}}`、`{{SITE_TAGLINE}}`、`{{SITE_DESC}}`、`{{CONTACT_EMAIL}}`、`{{LANG}}`

## 哪些区块可删

- 字母索引 `<nav class="alpha-rail">` 可删（分区少时建议删）
- 每个 `<section class="shelf">` 是独立分区，可任意增删；条目卡 `<a class="shelf__box">` 复制即可扩容
- tool.html（链接去重）可删，同时移除导航与 sitemap 对应项

## 备注

演示条目统一指向 article.html，建站时替换为真实外链或详情页。2026-08 已完成 index / article / tool / legal / 404、深色与移动端的整套精品化复核。
