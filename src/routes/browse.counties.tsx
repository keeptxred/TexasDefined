import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { CitationTrustPanel } from "@/components/authority/CitationTrustPanel";
import { AnswerSummary } from "@/components/content/AnswerSummary";
import { TexasCountyComparisonTable } from "@/components/counties/TexasCountyComparisonTable";
import {
  countyPropertyAnchor,
  TexasCountyPropertyDirectory,
} from "@/components/directories/TexasCountyPropertyDirectory";
import { Container } from "@/components/layout/Container";
import { loadTexasCountyComparison } from "@/data/county-comparison";
import { TEXAS_COUNTIES } from "@/data/texas-places";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const description =
  "Compare all 254 Texas counties by county seat, Census population, land area and communities, then continue to county property-tax guides and official local resources.";

export const Route = createFileRoute("/browse/counties")({
  loader: () => loadTexasCountyComparison(),
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
              name: "Texas county comparison and property-tax guides",
              numberOfItems: TEXAS_COUNTIES.length,
              itemListElement: TEXAS_COUNTIES.map((county, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: absoluteUrl(texasDefinedBrand, `/county/${county.slug}`),
                item: {
                  "@type": "AdministrativeArea",
                  name: county.name,
                  identifier: county.code,
                  sameAs: county.officialDirectoryUrl,
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
  component: CountyDirectoryPage,
});

function CountyDirectoryPage() {
  const counties = Route.useLoaderData();
  return <>
    <AnswerSummary
      eyebrow="Texas counties"
      title="How to use the county property-tax directory"
      items={[
        { question: "How many counties are covered?", answer: `All ${TEXAS_COUNTIES.length.toLocaleString("en-US")} Texas counties are represented in the comparison and directory.` },
        { question: "What can I compare?", answer: "Use county seat, 2020 Census population, land area and referenced communities for statewide orientation, then open the county guide for local context." },
        { question: "Does a county average determine property taxes?", answer: "No. Property taxes depend on the exact property, taxable value and every taxing unit serving that address. Use the linked county property-tax guide as a starting point, then verify the parcel locally." },
        { question: "Are Texas Defined tax figures official?", answer: "No. Texas Defined organizes Texas State Library and U.S. Census Bureau data and explains public tax information, but official local records remain the source of truth for current county services, property accounts, appraisal values, tax bills and deadlines." },
      ]}
    />
    <Container className="pb-8">
      <div className="border-y border-border py-5 text-sm">
        Looking for a specific county? <Link to="/county" className="font-semibold text-primary underline underline-offset-4">Browse the county guide index →</Link>
      </div>
      <TexasCountyComparisonTable rows={counties} />
      <CitationTrustPanel
        sources={[
          { name: 'Texas State Library and Archives Commission county-seat reference', url: 'https://www.tsl.texas.gov/ref/abouttx/countyseats.html' },
          { name: 'U.S. Census Bureau TIGERweb county data', url: 'https://tigerweb.geo.census.gov/arcgis/rest/services/Census2020/State_County/MapServer/1' },
        ]}
        methodology="Texas Defined matches all 254 county records to Texas county FIPS identifiers, then uses the state county-seat reference and Census county dataset for county seat, 2020 population and land area. Missing upstream values are shown as pending rather than inferred."
        lastVerified="Source data is fetched from the cited state and federal references when the comparison loads; individual local-service details are verified separately on county and property pages."
        title="County comparison sources and methodology"
      />
    </Container>
    <TexasCountyPropertyDirectory />
  </>;
}

void countyPropertyAnchor;
