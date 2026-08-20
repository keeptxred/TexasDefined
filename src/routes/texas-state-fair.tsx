import { createFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { PRIORITY_SEARCH_PAGES } from "@/data/priority-search-pages";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const canonicalPath = "/texas-state-fair";
const data = PRIORITY_SEARCH_PAGES["texas-state-fair"];

export const Route = createFileRoute("/texas-state-fair")({
  head: () => buildPrioritySearchHead({
    canonicalPath,
    title: "State Fair of Texas 2026: Dates, Food, Rides & Planning",
    description: data.intro,
    data,
    about: ["State Fair of Texas", "Fair Park", "Dallas events", "Big Tex", "Texas State Fair food"],
  }),
  component: () => <PrioritySearchPage data={data} />,
});
