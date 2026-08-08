import { createFileRoute, Link } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { Container } from '@/components/layout/Container';
import { TEXAS_COUNTIES } from '@/data/texas-places';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/property-tax/counties';
const description = 'Browse property-tax guidance for all 254 Texas counties, with links to appraisal, exemption, protest, payment and official local resources.';

export const Route = createFileRoute('/property-tax/counties')({
  head: () => {
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Texas County Property Tax Directory', description }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          { '@type': 'CollectionPage', '@id': `${pageUrl}#page`, url: pageUrl, name: 'Texas County Property Tax Directory', description },
          {
            '@type': 'ItemList', '@id': `${pageUrl}#counties`, numberOfItems: TEXAS_COUNTIES.length,
            itemListElement: TEXAS_COUNTIES.map((county, index) => ({ '@type': 'ListItem', position: index + 1, name: county.name, url: absoluteUrl(texasDefinedBrand, `/property-tax/county/${county.slug}`) })),
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
            <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Texas county property-tax guides</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">Choose a county for a practical checklist covering appraisal records, exemptions, protest deadlines, taxing units, payments and official local starting points.</p>
          </div>
          <p className="border-l border-border pl-6 text-sm leading-6 text-muted-foreground">County averages are only a starting point. The exact parcel, exemptions and overlapping taxing units determine the real bill.</p>
        </header>

        <section className="py-10">
          <div className="border-b border-border pb-4"><p className="eyebrow text-primary">County directory</p><h2 className="mt-2 font-display text-4xl">Find your local guide</h2></div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
            {TEXAS_COUNTIES.map((county, index) => (
              <li key={county.code} className={`border-b border-border ${index % 4 !== 0 ? 'lg:border-l lg:border-border' : ''}`}>
                <Link to="/property-tax/county/$county" params={{ county: county.slug }} className="group block h-full py-5 sm:px-4">
                  <span className="text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">County {county.code}</span>
                  <strong className="mt-1 block font-display text-xl leading-tight group-hover:text-primary">{county.name}</strong>
                  <span className="mt-3 block text-sm font-semibold">Open guide →</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </>
  );
}
