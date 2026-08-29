import type { CategorySlug } from "@/data/types";

export const MIN_EXPLORE_CATEGORY_INDEX_ITEMS = 3;

export type ExploreCategoryInventory = {
  articleCount: number;
  destinationCount: number;
  supplementalCount?: number;
};

const STAGED_EXPLORE_CATEGORY_SLUGS = new Set<CategorySlug>([
]);

function safeCount(value: number | undefined): number {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? Math.floor(value) : 0;
}

export function exploreCategoryItemCount(inventory: ExploreCategoryInventory): number {
  return safeCount(inventory.articleCount) + safeCount(inventory.destinationCount) + safeCount(inventory.supplementalCount);
}

export function isExploreCategoryIndexReady(category: CategorySlug, inventory: ExploreCategoryInventory): boolean {
  if (STAGED_EXPLORE_CATEGORY_SLUGS.has(category)) return false;
  return exploreCategoryItemCount(inventory) >= MIN_EXPLORE_CATEGORY_INDEX_ITEMS;
}

export function stagedExploreCategorySlugs(): CategorySlug[] {
  return [...STAGED_EXPLORE_CATEGORY_SLUGS];
}
