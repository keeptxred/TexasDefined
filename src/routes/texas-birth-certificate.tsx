import { createFileRoute, notFound } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { loadPrioritySearchPage } from "@/data/priority-search-page";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const canonicalPath = "/texas-birth-certificate";

export const Route = createFileRoute("/texas-birth-certificate")({
  loader: async () => {
    const data = await loadPrioritySearchPage("texas-birth-certificate");
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => loaderData ? buildPrioritySearchHead({
    canonicalPath,
    title: "How to Get a Texas Birth Certificate",
    description: loaderData.intro,
    data: loaderData,
    about: ["Texas birth certificate", "Texas vital records", "DSHS Vital Statistics"],
    breadcrumbParent: { name: "Texas Services", path: "/texas-services" },
  }) : {},
  component: Page,
});

function Page() {
  return <PrioritySearchPage data={Route.useLoaderData()} />;
}
