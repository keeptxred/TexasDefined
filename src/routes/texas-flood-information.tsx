import { createFileRoute, notFound } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { loadPrioritySearchPage } from "@/data/priority-search-page";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const canonicalPath = "/texas-flood-information";

export const Route = createFileRoute("/texas-flood-information")({
  loader: async () => {
    const data = await loadPrioritySearchPage("texas-flood-information");
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => loaderData ? buildPrioritySearchHead({
    canonicalPath,
    title: "How to Check Flood Risk and Flood Maps in Texas",
    description: loaderData.intro,
    data: loaderData,
    about: ["Texas flood maps", "FEMA flood maps", "Texas flood risk", "TWDB"],
    breadcrumbParent: { name: "Texas Services", path: "/texas-services" },
  }) : {},
  component: Page,
});

function Page() {
  return <PrioritySearchPage data={Route.useLoaderData()} />;
}
