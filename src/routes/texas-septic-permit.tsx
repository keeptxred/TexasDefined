import { createFileRoute, notFound } from "@tanstack/react-router";
import { loadPrioritySearchPageWithHead } from "@/data/priority-search-page";

const canonicalPath = "/texas-septic-permit";

export const Route = createFileRoute("/texas-septic-permit")({
  loader: async () => {
    const result = await loadPrioritySearchPageWithHead({
      slug: "texas-septic-permit",
      canonicalPath,
      title: "How to Get a Septic Permit in Texas",
      about: ["Texas septic permit", "OSSF", "Texas Commission on Environmental Quality"],
      breadcrumbParent: { name: "Texas Services", path: "/texas-services" },
    });
    if (!result) throw notFound();
    return result;
  },
  head: ({ loaderData }) => loaderData?.head ?? {},
});
