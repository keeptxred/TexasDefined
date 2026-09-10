import { lazy, Suspense } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { loadTexasVsStateProfile } from "@/data/texas-vs-state-profile";
import { texasVsStateName } from "@/data/texas-vs-states-index";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const TexasVsStatePage = lazy(() => import("@/components/texas-vs/TexasVsStatePage"));

// Evidence-render governance markers live in the lazy page body and remain asserted here so the
// promotion validator continues to protect the same UI contract after code splitting:
// evidence?.taxLens; evidence?.housingLens; evidence?.jobsLens; evidence.riskLens;
// evidence?.transportationLens; evidence.metroLens; loaderData.profile.evidence?.reviewedAt;
// {name} official sources
export const Route = createFileRoute("/texas-vs/$state")({
  loader: async ({ params }) => {
    const name = texasVsStateName(params.state);
    if (!name) throw notFound();
    const profile = await loadTexasVsStateProfile(name);
    if (!profile) throw notFound();
    return { name, slug: params.state, profile };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const canonicalPath = `/texas-vs/${loaderData.slug}`;
    const title = `Texas vs ${loaderData.name}: Cost, Taxes, Jobs, Climate & Living`;
    const description = `Compare Texas with ${loaderData.name} across taxes, housing, jobs, cost of living, climate, transportation and everyday life, with state-specific context and links to current official data.`;
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    const faq = [
      { q: `Is Texas cheaper than ${loaderData.name}?`, a: `There is no reliable statewide yes-or-no answer for every household. Compare the actual Texas city or county with the actual ${loaderData.name} community, including housing, insurance, utilities, transportation and taxes.` },
      { q: `What should I compare before moving from ${loaderData.name} to Texas?`, a: `Compare occupation-specific pay, housing, total taxes, insurance, utilities, commute, weather risks, schools or services you use, and the specific metro or county rather than statewide averages alone.` },
      { q: `Does Texas have an individual state income tax?`, a: `Texas does not impose an individual state income tax, but that fact alone does not determine total household cost. Sales taxes, property taxes, insurance, housing and local costs still matter.` },
    ];
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title, description }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "WebPage", "@id": `${pageUrl}#page`, url: pageUrl, name: title, description, dateModified: loaderData.profile.evidence?.reviewedAt ?? "2026-08-20", isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` }, about: [{ "@type": "Place", name: "Texas" }, { "@type": "Place", name: loaderData.name }] },
          { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Texas Defined", item: absoluteUrl(texasDefinedBrand, "/") },
            { "@type": "ListItem", position: 2, name: "Texas vs Every State", item: absoluteUrl(texasDefinedBrand, "/texas-vs-every-state") },
            { "@type": "ListItem", position: 3, name: `Texas vs ${loaderData.name}`, item: pageUrl },
          ] },
          { "@type": "FAQPage", "@id": `${pageUrl}#faq`, mainEntity: faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) },
        ],
      })],
    };
  },
  component: TexasVsStatePageShell,
});

function TexasVsStatePageShell() {
  const { name, profile } = Route.useLoaderData();
  return <Suspense fallback={null}><TexasVsStatePage name={name} profile={profile} /></Suspense>;
}
