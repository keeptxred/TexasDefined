import fs from "node:fs";
import assert from "node:assert/strict";

const read = (path) => fs.readFileSync(path, "utf8");
const eventFile = read("src/data/events/christmas-community-2026.server.ts");
const adapter = read("src/data/events/texas-event-records.server.ts");
const collection = read("src/data/event-collection-page.server.ts");
const page = read("src/routes/events.$collection.tsx");
const premerge = read("scripts/ci/run-premerge-validation.mjs");

const start = eventFile.indexOf("const verifiedOccurrences");
const end = eventFile.indexOf("\n\nfunction texasTodayIso", start);
assert.ok(start >= 0 && end > start, "Source-qualified Christmas manifest was not found");
const json = eventFile.slice(eventFile.indexOf("= [", start) + 2, eventFile.lastIndexOf(";", end)).trim();
const events = JSON.parse(json);
assert.ok(events.length >= 30, "A verified community Christmas event wave is missing");
assert.equal(events.length, new Set(events.map((event) => event.slug)).size, "Duplicate Christmas community slugs");

const validDate = /^20\d{2}-\d{2}-\d{2}$/;
for (const event of events) {
  for (const key of ["slug", "title", "city", "region", "countySlug", "startDate",
    "venueName", "officialEventUrl", "sourceName", "summary"]) {
    assert.ok(event[key], `${event.slug}: missing ${key}`);
  }
  assert.match(event.startDate, validDate, `${event.slug}: invalid starting date`);
  if (event.endDate) {
    assert.match(event.endDate, validDate, `${event.slug}: invalid ending date`);
    assert.ok(event.endDate >= event.startDate, `${event.slug}: inverted date range`);
  }
  assert.ok(event.startDate >= "2026-11-01", `${event.slug}: source record predates holiday season`);
  assert.match(event.officialEventUrl, /^https:\/\/[^/]+\//, `${event.slug}: invalid first-party source`);
  assert.ok(!event.officialEventUrl.includes("ticketmaster.evyy.net"), "Affiliate links must not masquerade as first-party event sources");
  assert.ok(!event.summary.includes("2025 dates"), "Do not publish stale edition information");
}

const bySlug = new Map(events.map((event) => [event.slug, event]));
const check = (slug, date, endDate) => {
  const event = bySlug.get(slug);
  assert.ok(event, `Missing source-qualified occurrence: ${slug}`);
  assert.equal(event.startDate, date, `Unexpected source date for ${slug}`);
  if (endDate !== undefined) assert.equal(event.endDate, endDate, `Unexpected end date for ${slug}`);
};
check("wimberley-trail-of-lights", "2026-11-28", "2026-12-26");
check("grand-prairie-prairie-lights", "2026-11-26", "2026-12-31");
check("georgetown-christmas-stroll", "2026-12-04", "2026-12-06");
check("marble-falls-walkway-of-lights", "2026-11-29", "2027-01-02");
check("abilene-winter-lightfest-opening", "2026-11-28");
check("abilene-winter-lightfest-week1", "2026-12-04", "2026-12-06");
check("abilene-winter-lightfest-week2", "2026-12-11", "2026-12-13");
check("abilene-winter-lightfest-week3", "2026-12-18", "2026-12-23");
check("brenham-cold-nights-holiday-tunes-2026", "2026-12-11");
assert.ok(!bySlug.has("brenham-home-for-holidays-weekend2"), "Unsupported December 12 performance must not return");
assert.ok(!bySlug.has("enchant-christmas-arlington"), "Do not restore unannounced 2026 Enchant Arlington as a calendar event");
assert.ok(!bySlug.has("magical-winter-lights"), "Do not restore unannounced 2026 Magical Winter Lights as a calendar event");

for (const [file, source, required] of [
  ["shared calendar adapter", adapter, "getVerifiedChristmasCommunityEvents2026()"],
  ["holiday hub server model", collection, "christmasCommunityEvents"],
  ["holiday hub source links", page, "Official event schedule"],
  ["holiday hub venue geo links", page, "countyPath"],
  ["holiday hub source date anchor", page, "christmas-community-"],
  ["hotel affiliate disclosure", page, "Affiliate disclosure: TexasDefined may earn a commission"],
  ["hotel affiliate sponsored link", page, 'data-affiliate-placement="christmas-hub-hotel-search"'],
  ["Viator affiliate sponsored link", page, 'data-affiliate-placement="christmas-community-nearby-experiences"'],
  ["business sponsorship CTA", page, 'href="/partner-with-us"'],
  ["premerge validation", premerge, "validate-christmas-community-2026.mjs"],
]) assert.ok(source.includes(required), `${file}: missing ${required}`);

assert.ok(page.includes('rel="sponsored nofollow noopener noreferrer"'), "Commercial links require disclosure attributes");
assert.ok(eventFile.includes('category: "seasonal" as const'), "Calendar category is missing");
assert.ok(eventFile.includes('filter((occurrence) => (occurrence.endDate ?? occurrence.startDate) >= today)'), "Past holiday dates must expire automatically");
console.log(`Christmas calendar verified: ${events.length} dated occurrences, disjoint schedules, first-party sources, affiliate disclosures, county links and premerge gate.`);
