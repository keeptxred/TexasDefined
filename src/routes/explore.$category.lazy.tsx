import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { AnswerSummary } from "@/components/content/AnswerSummary";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { CategoryPage } from "@/components/editorial/CategoryPage";
import { DestinationCollectionGrid } from "@/components/editorial/DestinationCollectionGrid";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { TopAttractionCollectionLinks } from "@/components/editorial/TopAttractionCollectionLinks";
import { ExploreDestinationComparison, type ExploreComparisonKind } from "@/components/explore/ExploreDestinationComparison";
import { Container } from "@/components/layout/Container";
import { categoriesQuery, regionsQuery } from "@/data/queries";
import type { Article, Category, CategorySlug, Destination, Region } from "@/data/types";
import { SWIMMING_HOLES_RIVER_TUBING_SLUG } from "@/data/water-recreation";

const COMPARISON_CATEGORIES = new Set<ExploreComparisonKind>(['state-parks', 'lakes-rivers', 'small-towns', 'road-trips']);
const PAINTED_CHURCH_CROSS_LINK_CATEGORIES = new Set(['historic-sites', 'road-trips', 'small-towns']);
const WATER_RECREATION_PARENT_CATEGORIES = new Set(['lakes-rivers', 'major-springs', 'state-parks']);

export const Route = createLazyFileRoute("/explore/$category")({ component: ExploreCategoryPage });

function SwimmingHolesRiverTubingPage({ category, destinations, articles, regions }: { category: Category; destinations: Destination[]; articles: Article[]; regions: Region[] }) {
  const regionName = (id: string) => regions.find((region) => region.id === id)?.name;
  const image = category.image;
  const planningLinks = [
    { to: "/explore/lakes-rivers", label: "Lakes & Rivers", description: "Go broader on river access, lake trips, fishing, paddling and water conditions." },
    { to: "/explore/major-springs", label: "Major Springs", description: "Explore the spring systems and spring-fed pools behind some of Texas's clearest water." },
    { to: "/explore/state-parks", label: "State Parks", description: "Use managed public lands as swimming, camping and outdoor-recreation anchors." },
    { to: "/best-places-to-go-camping-in-texas", label: "Camping", description: "Turn a water day into an overnight trip with public campground and outdoor-lodging options." },
    { to: "/explore/small-towns", label: "Small Towns", description: "Find nearby towns for food, lodging, supplies and a fuller weekend itinerary." },
    { to: "/texas-paddling-guide", label: "Paddling", description: "Compare official paddling trails when the trip calls for a kayak or canoe instead of a tube." },
    { to: "/explore/trip-planner", label: "Trip Planner", description: "Combine water access, nearby stops and drive times into a practical Texas itinerary." },
  ] as const;

  return <>
    <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
      {image ? <img src={image.src} alt={image.alt} width={image.width} height={image.height} className="absolute inset-0 size-full object-cover opacity-52" /> : null}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/92 via-ink/70 to-ink/30" />
      <Container className="relative flex min-h-[500px] flex-col justify-end py-14 sm:min-h-[560px] sm:py-20">
        <nav aria-label="Breadcrumb" className="text-[0.72rem] font-medium uppercase tracking-[0.12em] text-ink-foreground/65">
          <ol className="flex flex-wrap items-center gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden="true">/</li><li><Link to="/explore">Explore</Link></li><li aria-hidden="true">/</li><li aria-current="page" className="text-ink-foreground">Swimming Holes & River Tubing</li></ol>
        </nav>
        <p className="eyebrow mt-10 text-ink-foreground/75">{category.eyebrow}</p>
        <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">{category.name}</h1>
        <p className="mt-6 max-w-3xl text-[1.05rem] leading-8 text-ink-foreground/82">{category.description}</p>
      </Container>
    </section>

    <AnswerSummary
      eyebrow="At a glance"
      title="Plan the water day, not just the photo"
      items={[
        { question: "What belongs in this guide?", answer: "Existing Texas Defined destinations with documented swimming, spring-fed pool, tubing, float-trip, wading or designated swim access signals. Their original Lakes & Rivers, Major Springs or State Parks classification stays intact." },
        { question: "How many places are mapped?", answer: `${destinations.length.toLocaleString("en-US")} qualifying destinations are currently surfaced from the live Explore catalog.` },
        { question: "What should I verify before leaving?", answer: "Water access can change with drought, flood conditions, water quality, reservations and land-manager closures. Use each destination's official-source links before entering the water." },
        { question: "Can I build a full weekend from here?", answer: "Yes. Cross-links connect the water stop to camping, nearby towns, state parks, paddling and the Texas Trip Planner without duplicating destination pages." },
      ]}
    />

    <Section>
      <Container>
        <SectionHeader eyebrow="Build the bigger water weekend" title="Connect the swim or float to the rest of the trip" description="Use the dedicated water collection as the starting point, then move into the broader guides that answer access, camping, nearby-town and itinerary questions." />
        <nav aria-label="Related swimming and tubing planning guides" className="mt-8 grid border-t border-border md:grid-cols-2 lg:grid-cols-3">
          {planningLinks.map((item) => <Link key={item.to} to={item.to} className="group border-b border-border py-6 md:px-6 md:first:pl-0"><strong className="font-display text-2xl transition-colors group-hover:text-primary">{item.label}</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">{item.description}</span></Link>)}
        </nav>
      </Container>
    </Section>

    {destinations.length > 0 ? <Section tone="surface"><Container><SectionHeader eyebrow="Swimming & floating field guide" title="Texas water places with recreation signals" description={`${destinations.length.toLocaleString("en-US")} existing destination guides currently match swimming, tubing, float-trip or designated-water-access signals. Check the official source on the destination page before you go.`} /><DestinationCollectionGrid destinations={destinations} regionLabel={regionName} /></Container></Section> : null}

    {articles.length > 0 ? <Section><Container><SectionHeader eyebrow="Read before you go" title="Water stories and planning guides" description="Related Texas Defined reporting and evergreen guides from the Lakes & Rivers desk." /><ul className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">{articles.map((article) => <li key={article.id}><ArticleCard article={article} /></li>)}</ul></Container></Section> : null}
  </>;
}

function ExploreCategoryPage() {
  const { category } = Route.useParams();
  const { destinations, articles, authorityHtml } = Route.useLoaderData();
  const { data: categories } = useSuspenseQuery(categoriesQuery());
  const { data: regions } = useSuspenseQuery(regionsQuery());
  const match = categories.find((item) => item.slug === category);
  if (!match) return null;

  if (category === SWIMMING_HOLES_RIVER_TUBING_SLUG) {
    return <SwimmingHolesRiverTubingPage category={match} destinations={destinations} articles={articles} regions={regions} />;
  }

  const comparisonKind = COMPARISON_CATEGORIES.has(match.slug as ExploreComparisonKind) ? match.slug as ExploreComparisonKind : null;
  const showPaintedChurches = PAINTED_CHURCH_CROSS_LINK_CATEGORIES.has(match.slug);
  const showMuseumCollection = match.slug === "historic-sites";
  const showFoodHistory = match.slug === "food-bbq";
  const showWildlifeGuide = match.slug === "outdoors";
  const showLandformsGuide = match.slug === "landscapes";
  const showWaterRecreationCollection = WATER_RECREATION_PARENT_CATEGORIES.has(match.slug);

  return <>
    <CategoryPage category={match.slug as CategorySlug} eyebrow={match.eyebrow} title={match.name} intro={match.description} image={match.image} authorityHtml={authorityHtml} />
    {showWaterRecreationCollection ? <Container className="pb-10 sm:pb-14"><section className="grid gap-6 border-y border-border py-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"><div><p className="eyebrow text-primary">Texas water weekends</p><h2 className="mt-2 font-display text-3xl">Swimming Holes &amp; River Tubing</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Use the dedicated collection to find existing destination guides with swimming, spring-fed pool, tubing, float-trip or designated swim-access signals without losing their original river, spring or state-park context.</p></div><Link to={`/explore/${SWIMMING_HOLES_RIVER_TUBING_SLUG}`} className="eyebrow inline-block border-b border-primary pb-1 text-primary">Find places to swim &amp; float →</Link></section></Container> : null}
    {showMuseumCollection ? <Container className="pb-10 sm:pb-14"><section className="grid gap-6 border-y border-border py-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"><div><p className="eyebrow text-primary">Dedicated statewide collection</p><h2 className="mt-2 font-display text-3xl">Museums across Texas</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Browse the source-checked museum collection separately from battlefields, monuments and other historic sites, including art, science, history, military, presidential, children’s and specialty museums.</p></div><Link to="/explore/museums" className="eyebrow inline-block border-b border-primary pb-1 text-primary">Browse Texas museums →</Link></section></Container> : null}
    {showLandformsGuide ? <Container className="pb-10 sm:pb-14"><section className="grid gap-6 border-y border-border py-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"><div><p className="eyebrow text-primary">Texas landforms by region</p><h2 className="mt-2 font-display text-3xl">Texas Landforms &amp; Regions</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Start with the statewide geography behind the places on this page, from mountains and basins in far West Texas to the High Plains, Hill Country, Piney Woods, prairies and Gulf Coast.</p></div><Link to="/article/texas-regions-explained" className="eyebrow inline-block border-b border-primary pb-1 text-primary">Explore Texas landforms →</Link></section></Container> : null}
    {showWildlifeGuide ? <Container className="pb-10 sm:pb-14"><section className="grid gap-6 border-y border-border py-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"><div><p className="eyebrow text-primary">Texas wildlife, public land & hunting</p><h2 className="mt-2 font-display text-3xl">Texas Wildlife Atlas &amp; Hunting Guides</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Browse wildlife destinations and habitat guidance, then use the hunting authority for public-hunting access, licenses, hunter education, seasons and species planning with current TPWD verification.</p><div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold"><Link to="/explore/wildlife" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Wildlife destinations →</Link><Link to="/article/texas-wildlife-guide" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Texas wildlife field guide →</Link><Link to="/hunting" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Texas hunting guide →</Link></div></div><Link to="/hunting" className="eyebrow inline-block border-b border-primary pb-1 text-primary">Plan a Texas hunt →</Link></section></Container> : null}
    {showFoodHistory ? <Container className="pb-10 sm:pb-14"><section className="grid gap-6 border-y border-border py-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"><div><p className="eyebrow text-primary">The stories behind the Texas table</p><h2 className="mt-2 font-display text-3xl">Texas Food History</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Go beyond restaurant lists with the history behind barbecue, San Antonio chili, chicken-fried steak, breakfast tacos, German and Czech foodways and Dr Pepper's Waco origin.</p></div><Link to="/texas-food-history" className="eyebrow inline-block border-b border-primary pb-1 text-primary">Explore Texas food history →</Link></section></Container> : null}
    {showPaintedChurches ? <Container className="pb-10 sm:pb-14"><section className="grid gap-6 border-y border-border py-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"><div><p className="eyebrow text-primary">Texas heritage route</p><h2 className="mt-2 font-display text-3xl">Painted Churches of Texas</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Explore the verified statewide church collection with church-by-church history, architecture, interior paintings, preservation context, visitor guidance and Schulenburg driving routes.</p></div><Link to="/explore/painted-churches" className="eyebrow inline-block border-b border-primary pb-1 text-primary">Explore the painted churches →</Link></section></Container> : null}
    <TopAttractionCollectionLinks destinations={destinations} contextLabel={match.name} />
    {comparisonKind ? <ExploreDestinationComparison destinations={destinations} kind={comparisonKind} /> : null}
  </>;
}