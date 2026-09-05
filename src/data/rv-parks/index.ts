import { createServerFn } from "@tanstack/react-start";

import type { Destination, SearchDocument } from "../types";

export const RV_PARK_SEED_IMPORTED_AT = "2026-09-05";
export const RV_PARK_SEED_COUNT = 250;

const loadRvParkDestinations = createServerFn({ method: "GET" }).handler(async () => {
  const { loadRvParkDestinationsServer } = await import("./registry.server");
  return loadRvParkDestinationsServer();
});

const loadRvParkDestination = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { getRvParkDestinationServer } = await import("./registry.server");
    return getRvParkDestinationServer(data.slug) ?? null;
  });

const loadRvParksForCounty = createServerFn({ method: "GET" })
  .inputValidator((data: { countySlug: string }) => data)
  .handler(async ({ data }) => {
    const { loadRvParksForCountyServer } = await import("./registry.server");
    return loadRvParksForCountyServer(data.countySlug);
  });

const loadRvParkSearchDocuments = createServerFn({ method: "GET" }).handler(async () => {
  const { buildRvParkSearchDocumentsServer } = await import("./registry.server");
  return buildRvParkSearchDocumentsServer();
});

export function listRvParkDestinations(): Promise<Destination[]> {
  return loadRvParkDestinations();
}

export function getRvParkDestination(slug: string): Promise<Destination | null> {
  return loadRvParkDestination({ data: { slug } });
}

export function rvParksForCounty(countySlug: string): Promise<Destination[]> {
  return loadRvParksForCounty({ data: { countySlug } });
}

export function buildRvParkSearchDocuments(): Promise<SearchDocument[]> {
  return loadRvParkSearchDocuments();
}
