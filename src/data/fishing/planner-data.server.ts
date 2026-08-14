import { fishingGuideCanonicalPath } from "./guide-routing";
import { fishingAccessCanonicalPath, fishingServiceCanonicalPath } from "./local-routing";
import { fishingPlatform, fishingScope } from "./index";
import { FISHING_PLANNER_VERIFIED_AT } from "./planner-routing";
import { fishingReportCanonicalPath, fishingReportFreshness } from "./report-routing";
import { fishingFoundationAnchor, isCompleteFishingLakeSlug } from "./slugs";
import { isFishingRecordVerified } from "./validation";

export async function loadFishingPlannerDataServer() {
  const [allLakes, species, lakeSpecies, reports, guides, accessPoints, tackleShops, businesses] = await Promise.all([
    fishingPlatform.lakes.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.species.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.lakeSpecies.list(fishingScope),
    fishingPlatform.reports.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.guides.list({ ...fishingScope, status: "published", verifiedListing: true, limit: 5000 }),
    fishingPlatform.accessPoints.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.tackleShops.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.businesses.list({ ...fishingScope, status: "published", limit: 5000 }),
  ]);

  const lakes = allLakes.filter((lake) => isCompleteFishingLakeSlug(lake.slug));
  const lakeById = new Map(lakes.map((lake) => [lake.id, lake]));
  const speciesById = new Map(species.map((fish) => [fish.id, fish]));

  const verifiedAccess = accessPoints.filter(isFishingRecordVerified);
  const verifiedShops = tackleShops.filter(isFishingRecordVerified);
  const verifiedBusinesses = businesses.filter(isFishingRecordVerified);

  const rows = lakes.map((lake) => {
    const targets = lakeSpecies
      .filter((relation) => relation.lakeId === lake.id)
      .map((relation) => ({ relation, species: speciesById.get(relation.speciesId) }))
      .filter((entry) => Boolean(entry.species))
      .sort((left, right) => qualityRank(left.relation.quality) - qualityRank(right.relation.quality) || prominenceRank(left.relation.prominence) - prominenceRank(right.relation.prominence) || left.species!.commonName.localeCompare(right.species!.commonName));

    const lakeReports = reports
      .filter((report) => report.lakeId === lake.id)
      .map((report) => ({ report, freshness: fishingReportFreshness(report), href: fishingReportCanonicalPath(report.slug) }))
      .sort((left, right) => right.report.publishedAt.localeCompare(left.report.publishedAt));
    const currentReports = lakeReports.filter((entry) => entry.freshness === "current");
    const staleReports = lakeReports.filter((entry) => entry.freshness !== "current");

    const lakeGuides = guides
      .filter((guide) => guide.lakeIds.includes(lake.id))
      .sort((a, b) => a.businessName.localeCompare(b.businessName))
      .map((guide) => ({ guide, href: fishingGuideCanonicalPath(guide.slug) }));
    const lakeAccess = verifiedAccess
      .filter((point) => point.lakeIds.includes(lake.id))
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((point) => ({ point, href: fishingAccessCanonicalPath(point.slug) }));
    const serviceRows = [
      ...verifiedShops.filter((shop) => shop.lakeIds.includes(lake.id)).map((service) => ({ service, category: "tackle-shop" as const })),
      ...verifiedBusinesses.filter((business) => business.lakeIds.includes(lake.id)).map((service) => ({ service, category: business.category })),
    ]
      .sort((a, b) => a.service.name.localeCompare(b.service.name))
      .map((entry) => ({ ...entry, href: fishingServiceCanonicalPath(entry.service.slug) }));

    return {
      lake,
      href: fishingFoundationAnchor("lake", lake.slug),
      targets,
      reports: { current: currentReports, older: staleReports },
      guides: lakeGuides,
      access: lakeAccess,
      services: serviceRows,
    };
  }).sort((a, b) => a.lake.name.localeCompare(b.lake.name));

  return {
    verifiedAt: FISHING_PLANNER_VERIFIED_AT,
    rows,
    species: species.filter((fish) => rows.some((row) => row.targets.some((target) => target.species?.id === fish.id))).sort((a, b) => a.commonName.localeCompare(b.commonName)),
    regions: [...new Set(rows.map((row) => row.lake.region))].sort(),
    policy: {
      ranking: "Planner results are sorted by verified fishery fit, then alphabetically. Sponsorship never changes planner order.",
      conditions: "Only reports classified as current may appear as current-condition context. Stale or expired reports remain visibly separated and never change lake recommendations.",
      local: "Guide, access and service counts include verified public listings only. Zero means no verified listing is currently published, not that the service does not exist.",
    },
  };
}

function qualityRank(value: string) { return value === "excellent" ? 0 : value === "good" ? 1 : value === "fair" ? 2 : value === "poor" ? 3 : 4; }
function prominenceRank(value: string) { return value === "primary" ? 0 : value === "secondary" ? 1 : 2; }

export type FishingPlannerData = Awaited<ReturnType<typeof loadFishingPlannerDataServer>>;
