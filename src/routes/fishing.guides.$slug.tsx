import { createFileRoute, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { getFishingGuideProfileData } from "@/data/fishing/guide-profile-data.functions";
import { buildMeta, canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/fishing/guides/$slug")({
  loader: async ({ params }) => {
    const pageData = await getFishingGuideProfileData({ data: { slug: params.slug } });
    if (!pageData) throw notFound();
    return pageData;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ name: "robots", content: "noindex, nofollow" }] };
    const { guide, canonicalPath, lakes, species } = loaderData;
    const origin = `https://${texasDefinedBrand.identity.domain}`;
    const description = guide.bio ?? `Verified Texas fishing-guide profile for ${guide.businessName}, including only sourced lake, target-species and business details.`;
    const serviceAreas = [...new Set([...lakes.map(({ lake }) => lake?.name).filter(Boolean), ...(guide.serviceRegions ?? []).map((region) => region.replaceAll("-", " "))])];
    return {
      meta: buildMeta(texasDefinedBrand, { title: `${guide.businessName} — Verified Texas Fishing Guide`, description, canonicalPath }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify([
        { "@context": "https://schema.org", "@type": "WebPage", name: `${guide.businessName} — Verified Texas Fishing Guide`, description, url: `${origin}${canonicalPath}`, dateModified: guide.verifiedAt },
        { "@context": "https://schema.org", "@type": "ProfessionalService", name: guide.businessName, ...(guide.phone ? { telephone: guide.phone } : {}), ...(guide.website ? { sameAs: guide.website } : {}), ...(serviceAreas.length ? { areaServed: serviceAreas } : {}), ...(species.length ? { knowsAbout: species.map(({ species: fish }) => fish?.commonName).filter(Boolean) } : {}) },
        { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: origin },
          { "@type": "ListItem", position: 2, name: "Fishing", item: `${origin}/fishing` },
          { "@type": "ListItem", position: 3, name: "Fishing guides", item: `${origin}/fishing/guides` },
          { "@type": "ListItem", position: 4, name: guide.businessName, item: `${origin}${canonicalPath}` },
        ] },
      ]) }],
    };
  },
  notFoundComponent: () => <div className="mx-auto max-w-3xl px-6 py-20"><h1 className="font-display text-4xl">Verified fishing guide not found</h1><p className="mt-4 text-muted-foreground">TexasDefined only publishes fishing-guide profile routes after the listing has passed the verification gate.</p><a href="/fishing/guides" className="mt-6 inline-block border-b border-primary pb-1 font-semibold text-primary">Browse verified fishing guides →</a></div>,
});
