import { createFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { PRIORITY_SEARCH_PAGES } from "@/data/priority-search-pages";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const canonicalPath = "/texas-vehicle-registration";
const sourceData = PRIORITY_SEARCH_PAGES["texas-vehicle-registration"];
const data = {
  ...sourceData,
  faq: [
    { question: "Who handles Texas vehicle registration?", answer: "TxDMV sets statewide vehicle-registration requirements and provides renewal guidance, while county tax assessor-collector offices handle many local registration transactions." },
    { question: "Is Texas vehicle registration the same as a driver license?", answer: "No. Vehicle registration is a TxDMV and county-office function. Driver licenses and state IDs are handled by Texas DPS." },
    { question: "Where should I verify current registration requirements?", answer: "Use the official TxDMV resources and your county tax assessor-collector office for current renewal steps, documentation, fees and local processing instructions." },
  ],
};

export const Route = createFileRoute("/texas-vehicle-registration")({
  head: () => buildPrioritySearchHead({
    canonicalPath,
    title: "Texas Vehicle Registration: Renewals, County Offices & TxDMV",
    description: data.intro,
    data,
    about: ["Texas vehicle registration", "TxDMV", "vehicle registration renewal", "county tax assessor-collector"],
  }),
  component: () => <PrioritySearchPage data={data} />,
});
