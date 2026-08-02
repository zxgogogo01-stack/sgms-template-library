(function(){
  'use strict';
  var menu=document.getElementById('depbar-btn'),nav=document.getElementById('depbar-nav');
  if(menu&&nav){
    menu.addEventListener('click',function(){var open=nav.classList.toggle('is-open');menu.setAttribute('aria-expanded',open?'true':'false');});
    document.addEventListener('keydown',function(event){if(event.key==='Escape'&&nav.classList.contains('is-open')){nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');menu.focus();}});
  }
  var data={direction:{kicker:'DIRECTION · NORTH',title:'北向列车',rows:[['06:40','北岸','01'],['09:15','松川','03'],['13:20','临海','05']]},hour:{kicker:'TIME · MORNING',title:'上午出发',rows:[['06:40','北岸','01'],['08:05','溪谷','02'],['09:15','松川','03']]},platform:{kicker:'PLATFORM · HALL A',title:'A 厅站台',rows:[['06:40','北岸','01'],['08:05','溪谷','02'],['11:30','旧城','04']]}};
  var buttons=[].slice.call(document.querySelectorAll('.dep-filter')),panel=document.querySelector('.dep-result'),kicker=document.getElementById('dep-result-kicker'),title=document.getElementById('dep-result-title'),list=document.getElementById('dep-result-list');
  if(panel){panel.id='dep-result';panel.setAttribute('role','tabpanel');panel.setAttribute('aria-live','polite');panel.setAttribute('aria-atomic','true');}
  buttons.forEach(function(button,index){button.id='dep-filter-'+(index+1);button.setAttribute('aria-controls','dep-result');button.setAttribute('tabindex',index===0?'0':'-1');});
  function render(key){var item=data[key];if(!item||!list)return;if(kicker)kicker.textContent=item.kicker;if(title)title.textContent=item.title;list.innerHTML=item.rows.map(function(row){return'<li><time>'+row[0]+'</time><span>'+row[1]+'</span><b>'+row[2]+'</b></li>';}).join('');buttons.forEach(function(button){var active=button.getAttribute('data-filter')===key;button.classList.toggle('is-active',active);button.setAttribute('aria-selected',active?'true':'false');button.setAttribute('tabindex',active?'0':'-1');if(active&&panel)panel.setAttribute('aria-labelledby',button.id);});}
  function move(current,event){var index=buttons.indexOf(current),next=index;if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(index+1)%buttons.length;else if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(index-1+buttons.length)%buttons.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=buttons.length-1;else return;event.preventDefault();render(buttons[next].getAttribute('data-filter'));buttons[next].focus();}
  buttons.forEach(function(button){button.addEventListener('click',function(){render(button.getAttribute('data-filter'));});button.addEventListener('keydown',function(event){move(button,event);});});
  if(buttons.length)render('direction');
}());
