import { createFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { PRIORITY_SEARCH_PAGES } from "@/data/priority-search-pages";
import { prioritySearchHead } from "@/lib/priority-search-route";
const data = PRIORITY_SEARCH_PAGES["texas-flag"];
export const Route = createFileRoute("/texas-flag")({ head: () => prioritySearchHead("/texas-flag", "texas-flag"), component: () => <PrioritySearchPage data={data} /> });
