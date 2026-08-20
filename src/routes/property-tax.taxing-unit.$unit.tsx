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
    const description = `${latest.name} property-tax rate history, latest finalized rate, M&O and debt-service components when reported, counties served and official Texas Comptroller source.`;
    const indexable = history.length >= 3;
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
  const first = history[0];
  const rateChange = latest.totalRate - first.totalRate;
  const countyLinks = latest.countySlugs.map((slug) => ({ slug, name: title(slug) + ' County' }));

  return <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16"><article className="mx-auto max-w-6xl">
    <nav className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground"><Link to="/">Front page</Link><span className="mx-2">/</span><Link to="/property">Property</Link><span className="mx-2">/</span><Link to="/property-tax-calculators">Property tax</Link><span className="mx-2">/</span>{latest.name}</nav>
    <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-end"><div><p className="eyebrow text-primary">{latest.type.replaceAll('-', ' ')}</p><h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{latest.name} property tax rate</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">Finalized annual property-tax rate history reported through the Texas Comptroller statewide Tax Rates and Levies files. Parcel membership, taxable value and exemptions still determine whether and how this rate applies to a particular property.</p></div><dl className="border-l border-border pl-6 text-sm"><Fact label="Latest finalized year" value={String(latest.year)}/><Fact label="Latest total rate" value={`${latest.totalRate.toFixed(6)} / $100`}/><Fact label="Years retained" value={String(history.length)}/></dl></header>

    <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]"><div><p className="eyebrow text-primary">Latest rate</p><h2 className="mt-2 font-display text-3xl">What the reported rate contains</h2></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><RateFact label="Total rate" value={latest.totalRate}/><RateFact label="M&O" value={latest.maintenanceOperationsRate}/><RateFact label="Debt / I&S" value={latest.debtServiceRate}/><div className="border-t border-border pt-3"><span className="text-xs uppercase tracking-[.12em] text-muted-foreground">Change since {first.year}</span><strong className="mt-1 block font-display text-2xl">{rateChange >= 0 ? '+' : ''}{rateChange.toFixed(6)}</strong></div></div></section>

    <section className="border-b border-border py-10"><p className="eyebrow text-primary">Counties associated with this taxing unit</p><h2 className="mt-2 font-display text-3xl">Local county context</h2><div className="mt-5 flex flex-wrap gap-3">{countyLinks.map(({slug,name}) => <a key={slug} href={`/property-tax/county/${slug}`} className="border border-border px-4 py-2 text-sm font-semibold hover:border-primary">{name}</a>)}</div><p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">County association narrows the geography but does not prove that every parcel in the county belongs to this taxing unit. Verify the exact account before combining rates.</p></section>

    <section className="border-b border-border py-10"><p className="eyebrow text-primary">Rate history</p><h2 className="mt-2 font-display text-3xl">Finalized statewide records</h2><div className="mt-6 overflow-x-auto"><table className="w-full min-w-[42rem] text-left text-sm"><thead><tr className="border-b border-border"><th className="py-3">Year</th><th>Total rate</th><th>M&O</th><th>Debt / I&S</th><th>Reported levy</th></tr></thead><tbody>{[...history].reverse().map((record) => <tr key={record.id} className="border-b border-border"><td className="py-3 font-semibold">{record.year}</td><td>{record.totalRate.toFixed(6)}</td><td>{record.maintenanceOperationsRate?.toFixed(6) ?? '—'}</td><td>{record.debtServiceRate?.toFixed(6) ?? '—'}</td><td>{record.levy != null ? money(record.levy) : '—'}</td></tr>)}</tbody></table></div></section>

    <section className="grid gap-6 border-b border-border py-10 md:grid-cols-3"><a href="/texas-property-tax-estimator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Property-tax estimator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Combine this rate with the other taxing units serving a parcel.</span></a><a href="/texas-property-tax-rate-history" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Rate history explorer</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Search and compare another Texas taxing unit.</span></a><a href="/texas-property-tax-bill-breakdown" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Bill breakdown</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">See the share attributable to every selected taxing unit.</span></a></section>

    <section className="pt-8 text-sm leading-6 text-muted-foreground"><p><strong className="text-foreground">Source:</strong> Texas Comptroller of Public Accounts, Property Tax Assistance Division, Tax Rates and Levies. Rates are dollars per $100 of taxable value. TexasDefined retains annual statewide files for historical comparison.</p><a href={latest.sourceUrl} target="_blank" rel="noreferrer noopener" className="mt-3 inline-block font-semibold text-primary underline decoration-primary/40 underline-offset-4">Open the official source workbook ↗</a></section>
  </article></Container>;
}

function Fact({label,value}:{label:string;value:string}){return <div className="mb-4"><dt className="text-muted-foreground">{label}</dt><dd className="font-semibold text-foreground">{value}</dd></div>}
function RateFact({label,value}:{label:string;value:number|null}){return <div className="border-t border-border pt-3"><span className="text-xs uppercase tracking-[.12em] text-muted-foreground">{label}</span><strong className="mt-1 block font-display text-2xl">{value == null ? 'Not separately reported' : value.toFixed(6)}</strong>{value != null ? <span className="text-xs text-muted-foreground">per $100</span> : null}</div>}
function title(value:string){return value.replaceAll('-',' ').replace(/\b\w/g,(char)=>char.toUpperCase())}
function money(value:number){return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(value)}
