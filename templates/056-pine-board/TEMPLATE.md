# 056-pine-board（松木知识泳道）

## 模板定位

面向返佣目录、规则知识库和专题看板。首页用置顶横幅、三条内容泳道、常用入口和“看板结构图”组织信息，适合持续扩充但仍保持清晰层级的内容站。

## 视觉与指纹隔离

- 全站 UI、状态与脚本钩子使用独立的 `pb56-` 命名空间。
- 松木绿、米白纸面、圆角泳道卡与金色节点构成独立视觉语言。
- 首页独有 `figure > svg + figcaption > dl` 的看板解剖图，明确置顶结论、泳道及来源/日期的关系。
- 仅加载 `static/app.css` 与 `static/app.js`，没有共享公共样式副本、远程字体、图片或第三方脚本。
- 五页均具备跳过导航、明暗主题、44px 触控目标、移动导航、清晰焦点和安全本地交互。

## 页面与职责

- `index.html`：Hero、置顶横幅、看板结构图、三条泳道与入口区。
- `article.html`：文章、口径表、阅读进度和可复制看板摘要。
- `tool.html`：按卡片总数、泳道数与置顶数生成均衡分栏方案。
- `legal.html`：利益关系、内容口径、风险与联系披露，可复制通用披露段。
- `404.html`：`noindex` 的本地看板搜索，使用 DOM 节点安全输出结果。
- `robots.txt`、`sitemap.xml`：上线前替换域名占位符。

## 后续 AI 内容接入

后续 AI 只替换文字、链接和下列占位符，不需要重做模板 UI：

`%%SITE_NAME%%`、`%%BRAND_EN%%`、`%%SITE_DOMAIN%%`、`%%SITE_TAGLINE%%`、`%%SITE_DESC%%`、`%%SEO_TITLE%%`、`%%HERO_EYEBROW%%`、`%%HERO_TITLE%%`、`%%HERO_DESCRIPTION%%`、`%%HOME_FEATURED_LABEL%%`、`%%HOME_LATEST_LABEL%%`、`%%HOME_LINKS_LABEL%%`、`%%CONTACT_EMAIL%%`、`%%LANG%%`。

可以增删 `.pb56-board-lane` 与 `.pb56-board-card`，但每张事实卡必须保留栏目、标题、发布日期、一手来源和核对日期；同步修改首页结构图或说明中的泳道数量。必须保留语义标签、内部链接、表单 `name`、输入约束、`data-*` 行为钩子及 `aria-*` 关系。不得加入未经核验的最高返佣、保证收益或绝对安全表述。

## 分栏容量口径

- 卡片总数只接受 1–999 的整数；泳道数为 1–12；置顶数为 0–999 且不能超过总数。
- 置顶卡不进入普通泳道，剩余卡片用整数商平均分配，余数从第 1 条泳道依次补 1 张。
- 各泳道最多相差 1 张；允许泳道数大于普通卡片数，此时部分泳道为 0 张。
- 输入变化会立即清除旧方案；动态列表只用 DOM 节点和 `textContent` 创建。

## 交付前检查

1. 运行 `node tools/audit-template.js templates/056-pine-board` 与 `node tools/validate.js`。
2. 在 1440×1000 和 390×844 检查五页，无横向溢出、断图、失效锚点或小于 44px 的交互目标。
3. 验证主题持久化、移动菜单首链焦点/Escape、复制、阅读进度、整除/有余数/少卡宽栏/全部置顶/最小最大组合、整数与关系错误、三预设、结果失效、清空及 404 安全搜索。
4. 与全库逐一运行 `node tools/check-similarity.js templates/056-pine-board templates/NNN-name`，确保类名、骨架与 CSS 属性顺序均为零警告。
