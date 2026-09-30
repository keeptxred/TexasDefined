import assert from "node:assert/strict";
import test from "node:test";
import { parseLcraHydrometLakeLevelCsv } from "../live-lake-level.server.ts";

const FAYETTE_SOURCE = "https://hydromet.lcra.org/Charts/?siteNumber=5634";

test("parses Fayette from a header-driven LCRA CSV with reordered columns", () => {
  const csv = [
    "Lake Name,Current Level,Read Date,Site Number,Conservation Pool",
    '"Lake Fayette at Fayette Power Plant",389.42,2026-09-30,5634,390.00',
  ].join("\n");

  assert.deepEqual(parseLcraHydrometLakeLevelCsv(FAYETTE_SOURCE, csv), {
    sourceUrl: FAYETTE_SOURCE,
    measuredAt: "2026-09-30",
    percentFull: null,
    elevationFeet: 389.42,
  });
});

test("handles quoted commas and alternative documented header spellings", () => {
  const csv = [
    "Station,Location,Last Update,Elevation",
    '5634,"Lake Fayette, Fayette Power Plant",09/30/2026 08:15 AM,389.37',
  ].join("\n");

  const snapshot = parseLcraHydrometLakeLevelCsv(FAYETTE_SOURCE, csv);
  assert.equal(snapshot?.elevationFeet, 389.37);
  assert.equal(snapshot?.percentFull, null);
  assert.equal(snapshot?.measuredAt, "2026-09-30");
});

test("rejects unknown column layouts instead of guessing positional fields", () => {
  const csv = [
    "A,B,C,D",
    '5634,"Lake Fayette at Fayette Power Plant",2026-09-30,389.55',
  ].join("\n");

  assert.equal(parseLcraHydrometLakeLevelCsv(FAYETTE_SOURCE, csv), null);
});

test("does not accept a different reservoir solely because the row is numeric", () => {
  const csv = [
    "Site Number,Lake Name,Read Date,Current Level",
    '9999,"Different Reservoir",2026-09-30,389.55',
  ].join("\n");

  assert.equal(parseLcraHydrometLakeLevelCsv(FAYETTE_SOURCE, csv), null);
});
