(function(){
  'use strict';
  var menu=document.getElementById('lexbar-btn'),nav=document.getElementById('lexbar-nav');
  if(menu&&nav){menu.addEventListener('click',function(){var open=nav.classList.toggle('is-open');menu.setAttribute('aria-expanded',open?'true':'false');});document.addEventListener('keydown',function(event){if(event.key==='Escape'&&nav.classList.contains('is-open')){nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');menu.focus();}});}
  var data={radical:{mark:'RADICAL · 雨',title:'雨部词条',rows:[['听雨','静坐辨认雨声'],['山岚','雨后山间浮雾'],['檐声','雨落屋檐之声']]},sound:{mark:'SOUND · G',title:'音序 G',rows:[['归棹','乘舟归来'],['故园','久别的家乡'],['更漏','古时夜间计时']]},topic:{mark:'TOPIC · 行旅',title:'行旅词条',rows:[['行笥','旅途所携小箱'],['归棹','归途中的船桨'],['客窗','旅舍中的窗']]}};
  var tablist=document.querySelector('.lex-modes'),buttons=[].slice.call(document.querySelectorAll('.lex-mode')),panel=document.querySelector('.lex-results'),mark=document.getElementById('lex-result-mark'),title=document.getElementById('lex-result-title'),list=document.getElementById('lex-result-list');
  if(tablist)tablist.setAttribute('aria-label','检字方式');
  if(panel){panel.id='lex-results';panel.setAttribute('role','tabpanel');panel.setAttribute('aria-live','polite');panel.setAttribute('aria-atomic','true');}
  buttons.forEach(function(button,index){button.id='lex-mode-'+(index+1);button.setAttribute('aria-controls','lex-results');button.setAttribute('tabindex',index===0?'0':'-1');});
  function render(key){var item=data[key];if(!item||!list)return;if(mark)mark.textContent=item.mark;if(title)title.textContent=item.title;list.innerHTML=item.rows.map(function(row){return'<li><b>'+row[0]+'</b><span>'+row[1]+'</span></li>';}).join('');buttons.forEach(function(button){var active=button.dataset.mode===key;button.classList.toggle('is-active',active);button.setAttribute('aria-selected',active?'true':'false');button.setAttribute('tabindex',active?'0':'-1');if(active&&panel)panel.setAttribute('aria-labelledby',button.id);});}
  function move(current,event){var index=buttons.indexOf(current),next=index;if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(index+1)%buttons.length;else if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(index-1+buttons.length)%buttons.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=buttons.length-1;else return;event.preventDefault();render(buttons[next].dataset.mode);buttons[next].focus();}
  buttons.forEach(function(button){button.addEventListener('click',function(){render(button.dataset.mode);});button.addEventListener('keydown',function(event){move(button,event);});});
  if(buttons.length)render('radical');
}());
