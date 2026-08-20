export const PAINTED_CHURCHES_SEARCH_INDEXING_ENABLED = false;

const PERMANENTLY_NON_INDEXABLE_PAINTED_CHURCH_PATHS = new Set([
  "/explore/painted-churches/preindex-readiness",
  "/explore/painted-churches/release-review",
]);

export function isPaintedChurchPath(path?: string | null) {
  return Boolean(path?.startsWith("/explore/painted-churches"));
}

export function shouldIndexPaintedChurchPath(path?: string | null) {
  if (!path) return true;
  if (PERMANENTLY_NON_INDEXABLE_PAINTED_CHURCH_PATHS.has(path)) return false;
  return !isPaintedChurchPath(path) || PAINTED_CHURCHES_SEARCH_INDEXING_ENABLED;
}
