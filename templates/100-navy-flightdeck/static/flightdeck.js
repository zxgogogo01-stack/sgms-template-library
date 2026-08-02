(function(){
  'use strict';

  var menu=document.getElementById('flightbar-btn');
  var nav=document.getElementById('flightbar-nav');
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
    mission:{check:'CHECK 01 · MISSION',title:'先确认所有人理解同一项任务',items:['成功标准与当前范围已经写清','每个关键节点都有明确负责人','依赖与输入已经可以使用']},
    risk:{check:'CHECK 02 · RISK',title:'让风险在执行之前可见',items:['已标记最早可观察的异常信号','升级阈值与通知对象已经明确','高风险动作拥有额外确认步骤']},
    rollback:{check:'CHECK 03 · ROLLBACK',title:'确认发生偏差时仍能安全返回',items:['回退步骤已经验证且可以执行','停止条件与恢复负责人已经明确','关键状态和证据已有完整备份']}
  };
  var buttons=[].slice.call(document.querySelectorAll('.flight-check'));
  var panel=document.querySelector('.flight-result');
  var check=document.getElementById('flight-result-check');
  var title=document.getElementById('flight-result-title');
  var list=document.getElementById('flight-result-list');

  if(panel){
    panel.id='flight-result';
    panel.setAttribute('role','tabpanel');
    panel.setAttribute('aria-atomic','true');
  }
  buttons.forEach(function(button,index){
    button.id='flight-check-'+(index+1);
    button.setAttribute('aria-controls','flight-result');
    button.setAttribute('tabindex',index===0?'0':'-1');
  });

  function render(key){
    var item=data[key];
    if(!item||!list)return;
    if(check)check.textContent=item.check;
    if(title)title.textContent=item.title;
    list.innerHTML=item.items.map(function(text,index){
      return '<li><strong>0'+(index+1)+'</strong><span>'+text+'</span></li>';
    }).join('');
    buttons.forEach(function(button){
      var active=button.getAttribute('data-check')===key;
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
    render(buttons[next].getAttribute('data-check'));
    buttons[next].focus();
  }

  buttons.forEach(function(button){
    button.addEventListener('click',function(){render(button.getAttribute('data-check'));});
    button.addEventListener('keydown',function(event){move(button,event);});
  });
  if(buttons.length)render('mission');
}());
