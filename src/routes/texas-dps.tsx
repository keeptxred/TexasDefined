import { createFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { PRIORITY_SEARCH_PAGES } from "@/data/priority-search-pages";
import { prioritySearchHead } from "@/lib/priority-search-route";
const data = PRIORITY_SEARCH_PAGES["texas-dps"];
export const Route = createFileRoute("/texas-dps")({ head: () => prioritySearchHead("/texas-dps", "texas-dps"), component: () => <PrioritySearchPage data={data} /> });
