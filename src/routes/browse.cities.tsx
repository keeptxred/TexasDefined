import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { AnswerSummary } from "@/components/content/AnswerSummary";
import { TexasPlaceDirectory } from "@/components/directories/TexasPlaceDirectory";
import { TEXAS_CITIES } from "@/data/texas-places";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const description =
  "Browse Texas cities and towns by name, county and region, then open city reference pages for local context, moving guidance and planning tools.";

export const Route = createFileRoute("/browse/cities")({
  head: () => {
    const pageUrl = absoluteUrl(texasDefinedBrand, "/browse/cities");
    const siteUrl = absoluteUrl(texasDefinedBrand, "/");
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath: "/browse/cities",
        title: "Texas Cities and Towns Directory | Find a Texas City",
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
            },
            {
              "@type": "ItemList",
              "@id": `${pageUrl}#cities`,
              name: "Texas cities",
              numberOfItems: TEXAS_CITIES.length,
              itemListElement: TEXAS_CITIES.map((city, index) => {
                const cityUrl = absoluteUrl(texasDefinedBrand, `/city/${city.slug}`);
                return {
                  "@type": "ListItem",
                  position: index + 1,
                  url: cityUrl,
                  item: {
                    "@type": "City",
                    "@id": `${cityUrl}#entity`,
                    url: cityUrl,
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
                };
              }),
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
  component: CitiesDirectoryPage,
});

function CitiesDirectoryPage() {
  return <>
    <AnswerSummary
      eyebrow="Texas cities"
      title="Find Texas cities and towns by county and region"
      items={[
        { question: "What is this directory?", answer: `A searchable starting point for ${TEXAS_CITIES.length.toLocaleString("en-US")} Texas cities in the current Texas Defined reference set, with direct links to city reference pages.` },
        { question: "How can I find what county a Texas city is in?", answer: "Each city entry identifies its Texas county and region. Open the city reference page for additional local context and related resources." },
        { question: "Can I use this to compare places to live?", answer: "Yes. Start with a city, then use the moving and financial tools for cost-of-living, salary, housing, utilities and relocation planning." },
        { question: "Is this an official government directory?", answer: "No. Texas Defined is an independent reference and editorial guide; verify official boundaries, services and records with the relevant city or county agency." },
      ]}
    />
    <TexasPlaceDirectory mode="cities" />
  </>;
}
