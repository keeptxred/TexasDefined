import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { absoluteUrl, buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-mountain-biking-guide";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const heroImage = {
  src: "/images/state-parks/franklin-mountains-state-park.jpg",
  width: 1600,
  height: 1067,
} as const;
const trailSystems = [
  { name: "Franklin Mountains State Park", region: "El Paso / Far West Texas" },
  { name: "Big Bend Ranch State Park", region: "Big Bend / Far West Texas" },
  { name: "Palo Duro Canyon State Park", region: "Texas Panhandle" },
  { name: "Hill Country State Natural Area", region: "Hill Country" },
  { name: "Tyler State Park", region: "East Texas" },
] as const;

export const Route = createFileRoute(canonicalPath)({
  head: () => {
    const pageUrl = `${siteUrl}${canonicalPath}`;
    const itemListElement = trailSystems.map((area, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: { "@type": "Place", name: area.name, containedInPlace: { "@type": "AdministrativeArea", name: area.region } },
    }));
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": `${pageUrl}#collection`,
          url: pageUrl,
          name: "Mountain Biking in Texas: 5 Public Trail Systems & Where to Ride",
          description: "Compare five Texas mountain-biking trail systems and official maps.",
          image: absoluteUrl(texasDefinedBrand, heroImage.src),
          isPartOf: { "@id": `${siteUrl}/#website` },
          mainEntity: { "@type": "ItemList", "@id": `${pageUrl}#trail-systems`, numberOfItems: itemListElement.length, itemListElement },
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}#breadcrumbs`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
            { "@type": "ListItem", position: 2, name: "Explore Texas", item: `${siteUrl}/explore` },
            { "@type": "ListItem", position: 3, name: "Outdoors & Wildlife", item: `${siteUrl}/explore/outdoors` },
            { "@type": "ListItem", position: 4, name: "Texas Mountain Biking", item: pageUrl },
          ],
        },
      ],
    };
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: "Texas Mountain Biking: 5 Trail Systems, Maps & Rides",
        description: "Compare Franklin Mountains, Big Bend Ranch, Palo Duro, Hill Country and Tyler State Park with trail mileage, terrain, route ideas and official maps.",
        image: heroImage.src,
        imageAlt: "Franklin Mountains State Park above El Paso, a major Texas public mountain-biking landscape",
        imageWidth: heroImage.width,
        imageHeight: heroImage.height,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(schema) }],
    };
  },
});
