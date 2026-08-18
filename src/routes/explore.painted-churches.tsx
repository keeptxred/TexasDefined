import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/explore/painted-churches";

export const Route = createFileRoute("/explore/painted-churches")({
  head: () => {
    const origin = `https://${texasDefinedBrand.identity.domain}`;
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
          "@type": "CollectionPage",
          name: "Painted Churches of Texas",
          description: "A verified Texas travel guide to painted churches, including the Schulenburg route and statewide historic church destinations.",
          url: `${origin}${canonicalPath}`,
        }),
      }],
    };
  },
});
