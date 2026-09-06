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

const loadCountyRvParks = createServerFn({ method: "GET" })
  .inputValidator((data: { countySlug: string }) => data)
  .handler(async ({ data }) => {
    const registry = await import("./registry.server");
    return registry.loadRvParksForCountyServer(data.countySlug).slice(0, 12);
  });

export function listRvParkDestinations(): Promise<Destination[]> {
  return loadRvParks({ data: { action: "all" } }) as Promise<Destination[]>;
}

export function getRvParkDestination(slug: string): Promise<Destination | null> {
  return loadRvParks({ data: { action: "one", value: slug } }) as Promise<Destination | null>;
}

export function rvParksForCounty(countySlug: string): Promise<Destination[]> {
  return loadCountyRvParks({ data: { countySlug } }) as Promise<Destination[]>;
}

export function buildRvParkSearchDocuments(): Promise<SearchDocument[]> {
  return loadRvParks({ data: { action: "search" } }) as Promise<SearchDocument[]>;
}
