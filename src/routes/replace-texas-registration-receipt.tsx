import { createFileRoute, notFound } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { loadPrioritySearchPage } from "@/data/priority-search-page";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

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
  return <PrioritySearchPage data={Route.useLoaderData()} />;
}
