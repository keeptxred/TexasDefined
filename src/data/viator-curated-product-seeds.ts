import type { ViatorProductSeed } from "./viator-curated-product-seeds-base";
import {
  VIATOR_CURATED_PRODUCT_SEEDS as VIATOR_CURATED_PRODUCT_SEEDS_BASE,
  VIATOR_PRODUCT_EXCLUSION_RULES,
} from "./viator-curated-product-seeds-base";
import { VIATOR_CURATED_PRODUCT_SEEDS_PAGES_18_20 } from "./viator-curated-product-seeds-pages18-20";

export type { ViatorProductSeed, ViatorProductSeedFit } from "./viator-curated-product-seeds-base";
export { VIATOR_PRODUCT_EXCLUSION_RULES };

/**
 * Combined editorial discovery signals. Keep supplied batches additive so
 * product research can grow without rewriting previously reviewed inventory.
 */
export const VIATOR_CURATED_PRODUCT_SEEDS: readonly ViatorProductSeed[] = [
  ...VIATOR_CURATED_PRODUCT_SEEDS_BASE,
  ...VIATOR_CURATED_PRODUCT_SEEDS_PAGES_18_20,
];

export function viatorSeedsForMarket(marketSlug: string) {
  return VIATOR_CURATED_PRODUCT_SEEDS.filter((seed) => seed.marketSlug === marketSlug);
}
