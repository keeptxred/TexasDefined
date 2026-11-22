import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { auditCountyHolidayCoverage, formatCountyHolidayIssue } from "./audit-county-holiday-coverage.mjs";

test("all counties receive holiday research status and past events do not become upcoming", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "td-county-holidays-"));
  const put = (p, content) => {
    fs.mkdirSync(path.dirname(path.join(root, p)), { recursive: true });
    fs.writeFileSync(path.join(root, p), content);
  };
  try {
    put("src/data/texas-places.ts", "const COUNTY_NAMES = `Gregg|Rusk|Upshur`.split('|');");
    put("src/data/major-event-index.ts", [
      "export const majorEventIndexRecords = [",
      '  { slug: "summer-music", name: "Summer Music", countySlug: "rusk",',
      '    startDate: "2026-12-10", category: "music", officialUrl: "https://example.org/music" }',
      "];",
    ].join("\n"));
    put("src/data/major-event-expanded-authority-tranche59.server.ts", [
      "const records = [",
      '  { slug: "christmas-in-gusherville", name: "Christmas in Gusherville",',
      '    countySlug: "gregg", startDate: "2026-11-14", category: "seasonal",',
      '    officialUrl: "https://gladewaterchamber.org/" }',
      "];",
    ].join("\n"));
    put("src/data/events/christmas-community-2026.server.ts", [
      "const verifiedOccurrences = [",
      '  { slug: "upshur-santa", title: "Upshur Santa",',
      '    countySlug: "upshur", startDate: "2026-12-08",',
      '    officialEventUrl: "https://example.org/upshur" }',
      "];",
    ].join("\n"));
    const report = auditCountyHolidayCoverage(root, new Date("2026-11-22T12:00:00Z"), 3);
    assert.equal(report.summary.counties, 3);
    const gregg = report.counties.find(c => c.slug === "gregg");
    const upshur = report.counties.find(c => c.slug === "upshur");
    const rusk = report.counties.find(c => c.slug === "rusk");
    assert.equal(gregg.status, "historical-next-date-pending");
    assert.equal(gregg.lastConfirmed[0].slug, "christmas-in-gusherville");
    assert.equal(upshur.status, "upcoming-verified");
    assert.ok(upshur.lastConfirmed.some(e => e.slug === "christmas-in-gusherville"));
    assert.equal(rusk.status, "holiday-source-discovery-needed");
    const issue = formatCountyHolidayIssue(report);
    assert.match(issue, /Rusk County/);
    assert.match(issue, /Christmas in Gusherville/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
