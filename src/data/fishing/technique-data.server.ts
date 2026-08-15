import { fishingPlatform, fishingScope } from "./index";
import { fishingFoundationAnchor, isCompleteFishingLakeSlug } from "./slugs";
import {
  FISHING_TECHNIQUES_VERIFIED_AT,
  PUBLISHED_FISHING_TECHNIQUE_SLUGS,
  fishingTechniqueCanonicalPath,
} from "./technique-routing";

export async function loadFishingTechniqueDirectoryServer() {
  const [allLakes, species, techniques, lakeTechniques] = await Promise.all([
    fishingPlatform.lakes.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.species.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.techniques.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.lakeTechniques.list(fishingScope),
  ]);

  const lakes = allLakes.filter((lake) => isCompleteFishingLakeSlug(lake.slug));
  const lakeById = new Map(lakes.map((lake) => [lake.id, lake]));
  const speciesById = new Map(species.map((fish) => [fish.id, fish]));
  const allowedSlugs = new Set<string>(PUBLISHED_FISHING_TECHNIQUE_SLUGS);

  const entries = techniques
    .filter((technique) => allowedSlugs.has(technique.slug))
    .map((technique) => {
      const profiles = lakeTechniques
        .filter((profile) => profile.techniqueId === technique.id)
        .filter((profile) => lakeById.has(profile.lakeId))
        .filter((profile) => Boolean(profile.verifiedAt) && profile.sources.length > 0)
        .map((profile) => ({
          profile,
          lake: lakeById.get(profile.lakeId)!,
          species: profile.speciesIds.map((speciesId) => speciesById.get(speciesId)).filter((fish): fish is NonNullable<typeof fish> => Boolean(fish)),
        }))
        .sort((a, b) => a.lake.name.localeCompare(b.lake.name));

      if (!profiles.length || !technique.verifiedAt || !technique.sources.length) return null;

      const relatedSpecies = [...new Map(profiles.flatMap((row) => row.species).map((fish) => [fish.id, fish])).values()]
        .sort((a, b) => a.commonName.localeCompare(b.commonName));
      const relatedLakes = [...new Map(profiles.map((row) => [row.lake.id, row.lake])).values()]
        .sort((a, b) => a.name.localeCompare(b.name));
      const seasons = [...new Set(profiles.flatMap((row) => row.profile.seasons))].sort();
      const sources = [...new Map([
        ...technique.sources,
        ...profiles.flatMap((row) => row.profile.sources),
      ].map((source) => [source.url, source])).values()];

      return {
        technique,
        canonicalPath: fishingTechniqueCanonicalPath(technique.slug),
        profiles,
        species: relatedSpecies,
        lakes: relatedLakes,
        seasons,
        sources,
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry))
    .sort((a, b) => a.technique.name.localeCompare(b.technique.name));

  return {
    verifiedAt: FISHING_TECHNIQUES_VERIFIED_AT,
    entries,
    species: [...new Map(entries.flatMap((entry) => entry.species).map((fish) => [fish.id, fish])).values()]
      .sort((a, b) => a.commonName.localeCompare(b.commonName)),
    categories: [...new Set(entries.map((entry) => entry.technique.category))].sort(),
    policy: {
      sourcing: "Technique pages publish only when the technique and at least one complete-lake application have verified source relationships.",
      conditions: "Technique guidance is durable planning context, not a live bite report, forecast, or claim that a method is productive today.",
      commerce: "TexasDefined does not rank technique guidance by sponsorship, brand, product price, affiliate value, or advertiser status.",
    },
  };
}

export async function loadFishingTechniqueProfileServer(slug: string) {
  const directory = await loadFishingTechniqueDirectoryServer();
  return directory.entries.find((entry) => entry.technique.slug === slug) ?? null;
}

export function fishingTechniqueLakeHref(slug: string) {
  return fishingFoundationAnchor("lake", slug);
}

export function fishingTechniqueSpeciesHref(slug: string) {
  return fishingFoundationAnchor("species", slug);
}

export type FishingTechniqueDirectoryData = Awaited<ReturnType<typeof loadFishingTechniqueDirectoryServer>>;
export type FishingTechniqueProfileData = NonNullable<Awaited<ReturnType<typeof loadFishingTechniqueProfileServer>>>;
