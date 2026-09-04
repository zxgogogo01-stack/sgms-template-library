# 073 Berry Masonry · 工作流 v2 接入契约

## 范围与风格

只制作网站模板，不写业务文章或注册教程，不部署。原 masonry-studio.css 全字节保留，新增 exhibit-wings.css 修正深色配色与版式，保留首页全部原类名、卡片轨道、三方法条和错层圆角墙。原外部动态包未取得，忠实度未核验，不把 UI 就绪当作保真证明。

34 个 HTML：30 可索引页、404、3 个 noindex 手动旧入口。十二篇文章框架、三个展组各四篇、五个真工具、七页公开说明齐全。cornerstone 只代表内容容量角色，registrationGuide 是兼容字段名，指通用推广组件页，不指定教程题材。

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "reading-room.html",
  "articles": [
    "exhibits/orbit-note.html",
    "exhibits/caption-ribbon.html",
    "exhibits/scale-pair.html",
    "exhibits/color-band.html",
    "exhibits/source-pocket.html",
    "exhibits/reading-route.html",
    "exhibits/comparison-block.html",
    "exhibits/margin-drawer.html",
    "exhibits/sequence-collage.html",
    "exhibits/evidence-window.html",
    "exhibits/linked-questions.html",
    "exhibits/last-card.html"
  ],
  "cornerstones": [
    "exhibits/orbit-note.html",
    "exhibits/caption-ribbon.html"
  ],
  "registrationGuide": "exhibits/last-card.html",
  "articleCovers": {
    "exhibits/orbit-note.html": {
      "display": "assets/collages/orbit-note.webp",
      "og": "assets/collages/orbit-note.png"
    },
    "exhibits/caption-ribbon.html": {
      "display": "assets/collages/caption-ribbon.webp",
      "og": "assets/collages/caption-ribbon.png"
    },
    "exhibits/scale-pair.html": {
      "display": "assets/collages/scale-pair.webp",
      "og": "assets/collages/scale-pair.png"
    },
    "exhibits/color-band.html": {
      "display": "assets/collages/color-band.webp",
      "og": "assets/collages/color-band.png"
    },
    "exhibits/source-pocket.html": {
      "display": "assets/collages/source-pocket.webp",
      "og": "assets/collages/source-pocket.png"
    },
    "exhibits/reading-route.html": {
      "display": "assets/collages/reading-route.webp",
      "og": "assets/collages/reading-route.png"
    },
    "exhibits/comparison-block.html": {
      "display": "assets/collages/comparison-block.webp",
      "og": "assets/collages/comparison-block.png"
    },
    "exhibits/margin-drawer.html": {
      "display": "assets/collages/margin-drawer.webp",
      "og": "assets/collages/margin-drawer.png"
    },
    "exhibits/sequence-collage.html": {
      "display": "assets/collages/sequence-collage.webp",
      "og": "assets/collages/sequence-collage.png"
    },
    "exhibits/evidence-window.html": {
      "display": "assets/collages/evidence-window.webp",
      "og": "assets/collages/evidence-window.png"
    },
    "exhibits/linked-questions.html": {
      "display": "assets/collages/linked-questions.webp",
      "og": "assets/collages/linked-questions.png"
    },
    "exhibits/last-card.html": {
      "display": "assets/collages/last-card.webp",
      "og": "assets/collages/last-card.png"
    }
  },
  "categories": [
    {
      "path": "hangs/opening-set.html",
      "label": "引题组",
      "articles": [
        "exhibits/orbit-note.html",
        "exhibits/caption-ribbon.html",
        "exhibits/scale-pair.html",
        "exhibits/color-band.html"
      ]
    },
    {
      "path": "hangs/context-set.html",
      "label": "并置组",
      "articles": [
        "exhibits/source-pocket.html",
        "exhibits/reading-route.html",
        "exhibits/comparison-block.html",
        "exhibits/margin-drawer.html"
      ]
    },
    {
      "path": "hangs/return-set.html",
      "label": "回看组",
      "articles": [
        "exhibits/sequence-collage.html",
        "exhibits/evidence-window.html",
        "exhibits/linked-questions.html",
        "exhibits/last-card.html"
      ]
    }
  ],
  "toolIndex": "curation-studio.html",
  "tools": [
    "studio/column-balance.html",
    "studio/group-weave.html",
    "studio/focal-crop.html",
    "studio/order-check.html",
    "studio/space-selection.html"
  ],
  "legal": {
    "about": "curatorial-room.html",
    "contact": "visitor-letter.html",
    "disclosure": "interest-label.html",
    "disclaimer": "scope-label.html",
    "privacy": "data-label.html",
    "corrections": "amendment-wall.html",
    "editorial": "selection-policy.html"
  },
  "error404": "404.html",
  "robots": "robots.txt",
  "sitemap": "sitemap.xml",
  "feed": "feed.xml",
  "security": ".well-known/security.txt",
  "favicon": "favicon.ico",
  "appleTouchIcon": "apple-touch-icon.png",
  "socialImage": "assets/curated-wall.png",
  "variables": {
    "siteDomain": "%%SITE_DOMAIN%%",
    "siteName": "%%SITE_NAME%%",
    "wordmark": "%%BRAND_EN%%",
    "inviteCode": "%%INVITE_CODE%%",
    "benefitRate": "%%BENEFIT_RATE%%",
    "benefitDisclaimer": "%%BENEFIT_DISCLAIMER%%",
    "affiliateUrl": "%%AFFILIATE_URL%%"
  }
}
```

## 后续 AI 接手

- 仅填写经核实的正文与变量，不再补 UI、工具、资源、文章目录或移动样式。保留 ID、原生 details、标签关系和稿件角色。
- 三种开场、十二种主组件、三种 FAQ 与收尾、作者与更正路径、接续阅读已齐。主组件是轨道札记、题签带、大小卡、色带、来源袋、阅读路径、对照窗、页边抽屉、次序拼贴、证据窗、读者连问、末张卡。不要统一改成同款卡片。
- 首页形态 A 只有代码真复制、可替换利益点和脚注。只有 last-card.html 一处静态推广槽位，保留 rel 四值、target 与紧邻披露；导航、目录、工具、合规和页脚不添加推广直链。
- 展墙依 DOM 顺序逐行排布，不使用 dense 自动回填，不以 CSS order 或列式重排打乱键盘阅读次序；卡片筛选只隐藏不匹配项。
- 所有可索引页可从首页到达，各内页至少三个站内入链，导航固定五个入口。三个旧入口不自动跳转。
- 十二个独立圆角拼贴 SVG、对应 1200×630 WebP 与 PNG、独立社交图、180px Apple 图标、16/32/48 ICO 均已配齐。它们是抽象图形，不是实拍、证据或第三方品牌素材。
- 本模板不写死平台数字、监管结论、虚构作者经历。QA 演示只在内存中渲染，不可当正式正文发布。

## 变量格式与容量

站点标题 8–28 中文字，首页标题 8–20 字；摘要 40–100 字，首页说明 35–65 字；利益脚注 16–45 字；代码 4–28 ASCII 字符；BRAND_EN 3–24 英文字母/罗马字，MONOGRAM 1–3 字符。ORBIT_LABEL_n 为 2–8 英文字母，ORBIT_CENTER 2–6 英文字母；ROUTE_MARK_n、INDEX_NOTE、GROUP_n_SHORT 与 CARD_NOTE 为 2–12 中文字。正文每槽可填 100–800 字并按内容分段，保留现有标题锚点。

SITE_DOMAIN 仅域名，无协议和路径。AFFILIATE_URL 与 SOURCE_n_URL 填核实的绝对 HTTPS URL，拒绝脚本协议；邮箱填纯地址。LANG 为真实单站 BCP47，发布日期与修改日期为真实 ISO 日期，RSS_DATE 为真实 RFC2822 UTC 日期，SECURITY_EXPIRES 为未来 RFC3339 UTC 到期日期。

替换按上下文转义：HTML 文本转义 & < >，属性另转义双引号，XML 使用 XML 转义，JSON-LD 使用 JSON 字符串转义并将 < 写为 \u003c。不要把完整 HTML 塞进文本变量，不做未转义全局替换。事实、作者真实性、合规与生产审核仍属于单站流程。

## 五个本地工作台

### 卡片分栏平衡

每行 标题 | 高度；原值最多 8000 码点，NFKC 后标题折叠空白，忽略大小写后须唯一。高度不接受符号、小数、指数或多余前导零。

依次比较每列当前末端，下一张卡放入最短列；同高取列号最小者，已有卡片的列先加间隔。

显示全部 60 张以内的原始行、列、顶部和底部位置，以及最终列高和极差。结果不再截断到前 20 张。

高度由读者估计，不读取字体、图片、真实宽度或浏览器布局；本工具也不保证这个贪心方案达到全局最优。

纯本地数值模拟，不改变页面内容顺序，不读取 DOM、文件或外部网页。

### 分组轮播编排

原值最多 10000 码点，每行一个 |。NFKC 后折叠空白，分组按忽略大小写归并，显示首次写法；卡片标题忽略大小写后全表唯一。

分组依首次出现建立队列。每轮按组序从每个非空队列取一张，组内保持原输入次序。

全部卡片带原始行号、轮次、组名和新序号；组先耗尽就跳过，不填造空卡。

只做显式分组的稳定轮播，不推断主题、优先级或读者喜好，也不保证所有相邻卡属于不同组。

只处理手输清单，不上传资料、不写入网站，也不连接内容推荐系统。

### 焦点裁切计算

四个尺寸为 1–20000 整数，焦点为 0–100 整数；不用单位、百分号、小数、指数或前导零。

覆盖比例取容器/源图两轴比值的较大者，反算源图裁切宽高；先以焦点为中心，再把裁切窗口夹到图像边界。

源图坐标与尺寸通常保留三位小数，小于 0.0005 的正值保留六位，比例六位小数；同时计算完整放入比例与上下、左右对称留白。

这是矩形尺寸模型，不读取 EXIF 旋转、图片主体、CSS object-position 或实际渲染。小数仅显示舍入，不代表像素级素材验证。

无需上传图片，不读取剪贴板图像，不绘制或生成新图片，所有运算留在本页。

### 阅读顺序核对

每份原值最多 4000 码点；跳过空行，拒绝重复编号、非法格式以及两份集合不一致。

将调整后编号映射为原始位置；逐对统计逆序，再用最长递增子序列长度求 n − LIS，表示任意单项移位的最小次数。

列出每项原始位置、新位置、差值以及两份原始行号；位置差为 0 与属于某个最优保留序列不是同一概念。

只是编号次序的数学比较，不读取网站键盘序、CSS 视觉顺序或辅助技术，也不能据此宣称可访问性合格。

不改写清单或页面，不执行拖拽、不写 DOM 排序，不连接网站。

### 展位组合挑选

原值最多 6000 码点。NFKC 后解析 ID 与两个整数，ID 格式与顺序核对一致且唯一；不接受符号、小数、指数或前导零。

使用 0/1 背包动态规划，每张卡至多选一次。先最大化总优先分，同分取较少占用，再同分同占用时取原始项目序号字典序更小的组合。

列出全部项目的入选状态与原始行号、选中编号、总分、占用和剩余容量；没有项目能放下时，空组合是有效结果。

优先分由读者给定，不是内容质量、SEO 效果或商业价值的自动评分；不包含列布局、阅读顺序或图片实测。

只求解手输整数模型，不自动发布、删除或隐藏网站内容，不调用远程优化服务。

全部工具先检查原值长度与 Unicode 完整性，拒绝禁止控制符，不静默截断。输入/选项变化或重置立刻清除旧结果，错误聚焦并关联字段，复制使用修订号防止迟到反馈。用户清单不写存储；只有主题保存于 berry-masonry-073-palette。无 JS 时计算与复制禁用，导航、正文与原生折叠说明可读。

## 审计

依次运行 tools/validate.js、tools/audit-template.js、tools/audit-workflow-readiness.js、tools/check-similarity.js，再运行 tools/qa/073-berry-masonry-browser.js。逐页核验 1440/768/390/360px 双主题、五工具独立算法与边界、原生输入、复制及失效、键盘、无 JS、深路径 404，再人工复看所有版式；全部通过才更新进度。

## 完整变量登记

- %%A10_BODY_1_A%%
- %%A10_BODY_1_B%%
- %%A10_BODY_2_A%%
- %%A10_BODY_2_B%%
- %%A10_BODY_3_A%%
- %%A10_BODY_3_B%%
- %%A10_BODY_4_A%%
- %%A10_BODY_4_B%%
- %%A10_CARD_NOTE%%
- %%A10_CHECKED_NOTE%%
- %%A10_COVER_ALT%%
- %%A10_COVER_CAPTION%%
- %%A10_ENDING_LABEL%%
- %%A10_ENDING_TEXT%%
- %%A10_ENDING_TITLE%%
- %%A10_EVIDENCE_CONTEXT%%
- %%A10_EVIDENCE_LABEL%%
- %%A10_EVIDENCE_LIMIT%%
- %%A10_EVIDENCE_TEXT%%
- %%A10_EYEBROW%%
- %%A10_FAQ_A_1%%
- %%A10_FAQ_A_2%%
- %%A10_FAQ_Q_1%%
- %%A10_FAQ_Q_2%%
- %%A10_FAQ_TITLE%%
- %%A10_H2_1%%
- %%A10_H2_2%%
- %%A10_H2_3%%
- %%A10_H2_4%%
- %%A10_INDEX_FOOTNOTE%%
- %%A10_INDEX_NOTE%%
- %%A10_LIMIT_TEXT%%
- %%A10_MODIFIED%%
- %%A10_PART_1_LABEL%%
- %%A10_PART_2_LABEL%%
- %%A10_PART_3_LABEL%%
- %%A10_PART_4_LABEL%%
- %%A10_POINT_1%%
- %%A10_POINT_2%%
- %%A10_POINT_3%%
- %%A10_PUBLISHED%%
- %%A10_PULL_QUOTE%%
- %%A10_RSS_DATE%%
- %%A10_SUMMARY%%
- %%A10_TITLE%%
- %%A10_TOC_LABEL%%
- %%A11_BODY_1_A%%
- %%A11_BODY_1_B%%
- %%A11_BODY_2_A%%
- %%A11_BODY_2_B%%
- %%A11_BODY_3_A%%
- %%A11_BODY_3_B%%
- %%A11_BODY_4_A%%
- %%A11_BODY_4_B%%
- %%A11_CARD_NOTE%%
- %%A11_CHECKED_NOTE%%
- %%A11_COVER_ALT%%
- %%A11_COVER_CAPTION%%
- %%A11_ENDING_LABEL%%
- %%A11_ENDING_TEXT%%
- %%A11_ENDING_TITLE%%
- %%A11_EYEBROW%%
- %%A11_FAQ_A_1%%
- %%A11_FAQ_A_2%%
- %%A11_FAQ_Q_1%%
- %%A11_FAQ_Q_2%%
- %%A11_FAQ_TITLE%%
- %%A11_H2_1%%
- %%A11_H2_2%%
- %%A11_H2_3%%
- %%A11_H2_4%%
- %%A11_INDEX_FOOTNOTE%%
- %%A11_INDEX_NOTE%%
- %%A11_LIMIT_TEXT%%
- %%A11_MODIFIED%%
- %%A11_PART_1_LABEL%%
- %%A11_PART_2_LABEL%%
- %%A11_PART_3_LABEL%%
- %%A11_PART_4_LABEL%%
- %%A11_POINT_1%%
- %%A11_POINT_2%%
- %%A11_POINT_3%%
- %%A11_PUBLISHED%%
- %%A11_PULL_QUOTE%%
- %%A11_READER_A_1%%
- %%A11_READER_A_2%%
- %%A11_READER_A_3%%
- %%A11_READER_NOTE_1%%
- %%A11_READER_NOTE_2%%
- %%A11_READER_NOTE_3%%
- %%A11_READER_Q_1%%
- %%A11_READER_Q_2%%
- %%A11_READER_Q_3%%
- %%A11_RSS_DATE%%
- %%A11_SUMMARY%%
- %%A11_TITLE%%
- %%A11_TOC_LABEL%%
- %%A12_BODY_1_A%%
- %%A12_BODY_1_B%%
- %%A12_BODY_2_A%%
- %%A12_BODY_2_B%%
- %%A12_BODY_3_A%%
- %%A12_BODY_3_B%%
- %%A12_BODY_4_A%%
- %%A12_BODY_4_B%%
- %%A12_CARD_NOTE%%
- %%A12_CHECKED_NOTE%%
- %%A12_COVER_ALT%%
- %%A12_COVER_CAPTION%%
- %%A12_ENDING_LABEL%%
- %%A12_ENDING_TEXT%%
- %%A12_ENDING_TITLE%%
- %%A12_EYEBROW%%
- %%A12_FAQ_A_1%%
- %%A12_FAQ_A_2%%
- %%A12_FAQ_A_3%%
- %%A12_FAQ_Q_1%%
- %%A12_FAQ_Q_2%%
- %%A12_FAQ_Q_3%%
- %%A12_FAQ_TITLE%%
- %%A12_H2_1%%
- %%A12_H2_2%%
- %%A12_H2_3%%
- %%A12_H2_4%%
- %%A12_INDEX_FOOTNOTE%%
- %%A12_INDEX_NOTE%%
- %%A12_LAST_LABEL%%
- %%A12_LAST_NOTE%%
- %%A12_LAST_TERM_1%%
- %%A12_LAST_TERM_2%%
- %%A12_LAST_TERM_3%%
- %%A12_LAST_TEXT_1%%
- %%A12_LAST_TEXT_2%%
- %%A12_LAST_TEXT_3%%
- %%A12_LAST_TITLE%%
- %%A12_LIMIT_TEXT%%
- %%A12_MODIFIED%%
- %%A12_OPENING_LABEL%%
- %%A12_OPENING_NOTE%%
- %%A12_PART_1_LABEL%%
- %%A12_PART_2_LABEL%%
- %%A12_PART_3_LABEL%%
- %%A12_PART_4_LABEL%%
- %%A12_POINT_1%%
- %%A12_POINT_2%%
- %%A12_POINT_3%%
- %%A12_PUBLISHED%%
- %%A12_PULL_QUOTE%%
- %%A12_RSS_DATE%%
- %%A12_SUMMARY%%
- %%A12_TITLE%%
- %%A12_TOC_LABEL%%
- %%A1_BODY_1_A%%
- %%A1_BODY_1_B%%
- %%A1_BODY_2_A%%
- %%A1_BODY_2_B%%
- %%A1_BODY_3_A%%
- %%A1_BODY_3_B%%
- %%A1_BODY_4_A%%
- %%A1_BODY_4_B%%
- %%A1_CARD_NOTE%%
- %%A1_CHECKED_NOTE%%
- %%A1_COVER_ALT%%
- %%A1_COVER_CAPTION%%
- %%A1_ENDING_LABEL%%
- %%A1_ENDING_TEXT%%
- %%A1_ENDING_TITLE%%
- %%A1_EYEBROW%%
- %%A1_FAQ_A_1%%
- %%A1_FAQ_A_2%%
- %%A1_FAQ_Q_1%%
- %%A1_FAQ_Q_2%%
- %%A1_FAQ_TITLE%%
- %%A1_H2_1%%
- %%A1_H2_2%%
- %%A1_H2_3%%
- %%A1_H2_4%%
- %%A1_INDEX_FOOTNOTE%%
- %%A1_INDEX_NOTE%%
- %%A1_LIMIT_TEXT%%
- %%A1_MODIFIED%%
- %%A1_ORBIT_LABEL%%
- %%A1_ORBIT_TEXT%%
- %%A1_ORBIT_TITLE%%
- %%A1_PART_1_LABEL%%
- %%A1_PART_2_LABEL%%
- %%A1_PART_3_LABEL%%
- %%A1_PART_4_LABEL%%
- %%A1_POINT_1%%
- %%A1_POINT_2%%
- %%A1_POINT_3%%
- %%A1_PUBLISHED%%
- %%A1_PULL_QUOTE%%
- %%A1_RSS_DATE%%
- %%A1_SATELLITE_LABEL_1%%
- %%A1_SATELLITE_LABEL_2%%
- %%A1_SATELLITE_TEXT_1%%
- %%A1_SATELLITE_TEXT_2%%
- %%A1_SUMMARY%%
- %%A1_TITLE%%
- %%A1_TOC_LABEL%%
- %%A2_BODY_1_A%%
- %%A2_BODY_1_B%%
- %%A2_BODY_2_A%%
- %%A2_BODY_2_B%%
- %%A2_BODY_3_A%%
- %%A2_BODY_3_B%%
- %%A2_BODY_4_A%%
- %%A2_BODY_4_B%%
- %%A2_CARD_NOTE%%
- %%A2_CHECKED_NOTE%%
- %%A2_COVER_ALT%%
- %%A2_COVER_CAPTION%%
- %%A2_ENDING_LABEL%%
- %%A2_ENDING_TEXT%%
- %%A2_ENDING_TITLE%%
- %%A2_EYEBROW%%
- %%A2_FAQ_A_1%%
- %%A2_FAQ_A_2%%
- %%A2_FAQ_Q_1%%
- %%A2_FAQ_Q_2%%
- %%A2_FAQ_TITLE%%
- %%A2_H2_1%%
- %%A2_H2_2%%
- %%A2_H2_3%%
- %%A2_H2_4%%
- %%A2_INDEX_FOOTNOTE%%
- %%A2_INDEX_NOTE%%
- %%A2_LIMIT_TEXT%%
- %%A2_MODIFIED%%
- %%A2_PART_1_LABEL%%
- %%A2_PART_2_LABEL%%
- %%A2_PART_3_LABEL%%
- %%A2_PART_4_LABEL%%
- %%A2_POINT_1%%
- %%A2_POINT_2%%
- %%A2_POINT_3%%
- %%A2_PUBLISHED%%
- %%A2_PULL_QUOTE%%
- %%A2_RIBBON_TERM_1%%
- %%A2_RIBBON_TERM_2%%
- %%A2_RIBBON_TERM_3%%
- %%A2_RIBBON_TERM_4%%
- %%A2_RIBBON_TEXT_1%%
- %%A2_RIBBON_TEXT_2%%
- %%A2_RIBBON_TEXT_3%%
- %%A2_RIBBON_TEXT_4%%
- %%A2_RIBBON_TITLE_1%%
- %%A2_RIBBON_TITLE_2%%
- %%A2_RIBBON_TITLE_3%%
- %%A2_RIBBON_TITLE_4%%
- %%A2_RSS_DATE%%
- %%A2_SUMMARY%%
- %%A2_TITLE%%
- %%A2_TOC_LABEL%%
- %%A3_BODY_1_A%%
- %%A3_BODY_1_B%%
- %%A3_BODY_2_A%%
- %%A3_BODY_2_B%%
- %%A3_BODY_3_A%%
- %%A3_BODY_3_B%%
- %%A3_BODY_4_A%%
- %%A3_BODY_4_B%%
- %%A3_CARD_NOTE%%
- %%A3_CHECKED_NOTE%%
- %%A3_COVER_ALT%%
- %%A3_COVER_CAPTION%%
- %%A3_ENDING_LABEL%%
- %%A3_ENDING_TEXT%%
- %%A3_ENDING_TITLE%%
- %%A3_EYEBROW%%
- %%A3_FAQ_A_1%%
- %%A3_FAQ_A_2%%
- %%A3_FAQ_A_3%%
- %%A3_FAQ_Q_1%%
- %%A3_FAQ_Q_2%%
- %%A3_FAQ_Q_3%%
- %%A3_FAQ_TITLE%%
- %%A3_H2_1%%
- %%A3_H2_2%%
- %%A3_H2_3%%
- %%A3_H2_4%%
- %%A3_INDEX_FOOTNOTE%%
- %%A3_INDEX_NOTE%%
- %%A3_LARGE_LABEL%%
- %%A3_LARGE_TEXT%%
- %%A3_LARGE_TITLE%%
- %%A3_LIMIT_TEXT%%
- %%A3_MODIFIED%%
- %%A3_OPENING_LABEL%%
- %%A3_OPENING_NOTE%%
- %%A3_PAIR_CAPTION%%
- %%A3_PART_1_LABEL%%
- %%A3_PART_2_LABEL%%
- %%A3_PART_3_LABEL%%
- %%A3_PART_4_LABEL%%
- %%A3_POINT_1%%
- %%A3_POINT_2%%
- %%A3_POINT_3%%
- %%A3_PUBLISHED%%
- %%A3_PULL_QUOTE%%
- %%A3_RSS_DATE%%
- %%A3_SMALL_LABEL%%
- %%A3_SMALL_TEXT%%
- %%A3_SMALL_TITLE%%
- %%A3_SUMMARY%%
- %%A3_TITLE%%
- %%A3_TOC_LABEL%%
- %%A4_BAND_NOTE_1%%
- %%A4_BAND_NOTE_2%%
- %%A4_BAND_NOTE_3%%
- %%A4_BAND_TEXT_1%%
- %%A4_BAND_TEXT_2%%
- %%A4_BAND_TEXT_3%%
- %%A4_BAND_TITLE_1%%
- %%A4_BAND_TITLE_2%%
- %%A4_BAND_TITLE_3%%
- %%A4_BODY_1_A%%
- %%A4_BODY_1_B%%
- %%A4_BODY_2_A%%
- %%A4_BODY_2_B%%
- %%A4_BODY_3_A%%
- %%A4_BODY_3_B%%
- %%A4_BODY_4_A%%
- %%A4_BODY_4_B%%
- %%A4_CARD_NOTE%%
- %%A4_CHECKED_NOTE%%
- %%A4_COVER_ALT%%
- %%A4_COVER_CAPTION%%
- %%A4_ENDING_LABEL%%
- %%A4_ENDING_TEXT%%
- %%A4_ENDING_TITLE%%
- %%A4_EYEBROW%%
- %%A4_FAQ_A_1%%
- %%A4_FAQ_A_2%%
- %%A4_FAQ_Q_1%%
- %%A4_FAQ_Q_2%%
- %%A4_FAQ_TITLE%%
- %%A4_H2_1%%
- %%A4_H2_2%%
- %%A4_H2_3%%
- %%A4_H2_4%%
- %%A4_INDEX_FOOTNOTE%%
- %%A4_INDEX_NOTE%%
- %%A4_LIMIT_TEXT%%
- %%A4_MODIFIED%%
- %%A4_PART_1_LABEL%%
- %%A4_PART_2_LABEL%%
- %%A4_PART_3_LABEL%%
- %%A4_PART_4_LABEL%%
- %%A4_POINT_1%%
- %%A4_POINT_2%%
- %%A4_POINT_3%%
- %%A4_PUBLISHED%%
- %%A4_PULL_QUOTE%%
- %%A4_RSS_DATE%%
- %%A4_SUMMARY%%
- %%A4_TITLE%%
- %%A4_TOC_LABEL%%
- %%A5_BODY_1_A%%
- %%A5_BODY_1_B%%
- %%A5_BODY_2_A%%
- %%A5_BODY_2_B%%
- %%A5_BODY_3_A%%
- %%A5_BODY_3_B%%
- %%A5_BODY_4_A%%
- %%A5_BODY_4_B%%
- %%A5_CARD_NOTE%%
- %%A5_CHECKED_NOTE%%
- %%A5_COVER_ALT%%
- %%A5_COVER_CAPTION%%
- %%A5_ENDING_LABEL%%
- %%A5_ENDING_TEXT%%
- %%A5_ENDING_TITLE%%
- %%A5_EYEBROW%%
- %%A5_FAQ_A_1%%
- %%A5_FAQ_A_2%%
- %%A5_FAQ_Q_1%%
- %%A5_FAQ_Q_2%%
- %%A5_FAQ_TITLE%%
- %%A5_H2_1%%
- %%A5_H2_2%%
- %%A5_H2_3%%
- %%A5_H2_4%%
- %%A5_INDEX_FOOTNOTE%%
- %%A5_INDEX_NOTE%%
- %%A5_LIMIT_TEXT%%
- %%A5_MODIFIED%%
- %%A5_PART_1_LABEL%%
- %%A5_PART_2_LABEL%%
- %%A5_PART_3_LABEL%%
- %%A5_PART_4_LABEL%%
- %%A5_POCKET_TITLE_1%%
- %%A5_POCKET_TITLE_2%%
- %%A5_POCKET_TITLE_3%%
- %%A5_POINT_1%%
- %%A5_POINT_2%%
- %%A5_POINT_3%%
- %%A5_PUBLISHED%%
- %%A5_PULL_QUOTE%%
- %%A5_RSS_DATE%%
- %%A5_SOURCE_1_LABEL%%
- %%A5_SOURCE_1_URL%%
- %%A5_SOURCE_2_LABEL%%
- %%A5_SOURCE_2_URL%%
- %%A5_SOURCE_3_LABEL%%
- %%A5_SOURCE_3_URL%%
- %%A5_SOURCE_SCOPE_1%%
- %%A5_SOURCE_SCOPE_2%%
- %%A5_SOURCE_SCOPE_3%%
- %%A5_SOURCE_TEXT_1%%
- %%A5_SOURCE_TEXT_2%%
- %%A5_SOURCE_TEXT_3%%
- %%A5_SUMMARY%%
- %%A5_TITLE%%
- %%A5_TOC_LABEL%%
- %%A6_BODY_1_A%%
- %%A6_BODY_1_B%%
- %%A6_BODY_2_A%%
- %%A6_BODY_2_B%%
- %%A6_BODY_3_A%%
- %%A6_BODY_3_B%%
- %%A6_BODY_4_A%%
- %%A6_BODY_4_B%%
- %%A6_CARD_NOTE%%
- %%A6_CHECKED_NOTE%%
- %%A6_COVER_ALT%%
- %%A6_COVER_CAPTION%%
- %%A6_ENDING_LABEL%%
- %%A6_ENDING_TEXT%%
- %%A6_ENDING_TITLE%%
- %%A6_EYEBROW%%
- %%A6_FAQ_A_1%%
- %%A6_FAQ_A_2%%
- %%A6_FAQ_A_3%%
- %%A6_FAQ_Q_1%%
- %%A6_FAQ_Q_2%%
- %%A6_FAQ_Q_3%%
- %%A6_FAQ_TITLE%%
- %%A6_H2_1%%
- %%A6_H2_2%%
- %%A6_H2_3%%
- %%A6_H2_4%%
- %%A6_INDEX_FOOTNOTE%%
- %%A6_INDEX_NOTE%%
- %%A6_LIMIT_TEXT%%
- %%A6_MODIFIED%%
- %%A6_OPENING_LABEL%%
- %%A6_OPENING_NOTE%%
- %%A6_PART_1_LABEL%%
- %%A6_PART_2_LABEL%%
- %%A6_PART_3_LABEL%%
- %%A6_PART_4_LABEL%%
- %%A6_POINT_1%%
- %%A6_POINT_2%%
- %%A6_POINT_3%%
- %%A6_PUBLISHED%%
- %%A6_PULL_QUOTE%%
- %%A6_ROUTE_MARK_1%%
- %%A6_ROUTE_MARK_2%%
- %%A6_ROUTE_MARK_3%%
- %%A6_ROUTE_MARK_4%%
- %%A6_ROUTE_TEXT_1%%
- %%A6_ROUTE_TEXT_2%%
- %%A6_ROUTE_TEXT_3%%
- %%A6_ROUTE_TEXT_4%%
- %%A6_ROUTE_TITLE_1%%
- %%A6_ROUTE_TITLE_2%%
- %%A6_ROUTE_TITLE_3%%
- %%A6_ROUTE_TITLE_4%%
- %%A6_RSS_DATE%%
- %%A6_SUMMARY%%
- %%A6_TITLE%%
- %%A6_TOC_LABEL%%
- %%A7_BODY_1_A%%
- %%A7_BODY_1_B%%
- %%A7_BODY_2_A%%
- %%A7_BODY_2_B%%
- %%A7_BODY_3_A%%
- %%A7_BODY_3_B%%
- %%A7_BODY_4_A%%
- %%A7_BODY_4_B%%
- %%A7_CARD_NOTE%%
- %%A7_CELL_1_1%%
- %%A7_CELL_1_2%%
- %%A7_CELL_1_3%%
- %%A7_CELL_2_1%%
- %%A7_CELL_2_2%%
- %%A7_CELL_2_3%%
- %%A7_CELL_3_1%%
- %%A7_CELL_3_2%%
- %%A7_CELL_3_3%%
- %%A7_CHECKED_NOTE%%
- %%A7_COL_1%%
- %%A7_COL_2%%
- %%A7_COL_3%%
- %%A7_COL_4%%
- %%A7_COVER_ALT%%
- %%A7_COVER_CAPTION%%
- %%A7_ENDING_LABEL%%
- %%A7_ENDING_TEXT%%
- %%A7_ENDING_TITLE%%
- %%A7_EYEBROW%%
- %%A7_FAQ_A_1%%
- %%A7_FAQ_A_2%%
- %%A7_FAQ_Q_1%%
- %%A7_FAQ_Q_2%%
- %%A7_FAQ_TITLE%%
- %%A7_H2_1%%
- %%A7_H2_2%%
- %%A7_H2_3%%
- %%A7_H2_4%%
- %%A7_INDEX_FOOTNOTE%%
- %%A7_INDEX_NOTE%%
- %%A7_LIMIT_TEXT%%
- %%A7_MODIFIED%%
- %%A7_PART_1_LABEL%%
- %%A7_PART_2_LABEL%%
- %%A7_PART_3_LABEL%%
- %%A7_PART_4_LABEL%%
- %%A7_POINT_1%%
- %%A7_POINT_2%%
- %%A7_POINT_3%%
- %%A7_PUBLISHED%%
- %%A7_PULL_QUOTE%%
- %%A7_ROW_1%%
- %%A7_ROW_2%%
- %%A7_ROW_3%%
- %%A7_RSS_DATE%%
- %%A7_SUMMARY%%
- %%A7_TABLE_LABEL%%
- %%A7_TITLE%%
- %%A7_TOC_LABEL%%
- %%A8_BODY_1_A%%
- %%A8_BODY_1_B%%
- %%A8_BODY_2_A%%
- %%A8_BODY_2_B%%
- %%A8_BODY_3_A%%
- %%A8_BODY_3_B%%
- %%A8_BODY_4_A%%
- %%A8_BODY_4_B%%
- %%A8_CARD_NOTE%%
- %%A8_CHECKED_NOTE%%
- %%A8_COVER_ALT%%
- %%A8_COVER_CAPTION%%
- %%A8_DRAWER_LABEL_1%%
- %%A8_DRAWER_LABEL_2%%
- %%A8_DRAWER_LABEL_3%%
- %%A8_DRAWER_TEXT_1%%
- %%A8_DRAWER_TEXT_2%%
- %%A8_DRAWER_TEXT_3%%
- %%A8_DRAWER_TITLE_1%%
- %%A8_DRAWER_TITLE_2%%
- %%A8_DRAWER_TITLE_3%%
- %%A8_ENDING_LABEL%%
- %%A8_ENDING_TEXT%%
- %%A8_ENDING_TITLE%%
- %%A8_EYEBROW%%
- %%A8_FAQ_A_1%%
- %%A8_FAQ_A_2%%
- %%A8_FAQ_Q_1%%
- %%A8_FAQ_Q_2%%
- %%A8_FAQ_TITLE%%
- %%A8_H2_1%%
- %%A8_H2_2%%
- %%A8_H2_3%%
- %%A8_H2_4%%
- %%A8_INDEX_FOOTNOTE%%
- %%A8_INDEX_NOTE%%
- %%A8_LIMIT_TEXT%%
- %%A8_MODIFIED%%
- %%A8_PART_1_LABEL%%
- %%A8_PART_2_LABEL%%
- %%A8_PART_3_LABEL%%
- %%A8_PART_4_LABEL%%
- %%A8_POINT_1%%
- %%A8_POINT_2%%
- %%A8_POINT_3%%
- %%A8_PUBLISHED%%
- %%A8_PULL_QUOTE%%
- %%A8_RSS_DATE%%
- %%A8_SUMMARY%%
- %%A8_TITLE%%
- %%A8_TOC_LABEL%%
- %%A9_BODY_1_A%%
- %%A9_BODY_1_B%%
- %%A9_BODY_2_A%%
- %%A9_BODY_2_B%%
- %%A9_BODY_3_A%%
- %%A9_BODY_3_B%%
- %%A9_BODY_4_A%%
- %%A9_BODY_4_B%%
- %%A9_CARD_NOTE%%
- %%A9_CHECKED_NOTE%%
- %%A9_COVER_ALT%%
- %%A9_COVER_CAPTION%%
- %%A9_ENDING_LABEL%%
- %%A9_ENDING_TEXT%%
- %%A9_ENDING_TITLE%%
- %%A9_EYEBROW%%
- %%A9_FAQ_A_1%%
- %%A9_FAQ_A_2%%
- %%A9_FAQ_A_3%%
- %%A9_FAQ_Q_1%%
- %%A9_FAQ_Q_2%%
- %%A9_FAQ_Q_3%%
- %%A9_FAQ_TITLE%%
- %%A9_H2_1%%
- %%A9_H2_2%%
- %%A9_H2_3%%
- %%A9_H2_4%%
- %%A9_INDEX_FOOTNOTE%%
- %%A9_INDEX_NOTE%%
- %%A9_LIMIT_TEXT%%
- %%A9_MODIFIED%%
- %%A9_OPENING_LABEL%%
- %%A9_OPENING_NOTE%%
- %%A9_PART_1_LABEL%%
- %%A9_PART_2_LABEL%%
- %%A9_PART_3_LABEL%%
- %%A9_PART_4_LABEL%%
- %%A9_POINT_1%%
- %%A9_POINT_2%%
- %%A9_POINT_3%%
- %%A9_PUBLISHED%%
- %%A9_PULL_QUOTE%%
- %%A9_RSS_DATE%%
- %%A9_SUMMARY%%
- %%A9_TILE_TEXT_1%%
- %%A9_TILE_TEXT_2%%
- %%A9_TILE_TEXT_3%%
- %%A9_TILE_TEXT_4%%
- %%A9_TILE_TITLE_1%%
- %%A9_TILE_TITLE_2%%
- %%A9_TILE_TITLE_3%%
- %%A9_TILE_TITLE_4%%
- %%A9_TITLE%%
- %%A9_TOC_LABEL%%
- %%ABOUT_BODY_1%%
- %%ABOUT_BODY_2%%
- %%ABOUT_BODY_3%%
- %%ABOUT_BODY_4%%
- %%ABOUT_CONTACT_NOTE%%
- %%ABOUT_EYEBROW%%
- %%ABOUT_H2_1%%
- %%ABOUT_H2_2%%
- %%ABOUT_H2_3%%
- %%ABOUT_H2_4%%
- %%ABOUT_LABEL_1%%
- %%ABOUT_LABEL_2%%
- %%ABOUT_LABEL_3%%
- %%ABOUT_LABEL_4%%
- %%ABOUT_SUMMARY%%
- %%ABOUT_UPDATED_NOTE%%
- %%AFFILIATE_DISCLOSURE%%
- %%AFFILIATE_LABEL%%
- %%AFFILIATE_NOTE%%
- %%AFFILIATE_URL%%
- %%AUTHOR_BIO%%
- %%AUTHOR_NAME%%
- %%BENEFIT_DISCLAIMER%%
- %%BENEFIT_RATE%%
- %%BRAND_EN%%
- %%BRAND_LINE%%
- %%CONTACT_BODY_1%%
- %%CONTACT_BODY_2%%
- %%CONTACT_BODY_3%%
- %%CONTACT_BODY_4%%
- %%CONTACT_CONTACT_NOTE%%
- %%CONTACT_EMAIL%%
- %%CONTACT_EYEBROW%%
- %%CONTACT_H2_1%%
- %%CONTACT_H2_2%%
- %%CONTACT_H2_3%%
- %%CONTACT_H2_4%%
- %%CONTACT_LABEL_1%%
- %%CONTACT_LABEL_2%%
- %%CONTACT_LABEL_3%%
- %%CONTACT_LABEL_4%%
- %%CONTACT_SUMMARY%%
- %%CONTACT_UPDATED_NOTE%%
- %%CORRECTIONS_BODY_1%%
- %%CORRECTIONS_BODY_2%%
- %%CORRECTIONS_BODY_3%%
- %%CORRECTIONS_BODY_4%%
- %%CORRECTIONS_CONTACT_NOTE%%
- %%CORRECTIONS_EYEBROW%%
- %%CORRECTIONS_H2_1%%
- %%CORRECTIONS_H2_2%%
- %%CORRECTIONS_H2_3%%
- %%CORRECTIONS_H2_4%%
- %%CORRECTIONS_LABEL_1%%
- %%CORRECTIONS_LABEL_2%%
- %%CORRECTIONS_LABEL_3%%
- %%CORRECTIONS_LABEL_4%%
- %%CORRECTIONS_SUMMARY%%
- %%CORRECTIONS_UPDATED_NOTE%%
- %%DISCLAIMER_BODY_1%%
- %%DISCLAIMER_BODY_2%%
- %%DISCLAIMER_BODY_3%%
- %%DISCLAIMER_BODY_4%%
- %%DISCLAIMER_CONTACT_NOTE%%
- %%DISCLAIMER_EYEBROW%%
- %%DISCLAIMER_H2_1%%
- %%DISCLAIMER_H2_2%%
- %%DISCLAIMER_H2_3%%
- %%DISCLAIMER_H2_4%%
- %%DISCLAIMER_LABEL_1%%
- %%DISCLAIMER_LABEL_2%%
- %%DISCLAIMER_LABEL_3%%
- %%DISCLAIMER_LABEL_4%%
- %%DISCLAIMER_SUMMARY%%
- %%DISCLAIMER_UPDATED_NOTE%%
- %%DISCLOSURE_BODY_1%%
- %%DISCLOSURE_BODY_2%%
- %%DISCLOSURE_BODY_3%%
- %%DISCLOSURE_BODY_4%%
- %%DISCLOSURE_CONTACT_NOTE%%
- %%DISCLOSURE_EYEBROW%%
- %%DISCLOSURE_H2_1%%
- %%DISCLOSURE_H2_2%%
- %%DISCLOSURE_H2_3%%
- %%DISCLOSURE_H2_4%%
- %%DISCLOSURE_LABEL_1%%
- %%DISCLOSURE_LABEL_2%%
- %%DISCLOSURE_LABEL_3%%
- %%DISCLOSURE_LABEL_4%%
- %%DISCLOSURE_SUMMARY%%
- %%DISCLOSURE_UPDATED_NOTE%%
- %%EDITORIAL_BODY_1%%
- %%EDITORIAL_BODY_2%%
- %%EDITORIAL_BODY_3%%
- %%EDITORIAL_BODY_4%%
- %%EDITORIAL_CONTACT_NOTE%%
- %%EDITORIAL_EYEBROW%%
- %%EDITORIAL_H2_1%%
- %%EDITORIAL_H2_2%%
- %%EDITORIAL_H2_3%%
- %%EDITORIAL_H2_4%%
- %%EDITORIAL_LABEL_1%%
- %%EDITORIAL_LABEL_2%%
- %%EDITORIAL_LABEL_3%%
- %%EDITORIAL_LABEL_4%%
- %%EDITORIAL_SUMMARY%%
- %%EDITORIAL_UPDATED_NOTE%%
- %%FOOTER_NOTE%%
- %%GROUP_1_INTRO%%
- %%GROUP_1_LABEL%%
- %%GROUP_1_SHORT%%
- %%GROUP_2_INTRO%%
- %%GROUP_2_LABEL%%
- %%GROUP_2_SHORT%%
- %%GROUP_3_INTRO%%
- %%GROUP_3_LABEL%%
- %%GROUP_3_SHORT%%
- %%HERO_DESCRIPTION%%
- %%HERO_EYEBROW%%
- %%HERO_TITLE%%
- %%HOME_FEATURED_LABEL%%
- %%HOME_LATEST_LABEL%%
- %%INDEPENDENCE_NOTE%%
- %%INDEX_INTRO%%
- %%INDEX_LABEL%%
- %%INDEX_TITLE%%
- %%INVITE_CODE%%
- %%INVITE_LABEL%%
- %%LANG%%
- %%METHOD_1%%
- %%METHOD_2%%
- %%METHOD_3%%
- %%MONOGRAM%%
- %%ORBIT_ALT%%
- %%ORBIT_CENTER%%
- %%ORBIT_LABEL_1%%
- %%ORBIT_LABEL_2%%
- %%ORBIT_LABEL_3%%
- %%ORBIT_LABEL_4%%
- %%PRIVACY_BODY_1%%
- %%PRIVACY_BODY_2%%
- %%PRIVACY_BODY_3%%
- %%PRIVACY_BODY_4%%
- %%PRIVACY_CONTACT_NOTE%%
- %%PRIVACY_EYEBROW%%
- %%PRIVACY_H2_1%%
- %%PRIVACY_H2_2%%
- %%PRIVACY_H2_3%%
- %%PRIVACY_H2_4%%
- %%PRIVACY_LABEL_1%%
- %%PRIVACY_LABEL_2%%
- %%PRIVACY_LABEL_3%%
- %%PRIVACY_LABEL_4%%
- %%PRIVACY_SUMMARY%%
- %%PRIVACY_UPDATED_NOTE%%
- %%RETURN_NOTE%%
- %%RISK_NOTE%%
- %%SECURITY_EMAIL%%
- %%SECURITY_EXPIRES%%
- %%SEO_TITLE%%
- %%SITE_DESC%%
- %%SITE_DOMAIN%%
- %%SITE_NAME%%
- %%SITE_TAGLINE%%
- %%TOOLS_INTRO%%
- %%TOOLS_LABEL%%
- %%TOOLS_TITLE%%
- %%WALL_INTRO%%
- %%WALL_TITLE%%
