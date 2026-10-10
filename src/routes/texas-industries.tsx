import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/texas-industries";
const description = "Explore the industries that drive Texas: energy, technology, semiconductors, manufacturing, logistics, aerospace, healthcare, agriculture, finance, construction, corporate services and tourism.";
const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);

export const Route = createFileRoute(canonicalPath)({
  // Retain complete SSR JSON-LD without eagerly bundling the full industry registry.
  loader: async () => {
    const { TEXAS_INDUSTRIES } = await import("@/data/texas-industries");
    return TEXAS_INDUSTRIES.map(({ shortTitle, slug }) => ({ shortTitle, slug }));
  },
  head: ({ loaderData }) => ({
    meta: buildMeta(texasDefinedBrand, {
      title: "Texas Industries — Economy, Major Sectors & Regional Hubs",
      description,
      canonicalPath,
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": `${pageUrl}#page`,
          url: pageUrl,
          name: "Texas Industries",
          description,
          isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` },
          publisher: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#organization` },
          mainEntity: { "@id": `${pageUrl}#sectors` },
        },
        {
          "@type": "ItemList",
          "@id": `${pageUrl}#sectors`,
          name: "Major Texas industry sectors",
          numberOfItems: loaderData?.length ?? 0,
          itemListElement: (loaderData ?? []).map((industry, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: industry.shortTitle,
            url: absoluteUrl(texasDefinedBrand, `/texas-industries/${industry.slug}`),
          })),
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl(texasDefinedBrand, "/") },
            { "@type": "ListItem", position: 2, name: "Texas Industries", item: pageUrl },
          ],
        },
      ],
    })],
  }),
});
