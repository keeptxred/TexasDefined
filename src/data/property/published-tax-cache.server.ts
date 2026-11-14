/**
 * Small per-isolate cache for published Comptroller tax-rate snapshots.
 * Government tax records change through controlled imports; a five-minute
 * TTL coalesces repeat reads without affecting verification or corrections.
 * Never cache failures, privileged/admin data, or unbounded user searches.
 */
type Entry = { until: number; pending: Promise<unknown> };
const entries = new Map<string, Entry>();
const MAX_ENTRIES = 512;

export async function cachedPublishedTax<T>(
  key: string,
  load: () => Promise<T>,
  ttlMs = 5 * 60_000,
): Promise<T> {
  const now = Date.now();
  const hit = entries.get(key);
  if (hit && hit.until > now) return hit.pending as Promise<T>;
  if (hit) entries.delete(key);
  const pending = Promise.resolve().then(load);
  const entry: Entry = { until: now + ttlMs, pending };
  entries.set(key, entry);
  while (entries.size > MAX_ENTRIES) {
    const oldest = entries.keys().next().value;
    if (oldest === undefined) break;
    entries.delete(oldest);
  }
  try {
    return await pending;
  } catch (error) {
    if (entries.get(key) === entry) entries.delete(key);
    throw error;
  }
}

export function clearPublishedTaxCacheForTests() {
  entries.clear();
}
