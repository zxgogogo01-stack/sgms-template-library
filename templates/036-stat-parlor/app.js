(function () {
  'use strict';

  var page = document.body.getAttribute('data-page');

  if (page === 'home') setupHome();
  if (page === 'article') setupArticle();
  if (page === 'tool') setupTool();

  function setupHome() {
    var filters = Array.prototype.slice.call(document.querySelectorAll('[data-stat-filter]'));
    var stats = Array.prototype.slice.call(document.querySelectorAll('[data-stat]'));
    var count = document.getElementById('stat-count');
    var grid = document.querySelector('[data-stat-grid]');
    var empty = document.getElementById('stat-empty');
    var reset = document.getElementById('reset-stats');

    filters.forEach(function (button) {
      button.addEventListener('click', function () {
        applyFilter(button.getAttribute('data-stat-filter'));
      });
    });

    if (reset) {
      reset.addEventListener('click', function () {
        applyFilter('all');
        filters[0].focus();
      });
    }

    function applyFilter(group) {
      var visible = 0;
      filters.forEach(function (button) {
        button.setAttribute('aria-pressed', button.getAttribute('data-stat-filter') === group ? 'true' : 'false');
      });
      stats.forEach(function (stat) {
        var show = group === 'all' || stat.getAttribute('data-group') === group;
        stat.hidden = !show;
        if (show) visible += 1;
      });
      grid.hidden = visible === 0;
      grid.setAttribute('data-visible', String(visible));
      empty.hidden = visible !== 0;
      count.textContent = visible + ' / ' + stats.length + ' 项可见';
    }

    var copy = document.getElementById('copy-invite');
    if (copy) {
      copy.addEventListener('click', function () {
        var code = document.getElementById('invite-code');
        var status = document.getElementById('copy-status');
        copyText(code.textContent.trim()).then(function () {
          copy.textContent = '席位码已复制';
          status.textContent = '可以发送给同事了。';
          window.setTimeout(function () { copy.textContent = '复制席位码'; }, 1600);
        }, function () {
          status.textContent = '复制未完成，请手动选择席位码。';
        });
      });
    }
  }

  function setupArticle() {
    var details = Array.prototype.slice.call(document.querySelectorAll('[data-metric-detail]'));
    var open = document.getElementById('open-metrics');
    var close = document.getElementById('close-metrics');
    if (open) open.addEventListener('click', function () { details.forEach(function (item) { item.open = true; }); });
    if (close) close.addEventListener('click', function () { details.forEach(function (item) { item.open = false; }); });
  }

  function setupTool() {
    var input = document.getElementById('range-input');
    var calculate = document.getElementById('calculate-range');
    var sample = document.getElementById('load-sample');
    var clear = document.getElementById('clear-range');
    var copy = document.getElementById('copy-result');
    var latestSummary = '';

    input.addEventListener('input', function () {
      input.removeAttribute('aria-invalid');
      document.getElementById('range-feedback').textContent = '';
      updateInputCount(parseNumbers(input.value).length);
    });

    calculate.addEventListener('click', calculateRange);
    sample.addEventListener('click', function () {
      input.value = '18.4, 21.2, 19.8, 24.6, 20.1, 22.9, 17.7, 23.4';
      input.dispatchEvent(new Event('input'));
      calculateRange();
    });
    clear.addEventListener('click', function () {
      input.value = '';
      input.removeAttribute('aria-invalid');
      document.getElementById('range-feedback').textContent = '';
      updateInputCount(0);
      resetResults();
      input.focus();
    });
    copy.addEventListener('click', function () {
      copyText(latestSummary).then(function () {
        document.getElementById('range-feedback').textContent = '分析摘要已复制。';
      }, function () {
        document.getElementById('range-feedback').textContent = '复制未完成，请手动记录结果。';
      });
    });

    function calculateRange() {
      var values = parseNumbers(input.value);
      if (values.length < 2) {
        input.setAttribute('aria-invalid', 'true');
        document.getElementById('range-feedback').textContent = '至少需要两个有效数字，才能开始比较。';
        input.focus();
        resetResults();
        return;
      }

      values.sort(function (a, b) { return a - b; });
      var min = values[0];
      var max = values[values.length - 1];
      var span = max - min;
      var mean = values.reduce(function (sum, value) { return sum + value; }, 0) / values.length;
      var middle = Math.floor(values.length / 2);
      var median = values.length % 2 ? values[middle] : (values[middle - 1] + values[middle]) / 2;
      var variance = values.reduce(function (sum, value) { return sum + Math.pow(value - mean, 2); }, 0) / values.length;
      var deviation = Math.sqrt(variance);
      var ratio = mean === 0 ? 100 : Math.min(100, Math.abs(deviation / mean) * 100);

      setResult('result-min', min);
      setResult('result-max', max);
      setResult('result-range', span);
      setResult('result-mean', mean);
      setResult('result-median', median);
      setResult('result-deviation', deviation);
      document.getElementById('result-count').textContent = values.length + ' 个有效数';
      document.getElementById('dispersion-bar').style.setProperty('--value', Math.max(4, ratio) + '%');
      document.getElementById('dispersion-note').textContent = ratio < 10 ? '相对离散程度较低，数值聚拢在平均值附近。' : ratio < 25 ? '相对离散程度适中，建议结合观察窗继续比较。' : '相对离散程度较高，建议检查极端值与分组差异。';
      copy.disabled = false;
      input.removeAttribute('aria-invalid');
      latestSummary = '数量 ' + values.length + '；最低值 ' + format(min) + '；最高值 ' + format(max) + '；极差 ' + format(span) + '；平均值 ' + format(mean) + '；中位数 ' + format(median) + '；标准差 ' + format(deviation) + '。';
      document.getElementById('range-feedback').textContent = '分析完成，结果已在右侧整理。';
      document.getElementById('range-result').focus();
    }

    function resetResults() {
      ['result-min', 'result-max', 'result-range', 'result-mean', 'result-median', 'result-deviation'].forEach(function (id) { document.getElementById(id).textContent = '—'; });
      document.getElementById('result-count').textContent = '等待入席';
      document.getElementById('dispersion-bar').style.setProperty('--value', '0%');
      document.getElementById('dispersion-note').textContent = '计算后显示标准差与平均值的相对关系。';
      copy.disabled = true;
      latestSummary = '';
    }

    function updateInputCount(value) {
      document.getElementById('input-count').textContent = value + ' 个数';
    }
  }

  function parseNumbers(text) {
    var matches = text.match(/[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?/g) || [];
    return matches.map(Number).filter(function (value) { return Number.isFinite(value); });
  }

  function setResult(id, value) {
    document.getElementById(id).textContent = format(value);
  }

  function format(value) {
    return (Math.round(value * 1000) / 1000).toLocaleString('zh-CN', { maximumFractionDigits: 3 });
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve, reject) {
      var area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      try {
        document.execCommand('copy') ? resolve() : reject(new Error('copy failed'));
      } catch (error) {
        reject(error);
      }
      document.body.removeChild(area);
    });
  }
})();
