import type { SearchDocument } from "@/data/types";

export async function buildFishingSearchDocuments(): Promise<SearchDocument[]> {
  const [platformModule, guideRouting, localRouting, plannerRouting, regulationsRouting, reportRouting, seasonRouting, slugs, validation] = await Promise.all([
    import("./index"),
    import("./guide-routing"),
    import("./local-routing"),
    import("./planner-routing"),
    import("./regulations-routing"),
    import("./report-routing"),
    import("./season-routing"),
    import("./slugs"),
    import("./validation"),
  ]);
  const { fishingPlatform, fishingScope } = platformModule;
  const { FISHING_GUIDES_DIRECTORY_PATH, fishingGuideCanonicalPath } = guideRouting;
  const { FISHING_ACCESS_DIRECTORY_PATH, FISHING_SERVICES_DIRECTORY_PATH, fishingAccessCanonicalPath, fishingServiceCanonicalPath } = localRouting;
  const { FISHING_LAKE_COMPARE_PATH, FISHING_TRIP_PLANNER_PATH } = plannerRouting;
  const { FISHING_REGULATIONS_PATH } = regulationsRouting;
  const { FISHING_REPORTS_DIRECTORY_PATH, fishingReportCanonicalPath } = reportRouting;
  const { FISHING_SEASONS_PATH } = seasonRouting;
  const { fishingFoundationAnchor } = slugs;
  const { isFishingRecordVerified } = validation;
  const [lakes, species, guides, reports, accessPointsRaw, tackleShopsRaw, businessesRaw, lakeSpecies] = await Promise.all([
    fishingPlatform.lakes.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.species.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.guides.list({ ...fishingScope, status: "published", verifiedListing: true, limit: 5000 }),
    fishingPlatform.reports.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.accessPoints.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.tackleShops.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.businesses.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.lakeSpecies.list(fishingScope),
  ]);
  const accessPoints = accessPointsRaw.filter(isFishingRecordVerified);
  const tackleShops = tackleShopsRaw.filter(isFishingRecordVerified);
  const businesses = businessesRaw.filter(isFishingRecordVerified);
  const speciesById = new Map(species.map((row) => [row.id, row]));
  const lakeById = new Map(lakes.map((row) => [row.id, row]));
  const speciesForLake = new Map<string, string[]>();
  for (const relation of lakeSpecies) {
    const names = speciesForLake.get(relation.lakeId) ?? [];
    const name = speciesById.get(relation.speciesId)?.commonName;
    if (name) names.push(name);
    speciesForLake.set(relation.lakeId, names);
  }

  const documents: SearchDocument[] = [
    { id: "fishing-directory:texas-fishing", brandId: "texasdefined", kind: "guide", title: "Texas Fishing Guide", summary: "Statewide TexasDefined fishing hub connecting complete lake guides, fish species, seasonal patterns, access, reports and verified local fishing infrastructure.", keywords: ["Texas fishing", "Texas fishing guide", "Texas lakes", "Texas fish species", "fishing reports", "fishing guides"], href: "/fishing" },
    { id: "fishing-directory:texas-fishing-lakes", brandId: "texasdefined", kind: "guide", title: "Texas Fishing Lakes", summary: "Compare the five complete TexasDefined fishing-lake guides by region, size, location and verified fishery strengths before opening the full lake guide.", keywords: ["Texas fishing lakes", "Texas lake fishing", "Lake Conroe", "Lake Fork", "Sam Rayburn Reservoir", "Lake Livingston", "Lake Texoma", "compare fishing lakes"], href: "/fishing/lakes" },
    { id: "fishing-directory:texas-fishing-trip-planner", brandId: "texasdefined", kind: "guide", title: "Texas Fishing Trip Planner", summary: "Choose a target species and Texas region, then narrow complete lake guides using verified fishery relationships and freshness-controlled report context.", keywords: ["Texas fishing trip planner", "plan fishing trip", "best lake for species", "Texas fishing by region", "fishing vacation planner"], href: FISHING_TRIP_PLANNER_PATH },
    { id: "fishing-directory:texas-fishing-lake-compare", brandId: "texasdefined", kind: "guide", title: "Compare Texas Fishing Lakes", summary: "Compare up to three complete Texas fishing lake guides by durable lake facts, fishery strengths, current reports and verified local coverage without paid ranking.", keywords: ["compare Texas fishing lakes", "lake comparison", "Texas lake fishing comparison", "fishing lake chooser"], href: FISHING_LAKE_COMPARE_PATH },
    { id: "fishing-directory:texas-fishing-seasons", brandId: "texasdefined", kind: "guide", title: "Texas Fishing Seasons", summary: "Explore source-backed spring, summer, fall, winter and year-round fishing patterns across complete TexasDefined lake guides, with matching species and techniques kept separate from live conditions.", keywords: ["Texas fishing seasons", "spring fishing Texas", "summer fishing Texas", "fall fishing Texas", "winter fishing Texas", "when to fish Texas", "seasonal fishing patterns"], href: FISHING_SEASONS_PATH },
    { id: "fishing-directory:texas-fishing-regulations", brandId: "texasdefined", kind: "guide", title: "Texas Fishing Regulations & Licenses", summary: "A source-first Texas fishing rules checklist that points anglers to current TPWD licenses, harvest limits, waterbody exceptions, legal methods and invasive-species rules without freezing volatile legal details.", keywords: ["Texas fishing regulations", "Texas fishing license", "fishing bag limits", "fishing length limits", "Texas Outdoor Annual", "TPWD fishing rules"], href: FISHING_REGULATIONS_PATH },
    { id: "fishing-directory:texas-fishing-guides", brandId: "texasdefined", kind: "guide", title: "Texas Fishing Guide Directory", summary: "Browse Texas fishing guides only after their listings and lake and target-species relationships are verified.", keywords: ["Texas fishing guides", "fishing guide directory", "verified fishing guides", "lake fishing guides"], href: FISHING_GUIDES_DIRECTORY_PATH },
    { id: "fishing-directory:texas-fishing-reports", brandId: "texasdefined", kind: "guide", title: "Texas Fishing Reports", summary: "Browse source-backed Texas fishing reports with explicit publication dates and freshness labels so old conditions are never presented as today's bite.", keywords: ["Texas fishing reports", "lake fishing report", "current fishing conditions", "verified fishing reports"], href: FISHING_REPORTS_DIRECTORY_PATH },
    { id: "fishing-directory:texas-fishing-access", brandId: "texasdefined", kind: "guide", title: "Texas Fishing Access", summary: "Verified Texas boat ramps, marinas, shore access, piers and kayak launches tied to the lakes they serve.", keywords: ["Texas boat ramps", "fishing access", "marinas", "shore fishing", "kayak launches"], href: FISHING_ACCESS_DIRECTORY_PATH },
    { id: "fishing-directory:texas-fishing-services", brandId: "texasdefined", kind: "guide", title: "Texas Fishing Services", summary: "Verified tackle shops and lake-area fishing businesses tied to the waters they actually serve.", keywords: ["Texas tackle shops", "fishing services", "lake businesses", "bait shops"], href: FISHING_SERVICES_DIRECTORY_PATH },
    ...lakes.map((lake): SearchDocument => ({ id: `fishing-lake:${lake.id}`, brandId: lake.brandId, kind: "fishing-lake", title: `${lake.name} fishing`, summary: lake.summary, keywords: [lake.name, ...(lake.aliases ?? []), ...lake.counties.map((county) => `${county} County`), ...lake.nearestCities, lake.region, lake.riverBasin, lake.primaryWaterway, ...(speciesForLake.get(lake.id) ?? [])].filter((value): value is string => Boolean(value)), href: fishingFoundationAnchor("lake", lake.slug) })),
    ...species.map((row): SearchDocument => ({ id: `fish-species:${row.id}`, brandId: row.brandId, kind: "fish-species", title: `${row.commonName} fishing in Texas`, summary: row.summary, keywords: [row.commonName, row.scientificName, ...(row.aliases ?? []), "Texas fishing", "fish species"].filter((value): value is string => Boolean(value)), href: fishingFoundationAnchor("species", row.slug) })),
    ...guides.map((guide): SearchDocument => ({ id: `fishing-guide:${guide.id}`, brandId: guide.brandId, kind: "fishing-guide", title: guide.businessName, summary: guide.bio ?? `Verified fishing guide serving ${guide.lakeIds.map((lakeId) => lakeById.get(lakeId)?.name).filter(Boolean).join(", ")}.`, keywords: [guide.businessName, guide.guideName, ...guide.lakeIds.map((lakeId) => lakeById.get(lakeId)?.name), ...guide.speciesIds.map((speciesId) => speciesById.get(speciesId)?.commonName)].filter((value): value is string => Boolean(value)), href: fishingGuideCanonicalPath(guide.slug) })),
    ...reports.map((report): SearchDocument => ({ id: `fishing-report:${report.id}`, brandId: report.brandId, kind: "fishing-report", title: report.title, summary: report.summary, keywords: [lakeById.get(report.lakeId)?.name, "fishing report", ...report.speciesUpdates.map((update) => speciesById.get(update.speciesId)?.commonName)].filter((value): value is string => Boolean(value)), href: fishingReportCanonicalPath(report.slug) })),
    ...accessPoints.map((point): SearchDocument => ({ id: `fishing-access:${point.id}`, brandId: point.brandId, kind: "fishing-business", title: point.name, summary: point.description ?? `Verified ${point.kind.replaceAll("-", " ")} for Texas anglers.`, keywords: [point.name, point.kind, point.city, point.county, ...point.lakeIds.map((lakeId) => lakeById.get(lakeId)?.name)].filter((value): value is string => Boolean(value)), href: fishingAccessCanonicalPath(point.slug) })),
    ...tackleShops.map((shop): SearchDocument => ({ id: `fishing-tackle:${shop.id}`, brandId: shop.brandId, kind: "fishing-business", title: shop.name, summary: shop.description ?? "Verified tackle shop serving Texas anglers.", keywords: [shop.name, "tackle shop", shop.city, shop.county, ...shop.lakeIds.map((lakeId) => lakeById.get(lakeId)?.name)].filter((value): value is string => Boolean(value)), href: fishingServiceCanonicalPath(shop.slug) })),
    ...businesses.map((business): SearchDocument => ({ id: `fishing-business:${business.id}`, brandId: business.brandId, kind: "fishing-business", title: business.name, summary: business.description ?? `${business.category.replaceAll("-", " ")} serving Texas anglers.`, keywords: [business.name, business.category, business.city, business.county, ...business.lakeIds.map((lakeId) => lakeById.get(lakeId)?.name)].filter((value): value is string => Boolean(value)), href: fishingServiceCanonicalPath(business.slug) })),
  ];
  return [...new Map(documents.map((document) => [document.id, document])).values()];
}
