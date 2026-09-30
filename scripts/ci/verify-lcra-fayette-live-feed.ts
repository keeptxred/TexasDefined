import assert from "node:assert/strict";

import { parseLcraLakeLevelCsv } from "../../src/data/fishing/lcra-lake-level-csv.ts";

const FEED_URL = "https://hydromet.lcra.org/media/LakeLevel.csv";
const SOURCE_URL = "https://hydromet.lcra.org/Charts/?agency=LCRA&siteNumber=5634&siteType=lakelevel";

const response = await fetch(FEED_URL, {
  redirect: "follow",
  headers: {
    accept: "text/csv,text/plain;q=0.9,*/*;q=0.1",
    "user-agent": "TexasDefined-LCRA-Feed-Verification/1.0",
    referer: SOURCE_URL,
  },
  signal: AbortSignal.timeout(15_000),
});
assert.equal(response.ok, true, `LCRA LakeLevel.csv returned HTTP ${response.status}`);

const csv = await response.text();
const lines = csv.replace(/^\uFEFF/, "").split(/\r?\n/).filter((line) => line.trim().length > 0);
assert.ok(lines.length >= 2, "LCRA LakeLevel.csv did not contain a header and data row");

console.log("LCRA LakeLevel.csv current rows:");
for (const [index, line] of lines.entries()) console.log(`${index + 1}: ${line}`);

const fayetteRow = lines.find((line) => /fayette|(?:^|,)\s*5634\s*(?:,|$)/i.test(line));
assert.ok(fayetteRow, "LCRA LakeLevel.csv did not contain Fayette / site 5634");

const snapshot = parseLcraLakeLevelCsv(SOURCE_URL, "5634", csv);
assert.ok(snapshot, "Hardened parser could not parse the current Fayette row");
assert.equal(snapshot.percentFull, null, "Fayette must remain elevation-only; do not fabricate percent-full");
assert.ok(Number.isFinite(snapshot.elevationFeet), "Fayette elevation must be numeric");
assert.match(snapshot.measuredAt, /^\d{4}-\d{2}-\d{2}$/);

console.log(`Fayette live LCRA snapshot verified: ${snapshot.elevationFeet.toFixed(2)} ft on ${snapshot.measuredAt}`);
