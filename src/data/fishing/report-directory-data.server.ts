import { fishingPlatform, fishingScope } from "./index";
import { fishingReportCanonicalPath, fishingReportFreshness, FISHING_REPORTS_VERIFIED_AT } from "./report-routing";
import { isPublicFishingReportValid } from "./report-validation";

export async function loadFishingReportDirectoryDataServer() {
  const [reports, lakes, species, guides, lakeSpecies, advertisers, placements] = await Promise.all([
    fishingPlatform.reports.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.lakes.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.species.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.guides.list({ ...fishingScope, status: "published", verifiedListing: true, limit: 5000 }),
    fishingPlatform.lakeSpecies.list(fishingScope),
    fishingPlatform.advertisers.list({ ...fishingScope, status: "published" }),
    fishingPlatform.placements.list({ ...fishingScope, status: "published", limit: 5000 }),
  ]);
  const validationContext = { lakes, species, guides, lakeSpecies };
  const lakeById = new Map(lakes.map((row) => [row.id, row]));
  const speciesById = new Map(species.map((row) => [row.id, row]));
  const guideById = new Map(guides.filter((guide) => guide.contributorApproved).map((guide) => [guide.id, guide]));
  const advertiserById = new Map(advertisers.map((row) => [row.id, row]));

  const editorialReports = reports
    .filter((report) => isPublicFishingReportValid(report, validationContext))
    .map((report) => ({
      report,
      href: fishingReportCanonicalPath(report.slug),
      freshness: fishingReportFreshness(report),
      lake: lakeById.get(report.lakeId),
      species: report.speciesUpdates.map((update) => speciesById.get(update.speciesId)).filter(Boolean),
      contributorGuide: report.contributorGuideId ? guideById.get(report.contributorGuideId) : undefined,
    }))
    .sort((left, right) => right.report.publishedAt.localeCompare(left.report.publishedAt) || left.report.slug.localeCompare(right.report.slug));

  const usedLakeIds = new Set(editorialReports.map((entry) => entry.report.lakeId));
  const usedSpeciesIds = new Set(editorialReports.flatMap((entry) => entry.report.speciesUpdates.map((update) => update.speciesId)));
  const sponsoredPlacements = placements
    .filter((placement) => placement.kind === "statewide-advertiser" || placement.kind === "regional-advertiser")
    .map((placement) => ({ placement, advertiser: advertiserById.get(placement.advertiserId) }))
    .filter((entry) => Boolean(entry.advertiser));

  return {
    verifiedAt: FISHING_REPORTS_VERIFIED_AT,
    editorialOrder: "Newest verified report first. Sponsorship never changes report order or editorial recommendations.",
    reports: editorialReports,
    filters: {
      lakes: lakes.filter((lake) => usedLakeIds.has(lake.id)).sort((a, b) => a.name.localeCompare(b.name)),
      species: species.filter((fish) => usedSpeciesIds.has(fish.id)).sort((a, b) => a.commonName.localeCompare(b.commonName)),
    },
    sponsoredPlacements,
  };
}

export type FishingReportDirectoryData = Awaited<ReturnType<typeof loadFishingReportDirectoryDataServer>>;
