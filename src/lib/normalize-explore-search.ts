/** Normalize optional route/search values before any string methods are called. */
export function normalizeExploreSearch(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.toLowerCase().trim().replace(/\s+/g, " ");
}
