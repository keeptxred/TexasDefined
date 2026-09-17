import { createFileRoute, notFound } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { loadPrioritySearchPage } from "@/data/priority-search-page";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const PrioritySearchPage = lazy(() =>
  import("@/components/editorial/PrioritySearchPage").then((module) => ({ default: module.PrioritySearchPage })),
);

const canonicalPath = "/replace-texas-registration-receipt";

export const Route = createFileRoute("/replace-texas-registration-receipt")({
  loader: async () => {
    const data = await loadPrioritySearchPage("replace-texas-registration-receipt");
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => loaderData ? buildPrioritySearchHead({
    canonicalPath,
    title: "How to Replace a Lost Texas Vehicle Registration Receipt",
    description: loaderData.intro,
    data: loaderData,
    about: ["Texas registration receipt", "Form VTR-275", "TxDMV", "vehicle registration"],
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
