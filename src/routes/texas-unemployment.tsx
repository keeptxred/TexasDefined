import { createFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { PRIORITY_SEARCH_PAGES } from "@/data/priority-search-pages";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const canonicalPath = "/texas-unemployment";
const data = PRIORITY_SEARCH_PAGES["texas-unemployment"];

export const Route = createFileRoute("/texas-unemployment")({
  head: () => buildPrioritySearchHead({
    canonicalPath,
    title: "Texas Unemployment Benefits: Apply, Eligibility & TWC",
    description: data.intro,
    data,
    about: ["Texas unemployment", "Texas Workforce Commission", "unemployment benefits", "Texas jobs"],
  }),
  component: () => <PrioritySearchPage data={data} />,
});
