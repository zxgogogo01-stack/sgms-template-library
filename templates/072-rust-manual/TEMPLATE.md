# 072 Rust Manual · 工作流 v2 接入契约

## 范围与保留

仅制作静态网站模板，不写业务文章或注册教程，不部署生产站。原 field-manual.css 全字节保留，首页原 rm72- 类名与锈色总装图、四层拆解板、三原则、四步链均保留；新增 assembly-leaves.css 独立补齐页面体系。外部动态原包未取得，忠实度未核验，不以 UI 就绪代替保真验收。

35 个 HTML：31 可索引页面、独立 404、3 个 noindex 手动旧入口。12 篇文章骨架、4 页组三篇各一组、5 个真工具、7 个独立公开说明页。cornerstone 是内容容量角色，registrationGuide 只是兼容字段，指通用推广组件外壳，不指定教程题材。

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "leaf-catalog.html",
  "articles": [
    "leaves/specification-plate.html",
    "leaves/exploded-key.html",
    "leaves/prerequisite-board.html",
    "leaves/numbered-operation.html",
    "leaves/parallel-lanes.html",
    "leaves/hinged-notes.html",
    "leaves/evidence-caliper.html",
    "leaves/stop-gate.html",
    "leaves/inspection-ticket.html",
    "leaves/revision-overlay.html",
    "leaves/decision-junction.html",
    "leaves/handoff-pack.html"
  ],
  "cornerstones": [
    "leaves/specification-plate.html",
    "leaves/exploded-key.html"
  ],
  "registrationGuide": "leaves/handoff-pack.html",
  "articleCovers": {
    "leaves/specification-plate.html": {
      "display": "assets/plates/specification-plate.webp",
      "og": "assets/plates/specification-plate.png"
    },
    "leaves/exploded-key.html": {
      "display": "assets/plates/exploded-key.webp",
      "og": "assets/plates/exploded-key.png"
    },
    "leaves/prerequisite-board.html": {
      "display": "assets/plates/prerequisite-board.webp",
      "og": "assets/plates/prerequisite-board.png"
    },
    "leaves/numbered-operation.html": {
      "display": "assets/plates/numbered-operation.webp",
      "og": "assets/plates/numbered-operation.png"
    },
    "leaves/parallel-lanes.html": {
      "display": "assets/plates/parallel-lanes.webp",
      "og": "assets/plates/parallel-lanes.png"
    },
    "leaves/hinged-notes.html": {
      "display": "assets/plates/hinged-notes.webp",
      "og": "assets/plates/hinged-notes.png"
    },
    "leaves/evidence-caliper.html": {
      "display": "assets/plates/evidence-caliper.webp",
      "og": "assets/plates/evidence-caliper.png"
    },
    "leaves/stop-gate.html": {
      "display": "assets/plates/stop-gate.webp",
      "og": "assets/plates/stop-gate.png"
    },
    "leaves/inspection-ticket.html": {
      "display": "assets/plates/inspection-ticket.webp",
      "og": "assets/plates/inspection-ticket.png"
    },
    "leaves/revision-overlay.html": {
      "display": "assets/plates/revision-overlay.webp",
      "og": "assets/plates/revision-overlay.png"
    },
    "leaves/decision-junction.html": {
      "display": "assets/plates/decision-junction.webp",
      "og": "assets/plates/decision-junction.png"
    },
    "leaves/handoff-pack.html": {
      "display": "assets/plates/handoff-pack.webp",
      "og": "assets/plates/handoff-pack.png"
    }
  },
  "categories": [
    {
      "path": "dividers/preflight-leaves.html",
      "label": "准备页组",
      "articles": [
        "leaves/specification-plate.html",
        "leaves/exploded-key.html",
        "leaves/prerequisite-board.html"
      ]
    },
    {
      "path": "dividers/procedure-leaves.html",
      "label": "分解页组",
      "articles": [
        "leaves/numbered-operation.html",
        "leaves/parallel-lanes.html",
        "leaves/hinged-notes.html"
      ]
    },
    {
      "path": "dividers/inspection-leaves.html",
      "label": "核对页组",
      "articles": [
        "leaves/evidence-caliper.html",
        "leaves/stop-gate.html",
        "leaves/inspection-ticket.html"
      ]
    },
    {
      "path": "dividers/handover-leaves.html",
      "label": "交付页组",
      "articles": [
        "leaves/revision-overlay.html",
        "leaves/decision-junction.html",
        "leaves/handoff-pack.html"
      ]
    }
  ],
  "toolIndex": "workbench.html",
  "tools": [
    "bench/dependency-levels.html",
    "bench/rule-expander.html",
    "bench/reference-check.html",
    "bench/quantity-ledger.html",
    "bench/pair-coverage.html"
  ],
  "legal": {
    "about": "manual-office.html",
    "contact": "service-note.html",
    "disclosure": "interest-plate.html",
    "disclaimer": "scope-plate.html",
    "privacy": "local-data.html",
    "corrections": "errata-desk.html",
    "editorial": "revision-policy.html"
  },
  "error404": "404.html",
  "robots": "robots.txt",
  "sitemap": "sitemap.xml",
  "feed": "feed.xml",
  "security": ".well-known/security.txt",
  "favicon": "favicon.ico",
  "appleTouchIcon": "apple-touch-icon.png",
  "socialImage": "assets/manual-card.png",
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

## 后续 AI 只写文字

- 先填站点变量，再填写经核实的文字，不再补 UI、资源或工具算法。文章已有三种开场、十二个独立主组件、四段正文、目录、三种 FAQ 和收尾、作者、更正及接续阅读。
- 文章主组件依次是规格铭牌、拆解键、前置板、编号作业、双轨表、折页批注、证据卡尺、停止闸、核对票、修订叠图、分支节点、交接包。只替换对应文字，不统一抹平成卡片。
- 原文章、工具、说明旧入口仍可读而不自动跳转；新页路径全部小写。首页链接全部可索引页，每内页至少三个入口。导航固定五个栏目，不随文章数量增长。
- 首页形态 A 有代码、真复制、弹性利益点、政策脚注，没有外部推广直链；仅 handoff-pack.html 一处静态推广链接，保留四个 rel、target=_blank 和紧邻披露。不可在导航、工具或页脚增加推广链接。
- 12 个独立 SVG 工程抽象图已配齐 1200×630 WebP、PNG；每文章预加载自己的封面。另有独立站点社交图、180px apple 图标和 16/32/48 ICO。图形不是实物照片、操作证据或技术安全认证。
- 本模板不预置交易所标识、固定政策、作者经历或具体业务数字。没有事实来源的内容留待核实，不能把 QA 演示写进成品。

## 文字与变量格式

标题 8–28 中文字；首页标题 8–20 字；摘要 40–100 字；首页说明 35–65 字；利益脚注 16–45 字；代码 4–28 ASCII 字符；BRAND_EN 为 3–24 英文/罗马字。眉题与标签 2–20 字，A4_STEP_MARK_n、FOLIO_LABEL、FOLIO_NOTE、SEQUENCE_n_MARK 为 2–10 字。正文每槽可放 100–800 字，按内容增段，保留标题 ID 和目录关联；不要把 HTML 标签整体塞入纯文本变量。

SITE_DOMAIN 仅域名，无协议、路径或尾斜线。SOURCE_n_URL 与 AFFILIATE_URL 为经核实的绝对 HTTPS URL，拒绝脚本协议。CONTACT_EMAIL/SECURITY_EMAIL 为纯邮箱。LANG 为真实单站 BCP47。PUBLISHED/MODIFIED 填真实 ISO 日期；RSS_DATE 为真实 RFC2822 UTC 日期；SECURITY_EXPIRES 为未来 RFC3339 UTC 到期日期。

替换须区分上下文：HTML 文本转义 & < >，属性另转义双引号，XML 做 XML 转义，JSON-LD 用 JSON 字符串转义并将 < 写成 \u003c。发布前必须消解所有变量并重新检查，不能用未经上下文转义的全局替换。正文事实、作者真实性、合规结论与生产发布另走单站流程。

## 工具输入与算法

### 步骤依赖校验

每个非空行需要两个 |；NFKC 后编号转大写，匹配 [A-Z][A-Z0-9-]{0,15}。原始文字最多 10000 码点。

先拒绝重复、自依赖与缺失编号，再按入度逐层移除；同层按原输入次序排列。循环或受环阻塞时整体不出结果。

全部步骤、原始行号、标题、直接依赖与层级都会显示和复制；不再截断到 20 步。

层级从 1 起，不包含时长、资源冲突或真实权限，不能据此保证操作安全或允许并行执行。

只解析手输编号图，不调用命令、不执行步骤，也不读取系统或项目文件。

### 条件规则展开

每行 模式 | 结果名称，NFKC 后解析；结果 1–80 码点，模式只用 0、1、-。原始文字最多 10000 码点。

按二进制字典序枚举全部状态，对每条规则逐位比较；- 匹配任意值。

0 命中为未覆盖，1 命中为唯一，多个命中为重叠；多个命中即使结果同名也保留所有来源行，不静默采用首条。

仅做布尔模式展开，不推断业务含义、优先级或正确决策。覆盖完整不代表规则内容正确。

全部规则在本地处理，不连接规则引擎，不自动审批或执行动作。

### 编号引用检查

定义清单采用 NFKC、编号转大写；正文按原值扫描，不自动改变全角方括号或 Unicode 字母。

只识别 ASCII 方括号中以字母开头、最多 16 位的字母/数字/短横线编号；无效格式留在原文中但不计命中。

逐个列出已定义或未定义引用、1 起算码点位置及行列，再按原定义次序列出出现次数和未引用项目。

正文允许空白；无引用不等于文本无问题。工具不理解 HTML、Markdown 链接结构或引用语义，嵌套文本中满足模式的片段仍可命中。

只校验手输文本，不跳转到外链，不读取编号对应文件；报告中的输入按纯文本展示。

### 物料数量账

每行三个字段，NFKC 后编号转大写；编号格式与依赖台相同。输入最多 10000 码点。

使用 BigInt 精确整数计算：目标需求 = 每套需求 × 套数；缺口 = max(需求 − 已有, 0)，余量反之。

逐条列出需求、已有、缺口和余量，另按每套需求大于 0 的项目求最低 floor(已有 / 每套需求)；无正需求项时不定义可配套数。

不同项目单位不能直接相加，因此不把所有零件数量混成总量；这里不包含价格、耗损、尺寸适配或实物安全判断。

完全手工录入与本地计算，不查询库存、不采购、不预留物料，也不代表生产指令。

### 成对用例覆盖

两份文本分别最多 10000 码点。NFKC 后去首尾空白；因素 ID 使用大写 ASCII 编号，可选值不能含 | 或逗号。

对每一对因素枚举其笛卡尔积，然后按每条用例登记匹配组合；不同因素对的同名取值仍独立计算。

输出全部组合及命中用例原始行号，缺失组合逐条保留；最大 6 因素 × 每项 4 值对应 240 个二元组合。

重复用例允许且都记行号，但不会增加组合覆盖数。成对覆盖不是所有多因素组合覆盖，也不是测试充分性或质量保证。

仅统计字符串用例，不生成测试、不执行代码，也不连接项目、账户或远程测试服务。

所有工具拒绝不完整 Unicode 与禁止控制符，以码点计长度，不静默截断报告。输入变化或重置立即清除旧结果，错误聚焦并通过 aria-errormessage 关联字段；复制有修订号守卫防止迟到反馈。无 JS 时提交/复制禁用，正文、导航与原生 details 可读。仅主题保存于 rust-manual-072-finish，用户输入不入本地存储。

## 验收入口

依次执行 node tools/validate.js templates/072-rust-manual、audit-template.js、audit-workflow-readiness.js、check-similarity.js；再运行 tools/qa/072-rust-manual-browser.js，逐页 1440/768/390/360 双主题检查，独立算法、空/错/边界/重置/复制、键盘、无 JS 与深层 404 检查，并人工复看全部版式。只有全部通过才在 README 与进度表记为完成。

## 完整变量登记

- %%A10_AFTER_LABEL%%
- %%A10_AFTER_TEXT%%
- %%A10_AFTER_TITLE%%
- %%A10_BEFORE_LABEL%%
- %%A10_BEFORE_TEXT%%
- %%A10_BEFORE_TITLE%%
- %%A10_BODY_1_A%%
- %%A10_BODY_1_B%%
- %%A10_BODY_2_A%%
- %%A10_BODY_2_B%%
- %%A10_BODY_3_A%%
- %%A10_BODY_3_B%%
- %%A10_BODY_4_A%%
- %%A10_BODY_4_B%%
- %%A10_CHECKED_NOTE%%
- %%A10_COVER_ALT%%
- %%A10_COVER_CAPTION%%
- %%A10_ENDING_LABEL%%
- %%A10_ENDING_TEXT%%
- %%A10_ENDING_TITLE%%
- %%A10_EYEBROW%%
- %%A10_FAQ_A_1%%
- %%A10_FAQ_A_2%%
- %%A10_FAQ_Q_1%%
- %%A10_FAQ_Q_2%%
- %%A10_FAQ_TITLE%%
- %%A10_FOLIO_LABEL%%
- %%A10_FOLIO_NOTE%%
- %%A10_H2_1%%
- %%A10_H2_2%%
- %%A10_H2_3%%
- %%A10_H2_4%%
- %%A10_INDEX_NOTE%%
- %%A10_LIMIT_TEXT%%
- %%A10_MODIFIED%%
- %%A10_PART_1_LABEL%%
- %%A10_PART_2_LABEL%%
- %%A10_PART_3_LABEL%%
- %%A10_PART_4_LABEL%%
- %%A10_POINT_1%%
- %%A10_POINT_2%%
- %%A10_POINT_3%%
- %%A10_PUBLISHED%%
- %%A10_PULL_QUOTE%%
- %%A10_REVISION_LABEL%%
- %%A10_REVISION_REASON%%
- %%A10_RSS_DATE%%
- %%A10_SUMMARY%%
- %%A10_TITLE%%
- %%A10_TOC_LABEL%%
- %%A11_BODY_1_A%%
- %%A11_BODY_1_B%%
- %%A11_BODY_2_A%%
- %%A11_BODY_2_B%%
- %%A11_BODY_3_A%%
- %%A11_BODY_3_B%%
- %%A11_BODY_4_A%%
- %%A11_BODY_4_B%%
- %%A11_BRANCH_LABEL_1%%
- %%A11_BRANCH_LABEL_2%%
- %%A11_BRANCH_LABEL_3%%
- %%A11_BRANCH_NOTE_1%%
- %%A11_BRANCH_NOTE_2%%
- %%A11_BRANCH_NOTE_3%%
- %%A11_BRANCH_TEXT_1%%
- %%A11_BRANCH_TEXT_2%%
- %%A11_BRANCH_TEXT_3%%
- %%A11_CHECKED_NOTE%%
- %%A11_COVER_ALT%%
- %%A11_COVER_CAPTION%%
- %%A11_ENDING_LABEL%%
- %%A11_ENDING_TEXT%%
- %%A11_ENDING_TITLE%%
- %%A11_EYEBROW%%
- %%A11_FAQ_A_1%%
- %%A11_FAQ_A_2%%
- %%A11_FAQ_Q_1%%
- %%A11_FAQ_Q_2%%
- %%A11_FAQ_TITLE%%
- %%A11_FOLIO_LABEL%%
- %%A11_FOLIO_NOTE%%
- %%A11_H2_1%%
- %%A11_H2_2%%
- %%A11_H2_3%%
- %%A11_H2_4%%
- %%A11_INDEX_NOTE%%
- %%A11_JUNCTION_QUESTION%%
- %%A11_LIMIT_TEXT%%
- %%A11_MODIFIED%%
- %%A11_PART_1_LABEL%%
- %%A11_PART_2_LABEL%%
- %%A11_PART_3_LABEL%%
- %%A11_PART_4_LABEL%%
- %%A11_POINT_1%%
- %%A11_POINT_2%%
- %%A11_POINT_3%%
- %%A11_PUBLISHED%%
- %%A11_PULL_QUOTE%%
- %%A11_RSS_DATE%%
- %%A11_SUMMARY%%
- %%A11_TITLE%%
- %%A11_TOC_LABEL%%
- %%A12_BODY_1_A%%
- %%A12_BODY_1_B%%
- %%A12_BODY_2_A%%
- %%A12_BODY_2_B%%
- %%A12_BODY_3_A%%
- %%A12_BODY_3_B%%
- %%A12_BODY_4_A%%
- %%A12_BODY_4_B%%
- %%A12_CHECKED_NOTE%%
- %%A12_COVER_ALT%%
- %%A12_COVER_CAPTION%%
- %%A12_ENDING_LABEL%%
- %%A12_ENDING_TEXT%%
- %%A12_ENDING_TITLE%%
- %%A12_EYEBROW%%
- %%A12_FAQ_A_1%%
- %%A12_FAQ_A_2%%
- %%A12_FAQ_A_3%%
- %%A12_FAQ_Q_1%%
- %%A12_FAQ_Q_2%%
- %%A12_FAQ_Q_3%%
- %%A12_FAQ_TITLE%%
- %%A12_FOLIO_LABEL%%
- %%A12_FOLIO_NOTE%%
- %%A12_H2_1%%
- %%A12_H2_2%%
- %%A12_H2_3%%
- %%A12_H2_4%%
- %%A12_INDEX_NOTE%%
- %%A12_LIMIT_TEXT%%
- %%A12_MODIFIED%%
- %%A12_OPENING_LABEL%%
- %%A12_OPENING_NOTE%%
- %%A12_PACK_LABEL%%
- %%A12_PACK_NOTE%%
- %%A12_PACK_TERM_1%%
- %%A12_PACK_TERM_2%%
- %%A12_PACK_TERM_3%%
- %%A12_PACK_TEXT_1%%
- %%A12_PACK_TEXT_2%%
- %%A12_PACK_TEXT_3%%
- %%A12_PACK_TITLE%%
- %%A12_PART_1_LABEL%%
- %%A12_PART_2_LABEL%%
- %%A12_PART_3_LABEL%%
- %%A12_PART_4_LABEL%%
- %%A12_POINT_1%%
- %%A12_POINT_2%%
- %%A12_POINT_3%%
- %%A12_PUBLISHED%%
- %%A12_PULL_QUOTE%%
- %%A12_RSS_DATE%%
- %%A12_SUMMARY%%
- %%A12_TITLE%%
- %%A12_TOC_LABEL%%
- %%A1_BODY_1_A%%
- %%A1_BODY_1_B%%
- %%A1_BODY_2_A%%
- %%A1_BODY_2_B%%
- %%A1_BODY_3_A%%
- %%A1_BODY_3_B%%
- %%A1_BODY_4_A%%
- %%A1_BODY_4_B%%
- %%A1_CHECKED_NOTE%%
- %%A1_COVER_ALT%%
- %%A1_COVER_CAPTION%%
- %%A1_ENDING_LABEL%%
- %%A1_ENDING_TEXT%%
- %%A1_ENDING_TITLE%%
- %%A1_EYEBROW%%
- %%A1_FAQ_A_1%%
- %%A1_FAQ_A_2%%
- %%A1_FAQ_Q_1%%
- %%A1_FAQ_Q_2%%
- %%A1_FAQ_TITLE%%
- %%A1_FOLIO_LABEL%%
- %%A1_FOLIO_NOTE%%
- %%A1_H2_1%%
- %%A1_H2_2%%
- %%A1_H2_3%%
- %%A1_H2_4%%
- %%A1_INDEX_NOTE%%
- %%A1_LIMIT_TEXT%%
- %%A1_MODIFIED%%
- %%A1_PART_1_LABEL%%
- %%A1_PART_2_LABEL%%
- %%A1_PART_3_LABEL%%
- %%A1_PART_4_LABEL%%
- %%A1_POINT_1%%
- %%A1_POINT_2%%
- %%A1_POINT_3%%
- %%A1_PUBLISHED%%
- %%A1_PULL_QUOTE%%
- %%A1_RSS_DATE%%
- %%A1_SPEC_LABEL_1%%
- %%A1_SPEC_LABEL_2%%
- %%A1_SPEC_LABEL_3%%
- %%A1_SPEC_LABEL_4%%
- %%A1_SPEC_TEXT_1%%
- %%A1_SPEC_TEXT_2%%
- %%A1_SPEC_TEXT_3%%
- %%A1_SPEC_TEXT_4%%
- %%A1_SUMMARY%%
- %%A1_TITLE%%
- %%A1_TOC_LABEL%%
- %%A2_BODY_1_A%%
- %%A2_BODY_1_B%%
- %%A2_BODY_2_A%%
- %%A2_BODY_2_B%%
- %%A2_BODY_3_A%%
- %%A2_BODY_3_B%%
- %%A2_BODY_4_A%%
- %%A2_BODY_4_B%%
- %%A2_CHECKED_NOTE%%
- %%A2_COVER_ALT%%
- %%A2_COVER_CAPTION%%
- %%A2_ENDING_LABEL%%
- %%A2_ENDING_TEXT%%
- %%A2_ENDING_TITLE%%
- %%A2_EYEBROW%%
- %%A2_FAQ_A_1%%
- %%A2_FAQ_A_2%%
- %%A2_FAQ_Q_1%%
- %%A2_FAQ_Q_2%%
- %%A2_FAQ_TITLE%%
- %%A2_FOLIO_LABEL%%
- %%A2_FOLIO_NOTE%%
- %%A2_H2_1%%
- %%A2_H2_2%%
- %%A2_H2_3%%
- %%A2_H2_4%%
- %%A2_INDEX_NOTE%%
- %%A2_KEY_TEXT_1%%
- %%A2_KEY_TEXT_2%%
- %%A2_KEY_TEXT_3%%
- %%A2_KEY_TEXT_4%%
- %%A2_KEY_TITLE_1%%
- %%A2_KEY_TITLE_2%%
- %%A2_KEY_TITLE_3%%
- %%A2_KEY_TITLE_4%%
- %%A2_LIMIT_TEXT%%
- %%A2_MODIFIED%%
- %%A2_PART_1_LABEL%%
- %%A2_PART_2_LABEL%%
- %%A2_PART_3_LABEL%%
- %%A2_PART_4_LABEL%%
- %%A2_POINT_1%%
- %%A2_POINT_2%%
- %%A2_POINT_3%%
- %%A2_PUBLISHED%%
- %%A2_PULL_QUOTE%%
- %%A2_RSS_DATE%%
- %%A2_SUMMARY%%
- %%A2_TITLE%%
- %%A2_TOC_LABEL%%
- %%A3_BODY_1_A%%
- %%A3_BODY_1_B%%
- %%A3_BODY_2_A%%
- %%A3_BODY_2_B%%
- %%A3_BODY_3_A%%
- %%A3_BODY_3_B%%
- %%A3_BODY_4_A%%
- %%A3_BODY_4_B%%
- %%A3_CHECKED_NOTE%%
- %%A3_COVER_ALT%%
- %%A3_COVER_CAPTION%%
- %%A3_ENDING_LABEL%%
- %%A3_ENDING_TEXT%%
- %%A3_ENDING_TITLE%%
- %%A3_EYEBROW%%
- %%A3_FAQ_A_1%%
- %%A3_FAQ_A_2%%
- %%A3_FAQ_A_3%%
- %%A3_FAQ_Q_1%%
- %%A3_FAQ_Q_2%%
- %%A3_FAQ_Q_3%%
- %%A3_FAQ_TITLE%%
- %%A3_FOLIO_LABEL%%
- %%A3_FOLIO_NOTE%%
- %%A3_H2_1%%
- %%A3_H2_2%%
- %%A3_H2_3%%
- %%A3_H2_4%%
- %%A3_INDEX_NOTE%%
- %%A3_INPUT_LABEL_1%%
- %%A3_INPUT_LABEL_2%%
- %%A3_INPUT_LABEL_3%%
- %%A3_INPUT_TEXT_1%%
- %%A3_INPUT_TEXT_2%%
- %%A3_INPUT_TEXT_3%%
- %%A3_INPUT_TITLE_1%%
- %%A3_INPUT_TITLE_2%%
- %%A3_INPUT_TITLE_3%%
- %%A3_LIMIT_TEXT%%
- %%A3_MODIFIED%%
- %%A3_OPENING_LABEL%%
- %%A3_OPENING_NOTE%%
- %%A3_PART_1_LABEL%%
- %%A3_PART_2_LABEL%%
- %%A3_PART_3_LABEL%%
- %%A3_PART_4_LABEL%%
- %%A3_POINT_1%%
- %%A3_POINT_2%%
- %%A3_POINT_3%%
- %%A3_PUBLISHED%%
- %%A3_PULL_QUOTE%%
- %%A3_RSS_DATE%%
- %%A3_SUMMARY%%
- %%A3_TITLE%%
- %%A3_TOC_LABEL%%
- %%A4_BODY_1_A%%
- %%A4_BODY_1_B%%
- %%A4_BODY_2_A%%
- %%A4_BODY_2_B%%
- %%A4_BODY_3_A%%
- %%A4_BODY_3_B%%
- %%A4_BODY_4_A%%
- %%A4_BODY_4_B%%
- %%A4_CHECKED_NOTE%%
- %%A4_COVER_ALT%%
- %%A4_COVER_CAPTION%%
- %%A4_ENDING_LABEL%%
- %%A4_ENDING_TEXT%%
- %%A4_ENDING_TITLE%%
- %%A4_EYEBROW%%
- %%A4_FAQ_A_1%%
- %%A4_FAQ_A_2%%
- %%A4_FAQ_Q_1%%
- %%A4_FAQ_Q_2%%
- %%A4_FAQ_TITLE%%
- %%A4_FOLIO_LABEL%%
- %%A4_FOLIO_NOTE%%
- %%A4_H2_1%%
- %%A4_H2_2%%
- %%A4_H2_3%%
- %%A4_H2_4%%
- %%A4_INDEX_NOTE%%
- %%A4_LIMIT_TEXT%%
- %%A4_MODIFIED%%
- %%A4_PART_1_LABEL%%
- %%A4_PART_2_LABEL%%
- %%A4_PART_3_LABEL%%
- %%A4_PART_4_LABEL%%
- %%A4_POINT_1%%
- %%A4_POINT_2%%
- %%A4_POINT_3%%
- %%A4_PUBLISHED%%
- %%A4_PULL_QUOTE%%
- %%A4_RSS_DATE%%
- %%A4_STEP_MARK_1%%
- %%A4_STEP_MARK_2%%
- %%A4_STEP_MARK_3%%
- %%A4_STEP_MARK_4%%
- %%A4_STEP_TEXT_1%%
- %%A4_STEP_TEXT_2%%
- %%A4_STEP_TEXT_3%%
- %%A4_STEP_TEXT_4%%
- %%A4_STEP_TITLE_1%%
- %%A4_STEP_TITLE_2%%
- %%A4_STEP_TITLE_3%%
- %%A4_STEP_TITLE_4%%
- %%A4_SUMMARY%%
- %%A4_TITLE%%
- %%A4_TOC_LABEL%%
- %%A5_BODY_1_A%%
- %%A5_BODY_1_B%%
- %%A5_BODY_2_A%%
- %%A5_BODY_2_B%%
- %%A5_BODY_3_A%%
- %%A5_BODY_3_B%%
- %%A5_BODY_4_A%%
- %%A5_BODY_4_B%%
- %%A5_CELL_1_1%%
- %%A5_CELL_1_2%%
- %%A5_CELL_1_3%%
- %%A5_CELL_2_1%%
- %%A5_CELL_2_2%%
- %%A5_CELL_2_3%%
- %%A5_CELL_3_1%%
- %%A5_CELL_3_2%%
- %%A5_CELL_3_3%%
- %%A5_CHECKED_NOTE%%
- %%A5_COL_1%%
- %%A5_COL_2%%
- %%A5_COL_3%%
- %%A5_COL_4%%
- %%A5_COVER_ALT%%
- %%A5_COVER_CAPTION%%
- %%A5_ENDING_LABEL%%
- %%A5_ENDING_TEXT%%
- %%A5_ENDING_TITLE%%
- %%A5_EYEBROW%%
- %%A5_FAQ_A_1%%
- %%A5_FAQ_A_2%%
- %%A5_FAQ_Q_1%%
- %%A5_FAQ_Q_2%%
- %%A5_FAQ_TITLE%%
- %%A5_FOLIO_LABEL%%
- %%A5_FOLIO_NOTE%%
- %%A5_H2_1%%
- %%A5_H2_2%%
- %%A5_H2_3%%
- %%A5_H2_4%%
- %%A5_INDEX_NOTE%%
- %%A5_LIMIT_TEXT%%
- %%A5_MODIFIED%%
- %%A5_PART_1_LABEL%%
- %%A5_PART_2_LABEL%%
- %%A5_PART_3_LABEL%%
- %%A5_PART_4_LABEL%%
- %%A5_POINT_1%%
- %%A5_POINT_2%%
- %%A5_POINT_3%%
- %%A5_PUBLISHED%%
- %%A5_PULL_QUOTE%%
- %%A5_ROW_1%%
- %%A5_ROW_2%%
- %%A5_ROW_3%%
- %%A5_RSS_DATE%%
- %%A5_SUMMARY%%
- %%A5_TABLE_LABEL%%
- %%A5_TITLE%%
- %%A5_TOC_LABEL%%
- %%A6_BODY_1_A%%
- %%A6_BODY_1_B%%
- %%A6_BODY_2_A%%
- %%A6_BODY_2_B%%
- %%A6_BODY_3_A%%
- %%A6_BODY_3_B%%
- %%A6_BODY_4_A%%
- %%A6_BODY_4_B%%
- %%A6_CHECKED_NOTE%%
- %%A6_COVER_ALT%%
- %%A6_COVER_CAPTION%%
- %%A6_ENDING_LABEL%%
- %%A6_ENDING_TEXT%%
- %%A6_ENDING_TITLE%%
- %%A6_EYEBROW%%
- %%A6_FAQ_A_1%%
- %%A6_FAQ_A_2%%
- %%A6_FAQ_A_3%%
- %%A6_FAQ_Q_1%%
- %%A6_FAQ_Q_2%%
- %%A6_FAQ_Q_3%%
- %%A6_FAQ_TITLE%%
- %%A6_FOLIO_LABEL%%
- %%A6_FOLIO_NOTE%%
- %%A6_H2_1%%
- %%A6_H2_2%%
- %%A6_H2_3%%
- %%A6_H2_4%%
- %%A6_HINGE_NOTE_1%%
- %%A6_HINGE_NOTE_2%%
- %%A6_HINGE_NOTE_3%%
- %%A6_HINGE_TEXT_1%%
- %%A6_HINGE_TEXT_2%%
- %%A6_HINGE_TEXT_3%%
- %%A6_HINGE_TITLE_1%%
- %%A6_HINGE_TITLE_2%%
- %%A6_HINGE_TITLE_3%%
- %%A6_INDEX_NOTE%%
- %%A6_LIMIT_TEXT%%
- %%A6_MODIFIED%%
- %%A6_OPENING_LABEL%%
- %%A6_OPENING_NOTE%%
- %%A6_PART_1_LABEL%%
- %%A6_PART_2_LABEL%%
- %%A6_PART_3_LABEL%%
- %%A6_PART_4_LABEL%%
- %%A6_POINT_1%%
- %%A6_POINT_2%%
- %%A6_POINT_3%%
- %%A6_PUBLISHED%%
- %%A6_PULL_QUOTE%%
- %%A6_RSS_DATE%%
- %%A6_SUMMARY%%
- %%A6_TITLE%%
- %%A6_TOC_LABEL%%
- %%A7_BODY_1_A%%
- %%A7_BODY_1_B%%
- %%A7_BODY_2_A%%
- %%A7_BODY_2_B%%
- %%A7_BODY_3_A%%
- %%A7_BODY_3_B%%
- %%A7_BODY_4_A%%
- %%A7_BODY_4_B%%
- %%A7_CHECKED_NOTE%%
- %%A7_COVER_ALT%%
- %%A7_COVER_CAPTION%%
- %%A7_ENDING_LABEL%%
- %%A7_ENDING_TEXT%%
- %%A7_ENDING_TITLE%%
- %%A7_EVIDENCE_SCOPE_1%%
- %%A7_EVIDENCE_SCOPE_2%%
- %%A7_EVIDENCE_SCOPE_3%%
- %%A7_EVIDENCE_TEXT_1%%
- %%A7_EVIDENCE_TEXT_2%%
- %%A7_EVIDENCE_TEXT_3%%
- %%A7_EYEBROW%%
- %%A7_FAQ_A_1%%
- %%A7_FAQ_A_2%%
- %%A7_FAQ_Q_1%%
- %%A7_FAQ_Q_2%%
- %%A7_FAQ_TITLE%%
- %%A7_FOLIO_LABEL%%
- %%A7_FOLIO_NOTE%%
- %%A7_H2_1%%
- %%A7_H2_2%%
- %%A7_H2_3%%
- %%A7_H2_4%%
- %%A7_INDEX_NOTE%%
- %%A7_LIMIT_TEXT%%
- %%A7_MODIFIED%%
- %%A7_PART_1_LABEL%%
- %%A7_PART_2_LABEL%%
- %%A7_PART_3_LABEL%%
- %%A7_PART_4_LABEL%%
- %%A7_POINT_1%%
- %%A7_POINT_2%%
- %%A7_POINT_3%%
- %%A7_PUBLISHED%%
- %%A7_PULL_QUOTE%%
- %%A7_RSS_DATE%%
- %%A7_SOURCE_1_LABEL%%
- %%A7_SOURCE_1_URL%%
- %%A7_SOURCE_2_LABEL%%
- %%A7_SOURCE_2_URL%%
- %%A7_SOURCE_3_LABEL%%
- %%A7_SOURCE_3_URL%%
- %%A7_SUMMARY%%
- %%A7_TITLE%%
- %%A7_TOC_LABEL%%
- %%A8_BODY_1_A%%
- %%A8_BODY_1_B%%
- %%A8_BODY_2_A%%
- %%A8_BODY_2_B%%
- %%A8_BODY_3_A%%
- %%A8_BODY_3_B%%
- %%A8_BODY_4_A%%
- %%A8_BODY_4_B%%
- %%A8_CHECKED_NOTE%%
- %%A8_COVER_ALT%%
- %%A8_COVER_CAPTION%%
- %%A8_ENDING_LABEL%%
- %%A8_ENDING_TEXT%%
- %%A8_ENDING_TITLE%%
- %%A8_EYEBROW%%
- %%A8_FAQ_A_1%%
- %%A8_FAQ_A_2%%
- %%A8_FAQ_Q_1%%
- %%A8_FAQ_Q_2%%
- %%A8_FAQ_TITLE%%
- %%A8_FOLIO_LABEL%%
- %%A8_FOLIO_NOTE%%
- %%A8_GATE_MARK_1%%
- %%A8_GATE_MARK_2%%
- %%A8_GATE_TEXT_1%%
- %%A8_GATE_TEXT_2%%
- %%A8_GATE_TITLE_1%%
- %%A8_GATE_TITLE_2%%
- %%A8_H2_1%%
- %%A8_H2_2%%
- %%A8_H2_3%%
- %%A8_H2_4%%
- %%A8_INDEX_NOTE%%
- %%A8_LIMIT_TEXT%%
- %%A8_MODIFIED%%
- %%A8_PART_1_LABEL%%
- %%A8_PART_2_LABEL%%
- %%A8_PART_3_LABEL%%
- %%A8_PART_4_LABEL%%
- %%A8_POINT_1%%
- %%A8_POINT_2%%
- %%A8_POINT_3%%
- %%A8_PUBLISHED%%
- %%A8_PULL_QUOTE%%
- %%A8_RSS_DATE%%
- %%A8_SUMMARY%%
- %%A8_TITLE%%
- %%A8_TOC_LABEL%%
- %%A9_BODY_1_A%%
- %%A9_BODY_1_B%%
- %%A9_BODY_2_A%%
- %%A9_BODY_2_B%%
- %%A9_BODY_3_A%%
- %%A9_BODY_3_B%%
- %%A9_BODY_4_A%%
- %%A9_BODY_4_B%%
- %%A9_CHECKED_NOTE%%
- %%A9_CHECK_CRITERIA_1%%
- %%A9_CHECK_CRITERIA_2%%
- %%A9_CHECK_CRITERIA_3%%
- %%A9_CHECK_CRITERIA_4%%
- %%A9_CHECK_EVIDENCE_1%%
- %%A9_CHECK_EVIDENCE_2%%
- %%A9_CHECK_EVIDENCE_3%%
- %%A9_CHECK_EVIDENCE_4%%
- %%A9_CHECK_LABEL_1%%
- %%A9_CHECK_LABEL_2%%
- %%A9_CHECK_LABEL_3%%
- %%A9_CHECK_LABEL_4%%
- %%A9_COVER_ALT%%
- %%A9_COVER_CAPTION%%
- %%A9_ENDING_LABEL%%
- %%A9_ENDING_TEXT%%
- %%A9_ENDING_TITLE%%
- %%A9_EYEBROW%%
- %%A9_FAQ_A_1%%
- %%A9_FAQ_A_2%%
- %%A9_FAQ_A_3%%
- %%A9_FAQ_Q_1%%
- %%A9_FAQ_Q_2%%
- %%A9_FAQ_Q_3%%
- %%A9_FAQ_TITLE%%
- %%A9_FOLIO_LABEL%%
- %%A9_FOLIO_NOTE%%
- %%A9_H2_1%%
- %%A9_H2_2%%
- %%A9_H2_3%%
- %%A9_H2_4%%
- %%A9_INDEX_NOTE%%
- %%A9_LIMIT_TEXT%%
- %%A9_MODIFIED%%
- %%A9_OPENING_LABEL%%
- %%A9_OPENING_NOTE%%
- %%A9_PART_1_LABEL%%
- %%A9_PART_2_LABEL%%
- %%A9_PART_3_LABEL%%
- %%A9_PART_4_LABEL%%
- %%A9_POINT_1%%
- %%A9_POINT_2%%
- %%A9_POINT_3%%
- %%A9_PUBLISHED%%
- %%A9_PULL_QUOTE%%
- %%A9_RSS_DATE%%
- %%A9_SUMMARY%%
- %%A9_TITLE%%
- %%A9_TOC_LABEL%%
- %%ABOUT_BODY_1%%
- %%ABOUT_BODY_2%%
- %%ABOUT_BODY_3%%
- %%ABOUT_BODY_4%%
- %%ABOUT_CONTACT_NOTE%%
- %%ABOUT_EYEBROW%%
- %%ABOUT_H2_1%%
- %%ABOUT_H2_2%%
- %%ABOUT_H2_3%%
- %%ABOUT_H2_4%%
- %%ABOUT_LABEL_1%%
- %%ABOUT_LABEL_2%%
- %%ABOUT_LABEL_3%%
- %%ABOUT_LABEL_4%%
- %%ABOUT_SUMMARY%%
- %%ABOUT_UPDATED_NOTE%%
- %%AFFILIATE_DISCLOSURE%%
- %%AFFILIATE_LABEL%%
- %%AFFILIATE_NOTE%%
- %%AFFILIATE_URL%%
- %%AUTHOR_BIO%%
- %%AUTHOR_NAME%%
- %%BENEFIT_DISCLAIMER%%
- %%BENEFIT_RATE%%
- %%BRAND_EN%%
- %%BRAND_LINE%%
- %%CALLOUT_LABEL%%
- %%CALLOUT_TEXT%%
- %%CATALOG_INTRO%%
- %%CATALOG_LABEL%%
- %%CATALOG_TITLE%%
- %%CONTACT_BODY_1%%
- %%CONTACT_BODY_2%%
- %%CONTACT_BODY_3%%
- %%CONTACT_BODY_4%%
- %%CONTACT_CONTACT_NOTE%%
- %%CONTACT_EMAIL%%
- %%CONTACT_EYEBROW%%
- %%CONTACT_H2_1%%
- %%CONTACT_H2_2%%
- %%CONTACT_H2_3%%
- %%CONTACT_H2_4%%
- %%CONTACT_LABEL_1%%
- %%CONTACT_LABEL_2%%
- %%CONTACT_LABEL_3%%
- %%CONTACT_LABEL_4%%
- %%CONTACT_SUMMARY%%
- %%CONTACT_UPDATED_NOTE%%
- %%CORRECTIONS_BODY_1%%
- %%CORRECTIONS_BODY_2%%
- %%CORRECTIONS_BODY_3%%
- %%CORRECTIONS_BODY_4%%
- %%CORRECTIONS_CONTACT_NOTE%%
- %%CORRECTIONS_EYEBROW%%
- %%CORRECTIONS_H2_1%%
- %%CORRECTIONS_H2_2%%
- %%CORRECTIONS_H2_3%%
- %%CORRECTIONS_H2_4%%
- %%CORRECTIONS_LABEL_1%%
- %%CORRECTIONS_LABEL_2%%
- %%CORRECTIONS_LABEL_3%%
- %%CORRECTIONS_LABEL_4%%
- %%CORRECTIONS_SUMMARY%%
- %%CORRECTIONS_UPDATED_NOTE%%
- %%DIAGRAM_CAPTION%%
- %%DISCLAIMER_BODY_1%%
- %%DISCLAIMER_BODY_2%%
- %%DISCLAIMER_BODY_3%%
- %%DISCLAIMER_BODY_4%%
- %%DISCLAIMER_CONTACT_NOTE%%
- %%DISCLAIMER_EYEBROW%%
- %%DISCLAIMER_H2_1%%
- %%DISCLAIMER_H2_2%%
- %%DISCLAIMER_H2_3%%
- %%DISCLAIMER_H2_4%%
- %%DISCLAIMER_LABEL_1%%
- %%DISCLAIMER_LABEL_2%%
- %%DISCLAIMER_LABEL_3%%
- %%DISCLAIMER_LABEL_4%%
- %%DISCLAIMER_SUMMARY%%
- %%DISCLAIMER_UPDATED_NOTE%%
- %%DISCLOSURE_BODY_1%%
- %%DISCLOSURE_BODY_2%%
- %%DISCLOSURE_BODY_3%%
- %%DISCLOSURE_BODY_4%%
- %%DISCLOSURE_CONTACT_NOTE%%
- %%DISCLOSURE_EYEBROW%%
- %%DISCLOSURE_H2_1%%
- %%DISCLOSURE_H2_2%%
- %%DISCLOSURE_H2_3%%
- %%DISCLOSURE_H2_4%%
- %%DISCLOSURE_LABEL_1%%
- %%DISCLOSURE_LABEL_2%%
- %%DISCLOSURE_LABEL_3%%
- %%DISCLOSURE_LABEL_4%%
- %%DISCLOSURE_SUMMARY%%
- %%DISCLOSURE_UPDATED_NOTE%%
- %%DIVIDER_1_INTRO%%
- %%DIVIDER_1_LABEL%%
- %%DIVIDER_2_INTRO%%
- %%DIVIDER_2_LABEL%%
- %%DIVIDER_3_INTRO%%
- %%DIVIDER_3_LABEL%%
- %%DIVIDER_4_INTRO%%
- %%DIVIDER_4_LABEL%%
- %%EDITORIAL_BODY_1%%
- %%EDITORIAL_BODY_2%%
- %%EDITORIAL_BODY_3%%
- %%EDITORIAL_BODY_4%%
- %%EDITORIAL_CONTACT_NOTE%%
- %%EDITORIAL_EYEBROW%%
- %%EDITORIAL_H2_1%%
- %%EDITORIAL_H2_2%%
- %%EDITORIAL_H2_3%%
- %%EDITORIAL_H2_4%%
- %%EDITORIAL_LABEL_1%%
- %%EDITORIAL_LABEL_2%%
- %%EDITORIAL_LABEL_3%%
- %%EDITORIAL_LABEL_4%%
- %%EDITORIAL_SUMMARY%%
- %%EDITORIAL_UPDATED_NOTE%%
- %%FOOTER_NOTE%%
- %%HERO_DESCRIPTION%%
- %%HERO_EYEBROW%%
- %%HERO_TITLE%%
- %%HOME_FEATURED_LABEL%%
- %%HOME_LATEST_LABEL%%
- %%INDEPENDENCE_NOTE%%
- %%INVITE_CODE%%
- %%INVITE_LABEL%%
- %%LANG%%
- %%PRIVACY_BODY_1%%
- %%PRIVACY_BODY_2%%
- %%PRIVACY_BODY_3%%
- %%PRIVACY_BODY_4%%
- %%PRIVACY_CONTACT_NOTE%%
- %%PRIVACY_EYEBROW%%
- %%PRIVACY_H2_1%%
- %%PRIVACY_H2_2%%
- %%PRIVACY_H2_3%%
- %%PRIVACY_H2_4%%
- %%PRIVACY_LABEL_1%%
- %%PRIVACY_LABEL_2%%
- %%PRIVACY_LABEL_3%%
- %%PRIVACY_LABEL_4%%
- %%PRIVACY_SUMMARY%%
- %%PRIVACY_UPDATED_NOTE%%
- %%PROTOCOL_1_LABEL%%
- %%PROTOCOL_1_LINK%%
- %%PROTOCOL_1_TEXT%%
- %%PROTOCOL_1_TITLE%%
- %%PROTOCOL_2_LABEL%%
- %%PROTOCOL_2_LINK%%
- %%PROTOCOL_2_TEXT%%
- %%PROTOCOL_2_TITLE%%
- %%PROTOCOL_3_LABEL%%
- %%PROTOCOL_3_LINK%%
- %%PROTOCOL_3_TEXT%%
- %%PROTOCOL_3_TITLE%%
- %%PROTOCOL_INTRO%%
- %%PROTOCOL_TITLE%%
- %%RISK_NOTE%%
- %%SECURITY_EMAIL%%
- %%SECURITY_EXPIRES%%
- %%SEO_TITLE%%
- %%SEQUENCE_1_LABEL%%
- %%SEQUENCE_1_MARK%%
- %%SEQUENCE_1_TEXT%%
- %%SEQUENCE_1_TITLE%%
- %%SEQUENCE_2_LABEL%%
- %%SEQUENCE_2_MARK%%
- %%SEQUENCE_2_TEXT%%
- %%SEQUENCE_2_TITLE%%
- %%SEQUENCE_3_LABEL%%
- %%SEQUENCE_3_MARK%%
- %%SEQUENCE_3_TEXT%%
- %%SEQUENCE_3_TITLE%%
- %%SEQUENCE_4_LABEL%%
- %%SEQUENCE_4_MARK%%
- %%SEQUENCE_4_TEXT%%
- %%SEQUENCE_4_TITLE%%
- %%SEQUENCE_TITLE%%
- %%SITE_DESC%%
- %%SITE_DOMAIN%%
- %%SITE_NAME%%
- %%SITE_TAGLINE%%
- %%TOOLS_INTRO%%
- %%TOOLS_LABEL%%
- %%TOOLS_TITLE%%
