import { Link } from "@tanstack/react-router";

import bluebonnets from "@/assets/bluebonnets.jpg";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { TexasEventCarousel } from "@/components/editorial/TexasEventCarousel";
import { Container } from "@/components/layout/Container";
import type { TexasEvent } from "@/data/types";

const routeDescription = "Rodeos, wildflower weekends, barbecue throwdowns, dance halls and county fairs — a curated calendar of what’s worth showing up for across Texas.";
const EVENT_LABELS: Record<TexasEvent["category"], string> = {
  music: "Live Music",
  food: "Food & Drink",
  rodeo: "Rodeo",
  seasonal: "Seasonal",
  sport: "Sports",
  culture: "Arts & Culture",
};

export type EventSearch = { featured: string; location: string; start: string; end: string; category: string; venue: string };

type CalendarView = {
  monthLabel: string;
  totalCount: number;
  dateSummary: string;
  resultsHeading: string;
  truncated: boolean;
  showClearDates: boolean;
  previousHref: string;
  todayHref: string;
  nextHref: string;
  clearDatesHref: string;
  nextEventHref: string;
  categories: TexasEvent["category"][];
  cityOptions: string[];
  countyOptions: Array<[string, string]>;
  venueOptions: Array<[string, string]>;
  calendarDays: Array<{ date: string; dayNumber: number; count: number; inMonth: boolean; selected: boolean; href: string; ariaLabel: string }>;
  results: Array<{
    id: string;
    category: TexasEvent["category"];
    guidePath: string;
    title: string;
    city: string;
    countyName?: string;
    venueName?: string;
    venuePath?: string;
    summary: string;
    officialEventUrl: string;
    dateLabel: string;
    lastVerifiedLabel: string;
  }>;
};

type DiscoveryLink = { href: string; title: string; description: string };
type MajorEventGuide = { slug: string; href: string; name: string; detail: string };
type Region = { id: string; name: string };
type FeaturedVenueGuide = { href: string; venueName: string } | null | undefined;
type CarouselEvents = Parameters<typeof TexasEventCarousel>[0]["events"];

export interface EventsLandingData {
  events: TexasEvent[];
  regions: Region[];
  majorEventGuides: MajorEventGuide[];
  eventTimingLinks: DiscoveryLink[];
  eventTopicLinks: DiscoveryLink[];
  eventRegionLinks: DiscoveryLink[];
  featuredVenueGuide: FeaturedVenueGuide;
  featuredDateLabel: string;
  upcomingEventRecords: CarouselEvents;
  calendarView: CalendarView;
}

export function EventsLandingPage({ data, search }: { data: EventsLandingData; search: EventSearch }) {
  const { events, regions, majorEventGuides, eventTimingLinks, eventTopicLinks, eventRegionLinks, featuredVenueGuide, featuredDateLabel, upcomingEventRecords, calendarView } = data;
  const regionName = (id: string) => regions.find((item) => item.id === id)?.name;
  const featured = events[0];

  return <>
    <section className="ev-hero">
      <img src={bluebonnets} alt="Bluebonnets running to a fence line in a Texas spring field" width={1600} height={1067} className="ev-hero-img" />
      <div className="ev-hero-shade" />
      <Container className="ev-hero-inner">
        <nav aria-label="Breadcrumb" className="ev-crumb"><ol><li><Link to="/">Front page</Link></li><li aria-hidden="true">/</li><li aria-current="page">Events</li></ol></nav>
        <p className="eyebrow ev-kicker">The Texas Calendar</p>
        <h1 className="ev-h1">What’s happening across Texas</h1>
        <p className="ev-intro">{routeDescription}</p>
        {featured && <div id={featured.id} className="ev-feature"><p className="eyebrow ev-feature-k">Featured event · {EVENT_LABELS[featured.category]}</p><h2>{featured.name}</h2><p className="ev-feature-copy">{featured.blurb}</p><p className="ev-feature-meta">{featuredDateLabel} · {featured.city}{regionName(featured.region) ? ` · ${regionName(featured.region)}` : ""}</p>{featuredVenueGuide && <p className="ev-venue">Venue: <a href={featuredVenueGuide.href}>{featuredVenueGuide.venueName} guide →</a></p>}<div className="ev-hero-links">{featured.officialUrl && <a href={featured.officialUrl} target="_blank" rel="noreferrer noopener" className="eyebrow ev-hero-link">Event details ↗</a>}{featuredVenueGuide && <a href={featuredVenueGuide.href} className="eyebrow ev-hero-link">Plan the venue →</a>}</div></div>}
      </Container>
    </section>

    <Container>
      <TexasEventCarousel events={upcomingEventRecords} title="Upcoming events across Texas" eyebrow="Verified statewide calendar" viewAllHref="/events#calendar" />
    </Container>

    <section className="ev-section ev-surface"><Container><div className="ev-split"><div><p className="eyebrow ev-e">Understand the tradition</p><h2 className="ev-title">The culture behind the calendar</h2></div><div className="ev-grid4">
      <EditorialLink href="/texas-state-fair" title="State Fair of Texas 2026" text="Dates, Fair Park, Big Tex, food, rides and practical planning for the Dallas fair." />
      <EditorialLink href="/texas-dance-halls-honky-tonks" title="Dance halls & honky-tonks" text="Two-step culture, Western swing, historic community halls and how to plan a live-music weekend." />
      <EditorialLink href="/texas-homecoming-mums" title="Texas homecoming mums" text="How a school flower became an oversized wearable tradition tied to football, clubs and homecoming week." />
      <EditorialLink href="/german-czech-texas-towns" title="German & Czech Texas heritage" text="Connect festivals and music to the towns, churches, bakeries and halls that preserve the deeper history." />
    </div></div></Container></section>

    <DiscoverySection eyebrow="Plan by time" title="What’s happening when" description="Finite rolling and seasonal views use the same verified authority catalog." links={eventTimingLinks} />
    <DiscoverySection eyebrow="Browse evergreen guides" title="Texas events by type" description="Crawlable planning collections connect the live calendar to permanent event guides and deeper Texas context." links={eventTopicLinks} />
    <DiscoverySection eyebrow="Plan by geography" title="Texas events by region" description="Compare event weekends within one part of the state before committing to long drives between cities." links={eventRegionLinks} surface />

    <section className="ev-section"><Container><div className="ev-split"><div><p className="eyebrow ev-e">Plan the anchor event</p><h2 className="ev-title">Major Texas event guides</h2><p className="ev-copy">Verified dates, official sources and practical trip-planning context for events large enough to shape a Texas weekend.</p></div><div className="ev-grid4">{majorEventGuides.map(({ slug, href, name, detail }) => href === `/event/${slug}` ? <Link key={`${slug}:${href}`} to="/event/$slug" params={{ slug }} className="ev-card"><strong>{name}</strong><span className="ev-card-copy">{detail}</span><span className="ev-card-go">Plan the event →</span></Link> : <a key={`${slug}:${href}`} href={href} className="ev-card"><strong>{name}</strong><span className="ev-card-copy">{detail}</span><span className="ev-card-go">Plan the event →</span></a>)}</div></div></Container></section>

    <Section><Container>
      <SectionHeader eyebrow="Browse the calendar" title="Find something worth the trip" description="Choose a month or day, then narrow by location, event type or venue. Every filtered view has a shareable URL." />
      <GlobalEventCalendar calendarView={calendarView} regions={regions} search={search} />
    </Container></Section>
  </>;
}

function GlobalEventCalendar({ calendarView, regions, search }: { calendarView: CalendarView; regions: Region[]; search: EventSearch }) {
  return <div id="calendar" className="ev-cal">
    <form action="/events" className="ev-filter">
      {search.start && <input type="hidden" name="start" value={search.start} />}{search.end && <input type="hidden" name="end" value={search.end} />}
      <label><span className="eyebrow ev-label">Location</span><select name="location" defaultValue={search.location} className="ev-select"><option value="">All Texas</option><optgroup label="Regions">{regions.map((region) => <option key={region.id} value={`region:${region.id}`}>{region.name}</option>)}</optgroup><optgroup label="Cities">{calendarView.cityOptions.map((city) => <option key={city} value={`city:${city}`}>{city}</option>)}</optgroup>{calendarView.countyOptions.length ? <optgroup label="Counties">{calendarView.countyOptions.map(([slug, name]) => <option key={slug} value={`county:${slug}`}>{name}</option>)}</optgroup> : null}</select></label>
      <label><span className="eyebrow ev-label">Event type</span><select name="category" defaultValue={search.category} className="ev-select"><option value="">All event types</option>{calendarView.categories.map((category) => <option key={category} value={category}>{EVENT_LABELS[category]}</option>)}</select></label>
      <label><span className="eyebrow ev-label">Venue</span><select name="venue" defaultValue={search.venue} className="ev-select"><option value="">All venues</option>{calendarView.venueOptions.map(([id, name]) => <option key={id} value={id}>{name}</option>)}</select></label>
      <div className="ev-filter-actions"><button type="submit" className="eyebrow ev-filter-action">Apply filters →</button>{(search.location || search.category || search.venue || search.start || search.end) && <a href="/events#calendar" className="eyebrow ev-filter-action ev-filter-clear">Clear all</a>}</div>
    </form>

    <div className="ev-cal-layout">
      <div>
        <div className="ev-cal-head"><div><p className="eyebrow ev-e">Interactive calendar</p><h2 className="ev-cal-month">{calendarView.monthLabel}</h2></div><div className="ev-cal-nav"><a href={calendarView.previousHref} className="ev-nav">← Previous</a><a href={calendarView.todayHref} className="ev-nav">Today</a><a href={calendarView.nextHref} className="ev-nav">Next →</a></div></div>
        <div className="ev-weekdays">{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => <span key={day} className="ev-weekday">{day}</span>)}</div>
        <div className="ev-days">{calendarView.calendarDays.map((day) => <a key={day.date} href={day.href} aria-current={day.selected ? "date" : undefined} aria-label={day.ariaLabel} className={`ev-day${day.inMonth ? "" : " ev-day-dim"}${day.selected ? " ev-day-selected" : ""}`}><span className="ev-day-num">{day.dayNumber}</span>{day.count > 0 && <span className="ev-day-count">{day.count} {day.count === 1 ? "event" : "events"}</span>}</a>)}</div>
        <div className="ev-cal-tools">{calendarView.showClearDates && <a href={calendarView.clearDatesHref} className="ev-link">Clear dates</a>}{calendarView.nextEventHref && <a href={calendarView.nextEventHref} className="ev-link">Jump to next event →</a>}</div>
      </div>

      <aside className="ev-status"><p className="eyebrow ev-e">Calendar status</p><p className="ev-status-count">{calendarView.totalCount.toLocaleString("en-US")} {calendarView.totalCount === 1 ? "event" : "events"}</p><p className="ev-status-copy">{calendarView.dateSummary}</p>{calendarView.truncated && <p className="ev-status-small">Showing the first {calendarView.results.length}; narrow the date or filters for a shorter list.</p>}</aside>
    </div>

    <div id="calendar-results" className="ev-results"><div className="ev-results-head"><div><p className="eyebrow ev-e">Results</p><h2 className="ev-cal-month">{calendarView.resultsHeading}</h2></div><p className="ev-results-count" role="status" aria-live="polite">Showing {calendarView.results.length} of {calendarView.totalCount}</p></div>{calendarView.results.length ? <ul className="ev-results-list">{calendarView.results.map((event) => <li key={event.id} id={`calendar-event-${event.id}`}><article className="ev-result"><p className="eyebrow ev-e">{EVENT_LABELS[event.category]} · {event.dateLabel}</p><h3 className="ev-result-title"><a href={event.guidePath}>{event.title}</a></h3><p className="ev-result-meta">{event.city}{event.countyName ? ` · ${event.countyName}` : ""}{event.venueName ? ` · ${event.venueName}` : ""}</p><p className="ev-result-copy">{event.summary}</p><div className="ev-result-links"><a href={event.guidePath} className="ev-link">{event.guidePath.startsWith("/events?") ? "View date" : "Event guide"}</a><a href={event.officialEventUrl} target="_blank" rel="noreferrer noopener" className="ev-link">Official event site ↗</a>{event.venuePath && <a href={event.venuePath} className="ev-link">Venue guide</a>}</div><p className="ev-result-note">Last verified {event.lastVerifiedLabel}. Confirm event-day details with the official source before traveling.</p></article></li>)}</ul> : <p className="ev-empty">No source-qualified events match this view. Try another date, location, type or venue.</p>}</div>
  </div>;
}

function EditorialLink({ href, title, text }: { href: string; title: string; text: string }) { return <a href={href} className="ev-card ev-card-large"><strong>{title}</strong><span className="ev-card-copy">{text}</span><span className="ev-card-go">Read the guide →</span></a>; }
function DiscoverySection({ eyebrow, title, description, links, surface = false }: { eyebrow: string; title: string; description: string; links: DiscoveryLink[]; surface?: boolean }) { return <section className={`ev-section${surface ? " ev-surface" : ""}`}><Container><div className="ev-split"><div><p className="eyebrow ev-e">{eyebrow}</p><h2 className="ev-title">{title}</h2><p className="ev-copy">{description}</p></div><div className="ev-grid3">{links.map((item) => <a key={item.href} href={item.href} className="ev-card"><strong>{item.title}</strong><span className="ev-card-copy">{item.description}</span><span className="ev-card-go">Explore →</span></a>)}</div></div></Container></section>; }
