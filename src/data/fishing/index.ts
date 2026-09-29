import { fixtureFishingCatalog } from "./fixtures";
import { expandedFishingLakes, expandedLakeSpeciesProfiles, expandedLakeTechniqueProfiles } from "./lake-expansion-fixtures";
import { wave2FishingLakes, wave2LakeSpeciesProfiles, wave2LakeTechniqueProfiles } from "./lake-expansion-wave2-fixtures";
import { wave3FishingLakes, wave3LakeSpeciesProfiles, wave3LakeTechniqueProfiles } from "./lake-expansion-wave3-fixtures";
import { expandedShowcaseLakePrototypes } from "./expanded-showcase-lakes-prototype";
import { derivePrototypeTechniqueProfiles, reconcileLakeTechniqueProfiles } from "./prototype-technique-profiles";
import { createFixtureFishingRepositories } from "./repositories";
import { showcaseLakePrototypes } from "./showcase-lakes-prototype";
import { texasFreshwaterFishSpecies } from "./species-catalog";
import { assertValidFishingCatalog } from "./validation";
import { wave2ShowcaseLakePrototypes } from "./wave2-showcase-lakes-prototype";
import { wave3ShowcaseLakePrototypes } from "./wave3-showcase-lakes-prototype";

/**
 * Single binding point for the fishing vertical. The public app currently uses
 * a validated fixture catalog; a Supabase-backed implementation can replace
 * this object later without changing routes or components.
 *
 * The catalog combines the statewide freshwater species registry with verified
 * complete-lake expansions while preserving the same repository boundary.
 */
const fishingLakes = [...fixtureFishingCatalog.lakes, ...expandedFishingLakes, ...wave2FishingLakes, ...wave3FishingLakes];
const lakeSpecies = [...fixtureFishingCatalog.lakeSpecies, ...expandedLakeSpeciesProfiles, ...wave2LakeSpeciesProfiles, ...wave3LakeSpeciesProfiles];
const explicitLakeTechniques = [...fixtureFishingCatalog.lakeTechniques, ...expandedLakeTechniqueProfiles, ...wave2LakeTechniqueProfiles, ...wave3LakeTechniqueProfiles];
const verifiedLakePrototypes = [
  ...Object.values(showcaseLakePrototypes),
  ...Object.values(expandedShowcaseLakePrototypes),
  ...Object.values(wave2ShowcaseLakePrototypes),
  ...Object.values(wave3ShowcaseLakePrototypes),
];
const prototypeTechniqueProfiles = derivePrototypeTechniqueProfiles(verifiedLakePrototypes, lakeSpecies);
const lakeTechniques = reconcileLakeTechniqueProfiles(explicitLakeTechniques, prototypeTechniqueProfiles);

const fishingCatalog = assertValidFishingCatalog({
  ...fixtureFishingCatalog,
  lakes: fishingLakes,
  species: texasFreshwaterFishSpecies,
  lakeSpecies,
  lakeTechniques,
});

export const fishingPlatform = createFixtureFishingRepositories(fishingCatalog);
export const fishingScope = { brandId: "texasdefined" } as const;

export * from "./repositories";
export * from "./slugs";
export * from "./species-catalog";
export * from "./species-routing";
export * from "./types";
export * from "./validation";
