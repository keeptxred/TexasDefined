import { createFileRoute, notFound } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { loadPrioritySearchPage } from "@/data/priority-search-page";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const canonicalPath = "/texas-septic-permit";

export const Route = createFileRoute("/texas-septic-permit")({
  loader: async () => {
    const data = await loadPrioritySearchPage("texas-septic-permit");
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => loaderData ? buildPrioritySearchHead({
    canonicalPath,
    title: "How to Get a Septic Permit in Texas",
    description: loaderData.intro,
    data: loaderData,
    about: ["Texas septic permit", "OSSF", "Texas Commission on Environmental Quality"],
    breadcrumbParent: { name: "Texas Services", path: "/texas-services" },
  }) : {},
  component: Page,
});

function Page() {
  return <PrioritySearchPage data={Route.useLoaderData()} />;
}
