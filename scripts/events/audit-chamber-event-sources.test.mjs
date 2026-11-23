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
  assert.ok(registry.sources.length >= 313, "Do not lose the verified original 270 sources plus three official tourism calendars");
  const directCalendars = registry.sources.filter(source => source.sourceKind === "public-calendar");
  assert.ok(directCalendars.length >= 158, "Keep the reviewed official community calendar sources");
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
  assert.notEqual(parade?.sourceKind, "public-calendar", "A single lighted parade page is not a complete calendar, even after a separate verified full Chamber calendar for the county is added");
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
  assert.ok(report.countiesWithExplicitCalendarSources >= 148);
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
  assert.ok(allCalendarCounties.size >= 139);
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
  assert.ok(c.size >= 139, "Do not lose the classified calendar geography when adding new verified counties");
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
  assert.ok(evidence.size>=139,"Never lose the 101 distinct documented county calendar sources");
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
 assert.ok(all.size>=139);
});

test("reconciled official local calendar classifications preserve geography, publisher roles and source count", async () => {
  const expected = {
    "delta-county-chamber-christmas-2026":["delta","public-calendar"],
    "shelby-chamber-christmas-parade":["shelby","public-calendar"],
    "plantersville-official-community-calendar":["grimes","public-calendar"],
    "visit-goliad-christmas":["goliad","public-calendar"],
    "visit-seguin-city":["guadalupe","public-calendar"],
    "sweetwater-nolan-chamber":["nolan","public-calendar"],
    "del-rio-chamber":["val-verde","public-calendar"],
    "hearne-robertson-chamber":["robertson","public-calendar"],
    "portland-san-patricio-chamber":["san-patricio","public-calendar"],
    "visit-kingsville-kleberg":["kleberg","public-calendar"],
    "dumas-moore-chamber":["moore","public-calendar"],
    "zapata-community-events":["zapata","public-calendar"],
    "denver-city-yoakum-chamber":["yoakum","public-calendar"],
    "bonham-fannin-chamber":["fannin","public-calendar"],
    "cleburne-chamber":["johnson","public-calendar"],
    "goldthwaite-mills-chamber":["mills","public-calendar"],
    "gainesville-christmas-parade":["cooke","event-specific"],
    "poteet-city-christmas-2026":["atascosa","contact-only"],
    "crosbyton-chamber":["crosby","contact-only"],
    "oldham-vega-chamber":["oldham","annual-events-list"],
  };
  for (const [id,[county,kind]] of Object.entries(expected)) {
    const src=registry.sources.find(x=>x.id===id);
    assert.ok(src,"Official source is missing "+id);
    assert.ok(src.countySlugs.includes(county),"Wrong Texas county for "+id);
    assert.equal(src.sourceKind,kind);
    assert.equal(new URL(src.calendarUrl).protocol,"https:");
  }
  assert.ok(registry.sources.length >= 284, "Do not lose the reconciled primary-source baseline when discovering new sources");
  const audit = await auditChamberSources({offline:true});
  assert.equal(audit.countiesWithRegisteredSources,254);
  assert.ok(audit.countiesWithExplicitCalendarSources >= 130);
  assert.equal(audit.countiesWithExplicitCalendarSources + audit.countiesNeedingCalendarEvidence,254);
  assert.ok(registry.sources.every(s=>!("contactEmail" in s)), "Public registry must not contain private O365 recipient data");
  assert.ok(!registry.sources.some(s=>s.id==="shelby-chamber-christmas-parade"&&s.calendarUrl.includes("shelbychamber.org")),
    "Do not confuse Texas Shelby County Chamber with Tennessee Shelby Chamber");
});

test("Brownwood, Marshall and Medina County official tourism calendars are additional original 2026 source organizations",()=>{
 const want=[
  ["visit-brownwood-community-calendar","brown","visitbrownwood.com"],
  ["visit-marshall-current-event-directory","harrison","visitmarshalltexas.com"],
  ["go-medina-county-upcoming-community-events","medina","gomedinacounty.com"]
 ];
 for(const [id,county,domain]of want){
  const record=registry.sources.find(x=>x.id===id);
  assert.ok(record,"Missing first party community calendar "+id);
  assert.equal(record.sourceKind,"public-calendar");
  assert.deepEqual(record.countySlugs,[county]);
  assert.ok(new URL(record.calendarUrl).hostname.endsWith(domain));
 }
 const reportCount=new Set(registry.sources.filter(s=>s.sourceKind==="public-calendar").flatMap(s=>s.countySlugs));
 assert.ok(reportCount.size>=139);
 assert.ok(registry.sources.length >= 287, "Source count may only grow after new official source research");
});

test("Jack, Cherokee and Gonzales official 2026 events calendars keep appropriate organization and county",()=>{
 const expected=[
  ["jacksboro-chamber-community-calendar","jack","jacksborochamber.com"],
  ["jacksonville-chamber-community-events","cherokee","business.jacksonvilletexas.com"],
  ["city-gonzales-community-venue-calendar","gonzales","www.gonzales.texas.gov"]
 ];
 for(const [id,county,host]of expected){
  const row=registry.sources.find(x=>x.id===id);
  assert.ok(row,"Missing first-party community calendar "+id);
  assert.deepEqual(row.countySlugs,[county]);
  assert.equal(row.sourceKind,"public-calendar");
  assert.equal(new URL(row.calendarUrl).hostname,host);
 }
 assert.ok(registry.sources.length >= 290);
 assert.ok(new Set(registry.sources.filter(s=>s.sourceKind==="public-calendar").flatMap(s=>s.countySlugs)).size>=139);
});

test("Odessa visitor bureau calendar is distinct from inaccessible Chamber member feed",()=>{
 const chamber=registry.sources.find(s=>s.id==="odessa-ector-chamber");
 const visitor=registry.sources.find(s=>s.id==="discover-odessa-tourism-calendar");
 assert.ok(chamber&&visitor);
 assert.equal(chamber.sourceKind,"annual-events-list");
 assert.equal(visitor.sourceKind,"public-calendar");
 assert.deepEqual(visitor.countySlugs,["ector"]);
 assert.equal(visitor.calendarUrl,"https://discoverodessa.org/events/month/");
 assert.ok(!visitor.calendarUrl.includes("cca.odessachamber.com"));
 assert.ok(new Set(registry.sources.filter(s=>s.sourceKind==="public-calendar").flatMap(s=>s.countySlugs)).size>=137);
});

test("El Campo and Friona public 2026 community event calendar sources remain county-qualified",()=>{
 const elCampo=registry.sources.find(s=>s.id==="el-campo-chamber-community-calendar");
 const friona=registry.sources.find(s=>s.id==="friona-parmer-chamber");
 assert.ok(elCampo&&friona);
 assert.equal(elCampo.sourceKind,"public-calendar");
 assert.equal(friona.sourceKind,"public-calendar");
 assert.deepEqual(elCampo.countySlugs,["wharton"]);
 assert.deepEqual(friona.countySlugs,["parmer"]);
 assert.equal(elCampo.calendarUrl,"https://www.elcampochamber.com/events");
 assert.equal(friona.calendarUrl,"https://www.friona-chamber.com/new-events-2");
 assert.ok(registry.sources.length>=292, "Keep the verified county source baseline while expanding sources");
 const counties=new Set(registry.sources.filter(s=>s.sourceKind==="public-calendar").flatMap(s=>s.countySlugs));
 assert.ok(counties.size>=139);
});

test("Eastland and La Grange dated official community calendars are distinct from empty local event submission desks", () => {
  const current = [
    ["eastland-chamber","eastland","business.eastlandchamber.com"],
    ["la-grange-fayette-chamber","fayette","business.lagrangetx.org"],
  ];
  for (const [id,county,host] of current) {
    const source=registry.sources.find(s=>s.id===id);
    assert.ok(source,"Missing verified official calendar "+id);
    assert.ok(source.countySlugs.includes(county));
    assert.equal(source.sourceKind,"public-calendar");
    assert.equal(new URL(source.calendarUrl).hostname,host);
  }
  const researchDesks=["quanah-hardeman-chamber","haskell-city-calendar","refugio-county-chamber","littlefield-lamb-city-events"];
  for (const id of researchDesks) {
    const source=registry.sources.find(s=>s.id===id);
    assert.ok(source,"Missing public source "+id);
    assert.equal(source.sourceKind,"empty-calendar", "Blank date/submission page must stay monitored but not count as live festival calendar");
  }
  const officialCounties=new Set(registry.sources.filter(s=>s.sourceKind==="public-calendar").flatMap(s=>s.countySlugs));
  assert.ok(officialCounties.size>=141,"Protect at least 141 distinct explicitly dated public calendars");
});

test("Unfilled event pages remain on the scheduled respectful discovery audit without inflating county calendar coverage", async () => {
  const emptyIds=["quanah-hardeman-chamber","haskell-city-calendar","refugio-county-chamber","littlefield-lamb-city-events"];
  const allCalendars=new Set(registry.sources.filter(s=>s.sourceKind==="public-calendar").flatMap(s=>s.countySlugs));
  for(const id of emptyIds){
    const row=registry.sources.find(s=>s.id===id);
    assert.ok(row);
    assert.equal(row.sourceKind,"empty-calendar");
  }
  assert.ok(allCalendars.has("hardeman"),"Current municipal Quanah community calendar is independently sourced; Chamber-only submission page remains empty");
  assert.ok(!allCalendars.has("haskell"));
  assert.ok(!allCalendars.has("refugio"));
  assert.ok(!allCalendars.has("lamb"));
  const seenDue=new Set();
  const fetched=[];
  const fetchStub=async (url)=>{
    const href=String(url);
    fetched.push(href);
    if(href.endsWith("/robots.txt"))return {status:404,ok:false,url:href,
      headers:{get:()=>null},text:async()=>""};
    return {status:200,ok:true,url:href,
      headers:{get:()=> "text/html"},
      text:async()=>'<a href="/events/test">Hometown Christmas Parade</a>'};
  };
  for(let day=22;day<=28;day++){
    const report=await auditChamberSources({
      offline:false,now:new Date("2026-11-"+String(day)+"T12:00:00Z"),fetchImpl:fetchStub,
    });
    assert.equal(report.emptyCalendarSourceCount,registry.sources.filter(s => s.sourceKind === "empty-calendar").length);
    assert.equal(report.countiesWithExplicitCalendarSources,
      new Set(registry.sources.filter(s=>s.sourceKind==="public-calendar").flatMap(s=>s.countySlugs)).size);
    assert.match(report.eventPublication,/^NO/);
    for(const obs of report.observations.filter(o=>emptyIds.includes(o.sourceId))){
      if(obs.state==="reachable-discovery-only"){
        seenDue.add(obs.sourceId);
        assert.ok(obs.leads.every(lead=>lead.publishable===false&&lead.organizerVerified===false));
      }
    }
  }
  assert.deepEqual([...seenDue].sort(),emptyIds.slice().sort(),
    "Every empty event calendar should be reconsidered by the seven-day source-audit cycle");
  assert.ok(fetched.some(url=>url.includes("quanahchamber.com/community-events")),
    "Submitting an event later must not require a manual switch to re-enable discovery");
});

test("Current community calendars and empty civic inboxes are different evidence tiers, never press subscribers", async () => {
  const calendar = [
    ["hillsboro-chamber-community-calendar","hill","business.hillsborochamber.org"],
    ["visit-longview-texas-community-events","gregg","www.visitlongviewtexas.com"],
    ["downtown-san-angelo-mainstreet-events","tom-green","www.downtownsanangelo.com"],
  ];
  const empty = [
    ["hopkins-county-chamber-calendar","hopkins","hopkinschamber.org"],
    ["city-sulphur-springs-tourism-community-calendar","hopkins","www.visitsulphurspringstx.org"],
    ["gilmer-area-chamber-public-event-calendar","upshur","www.gilmerareachamber.com"],
    ["city-huntsville-wynne-home-tourism-calendar","walker","www.huntsvilletx.gov"],
  ];
  for (const [id,county,host] of calendar) {
    const s=registry.sources.find(x=>x.id===id);
    assert.ok(s,"Missing current first-party public calendar "+id);
    assert.equal(s.sourceKind,"public-calendar");
    assert.ok(s.countySlugs.includes(county));
    assert.equal(new URL(s.calendarUrl).hostname,host);
  }
  for(const [id,county,host] of empty){
    const s=registry.sources.find(x=>x.id===id);
    assert.ok(s,"Missing monitored organizer calendar "+id);
    assert.equal(s.sourceKind,"empty-calendar");
    assert.ok(s.countySlugs.includes(county));
    assert.equal(new URL(s.calendarUrl).hostname,host);
  }
  for(const id of ["huntsville-main-street-christmas-fair-2026","huntsville-city-christmas-movie-park-2026"]){
    const s=registry.sources.find(x=>x.id===id);
    assert.ok(s);
    assert.equal(s.sourceKind,"event-specific");
    assert.deepEqual(s.countySlugs,["walker"]);
  }
  const sourceCalendarCounties=new Set(registry.sources.filter(s=>s.sourceKind==="public-calendar").flatMap(s=>s.countySlugs));
  assert.ok(sourceCalendarCounties.size>=151);
  assert.ok(!sourceCalendarCounties.has("walker"),"Separate confirmed fair and movie cannot misrepresent a complete active county calendar");
  assert.ok(sourceCalendarCounties.has("hopkins"),"Independently verified Hopkins County Museum events calendar qualifies even while the Chamber submission form is empty");
  assert.equal(registry.sources.find(s=>s.id==="hopkins-county-chamber-calendar")?.sourceKind,"empty-calendar",
    "The empty Hopkins Chamber calendar itself must never be promoted merely because a different local organizer publishes dates");
  const report=await auditChamberSources({offline:true});
  assert.equal(report.countiesMissingSources,0);
  assert.equal(report.countiesNeedingCalendarEvidence,254-report.countiesWithExplicitCalendarSources);
  assert.equal(report.emptyCalendarSourceCount,registry.sources.filter(s=>s.sourceKind==="empty-calendar").length);
  assert.match(report.eventPublication,/^NO/);
});

test("Rural official 2026 calendar sources are active and distinct from annual Hemphill brochure", () => {
  const current = [
    ["san-saba-chamber-community-event-calendar","san-saba","www.sansabachamber.com"],
    ["san-saba-city-community-calendar","san-saba","sansabatexas.com"],
    ["canton-main-street-events-calendar","van-zandt","www.cantonmainstreet.org"],
    ["uvalde-chamber-community-events","uvalde","chamber.uvalde.org"],
    ["mineral-wells-chamber-calendar","palo-pinto","business.mineralwellstx.com"],
  ];
  for(const [id,county,host]of current){
    const s=registry.sources.find(x=>x.id===id);
    assert.ok(s,"Missing current official community calendar "+id);
    assert.equal(s.sourceKind,"public-calendar");
    assert.deepEqual(s.countySlugs,[county]);
    assert.equal(new URL(s.calendarUrl).hostname,host);
  }
  const sabine = registry.sources.find(s=>s.id==="city-hemphill-community-annual-festival-guide");
  assert.ok(sabine);
  assert.deepEqual(sabine.countySlugs,["sabine"]);
  assert.equal(sabine.sourceKind,"annual-events-list",
    "A monthly general annual guide with no date-qualified current editions cannot certify a live calendar");
  const full=new Set(registry.sources.filter(s=>s.sourceKind==="public-calendar").flatMap(s=>s.countySlugs));
  assert.ok(full.size>=148);
  assert.ok(full.has("sabine"),"Sabine now has independently published city and Chamber public event-calendar desks; annual overview alone does not suffice");
});

test("City and original event publisher calendars recover Midland, Matagorda and Hopkins while preserving empty Jasper dates",async()=>{
  const active=[
    ["city-midland-community-events-calendar","midland","www.midlandtexas.gov"],
    ["city-bay-city-community-calendar","matagorda","www.baycitytx.gov"],
    ["sulphur-springs-downtown-business-alliance-calendar","hopkins","ssdba.org"],
    ["hopkins-heritage-park-holiday","hopkins","hopkinsmuseum.org"],
  ];
  for(const [id,county,host]of active){
    const s=registry.sources.find(x=>x.id===id);
    assert.ok(s,"Missing first-party full community calendar "+id);
    assert.equal(s.sourceKind,"public-calendar");
    assert.ok(s.countySlugs.includes(county));
    assert.equal(new URL(s.calendarUrl).hostname,host);
  }
  const jasper=registry.sources.find(s=>s.id==="city-jasper-texas-calendar-monitor");
  assert.equal(jasper?.sourceKind,"empty-calendar");
  assert.deepEqual(jasper?.countySlugs,["jasper"]);
  const individual=["city-jasper-christmas-in-park-2026","decatur-chamber-tree-lighting-2026","decatur-chamber-parade-of-lights-2026"];
  for(const id of individual)assert.equal(registry.sources.find(s=>s.id===id)?.sourceKind,"event-specific");
  const reviewed=new Set(registry.sources.filter(s=>s.sourceKind==="public-calendar").flatMap(s=>s.countySlugs));
  assert.ok(reviewed.size>=151, "Never lose 151 official public-calendar counties");
  assert.ok(reviewed.has("jasper"),"Jasper now has independently reviewed Chamber community calendar; the separate city event remains only event-specific");
  assert.ok(reviewed.has("wise"),"Decatur Chamber independently lists its Community Events Calendar; the two 2026 holiday event pages are separate organizer date evidence");
  const report=await auditChamberSources({offline:true});
  assert.equal(report.countiesTotal,254);
  assert.equal(report.countiesMissingSources,0);
  assert.equal(report.countiesWithExplicitCalendarSources,reviewed.size);
  assert.equal(report.countiesNeedingCalendarEvidence,254-reviewed.size);
  assert.equal(report.sourceCount,registry.sources.length);
  assert.equal(report.emptyCalendarSourceCount,registry.sources.filter(s=>s.sourceKind==="empty-calendar").length);
  assert.match(report.eventPublication,/^NO/);
});

test("contact desks are not automatically counted as full community calendars", async () => {
  const contactOnly=[
    "gladewater-chamber","marshall-chamber","rusk-chamber","wharton-chamber",
    "muleshoe-bailey-chamber","city-quitaque","linden-cass-chamber",
    "ballinger-runnels-chamber","falfurrias-brooks-city",
  ];
  for (const id of contactOnly){
    assert.equal(registry.sources.find(s=>s.id===id)?.sourceKind,"contact-only",
      "Do not inflate calendar county coverage from a Chamber or city homepage: "+id);
  }
  const empty=registry.sources.find(s=>s.id==="brownfield-terry-chamber");
  assert.ok(empty);
  assert.equal(empty.sourceKind,"empty-calendar",
    "The visible Google Calendar iframe needs current season date verification");
  assert.equal(empty.calendarUrl,"https://brownfieldchamber.com/events/");
  assert.equal(registry.sources.find(s=>s.id==="hondo-medina-chamber")?.sourceKind,"empty-calendar");
  assert.equal(registry.sources.find(s=>s.id==="bay-city-matagorda-events")?.sourceKind,"annual-events-list");
  for(const id of ["rains-county-fair","starr-county-fair-association","visit-alpine-christmas-program"])
    assert.equal(registry.sources.find(s=>s.id===id)?.sourceKind,"event-specific");
  const r=await auditChamberSources({offline:true});
  assert.equal(r.sourceCount,registry.sources.length);
  assert.equal(r.contactOnlySourceCount,registry.sources.filter(s=>s.sourceKind==="contact-only").length);
  assert.equal(r.unclassifiedSourceCount,registry.sources.filter(s=>!s.sourceKind).length);
  assert.ok(r.unclassifiedSourceCount<=20,"Finish original source role review without new unclassified backlog");
  assert.equal(r.countiesWithRegisteredSources,254);
  assert.equal(r.countiesMissingSources,0);
});

test("first-party Longview events and original Gilmer Yulefest preserve correct Texas county",()=>{
  const sources=[
    ["city-longview-texas-community-calendar","gregg","public-calendar","www.longviewtexas.gov"],
    ["east-texas-yamboree-association-yulefest-2026","upshur","event-specific","yamboree.com"],
    ["city-gatesville-texas-community-events","coryell","annual-events-list","www.gatesvilletx.com"],
  ];
  for(const [id,county,kind,hostname] of sources){
    const source=registry.sources.find(s=>s.id===id);
    assert.ok(source,"Missing reviewed primary organizer source "+id);
    assert.deepEqual(source.countySlugs,[county]);
    assert.equal(source.sourceKind,kind);
    assert.equal(new URL(source.calendarUrl).hostname,hostname);
  }
  const calendarCounties=new Set(registry.sources.filter(s=>s.sourceKind==="public-calendar").flatMap(s=>s.countySlugs));
  assert.ok(calendarCounties.has("gregg"));
  assert.ok(!calendarCounties.has("upshur"),"A dated Yulefest is not a countywide public events calendar");
  assert.ok(!calendarCounties.has("coryell"),"An undated city community events overview is not a current calendar");
});

test("six formerly blocked official calendars are explicitly reviewed and unclassified source backlog is zero", async () => {
  const formerlyUnclassified = [
    "fredericksburg-chamber", "greater-waco-chamber", "laredo-chamber",
    "mcallen-hidalgo-chamber", "new-braunfels-chamber", "reeves-county-visitor-events",
  ];
  assert.deepEqual(registry.sources.filter(s => !s.sourceKind).map(s => s.id), []);
  for (const id of formerlyUnclassified)
    assert.equal(registry.sources.find(s => s.id === id)?.sourceKind, "public-calendar", "Research source classification " + id);
  const direct = [
    ["gainesville-cooke-chamber", "cooke", "business.gainesvillecofc.com"],
    ["midland-chamber", "midland", "business.midlandtxchamber.com"],
    ["granbury-chamber", "hood", "business.granburychamber.com"],
    ["san-angelo-chamber", "tom-green", "members.sanangelo.org"],
  ];
  for (const [id, county, host] of direct) {
    const s = registry.sources.find(x => x.id === id);
    assert.ok(s);
    assert.equal(s.sourceKind, "public-calendar");
    assert.deepEqual(s.countySlugs, [county]);
    assert.equal(new URL(s.calendarUrl).hostname, host);
  }
  for (const id of ["brownwood-area-chamber", "spearman-hansford-city"])
    assert.equal(registry.sources.find(s => s.id === id)?.sourceKind, "empty-calendar");
  for (const id of ["main-street-texarkana-2026", "denison-city-discover", "fairfield-freestone-chamber", "seymour-chamber"])
    assert.equal(registry.sources.find(s => s.id === id)?.sourceKind, "annual-events-list");
  const report = await auditChamberSources({ offline: true });
  assert.equal(report.sourceCount, registry.sources.length);
  assert.equal(report.sourceCount, 339);
  assert.equal(report.countiesWithRegisteredSources, 254);
  assert.equal(report.countiesWithExplicitCalendarSources, 164);
  assert.equal(report.countiesNeedingCalendarEvidence, 90);
  assert.equal(report.unclassifiedSourceCount, 0);
  assert.equal(report.eventPublication.startsWith("NO"), true);
});

test("Archer City and Canadian provide actual public event calendars distinct from earlier contact and annual brochures", () => {
  for (const [id, county, calendar] of [
    ["archer-city-visitor-center", "archer", "https://visitarchercity.com/events/"],
    ["canadian-hemphill-community-calendar", "hemphill", "https://www.canadiantx.com/calendar"],
  ]) {
    const source = registry.sources.find(s => s.id === id);
    assert.ok(source, "Missing first-party public calendar " + id);
    assert.equal(source.sourceKind, "public-calendar");
    assert.deepEqual(source.countySlugs, [county]);
    assert.equal(source.calendarUrl, calendar);
  }
  assert.equal(registry.sources.find(s=>s.id==="visit-canadian-hemphill")?.sourceKind, "annual-events-list",
    "A separate Canadian annual-events page must stay distinct from the active chamber calendar");
  const coverage = new Set(registry.sources.filter(s=>s.sourceKind==="public-calendar").flatMap(s=>s.countySlugs));
  assert.ok(coverage.has("archer") && coverage.has("hemphill"));
  assert.ok(coverage.size >= 156, "Do not lose Archer or Hemphill while adding verified sources");
});

test("Coleman city has a distinct public calendar; rural undated city desks are monitored, not inflated", () => {
  const coleman = registry.sources.find(s => s.id === "city-coleman-community-calendar");
  assert.equal(coleman?.sourceKind, "public-calendar");
  assert.deepEqual(coleman.countySlugs, ["coleman"]);
  assert.equal(coleman.calendarUrl, "https://www.cityofcolemantx.us/calendar/index.html");
  assert.equal(registry.sources.find(s=>s.id==="coleman-county-chamber")?.sourceKind, "annual-events-list",
    "Old countywide annual dates stay historical until separately reconfirmed");
  for (const [id, county] of [
    ["city-ralls-community-calendar-monitor","crosby"],
    ["city-daingerfield-community-calendar-monitor","morris"],
    ["city-memphis-community-calendar-monitor","hall"],
  ]) {
    const s = registry.sources.find(v=>v.id===id);
    assert.ok(s, "Missing public city source "+id);
    assert.deepEqual(s.countySlugs,[county]);
    assert.equal(s.sourceKind,"empty-calendar","A city events heading or council session is not a dated tourism-festival calendar");
  }
  const covered = new Set(registry.sources.filter(s=>s.sourceKind==="public-calendar").flatMap(s=>s.countySlugs));
  assert.ok(covered.has("coleman"));
  for(const county of ["crosby","morris","hall"])
    assert.equal(covered.has(county),false,"Do not imply dated countywide festival calendar for "+county);
});

test("Live Oak government and Jasper Chamber host distinct community calendars while four undated desks stay uncounted", () => {
  for(const [id,county,host] of [
    ["live-oak-county-community-calendar","live-oak","www.co.live-oak.tx.us"],
    ["jasper-lake-sam-rayburn-chamber","jasper","www.jasperchamber.com"],
  ]) {
    const s=registry.sources.find(x=>x.id===id);
    assert.ok(s);
    assert.equal(s.sourceKind,"public-calendar");
    assert.deepEqual(s.countySlugs,[county]);
    assert.equal(new URL(s.calendarUrl).hostname,host);
  }
  for(const [id,county] of [
    ["big-spring-cvb-calendar-monitor","howard"],
    ["city-brady-community-calendar-monitor","mcculloch"],
    ["hardin-county-government-events-monitor","hardin"],
    ["city-wheeler-community-calendar-monitor","wheeler"],
  ]) {
    const s=registry.sources.find(x=>x.id===id);
    assert.ok(s);
    assert.equal(s.sourceKind,"empty-calendar","Undated civic calendar must not be counted as current festival coverage");
    assert.deepEqual(s.countySlugs,[county]);
  }
  const publicCounties=new Set(registry.sources.filter(s=>s.sourceKind==="public-calendar").flatMap(s=>s.countySlugs));
  assert.ok(publicCounties.size >= 163, "Do not lose 163 previous classified calendar-source counties while adding Cameron");
  for(const county of ["howard","mcculloch"])
    assert.ok(!publicCounties.has(county),"Do not claim current festival calendar solely from empty city/CVB desk: "+county);
  for(const county of ["hardin","wheeler"])
    assert.ok(publicCounties.has(county),"Independent Silsbee/Shamrock Chamber calendar establishes source access without confirming future festival editions");
  assert.equal(registry.sources.find(s=>s.id==="big-spring-howard-tourism")?.sourceKind,"annual-events-list");
});

test("publisher-verified public community calendars recover Hardin, Wheeler, Hardeman and Sabine without claiming festive dates", () => {
  for (const [id, county, hostname] of [
    ["silsbee-chamber-community-calendar","hardin","www.silsbeecoc.com"],
    ["shamrock-texas-chamber-events","wheeler","shamrocktexaschamber.com"],
    ["city-quanah-community-calendar","hardeman","www.cityofquanah.com"],
    ["city-hemphill-current-events-calendar","sabine","www.cityofhemphill.com"],
    ["sabine-county-chamber-community-calendar","sabine","www.sabinecountychamber.com"]
  ]) {
    const item=registry.sources.find(s=>s.id===id);
    assert.ok(item, "Missing official Texas public source "+id);
    assert.deepEqual(item.countySlugs,[county]);
    assert.equal(new URL(item.calendarUrl).hostname,hostname);
    assert.equal(item.sourceKind,"public-calendar");
  }
  assert.equal(registry.sources.find(s=>s.id==="silsbee-hardin-chamber")?.sourceKind,"annual-events-list",
    "General annual traditions do not themselves establish next-year dates");
  assert.equal(registry.sources.find(s=>s.id==="city-hemphill-community-annual-festival-guide")?.sourceKind,"annual-events-list");
  assert.equal(registry.sources.find(s=>s.id==="quanah-hardeman-chamber")?.sourceKind,"empty-calendar",
    "Chamber submission page remains distinct from City's real Google community calendar");
  assert.equal(registry.sources.find(s=>s.id==="seymour-city-current-events-archive-monitor")?.sourceKind,"empty-calendar",
    "Broken Seymour event archive does not establish current dated festivals");
  assert.equal(registry.sources.find(s=>s.id==="pittsburg-city-camp-festival-guide")?.sourceKind,"annual-events-list",
    "Specific 2026/2027 editions on city guide are not a whole community calendar");
  const counties=new Set(registry.sources.filter(s=>s.sourceKind==="public-calendar").flatMap(s=>s.countySlugs));
  for (const x of ["hardin","wheeler","hardeman","sabine"])assert.ok(counties.has(x));
  for (const x of ["camp","baylor","crosby"])assert.ok(!counties.has(x),"Do not inflate active calendar coverage via annual, broken or unofficial source: "+x);
  assert.ok(counties.size >= 163, "Do not lose prior 163 verified calendar-source counties");
});

test("Crosbyton Chamber official source never treats an independent local guide as first-party Chamber material", () => {
  const s=registry.sources.find(s=>s.id==="crosbyton-chamber");
  assert.ok(s);
  assert.equal(s.sourceKind,"contact-only");
  assert.equal(new URL(s.homeUrl).hostname,"www.crosbytonchamber.com");
  assert.equal(new URL(s.calendarUrl).hostname,"www.crosbytonchamber.com");
  assert.ok(!registry.sources.some(x=>x.sourceKind==="public-calendar" &&
    /visitcrosbycounty\\.com|visitcrosbyton\\.com/.test(x.calendarUrl)),"Unofficial local blog must not become an official full-calendar source");
  assert.ok(!registry.sources.some(x=>x.countySlugs.includes("newton") &&
    /newtonchamber\\.com/.test(x.calendarUrl)),"Newton Georgia chamber must never be classified as Texas Newton County");
});

test("Cameron EDC is a real Milam County Texas public event-calendar publisher, not Cameron County or an external aggregator",()=>{
  const s=registry.sources.find(x=>x.id==="cameron-edc-2026-milam-events-calendar");
  assert.ok(s);
  assert.deepEqual(s.countySlugs,["milam"]);
  assert.equal(s.sourceKind,"public-calendar");
  assert.equal(new URL(s.calendarUrl).hostname,"www.welcometocameron.com");
  assert.equal(s.calendarUrl,"https://www.welcometocameron.com/events");
  assert.equal(new URL(s.contactPageUrl).pathname,"/list-your-event");
  assert.ok(!s.countySlugs.includes("cameron"),"City of Cameron in Milam County is NOT Cameron County Texas");
  const covered=new Set(registry.sources.filter(x=>x.sourceKind==="public-calendar").flatMap(x=>x.countySlugs));
  assert.ok(covered.has("milam"));
  assert.equal(covered.size,164);
});

test("Rains City confirms individual 2026 Christmas dates but county civic desks do not become full public festival calendars",()=>{
  const emory=registry.sources.find(x=>x.id==="emory-city-christmas-around-park-parade-2026");
  assert.ok(emory);
  assert.equal(emory.sourceKind,"event-specific");
  assert.deepEqual(emory.countySlugs,["rains"]);
  assert.equal(new URL(emory.calendarUrl).hostname,"www.cityofemory.com");
  assert.equal(emory.reviewedAt,"2026-11-22");
  const falls=registry.sources.find(x=>x.id==="falls-county-government-civic-calendar-monitor");
  assert.ok(falls);
  assert.equal(falls.sourceKind,"empty-calendar");
  assert.deepEqual(falls.countySlugs,["falls"]);
  assert.equal(new URL(falls.calendarUrl).hostname,"www.co.falls.tx.us");
  const covered=new Set(registry.sources.filter(x=>x.sourceKind==="public-calendar").flatMap(x=>x.countySlugs));
  assert.equal(covered.has("rains"),false,"One dated Emory Christmas announcement does not certify countywide calendar");
  assert.equal(covered.has("falls"),false,"Falls public holiday and Commissioners' Court calendar does not certify festival programming");
  assert.equal(covered.size,164);
  assert.equal(registry.sources.length,339);
});

test("Atascosa municipal events and Decatur community calendar are distinct real Texas first-party sources", () => {
  for (const [id, county, host] of [
    ["city-lytle-public-events-calendar", "atascosa", "lytletx.org"],
    ["city-jourdanton-events-calendar", "atascosa", "jourdantontexas.org"],
    ["decatur-wise-chamber", "wise", "cca.decaturtx.com"],
  ]) {
    const s = registry.sources.find(x => x.id === id);
    assert.ok(s, "Missing verified official source " + id);
    assert.deepEqual(s.countySlugs, [county]);
    assert.equal(s.sourceKind, "public-calendar");
    assert.equal(new URL(s.calendarUrl).hostname, host);
    assert.equal(s.contactEmail, undefined);
  }
  assert.equal(registry.sources.find(s => s.id === "seymour-chamber")?.sourceKind, "annual-events-list");
  assert.equal(registry.sources.some(s => s.calendarUrl.includes("business.pleasanton.org")), false,
    "Do not confuse Pleasanton, California with Pleasanton, Texas");
  const calendarCounties = new Set(registry.sources.filter(s => s.sourceKind === "public-calendar").flatMap(s => s.countySlugs));
  for (const county of ["atascosa", "wise", "hidalgo"])
    assert.equal(calendarCounties.has(county), true, "Official active source missing for " + county);
  for (const county of ["baylor", "coryell", "upshur"])
    assert.equal(calendarCounties.has(county), false, "Annual or empty calendar is not live event evidence for " + county);
});

test("Gatesville ISD 2026 seasonal event evidence is an event-specific source, not an entire Coryell county festival calendar", async () => {
  const src=registry.sources.find(s=>s.id==="gatesville-isd-christmas-on-marshall-2026");
  assert.ok(src,"Missing original Gatesville school-district 2026 community event source");
  assert.deepEqual(src.countySlugs,["coryell"]);
  assert.equal(src.sourceKind,"event-specific");
  assert.equal(new URL(src.calendarUrl).hostname,"www.gatesvilleisd.org");
  const communityCalendars=new Set(registry.sources.filter(s=>s.sourceKind==="public-calendar").flatMap(s=>s.countySlugs));
  assert.equal(communityCalendars.has("coryell"),false,
    "One district community event is not a current statewide festival/holiday community calendar for Coryell");
  const report=await auditChamberSources({offline:true});
  assert.equal(report.sourceCount,registry.sources.length);
  assert.equal(report.countiesWithRegisteredSources,254);
});


test("Crockett 2026 holiday home tour is a dated Houston County event, not evidence for all county dates", () => {
  const organizer = registry.sources.find(s => s.id === "crockett-downtown-holiday-homes-2026");
  assert.ok(organizer);
  assert.deepEqual(organizer.countySlugs, ["houston"]);
  assert.equal(organizer.sourceKind, "event-specific");
  assert.equal(new URL(organizer.calendarUrl).hostname, "www.discovercrocketttx.com");
  const reviewed = new Set(registry.sources.filter(s => s.sourceKind === "public-calendar").flatMap(s => s.countySlugs));
  assert.equal(reviewed.has("houston"), false,
    "One dated organizer occurrence does not establish a general Houston County public calendar");
});
