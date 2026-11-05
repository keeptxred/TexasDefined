import { createServerFn } from "@tanstack/react-start";
import { fishingReportFreshness } from "./report-routing";

/** Show directory links on the hub only when the public catalog has verified inventory. */
export const getFishingResourceAvailability = createServerFn({ method: "GET" }).handler(async () => {
  const [{ fishingPlatform, fishingScope }, { isFishingRecordVerified }] = await Promise.all([import("./index"), import("./validation")]);
  const [reports, guides, accessPoints] = await Promise.all([
    fishingPlatform.reports.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.guides.list({ ...fishingScope, status: "published", verifiedListing: true, limit: 5000 }),
    fishingPlatform.accessPoints.list({ ...fishingScope, status: "published", limit: 5000 }),
  ]);
  return {
    reports: reports.some(isFishingRecordVerified),
    reportsCurrent: reports.some((report) => isFishingRecordVerified(report) && fishingReportFreshness(report) === "current"),
    guides: guides.some((guide) => guide.verifiedListing && isFishingRecordVerified(guide)),
    access: accessPoints.some(isFishingRecordVerified),
  };
});
