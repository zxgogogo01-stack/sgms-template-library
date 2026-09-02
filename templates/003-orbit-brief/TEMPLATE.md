# 003-orbit-brief · Workflow-ready v2

## 定位

轨道信号与任务控制式独立简报模板。首页采用不对称飞行甲板、雷达轨道、窄密度状态轨和三频道信号矩阵；文章使用控制台、环轨和接力三种开场结构。它不复用 001 的账本框架，也不复用 002 的铅印刊物语言。

本目录只提供网站模板 UI、结构和本地工具，不包含可发布文章、注册教程或具体平台事实。下游 AI 只需填写站点变量、经核实的文字和文章内容，不需要补页面、设计组件、写工具逻辑或生成通用视觉资产。

## 全局变量

| 变量 | 用途 |
|---|---|
| `{{SITE_NAME}}` | 中文站名 |
| `{{BRAND_EN}}` | 英文或罗马字 wordmark |
| `{{SITE_DOMAIN}}` | 域名，不带协议 |
| `{{SITE_TAGLINE}}` | 首页定位句 |
| `{{SITE_DESC}}` | 首页与 RSS 描述 |
| `{{LANG}}` | HTML 语言代码 |
| `{{ISSUE_NUMBER}}` | 当前期号 |
| `{{INVITE_CODE}}` | 邀请码明文 |
| `{{BENEFIT_RATE}}` | 经核实的弹性利益比例 |
| `{{BENEFIT_DISCLAIMER}}` | 资格、期限与政策变化脚注 |
| `{{DISCLAIMER_LEAD}}` | 免责声明页导语 |
| `{{DISCLAIMER_BODY_1}}` | 免责声明的信息用途说明 |
| `{{AFFILIATE_URL}}` | 唯一推广链接槽位 |
| `{{AFFILIATE_LINK_LABEL}}` | 推广链接锚文本 |
| `{{AFFILIATE_DISCLOSURE}}` | 紧邻推广披露 |
| `{{AUTHOR_NAME}}` | 作者笔名 |
| `{{REVIEWER_NAME}}` | 复核者笔名 |
| `{{PUBLISHED_DATE}}` | 首次发布日期 |
| `{{UPDATED_DATE}}` | 最近修改日期 |
| `{{EFFECTIVE_DATE}}` | 合规页生效日期 |
| `{{CONTACT_EMAIL}}` | 编辑与安全联系邮箱 |
| `{{SECURITY_EXPIRES_ISO}}` | security.txt 未来失效时间 |
| `{{RSS_PUB_DATE}}` | RSS 2.0 日期 |

## 下游 AI 接入

1. 先替换全局变量，再按内容槽位映射填写 12 篇文章。页面标题、正文、FAQ、数据、来源和日期都必须用核实后的内容。
2. `registrationGuide` 仅是建站工作流需要的页面角色与 UI 外壳，不含教程正文；保留唯一 `{{AFFILIATE_URL}}`、完整 rel、紧邻披露和邀请码变量。
3. 三频道、文章索引、首页宽内链、封面、社交图、七合规页与五个工具均已接线。增加文章时沿用现有文章版式之一，并同步更新聚合面。
4. 工具算法只处理用户输入，不抓实时行情。若改变公式，必须重跑正常、错误、边界、重置与复制测试。
5. GA4 代码默认整块注释。只有单站流程明确授权并完成隐私与 CSP 配置后才可启用。

## 内容槽位映射

```json content-slots-v1
{
  "articles": {
    "transmissions/account-entry-telemetry.html": {
      "title": "{{ARTICLE_01_TITLE}}",
      "description": "{{ARTICLE_01_DESC}}",
      "lead": "{{ARTICLE_01_LEAD}}",
      "coverAlt": "{{ARTICLE_01_COVER_ALT}}",
      "coverCaption": "{{ARTICLE_01_COVER_CAPTION}}",
      "sourceNote": "{{ARTICLE_01_SOURCE_NOTE}}",
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
      "metrics": [
        "{{ARTICLE_01_METRIC_1}}",
        "{{ARTICLE_01_METRIC_2}}",
        "{{ARTICLE_01_METRIC_3}}"
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
    "transmissions/fee-signal-baseline.html": {
      "title": "{{ARTICLE_02_TITLE}}",
      "description": "{{ARTICLE_02_DESC}}",
      "lead": "{{ARTICLE_02_LEAD}}",
      "coverAlt": "{{ARTICLE_02_COVER_ALT}}",
      "coverCaption": "{{ARTICLE_02_COVER_CAPTION}}",
      "sourceNote": "{{ARTICLE_02_SOURCE_NOTE}}",
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
        },
        {
          "heading": "{{ARTICLE_02_H2_4}}",
          "body": "{{ARTICLE_02_BODY_4}}"
        }
      ],
      "pullquote": "{{ARTICLE_02_PULLQUOTE}}",
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
    "transmissions/source-latency-check.html": {
      "title": "{{ARTICLE_03_TITLE}}",
      "description": "{{ARTICLE_03_DESC}}",
      "lead": "{{ARTICLE_03_LEAD}}",
      "coverAlt": "{{ARTICLE_03_COVER_ALT}}",
      "coverCaption": "{{ARTICLE_03_COVER_CAPTION}}",
      "sourceNote": "{{ARTICLE_03_SOURCE_NOTE}}",
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
      "marginNote": "{{ARTICLE_03_MARGIN_NOTE}}",
      "steps": [
        "{{ARTICLE_03_STEP_1}}",
        "{{ARTICLE_03_STEP_2}}",
        "{{ARTICLE_03_STEP_3}}"
      ],
      "faq": [
        {
          "question": "{{ARTICLE_03_FAQ_Q_1}}",
          "answer": "{{ARTICLE_03_FAQ_A_1}}"
        }
      ]
    },
    "transmissions/identity-friction-map.html": {
      "title": "{{ARTICLE_04_TITLE}}",
      "description": "{{ARTICLE_04_DESC}}",
      "lead": "{{ARTICLE_04_LEAD}}",
      "coverAlt": "{{ARTICLE_04_COVER_ALT}}",
      "coverCaption": "{{ARTICLE_04_COVER_CAPTION}}",
      "sourceNote": "{{ARTICLE_04_SOURCE_NOTE}}",
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
      "metrics": [
        "{{ARTICLE_04_METRIC_1}}",
        "{{ARTICLE_04_METRIC_2}}",
        "{{ARTICLE_04_METRIC_3}}"
      ],
      "faq": [
        {
          "question": "{{ARTICLE_04_FAQ_Q_1}}",
          "answer": "{{ARTICLE_04_FAQ_A_1}}"
        },
        {
          "question": "{{ARTICLE_04_FAQ_Q_2}}",
          "answer": "{{ARTICLE_04_FAQ_A_2}}"
        }
      ]
    },
    "transmissions/first-transfer-observation.html": {
      "title": "{{ARTICLE_05_TITLE}}",
      "description": "{{ARTICLE_05_DESC}}",
      "lead": "{{ARTICLE_05_LEAD}}",
      "coverAlt": "{{ARTICLE_05_COVER_ALT}}",
      "coverCaption": "{{ARTICLE_05_COVER_CAPTION}}",
      "sourceNote": "{{ARTICLE_05_SOURCE_NOTE}}",
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
        },
        {
          "heading": "{{ARTICLE_05_H2_4}}",
          "body": "{{ARTICLE_05_BODY_4}}"
        }
      ],
      "pullquote": "{{ARTICLE_05_PULLQUOTE}}",
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
    "transmissions/account-recovery-drill.html": {
      "title": "{{ARTICLE_06_TITLE}}",
      "description": "{{ARTICLE_06_DESC}}",
      "lead": "{{ARTICLE_06_LEAD}}",
      "coverAlt": "{{ARTICLE_06_COVER_ALT}}",
      "coverCaption": "{{ARTICLE_06_COVER_CAPTION}}",
      "sourceNote": "{{ARTICLE_06_SOURCE_NOTE}}",
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
      "marginNote": "{{ARTICLE_06_MARGIN_NOTE}}",
      "steps": [
        "{{ARTICLE_06_STEP_1}}",
        "{{ARTICLE_06_STEP_2}}",
        "{{ARTICLE_06_STEP_3}}"
      ],
      "faq": [
        {
          "question": "{{ARTICLE_06_FAQ_Q_1}}",
          "answer": "{{ARTICLE_06_FAQ_A_1}}"
        }
      ]
    },
    "transmissions/order-routing-notes.html": {
      "title": "{{ARTICLE_07_TITLE}}",
      "description": "{{ARTICLE_07_DESC}}",
      "lead": "{{ARTICLE_07_LEAD}}",
      "coverAlt": "{{ARTICLE_07_COVER_ALT}}",
      "coverCaption": "{{ARTICLE_07_COVER_CAPTION}}",
      "sourceNote": "{{ARTICLE_07_SOURCE_NOTE}}",
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
      "metrics": [
        "{{ARTICLE_07_METRIC_1}}",
        "{{ARTICLE_07_METRIC_2}}",
        "{{ARTICLE_07_METRIC_3}}"
      ],
      "faq": [
        {
          "question": "{{ARTICLE_07_FAQ_Q_1}}",
          "answer": "{{ARTICLE_07_FAQ_A_1}}"
        },
        {
          "question": "{{ARTICLE_07_FAQ_Q_2}}",
          "answer": "{{ARTICLE_07_FAQ_A_2}}"
        }
      ]
    },
    "transmissions/volatility-window.html": {
      "title": "{{ARTICLE_08_TITLE}}",
      "description": "{{ARTICLE_08_DESC}}",
      "lead": "{{ARTICLE_08_LEAD}}",
      "coverAlt": "{{ARTICLE_08_COVER_ALT}}",
      "coverCaption": "{{ARTICLE_08_COVER_CAPTION}}",
      "sourceNote": "{{ARTICLE_08_SOURCE_NOTE}}",
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
      "pullquote": "{{ARTICLE_08_PULLQUOTE}}",
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
    "transmissions/custody-checklist.html": {
      "title": "{{ARTICLE_09_TITLE}}",
      "description": "{{ARTICLE_09_DESC}}",
      "lead": "{{ARTICLE_09_LEAD}}",
      "coverAlt": "{{ARTICLE_09_COVER_ALT}}",
      "coverCaption": "{{ARTICLE_09_COVER_CAPTION}}",
      "sourceNote": "{{ARTICLE_09_SOURCE_NOTE}}",
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
      "marginNote": "{{ARTICLE_09_MARGIN_NOTE}}",
      "steps": [
        "{{ARTICLE_09_STEP_1}}",
        "{{ARTICLE_09_STEP_2}}",
        "{{ARTICLE_09_STEP_3}}"
      ],
      "faq": [
        {
          "question": "{{ARTICLE_09_FAQ_Q_1}}",
          "answer": "{{ARTICLE_09_FAQ_A_1}}"
        }
      ]
    },
    "transmissions/recurring-review-cadence.html": {
      "title": "{{ARTICLE_10_TITLE}}",
      "description": "{{ARTICLE_10_DESC}}",
      "lead": "{{ARTICLE_10_LEAD}}",
      "coverAlt": "{{ARTICLE_10_COVER_ALT}}",
      "coverCaption": "{{ARTICLE_10_COVER_CAPTION}}",
      "sourceNote": "{{ARTICLE_10_SOURCE_NOTE}}",
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
      "metrics": [
        "{{ARTICLE_10_METRIC_1}}",
        "{{ARTICLE_10_METRIC_2}}",
        "{{ARTICLE_10_METRIC_3}}"
      ],
      "faq": [
        {
          "question": "{{ARTICLE_10_FAQ_Q_1}}",
          "answer": "{{ARTICLE_10_FAQ_A_1}}"
        },
        {
          "question": "{{ARTICLE_10_FAQ_Q_2}}",
          "answer": "{{ARTICLE_10_FAQ_A_2}}"
        }
      ]
    },
    "transmissions/evidence-confidence-scale.html": {
      "title": "{{ARTICLE_11_TITLE}}",
      "description": "{{ARTICLE_11_DESC}}",
      "lead": "{{ARTICLE_11_LEAD}}",
      "coverAlt": "{{ARTICLE_11_COVER_ALT}}",
      "coverCaption": "{{ARTICLE_11_COVER_CAPTION}}",
      "sourceNote": "{{ARTICLE_11_SOURCE_NOTE}}",
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
      "pullquote": "{{ARTICLE_11_PULLQUOTE}}",
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
    "transmissions/policy-change-log.html": {
      "title": "{{ARTICLE_12_TITLE}}",
      "description": "{{ARTICLE_12_DESC}}",
      "lead": "{{ARTICLE_12_LEAD}}",
      "coverAlt": "{{ARTICLE_12_COVER_ALT}}",
      "coverCaption": "{{ARTICLE_12_COVER_CAPTION}}",
      "sourceNote": "{{ARTICLE_12_SOURCE_NOTE}}",
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
      "marginNote": "{{ARTICLE_12_MARGIN_NOTE}}",
      "steps": [
        "{{ARTICLE_12_STEP_1}}",
        "{{ARTICLE_12_STEP_2}}",
        "{{ARTICLE_12_STEP_3}}"
      ],
      "faq": [
        {
          "question": "{{ARTICLE_12_FAQ_Q_1}}",
          "answer": "{{ARTICLE_12_FAQ_A_1}}"
        }
      ]
    }
  },
  "channels": {
    "01": {
      "name": "{{CHANNEL_01_NAME}}",
      "description": "{{CHANNEL_01_DESC}}"
    },
    "02": {
      "name": "{{CHANNEL_02_NAME}}",
      "description": "{{CHANNEL_02_DESC}}"
    },
    "03": {
      "name": "{{CHANNEL_03_NAME}}",
      "description": "{{CHANNEL_03_DESC}}"
    }
  }
}
```

## 工具验收样例

- 观察窗：2026-09-01 至 2026-09-15、间隔 7 天，应得到 14 天、3 个检查点；结束日早于起始日应报错。
- 留存漂移：24 到 28，应得到 +4.00 个百分点、相对 +16.67%；基线 0 时应明确相对变化不可计算。
- 样本区间：42/100，应得到比例 42.00% 及 Wilson 95% 区间；成功数大于总数应报错。
- 事件归一：360 个事件、120 人、14 天，应得到人均 3、日均约 25.71、人日均约 0.214。
- 信号优先：证据 4、影响 4、时效 3、工作量 2，应返回分数和分级；工作量 0 应报错。

## Workflow role map

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "article.html",
  "articles": [
    "transmissions/account-entry-telemetry.html",
    "transmissions/fee-signal-baseline.html",
    "transmissions/source-latency-check.html",
    "transmissions/identity-friction-map.html",
    "transmissions/first-transfer-observation.html",
    "transmissions/account-recovery-drill.html",
    "transmissions/order-routing-notes.html",
    "transmissions/volatility-window.html",
    "transmissions/custody-checklist.html",
    "transmissions/recurring-review-cadence.html",
    "transmissions/evidence-confidence-scale.html",
    "transmissions/policy-change-log.html"
  ],
  "cornerstones": [
    "transmissions/fee-signal-baseline.html",
    "transmissions/order-routing-notes.html"
  ],
  "registrationGuide": "transmissions/account-entry-telemetry.html",
  "articleCovers": {
    "transmissions/account-entry-telemetry.html": {
      "display": "assets/covers/account-entry-telemetry.webp",
      "og": "assets/covers/account-entry-telemetry.png"
    },
    "transmissions/fee-signal-baseline.html": {
      "display": "assets/covers/fee-signal-baseline.webp",
      "og": "assets/covers/fee-signal-baseline.png"
    },
    "transmissions/source-latency-check.html": {
      "display": "assets/covers/source-latency-check.webp",
      "og": "assets/covers/source-latency-check.png"
    },
    "transmissions/identity-friction-map.html": {
      "display": "assets/covers/identity-friction-map.webp",
      "og": "assets/covers/identity-friction-map.png"
    },
    "transmissions/first-transfer-observation.html": {
      "display": "assets/covers/first-transfer-observation.webp",
      "og": "assets/covers/first-transfer-observation.png"
    },
    "transmissions/account-recovery-drill.html": {
      "display": "assets/covers/account-recovery-drill.webp",
      "og": "assets/covers/account-recovery-drill.png"
    },
    "transmissions/order-routing-notes.html": {
      "display": "assets/covers/order-routing-notes.webp",
      "og": "assets/covers/order-routing-notes.png"
    },
    "transmissions/volatility-window.html": {
      "display": "assets/covers/volatility-window.webp",
      "og": "assets/covers/volatility-window.png"
    },
    "transmissions/custody-checklist.html": {
      "display": "assets/covers/custody-checklist.webp",
      "og": "assets/covers/custody-checklist.png"
    },
    "transmissions/recurring-review-cadence.html": {
      "display": "assets/covers/recurring-review-cadence.webp",
      "og": "assets/covers/recurring-review-cadence.png"
    },
    "transmissions/evidence-confidence-scale.html": {
      "display": "assets/covers/evidence-confidence-scale.webp",
      "og": "assets/covers/evidence-confidence-scale.png"
    },
    "transmissions/policy-change-log.html": {
      "display": "assets/covers/policy-change-log.webp",
      "og": "assets/covers/policy-change-log.png"
    }
  },
  "categories": [
    {
      "path": "channels/entry-signals.html",
      "label": "{{CHANNEL_01_NAME}}",
      "intro": "{{CHANNEL_01_DESC}}",
      "articles": [
        "transmissions/account-entry-telemetry.html",
        "transmissions/fee-signal-baseline.html",
        "transmissions/identity-friction-map.html",
        "transmissions/policy-change-log.html"
      ]
    },
    {
      "path": "channels/motion-window.html",
      "label": "{{CHANNEL_02_NAME}}",
      "intro": "{{CHANNEL_02_DESC}}",
      "articles": [
        "transmissions/first-transfer-observation.html",
        "transmissions/order-routing-notes.html",
        "transmissions/volatility-window.html",
        "transmissions/recurring-review-cadence.html"
      ]
    },
    {
      "path": "channels/evidence-relay.html",
      "label": "{{CHANNEL_03_NAME}}",
      "intro": "{{CHANNEL_03_DESC}}",
      "articles": [
        "transmissions/source-latency-check.html",
        "transmissions/account-recovery-drill.html",
        "transmissions/custody-checklist.html",
        "transmissions/evidence-confidence-scale.html"
      ]
    }
  ],
  "toolIndex": "tool.html",
  "tools": [
    "observatory/window-scheduler.html",
    "observatory/retention-drift.html",
    "observatory/sample-interval.html",
    "observatory/event-normalizer.html",
    "observatory/signal-priority.html"
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
