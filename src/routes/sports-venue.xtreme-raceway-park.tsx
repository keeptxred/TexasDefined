import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { Container } from '@/components/layout/Container';
import { SponsoredSportsPlacement } from '@/components/sports/SponsoredSportsPlacement';
import { getActiveSportsSponsorPlacement } from '@/data/sports-sponsorship.functions';
import { buildMeta, canonicalLink } from '@/lib/seo';

const canonicalPath = '/sports-venue/xtreme-raceway-park';
const canonicalUrl = `https://texasdefined.com${canonicalPath}`;
const venueName = 'Xtreme Raceway Park';
const heroPath = '/images/sports-venues/xtreme-raceway-park-ferris.webp';
const heroUrl = `https://texasdefined.com${heroPath}`;
const officialUrl = 'https://www.xtremeracewaypark.com/';
const scheduleUrl = 'https://www.xtremeracewaypark.com/xrp-schedule/';
const trackInfoUrl = 'https://www.xtremeracewaypark.com/track-info/';
const rulesUrl = 'https://www.xtremeracewaypark.com/track-rules/';
const nhraUrl = 'https://www.nhradiv4.com/membertrackinfo?trackID=885';
const address = '1800 S Interstate 45 Service Rd, Ferris, TX 75125';
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export const Route = createFileRoute('/sports-venue/xtreme-raceway-park')({
  loader: async () => ({
    sponsorPlacement: await getActiveSportsSponsorPlacement({ data: { surfacePath: canonicalPath } }),
  }),
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: 'Xtreme Raceway Park Ferris: Track & Visitor Guide',
      description: 'Plan a visit to Xtreme Raceway Park in Ferris, Texas: active 1/8-mile NHRA drag strip, schedule links, track details, directions and race-day tips.',
      image: heroPath,
      imageAlt: 'AI-created editorial image of Xtreme Raceway Park in Ferris, Texas',
      imageWidth: 500,
      imageHeight: 333,
      imageType: 'image/webp',
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
  component: XtremeRacewayParkPage,
});

function XtremeRacewayParkPage() {
  const { sponsorPlacement } = Route.useLoaderData();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SportsActivityLocation',
        '@id': `${canonicalUrl}#venue`,
        name: venueName,
        alternateName: 'XRP',
        description: 'Active NHRA-sanctioned eighth-mile drag racing facility in Ferris, Texas.',
        url: canonicalUrl,
        mainEntityOfPage: canonicalUrl,
        image: heroUrl,
        telephone: '+1-972-544-3724',
        sameAs: [officialUrl],
        address: {
          '@type': 'PostalAddress',
          streetAddress: '1800 S Interstate 45 Service Rd',
          addressLocality: 'Ferris',
          addressRegion: 'TX',
          postalCode: '75125',
          addressCountry: 'US',
        },
        sport: 'Drag racing',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Front page', item: 'https://texasdefined.com/' },
          { '@type': 'ListItem', position: 2, name: 'Texas Sports', item: 'https://texasdefined.com/sports' },
          { '@type': 'ListItem', position: 3, name: 'Sports Venues', item: 'https://texasdefined.com/sports-venues' },
          { '@type': 'ListItem', position: 4, name: venueName, item: canonicalUrl },
        ],
      },
    ],
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <Container className="pb-16 pt-8 sm:pb-24 sm:pt-12">
      <article className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <a href="/" className="hover:text-foreground">Front page</a><span className="mx-2">/</span>
          <a href="/sports" className="hover:text-foreground">Texas Sports</a><span className="mx-2">/</span>
          <a href="/sports-venues" className="hover:text-foreground">Sports Venues</a><span className="mx-2">/</span>
          <span aria-current="page" className="text-foreground">Xtreme Raceway Park</span>
        </nav>

        <figure className="mt-8">
          <img
            src={heroPath}
            alt="AI-created editorial image of the entrance to Xtreme Raceway Park in Ferris, Texas"
            width={500}
            height={333}
            className="aspect-[3/2] w-full object-cover"
            decoding="async"
            fetchPriority="high"
          />
          <figcaption className="mt-2 text-xs leading-5 text-muted-foreground">AI-created TexasDefined editorial illustration. It is not official venue photography.</figcaption>
        </figure>

        <header className="border-b border-border py-9 sm:py-12">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em]">
            <span className="border border-primary px-3 py-2 text-primary">Operating in 2026</span>
            <span className="text-muted-foreground">Ferris · Ellis County · Drag Racing</span>
          </div>
          <h1 className="mt-5 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">Xtreme Raceway Park</h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground sm:text-xl">A purpose-built eighth-mile drag strip on the I-45 corridor south of Dallas, Xtreme Raceway Park is active in 2026 and part of NHRA's South Central Division.</p>
        </header>

        <dl className="grid border-b border-border sm:grid-cols-2 lg:grid-cols-5">
          <Fact label="Status" value="Active in 2026" />
          <Fact label="Track" value="1/8-mile drag strip" />
          <Fact label="Sanction" value="NHRA Division 4" />
          <Fact label="Opened" value="2018" />
          <Fact label="Phone" value="(972) 544-3724" />
        </dl>

        <div className="flex flex-wrap gap-x-7 gap-y-3 border-b border-border py-5 text-sm font-semibold">
          <a className="underline decoration-primary/50 underline-offset-4 hover:text-primary" href={scheduleUrl} target="_blank" rel="noreferrer">Current race schedule ↗</a>
          <a className="underline decoration-primary/50 underline-offset-4 hover:text-primary" href={officialUrl} target="_blank" rel="noreferrer">Official track website ↗</a>
          <a className="underline decoration-primary/50 underline-offset-4 hover:text-primary" href={mapsUrl} target="_blank" rel="noreferrer">Open in maps ↗</a>
          <a className="underline decoration-primary/50 underline-offset-4 hover:text-primary" href="tel:+19725443724">Call the track</a>
        </div>

        {sponsorPlacement ? <div className="border-b border-border py-8"><SponsoredSportsPlacement placement={sponsorPlacement} /></div> : null}

        <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[16rem_1fr]" aria-labelledby="status-heading">
          <div>
            <p className="eyebrow text-primary">Current status</p>
            <h2 id="status-heading" className="mt-2 font-display text-3xl leading-tight">Yes, Xtreme Raceway Park is still operating</h2>
          </div>
          <div className="max-w-3xl space-y-5 text-base leading-8 text-muted-foreground">
            <p>Xtreme Raceway Park remains an active drag-racing facility in Ferris. In March 2026, NHRA announced that the track had joined its Member Track Network in the South Central Division, and the track continues to publish race and event information through its official site.</p>
            <p>That matters because Xtreme is sometimes confused online with other Texas raceways. This guide is specifically for the Ferris facility at <strong className="font-semibold text-foreground">{address}</strong>.</p>
            <div className="flex flex-wrap gap-5 pt-1 text-sm font-semibold">
              <a className="underline decoration-primary/50 underline-offset-4 hover:text-primary" href={nhraUrl} target="_blank" rel="noreferrer">NHRA member-track listing ↗</a>
              <a className="underline decoration-primary/50 underline-offset-4 hover:text-primary" href={trackInfoUrl} target="_blank" rel="noreferrer">Official track information ↗</a>
            </div>
          </div>
        </section>

        <section className="border-b border-border py-12" aria-labelledby="track-heading">
          <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
            <div>
              <p className="eyebrow text-primary">The track</p>
              <h2 id="track-heading" className="mt-2 font-display text-3xl leading-tight">Built for straight-line racing</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <GuideCard title="Eighth-mile drag strip" body="Xtreme Raceway Park is an eighth-mile dragstrip, not an oval. NHRA Division 4 describes a full-concrete racing surface with an extended shutdown area, multiple staging lanes and spacious pit areas." />
              <GuideCard title="Spectator viewing" body="The track's own facility guide highlights raised, covered viewing areas behind the starting line known as the Bull Pens, plus a 40-by-40-foot covered pavilion with picnic tables and commercial fans." />
              <GuideCard title="What races here" body="The calendar can include bracket racing, index and specialty events, test-and-tune sessions, street-car competition and other drag-racing programs. Use the current schedule for the exact classes running on your date." />
              <GuideCard title="A long race day is normal" body="Drag-racing programs can stretch across many hours. Plan around the posted gate and race times, bring hearing protection, and expect the spectator experience to be closer to the starting line and pits than a conventional stadium visit." />
            </div>
          </div>
        </section>

        <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[16rem_1fr]" aria-labelledby="planning-heading">
          <div>
            <p className="eyebrow text-primary">Race-day planning</p>
            <h2 id="planning-heading" className="mt-2 font-display text-3xl leading-tight">Before you head to Ferris</h2>
          </div>
          <div>
            <div className="grid gap-8 md:grid-cols-2">
              <GuideCard title="Getting there" body="The track sits on the northbound I-45 service road in Ferris. Official directions reference exit 262 when approaching from the Dallas/I-20 side and exit 263A when coming from the Ennis direction." />
              <GuideCard title="Parking and gates" body="Parking layouts, pit access and gate times can vary by event. Check the event listing before leaving rather than assuming every race uses the same arrival plan." />
              <GuideCard title="Track rules" body="The venue's published rules prohibit alcohol and glass bottles and restrict large smokers and grills. Starting-line access is also restricted for younger spectators unless they are competing in an eligible junior class." />
              <GuideCard title="What to bring" body="Hearing protection is a smart choice around open-exhaust race cars. For daytime events, Texas heat and sun can also make water, sunscreen and weather-appropriate clothing important even with covered viewing available." />
            </div>
            <a className="mt-8 inline-flex min-h-11 items-center border border-primary px-5 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground" href={rulesUrl} target="_blank" rel="noreferrer">Read the current track rules ↗</a>
          </div>
        </section>

        <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[16rem_1fr]" aria-labelledby="history-heading">
          <div>
            <p className="eyebrow text-primary">Track history</p>
            <h2 id="history-heading" className="mt-2 font-display text-3xl leading-tight">A modern North Texas drag strip</h2>
          </div>
          <div className="max-w-3xl space-y-5 text-base leading-8 text-muted-foreground">
            <p>Xtreme Raceway Park opened in 2018. Contemporary coverage of the project described it as a new facility developed by racers after the closure of Texas Raceway accelerated the need for another drag-racing home in the Dallas-Fort Worth area.</p>
            <p>The track was designed around racer and fan needs rather than adapted from an oval or another type of venue. Its 2026 move into the NHRA Member Track Network gives the Ferris facility a current place in NHRA's Division 4 ecosystem.</p>
          </div>
        </section>

        <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[16rem_1fr]" aria-labelledby="links-heading">
          <div>
            <p className="eyebrow text-primary">Official sources</p>
            <h2 id="links-heading" className="mt-2 font-display text-3xl leading-tight">Check before you go</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Schedules, gate times, ticket details and rules can change by event.</p>
          </div>
          <div className="grid gap-x-8 sm:grid-cols-2">
            <OfficialLink href={officialUrl} title="Xtreme Raceway Park website" detail="Track home, announcements and visitor information" />
            <OfficialLink href={scheduleUrl} title="Race schedule" detail="Current event listings and race dates" />
            <OfficialLink href={trackInfoUrl} title="Track information" detail="Facility features, address, phone and directions" />
            <OfficialLink href={rulesUrl} title="Track rules" detail="Current spectator and facility policies" />
            <OfficialLink href={nhraUrl} title="NHRA Division 4 listing" detail="Current NHRA member-track information" />
            <OfficialLink href={mapsUrl} title="Map and directions" detail={address} />
          </div>
        </section>

        <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[16rem_1fr]">
          <div>
            <p className="eyebrow text-primary">Make a day of it</p>
            <h2 className="mt-2 font-display text-3xl leading-tight">Ferris and the I-45 racing corridor</h2>
          </div>
          <div className="max-w-3xl text-base leading-8 text-muted-foreground">
            <p>Ferris sits south of Dallas on I-45, making Xtreme Raceway Park practical for a Dallas-area day trip. Multi-day race visitors can also look toward Ennis and the I-45 corridor for lodging and food; Texas Motorplex in Ennis makes this stretch of North Texas especially familiar to drag-racing fans.</p>
            <div className="mt-6 flex flex-wrap gap-5 text-sm font-semibold">
              <a className="underline decoration-primary/50 underline-offset-4 hover:text-primary" href="/county/ellis">Explore Ellis County →</a>
              <a className="underline decoration-primary/50 underline-offset-4 hover:text-primary" href="/sports-venue/texas-motorplex">Texas Motorplex guide →</a>
              <a className="underline decoration-primary/50 underline-offset-4 hover:text-primary" href="/sports-venues">All Texas sports venues →</a>
            </div>
          </div>
        </section>

        <aside className="grid gap-7 py-10 lg:grid-cols-[1fr_auto] lg:items-center" aria-labelledby="partnership-heading">
          <div>
            <p className="eyebrow text-primary">Local business partnerships</p>
            <h2 id="partnership-heading" className="mt-2 font-display text-3xl">Serve race visitors in Ellis County?</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Hotels, restaurants and visitor businesses can ask about clearly disclosed sports-travel sponsorships. Paid relationships do not change TexasDefined's editorial conclusions or venue coverage.</p>
          </div>
          <a href={`/partner-with-us?type=sports-travel&source=${encodeURIComponent(canonicalPath)}#partnership-form-heading`} className="inline-flex min-h-11 items-center justify-center border border-primary px-5 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground">Ask about partnership options →</a>
        </aside>
      </article>
    </Container>
  </>;
}

function Fact({ label, value }: { label: string; value: string }) {
  return <div className="border-b border-border px-0 py-5 sm:px-5 sm:first:pl-0 lg:border-b-0 lg:border-r lg:last:border-r-0">
    <dt className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">{label}</dt>
    <dd className="mt-2 font-semibold text-foreground">{value}</dd>
  </div>;
}

function GuideCard({ title, body }: { title: string; body: string }) {
  return <div className="border-t border-border pt-4">
    <h3 className="font-display text-2xl leading-tight">{title}</h3>
    <p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p>
  </div>;
}

function OfficialLink({ href, title, detail }: { href: string; title: string; detail: string }) {
  return <a href={href} target="_blank" rel="noreferrer" className="group border-t border-border py-5">
    <strong className="block font-display text-xl group-hover:text-primary">{title} ↗</strong>
    <span className="mt-2 block text-sm leading-6 text-muted-foreground">{detail}</span>
  </a>;
}
