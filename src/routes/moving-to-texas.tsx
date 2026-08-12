import { createFileRoute } from "@tanstack/react-router";

import roadTrip from "@/assets/road-trip.jpg";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { CitationTrustPanel } from "@/components/authority/CitationTrustPanel";
import { TexasCountyComparisonTable } from "@/components/counties/TexasCountyComparisonTable";
import { CategoryPage } from "@/components/editorial/CategoryPage";
import { Container } from "@/components/layout/Container";
import { loadTexasCountyComparison, populationRankedCounties, type TexasCountyComparisonRow } from "@/data/county-comparison";
import { articlesQuery, destinationsQuery, regionsQuery } from "@/data/queries";
import type { Article, Destination } from "@/data/types";
import { buildEditorialCollectionHead, buildMeta, canonicalLink } from "@/lib/seo";

const description = "A clear-eyed guide to choosing a Texas city or county, understanding the cost and property context, finding a home and settling into everyday life in a very large state.";
const imageAlt = "A two-lane Texas farm road running to the horizon";
const seoTitle = "Moving to Texas: County Comparison, Cities & What to Know";

type MovingToTexasLoaderData = {
  articles: Article[];
  destinations: Destination[];
  counties: TexasCountyComparisonRow[];
};

export const Route = createFileRoute("/moving-to-texas")({
  head: ({ loaderData }: { loaderData?: MovingToTexasLoaderData }) => loaderData ? buildEditorialCollectionHead(texasDefinedBrand, {
    canonicalPath: "/moving-to-texas",
    title: seoTitle,
    collectionName: "Moving to Texas",
    description,
    image: roadTrip,
    imageAlt,
    imageWidth: 1600,
    imageHeight: 1067,
    breadcrumbParentName: "Texas Life",
    breadcrumbParentPath: "/texas-living",
    items: [
      ...loaderData.articles.map((article) => ({ type: "Article" as const, name: article.title, url: `/article/${article.slug}`, image: article.hero.src, description: article.dek })),
      ...loaderData.destinations.map((destination) => ({ type: "TouristAttraction" as const, name: destination.name, url: `/destination/${destination.slug}`, image: destination.hero.src, description: destination.summary })),
    ],
  }) : ({ meta: buildMeta(texasDefinedBrand, { canonicalPath: "/moving-to-texas", title: seoTitle, description, image: roadTrip, imageAlt, imageWidth: 1600, imageHeight: 1067 }), links: [canonicalLink(texasDefinedBrand, "/moving-to-texas")] }),
  loader: async ({ context }): Promise<MovingToTexasLoaderData> => {
    const [articles, destinations, counties] = await Promise.all([
      context.queryClient.ensureQueryData(articlesQuery({ category: "moving-to-texas" })),
      context.queryClient.ensureQueryData(destinationsQuery({ category: "moving-to-texas" })),
      loadTexasCountyComparison(),
      context.queryClient.ensureQueryData(regionsQuery()),
    ]);
    return { articles, destinations, counties };
  },
  component: MovingToTexasPage,
});

function MovingToTexasPage() {
  const { counties } = Route.useLoaderData();
  const largestCounties = populationRankedCounties(counties, 20);
  return <>
    <CategoryPage category="moving-to-texas" eyebrow="The relocation guide" title="What to know before you move to Texas" intro={description} image={{ src: roadTrip, alt: imageAlt, width: 1600, height: 1067 }} />
    <Container className="pb-16 sm:pb-24">
      <TexasCountyComparisonTable
        rows={largestCounties}
        title="Largest Texas counties by 2020 Census population"
        description="Use this as an orientation layer, not a best-places ranking. County population and land area can help frame a move, but housing costs, schools, commute, property taxes and local services require address-level research."
      />
      <p className="-mt-5 mb-10 text-sm text-muted-foreground"><a href="/browse/counties" className="font-semibold text-primary underline underline-offset-4">Compare all 254 Texas counties →</a></p>
      <CitationTrustPanel
        sources={[
          { name: 'Texas State Library and Archives Commission county-seat reference', url: 'https://www.tsl.texas.gov/ref/abouttx/countyseats.html' },
          { name: 'U.S. Census Bureau TIGERweb county data', url: 'https://tigerweb.geo.census.gov/arcgis/rest/services/Census2020/State_County/MapServer/1' },
        ]}
        methodology="The relocation comparison ranks counties only by 2020 Census population and displays source-backed county seat, land area and referenced communities. Texas Defined does not turn those fields into a subjective best-county score."
        lastVerified="County comparison values are fetched from the cited state and federal references when the page loads; local moving decisions should be verified with current local sources."
        title="Relocation comparison sources and methodology"
      />
    </Container>
  </>;
}
