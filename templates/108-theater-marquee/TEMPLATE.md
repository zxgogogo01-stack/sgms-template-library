# 108-theater-marquee

## 来源与静态化口径

- 军哥动态模板：`home_marquee`
- 忠实保留剧院门头、节目分类板、主打大行、售票口胶囊、编号场次行卡与退场链接。
- 原始 `mq-wrap`、全部 `mq-*` 类名、模块层级与顺序完整保留；Go 条件和循环展开为静态示例。

## 文件清单

- `index.html`：Marquee 首页完整静态化。
- `article.html`：三幕戏剧节目单。
- `tool.html`：按视野、距离和氛围切换的选座导览。
- `legal.html`：演出、票务、隐私与修订说明。
- `404.html`、`robots.txt`、`sitemap.xml`：静态站配套。
- `public.css`：军哥公共 `style.css` 的原样副本。
- `static/marquee.css`：补齐源包未提供的 `mq-*` 专属样式与内页样式。
- `static/marquee.js`：移动导航及选座交互。

## 可替换占位符

`[[LANG]]`、`[[SITE_NAME]]`、`[[BRAND_EN]]`、`[[SITE_DOMAIN]]`、`[[SITE_DESC]]`、`[[SITE_TAGLINE]]`、`[[HERO_EYEBROW]]`、`[[HERO_TITLE]]`、`[[HERO_DESCRIPTION]]`、`[[HOME_FEATURED_LABEL]]`、`[[HOME_LATEST_LABEL]]`、`[[CONTACT_CHANNEL]]`

部署前应替换占位符、场次与票务说明。
