(function () {
  'use strict';

  function fallbackCopy(text) {
    var field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.opacity = '0';
    document.body.appendChild(field);
    field.select();
    var copied = false;
    try { copied = document.execCommand('copy'); } catch (error) { copied = false; }
    field.remove();
    return copied ? Promise.resolve() : Promise.reject(new Error('copy failed'));
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).catch(function () { return fallbackCopy(text); });
    }
    return fallbackCopy(text);
  }

  function normalized(value) {
    var text = String(value || '');
    if (text.normalize) text = text.normalize('NFKC');
    return text.trim().toLocaleLowerCase();
  }

  function initTheme() {
    var button = document.querySelector('[data-theme-button]');
    if (!button) return;
    var theme = null;
    try { theme = localStorage.getItem('patchwork-press-042-theme'); } catch (error) { theme = null; }
    theme = theme || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    function apply(next) {
      theme = next;
      document.documentElement.setAttribute('data-theme', theme);
      var label = button.querySelector('[data-theme-label]');
      if (label) label.textContent = theme === 'dark' ? '日版' : '夜版';
      button.setAttribute('aria-label', theme === 'dark' ? '切换为浅色主题' : '切换为深色主题');
    }
    apply(theme);
    button.addEventListener('click', function () {
      apply(theme === 'dark' ? 'light' : 'dark');
      try { localStorage.setItem('patchwork-press-042-theme', theme); } catch (error) { /* optional */ }
    });
  }

  function initMenu() {
    var button = document.querySelector('[data-menu-button]');
    var nav = document.querySelector('[data-site-nav]');
    if (!button || !nav) return;
    function closeMenu() {
      button.setAttribute('aria-expanded', 'false');
      nav.setAttribute('data-open', 'false');
      button.textContent = '目录';
    }
    button.addEventListener('click', function () {
      var open = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', open ? 'false' : 'true');
      nav.setAttribute('data-open', open ? 'false' : 'true');
      button.textContent = open ? '目录' : '关闭';
    });
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        button.focus();
      }
    });
  }

  function initArchive() {
    var search = document.querySelector('[data-archive-search]');
    var filters = document.querySelector('[data-archive-filters]');
    var grid = document.querySelector('[data-archive-grid]');
    var status = document.querySelector('[data-archive-status]');
    if (!search || !filters || !grid || !status) return;
    var entries = Array.prototype.slice.call(grid.querySelectorAll('[data-entry]'));
    var empty = grid.querySelector('[data-archive-empty]');
    var active = 'all';
    function update() {
      var query = normalized(search.value);
      var shown = 0;
      entries.forEach(function (entry) {
        var categoryMatch = active === 'all' || entry.getAttribute('data-category') === active;
        var textMatch = !query || normalized(entry.getAttribute('data-search')).indexOf(query) !== -1;
        entry.hidden = !(categoryMatch && textMatch);
        if (!entry.hidden) shown += 1;
      });
      if (empty) empty.hidden = shown !== 0;
      status.textContent = shown ? '显示 ' + shown + ' / ' + entries.length + ' 份档案' : '没有匹配的布样档案';
    }
    search.addEventListener('input', update);
    filters.addEventListener('click', function (event) {
      var button = event.target.closest('[data-filter]');
      if (!button) return;
      active = button.getAttribute('data-filter');
      filters.querySelectorAll('[data-filter]').forEach(function (item) {
        item.setAttribute('aria-pressed', item === button ? 'true' : 'false');
      });
      update();
    });
    update();
  }

  function initInvite() {
    var button = document.querySelector('[data-copy-invite]');
    var code = document.getElementById('invite-code');
    var status = document.querySelector('[data-invite-status]');
    if (!button || !code || !status) return;
    button.addEventListener('click', function () {
      copyText(code.textContent.trim()).then(function () { status.textContent = '读者码已复制。'; }).catch(function () { status.textContent = '复制失败，请手动选择读者码。'; });
    });
  }

  function initArticle() {
    var progress = document.querySelector('[data-read-progress]');
    if (progress) {
      var update = function () {
        var distance = document.documentElement.scrollHeight - window.innerHeight;
        var ratio = distance > 0 ? Math.min(100, Math.max(0, window.scrollY / distance * 100)) : 0;
        progress.style.width = ratio + '%';
      };
      document.addEventListener('scroll', update, { passive: true });
      update();
    }
    var button = document.querySelector('[data-copy-citation]');
    var status = document.querySelector('[data-citation-status]');
    if (!button || !status) return;
    button.addEventListener('click', function () {
      var citation = '周鹭：《一块旧布如何重新进入日常》，~SITE_NAME~，2026-08-01，https://~SITE_DOMAIN~/article.html';
      copyText(citation).then(function () { status.textContent = '引用信息已复制。'; }).catch(function () { status.textContent = '复制失败，请手动选择引用信息。'; });
    });
  }

  function normalizeHex(value) {
    var hex = value.trim();
    if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return null;
    return hex.toLowerCase();
  }

  function readableInk(hex) {
    var red = parseInt(hex.slice(1, 3), 16);
    var green = parseInt(hex.slice(3, 5), 16);
    var blue = parseInt(hex.slice(5, 7), 16);
    return (red * 299 + green * 587 + blue * 114) / 1000 > 145 ? '#20231f' : '#ffffff';
  }

  function initPlanner() {
    var form = document.querySelector('[data-planner-form]');
    if (!form) return;
    var input = document.querySelector('[data-material-input]');
    var count = document.querySelector('[data-material-count]');
    var sample = document.querySelector('[data-load-sample]');
    var clear = document.querySelector('[data-clear-materials]');
    var message = document.querySelector('[data-planner-message]');
    var preview = document.querySelector('[data-patch-preview]');
    var previewStatus = document.querySelector('[data-preview-status]');
    var summary = document.querySelector('[data-planner-summary]');
    var copyButton = document.querySelector('[data-copy-plan]');
    var copyStatus = document.querySelector('[data-copy-plan-status]');
    var layout = document.getElementById('layout-mode');
    var seam = document.getElementById('seam-size');
    var report = '';
    message.id = 'pp42-planner-message';
    message.setAttribute('role', 'alert');
    message.setAttribute('aria-atomic', 'true');
    input.setAttribute('aria-describedby', 'pp42-planner-message');

    function lines() {
      return input.value.split(/\r?\n/).map(function (line) { return line.trim(); }).filter(Boolean);
    }

    function updateCount() { count.textContent = lines().length + ' / 8 块'; }

    function resetPreview() {
      report = '';
      copyButton.disabled = true;
      copyStatus.textContent = '';
      previewStatus.textContent = '等待材料';
      summary.textContent = '草案会标出相对面积与建议缝份；实际裁切前请重新测量布片。';
      preview.replaceChildren();
      var placeholder = document.createElement('p');
      placeholder.className = 'pp42-preview-placeholder';
      placeholder.textContent = '输入至少 2 块布片后生成草案';
      preview.appendChild(placeholder);
    }

    function invalidatePreview() {
      if (report || !copyButton.disabled) resetPreview();
      message.textContent = '';
      copyStatus.textContent = '';
      input.removeAttribute('aria-invalid');
    }

    input.addEventListener('input', function () {
      updateCount();
      invalidatePreview();
    });
    layout.addEventListener('change', invalidatePreview);
    seam.addEventListener('change', invalidatePreview);
    sample.addEventListener('click', function () {
      resetPreview();
      input.value = '靛蓝劳动布 | 4 | #253b63\n原色棉 | 3 | #d8c7a0\n茜草染布 | 2 | #963f35\n灰绿衬布 | 1 | #87907a';
      input.removeAttribute('aria-invalid');
      message.textContent = '';
      updateCount();
      input.focus();
    });
    clear.addEventListener('click', function () {
      input.value = '';
      input.removeAttribute('aria-invalid');
      message.textContent = '';
      updateCount();
      resetPreview();
      input.focus();
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      resetPreview();
      message.textContent = '';
      copyStatus.textContent = '';
      var rawLines = lines();
      if (input.value.length > 2000) {
        input.setAttribute('aria-invalid', 'true');
        message.textContent = '输入最多 2000 个字符，请删减后重试。';
        input.focus();
        return;
      }
      if (rawLines.length < 2) {
        input.setAttribute('aria-invalid', 'true');
        message.textContent = '至少输入 2 块布片，才能比较比例。';
        input.focus();
        return;
      }
      if (rawLines.length > 8) {
        input.setAttribute('aria-invalid', 'true');
        message.textContent = '一次最多编排 8 块布片，请先合并相近材料。';
        input.focus();
        return;
      }
      var materials = [];
      var materialNames = new Set();
      for (var index = 0; index < rawLines.length; index += 1) {
        var parts = rawLines[index].split('|').map(function (part) { return part.trim(); });
        var weightText = parts[1] || '';
        var weight = Number(weightText);
        var color = parts[2] ? normalizeHex(parts[2]) : null;
        if (parts.length !== 3 || !parts[0] || !/^(?:0|[1-9]\d*)(?:\.\d{1,3})?$/.test(weightText) || !Number.isFinite(weight) || weight <= 0 || weight > 1000000 || !color) {
          input.setAttribute('aria-invalid', 'true');
          message.textContent = '第 ' + (index + 1) + ' 行格式不正确。请使用“名称 | 0.001–1000000 份 | #六位色值”，份量最多三位小数。';
          input.focus();
          return;
        }
        if (Array.from(parts[0]).length > 60) {
          input.setAttribute('aria-invalid', 'true');
          message.textContent = '第 ' + (index + 1) + ' 行名称超过 60 个字符，请缩短后重试。';
          input.focus();
          return;
        }
        var materialKey = normalized(parts[0]);
        if (materialNames.has(materialKey)) {
          input.setAttribute('aria-invalid', 'true');
          message.textContent = '第 ' + (index + 1) + ' 行材料名称重复，请合并份量后重试。';
          input.focus();
          return;
        }
        materialNames.add(materialKey);
        materials.push({ name: parts[0], weight: weight, color: color });
      }
      var total = materials.reduce(function (sum, item) { return sum + item.weight; }, 0);
      if (!Number.isFinite(total) || total <= 0) {
        input.setAttribute('aria-invalid', 'true');
        message.textContent = '材料总份量无效，请检查输入。';
        input.focus();
        return;
      }
      input.removeAttribute('aria-invalid');
      var mode = layout.value;
      var ordered = materials.slice().sort(function (a, b) { return b.weight - a.weight; });
      if (mode === 'dense') ordered.reverse();
      if (mode === 'balanced' && ordered.length > 2) {
        ordered = [ordered[0]].concat(ordered.slice(1).reverse());
      }
      preview.replaceChildren();
      ordered.forEach(function (item, itemIndex) {
        var piece = document.createElement('div');
        var share = item.weight / total;
        var size = share >= 0.34 ? 'large' : share >= 0.18 ? 'medium' : 'small';
        if (mode === 'quiet' && itemIndex === 0) size = 'large';
        piece.className = 'pp42-preview-piece';
        piece.setAttribute('data-size', size);
        piece.style.backgroundColor = item.color;
        piece.style.color = readableInk(item.color);
        var name = document.createElement('span');
        var ratio = document.createElement('span');
        name.textContent = item.name;
        ratio.textContent = Math.round(share * 100) + '% · ' + item.color;
        piece.appendChild(name);
        piece.appendChild(ratio);
        preview.appendChild(piece);
      });
      var seamText = seam.options[seam.selectedIndex].text;
      var layoutText = layout.options[layout.selectedIndex].text;
      previewStatus.textContent = materials.length + ' 块布 · ' + Math.round(total) + ' 份';
      summary.textContent = '建议按“' + layoutText + '”试排，四周预留 ' + seamText + '。颜色仅用于定位，裁切以实物为准。';
      report = '配布材料单｜' + layoutText + '｜缝份 ' + seam.value + ' cm\n' + materials.map(function (item) { return item.name + '｜' + item.weight + ' 份｜' + item.color + '｜' + Math.round(item.weight / total * 100) + '%'; }).join('\n');
      copyButton.disabled = false;
      preview.focus();
    });

    copyButton.addEventListener('click', function () {
      if (!report) return;
      copyText(report).then(function () { copyStatus.textContent = '材料单已复制。'; }).catch(function () { copyStatus.textContent = '复制失败，请手动选择材料单。'; });
    });
    updateCount();
  }

  function initManual() {
    var button = document.querySelector('[data-copy-manual]');
    var status = document.querySelector('[data-manual-status]');
    if (!button || !status) return;
    button.addEventListener('click', function () {
      var text = '~SITE_NAME~ 公开编辑手册 V3.2｜生效：2026-08-01｜范围：来源、授权、更正、隐私与联系｜https://~SITE_DOMAIN~/legal.html';
      copyText(text).then(function () { status.textContent = '版本摘要已复制。'; }).catch(function () { status.textContent = '复制失败，请手动选择版本摘要。'; });
    });
  }

  function init404() {
    var form = document.querySelector('[data-404-form]');
    if (!form) return;
    var input = document.getElementById('missing-query');
    var status = document.querySelector('[data-404-status]');
    var results = document.querySelector('[data-404-results]');
    var entries = [
      { terms: '靛蓝 劳动布 旧布 工装 材料', title: '一块旧布如何重新进入日常', href: 'article.html' },
      { terms: '拼布 配布 比例 色彩 裁切 工具', title: '配布比例工作台', href: 'tool.html' },
      { terms: '来源 授权 隐私 更正 联系 编辑', title: '编辑与使用说明', href: 'legal.html' },
      { terms: '修补 刺子绣 茜草 苎麻 布样 档案', title: '本期布样档案', href: 'index.html#archive' }
    ];
    input.addEventListener('input', function () {
      input.removeAttribute('aria-invalid');
      status.textContent = '';
      results.replaceChildren();
    });
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var query = normalized(input.value);
      results.replaceChildren();
      if (!query) {
        input.setAttribute('aria-invalid', 'true');
        status.textContent = '请输入想查找的材料或主题。';
        input.focus();
        return;
      }
      input.removeAttribute('aria-invalid');
      var matches = entries.filter(function (entry) {
        return normalized(entry.terms).indexOf(query) !== -1 || normalized(entry.title).indexOf(query) !== -1;
      });
      status.textContent = matches.length ? '找到 ' + matches.length + ' 份相关内容。' : '没有找到匹配内容。试试“靛蓝”“修补”或“隐私”。';
      matches.forEach(function (entry) {
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
  initArchive();
  initInvite();
  initArticle();
  initPlanner();
  initManual();
  init404();
}());
