import { createFileRoute, notFound } from "@tanstack/react-router";
import { loadPrioritySearchPage } from "@/data/priority-search-page";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

// PrioritySearchPage UI is intentionally delivered from track-texas-drivers-license.lazy.tsx.
const canonicalPath = "/track-texas-drivers-license";

export const Route = createFileRoute("/track-texas-drivers-license")({
  loader: async () => {
    const data = await loadPrioritySearchPage("track-texas-drivers-license");
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => loaderData ? buildPrioritySearchHead({
    canonicalPath,
    title: "How to Track Your Texas Driver License or ID Card",
    description: loaderData.intro,
    data: loaderData,
    about: ["Texas driver license status", "Texas DPS", "driver license mailing status", "Texas identification card"],
  }) : {},
});