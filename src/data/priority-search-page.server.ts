import { PRIORITY_SEARCH_PAGES } from "./priority-search-pages";
import { PUBLIC_SERVICE_PRIORITY_SEARCH_PAGES } from "./priority-search-pages-public-services";

export function loadPrioritySearchPageServer(slug: string) {
  return PUBLIC_SERVICE_PRIORITY_SEARCH_PAGES[slug] ?? PRIORITY_SEARCH_PAGES[slug] ?? null;
}
