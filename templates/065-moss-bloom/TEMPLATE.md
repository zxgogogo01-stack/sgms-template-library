# Moss Bloom — 植物标本馆完整静态框架

## 使用边界

本套只交付网站模板，后续 AI 仅替换经核实的站点变量、文字与文章，不补 UI、工具、页面或通用资产。不制作注册教程、不编写真实业务文章，不部署生产。registrationGuide 是 v2 检查器兼容字段名，只指向含唯一推广组件的通用内容外壳，不能据此推导教程选题。

保留本地已有的左侧馆藏柜、压制植物、非对称索引、登记册与入口组，原 herbarium.css 字节保持不变，完整框架扩展在 collection.css。动态源未获得可复验状态，原包忠实度独立记录为未核验，不冒充忠实复刻通过；用户已授权基于当前本地视觉完善 UI。

## 完整页面与组件

34 HTML：30 个可索引页面、独立 404、3 个旧地址兼容页（noindex，不自动跳转）。馆藏分为萌芽采集室、分枝观察室、果序档案室，各 4 份文章。三种阅读开场为元数据题签、图像并置、居中家族题名；十二独立组件为登记卡、范围花瓣、叶脉树、对生叶、批注钉、生长阶段、压片层、性状表、未鉴定纸页、修订年轮、来源信封和参考嫁接。目录、FAQ、收尾有不同结构，原生 details 无 JavaScript 也可阅读。

默认日藏 day，另有夜藏 night。侧栏在手机转为可键盘操作的目录，Escape 回焦点；禁用脚本仍保留全部阅读入口。首页首屏包含代码明文、真实复制、利益变量与完整脚注，但无推广 href。唯一静态推广 href 位于 reference-graft 内容页，带 blank 与 sponsored/nofollow/noopener/noreferrer、附近披露及代码明文。Feed 为 10 项摘要，无推广链接或代码。

## 工具边界

- 主张词类扫描：保留原固定词表、NFKC 匹配、小数保护与句子边界规则，最多 6000 Unicode 字符、80 句；按句统计四类命中，展示原句。引用、否定和示例均可能命中；不是事实、金融、法律或合规结论。
- 关键词样方：字面匹配，原文 6000 字符、处理后 18000；关键词最多 20 行、每词 60 字符、总计 1500；允许重叠命中，超过 1000 处则报错、不静默截断。上下文每侧 0–40 码点。坐标和摘录来自处理后文本，不冒充原文位置。
- 字符压片对照：NFC/NFD/NFKC/NFKD 前后字符串与完整频次清单。原文 1000、结果 4000 码点；字形与码点并不相同，兼容形式可能改变有意义的差异，不自动改稿。
- 词形编辑距离：原文与处理后每侧最多 120 码点，支持空字符串；单位成本 Levenshtein 动态规划与完整回溯。同成本先对角，再删除，再插入；不含交换，不推断词义。
- 词项数量对账：每侧最多 200 个非空行，每词 80 码点，总计 16000；去首尾空白，按数量而非仅集合比较。保留为每词较小次数，新增/移除为差值正负部分；两侧可空。先原清单顺序，再追加新词。

所有工具都有可抓取说明及默认折叠 Guide、真实复制、重置、错误定位和 aria-errormessage、输入/选项变化立即清空旧结果。直接校验控件原值以拒绝不完整 Unicode，不经会提前修复代理项的 FormData。异步复制用修订号防止过期提示覆盖新输入。输出用 textContent 与安全节点，不上传、不保存输入；localStorage 仅记主题。输入上限按 Unicode 码点而非字节。

## 后续 AI 变量替换

使用 %%UPPER_CASE%% 形式；HTML 文本、属性与 XML 分别转义。JSON-LD 重新序列化并转义小于号及脚本结束片段，不能裸拼接引号。URL 变量须验证协议：SITE_DOMAIN 仅主机名；AFFILIATE_URL 只用经核实的 HTTPS 地址；SOURCE_URL 仅经核实 HTTP(S)，禁止脚本协议。邮箱使用真实授权地址；DATE/PUBLISHED/MODIFIED/CHECKED 用 ISO 日期，RSS_DATE 用 RFC 822，SECURITY_EXPIRES 为未来一年内 UTC 时间。

作者、简介、业务事实、来源、利益条件和日期都应查证填写，不虚构身份或经历。BRAND_EN 为英文或罗马字，BRAND_INITIAL 是其首字母，BRAND_MARK 是短品牌标签；PLATE_MARK 是装饰性短页签，不是来源已核实的证明。标题建议 8–16 个中文字符，首页说明约 25–60 字，利益脚注必须完整，不能靠截断隐藏。长文、列表、表格、引用、FAQ、元数据和来源区域已经搭好。页面根目录作为站点根，404 使用根 base 适配未知深路径；真实服务器应返回 HTTP 404，模板不部署或配置服务器。

## 角色表

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "collection-register.html",
  "articles": [
    "plates/collection-card.html",
    "plates/scope-petals.html",
    "plates/vein-map.html",
    "plates/paired-leaves.html",
    "plates/annotation-pins.html",
    "plates/growth-stages.html",
    "plates/pressed-layers.html",
    "plates/trait-table.html",
    "plates/unidentified-sheet.html",
    "plates/revision-ring.html",
    "plates/source-envelope.html",
    "plates/reference-graft.html"
  ],
  "cornerstones": [
    "plates/collection-card.html",
    "plates/vein-map.html"
  ],
  "registrationGuide": "plates/reference-graft.html",
  "articleCovers": {
    "plates/collection-card.html": {
      "display": "assets/covers/collection-card.webp",
      "og": "assets/covers/collection-card.png"
    },
    "plates/scope-petals.html": {
      "display": "assets/covers/scope-petals.webp",
      "og": "assets/covers/scope-petals.png"
    },
    "plates/vein-map.html": {
      "display": "assets/covers/vein-map.webp",
      "og": "assets/covers/vein-map.png"
    },
    "plates/paired-leaves.html": {
      "display": "assets/covers/paired-leaves.webp",
      "og": "assets/covers/paired-leaves.png"
    },
    "plates/annotation-pins.html": {
      "display": "assets/covers/annotation-pins.webp",
      "og": "assets/covers/annotation-pins.png"
    },
    "plates/growth-stages.html": {
      "display": "assets/covers/growth-stages.webp",
      "og": "assets/covers/growth-stages.png"
    },
    "plates/pressed-layers.html": {
      "display": "assets/covers/pressed-layers.webp",
      "og": "assets/covers/pressed-layers.png"
    },
    "plates/trait-table.html": {
      "display": "assets/covers/trait-table.webp",
      "og": "assets/covers/trait-table.png"
    },
    "plates/unidentified-sheet.html": {
      "display": "assets/covers/unidentified-sheet.webp",
      "og": "assets/covers/unidentified-sheet.png"
    },
    "plates/revision-ring.html": {
      "display": "assets/covers/revision-ring.webp",
      "og": "assets/covers/revision-ring.png"
    },
    "plates/source-envelope.html": {
      "display": "assets/covers/source-envelope.webp",
      "og": "assets/covers/source-envelope.png"
    },
    "plates/reference-graft.html": {
      "display": "assets/covers/reference-graft.webp",
      "og": "assets/covers/reference-graft.png"
    }
  },
  "categories": [
    {
      "path": "herbaria/germination-bay.html",
      "label": "萌芽采集室",
      "articles": [
        "plates/collection-card.html",
        "plates/paired-leaves.html",
        "plates/pressed-layers.html",
        "plates/revision-ring.html"
      ]
    },
    {
      "path": "herbaria/branch-study.html",
      "label": "分枝观察室",
      "articles": [
        "plates/scope-petals.html",
        "plates/annotation-pins.html",
        "plates/trait-table.html",
        "plates/source-envelope.html"
      ]
    },
    {
      "path": "herbaria/fruit-record.html",
      "label": "果序档案室",
      "articles": [
        "plates/vein-map.html",
        "plates/growth-stages.html",
        "plates/unidentified-sheet.html",
        "plates/reference-graft.html"
      ]
    }
  ],
  "toolIndex": "workbenches.html",
  "tools": [
    "benches/claim-scan.html",
    "benches/keyword-quadrat.html",
    "benches/unicode-press.html",
    "benches/word-distance.html",
    "benches/token-inventory.html"
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

## 完整变量登记

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
- %%BENCHES_INTRO%%
- %%BENCHES_TITLE%%
- %%BENEFIT_DISCLAIMER%%
- %%BENEFIT_RATE%%
- %%BRAND_EN%%
- %%BRAND_INITIAL%%
- %%BRAND_MARK%%
- %%CABINET_NOTE%%
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
- %%FEATURED_META_LABEL_1%%
- %%FEATURED_META_LABEL_2%%
- %%FEATURED_META_LABEL_3%%
- %%FEATURED_META_TEXT_1%%
- %%FEATURED_META_TEXT_2%%
- %%FEATURED_META_TEXT_3%%
- %%FEATURE_CARD_1_LABEL%%
- %%FEATURE_CARD_1_TEXT%%
- %%FEATURE_CARD_1_TITLE%%
- %%FEATURE_CARD_2_LABEL%%
- %%FEATURE_CARD_2_TEXT%%
- %%FEATURE_CARD_2_TITLE%%
- %%HERO_DESCRIPTION%%
- %%HERO_EYEBROW%%
- %%HERO_META_LABEL_1%%
- %%HERO_META_LABEL_2%%
- %%HERO_META_LABEL_3%%
- %%HERO_META_TEXT_1%%
- %%HERO_META_TEXT_2%%
- %%HERO_META_TEXT_3%%
- %%HERO_TITLE%%
- %%HOME_FEATURED_LABEL%%
- %%HOME_LATEST_LABEL%%
- %%HOME_LINKS_LABEL%%
- %%HOME_QUOTE%%
- %%HOME_QUOTE_CITE%%
- %%INDEPENDENCE_NOTE%%
- %%INDEX_INTRO%%
- %%INDEX_TITLE%%
- %%INVITE_CODE%%
- %%INVITE_LABEL%%
- %%LANG%%
- %%LEGAL_LEGACY_DESC%%
- %%MISSING_DESC%%
- %%PLATE_CAPTION%%
- %%PLATE_LABEL%%
- %%PLATE_MARK%%
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
- %%ROOM_1_INTRO%%
- %%ROOM_1_LABEL%%
- %%ROOM_2_INTRO%%
- %%ROOM_2_LABEL%%
- %%ROOM_3_INTRO%%
- %%ROOM_3_LABEL%%
- %%S10_CAPTION%%
- %%S10_CATALOG_LABEL%%
- %%S10_CHECKED%%
- %%S10_CLOSING%%
- %%S10_COVER_ALT%%
- %%S10_EYEBROW%%
- %%S10_FAQ_A_1%%
- %%S10_FAQ_A_2%%
- %%S10_FAQ_A_3%%
- %%S10_FAQ_LABEL%%
- %%S10_FAQ_Q_1%%
- %%S10_FAQ_Q_2%%
- %%S10_FAQ_Q_3%%
- %%S10_H2_1%%
- %%S10_H2_2%%
- %%S10_H2_3%%
- %%S10_H2_4%%
- %%S10_MODIFIED%%
- %%S10_NEXT_LABEL%%
- %%S10_NEXT_TEXT%%
- %%S10_POINT_1%%
- %%S10_POINT_2%%
- %%S10_POINT_3%%
- %%S10_PUBLISHED%%
- %%S10_QUOTE%%
- %%S10_QUOTE_CITE%%
- %%S10_RING_LABEL_1%%
- %%S10_RING_LABEL_2%%
- %%S10_RING_LABEL_3%%
- %%S10_RING_TEXT_1%%
- %%S10_RING_TEXT_2%%
- %%S10_RING_TEXT_3%%
- %%S10_RING_TITLE_1%%
- %%S10_RING_TITLE_2%%
- %%S10_RING_TITLE_3%%
- %%S10_RSS_DATE%%
- %%S10_SOURCES_LABEL%%
- %%S10_SOURCE_NOTE_1%%
- %%S10_SOURCE_NOTE_2%%
- %%S10_SOURCE_TITLE_1%%
- %%S10_SOURCE_TITLE_2%%
- %%S10_SOURCE_URL_1%%
- %%S10_SOURCE_URL_2%%
- %%S10_STATUS%%
- %%S10_SUMMARY%%
- %%S10_TEXT_1%%
- %%S10_TEXT_2%%
- %%S10_TEXT_3%%
- %%S10_TEXT_4%%
- %%S10_TITLE%%
- %%S11_CAPTION%%
- %%S11_CATALOG_LABEL%%
- %%S11_CHECKED%%
- %%S11_CLOSING%%
- %%S11_COVER_ALT%%
- %%S11_ENVELOPE_LABEL%%
- %%S11_ENVELOPE_NOTE%%
- %%S11_ENVELOPE_TITLE%%
- %%S11_EYEBROW%%
- %%S11_FAQ_A_1%%
- %%S11_FAQ_A_2%%
- %%S11_FAQ_A_3%%
- %%S11_FAQ_LABEL%%
- %%S11_FAQ_Q_1%%
- %%S11_FAQ_Q_2%%
- %%S11_FAQ_Q_3%%
- %%S11_H2_1%%
- %%S11_H2_2%%
- %%S11_H2_3%%
- %%S11_H2_4%%
- %%S11_MODIFIED%%
- %%S11_NEXT_LABEL%%
- %%S11_NEXT_TEXT%%
- %%S11_POINT_1%%
- %%S11_POINT_2%%
- %%S11_POINT_3%%
- %%S11_PUBLISHED%%
- %%S11_QUOTE%%
- %%S11_QUOTE_CITE%%
- %%S11_RSS_DATE%%
- %%S11_SOURCES_LABEL%%
- %%S11_SOURCE_NOTE_1%%
- %%S11_SOURCE_NOTE_2%%
- %%S11_SOURCE_TERM_1%%
- %%S11_SOURCE_TERM_2%%
- %%S11_SOURCE_TERM_3%%
- %%S11_SOURCE_TITLE_1%%
- %%S11_SOURCE_TITLE_2%%
- %%S11_SOURCE_URL_1%%
- %%S11_SOURCE_URL_2%%
- %%S11_SOURCE_VALUE_1%%
- %%S11_SOURCE_VALUE_2%%
- %%S11_SOURCE_VALUE_3%%
- %%S11_STATUS%%
- %%S11_SUMMARY%%
- %%S11_TEXT_1%%
- %%S11_TEXT_2%%
- %%S11_TEXT_3%%
- %%S11_TEXT_4%%
- %%S11_TITLE%%
- %%S12_CAPTION%%
- %%S12_CATALOG_LABEL%%
- %%S12_CHECKED%%
- %%S12_CLOSING%%
- %%S12_COVER_ALT%%
- %%S12_EYEBROW%%
- %%S12_FAQ_A_1%%
- %%S12_FAQ_A_2%%
- %%S12_FAQ_A_3%%
- %%S12_FAQ_LABEL%%
- %%S12_FAQ_Q_1%%
- %%S12_FAQ_Q_2%%
- %%S12_FAQ_Q_3%%
- %%S12_GRAFT_LABEL%%
- %%S12_GRAFT_TEXT%%
- %%S12_GRAFT_TITLE%%
- %%S12_H2_1%%
- %%S12_H2_2%%
- %%S12_H2_3%%
- %%S12_H2_4%%
- %%S12_JOIN_LABEL%%
- %%S12_JOIN_TEXT%%
- %%S12_MODIFIED%%
- %%S12_NEXT_LABEL%%
- %%S12_NEXT_TEXT%%
- %%S12_POINT_1%%
- %%S12_POINT_2%%
- %%S12_POINT_3%%
- %%S12_PUBLISHED%%
- %%S12_QUOTE%%
- %%S12_QUOTE_CITE%%
- %%S12_SOURCES_LABEL%%
- %%S12_SOURCE_NOTE_1%%
- %%S12_SOURCE_NOTE_2%%
- %%S12_SOURCE_TITLE_1%%
- %%S12_SOURCE_TITLE_2%%
- %%S12_SOURCE_URL_1%%
- %%S12_SOURCE_URL_2%%
- %%S12_STATUS%%
- %%S12_STOCK_LABEL%%
- %%S12_STOCK_TEXT%%
- %%S12_STOCK_TITLE%%
- %%S12_SUMMARY%%
- %%S12_TEXT_1%%
- %%S12_TEXT_2%%
- %%S12_TEXT_3%%
- %%S12_TEXT_4%%
- %%S12_TITLE%%
- %%S1_ACCESSION_LABEL%%
- %%S1_ACCESSION_VALUE%%
- %%S1_CAPTION%%
- %%S1_CATALOG_LABEL%%
- %%S1_CHECKED%%
- %%S1_CLOSING%%
- %%S1_COVER_ALT%%
- %%S1_EYEBROW%%
- %%S1_FAQ_A_1%%
- %%S1_FAQ_A_2%%
- %%S1_FAQ_A_3%%
- %%S1_FAQ_LABEL%%
- %%S1_FAQ_Q_1%%
- %%S1_FAQ_Q_2%%
- %%S1_FAQ_Q_3%%
- %%S1_FIELD_1%%
- %%S1_FIELD_2%%
- %%S1_FIELD_3%%
- %%S1_FIELD_4%%
- %%S1_H2_1%%
- %%S1_H2_2%%
- %%S1_H2_3%%
- %%S1_H2_4%%
- %%S1_MODIFIED%%
- %%S1_NEXT_LABEL%%
- %%S1_NEXT_TEXT%%
- %%S1_POINT_1%%
- %%S1_POINT_2%%
- %%S1_POINT_3%%
- %%S1_PUBLISHED%%
- %%S1_QUOTE%%
- %%S1_QUOTE_CITE%%
- %%S1_RSS_DATE%%
- %%S1_SOURCES_LABEL%%
- %%S1_SOURCE_NOTE_1%%
- %%S1_SOURCE_NOTE_2%%
- %%S1_SOURCE_TITLE_1%%
- %%S1_SOURCE_TITLE_2%%
- %%S1_SOURCE_URL_1%%
- %%S1_SOURCE_URL_2%%
- %%S1_STATUS%%
- %%S1_SUMMARY%%
- %%S1_TEXT_1%%
- %%S1_TEXT_2%%
- %%S1_TEXT_3%%
- %%S1_TEXT_4%%
- %%S1_TITLE%%
- %%S1_VALUE_1%%
- %%S1_VALUE_2%%
- %%S1_VALUE_3%%
- %%S1_VALUE_4%%
- %%S2_CAPTION%%
- %%S2_CATALOG_LABEL%%
- %%S2_CHECKED%%
- %%S2_CLOSING%%
- %%S2_COVER_ALT%%
- %%S2_EYEBROW%%
- %%S2_FAQ_A_1%%
- %%S2_FAQ_A_2%%
- %%S2_FAQ_A_3%%
- %%S2_FAQ_LABEL%%
- %%S2_FAQ_Q_1%%
- %%S2_FAQ_Q_2%%
- %%S2_FAQ_Q_3%%
- %%S2_H2_1%%
- %%S2_H2_2%%
- %%S2_H2_3%%
- %%S2_H2_4%%
- %%S2_MODIFIED%%
- %%S2_NEXT_LABEL%%
- %%S2_NEXT_TEXT%%
- %%S2_PETAL_1%%
- %%S2_PETAL_2%%
- %%S2_PETAL_3%%
- %%S2_PETAL_4%%
- %%S2_PETAL_TEXT_1%%
- %%S2_PETAL_TEXT_2%%
- %%S2_PETAL_TEXT_3%%
- %%S2_PETAL_TEXT_4%%
- %%S2_POINT_1%%
- %%S2_POINT_2%%
- %%S2_POINT_3%%
- %%S2_PUBLISHED%%
- %%S2_QUOTE%%
- %%S2_QUOTE_CITE%%
- %%S2_RSS_DATE%%
- %%S2_SOURCES_LABEL%%
- %%S2_SOURCE_NOTE_1%%
- %%S2_SOURCE_NOTE_2%%
- %%S2_SOURCE_TITLE_1%%
- %%S2_SOURCE_TITLE_2%%
- %%S2_SOURCE_URL_1%%
- %%S2_SOURCE_URL_2%%
- %%S2_STATUS%%
- %%S2_SUMMARY%%
- %%S2_TEXT_1%%
- %%S2_TEXT_2%%
- %%S2_TEXT_3%%
- %%S2_TEXT_4%%
- %%S2_TITLE%%
- %%S3_BRANCH_1%%
- %%S3_BRANCH_2%%
- %%S3_BRANCH_3%%
- %%S3_CAPTION%%
- %%S3_CATALOG_LABEL%%
- %%S3_CHECKED%%
- %%S3_CLOSING%%
- %%S3_COVER_ALT%%
- %%S3_EYEBROW%%
- %%S3_FAQ_A_1%%
- %%S3_FAQ_A_2%%
- %%S3_FAQ_A_3%%
- %%S3_FAQ_LABEL%%
- %%S3_FAQ_Q_1%%
- %%S3_FAQ_Q_2%%
- %%S3_FAQ_Q_3%%
- %%S3_H2_1%%
- %%S3_H2_2%%
- %%S3_H2_3%%
- %%S3_H2_4%%
- %%S3_LEAF_1_1%%
- %%S3_LEAF_1_2%%
- %%S3_LEAF_2_1%%
- %%S3_LEAF_2_2%%
- %%S3_LEAF_3_1%%
- %%S3_LEAF_3_2%%
- %%S3_MODIFIED%%
- %%S3_NEXT_LABEL%%
- %%S3_NEXT_TEXT%%
- %%S3_POINT_1%%
- %%S3_POINT_2%%
- %%S3_POINT_3%%
- %%S3_PUBLISHED%%
- %%S3_QUOTE%%
- %%S3_QUOTE_CITE%%
- %%S3_ROOT_TITLE%%
- %%S3_RSS_DATE%%
- %%S3_SOURCES_LABEL%%
- %%S3_SOURCE_NOTE_1%%
- %%S3_SOURCE_NOTE_2%%
- %%S3_SOURCE_TITLE_1%%
- %%S3_SOURCE_TITLE_2%%
- %%S3_SOURCE_URL_1%%
- %%S3_SOURCE_URL_2%%
- %%S3_STATUS%%
- %%S3_SUMMARY%%
- %%S3_TEXT_1%%
- %%S3_TEXT_2%%
- %%S3_TEXT_3%%
- %%S3_TEXT_4%%
- %%S3_TITLE%%
- %%S4_CAPTION%%
- %%S4_CATALOG_LABEL%%
- %%S4_CHECKED%%
- %%S4_CLOSING%%
- %%S4_COVER_ALT%%
- %%S4_EYEBROW%%
- %%S4_FAQ_A_1%%
- %%S4_FAQ_A_2%%
- %%S4_FAQ_A_3%%
- %%S4_FAQ_LABEL%%
- %%S4_FAQ_Q_1%%
- %%S4_FAQ_Q_2%%
- %%S4_FAQ_Q_3%%
- %%S4_H2_1%%
- %%S4_H2_2%%
- %%S4_H2_3%%
- %%S4_H2_4%%
- %%S4_MODIFIED%%
- %%S4_NEXT_LABEL%%
- %%S4_NEXT_TEXT%%
- %%S4_POINT_1%%
- %%S4_POINT_2%%
- %%S4_POINT_3%%
- %%S4_PUBLISHED%%
- %%S4_QUOTE%%
- %%S4_QUOTE_CITE%%
- %%S4_RSS_DATE%%
- %%S4_SIDE_LABEL_1%%
- %%S4_SIDE_LABEL_2%%
- %%S4_SIDE_NOTE_1%%
- %%S4_SIDE_NOTE_2%%
- %%S4_SIDE_TEXT_1%%
- %%S4_SIDE_TEXT_2%%
- %%S4_SIDE_TITLE_1%%
- %%S4_SIDE_TITLE_2%%
- %%S4_SOURCES_LABEL%%
- %%S4_SOURCE_NOTE_1%%
- %%S4_SOURCE_NOTE_2%%
- %%S4_SOURCE_TITLE_1%%
- %%S4_SOURCE_TITLE_2%%
- %%S4_SOURCE_URL_1%%
- %%S4_SOURCE_URL_2%%
- %%S4_STATUS%%
- %%S4_SUMMARY%%
- %%S4_TEXT_1%%
- %%S4_TEXT_2%%
- %%S4_TEXT_3%%
- %%S4_TEXT_4%%
- %%S4_TITLE%%
- %%S5_CAPTION%%
- %%S5_CATALOG_LABEL%%
- %%S5_CHECKED%%
- %%S5_CLOSING%%
- %%S5_COVER_ALT%%
- %%S5_EYEBROW%%
- %%S5_FAQ_A_1%%
- %%S5_FAQ_A_2%%
- %%S5_FAQ_A_3%%
- %%S5_FAQ_LABEL%%
- %%S5_FAQ_Q_1%%
- %%S5_FAQ_Q_2%%
- %%S5_FAQ_Q_3%%
- %%S5_H2_1%%
- %%S5_H2_2%%
- %%S5_H2_3%%
- %%S5_H2_4%%
- %%S5_MODIFIED%%
- %%S5_NEXT_LABEL%%
- %%S5_NEXT_TEXT%%
- %%S5_PIN_CITE_1%%
- %%S5_PIN_CITE_2%%
- %%S5_PIN_CITE_3%%
- %%S5_PIN_NOTE_1%%
- %%S5_PIN_NOTE_2%%
- %%S5_PIN_NOTE_3%%
- %%S5_PIN_QUOTE_1%%
- %%S5_PIN_QUOTE_2%%
- %%S5_PIN_QUOTE_3%%
- %%S5_POINT_1%%
- %%S5_POINT_2%%
- %%S5_POINT_3%%
- %%S5_PUBLISHED%%
- %%S5_QUOTE%%
- %%S5_QUOTE_CITE%%
- %%S5_RSS_DATE%%
- %%S5_SOURCES_LABEL%%
- %%S5_SOURCE_NOTE_1%%
- %%S5_SOURCE_NOTE_2%%
- %%S5_SOURCE_TITLE_1%%
- %%S5_SOURCE_TITLE_2%%
- %%S5_SOURCE_URL_1%%
- %%S5_SOURCE_URL_2%%
- %%S5_STATUS%%
- %%S5_SUMMARY%%
- %%S5_TEXT_1%%
- %%S5_TEXT_2%%
- %%S5_TEXT_3%%
- %%S5_TEXT_4%%
- %%S5_TITLE%%
- %%S6_CAPTION%%
- %%S6_CATALOG_LABEL%%
- %%S6_CHECKED%%
- %%S6_CLOSING%%
- %%S6_COVER_ALT%%
- %%S6_EYEBROW%%
- %%S6_FAQ_A_1%%
- %%S6_FAQ_A_2%%
- %%S6_FAQ_A_3%%
- %%S6_FAQ_LABEL%%
- %%S6_FAQ_Q_1%%
- %%S6_FAQ_Q_2%%
- %%S6_FAQ_Q_3%%
- %%S6_H2_1%%
- %%S6_H2_2%%
- %%S6_H2_3%%
- %%S6_H2_4%%
- %%S6_MODIFIED%%
- %%S6_NEXT_LABEL%%
- %%S6_NEXT_TEXT%%
- %%S6_POINT_1%%
- %%S6_POINT_2%%
- %%S6_POINT_3%%
- %%S6_PUBLISHED%%
- %%S6_QUOTE%%
- %%S6_QUOTE_CITE%%
- %%S6_RSS_DATE%%
- %%S6_SOURCES_LABEL%%
- %%S6_SOURCE_NOTE_1%%
- %%S6_SOURCE_NOTE_2%%
- %%S6_SOURCE_TITLE_1%%
- %%S6_SOURCE_TITLE_2%%
- %%S6_SOURCE_URL_1%%
- %%S6_SOURCE_URL_2%%
- %%S6_STAGE_LABEL_1%%
- %%S6_STAGE_LABEL_2%%
- %%S6_STAGE_LABEL_3%%
- %%S6_STAGE_LABEL_4%%
- %%S6_STAGE_TEXT_1%%
- %%S6_STAGE_TEXT_2%%
- %%S6_STAGE_TEXT_3%%
- %%S6_STAGE_TEXT_4%%
- %%S6_STAGE_TITLE_1%%
- %%S6_STAGE_TITLE_2%%
- %%S6_STAGE_TITLE_3%%
- %%S6_STAGE_TITLE_4%%
- %%S6_STATUS%%
- %%S6_SUMMARY%%
- %%S6_TEXT_1%%
- %%S6_TEXT_2%%
- %%S6_TEXT_3%%
- %%S6_TEXT_4%%
- %%S6_TITLE%%
- %%S7_CAPTION%%
- %%S7_CATALOG_LABEL%%
- %%S7_CHECKED%%
- %%S7_CLOSING%%
- %%S7_COVER_ALT%%
- %%S7_EYEBROW%%
- %%S7_FAQ_A_1%%
- %%S7_FAQ_A_2%%
- %%S7_FAQ_A_3%%
- %%S7_FAQ_LABEL%%
- %%S7_FAQ_Q_1%%
- %%S7_FAQ_Q_2%%
- %%S7_FAQ_Q_3%%
- %%S7_H2_1%%
- %%S7_H2_2%%
- %%S7_H2_3%%
- %%S7_H2_4%%
- %%S7_LAYER_1%%
- %%S7_LAYER_2%%
- %%S7_LAYER_3%%
- %%S7_LAYER_NOTE_1%%
- %%S7_LAYER_NOTE_2%%
- %%S7_LAYER_NOTE_3%%
- %%S7_LAYER_TEXT_1%%
- %%S7_LAYER_TEXT_2%%
- %%S7_LAYER_TEXT_3%%
- %%S7_MODIFIED%%
- %%S7_NEXT_LABEL%%
- %%S7_NEXT_TEXT%%
- %%S7_POINT_1%%
- %%S7_POINT_2%%
- %%S7_POINT_3%%
- %%S7_PUBLISHED%%
- %%S7_QUOTE%%
- %%S7_QUOTE_CITE%%
- %%S7_RSS_DATE%%
- %%S7_SOURCES_LABEL%%
- %%S7_SOURCE_NOTE_1%%
- %%S7_SOURCE_NOTE_2%%
- %%S7_SOURCE_TITLE_1%%
- %%S7_SOURCE_TITLE_2%%
- %%S7_SOURCE_URL_1%%
- %%S7_SOURCE_URL_2%%
- %%S7_STATUS%%
- %%S7_SUMMARY%%
- %%S7_TEXT_1%%
- %%S7_TEXT_2%%
- %%S7_TEXT_3%%
- %%S7_TEXT_4%%
- %%S7_TITLE%%
- %%S8_CAPTION%%
- %%S8_CATALOG_LABEL%%
- %%S8_CELL_1_1%%
- %%S8_CELL_1_2%%
- %%S8_CELL_1_3%%
- %%S8_CELL_2_1%%
- %%S8_CELL_2_2%%
- %%S8_CELL_2_3%%
- %%S8_CELL_3_1%%
- %%S8_CELL_3_2%%
- %%S8_CELL_3_3%%
- %%S8_CELL_4_1%%
- %%S8_CELL_4_2%%
- %%S8_CELL_4_3%%
- %%S8_CHECKED%%
- %%S8_CLOSING%%
- %%S8_COL_1%%
- %%S8_COL_2%%
- %%S8_COL_3%%
- %%S8_COL_4%%
- %%S8_COVER_ALT%%
- %%S8_EYEBROW%%
- %%S8_FAQ_A_1%%
- %%S8_FAQ_A_2%%
- %%S8_FAQ_A_3%%
- %%S8_FAQ_LABEL%%
- %%S8_FAQ_Q_1%%
- %%S8_FAQ_Q_2%%
- %%S8_FAQ_Q_3%%
- %%S8_H2_1%%
- %%S8_H2_2%%
- %%S8_H2_3%%
- %%S8_H2_4%%
- %%S8_MODIFIED%%
- %%S8_NEXT_LABEL%%
- %%S8_NEXT_TEXT%%
- %%S8_POINT_1%%
- %%S8_POINT_2%%
- %%S8_POINT_3%%
- %%S8_PUBLISHED%%
- %%S8_QUOTE%%
- %%S8_QUOTE_CITE%%
- %%S8_ROW_1%%
- %%S8_ROW_2%%
- %%S8_ROW_3%%
- %%S8_ROW_4%%
- %%S8_RSS_DATE%%
- %%S8_SOURCES_LABEL%%
- %%S8_SOURCE_NOTE_1%%
- %%S8_SOURCE_NOTE_2%%
- %%S8_SOURCE_TITLE_1%%
- %%S8_SOURCE_TITLE_2%%
- %%S8_SOURCE_URL_1%%
- %%S8_SOURCE_URL_2%%
- %%S8_STATUS%%
- %%S8_SUMMARY%%
- %%S8_TABLE_LABEL%%
- %%S8_TEXT_1%%
- %%S8_TEXT_2%%
- %%S8_TEXT_3%%
- %%S8_TEXT_4%%
- %%S8_TITLE%%
- %%S9_CAPTION%%
- %%S9_CATALOG_LABEL%%
- %%S9_CHECKED%%
- %%S9_CLOSING%%
- %%S9_COVER_ALT%%
- %%S9_EYEBROW%%
- %%S9_FAQ_A_1%%
- %%S9_FAQ_A_2%%
- %%S9_FAQ_A_3%%
- %%S9_FAQ_LABEL%%
- %%S9_FAQ_Q_1%%
- %%S9_FAQ_Q_2%%
- %%S9_FAQ_Q_3%%
- %%S9_H2_1%%
- %%S9_H2_2%%
- %%S9_H2_3%%
- %%S9_H2_4%%
- %%S9_MODIFIED%%
- %%S9_NEXT_LABEL%%
- %%S9_NEXT_TEXT%%
- %%S9_POINT_1%%
- %%S9_POINT_2%%
- %%S9_POINT_3%%
- %%S9_PUBLISHED%%
- %%S9_QUOTE%%
- %%S9_QUOTE_CITE%%
- %%S9_SOURCES_LABEL%%
- %%S9_SOURCE_NOTE_1%%
- %%S9_SOURCE_NOTE_2%%
- %%S9_SOURCE_TITLE_1%%
- %%S9_SOURCE_TITLE_2%%
- %%S9_SOURCE_URL_1%%
- %%S9_SOURCE_URL_2%%
- %%S9_STATUS%%
- %%S9_SUMMARY%%
- %%S9_TEXT_1%%
- %%S9_TEXT_2%%
- %%S9_TEXT_3%%
- %%S9_TEXT_4%%
- %%S9_TITLE%%
- %%S9_UNKNOWN_1%%
- %%S9_UNKNOWN_2%%
- %%S9_UNKNOWN_TEXT_1%%
- %%S9_UNKNOWN_TEXT_2%%
- %%S9_UNRESOLVED_LABEL%%
- %%S9_UNRESOLVED_TEXT%%
- %%S9_UNRESOLVED_TITLE%%
- %%SECURITY_EMAIL%%
- %%SECURITY_EXPIRES%%
- %%SEO_TITLE%%
- %%SITEMAP_DATE%%
- %%SITE_DESC%%
- %%SITE_DOMAIN%%
- %%SITE_NAME%%
- %%SITE_TAGLINE%%
- %%TOOL_1_INTRO%%
- %%TOOL_2_INTRO%%
- %%TOOL_3_INTRO%%
- %%TOOL_4_INTRO%%
- %%TOOL_5_INTRO%%
- %%TOOL_LEGACY_DESC%%

## 审计

依次运行 validate、audit-template、audit-workflow-readiness 与全库 check-similarity；逐页浏览器验收脚本在 tools/qa/065-moss-bloom-browser.js。完整通过后才更新仓库进度。
