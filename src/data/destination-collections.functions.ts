import { createServerFn } from "@tanstack/react-start";

import type { Destination } from "./types";

type DestinationCollectionKey = "aquariums" | "museums";

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
  .handler(async (): Promise<Destination[]> => {
    const [
      { listResolvedDestinations },
      { prepareDestinationForDelivery },
    ] = await Promise.all([
      import("./destination-query-runtime"),
      import("@/lib/editorial-image-delivery"),
    ]);

    return (await listResolvedDestinations({ limit: 5000 }))
      .map(prepareDestinationForDelivery);
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
