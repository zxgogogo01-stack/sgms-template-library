# 建站工作流就绪模板契约 v2

本契约把《返佣站建站工作流》的“站点框架工作”前置到模板库。目标是：建站 AI 选中模板后，只需完成站点变量、经查证的文字与文章正文，不再重新设计 UI、补页面体系、写工具逻辑或修响应式。

本契约不把生产运维塞进模板：域名前世、关键词与监管调研、语种选择、SiteCtl 台账、Caddy、Cloudflare、VPS、GSC、部署授权和线上复验仍属于单站建站/发布流程。

## 交付边界

每套达到 v2 的模板必须自带以下框架，路径可以不同，以 `TEMPLATE.md` 的 `workflow-ready-v2` JSON 角色表为准。角色表不会部署，不构成跨站前台指纹。

- 1 个首页。默认采用首页形态 A：首屏有邀请码明文、一键复制真功能、弹性利益点与政策变化脚注，首页没有交易所直链。
- 1 个文章索引、至少 12 个文章槽位，其中至少 2 个 cornerstone 槽位、至少 1 个注册/邀请码教程槽位。文章骨架至少提供 3 种首屏/开场结构，H2、FAQ、目录与收尾不是全站同款。
- 1 个工具索引、至少 5 个纯前端真工具。工具类型与算法按模板主题轮换；每个工具有可抓取的说明正文与默认折叠 Guide，不能只剩表单或画布。
- 7 个独立合规页面：about、contact、disclosure、disclaimer、privacy、corrections、editorial。
- 独立 404、robots、sitemap、feed、`.well-known/security.txt`、favicon、apple-touch-icon 与 1200×630 PNG 社交图。
- 文章所需的版式、组件、封面容器、目录、表格、引用、FAQ、作者区、相关内容区和移动端样式都已写好；后续 AI 只替换内容，不新造 UI。
- 所有页面使用英文或罗马字 wordmark，不放交易所商标图形，不链接模板库其他站点。

## 内容与链接槽位

- `TEMPLATE.md` 必须声明站名、域名、英文品牌、邀请码、利益比例、利益脚注、注册链接、作者、联系方式、发布日期/修改日期等变量。
- 注册教程保留且只保留 1 个静态 `href` 注册链接槽位，带 `target="_blank"` 与 `rel="sponsored nofollow noopener noreferrer"`，旁边有可替换的披露文字；其他信息、工具、合规、列表、404、导航和页脚没有转化直链。
- 首页默认不链交易所；如果具体站经站主选择形态 B，由建站 AI在单站流程中按授权改动，模板不预置。
- 模板不得写死交易所费率、限额、确认数、价格、用户数、收益或监管结论。需要时只留文字变量与查证日期槽位。
- `feed.xml` 只放文章摘要，不放邀请码、注册链接或 HTML 链接。

## 技术与 SEO 基线

- 每个可索引页面有自指 canonical、完整 title/description、Open Graph、Twitter Card、结构化数据槽位与真实存在的社交图路径；404 为 `noindex,follow`。
- 每个 HTML 的 `viewport` 含 `viewport-fit=cover`，每页 `</head>` 前有工作流指定、整块注释且未启用的 `G-XXXXXXXXXX` GA4 占位。
- 首页链接到全部可索引页面；每个可索引内页至少有 3 个站内入链。导航只放 4–6 个稳定栏目入口，增加文章不需要改导航。
- sitemap 覆盖全部 canonical；feed 与 sitemap XML 良构；robots 同时声明 sitemap 与 feed。
- 资源均为本地相对路径。脚本 `defer`，无内联事件、`javascript:`、`href="#"`、meta refresh、`location.replace`、click-time 拼码、危险 HTML 注入或无行为按钮。
- 360px 不横向溢出，交互目标至少 44px；桌面和移动端首屏不滚动即可看见邀请码、复制控件、利益点和脚注。
- 深浅主题、hover、active、focus-visible、reduced-motion 与无 JavaScript 的阅读能力均需保留。

## `workflow-ready-v2` 角色表

每套 `TEMPLATE.md` 放一个如下的 JSON fenced block。数组内路径与公开 URL 结构允许每套独立命名。

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "dispatch.html",
  "articles": ["stories/example.html"],
  "cornerstones": ["stories/example.html"],
  "registrationGuide": "stories/register.html",
  "toolIndex": "instruments.html",
  "tools": ["instruments/example.html"],
  "legal": {
    "about": "about.html",
    "contact": "contact.html",
    "disclosure": "disclosure.html",
    "disclaimer": "disclaimer.html",
    "privacy": "privacy.html",
    "corrections": "corrections.html",
    "editorial": "editorial.html"
  },
  "error404": "404.html",
  "robots": "robots.txt",
  "sitemap": "sitemap.xml",
  "feed": "feed.xml",
  "security": ".well-known/security.txt",
  "favicon": "favicon.svg",
  "appleTouchIcon": "apple-touch-icon.png",
  "socialImage": "assets/social-card.png",
  "variables": {
    "siteDomain": "{{SITE_DOMAIN}}",
    "siteName": "{{SITE_NAME}}",
    "wordmark": "{{BRAND_EN}}",
    "inviteCode": "{{INVITE_CODE}}",
    "benefitRate": "{{BENEFIT_RATE}}",
    "benefitDisclaimer": "{{BENEFIT_DISCLAIMER}}",
    "affiliateUrl": "{{AFFILIATE_URL}}"
  }
}
```

## 验收顺序

1. `node tools/validate.js <模板路径>`：旧基础体检。
2. `node tools/audit-template.js <模板路径>`：页面、可访问性与变量说明。
3. `node tools/audit-workflow-readiness.js <模板路径>`：本契约的结构与 SEO 就绪度。
4. `node tools/check-similarity.js`：全库类名与结构差异。
5. 浏览器逐页桌面、390px 与 360px 渲染；实点首页复制、主题、五个工具的正常/错误/边界/重置/复制、注册教程链接属性、404 推荐和控制台。

只有五步全部通过，模板才可在索引中标记为“工作流 v2 就绪”。
