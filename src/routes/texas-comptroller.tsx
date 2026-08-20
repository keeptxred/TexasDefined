import { createFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { PRIORITY_SEARCH_PAGES } from "@/data/priority-search-pages";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const canonicalPath = "/texas-comptroller";
const sourceData = PRIORITY_SEARCH_PAGES["texas-comptroller"];
const data = {
  ...sourceData,
  faq: [
    { question: "What does the Texas Comptroller do?", answer: "The Texas Comptroller administers major state taxes, taxpayer services, state accounting and revenue information and publishes extensive local property-tax resources." },
    { question: "Does the Texas Comptroller set my local property-tax rate?", answer: "No. Local taxing units levy property taxes. The Comptroller provides statewide property-tax guidance, appraisal-district information, reports and data." },
    { question: "Where can businesses find Texas tax information?", answer: "Use the official Texas Comptroller website linked on this page for current sales-tax, franchise-tax and other taxpayer services and filing information." },
  ],
};

export const Route = createFileRoute("/texas-comptroller")({
  head: () => buildPrioritySearchHead({
    canonicalPath,
    title: "Texas Comptroller: Taxes, Revenue & Property-Tax Resources",
    description: data.intro,
    data,
    about: ["Texas Comptroller", "Texas taxes", "Texas revenue", "property tax", "franchise tax"],
  }),
  component: () => <PrioritySearchPage data={data} />,
});
