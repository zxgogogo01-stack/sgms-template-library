# 068 Cinnabar Almanac · 内容接入说明

这是一套已经搭好完整 UI、响应式、无障碍、主题、文章、工具、披露和 404 框架的五页静态模板。后续 AI 或编辑只需要替换变量与文字，不需要重新设计界面，也不要为“适配内容”改写布局、类名、CSS 或 JavaScript。

## 文件职责

- `index.html`：首页封面、四项原则、日课条目、登记表与三处入口。
- `article.html`：长文方法页、页内目录、阅读进度和可复制交接笺。
- `tool.html`：日期条目间隔校对尺，全部处理在浏览器本地完成。
- `legal.html`：利益关系、内容边界、工具限制、更正路径与简短披露。
- `404.html`：`noindex` 缺页和本地卷目检索。
- `almanac.css`：本模板唯一视觉系统，类名统一使用 `ca68-` 命名空间。
- `keeper.js`：主题、移动菜单、复制、阅读进度、工具和 404 检索。
- `robots.txt`、`sitemap.xml`：站点根级抓取与页面清单。

## 全站变量

发布前在全部文件中完成以下替换：

| 变量 | 含义 | 示例 |
|---|---|---|
| `%%LANG%%` | HTML 语言 | `zh-CN` |
| `%%SITE_NAME%%` | 站点名称 | 真实站点名 |
| `%%SITE_DOMAIN%%` | 不带协议的域名 | `example.org` |
| `%%BRAND_EN%%` | 英文或拼音品牌 | 真实品牌拼写 |
| `%%SEO_TITLE%%` | 首页 SEO 标题 | 与真实主题一致 |
| `%%SITE_DESC%%` | 首页描述 | 真实、可核实的站点介绍 |
| `%%SITE_TAGLINE%%` | 页脚短句 | 一句真实定位 |
| `%%CONTACT_EMAIL%%` | 更正联系邮箱 | 可正常收信的邮箱 |
| `%%HERO_EYEBROW%%` | 首页封面眉题 | 当前卷主题 |
| `%%HERO_TITLE%%` | 首页主标题 | 建议 8–24 个汉字 |
| `%%HERO_DESCRIPTION%%` | 首页导语 | 建议 30–80 个汉字 |
| `%%HOME_FEATURED_LABEL%%` | 首页方法区标签 | 如“本卷方法” |
| `%%HOME_LATEST_LABEL%%` | 首页登记区标签 | 如“最近复校” |
| `%%HOME_LINKS_LABEL%%` | 三入口总标签 | 如“卷内入口” |

## 文字替换顺序

1. 先替换全站变量、canonical、OG 信息、邮箱、`robots.txt` 与 `sitemap.xml`。
2. 再替换首页封面、三条日课、登记表和入口名称；保持现有元素数量。
3. 用真实方法文改写 `article.html` 四节正文和交接笺字段，不删除披露句。
4. 按实际用途调整 `legal.html`，但必须保留利益、内容、工具、更正四项边界。
5. 如无需改变日期输入协议，不修改 `keeper.js`；工具固定使用 `YYYY-MM-DD | 题名`。

## 给后续 AI 的硬约束

- 只写文字和替换变量，不重新搭 UI，不改 `ca68-` 类名，不引入公共站群样式。
- 不复制其他模板的导航、卡片、页脚、工具或 CSS；本模板必须保持朱砂校历室的独立视觉和语义骨架。
- 不新增外链字体、跟踪脚本、远程图片、隐藏链接或未经核实的数据。
- 不使用 `innerHTML`、`outerHTML`、`insertAdjacentHTML`、`eval` 或字符串拼接生成可执行 DOM。
- 不写保证收益、最高比例、固定到账、官方背书等无法核实的营销承诺。
- 工具限制保持为：10,000 Unicode 字符、120 条记录、题名 80 字符、日期 2000–2099。
- 发布前必须检查五页各有且仅有一个 `h1`、无坏链、无页面级横向溢出、移动触控目标至少 44px。

## 工具输入示例

```text
2026-01-03 | 栏目边界初校
2026-01-10 | 来源字段补记
2026-02-02 | 工具说明复核
```

工具会按真实公历日期排序，统计唯一日期、同日多条日期和相邻间隔；它不会给出发布频率、SEO 或内容质量结论。

## 发布前验收

```bash
node --check templates/068-cinnabar-almanac/keeper.js
node tools/audit-template.js templates/068-cinnabar-almanac
node tools/check-similarity.js templates/068-cinnabar-almanac templates/069-azure-feed
node tools/validate.js
```

最后还要在 1440×1000 与 390×844 真视口打开五页，测试主题、移动菜单、复制、阅读进度、工具空态/错误态/成功态/失效态/重置态、404 命中与安全无结果，并确认控制台无错误。
