#!/usr/bin/env node
// Existing Sync Texas Events workflow's gated source-promotion stage.
// Source facts must have been extracted in THIS run from an exact official
// Event JSON-LD record, never from stale annual copy or a 30-day artifact.
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
const ledgerPath = process.env.MARDI_GRAS_SOURCE_LEDGER_PATH;
const output = "src/data/events/mardi-gras-verified-source-updates.json";
const authorized = {
  "orange-sabine": {
    eventSlug: "mardi-gras-on-the-sabine-orange", sourceUrl: "https://orangetexas.gov/407/Mardi-Gras-on-the-Sabine", city: "Orange",
  },
  "beaumont-festival": {
    eventSlug: "mardi-gras-southeast-texas-beaumont", sourceUrl: "https://mardigrastx.com/", city: "Beaumont",
  },
};
const validDay = (value) => {
  if (!/^2027-(?:01|02|03)-\d{2}$/.test(value || "")) return false;
  const date = new Date(value + "T12:00:00.000Z");
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
};
export function validateProtectedRecord(fact, sourceId) {
  const source = authorized[sourceId];
  if (!source || !fact) return false;
  if (fact.eventSlug !== source.eventSlug || fact.sourceId !== sourceId
      || fact.sourceUrl !== source.sourceUrl || fact.city !== source.city
      || fact.evidenceType !== "official-event-jsonld"
      || fact.timeType !== "published-event-occurrence-not-parade-start"
      || !/^202[67]-\d{2}-\d{2}T\d{2}:\d{2}:/.test(fact.checkedAt || "")
      || !validDay(fact.startDate) || !validDay(fact.endDate)
      || fact.endDate < fact.checkedAt.slice(0, 10)
      || fact.endDate < fact.startDate) return false;
  return Date.parse(fact.endDate + "T12:00:00Z") - Date.parse(fact.startDate + "T12:00:00Z") <= 7 * 86400000;
}
export function proposeProtectedMardiGrasFacts(before, ledger, sourceRecords) {
  if (before?.schemaVersion !== 1 || before.season !== 2027 || !before.records || Array.isArray(before.records)) {
    throw new Error("Invalid protected official Mardi Gras data registry; no promotion");
  }
  // Never treat an incomplete watcher, stale artifact or empty source list as
  // a successful live check. All seven sources must be accounted for.
  if (ledger?.schemaVersion !== 1 || !Array.isArray(ledger.observations)
      || new Set(ledger.observations.map(row => row.id)).size !== 7
      || !/^202[67]-\d{2}-\d{2}T\d{2}:\d{2}:/.test(ledger.checkedAt || "")) {
    throw new Error("No complete same-run official source ledger; no promotion");
  }
  const proposed = structuredClone(before);
  let count = 0;
  for (const row of ledger.observations) {
    if (!authorized[row.id]) continue;
    const fact = row.normalized2027Candidate;
    if (row.state !== "review-required" || row.reason !== "possible-new-2027-announcement-requires-editorial-verification"
        || !fact) continue;
    if (!validateProtectedRecord(fact, row.id) || fact.sourceUrl !== row.sourceUrl) {
      throw new Error("Unsafe source identity, date, or lifecycle in candidate " + row.id);
    }
    const existing = proposed.records[fact.eventSlug];
    if (!existing && sourceRecords[fact.eventSlug]?.startsWith("2027")) {
      // A human has since promoted this guide. Never silently supersede its
      // independent editorial judgment from a separate machine-readable event.
      throw new Error("Manual 2027 guide dates already exist for " + fact.eventSlug + "; review before changing");
    }
    if (existing && !validateProtectedRecord(existing, row.id)) throw new Error("Protected previous record invalid");
    if (existing && existing.startDate === fact.startDate && existing.endDate === fact.endDate
        && existing.startDateTime === fact.startDateTime && existing.endDateTime === fact.endDateTime) continue;
    proposed.records[fact.eventSlug] = fact;
    count++;
  }
  return { proposed, changed: count };
}
async function main() {
  if (!ledgerPath) throw new Error("Missing MARDI_GRAS_SOURCE_LEDGER_PATH");
  const ledger = JSON.parse(await readFile(ledgerPath, "utf8"));
  const before = JSON.parse(await readFile(output, "utf8"));
  const authority = await readFile("src/data/major-event-expanded-authority-tranche52.server.ts", "utf8");
  const current = {};
  for (const { eventSlug } of Object.values(authorized)) {
    const begin = authority.indexOf('slug: "' + eventSlug + '"');
    if (begin < 0) throw new Error("Missing canonical guide identity for " + eventSlug);
    const block = authority.slice(begin, begin + 650);
    const match = block.match(/\bstartDate:\s*"(\d{4}-\d{2}-\d{2})"/);
    if (!match) throw new Error("Missing canonical guide date for " + eventSlug);
    current[eventSlug] = match[1];
  }
  const { proposed, changed } = proposeProtectedMardiGrasFacts(before, ledger, current);
  if (changed) {
    await writeFile(output, JSON.stringify(proposed, null, 2) + "\n");
    console.log("Prepared " + changed + " official 2027 candidate(s) for protected full-surface event refresh PR.");
  } else {
    console.log("No new safely verified 2027 official source facts to promote; protected last-known-good unchanged.");
  }
}
async function verify() {
  const before = JSON.parse(await readFile(output, "utf8"));
  if (before.schemaVersion !== 1 || before.season !== 2027 || !before.records || Array.isArray(before.records)) {
    throw new Error("Invalid Mardi Gras 2027 protected source registry");
  }
  for (const [slug, fact] of Object.entries(before.records)) {
    if (!Object.values(authorized).some(source => source.eventSlug === slug)
        || !validateProtectedRecord(fact, fact.sourceId)) {
      throw new Error("Invalid or untrusted protected Mardi Gras source record " + slug);
    }
  }
  console.log("Mardi Gras source registry verified: " + Object.keys(before.records).length + " approved event occurrence(s).");
}
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  (process.argv.includes("--verify") ? verify() : main()).catch(error => {
    console.error(error); process.exitCode = 1;
  });
}
