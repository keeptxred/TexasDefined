import { createFileRoute, notFound } from "@tanstack/react-router";
import { loadPrioritySearchPage } from "@/data/priority-search-page";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

// PrioritySearchPage UI is intentionally delivered from texas-flag.lazy.tsx.
const canonicalPath: "/texas-flag" = "/texas-flag";
const faq = [
  { question: "When was the current Texas flag adopted?", answer: "The familiar Lone Star design was adopted by the Republic of Texas in 1839 and remains the state flag today." },
  { question: "What do the Texas flag colors mean?", answer: "Texas law assigns blue to loyalty, white to purity and red to bravery. The single white five-pointed Lone Star is the flag's defining symbol." },
  { question: "Where can I learn the rules for displaying the Texas flag?", answer: "Use the Texas flag etiquette and display guide linked on this page for practical guidance on placement, respect, half-staff, folding and display with other flags." },
];

export const Route = createFileRoute("/texas-flag")({
  loader: async () => {
    const sourceData = await loadPrioritySearchPage("texas-flag");
    if (!sourceData) throw notFound();
    return { ...sourceData, faq };
  },
  head: ({ loaderData }) => loaderData ? buildPrioritySearchHead({
    canonicalPath,
    title: "Texas Flag: History, Meaning, Rules & Lone Star Guide",
    description: loaderData.intro,
    data: loaderData,
    about: ["Texas flag", "Lone Star flag", "Texas history", "Texas Flag Code", "Texas symbols"],
  }) : {},
});
