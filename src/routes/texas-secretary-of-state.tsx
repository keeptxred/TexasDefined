import { createFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { PRIORITY_SEARCH_PAGES } from "@/data/priority-search-pages";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const canonicalPath = "/texas-secretary-of-state";
const data = PRIORITY_SEARCH_PAGES["texas-secretary-of-state"];

export const Route = createFileRoute("/texas-secretary-of-state")({
  head: () => buildPrioritySearchHead({
    canonicalPath,
    title: "Texas Secretary of State: Elections, Business & Records",
    description: data.intro,
    data,
    about: ["Texas Secretary of State", "Texas elections", "Texas business filings", "Texas Register"],
  }),
  component: () => <PrioritySearchPage data={data} />,
});
