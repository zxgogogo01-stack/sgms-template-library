(function () {
  'use strict';

  var sampleLines = [
    '+28000 顾问项目首款',
    '-1280 云服务续费',
    '-860 样品打印',
    '+16800 设计项目二期款',
    '-6200 外部协作者费用',
    '+9600 摄影交付尾款',
    '-5460 当月税费预留',
    '-699 设计软件订阅'
  ].join('\n');

  var activeFilter = 'all';
  var search = document.getElementById('entry-search');
  var entries = Array.prototype.slice.call(document.querySelectorAll('[data-entry]'));
  var filters = Array.prototype.slice.call(document.querySelectorAll('[data-entry-filter]'));

  if (search && entries.length) {
    search.addEventListener('input', applyEntryFilters);
    filters.forEach(function (button) {
      button.addEventListener('click', function () {
        activeFilter = button.getAttribute('data-entry-filter') || 'all';
        filters.forEach(function (item) { item.setAttribute('aria-pressed', item === button ? 'true' : 'false'); });
        applyEntryFilters();
      });
    });
    var resetEntries = document.getElementById('reset-entries');
    if (resetEntries) {
      resetEntries.addEventListener('click', function () {
        activeFilter = 'all';
        search.value = '';
        filters.forEach(function (item) { item.setAttribute('aria-pressed', item.getAttribute('data-entry-filter') === 'all' ? 'true' : 'false'); });
        applyEntryFilters();
        search.focus();
      });
    }
  }

  function applyEntryFilters() {
    var query = search.value.trim().toLowerCase();
    var visible = 0;
    entries.forEach(function (entry) {
      var kind = entry.getAttribute('data-kind');
      var state = entry.getAttribute('data-state');
      var haystack = (entry.getAttribute('data-search') || entry.textContent).toLowerCase();
      var filterMatch = activeFilter === 'all' || kind === activeFilter || (activeFilter === 'review' && state === 'review');
      var searchMatch = !query || haystack.indexOf(query) !== -1;
      entry.hidden = !(filterMatch && searchMatch);
      if (!entry.hidden) visible++;
    });
    var count = document.getElementById('entry-count');
    var empty = document.getElementById('entry-empty');
    if (count) count.textContent = visible + ' / ' + entries.length + ' 笔可见';
    if (empty) empty.hidden = visible !== 0;
  }

  document.addEventListener('click', function (event) {
    var control = event.target.closest('[data-act]');
    if (!control) return;
    var action = control.getAttribute('data-act');
    if (action === 'copy-code') copyLedgerCode(control);
    if (action === 'load-sample') loadSample();
    if (action === 'clear-balance') clearBalance();
    if (action === 'copy-result') copyBalanceResult(control);
  });

  function copyLedgerCode(button) {
    var code = document.getElementById('ledger-code');
    var status = document.getElementById('copy-status');
    if (!code || !status) return;
    copyText(code.textContent.trim()).then(function () {
      status.textContent = '邀请码已复制。';
      button.textContent = '已复制';
      window.setTimeout(function () { button.textContent = '复制邀请码'; }, 1600);
    }, function () {
      status.textContent = '复制失败，请手动选择邀请码。';
    });
  }

  var form = document.getElementById('balance-form');
  var source = document.getElementById('balance-source');
  if (form && source) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      calculateBalance();
    });
    source.addEventListener('input', function () {
      updateLineCount();
      invalidateBalance();
    });
  }

  function invalidateBalance() {
    if (!source) return;
    source.removeAttribute('aria-invalid');
    setText('balance-error', '');
    setText('tool-status', '');
    var result = document.getElementById('balance-result');
    if (result) result.hidden = true;
  }

  function updateLineCount() {
    var count = document.getElementById('line-count');
    if (!source || !count) return;
    var lines = source.value.split(/\r?\n/).filter(function (line) { return line.trim(); });
    count.textContent = lines.length + ' 行';
  }

  function loadSample() {
    if (!source) return;
    source.value = sampleLines;
    updateLineCount();
    invalidateBalance();
    source.focus();
  }

  function parseBalance(text) {
    var lines = text.split(/\r?\n/);
    var incomingCents = 0;
    var outgoingCents = 0;
    var parsed = 0;
    var ignored = 0;
    lines.forEach(function (line) {
      if (!line.trim()) return;
      var match = line.match(/^\s*([+\-−])\s*[¥￥]?\s*((?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d{1,2})?)(?=\s|$)/);
      if (!match) {
        ignored++;
        return;
      }
      var amount = Number(match[2].replace(/,/g, ''));
      if (!Number.isFinite(amount) || amount > 1000000000000) {
        ignored++;
        return;
      }
      var cents = Math.round(amount * 100);
      var nextTotal = match[1] === '+' ? incomingCents + cents : outgoingCents + cents;
      if (!Number.isSafeInteger(cents) || !Number.isSafeInteger(nextTotal)) {
        ignored++;
        return;
      }
      if (match[1] === '+') incomingCents = nextTotal;
      else outgoingCents = nextTotal;
      parsed++;
    });
    return { incoming: incomingCents / 100, outgoing: outgoingCents / 100, net: (incomingCents - outgoingCents) / 100, parsed: parsed, ignored: ignored };
  }

  function calculateBalance() {
    if (!source) return;
    var raw = source.value;
    var value = raw.trim();
    if (!value) {
      showBalanceError('请先输入至少一行带正负号的金额。');
      return;
    }
    if (raw.length > 20000) {
      showBalanceError('单次输入不得超过 20,000 个字符。');
      return;
    }
    var nonEmptyLines = raw.split(/\r?\n/).filter(function (line) { return line.trim(); });
    if (nonEmptyLines.length > 500) {
      showBalanceError('单次最多处理 500 行，请分批核算。');
      return;
    }
    var result = parseBalance(value);
    if (!result.parsed) {
      showBalanceError('没有识别到可安全计算的金额。请检查正负号、千分位、小数位与单笔上限。');
      return;
    }
    source.removeAttribute('aria-invalid');
    setText('balance-error', result.ignored ? result.ignored + ' 行未识别或超出安全范围，已忽略；请检查格式与金额。' : '');
    setText('total-in', money(result.incoming));
    setText('total-out', '−' + money(result.outgoing));
    setText('net-balance', (result.net < 0 ? '−' : '') + money(Math.abs(result.net)));
    setText('parsed-count', String(result.parsed));
    setText('ignored-count', String(result.ignored));
    setText('result-status', result.ignored ? 'Check input' : 'Balanced');
    var box = document.getElementById('balance-result');
    if (box) {
      box.hidden = false;
      box.focus();
    }
    setText('tool-status', '');
  }

  function showBalanceError(message) {
    source.setAttribute('aria-invalid', 'true');
    setText('balance-error', message);
    setText('tool-status', '');
    var result = document.getElementById('balance-result');
    if (result) result.hidden = true;
    source.focus();
  }

  function clearBalance() {
    if (!source) return;
    source.value = '';
    updateLineCount();
    invalidateBalance();
    source.focus();
  }

  function copyBalanceResult(button) {
    var incoming = textOf('total-in');
    var outgoing = textOf('total-out');
    var net = textOf('net-balance');
    var parsed = textOf('parsed-count');
    var ignored = textOf('ignored-count');
    var value = ['收入合计：' + incoming, '支出合计：' + outgoing, '净结余：' + net, '识别：' + parsed + ' 笔；忽略：' + ignored + ' 行'].join('\n');
    copyText(value).then(function () {
      setText('tool-status', '核算结果已复制。');
      button.textContent = '已复制';
      window.setTimeout(function () { button.textContent = '复制结果'; }, 1600);
    }, function () {
      setText('tool-status', '复制失败，请手动记录结果。');
    });
  }

  function money(value) {
    return new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY', maximumFractionDigits: 2 }).format(value).replace('CN¥', '¥');
  }

  function setText(id, value) {
    var node = document.getElementById(id);
    if (node) node.textContent = value;
  }

  function textOf(id) {
    var node = document.getElementById(id);
    return node ? node.textContent.trim() : '';
  }

  function copyText(value) {
    if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(value);
    return new Promise(function (resolve, reject) {
      var area = document.createElement('textarea');
      area.value = value;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      try {
        if (!document.execCommand('copy')) throw new Error('copy command failed');
        resolve();
      } catch (error) {
        reject(error);
      } finally {
        area.remove();
      }
    });
  }
})();
