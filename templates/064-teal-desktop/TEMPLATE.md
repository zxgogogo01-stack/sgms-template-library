# Teal Desktop — 完整静态研究桌框架

## 范围与交接

只制作网站模板，不制作注册教程、真实文章或生产站。后续 AI 仅填写经核实的文字与变量，不补 UI、交互、工具、封面或页面体系。registrationGuide 是检查器兼容角色名，指向通用推广组件外壳，不预定文章选题。

保留当前本地首页的研究桌、纸张、放大镜、四盘资料、登记册与启动栏视觉，原 style.css 不改字节，完整框架在 desk-frame.css 中扩展。外部动态源未取得可复验状态，因此不声称与动态源等价；源站保真验证单独标记未验证，不阻断已授权的本地框架完善。无生产部署。

## 页面与风格

35 HTML：31 个可索引页面、独立 404、3 个旧地址兼容页（noindex，不自动跳转）。12 份文章分入来稿盘、工作盘、复核盘、归档盘，每盘 3 份。文章开场为题签与元数据、侧记纸条、图像先行三种；资料卡、范围窗、证据签、竖排栏、边注引语、顺序钉、修订页、对照表、待查问题、复核章、参考书脊、外部资料袋共 12 种内容组件。目录、FAQ、收尾有原生可读的差异。命名空间 td64-；默认 teal，另有 night；无 JavaScript 时栏目、正文、折叠原生元素照常可读，工具提交与复制不假装可用。

## 五个工具

- 表格形状检查：保留原分隔探测与引号解析规则，支持引号内换行与双引号转义；检测上限 20000 Unicode 字符、200 逻辑行、20 列。单个空白字段的行忽略；已有空字段与缺列分开计算；预览前 10 行 × 10 列，每格 120 字符。
- 行列转置：复用解析规则，严格拒绝不齐行或明确空值补齐；全引号 CSV 保留换行及引号，不执行公式。输出最多 20 行 × 200 列；导入表格软件的公式安全仍须检查。
- 记录键分组：最多 200 个非空行、每键 200 字符、总计 20000 字符；精确 / NFKC / NFKC 后转小写；去首尾空白，忽略空行，稳定首次出现顺序，列出每组次数及记录序号。
- 地址结构放大镜：60 行 × 每行 2048 字符，整体 20000；只解析 HTTP(S)，拒绝控制字符、损坏百分号、反斜线与凭据。不联网，不判断安全，不展示查询值，不保存输入。
- 分层样本分配：最多 50 层，总量每层 1–1000000000，样本 1–100000 且不得大于总体；BigInt 最大余数法，平余数按输入序。只分配数量，不随机抽样、不保证代表性。

所有工具具备完整默认折叠 Guide、示例、正常/错误/边界状态、字段聚焦、aria-errormessage、输入变化立即失效、重置、全报告复制与拒绝时手动降级。异步复制使用修订号避免把过期成功提示覆盖新输入。拒绝不完整 Unicode 与控制字符；数据仅经 textContent 安全输出。localStorage 只用于主题，不保存输入。

## 变量替换契约

令牌形如 %%UPPER_CASE%%。文字槽按 HTML 文本、属性或 XML 上下文转义，不插入 HTML。结构化数据必须重新 JSON 序列化，转义小于号和脚本结束片段，不能把原始引号直接拼进 JSON。替换 URL 时校验协议和用途：SITE_DOMAIN 仅主机名；AFFILIATE_URL 仅经核实的 HTTPS 单一推广地址；SOURCE_URL 只接受经核实的 HTTP(S) 资料来源，不接受脚本协议。CONTACT_EMAIL / SECURITY_EMAIL 使用真实授权邮箱。DATE / PUBLISHED / MODIFIED / CHECKED 用 ISO 日期；RSS_DATE 用 RFC 822 时间；SECURITY_EXPIRES 使用未来一年内 UTC 日期时间。

站名、英文 wordmark、联系方式、作者姓名与简介、正文和日期须由真实站点流程核实。不得虚构人设、经历、事实、费率、用户量或利益条件。首页代码明文与复制不含推广 href；仅 external-pocket 内容外壳中有一个静态推广 href，含四项 rel、blank 与邻近披露，其他页无推广链接。Feed 是 11 项摘要，不含邀请码或推广地址。

字数可自然增减；首页标题建议 8–16 个中文字符，描述约 25–60 字，利益脚注需真实完整；英文品牌建议 6–18 个字符。不得靠截断或隐藏利益条件适配。所有页从根目录作为站点提供，404 使用根 base 以适配未知深路径；真实服务器应为不存在页面返回 HTTP 404，模板不配置或部署服务器。

## 角色清单

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "paper-register.html",
  "articles": [
    "papers/source-slip.html",
    "papers/scope-window.html",
    "papers/evidence-tags.html",
    "papers/field-columns.html",
    "papers/margin-voices.html",
    "papers/sequence-pin.html",
    "papers/revision-sheet.html",
    "papers/comparison-grid.html",
    "papers/open-questions.html",
    "papers/review-stamp.html",
    "papers/reference-spine.html",
    "papers/external-pocket.html"
  ],
  "cornerstones": [
    "papers/source-slip.html",
    "papers/field-columns.html"
  ],
  "registrationGuide": "papers/external-pocket.html",
  "articleCovers": {
    "papers/source-slip.html": {
      "display": "assets/covers/source-slip.webp",
      "og": "assets/covers/source-slip.png"
    },
    "papers/scope-window.html": {
      "display": "assets/covers/scope-window.webp",
      "og": "assets/covers/scope-window.png"
    },
    "papers/evidence-tags.html": {
      "display": "assets/covers/evidence-tags.webp",
      "og": "assets/covers/evidence-tags.png"
    },
    "papers/field-columns.html": {
      "display": "assets/covers/field-columns.webp",
      "og": "assets/covers/field-columns.png"
    },
    "papers/margin-voices.html": {
      "display": "assets/covers/margin-voices.webp",
      "og": "assets/covers/margin-voices.png"
    },
    "papers/sequence-pin.html": {
      "display": "assets/covers/sequence-pin.webp",
      "og": "assets/covers/sequence-pin.png"
    },
    "papers/revision-sheet.html": {
      "display": "assets/covers/revision-sheet.webp",
      "og": "assets/covers/revision-sheet.png"
    },
    "papers/comparison-grid.html": {
      "display": "assets/covers/comparison-grid.webp",
      "og": "assets/covers/comparison-grid.png"
    },
    "papers/open-questions.html": {
      "display": "assets/covers/open-questions.webp",
      "og": "assets/covers/open-questions.png"
    },
    "papers/review-stamp.html": {
      "display": "assets/covers/review-stamp.webp",
      "og": "assets/covers/review-stamp.png"
    },
    "papers/reference-spine.html": {
      "display": "assets/covers/reference-spine.webp",
      "og": "assets/covers/reference-spine.png"
    },
    "papers/external-pocket.html": {
      "display": "assets/covers/external-pocket.webp",
      "og": "assets/covers/external-pocket.png"
    }
  },
  "categories": [
    {
      "path": "drawers/incoming-tray.html",
      "label": "来稿盘",
      "articles": [
        "papers/source-slip.html",
        "papers/margin-voices.html",
        "papers/open-questions.html"
      ]
    },
    {
      "path": "drawers/working-tray.html",
      "label": "工作盘",
      "articles": [
        "papers/scope-window.html",
        "papers/sequence-pin.html",
        "papers/review-stamp.html"
      ]
    },
    {
      "path": "drawers/review-tray.html",
      "label": "复核盘",
      "articles": [
        "papers/evidence-tags.html",
        "papers/revision-sheet.html",
        "papers/reference-spine.html"
      ]
    },
    {
      "path": "drawers/filed-tray.html",
      "label": "归档盘",
      "articles": [
        "papers/field-columns.html",
        "papers/comparison-grid.html",
        "papers/external-pocket.html"
      ]
    }
  ],
  "toolIndex": "desk-instruments.html",
  "tools": [
    "instruments/table-shape.html",
    "instruments/column-turn.html",
    "instruments/key-groups.html",
    "instruments/address-loupe.html",
    "instruments/sample-apportion.html"
  ],
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
  "favicon": "favicon.ico",
  "appleTouchIcon": "apple-touch-icon.png",
  "socialImage": "assets/social-card.png",
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

## 完整公开变量登记

- %%ABOUT_H2_1%%
- %%ABOUT_H2_2%%
- %%ABOUT_H2_3%%
- %%ABOUT_INTRO%%
- %%ABOUT_LABEL_1%%
- %%ABOUT_LABEL_2%%
- %%ABOUT_LABEL_3%%
- %%ABOUT_TEXT_1%%
- %%ABOUT_TEXT_2%%
- %%ABOUT_TEXT_3%%
- %%AFFILIATE_DISCLOSURE%%
- %%AFFILIATE_LABEL%%
- %%AFFILIATE_URL%%
- %%ARTICLE_LEGACY_DESC%%
- %%AUTHOR_BIO%%
- %%AUTHOR_NAME%%
- %%BENEFIT_DISCLAIMER%%
- %%BENEFIT_RATE%%
- %%BRAND_EN%%
- %%CONTACT_EMAIL%%
- %%CONTACT_H2_1%%
- %%CONTACT_H2_2%%
- %%CONTACT_H2_3%%
- %%CONTACT_INTRO%%
- %%CONTACT_LABEL_1%%
- %%CONTACT_LABEL_2%%
- %%CONTACT_LABEL_3%%
- %%CONTACT_TEXT_1%%
- %%CONTACT_TEXT_2%%
- %%CONTACT_TEXT_3%%
- %%CORRECTIONS_H2_1%%
- %%CORRECTIONS_H2_2%%
- %%CORRECTIONS_H2_3%%
- %%CORRECTIONS_INTRO%%
- %%CORRECTIONS_LABEL_1%%
- %%CORRECTIONS_LABEL_2%%
- %%CORRECTIONS_LABEL_3%%
- %%CORRECTIONS_TEXT_1%%
- %%CORRECTIONS_TEXT_2%%
- %%CORRECTIONS_TEXT_3%%
- %%DESK_EYEBROW%%
- %%DESK_INTRO%%
- %%DESK_TITLE%%
- %%DISCLAIMER_H2_1%%
- %%DISCLAIMER_H2_2%%
- %%DISCLAIMER_H2_3%%
- %%DISCLAIMER_INTRO%%
- %%DISCLAIMER_LABEL_1%%
- %%DISCLAIMER_LABEL_2%%
- %%DISCLAIMER_LABEL_3%%
- %%DISCLAIMER_TEXT_1%%
- %%DISCLAIMER_TEXT_2%%
- %%DISCLAIMER_TEXT_3%%
- %%DISCLOSURE_H2_1%%
- %%DISCLOSURE_H2_2%%
- %%DISCLOSURE_H2_3%%
- %%DISCLOSURE_INTRO%%
- %%DISCLOSURE_LABEL_1%%
- %%DISCLOSURE_LABEL_2%%
- %%DISCLOSURE_LABEL_3%%
- %%DISCLOSURE_TEXT_1%%
- %%DISCLOSURE_TEXT_2%%
- %%DISCLOSURE_TEXT_3%%
- %%EDITORIAL_H2_1%%
- %%EDITORIAL_H2_2%%
- %%EDITORIAL_H2_3%%
- %%EDITORIAL_INTRO%%
- %%EDITORIAL_LABEL_1%%
- %%EDITORIAL_LABEL_2%%
- %%EDITORIAL_LABEL_3%%
- %%EDITORIAL_TEXT_1%%
- %%EDITORIAL_TEXT_2%%
- %%EDITORIAL_TEXT_3%%
- %%FEATURED_LABEL%%
- %%FEATURED_MARK%%
- %%FEATURED_META_LABEL_1%%
- %%FEATURED_META_LABEL_2%%
- %%FEATURED_META_LABEL_3%%
- %%FEATURED_META_TEXT_1%%
- %%FEATURED_META_TEXT_2%%
- %%FEATURED_META_TEXT_3%%
- %%HERO_DESCRIPTION%%
- %%HERO_EYEBROW%%
- %%HERO_TITLE%%
- %%HOME_FEATURED_LABEL%%
- %%HOME_LATEST_LABEL%%
- %%HOME_LINKS_LABEL%%
- %%INDEPENDENCE_NOTE%%
- %%INVITE_CODE%%
- %%INVITE_LABEL%%
- %%LANG%%
- %%LEGAL_LEGACY_DESC%%
- %%MISSING_DESC%%
- %%P10_CAPTION%%
- %%P10_CHECKED%%
- %%P10_CLOSING%%
- %%P10_CONTEXT_CITE%%
- %%P10_CONTEXT_QUOTE%%
- %%P10_COVER_ALT%%
- %%P10_DATE_LABEL%%
- %%P10_EYEBROW%%
- %%P10_FAQ_A_1%%
- %%P10_FAQ_A_2%%
- %%P10_FAQ_A_3%%
- %%P10_FAQ_LABEL%%
- %%P10_FAQ_Q_1%%
- %%P10_FAQ_Q_2%%
- %%P10_FAQ_Q_3%%
- %%P10_H2_1%%
- %%P10_H2_2%%
- %%P10_H2_3%%
- %%P10_H2_4%%
- %%P10_MODIFIED%%
- %%P10_NEXT_CHECK%%
- %%P10_POINT_1%%
- %%P10_POINT_2%%
- %%P10_POINT_3%%
- %%P10_PUBLISHED%%
- %%P10_REVIEW_LIMIT%%
- %%P10_REVIEW_TERM_1%%
- %%P10_REVIEW_TERM_2%%
- %%P10_REVIEW_TERM_3%%
- %%P10_REVIEW_VALUE_1%%
- %%P10_REVIEW_VALUE_2%%
- %%P10_REVIEW_VALUE_3%%
- %%P10_RSS_DATE%%
- %%P10_SOURCE_LABEL%%
- %%P10_SOURCE_NOTE_1%%
- %%P10_SOURCE_NOTE_2%%
- %%P10_SOURCE_TITLE_1%%
- %%P10_SOURCE_TITLE_2%%
- %%P10_SOURCE_URL_1%%
- %%P10_SOURCE_URL_2%%
- %%P10_STAMP_LABEL%%
- %%P10_STAMP_TEXT%%
- %%P10_STATUS%%
- %%P10_SUMMARY%%
- %%P10_TEXT_1%%
- %%P10_TEXT_2%%
- %%P10_TEXT_3%%
- %%P10_TEXT_4%%
- %%P10_TITLE%%
- %%P11_CAPTION%%
- %%P11_CHECKED%%
- %%P11_CLOSING%%
- %%P11_CONTEXT_CITE%%
- %%P11_CONTEXT_QUOTE%%
- %%P11_COVER_ALT%%
- %%P11_DATE_LABEL%%
- %%P11_EYEBROW%%
- %%P11_FAQ_A_1%%
- %%P11_FAQ_A_2%%
- %%P11_FAQ_A_3%%
- %%P11_FAQ_LABEL%%
- %%P11_FAQ_Q_1%%
- %%P11_FAQ_Q_2%%
- %%P11_FAQ_Q_3%%
- %%P11_H2_1%%
- %%P11_H2_2%%
- %%P11_H2_3%%
- %%P11_H2_4%%
- %%P11_MODIFIED%%
- %%P11_NEXT_CHECK%%
- %%P11_OPEN_LABEL%%
- %%P11_OPEN_TEXT%%
- %%P11_POINT_1%%
- %%P11_POINT_2%%
- %%P11_POINT_3%%
- %%P11_PUBLISHED%%
- %%P11_REFERENCE_1%%
- %%P11_REFERENCE_2%%
- %%P11_REFERENCE_3%%
- %%P11_REFERENCE_SCOPE_1%%
- %%P11_REFERENCE_SCOPE_2%%
- %%P11_REFERENCE_SCOPE_3%%
- %%P11_REFERENCE_TEXT_1%%
- %%P11_REFERENCE_TEXT_2%%
- %%P11_REFERENCE_TEXT_3%%
- %%P11_RSS_DATE%%
- %%P11_SOURCE_LABEL%%
- %%P11_SOURCE_NOTE_1%%
- %%P11_SOURCE_NOTE_2%%
- %%P11_SOURCE_TITLE_1%%
- %%P11_SOURCE_TITLE_2%%
- %%P11_SOURCE_URL_1%%
- %%P11_SOURCE_URL_2%%
- %%P11_STATUS%%
- %%P11_SUMMARY%%
- %%P11_TEXT_1%%
- %%P11_TEXT_2%%
- %%P11_TEXT_3%%
- %%P11_TEXT_4%%
- %%P11_TITLE%%
- %%P12_CAPTION%%
- %%P12_CHECKED%%
- %%P12_CLOSING%%
- %%P12_CONTEXT_CITE%%
- %%P12_CONTEXT_QUOTE%%
- %%P12_COVER_ALT%%
- %%P12_DATE_LABEL%%
- %%P12_EYEBROW%%
- %%P12_FAQ_A_1%%
- %%P12_FAQ_A_2%%
- %%P12_FAQ_A_3%%
- %%P12_FAQ_LABEL%%
- %%P12_FAQ_Q_1%%
- %%P12_FAQ_Q_2%%
- %%P12_FAQ_Q_3%%
- %%P12_H2_1%%
- %%P12_H2_2%%
- %%P12_H2_3%%
- %%P12_H2_4%%
- %%P12_MODIFIED%%
- %%P12_NEXT_CHECK%%
- %%P12_POCKET_LABEL%%
- %%P12_POCKET_TERM%%
- %%P12_POCKET_TEXT%%
- %%P12_POCKET_TITLE%%
- %%P12_POCKET_VALUE%%
- %%P12_POINT_1%%
- %%P12_POINT_2%%
- %%P12_POINT_3%%
- %%P12_PUBLISHED%%
- %%P12_SOURCE_LABEL%%
- %%P12_SOURCE_NOTE_1%%
- %%P12_SOURCE_NOTE_2%%
- %%P12_SOURCE_TITLE_1%%
- %%P12_SOURCE_TITLE_2%%
- %%P12_SOURCE_URL_1%%
- %%P12_SOURCE_URL_2%%
- %%P12_STATUS%%
- %%P12_SUMMARY%%
- %%P12_TEXT_1%%
- %%P12_TEXT_2%%
- %%P12_TEXT_3%%
- %%P12_TEXT_4%%
- %%P12_TITLE%%
- %%P1_CAPTION%%
- %%P1_CHECKED%%
- %%P1_CLOSING%%
- %%P1_CONTEXT_CITE%%
- %%P1_CONTEXT_QUOTE%%
- %%P1_COVER_ALT%%
- %%P1_DATE_LABEL%%
- %%P1_EYEBROW%%
- %%P1_FAQ_A_1%%
- %%P1_FAQ_A_2%%
- %%P1_FAQ_A_3%%
- %%P1_FAQ_LABEL%%
- %%P1_FAQ_Q_1%%
- %%P1_FAQ_Q_2%%
- %%P1_FAQ_Q_3%%
- %%P1_FIELD_1%%
- %%P1_FIELD_2%%
- %%P1_FIELD_3%%
- %%P1_FIELD_4%%
- %%P1_H2_1%%
- %%P1_H2_2%%
- %%P1_H2_3%%
- %%P1_H2_4%%
- %%P1_MODIFIED%%
- %%P1_NEXT_CHECK%%
- %%P1_POINT_1%%
- %%P1_POINT_2%%
- %%P1_POINT_3%%
- %%P1_PUBLISHED%%
- %%P1_RSS_DATE%%
- %%P1_SOURCE_LABEL%%
- %%P1_SOURCE_NOTE_1%%
- %%P1_SOURCE_NOTE_2%%
- %%P1_SOURCE_TITLE_1%%
- %%P1_SOURCE_TITLE_2%%
- %%P1_SOURCE_URL_1%%
- %%P1_SOURCE_URL_2%%
- %%P1_STATUS%%
- %%P1_SUMMARY%%
- %%P1_TEXT_1%%
- %%P1_TEXT_2%%
- %%P1_TEXT_3%%
- %%P1_TEXT_4%%
- %%P1_TITLE%%
- %%P1_VALUE_1%%
- %%P1_VALUE_2%%
- %%P1_VALUE_3%%
- %%P1_VALUE_4%%
- %%P2_CAPTION%%
- %%P2_CHECKED%%
- %%P2_CLOSING%%
- %%P2_CONTEXT_CITE%%
- %%P2_CONTEXT_QUOTE%%
- %%P2_COVER_ALT%%
- %%P2_DATE_LABEL%%
- %%P2_EYEBROW%%
- %%P2_FAQ_A_1%%
- %%P2_FAQ_A_2%%
- %%P2_FAQ_A_3%%
- %%P2_FAQ_LABEL%%
- %%P2_FAQ_Q_1%%
- %%P2_FAQ_Q_2%%
- %%P2_FAQ_Q_3%%
- %%P2_H2_1%%
- %%P2_H2_2%%
- %%P2_H2_3%%
- %%P2_H2_4%%
- %%P2_IN_LABEL%%
- %%P2_IN_TEXT%%
- %%P2_MODIFIED%%
- %%P2_NEXT_CHECK%%
- %%P2_OPEN_LABEL%%
- %%P2_OPEN_TEXT%%
- %%P2_OUT_LABEL%%
- %%P2_OUT_TEXT%%
- %%P2_POINT_1%%
- %%P2_POINT_2%%
- %%P2_POINT_3%%
- %%P2_PUBLISHED%%
- %%P2_RSS_DATE%%
- %%P2_SOURCE_LABEL%%
- %%P2_SOURCE_NOTE_1%%
- %%P2_SOURCE_NOTE_2%%
- %%P2_SOURCE_TITLE_1%%
- %%P2_SOURCE_TITLE_2%%
- %%P2_SOURCE_URL_1%%
- %%P2_SOURCE_URL_2%%
- %%P2_STATUS%%
- %%P2_SUMMARY%%
- %%P2_TEXT_1%%
- %%P2_TEXT_2%%
- %%P2_TEXT_3%%
- %%P2_TEXT_4%%
- %%P2_TITLE%%
- %%P3_CAPTION%%
- %%P3_CHECKED%%
- %%P3_CLOSING%%
- %%P3_CONTEXT_CITE%%
- %%P3_CONTEXT_QUOTE%%
- %%P3_COVER_ALT%%
- %%P3_DATE_LABEL%%
- %%P3_EYEBROW%%
- %%P3_FAQ_A_1%%
- %%P3_FAQ_A_2%%
- %%P3_FAQ_A_3%%
- %%P3_FAQ_LABEL%%
- %%P3_FAQ_Q_1%%
- %%P3_FAQ_Q_2%%
- %%P3_FAQ_Q_3%%
- %%P3_H2_1%%
- %%P3_H2_2%%
- %%P3_H2_3%%
- %%P3_H2_4%%
- %%P3_MODIFIED%%
- %%P3_NEXT_CHECK%%
- %%P3_POINT_1%%
- %%P3_POINT_2%%
- %%P3_POINT_3%%
- %%P3_PUBLISHED%%
- %%P3_RSS_DATE%%
- %%P3_SOURCE_LABEL%%
- %%P3_SOURCE_NOTE_1%%
- %%P3_SOURCE_NOTE_2%%
- %%P3_SOURCE_TITLE_1%%
- %%P3_SOURCE_TITLE_2%%
- %%P3_SOURCE_URL_1%%
- %%P3_SOURCE_URL_2%%
- %%P3_STATUS%%
- %%P3_SUMMARY%%
- %%P3_TAG_1%%
- %%P3_TAG_2%%
- %%P3_TAG_3%%
- %%P3_TAG_NOTE_1%%
- %%P3_TAG_NOTE_2%%
- %%P3_TAG_NOTE_3%%
- %%P3_TAG_TEXT_1%%
- %%P3_TAG_TEXT_2%%
- %%P3_TAG_TEXT_3%%
- %%P3_TEXT_1%%
- %%P3_TEXT_2%%
- %%P3_TEXT_3%%
- %%P3_TEXT_4%%
- %%P3_TITLE%%
- %%P4_CAPTION%%
- %%P4_CHECKED%%
- %%P4_CLOSING%%
- %%P4_COLUMN_1%%
- %%P4_COLUMN_2%%
- %%P4_COLUMN_3%%
- %%P4_COLUMN_TERM_1%%
- %%P4_COLUMN_TERM_2%%
- %%P4_COLUMN_TERM_3%%
- %%P4_COLUMN_TEXT_1%%
- %%P4_COLUMN_TEXT_2%%
- %%P4_COLUMN_TEXT_3%%
- %%P4_COLUMN_VALUE_1%%
- %%P4_COLUMN_VALUE_2%%
- %%P4_COLUMN_VALUE_3%%
- %%P4_CONTEXT_CITE%%
- %%P4_CONTEXT_QUOTE%%
- %%P4_COVER_ALT%%
- %%P4_DATE_LABEL%%
- %%P4_EYEBROW%%
- %%P4_FAQ_A_1%%
- %%P4_FAQ_A_2%%
- %%P4_FAQ_A_3%%
- %%P4_FAQ_LABEL%%
- %%P4_FAQ_Q_1%%
- %%P4_FAQ_Q_2%%
- %%P4_FAQ_Q_3%%
- %%P4_H2_1%%
- %%P4_H2_2%%
- %%P4_H2_3%%
- %%P4_H2_4%%
- %%P4_MODIFIED%%
- %%P4_NEXT_CHECK%%
- %%P4_POINT_1%%
- %%P4_POINT_2%%
- %%P4_POINT_3%%
- %%P4_PUBLISHED%%
- %%P4_RSS_DATE%%
- %%P4_SOURCE_LABEL%%
- %%P4_SOURCE_NOTE_1%%
- %%P4_SOURCE_NOTE_2%%
- %%P4_SOURCE_TITLE_1%%
- %%P4_SOURCE_TITLE_2%%
- %%P4_SOURCE_URL_1%%
- %%P4_SOURCE_URL_2%%
- %%P4_STATUS%%
- %%P4_SUMMARY%%
- %%P4_TEXT_1%%
- %%P4_TEXT_2%%
- %%P4_TEXT_3%%
- %%P4_TEXT_4%%
- %%P4_TITLE%%
- %%P5_CAPTION%%
- %%P5_CHECKED%%
- %%P5_CITE_1%%
- %%P5_CITE_2%%
- %%P5_CLOSING%%
- %%P5_CONTEXT_CITE%%
- %%P5_CONTEXT_QUOTE%%
- %%P5_COVER_ALT%%
- %%P5_DATE_LABEL%%
- %%P5_EYEBROW%%
- %%P5_FAQ_A_1%%
- %%P5_FAQ_A_2%%
- %%P5_FAQ_A_3%%
- %%P5_FAQ_LABEL%%
- %%P5_FAQ_Q_1%%
- %%P5_FAQ_Q_2%%
- %%P5_FAQ_Q_3%%
- %%P5_H2_1%%
- %%P5_H2_2%%
- %%P5_H2_3%%
- %%P5_H2_4%%
- %%P5_MODIFIED%%
- %%P5_NEXT_CHECK%%
- %%P5_OPEN_LABEL%%
- %%P5_OPEN_TEXT%%
- %%P5_POINT_1%%
- %%P5_POINT_2%%
- %%P5_POINT_3%%
- %%P5_PUBLISHED%%
- %%P5_QUOTE_1%%
- %%P5_QUOTE_2%%
- %%P5_RSS_DATE%%
- %%P5_SOURCE_LABEL%%
- %%P5_SOURCE_NOTE_1%%
- %%P5_SOURCE_NOTE_2%%
- %%P5_SOURCE_TITLE_1%%
- %%P5_SOURCE_TITLE_2%%
- %%P5_SOURCE_URL_1%%
- %%P5_SOURCE_URL_2%%
- %%P5_STATUS%%
- %%P5_SUMMARY%%
- %%P5_TEXT_1%%
- %%P5_TEXT_2%%
- %%P5_TEXT_3%%
- %%P5_TEXT_4%%
- %%P5_TITLE%%
- %%P5_VOICE_LABEL_1%%
- %%P5_VOICE_LABEL_2%%
- %%P6_CAPTION%%
- %%P6_CHECKED%%
- %%P6_CLOSING%%
- %%P6_CONTEXT_CITE%%
- %%P6_CONTEXT_QUOTE%%
- %%P6_COVER_ALT%%
- %%P6_DATE_LABEL%%
- %%P6_EYEBROW%%
- %%P6_FAQ_A_1%%
- %%P6_FAQ_A_2%%
- %%P6_FAQ_A_3%%
- %%P6_FAQ_LABEL%%
- %%P6_FAQ_Q_1%%
- %%P6_FAQ_Q_2%%
- %%P6_FAQ_Q_3%%
- %%P6_H2_1%%
- %%P6_H2_2%%
- %%P6_H2_3%%
- %%P6_H2_4%%
- %%P6_MODIFIED%%
- %%P6_NEXT_CHECK%%
- %%P6_POINT_1%%
- %%P6_POINT_2%%
- %%P6_POINT_3%%
- %%P6_PUBLISHED%%
- %%P6_RSS_DATE%%
- %%P6_SOURCE_LABEL%%
- %%P6_SOURCE_NOTE_1%%
- %%P6_SOURCE_NOTE_2%%
- %%P6_SOURCE_TITLE_1%%
- %%P6_SOURCE_TITLE_2%%
- %%P6_SOURCE_URL_1%%
- %%P6_SOURCE_URL_2%%
- %%P6_STAGE_1%%
- %%P6_STAGE_2%%
- %%P6_STAGE_3%%
- %%P6_STAGE_4%%
- %%P6_STAGE_TEXT_1%%
- %%P6_STAGE_TEXT_2%%
- %%P6_STAGE_TEXT_3%%
- %%P6_STAGE_TEXT_4%%
- %%P6_STATUS%%
- %%P6_SUMMARY%%
- %%P6_TEXT_1%%
- %%P6_TEXT_2%%
- %%P6_TEXT_3%%
- %%P6_TEXT_4%%
- %%P6_TITLE%%
- %%P7_AFTER_LABEL%%
- %%P7_AFTER_TEXT%%
- %%P7_AFTER_TITLE%%
- %%P7_BEFORE_LABEL%%
- %%P7_BEFORE_TEXT%%
- %%P7_BEFORE_TITLE%%
- %%P7_CAPTION%%
- %%P7_CHANGE_REASON%%
- %%P7_CHECKED%%
- %%P7_CLOSING%%
- %%P7_CONTEXT_CITE%%
- %%P7_CONTEXT_QUOTE%%
- %%P7_COVER_ALT%%
- %%P7_DATE_LABEL%%
- %%P7_EYEBROW%%
- %%P7_FAQ_A_1%%
- %%P7_FAQ_A_2%%
- %%P7_FAQ_A_3%%
- %%P7_FAQ_LABEL%%
- %%P7_FAQ_Q_1%%
- %%P7_FAQ_Q_2%%
- %%P7_FAQ_Q_3%%
- %%P7_H2_1%%
- %%P7_H2_2%%
- %%P7_H2_3%%
- %%P7_H2_4%%
- %%P7_MODIFIED%%
- %%P7_NEXT_CHECK%%
- %%P7_POINT_1%%
- %%P7_POINT_2%%
- %%P7_POINT_3%%
- %%P7_PUBLISHED%%
- %%P7_RSS_DATE%%
- %%P7_SOURCE_LABEL%%
- %%P7_SOURCE_NOTE_1%%
- %%P7_SOURCE_NOTE_2%%
- %%P7_SOURCE_TITLE_1%%
- %%P7_SOURCE_TITLE_2%%
- %%P7_SOURCE_URL_1%%
- %%P7_SOURCE_URL_2%%
- %%P7_STATUS%%
- %%P7_SUMMARY%%
- %%P7_TEXT_1%%
- %%P7_TEXT_2%%
- %%P7_TEXT_3%%
- %%P7_TEXT_4%%
- %%P7_TITLE%%
- %%P8_CAPTION%%
- %%P8_CELL_1_1%%
- %%P8_CELL_1_2%%
- %%P8_CELL_1_3%%
- %%P8_CELL_2_1%%
- %%P8_CELL_2_2%%
- %%P8_CELL_2_3%%
- %%P8_CELL_3_1%%
- %%P8_CELL_3_2%%
- %%P8_CELL_3_3%%
- %%P8_CHECKED%%
- %%P8_CLOSING%%
- %%P8_COL_1%%
- %%P8_COL_2%%
- %%P8_COL_3%%
- %%P8_COL_4%%
- %%P8_CONTEXT_CITE%%
- %%P8_CONTEXT_QUOTE%%
- %%P8_COVER_ALT%%
- %%P8_DATE_LABEL%%
- %%P8_EYEBROW%%
- %%P8_FAQ_A_1%%
- %%P8_FAQ_A_2%%
- %%P8_FAQ_A_3%%
- %%P8_FAQ_LABEL%%
- %%P8_FAQ_Q_1%%
- %%P8_FAQ_Q_2%%
- %%P8_FAQ_Q_3%%
- %%P8_H2_1%%
- %%P8_H2_2%%
- %%P8_H2_3%%
- %%P8_H2_4%%
- %%P8_MODIFIED%%
- %%P8_NEXT_CHECK%%
- %%P8_OPEN_LABEL%%
- %%P8_OPEN_TEXT%%
- %%P8_POINT_1%%
- %%P8_POINT_2%%
- %%P8_POINT_3%%
- %%P8_PUBLISHED%%
- %%P8_ROW_1%%
- %%P8_ROW_2%%
- %%P8_ROW_3%%
- %%P8_RSS_DATE%%
- %%P8_SOURCE_LABEL%%
- %%P8_SOURCE_NOTE_1%%
- %%P8_SOURCE_NOTE_2%%
- %%P8_SOURCE_TITLE_1%%
- %%P8_SOURCE_TITLE_2%%
- %%P8_SOURCE_URL_1%%
- %%P8_SOURCE_URL_2%%
- %%P8_STATUS%%
- %%P8_SUMMARY%%
- %%P8_TABLE_LABEL%%
- %%P8_TEXT_1%%
- %%P8_TEXT_2%%
- %%P8_TEXT_3%%
- %%P8_TEXT_4%%
- %%P8_TITLE%%
- %%P9_CAPTION%%
- %%P9_CHECKED%%
- %%P9_CLOSING%%
- %%P9_CONTEXT_CITE%%
- %%P9_CONTEXT_QUOTE%%
- %%P9_COVER_ALT%%
- %%P9_DATE_LABEL%%
- %%P9_EYEBROW%%
- %%P9_FAQ_A_1%%
- %%P9_FAQ_A_2%%
- %%P9_FAQ_A_3%%
- %%P9_FAQ_LABEL%%
- %%P9_FAQ_Q_1%%
- %%P9_FAQ_Q_2%%
- %%P9_FAQ_Q_3%%
- %%P9_H2_1%%
- %%P9_H2_2%%
- %%P9_H2_3%%
- %%P9_H2_4%%
- %%P9_MODIFIED%%
- %%P9_NEXT_CHECK%%
- %%P9_POINT_1%%
- %%P9_POINT_2%%
- %%P9_POINT_3%%
- %%P9_PUBLISHED%%
- %%P9_QUESTION_1%%
- %%P9_QUESTION_2%%
- %%P9_QUESTION_3%%
- %%P9_RESEARCH_1%%
- %%P9_RESEARCH_2%%
- %%P9_RESEARCH_3%%
- %%P9_RSS_DATE%%
- %%P9_SOURCE_LABEL%%
- %%P9_SOURCE_NOTE_1%%
- %%P9_SOURCE_NOTE_2%%
- %%P9_SOURCE_TITLE_1%%
- %%P9_SOURCE_TITLE_2%%
- %%P9_SOURCE_URL_1%%
- %%P9_SOURCE_URL_2%%
- %%P9_STATUS%%
- %%P9_SUMMARY%%
- %%P9_TEXT_1%%
- %%P9_TEXT_2%%
- %%P9_TEXT_3%%
- %%P9_TEXT_4%%
- %%P9_TITLE%%
- %%P9_UNRESOLVED_1%%
- %%P9_UNRESOLVED_2%%
- %%P9_UNRESOLVED_3%%
- %%PRIVACY_H2_1%%
- %%PRIVACY_H2_2%%
- %%PRIVACY_H2_3%%
- %%PRIVACY_INTRO%%
- %%PRIVACY_LABEL_1%%
- %%PRIVACY_LABEL_2%%
- %%PRIVACY_LABEL_3%%
- %%PRIVACY_TEXT_1%%
- %%PRIVACY_TEXT_2%%
- %%PRIVACY_TEXT_3%%
- %%PUBLIC_REVIEW_DATE%%
- %%PUBLIC_REVIEW_LABEL%%
- %%REGISTER_INTRO%%
- %%REGISTER_TITLE%%
- %%RISK_NOTE%%
- %%SECURITY_EMAIL%%
- %%SECURITY_EXPIRES%%
- %%SEO_TITLE%%
- %%SITEMAP_DATE%%
- %%SITE_DESC%%
- %%SITE_DOMAIN%%
- %%SITE_NAME%%
- %%SITE_TAGLINE%%
- %%STATUS_LABEL_1%%
- %%STATUS_LABEL_2%%
- %%STATUS_LABEL_3%%
- %%STATUS_LABEL_4%%
- %%STATUS_TEXT_1%%
- %%STATUS_TEXT_2%%
- %%STATUS_TEXT_3%%
- %%STATUS_TEXT_4%%
- %%SURFACE_CAPTION%%
- %%SURFACE_LABEL%%
- %%SURFACE_SCOPE%%
- %%SURFACE_SOURCE%%
- %%TOOLS_INTRO%%
- %%TOOLS_TITLE%%
- %%TOOL_1_INTRO%%
- %%TOOL_2_INTRO%%
- %%TOOL_3_INTRO%%
- %%TOOL_4_INTRO%%
- %%TOOL_5_INTRO%%
- %%TOOL_LEGACY_DESC%%
- %%TRAY_1_EYEBROW%%
- %%TRAY_1_INTRO%%
- %%TRAY_2_EYEBROW%%
- %%TRAY_2_INTRO%%
- %%TRAY_3_EYEBROW%%
- %%TRAY_3_INTRO%%
- %%TRAY_4_EYEBROW%%
- %%TRAY_4_INTRO%%

## 验收

确定性、逐页渲染与交互证据见仓库 batches/workflow-readiness-progress.md 与 tools/qa/064-teal-desktop-browser.js。只有全部通过后才记为就绪。
