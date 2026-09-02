# 159-adjournment-room 使用说明

## 定位

原创高端封棋分析室模板。双面棋钟导航、抽象棋盘首屏、谱线索引、六则批注、连续性校样台、六项责任卡与 404 均为独立设计。它是可直接换字的静态编辑框架，不是棋力引擎、合法着法验证器、比赛裁判或预测系统。

## 文件

- `index.html`：完整首页、室号复制、六则批注索引和谱线台入口。
- `article.html`：六段长文、阅读进度和摘要复制。
- `tool.html`：谱线连续校样台。
- `legal.html`：六项分析边界与摘要复制。
- `404.html`：本地线索推荐页。
- `static/adjournment-room.css`：独立视觉与响应式样式。
- `static/adjournment-room.js`：独立交互、输入解析和安全渲染。
- `robots.txt`、`sitemap.xml`：发布前替换域名即可使用。

## 必换变量

- `{{LANG}}`：页面语言代码。
- `{{SITE_DOMAIN}}`：不含协议的正式域名。
- `{{SITE_NAME}}`、`{{SITE_DESC}}`：站点名称与说明。
- `{{HOUSE_MARK}}`：英文或罗马字品牌字标。
- `{{EDITION_LABEL}}`、`{{ISSUE_NO}}`：首页版本和期号。
- `{{HERO_NOTE}}`、`{{MANIFESTO_NOTE}}`：首页主叙事。
- `{{INVITE_CODE}}`：只复制、不跳转的编号。
- `{{CONTACT_CHANNEL}}`、`{{REVIEW_DATE}}`：联系渠道与资料复核日期。

## 内容变量

- 首页索引：`{{ANNOTATION_01_META}}`、`{{ANNOTATION_02_META}}`、`{{ANNOTATION_03_META}}`、`{{ANNOTATION_04_META}}`、`{{ANNOTATION_05_META}}`、`{{ANNOTATION_06_META}}`。
- 长文信息与导语：`{{ARTICLE_META}}`、`{{ANNOTATION_01_LEAD}}`、`{{ANNOTATION_02_LEAD}}`、`{{ANNOTATION_03_LEAD}}`、`{{ANNOTATION_04_LEAD}}`、`{{ANNOTATION_05_LEAD}}`、`{{ANNOTATION_06_LEAD}}`。
- 长文正文：`{{ANNOTATION_01_BODY}}`、`{{ANNOTATION_02_BODY}}`、`{{ANNOTATION_03_BODY}}`、`{{ANNOTATION_04_BODY}}`、`{{ANNOTATION_05_BODY}}`、`{{ANNOTATION_06_BODY}}`。
- 页边批注：`{{ANNOTATION_01_MARGIN}}`、`{{ANNOTATION_02_MARGIN}}`、`{{ANNOTATION_03_MARGIN}}`、`{{ANNOTATION_04_MARGIN}}`、`{{ANNOTATION_05_MARGIN}}`、`{{ANNOTATION_06_MARGIN}}`、`{{FINAL_REVIEW_NOTE}}`。
- 责任页：`{{LEGAL_INTRO}}`、`{{LEGAL_SOURCE}}`、`{{LEGAL_LOCAL}}`、`{{LEGAL_RULES}}`、`{{LEGAL_EVALUATION}}`、`{{LEGAL_PRIVACY}}`、`{{LEGAL_UPDATE}}`。

后续 AI 可以直接替换上述变量和段落，不必重做 UI、导航、交互或响应式结构。变量进入 HTML 属性前必须完成上下文安全转义。

## 谱线台输入

每行严格使用七个字段：

`谱线 | 半回合 | 行棋方 | 起点 | 终点 | 评估cp | 状态`

- 2–80 条非空记录，原始输入最多 8000 个 Unicode 字符。
- 谱线名 NFKC 归一、折叠空白并忽略大小写后，与半回合组成唯一键；显示长度 2–20 个 Unicode 字符，不得含控制或格式字符。
- 半回合必须是 1–300 的普通十进制整数；最小半回合应为 1，后续应连续。
- 行棋方只能是“白”或“黑”；奇数半回合对应白方，偶数对应黑方。
- 起点与终点只接受 a1–h8，忽略 ASCII 大小写；同一步起止格不能相同。通过这些检查不代表着法合法。
- 评估值必须是 -9999–9999 的普通十进制整数，不接受正号、指数、前导零或 `-0`。
- 状态只能是“草析、复核、封存”。
- 相邻半回合评估值绝对差严格超过用户上限才提示，等于通过；每条谱线记录数严格少于用户最低值才提示，等于通过。
- 界面最多显示前 40 条记录和前 40 条提示，复制报告保留全部内容。

## 发布前

1. 替换全部变量、示例文字、联系方式、日期和默认谱线。
2. 核对对局事实、记谱、轮次、选手、评估来源、版本、深度和适用规则；不要把工具结果写成比赛裁决或最佳着法。
3. 首页、信息页、工具页、法律页、404、导航和页脚保持零外部推荐链接。
4. 检查标题、description、canonical、站内链接、404、robots 与 sitemap。
5. 重跑仓库验证、相似度、桌面/360px 五页渲染、键盘、复制、重置、边界与控制台测试。

## 安全实现

所有用户输入只通过 `textContent`、`append` 与 `replaceChildren` 渲染。不要改成 `innerHTML`、`outerHTML`、`insertAdjacentHTML`、`document.write`、`eval` 或动态执行代码。主题偏好只存放在浏览器本地。
