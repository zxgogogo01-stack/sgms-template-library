# 085-cobalt-briefingdesk（军哥 home_briefing_desk 忠实静态化）

## 适合什么站

适合指南、晨报和知识简报站：简报横带、主导读区、编号栏目清单、双导读行和三卡最新区组成完整首页。

## 复刻说明

- 首页沿用 `home_briefing_desk` 的 `briefing-desk-page`、`bd-briefline`、`bd-lead`、`bd-lead-main`、`bd-lead-media`、`bd-feature-caption`、`bd-checks`、`bd-guides` 与 `bd-latest` 原始骨架、类名和顺序。
- Go 条件与循环已静态化为四项栏目清单、两条导读和三张最近简报；眉标、标题、描述、日期、摘要及阅读入口均保留。
- `public.css` 是军哥公共样式表的原样副本；`css/brief.css` 只负责现有钴蓝简报外壳、橙色强调、深浅色和响应式适配。
- 旧版邀请码钴蓝条及复制逻辑已删除，首页不再增加源模板之外的转化组件。

## 页面与文件

`index.html`、`article.html`、`tool.html`、`legal.html`、`404.html`、`robots.txt`、`sitemap.xml`、`TEMPLATE.md`、`public.css`、`css/brief.css`、`brief.js`

## 占位符清单（`{X}` 单花括号语法）

`{SITE_NAME}`、`{BRAND_EN}`、`{SITE_DOMAIN}`、`{SITE_TAGLINE}`、`{SITE_DESC}`、`{CONTACT_EMAIL}`、`{LANG}`
（JSON-LD 内花括号为 JSON 语法，替换时按整词精确匹配）

## 可调项

- 场景导航器的推荐清单在 `brief.js` 的 `sceneMap` 中维护，并替换为真实文章链接。
- 导读、最近简报与栏目清单可按真实内容同步更新；启用图片分支时填写真实尺寸、替代文本和链接。
