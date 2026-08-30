import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-tailgating-guide";
const title = "Texas Tailgating Guide: College Football, Stadiums & Game Day";
const description = "Plan Texas tailgating around official parking, campus rules, lot access, kickoff timing and venue-specific traditions at major college and pro football destinations.";
const venues = [
  ["Texas A&M / Kyle Field", "/sports-venues/college-station"],
  ["Texas / DKR-Texas Memorial Stadium", "/sports-venues/austin-central-texas"],
  ["Texas Tech / Galaxy Stadium", "/sports-venues/lubbock"],
  ["Dallas Cowboys / AT&T Stadium", "/sports-venues/dallas-fort-worth"],
  ["Texas college sports venues", "/sports-venues/college-sports"],
] as const;

export const Route = createFileRoute(canonicalPath)({
  head: () => {
    const origin = `https://${texasDefinedBrand.identity.domain}`;
    const pageUrl = `${origin}${canonicalPath}`;
    return {
      meta: buildMeta(texasDefinedBrand, { title, description, canonicalPath }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Article",
              "@id": `${pageUrl}#article`,
              headline: title,
              description,
              url: pageUrl,
              dateModified: "2026-08-30",
              articleSection: "Texas Sports & Game Day",
              isPartOf: { "@id": `${origin}/#website` },
              mainEntity: { "@id": `${pageUrl}#venues` },
              breadcrumb: { "@id": `${pageUrl}#breadcrumbs` },
            },
            {
              "@type": "ItemList",
              "@id": `${pageUrl}#venues`,
              name: "Texas tailgating and game-day venue planning",
              numberOfItems: venues.length,
              itemListElement: venues.map(([name, path], index) => ({ "@type": "ListItem", position: index + 1, name, url: `${origin}${path}` })),
            },
            {
              "@type": "BreadcrumbList",
              "@id": `${pageUrl}#breadcrumbs`,
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: origin },
                { "@type": "ListItem", position: 2, name: "Texas Sports", item: `${origin}/sports` },
                { "@type": "ListItem", position: 3, name: "Tailgating Guide", item: pageUrl },
              ],
            },
          ],
        }),
      }],
    };
  },
});
