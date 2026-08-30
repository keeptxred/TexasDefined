import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-science-technology-industry";
const title = "Texas Science, Space & Industry: Museums, Engineering and Innovation";
const description = "Plan Texas trips around spaceflight, astronomy, aviation, railroads, maritime history, energy and industrial heritage with official visitor sources and connected Texas Defined guides.";
const collectionItems = [
  ["Space Center Houston and major attractions", "/explore/top-attractions"],
  ["Texas stargazing guide", "/texas-stargazing-guide"],
  ["San Antonio military aviation history", "/article/san-antonio-military-aviation-history"],
  ["Texas World War I history", "/article/texas-world-war-i-history-guide"],
  ["Texas World War II bases and training", "/article/texas-world-war-ii-bases-pow-camps"],
  ["Texas historic sites and museums", "/explore/historic-sites"],
  ["Texas cities and towns", "/browse/cities"],
  ["Texas Trip Planner", "/explore/trip-planner"],
] as const;

export const Route = createFileRoute("/texas-science-technology-industry")({
  head: () => {
    const origin = `https://${texasDefinedBrand.identity.domain}`;
    const canonicalUrl = `${origin}${canonicalPath}`;
    return {
      meta: buildMeta(texasDefinedBrand, { title: title, description, canonicalPath }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              "@id": `${canonicalUrl}#page`,
              name: title,
              description,
              url: canonicalUrl,
              isPartOf: { "@id": `${origin}/#website` },
              mainEntity: { "@id": `${canonicalUrl}#items` },
              breadcrumb: { "@id": `${canonicalUrl}#breadcrumbs` },
              dateModified: "2026-08-30",
            },
            {
              "@type": "ItemList",
              "@id": `${canonicalUrl}#items`,
              name: "Texas science, technology and industry visitor guides",
              numberOfItems: collectionItems.length,
              itemListElement: collectionItems.map(([name, path], index) => ({
                "@type": "ListItem",
                position: index + 1,
                name,
                url: `${origin}${path}`,
              })),
            },
            {
              "@type": "BreadcrumbList",
              "@id": `${canonicalUrl}#breadcrumbs`,
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: origin },
                { "@type": "ListItem", position: 2, name: "Explore Texas", item: `${origin}/explore` },
                { "@type": "ListItem", position: 3, name: "Science, Space & Industry", item: canonicalUrl },
              ],
            },
          ],
        }),
      }],
    };
  },
});
