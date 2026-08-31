import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import type { Destination } from "@/data/types";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/wildlife";
const description = "Explore Texas national wildlife refuges, wildlife-rich state parks, birding centers, zoos, aquariums, sanctuaries and nature destinations with county links, official sources and practical trip planning.";
const wildlifeTerms = /wildlife|birding|birds|bison|longhorn|alligator|bat\b|zoo|aquarium|refuge|sanctuary|nature center|conservation/i;

function isFederalRefuge(destination: Destination) {
  return destination.managingAuthority === "U.S. Fish and Wildlife Service" && /national wildlife refuge/i.test(destination.name);
}

function isWildlifeDestination(destination: Destination) {
  if (isFederalRefuge(destination)) return true;
  return wildlifeTerms.test([destination.name, destination.summary, ...destination.highlights].join(" "));
}

function wildlifeRank(destination: Destination) {
  if (isFederalRefuge(destination)) return 0;
  if (/wildlife refuge|wildlife center|sanctuary/i.test(destination.name)) return 1;
  if (/zoo|aquarium|wildlife ranch/i.test(destination.name)) return 2;
  if (destination.category === "state-parks") return 3;
  return 4;
}

export const Route = createFileRoute("/explore/wildlife")({
  loader: async ({ context }) => {
    // Keep the full destination query/catalog graph off the initial client bundle.
    // The wildlife hub needs it only when this route is actually visited.
    const { destinationsQuery } = await import("@/data/queries");
    const destinations = await context.queryClient.ensureQueryData(destinationsQuery({ limit: 5000 }));
    return destinations
      .filter(isWildlifeDestination)
      .sort((left, right) => wildlifeRank(left) - wildlifeRank(right) || left.name.localeCompare(right.name));
  },
  head: ({ loaderData }) => {
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    const destinations = loaderData ?? [];
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: "Texas Wildlife Refuges, Sanctuaries, Zoos & Nature Destinations | Texas Defined",
        description,
      }),
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
            mainEntity: { "@id": `${pageUrl}#places` },
            about: [
              { "@type": "Thing", name: "Texas wildlife refuges" },
              { "@type": "Thing", name: "Texas wildlife viewing" },
              { "@type": "Thing", name: "Texas zoos and aquariums" },
              { "@type": "Thing", name: "Texas birding destinations" },
            ],
          },
          {
            "@type": "ItemList",
            "@id": `${pageUrl}#places`,
            name: "Texas wildlife destinations",
            numberOfItems: destinations.length,
            itemListElement: destinations.map((destination, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: destination.name,
              url: absoluteUrl(texasDefinedBrand, `/destination/${destination.slug}`),
            })),
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
