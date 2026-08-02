# 002-quiet-quill

## 适合什么站

个人长文博客 / 独立刊物 / 研究札记：单栏阅读版式，衬线字体，强调来源、修订与慢写作。

## 结构特点

- 单栏 680px 阅读宽度；页脚与文章条目用小范围 grid，整体骨架靠文档流
- BEM 类名（`masthead__*`、`essay-roll__*`、`note-box__*`、`foot-grid__*`）
- 顶部为居中菜单 + 小字站名，首屏采用 letterpress 大字与 Q 字母水印
- `assets/` 下 core / frame / bits 三个样式文件 + 单 IIFE 的 main.js
- 断点仅一个：700px；深色模式、正文、工具和 404 均统一适配
- 首页订阅区包含格式校验、错误与成功反馈；默认只作本地演示，不提交数据
- 字数统计页提供有效字符、英文词、段落、阅读时间和篇幅提示

## 占位符清单（`{{X}}` 语法，全文替换）

| 占位符 | 说明 |
|---|---|
| `{{SITE_NAME}}` | 站名 |
| `{{SITE_DOMAIN}}` | 域名（不带协议） |
| `{{SITE_TAGLINE}}` | 一句话标语 |
| `{{SITE_DESC}}` | meta description 文案 |
| `{{CONTACT_EMAIL}}` | 联系邮箱 |
| `{{LANG}}` | html lang 值 |

## 哪些区块可删

- 订阅框：删 index.html 的 `<aside class="note-box">` 整块；main.js 的表单逻辑会自动跳过
- 文章列表条目按需增删 `<article class="essay-roll__entry">`
- tool.html 整页可删（同时从导航与 sitemap.xml 去掉对应链接）

## 备注

订阅表单默认只在前端提示成功，不发请求；接入真实邮件服务时自行改 main.js，并同步更新站点说明。2026-08 已完成全套精品化复核：正文、工具、说明、404、深色与移动端使用同一套 letterpress 视觉语言。
