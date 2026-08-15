import { createFileRoute, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { getTexasSymbolProfileData } from "@/data/texas-symbols.functions";
import { buildMeta, canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/texas-symbols/$slug")({
  loader: async ({ params }) => {
    const pageData = await getTexasSymbolProfileData({ data: { slug: params.slug } });
    if (!pageData) throw notFound();
    return pageData;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ name: "robots", content: "noindex, nofollow" }] };
    const { symbol, sourceUrl } = loaderData;
    const canonicalPath = `/texas-symbols/${symbol.slug}`;
    const origin = `https://${texasDefinedBrand.identity.domain}`;
    const title = `Texas State ${symbol.category}: ${symbol.symbol}`;
    const description = symbol.summary ?? `${symbol.symbol} is the official Texas state ${symbol.category.toLowerCase()}, designated in ${symbol.year}.`;
    return {
      meta: buildMeta(texasDefinedBrand, { title, description, canonicalPath }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify([
        { "@context": "https://schema.org", "@type": "WebPage", name: title, description, url: `${origin}${canonicalPath}`, about: { "@type": "Thing", name: symbol.symbol, description: `Official Texas state ${symbol.category.toLowerCase()}` }, citation: sourceUrl },
        { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: origin },
          { "@type": "ListItem", position: 2, name: "Official Texas Symbols", item: `${origin}/texas-symbols` },
          { "@type": "ListItem", position: 3, name: symbol.symbol, item: `${origin}${canonicalPath}` },
        ] },
      ]) }],
    };
  },
  notFoundComponent: () => <div className="mx-auto max-w-3xl px-6 py-20"><h1 className="font-display text-4xl">Texas symbol guide not found</h1><p className="mt-4 text-muted-foreground">The complete verified designation may still appear in the Official Texas Symbols directory even when TexasDefined has not published a full profile yet.</p><a href="/texas-symbols" className="mt-6 inline-block border-b border-primary pb-1 font-semibold text-primary">Browse Official Texas Symbols →</a></div>,
});
