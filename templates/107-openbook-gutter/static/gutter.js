(function(){
  "use strict";
  const root=document.documentElement;
  const lengthOf=value=>[...value].length;
  const empty=node=>{while(node&&node.firstChild)node.firstChild.remove()};
  const copy=async(value,status,message)=>{
    try{
      if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(value);
      else{
        const field=document.createElement("textarea");field.value=value;field.setAttribute("readonly","");field.style.position="fixed";field.style.opacity="0";document.body.append(field);field.select();const ok=document.execCommand("copy");field.remove();if(!ok)throw new Error("copy unavailable")
      }
      if(status)status.textContent=message
    }catch(_error){if(status)status.textContent="复制失败，请手动选择文字。"}
  };
  const initMode=()=>{
    const buttons=[...document.querySelectorAll("[data-ob107-mode-toggle]")];if(!buttons.length)return;
    const apply=value=>{const mode=value==="blueprint"?"blueprint":"folio";root.dataset.ob107Mode=mode;buttons.forEach(button=>{button.setAttribute("aria-pressed",String(mode==="blueprint"));button.textContent=mode==="blueprint"?"恢复象牙纸页":"切换蓝晒校样"})};
    let saved=null;try{saved=localStorage.getItem("ob107-mode")}catch(_error){}apply(saved||root.dataset.ob107Mode);
    buttons.forEach(button=>button.addEventListener("click",()=>{const mode=root.dataset.ob107Mode==="blueprint"?"folio":"blueprint";apply(mode);try{localStorage.setItem("ob107-mode",mode)}catch(_error){}}))
  };
  const initMenu=()=>{
    const button=document.querySelector(".ob107-menu"),nav=document.querySelector("#ob107-nav");if(!button||!nav)return;
    const set=(open,returnFocus)=>{button.setAttribute("aria-expanded",String(open));button.querySelector("span").textContent=open?"收起装帧目录":"展开装帧目录";document.body.dataset.ob107Menu=open?"open":"closed";if(open)nav.querySelector("a")?.focus();else if(returnFocus)button.focus()};
    button.addEventListener("click",()=>set(button.getAttribute("aria-expanded")!=="true",false));document.addEventListener("keydown",event=>{if(event.key==="Escape"&&button.getAttribute("aria-expanded")==="true")set(false,true)});nav.addEventListener("click",event=>{if(event.target.closest("a")&&matchMedia("(max-width:940px)").matches)set(false,false)})
  };
  const initProgress=()=>{
    const meter=document.querySelector("[data-ob107-progress]"),label=document.querySelector("[data-ob107-progress-label]");if(!meter||!label)return;
    const update=()=>{const range=Math.max(1,document.documentElement.scrollHeight-innerHeight),value=Math.max(0,Math.min(100,Math.round(scrollY/range*100)));meter.style.setProperty("--ob107-read",value+"%");label.value=value+"%";label.textContent=value+"%"};update();addEventListener("scroll",update,{passive:true});addEventListener("resize",update)
  };
  const initCopies=()=>{
    const storyButton=document.querySelector("[data-ob107-copy-story]"),storyNote=document.querySelector("[data-ob107-story-note]");if(storyButton&&storyNote)storyButton.addEventListener("click",()=>copy(storyNote.textContent.trim(),document.querySelector("[data-ob107-story-status]"),"纸页交接已复制。"));
    const legalButton=document.querySelector("[data-ob107-copy-legal]"),legalNote=document.querySelector("[data-ob107-legal-note]");if(legalButton&&legalNote)legalButton.addEventListener("click",()=>copy(legalNote.textContent.trim(),document.querySelector("[data-ob107-legal-status]"),"版权页摘要已复制。"))
  };
  const initSignatures=()=>{
    const form=document.querySelector("[data-ob107-signature-form]");if(!form)return;
    const input=form.querySelector("#ob107-rows"),error=form.querySelector("[data-ob107-error]"),status=form.querySelector("[data-ob107-form-status]"),report=document.querySelector(".ob107-report"),state=report.querySelector("[data-ob107-report-state]"),count=report.querySelector("[data-ob107-count]"),span=report.querySelector("[data-ob107-span]"),gapPages=report.querySelector("[data-ob107-gap-pages]"),overlapPages=report.querySelector("[data-ob107-overlap-pages]"),flagSummary=report.querySelector("[data-ob107-flag-summary]"),flagList=report.querySelector("[data-ob107-flag-list]"),signatureSummary=report.querySelector("[data-ob107-signature-summary]"),signatureList=report.querySelector("[data-ob107-signature-list]"),note=report.querySelector("[data-ob107-note]"),copyButton=report.querySelector("[data-ob107-copy-report]"),copyStatus=report.querySelector("[data-ob107-copy-status]");
    let last="";
    const presets={continuous:"S01 | 1 | 16\nS02 | 17 | 32\nS03 | 33 | 48\nS04 | 49 | 64",gap:"S01 | 1 | 16\nS02 | 21 | 36\nS03 | 37 | 52",overlap:"S01 | 1 | 16\nS02 | 13 | 28\nS03 | 29 | 44",irregular:"S01 | 1 | 14\nS02 | 15 | 31\nS03 | 32 | 47"};
    const key=value=>value.toLocaleLowerCase().replace(/\s+/gu," ");
    const compress=values=>{if(!values.length)return[];const sorted=[...values].sort((a,b)=>a-b),ranges=[];let start=sorted[0],end=sorted[0];for(let index=1;index<sorted.length;index++){const value=sorted[index];if(value===end+1)end=value;else{ranges.push(start===end?String(start):start+"–"+end);start=end=value}}ranges.push(start===end?String(start):start+"–"+end);return ranges};
    const clear=(flagText,tableText)=>{count.textContent=gapPages.textContent=overlapPages.textContent="0";span.textContent="0";flagSummary.textContent=flagText;signatureSummary.textContent=tableText;empty(flagList);const li=document.createElement("li");li.textContent="报告生成后在此显示断页、重叠与非四页倍数书帖。";flagList.append(li);empty(signatureList);const tr=document.createElement("tr"),td=document.createElement("td");td.colSpan=4;td.textContent="等待书帖输入。";tr.append(td);signatureList.append(tr)};
    const fail=message=>{error.textContent=message;status.textContent="配页报告未生成。";report.dataset.ready="false";state.textContent="INVALID";clear("请修正输入","等待有效数据");note.textContent="旧报告已失效；请修正格式、范围、字段长度或重复书帖编号。";copyButton.disabled=true;copyStatus.textContent="";last="";input.focus()};
    const render=items=>{
      const ordered=[...items].sort((a,b)=>a.start-b.start||a.line-b.line),min=ordered[0].start,max=Math.max(...ordered.map(item=>item.end)),coverage=new Map();
      ordered.forEach(item=>{for(let page=item.start;page<=item.end;page++)coverage.set(page,(coverage.get(page)||0)+1)});
      const gaps=[],overlaps=[];for(let page=min;page<=max;page++){const uses=coverage.get(page)||0;if(uses===0)gaps.push(page);else if(uses>1)overlaps.push(page)}
      const gapRanges=compress(gaps),overlapRanges=compress(overlaps),irregular=ordered.filter(item=>item.pages%4!==0),findings=[];
      gapRanges.forEach(range=>findings.push("断页范围："+range+"。"));overlapRanges.forEach(range=>findings.push("重叠页范围："+range+"。"));irregular.forEach(item=>findings.push("书帖“"+item.id+"”共 "+item.pages+" 页，不是四页倍数，请复核折手与空白页。"));
      const types=[gapRanges.length>0,overlapRanges.length>0,irregular.length>0].filter(Boolean).length,stateText=!findings.length?"CONTINUOUS":types>1?"REVIEW "+findings.length:gapRanges.length?"GAPS "+gaps.length:overlapRanges.length?"OVERLAPS "+overlaps.length:"IMPOSITION "+irregular.length;
      error.textContent="";status.textContent="配页报告已生成。";report.dataset.ready="true";state.textContent=stateText;count.textContent=String(items.length);span.textContent=min+"–"+max;gapPages.textContent=String(gaps.length);overlapPages.textContent=String(overlaps.length);flagSummary.textContent=findings.length?findings.length+" 条配页提示":"页码连续且无机械重叠";
      empty(flagList);if(findings.length)findings.slice(0,40).forEach(text=>{const li=document.createElement("li");li.textContent=text;flagList.append(li)});else{const li=document.createElement("li");li.textContent="未发现断页、重叠或非四页倍数书帖；仍需人工核对拼版、空白页和实物。";flagList.append(li)}if(findings.length>40){const li=document.createElement("li");li.textContent="界面仅显示前 40 条；复制报告包含全部 "+findings.length+" 条提示。";flagList.append(li)}
      signatureSummary.textContent=min+"–"+max+" / "+items.reduce((sum,item)=>sum+item.pages,0)+" 个书帖页位";empty(signatureList);ordered.slice(0,40).forEach(item=>{const tr=document.createElement("tr"),id=document.createElement("td"),range=document.createElement("td"),pages=document.createElement("td"),imposition=document.createElement("td");id.textContent=item.id;range.textContent=item.start+"–"+item.end;pages.textContent=String(item.pages);imposition.textContent=item.pages%4===0?"四页倍数":"复核";tr.append(id,range,pages,imposition);signatureList.append(tr)});if(ordered.length>40){const tr=document.createElement("tr"),td=document.createElement("td");td.colSpan=4;td.textContent="界面仅显示前 40 个书帖；复制报告包含全部 "+ordered.length+" 个。";tr.append(td);signatureList.append(tr)}
      note.textContent="共 "+items.length+" 个书帖，版心范围 "+min+"–"+max+"；断页 "+gaps.length+" 页，重叠 "+overlaps.length+" 页，非四页倍数书帖 "+irregular.length+" 个。机械连续不代表实物配页完成。";
      last=["书帖页码连续性报告","","书帖数量："+items.length,"版心范围："+min+"–"+max,"断页页数："+gaps.length,"重叠页数："+overlaps.length,"非四页倍数书帖："+irregular.length,"状态："+stateText,"","配页提示：",...(findings.length?findings:["未发现断页、重叠或非四页倍数书帖；仍需人工核对。"]),"","书帖顺序：",...ordered.map(item=>item.id+" | "+item.start+" | "+item.end+" | "+item.pages+" 页"),"","提示：本报告只检查当前输入的页码范围、连续性、重叠与四页倍数；不验证印刷拼版、折手方式、纸张方向、装订结构、空白页、版本对应、实物完整性、来源或权利。"].join("\n");copyButton.disabled=false;copyStatus.textContent=""
    };
    const parse=()=>{
      const normalized=input.value.normalize("NFKC");if(lengthOf(normalized)>8000)return fail("书帖总输入不能超过 8000 个 Unicode 字符。");const rows=normalized.split(/\r?\n/).map((text,index)=>({text:text.trim(),line:index+1})).filter(row=>row.text);if(rows.length<2)return fail("至少需要 2 个非空书帖。");if(rows.length>80)return fail("最多只能校验 80 个非空书帖。");
      const seen=new Set(),items=[];for(const row of rows){const parts=row.text.split("|");if(parts.length!==3)return fail("第 "+row.line+" 行须使用“书帖编号 | 起页 | 止页”格式。");const id=parts[0].trim(),startText=parts[1].trim(),endText=parts[2].trim(),idKey=key(id);if(lengthOf(id)<1||lengthOf(id)>20)return fail("第 "+row.line+" 行书帖编号须为 1–20 个 Unicode 字符。");if(seen.has(idKey))return fail("第 "+row.line+" 行书帖编号与前文归一后重复。");if(!/^[1-9]\d*$/.test(startText)||!Number.isSafeInteger(Number(startText))||Number(startText)>9999)return fail("第 "+row.line+" 行起页须为 1–9999 的无前导零整数。");if(!/^[1-9]\d*$/.test(endText)||!Number.isSafeInteger(Number(endText))||Number(endText)>9999)return fail("第 "+row.line+" 行止页须为 1–9999 的无前导零整数。");const start=Number(startText),end=Number(endText);if(start>end)return fail("第 "+row.line+" 行止页不能早于起页。");const pages=end-start+1;if(pages>64)return fail("第 "+row.line+" 行单个书帖不能超过 64 页。");seen.add(idKey);items.push({id,start,end,pages,line:row.line})}render(items)
    };
    const stale=()=>{error.textContent="";status.textContent="输入已更改，请重新生成配页报告。";report.dataset.ready="false";state.textContent="STALE";clear("等待重新计算","等待重新计算");note.textContent="重新生成后，再人工复核拼版、空白页、版本、装订和实物。";copyButton.disabled=true;copyStatus.textContent="";last=""};
    const reset=()=>{error.textContent="";status.textContent="等待至少两个书帖。";report.dataset.ready="false";state.textContent="UNSET";clear("等待计算","等待计算");note.textContent="机械校验不验证印刷拼版、折手方式、纸张方向、装订结构、空白页、版本对应、实物完整性、来源或权利。";copyButton.disabled=true;copyStatus.textContent="";last=""};
    form.addEventListener("submit",event=>{event.preventDefault();parse()});input.addEventListener("input",stale);form.addEventListener("reset",()=>setTimeout(reset,0));form.querySelectorAll("[data-ob107-preset]").forEach(button=>button.addEventListener("click",()=>{input.value=presets[button.dataset.ob107Preset];stale();input.focus()}));copyButton.addEventListener("click",()=>{if(last)copy(last,copyStatus,"完整配页报告已复制。")})
  };
  const initSearch=()=>{
    const form=document.querySelector("[data-ob107-search]");if(!form)return;const input=form.querySelector("#ob107-query"),result=form.querySelector("[data-ob107-search-result]"),routes=[{href:"article.html",label:"纸页札记",words:["札记","干花","批注","春天","纸页"]},{href:"tool.html",label:"书帖校验",words:["书帖","校验","页码","断页","配页"]},{href:"legal.html",label:"版权页",words:["版权","版本","来源","许可","修订"]},{href:"index.html",label:"展开书",words:["展开","目录","首页","书"]}];const show=(prefix,route)=>{empty(result);result.append(document.createTextNode(prefix));if(route){const link=document.createElement("a");link.href=route.href;link.textContent=route.label;result.append(link,document.createTextNode("。"))}};input.addEventListener("input",()=>show("输入已更改，按“翻回目录”再次检索。"));form.addEventListener("submit",event=>{event.preventDefault();const query=input.value.normalize("NFKC").trim();if(!query){show("请输入线索，例如“札记”或“书帖”。");input.focus();return}if(lengthOf(query)>80){show("检索词不能超过 80 个 Unicode 字符。");input.focus();return}const lowered=query.toLocaleLowerCase(),route=routes.find(item=>item.words.some(word=>lowered.includes(word)));show(route?"最接近的公开纸页是：":"没有完全匹配；建议先返回",route||routes[3])})
  };
  initMode();initMenu();initProgress();initCopies();initSignatures();initSearch()
})();
