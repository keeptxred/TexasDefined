import { createFileRoute, notFound } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { loadPrioritySearchPage } from "@/data/priority-search-page";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const PrioritySearchPage = lazy(() =>
  import("@/components/editorial/PrioritySearchPage").then((module) => ({ default: module.PrioritySearchPage })),
);

const canonicalPath = "/what-does-chud-mean";

export const Route = createFileRoute("/what-does-chud-mean")({
  loader: async () => {
    const data = await loadPrioritySearchPage("what-does-chud-mean");
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => loaderData ? buildPrioritySearchHead({
    canonicalPath,
    title: "What Does Chud Mean? 2026 Slang Meaning and Texas Search Trend",
    description: loaderData.intro,
    data: loaderData,
    about: ["chud meaning", "internet slang", "Texas slang searches", "2026 slang"],
  }) : {},
  component: Page,
});

function Page() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-5 py-12 text-sm text-muted-foreground" role="status">Loading Texas terminology guide…</div>}>
      <PrioritySearchPage data={Route.useLoaderData()} />
    </Suspense>
  );
}
