import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { TEXAS_MUSIC_DESCRIPTION, TEXAS_MUSIC_TRADITIONS } from "@/data/texas-music";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-music";
const title = "Texas Music: History, Roots, Genres, Artists & Places";

export const Route = createFileRoute("/texas-music")({
  head: () => {
    const origin = `https://${texasDefinedBrand.identity.domain}`;
    const canonicalUrl = `${origin}${canonicalPath}`;

    return {
      meta: buildMeta(texasDefinedBrand, {
        title: title,
        description: TEXAS_MUSIC_DESCRIPTION,
        canonicalPath,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "@id": `${canonicalUrl}#collection`,
              name: "Texas Music",
              description: TEXAS_MUSIC_DESCRIPTION,
              url: canonicalUrl,
              about: [
                { "@type": "Place", name: "Texas" },
                { "@type": "Thing", name: "Texas music history" },
              ],
              publisher: { "@id": `${origin}/#organization` },
              dateModified: "2026-08-25",
              mainEntity: { "@id": `${canonicalUrl}#traditions` },
            },
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              "@id": `${canonicalUrl}#traditions`,
              name: "Texas music traditions",
              numberOfItems: TEXAS_MUSIC_TRADITIONS.length,
              itemListElement: TEXAS_MUSIC_TRADITIONS.map((tradition, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: tradition.label,
                url: `${canonicalUrl}#${tradition.id}`,
              })),
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: origin },
                { "@type": "ListItem", position: 2, name: "Texas Music", item: canonicalUrl },
              ],
            },
          ]),
        },
      ],
    };
  },
});
