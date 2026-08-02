# 057-oat-profile（忠实静态化自军哥 `home_profile`）

## 适合什么站

个人主理人或策展型返佣站：居中人物名片、常用链接和最近更新组成轻量入口页。

## 复刻口径

- 首页保留源模板 `prof-wrap`、`prof-card`、`prof-links`、`prof-latest`、`prof-foot` 及全部子元素的原始类名与顺序。
- 静态版本采用源模板的首字头像和首字缩略图分支，链接与文章循环转换为固定示例条目。
- `public.css` 是军哥源库 `partials/style.css` 的原样副本；`card.css` 只补足静态站外壳、响应式和源类名样式。
- 动态链接、日期格式和翻译方法已替换为本地页面链接与静态文案；未保留源模板之外的邀请码条。

## 页面与文件

`index.html` / `article.html` / `tool.html` / `legal.html` / `404.html` / `robots.txt` / `sitemap.xml` / `TEMPLATE.md`，以及 `public.css`、`card.css`、`card.js`。

## 首页占位符

`~SITE_NAME~`、`~BRAND_EN~`、`~SITE_DOMAIN~`、`~SITE_TAGLINE~`、`~SITE_DESC~`、`~SEO_TITLE~`、`~HERO_EYEBROW~`、`~HERO_TITLE~`、`~HERO_DESCRIPTION~`、`~HOME_LINKS_LABEL~`、`~HOME_LATEST_LABEL~`、`~LANG~`。

## 可调项

- 可按实际栏目增减 `prof-pill`，按更新数量增减 `prof-post`。
- 可把生成头像或缩略图替换为真实封面，但不要重命名或移除首页源类名。
