import { createFileRoute } from "@tanstack/react-router";

import { getFoodTruckOverviewPageData } from "@/data/food-trucks.functions";

export const Route = createFileRoute("/texas-food-trucks")({
  loader: () => getFoodTruckOverviewPageData(),
  head: ({ loaderData }) => loaderData?.head ?? { meta: [{ name: "robots", content: "noindex, follow" }] },
});
