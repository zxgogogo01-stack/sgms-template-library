(() => {
  'use strict';
  const form=document.querySelector('[data-instrument]');if(!form)return;form.querySelector('[type=submit]').disabled=false;
  const output=document.querySelector('[data-result-text]'),state=document.querySelector('[data-result-state]'),error=document.querySelector('[data-input-error]'),copy=document.querySelector('[data-copy-result]'),copyState=document.querySelector('[data-result-copy-state]');let revision=0;
  const raw=name=>form.elements[name].value.normalize('NFKC').trim();
  function fail(message,field){const e=new Error(message);e.field=field;throw e;}
  function integer(name,min,max){const s=raw(name);if(!/^(0|[1-9]\d*)$/.test(s)||s.length>8)fail('请填写普通非负整数，不带符号、小数、前导零或指数。',name);const n=Number(s);if(n<min||n>max)fail('此项须为 '+min+'–'+max+' 的整数。',name);return n;}
  function stamp(name){const text=raw(name);if(!/^20\d{2}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(text))fail('使用 2000–2099 年的 UTC 时间 YYYY-MM-DDTHH:mm。',name);const date=new Date(text+':00Z');if(!Number.isFinite(date.getTime())||date.toISOString().slice(0,16)!==text)fail('日期或时间不存在，请核对月、日、小时与分钟。',name);return date.getTime();}
  function numbers(name,maxCount,maxValue,minValue=0n){const text=raw(name);if(!text||text.length>6000)fail('请输入 1–6000 个字符。',name);const parts=text.split(/[\s,]+/).filter(Boolean);if(!parts.length||parts.length>maxCount)fail('最多输入 '+maxCount+' 个数值。',name);return parts.map((s,i)=>{if(!/^(0|[1-9]\d*)$/.test(s)||s.length>19)fail('第 '+(i+1)+' 项不是普通非负整数。',name);const n=BigInt(s);if(n<minValue||n>maxValue)fail('第 '+(i+1)+' 项超出 '+minValue+'–'+maxValue+' 的范围。',name);return n;});}
  function rounded(n,d,places){const scale=10n**BigInt(places),q=(n*scale*2n+d)/(2n*d);if(!places)return String(q);const s=q.toString().padStart(places+1,'0');return s.slice(0,-places)+'.'+s.slice(-places);}
  function calculate(){switch(form.dataset.instrument){
    case 'freshness-window':{
      const issued=stamp('issued'),checked=stamp('checked'),threshold=integer('threshold',1,10080);if(checked<issued)fail('核对时间不能早于发布时间。','checked');const age=(checked-issued)/60000,level=age<=threshold?'新鲜':age<=threshold*2?'待复核':'已过时';
      return ['时效状态：'+level,'相隔分钟：'+age,'新鲜阈值：'+threshold,'阈值占比：'+rounded(BigInt(age)*100n,BigInt(threshold),2)+'%','时区口径：UTC','','时效状态只描述输入时间差，不证明消息真实、来源可靠或仍然适用。'].join('\n');
    }
    case 'line-changes':{
      function textLines(name){const text=form.elements[name].value.replace(/\r\n?/g,'\n');if(text.length>4000)fail('每侧最多 4000 个 UTF-16 代码单元。',name);const lines=text===''?[]:text.split('\n');if(lines.length>80)fail('每侧最多 80 行；末尾换行也会产生一行。',name);return lines;}
      const a=textLines('before'),b=textLines('after');if(!a.length&&!b.length)fail('至少有一侧包含文本。','before');const dp=Array.from({length:a.length+1},()=>new Uint16Array(b.length+1));for(let i=a.length-1;i>=0;i--)for(let j=b.length-1;j>=0;j--)dp[i][j]=a[i]===b[j]?1+dp[i+1][j+1]:Math.max(dp[i+1][j],dp[i][j+1]);
      let i=0,j=0,added=0,removed=0,kept=0;const lines=[];while(i<a.length||j<b.length){if(i<a.length&&j<b.length&&a[i]===b[j]){lines.push('  '+a[i]);i++;j++;kept++;}else if(i<a.length&&(j===b.length||dp[i+1][j]>=dp[i][j+1])){lines.push('- '+a[i++]);removed++;}else{lines.push('+ '+b[j++]);added++;}}
      return ['原稿行数：'+a.length,'新稿行数：'+b.length,'保留：'+kept+' 行','删除：'+removed+' 行','新增：'+added+' 行','','--- 逐行记录（空白也参与比较） ---',...lines,'','只比较行是否完全相同，不判断改动的事实意义。'].join('\n');
    }
    case 'latency-profile':{
      const samples=numbers('samples',300,600000n),limit=integer('limit',0,600000),sorted=[...samples].sort((a,b)=>a<b?-1:a>b?1:0),sum=samples.reduce((a,b)=>a+b,0n),n=samples.length,rank=p=>sorted[Math.ceil(p*n/100)-1],over=samples.filter(v=>v>BigInt(limit)).length;
      return ['样本数：'+n,'最小值：'+sorted[0]+' ms','最大值：'+sorted[n-1]+' ms','平均值：'+rounded(sum,BigInt(n),3)+' ms','P50：'+rank(50)+' ms','P95：'+rank(95)+' ms','P99：'+rank(99)+' ms','严格超过阈值：'+over+' / '+n,'超限比例：'+rounded(BigInt(over)*100n,BigInt(n),2)+'%','','分位值采用最近秩法，不进行线性插值；结果仅描述提供的样本。'].join('\n');
    }
    case 'text-checksum':{
      const text=form.elements.text.value;if(text.length>10000)fail('文本最多 10000 个 UTF-16 代码单元。','text');const bytes=new TextEncoder().encode(text);let crc=0xffffffff;for(const byte of bytes){crc^=byte;for(let bit=0;bit<8;bit++)crc=(crc>>>1)^((crc&1)?0xedb88320:0);}crc=(crc^0xffffffff)>>>0;
      return ['CRC-32：'+crc.toString(16).toUpperCase().padStart(8,'0'),'无符号十进制：'+crc,'UTF-8 字节：'+bytes.length,'UTF-16 代码单元：'+text.length,'Unicode 码点：'+[...text].length,'','CRC-32/ISO-HDLC；空白不删除，文本域换行为 LF。','校验和可能碰撞，不用于签名、密码、真实性证明或安全认证。'].join('\n');
    }
    case 'sequence-gaps':{
      const values=numbers('sequence',100,1000000000000000000n,1n),unique=[...new Set(values.map(String))].map(BigInt).sort((a,b)=>a<b?-1:a>b?1:0),gaps=[];let missing=0n,back=0;
      for(let i=1;i<values.length;i++)if(values[i]<values[i-1])back++;
      for(let i=1;i<unique.length;i++){const count=unique[i]-unique[i-1]-1n;if(count){missing+=count;gaps.push((unique[i-1]+1n)+'–'+(unique[i]-1n)+'（'+count+' 个）');}}
      return ['输入条目：'+values.length,'不同序号：'+unique.length,'重复条目：'+(values.length-unique.length),'相邻回退：'+back,'最小序号：'+unique[0],'最大序号：'+unique.at(-1),'区间内缺失：'+missing,'','缺口区间：',...(gaps.length?gaps:['无']),'','缺口按去重后的排序结果计算，只检查最小到最大序号之间，不推断两端之外。'].join('\n');
    }
    default:throw new Error('Unknown instrument');
  }}
  function invalidate(message){revision++;output.textContent='';error.textContent='';copyState.textContent='';copy.disabled=true;state.textContent=message;form.querySelectorAll('[aria-invalid]').forEach(e=>{e.removeAttribute('aria-invalid');e.removeAttribute('aria-errormessage');});}
  form.addEventListener('input',()=>invalidate('输入已改动，请重新检查。'));form.addEventListener('reset',()=>invalidate('已恢复示例，请重新检查。'));
  form.addEventListener('submit',e=>{e.preventDefault();invalidate('正在检查。');try{output.textContent=calculate();copy.disabled=false;state.textContent='检查完成。';}catch(e){error.textContent=e.field?e.message:'暂时无法检查，请核对输入。';state.textContent='没有可用结果。';const field=e.field&&form.elements[e.field];if(field){field.setAttribute('aria-invalid','true');field.setAttribute('aria-errormessage','tw55-field-error');field.focus();}}});
  copy.addEventListener('click',async()=>{const current=revision,text=output.textContent;if(!text||copy.disabled)return;copy.disabled=true;copyState.textContent='';try{if(!navigator.clipboard?.writeText)throw new Error('Unavailable');await navigator.clipboard.writeText(text);if(current===revision)copyState.textContent='结果已复制。';}catch{if(current===revision)copyState.textContent='复制未获许可，请选择结果手动复制。';}finally{if(current===revision)copy.disabled=false;}});
})();
