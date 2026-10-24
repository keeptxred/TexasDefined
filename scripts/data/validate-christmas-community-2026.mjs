import fs from "node:fs";
import assert from "node:assert/strict";

const read = (path) => fs.readFileSync(path, "utf8");
const eventFile = read("src/data/events/christmas-community-2026.server.ts");
const adapter = read("src/data/events/texas-event-records.server.ts");
const collection = read("src/data/event-collection-page.server.ts");
const page = read("src/routes/events.$collection.tsx");
const premerge = read("scripts/ci/run-premerge-validation.mjs");
const authority = read("src/data/major-event-expanded-authority-tranche59.server.ts");
const resolver = read("src/data/major-event-page.server.ts");
const registry = read("src/data/major-event-supplemental-registry.server.ts");
const hubLinks = read("src/data/fixtures/seasonal-authority-links.ts");
const majorIndex = read("src/data/major-event-index.ts");
const candidates = JSON.parse(read("src/data/events/christmas-candidates-250.json"));
const schemaRegistry = read("src/data/major-event-schema-enrichment.server.ts");
const partnerRoute = read("src/routes/partner-with-us.tsx");
const partnerForm = read("src/routes/partner-with-us.lazy.tsx");
const partnerServer = read("src/data/partner-inquiry.functions.ts");
const monetizationPolicy = read("docs/holidays/christmas-2026-monetization.md");
const christmasLiveVerifier = read("scripts/ci/verify-christmas-hub-production.mjs");
const productionWorkflow = read(".github/workflows/deploy-production.yml");
const schemaBatch = read("src/data/major-event-schema-enrichment-batch33.server.ts");

const start = eventFile.indexOf("const verifiedOccurrences");
const end = eventFile.indexOf("\n];", start);
assert.ok(start >= 0 && end > start, "Source-qualified Christmas manifest was not found");
const json = eventFile.slice(eventFile.indexOf("= [", start) + 2, end + 2).trim();
const events = JSON.parse(json);
assert.ok(events.length >= 134, "The 134 organizer-verified Christmas date windows must not shrink without explicit source review");
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
  assert.ok(["hill-country","gulf-coast","big-bend","panhandle","piney-woods","prairies-lakes","south-texas"].includes(event.region), `${event.slug}: use the canonical TexasRegion identifier`);
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
for (const [slug,start,end] of [
  ['beaumont-mcfaddin-ward-holiday-open-house-2026','2026-12-05','2026-12-06'],
  ['arlington-texas-christkindl-market-opening-2026','2026-11-20','2026-11-22'],
  ['arlington-texas-christkindl-market-season-2026','2026-11-27','2026-12-23'],
  ['frisco-light-park-riders-field-2026','2026-11-06','2027-01-03'],
  ['gruene-christmas-market-days','2026-12-05','2026-12-06'],
  ['waco-wild-lights-2026-1','2026-11-27','2026-11-29'],
  ['waco-wild-lights-2026-4','2026-12-17','2026-12-20'],
  ['mineral-wells-merry-wells-festival','2026-11-28',undefined],
]) check(slug,start,end);
assert.ok(!bySlug.has('waco-wild-lights-2026-late-december'), 'Conflicted Zoo operating nights cannot be invented');
for (const [slug, begin, ending] of [
  ["college-station-beachy-central-lights-nov-2026","2026-11-26","2026-12-04"],
  ["college-station-christmas-in-park-festival-2026","2026-12-05",undefined],
  ["college-station-beachy-central-lights-late-2026","2026-12-06","2027-01-01"],
  ["flower-mound-christmas-parade-lighting-2026","2026-12-05",undefined],
  ["tpwd-tyler-pineywoods-christmas-2026","2026-12-11","2026-12-12"],
  ["tpwd-guadalupe-river-christmas-in-park-2026","2026-12-11","2026-12-12"],
  ["tpwd-lake-brownwood-holiday-at-lake-2026","2026-12-11","2026-12-12"],
  ["tpwd-eisenhower-light-up-park-2026","2026-12-11","2026-12-12"],
  ["tpwd-lake-bob-sandlin-christmas-2026","2026-12-11","2026-12-12"],
  ["tpwd-goose-island-christmas-2026","2026-12-12",undefined],
  ["tpwd-san-angelo-holly-days-2026","2026-12-12",undefined],
  ["tpwd-fort-richardson-ghost-christmas-2026","2026-12-12",undefined],
  ["tpwd-abilene-fa-la-la-forest-2026","2026-12-12",undefined],
  ["tpwd-lake-mineral-wells-trail-of-lights-2026","2026-12-18","2026-12-19"],
  ["tpwd-bastrop-happy-holly-days-2026","2026-12-19",undefined],
]) {
  check(slug, begin, ending);
  const event = bySlug.get(slug);
  assert.ok(event.officialEventUrl.startsWith("https://tpwd.texas.gov/calendar/") ||
    event.officialEventUrl.startsWith("https://www.cstx.gov/") ||
    event.officialEventUrl.startsWith("https://www.flowermound.gov/"), `${slug}: 2026 organizer source required`);
}
assert.ok(!bySlug.has("tpwd-south-llano-christmas-at-ranch-2026"), "The linked South Llano 2024 event page is not 2026 evidence");
check("boerne-weihnachts-parade-2026", "2026-12-05");
check("boerne-old-west-christmas-light-fest-1", "2026-11-27", "2026-11-29");
check("boerne-old-west-christmas-light-fest-2", "2026-12-04", "2026-12-06");
check("boerne-old-west-christmas-light-fest-3", "2026-12-11", "2026-12-13");
check("boerne-old-west-christmas-light-fest-4", "2026-12-18", "2026-12-23");
assert.ok(bySlug.get("boerne-weihnachts-parade-2026").summary.includes("weather contingency"),
  "The Boerne parade's December 6 backup must not appear as a confirmed second parade");
assert.ok(bySlug.get("boerne-old-west-christmas-light-fest-1").summary.includes("WALK-through"),
  "Do not misclassify the Boerne Old West Light Fest as a drive-through");
assert.ok(bySlug.get("boerne-old-west-christmas-light-fest-1").summary.includes("$25"),
  "The organizer's admission pricing must be explicit");
assert.ok(bySlug.get("college-station-christmas-in-park-festival-2026").summary.includes("CLOSED TO VEHICLES"),
  "December 5 College Station festival must not advertise ordinary drive-through entry");
assert.ok(bySlug.get("tpwd-abilene-fa-la-la-forest-2026").summary.includes("$5 CASH"),
  "Do not misrepresent the Abilene state park holiday drive as free");
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
  ["business sponsorship CTA", page, 'href="/partner-with-us?type=brand-retail&amp;source=%2Fevents%2Fchristmas-events&amp;focus=contact"'],
  ["premerge validation", premerge, "validate-christmas-community-2026.mjs"],
]) assert.ok(source.includes(required), `${file}: missing ${required}`);

assert.ok(collection.includes('christmasOfferCities') && collection.includes('!christmasOfferCities.has(event.city)'), "Holiday experience affiliate offers must remain at most one per city");
assert.ok(page.includes('rel="sponsored nofollow noopener noreferrer"'), "Commercial links require disclosure attributes");
assert.ok(eventFile.includes('category: "seasonal" as const'), "Calendar category is missing");
assert.ok(eventFile.includes('filter((occurrence) => (occurrence.endDate ?? occurrence.startDate) >= today)'), "Past holiday dates must expire automatically");

const majorAuthoritySlugs = [
  "gaylord-texan-ice",
  "grand-prairie-prairie-lights",
  "moody-gardens-holiday-in-the-gardens",
  "grapevine-north-pole-express",
  "dallas-zoo-lights",
];
for (const slug of majorAuthoritySlugs) {
  assert.ok(authority.includes(`slug: "${slug}"`), `Missing destination-scale Christmas guide ${slug}`);
  assert.ok(registry.includes(`"${slug}"`), `Missing guide directory/sitemap registration ${slug}`);
  assert.ok(schemaBatch.includes(`slug: "${slug}"`), `Missing approved optional-schema review for ${slug}`);
  assert.ok(hubLinks.includes(`"/event/${slug}"`), `Missing Christmas pillar bidirectional link ${slug}`);
  assert.ok(resolver.includes("getExpandedMajorEventAuthorityTranche59Server(slug)"), "Guide resolver tranche59 disconnected");
}
for (const slug of ["grapevine-north-pole-express", "dallas-zoo-lights"]) {
  assert.ok(adapter.includes(`"${slug}"`), `Disjoint ${slug} must use verified occurrence windows`);
}
for (const slug of [
  "grapevine-north-pole-express-nov",
  "grapevine-north-pole-express-dec",
  "grapevine-north-pole-express-final",
  "fort-worth-north-pole-express-dec3",
  "dallas-zoo-lights-opening", "dallas-zoo-lights-final",
]) {
  assert.ok(eventFile.includes(`"${slug}":`), `Operating window lacks planning guide: ${slug}`);
}
assert.ok(majorIndex.includes('startDate: "2026-11-27", endDate: "2027-01-03"'), "Johnson City dates must match organizer");
assert.ok(!majorIndex.includes('startDate: "2026-11-28", endDate: "2027-01-04"'), "Stale Johnson City dates remain");
assert.ok(!read("src/data/major-event-expanded-authority-tranche57.server.ts").includes("December 3, 24 and 25 listed as closed"), "Grapevine December 3 departures must not be hidden");
assert.equal(candidates.candidateCount, 250, "250-item intake missing");
assert.equal(candidates.candidates.length, 250, "250-item research catalog truncated");
assert.equal(candidates.candidates[0].intakeId, 1);
assert.equal(candidates.candidates.at(-1).intakeId, 250);
for (const [status, field] of [
  ["sourced-calendar", "calendarCandidates"],
  ["existing-authority", "authorityCandidates"],
  ["candidate-needs-source-reconciliation", "remainingCandidates"],
]) {
  const actual = candidates.candidates.filter((record) => record.status === status).length;
  assert.equal(candidates.reconciliation[field], actual, `Reconciliation summary drift for ${status}`);
}
assert.equal(
  candidates.reconciliation.calendarCandidates +
    candidates.reconciliation.authorityCandidates +
    candidates.reconciliation.remainingCandidates,
  250, "Every submitted Christmas candidate must be accounted for",
);
assert.ok(candidates.reconciliation.remainingCandidates > 0, "Do not auto-verify all holiday candidates without sources");
assert.ok(events.length >= 64, "Dated Christmas inventory shrank unexpectedly");

// Seasonal affiliate and sponsor source validation: preserve approved city
// attribution, explicitly sourced inquiries, and the no-AdSense launch gate.
for (const [city, destination] of [
  ["San Antonio", "san-antonio"],
  ["Austin", "austin"],
  ["Dallas", "dallas"],
  ["Galveston", "galveston"],
]) {
  assert.ok(collection.includes(`"${city}": "${destination}"`), `Christmas verified city referral missing for ${city}`);
}
assert.ok(collection.includes("christmasOfferCities.has(event.city)"), "Limit redundant Christmas affiliate offers to one per city");
assert.ok(page.includes("source=%2Fevents%2Fchristmas-events"), "Christmas sponsor inquiry link must carry its origin");
assert.ok(partnerRoute.includes("sanitizePartnerSource") && partnerRoute.includes("'/events/christmas-events'"), "Route must explicitly whitelist Christmas sponsor origin");
assert.ok(partnerForm.includes("const search = Route.useSearch()") && partnerForm.includes("sourcePath: search.sourcePath"), "Partner form must preserve router-validated sponsor attribution");
assert.ok(partnerServer.includes("z.literal('/events/christmas-events')"), "Server must enforce Christmas inquiry source allowlist");
assert.ok(!page.includes("adsbygoogle"), "Do not activate unapproved AdSense on Christmas calendars");
assert.ok(monetizationPolicy.includes("AdSense is not approved"), "Retain actual AdSense approval status in Christmas policy");
assert.ok(christmasLiveVerifier.includes("Flower Mound Christmas Parade and Tree Lighting"), "Live smoke must check the 2026–27 community Christmas expansion");
assert.ok(christmasLiveVerifier.includes("A Pineywoods Christmas"), "Live smoke must check organizer-backed state park records");
assert.ok(christmasLiveVerifier.includes("verify-christmas-release="), "Live smoke must bypass caches when probing stale source data");
assert.ok(christmasLiveVerifier.includes("data-ad-slot="), "Do not accidentally activate AdSense display units before approval");
assert.ok(productionWorkflow.includes("node scripts/ci/verify-christmas-hub-production.mjs"), "Existing protected production deploy must verify Christmas hub freshness");
assert.ok(productionWorkflow.includes("id: live_christmas_hub"), "Protected Christmas production smoke step missing");
assert.ok(schemaRegistry.includes("...majorEventSchemaEnrichmentBatch33,"), "Reviewed Christmas organizer schema batch missing from runtime registry");
assert.ok(adapter.includes("getMajorEventOccurrenceWindowsServer(authority)"), "Date-scoped seasonal guides must not pad closed nights");
assert.ok(read("src/data/major-event-expanded-authority-tranche57.server.ts").includes('label: "After Dec 9 closure"'), "Houston Zoo Lights holiday closures must remain excluded");
check("santas-ranch-new-braunfels", "2026-11-06", "2027-01-03");
check("sugar-land-holiday-lights-constellation-field", "2026-11-20", "2027-01-03");
check("jefferson-candlelight-tour-dec3", "2026-12-03", "2026-12-05");
check("jefferson-candlelight-tour-dec10", "2026-12-10", "2026-12-12");
check("amarillo-electric-light-parade", "2026-12-04");
check("richardson-santas-village-week1", "2026-12-05", "2026-12-06");
check("richardson-santas-village-week2", "2026-12-11", "2026-12-13");
check("richardson-santas-village-week3", "2026-12-18", "2026-12-20");
console.log(`Christmas calendar and five authority guides verified: ${events.length} dated occurrences, 250 candidates reconciled, affiliate disclosures, county crosslinks and premerge gate.`);

