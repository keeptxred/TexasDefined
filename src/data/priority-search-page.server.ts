import { PRIORITY_SEARCH_PAGES } from "./priority-search-pages";

export function loadPrioritySearchPageServer(slug: string) {
  return PRIORITY_SEARCH_PAGES[slug] ?? null;
}
