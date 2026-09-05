import { createFileRoute } from "@tanstack/react-router";

import { getFoodTruckOverviewPageData } from "@/data/food-trucks.functions";

// Server-built head contract: canonicalPath, title:, description.
export const Route = createFileRoute("/texas-food-trucks")({
  loader: () => getFoodTruckOverviewPageData(),
  head: ({ loaderData }) => loaderData?.head ?? {},
});
