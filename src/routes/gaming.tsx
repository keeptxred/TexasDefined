import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/gaming";
const title = "Gaming & Esports in Texas — Industry, Studios, Esports & Online Gaming";
const description = "Explore Texas gaming and esports: video-game studios, Austin and DFW clusters, college esports, careers, events, data centers, routing and online-gaming latency.";
const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);

export const Route = createFileRoute(canonicalPath)({
  // Retain full server-rendered metadata; data only loads when this route matches.
  loader: async () => {
    const { GAMING_PAGES, GAMING_REVIEWED_AT } = await import("@/data/gaming");
    return {
      pages: GAMING_PAGES.map(({ shortTitle, slug }) => ({ shortTitle, slug })),
      reviewedAt: GAMING_REVIEWED_AT,
    };
  },
  head: ({ loaderData }) => ({
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
          dateModified: loaderData?.reviewedAt,
          isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` },
          publisher: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#organization` },
          mainEntity: { "@id": `${pageUrl}#topics` },
          breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        },
        {
          "@type": "ItemList",
          "@id": `${pageUrl}#topics`,
          name: "Texas gaming and esports authority topics",
          numberOfItems: loaderData?.pages.length ?? 0,
          itemListElement: (loaderData?.pages ?? []).map((page, index) => ({
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
