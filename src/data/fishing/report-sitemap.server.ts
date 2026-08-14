import { fishingPlatform, fishingScope } from "./index";
import { fishingReportCanonicalPath, fishingReportFreshness } from "./report-routing";
import { isFishingRecordVerified } from "./validation";

export async function loadFishingReportSitemapEntriesServer() {
  const reports = await fishingPlatform.reports.list({ ...fishingScope, status: "published", limit: 5000 });
  return reports
    .filter((report) => isFishingRecordVerified(report) && fishingReportFreshness(report) !== "expired")
    .map((report) => ({ path: fishingReportCanonicalPath(report.slug), lastmod: report.publishedAt.slice(0, 10) }));
}
