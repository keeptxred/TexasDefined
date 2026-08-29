import { lazy, Suspense } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";

import { AnswerSummary } from "@/components/content/AnswerSummary";
import { TexasPlaceDirectory } from "@/components/directories/TexasPlaceDirectory";
import { TEXAS_CITIES } from "@/data/texas-places";

const CityRelocationComparison = lazy(() => import("@/components/relocation/CityRelocationComparison").then((module) => ({ default: module.CityRelocationComparison })));

export const Route = createLazyFileRoute("/browse/cities")({ component: CitiesDirectoryPage });

function CitiesDirectoryPage() {
  return <>
    <AnswerSummary
      eyebrow="Texas cities"
      title="How to use the Texas city directory"
      items={[
        { question: "What is this directory?", answer: `A searchable starting point for ${TEXAS_CITIES.length.toLocaleString("en-US")} Texas cities in the current Texas Defined reference set, organized by county and region, plus a source-backed relocation comparison layer for places with deeper moving research.` },
        { question: "How can I find what county a Texas city is in?", answer: "Each city entry identifies its Texas county and region. Use the county directory and exact-address research tools for local tax, school, utility, flood and insurance context while city detail records are independently source-verified." },
        { question: "Can I use this to compare places to live?", answer: "Yes, as an orientation tool. The relocation comparison uses transparent geography, setting, commute and planning labels; it does not publish a hidden best-city score or treat editorial labels as live home-price data." },
        { question: "Why does the exact address matter?", answer: "Texas mailing cities can cross county, school, utility, tax and insurance boundaries. Verify an exact address with the responsible public sources before relying on a citywide assumption." },
        { question: "Is this an official government directory?", answer: "No. Texas Defined is an independent reference and editorial guide; verify official boundaries, services and records with the relevant public agency." },
      ]}
    />
    <Suspense fallback={null}><CityRelocationComparison /></Suspense>
    <TexasPlaceDirectory mode="cities" />
  </>;
}