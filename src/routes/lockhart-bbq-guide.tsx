import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/lockhart-bbq-guide";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const title = "Lockhart BBQ Guide: Kreuz, Black's & Smitty's";
const description = "A source-checked guide to Lockhart barbecue history, the three verified legacy smokehouses in town, and how to plan a food-focused visit without turning the trip into a ranking.";

export const Route = createFileRoute(canonicalPath)({
  loader: async () => {
    const contentPath = "/content/food-guides/lockhart-bbq-guide.html";
    const authorityHtml = await fetch(import.meta.env.SSR ? `${siteUrl}${contentPath}` : contentPath)
      .then((response) => response.ok ? response.text() : null)
      .catch(() => null);
    return { eyebrow: "Central Texas barbecue town", title, description, authorityHtml };
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
            { "@type": "ListItem", position: 3, name: "Lockhart BBQ Guide", item: url },
          ] },
        ],
      }) }],
    };
  },
});
