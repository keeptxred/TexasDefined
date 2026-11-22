import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const file = "src/data/events/christmas-community-2026-county-backfill.server.ts";
const source = fs.readFileSync(file, "utf8");
const manifest = fs.readFileSync("src/data/events/christmas-community-2026.server.ts", "utf8");
const registry = JSON.parse(fs.readFileSync("ops/editorial/chamber-event-sources.json", "utf8"));
const match = source.match(/= (\[[\s\S]*?\]);/);
if (!match) throw new Error("County Christmas backfill must be a source-auditable JSON literal");
const events = JSON.parse(match[1]);

test("source-verified county holiday additions are unique and present in the global calendar", () => {
  assert.ok(manifest.includes("import { verifiedCountyChristmasEvents2026 } from \"./christmas-community-2026-county-backfill.server\";"));
  assert.ok(manifest.includes("return [...verifiedOccurrences, ...verifiedCountyChristmasEvents2026]"));
  assert.ok(events.length >= 5, "Expected five first-party additions for formerly uncovered counties");
  assert.equal(new Set(events.map(e => e.slug)).size, events.length, "Duplicate holiday slug");
  const previous = manifest.slice(manifest.indexOf("const verifiedOccurrences"), manifest.indexOf("const publishedGuides"));
  for (const event of events) {
    assert.ok(!previous.includes('\"slug\": \"' + event.slug + '\"'), "Event already exists in original catalog: " + event.slug);
    assert.match(event.slug, /^[a-z0-9-]+$/);
    assert.ok(event.title.length >= 12 && event.summary.length >= 110);
    assert.match(event.startDate, /^2026-1[12]-\d{2}$/);
    if (event.endDate) assert.ok(event.endDate >= event.startDate);
    assert.equal(event.sourceVerifiedAt, "2026-11-22");
    assert.ok(["panhandle","prairies-lakes","hill-country","piney-woods","south-texas","gulf-coast","big-bend"].includes(event.region));
    const sourceUrl = new URL(event.officialEventUrl);
    assert.equal(sourceUrl.protocol, "https:");
    assert.ok(!/facebook\.com|eventbrite\.com|ticketmaster\.com/.test(sourceUrl.hostname));
    assert.ok(event.sourceName && event.venueName && event.countyName === event.countySlug[0].toUpperCase() + event.countySlug.slice(1) + " County");
    assert.ok(!event.summary.includes("2027 dates"), "Cannot imply an unannounced next season");
  }
});

test("county official calendars are tracked on the robot-respecting review schedule", () => {
  const sourceMap = new Map(registry.sources.flatMap(s => s.countySlugs.map(c => [c,s])));
  for (const slug of ["andrews","bandera","austin","cooke","camp"]) {
    assert.ok(sourceMap.has(slug), "No official seasonal source for " + slug);
  }
  for (const [slug,expected] of Object.entries({
    andrews:"2026-12-04",
    bandera:"2026-12-11",
    austin:"2026-12-05",
    cooke:"2026-12-03",
    camp:"2026-12-05",
  })) assert.equal(events.find(e=>e.countySlug===slug)?.startDate,expected);
});

test("all-county holiday audit covers newly added source-qualified calendar and on-going county weekends",()=>{
  const audit=fs.readFileSync("scripts/events/audit-county-holiday-coverage.mjs","utf8");
  const county=fs.readFileSync("src/data/county-major-events.server.ts","utf8");
  assert.ok(audit.includes('"src/data/events/christmas-community-2026-county-backfill.server.ts"'));
  assert.ok(audit.includes('source.includes("christmas-community-2026")'));
  assert.ok(county.includes("loadUpcomingTexasEventRecordsServer({ countySlug: county, limit: 250 })"),
    "County server must use the canonical ongoing-aware event selector");
  const selector=fs.readFileSync("src/data/events/texas-event-record.ts","utf8");
  assert.ok(selector.includes("(event.endDate ?? event.startDate) >= query.startsOnOrAfter"),
    "Ongoing multi-day events must remain visible after first day");
});
