# 067-midnight-constellation（忠实静态化自军哥 home_constellation）

## 适合什么站

适合目录、知识库和文章聚合站点：Hero、栏目筛选、关键词搜索、卡片网格与空态提示组成一张可交互的内容星图。

## 复刻说明

- 首页完整保留军哥 `home_constellation` 的 `cst-*` 类名、嵌套关系与顺序：标题区、筛选组、卡片网格和空态提示。
- 筛选项恢复为源模板的链接元素；搜索框保留源模板的 `hidden` 初始状态，由本地脚本增强后显示，禁用脚本时仍可使用分类链接。
- `public.css` 是军哥公共样式原样副本；`assets/star.css` 继续提供午夜蓝与星光金视觉，旧类名只作兼容样式钩子。
- Go 循环、条件、字段和内容 URL 已静态化，所有卡片继续使用 `data-cat` 与 `data-text` 驱动筛选和搜索。

## 静态化边界

- 不加入源模板不存在的邀请码、复制按钮或营销彗星条。
- 示例卡片链接指向套件内文章页；生产接入时同步替换链接、分类和搜索文本。

## 页面与文件

`index.html` / `article.html` / `tool.html` / `legal.html` / `404.html` / `robots.txt` / `sitemap.xml`；样式为 `public.css` 与 `assets/star.css`，交互为 `assets/star.js`。

## 占位符清单（`~X~` 语法）

`~SITE_NAME~`、`~BRAND_EN~`、`~SITE_DOMAIN~`、`~SITE_TAGLINE~`、`~SITE_DESC~`、`~CONTACT_EMAIL~`、`~LANG~`

## 可调项

- 卡片按真实文章铺开时同步维护 `data-cat` / `data-text`，栏目计数也应同步更新。
- 分类链接的 `href` 应在上线时替换为真实栏目地址；脚本只增强当前页面筛选，不阻断正常导航语义。
