import { createFileRoute, notFound } from "@tanstack/react-router";
import { loadPrioritySearchPage } from "@/data/priority-search-page";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

// PrioritySearchPage UI is intentionally delivered from texas-vehicle-registration.lazy.tsx.
const canonicalPath = "/texas-vehicle-registration";
const faq = [
  { question: "Who handles Texas vehicle registration?", answer: "TxDMV sets statewide vehicle-registration requirements and provides renewal guidance, while county tax assessor-collector offices handle many local registration transactions." },
  { question: "Is Texas vehicle registration the same as a driver license?", answer: "No. Vehicle registration is a TxDMV and county-office function. Driver licenses and state IDs are handled by Texas DPS." },
  { question: "Where should I verify current registration requirements?", answer: "Use the official TxDMV resources and your county tax assessor-collector office for current renewal steps, documentation, fees and local processing instructions." },
];

export const Route = createFileRoute("/texas-vehicle-registration")({
  loader: async () => {
    const sourceData = await loadPrioritySearchPage("texas-vehicle-registration");
    if (!sourceData) throw notFound();
    return { ...sourceData, faq };
  },
  head: ({ loaderData }) => loaderData ? buildPrioritySearchHead({
    canonicalPath,
    title: "Texas Vehicle Registration: Renewals, County Offices & TxDMV",
    description: loaderData.intro,
    data: loaderData,
    about: ["Texas vehicle registration", "TxDMV", "vehicle registration renewal", "county tax assessor-collector"],
  }) : {},
});
