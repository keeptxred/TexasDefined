import { Link } from '@tanstack/react-router';
import type { TexasCountyComparisonRow } from '@/data/county-comparison';

export function TexasCountyComparisonTable({
  rows,
  title = 'Compare Texas counties',
  description = 'Compare county seats, 2020 Census population, land area, derived population density, water share and structured community relationships, then open the county reference or property-tax guide.',
  limit,
}: {
  rows: TexasCountyComparisonRow[];
  title?: string;
  description?: string;
  limit?: number;
}) {
  const visibleRows = typeof limit === 'number' ? rows.slice(0, limit) : rows;
  return (
    <section className="py-10" aria-labelledby="county-comparison-heading">
      <div className="border-b border-border pb-4">
        <p className="eyebrow text-primary">Statewide comparison</p>
        <h2 id="county-comparison-heading" className="mt-2 font-display text-4xl">{title}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{description}</p>
      </div>
      <div className="mt-6 overflow-x-auto border-y border-border">
        <table className="w-full min-w-[1040px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-surface text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground">
              <th className="px-4 py-3 font-semibold">County</th>
              <th className="px-4 py-3 font-semibold">County seat</th>
              <th className="px-4 py-3 font-semibold">2020 population</th>
              <th className="px-4 py-3 font-semibold">Land area</th>
              <th className="px-4 py-3 font-semibold">Density</th>
              <th className="px-4 py-3 font-semibold">Water share</th>
              <th className="px-4 py-3 font-semibold">Communities in reference</th>
              <th className="px-4 py-3 font-semibold">Research</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {visibleRows.map((row) => (
              <tr key={row.slug}>
                <td className="px-4 py-4 align-top"><strong className="font-display text-lg">{row.name}</strong><span className="mt-1 block text-xs text-muted-foreground">FIPS {row.fipsCode}</span></td>
                <td className="px-4 py-4 align-top">{row.countySeat ?? 'Pending source response'}</td>
                <td className="px-4 py-4 align-top tabular-nums">{row.population2020?.toLocaleString('en-US') ?? 'Pending source response'}</td>
                <td className="px-4 py-4 align-top tabular-nums">{row.landAreaSquareMiles != null ? `${Math.round(row.landAreaSquareMiles).toLocaleString('en-US')} sq mi` : 'Pending source response'}</td>
                <td className="px-4 py-4 align-top tabular-nums">{row.populationDensityPerSquareMile != null ? `${formatDensity(row.populationDensityPerSquareMile)} / sq mi` : 'Pending source response'}</td>
                <td className="px-4 py-4 align-top tabular-nums">{row.waterSharePercent != null ? `${row.waterSharePercent.toFixed(1)}%` : 'Pending source response'}</td>
                <td className="px-4 py-4 align-top text-muted-foreground">{row.majorCommunities.slice(0, 4).join(', ') || 'No communities listed yet'}</td>
                <td className="px-4 py-4 align-top"><div className="grid gap-2 font-semibold"><Link to="/$kind/$slug" params={{ kind: 'county', slug: row.slug }} className="text-primary hover:underline">County guide →</Link><Link to="/property-tax/county/$county" params={{ county: row.slug }} className="text-primary hover:underline">Property-tax guide →</Link></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 max-w-3xl text-xs leading-5 text-muted-foreground">Density is calculated from the 2020 Census population divided by Census land area. Water share is calculated from Census land and water area. Both are derived values shown for comparison, not separate Census estimates.</p>
      {limit && rows.length > limit ? <p className="mt-4 text-sm text-muted-foreground">Showing {limit} of {rows.length} counties.</p> : null}
    </section>
  );
}

function formatDensity(value: number) {
  if (value >= 100) return Math.round(value).toLocaleString('en-US');
  if (value >= 10) return value.toFixed(1);
  return value.toFixed(2);
}

export default TexasCountyComparisonTable;
