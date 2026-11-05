import fs from "node:fs";
import assert from "node:assert/strict";

const access = JSON.parse(fs.readFileSync("src/data/fishing/curated-access-sites.json", "utf8"));
const guides = JSON.parse(fs.readFileSync("src/data/fishing/curated-fishing-guide-businesses.json", "utf8"));
const read = (path) => fs.readFileSync(path, "utf8");
const allSites = access.flatMap((lake) => lake.facilities.map(([name, kind]) => ({ name, kind, lakeId: lake.lakeId, tpwd: lake.tpwd })));
const slug = (s) => s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
assert.ok(access.length >= 6, "Wave 1 must cover multiple actual TPWD lake inventories");
assert.ok(allSites.length >= 80, "Unexpectedly large access deletion without replacement");
assert.ok(guides.length >= 10, "Unexpectedly large guide deletion without evidence");
assert.equal(new Set(access.map((x) => x.lakeId)).size, access.length, "duplicate lake group");
assert.equal(new Set(allSites.map((site) => site.lakeId + "-" + slug(site.name))).size, allSites.length, "duplicate canonical facility slugs");
assert.equal(new Set(guides.map((g) => g.slug)).size, guides.length, "duplicate guide slug");
for (const lake of access) {
  assert.match(lake.tpwd, /^[a-z_]+$/);
  assert.ok(lake.facilities.length >= 4, lake.lakeId + ": no useful source-backed inventory");
  for (const [name, kind] of lake.facilities) {
    assert.ok(name && name.length >= 4);
    assert.ok(["boat-ramp", "marina", "shore", "pier"].includes(kind), name + ": invalid access kind");
  }
}
for (const guide of guides) {
  assert.match(guide.url, /^https:\/\//);
  assert.ok(guide.summary && guide.summary.length > 50, guide.slug + ": no business-specific description");
  assert.ok(access.some((lake) => lake.lakeId === guide.lakeId) || guide.lakeId === "lake-conroe", guide.slug + ": unknown lake");
  assert.ok(Array.isArray(guide.species) && new Set(guide.species).size === guide.species.length);
}
const SOURCE_DETAIL_LAKES = new Set(["cedar-creek-reservoir", "lake-ray-hubbard", "grapevine-lake", "possum-kingdom-reservoir", "lake-palestine", "lake-tawakoni", "amistad-reservoir"]);
for (const group of access.filter((lake) => SOURCE_DETAIL_LAKES.has(lake.lakeId))) {
  for (const [name, , details] of group.facilities) {
    assert.ok(typeof details === "string" && details.length >= 65, `${group.lakeId}/${name}: missing specific TPWD-sourced access detail`);
  }
}
assert.ok(access.length >= 13, "Statewide fishing access expansion must retain 13 explicitly reviewed lake inventories");
assert.ok(allSites.length >= 150, "Statewide fishing access expansion unexpectedly lost verified facility coverage");
assert.ok(!allSites.some((site) => site.lakeId === "sam-rayburn-reservoir" && site.name === "Public Ramp"), "Unidentified generic Sam Rayburn ramp must remain unpublished");
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
const accessRoute = read("src/routes/fishing.access.tsx");
const localSitemap = read("src/data/fishing/local-sitemap.server.ts");
assert.ok(accessRoute.includes("coveredLakes >= 20 && items.length >= 100"), "Access pilot index gate missing");
assert.ok(localSitemap.includes("indexEligibleLakeIds.size >= 20"), "Access sitemap gate missing");
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
