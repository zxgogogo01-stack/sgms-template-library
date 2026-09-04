/* Local navigation and reading: no materials leave the page. */
(function(){
"use strict";
const root=document.documentElement,key="straw-fanfold-062-palette";
root.classList.remove("sf62-nojs");
const theme=document.querySelector("[data-palette-toggle]");
let saved;try{saved=localStorage.getItem(key);}catch{}
function setTheme(value){root.dataset.theme=value;document.querySelector('meta[name="theme-color"]').content=value==="ink"?"#18130f":"#f4e8cb";if(theme){theme.textContent=value==="ink"?"日读":"夜读";theme.setAttribute("aria-pressed",String(value==="ink"));theme.setAttribute("aria-label",value==="ink"?"切换到日读主题":"切换到夜读主题");}}
setTheme(["straw","ink"].includes(saved)?saved:"straw");
theme?.addEventListener("click",()=>{const next=root.dataset.theme==="ink"?"straw":"ink";setTheme(next);try{localStorage.setItem(key,next);}catch{}});
const menu=document.getElementById("sf62-menu"),toggle=document.getElementById("sf62-menu-button");
function close(focus=false){menu?.classList.remove("sf62-open");toggle?.setAttribute("aria-expanded","false");if(toggle){toggle.querySelector("span").textContent="打开目录";if(focus)toggle.focus();}}
toggle?.addEventListener("click",()=>{if(toggle.getAttribute("aria-expanded")==="true"){close();return;}menu.classList.add("sf62-open");toggle.setAttribute("aria-expanded","true");toggle.querySelector("span").textContent="关闭目录";menu.querySelector("a")?.focus();});
menu?.addEventListener("click",e=>{if(e.target.closest("a"))close();});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&toggle?.getAttribute("aria-expanded")==="true")close(true);});
addEventListener("resize",()=>{if(innerWidth>900)close();});
const copy=document.querySelector("[data-copy-code]"),code=document.getElementById("sf62-code"),copyState=document.querySelector("[data-code-state]");
if(copy&&code){copy.disabled=false;copy.addEventListener("click",async()=>{copy.disabled=true;try{await navigator.clipboard.writeText(code.textContent.trim());copyState.textContent="已复制，可粘贴使用。";}catch{copyState.textContent="无法复制，请手动选择上方文字。";}finally{copy.disabled=false;}});}
const filter=document.querySelector("[data-leaf-filter]");
if(filter){filter.hidden=false;const rows=[...document.querySelectorAll("[data-leaf-group]")],state=filter.querySelector("[data-filter-state]");
const update=()=>{const group=filter.elements.gathering.value,q=filter.elements.keyword.value.normalize("NFKC").trim().toLocaleLowerCase();let n=0;for(const row of rows){row.hidden=!(group==="all"||row.dataset.leafGroup===group)||!row.querySelector("h3").textContent.normalize("NFKC").toLocaleLowerCase().includes(q);if(!row.hidden)n++;}state.textContent=n?"当前显示 "+n+" 份页笺。":"没有匹配页笺，可以重置筛选。";};
filter.addEventListener("submit",e=>e.preventDefault());filter.addEventListener("input",update);filter.addEventListener("change",update);filter.addEventListener("reset",()=>setTimeout(update,0));update();}
const search=document.querySelector("[data-local-search]");
if(search){search.querySelector("button").disabled=false;const nodes=[...document.querySelectorAll("[data-search-item]")],state=search.querySelector("[data-search-state]");
const update=()=>{const q=search.elements.query.value.normalize("NFKC").trim().toLocaleLowerCase();let n=0;for(const item of nodes){item.hidden=!item.textContent.normalize("NFKC").toLocaleLowerCase().includes(q);if(!item.hidden)n++;}state.textContent=n?"找到 "+n+" 个本站入口。":"没有匹配入口，可换词或回到展册。";};
search.addEventListener("submit",e=>{e.preventDefault();update();});search.addEventListener("input",()=>{state.textContent="关键词已改变，请重新查找。";for(const item of nodes)item.hidden=false;});}
const progress=document.querySelector("[data-reading-progress]");
if(progress){const update=()=>{const max=root.scrollHeight-innerHeight;progress.style.width=Math.max(0,Math.min(100,max?scrollY/max*100:100))+"%";};addEventListener("scroll",update,{passive:true});addEventListener("resize",update);addEventListener("load",update);update();}
})();
