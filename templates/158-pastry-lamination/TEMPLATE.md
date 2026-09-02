# 158-pastry-lamination 使用说明

## 定位

原创高端酥皮折层工坊模板。信息架构、阶梯式导航、折页色带首屏、六段长文、校样台、展开式责任条款和 404 均为本模板独立设计。它是可直接换字的静态编辑框架，不是配方、食品安全系统或生产控制系统。

## 文件

- `index.html`：完整首页、编号复制、六记入口和本地校样入口。
- `article.html`：六段长文、阅读进度和摘要复制。
- `tool.html`：折层批次校样台。
- `legal.html`：六道责任边界与摘要复制。
- `404.html`：本地线索推荐页。
- `static/pastry-lamination.css`：独立视觉与响应式样式。
- `static/pastry-lamination.js`：独立交互、输入解析和安全渲染。
- `robots.txt`、`sitemap.xml`：发布前替换域名即可使用。

## 必换变量

- `{{LANG}}`：页面语言代码。
- `{{SITE_DOMAIN}}`：不含协议的正式域名。
- `{{SITE_NAME}}`、`{{SITE_DESC}}`：站点名称与说明。
- `{{HOUSE_MARK}}`：英文或罗马字品牌字标。
- `{{EDITION_LABEL}}`：首页版本标签。
- `{{HERO_NOTE}}`、`{{MANIFESTO_TEXT}}`：首页主叙事。
- `{{INVITE_CODE}}`：只复制、不跳转的编号。
- `{{CONTACT_CHANNEL}}`、`{{REVIEW_DATE}}`：联系渠道与资料复核日期。

## 内容变量

- 首页卡片：`{{NOTE_01_META}}`、`{{NOTE_02_META}}`、`{{NOTE_03_META}}`、`{{NOTE_04_META}}`、`{{NOTE_05_META}}`、`{{NOTE_06_META}}`。
- 长文导语：`{{ARTICLE_META}}`、`{{NOTE_01_LEAD}}`、`{{NOTE_02_LEAD}}`、`{{NOTE_03_LEAD}}`、`{{NOTE_04_LEAD}}`、`{{NOTE_05_LEAD}}`、`{{NOTE_06_LEAD}}`。
- 长文正文：`{{NOTE_01_BODY}}`、`{{NOTE_02_BODY}}`、`{{NOTE_03_BODY}}`、`{{NOTE_04_BODY}}`、`{{NOTE_05_BODY}}`、`{{NOTE_06_BODY}}`。
- 方法说明：`{{TEMP_LOW_NOTE}}`、`{{TEMP_HIGH_NOTE}}`、`{{TEMP_SOURCE}}`、`{{FINAL_REVIEW_NOTE}}`。
- 责任页：`{{LEGAL_INTRO}}`、`{{LEGAL_SOURCE}}`、`{{LEGAL_LOCAL}}`、`{{LEGAL_FOOD}}`、`{{LEGAL_PRODUCTION}}`、`{{LEGAL_PRIVACY}}`、`{{LEGAL_UPDATE}}`。

后续 AI 可以直接替换这些变量和段落，不需要重做布局、组件、交互或响应式结构。变量值进入 HTML 属性前必须完成上下文安全转义。

## 校样台输入

每行严格使用六个字段：

`批次 | 折次 | 折法 | 面团温度°C | 松弛分钟 | 状态`

- 2–80 条非空记录，原始输入最多 8000 个 Unicode 字符。
- 批次号 NFKC 归一、折叠空白并忽略大小写后，与折次组成唯一键；显示长度为 2–20 个 Unicode 字符，不得含控制或格式字符。
- 折次必须是 1–12 的普通十进制整数；折法只能是“单折”或“双折”。
- 温度必须是 -5.0–40.0 范围内、最多一位小数的普通十进制；不接受指数、前导零或正号。
- 松弛分钟必须是 0–600 的普通十进制整数；状态只能是“草记、核对、封存”。
- 每批从 1 层开始，单折乘 3、双折乘 4；最小折次应为 1，折次应连续。
- 温度边界为闭区间，等于上下界通过；层数只在严格超过上限时提示；松弛时间只在严格低于最低值时提示。
- 界面最多显示前 40 条记录和前 40 条提示，复制报告保留全部记录与全部提示。

## 发布前

1. 替换全部变量、示例文字、联系方式、日期和默认校样记录。
2. 以适用配方和现场规范重新核对温度、时间、食品、过敏原与设备表述；不要把工具结果写成放行结论。
3. 保留首页零外部推荐链接；若另建高意图转化文章，每篇最多一个直接链接并补足披露与 `rel` 属性。
4. 检查标题、description、canonical、站内链接、404、robots 与 sitemap。
5. 重跑仓库验证、相似度、桌面/360px 五页渲染、键盘、复制、重置、边界与控制台测试。

## 安全实现

所有用户输入只通过 `textContent`、`append` 与 `replaceChildren` 渲染。不要改成 `innerHTML`、`outerHTML`、`insertAdjacentHTML`、`document.write`、`eval` 或动态执行代码。主题偏好只存放在浏览器本地。
