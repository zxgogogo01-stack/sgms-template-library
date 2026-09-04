'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');
const http = require('http');
const { spawn } = require('child_process');

const root = path.resolve('templates/080-ochre-papercurrent');
const qa = fs.mkdtempSync(path.join(os.tmpdir(), 'pc80-qa-'));
const contract = fs.readFileSync(path.join(root, 'TEMPLATE.md'), 'utf8');
const manifest = JSON.parse(contract.match(/```json workflow-ready-v2\s*([\s\S]*?)```/)[1]);
const files = [...new Set([manifest.home, manifest.articleIndex, ...manifest.articles, ...manifest.categories.map(x=>x.path), manifest.toolIndex, ...manifest.tools, ...Object.values(manifest.legal), manifest.error404, 'article.html', 'tool.html', 'legal.html'])];
const articleTitles = ['把直接材料留在陈述页边','让每项陈述拥有可追踪针脚','把解释语境折进相邻版面','用脚注星群连接来源身份','让旁注停留在清楚书沟','用注释装置区分材料层次','用勘误贴条保留前后说法','沿修订折痕比较版本变化','让日期书尾标明复核时点','把编辑状态装入交接封套','用签发清单收束发布条件','以披露插页说明关系边界'];

let browser, ws, port, profile, id=0, current='';
const pending=new Map(), errors=[], renders=[], checks=[];
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));

function fixture(token){
  const match=token.match(/^D(\d+)_(.*)$/), article=match?Number(match[1])-1:-1, key=match?match[2]:token;
  if(token==='LANG')return'zh-Hans';
  if(token==='SITE_DOMAIN')return`127.0.0.1:${port}`;
  if(token==='SITE_NAME')return'赤陶折页编辑室';
  if(token==='BRAND_EN')return'PAPER / CURRENT';
  if(token==='CURRENT_YEAR')return'2026';
  if(token==='SITE_DESC')return'以四叶目录、十二种编辑组件和五张本地校样工具组织可复核的静态出版框架。';
  if(token==='SITE_TAGLINE')return'让来源、语境、修订与交接各有页序。';
  if(token==='HOME_TITLE')return'把复杂材料折成清楚页序。';
  if(token==='HERO_DESCRIPTION')return'文章外壳、栏目目录、本地工具与公开说明已经装订完成，下一位编辑只需填入经核实的文字与变量。';
  if(token==='HOME_QUOTE')return'一张折页的价值，是让阅读顺序显而易见。';
  if(token==='HOME_QUOTE_SOURCE')return'编辑室便笺';
  if(token==='INVITE_CODE')return'PC800905';
  if(token==='BENEFIT_RATE')return'适用利益点';
  if(token==='BENEFIT_DISCLAIMER')return'条件、比例与有效期以经核实的正式说明为准。';
  if(token==='AFFILIATE_URL')return'https://example.org/verified-destination';
  if(token==='AUTHOR_NAME')return'示例编辑';
  if(token==='CONTACT_EMAIL'||token==='SECURITY_EMAIL')return'paper@example.com';
  if(token==='SECURITY_EXPIRES')return'2027-09-05T00:00:00Z';
  if(/RSS_DATE$/.test(token))return'Sat, 05 Sep 2026 00:00:00 GMT';
  if(/PUBLISHED|MODIFIED|UPDATED_DATE|_DATE_/.test(token))return'2026-09-05';
  if(/_URL$/.test(token))return`https://example.org/source/${token.toLowerCase()}`;
  if(article>=0&&key==='TITLE')return articleTitles[article];
  if(article>=0&&key==='SUMMARY')return'此处概述已核实材料、适用语境、版本边界与仍需复查的部分，让读者在进入正文前理解本篇职责。';
  if(/FAQ_Q/.test(key))return'这一篇章还需要复核哪些边界？';
  if(/FAQ_A/.test(key))return'继续核对直接来源、发布日期、适用范围、例外与尚未确认的部分。';
  if(/BODY_/.test(key))return'此处填写经核实的正文，区分材料、解释与编辑判断，并明确适用前提、例外情况以及下一次复核时间。';
  if(/H2_|TITLE/.test(key))return'沿页边核对材料与解释';
  if(/TEXT|INTRO|NOTE|SUMMARY|CONCLUSION|DISCLAIMER|CAPTION|RISK|DESC|ALT|HANDOFF/.test(key))return'此处填写经核实的文字，说明来源、语境、适用条件与尚未确认的部分。';
  if(/MODULE_LEFT/.test(key))return'直接材料层';
  if(/MODULE_MIDDLE/.test(key))return'编辑语境层';
  if(/MODULE_RIGHT/.test(key))return'复核结论层';
  if(/MODULE/.test(key))return'材料与注释的版面关系';
  if(/LABEL|STATUS|EYEBROW|READING|FORMAT/.test(key))return'编辑复核状态';
  return'此处填写经核实的文字';
}
function render(raw){return raw.replace(/%%([A-Z0-9_]+)%%/g,(_,t)=>fixture(t)).replaceAll(`https://127.0.0.1:${port}`,`http://127.0.0.1:${port}`);}

const server=http.createServer((request,response)=>{
  const route=decodeURIComponent(new URL(request.url,'http://localhost').pathname).replace(/^\/+|\/+$/g,'')||'index.html';
  const target=path.resolve(root,route);
  if(!target.startsWith(`${root}${path.sep}`)||!fs.existsSync(target)||!fs.statSync(target).isFile()){
    response.writeHead(404,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});response.end(render(fs.readFileSync(path.join(root,'404.html'),'utf8')));return;
  }
  const ext=path.extname(target).toLowerCase(),types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.ico':'image/x-icon','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8'};
  response.writeHead(200,{'Content-Type':types[ext]||'application/octet-stream','Cache-Control':'no-store'});const body=fs.readFileSync(target);response.end(/\.(?:html|xml|txt|svg)$/.test(ext)?render(body.toString()):body);
});
function send(method,params={}){return new Promise((resolve,reject)=>{const call=++id;pending.set(call,{resolve,reject});ws.send(JSON.stringify({id:call,method,params}));});}
async function js(expression){const value=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true,userGesture:true});if(value.exceptionDetails)throw new Error(value.exceptionDetails.exception?.description||value.exceptionDetails.text);return value.result.value;}
function test(name,ok,detail=''){checks.push({name,ok:Boolean(ok),...(ok?{}:{detail})});if(!ok)console.log('CHECK FAIL',name,typeof detail==='string'?detail:JSON.stringify(detail));}
async function ready(){for(let i=0;i<240;i++){if(await js("document.readyState==='complete'&&[...document.images].every(image=>image.complete)"))return;await delay(25);}throw new Error(`page readiness timeout ${current}`);}
async function go(file,width=1440,theme='cream',height=900){current=`${file}@${width}-${theme}`;await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<600});await send('Page.navigate',{url:`http://127.0.0.1:${port}/${file}`});await ready();await js(`localStorage.setItem('pc80-paper',${JSON.stringify(theme)});location.reload()`);await ready();for(let i=0;i<120;i++){if(await js(`document.documentElement.dataset.pc80Paper===${JSON.stringify(theme)}`))return;await delay(25);}throw new Error(`theme timeout ${current}`);}
async function shot(name,selector=null){if(selector)await js(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:'center',inline:'nearest',behavior:'instant'})`);else await js("window.scrollTo({left:0,top:0,behavior:'instant'})");await js('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))');const capture=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync(path.join(qa,`${name}.png`),Buffer.from(capture.data,'base64'));}
async function click(selector){await js(`document.querySelector(${JSON.stringify(selector)}).click()`);await delay(40);}
async function setValue(value){await js(`(()=>{const f=document.querySelector('[name=records]');f.value=${JSON.stringify(value)};f.dispatchEvent(new Event('input',{bubbles:true}))})()`);}
async function setExpression(expression){await js(`(()=>{const f=document.querySelector('[name=records]');f.value=${expression};f.dispatchEvent(new Event('input',{bubbles:true}))})()`);}
async function setOption(value){await js(`(()=>{const f=document.querySelector('[name=option]');f.value=${JSON.stringify(String(value))};f.dispatchEvent(new Event('change',{bubbles:true}))})()`);}
async function submit(){await click('button[type="submit"]');}
async function report(){return js("document.querySelector('[data-pc80-output]').textContent");}
async function invalid(){return js("(()=>{const f=document.querySelector('[name=records]');return f.getAttribute('aria-invalid')==='true'&&f.getAttribute('aria-errormessage')&&document.activeElement===f&&document.querySelector('[data-pc80-result-copy]').disabled&&document.querySelector('[data-pc80-report]').hidden})()");}

async function run(){
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));port=server.address().port;profile=fs.mkdtempSync(path.join(os.tmpdir(),'pc80-chrome-'));
  browser=spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--remote-debugging-port=0',`--user-data-dir=${profile}`,'about:blank'],{stdio:['ignore','ignore','pipe']});
  for(let i=0;i<180&&!fs.existsSync(path.join(profile,'DevToolsActivePort'));i++)await delay(50);
  const debugPort=fs.readFileSync(path.join(profile,'DevToolsActivePort'),'utf8').split('\n')[0];const target=await(await fetch(`http://127.0.0.1:${debugPort}/json/new?about:blank`,{method:'PUT'})).json();ws=new WebSocket(target.webSocketDebuggerUrl);await new Promise(resolve=>ws.addEventListener('open',resolve));
  ws.addEventListener('message',event=>{const message=JSON.parse(event.data);if(message.id){const call=pending.get(message.id);pending.delete(message.id);if(!call)return;message.error?call.reject(new Error(JSON.stringify(message.error))):call.resolve(message.result);}else if(message.method==='Runtime.exceptionThrown'){errors.push({page:current,error:message.params.exceptionDetails.exception?.description||message.params.exceptionDetails.text});}else if(message.method==='Runtime.consoleAPICalled'&&message.params.type==='error'){errors.push({page:current,error:message.params.args.map(x=>x.value).join(' ')});}else if(message.method==='Network.loadingFailed'&&!message.params.canceled){errors.push({page:current,error:message.params.errorText});}});
  await send('Page.enable');await send('Runtime.enable');await send('Network.enable');await send('Browser.grantPermissions',{origin:`http://127.0.0.1:${port}`,permissions:['clipboardReadWrite','clipboardSanitizedWrite']});await send('Page.bringToFront');

  test('contract lists 36 unique HTML pages',files.length===36,{count:files.length,files});
  const profiles=[[1440,'cream'],[1440,'ink'],[768,'cream'],[768,'ink'],[390,'cream'],[390,'ink'],[360,'cream'],[360,'ink']];
  for(const [width,theme] of profiles){for(const file of files){await go(file,width,theme);const result=await js(`(()=>{const visible=e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return r.width>0&&r.height>0&&s.display!=='none'&&s.visibility!=='hidden'};const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);const wide=[...document.querySelectorAll('body *')].map(e=>({e,r:e.getBoundingClientRect()})).filter(x=>x.r.right>innerWidth+1||x.r.left<-1).slice(0,8).map(x=>({tag:x.e.tagName,class:x.e.className,left:+x.r.left.toFixed(1),right:+x.r.right.toFixed(1)}));const controls=innerWidth<600?[...document.querySelectorAll('a,button,input,select,textarea,summary')].filter(visible).filter(e=>!e.classList.contains('pc80-skip')).filter(e=>{const r=e.getBoundingClientRect();return r.width<43.5||r.height<43.5}).map(e=>({tag:e.tagName,text:e.textContent.trim().slice(0,18),w:+e.getBoundingClientRect().width.toFixed(1),h:+e.getBoundingClientRect().height.toFixed(1)})):[];return{overflow:document.documentElement.scrollWidth>innerWidth+1,wide,badImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),small:controls,dupes:ids.filter((v,i)=>ids.indexOf(v)!==i),h1:document.querySelectorAll('h1').length,disclosure:document.body.textContent.includes('本站独立运营'),theme:document.documentElement.dataset.pc80Paper}})()`);const ok=!result.overflow&&!result.wide.length&&!result.badImages.length&&!result.small.length&&!result.dupes.length&&result.h1===1&&result.disclosure&&result.theme===theme;renders.push({file,width,theme,ok,...(ok?{}:result)});if(!ok)console.log('RENDER FAIL',current,JSON.stringify(result));}}

  for(const [width,theme] of profiles){await go('index.html',width,theme,820);const top=await js("(()=>{const h=document.querySelector('.pc80-cover'),r=h.getBoundingClientRect();return{top:r.top,bottom:r.bottom,overflow:document.documentElement.scrollWidth>innerWidth+1,fold:!!document.querySelector('.pc80-fold'),four:document.querySelectorAll('.pc80-fold li').length}})()");test(`home fold ${width} ${theme}`,top.top>=0&&!top.overflow&&top.fold&&top.four===4,top);await shot(`home-${width}-${theme}`);}

  for(const [width,theme] of profiles){await go('index.html',width,theme,820);const invite=await js("(()=>{const e=document.querySelector('.pc80-invite-fold'),r=e.getBoundingClientRect();return{top:r.top,bottom:r.bottom,visible:r.top>=0&&r.bottom<=innerHeight,code:e.querySelector('[data-pc80-copy-source]').textContent,button:!e.querySelector('[data-pc80-copy]').disabled,benefit:e.textContent.includes('适用利益点'),footnote:e.textContent.includes('条件、比例与有效期')}})()");test(`home first-fold invite ${width} ${theme}`,invite.visible&&invite.code==='PC800905'&&invite.button&&invite.benefit&&invite.footnote,invite);}
  await go('index.html',390,'cream');await click('[data-pc80-copy]');test('home invite clipboard',await js('navigator.clipboard.readText()')==='PC800905');await click('[data-pc80-paper-toggle]');test('theme toggles and color scheme',await js("document.documentElement.dataset.pc80Paper==='ink'&&getComputedStyle(document.documentElement).colorScheme==='dark'"));await click('.pc80-menu');test('menu opens and focuses first link',await js("document.querySelector('#pc80-nav').classList.contains('pc80-open')&&document.activeElement===document.querySelector('#pc80-nav a')"));await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape'});test('escape closes and returns focus',await js("!document.querySelector('#pc80-nav').classList.contains('pc80-open')&&document.activeElement===document.querySelector('.pc80-menu')"));

  const components=['.pc80-piece-ribbon','.pc80-piece-thread','.pc80-piece-panel','.pc80-piece-notes','.pc80-piece-gutter','.pc80-piece-apparatus','.pc80-piece-corrigenda','.pc80-piece-revision','.pc80-piece-date','.pc80-piece-handoff','.pc80-piece-check','.pc80-piece-disclosure'];
  for(let i=0;i<12;i++){await go(manifest.articles[i],i%2?390:1440,i%3?'cream':'ink');test(`article component ${i+1}`,await js(`document.querySelector(${JSON.stringify(components[i])})!==null`));await shot(`module-${String(i+1).padStart(2,'0')}`,components[i]);}
  for(let i=0;i<3;i++){await go(manifest.articles[i],390,i===1?'ink':'cream');await shot(`opening-${i+1}-mobile`,'.pc80-essay');}
  await go(manifest.articles[0],390,'cream');test('article anchors resolve',await js("[...document.querySelectorAll('.pc80-folio-rail a')].length===4&&[...document.querySelectorAll('.pc80-folio-rail a')].every(a=>document.querySelector(a.hash))"));test('article FAQ native',await js("document.querySelectorAll('.pc80-faq details').length===2"));await click('.pc80-faq details:first-of-type>summary');test('FAQ opens',await js("document.querySelector('.pc80-faq details:first-of-type').open"));const start=await js("parseFloat(document.querySelector('[data-pc80-progress]').style.width)");await js("window.scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'});new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))");const end=await js("parseFloat(document.querySelector('[data-pc80-progress]').style.width)");test('reading progress reaches 100',start<5&&end>99.5,{start,end});
  await go('folio-register.html',390);await shot('register-mobile');await go('folio-register.html',1440,'ink');await shot('register-desktop');await go(manifest.categories[2].path,390);await shot('leaf-mobile');await go(manifest.categories[0].path,1440,'ink');await shot('leaf-desktop');await go(manifest.toolIndex,1440);await shot('proofing-desk');await go(manifest.legal.about,390,'ink');await shot('public-mobile');
  for(let i=0;i<5;i++){await go(manifest.tools[i],1440,i%2?'ink':'cream');await shot(`tool-${i+1}-desktop`);await go(manifest.tools[i],390,i%2?'cream':'ink');await shot(`tool-${i+1}-mobile`);}

  let out;
  await go(manifest.tools[0],390);await setValue('A1 | ref | paragraph-1\nA1 | note | source-1\nA2 | ref | paragraph-2\nA3 | note | source-3\nA3 | note | source-4');await submit();out=await report();test('footnote exact matching',out.includes('脚注：3 个；需处理：2')&&out.includes('A1 | ref=1 | note=1 | OK')&&out.includes('A3 | ref=0 | note=2 | CHECK'),out);
  await setValue(Array.from({length:300},(_,i)=>`F${i} | ref | p${i}`).join('\n'));await submit();out=await report();test('footnote all 300 complete',out.includes('脚注：300 个；需处理：300')&&out.includes('F299 | ref=1 | note=0 | CHECK'));
  await setValue('bad id | ref | p1');await submit();test('footnote invalid ID rejected',await invalid());
  for(let seed=1;seed<=6;seed++){const rows=[`A${seed} | ref | p`,`A${seed} | note | s`,`B${seed} | ref | p`];await setValue(rows.join('\n'));await submit();out=await report();test(`footnote oracle ${seed}`,out.includes('脚注：2 个；需处理：1')&&out.includes(`B${seed} | ref=1 | note=0 | CHECK`),out);}

  await go(manifest.tools[1],390);await setValue('材料叶 | 5\n语境叶 | 7\n修订叶 | 3');await setOption(8);await submit();out=await report();test('pagination exact ranges',out.includes('正文页：15；书帖：8 页；装订页：16；补白：1')&&out.includes('语境叶 | 6–12 | 7 页')&&out.includes('补白页序 | 16–16'),out);
  await setValue(Array.from({length:200},(_,i)=>`L${i} | 1`).join('\n'));await setOption(16);await submit();out=await report();test('pagination all 200 complete',out.includes('正文页：200')&&out.includes('装订页：208')&&out.includes('L199 | 200–200 | 1 页'));
  await setValue('材料叶 | 0');await submit();test('pagination zero rejected',await invalid());
  for(let seed=1;seed<=6;seed++){const pages=seed+3,sig=seed%2?4:8,total=Math.ceil(pages/sig)*sig;await setValue(`L${seed} | ${pages}`);await setOption(sig);await submit();out=await report();test(`pagination oracle ${seed}`,out.includes(`正文页：${pages}；书帖：${sig} 页；装订页：${total}；补白：${total-pages}`),out);}

  await go(manifest.tools[2],390);await setValue('开篇 | 1200 | 6\n方法 | 800 | 5\n结尾 | 1000 | 0');await submit();out=await report();test('density exact fixed decimals and sort',out.includes('方法 | 800 字 | 5 引用 | 6.250/千字')&&out.indexOf('方法 |')<out.indexOf('开篇 |')&&out.includes('结尾 | 1000 字 | 0 引用 | 0.000/千字'),out);
  await setValue(Array.from({length:300},(_,i)=>`S${i} | ${i+1} | ${i%7}`).join('\n'));await submit();out=await report();test('density all 300 complete',out.includes('章节：300')&&out.includes('S299 | 300 字'));
  await setValue('开篇 | 0 | 1');await submit();test('density zero words rejected',await invalid());
  for(let seed=1;seed<=6;seed++){const words=seed*200,cites=seed+1,scaled=(BigInt(cites)*1000000n/BigInt(words)),expected=`${scaled/1000n}.${String(scaled%1000n).padStart(3,'0')}`;await setValue(`S${seed} | ${words} | ${cites}`);await submit();out=await report();test(`density oracle ${seed}`,out.includes(`${expected}/千字`),out);}

  await go(manifest.tools[3],390);await setValue('R3 | 2026-06-06 | review\nR1 | 2026-06-03 | draft\nR2 | 2026-06-06 | review\nR4 | 2026-06-06 | publish');await submit();out=await report();test('chronology stable sort and conflict',out.includes('修订：4；同日同阶段冲突：1')&&out.indexOf('R1 | draft')>0&&out.indexOf('R1 | draft')<out.indexOf('R3 | review')&&out.includes('CONFLICT | 2026-06-06 | review | R3,R2'),out);
  await setValue(Array.from({length:300},(_,i)=>`R${i} | 2026-06-${String(i%28+1).padStart(2,'0')} | stage${i}`).join('\n'));await submit();out=await report();test('chronology all 300 complete',out.includes('修订：300')&&out.includes('R299 | stage299'));
  await setValue('R1 | 2025-02-29 | draft');await submit();test('chronology false date rejected',await invalid());
  for(let seed=1;seed<=6;seed++){await setValue(`A${seed} | 2026-01-02 | draft\nB${seed} | 2026-01-01 | draft`);await submit();out=await report();test(`chronology oracle ${seed}`,out.indexOf(`B${seed} | draft`)<out.indexOf(`A${seed} | draft`),out);}

  await go(manifest.tools[4],390);await setValue('C1 | S1,S2\nC2 | S3\nC3 | S4,S4,S5');await setOption(2);await submit();out=await report();test('coverage unique sources and threshold',out.includes('陈述：3；门槛：2；不足：1')&&out.includes('C2 | S3 | 1/2 | GAP')&&out.includes('C3 | S4,S5 | 2/2 | OK'),out);
  await setValue(Array.from({length:300},(_,i)=>`C${i} | S${i},T${i}`).join('\n'));await submit();out=await report();test('coverage all 300 complete',out.includes('陈述：300；门槛：2；不足：0')&&out.includes('C299 | S299,T299 | 2/2 | OK'));
  await setValue('C1 | bad source');await submit();test('coverage invalid source rejected',await invalid());
  for(let seed=1;seed<=6;seed++){const threshold=seed%4+1,count=seed%5+1,sources=Array.from({length:count},(_,i)=>`S${i}`).join(',');await setValue(`C${seed} | ${sources}`);await setOption(threshold);await submit();out=await report();test(`coverage oracle ${seed}`,out.includes(`${count}/${threshold} | ${count>=threshold?'OK':'GAP'}`),out);}

  const normalized=[['Ａ１ ｜ ｒｅｆ ｜ ｐ１\nＡ１ ｜ ｎｏｔｅ ｜ ｓ１','A1 | ref=1 | note=1 | OK'],['材料 ｜ ５','正文页：5'],['章节 ｜ １０００ ｜ ５','5.000/千字'],['Ｒ１ ｜ ２０２６－０６－０３ ｜ ｄｒａｆｔ','2026-06-03 | R1 | draft'],['Ｃ１ ｜ Ｓ１，Ｓ２','C1 | S1,S2']];
  for(let i=0;i<5;i++){await go(manifest.tools[i],390);await setValue(normalized[i][0]);await submit();out=await report();test(`NFKC success ${i}`,out.includes(normalized[i][1]),out);}
  const limits=[300,200,300,300,300];for(let i=0;i<5;i++){await go(manifest.tools[i],390);await setValue(Array.from({length:limits[i]+1},()=> 'X').join('\n'));await submit();test(`row limit ${i}`,await invalid());await setExpression("'A'.repeat(30001)");await submit();test(`raw limit ${i}`,await invalid());await setExpression("String.fromCharCode(0xd800)");await submit();test(`malformed Unicode ${i}`,await invalid());await setExpression("'A'+String.fromCharCode(1)");await submit();test(`control rejection ${i}`,await invalid());}
  for(let i=0;i<5;i++){await go(manifest.tools[i],390);await setValue('');await submit();test(`empty input invalid ${i}`,await invalid());await shot(`invalid-tool-${i+1}`);await click('button[type="reset"]');test(`tool reset ${i}`,await js("document.querySelector('[data-pc80-report]').hidden&&document.querySelector('[data-pc80-result-copy]').disabled&&!document.querySelector('[data-pc80-error]').textContent"));test(`guide default closed ${i}`,await js("!document.querySelector('.pc80-tool-guide').open&&document.querySelectorAll('.pc80-tool-guide h3').length===5"));await click('.pc80-tool-guide>summary');test(`guide opens ${i}`,await js("document.querySelector('.pc80-tool-guide').open"));}
  const valid=['A | ref | p\nA | note | s','Leaf | 3','S | 1000 | 2','R | 2026-01-01 | draft','C | S1,S2'];for(let i=0;i<5;i++){await go(manifest.tools[i],390);await setValue(valid[i]);await submit();const expected=await report();await click('[data-pc80-result-copy]');test(`complete report clipboard ${i}`,await js('navigator.clipboard.readText()')===expected);}
  await go(manifest.tools[0],390);await setValue(valid[0]);await submit();await js("navigator.clipboard.writeText=()=>new Promise(resolve=>window.pc80FinishCopy=resolve)");await click('[data-pc80-result-copy]');await setValue('invalid');await js('window.pc80FinishCopy()');await delay(30);test('copy race stays invalidated',await js("!document.querySelector('[data-pc80-copy-status]').textContent&&document.querySelector('[data-pc80-result-copy]').disabled"));

  await go(manifest.registrationGuide,390);const promotion='a[href="https://example.org/verified-destination"]';test('one promotion link',await js(`document.querySelectorAll(${JSON.stringify(promotion)}).length===1`));test('promotion disclosure and attributes',await js(`(()=>{const a=document.querySelector(${JSON.stringify(promotion)});return a&&a.target==='_blank'&&['sponsored','nofollow','noopener','noreferrer'].every(v=>a.relList.contains(v))&&a.closest('.pc80-piece-disclosure').textContent.includes('推广链接')})()`));

  await go('404.html',390);await shot('404-mobile');await js("document.querySelector('#pc80-search').value='';document.querySelector('[data-pc80-search]').requestSubmit()");test('404 empty query focuses input',await js("document.activeElement===document.querySelector('#pc80-search')&&document.querySelector('[data-pc80-search-result]').textContent.includes('请输入')"));await js("document.querySelector('#pc80-search').value='信'.repeat(81);document.querySelector('[data-pc80-search]').requestSubmit()");test('404 81 code points rejected',await js("document.activeElement===document.querySelector('#pc80-search')&&document.querySelector('[data-pc80-search-result]').textContent.includes('不能超过')"));await js("document.querySelector('#pc80-search').value='工具';document.querySelector('[data-pc80-search]').requestSubmit()");test('404 local search',await js("document.querySelectorAll('[data-pc80-search-result] a').length===1&&document.querySelector('[data-pc80-search-result]').textContent.includes('校样桌')"));await js("document.querySelector('#pc80-search').value='<img src=x onerror=alert(1)>';document.querySelector('[data-pc80-search]').requestSubmit()");test('404 no-result safe',await js("!document.querySelector('[data-pc80-search-result] img')&&document.querySelector('[data-pc80-search-result]').textContent.includes('没有匹配')"));

  const contrast="function ch(c){if(c==='transparent')return[0,0,0,0];if(c.startsWith('color(srgb ')){const raw=c.slice(11,-1).split('/'),n=raw[0].trim().split(/\\s+/).map(Number);return[255*n[0],255*n[1],255*n[2],raw[1]?Number(raw[1]):1]}const n=c.match(/[\\d.]+/g).map(Number);return[n[0],n[1],n[2],n.length===4?n[3]:1]}function lum(v){const a=v.slice(0,3).map(n=>n/255).map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4);return.2126*a[0]+.7152*a[1]+.0722*a[2]}function bg(e){if(!e)return[255,255,255,1];const c=ch(getComputedStyle(e).backgroundColor),p=c[3]<1?bg(e.parentElement):[0,0,0,1];return[c[0]*c[3]+p[0]*(1-c[3]),c[1]*c[3]+p[1]*(1-c[3]),c[2]*c[3]+p[2]*(1-c[3]),1]}function ratio(s){const e=document.querySelector(s),b=bg(e),c=ch(getComputedStyle(e).color),f=[c[0]*c[3]+b[0]*(1-c[3]),c[1]*c[3]+b[1]*(1-c[3]),c[2]*c[3]+b[2]*(1-c[3])],x=lum(f),y=lum(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05)}";
  for(const theme of ['cream','ink']){await go('index.html',1440,theme);let ratios=await js(`(()=>{${contrast};return['.pc80-cover>header>span','.pc80-invite>div>span','.pc80-features article:first-child p'].map(ratio)})()`);test(`home contrast ${theme}`,ratios.every(x=>x>=4.5),ratios);await go(manifest.articles[0],390,theme);ratios=await js(`(()=>{${contrast};return['.pc80-essay>header>span','.pc80-essay>section p','.pc80-folio-cover figcaption'].map(ratio)})()`);test(`article contrast ${theme}`,ratios.every(x=>x>=4.5),ratios);await go(manifest.tools[0],390,theme);await setValue(valid[0]);await submit();ratios=await js(`(()=>{${contrast};return['#pc80-format','[data-pc80-output]','.pc80-tool-guide p'].map(ratio)})()`);test(`tool contrast ${theme}`,ratios.every(x=>x>=4.5),ratios);}

  await send('Emulation.setScriptExecutionDisabled',{value:true});for(const width of [1440,768,390,360]){current=`nojs-${width}`;await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<600});await send('Page.navigate',{url:`http://127.0.0.1:${port}/index.html`});await ready();test(`noJS home nav ${width}`,await js("getComputedStyle(document.querySelector('#pc80-nav')).display!=='none'&&[...document.querySelectorAll('#pc80-nav a')].every(a=>a.getBoundingClientRect().width>0)"));test(`noJS copy disabled ${width}`,await js("document.querySelector('[data-pc80-copy]').disabled"));await send('Page.navigate',{url:`http://127.0.0.1:${port}/${manifest.tools[0]}`});await ready();test(`noJS tool disabled ${width}`,await js("document.querySelector('button[type=submit]').disabled&&document.querySelector('.pc80-tool-guide')!==null"));await send('Page.navigate',{url:`http://127.0.0.1:${port}/${manifest.articles[0]}`});await ready();test(`noJS article structure ${width}`,await js("document.querySelectorAll('.pc80-folio-rail a').length===4&&document.querySelectorAll('.pc80-faq details').length===2"));}await send('Emulation.setScriptExecutionDisabled',{value:false});

  await go('index.html',390,'cream',820);await js("document.querySelector('.pc80-cover h1').textContent='折'.repeat(22);document.querySelector('.pc80-cover>header>span').textContent='材'.repeat(90);document.querySelector('[data-pc80-copy-source]').textContent='K'.repeat(28);document.querySelector('.pc80-invite small').textContent='条'.repeat(45)");const stress=await js("document.documentElement.scrollWidth<=innerWidth+1&&Array.from(document.querySelector('.pc80-cover h1').textContent).length===22&&Array.from(document.querySelector('.pc80-cover>header>span').textContent).length===90&&document.querySelector('[data-pc80-copy-source]').textContent.length===28");test('home boundary copy fits without overflow',stress);await shot('home-stress');

  const reportFile={qa,pages:files.length,renders,checks,errors,counts:{renders:renders.length,renderFailures:renders.filter(x=>!x.ok).length,checks:checks.length,failures:checks.filter(x=>!x.ok).length,errors:errors.length}};fs.writeFileSync(path.join(qa,'report.json'),JSON.stringify(reportFile,null,2));console.log(JSON.stringify({qa,...reportFile.counts,screenshots:fs.readdirSync(qa).filter(f=>f.endsWith('.png')).length}));if(reportFile.counts.renderFailures+reportFile.counts.failures+reportFile.counts.errors)process.exitCode=1;
}
run().catch(error=>{console.error(error);process.exitCode=1;}).finally(()=>{try{if(ws)ws.close();}catch(_){}try{server.close();}catch(_){}try{if(browser)browser.kill('SIGKILL');}catch(_){}setTimeout(()=>process.exit(process.exitCode||0),250);});
