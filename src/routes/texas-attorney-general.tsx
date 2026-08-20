import { createFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { PRIORITY_SEARCH_PAGES } from "@/data/priority-search-pages";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const canonicalPath = "/texas-attorney-general";
const sourceData = PRIORITY_SEARCH_PAGES["texas-attorney-general"];
const data = {
  ...sourceData,
  related: [
    { label: "Texas child support law guide on KeepTXRed", href: "https://keeptxred.com/guides/texas-child-support-guidelines-law", external: true },
    ...sourceData.related,
  ],
  faq: [
    { question: "Does the Texas Attorney General handle child support?", answer: "Yes. The Office of the Attorney General administers Texas's child-support enforcement program, including services related to establishing, enforcing and modifying support orders and paternity." },
    { question: "Can the Texas Attorney General act as my private lawyer?", answer: "The Attorney General represents the State of Texas and performs duties assigned by law. Its consumer-protection and other public programs do not make the office a private attorney for an individual." },
    { question: "Where should I verify current Texas Attorney General services?", answer: "Use the official Office of the Texas Attorney General website linked on this page for current forms, program rules, contact information and transaction-specific instructions." },
  ],
};

export const Route = createFileRoute("/texas-attorney-general")({
  head: () => buildPrioritySearchHead({
    canonicalPath,
    title: "Texas Attorney General: Office, Services & Official Links",
    description: data.intro,
    data,
    about: ["Texas Attorney General", "Texas child support", "consumer protection", "open government"],
  }),
  component: () => <PrioritySearchPage data={data} />,
});
