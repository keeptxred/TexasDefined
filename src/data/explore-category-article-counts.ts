import type { CategorySlug } from "@/data/types";

/**
 * Capped article inventory for dynamic Explore category indexability.
 * Values stop at 3 because the indexability threshold only needs to know
 * whether a category has zero, one, two, or at least three article children.
 * CI derives these values from the canonical fixture article graph and fails
 * if this manifest drifts.
 */
export const EXPLORE_CATEGORY_ARTICLE_COUNTS = {
  "lakes-rivers": 3,
  "major-springs": 0,
  "state-parks": 1,
  "national-parks": 0,
  "caverns": 0,
  "beaches-coast": 0,
  "historic-sites": 1,
  "road-trips": 3,
  "small-towns": 2,
  "food-bbq": 3,
  "outdoors": 3,
} as const satisfies Partial<Record<CategorySlug, number>>;

export function exploreCategoryArticleCount(category: CategorySlug): number {
  return EXPLORE_CATEGORY_ARTICLE_COUNTS[category as keyof typeof EXPLORE_CATEGORY_ARTICLE_COUNTS] ?? 0;
}
