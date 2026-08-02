# 105-burgundy-lexicon

## 来源与静态化口径

- 军哥动态模板：`home_lexicon`
- 忠实保留辞书书脊、今日词条、密排词条行、竖排分类索引、参见词条与凡例。
- 原始 `lx-wrap`、全部 `lx-*` 类名、模块层级与顺序完整保留；Go 条件和循环展开为静态示例。

## 文件清单

- `index.html`：Lexicon 首页完整静态化。
- `article.html`：词条释义、用例与参见词。
- `tool.html`：按部首、音序和主题切换的检字工具。
- `legal.html`：收词、释义、隐私与修订凡例。
- `404.html`、`robots.txt`、`sitemap.xml`：静态站配套。
- `public.css`：军哥公共 `style.css` 的原样副本。
- `static/lexicon.css`：补齐源包未提供的 `lx-*` 专属样式与内页样式。
- `static/lexicon.js`：移动索引及检字交互。

## 可替换占位符

`[[LANG]]`、`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_DESC]]`、`[[SITE_TAGLINE]]`、`[[HERO_EYEBROW]]`、`[[HERO_TITLE]]`、`[[HERO_DESCRIPTION]]`、`[[HOME_FEATURED_LABEL]]`、`[[HOME_LATEST_LABEL]]`、`[[CONTACT_CHANNEL]]`

部署前应替换占位符、示例词条与凡例。
