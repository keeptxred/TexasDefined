import { Link } from '@tanstack/react-router';
import { useMemo, useState } from 'react';

import { CitationTrustPanel } from '@/components/authority/CitationTrustPanel';
import { Container } from '@/components/layout/Container';
import type { LakeGameFishDiversityDataset, LakeGameFishDiversityRow } from '@/data/lake-game-fish-diversity';
import { TEXASDEFINED_RESEARCH_AUTHOR, TEXASDEFINED_RESEARCH_EDITOR } from '@/data/original-research';

type SortKey = 'targetCount' | 'targetsPerThousandAcres' | 'surfaceAcres' | 'name';

export function LakeGameFishDiversityContent({ data }: { data: LakeGameFishDiversityDataset }) {
  const [sortKey, setSortKey] = useState<SortKey>('targetCount');
  const [descending, setDescending] = useState(true);
  const rows = useMemo(() => sortRows(data.rows, sortKey, descending), [data.rows, sortKey, descending]);
  const byDensity = data.rows.filter((row) => row.targetsPerThousandAcres != null).slice().sort((a, b) => (b.targetsPerThousandAcres ?? 0) - (a.targetsPerThousandAcres ?? 0));
  const leader = data.rows[0];
  const densityLeader = byDensity[0];
  const chartRows = data.rows.slice(0, 12);
  const maxTargets = Math.max(1, ...chartRows.map((row) => row.targetCount));

  const chooseSort = (key: SortKey) => {
    if (key === sortKey) setDescending((value) => !value);
    else { setSortKey(key); setDescending(key !== 'name'); }
  };

  return <Container className="py-12 sm:py-16">
    <section className="border-y border-border py-8">
      <p className="eyebrow text-primary">Direct answer</p>
      <h2 className="mt-2 max-w-4xl font-display text-4xl">The comparison counts verified lake-to-fish relationships already maintained by TexasDefined</h2>
      <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">This is an original calculation over TexasDefined's source-backed fishing catalog. It measures documented fishing targets, not a biological species census. Some maintained targets are fishing groups such as crappie or catfish, so the table deliberately uses “targets” rather than implying every row is a species-level taxonomic inventory.</p>
      <div className="mt-7 grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Lakes compared" value={data.lakeCount.toLocaleString('en-US')} />
        <Stat label="Verified relationships" value={data.relationshipCount.toLocaleString('en-US')} />
        <Stat label="Most targets" value={leader ? `${leader.name}: ${leader.targetCount}` : '—'} />
        <Stat label="Most targets / 1,000 acres" value={densityLeader?.targetsPerThousandAcres != null ? `${densityLeader.name}: ${densityLeader.targetsPerThousandAcres.toFixed(2)}` : '—'} />
      </div>
      <a href="/texas-data/lake-game-fish-diversity.csv" className="mt-6 inline-block border-b border-primary text-sm font-semibold text-primary">Download the full CSV →</a>
    </section>

    <section className="mt-12" aria-labelledby="lake-diversity-chart">
      <p className="eyebrow text-primary">TexasDefined analysis</p>
      <h2 id="lake-diversity-chart" className="mt-2 font-display text-4xl">Documented fishing-target diversity</h2>
      <div className="mt-6 space-y-4 border-y border-border py-7">
        {chartRows.map((row, index) => <div key={row.lakeId} className="grid gap-2 sm:grid-cols-[2rem_minmax(11rem,16rem)_1fr_3rem] sm:items-center">
          <span className="text-xs tabular-nums text-muted-foreground">{index + 1}</span>
          <Link to="/fishing/lakes/$slug" params={{ slug: row.slug }} className="font-semibold hover:text-primary">{row.name}</Link>
          <div className="h-2 bg-surface"><div className="h-full bg-primary" style={{ width: `${Math.max(2, (row.targetCount / maxTargets) * 100)}%` }} /></div>
          <span className="text-right text-sm font-semibold tabular-nums">{row.targetCount}</span>
        </div>)}
      </div>
      <p className="mt-3 text-xs leading-5 text-muted-foreground">Chart: TexasDefined calculation from the same relationship records used in the table and CSV.</p>
    </section>

    <section className="mt-12" aria-labelledby="lake-diversity-table">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-4">
        <div><p className="eyebrow text-primary">Complete dataset</p><h2 id="lake-diversity-table" className="mt-2 font-display text-4xl">Every lake with a verified fish relationship</h2></div>
        <p className="text-xs text-muted-foreground">Click a column heading to sort.</p>
      </div>
      <div className="overflow-x-auto border-b border-border">
        <table className="w-full min-w-[1080px] border-collapse text-left text-sm">
          <thead><tr className="bg-surface text-xs uppercase tracking-wide text-muted-foreground">
            <SortHead label="Lake" active={sortKey === 'name'} descending={descending} onClick={() => chooseSort('name')} />
            <th className="px-4 py-3">County / counties</th>
            <SortHead label="Acres" active={sortKey === 'surfaceAcres'} descending={descending} onClick={() => chooseSort('surfaceAcres')} />
            <th className="px-4 py-3">Basin</th>
            <SortHead label="Targets" active={sortKey === 'targetCount'} descending={descending} onClick={() => chooseSort('targetCount')} />
            <SortHead label="Targets / 1k acres" active={sortKey === 'targetsPerThousandAcres'} descending={descending} onClick={() => chooseSort('targetsPerThousandAcres')} />
            <th className="px-4 py-3">Documented targets</th>
          </tr></thead>
          <tbody className="divide-y divide-border">{rows.map((row) => <LakeRow key={row.lakeId} row={row} />)}</tbody>
        </table>
      </div>
    </section>

    <CitationTrustPanel
      className="mt-12"
      title="Sources, methodology and citation"
      sources={[{ name: 'Texas Parks & Wildlife Department — Texas Lake Finder', url: 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/', note: 'Primary statewide lake and fishery authority used throughout the maintained fishing catalog.' }]}
      methodology="TexasDefined joins every published lake in its maintained fishing catalog to its verified lake-species relationship records, counts unique documented fishing targets, and divides that count by surface acres for the secondary per-1,000-acre measure. Rows without a verified fish relationship are not ranked. This analysis does not infer undocumented species and does not treat the normalized measure as a claim about fishing quality."
      lastVerified="October 3, 2026. Individual lake records also retain their own source and verification dates."
      nextReview="Recalculate whenever a verified lake profile or lake-to-fish relationship changes; review statewide source coverage at least quarterly."
      author={TEXASDEFINED_RESEARCH_AUTHOR}
      editor={TEXASDEFINED_RESEARCH_EDITOR}
      recommendedCitation="Texas Defined Editorial Desk. “Texas Lakes With the Most Documented Game-Fish Targets.” TexasDefined.com, updated October 3, 2026. https://texasdefined.com/texas-data/lake-game-fish-diversity"
    />
  </Container>;
}

function Stat({ label, value }: { label: string; value: string }) { return <div className="border-b border-border py-5 sm:border-b-0 sm:border-r sm:px-5 first:pl-0 last:border-r-0"><dt className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">{label}</dt><dd className="mt-2 font-display text-2xl">{value}</dd></div>; }

function SortHead({ label, active, descending, onClick }: { label: string; active: boolean; descending: boolean; onClick: () => void }) { return <th className="px-4 py-3"><button type="button" onClick={onClick} className="font-semibold hover:text-foreground">{label}{active ? (descending ? ' ↓' : ' ↑') : ''}</button></th>; }

function LakeRow({ row }: { row: LakeGameFishDiversityRow }) {
  return <tr><td className="px-4 py-4 font-semibold"><Link to="/fishing/lakes/$slug" params={{ slug: row.slug }} className="hover:text-primary hover:underline">{row.name}</Link></td><td className="px-4 py-4">{row.counties.join(', ') || '—'}</td><td className="px-4 py-4 tabular-nums">{row.surfaceAcres?.toLocaleString('en-US') ?? '—'}</td><td className="px-4 py-4">{row.riverBasin ?? '—'}</td><td className="px-4 py-4 font-semibold tabular-nums">{row.targetCount}</td><td className="px-4 py-4 tabular-nums">{row.targetsPerThousandAcres?.toFixed(3) ?? '—'}</td><td className="px-4 py-4 text-xs leading-5 text-muted-foreground">{row.targets.join(', ')}</td></tr>;
}

function sortRows(rows: LakeGameFishDiversityRow[], key: SortKey, descending: boolean) {
  return rows.slice().sort((a, b) => {
    const left = key === 'name' ? a.name : (a[key] ?? -Infinity);
    const right = key === 'name' ? b.name : (b[key] ?? -Infinity);
    const compared = typeof left === 'string' && typeof right === 'string' ? left.localeCompare(right) : Number(left) - Number(right);
    return descending ? -compared : compared;
  });
}

export default LakeGameFishDiversityContent;
