# 056-pine-board（忠实静态化自军哥 `home_board`）

## 适合什么站

返佣目录或知识看板站：Hero、置顶横幅、栏目泳道和常用入口依次展开。

## 复刻口径

- 首页恢复源模板 `board-wrap`、`board-hero`、`board-banner`、`board-lanes`、`board-links` 及子元素原始类名和层级。
- 静态版本选用源模板的知识分组分支，展开三条泳道；精选横幅采用源模板的无图片首字生成分支。
- `public.css` 是军哥源库 `partials/style.css` 的原样副本；`static/app.css` 只补足静态站外壳、响应式和源类名样式。
- Go 条件、循环、时间格式和动态链接已转换为固定示例内容及本地链接；未保留源模板之外的邀请码模块。

## 页面与文件

`index.html` / `article.html` / `tool.html` / `legal.html` / `404.html` / `robots.txt` / `sitemap.xml` / `TEMPLATE.md`，以及 `public.css`、`static/app.css`、`static/app.js`。

## 首页占位符

`%%SITE_NAME%%`、`%%BRAND_EN%%`、`%%SITE_DOMAIN%%`、`%%SITE_TAGLINE%%`、`%%SITE_DESC%%`、`%%SEO_TITLE%%`、`%%HERO_EYEBROW%%`、`%%HERO_TITLE%%`、`%%HERO_DESCRIPTION%%`、`%%HOME_FEATURED_LABEL%%`、`%%HOME_LATEST_LABEL%%`、`%%HOME_LINKS_LABEL%%`、`%%LANG%%`。

## 可调项

- 可按栏目增减 `board-lane` 和其中的 `board-card`，空栏目使用源模板的 `board-empty`。
- 可替换精选封面与内容，但不要重命名或移除首页源类名。
