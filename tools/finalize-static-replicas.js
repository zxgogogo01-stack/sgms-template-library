// One-time cleanup for the source-replica batch.
// Removes inert source-branch storage and replaces visible draft copy with
// complete, reusable static content. The script is intentionally scoped to
// templates 051-124 and is safe to run repeatedly.
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const TEMPLATE_ROOT = path.join(ROOT, "templates");

function numberOf(name) {
  const match = name.match(/^(\d{3})-/);
  return match ? Number(match[1]) : 0;
}

function writeIfChanged(file, before, after) {
  if (before === after) return false;
  fs.writeFileSync(file, after, "utf8");
  return true;
}

function finishCopy(html) {
  const replacements = [
    [/（占位）/g, ""],
    [/占位——一句话讲清这次调整对返佣的净影响，细节在下文两节。/g,
      "这次调整会先改变手续费基数，再按账户对应比例影响最终到账；下文把生效范围与核对方法拆开说明。"],
    [/占位——一句话讲清净影响，两节内讲完细节。/g,
      "费率档位变化会沿着手续费基数传导到返佣金额；核对时应同时确认产品线、账户档位与生效时间。"],
    [/占位——一句话讲清净影响，下面两节讲细节。/g,
      "费率档位变化会沿着手续费基数传导到返佣金额；核对时应同时确认产品线、账户档位与生效时间。"],
    [/占位——先给结论，返佣来自你交易产生的手续费分成，不是平台白送。/g,
      "返佣来自交易手续费按规则分配后的份额，不是额外收益；最终金额取决于实际成交、费率与结算口径。"],
    [/答案占位——先给可被直接引用的结论，例外情况在下文第二节展开。/g,
      "返佣按毛手续费还是净手续费计算，取决于平台对计佣基数的定义；应先核对分母，再比较比例。"],
    [/提醒占位：比例高不等于到手多，先看分母再看百分号。/g,
      "比例高不一定代表到账更多：先确认计佣基数、可计入产品与结算周期，再比较百分比。"],
    [/开篇占位。结论前置：一句话给出本文最有用的判断，后文展开依据。我们把三家平台的公开费率页各走了一遍，把容易看岔的口径差异整理成一张表。/g,
      "比较现货手续费时，先统一挂单与吃单口径，再确认成交量档位的统计周期。下面按同一套字段整理，避免只看单个百分比。"],
    [/正文占位。把「毛手续费」「净手续费」各用一句话定义清楚，再说明差异出现在哪个环节。/g,
      "毛手续费是优惠或抵扣前的原始费用，净手续费是扣除适用优惠后的实际费用。两者差异会直接改变返佣计算的基数。"],
    [/正文占位。调整范围、生效时间（含时区）、公告出处[。；]事实句(?:写短、方便被单独引用|短、可独立引用)。/g,
      "先记录调整覆盖的产品、账户层级和生效时间，并把时区统一到自己的账单时区；随后保存规则页版本，便于到账后逐项复核。"],
    [/正文占位。调整范围、生效时间（含时区）、公告出处[，；]事实句写短，方便被单独引用。/g,
      "先记录调整覆盖的产品、账户层级和生效时间，并把时区统一到自己的账单时区；随后保存规则页版本，便于到账后逐项复核。"],
    [/正文占位。手续费基数变化如何传导到返佣金额，用一笔演示交易算给读者看（数字为演示）。/g,
      "计算顺序是成交额乘手续费率得到手续费，再乘可返比例得到预计返佣。若存在抵扣、上限或排除产品，应先从计佣基数中剔除。"],
    [/正文占位。手续费基数如何传导到返佣金额，配一笔演示算例（数字为演示）。/g,
      "计算顺序是成交额乘手续费率得到手续费，再乘可返比例得到预计返佣。若存在抵扣、上限或排除产品，应先从计佣基数中剔除。"],
    [/正文占位。给判断框架不给指令，风险提示收尾。/g,
      "判断时不要只看返佣比例，还要核对费率、产品范围、结算门槛与到账周期。规则可能调整，正式决策应以账户页面的最新显示为准。"],
    [/正文占位。挂单与吃单的差别、30 日成交量的滚动口径、档位评估时点——每个概念先给一句话定义，再给一个演示例子。/g,
      "挂单通常指订单先进入订单簿，吃单则立即与已有订单成交；30 日成交量多按滚动窗口统计，档位可能在每日或固定时点评估。"],
    [/正文占位。涉及数字一律写区间并注明「以平台页面实时显示为准」，附核对日期。/g,
      "页面中的数字用于演示读表方法。实际费率、门槛与返佣比例应记录核对日期，并以账户页面实时显示为准。"],
    [/正文占位。涉及数字写区间并注明「以平台页面实时显示为准」。/g,
      "涉及费率和门槛时应注明核对日期；规则调整后，以账户页面实时显示为准。"],
    [/正文占位。逐步说明：成交 → 手续费 → 平台记账 → 按邀请关系分成 → 结算入账。每步给一句人话解释。/g,
      "一笔成交先产生手续费，平台按产品与账户规则确认可计佣部分，再依据有效邀请关系计算分成，达到结算条件后进入账单。"],
    [/正文占位。逐家说明：计佣基数（净手续费还是毛手续费）、结算周期、最小起付额。每个事实句带出处与核对日期。/g,
      "逐个平台核对计佣基数、结算周期与最低结算条件，并记录规则页与核对日期；字段没有对齐前，不直接比较比例。"],
    [/正文占位。给两三个典型场景的读表方法，不下绝对结论。/g,
      "低频交易先看最低结算条件，高频交易再看费率档位与统计窗口；涉及抵扣时，还要确认抵扣前后哪一个金额进入计佣。"],
    [/正文占位。以问答短节收尾，每个小问先给直接答案。/g,
      "遇到账单差异时，先核对成交是否属于可计佣产品，再检查邀请关系、生效时间和结算状态；仍不一致时保留账单编号并联系平台核查。"],
    [/正文占位。返佣依赖真实交易，不是无风险收益；比例与规则随平台调整，以官方页面为准。/g,
      "返佣只会降低部分已发生的交易成本，不构成收益保证。比例、范围和结算条件都可能调整，应以平台官方规则与账户页面为准。"],
    [/回答占位：先给直接答案，再补充例外情况。/g,
      "先按账户页面显示的计佣基数判断；若使用手续费抵扣或特殊产品，再检查对应例外条款。"],
    [/回答占位：直接答案前置。/g,
      "到账时间取决于结算周期与最低结算条件，未达到门槛的金额通常会顺延。"],
    [/表内(?:数字)?为版式占位，建站时替换为逐项核实的数据。/g,
      "表内用于演示核对方法；正式使用时请以账户页面和平台最新规则为准。"],
    [/清单为演示占位，建站时替换为真实文章链接。/g,
      "清单展示通用核对顺序，部署时可替换为站内对应的深度文章。"],
    [/摘要占位——一句话讲清净影响，点进正文看演示算例与对照表。/g,
      "先确认费率基数与生效时间，再用同一笔成交对照调整前后的预计到账。"],
    [/摘要占位——一句话讲清净影响，进记录看演示算例与对照表。/g,
      "记录费率基数、生效时间与结算状态，到账后即可按同一字段复核。"],
    [/摘要占位——一句话讲清净影响，进节目稿看演示算例与对照表。/g,
      "用一笔演示成交拆解费率变化如何传导到预计返佣与净成本。"],
    [/摘要占位——一句话讲清净影响，进文可看演示算例与逐项对照表。每条注明口径核对时间。/g,
      "按产品线、费率档位与结算周期逐项核对，并为每条规则记录更新时间。"],
    [/摘要占位——一句话讲清净影响，进文可看演示算例与逐项对照表。/g,
      "先统一费率基数与生效时间，再用演示算例逐项核对预计到账。"],
    [/摘要占位——一句话讲清净影响，进文可看演示算例与对照表。/g,
      "先统一费率基数与生效时间，再用演示算例逐项核对预计到账。"],
    [/摘要占位——一句话讲清净影响，进文可看演示算例。/g,
      "费率变化会先影响手续费，再按计佣比例传导到预计返佣。"],
    [/摘要占位——一句话讲清净影响，进文看演示算例。/g,
      "费率变化会先影响手续费，再按计佣比例传导到预计返佣。"],
    [/摘要占位——一句话讲清净影响。头条只放当期最要紧的一件事，其余进分栏正文；每条注明来源与口径核对时间。/g,
      "本期先核对费率档位变化对手续费基数的影响，其余更新按栏目展开，并为每条规则保留来源与核对时间。"],
    [/摘要占位——一句话讲清净影响，开卷可看演示算例与对照表。/g,
      "用同一笔成交对照调整前后的手续费与预计返佣，差异会更清楚。"],
    [/摘要占位——进正文可看演示算例与逐项对照表。/g,
      "正文用统一字段和演示算例拆解手续费、计佣比例与到账周期。"],
    [/摘要占位——一句话讲清净影响：谁受影响、从什么时候起、大概差多少。进正文可看演示算例与逐项对照表。/g,
      "这次调整影响对应产品与费率档位；从生效时间起，可用同一笔成交逐项对照手续费与预计返佣。"],
    [/>占位</g, ">以账户页为准<"],
  ];
  let output = html;
  for (const [pattern, replacement] of replacements) output = output.replace(pattern, replacement);
  return output;
}

function main() {
  const changed = [];
  for (const entry of fs.readdirSync(TEMPLATE_ROOT, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const number = numberOf(entry.name);
    if (number < 51 || number > 124) continue;
    const dir = path.join(TEMPLATE_ROOT, entry.name);
    const indexFile = path.join(dir, "index.html");
    const templateFile = path.join(dir, "TEMPLATE.md");

    if (fs.existsSync(indexFile)) {
      const before = fs.readFileSync(indexFile, "utf8");
      const ids = [...before.matchAll(/<template\b[^>]*\bid=["']([^"']+)["']/gi)]
        .map((match) => match[1]);
      const after = finishCopy(before).replace(/\s*<template\b[^>]*>[\s\S]*?<\/template>\s*/gi, "\n");
      if (writeIfChanged(indexFile, before, after)) changed.push(path.relative(ROOT, indexFile));

      if (ids.length && fs.existsSync(templateFile)) {
        const docsBefore = fs.readFileSync(templateFile, "utf8");
        const docsAfter = docsBefore
          .split(/\r?\n/)
          .filter((line) => !line.includes("<template") && !ids.some((id) => line.includes(id)))
          .join("\n");
        if (writeIfChanged(templateFile, docsBefore, docsAfter)) changed.push(path.relative(ROOT, templateFile));
      }
    }

    if (number <= 85) {
      for (const name of fs.readdirSync(dir)) {
        if (!name.toLowerCase().endsWith(".html")) continue;
        const file = path.join(dir, name);
        const before = fs.readFileSync(file, "utf8");
        const after = finishCopy(before);
        if (writeIfChanged(file, before, after)) changed.push(path.relative(ROOT, file));
      }
    }
  }
  console.log("Finalized " + changed.length + " files");
  for (const file of changed) console.log("  " + file);
}

main();
