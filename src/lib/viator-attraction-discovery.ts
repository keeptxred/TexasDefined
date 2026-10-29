import { VIATOR_LIVE_DESTINATION_IDS } from "./viator-market-feed.ts";

/** Provider-origin discovery metadata only, never SEO authority content. */
export interface ViatorAttractionCandidate {
  provider: "viator";
  providerId: string;
  name: string;
  market: string;
  status: "needs-independent-source-review";
  /** Optional indication of inventory, not a guarantee of available tickets. */
  productCount?: number;
}
export interface ViatorAttractionDiscoveryResponse {
  source: "viator";
  market: string;
  checkedAt: string;
  candidates: ViatorAttractionCandidate[];
  incomplete: true; // intentional bounded sample, not a complete attraction catalog
  robots: "noindex";
}

export function attractionDiscoveryRequestBody(market: string) {
  const destination = VIATOR_LIVE_DESTINATION_IDS[market];
  if (!destination) throw new Error("Unreviewed Viator destination");
  return {
    destinationId: Number(destination),
    sorting: { sort: "DEFAULT" },
    pagination: { start: 1, count: 12 },
  };
}

/**
 * Strictly sanitize the non-indexable discovery list. Never return provider
 * descriptions, images, reviews, admission, unverified address or hours.
 */
export function viatorAttractionCandidates(payload: unknown, market: string): ViatorAttractionCandidate[] {
  if (!payload || typeof payload !== "object" || !Array.isArray((payload as {attractions?: unknown}).attractions)) {
    throw Error("Invalid Viator attraction search results");
  }
  const items = (payload as {attractions: unknown[]}).attractions;
  const found = new Set<string>();
  const results: ViatorAttractionCandidate[] = [];
  for (const item of items.slice(0, 30)) {
    if (!item || typeof item !== "object") continue;
    const value = item as Record<string, unknown>;
    const id = value.attractionId;
    const name = value.name;
    if (!((typeof id === "number" && Number.isSafeInteger(id) && id > 0) ||
          (typeof id === "string" && /^\d{1,12}$/.test(id))) ||
        typeof name !== "string" || name.trim().length < 4 || name.length > 150) continue;
    const providerId = String(id);
    if (found.has(providerId)) continue;
    found.add(providerId);
    const count = value.productCount;
    results.push({
      provider: "viator", providerId, market, name: name.trim(),
      status: "needs-independent-source-review",
      ...(typeof count === "number" && Number.isSafeInteger(count) && count >= 0 ? {productCount: count} : {}),
    });
    if (results.length >= 12) break;
  }
  return results;
}
