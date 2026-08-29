import { createFileRoute } from "@tanstack/react-router";

import { getTexasHomeNatureGuide } from "@/data/texas-home-nature-public";
import { texasHomeNatureGuideHead } from "@/lib/texas-home-nature-seo";

export const Route = createFileRoute("/texas-birds-guide")({
  loader: () => getTexasHomeNatureGuide("texas-birds-guide"),
  head: ({ loaderData }) => texasHomeNatureGuideHead(loaderData, "/texas-birds-guide"),
});
