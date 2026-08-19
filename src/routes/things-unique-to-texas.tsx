import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { TEXAS_ICON_CATEGORIES, TEXAS_ICON_ITEM_COUNT } from "@/data/things-unique-to-texas";
import { TEXAS_ICON_DEEPER_GUIDE_COUNT } from "@/data/things-unique-to-texas-reference";
import { buildMeta, canonicalLink } from "@/lib/seo";

const description = "Explore 250 foods, landscapes, landmarks, small-town oddities, traditions, wildlife, brands, sayings and stories that help define Texas.";

export const Route = createFileRoute("/things-unique-to-texas")({
  loader: () => ({ categories: TEXAS_ICON_CATEGORIES, itemCount: TEXAS_ICON_ITEM_COUNT, deeperGuideCount: TEXAS_ICON_DEEPER_GUIDE_COUNT }),
  head: ({ loaderData }) => {
    const origin = `https://${texasDefinedBrand.identity.domain}`;
    const categories = loaderData?.categories ?? [];
    const methodologyUrl = `${origin}/things-unique-to-texas/methodology`;
    const csvUrl = `${origin}/things-that-define-texas.csv`;
    const jsonUrl = `${origin}/things-that-define-texas.json`;
    return {
      meta: buildMeta(texasDefinedBrand, {
        title: "250 Things That Define Texas — Food, Places, Culture & Icons",
        description,
        canonicalPath: "/things-unique-to-texas",
      }),
      links: [canonicalLink(texasDefinedBrand, "/things-unique-to-texas")],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "@id": `${origin}/things-unique-to-texas#collection`,
              name: "250 Things That Define Texas",
              description,
              url: `${origin}/things-unique-to-texas`,
              about: { "@type": "Place", name: "Texas" },
              isBasedOn: methodologyUrl,
              author: { "@type": "Organization", name: "Texas Defined Editorial Desk", url: `${origin}/authors/a-hollis` },
              dateModified: "2026-08-19",
              mainEntity: { "@id": `${origin}/things-unique-to-texas#items` },
              hasPart: { "@id": `${origin}/things-unique-to-texas#dataset` },
            },
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              "@id": `${origin}/things-unique-to-texas#items`,
              name: "250 Things That Define Texas chapters",
              numberOfItems: loaderData?.itemCount ?? TEXAS_ICON_ITEM_COUNT,
              itemListElement: categories.map((category, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: category.title,
                url: `${origin}/things-unique-to-texas/${category.slug}`,
              })),
            },
            {
              "@context": "https://schema.org",
              "@type": "Dataset",
              "@id": `${origin}/things-unique-to-texas#dataset`,
              name: "Things That Define Texas reference dataset",
              description: "The 250 numbered editorial entries, their chapter membership and canonical TexasDefined deeper-guide relationships.",
              creator: { "@type": "Organization", name: "Texas Defined Editorial Desk", url: `${origin}/authors/a-hollis` },
              isBasedOn: methodologyUrl,
              variableMeasured: ["item id", "name", "description", "chapter", "deeper guide"],
              distribution: [
                { "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: csvUrl, name: "Things That Define Texas CSV" },
                { "@type": "DataDownload", encodingFormat: "application/json", contentUrl: jsonUrl, name: "Things That Define Texas JSON" },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: origin },
                { "@type": "ListItem", position: 2, name: "Things That Define Texas", item: `${origin}/things-unique-to-texas` },
              ],
            },
          ]),
        },
      ],
    };
  },
});
