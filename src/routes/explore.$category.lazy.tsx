import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { CategoryPage } from "@/components/editorial/CategoryPage";
import { TopAttractionCollectionLinks } from "@/components/editorial/TopAttractionCollectionLinks";
import { ExploreDestinationComparison, type ExploreComparisonKind } from "@/components/explore/ExploreDestinationComparison";
import { Container } from "@/components/layout/Container";
import { foodDestinationCardsQuery } from "@/data/food-destination-cards-query";
import { categoriesQuery } from "@/data/queries";
import type { CategorySlug } from "@/data/types";

const COMPARISON_CATEGORIES = new Set<ExploreComparisonKind>(['state-parks', 'lakes-rivers', 'small-towns', 'road-trips']);
const PAINTED_CHURCH_CROSS_LINK_CATEGORIES = new Set(['historic-sites', 'road-trips', 'small-towns']);

export const Route = createLazyFileRoute("/explore/$category")({ component: ExploreCategoryPage });

function ExploreCategoryPage() {
  const { category } = Route.useParams();
  const { destinations, authorityHtml } = Route.useLoaderData();
  const { data: categories } = useSuspenseQuery(categoriesQuery());
  const match = categories.find((item) => item.slug === category);
  if (!match) return null;
  const comparisonKind = COMPARISON_CATEGORIES.has(match.slug as ExploreComparisonKind) ? match.slug as ExploreComparisonKind : null;
  const showPaintedChurches = PAINTED_CHURCH_CROSS_LINK_CATEGORIES.has(match.slug);
  const showMuseumCollection = match.slug === "historic-sites";
  const showFoodHistory = match.slug === "food-bbq";
  const showWildlifeGuide = match.slug === "outdoors";
  const showLandformsGuide = match.slug === "landscapes";

  return <>
    <CategoryPage category={match.slug as CategorySlug} eyebrow={match.eyebrow} title={match.name} intro={match.description} image={match.image} authorityHtml={authorityHtml} />
    {showMuseumCollection ? <Container className="pb-10 sm:pb-14"><section className="grid gap-6 border-y border-border py-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"><div><p className="eyebrow text-primary">Dedicated statewide collection</p><h2 className="mt-2 font-display text-3xl">Museums across Texas</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Browse the source-checked museum collection separately from battlefields, monuments and other historic sites, including art, science, history, military, presidential, children’s and specialty museums.</p></div><Link to="/explore/museums" className="eyebrow inline-block border-b border-primary pb-1 text-primary">Browse Texas museums →</Link></section></Container> : null}
    {showLandformsGuide ? <Container className="pb-10 sm:pb-14"><section className="grid gap-6 border-y border-border py-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"><div><p className="eyebrow text-primary">Texas landforms by region</p><h2 className="mt-2 font-display text-3xl">Texas Landforms &amp; Regions</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Start with the statewide geography behind the places on this page, from mountains and basins in far West Texas to the High Plains, Hill Country, Piney Woods, prairies and Gulf Coast.</p></div><Link to="/article/texas-regions-explained" className="eyebrow inline-block border-b border-primary pb-1 text-primary">Explore Texas landforms →</Link></section></Container> : null}
    {showWildlifeGuide ? <Container className="pb-10 sm:pb-14"><section className="grid gap-6 border-y border-border py-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"><div><p className="eyebrow text-primary">Texas wildlife by habitat</p><h2 className="mt-2 font-display text-3xl">Texas Wildlife Atlas</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Browse the current National Wildlife Refuge collection, then use the field guide to understand the animals and habitats behind East Texas forests, Gulf wetlands, Hill Country rivers, prairie, brush country and the Trans-Pecos desert.</p><div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold"><Link to="/explore/wildlife" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Wildlife destinations →</Link><Link to="/article/texas-wildlife-guide" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Texas wildlife field guide →</Link></div></div><Link to="/explore/wildlife" className="eyebrow inline-block border-b border-primary pb-1 text-primary">Browse wildlife atlas →</Link></section></Container> : null}
    {showFoodHistory ? <FoodAuthorityCollection /> : null}
    {showPaintedChurches ? <Container className="pb-10 sm:pb-14"><section className="grid gap-6 border-y border-border py-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"><div><p className="eyebrow text-primary">Texas heritage route</p><h2 className="mt-2 font-display text-3xl">Painted Churches of Texas</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Explore the verified statewide church collection with church-by-church history, architecture, interior paintings, preservation context, visitor guidance and Schulenburg driving routes.</p></div><Link to="/explore/painted-churches" className="eyebrow inline-block border-b border-primary pb-1 text-primary">Explore the painted churches →</Link></section></Container> : null}
    <TopAttractionCollectionLinks destinations={destinations} contextLabel={match.name} />
    {comparisonKind ? <ExploreDestinationComparison destinations={destinations} kind={comparisonKind} /> : null}
  </>;
}

function FoodAuthorityCollection() {
  const { data: foodDestinations } = useSuspenseQuery(foodDestinationCardsQuery());
  return <Container className="pb-10 sm:pb-14">
    <section className="border-y border-border py-8">
      <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <div>
          <p className="eyebrow text-primary">Verified Texas food destinations</p>
          <h2 className="mt-2 font-display text-3xl">Start with institutions worth the drive</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">TexasDefined is building a source-checked food-destination layer around durable history and cultural significance rather than volatile menu prices or copied directory listings. This first wave spans barbecue, Czech baking, Gulf seafood and cowboy steakhouse tradition.</p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
          <Link to="/texas-food-history" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Explore Texas food history →</Link>
          <Link to="/texas-food-trail" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Food trail →</Link>
        </div>
      </div>
      <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {foodDestinations.map((destination) => <a key={destination.slug} href={`/food/${destination.slug}`} className="group border border-border p-5 transition-colors hover:border-primary/60">
          <p className="eyebrow text-primary">{destination.city} · {destination.region}</p>
          <h3 className="mt-2 font-display text-2xl group-hover:text-primary">{destination.name}</h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{destination.significance}</p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Known for: {destination.knownFor.join(" · ")}</p>
        </a>)}
      </div>
    </section>
  </Container>;
}
