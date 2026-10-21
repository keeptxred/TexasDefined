import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { Container } from '@/components/layout/Container';
import { getTaxingUnitRateHistory } from '@/data/property/texas-tax-rates.functions';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

export const Route = createFileRoute('/property-tax/taxing-unit/$unit')({
  loader: async ({ params }) => {
    const history = await getTaxingUnitRateHistory({ data: { slug: params.unit.trim().toLowerCase() } });
    if (!history.length) throw notFound();
    return { history, latest: history.at(-1)! };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { latest, history } = loaderData;
    const canonicalPath = `/property-tax/taxing-unit/${latest.slug}`;
    const description = `${latest.name} property-tax rate history, latest finalized rate, maintenance-and-operations and debt-service components when reported, counties served and official Texas Comptroller source.`;
    const indexable = history.filter((record) => !record.rateUnavailable && record.totalRate != null).length >= 3;
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: `${latest.name} Property Tax Rate & History`,
        description,
        robots: indexable ? undefined : 'noindex, follow, max-image-preview:large',
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        '@context': 'https://schema.org',
        '@type': 'Dataset',
        '@id': `${pageUrl}#dataset`,
        name: `${latest.name} property-tax rate history`,
        description,
        url: pageUrl,
        temporalCoverage: `${history[0]?.year}/${history.at(-1)?.year}`,
        creator: { '@type': 'Organization', name: 'Texas Defined' },
        citation: latest.slug === 'escobares' && latest.type === 'city'
          ? [latest.sourceUrl, STARR_CAD_REPORT_URL]
          : latest.sourceUrl,
        publisher: { '@type': 'Organization', name: 'Texas Defined' },
        variableMeasured: ['Total property-tax rate', 'Maintenance and operations rate', 'Debt-service / I&S rate', 'Reported levy'],
      })],
    };
  },
  component: Page,
});

// Starr CAD's published 2024 local rate fills a statewide reporting gap for display only.
// The Comptroller-derived database record remains "not-reported" for source integrity.
const STARR_CAD_REPORT_URL = 'https://starrcad.org/wp-content/uploads/2025/08/2025-ANNUAL-REPORT.pdf';
const STARR_CAD_2024_COMPONENTS_URL = 'https://starrcad.org/wp-content/uploads/2024/10/2024-tax-rates-2.pdf';

function Page() {
  const { latest, history } = Route.useLoaderData();
  const displayHistory = history.map((record) => {
    const locallyVerified = latest.type === 'city' && latest.slug === 'escobares' && record.year === 2024 && record.totalRate == null;
    return {
      ...record,
      displayTotalRate: locallyVerified ? 0.340447 : record.totalRate,
      displayOperationsRate: locallyVerified ? 0.263594 : record.maintenanceOperationsRate,
      displayDebtRate: locallyVerified ? 0.076853 : record.debtServiceRate,
      localSourceUrl: locallyVerified ? STARR_CAD_REPORT_URL : null,
    };
  });
  const rateCount = displayHistory.filter((record) => record.displayTotalRate != null).length;
  const chartMaximum = Math.max(0.01, ...displayHistory.map((record) => record.displayTotalRate ?? 0));
  const first = history[0];
  const rateChange = latest.totalRate != null && first?.totalRate != null ? latest.totalRate - first.totalRate : null;
  const countyLinks = latest.countySlugs.map((slug) => ({ slug, name: title(slug) + ' County' }));

  return <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16"><article className="mx-auto max-w-6xl">
    <nav className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground"><Link to="/">Front page</Link><span className="mx-2">/</span><Link to="/property">Property</Link><span className="mx-2">/</span><Link to="/property-tax-calculators">Property tax</Link><span className="mx-2">/</span>{latest.name}</nav>
    <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-end"><div><p className="eyebrow text-primary">{latest.type === 'city' ? 'Municipal taxing unit' : latest.type.replaceAll('-', ' ')}</p><h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{latest.name} property tax rate</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">Comptroller tax-rate history, with local records labeled. This is {latest.type === 'city' ? 'city tax only' : 'one jurisdiction’s tax only'}. Combine only taxes actually levied on your parcel.</p></div><dl className="border-l border-border pl-6 text-sm"><Fact label="Latest finalized year" value={String(latest.year)}/><Fact label={latest.type === 'city' ? 'Latest municipal rate' : 'Latest unit rate'} value={latest.totalRate == null ? 'Not reported / withheld from calculation' : `${latest.totalRate.toFixed(6)} per $100`}/><Fact label="Years with verified rates" value={`${rateCount} of ${history.length}`}/></dl></header>

    {latest.rateUnavailable ? <section className="border-b border-border py-7"><p className="max-w-3xl text-sm leading-6 text-muted-foreground"><strong className="text-foreground">Rate not used for calculation.</strong> {statusMessage(latest.sourceStatus)} TexasDefined keeps the taxing-unit reference visible for research but does not substitute an unverified numeric rate.</p></section> : null}

    <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]"><div><p className="eyebrow text-primary">Latest rate</p><h2 className="mt-2 font-display text-3xl">What the reported rate contains</h2></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><RateFact label="Total rate" value={latest.totalRate}/><RateFact label="Operations (M&O)" value={latest.maintenanceOperationsRate}/><RateFact label="Debt service (I&S)" value={latest.debtServiceRate}/><div className="border-t border-border pt-3"><span className="text-xs uppercase tracking-[.12em] text-muted-foreground">Change since {first?.year ?? latest.year}</span><strong className="mt-1 block font-display text-2xl">{rateChange == null ? 'Not comparable' : `${rateChange >= 0 ? '+' : ''}${rateChange.toFixed(6)}`}</strong><span className="text-xs text-muted-foreground">per $100 of taxable value</span></div></div></section>

    <section className="border-b border-border py-10"><p className="eyebrow text-primary">Counties associated with this taxing unit</p><h2 className="mt-2 font-display text-3xl">Local county context</h2><div className="mt-5 flex flex-wrap gap-3">{countyLinks.map(({slug,name}) => <a key={slug} href={`/property-tax/county/${slug}`} className="border border-border px-4 py-2 text-sm font-semibold hover:border-primary">{name}</a>)}</div><p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">County association narrows the geography but does not prove that every parcel in the county belongs to this taxing unit. Verify the exact account before combining rates.</p></section>

    <section className="border-b border-border py-10">
      <p className="eyebrow text-primary">Rate history</p>
      <h2 className="mt-2 font-display text-3xl">Annual tax rates, with source distinctions</h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">Rates are per $100 of taxable value. Locally verified rates are labeled. Missing M&amp;O or debt components are not zero. Reported levy is not actual tax collection.</p>
      <div className="mt-6 space-y-3" aria-label="Historical taxing-unit rates visualized by year">
        {displayHistory.map((record) => <div key={record.id} className="grid grid-cols-[3.5rem_minmax(0,1fr)_6rem] items-center gap-3 text-sm">
          <span className="font-semibold">{record.year}</span>
          <div className="h-4 overflow-hidden rounded-sm bg-muted" role="img" aria-label={record.displayTotalRate == null ? `${record.year}: rate unavailable` : `${record.year}: ${record.displayTotalRate.toFixed(6)} dollars per 100 dollars of taxable value`}>
            {record.displayTotalRate != null ? <div className="h-full bg-primary" style={{ width: `${(record.displayTotalRate / chartMaximum) * 100}%` }} /> : null}
          </div>
          <span className="text-right tabular-nums">{record.displayTotalRate?.toFixed(6) ?? 'Unavailable'}</span>
        </div>)}
      </div>
      <div className="mt-6 overflow-x-auto"><table className="w-full min-w-[42rem] text-left text-sm">
        <thead><tr className="border-b border-border"><th className="py-3">Year</th><th>Total / $100</th><th>Operations (M&amp;O)</th><th>Debt service (I&amp;S)</th><th>Status / source</th><th>Reported levy</th></tr></thead>
        <tbody>{[...displayHistory].reverse().map((record) => <tr key={record.id} className="border-b border-border">
          <td className="py-3 font-semibold">{record.year}</td>
          <td className="tabular-nums">{record.displayTotalRate?.toFixed(6) ?? '—'}</td>
          <td className="tabular-nums">{record.displayOperationsRate?.toFixed(6) ?? '—'}</td>
          <td className="tabular-nums">{record.displayDebtRate?.toFixed(6) ?? '—'}</td>
          <td>{record.localSourceUrl ? <><span>Locally verified; absent from statewide file. </span><a className="font-semibold text-primary underline underline-offset-2" href={record.localSourceUrl} target="_blank" rel="noopener noreferrer">Starr CAD report, p. 16 ↗</a><span> · </span><a className="font-semibold text-primary underline underline-offset-2" href={STARR_CAD_2024_COMPONENTS_URL} target="_blank" rel="noopener noreferrer">2024 M&amp;O and I&amp;S ↗</a></> : record.totalRate != null && (record.maintenanceOperationsRate == null || record.debtServiceRate == null) ? 'Finalized total; components unavailable' : statusLabel(record.sourceStatus, record.variableRate)}</td>
          <td>{record.levy != null ? money(record.levy) : '—'}</td>
        </tr>)}</tbody></table></div>
      {latest.slug === 'escobares' && latest.type === 'city' ? <p className="mt-4 text-sm leading-6 text-muted-foreground">The Comptroller did not report Escobares’ 2024 rate. Starr CAD confirms a 2024 total of 0.340447, comprising 0.263594 for M&amp;O and 0.076853 for debt service. These local figures are attributed separately and do not modify statewide records or calculator inputs.</p> : null}
    </section>

    <section className="grid gap-6 border-b border-border py-10 md:grid-cols-3"><a href="/texas-property-tax-estimator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Property-tax estimator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Combine this rate with the other taxing units serving a parcel.</span></a><a href="/texas-property-tax-rate-history" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Rate history explorer</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Search and compare another Texas taxing unit.</span></a><a href="/texas-property-tax-bill-breakdown" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Bill breakdown</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">See the share attributable to every selected taxing unit.</span></a></section>

    <section className="pt-8 text-sm leading-6 text-muted-foreground"><p><strong className="text-foreground">Sources and methodology:</strong> Texas Comptroller Tax Rates and Levies, plus individually labeled local sources. Rates are per $100 taxable. Parcel jurisdiction and exemptions vary; levy is not collected revenue. Missing or conflicting state rates are excluded from calculators.</p><div className="mt-3 flex flex-wrap gap-x-6 gap-y-3"><a href={latest.sourceUrl} target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">Latest Comptroller source workbook ↗</a>{latest.slug === 'escobares' && latest.type === 'city' ? <><a href="https://starrcad.org/" target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">Starr Central Appraisal District ↗</a><a href={STARR_CAD_REPORT_URL} target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">Starr CAD 2025 Annual Report ↗</a><a href={STARR_CAD_2024_COMPONENTS_URL} target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">Escobares 2024 tax-rate breakdown ↗</a></> : null}</div></section>
  </article></Container>;
}

function statusLabel(status:string,variable:boolean){if(status==='cross-source-conflict')return 'Conflicting state records — verify locally';if(status==='not-reported')return 'Not reported';if(variable)return 'Variable rate — verify parcel';if(status==='partial-reporting')return 'Partially reported';return 'Finalized rate'}
function statusMessage(status:string){if(status==='not-reported')return 'The Comptroller workbook marks this taxing unit as not having supplied the requested rate.';if(status==='cross-source-conflict')return 'The reported figure conflicts with a separate authoritative state source and requires local verification.';if(status==='partial-reporting')return 'Only part of the statewide reporting set supplied a usable rate.';return 'The statewide rate record requires verification.'}
function Fact({label,value}:{label:string;value:string}){return <div className="mb-4"><dt className="text-muted-foreground">{label}</dt><dd className="font-semibold text-foreground">{value}</dd></div>}
function RateFact({label,value}:{label:string;value:number|null}){return <div className="border-t border-border pt-3"><span className="text-xs uppercase tracking-[.12em] text-muted-foreground">{label}</span><strong className="mt-1 block font-display text-2xl">{value == null ? 'Not separately reported' : value.toFixed(6)}</strong>{value != null ? <span className="text-xs text-muted-foreground">per $100</span> : null}</div>}
function title(value:string){return value.replaceAll('-',' ').replace(/\b\w/g,(char)=>char.toUpperCase())}
function money(value:number){return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(value)}
