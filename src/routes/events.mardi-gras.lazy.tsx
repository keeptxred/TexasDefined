import { createLazyFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { BookingCarRentalCard } from "@/components/monetization/BookingCarRentalCard";

type ConfirmedCelebration = {
  slug: string; name: string; city: string; region: string;
  date: string; kind: string; family: string; description: string; official: string;
};
type PendingCelebration = {
  name: string; city: string; status: string; detail: string; url: string; guide?: string;
};

const confirmed: ConfirmedCelebration[] = [
  {
    "slug": "beaumont-pardi-gras",
    "name": "Beaumont Pardi Gras",
    "city": "Beaumont",
    "region": "Southeast Texas",
    "date": "January 23, 2027",
    "kind": "Ticketed charity evening",
    "family": "Indoor fundraiser, not a public parade",
    "description": "Circle of Hope's separately organized benefit at Beaumont Civic Center. Useful for a ticketed evening out, not a substitute for Beaumont's large public festival.",
    "official": "https://www.southeasttexascircleofhope.com/event-details/beaumont-pardi-gras-2027"
  },
  {
    "slug": "cowboy-mardi-gras-bandera",
    "name": "Cowboy Mardi Gras",
    "city": "Bandera",
    "region": "Hill Country",
    "date": "January 28–31, 2027*",
    "kind": "Western music + street parade",
    "family": "Saturday Main Street parade",
    "description": "A Cajun-meets-cowboy weekend centered on 11th Street Cowboy Bar. January 30 parade confirmed; tourism calendars differ about Sunday.",
    "official": "https://www.banderacowboycapital.com/events/2026/cowboy-mardi-gras"
  },
  {
    "slug": "mardi-gras-galveston",
    "name": "Mardi Gras! Galveston",
    "city": "Galveston",
    "region": "Gulf Coast",
    "date": "January 29–February 9, 2027",
    "kind": "Large island festival",
    "family": "Family Gras and beachfront options",
    "description": "Texas's largest Mardi Gras celebration, with 20-plus parades, two weekends of major programming, ticketed Strand entertainment and free parade-viewing alternatives.",
    "official": "https://www.mardigrasgalveston.com/parade-schedule/"
  },
  {
    "slug": "palestine-mardi-gras-parade",
    "name": "Palestine Mardi Gras Parade",
    "city": "Palestine",
    "region": "East Texas",
    "date": "January 30, 2027",
    "kind": "Historic downtown parade",
    "family": "Community procession",
    "description": "A one-day East Texas parade in walkable downtown Palestine. State tourism confirms the date; exact time and temporary street map remain pending.",
    "official": "https://www.traveltexas.com/event/mardi-gras-parade/6363/"
  },
  {
    "slug": "mardi-gras-upriver-jefferson",
    "name": "Mardi Gras Upriver",
    "city": "Jefferson",
    "region": "East Texas",
    "date": "February 5–7, 2027",
    "kind": "Historic small-town festival",
    "family": "Select the right parade for children",
    "description": "Krewe of Hebe brings its Viva Las Vegas celebration to historic Jefferson; a separate formal Queen Mab Ball takes place January 23.",
    "official": "https://mardigrasupriver.com/events/"
  },
  {
    "slug": "mardi-gras-port-arthur",
    "name": "Mardi Gras Port Arthur",
    "city": "Port Arthur",
    "region": "Southeast Texas",
    "date": "February 5–7, 2027",
    "kind": "Reintroduced Cajun-coast festival",
    "family": "Designed as multigenerational",
    "description": "Port Arthur's new visitor-bureau-led downtown celebration returns Mardi Gras to the city with parades, food, music and family activities.",
    "official": "https://visitportarthurtx.com/mardi-gras/about-mardi-gras/"
  },
  {
    "slug": "crystal-beach-mardi-gras-parade",
    "name": "Crystal Beach Mardi Gras Parade",
    "city": "Crystal Beach",
    "region": "Gulf Coast",
    "date": "February 6, 2027",
    "kind": "Beach-community parade",
    "family": "Late-morning outdoor procession",
    "description": "Lighthouse Krewe tradition along Highway 87 on Bolivar Peninsula; account for parking restrictions and ferry queues.",
    "official": "https://bolivarpeninsulatexas.com/event/mardi-gras-parade-in-crystal-beach-texas-february-6-2027"
  },
  {
    "slug": "kemah-yachty-gras",
    "name": "Kemah Yachty Gras & Grand Parade",
    "city": "Kemah",
    "region": "Bay Area",
    "date": "February 6 and 9, 2027",
    "kind": "Boat + street celebrations",
    "family": "Waterfront viewing or street parade",
    "description": "A February 6 decorated-boat procession and a separate 11 a.m. February 9 street parade at Kemah Boardwalk. They do not run continuously.",
    "official": "https://krewedulac.net/events"
  }
];
const pending: PendingCelebration[] = [
  {
    "guide": "/event/mardi-gras-on-the-sabine-orange",
    "name": "Mardi Gras on the Sabine",
    "city": "Orange",
    "status": "2027 date not yet announced",
    "detail": "Orange's city website explicitly says it will update 2027 information later. Its 2026 event had a children's parade, second line and free riverfront festivities.",
    "url": "https://orangetexas.gov/407/Mardi-Gras-on-the-Sabine"
  },
  {
    "guide": "/event/mardi-gras-southeast-texas-beaumont",
    "name": "Mardi Gras of Southeast Texas",
    "city": "Beaumont",
    "status": "2027 organizer schedule unconfirmed",
    "detail": "A distinct, established Beaumont-area parade and music festival. Do not confuse it with Port Arthur's 2027 reboot or Beaumont Pardi Gras charity night.",
    "url": "https://www.beaumontcvb.com/blog/stories/post/5-things-you-can-do-every-day-at-mardi-gras-no-matter-when-you-come/"
  },
  {
    "guide": "/event/oak-cliff-mardi-gras-parade",
    "name": "Oak Cliff Mardi Gras Parade",
    "city": "Dallas",
    "status": "2027 date not yet confirmed",
    "detail": "The Bishop Arts/Oak Cliff-area community tradition includes floats, costumes and local events. Consult the next city or neighborhood announcement before booking.",
    "url": "https://www.visitdallas.com/blog/how-to-mardi-gras-in-dallas/"
  },
  {
    "name": "Mainland Mardi Gras Parade",
    "city": "Texas City",
    "status": "2027 date not yet confirmed",
    "detail": "The city listed a January 2026 parade but later canceled it because of winter weather. Do not copy the canceled date into a 2027 calendar.",
    "url": "https://texascitytx.gov/906/Parades"
  }
];

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Mardi Gras in Texas: Parades, Festivals & 2027 Travel Guides",
  url: "https://texasdefined.com/events/mardi-gras",
  description: "Source-checked Mardi Gras celebrations and visitors guides across Texas, with confirmed 2027 dates and separate unannounced-event watchlist.",
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: confirmed.length,
    itemListElement: confirmed.map((event, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: event.name,
      url: "https://texasdefined.com/event/" + event.slug,
    })),
  },
};

export const Route = createLazyFileRoute("/events/mardi-gras")({ component: MardiGrasTexasPage });

function MardiGrasTexasPage() {
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
    <section className="relative overflow-hidden border-b border-border px-0 py-12 text-white sm:py-20" style={{ background: "linear-gradient(115deg,#241037 0%,#422154 55%,#614325 100%)" }}>
      <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-12 rotate-[-12deg] text-[180px] font-black leading-none tracking-tighter text-white/10 sm:text-[280px]">MG</div>
      <Container>
        <nav aria-label="Breadcrumb" className="text-sm text-white/80"><a className="underline" href="/">Texas Defined</a> / <a className="underline" href="/events">Events</a> / Mardi Gras</nav>
        <p className="mt-10 text-sm font-bold uppercase tracking-[.23em] text-amber-200">Texas events • Carnival season 2027</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[1.05] sm:text-7xl">Mardi Gras in Texas</h1>
        <p className="mt-5 max-w-3xl text-xl leading-8 text-white/90">From Galveston's landmark parades to East Texas krewes, a Cowboy Capital street party and bayside boat parades, find the Texas Mardi Gras celebration worth the trip.</p>
        <p className="mt-5 max-w-3xl text-sm leading-6 text-white/80">Dates and organizers verified October 21, 2026. Mardi Gras falls on Tuesday, February 9, 2027. Events don't all run on Fat Tuesday — always choose a specific programmed day.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#confirmed" className="inline-flex min-h-11 items-center rounded bg-amber-300 px-5 py-3 font-bold text-slate-950 hover:bg-amber-200">Explore verified dates ↓</a>
          <a href="#planning" className="inline-flex min-h-11 items-center rounded border border-white/60 px-5 py-3 font-semibold text-white hover:bg-white/10">Plan your Mardi Gras trip ↓</a>
        </div>
      </Container>
    </section>

    <Container className="py-10 sm:py-14">
      <section aria-label="At a glance" className="grid gap-4 sm:grid-cols-3">
        <div className="border-l-4 border-amber-500 bg-surface px-5 py-5"><p className="text-3xl font-display">8</p><p className="mt-2 text-sm font-semibold">Source-confirmed 2027 local guides</p></div>
        <div className="border-l-4 border-emerald-600 bg-surface px-5 py-5"><p className="text-3xl font-display">Jan 23 – Feb 9</p><p className="mt-2 text-sm font-semibold">Verified celebrations, not continuous daily programming</p></div>
        <div className="border-l-4 border-violet-600 bg-surface px-5 py-5"><p className="text-3xl font-display">4</p><p className="mt-2 text-sm font-semibold">Additional recurring celebrations awaiting date confirmation</p></div>
      </section>

      <section id="confirmed" className="mt-14">
        <p className="eyebrow text-primary">2027 Texas parade and festival calendar</p>
        <h2 className="mt-3 font-display text-4xl">Confirmed Texas Mardi Gras celebrations</h2>
        <p className="mt-4 max-w-4xl leading-7 text-muted-foreground">Every linked guide is a distinct event, not a generic generated calendar listing. Confirmed dates are shown below; a celebration with multiple days can still have separate ticketing, parade times and venues.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {confirmed.map((event) => <article key={event.slug} className="flex flex-col border border-border bg-background p-6 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">{event.region} · {event.city}</span>
              <span className="rounded bg-muted px-3 py-1 text-xs font-semibold">{event.kind}</span>
            </div>
            <h3 className="mt-4 font-display text-3xl"><a href={"/event/" + event.slug} className="hover:text-primary">{event.name}</a></h3>
            <p className="mt-3 font-semibold">{event.date}</p>
            <p className="mt-2 text-sm text-muted-foreground">{event.family}</p>
            <p className="mt-5 flex-1 leading-7 text-muted-foreground">{event.description}</p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm font-bold">
              <a href={"/event/" + event.slug} className="text-primary underline">Full visitor guide →</a>
              <a href={event.official} className="underline" target="_blank" rel="noopener noreferrer">Official schedule ↗</a>
            </div>
          </article>)}
        </div>
        <p className="mt-5 text-sm leading-6 text-muted-foreground">* Bandera tourism's detailed event page spans January 28–31, while its general save-the-date page lists January 28–30. The January 30 parade is confirmed but the Sunday program needs rechecking. Kemah's February 6 boat parade and February 9 street parade are separate events.</p>
      </section>

      <section id="choose" className="mt-16 border-t border-border pt-12">
        <p className="eyebrow text-primary">Find your kind of Carnival</p>
        <h2 className="mt-3 font-display text-4xl">Which Texas Mardi Gras should you visit?</h2>
        <div className="mt-7 grid gap-7 md:grid-cols-3">
          <article><h3 className="font-display text-2xl">For the biggest spectacle</h3><p className="mt-3 leading-7 text-muted-foreground">Choose <a className="font-semibold text-primary underline" href="/event/mardi-gras-galveston">Galveston</a> for a large parade calendar, the Strand entertainment district, balconies and major concerts. Compare ticketed downtown festivities with public parade routes before budgeting.</p></article>
          <article><h3 className="font-display text-2xl">For a small-town weekend</h3><p className="mt-3 leading-7 text-muted-foreground"><a className="font-semibold text-primary underline" href="/event/mardi-gras-upriver-jefferson">Jefferson</a> pairs krewe traditions with walkable history; <a className="font-semibold text-primary underline" href="/event/cowboy-mardi-gras-bandera">Bandera</a> adds live Western music and a Main Street procession.</p></article>
          <article><h3 className="font-display text-2xl">For the coast without the Strand</h3><p className="mt-3 leading-7 text-muted-foreground"><a className="font-semibold text-primary underline" href="/event/crystal-beach-mardi-gras-parade">Crystal Beach</a> is a beach-community highway parade, while <a className="font-semibold text-primary underline" href="/event/kemah-yachty-gras">Kemah</a> offers separate water and street celebrations.</p></article>
        </div>
      </section>

      <section id="planning" className="mt-16 border-t border-border pt-12">
        <p className="eyebrow text-primary">Before you drive</p>
        <h2 className="mt-3 font-display text-4xl">Planning a Mardi Gras trip in Texas</h2>
        <div className="mt-8 grid gap-7 md:grid-cols-2">
          <div><h3 className="font-display text-2xl">Routes, parking and accessibility</h3><p className="mt-3 leading-7 text-muted-foreground">Parade roads close and public parking can be distant from the route. Open the local event guide and organizer's updated map for your chosen date. Accessible parking, curb crossings, restrooms and viewing areas differ by town and should never be presumed.</p></div>
          <div><h3 className="font-display text-2xl">Free viewing versus paid entertainment</h3><p className="mt-3 leading-7 text-muted-foreground">Street parade viewing can be free even where entertainment districts, balls, concerts or seating charge admission. Galveston's Strand admission is not a statewide Mardi Gras ticket. Each event's organizer controls the current price and age rules.</p></div>
          <div><h3 className="font-display text-2xl">Families and crowd preferences</h3><p className="mt-3 leading-7 text-muted-foreground">Choose daytime and family-focused routes when traveling with children. Expect thrown beads and sudden crowd movement; supervise children near the street and check event rules for strollers, coolers, chairs and pets.</p></div>
          <div><h3 className="font-display text-2xl">Weather and driving</h3><p className="mt-3 leading-7 text-muted-foreground">Late winter can bring rain, cold fronts and last-minute changes. Crystal Beach and Kemah require coastal weather awareness; Jefferson and Bandera can have chilly evenings. Recheck official road conditions and weather closer to the event.</p></div>
        </div>
      </section>

      <section className="mt-14 border-t border-border pt-10">
        <h2 className="font-display text-3xl">Stay near your parade</h2>
        <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">For Galveston, Jefferson, Bandera or the Beaumont–Port Arthur area, an overnight stay can make parade day easier. Choose lodging based on the specific parade corridor and street-closure plan, not just a city name. Individual event pages connect to nearby destination guides.</p>
        <a href="https://www.anrdoezrs.net/links/101876465/type/dlg/https://www.hotels.com/" target="_blank" rel="sponsored nofollow noopener noreferrer" data-affiliate-partner="hotels.com" data-affiliate-placement="texas-mardi-gras-hub-stays" data-commercial-partner="hotels.com" data-commercial-placement="texas-mardi-gras-hub-stays" className="mt-5 inline-flex min-h-11 items-center rounded border border-primary px-5 py-3 font-semibold text-primary">Compare Texas hotels ↗</a>
        <p className="mt-2 text-xs text-muted-foreground">Affiliate disclosure: Texas Defined may earn a commission on qualifying lodging bookings, without additional cost to you. Event organizer links above are editorial references, not ticket-affiliate listings.</p>
      </section>
      <BookingCarRentalCard className="mt-8" placement="mardi-gras-texas-hub" title="Flying into Texas for a Mardi Gras weekend?" />

      <section id="watchlist" className="mt-16 border-t border-border pt-12">
        <p className="eyebrow text-primary">Annual traditions, not confirmed 2027 dates</p>
        <h2 className="mt-3 font-display text-4xl">Other Texas Mardi Gras celebrations to watch</h2>
        <p className="mt-4 max-w-4xl leading-7 text-muted-foreground">These events deserve coverage, but as of October 21, 2026 a credible, current 2027 date was not verified. We do not roll last year's date forward or publish unverified ticket and Event structured data. Visit the organizers below for the next announcement.</p>
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {pending.map((event) => <article className="border border-border p-6" key={event.name}>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{event.city} · Date pending</p>
            <h3 className="mt-2 font-display text-2xl">{event.name}</h3>
            <p className="mt-3 text-sm font-semibold">{event.status}</p>
            <p className="mt-3 leading-7 text-muted-foreground">{event.detail}</p>
            {event.guide ? <a href={event.guide} className="mt-5 mr-5 inline-block font-semibold text-primary underline">Evergreen visitor guide →</a> : null}
            <a href={event.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block font-semibold text-primary underline">Current source and organizer updates ↗</a>
          </article>)}
        </div>
      </section>

      <section className="mt-16 border-t border-border pt-12">
        <h2 className="font-display text-3xl">Frequently asked questions</h2>
        <dl className="mt-7 space-y-7">
          <div><dt className="font-display text-xl">When is Mardi Gras in 2027?</dt><dd className="mt-2 leading-7 text-muted-foreground">Fat Tuesday is February 9, 2027. Texas parades and festivals are spread across January and early February, so the holiday's date is not a reliable substitute for the local schedule.</dd></div>
          <div><dt className="font-display text-xl">Is Mardi Gras only celebrated in Galveston?</dt><dd className="mt-2 leading-7 text-muted-foreground">No. Jefferson, Bandera, Port Arthur, Crystal Beach, Kemah, Palestine and other Texas communities have distinctive celebrations. Galveston is a major destination, but not the only one.</dd></div>
          <div><dt className="font-display text-xl">Are Texas Mardi Gras parades free?</dt><dd className="mt-2 leading-7 text-muted-foreground">Many street parades can be watched without purchasing a festival ticket. Entertainment districts, ticketed parties, concerts or benefits may charge admission. Check each event rather than assuming uniform admission rules.</dd></div>
          <div><dt className="font-display text-xl">Why isn't Beaumont's large Mardi Gras festival given a 2027 date?</dt><dd className="mt-2 leading-7 text-muted-foreground">We could verify its established celebration but not an organizer-confirmed 2027 schedule. The new Port Arthur Mardi Gras is separately organized, and Beaumont Pardi Gras on January 23 is a separate charity fundraiser.</dd></div>
        </dl>
        <p className="mt-8 text-sm"><a href="/events" className="font-semibold text-primary underline">Browse more Texas events →</a></p>
      </section>
    </Container>
  </main>;
}
