# 001-slate-ledger · Workflow-ready v2

## 定位

高密度费率资料站与决策工具站。视觉沿用编辑部台账、编号档案、深色栏头和纸张网格，不使用交易所商标或通用 SaaS 卡片首页。

本模板只提供可复用的网站框架：完整 UI、12 个文章外壳、5 个真工具、7 个合规页、SEO 元数据、内链、RSS、安全联系与社交图均已搭好。目录内不包含可发布文章；所有 `ARTICLE_*` 与 `CATEGORY_*` 内容变量都由后续内容 AI 填写，不需要重做页面结构、类名或响应式。

## 变量替换表

| 变量 | 用途 |
|---|---|
| `{{SITE_NAME}}` | 中文站名 |
| `{{BRAND_EN}}` | 英文或罗马字 wordmark |
| `{{SITE_DOMAIN}}` | 域名，不带协议 |
| `{{SITE_TAGLINE}}` | 一句话定位 |
| `{{SITE_DESC}}` | 首页与 feed 描述 |
| `{{LANG}}` | HTML 语言，如 zh-CN |
| `{{INVITE_CODE}}` | 邀请码明文 |
| `{{BENEFIT_RATE}}` | 经核实的弹性利益比例 |
| `{{BENEFIT_DISCLAIMER}}` | 资格、期限与规则变化脚注 |
| `{{AFFILIATE_URL}}` | 唯一注册推广链接 |
| `{{AUTHOR_NAME}}` | 作者署名 |
| `{{REVIEWER_NAME}}` | 复核者署名 |
| `{{PUBLISHED_DATE}}` | 首次发布日期，ISO 格式 |
| `{{UPDATED_DATE}}` | 最近修改日期，ISO 格式 |
| `{{EFFECTIVE_DATE}}` | 合规页生效日期 |
| `{{CONTACT_EMAIL}}` | 编辑与安全联系邮箱 |
| `{{SECURITY_EXPIRES_ISO}}` | security.txt 未来失效时间 |
| `{{RSS_PUB_DATE}}` | RSS 2.0 日期 |

## 后续 AI 内容接入顺序

1. 全局替换上表变量；保留首页形态 A，不在首页增加注册直链。
2. 按 `article.html` 的 12 个目录位填写 `ARTICLE_*` 内容变量；两个 cornerstone 页面在发布前扩写到至少 5000 个中文字符。
3. `registrationGuide` 只是建站工作流要求的页面角色和 UI 槽位，不含教程正文。内容 AI 填写事实与截图说明时，保留唯一 `{{AFFILIATE_URL}}`、完整 rel、紧邻披露与邀请码复核区。
4. 五个工具的公式和 UI 已完成；只替换说明文字。若事实口径需要改变，先重新审计算法与边界测试。
5. 根据实际运营主体完善 7 个合规页，补齐作者、来源、核对日期与修订记录。
6. 生成最终社交图文字与图标后复跑全部验收；不要启用 GA4 注释块，除非单站发布流程已经完成同意与隐私配置。

## 内容槽位映射

下游内容 AI 按路径填写下列变量；这些变量只承载文字，不改变 HTML 结构、类名、工具逻辑或响应式。

```json content-slots-v1
{
  "articles": {
    "briefs/account-opening-ledger.html": {
      "title": "{{ARTICLE_01_TITLE}}",
      "description": "{{ARTICLE_01_DESC}}",
      "lead": "{{ARTICLE_01_LEAD}}",
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
        },
        {
          "heading": "{{ARTICLE_01_H2_4}}",
          "body": "{{ARTICLE_01_BODY_4}}"
        }
      ],
      "faq": [
        {
          "question": "{{ARTICLE_01_FAQ_Q_1}}",
          "answer": "{{ARTICLE_01_FAQ_A_1}}"
        },
        {
          "question": "{{ARTICLE_01_FAQ_Q_2}}",
          "answer": "{{ARTICLE_01_FAQ_A_2}}"
        }
      ]
    },
    "briefs/fee-schedule-reading.html": {
      "title": "{{ARTICLE_02_TITLE}}",
      "description": "{{ARTICLE_02_DESC}}",
      "lead": "{{ARTICLE_02_LEAD}}",
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
      "faq": []
    },
    "briefs/maker-taker-notes.html": {
      "title": "{{ARTICLE_03_TITLE}}",
      "description": "{{ARTICLE_03_DESC}}",
      "lead": "{{ARTICLE_03_LEAD}}",
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
      "faq": []
    },
    "briefs/order-type-map.html": {
      "title": "{{ARTICLE_04_TITLE}}",
      "description": "{{ARTICLE_04_DESC}}",
      "lead": "{{ARTICLE_04_LEAD}}",
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
      "faq": []
    },
    "briefs/funding-rate-context.html": {
      "title": "{{ARTICLE_05_TITLE}}",
      "description": "{{ARTICLE_05_DESC}}",
      "lead": "{{ARTICLE_05_LEAD}}",
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
      "faq": []
    },
    "briefs/wallet-transfer-route.html": {
      "title": "{{ARTICLE_06_TITLE}}",
      "description": "{{ARTICLE_06_DESC}}",
      "lead": "{{ARTICLE_06_LEAD}}",
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
        },
        {
          "heading": "{{ARTICLE_06_H2_4}}",
          "body": "{{ARTICLE_06_BODY_4}}"
        }
      ],
      "faq": []
    },
    "briefs/withdrawal-review.html": {
      "title": "{{ARTICLE_07_TITLE}}",
      "description": "{{ARTICLE_07_DESC}}",
      "lead": "{{ARTICLE_07_LEAD}}",
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
      "faq": []
    },
    "briefs/risk-budget-framework.html": {
      "title": "{{ARTICLE_08_TITLE}}",
      "description": "{{ARTICLE_08_DESC}}",
      "lead": "{{ARTICLE_08_LEAD}}",
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
        },
        {
          "heading": "{{ARTICLE_08_H2_4}}",
          "body": "{{ARTICLE_08_BODY_4}}"
        }
      ],
      "faq": [
        {
          "question": "{{ARTICLE_08_FAQ_Q_1}}",
          "answer": "{{ARTICLE_08_FAQ_A_1}}"
        }
      ]
    },
    "briefs/position-sizing-cases.html": {
      "title": "{{ARTICLE_09_TITLE}}",
      "description": "{{ARTICLE_09_DESC}}",
      "lead": "{{ARTICLE_09_LEAD}}",
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
      "faq": []
    },
    "briefs/recurring-plan-review.html": {
      "title": "{{ARTICLE_10_TITLE}}",
      "description": "{{ARTICLE_10_DESC}}",
      "lead": "{{ARTICLE_10_LEAD}}",
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
      "faq": []
    },
    "briefs/account-security-review.html": {
      "title": "{{ARTICLE_11_TITLE}}",
      "description": "{{ARTICLE_11_DESC}}",
      "lead": "{{ARTICLE_11_LEAD}}",
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
        },
        {
          "heading": "{{ARTICLE_11_H2_4}}",
          "body": "{{ARTICLE_11_BODY_4}}"
        }
      ],
      "faq": [
        {
          "question": "{{ARTICLE_11_FAQ_Q_1}}",
          "answer": "{{ARTICLE_11_FAQ_A_1}}"
        }
      ]
    },
    "briefs/recordkeeping-system.html": {
      "title": "{{ARTICLE_12_TITLE}}",
      "description": "{{ARTICLE_12_DESC}}",
      "lead": "{{ARTICLE_12_LEAD}}",
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
      "faq": []
    }
  },
  "categories": {
    "01": {
      "name": "{{CATEGORY_01_NAME}}",
      "description": "{{CATEGORY_01_DESC}}"
    },
    "02": {
      "name": "{{CATEGORY_02_NAME}}",
      "description": "{{CATEGORY_02_DESC}}"
    },
    "03": {
      "name": "{{CATEGORY_03_NAME}}",
      "description": "{{CATEGORY_03_DESC}}"
    }
  }
}
```

## 可删除范围

- 不需要费率表时可删除首页 `.filter-bar` 与 `.rate-board`，但应保留邀请卡、文章/工具入口和全站目录。
- 不需要某篇文章时，应在文章目录、首页全站目录、相关阅读、sitemap 与 feed 中同步删除；标准档最终仍需至少 12 篇。
- 不得删除七个合规角色、`registrationGuide` 页面外壳、五个工具、404、feed、sitemap、security.txt 或元数据框架。

## 工具验收样例

- 费率影响：1000 与 0.1 应返回 1；金额 0 应报错并聚焦。
- 风险预算：10000、1、5 应给出预算 100 与理论仓位 2000；风险比例 100 以上应报错。
- 定期分配：1200、12 应返回每次 100；次数必须为 1–365 整数。
- 转账净额：1 与 0.001 应返回 0.999；费用不能大于或等于发送量。
- 往返变化：所有价格必须大于 0，费率不得为负；结果明确显示正负方向。
- 每个工具都要实测正常、空值、边界、错误、重置和复制结果。

## Workflow role map

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "article.html",
  "articles": [
    "briefs/account-opening-ledger.html",
    "briefs/fee-schedule-reading.html",
    "briefs/maker-taker-notes.html",
    "briefs/order-type-map.html",
    "briefs/funding-rate-context.html",
    "briefs/wallet-transfer-route.html",
    "briefs/withdrawal-review.html",
    "briefs/risk-budget-framework.html",
    "briefs/position-sizing-cases.html",
    "briefs/recurring-plan-review.html",
    "briefs/account-security-review.html",
    "briefs/recordkeeping-system.html"
  ],
  "cornerstones": [
    "briefs/risk-budget-framework.html",
    "briefs/account-security-review.html"
  ],
  "registrationGuide": "briefs/account-opening-ledger.html",
  "toolIndex": "tool.html",
  "tools": [
    "workbench/fee-impact.html",
    "workbench/risk-budget.html",
    "workbench/recurring-plan.html",
    "workbench/transfer-buffer.html",
    "workbench/breakeven-spread.html"
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
  },
  "articleCovers": {
    "briefs/account-opening-ledger.html": {
      "display": "assets/covers/account-opening-ledger.webp",
      "og": "assets/covers/account-opening-ledger.png"
    },
    "briefs/fee-schedule-reading.html": {
      "display": "assets/covers/fee-schedule-reading.webp",
      "og": "assets/covers/fee-schedule-reading.png"
    },
    "briefs/maker-taker-notes.html": {
      "display": "assets/covers/maker-taker-notes.webp",
      "og": "assets/covers/maker-taker-notes.png"
    },
    "briefs/order-type-map.html": {
      "display": "assets/covers/order-type-map.webp",
      "og": "assets/covers/order-type-map.png"
    },
    "briefs/funding-rate-context.html": {
      "display": "assets/covers/funding-rate-context.webp",
      "og": "assets/covers/funding-rate-context.png"
    },
    "briefs/wallet-transfer-route.html": {
      "display": "assets/covers/wallet-transfer-route.webp",
      "og": "assets/covers/wallet-transfer-route.png"
    },
    "briefs/withdrawal-review.html": {
      "display": "assets/covers/withdrawal-review.webp",
      "og": "assets/covers/withdrawal-review.png"
    },
    "briefs/risk-budget-framework.html": {
      "display": "assets/covers/risk-budget-framework.webp",
      "og": "assets/covers/risk-budget-framework.png"
    },
    "briefs/position-sizing-cases.html": {
      "display": "assets/covers/position-sizing-cases.webp",
      "og": "assets/covers/position-sizing-cases.png"
    },
    "briefs/recurring-plan-review.html": {
      "display": "assets/covers/recurring-plan-review.webp",
      "og": "assets/covers/recurring-plan-review.png"
    },
    "briefs/account-security-review.html": {
      "display": "assets/covers/account-security-review.webp",
      "og": "assets/covers/account-security-review.png"
    },
    "briefs/recordkeeping-system.html": {
      "display": "assets/covers/recordkeeping-system.webp",
      "og": "assets/covers/recordkeeping-system.png"
    }
  },
  "categories": [
    {
      "path": "registers/cost-mechanics.html",
      "label": "{{CATEGORY_01_NAME}}",
      "intro": "{{CATEGORY_01_DESC}}",
      "articles": [
        "briefs/account-opening-ledger.html",
        "briefs/fee-schedule-reading.html",
        "briefs/maker-taker-notes.html",
        "briefs/order-type-map.html"
      ]
    },
    {
      "path": "registers/transfer-safety.html",
      "label": "{{CATEGORY_02_NAME}}",
      "intro": "{{CATEGORY_02_DESC}}",
      "articles": [
        "briefs/funding-rate-context.html",
        "briefs/wallet-transfer-route.html",
        "briefs/withdrawal-review.html",
        "briefs/account-security-review.html"
      ]
    },
    {
      "path": "registers/planning-records.html",
      "label": "{{CATEGORY_03_NAME}}",
      "intro": "{{CATEGORY_03_DESC}}",
      "articles": [
        "briefs/risk-budget-framework.html",
        "briefs/position-sizing-cases.html",
        "briefs/recurring-plan-review.html",
        "briefs/recordkeeping-system.html"
      ]
    }
  ]
}
```
