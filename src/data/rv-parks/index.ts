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
    const wave4 = await import("./curated-public-wave4");
    const wave5 = await import("./curated-public-wave5");
    const wave6 = await import("./curated-public-wave6");
    const wave7 = await import("./curated-public-wave7");
    const wave8 = await import("./curated-public-wave8");
    const wave9 = await import("./curated-public-wave9");
    const wave10 = await import("./curated-public-wave10");
    const wave4Destinations = wave4.applyRvParkCuratedPublicWave4List(registry.loadRvParkDestinationsServer());
    const wave5Destinations = wave5.applyRvParkCuratedPublicWave5List(wave4Destinations);
    const wave6Destinations = wave6.applyRvParkCuratedPublicWave6List(wave5Destinations);
    const wave7Destinations = wave7.applyRvParkCuratedPublicWave7List(wave6Destinations);
    const wave8Destinations = wave8.applyRvParkCuratedPublicWave8List(wave7Destinations);
    const wave9Destinations = wave9.applyRvParkCuratedPublicWave9List(wave8Destinations);
    const destinations = wave10.applyRvParkCuratedPublicWave10List(wave9Destinations);
    if (data.action === "one") return destinations.find((item) => item.slug === data.value) ?? null;
    if (data.action === "search") return wave4.buildRvParkSearchDocumentsFromCuratedDestinations(destinations);
    return destinations;
  });

export function listRvParkDestinations(): Promise<Destination[]> {
  return loadRvParks({ data: { action: "all" } }) as Promise<Destination[]>;
}

export function getRvParkDestination(slug: string): Promise<Destination | null> {
  return loadRvParks({ data: { action: "one", value: slug } }) as Promise<Destination | null>;
}

export function buildRvParkSearchDocuments(): Promise<SearchDocument[]> {
  return loadRvParks({ data: { action: "search" } }) as Promise<SearchDocument[]>;
}
