/**
 * Avoid re-fetching permanently unreadable original-publisher pages every six
 * hours while newer qualified stories never receive source enrichment.
 * Driven ONLY by the existing authoritative KTR fetch-state ledger.
 */
export const SOURCE_HYDRATION_FAILURE_COOLDOWN_HOURS = 24;
export const SOURCE_HYDRATION_RETRYABLE_FAILURES = new Set(['no_readable_body', 'update_failed']);

export function cooldownFeedIds(rows, nowMs = Date.now()) {
  const blocked = new Set();
  for (const row of rows ?? []) {
    const id = Number(row?.feed_item_id);
    const attempted = Date.parse(String(row?.last_attempt_at ?? ''));
    if (!Number.isSafeInteger(id) || id <= 0) continue;
    const lastResult = String(row?.last_result ?? '');
    // A 500-1,199-character HTML fragment can count as a successful source
    // extraction, yet it still cannot unlock the 1,200-char publication-ready
    // evidence threshold. Rotate these just as unreadable publisher responses.
    const shortSuccess = lastResult === 'success' &&
      Number.isFinite(Number(row?.chars)) && Number(row.chars) < 1200;
    if (!shortSuccess && !SOURCE_HYDRATION_RETRYABLE_FAILURES.has(lastResult)) continue;
    if (!Number.isFinite(attempted)) continue;
    const elapsed = nowMs - attempted;
    // Never allow clock-skew to prevent a future retry indefinitely.
    if (elapsed >= 0 && elapsed < SOURCE_HYDRATION_FAILURE_COOLDOWN_HOURS * 3_600_000) {
      blocked.add(id);
    }
  }
  return blocked;
}
