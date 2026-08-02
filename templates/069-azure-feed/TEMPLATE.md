# 069-azure-feed（忠实静态化自军哥 home_feed）

## 适合什么站

适合资讯、更新日志、公告与知识库站点：左侧资料、资源和话题，右侧置顶与普通动态组成清晰的双栏信息流。

## 复刻说明

- 首页完整保留军哥 `home_feed` 的 `fd-*` 类名、嵌套和顺序：资料卡、资源块、栏目标签、动态流标题、置顶动态、普通动态与更多入口。
- `public.css` 是军哥公共样式原样副本；`static/feed.css` 继续提供天青与藏蓝视觉，旧类名仅作兼容样式钩子。
- Go 条件、循环、封面分支、字段和内容 URL 已静态化；所有示例动态使用源模板的无图头像分支 `fd-ava-gen`。

## 静态化边界

- 不加入源模板不存在的邀请码、复制按钮或营销提示卡。
- 示例链接均指向套件内页面；生产接入时可替换资源、栏目和动态条目，但不改变双栏骨架。

## 页面与文件

`index.html` / `article.html` / `tool.html` / `legal.html` / `404.html` / `robots.txt` / `sitemap.xml`；样式为 `public.css` 与 `static/feed.css`，交互为 `static/feed.js`。

## 占位符清单（`[[X]]` 语法）

`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_TAGLINE]]`、`[[SITE_DESC]]`、`[[CONTACT_EMAIL]]`、`[[LANG]]`

## 可调项

- 动态流按真实内容铺开，栏目计数与资源入口同步维护。
- 取消置顶时应整体移除 `fd-pinned` 与 `fd-pin`；无内容时按源模板切换到 `fd-empty` 分支。
