import { createServerFn } from "@tanstack/react-start";

import type { Destination, SearchDocument } from "../types";

export const RV_PARK_SEED_IMPORTED_AT = "2026-09-05";
export const RV_PARK_SEED_COUNT = 250;

type RvParkRequest =
  | { action: "all" }
  | { action: "one"; value: string }
  | { action: "search" };

const loadRvParks = createServerFn({ method: "GET" })
  .inputValidator((data: RvParkRequest) => data)
  .handler(async ({ data }) => {
    const registry = await import("./registry.server");
    if (data.action === "one") return registry.getRvParkDestinationServer(data.value) ?? null;
    if (data.action === "search") return registry.buildRvParkSearchDocumentsServer();
    return registry.loadRvParkDestinationsServer();
  });

function normalizeCountySlug(value: string): string {
  return value
    .replace(/\s+County$/i, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function listRvParkDestinations(): Promise<Destination[]> {
  return loadRvParks({ data: { action: "all" } }) as Promise<Destination[]>;
}

export function getRvParkDestination(slug: string): Promise<Destination | null> {
  return loadRvParks({ data: { action: "one", value: slug } }) as Promise<Destination | null>;
}

export async function rvParksForCounty(countySlug: string): Promise<Destination[]> {
  const normalizedCounty = normalizeCountySlug(countySlug);
  const parks = await listRvParkDestinations();
  return parks
    .filter((park) => Boolean(park.county) && normalizeCountySlug(park.county!) === normalizedCounty)
    .sort((left, right) => left.nearestTown.localeCompare(right.nearestTown) || left.name.localeCompare(right.name))
    .slice(0, 12);
}

export function buildRvParkSearchDocuments(): Promise<SearchDocument[]> {
  return loadRvParks({ data: { action: "search" } }) as Promise<SearchDocument[]>;
}
