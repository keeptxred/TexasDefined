import { createFileRoute, notFound } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { loadPrioritySearchPage } from "@/data/priority-search-page";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const canonicalPath = "/texas-dmv";
const faq = [
  { question: "Does the Texas DMV issue driver licenses?", answer: "No. Texas driver licenses and state IDs are issued by the Texas Department of Public Safety. TxDMV handles vehicle titles, registration, dealer licensing and motor-carrier services." },
  { question: "Who handles Texas vehicle registration?", answer: "TxDMV sets statewide vehicle-registration requirements and provides renewal guidance, while county tax assessor-collector offices handle many local registration transactions." },
  { question: "Where should I go for a Texas vehicle title?", answer: "Vehicle-title services are part of the TxDMV system. Use the official TxDMV resources and your county office when the transaction requires local processing." },
];

export const Route = createFileRoute("/texas-dmv")({
  loader: async () => {
    const sourceData = await loadPrioritySearchPage("texas-dmv");
    if (!sourceData) throw notFound();
    return { ...sourceData, faq };
  },
  head: ({ loaderData }) => loaderData ? buildPrioritySearchHead({
    canonicalPath,
    title: "Texas DMV: Registration, Titles & TxDMV Services",
    description: loaderData.intro,
    data: loaderData,
    about: ["Texas DMV", "TxDMV", "vehicle registration", "vehicle titles", "Texas motor vehicles"],
  }) : {},
  component: TexasDmvPage,
});

function TexasDmvPage() {
  return <PrioritySearchPage data={Route.useLoaderData()} />;
}
