'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');
const http = require('http');
const { spawn } = require('child_process');

const root = path.resolve('templates/079-navy-nightwatch');
const qa = fs.mkdtempSync(path.join(os.tmpdir(), 'nw79-qa-'));
const contract = fs.readFileSync(path.join(root, 'TEMPLATE.md'), 'utf8');
const manifest = JSON.parse(contract.match(/```json workflow-ready-v2\s*([\s\S]*?)```/)[1]);
const files = [...new Set([
  manifest.home,
  manifest.articleIndex,
  ...manifest.articles,
  ...manifest.categories.map((item) => item.path),
  manifest.toolIndex,
  ...manifest.tools,
  ...Object.values(manifest.legal),
  manifest.error404,
  'article.html',
  'tool.html',
  'legal.html',
])];
const titles = [
  '捕获脉冲后保留原始时间线',
  '用方位卡辨认信号的来路',
  '值守时钟如何约束复核节奏',
  '状态灯板让交接一眼可读',
  '版本差分屏保留每次变化',
  '阈值阶梯明确升级条件',
  '来源接收链逐段确认来路',
  '中断窗口地图标出沉默时段',
  '验证星图连接多方观察',
  '事件带按原序登记每个节点',
  '更正航灯把更新连回原记录',
  '交接控制台封存状态与披露',
];

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
  const match = token.match(/^D(\d+)_(.*)$/);
  const article = match ? Number(match[1]) - 1 : -1;
  const key = match ? match[2] : token;
  if (token === 'LANG') return 'zh-Hans';
  if (token === 'SITE_DOMAIN') return `127.0.0.1:${port}`;
  if (token === 'SITE_NAME') return '北纬夜航观测站';
  if (token === 'BRAND_EN') return 'NORTH / WATCH';
  if (token === 'CURRENT_YEAR') return '2026';
  if (token === 'SEO_TITLE') return '在每次捕获、复核与交接之间保留清晰航迹';
  if (token === 'SITE_DESC') return '以四个值守扇区、十二份夜航记录和五件本地工具组织可复核的静态内容框架。';
  if (token === 'SITE_TAGLINE') return '沿时间、信号、版本与交接路径维护内容。';
  if (token === 'HERO_TITLE') return '让每条信号都在夜色里留下可复核航迹。';
  if (token === 'HERO_DESCRIPTION') return '事件簿、文章组件、公开说明与本地工具均已搭好，后续编辑只需填入经核实的文字和变量，不必重做网站界面。';
  if (token === 'RADAR_ALT') return '抽象夜航雷达、扫描扇区与信号点';
  if (token === 'RADAR_RANGE') return '480 NM / ABSTRACT';
  if (token === 'RADAR_BEARING') return '032° / VERIFY';
  if (token === 'WATCH_SHIFT') return 'UTC 00—08';
  if (token === 'WATCH_STATE') return 'FRAME READY';
  if (token === 'WATCH_STANDARD') return 'CAPTURE / VERIFY / HANDOFF';
  if (token === 'INVITE_LABEL') return '经核实后填写的邀请码';
  if (token === 'INVITE_CODE') return 'NW790905';
  if (token === 'BENEFIT_RATE') return '适用利益点';
  if (token === 'BENEFIT_DISCLAIMER') return '条件、比例与有效期以经核实的正式说明为准。';
  if (token === 'AFFILIATE_URL') return 'https://example.org/verified-destination';
  if (token === 'AUTHOR_NAME') return '示例编辑';
  if (token === 'CONTACT_EMAIL' || token === 'SECURITY_EMAIL') return 'watch@example.com';
  if (token === 'SECURITY_EXPIRES') return '2027-09-05T00:00:00Z';
  if (token === 'SITEMAP_LASTMOD') return '2026-09-05';
  if (/RSS_DATE$/.test(token)) return 'Sat, 05 Sep 2026 00:00:00 GMT';
  if (/PUBLISHED|MODIFIED|_DATE_/.test(token)) return '2026-09-05';
  if (/_URL/.test(token)) return `https://example.org/source/${token.toLowerCase()}`;
  if (article >= 0 && key === 'TITLE') return titles[article];
  if (article >= 0 && key === 'SUMMARY') return '沿原始信号登记来源、观察时间、适用范围、例外和仍未确认部分，为下一班保留可追溯的夜航记录。';
  if (/FAQ_Q/.test(key)) return '这份夜航记录还需要复核什么？';
  if (/FAQ_A/.test(key)) return '继续复核直接来源、观察时间、适用范围、例外情况和仍未确认的部分。';
  if (/BODY_/.test(key)) return '此处填写经核实的正文，说明信号来处、适用前提、例外情况与仍需复查的信息，不把抽象雷达示意当作事实证据。';
  if (/H2_|TITLE/.test(key)) return '沿航标核对信号与时间';
  if (/TEXT|INTRO|NOTE|SUMMARY|CONCLUSION|DISCLAIMER|CAPTION|LIMIT|RISK|DESC|ALT/.test(key)) return '此处填写经核实的文字，交代来源、观察时间、适用条件与尚未确认的部分。';
  if (/RATE|VALUE|PERCENT/.test(key)) return '待核实数值';
  if (/LABEL|EYEBROW|READING|STATE|TERM|MARK|CHECK|MODULE/.test(key)) return '信号与航迹';
  return '此处填写经核实的文字';
}

function render(raw) {
  return raw
    .replace(/%%([A-Z0-9_]+)%%/g, (_, token) => fixture(token))
    .replaceAll(`https://127.0.0.1:${port}`, `http://127.0.0.1:${port}`);
}

const server = http.createServer((request, response) => {
  const route = decodeURIComponent(new URL(request.url, 'http://localhost').pathname).replace(/^\/+|\/+$/g, '') || 'index.html';
  const target = path.resolve(root, route);
  if (!target.startsWith(`${root}${path.sep}`) || !fs.existsSync(target) || !fs.statSync(target).isFile()) {
    response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
    response.end(render(fs.readFileSync(path.join(root, '404.html'), 'utf8')));
    return;
  }
  const extension = path.extname(target).toLowerCase();
  const types = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon',
    '.xml': 'application/xml; charset=utf-8',
    '.txt': 'text/plain; charset=utf-8',
  };
  response.writeHead(200, { 'Content-Type': types[extension] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  const body = fs.readFileSync(target);
  response.end(/\.(?:html|xml|txt|svg)$/.test(extension) ? render(body.toString()) : body);
});

function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const call = ++id;
    pending.set(call, { resolve, reject });
    ws.send(JSON.stringify({ id: call, method, params }));
  });
}

async function js(expression) {
  const value = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true, userGesture: true });
  if (value.exceptionDetails) throw new Error(value.exceptionDetails.exception?.description || value.exceptionDetails.text);
  return value.result.value;
}

function test(name, ok, detail = '') {
  checks.push({ name, ok: Boolean(ok), ...(ok ? {} : { detail }) });
  if (!ok) console.log('CHECK FAIL', name, typeof detail === 'string' ? detail : JSON.stringify(detail));
}

async function ready() {
  for (let attempt = 0; attempt < 240; attempt += 1) {
    if (await js("document.readyState==='complete'&&[...document.images].every((image)=>image.complete)")) return;
    await delay(25);
  }
  throw new Error(`page readiness timeout ${current}`);
}

async function go(file, width = 1440, theme = 'day', height = 900) {
  current = `${file}@${width}-${theme}`;
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 600 });
  await send('Page.navigate', { url: `http://127.0.0.1:${port}/${file}` });
  await ready();
  await js(`localStorage.setItem('nw79-mode',${JSON.stringify(theme)});location.reload()`);
  await ready();
  for (let attempt = 0; attempt < 120; attempt += 1) {
    if (await js(`document.documentElement.dataset.nw79Mode===${JSON.stringify(theme)}`)) return;
    await delay(25);
  }
  throw new Error(`theme readiness timeout ${current}`);
}

async function shot(name, selector = null) {
  if (selector) {
    await js(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:'start',inline:'nearest',behavior:'instant'});window.scrollTo({left:0,top:Math.max(0,window.scrollY-70),behavior:'instant'})`);
  } else {
    await js("window.scrollTo({left:0,top:0,behavior:'instant'})");
  }
  await js('new Promise((resolve)=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))');
  const capture = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  fs.writeFileSync(path.join(qa, `${name}.png`), Buffer.from(capture.data, 'base64'));
}

async function click(selector) {
  await js(`document.querySelector(${JSON.stringify(selector)}).click()`);
  await delay(60);
}

async function fill(name, value) {
  const selector = `[name="${name}"]`;
  await js(`(()=>{const field=document.querySelector(${JSON.stringify(selector)});field.focus();field.select()})()`);
  await send('Input.insertText', { text: value });
  await delay(25);
}

async function setValue(name, expression) {
  const selector = `[name="${name}"]`;
  await js(`(()=>{const field=document.querySelector(${JSON.stringify(selector)});field.value=${expression};field.dispatchEvent(new Event('input',{bubbles:true}))})()`);
}

async function setSelect(name, value) {
  const selector = `[name="${name}"]`;
  await js(`(()=>{const field=document.querySelector(${JSON.stringify(selector)});field.value=${JSON.stringify(String(value))};field.dispatchEvent(new Event('input',{bubbles:true}));field.dispatchEvent(new Event('change',{bubbles:true}))})()`);
}

async function submit() { await click('button[type="submit"]'); }
async function report() { return js("document.querySelector('[data-tool-output]').textContent"); }
async function invalid(field) {
  return js(`(()=>{const field=document.querySelector('[name=${field}]');return field.getAttribute('aria-invalid')==='true'&&field.getAttribute('aria-errormessage')&&document.activeElement===field&&document.querySelector('[data-copy-tool]').disabled})()`);
}

function dateFromDay(offset) {
  return new Date(Date.UTC(2026, 0, 1 + offset)).toISOString().slice(0, 10);
}

function fixedRatio(numerator, denominator) {
  let whole = (numerator * 10000n) / denominator;
  const remainder = (numerator * 10000n) % denominator;
  if (remainder * 2n >= denominator) whole += 1n;
  const text = whole.toString().padStart(5, '0');
  return `${text.slice(0, -4)}.${text.slice(-4)}`;
}

async function run() {
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  port = server.address().port;
  profile = fs.mkdtempSync(path.join(os.tmpdir(), 'nw79-chrome-'));
  browser = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
    '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank',
  ], { stdio: ['ignore', 'ignore', 'pipe'] });
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
      if (message.error) call.reject(new Error(JSON.stringify(message.error)));
      else call.resolve(message.result);
    } else if (message.method === 'Runtime.exceptionThrown') {
      errors.push({ page: current, error: message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text });
    } else if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') {
      errors.push({ page: current, error: message.params.args.map((item) => item.value).join(' ') });
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
  const profiles = [
    [1440, 'night'], [1440, 'day'], [768, 'night'], [768, 'day'],
    [390, 'night'], [390, 'day'], [360, 'night'], [360, 'day'],
  ];
  for (const [width, theme] of profiles) {
    for (const file of files) {
      await go(file, width, theme);
      const result = await js(`(()=>{const visible=(element)=>{const rect=element.getBoundingClientRect(),style=getComputedStyle(element);return rect.width>0&&rect.height>0&&style.visibility!=='hidden'&&style.display!=='none'};const controls=[...document.querySelectorAll('a,button,input,select,textarea,summary')].filter(visible).filter((element)=>!element.classList.contains('nw79-skip'));const small=controls.filter((element)=>{const rect=element.getBoundingClientRect();return rect.width<43.5||rect.height<43.5}).map((element)=>({tag:element.tagName,text:element.textContent.trim().slice(0,24),width:+element.getBoundingClientRect().width.toFixed(1),height:+element.getBoundingClientRect().height.toFixed(1)}));const ids=[...document.querySelectorAll('[id]')].map((element)=>element.id);const wide=[...document.querySelectorAll('body *')].map((element)=>({element,rect:element.getBoundingClientRect()})).filter((item)=>item.rect.right>innerWidth+1||item.rect.left<-1).slice(0,12).map((item)=>({tag:item.element.tagName,class:item.element.className,right:+item.rect.right.toFixed(1),left:+item.rect.left.toFixed(1),width:+item.rect.width.toFixed(1)}));return{overflow:document.documentElement.scrollWidth>innerWidth+1,scrollWidth:document.documentElement.scrollWidth,wide,badImages:[...document.images].filter((image)=>!image.complete||!image.naturalWidth).map((image)=>image.src),small,dupes:ids.filter((value,index)=>ids.indexOf(value)!==index),h1:document.querySelectorAll('h1').length,disclosure:document.body.textContent.includes('本站独立运营'),theme:document.documentElement.dataset.nw79Mode}})()`);
      const ok = !result.overflow && !result.badImages.length && !result.small.length && !result.dupes.length && result.h1 === 1 && result.disclosure && result.theme === theme;
      renders.push({ file, width, theme, ok, ...(ok ? {} : result) });
      if (!ok) console.log('RENDER FAIL', current, JSON.stringify(result));
    }
  }

  for (const [width, theme] of profiles) {
    await go('index.html', width, theme, 780);
    const first = await js(`(()=>{const card=document.querySelector('.nw79-access-panel'),rect=card.getBoundingClientRect(),button=card.querySelector('button'),buttonRect=button.getBoundingClientRect(),range=document.createRange();range.selectNodeContents(button);const textRect=range.getBoundingClientRect();return{top:rect.top,bottom:rect.bottom,visible:rect.top>=0&&rect.bottom<=innerHeight,overflow:document.documentElement.scrollWidth>innerWidth+1,copy:button.textContent.trim(),textInside:textRect.width>0&&textRect.height>0&&textRect.left>=buttonRect.left-.5&&textRect.right<=buttonRect.right+.5&&textRect.top>=buttonRect.top-.5&&textRect.bottom<=buttonRect.bottom+.5}})()`);
    test(`home first fold ${width} ${theme}`, first.visible && !first.overflow && first.copy === '复制代码' && first.textInside, first);
    await shot(`home-${width}-${theme}`);
  }

  await go('index.html', 390, 'night');
  await click('[data-nw79-copy-home]');
  test('home code clipboard', await js("navigator.clipboard.readText()") === 'NW790905');
  await click('[data-nw79-mode-toggle]');
  test('theme toggles and color scheme', await js("document.documentElement.dataset.nw79Mode==='day'&&getComputedStyle(document.documentElement).colorScheme==='light'"));
  await click('.nw79-menu');
  test('menu opens and focuses', await js("document.querySelector('#nw79-nav').classList.contains('nw79-open')&&document.activeElement===document.querySelector('#nw79-nav a')"));
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape' });
  test('escape closes and returns focus', await js("!document.querySelector('#nw79-nav').classList.contains('nw79-open')&&document.activeElement===document.querySelector('.nw79-menu')"));
  await setSelect('sector', '3');
  await fill('keyword', '控制台');
  test('combined home filter', await js("[...document.querySelectorAll('.nw79-dispatch-grid li:not([hidden])')].length===1&&document.querySelector('.nw79-dispatch-grid li:not([hidden])').dataset.nw79Sector==='3'"));
  await click('.nw79-dispatch-filter button[type="reset"]');
  test('filter resets 12', await js("document.querySelectorAll('.nw79-dispatch-grid li:not([hidden])').length===12"));

  const components = [
    '.nw79-pulse-trace', '.nw79-bearing-card', '.nw79-watch-clock', '.nw79-lamp-board',
    '.nw79-delta-screen', '.nw79-threshold-ladder', '.nw79-receiver-chain', '.nw79-outage-window',
    '.nw79-verification-stars', '.nw79-event-strip', '.nw79-correction-lamp', '.nw79-handoff-console',
  ];
  for (let index = 0; index < 12; index += 1) {
    await go(manifest.articles[index], index % 2 ? 390 : 1440, index % 3 ? 'night' : 'day');
    test(`article component ${index + 1}`, await js(`document.querySelector(${JSON.stringify(components[index])})!==null`));
    await shot(`module-${String(index + 1).padStart(2, '0')}`, components[index]);
  }
  for (const [index, name, selector] of [[0, 'cover', '.nw79-dispatch-copy>.nw79-dispatch-cover'], [1, 'split', '.nw79-split-signal'], [2, 'submerged', '.nw79-submerged-signal']]) {
    await go(manifest.articles[index], 390, index === 1 ? 'night' : 'day');
    await shot(`opening-${name}-mobile`, selector);
  }
  await go(manifest.articles[0], 390);
  test('article native index anchors', await js("[...document.querySelectorAll('.nw79-native-scope a')].length===4&&[...document.querySelectorAll('.nw79-native-scope a')].every((link)=>document.querySelector(link.hash))"));
  test('article FAQ native', await js("document.querySelectorAll('.nw79-faq details').length===2"));
  await click('.nw79-faq details:first-of-type>summary');
  test('FAQ opens', await js("document.querySelector('.nw79-faq details:first-of-type').open"));
  const progressStart = await js("parseFloat(document.querySelector('[data-nw79-progress]').style.height)");
  await js("window.scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'});new Promise((resolve)=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))");
  const progressEnd = await js("parseFloat(document.querySelector('[data-nw79-progress]').style.height)");
  test('article reading progress reaches 100', progressStart < 5 && progressEnd > 99.5, { progressStart, progressEnd });

  await go('observation-log.html', 390); await shot('log-mobile');
  await go('observation-log.html', 1440, 'day'); await shot('log-desktop');
  await go(manifest.categories[2].path, 390); await shot('sector-mobile');
  await go(manifest.toolIndex, 1440, 'day'); await shot('console-desktop');
  await go(manifest.legal.about, 390); await shot('public-mobile');
  await go(manifest.legal.contact, 1440, 'night'); await shot('contact-desktop');
  for (let index = 0; index < 5; index += 1) {
    await go(manifest.tools[index], 1440, index % 2 ? 'day' : 'night'); await shot(`tool-${index + 1}-desktop`);
    await go(manifest.tools[index], 390, index % 2 ? 'night' : 'day'); await shot(`tool-${index + 1}-mobile`);
  }

  const primaries = ['events', 'signals', 'windows', 'versions', 'alerts'];
  let output;
  const utc = (minute) => new Date(Date.UTC(2026, 0, 1, 0, minute)).toISOString().slice(0, 16).replace('T', ' ');

  await go(manifest.tools[0], 390);
  await fill('events', '2026-01-01 00:00 | OPEN\n2026-01-01 00:45 | CAPTURE\n2026-01-01 00:45 | REVIEW\n2026-01-01 00:10 | RETURN'); await setSelect('threshold', '30'); await submit(); output = await report();
  test('UTC exact anomaly counts', output.includes('记录：4｜异常：3｜阈值：30 分钟') && output.includes('断档') && output.includes('重复') && output.includes('倒序'), output);
  await fill('events', '2026-01-01 00:00 | OPEN\n2026-01-01 00:30 | CLOSE'); await submit(); output = await report();
  test('UTC strict threshold equality', output.includes('异常：0'));
  await fill('events', Array.from({ length: 300 }, (_, index) => `${utc(index)} | E-${index}`).join('\n')); await submit(); output = await report();
  test('UTC all 300 complete', output.includes('记录：300｜异常：0') && output.includes('300｜2026-01-01 04:59Z｜E-299'));
  await fill('events', '2025-02-29 00:00 | BAD'); await submit(); test('UTC false date rejected', await invalid('events'));
  await fill('events', '2026-01-01 00:00 | lower'); await submit(); test('UTC lowercase marker rejected', await invalid('events'));
  for (let seed = 1; seed <= 8; seed += 1) {
    const times = [0, seed + 5, seed + 40, seed + 40];
    const expected = (times[1] > 30 ? 1 : 0) + (times[2] - times[1] > 30 ? 1 : 0) + 1;
    await fill('events', times.map((minute, index) => `${utc(minute)} | S${seed}-${index}`).join('\n')); await setSelect('threshold', '30'); await submit(); output = await report();
    test(`UTC oracle ${seed}`, output.includes(`记录：4｜异常：${expected}｜阈值：30 分钟`), output.slice(0, 280));
  }

  await go(manifest.tools[1], 390);
  await fill('signals', 'ALPHA | lee,mina\nBETA | lee\nGAMMA | mina,omar,rae'); await setSelect('quorum', '2'); await submit(); output = await report();
  test('quorum exact result', output.includes('信号：3｜达到门槛：2｜不足：1｜门槛：2 人') && output.includes('BETA｜lee｜不足 1 人'), output);
  await fill('signals', Array.from({ length: 300 }, (_, index) => `SIG-${index} | lee,mina`).join('\n')); await submit(); output = await report();
  test('quorum all 300 complete', output.includes('信号：300｜达到门槛：300') && output.includes('300｜SIG-299｜lee, mina｜合格'));
  await fill('signals', 'ALPHA | lee\nalpha | mina'); await submit(); test('quorum malformed duplicate token rejected', await invalid('signals'));
  await fill('signals', 'ALPHA | lee,lee'); await submit(); test('quorum duplicate observer rejected', await invalid('signals'));
  for (let seed = 1; seed <= 8; seed += 1) {
    const rows = Array.from({ length: 5 }, (_, index) => `Q${seed}-${index} | ${['lee','lee,mina','lee,mina,omar','lee','lee,rae'][index]}`);
    const quorum = 2 + seed % 3;
    const qualified = rows.filter((row) => row.split(',').length >= quorum).length;
    await fill('signals', rows.join('\n')); await setSelect('quorum', String(quorum)); await submit(); output = await report();
    test(`quorum oracle ${seed}`, output.includes(`信号：5｜达到门槛：${qualified}｜不足：${5 - qualified}｜门槛：${quorum} 人`), output.slice(0, 260));
  }

  await go(manifest.tools[2], 390);
  await fill('windows', 'cyan | 01:00-02:00\ncyan | 01:30-03:00\ncyan | 03:00-04:00\namber | 23:30-01:00'); await submit(); output = await report();
  test('window merge overlap adjacency and midnight', output.includes('原始窗口：4｜频道：2｜合并后：2') && output.includes('01:00 → 04:00｜180 分钟') && output.includes('23:30 → +1d 01:00｜90 分钟'), output);
  await fill('windows', Array.from({ length: 200 }, () => 'cyan | 01:00-02:00').join('\n')); await submit(); output = await report();
  test('window all 200 complete', output.includes('原始窗口：200｜频道：1｜合并后：1') && output.split('\n').filter((line) => line.includes('cyan｜01:00-02:00')).length === 200);
  await fill('windows', 'cyan | 01:00-01:00'); await submit(); test('window zero rejected', await invalid('windows'));
  await fill('windows', 'cyan | 25:00-01:00'); await submit(); test('window invalid clock rejected', await invalid('windows'));
  for (let seed = 1; seed <= 8; seed += 1) {
    const finish = 4 + seed % 3;
    await fill('windows', `c${seed} | 01:00-02:00\nc${seed} | 01:30-03:00\nc${seed} | 03:00-0${finish}:00`); await submit(); output = await report();
    test(`window oracle ${seed}`, output.includes(`01:00 → 0${finish}:00｜${finish * 60 - 60} 分钟`), output.slice(0, 260));
  }

  await go(manifest.tools[3], 390);
  await fill('versions', 'source-a | 1.0.0\nsource-a | 1.2.0\nsource-a | 1.2.0\nsource-a | 1.1.9\nsource-b | 2.0.0'); await submit(); output = await report();
  test('version classifications exact', output.includes('记录：5｜来源：2｜回退：1｜不变：1｜跨级：1') && output.includes('1.2.0｜次版本推进 / 跨级') && output.includes('1.1.9｜回退'), output);
  await fill('versions', Array.from({ length: 300 }, (_, index) => `source-a | 1.0.${index}`).join('\n')); await submit(); output = await report();
  test('version all 300 complete', output.includes('记录：300｜来源：1｜回退：0') && output.includes('300｜source-a｜1.0.299｜修订版推进'));
  await fill('versions', 'source-a | 01.0.0'); await submit(); test('version leading zero rejected', await invalid('versions'));
  await fill('versions', 'Source | 1.0.0'); await submit(); test('version source case rejected', await invalid('versions'));
  for (let seed = 1; seed <= 8; seed += 1) {
    await fill('versions', `src-${seed} | 1.0.0\nsrc-${seed} | 1.0.${seed + 1}\nsrc-${seed} | 0.9.9`); await submit(); output = await report();
    test(`version oracle ${seed}`, output.includes('记录：3｜来源：1｜回退：1｜不变：0｜跨级：1') && output.includes('回退'), output.slice(0, 260));
  }

  await go(manifest.tools[4], 390);
  await fill('alerts', 'A-1 | P1 | 2026-01-01 00:00 | 2026-01-01 00:12\nB-2 | P2 | 2026-01-01 01:00 | 2026-01-01 02:05\nC-3 | P3 | 2026-01-01 00:00 | 2026-01-01 05:00'); await submit(); output = await report();
  test('SLA exact limits and sort', output.includes('告警：3｜按时：1｜超时：2') && output.indexOf('C-3｜P3') < output.indexOf('B-2｜P2') && output.includes('A-1｜P1') && output.includes('超时 60 分钟'), output);
  await fill('alerts', Array.from({ length: 300 }, (_, index) => `A-${index} | P1 | 2026-01-01 00:00 | 2026-01-01 00:15`).join('\n')); await submit(); output = await report();
  test('SLA all 300 complete', output.includes('告警：300｜按时：300｜超时：0') && output.includes('300｜A-299｜P1'));
  await fill('alerts', 'A | P1 | 2026-01-01 01:00 | 2026-01-01 00:59'); await submit(); test('SLA reverse time rejected', await invalid('alerts'));
  await fill('alerts', 'A | P1 | 2025-02-29 00:00 | 2026-01-01 00:00'); await submit(); test('SLA false date rejected', await invalid('alerts'));
  await fill('alerts', 'A | P1 | 2026-01-01 00:00 | 2026-01-01 00:01\nA | P1 | 2026-01-01 00:00 | 2026-01-01 00:01'); await submit(); test('SLA duplicate id rejected', await invalid('alerts'));
  for (let seed = 1; seed <= 8; seed += 1) {
    const duration = 10 + seed * 11;
    await fill('alerts', `R-${seed} | P1 | ${utc(0)} | ${utc(duration)}`); await submit(); output = await report();
    const over = Math.max(0, duration - 15);
    test(`SLA oracle ${seed}`, output.includes(`${duration} 分钟 / 15 分钟｜${over ? '超时 ' + over + ' 分钟' : '按时'}`), output.slice(0, 260));
  }

  const normalizedSamples = [
    ['events', '２０２６－０１－０１ ００：００ ｜ ＯＰＥＮ', '记录：1｜异常：0'],
    ['signals', 'ＡＬＰＨＡ ｜ ｌｅｅ，ｍｉｎａ', 'ALPHA｜lee, mina｜合格'],
    ['windows', 'ｃｙａｎ ｜ ０１：００－０２：００', '01:00 → 02:00｜60 分钟'],
    ['versions', 'ｓｏｕｒｃｅ－ａ ｜ １．０．０', 'source-a｜1.0.0｜首条'],
    ['alerts', 'Ａ－１ ｜ Ｐ１ ｜ ２０２６－０１－０１ ００：００ ｜ ２０２６－０１－０１ ００：１５', 'A-1｜P1'],
  ];
  for (let index = 0; index < normalizedSamples.length; index += 1) {
    await go(manifest.tools[index], 390);
    await fill(normalizedSamples[index][0], normalizedSamples[index][1]); await submit(); output = await report();
    test(`NFKC success ${index}`, output.includes(normalizedSamples[index][2]), output.slice(0, 260));
  }
  const rowLimits = [300, 300, 200, 300, 300];
  for (let index = 0; index < 5; index += 1) {
    await go(manifest.tools[index], 390);
    await fill(primaries[index], Array.from({ length: rowLimits[index] + 1 }, () => 'X').join('\n')); await submit();
    test(`row limit ${index}`, await js("document.querySelector('[data-field-error]').textContent.includes('不能超过')") && await invalid(primaries[index]));
  }
  await go(manifest.tools[0], 390);
  await setValue('threshold', "(()=>{const option=document.createElement('option');option.value='31';option.textContent='31';document.querySelector('[name=threshold]').append(option);return '31'})()"); await submit();
  test('invalid threshold targets threshold field', await invalid('threshold'));
  await go(manifest.tools[1], 390);
  await setValue('quorum', "(()=>{const option=document.createElement('option');option.value='6';option.textContent='6';document.querySelector('[name=quorum]').append(option);return '6'})()"); await submit();
  test('invalid quorum targets quorum field', await invalid('quorum'));

  for (let index = 0; index < 5; index += 1) {
    await go(manifest.tools[index], 390); await submit();
    const expected = await report();
    await click('[data-copy-tool]');
    test(`complete report clipboard ${index}`, await js('navigator.clipboard.readText()') === expected);
  }

  const limits = [30000, 30000, 20000, 30000, 40000];
  for (let index = 0; index < 5; index += 1) {
    await go(manifest.tools[index], 390);
    await setValue(primaries[index], `'A'.repeat(${limits[index] + 1})`); await submit(); test(`raw limit ${index}`, await invalid(primaries[index]));
    await setValue(primaries[index], 'String.fromCharCode(0xd800)'); await submit(); test(`malformed Unicode ${index}`, await invalid(primaries[index]));
    await setValue(primaries[index], "'A'+String.fromCharCode(1)"); await submit(); test(`control rejection ${index}`, await invalid(primaries[index]));
  }
  for (let index = 0; index < 5; index += 1) {
    await go(manifest.tools[index], 390);
    await fill(primaries[index], ''); await submit();
    test(`tool invalid ${index}`, await invalid(primaries[index]));
    await shot(`invalid-tool-${index + 1}`);
    await click('button[type="reset"]');
    test(`tool reset ${index}`, await js("document.querySelector('[data-tool-output]').textContent==='等待有效输入。'&&document.querySelector('[data-copy-tool]').disabled"));
    test(`guide default closed ${index}`, await js("!document.querySelector('.nw79-tool-guide').open&&document.querySelectorAll('.nw79-tool-guide h3').length===5"));
    await click('.nw79-tool-guide>summary');
    test(`guide opens ${index}`, await js("document.querySelector('.nw79-tool-guide').open"));
  }
  for (let index = 0; index < 5; index += 1) {
    await go(manifest.tools[index], 390); await submit();
    await js("navigator.clipboard.writeText=()=>new Promise((resolve)=>window.finishCopy=resolve)");
    await click('[data-copy-tool]');
    await setValue(primaries[index], JSON.stringify('invalid'));
    await js('window.finishCopy()'); await delay(30);
    test(`copy race ${index}`, await js("!document.querySelector('[data-copy-status]').textContent&&document.querySelector('[data-copy-tool]').disabled"));
  }
  await go(manifest.tools[0], 390); await submit();
  await js("navigator.clipboard.writeText=()=>Promise.reject(new Error('denied'))");
  await click('[data-copy-tool]');
  test('copy denial visible', (await js("document.querySelector('[data-copy-status]').textContent")).includes('复制失败'));

  await go(manifest.registrationGuide, 390);
  const promotion = 'a[href="https://example.org/verified-destination"]';
  test('one promotion link', await js(`document.querySelectorAll(${JSON.stringify(promotion)}).length===1`));
  test('promotion disclosure and attributes', await js(`(()=>{const link=document.querySelector(${JSON.stringify(promotion)});return link&&link.target==='_blank'&&['sponsored','nofollow','noopener','noreferrer'].every((value)=>link.relList.contains(value))&&link.closest('.nw79-handoff-console').textContent.includes('推广链接披露')})()`));
  await click('[data-nw79-copy-code]');
  test('handoff code clipboard', await js('navigator.clipboard.readText()') === 'NW790905');

  await go('404.html', 390); await shot('404-mobile');
  await fill('query', ''); await submit();
  test('404 empty query focuses input', await js("document.activeElement===document.querySelector('[name=query]')&&document.querySelector('[data-nw79-search-result]').textContent.includes('请输入')"));
  await setValue('query', "'信'.repeat(81)"); await submit();
  test('404 81 code points rejected', await js("document.activeElement===document.querySelector('[name=query]')&&document.querySelector('[data-nw79-search-result]').textContent.includes('不能超过')"));
  await fill('query', '事件'); await submit();
  test('404 local search', await js("document.querySelectorAll('[data-nw79-search-result] a').length===1&&document.querySelector('[data-nw79-search-result]').textContent.includes('事件簿')"));
  await fill('query', '<img src=x onerror=alert(1)>'); await submit();
  test('404 no-result text is safe', await js("document.querySelectorAll('[data-nw79-search-result] img').length===0&&document.querySelector('[data-nw79-search-result]').textContent.includes('没有命中')"));
  await go('missing/path/example.html', 390);
  test('deep real 404', await js("document.title.includes('信号已越出雷达')&&document.querySelector('[data-nw79-search]')!==null&&[...document.styleSheets].filter((sheet)=>sheet.href).length===2"));

  const contrastCode = "function ch(c){if(c==='transparent')return[0,0,0,0];if(c.startsWith('color(srgb ')){const raw=c.slice(11,-1).split('/'),n=raw[0].trim().split(/\\s+/).map(Number);return[255*n[0],255*n[1],255*n[2],raw[1]?Number(raw[1]):1]}const n=c.match(/[\\d.]+/g).map(Number);if(c.startsWith('rgb'))return[n[0],n[1],n[2],n.length===4?n[3]:1];throw Error('Unsupported '+c)}function lum(v){const a=v.slice(0,3).map(n=>n/255).map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4);return.2126*a[0]+.7152*a[1]+.0722*a[2]}function bg(e){if(!e)return[255,255,255,1];const c=ch(getComputedStyle(e).backgroundColor),p=c[3]<1?bg(e.parentElement):[0,0,0,1];return[c[0]*c[3]+p[0]*(1-c[3]),c[1]*c[3]+p[1]*(1-c[3]),c[2]*c[3]+p[2]*(1-c[3]),1]}function ratio(s){const e=document.querySelector(s),b=bg(e),c=ch(getComputedStyle(e).color),f=[c[0]*c[3]+b[0]*(1-c[3]),c[1]*c[3]+b[1]*(1-c[3]),c[2]*c[3]+b[2]*(1-c[3])],x=lum(f),y=lum(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05)}";
  for (const theme of ['night', 'day']) {
    await go('index.html', 1440, theme);
    let ratios = await js(`(()=>{${contrastCode};return ['.nw79-hero>header>span','.nw79-access-panel dd','.nw79-dispatch-card p'].map(ratio)})()`);
    test(`home contrast ${theme}`, ratios.every((ratio) => ratio >= 4.5), ratios);
    test(`native color scheme ${theme}`, await js(`getComputedStyle(document.documentElement).colorScheme===${JSON.stringify(theme === 'night' ? 'dark' : 'light')}`));
    await go(manifest.articles[0], 390, theme);
    ratios = await js(`(()=>{${contrastCode};return ['.nw79-dispatch-head>span','.nw79-dispatch-section p','.nw79-watch-signoff small'].map(ratio)})()`);
    test(`article contrast ${theme}`, ratios.every((ratio) => ratio >= 4.5), ratios);
    await go(manifest.tools[0], 390, theme); await submit();
    ratios = await js(`(()=>{${contrastCode};return ['.nw79-field small','[data-copy-tool]','[data-tool-output]'].map(ratio)})()`);
    test(`tool contrast ${theme}`, ratios.every((ratio) => ratio >= 4.5), ratios);
  }

  await send('Emulation.setScriptExecutionDisabled', { value: true });
  for (const width of [1440, 768, 390, 360]) {
    current = `nojs-index-${width}`;
    await send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 600 });
    await send('Page.navigate', { url: `http://127.0.0.1:${port}/index.html` }); await ready();
    test(`noJS home nav ${width}`, await js("getComputedStyle(document.querySelector('#nw79-nav')).display!=='none'&&[...document.querySelectorAll('#nw79-nav a')].every((link)=>link.getBoundingClientRect().width>0)"));
    await send('Page.navigate', { url: `http://127.0.0.1:${port}/${manifest.tools[0]}` }); await ready();
    test(`noJS tool disabled ${width}`, await js("document.querySelector('button[type=submit]').disabled&&document.querySelector('.nw79-tool-guide')!==null"));
    await send('Page.navigate', { url: `http://127.0.0.1:${port}/${manifest.articles[0]}` }); await ready();
    test(`noJS article details ${width}`, await js("document.querySelector('.nw79-native-scope').open&&document.querySelectorAll('.nw79-faq details').length===2"));
  }
  await send('Emulation.setScriptExecutionDisabled', { value: false });

  await go('index.html', 390, 'night', 780);
  await js("document.querySelector('.nw79-hero h1').textContent='航'.repeat(20);document.querySelector('.nw79-hero>header>span').textContent='源'.repeat(65);document.querySelector('#nw79-home-code').textContent='K'.repeat(28);document.querySelector('.nw79-access-panel dd:last-child').textContent='条'.repeat(45)");
  const stress = await js("document.documentElement.scrollWidth<=innerWidth+1&&Array.from(document.querySelector('.nw79-hero h1').textContent).length===20&&Array.from(document.querySelector('.nw79-hero>header>span').textContent).length===65&&document.querySelector('#nw79-home-code').textContent.length===28&&Array.from(document.querySelector('.nw79-access-panel dd:last-child').textContent).length===45&&document.querySelector('.nw79-access-panel').getBoundingClientRect().bottom<=780");
  test('home stress first fold', stress);
  await shot('home-stress');

  const reportFile = {
    qa, pages: files.length, renders, checks, errors,
    counts: {
      renders: renders.length,
      renderFailures: renders.filter((item) => !item.ok).length,
      checks: checks.length,
      failures: checks.filter((item) => !item.ok).length,
      errors: errors.length,
    },
  };
  fs.writeFileSync(path.join(qa, 'report.json'), JSON.stringify(reportFile, null, 2));
  console.log(JSON.stringify({ qa, ...reportFile.counts, screenshots: fs.readdirSync(qa).filter((file) => file.endsWith('.png')).length }));
  if (reportFile.counts.renderFailures + reportFile.counts.failures + reportFile.counts.errors) process.exitCode = 1;
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}).finally(async () => {
  try {
    if (ws && ws.readyState === WebSocket.OPEN) {
      await send('Browser.close');
      ws.close();
    }
  } catch (_) { /* best effort */ }
  try { server.close(); } catch (_) { /* best effort */ }
  setTimeout(() => { try { if (browser) browser.kill('SIGKILL'); } catch (_) { /* best effort */ } }, 300);
});
