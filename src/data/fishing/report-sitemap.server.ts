import { fishingPlatform, fishingScope } from "./index";
import { fishingReportCanonicalPath, fishingReportFreshness } from "./report-routing";
import { isPublicFishingReportValid } from "./report-validation";

export async function loadFishingReportSitemapEntriesServer() {
  const [reports, lakes, species, guides, lakeSpecies] = await Promise.all([
    fishingPlatform.reports.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.lakes.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.species.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.guides.list({ ...fishingScope, status: "published", verifiedListing: true, limit: 5000 }),
    fishingPlatform.lakeSpecies.list(fishingScope),
  ]);
  const context = { lakes, species, guides, lakeSpecies };
  return reports
    .filter((report) => isPublicFishingReportValid(report, context) && fishingReportFreshness(report) !== "expired")
    .map((report) => ({ path: fishingReportCanonicalPath(report.slug), lastmod: report.publishedAt.slice(0, 10) }));
}
