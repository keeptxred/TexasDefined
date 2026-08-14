import type { SearchDocument } from "@/data/types";
import { FISHING_GUIDES_DIRECTORY_PATH, fishingGuideCanonicalPath } from "./guide-routing";
import { fishingFoundationAnchor } from "./slugs";

export async function buildFishingSearchDocuments(): Promise<SearchDocument[]> {
  const { fishingPlatform, fishingScope } = await import("./index");
  const [lakes, species, guides, reports, businesses, lakeSpecies] = await Promise.all([
    fishingPlatform.lakes.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.species.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.guides.list({ ...fishingScope, status: "published", verifiedListing: true, limit: 5000 }),
    fishingPlatform.reports.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.businesses.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.lakeSpecies.list(fishingScope),
  ]);

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
    {
      id: "fishing-directory:texas-fishing",
      brandId: "texasdefined",
      kind: "guide",
      title: "Texas Fishing Guide",
      summary: "Statewide TexasDefined fishing hub connecting complete lake guides, fish species, seasonal patterns, access, reports and verified local fishing infrastructure.",
      keywords: ["Texas fishing", "Texas fishing guide", "Texas lakes", "Texas fish species", "fishing reports", "fishing guides"],
      href: "/fishing",
    },
    {
      id: "fishing-directory:texas-fishing-lakes",
      brandId: "texasdefined",
      kind: "guide",
      title: "Texas Fishing Lakes",
      summary: "Compare the five complete TexasDefined fishing-lake guides by region, size, location and verified fishery strengths before opening the full lake guide.",
      keywords: ["Texas fishing lakes", "Texas lake fishing", "Lake Conroe", "Lake Fork", "Sam Rayburn Reservoir", "Lake Livingston", "Lake Texoma", "compare fishing lakes"],
      href: "/fishing/lakes",
    },
    {
      id: "fishing-directory:texas-fishing-guides",
      brandId: "texasdefined",
      kind: "guide",
      title: "Texas Fishing Guide Directory",
      summary: "Browse Texas fishing guides only after their listings and lake and target-species relationships are verified.",
      keywords: ["Texas fishing guides", "fishing guide directory", "verified fishing guides", "lake fishing guides"],
      href: FISHING_GUIDES_DIRECTORY_PATH,
    },
    ...lakes.map((lake): SearchDocument => ({
      id: `fishing-lake:${lake.id}`,
      brandId: lake.brandId,
      kind: "fishing-lake",
      title: `${lake.name} fishing`,
      summary: lake.summary,
      keywords: [lake.name, ...(lake.aliases ?? []), ...lake.counties.map((county) => `${county} County`), ...lake.nearestCities, lake.region, lake.riverBasin, lake.primaryWaterway, ...(speciesForLake.get(lake.id) ?? [])].filter((value): value is string => Boolean(value)),
      href: fishingFoundationAnchor("lake", lake.slug),
    })),
    ...species.map((row): SearchDocument => ({
      id: `fish-species:${row.id}`,
      brandId: row.brandId,
      kind: "fish-species",
      title: `${row.commonName} fishing in Texas`,
      summary: row.summary,
      keywords: [row.commonName, row.scientificName, ...(row.aliases ?? []), "Texas fishing", "fish species"].filter((value): value is string => Boolean(value)),
      href: fishingFoundationAnchor("species", row.slug),
    })),
    ...guides.map((guide): SearchDocument => ({
      id: `fishing-guide:${guide.id}`,
      brandId: guide.brandId,
      kind: "fishing-guide",
      title: guide.businessName,
      summary: guide.bio ?? `Verified fishing guide serving ${guide.lakeIds.map((lakeId) => lakeById.get(lakeId)?.name).filter(Boolean).join(", ")}.`,
      keywords: [guide.businessName, guide.guideName, ...guide.lakeIds.map((lakeId) => lakeById.get(lakeId)?.name), ...guide.speciesIds.map((speciesId) => speciesById.get(speciesId)?.commonName)].filter((value): value is string => Boolean(value)),
      href: fishingGuideCanonicalPath(guide.slug),
    })),
    ...reports.map((report): SearchDocument => ({
      id: `fishing-report:${report.id}`,
      brandId: report.brandId,
      kind: "fishing-report",
      title: report.title,
      summary: report.summary,
      keywords: [lakeById.get(report.lakeId)?.name, "fishing report", ...report.speciesUpdates.map((update) => speciesById.get(update.speciesId)?.commonName)].filter((value): value is string => Boolean(value)),
      href: `/fishing#report-${report.slug}`,
    })),
    ...businesses.map((business): SearchDocument => ({
      id: `fishing-business:${business.id}`,
      brandId: business.brandId,
      kind: "fishing-business",
      title: business.name,
      summary: business.description ?? `${business.category.replaceAll("-", " ")} serving Texas anglers.`,
      keywords: [business.name, business.category, business.city, business.county, ...business.lakeIds.map((lakeId) => lakeById.get(lakeId)?.name)].filter((value): value is string => Boolean(value)),
      href: `/fishing#business-${business.slug}`,
    })),
  ];

  return [...new Map(documents.map((document) => [document.id, document])).values()];
}
