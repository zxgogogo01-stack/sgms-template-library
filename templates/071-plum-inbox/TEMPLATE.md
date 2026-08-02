# 071-plum-inbox（忠实静态化自军哥 home_inbox）

## 适合什么站

适合资讯、公告、知识库和归档站点：文件夹栏、邮件列表与阅读窗格组成完整的三栏收件箱界面。

## 复刻说明

- 首页完整保留军哥 `home_inbox` 的 `ib-*` 类名、嵌套和区域顺序：Hero、文件夹与标签栏、邮件列表和置顶阅读窗格。
- `public.css` 是军哥公共样式原样副本；`assets/mail.css` 继续提供暖灰与梅紫视觉，旧类名仅作兼容样式钩子。
- Go 条件、循环、封面分支、字段和内容 URL 已静态化；当前展示有列表且有置顶邮件的无图分支。

## 静态化边界

- 不加入源模板不存在的邀请码、复制按钮或营销邮票卡。
- 示例链接均指向套件内页面；生产接入时可替换文件夹、标签和信件，但不改变三栏骨架。

## 页面与文件

`index.html` / `article.html` / `tool.html` / `legal.html` / `404.html` / `robots.txt` / `sitemap.xml`；样式为 `public.css` 与 `assets/mail.css`，交互为 `assets/mail.js`。

## 占位符清单（`%%X%%` 语法）

`%%SITE_NAME%%`、`%%BRAND_EN%%`、`%%SITE_DOMAIN%%`、`%%SITE_TAGLINE%%`、`%%SITE_DESC%%`、`%%CONTACT_EMAIL%%`、`%%LANG%%`

## 可调项

- 文件夹、标签和邮件行按真实内容铺开，计数与未读状态同步维护。
- 阅读窗格可换成最新一篇；没有置顶内容时应整体切换到 `ib-read-empty` 分支。
