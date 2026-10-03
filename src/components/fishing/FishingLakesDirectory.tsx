import { useMemo, useState } from 'react';
import { Link } from "@tanstack/react-router";

import { CitationTrustPanel } from '@/components/authority/CitationTrustPanel';
import { TexasReferenceMap } from '@/components/authority/TexasReferenceMap';
import { Container } from "@/components/layout/Container";
import { fishingFoundationAnchor } from "@/data/fishing/slugs";
import type { FishingLake } from "@/data/fishing/types";

type Target = { name: string; quality: string; prominence: string };
type Row = { lake: FishingLake; targets: Target[] };

type SortKey = 'name' | 'size-desc' | 'depth-desc' | 'year' | 'species-desc';

export function FishingLakesDirectory({ rows, latestReview }: { rows: Row[]; latestReview?: string }) {
  const quickAnswers = buildQuickAnswers(rows.length);
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('all');
  const [county, setCounty] = useState('all');
  const [basin, setBasin] = useState('all');
  const [species, setSpecies] = useState('all');
  const [sortBy, setSortBy] = useState<SortKey>('name');
  const [view, setView] = useState<'table' | 'map'>('table');

  const regions = useMemo(() => [...new Set(rows.map(({ lake }) => lake.region))].sort(), [rows]);
  const counties = useMemo(() => [...new Set(rows.flatMap(({ lake }) => lake.counties))].sort(), [rows]);
  const basins = useMemo(() => [...new Set(rows.map(({ lake }) => lake.riverBasin).filter((value): value is string => Boolean(value)))].sort(), [rows]);
  const speciesNames = useMemo(() => [...new Set(rows.flatMap(({ targets }) => targets.map((target) => target.name)))].sort(), [rows]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return rows.filter(({ lake, targets }) => {
      const searchable = [lake.name, ...(lake.aliases ?? []), lake.summary, lake.region, ...lake.counties, ...lake.nearestCities, lake.riverBasin, lake.primaryWaterway, ...lake.controllingAuthorities, ...targets.map((target) => target.name)].filter(Boolean).join(' ').toLowerCase();
      if (needle && !searchable.includes(needle)) return false;
      if (region !== 'all' && lake.region !== region) return false;
      if (county !== 'all' && !lake.counties.includes(county)) return false;
      if (basin !== 'all' && lake.riverBasin !== basin) return false;
      if (species !== 'all' && !targets.some((target) => target.name === species)) return false;
      return true;
    }).sort((left, right) => {
      if (sortBy === 'size-desc') return (right.lake.surfaceAcres ?? -1) - (left.lake.surfaceAcres ?? -1) || left.lake.name.localeCompare(right.lake.name);
      if (sortBy === 'depth-desc') return (right.lake.maxDepthFeet ?? -1) - (left.lake.maxDepthFeet ?? -1) || left.lake.name.localeCompare(right.lake.name);
      if (sortBy === 'year') return (left.lake.impoundedYear ?? Number.MAX_SAFE_INTEGER) - (right.lake.impoundedYear ?? Number.MAX_SAFE_INTEGER) || left.lake.name.localeCompare(right.lake.name);
      if (sortBy === 'species-desc') return right.targets.length - left.targets.length || left.lake.name.localeCompare(right.lake.name);
      return left.lake.name.localeCompare(right.lake.name);
    });
  }, [basin, county, query, region, rows, sortBy, species]);

  const largest = [...rows].filter(({ lake }) => lake.surfaceAcres != null).sort((a, b) => (b.lake.surfaceAcres ?? 0) - (a.lake.surfaceAcres ?? 0))[0]?.lake;
  const deepest = [...rows].filter(({ lake }) => lake.maxDepthFeet != null).sort((a, b) => (b.lake.maxDepthFeet ?? 0) - (a.lake.maxDepthFeet ?? 0))[0]?.lake;
  const mapRecords = filtered.flatMap(({ lake, targets }) => lake.coordinates ? [{
    id: lake.id,
    name: lake.name,
    href: fishingFoundationAnchor('lake', lake.slug),
    latitude: lake.coordinates.lat,
    longitude: lake.coordinates.lng,
    eyebrow: lake.riverBasin ?? titleCase(lake.region),
    detail: [lake.surfaceAcres ? `${lake.surfaceAcres.toLocaleString('en-US')} acres` : null, lake.maxDepthFeet ? `${lake.maxDepthFeet} ft max depth` : null, targets.slice(0, 3).map((target) => target.name).join(', ')].filter(Boolean).join(' · '),
  }] : []);
  const sources = uniqueSources(rows);

  return <>
    <Container className="pt-8 sm:pt-10"><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap items-center gap-2"><li><Link to="/" className="hover:text-foreground">Front page</Link></li><li aria-hidden>·</li><li><Link to="/fishing" className="hover:text-foreground">Fishing</Link></li><li aria-hidden>·</li><li aria-current="page">Texas Lakes Database</li></ol></nav></Container>
    <header className="mt-5 border-y border-border bg-ink text-ink-foreground"><Container className="py-14 sm:py-20"><p className="eyebrow text-ink-foreground/65">Texas reference data</p><h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">Texas Lakes Database</h1><p className="mt-6 max-w-4xl text-lg leading-8 text-ink-foreground/80">Search, map and compare {rows.length} complete, source-backed Texas lake records by size, depth, county, river basin, waterway and documented fishery strengths. The database grows only when another lake clears the same verification standard.</p><div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm"><a href="/fishing/lakes.csv" className="border-b border-ink-foreground pb-1 font-semibold text-ink-foreground">Download Texas Lakes Data (CSV) →</a><Link to="/fishing/species" className="border-b border-ink-foreground/50 pb-1 text-ink-foreground/75">Fish species directory →</Link><Link to="/fishing/regulations" className="border-b border-ink-foreground/50 pb-1 text-ink-foreground/75">Fishing regulations →</Link></div></Container></header>
    <Container className="py-12 sm:py-16">
      <section className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-5" aria-label="Texas Lakes Database summary">
        <Stat label="Verified lake records" value={rows.length.toLocaleString('en-US')} />
        <Stat label="Counties represented" value={new Set(rows.flatMap(({ lake }) => lake.counties)).size.toLocaleString('en-US')} />
        <Stat label="River basins represented" value={basins.length.toLocaleString('en-US')} />
        <Stat label="Largest recorded lake" value={largest?.surfaceAcres ? `${largest.surfaceAcres.toLocaleString('en-US')} acres` : '—'} detail={largest?.name} />
        <Stat label="Deepest recorded lake" value={deepest?.maxDepthFeet ? `${deepest.maxDepthFeet} ft` : '—'} detail={deepest?.name} />
      </section>

      <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[15rem_1fr]" aria-labelledby="lake-answers-heading"><div><p className="eyebrow text-primary">Scope</p><h2 id="lake-answers-heading" className="mt-2 font-display text-3xl">What this database covers</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">This is a maintained reference dataset, not a claim to include every named pond, lake or reservoir in Texas.</p></div><div className="grid gap-x-8 md:grid-cols-2">{quickAnswers.map((item) => <article key={item.question} className="border-t border-border py-5"><h3 className="font-display text-2xl leading-tight">{item.question}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.answer}</p></article>)}</div></section>

      <section className="py-12" aria-labelledby="lake-directory-heading">
        <div className="flex flex-wrap items-end justify-between gap-5 border-b border-border pb-5"><div><p className="eyebrow text-primary">Work with the data</p><h2 id="lake-directory-heading" className="mt-2 font-display text-4xl">Search and compare Texas lakes</h2></div>{latestReview ? <p className="text-xs leading-5 text-muted-foreground">Records reviewed through {formatDate(latestReview)}.</p> : null}</div>

        <div className="grid gap-4 border-b border-border py-6 md:grid-cols-2 xl:grid-cols-6">
          <label className="text-sm font-semibold md:col-span-2">Search<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Lake, city, county, basin, fish…" className="mt-2 w-full border border-border bg-background px-3 py-2.5 font-normal" /></label>
          <Filter label="Region" value={region} onChange={setRegion} options={regions.map((value) => [value, titleCase(value)] as const)} />
          <Filter label="County" value={county} onChange={setCounty} options={counties.map((value) => [value, value] as const)} />
          <Filter label="River basin" value={basin} onChange={setBasin} options={basins.map((value) => [value, value] as const)} />
          <Filter label="Fish species" value={species} onChange={setSpecies} options={speciesNames.map((value) => [value, value] as const)} />
          <label className="text-sm font-semibold">Sort by<select value={sortBy} onChange={(event) => setSortBy(event.target.value as SortKey)} className="mt-2 w-full border border-border bg-background px-3 py-2.5 font-normal"><option value="name">Name</option><option value="size-desc">Largest first</option><option value="depth-desc">Deepest first</option><option value="year">Oldest impoundment first</option><option value="species-desc">Most documented fish targets</option></select></label>
          <div className="flex flex-wrap items-end gap-2 md:col-span-2 xl:col-span-5"><button type="button" onClick={() => setView('table')} className={`border px-4 py-2 text-sm font-semibold ${view === 'table' ? 'border-primary text-primary' : 'border-border'}`}>Table</button><button type="button" onClick={() => setView('map')} className={`border px-4 py-2 text-sm font-semibold ${view === 'map' ? 'border-primary text-primary' : 'border-border'}`}>Interactive map</button><a href="/fishing/lakes.csv" className="border border-border px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary">Download full CSV</a><button type="button" onClick={() => { setQuery(''); setRegion('all'); setCounty('all'); setBasin('all'); setSpecies('all'); setSortBy('name'); }} className="px-2 py-2 text-sm font-semibold underline underline-offset-4">Reset filters</button><span className="self-center text-sm text-muted-foreground">{filtered.length} matching lake{filtered.length === 1 ? '' : 's'}</span></div>
        </div>

        {view === 'map' ? <div className="mt-8"><TexasReferenceMap records={mapRecords} title="Texas Lakes Database interactive map" description={`A simplified Texas orientation map showing ${mapRecords.length} matching lake records with verified coordinates.`} /></div> : <div className="mt-8 overflow-x-auto border-y border-border"><table className="w-full min-w-[1180px] text-left text-sm"><thead><tr className="border-b border-border bg-surface text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground"><th className="px-4 py-3">Lake</th><th className="px-4 py-3">County / nearby city</th><th className="px-4 py-3">River basin / waterway</th><th className="px-4 py-3">Surface area</th><th className="px-4 py-3">Max depth</th><th className="px-4 py-3">Impounded</th><th className="px-4 py-3">Authority</th><th className="px-4 py-3">Documented fish</th></tr></thead><tbody className="divide-y divide-border">{filtered.map(({ lake, targets }) => <tr key={lake.id}><td className="px-4 py-4 align-top"><a href={fishingFoundationAnchor('lake', lake.slug)} className="font-display text-lg font-semibold hover:text-primary">{lake.name}</a>{lake.aliases?.length ? <span className="mt-1 block text-xs text-muted-foreground">Also: {lake.aliases.join(', ')}</span> : null}<span className="mt-1 block text-xs text-muted-foreground">{lake.waterType.replaceAll('-', ' ')} · {titleCase(lake.region)}</span></td><td className="px-4 py-4 align-top"><span>{lake.counties.join(', ') || '—'}</span><span className="mt-1 block text-muted-foreground">{lake.nearestCities.join(', ') || '—'}</span></td><td className="px-4 py-4 align-top"><span className="font-semibold">{lake.riverBasin ?? '—'}</span><span className="mt-1 block text-muted-foreground">{lake.primaryWaterway ?? '—'}</span></td><td className="px-4 py-4 align-top tabular-nums">{lake.surfaceAcres ? lake.surfaceAcres.toLocaleString('en-US') : '—'}</td><td className="px-4 py-4 align-top tabular-nums">{lake.maxDepthFeet ? `${lake.maxDepthFeet} ft` : '—'}</td><td className="px-4 py-4 align-top tabular-nums">{lake.impoundedYear ?? '—'}</td><td className="max-w-xs px-4 py-4 align-top text-muted-foreground">{lake.controllingAuthorities.join(', ') || '—'}</td><td className="max-w-sm px-4 py-4 align-top"><div className="flex flex-wrap gap-1.5">{targets.slice(0, 6).map((target) => <span key={target.name} className="border border-border px-2 py-1 text-xs">{target.name}</span>)}{targets.length === 0 ? <span className="text-muted-foreground">No verified relationship listed</span> : null}</div></td></tr>)}</tbody></table>{!filtered.length ? <p className="px-4 py-10 text-sm text-muted-foreground">No lake records match the current filters.</p> : null}</div>}
      </section>

      <section className="border-y border-border py-10"><div className="grid gap-8 lg:grid-cols-[15rem_1fr]"><div><p className="eyebrow text-primary">Derived TexasDefined views</p><h2 className="mt-2 font-display text-3xl">Useful comparisons from the same data</h2></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"><Derived title="Largest lakes in this dataset" rows={[...rows].filter(({ lake }) => lake.surfaceAcres != null).sort((a, b) => (b.lake.surfaceAcres ?? 0) - (a.lake.surfaceAcres ?? 0)).slice(0, 5).map(({ lake }) => `${lake.name} — ${lake.surfaceAcres?.toLocaleString('en-US')} acres`)} /><Derived title="Deepest lakes in this dataset" rows={[...rows].filter(({ lake }) => lake.maxDepthFeet != null).sort((a, b) => (b.lake.maxDepthFeet ?? 0) - (a.lake.maxDepthFeet ?? 0)).slice(0, 5).map(({ lake }) => `${lake.name} — ${lake.maxDepthFeet} ft`)} /><Derived title="Most represented fish targets" rows={speciesNames.map((name) => ({ name, count: rows.filter(({ targets }) => targets.some((target) => target.name === name)).length })).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name)).slice(0, 5).map((item) => `${item.name} — ${item.count} lakes`)} /></div></div></section>

      <CitationTrustPanel
        className="mt-10"
        sources={sources}
        methodology="TexasDefined includes only published lake records that have cleared the complete lake-guide verification allowlist. Durable identity fields such as acreage, maximum depth, impoundment year, basin, waterway, authority and coordinates come from each lake’s source-backed fishing record. Lake-to-species relationships are maintained separately and are shown only when present in the verified fishing catalog. Missing values remain blank; live water levels, closures, ramp usability and current fishing reports are not inferred from durable records."
        lastVerified={latestReview ? formatDate(latestReview) : 'See individual lake source records'}
        title="Texas Lakes Database sources and methodology"
        citation={`TexasDefined, “Texas Lakes Database,” TexasDefined.com, updated ${latestReview ? formatDate(latestReview) : 'on the date shown in the database'}.`}
        reusePolicy="TexasDefined-created tables, derived comparisons and original data organization may be republished for editorial or educational use with attribution to TexasDefined.com. Underlying source material remains subject to each source owner’s terms."
        downloads={[{ label: 'Download TexasDefined Texas Lakes Data', url: '/fishing/lakes.csv', format: 'CSV' }]}
      />
    </Container>
  </>;
}

function uniqueSources(rows: Row[]) {
  const seen = new Set<string>();
  return rows.flatMap(({ lake }) => lake.sources).flatMap((source) => {
    if (!source.url || seen.has(source.url)) return [];
    seen.add(source.url);
    return [{ name: source.name, url: source.url, note: source.checkedAt ? `Checked ${formatDate(source.checkedAt)}` : undefined }];
  }).slice(0, 24);
}
function buildQuickAnswers(count: number) {
  return [
    { question: "How many lakes are in this database?", answer: `TexasDefined currently publishes ${count} complete, source-backed lake records. The dataset spans major reservoirs and natural lakes across Texas and expands only as additional records clear the same verification standard.` },
    { question: "Is this every lake in Texas?", answer: "No. Texas has far more named waterbodies than this maintained reference set. TexasDefined intentionally keeps incomplete records out of the indexable lake database rather than creating thin pages simply to increase page count." },
    { question: "What can I compare?", answer: "Where available, the table exposes surface acreage, maximum depth, year impounded, counties, nearby cities, river basin, primary waterway, managing authorities, coordinates and documented fishery relationships." },
    { question: "Where should I check current conditions?", answer: "Use the source links in each lake guide for current regulations, water levels, access restrictions, ramps and fishing reports. Those conditions can change after the durable reference data was verified." },
  ];
}
function Filter({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: ReadonlyArray<readonly [string, string]> }) { return <label className="text-sm font-semibold">{label}<select value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full border border-border bg-background px-3 py-2.5 font-normal"><option value="all">All</option>{options.map(([optionValue, optionLabel]) => <option key={optionValue} value={optionValue}>{optionLabel}</option>)}</select></label>; }
function Stat({ label, value, detail }: { label: string; value: string; detail?: string }) { return <dl className="bg-background p-5"><dt className="text-xs uppercase tracking-[.14em] text-muted-foreground">{label}</dt><dd className="mt-2 font-display text-2xl font-semibold">{value}</dd>{detail ? <dd className="mt-1 text-xs text-muted-foreground">{detail}</dd> : null}</dl>; }
function Derived({ title, rows }: { title: string; rows: string[] }) { return <div className="border-t border-border pt-4"><h3 className="font-display text-xl">{title}</h3><ol className="mt-3 space-y-2 text-sm text-muted-foreground">{rows.map((row, index) => <li key={row}><span className="mr-2 font-semibold text-foreground">{index + 1}.</span>{row}</li>)}</ol></div>; }
function titleCase(value: string) { return value.replaceAll("-", " ").replace(/\b\w/g, (character) => character.toUpperCase()); }
function formatDate(value: string) { const date = new Date(value); return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(date); }
