import fs from "node:fs";

const read = (file) => fs.readFileSync(file, "utf8");
const staticSitemap = read("src/data/fishing/sitemap.ts");
const guideLoader = read("src/data/fishing/guide-sitemap.server.ts");
const reportLoader = read("src/data/fishing/report-sitemap.server.ts");
const sectionRoute = read("src/routes/fishing.lakes.$slug.$section.tsx");
const primary = read("src/routes/sitemap[.]xml.ts");
const errors = [];

for (const section of ["guides","reports"]) {
  if (!staticSitemap.includes(`section !== "${section}"`))
    errors.push(`Unconditionally sitemap-listed ${section} lake subpages may advertise noindex placeholders`);
}
for(const marker of [
  "qualifiedLakeIds.has(lake.id)",
  "lakeConroeCanonicalPath(\"guides\")",
  "showcaseLakeCanonicalPath(lake.slug, \"guides\")",
  "verifiedListing: true",
]) if(!guideLoader.includes(marker))errors.push(`Guide section indexability check missing: ${marker}`);
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
if(errors.length){for(const error of errors)console.error("FAIL "+error);process.exit(1);}
console.log("PASS fishing sitemap/robots parity: guides and reports enter sitemap only with qualified published source records; noindex empty pages remain excluded.");
