import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { TEXAS_INDUSTRIES } from "@/data/texas-industries";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/texas-industries";
const description = "Explore the industries that drive Texas: energy, technology, semiconductors, manufacturing, logistics, aerospace, healthcare, agriculture, finance, construction, corporate services and tourism.";
const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
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
          numberOfItems: TEXAS_INDUSTRIES.length,
          itemListElement: TEXAS_INDUSTRIES.map((industry, index) => ({
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
