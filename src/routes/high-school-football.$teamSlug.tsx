import { createFileRoute, notFound } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { Container } from '@/components/layout/Container';
import { buildMeta, canonicalLink } from '@/lib/seo';

const UIL_ELIGIBILITY_URL = 'https://www.uiltexas.org/policy/eligibility';
const UIL_DETAILED_ELIGIBILITY_URL = 'https://www.uiltexas.org/policy/constitution/general/eligibility';
const TEA_ASKTED_URL = 'https://tealprod.tea.state.tx.us/Tea.AskTed.Web/Forms/Home.aspx';

export const Route = createFileRoute('/high-school-football/$teamSlug')({
  loader: async ({ params }) => {
    const { getFootballProgramProfile } = await import('@/data/high-school-football/football-directory.server');
    const profile = await getFootballProgramProfile(params.teamSlug);
    if (!profile) throw notFound();
    return profile;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const program = loaderData.program;
    const name = program.officialSchoolName || program.schoolName;
    const canonicalPath = program.profilePath;
    const place = [program.city, program.countyName].filter(Boolean).join(', ');
    const history = program.allTimeHistory
      ? ` ${program.allTimeHistory.stateTitles} UIL state ${program.allTimeHistory.stateTitles === 1 ? 'title' : 'titles'} and ${program.allTimeHistory.stateFinalAppearances} state-final ${program.allTimeHistory.stateFinalAppearances === 1 ? 'appearance' : 'appearances'}.`
      : '';
    const location = place ? ` in ${place}` : '';
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: `${name} Football: UIL Class, District & Program History`,
        description: `${name} football profile${location}: current UIL ${program.classification} alignment, district ${program.district}, ${program.footballType}, ISD/county context and enrollment research guidance.${history}`,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    };
  },
  component: FootballProgramProfilePage,
});

function FootballProgramProfilePage() {
  const { program, districtPeers, directoryAvailable, historyAvailable, allTimeHistoryAvailable } = Route.useLoaderData();
  const name = program.officialSchoolName || program.schoolName;
  const canonicalUrl = `https://texasdefined.com${program.profilePath}`;
  const division = program.division ? `Division ${program.division === 1 ? 'I' : 'II'}` : 'No preassigned division';
  const districtLabel = `${program.classification} ${program.division ? `Division ${program.division === 1 ? 'I' : 'II'} ` : ''}District ${program.district}`;
  const recentFinal = program.recentHistory?.mostRecentFinalSeason;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SportsTeam',
        '@id': `${canonicalUrl}#football-team`,
        name: `${name} football`,
        sport: 'American football',
        url: canonicalUrl,
      },
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: `${name} football profile`,
        about: { '@id': `${canonicalUrl}#football-team` },
        isPartOf: { '@id': 'https://texasdefined.com/#website' },
        publisher: { '@id': 'https://texasdefined.com/#organization' },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Front page', item: 'https://texasdefined.com/' },
          { '@type': 'ListItem', position: 2, name: 'Texas high school football', item: 'https://texasdefined.com/texas-high-school-football-teams' },
          { '@type': 'ListItem', position: 3, name, item: canonicalUrl },
        ],
      },
    ],
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
      <article className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <a href="/">Front page</a><span className="mx-2">/</span>
          <a href="/texas-high-school-football-teams">High school football</a><span className="mx-2">/</span>
          <span aria-current="page">{name}</span>
        </nav>

        <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
          <div>
            <p className="eyebrow text-primary">Texas high school football profile</p>
            <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">{name} football</h1>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">
              Current UIL alignment, school-district context, state-final history and relocation research for families evaluating {name} as a football and school option.
            </p>
          </div>
          <dl className="border-y border-border py-4 text-sm lg:border-y-0 lg:border-l lg:py-0 lg:pl-6">
            <Fact label="UIL classification" value={program.classification} />
            <Fact label="Football division" value={division} />
            <Fact label="UIL district" value={String(program.district)} />
            <Fact label="Football format" value={program.footballType} />
            <Fact label="ISD / district" value={program.districtName} />
            <Fact label="City" value={program.city} />
            <Fact label="County" value={program.countyName} />
            <Fact label="Alignment cycle" value={program.alignmentCycle} />
          </dl>
        </header>

        <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[15rem_1fr]">
          <div>
            <p className="eyebrow text-primary">Program snapshot</p>
            <h2 className="mt-2 font-display text-3xl">What the sourced football record says</h2>
          </div>
          <div>
            <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
              <Metric label="Current UIL level" value={alignmentLabel(program.classification, program.division)} />
              <Metric label="District" value={String(program.district)} />
              <Metric label="All-time state titles" value={program.allTimeHistory ? String(program.allTimeHistory.stateTitles) : 'No exact match'} />
              <Metric label="All-time state finals" value={program.allTimeHistory ? String(program.allTimeHistory.stateFinalAppearances) : 'No exact match'} />
            </div>
            {program.recentHistory ? <div className="mt-7 border-t border-border pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">Recent UIL state-final window · 2018–19 through 2025–26</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <Metric label="Recent titles" value={String(program.recentHistory.stateTitles)} />
                <Metric label="Recent state finals" value={String(program.recentHistory.stateFinalAppearances)} />
                <Metric label="Most recent final" value={recentFinal ? shortSeason(recentFinal) : '—'} />
              </div>
              {program.recentHistory.finals.length ? <ul className="mt-5 divide-y divide-border border-y border-border">
                {program.recentHistory.finals.map((final) => <li key={`${final.season}-${final.conference}-${final.result}`} className="py-3 text-sm">
                  <strong>{shortSeason(final.season)} · {final.result}</strong>
                  <span className="ml-2 text-muted-foreground">{final.conference} · vs. {final.opponent} · {final.score}</span>
                </li>)}
              </ul> : null}
            </div> : null}
            <p className="mt-5 text-xs leading-6 text-muted-foreground">
              State-final history is useful context, not a complete measure of program quality. It does not capture every winning season, district title, playoff run, coaching change, roster opportunity or player-development environment.
            </p>
          </div>
        </section>

        <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[15rem_1fr]">
          <div>
            <p className="eyebrow text-primary">District competition</p>
            <h2 className="mt-2 font-display text-3xl">Who {name} is aligned with now</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{districtLabel} is the current 2026–28 football alignment. Realignment can change every two years.</p>
          </div>
          <div>
            {districtPeers.length ? <div className="grid gap-px bg-border sm:grid-cols-2">
              {districtPeers.map((peer) => <a key={peer.profilePath} href={peer.profilePath} className="bg-background p-5 group">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{peer.classification}{peer.division ? ` · Division ${peer.division === 1 ? 'I' : 'II'}` : ''}</p>
                <h3 className="mt-2 font-display text-2xl group-hover:text-primary">{peer.officialSchoolName || peer.schoolName}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{[peer.districtName, peer.city].filter(Boolean).join(' · ') || 'Texas'}</p>
                <span className="mt-3 inline-block text-sm font-semibold text-primary">Open program profile →</span>
              </a>)}
            </div> : <p className="text-sm text-muted-foreground">No additional district peers were found in the current alignment dataset.</p>}
          </div>
        </section>

        <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[15rem_1fr]">
          <div>
            <p className="eyebrow text-primary">Enrollment & eligibility</p>
            <h2 className="mt-2 font-display text-3xl">How to enroll at {name} and research football eligibility</h2>
          </div>
          <div>
            <p className="max-w-4xl text-sm leading-7 text-muted-foreground">
              Do not choose a house from the school name alone. Texas attendance zones, transfer policies and UIL varsity-eligibility rules are separate questions. A student can be enrolled at a school without automatically being varsity-eligible in every circumstance.
            </p>
            <ol className="mt-6 divide-y divide-border border-y border-border">
              <Step number="01" title="Verify the exact home address">
                Use the exact street address to confirm the assigned district and campus. A city name, ZIP code, subdivision name or real-estate listing is not enough. {program.districtName ? <>AskTED currently associates this campus with <strong>{program.districtName}</strong>, but the district controls attendance-zone and transfer decisions.</> : <>TexasDefined could not confidently match this UIL name to a current AskTED district record, so verify directly with TEA and the local district.</>}
              </Step>
              <Step number="02" title="Complete the district’s student-enrollment process">
                The district determines registration dates, proof-of-residency requirements, records, immunization documentation, transfer procedures and campus assignment. Use the district’s official enrollment office or campus registrar for the current checklist.
              </Step>
              <Step number="03" title="Ask the football program about participation">
                After school placement is confirmed, ask the campus or athletic department about physicals, participation forms, offseason or summer programs, freshman/JV/varsity structure, equipment, tryout expectations and the correct coach contact.
              </Step>
              <Step number="04" title="Verify UIL athletic eligibility before making a football-driven move">
                UIL rules include residence, attendance-zone, transfer and “changing schools for athletic purposes” provisions. A family considering a move or transfer specifically for football should get a school administrator’s eligibility determination rather than assuming enrollment equals immediate varsity eligibility.
              </Step>
            </ol>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
              <a href="/find-my-school-district" className="text-primary underline underline-offset-4">Find the school district →</a>
              <a href={TEA_ASKTED_URL} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-4">Texas Education Agency AskTED ↗</a>
              <a href={UIL_ELIGIBILITY_URL} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-4">UIL eligibility standards ↗</a>
              <a href={UIL_DETAILED_ELIGIBILITY_URL} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-4">UIL detailed eligibility rules ↗</a>
            </div>
          </div>
        </section>

        <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[15rem_1fr]">
          <div>
            <p className="eyebrow text-primary">For a family comparison</p>
            <h2 className="mt-2 font-display text-3xl">Questions worth asking beyond trophies</h2>
          </div>
          <div className="grid gap-px bg-border sm:grid-cols-2">
            {[
              ['Roster opportunity', 'How many freshman, JV and varsity players are in the program, and how does the staff move developing players between levels?'],
              ['Coaching continuity', 'How long has the current head coach and core staff been in place, and has the offensive or defensive system changed recently?'],
              ['Player development', 'What offseason, strength, summer and position-development opportunities are actually available to a new student?'],
              ['School fit', 'Does the campus fit the student academically, socially and logistically even if football changes because of injury, coaching turnover or roster competition?'],
            ].map(([title, body]) => <div key={title} className="bg-background p-5">
              <h3 className="font-display text-2xl">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p>
            </div>)}
          </div>
        </section>

        <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[15rem_1fr]">
          <div>
            <p className="eyebrow text-primary">Keep researching</p>
            <h2 className="mt-2 font-display text-3xl">Connect this team to the rest of TexasDefined</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Related href="/texas-high-school-football-teams" title="Compare football programs" body="Return to the statewide finder and compare up to three current UIL programs side by side." />
            <Related href="/article/texas-high-school-football-classifications-1a-6a" title="Understand the classification" body="See what 1A through 6A, divisions, district realignment and enrollment cutoffs actually mean." />
            <Related href="/article/texas-high-school-football-playoffs-explained" title="Understand the playoff path" body="See district qualification, 6A Division I/II placement, bi-district play and neutral-site rounds." />
            <Related href="/sports-venues/high-school-football" title="Research stadiums and game trips" body="Browse TexasDefined high-school stadium guides, parking information and Friday-night travel context." />
          </div>
        </section>

        <section className="py-10 text-xs leading-6 text-muted-foreground">
          <p><strong className="text-foreground">Sources and freshness:</strong> current football alignment is UIL 2026–28. School/ISD/city/county context comes from TEA AskTED when the school-name match is confident. All-time and recent state-final data come from UIL’s official football history sources.</p>
          {!directoryAvailable && <p className="mt-2">TEA AskTED was unavailable when this page loaded, so school-district location context may be temporarily incomplete.</p>}
          {!historyAvailable && <p className="mt-2">UIL’s recent state archive was unavailable when this page loaded, so recent state-final details are temporarily omitted.</p>}
          {!allTimeHistoryAvailable && <p className="mt-2">UIL’s all-time appearances table was unavailable when this page loaded, so all-time state-title/final totals are temporarily omitted.</p>}
          <p className="mt-2">TexasDefined does not rank this school academically or declare it the “best” football choice. The page is designed to surface sourced football context and the practical questions a family should verify before a move.</p>
        </section>
      </article>
    </Container>
  </>;
}

function Fact({ label, value }: { label: string; value?: string }) {
  return value ? <div className="border-b border-border py-3 last:border-b-0 lg:first:pt-0 lg:last:pb-0"><dt className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">{label}</dt><dd className="mt-1 font-medium">{value}</dd></div> : null;
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="bg-background p-5"><dt className="text-xs uppercase tracking-[0.1em] text-muted-foreground">{label}</dt><dd className="mt-2 font-display text-2xl">{value}</dd></div>;
}

function Step({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return <li className="grid gap-3 py-5 sm:grid-cols-[3rem_1fr]">
    <span className="font-display text-3xl text-primary">{number}</span>
    <div><h3 className="font-display text-2xl">{title}</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">{children}</p></div>
  </li>;
}

function Related({ href, title, body }: { href: string; title: string; body: string }) {
  return <a href={href} className="border-t-2 border-foreground pt-4">
    <h3 className="font-display text-2xl hover:text-primary">{title}</h3>
    <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
  </a>;
}

function alignmentLabel(classification: string, division: 1 | 2 | null) {
  return division ? `${classification} Division ${division === 1 ? 'I' : 'II'}` : classification;
}

function shortSeason(season: string) {
  const [start, end] = season.split('-');
  return start && end ? `${start.slice(-2)}–${end.slice(-2)}` : season;
}
