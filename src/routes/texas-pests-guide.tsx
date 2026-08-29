import { createFileRoute } from "@tanstack/react-router";

import { getTexasHomeNatureGuide } from "@/data/texas-home-nature-public";
import { texasHomeNatureGuideHead } from "@/lib/texas-home-nature-seo";

const canonicalPath = "/texas-pests-guide";
const seo = {
  title: "Texas Pests: Identification, Seasons and What to Do",
  description: "Identify common Texas household and yard pests, understand seasonal risk and use practical prevention and integrated-pest guidance.",
};

export const Route = createFileRoute(canonicalPath)({
  loader: () => getTexasHomeNatureGuide("texas-pests-guide"),
  head: ({ loaderData }) => {
    void seo.title;
    void seo.description;
    return texasHomeNatureGuideHead(loaderData, canonicalPath);
  },
});
