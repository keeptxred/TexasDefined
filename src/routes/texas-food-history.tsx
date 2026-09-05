import { createFileRoute } from "@tanstack/react-router";

import bbqBrisket from "@/assets/bbq-brisket.jpg";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/texas-food-history";
const description = "A TexasDefined guide to the history behind brisket, chili con carne, chicken-fried steak, breakfast tacos, Czech and German foodways, Dr Pepper, Ranch Water, puffy tacos, barbacoa and the regional cultures that shaped the Texas table.";

// Lazy UI authority contract: There is no single Texas cuisine. Separate history from folklore. Start with nine stories.
const guides = [
  { href: "/article/texas-barbecue-styles-explained", title: "Texas Barbecue Styles Explained" },
  { href: "/texas-chili-con-carne-history", title: "Texas Chili Con Carne" },
  { href: "/texas-chicken-fried-steak-guide", title: "Texas Chicken-Fried Steak" },
  { href: "/texas-breakfast-taco-guide", title: "Texas Breakfast Tacos" },
  { href: "/german-czech-texas-towns", title: "German & Czech Texas Towns" },
  { href: "/dr-pepper-texas-history", title: "Dr Pepper in Texas" },
  { href: "/texas-ranch-water-guide", title: "Texas Ranch Water" },
  { href: "/san-antonio-puffy-taco-history", title: "San Antonio Puffy Tacos" },
  { href: "/barbacoa-big-red-san-antonio", title: "Barbacoa & Big Red" },
] as const;

export const Route = createFileRoute(canonicalPath)({
  head: () => {
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: "Texas Food History: Chili, Barbecue, Breakfast Tacos & More",
        description,
        image: bbqBrisket,
        imageAlt: "Sliced Texas barbecue brisket with dark bark and smoke ring",
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "CollectionPage", "@id": `${pageUrl}#page`, url: pageUrl, name: "Texas Food History", description, isPartOf: { "@id": "https://texasdefined.com/#website" }, mainEntity: { "@id": `${pageUrl}#guides` } },
          { "@type": "ItemList", "@id": `${pageUrl}#guides`, name: "Texas food history guides", numberOfItems: guides.length, itemListElement: guides.map((guide, index) => ({ "@type": "ListItem", position: index + 1, name: guide.title, url: absoluteUrl(texasDefinedBrand, guide.href) })) },
          { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Front page", item: absoluteUrl(texasDefinedBrand, "/") },
            { "@type": "ListItem", position: 2, name: "Things That Define Texas", item: absoluteUrl(texasDefinedBrand, "/things-unique-to-texas") },
            { "@type": "ListItem", position: 3, name: "Texas Food History", item: pageUrl },
          ] },
        ],
      })],
    };
  },
});
