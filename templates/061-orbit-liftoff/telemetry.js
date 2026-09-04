/* Local integer instruments. Inputs and output are never uploaded or persisted. */
(function(){
"use strict";
const form=document.querySelector("[data-instrument]");if(!form)return;
const result=document.querySelector("[data-result-text]"),state=document.querySelector("[data-result-state]"),error=document.querySelector("[data-input-error]"),copy=document.querySelector("[data-copy-result]"),copyState=document.querySelector("[data-result-copy-state]");
const controls=[...form.querySelectorAll("input,select,textarea")];let revision=0,output="",snapshot=controls.map(e=>e.value).join("\u0000");
const field=name=>form.elements.namedItem(name),value=name=>field(name).value;
function fail(name,message){throw {field:name,message};}
function normalized(name,max=3000){const raw=value(name);if(raw.length>max)fail(name,"输入最多 "+max+" 字符。");return raw.normalize("NFKC").trim();}
function number(raw,min,max,name){if(!/^(0|[1-9]\d*)$/.test(raw)||!Number.isSafeInteger(Number(raw))||Number(raw)<min||Number(raw)>max)fail(name,"请输入 "+min+"–"+max+" 的普通整数，不含前导零、符号、小数或指数。");return Number(raw);}
function integer(name,min,max){return number(normalized(name,20),min,max,name);}
function mode(name,choices){const raw=value(name);if(!choices.includes(raw))fail(name,"请从已有选项中选择。");return raw;}
function rows(name,min,max,limit=3000){const raw=normalized(name,limit),list=raw?raw.split(/\r\n|\r|\n/).map(s=>s.trim()):[];if(list.length<min||list.length>max||list.some(s=>!s))fail(name,"请输入 "+min+"–"+max+" 行，中间不要留空行。");return list;}
function clear(){revision++;output="";result.textContent="";error.textContent="";copyState.textContent="";copy.disabled=true;state.textContent="参数已改变，等待重新计算。";for(const e of controls){e.removeAttribute("aria-invalid");e.removeAttribute("aria-errormessage");}}
function changed(){const now=controls.map(e=>e.value).join("\u0000");if(now!==snapshot){clear();snapshot=now;}}
form.addEventListener("input",changed);form.addEventListener("change",changed);form.addEventListener("reset",()=>{clear();state.textContent="示例已恢复，等待计算。";setTimeout(()=>{snapshot=controls.map(e=>e.value).join("\u0000");},0);});
function hash(value){let result=2166136261;for(const character of value){const point=character.codePointAt(0);result^=point;result=Math.imul(result,16777619);if(point>65535){result^=point>>>16;result=Math.imul(result,16777619);}}return result>>>0;}
function sample(){const total=integer("total",1,10000),size=integer("size",1,Math.min(500,total)),raw=value("seed");if(raw.length>128)fail("seed","种子太长。");const seed=raw.normalize("NFKC");if(!seed||[...seed].length>32||/[\s\u0000-\u001f\u007f-\u009f\ud800-\udfff]/u.test(seed))fail("seed","种子须为 1–32 码点，不含空白、控制字符或孤立代理项。");let state=hash(seed+"|"+total+"|"+size)||0x6d2b79f5;const random=()=>{state^=state<<13;state^=state>>>17;state^=state<<5;return(state>>>0)/4294967296;},pool=Array.from({length:total},(_,i)=>i+1);for(let i=0;i<size;i++){const j=i+Math.floor(random()*(total-i));[pool[i],pool[j]]=[pool[j],pool[i]];}const picked=pool.slice(0,size).sort((a,b)=>a-b);
return "总记录数："+total+"\n样本数："+size+"\n覆盖比例："+(size/total*100).toFixed(2)+"%\n种子："+seed+"\n核对摘要："+hash(picked.join(",")).toString(16).toUpperCase().padStart(8,"0")+"\n\n升序索引：\n"+picked.join(", ")+"\n\n确定性伪随机复核索引，不作密码学随机、公平抽签或统计结论。";
}
function ring(){const modulus=integer("modulus",2,1000000000),list=rows("readings",2,80).map(s=>number(s,0,modulus-1,"readings"));let total=0n,descents=0;const report=[];for(let i=1;i<list.length;i++){const delta=(list[i]-list[i-1]+modulus)%modulus;total+=BigInt(delta);if(list[i]<list[i-1])descents++;report.push(i+". "+list[i-1]+" → "+list[i]+" | 最小增量 "+delta+" | 累计 "+total);}
return "模数："+modulus+"\n读数个数："+list.length+"\n下降段："+descents+"\n累计最小增量："+total+"\n\n"+report.join("\n")+"\n\n仅计算最小向前增量；相同读数不证明没有活动，未推断重置或完整绕圈次数。";
}
function bits(){const radix=mode("radix",["2","10","16"]),width=Number(mode("width",["8","16","32","64"])),raw=normalized("value",64),pattern={"2":/^[01]{1,64}$/,"10":/^(0|[1-9]\d{0,19})$/,"16":/^[\da-f]{1,16}$/i}[radix];if(!pattern.test(raw))fail("value","输入须符合所选进制，不含前缀、符号、小数、空格或指数；十进制不含前导零。");const n=BigInt((radix==="2"?"0b":radix==="16"?"0x":"")+raw);if(n>=(1n<<BigInt(width)))fail("value","数值超出 "+width+" 位无符号范围，不执行截断。");const hex=n.toString(16).toUpperCase().padStart(width/4,"0"),binary=n.toString(2).padStart(width,"0"),bytes=hex.match(/../g),ones=[...binary].filter(s=>s==="1").length;
return "位宽："+width+"\n十进制："+n+"\n十六进制："+hex+"\n二进制："+binary.match(/.{8}/g).join(" ")+"\n高位字节在前："+bytes.join(" ")+"\n低位字节在前："+[...bytes].reverse().join(" ")+"\n置位数："+ones+"\n\n仅作无符号整数与字节顺序转换，不解释协议、符号位或浮点编码。";
}
const gcd=(a,b)=>{while(b){[a,b]=[b,a%b];}return a;},mod=(a,m)=>(a%m+m)%m;
function inverse(a,m){let oldR=a,r=m,oldS=1n,s=0n;while(r){const q=oldR/r;[oldR,r]=[r,oldR-q*r];[oldS,s]=[s,oldS-q*s];}return mod(oldS,m);}
function rendezvous(){const list=rows("clocks",2,6,2000),seen=new Set(),clocks=list.map(line=>{const parts=line.split(",");if(parts.length!==3)fail("clocks","每行须为 名称,周期,相位。");const [name,period,phase]=parts;if(!name||[...name].length>20||/[\s\u0000-\u001f\u007f-\u009f\ud800-\udfff]/u.test(name))fail("clocks","名称须为 1–20 码点，不含空白、控制字符或孤立代理项。");if(seen.has(name))fail("clocks","规范化后的名称必须唯一。");seen.add(name);const n=number(period,1,1000000,"clocks"),b=number(phase,0,n-1,"clocks");return {name,n:BigInt(n),b:BigInt(b)};});let a=0n,m=1n;
for(const c of clocks){const g=gcd(m,c.n),diff=c.b-a;if(diff%g!==0n)return "约束数："+clocks.length+"\n没有共同相位。\n\n相位差不能被对应周期最大公约数整除；这是有效的无解结果。\n只处理理想整数周期，不判断真实设备状态。";const reduced=c.n/g,k=reduced===1n?0n:mod(diff/g*inverse(m/g,reduced),reduced);a=mod(a+m*k,m*reduced);m*=reduced;}
return "约束数："+clocks.length+"\n首个非负时点："+a+"\n重复间隔："+m+"\n后续时点："+(a+m)+"、"+(a+2n*m)+"\n\n"+clocks.map(c=>c.name+" | t mod "+c.n+" = "+c.b).join("\n")+"\n\n理想整数周期的数学结果；不包含时区、抖动、延迟或真实设备约束。";
}
function median(){const list=rows("samples",3,200).map(raw=>{if(!/^(0|-?[1-9]\d*)$/.test(raw)||Math.abs(Number(raw))>1000000)fail("samples","样本须为 -1000000 到 1000000 的普通整数，不接受正号、负零、前导零、小数或指数。");return Number(raw);}),width=integer("window",3,Math.min(21,list.length));if(width%2===0)fail("window","窗口大小必须是奇数。");const report=[];for(let start=0;start+width<=list.length;start++){const sorted=list.slice(start,start+width).sort((a,b)=>a-b);report.push("中心 "+(start+(width-1)/2+1)+" | 中值 "+sorted[(width-1)/2]+" | 最小 "+sorted[0]+" | 最大 "+sorted[width-1]);}
return "样本数："+list.length+"\n窗口大小："+width+"\n完整窗口数："+report.length+"\n\n"+report.join("\n")+"\n\n只扫描完整窗口，不补边缘；原始序列未重排，中值不判断信号真伪或故障原因。";
}
const run=[sample,ring,bits,rendezvous,median][Number(form.dataset.instrument)];
form.querySelector("button[type=submit]").disabled=false;
form.addEventListener("submit",e=>{e.preventDefault();clear();snapshot=controls.map(e=>e.value).join("\u0000");try{output=run();result.textContent=output;copy.disabled=false;state.textContent="计算完成，仅在本页保留。";}catch(err){const input=field(err.field)||controls[0];error.textContent=err.message||"输入格式无法处理，请检查参数。";input.setAttribute("aria-invalid","true");input.setAttribute("aria-errormessage","ol61-field-error");state.textContent="尚未生成结果。";input.focus();}});
copy.addEventListener("click",async()=>{if(!output)return;const epoch=revision,text=output;copy.disabled=true;try{await navigator.clipboard.writeText(text);if(epoch===revision)copyState.textContent="已复制，可粘贴使用。";}catch{if(epoch===revision)copyState.textContent="无法复制，请手动选择结果文字。";}finally{if(epoch===revision)copy.disabled=false;}});
})();
