import type { BrandId } from "@/brand/types";

import { fixturePlatform } from "./fixtures/repositories";
import type { PlatformRepositories } from "./repositories";

/**
 * The single binding point between the app and its data source.
 *
 * Destinations are served from the shared Supabase Explore catalog
 * (`src/data/explore-remote.ts`). These fixture repositories remain bound here
 * only as an outage fallback: `src/data/queries.ts` uses them when the remote
 * catalog errors or returns nothing. Editorial content (articles, guides,
 * products, events) is still fixture-backed until it moves to the catalog.
 */
export const platform: PlatformRepositories = fixturePlatform;


/** Brand scope used by every repository query in this app. */
export const CURRENT_BRAND_ID: BrandId = "texasdefined";

export const scope = { brandId: CURRENT_BRAND_ID } as const;

export type { PlatformRepositories };
