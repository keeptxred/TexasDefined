import { texasDefinedBrand } from "@/brand/texasdefined";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";
import type { WaterParkGuide } from "@/data/texas-water-parks";

const hubPath = "/explore/water-parks";
const hubDescription = "Find Texas water parks by region, indoor or outdoor setting, and admission style. Compare destination parks, public indoor parks, city water parks and resort-only facilities with official links.";
const parkPath = (slug: string) => `/explore/water-parks/${slug}`;

export function makeWaterParkIndexHead(parks: Array<{slug: string; name: string}>) {
  const url = absoluteUrl(texasDefinedBrand, hubPath);
  return {
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: hubPath,
      title: "Texas Water Parks: Indoor, Outdoor & Resort Guide",
      description: hubDescription,
    }),
    links: [canonicalLink(texasDefinedBrand, hubPath)],
    scripts: [jsonLd({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "CollectionPage", "@id": url + "#page", url, name: "Texas Water Parks", description: hubDescription, mainEntity: { "@id": url + "#parks" } },
        { "@type": "ItemList", "@id": url + "#parks", numberOfItems: parks.length,
          itemListElement: parks.map((park, index) => ({
            "@type": "ListItem", position: index + 1, name: park.name,
            url: absoluteUrl(texasDefinedBrand, parkPath(park.slug)),
          })),
        },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl(texasDefinedBrand, "/") },
          { "@type": "ListItem", position: 2, name: "Explore", item: absoluteUrl(texasDefinedBrand, "/explore") },
          { "@type": "ListItem", position: 3, name: "Water parks", item: url },
        ] },
      ],
    })],
  };
}

export function makeWaterParkDetailHead(park: WaterParkGuide, slug: string) {
  const canonicalPath = parkPath(slug);
  const url = absoluteUrl(texasDefinedBrand, canonicalPath);
  const description = `${park.name} in ${park.city}, Texas: ${park.summary} Check admission, indoor/outdoor setting, season planning and the official park source.`;
  return {
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: `${park.name}: Visitor Guide`,
      robots: park.authorityReady ? undefined : "noindex, follow",
      description,
      image: park.licensedMedia?.src,
      imageAlt: park.licensedMedia?.alt,
      modifiedTime: "2026-10-17T12:00:00-05:00",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "WebPage", "@id": url + "#page", url, name: park.name + " visitor guide",
          description, dateModified: park.reviewedAt, citation: [park.officialUrl], mainEntity: { "@id": url + "#place" } },
        { "@type": "TouristAttraction", "@id": url + "#place", name: park.name, url, description: park.summary,
          sameAs: park.officialUrl,
          ...(park.licensedMedia ? { image: { "@id": url + "#historic-photo" } } : {}),
          address: { "@type": "PostalAddress", addressLocality: park.city, addressRegion: "TX", addressCountry: "US" },
          touristType: [park.setting, park.kind] },
        ...(park.licensedMedia ? [{
          "@type": "ImageObject", "@id": url + "#historic-photo",
          contentUrl: park.licensedMedia.src,
          url: park.licensedMedia.sourceUrl,
          license: park.licensedMedia.licenseUrl,
          creditText: park.licensedMedia.photographer,
          caption: park.licensedMedia.alt,
          dateCreated: String(park.licensedMedia.year),
          acquireLicensePage: park.licensedMedia.sourceUrl,
        }] : []),
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl(texasDefinedBrand, "/") },
          { "@type": "ListItem", position: 2, name: "Explore", item: absoluteUrl(texasDefinedBrand, "/explore") },
          { "@type": "ListItem", position: 3, name: "Texas water parks", item: absoluteUrl(texasDefinedBrand, hubPath) },
          { "@type": "ListItem", position: 4, name: park.name, item: url },
        ] },
      ],
    })],
  };
}
