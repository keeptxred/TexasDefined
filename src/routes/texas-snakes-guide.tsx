import { createFileRoute } from "@tanstack/react-router";

import { getTexasHomeNatureGuide } from "@/data/texas-home-nature-public";
import { texasHomeNatureGuideHead } from "@/lib/texas-home-nature-seo";

const canonicalPath = "/texas-snakes-guide";
const seo = {
  title: "Texas Snakes Guide: Identification, Venomous Species and Safety",
  description: "Learn about Texas snakes, including venomous groups, safer identification, encounter precautions and current snakebite guidance.",
};

export const Route = createFileRoute(canonicalPath)({
  loader: () => getTexasHomeNatureGuide("texas-snakes-guide"),
  head: ({ loaderData }) => {
    void seo.title;
    void seo.description;
    return texasHomeNatureGuideHead(loaderData, canonicalPath);
  },
});
