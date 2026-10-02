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
  { name: "Franklin Mountains State Park", region: "El Paso / Far West Texas", path: "/destination/franklin-mountains-state-park", description: "More than 100 miles of rugged Chihuahuan Desert trail beside El Paso." },
  { name: "Big Bend Ranch State Park", region: "Big Bend / Far West Texas", path: "/destination/big-bend-ranch-state-park", description: "A remote 238-mile multiuse network with Contrabando, Encino and Fresno Canyon riding resources." },
  { name: "Palo Duro Canyon State Park", region: "Texas Panhandle", path: "/destination/palo-duro-canyon-state-park", description: "Canyon riding anchored by the 3.5-mile mountain-bike-only Capitol Peak loop." },
  { name: "Hill Country State Natural Area", region: "Hill Country", path: "/destination/hill-country-state-natural-area", description: "Forty miles of shared-use trail through rocky hills, creek bottoms and plateaus near Bandera." },
  { name: "Tyler State Park", region: "East Texas", path: "/destination/tyler-state-park", description: "A compact 13-mile forest trail network with directional multiuse loops." },
] as const;

export const Route = createFileRoute(canonicalPath)({
  head: () => {
    const pageUrl = `${siteUrl}${canonicalPath}`;
    const itemListElement = trailSystems.map((area, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Place",
        name: area.name,
        url: `${siteUrl}${area.path}`,
        description: area.description,
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
          name: "Mountain Biking in Texas: 5 Public Trail Systems & Where to Ride",
          description: "Compare five Texas public mountain-biking systems with trail mileage, terrain, route ideas, official maps and practical trip-planning links.",
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
