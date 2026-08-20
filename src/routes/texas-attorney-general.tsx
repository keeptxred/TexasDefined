import { createFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { PRIORITY_SEARCH_PAGES } from "@/data/priority-search-pages";
import { prioritySearchHead } from "@/lib/priority-search-route";
const data = PRIORITY_SEARCH_PAGES["texas-attorney-general"];
export const Route = createFileRoute("/texas-attorney-general")({ head: () => prioritySearchHead("/texas-attorney-general", "texas-attorney-general"), component: () => <PrioritySearchPage data={data} /> });
