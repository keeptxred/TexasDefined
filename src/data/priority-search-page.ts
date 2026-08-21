import { createServerFn } from "@tanstack/react-start";
import type { PrioritySearchPageData } from "@/components/editorial/PrioritySearchPage";

const loadPrioritySearchPageServerFn = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { loadPrioritySearchPageServer } = await import("./priority-search-page.server");
    return loadPrioritySearchPageServer(data.slug);
  });

export function loadPrioritySearchPage(slug: string): Promise<PrioritySearchPageData | null> {
  return loadPrioritySearchPageServerFn({ data: { slug } });
}
