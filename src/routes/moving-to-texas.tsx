import { createFileRoute, Link } from "@tanstack/react-router";

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

const arrivalTasks = [
  ["Texas driver license", "/texas-drivers-license", "Start here for renewals, appointments, REAL ID, replacements and address changes, with direct links to the official DPS transaction pages."],
  ["Texas vehicle registration", "/texas-vehicle-registration", "Understand registration, renewal and the role of TxDMV and your county tax assessor-collector."],
  ["Texas DMV", "/texas-dmv", "Use the TxDMV guide for titles, vehicle registration, dealers and motor-carrier services."],
  ["Find my DMV or county office", "/find-my-dmv", "Move from statewide rules to the local office that actually serves your county."],
  ["Texas cost-of-living calculator", "/texas-cost-of-living-calculator", "Compare household-budget assumptions before choosing a city or signing a lease."],
  ["Texas resources", "/texas-resources", "Open Texas Defined's practical guidebook for moving, driving, property, money, travel and everyday Texas life."],
] as const;

type MovingToTexasLoaderData = {
  articles: Article[];
  destinations: Destination[];
  counties: TexasCountyComparisonRow[];
};

function editorialCollectionPayload(articles: Article[], destinations: Destination[]) {
  return { articles, destinations };
}

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
    ]);
    await context.queryClient.ensureQueryData(regionsQuery());
    const editorial = editorialCollectionPayload(articles, destinations);
    return { ...editorial, counties };
  },
  component: MovingToTexasPage,
});

function MovingToTexasPage() {
  const { counties } = Route.useLoaderData();
  const largestCounties = populationRankedCounties(counties, 20);
  return <>
    <CategoryPage category="moving-to-texas" eyebrow="The relocation guide" title="What to know before you move to Texas" intro={description} image={{ src: roadTrip, alt: imageAlt, width: 1600, height: 1067 }} />
    <Container className="pb-16 sm:pb-24">
      <section className="mb-12 border-y border-border py-8" aria-labelledby="moving-texas-paperwork">
        <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
          <div>
            <p className="eyebrow text-primary">After you arrive</p>
            <h2 id="moving-texas-paperwork" className="mt-2 font-display text-3xl leading-tight">Texas paperwork without the agency confusion</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">Texas splits driver licensing and vehicle services between different systems. These practical guides route you to the right transaction and official source before you make an appointment or start paperwork.</p>
          </div>
          <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
            {arrivalTasks.map(([title, to, copy]) => <Link key={to} to={to} className="group bg-background p-5">
              <h3 className="font-display text-2xl leading-tight transition-colors group-hover:text-primary">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
              <span className="eyebrow mt-5 inline-block text-primary">Open guide →</span>
            </Link>)}
          </div>
        </div>
      </section>
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
