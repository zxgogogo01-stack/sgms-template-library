# 002-quiet-quill · Workflow-ready v2

## 定位

高端 letterpress 独立刊物与研究札记模板。核心视觉是居中刊头、铅印纸纹、朱红校样线、编号稿叶和窄栏阅读，不采用 001 的深色台账、横向数据板或同一套组件语言。

本目录只提供网站模板框架，不包含可发布文章或注册教程正文。12 个文章外壳、3 个分类页、5 个真工具、7 个合规页、SEO、内链、RSS、安全联系和视觉资产均已完成；后续 AI 只填写站点变量、经核实的文字与文章内容。

## 全局变量

| 变量 | 用途 |
|---|---|
| `{{SITE_NAME}}` | 中文站名 |
| `{{BRAND_EN}}` | 英文或罗马字刊名 |
| `{{SITE_DOMAIN}}` | 域名，不带协议 |
| `{{SITE_TAGLINE}}` | 一句话定位 |
| `{{SITE_DESC}}` | 首页与 RSS 描述 |
| `{{LANG}}` | HTML 语言代码 |
| `{{INVITE_CODE}}` | 邀请码明文 |
| `{{BENEFIT_RATE}}` | 经核实的弹性利益比例 |
| `{{BENEFIT_DISCLAIMER}}` | 资格、期限与规则变化脚注 |
| `{{AFFILIATE_URL}}` | 唯一推广链接槽位 |
| `{{AUTHOR_NAME}}` | 作者署名 |
| `{{REVIEWER_NAME}}` | 复核者署名 |
| `{{PUBLISHED_DATE}}` | 首次发布日期 |
| `{{UPDATED_DATE}}` | 最近修改日期 |
| `{{EFFECTIVE_DATE}}` | 合规页生效日期 |
| `{{CONTACT_EMAIL}}` | 编辑与安全联系邮箱 |
| `{{SECURITY_EXPIRES_ISO}}` | security.txt 未来失效时间 |
| `{{RSS_PUB_DATE}}` | RSS 2.0 日期 |

## 下游 AI 接入

1. 全局替换上表变量，再按内容槽位映射填写标题、摘要、正文、问答与来源说明。
2. `registrationGuide` 只是建站工作流所需的页面角色和 UI 槽位，不含教程正文；保留唯一 `{{AFFILIATE_URL}}`、完整 rel、紧邻披露和邀请码复核区。
3. 五个工具的 UI 与算法已经完成。只可调整说明文字；改变公式后必须重跑正常、空值、边界、错误、重置与复制测试。
4. 发布前根据实际运营主体完善合规页，填写真实作者、来源和日期。不要启用 GA4 注释块，除非单站流程获得明确授权并补齐隐私与 CSP。

## 内容槽位映射

```json content-slots-v1
{
  "articles": {
    "stories/account-entry-notes.html": {
      "title": "{{ARTICLE_01_TITLE}}",
      "description": "{{ARTICLE_01_DESC}}",
      "kicker": "{{ARTICLE_01_KICKER}}",
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
      "sourceNote": "{{ARTICLE_01_SOURCE_NOTE}}",
      "marginNote": "{{ARTICLE_01_MARGIN_NOTE}}",
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
    "stories/fee-footnote-anatomy.html": {
      "title": "{{ARTICLE_02_TITLE}}",
      "description": "{{ARTICLE_02_DESC}}",
      "kicker": "{{ARTICLE_02_KICKER}}",
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
      "sourceNote": "{{ARTICLE_02_SOURCE_NOTE}}",
      "pullquote": "{{ARTICLE_02_PULLQUOTE}}",
      "closingNote": "{{ARTICLE_02_CLOSING_NOTE}}"
    },
    "stories/evidence-date-line.html": {
      "title": "{{ARTICLE_03_TITLE}}",
      "description": "{{ARTICLE_03_DESC}}",
      "kicker": "{{ARTICLE_03_KICKER}}",
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
        },
        {
          "heading": "{{ARTICLE_03_H2_4}}",
          "body": "{{ARTICLE_03_BODY_4}}"
        }
      ],
      "sourceNote": "{{ARTICLE_03_SOURCE_NOTE}}",
      "faq": [
        {
          "question": "{{ARTICLE_03_FAQ_Q_1}}",
          "answer": "{{ARTICLE_03_FAQ_A_1}}"
        }
      ]
    },
    "stories/order-choice-matrix.html": {
      "title": "{{ARTICLE_04_TITLE}}",
      "description": "{{ARTICLE_04_DESC}}",
      "kicker": "{{ARTICLE_04_KICKER}}",
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
      "sourceNote": "{{ARTICLE_04_SOURCE_NOTE}}",
      "marginNote": "{{ARTICLE_04_MARGIN_NOTE}}",
      "closingNote": "{{ARTICLE_04_CLOSING_NOTE}}"
    },
    "stories/volatility-context-sheet.html": {
      "title": "{{ARTICLE_05_TITLE}}",
      "description": "{{ARTICLE_05_DESC}}",
      "kicker": "{{ARTICLE_05_KICKER}}",
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
        },
        {
          "heading": "{{ARTICLE_05_H2_4}}",
          "body": "{{ARTICLE_05_BODY_4}}"
        }
      ],
      "sourceNote": "{{ARTICLE_05_SOURCE_NOTE}}",
      "pullquote": "{{ARTICLE_05_PULLQUOTE}}",
      "faq": [
        {
          "question": "{{ARTICLE_05_FAQ_Q_1}}",
          "answer": "{{ARTICLE_05_FAQ_A_1}}"
        }
      ]
    },
    "stories/transfer-checkpoints.html": {
      "title": "{{ARTICLE_06_TITLE}}",
      "description": "{{ARTICLE_06_DESC}}",
      "kicker": "{{ARTICLE_06_KICKER}}",
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
        },
        {
          "heading": "{{ARTICLE_06_H2_5}}",
          "body": "{{ARTICLE_06_BODY_5}}"
        }
      ],
      "sourceNote": "{{ARTICLE_06_SOURCE_NOTE}}",
      "closingNote": "{{ARTICLE_06_CLOSING_NOTE}}"
    },
    "stories/access-recovery-notes.html": {
      "title": "{{ARTICLE_07_TITLE}}",
      "description": "{{ARTICLE_07_DESC}}",
      "kicker": "{{ARTICLE_07_KICKER}}",
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
      "sourceNote": "{{ARTICLE_07_SOURCE_NOTE}}",
      "marginNote": "{{ARTICLE_07_MARGIN_NOTE}}",
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
    "stories/risk-language-framework.html": {
      "title": "{{ARTICLE_08_TITLE}}",
      "description": "{{ARTICLE_08_DESC}}",
      "kicker": "{{ARTICLE_08_KICKER}}",
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
        },
        {
          "heading": "{{ARTICLE_08_H2_5}}",
          "body": "{{ARTICLE_08_BODY_5}}"
        }
      ],
      "sourceNote": "{{ARTICLE_08_SOURCE_NOTE}}",
      "pullquote": "{{ARTICLE_08_PULLQUOTE}}",
      "faq": [
        {
          "question": "{{ARTICLE_08_FAQ_Q_1}}",
          "answer": "{{ARTICLE_08_FAQ_A_1}}"
        }
      ]
    },
    "stories/position-note-cases.html": {
      "title": "{{ARTICLE_09_TITLE}}",
      "description": "{{ARTICLE_09_DESC}}",
      "kicker": "{{ARTICLE_09_KICKER}}",
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
        },
        {
          "heading": "{{ARTICLE_09_H2_4}}",
          "body": "{{ARTICLE_09_BODY_4}}"
        }
      ],
      "sourceNote": "{{ARTICLE_09_SOURCE_NOTE}}",
      "closingNote": "{{ARTICLE_09_CLOSING_NOTE}}"
    },
    "stories/recurring-review-rhythm.html": {
      "title": "{{ARTICLE_10_TITLE}}",
      "description": "{{ARTICLE_10_DESC}}",
      "kicker": "{{ARTICLE_10_KICKER}}",
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
      "sourceNote": "{{ARTICLE_10_SOURCE_NOTE}}",
      "marginNote": "{{ARTICLE_10_MARGIN_NOTE}}",
      "faq": [
        {
          "question": "{{ARTICLE_10_FAQ_Q_1}}",
          "answer": "{{ARTICLE_10_FAQ_A_1}}"
        }
      ]
    },
    "stories/account-security-dossier.html": {
      "title": "{{ARTICLE_11_TITLE}}",
      "description": "{{ARTICLE_11_DESC}}",
      "kicker": "{{ARTICLE_11_KICKER}}",
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
        },
        {
          "heading": "{{ARTICLE_11_H2_5}}",
          "body": "{{ARTICLE_11_BODY_5}}"
        }
      ],
      "sourceNote": "{{ARTICLE_11_SOURCE_NOTE}}",
      "pullquote": "{{ARTICLE_11_PULLQUOTE}}",
      "faq": [
        {
          "question": "{{ARTICLE_11_FAQ_Q_1}}",
          "answer": "{{ARTICLE_11_FAQ_A_1}}"
        },
        {
          "question": "{{ARTICLE_11_FAQ_Q_2}}",
          "answer": "{{ARTICLE_11_FAQ_A_2}}"
        }
      ]
    },
    "stories/revision-ledger-system.html": {
      "title": "{{ARTICLE_12_TITLE}}",
      "description": "{{ARTICLE_12_DESC}}",
      "kicker": "{{ARTICLE_12_KICKER}}",
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
        },
        {
          "heading": "{{ARTICLE_12_H2_4}}",
          "body": "{{ARTICLE_12_BODY_4}}"
        }
      ],
      "sourceNote": "{{ARTICLE_12_SOURCE_NOTE}}",
      "closingNote": "{{ARTICLE_12_CLOSING_NOTE}}"
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

## 工具验收样例

- 阅读节奏：中文 600 字应得到约 2 分钟、1 页；空文本应报错并聚焦。
- 来源时效：来源日与复核日相同应为 0 天；来源日晚于复核日应报错。
- 修订范围：原文两行、修订后替换一行时，应各识别一条新增和一条移除。
- 来源构成：2、2、1、0 应得总数 5、一手与正式材料占比 80%。
- 引文间距：2400 字、每千字 2 个核对点，应得 5 个核对点、约每 480 字一个。

## Workflow role map

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "article.html",
  "articles": [
    "stories/account-entry-notes.html",
    "stories/fee-footnote-anatomy.html",
    "stories/evidence-date-line.html",
    "stories/order-choice-matrix.html",
    "stories/volatility-context-sheet.html",
    "stories/transfer-checkpoints.html",
    "stories/access-recovery-notes.html",
    "stories/risk-language-framework.html",
    "stories/position-note-cases.html",
    "stories/recurring-review-rhythm.html",
    "stories/account-security-dossier.html",
    "stories/revision-ledger-system.html"
  ],
  "cornerstones": [
    "stories/risk-language-framework.html",
    "stories/account-security-dossier.html"
  ],
  "registrationGuide": "stories/account-entry-notes.html",
  "articleCovers": {
    "stories/account-entry-notes.html": {
      "display": "assets/covers/account-entry-notes.webp",
      "og": "assets/covers/account-entry-notes.png"
    },
    "stories/fee-footnote-anatomy.html": {
      "display": "assets/covers/fee-footnote-anatomy.webp",
      "og": "assets/covers/fee-footnote-anatomy.png"
    },
    "stories/evidence-date-line.html": {
      "display": "assets/covers/evidence-date-line.webp",
      "og": "assets/covers/evidence-date-line.png"
    },
    "stories/order-choice-matrix.html": {
      "display": "assets/covers/order-choice-matrix.webp",
      "og": "assets/covers/order-choice-matrix.png"
    },
    "stories/volatility-context-sheet.html": {
      "display": "assets/covers/volatility-context-sheet.webp",
      "og": "assets/covers/volatility-context-sheet.png"
    },
    "stories/transfer-checkpoints.html": {
      "display": "assets/covers/transfer-checkpoints.webp",
      "og": "assets/covers/transfer-checkpoints.png"
    },
    "stories/access-recovery-notes.html": {
      "display": "assets/covers/access-recovery-notes.webp",
      "og": "assets/covers/access-recovery-notes.png"
    },
    "stories/risk-language-framework.html": {
      "display": "assets/covers/risk-language-framework.webp",
      "og": "assets/covers/risk-language-framework.png"
    },
    "stories/position-note-cases.html": {
      "display": "assets/covers/position-note-cases.webp",
      "og": "assets/covers/position-note-cases.png"
    },
    "stories/recurring-review-rhythm.html": {
      "display": "assets/covers/recurring-review-rhythm.webp",
      "og": "assets/covers/recurring-review-rhythm.png"
    },
    "stories/account-security-dossier.html": {
      "display": "assets/covers/account-security-dossier.webp",
      "og": "assets/covers/account-security-dossier.png"
    },
    "stories/revision-ledger-system.html": {
      "display": "assets/covers/revision-ledger-system.webp",
      "og": "assets/covers/revision-ledger-system.png"
    }
  },
  "categories": [
    {
      "path": "shelves/fine-print.html",
      "label": "{{CATEGORY_01_NAME}}",
      "intro": "{{CATEGORY_01_DESC}}",
      "articles": [
        "stories/account-entry-notes.html",
        "stories/fee-footnote-anatomy.html",
        "stories/evidence-date-line.html",
        "stories/order-choice-matrix.html"
      ]
    },
    {
      "path": "shelves/custody-margin.html",
      "label": "{{CATEGORY_02_NAME}}",
      "intro": "{{CATEGORY_02_DESC}}",
      "articles": [
        "stories/volatility-context-sheet.html",
        "stories/transfer-checkpoints.html",
        "stories/access-recovery-notes.html",
        "stories/account-security-dossier.html"
      ]
    },
    {
      "path": "shelves/decision-notes.html",
      "label": "{{CATEGORY_03_NAME}}",
      "intro": "{{CATEGORY_03_DESC}}",
      "articles": [
        "stories/risk-language-framework.html",
        "stories/position-note-cases.html",
        "stories/recurring-review-rhythm.html",
        "stories/revision-ledger-system.html"
      ]
    }
  ],
  "toolIndex": "tool.html",
  "tools": [
    "workroom/reading-pace.html",
    "workroom/source-age.html",
    "workroom/revision-scope.html",
    "workroom/source-mix.html",
    "workroom/citation-spacing.html"
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

## 不可删除

- 标准档不得删除 12 个文章槽位、3 个分类角色、5 个工具、7 个合规角色、404、feed、sitemap、security.txt 或元数据框架。
- 删除某个内容位时必须同步更新首页、文章目录、分类页、相关阅读、feed、sitemap、封面角色与本文件映射。
