import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  loadCountyNames, validateRegistry, allowedByRobots, extractEventLeads, auditChamberSources,
} from "./audit-chamber-event-sources.mjs";

const counties = loadCountyNames(readFileSync("src/data/texas-places.ts", "utf8"));
const registry = JSON.parse(readFileSync("ops/editorial/chamber-event-sources.json", "utf8"));

test("all 254 canonical county guides are present in the research roster", () => {
  assert.equal(counties.length, 254);
  assert.equal(new Set(counties.map(c => c.slug)).size, 254);
  for (const slug of ["gregg", "upshur", "angelina", "kimble", "jefferson", "rusk"])
    assert.ok(counties.some(c => c.slug === slug));
});

test("verified chamber source registry maps only real counties and requires O365", () => {
  assert.equal(validateRegistry(registry, counties), true);
  assert.throws(() => validateRegistry({
    ...registry, rules: { ...registry.rules, noGmail: false },
  }, counties), /O365-only/);
  assert.throws(() => validateRegistry({
    ...registry, sources: [...registry.sources, { ...registry.sources[0], id: "made-up", countySlugs: ["fake-county"] }],
  }, counties), /Unmatched county/);
  assert.throws(() => validateRegistry({
    ...registry, sources: [{ ...registry.sources[0], contactEmail: "someone@example.com" }],
  }, counties), /Do not commit/);
  assert.throws(() => validateRegistry({
    ...registry, sources: [{ ...registry.sources[0], calendarUrl: "http://127.0.0.1/admin" }],
  }, counties), /approved public HTTPS/);
});

test("robot restriction takes precedence over calendar discoverability", () => {
  assert.equal(allowedByRobots("User-agent: *\nDisallow: /calendar", "/calendar/2026"), false);
  assert.equal(allowedByRobots("User-agent: *\nDisallow: /private", "/calendar"), true);
  assert.equal(allowedByRobots("User-agent: *\nDisallow: /", "/"), false);
});

test("robots rules select the research agent, not unrelated Google or GPT bans", () => {
  const text = "User-agent: Googlebot\nDisallow: /\nUser-agent: GPTBot\nDisallow: /\nUser-agent: *\nDisallow: /private\nAllow: /";
  assert.equal(allowedByRobots(text, "/events"), true);
  assert.equal(allowedByRobots(text, "/private"), false);
  const own = "User-agent: *\nDisallow: /\nUser-agent: TexasDefined-Events-Research\nDisallow: /internal\nAllow: /events";
  assert.equal(allowedByRobots(own, "/events"), true);
  assert.equal(allowedByRobots(own, "/internal"), false);
  const specific = "User-agent: *\nDisallow: /events\nAllow: /events/public\nDisallow: /private/*";
  assert.equal(allowedByRobots(specific, "/events/private"), false);
  assert.equal(allowedByRobots(specific, "/events/public/festival"), true);
  assert.equal(allowedByRobots(specific, "/private/press"), false);
  const suffix = "User-agent: *\nDisallow: /feed$";
  assert.equal(allowedByRobots(suffix, "/feed"), false);
  assert.equal(allowedByRobots(suffix, "/feed/events"), true);
});

test("event calendar leads are unverified and never publishable", () => {
  const html = '<script type="application/ld+json">' +
    '{"@graph":[{"@type":"Event","name":"Downtown Holiday Festival","startDate":"2027-11-14","url":"https://example.org/events/festival"}]}' +
    '</script><a href="/festival">Annual Blueberry Festival</a>';
  const leads = extractEventLeads(html, "https://example.org/calendar");
  assert.equal(leads.length, 2);
  assert.equal(leads[0].dateShownByDiscoverySource, "2027-11-14");
  assert.equal(leads[0].organizerVerified, false);
  assert.equal(leads[0].publishable, false);
  assert.ok(leads.every(x => x.sourceUrl.startsWith("https://")));
  assert.deepEqual(extractEventLeads('<a href="javascript:alert(1)">Christmas Parade</a>',
    "https://example.org/calendar"), []);
});

test("offline audit enumerates every uncovered county without network, email or publication", async () => {
  const report = await auditChamberSources({
    offline: true, now: new Date("2026-11-22T12:00:00Z"),
    fetchImpl: () => { throw new Error("Offline audit must not make a request"); },
  });
  assert.equal(report.countiesTotal, 254);
  assert.equal(report.countiesWithRegisteredSources, new Set(registry.sources.flatMap(source => source.countySlugs)).size);
  assert.equal(report.countiesMissingSources, 254 - report.countiesWithRegisteredSources);
  assert.equal(report.countiesWithRegisteredSources + report.countiesMissingSources, 254);
  assert.equal(report.sourceCount, registry.sources.length);
  assert.equal(report.eventSpecificSourceCount, registry.sources.filter(s => s.sourceKind === "event-specific").length);
  assert.equal(report.annualEventsListSourceCount, registry.sources.filter(s => s.sourceKind === "annual-events-list").length);
  assert.equal(report.countiesWithExplicitCalendarSources, new Set(registry.sources.filter(s => s.sourceKind === "public-calendar").flatMap(s => s.countySlugs)).size);
  assert.equal(report.countiesNeedingCalendarEvidence, 254 - report.countiesWithExplicitCalendarSources);
  assert.equal(report.candidateCount, 0);
  assert.equal(report.unservedCounties.length, report.countiesMissingSources);
  const mapped = new Set(registry.sources.flatMap(source => source.countySlugs));
  assert.ok(report.unservedCounties.every(county => !mapped.has(county.slug)));
  assert.ok(!report.unservedCounties.some(county => county.slug === "borden"));
  assert.ok(!report.unservedCounties.some(c => c.slug === "gregg"));
  assert.ok(!report.unservedCounties.some(c => c.slug === "comanche"));
  assert.ok(report.observations.every(x => x.state === "offline-validation"));
  assert.match(report.eventPublication, /^NO/);
});

test("new local and regional source cohorts retain their correct Texas county geography", () => {
  const roster = new Set(registry.sources.flatMap(source => source.countySlugs));
  const documented = [
    "gillespie", "mclennan", "taylor", "val-verde", "victoria", "johnson",
    "parker", "midland", "rockwall", "kaufman", "webb", "polk",
    "san-patricio", "kleberg", "wise", "wichita", "hidalgo",
    "hood", "hunt", "walker", "lavaca", "matagorda", "comal", "grayson", "guadalupe",
    "cass", "marion", "kendall", "navarro", "tom-green", "nolan", "maverick", "titus",
    "ward", "mcculloch", "lampasas", "llano", "medina", "jasper", "somervell",
    "freestone", "san-augustine", "milam", "panola",
    "gray", "hardin", "scurry", "dewitt", "runnels", "young", "howard",
    "hutchinson", "wilson", "wilbarger", "sutton", "pecos", "terry", "yoakum",
    "hamilton", "madison", "jackson", "liberty", "karnes", "frio", "leon",
    "houston", "limestone",
    "mason", "moore", "hale", "gaines", "hansford", "stephens", "reeves", "rains",
    "robertson", "refugio", "willacy", "wheeler", "starr", "zavala",
    "tyler", "newton",
    "crockett", "dallam", "hartley", "hardeman", "ochiltree", "red-river",
    "jim-wells", "haskell", "castro", "swisher", "floyd",
    "dickens", "crosby", "franklin", "mills", "throckmorton",
    "jones", "knox", "shackelford", "hall",
    "zapata", "lamb", "parmer", "morris", "live-oak", "coke", "crane",
    "oldham", "lee", "donley", "garza", "jeff-davis",
  ];
  assert.equal(roster.size, 254, "Every canonical Texas county needs at least one reviewed public event-source contact");
  assert.ok(registry.sources.length >= 284, "Do not lose the verified original 270 sources plus three official tourism calendars");
  const directCalendars = registry.sources.filter(source => source.sourceKind === "public-calendar");
  assert.ok(directCalendars.length >= 124, "Keep the reviewed official community calendar sources");
  for (const county of documented)
    assert.ok(roster.has(county), "Missing official event-source mapping for " + county);

  const denison = registry.sources.find(source => source.id === "denison-city-discover");
  assert.ok(denison);
  assert.deepEqual(denison.countySlugs, ["grayson"]);
  assert.match(denison.organization, /City of Denison/);
  const bayCity = registry.sources.find(source => source.id === "bay-city-matagorda-events");
  assert.ok(bayCity?.countySlugs.includes("matagorda"));
  const newton = registry.sources.find(source => source.id === "newton-county-chamber-county");
  assert.ok(newton, "Use a Texas county-hosted Newton Chamber contact, not the Georgia lookalike");
  assert.deepEqual(newton.countySlugs, ["newton"]);
  assert.match(newton.homeUrl, /^https:\/\/www\.co\.newton\.tx\.us\//);
  assert.ok(!registry.sources.some(source => /newtonchamber\.com/i.test(source.homeUrl)),
    "An out-of-state Newton Chamber may not be mapped to Texas");

});


test("festival-specific pages and annual guides are real leads, not complete county calendars", () => {
  const annual = registry.sources.find(s => s.id === "pittsburg-official-festivals");
  const parade = registry.sources.find(s => s.id === "san-saba-chamber-lighted-parade");
  assert.equal(annual?.sourceKind, "annual-events-list");
  assert.equal(parade?.sourceKind, "event-specific");
  const calendar = new Set(registry.sources.filter(s => s.sourceKind === "public-calendar").flatMap(s => s.countySlugs));
  assert.ok(!calendar.has("camp"), "Annual guides alone must not certify a current county calendar");
  assert.ok(!calendar.has("san-saba"), "One event page alone must not certify full county calendar coverage");
});


test("independent first-party tourism calendars supplement blocked Chamber sources without claiming press opt-ins", async () => {
  const expected = [
    ["destination-waco-community-calendar", "mclennan", "destinationwaco.org"],
    ["visit-fredericksburg-events", "gillespie", "visitfredericksburgtx.com"],
    ["visit-laredo-cvb-calendar", "webb", "visitlaredo.com"],
  ];
  for (const [id, county, domain] of expected) {
    const source = registry.sources.find(s => s.id === id);
    assert.ok(source, "Missing independent tourism organization source " + id);
    assert.equal(source.sourceKind, "public-calendar");
    assert.deepEqual(source.countySlugs, [county]);
    assert.ok(new URL(source.calendarUrl).hostname.endsWith(domain));
  }
  const report = await auditChamberSources({ offline: true });
  assert.ok(report.countiesWithExplicitCalendarSources >= 119);
  assert.equal(report.countiesMissingSources, 0);
  assert.equal(report.countiesWithRegisteredSources, 254);
  assert.equal(report.countiesWithExplicitCalendarSources + report.countiesNeedingCalendarEvidence, 254);
  assert.equal(report.eventSpecificSourceCount, registry.sources.filter(s => s.sourceKind === "event-specific").length);
  assert.equal(report.annualEventsListSourceCount, registry.sources.filter(s => s.sourceKind === "annual-events-list").length);
  assert.match(report.outreachStatus, /tracked privately/);
});

test("reject invented source-kind classifications rather than silently counting an event page as a calendar", () => {
  const altered = { ...registry, sources: [
    ...registry.sources.filter(s => s.id !== "shamrock-wheeler-st-patricks"),
    { ...registry.sources.find(s => s.id === "shamrock-wheeler-st-patricks"), sourceKind: "confirmed-press-opt-in" },
  ] };
  assert.throws(() => validateRegistry(altered, counties), /Unsupported source classification/);
});

test("new official local tourism/municipal fallbacks retain geography and honest annual-vs-calendar classification", () => {
  const expected = [
    ["city-gainesville-community-events", "cooke", "public-calendar"],
    ["visit-granbury-official-events", "hood", "public-calendar"],
    ["visit-new-braunfels-tourism-events", "comal", "public-calendar"],
    ["discover-bastrop-tourism-events", "bastrop", "public-calendar"],
    ["orange-city-cvb-festival-guide", "orange", "annual-events-list"],
    ["visit-mcallen-annual-festival-guide", "hidalgo", "annual-events-list"],
  ];
  for (const [id, county, kind] of expected) {
    const source = registry.sources.find(s => s.id === id);
    assert.ok(source, "Missing first-party research source " + id);
    assert.equal(source.sourceKind, kind);
    assert.deepEqual(source.countySlugs, [county]);
  }
  const pampa = registry.sources.find(s => s.id === "pampa-gray-chamber");
  assert.equal(pampa?.sourceKind, "public-calendar");
  assert.equal(pampa?.calendarUrl, "https://business.pampachamber.com/events");
  const allCalendarCounties = new Set(registry.sources.filter(s => s.sourceKind === "public-calendar").flatMap(s => s.countySlugs));
  assert.ok(allCalendarCounties.size >= 119);
  assert.ok(!registry.sources.filter(s=>s.sourceKind==="public-calendar").some(s=>s.id==="visit-mcallen-annual-festival-guide"), "Visit McAllen annual list is not a dated full community calendar");
});

test("dated community calendars are separate from Canadian annual-events brochure", () => {
  const calendarIDs = ["andrews-chamber","bee-county-chamber","port-lavaca-chamber",
    "discover-lockhart","brownsville-chamber","bowie-texas-chamber","clifton-chamber","columbus-chamber"];
  for (const id of calendarIDs) {
    const record = registry.sources.find(s=>s.id===id);
    assert.ok(record, "Missing public calendar " + id);
    assert.equal(record.sourceKind,"public-calendar");
  }
  const canadian=registry.sources.find(s=>s.id==="visit-canadian-hemphill");
  assert.equal(canadian?.sourceKind, "annual-events-list");
  const c = new Set(registry.sources.filter(s=>s.sourceKind==="public-calendar").flatMap(s=>s.countySlugs));
  assert.ok(!registry.sources.filter(s=>s.sourceKind==="public-calendar").some(s=>s.id==="visit-canadian-hemphill"), "Annual event brochure does not itself qualify as full community calendar");
  assert.ok(c.size >= 119, "Do not lose the classified calendar geography when adding new verified counties");
});

test("ten additional independently reviewed 2026 official community calendars keep correct counties", () => {
  const required={
    "burnet-chamber":"burnet","marion-jefferson-chamber":"marion",
    "boerne-kendall-chamber":"kendall","mt-pleasant-titus-chamber":"titus",
    "glen-rose-somervell-chamber":"somervell","graham-young-chamber":"young",
    "vernon-wilbarger-chamber":"wilbarger","plainview-hale-chamber":"hale",
    "seminole-gaines-chamber":"gaines","giddings-lee-chamber":"lee",
  };
  for(const [id,slug] of Object.entries(required)){
    const record=registry.sources.find(s=>s.id===id);
    assert.ok(record,"Missing verified official community calendar "+id);
    assert.equal(record.sourceKind,"public-calendar");
    assert.ok(record.countySlugs.includes(slug));
    assert.equal(new URL(record.calendarUrl).protocol,"https:");
  }
  const evidence=new Set(registry.sources.filter(s=>s.sourceKind==="public-calendar").flatMap(s=>s.countySlugs));
  assert.ok(evidence.size>=119,"Never lose the 101 distinct documented county calendar sources");
});

test("2026 official community calendar source batch does not confuse annual brochures or contact-only sites",()=>{
 const official = {
 "eagle-pass-chamber":"maverick",
 "cuero-dewitt-chamber":"dewitt",
 "jackson-edna-chamber":"jackson",
 "snyder-scurry-chamber":"scurry",
 "liberty-trinity-valley-chamber":"liberty",
 "polk-county-chamber":"polk",
 "mason-county-chamber":"mason",
 "fort-stockton-pecos-chamber":"pecos",
 "visit-sugar-land-calendar":"fort-bend",
 "discover-denison-tourism-calendar":"grayson",
 "gotxk-leadership-texarkana-community-calendar":"bowie",
 "pecos-city-community-calendar":"reeves"
 };
 for(const [id,county] of Object.entries(official)){
  const item=registry.sources.find(s=>s.id===id);
  assert.ok(item,"Missing official source "+id);
  assert.equal(item.sourceKind,"public-calendar");
  assert.ok(item.countySlugs.includes(county));
 }
 for(const id of ["silsbee-hardin-chamber","visit-mcallen-annual-festival-guide"]){
  assert.equal(registry.sources.find(s=>s.id===id)?.sourceKind,"annual-events-list");
 }
 assert.equal(registry.sources.find(s=>s.id==="raymondville-willacy-chamber")?.sourceKind,"contact-only");
 assert.equal(registry.sources.find(s=>s.id==="city-alvin-home-for-holidays-2026")?.sourceKind,"event-specific");
 const all = new Set(registry.sources.filter(s=>s.sourceKind==="public-calendar").flatMap(s=>s.countySlugs));
 assert.ok(all.size>=119);
});

test("November first-party holiday/festival calendar evidence distinguishes active public schedules from one-off pages", () => {
  const expected = {
    "delta-county-chamber-christmas-2026":["delta","public-calendar"],
    "shelby-chamber-christmas-parade":["shelby","public-calendar"],
    "plantersville-official-community-calendar":["grimes","public-calendar"],
    "visit-goliad-christmas":["goliad","public-calendar"],
    "visit-seguin-city":["guadalupe","public-calendar"],
    "sweetwater-nolan-chamber":["nolan","public-calendar"],
    "del-rio-chamber":["val-verde","public-calendar"],
    "hearne-robertson-chamber":["robertson","public-calendar"],
    "oldham-vega-chamber":["oldham","annual-events-list"],
    "uvalde-chamber-christmas-2026":["uvalde","event-specific"],
    "athens-city-2026-christmas":["henderson","event-specific"],
    "delta-county-chamber":["delta","contact-only"]
  };
  for (const [id,[county,kind]] of Object.entries(expected)) {
    const source=registry.sources.find(s=>s.id===id);
    assert.ok(source,"Missing official public source "+id);
    assert.equal(source.sourceKind,kind);
    assert.ok(source.countySlugs.includes(county));
  }
  assert.equal(registry.sources.find(s=>s.id==="shelby-chamber-christmas-parade").calendarUrl,
    "https://shelbycountychamber.com/events-calendar/");
  const calendarCounties=new Set(registry.sources.filter(s=>s.sourceKind==="public-calendar").flatMap(s=>s.countySlugs));
  assert.ok(calendarCounties.size>=119);
  assert.equal(254-calendarCounties.size,registry.sources.length >=284 ? 135 : 135);
  assert.ok(!calendarCounties.has("oldham"), "Do not promote 2026 June-only annual brochure to a complete current events calendar");
});
