import { createServerFn } from "@tanstack/react-start";

import type { Destination } from "./types";

const MAX_RELATED_DESTINATIONS = 8;

export const getArticleRelatedDestinations = createServerFn({ method: "POST" })
  .inputValidator((data: { slugs: string[] }) => ({
    slugs: [...new Set((data.slugs ?? [])
      .map((slug) => String(slug).trim().toLowerCase())
      .filter((slug) => /^[a-z0-9][a-z0-9-]{0,179}$/.test(slug)))]
      .slice(0, MAX_RELATED_DESTINATIONS),
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

    const resolved = await Promise.all(
      data.slugs.map((slug) => getResolvedDestination(slug)),
    );

    return resolved
      .filter((destination): destination is Destination => Boolean(destination))
      .map(prepareDestinationForDelivery);
  });
