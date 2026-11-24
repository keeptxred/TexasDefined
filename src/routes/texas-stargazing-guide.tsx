import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { absoluteUrl, buildMeta, canonicalLink } from "@/lib/seo";
import { editorialImageSrc } from "@/lib/editorial-image-delivery";

const canonicalPath = "/texas-stargazing-guide";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const editorialHeroImage = {
  url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Copper_Breaks_State_Park_with_the_Milky_Way_Galaxy.jpg/1280px-Copper_Breaks_State_Park_with_the_Milky_Way_Galaxy.jpg",
  source: "https://commons.wikimedia.org/wiki/File:Copper_Breaks_State_Park_with_the_Milky_Way_Galaxy.jpg",
  license: "https://creativecommons.org/licenses/by-sa/4.0/",
  creator: "Matthew T Rader",
  year: 2020,
  width: 1280,
  height: 853,
  alt: "Milky Way above a tent at Copper Breaks State Park, Texas",
} as const;
const deliveredEditorialHeroUrl = absoluteUrl(texasDefinedBrand, editorialImageSrc(editorialHeroImage.url));
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
          description: "Plan trips to five Texas state parks certified as International Dark Sky Parks, with Bortle ratings, moon phase, weather, access and night-sky stewardship.",
          image: {
            "@type": "ImageObject",
            "@id": `${pageUrl}#primaryimage`,
            url: deliveredEditorialHeroUrl,
            contentUrl: deliveredEditorialHeroUrl,
            width: editorialHeroImage.width,
            height: editorialHeroImage.height,
            caption: editorialHeroImage.alt,
            creator: { "@type": "Person", name: editorialHeroImage.creator },
            creditText: `${editorialHeroImage.creator} · MatthewTRader.com · CC BY-SA 4.0 · Wikimedia Commons`,
            copyrightNotice: `© ${editorialHeroImage.year} ${editorialHeroImage.creator}`,
            license: editorialHeroImage.license,
            acquireLicensePage: editorialHeroImage.source,
          },
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
        title: "Texas Stargazing: 5 Certified Dark Sky State Parks",
        description: "Compare Texas dark-sky parks, Bortle ratings, viewing areas, seasonal observing, moonrise, twilight and legal nighttime access.",
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
