import { createFileRoute } from "@tanstack/react-router";

import { getTexasHomeNatureGuide } from "@/data/texas-home-nature-public";
import { texasHomeNatureGuideHead } from "@/lib/texas-home-nature-seo";

export const Route = createFileRoute("/texas-pests-guide")({
  loader: () => getTexasHomeNatureGuide("texas-pests-guide"),
  head: ({ loaderData }) => texasHomeNatureGuideHead(loaderData, "/texas-pests-guide"),
});
