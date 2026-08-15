import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { getTexasSymbolsDirectoryData } from "@/data/texas-symbols.functions";
import { buildMeta, canonicalLink } from "@/lib/seo";

const description = "Explore the official symbols of Texas, from the mockingbird and bluebonnet to the pecan tree, Guadalupe bass, rodeo, chili, cowboy boots and dozens more verified state designations.";

export const Route = createFileRoute("/texas-symbols")({
  loader: () => getTexasSymbolsDirectoryData(),
  head: ({ loaderData }) => {
    const origin = `https://${texasDefinedBrand.identity.domain}`;
    const currentSymbols = loaderData?.currentTexasSymbols ?? [];
    const featuredSymbols = loaderData?.featuredTexasSymbols ?? [];
    return {
      meta: buildMeta(texasDefinedBrand, { title: "Official Texas Symbols — Complete State Symbol Guide", description, canonicalPath: "/texas-symbols" }),
      links: [canonicalLink(texasDefinedBrand, "/texas-symbols")],
      scripts: [{ type: "application/ld+json", children: JSON.stringify([
        { "@context": "https://schema.org", "@type": "CollectionPage", name: "Official Texas Symbols", description, url: `${origin}/texas-symbols`, about: { "@type": "Thing", name: "Texas state symbols" } },
        { "@context": "https://schema.org", "@type": "ItemList", name: "Official symbols of Texas", numberOfItems: currentSymbols.length, itemListElement: featuredSymbols.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: `Texas State ${item.category}: ${item.symbol}`, url: `${origin}/texas-symbols/${item.slug}` })) },
        { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: origin },
          { "@type": "ListItem", position: 2, name: "Texas History", item: `${origin}/texas-history` },
          { "@type": "ListItem", position: 3, name: "Official Texas Symbols", item: `${origin}/texas-symbols` },
        ] },
      ]) }],
    };
  },
});
