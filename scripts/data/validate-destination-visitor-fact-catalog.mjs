import fs from "node:fs";
import path from "node:path";

// Static curation gate: no backend, AI, external fetches, new database, or paid monitoring.
// Runtime reviewDestinationVisitorFacts independently hides stale/bad visitor claims.
// This scans every literal visitorFacts array in destination-curation*.ts including
// newly added batch files. Dynamically computed records require individual tests.
const dir = path.join(process.cwd(), "src/data");
const files = fs.readdirSync(dir)
  .filter((name) => /^destination-curation(?:-.*)?\\.ts$/.test(name)).sort();
const issues = [];
const stale = [];
let inspected = 0;
let blocks = 0;
const asOf = Date.parse(new Date().toISOString().slice(0, 10) + "T00:00:00Z");
const shortLife = new Set(["admission", "hours", "reservations", "access", "swimming"]);
const topics = new Set([...shortLife, "parking", "accessibility", "pets", "camping", "transit"]);
function pick(value, field) {
  return value.match(new RegExp("\\b" + field + '\\s*:\\s*"([^"]*)"'))?.[1];
}
for (const name of files) {
  const source = fs.readFileSync(path.join(dir, name), "utf8");
  for (const match of source.matchAll(/visitorFacts\\s*:\\s*\\[([\\s\\S]*?)\\]\\s*,/g)) {
    blocks += 1;
    const prelude = source.slice(0, match.index);
    const slug = [...prelude.matchAll(/^  "([^"]+)": \\{/gm)].at(-1)?.[1] ?? "(unknown)";
    const seen = new Set();
    const records = [...match[1].matchAll(/\\{([^{}]*)\\}/g)];
    if (!records.length) issues.push(name + " " + slug + ": empty/unsupported literal facts block");
    for (const record of records) {
      inspected += 1;
      const detail = record[1];
      const topic = pick(detail, "topic");
      const label = pick(detail, "label");
      const answer = pick(detail, "detail");
      const sourceUrl = pick(detail, "sourceUrl");
      const checkedAt = pick(detail, "checkedAt");
      const prefix = name + " " + slug + " " + (topic ?? "?") + " " + (label ?? "?");
      if (!topic || !topics.has(topic)) issues.push(prefix + ": unknown visitor topic");
      if (!label?.trim() || !answer || answer.trim().length < 16) issues.push(prefix + ": missing meaningful answer or label");
      if (!sourceUrl || !/^https:\\/\\/[^\\s/]+\\.[^\\s/]+(?:\\/[^\\s]*)?$/.test(sourceUrl)) issues.push(prefix + ": missing direct HTTPS source URL");
      const key = String(topic) + ":" + String(label).trim().toLowerCase().replace(/\\s+/g, " ");
      if (seen.has(key)) issues.push(prefix + ": duplicate topic and label");
      seen.add(key);
      const checked = checkedAt && /^\\d{4}-\\d{2}-\\d{2}$/.test(checkedAt)
        ? Date.parse(checkedAt + "T00:00:00Z") : NaN;
      if (!Number.isFinite(checked) || new Date(checked).toISOString().slice(0, 10) !== checkedAt || checked > asOf) {
        issues.push(prefix + ": invalid or future verified date");
      } else if ((asOf - checked) / 86400000 > (shortLife.has(topic) ? 120 : 365)) {
        stale.push(prefix + ": past review window (runtime suppresses stale answer)");
      }
    }
  }
}
console.log("Visitor-fact curation audit: " + files.length + " curated files, " + blocks +
  " fact blocks, " + inspected + " records, " + stale.length + " stale and " + issues.length + " invalid");
for (const issue of issues) console.error("ERROR " + issue);
for (const warning of stale) console.warn("STALE " + warning);
if (process.env.GITHUB_STEP_SUMMARY) {
  fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, "\\n### Destination visitor-fact curation\\n" +
    "- " + inspected + " individually sourced entries across " + blocks + " literal blocks\\n" +
    "- " + issues.length + " malformed/duplicate entries (blocking)\\n" +
    "- " + stale.length + " expired claims (visible-answer suppression; editorial refresh needed)\\n");
}
if (issues.length) process.exitCode = 1;
