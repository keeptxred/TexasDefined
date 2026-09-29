import { Link } from "@tanstack/react-router";
import { MapPin, Route as RouteIcon, Sparkles } from "lucide-react";

import { MapPreview } from "@/components/editorial/MapPreview";
import { Container } from "@/components/layout/Container";
import { countySlug, relatedMetroProximityLinks, type MetroProximityPage } from "@/data/metro-proximity";
import { recoverOrHideImage } from "@/lib/image-fallback";
import { maps } from "@/services/maps";

function categoryLabel(value: string) {
  return value.replaceAll("-", " ").replace(/\b\w/g, (character) => character.toUpperCase());
}

function uniqueCounties(page: MetroProximityPage) {
  const values = page.items
    .map((item) => item.destination.county?.replace(/\s+County$/i, "").trim())
    .filter((value): value is string => Boolean(value));
  return [...new Set(values)].slice(0, 10);
}

function uniqueTowns(page: MetroProximityPage) {
  return [...new Set(page.items.map((item) => item.destination.nearestTown).filter(Boolean))].slice(0, 12);
}

function statewideGuideForCategory(category: string) {
  if (category === "state-parks") return { href: "/explore/state-parks", label: "Texas State Parks" };
  if (category === "lakes-rivers") return { href: "/explore/lakes-rivers", label: "Texas Lakes & Rivers" };
  if (category === "small-towns") return { href: "/explore/small-towns", label: "Texas Small Towns" };
  if (category === "major-springs") return { href: "/explore/major-springs", label: "Texas Springs" };
  if (category === "historic-sites") return { href: "/explore/historic-sites", label: "Texas Historic Sites" };
  if (category === "caverns") return { href: "/explore/caverns", label: "Texas Caverns" };
  if (category === "beaches-coast") return { href: "/explore/beaches-coast", label: "Texas Beaches & Coast" };
  return { href: "/explore", label: "Explore Texas" };
}

export function MetroProximityLandingPage({ page }: { page: MetroProximityPage }) {
  const hero = page.items[0]?.destination.hero;
  const displayed = page.items.slice(0, 24);
  const counties = uniqueCounties(page);
  const towns = uniqueTowns(page);
  const related = relatedMetroProximityLinks(page).slice(0, 10);
  const mapMarkers = displayed.slice(0, 10).map((item) => ({ id: item.destination.slug, label: item.destination.name, point: item.destination.coordinates, href: `/destination/${item.destination.slug}` }));
  const categoryGuides = [...new Map(page.items.map((item) => {
    const guide = statewideGuideForCategory(item.destination.category);
    return [guide.href, guide] as const;
  })).values()].slice(0, 6);

  return <>
    <Container className="pt-8 sm:pt-12">
      <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link to="/" className="hover:text-foreground">Front page</Link></li>
          <li aria-hidden>·</li>
          <li><Link to="/explore" className="hover:text-foreground">Explore</Link></li>
          <li aria-hidden>·</li>
          <li aria-current="page" className="text-foreground">{page.title}</li>
        </ol>
      </nav>
    </Container>

    <section className="relative isolate mt-5 overflow-hidden bg-ink text-ink-foreground">
      {hero ? <img src={hero.src} alt={hero.alt} width={hero.width} height={hero.height} className="absolute inset-0 size-full object-cover opacity-55" onError={(event) => recoverOrHideImage(event.currentTarget)} /> : null}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/20" />
      <Container className="relative flex min-h-[28rem] flex-col justify-end pb-12 pt-24 sm:min-h-[34rem] sm:pb-14">
        <p className="eyebrow text-ink-foreground/75">{page.eyebrow}</p>
        <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">{page.title}</h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-ink-foreground/88 sm:text-lg">{page.intro}</p>
        <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[0.72rem] uppercase tracking-[0.14em] text-ink-foreground/65">
          <span>{page.totalMatches} curated place{page.totalMatches === 1 ? "" : "s"}</span>
          <span>{page.uniqueTowns} town{page.uniqueTowns === 1 ? "" : "s"}</span>
          <span>{page.uniqueCounties} count{page.uniqueCounties === 1 ? "y" : "ies"}</span>
        </div>
      </Container>
    </section>

    <Container className="py-10 sm:py-14">
      <section className="grid gap-6 border-y border-border py-7 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.6fr)] lg:gap-12">
        <div>
          <p className="eyebrow text-primary">How the distance band works</p>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{page.methodology}</p>
        </div>
        <div className="border-l-0 border-border lg:border-l lg:pl-8">
          <p className="eyebrow text-primary">Before you leave</p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">Open a live route from your actual starting point, then recheck reservations, park alerts, water access and weather where they matter. TexasDefined deliberately does not publish made-up minute-by-minute drive estimates.</p>
        </div>
      </section>

      {!page.indexReady ? <aside className="mt-8 border border-border bg-surface px-5 py-5 sm:px-7" aria-label="Collection status">
        <p className="eyebrow text-primary">Collection still growing</p>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">This useful planning page is available to readers, but TexasDefined keeps it out of search indexing until the current catalog clears its minimum inventory and geographic-diversity thresholds.</p>
      </aside> : null}
    </Container>

    <Container className="pb-14 sm:pb-20">
      <div className="mb-8 flex flex-col gap-3 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow text-primary">Choose a stop</p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl">Places that fit this trip</h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-muted-foreground">Distance labels are rounded straight-line context from the metro reference point, not road mileage. Start with the reason to go, then verify the actual route.</p>
      </div>

      <div className="grid gap-x-7 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
        {displayed.map((item) => {
          const destination = item.destination;
          return <article key={destination.slug} className="group flex min-w-0 flex-col border-b border-border pb-8">
            <Link to="/destination/$slug" params={{ slug: destination.slug }} className="block overflow-hidden bg-muted">
              <img src={destination.hero.src} alt={destination.hero.alt} width={destination.hero.width} height={destination.hero.height} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" onError={(event) => recoverOrHideImage(event.currentTarget)} />
            </Link>
            <div className="mt-5 flex flex-wrap gap-2 text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground">
              <span>{categoryLabel(destination.category)}</span>
              {destination.county ? <><span aria-hidden>·</span><span>{destination.county.replace(/\s+County$/i, "")} County</span></> : null}
            </div>
            <h3 className="mt-2 font-display text-3xl leading-tight"><Link to="/destination/$slug" params={{ slug: destination.slug }} className="hover:text-primary">{destination.name}</Link></h3>
            <p className="mt-3 flex items-start gap-2 text-sm font-medium leading-6"><MapPin className="mt-1 size-4 shrink-0 text-primary" aria-hidden />{item.distanceLabel}</p>
            <p className="mt-3 line-clamp-4 text-sm leading-7 text-muted-foreground">{destination.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">{item.bestFor.slice(0, 3).map((label) => <span key={label} className="border border-border px-2.5 py-1 text-xs text-muted-foreground">{label}</span>)}</div>
            <p className="mt-5 text-xs leading-6 text-muted-foreground"><strong className="font-semibold text-foreground">Best season:</strong> {destination.bestSeason}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link to="/destination/$slug" params={{ slug: destination.slug }} className="eyebrow border-b border-primary pb-1 text-primary">Plan this stop →</Link>
              <a href={maps.directionsUrl(destination.coordinates, destination.name)} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1.5 text-xs font-semibold underline decoration-primary/35 underline-offset-4 hover:text-primary"><RouteIcon className="size-3.5" aria-hidden />Check route</a>
            </div>
          </article>;
        })}
      </div>
    </Container>

    {displayed.length ? <section className="border-y border-border bg-surface/45">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div>
            <p className="eyebrow text-primary">Map the shortlist</p>
            <h2 className="mt-3 font-display text-4xl">See how the stops spread around {page.metro.shortName}</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">The map layer uses destination coordinates from the same catalog that powers the cards. Open directions for live road conditions and route mileage.</p>
          </div>
          <MapPreview markers={mapMarkers} zoom={7} directionsLabel={`${page.title} map`} />
        </div>
      </Container>
    </section> : null}

    <Container className="py-14 sm:py-20">
      <div className="grid gap-12 lg:grid-cols-2">
        <section>
          <p className="eyebrow text-primary">Seasonal planning</p>
          <h2 className="mt-2 font-display text-4xl">When these trips work best</h2>
          <div className="mt-6 space-y-5">
            {displayed.slice(0, 6).map((item) => <div key={item.destination.slug} className="border-t border-border pt-4">
              <p className="font-display text-2xl">{item.destination.name}</p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.destination.bestSeason}</p>
            </div>)}
          </div>
        </section>

        <section>
          <p className="eyebrow text-primary">Build the route outward</p>
          <h2 className="mt-2 font-display text-4xl">Counties, towns and statewide guides</h2>
          {counties.length ? <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Counties represented</p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">{counties.map((county) => <Link key={county} to="/county/$slug" params={{ slug: countySlug(county) }} className="underline decoration-primary/35 underline-offset-4 hover:text-primary">{county} County</Link>)}</div>
          </div> : null}
          {towns.length ? <div className="mt-7">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Towns and gateways in this set</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{towns.join(" · ")}</p>
          </div> : null}
          <div className="mt-7">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Related statewide guides</p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
              {categoryGuides.map((guide) => <Link key={guide.href} to={guide.href} className="underline decoration-primary/35 underline-offset-4 hover:text-primary">{guide.label}</Link>)}
              <Link to="/explore/trip-planner" className="underline decoration-primary/35 underline-offset-4 hover:text-primary">Texas Trip Planner</Link>
            </div>
          </div>
        </section>
      </div>
    </Container>

    <section className="border-t border-border bg-ink text-ink-foreground">
      <Container className="py-14 sm:py-18">
        <p className="eyebrow text-ink-foreground/65"><Sparkles className="mr-2 inline size-4" aria-hidden />More trips from Texas metros</p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl sm:text-5xl">Keep building the radius</h2>
        <div className="mt-7 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((link) => <Link key={link.href} to={link.href} className="border-b border-ink-foreground/20 pb-3 text-sm font-semibold leading-6 hover:border-ink-foreground/60">{link.label} →</Link>)}
        </div>
      </Container>
    </section>
  </>;
}
