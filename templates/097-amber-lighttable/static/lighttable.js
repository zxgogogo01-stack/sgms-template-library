(function(){
  'use strict';

  var menu=document.getElementById('lightbar-btn');
  var nav=document.getElementById('lightbar-nav');
  if(menu&&nav){
    menu.addEventListener('click',function(){
      var open=nav.classList.toggle('is-open');
      menu.setAttribute('aria-expanded',open?'true':'false');
    });
    document.addEventListener('keydown',function(event){
      if(event.key==='Escape'&&nav.classList.contains('is-open')){
        nav.classList.remove('is-open');
        menu.setAttribute('aria-expanded','false');
        menu.focus();
      }
    });
  }

  var data={
    repeat:{pass:'PASS 01 · REPEAT',title:'先辨认反复出现的线索',items:['标记相似的姿态、色块和观看距离','把重复画面放到同一行比较','写下自己持续返回它们的原因']},
    shift:{pass:'PASS 02 · SHIFT',title:'寻找真正带来变化的画面',items:['标记打破原有节奏的细节','确认差异是否增加新的信息','移除只靠新奇感成立的照片']},
    sequence:{pass:'PASS 03 · SEQUENCE',title:'让顺序建立观看节奏',items:['用第一张照片说明观看规则','在中段安排一次明确转折','让结尾留下继续想象的空间']}
  };
  var buttons=[].slice.call(document.querySelectorAll('.light-pass'));
  var panel=document.querySelector('.light-result');
  var pass=document.getElementById('light-result-pass');
  var title=document.getElementById('light-result-title');
  var list=document.getElementById('light-result-list');

  if(panel){
    panel.id='light-result';
    panel.setAttribute('role','tabpanel');
    panel.setAttribute('aria-atomic','true');
  }
  buttons.forEach(function(button,index){
    button.id='light-pass-'+(index+1);
    button.setAttribute('aria-controls','light-result');
    button.setAttribute('tabindex',index===0?'0':'-1');
  });

  function render(key){
    var item=data[key];
    if(!item||!list)return;
    if(pass)pass.textContent=item.pass;
    if(title)title.textContent=item.title;
    list.innerHTML=item.items.map(function(text,index){
      return '<li><strong>0'+(index+1)+'</strong><span>'+text+'</span></li>';
    }).join('');
    buttons.forEach(function(button){
      var active=button.getAttribute('data-pass')===key;
      button.classList.toggle('is-active',active);
      button.setAttribute('aria-selected',active?'true':'false');
      button.setAttribute('tabindex',active?'0':'-1');
      if(active&&panel)panel.setAttribute('aria-labelledby',button.id);
    });
  }

  function move(current,event){
    var index=buttons.indexOf(current);
    var next=index;
    if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(index+1)%buttons.length;
    else if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(index-1+buttons.length)%buttons.length;
    else if(event.key==='Home')next=0;
    else if(event.key==='End')next=buttons.length-1;
    else return;
    event.preventDefault();
    render(buttons[next].getAttribute('data-pass'));
    buttons[next].focus();
  }

  buttons.forEach(function(button){
    button.addEventListener('click',function(){render(button.getAttribute('data-pass'));});
    button.addEventListener('keydown',function(event){move(button,event);});
  });
  if(buttons.length)render('repeat');
}());
