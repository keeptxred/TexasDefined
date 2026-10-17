import { createFileRoute } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/water-parks";
const description = "Find Texas water parks by region, indoor or outdoor setting, and admission style. Compare destination parks, public indoor parks, city water parks and resort-only facilities with official links.";

export const Route = createFileRoute("/explore/water-parks/")({
  loader: async () => (await import("@/data/texas-water-parks")).texasWaterParks.map(({slug,name}) => ({slug,name})),
  head: ({ loaderData }) => {
    const url = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: "Texas Water Parks: Indoor, Outdoor & Resort Guide",
        description,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "CollectionPage", "@id": url + "#page", url, name: "Texas Water Parks", description, mainEntity: { "@id": url + "#parks" } },
          { "@type": "ItemList", "@id": url + "#parks", numberOfItems: (loaderData?.length ?? 0), itemListElement: (loaderData ?? []).map((park, index) => ({
            "@type": "ListItem", position: index + 1, name: park.name, url: absoluteUrl(texasDefinedBrand, `/explore/water-parks/${park.slug}`),
          })) },
          { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl(texasDefinedBrand, "/") },
            { "@type": "ListItem", position: 2, name: "Explore", item: absoluteUrl(texasDefinedBrand, "/explore") },
            { "@type": "ListItem", position: 3, name: "Water parks", item: url },
          ] },
        ],
      })],
    };
  },
});
