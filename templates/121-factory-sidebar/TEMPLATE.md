# 121-factory-sidebar

## 来源与静态化口径

- 军哥动态模板：`home_factory_sidebar`
- 忠实保留侧栏目录结构：左侧常驻品牌、主菜单、分类树、动态入口和联系按钮；右侧为导语数字行、数据库式商品行及密集制造信息流。
- ≤920px 时侧栏折叠为顶部抽屉，使用脚本状态类控制；不改造成普通横向导航。
- Hero 的图片与机械动画分支、商品无封面生成块和空数据提示均作为静态备用保留。
- 原始 `fb-wrap`、全部 `fb-*` 与共享 `f-*` 类名、模块顺序完整保留。

## 文件清单

- `index.html`：Factory Sidebar 首页完整静态化。
- `article.html`：防护机箱选型技术说明。
- `tool.html`：环境、接口与验证三维度选型助手。
- `legal.html`：目录、规格、验证、变更和交付资料说明。
- `404.html`、`robots.txt`、`sitemap.xml`：静态站配套。
- `public.css`：军哥公共 `style.css` 原样副本。
- `static/factory-sidebar.css`：常驻侧栏、目录流和内页样式。
- `static/factory-sidebar.js`：移动抽屉、FAQ 单开和选型助手交互。

## 可替换占位符

`[[LANG]]`、`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_DESC]]`、`[[SITE_TAGLINE]]`、`[[HERO_EYEBROW]]`、`[[HERO_TITLE]]`、`[[HERO_DESCRIPTION]]`、`[[CONTACT_CHANNEL]]`

部署前应替换占位符、分类计数、产品参数、设施图片、项目资料和联系方式。
