import { fishingGuideCanonicalPath } from "./guide-routing";
import twdbPlannerCoordinates from "./planner-twdb-coordinates.json";
import { expandedShowcaseLakePrototypes } from "./expanded-showcase-lakes-prototype";
import { LAKE_AUTHORITY_RESEARCH_WAVE1 } from "./lake-authority-research-wave1";
import { statewideNetworkLakeDefinitions } from "./statewide-lake-network";
import { fishingAccessCanonicalPath, fishingServiceCanonicalPath } from "./local-routing";
import { fishingPlatform, fishingScope } from "./index";
import { FISHING_PLANNER_VERIFIED_AT } from "./planner-routing";
import { fishingReportCanonicalPath, fishingReportFreshness } from "./report-routing";
import { fishingFoundationAnchor, isCompleteFishingLakeSlug } from "./slugs";
import { isFishingRecordVerified } from "./validation";

export async function loadFishingPlannerDataServer() {
  const [lakes, species, lakeSpecies, reports, guides, accessPoints, tackleShops, businesses] = await Promise.all([
    fishingPlatform.lakes.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.species.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.lakeSpecies.list(fishingScope),
    fishingPlatform.reports.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.guides.list({ ...fishingScope, status: "published", verifiedListing: true, limit: 5000 }),
    fishingPlatform.accessPoints.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.tackleShops.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.businesses.list({ ...fishingScope, status: "published", limit: 5000 }),
  ]);

  const speciesById = new Map(species.map((fish) => [fish.id, fish]));
  const verifiedAccess = accessPoints.filter(isFishingRecordVerified);
  const verifiedShops = tackleShops.filter(isFishingRecordVerified);
  const verifiedBusinesses = businesses.filter(isFishingRecordVerified);

  const rows = lakes.map((lake) => {
    // TWDB lake coordinates are reservoir reference points, never ramps.
    // Retain stronger existing source-backed coordinates when already present.
    const twdbPoint = !lake.coordinates
      ? twdbPlannerCoordinates[lake.slug as keyof typeof twdbPlannerCoordinates]
      : undefined;
    const mappedLake = twdbPoint
      ? { ...lake, coordinates: { lat: twdbPoint.lat, lng: twdbPoint.lng } }
      : lake;
    const targets = lakeSpecies
      .filter((relation) => relation.lakeId === lake.id)
      .filter((relation) => Boolean(relation.verifiedAt) && relation.sources.length > 0)
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

    const research = LAKE_AUTHORITY_RESEARCH_WAVE1[lake.slug];
    const network = statewideNetworkLakeDefinitions.find((entry) => entry.slug === lake.slug);
    const importantAdvisories = (research?.regulations ?? [])
      .filter((entry) => /advisory|mussel|closure|launch|ramp|border|licen[cs]e|water level/i.test(entry.label))
      .slice(0, 4)
      .map((entry) => ({
        label: entry.label,
        // A dated research note must never masquerade as today's ramp status.
        text: /current low-water launch closures|ramp (?:open|clos|status)|launch closures/i.test(entry.label)
          ? "Managing-agency ramp and facility status changes with water level and maintenance. Historical open/closed descriptions may be obsolete; consult the linked live operator status before choosing a launch."
          : entry.text,
        sourceUrl: entry.sourceUrl,
      }));
    const source = lake.sources.find((entry) => entry.url.includes("tpwd.texas.gov/fishboat/fish/recreational/lakes/")) ?? lake.sources[0];

    return {
      lake: mappedLake,
      coordinateSource: twdbPoint ? {
        label: `Texas Water Development Board — ${twdbPoint.sourceName}`,
        url: twdbPoint.sourceUrl,
        reviewedAt: twdbPoint.reviewedAt,
      } : null,
      comparisonAuthority: {
        lakeSource: source?.url ?? "",
        lakeSourceReviewedAt: source?.checkedAt ?? lake.verifiedAt ?? null,
        fisheryReviewedAt: targets.reduce<string | null>((latest, target) => target.relation.verifiedAt && (!latest || target.relation.verifiedAt > latest) ? target.relation.verifiedAt : latest, null),
        accessReviewedAt: lakeAccess.reduce<string | null>((latest, entry) => entry.point.verifiedAt && (!latest || entry.point.verifiedAt > latest) ? entry.point.verifiedAt : latest, null),
        levelSource: network?.waterDataSlug ? "https://waterdatafortexas.org/reservoirs/individual/" + network.waterDataSlug : (expandedShowcaseLakePrototypes[lake.slug as keyof typeof expandedShowcaseLakePrototypes]?.sources.liveLevel?.url ?? null),
        operatorConditionsSource: lake.slug === "amistad-reservoir" ? "https://www.nps.gov/amis/planyourvisit/conditions.htm" : null,
        advisoryReviewedAt: research?.reviewedAt ?? null,
        importantAdvisories,
      },
      href: fishingFoundationAnchor("lake", lake.slug),
      fullGuide: isCompleteFishingLakeSlug(lake.slug),
      targets,
      reports: { current: currentReports, older: staleReports },
      guides: lakeGuides,
      access: lakeAccess,
      services: serviceRows,
    };
  })
    .filter((row) => row.targets.length > 0)
    .sort((a, b) => a.lake.name.localeCompare(b.lake.name));

  return {
    verifiedAt: FISHING_PLANNER_VERIFIED_AT,
    rows,
    species: species.filter((fish) => rows.some((row) => row.targets.some((target) => target.species?.id === fish.id))).sort((a, b) => a.commonName.localeCompare(b.commonName)),
    regions: [...new Set(rows.map((row) => row.lake.region))].sort(),
    policy: {
      ranking: "Planner results are sorted by selected-species match and verified lake-to-species quality. Full-guide status can break ties. Sponsorship never changes planner order.",
      conditions: "Only current fishing reports are shown as current-condition information. Older or expired reports remain separate and never affect lake recommendations.",
      local: "Guide, access and service counts include verified public listings only. Zero means no verified listing is currently published, not that the service does not exist.",
      coverage: "The finder searches every published lake with at least one verified lake-to-species relationship. A Full fishing guide badge identifies lakes with the deeper editorial guide.",
    },
  };
}

function qualityRank(value: string) { return value === "excellent" ? 0 : value === "good" ? 1 : value === "fair" ? 2 : value === "poor" ? 3 : 4; }
function prominenceRank(value: string) { return value === "primary" ? 0 : value === "secondary" ? 1 : 2; }

export type FishingPlannerData = Awaited<ReturnType<typeof loadFishingPlannerDataServer>>;
