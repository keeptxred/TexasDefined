import { fishingPlatform, fishingScope } from "./index";
import { FISHING_GUIDES_VERIFIED_AT, fishingGuideCanonicalPath } from "./guide-routing";

const SPONSORED_GUIDE_KINDS = ["featured-guide", "regional-guide", "statewide-advertiser"] as const;

export async function loadFishingGuideDirectoryDataServer() {
  const [guides, guideLakes, guideSpecies, lakes, species, advertisers, placements] = await Promise.all([
    fishingPlatform.guides.list({ ...fishingScope, status: "published", verifiedListing: true, limit: 5000 }),
    fishingPlatform.guideLakes.list(fishingScope),
    fishingPlatform.guideSpecies.list(fishingScope),
    fishingPlatform.lakes.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.species.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.advertisers.list({ ...fishingScope, status: "published" }),
    fishingPlatform.placements.list({ ...fishingScope, status: "published", limit: 5000 }),
  ]);

  const lakeById = new Map(lakes.map((row) => [row.id, row]));
  const speciesById = new Map(species.map((row) => [row.id, row]));
  const advertiserById = new Map(advertisers.map((row) => [row.id, row]));

  const editorialGuides = [...guides]
    .sort((left, right) => left.businessName.localeCompare(right.businessName) || left.slug.localeCompare(right.slug))
    .map((guide) => {
      const lakeRelations = guideLakes.filter((relation) => relation.guideId === guide.id);
      const speciesRelations = guideSpecies.filter((relation) => relation.guideId === guide.id);
      return {
        guide,
        href: fishingGuideCanonicalPath(guide.slug),
        lakes: lakeRelations.map((relation) => ({ relation, lake: lakeById.get(relation.lakeId) })).filter((row) => Boolean(row.lake)),
        species: speciesRelations.map((relation) => ({ relation, species: speciesById.get(relation.speciesId) })).filter((row) => Boolean(row.species)),
      };
    });

  const usedLakeIds = new Set(editorialGuides.flatMap((entry) => entry.lakes.map(({ lake }) => lake!.id)));
  const usedSpeciesIds = new Set(editorialGuides.flatMap((entry) => entry.species.map(({ species: fish }) => fish!.id)));
  const usedRegions = new Set(editorialGuides.flatMap(({ guide }) => guide.serviceRegions ?? []));

  const sponsoredPlacements = placements
    .filter((placement) => SPONSORED_GUIDE_KINDS.includes(placement.kind as (typeof SPONSORED_GUIDE_KINDS)[number]))
    .map((placement) => ({ placement, advertiser: advertiserById.get(placement.advertiserId) }))
    .filter((entry) => Boolean(entry.advertiser));

  return {
    verifiedAt: FISHING_GUIDES_VERIFIED_AT,
    editorialOrder: "Alphabetical by verified guide business name. Sponsorship never changes this order.",
    guides: editorialGuides,
    filters: {
      lakes: lakes.filter((lake) => usedLakeIds.has(lake.id)).sort((a, b) => a.name.localeCompare(b.name)),
      species: species.filter((fish) => usedSpeciesIds.has(fish.id)).sort((a, b) => a.commonName.localeCompare(b.commonName)),
      regions: [...usedRegions].sort(),
      tripTypes: [] as string[],
    },
    sponsoredPlacements,
  };
}

export type FishingGuideDirectoryData = Awaited<ReturnType<typeof loadFishingGuideDirectoryDataServer>>;
