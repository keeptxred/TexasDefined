import { createFileRoute, notFound } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { loadPrioritySearchPage } from "@/data/priority-search-page";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const PrioritySearchPage = lazy(() =>
  import("@/components/editorial/PrioritySearchPage").then((module) => ({ default: module.PrioritySearchPage })),
);

const canonicalPath = "/texas-by-texas-txt";

export const Route = createFileRoute("/texas-by-texas-txt")({
  loader: async () => {
    const data = await loadPrioritySearchPage("texas-by-texas-txt");
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => loaderData ? buildPrioritySearchHead({
    canonicalPath,
    title: "What Is Texas by Texas (TxT)?",
    description: loaderData.intro,
    data: loaderData,
    about: ["Texas by Texas", "TxT", "Texas.gov", "Texas government services"],
  }) : {},
  component: Page,
});

function Page() {
  return (
    <Suspense fallback={null}>
      <PrioritySearchPage data={Route.useLoaderData()} />
    </Suspense>
  );
}
