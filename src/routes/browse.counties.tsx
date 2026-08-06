import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import {
  countyPropertyAnchor,
  TexasCountyPropertyDirectory,
} from "@/components/directories/TexasCountyPropertyDirectory";
import { TEXAS_COUNTIES } from "@/data/texas-places";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const description =
  "Find any of Texas' 254 counties, open a county property-tax guide, then continue to official local offices, appraisal records and public services.";

export const Route = createFileRoute("/browse/counties")({
  head: () => {
    const pageUrl = absoluteUrl(texasDefinedBrand, "/browse/counties");
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath: "/browse/counties",
        title: "Find Your County Property-Tax Guide",
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
              name: "Find Your County Property-Tax Guide",
              description,
              isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` },
              publisher: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#organization` },
              mainEntity: { "@id": `${pageUrl}#counties` },
            },
            {
              "@type": "ItemList",
              "@id": `${pageUrl}#counties`,
              name: "Texas county property-tax guides",
              numberOfItems: TEXAS_COUNTIES.length,
              itemListElement: TEXAS_COUNTIES.map((county, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: absoluteUrl(texasDefinedBrand, `/property-tax/county/${county.slug}`),
                item: {
                  "@type": "WebPage",
                  "@id": absoluteUrl(texasDefinedBrand, `/property-tax/county/${county.slug}`),
                  url: absoluteUrl(texasDefinedBrand, `/property-tax/county/${county.slug}`),
                  name: `${county.name} Property-Tax Guide`,
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
                  name: "County property-tax guides",
                  item: pageUrl,
                },
              ],
            },
          ],
        }),
      ],
    };
  },
  component: TexasCountyPropertyDirectory,
});

void countyPropertyAnchor;
