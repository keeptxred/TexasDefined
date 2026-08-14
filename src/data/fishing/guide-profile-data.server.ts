import { fishingPlatform, fishingScope } from "./index";
import { fishingGuideCanonicalPath } from "./guide-routing";

const SPONSORED_GUIDE_KINDS = ["featured-guide", "lake-guide", "regional-guide", "species-guide"] as const;

export async function loadFishingGuideProfileDataServer(slug: string) {
  const guide = await fishingPlatform.guides.getBySlug(fishingScope, slug);
  if (!guide || guide.status !== "published" || !guide.verifiedListing) return null;

  const [guideLakes, guideSpecies, lakes, species, techniques, advertisers, placements] = await Promise.all([
    fishingPlatform.guideLakes.list({ ...fishingScope, guideId: guide.id }),
    fishingPlatform.guideSpecies.list({ ...fishingScope, guideId: guide.id }),
    fishingPlatform.lakes.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.species.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.techniques.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.advertisers.list({ ...fishingScope, status: "published" }),
    fishingPlatform.placements.list({ ...fishingScope, status: "published", limit: 5000 }),
  ]);

  const lakeById = new Map(lakes.map((row) => [row.id, row]));
  const speciesById = new Map(species.map((row) => [row.id, row]));
  const techniqueById = new Map(techniques.map((row) => [row.id, row]));
  const advertiserById = new Map(advertisers.map((row) => [row.id, row]));
  const guideAdvertiserIds = new Set(advertisers.filter((row) => row.guideId === guide.id).map((row) => row.id));

  const sponsoredPlacements = placements
    .filter((placement) => guideAdvertiserIds.has(placement.advertiserId) && SPONSORED_GUIDE_KINDS.includes(placement.kind as (typeof SPONSORED_GUIDE_KINDS)[number]))
    .map((placement) => ({ placement, advertiser: advertiserById.get(placement.advertiserId) }))
    .filter((entry) => Boolean(entry.advertiser));

  return {
    guide,
    canonicalPath: fishingGuideCanonicalPath(guide.slug),
    lakes: guideLakes.map((relation) => ({ relation, lake: lakeById.get(relation.lakeId) })).filter((row) => Boolean(row.lake)),
    species: guideSpecies.map((relation) => ({ relation, species: speciesById.get(relation.speciesId) })).filter((row) => Boolean(row.species)),
    techniques: (guide.techniqueIds ?? []).map((id) => techniqueById.get(id)).filter((row) => Boolean(row)),
    sponsoredPlacements,
  };
}

export type FishingGuideProfileData = NonNullable<Awaited<ReturnType<typeof loadFishingGuideProfileDataServer>>>;
