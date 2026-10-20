import { lazy, Suspense } from "react";
import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { CategoryPage } from "@/components/editorial/CategoryPage";
import { TexasPointMapGraphic } from "@/components/editorial/TexasPointMapGraphic";
import { TopAttractionCollectionLinks } from "@/components/editorial/TopAttractionCollectionLinks";
import { ExploreDestinationComparison, type ExploreComparisonKind } from "@/components/explore/ExploreDestinationComparison";
import { Container } from "@/components/layout/Container";
import { BookingCarRentalCard } from "@/components/monetization/BookingCarRentalCard";
import type { CategorySlug } from "@/data/types";
import { unusualBusinessAnalyticsAttributes } from "@/lib/unusual-business-analytics";

const WaterTowersPage = lazy(() => import("@/components/explore/WaterTowersPage").then((module) => ({ default: module.WaterTowersPage })));
const COMPARISON_CATEGORIES = new Set<ExploreComparisonKind>(['state-parks', 'lakes-rivers', 'small-towns', 'road-trips']);
const PAINTED_CHURCH_CROSS_LINK_CATEGORIES = new Set(['historic-sites', 'road-trips', 'small-towns']);

export const Route = createLazyFileRoute("/explore/$category")({ component: ExploreCategoryPage, notFoundComponent: CategoryNotFound });

function ExploreCategoryPage() {
  const { destinations, authorityHtml } = Route.useLoaderData();
  const { category: match } = Route.useLoaderData();
  if (match.slug === "water-towers") {
    return <Suspense fallback={<Container className="py-24"><p className="eyebrow text-primary">Loading roadside guide…</p></Container>}><WaterTowersPage /></Suspense>;
  }
  const comparisonKind = COMPARISON_CATEGORIES.has(match.slug as ExploreComparisonKind) ? match.slug as ExploreComparisonKind : null;
  const showPaintedChurches = PAINTED_CHURCH_CROSS_LINK_CATEGORIES.has(match.slug);
  const showMuseumCollection = match.slug === "historic-sites";
  const showFoodHistory = match.slug === "food-bbq";
  const showWildlifeGuide = match.slug === "outdoors";
  const showLandformsGuide = match.slug === "landscapes";
  const showRoadTripRentalCar = match.slug === "road-trips";
  const pointGraphic = match.slug === "state-parks"
    ? {
        id: "texas-state-parks-location-graphic",
        title: "Texas state parks location map",
        description: "TexasDefined map of state park destinations with maintained geographic coordinates.",
        filename: "texas-state-parks-map",
        sourceNote: "Locations come from the maintained TexasDefined state-park destination catalog. The map is for statewide orientation; official TPWD park maps control property boundaries, entrances and closures.",
      }
    : match.slug === "historic-sites"
      ? {
          id: "texas-historic-sites-location-graphic",
          title: "Texas historic sites location map",
          description: "TexasDefined map of historic-site destinations with maintained geographic coordinates.",
          filename: "texas-historic-sites-map",
          sourceNote: "Locations come from the maintained TexasDefined historic-sites catalog and its source records. The points identify places, not legal property boundaries or exact visitor entrances.",
        }
      : match.slug === "swimming-holes-river-tubing"
        ? {
            id: "texas-swimming-floating-destination-graphic",
            title: "Texas swimming and tubing destinations map",
            description: "Orientation map of researched swimming destinations and municipal tubing gateways.",
            filename: "texas-swimming-and-tubing-destinations-map",
            sourceNote: "Pins locate the maintained park or city records, not river put-ins, take-outs or approved float routes. Verify the exact public access, parking and current water conditions with the official river or park operator.",
          }
        : null;
  const mapPoints = pointGraphic ? destinations.map((destination) => ({
    id: destination.id,
    name: destination.name,
    lat: destination.coordinates.lat,
    lng: destination.coordinates.lng,
    detail: destination.county ? `${destination.county} County` : destination.nearestTown,
  })) : [];
  const unusualBusinessSpotlight = match.slug === "small-towns"
    ? {
        eyebrow: "Working craft in a Texas small town",
        title: "Phenix Knives in Bellville",
        text: "Step inside a working blacksmith shop, learn how hand-forged blades are made and connect the visit to Bellville and Austin County.",
        href: "/article/phenix-knives-bellville",
        cta: "Explore Phenix Knives →",
      }
    : match.slug === "beaches-coast"
      ? {
          eyebrow: "A different way to experience the coast",
          title: "Horses on the Beach in Corpus Christi",
          text: "Ride the Padre Island shoreline on horseback, then connect the experience to North Padre Island, Nueces County and the wider Coastal Bend.",
          href: "/article/horses-on-the-beach-corpus-christi",
          cta: "Plan the beach ride →",
        }
      : null;

  return <>
    <CategoryPage category={match.slug as CategorySlug} eyebrow={match.eyebrow} title={match.name} intro={match.description} image={match.image} authorityHtml={authorityHtml} />
    {(match.slug === "beaches-coast" || match.slug === "lakes-rivers") ? <Container className="pb-10 sm:pb-14">
      <section className="border-y border-border py-8" aria-labelledby="inland-beaches-bridge">
        <p className="eyebrow text-primary">Freshwater swimming and the Texas coast are different trips</p>
        <h2 id="inland-beaches-bridge" className="mt-2 font-display text-3xl">Looking for a Texas lake beach?</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Explore a separately sourced guide to designated inland swimming beaches. We distinguish actual park swim beaches from lakes where swimming happens to be allowed, and link to managing agencies for current access and safety.</p>
        <Link to="/explore/inland-beaches" className="mt-4 inline-block text-sm font-semibold underline decoration-primary/40 underline-offset-4 hover:text-primary">See verified Texas inland swimming beaches →</Link>
      </section>
    </Container> : null}

    {match.slug === "lakes-rivers" ? <Container className="pb-10 sm:pb-14">
      <section aria-labelledby="lakes-fishing-depth-heading" className="border-y border-border py-8">
        <p className="eyebrow text-primary">Lake-by-lake visitor planning</p>
        <h2 id="lakes-fishing-depth-heading" className="mt-2 font-display text-3xl">Two West Texas Lakes, Two Different Trips</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Our detailed lake guides connect county history to fishing, camping, ramps, water levels and current agency notices. Check conditions before traveling, especially where drought affects access.</p>
        <div className="mt-7 grid gap-6 md:grid-cols-2">
          <article className="border-t border-border pt-5">
            <h3 className="font-display text-2xl">Lake Stamford · Haskell County</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">A Paint Creek reservoir with a noted crappie fishery, lakeside camping and named marina ramps. Water levels can change launch access.</p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold"><Link to="/fishing/lakes/lake-stamford" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Lake Stamford guide →</Link><Link to="/county/haskell" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Haskell County →</Link></div>
          </article>
          <article className="border-t border-border pt-5">
            <h3 className="font-display text-2xl">Lake Sweetwater · Nolan County</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">Explore a historic municipal park and lakeside recreation area. Golden-alga impacts and prolonged low water currently make fishing and ramp verification essential.</p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold"><Link to="/fishing/lakes/lake-sweetwater" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Lake Sweetwater guide →</Link><Link to="/county/nolan" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Nolan County →</Link></div>
          </article>
        </div>
        <Link to="/fishing/lakes" className="mt-6 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">Browse all completed Texas fishing lake guides →</Link>
      </section>
    </Container> : null}
    {pointGraphic ? <Container className="pb-10 sm:pb-14"><section className="border-t-2 border-foreground pt-8"><div className="mb-6 max-w-3xl"><p className="eyebrow text-primary">Original TexasDefined map</p><h2 className="mt-2 font-display text-4xl">{pointGraphic.title}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">Built from the same maintained destination records used by this guide, then made available for editorial reuse in PNG and SVG formats.</p></div><TexasPointMapGraphic {...pointGraphic} points={mapPoints} /></section></Container> : null}
    {unusualBusinessSpotlight ? <Container className="pb-10 sm:pb-14"><section className="grid gap-6 border-y border-border py-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"><div><p className="eyebrow text-primary">{unusualBusinessSpotlight.eyebrow}</p><h2 className="mt-2 font-display text-3xl">{unusualBusinessSpotlight.title}</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{unusualBusinessSpotlight.text}</p><Link to="/article/unusual-texas-businesses-services" {...unusualBusinessAnalyticsAttributes("/article/unusual-texas-businesses-services", `explore-${match.slug}:hub`)} className="mt-4 inline-block text-sm font-semibold underline decoration-primary/40 underline-offset-4 hover:text-primary">More unusual Texas businesses →</Link></div><Link to={unusualBusinessSpotlight.href} {...unusualBusinessAnalyticsAttributes(unusualBusinessSpotlight.href, `explore-${match.slug}:spotlight`)} className="eyebrow inline-block border-b border-primary pb-1 text-primary">{unusualBusinessSpotlight.cta}</Link></section></Container> : null}
    {showRoadTripRentalCar ? <Container className="pb-10 sm:pb-14"><BookingCarRentalCard placement="road-trips-category" title="Need a rental car for your Texas road trip?" /></Container> : null}
    {showMuseumCollection ? <Container className="pb-10 sm:pb-14"><section aria-labelledby="dallas-black-history-collection" className="grid gap-6 border-y border-border py-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"><div><p className="eyebrow text-primary">Dallas heritage collection</p><h2 id="dallas-black-history-collection" className="mt-2 font-display text-3xl">Dallas Black History</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Eight researched places connect Black Dallas through civil rights, Freedmen's Town communities, schools, churches, museums and music. Each guide distinguishes historical significance from current visitor access.</p></div><Link to="/dallas-black-history" className="eyebrow inline-block border-b border-primary pb-1 text-primary">Explore the Dallas Black History collection →</Link></section></Container> : null}
    {showMuseumCollection ? <Container className="pb-10 sm:pb-14"><section className="grid gap-6 border-y border-border py-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"><div><p className="eyebrow text-primary">Dedicated statewide collection</p><h2 className="mt-2 font-display text-3xl">Museums across Texas</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Browse the source-checked museum collection separately from battlefields, monuments and other historic sites, including art, science, history, military, presidential, children’s and specialty museums.</p></div><Link to="/explore/museums" className="eyebrow inline-block border-b border-primary pb-1 text-primary">Browse Texas museums →</Link></section></Container> : null}
    {showLandformsGuide ? <Container className="pb-10 sm:pb-14"><section className="grid gap-6 border-y border-border py-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"><div><p className="eyebrow text-primary">Texas landforms by region</p><h2 className="mt-2 font-display text-3xl">Texas Landforms &amp; Regions</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Start with the statewide geography behind the places on this page, from mountains and basins in far West Texas to the High Plains, Hill Country, Piney Woods, prairies and Gulf Coast.</p></div><Link to="/article/texas-regions-explained" className="eyebrow inline-block border-b border-primary pb-1 text-primary">Explore Texas landforms →</Link></section></Container> : null}
    {showWildlifeGuide ? <Container className="pb-10 sm:pb-14"><section className="grid gap-6 border-y border-border py-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"><div><p className="eyebrow text-primary">Texas wildlife, public land & hunting</p><h2 className="mt-2 font-display text-3xl">Texas Wildlife Atlas &amp; Hunting Guides</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Browse wildlife destinations and habitat guidance, then use the hunting authority for public-hunting access, licenses, hunter education, seasons and species planning with current TPWD verification.</p><div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold"><Link to="/explore/wildlife" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Wildlife destinations →</Link><Link to="/article/texas-wildlife-guide" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Texas wildlife field guide →</Link><Link to="/hunting" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Texas hunting guide →</Link></div></div><Link to="/hunting" className="eyebrow inline-block border-b border-primary pb-1 text-primary">Plan a Texas hunt →</Link></section></Container> : null}
    {showFoodHistory ? <Container className="pb-10 sm:pb-14"><section className="grid gap-6 border-y border-border py-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"><div><p className="eyebrow text-primary">The stories behind the Texas table</p><h2 className="mt-2 font-display text-3xl">Texas Food History</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Go beyond restaurant lists with the history behind barbecue, San Antonio chili, chicken-fried steak, breakfast tacos, German and Czech foodways and Dr Pepper's Waco origin.</p></div><Link to="/texas-food-history" className="eyebrow inline-block border-b border-primary pb-1 text-primary">Explore Texas food history →</Link></section></Container> : null}
    {showPaintedChurches ? <Container className="pb-10 sm:pb-14"><section className="grid gap-6 border-y border-border py-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"><div><p className="eyebrow text-primary">Texas heritage route</p><h2 className="mt-2 font-display text-3xl">Painted Churches of Texas</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Explore the verified statewide church collection with church-by-church history, architecture, interior paintings, preservation context, visitor guidance and Schulenburg driving routes.</p></div><Link to="/explore/painted-churches" className="eyebrow inline-block border-b border-primary pb-1 text-primary">Explore the painted churches →</Link></section></Container> : null}
    {showRoadTripRentalCar ? <Container className="pb-10 sm:pb-14">
      <section aria-labelledby="casino-roadtrip-bridge" className="border-y border-border py-7">
        <p className="eyebrow text-primary">Optional overnight driving routes</p>
        <h2 id="casino-roadtrip-bridge" className="mt-2 font-display text-3xl">Casino resort weekends from Texas</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">For travelers considering a hotel-and-entertainment weekend, compare the operating Texas tribal gaming destinations with resort road trips that cross into Louisiana or Oklahoma. These are different state markets, not additional casinos inside Texas. Check official age requirements, driving conditions and current lodging availability before leaving.</p>
        <div className="mt-5 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold">
          <Link to="/explore/casinos" data-entity-id="casino-getaway-collection" data-entity-kind="road-trip-guide" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Compare Texas casinos and getaways →</Link>
          <Link to="/explore/casinos/$slug" params={{ slug: "near-houston" }} data-entity-id="casino-weekends-near-houston" data-entity-kind="road-trip-guide" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Gaming weekends from Houston →</Link>
          <Link to="/explore/casinos/$slug" params={{ slug: "near-dallas-fort-worth" }} data-entity-id="casino-weekends-near-dfw" data-entity-kind="road-trip-guide" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Gaming weekends from DFW →</Link>
        </div>
      </section>
    </Container> : null}
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
