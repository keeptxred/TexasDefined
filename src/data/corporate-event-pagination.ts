/** Keep large Texas-wide venue searches usable without changing editorial order. */
export const CORPORATE_EVENT_RESULT_PAGE_SIZE = 12;

export function visibleCorporateEventResults<T>(all: readonly T[], shown: number): T[] {
  const normalized = Number.isFinite(shown) ? Math.max(CORPORATE_EVENT_RESULT_PAGE_SIZE, Math.floor(shown)) : CORPORATE_EVENT_RESULT_PAGE_SIZE;
  return all.slice(0, normalized);
}

export function nextCorporateEventResultCount(total: number, shown: number): number {
  const safeTotal = Math.max(0, Math.floor(Number.isFinite(total) ? total : 0));
  const safeShown = Math.max(CORPORATE_EVENT_RESULT_PAGE_SIZE, Math.floor(Number.isFinite(shown) ? shown : CORPORATE_EVENT_RESULT_PAGE_SIZE));
  return Math.min(safeTotal, safeShown + CORPORATE_EVENT_RESULT_PAGE_SIZE);
}
