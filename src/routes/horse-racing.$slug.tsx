import { createFileRoute, notFound } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { Container } from '@/components/layout/Container';
import { findTexasHorseRacingInstitution, HORSE_RACING_REVIEW_DATE, TEXAS_HORSE_RACING_INSTITUTIONS } from '@/data/horse-racing-authority';
import { buildMeta, canonicalLink } from '@/lib/seo';

const base = 'https://texasdefined.com';

export const Route = createFileRoute('/horse-racing/$slug')({
  loader: ({ params }) => {
    const record = findTexasHorseRacingInstitution(params.slug);
    // Three working commercial tracks retain their established sports-venue canonicals.
    if (!record || record.canonicalPath !== `/horse-racing/${params.slug}`) throw notFound();
    return { record };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { record } = loaderData;
    const isLive = record.category === 'live';
    return {
      meta: buildMeta(texasDefinedBrand, {
        title: isLive
          ? 'Gillespie County Fairgrounds Horse Racing: Fredericksburg Track & Dates'
          : `${record.name} Texas: Racetrack History, License Status & Location`,
        description: isLive
          ? 'Plan a Gillespie County Fairgrounds horse racing visit in Fredericksburg: summer Thoroughbred and Quarter Horse racing, official calendars, admission, parking, hotels and Gillespie County guide.'
          : `Learn about ${record.name} in ${record.city}, Texas, its inactive horse-racing license record, status, history and official Texas Racing Commission sources. No live races advertised.`,
        canonicalPath: record.canonicalPath,
      }),
      links: [canonicalLink(texasDefinedBrand, record.canonicalPath)],
    };
  },
  component: TexasHorseRacingInstitutionPage,
});

function TexasHorseRacingInstitutionPage() {
  const { record } = Route.useLoaderData();
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
          <h1 className="mt-3 font-display text-5xl leading-[1.02] sm:text-7xl">{record.name}</h1>
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
