import { fishingPlatform, fishingScope } from "./index";
import { fishingFoundationAnchor } from "./slugs";
import { largemouthBassEditorialProfile } from "./species-profiles";

const qualityScore = { excellent: 40, good: 30, fair: 20, poor: 10, unknown: 0 } as const;
const prominenceScore = { primary: 6, secondary: 3, present: 1 } as const;

export async function loadLargemouthBassPageDataServer() {
  const species = await fishingPlatform.species.getBySlug(fishingScope, largemouthBassEditorialProfile.slug);
  if (!species || species.status !== "published") throw new Error("Published largemouth bass species record is unavailable.");

  const [relations, lakes, techniques, guides, placements, advertisers, allSpecies] = await Promise.all([
    fishingPlatform.lakeSpecies.list({ ...fishingScope, speciesId: species.id }),
    fishingPlatform.lakes.list({ ...fishingScope, status: "published", speciesId: species.id, limit: 5000 }),
    fishingPlatform.techniques.list({ ...fishingScope, status: "published", speciesId: species.id, limit: 100 }),
    fishingPlatform.guides.list({ ...fishingScope, status: "published", speciesId: species.id, limit: 100 }),
    fishingPlatform.placements.list({ ...fishingScope, status: "published", speciesId: species.id, limit: 100 }),
    fishingPlatform.advertisers.list({ ...fishingScope, status: "published" }),
    fishingPlatform.species.list({ ...fishingScope, status: "published", limit: 5000 }),
  ]);

  const lakeById = new Map(lakes.map((lake) => [lake.id, lake]));
  const rankedLakes = relations
    .map((relation) => {
      const lake = lakeById.get(relation.lakeId);
      if (!lake) return null;
      const score = qualityScore[relation.quality] + prominenceScore[relation.prominence] + (lake.featured ? 1 : 0);
      return {
        lake,
        relation,
        score,
        href: fishingFoundationAnchor("lake", lake.slug),
      };
    })
    .filter((row): row is NonNullable<typeof row> => Boolean(row))
    .sort((left, right) => right.score - left.score || left.lake.name.localeCompare(right.lake.name));

  const techniqueById = new Map(techniques.map((row) => [row.id, row]));
  const recommendedTechniques = largemouthBassEditorialProfile.techniqueIds.map((id) => techniqueById.get(id)).filter((row): row is NonNullable<typeof row> => Boolean(row));
  const relatedSpecies = largemouthBassEditorialProfile.relatedSpeciesSlugs.map((slug) => allSpecies.find((row) => row.slug === slug)).filter((row): row is NonNullable<typeof row> => Boolean(row));
  const verifiedGuides = guides.filter((guide) => guide.verifiedListing);
  const advertiserById = new Map(advertisers.map((row) => [row.id, row]));
  const now = largemouthBassEditorialProfile.verifiedAt;
  const sponsoredPlacements = placements
    .filter((row) => (!row.startsAt || row.startsAt.slice(0, 10) <= now) && (!row.endsAt || row.endsAt.slice(0, 10) >= now))
    .map((placement) => ({ placement, advertiser: advertiserById.get(placement.advertiserId) ?? null }))
    .filter((row) => Boolean(row.advertiser));

  const regions = [...new Set(rankedLakes.map((row) => row.lake.region))];
  return {
    species,
    profile: largemouthBassEditorialProfile,
    rankedLakes,
    recommendedTechniques,
    relatedSpecies,
    verifiedGuides,
    sponsoredPlacements,
    regions,
  };
}
