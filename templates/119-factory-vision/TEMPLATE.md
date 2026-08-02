# 119-factory-vision

## 来源与静态化口径

- 军哥动态模板：`home_factory_vision`
- 忠实保留沉浸展示结构：全屏 Hero、透明悬浮导航、精选产品大卡、发丝线数字带、分类、流程、行业、全宽设施图带、FAQ、动态和页脚报价入口。
- Hero 当前采用源模板的机械图纸动画分支；`has-img` 与 `fv-hero-img` 图片分支作为静态备用保留，不填充虚假车间照片。
- 原始 `fv-wrap`、全部 `fv-*`、共享 `f-*` 类名、模块顺序和大留白视觉节奏完整保留。

## 文件清单

- `index.html`：Factory Vision 首页完整静态化。
- `article.html`：制造理念与长期一致性品牌文章。
- `tool.html`：产品意图、制造策略和长期交付三视角项目探索器。
- `legal.html`：资料、版本、验证、展示授权和持续交付说明。
- `404.html`、`robots.txt`、`sitemap.xml`：静态站配套。
- `public.css`：军哥公共 `style.css` 原样副本。
- `static/factory-vision.css`：沉浸首页、共享工厂模块与内页样式。
- `static/factory-vision.js`：悬浮导航、移动菜单、FAQ 单开和项目探索交互。

## 可替换占位符

`[[LANG]]`、`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_DESC]]`、`[[SITE_TAGLINE]]`、`[[HERO_EYEBROW]]`、`[[HERO_TITLE]]`、`[[HERO_DESCRIPTION]]`、`[[CONTACT_CHANNEL]]`

部署前应替换占位符、实际产品、设施图片、项目数据、合作资料和联系方式。
