import { createFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { PRIORITY_SEARCH_PAGES } from "@/data/priority-search-pages";
import { prioritySearchHead } from "@/lib/priority-search-route";
const data = PRIORITY_SEARCH_PAGES["texas-two-step"];
export const Route = createFileRoute("/texas-two-step")({ head: () => prioritySearchHead("/texas-two-step", "texas-two-step"), component: () => <PrioritySearchPage data={data} /> });
