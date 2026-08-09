import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { AnswerSummary } from "@/components/content/AnswerSummary";
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
        title: "Texas City Directory",
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
              name: "Texas City Directory",
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
                  name: "Front page",
                  item: absoluteUrl(texasDefinedBrand, "/"),
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Cities",
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
      title="How to use the Texas city directory"
      items={[
        { question: "What is this directory?", answer: `A searchable starting point for ${TEXAS_CITIES.length.toLocaleString("en-US")} Texas cities in the current Texas Defined reference set.` },
        { question: "What can I find for a city?", answer: "Use the directory to connect a city with its county and Texas region, then continue into local stories, moving guidance and nearby places where coverage is available." },
        { question: "Can I use this to compare places to live?", answer: "Yes. Start here to identify cities, then use the moving and financial tools for cost-of-living, salary, housing and relocation planning." },
        { question: "Is this an official government directory?", answer: "No. Texas Defined is an independent reference and editorial guide; verify official boundaries, services and records with the relevant city or county agency." },
      ]}
    />
    <TexasPlaceDirectory mode="cities" />
  </>;
}
