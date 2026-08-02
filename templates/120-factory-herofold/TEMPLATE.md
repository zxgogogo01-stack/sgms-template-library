# 120-factory-herofold

## 来源与静态化口径

- 军哥动态模板：`home_factory_herofold`
- 忠实保留“门楣”结构：四周留边的大圆角首屏、压在视觉上的导航、离开首屏后实底吸顶，以及首屏后的常规工厂模块。
- Hero 当前采用机械图纸动画分支；`has-img` 与 `fh-hero-img` 图片分支作为备用保留，不填充虚假车间照片。
- 原始 `fh-wrap`、全部 `fh-*`、共享 `f-*` 类名、模块顺序和折叠首屏边界完整保留。

## 文件清单

- `index.html`：Factory Herofold 首页完整静态化。
- `article.html`：户外控制箱项目复盘。
- `tool.html`：图纸输入、制造条件和交付验证三阶段项目清单。
- `legal.html`：制造依据、变更、样件、检验和交付条款。
- `404.html`、`robots.txt`、`sitemap.xml`：静态站配套。
- `public.css`：军哥公共 `style.css` 原样副本。
- `static/factory-herofold.css`：折叠首屏、工厂模块与内页样式。
- `static/factory-herofold.js`：滚动导航、移动菜单、FAQ 单开与项目清单交互。

## 可替换占位符

`[[LANG]]`、`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_DESC]]`、`[[SITE_TAGLINE]]`、`[[HERO_EYEBROW]]`、`[[HERO_TITLE]]`、`[[HERO_DESCRIPTION]]`、`[[CONTACT_CHANNEL]]`

部署前应替换占位符、实际产品、设施图片、项目数据、资质与合作文件。
