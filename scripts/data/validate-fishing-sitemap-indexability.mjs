import fs from "node:fs";

const read = (file) => fs.readFileSync(file, "utf8");
const staticSitemap = read("src/data/fishing/sitemap.ts");
const guideLoader = read("src/data/fishing/guide-sitemap.server.ts");
const reportLoader = read("src/data/fishing/report-sitemap.server.ts");
const sectionRoute = read("src/routes/fishing.lakes.$slug.$section.tsx");
const primary = read("src/routes/sitemap[.]xml.ts");
const showcaseIndexGate = read("src/data/fishing/showcase-section-index-readiness.ts");
const showcaseGuide = read("src/components/fishing/ShowcaseLakeGuide.tsx");
const errors = [];

for (const section of ["guides","reports"]) {
  if (!staticSitemap.includes(`section !== "${section}"`))
    errors.push(`Unconditionally sitemap-listed ${section} lake subpages may advertise noindex placeholders`);
}
// The normal individual fishing guide sitemap remains verifiedListing-only.
// Optional lake subpages reuse the already-loaded official report/lake/guide
// context instead of incurring another 5,000-lake fetch.
if(!guideLoader.includes("verifiedListing: true")) errors.push("Guide discovery requires verified published listings");
for(const marker of [
  'guides.filter((guide) => guide.verifiedListing)',
  "qualifiedGuideLakeIds.has(lake.id)",
  'lakeConroeCanonicalPath("guides")',
  'showcaseLakeCanonicalPath(lake.slug, "guides")',
]) if(!reportLoader.includes(marker)) errors.push(`Lake /guides section indexability check missing: ${marker}`);
for(const marker of [
  "isPublicFishingReportValid(report, context)",
  'fishingReportFreshness(report) !== "expired"',
  "qualifiedLakeIds.has(lake.id)",
  'lakeConroeCanonicalPath("reports")',
  'showcaseLakeCanonicalPath(lake.slug, "reports")',
]) if(!reportLoader.includes(marker)) errors.push(`Report section indexability check missing: ${marker}`);
for(const marker of [
  'loaderData.reports.length === 0',
  'guide.verifiedListing',
  '"noindex, follow"',
]) if(!sectionRoute.includes(marker))errors.push(`Public route must suppress unfilled sections: ${marker}`);
for(const marker of [
  '...FISHING_SITEMAP_ENTRIES',
  '...fishingGuideSitemapEntries',
  '...fishingReportSitemapEntries',
]) if(!primary.includes(marker))errors.push(`Main sitemap missing conditional data loader: ${marker}`);
// A source-only link or a named lake must never be treated as proof of a
// standalone campsite, attraction or fish-harvest restriction.
for (const marker of [
  "isShowcaseLakeSectionIndexReady",
  "loadShowcaseLakesPageDataServer",
  "SHOWCASE_LAKE_AUTHORITY_DATA[slug]",
]) if (!staticSitemap.includes(marker)) errors.push(`Showcase sitemap missing source-evidence eligibility: ${marker}`);
for (const marker of [
  "isShowcaseLakeSectionIndexReady",
  'loaderData.kind !== "showcase"',
  "hasStandaloneAuthority",
  '"noindex, follow"',
]) if (!sectionRoute.includes(marker)) errors.push(`Showcase route must mirror sitemap publication eligibility: ${marker}`);
for (const marker of [
  'section === "fish"',
  'section === "access"',
  'section === "boating"',
  'section === "camping"',
  'section === "nearby"',
  'section === "regulations"',
  "lake.fish.length >= 3",
  "lake.access.some",
  "lake.boatingNotes.some",
  "lake.campingProhibited",
  "sourceBacked && actualFacility",
  "place.description.trim()",
  "lake.sources.cityBoatRules",
  "lake.sources.fishConsumption",
]) if (!showcaseIndexGate.includes(marker)) errors.push(`Lake authority gate missing substantive evidence check: ${marker}`);
for (const marker of [
  "Species to check before harvest",
  "Check source and overnight availability",
  "No independently researched attraction",
  "Source review:",
]) if (!showcaseGuide.includes(marker)) errors.push(`Lake section must disclose research and source boundaries: ${marker}`);

if(errors.length){for(const error of errors)console.error("FAIL "+error);process.exit(1);}
console.log("PASS fishing sitemap/robots parity: empty guides, reports and insufficiently sourced showcase subsections are noindex and excluded from sitemap.");
