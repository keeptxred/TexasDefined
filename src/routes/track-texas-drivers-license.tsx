import { createFileRoute, notFound } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { loadPrioritySearchPage } from "@/data/priority-search-page";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const PrioritySearchPage = lazy(() =>
  import("@/components/editorial/PrioritySearchPage").then((module) => ({ default: module.PrioritySearchPage })),
);

const canonicalPath = "/track-texas-drivers-license";

export const Route = createFileRoute("/track-texas-drivers-license")({
  loader: async () => {
    const data = await loadPrioritySearchPage("track-texas-drivers-license");
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => loaderData ? buildPrioritySearchHead({
    canonicalPath,
    title: "How to Track Your Texas Driver License or ID Card",
    description: loaderData.intro,
    data: loaderData,
    about: ["Texas driver license status", "Texas DPS", "driver license mailing status", "Texas identification card"],
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
