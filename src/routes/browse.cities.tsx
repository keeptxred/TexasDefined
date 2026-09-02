import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { CITY_AUTHORITY_SLUGS, cityAuthorityPath } from "@/data/city-authority-index";
import { TEXAS_CITIES } from "@/data/texas-places";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const description =
  "Browse Texas cities and towns by county and region, compare source-backed relocation context for cities and suburbs, then verify exact-address details with official school, tax, utility, flood, insurance and transportation sources.";
const cityAnchor = (slug: string) => `city-${slug}`;

export const Route = createFileRoute("/browse/cities")({
  head: () => {
    const pageUrl = absoluteUrl(texasDefinedBrand, "/browse/cities");
    const siteUrl = absoluteUrl(texasDefinedBrand, "/");
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath: "/browse/cities",
        title: "Texas Cities & Towns Directory | Browse by County & Region",
        description,
      }),
      links: [canonicalLink(texasDefinedBrand, "/browse/cities")],
      scripts: [
        jsonLd({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              "@id": `${pageUrl}#page`,
              url: pageUrl,
              name: "Texas Cities and Towns Directory",
              description,
              isPartOf: { "@id": `${siteUrl}#website` },
              publisher: { "@id": `${siteUrl}#organization` },
              mainEntity: { "@id": `${pageUrl}#cities` },
              breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
              about: [
                { "@type": "Thing", name: "Moving to Texas" },
                { "@type": "Thing", name: "Texas cities and suburbs" },
                { "@type": "Thing", name: "Texas relocation research" },
              ],
            },
            {
              "@type": "ItemList",
              "@id": `${pageUrl}#cities`,
              name: "Texas cities",
              numberOfItems: TEXAS_CITIES.length,
              itemListElement: TEXAS_CITIES.map((city, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: CITY_AUTHORITY_SLUGS.has(city.slug)
                  ? absoluteUrl(texasDefinedBrand, cityAuthorityPath(city.slug))
                  : `${pageUrl}#${cityAnchor(city.slug)}`,
                item: {
                  "@type": "City",
                  name: `${city.name}, Texas`,
                  containedInPlace: {
                    "@type": "AdministrativeArea",
                    name: `${city.county} County, Texas`,
                  },
                  additionalProperty: {
                    "@type": "PropertyValue",
                    name: "Texas region",
                    value: city.region,
                  },
                },
              })),
            },
            {
              "@type": "BreadcrumbList",
              "@id": `${pageUrl}#breadcrumb`,
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Front page",
                  item: siteUrl,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Texas cities and towns",
                  item: pageUrl,
                },
              ],
            },
          ],
        }),
      ],
    };
  },
});