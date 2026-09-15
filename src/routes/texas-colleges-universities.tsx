import { createFileRoute, notFound } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { loadPrioritySearchPage } from "@/data/priority-search-page";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const PrioritySearchPage = lazy(() =>
  import("@/components/editorial/PrioritySearchPage").then((module) => ({ default: module.PrioritySearchPage })),
);

const canonicalPath = "/texas-colleges-universities";

export const Route = createFileRoute("/texas-colleges-universities")({
  loader: async () => {
    const data = await loadPrioritySearchPage("texas-colleges-universities");
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => loaderData ? buildPrioritySearchHead({
    canonicalPath,
    title: "Texas Colleges & Universities: Programs, Tuition & Admissions",
    description: loaderData.intro,
    data: loaderData,
    about: ["Texas colleges", "Texas universities", "Texas tuition", "Texas admissions", "Texas degree programs"],
  }) : {},
  component: Page,
});

function Page() {
  return <Suspense fallback={null}><PrioritySearchPage data={Route.useLoaderData()} /></Suspense>;
}
