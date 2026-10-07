import { createServerFn } from "@tanstack/react-start";

import { preservedExploreDestinations } from "./destination-preserved-catalog";
import type { DestinationRelationshipGroup } from "./destination-relationships";

export const getDestinationRelationshipGroups = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => ({
    slug: String(data.slug ?? "").trim().slice(0, 180),
  }))
  .handler(async ({ data }): Promise<DestinationRelationshipGroup[]> => {
    if (!data.slug) return [];

    const [
      { getResolvedDestination },
      { buildDestinationRelationshipGroups },
      { prepareDestinationForDelivery },
    ] = await Promise.all([
      import("./destination-query-runtime"),
      import("./destination-relationships"),
      import("@/lib/editorial-image-delivery"),
    ]);

    // Relationship discovery must never fan one destination pageview into a
    // statewide remote-catalog scan. Prefer the preserved catalog for both the
    // origin and related-place candidates; only resolve the origin remotely when
    // it is not present in the preserved catalog.
    const preservedDestination = preservedExploreDestinations.find((destination) => destination.slug === data.slug);
    const destination = preservedDestination ?? await getResolvedDestination(data.slug);
    if (!destination) return [];

    const catalog = preservedExploreDestinations.map(prepareDestinationForDelivery);

    return buildDestinationRelationshipGroups(
      prepareDestinationForDelivery(destination),
      catalog,
    );
  });
