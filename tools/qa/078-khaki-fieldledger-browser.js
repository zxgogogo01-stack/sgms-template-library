'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');
const http = require('http');
const { spawn } = require('child_process');

const root = path.resolve('templates/078-khaki-fieldledger');
const qa = fs.mkdtempSync(path.join(os.tmpdir(), 'ka78-qa-'));
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
  '来源链逐段保留原始来路',
  '主标签写清对象与登记边界',
  '材料袋封存语境和例外',
  '地层矩阵排清内容先后',
  '切填剖面并排展示变化',
  '冲突剖面标出证据分歧',
  '坐标探方固定阅读位置',
  '比例尺约束数字的解释',
  '密度探方复核样本分布',
  '入藏印章标记版本状态',
  '更正簿连回原始记录',
  '交接入藏封存披露与状态',
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
  const match = token.match(/^R(\d+)_(.*)$/);
  const article = match ? Number(match[1]) - 1 : -1;
  const key = match ? match[2] : token;
  if (token === 'LANG') return 'zh-Hans';
  if (token === 'SITE_DOMAIN') return `127.0.0.1:${port}`;
  if (token === 'SITE_NAME') return '赭石现场档案';
  if (token === 'BRAND_EN') return 'GRID / ARCHIVE';
  if (token === 'CURRENT_YEAR') return '2026';
  if (token === 'SEO_TITLE') return '在探方、地层与标本签之间建立可复核档案';
  if (token === 'SITE_DESC') return '以四个档案区、十二份现场记录和五件本地工具组织可复核的静态内容框架。';
  if (token === 'SITE_TAGLINE') return '沿来源、层位、坐标与交接路径维护内容。';
  if (token === 'HERO_TITLE') return '把每条内容放回它的探方与层位。';
  if (token === 'HERO_DESCRIPTION') return '记录簿、文章组件、公开说明与本地工具已搭好，后续编辑只需填入经核实文字和变量，不必重做网站界面。';
  if (token === 'HERO_NOTE') return '框架先入藏 · 文字再登记 · 发布前复核';
  if (token === 'GRID_ALT') return '抽象赭石探方、坐标网格与现场标本签';
  if (token === 'GRID_STATE') return 'FRAME READY';
  if (token === 'GRID_NOTE') return '抽象现场视觉只用于界面组织，不代表真实遗址或证据。';
  if (token === 'INVITE_LABEL') return '经核实后填写的邀请码';
  if (token === 'INVITE_CODE') return 'KA780905';
  if (token === 'BENEFIT_RATE') return '适用利益点';
  if (token === 'BENEFIT_DISCLAIMER') return '条件、比例与有效期以经核实的正式说明为准。';
  if (token === 'AFFILIATE_URL') return 'https://example.org/verified-destination';
  if (token === 'AUTHOR_NAME') return '示例编辑';
  if (token === 'CONTACT_EMAIL' || token === 'SECURITY_EMAIL') return 'archive@example.com';
  if (token === 'SECURITY_EXPIRES') return '2027-09-05T00:00:00Z';
  if (token === 'SITEMAP_LASTMOD') return '2026-09-05';
  if (/RSS_DATE$/.test(token)) return 'Sat, 05 Sep 2026 00:00:00 GMT';
  if (/PUBLISHED|MODIFIED|_DATE_/.test(token)) return '2026-09-05';
  if (/_URL/.test(token)) return `https://example.org/source/${token.toLowerCase()}`;
  if (article >= 0 && key === 'TITLE') return titles[article];
  if (article >= 0 && key === 'SUMMARY') return '沿原始材料登记来源、观察日期、适用范围、例外和仍未确认部分，为下一轮编辑保留可追溯的现场记录。';
  if (/FAQ_Q/.test(key)) return '这份现场记录还需要复核什么？';
  if (/FAQ_A/.test(key)) return '继续复核直接来源、查看日期、适用范围、例外情况和仍未确认的部分。';
  if (/BODY_/.test(key)) return '此处填写经核实的正文，说明材料来处、适用前提、例外情况与仍需复查的信息，不把抽象探方示意当作事实证据。';
  if (/H2_|TITLE/.test(key)) return '沿登记号核对来源与层位';
  if (/TEXT|INTRO|NOTE|SUMMARY|CONCLUSION|DISCLAIMER|CAPTION|LIMIT|RISK|DESC|ALT/.test(key)) return '此处填写经核实的文字，交代来源、适用条件、例外情况与尚未确认的部分。';
  if (/RATE|VALUE|PERCENT/.test(key)) return '待核实数值';
  if (/LABEL|EYEBROW|READING|STATE|TERM|MARK|CHECK|MODULE/.test(key)) return '来源与层位';
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

async function go(file, width = 1440, theme = 'dune', height = 900) {
  current = `${file}@${width}-${theme}`;
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 600 });
  await send('Page.navigate', { url: `http://127.0.0.1:${port}/${file}` });
  await ready();
  await js(`localStorage.setItem('ka78-light',${JSON.stringify(theme)});location.reload()`);
  await ready();
  for (let attempt = 0; attempt < 120; attempt += 1) {
    if (await js(`document.documentElement.dataset.ka78Light===${JSON.stringify(theme)}`)) return;
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
  profile = fs.mkdtempSync(path.join(os.tmpdir(), 'ka78-chrome-'));
  browser = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--remote-debugging-port=0',
    `--user-data-dir=${profile}`,
    'about:blank',
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
    [1440, 'dune'], [1440, 'night'], [768, 'dune'], [768, 'night'],
    [390, 'dune'], [390, 'night'], [360, 'dune'], [360, 'night'],
  ];
  const diagnostic = process.env.KA78_DIAG === '1';
  const renderProfiles = diagnostic ? [[768, 'dune'], [768, 'night']] : profiles;
  const renderFiles = diagnostic ? [manifest.articles[3], manifest.articles[9]] : files;
  for (const [width, theme] of renderProfiles) {
    for (const file of renderFiles) {
      await go(file, width, theme);
      const result = await js(`(()=>{const visible=(element)=>{const rect=element.getBoundingClientRect(),style=getComputedStyle(element);return rect.width>0&&rect.height>0&&style.visibility!=='hidden'&&style.display!=='none'};const controls=[...document.querySelectorAll('a,button,input,select,textarea,summary')].filter(visible).filter((element)=>!element.classList.contains('ka78-skip'));const small=controls.filter((element)=>{const rect=element.getBoundingClientRect();return rect.width<43.5||rect.height<43.5}).map((element)=>({tag:element.tagName,text:element.textContent.trim().slice(0,24),width:+element.getBoundingClientRect().width.toFixed(1),height:+element.getBoundingClientRect().height.toFixed(1)}));const ids=[...document.querySelectorAll('[id]')].map((element)=>element.id);const wide=[...document.querySelectorAll('body *')].map((element)=>({element,rect:element.getBoundingClientRect()})).filter((item)=>item.rect.right>innerWidth+1||item.rect.left<-1).slice(0,12).map((item)=>({tag:item.element.tagName,class:item.element.className,right:+item.rect.right.toFixed(1),left:+item.rect.left.toFixed(1),width:+item.rect.width.toFixed(1)}));return{overflow:document.documentElement.scrollWidth>innerWidth+1,scrollWidth:document.documentElement.scrollWidth,wide,badImages:[...document.images].filter((image)=>!image.complete||!image.naturalWidth).map((image)=>image.src),small,dupes:ids.filter((value,index)=>ids.indexOf(value)!==index),h1:document.querySelectorAll('h1').length,disclosure:document.body.textContent.includes('本站独立运营'),theme:document.documentElement.dataset.ka78Light}})()`);
      const ok = !result.overflow && !result.badImages.length && !result.small.length && !result.dupes.length && result.h1 === 1 && result.disclosure && result.theme === theme;
      renders.push({ file, width, theme, ok, ...(ok ? {} : result) });
      if (!ok) console.log('RENDER FAIL', current, JSON.stringify(result));
    }
  }

  if (diagnostic) {
    await go(manifest.tools[4], 390);
    await fill('squares', 'A | 1 | 100');
    await setValue('unit', "(()=>{const option=document.createElement('option');option.value='bad';option.textContent='bad';document.querySelector('[name=unit]').append(option);return 'bad'})()");
    await delay(60);
    console.log('UNIT DIAG', JSON.stringify(await js("(()=>{document.querySelector('form[data-ka78-tool]').requestSubmit();const field=document.querySelector('[name=unit]');return{value:field.value,invalid:field.getAttribute('aria-invalid'),message:field.getAttribute('aria-errormessage'),active:document.activeElement===field,error:document.querySelector('[data-field-error=unit]').textContent,copy:document.querySelector('[data-copy-tool]').disabled,output:document.querySelector('[data-tool-output]').textContent}})()")));
    return;
  }

  for (const [width, theme] of profiles) {
    await go('index.html', width, theme, 780);
    const first = await js(`(()=>{const card=document.querySelector('.ka78-access-tag'),rect=card.getBoundingClientRect(),button=card.querySelector('button'),buttonRect=button.getBoundingClientRect(),range=document.createRange();range.selectNodeContents(button);const textRect=range.getBoundingClientRect();return{top:rect.top,bottom:rect.bottom,visible:rect.top>=0&&rect.bottom<=innerHeight,overflow:document.documentElement.scrollWidth>innerWidth+1,copy:button.textContent.trim(),textInside:textRect.width>0&&textRect.height>0&&textRect.left>=buttonRect.left-.5&&textRect.right<=buttonRect.right+.5&&textRect.top>=buttonRect.top-.5&&textRect.bottom<=buttonRect.bottom+.5}})()`);
    test(`home first fold ${width} ${theme}`, first.visible && !first.overflow && first.copy === '复制代码' && first.textInside, first);
    await shot(`home-${width}-${theme}`);
  }

  await go('index.html', 390);
  await click('[data-ka78-copy-home]');
  test('home code clipboard', await js('navigator.clipboard.readText()') === 'KA780905');
  await click('[data-ka78-light-toggle]');
  test('theme toggles', await js("document.documentElement.dataset.ka78Light==='night'&&getComputedStyle(document.documentElement).colorScheme==='dark'"));
  await click('.ka78-menu');
  test('menu opens and focuses', await js("document.querySelector('#ka78-nav').classList.contains('ka78-open')&&document.activeElement===document.querySelector('#ka78-nav a')"));
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape' });
  test('escape closes and returns focus', await js("!document.querySelector('#ka78-nav').classList.contains('ka78-open')&&document.activeElement===document.querySelector('.ka78-menu')"));

  await go('field-register.html', 390);
  await setSelect('group', '3');
  await fill('keyword', '交接');
  test('combined register filter', await js("[...document.querySelectorAll('.ka78-record-list li:not([hidden])')].length===1&&document.querySelector('.ka78-record-list li:not([hidden])').dataset.ka78Group==='3'"));
  await click('.ka78-register-filter button[type="reset"]');
  test('register filter resets 12', await js("document.querySelectorAll('.ka78-record-list li:not([hidden])').length===12"));

  const components = [
    '.ka78-provenance-chain', '.ka78-primary-label', '.ka78-source-bag', '.ka78-strata-matrix',
    '.ka78-profile-cut', '.ka78-conflict-section', '.ka78-coordinate-grid', '.ka78-scale-bar',
    '.ka78-density-quadrat', '.ka78-accession-seal', '.ka78-correction-ledger', '.ka78-custody-handoff',
  ];
  for (let index = 0; index < 12; index += 1) {
    await go(manifest.articles[index], index % 2 ? 390 : 1440, index % 3 ? 'night' : 'dune');
    test(`article component ${index + 1}`, await js(`document.querySelector(${JSON.stringify(components[index])})!==null`));
    await shot(`module-${String(index + 1).padStart(2, '0')}`, components[index]);
  }
  for (const [index, name, selector] of [[0, 'cover', '.ka78-record-copy>.ka78-record-cover'], [1, 'split', '.ka78-split-opening'], [2, 'buried', '.ka78-buried-cover']]) {
    await go(manifest.articles[index], 390, index === 1 ? 'night' : 'dune');
    await shot(`opening-${name}-mobile`, selector);
  }
  await go(manifest.articles[0], 390);
  test('article native index anchors', await js("[...document.querySelectorAll('.ka78-native-index a')].length===4&&[...document.querySelectorAll('.ka78-native-index a')].every((link)=>document.querySelector(link.hash))"));
  test('article FAQ native', await js("document.querySelectorAll('.ka78-faq details').length===2"));
  await click('.ka78-faq details:first-of-type>summary');
  test('FAQ opens', await js("document.querySelector('.ka78-faq details:first-of-type').open"));

  await go('field-register.html', 390); await shot('index-mobile');
  await go('field-register.html', 1440, 'night'); await shot('catalog-desktop');
  await go('archive-office.html', 390); await shot('public-mobile');
  await go('drawers/provenance-trench.html', 1440, 'night'); await shot('drawer-desktop');
  await go(manifest.articles[8], 390); await shot('mobile-component', '.ka78-density-quadrat');
  await go('index.html', 390, 'night'); await shot('footer-mobile', '.ka78-footer');

  const primaries = ['ids', 'relations', 'points', 'events', 'squares'];
  for (let index = 0; index < 5; index += 1) {
    await go(manifest.tools[index], 390);
    await shot(`tool-${index}-input`, '.ka78-tool-bench form');
    await submit();
    test(`tool default ${index}`, (await report()).length > 80);
    await shot(`tool-${index}-result`, '.ka78-tool-report');
    await click('[data-copy-tool]');
    test(`tool copy ${index}`, await js('navigator.clipboard.readText()') === await report());
  }

  await go(manifest.tools[0], 390);
  await fill('ids', 'obs-001\nOBS-003\nOBS-003');
  await submit();
  let output = await report();
  test('accession exact gaps and duplicates', output.includes('输入：3｜唯一：2｜缺号：1｜重复号：1') && output.includes('范围：OBS-001 → OBS-003') && output.includes('1. OBS-002') && output.includes('2. OBS-003｜重复 ×2'), output.slice(0, 520));
  await fill('ids', Array.from({ length: 500 }, (_, index) => `ARC-${String(index + 1).padStart(6, '0')}`).join('\n'));
  await submit(); output = await report();
  test('accession all 500', output.includes('输入：500｜唯一：500｜缺号：0｜重复号：0') && output.includes('500. ARC-000500｜已登记'));
  await fill('ids', 'ARC-001\nBOX-002'); await submit(); test('accession mixed prefix rejected', await invalid('ids'));
  await fill('ids', 'ARC-001\nARC-0002'); await submit(); test('accession mixed width rejected', await invalid('ids'));
  await fill('ids', 'ARC-000001\nARC-010002'); await submit(); test('accession excessive span rejected', await invalid('ids'));
  await fill('ids', 'ｏｂｓ－００１\nＯＢＳ－００２'); await submit(); output = await report(); test('accession NFKC and case normalization', output.includes('OBS-001') && output.includes('OBS-002'));

  await go(manifest.tools[1], 390);
  await fill('relations', 'A > C\nB > C\nC > D\nA > E'); await submit(); output = await report();
  test('strata exact stable topological order', output.includes('关系：4｜节点：5｜最大层级：2') && ['1. A｜层级 0', '2. B｜层级 0', '3. C｜层级 1', '4. D｜层级 2', '5. E｜层级 1'].every((line) => output.includes(line)), output.slice(0, 520));
  await fill('relations', Array.from({ length: 200 }, (_, index) => `N${index} > N${index + 1}`).join('\n')); await submit(); output = await report();
  test('strata all 200 relations', output.includes('关系：200｜节点：201｜最大层级：200') && output.includes('201. N200｜层级 200'));
  await fill('relations', 'A > B\nB > A'); await submit(); test('strata cycle rejected', await invalid('relations'));
  await fill('relations', 'A > A'); await submit(); test('strata self relation rejected', await invalid('relations'));
  await fill('relations', 'A > B\nA > B'); await submit(); test('strata duplicate rejected', await invalid('relations'));
  await fill('relations', 'a > b'); await submit(); output = await report(); test('strata normalizes lowercase tokens', output.includes('1. A｜层级 0') && output.includes('2. B｜层级 1'));

  await go(manifest.tools[2], 390);
  await fill('points', 'A | 10 | -2 | 5\nB | -10 | 8 | 15\nC | 0 | 2 | 10'); await submit(); output = await report();
  test('coordinate exact bounds centroid and sort', output.includes('记录：3｜北向 -10…10｜东向 -2…8｜深度 5…15') && output.includes('跨度：N 20｜E 10｜D 10') && output.includes('质心：N 0.00｜E 2.67｜D 10.00') && output.indexOf('1. B｜') < output.indexOf('2. C｜') && output.indexOf('2. C｜') < output.indexOf('3. A｜'), output.slice(0, 520));
  await fill('points', Array.from({ length: 200 }, (_, index) => `P${index} | ${index} | ${-index} | ${index % 19}`).join('\n')); await submit(); output = await report();
  test('coordinate all 200', output.includes('记录：200｜') && output.split('\n').filter((line) => /^\d+\./.test(line)).length === 200 && output.includes('P199｜'));
  await fill('points', 'A | 1 | 2 | 3\na | 2 | 3 | 4'); await submit(); test('coordinate casefold duplicate rejected', await invalid('points'));
  await fill('points', 'A | 1.5 | 2 | 3'); await submit(); test('coordinate decimal rejected', await invalid('points'));
  await fill('points', 'A | 100001 | 2 | 3'); await submit(); test('coordinate bound rejected', await invalid('points'));

  await go(manifest.tools[3], 390);
  await fill('events', 'LOT-A | 2026-08-03 | archive\nLOT-B | 2026-08-02 | lab\nLOT-A | 2026-08-01 | field-team\nLOT-A | 2026-08-10 | store'); await submit(); output = await report();
  test('timeline exact grouping order and gaps', output.includes('对象：2') && output.includes('事件：4｜转移：2') && output.includes('1. 2026-08-01｜field-team｜入链') && output.includes('2. 2026-08-03｜archive｜距上次 2 天') && output.includes('3. 2026-08-10｜store｜距上次 7 天') && output.indexOf('LOT-A｜事件 3') < output.indexOf('LOT-B｜事件 1'), output.slice(0, 620));
  await fill('events', Array.from({ length: 300 }, (_, index) => `LOT-Z | ${dateFromDay(index)} | keeper-${index}`).join('\n')); await submit(); output = await report();
  test('timeline all 300', output.includes('对象：1') && output.includes('事件：300｜转移：299') && output.includes(`300. ${dateFromDay(299)}｜keeper-299｜距上次 1 天`));
  await fill('events', 'LOT | 2026-08-01 | field\nlot | 2026-08-01 | archive'); await submit(); test('timeline same-date conflict rejected', await invalid('events'));
  await fill('events', 'LOT | 2025-02-29 | field'); await submit(); test('timeline false date rejected', await invalid('events'));
  await fill('events', 'LOT | 2026-01-01 | Bad Keeper'); await submit(); test('timeline custodian syntax rejected', await invalid('events'));

  await go(manifest.tools[4], 390);
  await fill('squares', 'A | 3 | 1000\nB | 1 | 100\nC | 0 | 500'); await setSelect('unit', 'sqm'); await submit(); output = await report();
  test('density exact BigInt sort and weighted result', output.includes('探方：3｜总计数：4｜总面积：1600 cm²') && output.includes('加权总密度（每平方米）：25.0000') && output.indexOf('1. B｜') < output.indexOf('2. A｜') && output.indexOf('2. A｜') < output.indexOf('3. C｜') && output.includes('B｜计数 1｜面积 100 cm²｜每平方米 100.0000'), output.slice(0, 620));
  await setSelect('unit', 'sqm10'); await submit(); output = await report(); test('density unit conversion exact', output.includes('加权总密度（每十平方米）：250.0000') && output.includes('B｜计数 1｜面积 100 cm²｜每十平方米 1000.0000'));
  await fill('squares', Array.from({ length: 200 }, (_, index) => `Q${index} | ${index} | ${index + 1}`).join('\n')); await submit(); output = await report();
  test('density all 200', output.includes('探方：200｜') && output.split('\n').filter((line) => /^\d+\./.test(line)).length === 200 && output.includes('Q199｜'));
  await fill('squares', 'A | 1000000 | 999999999\nB | 999999 | 999999998'); await setSelect('unit', 'sqm'); await submit(); output = await report();
  test('density high-bound exact arithmetic', output.includes('总计数：1999999｜总面积：1999999997 cm²') && output.includes(`加权总密度（每平方米）：${fixedRatio(1999999n * 10000n, 1999999997n)}`));
  await fill('squares', 'A | 1 | 100\na | 2 | 200'); await submit(); test('density casefold duplicate rejected', await invalid('squares'));
  await fill('squares', 'A | 1 | 0'); await submit(); test('density zero area rejected', await invalid('squares'));
  await fill('squares', 'A | 1 | 100'); await setValue('unit', "(()=>{const option=document.createElement('option');option.value='bad';option.textContent='bad';document.querySelector('[name=unit]').append(option);return 'bad'})()"); await delay(60); const unitState = await js("(()=>{document.querySelector('form[data-ka78-tool]').requestSubmit();const field=document.querySelector('[name=unit]');return{invalid:field.getAttribute('aria-invalid')==='true',message:Boolean(field.getAttribute('aria-errormessage')),active:document.activeElement===field,copy:document.querySelector('[data-copy-tool]').disabled}})()"); test('density invalid unit rejected on unit field', unitState.invalid && unitState.message && unitState.active && unitState.copy, unitState);

  for (let seed = 1; seed <= 8; seed += 1) {
    const values = [seed, seed + 2, seed + 2, seed + 5];
    const unique = [...new Set(values)].sort((a, b) => a - b);
    const gaps = unique[unique.length - 1] - unique[0] + 1 - unique.length;
    await go(manifest.tools[0], 390);
    await fill('ids', values.map((value) => `R${seed}-${String(value).padStart(3, '0')}`).join('\n'));
    await submit(); output = await report();
    test(`accession oracle ${seed}`, output.includes(`输入：4｜唯一：3｜缺号：${gaps}｜重复号：1`) && unique.every((value) => output.includes(`R${seed}-${String(value).padStart(3, '0')}`)), output.slice(0, 280));
  }
  for (let seed = 1; seed <= 8; seed += 1) {
    const count = 4 + seed % 4;
    const relations = Array.from({ length: count - 1 }, (_, index) => `S${index} > S${index + 1}`);
    if (count > 4) relations.push('S0 > S3');
    await go(manifest.tools[1], 390);
    await fill('relations', relations.join('\n')); await submit(); output = await report();
    test(`strata oracle ${seed}`, output.includes(`关系：${relations.length}｜节点：${count}｜最大层级：${count - 1}`) && Array.from({ length: count }, (_, index) => output.includes(`${index + 1}. S${index}｜层级 ${index}`)).every(Boolean), output.slice(0, 320));
  }
  for (let seed = 1; seed <= 8; seed += 1) {
    const points = Array.from({ length: 4 + seed % 3 }, (_, index) => ({ item: `P${seed}-${index}`, n: seed * 3 - index * 4, e: index * 5 - seed, d: (seed + index * 7) % 29 }));
    const ns = points.map((point) => point.n), es = points.map((point) => point.e), ds = points.map((point) => point.d);
    const centroid = (values) => (values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(2);
    await go(manifest.tools[2], 390);
    await fill('points', points.map((point) => `${point.item} | ${point.n} | ${point.e} | ${point.d}`).join('\n')); await submit(); output = await report();
    test(`coordinate oracle ${seed}`, output.includes(`记录：${points.length}｜北向 ${Math.min(...ns)}…${Math.max(...ns)}｜东向 ${Math.min(...es)}…${Math.max(...es)}｜深度 ${Math.min(...ds)}…${Math.max(...ds)}`) && output.includes(`质心：N ${centroid(ns)}｜E ${centroid(es)}｜D ${centroid(ds)}`) && points.every((point) => output.includes(`${point.item}｜N ${point.n}｜E ${point.e}｜D ${point.d}`)), output.slice(0, 360));
  }
  for (let seed = 1; seed <= 8; seed += 1) {
    const offsets = [seed + 6, seed, seed + 2, seed + 11];
    const sorted = offsets.slice().sort((a, b) => a - b);
    await go(manifest.tools[3], 390);
    await fill('events', offsets.map((offset, index) => `LOT-${seed} | ${dateFromDay(offset)} | keeper-${index}`).join('\n')); await submit(); output = await report();
    const gaps = sorted.slice(1).map((value, index) => value - sorted[index]);
    test(`timeline oracle ${seed}`, output.includes('事件：4｜转移：3') && sorted.every((offset) => output.includes(dateFromDay(offset))) && gaps.every((gap) => output.includes(`距上次 ${gap} 天`)), output.slice(0, 360));
  }
  for (let seed = 1; seed <= 8; seed += 1) {
    const squares = Array.from({ length: 4 + seed % 3 }, (_, index) => ({ id: `Q${seed}-${index}`, finds: BigInt(seed * 7 + index * 3), area: BigInt(100 + seed * 11 + index * 17) }));
    const totalFinds = squares.reduce((sum, square) => sum + square.finds, 0n);
    const totalArea = squares.reduce((sum, square) => sum + square.area, 0n);
    const ordered = squares.slice().sort((a, b) => a.finds * b.area === b.finds * a.area ? 0 : a.finds * b.area > b.finds * a.area ? -1 : 1);
    await go(manifest.tools[4], 390);
    await fill('squares', squares.map((square) => `${square.id} | ${square.finds} | ${square.area}`).join('\n')); await setSelect('unit', 'sqm'); await submit(); output = await report();
    test(`density oracle ${seed}`, output.includes(`加权总密度（每平方米）：${fixedRatio(totalFinds * 10000n, totalArea)}`) && ordered.every((square, index) => output.includes(`${index + 1}. ${square.id}｜计数 ${square.finds}｜面积 ${square.area} cm²｜每平方米 ${fixedRatio(square.finds * 10000n, square.area)}`)), output.slice(0, 420));
  }

  const rawLimits = [10001, 15001, 15001, 15001, 15001];
  for (let index = 0; index < 5; index += 1) {
    await go(manifest.tools[index], 390);
    await setValue(primaries[index], `'A'.repeat(${rawLimits[index]})`); await submit(); test(`raw limit ${index}`, await invalid(primaries[index]));
    await setValue(primaries[index], 'String.fromCharCode(0xd800)'); await submit(); test(`malformed Unicode ${index}`, await invalid(primaries[index]));
    await setValue(primaries[index], "'A'+String.fromCharCode(1)"); await submit(); test(`control rejection ${index}`, await invalid(primaries[index]));
  }
  for (let index = 0; index < 5; index += 1) {
    await go(manifest.tools[index], 390);
    await fill(primaries[index], ''); await submit();
    test(`tool invalid ${index}`, await invalid(primaries[index]));
    await shot(`invalid-tool-${index}`);
    await click('button[type="reset"]');
    test(`tool reset ${index}`, await js("document.querySelector('[data-tool-output]').textContent==='等待有效输入。'&&document.querySelector('[data-copy-tool]').disabled"));
    test(`guide default closed ${index}`, await js("!document.querySelector('.ka78-tool-guide').open&&document.querySelectorAll('.ka78-tool-guide h3').length===5"));
    await click('.ka78-tool-guide>summary');
    test(`guide opens ${index}`, await js("document.querySelector('.ka78-tool-guide').open"));
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
  test('copy denial visible', (await js("document.querySelector('[data-copy-status]').textContent")).includes('复制未完成'));

  await go(manifest.registrationGuide, 390);
  const promotion = 'a[href="https://example.org/verified-destination"]';
  test('one promotion link', await js(`document.querySelectorAll(${JSON.stringify(promotion)}).length===1`));
  test('promotion disclosure and attributes', await js(`(()=>{const link=document.querySelector(${JSON.stringify(promotion)});return link&&link.target==='_blank'&&['sponsored','nofollow','noopener','noreferrer'].every((value)=>link.relList.contains(value))&&link.closest('.ka78-custody-handoff').textContent.includes('推广链接披露')})()`));
  await click('[data-ka78-copy-code]');
  test('handoff code clipboard', await js('navigator.clipboard.readText()') === 'KA780905');

  await go('404.html', 390); await shot('404-mobile');
  await fill('query', '来源'); await submit();
  test('404 local search', await js("document.querySelectorAll('[data-ka78-search-result] a').length===1&&document.querySelector('[data-ka78-search-result]').textContent.includes('现场记录簿')"));
  await go('missing/path/example.html', 390);
  test('deep real 404', await js("document.title.includes('标本尚未入藏')&&document.querySelector('[data-ka78-search]')!==null&&[...document.styleSheets].filter((sheet)=>sheet.href).length===2"));

  const contrastCode = "function ch(c){if(c==='transparent')return[0,0,0,0];if(c.startsWith('color(srgb ')){const raw=c.slice(11,-1).split('/'),n=raw[0].trim().split(/\\s+/).map(Number);return[255*n[0],255*n[1],255*n[2],raw[1]?Number(raw[1]):1]}const n=c.match(/[\\d.]+/g).map(Number);if(c.startsWith('rgb'))return[n[0],n[1],n[2],n.length===4?n[3]:1];throw Error('Unsupported '+c)}function lum(v){const a=v.slice(0,3).map(n=>n/255).map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4);return.2126*a[0]+.7152*a[1]+.0722*a[2]}function bg(e){if(!e)return[255,255,255,1];const c=ch(getComputedStyle(e).backgroundColor),p=c[3]<1?bg(e.parentElement):[0,0,0,1];return[c[0]*c[3]+p[0]*(1-c[3]),c[1]*c[3]+p[1]*(1-c[3]),c[2]*c[3]+p[2]*(1-c[3]),1]}function ratio(s){const e=document.querySelector(s),b=bg(e),c=ch(getComputedStyle(e).color),f=[c[0]*c[3]+b[0]*(1-c[3]),c[1]*c[3]+b[1]*(1-c[3]),c[2]*c[3]+b[2]*(1-c[3])],x=lum(f),y=lum(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05)}";
  test('CSS Color4 parser', await js(`(()=>{${contrastCode};return JSON.stringify(ch('color(srgb 1 0.5 0 / 0.94)'))==='[255,127.5,0,0.94]'})()`));
  for (const theme of ['dune', 'night']) {
    await go('index.html', 1440, theme);
    let ratios = await js(`(()=>{${contrastCode};return ['.ka78-hero-copy>p','.ka78-access-tag dd','.ka78-record-card p','.ka78-record-card>span'].map(ratio)})()`);
    test(`home contrast ${theme}`, ratios.every((ratio) => ratio >= 4.5), ratios);
    test(`native color scheme ${theme}`, await js(`getComputedStyle(document.documentElement).colorScheme===${JSON.stringify(theme === 'night' ? 'dark' : 'light')}`));
    await go(manifest.articles[0], 390, theme);
    ratios = await js(`(()=>{${contrastCode};return ['.ka78-record-head>span','.ka78-record-section p','.ka78-record-signoff small','.ka78-provenance-chain b'].map(ratio)})()`);
    test(`article contrast ${theme}`, ratios.every((ratio) => ratio >= 4.5), ratios);
    await go(manifest.tools[0], 390, theme); await submit();
    ratios = await js(`(()=>{${contrastCode};return ['.ka78-field small','[data-copy-tool]','[data-tool-output]'].map(ratio)})()`);
    test(`tool contrast ${theme}`, ratios.every((ratio) => ratio >= 4.5), ratios);
    await go('archive-office.html', 390, theme);
    ratios = await js(`(()=>{${contrastCode};return ['.ka78-public>header span','.ka78-public article>b','.ka78-public article p'].map(ratio)})()`);
    test(`public contrast ${theme}`, ratios.every((ratio) => ratio >= 4.5), ratios);
  }

  await send('Emulation.setScriptExecutionDisabled', { value: true });
  for (const width of [1440, 768, 390, 360]) {
    await go('index.html', width, 'dune');
    test(`noJS home nav ${width}`, await js("getComputedStyle(document.querySelector('#ka78-nav')).display!=='none'&&[...document.querySelectorAll('#ka78-nav a')].every((link)=>link.getBoundingClientRect().width>0)"));
    await go(manifest.tools[0], width, 'dune');
    test(`noJS tool disabled ${width}`, await js("document.querySelector('button[type=submit]').disabled&&document.querySelector('.ka78-tool-guide')!==null"));
    await click('.ka78-tool-guide>summary');
    test(`noJS tool guide opens ${width}`, await js("document.querySelector('.ka78-tool-guide').open"));
    await go(manifest.articles[0], width, 'dune');
    test(`noJS article details ${width}`, await js("document.querySelector('.ka78-native-index').open&&document.querySelectorAll('.ka78-faq details').length===2"));
  }
  await send('Emulation.setScriptExecutionDisabled', { value: false });

  await go('index.html', 390, 'dune', 780);
  await js("document.querySelector('.ka78-hero h1').textContent='现'.repeat(20);document.querySelector('.ka78-hero-copy>span').textContent='源'.repeat(65);document.querySelector('#ka78-home-code').textContent='K'.repeat(28);document.querySelector('.ka78-access-tag dd').textContent='条'.repeat(45)");
  const stress = await js("document.documentElement.scrollWidth<=innerWidth+1&&Array.from(document.querySelector('.ka78-hero h1').textContent).length===20&&Array.from(document.querySelector('.ka78-hero-copy>span').textContent).length===65&&document.querySelector('#ka78-home-code').textContent.length===28&&Array.from(document.querySelector('.ka78-access-tag dd').textContent).length===45&&document.querySelector('.ka78-access-tag').getBoundingClientRect().bottom<=780");
  test('home stress first fold', stress);
  await shot('home-stress');

  const reportFile = {
    qa,
    pages: files.length,
    renders,
    checks,
    errors,
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
