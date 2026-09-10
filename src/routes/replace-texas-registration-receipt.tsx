import { createFileRoute, notFound } from "@tanstack/react-router";
import { loadPrioritySearchPage } from "@/data/priority-search-page";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

// PrioritySearchPage UI is intentionally delivered from replace-texas-registration-receipt.lazy.tsx.
const canonicalPath = "/replace-texas-registration-receipt";

export const Route = createFileRoute("/replace-texas-registration-receipt")({
  loader: async () => {
    const data = await loadPrioritySearchPage("replace-texas-registration-receipt");
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => loaderData ? buildPrioritySearchHead({
    canonicalPath,
    title: "How to Replace a Lost Texas Vehicle Registration Receipt",
    description: loaderData.intro,
    data: loaderData,
    about: ["Texas registration receipt", "Form VTR-275", "TxDMV", "vehicle registration"],
  }) : {},
});