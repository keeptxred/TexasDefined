import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { getFishingTechniqueDirectoryData } from "@/data/fishing/technique-data.functions";
import { FISHING_TECHNIQUES_DIRECTORY_PATH } from "@/data/fishing/technique-routing";
import { buildMeta, canonicalLink } from "@/lib/seo";

const FishingTechniqueDirectory = lazy(() => import("@/components/fishing/FishingTechniqueDirectory").then((module) => ({ default: module.FishingTechniqueDirectory })));
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const description = "Browse source-backed Texas fishing techniques and see the complete lakes, target species and seasons where each method has a verified relationship in TexasDefined's fishing catalog.";
type TechniqueSearch = { category?: string; species?: string; season?: string };

const faq = [
  { question: "Are these live fishing recommendations?", answer: "No. Technique pages organize durable, source-backed lake relationships. Check fresh fishing reports and current conditions before a trip." },
  { question: "Does TexasDefined recommend specific tackle brands?", answer: "No. The technique directory explains verified methods and lake applications without product rankings, affiliate weighting or sponsor influence." },
  { question: "Why are some fishing techniques not listed?", answer: "A public technique page requires a verified technique record plus at least one verified application on a complete TexasDefined lake guide. Missing coverage is not a judgment that another method does not work." },
];

export const Route = createFileRoute("/fishing/techniques")({
  validateSearch: (search: Record<string, unknown>): TechniqueSearch => ({
    category: slug(search.category),
    species: slug(search.species),
    season: slug(search.season),
  }),
  loader: () => getFishingTechniqueDirectoryData(),
  head: ({ loaderData }) => {
    const entries = loaderData?.entries ?? [];
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "CollectionPage", url: `${siteUrl}${FISHING_TECHNIQUES_DIRECTORY_PATH}`, name: "Texas Fishing Techniques", description, mainEntity: { "@id": `${siteUrl}${FISHING_TECHNIQUES_DIRECTORY_PATH}#techniques` } },
        { "@type": "ItemList", "@id": `${siteUrl}${FISHING_TECHNIQUES_DIRECTORY_PATH}#techniques`, numberOfItems: entries.length, itemListElement: entries.map((entry, index) => ({ "@type": "ListItem", position: index + 1, name: entry.technique.name, url: `${siteUrl}${entry.canonicalPath}` })) },
        { "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Front page", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Fishing", item: `${siteUrl}/fishing` },
          { "@type": "ListItem", position: 3, name: "Fishing techniques", item: `${siteUrl}${FISHING_TECHNIQUES_DIRECTORY_PATH}` },
        ] },
      ],
    };
    return { meta: buildMeta(texasDefinedBrand, { title: "Texas Fishing Techniques — Source-Backed Methods by Lake & Species", description, canonicalPath: FISHING_TECHNIQUES_DIRECTORY_PATH }), links: [canonicalLink(texasDefinedBrand, FISHING_TECHNIQUES_DIRECTORY_PATH)], scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }] };
  },
  component: FishingTechniquesPage,
});

function FishingTechniquesPage() {
  return (
    <Suspense fallback={<div className="min-h-[32rem]" aria-hidden="true" />}>
      <FishingTechniqueDirectory data={Route.useLoaderData()} search={Route.useSearch()} />
    </Suspense>
  );
}

function slug(value: unknown) { return typeof value === "string" && /^[a-z0-9-]+$/.test(value) ? value : undefined; }
