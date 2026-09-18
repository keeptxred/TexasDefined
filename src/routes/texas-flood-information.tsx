import { createFileRoute, notFound } from "@tanstack/react-router";
import { loadPrioritySearchPageWithHead } from "@/data/priority-search-page";

const canonicalPath = "/texas-flood-information";

export const Route = createFileRoute("/texas-flood-information")({
  loader: async () => {
    const result = await loadPrioritySearchPageWithHead({
      slug: "texas-flood-information",
      canonicalPath,
      title: "How to Check Flood Risk and Flood Maps in Texas",
      about: ["Texas flood maps", "FEMA flood maps", "Texas flood risk", "TWDB"],
      breadcrumbParent: { name: "Texas Services", path: "/texas-services" },
    });
    if (!result) throw notFound();
    return result;
  },
  head: ({ loaderData }) => loaderData?.head ?? {},
});
