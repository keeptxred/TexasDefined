import { createFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { PRIORITY_SEARCH_PAGES } from "@/data/priority-search-pages";
import { prioritySearchHead } from "@/lib/priority-search-route";
const data = PRIORITY_SEARCH_PAGES["texas-unemployment"];
export const Route = createFileRoute("/texas-unemployment")({ head: () => prioritySearchHead("/texas-unemployment", "texas-unemployment"), component: () => <PrioritySearchPage data={data} /> });
