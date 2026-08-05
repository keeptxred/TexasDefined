import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { cityAnchor, TexasPlaceDirectory } from "@/components/directories/TexasPlaceDirectory";
import { TEXAS_CITIES } from "@/data/texas-places";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const description =
  "Find a city by name, county or region, then discover local stories, moving guidance and nearby places worth knowing.";

export const Route = createFileRoute("/browse/cities")({
  head: () => {
    const pageUrl = absoluteUrl(texasDefinedBrand, "/browse/cities");
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath: "/browse/cities",
        title: "Find a City",
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
              name: "Find a City",
              description,
              isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` },
              publisher: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#organization` },
              mainEntity: { "@id": `${pageUrl}#cities` },
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
                  "@id": `${pageUrl}#${cityAnchor(city.slug)}`,
                  name: city.name,
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
                  name: "Home",
                  item: absoluteUrl(texasDefinedBrand, "/"),
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Find a City",
                  item: pageUrl,
                },
              ],
            },
          ],
        }),
      ],
    };
  },
  component: () => <TexasPlaceDirectory mode="cities" />,
});
