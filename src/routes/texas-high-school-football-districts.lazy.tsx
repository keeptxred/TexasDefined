import { createLazyFileRoute, Link } from '@tanstack/react-router';

import { CitationTrustPanel } from '@/components/authority/CitationTrustPanel';
import { Container } from '@/components/layout/Container';
import { UIL_FOOTBALL_ENROLLMENT_BANDS_SOURCE } from '@/data/high-school-football/enrollment-bands';

const UIL_FOOTBALL_ALIGNMENTS_URL = 'https://www.uiltexas.org/football/alignments';
const UIL_EXACT_ENROLLMENT_URL = 'https://www.uiltexas.org/files/alignments/Alpha_26-28.pdf';

export const Route = createLazyFileRoute('/texas-high-school-football-districts')({ component: Page });

function Page() {
  const districts = Route.useLoaderData();
  const groups = new Map<string, typeof districts>();
  const programCount = districts.reduce((sum, district) => sum + district.programCount, 0);

  for (const district of districts) {
    const key = district.division
      ? `${district.classification} Division ${district.division === 1 ? 'I' : 'II'}`
      : district.classification;
    const current = groups.get(key) ?? [];
    current.push(district);
    groups.set(key, current);
  }

  return <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
    <main className="mx-auto max-w-6xl">
      <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
        <Link to="/">Front page</Link><span className="mx-2">/</span>
        <Link to="/sports">Texas Sports</Link><span className="mx-2">/</span>
        <a href="/texas-high-school-football-teams">High school football teams</a><span className="mx-2">/</span>
        <span aria-current="page">UIL districts</span>
      </nav>

      <header className="border-b border-border py-10">
        <p className="eyebrow text-primary">2026–28 UIL football alignment</p>
        <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">Texas high school football districts</h1>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">Browse all 192 current UIL football districts. Each district page lists every member school in the official 2026–28 alignment and links directly to that program’s TexasDefined research profile.</p>
        <dl className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="border-l-2 border-primary pl-3"><dt className="text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">UIL districts</dt><dd className="mt-1 font-display text-2xl font-semibold">{districts.length}</dd></div>
          <div className="border-l-2 border-primary pl-3"><dt className="text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">UIL programs</dt><dd className="mt-1 font-display text-2xl font-semibold">{programCount.toLocaleString('en-US')}</dd></div>
          <div className="border-l-2 border-primary pl-3"><dt className="text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">Alignment cycle</dt><dd className="mt-1 font-display text-2xl font-semibold">2026–28</dd></div>
        </dl>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
          <a href="/texas-high-school-football-teams" className="text-primary">Search all 1,268 UIL programs →</a>
          <a href="/texas-data/high-school-football-programs.csv" className="text-primary">Download UIL program data (CSV) ↓</a>
          <a href="/article/texas-high-school-football-classifications-1a-6a" className="text-primary">Understand 1A through 6A →</a>
          <a href="/article/texas-high-school-football-playoffs-explained" className="text-primary">How the playoffs work →</a>
        </div>
      </header>

      <section className="py-10">
        <p className="max-w-4xl text-sm leading-7 text-muted-foreground">District assignment is a current competition structure, not a school or team ranking. UIL realignment runs on a two-year cycle, so these pages are explicitly tied to the 2026–28 alignment.</p>
      </section>

      <div className="space-y-12">
        {[...groups].map(([label, entries]) => <section key={label} className="border-t-2 border-foreground pt-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow text-primary">{entries[0]?.footballType}</p>
              <h2 className="mt-2 font-display text-4xl">{label}</h2>
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{entries.length} districts</span>
          </div>
          <div className="mt-6 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {entries.map((district) => <a key={district.slug} href={district.profilePath} className="group bg-background p-5 hover:bg-surface">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">District {district.district}</p>
              <h3 className="mt-2 font-display text-2xl group-hover:text-primary">{district.programCount} {district.programCount === 1 ? 'program' : 'programs'}</h3>
              <p className="mt-2 text-xs text-muted-foreground">Open current district →</p>
            </a>)}
          </div>
        </section>)}
      </div>

      <CitationTrustPanel
        className="mt-12"
        title="UIL football district sources and methodology"
        citationTitle="Texas High School Football Districts — 2026–28 UIL Alignment"
        sources={[
          { name: 'University Interscholastic League — Football Alignments', url: UIL_FOOTBALL_ALIGNMENTS_URL, note: 'Controlling source for current football district assignments; UIL posts revisions on this page.' },
          { name: 'UIL 2026–28 Alphabetical List of Schools', url: UIL_EXACT_ENROLLMENT_URL, note: 'Source for the reported enrollment snapshot used in realignment.' },
          { name: 'UIL 2026–28 conference and division cutoffs', url: UIL_FOOTBALL_ENROLLMENT_BANDS_SOURCE.url, note: 'Official classification and division enrollment bands.' },
        ]}
        methodology="TexasDefined groups the current UIL football program records by classification, division and district, then links each district to the same school-profile records used throughout the football directory. District membership is not ranked or inferred. The downloadable CSV is generated from the same 1,268-program index that powers the directory. If UIL revises an alignment, UIL remains the controlling source."
        lastVerified="Official UIL football alignment and 2026–28 realignment sources rechecked October 3, 2026."
        keyStats={[
          { label: 'UIL districts', value: districts.length.toLocaleString('en-US') },
          { label: 'UIL programs', value: programCount.toLocaleString('en-US') },
          { label: 'Alignment cycle', value: '2026–28' },
        ]}
        dataDownloads={[{ label: 'UIL football programs', url: '/texas-data/high-school-football-programs.csv', format: 'CSV' }]}
      />
    </main>
  </Container>;
}
