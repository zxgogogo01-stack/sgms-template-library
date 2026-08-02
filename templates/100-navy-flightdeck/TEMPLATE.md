# 100-navy-flightdeck

## 来源与静态化口径

- 军哥动态模板：`home_pilot_flight_deck`
- 忠实保留 Hero 发布信息、四步工作流、演示区、六项能力、信任区、三项案例、四条资源和三平台下载区。
- 原始 `pfd-page`、全部 `pfd-*` 类名、模块层级与顺序完整保留；Go 条件和循环展开为静态示例。

## 文件清单

- `index.html`：Pilot Flight Deck 首页完整静态化。
- `article.html`：准备、执行与交接任务简报。
- `tool.html`：任务、风险与回退航前检查。
- `legal.html`：数据、安全、责任和修订说明。
- `404.html`、`robots.txt`、`sitemap.xml`：静态站配套。
- `public.css`：军哥公共 `style.css` 的原样副本。
- `static/flightdeck.css`：补齐源包未提供的 `pfd-*` 专属样式与内页样式。
- `static/flightdeck.js`：移动导航及航前检查交互。

## 可替换占位符

`[[LANG]]`、`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_DESC]]`、`[[SITE_TAGLINE]]`、`[[HERO_EYEBROW]]`、`[[HERO_TITLE]]`、`[[HERO_DESCRIPTION]]`、`[[HOME_FEATURED_LABEL]]`、`[[CONTACT_CHANNEL]]`

模板不包含注册、邀请或导流组件；部署前应替换占位符与示例内容。
