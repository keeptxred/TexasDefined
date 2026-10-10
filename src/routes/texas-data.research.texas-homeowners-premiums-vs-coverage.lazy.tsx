import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { absoluteUrl } from '@/lib/seo';
import source from '@/data/research-homeowners-premiums.json';

const path = '/texas-data/research/texas-homeowners-premiums-vs-coverage';
const csvPath = path + '.csv';
const rows = source.years.map((r, i, all) => {
  const p = all[i - 1];
  return { ...r,
    premiumDelta: p ? r.average_annual_premium_usd - p.average_annual_premium_usd : null,
    premiumPct: p ? 100 * (r.average_annual_premium_usd / p.average_annual_premium_usd - 1) : null,
    coverageDelta: p ? r.average_coverage_usd - p.average_coverage_usd : null,
    coveragePct: p ? 100 * (r.average_coverage_usd / p.average_coverage_usd - 1) : null,
    ratio: 100000 * r.average_annual_premium_usd / r.average_coverage_usd,
  };
});
const base = rows.find(r => r.year === 2019)!;
const last = rows.find(r => r.year === 2025)!;
const premPct = 100 * (last.average_annual_premium_usd / base.average_annual_premium_usd - 1);
const covPct = 100 * (last.average_coverage_usd / base.average_coverage_usd - 1);
const ratioPct = 100 * (last.ratio / base.ratio - 1);
const dollars = (n: number) => '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });
const pct = (n: number) => n.toFixed(1) + '%';
const change = (n: number | null, unit: 'd' | 'p') => n === null ? '—' : (n < 0 ? '−' : '+') + (unit === 'd' ? dollars(Math.abs(n)) : pct(Math.abs(n)));

export const Route = createLazyFileRoute('/texas-data/research/texas-homeowners-premiums-vs-coverage')({ component: Page });

function Page() {
  const x = (i: number) => 60 + i * 75;
  const y = (v: number) => 265 - (v - 60) * 1.7;
  const line = (kind: 'premium' | 'coverage') => rows.map((r, i) => {
    const value = kind === 'premium' ? 100 * r.average_annual_premium_usd / base.average_annual_premium_usd : 100 * r.average_coverage_usd / base.average_coverage_usd;
    return x(i) + ',' + y(value);
  }).join(' ');
  return <>
    <DepartmentHero current="Home Insurance Research" eyebrow="TexasDefined Research Desk" title="Did Texas home insurance premiums rise faster than coverage?" description="Original analysis of official statewide homeowners insurance averages, 2016–2025." tone="surface" />
    <Container className="py-12 sm:py-16">
      <section className="border-y border-border py-8">
        <p className="eyebrow text-primary">Key finding · 2019–2025</p>
        <h2 className="mt-3 font-display text-4xl">Average premiums rose {pct(premPct)}; average coverage rose {pct(covPct)}.</h2>
        <p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground">The statewide average annual homeowners premium increased <strong>{dollars(last.average_annual_premium_usd - base.average_annual_premium_usd)}</strong>, from {dollars(base.average_annual_premium_usd)} to {dollars(last.average_annual_premium_usd)}. Average insured coverage increased <strong>{dollars(last.average_coverage_usd - base.average_coverage_usd)}</strong>, from {dollars(base.average_coverage_usd)} to {dollars(last.average_coverage_usd)}. The ratio of these two statewide averages increased {pct(ratioPct)}. These are nominal averages, not a matched-policy price index or insurance rate. The 2025 source figures are preliminary.</p>
        <p className="mt-5 text-sm font-semibold"><a href={csvPath} className="text-primary underline underline-offset-4">Download complete CSV ↓</a></p>
      </section>
      <section className="mt-12"><h2 className="font-display text-3xl">Original indexed chart: 2019 = 100</h2>
        <figure className="mt-5 border-y border-border py-6">
          <svg viewBox="0 0 800 310" className="h-auto w-full" role="img" aria-label="Premium and coverage indexed to 2019. Premium index in 2025 is 177.9; coverage index is 150.3.">
            {[60,100,140,180].map(t => <g key={t}><line x1="60" x2="750" y1={y(t)} y2={y(t)} stroke="currentColor" opacity=".15"/><text x="10" y={y(t)+5} fill="currentColor" fontSize="15">{t}</text></g>)}
            {[2016,2019,2022,2025].map(t => <text key={t} x={x(t-2016)} y="300" textAnchor="middle" fill="currentColor" fontSize="15">{t}</text>)}
            <g className="text-primary"><polyline points={line('premium')} stroke="currentColor" strokeWidth="4" fill="none"/></g>
            <g className="text-foreground"><polyline points={line('coverage')} stroke="currentColor" strokeWidth="3" strokeDasharray="10 7" fill="none"/></g>
          </svg>
          <figcaption className="mt-3 text-sm leading-7 text-muted-foreground">TexasDefined calculation from TDI annual figures. Solid line = average premium; dashed line = average coverage. Indexing prevents a misleading comparison of unlike dollar scales. 2025 preliminary.</figcaption>
        </figure>
      </section>
      <section className="mt-12"><h2 className="font-display text-3xl">Complete annual table</h2><div className="mt-5 overflow-x-auto border-y border-border"><table className="w-full min-w-[1050px] text-left text-sm"><caption className="sr-only">Texas annual homeowners premiums, coverage and independently calculated changes</caption><thead><tr className="border-b border-border bg-surface text-xs uppercase tracking-wide">{['Year','Average premium','Average coverage','Premium $ change','Premium % change','Coverage $ change','Coverage % change','Premium per $100k coverage*'].map(h => <th scope="col" className="px-3 py-4" key={h}>{h}</th>)}</tr></thead><tbody className="divide-y divide-border">{rows.map(r => <tr key={r.year}><th scope="row" className="px-3 py-4">{r.year}{r.preliminary ? '*' : ''}</th><td className="px-3 py-4">{dollars(r.average_annual_premium_usd)}</td><td className="px-3 py-4">{dollars(r.average_coverage_usd)}</td><td className="px-3 py-4">{change(r.premiumDelta,'d')}</td><td className="px-3 py-4">{change(r.premiumPct,'p')}</td><td className="px-3 py-4">{change(r.coverageDelta,'d')}</td><td className="px-3 py-4">{change(r.coveragePct,'p')}</td><td className="px-3 py-4">{'}</td></tr>)}</tbody></table></div><p className="mt-3 text-xs leading-6 text-muted-foreground">*2025 preliminary. The last column is the ratio of the two published statewide averages multiplied by 100,000, not an insurance rate or the average of individual policy ratios. The first year's year-over-year fields are blank, not zero.</p></section>
      <section className="mt-12 grid gap-10 border-y border-border py-8 lg:grid-cols-2"><div><h2 className="font-display text-3xl">Methodology and limitations</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">TexasDefined Research Desk used TDI's “Average annual premium” and “Average coverage amount” charts, both sourced to the Texas Statistical Plan for Residential Risks, for matching years 2016–2025. Absolute change = current minus prior year; percentage change = absolute change divided by prior year; indexed values = annual value divided by 2019 value times 100. No source values were missing, imputed, or mixed with another vintage. Values are nominal, not inflation-adjusted. Changes in property values, coverage, policy mix, deductibles, location and rates cannot be separated using these averages. The chart is not a causal study. Do not confuse premiums with separate TDI rate-filing measures.</p><p className="mt-4 text-sm"><a href={source.source_url} className="text-primary underline underline-offset-4">Primary TDI statistical-plan data ↗</a></p></div><div><h2 className="font-display text-3xl">Research record</h2><dl className="mt-4 space-y-3 text-sm"><div><dt className="font-semibold">Author and editor</dt><dd>TexasDefined Research Desk</dd></div><div><dt className="font-semibold">Last verified</dt><dd>October 10, 2026</dd></div><div><dt className="font-semibold">Next review trigger</dt><dd>TDI updates an annual figure, finalizes 2025, or publishes 2026 premium and coverage averages.</dd></div><div><dt className="font-semibold">CSV fields</dt><dd>Year, two original averages, year-over-year dollar and percentage changes, ratio of averages, source status, verification date, and primary-source URL. Undefined changes remain blank.</dd></div></dl></div></section>
      <section className="mt-12"><h2 className="font-display text-3xl">Recommended citation</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">TexasDefined Research Desk. “Did Texas Home Insurance Premiums Rise Faster Than Coverage?” TexasDefined, last verified October 10, 2026. Original calculations from Texas Department of Insurance, Texas Statistical Plan for Residential Risks. {absoluteUrl(texasDefinedBrand, path)}</p></section>
      <nav className="mt-12 border-t border-border pt-7" aria-label="Related TexasDefined references"><h2 className="font-display text-2xl">Related TexasDefined references</h2><div className="mt-4 flex flex-wrap gap-5 text-sm font-semibold"><Link to="/texas-data" className="text-primary underline underline-offset-4">Texas Data</Link><Link to="/texas-data/texas-homeowners-premium-history" className="underline underline-offset-4">Premium history</Link><Link to="/texas-home-insurance-calculator" className="underline underline-offset-4">Insurance calculator</Link><Link to="/browse/counties" className="underline underline-offset-4">County directory</Link><Link to="/county/harris" className="underline underline-offset-4">Harris County</Link><Link to="/county/galveston" className="underline underline-offset-4">Galveston County</Link></div><p className="mt-3 text-xs text-muted-foreground">County links are context only; these are statewide values, not county-specific estimates.</p></nav>
    </Container>
  </>;
}
 + r.ratio.toFixed(2)}</td></tr>)}</tbody></table></div><p className="mt-3 text-xs leading-6 text-muted-foreground">*2025 preliminary. The last column is the ratio of the two published statewide averages multiplied by 100,000, not an insurance rate or the average of individual policy ratios. The first year's year-over-year fields are blank, not zero.</p></section>
      <section className="mt-12 grid gap-10 border-y border-border py-8 lg:grid-cols-2"><div><h2 className="font-display text-3xl">Methodology and limitations</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">TexasDefined Research Desk used TDI's “Average annual premium” and “Average coverage amount” charts, both sourced to the Texas Statistical Plan for Residential Risks, for matching years 2016–2025. Absolute change = current minus prior year; percentage change = absolute change divided by prior year; indexed values = annual value divided by 2019 value times 100. No source values were missing, imputed, or mixed with another vintage. Values are nominal, not inflation-adjusted. Changes in property values, coverage, policy mix, deductibles, location and rates cannot be separated using these averages. The chart is not a causal study. Do not confuse premiums with separate TDI rate-filing measures.</p><p className="mt-4 text-sm"><a href={source.source_url} className="text-primary underline underline-offset-4">Primary TDI statistical-plan data ↗</a></p></div><div><h2 className="font-display text-3xl">Research record</h2><dl className="mt-4 space-y-3 text-sm"><div><dt className="font-semibold">Author and editor</dt><dd>TexasDefined Research Desk</dd></div><div><dt className="font-semibold">Last verified</dt><dd>October 10, 2026</dd></div><div><dt className="font-semibold">Next review trigger</dt><dd>TDI updates an annual figure, finalizes 2025, or publishes 2026 premium and coverage averages.</dd></div><div><dt className="font-semibold">CSV fields</dt><dd>Year, two original averages, year-over-year dollar and percentage changes, ratio of averages, source status, verification date, and primary-source URL. Undefined changes remain blank.</dd></div></dl></div></section>
      <section className="mt-12"><h2 className="font-display text-3xl">Recommended citation</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">TexasDefined Research Desk. “Did Texas Home Insurance Premiums Rise Faster Than Coverage?” TexasDefined, last verified October 10, 2026. Original calculations from Texas Department of Insurance, Texas Statistical Plan for Residential Risks. {absoluteUrl(texasDefinedBrand, path)}</p></section>
      <nav className="mt-12 border-t border-border pt-7" aria-label="Related TexasDefined references"><h2 className="font-display text-2xl">Related TexasDefined references</h2><div className="mt-4 flex flex-wrap gap-5 text-sm font-semibold"><Link to="/texas-data" className="text-primary underline underline-offset-4">Texas Data</Link><Link to="/texas-data/texas-homeowners-premium-history" className="underline underline-offset-4">Premium history</Link><Link to="/texas-home-insurance-calculator" className="underline underline-offset-4">Insurance calculator</Link><Link to="/browse/counties" className="underline underline-offset-4">County directory</Link><Link to="/county/harris" className="underline underline-offset-4">Harris County</Link><Link to="/county/galveston" className="underline underline-offset-4">Galveston County</Link></div><p className="mt-3 text-xs text-muted-foreground">County links are context only; these are statewide values, not county-specific estimates.</p></nav>
    </Container>
  </>;
}
