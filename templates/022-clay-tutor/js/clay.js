(function(){
  "use strict";
  var root=document.documentElement,toggle=document.querySelector("[data-clay-theme]");
  var saved="";try{saved=localStorage.getItem("clay-tutor-mode")||"";}catch(_){saved="";}
  if(saved==="night")root.setAttribute("data-clay-mode","night");
  function sync(){if(!toggle)return;var dark=root.getAttribute("data-clay-mode")==="night";toggle.setAttribute("aria-pressed",String(dark));toggle.textContent=dark?"%THEME_LIGHT%":"%THEME_DARK%";}
  sync();
  if(toggle)toggle.addEventListener("click",function(){var dark=root.getAttribute("data-clay-mode")==="night";if(dark)root.removeAttribute("data-clay-mode");else root.setAttribute("data-clay-mode","night");try{localStorage.setItem("clay-tutor-mode",dark?"day":"night");}catch(_){}sync();});
  function fallback(value){var area=document.createElement("textarea");area.value=value;area.setAttribute("readonly","");area.style.position="fixed";area.style.opacity="0";document.body.appendChild(area);area.select();var ok=false;try{ok=document.execCommand("copy");}catch(_){ok=false;}area.remove();return ok;}
  function copy(value){if(navigator.clipboard&&navigator.clipboard.writeText)return navigator.clipboard.writeText(value).then(function(){return true;},function(){return fallback(value);});return Promise.resolve(fallback(value));}
  var button=document.querySelector("[data-clay-copy]");
  if(button)button.addEventListener("click",function(){var code=document.querySelector("[data-clay-code]"),status=document.querySelector("[data-clay-copy-status]");copy(code?code.textContent.trim():"").then(function(ok){if(status)status.textContent=ok?"%COPY_SUCCESS%":"%COPY_FAILURE%";});});
  window.clayCopy=copy;
}());
