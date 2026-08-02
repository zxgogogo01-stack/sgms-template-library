(function () {
  'use strict';

  var page = document.body.getAttribute('data-page');

  function fallbackCopy(text) {
    return new Promise(function (resolve, reject) {
      var helper = document.createElement('textarea');
      helper.value = text;
      helper.setAttribute('readonly', '');
      helper.style.position = 'fixed';
      helper.style.opacity = '0';
      document.body.appendChild(helper);
      helper.select();
      try {
        document.execCommand('copy');
        resolve();
      } catch (error) {
        reject(error);
      } finally {
        helper.remove();
      }
    });
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).catch(function () {
        return fallbackCopy(text);
      });
    }
    return fallbackCopy(text);
  }

  function setupHome() {
    var filters = Array.prototype.slice.call(document.querySelectorAll('[data-service-filter]'));
    var services = Array.prototype.slice.call(document.querySelectorAll('[data-service]'));
    var count = document.getElementById('service-count');
    var empty = document.getElementById('service-empty');
    var copyButton = document.getElementById('copy-summary');
    var copyStatus = document.getElementById('copy-summary-status');

    filters.forEach(function (filter) {
      filter.addEventListener('click', function () {
        var value = filter.getAttribute('data-service-filter');
        var visible = 0;
        filters.forEach(function (button) {
          button.setAttribute('aria-pressed', String(button === filter));
        });
        services.forEach(function (service) {
          var show = value === 'all' || service.getAttribute('data-status') === value;
          service.hidden = !show;
          if (show) visible += 1;
        });
        count.textContent = visible + ' / ' + services.length + ' 项可见';
        empty.hidden = visible !== 0;
      });
    });

    copyButton.addEventListener('click', function () {
      var summary = '__SITE_NAME__ 运行摘要｜30 天可用率 99.982%｜4 项正常、1 项降级、1 项维护｜快照日期 2026-08-01｜https://__SITE_DOMAIN__/';
      copyText(summary).then(function () {
        copyStatus.textContent = '运行摘要已复制。';
      }).catch(function () {
        copyStatus.textContent = '复制失败，请手动选择页面内容。';
      });
    });
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

  function setupUptime() {
    var downtime = document.getElementById('up-down');
    var days = document.getElementById('up-days');
    var run = document.getElementById('run-uptime');
    var sample = document.getElementById('load-uptime-sample');
    var clear = document.getElementById('clear-uptime');
    var feedback = document.getElementById('uptime-feedback');
    var result = document.getElementById('uptime-result');
    var value = document.getElementById('uptime-value');
    var status = document.getElementById('uptime-status');
    var windowMinutes = document.getElementById('window-minutes');
    var downtimeMinutes = document.getElementById('downtime-minutes');
    var dailyAverage = document.getElementById('daily-average');
    var remainingBudget = document.getElementById('remaining-budget');
    var copy = document.getElementById('copy-uptime');

    function resetResult() {
      value.textContent = '—.—%';
      status.textContent = '输入参数后运行分析，结果会显示在这里。';
      windowMinutes.textContent = '—';
      downtimeMinutes.textContent = '—';
      dailyAverage.textContent = '—';
      remainingBudget.textContent = '—';
      copy.disabled = true;
    }

    function clearInvalid() {
      downtime.removeAttribute('aria-invalid');
      days.removeAttribute('aria-invalid');
      feedback.textContent = '';
    }

    downtime.addEventListener('input', clearInvalid);
    days.addEventListener('input', clearInvalid);

    run.addEventListener('click', function () {
      var down = Number(downtime.value);
      var dayCount = Number(days.value);
      var downValid = downtime.value !== '' && Number.isFinite(down) && down >= 0;
      var daysValid = days.value !== '' && Number.isInteger(dayCount) && dayCount >= 1 && dayCount <= 366;

      downtime.setAttribute('aria-invalid', String(!downValid));
      days.setAttribute('aria-invalid', String(!daysValid));
      if (!downValid || !daysValid) {
        feedback.textContent = '请填写有效参数：停机分钟不能为负数，统计窗口需为 1—366 的整数。';
        resetResult();
        (downValid ? days : downtime).focus();
        return;
      }

      var total = dayCount * 24 * 60;
      if (down > total) {
        downtime.setAttribute('aria-invalid', 'true');
        feedback.textContent = '停机时长不能超过整个统计窗口。';
        resetResult();
        downtime.focus();
        return;
      }

      clearInvalid();
      var pct = ((total - down) / total) * 100;
      var budget = (total * 0.001) - down;
      var band = pct >= 99.99 ? '达到 99.99% 目标。' : pct >= 99.9 ? '达到 99.9% 目标，尚未达到 99.99%。' : '低于 99.9% 目标，需要复核停机事件。';
      value.textContent = pct.toFixed(3) + '%';
      status.textContent = band;
      windowMinutes.textContent = total.toLocaleString('zh-CN') + ' 分钟';
      downtimeMinutes.textContent = down.toLocaleString('zh-CN') + ' 分钟';
      dailyAverage.textContent = (down / dayCount).toFixed(2) + ' 分钟';
      remainingBudget.textContent = budget >= 0 ? budget.toFixed(1) + ' 分钟' : '超出 ' + Math.abs(budget).toFixed(1) + ' 分钟';
      feedback.textContent = '分析完成。';
      copy.disabled = false;
      result.focus();
    });

    sample.addEventListener('click', function () {
      downtime.value = '7.8';
      days.value = '30';
      clearInvalid();
      feedback.textContent = '示例已载入，可直接运行分析。';
      downtime.focus();
    });

    clear.addEventListener('click', function () {
      downtime.value = '';
      days.value = '';
      clearInvalid();
      resetResult();
      feedback.textContent = '参数与结果已清空。';
      downtime.focus();
    });

    copy.addEventListener('click', function () {
      var text = '可用率 ' + value.textContent + '｜' + status.textContent + '｜窗口 ' + windowMinutes.textContent + '｜停机 ' + downtimeMinutes.textContent + '｜99.9% 剩余预算 ' + remainingBudget.textContent;
      copyText(text).then(function () {
        feedback.textContent = '分析结果已复制。';
      }).catch(function () {
        feedback.textContent = '复制失败，请手动选择结果。';
      });
    });

    resetResult();
  }

  if (page === 'home') setupHome();
  if (page === 'article') setupCitation();
  if (page === 'tool') setupUptime();
}());
