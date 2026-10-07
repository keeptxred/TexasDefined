import { useMemo, useState } from 'react';
import { Link } from '@tanstack/react-router';

import { Container } from '@/components/layout/Container';
import { ResearchBriefTrustBlock } from '@/components/data/ResearchBriefTrustBlock';
import type { StateParkAccessDataset, StateParkAccessRow } from '@/data/research/state-park-access';

type SortKey = 'farthest' | 'nearest' | 'population' | 'name';

export function StateParkAccessContent({ data }: { data: StateParkAccessDataset }) {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('farthest');
  const rows = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return data.rows
      .filter((row) => !normalized || `${row.countyName} ${row.nearestParkName} ${row.parkCounty ?? ''}`.toLowerCase().includes(normalized))
      .slice()
      .sort((a, b) => sortRows(a, b, sort));
  }, [data.rows, query, sort]);

  const farthest = data.rows.slice().sort((a, b) => b.distanceMiles - a.distanceMiles || a.countyName.localeCompare(b.countyName))[0];
  const populationShare = data.populationInCountiesWithin50Miles != null && data.populationWithUsableReferencePoint
    ? (data.populationInCountiesWithin50Miles / data.populationWithUsableReferencePoint) * 100
    : null;
  const chartRows = data.rows.slice().sort((a, b) => b.distanceMiles - a.distanceMiles).slice(0, 10);
  const maxDistance = Math.max(...chartRows.map((row) => row.distanceMiles), 1);

  return <Container className="py-12 sm:py-16">
    {!data.available ? <section className="border-y border-border py-10"><h2 className="font-display text-3xl">A complete county-to-park comparison is not available</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">TexasDefined only publishes this ranking when nearly all 254 county reference points and a substantial set of verified TPWD state-park profiles are available. A partial result stays noindex.</p></section> : <>
      <section className="grid gap-6 border-y border-border py-8 md:grid-cols-4">
        <Stat label="Counties compared" value={`${data.countyCount} of 254`} note="Using U.S. Census Bureau county internal points as a consistent geographic reference." />
        <Stat label="State parks compared" value={data.parkCount.toLocaleString('en-US')} note="Published TexasDefined state-park profiles managed by Texas Parks & Wildlife." />
        <Stat label="Within 50 miles" value={`${data.countiesWithin50Miles} counties`} note="Straight-line distance from the county Census internal point." />
        <Stat label="Farthest county reference point" value={farthest ? `${farthest.distanceMiles.toFixed(1)} mi` : '—'} note={farthest ? `${farthest.countyName} → ${farthest.nearestParkName}` : 'No comparable county'} />
      </section>

      {populationShare != null ? <aside className="mt-8 border-l-4 border-primary pl-5"><p className="eyebrow text-primary">Population-weighted context</p><p className="mt-2 max-w-4xl text-sm leading-7 text-muted-foreground">About <strong className="text-foreground">{populationShare.toFixed(1)}%</strong> of the 2020 Census population represented by counties with usable reference points lives in a county whose <em>county reference point</em> is within 50 straight-line miles of a compared state park. This is a county-level accessibility proxy; it does not mean that the same percentage of individual Texans lives within 50 miles of a park.</p></aside> : null}

      <section className="py-12" aria-labelledby="park-access-chart-heading">
        <div className="border-b border-border pb-4"><p className="eyebrow text-primary">At a glance</p><h2 id="park-access-chart-heading" className="mt-2 font-display text-4xl">County reference points farthest from a compared state park</h2></div>
        <div className="mt-6 space-y-4">{chartRows.map((row) => <div key={row.fips} className="grid gap-2 sm:grid-cols-[14rem_1fr_7rem] sm:items-center"><div><p className="font-semibold">{row.countyName}</p><p className="text-xs text-muted-foreground">Nearest: {row.nearestParkName}</p></div><div className="h-3 bg-surface"><div className="h-3 bg-primary" style={{ width: `${Math.max(4, (row.distanceMiles / maxDistance) * 100)}%` }} /></div><p className="text-right text-sm font-semibold tabular-nums">{row.distanceMiles.toFixed(1)} mi</p></div>)}</div>
      </section>

      <section className="py-8" aria-labelledby="park-access-table-heading">
        <div className="border-b border-border pb-4"><p className="eyebrow text-primary">Complete comparison</p><h2 id="park-access-table-heading" className="mt-2 font-display text-4xl">Nearest compared state park for every Texas county</h2></div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="text-sm font-semibold">Search<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="County or state park" className="mt-2 w-full border border-border bg-background px-3 py-2 font-normal" /></label>
          <label className="text-sm font-semibold">Sort<select value={sort} onChange={(event) => setSort(event.target.value as SortKey)} className="mt-2 w-full border border-border bg-background px-3 py-2 font-normal"><option value="farthest">Farthest from a park</option><option value="nearest">Nearest to a park</option><option value="population">Largest 2020 population</option><option value="name">County name A–Z</option></select></label>
        </div>
        <div className="mt-5 max-h-[72vh] overflow-auto border-y border-border"><table className="w-full min-w-[980px] border-collapse text-left text-sm"><thead className="sticky top-0 bg-surface"><tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground"><th className="px-4 py-3">County</th><th className="px-4 py-3">2020 population</th><th className="px-4 py-3">Nearest park</th><th className="px-4 py-3">Straight-line miles</th><th className="px-4 py-3">County guide</th><th className="px-4 py-3">Park guide</th></tr></thead><tbody className="divide-y divide-border">{rows.map((row) => <tr key={row.fips}><td className="px-4 py-4 font-semibold">{row.countyName}</td><td className="px-4 py-4 tabular-nums">{row.population2020?.toLocaleString('en-US') ?? '—'}</td><td className="px-4 py-4">{row.nearestParkName}{row.parkCounty ? <p className="mt-1 text-xs text-muted-foreground">{row.parkCounty} County</p> : null}</td><td className="px-4 py-4 font-semibold tabular-nums">{row.distanceMiles.toFixed(1)}</td><td className="px-4 py-4"><Link to="/$kind/$slug" params={{ kind: 'county', slug: row.countySlug }} className="font-semibold text-primary hover:underline">Open →</Link></td><td className="px-4 py-4"><Link to="/destination/$slug" params={{ slug: row.nearestParkSlug }} className="font-semibold text-primary hover:underline">Open →</Link></td></tr>)}</tbody></table></div>
      </section>

      <ResearchBriefTrustBlock
        lastVerified={formatDate(data.lastVerified) ?? 'Maintained from the current TexasDefined state-park catalog and Census county geography source'}
        nextUpdate="When Census county reference geography changes materially or TexasDefined adds/removes a verified TPWD state-park profile."
        csvHref="/texas-data/state-park-access.csv"
        methodology="TexasDefined uses the U.S. Census Bureau TIGERweb internal point for each Texas county as a consistent county reference point. It then compares that point with the coordinates of published TexasDefined destination profiles whose names identify them as State Parks and whose managing authority identifies Texas Parks & Wildlife. Straight-line distance is calculated with the haversine formula. State natural areas and state historic sites are excluded from this version. This is a geographic county-level proxy, not a drive-time calculation and not a measurement of every resident's home-to-park distance."
        sources={[{ name: 'U.S. Census Bureau TIGERweb — Texas county geography', url: data.sourceUrls[0], note: 'County internal points and 2020 population used for the county-level proxy.' }, { name: 'Texas Parks & Wildlife — State Parks map', url: data.sourceUrls[1], note: 'Official statewide park reference; TexasDefined park profiles retain their own verification/source links.' }]}
        citation="TexasDefined Research Desk. “How Far Is Each Texas County From a State Park?” TexasDefined.com. TexasDefined calculation using Census county internal points and verified TPWD state-park profiles. https://texasdefined.com/texas-data/state-park-access"
      />
    </>}
  </Container>;
}

function Stat({ label, value, note }: { label: string; value: string; note: string }) { return <div><p className="eyebrow text-primary">{label}</p><p className="mt-2 font-display text-4xl">{value}</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{note}</p></div>; }
function sortRows(a: StateParkAccessRow, b: StateParkAccessRow, sort: SortKey) { if (sort === 'nearest') return a.distanceMiles - b.distanceMiles || a.countyName.localeCompare(b.countyName); if (sort === 'population') return (b.population2020 ?? -1) - (a.population2020 ?? -1) || a.countyName.localeCompare(b.countyName); if (sort === 'name') return a.countyName.localeCompare(b.countyName); return b.distanceMiles - a.distanceMiles || a.countyName.localeCompare(b.countyName); }
function formatDate(value: string | null) { if (!value) return null; const date = new Date(value); if (Number.isNaN(date.getTime())) return value; return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(date); }

export default StateParkAccessContent;
