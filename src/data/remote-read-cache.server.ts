type RemoteJsonRow = Record<string, unknown>;

type RemoteReadCacheEntry = {
  value?: RemoteJsonRow[];
  expiresAt: number;
  staleUntil: number;
  retryAfter: number;
  pending?: Promise<RemoteJsonRow[]>;
};

const REMOTE_READ_TTL_MS = 5 * 60 * 1000;
const REMOTE_STALE_TTL_MS = 30 * 60 * 1000;
const REMOTE_FAILURE_BACKOFF_MS = 30 * 1000;
const MAX_REMOTE_READ_CACHE_ENTRIES = 256;

const remoteReadCache = new Map<string, RemoteReadCacheEntry>();

function trimRemoteReadCache() {
  while (remoteReadCache.size >= MAX_REMOTE_READ_CACHE_ENTRIES) {
    const oldest = remoteReadCache.keys().next().value as string | undefined;
    if (!oldest) break;
    remoteReadCache.delete(oldest);
  }
}

export async function fetchCachedRemoteJsonRows(options: {
  cacheKey: string;
  url: string;
  headers: HeadersInit;
  timeoutMs: number;
  errorLabel: string;
}): Promise<RemoteJsonRow[]> {
  const key = `${options.cacheKey}:${options.timeoutMs}:${options.url}`;
  const now = Date.now();
  const existing = remoteReadCache.get(key);

  if (existing?.value && existing.expiresAt > now) return existing.value;
  if (existing?.pending) return existing.pending;
  if (existing && existing.retryAfter > now) {
    if (existing.value && existing.staleUntil > now) return existing.value;
    throw new Error(`${options.errorLabel} is temporarily backed off after an upstream failure`);
  }

  const entry: RemoteReadCacheEntry = existing ?? {
    expiresAt: 0,
    staleUntil: 0,
    retryAfter: 0,
  };

  const pending = fetch(options.url, {
    headers: options.headers,
    signal: AbortSignal.timeout(options.timeoutMs),
  })
    .then(async (response) => {
      if (!response.ok) throw new Error(`${options.errorLabel} failed: ${response.status}`);
      const value = await response.json();
      const rows: RemoteJsonRow[] = Array.isArray(value) ? value : [];
      const completedAt = Date.now();
      entry.value = rows;
      entry.expiresAt = completedAt + REMOTE_READ_TTL_MS;
      entry.staleUntil = completedAt + REMOTE_STALE_TTL_MS;
      entry.retryAfter = 0;
      return rows;
    })
    .catch((error) => {
      entry.retryAfter = Date.now() + REMOTE_FAILURE_BACKOFF_MS;
      if (entry.value && entry.staleUntil > Date.now()) return entry.value;
      throw error;
    })
    .finally(() => {
      entry.pending = undefined;
    });

  entry.pending = pending;
  if (!existing) trimRemoteReadCache();
  remoteReadCache.set(key, entry);
  return pending;
}
