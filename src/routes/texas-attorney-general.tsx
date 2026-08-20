import { createFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { PRIORITY_SEARCH_PAGES } from "@/data/priority-search-pages";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const canonicalPath = "/texas-attorney-general";
const data = PRIORITY_SEARCH_PAGES["texas-attorney-general"];

export const Route = createFileRoute("/texas-attorney-general")({
  head: () => buildPrioritySearchHead({
    canonicalPath,
    title: "Texas Attorney General: Office, Services & Official Links",
    description: data.intro,
    data,
    about: ["Texas Attorney General", "Texas child support", "consumer protection", "open government"],
  }),
  component: () => <PrioritySearchPage data={data} />,
});
