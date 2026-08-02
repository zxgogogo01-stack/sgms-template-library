# 军哥模版库复刻蓝图（2026-07-27 定稿）

> 源库：`C:\Users\Admin\Desktop\军哥模版库\partials\`（CCVAR CMS，Go html/template）
> 内容：73 个 `home_*` 首页版式 + 共享 head/header(8 种变体)/footer + 5128 行 `style.css` 设计系统
> 站主指令：**他有多少个就复刻多少个** → 73 个复刻模板，编号 051-123。

## 复刻原则

1. **复刻的是布局骨架与品质水准，不是字节**。军哥库是"一套设计系统 + 73 个版式"；直接照搬共享 CSS = 最强同源指纹（规格红线）。每个复刻模板：
   - 布局结构忠实还原（栅格、区块次序、层级关系、交互形态）
   - CSS 全部独立重写：**换配色体系**（军哥默认暖纸+赭石只保留给少数几个，其余每模板配一套新的完整色板）、**换类名词汇**（不沿用 bento-/ct-/wg- 等原前缀）、换字体栈组合、换断点数值、换圆角/阴影参数
   - 品质基准 = 军哥 style.css 的精致度（设计令牌、深浅双主题、微交互、毛玻璃 sticky 头、衬线/无衬线混排）+ batches/quality-bar.md
2. **静态化改写**：
   - `{{range .Posts}}` 等循环 → 静态写 6-10 条占位条目
   - `{{.Tr.T "..."}}` 界面字符串 → 直接写中文（个别模板英文）
   - `{{.Site.*}}` → 本库占位符（**注意：复刻模板占位符语法避开 `{{X}}`**，轮换用 `%%X%%` / `~X~` / `__X__` / `[[X]]` / `{X}`，防与 Go 语法混淆也维持批间差异）
   - `data-visual-edit` 编辑器属性 → 删；语言切换 → 简化或删；搜索入口 → 保留为占位链接或删
   - menu-toggle 汉堡 → 保留（纯 JS class 切换或 checkbox hack 轮换实现）
3. **页面套件**：每模板仍产出 index/article/tool/legal/404/robots/sitemap/TEMPLATE.md（article 骨架参考军哥对应主题族的内容页气质自行设计；tool 延续"真功能小工具"传统，优先返佣/费率场景）。
4. **返佣工作流硬规矩——灵活吸收**（站主 2026-07-27 指示：模板别做死，建站 AI 可调）：
   - 首屏转化区三件套（邀请码明文+一键复制真功能+"最高 20% 手续费减免*"利益点）：**默认做进 hero 内或紧贴 hero 的引导条**，整块可删可移，TEMPLATE.md 注明
   - Logo 位默认英文 wordmark 占位（如 `%%BRAND_EN%%`），TEMPLATE.md 注明"左上角勿放中文"
   - 示例文案避开 AI 味禁词表（全面覆盖/一站式/赋能/助力/综上所述…），emoji=0
   - 不在 nav/页脚放注册漏斗 CTA；affiliate 直链不出现在模板里（转化页留注释示例：`<!-- 直链样例：<a href="%%AFF_URL%%" rel="sponsored nofollow noopener noreferrer" target="_blank">…</a> 仅转化页用，每页≤1 -->`）
   - 首页做宽内链枢纽的承载区（文章/工具列表区块预留扩容结构）
5. **防同源照旧**：类名词汇模板间重合 ≤15%；缩进(2/4)、引号(单/双)、注释语言(中/英/无)、占位符语法按序轮换；tools/check-similarity.js 全量验证。

## 版式清单与编号映射（73 个）

| # | 源 partial | 版式要点（复刻时 Read 源文件 + Grep style.css 对应前缀段） |
|---|---|---|
| 051 | home_bento | 便当格：hero 磁贴+特稿大卡+分类瓦片+文章卡混排 |
| 052 | home_split | 左右分屏 |
| 053 | home_axis | 中轴时间线 |
| 054 | home_bands | 横向色带分区 |
| 055 | home_ticker | 顶部滚动条+行情感列表 |
| 056 | home_board | 看板 |
| 057 | home_profile | 人物/侧写型 |
| 058 | home_timeline | 时间线 |
| 059 | home_poster | 海报型大字 |
| 060 | home_collage | 拼贴 |
| 061 | home_liftoff | 发射/上升叙事 |
| 062 | home_deck | 卡组 |
| 063 | home_cinema | 影院暗色大幅 |
| 064 | home_desktop | 桌面隐喻 |
| 065 | home_bloom | 绽放/径向 |
| 066 | home_uptime | 状态监控风 |
| 067 | home_constellation | 星座图 |
| 068 | home_almanac | 年鉴 |
| 069 | home_feed | 信息流 |
| 070 | home_gazette | 报纸 |
| 071 | home_inbox | 收件箱 |
| 072 | home_manual | 手册 |
| 073 | home_masonry | 瀑布流 |
| 074 | home_broadcast | 广播/电台 |
| 075 | home_catalog | 目录 |
| 076 | home_exhibit | 展览 |
| 077 | home_index | 索引页型 |
| 078 | home_field_ledger | 田野台账 |
| 079 | home_night_watch | 夜航值守 |
| 080 | home_paper_current | 纸面潮流（左书脊导航） |
| 081 | home_signal_archive | 信号档案 |
| 082 | home_orbit_index | 轨道索引 |
| 083 | home_type_cascade | 铅字瀑布（左侧品牌栏） |
| 084 | home_column_stage | 专栏舞台 |
| 085 | home_briefing_desk | 简报台（web3 指南族） |
| 086 | home_decision_wall | 决策墙（web3 指南族） |
| 087 | home_route_atlas | 路线图集（web3 指南族） |
| 088 | home_casebook | 案例簿（编辑合集族） |
| 089 | home_answer_desk | 问答台（编辑合集族） |
| 090 | home_portrait_journal | 肖像日志（编辑合集族） |
| 091 | home_counterpoint | 对位（编辑合集族） |
| 092 | home_margin_reading_room | 页边阅览室（编辑合集族） |
| 093 | home_progress_bulletin | 进度公报（编辑合集族） |
| 094 | home_night_corridor | 夜廊（编辑合集族） |
| 095 | home_seamless_canvas | 无缝画布（编辑合集族） |
| 096 | home_open_ascent | 开阔攀升（编辑合集族） |
| 097 | home_light_table | 灯桌（编辑合集族） |
| 098 | home_shelf_index | 书架索引（编辑合集族） |
| 099 | home_tradeoff_sheet | 取舍清单（编辑合集族） |
| 100 | home_pilot_flight_deck | 飞行甲板 |
| 101 | home_bistro | 小馆菜单风 |
| 102 | home_serial | 连载 |
| 103 | home_verse | 诗行 |
| 104 | home_departure | 出发/时刻表 |
| 105 | home_lexicon | 词典 |
| 106 | home_tracklist | 曲目单 |
| 107 | home_gutter | 装订沟 |
| 108 | home_marquee | 跑马灯 |
| 109 | home_archway | 拱门 |
| 110 | home_couplet | 对联双栏 |
| 111 | home_triptych | 三联画 |
| 112 | home_cover | 封面 |
| 113 | home_factory_trade | 外贸工厂-经典双层头 |
| 114 | home_factory_catalog | 外贸工厂-目录 |
| 115 | home_factory_showcase | 外贸工厂-陈列 |
| 116 | home_factory_onepage | 外贸工厂-单页锚点 |
| 117 | home_factory_engineering | 外贸工厂-工程 |
| 118 | home_factory_solutions | 外贸工厂-方案 |
| 119 | home_factory_vision | 外贸工厂-愿景 |
| 120 | home_factory_herofold | 外贸工厂-折叠首屏 |
| 121 | home_factory_sidebar | 外贸工厂-侧栏目录树 |
| 122 | home_dtc_flagship | DTC 旗舰店 |
| 123 | home_dtc_lookbook | DTC 画册 |
| 124 | home_dtc_solo | DTC 单品页 |

> 注：源库实际有 74 个 `home_*.html`，因此 `home_dtc_solo` 明确独立为 124，不再合并。`content_hero_animations.html` 是 hero 动效 partial，复刻对应模板时参考，不单独成模板。

## 军哥模板静态化规则（2026-07-31 修订）

- 军哥模板以忠实静态化为第一优先：保留源布局骨架、原始类名、视觉结构、公共页头和公共页脚。
- Go Template 的 `if`、`with`、`range`、变量和翻译调用改成静态 HTML、可替换占位符及示例内容。
- 原包已有的 CSS、SVG 和结构直接复用，不做防同源式重命名、换色或重设计。
- 原包缺少的新布局专属 CSS 只能补全，不得借补全名义改变原布局信息层级。
- 每个输出目录都带齐自身所需资源，脱离动态 CMS 后可独立打开和部署。
- 051–085 先前按“重写独立设计”制作，均进入返工清单，必须逐个恢复源类名和源结构。

## 001-050 精品化回改（并行任务）

品质基准同上（军哥 style.css 水准）：设计令牌化、sticky 毛玻璃头/等价物、微交互、排版层级、完整页脚；各自保留已有类名词汇与批次流派（防同源不动），只重写视觉参数与丰富首屏。049/050 已初步精品化但撞 AI 审美黑名单（紫蓝渐变/玻璃拟态），回改时换气质。
