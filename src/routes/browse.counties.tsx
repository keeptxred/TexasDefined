import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { countyAnchor, TexasPlaceDirectory } from "@/components/directories/TexasPlaceDirectory";
import { TEXAS_COUNTIES } from "@/data/texas-places";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const description =
  "Find any of Texas' 254 counties and head straight to official local offices, appraisal information, elections and public services.";

export const Route = createFileRoute("/browse/counties")({
  head: () => {
    const pageUrl = absoluteUrl(texasDefinedBrand, "/browse/counties");
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath: "/browse/counties",
        title: "Find Your Texas County",
        description,
      }),
      links: [canonicalLink(texasDefinedBrand, "/browse/counties")],
      scripts: [
        jsonLd({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              "@id": `${pageUrl}#page`,
              url: pageUrl,
              name: "Find Your Texas County",
              description,
              isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` },
              publisher: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#organization` },
              mainEntity: { "@id": `${pageUrl}#counties` },
            },
            {
              "@type": "ItemList",
              "@id": `${pageUrl}#counties`,
              name: "Texas county directory",
              numberOfItems: TEXAS_COUNTIES.length,
              itemListElement: TEXAS_COUNTIES.map((county, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: `${pageUrl}#${countyAnchor(county.slug)}`,
                item: {
                  "@type": "AdministrativeArea",
                  "@id": `${pageUrl}#${countyAnchor(county.slug)}`,
                  name: county.name,
                  containedInPlace: {
                    "@type": "State",
                    name: "Texas",
                  },
                  sameAs: county.officialDirectoryUrl,
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
                  name: "Texas Counties",
                  item: pageUrl,
                },
              ],
            },
          ],
        }),
      ],
    };
  },
  component: () => <TexasPlaceDirectory mode="counties" />,
});
