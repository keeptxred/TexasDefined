import { createServerFn } from "@tanstack/react-start";

import type { DestinationRelationshipGroup } from "./destination-relationships";

export const getDestinationRelationshipGroups = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => ({
    slug: String(data.slug ?? "").trim().slice(0, 180),
  }))
  .handler(async ({ data }): Promise<DestinationRelationshipGroup[]> => {
    if (!data.slug) return [];

    const [
      { listResolvedDestinations, getResolvedDestination },
      { buildDestinationRelationshipGroups },
      { prepareDestinationForDelivery },
    ] = await Promise.all([
      import("./destination-query-runtime"),
      import("./destination-relationships"),
      import("@/lib/editorial-image-delivery"),
    ]);

    const destination = await getResolvedDestination(data.slug);
    if (!destination) return [];

    // Keep the complete relationship catalog on the server. Query-caching this
    // 5,000-item collection in a public route causes TanStack Query to dehydrate
    // the entire catalog into the browser even though the page only renders a
    // small relationship set.
    const catalog = (await listResolvedDestinations({ limit: 5000 }))
      .map(prepareDestinationForDelivery);

    return buildDestinationRelationshipGroups(
      prepareDestinationForDelivery(destination),
      catalog,
    );
  });
