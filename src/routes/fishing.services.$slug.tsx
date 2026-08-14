import { createFileRoute, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { FishingServiceProfile } from "@/components/fishing/FishingServiceProfile";
import { getFishingServiceProfileData } from "@/data/fishing/service-profile-data.functions";
import { buildMeta, canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/fishing/services/$slug")({
  loader: async ({ params }) => {
    const pageData = await getFishingServiceProfileData({ data: { slug: params.slug } });
    if (!pageData) throw notFound();
    return pageData;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ name: "robots", content: "noindex, nofollow" }] };
    const { service, category, canonicalPath, lakes } = loaderData;
    const origin = `https://${texasDefinedBrand.identity.domain}`;
    const description = service.description ?? `Verified ${category.replaceAll("-", " ")} serving anglers around ${lakes.map((lake) => lake?.name).filter(Boolean).join(", ")}. TexasDefined publishes sourced business facts only.`;
    return {
      meta: buildMeta(texasDefinedBrand, { title: `${service.name} — Verified Texas Fishing Service`, description, canonicalPath }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify([
        { "@context": "https://schema.org", "@type": "WebPage", name: `${service.name} — Verified Texas Fishing Service`, description, url: `${origin}${canonicalPath}`, dateModified: service.verifiedAt },
        { "@context": "https://schema.org", "@type": "LocalBusiness", name: service.name, ...(service.phone ? { telephone: service.phone } : {}), ...(service.website ? { url: service.website } : {}), ...(service.address ? { address: service.address } : {}), ...(service.coordinates ? { geo: { "@type": "GeoCoordinates", latitude: service.coordinates.lat, longitude: service.coordinates.lng } } : {}), areaServed: lakes.map((lake) => lake?.name).filter(Boolean) },
        { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: origin }, { "@type": "ListItem", position: 2, name: "Fishing", item: `${origin}/fishing` }, { "@type": "ListItem", position: 3, name: "Fishing services", item: `${origin}/fishing/services` }, { "@type": "ListItem", position: 4, name: service.name, item: `${origin}${canonicalPath}` }] },
      ]) }],
    };
  },
  component: () => <FishingServiceProfile pageData={Route.useLoaderData()} />,
  notFoundComponent: () => <div className="mx-auto max-w-3xl px-6 py-20"><h1 className="font-display text-4xl">Verified fishing service not found</h1><p className="mt-4 text-muted-foreground">TexasDefined publishes local-service profiles only after the business facts and lake relationship pass verification.</p><a href="/fishing/services" className="mt-6 inline-block border-b border-primary text-primary">Browse fishing services →</a></div>,
});
