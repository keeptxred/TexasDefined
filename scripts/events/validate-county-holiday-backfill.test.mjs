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

test("El Campo Dec 3 2026 Chamber parade is a separate organizer-confirmed Wharton County event",()=>{
 const e=events.find(x=>x.slug==="el-campo-chamber-christmas-parade-2026");
 assert.ok(e);
 assert.equal(e.city,"El Campo");
 assert.equal(e.countySlug,"wharton");
 assert.equal(e.countyName,"Wharton County");
 assert.equal(e.startDate,"2026-12-03");
 assert.equal(new URL(e.officialEventUrl).hostname,"www.elcampochamber.com");
 assert.equal(e.sourceVerifiedAt,"2026-11-22");
 assert.match(e.summary,/7–9 p.m./);
 assert.match(e.summary,/route/);
 assert.ok(!events.some(x=>x.slug!==e.slug&&x.city==="El Campo"&&x.startDate===e.startDate&&/parade/i.test(x.title)));
});

test("La Grange Schmeckenfest is dated from a 2026 Chamber and city organizer listing and scoped to Fayette County",()=>{
  const slug="la-grange-schmeckenfest-wassail-festival-2026";
  const e=events.find(item=>item.slug===slug);
  assert.ok(e,"Missing verified Schmeckenfest 2026 occurrence");
  assert.equal(e.city,"La Grange");
  assert.equal(e.countySlug,"fayette");
  assert.equal(e.countyName,"Fayette County");
  assert.equal(e.startDate,"2026-12-03");
  assert.equal(e.endDate,undefined,"Do not extend festival to invented overnight dates");
  assert.equal(new URL(e.officialEventUrl).hostname,"business.lagrangetx.org");
  assert.equal(e.sourceVerifiedAt,"2026-11-22");
  assert.match(e.summary,/5 to 8 p\.m\./);
  assert.ok(e.venueName.includes("Courthouse"));
  assert.equal(events.filter(item=>item.slug===slug).length,1,"No duplicate festival entries");
});

test("The 2026 Czech Christmas Open House is directly published by its La Grange organizer, separate from Schmeckenfest",()=>{
  const e=events.find(x=>x.slug==="la-grange-texas-czech-christmas-open-house-2026");
  const downtown=events.find(x=>x.slug==="la-grange-schmeckenfest-wassail-festival-2026");
  assert.ok(e&&downtown);
  assert.equal(e.countySlug,"fayette");
  assert.equal(e.countyName,"Fayette County");
  assert.equal(e.startDate,"2026-12-05");
  assert.equal(new URL(e.officialEventUrl).hostname,"czechtexas.org");
  assert.equal(e.sourceVerifiedAt,"2026-11-22");
  assert.match(e.summary,/Admission is free/);
  assert.match(e.venueName,/Fairgrounds Road/);
  assert.equal(downtown.startDate,"2026-12-03");
  assert.notEqual(e.venueName,downtown.venueName,"Different Fayette sites may not be collapsed into a single event");
});

test("Two distinct Huntsville, Walker County 2026 holiday occurrences use the original city organizer", () => {
  const facts = [
    ["huntsville-main-street-downtown-christmas-fair-2026","2026-12-05","www.huntsvilletx.gov"],
    ["huntsville-city-movie-park-rise-guardians-2026","2026-12-11","www.huntsvilletx.gov"],
  ];
  for (const [slug,date,host] of facts){
    const e=events.find(x=>x.slug===slug);
    assert.ok(e,"Missing original city verified Huntsville 2026 event "+slug);
    assert.equal(e.city,"Huntsville");
    assert.equal(e.countySlug,"walker");
    assert.equal(e.countyName,"Walker County");
    assert.equal(e.region,"piney-woods");
    assert.equal(e.startDate,date);
    assert.equal(e.endDate,undefined,"Do not invent a continuous festival window");
    assert.equal(new URL(e.officialEventUrl).hostname,host);
    assert.equal(e.sourceVerifiedAt,"2026-11-22");
    assert.match(e.sourceName,/City of Huntsville/);
  }
  const fair=events.find(x=>x.slug===facts[0][0]);
  const film=events.find(x=>x.slug===facts[1][0]);
  assert.match(fair.summary,/does not state exact opening or closing hours/);
  assert.match(film.summary,/beginning at 6:30 p\.m/);
  assert.match(film.summary,/free holiday Movie in the Park/);
  assert.ok(!events.some(x=>x.slug!==film.slug&&x.city==="Huntsville"&&x.startDate==="2026-12-11"&&/Movie in the Park/i.test(x.title)));
});

test("San Saba Chamber's first tree lighting and December movie retain different exact organizer dates", () => {
  const cases=[
    ["san-saba-first-community-christmas-tree-lighting-2026","2026-11-27",
      "www.sansabachamber.com"],
    ["san-saba-chamber-christmas-movie-mill-pond-2026","2026-12-11",
      "www.sansabachamber.com"]
  ];
  for(const [slug,date,host]of cases){
    const e=events.find(x=>x.slug===slug);
    assert.ok(e,"Missing original San Saba Chamber 2026 edition "+slug);
    assert.equal(e.countySlug,"san-saba");
    assert.equal(e.countyName,"San Saba County");
    assert.equal(e.startDate,date);
    assert.equal(e.endDate,undefined,"No assumed festival season or invented all-day event");
    assert.equal(e.sourceVerifiedAt,"2026-11-22");
    assert.equal(new URL(e.officialEventUrl).hostname,host);
    assert.ok(e.sourceName.includes("Chamber"));
  }
  const tree=events.find(x=>x.slug===cases[0][0]);
  const movie=events.find(x=>x.slug===cases[1][0]);
  const parade=events.find(x=>x.slug==="san-saba-sip-stroll-lighted-christmas-parade-2026");
  assert.ok(parade);
  assert.equal(parade.startDate,"2026-12-12");
  assert.match(tree.summary,/free and open to everyone/);
  assert.match(movie.summary,/does not identify the film title/);
  assert.equal(events.filter(e=>e.slug===tree.slug).length,1);
});

test("Decatur, Jasper and Hopkins 2026 holiday editions retain original organizer dates without inventing hours",()=>{
  const cases=[
    ["decatur-chamber-2026-tree-lighting-town-square","wise","2026-12-01","www.decaturtx.com"],
    ["decatur-chamber-2026-lighted-christmas-parade","wise","2026-12-05","www.decaturtx.com"],
    ["jasper-texas-christmas-in-the-park-2026","jasper","2026-11-28","www.jaspertx.org"],
    ["sulphur-springs-downtown-hot-cocoa-crawl-2026","hopkins","2026-12-12","ssdba.org"]
  ];
  for(const [slug,county,date,host] of cases){
    const e=events.find(x=>x.slug===slug);
    assert.ok(e,"Missing first-party dated current Christmas event "+slug);
    assert.equal(e.countySlug,county);
    assert.equal(e.startDate,date);
    assert.equal(e.endDate,undefined,"An individual holiday evening must not be treated as continuous or multiday");
    assert.equal(e.sourceVerifiedAt,"2026-11-22");
    assert.equal(new URL(e.officialEventUrl).hostname,host);
  }
  const tree=events.find(x=>x.slug===cases[0][0]);
  const parade=events.find(x=>x.slug===cases[1][0]);
  const jasper=events.find(x=>x.slug===cases[2][0]);
  const crawl=events.find(x=>x.slug===cases[3][0]);
  assert.match(tree.summary,/6 p\.m\./);
  assert.match(parade.summary,/entry fee applies to parade entrants/);
  assert.match(parade.summary,/December 7 rain date/);
  assert.match(jasper.summary,/does not specify the main festival.s start or end time/);
  assert.match(jasper.venueName,/Sandy Creek Park/);
  assert.match(crawl.summary,/does not provide exact festival start\/end times/);
  assert.ok(events.filter(x=>x.countySlug==="hopkins"&&x.title.includes("Christmas in the Park")).length>=2,
    "Retain the two original museum edition dates, no replacements");
});

test("Gilmer Texas Yulefest has independent first-party Dec 5, 2026 evidence and Upshur county attribution",()=>{
  const e=events.find(e=>e.slug==="gilmer-upshur-yulefest-2026");
  assert.ok(e,"Missing original East Texas Yamboree organizer evidence for Gilmer");
  assert.equal(e.startDate,"2026-12-05");
  assert.equal(e.endDate,undefined,"A one-day festival has no inferred overnight/multiday run");
  assert.equal(e.countySlug,"upshur");
  assert.equal(e.countyName,"Upshur County");
  assert.equal(e.region,"piney-woods");
  assert.equal(e.city,"Gilmer");
  assert.equal(new URL(e.officialEventUrl).hostname,"yamboree.com");
  assert.equal(e.sourceVerifiedAt,"2026-11-22");
  assert.match(e.summary,/not Gilmer County, Georgia/);
  assert.match(e.summary,/does not confirm precise public hours/);
  assert.ok(e.summary.length>110);
  assert.equal(events.filter(e=>e.slug==="gilmer-upshur-yulefest-2026").length,1);
});

test("Fairfield 2026 holiday celebrations are two dated Chamber editions, not a fabricated multiweek festival",()=>{
  const cases=[
    ["fairfield-freestone-christmas-on-the-square-2026","2026-12-05"],
    ["fairfield-freestone-jingle-all-the-way-2026","2026-12-19"],
  ];
  for(const [slug,date] of cases){
    const event=events.find(e=>e.slug===slug);
    assert.ok(event,"Missing Fairfield 2026 official Chamber event "+slug);
    assert.equal(event.startDate,date);
    assert.equal(event.endDate,undefined);
    assert.equal(event.countySlug,"freestone");
    assert.equal(event.countyName,"Freestone County");
    assert.equal(event.city,"Fairfield");
    assert.equal(event.region,"prairies-lakes");
    assert.equal(event.sourceVerifiedAt,"2026-11-22");
    assert.equal(new URL(event.officialEventUrl).hostname,"fliphtml5.com");
    assert.match(event.sourceName,/Fairfield Chamber/);
    assert.match(event.venueName,/118 East Commerce Street/);
    assert.match(event.summary,/confirm|inconsistent/);
  }
  assert.equal(events.filter(e=>e.countySlug==="freestone").length,3, "Keep both established Fairfield events and the distinct Dec 3 shopping edition");
});


test("Gatesville December 5, 2026 Christmas on Marshall Street uses a dated first-party Coryell source",()=>{
  const event=events.find(e=>e.slug==="gatesville-christmas-on-marshall-street-2026");
  assert.ok(event,"Missing Gatesville official 2026 community Christmas event");
  assert.equal(event.startDate,"2026-12-05");
  assert.equal(event.endDate,undefined);
  assert.equal(event.countySlug,"coryell");
  assert.equal(event.countyName,"Coryell County");
  assert.equal(event.city,"Gatesville");
  assert.equal(event.region,"prairies-lakes");
  assert.equal(event.sourceVerifiedAt,"2026-11-22");
  assert.equal(new URL(event.officialEventUrl).hostname,"www.gatesvilleisd.org");
  assert.match(event.summary,/10 a\.m\./);
  assert.match(event.summary,/event end time/);
  assert.match(event.summary,/Christmas at the Ballpark/);
  assert.equal(events.filter(e=>e.slug===event.slug).length,1);
});


test("Fairfield Chamber November 2026 newsletter conflicting time labels must not become unsupported event hours",()=>{
  const square=events.find(e=>e.slug==="fairfield-freestone-christmas-on-the-square-2026");
  const jingle=events.find(e=>e.slug==="fairfield-freestone-jingle-all-the-way-2026");
  assert.match(square.summary,/inconsistent overall activity start times/);
  assert.match(square.summary,/3 p\.m\./);
  assert.match(square.summary,/4 p\.m\./);
  assert.match(square.summary,/6 p\.m\. city tree lighting/);
  assert.match(jingle.summary,/1–4 p\.m\./);
  assert.equal(square.officialEventUrl,jingle.officialEventUrl);
});


test("Downtown Crockett's independently dated 2026 holiday homes tour is safely represented in Houston County", () => {
  const e = events.find(e => e.slug === "crockett-holiday-tour-of-homes-2026");
  assert.ok(e, "No Downtown Crockett holiday organizer publication");
  assert.equal(events.filter(e => e.slug === "crockett-holiday-tour-of-homes-2026").length, 1);
  assert.equal(e.startDate, "2026-12-05");
  assert.equal(e.endDate, undefined);
  assert.equal(e.countySlug, "houston");
  assert.equal(e.countyName, "Houston County");
  assert.equal(e.city, "Crockett");
  assert.equal(e.region, "piney-woods");
  assert.equal(e.sourceVerifiedAt, "2026-11-22");
  assert.equal(new URL(e.officialEventUrl).hostname, "www.discovercrocketttx.com");
  assert.match(e.venueName, /715 East Goliad Avenue/);
  assert.match(e.summary, /noon to 4 p.m./);
  assert.match(e.summary, /\$15 tickets/);
  assert.match(e.summary, /No 2027 edition date or photo permission is inferred/);
});

test("Rains County 2026 Emory Christmas is grounded in the city's own current announcement, not a 2027 rollover", () => {
  const e=events.find(x=>x.slug==="emory-christmas-around-the-park-2026");
  assert.ok(e,"The City of Emory confirmed a December 5, 2026 local celebration");
  assert.equal(events.filter(x=>x.slug===e.slug).length,1);
  assert.equal(e.countySlug,"rains");
  assert.equal(e.countyName,"Rains County");
  assert.equal(e.city,"Emory");
  assert.equal(e.region,"prairies-lakes");
  assert.equal(e.startDate,"2026-12-05");
  assert.equal(e.endDate,undefined,"Single-day city event is not a fabricated festival weekend");
  assert.equal(e.sourceVerifiedAt,"2026-11-22");
  assert.equal(new URL(e.officialEventUrl).hostname,"www.cityofemory.com");
  assert.match(e.sourceName,/City of Emory/);
  assert.match(e.summary,/Christmas Around the Park/);
  assert.match(e.summary,/noon/);
  assert.match(e.summary,/7 p.m./);
  assert.match(e.summary,/or 2027 date/i, "The City's 2026 announcement does not authorize a 2027 date");
  assert.match(e.summary,/exact park site/);
  assert.ok(e.summary.length>210);
});

test("Fairfield Chamber's own November 2026 schedule confirms a separate Dec 3 Sip Snack Shop without 2027 or time guesses",()=>{
  const e=events.find(x=>x.slug==="fairfield-holiday-sip-snack-shop-december-2026");
  assert.ok(e,"Missing original-publisher Fairfield 2026 Dec 3 holiday shopping event");
  assert.equal(events.filter(x=>x.slug===e.slug).length,1);
  assert.equal(e.title,"Fairfield Holiday Sip, Snack & Shop");
  assert.equal(e.startDate,"2026-12-03");
  assert.equal(e.endDate,undefined,"One Thursday evening shopping promotion is not a multi-day festival");
  assert.equal(e.city,"Fairfield");
  assert.equal(e.countySlug,"freestone");
  assert.equal(e.countyName,"Freestone County");
  assert.equal(e.region,"prairies-lakes");
  assert.equal(e.sourceVerifiedAt,"2026-11-22");
  assert.equal(e.officialEventUrl,"https://fliphtml5.com/rxipz/2026-November-Newsletter/");
  assert.match(e.sourceName,/Fairfield Chamber/);
  assert.match(e.summary,/before Christmas on the Square on December 5/);
  assert.match(e.summary,/different dates for the separate Christmas on Commerce promotion/);
  assert.match(e.summary,/No 2027 edition or photo-use permission is inferred/);
  assert.ok(!/5:00\s?PM\s?[-–]\s?7:30\s?PM/.test(e.summary),
    "Conflicting newsletter column layout cannot be presented as indisputable operating hours");
  assert.equal(events.filter(x=>x.countySlug==="freestone").length,3);
});

test("Pearsall City's dated 2026 parade and tamale contest adds real Frio County holiday coverage without inventing hours or recurrence",()=>{
  const e=events.find(x=>x.slug==="pearsall-twelve-days-of-christmas-parade-tamales-2026");
  assert.ok(e,"Missing City of Pearsall first-party Dec 4, 2026 Christmas announcement");
  assert.equal(events.filter(x=>x.slug===e.slug).length,1);
  assert.equal(e.countySlug,"frio");
  assert.equal(e.countyName,"Frio County");
  assert.equal(e.city,"Pearsall");
  assert.equal(e.region,"south-texas");
  assert.equal(e.startDate,"2026-12-04");
  assert.equal(e.endDate,undefined,"Separate decorating contest on December 2 does not make this a multiday Dec 2–4 parade");
  assert.equal(e.sourceVerifiedAt,"2026-11-22");
  assert.equal(e.officialEventUrl,"https://www.cityofpearsall.org/news_detail_T8_R63.php");
  assert.match(e.sourceName,/City of Pearsall/);
  assert.match(e.summary,/Friday, December 4, 2026/);
  assert.match(e.summary,/Tamale Contest/);
  assert.match(e.summary,/holiday vendor opportunities/);
  assert.match(e.summary,/December 2, 2026/);
  assert.match(e.summary,/does not independently establish public start\/end hours/);
  assert.match(e.summary,/any 2027 edition/);
  assert.ok(!/\bparade at (?:[0-9]|noon)/i.test(e.summary),
    "No exact parade hour was independently confirmed by the City's 2026 press notice");
  assert.equal(events.filter(x=>x.countySlug==="frio").length,1);
});

test("Copperas Cove Chamber dates the 32nd Krist Kindl Markt Dec 4–6, 2026 with original hours and parade, independent of Gatesville",()=>{
  const e=events.find(x=>x.slug==="copperas-cove-krist-kindl-markt-2026");
  assert.ok(e,"Missing organizer-confirmed 2026 Copperas Cove community holiday");
  assert.equal(events.filter(x=>x.slug===e.slug).length,1);
  assert.equal(e.title,"32nd Annual Copperas Cove Krist Kindl Markt & Lighted Parade");
  assert.equal(e.startDate,"2026-12-04");
  assert.equal(e.endDate,"2026-12-06");
  assert.equal(e.countySlug,"coryell");
  assert.equal(e.countyName,"Coryell County");
  assert.equal(e.city,"Copperas Cove");
  assert.equal(e.region,"prairies-lakes");
  assert.equal(e.sourceVerifiedAt,"2026-11-22");
  assert.equal(e.officialEventUrl,"https://copperascove.glueup.com/event/32nd-annual-krist-kindl-markt-189528/");
  assert.match(e.sourceName,/Copperas Cove Chamber/);
  assert.match(e.summary,/Friday 4–10 p.m./);
  assert.match(e.summary,/Saturday 10 a.m.–10 p.m./);
  assert.match(e.summary,/Sunday 10 a.m.–3 p.m./);
  assert.match(e.summary,/Tree Lighting starts 6:30 p.m./);
  assert.match(e.summary,/Saturday December 5 lighted Krist Kindl Parade starts 6 p.m./);
  assert.match(e.summary,/no copied event photography or 2027 date is inferred/);
  assert.ok(e.summary.includes("other parts of Copperas Cove extend into Lampasas and Bell counties"));
  assert.ok(events.some(x=>x.slug==="gatesville-christmas-on-marshall-street-2026"),
    "Keep separately confirmed Gatesville 2026 event even though both occur in Coryell County");
  assert.equal(events.filter(x=>x.countySlug==="coryell").length,2,
    "Copperas Cove three-day festival and Gatesville single-day community Christmas are distinct");
});

test("Muleshoe Chamber original 2026 parade poster confirms Dec 12 and a 6pm start without invented fees or next-year edition",()=>{
  const slug="muleshoe-wonderland-christmas-parade-2026";
  const e=events.find(x=>x.slug===slug);
  assert.ok(e,"Muleshoe Chamber official 2026 Christmas poster is missing");
  assert.equal(events.filter(x=>x.slug===slug).length,1);
  assert.equal(e.countySlug,"bailey");
  assert.equal(e.countyName,"Bailey County");
  assert.equal(e.region,"panhandle");
  assert.equal(e.city,"Muleshoe");
  assert.equal(e.startDate,"2026-12-12");
  assert.equal(e.endDate,undefined,"A single Saturday parade is not a month-long festival");
  assert.equal(e.sourceVerifiedAt,"2026-11-22");
  assert.equal(e.officialEventUrl,"https://muleshoetxchamber.com/");
  assert.match(e.sourceName,/Muleshoe Chamber/);
  assert.match(e.summary,/5:30 p\.m\./);
  assert.match(e.summary,/6 p\.m\./);
  assert.match(e.summary,/Muleshoe Senior Center/);
  assert.match(e.summary,/hot chocolate and cookies/);
  assert.match(e.summary,/no parade-participant registration is required/);
  assert.match(e.summary,/not an independently confirmed spectator admission price/);
  assert.match(e.summary,/a 2027 date/);
  assert.match(e.summary,/license to reuse its poster/);
  assert.ok(e.summary.length>250,"Preserve original program details without duplicate annual filler");
});

test("Henrietta city confirms one distinct Chamber-organized Sunday Dec 6 2026 Clay County Christmas Parade",()=>{
 const x=events.find(e=>e.slug==="henrietta-clay-county-christmas-parade-2026");
 assert.ok(x);
 assert.equal(events.filter(e=>e.slug===x.slug).length,1);
 assert.equal(x.title,"Clay County Christmas Parade in Henrietta");
 assert.equal(x.startDate,"2026-12-06");
 assert.equal(x.endDate,undefined,"No invented second event date");
 assert.equal(x.city,"Henrietta");
 assert.equal(x.countySlug,"clay");
 assert.equal(x.countyName,"Clay County");
 assert.equal(x.region,"prairies-lakes");
 assert.equal(x.sourceVerifiedAt,"2026-11-22");
 assert.equal(x.officialEventUrl,"https://cityofhenrietta.com/event/clay-county-christmas-parade/");
 assert.match(x.sourceName,/City of Henrietta/);
 assert.match(x.sourceName,/Clay County Chamber/);
 assert.match(x.summary,/6 p\.m\./);
 assert.match(x.summary,/does not identify an exact spectator route/);
 assert.match(x.summary,/No 2027 edition date/);
 assert.match(x.summary,/image reuse permission/);
});

test("City of Pittsburg confirms Dec 4 2026 one-hour Power Wheel Parade distinct from Dec 5 Storybook Christmas",()=>{
 const x=events.find(e=>e.slug==="pittsburg-christmas-power-wheel-parade-2026");
 assert.ok(x,"Original dated City of Pittsburg Power Wheel event missing");
 assert.equal(events.filter(e=>e.slug===x.slug).length,1);
 assert.equal(x.startDate,"2026-12-04");
 assert.equal(x.endDate,undefined);
 assert.equal(x.city,"Pittsburg");
 assert.equal(x.countySlug,"camp");
 assert.equal(x.countyName,"Camp County");
 assert.equal(x.region,"piney-woods");
 assert.equal(x.officialEventUrl,"https://visit.pittsburgtx.gov/events/christmas-power-wheel-parade");
 assert.equal(x.sourceVerifiedAt,"2026-11-22");
 assert.match(x.sourceName,/City of Pittsburg Tourism/);
 assert.match(x.summary,/from 5 to 6 p\.m\./);
 assert.match(x.summary,/does not separately specify the parade lineup/);
 assert.match(x.venueName,/200 Rusk Street/,"Publisher-provided City event address must be represented with no asserted parade route");
 assert.match(x.summary,/December 5 A Storybook Christmas/);
 assert.match(x.summary,/does not grant photo reuse rights or establish a 2027 edition/);
 const camp=events.filter(e=>e.countySlug==="camp");
 assert.ok(camp.some(e=>e.slug==="pittsburg-storybook-christmas-2026"&&e.startDate==="2026-12-05"));
 assert.equal(camp.filter(e=>/pittsburg-(?:storybook|christmas-power-wheel)/.test(e.slug)).length,2);
});


test("Post Chamber original 2026 community calendar confirms Dec 5 Lighted Christmas Parade and Light Up Post without timing guesses",()=>{
 const e=events.find(e=>e.slug==="post-lighted-christmas-parade-light-up-post-2026");
 assert.ok(e,"Verified Post holiday must appear on statewide and Garza County event lifecycle");
 assert.equal(events.filter(x=>x.slug===e.slug).length,1);
 assert.equal(e.countySlug,"garza");
 assert.equal(e.countyName,"Garza County");
 assert.equal(e.city,"Post");
 assert.equal(e.startDate,"2026-12-05");
 assert.equal(e.endDate,undefined);
 assert.equal(e.region,"panhandle");
 assert.equal(e.officialEventUrl,"https://postcitytexas.com/2026-community-calendar-2/");
 assert.match(e.sourceName,/Post Area Chamber/);
 assert.match(e.summary,/does not specify a start time/);
 assert.match(e.summary,/subject to change/);
 assert.match(e.summary,/No 2027 schedule or photograph reuse permission/);
});
