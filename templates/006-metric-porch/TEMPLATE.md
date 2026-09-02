# 006-metric-porch · Workflow-ready v2

## 定位

深海军蓝数据编辑台模板。首页以监测总台、识别码控制台、三张编辑桌、简报库与计算实验室组织内容；文章使用快照看板、公式说明板和双栏比较板三种结构。它保留旧版门廊看板的数字新闻室气质，但不写死演示数字、日期、平台事实或注册步骤。

本目录只提供网站模板 UI、内容槽位、工具逻辑与通用视觉资产。下游 AI 只需替换站点变量并填写经核实的文章文字，不需要重新设计 UI、补页面、写工具或生成通用封面。

## 全局变量

| 变量 | 用途 |
|---|---|
| `{{SITE_NAME}}` / `{{BRAND_EN}}` | 中文站名与英文/罗马字 wordmark |
| `{{SITE_DOMAIN}}` / `{{LANG}}` | 域名（不带协议）与语言代码 |
| `{{SITE_TAGLINE}}` / `{{SITE_DESC}}` | 首页定位句与站点描述 |
| `{{ISSUE_NUMBER}}` | 当前期号 |
| `{{INVITE_CODE}}` | 首页可复制邀请码 |
| `{{BENEFIT_RATE}}` / `{{BENEFIT_DISCLAIMER}}` | 弹性利益比例与政策变化脚注 |
| `{{AFFILIATE_URL}}` / `{{AFFILIATE_LINK_LABEL}}` / `{{AFFILIATE_DISCLOSURE}}` | 唯一推广链接槽位、锚文本与紧邻披露 |
| `{{AUTHOR_NAME}}` / `{{REVIEWER_NAME}}` | 作者与复核者笔名 |
| `{{UPDATED_DATE}}` / `{{EFFECTIVE_DATE}}` | 内容修改与合规生效日期 |
| `{{CONTACT_EMAIL}}` / `{{SECURITY_EXPIRES_ISO}}` | 联系邮箱与 security.txt 失效时间 |
| `{{RSS_PUB_DATE}}` | RSS 日期 |
| `{{DESK_01_DESC}}` / `{{DESK_02_DESC}}` / `{{DESK_03_DESC}}` | 三张编辑桌简介 |
| `{{ARTICLE_INDEX_DESC}}` / `{{ARTICLE_INDEX_LEAD}}` | 简报索引描述与导语 |
| `{{TOOL_INDEX_DESC}}` / `{{TOOL_INDEX_LEAD}}` | 工具索引描述与导语 |

## 合规页槽位

关于：`{{ABOUT_LEAD}}`、`{{ABOUT_BODY_1}}`、`{{ABOUT_BODY_2}}`、`{{ABOUT_BODY_3}}`。

联系：`{{CONTACT_LEAD}}`、`{{CONTACT_BODY_1}}`、`{{CONTACT_BODY_2}}`、`{{CONTACT_BODY_3}}`。

推广披露：`{{DISCLOSURE_LEAD}}`、`{{DISCLOSURE_BODY_1}}`、`{{DISCLOSURE_BODY_2}}`、`{{DISCLOSURE_BODY_3}}`。

免责声明：`{{DISCLAIMER_LEAD}}`、`{{DISCLAIMER_BODY_1}}`、`{{DISCLAIMER_BODY_2}}`、`{{DISCLAIMER_BODY_3}}`。

隐私：`{{PRIVACY_LEAD}}`、`{{PRIVACY_BODY_1}}`、`{{PRIVACY_BODY_2}}`、`{{PRIVACY_BODY_3}}`。

更正：`{{CORRECTIONS_LEAD}}`、`{{CORRECTIONS_BODY_1}}`、`{{CORRECTIONS_BODY_2}}`、`{{CORRECTIONS_BODY_3}}`。

编辑规约：`{{EDITORIAL_LEAD}}`、`{{EDITORIAL_BODY_1}}`、`{{EDITORIAL_BODY_2}}`、`{{EDITORIAL_BODY_3}}`。

## 下游 AI 接入

1. 先替换全局变量，再按下方映射填写 12 篇文章；标题、事实、数字、时间窗口、公式、来源与 FAQ 均需核实。
2. `registrationGuide` 只是转换页面角色的 UI 外壳，不含教程正文；只能保留一个 `{{AFFILIATE_URL}}`，并保留完整 rel 与紧邻披露。
3. 三张编辑桌、简报索引、首页宽内链、十二套封面、七个合规页与五个工具已接线。
4. 工具仅处理浏览器本地输入；公式变化后复测正常、错误、边界、重置与复制。
5. GA4 整块默认注释，只有单站流程授权并同步隐私/CSP 后才启用。

## 内容槽位映射

```json content-slots-v1
{
  "articles": {
    "briefs/access-baseline.html": {
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
      },
      "readout": "{{ARTICLE_01_READOUT}}",
      "readoutNote": "{{ARTICLE_01_READOUT_NOTE}}",
      "signals": [
        "{{ARTICLE_01_SIGNAL_1}}",
        "{{ARTICLE_01_SIGNAL_2}}",
        "{{ARTICLE_01_SIGNAL_3}}"
      ]
    },
    "briefs/fee-definition-sheet.html": {
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
      "formula": "{{ARTICLE_02_FORMULA}}",
      "formulaNote": "{{ARTICLE_02_FORMULA_NOTE}}",
      "terms": [
        {
          "term": "{{ARTICLE_02_TERM_1}}",
          "definition": "{{ARTICLE_02_DEFINITION_1}"
        },
        {
          "term": "{{ARTICLE_02_TERM_2}}",
          "definition": "{{ARTICLE_02_DEFINITION_2}"
        },
        {
          "term": "{{ARTICLE_02_TERM_3}}",
          "definition": "{{ARTICLE_02_DEFINITION_3}"
        }
      ]
    },
    "briefs/source-confidence-panel.html": {
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
      "quote": "{{ARTICLE_03_QUOTE}}",
      "comparison": [
        "{{ARTICLE_03_COMPARE_VALUE_1}}",
        "{{ARTICLE_03_COMPARE_VALUE_2}}"
      ]
    },
    "briefs/identity-signal-note.html": {
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
      },
      "readout": "{{ARTICLE_04_READOUT}}",
      "readoutNote": "{{ARTICLE_04_READOUT_NOTE}}",
      "signals": [
        "{{ARTICLE_04_SIGNAL_1}}",
        "{{ARTICLE_04_SIGNAL_2}}",
        "{{ARTICLE_04_SIGNAL_3}}"
      ]
    },
    "briefs/transfer-latency-board.html": {
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
      "quote": "{{ARTICLE_05_QUOTE}}",
      "comparison": [
        "{{ARTICLE_05_COMPARE_VALUE_1}}",
        "{{ARTICLE_05_COMPARE_VALUE_2}}"
      ]
    },
    "briefs/recovery-threshold-card.html": {
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
      "formula": "{{ARTICLE_06_FORMULA}}",
      "formulaNote": "{{ARTICLE_06_FORMULA_NOTE}}",
      "terms": [
        {
          "term": "{{ARTICLE_06_TERM_1}}",
          "definition": "{{ARTICLE_06_DEFINITION_1}"
        },
        {
          "term": "{{ARTICLE_06_TERM_2}}",
          "definition": "{{ARTICLE_06_DEFINITION_2}"
        },
        {
          "term": "{{ARTICLE_06_TERM_3}}",
          "definition": "{{ARTICLE_06_DEFINITION_3}"
        }
      ]
    },
    "briefs/order-measurement-protocol.html": {
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
      },
      "formula": "{{ARTICLE_07_FORMULA}}",
      "formulaNote": "{{ARTICLE_07_FORMULA_NOTE}}",
      "terms": [
        {
          "term": "{{ARTICLE_07_TERM_1}}",
          "definition": "{{ARTICLE_07_DEFINITION_1}"
        },
        {
          "term": "{{ARTICLE_07_TERM_2}}",
          "definition": "{{ARTICLE_07_DEFINITION_2}"
        },
        {
          "term": "{{ARTICLE_07_TERM_3}}",
          "definition": "{{ARTICLE_07_DEFINITION_3}"
        }
      ]
    },
    "briefs/volatility-window-note.html": {
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
      "readout": "{{ARTICLE_08_READOUT}}",
      "readoutNote": "{{ARTICLE_08_READOUT_NOTE}}",
      "signals": [
        "{{ARTICLE_08_SIGNAL_1}}",
        "{{ARTICLE_08_SIGNAL_2}}",
        "{{ARTICLE_08_SIGNAL_3}}"
      ]
    },
    "briefs/custody-control-matrix.html": {
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
      "quote": "{{ARTICLE_09_QUOTE}}",
      "comparison": [
        "{{ARTICLE_09_COMPARE_VALUE_1}}",
        "{{ARTICLE_09_COMPARE_VALUE_2}}"
      ]
    },
    "briefs/review-cadence-meter.html": {
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
      },
      "readout": "{{ARTICLE_10_READOUT}}",
      "readoutNote": "{{ARTICLE_10_READOUT_NOTE}}",
      "signals": [
        "{{ARTICLE_10_SIGNAL_1}}",
        "{{ARTICLE_10_SIGNAL_2}}",
        "{{ARTICLE_10_SIGNAL_3}}"
      ]
    },
    "briefs/evidence-quality-score.html": {
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
      "formula": "{{ARTICLE_11_FORMULA}}",
      "formulaNote": "{{ARTICLE_11_FORMULA_NOTE}}",
      "terms": [
        {
          "term": "{{ARTICLE_11_TERM_1}}",
          "definition": "{{ARTICLE_11_DEFINITION_1}"
        },
        {
          "term": "{{ARTICLE_11_TERM_2}}",
          "definition": "{{ARTICLE_11_DEFINITION_2}"
        },
        {
          "term": "{{ARTICLE_11_TERM_3}}",
          "definition": "{{ARTICLE_11_DEFINITION_3}"
        }
      ]
    },
    "briefs/policy-drift-monitor.html": {
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
      "quote": "{{ARTICLE_12_QUOTE}}",
      "comparison": [
        "{{ARTICLE_12_COMPARE_VALUE_1}}",
        "{{ARTICLE_12_COMPARE_VALUE_2}}"
      ]
    }
  }
}
```

## 工具验收样例

- 占比拆解：30 / 120 → 25%、剩余 90、比例 1:4；部分大于总体报错。
- 变化桥接：80 → 92 → +12、+15%；前值为 0 报错。
- 加权覆盖：关键 6/8、普通 15/20、权重 3 → 75 加权分；已核数超过总数报错。
- 资料鲜度：资料日 2026-09-01、参照日 2026-09-03、阈值 3 天 → 2 天且仍在窗口；日期倒置报错。
- 抽样间距：总体 240、样本 24、周期 12 天 → 每 10 条取 1 条、覆盖 10%、日均 2 条；样本超过总体报错。

## Workflow role map

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "article.html",
  "articles": [
    "briefs/access-baseline.html",
    "briefs/fee-definition-sheet.html",
    "briefs/source-confidence-panel.html",
    "briefs/identity-signal-note.html",
    "briefs/transfer-latency-board.html",
    "briefs/recovery-threshold-card.html",
    "briefs/order-measurement-protocol.html",
    "briefs/volatility-window-note.html",
    "briefs/custody-control-matrix.html",
    "briefs/review-cadence-meter.html",
    "briefs/evidence-quality-score.html",
    "briefs/policy-drift-monitor.html"
  ],
  "cornerstones": [
    "briefs/fee-definition-sheet.html",
    "briefs/order-measurement-protocol.html"
  ],
  "registrationGuide": "briefs/access-baseline.html",
  "articleCovers": {
    "briefs/access-baseline.html": {
      "display": "assets/covers/access-baseline.webp",
      "og": "assets/covers/access-baseline.png"
    },
    "briefs/fee-definition-sheet.html": {
      "display": "assets/covers/fee-definition-sheet.webp",
      "og": "assets/covers/fee-definition-sheet.png"
    },
    "briefs/source-confidence-panel.html": {
      "display": "assets/covers/source-confidence-panel.webp",
      "og": "assets/covers/source-confidence-panel.png"
    },
    "briefs/identity-signal-note.html": {
      "display": "assets/covers/identity-signal-note.webp",
      "og": "assets/covers/identity-signal-note.png"
    },
    "briefs/transfer-latency-board.html": {
      "display": "assets/covers/transfer-latency-board.webp",
      "og": "assets/covers/transfer-latency-board.png"
    },
    "briefs/recovery-threshold-card.html": {
      "display": "assets/covers/recovery-threshold-card.webp",
      "og": "assets/covers/recovery-threshold-card.png"
    },
    "briefs/order-measurement-protocol.html": {
      "display": "assets/covers/order-measurement-protocol.webp",
      "og": "assets/covers/order-measurement-protocol.png"
    },
    "briefs/volatility-window-note.html": {
      "display": "assets/covers/volatility-window-note.webp",
      "og": "assets/covers/volatility-window-note.png"
    },
    "briefs/custody-control-matrix.html": {
      "display": "assets/covers/custody-control-matrix.webp",
      "og": "assets/covers/custody-control-matrix.png"
    },
    "briefs/review-cadence-meter.html": {
      "display": "assets/covers/review-cadence-meter.webp",
      "og": "assets/covers/review-cadence-meter.png"
    },
    "briefs/evidence-quality-score.html": {
      "display": "assets/covers/evidence-quality-score.webp",
      "og": "assets/covers/evidence-quality-score.png"
    },
    "briefs/policy-drift-monitor.html": {
      "display": "assets/covers/policy-drift-monitor.webp",
      "og": "assets/covers/policy-drift-monitor.png"
    }
  },
  "categories": [
    {
      "path": "desks/definitions.html",
      "label": "口径定义桌",
      "intro": "{{DESK_01_DESC}}",
      "articles": [
        "briefs/access-baseline.html",
        "briefs/fee-definition-sheet.html",
        "briefs/identity-signal-note.html",
        "briefs/policy-drift-monitor.html"
      ]
    },
    {
      "path": "desks/benchmarks.html",
      "label": "窗口比较桌",
      "intro": "{{DESK_02_DESC}}",
      "articles": [
        "briefs/transfer-latency-board.html",
        "briefs/order-measurement-protocol.html",
        "briefs/volatility-window-note.html",
        "briefs/review-cadence-meter.html"
      ]
    },
    {
      "path": "desks/verification.html",
      "label": "证据复核桌",
      "intro": "{{DESK_03_DESC}}",
      "articles": [
        "briefs/source-confidence-panel.html",
        "briefs/recovery-threshold-card.html",
        "briefs/custody-control-matrix.html",
        "briefs/evidence-quality-score.html"
      ]
    }
  ],
  "toolIndex": "tool.html",
  "tools": [
    "lab/share-decomposer.html",
    "lab/change-bridge.html",
    "lab/weighted-coverage.html",
    "lab/freshness-clock.html",
    "lab/sample-spacing.html"
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
