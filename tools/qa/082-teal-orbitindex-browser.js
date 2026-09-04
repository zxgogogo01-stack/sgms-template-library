'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');
const http = require('http');
const { spawn } = require('child_process');

const root = path.resolve('templates/082-teal-orbitindex');
const qa = fs.mkdtempSync(path.join(os.tmpdir(), 'oi82-qa-'));
const contract = fs.readFileSync(path.join(root, 'TEMPLATE.md'), 'utf8');
const manifest = JSON.parse(contract.match(/```json workflow-ready-v2\s*([\s\S]*?)```/)[1]);
const files = [...new Set([manifest.home, manifest.articleIndex, ...manifest.articles, ...manifest.categories.map((entry) => entry.path), manifest.toolIndex, ...manifest.tools, ...Object.values(manifest.legal), manifest.error404, 'article.html', 'tool.html', 'legal.html'])];
const titles = ['用观测孔径框定内容对象','用来源视差保存材料来路','为捕获对象建立坐标向量','让复核周期进入节拍轮','把版本起点写进纪元刻度','沿新鲜度弧安排下一次观测','用证据椭圆标明支撑范围','让陈述与依据形成可见合相','沿依赖凌日检查引用关系','让一次修订留下版本尾迹','让下一位编辑完成交接准直','在发布窗口公开关系与边界'];

let browser, ws, port, profile, id = 0, current = '';
const pending = new Map(), errors = [], renders = [], checks = [];
const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

function fixture(token) {
  const match = token.match(/^O(\d+)_(.*)$/u), article = match ? Number(match[1]) - 1 : -1, key = match ? match[2] : token;
  if (token === 'LANG') return 'zh-Hans';
  if (token === 'SITE_DOMAIN') return `127.0.0.1:${port}`;
  if (token === 'SITE_NAME') return '深青内容天文台';
  if (token === 'BRAND_EN') return 'TEAL / ORBIT';
  if (token === 'CURRENT_YEAR') return '2026';
  if (token === 'SITE_DESC') return '以四条内容轨道、十二种观测组件和五台本地仪器组织来源、节拍、关系与发布边界。';
  if (token === 'SITE_TAGLINE') return '让每次捕获、解释与复核都有可回看的轨道坐标。';
  if (token === 'INDEPENDENCE_NOTE') return '不代表任何平台、材料发布者或专业机构。';
  if (token === 'RISK_NOTE') return '坐标与时间计算不替代来源、事实和适用性核验。';
  if (token === 'HOME_TITLE') return '把内容放进一条可追踪的轨道。';
  if (token === 'HERO_DESCRIPTION') return '观测外壳、轨道目录、五台本地工具和公开台站文件已经搭建，后续编辑只需填写经核实的文字与变量。';
  if (token === 'INVITE_TITLE') return '经核实后填写访问通行证';
  if (token === 'INVITE_CODE') return 'OI820905';
  if (token === 'BENEFIT_RATE') return '适用利益点';
  if (token === 'BENEFIT_DISCLAIMER') return '条件、比例与有效期以经核实的正式说明为准。';
  if (token === 'AFFILIATE_URL') return 'https://example.org/verified-destination';
  if (token === 'AUTHOR_NAME') return '示例观测编辑';
  if (token === 'CONTACT_EMAIL' || token === 'SECURITY_EMAIL') return 'orbit@example.com';
  if (token === 'SECURITY_EXPIRES') return '2027-09-05T00:00:00Z';
  if (token === 'REVISION_ID') return 'R04';
  if (token === 'NEXT_PASS') return '+90 DAYS';
  if (/RSS_DATE$/u.test(token)) return 'Sat, 05 Sep 2026 00:00:00 GMT';
  if (/PUBLISHED|MODIFIED|UPDATED_DATE|_DATE_/u.test(token)) return '2026-09-05';
  if (/_URL$/u.test(token)) return `https://example.org/source/${token.toLowerCase()}`;
  if (article >= 0 && key === 'TITLE') return titles[article];
  if (article >= 0 && key === 'SUMMARY') return '此处概述经核实的观测对象、来源坐标、适用纪元与下一复核窗口，让读者先理解这次观测的职责。';
  if (/FAQ_Q/u.test(key)) return '这次观测还需要复核哪些地平线？';
  if (/FAQ_A/u.test(key)) return '继续核对直接来源、版本日期、坐标口径、适用范围和仍未确认的部分。';
  if (/BODY_/u.test(key)) return '此处填写经核实的正文，分开原始材料、编辑解释、时间坐标与适用判断，并写清例外条件和下一次复核窗口。';
  if (/H2_|TITLE/u.test(key)) return '沿轨道核对对象、坐标与语境';
  if (/TEXT|INTRO|NOTE|SUMMARY|CONCLUSION|DISCLAIMER|CAPTION|RISK|DESC|ALT|HANDOFF|BOUNDARY|QUOTE/u.test(key)) return '此处填写经核实的文字，说明来源、坐标口径、适用条件与尚未确认的部分。';
  if (/MODULE_MARK/u.test(key)) return '90D';
  if (/MODULE_LEFT/u.test(key)) return '捕获坐标层';
  if (/MODULE_CENTER/u.test(key)) return '证据关系层';
  if (/MODULE_RIGHT/u.test(key)) return '复核窗口层';
  if (/MODULE_[1-4]/u.test(key)) return '轨道阶段';
  if (/MODULE/u.test(key)) return '对象、证据和复核窗口的轨道关系';
  if (/PROMO_LABEL/u.test(key)) return '访问经核实的相关服务';
  if (/PROMO_DISCLOSURE/u.test(key)) return '使用此入口可能产生推广关系。';
  if (/LABEL|STATUS|STATE|FORMAT|FLOW_/u.test(key)) return '观测复核状态';
  return '此处填写经核实的文字';
}
function fill(raw) { return raw.replace(/%%([A-Z0-9_]+)%%/gu, (_match, token) => fixture(token)).replaceAll(`https://127.0.0.1:${port}`, `http://127.0.0.1:${port}`); }

const server = http.createServer((request, response) => {
  const route = decodeURIComponent(new URL(request.url, 'http://localhost').pathname).replace(/^\/+|\/+$/gu, '') || 'index.html';
  const target = path.resolve(root, route);
  if (!target.startsWith(`${root}${path.sep}`) || !fs.existsSync(target) || !fs.statSync(target).isFile()) {
    response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' }); response.end(fill(fs.readFileSync(path.join(root, '404.html'), 'utf8'))); return;
  }
  const extension = path.extname(target).toLowerCase(), types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.ico': 'image/x-icon', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8' };
  response.writeHead(200, { 'Content-Type': types[extension] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  const body = fs.readFileSync(target); response.end(/\.(?:html|xml|txt|svg)$/u.test(extension) ? fill(body.toString()) : body);
});
function send(method, params = {}) { return new Promise((resolve, reject) => { const call = ++id; pending.set(call, { resolve, reject }); ws.send(JSON.stringify({ id: call, method, params })); }); }
async function evaluate(expression) { const value = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true, userGesture: true }); if (value.exceptionDetails) throw new Error(value.exceptionDetails.exception?.description || value.exceptionDetails.text); return value.result.value; }
function test(name, okay, detail = '') { checks.push({ name, ok: Boolean(okay), ...(okay ? {} : { detail }) }); if (!okay) console.log('CHECK FAIL', name, typeof detail === 'string' ? detail : JSON.stringify(detail)); }
async function ready() { for (let attempt = 0; attempt < 240; attempt += 1) { if (await evaluate("document.readyState==='complete'&&[...document.images].every(image=>image.complete)")) return; await delay(25); } throw new Error(`page readiness timeout ${current}`); }
async function go(file, width = 1440, theme = 'deep', height = 900) { current = `${file}@${width}-${theme}`; await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 600 }); await send('Page.navigate', { url: `http://127.0.0.1:${port}/${file}` }); await ready(); await evaluate(`localStorage.setItem('oi82-sky',${JSON.stringify(theme)});location.reload()`); await ready(); for (let attempt = 0; attempt < 120; attempt += 1) { if (await evaluate(`document.documentElement.dataset.oi82Sky===${JSON.stringify(theme)}`)) return; await delay(25); } throw new Error(`theme timeout ${current}`); }
async function shot(name, selector = null) { if (selector) await evaluate(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:'center',inline:'nearest',behavior:'instant'})`); else await evaluate("window.scrollTo({left:0,top:0,behavior:'instant'})"); await evaluate('new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))'); const capture = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false }); fs.writeFileSync(path.join(qa, `${name}.png`), Buffer.from(capture.data, 'base64')); }
async function click(selector) { await evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`); await delay(40); }
async function setValue(value) { await evaluate(`(()=>{const field=document.querySelector('[name=records]');field.value=${JSON.stringify(value)};field.dispatchEvent(new Event('input',{bubbles:true}))})()`); }
async function setExpression(expression) { await evaluate(`(()=>{const field=document.querySelector('[name=records]');field.value=${expression};field.dispatchEvent(new Event('input',{bubbles:true}))})()`); }
async function submit() { await click('button[type="submit"]'); }
async function reportText() { return evaluate("document.querySelector('[data-oi82-output]').textContent"); }
async function invalid() { return evaluate("(()=>{const field=document.querySelector('[name=records]');return field.getAttribute('aria-invalid')==='true'&&field.getAttribute('aria-errormessage')&&document.activeElement===field&&document.querySelector('[data-oi82-result-copy]').disabled&&document.querySelector('[data-oi82-report]').hidden})()"); }
const time = (seconds) => `${String(Math.floor(seconds / 3600)).padStart(2, '0')}:${String(Math.floor(seconds / 60) % 60).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

async function run() {
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve)); port = server.address().port; profile = fs.mkdtempSync(path.join(os.tmpdir(), 'oi82-chrome-'));
  browser = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });
  for (let attempt = 0; attempt < 180 && !fs.existsSync(path.join(profile, 'DevToolsActivePort')); attempt += 1) await delay(50);
  const debugPort = fs.readFileSync(path.join(profile, 'DevToolsActivePort'), 'utf8').split('\n')[0], target = await (await fetch(`http://127.0.0.1:${debugPort}/json/new?about:blank`, { method: 'PUT' })).json();
  ws = new WebSocket(target.webSocketDebuggerUrl); await new Promise((resolve) => ws.addEventListener('open', resolve));
  ws.addEventListener('message', (event) => { const message = JSON.parse(event.data); if (message.id) { const call = pending.get(message.id); pending.delete(message.id); if (!call) return; message.error ? call.reject(new Error(JSON.stringify(message.error))) : call.resolve(message.result); } else if (message.method === 'Runtime.exceptionThrown') errors.push({ page: current, error: message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text }); else if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') errors.push({ page: current, error: message.params.args.map((argument) => argument.value).join(' ') }); else if (message.method === 'Network.loadingFailed' && !message.params.canceled) errors.push({ page: current, error: message.params.errorText }); });
  await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable'); await send('Browser.grantPermissions', { origin: `http://127.0.0.1:${port}`, permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'] }); await send('Page.bringToFront');

  test('contract lists 36 unique HTML pages', files.length === 36, { count: files.length, files });
  const profiles = [[1440, 'deep'], [1440, 'exposed'], [768, 'deep'], [768, 'exposed'], [390, 'deep'], [390, 'exposed'], [360, 'deep'], [360, 'exposed']];
  for (const [width, theme] of profiles) for (const file of files) {
    await go(file, width, theme);
    const result = await evaluate(`(()=>{const visible=e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return r.width>0&&r.height>0&&s.display!=='none'&&s.visibility!=='hidden'};const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);const wide=[...document.querySelectorAll('body *')].map(e=>({e,r:e.getBoundingClientRect()})).filter(x=>x.r.right>innerWidth+1||x.r.left<-1).slice(0,8).map(x=>({tag:x.e.tagName,class:x.e.className,left:+x.r.left.toFixed(1),right:+x.r.right.toFixed(1)}));const controls=innerWidth<600?[...document.querySelectorAll('a,button,input,select,textarea,summary')].filter(visible).filter(e=>!e.classList.contains('oi82-skip')).filter(e=>{const r=e.getBoundingClientRect();return r.width<43.5||r.height<43.5}).map(e=>({tag:e.tagName,text:e.textContent.trim().slice(0,18),w:+e.getBoundingClientRect().width.toFixed(1),h:+e.getBoundingClientRect().height.toFixed(1)})):[];return{overflow:document.documentElement.scrollWidth>innerWidth+1,wide,badImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),small:controls,dupes:ids.filter((v,i)=>ids.indexOf(v)!==i),h1:document.querySelectorAll('h1').length,disclosure:document.body.textContent.includes('本站独立运营'),theme:document.documentElement.dataset.oi82Sky}})()`);
    const okay = !result.overflow && !result.wide.length && !result.badImages.length && !result.small.length && !result.dupes.length && result.h1 === 1 && result.disclosure && result.theme === theme;
    renders.push({ file, width, theme, ok: okay, ...(okay ? {} : result) }); if (!okay) console.log('RENDER FAIL', current, JSON.stringify(result));
  }

  for (const [width, theme] of profiles) {
    await go('index.html', width, theme, 820); const top = await evaluate("(()=>{const hero=document.querySelector('.oi82-orbit-hero'),r=hero.getBoundingClientRect();return{top:r.top,overflow:document.documentElement.scrollWidth>innerWidth+1,disc:!!document.querySelector('.oi82-orbit-disc'),nodes:document.querySelectorAll('.oi82-orrery li').length}})()"); test(`home orbit ${width} ${theme}`, top.top >= 0 && !top.overflow && top.disc && top.nodes === 4, top); await shot(`home-${width}-${theme}`);
    const invite = await evaluate("(()=>{const e=document.querySelector('.oi82-access-pass'),r=e.getBoundingClientRect();return{top:r.top,bottom:r.bottom,visible:r.top>=0&&r.bottom<=innerHeight,code:e.querySelector('[data-oi82-copy-source]').textContent,button:!e.querySelector('[data-oi82-copy]').disabled,benefit:e.textContent.includes('适用利益点'),footnote:e.textContent.includes('条件、比例与有效期')}})()"); test(`home first-fold invite ${width} ${theme}`, invite.visible && invite.code === 'OI820905' && invite.button && invite.benefit && invite.footnote, invite);
  }
  await go('index.html', 390); await click('[data-oi82-copy]'); test('home invite clipboard', await evaluate('navigator.clipboard.readText()') === 'OI820905'); await click('[data-oi82-sky-toggle]'); test('theme toggles and color scheme', await evaluate("document.documentElement.dataset.oi82Sky==='exposed'&&getComputedStyle(document.documentElement).colorScheme==='light'")); await click('.oi82-menu'); test('menu opens and focuses first link', await evaluate("document.body.dataset.oi82Menu==='open'&&document.activeElement===document.querySelector('#oi82-nav a')")); await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape' }); test('escape closes and returns focus', await evaluate("document.body.dataset.oi82Menu==='closed'&&document.activeElement===document.querySelector('.oi82-menu')"));

  const components = ['.oi82-aperture', '.oi82-parallax', '.oi82-vector', '.oi82-cadence', '.oi82-epoch', '.oi82-freshness', '.oi82-ellipse', '.oi82-conjunction', '.oi82-transit', '.oi82-trail', '.oi82-alignment', '.oi82-window-pass'];
  for (let index = 0; index < 12; index += 1) { await go(manifest.articles[index], index % 2 ? 390 : 1440, index % 3 ? 'deep' : 'exposed'); test(`article component ${index + 1}`, await evaluate(`document.querySelector(${JSON.stringify(components[index])})!==null`)); await shot(`module-${String(index + 1).padStart(2, '0')}`, components[index]); }
  for (let index = 0; index < 3; index += 1) { await go(manifest.articles[index], 390, index === 1 ? 'exposed' : 'deep'); await shot(`opening-${index + 1}-mobile`, '.oi82-essay'); }
  await go(manifest.articles[0], 390); test('article anchors resolve', await evaluate("[...document.querySelectorAll('.oi82-reading-rail nav a')].length===4&&[...document.querySelectorAll('.oi82-reading-rail nav a')].every(a=>document.querySelector(a.hash))")); test('article FAQ native', await evaluate("document.querySelectorAll('.oi82-faq details').length===2")); await click('.oi82-faq details:first-of-type>summary'); test('FAQ opens', await evaluate("document.querySelector('.oi82-faq details:first-of-type').open")); const start = await evaluate("parseFloat(getComputedStyle(document.querySelector('[data-oi82-progress]')).getPropertyValue('--oi82-progress'))"); await evaluate("window.scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'});new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))"); const end = await evaluate("parseFloat(getComputedStyle(document.querySelector('[data-oi82-progress]')).getPropertyValue('--oi82-progress'))"); test('reading progress reaches 100', start < 5 && end > 99.5, { start, end });
  await go('ephemeris-register.html', 390); await shot('register-mobile'); await go('ephemeris-register.html', 1440, 'exposed'); await shot('register-desktop'); await go(manifest.categories[2].path, 390); await shot('orbit-mobile'); await go(manifest.categories[0].path, 1440, 'exposed'); await shot('orbit-desktop'); await go(manifest.toolIndex, 1440); await shot('calibration-deck'); await go(manifest.legal.about, 390, 'exposed'); await shot('public-mobile');
  for (let index = 0; index < 5; index += 1) { await go(manifest.tools[index], 1440, index % 2 ? 'exposed' : 'deep'); await shot(`tool-${index + 1}-desktop`); await go(manifest.tools[index], 390, index % 2 ? 'deep' : 'exposed'); await shot(`tool-${index + 1}-mobile`); }

  let output;
  await go(manifest.tools[0], 390); await setValue('北极星 | 02:00:00 | +30:00:00\n北极星 | 04:00:00 | -30:00:00\n副本 | 02:00:00 | +30:00:00'); await submit(); output = await reportText(); test('coordinate exact conversion and duplicate groups', output.includes('RA 30.000000°｜DEC +30.000000°') && output.includes('对象重名组：1') && output.includes('坐标重复组：1'), output);
  await setValue(Array.from({ length: 200 }, (_entry, index) => `C${index} | ${time(index)} | +00:00:00`).join('\n')); await submit(); test('coordinate all 200 complete', await evaluate("document.querySelector('[data-oi82-count]').textContent==='200 ROWS'")); await setValue('BAD | 24:00:00 | +00:00:00'); await submit(); test('coordinate range rejected', await invalid());
  for (let seed = 1; seed <= 6; seed += 1) { await setValue(`C${seed} | 00:00:${String(seed).padStart(2, '0')} | +00:00:00`); await submit(); output = await reportText(); test(`coordinate oracle ${seed}`, output.includes(`RA ${(seed / 240).toFixed(6)}°`), output); }

  await go(manifest.tools[1], 390); await setValue('QUARTER | 0 | 0 | 90 | 0\nSAME | 12 | 20 | 12 | 20\nOPPOSITE | 0 | 0 | 180 | 0'); await submit(); output = await reportText(); test('separation cardinal distances', output.includes('QUARTER｜90.000000°') && output.includes('SAME｜0.000000°') && output.includes('OPPOSITE｜180.000000°'), output);
  await setValue(Array.from({ length: 200 }, (_entry, index) => `S${index} | 0 | 0 | ${index} | 0`).join('\n')); await submit(); test('separation all 200 complete', await evaluate("document.querySelector('[data-oi82-count]').textContent==='200 ROWS'")); await setValue('BAD | 360 | 0 | 0 | 0'); await submit(); test('separation RA 360 rejected', await invalid());
  for (let seed = 1; seed <= 6; seed += 1) { await setValue(`S${seed} | 0 | 0 | ${seed * 10} | 0`); await submit(); output = await reportText(); test(`separation oracle ${seed}`, output.includes(`S${seed}｜${(seed * 10).toFixed(6)}°`), output); }

  await go(manifest.tools[2], 390); await setValue('WRAP+ | 359.5 | 0.5\nWRAP- | 0.5 | 359.5\nHALF | 0 | 180'); await submit(); output = await reportText(); test('delta exact signed shortest arcs', output.includes('WRAP+｜有向 +1.000000°｜绝对 1.000000°') && output.includes('WRAP-｜有向 -1.000000°｜绝对 1.000000°') && output.includes('HALF｜有向 -180.000000°'), output);
  await setValue(Array.from({ length: 300 }, (_entry, index) => `D${index} | 0 | ${index}.000001`).join('\n')); await submit(); test('delta all 300 complete', await evaluate("document.querySelector('[data-oi82-count]').textContent==='300 ROWS'")); await setValue('BAD | 0 | 360'); await submit(); test('delta 360 rejected', await invalid());
  for (let seed = 1; seed <= 6; seed += 1) { await setValue(`D${seed} | 359 | ${seed}`); await submit(); output = await reportText(); test(`delta oracle ${seed}`, output.includes(`有向 +${seed + 1}.000000°`), output); }

  await go(manifest.tools[3], 390); await setValue('NIGHT | 1320 | 120\nDAWN | 60 | 180'); await submit(); output = await reportText(); test('window wrap merge and gaps', output.includes('合并区间：2') && output.includes('覆盖分钟：300') && output.includes('空档分钟：1140') && output.includes('0–180') && output.includes('1320–1440'), output);
  await setValue(Array.from({ length: 300 }, (_entry, index) => `W${index} | 0 | 1`).join('\n')); await submit(); test('window all 300 complete', await evaluate("document.querySelector('[data-oi82-count]').textContent==='300 ROWS'")); await setValue('BAD | 10 | 10'); await submit(); test('window zero span rejected', await invalid());
  for (let seed = 1; seed <= 6; seed += 1) { await setValue(`W${seed} | 0 | ${seed * 100}`); await submit(); output = await reportText(); test(`window oracle ${seed}`, output.includes(`覆盖分钟：${seed * 100}`) && output.includes(`空档分钟：${1440 - seed * 100}`), output); }

  await go(manifest.tools[4], 390); await setValue('MID | 10 | 2 | 17\nZERO | 10 | 2 | 2\nNEG | 10 | 2 | -3'); await submit(); output = await reportText(); test('phase standard modulo and next transit', output.includes('MID｜相位 50.000000%｜已过 5 秒｜下一过境 5 秒') && output.includes('ZERO｜相位 0.000000%｜已过 0 秒｜下一过境 0 秒') && output.includes('NEG｜相位 50.000000%'), output);
  await setValue(Array.from({ length: 300 }, (_entry, index) => `P${index} | 1000 | ${index} | ${index + 500}`).join('\n')); await submit(); test('phase all 300 complete', await evaluate("document.querySelector('[data-oi82-count]').textContent==='300 ROWS'")); await setValue('BAD | 0 | 0 | 1'); await submit(); test('phase zero period rejected', await invalid());
  for (let seed = 1; seed <= 6; seed += 1) { await setValue(`P${seed} | 100 | 0 | ${seed * 10}`); await submit(); output = await reportText(); test(`phase oracle ${seed}`, output.includes(`相位 ${(seed * 10).toFixed(6)}%`) && output.includes(`下一过境 ${100 - seed * 10} 秒`), output); }

  const normalized = [['Ａ ｜ ００：００：００ ｜ ＋００：００：００', 'RA 0.000000°'], ['Ａ ｜ ０ ｜ ０ ｜ ９０ ｜ ０', '90.000000°'], ['Ａ ｜ ３５９．５ ｜ ０．５', '+1.000000°'], ['Ａ ｜ ０ ｜ １００', '覆盖分钟：100'], ['Ａ ｜ １００ ｜ ０ ｜ ５０', '相位 50.000000%']];
  for (let index = 0; index < 5; index += 1) { await go(manifest.tools[index], 390); await setValue(normalized[index][0]); await submit(); output = await reportText(); test(`NFKC success ${index}`, output.includes(normalized[index][1]), output); }
  const limits = [200, 200, 300, 300, 300];
  for (let index = 0; index < 5; index += 1) { await go(manifest.tools[index], 390); await setValue(Array.from({ length: limits[index] + 1 }, () => 'X').join('\n')); await submit(); test(`row limit ${index}`, await invalid()); await setExpression("'A'.repeat(40001)"); await submit(); test(`raw limit ${index}`, await invalid()); await setExpression("String.fromCharCode(0xd800)"); await submit(); test(`malformed Unicode ${index}`, await invalid()); await setExpression("'A'+String.fromCharCode(1)"); await submit(); test(`control rejection ${index}`, await invalid()); }
  for (let index = 0; index < 5; index += 1) { await go(manifest.tools[index], 390); await setValue(''); await submit(); test(`empty input invalid ${index}`, await invalid()); await shot(`invalid-tool-${index + 1}`); await click('button[type="reset"]'); test(`tool reset ${index}`, await evaluate("document.querySelector('[data-oi82-report]').hidden&&document.querySelector('[data-oi82-result-copy]').disabled&&!document.querySelector('[data-oi82-error]').textContent")); test(`guide default closed ${index}`, await evaluate("!document.querySelector('.oi82-instrument-guide').open&&document.querySelectorAll('.oi82-instrument-guide h3').length===5")); await click('.oi82-instrument-guide>summary'); test(`guide opens ${index}`, await evaluate("document.querySelector('.oi82-instrument-guide').open")); }
  const valid = ['A | 00:00:00 | +00:00:00', 'A | 0 | 0 | 90 | 0', 'A | 359 | 1', 'A | 0 | 100', 'A | 100 | 0 | 50'];
  for (let index = 0; index < 5; index += 1) { await go(manifest.tools[index], 390); await setValue(valid[index]); await submit(); const expected = await reportText(); await click('[data-oi82-result-copy]'); test(`complete report clipboard ${index}`, await evaluate('navigator.clipboard.readText()') === expected); }
  await go(manifest.tools[0], 390); await setValue(valid[0]); await submit(); await evaluate("navigator.clipboard.writeText=()=>new Promise(resolve=>window.oi82FinishCopy=resolve)"); await click('[data-oi82-result-copy]'); await setValue('invalid'); await evaluate('window.oi82FinishCopy()'); await delay(30); test('copy race stays invalidated', await evaluate("!document.querySelector('[data-oi82-copy-status]').textContent&&document.querySelector('[data-oi82-result-copy]').disabled"));

  await go(manifest.registrationGuide, 390); const promotion = 'a[href="https://example.org/verified-destination"]'; test('one promotion link', await evaluate(`document.querySelectorAll(${JSON.stringify(promotion)}).length===1`)); test('promotion disclosure and attributes', await evaluate(`(()=>{const link=document.querySelector(${JSON.stringify(promotion)});return link&&link.target==='_blank'&&['sponsored','nofollow','noopener','noreferrer'].every(value=>link.relList.contains(value))&&link.closest('.oi82-window-pass').textContent.includes('推广链接')})()`));
  await go('404.html', 390); await shot('404-mobile'); await evaluate("document.querySelector('#oi82-query').value='';document.querySelector('[data-oi82-search]').requestSubmit()"); test('404 empty query focuses input', await evaluate("document.activeElement===document.querySelector('#oi82-query')&&document.querySelector('[data-oi82-search-result]').textContent.includes('请输入')")); await evaluate("document.querySelector('#oi82-query').value='星'.repeat(81);document.querySelector('[data-oi82-search]').requestSubmit()"); test('404 81 code points rejected', await evaluate("document.activeElement===document.querySelector('#oi82-query')&&document.querySelector('[data-oi82-search-result]').textContent.includes('不能超过')")); await evaluate("document.querySelector('#oi82-query').value='工具';document.querySelector('[data-oi82-search]').requestSubmit()"); test('404 local search', await evaluate("document.querySelectorAll('[data-oi82-search-result] a').length===1&&document.querySelector('[data-oi82-search-result]').textContent.includes('五台本地仪器')")); await evaluate("document.querySelector('#oi82-query').value='<img src=x onerror=alert(1)>';document.querySelector('[data-oi82-search]').requestSubmit()"); test('404 no-result safe', await evaluate("!document.querySelector('[data-oi82-search-result] img')&&document.querySelector('[data-oi82-search-result]').textContent.includes('没有完全匹配')"));

  const contrast = "function ch(c){if(c==='transparent')return[0,0,0,0];if(c.startsWith('color(srgb ')){const raw=c.slice(11,-1).split('/'),n=raw[0].trim().split(/\\s+/).map(Number);return[255*n[0],255*n[1],255*n[2],raw[1]?Number(raw[1]):1]}const n=c.match(/[\\d.]+/g).map(Number);return[n[0],n[1],n[2],n.length===4?n[3]:1]}function lum(v){const a=v.slice(0,3).map(n=>n/255).map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4);return.2126*a[0]+.7152*a[1]+.0722*a[2]}function bg(e){if(!e)return[255,255,255,1];const c=ch(getComputedStyle(e).backgroundColor),p=c[3]<1?bg(e.parentElement):[0,0,0,1];return[c[0]*c[3]+p[0]*(1-c[3]),c[1]*c[3]+p[1]*(1-c[3]),c[2]*c[3]+p[2]*(1-c[3]),1]}function ratio(s){const e=document.querySelector(s),b=bg(e),c=ch(getComputedStyle(e).color),f=[c[0]*c[3]+b[0]*(1-c[3]),c[1]*c[3]+b[1]*(1-c[3]),c[2]*c[3]+b[2]*(1-c[3])],x=lum(f),y=lum(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05)}";
  for (const theme of ['deep', 'exposed']) { await go('index.html', 1440, theme); let ratios = await evaluate(`(()=>{${contrast};return['.oi82-hero-copy>span','.oi82-access-pass>header span','.oi82-cycles article:first-child p'].map(ratio)})()`); test(`home contrast ${theme}`, ratios.every((value) => value >= 4.5), ratios); await go(manifest.articles[0], 390, theme); ratios = await evaluate(`(()=>{${contrast};return['.oi82-essay>header>span','.oi82-essay>section p','.oi82-observation-cover figcaption'].map(ratio)})()`); test(`article contrast ${theme}`, ratios.every((value) => value >= 4.5), ratios); await go(manifest.tools[0], 390, theme); await setValue(valid[0]); await submit(); ratios = await evaluate(`(()=>{${contrast};return['#oi82-format','[data-oi82-output]','.oi82-instrument-guide p'].map(ratio)})()`); test(`tool contrast ${theme}`, ratios.every((value) => value >= 4.5), ratios); }

  await send('Emulation.setScriptExecutionDisabled', { value: true });
  for (const width of [1440, 768, 390, 360]) { current = `nojs-${width}`; await send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 600 }); await send('Page.navigate', { url: `http://127.0.0.1:${port}/index.html` }); await ready(); test(`noJS home nav ${width}`, await evaluate("getComputedStyle(document.querySelector('#oi82-nav')).display!=='none'&&[...document.querySelectorAll('#oi82-nav a')].every(a=>a.getBoundingClientRect().width>0)")); test(`noJS copy disabled ${width}`, await evaluate("document.querySelector('[data-oi82-copy]').disabled")); await send('Page.navigate', { url: `http://127.0.0.1:${port}/${manifest.tools[0]}` }); await ready(); test(`noJS tool disabled ${width}`, await evaluate("document.querySelector('button[type=submit]').disabled&&document.querySelector('.oi82-instrument-guide')!==null")); await send('Page.navigate', { url: `http://127.0.0.1:${port}/${manifest.articles[0]}` }); await ready(); test(`noJS article structure ${width}`, await evaluate("document.querySelectorAll('.oi82-reading-rail nav a').length===4&&document.querySelectorAll('.oi82-faq details').length===2")); }
  await send('Emulation.setScriptExecutionDisabled', { value: false });
  await go('index.html', 390, 'deep', 820); await evaluate("document.querySelector('.oi82-hero-copy h1').textContent='轨'.repeat(22);document.querySelector('.oi82-hero-copy>span').textContent='观'.repeat(90);document.querySelector('[data-oi82-copy-source]').textContent='K'.repeat(28);document.querySelector('.oi82-access-pass small').textContent='条'.repeat(45)"); const stress = await evaluate("document.documentElement.scrollWidth<=innerWidth+1&&Array.from(document.querySelector('.oi82-hero-copy h1').textContent).length===22&&Array.from(document.querySelector('.oi82-hero-copy>span').textContent).length===90&&document.querySelector('[data-oi82-copy-source]').textContent.length===28"); test('home boundary copy fits without overflow', stress); await shot('home-stress');

  const result = { qa, pages: files.length, renders, checks, errors, counts: { renders: renders.length, renderFailures: renders.filter((entry) => !entry.ok).length, checks: checks.length, failures: checks.filter((entry) => !entry.ok).length, errors: errors.length } };
  fs.writeFileSync(path.join(qa, 'report.json'), JSON.stringify(result, null, 2)); console.log(JSON.stringify({ qa, ...result.counts, screenshots: fs.readdirSync(qa).filter((file) => file.endsWith('.png')).length })); if (result.counts.renderFailures + result.counts.failures + result.counts.errors) process.exitCode = 1;
}
run().catch((error) => { console.error(error); process.exitCode = 1; }).finally(() => { try { if (ws) ws.close(); } catch (_error) {} try { server.close(); } catch (_error) {} try { if (browser) browser.kill('SIGKILL'); } catch (_error) {} setTimeout(() => process.exit(process.exitCode || 0), 250); });
