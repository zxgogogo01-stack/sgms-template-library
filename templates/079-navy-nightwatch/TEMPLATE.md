# 079-navy-nightwatch（军哥 home_night_watch 忠实静态化）

## 适合什么站

适合监测、快讯和持续更新型内容站：夜航 Hero、现场便签、脉冲快讯、值守面板和派报侧栏构成完整首页。

## 复刻说明

- 首页沿用 `home_night_watch` 的 `night-watch-page`、`nw-hero`、`nw-pulse`、`nw-board`、`nw-row` 和 `nw-dispatch` 原始骨架、类名与顺序。
- Go 循环已静态化为三条脉冲快讯、五条值守记录和一个派报侧栏；分类、编号、摘要及日期均保留。
- `public.css` 是军哥公共样式表的原样副本；`static/watch.css` 仅承担现有夜航外壳、深浅色配色、叠角便签与响应式适配。
- 原旧版邀请码灯牌及复制逻辑已删除，首页不再添加源模板之外的转换组件。

## 页面与文件

`index.html`、`article.html`、`tool.html`、`legal.html`、`404.html`、`robots.txt`、`sitemap.xml`、`TEMPLATE.md`、`public.css`、`static/watch.css`、`static/watch.js`。

## 占位符清单（`[[X]]` 语法）

`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_TAGLINE]]`、`[[SITE_DESC]]`、`[[CONTACT_EMAIL]]`、`[[LANG]]`

## 可调项

- 值守记录与脉冲条可按真实内容增删，现场便签与派报内容可替换。
- 深浅色模式保持可用，派报侧栏可固定为最新或重点内容。
