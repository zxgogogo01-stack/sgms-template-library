(function () {
  'use strict';

  var root = document.documentElement;
  var themeKey = 'layered-lookout-046-theme';
  function normalize(value) { return String(value || '').normalize('NFKC').trim(); }
  function unicodeLength(value) { return Array.from(value).length; }
  var storedTheme = null;
  try { storedTheme = localStorage.getItem(themeKey); } catch (error) { storedTheme = null; }
  var initialTheme = storedTheme || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(initialTheme);

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    document.querySelectorAll('[data-theme-label]').forEach(function (label) {
      label.textContent = theme === 'dark' ? '亮色' : '暗色';
    });
    document.querySelectorAll('[data-theme-button]').forEach(function (button) {
      button.setAttribute('aria-label', theme === 'dark' ? '切换到亮色模式' : '切换到暗色模式');
    });
  }

  document.querySelectorAll('[data-theme-button]').forEach(function (button) {
    button.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem(themeKey, next); } catch (error) { /* theme still works */ }
    });
  });

  var menuButton = document.querySelector('[data-menu-button]');
  var siteNav = document.querySelector('[data-site-nav]');
  if (menuButton && siteNav) {
    menuButton.addEventListener('click', function () {
      var open = siteNav.getAttribute('data-open') !== 'true';
      siteNav.setAttribute('data-open', String(open));
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.textContent = open ? '收起' : '导航';
      if (open) {
        var firstLink = siteNav.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && siteNav.getAttribute('data-open') === 'true') {
        siteNav.setAttribute('data-open', 'false');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.textContent = '导航';
        menuButton.focus();
      }
    });
  }

  function copyText(text, done, failed) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else {
      fallback();
    }
    function fallback() {
      var area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      try { document.execCommand('copy') ? done() : failed(); } catch (error) { failed(); }
      document.body.removeChild(area);
    }
  }

  var clock = document.querySelector('[data-clock]');
  if (clock) {
    var refreshClock = function () {
      var now = new Date();
      clock.textContent = now.toLocaleTimeString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' CST';
    };
    refreshClock();
    window.setInterval(refreshClock, 1000);
  }

  var search = document.querySelector('[data-watch-search]');
  var filterBox = document.querySelector('[data-watch-filters]');
  var watchCards = Array.prototype.slice.call(document.querySelectorAll('[data-watch]'));
  var watchStatus = document.querySelector('[data-watch-status]');
  var watchEmpty = document.querySelector('[data-watch-empty]');
  var activeFilter = 'all';
  function updateWatchlist() {
    if (!watchCards.length) return;
    var term = search ? normalize(search.value).toLocaleLowerCase() : '';
    var visible = 0;
    watchCards.forEach(function (card) {
      var matchesFilter = activeFilter === 'all' || card.getAttribute('data-state') === activeFilter;
      var matchesSearch = !term || normalize(card.getAttribute('data-search') || '').toLocaleLowerCase().indexOf(term) !== -1 || normalize(card.textContent).toLocaleLowerCase().indexOf(term) !== -1;
      card.hidden = !(matchesFilter && matchesSearch);
      if (!card.hidden) visible += 1;
    });
    if (watchStatus) watchStatus.textContent = '显示 ' + visible + ' / ' + watchCards.length + ' 项';
    if (watchEmpty) watchEmpty.hidden = visible !== 0;
  }
  if (search) search.addEventListener('input', updateWatchlist);
  if (filterBox) {
    filterBox.addEventListener('click', function (event) {
      var button = event.target.closest('[data-filter]');
      if (!button) return;
      activeFilter = button.getAttribute('data-filter');
      filterBox.querySelectorAll('[data-filter]').forEach(function (item) { item.setAttribute('aria-pressed', String(item === button)); });
      updateWatchlist();
    });
  }

  var inviteButton = document.querySelector('[data-copy-invite]');
  if (inviteButton) {
    inviteButton.addEventListener('click', function () {
      var code = inviteButton.parentElement.querySelector('code');
      var status = document.querySelector('[data-invite-status]');
      copyText(code ? code.textContent.trim() : '', function () {
        inviteButton.textContent = '已复制';
        if (status) status.textContent = '邀请码已进入剪贴板';
      }, function () { if (status) status.textContent = '复制失败，请手动选择邀请码'; });
    });
  }

  var progress = document.querySelector('[data-read-progress]');
  if (progress) {
    var updateProgress = function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      progress.style.width = (ratio * 100).toFixed(1) + '%';
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
  }

  var checklistButton = document.querySelector('[data-copy-checklist]');
  if (checklistButton) {
    checklistButton.addEventListener('click', function () {
      var items = Array.prototype.map.call(document.querySelectorAll('.lo46-checklist li'), function (item, index) { return (index + 1) + '. ' + item.textContent.trim(); });
      var feedback = document.querySelector('[data-checklist-status]');
      copyText(items.join('\n'), function () { checklistButton.textContent = '七项已复制'; if (feedback) feedback.textContent = '可直接粘贴到复核记录'; }, function () { if (feedback) feedback.textContent = '复制失败，请手动选择清单'; });
    });
  }

  var thresholdForm = document.querySelector('[data-threshold-form]');
  var lastResult = '';
  if (thresholdForm) {
    var valueInput = thresholdForm.elements.value;
    var warnInput = thresholdForm.elements.warn;
    var alarmInput = thresholdForm.elements.alarm;
    var unitInput = thresholdForm.elements.unit;
    var message = document.querySelector('[data-threshold-message]');
    var panel = document.querySelector('[data-result-panel]');
    var label = document.querySelector('[data-result-label]');
    var resultValue = document.querySelector('[data-result-value]');
    var resultWarn = document.querySelector('[data-result-warn]');
    var resultAlarm = document.querySelector('[data-result-alarm]');
    var copyResult = document.querySelector('[data-copy-result]');
    var resultCopy = document.querySelector('[data-result-copy]');
    var directionInputs = Array.prototype.slice.call(thresholdForm.querySelectorAll('input[name=direction]'));
    var thresholdFields = [valueInput, warnInput, alarmInput, unitInput];
    message.id = 'lo46-threshold-message';
    message.setAttribute('role', 'alert');
    message.setAttribute('aria-atomic', 'true');
    function direction() { var selected = thresholdForm.querySelector('input[name=direction]:checked'); return selected ? selected.value : ''; }
    function parseDecimal(field) {
      var raw = normalize(field.value);
      if (!/^-?(?:\d+|\d*\.\d+)$/.test(raw)) return null;
      var fraction = raw.split('.')[1] || '';
      if (fraction.length > 6) return null;
      var number = Number(raw);
      return Number.isFinite(number) && Math.abs(number) <= 1000000000000 ? number : null;
    }
    function formatDifference(value) { return Math.abs(value).toFixed(6).replace(/\.?0+$/, ''); }
    function clearResult() {
      message.textContent = '';
      panel.setAttribute('data-state', 'idle');
      panel.querySelector('strong').textContent = '—';
      panel.querySelector('h3').textContent = '尚未检查';
      panel.querySelector('p').textContent = '填入三条数值后，状态、比较关系和建议动作会显示在这里。';
      label.textContent = '等待数值';
      resultValue.textContent = resultWarn.textContent = resultAlarm.textContent = '—';
      copyResult.disabled = true;
      resultCopy.textContent = '';
      lastResult = '';
      thresholdFields.concat(directionInputs).forEach(function (field) { field.removeAttribute('aria-invalid'); });
    }
    function invalidateResult(event) {
      event.currentTarget.removeAttribute('aria-invalid');
      message.textContent = '';
      if (lastResult || panel.getAttribute('data-state') !== 'idle') { clearResult(); label.textContent = '参数已修改，请重新检查'; }
    }
    thresholdFields.forEach(function (field) { field.addEventListener('input', invalidateResult); field.addEventListener('change', invalidateResult); });
    directionInputs.forEach(function (field) { field.addEventListener('change', invalidateResult); });
    function relation(value, line, highRisk) {
      var crossed = highRisk ? value >= line : value <= line;
      return crossed ? '已越 ' + formatDifference(value - line) : '还差 ' + formatDifference(value - line);
    }
    thresholdForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var value = parseDecimal(valueInput);
      var warn = parseDecimal(warnInput);
      var alarm = parseDecimal(alarmInput);
      var selectedDirection = direction();
      var unit = String(unitInput.value || '').normalize('NFC').trim() || '单位';
      var highRisk = selectedDirection === 'high';
      thresholdFields.concat(directionInputs).forEach(function (field) { field.removeAttribute('aria-invalid'); });
      var invalidFields = [valueInput, warnInput, alarmInput].filter(function (field) { return parseDecimal(field) === null; });
      if (invalidFields.length) {
        clearResult();
        invalidFields.forEach(function (field) { field.setAttribute('aria-invalid', 'true'); });
        message.textContent = '请完整填写普通十进制数；每项最多 6 位小数，绝对值不超过一万亿。';
        invalidFields[0].focus();
        return;
      }
      if (['high', 'low'].indexOf(selectedDirection) === -1) {
        clearResult();directionInputs.forEach(function (field) { field.setAttribute('aria-invalid', 'true'); });message.textContent = '请选择列表中的风险方向。';if (directionInputs[0]) directionInputs[0].focus();return;
      }
      if (unicodeLength(unit) > 12 || /[<>\u0000-\u001f]/.test(unit)) {
        clearResult();unitInput.setAttribute('aria-invalid', 'true');message.textContent = '单位应为 1–12 个普通字符。';unitInput.focus();return;
      }
      if ((highRisk && warn >= alarm) || (!highRisk && warn <= alarm)) {
        clearResult();
        warnInput.setAttribute('aria-invalid', 'true');
        alarmInput.setAttribute('aria-invalid', 'true');
        message.textContent = highRisk ? '风险随数值升高时，提醒线必须低于告警线。' : '风险随数值降低时，提醒线必须高于告警线。';
        warnInput.focus();
        return;
      }
      message.textContent = '';
      thresholdFields.concat(directionInputs).forEach(function (field) { field.removeAttribute('aria-invalid'); });
      var state = highRisk ? (value >= alarm ? 'alert' : value >= warn ? 'review' : 'normal') : (value <= alarm ? 'alert' : value <= warn ? 'review' : 'normal');
      var titles = { normal: '正常观察', review: '进入复核', alert: '触发告警' };
      var actions = { normal: '尚未越过提醒线，继续按既定窗口采样并保留背景。', review: '已越过提醒线，先核对来源、口径和已知事件。', alert: '已越过告警线，进入预设处理流程并记录恢复条件。' };
      panel.setAttribute('data-state', state);
      panel.querySelector('strong').textContent = value + unit;
      panel.querySelector('h3').textContent = titles[state];
      panel.querySelector('p').textContent = actions[state];
      label.textContent = titles[state];
      resultValue.textContent = value + ' ' + unit;
      resultWarn.textContent = relation(value, warn, highRisk);
      resultAlarm.textContent = relation(value, alarm, highRisk);
      lastResult = '阈值校准结果：' + titles[state] + '；当前值 ' + value + unit + '；提醒线 ' + warn + unit + '；告警线 ' + alarm + unit + '。' + actions[state];
      copyResult.disabled = false;
      resultCopy.textContent = '';
    });
    var sampleButton = document.querySelector('[data-load-sample]');
    if (sampleButton) sampleButton.addEventListener('click', function () { valueInput.value = '74.8'; warnInput.value = '78'; alarmInput.value = '86'; unitInput.value = '分';directionInputs[0].checked = true;clearResult();message.textContent = '示例已载入，可以开始检查。'; });
    thresholdForm.addEventListener('reset', function () { window.setTimeout(clearResult, 0); });
    copyResult.addEventListener('click', function () { copyText(lastResult, function () { resultCopy.textContent = '判定已复制'; }, function () { resultCopy.textContent = '复制失败，请手动记录'; }); });
  }

  var policyButton = document.querySelector('[data-copy-policy]');
  if (policyButton) {
    policyButton.addEventListener('click', function () {
      var feedback = document.querySelector('[data-policy-feedback]');
      var summary = '层级瞭望守则：先确认数据时间，再核对阈值版本；重大决定回到原始来源，发现偏差保留更正轨迹。';
      copyText(summary, function () { policyButton.textContent = '守则已复制'; if (feedback) feedback.textContent = '可直接发给协作者'; }, function () { if (feedback) feedback.textContent = '复制失败，请手动选择摘要'; });
    });
  }

  var finder = document.querySelector('[data-site-finder]');
  if (finder) {
    var finderInput = finder.elements.query;
    var finderFeedback = document.querySelector('[data-finder-feedback]');
    var routes = [
      { terms: ['总览', '首页', '观察窗', '信号'], label: '总览', url: 'index.html' },
      { terms: ['方法', '文章', '读数', '背景'], label: '观察方法', url: 'article.html' },
      { terms: ['阈值', '校准', '提醒', '告警'], label: '阈值校准', url: 'tool.html' },
      { terms: ['守则', '规则', '隐私', '权限'], label: '瞭望守则', url: 'legal.html' }
    ];
    finderInput.addEventListener('input', function () { finderInput.removeAttribute('aria-invalid'); finderFeedback.textContent = '可搜索：总览、观察方法、阈值校准、瞭望守则。'; });
    finder.addEventListener('submit', function (event) {
      event.preventDefault();
      var query = normalize(finderInput.value).toLocaleLowerCase();
      finderFeedback.textContent = '';
      if (!query) { finderInput.setAttribute('aria-invalid', 'true'); finderFeedback.textContent = '先输入一个关键词，例如“阈值”或“守则”。'; finderInput.focus(); return; }
      var hit = routes.find(function (route) { return route.terms.some(function (term) { var normalizedTerm = normalize(term).toLocaleLowerCase();return normalizedTerm.indexOf(query) !== -1 || query.indexOf(normalizedTerm) !== -1; }); });
      if (hit) { finderFeedback.append(document.createTextNode('找到“' + hit.label + '”。'));var link = document.createElement('a');link.className = 'lo46-text-link';link.href = hit.url;link.textContent = '前往页面';finderFeedback.appendChild(link); }
      else finderFeedback.textContent = '没有匹配“' + query + '”。试试“方法”“阈值”或“守则”。';
    });
  }
}());
