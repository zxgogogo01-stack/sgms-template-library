# 077 Fir Index · 工作流 v2 接入契约

## 范围与风格

只制作完整网站模板，不写业务文章或注册教程，不部署。原 field-station.css 字节保留，新 field-extension.css 补齐林地观察簿、四块交叉样地、十二种文章组件、五工具、公开说明和响应式。保留原首页全部 fr77 类名、冷杉年轮、等高线与林地站结构。动态源包未取得，原包忠实度未核验；不得把 UI 验收当作保真证明。

35 个 HTML：31 可索引页、404、3 个 noindex 手动兼容入口。registrationGuide 只是兼容字段名，指通用交接营地组件页，不指定教程。

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "field-journal.html",
  "articles": [
    "trails/source-transect.html",
    "trails/date-rings.html",
    "trails/context-boundary.html",
    "trails/trigger-canopy.html",
    "trails/conflict-clearing.html",
    "trails/evidence-cairn.html",
    "trails/revision-track.html",
    "trails/version-bark.html",
    "trails/mobile-path.html",
    "trails/access-shelter.html",
    "trails/correction-route.html",
    "trails/handoff-camp.html"
  ],
  "cornerstones": [
    "trails/source-transect.html",
    "trails/date-rings.html"
  ],
  "registrationGuide": "trails/handoff-camp.html",
  "articleCovers": {
    "trails/source-transect.html": {
      "display": "assets/trails/source-transect.webp",
      "og": "assets/trails/source-transect.png"
    },
    "trails/date-rings.html": {
      "display": "assets/trails/date-rings.webp",
      "og": "assets/trails/date-rings.png"
    },
    "trails/context-boundary.html": {
      "display": "assets/trails/context-boundary.webp",
      "og": "assets/trails/context-boundary.png"
    },
    "trails/trigger-canopy.html": {
      "display": "assets/trails/trigger-canopy.webp",
      "og": "assets/trails/trigger-canopy.png"
    },
    "trails/conflict-clearing.html": {
      "display": "assets/trails/conflict-clearing.webp",
      "og": "assets/trails/conflict-clearing.png"
    },
    "trails/evidence-cairn.html": {
      "display": "assets/trails/evidence-cairn.webp",
      "og": "assets/trails/evidence-cairn.png"
    },
    "trails/revision-track.html": {
      "display": "assets/trails/revision-track.webp",
      "og": "assets/trails/revision-track.png"
    },
    "trails/version-bark.html": {
      "display": "assets/trails/version-bark.webp",
      "og": "assets/trails/version-bark.png"
    },
    "trails/mobile-path.html": {
      "display": "assets/trails/mobile-path.webp",
      "og": "assets/trails/mobile-path.png"
    },
    "trails/access-shelter.html": {
      "display": "assets/trails/access-shelter.webp",
      "og": "assets/trails/access-shelter.png"
    },
    "trails/correction-route.html": {
      "display": "assets/trails/correction-route.webp",
      "og": "assets/trails/correction-route.png"
    },
    "trails/handoff-camp.html": {
      "display": "assets/trails/handoff-camp.webp",
      "og": "assets/trails/handoff-camp.png"
    }
  },
  "categories": [
    {
      "path": "plots/source-grove.html",
      "label": "来源林",
      "articles": [
        "trails/source-transect.html",
        "trails/conflict-clearing.html",
        "trails/mobile-path.html"
      ]
    },
    {
      "path": "plots/revision-ridge.html",
      "label": "修订脊",
      "articles": [
        "trails/date-rings.html",
        "trails/evidence-cairn.html",
        "trails/access-shelter.html"
      ]
    },
    {
      "path": "plots/context-marsh.html",
      "label": "语境沼",
      "articles": [
        "trails/context-boundary.html",
        "trails/revision-track.html",
        "trails/correction-route.html"
      ]
    },
    {
      "path": "plots/handoff-lookout.html",
      "label": "交接望台",
      "articles": [
        "trails/trigger-canopy.html",
        "trails/version-bark.html",
        "trails/handoff-camp.html"
      ]
    }
  ],
  "toolIndex": "tool-shed.html",
  "tools": [
    "tools/due-route-planner.html",
    "tools/status-trail-triage.html",
    "tools/trigger-matcher.html",
    "tools/review-pack-builder.html",
    "tools/coverage-window-joiner.html"
  ],
  "legal": {
    "about": "station-office.html",
    "contact": "correction-desk.html",
    "disclosure": "relation-marker.html",
    "disclaimer": "scope-boundary.html",
    "privacy": "data-practice.html",
    "corrections": "change-log.html",
    "editorial": "editorial-standards.html"
  },
  "error404": "404.html",
  "robots": "robots.txt",
  "sitemap": "sitemap.xml",
  "feed": "feed.xml",
  "security": ".well-known/security.txt",
  "favicon": "favicon.ico",
  "appleTouchIcon": "apple-touch-icon.png",
  "socialImage": "assets/field-cover.png",
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

- 只填经核实的正文和变量，不再补 UI、目录、资源、工具或移动端样式；保留页面角色、锚点、表单、data 属性和 ARIA。
- 首页只有邀请码复制、弹性利益点与脚注，没有推广直链。handoff-camp.html 恰留一处静态推广槽；保留 target、rel 四值和紧邻披露。
- 抽象林地、年轮和路线图不是证据、真实地点或监测结果。QA 示例文字不能作为业务文章发布。

## 变量格式与容量

BRAND_EN 为 3–24 个英文或罗马字；首页标题 8–20 个中文字，说明 35–65 字；邀请码 4–28 ASCII 字符；利益脚注 16–45 字。文章摘要 40–100 字，正文槽 100–800 字。

SITE_DOMAIN 为纯域名；AFFILIATE_URL 与 SOURCE_URL 为核实的绝对 HTTPS URL；邮箱纯地址；LANG 为真实 BCP47；日期使用页面声明格式。按 HTML 文本、属性、XML 和 JSON-LD 上下文分别转义，不能未转义全局替换。

## 五个本地工具

1. 复查到期路线板：项目、上次核对日、1–3650 天间隔和 1–5 影响；按到期状态、加权逾期与原序输出 1–100 项。
2. 状态路标分流器：路径、2xx/3xx/4xx/5xx 和 0–1,000,000 入链数；按故障级别、入链与原序输出全部。
3. 变更触发匹配器：项目与小写 ASCII 标记，和当前事件标记求交并输出全部匹配。
4. 复查背包分批器：任务、分钟、区域与每日 30–480 分钟上限；稳定顺序逐日装包，输出全部任务。
5. 覆盖窗口拼接器：按主题合并相邻或重叠公历日期窗口，输出覆盖段和段间空档。

所有工具先检查原值长度、控制字符和不完整 Unicode，再做 NFKC；错误聚焦并关联 aria-errormessage。输入变化立即让旧报告和复制失效。

## 全部变量

- %%ABOUT_TEXT_1%%
- %%ABOUT_TEXT_2%%
- %%ABOUT_TEXT_3%%
- %%ABOUT_TEXT_4%%
- %%ABOUT_TEXT_5%%
- %%ABOUT_TITLE_1%%
- %%ABOUT_TITLE_2%%
- %%ABOUT_TITLE_3%%
- %%ABOUT_TITLE_4%%
- %%ABOUT_TITLE_5%%
- %%AFFILIATE_URL%%
- %%AUTHOR_NAME%%
- %%BENEFIT_DISCLAIMER%%
- %%BENEFIT_RATE%%
- %%BRAND_EN%%
- %%CATALOG_DESC%%
- %%CATALOG_INTRO%%
- %%CATALOG_TITLE%%
- %%CHECK_1%%
- %%CHECK_2%%
- %%CHECK_3%%
- %%CHECK_4%%
- %%CONTACT_EMAIL%%
- %%CONTACT_NOTE%%
- %%CONTACT_TEXT_1%%
- %%CONTACT_TEXT_2%%
- %%CONTACT_TEXT_3%%
- %%CONTACT_TEXT_4%%
- %%CONTACT_TEXT_5%%
- %%CONTACT_TITLE%%
- %%CONTACT_TITLE_1%%
- %%CONTACT_TITLE_2%%
- %%CONTACT_TITLE_3%%
- %%CONTACT_TITLE_4%%
- %%CONTACT_TITLE_5%%
- %%CORRECTIONS_TEXT_1%%
- %%CORRECTIONS_TEXT_2%%
- %%CORRECTIONS_TEXT_3%%
- %%CORRECTIONS_TEXT_4%%
- %%CORRECTIONS_TEXT_5%%
- %%CORRECTIONS_TITLE_1%%
- %%CORRECTIONS_TITLE_2%%
- %%CORRECTIONS_TITLE_3%%
- %%CORRECTIONS_TITLE_4%%
- %%CORRECTIONS_TITLE_5%%
- %%CURRENT_YEAR%%
- %%DISCLAIMER_TEXT_1%%
- %%DISCLAIMER_TEXT_2%%
- %%DISCLAIMER_TEXT_3%%
- %%DISCLAIMER_TEXT_4%%
- %%DISCLAIMER_TEXT_5%%
- %%DISCLAIMER_TITLE_1%%
- %%DISCLAIMER_TITLE_2%%
- %%DISCLAIMER_TITLE_3%%
- %%DISCLAIMER_TITLE_4%%
- %%DISCLAIMER_TITLE_5%%
- %%DISCLOSURE_TEXT_1%%
- %%DISCLOSURE_TEXT_2%%
- %%DISCLOSURE_TEXT_3%%
- %%DISCLOSURE_TEXT_4%%
- %%DISCLOSURE_TEXT_5%%
- %%DISCLOSURE_TITLE_1%%
- %%DISCLOSURE_TITLE_2%%
- %%DISCLOSURE_TITLE_3%%
- %%DISCLOSURE_TITLE_4%%
- %%DISCLOSURE_TITLE_5%%
- %%EDITORIAL_TEXT_1%%
- %%EDITORIAL_TEXT_2%%
- %%EDITORIAL_TEXT_3%%
- %%EDITORIAL_TEXT_4%%
- %%EDITORIAL_TEXT_5%%
- %%EDITORIAL_TITLE_1%%
- %%EDITORIAL_TITLE_2%%
- %%EDITORIAL_TITLE_3%%
- %%EDITORIAL_TITLE_4%%
- %%EDITORIAL_TITLE_5%%
- %%FOOTER_NOTE%%
- %%HERO_DESCRIPTION%%
- %%HERO_NOTE%%
- %%HERO_TITLE%%
- %%INDEPENDENCE_NOTE%%
- %%INVITE_CODE%%
- %%INVITE_LABEL%%
- %%LANG%%
- %%P01_AUTHOR_NOTE%%
- %%P01_BODY_1_A%%
- %%P01_BODY_1_B%%
- %%P01_BODY_2_A%%
- %%P01_BODY_2_B%%
- %%P01_BODY_3_A%%
- %%P01_BODY_3_B%%
- %%P01_BODY_4_A%%
- %%P01_BODY_4_B%%
- %%P01_CARD_NOTE%%
- %%P01_CONCLUSION%%
- %%P01_COVER_ALT%%
- %%P01_COVER_CAPTION%%
- %%P01_EYEBROW%%
- %%P01_FAQ_A_1%%
- %%P01_FAQ_A_2%%
- %%P01_FAQ_Q_1%%
- %%P01_FAQ_Q_2%%
- %%P01_FAQ_TITLE%%
- %%P01_H2_1%%
- %%P01_H2_2%%
- %%P01_H2_3%%
- %%P01_H2_4%%
- %%P01_MODIFIED%%
- %%P01_MODULE_1%%
- %%P01_MODULE_10%%
- %%P01_MODULE_11%%
- %%P01_MODULE_2%%
- %%P01_MODULE_3%%
- %%P01_MODULE_4%%
- %%P01_MODULE_5%%
- %%P01_MODULE_6%%
- %%P01_MODULE_7%%
- %%P01_MODULE_8%%
- %%P01_MODULE_9%%
- %%P01_PUBLISHED%%
- %%P01_READING_NOTE%%
- %%P01_RSS_DATE%%
- %%P01_SECTION_LABEL_1%%
- %%P01_SECTION_LABEL_2%%
- %%P01_SECTION_LABEL_3%%
- %%P01_SECTION_LABEL_4%%
- %%P01_SOURCE_URL_1%%
- %%P01_SOURCE_URL_2%%
- %%P01_SOURCE_URL_3%%
- %%P01_SUMMARY%%
- %%P01_TITLE%%
- %%P02_AUTHOR_NOTE%%
- %%P02_BODY_1_A%%
- %%P02_BODY_1_B%%
- %%P02_BODY_2_A%%
- %%P02_BODY_2_B%%
- %%P02_BODY_3_A%%
- %%P02_BODY_3_B%%
- %%P02_BODY_4_A%%
- %%P02_BODY_4_B%%
- %%P02_CARD_NOTE%%
- %%P02_CONCLUSION%%
- %%P02_COVER_ALT%%
- %%P02_COVER_CAPTION%%
- %%P02_EYEBROW%%
- %%P02_FAQ_A_1%%
- %%P02_FAQ_A_2%%
- %%P02_FAQ_Q_1%%
- %%P02_FAQ_Q_2%%
- %%P02_FAQ_TITLE%%
- %%P02_H2_1%%
- %%P02_H2_2%%
- %%P02_H2_3%%
- %%P02_H2_4%%
- %%P02_MODIFIED%%
- %%P02_MODULE_1%%
- %%P02_MODULE_2%%
- %%P02_MODULE_3%%
- %%P02_MODULE_4%%
- %%P02_MODULE_5%%
- %%P02_MODULE_6%%
- %%P02_PUBLISHED%%
- %%P02_READING_NOTE%%
- %%P02_RSS_DATE%%
- %%P02_SECTION_LABEL_1%%
- %%P02_SECTION_LABEL_2%%
- %%P02_SECTION_LABEL_3%%
- %%P02_SECTION_LABEL_4%%
- %%P02_SUMMARY%%
- %%P02_TITLE%%
- %%P03_AUTHOR_NOTE%%
- %%P03_BODY_1_A%%
- %%P03_BODY_1_B%%
- %%P03_BODY_2_A%%
- %%P03_BODY_2_B%%
- %%P03_BODY_3_A%%
- %%P03_BODY_3_B%%
- %%P03_BODY_4_A%%
- %%P03_BODY_4_B%%
- %%P03_CARD_NOTE%%
- %%P03_CONCLUSION%%
- %%P03_COVER_ALT%%
- %%P03_COVER_CAPTION%%
- %%P03_EYEBROW%%
- %%P03_FAQ_A_1%%
- %%P03_FAQ_A_2%%
- %%P03_FAQ_Q_1%%
- %%P03_FAQ_Q_2%%
- %%P03_FAQ_TITLE%%
- %%P03_H2_1%%
- %%P03_H2_2%%
- %%P03_H2_3%%
- %%P03_H2_4%%
- %%P03_MODIFIED%%
- %%P03_MODULE_1%%
- %%P03_MODULE_2%%
- %%P03_MODULE_3%%
- %%P03_MODULE_4%%
- %%P03_MODULE_5%%
- %%P03_MODULE_6%%
- %%P03_MODULE_7%%
- %%P03_PUBLISHED%%
- %%P03_READING_NOTE%%
- %%P03_RSS_DATE%%
- %%P03_SECTION_LABEL_1%%
- %%P03_SECTION_LABEL_2%%
- %%P03_SECTION_LABEL_3%%
- %%P03_SECTION_LABEL_4%%
- %%P03_SUMMARY%%
- %%P03_TITLE%%
- %%P04_AUTHOR_NOTE%%
- %%P04_BODY_1_A%%
- %%P04_BODY_1_B%%
- %%P04_BODY_2_A%%
- %%P04_BODY_2_B%%
- %%P04_BODY_3_A%%
- %%P04_BODY_3_B%%
- %%P04_BODY_4_A%%
- %%P04_BODY_4_B%%
- %%P04_CARD_NOTE%%
- %%P04_CONCLUSION%%
- %%P04_COVER_ALT%%
- %%P04_COVER_CAPTION%%
- %%P04_EYEBROW%%
- %%P04_FAQ_A_1%%
- %%P04_FAQ_A_2%%
- %%P04_FAQ_Q_1%%
- %%P04_FAQ_Q_2%%
- %%P04_FAQ_TITLE%%
- %%P04_H2_1%%
- %%P04_H2_2%%
- %%P04_H2_3%%
- %%P04_H2_4%%
- %%P04_MODIFIED%%
- %%P04_MODULE_1%%
- %%P04_MODULE_2%%
- %%P04_MODULE_3%%
- %%P04_MODULE_4%%
- %%P04_MODULE_5%%
- %%P04_MODULE_6%%
- %%P04_PUBLISHED%%
- %%P04_READING_NOTE%%
- %%P04_RSS_DATE%%
- %%P04_SECTION_LABEL_1%%
- %%P04_SECTION_LABEL_2%%
- %%P04_SECTION_LABEL_3%%
- %%P04_SECTION_LABEL_4%%
- %%P04_SUMMARY%%
- %%P04_TITLE%%
- %%P05_AUTHOR_NOTE%%
- %%P05_BODY_1_A%%
- %%P05_BODY_1_B%%
- %%P05_BODY_2_A%%
- %%P05_BODY_2_B%%
- %%P05_BODY_3_A%%
- %%P05_BODY_3_B%%
- %%P05_BODY_4_A%%
- %%P05_BODY_4_B%%
- %%P05_CARD_NOTE%%
- %%P05_CONCLUSION%%
- %%P05_COVER_ALT%%
- %%P05_COVER_CAPTION%%
- %%P05_EYEBROW%%
- %%P05_FAQ_A_1%%
- %%P05_FAQ_A_2%%
- %%P05_FAQ_Q_1%%
- %%P05_FAQ_Q_2%%
- %%P05_FAQ_TITLE%%
- %%P05_H2_1%%
- %%P05_H2_2%%
- %%P05_H2_3%%
- %%P05_H2_4%%
- %%P05_MODIFIED%%
- %%P05_MODULE_1%%
- %%P05_MODULE_2%%
- %%P05_MODULE_3%%
- %%P05_MODULE_4%%
- %%P05_MODULE_5%%
- %%P05_MODULE_6%%
- %%P05_MODULE_7%%
- %%P05_PUBLISHED%%
- %%P05_READING_NOTE%%
- %%P05_RSS_DATE%%
- %%P05_SECTION_LABEL_1%%
- %%P05_SECTION_LABEL_2%%
- %%P05_SECTION_LABEL_3%%
- %%P05_SECTION_LABEL_4%%
- %%P05_SUMMARY%%
- %%P05_TITLE%%
- %%P06_AUTHOR_NOTE%%
- %%P06_BODY_1_A%%
- %%P06_BODY_1_B%%
- %%P06_BODY_2_A%%
- %%P06_BODY_2_B%%
- %%P06_BODY_3_A%%
- %%P06_BODY_3_B%%
- %%P06_BODY_4_A%%
- %%P06_BODY_4_B%%
- %%P06_CARD_NOTE%%
- %%P06_CONCLUSION%%
- %%P06_COVER_ALT%%
- %%P06_COVER_CAPTION%%
- %%P06_EYEBROW%%
- %%P06_FAQ_A_1%%
- %%P06_FAQ_A_2%%
- %%P06_FAQ_Q_1%%
- %%P06_FAQ_Q_2%%
- %%P06_FAQ_TITLE%%
- %%P06_H2_1%%
- %%P06_H2_2%%
- %%P06_H2_3%%
- %%P06_H2_4%%
- %%P06_MODIFIED%%
- %%P06_MODULE_1%%
- %%P06_MODULE_2%%
- %%P06_MODULE_3%%
- %%P06_MODULE_4%%
- %%P06_MODULE_5%%
- %%P06_MODULE_6%%
- %%P06_MODULE_7%%
- %%P06_MODULE_8%%
- %%P06_PUBLISHED%%
- %%P06_READING_NOTE%%
- %%P06_RSS_DATE%%
- %%P06_SECTION_LABEL_1%%
- %%P06_SECTION_LABEL_2%%
- %%P06_SECTION_LABEL_3%%
- %%P06_SECTION_LABEL_4%%
- %%P06_SUMMARY%%
- %%P06_TITLE%%
- %%P07_AUTHOR_NOTE%%
- %%P07_BODY_1_A%%
- %%P07_BODY_1_B%%
- %%P07_BODY_2_A%%
- %%P07_BODY_2_B%%
- %%P07_BODY_3_A%%
- %%P07_BODY_3_B%%
- %%P07_BODY_4_A%%
- %%P07_BODY_4_B%%
- %%P07_CARD_NOTE%%
- %%P07_CONCLUSION%%
- %%P07_COVER_ALT%%
- %%P07_COVER_CAPTION%%
- %%P07_DATE_1%%
- %%P07_DATE_2%%
- %%P07_DATE_3%%
- %%P07_DATE_4%%
- %%P07_EYEBROW%%
- %%P07_FAQ_A_1%%
- %%P07_FAQ_A_2%%
- %%P07_FAQ_Q_1%%
- %%P07_FAQ_Q_2%%
- %%P07_FAQ_TITLE%%
- %%P07_H2_1%%
- %%P07_H2_2%%
- %%P07_H2_3%%
- %%P07_H2_4%%
- %%P07_MODIFIED%%
- %%P07_MODULE_1%%
- %%P07_MODULE_2%%
- %%P07_MODULE_3%%
- %%P07_MODULE_4%%
- %%P07_MODULE_5%%
- %%P07_MODULE_6%%
- %%P07_MODULE_7%%
- %%P07_MODULE_8%%
- %%P07_PUBLISHED%%
- %%P07_READING_NOTE%%
- %%P07_RSS_DATE%%
- %%P07_SECTION_LABEL_1%%
- %%P07_SECTION_LABEL_2%%
- %%P07_SECTION_LABEL_3%%
- %%P07_SECTION_LABEL_4%%
- %%P07_SUMMARY%%
- %%P07_TITLE%%
- %%P08_AUTHOR_NOTE%%
- %%P08_BODY_1_A%%
- %%P08_BODY_1_B%%
- %%P08_BODY_2_A%%
- %%P08_BODY_2_B%%
- %%P08_BODY_3_A%%
- %%P08_BODY_3_B%%
- %%P08_BODY_4_A%%
- %%P08_BODY_4_B%%
- %%P08_CARD_NOTE%%
- %%P08_CONCLUSION%%
- %%P08_COVER_ALT%%
- %%P08_COVER_CAPTION%%
- %%P08_EYEBROW%%
- %%P08_FAQ_A_1%%
- %%P08_FAQ_A_2%%
- %%P08_FAQ_Q_1%%
- %%P08_FAQ_Q_2%%
- %%P08_FAQ_TITLE%%
- %%P08_H2_1%%
- %%P08_H2_2%%
- %%P08_H2_3%%
- %%P08_H2_4%%
- %%P08_MODIFIED%%
- %%P08_MODULE_1%%
- %%P08_MODULE_2%%
- %%P08_MODULE_3%%
- %%P08_MODULE_4%%
- %%P08_MODULE_5%%
- %%P08_MODULE_6%%
- %%P08_MODULE_7%%
- %%P08_MODULE_8%%
- %%P08_PUBLISHED%%
- %%P08_READING_NOTE%%
- %%P08_RSS_DATE%%
- %%P08_SECTION_LABEL_1%%
- %%P08_SECTION_LABEL_2%%
- %%P08_SECTION_LABEL_3%%
- %%P08_SECTION_LABEL_4%%
- %%P08_SUMMARY%%
- %%P08_TITLE%%
- %%P09_AUTHOR_NOTE%%
- %%P09_BODY_1_A%%
- %%P09_BODY_1_B%%
- %%P09_BODY_2_A%%
- %%P09_BODY_2_B%%
- %%P09_BODY_3_A%%
- %%P09_BODY_3_B%%
- %%P09_BODY_4_A%%
- %%P09_BODY_4_B%%
- %%P09_CARD_NOTE%%
- %%P09_CONCLUSION%%
- %%P09_COVER_ALT%%
- %%P09_COVER_CAPTION%%
- %%P09_EYEBROW%%
- %%P09_FAQ_A_1%%
- %%P09_FAQ_A_2%%
- %%P09_FAQ_Q_1%%
- %%P09_FAQ_Q_2%%
- %%P09_FAQ_TITLE%%
- %%P09_H2_1%%
- %%P09_H2_2%%
- %%P09_H2_3%%
- %%P09_H2_4%%
- %%P09_MODIFIED%%
- %%P09_MODULE_1%%
- %%P09_MODULE_2%%
- %%P09_MODULE_3%%
- %%P09_MODULE_4%%
- %%P09_MODULE_5%%
- %%P09_MODULE_6%%
- %%P09_MODULE_7%%
- %%P09_PUBLISHED%%
- %%P09_READING_NOTE%%
- %%P09_RSS_DATE%%
- %%P09_SECTION_LABEL_1%%
- %%P09_SECTION_LABEL_2%%
- %%P09_SECTION_LABEL_3%%
- %%P09_SECTION_LABEL_4%%
- %%P09_SUMMARY%%
- %%P09_TITLE%%
- %%P10_AUTHOR_NOTE%%
- %%P10_BODY_1_A%%
- %%P10_BODY_1_B%%
- %%P10_BODY_2_A%%
- %%P10_BODY_2_B%%
- %%P10_BODY_3_A%%
- %%P10_BODY_3_B%%
- %%P10_BODY_4_A%%
- %%P10_BODY_4_B%%
- %%P10_CARD_NOTE%%
- %%P10_CONCLUSION%%
- %%P10_COVER_ALT%%
- %%P10_COVER_CAPTION%%
- %%P10_EYEBROW%%
- %%P10_FAQ_A_1%%
- %%P10_FAQ_A_2%%
- %%P10_FAQ_Q_1%%
- %%P10_FAQ_Q_2%%
- %%P10_FAQ_TITLE%%
- %%P10_H2_1%%
- %%P10_H2_2%%
- %%P10_H2_3%%
- %%P10_H2_4%%
- %%P10_MODIFIED%%
- %%P10_MODULE_1%%
- %%P10_MODULE_10%%
- %%P10_MODULE_11%%
- %%P10_MODULE_12%%
- %%P10_MODULE_2%%
- %%P10_MODULE_3%%
- %%P10_MODULE_4%%
- %%P10_MODULE_5%%
- %%P10_MODULE_6%%
- %%P10_MODULE_7%%
- %%P10_MODULE_8%%
- %%P10_MODULE_9%%
- %%P10_PUBLISHED%%
- %%P10_READING_NOTE%%
- %%P10_RSS_DATE%%
- %%P10_SECTION_LABEL_1%%
- %%P10_SECTION_LABEL_2%%
- %%P10_SECTION_LABEL_3%%
- %%P10_SECTION_LABEL_4%%
- %%P10_SUMMARY%%
- %%P10_TITLE%%
- %%P11_AUTHOR_NOTE%%
- %%P11_BODY_1_A%%
- %%P11_BODY_1_B%%
- %%P11_BODY_2_A%%
- %%P11_BODY_2_B%%
- %%P11_BODY_3_A%%
- %%P11_BODY_3_B%%
- %%P11_BODY_4_A%%
- %%P11_BODY_4_B%%
- %%P11_CARD_NOTE%%
- %%P11_CONCLUSION%%
- %%P11_COVER_ALT%%
- %%P11_COVER_CAPTION%%
- %%P11_EYEBROW%%
- %%P11_FAQ_A_1%%
- %%P11_FAQ_A_2%%
- %%P11_FAQ_Q_1%%
- %%P11_FAQ_Q_2%%
- %%P11_FAQ_TITLE%%
- %%P11_H2_1%%
- %%P11_H2_2%%
- %%P11_H2_3%%
- %%P11_H2_4%%
- %%P11_MODIFIED%%
- %%P11_MODULE_1%%
- %%P11_MODULE_2%%
- %%P11_MODULE_3%%
- %%P11_MODULE_4%%
- %%P11_MODULE_5%%
- %%P11_MODULE_6%%
- %%P11_MODULE_7%%
- %%P11_MODULE_8%%
- %%P11_PUBLISHED%%
- %%P11_READING_NOTE%%
- %%P11_RSS_DATE%%
- %%P11_SECTION_LABEL_1%%
- %%P11_SECTION_LABEL_2%%
- %%P11_SECTION_LABEL_3%%
- %%P11_SECTION_LABEL_4%%
- %%P11_SUMMARY%%
- %%P11_TITLE%%
- %%P12_AUTHOR_NOTE%%
- %%P12_BODY_1_A%%
- %%P12_BODY_1_B%%
- %%P12_BODY_2_A%%
- %%P12_BODY_2_B%%
- %%P12_BODY_3_A%%
- %%P12_BODY_3_B%%
- %%P12_BODY_4_A%%
- %%P12_BODY_4_B%%
- %%P12_CARD_NOTE%%
- %%P12_CONCLUSION%%
- %%P12_COVER_ALT%%
- %%P12_COVER_CAPTION%%
- %%P12_EYEBROW%%
- %%P12_FAQ_A_1%%
- %%P12_FAQ_A_2%%
- %%P12_FAQ_Q_1%%
- %%P12_FAQ_Q_2%%
- %%P12_FAQ_TITLE%%
- %%P12_H2_1%%
- %%P12_H2_2%%
- %%P12_H2_3%%
- %%P12_H2_4%%
- %%P12_MODIFIED%%
- %%P12_MODULE_1%%
- %%P12_MODULE_2%%
- %%P12_PUBLISHED%%
- %%P12_READING_NOTE%%
- %%P12_RSS_DATE%%
- %%P12_SECTION_LABEL_1%%
- %%P12_SECTION_LABEL_2%%
- %%P12_SECTION_LABEL_3%%
- %%P12_SECTION_LABEL_4%%
- %%P12_SUMMARY%%
- %%P12_TITLE%%
- %%PLOTS_TITLE%%
- %%PLOT_1_DESC%%
- %%PLOT_1_INTRO%%
- %%PLOT_1_NOTE%%
- %%PLOT_1_TITLE%%
- %%PLOT_2_DESC%%
- %%PLOT_2_INTRO%%
- %%PLOT_2_NOTE%%
- %%PLOT_2_TITLE%%
- %%PLOT_3_DESC%%
- %%PLOT_3_INTRO%%
- %%PLOT_3_NOTE%%
- %%PLOT_3_TITLE%%
- %%PLOT_4_DESC%%
- %%PLOT_4_INTRO%%
- %%PLOT_4_NOTE%%
- %%PLOT_4_TITLE%%
- %%PRIVACY_TEXT_1%%
- %%PRIVACY_TEXT_2%%
- %%PRIVACY_TEXT_3%%
- %%PRIVACY_TEXT_4%%
- %%PRIVACY_TEXT_5%%
- %%PRIVACY_TITLE_1%%
- %%PRIVACY_TITLE_2%%
- %%PRIVACY_TITLE_3%%
- %%PRIVACY_TITLE_4%%
- %%PRIVACY_TITLE_5%%
- %%RINGS_ALT%%
- %%RISK_NOTE%%
- %%SECURITY_EMAIL%%
- %%SECURITY_EXPIRES%%
- %%SEO_TITLE%%
- %%SITEMAP_LASTMOD%%
- %%SITE_DESC%%
- %%SITE_DOMAIN%%
- %%SITE_NAME%%
- %%SITE_TAGLINE%%
- %%TOOLS_TITLE%%
- %%TOOL_INDEX_DESC%%
- %%TOOL_INDEX_INTRO%%
- %%TOOL_INDEX_TITLE%%