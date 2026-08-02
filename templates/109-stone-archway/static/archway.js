(function(){
  'use strict';
  var menu=document.getElementById('archbar-btn'),nav=document.getElementById('archbar-nav');
  if(menu&&nav){menu.addEventListener('click',function(){var open=nav.classList.toggle('is-open');menu.setAttribute('aria-expanded',open?'true':'false');});document.addEventListener('keydown',function(event){if(event.key==='Escape'&&nav.classList.contains('is-open')){nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');menu.focus();}});}
  var data={space:{mark:'SPACE · COURTYARD',title:'院落门径',rows:[['一','前院月洞门'],['二','回廊花门'],['三','后园券洞']]},material:{mark:'MATERIAL · STONE',title:'石作门径',rows:[['一','青石券门'],['二','花岗岩门墩'],['三','砖石混合拱券']]},era:{mark:'ERA · OLD CITY',title:'年代门径',rows:[['一','旧城门坊'],['二','近代里弄门'],['三','当代庭院门']]}};
  var tablist=document.querySelector('.arch-modes'),buttons=[].slice.call(document.querySelectorAll('.arch-mode')),panel=document.querySelector('.arch-result'),mark=document.getElementById('arch-result-mark'),title=document.getElementById('arch-result-title'),list=document.getElementById('arch-result-list');
  if(tablist)tablist.setAttribute('aria-label','寻径方式');
  if(panel){panel.id='arch-results';panel.setAttribute('role','tabpanel');panel.setAttribute('aria-live','polite');panel.setAttribute('aria-atomic','true');}
  buttons.forEach(function(button,index){button.id='arch-mode-'+(index+1);button.setAttribute('aria-controls','arch-results');button.setAttribute('tabindex',index===0?'0':'-1');});
  function render(key){var item=data[key];if(!item||!list)return;if(mark)mark.textContent=item.mark;if(title)title.textContent=item.title;list.innerHTML=item.rows.map(function(row){return'<li><strong>'+row[0]+'</strong><span>'+row[1]+'</span></li>';}).join('');buttons.forEach(function(button){var active=button.dataset.mode===key;button.classList.toggle('is-active',active);button.setAttribute('aria-selected',active?'true':'false');button.setAttribute('tabindex',active?'0':'-1');if(active&&panel)panel.setAttribute('aria-labelledby',button.id);});}
  function move(current,event){var index=buttons.indexOf(current),next=index;if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(index+1)%buttons.length;else if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(index-1+buttons.length)%buttons.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=buttons.length-1;else return;event.preventDefault();render(buttons[next].dataset.mode);buttons[next].focus();}
  buttons.forEach(function(button){button.addEventListener('click',function(){render(button.dataset.mode);});button.addEventListener('keydown',function(event){move(button,event);});});
  if(buttons.length)render('space');
}());
