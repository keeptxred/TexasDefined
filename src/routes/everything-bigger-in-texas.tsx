import { createFileRoute, notFound } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { loadPrioritySearchPage } from "@/data/priority-search-page";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const PrioritySearchPage = lazy(() =>
  import("@/components/editorial/PrioritySearchPage").then((module) => ({ default: module.PrioritySearchPage })),
);

const canonicalPath = "/everything-bigger-in-texas";

export const Route = createFileRoute("/everything-bigger-in-texas")({
  loader: async () => {
    const data = await loadPrioritySearchPage("everything-bigger-in-texas");
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => loaderData ? buildPrioritySearchHead({
    canonicalPath,
    title: "Is Everything Really Bigger in Texas? Famous Claims Fact-Checked",
    description: loaderData.intro,
    data: loaderData,
    about: ["everything is bigger in Texas", "Texas facts", "King Ranch", "Bracken Cave", "Texas superlatives"],
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
