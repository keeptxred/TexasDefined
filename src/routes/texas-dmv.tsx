import { createFileRoute, notFound } from "@tanstack/react-router";
import { loadPrioritySearchPage } from "@/data/priority-search-page";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const canonicalPath = "/texas-dmv";
const faq = [
  { question: "Does TxDMV issue Texas driver licenses?", answer: "No. The Texas Department of Public Safety issues driver licenses, identification cards and commercial driver licenses. TxDMV administers vehicle titles, registration, dealer and motor-carrier programs." },
  { question: "Where do I transfer a Texas vehicle title?", answer: "Most title applications are submitted to a county tax assessor-collector office using the applicable TxDMV documents. Check the original title, lien release, Form 130-U and any special-case requirements before visiting." },
  { question: "Do Texas vehicles still need annual inspections?", answer: "Texas ended routine annual safety inspections for most noncommercial vehicles in 2025. Commercial safety inspections and emissions testing for qualifying vehicles in designated counties continue." },
  { question: "Who handles Texas motor vehicle sales tax?", answer: "The Texas Comptroller sets motor vehicle tax guidance; county tax assessor-collector offices collect tax for many title transactions." },
];
export const Route = createFileRoute("/texas-dmv")({
  loader: async () => {
    const sourceData = await loadPrioritySearchPage("texas-dmv");
    if (!sourceData) throw notFound();
    return { ...sourceData, faq };
  },
  head: ({ loaderData }) => loaderData ? buildPrioritySearchHead({
    canonicalPath,
    title: "Texas DMV: Registration, Titles, Plates, Taxes & DPS Services",
    description: "Find the correct Texas agency and official resources for vehicle registration, titles, plates, inspections, taxes, driver licenses and CDL services.",
    data: loaderData,
    about: ["Texas Department of Motor Vehicles", "Texas Department of Public Safety", "Texas vehicle registration", "Texas title transfers", "Texas motor vehicle taxes"],
  }) : {},
});
