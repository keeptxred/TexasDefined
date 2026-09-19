import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-gulf-seafood-guide";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const title = "Texas Gulf Seafood Destinations";
const description = "A source-checked guide to Gulf seafood travel through Galveston and Baffin Bay, using verified institutions to connect restaurant history with the coast, bays and working-waterfront culture.";

export const Route = createFileRoute(canonicalPath)({
  loader: async () => {
    const contentPath = "/content/food-guides/texas-gulf-seafood-guide.html";
    const authorityHtml = await fetch(import.meta.env.SSR ? `${siteUrl}${contentPath}` : contentPath)
      .then((response) => response.ok ? response.text() : null)
      .catch(() => null);
    return { eyebrow: "Texas Gulf Coast foodways", title, description, authorityHtml };
  },
  head: () => {
    const url = `${siteUrl}${canonicalPath}`;
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title, description, type: "article" }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "Article", "@id": `${url}#article`, url, headline: title, description, dateModified: "2026-09-18", isPartOf: { "@id": `${siteUrl}/#website` } },
          { "@type": "BreadcrumbList", "@id": `${url}#breadcrumbs`, itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
            { "@type": "ListItem", position: 2, name: "Food & BBQ", item: `${siteUrl}/explore/food-bbq` },
            { "@type": "ListItem", position: 3, name: "Texas Gulf Seafood Destinations", item: url },
          ] },
        ],
      }) }],
    };
  },
});
