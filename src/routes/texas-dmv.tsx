import { createFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { PRIORITY_SEARCH_PAGES } from "@/data/priority-search-pages";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const canonicalPath = "/texas-dmv";
const sourceData = PRIORITY_SEARCH_PAGES["texas-dmv"];
const data = {
  ...sourceData,
  faq: [
    { question: "Does the Texas DMV issue driver licenses?", answer: "No. Texas driver licenses and state IDs are issued by the Texas Department of Public Safety. TxDMV handles vehicle titles, registration, dealer licensing and motor-carrier services." },
    { question: "Who handles Texas vehicle registration?", answer: "TxDMV sets statewide vehicle-registration requirements and provides renewal guidance, while county tax assessor-collector offices handle many local registration transactions." },
    { question: "Where should I go for a Texas vehicle title?", answer: "Vehicle-title services are part of the TxDMV system. Use the official TxDMV resources and your county office when the transaction requires local processing." },
  ],
};

export const Route = createFileRoute("/texas-dmv")({
  head: () => buildPrioritySearchHead({
    canonicalPath,
    title: "Texas DMV: Registration, Titles & TxDMV Services",
    description: data.intro,
    data,
    about: ["Texas DMV", "TxDMV", "vehicle registration", "vehicle titles", "Texas motor vehicles"],
  }),
  component: () => <PrioritySearchPage data={data} />,
});
