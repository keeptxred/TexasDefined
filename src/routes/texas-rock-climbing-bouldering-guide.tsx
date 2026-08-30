import { createFileRoute } from "@tanstack/react-router";

import enchantedRock from "@/assets/enchanted-rock.jpg";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { absoluteUrl, buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-rock-climbing-bouldering-guide";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const climbingAreas = [
  { name: "Hueco Tanks State Park & Historic Site", region: "El Paso / Far West Texas" },
  { name: "Enchanted Rock State Natural Area", region: "Hill Country" },
  { name: "Lake Mineral Wells State Park & Trailway", region: "North Texas" },
  { name: "Milton Reimers Ranch Park", region: "Dripping Springs / Central Texas" },
] as const;

export const Route = createFileRoute(canonicalPath)({
  head: () => {
    const pageUrl = `${siteUrl}${canonicalPath}`;
    const itemListElement = climbingAreas.map((area, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: { "@type": "Place", name: area.name, containedInPlace: { "@type": "AdministrativeArea", name: area.region } },
    }));
    const collectionSchema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": `${pageUrl}#collection`,
          url: pageUrl,
          name: "Texas Rock Climbing & Bouldering Guide",
          description: "Plan Texas rock-climbing and bouldering trips around four public climbing areas, with official access, check-in, reservation, conservation and visitor-safety guidance.",
          image: absoluteUrl(texasDefinedBrand, enchantedRock),
          isPartOf: { "@id": `${siteUrl}/#website` },
          mainEntity: { "@type": "ItemList", "@id": `${pageUrl}#areas`, numberOfItems: itemListElement.length, itemListElement },
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}#breadcrumbs`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
            { "@type": "ListItem", position: 2, name: "Explore Texas", item: `${siteUrl}/explore` },
            { "@type": "ListItem", position: 3, name: "Outdoors & Wildlife", item: `${siteUrl}/explore/outdoors` },
            { "@type": "ListItem", position: 4, name: "Texas Rock Climbing & Bouldering Guide", item: pageUrl },
          ],
        },
      ],
    };
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: "Texas Rock Climbing & Bouldering: 4 Public Areas",
        description: "Plan Texas climbing trips to Hueco Tanks, Enchanted Rock, Lake Mineral Wells and Reimers Ranch with official access, check-in and conservation guidance.",
        image: enchantedRock,
        imageAlt: "Granite dome landscape at Enchanted Rock in the Texas Hill Country",
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(collectionSchema) }],
    };
  },
});
