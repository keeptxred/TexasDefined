import { PRIORITY_SEARCH_PAGES } from "./priority-search-pages";
import { CURRENT_PUBLIC_SERVICE_PRIORITY_SEARCH_PAGES } from "./priority-search-pages-public-services-current";
import { PUBLIC_SERVICE_PRIORITY_SEARCH_PAGES } from "./priority-search-pages-public-services";

export function loadPrioritySearchPageServer(slug: string) {
  return CURRENT_PUBLIC_SERVICE_PRIORITY_SEARCH_PAGES[slug]
    ?? PUBLIC_SERVICE_PRIORITY_SEARCH_PAGES[slug]
    ?? PRIORITY_SEARCH_PAGES[slug]
    ?? null;
}
