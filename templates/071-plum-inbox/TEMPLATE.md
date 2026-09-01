# 071 Plum Inbox · 内容接入说明

本模板已经搭好梅紫通信档案室的完整五页框架：桌面与移动导航、主题、收件台、公开回信、主题行工具、披露和 404。后续 AI 或编辑只需要替换变量与文字，不需要重新设计 UI，也不要改动 `pi71-` 类名、`correspondence.css` 或 `postmaster.js`。

## 文件职责

- `index.html`：收件台、封面信、四信夹、三封重点信、回信骨架与入口。
- `article.html`：回信方法、页内目录、阅读进度、四段正文与交接。
- `tool.html`：主题行线程器，清理回复/转发前缀并在本地归并线程。
- `legal.html`：利益、内容、工具、更正四项封缄说明。
- `404.html`：`noindex` 缺页与本地信夹检索。
- `correspondence.css`：唯一视觉系统；`postmaster.js`：主题、菜单、复制、工具与检索。

## 变量

必须替换：`%%LANG%%`、`%%SITE_NAME%%`、`%%SITE_DOMAIN%%`、`%%BRAND_EN%%`、`%%SEO_TITLE%%`、`%%SITE_DESC%%`、`%%SITE_TAGLINE%%`、`%%CONTACT_EMAIL%%`、`%%HERO_EYEBROW%%`、`%%HERO_TITLE%%`、`%%HERO_DESCRIPTION%%`、`%%HOME_FEATURED_LABEL%%`、`%%HOME_LATEST_LABEL%%`、`%%HOME_LINKS_LABEL%%`。

## 接入顺序

1. 替换全站变量、canonical、OG、邮箱、`robots.txt` 与 `sitemap.xml`。
2. 保持首页四信夹和三封重点信数量，只改主题、状态与说明。
3. 用真实回复方法改写文章四节，保留问题、依据、未知、下一步四项职责。
4. 按真实关系调整披露，但不可删除利益、内容、工具、更正四项。
5. 工具保持“一行一个主题”的输入协议，不修改校验边界。

## 给后续 AI 的硬约束

- 只替换变量和文字，不重搭 UI，不复制其他模板的导航、卡片、页脚或工具。
- 不引入公共站群样式、外链字体、跟踪脚本、远程图片、隐藏链接或虚构数据。
- 不使用 `innerHTML`、`outerHTML`、`insertAdjacentHTML`、`eval` 或字符串生成可执行 DOM。
- 不写保证收益、最高比例、固定结果或官方背书等不可核实承诺。
- 工具边界保持为：10,000 Unicode 字符、100 个主题行、单行 180 字符、连续前缀最多剥离 20 层。
- 发布前确认五页各一个 `h1`、无坏链、无页面级横向溢出、移动触控目标至少 44px。

## 工具示例

```text
来源字段需要复核
Re: 来源字段需要复核
Fwd: Re: 来源字段需要复核
回复：来源字段需要复核
```

工具识别 `Re`、`Fw`、`Fwd`、`答复`、`回复`、`转发` 及全角冒号；主题归并只描述文本，不代表正文、发件人或事件相同。

## 发布前验收

```bash
node --check templates/071-plum-inbox/postmaster.js
node tools/audit-template.js templates/071-plum-inbox
node tools/check-similarity.js templates/071-plum-inbox templates/072-rust-manual
node tools/validate.js
```

还必须在 1440×1000 和 390×844 真视口测试五页、主题持久化、移动菜单首链聚焦与 Escape、复制、阅读进度、工具空态/错误态/成功态/失效态/重置态、404 精确命中与安全无结果，并确认控制台为空。
