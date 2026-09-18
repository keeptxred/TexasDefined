import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-kolache-guide";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const title = "Texas Kolache & Czech Bakery Guide";
const description = "A source-checked Texas guide to Czech baking, verified bakery stops in West and Ellinger, and the road-trip geography that turned kolaches into a statewide travel tradition.";

export const Route = createFileRoute(canonicalPath)({
  loader: async () => {
    const contentPath = "/content/food-guides/texas-kolache-guide.html";
    const authorityHtml = await fetch(import.meta.env.SSR ? `${siteUrl}${contentPath}` : contentPath)
      .then((response) => response.ok ? response.text() : null)
      .catch(() => null);
    return { eyebrow: "Czech-Texan foodways", title, description, authorityHtml };
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
            { "@type": "ListItem", position: 3, name: "Texas Kolache & Czech Bakery Guide", item: url },
          ] },
        ],
      }) }],
    };
  },
});
