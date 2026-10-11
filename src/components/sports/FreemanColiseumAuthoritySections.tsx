import type { ReactNode } from 'react';

/**
 * Freeman Coliseum primary-source authority module. Visitor-facing research
 * is deliberately separate from the transactional, source-verified event feed.
 * Reviewed October 10, 2026 against freemancoliseum.com primary documents.
 */
const official = {
  grounds: 'https://freemancoliseum.com/pdf/2026/freeman_expo_grounds_map_2026.pdf',
  ada: 'https://www.freemancoliseum.com/pdf/ADA_Freeman_Coliseum.pdf',
  tickets: 'https://freemancoliseum.com/ticket-box-office/',
  calendar: 'https://freemancoliseum.com/events-list/',
  policies: 'https://freemancoliseum.com/freeman-coliseum-bag-policy/',
  history: 'https://freemancoliseum.com/timeline-v/',
  about: 'https://freemancoliseum.com/about-us/',
};

const milestones = [
  { date: '1947', title: 'Work begins', detail: 'Groundbreaking in November begins the East Side complex that would become the city’s major public arena.' },
  { date: '1949', title: 'The coliseum opens', detail: 'A permanent indoor home for livestock exhibitions and community-scale entertainment opens on East Houston Street.' },
  { date: '1950', title: 'First livestock exposition and rodeo', detail: 'The San Antonio Stock Show & Rodeo begins its long relationship with the site.' },
  { date: '1956', title: 'Elvis Presley', detail: 'Presley plays two sold-out October 14 performances at the Joe Freeman Coliseum.' },
  { date: '1964', title: 'The Rolling Stones', detail: 'The group performs June 6–7; the venue timeline describes this as the first British Invasion band to play Texas.' },
  { date: '1977', title: 'KISS', detail: 'A November 22 show demonstrates the venue’s continuing importance to arena rock.' },
  { date: '1981', title: 'Joe and Harry Freeman Coliseum', detail: 'The venue timeline records the January name change recognizing both Freemans.' },
  { date: '2001', title: 'Destiny’s Child', detail: 'A February 8 appearance shows the arena’s ongoing association with major rodeo entertainment.' },
  { date: '2019', title: 'International tennis', detail: 'The United States and Switzerland meet in the Fed Cup World Group playoff here April 20–21.' },
];

const officialExamples = [
  { when: 'October 20, 2026', event: 'NEISD College & Career Expo', building: 'Expo Hall 2' },
  { when: 'October 22, 2026', event: 'Young Miko — Late Check Out Tour', building: 'Freeman Coliseum' },
  { when: 'October 24, 2026', event: 'Galen College Graduation', building: 'Freeman Coliseum' },
  { when: 'October 31–November 1, 2026', event: 'Brick Convention', building: 'Expo Hall A' },
  { when: 'November 6–8, 2026', event: 'San Antonio Auto Show', building: 'Expo Halls' },
  { when: 'November 25, 2026', event: 'Intocable — Cultura Tour', building: 'Freeman Coliseum' },
];

function Section({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return <section className="border-b border-border py-10 sm:py-12">
    <p className="eyebrow text-primary">{eyebrow}</p>
    <h2 className="mt-2 font-display text-3xl leading-tight sm:text-4xl">{title}</h2>
    <div className="mt-7">{children}</div>
  </section>;
}

function Source({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-primary/40 underline-offset-4 hover:text-primary">{children} ↗</a>;
}

export function FreemanColiseumAuthoritySections() {
  return <>
    <nav aria-label="Freeman Coliseum visitor topics" className="flex flex-wrap gap-3 border-b border-border py-5 text-sm font-semibold">
      <a className="underline underline-offset-4" href="#freeman-campus">Coliseum vs. Expo Halls</a>
      <a className="underline underline-offset-4" href="#freeman-visit">Parking and accessibility</a>
      <a className="underline underline-offset-4" href="#freeman-tickets">Tickets and seating</a>
      <a className="underline underline-offset-4" href="#freeman-history">Historic moments</a>
    </nav>

    <section id="freeman-campus" className="scroll-mt-24">
      <Section eyebrow="Know the campus" title="Freeman Coliseum, Expo Halls and Frost Bank Center are not interchangeable">
        <p className="max-w-4xl text-base leading-8 text-foreground/85">A ticket or event description that says “Freeman” can refer to several different buildings on the East Houston Street campus. The historic Freeman Coliseum is the indoor arena. Expo Halls A, B, C and Hall 2 are distinct trade-show and exhibition spaces, and the adjacent Frost Bank Center is a separate arena. The <Source href={official.grounds}>official 2026 grounds map</Source> identifies each building and nine numbered parking lots; it does <strong>not</strong> assign your event to a particular gate or parking lot.</p>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {[
            { name: 'Freeman Coliseum', detail: 'Historic 1949 arena for concerts, ceremonies, sports and some community events. Check the event’s actual seating chart.' },
            { name: 'Freeman Expo Halls', detail: 'Separate indoor exhibition facilities for conventions, consumer shows, graduations and other events. Locate the specific hall before you park.' },
            { name: 'Frost Bank Center', detail: 'Adjacent, separately ticketed arena. The proximity does not mean its entrances, tickets or parking arrangements apply to a Freeman event.' },
          ].map((item) => <div key={item.name} className="border border-border p-5"><h3 className="font-display text-xl">{item.name}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.detail}</p></div>)}
        </div>
        <p className="mt-6 text-sm leading-7 text-muted-foreground">Venue-reported size: the Coliseum has more than 32,000 square feet of floor space; the Expo Halls provide roughly 170,000 square feet of additional climate-controlled exhibition area. Venue-reported campus parking is approximately 10,000 spaces, but this is not a promise of available public parking at any single show. <Source href={official.about}>Official facility facts</Source>.</p>
      </Section>
    </section>

    <section id="freeman-visit" className="scroll-mt-24">
      <Section eyebrow="First-time visitor playbook" title="Parking, gate selection and accessible arrival">
        <ol className="grid list-decimal gap-5 pl-5 text-base leading-8 md:grid-cols-2 md:gap-x-12">
          <li><strong>Confirm the exact building.</strong> Look at your official ticket or event listing. Coliseum performances and Expo Hall events do not necessarily use the same doors.</li>
          <li><strong>Read that event’s parking notice.</strong> The 2026 campus map shows Lots 1–9, but open lots, controlled entrances and fees can change; do not rely on a previous visit’s lot number.</li>
          <li><strong>Choose your approach before arrival.</strong> East Houston Street, Frost Bank Center Drive and the campus inner roads are identified on the grounds map. Busy same-day events can affect routing.</li>
          <li><strong>Prepare for security and walking time.</strong> Recheck door times, bag requirements and the route from your parking area, particularly for children and guests who need mobility assistance.</li>
        </ol>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="border-t border-border pt-4">
            <h3 className="font-display text-2xl">Mobility drop-off and accessible parking</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">The venue’s ADA document directs Coliseum mobility drop-off via <strong>Gate B</strong>. For Expo Hall events it directs visitors to Gate A or Gate B and through Lot 9 for drop-off by the hall. Designated accessible spaces are available in open lots on a first-come basis; the venue recommends arriving early. Confirm your event’s current instructions because lot operations may change.</p>
          </div>
          <div className="border-t border-border pt-4">
            <h3 className="font-display text-2xl">Inside the building</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">The official accessibility guide places a wheelchair lift on the east side near <strong>Section 27</strong>, a family restroom near <strong>Section 18</strong>, and first aid on the west side near <strong>Section 11</strong>. Ushers can help on site; the published guide requests advance contact for accommodations, ideally at least one week before an event.</p>
          </div>
        </div>
        <p className="mt-6 text-sm leading-7"><Source href={official.ada}>Official ADA guide (PDF)</Source> · <Source href={official.grounds}>Official 2026 grounds map (PDF)</Source>. A nearby VIA bus stop is described on East Houston Street by the venue, but verify current routes and schedules with VIA before traveling.</p>
      </Section>
    </section>

    <section id="freeman-tickets" className="scroll-mt-24">
      <Section eyebrow="Tickets, admission and seating" title="What to check before choosing a seat or buying a ticket">
        <div className="grid gap-7 md:grid-cols-2">
          <div className="border-t border-border pt-4">
            <h3 className="font-display text-2xl">Where to buy and pick up tickets</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">The venue directs buyers to Ticketmaster or the Frost Bank Center box office. For Coliseum events, the official ticket page identifies Will Call at the Frost Bank Center’s <strong>Southwest Box Office</strong>, nearest Freeman Coliseum on the right of the main entrance. Bring valid photo ID for pickup; do not assume box-office hours without checking.</p>
            <p className="mt-4 text-sm"><Source href={official.tickets}>Official ticket and Will Call instructions</Source></p>
          </div>
          <div className="border-t border-border pt-4">
            <h3 className="font-display text-2xl">Seating and sight lines</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">The published 7,630 figure is the fixed seating bowl, not a universal concert capacity. Floor seats, staging, obstructed views and accessible inventory depend on the production. Use the actual event's interactive seating chart for the final layout. For a concert, verify the stage position before comparing side and end seats; for a ceremony, verify floor access and accessible routes.</p>
          </div>
          <div className="border-t border-border pt-4">
            <h3 className="font-display text-2xl">Bags and security</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">For most concerts, the published rules allow clear bags up to <strong>12 × 6 × 12 inches</strong> and clutches up to <strong>5.5 × 8.5 inches</strong>. Diaper and medically necessary bags have specified exceptions, and every bag can be searched. This does not establish a universal rule for every Expo Hall event.</p>
            <p className="mt-4 text-sm"><Source href={official.policies}>Current bag policy and exceptions</Source></p>
          </div>
          <div className="border-t border-border pt-4">
            <h3 className="font-display text-2xl">Food, payments and re-entry</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">Concessions, accepted payments, permitted cameras, re-entry and door times can be event-specific. Rather than publishing an unverified blanket rule, TexasDefined directs visitors to the event organizer and venue. This is especially important for private graduations, trade exhibitions and touring concerts.</p>
          </div>
        </div>
      </Section>
    </section>

    <Section eyebrow="Official venue calendar snapshot" title="Events can take place in two different buildings on the same day">
      <p className="max-w-4xl text-sm leading-7 text-muted-foreground">The TexasDefined ticket carousel above is a curated list from its own event database. It is <strong>not</strong> a full reproduction of the venue calendar. The official examples below were cross-checked October 10, 2026 and identify the advertised building; dates and access can change. <Source href={official.calendar}>Check the current full Freeman calendar</Source>.</p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[540px] border-collapse text-left text-sm">
          <thead><tr className="border-y border-border"><th className="p-3 font-semibold">Date</th><th className="p-3 font-semibold">Officially listed event</th><th className="p-3 font-semibold">Building / campus area</th></tr></thead>
          <tbody>{officialExamples.map((item) => <tr key={item.event} className="border-b border-border"><td className="p-3 align-top">{item.when}</td><td className="p-3 align-top font-medium">{item.event}</td><td className="p-3 align-top">{item.building}</td></tr>)}</tbody>
        </table>
      </div>
      <p className="mt-4 text-xs leading-6 text-muted-foreground">These are dated editorial examples, not a continuously updated availability feed. For tickets, exact start times, parking and cancellations, the organizer’s current page controls.</p>
    </Section>

    <section id="freeman-history" className="scroll-mt-24">
      <Section eyebrow="San Antonio entertainment history" title="From the city's first rodeo years to international sporting events">
        <p className="max-w-4xl text-base leading-8 text-foreground/85">Freeman Coliseum is more than a concert stop: its 1949 opening helped establish a permanent venue for San Antonio's expanding stock show and the city’s large-scale indoor entertainment. Its place in the area's music, sports and community history stretches from Elvis and the Rolling Stones to women’s basketball, major boxing and international tennis. The dates below are documented in the <Source href={official.history}>venue's historical timeline</Source>, not inferred from unsourced online venue lists.</p>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2">
          {milestones.map((item) => <li key={item.date} className="border-l-2 border-primary/50 py-1 pl-5"><span className="text-sm font-semibold tracking-wide text-primary">{item.date}</span><h3 className="mt-1 font-display text-xl">{item.title}</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">{item.detail}</p></li>)}
        </ol>
        <div className="mt-8 border-t border-border pt-6">
          <h3 className="font-display text-2xl">A public-art landmark as well as an arena</h3>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">Freeman's account of its art program records a 2017 mural commission awarded to artist Garin Baker. The work consists of twelve hand-painted panels, each approximately five by ten feet, installed outside the main entrance and intended to reflect the varied people and events connected with the venue. <Source href={official.about}>Venue mural history</Source>.</p>
        </div>
      </Section>
    </section>

    <Section eyebrow="Explore the East Side" title="Build a San Antonio trip without confusing the stadiums">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { href: '/sports-venue/frost-bank-center', name: 'Frost Bank Center', detail: 'The separate adjacent arena: check its own concert, sports and parking details.' },
          { href: '/sports-venue/alamodome', name: 'Alamodome', detail: 'A different San Antonio sports and concert district with separate event access.' },
          { href: '/county/bexar', name: 'Bexar County', detail: 'Explore the surrounding county’s visitor places and local context.' },
        ].map((item) => <a key={item.href} className="group border border-border p-5 hover:border-primary" href={item.href}><strong className="font-display text-xl group-hover:text-primary">{item.name} →</strong><span className="mt-3 block text-sm leading-7 text-muted-foreground">{item.detail}</span></a>)}
      </div>
      <p className="mt-6 text-sm leading-7 text-muted-foreground">Editorial method: official Freeman facility and policy pages, its ADA PDF, the 2026 facility map, the official ticket guide, its dated event calendar and historic timeline. Static research was checked October 10, 2026. Changes to parking, events or admission must be confirmed with the venue or promoter before the visit. TexasDefined is independent of the venue and does not claim first-hand inspection.</p>
    </Section>
  </>;
}
