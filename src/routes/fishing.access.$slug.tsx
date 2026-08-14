import { createFileRoute, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { FishingAccessProfile } from "@/components/fishing/FishingAccessProfile";
import { getFishingAccessProfileData } from "@/data/fishing/access-profile-data.functions";
import { buildMeta, canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/fishing/access/$slug")({
  loader: async ({ params }) => {
    const pageData = await getFishingAccessProfileData({ data: { slug: params.slug } });
    if (!pageData) throw notFound();
    return pageData;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ name: "robots", content: "noindex, nofollow" }] };
    const { point, canonicalPath, lakes } = loaderData;
    const origin = `https://${texasDefinedBrand.identity.domain}`;
    const description = point.description ?? `Verified ${point.kind.replaceAll("-", " ")} fishing access for ${lakes.map((lake) => lake?.name).filter(Boolean).join(", ")}, with sourced access details and current-condition caveats.`;
    return {
      meta: buildMeta(texasDefinedBrand, { title: `${point.name} — Verified Texas Fishing Access`, description, canonicalPath }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify([
        { "@context": "https://schema.org", "@type": "WebPage", name: `${point.name} — Verified Texas Fishing Access`, description, url: `${origin}${canonicalPath}`, dateModified: point.verifiedAt },
        { "@context": "https://schema.org", "@type": "Place", name: point.name, ...(point.address ? { address: point.address } : {}), ...(point.coordinates ? { geo: { "@type": "GeoCoordinates", latitude: point.coordinates.lat, longitude: point.coordinates.lng } } : {}) },
        { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: origin }, { "@type": "ListItem", position: 2, name: "Fishing", item: `${origin}/fishing` }, { "@type": "ListItem", position: 3, name: "Fishing access", item: `${origin}/fishing/access` }, { "@type": "ListItem", position: 4, name: point.name, item: `${origin}${canonicalPath}` }] },
      ]) }],
    };
  },
  component: () => <FishingAccessProfile pageData={Route.useLoaderData()} />,
  notFoundComponent: () => <div className="mx-auto max-w-3xl px-6 py-20"><h1 className="font-display text-4xl">Verified fishing access not found</h1><p className="mt-4 text-muted-foreground">TexasDefined publishes access profiles only after the source and lake relationship pass verification.</p><a href="/fishing/access" className="mt-6 inline-block border-b border-primary text-primary">Browse fishing access →</a></div>,
});
