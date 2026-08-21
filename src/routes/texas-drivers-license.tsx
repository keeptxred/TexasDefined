import { createFileRoute, notFound } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { loadPrioritySearchPage } from "@/data/priority-search-page";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const canonicalPath = "/texas-drivers-license";
const faq = [
  { question: "Does Texas DPS or Texas DMV issue driver licenses?", answer: "Texas DPS issues driver licenses and state identification cards. TxDMV handles vehicle titles and registration, not driver licenses." },
  { question: "Can I renew or replace a Texas driver license online?", answer: "Many eligible Texans can renew, replace or update a driver license or ID through DPS online services. Eligibility varies, so the official DPS service determines whether an office visit is required." },
  { question: "Do Texas driver-license offices use appointments?", answer: "Texas driver-license offices operate primarily by appointment. Review the current DPS requirements and required documents before scheduling an in-person visit." },
];

export const Route = createFileRoute("/texas-drivers-license")({
  loader: async () => {
    const sourceData = await loadPrioritySearchPage("texas-drivers-license");
    if (!sourceData) throw notFound();
    return { ...sourceData, faq };
  },
  head: ({ loaderData }) => loaderData ? buildPrioritySearchHead({
    canonicalPath,
    title: "Texas Driver License: Renew, Replace, Appointments & REAL ID",
    description: loaderData.intro,
    data: loaderData,
    about: ["Texas driver license", "Texas DPS", "REAL ID", "driver license renewal", "driver license appointments"],
  }) : {},
  component: TexasDriversLicensePage,
});

function TexasDriversLicensePage() {
  return <PrioritySearchPage data={Route.useLoaderData()} />;
}
