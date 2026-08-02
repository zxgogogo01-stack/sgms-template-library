# 051-bento-desk（复刻自军哥 home_bento）

## 适合什么站

返佣情报台 / 内容枢纽站：便当格首页把「转化区 + 特稿 + 栏目 + 文章 + 工具入口」组织成一屏磁贴，天然适合做宽内链枢纽。

## 复刻说明

- 布局骨架忠实复刻军哥 `home_bento`：hero 磁贴（眉标/大标/副标/双 CTA）+ 特稿大卡（封面渐隐底片）+ 栏目瓦片（名称/描述/计数/箭头）+ 文章卡 + 快捷入口条
- 2026-07-31 已按新要求返工：首页恢复 `bento-*` 原始类名与源布局顺序，不再采用类名全换的防同源做法
- `css/public.css` 是军哥原始 `style.css` 的原样副本；`css/site.css` 仅补足 bento 布局在源压缩包中缺失的专属规则
- 动态 `if`、`with`、`range` 已展开成静态示例内容，保留原版可选无封面分支

## 转化区

原版 `home_bento` 首页没有邀请码转化卡，本次忠实静态化不再额外插入。需要转化模块时由建站流程在独立转化页配置。

## 页面与文件

index.html / article.html（指南样板：面包屑+目录条+斑马表+FAQ 结论前置）/ tool.html（手续费对比器，真功能）/ legal.html（披露与免责）/ 404.html / robots.txt / sitemap.xml；`css/public.css`（军哥公共原样样式）+ `css/site.css`（bento 静态补充）+ `css/page.css`（内页）+ `site.js`

## 占位符清单（`%%X%%` 语法）

`%%SITE_NAME%%`、`%%BRAND_EN%%`、`%%SITE_DOMAIN%%`、`%%SITE_DESC%%`、`%%SEO_TITLE%%`、`%%HERO_EYEBROW%%`、`%%HERO_TITLE%%`、`%%HERO_DESCRIPTION%%`、`%%HOME_FEATURED_LABEL%%`、`%%FOOTER_NOTE%%`、`%%LANG%%`

## 可调项

- 磁贴可增删重排（栏目瓦片/文章卡/工具入口数量不限，grid 自动排布；跨列规则见 css 的 span 设置）
- 建站时首页应扩充为宽内链枢纽：文章卡区按真实文章数量铺开（对标 50+ 内链）
- 配色：改 `:root` 令牌即整站换肤（深色模式记得同步）
