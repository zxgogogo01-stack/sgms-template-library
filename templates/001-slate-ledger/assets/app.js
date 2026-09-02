(function () {
  "use strict";

  function copyText(value, done, fallbackElement) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(value).then(done, function () { selectFallback(fallbackElement, done); });
      return;
    }
    selectFallback(fallbackElement, done);
  }

  function selectFallback(element, done) {
    if (!element) return;
    var range = document.createRange();
    var selection = window.getSelection();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);
    try {
      document.execCommand("copy");
      done();
    } catch (error) {
      element.setAttribute("tabindex", "-1");
      element.focus();
    }
  }

  var copyInvite = document.querySelector("[data-copy]");
  if (copyInvite) {
    copyInvite.addEventListener("click", function () {
      var source = document.getElementById(copyInvite.getAttribute("data-copy"));
      var status = document.querySelector(".invite-card__status");
      if (!source) return;
      copyText(source.textContent.trim(), function () {
        copyInvite.textContent = "已复制";
        if (status) status.textContent = "邀请码已复制到剪贴板。";
        window.setTimeout(function () {
          copyInvite.textContent = "复制";
          if (status) status.textContent = "";
        }, 2200);
      }, source);
    });
  }

  var venue = document.getElementById("pick-venue");
  var tier = document.getElementById("pick-tier");
  var table = document.getElementById("rate-table");
  var reset = document.getElementById("reset-filter");
  var empty = document.getElementById("rate-empty");

  function filterRows() {
    if (!table) return;
    var rows = table.querySelectorAll("tbody tr");
    var shown = 0;
    for (var index = 0; index < rows.length; index += 1) {
      var row = rows[index];
      var venueMatch = !venue || !venue.value || row.getAttribute("data-venue") === venue.value;
      var tierMatch = !tier || !tier.value || row.getAttribute("data-tier") === tier.value;
      row.hidden = !(venueMatch && tierMatch);
      if (!row.hidden) shown += 1;
    }
    if (empty) empty.hidden = shown !== 0;
  }

  if (venue) venue.addEventListener("change", filterRows);
  if (tier) tier.addEventListener("change", filterRows);
  if (reset) {
    reset.addEventListener("click", function () {
      if (venue) venue.value = "";
      if (tier) tier.value = "";
      filterRows();
      if (venue) venue.focus();
    });
  }
}());
