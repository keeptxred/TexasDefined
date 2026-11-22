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
  assert.equal(report.candidateCount, 0);
  assert.ok(report.unservedCounties.some(c => c.slug === "borden"));
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
  ];
  assert.ok(roster.size >= 181, "Source mapping must not silently lose reviewed county coverage");
  for (const county of documented)
    assert.ok(roster.has(county), "Missing official event-source mapping for " + county);

  const denison = registry.sources.find(source => source.id === "denison-city-discover");
  assert.ok(denison);
  assert.deepEqual(denison.countySlugs, ["grayson"]);
  assert.match(denison.organization, /City of Denison/);
  const bayCity = registry.sources.find(source => source.id === "bay-city-matagorda-events");
  assert.ok(bayCity?.countySlugs.includes("matagorda"));
});
