import { createFileRoute, Link } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { Container } from '@/components/layout/Container';
import { TEXAS_COUNTIES } from '@/data/texas-places';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/property-tax/counties';
const description = 'Browse property-tax guidance for all 254 Texas counties, with links to appraisal, exemption, protest, payment and official local resources.';
const popularCountySlugs = ['comal', 'travis', 'denton', 'bexar', 'harris', 'waller', 'coryell', 'polk', 'lubbock'];
const popularCounties = popularCountySlugs.map((slug) => TEXAS_COUNTIES.find((county) => county.slug === slug)).filter((county): county is (typeof TEXAS_COUNTIES)[number] => Boolean(county));

export const Route = createFileRoute('/property-tax/counties')({
  head: () => {
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    const siteUrl = absoluteUrl(texasDefinedBrand, '/');
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Texas Property Tax by County | All 254 County Guides', description }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          { '@type': 'CollectionPage', '@id': `${pageUrl}#page`, url: pageUrl, name: 'Texas Property Tax by County', description, isPartOf: { '@id': `${siteUrl}#website` }, mainEntity: { '@id': `${pageUrl}#counties` }, breadcrumb: { '@id': `${pageUrl}#breadcrumb` } },
          {
            '@type': 'ItemList', '@id': `${pageUrl}#counties`, numberOfItems: TEXAS_COUNTIES.length,
            itemListElement: TEXAS_COUNTIES.map((county, index) => ({ '@type': 'ListItem', position: index + 1, name: county.name, url: absoluteUrl(texasDefinedBrand, `/property-tax/county/${county.slug}`) })),
          },
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
  return (
    <>
      <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground"><Link to="/">Front page</Link><span aria-hidden="true" className="mx-2">/</span><Link to="/decide/financial-tools">Money & Property</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page" className="text-foreground">County property-tax guides</span></nav>
        <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div>
            <p className="eyebrow text-primary">All 254 counties</p>
            <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Texas property tax by county</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">Choose any Texas county for a practical guide to appraisal records, exemptions, protests, taxing units, payments and the official local offices behind the bill.</p>
          </div>
          <p className="border-l border-border pl-6 text-sm leading-6 text-muted-foreground">Texas does not have one statewide property-tax rate. Your bill is built from the taxable value and the county, school, city and special-district rates attached to the property.</p>
        </header>

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div><p className="eyebrow text-primary">How to use these guides</p><h2 className="mt-2 font-display text-4xl">Start with the county, finish with the parcel</h2><div className="mt-5 space-y-4 text-base leading-8 text-muted-foreground"><p>A county guide is the fastest way to find the correct appraisal district, tax office, exemption resources and payment starting points. From there, use the actual property account to verify appraised value, taxable value and every taxing unit serving the address.</p><p>Comparing counties can be useful when planning a move, but county averages do not determine an individual bill. School districts, cities and special districts can make two properties in the same county materially different.</p></div><div className="mt-6 flex flex-wrap gap-5 text-sm font-semibold"><Link to="/learn/property-taxes" className="text-primary underline decoration-primary/40 underline-offset-4">How Texas property taxes work →</Link><Link to="/property-tax-calculators" className="text-primary underline decoration-primary/40 underline-offset-4">Property-tax calculators →</Link><Link to="/do/homestead-exemption" className="text-primary underline decoration-primary/40 underline-offset-4">Homestead exemption guide →</Link></div></div>
          <aside className="border-l border-border pl-6"><p className="eyebrow text-muted-foreground">Popular county guides</p><div className="mt-4 flex flex-col gap-3">{popularCounties.map((county) => <Link key={county.code} to="/property-tax/county/$county" params={{ county: county.slug }} className="font-display text-xl hover:text-primary">{county.name} →</Link>)}</div></aside>
        </section>

        <section className="py-10">
          <div className="border-b border-border pb-4"><p className="eyebrow text-primary">County directory</p><h2 className="mt-2 font-display text-4xl">Find your local property-tax guide</h2></div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
            {TEXAS_COUNTIES.map((county, index) => (
              <li key={county.code} className={`border-b border-border ${index % 4 !== 0 ? 'lg:border-l lg:border-border' : ''}`}>
                <Link to="/property-tax/county/$county" params={{ county: county.slug }} className="group block h-full py-5 sm:px-4">
                  <span className="text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">County {county.code}</span>
                  <strong className="mt-1 block font-display text-xl leading-tight group-hover:text-primary">{county.name} property taxes</strong>
                  <span className="mt-3 block text-sm font-semibold">Appraisal, exemptions & payments →</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </>
  );
}
