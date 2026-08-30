import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-wildlife-watching-guide";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const wildlifeRegions = [
  { name: "Far West Texas Wildlife Trail", region: "Far West Texas" },
  { name: "Upper Texas Coast Wildlife Trail", region: "Upper Gulf Coast" },
  { name: "Heart of Texas West Wildlife Trail", region: "Hill Country / Edwards Plateau" },
  { name: "Panhandle Plains Wildlife Trail", region: "Panhandle and Plains" },
  { name: "Prairies and Pineywoods East Wildlife Trail", region: "East Texas" },
] as const;

export const Route = createFileRoute(canonicalPath)({
  head: () => {
    const pageUrl = `${siteUrl}${canonicalPath}`;
    const itemListElement = wildlifeRegions.map((area, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Place",
        name: area.name,
        containedInPlace: { "@type": "AdministrativeArea", name: area.region },
      },
    }));
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": `${pageUrl}#collection`,
          url: pageUrl,
          name: "Texas Wildlife Watching Guide",
          description: "Plan wildlife-watching trips across five Great Texas Wildlife Trail regions with official access, habitat, seasonal and safe-viewing guidance.",
          isPartOf: { "@id": `${siteUrl}/#website` },
          mainEntity: {
            "@type": "ItemList",
            "@id": `${pageUrl}#wildlife-regions`,
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
            { "@type": "ListItem", position: 3, name: "Outdoors & Wildlife", item: `${siteUrl}/explore/outdoors` },
            { "@type": "ListItem", position: 4, name: "Texas Wildlife Watching Guide", item: pageUrl },
          ],
        },
      ],
    };

    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: "Texas Wildlife Watching: 5 Regions to Explore",
        description: "Plan wildlife-watching trips across Far West Texas, the Upper Coast, Hill Country, Panhandle Plains and Piney Woods with official TPWD trail guidance.",
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(schema) }],
    };
  },
});
