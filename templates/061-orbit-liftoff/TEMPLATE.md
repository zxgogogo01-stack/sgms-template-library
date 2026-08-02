# 061-orbit-liftoff（忠实静态化自军哥 `home_liftoff`）

发射/推进叙事型首页。保留源模板的 `lo-hero`、进度供给条、阶段卡、快捷入口和最新简报结构及全部原始类名。静态版本选用无封面生成图分支，将动态分类、链接和文章循环展开为示例内容；`public.css` 为军哥公共样式原样副本，旧类只承担现有静态样式兼容。已移除源模板之外的邀请码模块。

套件包含 `index.html`、`article.html`、`tool.html`、`legal.html`、`404.html`、`robots.txt`、`sitemap.xml`、`public.css`、`style.css` 与 `ignite.js`。可替换 `%%SITE_*%%`、`%%HERO_*%%`、`%%HOME_*%%` 等占位符；增减内容时保留 `lo-*` 层级和类名。
