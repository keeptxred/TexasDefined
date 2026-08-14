import { fixtureFishingCatalog } from "./fixtures";
import { createFixtureFishingRepositories } from "./repositories";

/**
 * Single binding point for the fishing vertical. The public app currently uses
 * a validated fixture catalog; a Supabase-backed implementation can replace
 * this object later without changing routes or components.
 */
export const fishingPlatform = createFixtureFishingRepositories(fixtureFishingCatalog);
export const fishingScope = { brandId: "texasdefined" } as const;

export * from "./repositories";
export * from "./slugs";
export * from "./types";
export * from "./validation";
