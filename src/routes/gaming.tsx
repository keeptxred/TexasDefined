import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { GAMING_PAGES, GAMING_REVIEWED_AT } from "@/data/gaming";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/gaming";
const title = "Gaming & Esports in Texas — Industry, Studios, Esports & Online Gaming";
const description = "Explore Texas gaming and esports: video-game studios, Austin and DFW clusters, college esports, careers, events, data centers, routing and online-gaming latency.";
const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { title: title, description, canonicalPath }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": `${pageUrl}#page`,
          url: pageUrl,
          name: title,
          description,
          dateModified: GAMING_REVIEWED_AT,
          isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` },
          publisher: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#organization` },
          mainEntity: { "@id": `${pageUrl}#topics` },
          breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        },
        {
          "@type": "ItemList",
          "@id": `${pageUrl}#topics`,
          name: "Texas gaming and esports authority topics",
          numberOfItems: GAMING_PAGES.length,
          itemListElement: GAMING_PAGES.map((page, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: page.shortTitle,
            url: absoluteUrl(texasDefinedBrand, `/gaming/${page.slug}`),
          })),
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl(texasDefinedBrand, "/") },
            { "@type": "ListItem", position: 2, name: "Gaming & Esports in Texas", item: pageUrl },
          ],
        },
      ],
    })],
  }),
});
