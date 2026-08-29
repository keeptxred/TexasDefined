import { createFileRoute } from "@tanstack/react-router";

import { getTexasHomeNatureGuide } from "@/data/texas-home-nature-public";
import { texasHomeNatureGuideHead } from "@/lib/texas-home-nature-seo";

export const Route = createFileRoute("/texas-snakes-guide")({
  loader: () => getTexasHomeNatureGuide("texas-snakes-guide"),
  head: ({ loaderData }) => texasHomeNatureGuideHead(loaderData, "/texas-snakes-guide"),
});
