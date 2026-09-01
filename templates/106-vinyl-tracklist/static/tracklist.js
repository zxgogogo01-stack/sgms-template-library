(function(){
  "use strict";
  const root=document.documentElement;
  const unicodeLength=value=>[...value].length;
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
        if(!ok)throw new Error("copy unavailable")
      }
      if(status)status.textContent=message
    }catch(_error){if(status)status.textContent="复制失败，请手动选择文字。"}
  };
  const initMode=()=>{
    const buttons=[...document.querySelectorAll("[data-vt106-mode-toggle]")];
    if(!buttons.length)return;
    const apply=value=>{
      const mode=value==="day"?"day":"studio";
      root.dataset.vt106Mode=mode;
      buttons.forEach(button=>{
        button.setAttribute("aria-pressed",String(mode==="day"));
        button.textContent=mode==="day"?"恢复深夜监听":"切换日光监听"
      })
    };
    let saved=null;
    try{saved=localStorage.getItem("vt106-mode")}catch(_error){}
    apply(saved||root.dataset.vt106Mode);
    buttons.forEach(button=>button.addEventListener("click",()=>{
      const mode=root.dataset.vt106Mode==="day"?"studio":"day";
      apply(mode);
      try{localStorage.setItem("vt106-mode",mode)}catch(_error){}
    }))
  };
  const initMenu=()=>{
    const button=document.querySelector(".vt106-menu");
    const nav=document.querySelector("#vt106-nav");
    if(!button||!nav)return;
    const set=(open,returnFocus)=>{
      button.setAttribute("aria-expanded",String(open));
      button.querySelector("span").textContent=open?"收起唱片目录":"展开唱片目录";
      document.body.dataset.vt106Menu=open?"open":"closed";
      if(open)nav.querySelector("a")?.focus();
      else if(returnFocus)button.focus()
    };
    button.addEventListener("click",()=>set(button.getAttribute("aria-expanded")!=="true",false));
    document.addEventListener("keydown",event=>{if(event.key==="Escape"&&button.getAttribute("aria-expanded")==="true")set(false,true)});
    nav.addEventListener("click",event=>{if(event.target.closest("a")&&matchMedia("(max-width:920px)").matches)set(false,false)})
  };
  const initProgress=()=>{
    const meter=document.querySelector("[data-vt106-progress]");
    const label=document.querySelector("[data-vt106-progress-label]");
    if(!meter||!label)return;
    const update=()=>{
      const range=Math.max(1,document.documentElement.scrollHeight-innerHeight);
      const value=Math.max(0,Math.min(100,Math.round(scrollY/range*100)));
      meter.style.setProperty("--vt106-read",value+"%");
      label.value=value+"%";
      label.textContent=value+"%"
    };
    update();
    addEventListener("scroll",update,{passive:true});
    addEventListener("resize",update)
  };
  const initCopies=()=>{
    const articleButton=document.querySelector("[data-vt106-copy-article]");
    const articleNote=document.querySelector("[data-vt106-article-note]");
    if(articleButton&&articleNote)articleButton.addEventListener("click",()=>copy(articleNote.textContent.trim(),document.querySelector("[data-vt106-article-status]"),"母带交接已复制。"));
    const legalButton=document.querySelector("[data-vt106-copy-legal]");
    const legalNote=document.querySelector("[data-vt106-legal-note]");
    if(legalButton&&legalNote)legalButton.addEventListener("click",()=>copy(legalNote.textContent.trim(),document.querySelector("[data-vt106-legal-status]"),"发行复核摘要已复制。"))
  };
  const initBalance=()=>{
    const form=document.querySelector("[data-vt106-balance-form]");
    if(!form)return;
    const input=form.querySelector("#vt106-rows");
    const thresholdInput=form.querySelector("#vt106-threshold");
    const error=form.querySelector("[data-vt106-error]");
    const status=form.querySelector("[data-vt106-form-status]");
    const report=document.querySelector(".vt106-report");
    const state=report.querySelector("[data-vt106-report-state]");
    const count=report.querySelector("[data-vt106-count]");
    const totalTime=report.querySelector("[data-vt106-total-time]");
    const aTime=report.querySelector("[data-vt106-a-time]");
    const bTime=report.querySelector("[data-vt106-b-time]");
    const difference=report.querySelector("[data-vt106-difference]");
    const findingSummary=report.querySelector("[data-vt106-finding-summary]");
    const findingList=report.querySelector("[data-vt106-finding-list]");
    const cutSummary=report.querySelector("[data-vt106-cut-summary]");
    const cutList=report.querySelector("[data-vt106-cut-list]");
    const note=report.querySelector("[data-vt106-note]");
    const copyButton=report.querySelector("[data-vt106-copy-report]");
    const copyStatus=report.querySelector("[data-vt106-copy-status]");
    let last="";
    const presets={
      balanced:"01 | 河面开始播放月光 | A | 04:18\n02 | 凌晨两点的自动售货机 | A | 03:42\n03 | 沿河散步的人没有影子 | A | 05:06\n04 | 最后一班车穿过桥面 | A | 06:02\n05 | 电话亭里的一场小雨 | B | 04:51\n06 | 蓝色窗帘之后 | B | 04:07\n07 | 把脚步留给天亮 | B | 05:20\n08 | 唱针离开清晨 | B | 05:16",
      longside:"A1 | 城市的入口 | A | 03:10\nA2 | 第一盏路灯 | A | 03:20\nB1 | 河流没有尽头 | B | 08:40\nB2 | 慢慢抵达天亮 | B | 07:35",
      duplicate:"01 | 河面开始播放月光 | A | 04:18\n02 | 电话亭里的一场雨 | A | 03:42\n03 | 河面开始播放月光 | B | 04:11\n04 | 天亮以前 | B | 04:05",
      single:"01 | 开场讯号 | A | 02:18\n02 | 未完成的桥 | A | 04:36\n03 | 试排尾声 | A | 03:09"
    };
    const formatTime=seconds=>{
      const minutes=Math.floor(seconds/60);
      const rest=seconds%60;
      return String(minutes).padStart(2,"0")+":"+String(rest).padStart(2,"0")
    };
    const key=value=>value.toLocaleLowerCase().replace(/\s+/gu," ");
    const setPlaceholder=(message,cutMessage)=>{
      count.textContent="0";
      totalTime.textContent=aTime.textContent=bTime.textContent=difference.textContent="00:00";
      findingSummary.textContent=message;
      cutSummary.textContent=cutMessage;
      empty(findingList);
      const finding=document.createElement("li");
      finding.textContent="报告生成后在此显示重复标题、单面试排或时长失衡。";
      findingList.append(finding);
      empty(cutList);
      const waiting=document.createElement("p");
      waiting.textContent="等待曲目输入。";
      cutList.append(waiting)
    };
    const fail=(message,focusTarget=input)=>{
      error.textContent=message;
      status.textContent="分面报告未生成。";
      report.dataset.ready="false";
      state.textContent="INVALID";
      setPlaceholder("请修正输入","等待有效数据");
      note.textContent="旧报告已失效；请先修正格式、数值、字段长度或重复曲号。";
      copyButton.disabled=true;
      copyStatus.textContent="";
      last="";
      focusTarget.focus()
    };
    const render=(items,threshold)=>{
      const bySide={A:[],B:[]};
      items.forEach(item=>bySide[item.side].push(item));
      const sideSeconds={A:bySide.A.reduce((sum,item)=>sum+item.seconds,0),B:bySide.B.reduce((sum,item)=>sum+item.seconds,0)};
      const total=sideSeconds.A+sideSeconds.B;
      const diff=Math.abs(sideSeconds.A-sideSeconds.B);
      const titles=new Map();
      items.forEach(item=>{
        if(!titles.has(item.titleKey))titles.set(item.titleKey,[]);
        titles.get(item.titleKey).push(item)
      });
      const duplicateGroups=[...titles.values()].filter(group=>group.length>1);
      const findings=[];
      duplicateGroups.forEach(group=>findings.push("归一后重复标题“"+group[0].title+"”：曲号 "+group.map(item=>item.id).join("、")+"。"));
      const singleSide=!bySide.A.length||!bySide.B.length;
      if(singleSide)findings.push("当前为单面试排："+(bySide.A.length?"B":"A")+" 面没有曲目。");
      const imbalanced=!singleSide&&diff>threshold;
      if(imbalanced)findings.push("A/B 面时长差 "+formatTime(diff)+"，超过阈值 "+formatTime(threshold)+"。");
      const types=[duplicateGroups.length>0,singleSide,imbalanced].filter(Boolean).length;
      const stateText=!findings.length?"BALANCED":types>1?"REVIEW "+findings.length:duplicateGroups.length?"DUPLICATES "+duplicateGroups.length:singleSide?"SINGLE SIDE":"IMBALANCED";
      error.textContent="";
      status.textContent="分面报告已生成。";
      report.dataset.ready="true";
      state.textContent=stateText;
      count.textContent=String(items.length);
      totalTime.textContent=formatTime(total);
      aTime.textContent=formatTime(sideSeconds.A);
      bTime.textContent=formatTime(sideSeconds.B);
      difference.textContent=formatTime(diff);
      findingSummary.textContent=findings.length?findings.length+" 条编辑提示":"分面数据通过机械检查";
      empty(findingList);
      if(findings.length)findings.slice(0,40).forEach(text=>{const li=document.createElement("li");li.textContent=text;findingList.append(li)});
      else{const li=document.createElement("li");li.textContent="未发现重复标题，A/B 面均有曲目且时长差未超过阈值；仍需人工复核曲序与制作限制。";findingList.append(li)}
      if(findings.length>40){const li=document.createElement("li");li.textContent="界面仅显示前 40 条；复制报告包含全部 "+findings.length+" 条提示。";findingList.append(li)}
      cutSummary.textContent="A "+bySide.A.length+" 首 / B "+bySide.B.length+" 首 / 最长 "+items.reduce((best,item)=>item.seconds>best.seconds?item:best).id;
      empty(cutList);
      items.slice(0,40).forEach(item=>{
        const article=document.createElement("article");
        const side=document.createElement("b");
        const info=document.createElement("div");
        const title=document.createElement("strong");
        const id=document.createElement("small");
        const time=document.createElement("time");
        side.textContent=item.side;
        title.textContent=item.title;
        id.textContent="TRACK "+item.id;
        time.textContent=formatTime(item.seconds);
        time.dateTime="PT"+item.seconds+"S";
        info.append(title,id);
        article.append(side,info,time);
        cutList.append(article)
      });
      if(items.length>40){const more=document.createElement("p");more.textContent="界面仅显示前 40 首；复制报告包含全部 "+items.length+" 首曲目。";cutList.append(more)}
      note.textContent="共 "+items.length+" 首，总时长 "+formatTime(total)+"；A 面 "+formatTime(sideSeconds.A)+"，B 面 "+formatTime(sideSeconds.B)+"，相差 "+formatTime(diff)+"。机械校验不代表制作审核。";
      last=[
        "专辑分面时长报告","",
        "曲目数量："+items.length,
        "总时长："+formatTime(total),
        "A 面："+formatTime(sideSeconds.A)+" / "+bySide.A.length+" 首",
        "B 面："+formatTime(sideSeconds.B)+" / "+bySide.B.length+" 首",
        "时长差："+formatTime(diff),
        "允许阈值："+formatTime(threshold),
        "状态："+stateText,"",
        "编辑提示：",...(findings.length?findings:["未发现重复标题，A/B 面均有曲目且时长差未超过阈值；仍需人工复核。"]),"",
        "曲序：",...items.map(item=>item.id+" | "+item.title+" | "+item.side+" | "+formatTime(item.seconds)),"",
        "提示：本报告只检查当前输入格式、曲号唯一性、标题重复、分面和时长差；不验证母带版本、响度、音质、沟槽密度、载体容量、曲序艺术性、版权、署名或最终音频。"
      ].join("\n");
      copyButton.disabled=false;
      copyStatus.textContent=""
    };
    const parse=()=>{
      const normalized=input.value.normalize("NFKC");
      if(unicodeLength(normalized)>10000)return fail("曲目总输入不能超过 10000 个 Unicode 字符。");
      const thresholdText=thresholdInput.value.trim();
      if(!/^(?:0|[1-9]\d*)$/.test(thresholdText))return fail("时长差阈值须为 0–1800 的整数秒。",thresholdInput);
      const threshold=Number(thresholdText);
      if(!Number.isSafeInteger(threshold)||threshold<0||threshold>1800)return fail("时长差阈值须为 0–1800 的整数秒。",thresholdInput);
      const rows=normalized.split(/\r?\n/).map((text,index)=>({text:text.trim(),line:index+1})).filter(row=>row.text);
      if(rows.length<2)return fail("至少需要 2 首非空曲目。");
      if(rows.length>80)return fail("最多只能校验 80 首非空曲目。");
      const ids=new Set();
      const items=[];
      const sideCounts={A:0,B:0};
      for(const row of rows){
        const parts=row.text.split("|");
        if(parts.length!==4)return fail("第 "+row.line+" 行须使用“曲号 | 曲名 | 分面 | 时长”格式。");
        const id=parts[0].trim();
        const title=parts[1].trim();
        const side=parts[2].trim().toUpperCase();
        const duration=parts[3].trim();
        const idKey=key(id);
        if(unicodeLength(id)<1||unicodeLength(id)>16)return fail("第 "+row.line+" 行曲号须为 1–16 个 Unicode 字符。");
        if(ids.has(idKey))return fail("第 "+row.line+" 行曲号与前文归一后重复。");
        if(unicodeLength(title)<2||unicodeLength(title)>100)return fail("第 "+row.line+" 行曲名须为 2–100 个 Unicode 字符。");
        if(side!=="A"&&side!=="B")return fail("第 "+row.line+" 行分面只能写 A 或 B。");
        const match=duration.match(/^(\d{2}):(\d{2})$/);
        if(!match)return fail("第 "+row.line+" 行时长须严格使用 MM:SS，例如 04:18。");
        const minutes=Number(match[1]);
        const seconds=Number(match[2]);
        if(minutes>99||seconds>59||minutes===0&&seconds===0)return fail("第 "+row.line+" 行时长须在 00:01–99:59 之间。");
        sideCounts[side]++;
        if(sideCounts[side]>40)return fail(side+" 面最多只能有 40 首曲目。");
        ids.add(idKey);
        items.push({id,title,titleKey:key(title),side,seconds:minutes*60+seconds})
      }
      render(items,threshold)
    };
    const stale=()=>{
      error.textContent="";
      status.textContent="输入已更改，请重新生成分面报告。";
      report.dataset.ready="false";
      state.textContent="STALE";
      setPlaceholder("等待重新计算","等待重新计算");
      note.textContent="重新生成后，再人工复核母带、载体限制、曲序、版权、署名与最终音频。";
      copyButton.disabled=true;
      copyStatus.textContent="";
      last=""
    };
    const reset=()=>{
      error.textContent="";
      status.textContent="等待至少两首曲目。";
      report.dataset.ready="false";
      state.textContent="UNSET";
      setPlaceholder("等待计算","等待计算");
      note.textContent="机械校验不验证母带版本、响度、音质、沟槽密度、载体容量、曲序艺术性、版权、署名或最终音频。";
      copyButton.disabled=true;
      copyStatus.textContent="";
      last=""
    };
    form.addEventListener("submit",event=>{event.preventDefault();parse()});
    input.addEventListener("input",stale);
    thresholdInput.addEventListener("input",stale);
    form.addEventListener("reset",()=>setTimeout(reset,0));
    form.querySelectorAll("[data-vt106-preset]").forEach(button=>button.addEventListener("click",()=>{input.value=presets[button.dataset.vt106Preset];stale();input.focus()}));
    copyButton.addEventListener("click",()=>{if(last)copy(last,copyStatus,"完整分面报告已复制。")})
  };
  const initSearch=()=>{
    const form=document.querySelector("[data-vt106-search]");
    if(!form)return;
    const input=form.querySelector("#vt106-query");
    const result=form.querySelector("[data-vt106-search-result]");
    const routes=[
      {href:"article.html",label:"母带笔记",words:["母带","笔记","翻面","静默","曲序"]},
      {href:"tool.html",label:"分面校验",words:["分面","校验","时长","曲目","平衡"]},
      {href:"legal.html",label:"唱片内页",words:["内页","权利","署名","发行","隐私","修订"]},
      {href:"index.html",label:"试听室",words:["试听","唱片","首页","专辑"]}
    ];
    const show=(prefix,route)=>{
      empty(result);
      result.append(document.createTextNode(prefix));
      if(route){const link=document.createElement("a");link.href=route.href;link.textContent=route.label;result.append(link,document.createTextNode("。"))}
    };
    input.addEventListener("input",()=>show("输入已更改，按“重新落针”再次检索。"));
    form.addEventListener("submit",event=>{
      event.preventDefault();
      const query=input.value.normalize("NFKC").trim();
      if(!query){show("请输入线索，例如“母带”或“分面”。");input.focus();return}
      if(unicodeLength(query)>80){show("检索词不能超过 80 个 Unicode 字符。");input.focus();return}
      const lowered=query.toLocaleLowerCase();
      const route=routes.find(item=>item.words.some(word=>lowered.includes(word)));
      show(route?"最接近的公开页面是：":"没有完全匹配；建议先返回",route||routes[3])
    })
  };
  initMode();
  initMenu();
  initProgress();
  initCopies();
  initBalance();
  initSearch()
})();
