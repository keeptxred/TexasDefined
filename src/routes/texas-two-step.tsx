import { createFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { PRIORITY_SEARCH_PAGES } from "@/data/priority-search-pages";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const canonicalPath = "/texas-two-step";
const data = PRIORITY_SEARCH_PAGES["texas-two-step"];

export const Route = createFileRoute("/texas-two-step")({
  head: () => buildPrioritySearchHead({
    canonicalPath,
    title: "Texas Two Step: How the Texas Lottery Game Works",
    description: data.intro,
    data,
    about: ["Texas Two Step", "Texas Lottery", "Texas lottery game", "Texas lottery drawings"],
  }),
  component: () => <PrioritySearchPage data={data} />,
});
