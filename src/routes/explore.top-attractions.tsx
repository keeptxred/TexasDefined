import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { DestinationCard } from "@/components/editorial/DestinationCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { destinationsQuery } from "@/data/queries";
import { TOP_TEXAS_ATTRACTIONS } from "@/data/top-texas-attractions";
import type { Destination } from "@/data/types";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/top-attractions";
const title = "Top 25 Texas Attractions | Texas Defined";
const description = "Twenty-five landmark Texas experiences, from the Alamo and River Walk to Big Bend, the Gulf Coast, museums, caverns, gardens and historic districts — with practical trip-planning guides for each stop.";

function rankDestinations(destinations: Destination[]) {
  const bySlug = new Map(destinations.map((destination) => [destination.slug, destination]));
  return TOP_TEXAS_ATTRACTIONS.flatMap((entry) => {
    const destination = bySlug.get(entry.slug);
    return destination ? [{ ...entry, destination }] : [];
  });
}

export const Route = createFileRoute("/explore/top-attractions")({
  loader: async ({ context }) => {
    const destinations = await context.queryClient.ensureQueryData(destinationsQuery({ limit: 5000 }));
    return rankDestinations(destinations);
  },
  head: ({ loaderData }) => {
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    const attractions = loaderData ?? [];
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title, description }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CollectionPage",
            "@id": `${pageUrl}#page`,
            url: pageUrl,
            name: "Top 25 Texas Attractions",
            description,
            mainEntity: { "@id": `${pageUrl}#attractions` },
          },
          {
            "@type": "ItemList",
            "@id": `${pageUrl}#attractions`,
            name: "Top 25 Texas Attractions",
            numberOfItems: attractions.length,
            itemListOrder: "https://schema.org/ItemListOrderAscending",
            itemListElement: attractions.map(({ rank, destination }) => ({
              "@type": "ListItem",
              position: rank,
              name: destination.name,
              url: absoluteUrl(texasDefinedBrand, `/destination/${destination.slug}`),
            })),
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Front page", item: absoluteUrl(texasDefinedBrand, "/") },
              { "@type": "ListItem", position: 2, name: "Explore Texas", item: absoluteUrl(texasDefinedBrand, "/explore") },
              { "@type": "ListItem", position: 3, name: "Top 25 Texas Attractions", item: pageUrl },
            ],
          },
        ],
      })],
    };
  },
  component: TopAttractionsPage,
});

function TopAttractionsPage() {
  const attractions = Route.useLoaderData();

  return <>
    <Container className="pb-8 pt-12 sm:pt-16">
      <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
        <Link to="/">Front page</Link><span aria-hidden="true" className="mx-2">/</span><Link to="/explore">Explore</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page">Top 25 attractions</span>
      </nav>
      <header className="py-10 sm:py-14">
        <p className="eyebrow text-primary">The Texas essential list</p>
        <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">25 Texas attractions worth building a trip around</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">From missions and presidential history to desert national parks, Gulf beaches, caverns, gardens and big-city museums, these are 25 places that make a strong first map of Texas. Each guide includes practical visit planning and a full “what’s in the area” section so the attraction can become part of a larger trip.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/explore/trip-planner" className="inline-flex items-center bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">Build a Texas trip →</Link>
          <Link to="/explore/attractions-comparison" className="inline-flex items-center border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary">Compare destinations →</Link>
        </div>
      </header>
    </Container>

    <Section tone="surface">
      <Container>
        <SectionHeader eyebrow="The full list" title="TexasDefined’s Top 25" description="Open any attraction for the full guide, nearby places, food and lodging areas, family stops, side trips, maps and a direct handoff to the Trip Planner." />
        <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {attractions.map(({ rank, destination }) => <li key={destination.slug} className="relative">
            <div className="mb-3 flex items-baseline gap-3 border-b border-border pb-3">
              <span className="font-display text-4xl leading-none text-primary">{String(rank).padStart(2, "0")}</span>
              <span className="eyebrow text-muted-foreground">Top Texas attraction</span>
            </div>
            <DestinationCard destination={destination} />
          </li>)}
        </ol>
      </Container>
    </Section>

    <Section>
      <Container>
        <div className="grid gap-8 border-y border-border py-10 md:grid-cols-3">
          <div><p className="eyebrow text-primary">Turn the list into a route</p><h2 className="mt-2 font-display text-3xl">Start with one stop</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">Every attraction page can seed the TexasDefined Trip Planner, which then scores other destinations around your starting point.</p></div>
          <Link to="/explore/trip-planner" className="group border-t border-border pt-5 md:border-l md:border-t-0 md:pl-8"><strong className="font-display text-2xl transition-colors group-hover:text-primary">Build an itinerary</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Choose your pace, interests and trip length, then start with a favorite attraction.</span><span className="eyebrow mt-4 inline-block text-primary">Open Trip Planner →</span></Link>
          <Link to="/explore/attractions-comparison" className="group border-t border-border pt-5 md:border-l md:border-t-0 md:pl-8"><strong className="font-display text-2xl transition-colors group-hover:text-primary">Compare the broader catalog</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Go beyond the Top 25 and compare TexasDefined destinations by region, season and planning notes.</span><span className="eyebrow mt-4 inline-block text-primary">Compare attractions →</span></Link>
        </div>
      </Container>
    </Section>
  </>;
}
