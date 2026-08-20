import { createFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { PRIORITY_SEARCH_PAGES } from "@/data/priority-search-pages";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const canonicalPath = "/texas-dps";
const data = PRIORITY_SEARCH_PAGES["texas-dps"];

export const Route = createFileRoute("/texas-dps")({
  head: () => buildPrioritySearchHead({
    canonicalPath,
    title: "Texas DPS: Driver Licenses, ID & Public Safety Services",
    description: data.intro,
    data,
    about: ["Texas DPS", "Texas Department of Public Safety", "Texas driver license", "Texas ID", "public safety"],
  }),
  component: () => <PrioritySearchPage data={data} />,
});
