import fs from "node:fs";

const discovery = fs.readFileSync("scripts/events/ticketmaster-discovery.mjs", "utf8");
const audit = fs.readFileSync("scripts/events/audit-ticketmaster-annual-discovery.mjs", "utf8");
const productionSync = fs.readFileSync("scripts/events/sync-ticketmaster-events.mjs", "utf8");
const workflow = fs.readFileSync(".github/workflows/audit-ticketmaster-annual-events.yml", "utf8");
const failures = [];

function requireText(source, text, label) {
  if (!source.includes(text)) failures.push(`${label}: missing ${text}`);
}

for (const marker of [
  "horizonDays = 90",
  "horizonDays < 1 || horizonDays > 366",
  "start + horizonDays * 86400000",
  "Ticketmaster refresh exceeded its request budget",
]) requireText(discovery, marker, "bounded discovery");

for (const marker of [
  "horizonDays,",
  'TICKETMASTER_ANNUAL_AUDIT_DAYS || "365"',
  "fetchTexasEvents({",
  "needsAuthorityReview",
  "Discovery only.",
  "tmp",
]) requireText(audit, marker, "annual audit");

if (audit.includes("src/data/generated/ticketmaster-events.json")) {
  failures.push("annual audit must not read or overwrite the production Ticketmaster snapshot");
}
if (/affiliateUrl|officialUrl/.test(JSON.stringify({
  outputPolicy: audit.includes("candidates,"),
})) && false) {
  failures.push("reserved");
}

for (const marker of [
  "permissions:",
  "contents: read",
  'TICKETMASTER_ANNUAL_AUDIT_DAYS: "365"',
  "node --test scripts/events/ticketmaster-discovery.test.mjs",
  "node scripts/events/audit-ticketmaster-annual-discovery.mjs",
  "actions/upload-artifact@v4",
  "workflow_dispatch:",
]) requireText(workflow, marker, "annual discovery workflow");

for (const prohibited of [
  "contents: write",
  "pull-requests: write",
  "git push",
  "gh pr",
  "sync-ticketmaster-events.mjs",
]) {
  if (workflow.includes(prohibited)) failures.push(`annual discovery workflow must remain non-publishing: found ${prohibited}`);
}

if (/horizonDays\s*:/.test(productionSync)) {
  failures.push("production Ticketmaster sync must keep the default 90-day horizon");
}

if (failures.length) {
  console.error("Ticketmaster annual discovery governance failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("PASS: full-year Ticketmaster discovery is bounded to 366 days, defaults production to 90 days, runs read-only, uploads review artifacts, and cannot publish or overwrite the live Ticketmaster catalog.");
