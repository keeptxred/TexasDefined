export const PAINTED_CHURCHES_SEARCH_INDEXING_ENABLED = false;

export function isPaintedChurchPath(path?: string | null) {
  return Boolean(path?.startsWith("/explore/painted-churches"));
}

export function shouldIndexPaintedChurchPath(path?: string | null) {
  return !isPaintedChurchPath(path) || PAINTED_CHURCHES_SEARCH_INDEXING_ENABLED;
}
