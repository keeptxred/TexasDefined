import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { absoluteUrl, buildMeta, canonicalLink } from "@/lib/seo";
import { editorialImageSrc } from "@/lib/editorial-image-delivery";

const canonicalPath = "/texas-horseback-riding-guide";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const equestrianHero = {
  url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/65/20231023-FS_PJK_0003_%2853298857455%29.jpg/1280px-20231023-FS_PJK_0003_%2853298857455%29.jpg",
  source: "https://commons.wikimedia.org/wiki/File:20231023-FS_PJK_0003_(53298857455).jpg",
  license: "https://creativecommons.org/publicdomain/mark/1.0/",
  creator: "Preston Keres",
  width: 1280,
  height: 720,
  alt: "Riders on a Sam Houston National Forest trail, Texas",
} as const;
const deliveredHeroUrl = absoluteUrl(texasDefinedBrand, editorialImageSrc(equestrianHero.url));
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
          description: "Five Texas state-park horse trails, access, permits and facilities.",
          image: {
            "@type": "ImageObject",
            url: deliveredHeroUrl,
            contentUrl: deliveredHeroUrl,
            width: equestrianHero.width,
            height: equestrianHero.height,
            caption: equestrianHero.alt,
            creator: { "@type": "Person", name: equestrianHero.creator },
            creditText: "USFS / Preston Keres",
            copyrightNotice: "U.S. public domain",
            license: equestrianHero.license,
            acquireLicensePage: equestrianHero.source,
          },
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
        description: "Find Texas guided horseback rides, family options and five public riding destinations with trailer access, Coggins rules and horse campsites.",
        image: deliveredHeroUrl,
        imageAlt: equestrianHero.alt,
        imageWidth: equestrianHero.width,
        imageHeight: equestrianHero.height,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(schema) }],
    };
  },
});
