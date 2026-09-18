import { PRIORITY_SEARCH_PAGES } from "./priority-search-pages";
import { CURRENT_PUBLIC_SERVICE_PRIORITY_SEARCH_PAGES } from "./priority-search-pages-public-services-current";
import { PUBLIC_SERVICE_PRIORITY_SEARCH_PAGES } from "./priority-search-pages-public-services";
import { TEXAS_SERVICE_PRIORITY_SEARCH_PAGES } from "./priority-search-pages-texas-services";

export function loadPrioritySearchPageServer(slug: string) {
  return TEXAS_SERVICE_PRIORITY_SEARCH_PAGES[slug]
    ?? CURRENT_PUBLIC_SERVICE_PRIORITY_SEARCH_PAGES[slug]
    ?? PUBLIC_SERVICE_PRIORITY_SEARCH_PAGES[slug]
    ?? PRIORITY_SEARCH_PAGES[slug]
    ?? null;
}
