import { createFileRoute } from "@tanstack/react-router";

import bigBend from "@/assets/big-bend.jpg";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { absoluteUrl, buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-mountain-biking-guide";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
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
          name: "Texas Mountain Biking Guide",
          description: "Plan Texas mountain-biking trips around five public trail systems, with official trail maps, shared-use rules, closures, heat and land-manager guidance.",
          image: absoluteUrl(texasDefinedBrand, bigBend),
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
            { "@type": "ListItem", position: 4, name: "Texas Mountain Biking Guide", item: pageUrl },
          ],
        },
      ],
    };
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: "Texas Mountain Biking: 5 Public Trail Systems",
        description: "Plan Texas mountain-biking trips at Franklin Mountains, Big Bend Ranch, Palo Duro Canyon, Hill Country State Natural Area and Tyler State Park.",
        image: bigBend,
        imageAlt: "Rugged West Texas landscape representing public mountain-biking country",
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(schema) }],
    };
  },
});
