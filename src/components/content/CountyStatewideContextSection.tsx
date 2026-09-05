import { use } from 'react';

import { buildCountyStatewideContext, loadTexasCountyComparison } from '@/data/county-comparison';

export function CountyStatewideContextSection({ countyName, countySlug }: { countyName: string; countySlug: string }) {
  const rows = use(loadTexasCountyComparison());
  const context = buildCountyStatewideContext(rows, countySlug);
  const facts = [
    context.population ? { label: '2020 population', ...context.population } : null,
    context.landArea ? { label: 'land area', ...context.landArea } : null,
    context.density ? { label: 'population density', ...context.density } : null,
    context.waterShare ? { label: 'water share', ...context.waterShare } : null,
  ].filter((fact): fact is { label: string; rank: number; comparedCount: number } => Boolean(fact));

  if (!facts.length) return null;

  return (
    <div className="mt-8 border-t border-border pt-7" aria-labelledby="county-statewide-context-heading">
      <p className="eyebrow text-primary">Statewide context</p>
      <h3 id="county-statewide-context-heading" className="mt-2 font-display text-3xl">Where {countyName} sits in the county data</h3>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
        These ranks use the same Texas State Library and U.S. Census county dataset as the statewide comparison. A rank is shown only when that metric is available for the county and the comparison set; missing source values are excluded rather than estimated.
      </p>
      <dl className="mt-6 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
        {facts.map((fact) => (
          <div key={fact.label} className="border-t border-border py-4">
            <dt className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">{fact.label}</dt>
            <dd className="mt-2 font-display text-2xl">#{fact.rank}</dd>
            <dd className="mt-1 text-xs text-muted-foreground">of {fact.comparedCount} counties with source data</dd>
          </div>
        ))}
      </dl>
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
        <a href="/browse/counties" className="text-primary underline decoration-primary/40 underline-offset-4">Compare all Texas counties →</a>
        <a href="/article/texas-major-cities-regional-differences" className="text-primary underline decoration-primary/40 underline-offset-4">Compare Texas cities & regions →</a>
        <a href="/article/texas-culture-social-customs-newcomers" className="text-primary underline decoration-primary/40 underline-offset-4">Texas culture for newcomers →</a>
      </div>
    </div>
  );
}
