import { createFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { PRIORITY_SEARCH_PAGES } from "@/data/priority-search-pages";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const canonicalPath = "/texas-secretary-of-state";
const sourceData = PRIORITY_SEARCH_PAGES["texas-secretary-of-state"];
const data = {
  ...sourceData,
  faq: [
    { question: "What does the Texas Secretary of State handle?", answer: "The office is Texas's chief elections office and also handles business-entity filings, the Texas Register and other official state records and filings." },
    { question: "Is the Texas Secretary of State the place for business filings?", answer: "Yes. The office receives formation, registration and other filings for many Texas business entities and provides online filing and record-access services." },
    { question: "Where should I verify current Texas election information?", answer: "Use the Texas Secretary of State's official elections resources linked on this page for current statewide election guidance, forms and voter information." },
  ],
};

export const Route = createFileRoute("/texas-secretary-of-state")({
  head: () => buildPrioritySearchHead({
    canonicalPath,
    title: "Texas Secretary of State: Elections, Business & Records",
    description: data.intro,
    data,
    about: ["Texas Secretary of State", "Texas elections", "Texas business filings", "Texas Register"],
  }),
  component: () => <PrioritySearchPage data={data} />,
});
