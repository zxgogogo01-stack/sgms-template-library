// 同源检测：类名重合度 / DOM 骨架相似度 / CSS 属性顺序相似度
// 用法：
//   node tools/check-similarity.js                                # 检测 templates/ 下全部模板
//   node tools/check-similarity.js templates/001-x templates/002-y  # 只测指定模板
//
// 判定规则（来自任务规格）：
//   任意两个模板的类名重合度（交集 / 较小集合）> 15% 即违规，需要重做其一。
//   DOM 骨架相似度、CSS 属性顺序相似度为参考指标，过高会给出警告。
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CLASS_LIMIT = 0.15;
const SKELETON_WARN = 0.55;
const CSSORDER_WARN = 0.45;

function listTargets(argv) {
  if (argv.length) {
    return argv.map((a) => path.resolve(ROOT, a));
  }
  const base = path.join(ROOT, "templates");
  if (!fs.existsSync(base)) return [];
  return fs
    .readdirSync(base)
    .map((d) => path.join(base, d))
    .filter((p) => {
      try {
        return fs.statSync(p).isDirectory();
      } catch {
        return false;
      }
    });
}

function walk(dir) {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

function readIf(p) {
  try {
    return fs.readFileSync(p, "utf8");
  } catch {
    return "";
  }
}

function collectSources(tpl) {
  const files = walk(tpl);
  const html = files.filter((f) => f.endsWith(".html")).map(readIf);
  const css = files.filter((f) => f.endsWith(".css")).map(readIf);
  for (const h of html) {
    const blocks = h.match(/<style[^>]*>[\s\S]*?<\/style>/gi) || [];
    for (const b of blocks) css.push(b.replace(/<\/?style[^>]*>/gi, ""));
  }
  return { html, css };
}

function classSet(tpl) {
  const { html, css } = collectSources(tpl);
  const set = new Set();
  for (const h of html) {
    const re = /class\s*=\s*("([^"]*)"|'([^']*)')/gi;
    let m;
    while ((m = re.exec(h))) {
      const v = m[2] !== undefined ? m[2] : m[3];
      for (const c of v.split(/\s+/)) if (c) set.add(c);
    }
  }
  for (const text of css) {
    const re = /\.(-?[a-zA-Z_][a-zA-Z0-9_-]*)/g;
    let m;
    while ((m = re.exec(text))) set.add(m[1]);
  }
  return set;
}

function tagSeq(tpl) {
  let h = readIf(path.join(tpl, "index.html"));
  h = h.replace(/<!--[\s\S]*?-->/g, "");
  const body = h.match(/<body[\s\S]*<\/body>/i);
  if (body) h = body[0];
  const seq = [];
  const re = /<([a-z][a-z0-9-]*)/gi;
  let m;
  while ((m = re.exec(h))) seq.push(m[1].toLowerCase());
  return seq;
}

function bigramSet(seq) {
  const s = new Set();
  for (let i = 0; i < seq.length - 1; i++) s.add(seq[i] + ">" + seq[i + 1]);
  return s;
}

function cssPropPairs(tpl) {
  const { css } = collectSources(tpl);
  const pairs = new Set();
  for (const text of css) {
    const blocks = text.match(/\{[^{}]*\}/g) || [];
    for (const b of blocks) {
      const props = b
        .slice(1, -1)
        .split(";")
        .map((s) => s.split(":")[0].trim())
        .filter((s) => /^[a-z][a-z-]*$/.test(s));
      for (let i = 0; i < props.length - 1; i++) {
        pairs.add(props[i] + ">" + props[i + 1]);
      }
    }
  }
  return pairs;
}

function intersectCount(a, b) {
  let n = 0;
  for (const x of a) if (b.has(x)) n++;
  return n;
}

function jaccard(a, b) {
  if (!a.size && !b.size) return 0;
  const inter = intersectCount(a, b);
  return inter / (a.size + b.size - inter);
}

function overlapMin(a, b) {
  if (!a.size || !b.size) return 0;
  return intersectCount(a, b) / Math.min(a.size, b.size);
}

function pct(x) {
  return (x * 100).toFixed(1).padStart(5) + "%";
}

function shortName(p) {
  return path.basename(p);
}

function printMatrix(title, names, get) {
  console.log("\n## " + title);
  const ids = names.map((n) => n.slice(0, 3));
  console.log("      " + ids.map((s) => s.padStart(7)).join(""));
  for (let i = 0; i < names.length; i++) {
    let row = ids[i].padStart(5) + " ";
    for (let j = 0; j < names.length; j++) {
      row += j === i ? "      -" : pct(get(i, j)).padStart(7);
    }
    console.log(row);
  }
}

function main() {
  const targets = listTargets(process.argv.slice(2));
  if (targets.length < 2) {
    console.log("需要至少 2 个模板目录（当前 " + targets.length + " 个）。");
    process.exit(targets.length === 0 ? 0 : 0);
  }
  const names = targets.map(shortName);
  const cls = targets.map(classSet);
  const skel = targets.map((t) => bigramSet(tagSeq(t)));
  const order = targets.map(cssPropPairs);

  console.log("检测对象 " + targets.length + " 个模板：");
  for (let i = 0; i < names.length; i++) {
    console.log(
      "  " +
        names[i] +
        "  类名 " +
        cls[i].size +
        " 个，骨架二元组 " +
        skel[i].size +
        "，属性顺序对 " +
        order[i].size
    );
  }

  const n = targets.length;
  const classM = [];
  const skelM = [];
  const orderM = [];
  for (let i = 0; i < n; i++) {
    classM.push([]);
    skelM.push([]);
    orderM.push([]);
    for (let j = 0; j < n; j++) {
      classM[i][j] = i === j ? 0 : overlapMin(cls[i], cls[j]);
      skelM[i][j] = i === j ? 0 : jaccard(skel[i], skel[j]);
      orderM[i][j] = i === j ? 0 : jaccard(order[i], order[j]);
    }
  }

  if (n <= 12) {
    printMatrix("类名重合度（交集/较小集）", names, (i, j) => classM[i][j]);
    printMatrix("DOM 骨架相似度（标签二元组 Jaccard）", names, (i, j) => skelM[i][j]);
    printMatrix("CSS 属性顺序相似度（相邻属性对 Jaccard）", names, (i, j) => orderM[i][j]);
  }

  const bad = [];
  const warns = [];
  let maxClass = [0, "-"];
  let maxSkel = [0, "-"];
  let maxOrder = [0, "-"];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const pair = names[i] + " × " + names[j];
      if (classM[i][j] > maxClass[0]) maxClass = [classM[i][j], pair];
      if (skelM[i][j] > maxSkel[0]) maxSkel = [skelM[i][j], pair];
      if (orderM[i][j] > maxOrder[0]) maxOrder = [orderM[i][j], pair];
      if (classM[i][j] > CLASS_LIMIT) {
        bad.push(pair + "  类名重合 " + pct(classM[i][j]).trim());
      }
      if (skelM[i][j] > SKELETON_WARN) {
        warns.push(pair + "  骨架相似 " + pct(skelM[i][j]).trim());
      }
      if (orderM[i][j] > CSSORDER_WARN) {
        warns.push(pair + "  属性顺序相似 " + pct(orderM[i][j]).trim());
      }
    }
  }

  console.log("\n## 汇总");
  console.log("类名重合最高: " + pct(maxClass[0]).trim() + "  (" + maxClass[1] + ")");
  console.log("骨架相似最高: " + pct(maxSkel[0]).trim() + "  (" + maxSkel[1] + ")");
  console.log("属性顺序相似最高: " + pct(maxOrder[0]).trim() + "  (" + maxOrder[1] + ")");

  if (warns.length) {
    console.log("\n⚠ 警告（参考指标偏高）:");
    for (const w of warns) console.log("  " + w);
  }
  if (bad.length) {
    console.log("\n✗ 违规（类名重合 > 15%，必须重做其一）:");
    for (const b of bad) console.log("  " + b);
    process.exit(1);
  } else {
    console.log("\n✓ 类名重合度全部 ≤ 15%");
  }
}

main();
