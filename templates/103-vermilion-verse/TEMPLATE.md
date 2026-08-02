# 103-vermilion-verse

## 来源与静态化口径

- 军哥动态模板：`home_verse`
- 忠实保留左侧留白导航、沉底慢文案、右侧朱丝栏竖排卷、两列笺条卡与朱印落款。
- 原始 `vs-wrap`、全部 `vs-*` 类名、模块层级与顺序完整保留；Go 条件和循环展开为静态示例。

## 文件清单

- `index.html`：Verse 首页完整静态化。
- `article.html`：三章诗笺正文。
- `tool.html`：按景、时、意切换的拣字工具。
- `legal.html`：内容、引用、隐私与修订说明。
- `404.html`、`robots.txt`、`sitemap.xml`：静态站配套。
- `public.css`：军哥公共 `style.css` 的原样副本。
- `static/verse.css`：补齐源包未提供的 `vs-*` 专属样式与内页样式。
- `static/verse.js`：移动导航与拣字交互。

## 可替换占位符

`[[LANG]]`、`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_DESC]]`、`[[SITE_TAGLINE]]`、`[[HERO_EYEBROW]]`、`[[HERO_TITLE]]`、`[[HERO_DESCRIPTION]]`、`[[HOME_FEATURED_LABEL]]`、`[[HOME_LATEST_LABEL]]`、`[[CONTACT_CHANNEL]]`

模板不包含注册、邀请或导流组件；部署前应替换占位符与示例内容。
