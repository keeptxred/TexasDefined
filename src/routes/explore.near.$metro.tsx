import { createFileRoute, notFound } from "@tanstack/react-router";

import { getMetroProximityHubPageData } from "@/data/metro-proximity-page-data.functions";

export const Route = createFileRoute("/explore/near/$metro")({
  loader: async ({ params }) => {
    const pageData = await getMetroProximityHubPageData({ data: { metro: params.metro } });
    if (!pageData) throw notFound();
    return pageData;
  },
  head: ({ loaderData, matches, match }) => {
    const isLeaf = matches[matches.length - 1]?.routeId === match.routeId;
    return isLeaf ? (loaderData?.head ?? {}) : {};
  },
});
