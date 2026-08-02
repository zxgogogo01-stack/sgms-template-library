# 082-teal-orbitindex（军哥 home_orbit_index 忠实静态化）

## 适合什么站

适合专题、栏目和内容索引站：双环轨道、五个栏目节点、五条最新便签、中心置顶稿和三条阅读队列构成完整首页，窄屏自动转为顺序列表。

## 复刻说明

- 首页沿用 `home_orbit_index` 的 `orbit-index-page`、`oi-orbit-shell`、双层 `oi-orbit`、`oi-category-nodes`、`oi-latest-notes`、`oi-feature` 与 `oi-reading-queue` 原始骨架、类名和顺序。
- Go 条件与循环已静态化为五个栏目节点、五条最新便签、一条置顶稿和三张阅读卡；计数徽章、图例、日期、摘要与编号均保留。
- `public.css` 是军哥公共样式表的原样副本；`orbit.css` 只负责现有深青轨道、节点定位、深浅色和窄屏顺序化适配。
- 旧版邀请码轨道条及复制逻辑已删除，首页不再增加源模板之外的转化组件。

## 页面与文件

`index.html`、`article.html`、`tool.html`、`legal.html`、`404.html`、`robots.txt`、`sitemap.xml`、`TEMPLATE.md`、`public.css`、`orbit.css`、`orbit.js`

## 占位符清单（`~X~` 语法）

`~SITE_NAME~`、`~BRAND_EN~`、`~SITE_DOMAIN~`、`~SITE_TAGLINE~`、`~SITE_DESC~`、`~CONTACT_EMAIL~`、`~LANG~`

## 可调项

- 栏目节点与最新便签的坐标在 `.planetnode-N`、`.cometnote-N` 中调整；增减数量时同步维护定位类。
- 中心置顶稿和阅读队列可替换为真实内容；启用封面分支时填写真实尺寸、替代文本和链接。
