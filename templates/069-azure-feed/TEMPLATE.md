# 069 Azure Feed · 内容接入说明

这是一套已经完成桌面侧边播报轨、移动折叠菜单、主题、首页动态流、文章、工具、披露和 404 的五页静态模板。后续 AI 或编辑只需要替换变量与文字，不需要重新设计 UI，也不要为了写内容改动类名、CSS 或 JavaScript。

## 文件职责

- `index.html`：快讯台首页、频道状态、四条动态、三行规则和三处入口。
- `article.html`：长讯稿、页内目录、阅读进度、四段协议和可复制交接。
- `tool.html`：按空白行拆分动态卡片，检查长度、重复和超限。
- `legal.html`：利益关系、内容边界、工具限制、更正路径与简短披露。
- `404.html`：`noindex` 缺页和本地频道检索。
- `azure-wire.css`：唯一视觉系统，UI 类名统一使用 `af69-` 命名空间。
- `dispatcher.js`：主题、菜单、复制、阅读进度、分段器与 404 检索。

## 全站变量

| 变量 | 用途 |
|---|---|
| `%%LANG%%` | HTML 语言，如 `zh-CN` |
| `%%SITE_NAME%%` | 真实站点名称 |
| `%%SITE_DOMAIN%%` | 不带协议的真实域名 |
| `%%BRAND_EN%%` | 英文或拼音品牌名 |
| `%%SEO_TITLE%%` | 首页 SEO 标题 |
| `%%SITE_DESC%%` | 可核实的站点描述 |
| `%%SITE_TAGLINE%%` | 页脚短句 |
| `%%CONTACT_EMAIL%%` | 可正常收信的更正邮箱 |
| `%%HERO_EYEBROW%%` | 首页眉题 |
| `%%HERO_TITLE%%` | 首页主标题，建议 8–24 个汉字 |
| `%%HERO_DESCRIPTION%%` | 首页导语，建议 30–80 个汉字 |
| `%%HOME_FEATURED_LABEL%%` | 动态流区标签 |
| `%%HOME_LATEST_LABEL%%` | 三行规则区标签 |
| `%%HOME_LINKS_LABEL%%` | 三入口总标签 |

## 接入顺序

1. 替换全部变量、canonical、OG 信息、邮箱、`robots.txt` 和 `sitemap.xml`。
2. 保持首页四条动态的数量，改写时间、状态、题名与一句说明。
3. 用真实编辑方法替换文章四节正文，保留变化、来源、范围、未知四类职责。
4. 根据真实关系调整披露，但必须保留利益、内容、工具、更正四项边界。
5. 不改变工具协议：空白行分卡，卡内换行合并为空格。

## 给后续 AI 的硬约束

- 只替换变量与文字，不重搭 UI，不改 `af69-` 类名，不引入公共站群样式。
- 不复制其他模板的导航、卡片、页脚或工具；保留天青快讯台的侧边播报轨与独立语义骨架。
- 不新增外链字体、跟踪脚本、远程图片、隐藏链接或未经核实的数据。
- 不使用 `innerHTML`、`outerHTML`、`insertAdjacentHTML`、`eval` 或字符串生成可执行 DOM。
- 不写保证收益、固定结果、最高比例或官方背书等无法核实的承诺。
- 工具边界保持为 10,000 Unicode 字符、60 张卡、单卡 1,000 字符、280 字符建议线。
- 发布前确认五页各有且仅有一个 `h1`，无坏链、无横向页面溢出、移动触控目标至少 44px。

## 工具输入示例

```text
变化：新增来源字段。
依据：编辑协议第二校。

范围：只调整内容结构，不改变事实结论。

未知项：旧页面是否需要同步，待下一轮复核。
```

工具使用 NFKC 与不区分大小写的键检查完全重复卡；长度和重复只用于编辑复查，不代表内容质量或 SEO 结论。

## 发布前验收

```bash
node --check templates/069-azure-feed/dispatcher.js
node tools/audit-template.js templates/069-azure-feed
node tools/check-similarity.js templates/069-azure-feed templates/070-broadsheet-gazette
node tools/validate.js
```

还要在 1440×1000 和 390×844 真视口打开五页，测试主题持久化、移动菜单首链聚焦与 Escape、复制、阅读进度、工具空态/错误态/成功态/失效态/重置态、404 命中与安全无结果，并确认控制台无错误。
