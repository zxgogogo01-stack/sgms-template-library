"use strict";

const fs = require("fs");
const path = require("path");
const os = require("os");
const http = require("http");
const { spawn } = require("child_process");

const root = path.resolve("templates/089-sage-answerdesk");
const qa = fs.mkdtempSync(path.join(os.tmpdir(), "sa89-qa-"));
const contract = fs.readFileSync(path.join(root, "TEMPLATE.md"), "utf8");
const manifest = JSON.parse(contract.match(/```json workflow-ready-v2\s*([\s\S]*?)```/u)[1]);
const files = [...new Set([
  manifest.home, manifest.articleIndex, ...manifest.articles, ...manifest.categories.map((item) => item.path),
  manifest.toolIndex, ...manifest.tools, ...Object.values(manifest.legal), "switchboard-changelog.html",
  manifest.error404, "article.html", "tool.html", "legal.html"
])];
const articleTitles = ["先复述问题，再接通回答", "把条件排列成可见线路", "为回答标出有效时间", "让关键结论回到原始依据", "给每份引用接上日期", "把事实与推断分线发送", "为例外保留独立端口", "让高风险问题及时升级", "给回答标记清楚版本", "用更正信号保留变化", "检查问答线路覆盖", "把公开入口与关系说明并置"];
const channelTitles = ["问题受理频道", "来源校验频道", "边界分流频道", "更新信号频道"];
const toolTitles = ["问句规范化去重", "必填字段覆盖", "回答时效核对", "来源层级盘点", "线路就绪检查"];
const publicTitles = { ABOUT_TITLE: "问答交换台章程", CONTACT_TITLE: "联系线路", DISCLOSURE_TITLE: "关系与来源披露", BOUNDARY_TITLE: "回答适用边界", PRIVACY_TITLE: "本地信号与隐私", CORRECTIONS_TITLE: "更正线路", EDITORIAL_TITLE: "编辑接线规则" };
let browser;
let socket;
let port;
let profile;
let callId = 0;
let current = "";
const pending = new Map();
const errors = [];
const renders = [];
const checks = [];
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function fixture(token) {
  const match = token.match(/^A(\d+)_(.*)$/u);
  const article = match ? Number(match[1]) - 1 : -1;
  const key = match ? match[2] : token;
  if (token === "LANG") return "zh-Hans";
  if (token === "SITE_DOMAIN") return `127.0.0.1:${port}`;
  if (token === "SITE_NAME") return "鼠尾草问答交换台";
  if (token === "BRAND_EN") return "SAGE / ANSWERDESK";
  if (token === "SITE_DESC") return "一套可直接替换文字的问答交换台网站 UI，包含回答模块、频道、本地工具与公开说明。";
  if (token === "SITE_TAGLINE") return "先接清问题，再发送答案。";
  if (token === "INDEPENDENCE_NOTE") return "内容标准与页面判断由本站独立负责";
  if (token === "HOME_TITLE") return "把完整回答网站接入一张交换台";
  if (token === "HOME_DESC") return "页面、组件、导航、状态与边界都已搭好，后续编辑只需替换经核实的文字。";
  if (token === "HERO_TITLE_LINE_1") return "完整线路，";
  if (token === "HERO_TITLE_LINE_2") return "等待核实文字。";
  if (token === "HERO_DESCRIPTION") return "十二个回答模块、四个频道与五件本地工具已经接通。";
  if (token === "PRIMARY_CTA") return "打开回答线路";
  if (token === "SECONDARY_CTA") return "打开本地工具";
  if (token === "BOARD_LABEL") return "LINE 089 / READY";
  if (token === "ACCESS_CARD_TITLE") return "公开访问识别码";
  if (token === "ACCESS_CARD_DESC") return "集中展示经核实的识别码、利益点与条件说明。";
  if (token === "HOME_CHANNELS_TITLE") return "四个频道，各有清楚职责。";
  if (token === "HOME_CHANNELS_DESC") return "从问题受理到来源、边界与更新，完整路径无需后续重搭。";
  if (token === "HOME_REGISTER_TITLE") return "十二个回答位已接通";
  if (token === "HOME_REGISTER_DESC") return "这里只演示组件密度、标题长度和交接布局，不提供业务正文。";
  if (token === "REGISTER_TITLE") return "十二个可直接填字的回答模块";
  if (token === "REGISTER_ACCENT") return "已完成线路接通";
  if (token === "REGISTER_DESC") return "每个模块都含独立封面、四段内容结构、专属字段、FAQ 和分类回链。";
  if (token === "TOOLS_INDEX_TITLE") return "五件浏览器本地线路工具";
  if (token === "TOOLS_INDEX_ACCENT") return "不上传输入";
  if (token === "TOOLS_INDEX_DESC") return "用确定性规则检查问句、字段、时效、来源层级与回答就绪度。";
  if (token === "INVITE_CODE") return "SAGE890905";
  if (token === "BENEFIT_RATE") return "适用利益点";
  if (token === "BENEFIT_DISCLAIMER") return "条件、比例与有效期以经核实的正式说明为准。";
  if (token === "AFFILIATE_URL") return "https://example.org/verified-destination";
  if (token === "AFFILIATE_LABEL") return "经核实的公开服务入口";
  if (token === "AFFILIATE_DISCLOSURE") return "使用此入口可能产生推广关系，内容判断不受此关系影响。";
  if (token === "AFFILIATE_CTA") return "访问公开服务";
  if (token === "CONTACT_EMAIL") return "answerdesk@example.com";
  if (token === "NOT_FOUND_TITLE") return "这条线路没有接通。";
  if (token === "NOT_FOUND_DESC") return "页面可能改名、移动或撤下，请用本地目录寻找最近入口。";
  if (/^CHANNEL_\d+_TITLE$/u.test(token)) return channelTitles[Number(token.match(/\d+/u)[0]) - 1];
  if (/^CHANNEL_\d+_DESC$/u.test(token)) return "三个完整回答位已经接线，并保留频道回链与交接组件。";
  if (/^TOOL_\d+_TITLE$/u.test(token)) return toolTitles[Number(token.match(/\d+/u)[0]) - 1];
  if (/^TOOL_\d+_DESC$/u.test(token)) return "在浏览器本地按明确输入合同生成可复制的纯文字报告。";
  if (publicTitles[token]) return publicTitles[token];
  if (/^COMPAT_.*_TITLE$/u.test(token)) return "旧入口已接入完整交换台";
  if (/^COMPAT_.*_DESC$/u.test(token)) return "这个兼容入口只负责连接新的完整页面目录。";
  if (token === "CHANGELOG_TITLE") return "交换台版本记录";
  if (token === "CHANGELOG_DESC") return "按时间保存结构、来源与公开规则的变化摘要。";
  if (article >= 0 && key === "TITLE") return articleTitles[article];
  if (article >= 0 && key === "DESC") return "包含完整层级、来源字段、状态模块、FAQ 与交接链接。";
  if (/DATE_ISO/u.test(key)) return "2026-09-05";
  if (/DATE_LABEL/u.test(key)) return "2026.09.05";
  if (/VERSION/u.test(key)) return "REVISION 01";
  if (/AUTHOR/u.test(key)) return "示例编辑席";
  if (/LEAD/u.test(key)) return "先确认双方接通的是同一个问题，再发送答案。";
  if (/FAQ_\d+_Q/u.test(key)) return "这个内容位发布前还要核对什么？";
  if (/FAQ_\d+_A/u.test(key)) return "核对来源、日期、适用范围、例外、关系披露和仍未确认的部分。";
  if (/SECTION_\d+_TITLE/u.test(key)) return "这里放置经过核实的小节标题";
  if (/SECTION_\d+_BODY/u.test(key)) return "这里填写经核实的正文，分开事实、解释、适用范围与未知部分；组件结构和站内链接无需重做。";
  if (/CALLOUT/u.test(key)) return "这里放置需要读者优先看见的边界或结论。";
  if (/MODULE_TITLE/u.test(key)) return "回答专属结构模块";
  if (/MODULE_DESC/u.test(key)) return "三个字段已经设计完成，只需替换核实后的标签与值。";
  if (/FIELD_\d+_LABEL/u.test(key)) return "字段";
  if (/FIELD_\d+_VALUE/u.test(key)) return "待填入经核实的值";
  if (/KEY_\d+_LABEL/u.test(key)) return "SOURCE";
  if (/KEY_\d+_TEXT/u.test(key)) return "在这里标记来源层级和状态";
  if (/TITLE|ACCENT/u.test(token)) return "完整 UI 内容位";
  if (/DESC|BODY|NOTE/u.test(token)) return "这里填写经核实的文字，并保留现有结构、边界与交互合同。";
  if (/DATE/u.test(token)) return "2026-09-05";
  if (/VERSION/u.test(token)) return "1.0";
  return "待替换文字";
}

function fill(raw) {
  return raw.replace(/%%([A-Z0-9_]+)%%/gu, (_match, token) => fixture(token)).replaceAll(`https://127.0.0.1:${port}`, `http://127.0.0.1:${port}`);
}

const server = http.createServer((request, response) => {
  const route = decodeURIComponent(new URL(request.url, "http://localhost").pathname).replace(/^\/+|\/+$/gu, "") || "index.html";
  const target = path.resolve(root, route);
  if (!target.startsWith(`${root}${path.sep}`) || !fs.existsSync(target) || !fs.statSync(target).isFile()) {
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
    response.end(fill(fs.readFileSync(path.join(root, "404.html"), "utf8")));
    return;
  }
  const ext = path.extname(target).toLowerCase();
  const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".ico": "image/x-icon", ".xml": "application/xml; charset=utf-8", ".txt": "text/plain; charset=utf-8" };
  response.writeHead(200, { "Content-Type": types[ext] || "application/octet-stream", "Cache-Control": "no-store" });
  const body = fs.readFileSync(target);
  response.end(/\.(?:html|xml|txt|svg)$/u.test(ext) ? fill(body.toString()) : body);
});

function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++callId;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
}

async function evaluate(expression) {
  const value = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true, userGesture: true });
  if (value.exceptionDetails) throw new Error(value.exceptionDetails.exception?.description || value.exceptionDetails.text);
  return value.result.value;
}

function test(name, okay, detail = "") {
  checks.push({ name, ok: Boolean(okay), ...(okay ? {} : { detail }) });
  if (!okay) console.log("CHECK FAIL", name, typeof detail === "string" ? detail : JSON.stringify(detail));
}

async function ready() {
  for (let index = 0; index < 240; index += 1) {
    if (await evaluate("document.readyState==='complete'&&[...document.images].every(image=>image.complete)")) return;
    await delay(25);
  }
  throw new Error(`readiness timeout ${current}`);
}

async function go(file, width = 1440, theme = "night", height = 900) {
  current = `${file}@${width}-${theme}`;
  await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 600 });
  await send("Page.navigate", { url: `http://127.0.0.1:${port}/${file}` });
  await ready();
  await evaluate(`localStorage.setItem('sa89-signal',${JSON.stringify(theme)})`);
  await send("Page.reload", { ignoreCache: true });
  await delay(75);
  await ready();
  for (let index = 0; index < 120; index += 1) {
    if (await evaluate(`document.documentElement.dataset.sa89Signal===${JSON.stringify(theme)}`)) return;
    await delay(25);
  }
  throw new Error(`theme timeout ${current}`);
}

async function shot(name, selector = null) {
  if (selector) await evaluate(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:'center',inline:'nearest',behavior:'instant'})`);
  else await evaluate("window.scrollTo({top:0,left:0,behavior:'instant'})");
  await evaluate("new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))");
  const capture = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  fs.writeFileSync(path.join(qa, `${name}.png`), Buffer.from(capture.data, "base64"));
}

async function click(selector) { await evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`); await delay(35); }
async function setValue(value) { await evaluate(`(()=>{const field=document.querySelector('.sa89-workbench textarea');field.value=${JSON.stringify(value)};field.dispatchEvent(new Event('input',{bubbles:true}))})()`); }
async function setExpression(expression) { await evaluate(`(()=>{const field=document.querySelector('.sa89-workbench textarea');field.value=${expression};field.dispatchEvent(new Event('input',{bubbles:true}))})()`); }
async function submit() { await click('.sa89-workbench button[type="submit"]'); }
async function reportText() { return evaluate("document.querySelector('[data-sa89-tool-report]').textContent"); }
async function invalid() { return evaluate("(()=>{const field=document.querySelector('.sa89-workbench textarea');return document.activeElement===field&&document.querySelector('[data-sa89-tool-copy]').disabled&&document.querySelector('[data-sa89-tool-state]').textContent==='INVALID'&&document.querySelector('[data-sa89-tool-error]').textContent.length>0})()"); }

async function run() {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  port = server.address().port;
  profile = fs.mkdtempSync(path.join(os.tmpdir(), "sa89-chrome-"));
  browser = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", ["--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check", "--remote-debugging-port=0", `--user-data-dir=${profile}`, "about:blank"], { stdio: ["ignore", "ignore", "pipe"] });
  let debugPort = "";
  for (let index = 0; index < 180 && !/^\d+$/u.test(debugPort); index += 1) {
    const file = path.join(profile, "DevToolsActivePort");
    if (fs.existsSync(file)) debugPort = fs.readFileSync(file, "utf8").split("\n")[0].trim();
    if (!/^\d+$/u.test(debugPort)) await delay(50);
  }
  if (!/^\d+$/u.test(debugPort)) throw new Error("Chrome DevTools port unavailable");
  const target = await (await fetch(`http://127.0.0.1:${debugPort}/json/new?about:blank`, { method: "PUT" })).json();
  socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve) => socket.addEventListener("open", resolve));
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.id) {
      const call = pending.get(message.id);
      pending.delete(message.id);
      if (!call) return;
      message.error ? call.reject(new Error(JSON.stringify(message.error))) : call.resolve(message.result);
    } else if (message.method === "Runtime.exceptionThrown") errors.push({ page: current, error: message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text });
    else if (message.method === "Runtime.consoleAPICalled" && message.params.type === "error") errors.push({ page: current, error: message.params.args.map((item) => item.value).join(" ") });
    else if (message.method === "Network.loadingFailed" && !message.params.canceled) errors.push({ page: current, error: message.params.errorText });
  });
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Network.enable");
  await send("Browser.grantPermissions", { origin: `http://127.0.0.1:${port}`, permissions: ["clipboardReadWrite", "clipboardSanitizedWrite"] });
  await send("Page.bringToFront");

  test("contract lists 36 unique HTML pages", files.length === 36, { count: files.length });
  test("twelve independent cover paths", new Set(Object.values(manifest.articleCovers).map((cover) => cover.og)).size === 12);
  test("four channels contain three answers each", manifest.categories.length === 4 && manifest.categories.every((category) => category.articles.length === 3));
  const profiles = [[1440, "night"], [1440, "day"], [768, "night"], [768, "day"], [390, "night"], [390, "day"], [360, "night"], [360, "day"]];
  for (const [width, theme] of profiles) {
    for (const file of files) {
      await go(file, width, theme);
      const result = await evaluate(`(()=>{const visible=e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return r.width>0&&r.height>0&&s.display!=='none'&&s.visibility!=='hidden'},ids=[...document.querySelectorAll('[id]')].map(e=>e.id),wide=[...document.querySelectorAll('body *')].map(e=>({e,r:e.getBoundingClientRect()})).filter(x=>x.r.right>innerWidth+1||x.r.left<-1).slice(0,8).map(x=>({tag:x.e.tagName,class:String(x.e.className),left:+x.r.left.toFixed(1),right:+x.r.right.toFixed(1)})),small=innerWidth<600?[...document.querySelectorAll('a,button,input,textarea,summary')].filter(visible).filter(e=>!e.classList.contains('sa89-skip')).filter(e=>{const r=e.getBoundingClientRect();return r.width<43.5||r.height<43.5}).map(e=>({tag:e.tagName,text:e.textContent.trim().slice(0,16),w:+e.getBoundingClientRect().width.toFixed(1),h:+e.getBoundingClientRect().height.toFixed(1)})).slice(0,8):[];return{overflow:document.documentElement.scrollWidth>innerWidth+1,wide,bad:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),small,dupes:ids.filter((v,i)=>ids.indexOf(v)!==i),h1:document.querySelectorAll('h1').length,disclosure:document.body.textContent.includes('本站独立运营'),theme:document.documentElement.dataset.sa89Signal}})()`);
      const okay = !result.overflow && !result.wide.length && !result.bad.length && !result.small.length && !result.dupes.length && result.h1 === 1 && result.disclosure && result.theme === theme;
      renders.push({ file, width, theme, ok: okay, ...(okay ? {} : result) });
      if (!okay) console.log("RENDER FAIL", current, JSON.stringify(result));
    }
  }

  for (const [width, theme] of profiles) {
    await go("index.html", width, theme, 820);
    const top = await evaluate("(()=>{const card=document.querySelector('.sa89-meter'),rect=card.getBoundingClientRect();return{hero:!!document.querySelector('.sa89-hero'),routes:document.querySelectorAll('.sa89-routing li').length,visible:rect.top>=0&&rect.top<innerHeight,code:card.querySelector('code').textContent,enabled:!card.querySelector('button').disabled,benefit:card.textContent.includes('适用利益点'),foot:card.textContent.includes('条件、比例与有效期'),overflow:document.documentElement.scrollWidth>innerWidth+1}})()");
    test(`home switchboard ${width} ${theme}`, top.hero && top.routes === 4 && (width < 1000 || top.visible) && top.code === "SAGE890905" && top.enabled && top.benefit && top.foot && !top.overflow, top);
    await shot(`home-${width}-${theme}`);
  }
  test("home links every indexable page", await evaluate(`(()=>{const links=new Set([...document.querySelectorAll('a')].map(a=>{const value=new URL(a.href).pathname;return value.startsWith('/')?value.slice(1):value}));return ${JSON.stringify(files.slice(0, 31))}.every(file=>file==='index.html'||links.has(file))})()`));
  await shot("home-matrix", ".sa89-patch-matrix");
  await go("index.html", 390);
  await click("[data-sa89-copy-value]");
  test("home code clipboard", await evaluate("navigator.clipboard.readText()") === "SAGE890905");
  await click("[data-sa89-signal-toggle]");
  test("theme toggle", await evaluate("document.documentElement.dataset.sa89Signal==='day'&&getComputedStyle(document.documentElement).colorScheme==='light'"));
  await click(".sa89-menu");
  test("menu focus", await evaluate("document.body.dataset.sa89Menu==='open'&&document.activeElement===document.querySelector('#sa89-nav a')"));
  await send("Input.dispatchKeyEvent", { type: "keyDown", key: "Escape", code: "Escape" });
  test("escape refocus", await evaluate("document.body.dataset.sa89Menu==='closed'&&document.activeElement===document.querySelector('.sa89-menu')"));

  await go(manifest.articleIndex, 390);
  await click('[data-sa89-filter="INTAKE"]');
  test("filter three", await evaluate("document.querySelectorAll('[data-sa89-channel]:not([hidden])').length===3"));
  await click('[data-sa89-filter="all"]');
  test("filter twelve", await evaluate("document.querySelectorAll('[data-sa89-channel]:not([hidden])').length===12"));
  await shot("register-mobile");
  await go(manifest.articleIndex, 1440, "day");
  await shot("register-desktop");

  for (let index = 0; index < 12; index += 1) {
    await go(manifest.articles[index], index % 2 ? 390 : 1440, index % 3 ? "night" : "day");
    const expected = path.basename(manifest.articles[index], ".html");
    test(`article module ${index + 1}`, await evaluate(`document.querySelector('.sa89-answer-module')&&document.querySelector('.article-cover img').src.includes(${JSON.stringify(expected)})`));
    await shot(`module-${String(index + 1).padStart(2, "0")}`, ".sa89-answer-module");
  }
  await go(manifest.articles[0], 390);
  test("article anchors", await evaluate("[...document.querySelectorAll('.sa89-tuner nav a')].length===4&&[...document.querySelectorAll('.sa89-tuner nav a')].every(a=>document.querySelector(a.hash))"));
  test("FAQ native", await evaluate("document.querySelectorAll('.sa89-faq details').length===2"));
  await click(".sa89-faq details:first-of-type>summary");
  test("FAQ opens", await evaluate("document.querySelector('.sa89-faq details:first-of-type').open"));
  const start = await evaluate("Number.parseFloat(document.querySelector('[data-sa89-progress-label]').value||0)");
  await evaluate("window.scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'});new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))");
  const end = await evaluate("Number.parseFloat(document.querySelector('[data-sa89-progress-label]').value||0)");
  test("progress reaches end", start < 5 && end >= 99, { start, end });
  await go(manifest.categories[0].path, 1440, "day"); await shot("channel-desktop");
  await go(manifest.categories[2].path, 390); await shot("channel-mobile");
  await go(manifest.toolIndex, 1440); await shot("tool-index");
  await go(manifest.legal.about, 390, "day"); await shot("public-mobile");
  for (let index = 0; index < 5; index += 1) {
    await go(manifest.tools[index], 1440, index % 2 ? "day" : "night"); await shot(`tool-${index + 1}-desktop`);
    await go(manifest.tools[index], 390, index % 2 ? "night" : "day"); await shot(`tool-${index + 1}-mobile`);
  }

  const valid = [
    "问题 A？\n问题A?\nHow Source?\nＨｏｗ Ｓｏｕｒｃｅ？",
    "回答 A | 来源 | PRESENT\n回答 A | 日期 | MISSING\n回答 B | 来源 | PRESENT",
    "回答 A | 2026-08-01 | 30 | 2026-08-20\n回答 B | 2026-01-01 | 90 | 2026-09-01",
    "回答 A | 文件甲 | PRIMARY\n回答 A | 记录乙 | SECONDARY\n回答 B | 分析丙 | INFERENCE",
    "回答 A | BOUNDARY | PASS\n回答 A | SOURCE | PASS\n回答 A | LIMIT | PASS\n回答 A | UPDATE | PASS\n回答 B | BOUNDARY | OPEN"
  ];
  const exact = [
    ["原始问句：4", "独立问句：2", "重复组：2", "可减少：2"],
    ["记录：2", "独立关系：3", "缺失字段：1"],
    ["回答：2", "仍有效：1", "需复核：1"],
    ["回答：2", "独立关系：3", "PRIMARY：1", "SECONDARY：1", "INFERENCE：1"],
    ["回答：2", "READY：1", "BLOCKED：1"]
  ];
  const maxRows = [
    Array.from({ length: 300 }, (_, index) => `问题 ${index}`).join("\n"),
    Array.from({ length: 300 }, (_, index) => `回答 ${index} | 来源 | PRESENT`).join("\n"),
    Array.from({ length: 300 }, (_, index) => `回答 ${index} | 2026-01-01 | 365 | 2026-09-01`).join("\n"),
    Array.from({ length: 300 }, (_, index) => `回答 ${index} | 来源 ${index} | PRIMARY`).join("\n"),
    Array.from({ length: 75 }, (_, index) => ["BOUNDARY", "SOURCE", "LIMIT", "UPDATE"].map((route) => `回答 ${index} | ${route} | PASS`).join("\n")).join("\n")
  ];
  const badSpecific = [
    "。",
    "回答 A | 来源 | PRESENT\n回答 A | 来源 | MISSING",
    "回答 A | 2026-02-30 | 30 | 2026-03-01",
    "回答 A | 来源甲 | PRIMARY\n回答 A | 来源甲 | SECONDARY",
    "回答 A | UNKNOWN | PASS"
  ];
  let output;
  for (let index = 0; index < 5; index += 1) {
    await go(manifest.tools[index], 390);
    await setValue(valid[index]); await submit(); output = await reportText();
    test(`tool ${index + 1} exact`, exact[index].every((part) => output.includes(part)), output);
    await shot(`tool-${index + 1}-result`, ".sa89-tool-report");
    await setValue(maxRows[index]); await submit();
    test(`tool ${index + 1} accepts 300`, await evaluate("document.querySelector('[data-sa89-tool-state]').textContent==='COMPLETE'"));
    await setValue(badSpecific[index]); await submit();
    test(`tool ${index + 1} semantic boundary`, await invalid());
  }

  const normalized = [
    ["问题Ａ？\n问题A?", "独立问句：1"],
    ["回答Ａ ｜ 来源 ｜ ＰＲＥＳＥＮＴ", "独立关系：1"],
    ["回答Ａ ｜ ２０２６－０１－０１ ｜ ３０ ｜ ２０２６－０１－２０", "仍有效：1"],
    ["回答Ａ ｜ 来源甲 ｜ ＰＲＩＭＡＲＹ", "PRIMARY：1"],
    ["回答Ａ ｜ ＢＯＵＮＤＡＲＹ ｜ ＰＡＳＳ", "BLOCKED：1"]
  ];
  for (let index = 0; index < 5; index += 1) {
    await go(manifest.tools[index], 390); await setValue(normalized[index][0]); await submit(); output = await reportText();
    test(`NFKC ${index + 1}`, output.includes(normalized[index][1]), output);
  }
  for (let index = 0; index < 5; index += 1) {
    await go(manifest.tools[index], 390);
    await setValue(Array.from({ length: 301 }, () => "X").join("\n")); await submit(); test(`row limit ${index + 1}`, await invalid());
    await setExpression("'A'.repeat(40001)"); await submit(); test(`raw limit ${index + 1}`, await invalid());
    await setExpression("String.fromCharCode(0xd800)"); await submit(); test(`Unicode malformed ${index + 1}`, await invalid());
    await setExpression("'A'+String.fromCharCode(1)"); await submit(); test(`control character ${index + 1}`, await invalid());
    await setValue(""); await submit(); test(`empty ${index + 1}`, await invalid()); await shot(`invalid-tool-${index + 1}`);
    await click('.sa89-workbench button[type="reset"]');
    test(`reset ${index + 1}`, await evaluate("document.querySelector('[data-sa89-tool-state]').textContent==='UNSET'&&document.querySelector('[data-sa89-tool-copy]').disabled&&!document.querySelector('[data-sa89-tool-error]').textContent"));
    test(`guide closed ${index + 1}`, await evaluate("!document.querySelector('.sa89-tool-guide').open&&document.querySelectorAll('.sa89-tool-guide h3').length===5"));
    await click(".sa89-tool-guide>summary"); test(`guide opens ${index + 1}`, await evaluate("document.querySelector('.sa89-tool-guide').open"));
  }
  for (let index = 0; index < 5; index += 1) {
    await go(manifest.tools[index], 390); await setValue(valid[index]); await submit(); const expected = await reportText(); await click("[data-sa89-tool-copy]");
    test(`clipboard ${index + 1}`, await evaluate("navigator.clipboard.readText()") === expected);
  }
  await go(manifest.tools[0], 390); await setValue(valid[0]); await submit();
  await evaluate("navigator.clipboard.writeText=()=>new Promise(resolve=>window.sa89Finish=resolve)");
  await click("[data-sa89-tool-copy]"); await setValue("invalid"); await evaluate("window.sa89Finish()"); await delay(30);
  test("copy race invalidated", await evaluate("!document.querySelector('[data-sa89-tool-copy-status]').textContent&&document.querySelector('[data-sa89-tool-copy]').disabled"));

  await go(manifest.registrationGuide, 390);
  const promo = 'a[href="https://example.org/verified-destination"]';
  test("one promotion", await evaluate(`document.querySelectorAll(${JSON.stringify(promo)}).length===1`));
  test("promotion governance", await evaluate(`(()=>{const link=document.querySelector(${JSON.stringify(promo)});return link&&link.target==='_blank'&&['sponsored','nofollow','noopener','noreferrer'].every(value=>link.relList.contains(value))&&link.closest('.sa89-promo-line').textContent.includes('推广链接')})()`));

  await go("404.html", 390); await shot("404-mobile");
  await evaluate("document.querySelector('#sa89-safe-query').value='';document.querySelector('[data-sa89-safe-search]').requestSubmit()");
  test("404 empty focus", await evaluate("document.activeElement===document.querySelector('#sa89-safe-query')&&document.querySelector('[data-sa89-safe-result]').textContent.includes('请输入')"));
  await evaluate("document.querySelector('#sa89-safe-query').value='字'.repeat(81);document.querySelector('[data-sa89-safe-search]').requestSubmit()");
  test("404 length", await evaluate("document.querySelector('[data-sa89-safe-result]').textContent.includes('不能超过')"));
  await evaluate("document.querySelector('#sa89-safe-query').value='工具';document.querySelector('[data-sa89-safe-search]').requestSubmit()");
  test("404 route", await evaluate("document.querySelector('[data-sa89-safe-result] a').textContent.includes('操作台工具')"));
  await evaluate("document.querySelector('#sa89-safe-query').value='<img src=x onerror=alert(1)>';document.querySelector('[data-sa89-safe-search]').requestSubmit()");
  test("404 safe text", await evaluate("!document.querySelector('[data-sa89-safe-result] img')&&document.querySelector('[data-sa89-safe-result]').textContent.includes('没有完全匹配')"));

  const contrast = "function ch(c){if(c==='transparent')return[0,0,0,0];if(c.startsWith('color(srgb ')){const r=c.slice(11,-1).split('/'),n=r[0].trim().split(/\\s+/).map(Number);return[255*n[0],255*n[1],255*n[2],r[1]?Number(r[1]):1]}const n=c.match(/[\\d.]+/g).map(Number);return[n[0],n[1],n[2],n.length===4?n[3]:1]}function lum(v){const a=v.slice(0,3).map(n=>n/255).map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4);return.2126*a[0]+.7152*a[1]+.0722*a[2]}function bg(e){if(!e)return[255,255,255,1];const c=ch(getComputedStyle(e).backgroundColor),p=c[3]<1?bg(e.parentElement):[0,0,0,1];return[c[0]*c[3]+p[0]*(1-c[3]),c[1]*c[3]+p[1]*(1-c[3]),c[2]*c[3]+p[2]*(1-c[3]),1]}function ratio(s){const e=document.querySelector(s),b=bg(e),c=ch(getComputedStyle(e).color),f=[c[0]*c[3]+b[0]*(1-c[3]),c[1]*c[3]+b[1]*(1-c[3]),c[2]*c[3]+b[2]*(1-c[3])],x=lum(f),y=lum(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05)}";
  for (const theme of ["night", "day"]) {
    await go("index.html", 1440, theme); await delay(350); let ratios = await evaluate(`(()=>{${contrast};return['.sa89-call>span','.sa89-routing header>p','.sa89-meter small'].map(ratio)})()`); test(`home contrast ${theme}`, ratios.every((value) => value >= 4.5), ratios);
    await go(manifest.articles[0], 390, theme); await delay(350); ratios = await evaluate(`(()=>{${contrast};return['.sa89-protocol>section>p','.article-cover figcaption','.sa89-faq p'].map(ratio)})()`); test(`article contrast ${theme}`, ratios.every((value) => value >= 4.5), ratios);
    await go(manifest.tools[0], 390, theme); await setValue(valid[0]); await submit(); await delay(350); ratios = await evaluate(`(()=>{${contrast};return['.sa89-workbench form>small','[data-sa89-tool-report]','.sa89-tool-guide p'].map(ratio)})()`); test(`tool contrast ${theme}`, ratios.every((value) => value >= 4.5), ratios);
    await go(manifest.legal.about, 390, theme); await delay(350); ratios = await evaluate(`(()=>{${contrast};return['.sa89-public-shell>header>p','.sa89-public-grid article p','.sa89-public-nav a'].map(ratio)})()`); test(`public contrast ${theme}`, ratios.every((value) => value >= 4.5), ratios);
  }

  await send("Emulation.setScriptExecutionDisabled", { value: true });
  for (const width of [1440, 768, 390, 360]) {
    current = `nojs-${width}`;
    await send("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 1, mobile: width < 600 });
    await send("Page.navigate", { url: `http://127.0.0.1:${port}/index.html` }); await ready();
    test(`noJS nav ${width}`, await evaluate("getComputedStyle(document.querySelector('#sa89-nav')).display!=='none'&&[...document.querySelectorAll('#sa89-nav a')].every(a=>a.getBoundingClientRect().width>0)"));
    test(`noJS copy ${width}`, await evaluate("document.querySelector('[data-sa89-copy-value]').disabled"));
    await send("Page.navigate", { url: `http://127.0.0.1:${port}/${manifest.tools[0]}` }); await ready(); test(`noJS tool structure ${width}`, await evaluate("!!document.querySelector('form')&&!!document.querySelector('.sa89-tool-guide')&&document.querySelector('[data-sa89-tool-copy]').disabled"));
  }
  await send("Emulation.setScriptExecutionDisabled", { value: false });

  await go("index.html", 390, "night", 820);
  await evaluate("document.querySelector('.sa89-call h1').textContent='字'.repeat(34);document.querySelector('.sa89-call>span').textContent='排'.repeat(160);document.querySelector('#sa89-home-code').textContent='K'.repeat(40);document.querySelector('.sa89-meter p').textContent='条'.repeat(45)");
  test("home stress", await evaluate("document.documentElement.scrollWidth<=innerWidth+1")); await shot("home-stress");

  const result = { qa, pages: files.length, renders, checks, errors, counts: { renders: renders.length, renderFailures: renders.filter((item) => !item.ok).length, checks: checks.length, failures: checks.filter((item) => !item.ok).length, errors: errors.length } };
  fs.writeFileSync(path.join(qa, "report.json"), JSON.stringify(result, null, 2));
  console.log(JSON.stringify({ qa, ...result.counts, screenshots: fs.readdirSync(qa).filter((file) => file.endsWith(".png")).length }));
  if (result.counts.renderFailures + result.counts.failures + result.counts.errors) process.exitCode = 1;
}

run().catch((error) => { console.error(error); process.exitCode = 1; }).finally(() => {
  try { if (socket) socket.close(); } catch (_error) {}
  try { server.close(); } catch (_error) {}
  try { if (browser) browser.kill("SIGKILL"); } catch (_error) {}
  setTimeout(() => process.exit(process.exitCode || 0), 250);
});
