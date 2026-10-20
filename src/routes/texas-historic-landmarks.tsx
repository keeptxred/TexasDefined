import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { thcListingTotals, THC_RESEARCH_REVIEWED_ON } from "@/data/thc-recent-landmarks";
import { buildMeta, canonicalLink } from "@/lib/seo";

const path = "/texas-historic-landmarks";
const title = "Texas Historic Landmarks: Recent National Register Listings";
const description = "Source-linked 2025–2026 Texas National Register listings by county, designation month, and property type. Distinguish listed landmarks from nominations and plan respectful visits.";

export const Route = createFileRoute(path)({
  head: () => {
    const origin = `https://${texasDefinedBrand.identity.domain}`;
    const url = `${origin}${path}`;
    return {
      meta: buildMeta(texasDefinedBrand, { title, description, canonicalPath: path }),
      links: [canonicalLink(texasDefinedBrand, path)],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [{
            "@type": "CollectionPage",
            "@id": `${url}#page`,
            url,
            name: title,
            description,
            dateModified: THC_RESEARCH_REVIEWED_ON,
            isPartOf: { "@id": `${origin}/#website` },
            mainEntity: { "@id": `${url}#list` },
          }, {
            "@type": "ItemList",
            "@id": `${url}#list`,
            name: "Texas National Register listings in 2025 and 2026",
            numberOfItems: thcListingTotals.listed2025 + thcListingTotals.listed2026,
          }, {
            "@type": "BreadcrumbList",
            "@id": `${url}#breadcrumbs`,
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: origin },
              { "@type": "ListItem", position: 2, name: "Texas History", item: `${origin}/texas-history` },
              { "@type": "ListItem", position: 3, name: "Recent Historic Landmarks", item: url },
            ],
          }],
        }),
      }],
    };
  },
});
