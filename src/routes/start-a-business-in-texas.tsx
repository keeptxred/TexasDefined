import { createFileRoute, notFound } from "@tanstack/react-router";
import { loadPrioritySearchPage } from "@/data/priority-search-page";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const canonicalPath = "/start-a-business-in-texas";

export const Route = createFileRoute("/start-a-business-in-texas")({
  loader: async () => {
    const [page, startupGuideData] = await Promise.all([
      loadPrioritySearchPage("start-a-business-in-texas"),
      import("@/data/start-business-texas-guide"),
    ]);
    if (!page) throw notFound();

    return {
      page,
      meta: startupGuideData.START_BUSINESS_META,
      faq: startupGuideData.START_BUSINESS_FAQ,
      sections: startupGuideData.START_BUSINESS_SEO_SECTIONS,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};

    return buildPrioritySearchHead({
      canonicalPath,
      title: loaderData.meta.title,
      description: loaderData.meta.description,
      data: {
        ...loaderData.page,
        intro: loaderData.meta.description,
        updated: loaderData.meta.updated,
        sections: loaderData.sections,
        faq: loaderData.faq,
      },
      about: loaderData.meta.about,
    });
  },
  pendingComponent: LoadingBusinessGuide,
});

function LoadingBusinessGuide() {
  return <div className="p-5 text-sm" role="status">Loading guide…</div>;
}
