import { createFileRoute, notFound } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { loadPrioritySearchPage } from "@/data/priority-search-page";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const PrioritySearchPage = lazy(() =>
  import("@/components/editorial/PrioritySearchPage").then((module) => ({ default: module.PrioritySearchPage })),
);

const canonicalPath = "/texas-economy";

export const Route = createFileRoute("/texas-economy")({
  loader: async () => {
    const data = await loadPrioritySearchPage("texas-economy");
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => loaderData ? buildPrioritySearchHead({
    canonicalPath,
    title: "Texas Economy: Jobs, GDP, Population, Housing & Energy Data",
    description: loaderData.intro,
    data: loaderData,
    about: ["Texas economy", "Texas GDP", "Texas jobs", "Texas population", "Texas housing", "Texas energy"],
  }) : {},
  component: Page,
});

function Page() {
  return <Suspense fallback={null}><PrioritySearchPage data={Route.useLoaderData()} /></Suspense>;
}
