import { createFileRoute, notFound } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { loadPrioritySearchPage } from "@/data/priority-search-page";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const canonicalPath = "/texas-comptroller";
const faq = [
  { question: "What does the Texas Comptroller do?", answer: "The Texas Comptroller administers major state taxes, taxpayer services, state accounting and revenue information and publishes extensive local property-tax resources." },
  { question: "Does the Texas Comptroller set my local property-tax rate?", answer: "No. Local taxing units levy property taxes. The Comptroller provides statewide property-tax guidance, appraisal-district information, reports and data." },
  { question: "Where can businesses find Texas tax information?", answer: "Use the official Texas Comptroller website linked on this page for current sales-tax, franchise-tax and other taxpayer services and filing information." },
];

export const Route = createFileRoute("/texas-comptroller")({
  loader: async () => {
    const sourceData = await loadPrioritySearchPage("texas-comptroller");
    if (!sourceData) throw notFound();
    return { ...sourceData, faq };
  },
  head: ({ loaderData }) => loaderData ? buildPrioritySearchHead({
    canonicalPath,
    title: "Texas Comptroller: Taxes, Revenue & Property-Tax Resources",
    description: loaderData.intro,
    data: loaderData,
    about: ["Texas Comptroller", "Texas taxes", "Texas revenue", "property tax", "franchise tax"],
  }) : {},
  component: TexasComptrollerPage,
});

function TexasComptrollerPage() {
  return <PrioritySearchPage data={Route.useLoaderData()} />;
}
