import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { TEXAS_GAMING_PAGES, TEXAS_GAMING_SLUGS } from "@/data/texas-gaming-authority";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/gaming";
const description = "Explore gaming and esports in Texas: game studios, careers, college esports, events, Dallas network infrastructure, online gaming latency and regional development clusters.";
const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { title: "Gaming & Esports in Texas — Studios, Careers, Events & Infrastructure", description, canonicalPath }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "CollectionPage", "@id": `${pageUrl}#page`, url: pageUrl, name: "Gaming & Esports in Texas", description, dateModified: "2026-09-24", isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` }, publisher: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#organization` }, mainEntity: { "@id": `${pageUrl}#guides` } },
        { "@type": "ItemList", "@id": `${pageUrl}#guides`, name: "Texas gaming and esports authority guides", numberOfItems: TEXAS_GAMING_SLUGS.length, itemListElement: TEXAS_GAMING_SLUGS.map((slug, index) => ({ "@type": "ListItem", position: index + 1, name: TEXAS_GAMING_PAGES[slug].h1, url: absoluteUrl(texasDefinedBrand, `/gaming/${slug}`) })) },
        { "@type": "BreadcrumbList", "@id": `${pageUrl}#breadcrumb`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl(texasDefinedBrand, "/") }, { "@type": "ListItem", position: 2, name: "Gaming & Esports", item: pageUrl }] },
      ],
    })],
  }),
});
