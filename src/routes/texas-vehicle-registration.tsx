import { createFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { PRIORITY_SEARCH_PAGES } from "@/data/priority-search-pages";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const canonicalPath = "/texas-vehicle-registration";
const data = PRIORITY_SEARCH_PAGES["texas-vehicle-registration"];

export const Route = createFileRoute("/texas-vehicle-registration")({
  head: () => buildPrioritySearchHead({
    canonicalPath,
    title: "Texas Vehicle Registration: Renewals, County Offices & TxDMV",
    description: data.intro,
    data,
    about: ["Texas vehicle registration", "TxDMV", "vehicle registration renewal", "county tax assessor-collector"],
  }),
  component: () => <PrioritySearchPage data={data} />,
});
