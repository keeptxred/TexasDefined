import { buildHotelsComEvergreenClick, hotelsComPageSid } from "@/lib/cj-hotels-evergreen";
import { Link, createLazyFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useState } from "react";
const CalendarBookingDiscovery = lazy(() => import("@/components/events/CalendarBookingDiscovery").then((m) => ({default:m.CalendarBookingDiscovery})));

import bigBend from "@/assets/big-bend.jpg";
import caddoLake from "@/assets/caddo-lake.jpg";
import heroHillCountry from "@/assets/hero-hill-country.jpg";
import highSchoolFootballHero from "@/assets/high-school-football-hero.jpg";
import roadTrip from "@/assets/road-trip.jpg";
import smallTown from "@/assets/small-town.jpg";
import { Container } from "@/components/layout/Container";
import { trackAffiliateClick } from "@/lib/affiliate-click";
import { countyGuidePath } from "@/data/discovery/canonical-links";

export const Route = createLazyFileRoute("/events/$collection")({
  component: EventCollectionPage,
});

function EventGuideLink({ event, className, children, trackId }: { event: { slug: string; href: string }; className?: string; children: React.ReactNode; trackId?: string }) {
  const tracking = trackId ? { "data-entity-id": trackId } : {};
  if (event.href === `/event/${event.slug}`) {
    return <Link to="/event/$slug" params={{ slug: event.slug }} className={className} {...tracking}>{children}</Link>;
  }
  return <a href={event.href} className={className} {...tracking}>{children}</a>;
}

function holidayDateLabel(start: string, end?: string) {
  const format = (value: string) => new Intl.DateTimeFormat("en-US", {
    month: "short", day: "numeric", year: "numeric", timeZone: "UTC",
  }).format(new Date(`${value}T12:00:00Z`));
  return !end || end === start ? format(start) : `${format(start)} – ${format(end)}`;
}

function weekendCardImage(event: any) {
  if (event.image?.url) return { src: event.image.url, alt: event.image.alt || "" };
  if (event.category === "sport") return { src: highSchoolFootballHero, alt: "Texas football field used as contextual Texas sports imagery" };
  if (event.region === "hill-country") return { src: heroHillCountry, alt: "Texas Hill Country landscape used as contextual regional imagery" };
  if (event.region === "piney-woods") return { src: caddoLake, alt: "Caddo Lake in East Texas used as contextual regional imagery" };
  if (event.region === "big-bend") return { src: bigBend, alt: "Big Bend landscape used as contextual Far West Texas imagery" };
  if (/festival|fair|fiesta|seasonal|community|celebration/i.test(`${event.category} ${event.name}`)) return { src: smallTown, alt: "Texas small-town scene used as contextual festival imagery" };
  return { src: roadTrip, alt: "Texas road-trip landscape used as contextual event imagery" };
}

function WeekendEventImage({ event, eager = false }: { event: any; eager?: boolean }) {
  const image = weekendCardImage(event);
  return <div className="aspect-[4/3] overflow-hidden bg-muted"><img src={image.src} alt={image.alt} width={800} height={600} loading={eager ? "eager" : "lazy"} decoding="async" className="size-full object-cover" /></div>;
}

function WeekendCollectionPage({ page }: { page: any }) {
  const digest = page.weekendDigest;
  const best = digest.sections.find((section: any) => section.id === "best");
  const featuredSlugs = new Set((best?.items ?? []).map((event: any) => event.slug));
  const usedSlugs = new Set(featuredSlugs);
  const secondarySections = digest.sections
    .filter((section: any) => section.id !== "best")
    .map((section: any) => {
      const items = section.items.filter((event: any) => !usedSlugs.has(event.slug));
      const minimumAfterDedupe = section.id === "worth-the-drive" ? 3 : 2;
      if (items.length < minimumAfterDedupe) return null;
      items.forEach((event: any) => usedSlugs.add(event.slug));
      return { ...section, items };
    })
    .filter(Boolean);

  const tripBuilderItems = (best?.items ?? []).filter((event: any) => event.tripLinks?.length).slice(0, 3);

  return <main>
    <section className="border-b border-border bg-surface py-10 sm:py-14"><Container>
      <nav aria-label="Breadcrumb" className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground"><a href="/">Front page</a> / <a href="/events">Texas Events</a> / <span aria-current="page">Texas This Weekend</span></nav>
      <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-end">
        <div>
          <p className="eyebrow text-primary">Texas This Weekend · {digest.dateContext}</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.96] sm:text-7xl">The best things to do in Texas this weekend</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">A short, source-checked guide to the Texas events actually worth considering this weekend — plus metro editions, road-trip ideas and nearby planning paths.</p>
        </div>
        <div className="border-l-4 border-primary pl-5 text-sm leading-7 text-muted-foreground">
          <p><strong className="text-foreground">{page.itemCount.toLocaleString("en-US")} verified guides</strong> have events happening this weekend.</p>
          <p className="mt-2">This page updates automatically as each weekend approaches, so upcoming events move in and past events drop off once they’re over.</p>
        </div>
      </div>
    </Container></section>

    <Container className="py-10 sm:py-14">
      {best ? <section aria-labelledby="top-weekend-picks">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
          <div><p className="eyebrow text-primary">Editor’s shortlist</p><h2 id="top-weekend-picks" className="mt-2 font-display text-4xl">Top 5 this weekend</h2></div>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">Five verified picks selected for freshness, geographic variety and a useful mix of Texas experiences.</p>
        </div>
        <ol className="grid gap-px border-x border-b border-border bg-border md:grid-cols-2 xl:grid-cols-5">
          {best.items.map((event: any, index: number) => <li key={event.slug} className="flex min-h-64 flex-col bg-background">
            <WeekendEventImage event={event} eager={index < 2} />
            <div className="flex flex-1 flex-col p-6">
              <span className="text-right text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">{String(event.category).replaceAll("-", " ")}</span>
              <p className="eyebrow mt-4 text-muted-foreground">{event.city}{event.countyName ? ` · ${event.countyName}` : ""}</p>
              <EventGuideLink event={event} trackId={`weekend:best:${event.slug}`} className="mt-3 block font-display text-2xl leading-tight hover:text-primary">{event.name}</EventGuideLink>
              <p className="mt-3 text-xs font-medium leading-5 text-muted-foreground">{event.detail}</p>
              {event.whyGo ? <p className="mt-4 line-clamp-4 text-sm leading-6 text-muted-foreground">{event.whyGo}</p> : null}
              <p className="mt-auto pt-6 text-sm font-semibold text-primary">Open guide →</p>
            </div>
          </li>)}
        </ol>
      </section> : null}

      {secondarySections.length ? <section className="pt-14" aria-labelledby="browse-weekend-by-area">
        <div className="border-b border-border pb-5"><p className="eyebrow text-primary">Find your version of the weekend</p><h2 id="browse-weekend-by-area" className="mt-2 font-display text-4xl">By metro, region and interest</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Events already featured in the Top 5 are removed here, and an event is used only once across the sections below. Each block adds new options instead of repeating the same names down the page.</p></div>
        <div className="grid gap-8 pt-8 lg:grid-cols-2">
          {secondarySections.map((section: any) => <section key={section.id} className="border border-border p-6">
            <div className="flex items-start justify-between gap-4"><div><p className="eyebrow text-muted-foreground">{section.id.replaceAll("-", " ")}</p><h3 className="mt-2 font-display text-2xl">{section.title}</h3></div>{section.href ? <a href={section.href} className="shrink-0 text-sm font-semibold text-primary">Full edition →</a> : null}</div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{section.description}</p>
            <ol className="mt-5 divide-y divide-border border-y border-border">
              {section.items.map((event: any) => <li key={event.slug} className="py-4"><WeekendEventImage event={event} /><p className="eyebrow mt-4 text-muted-foreground">{event.city}{event.countyName ? ` · ${event.countyName}` : ""}</p><EventGuideLink event={event} trackId={`weekend:${section.id}:${event.slug}`} className="mt-1 block font-display text-xl hover:text-primary">{event.name}</EventGuideLink><p className="mt-2 text-xs leading-5 text-muted-foreground">{event.detail}</p></li>)}
            </ol>
          </section>)}
        </div>
      </section> : null}

      {tripBuilderItems.length ? <section className="pt-14" aria-labelledby="make-a-weekend-of-it">
        <div className="border-b border-border pb-5"><p className="eyebrow text-primary">TexasDefined trip builder</p><h2 id="make-a-weekend-of-it" className="mt-2 font-display text-4xl">Make a weekend of it</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">These are real TexasDefined planning paths attached to the event authority record — city, county, destination, history, food or nearby-event coverage that can turn one event into a practical day trip or overnight.</p></div>
        <div className="grid gap-px border-x border-b border-border bg-border lg:grid-cols-3">
          {tripBuilderItems.map((event: any) => <article key={event.slug} className="bg-background p-6">
            <WeekendEventImage event={event} />
            <p className="eyebrow mt-4 text-muted-foreground">Start in {event.city}</p>
            <h3 className="mt-3 font-display text-2xl">{event.name}</h3>
            {event.whyGo ? <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{event.whyGo}</p> : null}
            <ul className="mt-5 divide-y divide-border border-y border-border">{event.tripLinks.map((link: any) => <li key={link.href}><a href={link.href} data-entity-id={`weekend:trip-builder:${event.slug}:${link.href}`} className="group block py-4"><strong className="font-display text-lg group-hover:text-primary">{link.label}</strong><span className="mt-1 block text-xs leading-5 text-muted-foreground">{link.description}</span></a></li>)}</ul>
            <EventGuideLink event={event} trackId={`weekend:trip-builder:event:${event.slug}`} className="mt-5 inline-block text-sm font-semibold text-primary">Open the event guide →</EventGuideLink>
          </article>)}
        </div>
      </section> : null}

      <section className="pt-14">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5"><div><p className="eyebrow text-primary">More ways to browse</p><h2 className="mt-2 font-display text-3xl">Texas weekend editions</h2></div><a href="/events" className="text-sm font-semibold text-primary">Full Texas calendar →</a></div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/events/houston-this-weekend", "Houston"],
            ["/events/dallas-this-weekend", "Dallas-Fort Worth"],
            ["/events/austin-this-weekend", "Austin"],
            ["/events/san-antonio-this-weekend", "San Antonio"],
          ].map(([href, label]) => <a key={href} href={href} className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">{label}</strong><span className="mt-2 block text-sm text-muted-foreground">Weekend edition →</span></a>)}
        </div>
      </section>

      <details className="mt-14 border-y border-border py-5">
        <summary className="cursor-pointer font-display text-xl">How TexasDefined chooses weekend events</summary>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">A useful shortlist, not a feed dump. Metro, regional and interest sections only appear when enough events qualify, and price-based sections never infer free admission from missing ticket data.</p>
        <div className="mt-5 grid gap-8 text-sm leading-7 text-muted-foreground lg:grid-cols-2">
          <div><h2 className="font-display text-2xl text-foreground">{page.planningTitle}</h2><ol className="mt-4 space-y-3">{page.planningPoints.map((point: string) => <li key={point}>{point}</li>)}</ol></div>
          <div><h2 className="font-display text-2xl text-foreground">{page.sourcePolicyTitle}</h2><div className="mt-4 space-y-3">{page.sourcePolicyParagraphs.map((paragraph: string) => <p key={paragraph}>{paragraph}</p>)}</div></div>
        </div>
      </details>
    </Container>
  </main>;
}

function FallFestivalBrowser({ page }: { page: any }) {
  const [region, setRegion] = useState("all");
  const [month, setMonth] = useState("all");
  const [category, setCategory] = useState("all");
  const year = String(page.dateContext?.match(/20\\d{2}/)?.[0] ?? page.fallToday?.slice(0, 4) ?? "");
  const regions: Record<string, string> = {
    "gulf-coast": "Gulf Coast & Houston",
    "hill-country": "Hill Country & Central Texas",
    "prairies-lakes": "North Texas & Prairies",
    "piney-woods": "East Texas & Piney Woods",
    "south-texas": "South Texas",
    "panhandle": "Panhandle & High Plains",
    "big-bend": "West Texas & Big Bend",
  };
  const events = (page.items as Array<any>).filter((event) => {
    if (region !== "all" && event.region !== region) return false;
    if (category !== "all" && event.category !== category) return false;
    if (month !== "all" && year) {
      const beginning = `${year}-${month}-01`;
      const ending = `${year}-${month}-31`;
      if (event.startDate > ending || (event.endDate ?? event.startDate) < beginning) return false;
    }
    return true;
  });
  const resetFilters = () => { setRegion("all"); setMonth("all"); setCategory("all"); };

  return <section className="pt-12" aria-labelledby="fall-festival-results">
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
      <div><p className="eyebrow text-primary">Current season · automatic expiration</p><h2 id="fall-festival-results" className="mt-2 font-display text-4xl">Upcoming Texas fall festivals</h2></div>
      <a href="/events/this-weekend" className="text-sm font-semibold text-primary">Events this weekend →</a>
    </div>
    <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">
      Past dates disappear automatically at the end of each event's Texas-local day. Christmas lights and other winter events belong in the separate holiday calendar. Only current source-checked, year-specific festival occurrences qualify below; an annual tradition is not evidence of next year's dates.
    </p>
    {page.fallOfficialPicks?.length ? <aside className="mt-8 border border-border bg-surface p-5 sm:p-7" aria-label="More source-confirmed fall festival dates">
      <p className="eyebrow text-primary">Additional official-source calendars</p>
      <h3 className="mt-2 font-display text-2xl">Pumpkin patches and fall outings still on the calendar</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">These organizers have published dates for the editions shown. The daily official-source sync can add new confirmed seasons, while each listing disappears after its final date. Links go directly to organizers rather than to affiliate ticket offers.</p>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {page.fallOfficialPicks.map((event: any) => <article key={event.name} className="border-t border-border pt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">{holidayDateLabel(event.startDate, event.endDate)}</p>
          <h4 className="mt-2 font-display text-xl">{event.name}</h4>
          <p className="mt-1 text-sm font-medium">{event.city}, Texas</p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{event.summary}</p>
          <a href={event.officialUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-primary underline">Check official hours and admission ↗</a>
          <p className="mt-2 text-xs text-muted-foreground">Official schedule checked {event.sourceCheckedAt}</p>
        </article>)}
      </div>
    </aside> : null}
    <div className="mt-8 grid gap-4 sm:grid-cols-3" aria-label="Festival filters">
      <label className="text-sm font-semibold">Region
        <select aria-label="Filter festivals by Texas region" value={region} onChange={(e) => setRegion(e.target.value)} className="mt-2 block w-full rounded-none border border-border bg-background p-3 text-sm">
          <option value="all">All Texas regions</option>
          {Object.entries(regions).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
        </select>
      </label>
      <label className="text-sm font-semibold">Month
        <select aria-label="Filter festivals by month" value={month} onChange={(e) => setMonth(e.target.value)} className="mt-2 block w-full rounded-none border border-border bg-background p-3 text-sm">
          <option value="all">All remaining fall dates</option><option value="09">September</option><option value="10">October</option><option value="11">November</option>
        </select>
      </label>
      <label className="text-sm font-semibold">Festival type
        <select aria-label="Filter festivals by type" value={category} onChange={(e) => setCategory(e.target.value)} className="mt-2 block w-full rounded-none border border-border bg-background p-3 text-sm">
          <option value="all">All festival types</option><option value="seasonal">Harvest & seasonal</option><option value="food">Food & drink</option><option value="music">Live music</option><option value="culture">Arts & culture</option><option value="rodeo">Fairs & rodeos</option>
        </select>
      </label>
    </div>
    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-muted-foreground" role="status" aria-live="polite">{events.length} upcoming or ongoing verified {events.length === 1 ? "guide" : "guides"} match your filters.</p>
      {(region !== "all" || month !== "all" || category !== "all") && <button type="button" onClick={resetFilters} className="text-sm font-semibold text-primary underline">Clear filters</button>}
    </div>
    {events.length ? <ul className="mt-6 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => <li key={event.slug} data-fall-start-date={event.startDate} data-fall-end-date={event.endDate ?? event.startDate} data-fall-name={event.name} className="bg-background p-6">
        {events.indexOf(event) < 6 ? <WeekendEventImage event={event} eager={false} /> : null}
        <p className="eyebrow mt-4 text-muted-foreground">{event.city}{event.countyName ? ` · ${event.countyName}` : ""}</p>
        <p className="mt-2 text-xs font-semibold uppercase text-primary">{event.startDate <= page.fallToday ? "Season underway · check operating days" : "Upcoming"} · {holidayDateLabel(event.startDate, event.endDate)}</p>
        <h3 className="mt-3 font-display text-2xl leading-tight"><EventGuideLink event={event} className="hover:text-primary">{event.name}</EventGuideLink></h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{event.detail}</p>
        <EventGuideLink event={event} className="mt-5 inline-block text-sm font-semibold text-primary">Event guide & official sources →</EventGuideLink>
      </li>)}
    </ul> : <p className="mt-6 border border-border p-8 text-sm leading-7 text-muted-foreground">No confirmed fall festival guides match those filters. Try another region or month, or browse the <a href="/events" className="text-primary underline">full Texas calendar</a>. We do not invent dates to fill an empty list.</p>}
    <aside className="mt-8 grid gap-6 border-y border-border py-7 lg:grid-cols-2">
      <div>
        <p className="eyebrow text-primary">Stay near the festival</p>
        <h3 className="mt-2 font-display text-2xl">Turn a festival into a weekend</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Confirm the event's operating day and city, then compare nearby rooms. Hotel reservations are separate from event admission.</p>
        <a href={buildHotelsComEvergreenClick("https://www.hotels.com/", hotelsComPageSid("/events/fall-festivals"))} rel="sponsored nofollow noopener noreferrer" data-affiliate-partner="hotels.com" data-affiliate-placement="fall-festival-hotel-search" data-commercial-partner="hotels.com" data-commercial-placement="fall-festival-hotel-search" target="_blank" className="mt-4 inline-block text-sm font-semibold text-primary underline">Compare hotels on Hotels.com ↗</a>
        <p className="mt-2 text-xs text-muted-foreground">Affiliate disclosure: TexasDefined may earn a commission on qualifying bookings.</p>
      </div>
      <div>
        <p className="eyebrow text-primary">More seasonal events</p>
        <h3 className="mt-2 font-display text-2xl">Looking for holiday lights instead?</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Christmas train rides, holiday lights and winter markets are organized separately so fall festival results stay relevant.</p>
        <a href="/events/christmas-events" className="mt-4 inline-block text-sm font-semibold text-primary underline">Browse Texas Christmas & holiday events →</a>
      </div>
    </aside>
  </section>;
}


function NovemberCollectionBrowser({ page }: { page: any }) {
  const [region, setRegion] = useState("all");
  const [category, setCategory] = useState("all");
  const [period, setPeriod] = useState("all");
  const [city, setCity] = useState("all");
  const items = page.items as Array<any>;
  const regions: Record<string, string> = {
    "gulf-coast": "Gulf Coast & Houston",
    "hill-country": "Hill Country & Central Texas",
    "prairies-lakes": "Dallas–Fort Worth & North Texas",
    "piney-woods": "East Texas",
    "south-texas": "South Texas & the Rio Grande Valley",
    "panhandle": "Panhandle & High Plains",
    "big-bend": "Big Bend & Far West Texas",
  };
  const categoryLabels: Record<string, string> = {
    sport: "Races & sports", seasonal: "Holiday lights & seasonal",
    culture: "Arts, culture & heritage", food: "Food & drink",
    music: "Music & live events", rodeo: "Rodeos & fairs",
  };
  const year = page.dateContext?.match(/20\d{2}/)?.[0] ?? "2026";
  const cities = [...new Set(items.map((event) => String(event.city)))].sort();
  const categories = [...new Set(items.map((event) => String(event.category)))].sort();
  const periods = [
    { value: "early", label: "Nov 1–10", start: `${year}-11-01`, end: `${year}-11-10` },
    { value: "middle", label: "Nov 11–20", start: `${year}-11-11`, end: `${year}-11-20` },
    { value: "late", label: "Thanksgiving & late Nov (21–30)", start: `${year}-11-21`, end: `${year}-11-30` },
  ];
  const selectedPeriod = periods.find((item) => item.value === period);
  const filtered = items.filter((event) =>
    (region === "all" || event.region === region)
    && (category === "all" || event.category === category)
    && (city === "all" || event.city === city)
    && (!selectedPeriod || (event.startDate <= selectedPeriod.end && (event.endDate ?? event.startDate) >= selectedPeriod.start))
  );
  const featuredNames = [
    "wurstfest", "houston-ballet-nutcracker-market",
    "johnson-city-christmas-lights-spectacular", "south-pole-illuminated-festival",
  ];
  const featured = featuredNames.map((slug) => items.find((event) => event.slug === slug)).filter(Boolean);
  const reset = () => { setRegion("all"); setCategory("all"); setPeriod("all"); setCity("all"); };
  const dateDisplay = (event: any) => holidayDateLabel(event.startDate, event.endDate);
  const isFiltered = region !== "all" || category !== "all" || period !== "all" || city !== "all";

  return <section className="pt-12" aria-labelledby="november-event-results">
    {featured.length ? <div className="mb-12">
      <p className="eyebrow text-primary">Start with these November traditions</p>
      <h2 className="mt-2 font-display text-4xl">Big festivals, holiday markets and lights</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">From early November festivals to opening weekend light displays, these confirmed guides offer useful starting points for a Texas getaway. Individual ticket sessions and daily operating times can vary.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {featured.map((event: any) => <article key={event.slug} className="flex flex-col overflow-hidden border border-border bg-surface">
          {event.image?.url ? <img src={event.image.url} alt={event.image.alt} loading="lazy" width={800} height={600} className="aspect-[4/3] w-full object-cover" /> : null}
          <div className="flex flex-1 flex-col p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">{event.city} · {dateDisplay(event)}</p>
          <h3 className="mt-3 font-display text-2xl leading-tight"><EventGuideLink event={event} className="hover:text-primary">{event.name}</EventGuideLink></h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{categoryLabels[event.category] ?? "Texas event"} · Check the guide for official hours and tickets.</p>
          <EventGuideLink event={event} className="mt-auto pt-5 text-sm font-semibold text-primary">Plan this event →</EventGuideLink>
          </div>
        </article>)}
      </div>
    </div> : null}

    <div className="border-t border-border pt-9">
      <p className="eyebrow text-primary">Find the right date and destination</p>
      <h2 id="november-event-results" className="mt-2 font-display text-4xl">Browse November events</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Filter the verified event guides by part of the month, location and kind of outing. Seasonal attractions may run on selected nights; check the detailed guide and organizer before booking.</p>
    </div>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="November event filters">
      <label className="text-sm font-semibold">When
        <select aria-label="Filter November events by date" value={period} onChange={(event) => setPeriod(event.target.value)} className="mt-2 block w-full border border-border bg-background p-3 text-sm">
          <option value="all">Any November date</option>
          {periods.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
        </select>
      </label>
      <label className="text-sm font-semibold">Texas region
        <select aria-label="Filter November events by region" value={region} onChange={(event) => setRegion(event.target.value)} className="mt-2 block w-full border border-border bg-background p-3 text-sm">
          <option value="all">All regions</option>
          {Object.entries(regions).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
        </select>
      </label>
      <label className="text-sm font-semibold">City
        <select aria-label="Filter November events by city" value={city} onChange={(event) => setCity(event.target.value)} className="mt-2 block w-full border border-border bg-background p-3 text-sm">
          <option value="all">All cities</option>
          {cities.map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
      </label>
      <label className="text-sm font-semibold">Event type
        <select aria-label="Filter November events by category" value={category} onChange={(event) => setCategory(event.target.value)} className="mt-2 block w-full border border-border bg-background p-3 text-sm">
          <option value="all">All event types</option>
          {categories.map((value) => <option key={value} value={value}>{categoryLabels[value] ?? value.replaceAll("-", " ")}</option>)}
        </select>
      </label>
    </div>
    <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground" role="status" aria-live="polite">{filtered.length} of {items.length} verified event guides match your filters.</p>
      {isFiltered ? <button type="button" className="text-sm font-semibold text-primary underline" onClick={reset}>Clear filters</button> : null}
    </div>
    {filtered.length ? <ul className="mt-6 grid gap-px border border-border bg-border sm:grid-cols-2 xl:grid-cols-3">
      {filtered.map((event) => <li key={event.slug} className="flex flex-col bg-background p-6">
        {event.image?.url ? <img src={event.image.url} alt={event.image.alt} loading="lazy" width={800} height={600} className="mb-5 aspect-[4/3] w-full object-cover" /> : null}
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">{dateDisplay(event)}</p>
        <p className="eyebrow mt-3 text-muted-foreground">{event.city}{event.countyName ? ` · ${event.countyName}` : ""}</p>
        <h3 className="mt-3 font-display text-2xl leading-tight"><EventGuideLink event={event} className="hover:text-primary">{event.name}</EventGuideLink></h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{categoryLabels[event.category] ?? "Texas event"}</p>
        {event.detail?.includes("scheduled windows") || event.detail?.includes("Community Impact Center") ? <p className="mt-2 text-xs leading-5 text-muted-foreground">Multiple operating dates or sessions — confirm the exact day in the guide.</p> : null}
        <EventGuideLink event={event} className="mt-auto pt-5 text-sm font-semibold text-primary">Dates, official sources & visitor guide →</EventGuideLink>
      </li>)}
    </ul> : <p className="mt-6 border border-border p-8 text-sm text-muted-foreground">No guides match this combination. Clear one or more filters to see other Texas events.</p>}

    {page.novemberOfficialPicks?.length ? <section className="mt-14 border-t border-border pt-10" aria-labelledby="november-more-official-events">
      <p className="eyebrow text-primary">Also on the 2026 calendar</p>
      <h2 id="november-more-official-events" className="mt-2 font-display text-4xl">Thanksgiving runs and cultural celebrations</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Additional dates confirmed directly by organizers. These link to official sites while detailed TexasDefined event guides are being developed; they are not counted among the permanent guides above.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {page.novemberOfficialPicks.map((pick: any) => <article key={pick.name} className="border border-border p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">{holidayDateLabel(pick.startDate, pick.endDate)} · {pick.city}</p>
          <h3 className="mt-3 font-display text-2xl">{pick.name}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{pick.venue}</p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{pick.summary}</p>
          <a href={pick.officialUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-semibold text-primary underline">Official event schedule & registration ↗</a>
        </article>)}
      </div>
    </section> : null}
    <aside className="mt-10 border-t border-border py-7 text-sm leading-7 text-muted-foreground">
      <strong className="text-foreground">Planning Thanksgiving weekend?</strong> Some holiday attractions start in November but continue into December or January; opening weekend is not a guarantee of daily admission. Check organizer schedules and road closures, and use <a className="text-primary underline" href="/events/christmas-events">the Texas holiday calendar</a> for more light displays and seasonal events.
    </aside>
  </section>;
}

function GenericCollectionPage({ page }: { page: any }) {
  const isTournamentCollection = page.kind === "tournament";
  const isTournamentHub = page.path === "/events/tournaments";
  return <main>
    <section className="border-b border-border bg-surface py-12 sm:py-16"><Container>
      <nav aria-label="Breadcrumb" className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground"><a href="/">Front page</a> / <a href="/events">Texas Events</a> / <span aria-current="page">{page.title}</span></nav>
      <p className="eyebrow mt-8 text-primary">{page.eyebrow}</p>
      <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{page.title}</h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{page.lead}</p>
      <p className="mt-6 text-sm text-muted-foreground">{page.itemCountLabel}</p>
      {!page.shouldIndex && <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">More dates will appear as organizers confirm their upcoming schedules.</p>}
    </Container></section>

    <Container className="py-12 sm:py-16">
      <div className="grid gap-10 border-b border-border pb-12 lg:grid-cols-2">
        <section><p className="eyebrow text-primary">How to plan it</p><h2 className="mt-3 font-display text-3xl">{page.planningTitle}</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">{page.planningIntro}</p><ol className="mt-6 space-y-4">{page.planningPoints.map((point: string, index: number) => <li key={point} className="border-t border-border pt-4 text-sm leading-7 text-muted-foreground"><strong className="mr-2 text-primary">0{index + 1}</strong>{point}</li>)}</ol></section>
        <section><p className="eyebrow text-primary">Source policy</p><h2 className="mt-3 font-display text-3xl">{page.sourcePolicyTitle}</h2><div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">{page.sourcePolicyParagraphs.map((paragraph: string) => <p key={paragraph}>{paragraph}</p>)}</div></section>
      </div>

      {page.path === "/events/christmas-events" && page.christmasPerformances?.length ? (
        <section className="pt-12" aria-labelledby="christmas-2026-shows">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
            <div>
              <p className="eyebrow text-primary">2026 · confirmed performances</p>
              <h2 id="christmas-2026-shows" className="mt-2 font-display text-4xl">Holiday events and concerts in Texas (2026)</h2>
            </div>
            <a href="/events?start=2026-11-15&end=2026-12-31#calendar" className="text-sm font-semibold text-primary">See November–December events on the calendar →</a>
          </div>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">
            Verified dates from theaters, venues and official ticket listings. These are scheduled shows rather than
            multi-week light displays; some productions offer additional performances. Times shown are venue-local.
            Recheck the organizer before traveling or purchasing. Paid tickets are handled by the external provider.
          </p>
          <ol className="mt-6 divide-y divide-border border-y border-border">
            {page.christmasPerformances.map((show: any) => {
              const partner = show.ticket.isAffiliate ? show.ticket.provider : undefined;
              const placement = partner ? "christmas-performance" : undefined;
              const eventId = partner ? `curated:christmas-2026:${show.id}` : undefined;
              return (
              <li key={show.id} className="grid gap-4 py-5 lg:grid-cols-3">
                <div>
                  <p className="font-semibold text-foreground">{show.dateLabel}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{show.timeLabel}</p>
                </div>
                <div>
                  <h3 className="font-display text-xl leading-tight">{show.name}</h3>
                  <p className="mt-1 text-sm font-medium">{show.venue} · {show.city}, Texas</p>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{show.description}</p>
                  <a href={`/events?start=${show.date}&end=${show.date}&location=${encodeURIComponent(`city:${show.city}`)}#calendar`} className="mt-2 mr-3 inline-block text-xs underline text-primary">View this show on the statewide calendar</a>
                  <a href={show.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs underline text-muted-foreground">
                    Schedule source: {show.sourceName} ↗
                  </a>
                </div>
                <div className="text-right">
                  <a
                    href={show.ticket.href}
                    rel={show.ticket.rel}
                    target="_blank"
                    data-affiliate-partner={partner}
                    data-affiliate-placement={placement}
                    data-commercial-partner={partner}
                    data-commercial-placement={placement}
                    data-affiliate-event-id={eventId}
                    onClick={partner ? () => trackAffiliateClick({
                      partner, label: show.ticket.label, placement: placement!,
                      module: "event-ticketing", eventId,
                    }) : undefined}
                    className="inline-flex items-center border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-surface"
                  >
                    {show.ticket.label}
                  </a>
                  {show.ticket.isAffiliate && <p className="mt-2 text-xs leading-5 text-muted-foreground">Affiliate link · checkout is handled by the ticket provider.</p>}
                </div>
              </li>
              );
            })}
          </ol>
        </section>
      ) : null}

      {page.path === "/events/christmas-events" && page.christmasCommunityEvents?.length ? (
        <section className="pt-12" aria-labelledby="christmas-community-events">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
            <div>
              <p className="eyebrow text-primary">Source-verified local traditions</p>
              <h2 id="christmas-community-events" className="mt-2 font-display text-4xl">Christmas lights, parades and community festivals</h2>
            </div>
            <a href="/events?start=2026-11-01&end=2027-01-05#calendar" className="text-sm font-semibold text-primary">Open the full holiday date calendar →</a>
          </div>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">
            These are independently verified 2026–27 event dates, not a claim that every one of the 250 candidate attractions is scheduled this year. Some displays run nightly while other festivals have only one day or a few operating weekends. Always confirm hours and closures with the linked organizer. Smaller attractions remain calendar listings rather than duplicate authority pages.
          </p>
          <ol className="mt-6 grid gap-px border border-border bg-border sm:grid-cols-2 xl:grid-cols-3">
            {page.christmasCommunityEvents.map((event: any) => (
              <li key={event.id} id={`christmas-community-${event.slug}`} className="flex scroll-mt-28 flex-col bg-background p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">{holidayDateLabel(event.startDate, event.endDate)}</p>
                <h3 className="mt-3 font-display text-2xl leading-tight">{event.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{event.venueName ? `${event.venueName} · ` : ""}{event.city}, Texas</p>
                <p className="mt-4 flex-1 text-sm leading-6 text-muted-foreground">{event.summary}</p>
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
                  {event.guidePath ? <a href={event.guidePath} className="text-primary underline">Full event planning guide →</a> : null}
                  <a href={event.officialEventUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline">Official event schedule ↗</a>
                  {event.countyPath ? <a href={event.countyPath} className="text-primary underline">Explore {event.countyName || event.city} →</a> : null}
                </div>
                {event.nearbyExperiencesUrl ? (
                  <div className="mt-4 border-t border-border pt-3">
                    <a href={event.nearbyExperiencesUrl} target="_blank" rel="sponsored nofollow noopener noreferrer" data-affiliate-partner="viator" data-affiliate-placement="christmas-community-nearby-experiences" data-commercial-partner="viator" data-commercial-placement="christmas-community-nearby-experiences" className="text-sm font-semibold text-primary underline">
                      Explore independent {event.city} tours →
                    </a>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">Affiliate link · these nearby activities are not admission to the Christmas event. TexasDefined may earn a commission from qualifying bookings.</p>
                  </div>
                ) : null}
                <p className="mt-3 text-xs text-muted-foreground">Organizer checked {event.verifiedAt}.</p>
              </li>
            ))}
          </ol>
          <aside className="mt-8 grid gap-6 border-y border-border py-6 lg:grid-cols-2" aria-label="Plan a Christmas day trip or weekend">
            <div>
              <p className="eyebrow text-primary">Build a holiday weekend</p>
              <h3 className="mt-2 font-display text-2xl">Compare overnight stays</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Popular event evenings can mean full hotels. Choose the event and city first, then compare lodging dates independently; the linked hotel search is not an event admission ticket.</p>
              <a href={buildHotelsComEvergreenClick("https://www.hotels.com/", hotelsComPageSid("/events/christmas-events"))} rel="sponsored nofollow noopener noreferrer" data-affiliate-partner="hotels.com" data-affiliate-placement="christmas-hub-hotel-search" data-commercial-partner="hotels.com" data-commercial-placement="christmas-hub-hotel-search" target="_blank" className="mt-4 inline-block text-sm font-semibold text-primary underline">Search hotels on Hotels.com →</a>
              <p className="mt-2 text-xs text-muted-foreground">Affiliate disclosure: TexasDefined may earn a commission on qualifying hotel bookings.</p>
            </div>
            <div>
              <p className="eyebrow text-primary">Holiday business partnerships</p>
              <h3 className="mt-2 font-display text-2xl">Reach Christmas travelers</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Local hotels, restaurants, attractions and visitor businesses may inquire about separately approved, clearly labeled seasonal sponsorships. Advertising never determines which events qualify or their editorial order.</p>
              <a href="/partner-with-us?type=brand-retail&amp;source=%2Fevents%2Fchristmas-events&amp;focus=contact" className="mt-4 inline-block text-sm font-semibold text-primary underline">Explore Christmas travel sponsorships →</a>
            </div>
          </aside>
        </section>
      ) : null}

      {page.path === "/events/fall-festivals" ? <FallFestivalBrowser page={page} /> : null}
      {page.path === "/events/november-events" ? <NovemberCollectionBrowser page={page} /> : null}
      {page.path === "/events/fall-festivals" || page.path === "/events/november-events" ? null : <section className="pt-12">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6"><div><p className="eyebrow text-primary">{page.itemsEyebrow}</p><h2 className="mt-2 font-display text-4xl">{page.itemsTitle}</h2></div><a href="/events" className="text-sm font-semibold text-primary">Full Texas calendar →</a></div>
        {page.path === "/events/fall-festivals" ? null : page.items.length ? <ul className="grid gap-px border-x border-b border-border bg-border sm:grid-cols-2 lg:grid-cols-3">{page.items.map((event: any) => <li key={event.slug} className="bg-background p-6"><p className="eyebrow text-muted-foreground">{event.city}{event.countyName ? ` · ${event.countyName}` : ""}</p><h3 className="mt-3 font-display text-2xl leading-tight">{isTournamentCollection ? event.name : <EventGuideLink event={event} className="hover:text-primary">{event.name}</EventGuideLink>}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{event.detail}</p>{!isTournamentCollection && countyGuidePath(event.countyName) ? <a href={countyGuidePath(event.countyName)!} className="mt-3 inline-block text-xs font-semibold text-primary underline">Explore {event.countyName} →</a> : null}{isTournamentCollection ? <a href={event.href} className="mt-5 inline-block text-sm font-semibold text-primary">{isTournamentHub ? "Browse category →" : "Tournament directory →"}</a> : <EventGuideLink event={event} className="mt-5 inline-block text-sm font-semibold text-primary">Open guide →</EventGuideLink>}</li>)}</ul> : <p className="border-x border-b border-border p-8 text-sm leading-7 text-muted-foreground">{page.emptyMessage}</p>}
      </section>}

      <section className="pt-12"><p className="eyebrow text-primary">Keep exploring</p><h2 className="mt-2 font-display text-3xl">Related Texas event guides</h2><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{page.relatedCollections.map((item: any) => <a key={item.path} href={item.path} className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">{item.title}</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">{item.description}</span></a>)}<a href="/events" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Texas Events</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Browse the statewide calendar and all verified event guides.</span></a></div></section>
    </Container>
  </main>;
}

function EventCollectionPage() {
  const { page } = Route.useLoaderData();
  return <>
    {page.weekendDigest ? <WeekendCollectionPage page={page} /> : <GenericCollectionPage page={page} />}
    <Suspense fallback={null}><CalendarBookingDiscovery christmas={page.path === "/events/christmas-events" || page.path === "/events/december-events"} /></Suspense>
  </>;
}