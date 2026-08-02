// 模板基础体检：文件名 / 外链 / 占位符残留 / SEO 要素 / JS 语法
// 用法：
//   node tools/validate.js                          # 检查 templates/ 下全部
//   node tools/validate.js templates/001-x ...      # 只查指定模板
"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");

const PLACEHOLDER_RES = [
  /\{\{[^{}]+\}\}/,
  /\[\[[^\[\]]+\]\]/,
  /%[A-Za-z][A-Za-z0-9_]*%/,
  /__[A-Za-z][A-Za-z0-9_]*__/,
  /~[A-Za-z][A-Za-z0-9_]*~/,
  /\{[A-Za-z][A-Za-z0-9_]*\}/,
];
const ALLOWED_HOSTS = ["schema.org", "www.w3.org", "www.sitemaps.org"];
const RESERVED = /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(\..*)?$/i;
const EXCHANGES = /(binance|okx|okex|bybit|coinbase|huobi|htx|gate\.io|kraken|bitget|kucoin|mexc|bitfinex)/i;
const SCRIPT_EXT = /\.(sh|bat|ps1|py|cmd|exe)$/i;

function listTargets(argv) {
  if (argv.length) return argv.map((a) => path.resolve(ROOT, a));
  const base = path.join(ROOT, "templates");
  if (!fs.existsSync(base)) return [];
  return fs
    .readdirSync(base)
    .map((d) => path.join(base, d))
    .filter((p) => fs.statSync(p).isDirectory());
}

function walk(dir) {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

function hasPlaceholder(s) {
  return PLACEHOLDER_RES.some((re) => re.test(s));
}

function checkTemplate(tpl) {
  const fails = [];
  const warns = [];
  const rel = (p) => path.relative(tpl, p).replace(/\\/g, "/");

  // index.html 必须存在且不能是符号链接
  const idx = path.join(tpl, "index.html");
  let st;
  try {
    st = fs.lstatSync(idx);
  } catch {
    fails.push("缺少 index.html");
  }
  if (st) {
    if (st.isSymbolicLink()) fails.push("index.html 是符号链接");
    else if (st.size === 0) fails.push("index.html 为空文件");
  }

  const files = walk(tpl);
  for (const f of files) {
    const base = path.basename(f);
    const relPath = rel(f);
    // 文件名：全小写 ASCII
    for (const seg of relPath.split("/")) {
      if (seg !== "TEMPLATE.md" && !/^[a-z0-9._-]+$/.test(seg)) {
        fails.push("文件名不合规（须全小写 ASCII）: " + relPath);
        break;
      }
      if (RESERVED.test(seg)) {
        fails.push("Windows 保留名: " + relPath);
        break;
      }
    }
    if (SCRIPT_EXT.test(base)) fails.push("模板内不许放脚本: " + relPath);
  }

  const textFiles = files.filter((f) => /\.(html|css|js|xml|txt|md|svg)$/i.test(f));
  for (const f of textFiles) {
    const text = fs.readFileSync(f, "utf8");
    const relPath = rel(f);

    // 外部 URL：只允许 schema.org / w3.org 命名空间，或含占位符的 URL
    const urlRe = /https?:\/\/[^\s"'<>)]*/g;
    let m;
    while ((m = urlRe.exec(text))) {
      const url = m[0];
      if (hasPlaceholder(url)) continue;
      if (ALLOWED_HOSTS.some((h) => url.includes(h))) continue;
      fails.push(relPath + " 引用外部 URL: " + url.slice(0, 80));
    }

    if (EXCHANGES.test(text)) fails.push(relPath + " 出现交易所名称");

    // 真实邮箱残留（占位符不含 @，能匹配到的就是写死的）
    const mailRe = /[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+\.[a-z]{2,}/g;
    while ((m = mailRe.exec(text))) {
      if (!hasPlaceholder(m[0])) warns.push(relPath + " 疑似写死邮箱: " + m[0]);
    }

    if (/去注册|立即注册|马上注册|立即开户/.test(text)) {
      warns.push(relPath + " 出现注册类 CTA 话术");
    }
  }

  // HTML 要素
  for (const f of textFiles.filter((f) => f.endsWith(".html"))) {
    const text = fs.readFileSync(f, "utf8");
    const relPath = rel(f);
    if (/(?:正文|摘要|答案|开篇|提醒|模板)占位|占位符|（占位）|表内[^<]{0,24}占位/.test(text)) {
      fails.push(relPath + " 含有未完成的可见占位内容");
    }
    if (path.basename(f).toLowerCase() === "index.html" && /<template\b/i.test(text)) {
      fails.push(relPath + " 使用不渲染的 <template> 保存源分支");
    }
    if (!/<title[\s>]/i.test(text)) fails.push(relPath + " 缺 <title>");
    if (!/<meta[^>]+viewport/i.test(text)) fails.push(relPath + " 缺 viewport");
    if (!/<html[^>]+lang/i.test(text)) warns.push(relPath + " <html> 无 lang");
    const imgRe = /<img\b[^>]*>/gi;
    let m;
    while ((m = imgRe.exec(text))) {
      const tag = m[0];
      if (!/\balt\s*=/i.test(tag)) fails.push(relPath + " <img> 缺 alt");
      if (!/\bwidth\s*=/i.test(tag) || !/\bheight\s*=/i.test(tag)) {
        warns.push(relPath + " <img> 缺 width/height");
      }
    }
    // 粗查标签闭合平衡
    const balanceText = text.replace(/<!--[\s\S]*?-->/g, "");
    for (const tag of ["div", "section", "main", "header", "footer", "nav", "article", "aside", "ul", "ol", "table", "form"]) {
      const open = (balanceText.match(new RegExp("<" + tag + "(\\s|>)", "gi")) || []).length;
      const close = (balanceText.match(new RegExp("</" + tag + ">", "gi")) || []).length;
      if (open !== close) warns.push(relPath + " <" + tag + "> 开闭不平衡 " + open + "/" + close);
    }
    // href/src 引用的本地文件必须存在（大小写逐字符一致）
    const refRe = /(?:href|src)\s*=\s*"([^"#{%\[~_][^"#]*)"|(?:href|src)\s*=\s*'([^'#{%\[~_][^'#]*)'/gi;
    while ((m = refRe.exec(text))) {
      const ref = (m[1] || m[2] || "").trim();
      if (!ref || /^(https?:|mailto:|tel:|data:|javascript:)/i.test(ref)) continue;
      if (hasPlaceholder(ref)) continue;
      const target = path.resolve(path.dirname(f), ref.split("?")[0]);
      if (!fs.existsSync(target)) {
        fails.push(relPath + " 引用不存在的文件: " + ref);
      } else {
        // Windows 不区分大小写，逐字符核对真实文件名
        const dir = path.dirname(target);
        const want = path.basename(target);
        if (fs.existsSync(dir) && !fs.readdirSync(dir).includes(want)) {
          fails.push(relPath + " 引用大小写不一致: " + ref);
        }
      }
    }
  }

  // JS 语法
  for (const f of files.filter((f) => f.endsWith(".js"))) {
    const r = spawnSync(process.execPath, ["--check", f], { encoding: "utf8" });
    if (r.status !== 0) fails.push(rel(f) + " node --check 失败: " + (r.stderr || "").split("\n")[0]);
  }

  return { fails, warns };
}

function main() {
  const targets = listTargets(process.argv.slice(2));
  if (!targets.length) {
    console.log("没有可检查的模板。");
    return;
  }
  let anyFail = false;
  for (const t of targets) {
    const { fails, warns } = checkTemplate(t);
    const name = path.basename(t);
    if (!fails.length && !warns.length) {
      console.log("✓ " + name);
    } else {
      console.log((fails.length ? "✗ " : "△ ") + name);
      for (const x of fails) console.log("    FAIL " + x);
      for (const x of warns) console.log("    warn " + x);
      if (fails.length) anyFail = true;
    }
  }
  process.exit(anyFail ? 1 : 0);
}

main();
