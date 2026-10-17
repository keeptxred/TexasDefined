import { createFileRoute, notFound } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const waterParkRoute = (slug: string) => `/explore/water-parks/${slug}`;
const internalPlace = (park: {slug: string}) => absoluteUrl(texasDefinedBrand, waterParkRoute(park.slug));

export const Route = createFileRoute("/explore/water-parks/$slug")({
  loader: async ({ params }) => {
    const { texasWaterParksBySlug } = await import("@/data/texas-water-parks");
    const park = texasWaterParksBySlug.get(params.slug);
    if (!park) throw notFound();
    return park;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ name: "robots", content: "noindex, nofollow" }] };
    const park = loaderData;
    const canonicalPath = waterParkRoute(params.slug);
    const url = internalPlace(park);
    const description = `${park.name} in ${park.city}, Texas: ${park.summary} Check admission, indoor/outdoor setting, season planning and the official park source.`;
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: `${park.name}: Visitor Guide`,
        robots: park.authorityReady ? undefined : "noindex, follow",
        description,
        modifiedTime: "2026-10-17T12:00:00-05:00",
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "WebPage", "@id": url + "#page", url, name: park.name + " visitor guide", description, dateModified: park.reviewedAt, citation: [park.officialUrl], mainEntity: { "@id": url + "#place" } },
          { "@type": "TouristAttraction", "@id": url + "#place", name: park.name, url, description: park.summary,
            sameAs: park.officialUrl,
            address: { "@type": "PostalAddress", addressLocality: park.city, addressRegion: "TX", addressCountry: "US" },
            touristType: [park.setting, park.kind] },
          { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl(texasDefinedBrand, "/") },
            { "@type": "ListItem", position: 2, name: "Explore", item: absoluteUrl(texasDefinedBrand, "/explore") },
            { "@type": "ListItem", position: 3, name: "Texas water parks", item: absoluteUrl(texasDefinedBrand, "/explore/water-parks") },
            { "@type": "ListItem", position: 4, name: park.name, item: url },
          ] },
        ],
      })],
    };
  },
});
