import { createFileRoute, notFound } from "@tanstack/react-router";
import { loadPrioritySearchPage } from "@/data/priority-search-page";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

// PrioritySearchPage UI is intentionally delivered from everything-bigger-in-texas.lazy.tsx.
const canonicalPath = "/everything-bigger-in-texas";

export const Route = createFileRoute("/everything-bigger-in-texas")({
  loader: async () => {
    const data = await loadPrioritySearchPage("everything-bigger-in-texas");
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => loaderData ? buildPrioritySearchHead({
    canonicalPath,
    title: "Is Everything Really Bigger in Texas? Famous Claims Fact-Checked",
    description: loaderData.intro,
    data: loaderData,
    about: ["everything is bigger in Texas", "Texas facts", "King Ranch", "Bracken Cave", "Texas superlatives"],
  }) : {},
});