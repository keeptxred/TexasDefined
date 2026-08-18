import { createFileRoute, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute("/explore/painted-churches/$slug")({
  loader: async ({ params }) => {
    const { getPaintedChurchProfileData } = await import("@/data/painted-churches.functions");
    const pageData = await getPaintedChurchProfileData({ data: { slug: params.slug } });
    if (!pageData) throw notFound();
    return pageData;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Painted church unavailable" }, { name: "robots", content: "noindex, nofollow" }] };
    const { church } = loaderData;
    const canonicalPath = `/explore/painted-churches/${church.slug}`;
    const url = `${siteUrl}${canonicalPath}`;
    const churchSchema = {
      "@type": "Church",
      "@id": `${url}#church`,
      name: church.name,
      description: church.summary,
      url,
      address: {
        "@type": "PostalAddress",
        addressLocality: church.city,
        addressRegion: "TX",
        addressCountry: "US",
        ...(church.address ? { streetAddress: church.address } : {}),
      },
      ...(church.image ? { image: church.image.src } : {}),
    };
    const breadcrumbSchema = {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Explore", item: `${siteUrl}/explore` },
        { "@type": "ListItem", position: 3, name: "Painted Churches", item: `${siteUrl}/explore/painted-churches` },
        { "@type": "ListItem", position: 4, name: church.shortName, item: url },
      ],
    };
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: `${church.shortName} | Texas Painted Church Guide`,
        description: `${church.summary} Location, designation, visitor planning, sources and photography for ${church.shortName}.`,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": [churchSchema, breadcrumbSchema] }) }],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Painted Churches of Texas</p>
      <h1 className="mt-3 font-display text-4xl">That church guide isn’t available.</h1>
      <p className="mt-4 text-muted-foreground"><a href="/explore/painted-churches" className="border-b border-primary text-primary">Return to the painted churches guide.</a></p>
    </div>
  ),
});
