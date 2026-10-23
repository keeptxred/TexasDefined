import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const path = "/waco-ghost-tours";
const description = "Compare Waco guided ghost walks and self-guided haunted audio routes, including the Dr Pepper Museum meeting point, Magnolia Market and Suspension Bridge, with direct booking links.";
const sourceCheckedAt = "2026-10-20";
export const Route = createFileRoute("/waco-ghost-tours")({
  head: () => {
    const url = absoluteUrl(texasDefinedBrand, path);
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath: path,
        title: "Waco Ghost Tours: Guided Walk vs. Self-Guided Audio Tour",
        description,
      }),
      links: [canonicalLink(texasDefinedBrand, path)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": ["CollectionPage", "WebPage"], "@id": `${url}#page`, url, name: "Waco Ghost Tours: Guided vs. Self-Guided", description, dateModified: sourceCheckedAt },
          { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "TexasDefined", item: absoluteUrl(texasDefinedBrand, "/") },
            { "@type": "ListItem", position: 2, name: "Waco ghost tours", item: url },
          ] },
        ],
      })],
    };
  },
});
