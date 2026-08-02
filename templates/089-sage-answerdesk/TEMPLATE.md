# 089-sage-answerdesk

## 来源与静态化口径

- 军哥动态模板：`home_answer_desk`
- 忠实保留 Hero 搜索、四个建议词、置顶答案、问题台账、六主题区和五条更新侧栏。
- 原始 `answer-desk-page`、全部 `ad-*` 类名与模块顺序完整保留；Go 条件、循环和翻译字段展开为静态示例。

## 文件清单

- `index.html`：Answer Desk 首页完整静态化。
- `article.html`：三步核对解答与字段表。
- `tool.html`：三类问题可切换的分诊工具。
- `legal.html`：问题收录、答案核验、更新与免责说明。
- `404.html`、`robots.txt`、`sitemap.xml`：静态站配套文件。
- `public.css`：军哥源库公共 `style.css` 的原样副本。
- `static/answer.css`：补齐源包未提供的 `ad-*` 专属样式与内页样式。
- `static/answer.js`：移动导航及问题分诊交互。

## 可替换占位符

`[[LANG]]`、`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_DESC]]`、`[[SITE_TAGLINE]]`、`[[HERO_EYEBROW]]`、`[[HERO_TITLE]]`、`[[HERO_DESCRIPTION]]`、`[[HOME_FEATURED_LABEL]]`、`[[HOME_LATEST_LABEL]]`、`[[CONTACT_CHANNEL]]`

模板不包含注册、邀请或导流组件；部署前应替换占位符与示例问答数据。
