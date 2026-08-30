import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-stargazing-guide";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const darkSkyParks = [
  { name: "Big Bend Ranch State Park", region: "Big Bend / Far West Texas" },
  { name: "Caprock Canyons State Park & Trailway", region: "Panhandle Plains" },
  { name: "Copper Breaks State Park", region: "Panhandle Plains" },
  { name: "Enchanted Rock State Natural Area", region: "Hill Country" },
  { name: "South Llano River State Park", region: "Hill Country" },
] as const;

export const Route = createFileRoute(canonicalPath)({
  head: () => {
    const pageUrl = `${siteUrl}${canonicalPath}`;
    const itemListElement = darkSkyParks.map((park, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: { "@type": "Place", name: park.name, containedInPlace: { "@type": "AdministrativeArea", name: park.region } },
    }));
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": `${pageUrl}#collection`,
          url: pageUrl,
          name: "Texas Stargazing Guide",
          description: "Plan stargazing trips to Texas's five International Dark Sky Parks around Bortle ratings, moon phase, weather, park hours, access and night-sky stewardship.",
          isPartOf: { "@id": `${siteUrl}/#website` },
          mainEntity: { "@type": "ItemList", "@id": `${pageUrl}#dark-sky-parks`, numberOfItems: itemListElement.length, itemListElement },
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}#breadcrumbs`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
            { "@type": "ListItem", position: 2, name: "Explore Texas", item: `${siteUrl}/explore` },
            { "@type": "ListItem", position: 3, name: "Outdoors & Wildlife", item: `${siteUrl}/explore/outdoors` },
            { "@type": "ListItem", position: 4, name: "Texas Stargazing Guide", item: pageUrl },
          ],
        },
      ],
    };

    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: "Texas Stargazing: 5 International Dark Sky Parks",
        description: "Plan Texas stargazing trips to Big Bend Ranch, Caprock Canyons, Copper Breaks, Enchanted Rock and South Llano River with current TPWD guidance.",
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(schema) }],
    };
  },
});
