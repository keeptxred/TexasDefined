import { createFileRoute, notFound } from "@tanstack/react-router";
import { loadPrioritySearchPage } from "@/data/priority-search-page";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const canonicalPath = "/texas-property-tax-lookup";

export const Route = createFileRoute("/texas-property-tax-lookup")({
  loader: async () => {
    const data = await loadPrioritySearchPage("texas-property-tax-lookup");
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => loaderData ? buildPrioritySearchHead({
    canonicalPath,
    title: "How to Look Up Texas Property Taxes and Appraisal Records",
    description: loaderData.intro,
    data: loaderData,
    about: ["Texas property tax lookup", "county appraisal districts", "tax assessor-collector"],
    breadcrumbParent: { name: "Texas Services", path: "/texas-services" },
  }) : {},
});
