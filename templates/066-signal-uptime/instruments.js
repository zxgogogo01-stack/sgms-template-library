"use strict";
function signalCompute(kind,values){
 'use strict';
 const fail=(field,message)=>{const e=new Error(message);e.field=field;throw e};
 const read=(field,max)=>{const s=String(values[field]??'').replace(/\r\n?/g,'\n');if(Array.from(s).length>max)fail(field,'最多允许 '+max+' 个 Unicode 字符。');if(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]|\p{Surrogate}/u.test(s))fail(field,'请移除控制字符或不完整的 Unicode 字符。');if(!s.trim())fail(field,'请输入非空内容。');return s;};
 const choice=(field,list)=>{if(!list.includes(values[field]))fail(field,'请选择有效选项。');return values[field]};
 const integer=(s,field,max,min=0)=>{if(!/^(0|[1-9]\d*)$/.test(s)||!Number.isSafeInteger(Number(s))||Number(s)<min||Number(s)>max)fail(field,'请输入 '+min+'–'+max+' 的十进制整数，不使用前导零。');return Number(s)};
 const lines=(field,maxChars,maxRows)=>{const rows=read(field,maxChars).split('\n').map((s,i)=>({s:s.trim(),line:i+1})).filter(x=>x.s);if(rows.length>maxRows)fail(field,'最多允许 '+maxRows+' 个非空行。');return rows};
 if(kind==='window-union'){
  const rows=lines('windows',10000,100);
  const moment=(s,line)=>{const m=s.match(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/);if(!m)fail('windows','第 '+line+' 行格式应为 YYYY-MM-DD HH:MM | YYYY-MM-DD HH:MM。');const [y,mo,d,h,mi]=m.slice(1).map(Number),time=Date.UTC(y,mo-1,d,h,mi),date=new Date(time);if(y<2000||y>2099||h>23||mi>59||date.getUTCFullYear()!==y||date.getUTCMonth()!==mo-1||date.getUTCDate()!==d)fail('windows','第 '+line+' 行日期或时间超出真实有效范围。');return time/60000};
  const windows=rows.map(({s,line})=>{const m=s.match(/^(.+?)\s*\|\s*(.+)$/);if(!m)fail('windows','第 '+line+' 行需用一个竖线分隔起止时间。');const start=moment(m[1].trim(),line),end=moment(m[2].trim(),line);if(end<=start)fail('windows','第 '+line+' 行开始必须早于结束。');if(end-start>366*1440)fail('windows','第 '+line+' 行跨度超过 366 天。');return {start,end,count:1}}).sort((a,b)=>a.start-b.start||a.end-b.end);
  const merged=[];let total=0;for(const w of windows){total+=w.end-w.start;const last=merged.at(-1);if(last&&w.start<=last.end){last.end=Math.max(last.end,w.end);last.count++}else merged.push({...w})}
  const format=n=>new Date(n*60000).toISOString().slice(0,16).replace('T',' '),unique=merged.reduce((sum,w)=>sum+w.end-w.start,0);
  const records=merged.map(w=>({start:format(w.start),end:format(w.end),minutes:w.end-w.start,count:w.count}));
  return {text:['服务窗口合并报告','原始窗口：'+windows.length,'合并后：'+merged.length,'吸收窗口：'+(windows.length-merged.length),'独占分钟：'+unique,'重叠分钟：'+(total-unique),...records.map((w,i)=>(i+1)+'. '+w.start+' → '+w.end+' | '+w.minutes+' 分钟 | 来源 '+w.count),'重叠分钟表示重复计入的时长；按统一标记时间的连续分钟网格，不处理时区或夏令时。'].join('\n'),records};
 }
 if(kind==='debounce-trace'){
  const mode=choice('mode',['trailing','leading']),wait=integer(read('delay',6).trim(),'delay',60000,1),events=lines('events',4000,200).map(({s,line})=>({time:integer(s,'events',1000000000),line})).sort((a,b)=>a.time-b.time||a.line-b.line),emits=[];
  if(mode==='trailing'){let pending=null;for(const event of events){if(pending&&event.time>=pending.time)emits.push(pending);pending={time:event.time+wait,line:event.line}}if(pending)emits.push(pending)}
  else for(const event of events){if(!emits.length||event.time-emits.at(-1).time>=wait)emits.push({...event})}
  return {text:['事件防抖推演','方式：'+(mode==='trailing'?'尾随防抖':'前沿节流'),'间隔毫秒：'+wait,'输入事件：'+events.length,'输出事件：'+emits.length,'抑制数量：'+(events.length-emits.length),'同刻先处理已到期回调；记录顺序为时间升序、原行号次序。','原事件：',...events.map(e=>'行 '+e.line+' @'+e.time+' ms'),'输出回调：',...emits.map((e,i)=>(i+1)+'. @'+e.time+' ms | 关联原行 '+e.line),'这是离线时间模型，不模拟浏览器调度延迟或执行耗时。'].join('\n')};
 }
 if(kind==='hamming-frame'){
  const mode=choice('mode',['encode','check']),rows=lines('frames',4000,64),width=mode==='encode'?4:7;
  const records=rows.map(({s,line})=>{if(!new RegExp('^[01]{'+width+'}$').test(s))fail('frames','第 '+line+' 行需要恰好 '+width+' 位 ASCII 0/1。');const a=Array(8).fill(0);if(mode==='encode'){[3,5,6,7].forEach((p,j)=>a[p]=Number(s[j]));for(const p of [1,2,4])for(let j=1;j<=7;j++)if(j!==p&&(j&p))a[p]^=a[j];return '行 '+line+' | 数据 '+s+' | 帧 '+a.slice(1).join('')}s.split('').forEach((v,j)=>a[j+1]=Number(v));let syndrome=0;for(const p of [1,2,4]){let parity=0;for(let j=1;j<=7;j++)if(j&p)parity^=a[j];if(parity)syndrome+=p}if(syndrome)a[syndrome]^=1;return '行 '+line+' | 输入 '+s+' | 综合征 '+syndrome+' | 处理后 '+a.slice(1).join('')+' | 数据 '+[3,5,6,7].map(p=>a[p]).join('')});
  return {text:['汉明七位帧','方式：'+(mode==='encode'?'偶校验编码':'单错模型检查'),'帧数：'+rows.length,...records,'位号从左向右 1–7，校验位 1、2、4；仅在最多单比特错误假设下解释纠正。多位错误可能被误纠正，综合征 0 也不保证无误。'].join('\n')};
 }
 if(kind==='crc-remainder'){
  const tokens=read('octets',10000).trim().split(/\s+/);if(tokens.length>256)fail('octets','最多允许 256 个字节。');if(tokens.some(s=>!/^[0-9a-fA-F]{2}$/.test(s)))fail('octets','每个字节需恰好两位十六进制，使用空白分隔。');
  let crc=0;const hex=n=>n.toString(16).toUpperCase().padStart(2,'0'),trace=tokens.map((s,i)=>{const byte=parseInt(s,16);crc^=byte;for(let bit=0;bit<8;bit++)crc=crc&128?((crc<<1)^7)&255:(crc<<1)&255;return '#'+(i+1)+' 输入 '+hex(byte)+' → 寄存器 '+hex(crc)});
  return {text:['CRC 八位余数','字节数：'+tokens.length,'多项式：0x07；初值：0x00；不反射；最终异或：0x00','最终十六进制：'+hex(crc),'最终十进制：'+crc,'最终二进制：'+crc.toString(2).padStart(8,'0'),...trace,'CRC 不提供加密、身份认证或防恶意篡改保证。'].join('\n')};
 }
 if(kind==='pulse-runs'){
  const mode=choice('mode',['encode','decode']),raw=read('pulse',16000);let bits,sourceRuns;
  if(mode==='encode'){bits=raw.replace(/\s/g,'');if(!/^[01]+$/.test(bits))fail('pulse','编码只接受 ASCII 0/1 和空白。');if(bits.length>4096)fail('pulse','最多允许 4096 位。')}
  else {const tokens=raw.trim().split(/\s+/);if(tokens.length>512)fail('pulse','解码最多允许 512 段。');let total=0;const segments=tokens.map(s=>{const m=s.match(/^([01]):([1-9]\d*)$/);if(!m)fail('pulse','每段应为 0:正整数 或 1:正整数，不使用前导零。');const n=integer(m[2],'pulse',4096,1);total+=n;if(total>4096)fail('pulse','展开总长超过 4096 位。');return m[1].repeat(n)});sourceRuns=tokens.length;bits=segments.join('')}
  const runs=[];for(const bit of bits){const last=runs.at(-1);if(last&&last.bit===bit)last.count++;else runs.push({bit,count:1})}
  return {text:['脉冲游程互换','方向：'+(mode==='encode'?'编码':'解码'),'逻辑位数：'+bits.length,...(sourceRuns===undefined?[]:['输入段数：'+sourceRuns]),'标准段数：'+runs.length,'比特序列：',bits,'标准游程：',runs.map(r=>r.bit+':'+r.count).join(' '),'段数不等同于文件字节或压缩率；没有采样频率信息。'].join('\n')};
 }
 fail('windows','未知仪器。');
}
(function instrumentRuntime(){
 const form=document.querySelector('[data-instrument]');if(!form)return;
 const result=document.querySelector('[data-result-text]'),copy=document.querySelector('[data-copy-result]'),copyState=document.querySelector('[data-result-copy-state]'),state=document.querySelector('[data-run-state]'),tag=document.querySelector('[data-report-state]'),list=document.querySelector('[data-window-list]');
 const values=()=>Object.fromEntries([...form.elements].filter(e=>e.name).map(e=>[e.name,e.value])),stamp=()=>JSON.stringify(values());
 let revision=0,latest='',signature=stamp();
 const clear=()=>{form.querySelectorAll('[aria-invalid]').forEach(e=>{e.removeAttribute('aria-invalid');e.removeAttribute('aria-errormessage')});form.querySelectorAll('[data-input-error]').forEach(e=>e.textContent='')};
 const invalidate=()=>{revision++;latest='';result.textContent='';list.replaceChildren();copy.disabled=true;copyState.textContent='';tag.textContent='STANDBY'};
 const changed=()=>{if(stamp()===signature)return;signature=stamp();invalidate();clear();state.textContent='输入已变化，请重新运行。'};
 form.querySelector('[type=submit]').disabled=false;form.addEventListener('input',changed);form.addEventListener('change',changed);
 form.addEventListener('reset',()=>{invalidate();clear();state.textContent='已恢复输入，等待运行。';setTimeout(()=>signature=stamp(),0)});
 const presets={separate:'2026-09-04 09:00 | 2026-09-04 10:00\n2026-09-04 11:00 | 2026-09-04 12:00',overlap:'2026-09-04 09:00 | 2026-09-04 10:30\n2026-09-04 10:00 | 2026-09-04 11:00\n2026-09-04 10:45 | 2026-09-04 12:00',touching:'2026-09-04 09:00 | 2026-09-04 10:00\n2026-09-04 10:00 | 2026-09-04 11:00'};
 form.querySelectorAll('[data-window-preset]').forEach(b=>{b.disabled=false;b.addEventListener('click',()=>{form.elements.windows.value=presets[b.dataset.windowPreset];changed();state.textContent='已载入示例，请重新运行。';form.elements.windows.focus()})});
 form.addEventListener('submit',event=>{event.preventDefault();invalidate();clear();signature=stamp();try{const r=signalCompute(form.dataset.instrument,values());latest=r.text;result.textContent=r.text;copy.disabled=false;state.textContent='本地推演完成。';tag.textContent='READY';if(r.records)r.records.forEach((w,i)=>{const li=document.createElement('li'),n=document.createElement('b'),d=document.createElement('div'),time=document.createElement('span'),meta=document.createElement('small');n.textContent=String(i+1).padStart(2,'0');time.textContent=w.start+' → '+w.end;meta.textContent=w.minutes+' 分钟 / 来源 '+w.count;d.append(time,meta);li.append(n,d);list.append(li)})}catch(error){tag.textContent='CHECK INPUT';state.textContent='未生成报告，请修正输入。';const field=form.elements.namedItem(error.field)||form.querySelector('input,textarea,select'),message=document.getElementById(field.id+'-error');message.textContent=error.message;field.setAttribute('aria-invalid','true');field.setAttribute('aria-errormessage',message.id);field.focus()}});
 copy.addEventListener('click',async()=>{if(!latest)return;const rev=revision,text=latest;copy.disabled=true;try{await navigator.clipboard.writeText(text);if(revision===rev)copyState.textContent='报告已复制。'}catch{if(revision===rev)copyState.textContent='浏览器未允许复制，请手动选择完整报告。'}finally{if(revision===rev)copy.disabled=false}});
})();
