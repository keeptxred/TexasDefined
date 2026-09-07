import { createFileRoute, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { getTexasIconCategory } from "@/data/things-unique-to-texas";
import { texasIconCanonicalHref } from "@/data/things-unique-to-texas-links";
import { buildMeta, canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/things-unique-to-texas/$category")({
  loader: ({ params }) => {
    const category = getTexasIconCategory(params.category);
    if (!category) throw notFound();
    return category;
  },
  head: ({ loaderData, params }) => {
    const category = loaderData;
    const path = `/things-unique-to-texas/${params.category}`;
    const origin = `https://${texasDefinedBrand.identity.domain}`;
    const methodologyUrl = `${origin}/things-unique-to-texas/methodology`;
    const isTexasBrands = category?.slug === "texas-brands";
    const description = isTexasBrands
      ? "Explore Texas brands and chains including H-E-B, Buc-ee's, Whataburger, Central Market, Brookshire's, Blue Bell, Shiner, Dickies and more."
      : category?.description ?? "Explore the people, places, foods, traditions and symbols that help define Texas.";
    const title = isTexasBrands
      ? "Texas Brands: H-E-B, Buc-ee's, Whataburger, Grocery Chains & More"
      : category ? `${category.title} — Things That Define Texas` : "Things That Define Texas";
    const itemList = category?.items.map((entry, index) => {
      const href = texasIconCanonicalHref(entry);
      return {
        "@type": "ListItem",
        position: index + 1,
        name: entry.name,
        ...(href ? { url: `${origin}${href}` } : {}),
      };
    }) ?? [];

    return {
      meta: buildMeta(texasDefinedBrand, { title, description, canonicalPath: path }),
      links: [canonicalLink(texasDefinedBrand, path)],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: category?.title ?? title,
            description,
            url: `${origin}${path}`,
            about: { "@type": "Place", name: "Texas" },
            isBasedOn: methodologyUrl,
            author: { "@type": "Organization", name: "Texas Defined Editorial Desk", url: `${origin}/authors/a-hollis` },
            dateModified: "2026-08-19",
            mainEntity: category ? {
              "@type": "ItemList",
              numberOfItems: itemList.length,
              itemListElement: itemList,
            } : undefined,
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: origin },
              { "@type": "ListItem", position: 2, name: "Things That Define Texas", item: `${origin}/things-unique-to-texas` },
              { "@type": "ListItem", position: 3, name: category?.title ?? params.category, item: `${origin}${path}` },
            ],
          },
        ]),
      }],
    };
  },
});
