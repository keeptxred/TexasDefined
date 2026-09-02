import { createFileRoute, notFound } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { loadPrioritySearchPage } from "@/data/priority-search-page";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const canonicalPath = "/texas-toll-tags";

export const Route = createFileRoute("/texas-toll-tags")({
  loader: async () => {
    const data = await loadPrioritySearchPage("texas-toll-tags");
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => loaderData ? buildPrioritySearchHead({
    canonicalPath,
    title: "EZ TAG vs. TxTag vs. TollTag: Which Texas Toll Tag Do You Need?",
    description: loaderData.intro,
    data: loaderData,
    about: ["EZ TAG", "TxTag", "TollTag", "Texas toll roads", "toll tag interoperability"],
  }) : {},
  component: Page,
});

function Page() {
  return <PrioritySearchPage data={Route.useLoaderData()} />;
}
