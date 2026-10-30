import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { targets, verifySource, inspect } from "./check-november-event-sources.mjs";

const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");

test("watcher accepts 2026 organizer windows, rejects stale and missing dates", () => {
  const johnson = targets.find((target) => target.name === "Johnson City Lights Spectacular");
  const southPole = targets.find((target) => target.name === "South Pole Illuminated Festival");
  assert(johnson && southPole, "Existing original organizers must remain watched after insertions");
  assert(verifySource("<h1>November 27, 2026 - January 3, 2027</h1>", johnson));
  assert(!verifySource("<p>November 28, 2026 - January 4, 2027</p>", johnson));
  assert(verifySource("<p>November 28 - December 28</p><p>2026 schedule</p>", southPole));
  assert(!verifySource("<p>November 27 - November 29, 2026</p>", southPole));
  const shiner = targets.find((target) => target.name === "Shiner Beer Run 2026 registration");
  assert(shiner);
  assert(verifySource("<p>November 21, 2026</p><p>Marathon Half Marathon 10K 5K</p>", shiner));
  assert(!verifySource("<p>November 21, 2026</p><p>Half Marathon 10K 5K</p>", shiner));
});

test("November collection stays consumer-focused with responsive filters", () => {
  const collections = read("../../src/data/event-temporal-collections.server.ts");
  const block = collections.slice(collections.indexOf('slug: "november-events"'), collections.indexOf('slug: "december-events"'));
  const visitorCopy = [block.match(/lead: "([^"]+)"/)?.[1], ...Array.from(block.matchAll(/"([^"]+)",?\n/g), (m) => m[1])].join(" ");
  assert(!/noindex|indexable|crawl|SEO|thin seasonal page/i.test(visitorCopy));
  const layout = read("../../src/routes/events.$collection.lazy.tsx");
  for (const token of ["NovemberCollectionBrowser", "Filter November events by date", "Filter November events by region", "Filter November events by city", "Filter November events by category", "novemberOfficialPicks"]) {
    assert(layout.includes(token), `Missing November UI token ${token}`);
  }
});


test("November newly confirmed organizer sources preserve split weekend dates", () => {
  const byName = (name) => {
    const target = targets.find((item) => item.name === name);
    assert(target, `Missing organizer watcher for ${name}`);
    return target;
  };
  assert(verifySource("<p>Sunday, November 22, 2026</p>", byName("GM Financial Parade of Lights")));
  assert(!verifySource("<p>Sunday, November 23, 2025</p>", byName("GM Financial Parade of Lights")));
  assert(verifySource("<p>2026 TEXAS CHRISTKINDL MARKET DATES: Nov. 20 – 22, 2026; Nov. 27 – Dec. 23, 2026</p>", byName("Texas Christkindl Market")));
  assert(!verifySource("<p>2026: Nov. 20 – 23 only</p>", byName("Texas Christkindl Market")));
  assert(verifySource("<p>2026 Tour: November 14–15 and November 21–22</p>", byName("Austin Studio Tour")));
  assert(verifySource("<h1>November 14–15 & 21–22, 2026</h1>", byName("Austin Studio Tour")), "Real organizer format omits the second November");
  assert(!verifySource("<h1>November 14–15 & 21–23, 2026</h1>", byName("Austin Studio Tour")), "Date drift must not accept a changed second weekend");
  assert(!verifySource("<p>2026 Tour: November 14–15 only</p>", byName("Austin Studio Tour")));
});

test("November unified filters include organizer picks and honor noncontinuous windows", () => {
  const picks = read("../../src/data/events/november-official-picks-2026.ts");
  const layout = read("../../src/routes/events.$collection.lazy.tsx");
  for (const name of ["GM Financial Parade of Lights", "Texas Christkindl Market", "Austin Studio Tour"]) {
    assert(picks.includes(`name: "${name}"`), `Missing organizer-confirmed November event: ${name}`);
  }
  for (const [start, end] of [
    ["2026-11-20", "2026-11-22"], ["2026-11-27", "2026-12-23"],
    ["2026-11-14", "2026-11-15"], ["2026-11-21", "2026-11-22"]
  ]) {
    assert(picks.includes(`["${start}", "${end}"]`), `Missing separate operating window ${start} to ${end}`);
  }
  assert(layout.includes('const allEvents = [...items, ...officialPicks].sort('));
  assert(layout.includes('String(a.startDate).localeCompare(String(b.startDate))'), "Combined events should be chronological, not append organizer-only entries at the bottom");
  assert(layout.includes('page.path !== "/events/november-events" ? planningPanel : null'), "Do not put planning copy ahead of November filters");
  assert(layout.includes('page.path === "/events/november-events" ? planningPanel : null'), "Preserve planning and sourcing after November results");
  assert(layout.includes("const filtered = allEvents.filter("));
  assert(layout.includes("dateWindows(event).some("));
  assert(layout.includes('event.slug === "a-christmas-affair"'));
  assert(!layout.includes('id="november-more-official-events"'), "Unfiltered duplicate organizer section reappeared");
  assert(layout.includes('Official event details →'));
  assert(layout.includes('requireSelection={page.path === "/events/november-events"}'));
  const booking = read("../../src/components/events/CalendarBookingDiscovery.tsx");
  assert(booking.includes('requireSelection ? "" : "houston"'), "November must not advertise a Houston default to statewide visitors");
  assert(booking.includes('marketplaceHref = display ?'), "Viator link should require a valid selected destination");
  assert(booking.includes('disabled={!market}'), "Do not request products before a market is selected");
  assert(booking.includes("activeMarket === market"), "Stale city tour results must hide when a different destination is selected");
  const loader = read("../../src/data/event-collection-page.server.ts");
  assert(loader.includes("...novemberOfficialPicks.map((event) => event.sourceCheckedAt)"), "Latest November source date must include organizer picks");
});

test("canonical event seasons and title deduplication remain correct", () => {
  const johnson = read("../../src/data/major-event-expanded-authority-tranche45.server.ts");
  const j = johnson.slice(johnson.indexOf('slug: "johnson-city-christmas-lights-spectacular"'));
  assert(j.includes('startDate: "2026-11-27"'));
  assert(j.includes('endDate: "2027-01-03"'));
  const south = read("../../src/data/major-event-expanded-authority-tranche47.server.ts");
  const s = south.slice(south.indexOf('slug: "south-pole-illuminated-festival"'), south.indexOf('slug: "bill-pickett-rodeo-fort-worth"'));
  assert(s.includes('startDate: "2026-11-28"'));
  assert(s.includes('endDate: "2026-12-28"'));
  const page = read("../../src/data/major-event-page.server.ts");
  assert(page.includes('yearQualifiedEventName'));
  const picks = read("../../src/data/events/november-official-picks-2026.ts");
  for (const token of ["ThunderCloud Subs Turkey Trot", "Dallas YMCA Turkey Trot", "Fort Worth YMCA Turkey Trot", "Calaveras de Azúcar Festival"]) assert(picks.includes(token));
});


test("Shiner 2026 race guide includes new full marathon and exact source", () => {
  const index = read("../../src/data/major-event-index.ts");
  const tranche = read("../../src/data/major-event-expanded-authority-tranche44.server.ts");
  const schema = read("../../src/data/major-event-schema-enrichment-batch21.server.ts");
  const guide = tranche.slice(tranche.indexOf('slug: "shiner-beer-run"'));
  for (const token of ["full marathon", "2026-11-21", "runsignup.com/Race/TX/Shiner/ShinerBeerRun", "sourceCheckedAt: \"2026-10-29\""]) assert(guide.includes(token), `Shiner missing ${token}`);
  assert(index.includes("full marathon alongside the 5K"));
  assert(schema.includes("RunSignUp — 2026 race schedule and distances"));
});

test("broader November organizer checks distinguish exact annual dates and event windows", () => {
  const source = (name) => { const match = targets.find((target) => target.name === name); assert(match, `Missing ${name} target`); return match; };
  assert(verifySource("<p>The festival is coming November 5-8, 2026!</p>", source("Rockport Songwriter Festival")));
  assert(!verifySource("<p>November 4-8, 2025</p>", source("Rockport Songwriter Festival")));
  assert(verifySource("<p>Join us Nov. 13-22, 2026 for our special events. Nov. 13-15 at the community center and Nov. 18-22 for the market.</p>", source("A Christmas Affair (Austin)")));
  assert(!verifySource("<p>Nov. 18-22, 2026 market only</p>", source("A Christmas Affair (Austin)")));
  assert(verifySource("<h1>Thursday, November 19th - Saturday, November 21st - 2026</h1>", source("UIL Volleyball State Tournament")));
  assert(!verifySource("<p>November 21, 2025</p>", source("UIL Volleyball State Tournament")));
  assert(verifySource("<p>Nov 27–29, 2026</p>", source("Homestead Fair Waco")));
  assert(!verifySource("<p>Nov 28–30, 2026</p>", source("Homestead Fair Waco")));
  assert(verifySource("<p>SAT NOV 14</p><p>Rain Date SUN NOV 15 2026</p>", source("Houston Diwali")));
});

test("Rockport and Shiner guide tickets and date semantics remain visitor-safe", () => {
  const rockport = read("../../src/data/major-event-expanded-authority-tranche42.server.ts");
  const r = rockport.slice(rockport.indexOf('slug: "rockport-songwriter-festival"'));
  for (const term of ["2026-11-04", "2026-11-08", "free Guy Clark", "November 5–8", "weekend passes sold out", "rockportsongwriterassociation.com/festival"]) {
    assert(r.includes(term), `Rockport missing ${term}`);
  }
  const shiner = read("../../src/data/major-event-expanded-authority-tranche44.server.ts");
  const s = shiner.slice(shiner.indexOf('slug: "shiner-beer-run"'));
  for (const term of ["October 29, 2026", "all four running distances were marked full", "waiting-list option", "runsignup.com/Race/TX/Shiner/ShinerBeerRun"]) {
    assert(s.includes(term), `Shiner missing ${term}`);
  }
});


test("Nutcracker current venue and Dobie sold-out meal sources fail closed", () => {
  const target = (name) => { const found = targets.find(item => item.name === name); assert(found, name); return found; };
  const market = target("Houston Ballet Nutcracker Market venue");
  assert(verifySource("<h1>November 12-15, 2026 | Reliant Center</h1>", market));
  assert(!verifySource("<h1>November 12-15, 2026 | NRG Center</h1>", market));
  const dobie = target("Dobie Dichos sold-out meal");
  assert(verifySource("<h1>Friday, November 6th, 2026</h1><p>Program + Meal</p><p>SOLD OUT</p>", dobie));
  assert(!verifySource("<h1>Friday, November 6th, 2026</h1><p>Program + Meal now available</p>", dobie));
});


test("blocked Houston Ballet organizer uses only exact official venue fallback dates", async () => {
  const market = targets.find(item => item.name === "Houston Ballet Nutcracker Market venue");
  assert(market?.officialFallback, "Blocked organizer needs a host-owned fallback");
  const fallback = market.officialFallback;
  assert(fallback.url === "https://www.reliantpark.com/event/nutcracker-market/");
  assert(verifySource("<h1>November 12, 2026 - November 15, 2026</h1><p>Reliant Center</p>", fallback));
  assert(!verifySource("<h1>November 13, 2026 - November 15, 2026</h1><p>Reliant Center</p>", fallback));
  assert(!verifySource("<h1>November 12, 2026 - November 15, 2026</h1><p>NRG Center</p>", fallback));
  const response = (status, html = "") => ({ ok: status === 200, status, text: async () => html });
  const validVenue = "<h1>November 12, 2026 - November 15, 2026</h1><p>Reliant Center</p>";
  const calls = [];
  const blocked = await inspect(market, async (url) => {
    calls.push(url);
    return url === market.url ? response(403) : response(200, validVenue);
  });
  assert.equal(blocked.status, "match");
  assert.equal(blocked.url, fallback.url);
  assert.equal(blocked.source, "official-venue-fallback");
  assert.deepEqual(calls, [market.url, fallback.url], "Only one precise venue fallback");
  const driftCalls = [];
  const drifted = await inspect(market, async (url) => {
    driftCalls.push(url);
    return response(200, "<h1>November 13-15, 2026 | Reliant Center</h1>");
  });
  assert.equal(drifted.status, "review", "Never hide changed organizer dates with a fallback");
  assert.deepEqual(driftCalls, [market.url], "No fallback after successful but conflicting organizer response");
  const goneCalls = [];
  const gone = await inspect(market, async (url) => { goneCalls.push(url); return response(404); });
  assert.equal(gone.status, "review", "Official organizer 404 requires review");
  assert.deepEqual(goneCalls, [market.url]);
  const invalid = await inspect(market, async (url) => url === market.url ? response(403) : response(200, "<h1>November 12–15, 2025</h1><p>Reliant Center</p>"));
  assert.equal(invalid.status, "review", "Do not accept outdated alternate-host dates");
});

test("November event guide venue and sold-out ticket schema remain aligned", () => {
  const market = read("../../src/data/major-event-expanded-authority-tranche36.server.ts");
  const marketRecord = market.slice(market.indexOf('slug: "houston-ballet-nutcracker-market"'));
  for (const token of ['venue: "Reliant Center (formerly NRG Center)"', 'within Reliant Park', 'One NRG Park', 'sourceCheckedAt: "2026-10-29"']) {
    assert(marketRecord.includes(token), "Market guide missing " + token);
  }
  const dobie = read("../../src/data/major-event-expanded-authority-tranche10.server.ts");
  const dobieGuide = dobie.slice(dobie.indexOf('slug: "dobie-dichos"'), dobie.indexOf('slug: "dallas-holiday-parade"'));
  assert(dobieGuide.includes("Program + Meal tier sold out"));
  assert(dobieGuide.includes("Program Only"));
  const schema = read("../../src/data/major-event-schema-enrichment-batch3.server.ts");
  const block = schema.slice(schema.indexOf('slug: "dobie-dichos"'), schema.indexOf('slug: "dallas-holiday-parade"'));
  assert(!block.includes('usdOffer("Adult program + meal admission"'));
  assert(!block.includes('usdOffer("Child 12 and under program + meal admission"'));
  assert(block.includes('usdOffer("Adult program-only gate admission"'));
});
