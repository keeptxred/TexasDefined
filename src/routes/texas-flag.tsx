import { createFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { PRIORITY_SEARCH_PAGES } from "@/data/priority-search-pages";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const canonicalPath = "/texas-flag";
const sourceData = PRIORITY_SEARCH_PAGES["texas-flag"];
const data = {
  ...sourceData,
  faq: [
    { question: "When was the current Texas flag adopted?", answer: "The familiar Lone Star design was adopted by the Republic of Texas in 1839 and remains the state flag today." },
    { question: "What do the Texas flag colors mean?", answer: "Texas law assigns blue to loyalty, white to purity and red to bravery. The single white five-pointed Lone Star is the flag's defining symbol." },
    { question: "Where can I learn the rules for displaying the Texas flag?", answer: "Use the Texas flag etiquette and display guide linked on this page for practical guidance on placement, respect, half-staff, folding and display with other flags." },
  ],
};

export const Route = createFileRoute("/texas-flag")({
  head: () => buildPrioritySearchHead({
    canonicalPath,
    title: "Texas Flag: History, Meaning, Rules & Lone Star Guide",
    description: data.intro,
    data,
    about: ["Texas flag", "Lone Star flag", "Texas history", "Texas Flag Code", "Texas symbols"],
  }),
  component: () => <PrioritySearchPage data={data} />,
});
