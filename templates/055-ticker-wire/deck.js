/* 055 霓虹快讯台：主题、无障碍导航、核验筛选、阅读进度、时效检查与安全查找 */
(function () {
    "use strict";

    var root = document.documentElement;
    var themeButton = document.getElementById("tw55-theme-button");
    var themeKey = "ticker-wire-055-theme";

    function preferredTheme() {
        try {
            var saved = localStorage.getItem(themeKey);
            if (saved === "light" || saved === "dark") return saved;
        } catch (error) {
            // 无存储权限时仍按系统偏好显示。
        }
        return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    }

    function setTheme(theme, persist) {
        root.setAttribute("data-theme", theme);
        if (themeButton) {
            var next = theme === "dark" ? "浅色" : "夜间";
            themeButton.textContent = next;
            themeButton.setAttribute("aria-label", "切换到" + next + "模式");
        }
        if (persist) {
            try { localStorage.setItem(themeKey, theme); } catch (error) { /* 无存储权限 */ }
        }
    }

    setTheme(preferredTheme(), false);
    if (themeButton) {
        themeButton.addEventListener("click", function () {
            setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark", true);
        });
    }

    var navButton = document.getElementById("tw55-console-btn");
    var nav = document.getElementById("tw55-console-nav");

    function closeNav(restoreFocus) {
        if (!navButton || !nav) return;
        nav.classList.remove("tw55-lit");
        navButton.setAttribute("aria-expanded", "false");
        if (restoreFocus) navButton.focus();
    }

    if (navButton && nav) {
        navButton.addEventListener("click", function () {
            var open = !nav.classList.contains("tw55-lit");
            nav.classList.toggle("tw55-lit", open);
            navButton.setAttribute("aria-expanded", open ? "true" : "false");
            if (open) {
                var firstLink = nav.querySelector("a");
                if (firstLink) firstLink.focus();
            }
        });
        nav.addEventListener("click", function (event) {
            if (event.target.closest("a")) closeNav(false);
        });
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && nav.classList.contains("tw55-lit")) closeNav(true);
        });
    }

    function normalize(value) {
        return String(value == null ? "" : value).normalize("NFKC").trim();
    }

    function fallbackCopy(text, callback) {
        var field = document.createElement("textarea");
        field.value = text;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        var ok = false;
        try { ok = document.execCommand("copy"); } catch (error) { ok = false; }
        field.remove();
        callback(ok);
    }

    function copyText(text, button, status) {
        function done(ok) {
            if (status) status.textContent = ok ? "已复制，可粘贴使用。" : "复制失败，请手动选择文本。";
            if (button && ok) {
                var original = button.textContent;
                button.textContent = "已复制";
                window.setTimeout(function () { button.textContent = original; }, 1600);
            }
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function () { done(true); }, function () { fallbackCopy(text, done); });
        } else {
            fallbackCopy(text, done);
        }
    }

    function bindPortableCopy(buttonSelector, statusSelector) {
        var button = document.querySelector(buttonSelector);
        var status = document.querySelector(statusSelector);
        if (!button) return;
        button.addEventListener("click", function () {
            var note = button.closest(".tw55-portable-note");
            var paragraph = note && note.querySelector("p");
            if (paragraph) copyText(normalize(paragraph.textContent), button, status);
        });
    }

    bindPortableCopy("[data-copy-brief]", "[data-brief-status]");
    bindPortableCopy("[data-copy-disclosure]", "[data-disclosure-status]");

    var readingProgress = document.querySelector("[data-reading-progress]");
    if (readingProgress) {
        function updateReadingProgress() {
            var available = document.documentElement.scrollHeight - window.innerHeight;
            var percent = available > 0 ? Math.min(100, Math.max(0, window.scrollY / available * 100)) : 100;
            readingProgress.style.width = percent.toFixed(2) + "%";
        }
        updateReadingProgress();
        document.addEventListener("scroll", updateReadingProgress, { passive: true });
        window.addEventListener("resize", updateReadingProgress);
    }

    var filterButtons = Array.prototype.slice.call(document.querySelectorAll("[data-signal-filter]"));
    var signalCards = Array.prototype.slice.call(document.querySelectorAll("[data-signal-status]"));
    var signalCount = document.querySelector("[data-signal-count]");
    if (filterButtons.length && signalCards.length) {
        filterButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                var filter = button.getAttribute("data-signal-filter");
                filterButtons.forEach(function (item) { item.setAttribute("aria-pressed", item === button ? "true" : "false"); });
                var visible = 0;
                signalCards.forEach(function (card) {
                    var show = filter === "all" || card.getAttribute("data-signal-status") === filter;
                    card.hidden = !show;
                    if (show) visible += 1;
                });
                signalCount.textContent = visible + " 条信号";
            });
        });
    }

    function parseLocalMinute(value) {
        var text = normalize(value);
        var match = text.match(/^(20\d{2})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/);
        if (!match) return null;
        var parts = match.slice(1).map(Number);
        var milliseconds = Date.UTC(parts[0], parts[1] - 1, parts[2], parts[3], parts[4]);
        var check = new Date(milliseconds);
        if (check.getUTCFullYear() !== parts[0] || check.getUTCMonth() !== parts[1] - 1 || check.getUTCDate() !== parts[2] || check.getUTCHours() !== parts[3] || check.getUTCMinutes() !== parts[4]) return null;
        return { text: text, milliseconds: milliseconds };
    }

    function parseThreshold(value) {
        var text = normalize(value);
        if (!/^[1-9]\d*$/.test(text)) return null;
        var number = Number(text);
        return Number.isSafeInteger(number) && number <= 10080 ? number : null;
    }

    var ageForm = document.getElementById("tw55-age-form");
    if (ageForm) {
        var issuedInput = document.getElementById("tw55-age-issued");
        var checkedInput = document.getElementById("tw55-age-checked");
        var thresholdInput = document.getElementById("tw55-age-threshold");
        var ageInputs = [issuedInput, checkedInput, thresholdInput];
        var ageMessage = document.getElementById("tw55-age-message");
        var ageState = ageForm.querySelector("[data-age-state]");
        var ageResult = ageForm.querySelector("[data-age-result]");
        var ageMeter = ageForm.querySelector("[data-age-meter]");
        var ageWindow = ageForm.querySelector("[data-age-window]");
        var ageVerdict = ageForm.querySelector("[data-age-verdict]");
        var issuedResult = ageForm.querySelector("[data-age-issued-result]");
        var checkedResult = ageForm.querySelector("[data-age-checked-result]");
        var ageCopy = ageForm.querySelector("[data-copy-age]");
        var ageCopyStatus = ageForm.querySelector("[data-age-copy-status]");
        var ageReset = ageForm.querySelector("[data-age-reset]");
        var lastAge = "";

        function clearAge(stale) {
            ageState.textContent = stale ? "结果待更新" : "等待输入";
            ageState.removeAttribute("data-level");
            ageResult.textContent = "—";
            ageWindow.textContent = "—";
            ageVerdict.textContent = "—";
            issuedResult.textContent = "—";
            checkedResult.textContent = "—";
            ageMeter.value = 0;
            ageCopy.disabled = true;
            ageCopyStatus.textContent = "";
            lastAge = "";
        }

        ageInputs.forEach(function (input) {
            input.addEventListener("input", function () {
                input.removeAttribute("aria-invalid");
                ageMessage.textContent = "";
                clearAge(true);
            });
        });

        ageForm.addEventListener("submit", function (event) {
            event.preventDefault();
            var issued = parseLocalMinute(issuedInput.value);
            var checked = parseLocalMinute(checkedInput.value);
            var threshold = parseThreshold(thresholdInput.value);
            var values = [issued, checked, threshold];
            ageInputs.forEach(function (input, index) {
                if (values[index] == null) input.setAttribute("aria-invalid", "true");
                else input.removeAttribute("aria-invalid");
            });
            var invalidCount = values.filter(function (value) { return value == null; }).length;
            if (invalidCount) {
                ageMessage.textContent = "有 " + invalidCount + " 项输入无效；时间须在 2000–2099 年，阈值须为 1–10080 的整数。";
                ageState.textContent = "请修正输入";
                ageCopy.disabled = true;
                ageInputs[values.findIndex(function (value) { return value == null; })].focus();
                return;
            }
            if (checked.milliseconds < issued.milliseconds) {
                checkedInput.setAttribute("aria-invalid", "true");
                ageMessage.textContent = "核验时间不能早于发布时间。";
                ageState.textContent = "时间顺序错误";
                ageCopy.disabled = true;
                checkedInput.focus();
                return;
            }

            ageMessage.textContent = "";
            var elapsed = (checked.milliseconds - issued.milliseconds) / 60000;
            var level = elapsed <= threshold ? "fresh" : elapsed <= threshold * 2 ? "review" : "stale";
            var verdict = level === "fresh" ? "新鲜" : level === "review" ? "待复核" : "已过时";
            ageState.textContent = verdict;
            ageState.setAttribute("data-level", level);
            ageResult.textContent = elapsed + " 分钟";
            ageWindow.textContent = threshold + " 分钟";
            ageVerdict.textContent = verdict;
            issuedResult.textContent = issued.text.replace("T", " ");
            checkedResult.textContent = checked.text.replace("T", " ");
            ageMeter.max = threshold * 2;
            ageMeter.low = threshold;
            ageMeter.high = threshold * 2;
            ageMeter.optimum = 0;
            ageMeter.value = Math.min(elapsed, threshold * 2);
            lastAge = "快讯发布于 " + issued.text.replace("T", " ") + "，核验于 " + checked.text.replace("T", " ") + "，相隔 " + elapsed + " 分钟；时效阈值 " + threshold + " 分钟，结论：" + verdict + "。";
            ageCopy.disabled = false;
        });

        ageForm.querySelectorAll("[data-age-preset]").forEach(function (button) {
            button.addEventListener("click", function () {
                var values = button.getAttribute("data-age-preset").split(",");
                issuedInput.value = values[0];
                checkedInput.value = values[1];
                thresholdInput.value = values[2];
                ageForm.requestSubmit();
            });
        });

        ageReset.addEventListener("click", function () {
            ageForm.reset();
            ageInputs.forEach(function (input) { input.removeAttribute("aria-invalid"); });
            ageMessage.textContent = "";
            clearAge(false);
            issuedInput.focus();
        });

        ageCopy.addEventListener("click", function () {
            if (lastAge) copyText(lastAge, ageCopy, ageCopyStatus);
        });
    }

    var searchForm = document.querySelector("[data-wire-search]");
    if (searchForm) {
        var query = document.getElementById("tw55-wire-query");
        var feedback = document.querySelector("[data-wire-feedback]");
        var topics = [
            { words: "快讯 首页 核验 信号 费率", label: "回到快讯核验台", href: "index.html" },
            { words: "专栏 规则 账单 来源 记录", label: "阅读核验专栏", href: "article.html" },
            { words: "时效 时间 阈值 新鲜 过时", label: "使用时效检查器", href: "tool.html" },
            { words: "披露 免责 联系 风险", label: "查看披露与风险边界", href: "legal.html" }
        ];
        query.addEventListener("input", function () { feedback.textContent = "输入已变化，请重新查找。"; });
        searchForm.addEventListener("submit", function (event) {
            event.preventDefault();
            var term = normalize(query.value).toLowerCase();
            feedback.replaceChildren();
            if (!term) {
                feedback.textContent = "请先输入要查找的线路。";
                query.focus();
                return;
            }
            var match = topics.find(function (topic) {
                return (topic.words + " " + topic.label).normalize("NFKC").toLowerCase().indexOf(term) !== -1;
            });
            if (!match) {
                feedback.textContent = "没有直接匹配。可尝试“核验”“时效”或“披露”。";
                return;
            }
            feedback.append("找到：");
            var link = document.createElement("a");
            link.href = match.href;
            link.textContent = match.label;
            feedback.appendChild(link);
        });
    }
})();
