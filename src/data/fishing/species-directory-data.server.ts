import { fishingPlatform, fishingScope } from "./index";
import { FISH_SPECIES_CATALOG_VERIFIED_AT, fishSpeciesFamilies } from "./species-catalog";

export async function loadFishSpeciesDirectoryDataServer() {
  const species = await fishingPlatform.species.list({ ...fishingScope, status: "published", limit: 5000 });
  const bySlug = new Map(species.map((row) => [row.slug, row]));
  const groupedIds = new Set<string>();

  const groups = fishSpeciesFamilies.map((family) => {
    const rows = family.speciesSlugs.map((slug) => bySlug.get(slug)).filter((row): row is NonNullable<typeof row> => Boolean(row));
    rows.forEach((row) => groupedIds.add(row.id));
    return { ...family, species: rows };
  }).filter((group) => group.species.length > 0);

  const otherSpecies = species.filter((row) => !groupedIds.has(row.id));
  if (otherSpecies.length) groups.push({ id: "other", name: "Other freshwater fish", description: "Additional published Texas fishing species records.", speciesSlugs: otherSpecies.map((row) => row.slug), species: otherSpecies });

  const sources = [...new Map(species.flatMap((row) => row.sources).map((row) => [row.url, row])).values()];
  return { verifiedAt: FISH_SPECIES_CATALOG_VERIFIED_AT, totalSpecies: species.length, groups, sources };
}
