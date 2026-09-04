(() => {
  'use strict';
  const form=document.querySelector('[data-instrument]');if(!form)return;
  const result=document.querySelector('[data-result-text]'),state=document.querySelector('[data-result-state]'),error=document.getElementById('bd51-form-error'),copy=document.querySelector('[data-copy-result]'),copyState=document.querySelector('[data-result-copy-state]');
  let generation=0;
  const fail=(message,field='rows')=>{const e=new Error(message);e.field=field;throw e;};
  const value=name=>form.elements[name].value.trim();
  function number(raw,max,decimals,field){
    const pattern=decimals?/^\d+(?:\.\d{1,3})?$/:/^\d+$/;
    if(raw.length>20||!pattern.test(raw)||Number(raw)>max)fail(`请输入 0–${max} 的${decimals?'普通十进制数，最多三位小数':'整数'}。`,field);
    return decimals?Number(raw.split('.')[0])*1000+Number((raw.split('.')[1]||'').padEnd(3,'0')):Number(raw);
  }
  function names(lines,field,max){
    if(!lines.length||lines.length>max)fail(`请输入 1–${max} 项。`,field);
    const seen=new Set();return lines.map(raw=>{const n=raw.normalize('NFKC').trim();if(!n||[...n].length>40)fail('每个名称须为 1–40 个字符。',field);if(seen.has(n))fail(`名称重复：${n}`,field);seen.add(n);return n;});
  }
  function rows(max,limits,decimals){
    const raw=value('rows');if(raw.length>12000)fail('输入过长。');
    const cells=raw.split(/\r?\n/).map(x=>x.trim()).filter(Boolean).map(x=>x.split(',').map(x=>x.trim()));
    if(cells.some(x=>x.length!==3))fail('每行应为名称和两个数值，以英文逗号分隔。');
    const labels=names(cells.map(x=>x[0]),'rows',max);return cells.map((c,i)=>[labels[i],number(c[1],limits[0],decimals,'rows'),number(c[2],limits[1],decimals,'rows')]);
  }
  const fixed=(a,b)=>{const q=(a*2n+b)/(2n*b);return `${q/1000n}.${String(q%1000n).padStart(3,'0')}`;};
  function weighted(){const data=rows(50,[100,100],true),weight=data.reduce((s,r)=>s+BigInt(r[2]),0n);if(weight===0n)fail('权重合计必须大于零。');const total=data.reduce((s,r)=>s+BigInt(r[1])*BigInt(r[2]),0n);return `总分：${fixed(total,weight)} / 100\n项目数：${data.length}\n\n各项贡献\n`+data.map(([n,s,w])=>`${n}：${fixed(BigInt(s)*BigInt(w),weight)}`).join('\n');}
  function frontier(){const data=rows(80,[1000000,1000000],true);const dominated=data.map((p,i)=>data.findIndex((q,j)=>i!==j&&q[1]<=p[1]&&q[2]>=p[2]&&(q[1]<p[1]||q[2]>p[2])));const kept=data.filter((p,i)=>dominated[i]===-1);return `前沿方案：${kept.length} / ${data.length}\n${kept.map(p=>`${p[0]} · 成本 ${p[1]/1000} · 质量 ${p[2]/1000}`).join('\n')}\n\n支配关系\n`+(data.map((p,i)=>dominated[i]<0?'':`${p[0]} ← ${data[dominated[i]][0]}`).filter(Boolean).join('\n')||'无被支配方案');}
  function contingency(){const [a,b,c,d]=['a','b','c','d'].map(n=>number(value(n),1000000,false,n)),total=a+b+c+d;if(!total)fail('四格总计必须大于零。','a');const den=Math.sqrt((a+b)*(c+d)*(a+c)*(b+d)),pct=(n,d)=>d?(n/d*100).toFixed(2)+'%':'未定义';return `总计：${total}\nA 条件下 B：${pct(a,a+b)}\n非 A 条件下 B：${pct(c,c+d)}\nphi：${den?Math.max(-1,Math.min(1,(a*d-b*c)/den)).toFixed(4):'未定义'}\n\n关联不代表因果。`;}
  function overlap(){const read=field=>{const raw=value(field);if(raw.length>12000)fail('输入过长。',field);return names(raw.split(/\r?\n/).map(x=>x.trim()).filter(Boolean),field,100);};const left=read('left'),right=read('right'),k=number(value('k'),100,false,'k');if(!k||k>Math.min(left.length,right.length))fail('K 必须至少为 1，且不超过任一清单长度。','k');const a=left.slice(0,k),b=right.slice(0,k),common=a.filter(n=>b.includes(n)),distance=common.reduce((s,n)=>s+Math.abs(a.indexOf(n)-b.indexOf(n)),0);return `共同项：${common.length} / ${k}\n共同项比例：${(common.length/k*100).toFixed(2)}%\nJaccard：${(common.length/(2*k-common.length)*100).toFixed(2)}%\n总名次差：${distance}\n\n`+(common.map(n=>`${n}：${a.indexOf(n)+1} ↔ ${b.indexOf(n)+1}，差 ${Math.abs(a.indexOf(n)-b.indexOf(n))}`).join('\n')||'没有共同项');}
  function combination(){const data=rows(40,[200,10000],false);if(data.some(p=>p[1]===0))fail('项目容量必须至少为 1。');const cap=number(value('capacity'),500,false,'capacity');if(!cap)fail('总容量必须至少为 1。','capacity');const dp=Array(cap+1).fill(null);dp[0]={score:0,items:[]};data.forEach((p,i)=>{for(let c=cap;c>=p[1];c--){const prev=dp[c-p[1]];if(prev&&(!dp[c]||prev.score+p[2]>dp[c].score))dp[c]={score:prev.score+p[2],items:[...prev.items,i]};}});let best=dp[0],used=0;dp.forEach((e,c)=>{if(e&&e.score>best.score){best=e;used=c;}});return `最高总价值：${best.score}\n使用容量：${used} / ${cap}\n剩余容量：${cap-used}\n选择项目：${best.items.length}\n\n`+(best.items.map(i=>`${data[i][0]} · 容量 ${data[i][1]} · 价值 ${data[i][2]}`).join('\n')||'空组合');}
  const calculate={'weighted-score':weighted,'pareto-frontier':frontier,'contingency-count':contingency,'top-k-overlap':overlap,'resource-combination':combination};
  function invalidate(message){generation++;result.textContent='';error.textContent='';copyState.textContent='';copy.disabled=true;state.textContent=message;form.querySelectorAll('[aria-invalid]').forEach(el=>el.removeAttribute('aria-invalid'));}
  form.addEventListener('input',()=>invalidate('输入已变化，请重新计算'));
  form.addEventListener('reset',()=>invalidate('已恢复示例，等待计算'));
  form.addEventListener('submit',event=>{event.preventDefault();invalidate('正在计算');try{result.textContent=calculate[form.dataset.instrument]();state.textContent='计算完成';copy.disabled=false;}catch(e){state.textContent='请修正输入';error.textContent=e.message;const input=form.elements[e.field||'rows'];if(input){input.setAttribute('aria-invalid','true');input.focus();}}});
  copy.addEventListener('click',async()=>{if(copy.disabled||!result.textContent)return;const ticket=generation;try{await navigator.clipboard.writeText(result.textContent);if(ticket===generation)copyState.textContent='结果已复制';}catch{if(ticket===generation)copyState.textContent='无法访问剪贴板，请手动选择结果复制。';}});
})();
