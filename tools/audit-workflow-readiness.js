#!/usr/bin/env node
// 建站工作流就绪度审计。旧模板可运行盘点；v2 模板以 TEMPLATE.md 角色表为事实源严格验收。
"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const TEMPLATE_ROOT = path.join(ROOT, "templates");
const GA_BLOCK = '<!-- <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag(\'js\',new Date());gtag(\'config\',\'G-XXXXXXXXXX\');</script> -->';
const LEGAL_KEYS = ["about", "contact", "disclosure", "disclaimer", "privacy", "corrections", "editorial"];

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === ".git") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function targets(args) {
  if (args.length) return args.map((item) => path.resolve(ROOT, item));
  return fs.readdirSync(TEMPLATE_ROOT).map((name) => path.join(TEMPLATE_ROOT, name)).filter((item) => fs.statSync(item).isDirectory());
}

function text(file) { return fs.readFileSync(file, "utf8"); }
function relative(dir, file) { return path.relative(dir, file).split(path.sep).join("/"); }
function stripMarkup(value) { return value.replace(/<script\b[\s\S]*?<\/script>/gi, " ").replace(/<style\b[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&[a-z0-9#]+;/gi, " "); }
function attr(tag, name) {
  const match = tag.match(new RegExp("\\b" + name + "\\s*=\\s*(?:\"([^\"]*)\"|'([^']*)')", "i"));
  return match ? (match[1] === undefined ? match[2] : match[1]) : "";
}

function manifestFrom(doc) {
  const match = doc.match(/```json\s+workflow-ready-v2\s*\n([\s\S]*?)```/i);
  if (!match) return null;
  try { return JSON.parse(match[1]); }
  catch (error) { return { __parseError: error.message }; }
}

function pngSize(file) {
  if (!fs.existsSync(file)) return null;
  const data = fs.readFileSync(file);
  if (data.length < 24 || data.toString("hex", 0, 8) !== "89504e470d0a1a0a") return null;
  return { width: data.readUInt32BE(16), height: data.readUInt32BE(20) };
}

function normalizedTarget(from, href) {
  if (!href || /^(?:https?:|mailto:|tel:|#|\/\/)/i.test(href) || href.includes("{{") || href.includes("[[") || href.includes("%%") || href.includes("__")) return null;
  const clean = href.split("#")[0].split("?")[0];
  if (!clean) return null;
  const base = clean.startsWith("/") ? clean.slice(1) : path.posix.normalize(path.posix.join(path.posix.dirname(from), clean));
  return base.endsWith("/") ? base + "index.html" : base;
}

function linksIn(html) {
  return [...html.matchAll(/<a\b[^>]*\bhref\s*=\s*(?:"([^"]*)"|'([^']*)')[^>]*>/gi)].map((match) => match[1] === undefined ? match[2] : match[1]);
}

function add(bucket, severity, message) { bucket.push({ severity, message }); }

function audit(dir) {
  const issues = [];
  const name = path.basename(dir);
  const files = walk(dir);
  const htmlFiles = files.filter((file) => file.endsWith(".html"));
  const htmlByPath = new Map(htmlFiles.map((file) => [relative(dir, file), text(file)]));
  const docFile = path.join(dir, "TEMPLATE.md");
  const doc = fs.existsSync(docFile) ? text(docFile) : "";
  const manifest = manifestFrom(doc);

  const common = {
    html: htmlFiles.length,
    feed: fs.existsSync(path.join(dir, "feed.xml")),
    favicon: fs.existsSync(path.join(dir, "favicon.ico")) || fs.existsSync(path.join(dir, "favicon.svg")),
    apple: fs.existsSync(path.join(dir, "apple-touch-icon.png")),
    security: fs.existsSync(path.join(dir, ".well-known", "security.txt")),
    twitterPages: htmlFiles.filter((file) => /twitter:card/i.test(text(file))).length,
    ogImagePages: htmlFiles.filter((file) => /property\s*=\s*["']og:image["']/i.test(text(file))).length,
    gaPages: htmlFiles.filter((file) => text(file).includes(GA_BLOCK)).length,
    articleCandidates: htmlFiles.filter((file) => /article/i.test(relative(dir, file)) || /property\s*=\s*["']og:type["']\s+content\s*=\s*["']article["']/i.test(text(file))).length,
    toolCandidates: htmlFiles.filter((file) => /tool|calc|check|instrument/i.test(relative(dir, file))).length
  };

  if (!manifest) {
    add(issues, "P0", "缺 workflow-ready-v2 角色表，后续 AI 无法确定页面职责与完整路径");
    if (common.html < 27) add(issues, "P0", `仅 ${common.html} 个 HTML；标准档完整框架至少需要首页、索引、12 文章、5 工具与 7 合规页`);
    if (common.articleCandidates < 12) add(issues, "P0", `文章槽位不足：识别到 ${common.articleCandidates}，要求至少 12`);
    if (common.toolCandidates < 5) add(issues, "P0", `工具页不足：识别到 ${common.toolCandidates}，要求至少 5`);
    if (!common.feed) add(issues, "P1", "缺 feed.xml");
    if (!common.favicon) add(issues, "P1", "缺 favicon");
    if (!common.apple) add(issues, "P1", "缺 apple-touch-icon.png");
    if (!common.security) add(issues, "P1", "缺 .well-known/security.txt");
    if (!common.ogImagePages) add(issues, "P1", "所有页面均缺 og:image");
    if (common.twitterPages < common.html) add(issues, "P1", `Twitter Card 覆盖 ${common.twitterPages}/${common.html}`);
    if (common.gaPages < common.html) add(issues, "P1", `GA4 注释占位覆盖 ${common.gaPages}/${common.html}`);
    const home = htmlByPath.get("index.html") || "";
    if (!/(INVITE|REFERRAL|邀请码|识别码|SESSION_CODE|ACCESS_CODE)/i.test(home)) add(issues, "P0", "首页未识别到邀请码明文槽位");
    if (!/(copy|复制)/i.test(home)) add(issues, "P0", "首页未识别到复制控件");
    if (!/(20%|BENEFIT|减免|优惠)/i.test(home)) add(issues, "P0", "首页未识别到弹性利益点与脚注槽位");
    return { name, issues, common, ready: false };
  }

  if (manifest.__parseError) {
    add(issues, "P0", `workflow-ready-v2 JSON 无法解析：${manifest.__parseError}`);
    return { name, issues, common, ready: false };
  }
  if (manifest.version !== 2) add(issues, "P0", "角色表 version 必须为 2");
  if (!Array.isArray(manifest.articles) || manifest.articles.length < 12) add(issues, "P0", "角色表 articles 必须至少 12 项");
  if (!Array.isArray(manifest.cornerstones) || manifest.cornerstones.length < 2) add(issues, "P0", "角色表 cornerstones 必须至少 2 项");
  if (!Array.isArray(manifest.tools) || manifest.tools.length < 5) add(issues, "P0", "角色表 tools 必须至少 5 项");
  for (const key of LEGAL_KEYS) if (!manifest.legal || !manifest.legal[key]) add(issues, "P0", `角色表缺 legal.${key}`);

  const roles = [manifest.home, manifest.articleIndex, ...(manifest.articles || []), manifest.toolIndex, ...(manifest.tools || []), ...LEGAL_KEYS.map((key) => manifest.legal && manifest.legal[key]), manifest.error404, manifest.robots, manifest.sitemap, manifest.feed, manifest.security, manifest.favicon, manifest.appleTouchIcon, manifest.socialImage].filter(Boolean);
  for (const item of roles) {
    if (item !== item.toLowerCase() || !/^[\x20-\x7e]+$/.test(item)) add(issues, "P0", `角色路径必须为小写 ASCII：${item}`);
    const file = path.join(dir, item);
    if (!fs.existsSync(file)) add(issues, "P0", `角色文件不存在：${item}`);
    else if (fs.lstatSync(file).isSymbolicLink() || !fs.statSync(file).isFile() || fs.statSync(file).size === 0) add(issues, "P0", `角色文件必须是非空普通文件：${item}`);
  }

  const articleSet = new Set(manifest.articles || []);
  for (const item of manifest.cornerstones || []) if (!articleSet.has(item)) add(issues, "P0", `cornerstone 未列入 articles：${item}`);
  if (!articleSet.has(manifest.registrationGuide)) add(issues, "P0", "registrationGuide 必须列入 articles");
  if (new Set(roles).size !== roles.length) add(issues, "P0", "角色表有重复路径");

  const indexable = [manifest.home, manifest.articleIndex, ...(manifest.articles || []), manifest.toolIndex, ...(manifest.tools || []), ...LEGAL_KEYS.map((key) => manifest.legal && manifest.legal[key])].filter(Boolean);
  const socialPath = manifest.socialImage && path.join(dir, manifest.socialImage);
  const size = socialPath ? pngSize(socialPath) : null;
  if (!size || size.width !== 1200 || size.height !== 630) add(issues, "P1", "socialImage 必须是真实 1200×630 PNG");

  for (const page of indexable) {
    const html = htmlByPath.get(page);
    if (!html) continue;
    const prefix = `${page}: `;
    const h1 = (html.match(/<h1\b/gi) || []).length;
    if (h1 !== 1) add(issues, "P0", prefix + `必须恰有 1 个 h1，当前 ${h1}`);
    if (!/<meta\b[^>]*name=["']description["'][^>]*content=["'][^"']+["']/i.test(html)) add(issues, "P1", prefix + "缺非空 description");
    if (!/<link\b[^>]*rel=["']canonical["'][^>]*href=["']https:\/\//i.test(html)) add(issues, "P0", prefix + "缺 HTTPS canonical");
    for (const property of ["og:title", "og:description", "og:type", "og:url", "og:image"]) if (!new RegExp(`property=["']${property}["']`, "i").test(html)) add(issues, "P1", prefix + `缺 ${property}`);
    for (const card of ["twitter:card", "twitter:title", "twitter:description", "twitter:image"]) if (!new RegExp(`name=["']${card}["']`, "i").test(html)) add(issues, "P1", prefix + `缺 ${card}`);
    if (!/type=["']application\/ld\+json["']/i.test(html)) add(issues, "P1", prefix + "缺结构化数据槽位");
    if (!/name=["']viewport["'][^>]*viewport-fit=cover/i.test(html)) add(issues, "P1", prefix + "viewport 缺 viewport-fit=cover");
    if (!html.includes(GA_BLOCK)) add(issues, "P1", prefix + "缺标准 GA4 注释占位");
    if (/<script\b(?![^>]*\bdefer\b)(?![^>]*type=["']application\/ld\+json)/i.test(html.replace(GA_BLOCK, ""))) add(issues, "P0", prefix + "存在非 defer 页面脚本");
  }

  const errorHtml = htmlByPath.get(manifest.error404) || "";
  if (!/name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(errorHtml)) add(issues, "P0", "404 缺 noindex");

  const home = htmlByPath.get(manifest.home) || "";
  const vars = manifest.variables || {};
  for (const key of ["siteDomain", "siteName", "wordmark", "inviteCode", "benefitRate", "benefitDisclaimer", "affiliateUrl"]) if (!vars[key]) add(issues, "P0", `角色表缺 variables.${key}`);
  for (const key of ["inviteCode", "benefitRate", "benefitDisclaimer"]) if (vars[key] && !home.includes(vars[key])) add(issues, "P0", `首页缺变量 ${key}`);
  if (!/(data-[^=]*copy|复制)/i.test(home)) add(issues, "P0", "首页缺复制控件");
  if (/href=["']https?:\/\/[^"']*(?:join|register|referral|download)/i.test(home)) add(issues, "P0", "默认形态 A 首页不得含交易所转化直链");

  const registration = htmlByPath.get(manifest.registrationGuide) || "";
  if (vars.affiliateUrl) {
    const tags = [...registration.matchAll(/<a\b[^>]*>/gi)].map((match) => match[0]).filter((tag) => attr(tag, "href") === vars.affiliateUrl);
    if (tags.length !== 1) add(issues, "P0", `注册教程必须恰有 1 个 affiliateUrl 链接槽位，当前 ${tags.length}`);
    else {
      const rel = new Set(attr(tags[0], "rel").split(/\s+/));
      for (const token of ["sponsored", "nofollow", "noopener", "noreferrer"]) if (!rel.has(token)) add(issues, "P0", `注册教程链接缺 rel=${token}`);
      if (attr(tags[0], "target") !== "_blank") add(issues, "P0", "注册教程链接缺 target=_blank");
    }
  }
  if (vars.inviteCode && !registration.includes(vars.inviteCode)) add(issues, "P0", "注册教程缺邀请码变量");
  if (!/(推广链接|推荐链接|affiliate disclosure|sponsored link)/i.test(stripMarkup(registration))) add(issues, "P1", "注册教程缺可见的紧邻推广披露槽位");

  for (const tool of manifest.tools || []) {
    const html = htmlByPath.get(tool) || "";
    if (!/<form\b/i.test(html)) add(issues, "P0", `${tool}: 缺真实表单界面`);
    if (!/<details\b/i.test(html)) add(issues, "P1", `${tool}: 缺默认折叠 Guide`);
    if ((html.match(/<h3\b/gi) || []).length < 5) add(issues, "P1", `${tool}: Guide 的 h3 少于 5 个`);
    if (!/<script\b[^>]*src=/i.test(html)) add(issues, "P0", `${tool}: 缺独立工具脚本引用`);
  }

  const publicHtml = [...htmlByPath.entries()];
  for (const [page, html] of publicHtml) {
    if (/href\s*=\s*["']\s*#["']/i.test(html)) add(issues, "P0", `${page}: 存在 href=# 死链接`);
    if (/http-equiv\s*=\s*["']refresh/i.test(html)) add(issues, "P0", `${page}: 存在 meta refresh`);
    if (/\bon[a-z]+\s*=/i.test(html) || /javascript:/i.test(html)) add(issues, "P0", `${page}: 存在内联事件或 javascript: URL`);
    if (/(站群|内容农场|批量生成|矩阵站)/.test(stripMarkup(html))) add(issues, "P0", `${page}: 可见内容含运营自指词`);
    for (const image of html.match(/<img\b[^>]*>/gi) || []) {
      if (!attr(image, "src") || !attr(image, "alt") || !attr(image, "width") || !attr(image, "height")) add(issues, "P1", `${page}: img 缺 src/alt/width/height`);
    }
  }
  for (const file of files.filter((item) => item.endsWith(".js"))) {
    const js = text(file);
    if (/location\.replace\s*\(/.test(js)) add(issues, "P0", `${relative(dir, file)}: 禁止 location.replace`);
    if (/innerHTML|outerHTML|insertAdjacentHTML|document\.write|\beval\s*\(|new Function/.test(js)) add(issues, "P0", `${relative(dir, file)}: 存在危险 HTML/代码注入 API`);
    const check = spawnSync(process.execPath, ["--check", file], { encoding: "utf8" });
    if (check.status !== 0) add(issues, "P0", `${relative(dir, file)}: JS 语法失败`);
  }

  const incoming = new Map(indexable.map((page) => [page, 0]));
  for (const [from, html] of publicHtml) for (const href of linksIn(html)) {
    const target = normalizedTarget(from, href);
    if (target && incoming.has(target)) incoming.set(target, incoming.get(target) + 1);
  }
  for (const [page, count] of incoming) if (page !== manifest.home && count < 3) add(issues, count === 0 ? "P0" : "P1", `${page}: 站内入链 ${count}，要求至少 3`);
  const homeTargets = new Set(linksIn(home).map((href) => normalizedTarget(manifest.home, href)).filter(Boolean));
  for (const page of indexable) if (page !== manifest.home && !homeTargets.has(page)) add(issues, "P1", `首页宽内链未覆盖 ${page}`);

  if (manifest.sitemap && fs.existsSync(path.join(dir, manifest.sitemap))) {
    const sitemap = text(path.join(dir, manifest.sitemap));
    if (!/<urlset\b[^>]*xmlns=["']http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9["']/i.test(sitemap)) add(issues, "P0", "sitemap namespace 错误");
    const xmllint = spawnSync("xmllint", ["--noout", path.join(dir, manifest.sitemap)], { encoding: "utf8" });
    if (xmllint.error && xmllint.error.code === "ENOENT") add(issues, "P2", "未找到 xmllint，需用等效 XML 检查补证");
    else if (xmllint.status !== 0) add(issues, "P0", "sitemap XML 不良构");
  }
  if (manifest.feed && fs.existsSync(path.join(dir, manifest.feed))) {
    const feed = text(path.join(dir, manifest.feed));
    const xmllint = spawnSync("xmllint", ["--noout", path.join(dir, manifest.feed)], { encoding: "utf8" });
    if (!/<rss\b[^>]*version=["']2\.0["']/i.test(feed)) add(issues, "P1", "feed 必须为 RSS 2.0");
    if (xmllint.status !== 0 && !(xmllint.error && xmllint.error.code === "ENOENT")) add(issues, "P0", "feed XML 不良构");
    if ((vars.inviteCode && feed.includes(vars.inviteCode)) || (vars.affiliateUrl && feed.includes(vars.affiliateUrl))) add(issues, "P0", "feed 不得含邀请码或注册链接变量");
  }
  if (manifest.robots && fs.existsSync(path.join(dir, manifest.robots))) {
    const robots = text(path.join(dir, manifest.robots));
    if ((robots.match(/^Sitemap:/gmi) || []).length < 2) add(issues, "P1", "robots 必须声明 sitemap 与 feed");
  }

  const deduped = [...new Map(issues.map((issue) => [`${issue.severity}\u0000${issue.message}`, issue])).values()];
  return { name, issues: deduped, common, ready: deduped.every((issue) => issue.severity === "P2") };
}

function main() {
  const args = process.argv.slice(2);
  const verbose = args.includes("--verbose");
  const dirs = targets(args.filter((item) => item !== "--verbose"));
  let failed = 0;
  let totalP0 = 0;
  let totalP1 = 0;
  let totalP2 = 0;
  for (const dir of dirs) {
    const result = audit(dir);
    const counts = { P0: 0, P1: 0, P2: 0 };
    result.issues.forEach((issue) => counts[issue.severity]++);
    totalP0 += counts.P0; totalP1 += counts.P1; totalP2 += counts.P2;
    if (counts.P0 || counts.P1) failed++;
    const mark = counts.P0 || counts.P1 ? "✗" : "✓";
    console.log(`${mark} ${result.name}  P0=${counts.P0} P1=${counts.P1} P2=${counts.P2}`);
    if (dirs.length <= 3 || verbose) for (const issue of result.issues) console.log(`    ${issue.severity} ${issue.message}`);
  }
  console.log(`\n汇总：模板 ${dirs.length}，未就绪 ${failed}，P0=${totalP0}，P1=${totalP1}，P2=${totalP2}`);
  process.exit(failed ? 1 : 0);
}

main();
