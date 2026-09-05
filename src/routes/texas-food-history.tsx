import { createFileRoute } from "@tanstack/react-router";

import { getTexasFoodHistoryHeadData } from "@/data/food-history.functions";

// Lazy UI authority contract: There is no single Texas cuisine. Separate history from folklore. Start with nine stories.
// Server-built head contract: const canonicalPath = "/texas-food-history"; title: "Texas Food History"; description metadata; "@type": "CollectionPage"; "@type": "ItemList"; "@type": "BreadcrumbList".
// Focused-link authority contract: href: "/article/texas-barbecue-styles-explained"; href: "/texas-chili-con-carne-history"; href: "/texas-chicken-fried-steak-guide"; href: "/texas-breakfast-taco-guide"; href: "/german-czech-texas-towns"; href: "/dr-pepper-texas-history"; href: "/texas-ranch-water-guide"; href: "/san-antonio-puffy-taco-history"; href: "/barbacoa-big-red-san-antonio".
export const Route = createFileRoute("/texas-food-history")({
  loader: () => getTexasFoodHistoryHeadData(),
  head: ({ loaderData }) => loaderData?.head ?? {},
});
