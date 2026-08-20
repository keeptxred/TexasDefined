import { createFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { PRIORITY_SEARCH_PAGES } from "@/data/priority-search-pages";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const canonicalPath = "/texas-fishing-license";
const data = PRIORITY_SEARCH_PAGES["texas-fishing-license"];

export const Route = createFileRoute("/texas-fishing-license")({
  head: () => buildPrioritySearchHead({
    canonicalPath,
    title: "Texas Fishing License: Requirements, Fees & Official Links",
    description: data.intro,
    data,
    about: ["Texas fishing license", "Texas Parks and Wildlife", "fishing regulations", "freshwater fishing", "saltwater fishing"],
  }),
  component: () => <PrioritySearchPage data={data} />,
});
