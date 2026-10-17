import { createLazyFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { BookingCarRentalCard } from "@/components/monetization/BookingCarRentalCard";
import { majorEventIndexRecords } from "@/data/major-event-index";

const publishedAirshowSlugs = [
  "amigo-airsho",
  "wings-over-houston-airshow",
  "texas-capital-air-show",
  "bluebonnet-airshow",
  "wings-over-cowtown-airshow",
] as const;

const showDetails: Record<string, { kind: string; planning: string; tickets?: string; source: string }> = {
  "amigo-airsho": {
    kind: "Military installation",
    planning: "Fort Bliss entry requires an accepted government-issued ID. Check gate rules and allow time for security; the official 2026 program lists aerial performances approximately 11:30 a.m.–4:30 p.m.",
    tickets: "https://www.amigoairsho.com/tickets",
    source: "https://www.amigoairsho.com/faqs",
  },
  "wings-over-houston-airshow": {
    kind: "Major public air show",
    planning: "Free shuttles are included with admission. Limited on-site parking and the last inbound shuttle at 2:30 p.m. make advance parking planning especially important.",
    tickets: "https://wingsoverhouston.com/2026-woha-tickets-sasp/",
    source: "https://wingsoverhouston.com/travel/",
  },
  "texas-capital-air-show": {
    kind: "Public air show",
    planning: "General admission and the required advance vehicle parking pass are separate purchases. Published 2026 flying hours are approximately noon–4 p.m.",
    tickets: "https://texascapitalairshow.com/tickets/",
    source: "https://texascapitalairshow.com/guest-information/schedule/",
  },
  "bluebonnet-airshow": {
    kind: "Warbirds and aerobatics",
    planning: "The 2027 show is confirmed for March 20. The organizer says the general public cannot park at the airport; check current offsite instructions.",
    tickets: "https://www.bluebonnetairshow.com/",
    source: "https://www.bluebonnetairshow.com/",
  },
  "wings-over-cowtown-airshow": {
    kind: "Military installation",
    planning: "The Navy's published 2027 Blue Angels schedule confirms April 24–25. The host's gates, parking, ID rules and ticket details are still pending.",
    source: "https://www.blueangels.navsea.cloud.navy.mil/show/",
  },
};

// These are discoveries from the 2026 season, NOT announcements of 2027 occurrences.
// They are intentionally not given fabricated new dates or thin event-guide URLs.
const historicalGuidePaths: Record<string, string> = {
  "WASP Homecoming & Fly-In": "/event/wasp-homecoming-fly-in",
  "Wings Over South Texas": "/event/wings-over-south-texas",
  "The Great Texas Air Show": "/event/great-texas-airshow",
  "Rose City Airfest": "/event/rose-city-airfest",
  "Kaboom Town Airport Air Show": "/event/addison-kaboom-town-airshow",
  "Stars and Stripes Air Show Spectacular": "/event/laredo-stars-stripes-airshow",
  "Corsicana Airsho": "/event/corsicana-airsho",
  "Warbird Weekend": "/event/dallas-warbird-weekend",
  "Fiesta of Flight Open House": "/event/fiesta-of-flight-laughlin",
  "Thunder Over East Texas": "/event/thunder-over-east-texas-athens",
  "CAF High Sky Wing AIRSHO": "/event/caf-high-sky-wing-airsho",
};

const historical2026 = [
  ["Stars and Stripes Air Show Spectacular", "Laredo"],
  ["Stephanie Nichols Annual Car & Plane Show", "Georgetown"],
  ["Warbird Weekend", "Dallas"],
  ["Fiesta of Flight Open House", "Del Rio"],
  ["WASP Homecoming & Fly-In", "Sweetwater"],
  ["Wings Over South Texas", "Kingsville"],
  ["The Great Texas Air Show", "San Antonio"],
  ["Armed Forces Day Fly-In & Historic Aircraft Show", "Greenville"],
  ["Biplanes and Breakfast", "Rockport"],
  ["Kaboom Town Airport Air Show", "Addison"],
  ["Thunder Over East Texas", "Athens"],
  ["Magnificent Warbird Expo", "Tyler"],
  ["Thunder Over Cedar Creek Lake", "Mabank"],
  ["CAF High Sky Wing AIRSHO", "Midland"],
  ["Rose City Airfest", "Tyler"],
  ["Corsicana Airsho", "Corsicana"],
] as const;

// Confirmed 2027 organizer dates; keep heavy source-backed authority copy server-only.
// No addition to the shared main-client event index (protected bundle budget).
const confirmedHeritageFlyIns = [
  {
    slug: "fall-festival-of-flight-gainesville",
    name: "Fall Festival of Flight — Gainesville",
    city: "Gainesville",
    venue: "Gainesville Municipal Airport",
    startDate: "2027-09-18",
    endDate: "2027-09-18",
    label: "Antique and classic aircraft",
    planning: "The Texas Antique Airplane Association confirms September 18, 2027. The precise flying program, opening hours and admission fees are not yet announced.",
    officialUrl: "https://texasantiqueairplane.com/flyin.html",
  },
  {
    slug: "ranger-old-school-fly-in-airshow",
    name: "Ranger Old School Fly-In & Airshow",
    city: "Ranger",
    venue: "Ranger Airfield (F23)",
    startDate: "2027-10-01",
    endDate: "2027-10-03",
    label: "Historic-airfield fly-in",
    planning: "Confirmed for October 1–3, 2027. Fly-in and drive-in entry have different rules; the organizer currently lists Saturday adult drive-in admission at $15 and 17-and-under free.",
    officialUrl: "https://www.rangerairfield.org/airshow",
  },
] as const;

const confirmed = majorEventIndexRecords
  .filter((item) => publishedAirshowSlugs.some((slug) => slug === item.slug))
  .sort((a, b) => a.startDate.localeCompare(b.startDate));

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })
    .format(new Date(value + "T12:00:00Z"));


export const Route = createLazyFileRoute("/events/air-shows")({ component: TexasAirShowsPage });

const airShowCollectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Texas Air Shows: Dates, Tickets & Visitor Guides",
  url: "https://texasdefined.com/events/air-shows",
  description: "Texas air-show visitor planning with verified upcoming dates, organizer tickets, military-base access, parking and hotels.",
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: confirmed.length + confirmedHeritageFlyIns.length,
    itemListElement: [
      ...confirmed.map((event, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: event.name,
        url: "https://texasdefined.com/event/" + event.slug,
      })),
      ...confirmedHeritageFlyIns.map((event, index) => ({
        "@type": "ListItem",
        position: confirmed.length + index + 1,
        name: event.name,
        url: "https://texasdefined.com/event/" + event.slug,
      })),
    ],
  },
};

function TexasAirShowsPage() {
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = confirmed.filter((event) => (event.endDate || event.startDate) >= today);
  const completed = confirmed.filter((event) => (event.endDate || event.startDate) < today);
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(airShowCollectionSchema) }} />
    <section className="border-b border-border bg-surface py-10 sm:py-16">
      <Container>
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground"><a href="/">Texas Defined</a> / <a href="/events">Events</a> / Air shows</nav>
        <p className="eyebrow mt-8 text-primary">Texas aviation and travel</p>
        <h1 className="mt-3 max-w-4xl font-display text-5xl sm:text-6xl">Texas Air Shows: Dates, Tickets & Visitor Guides</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">Plan for jet teams, vintage warbirds, military flyovers and family-friendly aviation experiences across Texas. This directory distinguishes confirmed shows from past events awaiting new dates.</p>
        <p className="mt-4 text-sm text-muted-foreground">Organizer and U.S. Navy schedule information checked October 17, 2026. Confirm admission, parking, lineups and weather plans directly with the host before traveling.</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href="#confirmed" className="inline-flex min-h-11 items-center bg-primary px-5 py-3 font-semibold text-primary-foreground">Confirmed shows ↓</a>
          <a href="#past-calendar" className="inline-flex min-h-11 items-center border border-border px-5 py-3 font-semibold">Other Texas air shows ↓</a>
        </div>
      </Container>
    </section>

    <Container className="py-10 sm:py-14">
      <section id="confirmed">
        <p className="eyebrow text-primary">Source-checked calendar</p>
        <h2 className="mt-3 font-display text-4xl">Upcoming Texas air shows</h2>
        <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">Only confirmed dates belong on this list. An air show held in 2026 does not automatically receive a guessed 2027 date.</p>
        <div className="mt-7 grid gap-5 md:grid-cols-2">
          {upcoming.map((event) => {
            const extra = showDetails[event.slug];
            return <article key={event.slug} className="flex flex-col border border-border p-6">
              <p className="eyebrow text-primary">{extra.kind} · {event.city}</p>
              <h3 className="mt-3 font-display text-3xl"><a href={"/event/" + event.slug} className="hover:text-primary">{event.name}</a></h3>
              <p className="mt-3 font-semibold">{formatDate(event.startDate)}{event.endDate && event.endDate !== event.startDate ? " – " + formatDate(event.endDate) : ""}</p>
              <p className="mt-1 text-sm text-muted-foreground">{event.venue}</p>
              <p className="mt-5 flex-1 leading-7 text-muted-foreground">{extra.planning}</p>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold">
                <a href={"/event/" + event.slug} className="text-primary underline">Full visitor guide →</a>
                {extra.tickets ? <a href={extra.tickets} target="_blank" rel="noopener noreferrer" className="underline">Official tickets ↗</a> : <a href={event.officialUrl} target="_blank" rel="noopener noreferrer" className="underline">Organizer updates ↗</a>}
              </div>
            </article>;
          })}
        </div>
        <h3 className="mt-10 font-display text-3xl">Confirmed 2027 fly-ins and historic-aircraft festivals</h3>
        <p className="mt-3 leading-7 text-muted-foreground">The organizers have confirmed these 2027 dates. These are classic-aircraft and aviation-heritage experiences, not guaranteed military jet-team shows.</p>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {confirmedHeritageFlyIns.map((event) => <article key={event.slug} className="flex flex-col border border-border p-6">
            <p className="eyebrow text-primary">{event.label} · {event.city}</p>
            <h4 className="mt-3 font-display text-2xl"><a className="hover:text-primary" href={"/event/" + event.slug}>{event.name}</a></h4>
            <p className="mt-3 font-semibold">{formatDate(event.startDate)}{event.endDate !== event.startDate ? " – " + formatDate(event.endDate) : ""}</p>
            <p className="mt-1 text-sm text-muted-foreground">{event.venue}</p>
            <p className="mt-5 flex-1 leading-7 text-muted-foreground">{event.planning}</p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold">
              <a className="text-primary underline" href={"/event/" + event.slug}>Full visitor guide →</a>
              <a className="underline" href={event.officialUrl} target="_blank" rel="noopener noreferrer">Official organizer updates ↗</a>
            </div>
          </article>)}
        </div>
        {upcoming.length === 0 && confirmedHeritageFlyIns.length === 0 ? <p className="mt-6 border border-border p-5">No upcoming verified dates in the current inventory. Consult organizers before booking.</p> : null}
        {completed.length ? <div className="mt-9"><h3 className="font-display text-2xl">Recently completed shows</h3><ul className="mt-3 space-y-2">{completed.map((event) => <li key={event.slug}><a className="font-semibold text-primary underline" href={"/event/" + event.slug}>{event.name}</a> · {event.city} · {formatDate(event.startDate)}</li>)}</ul></div> : null}
      </section>

      <section className="mt-14 border-t border-border pt-10">
        <h2 className="font-display text-3xl">How to choose an air show</h2>
        <div className="mt-6 grid gap-7 md:grid-cols-3">
          <div><h3 className="font-display text-xl">Jet teams and military aircraft</h3><p className="mt-2 leading-7 text-muted-foreground">Start with published U.S. Navy or U.S. Air Force schedules, then verify the host's exact daily program. Demonstration teams can change plans.</p></div>
          <div><h3 className="font-display text-xl">Warbirds and aviation heritage</h3><p className="mt-2 leading-7 text-muted-foreground">Look for Commemorative Air Force groups, static aircraft displays and local museums. Do not mistake last year's performer list for a confirmed current-year roster.</p></div>
          <div><h3 className="font-display text-xl">Admission, access and parking</h3><p className="mt-2 leading-7 text-muted-foreground">Every airfield has its own rules. Some shows include shuttles, some require paid parking passes, and military-base events may require additional identification.</p></div>
        </div>
      </section>

      <section className="mt-14 border-t border-border pt-10">
        <h2 className="font-display text-3xl">Hotels and overnight planning</h2>
        <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">A hotel is most useful when you need to arrive before morning gate opening, avoid post-show traffic or extend your visit around a Texas destination. Each individual show guide has the site's existing location-aware stay options. We do not advertise invented nightly rates or claim a hotel is next to an airfield without checking.</p>
        <a href="https://www.anrdoezrs.net/links/101876465/type/dlg/https://www.hotels.com/" target="_blank" rel="sponsored nofollow noopener noreferrer" data-affiliate-partner="hotels.com" data-affiliate-placement="airshows-hub-stays" data-commercial-partner="hotels.com" data-commercial-placement="airshows-hub-stays" className="mt-5 inline-flex min-h-11 items-center border border-primary px-5 py-3 font-semibold text-primary">Compare Texas hotels on Hotels.com ↗</a>
        <p className="mt-2 text-xs text-muted-foreground">Affiliate disclosure: Texas Defined may earn a commission on qualifying hotel bookings at no additional cost to you. Ticket links above go directly to event organizers and are not presented as Ticketmaster affiliate offers.</p>
      </section>

      <BookingCarRentalCard className="mt-9" placement="air-shows-statewide-hub" title="Arriving by plane or driving to another Texas air show?" />
      
      <section id="past-calendar" className="mt-14 border-t border-border pt-10">
        <h2 className="font-display text-3xl">Other Texas aviation events to watch</h2>
        <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">These were identified in the 2026 Texas air-show season inventory. They are a research checklist, not a live 2027 calendar. Each needs a fresh organizer confirmation before Texas Defined publishes new dates, ticket availability or a standalone authority guide.</p>
        <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {historical2026.map(([name, city]) => <li key={name} className="border border-border px-4 py-4">{historicalGuidePaths[name] ? <a href={historicalGuidePaths[name]} className="block font-semibold text-primary underline">{name} — full planning guide →</a> : <strong className="block">{name}</strong>}<span className="mt-1 block text-sm text-muted-foreground">{city} · next date not verified</span></li>)}
        </ul>
        <p className="mt-5 text-sm text-muted-foreground">Historical discovery source: <a className="underline" href="https://www.airshowcenter.com/airshows/1-43/texas/all" target="_blank" rel="noopener noreferrer">Air Show Center's 2026 Texas listings</a>. That independent calendar is not a substitute for official confirmation.</p>
      </section>

      <section className="mt-14 border-t border-border pt-10">
        <h2 className="font-display text-3xl">Frequently asked questions</h2>
        <div className="mt-6 space-y-6">
          <div><h3 className="font-display text-xl">Are Texas air shows free?</h3><p className="mt-2 leading-7 text-muted-foreground">Not necessarily. Admission, parking, and premium experiences depend on the organizer. Some military-base shows may be free, but never assume that for an event without a confirmed ticket policy.</p></div>
          <div><h3 className="font-display text-xl">Can I buy tickets on Ticketmaster?</h3><p className="mt-2 leading-7 text-muted-foreground">Only when there is a current verified listing for the exact event and date. Many air shows sell through their own organizer websites or other ticketing platforms. Texas Defined's existing Ticketmaster/Impact integration only shows affiliate links for confirmed matching provider listings.</p></div>
          <div><h3 className="font-display text-xl">What should families bring?</h3><p className="mt-2 leading-7 text-muted-foreground">Expect loud aircraft and outdoor exposure. Consider hearing protection, sun protection, water and comfortable shoes, but check each show's rules first: bag sizes, outside drinks, coolers, chairs and re-entry policies vary.</p></div>
          <div><h3 className="font-display text-xl">Why are some 2026 shows not listed as upcoming in 2027?</h3><p className="mt-2 leading-7 text-muted-foreground">Recurring events can skip a year, change venue or date, or go unannounced for months. We require dated, credible confirmation instead of automatically copying the prior year's calendar.</p></div>
        </div>
        <p className="mt-8 text-sm"><a href="/events" className="font-semibold text-primary underline">Browse all Texas events →</a></p>
      </section>
    </Container>
  </main>;
}
