import { createFileRoute, notFound } from "@tanstack/react-router";
import { loadPrioritySearchPage } from "@/data/priority-search-page";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const canonicalPath = "/texas-sales-tax-permit";

export const Route = createFileRoute("/texas-sales-tax-permit")({
  loader: async () => {
    const data = await loadPrioritySearchPage("texas-sales-tax-permit");
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => loaderData ? buildPrioritySearchHead({
    canonicalPath,
    title: "How to Get a Texas Sales Tax Permit",
    description: loaderData.intro,
    data: loaderData,
    about: ["Texas sales tax permit", "Texas Comptroller", "sales and use tax"],
    breadcrumbParent: { name: "Texas Services", path: "/texas-services" },
  }) : {},
});
