# 066-signal-uptime（忠实静态化自军哥 home_uptime）

## 适合什么站

适合公告、服务状态、规则跟踪和知识库站点：状态横幅、跟进中事件、组件健康行、事件时间线和资源入口组成完整的监控页叙事。

## 复刻说明

- 首页保留军哥 `home_uptime` 的 `up-*` 类名、嵌套关系和区域顺序：事件状态横幅、活动事件、组件面板、事件历史与资源页脚。
- `public.css` 是军哥公共样式原样副本；`css/status.css` 继续提供本套件的云白底与绿、琥珀、红三态视觉，旧类名仅作兼容样式钩子。
- Go 条件、循环、字段和内容 URL 已静态化；当前展示“存在活动事件”分支，因此互斥的空闲态 `up-calm*` 不进入静态 DOM。
- 状态灯、胶囊、刻度条、计数、时间线节点和资源 chips 均保留；桌面与 390px 手机视口均需无横向溢出。

## 静态化边界

- 不加入源模板不存在的邀请码、复制按钮或额外营销条。
- 示例链接均指向套件内静态页面；接入生产数据时只替换文案、链接、组件行和事件条目。

## 页面与文件

`index.html` / `article.html` / `tool.html` / `legal.html` / `404.html` / `robots.txt` / `sitemap.xml`；样式为 `public.css` 与 `css/status.css`，交互为 `pulse.js`。

## 占位符清单（`%%X%%` 语法）

`%%SITE_NAME%%`、`%%BRAND_EN%%`、`%%SITE_DOMAIN%%`、`%%SITE_TAGLINE%%`、`%%SITE_DESC%%`、`%%CONTACT_EMAIL%%`、`%%LANG%%`

## 可调项

- 监控行、刻度和事件可按真实栏目铺开，`is-warn` / `is-down` 用于标注异常日期。
- 切换无事件状态时，应按源模板用 `up-calm` 分支整体替换 `up-incident`，不要把两种互斥状态同时展示。
