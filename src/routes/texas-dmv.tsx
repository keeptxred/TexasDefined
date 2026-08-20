import { createFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { PRIORITY_SEARCH_PAGES } from "@/data/priority-search-pages";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const canonicalPath = "/texas-dmv";
const data = PRIORITY_SEARCH_PAGES["texas-dmv"];

export const Route = createFileRoute("/texas-dmv")({
  head: () => buildPrioritySearchHead({
    canonicalPath,
    title: "Texas DMV: Registration, Titles & TxDMV Services",
    description: data.intro,
    data,
    about: ["Texas DMV", "TxDMV", "vehicle registration", "vehicle titles", "Texas motor vehicles"],
  }),
  component: () => <PrioritySearchPage data={data} />,
});
