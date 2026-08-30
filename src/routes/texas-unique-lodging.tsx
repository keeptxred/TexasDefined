import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-unique-lodging";
const description = "Plan distinctive Texas stays at historic park lodges, CCC motor courts, cabins and canyon lodging, with current first-party reservation and access guidance.";
const stays = [
  ["Indian Lodge in the Davis Mountains", "/explore/state-parks"],
  ["San Solomon Motor Courts at Balmorhea", "/explore/state-parks"],
  ["Bastrop State Park CCC cabins", "/explore/state-parks"],
  ["Caddo Lake State Park historic cabins", "/explore/state-parks"],
  ["Palo Duro Canyon cabins and glamping", "/explore/state-parks"],
] as const;

export const Route = createFileRoute(canonicalPath)({
  head: () => {
    const origin = `https://${texasDefinedBrand.identity.domain}`;
    const pageUrl = `${origin}${canonicalPath}`;
    return {
      meta: buildMeta(texasDefinedBrand, {
        title: "Unique Places to Stay in Texas: Park Lodges & Historic Cabins",
        description,
        canonicalPath,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Article",
              "@id": `${pageUrl}#article`,
              headline: "Unique Places to Stay in Texas: Park Lodges & Historic Cabins",
              description,
              url: pageUrl,
              dateModified: "2026-08-30",
              articleSection: "Texas Travel & Lodging",
              isPartOf: { "@id": `${origin}/#website` },
              mainEntity: { "@id": `${pageUrl}#stays` },
              breadcrumb: { "@id": `${pageUrl}#breadcrumbs` },
            },
            {
              "@type": "ItemList",
              "@id": `${pageUrl}#stays`,
              name: "Distinctive public and historic lodging in Texas",
              numberOfItems: stays.length,
              itemListElement: stays.map(([name, path], index) => ({
                "@type": "ListItem",
                position: index + 1,
                name,
                url: `${origin}${path}`,
              })),
            },
            {
              "@type": "BreadcrumbList",
              "@id": `${pageUrl}#breadcrumbs`,
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: origin },
                { "@type": "ListItem", position: 2, name: "Explore Texas", item: `${origin}/explore` },
                { "@type": "ListItem", position: 3, name: "Unique Lodging", item: pageUrl },
              ],
            },
          ],
        }),
      }],
    };
  },
});
