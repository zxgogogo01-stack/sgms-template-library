# 062-straw-fanfold（忠实静态化自军哥 `home_deck`）

横向整屏卡组首页。保留源模板 `deck-shell`、`deck-track`、Hero 面板、内容面板、链接面板、编号和前后导航的原始结构与类名。动态面板计数、循环和链接已静态展开为四张卡；无封面分支使用首字生成图。`public.css` 为军哥公共样式原样副本，旧类只用于兼容现有静态样式。额外邀请码模块已移除。

套件包含 `index.html`、`article.html`、`tool.html`、`legal.html`、`404.html`、`robots.txt`、`sitemap.xml`、`public.css`、`assets/deckset.css` 与 `assets/deckset.js`。增减面板时需同步更新编号、总数和相邻锚点，并保留 `deck-*` 类名。
