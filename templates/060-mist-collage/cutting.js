/* Five local material tools. Dynamic output is plain text, never HTML. */
(function(){
"use strict";
const form=document.querySelector('[data-instrument]');if(!form)return;
const result=document.querySelector('[data-result-text]'),state=document.querySelector('[data-result-state]'),error=document.querySelector('[data-input-error]'),copy=document.querySelector('[data-copy-result]'),copyState=document.querySelector('[data-result-copy-state]');
const controls=[...form.querySelectorAll('input,select,textarea')];let revision=0,output='',snapshot=controls.map(e=>e.value).join('\u0000');
const field=name=>form.elements.namedItem(name),value=name=>field(name).value;
function fail(name,message){throw {field:name,message};}
function normalized(name,max=8000){const raw=value(name);if(raw.length>max)fail(name,'输入太长，请缩减到 '+max+' 个字符以内。');return raw.normalize('NFKC').trim();}
function integer(name,min,max){const raw=normalized(name,20);if(!/^(0|[1-9]\d*)$/.test(raw)||Number(raw)<min||Number(raw)>max)fail(name,'请输入 '+min+'–'+max+' 的普通整数，不使用前导零、符号、小数或指数。');return Number(raw);}
function mode(name,choices){const raw=value(name);if(!choices.includes(raw))fail(name,'请从已有选项中选择。');return raw;}
function clear(){revision++;output='';result.textContent='';error.textContent='';copyState.textContent='';copy.disabled=true;state.textContent='材料已改变，等待重新整理。';for(const e of controls){e.removeAttribute('aria-invalid');e.removeAttribute('aria-errormessage');}}
function changed(){const now=controls.map(e=>e.value).join('\u0000');if(now!==snapshot){clear();snapshot=now;}}
form.addEventListener('input',changed);form.addEventListener('change',changed);form.addEventListener('reset',()=>{clear();state.textContent='示例已恢复，等待整理。';setTimeout(()=>{snapshot=controls.map(e=>e.value).join('\u0000');},0);});
function links(){const raw=value('urls');if(raw.length>12000)fail('urls','总输入最多 12000 字符。');const rows=raw.split(/\r\n|\r|\n/).map((text,i)=>({text:text.trim(),line:i+1})).filter(r=>r.text);if(rows.length<1||rows.length>30)fail('urls','请输入 1–30 个非空链接行。');const keep=mode('fragment',['drop','keep'])==='keep',seen=new Set(),hosts=new Set(),valid=[],invalid=[];let duplicates=0;
 for(const row of rows){const s=row.text;let reason='';if(s.length>2000)reason='单行超过 2000 字符';else if(/[\s\\\u0000-\u001f\u007f-\u009f]/u.test(s))reason='含空白、控制字符或反斜杠';else if(/%(?![\da-f]{2})/i.test(s))reason='百分号转义格式错误';else if(!/^https?:\/\//i.test(s))reason='需要完整 HTTP/HTTPS 地址';let u;
 if(!reason){try{u=new URL(s);if(!['http:','https:'].includes(u.protocol)||!u.hostname)reason='地址格式不受支持';else if(u.username||u.password)reason='不接收含账户凭据的地址';}catch{reason='URL 格式无法解析';}}
 if(reason){invalid.push('第 '+row.line+' 行：'+reason);continue;}if(!keep)u.hash='';if(seen.has(u.href)){duplicates++;continue;}seen.add(u.href);hosts.add(u.hostname);valid.push(u.href);}
 return '候选行：'+rows.length+'\n保留链接：'+valid.length+'\n域名数：'+hosts.size+'\n重复行：'+duplicates+'\n无效行：'+invalid.length+'\n片段：'+(keep?'保留':'删除')+'\n\n保留列表：\n'+(valid.join('\n')||'无')+'\n\n未接收：\n'+(invalid.join('\n')||'无')+'\n\n只验证地址格式；不访问、不认定真实或安全。';
}
function tags(){const raw=normalized('cards'),rows=raw?raw.split(/\r\n|\r|\n/):[];if(rows.length<1||rows.length>40)fail('cards','请输入 1–40 张卡片。');const cards=[],names=new Set(),labels=[];const name=s=>{const t=s.trim();if(!t||[...t].length>24||/[,|\u0000-\u001f\u007f-\u009f]/u.test(t))fail('cards','卡名与标签须为 1–24 码点，不含分隔符或控制字符。');return t;};
 for(const row of rows){const parts=row.split(',');if(parts.length!==2)fail('cards','每行须为 卡名,标签|标签；不留中间空行。');const id=name(parts[0]);if(names.has(id))fail('cards','卡片名重复：'+id);names.add(id);const rowTags=parts[1].split('|').map(name);if(new Set(rowTags).size!==rowTags.length)fail('cards','同张卡片的标签不能重复。');for(const t of rowTags)if(!labels.includes(t))labels.push(t);if(labels.length>12)fail('cards','最多 12 个不同标签。');cards.push(new Set(rowTags));}
 const counts=labels.map(t=>cards.filter(s=>s.has(t)).length),matrix=labels.map(a=>labels.map(b=>cards.filter(s=>s.has(a)&&s.has(b)).length)),pairs=[];
 for(let a=0;a<labels.length;a++)for(let b=a+1;b<labels.length;b++){const both=matrix[a][b],union=counts[a]+counts[b]-both;pairs.push(labels[a]+' ∩ '+labels[b]+'：'+both+'；交并比 '+both+'/'+union+'（'+(both/union*100).toFixed(2)+'%）');}
 return '卡片数：'+cards.length+'\n标签数：'+labels.length+'\n\n首次出现顺序与频次：\n'+labels.map((t,i)=>(i+1)+'. '+t+'：'+counts[i]).join('\n')+'\n\n共现矩阵（行列同上）：\n'+matrix.map((row,i)=>labels[i]+' | '+row.join(' · ')).join('\n')+'\n\n标签对：\n'+(pairs.join('\n')||'仅一个标签，没有标签对。')+'\n\n共现不代表语义相关、权威性或因果。';
}
function windows(){const raw=value('text');if(!raw.length||raw.length>8000)fail('text','请输入 1–4000 码点，最多 8000 UTF-16 单元。');const chars=[...raw];if(chars.length>4000)fail('text','文本超过 4000 码点。');if(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f\ud800-\udfff]/u.test(raw))fail('text','不接收控制字符或孤立代理项；换行和制表可保留。');const size=integer('size',2,500),overlap=integer('overlap',0,size-1),step=size-overlap;const count=chars.length<=size?1:1+Math.ceil((chars.length-size)/step);if(count>500)fail('overlap','将产生 '+count+' 窗，超过 500；请减少重叠或调大窗口。');let start=0,total=0,index=0;const chunks=[];while(start<chars.length){const end=Math.min(chars.length,start+size);index++;total+=end-start;chunks.push('窗口 '+index+' / '+(start+1)+'–'+end+'\n'+chars.slice(start,end).join(''));if(end===chars.length)break;start+=step;}
 return '文本码点：'+chars.length+'\n窗口数：'+chunks.length+'\n步长：'+step+'\n总展示码点：'+total+'\n重复展示码点：'+(total-chars.length)+'\n\n'+chunks.join('\n\n')+'\n\n按码点切分，不保证字素或句子完整。';
}
function contrast(){const hex=name=>{let s=normalized(name,20).replace(/^#/,'');if(!/^[\da-f]{6}$/i.test(s))fail(name,'请输入六位十六进制 RGB 颜色，可带 #。');return '#'+s.toUpperCase();},fg=hex('foreground'),bg=hex('background');const lum=hex=>{const a=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4);return .2126*a[0]+.7152*a[1]+.0722*a[2];};const l1=lum(fg),l2=lum(bg),ratio=(Math.max(l1,l2)+.05)/(Math.min(l1,l2)+.05),status=n=>ratio>=n?'通过':'未通过';
 return '文字色：'+fg+'\n纸面色：'+bg+'\n对比度：'+ratio.toFixed(6)+':1\n\nAA 普通文字（4.5）：'+status(4.5)+'\nAA 大字（3）：'+status(3)+'\nAAA 普通文字（7）：'+status(7)+'\nAAA 大字（4.5）：'+status(4.5)+'\n\n阈值按未舍入比值判断。\n大字：18pt，或粗体 14pt。\n仅评估纯色文字对比，不代表整页 WCAG 合规。';
}
function fitImage(){const sw=BigInt(integer('sourceWidth',1,20000)),sh=BigInt(integer('sourceHeight',1,20000)),tw=BigInt(integer('targetWidth',1,20000)),th=BigInt(integer('targetHeight',1,20000)),fit=mode('fit',['cover','contain']);const wider=tw*sh>=th*sw,byWidth=fit==='cover'?wider:!wider,n=byWidth?tw:th,d=byWidth?sw:sh;
 const fmt=(num,den=1n)=>{const sign=num<0n?'-':'',abs=num<0n?-num:num,cents=(abs*200n+den)/(2n*den);return (cents?sign:'')+(cents/100n)+'.'+String(cents%100n).padStart(2,'0');};const gcd=(a,b)=>{while(b){const r=a%b;a=b;b=r;}return a;},g=gcd(n,d);
 const crop=fit==='cover'?[fmt(sw*n-tw*d,2n*n),fmt(sh*n-th*d,2n*n),fmt(tw*d,n),fmt(th*d,n)]:['0.00','0.00',fmt(sw),fmt(sh)];
 return '方式：'+(fit==='cover'?'铺满裁切':'完整放入')+'\n原图：'+sw+' × '+sh+' px\n纸卡：'+tw+' × '+th+' px\n缩放比例：'+n/g+'/'+d/g+'\n\n显示尺寸：'+fmt(sw*n,d)+' × '+fmt(sh*n,d)+' px\n显示偏移 X：'+fmt(tw*d-sw*n,2n*d)+' px\n显示偏移 Y：'+fmt(th*d-sh*n,2n*d)+' px\n\n原图裁切框：\nX：'+crop[0]+' px\nY：'+crop[1]+' px\n宽：'+crop[2]+' px\n高：'+crop[3]+' px\n\n居中几何建议；未上传、读取或生成图片。';
}
const run=[links,tags,windows,contrast,fitImage][Number(form.dataset.instrument)];
form.querySelector('button[type=submit]').disabled=false;
form.addEventListener('submit',e=>{e.preventDefault();clear();try{output=run();result.textContent=output;copy.disabled=false;state.textContent='整理完成，仅在本页保留。';}catch(err){const input=field(err.field)||controls[0];error.textContent=err.message||'材料格式无法处理，请检查输入。';input.setAttribute('aria-invalid','true');input.setAttribute('aria-errormessage','mc60-field-error');state.textContent='尚未生成结果。';input.focus();}});
copy.addEventListener('click',async()=>{if(!output)return;const epoch=revision,text=output;copy.disabled=true;try{await navigator.clipboard.writeText(text);if(epoch===revision)copyState.textContent='已复制，可粘贴使用。';}catch{if(epoch===revision)copyState.textContent='无法复制，请手动选择结果文字。';}finally{if(epoch===revision)copy.disabled=false;}});
})();
