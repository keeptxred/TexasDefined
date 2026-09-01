import { createFileRoute, Link } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { CitationTrustPanel } from '@/components/authority/CitationTrustPanel';
import { Container } from '@/components/layout/Container';
import { MAJOR_COUNTY_PROPERTY_TAX_CALCULATORS, countyPropertyTaxCalculatorTarget } from '@/data/property/county-calculator-targets';
import { COUNTY_PROPERTY_RECORDS } from '@/data/property/county-property-data';
import { isCountyPropertyIndexReady } from '@/data/property/county-property-schema';
import { formatDatasetValue, getTexasDataset } from '@/data/texas-data-center';
import { TEXAS_COUNTIES } from '@/data/texas-places';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/property-tax/counties';
const description = 'Compare selected adopted county government property-tax rates, browse verified county property-tax guides, and move from any Texas county into a parcel-specific official-rate calculator.';
const verifiedPropertyCounties = COUNTY_PROPERTY_RECORDS.filter(isCountyPropertyIndexReady);
const verifiedPropertySlugs = new Set(verifiedPropertyCounties.map((county) => county.slug));
const popularCountySlugs = ['comal', 'travis', 'denton', 'bexar', 'harris', 'waller', 'coryell', 'polk', 'lubbock'];
const popularCounties = popularCountySlugs.map((slug) => TEXAS_COUNTIES.find((county) => county.slug === slug)).filter((county): county is (typeof TEXAS_COUNTIES)[number] => Boolean(county));

export const Route = createFileRoute('/property-tax/counties')({
  loader: () => getTexasDataset('county-property-tax-rates'),
  head: ({ loaderData: countyRateDataset }) => {
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    const siteUrl = absoluteUrl(texasDefinedBrand, '/');
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Texas Property Tax by County | Guides & Calculators', description }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          { '@type': 'CollectionPage', '@id': `${pageUrl}#page`, url: pageUrl, name: 'Texas Property Tax by County', description, isPartOf: { '@id': `${siteUrl}#website` }, mainEntity: { '@id': `${pageUrl}#counties` }, breadcrumb: { '@id': `${pageUrl}#breadcrumb` } },
          {
            '@type': 'ItemList', '@id': `${pageUrl}#counties`, numberOfItems: verifiedPropertyCounties.length,
            itemListElement: verifiedPropertyCounties.map((county, index) => ({ '@type': 'ListItem', position: index + 1, name: county.name, url: absoluteUrl(texasDefinedBrand, `/property-tax/county/${county.slug}`) })),
          },
          ...(countyRateDataset ? [{
            '@type': 'Dataset',
            '@id': `${pageUrl}#county-rate-examples`,
            name: countyRateDataset.title,
            description: countyRateDataset.description,
            dateModified: countyRateDataset.updated,
            temporalCoverage: String(countyRateDataset.year),
            isBasedOn: countyRateDataset.sourceUrl,
            measurementTechnique: countyRateDataset.methodology,
            variableMeasured: countyRateDataset.rows.map((row) => ({ '@type': 'PropertyValue', name: row.label, value: row.value, unitText: 'percent' })),
          }] : []),
          {
            '@type': 'BreadcrumbList', '@id': `${pageUrl}#breadcrumb`,
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
              { '@type': 'ListItem', position: 2, name: 'Money & Property', item: absoluteUrl(texasDefinedBrand, '/decide/financial-tools') },
              { '@type': 'ListItem', position: 3, name: 'County property-tax guides', item: pageUrl },
            ],
          },
        ],
      })],
    };
  },
  component: CountyPropertyTaxDirectory,
});

function CountyPropertyTaxDirectory() {
  const countyRateDataset = Route.useLoaderData();

  return (
    <>
      <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground"><Link to="/">Front page</Link><span aria-hidden="true" className="mx-2">/</span><Link to="/decide/financial-tools">Money & Property</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page" className="text-foreground">County property-tax guides</span></nav>
        <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div>
            <p className="eyebrow text-primary">Verified local tax resources</p>
            <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Texas property tax by county</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">Compare selected adopted county government rates, open verified county property-tax guides, and move from any of Texas' 254 counties into an official-rate calculator with the county already selected when a dedicated local calculator is not available.</p>
          </div>
          <p className="border-l border-border pl-6 text-sm leading-6 text-muted-foreground">Texas does not have one statewide property-tax rate. A county government rate is only one layer; school, city and special-district rates can be much larger parts of the combined bill.</p>
        </header>

        {countyRateDataset ? <section className="border-b border-border py-10" aria-labelledby="county-rate-comparison">
          <p className="eyebrow text-primary">Selected adopted rates</p>
          <h2 id="county-rate-comparison" className="mt-2 font-display text-4xl">County government rate examples</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">This is a source-backed comparison of selected county government rates from the dataset below. It is not a ranking of total property-tax burden and it does not treat missing counties as zero.</p>
          <div className="mt-6 overflow-x-auto border-y border-border">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead><tr className="border-b border-border bg-surface text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground"><th className="px-4 py-3">County</th><th className="px-4 py-3">County government rate</th><th className="px-4 py-3">Coverage year</th><th className="px-4 py-3">Local reference</th></tr></thead>
              <tbody className="divide-y divide-border">{countyRateDataset.rows.map((row) => {
                const slug = row.label.replace(/ County$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                const verified = verifiedPropertySlugs.has(slug);
                return <tr key={row.label}><td className="px-4 py-4 font-semibold">{row.label}</td><td className="px-4 py-4 tabular-nums">{formatDatasetValue(row.value, countyRateDataset.unit)}</td><td className="px-4 py-4">{countyRateDataset.year}</td><td className="px-4 py-4">{verified ? <Link to="/property-tax/county/$county" params={{ county: slug }} className="font-semibold text-primary hover:underline">Verified tax guide →</Link> : <Link to="/county/$slug" params={{ slug }} className="font-semibold text-primary hover:underline">County guide →</Link>}</td></tr>;
              })}</tbody>
            </table>
          </div>
          <p className="mt-4 text-sm font-semibold"><Link to="/texas-data/$datasetSlug" params={{ datasetSlug: countyRateDataset.slug }} className="text-primary underline underline-offset-4">Open the full data brief and methodology →</Link></p>
        </section> : null}

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div><p className="eyebrow text-primary">How to use these guides</p><h2 className="mt-2 font-display text-4xl">Start with the county, finish with the parcel</h2><div className="mt-5 space-y-4 text-base leading-8 text-muted-foreground"><p>A verified property-tax guide is the fastest way to find the correct appraisal district, tax office, exemption resources and payment starting points. Where local tax-office verification is still pending, use the broader county guide rather than an incomplete property-tax page.</p><p>The calculator flow is separate from guide indexability. Every county can open the official-rate estimator, but only source-verified county tax guides and the governed major-county calculator pages are promoted as standalone search destinations.</p></div><div className="mt-6 flex flex-wrap gap-5 text-sm font-semibold"><Link to="/learn/property-taxes" className="text-primary underline decoration-primary/40 underline-offset-4">How Texas property taxes work →</Link><Link to="/learn/appraisal-districts" className="text-primary underline decoration-primary/40 underline-offset-4">Texas appraisal-district directory →</Link><Link to="/property-tax-calculators" className="text-primary underline decoration-primary/40 underline-offset-4">Property-tax calculators →</Link><Link to="/do/homestead-exemption" className="text-primary underline decoration-primary/40 underline-offset-4">Homestead exemption guide →</Link></div></div>
          <aside className="border-l border-border pl-6"><p className="eyebrow text-muted-foreground">Popular counties</p><div className="mt-4 flex flex-col gap-3">{popularCounties.map((county) => verifiedPropertySlugs.has(county.slug) ? <Link key={county.code} to="/property-tax/county/$county" params={{ county: county.slug }} className="font-display text-xl hover:text-primary">{county.name} tax guide →</Link> : <Link key={county.code} to="/county/$slug" params={{ slug: county.slug }} className="font-display text-xl hover:text-primary">{county.name} guide →</Link>)}</div></aside>
        </section>

        <section className="border-b border-border py-10" aria-labelledby="major-county-calculators">
          <p className="eyebrow text-primary">Major-county calculators</p>
          <h2 id="major-county-calculators" className="mt-2 font-display text-4xl">Dedicated property-tax calculators for 12 major Texas counties</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">These pages preselect the county but still require the actual school district, municipality and applicable special districts. They do not publish a fake countywide combined rate.</p>
          <div className="mt-7 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {MAJOR_COUNTY_PROPERTY_TAX_CALCULATORS.map((item) => (
              <a key={item.countySlug} href={item.calculatorPath} className="group bg-background p-5">
                <strong className="font-display text-2xl group-hover:text-primary">{item.countyName}</strong>
                <span className="mt-2 block text-sm leading-6 text-muted-foreground">Official local-rate calculator →</span>
              </a>
            ))}
          </div>
        </section>

        <section className="border-b border-border py-10">
          <div className="border-b border-border pb-4"><p className="eyebrow text-primary">Verified county property-tax guides</p><h2 className="mt-2 font-display text-4xl">Local appraisal and tax-office sources checked</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">These guides have a current verification date and at least two distinct local property-tax sources. The list expands as the statewide verification job confirms additional counties.</p></div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3">
            {verifiedPropertyCounties.map((county, index) => (
              <li key={county.code} className={`border-b border-border ${index % 3 !== 0 ? 'lg:border-l lg:border-border' : ''}`}>
                <Link to="/property-tax/county/$county" params={{ county: county.slug }} className="group block h-full py-5 sm:px-4">
                  <span className="text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">Verified {county.lastVerifiedAt}</span>
                  <strong className="mt-1 block font-display text-xl leading-tight group-hover:text-primary">{county.name} property taxes</strong>
                  <span className="mt-3 block text-sm font-semibold">Appraisal, exemptions & payments →</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="py-10">
          <div className="border-b border-border pb-4"><p className="eyebrow text-primary">All 254 counties</p><h2 className="mt-2 font-display text-4xl">Browse county references and open a calculator</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Counties without a verified local property-tax guide still link to their substantive county reference page. Every county also gets a calculator path: a dedicated major-county page where available, otherwise the statewide estimator with that county preselected.</p></div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
            {TEXAS_COUNTIES.map((county, index) => {
              const calculatorTarget = countyPropertyTaxCalculatorTarget(county.slug);
              return (
                <li key={county.code} className={`border-b border-border ${index % 4 !== 0 ? 'lg:border-l lg:border-border' : ''}`}>
                  <div className="h-full py-5 sm:px-4">
                    {verifiedPropertySlugs.has(county.slug)
                      ? <Link to="/property-tax/county/$county" params={{ county: county.slug }} className="group block"><span className="text-[0.68rem] uppercase tracking-[0.14em] text-primary">Verified property-tax guide</span><strong className="mt-1 block font-display text-xl leading-tight group-hover:text-primary">{county.name}</strong><span className="mt-3 block text-sm font-semibold">Local tax resources →</span></Link>
                      : <Link to="/county/$slug" params={{ slug: county.slug }} className="group block"><span className="text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">County reference</span><strong className="mt-1 block font-display text-xl leading-tight group-hover:text-primary">{county.name}</strong><span className="mt-3 block text-sm font-semibold">County guide →</span></Link>}
                    <a href={calculatorTarget.href} rel={calculatorTarget.follow ? undefined : 'nofollow'} className="mt-4 inline-block border-t border-border pt-3 text-sm font-semibold text-primary">Calculate {county.name} taxes →</a>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        {countyRateDataset ? <CitationTrustPanel
          sources={[{ name: countyRateDataset.sourceName, url: countyRateDataset.sourceUrl }]}
          methodology={countyRateDataset.methodology}
          lastVerified={countyRateDataset.updated}
          title="County-rate comparison sources and methodology"
        /> : null}
      </Container>
    </>
  );
}
