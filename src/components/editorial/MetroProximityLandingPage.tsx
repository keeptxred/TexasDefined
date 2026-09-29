import { Link } from "@tanstack/react-router";

import { MapPreview } from "@/components/editorial/MapPreview";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { countySlug, relatedMetroProximityLinks, type MetroProximityPage } from "@/data/metro-proximity";
import { recoverOrHideImage } from "@/lib/image-fallback";
import { maps } from "@/services/maps";

function categoryLabel(value: string) {
  return value.replaceAll("-", " ").replace(/\b\w/g, (character) => character.toUpperCase());
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
  const counties = [...new Set(page.items.map((item) => item.destination.county?.replace(/\s+County$/i, "").trim()).filter((value): value is string => Boolean(value)))].slice(0, 10);
  const towns = [...new Set(page.items.map((item) => item.destination.nearestTown).filter(Boolean))].slice(0, 12);
  const related = relatedMetroProximityLinks(page).slice(0, 10);
  const mapMarkers = displayed.slice(0, 10).map((item) => ({ id: item.destination.slug, label: item.destination.name, point: item.destination.coordinates, href: `/destination/${item.destination.slug}` }));
  const categoryGuides = [...new Map(page.items.map((item) => {
    const guide = statewideGuideForCategory(item.destination.category);
    return [guide.href, guide] as const;
  })).values()].slice(0, 6);

  return <>
    <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
      {hero ? <img src={hero.src} alt={hero.alt} width={hero.width} height={hero.height} className="absolute inset-0 size-full object-cover opacity-52" onError={(event) => recoverOrHideImage(event.currentTarget)} /> : null}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/68 to-ink/28" />
      <Container className="relative flex min-h-[480px] flex-col justify-end py-14 sm:min-h-[540px] sm:py-20">
        <nav aria-label="Breadcrumb" className="text-[0.72rem] font-medium uppercase tracking-[0.12em] text-ink-foreground/65">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to="/" className="transition-colors hover:text-ink-foreground">Front page</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link to="/explore" className="transition-colors hover:text-ink-foreground">Explore</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink-foreground">{page.title}</li>
          </ol>
        </nav>
        <p className="eyebrow mt-10 text-ink-foreground/75">{page.eyebrow}</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{page.title}</h1>
        <p className="mt-6 max-w-2xl text-[1.05rem] leading-8 text-ink-foreground/82">{page.intro}</p>
      </Container>
    </section>

    <Section>
      <Container>
        <SectionHeader eyebrow="How to use this guide" title="Approximate distance, useful trip context" description={page.methodology} />
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">Open a live route from your actual starting point before leaving. TexasDefined does not publish made-up minute-by-minute drive estimates; verify the live driving route, current access, reservations, weather and water conditions where they matter.</p>
        {!page.indexReady ? <div className="mt-8 border-t-2 border-foreground pt-5">
          <p className="eyebrow text-primary">Collection still growing</p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">This planning page is available to readers, but it stays out of search indexing until the current catalog clears minimum inventory and geographic-diversity thresholds.</p>
        </div> : null}
      </Container>
    </Section>

    <Section tone="surface">
      <Container>
        <SectionHeader eyebrow="Choose a stop" title="Places that fit this trip" description="Distance labels are rounded straight-line context from the metro reference point, not road mileage. Start with the reason to go, then check the actual road route." />
        <div className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {displayed.map((item) => {
            const destination = item.destination;
            return <article key={destination.slug} className="border-t-2 border-foreground pt-5">
              <Link to="/destination/$slug" params={{ slug: destination.slug }} className="block">
                <img src={destination.hero.src} alt={destination.hero.alt} width={destination.hero.width} height={destination.hero.height} loading="lazy" className="w-full object-cover" onError={(event) => recoverOrHideImage(event.currentTarget)} />
              </Link>
              <p className="eyebrow mt-5 text-primary">{categoryLabel(destination.category)} · {item.distanceLabel}</p>
              <Link to="/destination/$slug" params={{ slug: destination.slug }} className="mt-2 block font-display text-2xl leading-tight hover:text-primary">{destination.name}</Link>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{destination.summary}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground"><strong>Best season:</strong> {destination.bestSeason}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground"><strong>Best for:</strong> {item.bestFor.join(" · ")}</p>
              <div className="mt-8 flex flex-wrap gap-5 text-sm font-semibold">
                <Link to="/destination/$slug" params={{ slug: destination.slug }} className="border-b border-primary text-primary">Plan this stop →</Link>
                <a href={maps.directionsUrl(destination.coordinates, destination.name)} target="_blank" rel="noreferrer noopener" className="border-b border-primary text-primary">Check route →</a>
              </div>
            </article>;
          })}
        </div>
      </Container>
    </Section>

    {displayed.length ? <Section>
      <Container>
        <SectionHeader eyebrow="Map & directions" title={`See the shortlist around ${page.metro.shortName}`} description="The map uses the same destination coordinates as the cards. Use live directions for road mileage, traffic and closures." />
        <MapPreview markers={mapMarkers} zoom={7} directionsLabel={`${page.title} map`} />
      </Container>
    </Section> : null}

    <Section tone="surface">
      <Container>
        <SectionHeader eyebrow="Build the route outward" title="Counties, towns and related guides" description="Use the geographic links below to turn one destination into a broader TexasDefined planning path." />
        {counties.length ? <div className="mt-8">
          <p className="eyebrow text-primary">Counties represented</p>
          <div className="mt-8 flex flex-wrap gap-5 text-sm font-semibold">
            {counties.map((county) => <Link key={county} to="/county/$slug" params={{ slug: countySlug(county) }} className="border-b border-primary text-primary">{county} County →</Link>)}
          </div>
        </div> : null}
        {towns.length ? <div className="mt-8 border-t-2 border-foreground pt-5">
          <p className="eyebrow text-primary">Towns and gateways</p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{towns.join(" · ")}</p>
        </div> : null}
        <div className="mt-8 border-t-2 border-foreground pt-5">
          <p className="eyebrow text-primary">Related statewide guides</p>
          <div className="mt-8 flex flex-wrap gap-5 text-sm font-semibold">
            {categoryGuides.map((guide) => <Link key={guide.href} to={guide.href} className="border-b border-primary text-primary">{guide.label} →</Link>)}
            <Link to="/explore/trip-planner" className="border-b border-primary text-primary">Texas Trip Planner →</Link>
          </div>
        </div>
      </Container>
    </Section>

    <Section>
      <Container>
        <SectionHeader eyebrow="More trips from Texas metros" title="Keep building the radius" />
        <div className="mt-8 flex flex-wrap gap-5 text-sm font-semibold">
          {related.map((link) => <Link key={link.href} to={link.href} className="border-b border-primary text-primary">{link.label} →</Link>)}
        </div>
      </Container>
    </Section>
  </>;
}
