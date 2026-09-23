import { createServerFn } from "@tanstack/react-start";

import type { Destination } from "./types";

type DestinationCollectionKey = "aquariums" | "museums";

export type DestinationComparisonRecord = Pick<
  Destination,
  | "slug"
  | "name"
  | "summary"
  | "category"
  | "region"
  | "nearestTown"
  | "bestSeason"
  | "entryNote"
  | "highlights"
  | "managingAuthority"
  | "officialUrl"
  | "sourceCheckedAt"
  | "county"
>;

export type DestinationSearchRecord = Pick<
  Destination,
  | "id"
  | "slug"
  | "name"
  | "summary"
  | "category"
  | "region"
  | "nearestTown"
  | "coordinates"
  | "hero"
  | "bestSeason"
  | "highlights"
  | "managingAuthority"
  | "sourceCheckedAt"
  | "county"
  | "accessibilityNotes"
  | "featured"
>;

function sanitizeSlug(value: unknown) {
  return String(value ?? "").trim().slice(0, 180);
}

export const getDestinationsBySlugs = createServerFn({ method: "GET" })
  .inputValidator((data: { slugs: string[] }) => ({
    slugs: [...new Set((Array.isArray(data?.slugs) ? data.slugs : []).map(sanitizeSlug).filter(Boolean))].slice(0, 100),
  }))
  .handler(async ({ data }): Promise<Destination[]> => {
    if (!data.slugs.length) return [];

    const [
      { getResolvedDestination },
      { prepareDestinationForDelivery },
    ] = await Promise.all([
      import("./destination-query-runtime"),
      import("@/lib/editorial-image-delivery"),
    ]);

    const destinations = await Promise.all(data.slugs.map((slug) => getResolvedDestination(slug)));
    return destinations
      .filter((destination): destination is NonNullable<typeof destination> => Boolean(destination))
      .map(prepareDestinationForDelivery);
  });

export const getDestinationCatalog = createServerFn({ method: "GET" })
  .handler(async (): Promise<DestinationComparisonRecord[]> => {
    const { listResolvedDestinations } = await import("./destination-query-runtime");

    // The comparison table only needs compact planning metadata. Do not ship
    // destination article bodies, images, coordinates, authority guides or
    // other detail-only fields for thousands of rows.
    return (await listResolvedDestinations({ limit: 5000 })).map((destination) => ({
      slug: destination.slug,
      name: destination.name,
      summary: destination.summary,
      category: destination.category,
      region: destination.region,
      nearestTown: destination.nearestTown,
      bestSeason: destination.bestSeason,
      entryNote: destination.entryNote,
      highlights: destination.highlights.slice(0, 8),
      managingAuthority: destination.managingAuthority,
      officialUrl: destination.officialUrl,
      sourceCheckedAt: destination.sourceCheckedAt,
      county: destination.county,
    }));
  });

export const getDestinationSearchCatalog = createServerFn({ method: "GET" })
  .handler(async (): Promise<DestinationSearchRecord[]> => {
    const [
      { listResolvedDestinations },
      { prepareDestinationForDelivery },
    ] = await Promise.all([
      import("./destination-query-runtime"),
      import("@/lib/editorial-image-delivery"),
    ]);

    return (await listResolvedDestinations({ limit: 5000 }))
      .map(prepareDestinationForDelivery)
      .map((destination) => ({
        id: destination.id,
        slug: destination.slug,
        name: destination.name,
        summary: destination.summary,
        category: destination.category,
        region: destination.region,
        nearestTown: destination.nearestTown,
        coordinates: destination.coordinates,
        hero: destination.hero,
        bestSeason: destination.bestSeason,
        highlights: destination.highlights.slice(0, 8),
        managingAuthority: destination.managingAuthority,
        sourceCheckedAt: destination.sourceCheckedAt,
        county: destination.county,
        accessibilityNotes: destination.accessibilityNotes,
        featured: destination.featured,
      }));
  });

export const getDestinationCollection = createServerFn({ method: "GET" })
  .inputValidator((data: { collection: DestinationCollectionKey }) => ({
    collection: data?.collection === "aquariums" ? "aquariums" as const : "museums" as const,
  }))
  .handler(async ({ data }): Promise<Destination[]> => {
    const [
      { listResolvedDestinations },
      { prepareDestinationForDelivery },
      { aquariumMarineCollectionDestinations },
      { museumCollectionDestinations },
    ] = await Promise.all([
      import("./destination-query-runtime"),
      import("@/lib/editorial-image-delivery"),
      import("./aquarium-marine-collection"),
      import("./museum-collection"),
    ]);

    // Keep the 5,000-record source catalog entirely server-side. Only the
    // small collection actually rendered by the route is serialized to the
    // browser.
    const catalog = (await listResolvedDestinations({ limit: 5000 }))
      .map(prepareDestinationForDelivery);

    return data.collection === "aquariums"
      ? aquariumMarineCollectionDestinations(catalog)
      : museumCollectionDestinations(catalog);
  });
