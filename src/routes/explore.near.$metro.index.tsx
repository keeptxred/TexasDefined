import { createFileRoute, notFound } from "@tanstack/react-router";

import { getMetroProximityHubPageData } from "@/data/metro-proximity-page-data.functions";

export const Route = createFileRoute("/explore/near/$metro/")({
  loader: async ({ params }) => {
    const pageData = await getMetroProximityHubPageData({ data: { metro: params.metro } });
    if (!pageData) throw notFound();
    return pageData;
  },
  head: ({ loaderData }) => loaderData?.head ?? { meta: [{ name: "robots", content: "noindex, nofollow" }] },
});
