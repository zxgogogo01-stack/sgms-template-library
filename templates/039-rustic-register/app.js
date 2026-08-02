(function () {
  'use strict';

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).catch(function () {
        return fallbackCopy(text);
      });
    }
    return fallbackCopy(text);
  }

  function fallbackCopy(text) {
    var area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    area.remove();
    return Promise.resolve();
  }

  function initTargetCopies() {
    document.querySelectorAll('[data-copy-target]').forEach(function (button) {
      button.addEventListener('click', function () {
        var target = document.getElementById(button.getAttribute('data-copy-target'));
        if (!target) return;
        var original = button.textContent;
        copyText(target.textContent.trim()).then(function () {
          button.textContent = (button.getAttribute('data-copy-label') || '内容') + '已复制';
          window.setTimeout(function () { button.textContent = original; }, 1800);
        });
      });
    });
  }

  function initRegister() {
    var search = document.querySelector('[data-register-search]');
    var table = document.querySelector('[data-register-table]');
    var status = document.querySelector('[data-register-status]');
    var filterWrap = document.querySelector('[data-register-filters]');
    if (!search || !table || !status || !filterWrap) return;

    var rows = Array.prototype.slice.call(table.querySelectorAll('[data-entry]'));
    var empty = table.querySelector('[data-empty-row]');
    var activeCategory = 'all';

    function applyRegisterFilter() {
      var query = search.value.trim().toLocaleLowerCase();
      var shown = 0;
      rows.forEach(function (row) {
        var categoryMatch = activeCategory === 'all' || row.getAttribute('data-category') === activeCategory;
        var queryMatch = !query || row.getAttribute('data-search').toLocaleLowerCase().indexOf(query) !== -1;
        var visible = categoryMatch && queryMatch;
        row.hidden = !visible;
        if (visible) shown += 1;
      });
      if (empty) empty.hidden = shown !== 0;
      status.textContent = '显示 ' + shown + ' / ' + rows.length + ' 条登记记录';
    }

    filterWrap.addEventListener('click', function (event) {
      var button = event.target.closest('[data-filter]');
      if (!button) return;
      activeCategory = button.getAttribute('data-filter');
      filterWrap.querySelectorAll('[data-filter]').forEach(function (item) {
        item.setAttribute('aria-pressed', item === button ? 'true' : 'false');
      });
      applyRegisterFilter();
    });

    search.addEventListener('input', applyRegisterFilter);
    var initialQuery = new URLSearchParams(window.location.search).get('query');
    if (initialQuery) search.value = initialQuery;
    applyRegisterFilter();
  }

  function initRecordCopy() {
    var button = document.querySelector('[data-copy-record]');
    var status = document.querySelector('[data-record-status]');
    if (!button || !status) return;
    button.addEventListener('click', function () {
      var summary = 'R-039-014｜榆木巷子手作食集｜食与饮｜河西·榆木巷｜2026.08 已复核｜复核周期 90 天';
      copyText(summary).then(function () {
        status.textContent = '卷宗摘要已复制。';
        status.setAttribute('data-tone', 'success');
      });
    });
  }

  function normalizeName(value) {
    return value.toLocaleLowerCase().replace(/[\s·•・—–\-_.,，。:：;；'"“”‘’()（）\[\]【】]/g, '');
  }

  function renderList(list, groups, emptyText, labeler) {
    list.replaceChildren();
    if (!groups.length) {
      var empty = document.createElement('li');
      empty.className = 'result-empty';
      empty.textContent = emptyText;
      list.appendChild(empty);
      return;
    }
    groups.forEach(function (group) {
      var item = document.createElement('li');
      var name = document.createElement('span');
      var meta = document.createElement('code');
      name.textContent = labeler(group);
      meta.textContent = group.meta;
      item.append(name, meta);
      list.appendChild(item);
    });
  }

  function initDuplicateTool() {
    var form = document.querySelector('[data-duplicate-form]');
    if (!form) return;
    var input = document.getElementById('duplicate-input');
    var message = document.querySelector('[data-tool-message]');
    var resultPanel = document.querySelector('[data-result-panel]');
    var exactList = document.querySelector('[data-exact-results]');
    var nearList = document.querySelector('[data-near-results]');
    var copyButton = document.querySelector('[data-copy-results]');
    var totalCount = document.querySelector('[data-count-total]');
    var exactCount = document.querySelector('[data-count-exact]');
    var nearCount = document.querySelector('[data-count-near]');
    var lastReport = '';

    function resetResults() {
      totalCount.textContent = '0';
      exactCount.textContent = '0';
      nearCount.textContent = '0';
      renderList(exactList, [], '运行校对后显示结果。', function () { return ''; });
      renderList(nearList, [], '会忽略空格、间隔点、连字符与大小写。', function () { return ''; });
      copyButton.disabled = true;
      lastReport = '';
    }

    input.addEventListener('input', function () {
      if (input.value.trim()) input.removeAttribute('aria-invalid');
    });

    function runCheck() {
      var names = input.value.split(/\r?\n/).map(function (name) { return name.trim(); }).filter(Boolean);
      if (names.length < 2) {
        input.setAttribute('aria-invalid', 'true');
        message.textContent = '请至少输入两个有效名称后再校对。';
        message.setAttribute('data-tone', 'error');
        input.focus();
        resetResults();
        return;
      }

      input.removeAttribute('aria-invalid');
      var exactMap = new Map();
      var nearMap = new Map();
      names.forEach(function (name) {
        var exactKey = name.toLocaleLowerCase();
        var normalizedKey = normalizeName(name);
        if (!exactMap.has(exactKey)) exactMap.set(exactKey, []);
        exactMap.get(exactKey).push(name);
        if (!nearMap.has(normalizedKey)) nearMap.set(normalizedKey, []);
        nearMap.get(normalizedKey).push(name);
      });

      var exactGroups = [];
      exactMap.forEach(function (values) {
        if (values.length > 1) exactGroups.push({ values: values, meta: '× ' + values.length });
      });

      var nearGroups = [];
      nearMap.forEach(function (values, key) {
        var unique = Array.from(new Set(values));
        if (unique.length > 1) nearGroups.push({ values: unique, meta: key });
      });

      totalCount.textContent = String(names.length);
      exactCount.textContent = String(exactGroups.length);
      nearCount.textContent = String(nearGroups.length);
      renderList(exactList, exactGroups, '没有发现完全重复项。', function (group) { return group.values[0]; });
      renderList(nearList, nearGroups, '没有发现标准化近似项。', function (group) { return group.values.join(' ↔ '); });
      message.textContent = '校对完成：共检查 ' + names.length + ' 个有效名称。';
      message.setAttribute('data-tone', 'success');
      lastReport = [
        '条目校对结果',
        '有效名称：' + names.length,
        '完全重复组：' + exactGroups.length,
        '近似名称组：' + nearGroups.length,
        '',
        '完全重复：',
        exactGroups.length ? exactGroups.map(function (group) { return group.values[0] + ' × ' + group.values.length; }).join('\n') : '无',
        '',
        '标准化近似项：',
        nearGroups.length ? nearGroups.map(function (group) { return group.values.join(' ↔ '); }).join('\n') : '无'
      ].join('\n');
      copyButton.disabled = false;
      resultPanel.focus();
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      runCheck();
    });

    document.querySelector('[data-tool-sample]').addEventListener('click', function () {
      input.value = [
        '榆木巷子手作食集',
        '泥丘陶器所',
        '榆木巷子手作食集',
        '榆木巷子 · 手作食集',
        'North Field Studio',
        'North-Field Studio',
        '松影客舍'
      ].join('\n');
      input.removeAttribute('aria-invalid');
      message.textContent = '示例已载入，可以开始校对。';
      message.setAttribute('data-tone', 'success');
      input.focus();
    });

    document.querySelector('[data-tool-clear]').addEventListener('click', function () {
      input.value = '';
      input.removeAttribute('aria-invalid');
      message.textContent = '输入和结果已清空。';
      message.removeAttribute('data-tone');
      resetResults();
      input.focus();
    });

    copyButton.addEventListener('click', function () {
      if (!lastReport) return;
      copyText(lastReport).then(function () {
        message.textContent = '校对结果已复制。';
        message.setAttribute('data-tone', 'success');
      }).catch(function () {
        message.textContent = '复制失败，请手动选择校对结果。';
        message.setAttribute('data-tone', 'error');
      });
    });
  }

  function initFolioSearch() {
    var form = document.querySelector('[data-folio-search]');
    if (!form) return;
    var input = document.getElementById('folio-query');
    var status = document.querySelector('[data-folio-status]');
    var terms = ['榆木', '食集', '泥丘', '陶器', '松影', '客舍', '麦田', '白桦', '渡口', '慢行'];
    input.addEventListener('input', function () {
      if (input.value.trim()) input.removeAttribute('aria-invalid');
    });
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var query = input.value.trim();
      if (!query) {
        input.setAttribute('aria-invalid', 'true');
        status.textContent = '请先输入一个名称或关键词。';
        status.setAttribute('data-tone', 'error');
        input.focus();
        return;
      }
      input.removeAttribute('aria-invalid');
      var found = terms.some(function (term) { return query.indexOf(term) !== -1 || term.indexOf(query) !== -1; });
      if (found) {
        window.location.href = 'index.html?query=' + encodeURIComponent(query);
        return;
      }
      status.textContent = '示例名录中未找到“' + query + '”，可返回完整名录浏览全部条目。';
      status.setAttribute('data-tone', 'error');
    });
  }

  initTargetCopies();
  initRegister();
  initRecordCopy();
  initDuplicateTool();
  initFolioSearch();
})();
