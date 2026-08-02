# 001-slate-ledger

## 适合什么站

费率对照 / 返佣档位说明类的数据站：核心是一张可筛选的对照表，配名词解释与 FAQ。

## 结构特点

- CSS Grid 页面骨架，BEM 类名（`rate-board__*`、`invite-strip__*` 等）
- 顶部 sticky 深色导航 + 编辑式超大标题首屏
- 数据表放在 `.rate-board__scroll` 内横向滚动，窄屏不撑破布局
- `assets/` 下拆分 base / layout / parts 三个样式文件 + 单 IIFE 的 app.js
- 断点仅一个：880px，移动端导航横向滚动且页面不溢出
- 自带深色模式（prefers-color-scheme）
- 首页筛选具备无结果提示与一键重置；费用估算器提供可聚焦的错误反馈
- 全站统一 `:focus-visible` 键盘焦点样式，站名可返回首页

## 占位符清单（`{{X}}` 语法，全文替换）

| 占位符 | 说明 |
|---|---|
| `{{SITE_NAME}}` | 站名 |
| `{{SITE_DOMAIN}}` | 域名（不带协议） |
| `{{SITE_TAGLINE}}` | 一句话标语 |
| `{{SITE_DESC}}` | meta description 文案 |
| `{{INVITE_CODE}}` | 邀请码（仅转化区用到） |
| `{{COMPLIANCE_NOTE}}` | 转化区旁的合规说明 |
| `{{CONTACT_EMAIL}}` | 联系邮箱 |
| `{{EFFECTIVE_DATE}}` | 免责声明生效日期，如 2026-08-01 |
| `{{LANG}}` | html lang 值，如 zh-CN |

## 哪些区块可删

- **转化区**：删掉 index.html 中 `<!-- Invite block -->` 注释起的整个 `<section class="invite-strip">`；app.js 里复制逻辑会因找不到按钮自动跳过，不必改 JS
- FAQ 区（`.faq-strip`）与三卡说明区（`.spec-trio`）都可整块删除
- 筛选行（`.filter-bar`）删除后表格仍完整显示

## 示例数据说明

表内费率均为 `0.0X%` 占位，平台名为「示例平台A/B/C」，导入建站时必须整表替换为核实数据。

## 交互与验收

- 首页：复制邀请码、平台/档位组合筛选、空结果提示、筛选重置
- 工具页：金额或费率无效时标记字段并聚焦；有效输入返回本地计算结果
- 页面套件：`index / article / tool / legal / 404` 均有独立内容层级，浅色、深色与 390px 移动端均无页面级横向溢出
- 最近精品复核：2026-08，已检查全页面、键盘焦点、错误态、核心交互与深色模式
