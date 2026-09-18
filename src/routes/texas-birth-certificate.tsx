import { createFileRoute, notFound } from "@tanstack/react-router";
import { loadPrioritySearchPageWithHead } from "@/data/priority-search-page";

const canonicalPath = "/texas-birth-certificate";

export const Route = createFileRoute("/texas-birth-certificate")({
  loader: async () => {
    const result = await loadPrioritySearchPageWithHead({
      slug: "texas-birth-certificate",
      canonicalPath,
      title: "How to Get a Texas Birth Certificate",
      about: ["Texas birth certificate", "Texas vital records", "DSHS Vital Statistics"],
      breadcrumbParent: { name: "Texas Services", path: "/texas-services" },
    });
    if (!result) throw notFound();
    return result;
  },
  head: ({ loaderData }) => loaderData?.head ?? {},
});
