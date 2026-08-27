import type { CategorySlug } from "@/data/types";

// Keep this explicit registry even when empty: unfinished Explore categories can
// be staged here as noindex/follow without changing route or sitemap behavior.
const STAGED_EXPLORE_CATEGORY_SLUGS = new Set<CategorySlug>([]);

export function isExploreCategoryIndexReady(category: CategorySlug): boolean {
  return !STAGED_EXPLORE_CATEGORY_SLUGS.has(category);
}

export function stagedExploreCategorySlugs(): CategorySlug[] {
  return [...STAGED_EXPLORE_CATEGORY_SLUGS];
}
