(function(){
  "use strict";
  var root=document.documentElement;
  var toggle=document.querySelector("[data-hld-ink]");
  var stored="";
  try{stored=localStorage.getItem("retro-herald-ink")||"";}catch(_){stored="";}
  if(stored==="night")root.setAttribute("data-hld-theme","night");
  function sync(){if(!toggle)return;var night=root.getAttribute("data-hld-theme")==="night";toggle.setAttribute("aria-pressed",String(night));var label=toggle.querySelector("b");if(label)label.textContent=night?"%THEME_LIGHT%":"%THEME_DARK%";}
  sync();
  if(toggle)toggle.addEventListener("click",function(){var night=root.getAttribute("data-hld-theme")==="night";if(night)root.removeAttribute("data-hld-theme");else root.setAttribute("data-hld-theme","night");try{localStorage.setItem("retro-herald-ink",night?"day":"night");}catch(_){}sync();});
  function fallback(value){var area=document.createElement("textarea");area.value=value;area.setAttribute("readonly","");area.style.position="fixed";area.style.opacity="0";document.body.appendChild(area);area.select();var ok=false;try{ok=document.execCommand("copy");}catch(_){ok=false;}area.remove();return ok;}
  function copy(value){if(navigator.clipboard&&navigator.clipboard.writeText)return navigator.clipboard.writeText(value).then(function(){return true;},function(){return fallback(value);});return Promise.resolve(fallback(value));}
  var copyButton=document.querySelector("[data-hld-copy]");
  if(copyButton)copyButton.addEventListener("click",function(){var code=document.querySelector("[data-hld-code]");var status=document.querySelector("[data-hld-copy-status]");copy(code?code.textContent.trim():"").then(function(ok){if(status)status.textContent=ok?"%COPY_SUCCESS%":"%COPY_FAILURE%";});});
}());
