import { createFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { PRIORITY_SEARCH_PAGES } from "@/data/priority-search-pages";
import { prioritySearchHead } from "@/lib/priority-search-route";
const data = PRIORITY_SEARCH_PAGES["texas-secretary-of-state"];
export const Route = createFileRoute("/texas-secretary-of-state")({ head: () => prioritySearchHead("/texas-secretary-of-state", "texas-secretary-of-state"), component: () => <PrioritySearchPage data={data} /> });
