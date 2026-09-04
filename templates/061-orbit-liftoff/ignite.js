/* Orbit Liftoff: local navigation, reading and text filtering. */
(function(){
"use strict";
const root=document.documentElement,key="orbit-liftoff-061-theme";
root.classList.remove("ol61-nojs");
const theme=document.querySelector("[data-theme-toggle]");
let saved;try{saved=localStorage.getItem(key);}catch{}
function setTheme(value){root.dataset.theme=value;document.querySelector('meta[name="theme-color"]').content=value==="dark"?"#050b12":"#f0f5f5";if(theme){theme.textContent=value==="dark"?"LIGHT MODE":"DARK MODE";theme.setAttribute("aria-pressed",String(value==="light"));theme.setAttribute("aria-label",value==="dark"?"切换到浅色主题":"切换到深色主题");}}
setTheme(["light","dark"].includes(saved)?saved:"dark");
theme?.addEventListener("click",()=>{const next=root.dataset.theme==="dark"?"light":"dark";setTheme(next);try{localStorage.setItem(key,next);}catch{}});
const menu=document.getElementById("ol61-menu"),toggle=document.getElementById("ol61-menu-button");
function close(focus=false){menu?.classList.remove("ol61-open");toggle?.setAttribute("aria-expanded","false");if(toggle){toggle.querySelector("[aria-hidden]").textContent="MENU";toggle.querySelector(".ol61-sr").textContent="打开导航";if(focus)toggle.focus();}}
toggle?.addEventListener("click",()=>{if(toggle.getAttribute("aria-expanded")==="true"){close();return;}menu.classList.add("ol61-open");toggle.setAttribute("aria-expanded","true");toggle.querySelector("[aria-hidden]").textContent="CLOSE";toggle.querySelector(".ol61-sr").textContent="关闭导航";menu.querySelector("a")?.focus();});
menu?.addEventListener("click",e=>{if(e.target.closest("a"))close();});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&toggle?.getAttribute("aria-expanded")==="true")close(true);});
addEventListener("resize",()=>{if(innerWidth>820)close();});
const copy=document.querySelector("[data-copy-code]"),code=document.getElementById("ol61-code"),copyState=document.querySelector("[data-code-state]");
if(copy&&code){copy.disabled=false;copy.addEventListener("click",async()=>{copy.disabled=true;try{await navigator.clipboard.writeText(code.textContent.trim());copyState.textContent="已复制，可粘贴使用。";}catch{copyState.textContent="无法复制，请手动选择上方文字。";}finally{copy.disabled=false;}});}
const filter=document.querySelector("[data-log-filter]");
if(filter){filter.hidden=false;const rows=[...document.querySelectorAll("[data-log-orbit]")],state=filter.querySelector("[data-filter-state]");
const update=()=>{const orbit=filter.elements.orbit.value,q=filter.elements.term.value.normalize("NFKC").trim().toLocaleLowerCase();let n=0;for(const row of rows){row.hidden=!(orbit==="all"||row.dataset.logOrbit===orbit)||!row.querySelector("h3").textContent.normalize("NFKC").toLocaleLowerCase().includes(q);if(!row.hidden)n++;}state.textContent=n?"当前显示 "+n+" 份简报。":"没有匹配简报，可以清空条件。";};
filter.addEventListener("submit",e=>e.preventDefault());filter.addEventListener("input",update);filter.addEventListener("change",update);filter.addEventListener("reset",()=>setTimeout(update,0));update();}
const search=document.querySelector("[data-local-search]");
if(search){search.querySelector("button").disabled=false;const nodes=[...document.querySelectorAll("[data-search-item]")],state=search.querySelector("[data-search-state]");
const update=()=>{const q=search.elements.query.value.normalize("NFKC").trim().toLocaleLowerCase();let n=0;for(const item of nodes){item.hidden=!item.textContent.normalize("NFKC").toLocaleLowerCase().includes(q);if(!item.hidden)n++;}state.textContent=n?"找到 "+n+" 个本站入口。":"没有匹配入口，可换词或回到控制舱。";};
search.addEventListener("submit",e=>{e.preventDefault();update();});search.addEventListener("input",()=>{state.textContent="关键词已改变，请重新检索。";for(const item of nodes)item.hidden=false;});}
const progress=document.querySelector("[data-reading-progress]");
if(progress){const update=()=>{const max=root.scrollHeight-innerHeight;progress.style.width=Math.max(0,Math.min(100,max?scrollY/max*100:100))+"%";};addEventListener("scroll",update,{passive:true});addEventListener("resize",update);addEventListener("load",update);update();}
})();
