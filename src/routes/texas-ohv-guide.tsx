import { createFileRoute } from "@tanstack/react-router";

import bigBend from "@/assets/big-bend.jpg";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { absoluteUrl, buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-ohv-guide";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const ohvAreas = [
  { name: "Eisenhower State Park OHV Trails", region: "North Texas / Lake Texoma" },
  { name: "Barnwell Mountain Recreation Area", region: "East Texas / Gilmer" },
  { name: "Sam Houston National Forest Motorized Trails", region: "Piney Woods / Houston region" },
  { name: "Lake Meredith National Recreation Area OHV Areas", region: "Texas Panhandle" },
  { name: "Escondido Draw Recreation Area", region: "West Texas / Ozona" },
] as const;

export const Route = createFileRoute(canonicalPath)({
  head: () => {
    const pageUrl = `${siteUrl}${canonicalPath}`;
    const itemListElement = ohvAreas.map((area, index) => ({
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
          name: "Texas OHV Guide",
          description: "Plan legal off-highway vehicle trips at five Texas riding areas with current decal, vehicle-class, land-manager and closure guidance.",
          image: absoluteUrl(texasDefinedBrand, bigBend),
          isPartOf: { "@id": `${siteUrl}/#website` },
          mainEntity: {
            "@type": "ItemList",
            "@id": `${pageUrl}#ohv-areas`,
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
            { "@type": "ListItem", position: 4, name: "Texas OHV Guide", item: pageUrl },
          ],
        },
      ],
    };

    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: "Texas OHV Guide: 5 Legal Riding Areas & Decal Rules",
        description: "Find five legal Texas OHV riding areas and plan around decals, allowed vehicle classes, land-manager maps, permits, closures and current rules.",
        image: bigBend,
        imageAlt: "Rugged Texas public-land landscape used as a general outdoor travel image",
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(schema) }],
    };
  },
});
