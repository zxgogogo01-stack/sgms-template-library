# 073-berry-masonry（军哥 home_masonry 忠实静态化）

## 适合什么站

适合内容聚合、教程和灵感类站点：Hero 下接分类胶囊与精选宽卡，普通文章和速查入口在 CSS 多列瀑布流中混排。

## 复刻说明

- 首页沿用 `home_masonry` 的 `ms-wrap`、`ms-hero`、`ms-chips`、`ms-feat`、`ms-stream` 和 `ms-flow` 原始骨架与类名。
- Go 循环已静态化为三个分类、一个精选宽卡、六张文章卡和三张速查卡；图文卡仍使用 `break-inside` 保护的多列布局。
- `public.css` 是军哥公共样式表的原样副本；`static/flow.css` 仅承担现有外壳、配色与响应式适配，不改变源模板信息架构。
- 原旧版邀请码模块及复制逻辑已删除，首页不再添加源模板之外的转换组件。

## 页面与文件

`index.html`、`article.html`、`tool.html`、`legal.html`、`404.html`、`robots.txt`、`sitemap.xml`、`TEMPLATE.md`、`public.css`、`static/flow.css`、`static/flow.js`。

## 占位符清单（`__x__` 小写双下划线语法）

`__site_name__`、`__brand_en__`、`__site_domain__`、`__site_tagline__`、`__site_desc__`、`__contact_email__`、`__lang__`

## 可调项

- 卡片可按真实内容增删；`brick-tall` 和 `brick-short` 可继续调节错落节奏。
- 速查卡可替换为工具、专题或固定页面；深浅色模式保持可用。
