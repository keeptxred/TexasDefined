import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { absoluteUrl, buildMeta, canonicalLink } from "@/lib/seo";
import { editorialImageSrc } from "@/lib/editorial-image-delivery";

const canonicalPath = "/texas-paddling-guide";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const editorialHeroImage = {
  url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/Recreational_kayakers_paddling_on_the_surface_of_Lady_Bird_Lake.jpg/1280px-Recreational_kayakers_paddling_on_the_surface_of_Lady_Bird_Lake.jpg",
  source: "https://commons.wikimedia.org/wiki/File:Recreational_kayakers_paddling_on_the_surface_of_Lady_Bird_Lake.jpg",
  license: "https://creativecommons.org/licenses/by-sa/4.0/",
  creator: "Oleg Yunakov",
  year: 2024,
  width: 1280,
  height: 856,
  alt: "Two kayakers paddle on Lady Bird Lake in Austin, Texas",
} as const;
const deliveredEditorialHeroUrl = absoluteUrl(texasDefinedBrand, editorialImageSrc(editorialHeroImage.url));
const paddlingTrails = [
  { name: "Lady Bird Lake Paddling Trail", region: "Austin / Hill Country" },
  { name: "Buffalo Bayou Paddling Trail", region: "Houston / Gulf Coast" },
  { name: "Bosque Bluffs & Brazos Bridges Paddling Trails", region: "Waco / Prairies and Lakes" },
  { name: "Hell's Half Acre Paddling Trail", region: "Caddo Lake / Piney Woods" },
  { name: "Lighthouse Lakes Paddling Trail", region: "Aransas Pass / Gulf Coast" },
] as const;

export const Route = createFileRoute(canonicalPath)({
  head: () => {
    const pageUrl = `${siteUrl}${canonicalPath}`;
    const itemListElement = paddlingTrails.map((trail, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Place",
        name: trail.name,
        containedInPlace: { "@type": "AdministrativeArea", name: trail.region },
      },
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
          name: "Texas Paddling Guide",
          description: "Plan five official Texas paddling trails around access points, route length, current water and weather conditions, private-property boundaries and land-manager guidance.",
          image: {
            "@type": "ImageObject",
            "@id": `${pageUrl}#primaryimage`,
            url: deliveredEditorialHeroUrl,
            contentUrl: deliveredEditorialHeroUrl,
            width: editorialHeroImage.width,
            height: editorialHeroImage.height,
            caption: editorialHeroImage.alt,
            creator: { "@type": "Person", name: editorialHeroImage.creator },
            creditText: `${editorialHeroImage.creator} · CC BY-SA 4.0 · Wikimedia Commons`,
            copyrightNotice: `© ${editorialHeroImage.year} ${editorialHeroImage.creator}`,
            license: editorialHeroImage.license,
            acquireLicensePage: editorialHeroImage.source,
          },
          associatedMedia: { "@id": `${pageUrl}#location-photo` },
          isPartOf: { "@id": `${siteUrl}/#website` },
          mainEntity: {
            "@type": "ItemList",
            "@id": `${pageUrl}#paddling-trails`,
            numberOfItems: itemListElement.length,
            itemListElement,
          },
        },
        {
          "@type": "ImageObject",
          "@id": `${pageUrl}#location-photo`,
          contentUrl: absoluteUrl(texasDefinedBrand, editorialImageSrc("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Canoeing_Caddo_Lake_State_Park_Texas_2023.jpg/1280px-Canoeing_Caddo_Lake_State_Park_Texas_2023.jpg")),
          caption: "Canoeing on Saw Mill Pond, Caddo Lake State Park",
          creator: { "@type": "Person", name: "Larry D. Moore" },
          creditText: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons",
          copyrightNotice: "© 2023 Larry D. Moore",
          license: "https://creativecommons.org/licenses/by/4.0/",
          acquireLicensePage: "https://commons.wikimedia.org/wiki/File:Canoeing_Caddo_Lake_State_Park_Texas_2023.jpg",
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}#breadcrumbs`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
            { "@type": "ListItem", position: 2, name: "Explore Texas", item: `${siteUrl}/explore` },
            { "@type": "ListItem", position: 3, name: "Lakes & Rivers", item: `${siteUrl}/explore/lakes-rivers` },
            { "@type": "ListItem", position: 4, name: "Texas Paddling Guide", item: pageUrl },
          ],
        },
      ],
    };

    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: "Texas Paddling Guide: 5 Official Trails to Plan",
        description: "Compare five Texas paddling trails with mapped launches, rental and shuttle options, stream gauges, NOAA tides and coastal conditions.",
        image: deliveredEditorialHeroUrl,
        imageAlt: editorialHeroImage.alt,
        imageWidth: editorialHeroImage.width,
        imageHeight: editorialHeroImage.height,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(schema) }],
    };
  },
});
