import type { Article, CategorySlug } from "./types";
import { DEFAULT_EDITORIAL_DESK_ID, HOMES_LAND_EDITORIAL_DESK_ID } from "./editorial-desks";

const LEGACY_EDITORIAL_DESK_IDS = new Set([
  DEFAULT_EDITORIAL_DESK_ID,
  "a-marisol",
  "a-dell",
  HOMES_LAND_EDITORIAL_DESK_ID,
]);

const HOMES_LAND_CATEGORIES = new Set<CategorySlug>([
  "moving-to-texas",
  "home-garden",
  "real-estate",
]);
const TRAVEL_OUTDOORS_CATEGORIES = new Set<CategorySlug>([
  "lakes-rivers",
  "major-springs",
  "state-parks",
  "national-parks",
  "caverns",
  "beaches-coast",
  "historic-sites",
  "road-trips",
  "small-towns",
  "outdoors",
]);
const FOOD_CULTURE_CATEGORIES = new Set<CategorySlug>([
  "food-bbq",
  "events",
]);

export function editorialDeskIdForCategory(category: CategorySlug): string {
  if (HOMES_LAND_CATEGORIES.has(category)) return HOMES_LAND_EDITORIAL_DESK_ID;
  if (TRAVEL_OUTDOORS_CATEGORIES.has(category)) return "a-dell";
  if (FOOD_CULTURE_CATEGORIES.has(category)) return "a-marisol";
  return DEFAULT_EDITORIAL_DESK_ID;
}

/**
 * Repair legacy machine-assigned desk IDs without overwriting a future verified
 * human contributor. Only the known institutional desk IDs are normalized.
 */
export function normalizeArticleEditorialDesk<T extends Article>(article: T): T {
  if (!LEGACY_EDITORIAL_DESK_IDS.has(article.authorId)) return article;
  const authorId = editorialDeskIdForCategory(article.category);
  return authorId === article.authorId ? article : { ...article, authorId };
}
