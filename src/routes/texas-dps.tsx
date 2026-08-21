import { createFileRoute, notFound } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { loadPrioritySearchPage } from "@/data/priority-search-page";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const canonicalPath = "/texas-dps";
const faq = [
  { question: "Does Texas DPS handle driver licenses?", answer: "Yes. Texas DPS issues driver licenses and state identification cards and provides renewal, replacement, address-change, appointment and REAL ID resources." },
  { question: "What is the difference between Texas DPS and Texas DMV?", answer: "DPS handles driver licensing, identification cards and statewide public-safety functions. TxDMV handles vehicle titles, registration, dealers and motor-carrier services." },
  { question: "Where should I verify current Texas DPS requirements?", answer: "Use the official Texas DPS website linked on this page for current appointments, documents, eligibility rules and public-safety services." },
];

export const Route = createFileRoute("/texas-dps")({
  loader: async () => {
    const sourceData = await loadPrioritySearchPage("texas-dps");
    if (!sourceData) throw notFound();
    return { ...sourceData, faq };
  },
  head: ({ loaderData }) => loaderData ? buildPrioritySearchHead({
    canonicalPath,
    title: "Texas DPS: Driver Licenses, ID & Public Safety Services",
    description: loaderData.intro,
    data: loaderData,
    about: ["Texas DPS", "Texas Department of Public Safety", "Texas driver license", "Texas ID", "public safety"],
  }) : {},
  component: TexasDpsPage,
});

function TexasDpsPage() {
  return <PrioritySearchPage data={Route.useLoaderData()} />;
}
