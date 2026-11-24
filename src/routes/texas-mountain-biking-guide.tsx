import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { absoluteUrl, buildMeta, canonicalLink } from "@/lib/seo";
import { editorialImageSrc } from "@/lib/editorial-image-delivery";

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
          author: { "@type": "Organization", name: "Texas Defined Travel & Outdoors Desk", url: `${siteUrl}/authors/a-dell` },
          publisher: { "@type": "Organization", name: "Texas Defined", url: siteUrl },
          "@id": `${pageUrl}#collection`,
          url: pageUrl,
          name: "Mountain Biking in Texas: 5 Public Trail Systems & Where to Ride",
          description: "Compare five Texas mountain-biking trail systems and official maps.",
          image: absoluteUrl(texasDefinedBrand, heroImage.src),
          associatedMedia: { "@id": `${pageUrl}#location-photo` },
          isPartOf: { "@id": `${siteUrl}/#website` },
          mainEntity: { "@type": "ItemList", "@id": `${pageUrl}#trail-systems`, numberOfItems: itemListElement.length, itemListElement },
        },
        {
          "@type": "ImageObject",
          "@id": `${pageUrl}#location-photo`,
          contentUrl: absoluteUrl(texasDefinedBrand, editorialImageSrc("https://thumb.wikimedia.org/wikipedia/commons/thumb/5/55/Headwater_Boardwalks_Huntsville_State_Park_Texas_2025.jpg/960px-Headwater_Boardwalks_Huntsville_State_Park_Texas_2025.jpg")),
          caption: "Headwater Boardwalks at Huntsville State Park",
          creator: { "@type": "Person", name: "Larry D. Moore" },
          creditText: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons",
          copyrightNotice: "© 2025 Larry D. Moore",
          license: "https://creativecommons.org/licenses/by/4.0/",
          acquireLicensePage: "https://commons.wikimedia.org/wiki/File:Headwater_Boardwalks_Huntsville_State_Park_Texas_2025.jpg",
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
        description: "Compare Texas mountain bike routes, difficulty, parking and trail maps, plus Huntsville and Ray Roberts options near Houston and DFW.",
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
