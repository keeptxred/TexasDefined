import { createFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { PRIORITY_SEARCH_PAGES } from "@/data/priority-search-pages";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const canonicalPath = "/texas-comptroller";
const data = PRIORITY_SEARCH_PAGES["texas-comptroller"];

export const Route = createFileRoute("/texas-comptroller")({
  head: () => buildPrioritySearchHead({
    canonicalPath,
    title: "Texas Comptroller: Taxes, Revenue & Property-Tax Resources",
    description: data.intro,
    data,
    about: ["Texas Comptroller", "Texas taxes", "Texas revenue", "property tax", "franchise tax"],
  }),
  component: () => <PrioritySearchPage data={data} />,
});
