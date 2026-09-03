# 030 — Pelagic Drift Catalog / 漂流目录

这是一套 workflow-ready v2 的高端数字资源海图框架。深海蓝、海玻璃青、珊瑚信标、经线侧轨与不规则岛屿共同组成一张可浏览的“开放水域”；它与上一套工业年鉴的报表纸、铁牌、酸性色和方格构图没有共用视觉骨架。

后续 AI 只需替换站点变量、经核验的文字、来源、日期和文章正文，不需要重做导航、响应式、SEO 元数据、十二张封面、分类体系、合规页或五件工具逻辑。HTML 内的方括号字段是文字接入口，不代表事实。

## 已完成框架

- 首页形态 A：首屏邀请码、复制真功能、弹性利益点、脚注与唯一一处编辑式访问资料入口；首页没有外部推广直链。
- 12 篇文章使用测深长读、潮汐年代、双航线比较、声呐批注、群岛卡片、方法航程、修订浮标、来源港环、天气窗口、无线电问答、术语群岛、访问泊位十二种结构。
- 深水阅读、制作洋流、安全航道三片水域各承载四篇；首页和读物索引已接好全部页面。
- 五件纯本地工具：地址净化、链接去重、查询参数展开、域名分组、相对网址解析；各自包含错误、边界、重置、复制和输入后旧结果失效。工具不会联网、跳转、隐藏或添加推荐代码。
- 7 个独立合规页、404、RSS、安全联系、favicon、Apple 图标、社交图、12 套 1200×630 PNG/WebP 封面均已配齐。

## 访问资料页边界

articles/access-berth.html 只是内容与 UI 外壳，不含注册步骤、平台规则、费率或监管事实。它恰好保留一个静态 AFFILIATE_URL href，带 target=_blank、rel=sponsored nofollow noopener noreferrer，并紧邻“推荐链接／推广链接”可见披露。其余页面没有推广直链。

## 内容接入顺序

1. 替换站名、域名、罗马字 wordmark、作者、联系、日期、邀请码、利益比例与脚注。
2. 按完成后的关键词与事实调研填写十二篇文字；保留十二种内容结构，不要把页面改回同一排版。数字、费用、限制和监管信息必须核验来源与日期。
3. 只替换文字、链接和 alt；保留 plg- 类、DOM 主骨架、表单 id、data 属性、ARIA、封面尺寸与脚本引用。
4. 默认保持首页形态 A。只有具体站得到站主明确授权时，建站 AI 才能在单站流程中改为形态 B。
5. 内容完成后重跑三套静态审计、相似度检查，并在桌面、390px、360px 实测 31 条路由、首页复制/主题/菜单/筛选、五工具全部状态、访问资料链接属性和 404 三出口。

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "article.html",
  "articles": [
    "articles/current-reading.html",
    "articles/drift-chronicle.html",
    "articles/route-comparison.html",
    "articles/annotated-sounding.html",
    "articles/harbor-cards.html",
    "articles/field-method.html",
    "articles/correction-buoy.html",
    "articles/source-harbor.html",
    "articles/weather-window.html",
    "articles/radio-interview.html",
    "articles/signal-glossary.html",
    "articles/access-berth.html"
  ],
  "cornerstones": [
    "articles/current-reading.html",
    "articles/field-method.html"
  ],
  "registrationGuide": "articles/access-berth.html",
  "articleCovers": {
    "articles/current-reading.html": {
      "display": "assets/covers/current-reading.webp",
      "og": "assets/covers/current-reading.png"
    },
    "articles/drift-chronicle.html": {
      "display": "assets/covers/drift-chronicle.webp",
      "og": "assets/covers/drift-chronicle.png"
    },
    "articles/route-comparison.html": {
      "display": "assets/covers/route-comparison.webp",
      "og": "assets/covers/route-comparison.png"
    },
    "articles/annotated-sounding.html": {
      "display": "assets/covers/annotated-sounding.webp",
      "og": "assets/covers/annotated-sounding.png"
    },
    "articles/harbor-cards.html": {
      "display": "assets/covers/harbor-cards.webp",
      "og": "assets/covers/harbor-cards.png"
    },
    "articles/field-method.html": {
      "display": "assets/covers/field-method.webp",
      "og": "assets/covers/field-method.png"
    },
    "articles/correction-buoy.html": {
      "display": "assets/covers/correction-buoy.webp",
      "og": "assets/covers/correction-buoy.png"
    },
    "articles/source-harbor.html": {
      "display": "assets/covers/source-harbor.webp",
      "og": "assets/covers/source-harbor.png"
    },
    "articles/weather-window.html": {
      "display": "assets/covers/weather-window.webp",
      "og": "assets/covers/weather-window.png"
    },
    "articles/radio-interview.html": {
      "display": "assets/covers/radio-interview.webp",
      "og": "assets/covers/radio-interview.png"
    },
    "articles/signal-glossary.html": {
      "display": "assets/covers/signal-glossary.webp",
      "og": "assets/covers/signal-glossary.png"
    },
    "articles/access-berth.html": {
      "display": "assets/covers/access-berth.webp",
      "og": "assets/covers/access-berth.png"
    }
  },
  "categories": [
    {
      "path": "waters/deep-reading.html",
      "label": "深水阅读",
      "articles": [
        "articles/current-reading.html",
        "articles/drift-chronicle.html",
        "articles/route-comparison.html",
        "articles/source-harbor.html"
      ]
    },
    {
      "path": "waters/making-current.html",
      "label": "制作洋流",
      "articles": [
        "articles/annotated-sounding.html",
        "articles/harbor-cards.html",
        "articles/field-method.html",
        "articles/correction-buoy.html"
      ]
    },
    {
      "path": "waters/safe-passage.html",
      "label": "安全航道",
      "articles": [
        "articles/weather-window.html",
        "articles/radio-interview.html",
        "articles/signal-glossary.html",
        "articles/access-berth.html"
      ]
    }
  ],
  "toolIndex": "tool.html",
  "tools": [
    "instruments/url-sanitizer.html",
    "instruments/link-deduplicator.html",
    "instruments/query-lens.html",
    "instruments/domain-sorter.html",
    "instruments/url-resolver.html"
  ],
  "legal": {
    "about": "about.html",
    "contact": "contact.html",
    "disclosure": "legal.html",
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
    "siteDomain": "[[SITE_DOMAIN]]",
    "siteName": "[[SITE_NAME]]",
    "wordmark": "[[BRAND_EN]]",
    "inviteCode": "[[INVITE_CODE]]",
    "benefitRate": "[[BENEFIT_RATE]]",
    "benefitDisclaimer": "[[BENEFIT_DISCLAIMER]]",
    "affiliateUrl": "[[AFFILIATE_URL]]"
  }
}
```

## 完整变量索引

[[ABOUT_AUTHORSHIP]]、[[ABOUT_DESCRIPTION]]、[[ABOUT_SCOPE]]、[[ABOUT_TITLE]]、[[AFFILIATE_LINK_LABEL]]、[[AFFILIATE_URL]]、[[ARTICLE_INDEX_DESCRIPTION]]、[[ARTICLE_INDEX_INTRODUCTION]]、[[ARTICLE_INDEX_TITLE]]、[[AUTHOR_NAME]]、[[BENEFIT_DISCLAIMER]]、[[BENEFIT_RATE]]、[[BRAND_EN]]、[[CHRONICLE_COVER_CAPTION]]、[[CHRONICLE_DATE_ONE]]、[[CHRONICLE_DATE_THREE]]、[[CHRONICLE_DATE_TWO]]、[[CHRONICLE_DECK]]、[[CHRONICLE_DESCRIPTION]]、[[CHRONICLE_EVENT_ONE_BODY]]、[[CHRONICLE_EVENT_ONE_TITLE]]、[[CHRONICLE_EVENT_THREE_BODY]]、[[CHRONICLE_EVENT_THREE_TITLE]]、[[CHRONICLE_EVENT_TWO_BODY]]、[[CHRONICLE_EVENT_TWO_TITLE]]、[[CHRONICLE_READING_NOTE]]、[[CHRONICLE_TITLE]]、[[COMPARISON_A_ONE]]、[[COMPARISON_A_THREE]]、[[COMPARISON_A_TWO]]、[[COMPARISON_B_ONE]]、[[COMPARISON_B_THREE]]、[[COMPARISON_B_TWO]]、[[COMPARISON_COVER_CAPTION]]、[[COMPARISON_CRITERION_ONE]]、[[COMPARISON_CRITERION_THREE]]、[[COMPARISON_CRITERION_TWO]]、[[COMPARISON_DECK]]、[[COMPARISON_DESCRIPTION]]、[[COMPARISON_OPTION_A]]、[[COMPARISON_OPTION_B]]、[[COMPARISON_TITLE]]、[[COMPARISON_VERDICT]]、[[CONTACT_CORRECTION_NOTE]]、[[CONTACT_DESCRIPTION]]、[[CONTACT_EMAIL]]、[[CONTACT_INTRODUCTION]]、[[CONTACT_TITLE]]、[[CORRECTIONS_DESCRIPTION]]、[[CORRECTIONS_POLICY]]、[[CORRECTIONS_SUBMISSION]]、[[CORRECTIONS_TITLE]]、[[CORRECTION_COVER_CAPTION]]、[[CORRECTION_DATE_ONE]]、[[CORRECTION_DATE_THREE]]、[[CORRECTION_DATE_TWO]]、[[CORRECTION_DECK]]、[[CORRECTION_DESCRIPTION]]、[[CORRECTION_ITEM_ONE]]、[[CORRECTION_ITEM_THREE]]、[[CORRECTION_ITEM_TWO]]、[[CORRECTION_LOG_DATE_ONE]]、[[CORRECTION_LOG_DATE_THREE]]、[[CORRECTION_LOG_DATE_TWO]]、[[CORRECTION_LOG_ONE]]、[[CORRECTION_LOG_THREE]]、[[CORRECTION_LOG_TWO]]、[[CORRECTION_REASON_ONE]]、[[CORRECTION_REASON_THREE]]、[[CORRECTION_REASON_TWO]]、[[CORRECTION_STATUS_ONE]]、[[CORRECTION_STATUS_THREE]]、[[CORRECTION_STATUS_TWO]]、[[CORRECTION_TITLE]]、[[CURRENT_COVER_CAPTION]]、[[CURRENT_DECK]]、[[CURRENT_DESCRIPTION]]、[[CURRENT_FACT_ONE]]、[[CURRENT_FACT_THREE]]、[[CURRENT_FACT_TWO]]、[[CURRENT_PULL_QUOTE]]、[[CURRENT_SECTION_ONE_BODY]]、[[CURRENT_SECTION_ONE_TITLE]]、[[CURRENT_SECTION_TWO_BODY]]、[[CURRENT_SECTION_TWO_TITLE]]、[[CURRENT_TITLE]]、[[DEEP_WATER_DESCRIPTION]]、[[DEEP_WATER_TITLE]]、[[DISCLAIMER_DESCRIPTION]]、[[DISCLAIMER_INFORMATION_SCOPE]]、[[DISCLAIMER_JURISDICTION_NOTE]]、[[DISCLAIMER_TITLE]]、[[DISCLOSURE_CONDITION_NOTE]]、[[DISCLOSURE_DESCRIPTION]]、[[DISCLOSURE_LINK_POLICY]]、[[DISCLOSURE_TITLE]]、[[EDITORIAL_DESCRIPTION]]、[[EDITORIAL_SELECTION]]、[[EDITORIAL_TITLE]]、[[EDITORIAL_UPDATE_POLICY]]、[[EDITORIAL_VERIFICATION]]、[[FEED_DATE_01]]、[[FEED_DATE_02]]、[[FEED_DATE_03]]、[[FEED_DATE_04]]、[[FEED_DATE_05]]、[[FEED_DATE_06]]、[[FEED_DATE_07]]、[[FEED_DATE_08]]、[[FEED_DATE_09]]、[[FEED_DESCRIPTION]]、[[FEED_SUMMARY_01]]、[[FEED_SUMMARY_02]]、[[FEED_SUMMARY_03]]、[[FEED_SUMMARY_04]]、[[FEED_SUMMARY_05]]、[[FEED_SUMMARY_06]]、[[FEED_SUMMARY_07]]、[[FEED_SUMMARY_08]]、[[FEED_SUMMARY_09]]、[[GLOSSARY_COVER_CAPTION]]、[[GLOSSARY_DECK]]、[[GLOSSARY_DEFINITION_FIVE]]、[[GLOSSARY_DEFINITION_FOUR]]、[[GLOSSARY_DEFINITION_ONE]]、[[GLOSSARY_DEFINITION_THREE]]、[[GLOSSARY_DEFINITION_TWO]]、[[GLOSSARY_DESCRIPTION]]、[[GLOSSARY_TERM_FIVE]]、[[GLOSSARY_TERM_FOUR]]、[[GLOSSARY_TERM_ONE]]、[[GLOSSARY_TERM_THREE]]、[[GLOSSARY_TERM_TWO]]、[[GLOSSARY_TITLE]]、[[HARBOR_CARD_FOUR_BODY]]、[[HARBOR_CARD_FOUR_TITLE]]、[[HARBOR_CARD_ONE_BODY]]、[[HARBOR_CARD_ONE_TITLE]]、[[HARBOR_CARD_READING_NOTE]]、[[HARBOR_CARD_THREE_BODY]]、[[HARBOR_CARD_THREE_TITLE]]、[[HARBOR_CARD_TWO_BODY]]、[[HARBOR_CARD_TWO_TITLE]]、[[HARBOR_COVER_CAPTION]]、[[HARBOR_DECK]]、[[HARBOR_DESCRIPTION]]、[[HARBOR_TITLE]]、[[HOME_DESCRIPTION]]、[[HOME_INTRODUCTION]]、[[HOME_TITLE]]、[[INDEX_INTRODUCTION]]、[[INVITE_CODE]]、[[MAKING_WATER_DESCRIPTION]]、[[MAKING_WATER_TITLE]]、[[METHOD_CELL_FIVE]]、[[METHOD_CELL_FOUR]]、[[METHOD_CELL_ONE]]、[[METHOD_CELL_SIX]]、[[METHOD_CELL_THREE]]、[[METHOD_CELL_TWO]]、[[METHOD_COLUMN_ONE]]、[[METHOD_COLUMN_THREE]]、[[METHOD_COLUMN_TWO]]、[[METHOD_COVER_CAPTION]]、[[METHOD_DECK]]、[[METHOD_DESCRIPTION]]、[[METHOD_PHASE_ONE_BODY]]、[[METHOD_PHASE_ONE_TITLE]]、[[METHOD_PHASE_THREE_BODY]]、[[METHOD_PHASE_THREE_TITLE]]、[[METHOD_PHASE_TWO_BODY]]、[[METHOD_PHASE_TWO_TITLE]]、[[METHOD_TABLE_CAPTION]]、[[METHOD_TITLE]]、[[MODIFIED_DATE]]、[[PRIVACY_CONTACT_POLICY]]、[[PRIVACY_DESCRIPTION]]、[[PRIVACY_LOG_POLICY]]、[[PRIVACY_TITLE]]、[[PUBLISHED_DATE]]、[[RADIO_ANSWER_ONE]]、[[RADIO_ANSWER_THREE]]、[[RADIO_ANSWER_TWO]]、[[RADIO_COVER_CAPTION]]、[[RADIO_DECK]]、[[RADIO_DESCRIPTION]]、[[RADIO_FREQUENCY_NOTE]]、[[RADIO_QUESTION_ONE]]、[[RADIO_QUESTION_THREE]]、[[RADIO_QUESTION_TWO]]、[[RADIO_TITLE]]、[[REGISTRATION_COVER_CAPTION]]、[[REGISTRATION_DECK]]、[[REGISTRATION_DESCRIPTION]]、[[REGISTRATION_FACT_ONE_LABEL]]、[[REGISTRATION_FACT_ONE_VALUE]]、[[REGISTRATION_FACT_TWO_LABEL]]、[[REGISTRATION_FACT_TWO_VALUE]]、[[REGISTRATION_FAQ_ANSWER]]、[[REGISTRATION_FAQ_QUESTION]]、[[REGISTRATION_FAQ_TITLE]]、[[REGISTRATION_SECTION_ONE_BODY]]、[[REGISTRATION_SECTION_ONE_TITLE]]、[[REGISTRATION_SECTION_THREE_BODY]]、[[REGISTRATION_SECTION_THREE_TITLE]]、[[REGISTRATION_SECTION_TWO_BODY]]、[[REGISTRATION_SECTION_TWO_TITLE]]、[[REGISTRATION_TITLE]]、[[SAFE_WATER_DESCRIPTION]]、[[SAFE_WATER_TITLE]]、[[SECURITY_EMAIL]]、[[SECURITY_EXPIRES]]、[[SITE_DOMAIN]]、[[SITE_NAME]]、[[SOUNDING_COVER_CAPTION]]、[[SOUNDING_DECK]]、[[SOUNDING_DESCRIPTION]]、[[SOUNDING_DIAGRAM_CAPTION]]、[[SOUNDING_NOTE_ONE_BODY]]、[[SOUNDING_NOTE_ONE_TITLE]]、[[SOUNDING_NOTE_THREE_BODY]]、[[SOUNDING_NOTE_THREE_TITLE]]、[[SOUNDING_NOTE_TWO_BODY]]、[[SOUNDING_NOTE_TWO_TITLE]]、[[SOUNDING_TITLE]]、[[SOURCE_CHECK_BODY]]、[[SOURCE_CHECK_TITLE]]、[[SOURCE_CITATION_FORMAT]]、[[SOURCE_COVER_CAPTION]]、[[SOURCE_DECK]]、[[SOURCE_DESCRIPTION]]、[[SOURCE_PRIMARY_BODY]]、[[SOURCE_PRIMARY_TITLE]]、[[SOURCE_SECONDARY_BODY]]、[[SOURCE_SECONDARY_TITLE]]、[[SOURCE_TITLE]]、[[TOOL_1_GUIDE_INPUT]]、[[TOOL_1_GUIDE_LIMITS]]、[[TOOL_1_GUIDE_METHOD]]、[[TOOL_1_GUIDE_PURPOSE]]、[[TOOL_1_GUIDE_READING]]、[[TOOL_2_GUIDE_INPUT]]、[[TOOL_2_GUIDE_LIMITS]]、[[TOOL_2_GUIDE_METHOD]]、[[TOOL_2_GUIDE_PURPOSE]]、[[TOOL_2_GUIDE_READING]]、[[TOOL_3_GUIDE_INPUT]]、[[TOOL_3_GUIDE_LIMITS]]、[[TOOL_3_GUIDE_METHOD]]、[[TOOL_3_GUIDE_PURPOSE]]、[[TOOL_3_GUIDE_READING]]、[[TOOL_4_GUIDE_INPUT]]、[[TOOL_4_GUIDE_LIMITS]]、[[TOOL_4_GUIDE_METHOD]]、[[TOOL_4_GUIDE_PURPOSE]]、[[TOOL_4_GUIDE_READING]]、[[TOOL_5_GUIDE_INPUT]]、[[TOOL_5_GUIDE_LIMITS]]、[[TOOL_5_GUIDE_METHOD]]、[[TOOL_5_GUIDE_PURPOSE]]、[[TOOL_5_GUIDE_READING]]、[[TOOL_INDEX_DESCRIPTION]]、[[TOOL_INDEX_INTRODUCTION]]、[[TOOL_INDEX_TITLE]]、[[WEATHER_CAVEAT]]、[[WEATHER_COVER_CAPTION]]、[[WEATHER_DECK]]、[[WEATHER_DESCRIPTION]]、[[WEATHER_HIGH_BODY]]、[[WEATHER_HIGH_TITLE]]、[[WEATHER_LOW_BODY]]、[[WEATHER_LOW_TITLE]]、[[WEATHER_MID_BODY]]、[[WEATHER_MID_TITLE]]、[[WEATHER_TITLE]]
