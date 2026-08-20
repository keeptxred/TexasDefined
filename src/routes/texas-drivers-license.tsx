import { createFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { PRIORITY_SEARCH_PAGES } from "@/data/priority-search-pages";
import { prioritySearchHead } from "@/lib/priority-search-route";
const data = PRIORITY_SEARCH_PAGES["texas-drivers-license"];
export const Route = createFileRoute("/texas-drivers-license")({ head: () => prioritySearchHead("/texas-drivers-license", "texas-drivers-license"), component: () => <PrioritySearchPage data={data} /> });
