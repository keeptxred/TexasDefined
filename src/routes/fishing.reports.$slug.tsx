import { createFileRoute, notFound } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { getFishingReportProfileData } from "@/data/fishing/report-profile-data.functions";
import { buildMeta, canonicalLink } from "@/lib/seo";

const FishingReportProfile = lazy(() => import("@/components/fishing/FishingReportProfile").then((module) => ({ default: module.FishingReportProfile })));

export const Route = createFileRoute("/fishing/reports/$slug")({
  loader: async ({ params }) => { const pageData = await getFishingReportProfileData({ data: { slug: params.slug } }); if (!pageData) throw notFound(); return pageData; },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ name: "robots", content: "noindex, nofollow" }] };
    const { report, canonicalPath, lake, updates, freshness, contributorGuide } = loaderData;
    const origin = `https://${texasDefinedBrand.identity.domain}`;
    const description = `${report.summary} Published ${report.publishedAt.slice(0, 10)}; ${freshness === "expired" ? "historical and no longer current" : freshness === "stale" ? "stale dated snapshot" : "within the current verified reporting window"}.`;
    const meta = buildMeta(texasDefinedBrand, { title: `${report.title} — Texas Fishing Report`, description, canonicalPath });
    if (freshness === "expired") meta.push({ name: "robots", content: "noindex, follow" });
    return { meta, links: [canonicalLink(texasDefinedBrand, canonicalPath)], scripts: [{ type: "application/ld+json", children: JSON.stringify([
      { "@context": "https://schema.org", "@type": "WebPage", name: report.title, description, url: `${origin}${canonicalPath}`, dateModified: report.verifiedAt, datePublished: report.publishedAt },
      { "@context": "https://schema.org", "@type": "Article", headline: report.title, description: report.summary, datePublished: report.publishedAt, dateModified: report.verifiedAt ?? report.publishedAt, about: [lake.name, ...updates.map((entry) => entry.species?.commonName).filter(Boolean)], ...(contributorGuide ? { author: { "@type": "Organization", name: contributorGuide.businessName } } : {}) },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: origin }, { "@type": "ListItem", position: 2, name: "Fishing", item: `${origin}/fishing` }, { "@type": "ListItem", position: 3, name: "Fishing reports", item: `${origin}/fishing/reports` }, { "@type": "ListItem", position: 4, name: report.title, item: `${origin}${canonicalPath}` }] },
    ]) } ] };
  },
  component: FishingReportProfileRoute,
  notFoundComponent: () => <div className="mx-auto max-w-3xl px-6 py-20"><h1 className="font-display text-4xl">Verified fishing report not found</h1><p className="mt-4 text-muted-foreground">TexasDefined only publishes report routes after source, date, lake and species verification.</p><a href="/fishing/reports" className="mt-6 inline-block border-b border-primary pb-1 font-semibold text-primary">Browse fishing reports →</a></div>,
});

function FishingReportProfileRoute() {
  return <Suspense fallback={<div className="min-h-[32rem]" aria-hidden="true" />}><FishingReportProfile pageData={Route.useLoaderData()} /></Suspense>;
}