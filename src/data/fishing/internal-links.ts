export type FishingInternalLinkKind = "lake" | "species" | "guide" | "report" | "access" | "business" | "planner";

export interface FishingInternalLinkEntity {
  id: string;
  kind: FishingInternalLinkKind;
  name: string;
  aliases: string[];
  href: string;
  keywords: string[];
}

function normalizeTerms(values: Array<string | undefined>) {
  return [...new Set(values.map((value) => value?.trim()).filter((value): value is string => Boolean(value)))];
}

export async function buildFishingInternalLinkEntities(): Promise<FishingInternalLinkEntity[]> {
  // Keep the repository and route-helper graph out of the client entry bundle.
  const [platformModule, guideRouting, localRouting, plannerRouting, reportRouting, slugs, validation] = await Promise.all([
    import("./index"),
    import("./guide-routing"),
    import("./local-routing"),
    import("./planner-routing"),
    import("./report-routing"),
    import("./slugs"),
    import("./validation"),
  ]);
  const { fishingPlatform, fishingScope } = platformModule;
  const { fishingGuideCanonicalPath } = guideRouting;
  const { fishingAccessCanonicalPath, fishingServiceCanonicalPath } = localRouting;
  const { FISHING_LAKE_COMPARE_PATH, FISHING_TRIP_PLANNER_PATH } = plannerRouting;
  const { fishingReportCanonicalPath } = reportRouting;
  const { fishingFoundationAnchor } = slugs;
  const { isFishingRecordVerified } = validation;
  const [lakes, species, guides, reports, accessRaw, tackleRaw, businessesRaw] = await Promise.all([
    fishingPlatform.lakes.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.species.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.guides.list({ ...fishingScope, status: "published", verifiedListing: true, limit: 5000 }),
    fishingPlatform.reports.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.accessPoints.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.tackleShops.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.businesses.list({ ...fishingScope, status: "published", limit: 5000 }),
  ]);
  const access = accessRaw.filter(isFishingRecordVerified);
  const tackleShops = tackleRaw.filter(isFishingRecordVerified);
  const businesses = businessesRaw.filter(isFishingRecordVerified);
  const entities: FishingInternalLinkEntity[] = [
    { id: "fishing-planner:trip", kind: "planner", name: "Texas Fishing Trip Planner", aliases: ["fishing trip planner", "plan a fishing trip"], href: FISHING_TRIP_PLANNER_PATH, keywords: ["species", "region", "choose a lake"] },
    { id: "fishing-planner:compare", kind: "planner", name: "Compare Texas Fishing Lakes", aliases: ["fishing lake comparison", "compare fishing lakes"], href: FISHING_LAKE_COMPARE_PATH, keywords: ["lake comparison", "choose a lake"] },
    ...lakes.map((lake) => ({ id: `fishing-lake:${lake.id}`, kind: "lake" as const, name: lake.name, aliases: normalizeTerms(lake.aliases ?? []), href: fishingFoundationAnchor("lake", lake.slug), keywords: normalizeTerms([...lake.counties.map((county) => `${county} County`), ...lake.nearestCities, lake.riverBasin, lake.primaryWaterway]) })),
    ...species.map((row) => ({ id: `fish-species:${row.id}`, kind: "species" as const, name: row.commonName, aliases: normalizeTerms([...(row.aliases ?? []), row.scientificName]), href: fishingFoundationAnchor("species", row.slug), keywords: normalizeTerms([row.waterClass, row.taxonKind, "Texas fishing"]) })),
    ...guides.map((guide) => ({ id: `fishing-guide:${guide.id}`, kind: "guide" as const, name: guide.businessName, aliases: normalizeTerms([guide.guideName]), href: fishingGuideCanonicalPath(guide.slug), keywords: normalizeTerms(guide.serviceRegions ?? []) })),
    ...reports.map((report) => ({ id: `fishing-report:${report.id}`, kind: "report" as const, name: report.title, aliases: [], href: fishingReportCanonicalPath(report.slug), keywords: ["fishing report"] })),
    ...access.map((point) => ({ id: `fishing-access:${point.id}`, kind: "access" as const, name: point.name, aliases: [], href: fishingAccessCanonicalPath(point.slug), keywords: normalizeTerms([point.kind, point.city, point.county]) })),
    ...tackleShops.map((shop) => ({ id: `fishing-tackle:${shop.id}`, kind: "business" as const, name: shop.name, aliases: [], href: fishingServiceCanonicalPath(shop.slug), keywords: normalizeTerms(["tackle shop", shop.city, shop.county]) })),
    ...businesses.map((business) => ({ id: `fishing-business:${business.id}`, kind: "business" as const, name: business.name, aliases: [], href: fishingServiceCanonicalPath(business.slug), keywords: normalizeTerms([business.category, business.city, business.county]) })),
  ];
  return [...new Map(entities.map((entity) => [entity.id, entity])).values()];
}

export function findFishingInternalLinkEntities(text: string, entities: FishingInternalLinkEntity[], limit = 8) {
  const normalizedText = text.toLowerCase();
  return entities
    .map((entity) => {
      const terms = [entity.name, ...entity.aliases].filter((term) => term.length >= 3);
      const matchedTerm = terms.find((term) => normalizedText.includes(term.toLowerCase()));
      return matchedTerm ? { entity, matchedTerm } : null;
    })
    .filter((match): match is { entity: FishingInternalLinkEntity; matchedTerm: string } => Boolean(match))
    .slice(0, Math.max(0, limit));
}
