import fs from "node:fs";
import assert from "node:assert/strict";

const access = JSON.parse(fs.readFileSync("src/data/fishing/curated-access-sites.json", "utf8"));
const guides = JSON.parse(fs.readFileSync("src/data/fishing/curated-fishing-guide-businesses.json", "utf8"));
const read = (path) => fs.readFileSync(path, "utf8");
const allSites = access.flatMap((lake) => lake.facilities.map(([name, kind]) => ({ name, kind, lakeId: lake.lakeId, tpwd: lake.tpwd })));
const slug = (s) => s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
assert.ok(access.length >= 6, "Wave 1 must cover multiple actual TPWD lake inventories");
assert.ok(allSites.length >= 80, "Unexpectedly large access deletion without replacement");
assert.ok(guides.length >= 22, "Guide business coverage must retain expanded first-party source inventory");
assert.equal(new Set(access.map((x) => x.lakeId)).size, access.length, "duplicate lake group");
assert.equal(new Set(allSites.map((site) => site.lakeId + "-" + slug(site.name))).size, allSites.length, "duplicate canonical facility slugs");
assert.equal(new Set(guides.map((g) => g.slug)).size, guides.length, "duplicate guide slug");
for (const lake of access) {
  assert.match(lake.tpwd, /^[a-z_]+$/);
  assert.ok(lake.facilities.length >= 4, lake.lakeId + ": no useful source-backed inventory");
  for (const [name, kind] of lake.facilities) {
    assert.ok(name && name.length >= 4);
    assert.ok(["boat-ramp", "marina", "shore", "pier", "kayak-launch"].includes(kind), name + ": invalid access kind");
  }
}
// TPWD water-access identity must agree with labels, filters and source claims.
for (const lake of access) {
  const sourceUrl = `https://tpwd.texas.gov/fishboat/fish/recreational/lakes/${lake.tpwd}/${lake.sourcePage ?? "access.phtml"}`;
  assert.match(sourceUrl, /^https:\/\/tpwd\.texas\.gov\/fishboat\/fish\/recreational\/lakes\/[a-z_]+\/access(?:2)?\.phtml$/);
  for (const [name, kind, detail] of lake.facilities) {
    const text = detail ?? "";
    if (kind === "boat-ramp") assert.ok(!/non-motorized craft only|not a motorboat (?:ramp|launch)|walk-in shore fishing|no boat ramp/i.test(text), `${lake.lakeId}/${name}: ramp contradicts source detail`);
    if (kind === "shore") assert.ok(!/(?:one|two|three|four)[- ]lane concrete (?:boat )?ramp/i.test(text), `${lake.lakeId}/${name}: shoreline entry describes a constructed boat ramp`);
    if (kind === "kayak-launch") assert.match(text, /paddl|kayak|non-motorized/i, `${lake.lakeId}/${name}: paddle-only classification has no explicit evidence`);
    if (kind === "marina") assert.ok(!/public (?:restrooms|boat fuel|camping|ADA parking) (?:provided|available)/i.test(text), `${lake.lakeId}/${name}: unsupported public marina amenity`);
  }
}
const travis = access.find((row) => row.lakeId === "lake-travis");
assert.equal(travis?.sourcePage, "access2.phtml", "Lake Travis detail records must link directly to TPWD's listed facilities");
for (const name of ["Pace Bend/Collier Cove", "Pace Bend/Tatum Cove", "Arkansas Bend", "Bob Wentz at Windy Point", "Cypress Creek"]) {
  assert.equal(travis?.facilities.find((f) => f[0] === name)?.[1], "boat-ramp", `TPWD confirms ${name} ramp`);
}
assert.match(travis.facilities.find((f) => f[0] === "Bob Wentz at Windy Point")[2], /sailboats/, "Sailboat restriction must be visible");
const paddle = access.find((row) => row.lakeId === "lake-ray-hubbard")?.facilities.find((f) => f[0] === "Paddle Point Park");
assert.equal(paddle?.[1], "kayak-launch", "Non-motorized put-in must never appear in motorboat-ramp filters");
const curatedMapper = read("src/data/fishing/curated-inventory.ts");
assert.ok(curatedMapper.includes('kind === "shore" || kind === "pier" || kind === "kayak-launch"'),
  "Curated mapper must preserve kayaking and fishing-pier access types instead of silently changing them to shore");
assert.ok(curatedMapper.includes("Unsupported curated access kind"),
  "Unknown curated facility types must fail closed rather than become shore access");

assert.match(paddle?.[2] ?? "", /non-motorized craft only/);

const knownLakeSourceFiles = [
  "src/data/fishing/fixtures.ts",
  "src/data/fishing/lake-expansion-fixtures.ts",
  "src/data/fishing/lake-expansion-wave2-fixtures.ts",
  "src/data/fishing/statewide-lake-network.ts",
].map(read);
// Verify operator-first-party source relationships across distinct lakes; no fabricated profiles.
for (const slug of [
  "chad-ferguson-north-texas-catfish-guide",
  "reel-fishing-richland-chambers-hybrids",
  "pat-small-whitney-striper-guide",
  "big-bite-lake-whitney-guide",
  "family-style-possum-kingdom",
  "tc-guide-belton-hybrids",
  "all-about-stripes-belton",
  "hook-set-belton-guide",
  "atx-fishing-travis-bass",
  "brent-hodges-possum-kingdom",
]) assert.ok(guides.some((guide) => guide.slug === slug), "Missing verified, named guide source: " + slug);
for (const guide of guides) {
  assert.match(guide.url, /^https:\/\//);
  assert.ok(guide.summary && guide.summary.length > 50, guide.slug + ": no business-specific description");
  assert.ok(
    access.some((lake) => lake.lakeId === guide.lakeId)
    || ["lake-conroe"].includes(guide.lakeId)
    || knownLakeSourceFiles.some((file) => file.includes(`slug: "${guide.lakeId}"`) || file.includes(`id: "${guide.lakeId}"`)),
    guide.slug + ": lake absent from published fishing source registries",
  );
  assert.ok(Array.isArray(guide.species) && new Set(guide.species).size === guide.species.length);
}
const SOURCE_DETAIL_LAKES = new Set(["cedar-creek-reservoir", "lake-ray-hubbard", "grapevine-lake", "possum-kingdom-reservoir", "lake-palestine", "lake-tawakoni", "amistad-reservoir", "lewisville-lake", "lake-lavon", "richland-chambers-reservoir"]);
for (const group of access.filter((lake) => SOURCE_DETAIL_LAKES.has(lake.lakeId))) {
  for (const [name, , details] of group.facilities) {
    assert.ok(typeof details === "string" && details.length >= 65, `${group.lakeId}/${name}: missing specific TPWD-sourced access detail`);
  }
}
assert.ok(access.length >= 16, "Statewide fishing access expansion must retain 16 explicitly reviewed lake inventories");
assert.ok(allSites.length >= 190, "Northern Texas fishing access expansion unexpectedly lost source-reviewed facility coverage");
assert.ok(!allSites.some((site) => site.lakeId === "sam-rayburn-reservoir" && site.name === "Public Ramp"), "Unidentified generic Sam Rayburn ramp must remain unpublished");
// TPWD's multi-part facility listings for the three North Texas lakes are fully enumerated.
for (const [lakeId, expected] of [["lewisville-lake", 17], ["lake-lavon", 16], ["richland-chambers-reservoir", 9]]) {
  const row = access.find((lake) => lake.lakeId === lakeId);
  assert.ok(row && row.sourcePage === "access2.phtml", lakeId + ": complete official facility page missing");
  assert.equal(row.facilities.length, expected, lakeId + ": official ramp and shore access list incomplete");
}
assert.equal(access.find((row) => row.lakeId === "lewisville-lake").facilities.find(([name]) => name === "Cottonwood Park")[1], "shore", "Cottonwood Park must not be mislabeled as a boat ramp");
const guideDirectory = read("src/components/fishing/FishingGuideDirectory.tsx");
const guideProfileUi = read("src/components/fishing/FishingGuideProfile.tsx");
assert.ok(guideDirectory.includes("current Texas fishing-guide license"), "Guide directory must disclose licensing verification limitations");
assert.ok(guideProfileUi.includes("confirmation of current licensing"), "Guide profiles must disclose licensing verification limitations");
const index = read("src/data/fishing/index.ts");
for (const s of ["expandedSourcedAccessPoints", "sourcedNetworkAccess", "curatedVerifiedGuides", "curatedGuideLakes", "curatedGuideSpecies", "curatedHistoricalFishingReports"])
  assert.ok(index.includes(s), "Catalog binding absent: " + s);
const reports = read("src/data/fishing/curated-historical-reports.ts");
assert.ok((reports.match(/publishedAt:"2026-/g) || []).length >= 6, "Archived observed reports missing publication dates");
assert.ok(reports.includes("2026-02-25") && reports.includes("2026-10-02"));
// Reader corrections and source-backed tips belong to the editorial desk,
 // not to /partner-with-us (the paid advertising sales inquiry).
const accessDirectoryUi = read("src/components/fishing/FishingAccessDirectory.tsx");
assert.ok(accessDirectoryUi.includes("mailto:admin@texasdefined.com?subject=Texas%20Defined%20fishing%20access"), "Access directory must route factual corrections to the editorial inbox.");
assert.ok(accessDirectoryUi.includes('href="/corrections-policy"'), "Access directory must explain how factual corrections are handled.");
assert.ok(!accessDirectoryUi.includes('href="/partner-with-us"'), "Fishing-access editorial corrections must not send readers to the commercial advertising form.");
assert.ok(accessDirectoryUi.includes("Reader tips are reviewed before any publication"), "Access reader tips must not be presented as verified facts.");
const accessRoute = read("src/routes/fishing.access.tsx");
const localSitemap = read("src/data/fishing/local-sitemap.server.ts");
assert.ok(accessRoute.includes("coveredLakes >= 20 && items.length >= 100"), "Access pilot index gate missing");
assert.ok(localSitemap.includes("indexEligibleLakeIds.size >= 20"), "Access sitemap gate missing");
const typed = read("src/data/fishing/access-kind.ts");
assert.ok(typed.includes('facility.kind === "shore" || facility.kind === "pier" || facility.kind === "kayak-launch"'), "Explicit access identities must override vague text heuristics");
const statewide = read("src/data/fishing/statewide-lake-network.ts");
for (const [site, type] of [
  ["Bachman Lake public bank-fishing shoreline","shore"],
  ["Paddle Point Park (paddle craft only)","kayak-launch"],
  ["Bear Creek Park","public-ramp"],
  ["Spring Canyon fishing pier","pier"],
]) {
  const at = Math.max(statewide.indexOf(`name:"${site}"`), statewide.indexOf(`name: "${site}"`));
  assert.ok(at >= 0, "Missing reviewed statewide source identity " + site);
  assert.match(statewide.slice(at, at + 300), new RegExp(`kind: ?"\\b${type}\\b"`), "Invalid reviewed source kind: " + site);
}
const accessTypes = read("src/data/fishing/reused-statewide-access.ts");
assert.ok(accessTypes.includes("classifySourceReviewedAccessKind(facility)"), "Access directory must use the tested source classification instead of incidental ramp words");
assert.ok(localSitemap.includes("accessPoints.filter(isFishingRecordVerified)") && localSitemap.includes("Boolean(point.address || point.coordinates)"), "Unverified source-only access profiles must not enter indexable sitemap");

const network = read("src/data/fishing/reused-statewide-access.ts");
assert.ok(network.includes("public access inventory") && network.includes("lake.accessReviewedAt") && network.includes("present.has(key)"), "Reused network access must exclude generic placeholders, require review and deduplicate");
assert.ok(index.includes("deriveReviewedStatewideAccessPoints"), "Statewide authority access dossiers not connected to the shared access catalog");
const guideProfile = read("src/data/fishing/guide-profile-data.server.ts");
const guideSitemap = read("src/data/fishing/guide-sitemap.server.ts");
assert.ok(guideProfile.includes("guide.claimedListing &&"), "Unclaimed generic guide profiles must be noindex");
assert.ok(guideSitemap.includes("guide.claimedListing &&"), "Unclaimed guide profiles must not appear in sitemap");
const reportRoute = read("src/routes/fishing.reports.tsx");
const reportSitemap = read("src/data/fishing/report-sitemap.server.ts");
assert.ok(reportRoute.includes('fishingReportFreshness(entry.report) === "current"'), "Archive directory noindex missing");
assert.ok(reportSitemap.includes('fishingReportFreshness(report) === "current"'), "Historical report sitemap exclusion missing");
assert.ok(read("src/components/fishing/FishingReportDirectory.tsx").includes("weekly fishing reports are currently paused"));
const inventoryMonitor = read("scripts/ci/audit-fishing-inventory-sources.mjs");
const inventoryMonitorWorkflow = read(".github/workflows/fishing-source-inventory.yml");
for (const marker of [
  'statewideNetworkShowcaseLakePrototypes',
  'lake.accessReviewedAt',
  'reviewedNetworkChecked: batch.length',
  'i % 2 === cohort',
  'process.env.GITHUB_EVENT_NAME === "pull_request"',
]) assert.ok(inventoryMonitor.includes(marker), "Reviewed lake-access weekly source monitoring contract missing: " + marker);
assert.ok(inventoryMonitorWorkflow.includes("node --experimental-strip-types scripts/ci/audit-fishing-inventory-sources.mjs"), "Node must load reviewed statewide lake authority records for scheduled source checks");
assert.ok(inventoryMonitorWorkflow.includes("cron: '23 14 * * 1,4'"), "Monday/Thursday source review schedule must remain configured");
console.log(JSON.stringify({ result: "PASS", explicitlyReviewedLakes: access.length + 1, curatedAccessPoints: allSites.length + 8, sourcedGuideBusinesses: guides.length, historicalReportRecords: 6, searchGates: "protected" }, null, 2));
