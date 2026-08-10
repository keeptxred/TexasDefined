import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { AnswerSummary } from "@/components/content/AnswerSummary";
import {
  countyPropertyAnchor,
  TexasCountyPropertyDirectory,
} from "@/components/directories/TexasCountyPropertyDirectory";
import { Container } from "@/components/layout/Container";
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
        title: "Texas County Property-Tax Directory",
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
              name: "Texas County Property-Tax Directory",
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
                  name: "Front page",
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
  component: CountyDirectoryPage,
});

function CountyDirectoryPage() {
  return <>
    <AnswerSummary
      eyebrow="Texas counties"
      title="How to use the county property-tax directory"
      items={[
        { question: "How many counties are covered?", answer: `All ${TEXAS_COUNTIES.length.toLocaleString("en-US")} Texas counties are represented in this directory.` },
        { question: "What can I find for each county?", answer: "Open the county guide to continue into property-tax information and links to relevant official local offices, appraisal records and public services." },
        { question: "Are Texas Defined tax figures official?", answer: "No. Texas Defined explains and organizes public information, but appraisal values, tax bills, exemptions, deadlines and official records must be confirmed with the appropriate county or appraisal district." },
        { question: "Where should homeowners start?", answer: "Find your county first, then use the related property-tax guides, exemption resources and calculators to understand the questions you need to verify locally." },
      ]}
    />
    <Container className="pb-8">
      <div className="border-y border-border py-5 text-sm">
        Looking for the full county profiles rather than property-tax pages? <Link to="/county" className="font-semibold text-primary underline underline-offset-4">Browse all 254 Texas county guides →</Link>
      </div>
    </Container>
    <TexasCountyPropertyDirectory />
  </>;
}

void countyPropertyAnchor;
