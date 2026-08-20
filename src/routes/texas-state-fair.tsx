import { createFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { PRIORITY_SEARCH_PAGES } from "@/data/priority-search-pages";
import { prioritySearchHead } from "@/lib/priority-search-route";
const data = PRIORITY_SEARCH_PAGES["texas-state-fair"];
export const Route = createFileRoute("/texas-state-fair")({ head: () => prioritySearchHead("/texas-state-fair", "texas-state-fair"), component: () => <PrioritySearchPage data={data} /> });
