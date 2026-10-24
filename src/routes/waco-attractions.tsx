import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { WACO_VIATOR_ATTRACTIONS } from "@/data/waco-viator-attraction-links";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const path = "/waco-attractions";
const description = "Seven independent Waco attraction authority guides: Dr Pepper Museum, Cottonland Castle, Suspension Bridge, Cameron Park, Texas Ranger Hall of Fame, McLane Stadium and Cameron Park Zoo.";
export const Route = createFileRoute("/waco-attractions")({
  head: () => {
    const url = absoluteUrl(texasDefinedBrand, path);
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath: path,
        title: "Seven Waco Attractions: Full Visitor Guides and Tours",
        description,
      }),
      links: [canonicalLink(texasDefinedBrand, path)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "CollectionPage", "@id": `${url}#page`, url, name: "Seven Waco attractions: independent visitor guides", description,
            mainEntity: { "@id": `${url}#guides` }, dateModified: "2026-10-20" },
          { "@type": "ItemList", "@id": `${url}#guides`, name: "Waco attraction authority guides", numberOfItems: WACO_VIATOR_ATTRACTIONS.length,
            itemListElement: WACO_VIATOR_ATTRACTIONS.map((a, i) => ({ "@type": "ListItem", position: i+1, name: a.name, url: absoluteUrl(texasDefinedBrand, a.href) })) },
          { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "TexasDefined", item: absoluteUrl(texasDefinedBrand, "/") },
            { "@type": "ListItem", position: 2, name: "Waco attractions", item: url },
          ] },
        ],
      })],
    };
  },
});
