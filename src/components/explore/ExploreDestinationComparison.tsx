import { useMemo, useState } from "react";
import { CitationTrustPanel } from '@/components/authority/CitationTrustPanel';
import { TexasReferenceMap } from '@/components/authority/TexasReferenceMap';
import type { DestinationComparisonRecord } from '@/data/destination-collections.functions';

export type ExploreComparisonKind = 'state-parks' | 'lakes-rivers' | 'small-towns' | 'road-trips' | 'attractions';

type ReferenceDestination = DestinationComparisonRecord & {
  body?: string[];
  coordinates?: { lat: number; lng: number };
};

const ACTIVITY_SIGNALS = [
  ['Hiking', ['hiking', 'trail']],
  ['Camping', ['camping', 'campground']],
  ['Swimming', ['swimming', 'swim']],
  ['Fishing', ['fishing', 'fish']],
  ['Paddling', ['paddling', 'kayak', 'canoe']],
  ['Boating', ['boating', 'boat']],
  ['Biking', ['biking', 'bike', 'mountain biking']],
  ['Birding / wildlife', ['birding', 'wildlife', 'bird']],
] as const;

const COPY: Record<ExploreComparisonKind, { title: string; description: string; methodology: string; trustTitle: string; citationTitle: string }> = {
  'state-parks': {
    title: 'Texas State Parks Reference Directory',
    description: 'Search, filter, sort and map the source-backed state-park destination records maintained by TexasDefined. Activity marks are deterministic signals from each verified record; always use the official source for current closures, reservations and facility status.',
    methodology: 'TexasDefined includes source-backed destinations returned by the canonical state-parks collection. Search, region, county and activity filters operate on maintained destination fields. Activity labels are deterministic keyword signals from each record’s summary, highlights, planning note and body; they do not substitute for a live TPWD amenity, reservation or closure check. Records without a verified field remain blank rather than being inferred.',
    trustTitle: 'State-park directory sources and methodology',
    citationTitle: 'Texas State Parks Reference Directory',
  },
  'lakes-rivers': {
    title: 'Texas Lakes & Rivers Reference Directory',
    description: 'Search, filter, sort and map the maintained TexasDefined water-destination records. This collection complements the structured Texas Lakes Database in the fishing section and keeps current access and water conditions delegated to official managing authorities.',
    methodology: 'TexasDefined includes source-backed destinations returned by the canonical lakes-and-rivers category. Directory fields come from maintained destination records. The map uses stored coordinates where available. Current access, water levels, flows, fees and closures are intentionally not inferred from durable editorial copy.',
    trustTitle: 'Lake and river directory sources and methodology',
    citationTitle: 'Texas Lakes & Rivers Reference Directory',
  },
  'small-towns': {
    title: 'Compare Texas small-town destinations',
    description: 'Use the maintained destination records to compare region, nearby city or town, season guidance, highlights and practical planning notes. This is a trip-planning comparison, not a ranking of quality of life or a claim that every Texas small town is included.',
    methodology: 'TexasDefined compares only destinations returned by the canonical small-towns category. The table presents maintained editorial and source-backed destination fields and does not convert them into an unsupported best-town score.',
    trustTitle: 'Small-town comparison sources and methodology',
    citationTitle: 'Texas Small-Town Destination Comparison',
  },
  'road-trips': {
    title: 'Compare Texas road-trip destinations and routes',
    description: 'Compare the maintained road-trip records by region, starting-area context, season guidance, highlights and planning notes. Drive time, road closures and current conditions must be checked before departure.',
    methodology: 'The comparison uses only destinations in the maintained road-trip collection. The matrix uses maintained route/destination fields and official links where available; it does not calculate live drive times or infer road conditions.',
    trustTitle: 'Road-trip comparison sources and methodology',
    citationTitle: 'Texas Road-Trip Destination Comparison',
  },
  attractions: {
    title: 'Compare destinations in the TexasDefined attractions catalog',
    description: 'Compare maintained Texas destination records across categories by region, nearby town, season guidance, highlights, planning notes and official source. This is the TexasDefined destination catalog, not a claim to list every attraction in Texas.',
    methodology: 'The attractions comparison uses the same SEO-ready, currently visitable destination catalog that powers TexasDefined Explore. It does not invent popularity scores, ratings or completeness claims; each row keeps its maintained category and official source metadata where available.',
    trustTitle: 'Attractions comparison sources and methodology',
    citationTitle: 'TexasDefined Attractions Catalog',
  },
};

function sourceDate(destinations: DestinationComparisonRecord[]) {
  const values = destinations.map((destination) => destination.sourceCheckedAt).filter((value): value is string => Boolean(value)).sort();
  return values.at(-1) ?? 'Per-destination source verification date not available for every record';
}

function activityText(destination: ReferenceDestination) {
  return [destination.summary, destination.entryNote, ...destination.highlights, ...(destination.body ?? [])].join(' ').toLowerCase();
}

function signals(destination: ReferenceDestination) {
  const text = activityText(destination);
  return ACTIVITY_SIGNALS.filter(([, terms]) => terms.some((term) => text.includes(term))).map(([label]) => label);
}

function officialSources(destinations: DestinationComparisonRecord[]) {
  const seen = new Set<string>();
  return destinations.flatMap((destination) => {
    if (!destination.officialUrl || seen.has(destination.officialUrl)) return [];
    seen.add(destination.officialUrl);
    return [{ name: destination.managingAuthority || `${destination.name} official source`, url: destination.officialUrl, note: destination.name }];
  }).slice(0, 20);
}

function cleanCsv(value: unknown) {
  const text = String(value ?? '');
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function downloadCsv(rows: ReferenceDestination[], kind: ExploreComparisonKind) {
  const header = ['name', 'canonical_url', 'category', 'region', 'county', 'nearest_town', 'activity_or_highlight_signals', 'best_season_note', 'planning_note', 'managing_authority', 'official_url', 'source_checked_at', 'latitude', 'longitude'];
  const lines = [header.join(',')];
  for (const destination of rows) {
    const shownSignals = kind === 'state-parks' ? signals(destination) : destination.highlights;
    lines.push([
      destination.name,
      `https://texasdefined.com/destination/${destination.slug}`,
      destination.category,
      destination.region,
      destination.county,
      destination.nearestTown,
      shownSignals.join(' | '),
      destination.bestSeason,
      destination.entryNote,
      destination.managingAuthority,
      destination.officialUrl,
      destination.sourceCheckedAt,
      destination.coordinates?.lat,
      destination.coordinates?.lng,
    ].map(cleanCsv).join(','));
  }
  const blob = new Blob([`${lines.join('\n')}\n`], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `texasdefined-${kind}-reference-data.csv`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function formatRegion(value: string) {
  return value.replaceAll('-', ' ').replace(/\b\w/g, (character) => character.toUpperCase());
}

export function ExploreDestinationComparison({ destinations, kind }: { destinations: ReferenceDestination[]; kind: ExploreComparisonKind }) {
  if (!destinations.length) return null;
  const isParks = kind === 'state-parks';
  const isReferenceDirectory = isParks || kind === 'lakes-rivers';
  const showCategory = kind === 'attractions';
  const copy = COPY[kind];
  const sorted = [...destinations].sort((a, b) => a.name.localeCompare(b.name));
  const pageSize = kind === 'attractions' ? 100 : sorted.length;
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('all');
  const [county, setCounty] = useState('all');
  const [activity, setActivity] = useState('all');
  const [sortBy, setSortBy] = useState<'name' | 'county' | 'region' | 'verified'>('name');
  const [view, setView] = useState<'table' | 'map'>('table');

  const regions = useMemo(() => [...new Set(sorted.map((destination) => destination.region))].sort(), [sorted]);
  const counties = useMemo(() => [...new Set(sorted.map((destination) => destination.county).filter((value): value is string => Boolean(value)))].sort(), [sorted]);
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const rows = sorted.filter((destination) => {
      if (needle && ![destination.name, destination.summary, destination.nearestTown, destination.county, destination.managingAuthority, ...destination.highlights].filter(Boolean).join(' ').toLowerCase().includes(needle)) return false;
      if (region !== 'all' && destination.region !== region) return false;
      if (county !== 'all' && destination.county !== county) return false;
      if (activity !== 'all' && !signals(destination).includes(activity as ReturnType<typeof signals>[number])) return false;
      return true;
    });
    return rows.sort((left, right) => {
      if (sortBy === 'county') return (left.county ?? 'zzz').localeCompare(right.county ?? 'zzz') || left.name.localeCompare(right.name);
      if (sortBy === 'region') return left.region.localeCompare(right.region) || left.name.localeCompare(right.name);
      if (sortBy === 'verified') return (right.sourceCheckedAt ?? '').localeCompare(left.sourceCheckedAt ?? '') || left.name.localeCompare(right.name);
      return left.name.localeCompare(right.name);
    });
  }, [activity, county, query, region, sortBy, sorted]);

  const visibleDestinations = (kind === 'attractions' ? filtered.slice(0, visibleCount) : filtered);
  const mappedCount = filtered.filter((destination) => destination.coordinates && Number.isFinite(destination.coordinates.lat) && Number.isFinite(destination.coordinates.lng) && (destination.coordinates.lat !== 0 || destination.coordinates.lng !== 0)).length;
  const verifiedCount = filtered.filter((destination) => Boolean(destination.sourceCheckedAt)).length;
  const mapRecords = filtered.flatMap((destination) => destination.coordinates && Number.isFinite(destination.coordinates.lat) && Number.isFinite(destination.coordinates.lng) && (destination.coordinates.lat !== 0 || destination.coordinates.lng !== 0) ? [{
    id: destination.slug,
    name: destination.name,
    href: `/destination/${destination.slug}`,
    latitude: destination.coordinates.lat,
    longitude: destination.coordinates.lng,
    eyebrow: destination.county ? `${destination.county} County` : formatRegion(destination.region),
    detail: `${formatRegion(destination.region)} · Near ${destination.nearestTown}`,
  }] : []);

  return (
    <section className="border-t border-border bg-surface" aria-labelledby={`${kind}-comparison-heading`}>
      <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8">
        <p className="eyebrow text-primary">{isReferenceDirectory ? 'Texas reference data' : 'Comparison guide'}</p>
        <h2 id={`${kind}-comparison-heading`} className="mt-2 font-display text-4xl sm:text-5xl">{copy.title}</h2>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">{copy.description}</p>

        {isReferenceDirectory ? <>
          <div className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Matching records" value={filtered.length.toLocaleString('en-US')} />
            <Stat label="Counties represented" value={new Set(filtered.map((destination) => destination.county).filter(Boolean)).size.toLocaleString('en-US')} />
            <Stat label="Records with coordinates" value={mappedCount.toLocaleString('en-US')} />
            <Stat label="Records with verification dates" value={verifiedCount.toLocaleString('en-US')} />
          </div>

          <div className="mt-8 grid gap-4 border-y border-border py-6 md:grid-cols-2 xl:grid-cols-5">
            <label className="text-sm font-semibold xl:col-span-2">Search records<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Name, town, county, activity…" className="mt-2 w-full border border-border bg-background px-3 py-2.5 font-normal" /></label>
            <label className="text-sm font-semibold">Region<select value={region} onChange={(event) => setRegion(event.target.value)} className="mt-2 w-full border border-border bg-background px-3 py-2.5 font-normal"><option value="all">All regions</option>{regions.map((value) => <option key={value} value={value}>{formatRegion(value)}</option>)}</select></label>
            <label className="text-sm font-semibold">County<select value={county} onChange={(event) => setCounty(event.target.value)} className="mt-2 w-full border border-border bg-background px-3 py-2.5 font-normal"><option value="all">All counties</option>{counties.map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
            <label className="text-sm font-semibold">Activity<select value={activity} onChange={(event) => setActivity(event.target.value)} className="mt-2 w-full border border-border bg-background px-3 py-2.5 font-normal"><option value="all">All activities</option>{ACTIVITY_SIGNALS.map(([label]) => <option key={label} value={label}>{label}</option>)}</select></label>
            <label className="text-sm font-semibold">Sort by<select value={sortBy} onChange={(event) => setSortBy(event.target.value as typeof sortBy)} className="mt-2 w-full border border-border bg-background px-3 py-2.5 font-normal"><option value="name">Name</option><option value="county">County</option><option value="region">Region</option><option value="verified">Most recently verified</option></select></label>
            <div className="flex flex-wrap items-end gap-2 md:col-span-2 xl:col-span-4"><button type="button" onClick={() => setView('table')} className={`border px-4 py-2 text-sm font-semibold ${view === 'table' ? 'border-primary text-primary' : 'border-border'}`}>Table</button><button type="button" onClick={() => setView('map')} className={`border px-4 py-2 text-sm font-semibold ${view === 'map' ? 'border-primary text-primary' : 'border-border'}`}>Map</button><button type="button" onClick={() => downloadCsv(filtered, kind)} className="border border-border px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary">Download filtered CSV</button></div>
          </div>
        </> : null}

        {view === 'map' && isReferenceDirectory ? <div className="mt-8"><TexasReferenceMap records={mapRecords} title={`${copy.title} map`} description={`A simplified Texas orientation map showing ${mapRecords.length} matching source-backed records with stored coordinates.`} /></div> : <div className="mt-7 overflow-x-auto border-y border-border">
          <table className="w-full min-w-[1040px] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-background text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground">
                <th className="px-4 py-3">Destination</th>
                {showCategory ? <th className="px-4 py-3">Category</th> : null}
                <th className="px-4 py-3">Region / nearest town</th>
                <th className="px-4 py-3">Best-season note</th>
                <th className="px-4 py-3">{isParks ? 'Activity signals' : 'Recorded highlights'}</th>
                <th className="px-4 py-3">Planning note</th>
                <th className="px-4 py-3">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {visibleDestinations.map((destination) => {
                const activitySignals = signals(destination);
                const shownSignals = isParks ? activitySignals : destination.highlights.slice(0, 8);
                return (
                  <tr key={destination.slug}>
                    <td className="px-4 py-4 align-top"><a href={`/destination/${destination.slug}`} className="font-display text-lg font-semibold hover:text-primary">{destination.name}</a>{destination.county ? <span className="mt-1 block text-xs text-muted-foreground">{destination.county} County</span> : null}</td>
                    {showCategory ? <td className="px-4 py-4 align-top capitalize">{destination.category.replace(/-/g, ' ')}</td> : null}
                    <td className="px-4 py-4 align-top"><span className="font-semibold capitalize">{formatRegion(destination.region)}</span><span className="mt-1 block text-muted-foreground">Near {destination.nearestTown}</span></td>
                    <td className="px-4 py-4 align-top text-muted-foreground">{destination.bestSeason || 'Verify current conditions'}</td>
                    <td className="px-4 py-4 align-top"><div className="flex max-w-sm flex-wrap gap-1.5">{shownSignals.map((item) => <span key={item} className="rounded-full border px-2 py-1 text-xs font-semibold">{item}</span>)}{shownSignals.length === 0 ? <span className="text-muted-foreground">No structured highlight signal</span> : null}</div></td>
                    <td className="max-w-sm px-4 py-4 align-top text-muted-foreground">{destination.entryNote}</td>
                    <td className="px-4 py-4 align-top">{destination.officialUrl ? <a href={destination.officialUrl} target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline underline-offset-4">Official source ↗</a> : <span className="text-muted-foreground">Official link pending</span>}{destination.sourceCheckedAt ? <span className="mt-1 block text-xs text-muted-foreground">Checked {destination.sourceCheckedAt}</span> : null}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {isReferenceDirectory && !visibleDestinations.length ? <p className="px-4 py-10 text-sm text-muted-foreground">No records match the current filters.</p> : null}
        </div>}

        {kind === 'attractions' && visibleCount < filtered.length ? (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">Showing {visibleDestinations.length.toLocaleString("en-US")} of {filtered.length.toLocaleString("en-US")} maintained destinations.</p>
            <button type="button" className="border border-border px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary" onClick={() => setVisibleCount((count) => Math.min(count + 100, filtered.length))}>Show 100 more</button>
          </div>
        ) : null}

        {isParks ? <section className="mt-10" aria-labelledby="park-activity-index"><h3 id="park-activity-index" className="font-display text-3xl">Parks by recorded activity signal</h3><div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{ACTIVITY_SIGNALS.map(([label]) => { const matching = sorted.filter((destination) => signals(destination).includes(label)); return <div key={label} className="rounded-md border border-border bg-background p-4"><strong className="font-display text-xl">{label}</strong><p className="mt-1 text-sm text-muted-foreground">{matching.length} destination{matching.length === 1 ? '' : 's'} mention this activity.</p><div className="mt-3 space-y-1 text-sm">{matching.slice(0, 6).map((destination) => <a key={destination.slug} href={`/destination/${destination.slug}`} className="block font-semibold text-primary hover:underline">{destination.name}</a>)}</div></div>; })}</div></section> : null}

        <CitationTrustPanel
          className="mt-10"
          sources={officialSources(sorted)}
          methodology={copy.methodology}
          lastVerified={sourceDate(sorted)}
          title={copy.trustTitle}
          citation={`TexasDefined, “${copy.citationTitle},” TexasDefined.com, updated ${sourceDate(sorted)}.`}
          reusePolicy="TexasDefined-created tables, filters and original data organization may be reused for editorial or educational purposes with attribution to TexasDefined.com. Rights to underlying third-party source material remain with their respective owners."
        />
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div className="bg-background p-5"><dt className="text-xs uppercase tracking-[.14em] text-muted-foreground">{label}</dt><dd className="mt-2 font-display text-3xl font-semibold">{value}</dd></div>;
}

export default ExploreDestinationComparison;
