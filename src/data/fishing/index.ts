import { fixtureFishingCatalog } from "./fixtures";
import { createFixtureFishingRepositories } from "./repositories";
import { texasFreshwaterFishSpecies } from "./species-catalog";
import { assertValidFishingCatalog } from "./validation";

/**
 * Single binding point for the fishing vertical. The public app currently uses
 * a validated fixture catalog; a Supabase-backed implementation can replace
 * this object later without changing routes or components.
 *
 * Batch 4 extends the foundation catalog with the statewide freshwater species
 * registry while preserving the existing lake/species relationship ids.
 */
const fishingCatalog = assertValidFishingCatalog({
  ...fixtureFishingCatalog,
  species: texasFreshwaterFishSpecies,
});

export const fishingPlatform = createFixtureFishingRepositories(fishingCatalog);
export const fishingScope = { brandId: "texasdefined" } as const;

export * from "./repositories";
export * from "./slugs";
export * from "./species-catalog";
export * from "./species-routing";
export * from "./types";
export * from "./validation";
