import { createFileRoute } from "@tanstack/react-router";

import bigBend from "@/assets/big-bend.jpg";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { absoluteUrl, buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-horseback-riding-guide";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const ridingAreas = [
  { name: "Big Bend Ranch State Park", region: "Big Bend / Far West Texas" },
  { name: "Hill Country State Natural Area", region: "Hill Country" },
  { name: "Palo Duro Canyon State Park", region: "Texas Panhandle" },
  { name: "Caprock Canyons State Park & Trailway", region: "Texas Panhandle" },
  { name: "Dinosaur Valley State Park", region: "North-Central Texas" },
] as const;

export const Route = createFileRoute(canonicalPath)({
  head: () => {
    const pageUrl = `${siteUrl}${canonicalPath}`;
    const itemListElement = ridingAreas.map((area, index) => ({
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
          name: "Texas Horseback Riding Guide",
          description: "Plan horseback-riding trips across five Texas public-land destinations with official Coggins, permit, trail, camping and access guidance.",
          image: absoluteUrl(texasDefinedBrand, bigBend),
          isPartOf: { "@id": `${siteUrl}/#website` },
          mainEntity: { "@type": "ItemList", "@id": `${pageUrl}#riding-areas`, numberOfItems: itemListElement.length, itemListElement },
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}#breadcrumbs`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
            { "@type": "ListItem", position: 2, name: "Explore Texas", item: `${siteUrl}/explore` },
            { "@type": "ListItem", position: 3, name: "Outdoors & Wildlife", item: `${siteUrl}/explore/outdoors` },
            { "@type": "ListItem", position: 4, name: "Texas Horseback Riding Guide", item: pageUrl },
          ],
        },
      ],
    };
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: "Texas Horseback Riding: 5 Public-Land Destinations",
        description: "Plan Texas horseback-riding trips at Big Bend Ranch, Hill Country SNA, Palo Duro, Caprock Canyons and Dinosaur Valley with official access guidance.",
        image: bigBend,
        imageAlt: "Rugged West Texas public-land landscape associated with horseback riding trips",
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(schema) }],
    };
  },
});
