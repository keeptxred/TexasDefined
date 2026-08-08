import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import bluebonnets from "@/assets/bluebonnets.jpg";
import { useBrand } from "@/brand/context";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { EventCard } from "@/components/editorial/EventCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { eventsQuery, regionsQuery } from "@/data/queries";
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

export const Route = createFileRoute("/events")({
  loader: async ({ context }) => {
    const [events, regions] = await Promise.all([context.queryClient.ensureQueryData(eventsQuery({})), context.queryClient.ensureQueryData(regionsQuery())]);
    return { events, regions };
  },
  head: ({ loaderData }) => {
    const regions = loaderData?.regions ?? [];
    const regionName = (id: string) => regions.find((item) => item.id === id)?.name;
    const eventItems = (loaderData?.events ?? []).slice(0, 50).map((event, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "Event", "@id": `${pageUrl}#${event.id}`, name: event.name, description: event.blurb, startDate: event.startDate, endDate: event.endDate, eventStatus: "https://schema.org/EventScheduled", eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode", url: `${pageUrl}#${event.id}`, location: { "@type": "Place", name: [event.city, regionName(event.region), "Texas"].filter(Boolean).join(", "), address: { "@type": "PostalAddress", addressLocality: event.city, addressRegion: "TX", addressCountry: "US" } } } }));
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
  const [category, setCategory] = useState<string>("all");
  const [region, setRegion] = useState<string>("all");
  const regionName = (id: string) => regions.find((item) => item.id === id)?.name;
  const categories = ["all", ...new Set(events.map((event) => event.category))];
  const featured = events[0];
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
        {featured && <div id={featured.id} className="mt-10 max-w-2xl border-t border-ink-foreground/30 pt-6"><p className="eyebrow text-ink-foreground/65">Featured event · {EVENT_LABELS[featured.category]}</p><h2 className="mt-3 font-display text-4xl leading-tight">{featured.name}</h2><p className="mt-3 text-sm leading-7 text-ink-foreground/82">{featured.blurb}</p><p className="mt-4 text-sm text-ink-foreground/65">{formatDateRange(featured.startDate, featured.endDate, brand.identity.locale)} · {featured.city}{regionName(featured.region) ? ` · ${regionName(featured.region)}` : ""}</p>{featured.officialUrl && <a href={featured.officialUrl} target="_blank" rel="noreferrer noopener" className="eyebrow mt-5 inline-flex border-b border-ink-foreground/70 pb-1 text-ink-foreground">Event details ↗</a>}</div>}
      </Container>
    </section>

    <Section><Container>
      <SectionHeader eyebrow="Browse the calendar" title="Find something worth the trip" description="Filter by event type and region to see what’s happening across the state." />
      <div className="mt-8 space-y-4 border-y border-border py-6">
        <FilterRow label="Event type" options={categories.map((value) => ({ value, label: value === "all" ? "All events" : EVENT_LABELS[value as TexasEvent["category"]] }))} active={category} onChange={setCategory} />
        <FilterRow label="Region" options={[{ value: "all", label: "All Texas" }, ...regions.map((item) => ({ value: item.id, label: item.name }))]} active={region} onChange={setRegion} />
      </div>
      <div className="mt-12 grid gap-12 lg:grid-cols-[1.65fr_0.85fr]">
        <div>{filtered.length > 0 ? <ul>{filtered.map((event) => <li id={event.id} key={event.id}><EventCard event={event} regionLabel={regionName(event.region)} /></li>)}</ul> : <p className="border-t border-border py-10 text-sm text-muted-foreground">No events match those filters right now. Try another region or event type.</p>}</div>
        <aside className="h-fit border-t border-border pt-6 lg:sticky lg:top-32"><p className="eyebrow text-primary">By region</p><h2 className="mt-3 font-display text-3xl">Around the state</h2><ul className="mt-6 space-y-5">{regions.map((item) => { const count = events.filter((event) => event.region === item.id).length; return <li key={item.id} className="border-t border-border pt-4"><button type="button" onClick={() => setRegion(item.id)} className="flex w-full items-baseline justify-between gap-4 text-left transition-colors hover:text-primary"><span className="font-display text-xl">{item.name}</span><span className="text-xs text-muted-foreground">{count}</span></button><p className="mt-2 text-xs leading-6 text-muted-foreground">{item.blurb}</p></li>; })}</ul></aside>
      </div>
    </Container></Section>
  </>;
}

function FilterRow({ label, options, active, onChange }: { label: string; options: { value: string; label: string }[]; active: string; onChange: (value: string) => void }) {
  return <div className="flex flex-wrap items-center gap-2"><span className="eyebrow mr-2 min-w-20 text-muted-foreground">{label}</span>{options.map((option) => <button key={option.value} type="button" onClick={() => onChange(option.value)} aria-pressed={active === option.value} className={cn("border px-3.5 py-1.5 text-sm transition-colors", active === option.value ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary hover:text-primary")}>{option.label}</button>)}</div>;
}
