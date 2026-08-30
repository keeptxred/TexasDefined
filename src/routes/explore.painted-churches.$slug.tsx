import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { expandedPaintedChurchBySlug } from "@/data/painted-churches-expanded";
import { buildMeta, canonicalLink } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute("/explore/painted-churches/$slug")({
  loader: async ({ params }) => {
    const church = expandedPaintedChurchBySlug(params.slug);
    if (!church) throw notFound();
    const { canonicalPaintedChurchProfileBySlug } = await import("@/data/painted-church-profile-index");
    const profile = canonicalPaintedChurchProfileBySlug(params.slug);
    return { church, profile };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Painted church unavailable" }, { name: "robots", content: "noindex, nofollow" }] };
    const { church, profile } = loaderData;
    const canonicalPath = `/explore/painted-churches/${params.slug}`;
    const url = `${siteUrl}${canonicalPath}`;
    const isFredericksburgStMarys = params.slug === "fredericksburg-st-marys-catholic-church";
    const metaTitle = isFredericksburgStMarys
      ? "St. Mary's Catholic Church Fredericksburg TX"
      : `${church.shortName} | History, Architecture & Paintings`;
    const metaDescription = isFredericksburgStMarys
      ? "Historic St. Mary's Catholic Church in Fredericksburg, Texas: 1906 Gothic Revival architecture, painted interior, German Catholic history and visitor planning."
      : profile
        ? `${church.shortName}: history, architecture, age, artists, interior paintings, preservation, location and visitor planning.`
        : `${church.summary} Location, designation, visitor planning, sources and photography for ${church.shortName}.`;
    const churchSchema = {
      "@type": "Church",
      "@id": `${url}#church`,
      name: church.name,
      description: profile?.quickAnswer ?? church.summary,
      url,
      address: {
        "@type": "PostalAddress",
        addressLocality: church.city,
        addressRegion: "TX",
        addressCountry: "US",
        ...(church.address ? { streetAddress: church.address } : {}),
      },
      ...(profile?.foundedYear ? { foundingDate: String(profile.foundedYear) } : {}),
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
        title: metaTitle,
        description: metaDescription,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": [churchSchema, breadcrumbSchema] }) }],
    };
  },
  notFoundComponent: () => (
    <Container className="py-24">
      <p className="eyebrow text-primary">Painted Churches of Texas</p>
      <h1 className="mt-3 font-display text-4xl">That church guide isn’t available.</h1>
      <p className="mt-4 text-muted-foreground"><Link to="/explore/painted-churches" className="border-b border-primary text-primary">Return to the painted churches guide.</Link></p>
    </Container>
  ),
});
