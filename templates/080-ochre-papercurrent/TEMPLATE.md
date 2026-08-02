# 080-ochre-papercurrent（军哥 home_paper_current 忠实静态化）

## 适合什么站

适合期刊、专栏和深度内容站：双栏 Hero、置顶边注、正文流、编号目次和衬线排版组成完整的纸刊式首页。

## 复刻说明

- 首页沿用 `home_paper_current` 的 `paper-current-page`、`pc-hero`、`pc-main`、`pc-feature`、`pc-stream` 与 `pc-toc` 原始骨架、类名和顺序。
- Go 条件与循环已静态化为一条置顶稿、五条正文流和五项目次；标题、栏目、摘要、日期及“查看全部”入口均保留。
- `public.css` 是军哥公共样式表的原样副本；`css/current.css` 负责现有赭石纸刊外壳、书脊竖标、深浅色和响应式适配。
- 旧版邀请码纸条及复制逻辑已删除，首页不再添加源模板之外的转化组件。

## 页面与文件

`index.html`、`article.html`、`tool.html`、`legal.html`、`404.html`、`robots.txt`、`sitemap.xml`、`TEMPLATE.md`、`public.css`、`css/current.css`、`current.js`

## 占位符清单（`{X}` 单花括号语法）

`{SITE_NAME}`、`{BRAND_EN}`、`{SITE_DOMAIN}`、`{SITE_TAGLINE}`、`{SITE_DESC}`、`{CONTACT_EMAIL}`、`{LANG}`
（JSON-LD 内花括号为 JSON 语法，替换时按整词精确匹配）

## 可调项

- 正文流和目次可按真实内容同步增删；书脊字、刊期及收录篇数按站点更新。
- 深浅色模式均可用；若启用封面分支，应同步填写真实图片尺寸、替代文本与链接。
