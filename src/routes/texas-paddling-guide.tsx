import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-paddling-guide";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const paddlingTrails = [
  { name: "Lady Bird Lake Paddling Trail", region: "Austin / Hill Country" },
  { name: "Buffalo Bayou Paddling Trail", region: "Houston / Gulf Coast" },
  { name: "Bosque Bluffs & Brazos Bridges Paddling Trails", region: "Waco / Prairies and Lakes" },
  { name: "Hell's Half Acre Paddling Trail", region: "Caddo Lake / Piney Woods" },
  { name: "Lighthouse Lakes Paddling Trail", region: "Aransas Pass / Gulf Coast" },
] as const;

export const Route = createFileRoute(canonicalPath)({
  head: () => {
    const pageUrl = `${siteUrl}${canonicalPath}`;
    const itemListElement = paddlingTrails.map((trail, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Place",
        name: trail.name,
        containedInPlace: { "@type": "AdministrativeArea", name: trail.region },
      },
    }));
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": `${pageUrl}#collection`,
          url: pageUrl,
          name: "Texas Paddling Guide",
          description: "Plan five official Texas paddling trails around access points, route length, current water and weather conditions, private-property boundaries and land-manager guidance.",
          isPartOf: { "@id": `${siteUrl}/#website` },
          mainEntity: {
            "@type": "ItemList",
            "@id": `${pageUrl}#paddling-trails`,
            numberOfItems: itemListElement.length,
            itemListElement,
          },
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}#breadcrumbs`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
            { "@type": "ListItem", position: 2, name: "Explore Texas", item: `${siteUrl}/explore` },
            { "@type": "ListItem", position: 3, name: "Lakes & Rivers", item: `${siteUrl}/explore/lakes-rivers` },
            { "@type": "ListItem", position: 4, name: "Texas Paddling Guide", item: pageUrl },
          ],
        },
      ],
    };

    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: "Texas Paddling Guide: 5 Official Trails to Plan",
        description: "Plan five official Texas paddling trails from Austin and Houston to Waco, Caddo Lake and Lighthouse Lakes with current TPWD access guidance.",
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(schema) }],
    };
  },
});
