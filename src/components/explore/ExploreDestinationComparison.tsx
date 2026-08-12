import { CitationTrustPanel } from '@/components/authority/CitationTrustPanel';
import type { Destination } from '@/data/types';

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

function sourceDate(destinations: Destination[]) {
  const values = destinations.map((destination) => destination.sourceCheckedAt).filter((value): value is string => Boolean(value)).sort();
  return values.at(-1) ?? 'Per-destination source verification date not available for every record';
}

function activityText(destination: Destination) {
  return [destination.summary, destination.entryNote, ...destination.highlights, ...destination.body].join(' ').toLowerCase();
}

function signals(destination: Destination) {
  const text = activityText(destination);
  return ACTIVITY_SIGNALS.filter(([, terms]) => terms.some((term) => text.includes(term))).map(([label]) => label);
}

function officialSources(destinations: Destination[]) {
  const seen = new Set<string>();
  return destinations.flatMap((destination) => {
    if (!destination.officialUrl || seen.has(destination.officialUrl)) return [];
    seen.add(destination.officialUrl);
    return [{ name: destination.managingAuthority || `${destination.name} official source`, url: destination.officialUrl, note: destination.name }];
  }).slice(0, 12);
}

export function ExploreDestinationComparison({ destinations, kind }: { destinations: Destination[]; kind: 'state-parks' | 'lakes-rivers' }) {
  if (!destinations.length) return null;
  const isParks = kind === 'state-parks';
  const sorted = [...destinations].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <section className="border-t border-border bg-surface" aria-labelledby={`${kind}-comparison-heading`}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="eyebrow text-primary">Comparison guide</p>
        <h2 id={`${kind}-comparison-heading`} className="mt-2 font-display text-4xl">
          {isParks ? 'Compare Texas state parks by region, season and activity signals' : 'Compare Texas lakes and river destinations'}
        </h2>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">
          {isParks
            ? 'This table compares the destination records already maintained by Texas Defined. Activity marks are text signals from each record’s verified highlights and summary; they are not a promise that an amenity is open today.'
            : 'Use the destination records to compare region, nearest town, season guidance, planning notes and recorded highlights. Always verify water conditions, access, fees and closures with the linked managing authority before a trip.'}
        </p>

        <div className="mt-7 overflow-x-auto border-y border-border">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-background text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground">
                <th className="px-4 py-3">Destination</th>
                <th className="px-4 py-3">Region / nearest town</th>
                <th className="px-4 py-3">Best-season note</th>
                <th className="px-4 py-3">{isParks ? 'Activity signals' : 'Recorded highlights'}</th>
                <th className="px-4 py-3">Planning note</th>
                <th className="px-4 py-3">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sorted.map((destination) => {
                const activitySignals = signals(destination);
                return (
                  <tr key={destination.slug}>
                    <td className="px-4 py-4 align-top"><a href={`/destination/${destination.slug}`} className="font-display text-lg font-semibold hover:text-primary">{destination.name}</a>{destination.county ? <span className="mt-1 block text-xs text-muted-foreground">{destination.county} County</span> : null}</td>
                    <td className="px-4 py-4 align-top"><span className="font-semibold">{destination.region.replace(/-/g, ' ')}</span><span className="mt-1 block text-muted-foreground">Near {destination.nearestTown}</span></td>
                    <td className="px-4 py-4 align-top text-muted-foreground">{destination.bestSeason || 'Verify current conditions'}</td>
                    <td className="px-4 py-4 align-top"><div className="flex max-w-sm flex-wrap gap-1.5">{(isParks ? activitySignals : destination.highlights.slice(0, 8)).map((item) => <span key={item} className="rounded-full border px-2 py-1 text-xs font-semibold">{item}</span>)}{(isParks ? activitySignals : destination.highlights).length === 0 ? <span className="text-muted-foreground">No structured highlight signal</span> : null}</div></td>
                    <td className="max-w-sm px-4 py-4 align-top text-muted-foreground">{destination.entryNote}</td>
                    <td className="px-4 py-4 align-top">{destination.officialUrl ? <a href={destination.officialUrl} target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline underline-offset-4">Official source ↗</a> : <span className="text-muted-foreground">Official link pending</span>}{destination.sourceCheckedAt ? <span className="mt-1 block text-xs text-muted-foreground">Checked {destination.sourceCheckedAt}</span> : null}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {isParks ? <section className="mt-10" aria-labelledby="park-activity-index"><h3 id="park-activity-index" className="font-display text-3xl">Parks by recorded activity signal</h3><div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{ACTIVITY_SIGNALS.map(([label]) => { const matching = sorted.filter((destination) => signals(destination).includes(label)); return <div key={label} className="rounded-md border border-border bg-background p-4"><strong className="font-display text-xl">{label}</strong><p className="mt-1 text-sm text-muted-foreground">{matching.length} destination{matching.length === 1 ? '' : 's'} mention this activity.</p><div className="mt-3 space-y-1 text-sm">{matching.slice(0, 6).map((destination) => <a key={destination.slug} href={`/destination/${destination.slug}`} className="block font-semibold text-primary hover:underline">{destination.name}</a>)}</div></div>; })}</div></section> : null}

        <CitationTrustPanel
          className="mt-10"
          sources={officialSources(sorted)}
          methodology={isParks ? 'Texas Defined compares only destinations returned by the canonical state-parks category. Activity labels are deterministic keyword signals from each destination’s maintained summary, highlights, entry note and body; they do not substitute for a live TPWD amenity or closure check.' : 'Texas Defined compares only destinations returned by the canonical lakes-and-rivers category. Fields are taken directly from maintained destination records, while current access, water conditions, fees and closures remain delegated to the linked managing authority.'}
          lastVerified={sourceDate(sorted)}
          title={isParks ? 'State-park comparison sources and methodology' : 'Lake and river comparison sources and methodology'}
        />
      </div>
    </section>
  );
}

export default ExploreDestinationComparison;
