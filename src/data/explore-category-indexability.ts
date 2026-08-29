import type { CategorySlug } from "@/data/types";

const STAGED_EXPLORE_CATEGORY_SLUGS = new Set<CategorySlug>([
]);

export function isExploreCategoryIndexReady(category: CategorySlug): boolean {
  return !STAGED_EXPLORE_CATEGORY_SLUGS.has(category);
}

export function stagedExploreCategorySlugs(): CategorySlug[] {
  return [...STAGED_EXPLORE_CATEGORY_SLUGS];
}
