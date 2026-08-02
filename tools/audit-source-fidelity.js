// Compare the static replicas with the original 军哥 home partials.
// Usage:
//   node tools/audit-source-fidelity.js
//   node tools/audit-source-fidelity.js 051 086
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const TEMPLATE_ROOT = path.join(ROOT, "templates");
const PLAN = path.join(ROOT, "batches", "replication-plan.md");
const SOURCE_ROOT =
  process.env.JUNGE_TEMPLATE_ROOT ||
  "C:\\Users\\Admin\\Desktop\\军哥模版库\\partials";

const REQUIRED_FILES = [
  "index.html",
  "article.html",
  "tool.html",
  "legal.html",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "TEMPLATE.md",
];

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function activeHtml(html) {
  // Content inside <template> is inert and must never be allowed to satisfy
  // source-fidelity checks. Earlier replicas parked unused source branches in
  // hidden templates, which made class-count audits pass without rendering the
  // original structure.
  return html.replace(/<template\b[^>]*>[\s\S]*?<\/template>/gi, "");
}

function expandSourceTemplate(html) {
  const definitions = new Map();
  const stack = [];
  const directiveRe = /\{\{\s*(define\s+"([^"]+)"|if\b[^}]*|with\b[^}]*|range\b[^}]*|block\b[^}]*|end)\s*\}\}/g;
  let match;
  while ((match = directiveRe.exec(html))) {
    const directive = match[1];
    if (directive.startsWith("define")) {
      stack.push({ type: "define", name: match[2], start: directiveRe.lastIndex });
    } else if (/^(if|with|range|block)\b/.test(directive)) {
      stack.push({ type: "block" });
    } else if (directive === "end" && stack.length) {
      const opened = stack.pop();
      if (opened.type === "define") {
        definitions.set(opened.name, html.slice(opened.start, match.index));
      }
    }
  }

  const homeName = [...definitions.keys()].find((name) => name.startsWith("home_"));
  let expanded = homeName ? definitions.get(homeName) : html;
  const templateCall = /\{\{\s*template\s+"([^"]+)"[^}]*\}\}/g;
  for (let pass = 0; pass < 20; pass += 1) {
    let changed = false;
    expanded = expanded.replace(templateCall, (whole, name) => {
      if (!definitions.has(name)) return whole;
      changed = true;
      return definitions.get(name);
    });
    if (!changed) break;
  }
  return expanded;
}

function parsePlan() {
  const rows = [];
  for (const line of read(PLAN).split(/\r?\n/)) {
    const match = line.match(
      /^\|\s*(\d{3})\s*\|\s*(home_[a-z0-9_]+)\s*\|/
    );
    if (match) rows.push({ number: match[1], source: match[2] });
  }
  return rows;
}

function findOutput(number) {
  if (!fs.existsSync(TEMPLATE_ROOT)) return null;
  const prefix = number + "-";
  const matches = fs
    .readdirSync(TEMPLATE_ROOT)
    .filter((name) => name.startsWith(prefix))
    .sort();
  if (!matches.length) return null;
  return path.join(TEMPLATE_ROOT, matches[0]);
}

function classSet(html) {
  const result = new Set();
  const classRe = /class\s*=\s*["']([^"']+)["']/g;
  let match;
  while ((match = classRe.exec(html))) {
    for (const token of classTokens(match[1])) result.add(token);
  }
  return result;
}

function classTokens(value) {
  const cleaned = value.replace(/\{\{[\s\S]*?\}\}/g, " ");
  return (cleaned.match(/[a-z][a-z0-9_-]*/gi) || []).filter((token) => {
    const conditionalModifier =
      token === "no-cover" ||
      token === "has-cover" ||
      token.startsWith("no-") ||
      token.startsWith("has-") ||
      token.endsWith("-solo") ||
      token.startsWith("is-") ||
      token.endsWith("-");
    return token.includes("-") && !conditionalModifier;
  });
}

function classCounts(html) {
  const counts = new Map();
  const classRe = /class\s*=\s*["']([^"']+)["']/g;
  let match;
  while ((match = classRe.exec(html))) {
    for (const token of classTokens(match[1])) {
      counts.set(token, (counts.get(token) || 0) + 1);
    }
  }
  return counts;
}

function optionalClassSet(html) {
  const optional = new Set();
  const stack = [];
  const tokenRe = /\{\{[\s\S]*?\}\}|<([a-z][a-z0-9-]*)\b[^>]*\bclass\s*=\s*["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = tokenRe.exec(html))) {
    const token = match[0];
    if (token.startsWith("{{")) {
      const directive = token.slice(2, -2).trim();
      if (/^(if|with)\b/.test(directive)) stack.push("optional");
      else if (/^(range|define|block)\b/.test(directive)) stack.push("required");
      else if (/^end\b/.test(directive) && stack.length) stack.pop();
      continue;
    }
    for (const inline of match[2].matchAll(/\{\{(?:if|with)\b[\s\S]*?\}\}([\s\S]*?)\{\{end\}\}/gi)) {
      for (const name of classTokens(inline[1])) optional.add(name);
    }
    if (stack.includes("optional")) {
      for (const name of classTokens(match[2])) optional.add(name);
    }
  }
  return optional;
}

function structureSequence(html, sourceClasses) {
  const sequence = [];
  const tagRe = /<([a-z][a-z0-9-]*)\b[^>]*\bclass\s*=\s*["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = tagRe.exec(html))) {
    const retained = classTokens(match[2]).filter((name) => sourceClasses.has(name));
    if (retained.length) sequence.push(retained[0]);
  }
  return sequence;
}

function lcsLength(left, right) {
  const row = new Array(right.length + 1).fill(0);
  for (let i = 1; i <= left.length; i += 1) {
    let diagonal = 0;
    for (let j = 1; j <= right.length; j += 1) {
      const previous = row[j];
      row[j] = left[i - 1] === right[j - 1]
        ? diagonal + 1
        : Math.max(row[j], row[j - 1]);
      diagonal = previous;
    }
  }
  return row[right.length];
}

function cssFiles(root) {
  const files = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const full = path.join(root, entry.name);
    if (entry.isDirectory()) files.push(...cssFiles(full));
    else if (entry.isFile() && entry.name.toLowerCase().endsWith(".css")) files.push(full);
  }
  return files;
}

function normalizeSelector(selector) {
  return selector
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\s*([>+~])\s*/g, "$1");
}

function cssRules(css) {
  const rules = new Map();
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const ruleRe = /([^{}]+)\{([^{}]*)\}/g;
  let match;
  while ((match = ruleRe.exec(clean))) {
    const properties = new Set();
    const propertyRe = /(?:^|;)\s*(--[a-z0-9_-]+|[a-z][a-z0-9-]*)\s*:/gi;
    let property;
    while ((property = propertyRe.exec(match[2]))) properties.add(property[1].toLowerCase());
    for (const rawSelector of match[1].split(",")) {
      const selector = normalizeSelector(rawSelector);
      if (!selector || selector.startsWith("@")) continue;
      if (!rules.has(selector)) rules.set(selector, new Set());
      for (const name of properties) rules.get(selector).add(name);
    }
  }
  return rules;
}

function classPattern(name) {
  return new RegExp("\\." + name.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&") + "(?![a-z0-9_-])", "i");
}

function percent(numerator, denominator) {
  return denominator ? Math.round((numerator / denominator) * 1000) / 10 : 100;
}

function intersection(left, right) {
  return [...left].filter((item) => right.has(item));
}

function listSourceLayouts() {
  return fs
    .readdirSync(SOURCE_ROOT)
    .filter((name) => /^home_[a-z0-9_]+\.html$/.test(name))
    .map((name) => path.basename(name, ".html"))
    .sort();
}

function main() {
  if (!fs.existsSync(SOURCE_ROOT)) {
    console.error("Source partial directory not found: " + SOURCE_ROOT);
    process.exit(2);
  }

  const lower = process.argv[2] || "051";
  const upper = process.argv[3] || "999";
  const plan = parsePlan();
  const sourceCss = read(path.join(SOURCE_ROOT, "style.css"));
  const sourceRuleMap = cssRules(sourceCss);
  const mapped = new Set(plan.map((row) => row.source));
  const missingMappings = listSourceLayouts().filter((name) => !mapped.has(name));

  if (missingMappings.length) {
    console.log("UNMAPPED SOURCE LAYOUTS");
    for (const name of missingMappings) console.log("  " + name);
    console.log("");
  }

  let failed = false;
  for (const row of plan) {
    if (row.number < lower || row.number > upper) continue;

    const sourceFile = path.join(SOURCE_ROOT, row.source + ".html");
    const outputDir = findOutput(row.number);
    if (!outputDir) {
      console.log("MISSING " + row.number + " <- " + row.source);
      failed = true;
      continue;
    }

    const indexFile = path.join(outputDir, "index.html");
    if (!fs.existsSync(indexFile)) {
      console.log("FAIL    " + path.basename(outputDir) + " missing index.html");
      failed = true;
      continue;
    }

    const sourceHtml = expandSourceTemplate(read(sourceFile));
    const sourceClasses = classSet(sourceHtml);
    const optionalClasses = optionalClassSet(sourceHtml);
    const requiredClasses = new Set(
      [...sourceClasses].filter((name) => !optionalClasses.has(name))
    );
    const outputHtml = activeHtml(read(indexFile));
    const outputClasses = classSet(outputHtml);
    const retained = intersection(sourceClasses, outputClasses);
    const retainedRequired = intersection(requiredClasses, outputClasses);
    const missing = [...sourceClasses].filter((name) => !outputClasses.has(name));
    const missingRequired = [...requiredClasses].filter((name) => !outputClasses.has(name));
    const retention = sourceClasses.size
      ? Math.round((retained.length / sourceClasses.size) * 1000) / 10
      : 100;
    const sourceCounts = classCounts(sourceHtml);
    const outputCounts = classCounts(outputHtml);
    let retainedOccurrences = 0;
    let sourceOccurrences = 0;
    for (const [name, count] of sourceCounts) {
      if (!requiredClasses.has(name)) continue;
      sourceOccurrences += count;
      retainedOccurrences += Math.min(count, outputCounts.get(name) || 0);
    }
    const occurrenceRetention = percent(retainedOccurrences, sourceOccurrences);

    const sourceStructure = structureSequence(sourceHtml, requiredClasses);
    const outputStructure = structureSequence(outputHtml, requiredClasses);
    const structureRetention = percent(
      lcsLength(sourceStructure, outputStructure),
      sourceStructure.length
    );

    const outputCss = cssFiles(outputDir).map(read).join("\n");
    const outputRuleMap = cssRules(outputCss);
    const styledClasses = [...sourceClasses].filter((name) => classPattern(name).test(sourceCss));
    const retainedStyledClasses = styledClasses.filter((name) => classPattern(name).test(outputCss));
    const cssClassRetention = percent(retainedStyledClasses.length, styledClasses.length);

    const relevantSourceRules = [...sourceRuleMap.entries()].filter(([selector]) =>
      styledClasses.some((name) => classPattern(name).test(selector))
    );
    const retainedSelectors = relevantSourceRules.filter(([selector]) => outputRuleMap.has(selector));
    const selectorRetention = percent(retainedSelectors.length, relevantSourceRules.length);
    let retainedProperties = 0;
    let sourceProperties = 0;
    for (const [selector, properties] of relevantSourceRules) {
      const outputProperties = outputRuleMap.get(selector) || new Set();
      sourceProperties += properties.size;
      retainedProperties += [...properties].filter((name) => outputProperties.has(name)).length;
    }
    const propertyRetention = percent(retainedProperties, sourceProperties);
    const missingFiles = REQUIRED_FILES.filter(
      (name) => !fs.existsSync(path.join(outputDir, name))
    );

    // A static render legitimately chooses one side of source conditionals
    // such as CoverImage/no-cover. Allow a small branch-only difference.
    const ok =
      retainedRequired.length === requiredClasses.size &&
      occurrenceRetention >= 95 &&
      structureRetention >= 90 &&
      cssClassRetention >= 95 &&
      selectorRetention >= 80 &&
      propertyRetention >= 85 &&
      missingFiles.length === 0;
    if (!ok) failed = true;
    console.log(
      (ok ? "PASS    " : "REFIT   ") +
        path.basename(outputDir) +
        " <- " +
        row.source +
        " | classes " +
        retained.length +
        "/" +
        sourceClasses.size +
        " (" +
        retention +
        "%)" +
        " | occurrences " + occurrenceRetention + "%" +
        " | structure " + structureRetention + "%" +
        " | CSS classes " + cssClassRetention + "%" +
        " | selectors " + selectorRetention + "%" +
        " | properties " + propertyRetention + "%" +
        (missingFiles.length ? " | missing files: " + missingFiles.join(", ") : "")
    );
    if (missingRequired.length) {
      console.log("        missing required classes: " + missingRequired.join(", "));
    }
    const missingOptional = missing.filter((name) => optionalClasses.has(name));
    if (missingOptional.length) {
      console.log("        omitted static branches: " + missingOptional.join(", "));
    }
  }

  process.exit(failed ? 1 : 0);
}

main();
