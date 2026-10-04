import type { FishingLake, FishingReport } from "./types";
import type { TpwdFishingReportSnapshot } from "./tpwd-fishing-report.types";

const TPWD_NAME = "Texas Parks & Wildlife Department (TPWD)";

export function mergeOfficialTpwdFishingReport(
  lake: FishingLake,
  reports: FishingReport[],
  snapshot: TpwdFishingReportSnapshot | null,
): FishingReport[] {
  if (!snapshot) return reports;

  const sourceStatus = snapshot.sourceNotice ? ` TPWD status: ${snapshot.sourceNotice}` : "";
  const freshnessLabel = snapshot.freshness === "current"
    ? "Current"
    : snapshot.freshness === "stale"
      ? "Older"
      : "Historical";
  const official: FishingReport = {
    id: `tpwd-${lake.id}-${snapshot.publishedAt}`,
    brandId: lake.brandId,
    slug: `tpwd-${lake.slug}-${snapshot.publishedAt}`,
    status: "published",
    verifiedAt: snapshot.publishedAt,
    sources: [{
      id: `tpwd-report-${lake.id}`,
      name: TPWD_NAME,
      url: snapshot.sourceUrl,
      checkedAt: snapshot.publishedAt,
      sourceType: "state",
    }],
    lakeId: lake.id,
    title: `${freshnessLabel} TPWD fishing report for ${lake.name}`,
    summary: `TexasDefined provides this fishing report from ${TPWD_NAME}. ${snapshot.summary}${sourceStatus}`,
    publishedAt: snapshot.publishedAt,
    speciesUpdates: [],
  };

  return [official, ...reports.filter((report) => report.id !== official.id)]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function buildTpwdReportSourceSummary(snapshot: TpwdFishingReportSnapshot | null) {
  const attribution = `TexasDefined provides fishing reports from ${TPWD_NAME} and other clearly attributed sources.`;
  return snapshot
    ? `${attribution} The newest TPWD report is shown below with its original publication date so older conditions are not presented as current.`
    : `${attribution} Every report is shown with its original publication date so older conditions are not presented as current.`;
}
