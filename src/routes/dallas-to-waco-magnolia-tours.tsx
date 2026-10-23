import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const path = "/dallas-to-waco-magnolia-tours";
const description = "Plan a guided Dallas-to-Waco Magnolia Market day trip, including the actual Dallas pickup, Dr Pepper Museum admission exclusions, Cottonland Castle access and direct Viator booking links.";

export const Route = createFileRoute("/dallas-to-waco-magnolia-tours")({
  head: () => {
    const url = absoluteUrl(texasDefinedBrand, path);
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath: path,
        title: "Dallas to Waco & Magnolia Market: Guided Day Trips Compared",
        description,
      }),
      links: [canonicalLink(texasDefinedBrand, path)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": ["CollectionPage", "WebPage"], "@id": `${url}#page`, url, name: "Dallas to Waco Magnolia tours: booking and itinerary guide", description, dateModified: "2026-10-20" },
          { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "TexasDefined", item: absoluteUrl(texasDefinedBrand, "/") },
            { "@type": "ListItem", position: 2, name: "Dallas to Waco tours", item: url },
          ] },
        ],
      })],
    };
  },
});
