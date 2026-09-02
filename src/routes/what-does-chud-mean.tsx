import { createFileRoute, notFound } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { loadPrioritySearchPage } from "@/data/priority-search-page";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

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
  return <PrioritySearchPage data={Route.useLoaderData()} />;
}
