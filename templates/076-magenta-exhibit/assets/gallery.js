(function () {
  'use strict';

  var btn = document.getElementById('vestibule-btn');
  if (btn) {
    btn.addEventListener('click', function () {
      var nav = document.getElementById('vestibule-nav');
      if (!nav) return;
      var open = nav.classList.toggle('dooropen76');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var checkForm = document.getElementById('fc-form');
  if (checkForm) {
    var codeField = document.getElementById('fc-code');
    var out = document.getElementById('fc-out');
    codeField.addEventListener('input', function () { codeField.removeAttribute('aria-invalid'); });
    checkForm.addEventListener('submit', function (event) {
      event.preventDefault();
      codeField.removeAttribute('aria-invalid');
      var raw = codeField.value;
      var code = raw.trim();
      if (!code) {
        codeField.setAttribute('aria-invalid', 'true');
        out.textContent = '先把邀请码贴进来。';
        codeField.focus();
        return;
      }
      var notes = [];
      var ok = true;
      if (raw !== code || /\s/.test(code)) { notes.push('含有空格或换行——复制时多选了字符，去掉再用'); ok = false; }
      if (code.length < 4 || code.length > 20) { notes.push('长度 ' + code.length + ' 位——常见邀请码在 4-20 位之间，留意是否复制完整'); ok = false; }
      if (/[^A-Za-z0-9_\-\s]/.test(code)) { notes.push('含有字母数字以外的符号——多数平台只接受字母与数字'); ok = false; }
      if (/[a-z]/.test(code) && /[A-Z]/.test(code)) { notes.push('大小写混合——个别平台区分大小写，粘贴时保持原样'); }
      if (/^[0oO01lI]+$/.test(code)) { notes.push('全部是易混字符（0/O/1/l）——建议和来源逐字核对'); }
      var head = ok
        ? '基本格式没问题：<b>' + code.replace(/</g, '&lt;') + '</b>（' + code.length + ' 位）'
        : '发现 ' + notes.length + ' 处要留意：';
      var list = notes.length ? '<br>· ' + notes.join('<br>· ') : '<br>没有其他提醒。';
      if (!ok) codeField.setAttribute('aria-invalid', 'true');
      out.innerHTML = head + list + '<br>本工具只查格式，不校验真伪；码是否有效以平台注册页为准。';
    });
  }
})();
