import { createFileRoute, notFound } from "@tanstack/react-router";
import { loadPrioritySearchPageWithHead } from "@/data/priority-search-page";

const canonicalPath = "/texas-sales-tax-permit";

export const Route = createFileRoute("/texas-sales-tax-permit")({
  loader: async () => {
    const result = await loadPrioritySearchPageWithHead({
      slug: "texas-sales-tax-permit",
      canonicalPath,
      title: "How to Get a Texas Sales Tax Permit",
      about: ["Texas sales tax permit", "Texas Comptroller", "sales and use tax"],
      breadcrumbParent: { name: "Texas Services", path: "/texas-services" },
    });
    if (!result) throw notFound();
    return result;
  },
  head: ({ loaderData }) => loaderData?.head ?? {},
});
