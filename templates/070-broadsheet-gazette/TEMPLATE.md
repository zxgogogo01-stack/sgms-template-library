# 070-broadsheet-gazette（忠实静态化自军哥 home_gazette）

## 适合什么站

适合新闻、公告、专题和知识库站点：巨型报头、粗细双线、版面导航、头条与简报、多栏报道和版权尾组成完整报纸头版。

## 复刻说明

- 首页完整保留军哥 `home_gazette` 的 `gz-*` 类名、嵌套和区域顺序：刊头、版面导航、头条、简报、报道多栏与版权尾。
- `public.css` 是军哥公共样式原样副本；`css/press.css` 继续提供报纸黑白与藏青视觉，旧类名仅作兼容样式钩子。
- 桌面维持三栏与分栏线，中屏降为两栏，手机端改为单栏并完整显示刊头、头条、简报和报道。

## 静态化边界

- 不加入源模板不存在的邀请码、复制按钮或分类广告卡。
- 示例链接均指向套件内页面；生产接入时可替换版面、头条、简报和报道，但不改变报纸骨架。

## 页面与文件

`index.html` / `article.html` / `tool.html` / `legal.html` / `404.html` / `robots.txt` / `sitemap.xml`；样式为 `public.css` 与 `css/press.css`，交互为 `press.js`。

## 占位符清单（`{X}` 单花括号语法）

`{SITE_NAME}`、`{BRAND_EN}`、`{SITE_DOMAIN}`、`{SITE_TAGLINE}`、`{SITE_DESC}`、`{CONTACT_EMAIL}`、`{LANG}`
（JSON-LD 内花括号为 JSON 语法，替换时按整词精确匹配）

## 可调项

- 多栏正文按真实报道铺开，期号和日期戳按建站时间更新。
