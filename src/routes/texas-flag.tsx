import { createFileRoute, notFound } from "@tanstack/react-router";
import { loadPrioritySearchPage } from "@/data/priority-search-page";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

// PrioritySearchPage UI is intentionally delivered from texas-flag.lazy.tsx.
const canonicalPath: "/texas-flag" = "/texas-flag";
const faq = [
  { question: "Which Texas flag came first?", answer: "The Burnet national standard, a blue field with one large gold star, was approved December 10, 1836. The present red, white and blue Lone Star design was approved January 25, 1839. A separate naval ensign and other revolutionary flags also existed in 1836." },
  { question: "When was the current Texas flag adopted?", answer: "The familiar Lone Star design was approved by the Republic of Texas on January 25, 1839. It later became the state flag." },
  { question: "Who designed the Texas flag?", answer: "Peter Krag drew the surviving official 1839 artwork, but the original creator of the design is not conclusively known. William H. Wharton and Oliver Jones were involved in the legislation." },
  { question: "What do the Texas flag colors mean?", answer: "Texas law assigns blue to loyalty, white to purity and red to bravery. The single white five-pointed Lone Star is the flag's defining symbol." },
  { question: "Where is the original 1839 Texas flag drawing?", answer: "The Texas State Library and Archives Commission preserves Peter Krag's signed flag-and-seal design as archival item 1974/066-001. Its exhibit includes views of the artwork, the seal and the official signatures." },
  { question: "When is Texas Flag Day?", answer: "Texas Flag Day is March 2 under Texas Government Code § 662.048. It falls on Texas Independence Day, not January 25, when the current Lone Star flag was approved in 1839." },
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
    includeFaqSchema: false,
    title: "Texas Flag: 1836 Burnet Flag, 1839 Lone Star, Meaning and Rules",
    description: loaderData.intro,
    data: loaderData,
    about: ["Texas flag", "Burnet flag of 1836", "Lone Star flag of 1839", "Republic of Texas", "Texas Flag Code", "Texas history"],
  }) : {},
});
