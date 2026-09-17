import { createFileRoute, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute("/food/$slug")({
  loader: async ({ params }) => {
    const { getFoodDestination } = await import("@/data/food-destinations");
    const destination = getFoodDestination(params.slug);
    if (!destination) throw notFound();
    const contentPath = `/content/food-authority/${destination.slug}.html`;
    const authorityHtml = await fetch(import.meta.env.SSR ? `${siteUrl}${contentPath}` : contentPath)
      .then((response) => response.ok ? response.text() : null)
      .catch(() => null);
    return { destination, authorityHtml };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const { destination } = loaderData;
    const canonicalPath = `/food/${destination.slug}`;
    const url = `${siteUrl}${canonicalPath}`;
    const placeSchema = {
      "@type": destination.schemaType,
      "@id": `${url}#place`,
      name: destination.name,
      description: destination.significance,
      url,
      sameAs: destination.officialUrl,
      address: { "@type": "PostalAddress", streetAddress: destination.streetAddress, addressLocality: destination.city, addressRegion: "TX", postalCode: destination.postalCode, addressCountry: "US" },
      containedInPlace: { "@type": "AdministrativeArea", name: `${destination.county} County, Texas` },
      dateModified: destination.verifiedAt,
    };
    const breadcrumbs = { "@type": "BreadcrumbList", "@id": `${url}#breadcrumbs`, itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Food & BBQ", item: `${siteUrl}/explore/food-bbq` },
      { "@type": "ListItem", position: 3, name: destination.name, item: url },
    ] };
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: `${destination.name}: Texas Food Destination Guide`, description: destination.significance }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": [placeSchema, breadcrumbs] }) }],
    };
  },
});
