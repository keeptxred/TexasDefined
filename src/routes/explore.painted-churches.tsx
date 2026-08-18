import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/explore/painted-churches";

export const Route = createFileRoute("/explore/painted-churches")({
  loader: async () => {
    const { getPaintedChurchesDirectoryData } = await import("@/data/painted-churches.functions");
    return getPaintedChurchesDirectoryData();
  },
  head: ({ loaderData }) => {
    const origin = `https://${texasDefinedBrand.identity.domain}`;
    const churches = loaderData?.paintedChurches ?? [];
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: "Painted Churches of Texas | Route & Historic Church Guide",
        description:
          "Plan a Texas painted-church drive with the Schulenburg route, verified historic church pages, visitor notes, National Register context and rights-cleared photography.",
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Painted Churches of Texas",
          numberOfItems: churches.length,
          itemListElement: churches.map((church, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: church.name,
            url: `${origin}/explore/painted-churches/${church.slug}`,
          })),
        }),
      }],
    };
  },
});
