import { createFileRoute } from "@tanstack/react-router";

import { getTexasHomeNatureGuide } from "@/data/texas-home-nature-public";
import { texasHomeNatureGuideHead } from "@/lib/texas-home-nature-seo";

const canonicalPath = "/texas-pool-guide";
const seo = {
  title: "Texas Pool Guide: Winterizing, Opening, Freezes and Storm Prep",
  description: "A practical Texas pool guide for regional winterization, freeze protection, spring opening, summer heat and storm preparation.",
};

export const Route = createFileRoute(canonicalPath)({
  loader: () => getTexasHomeNatureGuide("texas-pool-guide"),
  head: ({ loaderData }) => {
    void seo.title;
    void seo.description;
    return texasHomeNatureGuideHead(loaderData, canonicalPath);
  },
});
