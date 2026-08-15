import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { getFishingReportDirectoryData } from "@/data/fishing/report-directory-data.functions";
import { FISHING_REPORTS_DIRECTORY_PATH } from "@/data/fishing/report-routing";
import { buildMeta, canonicalLink } from "@/lib/seo";

const FishingReportDirectory = lazy(() => import("@/components/fishing/FishingReportDirectory").then((module) => ({ default: module.FishingReportDirectory })));
const description = "Browse source-backed Texas fishing reports with explicit publication dates, freshness labels, lake and target-species filters, and no fabricated current-condition claims.";
const clean = (value: unknown) => typeof value === "string" && /^[a-z0-9-]{1,120}$/.test(value) ? value : undefined;

export const Route = createFileRoute("/fishing/reports")({
  validateSearch: (search: Record<string, unknown>) => ({ lake: clean(search.lake), species: clean(search.species), freshness: clean(search.freshness) }),
  loader: () => getFishingReportDirectoryData(),
  head: ({ loaderData }) => {
    const reports = loaderData?.reports ?? [];
    const origin = `https://${texasDefinedBrand.identity.domain}`;
    return { meta: buildMeta(texasDefinedBrand, { title: "Texas Fishing Reports — Verified & Freshness-Labeled", description, canonicalPath: FISHING_REPORTS_DIRECTORY_PATH }), links: [canonicalLink(texasDefinedBrand, FISHING_REPORTS_DIRECTORY_PATH)], scripts: [{ type: "application/ld+json", children: JSON.stringify([
      { "@context": "https://schema.org", "@type": "CollectionPage", name: "Texas Fishing Reports", description, url: `${origin}${FISHING_REPORTS_DIRECTORY_PATH}`, dateModified: loaderData?.verifiedAt },
      { "@context": "https://schema.org", "@type": "ItemList", name: "Verified Texas fishing reports", numberOfItems: reports.length, itemListElement: reports.map((entry, index) => ({ "@type": "ListItem", position: index + 1, name: entry.report.title, url: `${origin}${entry.href}` })) },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: origin }, { "@type": "ListItem", position: 2, name: "Fishing", item: `${origin}/fishing` }, { "@type": "ListItem", position: 3, name: "Fishing reports", item: `${origin}${FISHING_REPORTS_DIRECTORY_PATH}` }] },
    ]) } ] };
  },
  component: FishingReportsRoute,
});

function FishingReportsRoute() {
  return <Suspense fallback={<div className="min-h-[32rem]" aria-hidden="true" />}><FishingReportDirectory pageData={Route.useLoaderData()} search={Route.useSearch()} /></Suspense>;
}