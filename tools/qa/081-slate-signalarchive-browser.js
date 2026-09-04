'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');
const http = require('http');
const { spawn } = require('child_process');

const root = path.resolve('templates/081-slate-signalarchive');
const qa = fs.mkdtempSync(path.join(os.tmpdir(), 'sa81-qa-'));
const contract = fs.readFileSync(path.join(root, 'TEMPLATE.md'), 'utf8');
const manifest = JSON.parse(contract.match(/```json workflow-ready-v2\s*([\s\S]*?)```/)[1]);
const files = [...new Set([manifest.home, manifest.articleIndex, ...manifest.articles, ...manifest.categories.map((entry) => entry.path), manifest.toolIndex, ...manifest.tools, ...Object.values(manifest.legal), manifest.error404, 'article.html', 'tool.html', 'legal.html'])];
const dossierTitles = ['冻结捕获对象的身份边界','为来源保留可追踪身份格','把版本差异放入相邻片格','在处理前固定字符编码','校准跨系统的换行信号','记录每一步规范化操作','为内容摘要建立独立台账','识别登记册里的重复指纹','测量字节变化的影响范围','把来路信息装入语境卡','分开完整性与真实性判断','让发布交接拥有保管链'];

let browser;
let ws;
let port;
let profile;
let callId = 0;
let current = '';
const pending = new Map();
const errors = [];
const renders = [];
const checks = [];
const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

function fixture(token) {
  const articleMatch = token.match(/^D(\d+)_(.*)$/u);
  const article = articleMatch ? Number(articleMatch[1]) - 1 : -1;
  const key = articleMatch ? articleMatch[2] : token;
  if (token === 'LANG') return 'zh-Hans';
  if (token === 'SITE_DOMAIN') return `127.0.0.1:${port}`;
  if (token === 'SITE_NAME') return '灰蓝信号微缩库';
  if (token === 'BRAND_EN') return 'SLATE / SIGNAL';
  if (token === 'CURRENT_YEAR') return '2026';
  if (token === 'SITE_DESC') return '以四卷目录、十二种信号组件和五件本地仪器组织内容捕获、规范化、摘要与语境边界。';
  if (token === 'SITE_TAGLINE') return '让捕获对象、字节处理和复核边界各有片格。';
  if (token === 'INDEPENDENCE_NOTE') return '不代表任何平台或材料发布者。';
  if (token === 'RISK_NOTE') return '摘要只能辅助比对，不能替代来源与事实核验。';
  if (token === 'HOME_TITLE') return '把内容信号固定在可复核胶片上。';
  if (token === 'HERO_DESCRIPTION') return '卷宗外壳、目录、五件本地工具和公开说明已完整搭建，后续编辑只需填写经核实的文字与变量。';
  if (token === 'INVITE_TITLE') return '经核实后填写访问标识';
  if (token === 'INVITE_CODE') return 'SA810905';
  if (token === 'BENEFIT_RATE') return '适用利益点';
  if (token === 'BENEFIT_DISCLAIMER') return '条件、比例与有效期以经核实的正式说明为准。';
  if (token === 'AFFILIATE_URL') return 'https://example.org/verified-destination';
  if (token === 'ARCHIVE_MEDIUM') return '静态微缩胶片';
  if (token === 'SIGNAL_TITLE') return '内容摘要波形';
  if (token === 'SIGNAL_DESC') return '三条抽象信号线展示捕获、规范化和登记层次。';
  if (token === 'SIGNAL_DIGEST_SAMPLE') return '7f83b1657ff1fc53…';
  if (token === 'SIGNAL_STATE') return 'READY';
  if (token === 'AUTHOR_NAME') return '示例档案编辑';
  if (token === 'CONTACT_EMAIL' || token === 'SECURITY_EMAIL') return 'signal@example.com';
  if (token === 'SECURITY_EXPIRES') return '2027-09-05T00:00:00Z';
  if (/RSS_DATE$/u.test(token)) return 'Sat, 05 Sep 2026 00:00:00 GMT';
  if (/PUBLISHED|MODIFIED|UPDATED_DATE|_DATE_/u.test(token)) return '2026-09-05';
  if (/_URL$/u.test(token)) return `https://example.org/source/${token.toLowerCase()}`;
  if (article >= 0 && key === 'TITLE') return dossierTitles[article];
  if (article >= 0 && key === 'SUMMARY') return '此处概述经核实的捕获对象、处理方法、摘要范围与仍需复查的来源语境，让读者先理解本卷职责。';
  if (/FAQ_Q/u.test(key)) return '这格卷宗还需要复核哪些边界？';
  if (/FAQ_A/u.test(key)) return '继续核对直接来源、版本日期、适用范围、转换步骤和仍未确认的部分。';
  if (/BODY_/u.test(key)) return '此处填写经核实的正文，分开原始材料、字节处理、摘要结果与编辑判断，并写清适用前提、例外和下次复核时间。';
  if (/H2_|TITLE/u.test(key)) return '沿信号片格核对对象与处理';
  if (/TEXT|INTRO|NOTE|SUMMARY|CONCLUSION|DISCLAIMER|CAPTION|RISK|DESC|ALT|HANDOFF|BOUNDARY/u.test(key)) return '此处填写经核实的文字，说明来源、处理步骤、适用条件与尚未确认的部分。';
  if (/MODULE_LEFT/u.test(key)) return '捕获对象层';
  if (/MODULE_MIDDLE/u.test(key)) return '规范处理层';
  if (/MODULE_RIGHT/u.test(key)) return '摘要登记层';
  if (/MODULE/u.test(key)) return '对象、处理和摘要之间的信号关系';
  if (/PROMO_LABEL/u.test(key)) return '访问经核实的相关服务';
  if (/PROMO_DISCLOSURE/u.test(key)) return '使用此入口可能产生推广关系。';
  if (/LABEL|STATUS|STATE|EYEBROW|FORMAT|FLOW_/u.test(key)) return '档案复核状态';
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
    const id = ++callId;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
}
async function evaluate(expression) {
  const value = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true, userGesture: true });
  if (value.exceptionDetails) throw new Error(value.exceptionDetails.exception?.description || value.exceptionDetails.text);
  return value.result.value;
}
function test(name, passed, detail = '') {
  checks.push({ name, ok: Boolean(passed), ...(passed ? {} : { detail }) });
  if (!passed) console.log('CHECK FAIL', name, typeof detail === 'string' ? detail : JSON.stringify(detail));
}
async function ready() {
  for (let attempt = 0; attempt < 240; attempt += 1) {
    if (await evaluate("document.readyState==='complete'&&[...document.images].every(image=>image.complete)")) return;
    await delay(25);
  }
  throw new Error(`page readiness timeout ${current}`);
}
async function go(file, width = 1440, theme = 'slate', height = 900) {
  current = `${file}@${width}-${theme}`;
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 600 });
  await send('Page.navigate', { url: `http://127.0.0.1:${port}/${file}` });
  await ready();
  await evaluate(`localStorage.setItem('sa81-film',${JSON.stringify(theme)});location.reload()`);
  await ready();
  for (let attempt = 0; attempt < 120; attempt += 1) {
    if (await evaluate(`document.documentElement.dataset.sa81Film===${JSON.stringify(theme)}`)) return;
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
async function click(selector) { await evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`); await delay(40); }
async function setValue(value) { await evaluate(`(()=>{const field=document.querySelector('[name=records]');field.value=${JSON.stringify(value)};field.dispatchEvent(new Event('input',{bubbles:true}))})()`); }
async function setExpression(expression) { await evaluate(`(()=>{const field=document.querySelector('[name=records]');field.value=${expression};field.dispatchEvent(new Event('input',{bubbles:true}))})()`); }
async function setOption(value) { await evaluate(`(()=>{const field=document.querySelector('[name=option]');field.value=${JSON.stringify(String(value))};field.dispatchEvent(new Event('change',{bubbles:true}))})()`); }
async function submit() { await click('button[type="submit"]'); }
async function reportText() { return evaluate("document.querySelector('[data-sa81-output]').textContent"); }
async function invalid() { return evaluate("(()=>{const field=document.querySelector('[name=records]');return field.getAttribute('aria-invalid')==='true'&&field.getAttribute('aria-errormessage')&&document.activeElement===field&&document.querySelector('[data-sa81-result-copy]').disabled&&document.querySelector('[data-sa81-report]').hidden})()"); }
const hex = (number) => number.toString(16).padStart(64, '0');

async function run() {
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  port = server.address().port;
  profile = fs.mkdtempSync(path.join(os.tmpdir(), 'sa81-chrome-'));
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
      if (message.error) call.reject(new Error(JSON.stringify(message.error)));
      else call.resolve(message.result);
    } else if (message.method === 'Runtime.exceptionThrown') errors.push({ page: current, error: message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text });
    else if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') errors.push({ page: current, error: message.params.args.map((argument) => argument.value).join(' ') });
    else if (message.method === 'Network.loadingFailed' && !message.params.canceled) errors.push({ page: current, error: message.params.errorText });
  });
  await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable');
  await send('Browser.grantPermissions', { origin: `http://127.0.0.1:${port}`, permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'] });
  await send('Page.bringToFront');

  test('contract lists 36 unique HTML pages', files.length === 36, { count: files.length, files });
  const profiles = [[1440, 'slate'], [1440, 'lightbox'], [768, 'slate'], [768, 'lightbox'], [390, 'slate'], [390, 'lightbox'], [360, 'slate'], [360, 'lightbox']];
  for (const [width, theme] of profiles) {
    for (const file of files) {
      await go(file, width, theme);
      const result = await evaluate(`(()=>{const visible=e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return r.width>0&&r.height>0&&s.display!=='none'&&s.visibility!=='hidden'};const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);const wide=[...document.querySelectorAll('body *')].map(e=>({e,r:e.getBoundingClientRect()})).filter(x=>x.r.right>innerWidth+1||x.r.left<-1).slice(0,8).map(x=>({tag:x.e.tagName,class:x.e.className,left:+x.r.left.toFixed(1),right:+x.r.right.toFixed(1)}));const controls=innerWidth<600?[...document.querySelectorAll('a,button,input,select,textarea,summary')].filter(visible).filter(e=>!e.classList.contains('sa81-skip')).filter(e=>{const r=e.getBoundingClientRect();return r.width<43.5||r.height<43.5}).map(e=>({tag:e.tagName,text:e.textContent.trim().slice(0,18),w:+e.getBoundingClientRect().width.toFixed(1),h:+e.getBoundingClientRect().height.toFixed(1)})):[];return{overflow:document.documentElement.scrollWidth>innerWidth+1,wide,badImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),small:controls,dupes:ids.filter((v,i)=>ids.indexOf(v)!==i),h1:document.querySelectorAll('h1').length,disclosure:document.body.textContent.includes('本站独立运营'),theme:document.documentElement.dataset.sa81Film}})()`);
      const okay = !result.overflow && !result.wide.length && !result.badImages.length && !result.small.length && !result.dupes.length && result.h1 === 1 && result.disclosure && result.theme === theme;
      renders.push({ file, width, theme, ok: okay, ...(okay ? {} : result) });
      if (!okay) console.log('RENDER FAIL', current, JSON.stringify(result));
    }
  }

  for (const [width, theme] of profiles) {
    await go('index.html', width, theme, 820);
    const top = await evaluate("(()=>{const hero=document.querySelector('.sa81-hero'),r=hero.getBoundingClientRect();return{top:r.top,overflow:document.documentElement.scrollWidth>innerWidth+1,film:!!document.querySelector('.sa81-film'),steps:document.querySelectorAll('.sa81-strip>span').length}})()");
    test(`home film ${width} ${theme}`, top.top >= 0 && !top.overflow && top.film && top.steps === 4, top);
    await shot(`home-${width}-${theme}`);
    const invite = await evaluate("(()=>{const e=document.querySelector('.sa81-access-frame'),r=e.getBoundingClientRect();return{top:r.top,bottom:r.bottom,visible:r.top>=0&&r.bottom<=innerHeight,code:e.querySelector('[data-sa81-copy-source]').textContent,button:!e.querySelector('[data-sa81-copy]').disabled,benefit:e.textContent.includes('适用利益点'),footnote:e.textContent.includes('条件、比例与有效期')}})()");
    test(`home first-fold invite ${width} ${theme}`, invite.visible && invite.code === 'SA810905' && invite.button && invite.benefit && invite.footnote, invite);
  }
  await go('index.html', 390, 'slate'); await click('[data-sa81-copy]'); test('home invite clipboard', await evaluate('navigator.clipboard.readText()') === 'SA810905');
  await click('[data-sa81-film-toggle]'); test('theme toggles and color scheme', await evaluate("document.documentElement.dataset.sa81Film==='lightbox'&&getComputedStyle(document.documentElement).colorScheme==='light'"));
  await click('.sa81-menu'); test('menu opens and focuses first link', await evaluate("document.querySelector('#sa81-nav').classList.contains('sa81-open')&&document.activeElement===document.querySelector('#sa81-nav a')"));
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape' });
  test('escape closes and returns focus', await evaluate("!document.querySelector('#sa81-nav').classList.contains('sa81-open')&&document.activeElement===document.querySelector('.sa81-menu')"));

  const components = ['.sa81-capture-strip', '.sa81-identity-slate', '.sa81-version-windows', '.sa81-encoding-grid', '.sa81-newline-wave', '.sa81-normalize-chain', '.sa81-digest-blocks', '.sa81-duplicate-overlay', '.sa81-drift-scope', '.sa81-provenance-map', '.sa81-boundary-prism', '.sa81-custody-reel'];
  for (let index = 0; index < 12; index += 1) {
    await go(manifest.articles[index], index % 2 ? 390 : 1440, index % 3 ? 'slate' : 'lightbox');
    test(`article component ${index + 1}`, await evaluate(`document.querySelector(${JSON.stringify(components[index])})!==null`));
    await shot(`module-${String(index + 1).padStart(2, '0')}`, components[index]);
  }
  for (let index = 0; index < 3; index += 1) { await go(manifest.articles[index], 390, index === 1 ? 'lightbox' : 'slate'); await shot(`opening-${index + 1}-mobile`, '.sa81-dossier'); }
  await go(manifest.articles[0], 390, 'slate');
  test('article anchors resolve', await evaluate("[...document.querySelectorAll('.sa81-docket nav a')].length===4&&[...document.querySelectorAll('.sa81-docket nav a')].every(a=>document.querySelector(a.hash))"));
  test('article FAQ native', await evaluate("document.querySelectorAll('.sa81-faq details').length===2"));
  await click('.sa81-faq details:first-of-type>summary'); test('FAQ opens', await evaluate("document.querySelector('.sa81-faq details:first-of-type').open"));
  const progressStart = await evaluate("parseFloat(document.querySelector('[data-sa81-progress]').style.height)");
  await evaluate("window.scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'});new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))");
  const progressEnd = await evaluate("parseFloat(document.querySelector('[data-sa81-progress]').style.height)");
  test('reading progress reaches 100', progressStart < 5 && progressEnd > 99.5, { progressStart, progressEnd });

  await go('archive-register.html', 390); await shot('register-mobile'); await go('archive-register.html', 1440, 'lightbox'); await shot('register-desktop');
  await go(manifest.categories[2].path, 390); await shot('reel-mobile'); await go(manifest.categories[0].path, 1440, 'lightbox'); await shot('reel-desktop');
  await go(manifest.toolIndex, 1440); await shot('instrument-bay'); await go(manifest.legal.about, 390, 'lightbox'); await shot('public-mobile');
  for (let index = 0; index < 5; index += 1) { await go(manifest.tools[index], 1440, index % 2 ? 'lightbox' : 'slate'); await shot(`tool-${index + 1}-desktop`); await go(manifest.tools[index], 390, index % 2 ? 'slate' : 'lightbox'); await shot(`tool-${index + 1}-mobile`); }

  let output;
  const a = 'a'.repeat(64), b = 'b'.repeat(64), c = 'c'.repeat(64), zero = '0'.repeat(64), full = 'f'.repeat(64);
  await go(manifest.tools[0], 390); await setValue(`首页 | ${a}\n首页 | ${b}\n副本 | ${a}`); await submit(); output = await reportText();
  test('register exact duplicate groups', output.includes('唯一标题：2') && output.includes('唯一摘要：2') && output.includes('重复标题组：1') && output.includes('重复摘要组：1'), output);
  await setValue(Array.from({ length: 200 }, (_entry, index) => `T${index} | ${hex(index)}`).join('\n')); await submit(); output = await reportText(); test('register all 200 complete', output.includes('记录：200') && output.includes('唯一摘要：200'), output);
  await setValue(`A | ${'g'.repeat(64)}`); await submit(); test('register invalid hash rejected', await invalid());
  for (let seed = 1; seed <= 6; seed += 1) { await setValue(`A${seed} | ${hex(seed)}\nB${seed} | ${hex(seed)}`); await submit(); output = await reportText(); test(`register oracle ${seed}`, output.includes('重复摘要组：1') && output.includes(`A${seed} / B${seed}`), output); }

  await go(manifest.tools[1], 390); await setOption(4); await setValue(`A | abcd${'0'.repeat(60)}\nB | abcd${'1'.repeat(60)}\nC | 1234${'2'.repeat(60)}`); await submit(); output = await reportText();
  test('prefix exact collision buckets', output.includes('前缀：4 位十六进制') && output.includes('碰撞桶：1') && output.includes('abcd｜2 条｜A / B'), output);
  await setValue(Array.from({ length: 300 }, (_entry, index) => `P${index} | ${hex(index)}`).join('\n')); await setOption(12); await submit(); test('prefix all 300 complete', await evaluate("document.querySelector('[data-sa81-count]').textContent==='300 ROWS'&&!document.querySelector('[data-sa81-report]').hidden"));
  await setOption(2); for (let seed = 1; seed <= 6; seed += 1) { const prefix = seed.toString(16).padStart(2, '0'); await setValue(`A${seed} | ${prefix}${'0'.repeat(62)}\nB${seed} | ${prefix}${'1'.repeat(62)}`); await submit(); output = await reportText(); test(`prefix oracle ${seed}`, output.includes(`${prefix}｜2 条｜A${seed} / B${seed}`), output); }

  await go(manifest.tools[2], 390); await setValue(`ALL | ${zero} | ${full}\nNONE | ${a} | ${a}`); await submit(); output = await reportText();
  test('hamming exact 256-bit distance', output.includes('ALL｜256 位｜100.00%') && output.includes('NONE｜0 位｜0.00%') && output.includes('平均距离：128.00 / 256'), output);
  await setValue(Array.from({ length: 300 }, (_entry, index) => `H${index} | ${zero} | ${hex(index)}`).join('\n')); await submit(); test('hamming all 300 complete', await evaluate("document.querySelector('[data-sa81-count]').textContent==='300 ROWS'"));
  await setValue(`BAD | ${zero} | 0`); await submit(); test('hamming invalid hash rejected', await invalid());
  const nibbleBits = [1, 1, 2, 1, 2, 2];
  for (let seed = 1; seed <= 6; seed += 1) { const digit = seed.toString(16); await setValue(`H${seed} | ${zero} | ${digit.repeat(64)}`); await submit(); output = await reportText(); test(`hamming oracle ${seed}`, output.includes(`H${seed}｜${nibbleBits[seed - 1] * 64} 位`), output); }

  await go(manifest.tools[3], 390); await setValue(`index.html | 9007199254740993 | ${a}\ncopy.html | 7 | ${a}\nstyle.css | 10 | ${b}`); await submit(); output = await reportText();
  test('manifest BigInt total and duplicates', output.includes('总字节：9007199254741010') && output.includes('重复摘要组：1') && output.includes('index.html / copy.html'), output);
  await setValue(Array.from({ length: 300 }, (_entry, index) => `F${index} | ${index} | ${hex(index)}`).join('\n')); await submit(); test('manifest all 300 complete', await evaluate("document.querySelector('[data-sa81-count]').textContent==='300 ROWS'"));
  await setValue(`bad | -1 | ${a}`); await submit(); test('manifest negative bytes rejected', await invalid());
  for (let seed = 1; seed <= 6; seed += 1) { await setValue(`A | ${seed} | ${a}\nB | ${seed * 2} | ${b}`); await submit(); output = await reportText(); test(`manifest oracle ${seed}`, output.includes(`总字节：${seed * 3}`), output); }

  await go(manifest.tools[4], 390); await setValue(`V1 | ROOT | ${a}\nV2 | V1 | ${b}\nV3 | V2 | ${c}`); await submit(); output = await reportText();
  test('chain clean continuity', output.includes('根节点：1') && output.includes('问题组：0') && output.includes('结构连续'), output);
  await setValue(`R | ROOT | ${a}\nA | LOST | ${b}\nB | B | ${c}\nC | R | ${hex(4)}\nD | R | ${hex(5)}`); await submit(); output = await reportText();
  test('chain detects missing self cycle branch', output.includes('缺失前驱：1') && output.includes('自指：1') && output.includes('循环：1') && output.includes('分叉前驱：1'), output);
  const longChain = Array.from({ length: 300 }, (_entry, index) => `N${index} | ${index ? `N${index - 1}` : 'ROOT'} | ${hex(index)}`).join('\n'); await setValue(longChain); await submit(); test('chain all 300 complete', await evaluate("document.querySelector('[data-sa81-count]').textContent==='300 ROWS'"));
  await setValue(`A | ROOT | ${a}\nA | ROOT | ${b}`); await submit(); test('chain duplicate id rejected', await invalid());
  for (let seed = 1; seed <= 6; seed += 1) { const rows = Array.from({ length: seed + 1 }, (_entry, index) => `C${index} | ${index ? `C${index - 1}` : 'ROOT'} | ${hex(index)}`); await setValue(rows.join('\n')); await submit(); output = await reportText(); test(`chain oracle ${seed}`, output.includes('问题组：0') && output.includes(`节点：${seed + 1}`), output); }

  const normalized = [
    [`Ａ ｜ ${'Ａ'.repeat(64)}`, '唯一标题：1'],
    [`Ａ ｜ ${'Ａ'.repeat(64)}`, '前缀：2 位十六进制'],
    [`Ａ ｜ ${'０'.repeat(64)} ｜ ${'Ｆ'.repeat(64)}`, '256 位｜100.00%'],
    [`Ａ ｜ １２ ｜ ${'Ａ'.repeat(64)}`, '总字节：12'],
    [`Ｖ１ ｜ ＲＯＯＴ ｜ ${'Ａ'.repeat(64)}`, '问题组：0']
  ];
  for (let index = 0; index < 5; index += 1) { await go(manifest.tools[index], 390); await setValue(normalized[index][0]); await submit(); output = await reportText(); test(`NFKC success ${index}`, output.includes(normalized[index][1]), output); }
  const limits = [200, 300, 300, 300, 300];
  for (let index = 0; index < 5; index += 1) {
    await go(manifest.tools[index], 390); await setValue(Array.from({ length: limits[index] + 1 }, () => 'X').join('\n')); await submit(); test(`row limit ${index}`, await invalid());
    await setExpression(`'A'.repeat(${index === 2 ? 50001 : 30001})`); await submit(); test(`raw limit ${index}`, await invalid());
    await setExpression("String.fromCharCode(0xd800)"); await submit(); test(`malformed Unicode ${index}`, await invalid());
    await setExpression("'A'+String.fromCharCode(1)"); await submit(); test(`control rejection ${index}`, await invalid());
  }
  for (let index = 0; index < 5; index += 1) {
    await go(manifest.tools[index], 390); await setValue(''); await submit(); test(`empty input invalid ${index}`, await invalid()); await shot(`invalid-tool-${index + 1}`);
    await click('button[type="reset"]'); test(`tool reset ${index}`, await evaluate("document.querySelector('[data-sa81-report]').hidden&&document.querySelector('[data-sa81-result-copy]').disabled&&!document.querySelector('[data-sa81-error]').textContent"));
    test(`guide default closed ${index}`, await evaluate("!document.querySelector('.sa81-instrument-guide').open&&document.querySelectorAll('.sa81-instrument-guide h3').length===5"));
    await click('.sa81-instrument-guide>summary'); test(`guide opens ${index}`, await evaluate("document.querySelector('.sa81-instrument-guide').open"));
  }
  const valid = [`A | ${a}`, `A | ${a}`, `A | ${zero} | ${full}`, `A | 10 | ${a}`, `A | ROOT | ${a}`];
  for (let index = 0; index < 5; index += 1) { await go(manifest.tools[index], 390); await setValue(valid[index]); await submit(); const expected = await reportText(); await click('[data-sa81-result-copy]'); test(`complete report clipboard ${index}`, await evaluate('navigator.clipboard.readText()') === expected); }
  await go(manifest.tools[0], 390); await setValue(valid[0]); await submit(); await evaluate("navigator.clipboard.writeText=()=>new Promise(resolve=>window.sa81FinishCopy=resolve)"); await click('[data-sa81-result-copy]'); await setValue('invalid'); await evaluate('window.sa81FinishCopy()'); await delay(30); test('copy race stays invalidated', await evaluate("!document.querySelector('[data-sa81-copy-status]').textContent&&document.querySelector('[data-sa81-result-copy]').disabled"));

  await go(manifest.registrationGuide, 390); const promotion = 'a[href="https://example.org/verified-destination"]';
  test('one promotion link', await evaluate(`document.querySelectorAll(${JSON.stringify(promotion)}).length===1`));
  test('promotion disclosure and attributes', await evaluate(`(()=>{const link=document.querySelector(${JSON.stringify(promotion)});return link&&link.target==='_blank'&&['sponsored','nofollow','noopener','noreferrer'].every(value=>link.relList.contains(value))&&link.closest('.sa81-custody-reel').textContent.includes('推广链接')})()`));

  await go('404.html', 390); await shot('404-mobile');
  await evaluate("document.querySelector('#sa81-search').value='';document.querySelector('[data-sa81-search]').requestSubmit()"); test('404 empty query focuses input', await evaluate("document.activeElement===document.querySelector('#sa81-search')&&document.querySelector('[data-sa81-search-result]').textContent.includes('请输入')"));
  await evaluate("document.querySelector('#sa81-search').value='信'.repeat(81);document.querySelector('[data-sa81-search]').requestSubmit()"); test('404 81 code points rejected', await evaluate("document.activeElement===document.querySelector('#sa81-search')&&document.querySelector('[data-sa81-search-result]').textContent.includes('不能超过')"));
  await evaluate("document.querySelector('#sa81-search').value='工具';document.querySelector('[data-sa81-search]').requestSubmit()"); test('404 local search', await evaluate("document.querySelectorAll('[data-sa81-search-result] a').length===1&&document.querySelector('[data-sa81-search-result]').textContent.includes('五件本地仪器')"));
  await evaluate("document.querySelector('#sa81-search').value='<img src=x onerror=alert(1)>';document.querySelector('[data-sa81-search]').requestSubmit()"); test('404 no-result safe', await evaluate("!document.querySelector('[data-sa81-search-result] img')&&document.querySelector('[data-sa81-search-result]').textContent.includes('没有完全匹配')"));

  const contrast = "function ch(c){if(c==='transparent')return[0,0,0,0];if(c.startsWith('color(srgb ')){const raw=c.slice(11,-1).split('/'),n=raw[0].trim().split(/\\s+/).map(Number);return[255*n[0],255*n[1],255*n[2],raw[1]?Number(raw[1]):1]}const n=c.match(/[\\d.]+/g).map(Number);return[n[0],n[1],n[2],n.length===4?n[3]:1]}function lum(v){const a=v.slice(0,3).map(n=>n/255).map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4);return.2126*a[0]+.7152*a[1]+.0722*a[2]}function bg(e){if(!e)return[255,255,255,1];const c=ch(getComputedStyle(e).backgroundColor),p=c[3]<1?bg(e.parentElement):[0,0,0,1];return[c[0]*c[3]+p[0]*(1-c[3]),c[1]*c[3]+p[1]*(1-c[3]),c[2]*c[3]+p[2]*(1-c[3]),1]}function ratio(s){const e=document.querySelector(s),b=bg(e),c=ch(getComputedStyle(e).color),f=[c[0]*c[3]+b[0]*(1-c[3]),c[1]*c[3]+b[1]*(1-c[3]),c[2]*c[3]+b[2]*(1-c[3])],x=lum(f),y=lum(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05)}";
  for (const theme of ['slate', 'lightbox']) {
    await go('index.html', 1440, theme); let ratios = await evaluate(`(()=>{${contrast};return['.sa81-hero>header>span','.sa81-access-frame>header span','.sa81-frames article:first-child p'].map(ratio)})()`); test(`home contrast ${theme}`, ratios.every((value) => value >= 4.5), ratios);
    await go(manifest.articles[0], 390, theme); ratios = await evaluate(`(()=>{${contrast};return['.sa81-dossier>header>span','.sa81-dossier>section p','.sa81-dossier-cover figcaption'].map(ratio)})()`); test(`article contrast ${theme}`, ratios.every((value) => value >= 4.5), ratios);
    await go(manifest.tools[0], 390, theme); await setValue(valid[0]); await submit(); ratios = await evaluate(`(()=>{${contrast};return['#sa81-format','[data-sa81-output]','.sa81-instrument-guide p'].map(ratio)})()`); test(`tool contrast ${theme}`, ratios.every((value) => value >= 4.5), ratios);
  }

  await send('Emulation.setScriptExecutionDisabled', { value: true });
  for (const width of [1440, 768, 390, 360]) {
    current = `nojs-${width}`; await send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 600 }); await send('Page.navigate', { url: `http://127.0.0.1:${port}/index.html` }); await ready();
    test(`noJS home nav ${width}`, await evaluate("getComputedStyle(document.querySelector('#sa81-nav')).display!=='none'&&[...document.querySelectorAll('#sa81-nav a')].every(a=>a.getBoundingClientRect().width>0)")); test(`noJS copy disabled ${width}`, await evaluate("document.querySelector('[data-sa81-copy]').disabled"));
    await send('Page.navigate', { url: `http://127.0.0.1:${port}/${manifest.tools[0]}` }); await ready(); test(`noJS tool disabled ${width}`, await evaluate("document.querySelector('button[type=submit]').disabled&&document.querySelector('.sa81-instrument-guide')!==null"));
    await send('Page.navigate', { url: `http://127.0.0.1:${port}/${manifest.articles[0]}` }); await ready(); test(`noJS article structure ${width}`, await evaluate("document.querySelectorAll('.sa81-docket nav a').length===4&&document.querySelectorAll('.sa81-faq details').length===2"));
  }
  await send('Emulation.setScriptExecutionDisabled', { value: false });

  await go('index.html', 390, 'slate', 820); await evaluate("document.querySelector('.sa81-hero h1').textContent='片'.repeat(22);document.querySelector('.sa81-hero>header>span').textContent='信'.repeat(90);document.querySelector('[data-sa81-copy-source]').textContent='K'.repeat(28);document.querySelector('.sa81-access-frame small').textContent='条'.repeat(45)");
  const stress = await evaluate("document.documentElement.scrollWidth<=innerWidth+1&&Array.from(document.querySelector('.sa81-hero h1').textContent).length===22&&Array.from(document.querySelector('.sa81-hero>header>span').textContent).length===90&&document.querySelector('[data-sa81-copy-source]').textContent.length===28"); test('home boundary copy fits without overflow', stress); await shot('home-stress');

  const reportFile = { qa, pages: files.length, renders, checks, errors, counts: { renders: renders.length, renderFailures: renders.filter((entry) => !entry.ok).length, checks: checks.length, failures: checks.filter((entry) => !entry.ok).length, errors: errors.length } };
  fs.writeFileSync(path.join(qa, 'report.json'), JSON.stringify(reportFile, null, 2));
  console.log(JSON.stringify({ qa, ...reportFile.counts, screenshots: fs.readdirSync(qa).filter((file) => file.endsWith('.png')).length }));
  if (reportFile.counts.renderFailures + reportFile.counts.failures + reportFile.counts.errors) process.exitCode = 1;
}

run().catch((error) => { console.error(error); process.exitCode = 1; }).finally(() => {
  try { if (ws) ws.close(); } catch (_error) { /* noop */ }
  try { server.close(); } catch (_error) { /* noop */ }
  try { if (browser) browser.kill('SIGKILL'); } catch (_error) { /* noop */ }
  setTimeout(() => process.exit(process.exitCode || 0), 250);
});
