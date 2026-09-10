import { createFileRoute, notFound } from "@tanstack/react-router";
import { loadPrioritySearchPage } from "@/data/priority-search-page";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

// PrioritySearchPage UI is intentionally delivered from texas-by-texas-txt.lazy.tsx.
const canonicalPath = "/texas-by-texas-txt";

export const Route = createFileRoute("/texas-by-texas-txt")({
  loader: async () => {
    const data = await loadPrioritySearchPage("texas-by-texas-txt");
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => loaderData ? buildPrioritySearchHead({
    canonicalPath,
    title: "What Is Texas by Texas (TxT)?",
    description: loaderData.intro,
    data: loaderData,
    about: ["Texas by Texas", "TxT", "Texas.gov", "Texas government services"],
  }) : {},
});