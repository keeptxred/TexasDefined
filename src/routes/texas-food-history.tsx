import { createFileRoute } from "@tanstack/react-router";

import { getTexasFoodHistoryHeadData } from "@/data/food-history.functions";

// Lazy UI authority contract: There is no single Texas cuisine. Separate history from folklore. Start with nine stories.
// Server-built head contract: canonicalPath, title:, description.
export const Route = createFileRoute("/texas-food-history")({
  loader: () => getTexasFoodHistoryHeadData(),
  head: ({ loaderData }) => loaderData?.head ?? {},
});
