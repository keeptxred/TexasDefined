import { createFileRoute, notFound } from "@tanstack/react-router";

import { getFoodTruckMarketPageData } from "@/data/food-trucks.functions";

// Server-built head contract: canonicalPath, title:, description.
export const Route = createFileRoute("/texas-food-trucks/$market")({
  loader: async ({ params }) => {
    const pageData = await getFoodTruckMarketPageData({ data: { slug: params.market } });
    if (!pageData) throw notFound();
    return pageData;
  },
  head: ({ loaderData }) => loaderData?.head ?? {},
});
