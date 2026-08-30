import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-old-west";
const title = "Texas Old West: Ranches, Forts, Rodeo & Cowboy Heritage";
const description = "Explore Texas ranching, cattle trails, frontier forts, Buffalo Soldiers, Native history, rodeo, longhorns, dance halls and western heritage without reducing the story to cowboy mythology.";
const collectionItems = [
  ["Texas frontier forts road trip", "/article/texas-frontier-forts-road-trip"],
  ["Buffalo Soldiers in Texas", "/article/buffalo-soldiers-texas-frontier-guide"],
  ["The Red River War in Texas", "/article/texas-red-river-war-guide"],
  ["Official Texas Longhorn Herd", "/destination/official-texas-longhorn-herd"],
  ["Goodnight Ranch", "/destination/goodnight-ranch"],
  ["Fort Griffin", "/destination/fort-griffin"],
  ["Texas dance halls and honky-tonks", "/texas-dance-halls-honky-tonks"],
  ["Texas rodeo and western venues", "/sports-venues/rodeo-western"],
  ["Texas two-step", "/texas-two-step"],
] as const;

export const Route = createFileRoute("/texas-old-west")({
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
              name: "Texas Old West and western heritage guides",
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
                { "@type": "ListItem", position: 3, name: "Texas Old West", item: canonicalUrl },
              ],
            },
          ],
        }),
      }],
    };
  },
});
