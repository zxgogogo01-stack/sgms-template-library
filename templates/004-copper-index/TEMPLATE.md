# 004-copper-index · Workflow-ready v2

## 定位

铜牌目录与编目柜式独立研究站模板。首页采用一整页目录封面、悬挂式邀请码票据、三柜别与铜牌路由账；文章使用铭牌、对开页与抽屉档案三种结构，区别于 001 的账本、002 的铅印刊物和 003 的任务控制台。

本目录只提供网站模板 UI、结构、工具和通用视觉资产，不包含可发布文章、注册教程或具体平台事实。下游 AI 只需替换站点变量并填写经核实的文字内容，不需要重新设计页面、补组件、写工具逻辑或生成通用封面。

## 全局与合规变量

| 变量 | 用途 |
|---|---|
| `{{SITE_NAME}}` | 中文站名 |
| `{{BRAND_EN}}` | 英文或罗马字 wordmark |
| `{{SITE_DOMAIN}}` | 域名，不带协议 |
| `{{SITE_TAGLINE}}` | 首页定位句 |
| `{{SITE_DESC}}` | 首页与 RSS 描述 |
| `{{LANG}}` | HTML 语言代码 |
| `{{ISSUE_NUMBER}}` | 当前卷号 |
| `{{INVITE_CODE}}` | 邀请码明文 |
| `{{BENEFIT_RATE}}` | 经核实的弹性利益比例 |
| `{{BENEFIT_DISCLAIMER}}` | 资格、期限与政策变化脚注 |
| `{{AFFILIATE_URL}}` | 唯一推广链接槽位 |
| `{{AFFILIATE_LINK_LABEL}}` | 推广链接锚文本 |
| `{{AFFILIATE_DISCLOSURE}}` | 紧邻推广披露 |
| `{{AUTHOR_NAME}}` | 作者笔名 |
| `{{REVIEWER_NAME}}` | 复核者笔名 |
| `{{UPDATED_DATE}}` | 最近修改日期 |
| `{{EFFECTIVE_DATE}}` | 合规页生效日期 |
| `{{CONTACT_EMAIL}}` | 编辑与安全联系邮箱 |
| `{{RSS_PUB_DATE}}` | RSS 2.0 日期 |
| `{{SECURITY_EXPIRES_ISO}}` | security.txt 未来失效时间 |
| `{{COLLECTION_01_NAME}}` / `{{COLLECTION_01_DESC}}` | 柜别一名称与说明 |
| `{{COLLECTION_02_NAME}}` / `{{COLLECTION_02_DESC}}` | 柜别二名称与说明 |
| `{{COLLECTION_03_NAME}}` / `{{COLLECTION_03_DESC}}` | 柜别三名称与说明 |
| `{{ABOUT_LEAD}}` | 关于页导语 |
| `{{CONTACT_LEAD}}` | 联系页导语 |
| `{{DISCLOSURE_LEAD}}` | 推广披露页导语 |
| `{{DISCLAIMER_LEAD}}` | 免责声明导语 |
| `{{PRIVACY_LEAD}}` | 隐私页导语 |
| `{{CORRECTIONS_LEAD}}` | 更正页导语 |
| `{{EDITORIAL_LEAD}}` | 编辑规约导语 |

## 下游 AI 接入

1. 先替换全局与合规变量，再按内容槽位映射填写 12 篇文章。标题、正文、数据、来源、FAQ 与日期必须使用核实后的内容。
2. `registrationGuide` 仅提供页面角色与 UI 外壳，不含注册教程正文；保留唯一 `{{AFFILIATE_URL}}`、完整 rel、紧邻披露与邀请码变量。
3. 三个柜别、条目总录、首页宽内链、十二套封面、社交图、七合规页和五个工具均已接线。
4. 工具只处理本地输入，不抓行情或账户数据；修改算法后复测正常、错误、边界、重置与复制。
5. GA4 代码默认整块注释；只有单站流程明确授权并更新隐私/CSP 后才能启用。

## 内容槽位映射

```json content-slots-v1
{
  "articles": {
    "catalog/account-access-record.html": {
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
          "body": "{{ARTICLE_01_BODY_1}}"
        },
        {
          "heading": "{{ARTICLE_01_H2_2}}",
          "body": "{{ARTICLE_01_BODY_2}}"
        },
        {
          "heading": "{{ARTICLE_01_H2_3}}",
          "body": "{{ARTICLE_01_BODY_3}}"
        }
      ],
      "faq": {
        "question": "{{ARTICLE_01_FAQ_Q}}",
        "answer": "{{ARTICLE_01_FAQ_A}}"
      }
    },
    "catalog/fee-reference-card.html": {
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
          "body": "{{ARTICLE_02_BODY_1}}"
        },
        {
          "heading": "{{ARTICLE_02_H2_2}}",
          "body": "{{ARTICLE_02_BODY_2}}"
        },
        {
          "heading": "{{ARTICLE_02_H2_3}}",
          "body": "{{ARTICLE_02_BODY_3}}"
        }
      ],
      "faq": {
        "question": "{{ARTICLE_02_FAQ_Q}}",
        "answer": "{{ARTICLE_02_FAQ_A}}"
      },
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
    "catalog/source-provenance-record.html": {
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
          "body": "{{ARTICLE_03_BODY_1}}"
        },
        {
          "heading": "{{ARTICLE_03_H2_2}}",
          "body": "{{ARTICLE_03_BODY_2}}"
        },
        {
          "heading": "{{ARTICLE_03_H2_3}}",
          "body": "{{ARTICLE_03_BODY_3}}"
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
    "catalog/identity-check-index.html": {
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
          "body": "{{ARTICLE_04_BODY_1}}"
        },
        {
          "heading": "{{ARTICLE_04_H2_2}}",
          "body": "{{ARTICLE_04_BODY_2}}"
        },
        {
          "heading": "{{ARTICLE_04_H2_3}}",
          "body": "{{ARTICLE_04_BODY_3}}"
        }
      ],
      "faq": {
        "question": "{{ARTICLE_04_FAQ_Q}}",
        "answer": "{{ARTICLE_04_FAQ_A}}"
      }
    },
    "catalog/transfer-observation-sheet.html": {
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
          "body": "{{ARTICLE_05_BODY_1}}"
        },
        {
          "heading": "{{ARTICLE_05_H2_2}}",
          "body": "{{ARTICLE_05_BODY_2}}"
        },
        {
          "heading": "{{ARTICLE_05_H2_3}}",
          "body": "{{ARTICLE_05_BODY_3}}"
        }
      ],
      "faq": {
        "question": "{{ARTICLE_05_FAQ_Q}}",
        "answer": "{{ARTICLE_05_FAQ_A}}"
      },
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
    "catalog/recovery-reference-file.html": {
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
          "body": "{{ARTICLE_06_BODY_1}}"
        },
        {
          "heading": "{{ARTICLE_06_H2_2}}",
          "body": "{{ARTICLE_06_BODY_2}}"
        },
        {
          "heading": "{{ARTICLE_06_H2_3}}",
          "body": "{{ARTICLE_06_BODY_3}}"
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
    "catalog/order-mechanism-note.html": {
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
          "body": "{{ARTICLE_07_BODY_1}}"
        },
        {
          "heading": "{{ARTICLE_07_H2_2}}",
          "body": "{{ARTICLE_07_BODY_2}}"
        },
        {
          "heading": "{{ARTICLE_07_H2_3}}",
          "body": "{{ARTICLE_07_BODY_3}}"
        }
      ],
      "faq": {
        "question": "{{ARTICLE_07_FAQ_Q}}",
        "answer": "{{ARTICLE_07_FAQ_A}}"
      }
    },
    "catalog/volatility-context-card.html": {
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
          "body": "{{ARTICLE_08_BODY_1}}"
        },
        {
          "heading": "{{ARTICLE_08_H2_2}}",
          "body": "{{ARTICLE_08_BODY_2}}"
        },
        {
          "heading": "{{ARTICLE_08_H2_3}}",
          "body": "{{ARTICLE_08_BODY_3}}"
        }
      ],
      "faq": {
        "question": "{{ARTICLE_08_FAQ_Q}}",
        "answer": "{{ARTICLE_08_FAQ_A}}"
      },
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
    "catalog/custody-question-list.html": {
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
          "body": "{{ARTICLE_09_BODY_1}}"
        },
        {
          "heading": "{{ARTICLE_09_H2_2}}",
          "body": "{{ARTICLE_09_BODY_2}}"
        },
        {
          "heading": "{{ARTICLE_09_H2_3}}",
          "body": "{{ARTICLE_09_BODY_3}}"
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
    "catalog/review-calendar-entry.html": {
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
          "body": "{{ARTICLE_10_BODY_1}}"
        },
        {
          "heading": "{{ARTICLE_10_H2_2}}",
          "body": "{{ARTICLE_10_BODY_2}}"
        },
        {
          "heading": "{{ARTICLE_10_H2_3}}",
          "body": "{{ARTICLE_10_BODY_3}}"
        }
      ],
      "faq": {
        "question": "{{ARTICLE_10_FAQ_Q}}",
        "answer": "{{ARTICLE_10_FAQ_A}}"
      }
    },
    "catalog/evidence-grade-table.html": {
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
          "body": "{{ARTICLE_11_BODY_1}}"
        },
        {
          "heading": "{{ARTICLE_11_H2_2}}",
          "body": "{{ARTICLE_11_BODY_2}}"
        },
        {
          "heading": "{{ARTICLE_11_H2_3}}",
          "body": "{{ARTICLE_11_BODY_3}}"
        }
      ],
      "faq": {
        "question": "{{ARTICLE_11_FAQ_Q}}",
        "answer": "{{ARTICLE_11_FAQ_A}}"
      },
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
    "catalog/policy-revision-record.html": {
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
          "body": "{{ARTICLE_12_BODY_1}}"
        },
        {
          "heading": "{{ARTICLE_12_H2_2}}",
          "body": "{{ARTICLE_12_BODY_2}}"
        },
        {
          "heading": "{{ARTICLE_12_H2_3}}",
          "body": "{{ARTICLE_12_BODY_3}}"
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

- 链接精炼：输入同一 URL 的锚点与末尾斜线变体，应去重；空输入和全无效输入应报错。
- 样本区间：输入 12,18,21,25，应返回中位数 19.50、均值 19、跨度 13；含非数字应报错。
- 比例对照：24 到 28，应返回 +4.00 个百分点与相对 +16.67%；基线 0 时明确相对值不可算。
- 复核日历：核对日 2026-09-01、观察日 2026-09-20、周期 30 天，应返回 19 天前核对、剩 11 天。
- 来源分级：权威 4、直接 4、距今 20 天、佐证 2、冲突 0，应返回分数和分级；超范围输入应报错。

## Workflow role map

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "article.html",
  "articles": [
    "catalog/account-access-record.html",
    "catalog/fee-reference-card.html",
    "catalog/source-provenance-record.html",
    "catalog/identity-check-index.html",
    "catalog/transfer-observation-sheet.html",
    "catalog/recovery-reference-file.html",
    "catalog/order-mechanism-note.html",
    "catalog/volatility-context-card.html",
    "catalog/custody-question-list.html",
    "catalog/review-calendar-entry.html",
    "catalog/evidence-grade-table.html",
    "catalog/policy-revision-record.html"
  ],
  "cornerstones": [
    "catalog/fee-reference-card.html",
    "catalog/order-mechanism-note.html"
  ],
  "registrationGuide": "catalog/account-access-record.html",
  "articleCovers": {
    "catalog/account-access-record.html": {
      "display": "assets/covers/account-access-record.webp",
      "og": "assets/covers/account-access-record.png"
    },
    "catalog/fee-reference-card.html": {
      "display": "assets/covers/fee-reference-card.webp",
      "og": "assets/covers/fee-reference-card.png"
    },
    "catalog/source-provenance-record.html": {
      "display": "assets/covers/source-provenance-record.webp",
      "og": "assets/covers/source-provenance-record.png"
    },
    "catalog/identity-check-index.html": {
      "display": "assets/covers/identity-check-index.webp",
      "og": "assets/covers/identity-check-index.png"
    },
    "catalog/transfer-observation-sheet.html": {
      "display": "assets/covers/transfer-observation-sheet.webp",
      "og": "assets/covers/transfer-observation-sheet.png"
    },
    "catalog/recovery-reference-file.html": {
      "display": "assets/covers/recovery-reference-file.webp",
      "og": "assets/covers/recovery-reference-file.png"
    },
    "catalog/order-mechanism-note.html": {
      "display": "assets/covers/order-mechanism-note.webp",
      "og": "assets/covers/order-mechanism-note.png"
    },
    "catalog/volatility-context-card.html": {
      "display": "assets/covers/volatility-context-card.webp",
      "og": "assets/covers/volatility-context-card.png"
    },
    "catalog/custody-question-list.html": {
      "display": "assets/covers/custody-question-list.webp",
      "og": "assets/covers/custody-question-list.png"
    },
    "catalog/review-calendar-entry.html": {
      "display": "assets/covers/review-calendar-entry.webp",
      "og": "assets/covers/review-calendar-entry.png"
    },
    "catalog/evidence-grade-table.html": {
      "display": "assets/covers/evidence-grade-table.webp",
      "og": "assets/covers/evidence-grade-table.png"
    },
    "catalog/policy-revision-record.html": {
      "display": "assets/covers/policy-revision-record.webp",
      "og": "assets/covers/policy-revision-record.png"
    }
  },
  "categories": [
    {
      "path": "collections/baseline-register.html",
      "label": "{{COLLECTION_01_NAME}}",
      "intro": "{{COLLECTION_01_DESC}}",
      "articles": [
        "catalog/account-access-record.html",
        "catalog/fee-reference-card.html",
        "catalog/identity-check-index.html",
        "catalog/policy-revision-record.html"
      ]
    },
    {
      "path": "collections/process-cabinet.html",
      "label": "{{COLLECTION_02_NAME}}",
      "intro": "{{COLLECTION_02_DESC}}",
      "articles": [
        "catalog/transfer-observation-sheet.html",
        "catalog/order-mechanism-note.html",
        "catalog/volatility-context-card.html",
        "catalog/review-calendar-entry.html"
      ]
    },
    {
      "path": "collections/evidence-vault.html",
      "label": "{{COLLECTION_03_NAME}}",
      "intro": "{{COLLECTION_03_DESC}}",
      "articles": [
        "catalog/source-provenance-record.html",
        "catalog/recovery-reference-file.html",
        "catalog/custody-question-list.html",
        "catalog/evidence-grade-table.html"
      ]
    }
  ],
  "toolIndex": "tool.html",
  "tools": [
    "workbench/link-refiner.html",
    "workbench/range-summarizer.html",
    "workbench/rate-comparator.html",
    "workbench/freshness-calendar.html",
    "workbench/source-scorecard.html"
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
