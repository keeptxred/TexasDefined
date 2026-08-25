import { createLazyFileRoute } from "@tanstack/react-router";

import { AnswerSummary } from "@/components/content/AnswerSummary";
import { TexasPlaceDirectory } from "@/components/directories/TexasPlaceDirectory";
import { TEXAS_CITIES } from "@/data/texas-places";

export const Route = createLazyFileRoute("/browse/cities")({ component: CitiesDirectoryPage });

function CitiesDirectoryPage() {
  return <>
    <AnswerSummary
      eyebrow="Texas cities"
      title="How to use the Texas city directory"
      items={[
        { question: "What is this directory?", answer: `A searchable starting point for ${TEXAS_CITIES.length.toLocaleString("en-US")} Texas cities in the current Texas Defined reference set, organized by county and region.` },
        { question: "How can I find what county a Texas city is in?", answer: "Each city entry identifies its Texas county and region. Use the county directory and planning tools for additional local context while city detail records are independently source-verified." },
        { question: "Can I use this to compare places to live?", answer: "Yes. Start with a city name, then use the moving and financial tools for cost-of-living, salary, housing, utilities and relocation planning." },
        { question: "Is this an official government directory?", answer: "No. Texas Defined is an independent reference and editorial guide; verify official boundaries, services and records with the relevant city or county agency." },
      ]}
    />
    <TexasPlaceDirectory mode="cities" />
  </>;
}
