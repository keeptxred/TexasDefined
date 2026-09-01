import { createServerFn } from "@tanstack/react-start";

import type { DestinationQuery } from "./repositories";
import type { Slug } from "./types";

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
