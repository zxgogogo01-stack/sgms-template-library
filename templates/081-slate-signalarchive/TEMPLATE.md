# 081-slate-signalarchive（军哥 home_signal_archive 忠实静态化）

## 适合什么站

适合档案、研究和信息追踪站：统计 Hero、置顶卷宗、入档时间线、主题柜别和带分类导航的卷宗列表组成完整首页。

## 复刻说明

- 首页沿用 `home_signal_archive` 的 `signal-archive-page`、`sa-hero`、`sa-stats`、`sa-feature`、`sa-timeline`、`sa-topics`、`sa-list` 与 `sa-row` 原始骨架、类名和顺序。
- Go 条件与循环已静态化为三项统计、一条置顶卷宗、五条时间线、三个主题柜别和五条卷宗记录；日期、分类、摘要和“查看全部”入口均保留。
- `public.css` 是军哥公共样式表的原样副本；`assets/archive.css` 只负责现有灰蓝档案外壳、火漆点缀、深浅色和响应式适配。
- 旧版邀请码火漆条及复制逻辑已删除，首页不再增加源模板之外的转化组件。

## 页面与文件

`index.html`、`article.html`、`tool.html`、`legal.html`、`404.html`、`robots.txt`、`sitemap.xml`、`TEMPLATE.md`、`public.css`、`assets/archive.css`、`assets/archive.js`

## 占位符清单（`%%X%%` 语法）

`%%SITE_NAME%%`、`%%BRAND_EN%%`、`%%SITE_DOMAIN%%`、`%%SITE_TAGLINE%%`、`%%SITE_DESC%%`、`%%CONTACT_EMAIL%%`、`%%LANG%%`

## 可调项

- 卷宗列表、时间线和柜别可按真实内容同步增删，统计三联按真实数量更新。
- 分类导航在静态站中指向对应归档页；启用封面分支时应填写真实尺寸、替代文本和链接。
