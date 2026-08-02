(function () {
  'use strict';

  var menuButton = document.getElementById('routebar-btn');
  if (menuButton) {
    menuButton.addEventListener('click', function () {
      var nav = document.getElementById('routebar-nav');
      if (!nav) return;
      var open = nav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var routes = {
    start: {
      label: '第一次核对',
      items: ['先看懂一笔手续费的流向', '分清现货与合约费率表', '核对结算周期与到账位置']
    },
    compare: {
      label: '比较两种方案',
      items: ['统一交易量和订单类型', '把比例换算成实际金额', '检查是否存在叠加限制']
    },
    verify: {
      label: '排查到账差异',
      items: ['确认订单发生时区', '核对挂单与吃单标签', '按结算批次反查到账记录']
    }
  };

  var routeButtons = Array.prototype.slice.call(document.querySelectorAll('.route-choice'));
  var routeLabel = document.getElementById('route-result-label');
  var routeList = document.getElementById('route-result-list');
  var routePanel = document.querySelector('.route-result');
  if (routePanel) {
    routePanel.id = 'route-result';
    routePanel.setAttribute('role', 'region');
    routePanel.setAttribute('aria-labelledby', 'route-result-label');
    routePanel.setAttribute('aria-atomic', 'true');
  }
  var render = function (key) {
    var route = routes[key];
    if (!route || !routeList) return;
    if (routeLabel) routeLabel.textContent = route.label + '的三步路线';
    routeList.innerHTML = route.items.map(function (item, index) {
      return '<li><strong>0' + (index + 1) + '</strong><span>' + item + '</span></li>';
    }).join('');
  };
  var activate = function (button, moveFocus) {
    routeButtons.forEach(function (item) {
      var active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', active ? 'true' : 'false');
      item.setAttribute('aria-controls', 'route-result');
    });
    render(button.getAttribute('data-route'));
    if (moveFocus) button.focus();
  };
  routeButtons.forEach(function (button, index) {
    button.addEventListener('click', function () {
      activate(button, false);
    });
    button.addEventListener('keydown', function (event) {
      var next = null;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % routeButtons.length;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + routeButtons.length) % routeButtons.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = routeButtons.length - 1;
      if (next === null) return;
      event.preventDefault();
      activate(routeButtons[next], true);
    });
  });
  if (routeButtons.length) activate(routeButtons[0], false);
})();
