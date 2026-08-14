import { fishingPlatform, fishingScope } from "./index";
import { FISH_SPECIES_CATALOG_VERIFIED_AT, fishSpeciesFamilies } from "./species-catalog";
import { fishingFoundationAnchor, isCompleteFishingLakeSlug, isCompleteFishingSpeciesSlug } from "./slugs";

export async function loadFishSpeciesDirectoryDataServer() {
  const [species, lakes, lakeSpecies] = await Promise.all([
    fishingPlatform.species.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.lakes.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.lakeSpecies.list(fishingScope),
  ]);
  const completeLakes = lakes.filter((lake) => isCompleteFishingLakeSlug(lake.slug));
  const completeLakeById = new Map(completeLakes.map((lake) => [lake.id, lake]));
  const completeLakesBySpeciesId = new Map<string, { name: string; slug: string; href: string; quality: string; prominence: string }[]>();

  for (const relation of lakeSpecies) {
    const lake = completeLakeById.get(relation.lakeId);
    if (!lake) continue;
    const current = completeLakesBySpeciesId.get(relation.speciesId) ?? [];
    current.push({
      name: lake.name,
      slug: lake.slug,
      href: fishingFoundationAnchor("lake", lake.slug),
      quality: relation.quality,
      prominence: relation.prominence,
    });
    completeLakesBySpeciesId.set(relation.speciesId, current);
  }

  const enrichSpecies = (row: (typeof species)[number]) => ({
    ...row,
    completeGuide: isCompleteFishingSpeciesSlug(row.slug),
    completeLakes: (completeLakesBySpeciesId.get(row.id) ?? [])
      .sort((left, right) => prominenceRank(left.prominence) - prominenceRank(right.prominence)
        || qualityRank(left.quality) - qualityRank(right.quality)
        || left.name.localeCompare(right.name)),
  });

  const enrichedBySlug = new Map(species.map((row) => [row.slug, enrichSpecies(row)]));
  const groupedIds = new Set<string>();

  const groups = fishSpeciesFamilies.map((family) => {
    const rows = family.speciesSlugs.map((slug) => enrichedBySlug.get(slug)).filter((row): row is NonNullable<typeof row> => Boolean(row));
    rows.forEach((row) => groupedIds.add(row.id));
    return { ...family, species: rows };
  }).filter((group) => group.species.length > 0);

  const otherSpecies = species.filter((row) => !groupedIds.has(row.id)).map(enrichSpecies);
  if (otherSpecies.length) groups.push({ id: "other", name: "Other freshwater fish", description: "Additional published Texas fishing species records.", speciesSlugs: otherSpecies.map((row) => row.slug), species: otherSpecies });

  const sources = [...new Map(species.flatMap((row) => row.sources).map((row) => [row.url, row])).values()];
  return {
    verifiedAt: FISH_SPECIES_CATALOG_VERIFIED_AT,
    totalSpecies: species.length,
    completeSpeciesGuides: species.filter((row) => isCompleteFishingSpeciesSlug(row.slug)).length,
    completeLakeGuides: completeLakes.length,
    groups,
    sources,
  };
}

function prominenceRank(value: string) { return value === "primary" ? 0 : value === "secondary" ? 1 : 2; }
function qualityRank(value: string) { return value === "excellent" ? 0 : value === "good" ? 1 : value === "fair" ? 2 : value === "poor" ? 3 : 4; }
