const MEMORY_KEY = 'texasdefined:internal-link-memory';
const MAX_ENTITIES = 250;
const MAX_COUNT = 1000;

export type InternalLinkMemoryEntry = {
  entityId: string;
  impressions: number;
  clicks: number;
  lastShownAt?: string;
  lastClickedAt?: string;
};

function storage(): Storage | undefined {
  if (typeof window === 'undefined') return undefined;
  try { return window.localStorage; } catch { return undefined; }
}

export function readInternalLinkMemory(): Record<string, InternalLinkMemoryEntry> {
  const raw = storage()?.getItem(MEMORY_KEY);
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as Record<string, InternalLinkMemoryEntry>;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch { return {}; }
}

export function recordInternalLinkExposure(entityId: string, event: 'impression' | 'click') {
  const current = readInternalLinkMemory();
  const entry = current[entityId] ?? { entityId, impressions: 0, clicks: 0 };
  if (event === 'impression') {
    entry.impressions = Math.min(MAX_COUNT, entry.impressions + 1);
    entry.lastShownAt = new Date().toISOString();
  } else {
    entry.clicks = Math.min(MAX_COUNT, entry.clicks + 1);
    entry.lastClickedAt = new Date().toISOString();
  }
  current[entityId] = entry;
  const retained = Object.fromEntries(
    Object.entries(current)
      .sort(([, a], [, b]) => Date.parse(b.lastShownAt ?? b.lastClickedAt ?? '') - Date.parse(a.lastShownAt ?? a.lastClickedAt ?? ''))
      .slice(0, MAX_ENTITIES),
  );
  storage()?.setItem(MEMORY_KEY, JSON.stringify(retained));
}

export function exposurePenalty(entityId: string): number {
  const entry = readInternalLinkMemory()[entityId];
  if (!entry) return 0;
  return Math.min(4, Math.floor(entry.impressions / 5));
}

export function internalLinkExposureWeights(): Record<string, number> {
  return Object.fromEntries(Object.values(readInternalLinkMemory()).map((entry) => [entry.entityId, Math.min(4, Math.floor(entry.impressions / 5))]));
}

export function internalLinkMemorySummary() {
  const entries = Object.values(readInternalLinkMemory());
  const impressions = entries.reduce((sum, entry) => sum + entry.impressions, 0);
  const clicks = entries.reduce((sum, entry) => sum + entry.clicks, 0);
  const ranked = entries.map((entry) => ({ ...entry, ctr: entry.impressions ? entry.clicks / entry.impressions : 0 }));
  return {
    trackedEntities: entries.length,
    impressions,
    clicks,
    overexposed: [...ranked].sort((a, b) => b.impressions - a.impressions || b.clicks - a.clicks).slice(0, 10),
    mostEngaged: [...ranked].filter((entry) => entry.impressions >= 3).sort((a, b) => b.ctr - a.ctr || b.clicks - a.clicks).slice(0, 10),
    unclicked: ranked.filter((entry) => entry.impressions >= 5 && entry.clicks === 0).sort((a, b) => b.impressions - a.impressions).slice(0, 10),
  };
}
