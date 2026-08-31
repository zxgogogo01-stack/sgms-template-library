# 028 — Mellow Journal

High-end independent literary journal template for English-first essay publishing. The visual identity combines a warm paper palette, oxblood editorial accents, classical book typography, strong issue architecture, and restrained interactive details.

## Included pages

- `index.html` — featured essay, searchable/filterable six-piece archive, editor note, sentence-tool feature
- `article.html` — complete long-form essay, reading progress, pullquote, related reading
- `tool.html` — private in-browser English/Chinese sentence and rhythm analyzer with metrics, sentence breakdown, samples, error handling, copy and reset
- `legal.html` — colophon, independence, accuracy/corrections, letters, tool privacy, terms and contact
- `404.html` — publication-consistent missing-page state
- `css/style.css` — responsive light/dark editorial design, keyboard focus, reduced-motion and print support

## Replace before publishing

- `[[SITE_NAME]]` — publication title
- `[[SITE_DOMAIN]]` — canonical production domain, without protocol or trailing slash
- `[[LOCATION]]` — editorial location
- `[[CONTACT_EMAIL]]` — working editorial/contact address

## 后续 AI 的文字接入顺序

1. 先全局替换以上四个变量/占位符，再逐页改写卷期、文章题目、摘要、正文、作者信息、编辑说明与政策文字。
2. 只替换内容、链接目标、日期与确有需要的 `data-tags`；保留 `mj-` 专属类名、五页结构、响应式断点、表单 ID、ARIA 关系、阅读进度与分析器交互。
3. 句子分析器的 UI 和中英文统计框架已经完成。除非改变统计口径，否则后续 AI 不应重做界面或算法；改变口径时要同步更新工具说明、隐私说明和测试样例。
4. 上线前逐页核对 title、description、canonical、邮件地址与版权归属，并实测搜索、筛选、空态恢复、分析错误/成功、样例、输入后旧结果失效、重置和复制。
5. 最后运行 `node tools/audit-template.js templates/028-mellow-journal`，并将本模板与库内其他模板逐对执行相似度检查。

完整视觉、桌面/移动布局、深浅主题和交互状态均已搭好；后续 AI 应把 token 用在文章内容、事实和版权核对上，不在模板 UI 上重复消耗。

The demo copy is publication-ready sample material, not placeholder text. Replace or license all editorial content as appropriate for the final site. The sentence analyzer runs locally in the visitor's browser and does not transmit text.
