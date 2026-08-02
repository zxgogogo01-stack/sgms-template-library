# 097-amber-lighttable

## 来源与静态化口径

- 军哥动态模板：`home_light_table`
- 忠实保留双栏 Hero、视觉说明、六项分类条、重点内容和八格接触印样。
- 原始 `light-table-page`、全部 `lt-*` 与动画类名、模块顺序完整保留；Go 条件和循环展开为静态示例。

## 文件清单

- `index.html`：Light Table 首页完整静态化。
- `article.html`：重复、偏离与顺序三轮看片札记。
- `tool.html`：三轮选片器。
- `legal.html`：来源、授权、隐私和修订说明。
- `404.html`、`robots.txt`、`sitemap.xml`：静态站配套。
- `public.css`：军哥公共 `style.css` 的原样副本。
- `static/lighttable.css`：补齐源包未提供的 `lt-*` 专属样式与内页样式。
- `static/lighttable.js`：移动导航及选片器交互。

## 可替换占位符

`[[LANG]]`、`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_DESC]]`、`[[SITE_TAGLINE]]`、`[[HERO_EYEBROW]]`、`[[HERO_TITLE]]`、`[[HERO_DESCRIPTION]]`、`[[HOME_FEATURED_LABEL]]`、`[[HOME_LATEST_LABEL]]`、`[[CONTACT_CHANNEL]]`

模板不包含注册、邀请或导流组件；部署前应替换占位符与示例内容。
