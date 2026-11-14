import fs from "node:fs";
import path from "node:path";

const registryPath = "src/data/fishing/consumption-advisories.json";
const consumptionUrl = "https://tpwd.texas.gov/regulations/outdoor-annual/fishing/general-rules-regulations/fish-consumption-bans-and-advisories";
const reportsUrl = "https://tpwd.texas.gov/fishboat/fish/recreational/fishreport.phtml";
const plan = process.argv.includes("--plan");
const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
const records = Object.entries(registry);
const errors = [];
const checkedAt = new Date().toISOString();
const checks = [];

if (records.length < 8) errors.push("Consumption advisory registry unexpectedly dropped below eight supported lake matches.");
for (const [slug, record] of records) {
  if (!/^[a-z0-9-]+$/.test(slug) || !record.name || !record.summary || record.summary.length < 35) {
    errors.push(`${slug}: invalid lake match or visitor-visible advisory summary`);
  }
  if (record.sourceUrl !== consumptionUrl || !record.sourceNeedle || !/^20\d\d-\d\d-\d\d$/.test(record.reviewedAt)) {
    errors.push(`${slug}: missing official-source matching or dated verification`);
  }
}

function readableText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&(?:nbsp|amp|quot|#39|rsquo);/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function getOfficialPage(url) {
  const response = await fetch(url, {
    headers: { "User-Agent": "TexasDefinedFishingPlannerSourceAudit/1.0 (+https://texasdefined.com/fishing/plan)" },
    redirect: "follow",
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return readableText((await response.text()).slice(0, 1_000_000));
}

if (!plan) {
  try {
    const text = await getOfficialPage(consumptionUrl);
    for (const [slug, record] of records) {
      const matched = text.toLowerCase().includes(record.sourceNeedle.toLowerCase());
      checks.push({ slug, sourceUrl: consumptionUrl, matched });
      if (!matched) errors.push(`${slug}: the TPWD advisory table no longer contains the reviewed waterbody reference; investigate before changing the warning`);
    }
  } catch (error) {
    errors.push(`Official fish consumption source could not be reviewed: ${String(error?.message ?? error)}`);
  }
  try {
    const text = await getOfficialPage(reportsUrl);
    const stillPaused = /weekly fishing reports are currently on hold/i.test(text);
    checks.push({ source: "TPWD weekly report status", sourceUrl: reportsUrl, stillPaused });
    if (!stillPaused) errors.push("TPWD report publication status may have changed; review planner text, freshness and report import before removing the hiatus notice.");
  } catch (error) {
    errors.push(`Official fishing report status could not be reviewed: ${String(error?.message ?? error)}`);
  }
}

const report = {
  checkedAt,
  plan,
  description: "First-party evidence review for the fishing planner; missing source text is a review-needed state, never proof that a fish-consumption advisory has been lifted.",
  records: records.length,
  checks,
  errors,
};
fs.mkdirSync(".artifacts", { recursive: true });
fs.writeFileSync(path.join(".artifacts", "fishing-planner-source-review.json"), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify({ checkedAt, records: records.length, plan, errors }, null, 2));
if (errors.length) process.exitCode = 1;
