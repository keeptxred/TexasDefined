import { createFileRoute, notFound } from "@tanstack/react-router";
import { loadPrioritySearchPage } from "@/data/priority-search-page";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const canonicalPath = "/texas-hunting-license";

export const Route = createFileRoute("/texas-hunting-license")({
  loader: async () => {
    const data = await loadPrioritySearchPage("texas-hunting-license");
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => loaderData ? buildPrioritySearchHead({
    canonicalPath,
    title: "Texas Hunting License: Requirements, Fees and Official Links",
    description: loaderData.intro,
    data: loaderData,
    about: ["Texas hunting license", "Texas Parks and Wildlife", "2026-27 hunting license"],
    breadcrumbParent: { name: "Texas Services", path: "/texas-services" },
  }) : {},
});
