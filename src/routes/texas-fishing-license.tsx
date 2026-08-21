import { createFileRoute, notFound } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { loadPrioritySearchPage } from "@/data/priority-search-page";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const canonicalPath = "/texas-fishing-license";
const faq = [
  { question: "Do most people need a fishing license in Texas?", answer: "Most people who fish Texas public waters need a current Texas fishing license unless an official exception applies. Texas Parks and Wildlife publishes the current exceptions and requirements." },
  { question: "Do I need a freshwater or saltwater endorsement?", answer: "The correct license package depends on where you fish and your residency status. Texas uses separate freshwater and saltwater endorsements, while broader packages can cover both." },
  { question: "Where can I buy an official Texas fishing license?", answer: "Use Texas Parks and Wildlife's official online license sales system or an authorized license retailer. Confirm the current season, package and identification requirements before purchase." },
];

export const Route = createFileRoute("/texas-fishing-license")({
  loader: async () => {
    const sourceData = await loadPrioritySearchPage("texas-fishing-license");
    if (!sourceData) throw notFound();
    return { ...sourceData, faq };
  },
  head: ({ loaderData }) => loaderData ? buildPrioritySearchHead({
    canonicalPath,
    title: "Texas Fishing License: Requirements, Fees & Official Links",
    description: loaderData.intro,
    data: loaderData,
    about: ["Texas fishing license", "Texas Parks and Wildlife", "fishing regulations", "freshwater fishing", "saltwater fishing"],
  }) : {},
  component: TexasFishingLicensePage,
});

function TexasFishingLicensePage() {
  return <PrioritySearchPage data={Route.useLoaderData()} />;
}
