import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { destinationsQuery } from "@/data/queries";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/wildlife";
const title = "Texas Wildlife Refuges, Sanctuaries, Zoos & Nature Destinations | Texas Defined";
const description = "Explore source-checked Texas wildlife destinations, including national wildlife refuges, birding centers, sanctuaries, zoos, aquariums and public lands, with county context and official visitor sources.";

export const Route = createFileRoute(canonicalPath)({
  loader: async ({ context }) => {
    const destinations = await context.queryClient.ensureQueryData(destinationsQuery({ limit: 5000 }));
    const { wildlifeCollectionDestinations } = await import("@/data/wildlife-collection");
    return wildlifeCollectionDestinations(destinations);
  },
  head: ({ loaderData }) => {
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    const destinations = loaderData ?? [];
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title, description }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${pageUrl}#page`,
        url: pageUrl,
        name: "Texas Wildlife Destinations",
        description,
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Explore Texas", item: absoluteUrl(texasDefinedBrand, "/explore") },
            { "@type": "ListItem", position: 2, name: "Wildlife", item: pageUrl },
          ],
        },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: destinations.length,
          itemListElement: destinations.map((destination, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: destination.name,
            url: absoluteUrl(texasDefinedBrand, `/destination/${destination.slug}`),
          })),
        },
      })],
    };
  },
});
