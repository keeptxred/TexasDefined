import { createFileRoute, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute("/food/$slug")({
  loader: async ({ params }) => {
    const { getFoodDestination } = await import("@/data/food-destinations");
    const destination = getFoodDestination(params.slug);
    if (!destination) throw notFound();
    return { destination };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const { destination } = loaderData;
    const canonicalPath = `/food/${destination.slug}`;
    const description = `${destination.significance} Source-checked ${destination.verifiedAt}.`;
    const postalCode = destination.address.match(/\b\d{5}(?:-\d{4})?\b/)?.[0];
    const placeSchema = {
      "@type": destination.schemaType,
      "@id": `${siteUrl}${canonicalPath}#place`,
      name: destination.name,
      description: destination.significance,
      url: `${siteUrl}${canonicalPath}`,
      sameAs: destination.officialUrl,
      address: {
        "@type": "PostalAddress",
        streetAddress: destination.address.split(",")[0],
        addressLocality: destination.city,
        addressRegion: "TX",
        postalCode,
        addressCountry: "US",
      },
      containedInPlace: { "@type": "AdministrativeArea", name: `${destination.county} County, Texas` },
      dateModified: destination.verifiedAt,
    };
    const breadcrumbSchema = {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}${canonicalPath}#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Food & BBQ", item: `${siteUrl}/explore/food-bbq` },
        { "@type": "ListItem", position: 3, name: destination.name, item: `${siteUrl}${canonicalPath}` },
      ],
    };
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: `${destination.name}: Texas Food Destination Guide`,
        description,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": [placeSchema, breadcrumbSchema] }) }],
    };
  },
});
