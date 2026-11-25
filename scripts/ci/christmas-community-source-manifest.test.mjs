import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  readVerifiedChristmasOccurrenceSources,
  parseChristmasOccurrenceLiteral,
  activeVerifiedChristmasOccurrences,
} from "./christmas-community-source-manifest.mjs";

test("production Christmas source count includes the full separately published county backfill, never just the old manifest", () => {
  const { primary, countyBackfill, combined } = readVerifiedChristmasOccurrenceSources();
  assert.ok(primary.length >= 264);
  assert.ok(countyBackfill.length >= 95, "At least 95 original 2026 source-qualified county holiday occurrences must be counted");
  assert.equal(combined.length, primary.length + countyBackfill.length);
  const date = "2026-11-23";
  const active = activeVerifiedChristmasOccurrences(date);
  assert.equal(active.length,
    combined.filter((x) => (x.endDate ?? x.startDate) >= date).length);
  assert.equal(active.length,
    primary.filter(x => (x.endDate ?? x.startDate) >= date).length +
    countyBackfill.filter(x => (x.endDate ?? x.startDate) >= date).length);
  assert.ok(active.length > primary.filter(x => (x.endDate ?? x.startDate) >= date).length,
    "Historical regression: the Nov 23 production gate ignored 95 current county additions and expected 240 instead of 335");
  for (const slug of ["gilmer-upshur-yulefest-2026", "post-lighted-christmas-parade-light-up-post-2026"])
    assert.ok(active.some(x => x.slug === slug), "New source-qualified county holiday missing: " + slug);
  assert.equal(new Set(combined.map(x=>x.slug + ":" + x.startDate)).size, combined.length);
});

test("production verifier is aligned to the actual live two-manifest renderer and includes both county-source witnesses", () => {
  const renderer = readFileSync("src/data/events/christmas-community-2026.server.ts", "utf8");
  const verifier = readFileSync("scripts/ci/verify-christmas-hub-production.mjs", "utf8");
  assert.match(renderer, /return \[\.\.\.verifiedOccurrences, \.\.\.verifiedCountyChristmasEvents2026\]/);
  assert.match(verifier, /const remainingCommunityEvents = activeVerifiedChristmasOccurrences\(date\);/);
  assert.match(verifier, /"gilmer-upshur-yulefest-2026"/);
  assert.match(verifier, /"post-lighted-christmas-parade-light-up-post-2026"/);
  assert.doesNotMatch(verifier, /const allCommunityEvents = JSON\.parse\(literal\)/,
    "Single-manifest production count caused a false GitHub postdeploy failure");
});

test("source parser fails closed on absent backfill, malformed date ranges and collisions", () => {
  assert.throws(() => parseChristmasOccurrenceLiteral("const verifiedOccurrences=[]", "wrong marker"), /marker not found/);
  assert.throws(() => parseChristmasOccurrenceLiteral("const verifiedOccurrences = [];",
    "const verifiedOccurrences"), /array boundaries missing|literal must contain events/);
  const invalid = 'const verifiedOccurrences = [\n{"slug":"bad-date","title":"Bad event","startDate":"2026-12-10","endDate":"2026-12-05"}\n];';
  assert.throws(() => parseChristmasOccurrenceLiteral(invalid, "const verifiedOccurrences"), /Invalid dated/);
  assert.throws(() => activeVerifiedChristmasOccurrences("Nov 23, 2026"), /YYYY-MM-DD/);
});

test("date-scoped Christmas count removes expired original and backfill events without projecting a future year", () => {
  const { combined } = readVerifiedChristmasOccurrenceSources();
  let previous = Number.POSITIVE_INFINITY;
  for(const day of ["2026-10-23","2026-11-22","2026-11-23","2026-12-01","2026-12-25","2027-01-05"]){
    const active = activeVerifiedChristmasOccurrences(day);
    assert.equal(active.length, combined.filter(e=>(e.endDate??e.startDate)>=day).length);
    assert.ok(active.length <= previous, "Dates must stop appearing after last verified day");
    previous = active.length;
  }
});


test("Hughes Springs Chamber original 2026 two consecutive Cass County Christmas programs are date-gated and never misattributed to Morris",()=>{
 const { countyBackfill, combined }=readVerifiedChristmasOccurrenceSources();
 const e=countyBackfill.find(x=>x.slug==="hughes-springs-christmas-parade-and-christmas-in-park-2026");
 assert.ok(e,"Original Hughes Springs Chamber Dec 5 2026 holiday visitor itinerary missing");
 assert.equal(e.title,"Hughes Springs Christmas Parade & Christmas in the Park");
 assert.equal(e.countySlug,"cass","Hughes Springs specific downtown original Chamber events are Cass County, not Morris");
 assert.equal(e.startDate,"2026-12-05");
 assert.equal(e.endDate,undefined,"Do not invent a multi-day Christmas celebration");
 assert.equal(e.city,"Hughes Springs");
 assert.equal(e.officialEventUrl,"https://www.hschamber.org/events");
 assert.match(e.summary,/5–6 p\.m\./);
 assert.match(e.summary,/6–7 p\.m\./);
 assert.match(e.summary,/HSISD parking lot/);
 assert.match(e.summary,/Spring Park/);
 assert.ok(activeVerifiedChristmasOccurrences("2026-12-05").some(x=>x.slug===e.slug));
 assert.ok(!activeVerifiedChristmasOccurrences("2026-12-06").some(x=>x.slug===e.slug));
 assert.ok(!combined.some(x=>x.slug===e.slug&&x!==e));
 assert.equal(new Set(combined.map(x=>x.slug+":"+x.startDate)).size,combined.length);
});


test("Dec 11 downtown Canton Sip & Shop and Dec 12 Christmas Parade are separate organizer-confirmed 2026 county dates",()=>{
 const {countyBackfill,combined}=readVerifiedChristmasOccurrenceSources();
 const sip=countyBackfill.find(e=>e.slug==="canton-main-street-december-2026-sip-shop");
 const parade=countyBackfill.find(e=>e.slug==="canton-main-street-storybook-christmas-parade-2026");
 assert.ok(sip&&parade);
 assert.equal(sip.startDate,"2026-12-11");
 assert.equal(parade.startDate,"2026-12-12");
 assert.equal(sip.countySlug,"van-zandt");
 assert.equal(parade.countySlug,"van-zandt");
 assert.match(sip.summary,/from 5 to 8 p\.m\./);
 assert.ok(activeVerifiedChristmasOccurrences("2026-12-11").some(e=>e.slug===sip.slug));
 assert.ok(!activeVerifiedChristmasOccurrences("2026-12-12").some(e=>e.slug===sip.slug),
   "Do not inflate the Dec 11 evening into the following Dec 12 Christmas parade");
 assert.equal(combined.filter(x=>x.slug===sip.slug).length,1);
});


test("Goodnight Ranch November workshop and December free open house are first-party confirmed 2026 Armstrong holiday occurrences",()=>{
 const {countyBackfill,combined}=readVerifiedChristmasOccurrenceSources();
 const rows=["goodnight-ranch-edwardian-ornament-workshop-2026","goodnight-ranch-pioneer-christmas-open-house-2026"]
  .map(slug=>countyBackfill.find(x=>x.slug===slug));
 assert.ok(rows.every(Boolean));
 assert.equal(rows[0].startDate,"2026-11-28");assert.equal(rows[1].startDate,"2026-12-05");
 for(const e of rows){assert.equal(e.countySlug,"armstrong");assert.equal(e.endDate,undefined);
  assert.equal(combined.filter(x=>x.slug===e.slug).length,1);
  assert.ok(activeVerifiedChristmasOccurrences(e.startDate).some(x=>x.slug===e.slug));
 }
 assert.ok(!activeVerifiedChristmasOccurrences("2026-11-29").some(x=>x.slug===rows[0].slug));
 assert.ok(!activeVerifiedChristmasOccurrences("2026-12-06").some(x=>x.slug===rows[1].slug));
});


test("Mission Tejas December 2026 park holiday programs use original dated detail URLs and expire independently",()=>{
 const {countyBackfill,combined}=readVerifiedChristmasOccurrenceSources();
 const cases=[["mission-tejas-holiday-hot-chocolate-ranger-2026","2026-12-12","holiday-hot-chocolate-with-a-ranger",/7–8 p\.m\./],["mission-tejas-christmas-ornaments-2026","2026-12-19","tejas-christmas-ornaments",/1:30–3:30 p\.m\./]];
 for(const [slug,date,urlSuffix,time] of cases){
  const e=countyBackfill.find(x=>x.slug===slug);
  assert.ok(e); assert.equal(e.countySlug,"houston"); assert.equal(e.city,"Grapeland"); assert.equal(e.startDate,date); assert.equal(e.endDate,undefined);
  assert.equal(e.sourceName,"Texas Parks and Wildlife Department");
  assert.equal(e.officialEventUrl,"https://tpwd.texas.gov/calendar/mission-tejas/"+urlSuffix);
  assert.match(e.summary,time); assert.match(e.summary,/\$4 per person/); assert.match(e.summary,/12 and younger/);
  assert.equal(combined.filter(x=>x.slug===slug).length,1);
  assert.ok(activeVerifiedChristmasOccurrences(date).some(x=>x.slug===slug));
  const next=new Date(date+"T12:00:00Z");next.setUTCDate(next.getUTCDate()+1);
  assert.ok(!activeVerifiedChristmasOccurrences(next.toISOString().slice(0,10)).some(x=>x.slug===slug));
 }
 const adapter=readFileSync("src/data/events/texas-event-records.server.ts","utf8");
 assert.match(adapter,/alreadyCoveredByOfficialPark/);
 assert.match(adapter,/record\.sourceName === "Texas Parks and Wildlife Department"/);
});


test("2026 state historic-site holiday programs and Big Spring ballet retain source-specific geography, dates and expiry", () => {
 const {countyBackfill,combined}=readVerifiedChristmasOccurrenceSources();
 const cases=[
  ["fort-lancaster-frontier-ornament-workshop-2026","crockett","Sheffield","2026-12-19","https://thc.texas.gov/holidays-state-historic-sites",/1 to 3 p\.m\./],
  ["fort-mckavett-victorian-christmas-2026","menard","Fort McKavett","2026-12-12","https://thc.texas.gov/events/victorian-christmas-1",/10 a\.m\. to 4 p\.m\./],
  ["big-spring-symphony-nutcracker-2026","howard","Big Spring","2026-12-19","https://bigspringsymphony.org/season-letter/",/5:30 p\.m\./],
 ];
 for (const [slug,county,city,date,url,time] of cases) {
  const e=countyBackfill.find(x=>x.slug===slug);
  assert.ok(e,slug);
  assert.equal(e.countySlug,county);
  assert.equal(e.city,city);
  assert.equal(e.startDate,date);
  assert.equal(e.endDate,undefined);
  assert.equal(e.officialEventUrl,url);
  assert.equal(e.sourceVerifiedAt,"2026-11-24");
  assert.match(e.summary,time);
  assert.equal(combined.filter(x=>x.slug===slug).length,1);
  assert.ok(activeVerifiedChristmasOccurrences(date).some(x=>x.slug===slug));
  assert.ok(!activeVerifiedChristmasOccurrences(date==="2026-12-12"?"2026-12-13":"2026-12-20").some(x=>x.slug===slug));
 }
});


test("2026 Throckmorton Cow Country Christmas is a single verified courthouse-square occurrence with vendor charges distinguished from spectator fees",()=>{
 const {countyBackfill,combined}=readVerifiedChristmasOccurrenceSources();
 const slug="throckmorton-cow-country-christmas-2026";
 const e=countyBackfill.find(x=>x.slug===slug);assert.ok(e);assert.equal(e.countySlug,"throckmorton");assert.equal(e.startDate,"2026-12-12");assert.equal(e.endDate,undefined);assert.equal(e.sourceVerifiedAt,"2026-11-24");assert.equal(e.officialEventUrl,"https://www.throckmortonchamber.com/copy-of-cow-country-christmas");assert.match(e.summary,/2 to 6 p\.m\./);assert.match(e.summary,/vendor charges, not spectator admission/);assert.equal(combined.filter(x=>x.slug===slug).length,1);assert.ok(activeVerifiedChristmasOccurrences("2026-12-12").some(x=>x.slug===slug));assert.ok(!activeVerifiedChristmasOccurrences("2026-12-13").some(x=>x.slug===slug));
});


test("Winkler County has two independently verified 2026 holiday occurrences without inferred parade or race start times",()=>{
 const {countyBackfill,combined}=readVerifiedChristmasOccurrenceSources();
 const cases=[["wink-christmas-parade-2026","Wink","2026-12-04","https://cityofwink.com/news-detail?item_id=36162",/does not establish a parade time or route/],["kermit-elf-run-2026","Kermit","2026-12-12","https://runsignup.com/Race/TX/Kermit/elfrunkermittx",/packet pickup from 7:30 to 8:15 a\.m\./]];
 for(const [slug,city,date,url,detail] of cases){const e=countyBackfill.find(x=>x.slug===slug);assert.ok(e);assert.equal(e.countySlug,"winkler");assert.equal(e.region,"big-bend");assert.equal(e.city,city);assert.equal(e.startDate,date);assert.equal(e.endDate,undefined);assert.equal(e.sourceVerifiedAt,"2026-11-24");assert.equal(e.officialEventUrl,url);assert.match(e.summary,detail);assert.equal(combined.filter(x=>x.slug===slug).length,1);assert.ok(activeVerifiedChristmasOccurrences(date).some(x=>x.slug===slug));assert.ok(!activeVerifiedChristmasOccurrences(date==="2026-12-04"?"2026-12-05":"2026-12-13").some(x=>x.slug===slug));}
});
