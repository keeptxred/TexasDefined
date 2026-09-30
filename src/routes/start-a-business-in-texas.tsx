import { createFileRoute, notFound } from "@tanstack/react-router";
import { StartBusinessTexasGuide } from "@/components/business/StartBusinessTexasGuide";
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
    description: "How to start a business in Texas in 2026: entity choices, LLC filing costs, EIN, Texas taxes, licenses, permits, BOI rules and a step-by-step startup checklist.",
    data: loaderData,
    about: ["start a business in Texas", "Texas LLC", "Texas business registration", "Texas business license", "Texas Secretary of State", "Texas Comptroller", "EIN", "Texas franchise tax"],
  }) : {},
  component: StartBusinessTexasGuide,
});
