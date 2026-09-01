# 070 Broadsheet Gazette · 内容接入说明

本模板已经搭好十二栏大报视觉、桌面与移动导航、主题、头版、调查长稿、引语工具、披露和 404。后续 AI 或编辑只需要替换变量与文字，不需要重新设计 UI，也不要改动 `bg70-` 类名、`broadsheet.css` 或 `proofroom.js`。

## 文件

- `index.html`：头版、主调查、今日编辑台、新闻线和三入口。
- `article.html`：调查长稿、页内目录、双栏正文、阅读进度与交接。
- `tool.html`：引语归属清单，本地检查说话者、长度与完全重复。
- `legal.html`：利益、内容、工具、更正四项公示和简短披露。
- `404.html`：`noindex` 缺页和本地版面检索。
- `broadsheet.css`：唯一视觉系统；`proofroom.js`：主题、菜单、复制、工具与检索。

## 必须替换的变量

`%%LANG%%`、`%%SITE_NAME%%`、`%%SITE_DOMAIN%%`、`%%BRAND_EN%%`、`%%SEO_TITLE%%`、`%%SITE_DESC%%`、`%%SITE_TAGLINE%%`、`%%CONTACT_EMAIL%%`、`%%HERO_EYEBROW%%`、`%%HERO_TITLE%%`、`%%HERO_DESCRIPTION%%`、`%%HOME_FEATURED_LABEL%%`、`%%HOME_LATEST_LABEL%%`、`%%HOME_LINKS_LABEL%%`。

域名变量不带协议；邮箱必须可正常收信；标题、描述、OG 与正文必须反映真实内容。

## 接入顺序

1. 替换全站变量、canonical、OG、邮箱、`robots.txt` 和 `sitemap.xml`。
2. 保持首页一条主调查、三张编辑卡和三条新闻线的数量，只改文字。
3. 用真实调查方法改写文章四节，保留主张、材料、引语、边界四项职责。
4. 根据真实关系调整公示，但不可删除利益、内容、工具、更正四项。
5. 工具固定使用一行一条的“说话者 | 引语”协议，不修改校验边界。

## 给后续 AI 的硬约束

- 只替换变量和文字，不重搭 UI，不复用其他模板的导航、卡片、页脚或工具。
- 不引入公共站群样式、外链字体、跟踪脚本、远程图片、隐藏链接或虚构数据。
- 不使用 `innerHTML`、`outerHTML`、`insertAdjacentHTML`、`eval` 或字符串生成可执行 DOM。
- 不写保证收益、最高比例、固定结果、官方背书等不可核实承诺。
- 工具边界保持为：10,000 Unicode 字符、100 条记录、说话者 40 字符、单条引语 500 字符。
- 发布前检查五页各一个 `h1`、无坏链、无页面级横向溢出、移动触控目标至少 44px。

## 工具示例

```text
编辑甲 | 日期字段必须说明口径。
研究员乙 | 未知项应留在正文。
复核员丙 | 原始材料优先于二次转述。
```

完全重复使用 NFKC 与不区分大小写的键判断；重复只表示文字一致，不代表引语虚假、转述或抄袭。

## 发布前验收

```bash
node --check templates/070-broadsheet-gazette/proofroom.js
node tools/audit-template.js templates/070-broadsheet-gazette
node tools/check-similarity.js templates/070-broadsheet-gazette templates/071-plum-inbox
node tools/validate.js
```

还必须在 1440×1000 和 390×844 真视口测试五页、主题持久化、移动菜单首链聚焦与 Escape、复制、阅读进度、工具空态/错误态/成功态/失效态/重置态、404 精确命中与安全无结果，并确认控制台为空。
