import { createServerFn } from "@tanstack/react-start";

import {
  loadMetroProximityCollectionPageDataServer,
  loadMetroProximityHubPageDataServer,
} from "./metro-proximity-page-data.server";

export const getMetroProximityHubPageData = createServerFn({ method: "GET" })
  .inputValidator((data: { metro: string }) => data)
  .handler(({ data }) => loadMetroProximityHubPageDataServer(data.metro));

export const getMetroProximityCollectionPageData = createServerFn({ method: "GET" })
  .inputValidator((data: { metro: string; collection: string }) => data)
  .handler(({ data }) => loadMetroProximityCollectionPageDataServer(data.metro, data.collection));
