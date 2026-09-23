import { fixtureFishingCatalog } from "./fixtures";
import { expandedFishingLakes, expandedLakeSpeciesProfiles, expandedLakeTechniqueProfiles } from "./lake-expansion-fixtures";
import { wave2FishingLakes, wave2LakeSpeciesProfiles, wave2LakeTechniqueProfiles } from "./lake-expansion-wave2-fixtures";
import { createFixtureFishingRepositories } from "./repositories";
import { texasFreshwaterFishSpecies } from "./species-catalog";
import { assertValidFishingCatalog } from "./validation";

/**
 * Single binding point for the fishing vertical. The public app currently uses
 * a validated fixture catalog; a Supabase-backed implementation can replace
 * this object later without changing routes or components.
 *
 * The catalog combines the statewide freshwater species registry with verified
 * complete-lake expansions while preserving the same repository boundary.
 */
const fishingCatalog = assertValidFishingCatalog({
  ...fixtureFishingCatalog,
  lakes: [...fixtureFishingCatalog.lakes, ...expandedFishingLakes, ...wave2FishingLakes],
  species: texasFreshwaterFishSpecies,
  lakeSpecies: [...fixtureFishingCatalog.lakeSpecies, ...expandedLakeSpeciesProfiles, ...wave2LakeSpeciesProfiles],
  lakeTechniques: [...fixtureFishingCatalog.lakeTechniques, ...expandedLakeTechniqueProfiles, ...wave2LakeTechniqueProfiles],
});

export const fishingPlatform = createFixtureFishingRepositories(fishingCatalog);
export const fishingScope = { brandId: "texasdefined" } as const;

export * from "./repositories";
export * from "./slugs";
export * from "./species-catalog";
export * from "./species-routing";
export * from "./types";
export * from "./validation";
