/**
 * Bounded first-party review of the ten alternate official-source map points.
 * Drift is review-needed; no automated source dates or coordinates are changed.
 * Run: node scripts/ci/audit-fishing-planner-alternate-coordinates.mjs [--plan]
 */
import fs from "node:fs";
import path from "node:path";

const file = "src/data/fishing/planner-official-coordinate-fallbacks.json";
const registry = JSON.parse(fs.readFileSync(file, "utf8"));
const records = Object.entries(registry);
const plan = process.argv.includes("--plan");
const errors = [];
const checks = [];
const allowedSources = /^https:\/\/(?:waterdata\.usgs\.gov\/monitoring-location\/|www\.waterqualitydata\.us\/provider\/STORET\/TCEQMAIN\/|tpwd\.texas\.gov\/|edits\.nationalmap\.gov\/apps\/gaz-domestic\/public\/summary\/)/;
if (records.length !== 10) errors.push("Ten official fallback records expected; no silent deletion allowed");
for (const [slug, record] of records) {
  if (!/^[a-z0-9-]+$/.test(slug)
    || !record.sourceName || !record.sourceNeedle || !record.pointType
    || !allowedSources.test(record.sourceUrl)
    || !Number.isFinite(record.lat) || !Number.isFinite(record.lng)
    || record.lat < 25 || record.lat > 37 || record.lng < -107 || record.lng > -93
    || !/^20\d\d-\d\d-\d\d$/.test(record.reviewedAt)) {
    errors.push(slug + ": no valid reviewed primary-source record");
  }
}
const clean = (html) => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]*>/g, " ")
  .replace(/&(?:nbsp|amp|quot|#39);/gi, " ")
  .replace(/\s+/g, " ").trim();

async function review([slug, record]) {
  try {
    const response = await fetch(record.sourceUrl, {
      headers: { "User-Agent": "TexasDefinedFishingMapSources/1.0 (+https://texasdefined.com/fishing/plan)" },
      signal: AbortSignal.timeout(20_000),
      redirect: "follow",
    });
    if (!response.ok) throw new Error("HTTP " + response.status);
    const text = clean((await response.text()).slice(0, 1_000_000)).toLowerCase();
    const nameMatched = text.includes(record.sourceNeedle.toLowerCase());
    const latMatched = text.includes(String(record.lat));
    const lngMatched = text.includes(String(record.lng));
    checks.push({ slug, url: record.sourceUrl, status: response.status, nameMatched, latMatched, lngMatched });
    if (!nameMatched || !latMatched || !lngMatched) {
      errors.push(slug + ": official source name or published coordinate has drifted; inspect before changing a map pin");
    }
  } catch (error) {
    checks.push({ slug, url: record.sourceUrl, error: String(error?.message ?? error) });
    errors.push(slug + ": primary-source fetch failed; preserve existing reviewed point until investigated");
  }
}

if (!plan && errors.length === 0) {
  const concurrency = 3;
  for (let i = 0; i < records.length; i += concurrency) {
    await Promise.all(records.slice(i, i + concurrency).map(review));
  }
}

const report = {
  checkedAt: new Date().toISOString(),
  plan,
  records: records.length,
  checked: checks.length,
  errors,
  checks,
  policy: "Source drift or provider downtime does not authorize guessing reservoir positions, restamping verification dates or removing a source-backed lake pin.",
};
fs.mkdirSync(".artifacts", { recursive: true });
fs.writeFileSync(path.join(".artifacts", "fishing-planner-official-coordinate-review.json"), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify({ checkedAt: report.checkedAt, plan, records: report.records, checked: report.checked, errors }, null, 2));
if (errors.length) process.exitCode = 1;
