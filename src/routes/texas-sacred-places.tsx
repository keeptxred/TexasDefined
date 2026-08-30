import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-sacred-places";
const title = "Sacred Places in Texas: Missions, Painted Churches & Heritage";
const description = "Visit Texas missions, Painted Churches, historic religious communities and memorial landscapes with context for living worship, sacred spaces, visitor access and respectful travel.";
const collectionItems = [
  ["Painted Churches of Texas", "/explore/painted-churches"],
  ["Painted Churches cultural heritage", "/explore/painted-churches/heritage"],
  ["Painted Churches routes", "/explore/painted-churches/routes"],
  ["Texas borderlands historic sites", "/article/texas-borderlands-historic-sites-guide"],
  ["Old Socorro Mission", "/destination/old-socorro-mission"],
  ["Mission Dolores", "/destination/mission-dolores"],
  ["German and Czech Texas towns", "/german-czech-texas-towns"],
  ["Texas national cemeteries", "/article/texas-national-cemeteries-guide"],
  ["Texas History", "/texas-history"],
] as const;

export const Route = createFileRoute("/texas-sacred-places")({
  head: () => {
    const origin = `https://${texasDefinedBrand.identity.domain}`;
    const canonicalUrl = `${origin}${canonicalPath}`;
    return {
      meta: buildMeta(texasDefinedBrand, { title, description, canonicalPath }),
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
              name: "Texas sacred heritage and memorial landscape guides",
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
                { "@type": "ListItem", position: 3, name: "Sacred Places in Texas", item: canonicalUrl },
              ],
            },
          ],
        }),
      }],
    };
  },
});
