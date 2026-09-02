import { createServerFn } from "@tanstack/react-start";
import type { PrioritySearchPageData } from "@/components/editorial/PrioritySearchPage";

type PrioritySearchHeadRequest = {
  slug: string;
  canonicalPath: string;
  title: string;
  about?: string[];
  breadcrumbParent?: { name: string; path: string };
};

const loadPrioritySearchPageServerFn = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { loadPrioritySearchPageServer } = await import("./priority-search-page.server");
    return loadPrioritySearchPageServer(data.slug);
  });

const loadPrioritySearchPageWithHeadServerFn = createServerFn({ method: "GET" })
  .inputValidator((data: PrioritySearchHeadRequest) => data)
  .handler(async ({ data }) => {
    const [{ loadPrioritySearchPageServer }, { buildPrioritySearchHead }] = await Promise.all([
      import("./priority-search-page.server"),
      import("@/lib/priority-search-seo"),
    ]);
    const page = loadPrioritySearchPageServer(data.slug);
    if (!page) return null;
    return {
      data: page,
      head: buildPrioritySearchHead({
        canonicalPath: data.canonicalPath,
        title: data.title,
        description: page.intro,
        data: page,
        about: data.about,
        breadcrumbParent: data.breadcrumbParent,
      }),
    };
  });

export function loadPrioritySearchPage(slug: string): Promise<PrioritySearchPageData | null> {
  return loadPrioritySearchPageServerFn({ data: { slug } });
}

export function loadPrioritySearchPageWithHead(data: PrioritySearchHeadRequest) {
  return loadPrioritySearchPageWithHeadServerFn({ data });
}
