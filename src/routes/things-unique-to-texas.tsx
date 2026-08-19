import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { TEXAS_ICON_CATEGORIES, TEXAS_ICON_ITEM_COUNT } from "@/data/things-unique-to-texas";
import { buildMeta, canonicalLink } from "@/lib/seo";

const description = "Explore 250 foods, landscapes, landmarks, small-town oddities, traditions, wildlife, brands, sayings and stories that help define Texas.";

export const Route = createFileRoute("/things-unique-to-texas")({
  loader: () => ({ categories: TEXAS_ICON_CATEGORIES, itemCount: TEXAS_ICON_ITEM_COUNT }),
  head: ({ loaderData }) => {
    const origin = `https://${texasDefinedBrand.identity.domain}`;
    const categories = loaderData?.categories ?? [];
    const methodologyUrl = `${origin}/things-unique-to-texas/methodology`;
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
              mainEntity: {
                "@type": "ItemList",
                numberOfItems: loaderData?.itemCount ?? TEXAS_ICON_ITEM_COUNT,
                itemListElement: categories.map((category, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  name: category.title,
                  url: `${origin}/things-unique-to-texas/${category.slug}`,
                })),
              },
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
