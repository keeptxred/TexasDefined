import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { TEXAS_CITIES } from "@/data/texas-places";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const description =
  "Compare Texas cities and suburbs for a move using transparent region, setting, commute and planning context, then browse the full city directory by county and region and verify exact-address details with official sources.";
const cityAnchor = (slug: string) => `city-${slug}`;

export const Route = createFileRoute("/browse/cities")({
  head: () => {
    const pageUrl = absoluteUrl(texasDefinedBrand, "/browse/cities");
    const siteUrl = absoluteUrl(texasDefinedBrand, "/");
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath: "/browse/cities",
        title: "Compare Texas Cities & Suburbs Before You Move",
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
              name: "Compare Texas Cities and Suburbs Before You Move",
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
                url: `${pageUrl}#${cityAnchor(city.slug)}`,
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
                  name: "Texas cities and suburbs",
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