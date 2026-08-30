import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import bluebonnets from "@/assets/bluebonnets.jpg";
import { useBrand } from "@/brand/context";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { EventCard } from "@/components/editorial/EventCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { getMajorEventGuideDirectory } from "@/data/major-event-directory";
import { eventsQuery, regionsQuery } from "@/data/queries";
import { resolveSportsVenueEventLink } from "@/data/sports-venue-event-links";
import type { TexasEvent } from "@/data/types";
import { formatDateRange } from "@/domain/utils/format";
import { absoluteUrl, buildMeta, canonicalLink } from "@/lib/seo";
import { cn } from "@/lib/utils";

const description = "Rodeos, wildflower weekends, barbecue throwdowns, dance halls and county fairs — a curated calendar of what’s worth showing up for across Texas.";
const canonicalPath = "/events";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}${canonicalPath}`;
const EVENT_LABELS: Record<TexasEvent["category"], string> = {
  music: "Live Music",
  food: "Food & Drink",
  rodeo: "Rodeo",
  seasonal: "Seasonal",
  sport: "Sports",
  culture: "Arts & Culture",
};
const EVENT_TOPIC_LINKS = [
  { href: "/events/rodeos", title: "Rodeos & western events", description: "Stock shows, county fairs and rodeo weekends with permanent sourced planning guides." },
  { href: "/events/food-festivals", title: "Food festivals", description: "Barbecue, chili, Oktoberfest, harvest, beer, wine and local food traditions." },
  { href: "/events/music-festivals", title: "Music festivals", description: "Texas country, folk, jazz, blues and other major live-music gatherings." },
  { href: "/events/arts-culture", title: "Arts & culture", description: "Art, film, books, heritage festivals, parades and community traditions." },
  { href: "/events/seasonal-events", title: "Seasonal & holiday events", description: "Wildflowers, holiday parades, fall traditions and other seasonal anchors." },
  { href: "/events/sports-events", title: "Sports events", description: "Races, tournaments and major competition weekends across Texas." },
] as const;
const EVENT_REGION_LINKS = [
  { href: "/events/hill-country-events", title: "Hill Country", description: "Austin, New Braunfels, Fredericksburg, Kerrville and the surrounding region." },
  { href: "/events/gulf-coast-events", title: "Gulf Coast", description: "Houston, Galveston, the Coastal Bend and island event weekends." },
  { href: "/events/north-texas-events", title: "North Texas", description: "Dallas-Fort Worth, Prairies & Lakes cities and nearby fair and festival towns." },
  { href: "/events/south-texas-events", title: "South Texas", description: "San Antonio, border traditions, Valley festivals and regional rodeos." },
  { href: "/events/piney-woods-events", title: "East Texas & Piney Woods", description: "Rose, forest, music and small-town traditions across East Texas." },
  { href: "/events/big-bend-events", title: "Big Bend & Far West", description: "Remote destination events around Terlingua, Alpine, Marfa and Far West Texas." },
  { href: "/events/panhandle-events", title: "Panhandle", description: "Source-qualified High Plains and Panhandle event guides without padded listings." },
] as const;

export const Route = createFileRoute("/events")({
  loader: async ({ context }) => {
    const [events, regions, majorEventGuides] = await Promise.all([
      context.queryClient.ensureQueryData(eventsQuery({})),
      context.queryClient.ensureQueryData(regionsQuery()),
      getMajorEventGuideDirectory(),
    ]);
    return { events, regions, majorEventGuides };
  },
  head: ({ loaderData }) => {
    const regions = loaderData?.regions ?? [];
    const regionName = (id: string) => regions.find((item) => item.id === id)?.name;
    const eventItems = (loaderData?.events ?? []).slice(0, 50).map((event, index) => {
      const venueGuide = resolveSportsVenueEventLink(event.venue);
      const eventUrl = event.id.startsWith("authority:") ? `${siteUrl}/event/${event.slug}` : `${pageUrl}#${event.id}`;
      const defaultLocation = { "@type": "Place", name: [event.city, regionName(event.region), "Texas"].filter(Boolean).join(", "), address: { "@type": "PostalAddress", addressLocality: event.city, addressRegion: "TX", addressCountry: "US" } };
      const location = venueGuide ? { ...defaultLocation, name: event.venue, url: `${siteUrl}${venueGuide.href}` } : defaultLocation;
      return { "@type": "ListItem", position: index + 1, item: { "@type": "Event", "@id": eventUrl, name: event.name, description: event.blurb, startDate: event.startDate, endDate: event.endDate, eventStatus: "https://schema.org/EventScheduled", eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode", url: eventUrl, location } };
    });
    const graph = [
      { "@type": "CollectionPage", "@id": `${pageUrl}#page`, url: pageUrl, name: "Texas Events", description, image: { "@type": "ImageObject", url: absoluteUrl(texasDefinedBrand, bluebonnets), caption: "Bluebonnets running to a fence line in a Texas spring field", width: 1600, height: 1067 }, isPartOf: { "@id": `${siteUrl}/#website` }, mainEntity: { "@id": `${pageUrl}#events` }, breadcrumb: { "@id": `${pageUrl}#breadcrumbs` } },
      { "@type": "ItemList", "@id": `${pageUrl}#events`, name: "Texas events calendar", url: pageUrl, numberOfItems: eventItems.length, itemListElement: eventItems },
      { "@type": "BreadcrumbList", "@id": `${pageUrl}#breadcrumbs`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Front page", item: `${siteUrl}/` }, { "@type": "ListItem", position: 2, name: "Events", item: pageUrl }] },
    ];
    return { meta: buildMeta(texasDefinedBrand, { title: "Texas Events", description, canonicalPath, image: bluebonnets, imageAlt: "Bluebonnets running to a fence line in a Texas spring field" }), links: [canonicalLink(texasDefinedBrand, canonicalPath)], scripts: eventItems.length ? [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }] : [] };
  },
  component: EventsPage,
});

function EventsPage() {
  const brand = useBrand();
  const { data: events } = useSuspenseQuery(eventsQuery({}));
  const { data: regions } = useSuspenseQuery(regionsQuery());
  const { majorEventGuides } = Route.useLoaderData();
  const [category, setCategory] = useState<string>("all");
  const [region, setRegion] = useState<string>("all");
  const regionName = (id: string) => regions.find((item) => item.id === id)?.name;
  const categories = ["all", ...new Set(events.map((event) => event.category))];
  const featured = events[0];
  const featuredVenueGuide = resolveSportsVenueEventLink(featured?.venue);
  const rest = events.slice(1);
  const filtered = rest.filter((event) => (category === "all" || event.category === category) && (region === "all" || event.region === region));

  return <>
    <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
      <img src={bluebonnets} alt="Bluebonnets running to a fence line in a Texas spring field" width={1600} height={1067} className="absolute inset-0 size-full object-cover opacity-42" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/28" />
      <Container className="relative flex min-h-[520px] flex-col justify-end py-16 sm:py-20">
        <nav aria-label="Breadcrumb" className="text-[0.72rem] font-medium uppercase tracking-[0.12em] text-ink-foreground/65"><ol className="flex items-center gap-2"><li><Link to="/" className="hover:text-ink-foreground">Front page</Link></li><li aria-hidden="true">/</li><li aria-current="page">Events</li></ol></nav>
        <p className="eyebrow mt-10 text-ink-foreground/75">The Texas Calendar</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">What’s happening across Texas</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-foreground/82">{description}</p>
        {featured && <div id={featured.id} className="mt-10 max-w-2xl border-t border-ink-foreground/30 pt-6"><p className="eyebrow text-ink-foreground/65">Featured event · {EVENT_LABELS[featured.category]}</p><h2 className="mt-3 font-display text-4xl leading-tight">{featured.name}</h2><p className="mt-3 text-sm leading-7 text-ink-foreground/82">{featured.blurb}</p><p className="mt-4 text-sm text-ink-foreground/65">{formatDateRange(featured.startDate, featured.endDate, brand.identity.locale)} · {featured.city}{regionName(featured.region) ? ` · ${regionName(featured.region)}` : ""}</p>{featuredVenueGuide && <p className="mt-3 text-sm text-ink-foreground/72">Venue: <a href={featuredVenueGuide.href} className="border-b border-ink-foreground/70 text-ink-foreground">{featuredVenueGuide.venueName} guide →</a></p>}<div className="flex flex-wrap gap-5">{featured.officialUrl && <a href={featured.officialUrl} target="_blank" rel="noreferrer noopener" className="eyebrow mt-5 inline-flex border-b border-ink-foreground/70 pb-1 text-ink-foreground">Event details ↗</a>}{featuredVenueGuide && <a href={featuredVenueGuide.href} className="eyebrow mt-5 inline-flex border-b border-ink-foreground/70 pb-1 text-ink-foreground">Plan the venue →</a>}</div></div>}
      </Container>
    </section>

    <section className="border-b border-border bg-surface py-10">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[15rem_1fr] lg:items-start">
          <div>
            <p className="eyebrow text-primary">Understand the tradition</p>
            <h2 className="mt-2 font-display text-3xl">The culture behind the calendar</h2>
          </div>
          <div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
            <Link to="/texas-state-fair" className="group bg-background p-5"><strong className="font-display text-2xl leading-tight group-hover:text-primary">State Fair of Texas 2026</strong><span className="mt-3 block text-sm leading-6 text-muted-foreground">Dates, Fair Park, Big Tex, food, rides and practical planning for the Dallas fair.</span><span className="mt-4 block text-sm font-semibold text-primary">Plan the fair →</span></Link>
            <Link to="/texas-dance-halls-honky-tonks" className="group bg-background p-5"><strong className="font-display text-2xl leading-tight group-hover:text-primary">Dance halls & honky-tonks</strong><span className="mt-3 block text-sm leading-6 text-muted-foreground">Two-step culture, Western swing, historic community halls and how to plan a live-music weekend.</span><span className="mt-4 block text-sm font-semibold text-primary">Read the guide →</span></Link>
            <Link to="/texas-homecoming-mums" className="group bg-background p-5"><strong className="font-display text-2xl leading-tight group-hover:text-primary">Texas homecoming mums</strong><span className="mt-3 block text-sm leading-6 text-muted-foreground">How a school flower became an oversized wearable tradition tied to football, clubs and homecoming week.</span><span className="mt-4 block text-sm font-semibold text-primary">Read the guide →</span></Link>
            <Link to="/german-czech-texas-towns" className="group bg-background p-5"><strong className="font-display text-2xl leading-tight group-hover:text-primary">German & Czech Texas heritage</strong><span className="mt-3 block text-sm leading-6 text-muted-foreground">Connect festivals and music to the towns, churches, bakeries and halls that preserve the deeper history.</span><span className="mt-4 block text-sm font-semibold text-primary">Read the guide →</span></Link>
          </div>
        </div>
      </Container>
    </section>

    <section className="border-b border-border py-10">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[15rem_1fr] lg:items-start">
          <div><p className="eyebrow text-primary">Browse evergreen guides</p><h2 className="mt-2 font-display text-3xl">Texas events by type</h2><p className="mt-4 text-sm leading-6 text-muted-foreground">Crawlable planning collections connect the live calendar to permanent event guides, official-source dates and deeper Texas context.</p></div>
          <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {EVENT_TOPIC_LINKS.map((item) => <a key={item.href} href={item.href} className="group bg-background p-5"><strong className="font-display text-xl leading-tight group-hover:text-primary">{item.title}</strong><span className="mt-3 block text-sm leading-6 text-muted-foreground">{item.description}</span><span className="mt-4 block text-sm font-semibold text-primary">Browse the guides →</span></a>)}
          </div>
        </div>
      </Container>
    </section>

    <section className="border-b border-border bg-surface py-10">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[15rem_1fr] lg:items-start">
          <div><p className="eyebrow text-primary">Plan by geography</p><h2 className="mt-2 font-display text-3xl">Texas events by region</h2><p className="mt-4 text-sm leading-6 text-muted-foreground">Compare event weekends within one part of the state before committing to long drives between cities.</p></div>
          <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {EVENT_REGION_LINKS.map((item) => <a key={item.href} href={item.href} className="group bg-background p-5"><strong className="font-display text-xl leading-tight group-hover:text-primary">{item.title}</strong><span className="mt-3 block text-sm leading-6 text-muted-foreground">{item.description}</span><span className="mt-4 block text-sm font-semibold text-primary">Explore the region →</span></a>)}
          </div>
        </div>
      </Container>
    </section>

    <section className="border-b border-border py-10">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[15rem_1fr] lg:items-start">
          <div><p className="eyebrow text-primary">Plan the anchor event</p><h2 className="mt-2 font-display text-3xl">Major Texas event guides</h2><p className="mt-4 text-sm leading-6 text-muted-foreground">Verified dates, official sources and practical trip-planning context for events large enough to shape a Texas weekend.</p></div>
          <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {majorEventGuides.map(({ slug, name, detail }) => <Link key={slug} to="/event/$slug" params={{ slug }} className="group bg-background p-5"><strong className="font-display text-xl leading-tight group-hover:text-primary">{name}</strong><span className="mt-3 block text-sm leading-6 text-muted-foreground">{detail}</span><span className="mt-4 block text-sm font-semibold text-primary">Plan the event →</span></Link>)}
          </div>
        </div>
      </Container>
    </section>

    <Section><Container>
      <SectionHeader eyebrow="Browse the calendar" title="Find something worth the trip" description="Filter by event type and region to see what’s happening across the state." />
      <div className="mt-8 space-y-4 border-y border-border py-6">
        <FilterRow label="Event type" options={categories.map((value) => ({ value, label: value === "all" ? "All events" : EVENT_LABELS[value as TexasEvent["category"]] }))} active={category} onChange={setCategory} />
        <FilterRow label="Region" options={[{ value: "all", label: "All Texas" }, ...regions.map((item) => ({ value: item.id, label: item.name }))]} active={region} onChange={setRegion} />
        <p className="pt-2 text-sm text-muted-foreground" role="status" aria-live="polite">{filtered.length.toLocaleString("en-US")} {filtered.length === 1 ? "event matches" : "events match"} these selections.</p>
      </div>
      <div className="mt-12 grid gap-12 lg:grid-cols-[1.65fr_0.85fr]">
        <div>{filtered.length > 0 ? <ul>{filtered.map((event) => <li id={event.id} key={event.id}><EventCard event={event} regionLabel={regionName(event.region)} /></li>)}</ul> : <p className="border-t border-border py-10 text-sm text-muted-foreground">No events match those filters right now. Try another region or event type.</p>}</div>
        <aside className="h-fit border-t border-border pt-6 lg:sticky lg:top-32"><p className="eyebrow text-primary">By region</p><h2 className="mt-3 font-display text-3xl">Around the state</h2><ul className="mt-6 space-y-5">{regions.map((item) => { const count = events.filter((event) => event.region === item.id).length; return <li key={item.id} className="border-t border-border pt-4"><button type="button" onClick={() => setRegion(item.id)} aria-pressed={region === item.id} className="flex w-full items-baseline justify-between gap-4 text-left transition-colors hover:text-primary aria-pressed:text-primary"><span className="font-display text-xl">{item.name}</span><span className="text-xs text-muted-foreground">{count}</span></button><p className="mt-2 text-xs leading-6 text-muted-foreground">{item.blurb}</p></li>; })}</ul></aside>
      </div>
    </Container></Section>
  </>;
}

function FilterRow({ label, options, active, onChange }: { label: string; options: { value: string; label: string }[]; active: string; onChange: (value: string) => void }) {
  return <div className="flex flex-wrap items-center gap-2"><span className="eyebrow mr-2 min-w-20 text-muted-foreground">{label}</span>{options.map((option) => <button key={option.value} type="button" onClick={() => onChange(option.value)} aria-pressed={active === option.value} className={cn("border px-3.5 py-1.5 text-sm transition-colors", active === option.value ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary hover:text-primary")}>{option.label}</button>)}</div>;
}
