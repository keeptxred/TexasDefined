import { lazy, Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { ArticleCard } from "@/components/editorial/ArticleCard";
import { DepartmentHero } from "@/components/editorial/DepartmentHero";
import { DestinationCard } from "@/components/editorial/DestinationCard";
import { ExploreIntentPaths } from "@/components/editorial/ExploreIntentPaths";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { articlesQuery, categoriesQuery, destinationsQuery, regionsQuery } from "@/data/queries";

import { description, EXPLORE_CATEGORIES } from "./explore.index";

const TexasExperienceMarkets = lazy(() =>
  import("@/components/editorial/TexasExperienceMarkets").then((module) => ({ default: module.TexasExperienceMarkets })),
);

export const Route = createLazyFileRoute("/explore/")({ component: ExplorePage });

function ExplorePage() {
  const { data: categories } = useSuspenseQuery(categoriesQuery());
  const { data: regions } = useSuspenseQuery(regionsQuery());
  const { data: destinations } = useSuspenseQuery(destinationsQuery({ featured: true }));
  const { data: articles } = useSuspenseQuery(articlesQuery({ limit: 6 }));
  const exploreCategories = categories.filter((category) => (EXPLORE_CATEGORIES as readonly string[]).includes(category.slug));

  return <>
    <DepartmentHero current="Explore" eyebrow="The Texas guide" title="Explore Texas, one good road at a time" description={description} />

    <ExploreIntentPaths />
    <Container className="pb-4 pt-8">
      <div className="grid border-y border-border lg:grid-cols-3">
        <Link to="/explore/top-attractions" className="group flex items-center justify-between gap-5 py-5 lg:border-r lg:pr-8"><div><p className="eyebrow text-primary">Texas essentials</p><h2 className="mt-1 font-display text-2xl group-hover:text-primary">Explore the Top 25 Texas attractions</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Start with 25 landmark experiences, each with a full visit guide, nearby stops and direct Trip Planner handoff.</p></div><span className="shrink-0 font-semibold text-primary">Top 25 →</span></Link>
        <Link to="/explore/attractions-comparison" className="group flex items-center justify-between gap-5 border-t border-border py-5 lg:border-r lg:border-t-0 lg:px-8"><div><p className="eyebrow text-primary">Structured comparison</p><h2 className="mt-1 font-display text-2xl group-hover:text-primary">Compare the Texas Defined attractions catalog</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">See destinations across categories by region, season guidance, highlights, planning notes and official source.</p></div><span className="shrink-0 font-semibold text-primary">Compare →</span></Link>
        <Link to="/explore/painted-churches" className="group flex items-center justify-between gap-5 border-t border-border py-5 lg:border-t-0 lg:pl-8"><div><p className="eyebrow text-primary">Texas heritage reference</p><h2 className="mt-1 font-display text-2xl group-hover:text-primary">Research and visit the Painted Churches of Texas</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Use the statewide verified collection, interactive map, routes, artists, symbols, preservation records and then-and-now archive project.</p></div><span className="shrink-0 font-semibold text-primary">Churches →</span></Link>
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Link to="/explore/aquariums" className="group grid gap-5 border border-border bg-surface p-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:p-8">
          <div>
            <p className="eyebrow text-primary">Aquariums · conservation · coastal science</p>
            <h2 className="mt-2 font-display text-3xl leading-tight group-hover:text-primary">Explore Texas aquariums & marine life</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">Compare 17 aquarium, marine-center and aquatic zoo guides across Texas, with county context, current official visitor sources and practical trip-planning notes.</p>
          </div>
          <span className="font-semibold text-primary">Aquariums →</span>
        </Link>
        <a href="#tours-experiences" className="group grid gap-5 border border-border bg-surface p-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:p-8">
          <div>
            <p className="eyebrow text-primary">Tours · tickets · bookable experiences</p>
            <h2 className="mt-2 font-display text-3xl leading-tight group-hover:text-primary">Find Texas tours & experiences</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">Browse statewide experience markets for sightseeing, history, barbecue, wine, water activities, Western culture, museums, family attractions and day trips.</p>
          </div>
          <span className="font-semibold text-primary">Experiences ↓</span>
        </a>
      </div>
    </Container>

    <Section>
      <Container>
        <SectionHeader eyebrow="The guide by subject" title="Find your way into Texas" description="Rivers, parks, caverns, beaches, historic places, small towns and road trips — organized as a field guide to the state." />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{exploreCategories.map((category) => <li key={category.slug}><Link to="/explore/$category" params={{ category: category.slug }} className="group relative block overflow-hidden bg-surface">{category.image ? <img src={category.image.src} alt={category.image.alt} width={category.image.width} height={category.image.height} loading="lazy" decoding="async" className="aspect-[5/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]" /> : <div className="aspect-[5/4] w-full bg-gradient-to-br from-primary/25 via-surface to-accent/25" aria-hidden="true" />}<div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-6 text-ink-foreground"><p className="eyebrow opacity-75">{category.eyebrow}</p><h2 className="mt-2 font-display text-[2rem] leading-none">{category.name}</h2><p className="mt-3 text-sm leading-6 text-ink-foreground/82">{category.description}</p></div></Link></li>)}</ul>
      </Container>
    </Section>

    <Suspense fallback={<div id="tours-experiences" aria-hidden="true" />}>
      <TexasExperienceMarkets />
    </Suspense>

    <Section tone="surface"><Container><SectionHeader eyebrow="Travel regions" title="Familiar trip-planning lenses, connected to the canonical map" description="Hill Country, Big Bend, Piney Woods and other established travel identities remain useful for planning. TexasDefined cross-walks them to one seven-region statewide geography instead of making them compete with it." /><div className="mt-7 border-y border-border py-5 sm:flex sm:items-center sm:justify-between sm:gap-8"><div><p className="font-semibold">Need the statewide geography?</p><p className="mt-1 text-sm leading-6 text-muted-foreground">Open North Texas, Central Texas, East Texas, South Texas, West Texas, Gulf Coast and the Panhandle with their subregions, metros, cities and relocation context.</p></div><Link to="/regions" className="eyebrow mt-4 inline-block shrink-0 border-b border-primary pb-1 text-primary sm:mt-0">See the 7 canonical regions →</Link></div><ul className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">{regions.map((region) => <li key={region.id} className="border-t border-border pt-5"><Link to="/explore/region/$region" params={{ region: region.id }} className="group block"><h3 className="font-display text-[1.7rem] leading-tight transition-colors group-hover:text-primary">{region.name}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{region.blurb}</p><span className="eyebrow mt-4 inline-block text-primary">Explore the travel region →</span></Link></li>)}</ul></Container></Section>

    {destinations.length > 0 && <Section><Container><SectionHeader eyebrow="Featured places" title="A few places to start" description="A rotating selection of destinations that capture different corners of Texas." /><ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">{destinations.map((destination) => <li key={destination.id}><DestinationCard destination={destination} regionLabel={regions.find((r) => r.id === destination.region)?.name} /></li>)}</ul></Container></Section>}

    <Section tone="surface"><Container><SectionHeader eyebrow="Field notes" title="Stories from across Texas" description="Read before you go, or save one for the road." /><ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">{articles.map((article) => <li key={article.id}><ArticleCard article={article} size="compact" /></li>)}</ul></Container></Section>
  </>;
}
