# 064-teal-desktop（忠实静态化自军哥 home_desktop）

## 适合什么站

适合工具、知识库与工作台类站点：欢迎区之后是一块完整的 OS 桌面画布，含置顶窗口、文件夹、文件列表、快捷方式和任务栏。

## 复刻说明

- 首页保留军哥源模板的 `dsk-*` 类名、嵌套顺序和六个核心区域：`dsk-hero`、`dsk-win-feat`、`dsk-folders`、`dsk-win-files`、`dsk-shortcuts`、`dsk-taskbar`。
- `public.css` 为军哥公共样式原样副本；`static/os.css` 只补充本套件已有视觉外观与静态页面适配，旧类名作为兼容样式钩子，不替换源类。
- Go 条件、循环、字段和 URL 已替换为静态占位内容；封面采用源模板的无图生成分支，内容顺序仍为置顶文章、栏目、最新文章和快捷入口。
- 窄屏下窗口改为单列，文件夹与快捷方式改为双列，文件行与任务栏收缩换行，避免桌面画布横向溢出。

## 静态化边界

- 不新增源模板不存在的邀请码、复制按钮或营销便利贴。
- 示例链接均指向套件内静态页面；接入生产数据时只替换文案、链接和列表条目，不改变桌面骨架。

## 页面与文件

`index.html` / `article.html` / `tool.html` / `legal.html` / `404.html` / `robots.txt` / `sitemap.xml`；样式为 `public.css` 与 `static/os.css`，交互为 `static/os.js`。

## 占位符清单（`[[X]]` 语法）

`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_TAGLINE]]`、`[[SITE_DESC]]`、`[[CONTACT_EMAIL]]`、`[[LANG]]`，以及首页 `[[HERO_*]]`、`[[HOME_*_LABEL]]` 字段。

## 可调项

- 文件夹和文件行可按真实栏目、文章数量增减，但应保留对应 `dsk-*` 结构。
- 窗口色、桌布色和深色模式可调，窗口标题栏、任务栏与快捷方式的层级不应删除。
