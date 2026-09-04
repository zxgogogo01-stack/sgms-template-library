"use strict";

const fs = require("fs");
const path = require("path");
const os = require("os");
const http = require("http");
const { spawn } = require("child_process");

const root = path.resolve("templates/085-cobalt-briefingdesk");
const qa = fs.mkdtempSync(path.join(os.tmpdir(), "bd85-qa-"));
const contract = fs.readFileSync(path.join(root, "TEMPLATE.md"), "utf8");
const manifest = JSON.parse(contract.match(/```json workflow-ready-v2\s*([\s\S]*?)```/u)[1]);
const files = [...new Set([
  manifest.home,
  manifest.articleIndex,
  ...manifest.articles,
  ...manifest.categories.map((entry) => entry.path),
  manifest.toolIndex,
  ...manifest.tools,
  ...Object.values(manifest.legal),
  "briefing-changelog.html",
  manifest.error404,
  "article.html",
  "tool.html",
  "legal.html"
])];
const articleTitles = [
  "先写清这份简报不处理什么",
  "让来源先经过可信度分诊",
  "把变化压缩成可核对的快照",
  "把事实与假设分开放置",
  "让选项在同一量表上比较",
  "给判断标出可变化的区间",
  "让责任人出现在行动之前",
  "把截止时间拆成可见窗口",
  "为失败条件预留升级路径",
  "用差值复盘而不是凭印象",
  "让每一次决定留下依据",
  "把访问入口与边界一起分发"
];
const deskTitles = ["收件桌", "研判桌", "行动桌", "复盘桌"];
const toolTitles = ["六问完整度批检", "选项分数排序器", "RACI 责任冲突检查", "前置与期限窗口计算", "假设敏感度阈值表"];
const publicTitles = {
  ABOUT_TITLE: "运营说明",
  CONTACT_TITLE: "联系编辑桌",
  DISCLOSURE_TITLE: "推广披露",
  DISCLAIMER_TITLE: "阅读边界",
  PRIVACY_TITLE: "本地数据说明",
  CORRECTIONS_TITLE: "更正登记",
  EDITORIAL_TITLE: "编辑协议",
  CHANGELOG_TITLE: "公开版本记录"
};
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
const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

function fixture(token) {
  const match = token.match(/^A(\d+)_(.*)$/u);
  const article = match ? Number(match[1]) - 1 : -1;
  const key = match ? match[2] : token;
  if (token === "LANG") return "zh-Hans";
  if (token === "SITE_DOMAIN") return `127.0.0.1:${port}`;
  if (token === "SITE_NAME") return "钴蓝决策简报桌";
  if (token === "BRAND_EN") return "COBALT / DESK";
  if (token === "SITE_DESC") return "用四道工作桌、十二份简报组件和五件本地仪表组织事实、判断、行动与复盘。";
  if (token === "SITE_TAGLINE") return "让下一步比信息量更清楚。";
  if (token === "INDEPENDENCE_NOTE") return "不代表任何平台、机构或材料发布者。";
  if (token === "RISK_NOTE") return "本地计算不替代来源、事实、合规与专业判断。";
  if (token === "HOME_TITLE") return "把复杂问题，压缩成可行动的公开简报。";
  if (token === "HERO_DESCRIPTION") return "四道工作桌、十二种正文组件和五件本地仪表已经搭好，后续编辑只需填入经核实的文字。";
  if (token === "HOME_REVIEW_CADENCE") return "+30 DAYS";
  if (token === "HOME_DATE") return "2026-09-05";
  if (token === "HOME_SECTION_TITLE") return "一份简报，至少经过四道桌面。";
  if (token === "HOME_SECTION_DESC") return "先分开事实、判断、行动与结果，再压缩文字。";
  if (token === "HOME_QUOTE") return "简报的价值不在于装下多少材料，而在于删减以后仍保留全部决策条件。";
  if (token === "HOME_QUOTE_CREDIT") return "编辑原则";
  if (token === "BRIEF_INDEX_TITLE") return "十二份可直接填字的决策简报";
  if (token === "BRIEF_INDEX_DESC") return "每份简报有独立封面、正文模块、来源位、边界、FAQ 与交接卡。";
  if (token === "TOOL_INDEX_TITLE") return "五件本地决策仪表";
  if (token === "TOOL_INDEX_DESC") return "用确定性规则批检六问、选项、责任、期限和敏感度。";
  if (token === "INVITE_CODE") return "DESK850905";
  if (token === "BENEFIT_RATE") return "适用利益点";
  if (token === "BENEFIT_DISCLAIMER") return "条件、比例与有效期以经核实的正式说明为准。";
  if (token === "AFFILIATE_URL") return "https://example.org/verified-destination";
  if (token === "AFFILIATE_LABEL") return "查看经核实的相关服务";
  if (token === "AFFILIATE_DISCLOSURE") return "使用此入口可能产生推广关系";
  if (token === "AFFILIATE_TITLE") return "访问分发位";
  if (token === "AFFILIATE_DESC") return "此处只放经核实的访问入口、识别码和商业关系说明。";
  if (token === "AUTHOR_NAME") return "示例简报编辑";
  if (token === "CONTACT_EMAIL" || token === "SECURITY_EMAIL") return "desk@example.com";
  if (token === "SECURITY_EXPIRES") return "2027-09-05T00:00:00Z";
  if (token === "SITEMAP_LASTMOD") return "2026-09-05";
  if (/^RSS_DATE_/u.test(token)) return "Sat, 05 Sep 2026 00:00:00 GMT";
  if (/PUBLISHED|MODIFIED|CHANGELOG_DATE/u.test(token)) return "2026-09-05";
  if (/_SOURCE_URL$/u.test(token)) return `https://example.org/source/${token.toLowerCase()}`;
  if (/^DESK_\d+_TITLE$/u.test(token)) return deskTitles[Number(token.match(/\d+/u)[0]) - 1];
  if (/^DESK_\d+_DESC$/u.test(token)) return "固定输入、责任、判断边界和交接记录，让后续文字拥有清楚位置。";
  if (/^TOOL_\d+_TITLE$/u.test(token)) return toolTitles[Number(token.match(/\d+/u)[0]) - 1];
  if (publicTitles[token]) return publicTitles[token];
  if (token === "NOT_FOUND_TITLE") return "这份简报不在当前分发单里。";
  if (token === "NOT_FOUND_DESC") return "页面可能改名、移位或撤下，请在本地目录中寻找最近入口。";
  if (/^COMPAT_.*_TITLE$/u.test(token)) return "旧入口已并入完整简报框架";
  if (/^COMPAT_.*_DESC$/u.test(token)) return "这个兼容入口只负责把读者带到新的完整索引。";
  if (article >= 0 && key === "TITLE") return articleTitles[article];
  if (article >= 0 && key === "SUMMARY") return "此处概述经核实的事实、适用场景、判断边界与下一步，让读者先理解本简报的职责。";
  if (/FAQ_Q/u.test(key)) return "这份简报还需要复核什么？";
  if (/FAQ_A/u.test(key)) return "继续核对直接来源、版本日期、适用范围、例外条件和尚未确认的部分。";
  if (/BODY_/u.test(key)) return "此处填写经核实的正文，分开原始材料、编辑解释、适用判断和尚未确认的部分，并写清下一次复核入口。";
  if (/H2_|TITLE/u.test(key)) return "先固定决策条件，再压缩表达";
  if (/MODULE_[1-4]/u.test(key)) return "可核对的简报字段";
  if (/TEXT|INTRO|NOTE|SUMMARY|CONCLUSION|DISCLAIMER|CAPTION|RISK|DESC|ALT|HANDOFF|BOUNDARY|QUOTE|SIDENOTE|GUIDE|RULE/u.test(key)) return "此处填写经核实的文字，说明来源、适用条件、责任边界与尚未确认的部分。";
  if (/LABEL|FORMAT|STATE|STATUS|PLACEHOLDER|REPORT/u.test(key)) return "简报复核状态与输入合同";
  return "此处填写经核实的文字";
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
  const extension = path.extname(target).toLowerCase();
  const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".ico": "image/x-icon", ".xml": "application/xml; charset=utf-8", ".txt": "text/plain; charset=utf-8" };
  response.writeHead(200, { "Content-Type": types[extension] || "application/octet-stream", "Cache-Control": "no-store" });
  const body = fs.readFileSync(target);
  response.end(/\.(?:html|xml|txt|svg)$/u.test(extension) ? fill(body.toString()) : body);
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
  for (let attempt = 0; attempt < 240; attempt += 1) {
    if (await evaluate("document.readyState==='complete'&&[...document.images].every(image=>image.complete)")) return;
    await delay(25);
  }
  throw new Error(`page readiness timeout ${current}`);
}
async function go(file, width = 1440, theme = "blue", height = 900) {
  current = `${file}@${width}-${theme}`;
  await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 600 });
  await send("Page.navigate", { url: `http://127.0.0.1:${port}/${file}` });
  await ready();
  await evaluate(`localStorage.setItem('bd85-mode',${JSON.stringify(theme)});location.reload()`);
  await ready();
  for (let attempt = 0; attempt < 120; attempt += 1) {
    if (await evaluate(`document.documentElement.dataset.bd85Mode===${JSON.stringify(theme)}`)) return;
    await delay(25);
  }
  throw new Error(`theme timeout ${current}`);
}
async function shot(name, selector = null) {
  if (selector) await evaluate(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:'center',inline:'nearest',behavior:'instant'})`);
  else await evaluate("window.scrollTo({left:0,top:0,behavior:'instant'})");
  await evaluate("new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))");
  const capture = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  fs.writeFileSync(path.join(qa, `${name}.png`), Buffer.from(capture.data, "base64"));
}
async function click(selector) {
  await evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`);
  await delay(35);
}
async function setValue(value) {
  await evaluate(`(()=>{const field=document.querySelector('#bd85-input');field.value=${JSON.stringify(value)};field.dispatchEvent(new Event('input',{bubbles:true}))})()`);
}
async function setExpression(expression) {
  await evaluate(`(()=>{const field=document.querySelector('#bd85-input');field.value=${expression};field.dispatchEvent(new Event('input',{bubbles:true}))})()`);
}
async function submit() {
  await click('button[type="submit"]');
}
async function reportText() {
  return evaluate("document.querySelector('[data-bd85-output]').textContent");
}
async function invalid() {
  return evaluate("(()=>{const field=document.querySelector('#bd85-input');return field.getAttribute('aria-invalid')==='true'&&field.getAttribute('aria-errormessage')&&document.activeElement===field&&document.querySelector('[data-bd85-result-copy]').disabled&&document.querySelector('[data-bd85-report]').hidden})()");
}

async function run() {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  port = server.address().port;
  profile = fs.mkdtempSync(path.join(os.tmpdir(), "bd85-chrome-"));
  browser = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", ["--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check", "--remote-debugging-port=0", `--user-data-dir=${profile}`, "about:blank"], { stdio: ["ignore", "ignore", "pipe"] });
  for (let attempt = 0; attempt < 180 && !fs.existsSync(path.join(profile, "DevToolsActivePort")); attempt += 1) await delay(50);
  const debugPort = fs.readFileSync(path.join(profile, "DevToolsActivePort"), "utf8").split("\n")[0];
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
    } else if (message.method === "Runtime.exceptionThrown") {
      errors.push({ page: current, error: message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text });
    } else if (message.method === "Runtime.consoleAPICalled" && message.params.type === "error") {
      errors.push({ page: current, error: message.params.args.map((argument) => argument.value).join(" ") });
    } else if (message.method === "Network.loadingFailed" && !message.params.canceled) {
      errors.push({ page: current, error: message.params.errorText });
    }
  });
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Network.enable");
  await send("Browser.grantPermissions", { origin: `http://127.0.0.1:${port}`, permissions: ["clipboardReadWrite", "clipboardSanitizedWrite"] });
  await send("Page.bringToFront");

  test("contract lists 36 unique HTML pages", files.length === 36, { count: files.length, files });
  const profiles = [[1440, "blue"], [1440, "paper"], [768, "blue"], [768, "paper"], [390, "blue"], [390, "paper"], [360, "blue"], [360, "paper"]];
  for (const [width, theme] of profiles) {
    for (const file of files) {
      await go(file, width, theme);
      const result = await evaluate(`(()=>{const visible=e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return r.width>0&&r.height>0&&s.display!=='none'&&s.visibility!=='hidden'};const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);const wide=[...document.querySelectorAll('body *')].map(e=>({e,r:e.getBoundingClientRect()})).filter(x=>x.r.right>innerWidth+1||x.r.left<-1).slice(0,8).map(x=>({tag:x.e.tagName,class:String(x.e.className),left:+x.r.left.toFixed(1),right:+x.r.right.toFixed(1)}));const controls=innerWidth<600?[...document.querySelectorAll('a,button,input,select,textarea,summary')].filter(visible).filter(e=>!e.classList.contains('bd85-skip')).filter(e=>{const r=e.getBoundingClientRect();return r.width<43.5||r.height<43.5}).map(e=>({tag:e.tagName,text:e.textContent.trim().slice(0,18),w:+e.getBoundingClientRect().width.toFixed(1),h:+e.getBoundingClientRect().height.toFixed(1)})):[];return{overflow:document.documentElement.scrollWidth>innerWidth+1,wide,badImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),small:controls,dupes:ids.filter((v,i)=>ids.indexOf(v)!==i),h1:document.querySelectorAll('h1').length,disclosure:document.body.textContent.includes('本站独立运营'),theme:document.documentElement.dataset.bd85Mode}})()`);
      const okay = !result.overflow && !result.wide.length && !result.badImages.length && !result.small.length && !result.dupes.length && result.h1 === 1 && result.disclosure && result.theme === theme;
      renders.push({ file, width, theme, ok: okay, ...(okay ? {} : result) });
      if (!okay) console.log("RENDER FAIL", current, JSON.stringify(result));
    }
  }

  for (const [width, theme] of profiles) {
    await go("index.html", width, theme, 820);
    const top = await evaluate("(()=>{const lead=document.querySelector('.bd85-lead'),chip=document.querySelector('.bd85-access-chip'),r=chip.getBoundingClientRect();return{lead:!!lead,desks:document.querySelectorAll('.bd85-files article').length,questions:document.querySelectorAll('.bd85-board>div').length,overflow:document.documentElement.scrollWidth>innerWidth+1,chip:r.top>=0&&r.top<innerHeight,code:chip.querySelector('[data-bd85-copy-source]').textContent,enabled:!chip.querySelector('button').disabled,benefit:chip.textContent.includes('适用利益点'),footnote:chip.textContent.includes('条件、比例与有效期')}})()");
    test(`home briefing desk ${width} ${theme}`, top.lead && top.desks === 4 && top.questions === 6 && !top.overflow && top.chip && top.code === "DESK850905" && top.enabled && top.benefit && top.footnote, top);
    await shot(`home-${width}-${theme}`);
  }
  await go("index.html", 390);
  await click("[data-bd85-copy-code]");
  test("home reference clipboard", await evaluate("navigator.clipboard.readText()") === "DESK850905");
  await click("[data-bd85-mode-toggle]");
  test("theme toggles and color scheme", await evaluate("document.documentElement.dataset.bd85Mode==='paper'&&getComputedStyle(document.documentElement).colorScheme==='light'"));
  await click(".bd85-menu");
  test("menu opens and focuses first link", await evaluate("document.body.dataset.bd85Menu==='open'&&document.activeElement===document.querySelector('#bd85-nav a')"));
  await send("Input.dispatchKeyEvent", { type: "keyDown", key: "Escape", code: "Escape" });
  test("escape closes and returns focus", await evaluate("document.body.dataset.bd85Menu==='closed'&&document.activeElement===document.querySelector('.bd85-menu')"));

  await go(manifest.articleIndex, 390);
  await click('[data-bd85-filter="analysis"]');
  test("brief register filters to three", await evaluate("document.querySelectorAll('[data-bd85-desk]:not([hidden])').length===3&&document.querySelector('[data-bd85-filter-status]').textContent.includes('3')"));
  await click('[data-bd85-filter="all"]');
  test("brief register restores all", await evaluate("document.querySelectorAll('[data-bd85-desk]:not([hidden])').length===12"));
  await shot("register-mobile");
  await go(manifest.articleIndex, 1440, "paper");
  await shot("register-desktop");

  const components = [".bd85-scope-frame", ".bd85-source-stack", ".bd85-situation-ticker", ".bd85-assumption-split", ".bd85-option-quadrant", ".bd85-confidence-band", ".bd85-owner-roster", ".bd85-deadline-line", ".bd85-escalation-ladder", ".bd85-outcome-delta", ".bd85-decision-ledger", ".bd85-distribution-slip"];
  for (let index = 0; index < 12; index += 1) {
    await go(manifest.articles[index], index % 2 ? 390 : 1440, index % 3 ? "blue" : "paper");
    test(`article component ${index + 1}`, await evaluate(`document.querySelector(${JSON.stringify(components[index])})!==null`));
    await shot(`module-${String(index + 1).padStart(2, "0")}`, components[index]);
  }
  await go(manifest.articles[0], 390);
  test("article anchors resolve", await evaluate("[...document.querySelectorAll('.bd85-index nav a')].length===4&&[...document.querySelectorAll('.bd85-index nav a')].every(a=>document.querySelector(a.hash))"));
  test("article FAQ native", await evaluate("document.querySelectorAll('.bd85-faq details').length===2"));
  await click(".bd85-faq details:first-of-type>summary");
  test("FAQ opens", await evaluate("document.querySelector('.bd85-faq details:first-of-type').open"));
  const start = await evaluate("parseFloat(getComputedStyle(document.querySelector('[data-bd85-progress]')).getPropertyValue('--bd85-read'))");
  await evaluate("window.scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'});new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))");
  const end = await evaluate("parseFloat(getComputedStyle(document.querySelector('[data-bd85-progress]')).getPropertyValue('--bd85-read'))");
  test("reading progress reaches 100", start < 5 && end > 99.5, { start, end });
  await go(manifest.categories[0].path, 1440, "paper");
  await shot("desk-desktop");
  await go(manifest.categories[2].path, 390, "blue");
  await shot("desk-mobile");
  await go(manifest.toolIndex, 1440);
  await shot("instrument-drawer");
  await go(manifest.legal.about, 390, "paper");
  await shot("public-mobile");
  for (let index = 0; index < 5; index += 1) {
    await go(manifest.tools[index], 1440, index % 2 ? "paper" : "blue");
    await shot(`tool-${index + 1}-desktop`);
    await go(manifest.tools[index], 390, index % 2 ? "blue" : "paper");
    await shot(`tool-${index + 1}-mobile`);
  }

  let output;
  await go(manifest.tools[0], 390);
  await setValue("完整 | 事项 | 原因 | 负责人 | 明日 | 工作区 | 复核\n缺项 | 事项 | 原因 |  | 明日 | 工作区 | 复核");
  await submit();
  output = await reportText();
  test("brief completeness exact", output.includes("简报：2") && output.includes("完整：1") && output.includes("缺项｜缺项 WHO"), output);
  await shot("tool-1-result", ".bd85-instrument-report");
  await setValue(Array.from({ length: 300 }, (_entry, index) => `B${index} | A | B | C | D | E | F`).join("\n"));
  await submit();
  test("brief all 300 complete", await evaluate("document.querySelector('[data-bd85-count]').textContent==='300 ROWS'"));
  await setValue("超长 | " + "字".repeat(301) + " | B | C | D | E | F");
  await submit();
  test("brief per-field maximum rejected", await invalid());

  await go(manifest.tools[1], 390);
  await setValue("甲 | 80 | 75 | 30 | 15\n乙 | 70 | 90 | 20 | 25\n并列 | 160 | 75 | 60 | 30");
  await submit();
  output = await reportText();
  test("option rational sorting stable", output.includes("1. 乙｜分数 140.000") && output.indexOf("甲") < output.indexOf("并列"), output);
  await shot("tool-2-result", ".bd85-instrument-report");
  await setValue(Array.from({ length: 300 }, (_entry, index) => `O${index} | 1 | 1 | 1 | 1`).join("\n"));
  await submit();
  test("options all 300 complete", await evaluate("document.querySelector('[data-bd85-count]').textContent==='300 ROWS'"));
  await setValue("坏值 | 0 | 1 | 1 | 1");
  await submit();
  test("options zero rejected", await invalid());

  await go(manifest.tools[2], 390);
  await setValue("通过 | 林青 | A\n通过 | 周澄 | R\n冲突 | 周澄 | A\n冲突 | 周澄 | R\n缺A | 林青 | R");
  await submit();
  output = await reportText();
  test("RACI conflicts exact", output.includes("任务：3") && output.includes("周澄 同时承担 A/R") && output.includes("缺A｜A 应恰有 1 人，当前 0"), output);
  await shot("tool-3-result", ".bd85-instrument-report");
  await setValue(Array.from({ length: 300 }, (_entry, index) => `T${index} | P${index} | A`).join("\n"));
  await submit();
  test("RACI all 300 parsed", await evaluate("document.querySelector('[data-bd85-count]').textContent==='300 ROWS'"));
  await setValue("坏角色 | 人 | X");
  await submit();
  test("RACI role rejected", await invalid());

  await go(manifest.tools[3], 390);
  await setValue("资料 | 2 | ROOT | 3\n复核 | 1 | 资料 | 4\n发布 | 2 | 复核 | 4");
  await submit();
  output = await reportText();
  test("critical path exact", output.includes("稳定顺序：资料 → 复核 → 发布") && output.includes("发布｜最早完成第 5 日｜截止第 4 日｜逾期 1 日"), output);
  await shot("tool-4-result", ".bd85-instrument-report");
  await setValue(["N0 | 1 | ROOT | 1", ...Array.from({ length: 299 }, (_entry, index) => `N${index + 1} | 1 | N${index} | ${index + 2}`)].join("\n"));
  await submit();
  test("path all 300 complete", await evaluate("document.querySelector('[data-bd85-count]').textContent==='300 ROWS'"));
  await setValue("A | 1 | B | 2\nB | 1 | A | 2");
  await submit();
  test("path cycle rejected", await invalid());

  await go(manifest.tools[4], 390);
  await setValue("基准 | 120 | -15 | 100\n压力 | 120 | -35 | 100\n负数 | -20 | 50 | 0");
  await submit();
  output = await reportText();
  test("sensitivity exact", output.includes("达到或超过阈值：2") && output.includes("基准｜基准 120｜变化 -15｜调整 105｜阈值 100｜高于阈值 5") && output.includes("压力｜基准 120｜变化 -35｜调整 85｜阈值 100｜低于阈值 15"), output);
  await shot("tool-5-result", ".bd85-instrument-report");
  await setValue(Array.from({ length: 300 }, (_entry, index) => `S${index} | 0 | 0 | 0`).join("\n"));
  await submit();
  test("sensitivity all 300 complete", await evaluate("document.querySelector('[data-bd85-count]').textContent==='300 ROWS'"));
  await setValue("坏值 | -0 | 0 | 0");
  await submit();
  test("sensitivity negative zero rejected", await invalid());

  const normalized = [
    ["全角 ｜ 事项 ｜ 原因 ｜ 编辑 ｜ 明日 ｜ 工作区 ｜ 复核", "六问完整"],
    ["全角 ｜ ８０ ｜ ７５ ｜ ３０ ｜ １５", "分数 133.333"],
    ["资料 ｜ 林青 ｜ Ａ\n资料 ｜ 周澄 ｜ Ｒ", "责任结构通过"],
    ["资料 ｜ ２ ｜ ＲＯＯＴ ｜ ３\n复核 ｜ １ ｜ 资料 ｜ ４", "复核｜最早完成第 3 日"],
    ["基准 ｜ １２０ ｜ －１５ ｜ １００", "调整 105"]
  ];
  for (let index = 0; index < 5; index += 1) {
    await go(manifest.tools[index], 390);
    await setValue(normalized[index][0]);
    await submit();
    output = await reportText();
    test(`NFKC success ${index}`, output.includes(normalized[index][1]), output);
  }
  for (let index = 0; index < 5; index += 1) {
    await go(manifest.tools[index], 390);
    await setValue(Array.from({ length: 301 }, () => "X").join("\n"));
    await submit();
    test(`row limit ${index}`, await invalid());
    await setExpression("'A'.repeat(40001)");
    await submit();
    test(`raw limit ${index}`, await invalid());
    await setExpression("String.fromCharCode(0xd800)");
    await submit();
    test(`malformed Unicode ${index}`, await invalid());
    await setExpression("'A'+String.fromCharCode(1)");
    await submit();
    test(`control rejection ${index}`, await invalid());
    await setValue("");
    await submit();
    test(`empty input invalid ${index}`, await invalid());
    await shot(`invalid-tool-${index + 1}`);
    await click('button[type="reset"]');
    test(`tool reset ${index}`, await evaluate("document.querySelector('[data-bd85-report]').hidden&&document.querySelector('[data-bd85-result-copy]').disabled&&!document.querySelector('[data-bd85-error]').textContent"));
    test(`guide default closed ${index}`, await evaluate("!document.querySelector('.bd85-guide').open&&document.querySelectorAll('.bd85-guide h3').length===5"));
    await click(".bd85-guide>summary");
    test(`guide opens ${index}`, await evaluate("document.querySelector('.bd85-guide').open"));
  }
  const valid = [
    "完整 | 事项 | 原因 | 负责人 | 明日 | 工作区 | 复核",
    "甲 | 80 | 75 | 30 | 15",
    "资料 | 林青 | A\n资料 | 周澄 | R",
    "资料 | 2 | ROOT | 3\n复核 | 1 | 资料 | 4",
    "基准 | 120 | -15 | 100"
  ];
  for (let index = 0; index < 5; index += 1) {
    await go(manifest.tools[index], 390);
    await setValue(valid[index]);
    await submit();
    const expected = await reportText();
    await click("[data-bd85-result-copy]");
    test(`complete report clipboard ${index}`, await evaluate("navigator.clipboard.readText()") === expected);
  }
  await go(manifest.tools[0], 390);
  await setValue(valid[0]);
  await submit();
  await evaluate("navigator.clipboard.writeText=()=>new Promise(resolve=>window.bd85FinishCopy=resolve)");
  await click("[data-bd85-result-copy]");
  await setValue("invalid");
  await evaluate("window.bd85FinishCopy()");
  await delay(30);
  test("copy race stays invalidated", await evaluate("!document.querySelector('[data-bd85-copy-status]').textContent&&document.querySelector('[data-bd85-result-copy]').disabled"));

  await go(manifest.registrationGuide, 390);
  const promotion = 'a[href="https://example.org/verified-destination"]';
  test("one promotion link", await evaluate(`document.querySelectorAll(${JSON.stringify(promotion)}).length===1`));
  test("promotion disclosure and attributes", await evaluate(`(()=>{const link=document.querySelector(${JSON.stringify(promotion)});return link&&link.target==='_blank'&&['sponsored','nofollow','noopener','noreferrer'].every(value=>link.relList.contains(value))&&link.closest('.bd85-promo-slip').textContent.includes('推广链接')})()`));

  await go("404.html", 390);
  await shot("404-mobile");
  await evaluate("document.querySelector('#bd85-query').value='';document.querySelector('[data-bd85-search]').requestSubmit()");
  test("404 empty query focuses input", await evaluate("document.activeElement===document.querySelector('#bd85-query')&&document.querySelector('[data-bd85-search-result]').textContent.includes('请输入')"));
  await evaluate("document.querySelector('#bd85-query').value='字'.repeat(81);document.querySelector('[data-bd85-search]').requestSubmit()");
  test("404 81 code points rejected", await evaluate("document.activeElement===document.querySelector('#bd85-query')&&document.querySelector('[data-bd85-search-result]').textContent.includes('不能超过')"));
  await evaluate("document.querySelector('#bd85-query').value='RACI';document.querySelector('[data-bd85-search]').requestSubmit()");
  test("404 local search", await evaluate("document.querySelectorAll('[data-bd85-search-result] a').length===1&&document.querySelector('[data-bd85-search-result]').textContent.includes('五件本地仪表')"));
  await evaluate("document.querySelector('#bd85-query').value='<img src=x onerror=alert(1)>';document.querySelector('[data-bd85-search]').requestSubmit()");
  test("404 no-result safe", await evaluate("!document.querySelector('[data-bd85-search-result] img')&&document.querySelector('[data-bd85-search-result]').textContent.includes('没有完全匹配')"));

  const contrast = "function ch(c){if(c==='transparent')return[0,0,0,0];if(c.startsWith('color(srgb ')){const raw=c.slice(11,-1).split('/'),n=raw[0].trim().split(/\\s+/).map(Number);return[255*n[0],255*n[1],255*n[2],raw[1]?Number(raw[1]):1]}const n=c.match(/[\\d.]+/g).map(Number);return[n[0],n[1],n[2],n.length===4?n[3]:1]}function lum(v){const a=v.slice(0,3).map(n=>n/255).map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4);return.2126*a[0]+.7152*a[1]+.0722*a[2]}function bg(e){if(!e)return[255,255,255,1];const c=ch(getComputedStyle(e).backgroundColor),p=c[3]<1?bg(e.parentElement):[0,0,0,1];return[c[0]*c[3]+p[0]*(1-c[3]),c[1]*c[3]+p[1]*(1-c[3]),c[2]*c[3]+p[2]*(1-c[3]),1]}function ratio(s){const e=document.querySelector(s),b=bg(e),c=ch(getComputedStyle(e).color),f=[c[0]*c[3]+b[0]*(1-c[3]),c[1]*c[3]+b[1]*(1-c[3]),c[2]*c[3]+b[2]*(1-c[3])],x=lum(f),y=lum(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05)}";
  for (const theme of ["blue", "paper"]) {
    await go("index.html", 1440, theme);
    let ratios = await evaluate(`(()=>{${contrast};return['.bd85-lead>span','.bd85-access-chip small','.bd85-files article:first-child p'].map(ratio)})()`);
    test(`home contrast ${theme}`, ratios.every((value) => value >= 4.5), ratios);
    await go(manifest.articles[0], 390, theme);
    ratios = await evaluate(`(()=>{${contrast};return['.bd85-memo>header>span','.bd85-memo>section p','.bd85-cover figcaption'].map(ratio)})()`);
    test(`article contrast ${theme}`, ratios.every((value) => value >= 4.5), ratios);
    await go(manifest.tools[0], 390, theme);
    await setValue(valid[0]);
    await submit();
    ratios = await evaluate(`(()=>{${contrast};return['#bd85-format-1','[data-bd85-output]','.bd85-guide p'].map(ratio)})()`);
    test(`tool contrast ${theme}`, ratios.every((value) => value >= 4.5), ratios);
    await go(manifest.legal.about, 390, theme);
    ratios = await evaluate(`(()=>{${contrast};return['.bd85-public-file>header p','.bd85-public-grid article:first-child p','.bd85-public-file>aside p'].map(ratio)})()`);
    test(`public contrast ${theme}`, ratios.every((value) => value >= 4.5), ratios);
  }

  await send("Emulation.setScriptExecutionDisabled", { value: true });
  for (const width of [1440, 768, 390, 360]) {
    current = `nojs-${width}`;
    await send("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 1, mobile: width < 600 });
    await send("Page.navigate", { url: `http://127.0.0.1:${port}/index.html` });
    await ready();
    test(`noJS home nav ${width}`, await evaluate("getComputedStyle(document.querySelector('#bd85-nav')).display!=='none'&&[...document.querySelectorAll('#bd85-nav a')].every(a=>a.getBoundingClientRect().width>0)"));
    test(`noJS copy disabled ${width}`, await evaluate("document.querySelector('[data-bd85-copy-code]').disabled"));
    await send("Page.navigate", { url: `http://127.0.0.1:${port}/${manifest.tools[0]}` });
    await ready();
    test(`noJS tool disabled ${width}`, await evaluate("document.querySelector('button[type=submit]').disabled&&document.querySelector('.bd85-guide')!==null"));
    await send("Page.navigate", { url: `http://127.0.0.1:${port}/${manifest.articles[0]}` });
    await ready();
    test(`noJS article structure ${width}`, await evaluate("document.querySelectorAll('.bd85-index nav a').length===4&&document.querySelectorAll('.bd85-faq details').length===2"));
  }
  await send("Emulation.setScriptExecutionDisabled", { value: false });
  await go("index.html", 390, "blue", 820);
  await evaluate("document.querySelector('.bd85-lead h1').textContent='字'.repeat(28);document.querySelector('.bd85-lead>span').textContent='排'.repeat(110);document.querySelector('[data-bd85-copy-source]').textContent='K'.repeat(32);document.querySelector('.bd85-access-chip small').textContent='条'.repeat(52)");
  const stress = await evaluate("document.documentElement.scrollWidth<=innerWidth+1&&Array.from(document.querySelector('.bd85-lead h1').textContent).length===28&&Array.from(document.querySelector('.bd85-lead>span').textContent).length===110&&document.querySelector('[data-bd85-copy-source]').textContent.length===32");
  test("home boundary copy fits without overflow", stress);
  await shot("home-stress");

  const result = {
    qa,
    pages: files.length,
    renders,
    checks,
    errors,
    counts: {
      renders: renders.length,
      renderFailures: renders.filter((entry) => !entry.ok).length,
      checks: checks.length,
      failures: checks.filter((entry) => !entry.ok).length,
      errors: errors.length
    }
  };
  fs.writeFileSync(path.join(qa, "report.json"), JSON.stringify(result, null, 2));
  console.log(JSON.stringify({ qa, ...result.counts, screenshots: fs.readdirSync(qa).filter((file) => file.endsWith(".png")).length }));
  if (result.counts.renderFailures + result.counts.failures + result.counts.errors) process.exitCode = 1;
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}).finally(() => {
  try {
    if (socket) socket.close();
  } catch (_error) {
    socket = null;
  }
  try {
    server.close();
  } catch (_error) {
    port = 0;
  }
  try {
    if (browser) browser.kill("SIGKILL");
  } catch (_error) {
    browser = null;
  }
  setTimeout(() => process.exit(process.exitCode || 0), 250);
});
