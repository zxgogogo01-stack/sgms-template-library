'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');
const http = require('http');
const { spawn } = require('child_process');

const root = path.resolve('templates/084-champagne-columnstage');
const qa = fs.mkdtempSync(path.join(os.tmpdir(), 'cc84-qa-'));
const contract = fs.readFileSync(path.join(root, 'TEMPLATE.md'), 'utf8');
const manifest = JSON.parse(contract.match(/```json workflow-ready-v2\s*([\s\S]*?)```/)[1]);
const files = [...new Set([
  manifest.home,
  manifest.articleIndex,
  ...manifest.articles,
  ...manifest.categories.map((entry) => entry.path),
  manifest.toolIndex,
  ...manifest.tools,
  ...Object.values(manifest.legal),
  'salon-changelog.html',
  manifest.error404,
  'article.html',
  'tool.html',
  'legal.html'
])];
const titles = [
  '让每场内容先写清在座的人',
  '把持续问题放在舞台中央',
  '用证据基座承重编辑判断',
  '设计一道不迷路的内容入口',
  '让栏宽与信息密度保持张力',
  '用场记顺序组织复杂阅读',
  '让更新频率跟随变化速度',
  '用触发条件而非日历催更',
  '把复核节点放进观众视野',
  '用一把交接钥匙保留责任',
  '让每次发布都留下节目单',
  '用访问凭条公开入口与边界'
];
const roomTitles = ['观众厅', '编排厅', '节奏厅', '保管厅'];
const toolTitles = ['柱廊栏宽计算台', '包厢权重分配器', '场记顺序审计器', '复核节奏召集台', '证据幕布覆盖表'];
const publicTitles = {
  ABOUT_TITLE: '数字沙龙章程',
  CONTACT_TITLE: '编辑联络桌',
  DISCLOSURE_TITLE: '商业关系节目单',
  DISCLAIMER_TITLE: '观众阅读边界',
  PRIVACY_TITLE: '本地工具隐私',
  CORRECTIONS_TITLE: '更正台账',
  EDITORIAL_TITLE: '编辑总谱',
  CHANGELOG_TITLE: '沙龙版本记录'
};
let browser;
let ws;
let port;
let profile;
let id = 0;
let current = '';
const pending = new Map();
const errors = [];
const renders = [];
const checks = [];
const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

function fixture(token) {
  const match = token.match(/^A(\d+)_(.*)$/u);
  const article = match ? Number(match[1]) - 1 : -1;
  const key = match ? match[2] : token;
  if (token === 'LANG') return 'zh-Hans';
  if (token === 'SITE_DOMAIN') return `127.0.0.1:${port}`;
  if (token === 'SITE_NAME') return '香槟柱廊内容沙龙';
  if (token === 'BRAND_EN') return 'COLUMN / SALON';
  if (token === 'SITE_DESC') return '以四间内容厅、十二种文章组件和五台本地工具组织观众、编排、节奏与保管责任。';
  if (token === 'SITE_TAGLINE') return '让每个栏目拥有自己的舞台。';
  if (token === 'INDEPENDENCE_NOTE') return '不代表任何平台、机构或材料发布者。';
  if (token === 'RISK_NOTE') return '本地计算不替代来源、事实、合规与专业判断。';
  if (token === 'HOME_TITLE') return '给每一种内容，一座恰当的舞台。';
  if (token === 'HERO_DESCRIPTION') return '栏目、文章组件、公开说明和本地工具已经搭好，后续编辑只需填入经核实的文字与变量。';
  if (token === 'HOME_SECTION_TITLE') return '四间内容厅，四种清楚承诺。';
  if (token === 'HOME_SECTION_DESC') return '栏目之间通过对象、问题、证据和更新节奏建立身份。';
  if (token === 'HOME_QUOTE') return '高级的栏目不是每篇都长得一样，而是每篇都兑现同一种期待。';
  if (token === 'HOME_QUOTE_CREDIT') return '栏目策展原则';
  if (token === 'REGISTER_TITLE') return '十二场内容节目';
  if (token === 'REGISTER_DESC') return '每个外壳已经配置独立开场、正文组件、来源、边界、FAQ 与交接入口。';
  if (token === 'TOOLS_INDEX_TITLE') return '五台本地编排工具';
  if (token === 'TOOLS_INDEX_DESC') return '用确定性计算处理栏宽、权重、顺序、节奏和证据覆盖。';
  if (token === 'TOOLS_BOUNDARY') return '所有输入只在当前浏览器处理，结果必须结合真实材料复核。';
  if (token === 'INVITE_TITLE') return '经核实后填写访问凭条';
  if (token === 'INVITE_CODE') return 'SALON840905';
  if (token === 'BENEFIT_RATE') return '适用利益点';
  if (token === 'BENEFIT_DISCLAIMER') return '条件、比例与有效期以经核实的正式说明为准。';
  if (token === 'AFFILIATE_URL') return 'https://example.org/verified-destination';
  if (token === 'AFFILIATE_LABEL') return '查看经核实的相关服务';
  if (token === 'AFFILIATE_DISCLOSURE') return '使用此入口可能产生推广关系';
  if (token === 'AUTHOR_NAME') return '示例沙龙编辑';
  if (token === 'CONTACT_EMAIL' || token === 'SECURITY_EMAIL') return 'salon@example.com';
  if (token === 'SECURITY_EXPIRES') return '2027-09-05T00:00:00Z';
  if (token === 'SITEMAP_LASTMOD') return '2026-09-05';
  if (/RSS_DATE$/u.test(token) || /^RSS_DATE_/u.test(token)) return 'Sat, 05 Sep 2026 00:00:00 GMT';
  if (/PUBLISHED|MODIFIED|_DATE_/u.test(token)) return '2026-09-05';
  if (/_SOURCE_URL$/u.test(token)) return `https://example.org/source/${token.toLowerCase()}`;
  if (/^ROOM_\d+_TITLE$/u.test(token)) return roomTitles[Number(token.match(/\d+/u)[0]) - 1];
  if (/^TOOL_\d+_TITLE$/u.test(token)) return toolTitles[Number(token.match(/\d+/u)[0]) - 1];
  if (publicTitles[token]) return publicTitles[token];
  if (token === 'NOT_FOUND_TITLE') return '这间厅暂时没有开放。';
  if (token === 'NOT_FOUND_DESC') return '页面可能改名、移位或撤下，请在本地节目单中寻找最近入口。';
  if (/^COMPAT_.*_TITLE$/u.test(token)) return '旧入口已并入完整沙龙框架';
  if (/^COMPAT_.*_DESC$/u.test(token)) return '这个兼容入口只负责把读者带到新的完整页面索引。';
  if (article >= 0 && key === 'TITLE') return titles[article];
  if (article >= 0 && key === 'SUMMARY') return '此处概述经核实的对象、材料、适用语境与下一次复核入口，让读者先理解这一场内容的职责。';
  if (/FAQ_Q/u.test(key)) return '这一场内容还需要复核什么？';
  if (/FAQ_A/u.test(key)) return '继续核对直接来源、版本日期、适用范围、例外条件与尚未确认的部分。';
  if (/BODY_/u.test(key)) return '此处填写经核实的正文，分开原始材料、编辑解释、适用判断与尚未确认的部分，并写清下一次复核入口。';
  if (/H2_|TITLE/u.test(key)) return '先安排材料关系，再决定视觉音量';
  if (/TEXT|INTRO|NOTE|SUMMARY|CONCLUSION|DISCLAIMER|CAPTION|RISK|DESC|ALT|HANDOFF|BOUNDARY|QUOTE|SIDENOTE|CURATOR/u.test(key)) return '此处填写经核实的文字，说明材料来处、适用条件、编辑边界与尚未确认的部分。';
  if (/MODULE_[1-4]/u.test(key)) return '栏目承诺与复核线索';
  if (/LABEL|FORMAT|STATE|STATUS|PLACEHOLDER|REPORT/u.test(key)) return '编排复核状态与输入合同';
  return '此处填写经核实的文字';
}
function fill(raw) {
  return raw.replace(/%%([A-Z0-9_]+)%%/gu, (_match, token) => fixture(token)).replaceAll(`https://127.0.0.1:${port}`, `http://127.0.0.1:${port}`);
}

const server = http.createServer((request, response) => {
  const route = decodeURIComponent(new URL(request.url, 'http://localhost').pathname).replace(/^\/+|\/+$/gu, '') || 'index.html';
  const target = path.resolve(root, route);
  if (!target.startsWith(`${root}${path.sep}`) || !fs.existsSync(target) || !fs.statSync(target).isFile()) {
    response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
    response.end(fill(fs.readFileSync(path.join(root, '404.html'), 'utf8')));
    return;
  }
  const extension = path.extname(target).toLowerCase();
  const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.ico': 'image/x-icon', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8' };
  response.writeHead(200, { 'Content-Type': types[extension] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  const body = fs.readFileSync(target);
  response.end(/\.(?:html|xml|txt|svg)$/u.test(extension) ? fill(body.toString()) : body);
});
function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const call = ++id;
    pending.set(call, { resolve, reject });
    ws.send(JSON.stringify({ id: call, method, params }));
  });
}
async function evaluate(expression) {
  const value = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true, userGesture: true });
  if (value.exceptionDetails) throw new Error(value.exceptionDetails.exception?.description || value.exceptionDetails.text);
  return value.result.value;
}
function test(name, okay, detail = '') {
  checks.push({ name, ok: Boolean(okay), ...(okay ? {} : { detail }) });
  if (!okay) console.log('CHECK FAIL', name, typeof detail === 'string' ? detail : JSON.stringify(detail));
}
async function ready() {
  for (let attempt = 0; attempt < 240; attempt += 1) {
    if (await evaluate("document.readyState==='complete'&&[...document.images].every(image=>image.complete)")) return;
    await delay(25);
  }
  throw new Error(`page readiness timeout ${current}`);
}
async function go(file, width = 1440, theme = 'evening', height = 900) {
  current = `${file}@${width}-${theme}`;
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 600 });
  await send('Page.navigate', { url: `http://127.0.0.1:${port}/${file}` });
  await ready();
  await evaluate(`localStorage.setItem('cc84-salon',${JSON.stringify(theme)});location.reload()`);
  await ready();
  for (let attempt = 0; attempt < 120; attempt += 1) {
    if (await evaluate(`document.documentElement.dataset.cc84Salon===${JSON.stringify(theme)}`)) return;
    await delay(25);
  }
  throw new Error(`theme timeout ${current}`);
}
async function shot(name, selector = null) {
  if (selector) await evaluate(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:'center',inline:'nearest',behavior:'instant'})`);
  else await evaluate("window.scrollTo({left:0,top:0,behavior:'instant'})");
  await evaluate('new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))');
  const capture = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  fs.writeFileSync(path.join(qa, `${name}.png`), Buffer.from(capture.data, 'base64'));
}
async function click(selector) {
  await evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`);
  await delay(35);
}
async function setValue(value) {
  await evaluate(`(()=>{const field=document.querySelector('#cc84-input');field.value=${JSON.stringify(value)};field.dispatchEvent(new Event('input',{bubbles:true}))})()`);
}
async function setExpression(expression) {
  await evaluate(`(()=>{const field=document.querySelector('#cc84-input');field.value=${expression};field.dispatchEvent(new Event('input',{bubbles:true}))})()`);
}
async function submit() {
  await click('button[type="submit"]');
}
async function reportText() {
  return evaluate("document.querySelector('[data-cc84-output]').textContent");
}
async function invalid() {
  return evaluate("(()=>{const field=document.querySelector('#cc84-input');return field.getAttribute('aria-invalid')==='true'&&field.getAttribute('aria-errormessage')&&document.activeElement===field&&document.querySelector('[data-cc84-result-copy]').disabled&&document.querySelector('[data-cc84-report]').hidden})()");
}

function weightedOracle(total, weights, gap) {
  const available = total - gap * (weights.length - 1);
  const sum = weights.reduce((value, weight) => value + weight, 0);
  const widths = weights.map((weight) => Math.floor(available * weight / sum));
  const left = available - widths.reduce((value, width) => value + width, 0);
  const order = weights.map((weight, index) => ({ index, remainder: available * weight % sum })).sort((leftItem, rightItem) => rightItem.remainder - leftItem.remainder || leftItem.index - rightItem.index);
  for (let index = 0; index < left; index += 1) widths[order[index].index] += 1;
  return widths;
}

async function run() {
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  port = server.address().port;
  profile = fs.mkdtempSync(path.join(os.tmpdir(), 'cc84-chrome-'));
  browser = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });
  for (let attempt = 0; attempt < 180 && !fs.existsSync(path.join(profile, 'DevToolsActivePort')); attempt += 1) await delay(50);
  const debugPort = fs.readFileSync(path.join(profile, 'DevToolsActivePort'), 'utf8').split('\n')[0];
  const target = await (await fetch(`http://127.0.0.1:${debugPort}/json/new?about:blank`, { method: 'PUT' })).json();
  ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve) => ws.addEventListener('open', resolve));
  ws.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (message.id) {
      const call = pending.get(message.id);
      pending.delete(message.id);
      if (!call) return;
      message.error ? call.reject(new Error(JSON.stringify(message.error))) : call.resolve(message.result);
    } else if (message.method === 'Runtime.exceptionThrown') {
      errors.push({ page: current, error: message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text });
    } else if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') {
      errors.push({ page: current, error: message.params.args.map((argument) => argument.value).join(' ') });
    } else if (message.method === 'Network.loadingFailed' && !message.params.canceled) {
      errors.push({ page: current, error: message.params.errorText });
    }
  });
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Network.enable');
  await send('Browser.grantPermissions', { origin: `http://127.0.0.1:${port}`, permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'] });
  await send('Page.bringToFront');

  test('contract lists 36 unique HTML pages', files.length === 36, { count: files.length, files });
  const profiles = [[1440, 'evening'], [1440, 'morning'], [768, 'evening'], [768, 'morning'], [390, 'evening'], [390, 'morning'], [360, 'evening'], [360, 'morning']];
  for (const [width, theme] of profiles) {
    for (const file of files) {
      await go(file, width, theme);
      const result = await evaluate(`(()=>{const visible=e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return r.width>0&&r.height>0&&s.display!=='none'&&s.visibility!=='hidden'};const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);const wide=[...document.querySelectorAll('body *')].map(e=>({e,r:e.getBoundingClientRect()})).filter(x=>x.r.right>innerWidth+1||x.r.left<-1).slice(0,8).map(x=>({tag:x.e.tagName,class:x.e.className,left:+x.r.left.toFixed(1),right:+x.r.right.toFixed(1)}));const controls=innerWidth<600?[...document.querySelectorAll('a,button,input,select,textarea,summary')].filter(visible).filter(e=>!e.classList.contains('cc84-skip')).filter(e=>{const r=e.getBoundingClientRect();return r.width<43.5||r.height<43.5}).map(e=>({tag:e.tagName,text:e.textContent.trim().slice(0,18),w:+e.getBoundingClientRect().width.toFixed(1),h:+e.getBoundingClientRect().height.toFixed(1)})):[];return{overflow:document.documentElement.scrollWidth>innerWidth+1,wide,badImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),small:controls,dupes:ids.filter((v,i)=>ids.indexOf(v)!==i),h1:document.querySelectorAll('h1').length,disclosure:document.body.textContent.includes('本站独立运营'),theme:document.documentElement.dataset.cc84Salon}})()`);
      const okay = !result.overflow && !result.wide.length && !result.badImages.length && !result.small.length && !result.dupes.length && result.h1 === 1 && result.disclosure && result.theme === theme;
      renders.push({ file, width, theme, ok: okay, ...(okay ? {} : result) });
      if (!okay) console.log('RENDER FAIL', current, JSON.stringify(result));
    }
  }

  for (const [width, theme] of profiles) {
    await go('index.html', width, theme, 820);
    const top = await evaluate("(()=>{const hero=document.querySelector('.cc84-proscenium'),ticket=document.querySelector('.cc84-access-ticket'),r=ticket.getBoundingClientRect();return{hero:!!hero,rooms:document.querySelectorAll('.cc84-program article').length,overflow:document.documentElement.scrollWidth>innerWidth+1,ticket:r.top>=0&&r.bottom<=innerHeight,code:ticket.querySelector('[data-cc84-copy-source]').textContent,enabled:!ticket.querySelector('button').disabled,benefit:ticket.textContent.includes('适用利益点'),footnote:ticket.textContent.includes('条件、比例与有效期')}})()");
    test(`home column stage ${width} ${theme}`, top.hero && top.rooms === 4 && !top.overflow && top.ticket && top.code === 'SALON840905' && top.enabled && top.benefit && top.footnote, top);
    await shot(`home-${width}-${theme}`);
  }
  await go('index.html', 390);
  await click('[data-cc84-copy-code]');
  test('home pass clipboard', await evaluate('navigator.clipboard.readText()') === 'SALON840905');
  await click('[data-cc84-salon-toggle]');
  test('theme toggles and color scheme', await evaluate("document.documentElement.dataset.cc84Salon==='morning'&&getComputedStyle(document.documentElement).colorScheme==='light'"));
  await click('.cc84-menu');
  test('menu opens and focuses first link', await evaluate("document.body.dataset.cc84Menu==='open'&&document.activeElement===document.querySelector('#cc84-nav a')"));
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape' });
  test('escape closes and returns focus', await evaluate("document.body.dataset.cc84Menu==='closed'&&document.activeElement===document.querySelector('.cc84-menu')"));

  await go(manifest.articleIndex, 390);
  await click('[data-cc84-filter="2"]');
  test('register filters to three', await evaluate("document.querySelectorAll('[data-cc84-room]:not([hidden])').length===3&&document.querySelector('[data-cc84-filter-status]').textContent.includes('3')"));
  await click('[data-cc84-filter="all"]');
  test('register restores all', await evaluate("document.querySelectorAll('[data-cc84-room]:not([hidden])').length===12"));
  await shot('register-mobile');
  await go(manifest.articleIndex, 1440, 'morning');
  await shot('register-desktop');

  const components = ['.cc84-audience-box', '.cc84-question-arch', '.cc84-evidence-colonnade', '.cc84-entry-vault', '.cc84-proportion-orders', '.cc84-cue-runner', '.cc84-cadence-bill', '.cc84-revision-bell', '.cc84-review-balcony', '.cc84-handoff-key', '.cc84-release-score', '.cc84-access-pass'];
  for (let index = 0; index < 12; index += 1) {
    await go(manifest.articles[index], index % 2 ? 390 : 1440, index % 3 ? 'evening' : 'morning');
    test(`article component ${index + 1}`, await evaluate(`document.querySelector(${JSON.stringify(components[index])})!==null`));
    await shot(`module-${String(index + 1).padStart(2, '0')}`, components[index]);
  }
  for (let index = 0; index < 3; index += 1) {
    await go(manifest.articles[index], 390, index === 1 ? 'morning' : 'evening');
    await shot(`opening-${index + 1}-mobile`, '.cc84-feature');
  }
  await go(manifest.articles[0], 390);
  test('article anchors resolve', await evaluate("[...document.querySelectorAll('.cc84-usher nav a')].length===4&&[...document.querySelectorAll('.cc84-usher nav a')].every(a=>document.querySelector(a.hash))"));
  test('article FAQ native', await evaluate("document.querySelectorAll('.cc84-faq details').length===2"));
  await click('.cc84-faq details:first-of-type>summary');
  test('FAQ opens', await evaluate("document.querySelector('.cc84-faq details:first-of-type').open"));
  const start = await evaluate("parseFloat(getComputedStyle(document.querySelector('[data-cc84-progress]')).getPropertyValue('--cc84-read'))");
  await evaluate("window.scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'});new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))");
  const end = await evaluate("parseFloat(getComputedStyle(document.querySelector('[data-cc84-progress]')).getPropertyValue('--cc84-read'))");
  test('reading progress reaches 100', start < 5 && end > 99.5, { start, end });
  await go(manifest.categories[2].path, 390);
  await shot('room-mobile');
  await go(manifest.categories[0].path, 1440, 'morning');
  await shot('room-desktop');
  await go(manifest.toolIndex, 1440);
  await shot('atelier-register');
  await go(manifest.legal.about, 390, 'morning');
  await shot('public-mobile');
  for (let index = 0; index < 5; index += 1) {
    await go(manifest.tools[index], 1440, index % 2 ? 'morning' : 'evening');
    await shot(`tool-${index + 1}-desktop`);
    await go(manifest.tools[index], 390, index % 2 ? 'evening' : 'morning');
    await shot(`tool-${index + 1}-mobile`);
  }

  let output;
  await go(manifest.tools[0], 390);
  await setValue('DESK | 1440 | 12 | 24 | 72\nMOBILE | 390 | 4 | 12 | 20');
  await submit();
  output = await reportText();
  test('columns exact arithmetic', output.includes('DESK｜可用 1032 px｜12 栏｜单栏 86.000 px') && output.includes('MOBILE｜可用 314 px｜4 栏｜单栏 78.500 px'), output);
  await setValue(Array.from({ length: 300 }, (_entry, index) => `C${index} | 1000 | 10 | 10 | 5`).join('\n'));
  await submit();
  test('columns all 300 complete', await evaluate("document.querySelector('[data-cc84-count]').textContent==='300 ROWS'"));
  await setValue('BAD | 320 | 12 | 100 | 100');
  await submit();
  test('columns nonpositive usable rejected', await invalid());
  for (let seed = 1; seed <= 6; seed += 1) {
    const total = 500 + seed * 100;
    const columns = seed;
    const gutter = seed * 2;
    const margin = seed * 3;
    const usable = total - (columns - 1) * gutter - margin * 2;
    await setValue(`C${seed} | ${total} | ${columns} | ${gutter} | ${margin}`);
    await submit();
    output = await reportText();
    test(`columns oracle ${seed}`, output.includes(`可用 ${usable} px｜${columns} 栏｜单栏 ${(usable / columns).toFixed(3)} px`), output);
  }

  await go(manifest.tools[1], 390);
  await setValue('HERO | 1200 | 2,5,3 | 24\nREST | 10 | 1,1,1 | 0');
  await submit();
  output = await reportText();
  test('weights exact largest remainder', output.includes('HERO｜可分配 1152 px｜权重总和 10｜栏宽 230,576,346｜校验 1152 px') && output.includes('REST｜可分配 10 px｜权重总和 3｜栏宽 4,3,3'), output);
  await setValue(Array.from({ length: 300 }, (_entry, index) => `W${index} | 100 | 1,2,3 | 2`).join('\n'));
  await submit();
  test('weights all 300 complete', await evaluate("document.querySelector('[data-cc84-count]').textContent==='300 ROWS'"));
  await setValue('BAD | 10 | 1,2 | 10');
  await submit();
  test('weights gap rejected', await invalid());
  for (let seed = 1; seed <= 6; seed += 1) {
    const total = 100 + seed;
    const weights = [seed, seed + 1, seed + 2];
    const gap = seed;
    const expected = weightedOracle(total, weights, gap);
    await setValue(`W${seed} | ${total} | ${weights.join(',')} | ${gap}`);
    await submit();
    output = await reportText();
    test(`weights oracle ${seed}`, output.includes(`栏宽 ${expected.join(',')}`), output);
  }

  await go(manifest.tools[2], 390);
  await setValue('OPEN | ROOT\nBODY | OPEN\nLOOP | LOOP\nLOST | ABSENT');
  await submit();
  output = await reportText();
  test('cues find self and missing', output.includes('问题：2') && output.includes('LOOP 自指') && output.includes('LOST 缺少前置 ABSENT'), output);
  await setValue(['N0 | ROOT', ...Array.from({ length: 299 }, (_entry, index) => `N${index + 1} | N${index}`)].join('\n'));
  await submit();
  test('cues all 300 complete', await evaluate("document.querySelector('[data-cc84-count]').textContent==='300 ROWS'"));
  await setValue('A | ROOT\na | ROOT');
  await submit();
  test('cues normalized duplicate rejected', await invalid());
  for (let seed = 1; seed <= 6; seed += 1) {
    await setValue(`A${seed} | ROOT\nB${seed} | A${seed}\nC${seed} | B${seed}`);
    await submit();
    output = await reportText();
    test(`cues oracle ${seed}`, output.includes('问题：0') && output.includes(`稳定顺序：A${seed} → B${seed} → C${seed}`), output);
  }

  await go(manifest.tools[3], 390);
  await setValue('Q | 2026-01-01 | 90 | 2026-04-15\nLEAP | 2024-02-29 | 365 | 2025-02-28');
  await submit();
  output = await reportText();
  test('cadence UTC calendar', output.includes('Q｜下一复核 2026-06-30｜76 天后｜周期 2') && output.includes('LEAP｜下一复核 2025-02-28｜今日到期｜周期 1'), output);
  await setValue(Array.from({ length: 300 }, (_entry, index) => `D${index} | 2026-01-01 | 30 | 2026-01-15`).join('\n'));
  await submit();
  test('cadence all 300 complete', await evaluate("document.querySelector('[data-cc84-count]').textContent==='300 ROWS'"));
  await setValue('BAD | 2025-02-29 | 30 | 2025-03-01');
  await submit();
  test('cadence invalid date rejected', await invalid());
  for (let seed = 1; seed <= 6; seed += 1) {
    const interval = seed * 10;
    const observedDay = String(seed + 1).padStart(2, '0');
    await setValue(`D${seed} | 2026-01-01 | ${interval} | 2026-01-${observedDay}`);
    await submit();
    output = await reportText();
    const due = new Date(Date.UTC(2026, 0, 1) + interval * 86400000).toISOString().slice(0, 10);
    test(`cadence oracle ${seed}`, output.includes(`下一复核 ${due}`), output);
  }

  await go(manifest.tools[4], 390);
  await setValue('A | source,date,scope | source,date,scope\nB | source | source,date');
  await submit();
  output = await reportText();
  test('coverage exact missing set', output.includes('完整：1') && output.includes('A｜已有 3｜必需 3｜缺口 无') && output.includes('B｜已有 1｜必需 2｜缺口 date'), output);
  await setValue(Array.from({ length: 300 }, (_entry, index) => `V${index} | a,b | a,b,c`).join('\n'));
  await submit();
  test('coverage all 300 complete', await evaluate("document.querySelector('[data-cc84-count]').textContent==='300 ROWS'"));
  await setValue('BAD | source,SOURCE | source');
  await submit();
  test('coverage normalized duplicate rejected', await invalid());
  for (let seed = 1; seed <= 6; seed += 1) {
    const have = Array.from({ length: seed }, (_entry, index) => `t${index}`);
    const required = [...have, 'missing'];
    await setValue(`V${seed} | ${have.join(',')} | ${required.join(',')}`);
    await submit();
    output = await reportText();
    test(`coverage oracle ${seed}`, output.includes(`已有 ${seed}｜必需 ${seed + 1}｜缺口 missing`), output);
  }

  const normalized = [
    ['桌面 ｜ １４４０ ｜ １２ ｜ ２４ ｜ ７２', '可用 1032 px'],
    ['头版 ｜ １２００ ｜ ２，５，３ ｜ ２４', '栏宽 230,576,346'],
    ['开场 ｜ ＲＯＯＴ\n证据 ｜ 开场', '问题：0'],
    ['季度 ｜ ２０２６－０１－０１ ｜ ９０ ｜ ２０２６－０４－１５', '下一复核 2026-06-30'],
    ['陈述 ｜ ＳＯＵＲＣＥ，ＤＡＴＥ ｜ source,date', '缺口 无']
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
    await setValue(Array.from({ length: 301 }, () => 'X').join('\n'));
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
  }
  for (let index = 0; index < 5; index += 1) {
    await go(manifest.tools[index], 390);
    await setValue('');
    await submit();
    test(`empty input invalid ${index}`, await invalid());
    await shot(`invalid-tool-${index + 1}`);
    await click('button[type="reset"]');
    test(`tool reset ${index}`, await evaluate("document.querySelector('[data-cc84-report]').hidden&&document.querySelector('[data-cc84-result-copy]').disabled&&!document.querySelector('[data-cc84-error]').textContent"));
    test(`guide default closed ${index}`, await evaluate("!document.querySelector('.cc84-instrument-guide').open&&document.querySelectorAll('.cc84-instrument-guide h3').length===5"));
    await click('.cc84-instrument-guide>summary');
    test(`guide opens ${index}`, await evaluate("document.querySelector('.cc84-instrument-guide').open"));
  }
  const valid = ['A | 1000 | 10 | 10 | 5', 'A | 100 | 1,2,3 | 2', 'A | ROOT\nB | A', 'A | 2026-01-01 | 30 | 2026-01-15', 'A | source,date | source,date'];
  for (let index = 0; index < 5; index += 1) {
    await go(manifest.tools[index], 390);
    await setValue(valid[index]);
    await submit();
    const expected = await reportText();
    await click('[data-cc84-result-copy]');
    test(`complete report clipboard ${index}`, await evaluate('navigator.clipboard.readText()') === expected);
  }
  await go(manifest.tools[0], 390);
  await setValue(valid[0]);
  await submit();
  await evaluate("navigator.clipboard.writeText=()=>new Promise(resolve=>window.cc84FinishCopy=resolve)");
  await click('[data-cc84-result-copy]');
  await setValue('invalid');
  await evaluate('window.cc84FinishCopy()');
  await delay(30);
  test('copy race stays invalidated', await evaluate("!document.querySelector('[data-cc84-copy-status]').textContent&&document.querySelector('[data-cc84-result-copy]').disabled"));

  await go(manifest.registrationGuide, 390);
  const promotion = 'a[href="https://example.org/verified-destination"]';
  test('one promotion link', await evaluate(`document.querySelectorAll(${JSON.stringify(promotion)}).length===1`));
  test('promotion disclosure and attributes', await evaluate(`(()=>{const link=document.querySelector(${JSON.stringify(promotion)});return link&&link.target==='_blank'&&['sponsored','nofollow','noopener','noreferrer'].every(value=>link.relList.contains(value))&&link.closest('.cc84-access-pass').textContent.includes('推广链接披露')})()`));

  await go('404.html', 390);
  await shot('404-mobile');
  await evaluate("document.querySelector('#cc84-query').value='';document.querySelector('[data-cc84-search]').requestSubmit()");
  test('404 empty query focuses input', await evaluate("document.activeElement===document.querySelector('#cc84-query')&&document.querySelector('[data-cc84-search-result]').textContent.includes('请输入')"));
  await evaluate("document.querySelector('#cc84-query').value='字'.repeat(81);document.querySelector('[data-cc84-search]').requestSubmit()");
  test('404 81 code points rejected', await evaluate("document.activeElement===document.querySelector('#cc84-query')&&document.querySelector('[data-cc84-search-result]').textContent.includes('不能超过')"));
  await evaluate("document.querySelector('#cc84-query').value='栏宽';document.querySelector('[data-cc84-search]').requestSubmit()");
  test('404 local search', await evaluate("document.querySelectorAll('[data-cc84-search-result] a').length===1&&document.querySelector('[data-cc84-search-result]').textContent.includes('五台本地工具')"));
  await evaluate("document.querySelector('#cc84-query').value='<img src=x onerror=alert(1)>';document.querySelector('[data-cc84-search]').requestSubmit()");
  test('404 no-result safe', await evaluate("!document.querySelector('[data-cc84-search-result] img')&&document.querySelector('[data-cc84-search-result]').textContent.includes('没有完全匹配')"));

  const contrast = "function ch(c){if(c==='transparent')return[0,0,0,0];if(c.startsWith('color(srgb ')){const raw=c.slice(11,-1).split('/'),n=raw[0].trim().split(/\\s+/).map(Number);return[255*n[0],255*n[1],255*n[2],raw[1]?Number(raw[1]):1]}const n=c.match(/[\\d.]+/g).map(Number);return[n[0],n[1],n[2],n.length===4?n[3]:1]}function lum(v){const a=v.slice(0,3).map(n=>n/255).map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4);return.2126*a[0]+.7152*a[1]+.0722*a[2]}function bg(e){if(!e)return[255,255,255,1];const c=ch(getComputedStyle(e).backgroundColor),p=c[3]<1?bg(e.parentElement):[0,0,0,1];return[c[0]*c[3]+p[0]*(1-c[3]),c[1]*c[3]+p[1]*(1-c[3]),c[2]*c[3]+p[2]*(1-c[3]),1]}function ratio(s){const e=document.querySelector(s),b=bg(e),c=ch(getComputedStyle(e).color),f=[c[0]*c[3]+b[0]*(1-c[3]),c[1]*c[3]+b[1]*(1-c[3]),c[2]*c[3]+b[2]*(1-c[3])],x=lum(f),y=lum(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05)}";
  for (const theme of ['evening', 'morning']) {
    await go('index.html', 1440, theme);
    let ratios = await evaluate(`(()=>{${contrast};return['.cc84-home-deck','.cc84-access-ticket small','.cc84-program article:first-child p'].map(ratio)})()`);
    test(`home contrast ${theme}`, ratios.every((value) => value >= 4.5), ratios);
    await go(manifest.articles[0], 390, theme);
    ratios = await evaluate(`(()=>{${contrast};return['.cc84-feature>header>span','.cc84-feature>section p','.cc84-program-cover figcaption'].map(ratio)})()`);
    test(`article contrast ${theme}`, ratios.every((value) => value >= 4.5), ratios);
    await go(manifest.tools[0], 390, theme);
    await setValue(valid[0]);
    await submit();
    ratios = await evaluate(`(()=>{${contrast};return['#cc84-format','[data-cc84-output]','.cc84-instrument-guide p'].map(ratio)})()`);
    test(`tool contrast ${theme}`, ratios.every((value) => value >= 4.5), ratios);
    await go(manifest.legal.about, 390, theme);
    ratios = await evaluate(`(()=>{${contrast};return['.cc84-public>header p','.cc84-public-ledger>aside p','.cc84-public-ledger section p'].map(ratio)})()`);
    test(`public contrast ${theme}`, ratios.every((value) => value >= 4.5), ratios);
  }

  await send('Emulation.setScriptExecutionDisabled', { value: true });
  for (const width of [1440, 768, 390, 360]) {
    current = `nojs-${width}`;
    await send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 600 });
    await send('Page.navigate', { url: `http://127.0.0.1:${port}/index.html` });
    await ready();
    test(`noJS home nav ${width}`, await evaluate("getComputedStyle(document.querySelector('#cc84-nav')).display!=='none'&&[...document.querySelectorAll('#cc84-nav a')].every(a=>a.getBoundingClientRect().width>0)"));
    test(`noJS copy disabled ${width}`, await evaluate("document.querySelector('[data-cc84-copy-code]').disabled"));
    await send('Page.navigate', { url: `http://127.0.0.1:${port}/${manifest.tools[0]}` });
    await ready();
    test(`noJS tool disabled ${width}`, await evaluate("document.querySelector('button[type=submit]').disabled&&document.querySelector('.cc84-instrument-guide')!==null"));
    await send('Page.navigate', { url: `http://127.0.0.1:${port}/${manifest.articles[0]}` });
    await ready();
    test(`noJS article structure ${width}`, await evaluate("document.querySelectorAll('.cc84-usher nav a').length===4&&document.querySelectorAll('.cc84-faq details').length===2"));
  }
  await send('Emulation.setScriptExecutionDisabled', { value: false });
  await go('index.html', 390, 'evening', 820);
  await evaluate("document.querySelector('.cc84-arch h1').textContent='字'.repeat(24);document.querySelector('.cc84-home-deck').textContent='排'.repeat(100);document.querySelector('[data-cc84-copy-source]').textContent='K'.repeat(28);document.querySelector('.cc84-access-ticket small').textContent='条'.repeat(45)");
  const stress = await evaluate("document.documentElement.scrollWidth<=innerWidth+1&&Array.from(document.querySelector('.cc84-arch h1').textContent).length===24&&Array.from(document.querySelector('.cc84-home-deck').textContent).length===100&&document.querySelector('[data-cc84-copy-source]').textContent.length===28");
  test('home boundary copy fits without overflow', stress);
  await shot('home-stress');

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
  fs.writeFileSync(path.join(qa, 'report.json'), JSON.stringify(result, null, 2));
  console.log(JSON.stringify({ qa, ...result.counts, screenshots: fs.readdirSync(qa).filter((file) => file.endsWith('.png')).length }));
  if (result.counts.renderFailures + result.counts.failures + result.counts.errors) process.exitCode = 1;
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}).finally(() => {
  try {
    if (ws) ws.close();
  } catch (_error) {
    ws = null;
  }
  try {
    server.close();
  } catch (_error) {
    port = 0;
  }
  try {
    if (browser) browser.kill('SIGKILL');
  } catch (_error) {
    browser = null;
  }
  setTimeout(() => process.exit(process.exitCode || 0), 250);
});
