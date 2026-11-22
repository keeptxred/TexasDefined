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
const countiesFile = fs.readFileSync("src/data/texas-places.ts", "utf8");
const countyNames = countiesFile.match(/const COUNTY_NAMES = `([^`]+)`\.split\('\|'\)/)?.[1]?.split("|");
if (!countyNames || countyNames.length !== 254) throw new Error("Canonical 254 Texas county names missing");
const canonicalCountyNameBySlug = new Map(countyNames.map(name => [
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-"), name + " County",
]));

test("source-verified county holiday additions are unique and present in the global calendar", () => {
  assert.ok(manifest.includes("import { verifiedCountyChristmasEvents2026 } from \"./christmas-community-2026-county-backfill.server.ts\";"));
  assert.ok(manifest.includes("return [...verifiedOccurrences, ...verifiedCountyChristmasEvents2026]"));
  assert.ok(events.length >= 42, "At least forty-two organizer-verified local holiday occurrences must remain represented");
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
    assert.ok(event.sourceName && event.venueName && canonicalCountyNameBySlug.get(event.countySlug) === event.countyName, `${event.slug}: county display name must match canonical multiword Texas county`);
    assert.ok(!event.summary.includes("2027 dates"), "Cannot imply an unannounced next season");
  }
});

test("county official calendars are tracked on the robot-respecting review schedule", () => {
  const sourceMap = new Map(registry.sources.flatMap(s => s.countySlugs.map(c => [c,s])));
  for (const slug of ["andrews","bandera","austin","cooke","camp","lamar","harrison","nueces","orange","hockley","wharton","waller","jack","sabine","hopkins","fannin","delta","uvalde","shelby","grimes","hill","van-zandt","san-saba","henderson","bosque","bowie","brewster","goliad","archer","atascosa","palo-pinto","chambers","bexar","eastland","montague"]) {
    assert.ok(sourceMap.has(slug), "No official seasonal source for " + slug);
  }
  for (const [slug,expected] of Object.entries({
    andrews:"2026-12-04",
    bandera:"2026-12-11",
    austin:"2026-12-05",
    cooke:"2026-12-03",
    camp:"2026-12-05",
    hamilton:"2026-11-28",
    karnes:"2026-12-17",
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
  const countyUi=fs.readFileSync("src/components/sports/CountySportsDestinations.tsx","utf8");
  const holidayLinks=countyUi.match(/href="\/events\/christmas-events"/g) ?? [];
  assert.ok(holidayLinks.length >= 2, "Christmas hub must be linked from every county, including counties with unrelated local events");
  assert.ok(countyUi.includes('event.isUpcoming'), "Past editions must be labeled, never passed off as current events");
});

test("Hamilton and Kenedy official 2026 holiday editions retain precise county/organizer evidence", () => {
  const cases = [
    ["hamilton-gingerbread-christmas-on-square-2026", "hamilton", "2026-11-28", "allthingshamilton.org"],
    ["kenedy-holiday-tour-of-homes-2026", "karnes", "2026-12-17", "kenedychamber.org"],
  ];
  for (const [slug, countySlug, date, host] of cases) {
    const entry = events.find(event => event.slug === slug);
    assert.ok(entry, "Missing official 2026 holiday record " + slug);
    assert.equal(entry.countySlug, countySlug);
    assert.equal(entry.startDate, date);
    assert.ok(new URL(entry.officialEventUrl).hostname.endsWith(host));
    assert.ok(entry.sourceName && entry.venueName && entry.summary);
  }
});
