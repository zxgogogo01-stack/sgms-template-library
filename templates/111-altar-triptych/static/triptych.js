(function(){
  'use strict';
  var menu=document.getElementById('tripbar-btn'),nav=document.getElementById('tripbar-nav');
  if(menu&&nav){menu.addEventListener('click',function(){var open=nav.classList.toggle('is-open');menu.setAttribute('aria-expanded',open?'true':'false');});document.addEventListener('keydown',function(event){if(event.key==='Escape'&&nav.classList.contains('is-open')){nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');menu.focus();}});}
  var data={story:{mark:'STORY · SEQUENCE',title:'海岸—等待—归航',rows:[['左','风暴后的海岸'],['中','灯塔里的等待'],['右','晨光中的归航']]},tone:{mark:'TONE · DAWN',title:'深蓝—金光—暖白',rows:[['左','夜色与潮痕'],['中','第一束金光'],['右','雾散后的暖白']]},view:{mark:'VIEW · THREE VOICES',title:'远景—正面—回望',rows:[['左','从岸上远望'],['中','正对灯塔'],['右','从船上回望']]}};
  var tablist=document.querySelector('.trip-modes'),buttons=[].slice.call(document.querySelectorAll('.trip-mode')),panel=document.querySelector('.trip-result'),mark=document.getElementById('trip-result-mark'),title=document.getElementById('trip-result-title'),list=document.getElementById('trip-result-list');
  if(tablist)tablist.setAttribute('aria-label','三联画导览方式');
  if(panel){panel.id='trip-results';panel.setAttribute('role','tabpanel');panel.setAttribute('aria-live','polite');panel.setAttribute('aria-atomic','true');}
  buttons.forEach(function(button,index){button.id='trip-mode-'+(index+1);button.setAttribute('aria-controls','trip-results');button.setAttribute('tabindex',index===0?'0':'-1');});
  function render(key){var item=data[key];if(!item||!list)return;if(mark)mark.textContent=item.mark;if(title)title.textContent=item.title;list.innerHTML=item.rows.map(function(row){return'<li><strong>'+row[0]+'</strong><span>'+row[1]+'</span></li>';}).join('');buttons.forEach(function(button){var active=button.dataset.mode===key;button.classList.toggle('is-active',active);button.setAttribute('aria-selected',active?'true':'false');button.setAttribute('tabindex',active?'0':'-1');if(active&&panel)panel.setAttribute('aria-labelledby',button.id);});}
  function move(current,event){var index=buttons.indexOf(current),next=index;if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(index+1)%buttons.length;else if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(index-1+buttons.length)%buttons.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=buttons.length-1;else return;event.preventDefault();render(buttons[next].dataset.mode);buttons[next].focus();}
  buttons.forEach(function(button){button.addEventListener('click',function(){render(button.dataset.mode);});button.addEventListener('keydown',function(event){move(button,event);});});
  if(buttons.length)render('story');
}());
