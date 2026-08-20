import { createFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { PRIORITY_SEARCH_PAGES } from "@/data/priority-search-pages";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const canonicalPath = "/texas-flag";
const data = PRIORITY_SEARCH_PAGES["texas-flag"];

export const Route = createFileRoute("/texas-flag")({
  head: () => buildPrioritySearchHead({
    canonicalPath,
    title: "Texas Flag: History, Meaning, Rules & Lone Star Guide",
    description: data.intro,
    data,
    about: ["Texas flag", "Lone Star flag", "Texas history", "Texas Flag Code", "Texas symbols"],
  }),
  component: () => <PrioritySearchPage data={data} />,
});
