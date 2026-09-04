# 058-graphite-line · 石墨制图记录线

## 完整框架与来源边界

保留左侧固定导轨、石墨网格、日期登记线和朱红标记，保留 gl58 命名与原 css/line.css。css/drafting.css 补齐完整阅读和工具界面。原始动态源包忠实度未核验，不能把本地 UI 就绪作为原包复刻证明。

## 后续 AI 内容接入

仅填写经核实的文章文字、来源与站点变量，不需补 UI、页面、工具、封面或通用发布资源。保留 class、id、data、form name、aria 关系、文件路径及组件结构。

- r1–r12 是独立文章槽位；三种图纸开场、十二组件、4/3/5 个正文 H2、3/2/4 个 FAQ 与三种收尾已预搭。作者经历、来源、日期、状态及政策结论必须核实，不以模板变量冒充证据。抽象制图图形不是实测或真实照片。
- registrationGuide 仅为旧检查器兼容字段，指向 link-bridge.html 的通用推广 UI 外壳，不要求注册教程选题或业务正文。唯一推广 href 在该外壳内，旁边有邀请码与推广披露；首页只真复制邀请码及显示条件，没有推广直链。
- 字标用英文或罗马字；HTML/XML 文字及属性按上下文转义，JSON-LD 按 JSON 字符串编码并安全转义小于号。域名无协议和路径；来源 URL 只填已核实 HTTPS 地址，不填推广链接。日期用 ISO，rss_date 用 RFC822，security_expires 为未来 RFC3339。
- 首页标题、权益和介绍保持简短；r*_day 与 r*_month_year 必须和相应 modified 日期一致，状态标签由事实流程核实。替换后复查 360px 首屏、长词和表格。三个档各四页，增删时同步分类、入链、sitemap 和 feed。
- 明暗主题是唯一 localStorage 项；目录筛选、所有输入与结果不保存、不上传。无 JS 可阅读和导航，筛选隐藏，提交与复制禁用。正文页签为原生 details；输入变更、重置及异步复制均处理旧结果失效。
- 五工具为固定 UTC 偏移换算、数字修订号排序、半开时段冲突、码点 Levenshtein 距离、非负有向图 Dijkstra。各 Guide 写明边界：不推断夏令时、不是完整 SemVer、时段不跨日、编辑距离不代表语义、路径成本由用户提供。
- article.html/tool.html/legal.html 是 noindex 兼容入口，不自动跳转。深层未知 URL 须由单站服务器返回真实 404 并映射 404.html，本轮不配置或部署服务器。
- 十二套独立 SVG/PNG/WebP 1200×630 封面，WebP 显示并高优先级预载，独立 PNG 用于 OG。含社交图、SVG/ICO、180px apple 图标、robots、sitemap、security.txt；RSS 选第 1/2/3/5/6/7/8/9/11/12 篇摘要，不含邀请码或推广。

## workflow-ready-v2

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "register.html",
  "articles": [
    "sheets/basis-sheet.html",
    "sheets/source-ruler.html",
    "sheets/scope-brackets.html",
    "sheets/revision-track.html",
    "sheets/effective-stamp.html",
    "sheets/delta-grid.html",
    "sheets/exception-cutout.html",
    "sheets/evidence-path.html",
    "sheets/checkpoints.html",
    "sheets/method-overlay.html",
    "sheets/verification-panel.html",
    "sheets/link-bridge.html"
  ],
  "cornerstones": [
    "sheets/basis-sheet.html",
    "sheets/source-ruler.html"
  ],
  "registrationGuide": "sheets/link-bridge.html",
  "articleCovers": {
    "sheets/basis-sheet.html": {
      "display": "assets/covers/basis-sheet.webp",
      "og": "assets/covers/basis-sheet.png"
    },
    "sheets/source-ruler.html": {
      "display": "assets/covers/source-ruler.webp",
      "og": "assets/covers/source-ruler.png"
    },
    "sheets/scope-brackets.html": {
      "display": "assets/covers/scope-brackets.webp",
      "og": "assets/covers/scope-brackets.png"
    },
    "sheets/revision-track.html": {
      "display": "assets/covers/revision-track.webp",
      "og": "assets/covers/revision-track.png"
    },
    "sheets/effective-stamp.html": {
      "display": "assets/covers/effective-stamp.webp",
      "og": "assets/covers/effective-stamp.png"
    },
    "sheets/delta-grid.html": {
      "display": "assets/covers/delta-grid.webp",
      "og": "assets/covers/delta-grid.png"
    },
    "sheets/exception-cutout.html": {
      "display": "assets/covers/exception-cutout.webp",
      "og": "assets/covers/exception-cutout.png"
    },
    "sheets/evidence-path.html": {
      "display": "assets/covers/evidence-path.webp",
      "og": "assets/covers/evidence-path.png"
    },
    "sheets/checkpoints.html": {
      "display": "assets/covers/checkpoints.webp",
      "og": "assets/covers/checkpoints.png"
    },
    "sheets/method-overlay.html": {
      "display": "assets/covers/method-overlay.webp",
      "og": "assets/covers/method-overlay.png"
    },
    "sheets/verification-panel.html": {
      "display": "assets/covers/verification-panel.webp",
      "og": "assets/covers/verification-panel.png"
    },
    "sheets/link-bridge.html": {
      "display": "assets/covers/link-bridge.webp",
      "og": "assets/covers/link-bridge.png"
    }
  },
  "categories": [
    {
      "path": "axes/baseline.html",
      "label": "基线档",
      "articles": [
        "sheets/basis-sheet.html",
        "sheets/source-ruler.html",
        "sheets/scope-brackets.html",
        "sheets/revision-track.html"
      ]
    },
    {
      "path": "axes/change-span.html",
      "label": "变动档",
      "articles": [
        "sheets/effective-stamp.html",
        "sheets/delta-grid.html",
        "sheets/exception-cutout.html",
        "sheets/evidence-path.html"
      ]
    },
    {
      "path": "axes/recheck.html",
      "label": "复验档",
      "articles": [
        "sheets/checkpoints.html",
        "sheets/method-overlay.html",
        "sheets/verification-panel.html",
        "sheets/link-bridge.html"
      ]
    }
  ],
  "toolIndex": "instruments.html",
  "tools": [
    "instruments/fixed-offset.html",
    "instruments/revision-order.html",
    "instruments/slot-conflicts.html",
    "instruments/edit-distance.html",
    "instruments/shortest-route.html"
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
    "siteDomain": "__site_domain__",
    "siteName": "__site_name__",
    "wordmark": "__brand_en__",
    "inviteCode": "__invite_code__",
    "benefitRate": "__benefit_rate__",
    "benefitDisclaimer": "__benefit_disclaimer__",
    "affiliateUrl": "__affiliate_url__"
  }
}
```

## 全部变量

- `__about_desc__`
- `__about_h2_1__`
- `__about_h2_2__`
- `__about_h2_3__`
- `__about_intro__`
- `__about_modified__`
- `__about_note__`
- `__about_text_1__`
- `__about_text_2__`
- `__about_text_3__`
- `__affiliate_disclosure__`
- `__affiliate_label__`
- `__affiliate_url__`
- `__author_bio__`
- `__author_name__`
- `__axes_title__`
- `__axis1_desc__`
- `__axis1_intro__`
- `__axis2_desc__`
- `__axis2_intro__`
- `__axis3_desc__`
- `__axis3_intro__`
- `__benefit_disclaimer__`
- `__benefit_rate__`
- `__brand_en__`
- `__contact_desc__`
- `__contact_email__`
- `__contact_h2_1__`
- `__contact_h2_2__`
- `__contact_h2_3__`
- `__contact_intro__`
- `__contact_modified__`
- `__contact_note__`
- `__contact_text_1__`
- `__contact_text_2__`
- `__contact_text_3__`
- `__corrections_desc__`
- `__corrections_h2_1__`
- `__corrections_h2_2__`
- `__corrections_h2_3__`
- `__corrections_intro__`
- `__corrections_modified__`
- `__corrections_note__`
- `__corrections_text_1__`
- `__corrections_text_2__`
- `__corrections_text_3__`
- `__disclaimer_desc__`
- `__disclaimer_h2_1__`
- `__disclaimer_h2_2__`
- `__disclaimer_h2_3__`
- `__disclaimer_intro__`
- `__disclaimer_modified__`
- `__disclaimer_note__`
- `__disclaimer_text_1__`
- `__disclaimer_text_2__`
- `__disclaimer_text_3__`
- `__disclosure_desc__`
- `__disclosure_h2_1__`
- `__disclosure_h2_2__`
- `__disclosure_h2_3__`
- `__disclosure_intro__`
- `__disclosure_modified__`
- `__disclosure_note__`
- `__disclosure_text_1__`
- `__disclosure_text_2__`
- `__disclosure_text_3__`
- `__editorial_desc__`
- `__editorial_h2_1__`
- `__editorial_h2_2__`
- `__editorial_h2_3__`
- `__editorial_intro__`
- `__editorial_modified__`
- `__editorial_note__`
- `__editorial_text_1__`
- `__editorial_text_2__`
- `__editorial_text_3__`
- `__hero_description__`
- `__hero_eyebrow__`
- `__hero_title__`
- `__home_featured_label__`
- `__home_issue_label__`
- `__home_latest_label__`
- `__home_links_label__`
- `__home_tools_title__`
- `__independence_note__`
- `__instruments_desc__`
- `__instruments_intro__`
- `__invite_code__`
- `__invite_label__`
- `__lang__`
- `__privacy_desc__`
- `__privacy_h2_1__`
- `__privacy_h2_2__`
- `__privacy_h2_3__`
- `__privacy_intro__`
- `__privacy_modified__`
- `__privacy_note__`
- `__privacy_text_1__`
- `__privacy_text_2__`
- `__privacy_text_3__`
- `__r10_checked__`
- `__r10_cover_alt__`
- `__r10_cover_caption__`
- `__r10_day__`
- `__r10_desc__`
- `__r10_end_text__`
- `__r10_end_title__`
- `__r10_faq_a1__`
- `__r10_faq_a2__`
- `__r10_faq_a3__`
- `__r10_faq_q1__`
- `__r10_faq_q2__`
- `__r10_faq_q3__`
- `__r10_h2_1__`
- `__r10_h2_2__`
- `__r10_h2_3__`
- `__r10_h2_4__`
- `__r10_intro__`
- `__r10_m_label_1__`
- `__r10_m_label_2__`
- `__r10_m_text_1__`
- `__r10_m_text_2__`
- `__r10_modified__`
- `__r10_month_year__`
- `__r10_published__`
- `__r10_quote__`
- `__r10_quote_attribution__`
- `__r10_source_label_1__`
- `__r10_source_label_2__`
- `__r10_source_note_1__`
- `__r10_source_note_2__`
- `__r10_source_url_1__`
- `__r10_source_url_2__`
- `__r10_status__`
- `__r10_summary__`
- `__r10_table_caption__`
- `__r10_table_cell_1_1__`
- `__r10_table_cell_1_2__`
- `__r10_table_cell_2_1__`
- `__r10_table_cell_2_2__`
- `__r10_table_cell_3_1__`
- `__r10_table_cell_3_2__`
- `__r10_table_col_1__`
- `__r10_table_col_2__`
- `__r10_table_col_3__`
- `__r10_table_row_1__`
- `__r10_table_row_2__`
- `__r10_table_row_3__`
- `__r10_text_1__`
- `__r10_text_2__`
- `__r10_text_3__`
- `__r10_text_4__`
- `__r10_title__`
- `__r11_checked__`
- `__r11_cover_alt__`
- `__r11_cover_caption__`
- `__r11_day__`
- `__r11_desc__`
- `__r11_end_text__`
- `__r11_end_title__`
- `__r11_faq_a1__`
- `__r11_faq_a2__`
- `__r11_faq_q1__`
- `__r11_faq_q2__`
- `__r11_h2_1__`
- `__r11_h2_2__`
- `__r11_h2_3__`
- `__r11_intro__`
- `__r11_m_label_1__`
- `__r11_m_label_2__`
- `__r11_m_label_3__`
- `__r11_m_label__`
- `__r11_m_text_1__`
- `__r11_m_text_2__`
- `__r11_m_text_3__`
- `__r11_m_text__`
- `__r11_modified__`
- `__r11_month_year__`
- `__r11_published__`
- `__r11_quote__`
- `__r11_quote_attribution__`
- `__r11_rss_date__`
- `__r11_source_label_1__`
- `__r11_source_label_2__`
- `__r11_source_note_1__`
- `__r11_source_note_2__`
- `__r11_source_url_1__`
- `__r11_source_url_2__`
- `__r11_status__`
- `__r11_summary__`
- `__r11_table_caption__`
- `__r11_table_cell_1_1__`
- `__r11_table_cell_1_2__`
- `__r11_table_cell_2_1__`
- `__r11_table_cell_2_2__`
- `__r11_table_cell_3_1__`
- `__r11_table_cell_3_2__`
- `__r11_table_col_1__`
- `__r11_table_col_2__`
- `__r11_table_col_3__`
- `__r11_table_row_1__`
- `__r11_table_row_2__`
- `__r11_table_row_3__`
- `__r11_text_1__`
- `__r11_text_2__`
- `__r11_text_3__`
- `__r11_title__`
- `__r12_checked__`
- `__r12_cover_alt__`
- `__r12_cover_caption__`
- `__r12_day__`
- `__r12_desc__`
- `__r12_end_text__`
- `__r12_end_title__`
- `__r12_faq_a1__`
- `__r12_faq_a2__`
- `__r12_faq_a3__`
- `__r12_faq_a4__`
- `__r12_faq_q1__`
- `__r12_faq_q2__`
- `__r12_faq_q3__`
- `__r12_faq_q4__`
- `__r12_h2_1__`
- `__r12_h2_2__`
- `__r12_h2_3__`
- `__r12_h2_4__`
- `__r12_h2_5__`
- `__r12_intro__`
- `__r12_m_label__`
- `__r12_m_text__`
- `__r12_modified__`
- `__r12_month_year__`
- `__r12_published__`
- `__r12_quote__`
- `__r12_quote_attribution__`
- `__r12_rss_date__`
- `__r12_source_label_1__`
- `__r12_source_label_2__`
- `__r12_source_note_1__`
- `__r12_source_note_2__`
- `__r12_source_url_1__`
- `__r12_source_url_2__`
- `__r12_status__`
- `__r12_summary__`
- `__r12_table_caption__`
- `__r12_table_cell_1_1__`
- `__r12_table_cell_1_2__`
- `__r12_table_cell_2_1__`
- `__r12_table_cell_2_2__`
- `__r12_table_cell_3_1__`
- `__r12_table_cell_3_2__`
- `__r12_table_col_1__`
- `__r12_table_col_2__`
- `__r12_table_col_3__`
- `__r12_table_row_1__`
- `__r12_table_row_2__`
- `__r12_table_row_3__`
- `__r12_text_1__`
- `__r12_text_2__`
- `__r12_text_3__`
- `__r12_text_4__`
- `__r12_text_5__`
- `__r12_title__`
- `__r1_checked__`
- `__r1_cover_alt__`
- `__r1_cover_caption__`
- `__r1_day__`
- `__r1_desc__`
- `__r1_end_text__`
- `__r1_end_title__`
- `__r1_faq_a1__`
- `__r1_faq_a2__`
- `__r1_faq_a3__`
- `__r1_faq_q1__`
- `__r1_faq_q2__`
- `__r1_faq_q3__`
- `__r1_h2_1__`
- `__r1_h2_2__`
- `__r1_h2_3__`
- `__r1_h2_4__`
- `__r1_intro__`
- `__r1_m_label_1__`
- `__r1_m_label_2__`
- `__r1_m_label_3__`
- `__r1_m_label_4__`
- `__r1_m_label__`
- `__r1_m_text_1__`
- `__r1_m_text_2__`
- `__r1_m_text_3__`
- `__r1_m_text_4__`
- `__r1_modified__`
- `__r1_month_year__`
- `__r1_published__`
- `__r1_quote__`
- `__r1_quote_attribution__`
- `__r1_rss_date__`
- `__r1_source_label_1__`
- `__r1_source_label_2__`
- `__r1_source_note_1__`
- `__r1_source_note_2__`
- `__r1_source_url_1__`
- `__r1_source_url_2__`
- `__r1_status__`
- `__r1_summary__`
- `__r1_table_caption__`
- `__r1_table_cell_1_1__`
- `__r1_table_cell_1_2__`
- `__r1_table_cell_2_1__`
- `__r1_table_cell_2_2__`
- `__r1_table_cell_3_1__`
- `__r1_table_cell_3_2__`
- `__r1_table_col_1__`
- `__r1_table_col_2__`
- `__r1_table_col_3__`
- `__r1_table_row_1__`
- `__r1_table_row_2__`
- `__r1_table_row_3__`
- `__r1_text_1__`
- `__r1_text_2__`
- `__r1_text_3__`
- `__r1_text_4__`
- `__r1_title__`
- `__r2_checked__`
- `__r2_cover_alt__`
- `__r2_cover_caption__`
- `__r2_day__`
- `__r2_desc__`
- `__r2_end_text__`
- `__r2_end_title__`
- `__r2_faq_a1__`
- `__r2_faq_a2__`
- `__r2_faq_q1__`
- `__r2_faq_q2__`
- `__r2_h2_1__`
- `__r2_h2_2__`
- `__r2_h2_3__`
- `__r2_intro__`
- `__r2_m_label_1__`
- `__r2_m_label_2__`
- `__r2_m_label__`
- `__r2_m_text_1__`
- `__r2_m_text_2__`
- `__r2_m_text__`
- `__r2_modified__`
- `__r2_month_year__`
- `__r2_published__`
- `__r2_quote__`
- `__r2_quote_attribution__`
- `__r2_rss_date__`
- `__r2_source_label_1__`
- `__r2_source_label_2__`
- `__r2_source_note_1__`
- `__r2_source_note_2__`
- `__r2_source_url_1__`
- `__r2_source_url_2__`
- `__r2_status__`
- `__r2_summary__`
- `__r2_table_caption__`
- `__r2_table_cell_1_1__`
- `__r2_table_cell_1_2__`
- `__r2_table_cell_2_1__`
- `__r2_table_cell_2_2__`
- `__r2_table_cell_3_1__`
- `__r2_table_cell_3_2__`
- `__r2_table_col_1__`
- `__r2_table_col_2__`
- `__r2_table_col_3__`
- `__r2_table_row_1__`
- `__r2_table_row_2__`
- `__r2_table_row_3__`
- `__r2_text_1__`
- `__r2_text_2__`
- `__r2_text_3__`
- `__r2_title__`
- `__r3_checked__`
- `__r3_cover_alt__`
- `__r3_cover_caption__`
- `__r3_day__`
- `__r3_desc__`
- `__r3_end_text__`
- `__r3_end_title__`
- `__r3_faq_a1__`
- `__r3_faq_a2__`
- `__r3_faq_a3__`
- `__r3_faq_a4__`
- `__r3_faq_q1__`
- `__r3_faq_q2__`
- `__r3_faq_q3__`
- `__r3_faq_q4__`
- `__r3_h2_1__`
- `__r3_h2_2__`
- `__r3_h2_3__`
- `__r3_h2_4__`
- `__r3_h2_5__`
- `__r3_intro__`
- `__r3_m_label_1__`
- `__r3_m_label_2__`
- `__r3_m_label__`
- `__r3_m_text_1__`
- `__r3_m_text_2__`
- `__r3_m_text__`
- `__r3_modified__`
- `__r3_month_year__`
- `__r3_published__`
- `__r3_quote__`
- `__r3_quote_attribution__`
- `__r3_rss_date__`
- `__r3_source_label_1__`
- `__r3_source_label_2__`
- `__r3_source_note_1__`
- `__r3_source_note_2__`
- `__r3_source_url_1__`
- `__r3_source_url_2__`
- `__r3_status__`
- `__r3_summary__`
- `__r3_table_caption__`
- `__r3_table_cell_1_1__`
- `__r3_table_cell_1_2__`
- `__r3_table_cell_2_1__`
- `__r3_table_cell_2_2__`
- `__r3_table_cell_3_1__`
- `__r3_table_cell_3_2__`
- `__r3_table_col_1__`
- `__r3_table_col_2__`
- `__r3_table_col_3__`
- `__r3_table_row_1__`
- `__r3_table_row_2__`
- `__r3_table_row_3__`
- `__r3_text_1__`
- `__r3_text_2__`
- `__r3_text_3__`
- `__r3_text_4__`
- `__r3_text_5__`
- `__r3_title__`
- `__r4_checked__`
- `__r4_cover_alt__`
- `__r4_cover_caption__`
- `__r4_day__`
- `__r4_desc__`
- `__r4_end_text__`
- `__r4_end_title__`
- `__r4_faq_a1__`
- `__r4_faq_a2__`
- `__r4_faq_a3__`
- `__r4_faq_q1__`
- `__r4_faq_q2__`
- `__r4_faq_q3__`
- `__r4_h2_1__`
- `__r4_h2_2__`
- `__r4_h2_3__`
- `__r4_h2_4__`
- `__r4_intro__`
- `__r4_m_label_1__`
- `__r4_m_label_2__`
- `__r4_m_text_1__`
- `__r4_m_text_2__`
- `__r4_modified__`
- `__r4_month_year__`
- `__r4_published__`
- `__r4_quote__`
- `__r4_quote_attribution__`
- `__r4_source_label_1__`
- `__r4_source_label_2__`
- `__r4_source_note_1__`
- `__r4_source_note_2__`
- `__r4_source_url_1__`
- `__r4_source_url_2__`
- `__r4_status__`
- `__r4_summary__`
- `__r4_table_caption__`
- `__r4_table_cell_1_1__`
- `__r4_table_cell_1_2__`
- `__r4_table_cell_2_1__`
- `__r4_table_cell_2_2__`
- `__r4_table_cell_3_1__`
- `__r4_table_cell_3_2__`
- `__r4_table_col_1__`
- `__r4_table_col_2__`
- `__r4_table_col_3__`
- `__r4_table_row_1__`
- `__r4_table_row_2__`
- `__r4_table_row_3__`
- `__r4_text_1__`
- `__r4_text_2__`
- `__r4_text_3__`
- `__r4_text_4__`
- `__r4_title__`
- `__r5_checked__`
- `__r5_cover_alt__`
- `__r5_cover_caption__`
- `__r5_day__`
- `__r5_desc__`
- `__r5_end_text__`
- `__r5_end_title__`
- `__r5_faq_a1__`
- `__r5_faq_a2__`
- `__r5_faq_q1__`
- `__r5_faq_q2__`
- `__r5_h2_1__`
- `__r5_h2_2__`
- `__r5_h2_3__`
- `__r5_intro__`
- `__r5_m_date__`
- `__r5_m_label__`
- `__r5_m_text__`
- `__r5_modified__`
- `__r5_month_year__`
- `__r5_published__`
- `__r5_quote__`
- `__r5_quote_attribution__`
- `__r5_rss_date__`
- `__r5_source_label_1__`
- `__r5_source_label_2__`
- `__r5_source_note_1__`
- `__r5_source_note_2__`
- `__r5_source_url_1__`
- `__r5_source_url_2__`
- `__r5_status__`
- `__r5_summary__`
- `__r5_table_caption__`
- `__r5_table_cell_1_1__`
- `__r5_table_cell_1_2__`
- `__r5_table_cell_2_1__`
- `__r5_table_cell_2_2__`
- `__r5_table_cell_3_1__`
- `__r5_table_cell_3_2__`
- `__r5_table_col_1__`
- `__r5_table_col_2__`
- `__r5_table_col_3__`
- `__r5_table_row_1__`
- `__r5_table_row_2__`
- `__r5_table_row_3__`
- `__r5_text_1__`
- `__r5_text_2__`
- `__r5_text_3__`
- `__r5_title__`
- `__r6_checked__`
- `__r6_cover_alt__`
- `__r6_cover_caption__`
- `__r6_day__`
- `__r6_desc__`
- `__r6_end_text__`
- `__r6_end_title__`
- `__r6_faq_a1__`
- `__r6_faq_a2__`
- `__r6_faq_a3__`
- `__r6_faq_a4__`
- `__r6_faq_q1__`
- `__r6_faq_q2__`
- `__r6_faq_q3__`
- `__r6_faq_q4__`
- `__r6_h2_1__`
- `__r6_h2_2__`
- `__r6_h2_3__`
- `__r6_h2_4__`
- `__r6_h2_5__`
- `__r6_intro__`
- `__r6_m_label_1__`
- `__r6_m_label_2__`
- `__r6_m_label_3__`
- `__r6_m_label_4__`
- `__r6_m_label_5__`
- `__r6_m_label_6__`
- `__r6_m_text_1__`
- `__r6_m_text_2__`
- `__r6_m_text_3__`
- `__r6_m_text_4__`
- `__r6_m_text_5__`
- `__r6_m_text_6__`
- `__r6_modified__`
- `__r6_month_year__`
- `__r6_published__`
- `__r6_quote__`
- `__r6_quote_attribution__`
- `__r6_rss_date__`
- `__r6_source_label_1__`
- `__r6_source_label_2__`
- `__r6_source_note_1__`
- `__r6_source_note_2__`
- `__r6_source_url_1__`
- `__r6_source_url_2__`
- `__r6_status__`
- `__r6_summary__`
- `__r6_table_caption__`
- `__r6_table_cell_1_1__`
- `__r6_table_cell_1_2__`
- `__r6_table_cell_2_1__`
- `__r6_table_cell_2_2__`
- `__r6_table_cell_3_1__`
- `__r6_table_cell_3_2__`
- `__r6_table_col_1__`
- `__r6_table_col_2__`
- `__r6_table_col_3__`
- `__r6_table_row_1__`
- `__r6_table_row_2__`
- `__r6_table_row_3__`
- `__r6_text_1__`
- `__r6_text_2__`
- `__r6_text_3__`
- `__r6_text_4__`
- `__r6_text_5__`
- `__r6_title__`
- `__r7_checked__`
- `__r7_cover_alt__`
- `__r7_cover_caption__`
- `__r7_day__`
- `__r7_desc__`
- `__r7_end_text__`
- `__r7_end_title__`
- `__r7_faq_a1__`
- `__r7_faq_a2__`
- `__r7_faq_a3__`
- `__r7_faq_q1__`
- `__r7_faq_q2__`
- `__r7_faq_q3__`
- `__r7_h2_1__`
- `__r7_h2_2__`
- `__r7_h2_3__`
- `__r7_h2_4__`
- `__r7_intro__`
- `__r7_m_label_1__`
- `__r7_m_label_2__`
- `__r7_m_label__`
- `__r7_m_text_1__`
- `__r7_m_text_2__`
- `__r7_m_text__`
- `__r7_modified__`
- `__r7_month_year__`
- `__r7_published__`
- `__r7_quote__`
- `__r7_quote_attribution__`
- `__r7_rss_date__`
- `__r7_source_label_1__`
- `__r7_source_label_2__`
- `__r7_source_note_1__`
- `__r7_source_note_2__`
- `__r7_source_url_1__`
- `__r7_source_url_2__`
- `__r7_status__`
- `__r7_summary__`
- `__r7_table_caption__`
- `__r7_table_cell_1_1__`
- `__r7_table_cell_1_2__`
- `__r7_table_cell_2_1__`
- `__r7_table_cell_2_2__`
- `__r7_table_cell_3_1__`
- `__r7_table_cell_3_2__`
- `__r7_table_col_1__`
- `__r7_table_col_2__`
- `__r7_table_col_3__`
- `__r7_table_row_1__`
- `__r7_table_row_2__`
- `__r7_table_row_3__`
- `__r7_text_1__`
- `__r7_text_2__`
- `__r7_text_3__`
- `__r7_text_4__`
- `__r7_title__`
- `__r8_checked__`
- `__r8_cover_alt__`
- `__r8_cover_caption__`
- `__r8_day__`
- `__r8_desc__`
- `__r8_end_text__`
- `__r8_end_title__`
- `__r8_faq_a1__`
- `__r8_faq_a2__`
- `__r8_faq_q1__`
- `__r8_faq_q2__`
- `__r8_h2_1__`
- `__r8_h2_2__`
- `__r8_h2_3__`
- `__r8_intro__`
- `__r8_m_label_1__`
- `__r8_m_label_2__`
- `__r8_m_label_3__`
- `__r8_m_label_4__`
- `__r8_m_label__`
- `__r8_m_text_1__`
- `__r8_m_text_2__`
- `__r8_m_text_3__`
- `__r8_m_text_4__`
- `__r8_modified__`
- `__r8_month_year__`
- `__r8_published__`
- `__r8_quote__`
- `__r8_quote_attribution__`
- `__r8_rss_date__`
- `__r8_source_label_1__`
- `__r8_source_label_2__`
- `__r8_source_note_1__`
- `__r8_source_note_2__`
- `__r8_source_url_1__`
- `__r8_source_url_2__`
- `__r8_status__`
- `__r8_summary__`
- `__r8_table_caption__`
- `__r8_table_cell_1_1__`
- `__r8_table_cell_1_2__`
- `__r8_table_cell_2_1__`
- `__r8_table_cell_2_2__`
- `__r8_table_cell_3_1__`
- `__r8_table_cell_3_2__`
- `__r8_table_col_1__`
- `__r8_table_col_2__`
- `__r8_table_col_3__`
- `__r8_table_row_1__`
- `__r8_table_row_2__`
- `__r8_table_row_3__`
- `__r8_text_1__`
- `__r8_text_2__`
- `__r8_text_3__`
- `__r8_title__`
- `__r9_checked__`
- `__r9_cover_alt__`
- `__r9_cover_caption__`
- `__r9_day__`
- `__r9_desc__`
- `__r9_end_text__`
- `__r9_end_title__`
- `__r9_faq_a1__`
- `__r9_faq_a2__`
- `__r9_faq_a3__`
- `__r9_faq_a4__`
- `__r9_faq_q1__`
- `__r9_faq_q2__`
- `__r9_faq_q3__`
- `__r9_faq_q4__`
- `__r9_h2_1__`
- `__r9_h2_2__`
- `__r9_h2_3__`
- `__r9_h2_4__`
- `__r9_h2_5__`
- `__r9_intro__`
- `__r9_m_label_1__`
- `__r9_m_label_2__`
- `__r9_m_label_3__`
- `__r9_m_text_1__`
- `__r9_m_text_2__`
- `__r9_m_text_3__`
- `__r9_modified__`
- `__r9_month_year__`
- `__r9_published__`
- `__r9_quote__`
- `__r9_quote_attribution__`
- `__r9_rss_date__`
- `__r9_source_label_1__`
- `__r9_source_label_2__`
- `__r9_source_note_1__`
- `__r9_source_note_2__`
- `__r9_source_url_1__`
- `__r9_source_url_2__`
- `__r9_status__`
- `__r9_summary__`
- `__r9_table_caption__`
- `__r9_table_cell_1_1__`
- `__r9_table_cell_1_2__`
- `__r9_table_cell_2_1__`
- `__r9_table_cell_2_2__`
- `__r9_table_cell_3_1__`
- `__r9_table_cell_3_2__`
- `__r9_table_col_1__`
- `__r9_table_col_2__`
- `__r9_table_col_3__`
- `__r9_table_row_1__`
- `__r9_table_row_2__`
- `__r9_table_row_3__`
- `__r9_text_1__`
- `__r9_text_2__`
- `__r9_text_3__`
- `__r9_text_4__`
- `__r9_text_5__`
- `__r9_title__`
- `__rail_note__`
- `__register_desc__`
- `__register_intro__`
- `__register_title__`
- `__risk_note__`
- `__security_email__`
- `__security_expires__`
- `__seo_title__`
- `__site_desc__`
- `__site_domain__`
- `__site_name__`
- `__site_tagline__`

## 验收记录

2026-09-04 · workflow-ready v2 完整框架验收通过，仅代表模板 UI 与功能就绪。

- 84 个文件、34 个 HTML（30 个可索引页、独立 404、3 个 noindex 兼容入口）；三项静态审计通过，P0/P1/P2 均为 0。
- 保留原 css/line.css 的全部字节与首页原有 14 个类名；保留固定导轨、石墨网格、日期登记线和朱红刻度。首页、三种图纸开场、十二种制图组件、三档各四篇、七页站务和五工具均已搭建。
- 1440/768/390/360px × 明暗主题 × 34 页，共 272 次最终渲染；475 项功能、算法与边界检查，零失败、零控制台与网络错误。浏览器脚本：`tools/qa/058-graphite-line-browser.js`；本地证据：`artifacts/qa/058-graphite-line-v2-2026-09-04/`。
- 固定时差覆盖闰日、真实日期、分钟偏移、跨两日与输入边界输出到 1999/2100 年；修订号覆盖六段十二位、尾零归一与 60 行上限；时段覆盖接邻、三重重叠、全天、30 行上限，以逐分钟计数独立复验并集、峰值及配对数。
- 编辑距离覆盖空文本、码点/组合重音/ZWJ、原样空白、CRLF、240 码点、HTML 字面量、等价路径优先级，并用滚动行对照和操作回放验证最小次数。最短路径覆盖零成本环、不可达、同距稳定选择、20 节点/60 边、19000000 最大简单路径成本，并用 Floyd-Warshall 与实际边成本独立复验。
- 首页首屏真复制、明暗主题持久化、菜单焦点与 Escape、双目录筛选、原生页签、唯一推广 UI 槽位及邻近披露、404 三态与深层真实 404、无 JS 阅读/导航/页签及禁用提交、原生粘贴与 Enter/Tab、复制拒绝与异步旧结果失效、reduced-motion、阅读进度、明暗原生控件配色通过。
- 人工复核首页、目录、三种开场、十二组件、五工具输入与输出、移动表格、封面与夜间错误。改善标题均衡换行后完整重验。首轮颜色检查错取页面底色而非日期徽标实际圆点背景，修正检测取色后重跑；未把该轮两项误报记录为通过。
- 785 个文字/变量槽位已登记，34 块 JSON-LD 可解析，106 个页内锚点有效，12 张 PNG 封面内容互异；所有本地发布资源存在，敏感信息扫描通过。
- 与相邻 057 的类名重合 2.1%、DOM 标签二元组 31.0%、CSS 属性序列 35.0%；全库类名最高 9.1%，只有历史两组 CSS 参考警告。这些是差异检查指标，不是不可识别的保证。
- 原始动态源包忠实度未核验，单独记录而不冒充复刻证明。填入真实内容后仍须执行单站事实、合规与发布审计；本套不代写业务文章或注册教程，未触发 CI、未部署。
