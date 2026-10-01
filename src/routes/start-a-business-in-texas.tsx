import { createFileRoute, notFound } from "@tanstack/react-router";
import { Suspense } from "react";
import { loadPrioritySearchPage } from "@/data/priority-search-page";
import {
  START_BUSINESS_FAQ,
  START_BUSINESS_SEO_SECTIONS,
  StartBusinessTexasGuide,
} from "@/components/business/StartBusinessTexasGuide";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const canonicalPath = "/start-a-business-in-texas";
const description = "How to start a business in Texas in 2026: entity choices, LLC filing costs, EIN, Texas taxes, licenses, permits, BOI rules and a step-by-step startup checklist.";

export const Route = createFileRoute("/start-a-business-in-texas")({
  loader: async () => {
    const data = await loadPrioritySearchPage("start-a-business-in-texas");
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};

    const seoData = {
      ...loaderData,
      intro: description,
      updated: "September 30, 2026",
      sections: START_BUSINESS_SEO_SECTIONS.map((section) => ({
        heading: section.heading,
        paragraphs: [...section.paragraphs],
        links: section.links.map((link) => ({ ...link })),
      })),
      faq: START_BUSINESS_FAQ.map((item) => ({ ...item })),
    };

    return buildPrioritySearchHead({
      canonicalPath,
      title: "How to Start a Business in Texas: 10 Steps (2026)",
      description,
      data: seoData,
      about: [
        "start a business in Texas",
        "Texas LLC",
        "Texas business registration",
        "Texas business license",
        "Employer Identification Number",
        "Texas franchise tax",
        "Texas Secretary of State",
        "Texas Comptroller",
      ],
    });
  },
  component: Page,
});

function Page() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-5 py-12 text-sm text-muted-foreground" role="status">Loading Texas business guide…</div>}>
      <StartBusinessTexasGuide />
    </Suspense>
  );
}
