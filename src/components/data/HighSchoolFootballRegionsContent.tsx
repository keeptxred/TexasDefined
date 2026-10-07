import { useMemo, useState } from 'react';
import { Link } from '@tanstack/react-router';

import { Container } from '@/components/layout/Container';
import { ResearchBriefTrustBlock } from '@/components/data/ResearchBriefTrustBlock';
import type { FootballRegionDataset, FootballRegionProgramRow, FootballResearchRegion } from '@/data/research/high-school-football-regions';

type SortKey = 'region' | 'class' | 'district' | 'school';

export function HighSchoolFootballRegionsContent({ data }: { data: FootballRegionDataset }) {
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState<'all' | FootballResearchRegion>('all');
  const [sort, setSort] = useState<SortKey>('region');
  const rows = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return data.programs
      .filter((row) => region === 'all' || row.region === region)
      .filter((row) => !normalized || `${row.schoolName} ${row.classification} ${row.region} ${row.district}`.toLowerCase().includes(normalized))
      .slice()
      .sort((a, b) => sortPrograms(a, b, sort));
  }, [data.programs, query, region, sort]);

  const mostPrograms = data.regions.slice().sort((a, b) => b.programCount - a.programCount || a.region.localeCompare(b.region))[0];
  const sixManTotal = data.regions.reduce((sum, row) => sum + row.sixManPrograms, 0);
  const elevenManTotal = data.regions.reduce((sum, row) => sum + row.elevenManPrograms, 0);
  const maxPrograms = Math.max(...data.regions.map((row) => row.programCount), 1);

  return <Container className="py-12 sm:py-16">
    {!data.available ? <section className="border-y border-border py-10"><h2 className="font-display text-3xl">The complete UIL alignment is not available</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">TexasDefined publishes this analysis only when the maintained 2026–28 alignment validates to all 1,268 UIL football programs and every program maps to District 1–16.</p></section> : <>
      <section className="grid gap-6 border-y border-border py-8 md:grid-cols-4">
        <Stat label="UIL football programs" value={data.programCount.toLocaleString('en-US')} note={`Complete maintained ${data.alignmentCycle} alignment.`} />
        <Stat label="Largest competitive region" value={mostPrograms?.region ?? '—'} note={mostPrograms ? `${mostPrograms.programCount.toLocaleString('en-US')} programs` : 'No complete regional summary'} />
        <Stat label="Six-man programs" value={sixManTotal.toLocaleString('en-US')} note="1A programs in the maintained alignment." />
        <Stat label="Eleven-man programs" value={elevenManTotal.toLocaleString('en-US')} note="2A through 6A programs in the maintained alignment." />
      </section>

      <aside className="mt-8 border-l-4 border-primary pl-5"><p className="eyebrow text-primary">What this measures</p><p className="mt-2 max-w-4xl text-sm leading-7 text-muted-foreground">This brief measures <strong className="text-foreground">program distribution</strong>, not athlete participation. TexasDefined does not substitute school enrollment or team count for the number of students who actually participate in football. A true participation study should wait for an authoritative athlete-participation dataset.</p></aside>

      <section className="py-12" aria-labelledby="football-region-chart-heading">
        <div className="border-b border-border pb-4"><p className="eyebrow text-primary">At a glance</p><h2 id="football-region-chart-heading" className="mt-2 font-display text-4xl">UIL football programs by competitive region</h2></div>
        <div className="mt-6 space-y-5">{data.regions.map((row) => <div key={row.region} className="grid gap-3 sm:grid-cols-[10rem_1fr_7rem] sm:items-center"><div><p className="font-semibold">{row.region}</p><p className="text-xs text-muted-foreground">Districts {regionDistrictRange(row.region)}</p></div><div><div className="h-4 bg-surface"><div className="h-4 bg-primary" style={{ width: `${Math.max(5, (row.programCount / maxPrograms) * 100)}%` }} /></div><p className="mt-2 text-xs text-muted-foreground">{(['1A','2A','3A','4A','5A','6A'] as const).map((classification) => `${classification}: ${row.byClassification[classification]}`).join(' · ')}</p></div><p className="text-right font-display text-3xl tabular-nums">{row.programCount}</p></div>)}</div>
      </section>

      <section className="py-8" aria-labelledby="football-region-table-heading">
        <div className="border-b border-border pb-4"><p className="eyebrow text-primary">Complete alignment</p><h2 id="football-region-table-heading" className="mt-2 font-display text-4xl">Search all 1,268 UIL football programs</h2></div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <label className="text-sm font-semibold">Search<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="School, class, district or region" className="mt-2 w-full border border-border bg-background px-3 py-2 font-normal" /></label>
          <label className="text-sm font-semibold">Region<select value={region} onChange={(event) => setRegion(event.target.value as typeof region)} className="mt-2 w-full border border-border bg-background px-3 py-2 font-normal"><option value="all">All UIL regions</option><option value="Region I">Region I</option><option value="Region II">Region II</option><option value="Region III">Region III</option><option value="Region IV">Region IV</option></select></label>
          <label className="text-sm font-semibold">Sort<select value={sort} onChange={(event) => setSort(event.target.value as SortKey)} className="mt-2 w-full border border-border bg-background px-3 py-2 font-normal"><option value="region">Region then class</option><option value="class">Classification</option><option value="district">District</option><option value="school">School A–Z</option></select></label>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Showing {rows.length.toLocaleString('en-US')} of {data.programCount.toLocaleString('en-US')} current UIL football programs.</p>
        <div className="mt-5 max-h-[72vh] overflow-auto border-y border-border"><table className="w-full min-w-[880px] border-collapse text-left text-sm"><thead className="sticky top-0 bg-surface"><tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground"><th className="px-4 py-3">School</th><th className="px-4 py-3">Class</th><th className="px-4 py-3">Division</th><th className="px-4 py-3">District</th><th className="px-4 py-3">UIL region</th><th className="px-4 py-3">Format</th><th className="px-4 py-3">Program guide</th></tr></thead><tbody className="divide-y divide-border">{rows.map((row) => <tr key={`${row.classification}-${row.division ?? 'x'}-${row.district}-${row.schoolName}`}><td className="px-4 py-4 font-semibold">{row.schoolName}</td><td className="px-4 py-4">{row.classification}</td><td className="px-4 py-4">{row.division ? `Division ${roman(row.division)}` : '—'}</td><td className="px-4 py-4 tabular-nums">{row.district}</td><td className="px-4 py-4">{row.region}</td><td className="px-4 py-4">{row.footballType}</td><td className="px-4 py-4"><Link to={row.profilePath} className="font-semibold text-primary hover:underline">Open →</Link></td></tr>)}</tbody></table></div>
      </section>

      <ResearchBriefTrustBlock
        lastVerified="2026–28 UIL biennial football alignment maintained by TexasDefined"
        nextUpdate="When UIL issues a material alignment correction or publishes the next biennial football alignment."
        csvHref="/texas-data/high-school-football-regions.csv"
        methodology="TexasDefined uses the complete maintained UIL 2026–28 football alignment (1,268 programs). For this analysis, Districts 1–4 are grouped as Region I, 5–8 as Region II, 9–12 as Region III and 13–16 as Region IV, matching the four-region competitive structure used to organize the alignment. TexasDefined counts each listed football program once and reports six-man versus eleven-man format and classification. The analysis intentionally does not call these counts athlete participation because the alignment does not contain the number of students participating on each team."
        sources={[{ name: 'University Interscholastic League — 2026–28 football realignment', url: 'https://realignment.uiltexas.org/', note: `${data.sourceUrls.length} maintained UIL alignment documents feed the complete program table.` }]}
        citation="TexasDefined Research Desk. “Texas High-School Football Programs by UIL Region, 2026–28.” TexasDefined.com. TexasDefined calculation from UIL biennial football alignments. https://texasdefined.com/texas-data/high-school-football-regions"
      />
    </>}
  </Container>;
}

function Stat({ label, value, note }: { label: string; value: string; note: string }) { return <div><p className="eyebrow text-primary">{label}</p><p className="mt-2 font-display text-4xl">{value}</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{note}</p></div>; }
function sortPrograms(a: FootballRegionProgramRow, b: FootballRegionProgramRow, sort: SortKey) { if (sort === 'class') return Number(b.classification[0]) - Number(a.classification[0]) || a.region.localeCompare(b.region) || a.schoolName.localeCompare(b.schoolName); if (sort === 'district') return a.district - b.district || Number(b.classification[0]) - Number(a.classification[0]) || a.schoolName.localeCompare(b.schoolName); if (sort === 'school') return a.schoolName.localeCompare(b.schoolName); return a.region.localeCompare(b.region) || Number(b.classification[0]) - Number(a.classification[0]) || a.district - b.district || a.schoolName.localeCompare(b.schoolName); }
function regionDistrictRange(region: FootballResearchRegion) { if (region === 'Region I') return '1–4'; if (region === 'Region II') return '5–8'; if (region === 'Region III') return '9–12'; return '13–16'; }
function roman(value: 1 | 2) { return value === 1 ? 'I' : 'II'; }

export default HighSchoolFootballRegionsContent;
