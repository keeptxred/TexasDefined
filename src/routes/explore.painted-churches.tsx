import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { expandedPaintedChurches } from "@/data/painted-churches-expanded";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/painted-churches";
const description = "Explore the Painted Churches of Texas with verified church profiles, history, architecture, photos and visitor information, from the Schulenburg cluster to churches statewide.";
const collectionUrl = absoluteUrl(texasDefinedBrand, canonicalPath);

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Painted Churches of Texas: Complete Statewide Guide",
      description,
      modifiedTime: "2026-09-25T12:00:00-05:00",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": `${collectionUrl}#collection`,
          url: collectionUrl,
          name: "Painted Churches of Texas",
          description,
          dateModified: "2026-09-25",
          isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` },
          publisher: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#organization` },
          mainEntity: { "@id": `${collectionUrl}#churches` },
          breadcrumb: { "@id": `${collectionUrl}#breadcrumbs` },
          subjectOf: [
            { "@type": "WebPage", url: absoluteUrl(texasDefinedBrand, "/explore/painted-churches/methodology"), name: "Painted Churches research methodology" },
            { "@type": "WebPage", url: absoluteUrl(texasDefinedBrand, "/explore/painted-churches/how-many"), name: "How many Painted Churches are in Texas?" },
            { "@type": "WebPage", url: absoluteUrl(texasDefinedBrand, "/explore/painted-churches/census"), name: "Texas Painted Churches master census" },
            { "@type": "WebPage", url: absoluteUrl(texasDefinedBrand, "/explore/painted-churches/compare"), name: "Compare Texas Painted Churches" },
            { "@type": "WebPage", url: absoluteUrl(texasDefinedBrand, "/explore/painted-churches/map"), name: "Texas Painted Churches interactive map" },
            { "@type": "WebPage", url: absoluteUrl(texasDefinedBrand, "/explore/painted-churches/then-and-now"), name: "Texas Painted Churches then and now" },
            { "@type": "WebPage", url: absoluteUrl(texasDefinedBrand, "/explore/painted-churches/knowledge-graph"), name: "Texas Painted Churches knowledge graph" },
          ],
        },
        {
          "@type": "ItemList",
          "@id": `${collectionUrl}#churches`,
          numberOfItems: expandedPaintedChurches.length,
          itemListElement: expandedPaintedChurches.map((church, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Church",
              "@id": `${absoluteUrl(texasDefinedBrand, `/explore/painted-churches/${church.slug}`)}#church`,
              name: church.name,
              url: absoluteUrl(texasDefinedBrand, `/explore/painted-churches/${church.slug}`),
              description: church.summary,
              address: {
                "@type": "PostalAddress",
                addressLocality: church.city,
                addressRegion: "TX",
                addressCountry: "US",
                ...(church.address ? { streetAddress: church.address } : {}),
              },
              ...(church.image ? { image: church.image.src } : {}),
            },
          })),
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${collectionUrl}#breadcrumbs`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl(texasDefinedBrand, "/") },
            { "@type": "ListItem", position: 2, name: "Explore", item: absoluteUrl(texasDefinedBrand, "/explore") },
            { "@type": "ListItem", position: 3, name: "Painted Churches", item: collectionUrl },
          ],
        },
      ],
    })],
  }),
});
