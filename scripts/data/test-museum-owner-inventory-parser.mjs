#!/usr/bin/env node
import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { segmentOwnerMuseumNames, ownerMuseumIdentityKey, provisionalIdentityIssues } from "./museum-owner-inventory-parser.mjs";
const split = (value) => segmentOwnerMuseumNames(value);
assert.deepEqual(split("African American Museum of DallasAgricultural Heritage Museum"), ["African American Museum of Dallas", "Agricultural Heritage Museum"]);
assert.deepEqual(split("Art Center of WacoArt Museum of Southeast Texas"), ["Art Center of Waco", "Art Museum of Southeast Texas"]);
assert.deepEqual(split("McNay Art MuseumDeGolyer House and GardensDuBois-Allmon Museum"), ["McNay Art Museum", "DeGolyer House and Gardens", "DuBois-Allmon Museum"]);
assert.deepEqual(split("Heritage House Museum (Orange)Heritage Museum of Montgomery County"), ["Heritage House Museum (Orange)", "Heritage Museum of Montgomery County"]);
assert.equal(ownerMuseumIdentityKey("Audie Murphy/American Cotton Museum"), "audiemurphyamericancottonmuseum");
assert.ok(provisionalIdentityIssues("Mabee-Gerrer Museum (wait, that's Oklahoma, let's substitute)").includes("owner-annotation-or-proposed-substitution"));
const raw = readFileSync("docs/museums/owner-submitted-museum-names-20261012.txt", "utf8");
const entries = split(raw);
assert.ok(entries.length >= 650 && entries.length < 800, "Owner inventory must not be truncated or explode into false words");
for (const name of ["A.C. McMillan African American Museum", "McNay Art Museum", "DeGolyer House and Gardens", "DeLeon Area Historical Museum", "DuBois-Allmon Museum", "African American Museum of Dallas", "Agricultural Heritage Museum", "Art Center of Waco", "Art Museum of Southeast Texas", "Heritage House Museum (Orange)", "Heritage Museum of Montgomery County"]) {
 assert.ok(entries.includes(name), "Preserve complete owner-submitted name: " + name);
}
// Auditing must preserve individual raw occurrences even when the same
// institution name appears more than once (Scurry County Museum does).
const report = JSON.parse(execFileSync(process.execPath,
  ["scripts/data/audit-owner-museum-inventory.mjs"],
  { encoding: "utf8", maxBuffer: 8 * 1024 * 1024 }));
assert.equal(report.nameSegments, entries.length);
assert.equal(report.rows.length, entries.length, "No raw submitted name occurrence may be lost");
assert.equal(report.uniqueRows.length, report.uniqueNameSegments);
assert.equal(report.repeatedSubmittedNameOccurrences, report.nameSegments - report.uniqueNameSegments);
assert.ok(report.uniqueRows.every((row, index) => index === 0 || report.uniqueRows[index - 1].rawOccurrence < row.rawOccurrence),
  "The first occurrence of each unique name must preserve owner source order");
assert.ok(report.flagged.some(row => row.submittedName === "Art Museum of the Americas"),
  "Washington, DC Art Museum of the Americas must be excluded from Texas inventory");
const scurry = report.rows.filter(row => row.submittedName === "Scurry County Museum");
assert.ok(scurry.length >= 2, "Repeated Scurry County Museum entries must be preserved");
assert.ok(scurry.some(row => row.duplicateOfOccurrence !== null), "Repeated names must point to their first occurrence");
// The next-batch command must be deterministic, preserve raw order, and
// never create a duplicate task for an existing complete authority dossier.
const nextCommand = ["scripts/data/audit-owner-museum-inventory.mjs", "--next-batch"];
const preview = JSON.parse(execFileSync(process.execPath, nextCommand,
  { encoding: "utf8", maxBuffer: 8 * 1024 * 1024 }));
const secondPreview = JSON.parse(execFileSync(process.execPath, nextCommand,
  { encoding: "utf8", maxBuffer: 8 * 1024 * 1024 }));
assert.deepEqual(preview, secondPreview, "Concurrent chats must select a stable queue from the same committed ledger");
assert.equal(preview.mode, "preview-only");
assert.ok(preview.count > 0 && preview.count <= 25);
assert.equal(preview.candidates.length, preview.count);
assert.equal(new Set(preview.candidates.map(row => row.rawOccurrence)).size, preview.count);
assert.ok(preview.candidates.every(row => {
  const original = report.rows.find(x => x.rawOccurrence === row.rawOccurrence);
  return original && ["requires-independent-source-research", "existing-destination-needs-authority-audit"].includes(original.status) &&
    original.parseIssues.length === 0 && original.duplicateOfOccurrence === null;
}), "Batch selection must skip existing complete dossiers, duplicates, and flagged ambiguous names");
assert.ok(preview.candidates.every((row, i) => i === 0 ||
  row.rawOccurrence > preview.candidates[i - 1].rawOccurrence),
  "Next batch preserves stable owner inventory order");
console.log("Museum owner inventory parser: " + entries.length + " raw name occurrences retained; " + report.uniqueNameSegments + " provisional unique names; no publication authorization.");
