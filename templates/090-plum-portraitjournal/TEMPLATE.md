# 090-plum-portraitjournal

## 来源与静态化口径

- 军哥动态模板：`home_portrait_journal`
- 忠实保留主题侧轨、引语导语、人物主稿、四张人物档案和五条最近记录。
- 原始 `portrait-journal-page`、全部 `pj-*` 类名与模块顺序完整保留；Go 条件和循环展开为静态示例。

## 文件清单

- `index.html`：Portrait Journal 首页完整静态化。
- `article.html`：三问三答的人物访谈正文。
- `tool.html`：三种方向可切换的访谈提纲。
- `legal.html`：人物选题、事实核查、引语与隐私说明。
- `404.html`、`robots.txt`、`sitemap.xml`：静态站配套。
- `public.css`：军哥公共 `style.css` 的原样副本。
- `static/portrait.css`：补齐源包未提供的 `pj-*` 专属样式与内页样式。
- `static/portrait.js`：移动导航及访谈提纲交互。

## 可替换占位符

`[[LANG]]`、`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_DESC]]`、`[[SITE_TAGLINE]]`、`[[HERO_EYEBROW]]`、`[[HERO_TITLE]]`、`[[HOME_FEATURED_LABEL]]`、`[[HOME_LATEST_LABEL]]`、`[[CONTACT_CHANNEL]]`

模板不包含注册、邀请或导流组件；部署前应替换占位符与示例人物资料。
