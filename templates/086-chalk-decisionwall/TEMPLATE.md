# 086-chalk-decisionwall

## 来源

- 军哥动态模板：`home_decision_wall`
- 静态化原则：保留原版页面骨架、原始类名、Web3 Guides 页头/页脚结构与公共样式。
- 动态的 `if`、`with`、`range` 数据已展开为静态示例内容。

## 文件

- `index.html`：忠实静态化的 Decision Wall 首页
- `article.html`：文章页
- `tool.html`：返佣后净手续费计算器
- `legal.html`：利益披露与风险提示
- `404.html`、`robots.txt`、`sitemap.xml`
- `assets/public.css`：军哥模板库原始公共样式的原样副本
- `assets/wall.css`：原包未提供 Decision Wall 专属 CSS，因此仅补充该布局所需样式
- `assets/wall.js`：移动导航和静态计算器交互

## 占位符

`%%LANG%%`、`%%SITE_NAME%%`、`%%BRAND_EN%%`、`%%SITE_DOMAIN%%`、`%%SITE_DESC%%`、`%%SEO_TITLE%%`、`%%HERO_EYEBROW%%`、`%%HERO_TITLE%%`、`%%HERO_DESCRIPTION%%`、`%%HOME_FEATURED_LABEL%%`、`%%HOME_LATEST_LABEL%%`、`%%ALL_CONTENT_TITLE%%`、`%%FOOTER_NOTE%%`、`%%YEAR%%`

## 注意

军哥压缩包只包含一个旧版通用 `style.css`，没有 `dw-*`、`wg-*` 等新布局专属 CSS。本模板已原样带入该公共样式，并以 `wall.css` 补全缺失规则；未对原版布局和类名进行重设计。
