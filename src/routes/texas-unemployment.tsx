import { createFileRoute, notFound } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { loadPrioritySearchPage } from "@/data/priority-search-page";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const canonicalPath = "/texas-unemployment";
const faq = [
  { question: "Who administers unemployment benefits in Texas?", answer: "The Texas Workforce Commission administers Texas unemployment benefits and provides the official application, payment-request and claimant guidance systems." },
  { question: "Where do I apply for Texas unemployment benefits?", answer: "Apply through the official Texas Workforce Commission unemployment system linked on this page. Avoid relying on unofficial sites for a benefits claim." },
  { question: "What affects Texas unemployment eligibility?", answer: "Eligibility depends on factors including base-period wages, the reason for the job separation and ongoing availability for work, along with continuing work-search and payment-request requirements." },
];

export const Route = createFileRoute("/texas-unemployment")({
  loader: async () => {
    const sourceData = await loadPrioritySearchPage("texas-unemployment");
    if (!sourceData) throw notFound();
    return { ...sourceData, faq };
  },
  head: ({ loaderData }) => loaderData ? buildPrioritySearchHead({
    canonicalPath,
    title: "Texas Unemployment Benefits: Apply, Eligibility & TWC",
    description: loaderData.intro,
    data: loaderData,
    about: ["Texas unemployment", "Texas Workforce Commission", "unemployment benefits", "Texas jobs"],
  }) : {},
  component: TexasUnemploymentPage,
});

function TexasUnemploymentPage() {
  return <PrioritySearchPage data={Route.useLoaderData()} />;
}
