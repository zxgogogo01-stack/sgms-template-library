(function () {
  'use strict';

  var menuButton = document.getElementById('casebar-btn');
  if (menuButton) {
    menuButton.addEventListener('click', function () {
      var nav = document.getElementById('casebar-nav');
      if (!nav) return;
      var open = nav.classList.toggle('is-open');
      menuButton.classList.toggle('is-open', open);
      menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var cases = {
    fee: { label: '费用差异核验', items: ['固定订单类型和计价单位', '重算费率与优惠的作用顺序', '按结算批次回到账单复查'] },
    arrival: { label: '到账异常核验', items: ['记录发生时区与状态更新时间', '核对批次、路径和到账位置', '保留编号后再对照公开规则'] },
    source: { label: '资料来源核验', items: ['确认域名和页面归属', '记录发布日期与修订日期', '寻找独立来源做交叉验证'] }
  };
  var buttons = Array.prototype.slice.call(document.querySelectorAll('.case-filter'));
  var label = document.getElementById('case-result-label');
  var list = document.getElementById('case-result-list');
  var panel = document.querySelector('.case-result');
  if (panel) {
    panel.id = 'case-result';
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-labelledby', 'case-result-label');
    panel.setAttribute('aria-atomic', 'true');
  }
  function render(key) {
    var data = cases[key];
    if (!data || !list) return;
    if (label) label.textContent = data.label;
    list.innerHTML = data.items.map(function (item, index) { return '<li><strong>0' + (index + 1) + '</strong><span>' + item + '</span></li>'; }).join('');
    buttons.forEach(function (button) {
      var active = button.getAttribute('data-case') === key;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
      button.setAttribute('aria-controls', 'case-result');
    });
  }
  buttons.forEach(function (button, index) {
    button.addEventListener('click', function () { render(button.getAttribute('data-case')); });
    button.addEventListener('keydown', function (event) {
      var next = null;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % buttons.length;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + buttons.length) % buttons.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = buttons.length - 1;
      if (next === null) return;
      event.preventDefault();
      buttons[next].focus();
      render(buttons[next].getAttribute('data-case'));
    });
  });
  if (buttons.length && list) render('fee');
}());
