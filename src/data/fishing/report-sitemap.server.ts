import { fishingPlatform, fishingScope } from "./index";
import { FISHING_REPORTS_DIRECTORY_PATH, FISHING_REPORTS_VERIFIED_AT, fishingReportCanonicalPath, fishingReportFreshness } from "./report-routing";
import { isPublicFishingReportValid } from "./report-validation";
import { LAKE_CONROE_SLUG, lakeConroeCanonicalPath } from "./lake-conroe-routing";
import { isShowcaseLakeSlug, showcaseLakeCanonicalPath } from "./showcase-lake-routing";

export async function loadFishingReportSitemapEntriesServer() {
  const [reports, lakes, species, guides, lakeSpecies] = await Promise.all([
    fishingPlatform.reports.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.lakes.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.species.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.guides.list({ ...fishingScope, status: "published", verifiedListing: true, limit: 5000 }),
    fishingPlatform.lakeSpecies.list(fishingScope),
  ]);
  const context = { lakes, species, guides, lakeSpecies };
  const validReports = reports.filter((report) => isPublicFishingReportValid(report, context) && fishingReportFreshness(report) !== "expired");
  // Advertise only reports sections with an independently validated,
  // unexpired published report. The matching empty route retains noindex.
  const qualifiedLakeIds = new Set(validReports.map((report) => report.lakeId));
  // This loader already has lakes AND verified guides; share the read rather
  // than making another statewide lake request in the guide-sitemap loader.
  const qualifiedGuideLakeIds = new Set(guides.filter((guide) => guide.verifiedListing).flatMap((guide) => guide.lakeIds));
  const guideSectionEntries = lakes.filter((lake) =>
    qualifiedGuideLakeIds.has(lake.id) && Boolean(lake.verifiedAt) && lake.sources.length > 0
  ).flatMap((lake) => lake.slug === LAKE_CONROE_SLUG
    ? [{ path: lakeConroeCanonicalPath("guides"), lastmod: lake.verifiedAt }]
    : isShowcaseLakeSlug(lake.slug)
      ? [{ path: showcaseLakeCanonicalPath(lake.slug, "guides"), lastmod: lake.verifiedAt }]
      : []);
  const lakeSectionEntries = lakes.filter((lake) =>
    qualifiedLakeIds.has(lake.id) && Boolean(lake.verifiedAt) && lake.sources.length > 0
  ).flatMap((lake) => lake.slug === LAKE_CONROE_SLUG
    ? [{ path: lakeConroeCanonicalPath("reports"), lastmod: lake.verifiedAt }]
    : isShowcaseLakeSlug(lake.slug)
      ? [{ path: showcaseLakeCanonicalPath(lake.slug, "reports"), lastmod: lake.verifiedAt }]
      : []);
  return [
    ...(validReports.length ? [{ path: FISHING_REPORTS_DIRECTORY_PATH, lastmod: FISHING_REPORTS_VERIFIED_AT }] : []),
    ...validReports.map((report) => ({ path: fishingReportCanonicalPath(report.slug), lastmod: report.publishedAt.slice(0, 10) })),
    ...lakeSectionEntries,
    ...guideSectionEntries,
  ];
}
