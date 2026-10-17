import { createLazyFileRoute } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { HORSE_RACING_REVIEW_DATE, TEXAS_HORSE_RACING_INSTITUTIONS, TEXAS_RACING_ORGANIZATIONS, TEXAS_HORSE_RACING_CALENDAR, type TexasRacingOrganization } from '@/data/horse-racing-authority';
const base = 'https://texasdefined.com';
export const Route = createLazyFileRoute('/horse-racing/$slug')({ component: TexasHorseRacingInstitutionPage });

function TexasHorseRacingInstitutionPage() {
  const { record } = Route.useLoaderData();
  if (record.category === 'organization') return <TexasRacingOrganizationProfile record={record} />;
  if (record.category === 'calendar') return <TexasHorseRacingCalendarPage />;
  return <TrackProfile record={record} />;
}

function TrackProfile({ record }: { record: (typeof TEXAS_HORSE_RACING_INSTITUTIONS)[number] }) {
  const live = record.category === 'live';
  const peers = TEXAS_HORSE_RACING_INSTITUTIONS.filter((r) => r.slug !== record.slug && r.category === 'live');
  const answers = live ? [
    { q: 'Is there live horse racing in Fredericksburg?', a: 'Yes. Gillespie County Fairgrounds has a Class 3 track for limited summer Thoroughbred and Quarter Horse race weekends. Its 2026 dates have concluded.' },
    { q: 'When is the next Gillespie County horse race?', a: 'The 2026 racing weekends have passed. The 2027 race dates are not yet verified in this guide; check the fair association and the Texas Racing Commission before making travel plans.' },
    { q: 'Does the fairgrounds have pari-mutuel wagering?', a: 'The fair association describes its public race weekends as live pari-mutuel horse racing. Wagering rules and permitted services are regulated by Texas law and the Texas Racing Commission.' },
    { q: 'Where should I stay for Gillespie horse racing?', a: 'Fredericksburg and nearby Gillespie County are convenient bases. Check the current race weekend before booking because fair attendance and Hill Country tourism can affect availability.' },
  ] : [
    { q: `Can I attend live races at ${record.name}?`, a: `No current live race dates are verified for ${record.name}. This is an inactive-license history page, not a ticket or admission guide.` },
    { q: `Is ${record.name} a working tourist racetrack?`, a: 'Do not assume so. An entry in an older Texas Racing Commission license inventory does not establish a current operating venue, accessible location or spectator calendar.' },
    { q: 'Where can I watch live horse racing in Texas?', a: 'The Texas Racing Commission identifies Lone Star Park, Sam Houston Race Park, Retama Park and Gillespie County Fairgrounds as the four venues with live racing. Check official calendars for actual race dates.' },
  ];
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${base}${record.canonicalPath}#article`,
        headline: live ? 'Gillespie County Fairgrounds horse racing and visitor guide' : `${record.name}: Texas racing license and history`,
        description: record.introduction,
        url: `${base}${record.canonicalPath}`,
        dateModified: HORSE_RACING_REVIEW_DATE,
        author: { '@type': 'Organization', name: 'Texas Defined' },
        publisher: { '@type': 'Organization', name: 'Texas Defined', url: base },
        about: { '@type': 'Place', name: record.name, address: { '@type': 'PostalAddress', addressLocality: record.city, addressRegion: 'TX', addressCountry: 'US' } },
        citation: record.sources.map((s) => s.url),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: base },
          { '@type': 'ListItem', position: 2, name: 'Texas horse racing', item: `${base}/horse-racing` },
          { '@type': 'ListItem', position: 3, name: record.name, item: `${base}${record.canonicalPath}` },
        ],
      },
      { '@type': 'FAQPage', mainEntity: answers.map((x) => ({ '@type': 'Question', name: x.q, acceptedAnswer: { '@type': 'Answer', text: x.a } })) },
    ],
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
      <main className="mx-auto max-w-5xl">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.12em] text-muted-foreground">
          <a href="/" className="hover:text-foreground">Texas Defined</a><span className="mx-2">/</span>
          <a href="/horse-racing" className="hover:text-foreground">Texas horse racing</a><span className="mx-2">/</span>
          <span aria-current="page">{record.name}</span>
        </nav>
        <header className="border-b border-border py-11">
          <p className="eyebrow text-primary">{live ? 'Live seasonal horse racing · Hill Country' : 'Texas racing history · Inactive track/license'}</p>
          <h1 className="mt-3 font-display text-5xl leading-tight sm:text-7xl">{record.name}</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">{record.introduction}</p>
          <dl className="mt-8 grid gap-5 border-t border-border pt-5 sm:grid-cols-2">
            <div><dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Place</dt><dd className="mt-2 text-sm font-semibold">{record.city}, {record.county}</dd></div>
            <div><dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Status</dt><dd className="mt-2 text-sm font-semibold">{live ? 'Licensed seasonal live racing' : 'Inactive historic license record — not a live-racing destination'}</dd></div>
            <div><dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Racing</dt><dd className="mt-2 text-sm leading-6">{record.racing}</dd></div>
            {record.address ? <div><dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Official location</dt><dd className="mt-2 text-sm">{record.address}</dd></div> : null}
          </dl>
          <p className="mt-6 text-xs leading-6 text-muted-foreground">Sources reviewed {record.sourceDate}. Historical status is based on published commission records; no current racing dates or public venue access are implied for inactive facilities.</p>
        </header>

        {live ? <figure className="border-b border-border py-8">
          <img src="/images/horse-racing/gillespie-2026-race-weekends.svg" alt="Gillespie County Fairgrounds 2026 horse racing date recap, showing four completed summer race weekends; 2027 dates not yet confirmed" className="w-full" width="1200" height="580" loading="eager" decoding="async" />
          <figcaption className="mt-3 text-xs leading-6 text-muted-foreground">Original Texas Defined graphic based on the Gillespie County Fair &amp; Festivals Association's official 2026 calendar. This is an editorial race-season infographic, not a photograph or an accurate map of the track.</figcaption>
        </figure> : null}

        {record.schedule ? <section className="border-b border-border py-10" aria-labelledby="racing-schedule">
          <p className="eyebrow text-primary">Race calendar</p>
          <h2 id="racing-schedule" className="mt-2 font-display text-3xl">When the horses race</h2>
          <p className="mt-4 text-base leading-8 text-muted-foreground">{record.schedule}</p>
          <a href="https://gillespiefair.com/pari-mutuel-horse-racing" target="_blank" rel="noopener noreferrer" className="mt-5 inline-block text-sm font-semibold text-primary underline">Verify future official race dates →</a>
        </section> : null}

        <section className="border-b border-border py-10" aria-labelledby="context">
          <p className="eyebrow text-primary">Verified context</p><h2 id="context" className="mt-2 font-display text-3xl">{live ? 'What makes this track different' : 'Why this historical institution matters'}</h2>
          <div className="mt-5 space-y-5">
            {record.context.map((paragraph) => <p key={paragraph} className="text-base leading-8 text-muted-foreground">{paragraph}</p>)}
          </div>
        </section>

        <section className="border-b border-border py-10" aria-labelledby="plan">
          <p className="eyebrow text-primary">{live ? 'Race-day planning' : 'Read this before traveling'}</p>
          <h2 id="plan" className="mt-2 font-display text-3xl">{live ? 'Tickets, parking, nearby stays and the full Fredericksburg visit' : 'Do not mistake a licensing record for a public track'}</h2>
          <ul className="mt-6 space-y-4">
            {record.visitorNotes.map((item) => <li key={item} className="border-t border-border pt-4 text-sm leading-7 text-muted-foreground">{item}</li>)}
          </ul>
          <div className="mt-7 grid gap-4 border-t border-border pt-6 sm:grid-cols-2">
            <a href={`/county/${record.countySlug}`} className="block border border-border p-5 hover:border-primary"><strong className="font-display text-2xl">{record.county} →</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Nearby attractions, county context and lodging trip planning.</span></a>
            <a href="/horse-racing" className="block border border-border p-5 hover:border-primary"><strong className="font-display text-2xl">Every Texas horse racetrack →</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Compare all four live tracks with historic licensed institutions.</span></a>
          </div>
          {live ? <div data-stay-nearby-slot aria-label="Hotels near Gillespie County Fairgrounds" className="mt-7" /> : null}
          {live ? <p className="mt-5 text-xs leading-6 text-muted-foreground">Texas Defined may earn commissions from clearly disclosed hotel referrals on linked travel guides. We do not receive commissions from race betting links, and no booking price or availability is guaranteed.</p> : null}
        </section>

        <section className="border-b border-border py-10" aria-labelledby="faq">
          <p className="eyebrow text-primary">Good to know</p><h2 id="faq" className="mt-2 font-display text-3xl">Questions about {record.name}</h2>
          <dl className="mt-6 grid gap-x-8 sm:grid-cols-2">
            {answers.map((item) => <div className="border-t border-border py-5" key={item.q}><dt className="font-display text-xl">{item.q}</dt><dd className="mt-3 text-sm leading-7 text-muted-foreground">{item.a}</dd></div>)}
          </dl>
        </section>

        <section className="border-b border-border py-10" aria-labelledby="nearby-racetracks">
          <p className="eyebrow text-primary">Related tracks</p><h2 id="nearby-racetracks" className="mt-2 font-display text-3xl">Other places for live horse racing in Texas</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {peers.map((r) => <a key={r.slug} className="border-t border-border py-5 hover:text-primary" href={r.canonicalPath}>
              <span className="block text-xs uppercase tracking-[0.12em] text-muted-foreground">{r.city}</span>
              <strong className="mt-2 block font-display text-xl">{r.name} →</strong>
              <span className="mt-2 block text-sm leading-6 text-muted-foreground">{r.racing}</span>
            </a>)}
          </div>
          {live ? <p className="mt-6 text-sm"><a href="/event/gillespie-county-fair" className="font-semibold text-primary underline">See also the Gillespie County Fair event guide →</a></p> : null}
        </section>

        <section className="py-10" aria-labelledby="sources">
          <p className="eyebrow text-primary">Editorial verification</p><h2 id="sources" className="mt-2 font-display text-3xl">Official sources and status policy</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Racing dates and regulatory status are subject to change. This page distinguishes published historical licensing material from currently verified live race programs. The following original sources anchor the information above.</p>
          <ul className="mt-5 space-y-3">
            {record.sources.map((s) => <li key={s.url}><a className="text-sm font-semibold text-primary underline" href={s.url} target="_blank" rel="noopener noreferrer">{s.label} ↗</a></li>)}
          </ul>
        </section>
      </main>
    </Container>
  </>;
}

function TexasRacingOrganizationProfile({ record }: { record: TexasRacingOrganization }) {
  const officialLinks = record.sources.filter((source) => source.url !== record.url);
  const faq = [
    { question: `What does ${record.name} do?`, answer: record.role + '. Its official website supplies current programs, requirements and updates.' },
    { question: `Is ${record.name} a place to watch live horse racing?`, answer: 'No. It is an administrative or industry organization. Live racing happens at Lone Star Park, Sam Houston Race Park, Retama Park and Gillespie County Fairgrounds on approved dates.' },
    { question: `Where is ${record.name} based?`, answer: `${record.address}. Verify office hours and any appointment requirements before visiting.` },
  ];
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', '@id': `${base}${record.canonicalPath}#page`, name: `${record.name} — Texas racing organization guide`, description: record.introduction, url: `${base}${record.canonicalPath}`, dateModified: record.sourceDate, citation: record.sources.map((source) => source.url) },
      { '@type': record.slug === 'texas-racing-commission' ? 'GovernmentOrganization' : 'Organization', '@id': `${base}${record.canonicalPath}#organization`, name: record.name, description: record.role, url: record.url,
        address: { '@type': 'PostalAddress', streetAddress: record.address.split(',')[0], addressLocality: record.city, addressRegion: 'TX', addressCountry: 'US' } },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: base },
        { '@type': 'ListItem', position: 2, name: 'Texas horse racing', item: `${base}/horse-racing` },
        { '@type': 'ListItem', position: 3, name: record.name, item: `${base}${record.canonicalPath}` },
      ] },
      { '@type': 'FAQPage', mainEntity: faq.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) },
    ],
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
      <main className="mx-auto max-w-5xl">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-wide text-muted-foreground">
          <a href="/" className="hover:text-foreground">Texas Defined</a><span className="mx-2">/</span>
          <a href="/horse-racing" className="hover:text-foreground">Horse racing</a><span className="mx-2">/</span>
          <span aria-current="page">{record.name}</span>
        </nav>
        <header className="border-b border-border py-10">
          <p className="eyebrow text-primary">Statewide horse racing institution · {record.county}</p>
          <h1 className="mt-3 font-display text-5xl leading-tight sm:text-7xl">{record.name}</h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">{record.introduction}</p>
          <p className="mt-5 text-xs text-muted-foreground">Editorial research reviewed {record.sourceDate}. This is an institution profile, not a spectator racetrack or a hotel affiliate promotion.</p>
        </header>
        <section className="grid gap-8 border-b border-border py-10 md:grid-cols-2">
          <div>
            <p className="eyebrow text-primary">What it does</p><h2 className="mt-2 font-display text-3xl">Role in Texas racing</h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">{record.role}.</p>
            <a href={record.url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block border border-primary px-5 py-3 text-sm font-semibold text-primary hover:underline">Official organization website ↗</a>
          </div>
          <div className="border-t border-border pt-5 md:border-t-0">
            <p className="eyebrow text-primary">Official office · not a racetrack</p>
            <h2 className="mt-2 font-display text-2xl">{record.city}, {record.county}</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{record.address}</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">Confirm visiting rules and hours with the organization. Some applications, especially racing licenses, are handled elsewhere.</p>
            <a href={`/county/${record.countySlug}`} className="mt-4 inline-block text-sm font-semibold text-primary underline">Explore {record.county} →</a>
          </div>
        </section>
        <section className="border-b border-border py-10">
          <p className="eyebrow text-primary">Programs and responsibilities</p>
          <h2 className="mt-2 font-display text-3xl">How the organization works</h2>
          <div className="mt-5 space-y-5">{record.context.map((text) => <p key={text} className="text-base leading-8 text-muted-foreground">{text}</p>)}</div>
        </section>
        <section className="border-b border-border py-10">
          <p className="eyebrow text-primary">Useful resources</p><h2 className="mt-2 font-display text-3xl">What to do next</h2>
          <ul className="mt-5 space-y-4">{record.visitorNotes.map((note) => <li key={note} className="border-t border-border pt-4 text-sm leading-7 text-muted-foreground">{note}</li>)}</ul>
          <a href="/horse-racing" className="mt-6 inline-block font-semibold text-primary underline">Compare all four Texas live horse racetracks →</a>
        </section>
        <section className="border-b border-border py-10">
          <p className="eyebrow text-primary">Other statewide institutions</p><h2 className="mt-2 font-display text-3xl">Related Texas horse-racing organizations</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">{TEXAS_RACING_ORGANIZATIONS.filter((item) => item.slug !== record.slug).map((item) => (
            <a key={item.slug} href={item.canonicalPath} className="border-t border-border py-4 hover:text-primary">
              <strong className="block font-display text-xl">{item.name} →</strong>
              <span className="mt-2 block text-sm leading-6 text-muted-foreground">{item.role}</span>
            </a>
          ))}</div>
        </section>
        <section className="border-b border-border py-10">
          <p className="eyebrow text-primary">Frequently asked questions</p><h2 className="mt-2 font-display text-3xl">About {record.name}</h2>
          <dl className="mt-6 grid gap-5 sm:grid-cols-2">{faq.map((item) => <div key={item.question} className="border-t border-border pt-5"><dt className="font-display text-xl">{item.question}</dt><dd className="mt-3 text-sm leading-7 text-muted-foreground">{item.answer}</dd></div>)}</dl>
        </section>
        <section className="py-10">
          <p className="eyebrow text-primary">Verification</p><h2 className="mt-2 font-display text-3xl">Official sources</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">Original organization sources, not paid placements. This page is an independent Texas Defined guide and does not represent the organization.</p>
          <ul className="mt-5 space-y-3">{officialLinks.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-primary underline">{source.label} ↗</a></li>)}</ul>
        </section>
      </main>
    </Container>
  </>;
}

function TexasHorseRacingCalendarPage() {
  const calendar = TEXAS_HORSE_RACING_CALENDAR;
  const data = calendar.comparison.map((item) => ({
    ...item,
    track: TEXAS_HORSE_RACING_INSTITUTIONS.find((venue) => venue.slug === item.slug),
  }));
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage', '@id': `${base}${calendar.canonicalPath}#page`,
        name: calendar.name, description: calendar.introduction, url: `${base}${calendar.canonicalPath}`,
        dateModified: calendar.sourceDate, citation: calendar.sources.map((source) => source.url),
        mainEntity: { '@id': `${base}${calendar.canonicalPath}#tracks` },
      },
      {
        '@type': 'ItemList', '@id': `${base}${calendar.canonicalPath}#tracks`,
        name: 'Four live Texas horse racetracks by calendar', numberOfItems: data.length,
        itemListElement: data.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.track?.name, url: `${base}${item.track?.canonicalPath}` })),
      },
      {
        '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Texas Defined', item: base },
          { '@type': 'ListItem', position: 2, name: 'Horse racing in Texas', item: `${base}/horse-racing` },
          { '@type': 'ListItem', position: 3, name: 'Race calendar and comparison', item: `${base}${calendar.canonicalPath}` },
        ],
      },
    ],
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
      <main className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-wide text-muted-foreground">
          <a href="/" className="hover:text-foreground">Texas Defined</a><span className="mx-2">/</span><a href="/horse-racing" className="hover:text-foreground">Horse racing</a><span className="mx-2">/</span><span aria-current="page">Live racing calendar</span>
        </nav>
        <header className="border-b border-border py-11">
          <p className="eyebrow text-primary">Live racing · Thoroughbreds · Quarter Horses · Texas</p>
          <h1 className="mt-3 font-display text-5xl leading-tight sm:text-7xl">Texas horse-racing calendar and track comparison</h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">{calendar.introduction}</p>
          <p className="mt-5 text-sm leading-7 text-muted-foreground">Research checked October 17, 2026. This is a sourced season-window reference, not a real-time race-card feed or a ticket inventory. Scheduled dates can change. Never confuse simulcast opening hours with live horse racing.</p>
        </header>
        <section className="border-b border-border py-12" aria-labelledby="next-meets">
          <p className="eyebrow text-primary">Confirmed future meet windows</p>
          <h2 id="next-meets" className="mt-2 font-display text-3xl">Published 2026–27 racing seasons</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {calendar.upcoming.map((meet) => <article key={meet.title} className="border-t border-border pt-5">
              <h3 className="font-display text-2xl">{meet.title}</h3>
              <p className="mt-3 text-lg font-semibold">{meet.starts} — {meet.ends}</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{meet.note}</p>
              <a className="mt-4 inline-block text-sm font-semibold text-primary underline" href={meet.sourceUrl} target="_blank" rel="noopener noreferrer">Check the official race calendar ↗</a>
            </article>)}
          </div>
          <p className="mt-6 text-sm leading-7 text-muted-foreground">Lone Star Park also publishes individual autumn Quarter Horse live race cards. For the next exact race day and post time, check its live schedule directly rather than relying on an old seasonal start date.</p>
        </section>
        <section className="border-b border-border py-12" aria-labelledby="tracks-compared">
          <p className="eyebrow text-primary">Choose the right track</p>
          <h2 id="tracks-compared" className="mt-2 font-display text-3xl">Compare every active Texas horse racetrack</h2>
          <div className="mt-7 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="pb-4 text-left text-sm leading-6 text-muted-foreground">Live horse-racing venues only; historical licenses and simulcast-only sites excluded.</caption>
              <thead><tr className="border-b border-border">
                <th scope="col" className="px-3 py-4 font-semibold">Track and county</th><th scope="col" className="px-3 py-4 font-semibold">Live racing</th>
                <th scope="col" className="px-3 py-4 font-semibold">Published / recently completed meet</th><th scope="col" className="px-3 py-4 font-semibold">Next season status</th>
              </tr></thead>
              <tbody>{data.map((item) => <tr key={item.slug} className="border-b border-border">
                <td className="px-3 py-5 align-top">
                  <a href={item.track?.canonicalPath} className="font-semibold text-primary underline">{item.track?.name} →</a>
                  <span className="mt-2 block text-muted-foreground">{item.track?.city}, {item.track?.county}</span>
                </td>
                <td className="px-3 py-5 align-top">{item.breed}</td>
                <td className="px-3 py-5 align-top">{item.latestSeason}</td>
                <td className="px-3 py-5 align-top">{item.nextSeason}<a href={item.link} target="_blank" rel="noopener noreferrer" className="mt-2 block font-semibold text-primary underline">Official calendar ↗</a></td>
              </tr>)}</tbody>
            </table>
          </div>
        </section>
        <section className="border-b border-border py-12">
          <p className="eyebrow text-primary">Practical planning</p>
          <h2 className="mt-2 font-display text-3xl">Before you drive to a Texas racetrack</h2>
          <div className="mt-6 grid gap-7 md:grid-cols-3">
            <div className="border-t border-border pt-5"><h3 className="font-display text-2xl">Live vs. simulcast</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">An open betting or simulcast facility may not be hosting live races. Confirm the exact date, breed and first-post time.</p></div>
            <div className="border-t border-border pt-5"><h3 className="font-display text-2xl">Admission and parking</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Official ticket pages set current admission and gate hours. Family and holiday offers may vary; verify before travel.</p></div>
            <div className="border-t border-border pt-5"><h3 className="font-display text-2xl">Stay nearby</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Track pages link to the correct county guides for hotels, restaurants and sightseeing. Hotel links may carry affiliate disclosures.</p></div>
          </div>
          <a className="mt-6 inline-block text-sm font-semibold text-primary underline" href="/horse-racing">Return to Texas horse racing authority directory →</a>
        </section>
        <section className="py-12">
          <p className="eyebrow text-primary">Original sources</p><h2 className="mt-2 font-display text-3xl">Official racing schedules and corrections</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">Texas Defined does not sell wagering products or claim that these season windows are guaranteed race dates. Confirm new announcements with the Texas Racing Commission and each track. Current operator pages supersede this October 17, 2026 editorial snapshot.</p>
          <ul className="mt-6 space-y-3">{calendar.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-primary underline">{source.label} ↗</a></li>)}</ul>
        </section>
      </main>
    </Container>
  </>;
}
