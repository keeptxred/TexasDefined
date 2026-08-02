import type { BrandId } from "@/brand/types";

import { fixturePlatform } from "./fixtures/repositories";
import type { PlatformRepositories } from "./repositories";

/**
 * The single binding point between the app and its data source.
 *
 * Phase 1: local fixtures. When the shared external Supabase project is
 * connected (after schema review), replace `fixturePlatform` with the
 * Supabase-backed implementations here — nothing else changes.
 */
export const platform: PlatformRepositories = fixturePlatform;

/** Brand scope used by every repository query in this app. */
export const CURRENT_BRAND_ID: BrandId = "texasdefined";

export const scope = { brandId: CURRENT_BRAND_ID } as const;

export type { PlatformRepositories };
