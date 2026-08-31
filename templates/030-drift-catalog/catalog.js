(function () {
    "use strict";

    var search = document.getElementById("catalog-search");
    var cards = Array.prototype.slice.call(document.querySelectorAll(".dc-catalog-card"));
    var filters = Array.prototype.slice.call(document.querySelectorAll("[data-filter]"));
    var count = document.getElementById("catalog-count");
    var empty = document.getElementById("catalog-empty");
    var clear = document.getElementById("clear-catalog");
    var copy = document.getElementById("copy-route");
    var copyStatus = document.getElementById("copy-route-status");
    var activeFilter = "all";

    function normalize(value) {
        return value.toLocaleLowerCase().replace(/\s+/g, " ").trim();
    }

    function update() {
        var query = normalize(search.value);
        var visible = 0;
        cards.forEach(function (card) {
            var categoryMatch = activeFilter === "all" || card.dataset.category === activeFilter;
            var textMatch = !query || normalize(card.textContent).indexOf(query) !== -1;
            var show = categoryMatch && textMatch;
            card.hidden = !show;
            if (show) visible += 1;
        });
        count.textContent = visible + " / " + cards.length + " 条航线可见";
        empty.hidden = visible !== 0;
    }

    search.addEventListener("input", update);
    filters.forEach(function (button) {
        button.addEventListener("click", function () {
            activeFilter = button.dataset.filter;
            filters.forEach(function (item) {
                item.setAttribute("aria-pressed", item === button ? "true" : "false");
            });
            update();
        });
    });

    clear.addEventListener("click", function () {
        activeFilter = "all";
        search.value = "";
        filters.forEach(function (button) {
            button.setAttribute("aria-pressed", button.dataset.filter === "all" ? "true" : "false");
        });
        update();
        search.focus();
    });

    copy.addEventListener("click", function () {
        var route = "漂流目录 · 本期航线：研究资料 / 创作工具 / 趋势观察 · https://[[SITE_DOMAIN]]/";
        var fallback = function () {
            var helper = document.createElement("textarea");
            helper.value = route;
            document.body.appendChild(helper);
            helper.select();
            document.execCommand("copy");
            helper.remove();
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(route).catch(fallback);
        } else {
            fallback();
        }
        copyStatus.textContent = "本期航线已复制";
    });

    update();
})();
