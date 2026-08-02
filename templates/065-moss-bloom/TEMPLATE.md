# 065-moss-bloom（忠实静态化自军哥 home_bloom）

## 适合什么站

适合内容、知识库和工具类站点：有机圆角 Hero、SVG 波浪、栏目种子簇、藤蔓文章流与石板入口组成完整的花园叙事。

## 复刻说明

- 首页完整保留军哥 `home_bloom` 的 `bloom-*` 类名、区域顺序与嵌套关系：Hero、三道波浪、栏目种子、藤蔓文章流和石板入口。
- `public.css` 是军哥公共样式原样副本；`petal.css` 保留本套件已有的苔绿与蔷薇视觉，并以旧类名作为兼容样式钩子。
- Go 的条件、循环、字段与内容 URL 已静态化；无图封面保留 `bloom-leaf-cover-in > bloom-cover-gen` 双层结构。
- 桌面与 390px 手机视口均已检查；手机端叶片改为单列，种子和石板入口自然换行且无横向溢出。

## 静态化边界

- 不加入源模板没有的邀请码、复制按钮或营销露珠条。
- 示例链接全部指向套件内页面；生产接入时只替换文本、链接、栏目与文章条目，不改变花园骨架。

## 页面与文件

`index.html` / `article.html` / `tool.html` / `legal.html` / `404.html` / `robots.txt` / `sitemap.xml`；样式为 `public.css` 与 `petal.css`，交互为 `petal.js`。

## 占位符清单（`{X}` 单花括号语法）

`{SITE_NAME}`、`{BRAND_EN}`、`{SITE_DOMAIN}`、`{SITE_TAGLINE}`、`{SITE_DESC}`、`{CONTACT_EMAIL}`、`{LANG}`
（JSON-LD 内花括号为 JSON 语法，替换时按整词精确匹配）

## 可调项

- 藤蔓叶片、种子与石板入口可按真实内容增减，但应保留对应 `bloom-*` 结构。
- 色彩和圆角可调；波浪、藤蔓主干与叶片节点是模板识别特征，不建议删除。
