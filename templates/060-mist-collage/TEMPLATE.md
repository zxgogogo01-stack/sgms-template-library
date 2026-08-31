# 060-mist-collage

独立的雾感研究拼贴模板。首页由资料卡墙、证据路径图和三枚入口标签组成；文章页展示来源板；工具页整理、验证并去重来源链接。全部 UI 使用 `mc60-` 专属命名空间，不依赖公共 CMS 样式。

## 后续 AI 直接写内容

后续 AI 只替换变量和可见文字即可，不需要重做 UI、卡片布局、主题、移动导航或链接整理工具：

1. 全局替换变量；保留 `mc60-` 类名、`data-*` 属性、控件 id 与五个页面文件名。
2. 首页卡片可复制完整 `article.mc60-note`；第一张保留 `mc60-note-main` 作为视觉主卡。
3. 文章正文可以替换，但保留来源板、证据字段和可复制交接摘要。
4. 工具每行一条 URL，支持 HTTP/HTTPS；最多 30 条非空行。动态结果结构由脚本维护。
5. 不把链接存在等同于内容可信；所有比例、资格、期限仍需回到官方页或账户页核实。

## 变量

`{LANG}`、`{SITE_NAME}`、`{BRAND_EN}`、`{SITE_DOMAIN}`、`{SITE_TAGLINE}`、`{SITE_DESC}`、`{SEO_TITLE}`、`{HERO_EYEBROW}`、`{HERO_TITLE}`、`{HERO_DESCRIPTION}`、`{HOME_FEATURED_LABEL}`、`{HOME_LATEST_LABEL}`、`{HOME_LINKS_LABEL}`、`{CONTACT_EMAIL}`。

`{CONTACT_EMAIL}` 应替换为真实可用的更正联系地址；不用邮箱时改成有效联系路径，不删除责任说明。

## 链接整理规则

- 忽略空行；超过 30 条时拒绝处理。
- 只接受完整的 HTTP 或 HTTPS URL；使用浏览器 URL 解析器规范化。
- 完全相同的规范化 URL 只保留第一次，统计有效、域名、重复、无效数量，并用安全节点输出。
- 结果不代表链接内容真实、安全或长期有效，发布前仍须人工访问与核对。

## 完整审计

运行 `node tools/audit-template.js templates/060-mist-collage`、`node tools/validate.js` 和全库逐对相似度检查；再用 1440×1000 与 390×844 验收五页、主题、移动导航、文章进度/复制、工具空态/协议过滤/URL 规范化/重复/多域名/30与31边界/失效/复制/清空和 404 安全检索，确保控制台无错误。
