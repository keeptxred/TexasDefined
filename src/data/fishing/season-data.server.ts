import { fishingPlatform, fishingScope } from "./index";
import { FISHING_SEASON_FILTERS, FISHING_SEASONS_VERIFIED_AT, type FishingSeasonFilter } from "./season-routing";
import { fishingFoundationAnchor, isCompleteFishingLakeSlug } from "./slugs";

export async function loadFishingSeasonDataServer() {
  const [allLakes, species, techniques, lakeSpecies, lakeTechniques] = await Promise.all([
    fishingPlatform.lakes.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.species.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.techniques.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.lakeSpecies.list(fishingScope),
    fishingPlatform.lakeTechniques.list(fishingScope),
  ]);

  const lakes = allLakes.filter((lake) => isCompleteFishingLakeSlug(lake.slug));
  const lakeById = new Map(lakes.map((lake) => [lake.id, lake]));
  const speciesById = new Map(species.map((fish) => [fish.id, fish]));
  const techniqueById = new Map(techniques.map((technique) => [technique.id, technique]));

  const entries = lakeSpecies
    .filter((relation) => lakeById.has(relation.lakeId) && relation.seasonalPatterns.length > 0)
    .map((relation) => {
      const lake = lakeById.get(relation.lakeId)!;
      const fish = speciesById.get(relation.speciesId);
      if (!fish) return null;
      const techniqueRows = lakeTechniques
        .filter((profile) => profile.lakeId === lake.id && profile.speciesIds.includes(fish.id))
        .map((profile) => ({ profile, technique: techniqueById.get(profile.techniqueId) }))
        .filter((row) => Boolean(row.technique))
        .sort((a, b) => a.technique!.name.localeCompare(b.technique!.name));
      return {
        id: relation.id,
        lake,
        href: fishingFoundationAnchor("lake", lake.slug),
        species: fish,
        relation,
        techniques: techniqueRows,
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry))
    .sort((a, b) => a.lake.name.localeCompare(b.lake.name) || a.species.commonName.localeCompare(b.species.commonName));

  const seasonCounts = Object.fromEntries(FISHING_SEASON_FILTERS.map((season) => [season, entries.filter((entry) => entryMatchesSeason(entry, season)).length])) as Record<FishingSeasonFilter, number>;

  const relevantSpecies = species
    .filter((fish) => entries.some((entry) => entry.species.id === fish.id))
    .sort((a, b) => a.commonName.localeCompare(b.commonName));

  return {
    verifiedAt: FISHING_SEASONS_VERIFIED_AT,
    entries,
    species: relevantSpecies,
    seasonCounts,
    policy: {
      conditions: "Seasonal patterns are durable planning context, not a live fishing report, forecast, or claim about today's bite.",
      yearRound: "Year-round means a verified fishery opportunity is not limited to one named season; it does not mean conditions or catch rates are equally good every day.",
      ranking: "Results are alphabetical by lake and species. Sponsorship never changes seasonal guidance or ordering.",
    },
  };
}

export function entryMatchesSeason(entry: { relation: { seasonalPatterns: Array<{ season: string }> } }, season: FishingSeasonFilter) {
  return entry.relation.seasonalPatterns.some((pattern) => pattern.season === season || pattern.season === "year-round");
}

export type FishingSeasonData = Awaited<ReturnType<typeof loadFishingSeasonDataServer>>;
