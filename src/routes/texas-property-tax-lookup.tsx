import { createFileRoute, notFound } from "@tanstack/react-router";
import { loadPrioritySearchPageWithHead } from "@/data/priority-search-page";

const canonicalPath = "/texas-property-tax-lookup";

export const Route = createFileRoute("/texas-property-tax-lookup")({
  loader: async () => {
    const result = await loadPrioritySearchPageWithHead({
      slug: "texas-property-tax-lookup",
      canonicalPath,
      title: "How to Look Up Texas Property Taxes and Appraisal Records",
      about: ["Texas property tax lookup", "county appraisal districts", "tax assessor-collector"],
      breadcrumbParent: { name: "Texas Services", path: "/texas-services" },
    });
    if (!result) throw notFound();
    return result;
  },
  head: ({ loaderData }) => loaderData?.head ?? {},
});
