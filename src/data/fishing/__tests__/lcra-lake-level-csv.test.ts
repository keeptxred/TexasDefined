import assert from "node:assert/strict";
import test from "node:test";

import { parseLcraLakeLevelCsv } from "../lcra-lake-level-csv.ts";

const SOURCE = "https://hydromet.lcra.org/Charts/?agency=LCRA&siteNumber=5634&siteType=lakelevel";

test("parses Fayette from a named LCRA lake-level row", () => {
  const csv = [
    "Site Number,Lake Name,Date Time,Lake Level (ft)",
    '5634,"Lake Fayette at Fayette Power Plant",09/30/2026 08:55 AM,389.42',
  ].join("\n");
  assert.deepEqual(parseLcraLakeLevelCsv(SOURCE, "5634", csv), {
    sourceUrl: SOURCE,
    measuredAt: "2026-09-30",
    percentFull: null,
    elevationFeet: 389.42,
  });
});

test("finds a real header after report preamble and ignores column order", () => {
  const csv = [
    "LCRA Hydromet Lake Level Report",
    "Generated,09/30/2026 09:02 AM",
    "Lake Level (ft),Observation Time,Site Name,Station",
    '389.38,09/30/2026 08:55 AM,"Lake Fayette at Fayette Power Plant",5634',
  ].join("\n");
  const result = parseLcraLakeLevelCsv(SOURCE, "5634", csv);
  assert.equal(result?.elevationFeet, 389.38);
  assert.equal(result?.measuredAt, "2026-09-30");
  assert.equal(result?.percentFull, null);
});

test("matches Fayette by exact site number even when name is omitted", () => {
  const csv = [
    "Station,Reading Time,Water Surface Elevation",
    "5485,09/30/2026 08:55 AM,450.10",
    "5634,09/30/2026 08:55 AM,389.44",
  ].join("\n");
  assert.equal(parseLcraLakeLevelCsv(SOURCE, "5634", csv)?.elevationFeet, 389.44);
});

test("refuses positional guessing when no recognizable header exists", () => {
  const csv = '5634,"Lake Fayette at Fayette Power Plant",09/30/2026 08:55 AM,389.44';
  assert.equal(parseLcraLakeLevelCsv(SOURCE, "5634", csv), null);
});
