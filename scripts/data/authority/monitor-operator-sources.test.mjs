import test from "node:test";
import assert from "node:assert/strict";
import {
  sourceIndex, normalizedSourceFingerprint, reconcile, reviewedAttractionMonitorRows, heritageDestinationMonitorRows, heritageExhibitionDeadlineAlerts,
} from "./monitor-operator-sources.mjs";

const html = (text) => "<html><body><main><h1>Operator experience</h1><p>" +
  text.repeat(10) + "</p><script>token=123</script></main></body></html>";

test("normalization ignores tracking scripts but detects meaningful visitor copy changes", () => {
  const base = html("Published tasting hours, prices, and group guidelines. ");
  assert.equal(normalizedSourceFingerprint(base),
    normalizedSourceFingerprint(base.replace("token=123", "token=456")));
  assert.notEqual(normalizedSourceFingerprint(base),
    normalizedSourceFingerprint(base.replace("group guidelines", "new booking requirement")));
});

test("shared source URL tracks earliest source approval instead of duplicating checks", () => {
  const rows = [
    { id: "a", sourceUrl: "https://winery.example/visit", checkedAt: "2026-11-02" },
    { id: "b", sourceUrl: "https://winery.example/visit", checkedAt: "2026-10-20" },
  ];
  assert.deepEqual(sourceIndex(rows, []), [{url:"https://winery.example/visit",checkedAt:"2026-10-20"}]);
});

test("first read is a baseline only, not a new factual verification", () => {
  const source = {url:"https://winery.example/visit",checkedAt:"2026-11-02"};
  const first = reconcile(null, source, "abc", "2026-11-09");
  assert.equal(first.event,"BASELINE");
  assert.equal(first.value.pendingReviewSince,null);
});

test("changed operator page stays in review until all dependent facts are rechecked", () => {
  const src = {url:"https://winery.example/visit",checkedAt:"2026-11-02"};
  const first = reconcile(null,src,"old","2026-11-02");
  const changed = reconcile(first.value,src,"new","2026-11-09");
  assert.equal(changed.event,"SOURCE_CHANGED");
  assert.equal(changed.value.pendingReviewSince,"2026-11-09");
  const same = reconcile(changed.value,src,"new","2026-11-16");
  assert.equal(same.event,"SOURCE_REVIEW");
  const approved = reconcile(same.value,{...src,checkedAt:"2026-11-17"},"new","2026-11-23");
  assert.equal(approved.event,"UNCHANGED");
  assert.equal(approved.value.pendingReviewSince,null);
  const unchangedWithoutApproval = reconcile(changed.value,{...src,checkedAt:"2026-11-09"},"new","2026-11-16");
  assert.equal(unchangedWithoutApproval.event,"SOURCE_REVIEW");
});

test("unverified or insecure source rows are rejected before network requests", () => {
  assert.throws(() => sourceIndex([{id:"x",sourceUrl:"http://example.com",checkedAt:"2026-11-02"}],[]));
});


test("three approved attraction sources are monitored from real canonical records", async () => {
  const { readFile } = await import("node:fs/promises");
  const source = await readFile(new URL("../../../src/data/reviewed-attraction-authorities.ts", import.meta.url), "utf8");
  const records = reviewedAttractionMonitorRows(source);
  assert.equal(records.length, 12, "Three attraction visits, San Antonio history, Fort Worth city/project/design/tourism records, Houston FAQ/collections/About, Garden Explorer and dated recycling terms");
  assert.deepEqual([...new Set(records.map((r) => r.id))].sort(), [
    "fort-worth-water-gardens", "houston-botanic-garden", "san-antonio-japanese-tea-garden",
  ]);
  assert.ok(records.some((r) => r.id === "houston-botanic-garden" && r.sourceUrl === "https://hbg.org/about/questions/"),
    "Infant ticketing, timed admission, parking, accessibility and visitor rules must be checked at their primary FAQ source");
  assert.ok(records.some((r) => r.id === "san-antonio-japanese-tea-garden" && r.sourceUrl === "https://www.sa.gov/Directory/Departments/Parks/Parks-Facilities/Buildings-Centers/Japanese-Tea-Garden"), "City history / Jingu wartime context needs official-source change tracking");
  for (const sourceUrl of [
    "https://www.fortworth.com/things-to-do/attractions/fort-worth-water-gardens/",
    "https://www.fortworthtexas.gov/projects/pard-projects/pard-water-gardens",
    "https://www.tclf.org/landscapes/fort-worth-water-garden",
  ]) assert.ok(records.some((r) => r.id === "fort-worth-water-gardens" && r.sourceUrl === sourceUrl),
    "Fort Worth source-backed construction and historic design references require change monitoring: " + sourceUrl);
  for (const official of [
    "https://hbg.gardenexplorer.org/",
    "https://hbg.org/gardens/",
    "https://hbg.org/about/",
    "https://hbg.org/visit/texas-recycles/",
  ]) assert.ok(records.some((r) => r.id === "houston-botanic-garden" && r.sourceUrl === official),
    "New Houston visitor source must be monitored for change: " + official);
  assert.equal(new Set(records.map((r) => r.sourceUrl)).size, records.length, "Never duplicate official monitor probes");
  for (const row of records) {
    assert.match(row.sourceUrl, /^https:\/\//);
    assert.match(row.checkedAt, /^\d{4}-\d{2}-\d{2}$/);
  }
  assert.throws(() => reviewedAttractionMonitorRows("export const other = [];"), /missing/);
  assert.throws(() => reviewedAttractionMonitorRows(source.replace('"slug": "houston-botanic-garden"', '"slug": "other"')), /inventory changed/);
});


test("all three historic destination canonical guides have bounded, verified operator-source watch", () => {
  const heritage = heritageDestinationMonitorRows.filter(r => r.id !== "alvin-historical-museum");
  assert.equal(heritage.length, 14);
  assert.deepEqual([...new Set(heritage.map((r) => r.id))].sort(), [
    "lbj-presidential-library-austin", "mission-san-jose-san-antonio", "texas-state-capitol",
  ]);
  assert.equal(new Set(heritage.map((r) => r.sourceUrl)).size, 14);
  for (const row of heritage) {
    assert.equal(row.checkedAt, "2026-11-18", "Source timestamps must record verified editorial reviews, never job dates");
    assert.match(row.sourceUrl, /^https:\/\//);
  }
  const all = sourceIndex([], heritage);
  assert.equal(all.length, 14);
  for (const url of [
    "https://tspb.texas.gov/plan/tours/tours.html",
    "https://www.lbjlibrary.org/exhibitions",
    "https://www.nps.gov/saan/planyourvisit/guided-programs.htm",
    "https://www.nps.gov/saan/learn/management/superintendent-s-compendium.htm",
    "https://www.nps.gov/saan/planyourvisit/physical-mobility.htm",
    "https://tspb.texas.gov/plan/parking/parking.html",
    "https://www.lbjlibrary.org/refresh26",
  ]) assert.ok(all.some((item) => item.url === url), "Critical operator changes require weekly alerts: " + url);
});


test("expiring LBJ exhibitions prompt human review without relying on page-fingerprint changes", async () => {
  const { readFile } = await import("node:fs/promises");
  const dossier = await readFile(new URL("../../../src/data/museum-authority-network.ts", import.meta.url), "utf8");
  assert.equal(heritageExhibitionDeadlineAlerts(dossier, "2026-12-10").length, 0);
  assert.deepEqual(heritageExhibitionDeadlineAlerts(dossier, "2026-12-14").map((r) => r.title),
    ["Austin Past & Present"]);
  assert.equal(heritageExhibitionDeadlineAlerts(dossier, "2027-01-02").length, 2,
    "Both January exhibition closures require a research issue before either date passes");
  const updated = dossier.replaceAll("January 3, 2027", "the new operator-verified exhibition end date");
  assert.deepEqual(heritageExhibitionDeadlineAlerts(updated, "2027-01-02").map((r) => r.title),
    ["The American Experiment"], "A factual correction resolves the matching exhibition alert");
  assert.throws(() => heritageExhibitionDeadlineAlerts(dossier, "tomorrow"), /Invalid audit date/);
});


test("Alvin museum and shared city/county visitor sources retain bounded weekly coverage", async () => {
  const {readFile} = await import("node:fs/promises");
  const read = async (path) => JSON.parse(await readFile(new URL(path, import.meta.url), "utf8"));
  const alvin = heritageDestinationMonitorRows.filter(r => r.id === "alvin-historical-museum");
  assert.equal(alvin.length, 11);
  assert.equal(new Set(alvin.map(r => r.sourceUrl)).size, 11);
  for (const row of alvin) assert.equal(row.checkedAt, "2026-11-24");
  for (const url of ["https://alvinmuseum.org/", "https://alvinmuseum.org/slover-rogers-cottage/", "https://alvinmuseum.org/tour-18_emigrants-at-nightfall-mural/", "https://frobergsfarm.com/", "https://www.alvin.gov/Facilities/Facility/Details/National-Oak-Park-8"]) assert.ok(alvin.some(r => r.sourceUrl === url), url);
  const offers = await read("../../../src/data/authority/experience-offers.json");
  const operators = await read("../../../src/data/authority/independent-operators.json");
  const attraction = reviewedAttractionMonitorRows(await readFile(new URL("../../../src/data/reviewed-attraction-authorities.ts", import.meta.url), "utf8"));
  assert.ok(sourceIndex(offers, [...operators, ...attraction, ...heritageDestinationMonitorRows]).length <= 48);
});
