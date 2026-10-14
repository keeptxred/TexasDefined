import type { Destination } from "./types";

/**
 * A closed historic site's source-verified reference page remains eligible for
 * search when its canonical detail route is fully researched and index-ready.
 * Resolve this one record through the same detail pipeline as the public page.
 *
 * This server-only helper is intentionally unrelated to metro-proximity
 * discovery, which must retain its independent shared readiness contract.
 */
export async function loadFirstCapitolSitemapReference(): Promise<Destination | undefined> {
  const { getResolvedDestination } = await import("./destination-query-runtime");
  return getResolvedDestination("first-capitol-of-texas");
}
