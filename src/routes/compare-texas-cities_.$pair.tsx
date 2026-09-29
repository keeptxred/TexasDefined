import { createFileRoute, notFound } from "@tanstack/react-router";

import { getRelocationCityPairPage } from "@/data/relocation-city-pair-page.functions";

export const Route = createFileRoute("/compare-texas-cities/$pair")({
  loader: async ({ params }) => {
    const page = await getRelocationCityPairPage({ data: { pair: params.pair } });
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => loaderData?.head ?? { meta: [{ name: "robots", content: "noindex, nofollow" }] },
});
