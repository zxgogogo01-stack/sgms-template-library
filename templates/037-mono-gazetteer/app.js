(function () {
  'use strict';

  var page = document.body.getAttribute('data-page');

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }

    return new Promise(function (resolve, reject) {
      var helper = document.createElement('textarea');
      helper.value = text;
      helper.setAttribute('readonly', '');
      helper.style.position = 'fixed';
      helper.style.opacity = '0';
      document.body.appendChild(helper);
      helper.select();
      try {
        if (document.execCommand('copy')) resolve();
        else reject(new Error('copy command returned false'));
      } catch (error) {
        reject(error);
      } finally {
        helper.remove();
      }
    });
  }

  function setupDirectory() {
    var search = document.getElementById('place-search');
    var filters = Array.prototype.slice.call(document.querySelectorAll('[data-region-filter]'));
    var entries = Array.prototype.slice.call(document.querySelectorAll('[data-place]'));
    var groups = Array.prototype.slice.call(document.querySelectorAll('[data-directory-group]'));
    var count = document.getElementById('place-count');
    var empty = document.getElementById('directory-empty');
    var reset = document.getElementById('reset-directory');
    var activeRegion = 'all';

    function applyDirectory() {
      var query = search.value.trim().toLocaleLowerCase('zh-CN');
      var visible = 0;

      entries.forEach(function (entry) {
        var matchesRegion = activeRegion === 'all' || entry.getAttribute('data-region') === activeRegion;
        var haystack = (entry.getAttribute('data-search') || entry.textContent).toLocaleLowerCase('zh-CN');
        var matchesQuery = !query || haystack.indexOf(query) !== -1;
        var shouldShow = matchesRegion && matchesQuery;
        entry.hidden = !shouldShow;
        if (shouldShow) visible += 1;
      });

      groups.forEach(function (group) {
        var hasVisibleEntry = Array.prototype.some.call(group.querySelectorAll('[data-place]'), function (entry) {
          return !entry.hidden;
        });
        group.hidden = !hasVisibleEntry;
      });

      count.textContent = visible + ' / ' + entries.length + ' 条可见';
      empty.hidden = visible !== 0;
    }

    filters.forEach(function (filter) {
      filter.addEventListener('click', function () {
        activeRegion = filter.getAttribute('data-region-filter');
        filters.forEach(function (button) {
          button.setAttribute('aria-pressed', String(button === filter));
        });
        applyDirectory();
      });
    });

    search.addEventListener('input', applyDirectory);
    reset.addEventListener('click', function () {
      search.value = '';
      activeRegion = 'all';
      filters.forEach(function (button) {
        button.setAttribute('aria-pressed', String(button.getAttribute('data-region-filter') === 'all'));
      });
      applyDirectory();
      search.focus();
    });

    applyDirectory();
  }

  function setupCitation() {
    var button = document.getElementById('copy-citation');
    var source = document.getElementById('citation-text');
    var status = document.getElementById('citation-status');

    button.addEventListener('click', function () {
      copyText(source.textContent.trim()).then(function () {
        status.textContent = '引用格式已复制。';
      }).catch(function () {
        status.textContent = '复制失败，请手动选择引用文本。';
      });
    });
  }

  function setupCatalog() {
    var input = document.getElementById('catalog-input');
    var count = document.getElementById('catalog-count');
    var groupButton = document.getElementById('group-catalog');
    var sampleButton = document.getElementById('load-catalog-sample');
    var clearButton = document.getElementById('clear-catalog');
    var feedback = document.getElementById('catalog-feedback');
    var result = document.getElementById('catalog-result');
    var summary = document.getElementById('catalog-summary');
    var output = document.getElementById('catalog-output');
    var copyButton = document.getElementById('copy-catalog');

    function getRows() {
      return input.value.split(/\r?\n/).map(function (row, index) {
        return {
          line: index + 1,
          value: row.trim().replace(/\s+/gu, ' ')
        };
      }).filter(function (row) { return row.value; });
    }

    function updateCount() {
      count.textContent = getRows().length + ' 条待编目';
    }

    function resetResult() {
      summary.textContent = '等待编目';
      output.textContent = '录入地名后，分组结果会显示在这里。';
      copyButton.disabled = true;
    }

    input.addEventListener('input', function () {
      input.removeAttribute('aria-invalid');
      feedback.textContent = '';
      updateCount();
      resetResult();
    });

    sampleButton.addEventListener('click', function () {
      input.value = 'Aran Terrace\nCenna Ford\nAurel Cape\nMerin Lane\n阿岚台\nSorin Bend\nAran Terrace';
      input.removeAttribute('aria-invalid');
      feedback.textContent = '示例已载入，可直接生成分组。';
      updateCount();
      resetResult();
      input.focus();
    });

    clearButton.addEventListener('click', function () {
      input.value = '';
      input.removeAttribute('aria-invalid');
      feedback.textContent = '编目台已清空。';
      updateCount();
      resetResult();
      input.focus();
    });

    groupButton.addEventListener('click', function () {
      var rows = getRows();
      if (input.value.length > 20000) {
        input.setAttribute('aria-invalid', 'true');
        feedback.textContent = '单次输入不得超过 20,000 个字符。';
        resetResult();
        input.focus();
        return;
      }
      if (!rows.length) {
        input.setAttribute('aria-invalid', 'true');
        feedback.textContent = '请先录入至少一个地名，每行一条。';
        resetResult();
        input.focus();
        return;
      }
      if (rows.length > 500) {
        input.setAttribute('aria-invalid', 'true');
        feedback.textContent = '单次最多编目 500 条记录，请分批整理。';
        resetResult();
        input.focus();
        return;
      }
      var overlong = rows.find(function (row) { return Array.from(row.value).length > 120; });
      if (overlong) {
        input.setAttribute('aria-invalid', 'true');
        feedback.textContent = '第 ' + overlong.line + ' 行超过 120 个字符，请缩短后重试。';
        resetResult();
        input.focus();
        return;
      }

      var seen = Object.create(null);
      var unique = rows.filter(function (row) {
        var key = row.value.normalize('NFKC').toLocaleLowerCase('zh-CN');
        if (seen[key]) return false;
        seen[key] = true;
        return true;
      }).map(function (row) {
        return row.value;
      }).sort(function (a, b) {
        return a.localeCompare(b, 'zh-CN', { sensitivity: 'base', numeric: true });
      });

      var buckets = Object.create(null);
      unique.forEach(function (row) {
        var first = row.normalize('NFKD').replace(/\p{M}/gu, '').charAt(0).toUpperCase();
        var bucket = /^[A-Z]$/.test(first) ? first : '#';
        if (!buckets[bucket]) buckets[bucket] = [];
        buckets[bucket].push(row);
      });

      var keys = Object.keys(buckets).sort(function (a, b) {
        if (a === '#') return 1;
        if (b === '#') return -1;
        return a.localeCompare(b);
      });
      var formatted = keys.map(function (key) {
        return '[' + key + '] ' + buckets[key].length + '\n' + buckets[key].map(function (row) {
          return '  ' + row;
        }).join('\n');
      }).join('\n\n');

      input.removeAttribute('aria-invalid');
      feedback.textContent = rows.length === unique.length ? '编目完成。' : '编目完成，重复条目已自动合并。';
      summary.textContent = keys.length + ' 个分组 / ' + unique.length + ' 条记录';
      output.textContent = formatted;
      copyButton.disabled = false;
      result.focus();
    });

    copyButton.addEventListener('click', function () {
      copyText(output.textContent).then(function () {
        feedback.textContent = '分组结果已复制。';
      }).catch(function () {
        feedback.textContent = '复制失败，请手动选择分组结果。';
      });
    });

    updateCount();
    resetResult();
  }

  if (page === 'home') setupDirectory();
  if (page === 'article') setupCitation();
  if (page === 'tool') setupCatalog();
}());
