# 005-fern-guide · Workflow-ready v2

## 定位

深蕨绿田野手册模板。首页采用路线封面、随行识别码、三条路线与工具包；文章使用路标课页、标本对开页、野外日志三种结构。它不复用前四套的账本、铅印、轨道或铜牌编目框架。

本目录只提供网站模板 UI、结构、工具和通用视觉资产，不包含可发布文章、注册教程或具体平台事实。下游 AI 只需替换站点变量并填写经核实的文章文字，不需要重做 UI、补页面、写工具逻辑或生成通用封面。

## 变量

| 变量 | 用途 |
|---|---|
| `{{SITE_NAME}}` | 中文站名 |
| `{{BRAND_EN}}` | 英文或罗马字 wordmark |
| `{{SITE_DOMAIN}}` | 域名，不带协议 |
| `{{SITE_TAGLINE}}` | 首页定位句 |
| `{{SITE_DESC}}` | 首页与 RSS 描述 |
| `{{LANG}}` | HTML 语言代码 |
| `{{ISSUE_NUMBER}}` | 当前季号 |
| `{{INVITE_CODE}}` | 邀请码明文 |
| `{{BENEFIT_RATE}}` | 经核实的弹性利益比例 |
| `{{BENEFIT_DISCLAIMER}}` | 资格、期限与政策变化脚注 |
| `{{AFFILIATE_URL}}` | 唯一推广链接槽位 |
| `{{AFFILIATE_LINK_LABEL}}` | 推广链接锚文本 |
| `{{AFFILIATE_DISCLOSURE}}` | 紧邻推广披露 |
| `{{AUTHOR_NAME}}` / `{{REVIEWER_NAME}}` | 作者与复核者笔名 |
| `{{UPDATED_DATE}}` / `{{EFFECTIVE_DATE}}` | 修改日期与合规生效日期 |
| `{{CONTACT_EMAIL}}` | 编辑与安全联系邮箱 |
| `{{RSS_PUB_DATE}}` | RSS 日期 |
| `{{SECURITY_EXPIRES_ISO}}` | security.txt 未来失效时间 |
| `{{ROUTE_01_NAME}}` / `{{ROUTE_01_DESC}}` | 路线一名称与说明 |
| `{{ROUTE_02_NAME}}` / `{{ROUTE_02_DESC}}` | 路线二名称与说明 |
| `{{ROUTE_03_NAME}}` / `{{ROUTE_03_DESC}}` | 路线三名称与说明 |
| `{{ABOUT_LEAD}}` / `{{CONTACT_LEAD}}` | 关于与联系页导语 |
| `{{DISCLOSURE_LEAD}}` / `{{DISCLAIMER_LEAD}}` | 披露与免责声明导语 |
| `{{PRIVACY_LEAD}}` / `{{CORRECTIONS_LEAD}}` / `{{EDITORIAL_LEAD}}` | 隐私、更正与编辑规约导语 |

## 下游 AI 接入

1. 替换全局变量后，按内容槽位填写 12 篇文章；所有标题、事实、数字、来源、FAQ 与日期都需核实。
2. `registrationGuide` 只是页面角色和 UI 外壳，不含教程正文；保留唯一 `{{AFFILIATE_URL}}`、完整 rel、紧邻披露和邀请码变量。
3. 三路线、札记索引、首页宽内链、十二套封面、七合规页与五工具已接线。
4. 工具只处理本地输入；若更改公式，复测正常、错误、边界、重置和复制。
5. GA4 整块默认注释，只有单站流程授权并更新隐私/CSP 后才启用。

## 内容槽位映射

```json content-slots-v1
{
  "articles": {
    "field-notes/access-trail-map.html": {
      "title": "{{ARTICLE_01_TITLE}}",
      "description": "{{ARTICLE_01_DESC}}",
      "lead": "{{ARTICLE_01_LEAD}}",
      "coverAlt": "{{ARTICLE_01_COVER_ALT}}",
      "coverCaption": "{{ARTICLE_01_COVER_CAPTION}}",
      "sourceNote": "{{ARTICLE_01_SOURCE_NOTE}}",
      "metrics": [
        "{{ARTICLE_01_METRIC_1}}",
        "{{ARTICLE_01_METRIC_2}}",
        "{{ARTICLE_01_METRIC_3}}"
      ],
      "sections": [
        {
          "heading": "{{ARTICLE_01_H2_1}}",
          "body": "{{ARTICLE_01_BODY_1}"
        },
        {
          "heading": "{{ARTICLE_01_H2_2}}",
          "body": "{{ARTICLE_01_BODY_2}"
        },
        {
          "heading": "{{ARTICLE_01_H2_3}}",
          "body": "{{ARTICLE_01_BODY_3}"
        }
      ],
      "faq": {
        "question": "{{ARTICLE_01_FAQ_Q}}",
        "answer": "{{ARTICLE_01_FAQ_A}}"
      }
    },
    "field-notes/fee-landmark-guide.html": {
      "title": "{{ARTICLE_02_TITLE}}",
      "description": "{{ARTICLE_02_DESC}}",
      "lead": "{{ARTICLE_02_LEAD}}",
      "coverAlt": "{{ARTICLE_02_COVER_ALT}}",
      "coverCaption": "{{ARTICLE_02_COVER_CAPTION}}",
      "sourceNote": "{{ARTICLE_02_SOURCE_NOTE}}",
      "metrics": [
        "{{ARTICLE_02_METRIC_1}}",
        "{{ARTICLE_02_METRIC_2}}",
        "{{ARTICLE_02_METRIC_3}}"
      ],
      "sections": [
        {
          "heading": "{{ARTICLE_02_H2_1}}",
          "body": "{{ARTICLE_02_BODY_1}"
        },
        {
          "heading": "{{ARTICLE_02_H2_2}}",
          "body": "{{ARTICLE_02_BODY_2}"
        },
        {
          "heading": "{{ARTICLE_02_H2_3}}",
          "body": "{{ARTICLE_02_BODY_3}"
        }
      ],
      "faq": {
        "question": "{{ARTICLE_02_FAQ_Q}}",
        "answer": "{{ARTICLE_02_FAQ_A}}"
      },
      "quote": "{{ARTICLE_02_QUOTE}}",
      "comparison": [
        {
          "label": "{{ARTICLE_02_COMPARE_LABEL_1}}",
          "value": "{{ARTICLE_02_COMPARE_VALUE_1}}"
        },
        {
          "label": "{{ARTICLE_02_COMPARE_LABEL_2}}",
          "value": "{{ARTICLE_02_COMPARE_VALUE_2}}"
        }
      ]
    },
    "field-notes/source-trace-notes.html": {
      "title": "{{ARTICLE_03_TITLE}}",
      "description": "{{ARTICLE_03_DESC}}",
      "lead": "{{ARTICLE_03_LEAD}}",
      "coverAlt": "{{ARTICLE_03_COVER_ALT}}",
      "coverCaption": "{{ARTICLE_03_COVER_CAPTION}}",
      "sourceNote": "{{ARTICLE_03_SOURCE_NOTE}}",
      "metrics": [
        "{{ARTICLE_03_METRIC_1}}",
        "{{ARTICLE_03_METRIC_2}}",
        "{{ARTICLE_03_METRIC_3}}"
      ],
      "sections": [
        {
          "heading": "{{ARTICLE_03_H2_1}}",
          "body": "{{ARTICLE_03_BODY_1}"
        },
        {
          "heading": "{{ARTICLE_03_H2_2}}",
          "body": "{{ARTICLE_03_BODY_2}"
        },
        {
          "heading": "{{ARTICLE_03_H2_3}}",
          "body": "{{ARTICLE_03_BODY_3}"
        }
      ],
      "faq": {
        "question": "{{ARTICLE_03_FAQ_Q}}",
        "answer": "{{ARTICLE_03_FAQ_A}}"
      },
      "aside": "{{ARTICLE_03_ASIDE}}",
      "steps": [
        "{{ARTICLE_03_STEP_1}}",
        "{{ARTICLE_03_STEP_2}}",
        "{{ARTICLE_03_STEP_3}}"
      ]
    },
    "field-notes/identity-check-route.html": {
      "title": "{{ARTICLE_04_TITLE}}",
      "description": "{{ARTICLE_04_DESC}}",
      "lead": "{{ARTICLE_04_LEAD}}",
      "coverAlt": "{{ARTICLE_04_COVER_ALT}}",
      "coverCaption": "{{ARTICLE_04_COVER_CAPTION}}",
      "sourceNote": "{{ARTICLE_04_SOURCE_NOTE}}",
      "metrics": [
        "{{ARTICLE_04_METRIC_1}}",
        "{{ARTICLE_04_METRIC_2}}",
        "{{ARTICLE_04_METRIC_3}}"
      ],
      "sections": [
        {
          "heading": "{{ARTICLE_04_H2_1}}",
          "body": "{{ARTICLE_04_BODY_1}"
        },
        {
          "heading": "{{ARTICLE_04_H2_2}}",
          "body": "{{ARTICLE_04_BODY_2}"
        },
        {
          "heading": "{{ARTICLE_04_H2_3}}",
          "body": "{{ARTICLE_04_BODY_3}"
        }
      ],
      "faq": {
        "question": "{{ARTICLE_04_FAQ_Q}}",
        "answer": "{{ARTICLE_04_FAQ_A}}"
      }
    },
    "field-notes/transfer-waypoint-log.html": {
      "title": "{{ARTICLE_05_TITLE}}",
      "description": "{{ARTICLE_05_DESC}}",
      "lead": "{{ARTICLE_05_LEAD}}",
      "coverAlt": "{{ARTICLE_05_COVER_ALT}}",
      "coverCaption": "{{ARTICLE_05_COVER_CAPTION}}",
      "sourceNote": "{{ARTICLE_05_SOURCE_NOTE}}",
      "metrics": [
        "{{ARTICLE_05_METRIC_1}}",
        "{{ARTICLE_05_METRIC_2}}",
        "{{ARTICLE_05_METRIC_3}}"
      ],
      "sections": [
        {
          "heading": "{{ARTICLE_05_H2_1}}",
          "body": "{{ARTICLE_05_BODY_1}"
        },
        {
          "heading": "{{ARTICLE_05_H2_2}}",
          "body": "{{ARTICLE_05_BODY_2}"
        },
        {
          "heading": "{{ARTICLE_05_H2_3}}",
          "body": "{{ARTICLE_05_BODY_3}"
        }
      ],
      "faq": {
        "question": "{{ARTICLE_05_FAQ_Q}}",
        "answer": "{{ARTICLE_05_FAQ_A}}"
      },
      "quote": "{{ARTICLE_05_QUOTE}}",
      "comparison": [
        {
          "label": "{{ARTICLE_05_COMPARE_LABEL_1}}",
          "value": "{{ARTICLE_05_COMPARE_VALUE_1}}"
        },
        {
          "label": "{{ARTICLE_05_COMPARE_LABEL_2}}",
          "value": "{{ARTICLE_05_COMPARE_VALUE_2}}"
        }
      ]
    },
    "field-notes/recovery-shelter-plan.html": {
      "title": "{{ARTICLE_06_TITLE}}",
      "description": "{{ARTICLE_06_DESC}}",
      "lead": "{{ARTICLE_06_LEAD}}",
      "coverAlt": "{{ARTICLE_06_COVER_ALT}}",
      "coverCaption": "{{ARTICLE_06_COVER_CAPTION}}",
      "sourceNote": "{{ARTICLE_06_SOURCE_NOTE}}",
      "metrics": [
        "{{ARTICLE_06_METRIC_1}}",
        "{{ARTICLE_06_METRIC_2}}",
        "{{ARTICLE_06_METRIC_3}}"
      ],
      "sections": [
        {
          "heading": "{{ARTICLE_06_H2_1}}",
          "body": "{{ARTICLE_06_BODY_1}"
        },
        {
          "heading": "{{ARTICLE_06_H2_2}}",
          "body": "{{ARTICLE_06_BODY_2}"
        },
        {
          "heading": "{{ARTICLE_06_H2_3}}",
          "body": "{{ARTICLE_06_BODY_3}"
        }
      ],
      "faq": {
        "question": "{{ARTICLE_06_FAQ_Q}}",
        "answer": "{{ARTICLE_06_FAQ_A}}"
      },
      "aside": "{{ARTICLE_06_ASIDE}}",
      "steps": [
        "{{ARTICLE_06_STEP_1}}",
        "{{ARTICLE_06_STEP_2}}",
        "{{ARTICLE_06_STEP_3}}"
      ]
    },
    "field-notes/order-path-primer.html": {
      "title": "{{ARTICLE_07_TITLE}}",
      "description": "{{ARTICLE_07_DESC}}",
      "lead": "{{ARTICLE_07_LEAD}}",
      "coverAlt": "{{ARTICLE_07_COVER_ALT}}",
      "coverCaption": "{{ARTICLE_07_COVER_CAPTION}}",
      "sourceNote": "{{ARTICLE_07_SOURCE_NOTE}}",
      "metrics": [
        "{{ARTICLE_07_METRIC_1}}",
        "{{ARTICLE_07_METRIC_2}}",
        "{{ARTICLE_07_METRIC_3}}"
      ],
      "sections": [
        {
          "heading": "{{ARTICLE_07_H2_1}}",
          "body": "{{ARTICLE_07_BODY_1}"
        },
        {
          "heading": "{{ARTICLE_07_H2_2}}",
          "body": "{{ARTICLE_07_BODY_2}"
        },
        {
          "heading": "{{ARTICLE_07_H2_3}}",
          "body": "{{ARTICLE_07_BODY_3}"
        }
      ],
      "faq": {
        "question": "{{ARTICLE_07_FAQ_Q}}",
        "answer": "{{ARTICLE_07_FAQ_A}}"
      }
    },
    "field-notes/volatility-weather-note.html": {
      "title": "{{ARTICLE_08_TITLE}}",
      "description": "{{ARTICLE_08_DESC}}",
      "lead": "{{ARTICLE_08_LEAD}}",
      "coverAlt": "{{ARTICLE_08_COVER_ALT}}",
      "coverCaption": "{{ARTICLE_08_COVER_CAPTION}}",
      "sourceNote": "{{ARTICLE_08_SOURCE_NOTE}}",
      "metrics": [
        "{{ARTICLE_08_METRIC_1}}",
        "{{ARTICLE_08_METRIC_2}}",
        "{{ARTICLE_08_METRIC_3}}"
      ],
      "sections": [
        {
          "heading": "{{ARTICLE_08_H2_1}}",
          "body": "{{ARTICLE_08_BODY_1}"
        },
        {
          "heading": "{{ARTICLE_08_H2_2}}",
          "body": "{{ARTICLE_08_BODY_2}"
        },
        {
          "heading": "{{ARTICLE_08_H2_3}}",
          "body": "{{ARTICLE_08_BODY_3}"
        }
      ],
      "faq": {
        "question": "{{ARTICLE_08_FAQ_Q}}",
        "answer": "{{ARTICLE_08_FAQ_A}}"
      },
      "quote": "{{ARTICLE_08_QUOTE}}",
      "comparison": [
        {
          "label": "{{ARTICLE_08_COMPARE_LABEL_1}}",
          "value": "{{ARTICLE_08_COMPARE_VALUE_1}}"
        },
        {
          "label": "{{ARTICLE_08_COMPARE_LABEL_2}}",
          "value": "{{ARTICLE_08_COMPARE_VALUE_2}}"
        }
      ]
    },
    "field-notes/custody-pack-list.html": {
      "title": "{{ARTICLE_09_TITLE}}",
      "description": "{{ARTICLE_09_DESC}}",
      "lead": "{{ARTICLE_09_LEAD}}",
      "coverAlt": "{{ARTICLE_09_COVER_ALT}}",
      "coverCaption": "{{ARTICLE_09_COVER_CAPTION}}",
      "sourceNote": "{{ARTICLE_09_SOURCE_NOTE}}",
      "metrics": [
        "{{ARTICLE_09_METRIC_1}}",
        "{{ARTICLE_09_METRIC_2}}",
        "{{ARTICLE_09_METRIC_3}}"
      ],
      "sections": [
        {
          "heading": "{{ARTICLE_09_H2_1}}",
          "body": "{{ARTICLE_09_BODY_1}"
        },
        {
          "heading": "{{ARTICLE_09_H2_2}}",
          "body": "{{ARTICLE_09_BODY_2}"
        },
        {
          "heading": "{{ARTICLE_09_H2_3}}",
          "body": "{{ARTICLE_09_BODY_3}"
        }
      ],
      "faq": {
        "question": "{{ARTICLE_09_FAQ_Q}}",
        "answer": "{{ARTICLE_09_FAQ_A}}"
      },
      "aside": "{{ARTICLE_09_ASIDE}}",
      "steps": [
        "{{ARTICLE_09_STEP_1}}",
        "{{ARTICLE_09_STEP_2}}",
        "{{ARTICLE_09_STEP_3}}"
      ]
    },
    "field-notes/review-loop-journal.html": {
      "title": "{{ARTICLE_10_TITLE}}",
      "description": "{{ARTICLE_10_DESC}}",
      "lead": "{{ARTICLE_10_LEAD}}",
      "coverAlt": "{{ARTICLE_10_COVER_ALT}}",
      "coverCaption": "{{ARTICLE_10_COVER_CAPTION}}",
      "sourceNote": "{{ARTICLE_10_SOURCE_NOTE}}",
      "metrics": [
        "{{ARTICLE_10_METRIC_1}}",
        "{{ARTICLE_10_METRIC_2}}",
        "{{ARTICLE_10_METRIC_3}}"
      ],
      "sections": [
        {
          "heading": "{{ARTICLE_10_H2_1}}",
          "body": "{{ARTICLE_10_BODY_1}"
        },
        {
          "heading": "{{ARTICLE_10_H2_2}}",
          "body": "{{ARTICLE_10_BODY_2}"
        },
        {
          "heading": "{{ARTICLE_10_H2_3}}",
          "body": "{{ARTICLE_10_BODY_3}"
        }
      ],
      "faq": {
        "question": "{{ARTICLE_10_FAQ_Q}}",
        "answer": "{{ARTICLE_10_FAQ_A}}"
      }
    },
    "field-notes/evidence-specimen-card.html": {
      "title": "{{ARTICLE_11_TITLE}}",
      "description": "{{ARTICLE_11_DESC}}",
      "lead": "{{ARTICLE_11_LEAD}}",
      "coverAlt": "{{ARTICLE_11_COVER_ALT}}",
      "coverCaption": "{{ARTICLE_11_COVER_CAPTION}}",
      "sourceNote": "{{ARTICLE_11_SOURCE_NOTE}}",
      "metrics": [
        "{{ARTICLE_11_METRIC_1}}",
        "{{ARTICLE_11_METRIC_2}}",
        "{{ARTICLE_11_METRIC_3}}"
      ],
      "sections": [
        {
          "heading": "{{ARTICLE_11_H2_1}}",
          "body": "{{ARTICLE_11_BODY_1}"
        },
        {
          "heading": "{{ARTICLE_11_H2_2}}",
          "body": "{{ARTICLE_11_BODY_2}"
        },
        {
          "heading": "{{ARTICLE_11_H2_3}}",
          "body": "{{ARTICLE_11_BODY_3}"
        }
      ],
      "faq": {
        "question": "{{ARTICLE_11_FAQ_Q}}",
        "answer": "{{ARTICLE_11_FAQ_A}}"
      },
      "quote": "{{ARTICLE_11_QUOTE}}",
      "comparison": [
        {
          "label": "{{ARTICLE_11_COMPARE_LABEL_1}}",
          "value": "{{ARTICLE_11_COMPARE_VALUE_1}}"
        },
        {
          "label": "{{ARTICLE_11_COMPARE_LABEL_2}}",
          "value": "{{ARTICLE_11_COMPARE_VALUE_2}}"
        }
      ]
    },
    "field-notes/policy-season-watch.html": {
      "title": "{{ARTICLE_12_TITLE}}",
      "description": "{{ARTICLE_12_DESC}}",
      "lead": "{{ARTICLE_12_LEAD}}",
      "coverAlt": "{{ARTICLE_12_COVER_ALT}}",
      "coverCaption": "{{ARTICLE_12_COVER_CAPTION}}",
      "sourceNote": "{{ARTICLE_12_SOURCE_NOTE}}",
      "metrics": [
        "{{ARTICLE_12_METRIC_1}}",
        "{{ARTICLE_12_METRIC_2}}",
        "{{ARTICLE_12_METRIC_3}}"
      ],
      "sections": [
        {
          "heading": "{{ARTICLE_12_H2_1}}",
          "body": "{{ARTICLE_12_BODY_1}"
        },
        {
          "heading": "{{ARTICLE_12_H2_2}}",
          "body": "{{ARTICLE_12_BODY_2}"
        },
        {
          "heading": "{{ARTICLE_12_H2_3}}",
          "body": "{{ARTICLE_12_BODY_3}"
        }
      ],
      "faq": {
        "question": "{{ARTICLE_12_FAQ_Q}}",
        "answer": "{{ARTICLE_12_FAQ_A}}"
      },
      "aside": "{{ARTICLE_12_ASIDE}}",
      "steps": [
        "{{ARTICLE_12_STEP_1}}",
        "{{ARTICLE_12_STEP_2}}",
        "{{ARTICLE_12_STEP_3}}"
      ]
    }
  }
}
```

## 工具验收样例

- 路线节奏：3/12、单次 2 章，应返回 25%、剩 9、下次 2；已完成大于总量应报错。
- 营期排程：2026-09-01 到 2026-09-15、每周 3 场，应返回 14 天、约 6 场；日期倒置应报错。
- 术语足迹：用两句文本与一个重复术语验证次数、覆盖句和密度；空术语应报错。
- 复核负荷：24 条、每条 8 分钟、每场 45 分钟，应返回 192 分钟与 5 场；0 条为合法边界。
- 清单覆盖：总 20、已核 15、关键漏 1，应返回 75%、剩 5、先处理关键漏项；关键漏项超过剩余量应报错。

## Workflow role map

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "article.html",
  "articles": [
    "field-notes/access-trail-map.html",
    "field-notes/fee-landmark-guide.html",
    "field-notes/source-trace-notes.html",
    "field-notes/identity-check-route.html",
    "field-notes/transfer-waypoint-log.html",
    "field-notes/recovery-shelter-plan.html",
    "field-notes/order-path-primer.html",
    "field-notes/volatility-weather-note.html",
    "field-notes/custody-pack-list.html",
    "field-notes/review-loop-journal.html",
    "field-notes/evidence-specimen-card.html",
    "field-notes/policy-season-watch.html"
  ],
  "cornerstones": [
    "field-notes/fee-landmark-guide.html",
    "field-notes/order-path-primer.html"
  ],
  "registrationGuide": "field-notes/access-trail-map.html",
  "articleCovers": {
    "field-notes/access-trail-map.html": {
      "display": "assets/covers/access-trail-map.webp",
      "og": "assets/covers/access-trail-map.png"
    },
    "field-notes/fee-landmark-guide.html": {
      "display": "assets/covers/fee-landmark-guide.webp",
      "og": "assets/covers/fee-landmark-guide.png"
    },
    "field-notes/source-trace-notes.html": {
      "display": "assets/covers/source-trace-notes.webp",
      "og": "assets/covers/source-trace-notes.png"
    },
    "field-notes/identity-check-route.html": {
      "display": "assets/covers/identity-check-route.webp",
      "og": "assets/covers/identity-check-route.png"
    },
    "field-notes/transfer-waypoint-log.html": {
      "display": "assets/covers/transfer-waypoint-log.webp",
      "og": "assets/covers/transfer-waypoint-log.png"
    },
    "field-notes/recovery-shelter-plan.html": {
      "display": "assets/covers/recovery-shelter-plan.webp",
      "og": "assets/covers/recovery-shelter-plan.png"
    },
    "field-notes/order-path-primer.html": {
      "display": "assets/covers/order-path-primer.webp",
      "og": "assets/covers/order-path-primer.png"
    },
    "field-notes/volatility-weather-note.html": {
      "display": "assets/covers/volatility-weather-note.webp",
      "og": "assets/covers/volatility-weather-note.png"
    },
    "field-notes/custody-pack-list.html": {
      "display": "assets/covers/custody-pack-list.webp",
      "og": "assets/covers/custody-pack-list.png"
    },
    "field-notes/review-loop-journal.html": {
      "display": "assets/covers/review-loop-journal.webp",
      "og": "assets/covers/review-loop-journal.png"
    },
    "field-notes/evidence-specimen-card.html": {
      "display": "assets/covers/evidence-specimen-card.webp",
      "og": "assets/covers/evidence-specimen-card.png"
    },
    "field-notes/policy-season-watch.html": {
      "display": "assets/covers/policy-season-watch.webp",
      "og": "assets/covers/policy-season-watch.png"
    }
  },
  "categories": [
    {
      "path": "routes/first-mile.html",
      "label": "{{ROUTE_01_NAME}}",
      "intro": "{{ROUTE_01_DESC}}",
      "articles": [
        "field-notes/access-trail-map.html",
        "field-notes/fee-landmark-guide.html",
        "field-notes/identity-check-route.html",
        "field-notes/policy-season-watch.html"
      ]
    },
    {
      "path": "routes/practice-loop.html",
      "label": "{{ROUTE_02_NAME}}",
      "intro": "{{ROUTE_02_DESC}}",
      "articles": [
        "field-notes/transfer-waypoint-log.html",
        "field-notes/order-path-primer.html",
        "field-notes/volatility-weather-note.html",
        "field-notes/review-loop-journal.html"
      ]
    },
    {
      "path": "routes/source-camp.html",
      "label": "{{ROUTE_03_NAME}}",
      "intro": "{{ROUTE_03_DESC}}",
      "articles": [
        "field-notes/source-trace-notes.html",
        "field-notes/recovery-shelter-plan.html",
        "field-notes/custody-pack-list.html",
        "field-notes/evidence-specimen-card.html"
      ]
    }
  ],
  "toolIndex": "tool.html",
  "tools": [
    "field-kit/route-pacer.html",
    "field-kit/session-calendar.html",
    "field-kit/term-tracker.html",
    "field-kit/review-load.html",
    "field-kit/checklist-coverage.html"
  ],
  "legal": {
    "about": "about.html",
    "contact": "contact.html",
    "disclosure": "disclosure.html",
    "disclaimer": "legal.html",
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
    "siteDomain": "{{SITE_DOMAIN}}",
    "siteName": "{{SITE_NAME}}",
    "wordmark": "{{BRAND_EN}}",
    "inviteCode": "{{INVITE_CODE}}",
    "benefitRate": "{{BENEFIT_RATE}}",
    "benefitDisclaimer": "{{BENEFIT_DISCLAIMER}}",
    "affiliateUrl": "{{AFFILIATE_URL}}"
  }
}
```
