import { useMemo, useState } from 'react';
import { Link } from '@tanstack/react-router';

import { Container } from '@/components/layout/Container';
import { ResearchBriefTrustBlock } from '@/components/data/ResearchBriefTrustBlock';
import type { LakeFishDiversityDataset, LakeFishDiversityRow } from '@/data/research/lake-game-fish-diversity.server';

type SortKey = 'targets' | 'density' | 'acreage' | 'name';

export function LakeFishDiversityContent({ data }: { data: LakeFishDiversityDataset }) {
  const [sort, setSort] = useState<SortKey>('targets');
  const [query, setQuery] = useState('');
  const rows = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return data.rows
      .filter((row) => !normalized || `${row.name} ${row.region} ${row.counties.join(' ')} ${row.fishTargets.join(' ')}`.toLowerCase().includes(normalized))
      .slice()
      .sort((a, b) => sortRows(a, b, sort));
  }, [data.rows, query, sort]);

  const leader = data.rows.slice().sort((a, b) => b.fishTargetCount - a.fishTargetCount || a.name.localeCompare(b.name))[0];
  const densityLeader = data.rows.slice().sort((a, b) => b.targetsPerThousandAcres - a.targetsPerThousandAcres || a.name.localeCompare(b.name))[0];
  const chartRows = data.rows.slice().sort((a, b) => b.fishTargetCount - a.fishTargetCount || a.name.localeCompare(b.name)).slice(0, 10);
  const maxTargets = Math.max(...chartRows.map((row) => row.fishTargetCount), 1);

  return <Container className="py-12 sm:py-16">
    {!data.available ? <section className="border-y border-border py-10"><h2 className="font-display text-3xl">Verified lake-profile data is unavailable</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">TexasDefined does not publish a partial diversity comparison when the maintained lake profile dataset cannot be loaded.</p></section> : <>
      <section className="grid gap-6 border-y border-border py-8 md:grid-cols-3">
        <Stat label="Verified lakes compared" value={data.rows.length.toLocaleString('en-US')} note="Published TexasDefined lake profiles with acreage and documented fishing targets." />
        <Stat label="Most documented targets" value={leader ? String(leader.fishTargetCount) : '—'} note={leader?.name ?? 'No comparable lake'} />
        <Stat label="Highest targets per 1,000 acres" value={densityLeader ? densityLeader.targetsPerThousandAcres.toFixed(2) : '—'} note={densityLeader?.name ?? 'No comparable lake'} />
      </section>

      <section className="py-12" aria-labelledby="lake-diversity-chart-heading">
        <div className="border-b border-border pb-4"><p className="eyebrow text-primary">At a glance</p><h2 id="lake-diversity-chart-heading" className="mt-2 font-display text-4xl">Lakes with the broadest documented fishing-target mix</h2></div>
        <div className="mt-6 space-y-4">{chartRows.map((row) => <div key={row.slug} className="grid gap-2 sm:grid-cols-[14rem_1fr_5rem] sm:items-center"><div><p className="font-semibold">{row.name}</p><p className="text-xs text-muted-foreground">{row.region}</p></div><div className="h-3 bg-surface"><div className="h-3 bg-primary" style={{ width: `${Math.max(4, (row.fishTargetCount / maxTargets) * 100)}%` }} /></div><p className="text-right text-sm font-semibold tabular-nums">{row.fishTargetCount}</p></div>)}</div>
        <p className="mt-5 max-w-4xl text-xs leading-6 text-muted-foreground">This is a comparison of documented fishing targets in TexasDefined's source-backed lake profiles, not a biological species-richness census. A grouped category such as “catfish” or “sunfish” counts as one documented target when the maintained profile treats it as one target.</p>
      </section>

      <section className="py-8" aria-labelledby="lake-diversity-table-heading">
        <div className="border-b border-border pb-4"><p className="eyebrow text-primary">Complete comparison</p><h2 id="lake-diversity-table-heading" className="mt-2 font-display text-4xl">Search and sort every verified lake in the dataset</h2></div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="text-sm font-semibold">Search<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Lake, county, region or fish" className="mt-2 w-full border border-border bg-background px-3 py-2 font-normal" /></label>
          <label className="text-sm font-semibold">Sort<select value={sort} onChange={(event) => setSort(event.target.value as SortKey)} className="mt-2 w-full border border-border bg-background px-3 py-2 font-normal"><option value="targets">Most documented targets</option><option value="density">Most targets per 1,000 acres</option><option value="acreage">Largest surface acreage</option><option value="name">Lake name A–Z</option></select></label>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Showing {rows.length.toLocaleString('en-US')} of {data.rows.length.toLocaleString('en-US')} verified lake profiles.</p>
        <div className="mt-5 max-h-[72vh] overflow-auto border-y border-border"><table className="w-full min-w-[1080px] border-collapse text-left text-sm"><thead className="sticky top-0 bg-surface"><tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground"><th className="px-4 py-3">Lake</th><th className="px-4 py-3">Region / counties</th><th className="px-4 py-3">Surface acres</th><th className="px-4 py-3">Documented targets</th><th className="px-4 py-3">Targets / 1,000 acres</th><th className="px-4 py-3">Target mix</th><th className="px-4 py-3">Profile</th></tr></thead><tbody className="divide-y divide-border">{rows.map((row) => <tr key={row.slug}><td className="px-4 py-4 font-semibold">{row.name}</td><td className="px-4 py-4"><p>{row.region}</p><p className="mt-1 text-xs text-muted-foreground">{row.counties.map((county, index) => <span key={county}>{index ? ', ' : ''}<Link to="/$kind/$slug" params={{ kind: 'county', slug: countySlug(county) }} className="hover:text-primary hover:underline">{county}</Link></span>)}</p></td><td className="px-4 py-4 tabular-nums">{row.surfaceAcres.toLocaleString('en-US')}</td><td className="px-4 py-4 font-semibold tabular-nums">{row.fishTargetCount}</td><td className="px-4 py-4 tabular-nums">{row.targetsPerThousandAcres.toFixed(3)}</td><td className="px-4 py-4 text-xs leading-5 text-muted-foreground">{row.fishTargets.join(', ')}</td><td className="px-4 py-4"><Link to="/fishing/lakes/$slug" params={{ slug: row.slug }} className="font-semibold text-primary hover:underline">Open →</Link></td></tr>)}</tbody></table></div>
      </section>

      <ResearchBriefTrustBlock
        lastVerified={formatDate(data.lastVerified) ?? 'Maintained from the current verified TexasDefined lake-profile dataset'}
        nextUpdate="Whenever a verified lake profile adds, removes or materially revises its documented fish targets or acreage."
        csvHref="/texas-data/lake-game-fish-diversity.csv"
        methodology="TexasDefined reads every published source-backed lake profile in the maintained fishing dataset, keeps lakes with a numeric surface-acreage value and at least one documented fishing target, de-duplicates target labels within each lake, counts those labels and divides the count by surface acres / 1,000 for the density measure. The target list is normalized editorial fisheries data derived from the cited lake sources. Grouped profile targets such as catfish or sunfish count as one target category, so this research should not be interpreted as a complete biological inventory of every fish species present."
        sources={[{ name: data.sourceName, url: data.sourceUrl, note: 'Statewide entry point for official Texas lake fisheries information; each row also retains its lake-level primary source in the downloadable CSV.' }]}
        citation={`TexasDefined Research Desk. “Texas Lake Game-Fish Diversity.” TexasDefined.com, ${formatDate(data.lastVerified) ?? 'current maintained edition'}. TexasDefined analysis of verified lake fisheries profiles and primary lake sources. https://texasdefined.com/texas-data/lake-game-fish-diversity`}
      />
    </>}
  </Container>;
}

function Stat({ label, value, note }: { label: string; value: string; note: string }) { return <div><p className="eyebrow text-primary">{label}</p><p className="mt-2 font-display text-4xl">{value}</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{note}</p></div>; }
function sortRows(a: LakeFishDiversityRow, b: LakeFishDiversityRow, sort: SortKey) { if (sort === 'density') return b.targetsPerThousandAcres - a.targetsPerThousandAcres || b.fishTargetCount - a.fishTargetCount || a.name.localeCompare(b.name); if (sort === 'acreage') return b.surfaceAcres - a.surfaceAcres || a.name.localeCompare(b.name); if (sort === 'name') return a.name.localeCompare(b.name); return b.fishTargetCount - a.fishTargetCount || b.targetsPerThousandAcres - a.targetsPerThousandAcres || a.name.localeCompare(b.name); }
function countySlug(value: string) { return value.toLowerCase().replace(/ county$/i, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
function formatDate(value: string | null) { if (!value) return null; const date = new Date(`${value}T12:00:00`); if (Number.isNaN(date.getTime())) return value; return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(date); }

export default LakeFishDiversityContent;
