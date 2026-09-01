import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/wildlife";
const title = "Texas Wildlife Refuges, Sanctuaries, Zoos & Nature Destinations | Texas Defined";
const description = "Explore Texas national wildlife refuges, wildlife-rich state parks, birding centers, zoos, aquariums, sanctuaries and nature destinations with county links, official sources and practical trip planning.";
const wildlifeTerms = /wildlife|birding|birds|bison|longhorn|alligator|bat\b|zoo|aquarium|refuge|sanctuary|nature center|conservation/i;

export const Route = createFileRoute("/explore/wildlife")({
  loader: async ({ context }) => {
    const { destinationsQuery } = await import("@/data/queries");
    const destinations = await context.queryClient.ensureQueryData(destinationsQuery({ limit: 5000 }));
    return destinations.filter((destination) =>
      destination.managingAuthority === "U.S. Fish and Wildlife Service"
      || wildlifeTerms.test(`${destination.name} ${destination.summary} ${destination.highlights.join(" ")}`),
    );
  },
  head: () => {
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title, description }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CollectionPage",
            "@id": `${pageUrl}#page`,
            url: pageUrl,
            name: "Texas Wildlife Refuges, Sanctuaries, Zoos and Nature Destinations",
            description,
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Front page", item: absoluteUrl(texasDefinedBrand, "/") },
              { "@type": "ListItem", position: 2, name: "Explore Texas", item: absoluteUrl(texasDefinedBrand, "/explore") },
              { "@type": "ListItem", position: 3, name: "Wildlife", item: pageUrl },
            ],
          },
        ],
      })],
    };
  },
});