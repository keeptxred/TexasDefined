import fs from "node:fs";
import assert from "node:assert/strict";

const read = (path) => fs.readFileSync(path, "utf8");
const eventFile = read("src/data/events/christmas-community-2026.server.ts");
const temporalCollectionsSource = read("src/data/event-temporal-collections.server.ts");
const adapter = read("src/data/events/texas-event-records.server.ts");
const collection = read("src/data/event-collection-page.server.ts");
const page = `${read("src/routes/events.$collection.tsx")}\n${read("src/routes/events.$collection.lazy.tsx")}`;
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
assert.ok(events.length >= 263, "The 263 organizer-verified Christmas date windows must not shrink without explicit source review");
assert.equal(events.length, new Set(events.map((event) => event.slug)).size, "Duplicate Christmas community slugs");
const seasonStarts = events.map((event) => event.startDate).sort();
const seasonEnds = events.map((event) => event.endDate ?? event.startDate).sort();
assert.equal(seasonStarts[0], "2026-11-06", "The 2026 Christmas community calendar begins before the old November 15 guide-only cutoff");
assert.equal(seasonEnds.at(-1), "2027-01-18", "The 2026 season includes a verified winter ice-rink attraction beyond January 5");
assert.ok(temporalCollectionsSource.includes("getVerifiedChristmasCommunityEvents2026(now)"),
  "The Christmas collection must compute its presented season from confirmed community dates");
assert.ok(temporalCollectionsSource.includes("activeCommunityDates.map((event) => event.startDate).sort()[0]"),
  "The header must show the earliest verified Christmas event, not November 15");
assert.ok(temporalCollectionsSource.includes("activeCommunityDates.map((event) => event.endDate ?? event.startDate).sort().at(-1)"),
  "The header must show the final verified January attraction rather than an outdated January 5 bound");

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
for (const event of events) {
  if (event.sourceVerifiedAt !== undefined) {
    assert.match(event.sourceVerifiedAt, /^2026-\d{2}-\d{2}$/, `${event.slug}: source date must be a valid 2026 ISO date`);
    assert.ok(event.sourceVerifiedAt >= "2026-10-23", `${event.slug}: source review predates initial review`);
  }
}
assert.ok(eventFile.includes('lastVerifiedAt: occurrence.sourceVerifiedAt ?? "2026-10-23"'), "New source checks must display real review dates");
assert.ok(eventFile.includes('lastUpdatedAt: occurrence.sourceVerifiedAt ?? "2026-10-23"'), "New source checks must not inherit a stale October 23 update date");
assert.ok(!bySlug.has("lake-conroe-christmas-boat-parade-2026"), "Do not invent a 2026 lake boat parade from downtown Conroe events");
const check = (slug, date, endDate) => {
  const event = bySlug.get(slug);
  assert.ok(event, `Missing source-qualified occurrence: ${slug}`);
  assert.equal(event.startDate, date, `Unexpected source date for ${slug}`);
  if (endDate !== undefined) assert.equal(event.endDate, endDate, `Unexpected end date for ${slug}`);
};
for (const [slug, date, sourceHint] of [
  ["victoria-christmas-lighted-parade-tree-lighting-2026", "2026-12-05", "victoriatx.gov"],
  ["victoria-merry-on-main-2026", "2026-12-11", "victoriatx.gov"],
  ["temple-santa-fe-plaza-christmas-tree-lighting-2026", "2026-11-28", "discovertemple.com"],
  ["temple-80th-annual-christmas-parade-2026", "2026-12-07", "discovertemple.com"],
  ["port-lavaca-christmas-parade-2026", "2026-12-04", "portlavacaevents.com"],
  ["port-lavaca-christmas-at-bayfront-2026", "2026-12-12", "portlavacaevents.com"],
]) {
  check(slug,date);
  const record = bySlug.get(slug);
  assert.equal(record.sourceVerifiedAt, "2026-10-27", `${slug}: source review date must be accurate`);
  assert.ok(new URL(record.officialEventUrl).hostname.includes(sourceHint), `${slug}: organizer URL missing`);
  assert.ok(!record.endDate, `${slug}: one-day festivals must not be padded with unsupported dates`);
}
assert.ok(bySlug.get("temple-santa-fe-plaza-christmas-tree-lighting-2026").summary.includes("time is not yet confirmed"),
  "Temple's unknown tree-lighting time must not be inferred");
assert.ok(bySlug.get("port-lavaca-christmas-parade-2026").summary.includes("have not yet been published"),
  "Do not infer 2026 Port Lavaca parade hours from a 2025 event");
assert.ok(bySlug.get("port-lavaca-christmas-at-bayfront-2026").summary.includes("Festival of Trees"),
  "The Bayfront festival and unverified Festival of Trees are distinct");
assert.equal(candidates.candidates.find(x => x.intakeId === 134)?.status, "sourced-calendar",
  "Victoria's original 250-list event should be reconciled against its 2026 city calendar");
assert.equal(candidates.candidates.find(x => x.intakeId === 24)?.status, "candidate-needs-source-reconciliation",
  "Temple's unrelated military Nature in Lights dates must not be invented");
assert.equal(candidates.candidates.find(x => x.intakeId === 133)?.status, "candidate-needs-source-reconciliation",
  "Port Lavaca Festival of Trees cannot be inferred from the Bayfront event");
for (const [slug, date, sourceHint, candidateId] of [
  ["kingsville-ranch-hand-weekend-holiday-2026", "2026-11-20", "kingsvilletexas.com", 180],
  ["plainview-christmas-parade-of-lights-2026", "2026-12-03", "plainviewtexaschamber.com", 232],
  ["corsicana-palace-theatre-dean-martin-christmas-2026", "2026-12-10", "corsicanapalace.com", 95],
]) {
  check(slug, date);
  const event = bySlug.get(slug);
  assert.equal(event.sourceVerifiedAt, "2026-10-27", `${slug}: verified date mismatch`);
  assert.ok(new URL(event.officialEventUrl).hostname.includes(sourceHint), `${slug}: official source mismatch`);
  const intake = candidates.candidates.find(x => x.intakeId === candidateId);
  assert.equal(intake?.status, "sourced-calendar", `${slug}: original candidate not reconciled`);
  assert.ok(intake?.calendarSlugs?.includes(slug), `${slug}: original candidate mapping absent`);
}
assert.equal(bySlug.get("kingsville-ranch-hand-weekend-holiday-2026")?.endDate, "2026-11-21",
  "Kingsville Christmas tree lighting and Ranch Hand Weekend must use the correct two-day window");
assert.ok(bySlug.get("kingsville-ranch-hand-weekend-holiday-2026")?.summary.includes("$15"),
  "Do not omit the separate paid King Ranch breakfast cost");
assert.ok(bySlug.get("corsicana-palace-theatre-dean-martin-christmas-2026")?.summary.includes("one dated holiday stage performance"),
  "Do not invent a multi-week run for the Corsicana one-night show");
for (const [slug, date, endDate, sourceHost] of [
  ["port-isabel-christmas-parade-tree-lighting-2026", "2026-12-05", undefined, "portisabel-texas.com"],
  ["rockport-tropical-christmas-festival-2026", "2026-12-05", undefined, "rockporttx.gov"],
  ["midland-merry-lights-tree-lighting-2026", "2026-12-01", undefined, "midlandtexas.gov"],
  ["midland-merry-lighted-parade-2026", "2026-12-12", undefined, "midlandtexas.gov"],
  ["graham-christmas-roundup-parade-2026", "2026-12-03", undefined, "visitgrahamtexas.com"],
  ["sweetwater-christmas-on-square-parade-2026", "2026-12-07", undefined, "sweetwatertexas.org"],
  ["monahans-christmas-in-dunes-2026", "2026-12-04", "2026-12-05", "monahans.org"],
]) {
  check(slug,date,endDate);
  const record=bySlug.get(slug);
  assert.equal(record.sourceVerifiedAt,"2026-10-27",`${slug}: source date must be true to review`);
  assert.ok(new URL(record.officialEventUrl).hostname.endsWith(sourceHost),`${slug}: primary city/chamber event source required`);
  if (endDate===undefined) assert.ok(!record.endDate,`${slug}: do not pad single-day city activities`);
}
assert.equal(candidates.candidates.find(x=>x.intakeId===177)?.status,"sourced-calendar",
  "Rockport verified Tropical Christmas must reconcile submitted destination");
assert.equal(candidates.candidates.find(x=>x.intakeId===248)?.status,"sourced-calendar",
  "Graham verified Christmas Roundup must reconcile submitted destination");
for (const id of [174,226,237,239]) {
  assert.equal(candidates.candidates.find(x=>x.intakeId===id)?.status,"candidate-needs-source-reconciliation",
    `${id}: an unrelated city holiday event cannot verify a different submitted branded event`);
}
assert.ok(bySlug.get("port-isabel-christmas-parade-tree-lighting-2026")?.summary.includes("7 p.m."),
  "Port Isabel's parade and distinct tree lighting times must both be shown");
assert.ok(bySlug.get("midland-merry-lights-tree-lighting-2026")?.summary.includes("no earlier than 6:15 p.m."),
  "Midland City warns that lights start no earlier than 6:15 p.m.");
for (const slug of [
  "conroe-tree-lighting-2026",
  "conroe-christmas-around-square-2026",
  "conroe-toby-powell-christmas-2026",
  "downtown-conroe-christmas-parade-2026",
]) {
  assert.equal(bySlug.get(slug)?.sourceVerifiedAt, "2026-10-27", `${slug}: preserve actual review date`);
  assert.ok(bySlug.get(slug)?.officialEventUrl.includes("visitconroe.com"), `${slug}: primary source missing`);
}
check("conroe-tree-lighting-2026", "2026-12-01");
check("conroe-christmas-around-square-2026", "2026-12-01");
check("conroe-toby-powell-christmas-2026", "2026-12-12");
check("downtown-conroe-christmas-parade-2026", "2026-12-12");
check("la-porte-christmas-on-main-2026", "2026-12-03");
check("rosenberg-hometown-holiday-festival-2026", "2026-12-05");
check("lake-jackson-festival-lights-tree-lighting-2026", "2026-11-20");
check("lake-jackson-festival-lights-day-parade-2026", "2026-11-21");
check("lake-jackson-light-up-2026", "2026-11-21", "2027-01-03");
check("katy-nutcracker-exchange-tree-lighting-2026", "2026-12-05");
check("old-town-spring-hometown-tree-lighting-2026", "2026-11-14");
check("bastrop-annual-christmas-tree-lighting-2026", "2026-11-27");
check("bastrop-river-of-lights-2026", "2026-11-27", "2027-01-04");
check("bastrop-wassail-fest-2026", "2026-11-28");
check("bastrop-merry-on-main-2026", "2026-12-12");
check("bastrop-lost-pines-christmas-parade-2026", "2026-12-12");
check("brenham-greatest-gift-nativity-2026", "2026-12-04", "2026-12-05");
check("brenham-jingle-bell-market-2026", "2026-12-04", "2026-12-05");
check("burton-milk-honey-ranch-christmas-story-2026", "2026-12-11", "2026-12-13");
assert.ok(collection.includes("...christmasCommunityEvents.map((event) => event.verifiedAt)"),
  "Christmas hub latest source check must include the newer verified community calendar entries");
assert.ok(collection.includes("latestGuideSourceCheck"),
  "The permanent major event guides must still contribute to the latest source review date");
assert.ok(bySlug.get("brenham-greatest-gift-nativity-2026").summary.includes("only Friday December 4"),
  "Do not falsely claim the Nativity's one-night music program is held Saturday");
assert.ok(bySlug.get("burton-milk-honey-ranch-christmas-story-2026").summary.includes("reservation requirements"),
  "Unverified ranch admission rules require an organizer check");
assert.ok(bySlug.get("bastrop-river-of-lights-2026").summary.includes("nightly 6–10 p.m."),
  "Preserve City of Bastrop's exact free daily River of Lights hours");
assert.ok(bySlug.get("bastrop-merry-on-main-2026").summary.includes("10 a.m.–3 p.m."),
  "Do not conflate Bastrop daytime market and the 6 p.m. Christmas parade");
assert.ok(bySlug.get("bastrop-lost-pines-christmas-parade-2026").officialEventUrl.includes("discoverbastroptx.org"),
  "The 2026 parade requires the primary visitor bureau source");

assert.ok(bySlug.get("old-town-spring-hometown-tree-lighting-2026").summary.includes("November 15 UTC"),
  "Protect organizer-stated Saturday evening over its UTC timestamp");
assert.ok(bySlug.get("katy-nutcracker-exchange-tree-lighting-2026").summary.includes("not an official listing"),
  "Do not merge the unverified Katy Light Tall Pines lead with the city event");

assert.ok(bySlug.get("la-porte-christmas-on-main-2026").summary.includes("La Porte, Indiana"),
  "Holiday sources must distinguish Texas La Porte from the Indiana city");
assert.ok(bySlug.get("lake-jackson-festival-lights-day-parade-2026").summary.includes("7 p.m."),
  "Lake Jackson's 2026 parade time must remain linked to its organizer");
assert.ok(bySlug.get("rosenberg-hometown-holiday-festival-2026").summary.includes("not proof"),
  "Do not equate the verified Hometown Holiday Festival with an unverified Christmas Nights alias");

// The Alley Theatre's 2026–27 official ticketing calendar has distinct
// performance nights, not a continuous Nov 15–Dec 27 run.
for (const [idx,begin,end] of [
  [1,"2026-11-15",undefined],
  [2,"2026-11-21","2026-11-22"],
  [3,"2026-11-24",undefined],
  [4,"2026-11-27","2026-11-29"],
  [5,"2026-12-04","2026-12-06"],
  [6,"2026-12-08","2026-12-13"],
  [7,"2026-12-15","2026-12-20"],
  [8,"2026-12-22","2026-12-24"],
  [9,"2026-12-26","2026-12-27"],
]) {
  const slug = `houston-alley-theatre-christmas-carol-2026-${idx}`;
  check(slug,begin,end);
  const event = bySlug.get(slug);
  assert.ok(event.officialEventUrl.startsWith("https://www.alleytheatre.org/"),
    `${slug}: theater's first-party show source required`);
  assert.ok(event.summary.includes("Children younger than six"),
    `${slug}: official child-admission rules are important trip-planning context`);
}
// The original source must retain both Dec 26 and Dec 27. Only the shared
// /events projection is allowed to split the last day for its individually
// reviewed Dec 27 matinee, preventing duplicate editorial calendar cards.
assert.match(adapter, /finalAlleyMatinee = christmasPerformances.find/, "Final dated matinee requires a reviewed Christmas record");
assert.match(adapter, /event.slug === "houston-alley-theatre-christmas-carol-2026-9"/, "Only the known last community occurrence may be shortened");
assert.match(adapter, /event.endDate === "2026-12-27"/, "Guard exact confirmed community window");
assert.match(adapter, /records\[communityIndex\] = \{ \.\.\.records\[communityIndex\], endDate: "2026-12-26" \}/,
  "Preserve Dec 26 in community calendar, reserve Dec 27 for curated matinee");
assert.ok(bySlug.get("houston-alley-theatre-christmas-carol-2026-9").endDate === "2026-12-27",
  "The source and Christmas community guide must retain both officially confirmed dates");

assert.ok(!bySlug.has("houston-alley-theatre-christmas-carol-2026-all-dates"),
  "No fabricated continuous Alley Theatre performance dates");
const alleyBoxingDay = bySlug.get("houston-alley-theatre-christmas-carol-2026-9");
assert.equal(alleyBoxingDay.endDate, "2026-12-27",
  "Retain complete official Dec 26–27 source span; statewide adapter must shorten only the duplicate calendar card");
assert.ok(alleyBoxingDay.title.includes("December 26–27, 2026"),
  "Holiday community source must state both officially confirmed dates");
const christmasStageManifest = read("src/data/events/christmas-performances-2026.server.ts");
const alleyFinalMarker = christmasStageManifest.indexOf('id: "christmas-carol-houston-2026"');
assert.ok(alleyFinalMarker >= 0, "Alley Theatre Dec 27 curated source cannot disappear");
assert.ok(christmasStageManifest.slice(alleyFinalMarker,alleyFinalMarker+550).includes('date: "2026-12-27"'),
  "Final-day performance must remain dated Dec 27 and retain its separate official ticket link");

check("baytown-stars-stripes-christmas-parade-2026","2026-12-03");
check("deer-park-reindeer-park-2026","2026-12-05");
check("baytown-holiday-hangout-early-2026","2026-12-03","2026-12-23");
check("baytown-holiday-hangout-mid-2026","2026-12-26","2026-12-30");
check("baytown-holiday-hangout-final-2026","2027-01-02","2027-01-05");
check("league-city-holiday-in-the-park-2026","2026-12-04","2026-12-06");
check("pasadena-holiday-lighted-parade-2026","2026-12-05");
check("pasadena-christmas-market-2026","2026-12-12");
assert.ok(bySlug.get("league-city-holiday-in-the-park-2026").summary.includes("Grand Night Parade"),
  "Preserve League City 2026 parade and festival dates");
assert.ok(bySlug.get("pasadena-holiday-lighted-parade-2026").summary.includes("December 5, 2026")
  && bySlug.get("pasadena-christmas-market-2026").summary.includes("December 12, 2026"),
  "Pasadena's market and parade must remain separately dated");
assert.ok(bySlug.get("pasadena-christmas-market-2026").summary.includes("Admission and parking are free"),
  "Preserve accurate Christmas market admission");

const baytownHangoutWindows = events.filter(event => event.slug.startsWith("baytown-holiday-hangout-"));
assert.equal(baytownHangoutWindows.length,3,"Baytown's season must be split into precisely three open windows");
for (const closed of ["2026-12-24","2026-12-25","2026-12-31","2027-01-01"]) {
  assert.ok(!baytownHangoutWindows.some(event => event.startDate <= closed && (event.endDate ?? event.startDate) >= closed),
    `Baytown's official closed date ${closed} must not appear as an open calendar day`);
}
assert.ok(bySlug.get("deer-park-reindeer-park-2026").summary.includes("$12 advance")
  && bySlug.get("deer-park-reindeer-park-2026").summary.includes("sensory-friendly"),
  "Deer Park ticket prices and sensory hour must survive");
const seabrookBoatLaneCandidate = candidates.candidates.find(item => item.intakeId === 123);
assert.deepEqual(seabrookBoatLaneCandidate?.calendarSlugs,
  ["clearlake-65th-christmas-boat-lane-parade-2026"],
  "Seabrook viewing is the existing Clear Lake holiday boat parade, not a second event");
assert.equal(seabrookBoatLaneCandidate?.status,"sourced-calendar",
  "Source match should reconcile the regional Seabrook viewing description");

const christmasLiveCalendarVerifier = read("scripts/ci/verify-christmas-calendar-12-production.mjs");
assert.ok(christmasLiveCalendarVerifier.includes("christmas-carol-houston-2026")
  && christmasLiveCalendarVerifier.includes("editorial.length!==1"),
  "Production gate must continue rejecting duplicate editorial cards on Dec 27");


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
for (const [slug,begin,end] of [
  ["bryan-2026-lights-on-downtown","2026-11-20",undefined],
  ["bryan-2026-holiday-magic-sue-haswell","2026-12-03",undefined],
  ["bryan-2026-holiday-porch-stroll","2026-12-13",undefined],
  ["bryan-2026-downtown-holiday-stroll","2026-12-13","2026-12-17"],
  ["bryan-2026-lighted-parade","2026-12-17",undefined],
  ["weatherford-2026-christmas-on-square","2026-12-05",undefined],
  ["weatherford-2026-lights-night-parade","2026-12-05",undefined],
  ["lampasas-2026-carol-of-lights","2026-12-05",undefined],
  ["lampasas-2026-holidazzle-parade","2026-12-05",undefined],
  ["lampasas-2026-christmas-on-creek","2026-12-12",undefined],
  ["caldwell-2026-christmas-on-square","2026-12-11",undefined],
  ["navasota-2026-home-for-holidays-parade","2026-12-05",undefined],
]) check(slug,begin,end);
assert.ok(bySlug.get("bryan-2026-downtown-holiday-stroll").summary.includes("distinct event"), "Bryan parade and Stroll identities cannot be collapsed");
assert.ok(bySlug.get("caldwell-2026-christmas-on-square").summary.includes("Friday December 11"), "2026 Caldwell source-date beats annual tradition assumptions");
assert.ok(bySlug.get("navasota-2026-home-for-holidays-parade").sourceName.includes("School District"), "Do not imply organizer confirmation where only the district calendar supports the date");
assert.ok(!bySlug.has("temple-nature-in-lights-assumed-2026"), "Historic Temple BLORA holiday dates cannot be promoted as exact 2026 evidence");
assert.ok(!bySlug.has("waco-homestead-christmas-market-inferred-2026"), "Archived Homestead Holiday Market dates must not silently roll forward");
for (const [slug, begin] of [
  ["seguin-2026-holiday-stroll-parade","2026-12-03"],
  ["seguin-2026-sip-n-stroll","2026-12-04"],
  ["seguin-2026-north-pole-stroll","2026-12-05"],
  ["seguin-2026-yulefest-art-show","2026-12-06"],
  ["lewisville-2026-holiday-stroll-lights","2026-12-04"],
  ["lewisville-2026-holiday-stroll-parade","2026-12-05"],
  ["rowlett-2026-holiday-main-street-fest","2026-12-05"],
]) check(slug,begin);
assert.ok(!bySlug.has("rowlett-2026-duplicate-parade"), "Rowlett's festival and parade share a single city occasion");

check("colleyville-2026-christmas-tree-lighting","2026-11-21");
check("forney-2026-christmas-on-main","2026-12-05");
check("kaufman-2026-christmas-on-the-square","2026-12-05");
check("terrell-2026-christmas-parade","2026-12-12");
check("lockhart-2026-christmas-to-remember","2026-12-04","2026-12-05");
assert.ok(bySlug.get("terrell-2026-christmas-parade").summary.includes("FLOAT ENTRY fees"), "Terrell spectator entry must not falsely inherit float fees");
assert.ok(!bySlug.has("lockhart-2026-dickens-christmas"), "Different Lockhart event aliases must not be invented as verified 2026 Dickens dates");
assert.ok(bySlug.get("forney-2026-christmas-on-main").summary.includes("do not merge"), "Do not treat Christmas on Main as an unverified Forney Christmas in the Park event");
assert.ok(!bySlug.has("rockwall-2026-kiwanis-christmas-parade"), "Rockwall already has canonical Hometown Christmas coverage; avoid duplicate parade entries");
assert.ok(bySlug.has("rockwall-hometown-christmas-2026"), "Retain verified canonical Rockwall Christmas listing");
assert.ok(bySlug.has("burleson-btx-mas-christmas-2026"), "Retain verified Burleson BTX-MAS listing");
assert.ok(bySlug.get("lewisville-2026-holiday-stroll-parade").summary.includes("Check the city event program"), "Unpublished Lewisville parade exact hour must not be invented");

assert.ok(!bySlug.has('waco-wild-lights-2026-late-december'), 'Conflicted Zoo operating nights cannot be invented');
for (const [slug,date] of [
  ["southlake-home-for-the-holidays-2026","2026-11-21"],
  ["rockwall-hometown-christmas-2026","2026-12-05"],
  ["nacogdoches-nine-flags-parade-2026","2026-12-05"],
  ["kerrville-holiday-lighted-parade-2026","2026-11-21"],
  ["kerrville-merry-on-the-square-2026","2026-11-21"],
]) check(slug,date);

for (const [slug,date,end] of [
  ["longview-ambucs-christmas-parade-2026","2026-12-03",undefined],
  ["longview-arboretum-bright-2026-1","2026-11-27","2026-11-28"],
  ["longview-arboretum-bright-2026-2","2026-12-03","2026-12-05"],
  ["longview-arboretum-bright-2026-3","2026-12-10","2026-12-12"],
  ["longview-arboretum-bright-2026-4","2026-12-17","2026-12-23"],
  ["longview-arboretum-bright-2026-5","2026-12-26","2026-12-27"],
  ["livingston-christmas-train-village-2026-1","2026-11-27","2026-11-29"],
  ["livingston-christmas-train-village-2026-2","2026-12-03","2026-12-06"],
  ["livingston-christmas-train-village-2026-3","2026-12-10","2026-12-13"],
  ["livingston-christmas-train-village-2026-4","2026-12-17","2026-12-20"],
  ["livingston-christmas-train-village-2026-5","2026-12-24","2026-12-27"],
]) check(slug,date,end);
assert.ok(bySlug.get("longview-arboretum-bright-2026-1").summary.includes("dated ticket grid"),
  "Longview Arboretum must rely on explicitly advertised individual 2026 ticket days");
assert.ok(bySlug.get("longview-ambucs-christmas-parade-2026").summary.includes("WEATHER RAIN-OUT BACKUP"),
  "Longview rainout date is not a second scheduled parade");
assert.ok(bySlug.get("livingston-christmas-train-village-2026-3").summary.includes("December 12 extended hours"),
  "Livingston train sessions must preserve Saturday Dec 12 special hours");
assert.ok(bySlug.get("livingston-christmas-train-village-2026-1").summary.includes("NOT a paid passenger train ride"),
  "Keep Livingston miniature train exhibit distinct from excursion ticketing");
assert.ok(!bySlug.has("longview-christmas-train-2026"), "Do not invent the unverified Longview passenger train candidate");

for (const [slug,begin,end] of [
  ["clearlake-65th-christmas-boat-lane-parade-2026","2026-12-12",undefined],
  ["pearland-hometown-christmas-festival-2026","2026-12-04",undefined],
  ["kemah-jingle-on-boardwalk-2026-1","2026-12-04","2026-12-06"],
  ["kemah-jingle-on-boardwalk-2026-2","2026-12-11","2026-12-13"],
  ["kemah-jingle-on-boardwalk-2026-3","2026-12-18","2026-12-20"],
  ["kemah-cocoa-cookies-stroll-2026-1","2026-11-28",undefined],
  ["kemah-cocoa-cookies-stroll-2026-2","2026-12-05",undefined],
  ["kemah-cocoa-cookies-stroll-2026-3","2026-12-12",undefined],
  ["kemah-cocoa-cookies-stroll-2026-4","2026-12-19",undefined],
]) check(slug,begin,end);
assert.ok(bySlug.get("clearlake-65th-christmas-boat-lane-parade-2026").summary.includes("SAME regional parade"),
  "Do not create separate Seabrook and Kemah boat parades for one Chamber-organized route");
assert.ok(bySlug.get("pearland-hometown-christmas-festival-2026").summary.includes("NOT proof"),
  "Pearland festival is not proof of a season-long light exhibit");
assert.ok(bySlug.get("kemah-cocoa-cookies-stroll-2026-1").summary.includes("not imply Sunday or midweek"),
  "Kemah cocoa strolls only operate on named Saturdays");
assert.ok(!bySlug.has("pearland-festival-of-lights-2026"), "Do not invent a different Pearland festival identity");
check("pearland-hometown-christmas-parade-2026","2026-12-05");
check("pearland-tour-de-lites-2026","2026-12-12");
assert.ok(bySlug.get("pearland-hometown-christmas-parade-2026").summary.includes("DIFFERENT day"),
  "Pearland festival and parade must remain independently dated");
assert.ok(bySlug.get("pearland-tour-de-lites-2026").summary.includes("not yet been confirmed for 2026"),
  "Do not invent Tour De Lites ticket prices, bicycle requirements or routes");
assert.equal(bySlug.get("pearland-hometown-christmas-festival-2026").officialEventUrl,
  "https://www.parks.pearlandtx.gov/special-events/hometown-christmas-festival",
  "Pearland organizer source must be the current visitor page, not a stale city-calendar event ID");

assert.ok(bySlug.get("nacogdoches-nine-flags-parade-2026").summary.includes("not proof the full festival runs every day"),
  "Do not invent daily Nine Flags 2026 festival sessions");
assert.ok(bySlug.get("rockwall-hometown-christmas-2026").summary.includes("6–8 p.m."),
  "Rockwall city tree lighting must not inherit the earlier parade start time");
assert.ok(bySlug.get("kerrville-merry-on-the-square-2026").summary.includes("separate"),
  "Kerrville city parade and nonprofit square event must retain distinct organizers");
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


for (const [slug, begin, ending] of [
  ["coppell-holiday-parade-lighting-2026","2026-12-05",undefined],
  ["allen-watters-creek-light-the-night-2026","2026-11-21",undefined],
  ["allen-holly-jolly-celebration-2026","2026-12-05",undefined],
  ["allen-chicken-n-pickle-holiday-market-2026","2026-12-13",undefined],
  ["granbury-night-of-lights-parade-2026","2026-11-27",undefined],
  ["granbury-candlelight-homes-tour-2026","2026-12-04","2026-12-06"],
  ["burleson-btx-mas-christmas-2026","2026-12-05",undefined],
  ["burleson-santas-breakfast-2026","2026-12-05",undefined],
  ["burleson-christmas-library-2026","2026-12-05",undefined],
  ["burleson-holiday-glow-float-2026","2026-12-11",undefined],
  ["burleson-christmas-craft-fair-2026","2026-12-12",undefined],
  ["burleson-christmas-on-farm-2026","2026-12-12",undefined],
]) check(slug,begin,ending);
assert.ok(bySlug.get("burleson-santas-breakfast-2026").summary.includes("$7"),
  "Burleson Santa breakfast must show adult ticket price");
assert.ok(bySlug.get("burleson-holiday-glow-float-2026").summary.includes("$5"),
  "Burleson glow float registration must not be advertised as free");
assert.ok(bySlug.get("burleson-christmas-on-farm-2026").summary.includes("free"),
  "Burleson Christmas on the Farm must remain distinct from paid Santa breakfast");
assert.ok(bySlug.get("coppell-holiday-parade-lighting-2026").summary.includes("older 2025"),
  "Coppell stale 2025 tourist page must not be a source for 2026 dates");
assert.ok(bySlug.get("granbury-night-of-lights-parade-2026").summary.includes("2024"),
  "Granbury stale 2024 Santa House schedules must not be published as current");
for (const [slug, begin, ending] of [
  ["round-rock-light-up-the-lake-2026","2026-12-04","2026-12-05"],
  ["keller-holly-days-2026","2026-12-04",undefined],
  ["mesquite-christmas-in-the-park-2026","2026-12-05","2026-12-06"],
  ["brenham-holiday-shopping-stroll-2026","2026-12-12",undefined],
  ["chappell-hill-teddy-bear-parade-2026","2026-12-12",undefined],
  ["chappell-hill-christmas-home-tour-2026","2026-12-12",undefined],
]) check(slug,begin,ending);
assert.ok(bySlug.get("mesquite-christmas-in-the-park-2026").summary.includes("$12 activity wristband"),
  "Mesquite park entry is free but some activities are paid");
assert.ok(bySlug.get("round-rock-light-up-the-lake-2026").summary.includes("WALKING-only"),
  "Do not misrepresent Round Rock walking festival as a vehicle light route");
assert.ok(bySlug.get("brenham-holiday-shopping-stroll-2026").summary.includes("separate date"),
  "Brenham shopping stroll is separate from its early-December parade");
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
assert.ok(partnerRoute.includes("sanitizePartnerSource") && partnerRoute.includes("events\\/christmas-events"), "Route must explicitly whitelist Christmas sponsor origin");
assert.ok(partnerForm.includes("const search = Route.useSearch()") && partnerForm.includes("sourcePath: search.sourcePath"), "Partner form must preserve router-validated sponsor attribution");
assert.ok(partnerServer.includes("z.literal('/events/christmas-events')"), "Server must enforce Christmas inquiry source allowlist");
assert.ok(!page.includes("adsbygoogle"), "Do not activate unapproved AdSense on Christmas calendars");
assert.ok(monetizationPolicy.includes("AdSense is not approved"), "Retain actual AdSense approval status in Christmas policy");
assert.ok(christmasLiveVerifier.includes("expectedActiveCommunityCount") && christmasLiveVerifier.includes("remainingCommunityEvents"), "Live smoke must reconcile source-qualified active Christmas dates, rather than expire on hard-coded past events");
assert.ok(christmasLiveVerifier.includes("expectedLiveWitnesses") && christmasLiveVerifier.includes("sampleSlugs"), "Live smoke must verify date-filtered new-source Christmas witness events");
assert.ok(christmasLiveVerifier.includes("activePerformances"), "Live smoke must retain date-scoped curated concert and ticket verification");
assert.ok(christmasLiveVerifier.includes("verify-christmas-release="), "Live smoke must bypass caches when probing stale source data");
for (const slug of ["san-antonio-pearl-holiday-tree-lighting-2026","san-antonio-pearl-holiday-night-market-dec-23-2026"]) {
  assert.ok(christmasLiveVerifier.includes(`"${slug}"`), `${slug}: source-qualified Christmas production witness missing`);
}
assert.ok(christmasLiveVerifier.includes("data-ad-slot="), "Do not accidentally activate AdSense display units before approval");
assert.ok(productionWorkflow.includes("node scripts/ci/verify-christmas-hub-production.mjs"), "Existing protected production deploy must verify Christmas hub freshness");
assert.ok(productionWorkflow.includes("id: live_christmas_hub"), "Protected Christmas production smoke step missing");
assert.ok(schemaRegistry.includes("...majorEventSchemaEnrichmentBatch33,"), "Reviewed Christmas organizer schema batch missing from runtime registry");
assert.ok(adapter.includes("getMajorEventOccurrenceWindowsServer(authority)"), "Date-scoped seasonal guides must not pad closed nights");
assert.ok(read("src/data/major-event-expanded-authority-tranche57.server.ts").includes('label: "After Dec 9 closure"'), "Houston Zoo Lights holiday closures must remain excluded");
for (const [slug, day] of [
  ["san-antonio-pearl-holiday-tree-lighting-2026", "2026-11-27"],
  ["san-antonio-pearl-holiday-night-market-dec-02-2026", "2026-12-02"],
  ["san-antonio-pearl-holiday-night-market-dec-09-2026", "2026-12-09"],
  ["san-antonio-pearl-holiday-night-market-dec-16-2026", "2026-12-16"],
  ["san-antonio-pearl-holiday-night-market-dec-23-2026", "2026-12-23"],
]) {
  check(slug, day);
  assert.equal(bySlug.get(slug).sourceVerifiedAt, "2026-10-27", `${slug}: preserve actual review date`);
  assert.equal(bySlug.get(slug).officialEventUrl, "https://atpearl.com/parade/p/biggest-events-fall-winter-pearl-san-antonio-tx/",
    `${slug}: official Pearl organizer announcement required`);
}
for (const [slug, date, url] of [
  ["highland-village-our-village-glows-2026", "2026-11-21", "https://www.highlandvillage.org/588/Our-Village-Glows"],
  ["highland-village-christmas-at-the-ranch-2026", "2026-12-12", "https://www.highlandvillage.org/m/calendar/event/detail/2576"],
  ["forney-downtown-tree-lighting-2026", "2026-12-03", "https://www.forneytx.gov/761/Downtown-Tree-Lighting"],
]) {
  check(slug, date);
  assert.equal(bySlug.get(slug).officialEventUrl, url, `${slug}: city first-party event source required`);
  assert.equal(bySlug.get(slug).sourceVerifiedAt, "2026-10-27", `${slug}: preserve actual source review date`);
}
assert.ok(!bySlug.has("forney-2026-christmas-on-main-duplicate"), "Forney Christmas on Main exists already; do not create duplicate cards");
assert.ok(!bySlug.has("san-antonio-pearl-holiday-night-market-2026-daily"),
  "Pearl's four Wednesday markets must not become a fabricated nightly date span");
check("santas-ranch-new-braunfels", "2026-11-06", "2027-01-03");
check("sugar-land-holiday-lights-constellation-field", "2026-11-20", "2027-01-03");
check("jefferson-candlelight-tour-dec3", "2026-12-03", "2026-12-05");
check("jefferson-candlelight-tour-dec10", "2026-12-10", "2026-12-12");
check("amarillo-electric-light-parade", "2026-12-04");
check("richardson-santas-village-week1", "2026-12-05", "2026-12-06");
check("richardson-santas-village-week2", "2026-12-11", "2026-12-13");
check("richardson-santas-village-week3", "2026-12-18", "2026-12-20");
console.log(`Christmas calendar and five authority guides verified: ${events.length} dated occurrences, 250 candidates reconciled, affiliate disclosures, county crosslinks and premerge gate.`);

