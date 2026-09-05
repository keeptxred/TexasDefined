import { lazy, Suspense } from "react";
import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { CategoryPage } from "@/components/editorial/CategoryPage";
import { TopAttractionCollectionLinks } from "@/components/editorial/TopAttractionCollectionLinks";
import { ExploreDestinationComparison, type ExploreComparisonKind } from "@/components/explore/ExploreDestinationComparison";
import { Container } from "@/components/layout/Container";
import type { CategorySlug } from "@/data/types";

const WaterTowersPage = lazy(() => import("@/components/explore/WaterTowersPage").then((module) => ({ default: module.WaterTowersPage })));
const COMPARISON_CATEGORIES = new Set<ExploreComparisonKind>(['state-parks', 'lakes-rivers', 'small-towns', 'road-trips']);
const PAINTED_CHURCH_CROSS_LINK_CATEGORIES = new Set(['historic-sites', 'road-trips', 'small-towns']);

export const Route = createLazyFileRoute("/explore/$category")({
  component: ExploreCategoryPage,
  notFoundComponent: CategoryNotFound,
});

function ExploreCategoryPage() {
  const { destinations, authorityHtml } = Route.useLoaderData();
  const { category: match } = Route.useLoaderData();
  if (match.slug === "water-towers") return <Suspense fallback={<Container className="py-24"><p className="eyebrow text-primary">Loading roadside guide…</p></Container>}><WaterTowersPage /></Suspense>;

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
    {showWildlifeGuide ? <Container className="pb-10 sm:pb-14"><section className="grid gap-6 border-y border-border py-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"><div><p className="eyebrow text-primary">Texas wildlife, public land & hunting</p><h2 className="mt-2 font-display text-3xl">Texas Wildlife Atlas &amp; Hunting Guides</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Browse wildlife destinations and habitat guidance, then use the hunting authority for public-hunting access, licenses, hunter education, seasons and species planning with current TPWD verification.</p><div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold"><Link to="/explore/wildlife" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Wildlife destinations →</Link><Link to="/article/texas-wildlife-guide" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Texas wildlife field guide →</Link><Link to="/hunting" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Texas hunting guide →</Link></div></div><Link to="/hunting" className="eyebrow inline-block border-b border-primary pb-1 text-primary">Plan a Texas hunt →</Link></section></Container> : null}
    {showFoodHistory ? <Container className="pb-10 sm:pb-14"><section className="grid gap-6 border-y border-border py-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"><div><p className="eyebrow text-primary">The stories behind the Texas table</p><h2 className="mt-2 font-display text-3xl">Texas Food History</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Go beyond restaurant lists with the history behind barbecue, San Antonio chili, chicken-fried steak, breakfast tacos, German and Czech foodways and Dr Pepper's Waco origin.</p></div><Link to="/texas-food-history" className="eyebrow inline-block border-b border-primary pb-1 text-primary">Explore Texas food history →</Link></section></Container> : null}
    {showPaintedChurches ? <Container className="pb-10 sm:pb-14"><section className="grid gap-6 border-y border-border py-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"><div><p className="eyebrow text-primary">Texas heritage route</p><h2 className="mt-2 font-display text-3xl">Painted Churches of Texas</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Explore the verified statewide church collection with church-by-church history, architecture, interior paintings, preservation context, visitor guidance and Schulenburg driving routes.</p></div><Link to="/explore/painted-churches" className="eyebrow inline-block border-b border-primary pb-1 text-primary">Explore the painted churches →</Link></section></Container> : null}
    <TopAttractionCollectionLinks destinations={destinations} contextLabel={match.name} />
    {comparisonKind ? <ExploreDestinationComparison destinations={destinations} kind={comparisonKind} /> : null}
  </>;
}

function CategoryNotFound() {
  return <Container className="py-24">
    <p className="eyebrow text-primary">A different road</p>
    <h1 className="mt-3 font-display text-3xl">We haven't made that list yet</h1>
    <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">The page may have moved, but there are still plenty of places worth the drive.</p>
    <Link to="/explore" className="eyebrow mt-6 inline-block border-b border-primary pb-1 text-primary">Find another road →</Link>
  </Container>;
}
