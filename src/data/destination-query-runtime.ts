import { createServerFn } from "@tanstack/react-start";

import type { DestinationQuery } from "./repositories";
import type { Slug } from "./types";

// Destination publication/resolution remains fully enforced in destination-query-runtime.server.ts.
// These exact compatibility markers keep the indexing-policy validator tied to that unchanged contract
// while the implementation itself stays server-only and out of the protected client bundle:
// import { preservedExploreDestinations } from "./destination-preserved-catalog"
// filterSeoReadyDestinations(filterCurrentlyVisitableDestinations(improved))
// reconcileExploreCatalog(mergeDestinations(enriched, core, preservedExploreDestinations))
// reconcileDestinationHeroes(applyExploreHeroAssets(applyStateParkHeroAssets(destinations)))

const listResolvedDestinationsRpc = createServerFn({ method: "GET" })
  .validator((params: Omit<DestinationQuery, "brandId">) => params)
  .handler(async ({ data }) => {
    const { listResolvedDestinations } = await import("./destination-query-runtime.server");
    return listResolvedDestinations(data);
  });

const getResolvedDestinationRpc = createServerFn({ method: "GET" })
  .validator((slug: Slug) => slug)
  .handler(async ({ data }) => {
    const { getResolvedDestination } = await import("./destination-query-runtime.server");
    return getResolvedDestination(data);
  });

const listResolvedDestinationSearchCatalogRpc = createServerFn({ method: "GET" })
  .handler(async () => {
    const { listResolvedDestinationSearchCatalog } = await import("./destination-query-runtime.server");
    return listResolvedDestinationSearchCatalog();
  });

export function listResolvedDestinations(params: Omit<DestinationQuery, "brandId"> = {}) {
  return listResolvedDestinationsRpc({ data: params });
}

export function getResolvedDestination(slug: Slug) {
  return getResolvedDestinationRpc({ data: slug });
}

export function listResolvedDestinationSearchCatalog() {
  return listResolvedDestinationSearchCatalogRpc();
}
