# 079 Navy Nightwatch · 工作流 v2 接入契约

## 范围与风格

只制作完整网站模板，不写业务文章或注册教程，不部署。原 nightwatch.css 字节保留，新 nightwatch-extension.css 补齐四个值守扇区、十二种事件组件、五工具、公开说明与响应式。保留原首页全部 nw79 类名、夜航雷达、航标栏、四频道和事件簿。动态源包未取得，原包忠实度未核验；不得把 UI 验收当作保真证明。

36 个 HTML：32 个可索引页、404、3 个 noindex 手动兼容入口。registrationGuide 只是兼容字段名，指通用交接控制台组件页，不指定教程。

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "observation-log.html",
  "articles": [
    "dispatches/signal-capture-trace.html",
    "dispatches/source-bearing-card.html",
    "dispatches/watch-clock-discipline.html",
    "dispatches/status-lamp-board.html",
    "dispatches/version-delta-screen.html",
    "dispatches/threshold-escalation.html",
    "dispatches/provenance-receiver.html",
    "dispatches/outage-window-map.html",
    "dispatches/verification-constellation.html",
    "dispatches/event-strip-register.html",
    "dispatches/correction-lamp.html",
    "dispatches/shift-handoff-console.html"
  ],
  "cornerstones": [
    "dispatches/signal-capture-trace.html",
    "dispatches/watch-clock-discipline.html"
  ],
  "registrationGuide": "dispatches/shift-handoff-console.html",
  "articleCovers": {
    "dispatches/signal-capture-trace.html": {
      "display": "assets/dispatches/signal-capture-trace.webp",
      "og": "assets/dispatches/signal-capture-trace.png"
    },
    "dispatches/source-bearing-card.html": {
      "display": "assets/dispatches/source-bearing-card.webp",
      "og": "assets/dispatches/source-bearing-card.png"
    },
    "dispatches/watch-clock-discipline.html": {
      "display": "assets/dispatches/watch-clock-discipline.webp",
      "og": "assets/dispatches/watch-clock-discipline.png"
    },
    "dispatches/status-lamp-board.html": {
      "display": "assets/dispatches/status-lamp-board.webp",
      "og": "assets/dispatches/status-lamp-board.png"
    },
    "dispatches/version-delta-screen.html": {
      "display": "assets/dispatches/version-delta-screen.webp",
      "og": "assets/dispatches/version-delta-screen.png"
    },
    "dispatches/threshold-escalation.html": {
      "display": "assets/dispatches/threshold-escalation.webp",
      "og": "assets/dispatches/threshold-escalation.png"
    },
    "dispatches/provenance-receiver.html": {
      "display": "assets/dispatches/provenance-receiver.webp",
      "og": "assets/dispatches/provenance-receiver.png"
    },
    "dispatches/outage-window-map.html": {
      "display": "assets/dispatches/outage-window-map.webp",
      "og": "assets/dispatches/outage-window-map.png"
    },
    "dispatches/verification-constellation.html": {
      "display": "assets/dispatches/verification-constellation.webp",
      "og": "assets/dispatches/verification-constellation.png"
    },
    "dispatches/event-strip-register.html": {
      "display": "assets/dispatches/event-strip-register.webp",
      "og": "assets/dispatches/event-strip-register.png"
    },
    "dispatches/correction-lamp.html": {
      "display": "assets/dispatches/correction-lamp.webp",
      "og": "assets/dispatches/correction-lamp.png"
    },
    "dispatches/shift-handoff-console.html": {
      "display": "assets/dispatches/shift-handoff-console.webp",
      "og": "assets/dispatches/shift-handoff-console.png"
    }
  },
  "categories": [
    {
      "path": "watches/capture-sector.html",
      "label": "捕获扇区",
      "articles": [
        "dispatches/signal-capture-trace.html",
        "dispatches/version-delta-screen.html",
        "dispatches/verification-constellation.html"
      ]
    },
    {
      "path": "watches/identify-sector.html",
      "label": "辨认扇区",
      "articles": [
        "dispatches/source-bearing-card.html",
        "dispatches/threshold-escalation.html",
        "dispatches/event-strip-register.html"
      ]
    },
    {
      "path": "watches/verify-sector.html",
      "label": "复核扇区",
      "articles": [
        "dispatches/watch-clock-discipline.html",
        "dispatches/provenance-receiver.html",
        "dispatches/correction-lamp.html"
      ]
    },
    {
      "path": "watches/handoff-sector.html",
      "label": "交接扇区",
      "articles": [
        "dispatches/status-lamp-board.html",
        "dispatches/outage-window-map.html",
        "dispatches/shift-handoff-console.html"
      ]
    }
  ],
  "toolIndex": "watch-console.html",
  "tools": [
    "tools/utc-continuity-scanner.html",
    "tools/signal-quorum-evaluator.html",
    "tools/watch-window-union.html",
    "tools/version-sequence-watch.html",
    "tools/acknowledgement-sla-clock.html"
  ],
  "legal": {
    "about": "station-charter.html",
    "contact": "contact-beacon.html",
    "corrections": "correction-channel.html",
    "disclosure": "relation-signal.html",
    "disclaimer": "scope-boundary.html",
    "privacy": "local-privacy.html",
    "updates": "watch-changelog.html",
    "editorial": "editorial-watch.html"
  },
  "error404": "404.html",
  "robots": "robots.txt",
  "sitemap": "sitemap.xml",
  "feed": "feed.xml",
  "security": ".well-known/security.txt",
  "favicon": "favicon.ico",
  "appleTouchIcon": "apple-touch-icon.png",
  "socialImage": "assets/nightwatch-cover.png",
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
- 首页只有邀请码复制、弹性利益点与脚注，没有推广直链。shift-handoff-console.html 恰留一处静态推广槽；保留 target、rel 四值和紧邻披露。
- 抽象雷达、信号点与值守灯不是实时数据或事实证据。QA 示例文字不能作为业务文章发布。

## 变量格式与容量

BRAND_EN 为 3–24 个英文或罗马字；首页标题 8–20 个中文字，说明 35–65 字；邀请码 4–28 ASCII 字符；利益脚注 16–45 字。文章摘要 40–100 字，正文槽 100–800 字。

SITE_DOMAIN 为纯域名；AFFILIATE_URL 与 SOURCE_URL 为核实的绝对 HTTPS URL；邮箱纯地址；LANG 为真实 BCP47；日期使用页面声明格式。按 HTML 文本、属性、XML 和 JSON-LD 上下文分别转义，不能未转义全局替换。

## 五个本地工具

1. UTC 连续性扫描器：1–300 条 UTC 事件，保留原序并完整输出倒序、重复和严格超阈值断档。
2. 信号复核人数评估器：1–300 个唯一信号与观察员集合，按 2–5 人门槛输出全部合格与不足项。
3. 值守窗口并集器：1–200 个频道和分钟精度窗口，跨午夜展开并按频道合并重叠或相邻段。
4. 版本序列值守器：1–300 条来源与三段整数版本，按来源保留原序并标出回退、不变和跨级跃迁。
5. 响应时限计时器：1–300 条唯一告警、优先级与真实 UTC 时间，使用整数分钟计算响应和 P1/P2/P3 超时。

所有工具先检查原值长度、控制字符和不完整 Unicode，再做 NFKC；错误聚焦并关联 aria-errormessage。输入变化立即让旧报告和复制失效。

## 全部变量

- %%ABOUT_DESC%%
- %%ABOUT_INTRO%%
- %%ABOUT_NOTE%%
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
- %%CONTACT_DESC%%
- %%CONTACT_EMAIL%%
- %%CONTACT_INTRO%%
- %%CONTACT_NOTE%%
- %%CONTACT_TEXT_1%%
- %%CONTACT_TEXT_2%%
- %%CONTACT_TEXT_3%%
- %%CONTACT_TEXT_4%%
- %%CONTACT_TEXT_5%%
- %%CONTACT_TITLE_1%%
- %%CONTACT_TITLE_2%%
- %%CONTACT_TITLE_3%%
- %%CONTACT_TITLE_4%%
- %%CONTACT_TITLE_5%%
- %%CORRECTIONS_DESC%%
- %%CORRECTIONS_INTRO%%
- %%CORRECTIONS_NOTE%%
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
- %%D01_AUTHOR_NOTE%%
- %%D01_BODY_1_A%%
- %%D01_BODY_1_B%%
- %%D01_BODY_2_A%%
- %%D01_BODY_2_B%%
- %%D01_BODY_3_A%%
- %%D01_BODY_3_B%%
- %%D01_BODY_4_A%%
- %%D01_BODY_4_B%%
- %%D01_CONCLUSION%%
- %%D01_COVER_ALT%%
- %%D01_COVER_CAPTION%%
- %%D01_FAQ_A_1%%
- %%D01_FAQ_A_2%%
- %%D01_FAQ_Q_1%%
- %%D01_FAQ_Q_2%%
- %%D01_FAQ_TITLE%%
- %%D01_H2_1%%
- %%D01_H2_2%%
- %%D01_H2_3%%
- %%D01_H2_4%%
- %%D01_MODIFIED%%
- %%D01_MODULE_ALT%%
- %%D01_MODULE_NOTE%%
- %%D01_PUBLISHED%%
- %%D01_READING_NOTE%%
- %%D01_RSS_DATE%%
- %%D01_SECTION_LABEL_1%%
- %%D01_SECTION_LABEL_2%%
- %%D01_SECTION_LABEL_3%%
- %%D01_SECTION_LABEL_4%%
- %%D01_SOURCE_URL%%
- %%D01_SUMMARY%%
- %%D01_TITLE%%
- %%D02_AUTHOR_NOTE%%
- %%D02_BODY_1_A%%
- %%D02_BODY_1_B%%
- %%D02_BODY_2_A%%
- %%D02_BODY_2_B%%
- %%D02_BODY_3_A%%
- %%D02_BODY_3_B%%
- %%D02_BODY_4_A%%
- %%D02_BODY_4_B%%
- %%D02_CONCLUSION%%
- %%D02_COVER_ALT%%
- %%D02_COVER_CAPTION%%
- %%D02_FAQ_A_1%%
- %%D02_FAQ_A_2%%
- %%D02_FAQ_Q_1%%
- %%D02_FAQ_Q_2%%
- %%D02_FAQ_TITLE%%
- %%D02_H2_1%%
- %%D02_H2_2%%
- %%D02_H2_3%%
- %%D02_H2_4%%
- %%D02_MODIFIED%%
- %%D02_MODULE_1%%
- %%D02_MODULE_2%%
- %%D02_MODULE_3%%
- %%D02_MODULE_4%%
- %%D02_MODULE_5%%
- %%D02_MODULE_6%%
- %%D02_PUBLISHED%%
- %%D02_READING_NOTE%%
- %%D02_RSS_DATE%%
- %%D02_SECTION_LABEL_1%%
- %%D02_SECTION_LABEL_2%%
- %%D02_SECTION_LABEL_3%%
- %%D02_SECTION_LABEL_4%%
- %%D02_SOURCE_URL%%
- %%D02_SUMMARY%%
- %%D02_TITLE%%
- %%D03_AUTHOR_NOTE%%
- %%D03_BODY_1_A%%
- %%D03_BODY_1_B%%
- %%D03_BODY_2_A%%
- %%D03_BODY_2_B%%
- %%D03_BODY_3_A%%
- %%D03_BODY_3_B%%
- %%D03_BODY_4_A%%
- %%D03_BODY_4_B%%
- %%D03_CONCLUSION%%
- %%D03_COVER_ALT%%
- %%D03_COVER_CAPTION%%
- %%D03_FAQ_A_1%%
- %%D03_FAQ_A_2%%
- %%D03_FAQ_Q_1%%
- %%D03_FAQ_Q_2%%
- %%D03_FAQ_TITLE%%
- %%D03_H2_1%%
- %%D03_H2_2%%
- %%D03_H2_3%%
- %%D03_H2_4%%
- %%D03_MODIFIED%%
- %%D03_MODULE_NOTE%%
- %%D03_PUBLISHED%%
- %%D03_READING_NOTE%%
- %%D03_RSS_DATE%%
- %%D03_SECTION_LABEL_1%%
- %%D03_SECTION_LABEL_2%%
- %%D03_SECTION_LABEL_3%%
- %%D03_SECTION_LABEL_4%%
- %%D03_SOURCE_URL%%
- %%D03_SUMMARY%%
- %%D03_TITLE%%
- %%D04_AUTHOR_NOTE%%
- %%D04_BODY_1_A%%
- %%D04_BODY_1_B%%
- %%D04_BODY_2_A%%
- %%D04_BODY_2_B%%
- %%D04_BODY_3_A%%
- %%D04_BODY_3_B%%
- %%D04_BODY_4_A%%
- %%D04_BODY_4_B%%
- %%D04_CONCLUSION%%
- %%D04_COVER_ALT%%
- %%D04_COVER_CAPTION%%
- %%D04_FAQ_A_1%%
- %%D04_FAQ_A_2%%
- %%D04_FAQ_Q_1%%
- %%D04_FAQ_Q_2%%
- %%D04_FAQ_TITLE%%
- %%D04_H2_1%%
- %%D04_H2_2%%
- %%D04_H2_3%%
- %%D04_H2_4%%
- %%D04_MODIFIED%%
- %%D04_MODULE_1%%
- %%D04_MODULE_2%%
- %%D04_MODULE_3%%
- %%D04_MODULE_4%%
- %%D04_MODULE_5%%
- %%D04_MODULE_6%%
- %%D04_MODULE_7%%
- %%D04_MODULE_8%%
- %%D04_PUBLISHED%%
- %%D04_READING_NOTE%%
- %%D04_RSS_DATE%%
- %%D04_SECTION_LABEL_1%%
- %%D04_SECTION_LABEL_2%%
- %%D04_SECTION_LABEL_3%%
- %%D04_SECTION_LABEL_4%%
- %%D04_SOURCE_URL%%
- %%D04_SUMMARY%%
- %%D04_TITLE%%
- %%D05_AUTHOR_NOTE%%
- %%D05_BODY_1_A%%
- %%D05_BODY_1_B%%
- %%D05_BODY_2_A%%
- %%D05_BODY_2_B%%
- %%D05_BODY_3_A%%
- %%D05_BODY_3_B%%
- %%D05_BODY_4_A%%
- %%D05_BODY_4_B%%
- %%D05_CONCLUSION%%
- %%D05_COVER_ALT%%
- %%D05_COVER_CAPTION%%
- %%D05_FAQ_A_1%%
- %%D05_FAQ_A_2%%
- %%D05_FAQ_Q_1%%
- %%D05_FAQ_Q_2%%
- %%D05_FAQ_TITLE%%
- %%D05_H2_1%%
- %%D05_H2_2%%
- %%D05_H2_3%%
- %%D05_H2_4%%
- %%D05_MODIFIED%%
- %%D05_MODULE_1%%
- %%D05_MODULE_2%%
- %%D05_MODULE_3%%
- %%D05_MODULE_4%%
- %%D05_PUBLISHED%%
- %%D05_READING_NOTE%%
- %%D05_RSS_DATE%%
- %%D05_SECTION_LABEL_1%%
- %%D05_SECTION_LABEL_2%%
- %%D05_SECTION_LABEL_3%%
- %%D05_SECTION_LABEL_4%%
- %%D05_SOURCE_URL%%
- %%D05_SUMMARY%%
- %%D05_TITLE%%
- %%D06_AUTHOR_NOTE%%
- %%D06_BODY_1_A%%
- %%D06_BODY_1_B%%
- %%D06_BODY_2_A%%
- %%D06_BODY_2_B%%
- %%D06_BODY_3_A%%
- %%D06_BODY_3_B%%
- %%D06_BODY_4_A%%
- %%D06_BODY_4_B%%
- %%D06_CONCLUSION%%
- %%D06_COVER_ALT%%
- %%D06_COVER_CAPTION%%
- %%D06_FAQ_A_1%%
- %%D06_FAQ_A_2%%
- %%D06_FAQ_Q_1%%
- %%D06_FAQ_Q_2%%
- %%D06_FAQ_TITLE%%
- %%D06_H2_1%%
- %%D06_H2_2%%
- %%D06_H2_3%%
- %%D06_H2_4%%
- %%D06_MODIFIED%%
- %%D06_MODULE_1%%
- %%D06_MODULE_2%%
- %%D06_MODULE_3%%
- %%D06_MODULE_4%%
- %%D06_PUBLISHED%%
- %%D06_READING_NOTE%%
- %%D06_RSS_DATE%%
- %%D06_SECTION_LABEL_1%%
- %%D06_SECTION_LABEL_2%%
- %%D06_SECTION_LABEL_3%%
- %%D06_SECTION_LABEL_4%%
- %%D06_SOURCE_URL%%
- %%D06_SUMMARY%%
- %%D06_TITLE%%
- %%D07_AUTHOR_NOTE%%
- %%D07_BODY_1_A%%
- %%D07_BODY_1_B%%
- %%D07_BODY_2_A%%
- %%D07_BODY_2_B%%
- %%D07_BODY_3_A%%
- %%D07_BODY_3_B%%
- %%D07_BODY_4_A%%
- %%D07_BODY_4_B%%
- %%D07_CONCLUSION%%
- %%D07_COVER_ALT%%
- %%D07_COVER_CAPTION%%
- %%D07_FAQ_A_1%%
- %%D07_FAQ_A_2%%
- %%D07_FAQ_Q_1%%
- %%D07_FAQ_Q_2%%
- %%D07_FAQ_TITLE%%
- %%D07_H2_1%%
- %%D07_H2_2%%
- %%D07_H2_3%%
- %%D07_H2_4%%
- %%D07_MODIFIED%%
- %%D07_MODULE_1%%
- %%D07_MODULE_2%%
- %%D07_MODULE_3%%
- %%D07_PUBLISHED%%
- %%D07_READING_NOTE%%
- %%D07_RSS_DATE%%
- %%D07_SECTION_LABEL_1%%
- %%D07_SECTION_LABEL_2%%
- %%D07_SECTION_LABEL_3%%
- %%D07_SECTION_LABEL_4%%
- %%D07_SOURCE_URL%%
- %%D07_SUMMARY%%
- %%D07_TITLE%%
- %%D08_AUTHOR_NOTE%%
- %%D08_BODY_1_A%%
- %%D08_BODY_1_B%%
- %%D08_BODY_2_A%%
- %%D08_BODY_2_B%%
- %%D08_BODY_3_A%%
- %%D08_BODY_3_B%%
- %%D08_BODY_4_A%%
- %%D08_BODY_4_B%%
- %%D08_CONCLUSION%%
- %%D08_COVER_ALT%%
- %%D08_COVER_CAPTION%%
- %%D08_FAQ_A_1%%
- %%D08_FAQ_A_2%%
- %%D08_FAQ_Q_1%%
- %%D08_FAQ_Q_2%%
- %%D08_FAQ_TITLE%%
- %%D08_H2_1%%
- %%D08_H2_2%%
- %%D08_H2_3%%
- %%D08_H2_4%%
- %%D08_MODIFIED%%
- %%D08_MODULE_1%%
- %%D08_MODULE_2%%
- %%D08_MODULE_3%%
- %%D08_MODULE_NOTE%%
- %%D08_PUBLISHED%%
- %%D08_READING_NOTE%%
- %%D08_RSS_DATE%%
- %%D08_SECTION_LABEL_1%%
- %%D08_SECTION_LABEL_2%%
- %%D08_SECTION_LABEL_3%%
- %%D08_SECTION_LABEL_4%%
- %%D08_SOURCE_URL%%
- %%D08_SUMMARY%%
- %%D08_TITLE%%
- %%D09_AUTHOR_NOTE%%
- %%D09_BODY_1_A%%
- %%D09_BODY_1_B%%
- %%D09_BODY_2_A%%
- %%D09_BODY_2_B%%
- %%D09_BODY_3_A%%
- %%D09_BODY_3_B%%
- %%D09_BODY_4_A%%
- %%D09_BODY_4_B%%
- %%D09_CONCLUSION%%
- %%D09_COVER_ALT%%
- %%D09_COVER_CAPTION%%
- %%D09_FAQ_A_1%%
- %%D09_FAQ_A_2%%
- %%D09_FAQ_Q_1%%
- %%D09_FAQ_Q_2%%
- %%D09_FAQ_TITLE%%
- %%D09_H2_1%%
- %%D09_H2_2%%
- %%D09_H2_3%%
- %%D09_H2_4%%
- %%D09_MODIFIED%%
- %%D09_MODULE_NOTE%%
- %%D09_PUBLISHED%%
- %%D09_READING_NOTE%%
- %%D09_RSS_DATE%%
- %%D09_SECTION_LABEL_1%%
- %%D09_SECTION_LABEL_2%%
- %%D09_SECTION_LABEL_3%%
- %%D09_SECTION_LABEL_4%%
- %%D09_SOURCE_URL%%
- %%D09_SUMMARY%%
- %%D09_TITLE%%
- %%D10_AUTHOR_NOTE%%
- %%D10_BODY_1_A%%
- %%D10_BODY_1_B%%
- %%D10_BODY_2_A%%
- %%D10_BODY_2_B%%
- %%D10_BODY_3_A%%
- %%D10_BODY_3_B%%
- %%D10_BODY_4_A%%
- %%D10_BODY_4_B%%
- %%D10_CONCLUSION%%
- %%D10_COVER_ALT%%
- %%D10_COVER_CAPTION%%
- %%D10_FAQ_A_1%%
- %%D10_FAQ_A_2%%
- %%D10_FAQ_Q_1%%
- %%D10_FAQ_Q_2%%
- %%D10_FAQ_TITLE%%
- %%D10_H2_1%%
- %%D10_H2_2%%
- %%D10_H2_3%%
- %%D10_H2_4%%
- %%D10_MODIFIED%%
- %%D10_MODULE_1%%
- %%D10_MODULE_2%%
- %%D10_MODULE_3%%
- %%D10_MODULE_4%%
- %%D10_PUBLISHED%%
- %%D10_READING_NOTE%%
- %%D10_RSS_DATE%%
- %%D10_SECTION_LABEL_1%%
- %%D10_SECTION_LABEL_2%%
- %%D10_SECTION_LABEL_3%%
- %%D10_SECTION_LABEL_4%%
- %%D10_SOURCE_URL%%
- %%D10_SUMMARY%%
- %%D10_TITLE%%
- %%D11_AUTHOR_NOTE%%
- %%D11_BODY_1_A%%
- %%D11_BODY_1_B%%
- %%D11_BODY_2_A%%
- %%D11_BODY_2_B%%
- %%D11_BODY_3_A%%
- %%D11_BODY_3_B%%
- %%D11_BODY_4_A%%
- %%D11_BODY_4_B%%
- %%D11_CONCLUSION%%
- %%D11_COVER_ALT%%
- %%D11_COVER_CAPTION%%
- %%D11_FAQ_A_1%%
- %%D11_FAQ_A_2%%
- %%D11_FAQ_Q_1%%
- %%D11_FAQ_Q_2%%
- %%D11_FAQ_TITLE%%
- %%D11_H2_1%%
- %%D11_H2_2%%
- %%D11_H2_3%%
- %%D11_H2_4%%
- %%D11_MODIFIED%%
- %%D11_MODULE_1%%
- %%D11_MODULE_2%%
- %%D11_PUBLISHED%%
- %%D11_READING_NOTE%%
- %%D11_RSS_DATE%%
- %%D11_SECTION_LABEL_1%%
- %%D11_SECTION_LABEL_2%%
- %%D11_SECTION_LABEL_3%%
- %%D11_SECTION_LABEL_4%%
- %%D11_SOURCE_URL%%
- %%D11_SUMMARY%%
- %%D11_TITLE%%
- %%D12_AUTHOR_NOTE%%
- %%D12_BODY_1_A%%
- %%D12_BODY_1_B%%
- %%D12_BODY_2_A%%
- %%D12_BODY_2_B%%
- %%D12_BODY_3_A%%
- %%D12_BODY_3_B%%
- %%D12_BODY_4_A%%
- %%D12_BODY_4_B%%
- %%D12_CONCLUSION%%
- %%D12_COVER_ALT%%
- %%D12_COVER_CAPTION%%
- %%D12_FAQ_A_1%%
- %%D12_FAQ_A_2%%
- %%D12_FAQ_Q_1%%
- %%D12_FAQ_Q_2%%
- %%D12_FAQ_TITLE%%
- %%D12_H2_1%%
- %%D12_H2_2%%
- %%D12_H2_3%%
- %%D12_H2_4%%
- %%D12_MODIFIED%%
- %%D12_MODULE_1%%
- %%D12_MODULE_2%%
- %%D12_PUBLISHED%%
- %%D12_READING_NOTE%%
- %%D12_RSS_DATE%%
- %%D12_SECTION_LABEL_1%%
- %%D12_SECTION_LABEL_2%%
- %%D12_SECTION_LABEL_3%%
- %%D12_SECTION_LABEL_4%%
- %%D12_SOURCE_URL%%
- %%D12_SUMMARY%%
- %%D12_TITLE%%
- %%DISCLAIMER_DESC%%
- %%DISCLAIMER_INTRO%%
- %%DISCLAIMER_NOTE%%
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
- %%DISCLOSURE_DESC%%
- %%DISCLOSURE_INTRO%%
- %%DISCLOSURE_NOTE%%
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
- %%EDITORIAL_DESC%%
- %%EDITORIAL_INTRO%%
- %%EDITORIAL_NOTE%%
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
- %%HERO_DESCRIPTION%%
- %%HERO_TITLE%%
- %%INDEPENDENCE_NOTE%%
- %%INVITE_CODE%%
- %%INVITE_LABEL%%
- %%LANG%%
- %%LOG_DESC%%
- %%LOG_INTRO%%
- %%LOG_TITLE%%
- %%PRIVACY_DESC%%
- %%PRIVACY_INTRO%%
- %%PRIVACY_NOTE%%
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
- %%RADAR_ALT%%
- %%RADAR_BEARING%%
- %%RADAR_RANGE%%
- %%RISK_NOTE%%
- %%RSS_DATE%%
- %%SECTORS_TITLE%%
- %%SECTOR_1_INTRO%%
- %%SECTOR_1_NOTE%%
- %%SECTOR_2_INTRO%%
- %%SECTOR_2_NOTE%%
- %%SECTOR_3_INTRO%%
- %%SECTOR_3_NOTE%%
- %%SECTOR_4_INTRO%%
- %%SECTOR_4_NOTE%%
- %%SECURITY_EMAIL%%
- %%SECURITY_EXPIRES%%
- %%SEO_TITLE%%
- %%SITEMAP_LASTMOD%%
- %%SITE_DESC%%
- %%SITE_DOMAIN%%
- %%SITE_NAME%%
- %%SITE_TAGLINE%%
- %%TOOLS_CALLOUT%%
- %%TOOL_1_DESC%%
- %%TOOL_1_GUIDE_TEXT_1%%
- %%TOOL_1_GUIDE_TEXT_2%%
- %%TOOL_1_GUIDE_TEXT_3%%
- %%TOOL_1_GUIDE_TEXT_4%%
- %%TOOL_1_GUIDE_TEXT_5%%
- %%TOOL_1_GUIDE_TITLE_1%%
- %%TOOL_1_GUIDE_TITLE_2%%
- %%TOOL_1_GUIDE_TITLE_3%%
- %%TOOL_1_GUIDE_TITLE_4%%
- %%TOOL_1_GUIDE_TITLE_5%%
- %%TOOL_1_INTRO%%
- %%TOOL_2_DESC%%
- %%TOOL_2_GUIDE_TEXT_1%%
- %%TOOL_2_GUIDE_TEXT_2%%
- %%TOOL_2_GUIDE_TEXT_3%%
- %%TOOL_2_GUIDE_TEXT_4%%
- %%TOOL_2_GUIDE_TEXT_5%%
- %%TOOL_2_GUIDE_TITLE_1%%
- %%TOOL_2_GUIDE_TITLE_2%%
- %%TOOL_2_GUIDE_TITLE_3%%
- %%TOOL_2_GUIDE_TITLE_4%%
- %%TOOL_2_GUIDE_TITLE_5%%
- %%TOOL_2_INTRO%%
- %%TOOL_3_DESC%%
- %%TOOL_3_GUIDE_TEXT_1%%
- %%TOOL_3_GUIDE_TEXT_2%%
- %%TOOL_3_GUIDE_TEXT_3%%
- %%TOOL_3_GUIDE_TEXT_4%%
- %%TOOL_3_GUIDE_TEXT_5%%
- %%TOOL_3_GUIDE_TITLE_1%%
- %%TOOL_3_GUIDE_TITLE_2%%
- %%TOOL_3_GUIDE_TITLE_3%%
- %%TOOL_3_GUIDE_TITLE_4%%
- %%TOOL_3_GUIDE_TITLE_5%%
- %%TOOL_3_INTRO%%
- %%TOOL_4_DESC%%
- %%TOOL_4_GUIDE_TEXT_1%%
- %%TOOL_4_GUIDE_TEXT_2%%
- %%TOOL_4_GUIDE_TEXT_3%%
- %%TOOL_4_GUIDE_TEXT_4%%
- %%TOOL_4_GUIDE_TEXT_5%%
- %%TOOL_4_GUIDE_TITLE_1%%
- %%TOOL_4_GUIDE_TITLE_2%%
- %%TOOL_4_GUIDE_TITLE_3%%
- %%TOOL_4_GUIDE_TITLE_4%%
- %%TOOL_4_GUIDE_TITLE_5%%
- %%TOOL_4_INTRO%%
- %%TOOL_5_DESC%%
- %%TOOL_5_GUIDE_TEXT_1%%
- %%TOOL_5_GUIDE_TEXT_2%%
- %%TOOL_5_GUIDE_TEXT_3%%
- %%TOOL_5_GUIDE_TEXT_4%%
- %%TOOL_5_GUIDE_TEXT_5%%
- %%TOOL_5_GUIDE_TITLE_1%%
- %%TOOL_5_GUIDE_TITLE_2%%
- %%TOOL_5_GUIDE_TITLE_3%%
- %%TOOL_5_GUIDE_TITLE_4%%
- %%TOOL_5_GUIDE_TITLE_5%%
- %%TOOL_5_INTRO%%
- %%TOOL_INDEX_DESC%%
- %%TOOL_INDEX_INTRO%%
- %%TOOL_INDEX_TITLE%%
- %%UPDATED_DATE%%
- %%UPDATES_DESC%%
- %%UPDATES_INTRO%%
- %%UPDATES_NOTE%%
- %%UPDATES_TEXT_1%%
- %%UPDATES_TEXT_2%%
- %%UPDATES_TEXT_3%%
- %%UPDATES_TEXT_4%%
- %%UPDATES_TEXT_5%%
- %%UPDATES_TITLE_1%%
- %%UPDATES_TITLE_2%%
- %%UPDATES_TITLE_3%%
- %%UPDATES_TITLE_4%%
- %%UPDATES_TITLE_5%%
- %%WATCH_SHIFT%%
- %%WATCH_STANDARD%%
- %%WATCH_STATE%%
