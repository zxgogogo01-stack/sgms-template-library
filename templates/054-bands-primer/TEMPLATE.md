# 054-bands-primer（四色带入门课）

## 模板定位

面向返佣入门、规则教育和分层知识站。页面以整幅横向色带组织 Hero、精选课、常用入口、学习通行证和更新列表，适合把复杂内容拆成清晰的学习顺序。

## 视觉与指纹隔离

- 全站 UI、状态和脚本钩子使用独立的 `bp54-` 命名空间。
- 视觉语言由板岩蓝、铜色、整幅横带和纸质课程卡组成；课程通行证使用 `fieldset`、有序列表、复选框与 `progress`，形成该模板独有的语义骨架。
- 仅加载 `css/tone.css` 与 `lift.js`，没有共享公共样式副本、远程字体、图片或第三方脚本。
- 五页均具备跳过导航、明暗主题、44px 触控目标、移动导航、清晰焦点状态和安全的本地交互。

## 页面与职责

- `index.html`：四色带首页、课程入口、可勾选学习通行证和更新列表。
- `article.html`：长文、口径表、阅读进度和可复制核对顺序。
- `tool.html`：按课程数、天数与单课分钟生成精确学习节奏。
- `legal.html`：利益关系、数据口径、风险与联系披露，可复制通用披露段。
- `404.html`：`noindex` 的本地课程查找，使用 DOM 节点安全输出结果。
- `robots.txt`、`sitemap.xml`：上线前替换域名占位符。

## 后续 AI 内容接入

后续 AI 只需替换文字、链接和下列占位符，不需要重做模板 UI：

`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_TAGLINE]]`、`[[SITE_DESC]]`、`[[SEO_TITLE]]`、`[[HERO_EYEBROW]]`、`[[HERO_TITLE]]`、`[[HERO_DESCRIPTION]]`、`[[HOME_FEATURED_LABEL]]`、`[[HOME_LINKS_LABEL]]`、`[[HOME_LATEST_LABEL]]`、`[[CONTACT_EMAIL]]`、`[[LANG]]`。

可以增删 `.bp54-bands-row`、`.bp54-bands-link` 和课程通行证条目，但须同步 `progress` 最大值与脚本输出，并保留语义标签、内部链接、表单 `name`、输入约束、`data-*` 行为钩子及 `aria-*` 关系。每条公开费率、资格或时效信息都要附一手来源、适用范围和核对日期；不得写最高返佣、保证收益或绝对安全等未经核验的表述。

## 学习计划口径

- 课程数量只接受 1–120 的整数；可用天数为 1–365；每课分钟为 1–600。
- 每天课数按 `课程数量 ÷ 可用天数` 向上取整；实际学习日再按 `课程数量 ÷ 每天课数` 向上取整。
- 总分钟、高峰日分钟、留白天数和最后一天课数全部由整数运算得出；输入变更会立即使旧结果失效。

## 交付前检查

1. 运行 `node tools/audit-template.js templates/054-bands-primer` 与 `node tools/validate.js`。
2. 在 1440×1000 和 390×844 检查五个页面，无横向溢出、断图、失效锚点或小于 44px 的交互目标。
3. 验证主题持久化、移动菜单焦点/Escape、课程通行证 0/部分/全部/重置、复制、阅读进度、三组计划预设、整数边界、非法输入、结果失效、清空和 404 安全查找。
4. 与全库逐一运行 `node tools/check-similarity.js templates/054-bands-primer templates/NNN-name`，确保类名、骨架与 CSS 属性顺序均为零警告。
