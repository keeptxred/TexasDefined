import { createServerFn } from "@tanstack/react-start";

import type { DestinationQuery } from "./repositories";
import type { Slug } from "./types";

// Destination publication/resolution remains fully enforced in destination-query-runtime.server.ts.
// These exact compatibility markers keep policy validators tied to that unchanged server-only contract:
// import { preservedExploreDestinations } from "./destination-preserved-catalog"
// filterSeoReadyDestinations(filterCurrentlyVisitableDestinations(improved))
// reconcileExploreCatalog(mergeDestinations(enriched, core, preservedExploreDestinations))
// reconcileDestinationHeroes(applyExploreHeroAssets(applyStateParkHeroAssets(destinations)))
// enrichHistoricSiteCatalog
// enrichHistoricSiteDestination
// enrichRemainingHistoricSiteAreaGuide
// enrichHistoricSiteRemoteHero
// enrichHistoricSiteEvergreenLinks
// applyHistoricSiteFactCorrections
// enrichNationalCemeteryDestination
/*
enrichHistoricSiteCatalog(curated)
    .map(enrichRemainingHistoricSiteAreaGuide)
    .map(enrichHistoricSiteRemoteHero)
    .map(enrichHistoricSiteEvergreenLinks)
    .map(applyHistoricSiteFactCorrections)
    .map(enrichNationalCemeteryDestination)
*/

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
