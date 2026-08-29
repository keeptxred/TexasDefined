import type { CategorySlug } from "@/data/types";

export const MIN_EXPLORE_CATEGORY_INDEX_ITEMS = 3;

const STAGED_EXPLORE_CATEGORY_SLUGS = new Set<CategorySlug>([
]);

export function isExploreCategoryIndexReady(category: CategorySlug, itemCount: number): boolean {
  return !STAGED_EXPLORE_CATEGORY_SLUGS.has(category) && itemCount >= MIN_EXPLORE_CATEGORY_INDEX_ITEMS;
}

export function stagedExploreCategorySlugs(): CategorySlug[] {
  return [...STAGED_EXPLORE_CATEGORY_SLUGS];
}
