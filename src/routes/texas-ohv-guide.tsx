import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const ohvHeroUrl = "https://www.nps.gov/lamr/planyourvisit/images/Rosita-16-wp.jpg?autorotate=false&maxwidth=1300";
const canonicalPath = "/texas-ohv-guide";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const ohvAreas = [
  { name: "Eisenhower State Park OHV Trails" },
  { name: "Barnwell Mountain Recreation Area" },
  { name: "Sam Houston National Forest Motorized Trails" },
  { name: "Lake Meredith National Recreation Area OHV Areas" },
  { name: "Escondido Draw Recreation Area" },
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
          image: ohvHeroUrl,
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
        description: "Compare five legal Texas OHV areas with 50-inch trail limits, Sam Houston passes, NPS permits, decal rules, closures and access directions.",
        image: ohvHeroUrl,
        imageAlt: "Real designated off-road route at Rosita Flats, Lake Meredith, Texas",
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(schema) }],
    };
  },
});
