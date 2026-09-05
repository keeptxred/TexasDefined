import { createFileRoute, notFound } from "@tanstack/react-router";
import { loadPrioritySearchPageWithHead } from "@/data/priority-search-page";

const canonicalPath = "/texas-hunting-license";

export const Route = createFileRoute("/texas-hunting-license")({
  loader: async () => {
    const result = await loadPrioritySearchPageWithHead({
      slug: "texas-hunting-license",
      canonicalPath,
      title: "Texas Hunting License: Requirements, Fees and Official Links",
      about: ["Texas hunting license", "Texas Parks and Wildlife", "2026-27 hunting license"],
      breadcrumbParent: { name: "Texas Services", path: "/texas-services" },
    });
    if (!result) throw notFound();
    return result;
  },
  head: ({ loaderData }) => loaderData?.head ?? {},
});
