import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { COUNTY_PROPERTY_RECORDS } from "@/data/property/county-property-data";
import { isCountyPropertyIndexReady } from "@/data/property/county-property-schema";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const description =
  "Compare all 254 Texas counties by county seat, Census population, land area and communities, then continue to verified county property-tax guides and official local resources.";
const verifiedPropertyCounties = COUNTY_PROPERTY_RECORDS.filter(isCountyPropertyIndexReady);
export const verifiedPropertySlugs = verifiedPropertyCounties.map((county) => county.slug);

export const Route = createFileRoute("/browse/counties")({
  loader: async () => {
    const { loadTexasCountyComparison } = await import("@/data/county-comparison");
    return loadTexasCountyComparison();
  },
  head: () => {
    const pageUrl = absoluteUrl(texasDefinedBrand, "/browse/counties");
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath: "/browse/counties",
        title: "Texas Counties Comparison & Property-Tax Directory",
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
              name: "Texas Counties Comparison & Property-Tax Directory",
              description,
              isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` },
              publisher: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#organization` },
              mainEntity: { "@id": `${pageUrl}#counties` },
            },
            {
              "@type": "ItemList",
              "@id": `${pageUrl}#counties`,
              name: "Verified Texas county property-tax guides",
              numberOfItems: verifiedPropertyCounties.length,
              itemListElement: verifiedPropertyCounties.map((county, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: absoluteUrl(texasDefinedBrand, `/property-tax/county/${county.slug}`),
                item: {
                  "@type": "WebPage",
                  name: `${county.name} property-tax guide`,
                  url: absoluteUrl(texasDefinedBrand, `/property-tax/county/${county.slug}`),
                  about: {
                    "@type": "AdministrativeArea",
                    name: county.name,
                    identifier: county.code,
                    sameAs: county.officialDirectoryUrl,
                  },
                },
              })),
            },
            {
              "@type": "BreadcrumbList",
              "@id": `${pageUrl}#breadcrumb`,
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Front page", item: absoluteUrl(texasDefinedBrand, "/") },
                { "@type": "ListItem", position: 2, name: "Texas counties", item: pageUrl },
              ],
            },
          ],
        }),
      ],
    };
  },
});
