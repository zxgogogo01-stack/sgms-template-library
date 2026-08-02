(function () {
  "use strict";

  var box = document.getElementById("seek-box");
  if (box) {
    var items = document.querySelectorAll(".entry-field__item");
    var headings = document.querySelectorAll(".entry-field__heading");
    var sets = document.querySelectorAll(".entry-field__set");
    var status = document.getElementById("seek-status");
    var empty = document.getElementById("entry-empty");
    var clear = document.getElementById("seek-clear");

    function filterEntries() {
      var q = box.value.trim().toLowerCase();
      var visible = 0;
      for (var i = 0; i < items.length; i++) {
        var hit = items[i].textContent.toLowerCase().indexOf(q) !== -1;
        items[i].hidden = q !== "" && !hit;
        if (!items[i].hidden) visible++;
      }
      for (var j = 0; j < sets.length; j++) {
        var hasVisible = sets[j].querySelector(".entry-field__item:not([hidden])") !== null;
        sets[j].hidden = q !== "" && !hasVisible;
        if (headings[j]) headings[j].hidden = sets[j].hidden;
      }
      if (empty) empty.hidden = visible !== 0;
      if (status) status.textContent = q === "" ? "共 8 个词条" : (visible ? "找到 " + visible + " 个词条" : "没有匹配词条");
    }

    box.addEventListener("input", filterEntries);
    if (clear) clear.addEventListener("click", function () { box.value = ""; filterEntries(); box.focus(); });
  }

  var drawBtn = document.getElementById("draw-btn");
  var revealBtn = document.getElementById("reveal-btn");
  if (drawBtn && revealBtn) {
    var deck = [
      ["限价单", "按指定价格或更优价格成交的委托。"],
      ["市价单", "以当前可获得价格尽快成交的委托。"],
      ["订单簿", "按价格排列的待成交买卖委托集合。"],
      ["市场深度", "不同价位上可成交数量的分布状况。"],
      ["挂单费率", "限价单进入订单簿等待成交时适用的费率。"],
      ["吃单费率", "立即与簿内委托成交时适用的费率。"],
      ["分档", "按成交量或持仓规模划分的费率等级。"]
    ];
    var at = -1;
    var draws = 0;
    var term = document.getElementById("draw-term");
    var sense = document.getElementById("draw-sense");
    var label = document.getElementById("draw-label");
    var hint = document.getElementById("draw-hint");
    var progress = document.getElementById("draw-progress");

    drawBtn.addEventListener("click", function () {
      var next = Math.floor(Math.random() * deck.length);
      if (next === at) next = (next + 1) % deck.length;
      at = next;
      draws++;
      term.textContent = deck[at][0];
      sense.textContent = deck[at][1];
      sense.hidden = true;
      label.textContent = "词条正面 / CARD " + String(at + 1).padStart(2, "0");
      hint.textContent = "先用一句话复述定义，再显示释义。";
      revealBtn.disabled = false;
      revealBtn.textContent = "显示释义";
      drawBtn.textContent = "换一张";
      progress.textContent = "已抽取 " + draws + " 次 · 本轮未重复上一张";
    });

    revealBtn.addEventListener("click", function () {
      var willReveal = sense.hidden;
      sense.hidden = !willReveal;
      revealBtn.textContent = willReveal ? "收起释义" : "显示释义";
      label.textContent = willReveal ? "词条背面 / DEFINITION" : "词条正面 / RECALL";
      hint.textContent = willReveal ? "核对关键词，而不是逐字背诵。" : "再次尝试复述，再翻面确认。";
    });
  }
})();
