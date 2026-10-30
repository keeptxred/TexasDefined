import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const description = "Discover the Texas foods, traditions, small towns, landmarks, landscapes and cultural histories that make the Lone Star State distinctive.";

export const Route = createFileRoute("/things-unique-to-texas")({
  loader: async () => {
    const { TEXAS_ICON_CATEGORIES } = await import("@/data/things-unique-to-texas");
    return { categories: TEXAS_ICON_CATEGORIES };
  },
  head: ({ loaderData }) => {
    const origin = `https://${texasDefinedBrand.identity.domain}`;
    const categories = loaderData?.categories ?? [];
    const methodologyUrl = `${origin}/things-unique-to-texas/methodology`;
    const csvUrl = `${origin}/things-that-define-texas.csv`;
    const jsonUrl = `${origin}/things-that-define-texas.json`;
    return {
      meta: buildMeta(texasDefinedBrand, {
        title: "What Is Texas Known For? Iconic Foods, Places & Traditions",
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
              name: "Things That Define Texas",
              description,
              url: `${origin}/things-unique-to-texas`,
              about: { "@type": "Place", name: "Texas" },
              isBasedOn: methodologyUrl,
              author: { "@type": "Organization", name: "Texas Defined Editorial Desk", url: `${origin}/authors/a-hollis` },
              dateModified: "2026-10-29",
              mainEntity: { "@id": `${origin}/things-unique-to-texas#items` },
              hasPart: { "@id": `${origin}/things-unique-to-texas#dataset` },
            },
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              "@id": `${origin}/things-unique-to-texas#items`,
              name: "Things That Define Texas themed guides",
              numberOfItems: categories.length,
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
              description: "TexasDefined editorial research reference entries, chapter membership and relationships to canonical deeper guides. The research archive is not an editorial publishing quota.",
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
