import { createFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { PRIORITY_SEARCH_PAGES } from "@/data/priority-search-pages";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const canonicalPath = "/texas-drivers-license";
const data = PRIORITY_SEARCH_PAGES["texas-drivers-license"];

export const Route = createFileRoute("/texas-drivers-license")({
  head: () => buildPrioritySearchHead({
    canonicalPath,
    title: "Texas Driver License: Renew, Replace, Appointments & REAL ID",
    description: data.intro,
    data,
    about: ["Texas driver license", "Texas DPS", "REAL ID", "driver license renewal", "driver license appointments"],
  }),
  component: () => <PrioritySearchPage data={data} />,
});
