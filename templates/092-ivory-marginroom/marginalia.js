(function(){
  "use strict";
  const root=document.documentElement;
  const ulen=value=>[...value].length;
  const empty=node=>{while(node&&node.firstChild)node.firstChild.remove()};
  const copy=async(value,status,message)=>{
    try{
      if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(value);
      else{
        const field=document.createElement("textarea");
        field.value=value;
        field.setAttribute("readonly","");
        field.style.position="fixed";
        field.style.opacity="0";
        document.body.append(field);
        field.select();
        const ok=document.execCommand("copy");
        field.remove();
        if(!ok)throw new Error("copy unavailable");
      }
      if(status)status.textContent=message;
    }catch(_error){if(status)status.textContent="复制失败，请手动选择文字。"}
  };

  const initRoom=()=>{
    const buttons=[...document.querySelectorAll("[data-im92-room-toggle]")];
    if(!buttons.length)return;
    const apply=value=>{
      const mode=value==="lamp"?"lamp":"day";
      root.dataset.im92Room=mode;
      buttons.forEach(button=>{
        button.setAttribute("aria-pressed",String(mode==="lamp"));
        button.textContent=mode==="lamp"?"熄灭桌灯":"点亮桌灯";
      });
    };
    let saved=null;
    try{saved=localStorage.getItem("im92-room")}catch(_error){}
    apply(saved||root.dataset.im92Room);
    buttons.forEach(button=>button.addEventListener("click",()=>{
      const mode=root.dataset.im92Room==="lamp"?"day":"lamp";
      apply(mode);
      try{localStorage.setItem("im92-room",mode)}catch(_error){}
    }));
  };

  const initMenu=()=>{
    const button=document.querySelector(".im92-menu");
    const nav=document.querySelector("#im92-nav");
    if(!button||!nav)return;
    const set=(open,returnFocus)=>{
      button.setAttribute("aria-expanded",String(open));
      document.body.dataset.im92Menu=open?"open":"closed";
      button.querySelector("span").textContent=open?"收起目录":"展开目录";
      if(open)nav.querySelector("a")?.focus();
      else if(returnFocus)button.focus();
    };
    button.addEventListener("click",()=>set(button.getAttribute("aria-expanded")!=="true",false));
    document.addEventListener("keydown",event=>{if(event.key==="Escape"&&button.getAttribute("aria-expanded")==="true")set(false,true)});
    nav.addEventListener("click",event=>{if(event.target.closest("a")&&matchMedia("(max-width:820px)").matches)set(false,false)});
  };

  const initProgress=()=>{
    const meter=document.querySelector("[data-im92-progress]");
    const label=document.querySelector("[data-im92-progress-label]");
    if(!meter||!label)return;
    const update=()=>{
      const range=Math.max(1,document.documentElement.scrollHeight-innerHeight);
      const value=Math.max(0,Math.min(100,Math.round(scrollY/range*100)));
      meter.style.setProperty("--im92-read",value+"%");
      label.value=value+"%";
      label.textContent=value+"%";
    };
    update();
    addEventListener("scroll",update,{passive:true});
    addEventListener("resize",update);
  };

  const initCopies=()=>{
    const handoff=document.querySelector("[data-im92-copy-handoff]");
    if(handoff)handoff.addEventListener("click",()=>copy("四层阅读交接卡\n1. 来源：标题、作者、版本与稳定定位\n2. 原文：完整引文及足够的前后语境\n3. 解释：原文直接支持的最小结论与自己的推断\n4. 边界：反例、未知、适用范围与下一次复核条件",document.querySelector("[data-im92-handoff-status]"),"四层阅读交接卡已复制。"));
    const standard=document.querySelector("[data-im92-copy-standard]");
    const note=document.querySelector("[data-im92-standard-note]");
    if(standard&&note)standard.addEventListener("click",()=>copy(note.textContent.trim(),document.querySelector("[data-im92-standard-status]"),"编辑摘要已复制。"));
  };

  const initAnchor=()=>{
    const form=document.querySelector("[data-im92-anchor-form]");
    if(!form)return;
    const source=form.querySelector("#im92-source");
    const locator=form.querySelector("#im92-locator");
    const quote=form.querySelector("#im92-quote");
    const context=form.querySelector("#im92-context");
    const error=form.querySelector("[data-im92-anchor-error]");
    const status=form.querySelector("[data-im92-anchor-status]");
    const report=document.querySelector(".im92-anchor-report");
    const state=report.querySelector("[data-im92-report-state]");
    const matchCount=report.querySelector("[data-im92-match-count]");
    const quoteCount=report.querySelector("[data-im92-quote-count]");
    const contextCount=report.querySelector("[data-im92-context-count]");
    const share=report.querySelector("[data-im92-share]");
    const list=report.querySelector("[data-im92-report-items]");
    const note=report.querySelector("[data-im92-report-note]");
    const copyButton=report.querySelector("[data-im92-copy-report]");
    const copyStatus=report.querySelector("[data-im92-copy-status]");
    const normalize=value=>value.normalize("NFKC").replace(/\r\n?/g,"\n").trim();
    const presets={
      unique:{source:"公开编辑手册（第二版）",locator:"第 3 章，第 12 段",quote:"解释必须和原文分开记录",context:"完整记录先保留来源和定位。解释必须和原文分开记录，随后再写适用边界与下一次复核。"},
      repeat:{source:"页边方法课讲义",locator:"练习 04",quote:"回到完整原文",context:"先回到完整原文，再标记自己的解释。如果判断仍不稳定，就再次回到完整原文，并补足前后语境。"},
      missing:{source:"阅读工作簿",locator:"页 27",quote:"结论必须附带复核日期",context:"笔记需要保留来源、语境和适用边界。下一次复核应当有明确的触发条件。"},
      nfkc:{source:"排印与阅读记录",locator:"附录 A",quote:"ＡＢＣ１２３",context:"这段校样文字包含归一后的编号 ABC123，用来检查全角兼容字符是否可以重新定位。"}
    };
    let last="";
    const clearStats=()=>{matchCount.textContent=quoteCount.textContent=contextCount.textContent="0";share.textContent="0%"};
    const placeholder=text=>{const item=document.createElement("li"),badge=document.createElement("b"),body=document.createElement("span");badge.textContent="—";body.textContent=text;item.append(badge,body);list.append(item)};
    const fail=(message,target)=>{
      error.textContent=message;
      status.textContent="引文锚定报告未生成。";
      report.dataset.ready="false";
      state.textContent="INVALID";
      clearStats();empty(list);placeholder("请修正输入后重新生成；旧报告已失效。");
      note.textContent="先修正输入边界，再人工核对来源与语境。";
      copyButton.disabled=true;copyStatus.textContent="";last="";(target||source).focus();
    };
    const addMatch=(position,index,qChars,cChars)=>{
      const item=document.createElement("li"),badge=document.createElement("b"),body=document.createElement("span"),before=document.createElement("em"),mark=document.createElement("mark"),after=document.createElement("em");
      const left=cChars.slice(Math.max(0,position-48),position).join("");
      const right=cChars.slice(position+qChars.length,position+qChars.length+48).join("");
      const quotePreview=qChars.slice(0,120).join("")+(qChars.length>120?"…":"");
      badge.textContent="#"+String(index+1).padStart(2,"0")+" · "+(position+1)+"–"+(position+qChars.length);
      before.textContent=(position>48?"…":"")+(left||"[窗口起点]");
      mark.textContent=quotePreview;
      after.textContent=(right||"[窗口终点]")+(position+qChars.length+48<cChars.length?"…":"");
      body.append(before,mark,after);item.append(badge,body);list.append(item);
    };
    const findMatches=(qChars,cChars)=>{
      const found=[];
      outer:for(let i=0;i<=cChars.length-qChars.length;i++){
        for(let j=0;j<qChars.length;j++)if(cChars[i+j]!==qChars[j])continue outer;
        found.push(i);
      }
      return found;
    };
    const render=(sourceText,locatorText,quoteText,contextText)=>{
      const qChars=[...quoteText],cChars=[...contextText],matches=findMatches(qChars,cChars);
      const ratio=qChars.length/cChars.length*100;
      const ratioText=(ratio<.1?"<0.1":ratio.toFixed(1).replace(/\.0$/,""))+"%";
      const stateText=matches.length===0?"UNMATCHED":matches.length===1?"ANCHORED":"AMBIGUOUS";
      error.textContent="";status.textContent="锚定报告已生成，共发现 "+matches.length+" 处精确出现。";report.dataset.ready="true";state.textContent=stateText;
      matchCount.textContent=String(matches.length);quoteCount.textContent=String(qChars.length);contextCount.textContent=String(cChars.length);share.textContent=ratioText;empty(list);
      if(matches.length===0)placeholder("语境窗口中没有找到归一后逐字符一致的引文。");else matches.slice(0,20).forEach((position,index)=>addMatch(position,index,qChars,cChars));
      note.textContent=matches.length===0?"未能定位不等于引文虚假；请先核对版本、字符与摘录范围。":matches.length===1?"唯一机械锚点不代表来源真实、语境充分或解释正确。":"同一引文出现多次；请增加章节、段落或页码定位后再人工复核。";
      const copied=matches.slice(0,200).map((position,index)=>{const left=cChars.slice(Math.max(0,position-48),position).join(""),right=cChars.slice(position+qChars.length,position+qChars.length+48).join("");return (index+1)+". 字符 "+(position+1)+"–"+(position+qChars.length)+"\n   前文："+(left||"[窗口起点]")+"\n   引文："+quoteText+"\n   后文："+(right||"[窗口终点]")});
      last=["引文语境锚定报告","","来源："+sourceText,"定位："+locatorText,"状态："+stateText,"精确出现："+matches.length,"引文字符："+qChars.length,"语境字符："+cChars.length,"窗口占比："+ratioText,"",...(copied.length?copied:["未发现逐字符一致的锚点。"]),...(matches.length>200?["","仅列出前 200 处位置；精确出现总数为 "+matches.length+"。"]:[]),"","提示：机械定位不验证来源真实性、引文完整性、语境充分性或解释正确性。"].join("\n");
      copyButton.disabled=false;copyStatus.textContent="";
    };
    const validate=()=>{
      const values={source:normalize(source.value),locator:normalize(locator.value),quote:normalize(quote.value),context:normalize(context.value)};
      const lengths={source:ulen(values.source),locator:ulen(values.locator),quote:ulen(values.quote),context:ulen(values.context)};
      if(lengths.source<2||lengths.source>160)return fail("来源标题须为 2–160 个 Unicode 字符。",source);
      if(lengths.locator<1||lengths.locator>80)return fail("定位符须为 1–80 个 Unicode 字符。",locator);
      if(lengths.quote<5||lengths.quote>1000)return fail("待定位引文须为 5–1,000 个 Unicode 字符。",quote);
      if(lengths.context<20||lengths.context>6000)return fail("原文语境窗口须为 20–6,000 个 Unicode 字符。",context);
      if(lengths.context<lengths.quote)return fail("语境窗口不能短于待定位引文。",context);
      render(values.source,values.locator,values.quote,values.context);
    };
    const stale=()=>{error.textContent="";status.textContent="输入已更改，请重新生成锚定报告。";report.dataset.ready="false";state.textContent="STALE";clearStats();empty(list);placeholder("输入已更改，旧锚定报告已失效。");note.textContent="重新生成后，再人工核对来源、摘录范围与解释。";copyButton.disabled=true;copyStatus.textContent="";last=""};
    const reset=()=>{error.textContent="";status.textContent="等待来源、引文与语境窗口。";report.dataset.ready="false";state.textContent="UNSET";clearStats();empty(list);placeholder("生成后显示出现位置与左右语境切片。");note.textContent="唯一定位不代表来源真实、摘录完整或解释正确。";copyButton.disabled=true;copyStatus.textContent="";last=""};
    form.addEventListener("submit",event=>{event.preventDefault();validate()});
    [source,locator,quote,context].forEach(field=>field.addEventListener("input",stale));
    form.addEventListener("reset",()=>setTimeout(reset,0));
    form.querySelectorAll("[data-im92-anchor-preset]").forEach(button=>button.addEventListener("click",()=>{const data=presets[button.dataset.im92AnchorPreset];source.value=data.source;locator.value=data.locator;quote.value=data.quote;context.value=data.context;stale();quote.focus()}));
    copyButton.addEventListener("click",()=>{if(last)copy(last,copyStatus,"完整锚定报告已复制。")});
  };

  const initSearch=()=>{
    const form=document.querySelector("[data-im92-search]");
    if(!form)return;
    const input=form.querySelector("#im92-query");
    const result=form.querySelector("[data-im92-search-result]");
    const routes=[
      {href:"article.html",label:"批注方法",words:["语境","批注","阅读","反例"]},
      {href:"tool.html",label:"引文锚定台",words:["引文","锚定","定位","工具"]},
      {href:"legal.html",label:"公开编辑守则",words:["守则","来源","更正","联系"]},
      {href:"index.html",label:"阅览室首页",words:["首页","阅览室","书架"]}
    ];
    const show=(prefix,route)=>{empty(result);result.append(document.createTextNode(prefix));if(route){const link=document.createElement("a");link.href=route.href;link.textContent=route.label;result.append(link,document.createTextNode("。"))}};
    input.addEventListener("input",()=>show("输入已更改，按“重新装订”再次检索。"));
    form.addEventListener("submit",event=>{
      event.preventDefault();const query=input.value.normalize("NFKC").trim();
      if(!query){show("请输入主题，例如“语境”或“引文”。");input.focus();return}
      if(ulen(query)>80){show("检索词不能超过 80 个 Unicode 字符。");input.focus();return}
      const lowered=query.toLocaleLowerCase(),route=routes.find(item=>item.words.some(word=>lowered.includes(word)));
      show(route?"最接近的已装订栏目是：":"没有完全匹配；建议先返回",route||routes[3]);
    });
  };

  initRoom();initMenu();initProgress();initCopies();initAnchor();initSearch();
})();
