import { fishingPlatform, fishingScope } from "./index";
import { fishingGuideCanonicalPath } from "./guide-routing";
import { fishingFoundationAnchor } from "./slugs";

export type FishingInternalLinkKind = "lake" | "species" | "guide" | "report" | "business";

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
  const [lakes, species, guides, reports, businesses] = await Promise.all([
    fishingPlatform.lakes.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.species.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.guides.list({ ...fishingScope, status: "published", verifiedListing: true, limit: 5000 }),
    fishingPlatform.reports.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.businesses.list({ ...fishingScope, status: "published", limit: 5000 }),
  ]);

  const entities: FishingInternalLinkEntity[] = [
    ...lakes.map((lake) => ({
      id: `fishing-lake:${lake.id}`,
      kind: "lake" as const,
      name: lake.name,
      aliases: normalizeTerms(lake.aliases ?? []),
      href: fishingFoundationAnchor("lake", lake.slug),
      keywords: normalizeTerms([...lake.counties.map((county) => `${county} County`), ...lake.nearestCities, lake.riverBasin, lake.primaryWaterway]),
    })),
    ...species.map((row) => ({
      id: `fish-species:${row.id}`,
      kind: "species" as const,
      name: row.commonName,
      aliases: normalizeTerms([...(row.aliases ?? []), row.scientificName]),
      href: fishingFoundationAnchor("species", row.slug),
      keywords: normalizeTerms([row.waterClass, row.taxonKind, "Texas fishing"]),
    })),
    ...guides.map((guide) => ({
      id: `fishing-guide:${guide.id}`,
      kind: "guide" as const,
      name: guide.businessName,
      aliases: normalizeTerms([guide.guideName]),
      href: fishingGuideCanonicalPath(guide.slug),
      keywords: normalizeTerms(guide.serviceRegions ?? []),
    })),
    ...reports.map((report) => ({
      id: `fishing-report:${report.id}`,
      kind: "report" as const,
      name: report.title,
      aliases: [],
      href: `/fishing#report-${report.slug}`,
      keywords: ["fishing report"],
    })),
    ...businesses.map((business) => ({
      id: `fishing-business:${business.id}`,
      kind: "business" as const,
      name: business.name,
      aliases: [],
      href: `/fishing#business-${business.slug}`,
      keywords: normalizeTerms([business.category, business.city, business.county]),
    })),
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
