import { createFileRoute, notFound } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { loadPrioritySearchPage } from "@/data/priority-search-page";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const canonicalPath = "/start-a-business-in-texas";

export const Route = createFileRoute("/start-a-business-in-texas")({
  loader: async () => {
    const data = await loadPrioritySearchPage("start-a-business-in-texas");
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => loaderData ? buildPrioritySearchHead({
    canonicalPath,
    title: "How to Start a Business in Texas",
    description: loaderData.intro,
    data: loaderData,
    about: ["start a business in Texas", "Texas business registration", "Texas business license", "Texas Secretary of State", "Texas Comptroller"],
  }) : {},
  component: Page,
});

function Page() {
  return <PrioritySearchPage data={Route.useLoaderData()} />;
}
