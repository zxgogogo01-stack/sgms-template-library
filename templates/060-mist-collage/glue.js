/* Mist Collage: local reading and navigation. No material leaves this page. */
(function(){
"use strict";
const root=document.documentElement,key="mist-collage-060-theme";
root.classList.remove("mc60-nojs");
const theme=document.querySelector("[data-theme-toggle]");
let saved;try{saved=localStorage.getItem(key);}catch{}
function setTheme(value){root.dataset.theme=value;document.querySelector('meta[name="theme-color"]').content=value==="dark"?"#17201f":"#e8efed";if(theme){theme.textContent=value==="dark"?"日间":"夜间";theme.setAttribute("aria-pressed",String(value==="dark"));}}
setTheme(["light","dark"].includes(saved)?saved:matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");
theme?.addEventListener("click",()=>{const next=root.dataset.theme==="dark"?"light":"dark";setTheme(next);try{localStorage.setItem(key,next);}catch{}});
const menu=document.getElementById("mc60-menu"),toggle=document.querySelector(".mc60-menu-button");
function close(focus=false){menu?.classList.remove("mc60-open");toggle?.setAttribute("aria-expanded","false");if(toggle){toggle.querySelector("[aria-hidden]").textContent="☰";toggle.querySelector(".mc60-sr").textContent="打开导航";if(focus)toggle.focus();}}
toggle?.addEventListener("click",()=>{if(toggle.getAttribute("aria-expanded")==="true"){close();return;}menu.classList.add("mc60-open");toggle.setAttribute("aria-expanded","true");toggle.querySelector("[aria-hidden]").textContent="×";toggle.querySelector(".mc60-sr").textContent="关闭导航";menu.querySelector("a")?.focus();});
menu?.addEventListener("click",e=>{if(e.target.closest("a"))close();});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&toggle?.getAttribute("aria-expanded")==="true")close(true);});
addEventListener("resize",()=>{if(innerWidth>680)close();});
const copy=document.querySelector("[data-copy-code]"),code=document.getElementById("mc60-code"),copyState=document.querySelector("[data-code-state]");
if(copy&&code){copy.disabled=false;copy.addEventListener("click",async()=>{copy.disabled=true;try{await navigator.clipboard.writeText(code.textContent.trim());copyState.textContent="已复制，可粘贴使用。";}catch{copyState.textContent="无法复制，请手动选择上方文字。";}finally{copy.disabled=false;}});}
const filter=document.querySelector("[data-wall-filter]");
if(filter){filter.hidden=false;const cards=[...document.querySelectorAll("[data-card-group]")],state=filter.querySelector("[data-filter-state]"),grid=document.querySelector(".mc60-pins");
const update=()=>{const group=filter.elements.shelf.value,q=filter.elements.keyword.value.normalize("NFKC").trim().toLocaleLowerCase();let n=0;for(const card of cards){card.hidden=!(group==="all"||card.dataset.cardGroup===group)||!card.querySelector("h3").textContent.normalize("NFKC").toLocaleLowerCase().includes(q);if(!card.hidden)n++;}grid.classList.toggle("mc60-filtered",group!=="all"||!!q);state.textContent=n?"当前显示 "+n+" 张纸卡。":"没有匹配纸卡，可以清除筛选。";};
filter.addEventListener("submit",e=>e.preventDefault());filter.addEventListener("input",update);filter.addEventListener("change",update);filter.addEventListener("reset",()=>setTimeout(update,0));update();}
const search=document.querySelector("[data-local-search]");
if(search){search.querySelector("button").disabled=false;const nodes=[...document.querySelectorAll("[data-search-item]")],state=search.querySelector("[data-search-state]");
const update=()=>{const q=search.elements.query.value.normalize("NFKC").trim().toLocaleLowerCase();let n=0;for(const item of nodes){item.hidden=!item.textContent.normalize("NFKC").toLocaleLowerCase().includes(q);if(!item.hidden)n++;}state.textContent=n?"找到 "+n+" 个本站入口。":"没有匹配入口，可换词或回到策展墙。";};
search.addEventListener("submit",e=>{e.preventDefault();update();});search.addEventListener("input",()=>{state.textContent="关键词已改变，请重新查找。";for(const item of nodes)item.hidden=false;});}
const progress=document.querySelector("[data-reading-progress]");
if(progress){const update=()=>{const max=root.scrollHeight-innerHeight;progress.style.width=Math.max(0,Math.min(100,max?scrollY/max*100:100))+"%";};addEventListener("scroll",update,{passive:true});addEventListener("resize",update);addEventListener("load",update);update();}
})();
