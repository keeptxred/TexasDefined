import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { Container } from '@/components/layout/Container';
import { getTaxingUnitRateHistory } from '@/data/property/texas-tax-rates.functions';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

type SupplementalRate = {
  maintenanceOperationsRate: number;
  debtServiceRate: number;
  noNewRevenueRate: number;
  voterApprovalRate: number;
  sourceUrl: string;
  sourceLabel: string;
};

const SUPPLEMENTAL_RATES: Record<string, Record<number, SupplementalRate>> = {
  'san-juan': {
    2021: { maintenanceOperationsRate: 0.530245, debtServiceRate: 0.157355, noNewRevenueRate: 0.650911, voterApprovalRate: 0.692821, sourceUrl: 'https://www.hidalgocounty.us/DocumentCenter/View/71298/5yrsummary2021_2025upd', sourceLabel: 'Hidalgo County Truth in Taxation Summary' },
    2022: { maintenanceOperationsRate: 0.503300, debtServiceRate: 0.173200, noNewRevenueRate: 0.618300, voterApprovalRate: 0.676500, sourceUrl: 'https://www.hidalgocounty.us/DocumentCenter/View/71298/5yrsummary2021_2025upd', sourceLabel: 'Hidalgo County Truth in Taxation Summary' },
    2023: { maintenanceOperationsRate: 0.466400, debtServiceRate: 0.210100, noNewRevenueRate: 0.589400, voterApprovalRate: 0.676600, sourceUrl: 'https://www.hidalgocounty.us/DocumentCenter/View/71298/5yrsummary2021_2025upd', sourceLabel: 'Hidalgo County Truth in Taxation Summary' },
    2024: { maintenanceOperationsRate: 0.460800, debtServiceRate: 0.215700, noNewRevenueRate: 0.633100, voterApprovalRate: 0.677500, sourceUrl: 'https://www.hidalgocounty.us/DocumentCenter/View/71298/5yrsummary2021_2025upd', sourceLabel: 'Hidalgo County Truth in Taxation Summary' },
    2025: { maintenanceOperationsRate: 0.444100, debtServiceRate: 0.232400, noNewRevenueRate: 0.619100, voterApprovalRate: 0.676500, sourceUrl: 'https://www.hidalgocounty.us/DocumentCenter/View/71298/5yrsummary2021_2025upd', sourceLabel: 'Hidalgo County Truth in Taxation Summary' },
  },
};

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
    const displayName = latest.type === 'city' ? `${latest.name}, Texas` : latest.name;
    const description = `${displayName} property-tax rate history, latest finalized rate, maintenance-and-operations and debt-service components when reported, counties served and official source links.`;
    const indexable = history.length >= 3;
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: `${displayName} Property Tax Rate & History`,
        description,
        robots: indexable ? undefined : 'noindex, follow, max-image-preview:large',
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        '@context': 'https://schema.org',
        '@type': 'Dataset',
        '@id': `${pageUrl}#dataset`,
        name: `${displayName} property-tax rate history`,
        description,
        url: pageUrl,
        temporalCoverage: `${history[0]?.year}/${history.at(-1)?.year}`,
        creator: { '@type': 'Organization', name: 'Texas Comptroller of Public Accounts' },
        publisher: { '@type': 'Organization', name: 'Texas Defined' },
        variableMeasured: ['Total property-tax rate', 'Maintenance and operations rate', 'Debt-service / I&S rate', 'Reported levy'],
      })],
    };
  },
  component: Page,
});

function Page() {
  const { latest, history } = Route.useLoaderData();
  const enrichedHistory = history.map((record) => {
    const supplemental = SUPPLEMENTAL_RATES[record.slug]?.[record.year];
    return supplemental ? {
      ...record,
      maintenanceOperationsRate: supplemental.maintenanceOperationsRate,
      debtServiceRate: supplemental.debtServiceRate,
    } : record;
  });
  const current = enrichedHistory.at(-1)!;
  const first = enrichedHistory[0];
  const supplemental = SUPPLEMENTAL_RATES[current.slug]?.[current.year];
  const rateChange = current.totalRate != null && first?.totalRate != null ? current.totalRate - first.totalRate : null;
  const percentChange = rateChange != null && first?.totalRate ? (rateChange / first.totalRate) * 100 : null;
  const countyLinks = current.countySlugs.map((slug) => ({ slug, name: title(slug) + ' County' }));
  const displayName = current.type === 'city' ? `${current.name}, Texas` : current.name;
  const exampleTaxableValue = 250000;
  const exampleTax = current.totalRate == null ? null : exampleTaxableValue * current.totalRate / 100;
  const maxRate = Math.max(...enrichedHistory.map((record) => record.totalRate ?? 0), 0.000001);
  const local = current.slug === 'san-juan' ? {
    cityUrl: 'https://www.sjtx.us/',
    appraisalUrl: 'https://www.hidalgoad.org/',
    taxOfficeUrl: 'https://www.hidalgocounty.us/124/Tax-Office',
  } : null;

  return <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16"><article className="mx-auto max-w-6xl">
    <nav className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground"><Link to="/">Front page</Link><span className="mx-2">/</span><Link to="/property">Property</Link><span className="mx-2">/</span><Link to="/property-tax-calculators">Property tax</Link><span className="mx-2">/</span>{current.name}</nav>

    <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-end"><div><p className="eyebrow text-primary">{current.type.replaceAll('-', ' ')}</p><h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{displayName} property tax rate</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">The {current.year} finalized rate is {current.totalRate == null ? 'not currently available for calculation' : `$${current.totalRate.toFixed(4)} per $100 of taxable value, or about ${current.totalRate.toFixed(4)}%`}. This is the rate for this taxing unit only — a property can also be taxed by a county, school district and other local districts.</p></div><dl className="border-l border-border pl-6 text-sm"><Fact label="Latest finalized year" value={String(current.year)}/><Fact label="Latest total rate" value={current.totalRate == null ? 'Not reported / withheld from calculation' : `${current.totalRate.toFixed(6)} / $100`}/><Fact label="Years retained" value={String(enrichedHistory.length)}/></dl></header>

    {current.rateUnavailable ? <section className="border-b border-border py-7"><p className="max-w-3xl text-sm leading-6 text-muted-foreground"><strong className="text-foreground">Rate not used for calculation.</strong> {statusMessage(current.sourceStatus)} Texas Defined keeps the taxing-unit reference visible for research but does not substitute an unverified numeric rate.</p></section> : null}

    <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]"><div><p className="eyebrow text-primary">Latest rate</p><h2 className="mt-2 font-display text-3xl">What the rate contains</h2></div><div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><RateFact label="Total rate" value={current.totalRate}/><RateFact label="Operations (M&O)" value={current.maintenanceOperationsRate}/><RateFact label="Debt service (I&S)" value={current.debtServiceRate}/><div className="border-t border-border pt-3"><span className="text-xs uppercase tracking-[.12em] text-muted-foreground">Change since {first?.year ?? current.year}</span><strong className="mt-1 block font-display text-2xl">{rateChange == null ? 'Not comparable' : `${percentChange == null ? '' : `${percentChange >= 0 ? '+' : ''}${percentChange.toFixed(1)}%`}`}</strong>{rateChange != null ? <span className="text-xs text-muted-foreground">{rateChange >= 0 ? '+' : ''}{rateChange.toFixed(6)} rate points</span> : null}</div></div><div className="mt-6 grid gap-5 text-sm leading-6 text-muted-foreground sm:grid-cols-2"><p><strong className="text-foreground">M&O</strong> means maintenance and operations. It funds the taxing unit's day-to-day services and operating costs.</p><p><strong className="text-foreground">I&S</strong> means interest and sinking, commonly described as debt service. It is the portion used to repay eligible debt obligations.</p></div></div></section>

    {exampleTax != null ? <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]"><div><p className="eyebrow text-primary">Example</p><h2 className="mt-2 font-display text-3xl">What that rate means in dollars</h2></div><div><p className="max-w-3xl text-lg leading-8">At a taxable value of <strong>{money(exampleTaxableValue)}</strong>, this taxing unit's {current.year} rate would produce about <strong>{money(exampleTax)}</strong> in annual tax before considering any special circumstances.</p><p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">That is not a complete property-tax bill. The final bill depends on the property's taxable value, exemptions and every taxing unit that actually serves the parcel.</p><a href="/texas-property-tax-estimator" className="mt-5 inline-block font-semibold text-primary underline decoration-primary/40 underline-offset-4">Estimate a combined property-tax bill →</a></div></section> : null}

    {supplemental ? <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]"><div><p className="eyebrow text-primary">Tax-rate context</p><h2 className="mt-2 font-display text-3xl">Benchmarks for {current.year}</h2></div><div><div className="grid gap-4 sm:grid-cols-2"><RateFact label="No-new-revenue rate" value={supplemental.noNewRevenueRate}/><RateFact label="Voter-approval rate" value={supplemental.voterApprovalRate}/></div><p className="mt-5 max-w-3xl text-sm leading-6 text-muted-foreground">The no-new-revenue rate is a statutory comparison rate intended to show the rate that would generate roughly the same property-tax revenue from the same properties as the prior year, subject to Texas law. The voter-approval rate is another statutory benchmark used in the tax-rate adoption process; it is not the adopted rate itself.</p><a href={supplemental.sourceUrl} target="_blank" rel="noreferrer noopener" className="mt-4 inline-block font-semibold text-primary underline decoration-primary/40 underline-offset-4">Open {supplemental.sourceLabel} ↗</a></div></section> : null}

    <section className="border-b border-border py-10"><p className="eyebrow text-primary">Rate history</p><h2 className="mt-2 font-display text-3xl">How the rate has changed</h2><div className="mt-7 space-y-4">{enrichedHistory.map((record) => <div key={`chart-${record.id}`} className="grid grid-cols-[4rem_1fr_6rem] items-center gap-3 text-sm"><span className="font-semibold">{record.year}</span><div className="h-3 bg-muted"><div className="h-3 bg-primary" style={{ width: `${((record.totalRate ?? 0) / maxRate) * 100}%` }}/></div><span className="text-right tabular-nums">{record.totalRate?.toFixed(4) ?? '—'}</span></div>)}</div><div className="mt-8 overflow-x-auto"><table className="w-full min-w-[46rem] text-left text-sm"><thead><tr className="border-b border-border"><th className="py-3">Year</th><th>Total rate</th><th>Operations (M&O)</th><th>Debt service (I&S)</th><th>Status</th><th>Reported levy</th></tr></thead><tbody>{[...enrichedHistory].reverse().map((record) => <tr key={record.id} className="border-b border-border"><td className="py-3 font-semibold">{record.year}</td><td>{record.totalRate?.toFixed(6) ?? '—'}</td><td>{record.maintenanceOperationsRate?.toFixed(6) ?? 'Not separately reported'}</td><td>{record.debtServiceRate?.toFixed(6) ?? 'Not separately reported'}</td><td>{statusLabel(record.sourceStatus, record.variableRate)}</td><td>{record.levy != null ? money(record.levy) : '—'}</td></tr>)}</tbody></table></div><p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground"><strong className="text-foreground">Reported levy</strong> means the taxing unit's aggregate property-tax levy reported in the source data. It is not an individual homeowner's bill.</p></section>

    <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]"><div><p className="eyebrow text-primary">Your bill</p><h2 className="mt-2 font-display text-3xl">Why the bill can rise even if the rate does not</h2></div><div className="grid gap-5 text-sm leading-6 text-muted-foreground sm:grid-cols-2"><p><strong className="text-foreground">Taxable value can change.</strong> A higher appraisal or a change in the value remaining after exemptions can increase the tax due even when the adopted rate stays flat.</p><p><strong className="text-foreground">Overlapping districts matter.</strong> The city or district shown here is only one possible line on a bill. School, county, college, hospital, drainage, utility and other districts can each have their own rates.</p><p><strong className="text-foreground">Exemptions matter.</strong> Homestead, over-65, disability and other exemptions may reduce taxable value differently across taxing units.</p><p><strong className="text-foreground">Parcel membership matters.</strong> County association alone does not prove a parcel belongs to every taxing unit listed for that county. Verify the actual property account before adding rates together.</p></div></section>

    <section className="border-b border-border py-10"><p className="eyebrow text-primary">Local records</p><h2 className="mt-2 font-display text-3xl">Verify the taxing unit and your property</h2><div className="mt-5 flex flex-wrap gap-3">{countyLinks.map(({slug,name}) => <a key={slug} href={`/property-tax/county/${slug}`} className="border border-border px-4 py-2 text-sm font-semibold hover:border-primary">{name} tax context</a>)}{local ? <><a href={local.cityUrl} target="_blank" rel="noreferrer noopener" className="border border-border px-4 py-2 text-sm font-semibold hover:border-primary">City of San Juan ↗</a><a href={local.appraisalUrl} target="_blank" rel="noreferrer noopener" className="border border-border px-4 py-2 text-sm font-semibold hover:border-primary">Hidalgo County Appraisal District ↗</a><a href={local.taxOfficeUrl} target="_blank" rel="noreferrer noopener" className="border border-border px-4 py-2 text-sm font-semibold hover:border-primary">Hidalgo County Tax Office ↗</a></> : null}</div><p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">Use the appraisal district or tax office account lookup to confirm taxable value, exemptions and the exact taxing units attached to a specific property.</p></section>

    <section className="grid gap-6 border-b border-border py-10 md:grid-cols-3"><a href="/texas-property-tax-estimator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Property-tax estimator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Combine this rate with the other taxing units serving a parcel.</span></a><a href="/texas-property-tax-rate-history" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Rate history explorer</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Search and compare another Texas taxing unit.</span></a><a href="/texas-property-tax-bill-breakdown" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Bill breakdown</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">See the share attributable to every selected taxing unit.</span></a></section>

    <section className="pt-8 text-sm leading-6 text-muted-foreground"><p><strong className="text-foreground">Primary statewide source:</strong> Texas Comptroller of Public Accounts, Property Tax Assistance Division, Tax Rates and Levies. Rates are dollars per $100 of taxable value. Texas Defined retains annual statewide files for historical comparison. Where a verified local Truth in Taxation source provides a more complete component breakdown, that local source is identified on the page.</p><a href={current.sourceUrl} target="_blank" rel="noreferrer noopener" className="mt-3 inline-block font-semibold text-primary underline decoration-primary/40 underline-offset-4">Open the official statewide source workbook ↗</a></section>
  </article></Container>;
}

function statusLabel(status:string,variable:boolean){if(status==='cross-source-conflict')return 'Conflicting state records — verify locally';if(status==='not-reported')return 'Not reported';if(variable)return 'Variable rate — verify parcel';if(status==='partial-reporting')return 'Partially reported';return 'Finalized rate'}
function statusMessage(status:string){if(status==='not-reported')return 'The Comptroller workbook marks this taxing unit as not having supplied the requested rate.';if(status==='cross-source-conflict')return 'The reported figure conflicts with a separate authoritative state source and requires local verification.';if(status==='partial-reporting')return 'Only part of the statewide reporting set supplied a usable rate.';return 'The statewide rate record requires verification.'}
function Fact({label,value}:{label:string;value:string}){return <div className="mb-4"><dt className="text-muted-foreground">{label}</dt><dd className="font-semibold text-foreground">{value}</dd></div>}
function RateFact({label,value}:{label:string;value:number|null}){return <div className="border-t border-border pt-3"><span className="text-xs uppercase tracking-[.12em] text-muted-foreground">{label}</span><strong className="mt-1 block font-display text-2xl">{value == null ? 'Not separately reported' : value.toFixed(6)}</strong>{value != null ? <span className="text-xs text-muted-foreground">per $100</span> : null}</div>}
function title(value:string){return value.replaceAll('-',' ').replace(/\b\w/g,(char)=>char.toUpperCase())}
function money(value:number){return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(value)}
