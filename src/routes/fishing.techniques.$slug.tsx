import { createFileRoute, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { getFishingTechniqueProfileData } from "@/data/fishing/technique-data.functions";
import { fishingFoundationAnchor } from "@/data/fishing/slugs";
import { FISHING_TECHNIQUES_DIRECTORY_PATH } from "@/data/fishing/technique-routing";
import { buildMeta, canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/fishing/techniques/$slug")({
  loader: async ({ params }) => {
    const pageData = await getFishingTechniqueProfileData({ data: { slug: params.slug } });
    if (!pageData) throw notFound();
    return pageData;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ name: "robots", content: "noindex, nofollow" }] };
    const { technique, canonicalPath, lakes, species, sources } = loaderData;
    const origin = `https://${texasDefinedBrand.identity.domain}`;
    const description = `${technique.name} fishing in Texas: source-backed lake applications, target species and seasonal context drawn from TexasDefined's complete fishing-lake guides.`;
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "WebPage", url: `${origin}${canonicalPath}`, name: `${technique.name} Fishing in Texas`, description, dateModified: technique.verifiedAt, about: { "@type": "Thing", name: technique.name, description: technique.summary }, citation: sources.map((source) => source.url), mainEntity: { "@id": `${origin}${canonicalPath}#lake-applications` } },
        { "@type": "ItemList", "@id": `${origin}${canonicalPath}#lake-applications`, numberOfItems: lakes.length, itemListElement: lakes.map((lake, index) => ({ "@type": "ListItem", position: index + 1, name: `${technique.name} — ${lake.name}`, url: `${origin}${fishingFoundationAnchor("lake", lake.slug)}` })) },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Front page", item: origin },
          { "@type": "ListItem", position: 2, name: "Fishing", item: `${origin}/fishing` },
          { "@type": "ListItem", position: 3, name: "Fishing techniques", item: `${origin}${FISHING_TECHNIQUES_DIRECTORY_PATH}` },
          { "@type": "ListItem", position: 4, name: technique.name, item: `${origin}${canonicalPath}` },
        ] },
        { "@type": "Thing", name: technique.name, description: technique.summary, subjectOf: `${origin}${canonicalPath}`, keywords: species.map((fish) => fish.commonName).join(", ") },
      ],
    };
    return { meta: buildMeta(texasDefinedBrand, { title: `${technique.name} Fishing in Texas — Lakes, Species & Seasons`, description, canonicalPath }), links: [canonicalLink(texasDefinedBrand, canonicalPath)], scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }] };
  },
  notFoundComponent: () => <div className="mx-auto max-w-3xl px-6 py-20"><h1 className="font-display text-4xl">Verified fishing technique not found</h1><p className="mt-4 text-muted-foreground">TexasDefined only publishes technique profiles after the method has a verified application on at least one complete fishing-lake guide.</p><a href={FISHING_TECHNIQUES_DIRECTORY_PATH} className="mt-6 inline-block border-b border-primary pb-1 font-semibold text-primary">Browse fishing techniques →</a></div>,
});
