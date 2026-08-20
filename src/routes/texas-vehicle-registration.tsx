import { createFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { PRIORITY_SEARCH_PAGES } from "@/data/priority-search-pages";
import { prioritySearchHead } from "@/lib/priority-search-route";
const data = PRIORITY_SEARCH_PAGES["texas-vehicle-registration"];
export const Route = createFileRoute("/texas-vehicle-registration")({ head: () => prioritySearchHead("/texas-vehicle-registration", "texas-vehicle-registration"), component: () => <PrioritySearchPage data={data} /> });
