import { createLazyFileRoute } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { HORSE_RACING_REVIEW_DATE, TEXAS_HORSE_RACING_INSTITUTIONS, TEXAS_RACING_ORGANIZATIONS, TXRC_RACETRACKS, TXRC_STRATEGIC_PLAN } from '@/data/horse-racing-authority';

const site = 'https://texasdefined.com';
const path = '/horse-racing';
const title = 'Texas Horse Racing: All Racetracks, Race Dates & Track Guides';
const description = 'Explore Texas live horse racing tracks, race calendars, Fredericksburg fairgrounds, inactive tracks, Texas county guides and licensing sources.';
const faq = [
  { question: 'How many Texas horse racetracks have live racing?', answer: 'The Texas Racing Commission names four venues with live horse racing: Lone Star Park in Grand Prairie, Sam Houston Race Park in Houston, Retama Park in Selma and the Gillespie County Fairgrounds in Fredericksburg. Dates are seasonal, not year-round at every facility.' },
  { question: 'Does Fredericksburg have live horse racing?', answer: 'Yes. Gillespie County Fairgrounds hosts a limited summer calendar of live Quarter Horse and Thoroughbred races. All 2026 weekends have concluded; check the organizer for future dates.' },
  { question: 'Is Manor Downs still a live racetrack?', answer: 'No live Manor Downs racing is verified in the current Texas racing calendar. The track belongs in a history/inactive-license directory, not a current races calendar.' },
  { question: 'Where can I find authoritative Texas race dates?', answer: 'Use the Texas Racing Commission approved live-race dates and each venue’s official racing calendar. Published schedules and post times can change.' },
];

export const Route = createLazyFileRoute('/horse-racing')({ component: TexasHorseRacingIndex });

function TexasHorseRacingIndex() {
  const active = TEXAS_HORSE_RACING_INSTITUTIONS.filter((record) => record.category === 'live');
  const inactive = TEXAS_HORSE_RACING_INSTITUTIONS.filter((record) => record.category === 'inactive');
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'CollectionPage', '@id': `${site}${path}#page`, name: title, description, url: `${site}${path}`, dateModified: HORSE_RACING_REVIEW_DATE, isPartOf: { '@id': `${site}/#website` }, mainEntity: { '@id': `${site}${path}#tracks` } },
      { '@type': 'ItemList', '@id': `${site}${path}#tracks`, name: 'Texas live and historically licensed horse racetracks', numberOfItems: TEXAS_HORSE_RACING_INSTITUTIONS.length,
        itemListElement: TEXAS_HORSE_RACING_INSTITUTIONS.map((venue, i) => ({ '@type': 'ListItem', position: i + 1, name: venue.name, url: `${site}${venue.canonicalPath}` })) },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Texas Defined', item: site }, { '@type': 'ListItem', position: 2, name: 'Sports venues', item: `${site}/sports-venues` }, { '@type': 'ListItem', position: 3, name: 'Horse racing in Texas', item: `${site}${path}` }] },
      { '@type': 'FAQPage', mainEntity: faq.map((x) => ({ '@type': 'Question', name: x.question, acceptedAnswer: { '@type': 'Answer', text: x.answer } })) },
    ],
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
      <main className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.12em] text-muted-foreground">
          <a href="/" className="hover:text-foreground">Texas Defined</a><span className="mx-2">/</span>
          <a href="/sports-venues" className="hover:text-foreground">Sports venues</a><span className="mx-2">/</span><span aria-current="page">Horse racing</span>
        </nav>
        <header className="border-b border-border py-11">
          <p className="eyebrow text-primary">The complete Texas racing directory</p>
          <h1 className="mt-3 max-w-5xl font-display text-5xl leading-tight sm:text-7xl">Texas horse racing: tracks, schedules and the stories behind them</h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground sm:text-xl">Four venues still stage live racing in Texas. Explore the seasonal race calendars, plan a genuine track visit, and understand why the state's other historic racing licenses are not places to buy tickets today.</p>
          <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-5 text-sm">
            <span><strong className="font-display text-3xl">4</strong> <span className="ml-1 text-muted-foreground">venues with live racing</span></span>
            <span><strong className="font-display text-3xl">3</strong> <span className="ml-1 text-muted-foreground">inactive-license histories</span></span>
          </div>
          <p className="mt-5 text-xs leading-6 text-muted-foreground">Last researched October 16, 2026. Statewide counts reflect the Texas Racing Commission's published strategic-plan inventory and current venue calendars; confirm any future license or schedule change with the commission.</p>
        </header>

        <figure className="border-b border-border py-7">
          <img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Lone_Star_Park.jpg?width=1600" alt="Lone Star Park horse racing venue in Grand Prairie, Texas" className="w-full object-cover" style={{ maxHeight: 490 }} loading="lazy" decoding="async" width="1600" height="1200" />
          <figcaption className="mt-3 text-xs leading-6 text-muted-foreground">Lone Star Park in Grand Prairie (not the Gillespie County Fairgrounds). Photo by <a className="underline" href="https://commons.wikimedia.org/wiki/File:Lone_Star_Park.jpg" target="_blank" rel="noopener noreferrer">Jax 0677 / Wikimedia Commons</a>, <a className="underline" href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>.</figcaption>
        </figure>

        <section className="border-b border-border py-7">
          <p className="eyebrow text-primary">When the next races happen</p>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-5">
            <div><h2 className="font-display text-3xl">2026–27 live race calendar and track comparison</h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">Meet windows, Thoroughbreds versus Quarter Horses, official schedules and the difference between live and simulcast racing.</p></div>
            <a className="border border-primary px-5 py-3 text-sm font-semibold text-primary hover:underline" href="/horse-racing/calendar">Compare all four tracks and see the calendar →</a>
          </div>
        </section>

        <section className="border-b border-border py-12" aria-labelledby="live-tracks">
          <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
            <div><p className="eyebrow text-primary">Go to the races</p><h2 id="live-tracks" className="mt-2 font-display text-3xl">Texas's four live racing venues</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">Tap a venue for the guide, county context, local planning and official dates. A simulcast session alone does not mean horses are racing on site.</p></div>
            <div className="grid gap-5 md:grid-cols-2">
              {active.map((venue) => <article key={venue.slug} className="border-t border-border pt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">{venue.city} · {venue.county}</p>
                <h3 className="mt-2 font-display text-3xl leading-tight"><a href={venue.canonicalPath} className="hover:text-primary">{venue.name} →</a></h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{venue.introduction}</p>
                <p className="mt-3 text-sm leading-7">{venue.schedule}</p>
                <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
                  <a href={venue.canonicalPath} className="text-primary hover:underline">Open track guide →</a>
                  <a href={`/county/${venue.countySlug}`} className="hover:text-primary">{venue.county} →</a>
                </div>
              </article>)}
            </div>
          </div>
        </section>

        <section className="border-b border-border py-12">
          <p className="eyebrow text-primary">Plan with current facts</p><h2 className="mt-2 font-display text-3xl">When and where to watch a race</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <article className="border-t border-border pt-5"><h3 className="font-display text-2xl">Thoroughbred racing</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Follow Sam Houston Race Park's winter and spring Thoroughbred meet and Lone Star Park's spring–summer dates. Fredericksburg also features Thoroughbreds on select summer weekends. Schedules are seasonal.</p></article>
            <article className="border-t border-border pt-5"><h3 className="font-display text-2xl">Quarter Horse racing</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Check Lone Star Park, Sam Houston, Retama Park and Gillespie County Fairgrounds for their distinct Quarter Horse cards. Do not assume every track races this breed in every month.</p></article>
            <article className="border-t border-border pt-5"><h3 className="font-display text-2xl">Tickets, travel and lodging</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Buy admission from the track or authorized seller and consult official parking information. For overnight trips, compare nearby stays and trip ideas using the corresponding county guide.</p></article>
          </div>
          <p className="mt-7 text-sm leading-7 text-muted-foreground">Official schedules: <a href={TXRC_RACETRACKS} target="_blank" rel="noopener noreferrer" className="font-semibold underline">Texas Racing Commission</a>. See also <a href="/event/gillespie-county-fair" className="font-semibold underline">the Gillespie County Fair event guide</a>.</p>
        </section>

        <section className="border-b border-border py-12" aria-labelledby="historic-track-list">
          <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
            <div><p className="eyebrow text-primary">History, not live admission</p><h2 id="historic-track-list" className="mt-2 font-display text-3xl">Inactive Texas horse-racing licenses</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">These institutional records matter to Texas racing history. They are explicitly separated from working tracks, and none is advertised here as currently selling live-racing tickets.</p></div>
            <div className="grid gap-5 md:grid-cols-2">
              {inactive.map((venue) => <article key={venue.slug} className="border-t border-border pt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{venue.city} · {venue.county} · Inactive record</p>
                <h3 className="mt-2 font-display text-2xl"><a href={venue.canonicalPath} className="hover:text-primary">{venue.name} →</a></h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{venue.introduction}</p>
                <a href={venue.canonicalPath} className="mt-3 inline-block text-sm font-semibold text-primary">Read historical profile →</a>
              </article>)}
            </div>
          </div>
        </section>

        <section className="border-b border-border py-12" aria-labelledby="associations">
          <p className="eyebrow text-primary">Owners, breeders and racing professionals</p>
          <h2 id="associations" className="mt-2 font-display text-3xl">Texas horse-racing institutions and official resources</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">These four organizations regulate or support Texas racing, breeding, ownership and horsemen. Each has an independently researched institution guide, with official program links and county-level context. Administrative offices are not racetracks.</p>
          <div className="mt-6 grid gap-x-8 md:grid-cols-2">
            {TEXAS_RACING_ORGANIZATIONS.map((institution) => <article key={institution.name} className="border-t border-border py-5">
              <h3 className="font-display text-2xl">{institution.name}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{institution.role}</p>
              <a href={institution.canonicalPath} className="mt-3 inline-block text-sm font-semibold text-primary underline">Complete institution profile →</a><span className="mx-3 text-muted-foreground">·</span><a href={institution.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-primary">Official website ↗</a>
            </article>)}
          </div>
        </section>

        <section className="border-b border-border py-12">
          <p className="eyebrow text-primary">Fast answers</p><h2 className="mt-2 font-display text-3xl">Texas horse racing FAQ</h2>
          <dl className="mt-6 grid gap-x-8 md:grid-cols-2">
            {faq.map((x) => <div key={x.question} className="border-t border-border py-5"><dt className="font-display text-xl">{x.question}</dt><dd className="mt-3 text-sm leading-7 text-muted-foreground">{x.answer}</dd></div>)}
          </dl>
        </section>

        <section className="py-12">
          <p className="eyebrow text-primary">Editorial standards</p><h2 className="mt-2 font-display text-3xl">What this directory includes—and excludes</h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">The count is limited to the Texas Racing Commission's licensed horse-racing track institutions, including historical inactive licenses. It does not imply that every horse show, barrel-racing arena, training barn, private ranch or unlicensed bush track is a public pari-mutuel racetrack. The commission's reports include greyhound licenses separately; this is strictly a horse-racing directory. Historical license records were last cross-checked against the commission's available strategic plans; operating status should always be reconfirmed before travel.</p>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">Primary source: <a href={TXRC_STRATEGIC_PLAN} className="font-semibold underline" target="_blank" rel="noopener noreferrer">Texas Racing Commission strategic plan</a>. Cross-reference: <a href="/horse-racing" className="font-semibold underline">live horse-racing venues</a>, <a href="/sports-venues/rodeo-western" className="font-semibold underline">rodeo and equestrian venues</a> and <a href="/sports-venues" className="font-semibold underline">all Texas sports venues</a>. We do not promote wagering services or claim any betting partner affiliation.</p>
          <a className="mt-5 inline-block border border-primary px-5 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground" href="/partner-with-us?type=sports-travel&source=%2Fhorse-racing#partnership-form-heading">Explore clearly disclosed sports-travel sponsorships →</a>
        </section>
      </main>
    </Container>
  </>;
}
