// 单模板严格审计：页面套件、SEO、可访问性、替换说明与基础体检
// 用法：
//   node tools/audit-template.js templates/001-slate-ledger
//   node tools/audit-template.js templates/001-slate-ledger templates/002-quiet-quill
"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const REQUIRED = [
  "index.html",
  "article.html",
  "tool.html",
  "legal.html",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "TEMPLATE.md",
];
const PAGES = ["index.html", "article.html", "tool.html", "legal.html", "404.html"];
const TOKEN_RES = [
  /\{\{[A-Z][A-Z0-9_]*\}\}/g,
  /\[\[[A-Z][A-Z0-9_]*\]\]/g,
  /%[A-Z][A-Z0-9_]*%/g,
  /__[A-Z][A-Z0-9_]*__/g,
  /~[A-Z][A-Z0-9_]*~/g,
  /\{[A-Z][A-Z0-9_]*\}/g,
];

function targets(args) {
  if (args.length) return args.map((item) => path.resolve(ROOT, item));
  const base = path.join(ROOT, "templates");
  if (!fs.existsSync(base)) return [];
  return fs
    .readdirSync(base)
    .map((name) => path.join(base, name))
    .filter((item) => fs.statSync(item).isDirectory());
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function tags(text, name) {
  return text.match(new RegExp("<" + name + "\\b[^>]*>", "gi")) || [];
}

function attr(tag, name) {
  const match = tag.match(new RegExp("\\b" + name + "\\s*=\\s*(?:\"([^\"]*)\"|'([^']*)')", "i"));
  return match ? (match[1] === undefined ? match[2] : match[1]) : "";
}

function visibleText(tag) {
  return tag.replace(/<[^>]+>/g, "").replace(/&[a-z0-9#]+;/gi, " ").trim();
}

function collectTokens(text) {
  const out = new Set();
  for (const re of TOKEN_RES) {
    re.lastIndex = 0;
    let match;
    while ((match = re.exec(text))) out.add(match[0]);
  }
  return out;
}

function strictChecks(dir) {
  const fails = [];
  const warns = [];
  const name = path.basename(dir);

  if (!/^\d{3}-[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) {
    fails.push("目录名必须是 NNN-lowercase-slug");
  }

  for (const rel of REQUIRED) {
    const file = path.join(dir, rel);
    if (!fs.existsSync(file)) {
      fails.push("缺少页面套件文件: " + rel);
      continue;
    }
    const stat = fs.lstatSync(file);
    if (stat.isSymbolicLink()) fails.push(rel + " 不得是符号链接");
    if (!stat.isFile() || stat.size === 0) fails.push(rel + " 必须是非空普通文件");
  }
  if (fails.some((item) => item.startsWith("缺少页面套件文件"))) return { fails, warns };

  const templateDoc = read(path.join(dir, "TEMPLATE.md"));
  if (!/(替换|变量|占位符)/.test(templateDoc)) fails.push("TEMPLATE.md 缺少变量替换说明");
  if (!/(AI|人工智能|内容接入|文字接入|使用顺序)/i.test(templateDoc)) {
    fails.push("TEMPLATE.md 缺少后续 AI 仅替换内容的接入说明");
  }

  const usedTokens = new Set();
  const titles = new Map();
  const descriptions = new Map();
  for (const page of PAGES) {
    const html = read(path.join(dir, page));
    for (const token of collectTokens(html)) usedTokens.add(token);

    const titleMatches = html.match(/<title\b[^>]*>[\s\S]*?<\/title>/gi) || [];
    if (titleMatches.length !== 1) fails.push(page + " 必须且只能有一个 <title>");
    const title = titleMatches.length ? visibleText(titleMatches[0]) : "";
    if (!title) fails.push(page + " title 为空");
    if (page !== "404.html") {
      if (titles.has(title)) fails.push(page + " 与 " + titles.get(title) + " 使用相同 title");
      titles.set(title, page);
    }

    const h1Matches = html.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/gi) || [];
    if (h1Matches.length !== 1) fails.push(page + " 必须且只能有一个可见 h1");

    if (!/<meta\b[^>]*name\s*=\s*["']viewport["'][^>]*>/i.test(html)) {
      fails.push(page + " 缺 viewport");
    }
    if (!/<html\b[^>]*lang\s*=\s*["'][^"']+["']/i.test(html)) fails.push(page + " 缺 html lang");

    if (page === "404.html") {
      if (!/<meta\b[^>]*name\s*=\s*["']robots["'][^>]*content\s*=\s*["'][^"']*noindex/i.test(html) &&
          !/<meta\b[^>]*content\s*=\s*["'][^"']*noindex[^"']*["'][^>]*name\s*=\s*["']robots["']/i.test(html)) {
        fails.push("404.html 必须 noindex");
      }
    } else {
      const descTag = tags(html, "meta").find((tag) => attr(tag, "name").toLowerCase() === "description");
      const desc = descTag ? attr(descTag, "content").trim() : "";
      if (!desc) fails.push(page + " 缺非空 meta description");
      if (desc && descriptions.has(desc)) warns.push(page + " 与 " + descriptions.get(desc) + " 使用相同 description");
      if (desc) descriptions.set(desc, page);
      if (!tags(html, "link").some((tag) => attr(tag, "rel").toLowerCase().split(/\s+/).includes("canonical") && attr(tag, "href"))) {
        fails.push(page + " 缺 canonical");
      }
    }

    const ids = new Map();
    for (const tag of html.match(/<[a-z][^>]*\bid\s*=\s*(?:"[^"]+"|'[^']+')[^>]*>/gi) || []) {
      const id = attr(tag, "id");
      if (ids.has(id)) fails.push(page + " 出现重复 id: " + id);
      ids.set(id, true);
    }

    const labels = new Set(tags(html, "label").map((tag) => attr(tag, "for")).filter(Boolean));
    for (const tag of html.match(/<(?:input|select|textarea)\b[^>]*>/gi) || []) {
      const type = attr(tag, "type").toLowerCase();
      if (type === "hidden") continue;
      const id = attr(tag, "id");
      if (!attr(tag, "aria-label") && !attr(tag, "aria-labelledby") && !(id && labels.has(id))) {
        fails.push(page + " 表单控件缺少可访问名称: " + (id || tag.slice(0, 64)));
      }
    }
    for (const tag of html.match(/<button\b[^>]*>[\s\S]*?<\/button>/gi) || []) {
      if (!attr(tag, "aria-label") && !visibleText(tag)) fails.push(page + " 存在无可访问名称的按钮");
    }
    for (const tag of tags(html, "iframe")) {
      if (!attr(tag, "title")) fails.push(page + " iframe 缺 title");
    }
    if (/\bon[a-z]+\s*=/i.test(html)) fails.push(page + " 含内联事件处理器，交互应放入独立 JS");
    if (/href\s*=\s*["']\s*javascript:/i.test(html)) fails.push(page + " 含 javascript: 链接");
    for (const tag of tags(html, "a")) {
      if (attr(tag, "target") === "_blank" && !/\bnoopener\b/i.test(attr(tag, "rel"))) {
        fails.push(page + " target=_blank 链接缺 rel=noopener");
      }
    }
  }

  for (const token of usedTokens) {
    if (!templateDoc.includes(token)) fails.push("TEMPLATE.md 未说明页面变量: " + token);
  }

  const robots = read(path.join(dir, "robots.txt"));
  const sitemap = read(path.join(dir, "sitemap.xml"));
  if (!/^User-agent:/mi.test(robots)) fails.push("robots.txt 缺 User-agent");
  if (!/^Sitemap:/mi.test(robots)) fails.push("robots.txt 缺 Sitemap");
  if (!/<urlset\b/i.test(sitemap) || !/<loc>/i.test(sitemap)) fails.push("sitemap.xml 缺 urlset/loc");

  return { fails, warns };
}

function main() {
  const list = targets(process.argv.slice(2));
  if (!list.length) {
    console.log("没有可审计的模板。");
    return;
  }

  let failed = false;
  for (const dir of list) {
    const name = path.basename(dir);
    const rel = path.relative(ROOT, dir);
    const base = spawnSync(process.execPath, [path.join(__dirname, "validate.js"), rel], { encoding: "utf8" });
    const result = strictChecks(dir);
    if (base.status !== 0) result.fails.unshift("基础体检失败；先运行 node tools/validate.js " + rel + " 查看详情");
    if (!result.fails.length && !result.warns.length) {
      console.log("✓ " + name + " 严格审计通过");
      continue;
    }
    console.log((result.fails.length ? "✗ " : "△ ") + name);
    for (const item of result.fails) console.log("    FAIL " + item);
    for (const item of result.warns) console.log("    warn " + item);
    if (result.fails.length) failed = true;
  }
  process.exit(failed ? 1 : 0);
}

main();
