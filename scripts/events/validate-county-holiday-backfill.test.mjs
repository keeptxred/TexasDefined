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
    gray:"2026-12-11",
    erath:"2026-11-28",
    wichita:"2026-12-05",
    panola:"2026-12-01",
    "san-augustine":"2026-12-04",
    marion:"2026-11-28",
    lee:"2026-11-28",
    sutton:"2026-12-02",
    brazoria:"2026-12-04",
    somervell:"2026-11-28",
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

test("Gray County holiday records use distinct first-party exact-date Pampa Chamber occurrences", () => {
  const cases = [
    ["pampa-christmas-on-the-bricks-2026", "2026-12-11"],
    ["pampa-cowboy-christmas-parade-of-lights-2026", "2026-12-12"],
  ];
  for (const [slug, date] of cases) {
    const event = events.find(e => e.slug === slug);
    assert.ok(event, "No verified Gray County holiday record " + slug);
    assert.equal(event.startDate, date);
    assert.equal(event.countySlug, "gray");
    assert.equal(event.countyName, "Gray County");
    assert.equal(new URL(event.officialEventUrl).hostname, "business.pampachamber.com");
    assert.equal(event.sourceVerifiedAt, "2026-11-22");
  }
});

test("Erath, Wichita, Panola 2026 holiday additions are first-party date-specific and distinct", () => {
  const cases = [
    ["stephenville-christmasville-downtown-festival-2026","erath","2026-11-28","stephenvilletexas.org"],
    ["stephenville-holly-jolly-christmas-2026","erath","2026-12-07","stephenvilletexas.org"],
    ["wichita-falls-city-lights-christmas-parade-2026","wichita","2026-12-05","wfcitylights.com"],
    ["carthage-panola-college-christmas-in-carthage-2026","panola","2026-12-01","panola.edu"],
  ];
  for (const [slug, county, date, domain] of cases) {
    const event = events.find(e => e.slug === slug);
    assert.ok(event, "Missing 2026 verified original-organizer event " + slug);
    assert.equal(event.countySlug,county);
    assert.equal(event.startDate,date);
    assert.equal(event.sourceVerifiedAt,"2026-11-22");
    assert.ok(new URL(event.officialEventUrl).hostname.endsWith(domain));
  }
  assert.notEqual(events.find(e=>e.slug===cases[0][0]).startDate,
    events.find(e=>e.slug===cases[1][0]).startDate,
    "Stephenville 2026 holiday festivals have different dates; never join them into an invented window");
});

test("San Augustine 2026 Christmas market and downtown parade remain separate verified organizer dates", () => {
  const cases = [
    ["san-augustine-christmas-market-days-2026","2026-12-04","2026-12-05"],
    ["san-augustine-main-street-christmas-parade-2026","2026-12-04",undefined],
  ];
  for (const [slug, date, end] of cases) {
    const item = events.find(event => event.slug === slug);
    assert.ok(item, "Missing main-street holiday occurrence "+slug);
    assert.equal(item.countySlug,"san-augustine");
    assert.equal(item.startDate,date);
    assert.equal(item.endDate,end);
    assert.equal(item.sourceVerifiedAt,"2026-11-22");
    assert.equal(new URL(item.officialEventUrl).hostname,"visitsanaugustinetx.org");
    assert.match(item.sourceName,/San Augustine Main Street/);
  }
});

test("Marion, Lee and Sutton 2026 holiday editions remain separately county/organizer verified", () => {
  const cases=[
    ["jefferson-marion-christmas-parade-enchanted-forest-2026","marion","2026-11-28","jeffersontxchamber.org"],
    ["giddings-downtown-holiday-festival-christmas-market-2026","lee","2026-11-28","business.giddingstx.com"],
    ["giddings-bright-lights-christmas-delights-parade-2026","lee","2026-11-28","business.giddingstx.com"],
    ["sonora-texas-downtown-christmas-lighted-parade-2026","sutton","2026-12-02","sonoratexas.org"],
  ];
  for(const [slug,county,date,domain] of cases){
    const event=events.find(x=>x.slug===slug);
    assert.ok(event,"Missing directly verified community 2026 holiday "+slug);
    assert.equal(event.countySlug,county);
    assert.equal(event.startDate,date);
    const hostname = new URL(event.officialEventUrl).hostname;
    assert.ok(hostname === domain || hostname.endsWith("." + domain), "Event source must remain inside the expected original organizer domain");
    assert.equal(event.sourceVerifiedAt,"2026-11-22");
    assert.ok(event.summary.length>=110);
  }
  assert.equal(events.find(x=>x.slug===cases[1][0]).venueName.includes("Giddings"),true);
  assert.equal(events.find(x=>x.slug===cases[2][0]).venueName.includes("Simmang"),true);
  assert.match(events.find(x=>x.slug===cases[3][0]).summary,/Sutton County, Texas/);
});

test("Alvin and Glen Rose 2026 dates and counties remain first-party independently checked",()=>{
 const checks=[
 ["alvin-home-for-the-holidays-city-festival-parade-2026","brazoria","2026-12-04","2026-12-05","www.alvin.gov"],
 ["glen-rose-hometown-christmas-parade-market-2026","somervell","2026-11-28",undefined,"business.glenrosechamber.org"],
 ["glen-rose-storybook-christmas-tour-of-homes-2026","somervell","2026-12-12",undefined,"business.glenrosechamber.org"],
 ];
 for(const [slug,county,date,end,host] of checks){
   const item=events.find(s=>s.slug===slug);
   assert.ok(item,"Missing first-party event "+slug);
   assert.equal(item.countySlug,county);
   assert.equal(item.startDate,date);
   assert.equal(item.endDate,end);
   assert.equal(new URL(item.officialEventUrl).hostname,host);
   assert.equal(item.sourceVerifiedAt,"2026-11-22");
 }
});

test("six new current-edition community holiday records remain source-verified and county-qualified", () => {
 const cases=[
  ["kingsville-la-posada-parade-of-lights-2026","kleberg","2026-12-05","kingsvilletexas.com"],
  ["denver-city-christmas-parade-meet-santa-2026","yoakum","2026-12-17","denvercitychamber.com"],
  ["bonham-christmas-tree-lighting-smores-cookoff-2026","fannin","2026-11-28","bonhamchamber.com"],
  ["bonham-home-for-holidays-market-2026","fannin","2026-12-05","bonhamchamber.com"],
  ["goldthwaite-sip-stroll-shop-parade-2026","mills","2026-12-05","goldthwaiteareachamber.com"],
  ["hearne-downtown-christmas-parade-2026","robertson","2026-12-12","hearnechamber.com"]
 ];
 for (const [slug,county,date,hostname] of cases){
  const e=events.find(x=>x.slug===slug);
  assert.ok(e, "Missing verified 2026 festival "+slug);
  assert.equal(e.countySlug,county);
  assert.equal(e.startDate,date);
  assert.equal(e.sourceVerifiedAt,"2026-11-22");
  assert.ok(new URL(e.officialEventUrl).hostname.endsWith(hostname));
  assert.ok(e.summary.length >= 110 && e.venueName);
 }
 const goldthwaite=events.filter(e=>e.countySlug==="mills"&&e.startDate==="2026-12-05"&&/stroll|shop/i.test(e.title));
 const bonhamMarket=events.filter(e=>e.city==="Bonham"&&e.startDate==="2026-12-05"&&/market/i.test(e.title));
 const plantersville=events.filter(e=>e.city==="Plantersville"&&e.startDate==="2026-12-05"&&/parade/i.test(e.title));
 assert.equal(goldthwaite.length,1,"Do not double-publish Goldthwaite under alternative event slugs");
 assert.equal(bonhamMarket.length,1,"Do not double-publish the same Bonham cafe holiday market");
 assert.equal(plantersville.length,1,"Previously verified Plantersville parade already exists; do not duplicate");
 const denverCity=events.find(e=>e.slug==="denver-city-christmas-parade-meet-santa-2026");
 assert.match(denverCity.summary,/not specified a parade start time/, "Never invent parade hours without official source");
});

test("Brownwood and Marshall 2026 community Christmas entries are dated by city visitor office and not duplicate seasonal guides",()=>{
 const checks=[
  ["brownwood-downtown-christmas-tree-lighting-2026","brown","2026-12-01","visitbrownwood.com"],
  ["brownwood-downtown-lighted-christmas-parade-2026","brown","2026-12-03","visitbrownwood.com"],
  ["brownwood-christmas-under-the-stars-festival-2026","brown","2026-12-05","visitbrownwood.com"],
  ["marshall-wonderland-of-lights-christmas-parade-2026","harrison","2026-12-05","visitmarshalltexas.com"]
 ];
 for(const [slug,county,date,host]of checks){
  const record=events.find(e=>e.slug===slug);
  assert.ok(record,"Missing verified 2026 local event "+slug);
  assert.equal(record.countySlug,county);
  assert.equal(record.startDate,date);
  assert.equal(record.sourceVerifiedAt,"2026-11-22");
  assert.equal(new URL(record.officialEventUrl).hostname.replace(/^www[.]/,""),host);
  assert.ok(record.summary.length>=110&&record.venueName);
 }
 const uniqueNames=checks.map(x=>x[0]);
 assert.equal(events.filter(e=>uniqueNames.includes(e.slug)).length,4);
 assert.match(events.find(e=>e.slug===checks[2][0]).summary,/all day/);
 assert.match(events.find(e=>e.slug===checks[3][0]).summary,/not a month-long nonstop parade/);
});

test("Jacksboro Chamber market and Gonzales Main Street 2026 Winterfest are nonduplicate official editions",()=>{
 const checks=[
  ["jacksboro-chamber-christmas-vendor-market-2026","jack","2026-11-28","jacksborochamber.glueup.com"],
  ["gonzales-main-street-winterfest-celebration-2026","gonzales","2026-12-05","app.seemylegacy.com"]
 ];
 for(const [slug,county,date,host]of checks){
  const event=events.find(e=>e.slug===slug);
  assert.ok(event,"Missing source-qualified local festival "+slug);
  assert.equal(event.countySlug,county);
  assert.equal(event.startDate,date);
  assert.equal(new URL(event.officialEventUrl).hostname,host);
  assert.equal(event.sourceVerifiedAt,"2026-11-22");
  assert.ok(event.summary.length>=110&&event.venueName);
 }
 assert.equal(events.filter(e=>e.city==="Jacksboro"&&e.startDate==="2026-11-28"&&/market/i.test(e.title)).length,1);
 assert.match(events.find(e=>e.slug===checks[1][0]).summary,/not confirmed/);
});
