import { createFileRoute, notFound } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { loadPrioritySearchPage } from "@/data/priority-search-page";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const StartBusinessTexasGuide = lazy(() =>
  import("@/components/business/StartBusinessTexasGuide").then((module) => ({ default: module.StartBusinessTexasGuide })),
);

const canonicalPath = "/start-a-business-in-texas";

export const Route = createFileRoute("/start-a-business-in-texas")({
  loader: async () => {
    const [data, startupGuideData] = await Promise.all([
      loadPrioritySearchPage("start-a-business-in-texas"),
      import("@/data/start-business-texas-guide"),
    ]);
    if (!data) throw notFound();

    return {
      page: data,
      meta: {
        title: startupGuideData.START_BUSINESS_META.title,
        description: startupGuideData.START_BUSINESS_META.description,
        updated: startupGuideData.START_BUSINESS_META.updated,
        about: [...startupGuideData.START_BUSINESS_META.about],
      },
      faq: startupGuideData.START_BUSINESS_FAQ.map((item) => ({ ...item })),
      sections: startupGuideData.START_BUSINESS_SEO_SECTIONS.map((section) => ({
        heading: section.heading,
        paragraphs: [...section.paragraphs],
        links: section.links.map((link) => ({ ...link })),
      })),
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};

    const seoData = {
      ...loaderData.page,
      intro: loaderData.meta.description,
      updated: loaderData.meta.updated,
      sections: loaderData.sections,
      faq: loaderData.faq,
    };

    return buildPrioritySearchHead({
      canonicalPath,
      title: loaderData.meta.title,
      description: loaderData.meta.description,
      data: seoData,
      about: loaderData.meta.about,
    });
  },
  component: Page,
});

function Page() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-5 py-12 text-sm text-muted-foreground" role="status">Loading Texas business guide…</div>}>
      <StartBusinessTexasGuide />
    </Suspense>
  );
}
