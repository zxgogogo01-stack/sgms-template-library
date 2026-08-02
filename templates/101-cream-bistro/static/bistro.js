(function(){
  'use strict';

  var menu=document.getElementById('bistrobar-btn');
  var nav=document.getElementById('bistrobar-nav');
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
    fresh:{menu:'MENU 01 · FRESH',title:'清爽晚餐',items:[['前菜','梨、茴香与核桃沙拉'],['主菜','柠檬黄油煎鱼'],['甜点','柑橘酸奶与蜂蜜']]},
    warm:{menu:'MENU 02 · WARM',title:'温暖晚餐',items:[['前菜','冬日根茎蔬菜浓汤'],['主菜','迷迭香烩鸡与小洋葱'],['甜点','烤苹果与肉桂奶油']]},
    rich:{menu:'MENU 03 · RICH',title:'丰盛晚餐',items:[['前菜','烤甜椒与酸面包'],['主菜','慢烤番茄、白豆与香草'],['甜点','深色巧克力与海盐挞']]}
  };
  var buttons=[].slice.call(document.querySelectorAll('.bistro-mood'));
  var panel=document.querySelector('.bistro-result');
  var menuLabel=document.getElementById('bistro-result-menu');
  var title=document.getElementById('bistro-result-title');
  var list=document.getElementById('bistro-result-list');

  if(panel){
    panel.id='bistro-result';
    panel.setAttribute('role','tabpanel');
    panel.setAttribute('aria-atomic','true');
  }
  buttons.forEach(function(button,index){
    button.id='bistro-mood-'+(index+1);
    button.setAttribute('aria-controls','bistro-result');
    button.setAttribute('tabindex',index===0?'0':'-1');
  });

  function render(key){
    var item=data[key];
    if(!item||!list)return;
    if(menuLabel)menuLabel.textContent=item.menu;
    if(title)title.textContent=item.title;
    list.innerHTML=item.items.map(function(itemRow){
      return '<li><strong>'+itemRow[0]+'</strong><span>'+itemRow[1]+'</span></li>';
    }).join('');
    buttons.forEach(function(button){
      var active=button.getAttribute('data-mood')===key;
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
    render(buttons[next].getAttribute('data-mood'));
    buttons[next].focus();
  }

  buttons.forEach(function(button){
    button.addEventListener('click',function(){render(button.getAttribute('data-mood'));});
    button.addEventListener('keydown',function(event){move(button,event);});
  });
  if(buttons.length)render('fresh');
}());
