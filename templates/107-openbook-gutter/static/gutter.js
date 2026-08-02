(function(){
  'use strict';
  var menu=document.getElementById('gutbar-btn'),nav=document.getElementById('gutbar-nav');
  if(menu&&nav){menu.addEventListener('click',function(){var open=nav.classList.toggle('is-open');menu.setAttribute('aria-expanded',open?'true':'false');});document.addEventListener('keydown',function(event){if(event.key==='Escape'&&nav.classList.contains('is-open')){nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');menu.focus();}});}
  var data={topic:{mark:'TOPIC · READING',title:'阅读痕迹',rows:[['018','藏书票上的旧名字'],['073','装订沟里的干花'],['126','页边铅笔批注']]},page:{mark:'FOLIO · SELECTED',title:'页码索引',rows:[['024','铅字与墨色'],['088','午后书店'],['142','被水浸过的扉页']]},note:{mark:'MARGINALIA · PENCIL',title:'批注索引',rows:[['031','等春天再读'],['097','此处有雨声'],['155','借给远方的人']]}};
  var tablist=document.querySelector('.gutter-modes'),buttons=[].slice.call(document.querySelectorAll('.gutter-mode')),panel=document.querySelector('.gutter-result'),mark=document.getElementById('gutter-result-mark'),title=document.getElementById('gutter-result-title'),list=document.getElementById('gutter-result-list');
  if(tablist)tablist.setAttribute('aria-label','索引方式');
  if(panel){panel.id='gutter-result';panel.setAttribute('role','tabpanel');panel.setAttribute('aria-live','polite');panel.setAttribute('aria-atomic','true');}
  buttons.forEach(function(button,index){button.id='gutter-mode-'+(index+1);button.setAttribute('aria-controls','gutter-result');button.setAttribute('tabindex',index===0?'0':'-1');});
  function render(key){var item=data[key];if(!item||!list)return;if(mark)mark.textContent=item.mark;if(title)title.textContent=item.title;list.innerHTML=item.rows.map(function(row){return'<li><strong>'+row[0]+'</strong><span>'+row[1]+'</span></li>';}).join('');buttons.forEach(function(button){var active=button.dataset.mode===key;button.classList.toggle('is-active',active);button.setAttribute('aria-selected',active?'true':'false');button.setAttribute('tabindex',active?'0':'-1');if(active&&panel)panel.setAttribute('aria-labelledby',button.id);});}
  function move(current,event){var index=buttons.indexOf(current),next=index;if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(index+1)%buttons.length;else if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(index-1+buttons.length)%buttons.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=buttons.length-1;else return;event.preventDefault();render(buttons[next].dataset.mode);buttons[next].focus();}
  buttons.forEach(function(button){button.addEventListener('click',function(){render(button.dataset.mode);});button.addEventListener('keydown',function(event){move(button,event);});});
  if(buttons.length)render('topic');
}());
