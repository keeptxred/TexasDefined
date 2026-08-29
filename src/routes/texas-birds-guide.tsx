import { createFileRoute } from "@tanstack/react-router";

import { getTexasHomeNatureGuide } from "@/data/texas-home-nature-public";
import { texasHomeNatureGuideHead } from "@/lib/texas-home-nature-seo";

const canonicalPath = "/texas-birds-guide";
const seo = {
  title: "Texas Birds Guide: Birding, Migration and Common Species",
  description: "Explore Texas birds, migration, habitats and practical birding guidance with current state and federal wildlife sources.",
};

export const Route = createFileRoute(canonicalPath)({
  loader: () => getTexasHomeNatureGuide("texas-birds-guide"),
  head: ({ loaderData }) => {
    void seo.title;
    void seo.description;
    return texasHomeNatureGuideHead(loaderData, canonicalPath);
  },
});
