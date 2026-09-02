# 160 Anechoic Ledger

消声室频率响应主题的完整静态模板。视觉、导航、长文、工具、法律页、404、主题和复制交互均已完成；后续 AI 只需替换下列变量及经过核实的正文，不需要重新设计 UI。

## 文件

- `index.html`：响应室首页、抽象频率图、六段入口和本地校准号复制。
- `article.html`：六段完整长文骨架、边栏证据、阅读进度和摘要复制。
- `tool.html`：本地响应漂移校样台。
- `legal.html`：六项测量边界与更正入口。
- `404.html`：独立静音页与本地入口推荐。
- `static/anechoic-ledger.css`、`static/anechoic-ledger.js`：本模板独立资源。
- `robots.txt`、`sitemap.xml`：上线前替换域名。

## 全局变量

- `{{LANG}}`、`{{SITE_DOMAIN}}`、`{{SITE_NAME}}`、`{{SITE_DESC}}`
- `{{STUDIO_MARK}}`、`{{CAL_DATE}}`、`{{CONTACT_CHANNEL}}`、`{{REVIEW_DATE}}`

## 首页变量

- `{{HERO_KICKER}}`、`{{HERO_NOTE}}`、`{{SESSION_CODE}}`、`{{METHOD_NOTE}}`
- 标题：`{{BAND_01_TITLE}}`、`{{BAND_02_TITLE}}`、`{{BAND_03_TITLE}}`、`{{BAND_04_TITLE}}`、`{{BAND_05_TITLE}}`、`{{BAND_06_TITLE}}`
- 摘要：`{{BAND_01_NOTE}}`、`{{BAND_02_NOTE}}`、`{{BAND_03_NOTE}}`、`{{BAND_04_NOTE}}`、`{{BAND_05_NOTE}}`、`{{BAND_06_NOTE}}`

## 长文变量

- `{{ARTICLE_META}}`
- 导语：`{{BAND_01_LEAD}}`、`{{BAND_02_LEAD}}`、`{{BAND_03_LEAD}}`、`{{BAND_04_LEAD}}`、`{{BAND_05_LEAD}}`、`{{BAND_06_LEAD}}`
- 正文：`{{BAND_01_BODY}}`、`{{BAND_02_BODY}}`、`{{BAND_03_BODY}}`、`{{BAND_04_BODY}}`、`{{BAND_05_BODY}}`、`{{BAND_06_BODY}}`
- 边注：`{{BAND_01_MARGIN}}`、`{{BAND_02_MARGIN}}`、`{{BAND_03_MARGIN}}`、`{{BAND_04_MARGIN}}`、`{{BAND_05_MARGIN}}`、`{{BAND_06_MARGIN}}`
- `{{FINAL_CHECK_NOTE}}`

## 法律页变量

- `{{LEGAL_INTRO}}`、`{{LEGAL_SOURCE}}`、`{{LEGAL_LOCAL}}`
- `{{LEGAL_MEASUREMENT}}`、`{{LEGAL_HEARING}}`、`{{LEGAL_PRIVACY}}`、`{{LEGAL_UPDATE}}`

## 本地工具输入与边界

每行正好 6 个字段：`房间 | 频率Hz | 左dB | 右dB | 目标dB | 状态`。

- 2–80 行非空记录，总输入最多 8000 个 Unicode 字符。
- 房间名先 NFKC 归一化、去除首尾空白并折叠普通空格；2–20 个 Unicode 字符，拒绝 Cc/Cf，大小写不敏感。
- `房间 + 频率` 归一化后必须唯一。
- 频率为 20–20000 的普通无符号十进制整数；拒绝前导零、小数、指数和全角数字。
- 左、右、目标电平为 −120.0 至 24.0 的普通十进制数，最多一位小数；拒绝加号、指数、前导零、负零和多余小数位。
- 状态只能是 `草测`、`复核`、`锁定`。
- 左右差上限和目标偏离上限为 0.0–24.0、最多一位小数；严格超过才提示，等于通过。
- 每房间最低频带数为 1–80 的普通无符号整数；严格少于才提示，等于通过。
- 同房间按输入顺序的频率必须严格递增；工具另查左右差、最大目标偏离、频带深度和草测状态。
- 页面只显示前 40 条记录与提示，复制报告保留全部内容。

工具不读取音频、不联网、不上传、不保存，不判断频响平滑、相位、声压级、设备性能、房间声学、主观听感或听力安全。

## 发布检查

1. 替换全部变量并核对资料来源、数字、单位、测量条件与复核日期。
2. 不得把示例记录或工具输出写成真实测量、设备校准或工程验收。
3. 首页、工具页、法律页、导航、页脚与 404 不放返佣链接；如另建高意图文章，遵循项目现行链接治理规则。
4. 保持文件名、类名和资源独立，不并入其他模板样式库。
5. 部署前运行全库验证、严格审计、相似度检查，并完成桌面与 360px 五页交互复核。
