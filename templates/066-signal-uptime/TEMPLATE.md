# Signal Uptime — 模拟信号实验室完整静态框架

## 交付边界

本套只制作网站模板。后续 AI 填写经核实的站点变量、文字和文章，不再补 UI、页面、工具或通用资产。不代写业务文章或注册教程，不部署生产。角色表 registrationGuide 仅是旧检查器兼容字段，指向含唯一推广组件的通用内容外壳，不表示教程选题。

保留本地已有示波器、四频道、开放回路提醒、事件记录与控制台入口；原 frequency.css 字节不变，扩展在 backplane.css。动态源未获得可复验状态，原包忠实度单列为未核验，不冒充忠实复刻通过；用户已授权基于本地视觉完善完整 UI。

## 页面与视觉

35 个 HTML：31 个可索引页面、独立 404、3 个 noindex 旧入口，不自动跳转。输入端口、滤波层、增益段、返回回路四个交叉分区，每区 3 份记录。文章有元数据并置、宽屏封面、图文对接三种开场；十二组件为触发卡、范围闸、因果线路、双探针、操作员批注、事件标尺、隔离开关、条件矩阵、开放回路、复核序列、来源端子、外部耦合器。宽屏侧边线路目录，窄屏原生折叠；FAQ 与收尾有不同编排。

默认暗台 dark，支持亮台 light；菜单焦点、Escape 回焦、键盘跳转、减少动态与无 JS 阅读保留。示波器与状态槽位仅作信息整理示意，不代表第三方系统在线状态或真实测量。所有状态、日期及核实声明由内容流程验证填写。

首页首屏代码真复制、利益变量和脚注齐全，无推广 href。唯一静态推广 href 位于 external-coupler 内容外壳，带 blank、sponsored/nofollow/noopener/noreferrer，附近披露与代码明文。其他页面、导航、页脚均无推广 href；Feed 11 项摘要，不含代码或推广链接。

## 五件本地仪器

- 服务窗口合并：保留严格标记日期解析、2000–2099、每窗 366 天、100 窗/10000 码点边界。重叠及相接合并；独占分钟为并集覆盖量，重叠分钟为原总量减并集量，可能重复计算同一分钟多次。不处理时区、夏令时或闰秒。
- 事件防抖推演：200 事件、4000 码点，偏移 0–10 亿毫秒、等待 1–60000 毫秒；十进制整数无前导零。按时刻/原行排序。尾随防抖刷新截止点，同刻先到期再输入；前沿节流无追加尾随，保留同刻重复事件。
- 汉明七位帧：偶校验 Hamming(7,4)，左至右位号 1–7，校验位 1/2/4，数据位 3/5/6/7。64 帧/4000 码点；编码 4 位，检查 7 位。只在最多单比特错误假设下解释纠正；多错可误纠正，综合征零不是无错证明。
- CRC 八位余数：多项式低八位 0x07，初值 0x00，不反射，末异或 0x00；最多 256 个两位十六进制字节/10000 码点，以空白分隔。完整逐字节寄存器，不是加密或认证。
- 脉冲游程互换：编码 4096 位，解码最多 512 段、展开 4096 位，原输入 16000 码点。仅 ASCII 比特，解码每段 0:次数 或 1:次数，空白分隔；接受相邻同位段并输出标准合并游程，不声称文件压缩率。

全部工具具有可抓取说明、默认折叠 Guide、完整复制、重置、错误定位及 aria-errormessage。直接校验控件原值，不通过会替换代理项的 FormData；拒绝控制字符及不完整 Unicode。变更立即清空结果；复制修订号防止异步旧提示回写。输出用 textContent 或安全节点。不联网、不保存输入；localStorage 只保存主题。

## 后续 AI 内容接口

仅替换 %%UPPER_CASE%% 变量和经核实的文字，保留 sl66- 类名、id、data-* 和脚本逻辑。T1_ 至 T12_ 是文章槽位。标题建议 8–16 个中文字符，首页说明 25–60 字；利益脚注不能截断。BRAND_EN 为英文或罗马字，BRAND_MARK 为短字母标识；BRAND_LINE、SCOPE_CHANNEL 与 TRACE_MARK 是编辑标签，不是实时系统证明。

文本、HTML 属性和 XML 分别转义。JSON-LD 需重新序列化并转义小于号及脚本结束片段，不裸拼接引号。SITE_DOMAIN 仅主机名；AFFILIATE_URL 只填经核实 HTTPS 地址；SOURCE_URL 只用经核实 HTTP(S)，禁止脚本协议。邮箱使用真实授权地址；日期用 ISO，RSS 日期用 RFC 822，SECURITY_EXPIRES 为未来一年内 UTC 时间。作者、来源、利益条件、状态与事实需要核查，不虚构身份或经历。

每篇封面含独立 SVG 源、1200×630 WebP/PNG 及预加载。站点附 SVG/ICO 16/32/48 图标、180×180 触摸图标和 1200×630 社交图。以模板根为站点根；404 的根 base 支持未知深路径，真实服务器仍须返回 HTTP 404。服务器配置和生产部署不在本套执行。

## 角色表

```json workflow-ready-v2
{
  "version": 2,
  "home": "index.html",
  "articleIndex": "signal-log.html",
  "articles": [
    "traces/trigger-card.html",
    "traces/scope-gate.html",
    "traces/causal-route.html",
    "traces/parallel-probes.html",
    "traces/operator-notes.html",
    "traces/event-ruler.html",
    "traces/isolation-switches.html",
    "traces/threshold-matrix.html",
    "traces/open-circuit.html",
    "traces/recheck-sequence.html",
    "traces/source-terminal.html",
    "traces/external-coupler.html"
  ],
  "cornerstones": [
    "traces/trigger-card.html",
    "traces/causal-route.html"
  ],
  "registrationGuide": "traces/external-coupler.html",
  "articleCovers": {
    "traces/trigger-card.html": {
      "display": "assets/covers/trigger-card.webp",
      "og": "assets/covers/trigger-card.png"
    },
    "traces/scope-gate.html": {
      "display": "assets/covers/scope-gate.webp",
      "og": "assets/covers/scope-gate.png"
    },
    "traces/causal-route.html": {
      "display": "assets/covers/causal-route.webp",
      "og": "assets/covers/causal-route.png"
    },
    "traces/parallel-probes.html": {
      "display": "assets/covers/parallel-probes.webp",
      "og": "assets/covers/parallel-probes.png"
    },
    "traces/operator-notes.html": {
      "display": "assets/covers/operator-notes.webp",
      "og": "assets/covers/operator-notes.png"
    },
    "traces/event-ruler.html": {
      "display": "assets/covers/event-ruler.webp",
      "og": "assets/covers/event-ruler.png"
    },
    "traces/isolation-switches.html": {
      "display": "assets/covers/isolation-switches.webp",
      "og": "assets/covers/isolation-switches.png"
    },
    "traces/threshold-matrix.html": {
      "display": "assets/covers/threshold-matrix.webp",
      "og": "assets/covers/threshold-matrix.png"
    },
    "traces/open-circuit.html": {
      "display": "assets/covers/open-circuit.webp",
      "og": "assets/covers/open-circuit.png"
    },
    "traces/recheck-sequence.html": {
      "display": "assets/covers/recheck-sequence.webp",
      "og": "assets/covers/recheck-sequence.png"
    },
    "traces/source-terminal.html": {
      "display": "assets/covers/source-terminal.webp",
      "og": "assets/covers/source-terminal.png"
    },
    "traces/external-coupler.html": {
      "display": "assets/covers/external-coupler.webp",
      "og": "assets/covers/external-coupler.png"
    }
  },
  "categories": [
    {
      "path": "buses/input-stage.html",
      "label": "输入端口",
      "articles": [
        "traces/trigger-card.html",
        "traces/operator-notes.html",
        "traces/open-circuit.html"
      ]
    },
    {
      "path": "buses/filter-stage.html",
      "label": "滤波层",
      "articles": [
        "traces/scope-gate.html",
        "traces/event-ruler.html",
        "traces/recheck-sequence.html"
      ]
    },
    {
      "path": "buses/gain-stage.html",
      "label": "增益段",
      "articles": [
        "traces/causal-route.html",
        "traces/isolation-switches.html",
        "traces/source-terminal.html"
      ]
    },
    {
      "path": "buses/return-stage.html",
      "label": "返回回路",
      "articles": [
        "traces/parallel-probes.html",
        "traces/threshold-matrix.html",
        "traces/external-coupler.html"
      ]
    }
  ],
  "toolIndex": "instrument-rack.html",
  "tools": [
    "instruments/window-union.html",
    "instruments/debounce-trace.html",
    "instruments/hamming-frame.html",
    "instruments/crc-remainder.html",
    "instruments/pulse-runs.html"
  ],
  "legal": {
    "about": "about.html",
    "contact": "contact.html",
    "disclosure": "disclosure.html",
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

## 完整变量登记

- %%ABOUT_CONTACT_NOTE%%
- %%ABOUT_H2_1%%
- %%ABOUT_H2_2%%
- %%ABOUT_H2_3%%
- %%ABOUT_H2_4%%
- %%ABOUT_INTRO%%
- %%ABOUT_TEXT_1%%
- %%ABOUT_TEXT_2%%
- %%ABOUT_TEXT_3%%
- %%ABOUT_TEXT_4%%
- %%AFFILIATE_DISCLOSURE%%
- %%AFFILIATE_LABEL%%
- %%AFFILIATE_URL%%
- %%ALERT_LABEL%%
- %%ALERT_TEXT%%
- %%AUTHOR_BIO%%
- %%AUTHOR_NAME%%
- %%BENEFIT_DISCLAIMER%%
- %%BENEFIT_RATE%%
- %%BRAND_EN%%
- %%BRAND_LINE%%
- %%BRAND_MARK%%
- %%BUS_1_INTRO%%
- %%BUS_1_STATE%%
- %%BUS_2_INTRO%%
- %%BUS_2_STATE%%
- %%BUS_3_INTRO%%
- %%BUS_3_STATE%%
- %%BUS_4_INTRO%%
- %%BUS_4_STATE%%
- %%CHANNELS_INTRO%%
- %%CHANNELS_TITLE%%
- %%CHECK_DATE%%
- %%CONTACT_CONTACT_NOTE%%
- %%CONTACT_EMAIL%%
- %%CONTACT_H2_1%%
- %%CONTACT_H2_2%%
- %%CONTACT_H2_3%%
- %%CONTACT_H2_4%%
- %%CONTACT_INTRO%%
- %%CONTACT_TEXT_1%%
- %%CONTACT_TEXT_2%%
- %%CONTACT_TEXT_3%%
- %%CONTACT_TEXT_4%%
- %%CORRECTIONS_CONTACT_NOTE%%
- %%CORRECTIONS_H2_1%%
- %%CORRECTIONS_H2_2%%
- %%CORRECTIONS_H2_3%%
- %%CORRECTIONS_H2_4%%
- %%CORRECTIONS_INTRO%%
- %%CORRECTIONS_TEXT_1%%
- %%CORRECTIONS_TEXT_2%%
- %%CORRECTIONS_TEXT_3%%
- %%CORRECTIONS_TEXT_4%%
- %%DISCLAIMER_CONTACT_NOTE%%
- %%DISCLAIMER_H2_1%%
- %%DISCLAIMER_H2_2%%
- %%DISCLAIMER_H2_3%%
- %%DISCLAIMER_H2_4%%
- %%DISCLAIMER_INTRO%%
- %%DISCLAIMER_TEXT_1%%
- %%DISCLAIMER_TEXT_2%%
- %%DISCLAIMER_TEXT_3%%
- %%DISCLAIMER_TEXT_4%%
- %%DISCLOSURE_CONTACT_NOTE%%
- %%DISCLOSURE_H2_1%%
- %%DISCLOSURE_H2_2%%
- %%DISCLOSURE_H2_3%%
- %%DISCLOSURE_H2_4%%
- %%DISCLOSURE_INTRO%%
- %%DISCLOSURE_TEXT_1%%
- %%DISCLOSURE_TEXT_2%%
- %%DISCLOSURE_TEXT_3%%
- %%DISCLOSURE_TEXT_4%%
- %%EDITORIAL_CONTACT_NOTE%%
- %%EDITORIAL_H2_1%%
- %%EDITORIAL_H2_2%%
- %%EDITORIAL_H2_3%%
- %%EDITORIAL_H2_4%%
- %%EDITORIAL_INTRO%%
- %%EDITORIAL_TEXT_1%%
- %%EDITORIAL_TEXT_2%%
- %%EDITORIAL_TEXT_3%%
- %%EDITORIAL_TEXT_4%%
- %%HERO_DESCRIPTION%%
- %%HERO_EYEBROW%%
- %%HERO_STATUS_LABEL%%
- %%HERO_STATUS_NOTE%%
- %%HERO_TITLE%%
- %%HOME_FEATURED_LABEL%%
- %%HOME_LATEST_LABEL%%
- %%HOME_LINKS_LABEL%%
- %%INDEPENDENCE_NOTE%%
- %%INVITE_CODE%%
- %%INVITE_LABEL%%
- %%LANG%%
- %%LEGACY_ARTICLE_INTRO%%
- %%LEGACY_LEGAL_INTRO%%
- %%LEGACY_TOOL_INTRO%%
- %%LOG_INTRO%%
- %%LOG_TITLE%%
- %%NOT_FOUND_INTRO%%
- %%PRIVACY_CONTACT_NOTE%%
- %%PRIVACY_H2_1%%
- %%PRIVACY_H2_2%%
- %%PRIVACY_H2_3%%
- %%PRIVACY_H2_4%%
- %%PRIVACY_INTRO%%
- %%PRIVACY_TEXT_1%%
- %%PRIVACY_TEXT_2%%
- %%PRIVACY_TEXT_3%%
- %%PRIVACY_TEXT_4%%
- %%RACK_INTRO%%
- %%RACK_TITLE%%
- %%RISK_NOTE%%
- %%RSS_DATE%%
- %%SCOPE_CHANNEL%%
- %%SCOPE_FIELD_1%%
- %%SCOPE_FIELD_2%%
- %%SCOPE_FIELD_3%%
- %%SCOPE_LABEL%%
- %%SCOPE_NOTE%%
- %%SCOPE_VALUE_1%%
- %%SCOPE_VALUE_2%%
- %%SCOPE_VALUE_3%%
- %%SECURITY_EMAIL%%
- %%SECURITY_EXPIRES%%
- %%SEO_TITLE%%
- %%SITE_DESC%%
- %%SITE_DOMAIN%%
- %%SITE_NAME%%
- %%SITE_TAGLINE%%
- %%SITE_UPDATED%%
- %%T10_CAPTION%%
- %%T10_CHECKED%%
- %%T10_CLOSING%%
- %%T10_COVER_ALT%%
- %%T10_DATE_LABEL%%
- %%T10_EYEBROW%%
- %%T10_FAQ_A_1%%
- %%T10_FAQ_A_2%%
- %%T10_FAQ_A_3%%
- %%T10_FAQ_LABEL%%
- %%T10_FAQ_Q_1%%
- %%T10_FAQ_Q_2%%
- %%T10_FAQ_Q_3%%
- %%T10_H2_1%%
- %%T10_H2_2%%
- %%T10_H2_3%%
- %%T10_H2_4%%
- %%T10_MODIFIED%%
- %%T10_NEXT_LABEL%%
- %%T10_NEXT_TEXT%%
- %%T10_POINT_1%%
- %%T10_POINT_2%%
- %%T10_POINT_3%%
- %%T10_PUBLISHED%%
- %%T10_QUOTE%%
- %%T10_QUOTE_CITE%%
- %%T10_RECHECK_1_MARK%%
- %%T10_RECHECK_1_TEXT%%
- %%T10_RECHECK_1_TITLE%%
- %%T10_RECHECK_2_MARK%%
- %%T10_RECHECK_2_TEXT%%
- %%T10_RECHECK_2_TITLE%%
- %%T10_RECHECK_3_MARK%%
- %%T10_RECHECK_3_TEXT%%
- %%T10_RECHECK_3_TITLE%%
- %%T10_RECHECK_INTRO%%
- %%T10_RECHECK_LABEL%%
- %%T10_RSS_DATE%%
- %%T10_SOURCES_LABEL%%
- %%T10_SOURCE_NOTE_1%%
- %%T10_SOURCE_NOTE_2%%
- %%T10_SOURCE_TITLE_1%%
- %%T10_SOURCE_TITLE_2%%
- %%T10_SOURCE_URL_1%%
- %%T10_SOURCE_URL_2%%
- %%T10_STATUS%%
- %%T10_SUMMARY%%
- %%T10_TEXT_1%%
- %%T10_TEXT_2%%
- %%T10_TEXT_3%%
- %%T10_TEXT_4%%
- %%T10_TITLE%%
- %%T10_TRACE_MARK%%
- %%T11_CAPTION%%
- %%T11_CHECKED%%
- %%T11_CLOSING%%
- %%T11_COVER_ALT%%
- %%T11_DATE_LABEL%%
- %%T11_EYEBROW%%
- %%T11_FAQ_A_1%%
- %%T11_FAQ_A_2%%
- %%T11_FAQ_A_3%%
- %%T11_FAQ_LABEL%%
- %%T11_FAQ_Q_1%%
- %%T11_FAQ_Q_2%%
- %%T11_FAQ_Q_3%%
- %%T11_H2_1%%
- %%T11_H2_2%%
- %%T11_H2_3%%
- %%T11_H2_4%%
- %%T11_MODIFIED%%
- %%T11_NEXT_LABEL%%
- %%T11_NEXT_TEXT%%
- %%T11_POINT_1%%
- %%T11_POINT_2%%
- %%T11_POINT_3%%
- %%T11_PUBLISHED%%
- %%T11_QUOTE%%
- %%T11_QUOTE_CITE%%
- %%T11_RSS_DATE%%
- %%T11_SOURCES_LABEL%%
- %%T11_SOURCE_NOTE_1%%
- %%T11_SOURCE_NOTE_2%%
- %%T11_SOURCE_TITLE_1%%
- %%T11_SOURCE_TITLE_2%%
- %%T11_SOURCE_URL_1%%
- %%T11_SOURCE_URL_2%%
- %%T11_STATUS%%
- %%T11_SUMMARY%%
- %%T11_TERMINAL_1_LABEL%%
- %%T11_TERMINAL_1_NOTE%%
- %%T11_TERMINAL_1_TEXT%%
- %%T11_TERMINAL_2_LABEL%%
- %%T11_TERMINAL_2_NOTE%%
- %%T11_TERMINAL_2_TEXT%%
- %%T11_TERMINAL_3_LABEL%%
- %%T11_TERMINAL_3_NOTE%%
- %%T11_TERMINAL_3_TEXT%%
- %%T11_TEXT_1%%
- %%T11_TEXT_2%%
- %%T11_TEXT_3%%
- %%T11_TEXT_4%%
- %%T11_TITLE%%
- %%T11_TRACE_MARK%%
- %%T12_CAPTION%%
- %%T12_CHECKED%%
- %%T12_CLOSING%%
- %%T12_COUPLER_NOTE%%
- %%T12_COVER_ALT%%
- %%T12_DATE_LABEL%%
- %%T12_EXTERNAL_TEXT%%
- %%T12_EXTERNAL_TITLE%%
- %%T12_EYEBROW%%
- %%T12_FAQ_A_1%%
- %%T12_FAQ_A_2%%
- %%T12_FAQ_A_3%%
- %%T12_FAQ_LABEL%%
- %%T12_FAQ_Q_1%%
- %%T12_FAQ_Q_2%%
- %%T12_FAQ_Q_3%%
- %%T12_H2_1%%
- %%T12_H2_2%%
- %%T12_H2_3%%
- %%T12_H2_4%%
- %%T12_LOCAL_TEXT%%
- %%T12_LOCAL_TITLE%%
- %%T12_MODIFIED%%
- %%T12_NEXT_LABEL%%
- %%T12_NEXT_TEXT%%
- %%T12_POINT_1%%
- %%T12_POINT_2%%
- %%T12_POINT_3%%
- %%T12_PUBLISHED%%
- %%T12_QUOTE%%
- %%T12_QUOTE_CITE%%
- %%T12_SOURCES_LABEL%%
- %%T12_SOURCE_NOTE_1%%
- %%T12_SOURCE_NOTE_2%%
- %%T12_SOURCE_TITLE_1%%
- %%T12_SOURCE_TITLE_2%%
- %%T12_SOURCE_URL_1%%
- %%T12_SOURCE_URL_2%%
- %%T12_STATUS%%
- %%T12_SUMMARY%%
- %%T12_TEXT_1%%
- %%T12_TEXT_2%%
- %%T12_TEXT_3%%
- %%T12_TEXT_4%%
- %%T12_TITLE%%
- %%T12_TRACE_MARK%%
- %%T1_CAPTION%%
- %%T1_CHECKED%%
- %%T1_CLOSING%%
- %%T1_COVER_ALT%%
- %%T1_DATE_LABEL%%
- %%T1_EYEBROW%%
- %%T1_FAQ_A_1%%
- %%T1_FAQ_A_2%%
- %%T1_FAQ_A_3%%
- %%T1_FAQ_LABEL%%
- %%T1_FAQ_Q_1%%
- %%T1_FAQ_Q_2%%
- %%T1_FAQ_Q_3%%
- %%T1_FIELD_1%%
- %%T1_FIELD_2%%
- %%T1_FIELD_3%%
- %%T1_FIELD_4%%
- %%T1_H2_1%%
- %%T1_H2_2%%
- %%T1_H2_3%%
- %%T1_H2_4%%
- %%T1_MODIFIED%%
- %%T1_NEXT_LABEL%%
- %%T1_NEXT_TEXT%%
- %%T1_POINT_1%%
- %%T1_POINT_2%%
- %%T1_POINT_3%%
- %%T1_PUBLISHED%%
- %%T1_QUOTE%%
- %%T1_QUOTE_CITE%%
- %%T1_RSS_DATE%%
- %%T1_SOURCES_LABEL%%
- %%T1_SOURCE_NOTE_1%%
- %%T1_SOURCE_NOTE_2%%
- %%T1_SOURCE_TITLE_1%%
- %%T1_SOURCE_TITLE_2%%
- %%T1_SOURCE_URL_1%%
- %%T1_SOURCE_URL_2%%
- %%T1_STATUS%%
- %%T1_SUMMARY%%
- %%T1_TEXT_1%%
- %%T1_TEXT_2%%
- %%T1_TEXT_3%%
- %%T1_TEXT_4%%
- %%T1_TITLE%%
- %%T1_TRACE_MARK%%
- %%T1_TRIGGER_LABEL%%
- %%T1_TRIGGER_NOTE%%
- %%T1_TRIGGER_VALUE%%
- %%T1_VALUE_1%%
- %%T1_VALUE_2%%
- %%T1_VALUE_3%%
- %%T1_VALUE_4%%
- %%T2_ALLOW_TEXT%%
- %%T2_ALLOW_TITLE%%
- %%T2_CAPTION%%
- %%T2_CHECKED%%
- %%T2_CLOSING%%
- %%T2_COVER_ALT%%
- %%T2_DATE_LABEL%%
- %%T2_EXCLUDE_TEXT%%
- %%T2_EXCLUDE_TITLE%%
- %%T2_EYEBROW%%
- %%T2_FAQ_A_1%%
- %%T2_FAQ_A_2%%
- %%T2_FAQ_A_3%%
- %%T2_FAQ_LABEL%%
- %%T2_FAQ_Q_1%%
- %%T2_FAQ_Q_2%%
- %%T2_FAQ_Q_3%%
- %%T2_GATE_NOTE%%
- %%T2_H2_1%%
- %%T2_H2_2%%
- %%T2_H2_3%%
- %%T2_H2_4%%
- %%T2_MODIFIED%%
- %%T2_NEXT_LABEL%%
- %%T2_NEXT_TEXT%%
- %%T2_POINT_1%%
- %%T2_POINT_2%%
- %%T2_POINT_3%%
- %%T2_PUBLISHED%%
- %%T2_QUOTE%%
- %%T2_QUOTE_CITE%%
- %%T2_RSS_DATE%%
- %%T2_SOURCES_LABEL%%
- %%T2_SOURCE_NOTE_1%%
- %%T2_SOURCE_NOTE_2%%
- %%T2_SOURCE_TITLE_1%%
- %%T2_SOURCE_TITLE_2%%
- %%T2_SOURCE_URL_1%%
- %%T2_SOURCE_URL_2%%
- %%T2_STATUS%%
- %%T2_SUMMARY%%
- %%T2_TEXT_1%%
- %%T2_TEXT_2%%
- %%T2_TEXT_3%%
- %%T2_TEXT_4%%
- %%T2_TITLE%%
- %%T2_TRACE_MARK%%
- %%T3_CAPTION%%
- %%T3_CHECKED%%
- %%T3_CLOSING%%
- %%T3_COVER_ALT%%
- %%T3_DATE_LABEL%%
- %%T3_EYEBROW%%
- %%T3_FAQ_A_1%%
- %%T3_FAQ_A_2%%
- %%T3_FAQ_A_3%%
- %%T3_FAQ_LABEL%%
- %%T3_FAQ_Q_1%%
- %%T3_FAQ_Q_2%%
- %%T3_FAQ_Q_3%%
- %%T3_H2_1%%
- %%T3_H2_2%%
- %%T3_H2_3%%
- %%T3_H2_4%%
- %%T3_MODIFIED%%
- %%T3_NEXT_LABEL%%
- %%T3_NEXT_TEXT%%
- %%T3_NODE_1_LABEL%%
- %%T3_NODE_1_TEXT%%
- %%T3_NODE_1_TITLE%%
- %%T3_NODE_2_LABEL%%
- %%T3_NODE_2_TEXT%%
- %%T3_NODE_2_TITLE%%
- %%T3_NODE_3_LABEL%%
- %%T3_NODE_3_TEXT%%
- %%T3_NODE_3_TITLE%%
- %%T3_NODE_4_LABEL%%
- %%T3_NODE_4_TEXT%%
- %%T3_NODE_4_TITLE%%
- %%T3_POINT_1%%
- %%T3_POINT_2%%
- %%T3_POINT_3%%
- %%T3_PUBLISHED%%
- %%T3_QUOTE%%
- %%T3_QUOTE_CITE%%
- %%T3_RSS_DATE%%
- %%T3_SOURCES_LABEL%%
- %%T3_SOURCE_NOTE_1%%
- %%T3_SOURCE_NOTE_2%%
- %%T3_SOURCE_TITLE_1%%
- %%T3_SOURCE_TITLE_2%%
- %%T3_SOURCE_URL_1%%
- %%T3_SOURCE_URL_2%%
- %%T3_STATUS%%
- %%T3_SUMMARY%%
- %%T3_TEXT_1%%
- %%T3_TEXT_2%%
- %%T3_TEXT_3%%
- %%T3_TEXT_4%%
- %%T3_TITLE%%
- %%T3_TRACE_MARK%%
- %%T4_CAPTION%%
- %%T4_CHECKED%%
- %%T4_CLOSING%%
- %%T4_COVER_ALT%%
- %%T4_DATE_LABEL%%
- %%T4_EYEBROW%%
- %%T4_FAQ_A_1%%
- %%T4_FAQ_A_2%%
- %%T4_FAQ_A_3%%
- %%T4_FAQ_LABEL%%
- %%T4_FAQ_Q_1%%
- %%T4_FAQ_Q_2%%
- %%T4_FAQ_Q_3%%
- %%T4_H2_1%%
- %%T4_H2_2%%
- %%T4_H2_3%%
- %%T4_H2_4%%
- %%T4_MODIFIED%%
- %%T4_NEXT_LABEL%%
- %%T4_NEXT_TEXT%%
- %%T4_POINT_1%%
- %%T4_POINT_2%%
- %%T4_POINT_3%%
- %%T4_PROBE_1_FIELD_1%%
- %%T4_PROBE_1_FIELD_2%%
- %%T4_PROBE_1_FIELD_3%%
- %%T4_PROBE_1_TEXT%%
- %%T4_PROBE_1_TITLE%%
- %%T4_PROBE_1_VALUE_1%%
- %%T4_PROBE_1_VALUE_2%%
- %%T4_PROBE_1_VALUE_3%%
- %%T4_PROBE_2_FIELD_1%%
- %%T4_PROBE_2_FIELD_2%%
- %%T4_PROBE_2_FIELD_3%%
- %%T4_PROBE_2_TEXT%%
- %%T4_PROBE_2_TITLE%%
- %%T4_PROBE_2_VALUE_1%%
- %%T4_PROBE_2_VALUE_2%%
- %%T4_PROBE_2_VALUE_3%%
- %%T4_PUBLISHED%%
- %%T4_QUOTE%%
- %%T4_QUOTE_CITE%%
- %%T4_RSS_DATE%%
- %%T4_SOURCES_LABEL%%
- %%T4_SOURCE_NOTE_1%%
- %%T4_SOURCE_NOTE_2%%
- %%T4_SOURCE_TITLE_1%%
- %%T4_SOURCE_TITLE_2%%
- %%T4_SOURCE_URL_1%%
- %%T4_SOURCE_URL_2%%
- %%T4_STATUS%%
- %%T4_SUMMARY%%
- %%T4_TEXT_1%%
- %%T4_TEXT_2%%
- %%T4_TEXT_3%%
- %%T4_TEXT_4%%
- %%T4_TITLE%%
- %%T4_TRACE_MARK%%
- %%T5_CAPTION%%
- %%T5_CHECKED%%
- %%T5_CLOSING%%
- %%T5_COVER_ALT%%
- %%T5_DATE_LABEL%%
- %%T5_EYEBROW%%
- %%T5_FAQ_A_1%%
- %%T5_FAQ_A_2%%
- %%T5_FAQ_A_3%%
- %%T5_FAQ_LABEL%%
- %%T5_FAQ_Q_1%%
- %%T5_FAQ_Q_2%%
- %%T5_FAQ_Q_3%%
- %%T5_H2_1%%
- %%T5_H2_2%%
- %%T5_H2_3%%
- %%T5_H2_4%%
- %%T5_MODIFIED%%
- %%T5_NEXT_LABEL%%
- %%T5_NEXT_TEXT%%
- %%T5_NOTE_1_LABEL%%
- %%T5_NOTE_1_QUOTE%%
- %%T5_NOTE_1_TEXT%%
- %%T5_NOTE_2_LABEL%%
- %%T5_NOTE_2_QUOTE%%
- %%T5_NOTE_2_TEXT%%
- %%T5_NOTE_3_LABEL%%
- %%T5_NOTE_3_QUOTE%%
- %%T5_NOTE_3_TEXT%%
- %%T5_POINT_1%%
- %%T5_POINT_2%%
- %%T5_POINT_3%%
- %%T5_PUBLISHED%%
- %%T5_QUOTE%%
- %%T5_QUOTE_CITE%%
- %%T5_RSS_DATE%%
- %%T5_SOURCES_LABEL%%
- %%T5_SOURCE_NOTE_1%%
- %%T5_SOURCE_NOTE_2%%
- %%T5_SOURCE_TITLE_1%%
- %%T5_SOURCE_TITLE_2%%
- %%T5_SOURCE_URL_1%%
- %%T5_SOURCE_URL_2%%
- %%T5_STATUS%%
- %%T5_SUMMARY%%
- %%T5_TEXT_1%%
- %%T5_TEXT_2%%
- %%T5_TEXT_3%%
- %%T5_TEXT_4%%
- %%T5_TITLE%%
- %%T5_TRACE_MARK%%
- %%T6_CAPTION%%
- %%T6_CHECKED%%
- %%T6_CLOSING%%
- %%T6_COVER_ALT%%
- %%T6_DATE_LABEL%%
- %%T6_EVENT_1_MARK%%
- %%T6_EVENT_1_TEXT%%
- %%T6_EVENT_1_TITLE%%
- %%T6_EVENT_2_MARK%%
- %%T6_EVENT_2_TEXT%%
- %%T6_EVENT_2_TITLE%%
- %%T6_EVENT_3_MARK%%
- %%T6_EVENT_3_TEXT%%
- %%T6_EVENT_3_TITLE%%
- %%T6_EVENT_4_MARK%%
- %%T6_EVENT_4_TEXT%%
- %%T6_EVENT_4_TITLE%%
- %%T6_EYEBROW%%
- %%T6_FAQ_A_1%%
- %%T6_FAQ_A_2%%
- %%T6_FAQ_A_3%%
- %%T6_FAQ_LABEL%%
- %%T6_FAQ_Q_1%%
- %%T6_FAQ_Q_2%%
- %%T6_FAQ_Q_3%%
- %%T6_H2_1%%
- %%T6_H2_2%%
- %%T6_H2_3%%
- %%T6_H2_4%%
- %%T6_MODIFIED%%
- %%T6_NEXT_LABEL%%
- %%T6_NEXT_TEXT%%
- %%T6_POINT_1%%
- %%T6_POINT_2%%
- %%T6_POINT_3%%
- %%T6_PUBLISHED%%
- %%T6_QUOTE%%
- %%T6_QUOTE_CITE%%
- %%T6_RSS_DATE%%
- %%T6_SOURCES_LABEL%%
- %%T6_SOURCE_NOTE_1%%
- %%T6_SOURCE_NOTE_2%%
- %%T6_SOURCE_TITLE_1%%
- %%T6_SOURCE_TITLE_2%%
- %%T6_SOURCE_URL_1%%
- %%T6_SOURCE_URL_2%%
- %%T6_STATUS%%
- %%T6_SUMMARY%%
- %%T6_TEXT_1%%
- %%T6_TEXT_2%%
- %%T6_TEXT_3%%
- %%T6_TEXT_4%%
- %%T6_TITLE%%
- %%T6_TRACE_MARK%%
- %%T7_CAPTION%%
- %%T7_CHECKED%%
- %%T7_CLOSING%%
- %%T7_COVER_ALT%%
- %%T7_DATE_LABEL%%
- %%T7_EYEBROW%%
- %%T7_FAQ_A_1%%
- %%T7_FAQ_A_2%%
- %%T7_FAQ_A_3%%
- %%T7_FAQ_LABEL%%
- %%T7_FAQ_Q_1%%
- %%T7_FAQ_Q_2%%
- %%T7_FAQ_Q_3%%
- %%T7_H2_1%%
- %%T7_H2_2%%
- %%T7_H2_3%%
- %%T7_H2_4%%
- %%T7_ISOLATION_1_NOTE%%
- %%T7_ISOLATION_1_TEXT%%
- %%T7_ISOLATION_1_TITLE%%
- %%T7_ISOLATION_2_NOTE%%
- %%T7_ISOLATION_2_TEXT%%
- %%T7_ISOLATION_2_TITLE%%
- %%T7_ISOLATION_3_NOTE%%
- %%T7_ISOLATION_3_TEXT%%
- %%T7_ISOLATION_3_TITLE%%
- %%T7_MODIFIED%%
- %%T7_NEXT_LABEL%%
- %%T7_NEXT_TEXT%%
- %%T7_POINT_1%%
- %%T7_POINT_2%%
- %%T7_POINT_3%%
- %%T7_PUBLISHED%%
- %%T7_QUOTE%%
- %%T7_QUOTE_CITE%%
- %%T7_RSS_DATE%%
- %%T7_SOURCES_LABEL%%
- %%T7_SOURCE_NOTE_1%%
- %%T7_SOURCE_NOTE_2%%
- %%T7_SOURCE_TITLE_1%%
- %%T7_SOURCE_TITLE_2%%
- %%T7_SOURCE_URL_1%%
- %%T7_SOURCE_URL_2%%
- %%T7_STATUS%%
- %%T7_SUMMARY%%
- %%T7_TEXT_1%%
- %%T7_TEXT_2%%
- %%T7_TEXT_3%%
- %%T7_TEXT_4%%
- %%T7_TITLE%%
- %%T7_TRACE_MARK%%
- %%T8_CAPTION%%
- %%T8_CELL_1_1%%
- %%T8_CELL_1_2%%
- %%T8_CELL_1_3%%
- %%T8_CELL_2_1%%
- %%T8_CELL_2_2%%
- %%T8_CELL_2_3%%
- %%T8_CELL_3_1%%
- %%T8_CELL_3_2%%
- %%T8_CELL_3_3%%
- %%T8_CELL_4_1%%
- %%T8_CELL_4_2%%
- %%T8_CELL_4_3%%
- %%T8_CHECKED%%
- %%T8_CLOSING%%
- %%T8_COLUMN_1%%
- %%T8_COLUMN_2%%
- %%T8_COLUMN_3%%
- %%T8_COLUMN_4%%
- %%T8_COVER_ALT%%
- %%T8_DATE_LABEL%%
- %%T8_EYEBROW%%
- %%T8_FAQ_A_1%%
- %%T8_FAQ_A_2%%
- %%T8_FAQ_A_3%%
- %%T8_FAQ_LABEL%%
- %%T8_FAQ_Q_1%%
- %%T8_FAQ_Q_2%%
- %%T8_FAQ_Q_3%%
- %%T8_H2_1%%
- %%T8_H2_2%%
- %%T8_H2_3%%
- %%T8_H2_4%%
- %%T8_MODIFIED%%
- %%T8_NEXT_LABEL%%
- %%T8_NEXT_TEXT%%
- %%T8_POINT_1%%
- %%T8_POINT_2%%
- %%T8_POINT_3%%
- %%T8_PUBLISHED%%
- %%T8_QUOTE%%
- %%T8_QUOTE_CITE%%
- %%T8_ROW_1%%
- %%T8_ROW_2%%
- %%T8_ROW_3%%
- %%T8_ROW_4%%
- %%T8_RSS_DATE%%
- %%T8_SOURCES_LABEL%%
- %%T8_SOURCE_NOTE_1%%
- %%T8_SOURCE_NOTE_2%%
- %%T8_SOURCE_TITLE_1%%
- %%T8_SOURCE_TITLE_2%%
- %%T8_SOURCE_URL_1%%
- %%T8_SOURCE_URL_2%%
- %%T8_STATUS%%
- %%T8_SUMMARY%%
- %%T8_TABLE_CAPTION%%
- %%T8_TEXT_1%%
- %%T8_TEXT_2%%
- %%T8_TEXT_3%%
- %%T8_TEXT_4%%
- %%T8_TITLE%%
- %%T8_TRACE_MARK%%
- %%T9_CAPTION%%
- %%T9_CHECKED%%
- %%T9_CLOSING%%
- %%T9_COVER_ALT%%
- %%T9_DATE_LABEL%%
- %%T9_EYEBROW%%
- %%T9_FAQ_A_1%%
- %%T9_FAQ_A_2%%
- %%T9_FAQ_A_3%%
- %%T9_FAQ_LABEL%%
- %%T9_FAQ_Q_1%%
- %%T9_FAQ_Q_2%%
- %%T9_FAQ_Q_3%%
- %%T9_H2_1%%
- %%T9_H2_2%%
- %%T9_H2_3%%
- %%T9_H2_4%%
- %%T9_MODIFIED%%
- %%T9_NEXT_LABEL%%
- %%T9_NEXT_TEXT%%
- %%T9_OPEN_LABEL%%
- %%T9_OPEN_NOTE%%
- %%T9_OPEN_POINT_1%%
- %%T9_OPEN_POINT_2%%
- %%T9_OPEN_POINT_3%%
- %%T9_OPEN_TEXT%%
- %%T9_OPEN_TITLE%%
- %%T9_POINT_1%%
- %%T9_POINT_2%%
- %%T9_POINT_3%%
- %%T9_PUBLISHED%%
- %%T9_QUOTE%%
- %%T9_QUOTE_CITE%%
- %%T9_RSS_DATE%%
- %%T9_SOURCES_LABEL%%
- %%T9_SOURCE_NOTE_1%%
- %%T9_SOURCE_NOTE_2%%
- %%T9_SOURCE_TITLE_1%%
- %%T9_SOURCE_TITLE_2%%
- %%T9_SOURCE_URL_1%%
- %%T9_SOURCE_URL_2%%
- %%T9_STATUS%%
- %%T9_SUMMARY%%
- %%T9_TEXT_1%%
- %%T9_TEXT_2%%
- %%T9_TEXT_3%%
- %%T9_TEXT_4%%
- %%T9_TITLE%%
- %%T9_TRACE_MARK%%
- %%TOOL_1_INTRO%%
- %%TOOL_2_INTRO%%
- %%TOOL_3_INTRO%%
- %%TOOL_4_INTRO%%
- %%TOOL_5_INTRO%%

## 审计

运行 validate、audit-template、audit-workflow-readiness、全库 check-similarity，再运行 tools/qa/066-signal-uptime-browser.js 的逐页矩阵、工具边界与实际交互验收；人工查看各开场、十二组件、手机长文、表格与图形。通过后才记入仓库进度。
