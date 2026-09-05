"use strict";

const fs = require("fs");
const path = require("path");
const os = require("os");
const http = require("http");
const { spawn } = require("child_process");

const root = path.resolve("templates/095-white-seamlesscanvas");
const qa = fs.mkdtempSync(path.join(os.tmpdir(), "ws95-qa-"));
const tick = String.fromCharCode(96);
const fence = tick + tick + tick;
const doc = fs.readFileSync(path.join(root, "TEMPLATE.md"), "utf8");
const manifest = JSON.parse(doc.match(new RegExp(fence + "json workflow-ready-v2\\s*([\\s\\S]*?)" + fence, "u"))[1]);
const files = Array.from(new Set([manifest.home, manifest.articleIndex].concat(manifest.articles, manifest.categories.map(function (x) { return x.path; }), [manifest.toolIndex], manifest.tools, Object.values(manifest.legal), ["canvas-changelog.html", manifest.error404, "article.html", "tool.html", "legal.html"])));

let browser;
let socket;
let port;
let profile;
let id = 0;
let current = "";
const pending = new Map();
const errors = [];
const renders = [];
const checks = [];
const delay = function (ms) { return new Promise(function (resolve) { setTimeout(resolve, ms); }); };

function fixture(token) {
  const fixed = { LANG:'zh-Hans',SITE_NAME:'白色无缝策展画布',BRAND_EN:'SEAMLESS / CANVAS',SITE_TAGLINE:'RELATION BEFORE DECORATION',SITE_DESC:'一套可直接替换文字的无边界白色策展 UI，包含十二份材料、五件本地比例尺与公开策展方法。',HERO_TITLE:'让不同材料，',HERO_ACCENT:'在留白中建立关系。',HERO_DESC:'来源、尺度、取舍与观看顺序各自进入画布；后续编辑只替换经过核实的文字。',ACCESS_TITLE:'公开版本识别位',INVITE_CODE:'CANVAS950905',BENEFIT_RATE:'适用利益点',BENEFIT_DISCLAIMER:'条件、比例与有效期以经核实的正式说明为准。',AFFILIATE_URL:'https://example.org/verified-destination',AFFILIATE_DISCLOSURE:'使用此入口可能产生推广关系，策展判断不受此关系影响。',ACCESS_CTA:'访问公开服务',NEXT_REVIEW_DATE:'2026.10.05',NEXT_REVIEW_TITLE:'材料关系可解释之后再进入公开版本。',SEQUENCE_NOTE:'顺序、距离与停顿都需要可解释。',CONTACT_EMAIL:'canvas@example.com',REVIEW_DATE:'2026.10.05',PUBLIC_OWNER:'白色无缝策展画布',PUBLIC_ACCENT:'可直接替换文字',PUBLIC_FOOTNOTE:'这里填写公开说明的复核责任与下一复核日期。',MODIFIED_ISO:'2026-09-05',MODIFIED_LABEL:'2026.09.05',SECURITY_EXPIRES_ISO:'2027-09-05T00:00:00Z',READ_TIME:'8 分钟',ARTICLE_TITLE:'这里放置经过核实的策展标题',ARTICLE_ACCENT:'材料与解释分开',ARTICLE_DESC:'完整的可换字策展研究外壳，已经包含独立封面、专属模块、FAQ 与交接路径。',ARTICLE_LEAD:'先写材料来源和原始尺度，再写取舍、相邻关系、边界与下一次复核。',ARTICLE_HANDOFF:'下一步：核实来源、作者、版本、许可、裁切和替代文本。',COVER_ALT:'白色画布、钴蓝框景和珊瑚色材料组成的抽象策展封面',COVER_CAPTION:'独立材料封面 · 后续只替换文字说明',MODULE_TITLE:'本材料专属策展模块',FIELD_TITLE:'三份完整策展材料',FIELD_ACCENT:'沿同一编辑阶段分组',FIELD_DESC:'封面、正文、专属模块、FAQ、回链与交接已经装配。',CHANGELOG_ACCENT:'保留公开差值',CHANGELOG_DESC:'这里填写修订摘要、日期和核验依据。',OLD_STATEMENT:'修订前的公开表述',NEW_STATEMENT:'经过核实的新表述',CHANGE_REASON:'这里填写实质修订原因。'};
  if(token==='SITE_DOMAIN')return '127.0.0.1:'+port;
  if(Object.prototype.hasOwnProperty.call(fixed,token))return fixed[token];
  if(/^CARD_\d+_TITLE$/u.test(token))return '材料 '+token.slice(5,7)+' 的完整策展标题';
  if(/^CARD_\d+_DESC$/u.test(token))return '这里说明本材料的来源、关系、边界与下一步。';
  if(/^SECTION_\d+_TITLE$/u.test(token))return '这里放置经过核实的小节标题';
  if(/^SECTION_\d+_BODY$/u.test(token))return '这里填写经过核实的文字，分开材料来源、原始尺度、选择理由、观看关系、许可边界与下一次复核；页面 UI 无需重做。';
  if(/^MODULE_ITEM_\d+_TEXT$/u.test(token))return '可核验材料字段 '+token.slice(-1);
  if(/^FAQ_\d+_QUESTION$/u.test(token))return '这一策展判断需要哪些证据？';
  if(/^FAQ_\d+_ANSWER$/u.test(token))return '填写来源、作者、时间、版本、许可和反证；没有核验的信息明确标为未知。';
  if(/^PUBLIC_SECTION_\d+_BODY$/u.test(token))return '这里填写公开规则、适用范围、责任人与复核日期；保持事实、策展意见和推广关系彼此分开。';
  if(/^TOOL_GUIDE_\d+$/u.test(token))return '这里说明输入字段、确定性规则、失败状态、输出含义和必须继续完成的人工复核。';
  return 'VERIFIED_'+token;
}

function mime(file) {
  const ext = path.extname(file).toLowerCase();
  return { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".ico": "image/x-icon", ".xml": "application/xml; charset=utf-8", ".txt": "text/plain; charset=utf-8", ".md": "text/markdown; charset=utf-8" }[ext] || "application/octet-stream";
}

const server = http.createServer(function (req, res) {
  let rel = decodeURIComponent(new URL(req.url, "http://local").pathname).replace(/^\/+/, "") || "index.html";
  const file = path.resolve(root, rel);
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    rel = "404.html";
  }
  const finalFile = rel === "404.html" ? path.join(root, rel) : file;
  let body = fs.readFileSync(finalFile);
  if (/\.(?:html|css|js|xml|txt|md|svg)$/u.test(finalFile)) body = Buffer.from(body.toString("utf8").replace(/%%([A-Z0-9_]+)%%/gu, function (_m, token) { return fixture(token); }));
  res.writeHead(rel === "404.html" && file !== finalFile ? 404 : 200, { "content-type": mime(finalFile), "cache-control": "no-store" });
  res.end(body);
});

function send(method, params) {
  return new Promise(function (resolve, reject) {
    const call = ++id;
    pending.set(call, { resolve: resolve, reject: reject });
    socket.send(JSON.stringify({ id: call, method: method, params: params || {} }));
  });
}

async function evaluate(expression) {
  const result = await send("Runtime.evaluate", { expression: expression, awaitPromise: true, returnByValue: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}

async function ready() {
  for (let i = 0; i < 120; i++) {
    if (await evaluate("document.readyState === 'complete'")) return;
    await delay(25);
  }
  throw new Error("page readiness timeout");
}

async function go(file, width, theme, height) {
  current = file + "@" + width + "-" + theme;
  await send("Emulation.setDeviceMetricsOverride", { width: width, height: height || 900, deviceScaleFactor: 1, mobile: width < 600 });
  await send("Page.navigate", { url: "http://127.0.0.1:" + port + "/" + file });
  await ready();
  await evaluate("document.documentElement.dataset.ws95Surface=" + JSON.stringify(theme) + ";localStorage.setItem('ws95-surface'," + JSON.stringify(theme) + ");");
  await delay(20);
}

async function click(selector) {
  const ok = await evaluate("(function(){const e=document.querySelector(" + JSON.stringify(selector) + ");if(!e)return false;e.click();return true;})()");
  if (!ok) throw new Error("missing click target " + selector + " on " + current);
  await delay(20);
}

async function shot(name, selector) {
  let clip;
  if (selector) {
    clip = await evaluate("(function(){const r=document.querySelector(" + JSON.stringify(selector) + ").getBoundingClientRect();return{x:Math.max(0,r.left),y:Math.max(0,r.top+scrollY),width:Math.max(1,Math.min(r.width,document.documentElement.scrollWidth)),height:Math.max(1,r.height),scale:1};})()");
  }
  const result = await send("Page.captureScreenshot", Object.assign({ format: "png", captureBeyondViewport: true, fromSurface: true }, clip ? { clip: clip } : {}));
  fs.writeFileSync(path.join(qa, name + ".png"), Buffer.from(result.data, "base64"));
}

function test(name, ok, detail) {
  checks.push({ name: name, ok: Boolean(ok), detail: detail });
  if (!ok) console.log("CHECK FAIL", name, JSON.stringify(detail));
}

async function setValue(value) {
  await evaluate("(function(){const e=document.querySelector('.ws95-bench textarea');e.value=" + JSON.stringify(value) + ";e.dispatchEvent(new Event('input',{bubbles:true}));})()");
}

async function setExpression(expression) {
  await evaluate("(function(){const e=document.querySelector('.ws95-bench textarea');e.value=" + expression + ";e.dispatchEvent(new Event('input',{bubbles:true}));})()");
}

async function submit() {
  await click(".ws95-bench button[type='submit']");
}

async function reportText() {
  return evaluate("document.querySelector('[data-ws95-tool-output]').textContent");
}

async function invalid() {
  return evaluate("(function(){const f=document.querySelector('.ws95-bench textarea');return document.activeElement===f&&document.querySelector('[data-ws95-tool-copy]').disabled&&document.querySelector('[data-ws95-tool-state]').textContent==='ERROR'&&document.querySelector('[data-ws95-tool-error]').textContent.length>0;})()");
}

async function run() {
  await new Promise(function (resolve) { server.listen(0, "127.0.0.1", resolve); });
  port = server.address().port;
  profile = fs.mkdtempSync(path.join(os.tmpdir(), "ws95-chrome-"));
  browser = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", ["--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check", "--remote-debugging-port=0", "--user-data-dir=" + profile, "about:blank"], { stdio: ["ignore", "ignore", "pipe"] });
  let debug = "";
  for (let i = 0; i < 180 && !/^\d+$/u.test(debug); i++) {
    const file = path.join(profile, "DevToolsActivePort");
    if (fs.existsSync(file)) debug = fs.readFileSync(file, "utf8").split("\n")[0].trim();
    if (!/^\d+$/u.test(debug)) await delay(50);
  }
  if (!/^\d+$/u.test(debug)) throw new Error("Chrome DevTools port unavailable");
  const target = await (await fetch("http://127.0.0.1:" + debug + "/json/new?about:blank", { method: "PUT" })).json();
  socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise(function (resolve) { socket.addEventListener("open", resolve); });
  socket.addEventListener("message", function (event) {
    const message = JSON.parse(event.data);
    if (message.id) {
      const callback = pending.get(message.id);
      pending.delete(message.id);
      if (!callback) return;
      message.error ? callback.reject(new Error(JSON.stringify(message.error))) : callback.resolve(message.result);
    } else if (message.method === "Runtime.exceptionThrown") {
      errors.push({ page: current, error: message.params.exceptionDetails.exception && message.params.exceptionDetails.exception.description || message.params.exceptionDetails.text });
    } else if (message.method === "Runtime.consoleAPICalled" && message.params.type === "error") {
      errors.push({ page: current, error: message.params.args.map(function (x) { return x.value; }).join(" ") });
    } else if (message.method === "Network.loadingFailed" && !message.params.canceled) {
      errors.push({ page: current, error: message.params.errorText });
    }
  });
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Network.enable");
  await send("Browser.grantPermissions", { origin: "http://127.0.0.1:" + port, permissions: ["clipboardReadWrite", "clipboardSanitizedWrite"] });
  await send("Page.bringToFront");

  test("contract lists 36 unique HTML pages", files.length === 36, { count: files.length });
  test("twelve independent covers", new Set(Object.values(manifest.articleCovers).map(function (x) { return x.og; })).size === 12);
  test("four corridors have three records", manifest.categories.length === 4 && manifest.categories.every(function (x) { return x.articles.length === 3; }));

  const profiles = [[1440, "white"], [1440, "soft"], [768, "white"], [768, "soft"], [390, "white"], [390, "soft"], [360, "white"], [360, "soft"]];
  for (const pair of profiles) {
    for (const file of files) {
      const width = pair[0];
      const theme = pair[1];
      await go(file, width, theme);
      const result = await evaluate("(function(){const visible=function(e){const r=e.getBoundingClientRect(),s=getComputedStyle(e);return r.width>0&&r.height>0&&s.display!=='none'&&s.visibility!=='hidden';},ids=Array.from(document.querySelectorAll('[id]')).map(function(e){return e.id;}),wide=Array.from(document.querySelectorAll('body *')).map(function(e){return{e:e,r:e.getBoundingClientRect()};}).filter(function(x){return x.r.right>innerWidth+1||x.r.left<-1;}).slice(0,8).map(function(x){return{tag:x.e.tagName,class:String(x.e.className),left:+x.r.left.toFixed(1),right:+x.r.right.toFixed(1)};}),small=innerWidth<600?Array.from(document.querySelectorAll('a,button,input,textarea,summary')).filter(visible).filter(function(e){return!e.classList.contains('ws95-skip');}).filter(function(e){const r=e.getBoundingClientRect();if((e.type==='checkbox'||e.type==='radio')&&e.closest('label')){const l=e.closest('label').getBoundingClientRect();return l.width<43.5||l.height<43.5;}return r.width<43.5||r.height<43.5;}).map(function(e){const r=e.getBoundingClientRect();return{tag:e.tagName,text:e.textContent.trim().slice(0,18),w:+r.width.toFixed(1),h:+r.height.toFixed(1)};}).slice(0,8):[];return{overflow:document.documentElement.scrollWidth>innerWidth+1,wide:wide,bad:Array.from(document.images).filter(function(i){return!i.complete||!i.naturalWidth;}).map(function(i){return i.src;}),small:small,dupes:ids.filter(function(v,i){return ids.indexOf(v)!==i;}),h1:document.querySelectorAll('h1').length,disclosure:document.body.textContent.includes('本站独立运营'),theme:document.documentElement.dataset.ws95Surface};})()");
      const ok = !result.overflow && !result.wide.length && !result.bad.length && !result.small.length && !result.dupes.length && result.h1 === 1 && result.disclosure && result.theme === theme;
      renders.push(Object.assign({ file: file, width: width, theme: theme, ok: ok }, ok ? {} : result));
      if (!ok) console.log("RENDER FAIL", current, JSON.stringify(result));
    }
  }

  for (const pair of profiles) {
    await go("index.html", pair[0], pair[1], 820);
    const homeState = await evaluate("(function(){const card=document.querySelector('.ws95-access-pass'),r=card.getBoundingClientRect();return{corridors:document.querySelectorAll('.ws95-field-map menu a').length,cards:document.querySelectorAll('.ws95-study-wall article').length,code:card.querySelector('code').textContent,benefit:card.textContent.includes('适用利益点'),foot:card.textContent.includes('条件、比例与有效期'),visible:r.top>=0&&r.bottom<=innerHeight+1,overflow:document.documentElement.scrollWidth>innerWidth+1};})()");
    test("home opening " + pair[0] + " " + pair[1], homeState.corridors === 4 && homeState.cards === 12 && homeState.code === "CANVAS950905" && homeState.benefit && homeState.foot && !homeState.overflow, homeState);
    await shot("home-" + pair[0] + "-" + pair[1]);
  }
  await shot("home-corridor", ".ws95-field-map");
  test("home links every indexable page", await evaluate("(function(){const links=new Set(Array.from(document.querySelectorAll('a')).map(function(a){return new URL(a.href).pathname.substring(1);}));return " + JSON.stringify(files.slice(0, 31)) + ".every(function(f){return f==='index.html'||links.has(f);});})()"));
  await go("index.html", 390, "white");
  await click("[data-ws95-copy-code]");
  test("home code clipboard", await evaluate("navigator.clipboard.readText()") === "CANVAS950905");
  await click("[data-ws95-surface-toggle]");
  test("theme toggle", await evaluate("document.documentElement.dataset.ws95Surface==='soft'&&getComputedStyle(document.documentElement).colorScheme==='light'"));

  await go(manifest.articleIndex, 390, "soft");
  await shot("register-mobile");
  await go(manifest.articleIndex, 1440, "white");
  await shot("register-desktop");
  await click("[data-ws95-filter] button[data-room='collect']");
  test("register corridor filter", await evaluate("Array.from(document.querySelectorAll('[data-study-card]')).filter(function(x){return!x.hidden;}).length===3"));
  await evaluate("(function(){const f=document.querySelector('#ws95-filter-query');f.value='材料 07';f.dispatchEvent(new Event('input',{bubbles:true}));})()");
  test("register text and corridor combine", await evaluate("Array.from(document.querySelectorAll('[data-study-card]')).filter(function(x){return!x.hidden;}).length===0"));
  await click("[data-ws95-filter] button[data-room='all']");
  test("register text filter", await evaluate("Array.from(document.querySelectorAll('[data-study-card]')).filter(function(x){return!x.hidden;}).length===1"));

  for (let i = 0; i < 12; i++) {
    await go(manifest.articles[i], i % 2 ? 390 : 1440, i % 3 ? "white" : "soft");
    const slug = path.basename(manifest.articles[i], ".html");
    test("article module " + (i + 1), await evaluate("document.querySelector('.ws95-study-module')&&document.querySelector('.article-cover img').src.includes(" + JSON.stringify(slug) + ")&&document.querySelector('[data-study-module]').dataset.studyModule.length>0"));
    await shot("module-" + String(i + 1).padStart(2, "0"), ".ws95-study-module");
  }
  await go(manifest.articles[0], 390, "white");
  test("article anchors", await evaluate("document.querySelectorAll('.ws95-study-page>article>aside nav a').length===4&&Array.from(document.querySelectorAll('.ws95-study-page>article>aside nav a')).every(function(a){return document.querySelector(a.hash);})"));
  await click(".ws95-study-page details:first-of-type>summary");
  test("FAQ opens", await evaluate("document.querySelector('.ws95-study-page details:first-of-type').open"));
  const progressStart = await evaluate("Number.parseFloat(document.querySelector('[data-ws95-progress-label]').value||0)");
  await evaluate("window.scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'});new Promise(function(r){requestAnimationFrame(function(){requestAnimationFrame(r);});})");
  const progressEnd = await evaluate("Number.parseFloat(document.querySelector('[data-ws95-progress-label]').value||0)");
  test("progress reaches end", progressStart < 5 && progressEnd >= 99, { start: progressStart, end: progressEnd });

  await go(manifest.categories[0].path, 1440, "soft");
  await shot("corridor-desktop");
  await go(manifest.categories[2].path, 390, "white");
  await shot("corridor-mobile");
  test("corridor has three records", await evaluate("document.querySelectorAll('.ws95-field-page>ul article').length===3"));
  await go(manifest.toolIndex, 1440, "white");
  await shot("tool-index");
  await go(manifest.legal.about, 390, "soft");
  await shot("public-mobile");
  for (let i = 0; i < 5; i++) {
    await go(manifest.tools[i], 1440, i % 2 ? "soft" : "white");
    await shot("tool-" + (i + 1) + "-desktop");
    await go(manifest.tools[i], 390, i % 2 ? "white" : "soft");
    await shot("tool-" + (i + 1) + "-mobile");
  }

  const valid = [
    'Frame A | 1200 | 800',
    'Asset A | 2400 | 1600 | 1200 | 900',
    'First | 1\nThird | 3',
    'Asset A | 蓝色方框居中 | 白色画布中的蓝色方框',
    'Asset A | PASS | PASS | OPEN | PASS'
  ];
  const exact = [['Frame A: 3:2'],['Asset A: COVER 11.1% / CONTAIN 11.1%'],['GAPS: 1','MISSING: 2'],['Asset A: ALT 6 / CAPTION 10 / BALANCED'],['OPEN GATES: 1','STATE: OPEN']];
  const maxRows = [
    Array.from({length:300},function(_,i){return 'Frame '+i+' | 1200 | 800';}).join('\n'),
    Array.from({length:300},function(_,i){return 'Asset '+i+' | 2400 | 1600 | 1200 | 900';}).join('\n'),
    Array.from({length:300},function(_,i){return 'Item '+i+' | '+(i+1);}).join('\n'),
    Array.from({length:300},function(_,i){return 'Asset '+i+' | 替代文字 | 图注文字';}).join('\n'),
    Array.from({length:300},function(_,i){return 'Asset '+i+' | PASS | PASS | PASS | PASS';}).join('\n')
  ];
  const bad = ['Frame | 0 | 4','Asset | 2 | 3 | 0 | 4','A | 1\nB | 1','Asset | '+String.fromCodePoint(0x5b57).repeat(301)+' | 图注','Asset | PASS | MAYBE | PASS | PASS'];
  for (let i = 0; i < 5; i++) {
    await go(manifest.tools[i], 390, "white");
    await setValue(valid[i]);
    await submit();
    const output = await reportText();
    test("tool " + (i + 1) + " exact", exact[i].every(function (x) { return output.includes(x); }), output);
    await shot("tool-" + (i + 1) + "-result", ".ws95-result");
    await setValue(maxRows[i]);
    await submit();
    test("tool " + (i + 1) + " accepts 300", await evaluate("document.querySelector('[data-ws95-tool-state]').textContent==='COMPLETE'"));
    await setValue(bad[i]);
    await submit();
    test("tool " + (i + 1) + " semantic boundary", await invalid());
  }

  const normalized = ['画框Ａ | １２００ | ８００','素材Ａ | ２４００ | １６００ | １２００ | ９００','材料Ａ | １','素材Ａ | 替代文字 | 图注文字','素材Ａ | ＰＡＳＳ | ＰＡＳＳ | ＰＡＳＳ | ＰＡＳＳ'];
  for (let i = 0; i < 5; i++) {
    await go(manifest.tools[i], 390, "soft");
    await setValue(normalized[i]);
    await submit();
    test("NFKC " + (i + 1), await evaluate("document.querySelector('[data-ws95-tool-state]').textContent==='COMPLETE'"));
  }

  for (let i = 0; i < 5; i++) {
    await go(manifest.tools[i], 390, "white");
    await setValue(Array.from({ length: 301 }, function () { return "X"; }).join("\n"));
    await submit();
    test("row limit " + (i + 1), await invalid());
    await setExpression("'A'.repeat(40001)");
    await submit();
    test("raw limit " + (i + 1), await invalid());
    await setExpression("String.fromCharCode(0xd800)");
    await submit();
    test("Unicode malformed " + (i + 1), await invalid());
    await setExpression("'A'+String.fromCharCode(1)");
    await submit();
    test("control character " + (i + 1), await invalid());
    await setValue("");
    await submit();
    test("empty " + (i + 1), await invalid());
    await shot("invalid-tool-" + (i + 1));
    await click(".ws95-bench button[type='reset']");
    await delay(10);
    test("reset " + (i + 1), await evaluate("document.querySelector('[data-ws95-tool-state]').textContent==='UNSET'&&document.querySelector('[data-ws95-tool-copy]').disabled&&!document.querySelector('[data-ws95-tool-error]').textContent"));
    test("guide closed " + (i + 1), await evaluate("!document.querySelector('.ws95-tool-guide').open&&document.querySelectorAll('.ws95-tool-guide h3').length===5"));
    await click(".ws95-tool-guide>summary");
    test("guide opens " + (i + 1), await evaluate("document.querySelector('.ws95-tool-guide').open"));
  }

  for (let i = 0; i < 5; i++) {
    await go(manifest.tools[i], 390, "white");
    await setValue(valid[i]);
    await submit();
    const expected = await reportText();
    await click("[data-ws95-tool-copy]");
    test("clipboard " + (i + 1), await evaluate("navigator.clipboard.readText()") === expected);
  }
  await go(manifest.tools[0], 390, "white");
  await setValue(valid[0]);
  await submit();
  await evaluate("navigator.clipboard.writeText=function(){return new Promise(function(r){window.ws95Finish=r;});}");
  await click("[data-ws95-tool-copy]");
  await setValue("invalid");
  await evaluate("window.ws95Finish()");
  await delay(30);
  test("copy race invalidated", await evaluate("!document.querySelector('[data-ws95-tool-copy-status]').textContent&&document.querySelector('[data-ws95-tool-copy]').disabled"));

  await go(manifest.registrationGuide, 390, "white");
  const promo = "a[href='https://example.org/verified-destination']";
  test("one promotion", await evaluate("document.querySelectorAll(" + JSON.stringify(promo) + ").length===1"));
  test("promotion governance", await evaluate("(function(){const a=document.querySelector(" + JSON.stringify(promo) + ");return a&&a.target==='_blank'&&['sponsored','nofollow','noopener','noreferrer'].every(function(x){return a.relList.contains(x);})&&a.closest('.ws95-public-edition').textContent.includes('推广链接');})()"));

  await go("404.html", 390, "white");
  await shot("404-mobile");
  await evaluate("document.querySelector('#ws95-query').value='';document.querySelector('[data-ws95-search]').requestSubmit()");
  test("404 empty focus", await evaluate("document.activeElement===document.querySelector('#ws95-query')&&document.querySelector('[data-ws95-search-result]').textContent.includes('请输入')"));
  await evaluate("document.querySelector('#ws95-query').value='字'.repeat(81);document.querySelector('[data-ws95-search]').requestSubmit()");
  test("404 length", await evaluate("document.querySelector('[data-ws95-search-result]').textContent.includes('不能超过')"));
  await evaluate("document.querySelector('#ws95-query').value='裁切';document.querySelector('[data-ws95-search]').requestSubmit()");
  test("404 route", await evaluate("document.querySelector('[data-ws95-search-result] a').textContent.includes('裁切见证')"));
  await evaluate("document.querySelector('#ws95-query').value='<img src=x onerror=alert(1)>';document.querySelector('[data-ws95-search]').requestSubmit()");
  test("404 safe text", await evaluate("!document.querySelector('[data-ws95-search-result] img')&&document.querySelector('[data-ws95-search-result]').textContent.includes('没有完全匹配')"));

  const contrast = "function ch(c){if(c==='transparent')return[0,0,0,0];if(c.startsWith('color(srgb ')){const r=c.slice(11,-1).split('/'),n=r[0].trim().split(/\\s+/).map(Number);return[255*n[0],255*n[1],255*n[2],r[1]?Number(r[1]):1];}const n=c.match(/[\\d.]+/g).map(Number);return[n[0],n[1],n[2],n.length===4?n[3]:1];}function lum(v){const a=v.slice(0,3).map(function(n){return n/255;}).map(function(n){return n<=.04045?n/12.92:Math.pow((n+.055)/1.055,2.4);});return.2126*a[0]+.7152*a[1]+.0722*a[2];}function bg(e){if(!e)return[255,255,255,1];const c=ch(getComputedStyle(e).backgroundColor),p=c[3]<1?bg(e.parentElement):[0,0,0,1];return[c[0]*c[3]+p[0]*(1-c[3]),c[1]*c[3]+p[1]*(1-c[3]),c[2]*c[3]+p[2]*(1-c[3]),1];}function ratio(s){const e=document.querySelector(s),b=bg(e),c=ch(getComputedStyle(e).color),f=[c[0]*c[3]+b[0]*(1-c[3]),c[1]*c[3]+b[1]*(1-c[3]),c[2]*c[3]+b[2]*(1-c[3])],x=lum(f),y=lum(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05);}";
  for (const theme of ["white", "soft"]) {
    await go("index.html", 1440, theme);
    let ratios = await evaluate("(function(){" + contrast + "return['.ws95-v2-opening>article>p','.ws95-access-pass small','.ws95-study-wall article>p'].map(ratio);})()");
    test("home contrast " + theme, ratios.every(function (x) { return x >= 4.5; }), ratios);
    await go(manifest.articles[0], 390, theme);
    ratios = await evaluate("(function(){" + contrast + "return['.ws95-study-lead','.ws95-study-page>article>div>section p','.ws95-study-cover figcaption'].map(ratio);})()");
    test("article contrast " + theme, ratios.every(function (x) { return x >= 4.5; }), ratios);
    await go(manifest.tools[0], 390, theme);
    await setValue(valid[0]);
    await submit();
    ratios = await evaluate("(function(){" + contrast + "return['.ws95-instrument>header>p','[data-ws95-tool-output]','.ws95-tool-guide p'].map(ratio);})()");
    test("tool contrast " + theme, ratios.every(function (x) { return x >= 4.5; }), ratios);
    await go(manifest.legal.about, 390, theme);
    ratios = await evaluate("(function(){" + contrast + "return['.ws95-public>header>p','.ws95-public article p','.ws95-public>article>aside small'].map(ratio);})()");
    test("public contrast " + theme, ratios.every(function (x) { return x >= 4.5; }), ratios);
  }

  await send("Emulation.setScriptExecutionDisabled", { value: true });
  for (const width of [1440, 768, 390, 360]) {
    current = "nojs-" + width;
    await send("Emulation.setDeviceMetricsOverride", { width: width, height: 900, deviceScaleFactor: 1, mobile: width < 600 });
    await send("Page.navigate", { url: "http://127.0.0.1:" + port + "/index.html" });
    await ready();
    test("noJS nav " + width, await evaluate("getComputedStyle(document.querySelector('#ws95-nav')).display!=='none'&&Array.from(document.querySelectorAll('#ws95-nav a')).every(function(a){return a.getBoundingClientRect().width>0;})"));
    await send("Page.navigate", { url: "http://127.0.0.1:" + port + "/" + manifest.tools[0] });
    await ready();
    test("noJS tool structure " + width, await evaluate("!!document.querySelector('form')&&!!document.querySelector('.ws95-tool-guide')"));
  }
  await send("Emulation.setScriptExecutionDisabled", { value: false });

  await go("index.html", 390, "white", 820);
  await evaluate("document.querySelector('.ws95-v2-opening h1').textContent='字'.repeat(32);document.querySelector('.ws95-access-pass code').textContent='K'.repeat(48);document.querySelector('.ws95-access-pass small').textContent='条'.repeat(90)");
  test("home stress", await evaluate("document.documentElement.scrollWidth<=innerWidth+1"));
  await shot("home-stress");

  const result = { qa: qa, pages: files.length, renders: renders, checks: checks, errors: errors, counts: { renders: renders.length, renderFailures: renders.filter(function (x) { return !x.ok; }).length, checks: checks.length, failures: checks.filter(function (x) { return !x.ok; }).length, errors: errors.length } };
  fs.writeFileSync(path.join(qa, "report.json"), JSON.stringify(result, null, 2));
  console.log(JSON.stringify({ qa: qa, renders: result.counts.renders, renderFailures: result.counts.renderFailures, checks: result.counts.checks, failures: result.counts.failures, errors: result.counts.errors, screenshots: fs.readdirSync(qa).filter(function (file) { return file.endsWith(".png"); }).length }));
  if (result.counts.renderFailures + result.counts.failures + result.counts.errors) process.exitCode = 1;
}

run().catch(function (error) {
  console.error(error);
  process.exitCode = 1;
}).finally(function () {
  try { if (socket) socket.close(); } catch (_error) {}
  try { server.close(); } catch (_error) {}
  try { if (browser) browser.kill("SIGKILL"); } catch (_error) {}
  setTimeout(function () { process.exit(process.exitCode || 0); }, 250);
});
