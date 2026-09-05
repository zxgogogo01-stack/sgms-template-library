"use strict";
const fs = require("fs");
const path = require("path");
const os = require("os");
const http = require("http");
const { spawn } = require("child_process");
const root = path.resolve("templates/088-umber-casebook");
const qa = fs.mkdtempSync(path.join(os.tmpdir(), "uc88-qa-"));
const contract = fs.readFileSync(path.join(root, "TEMPLATE.md"), "utf8");
const manifest = JSON.parse(contract.match(/```json workflow-ready-v2\s*([\s\S]*?)```/u)[1]);
const files = [...new Set([
  manifest.home, manifest.articleIndex, ...manifest.articles, ...manifest.categories.map((item) => item.path),
  manifest.toolIndex, ...manifest.tools, ...Object.values(manifest.legal), "case-changelog.html",
  manifest.error404, "article.html", "tool.html", "legal.html"
])];
const articleTitles = ["先固定问题，再打开案卷", "把事件排列成可见时间带", "给内容划出适用边界", "让每个说法回到来源", "保存材料的流转标签", "把独立佐证并排放置", "为相反材料保留位置", "给未知盖上明确印章", "并排保存多个可能解释", "记录当时如何作出判断", "写清重新打开记录的条件", "把公开入口与关系说明放在一起"];
const deskTitles = ["受理与范围", "来源与证物", "质证与未知", "归档与回看"];
const toolTitles = ["断言状态盘点", "来源覆盖矩阵", "时间线缝隙检查", "保管链核验", "结案门核验"];
const publicTitles = { ABOUT_TITLE: "案卷台章程", CONTACT_TITLE: "联系记录", DISCLOSURE_TITLE: "关系记录", DISCLAIMER_TITLE: "使用边界", PRIVACY_TITLE: "本地保管", CORRECTIONS_TITLE: "更正案卷", EDITORIAL_TITLE: "编辑规程", CHANGELOG_TITLE: "版本记录" };
let browser, socket, port, profile, callId = 0, current = "";
const pending = new Map(), errors = [], renders = [], checks = [];
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function fixture(token) {
  const match = token.match(/^A(\d+)_(.*)$/u), article = match ? Number(match[1]) - 1 : -1, key = match ? match[2] : token;
  if (token === "LANG") return "zh-Hans";
  if (token === "SITE_DOMAIN") return `127.0.0.1:${port}`;
  if (token === "SITE_NAME") return "赭色案卷台";
  if (token === "BRAND_EN") return "UMBER / CASEBOOK";
  if (token === "SITE_DESC") return "一套可直接替换文字的赭色案卷网站 UI，包含内容档案、分类桌、本地工具与公开说明。";
  if (token === "HOME_TITLE") return "把完整网站框架先装进一只案卷夹";
  if (token === "HERO_TITLE_LINE_1") return "完整框架，";
  if (token === "HERO_TITLE_LINE_2") return "等待核实文字。";
  if (token === "HERO_DESCRIPTION") return "页面、组件、导航、状态和边界都已搭好，后续编辑只需替换经核实的内容。";
  if (token === "PRIMARY_CTA") return "打开十二个内容档案";
  if (token === "SECONDARY_CTA") return "打开五件本地工具";
  if (token === "ACCESS_CARD_TITLE") return "公开访问记录";
  if (token === "ACCESS_CARD_DESC") return "集中展示经核实的识别码、适用利益点与条件说明。";
  if (token === "HOME_DESKS_TITLE") return "四张档案桌，各有清楚职责。";
  if (token === "HOME_DESKS_DESC") return "分类入口、文章归属和交接链接保持完整，替换文字时无需重做信息架构。";
  if (token === "HOME_REGISTER_TITLE") return "最近打开的四个内容位";
  if (token === "HOME_REGISTER_DESC") return "这里只演示组件密度、标题长度和状态布局，不提供业务正文。";
  if (token === "REGISTER_TITLE") return "十二个可直接填字的内容档案";
  if (token === "REGISTER_ACCENT") return "已完成 UI 装订";
  if (token === "REGISTER_DESC") return "每个档案都含独立封面、四段正文位、专属模块、FAQ、上下篇与分类回链。";
  if (token === "TOOLS_INDEX_TITLE") return "五件浏览器本地案卷工具";
  if (token === "TOOLS_INDEX_ACCENT") return "不上传输入";
  if (token === "TOOLS_INDEX_DESC") return "用确定性规则检查状态、来源、时间、保管链与结案门。";
  if (token === "INVITE_CODE") return "CASE880905";
  if (token === "BENEFIT_RATE") return "适用利益点";
  if (token === "BENEFIT_DISCLAIMER") return "条件、比例与有效期以经核实的正式说明为准。";
  if (token === "AFFILIATE_URL") return "https://example.org/verified-destination";
  if (token === "AFFILIATE_LABEL") return "查看经核实的相关服务";
  if (token === "AFFILIATE_DISCLOSURE") return "使用此入口可能产生推广关系，内容判断不受此关系影响。";
  if (token === "AFFILIATE_CARD_TITLE") return "公开访问卡片";
  if (token === "AFFILIATE_CARD_DESC") return "仅放经核实的访问入口、识别码与紧邻关系说明。";
  if (token === "CONTACT_EMAIL") return "casebook@example.com";
  if (token === "NOT_FOUND_TITLE") return "这份案卷不在当前抽屉。";
  if (token === "NOT_FOUND_DESC") return "页面可能改名、移动或撤下，请用本地目录寻找最近入口。";
  if (/^DESK_\d+_TITLE$/u.test(token)) return deskTitles[Number(token.match(/\d+/u)[0]) - 1];
  if (/^DESK_\d+_DESC$/u.test(token)) return "三个完整内容位已经装订，并保留分类回链、状态与交接组件。";
  if (/^TOOL_\d+_TITLE$/u.test(token)) return toolTitles[Number(token.match(/\d+/u)[0]) - 1];
  if (/^TOOL_\d+_DESC$/u.test(token)) return "在浏览器本地按明确合同核验输入并生成可复制的纯文字报告。";
  if (publicTitles[token]) return publicTitles[token];
  if (/^COMPAT_.*_TITLE$/u.test(token)) return "旧入口已并入完整案卷框架";
  if (/^COMPAT_.*_DESC$/u.test(token)) return "这个兼容入口只负责连接新的完整页面目录。";
  if (article >= 0 && key === "TITLE") return articleTitles[article];
  if (article >= 0 && key === "DESC") return "包含已装订的内容层级、证据字段、状态模块、FAQ 与交接链接。";
  if (/DATE_ISO/u.test(key)) return "2026-09-05";
  if (/DATE_TEXT/u.test(key)) return "2026.09.05";
  if (/STATUS/u.test(key)) return "OPEN / UI READY";
  if (/AUTHOR/u.test(key)) return "示例编辑席";
  if (/COVER_ALT/u.test(key)) return "赭色案卷抽象封面";
  if (/COVER_CAPTION/u.test(key)) return "独立 1200×630 封面资产；发布前替换说明文字。";
  if (/FAQ_\d+_Q/u.test(key)) return "这个内容位发布前还要核对什么？";
  if (/FAQ_\d+_A/u.test(key)) return "核对来源、日期、适用范围、例外、关系披露和仍未确认的部分。";
  if (/SECTION_\d+_TITLE/u.test(key)) return "这里放置经过核实的小节标题";
  if (/SECTION_\d+_BODY/u.test(key)) return "这里填写经核实的正文，分开事实、解释、适用范围与未知部分；组件结构和站内链接无需重做。";
  if (/MODULE_TITLE/u.test(key)) return "案卷专属结构模块";
  if (/FIELD_\d+/u.test(key)) return "待填字段";
  if (/TITLE|ACCENT/u.test(token)) return "完整 UI 内容位";
  if (/DESC|BODY|GUIDE/u.test(token)) return "这里填写经核实的文字，并保留现有结构、边界与交互合同。";
  return "待替换文字";
}
function fill(raw) { return raw.replace(/%%([A-Z0-9_]+)%%/gu, (_match, token) => fixture(token)).replaceAll(`https://127.0.0.1:${port}`, `http://127.0.0.1:${port}`); }
const server = http.createServer((request, response) => {
  const route = decodeURIComponent(new URL(request.url, "http://localhost").pathname).replace(/^\/+|\/+$/gu, "") || "index.html";
  const target = path.resolve(root, route);
  if (!target.startsWith(`${root}${path.sep}`) || !fs.existsSync(target) || !fs.statSync(target).isFile()) {
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
    response.end(fill(fs.readFileSync(path.join(root, "404.html"), "utf8"))); return;
  }
  const ext = path.extname(target).toLowerCase(), types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".ico": "image/x-icon", ".xml": "application/xml; charset=utf-8", ".txt": "text/plain; charset=utf-8" };
  response.writeHead(200, { "Content-Type": types[ext] || "application/octet-stream", "Cache-Control": "no-store" });
  const body = fs.readFileSync(target); response.end(/\.(?:html|xml|txt|svg)$/u.test(ext) ? fill(body.toString()) : body);
});
function send(method, params = {}) { return new Promise((resolve, reject) => { const id = ++callId; pending.set(id, { resolve, reject }); socket.send(JSON.stringify({ id, method, params })); }); }
async function evaluate(expression) { const value = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true, userGesture: true }); if (value.exceptionDetails) throw new Error(value.exceptionDetails.exception?.description || value.exceptionDetails.text); return value.result.value; }
function test(name, okay, detail = "") { checks.push({ name, ok: Boolean(okay), ...(okay ? {} : { detail }) }); if (!okay) console.log("CHECK FAIL", name, typeof detail === "string" ? detail : JSON.stringify(detail)); }
async function ready() { for (let i = 0; i < 240; i += 1) { if (await evaluate("document.readyState==='complete'&&[...document.images].every(image=>image.complete)")) return; await delay(25); } throw new Error(`readiness timeout ${current}`); }
async function go(file, width = 1440, theme = "dark", height = 900) {
  current = `${file}@${width}-${theme}`; await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 600 }); await send("Page.navigate", { url: `http://127.0.0.1:${port}/${file}` }); await ready();
  await evaluate(`localStorage.setItem('uc88-file',${JSON.stringify(theme)});location.reload()`); await ready();
  for (let i = 0; i < 120; i += 1) { if (await evaluate(`document.documentElement.dataset.uc88File===${JSON.stringify(theme)}`)) return; await delay(25); }
  throw new Error(`theme timeout ${current}`);
}
async function shot(name, selector = null) { if (selector) await evaluate(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:'center',inline:'nearest',behavior:'instant'})`); else await evaluate("window.scrollTo({top:0,left:0,behavior:'instant'})"); await evaluate("new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))"); const cap = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false }); fs.writeFileSync(path.join(qa, `${name}.png`), Buffer.from(cap.data, "base64")); }
async function click(selector) { await evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`); await delay(35); }
async function setValue(value) { await evaluate(`(()=>{const field=document.querySelector('#uc88-tool-input');field.value=${JSON.stringify(value)};field.dispatchEvent(new Event('input',{bubbles:true}))})()`); }
async function setExpression(expression) { await evaluate(`(()=>{const field=document.querySelector('#uc88-tool-input');field.value=${expression};field.dispatchEvent(new Event('input',{bubbles:true}))})()`); }
async function submit() { await click('button[type="submit"]'); }
async function reportText() { return evaluate("document.querySelector('[data-uc88-tool-output]').textContent"); }
async function invalid() { return evaluate("(()=>{const field=document.querySelector('#uc88-tool-input');return document.activeElement===field&&document.querySelector('[data-uc88-tool-copy]').disabled&&document.querySelector('[data-uc88-tool-report]').hidden&&document.querySelector('[data-uc88-tool-error]').textContent.length>0})()"); }

async function run() {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve)); port = server.address().port;
  profile = fs.mkdtempSync(path.join(os.tmpdir(), "uc88-chrome-"));
  browser = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", ["--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check", "--remote-debugging-port=0", `--user-data-dir=${profile}`, "about:blank"], { stdio: ["ignore", "ignore", "pipe"] });
  for (let i = 0; i < 180 && !fs.existsSync(path.join(profile, "DevToolsActivePort")); i += 1) await delay(50);
  const debugPort = fs.readFileSync(path.join(profile, "DevToolsActivePort"), "utf8").split("\n")[0];
  const target = await (await fetch(`http://127.0.0.1:${debugPort}/json/new?about:blank`, { method: "PUT" })).json();
  socket = new WebSocket(target.webSocketDebuggerUrl); await new Promise((resolve) => socket.addEventListener("open", resolve));
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.id) { const call = pending.get(message.id); pending.delete(message.id); if (!call) return; message.error ? call.reject(new Error(JSON.stringify(message.error))) : call.resolve(message.result); }
    else if (message.method === "Runtime.exceptionThrown") errors.push({ page: current, error: message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text });
    else if (message.method === "Runtime.consoleAPICalled" && message.params.type === "error") errors.push({ page: current, error: message.params.args.map((item) => item.value).join(" ") });
    else if (message.method === "Network.loadingFailed" && !message.params.canceled) errors.push({ page: current, error: message.params.errorText });
  });
  await send("Page.enable"); await send("Runtime.enable"); await send("Network.enable");
  await send("Browser.grantPermissions", { origin: `http://127.0.0.1:${port}`, permissions: ["clipboardReadWrite", "clipboardSanitizedWrite"] }); await send("Page.bringToFront");
  test("contract lists 36 unique HTML pages", files.length === 36, { count: files.length });
  const profiles = [[1440, "dark"], [1440, "open"], [768, "dark"], [768, "open"], [390, "dark"], [390, "open"], [360, "dark"], [360, "open"]];
  for (const [width, theme] of profiles) for (const file of files) {
    await go(file, width, theme);
    const result = await evaluate(`(()=>{const visible=e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return r.width>0&&r.height>0&&s.display!=='none'&&s.visibility!=='hidden'},ids=[...document.querySelectorAll('[id]')].map(e=>e.id),wide=[...document.querySelectorAll('body *')].map(e=>({e,r:e.getBoundingClientRect()})).filter(x=>x.r.right>innerWidth+1||x.r.left<-1).slice(0,8).map(x=>({tag:x.e.tagName,class:String(x.e.className),left:+x.r.left.toFixed(1),right:+x.r.right.toFixed(1)})),small=innerWidth<600?[...document.querySelectorAll('a,button,input,select,textarea,summary')].filter(visible).filter(e=>!e.classList.contains('uc88-skip')).filter(e=>{const r=e.getBoundingClientRect();return r.width<43.5||r.height<43.5}).map(e=>({tag:e.tagName,text:e.textContent.trim().slice(0,16),w:+e.getBoundingClientRect().width.toFixed(1),h:+e.getBoundingClientRect().height.toFixed(1)})):[];return{overflow:document.documentElement.scrollWidth>innerWidth+1,wide,bad:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),small,dupes:ids.filter((v,i)=>ids.indexOf(v)!==i),h1:document.querySelectorAll('h1').length,disclosure:document.body.textContent.includes('本站独立运营'),theme:document.documentElement.dataset.uc88File}})()`);
    const okay = !result.overflow && !result.wide.length && !result.bad.length && !result.small.length && !result.dupes.length && result.h1 === 1 && result.disclosure && result.theme === theme;
    renders.push({ file, width, theme, ok: okay, ...(okay ? {} : result) }); if (!okay) console.log("RENDER FAIL", current, JSON.stringify(result));
  }
  for (const [width, theme] of profiles) {
    await go("index.html", width, theme, 820);
    const top = await evaluate("(()=>{const card=document.querySelector('.uc88-access-slip'),rect=card.getBoundingClientRect();return{hero:!!document.querySelector('.uc88-case-hero'),bags:document.querySelectorAll('.uc88-bag').length,logs:document.querySelectorAll('.uc88-case-log li').length,visible:rect.top>=0&&rect.top<innerHeight,code:card.querySelector('code').textContent,enabled:!card.querySelector('button').disabled,benefit:card.textContent.includes('适用利益点'),foot:card.textContent.includes('条件、比例与有效期'),overflow:document.documentElement.scrollWidth>innerWidth+1}})()");
    test(`home casebook ${width} ${theme}`, top.hero && top.bags === 4 && top.logs === 4 && top.visible && top.code === "CASE880905" && top.enabled && top.benefit && top.foot && !top.overflow, top); await shot(`home-${width}-${theme}`);
  }
  await go("index.html", 390); await click("[data-uc88-copy-code]"); test("home code clipboard", await evaluate("navigator.clipboard.readText()") === "CASE880905");
  await click("[data-uc88-file-toggle]"); test("theme toggle", await evaluate("document.documentElement.dataset.uc88File==='open'&&getComputedStyle(document.documentElement).colorScheme==='light'"));
  await click(".uc88-menu"); test("menu focus", await evaluate("document.body.dataset.uc88Menu==='open'&&document.activeElement===document.querySelector('#uc88-nav a')"));
  await send("Input.dispatchKeyEvent", { type: "keyDown", key: "Escape", code: "Escape" }); test("escape refocus", await evaluate("document.body.dataset.uc88Menu==='closed'&&document.activeElement===document.querySelector('.uc88-menu')"));
  await go(manifest.articleIndex, 390); await click('[data-uc88-filter="intake"]'); test("filter three", await evaluate("document.querySelectorAll('[data-uc88-desk]:not([hidden])').length===3")); await click('[data-uc88-filter="all"]'); test("filter twelve", await evaluate("document.querySelectorAll('[data-uc88-desk]:not([hidden])').length===12")); await shot("register-mobile"); await go(manifest.articleIndex, 1440, "open"); await shot("register-desktop");
  const components = [".uc88-question-card", ".uc88-timeline-tape", ".uc88-scope-folder", ".uc88-source-string", ".uc88-custody-tag", ".uc88-corroboration-board", ".uc88-counter-file", ".uc88-uncertainty-seal", ".uc88-explanation-stack", ".uc88-decision-ledger", ".uc88-reopen-alarm", ".uc88-access-record"];
  for (let i = 0; i < 12; i += 1) { await go(manifest.articles[i], i % 2 ? 390 : 1440, i % 3 ? "dark" : "open"); test(`article module ${i + 1}`, await evaluate(`!!document.querySelector(${JSON.stringify(components[i])})`)); await shot(`module-${String(i + 1).padStart(2, "0")}`, components[i]); }
  await go(manifest.articles[0], 390); test("article anchors", await evaluate("[...document.querySelectorAll('.uc88-progress-card nav a')].length===4&&[...document.querySelectorAll('.uc88-progress-card nav a')].every(a=>document.querySelector(a.hash))")); test("FAQ native", await evaluate("document.querySelectorAll('.uc88-faq details').length===2")); await click(".uc88-faq details:first-of-type>summary"); test("FAQ opens", await evaluate("document.querySelector('.uc88-faq details:first-of-type').open")); const start = await evaluate("document.querySelector('[data-uc88-progress]').value"); await evaluate("window.scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'});new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))"); const end = await evaluate("document.querySelector('[data-uc88-progress]').value"); test("progress reaches end", start < 5 && end > 99.5, { start, end });
  await go(manifest.categories[0].path, 1440, "open"); await shot("desk-desktop"); await go(manifest.categories[2].path, 390); await shot("desk-mobile"); await go(manifest.toolIndex, 1440); await shot("tool-index"); await go(manifest.legal.about, 390, "open"); await shot("public-mobile");
  for (let i = 0; i < 5; i += 1) { await go(manifest.tools[i], 1440, i % 2 ? "open" : "dark"); await shot(`tool-${i + 1}-desktop`); await go(manifest.tools[i], 390, i % 2 ? "dark" : "open"); await shot(`tool-${i + 1}-mobile`); }
  let out;
  const valid = [
    "断言 A | CONFIRMED | 来源 01\n断言 B | OPEN | -\n断言 C | CONTESTED | 来源 03",
    "断言 A | 来源 01 | DIRECT\n断言 A | 来源 02 | CORROBORATING\n断言 B | 来源 03 | CORROBORATING",
    "事件 A | 2026-01-01T09:00 | 2026-01-01T09:30\n事件 B | 2026-01-01T10:00 | 2026-01-01T10:20",
    "物件 A | 1 | 人员 01 | RECEIVED\n物件 A | 2 | 人员 02 | SEALED\n物件 B | 1 | 人员 03 | RECEIVED",
    "来源完整 | REQUIRED | PASS\n关系披露 | REQUIRED | OPEN\n补充说明 | OPTIONAL | WAIVED"
  ];
  const exact = [
    ["断言总数：3", "已确认：1", "待核：1", "有争议：1", "来源覆盖：66.7%"],
    ["关系总数：3", "独立断言：2", "不同来源：3", "含直接来源：1", "直接来源缺口：1"],
    ["事件总数：2", "事件时长：50 分钟", "空档合计：30 分钟", "首尾跨度：80 分钟"],
    ["记录总数：3", "物件总数：2", "已封存：1", "流转中：1"],
    ["门槛总数：3", "已通过：1", "可选豁免：1", "必选阻塞：1", "结案状态：NOT READY"]
  ];
  const maxRows = [
    Array.from({ length: 300 }, (_, i) => `断言${i} | CONFIRMED | 来源${i}`).join("\n"),
    Array.from({ length: 300 }, (_, i) => `断言${i} | 来源${i} | DIRECT`).join("\n"),
    Array.from({ length: 300 }, (_, i) => { const a = new Date(Date.UTC(2026, 0, 1, 0, i * 2)), b = new Date(Date.UTC(2026, 0, 1, 0, i * 2 + 1)); return `事件${i} | ${a.toISOString().slice(0, 16)} | ${b.toISOString().slice(0, 16)}`; }).join("\n"),
    Array.from({ length: 300 }, (_, i) => `物件 A | ${i + 1} | 人员${i} | ${i ? "TRANSFERRED" : "RECEIVED"}`).join("\n"),
    Array.from({ length: 300 }, (_, i) => `门槛${i} | OPTIONAL | PASS`).join("\n")
  ];
  const badSpecific = [
    "断言 A | OPEN | -\n断言 A | CONFIRMED | 来源",
    "断言 A | 来源 01 | DIRECT\n断言 A | 来源 01 | CORROBORATING",
    "事件 A | 2026-02-30T09:00 | 2026-02-30T10:00",
    "物件 A | 1 | 人员 01 | RECEIVED\n物件 A | 2 | 人员 02 | SEALED\n物件 A | 3 | 人员 03 | TRANSFERRED",
    "必要条件 | REQUIRED | WAIVED"
  ];
  for (let i = 0; i < 5; i += 1) {
    await go(manifest.tools[i], 390); await setValue(valid[i]); await submit(); out = await reportText(); test(`tool ${i + 1} exact`, exact[i].every((part) => out.includes(part)), out); await shot(`tool-${i + 1}-result`, ".uc88-tool-report");
    await setValue(maxRows[i]); await submit(); test(`tool ${i + 1} accepts 300`, await evaluate("document.querySelector('[data-uc88-tool-count]').textContent==='300 ROWS'"));
    await setValue(badSpecific[i]); await submit(); test(`tool ${i + 1} semantic boundary`, await invalid());
  }
  const normalized = [
    ["断言Ａ ｜ ＣＯＮＦＩＲＭＥＤ ｜ 来源１", "断言总数：1"],
    ["断言Ａ ｜ 来源１ ｜ ＤＩＲＥＣＴ", "含直接来源：1"],
    ["事件Ａ ｜ ２０２６－０１－０１Ｔ０９：００ ｜ ２０２６－０１－０１Ｔ０９：３０", "事件时长：30 分钟"],
    ["物件Ａ ｜ １ ｜ 人员１ ｜ ＲＥＣＥＩＶＥＤ", "物件总数：1"],
    ["门槛Ａ ｜ ＯＰＴＩＯＮＡＬ ｜ ＷＡＩＶＥＤ", "可选豁免：1"]
  ];
  for (let i = 0; i < 5; i += 1) { await go(manifest.tools[i], 390); await setValue(normalized[i][0]); await submit(); out = await reportText(); test(`NFKC ${i + 1}`, out.includes(normalized[i][1]), out); }
  for (let i = 0; i < 5; i += 1) {
    await go(manifest.tools[i], 390); await setValue(Array.from({ length: 301 }, () => "X").join("\n")); await submit(); test(`row limit ${i + 1}`, await invalid());
    await setExpression("'A'.repeat(40001)"); await submit(); test(`raw limit ${i + 1}`, await invalid());
    await setExpression("String.fromCharCode(0xd800)"); await submit(); test(`Unicode malformed ${i + 1}`, await invalid());
    await setExpression("'A'+String.fromCharCode(1)"); await submit(); test(`control character ${i + 1}`, await invalid());
    await setValue(""); await submit(); test(`empty ${i + 1}`, await invalid()); await shot(`invalid-tool-${i + 1}`);
    await click('button[type="reset"]'); test(`reset ${i + 1}`, await evaluate("document.querySelector('[data-uc88-tool-report]').hidden&&document.querySelector('[data-uc88-tool-copy]').disabled&&!document.querySelector('[data-uc88-tool-error]').textContent"));
    test(`guide closed ${i + 1}`, await evaluate("!document.querySelector('.uc88-tool-guide').open&&document.querySelectorAll('.uc88-tool-guide h3').length===5")); await click(".uc88-tool-guide>summary"); test(`guide opens ${i + 1}`, await evaluate("document.querySelector('.uc88-tool-guide').open"));
  }
  for (let i = 0; i < 5; i += 1) { await go(manifest.tools[i], 390); await setValue(valid[i]); await submit(); const expected = await reportText(); await click("[data-uc88-tool-copy]"); test(`clipboard ${i + 1}`, await evaluate("navigator.clipboard.readText()") === expected); }
  await go(manifest.tools[0], 390); await setValue(valid[0]); await submit(); await evaluate("navigator.clipboard.writeText=()=>new Promise(resolve=>window.uc88Finish=resolve)"); await click("[data-uc88-tool-copy]"); await setValue("invalid"); await evaluate("window.uc88Finish()"); await delay(30); test("copy race invalidated", await evaluate("!document.querySelector('[data-uc88-tool-copy-status]').textContent&&document.querySelector('[data-uc88-tool-copy]').disabled"));
  await go(manifest.registrationGuide, 390); const promo = 'a[href="https://example.org/verified-destination"]'; test("one promotion", await evaluate(`document.querySelectorAll(${JSON.stringify(promo)}).length===1`)); test("promotion governance", await evaluate(`(()=>{const link=document.querySelector(${JSON.stringify(promo)});return link&&link.target==='_blank'&&['sponsored','nofollow','noopener','noreferrer'].every(value=>link.relList.contains(value))&&link.closest('.uc88-promo-card').textContent.includes('推广链接')})()`));
  await go("404.html", 390); await shot("404-mobile"); await evaluate("document.querySelector('#uc88-v2-query').value='';document.querySelector('[data-uc88-v2-search]').requestSubmit()"); test("404 empty focus", await evaluate("document.activeElement===document.querySelector('#uc88-v2-query')&&document.querySelector('[data-uc88-v2-search-result]').textContent.includes('请输入')")); await evaluate("document.querySelector('#uc88-v2-query').value='字'.repeat(81);document.querySelector('[data-uc88-v2-search]').requestSubmit()"); test("404 length", await evaluate("document.querySelector('[data-uc88-v2-search-result]').textContent.includes('不能超过')")); await evaluate("document.querySelector('#uc88-v2-query').value='工具';document.querySelector('[data-uc88-v2-search]').requestSubmit()"); test("404 route", await evaluate("document.querySelector('[data-uc88-v2-search-result] a').textContent.includes('五件本地')")); await evaluate("document.querySelector('#uc88-v2-query').value='<img src=x onerror=alert(1)>';document.querySelector('[data-uc88-v2-search]').requestSubmit()"); test("404 safe text", await evaluate("!document.querySelector('[data-uc88-v2-search-result] img')&&document.querySelector('[data-uc88-v2-search-result]').textContent.includes('没有完全匹配')"));
  const contrast = "function ch(c){if(c==='transparent')return[0,0,0,0];if(c.startsWith('color(srgb ')){const r=c.slice(11,-1).split('/'),n=r[0].trim().split(/\\s+/).map(Number);return[255*n[0],255*n[1],255*n[2],r[1]?Number(r[1]):1]}const n=c.match(/[\\d.]+/g).map(Number);return[n[0],n[1],n[2],n.length===4?n[3]:1]}function lum(v){const a=v.slice(0,3).map(n=>n/255).map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4);return.2126*a[0]+.7152*a[1]+.0722*a[2]}function bg(e){if(!e)return[255,255,255,1];const c=ch(getComputedStyle(e).backgroundColor),p=c[3]<1?bg(e.parentElement):[0,0,0,1];return[c[0]*c[3]+p[0]*(1-c[3]),c[1]*c[3]+p[1]*(1-c[3]),c[2]*c[3]+p[2]*(1-c[3]),1]}function ratio(s){const e=document.querySelector(s),b=bg(e),c=ch(getComputedStyle(e).color),f=[c[0]*c[3]+b[0]*(1-c[3]),c[1]*c[3]+b[1]*(1-c[3]),c[2]*c[3]+b[2]*(1-c[3])],x=lum(f),y=lum(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05)}";
  for (const theme of ["dark", "open"]) {
    await go("index.html", 1440, theme); await delay(200); let ratios = await evaluate(`(()=>{${contrast};return['.uc88-case-hero .uc88-lede','.uc88-bag p','.uc88-case-log p'].map(ratio)})()`); test(`home contrast ${theme}`, ratios.every((value) => value >= 4.5), ratios);
    await go(manifest.articles[0], 390, theme); ratios = await evaluate(`(()=>{${contrast};return['.uc88-reader>section>p','.article-cover figcaption','.uc88-faq p'].map(ratio)})()`); test(`article contrast ${theme}`, ratios.every((value) => value >= 4.5), ratios);
    await go(manifest.tools[0], 390, theme); await setValue(valid[0]); await submit(); ratios = await evaluate(`(()=>{${contrast};return['#uc88-tool-help','[data-uc88-tool-output]','.uc88-tool-guide p'].map(ratio)})()`); test(`tool contrast ${theme}`, ratios.every((value) => value >= 4.5), ratios);
    await go(manifest.legal.about, 390, theme); ratios = await evaluate(`(()=>{${contrast};return['.uc88-public-shell>header>p','.uc88-public-grid article p','.uc88-public-nav a'].map(ratio)})()`); test(`public contrast ${theme}`, ratios.every((value) => value >= 4.5), ratios);
  }
  await send("Emulation.setScriptExecutionDisabled", { value: true });
  for (const width of [1440, 768, 390, 360]) {
    current = `nojs-${width}`; await send("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 1, mobile: width < 600 }); await send("Page.navigate", { url: `http://127.0.0.1:${port}/index.html` }); await ready();
    test(`noJS nav ${width}`, await evaluate("getComputedStyle(document.querySelector('#uc88-nav')).display!=='none'&&[...document.querySelectorAll('#uc88-nav a')].every(a=>a.getBoundingClientRect().width>0)")); test(`noJS copy ${width}`, await evaluate("document.querySelector('[data-uc88-copy-code]').disabled"));
    await send("Page.navigate", { url: `http://127.0.0.1:${port}/${manifest.tools[0]}` }); await ready(); test(`noJS tool ${width}`, await evaluate("document.querySelector('button[type=submit]').disabled&&!!document.querySelector('.uc88-tool-guide')"));
    await send("Page.navigate", { url: `http://127.0.0.1:${port}/${manifest.articles[0]}` }); await ready(); test(`noJS article ${width}`, await evaluate("document.querySelectorAll('.uc88-progress-card nav a').length===4&&document.querySelectorAll('.uc88-faq details').length===2"));
  }
  await send("Emulation.setScriptExecutionDisabled", { value: false });
  await go("index.html", 390, "dark", 820); await evaluate("document.querySelector('.uc88-case-hero h1').textContent='字'.repeat(34);document.querySelector('.uc88-case-hero .uc88-lede').textContent='排'.repeat(160);document.querySelector('[data-uc88-copy-source]').textContent='K'.repeat(40);document.querySelector('.uc88-access-slip h2').textContent='条'.repeat(45)"); test("home stress", await evaluate("document.documentElement.scrollWidth<=innerWidth+1")); await shot("home-stress");
  const result = { qa, pages: files.length, renders, checks, errors, counts: { renders: renders.length, renderFailures: renders.filter((item) => !item.ok).length, checks: checks.length, failures: checks.filter((item) => !item.ok).length, errors: errors.length } };
  fs.writeFileSync(path.join(qa, "report.json"), JSON.stringify(result, null, 2));
  console.log(JSON.stringify({ qa, ...result.counts, screenshots: fs.readdirSync(qa).filter((file) => file.endsWith(".png")).length }));
  if (result.counts.renderFailures + result.counts.failures + result.counts.errors) process.exitCode = 1;
}
run().catch((error) => { console.error(error); process.exitCode = 1; }).finally(() => { try { if (socket) socket.close(); } catch (_error) {} try { server.close(); } catch (_error) {} try { if (browser) browser.kill("SIGKILL"); } catch (_error) {} setTimeout(() => process.exit(process.exitCode || 0), 250); });
