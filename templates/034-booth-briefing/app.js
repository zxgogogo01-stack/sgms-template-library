(function () {
  'use strict';

  var search = document.getElementById('brief-search');
  var briefItems = Array.prototype.slice.call(document.querySelectorAll('[data-brief-item]'));
  var filterButtons = Array.prototype.slice.call(document.querySelectorAll('[data-brief-filter]'));
  var briefCount = document.getElementById('brief-count');
  var emptyState = document.getElementById('brief-empty');
  var activeFilter = 'all';

  function normalize(value) {
    return (value || '').toLowerCase().replace(/\s+/g, ' ').trim();
  }

  function updateBriefs() {
    if (!briefItems.length) return;
    var query = normalize(search && search.value);
    var visible = 0;
    briefItems.forEach(function (item) {
      var topic = item.getAttribute('data-focus') || '';
      var matchesTopic = activeFilter === 'all' || topic === activeFilter;
      var matchesQuery = !query || normalize((item.getAttribute('data-search') || '') + ' ' + item.textContent).indexOf(query) !== -1;
      item.hidden = !(matchesTopic && matchesQuery);
      if (!item.hidden) visible += 1;
    });
    if (briefCount) briefCount.textContent = visible + ' / ' + briefItems.length + ' 条可见';
    if (emptyState) emptyState.hidden = visible !== 0;
  }

  if (search) search.addEventListener('input', updateBriefs);
  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      activeFilter = button.getAttribute('data-brief-filter') || 'all';
      filterButtons.forEach(function (candidate) {
        candidate.setAttribute('aria-pressed', candidate === button ? 'true' : 'false');
      });
      updateBriefs();
    });
  });

  var briefReset = document.getElementById('reset-briefs');
  if (briefReset) briefReset.addEventListener('click', function () {
    activeFilter = 'all';
    if (search) search.value = '';
    filterButtons.forEach(function (button) {
      button.setAttribute('aria-pressed', button.getAttribute('data-brief-filter') === 'all' ? 'true' : 'false');
    });
    updateBriefs();
    if (search) search.focus();
  });

  function copyText(text, button, readyLabel) {
    var done = function () {
      var old = button.textContent;
      button.textContent = readyLabel;
      button.setAttribute('data-copied', 'true');
      window.setTimeout(function () {
        button.textContent = old;
        button.removeAttribute('data-copied');
      }, 1600);
    };
    var operation;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      operation = navigator.clipboard.writeText(text);
    } else {
      operation = new Promise(function (resolve, reject) {
        var area = document.createElement('textarea');
        area.value = text;
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
    return operation.then(done);
  }

  var inviteCopy = document.querySelector('[data-act="copy-code"]');
  if (inviteCopy) inviteCopy.addEventListener('click', function () {
    var code = document.getElementById('brief-code');
    var status = document.getElementById('copy-status');
    if (!code || !status) return;
    copyText(code.textContent.trim(), inviteCopy, '已复制').then(function () {
      status.textContent = '邀请码已复制。';
      window.setTimeout(function () { status.textContent = ''; }, 1800);
    }, function () {
      status.textContent = '复制失败，请手动选择邀请码。';
    });
  });

  var deltaForm = document.getElementById('delta-form');
  if (!deltaForm) return;

  var beforeInput = document.getElementById('delta-before');
  var afterInput = document.getElementById('delta-after');
  var unitInput = document.getElementById('delta-unit');
  var precisionInput = document.getElementById('delta-precision');
  var errorLine = document.getElementById('delta-error');
  var result = document.getElementById('delta-result');
  var differenceOutput = document.getElementById('result-difference');
  var percentOutput = document.getElementById('result-percent');
  var directionOutput = document.getElementById('result-direction');
  var resultNote = document.getElementById('result-note');
  var resultStamp = document.getElementById('result-stamp');

  function clearInvalid() {
    [beforeInput, afterInput].forEach(function (input) { input.removeAttribute('aria-invalid'); });
    errorLine.textContent = '';
  }

  function invalidateResult() {
    clearInvalid();
    result.hidden = true;
    resultStamp.textContent = '待计算';
  }

  function formatNumber(value, precision) {
    if (Object.is(value, -0)) value = 0;
    var absolute = Math.abs(value);
    if (absolute > 0 && (absolute >= 1000000000000 || absolute < Math.pow(10, -precision))) {
      return value.toExponential(precision);
    }
    var fixed = value.toFixed(precision);
    return fixed.replace(/(\.\d*?[1-9])0+$|\.0+$/, '$1');
  }

  deltaForm.addEventListener('submit', function (event) {
    event.preventDefault();
    clearInvalid();
    var before = Number(beforeInput.value);
    var after = Number(afterInput.value);
    var missingBefore = beforeInput.value.trim() === '' || !Number.isFinite(before);
    var missingAfter = afterInput.value.trim() === '' || !Number.isFinite(after);
    if (missingBefore || missingAfter) {
      if (missingBefore) beforeInput.setAttribute('aria-invalid', 'true');
      if (missingAfter) afterInput.setAttribute('aria-invalid', 'true');
      errorLine.textContent = '请填写两个有效数值后再核验。';
      (missingBefore ? beforeInput : afterInput).focus();
      result.hidden = true;
      return;
    }

    var precision = Number(precisionInput.value) || 2;
    var difference = after - before;
    if (!Number.isFinite(difference)) {
      beforeInput.setAttribute('aria-invalid', 'true');
      afterInput.setAttribute('aria-invalid', 'true');
      errorLine.textContent = '数值跨度过大，无法生成有限差值。';
      result.hidden = true;
      beforeInput.focus();
      return;
    }
    var unit = unitInput.value.trim();
    var suffix = unit ? ' ' + unit : '';
    var direction = difference > 0 ? '上升' : difference < 0 ? '下降' : '持平';
    differenceOutput.textContent = (difference > 0 ? '+' : '') + formatNumber(difference, precision) + suffix;
    directionOutput.textContent = direction;
    if (before === 0) {
      percentOutput.textContent = '不可计算';
      resultNote.textContent = '基期为 0，无法计算相对变化；请只引用绝对差值。';
    } else {
      var percent = difference / Math.abs(before) * 100;
      if (Number.isFinite(percent)) {
        percentOutput.textContent = (percent > 0 ? '+' : '') + formatNumber(percent, precision) + '%';
        resultNote.textContent = '相对变化以输入的前值绝对值为基准。';
      } else {
        percentOutput.textContent = '超出范围';
        resultNote.textContent = '绝对差值有效，但相对变化超出有限数值范围，请勿引用百分比。';
      }
    }
    resultStamp.textContent = '已核验 · 本地结果';
    result.hidden = false;
    result.focus();
  });

  [beforeInput, afterInput, unitInput].forEach(function (input) {
    input.addEventListener('input', invalidateResult);
  });
  precisionInput.addEventListener('change', invalidateResult);

  document.getElementById('load-sample').addEventListener('click', function () {
    beforeInput.value = '7';
    afterInput.value = '4';
    unitInput.value = '天';
    precisionInput.value = '2';
    invalidateResult();
    beforeInput.focus();
  });

  deltaForm.addEventListener('reset', function () {
    window.setTimeout(function () {
      invalidateResult();
      var copyButton = document.getElementById('copy-result');
      copyButton.textContent = '复制结果';
      copyButton.removeAttribute('data-copied');
      beforeInput.focus();
    }, 0);
  });

  document.getElementById('copy-result').addEventListener('click', function (event) {
    var line = '绝对差值：' + differenceOutput.textContent + '；相对变化：' + percentOutput.textContent + '；变化方向：' + directionOutput.textContent + '。';
    copyText(line, event.currentTarget, '结果已复制').then(function () {
      resultStamp.textContent = '结果已复制';
    }, function () {
      resultStamp.textContent = '复制失败 · 请手动记录';
    });
  });
})();
