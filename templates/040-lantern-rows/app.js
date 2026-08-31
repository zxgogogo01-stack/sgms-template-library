(function () {
  'use strict';

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).catch(function () { return fallbackCopy(text); });
    }
    return fallbackCopy(text);
  }

  function fallbackCopy(text) {
    return new Promise(function (resolve, reject) {
      var area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      try {
        if (document.execCommand('copy')) resolve();
        else reject(new Error('copy command returned false'));
      } catch (error) {
        reject(error);
      } finally {
        area.remove();
      }
    });
  }

  function initTheme() {
    var button = document.querySelector('[data-theme-toggle]');
    if (!button) return;
    var root = document.documentElement;
    var saved = null;
    try { saved = localStorage.getItem('lantern-rows-040-theme'); } catch (error) { saved = null; }
    var theme = saved || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    function apply(next) {
      theme = next;
      root.setAttribute('data-theme', theme);
      var label = button.querySelector('[data-theme-label]');
      if (label) label.textContent = theme === 'dark' ? '晨光' : '夜色';
      button.setAttribute('aria-label', theme === 'dark' ? '切换到浅色主题' : '切换到深色主题');
    }

    apply(theme);
    button.addEventListener('click', function () {
      apply(theme === 'dark' ? 'light' : 'dark');
      try { localStorage.setItem('lantern-rows-040-theme', theme); } catch (error) { /* storage is optional */ }
    });
  }

function initMenu() {
  var button = document.querySelector('[data-menu-toggle]');
  var nav = document.querySelector('[data-site-nav]');
  if (!button || !nav) return;

  function closeMenu() {
    button.setAttribute('aria-expanded', 'false');
    nav.setAttribute('data-open', 'false');
    button.textContent = '目录';
  }

  button.addEventListener('click', function () {
    var open = button.getAttribute('aria-expanded') === 'true';
    if (open) {
      closeMenu();
      return;
    }
    button.setAttribute('aria-expanded', 'true');
    nav.setAttribute('data-open', 'true');
    button.textContent = '关闭';
  });
  nav.addEventListener('click', function (event) {
    if (!event.target.closest('a')) return;
    closeMenu();
  });
  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape' || button.getAttribute('aria-expanded') !== 'true') return;
    closeMenu();
    button.focus();
  });
}

  function initClock() {
    var clock = document.querySelector('[data-clock]');
    if (!clock) return;
    var now = new Date();
    clock.textContent = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
  }

  function initSignalDirectory() {
    var search = document.querySelector('[data-signal-search]');
    var list = document.querySelector('[data-signal-list]');
    var filters = document.querySelector('[data-signal-filters]');
    var status = document.querySelector('[data-signal-status]');
    if (!search || !list || !filters || !status) return;
    var rows = Array.prototype.slice.call(list.querySelectorAll('[data-signal]'));
    var empty = list.querySelector('[data-signal-empty]');
    var category = 'all';

    function update() {
      var query = search.value.trim().normalize('NFKC').toLocaleLowerCase('zh-CN');
      var count = 0;
      rows.forEach(function (row) {
        var categoryMatch = category === 'all' || row.getAttribute('data-category') === category;
        var haystack = (row.getAttribute('data-search') || row.textContent).normalize('NFKC').toLocaleLowerCase('zh-CN');
        var queryMatch = !query || haystack.indexOf(query) !== -1;
        var visible = categoryMatch && queryMatch;
        row.hidden = !visible;
        if (visible) count += 1;
      });
      if (empty) empty.hidden = count !== 0;
      status.textContent = count ? '亮起 ' + count + ' / ' + rows.length + ' 行' : '没有匹配的行';
    }

    filters.addEventListener('click', function (event) {
      var button = event.target.closest('[data-filter]');
      if (!button) return;
      category = button.getAttribute('data-filter');
      filters.querySelectorAll('[data-filter]').forEach(function (item) {
        item.setAttribute('aria-pressed', item === button ? 'true' : 'false');
      });
      update();
    });
    search.addEventListener('input', update);
    update();
  }

  function initArticle() {
    var progress = document.querySelector('[data-reading-progress]');
    if (progress) {
      var updateProgress = function () {
        var distance = document.documentElement.scrollHeight - window.innerHeight;
        var value = distance > 0 ? Math.min(100, Math.max(0, window.scrollY / distance * 100)) : 0;
        progress.style.width = value + '%';
      };
      document.addEventListener('scroll', updateProgress, { passive: true });
      updateProgress();
    }
    var button = document.querySelector('[data-copy-citation]');
    var status = document.querySelector('[data-citation-status]');
    if (!button || !status) return;
    button.addEventListener('click', function () {
      var citation = '林序：《末班车之后，谁还在为城市留一盏灯？》，__SITE_NAME__，2026-08-01，https://__SITE_DOMAIN__/article.html';
      copyText(citation).then(function () { status.textContent = '引用信息已复制。'; }).catch(function () { status.textContent = '复制失败，请手动记录引用信息。'; });
    });
  }

  function initLineTool() {
    var form = document.querySelector('[data-line-form]');
    if (!form) return;
    var input = document.getElementById('line-input');
    var output = document.querySelector('[data-line-output]');
    var start = document.getElementById('line-start');
    var digits = document.getElementById('line-digits');
    var prefix = document.getElementById('line-prefix');
    var keepEmpty = document.getElementById('keep-empty');
    var message = document.querySelector('[data-tool-message]');
    var inputCount = document.querySelector('[data-input-count]');
    var outputCount = document.querySelector('[data-output-count]');
    var copyButton = document.querySelector('[data-copy-lines]');
    var copyStatus = document.querySelector('[data-copy-status]');
    var sampleButton = document.querySelector('[data-load-sample]');
    var clearButton = document.querySelector('[data-clear-lines]');
    var lastOutput = '';

    function countInput() {
      var lines = input.value ? input.value.split(/\r?\n/).length : 0;
      inputCount.textContent = lines + ' 行 · ' + input.value.length + ' 字符';
    }

    function resetResult() {
      lastOutput = '';
      output.textContent = '01  第一行会显示在这里\n02  结果可直接复制使用';
      outputCount.textContent = '等待生成';
      copyButton.disabled = true;
      copyStatus.textContent = '';
      message.textContent = '';
      input.removeAttribute('aria-invalid');
      start.removeAttribute('aria-invalid');
      digits.removeAttribute('aria-invalid');
      prefix.removeAttribute('aria-invalid');
    }

    input.addEventListener('input', function () {
      countInput();
      resetResult();
    });
    start.addEventListener('input', function () {
      resetResult();
    });
    digits.addEventListener('change', resetResult);
    prefix.addEventListener('input', resetResult);
    keepEmpty.addEventListener('change', resetResult);
    sampleButton.addEventListener('click', function () {
      input.value = '末班车离开江湾路站\n站台保留两盏暖光\n下一盏路灯仍然可见\n街角便利店照亮了入口';
      countInput();
      resetResult();
      message.textContent = '示例已载入，可直接生成行号。';
      input.focus();
    });
    clearButton.addEventListener('click', function () {
      input.value = '';
      countInput();
      resetResult();
      input.focus();
    });
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      resetResult();
      var raw = input.value;
      if (raw.length > 12000) {
        input.setAttribute('aria-invalid', 'true');
        message.textContent = '单次输入不得超过 12,000 个字符。';
        input.focus();
        return;
      }
      if (!raw.trim()) {
        input.setAttribute('aria-invalid', 'true');
        message.textContent = '请先输入至少一行需要编号的文本。';
        input.focus();
        return;
      }
      var startRaw = start.value.trim();
      var startNumber = Number(startRaw);
      if (!/^\d+$/.test(startRaw) || !Number.isInteger(startNumber) || startNumber < 0 || startNumber > 999) {
        start.setAttribute('aria-invalid', 'true');
        message.textContent = '起始编号需为 0 到 999 之间的整数。';
        start.focus();
        return;
      }
      if (!/^(2|3|4)$/.test(digits.value)) {
        digits.setAttribute('aria-invalid', 'true');
        message.textContent = '编号位数只能选择两位、三位或四位。';
        digits.focus();
        return;
      }
      if (Array.from(prefix.value).length > 12 || /[\r\n\t]/.test(prefix.value)) {
        prefix.setAttribute('aria-invalid', 'true');
        message.textContent = '行前缀不得超过 12 个字符，也不能包含换行或制表符。';
        prefix.focus();
        return;
      }
      var lines = raw.split(/\r?\n/);
      if (lines.length > 180) {
        input.setAttribute('aria-invalid', 'true');
        message.textContent = '单次最多处理 180 行，请拆分后再试。';
        input.focus();
        return;
      }
      var number = startNumber;
      var rendered = [];
      lines.forEach(function (line) {
        if (!line.trim() && !keepEmpty.checked) return;
        var label = String(number).padStart(Number(digits.value), '0');
        rendered.push(prefix.value + label + '  ' + line);
        number += 1;
      });
      if (!rendered.length) {
        input.setAttribute('aria-invalid', 'true');
        message.textContent = '当前设置没有可输出的非空行。';
        input.focus();
        return;
      }
      lastOutput = rendered.join('\n');
      output.textContent = lastOutput;
      outputCount.textContent = rendered.length + ' 行已生成';
      copyButton.disabled = false;
      copyStatus.textContent = '';
      output.focus();
    });
    copyButton.addEventListener('click', function () {
      if (!lastOutput) return;
      copyText(lastOutput).then(function () { copyStatus.textContent = '已复制'; }).catch(function () { copyStatus.textContent = '复制失败，请手动选择结果'; });
    });
    countInput();
  }

  function initPolicyCopy() {
    var button = document.querySelector('[data-copy-policy]');
    var status = document.querySelector('[data-policy-status]');
    if (!button || !status) return;
    button.addEventListener('click', function () {
      var summary = '__SITE_NAME__ 编辑约定 V2.4｜生效：2026-08-01｜范围：收录、核对、修订、隐私与使用边界｜https://__SITE_DOMAIN__/legal.html';
      copyText(summary).then(function () { status.textContent = '版本摘要已复制。'; }).catch(function () { status.textContent = '复制失败，请手动记录版本摘要。'; });
    });
  }

  function initNotFound() {
    var form = document.querySelector('[data-not-found-form]');
    if (!form) return;
    var input = document.getElementById('not-found-query');
    var status = document.querySelector('[data-not-found-status]');
    var results = document.querySelector('[data-not-found-results]');
    var entries = [
      { terms: '城市 灯光 末班车 公共空间', title: '末班车之后，谁还在为城市留一盏灯？', href: 'article.html' },
      { terms: '排版 行号 工具 文本 校对', title: '行号工房', href: 'tool.html' },
      { terms: '编辑 约定 隐私 修订 来源', title: '编辑约定', href: 'legal.html' },
      { terms: '夜行 索引 设计 文化 城市', title: '今晚夜行索引', href: 'index.html' }
    ];
    input.addEventListener('input', function () {
      input.removeAttribute('aria-invalid');
      status.textContent = '';
      results.replaceChildren();
    });
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var query = input.value.trim().normalize('NFKC').toLocaleLowerCase('zh-CN');
      results.replaceChildren();
      if (!query) {
        input.setAttribute('aria-invalid', 'true');
        status.textContent = '请输入一个想寻找的主题。';
        input.focus();
        return;
      }
      input.removeAttribute('aria-invalid');
      var matched = entries.filter(function (entry) { return entry.terms.normalize('NFKC').toLocaleLowerCase('zh-CN').indexOf(query) !== -1 || entry.title.normalize('NFKC').toLocaleLowerCase('zh-CN').indexOf(query) !== -1; });
      status.textContent = matched.length ? '找到 ' + matched.length + ' 条相关信号。' : '没有找到相关信号，试试“城市”“排版”或“隐私”。';
      matched.forEach(function (entry) {
        var item = document.createElement('li');
        var link = document.createElement('a');
        link.href = entry.href;
        link.textContent = entry.title;
        item.appendChild(link);
        results.appendChild(item);
      });
    });
  }

  initTheme();
  initMenu();
  initClock();
  initSignalDirectory();
  initArticle();
  initLineTool();
  initPolicyCopy();
  initNotFound();
}());
