import { fixtureFishingCatalog } from "./fixtures";
import { expandedFishingLakes, expandedLakeSpeciesProfiles, expandedLakeTechniqueProfiles } from "./lake-expansion-fixtures";
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
  lakes: [...fixtureFishingCatalog.lakes, ...expandedFishingLakes],
  species: texasFreshwaterFishSpecies,
  lakeSpecies: [...fixtureFishingCatalog.lakeSpecies, ...expandedLakeSpeciesProfiles],
  lakeTechniques: [...fixtureFishingCatalog.lakeTechniques, ...expandedLakeTechniqueProfiles],
});

export const fishingPlatform = createFixtureFishingRepositories(fishingCatalog);
export const fishingScope = { brandId: "texasdefined" } as const;

export * from "./repositories";
export * from "./slugs";
export * from "./species-catalog";
export * from "./species-routing";
export * from "./types";
export * from "./validation";
