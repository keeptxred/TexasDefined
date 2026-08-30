import { createFileRoute, Link } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { Container } from '@/components/layout/Container';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/property-tax-calculators';
const description = 'Free Texas property-tax calculators using official local taxing-unit rates for parcel estimates, major-county and city scenarios, bill breakdowns, comparisons, homestead savings, protests, escrow and more.';

const tools = [
  ['Property tax estimator', 'Choose the county, ISD, city and applicable special districts, then estimate annual and monthly property tax from finalized Comptroller-reported rates.', '/texas-property-tax-estimator', 'I want to estimate taxes for a property'],
  ['Property-tax bill breakdown', 'See how county, school, city and selected special-district rates contribute to the combined local property-tax burden.', '/texas-property-tax-bill-breakdown', 'I want to see where the tax bill goes'],
  ['County / location comparison', 'Build two exact local taxing-unit scenarios and compare annual and monthly property-tax cost instead of relying on county averages.', '/texas-property-tax-county-comparison-calculator', 'I am comparing places to live'],
  ['School-district comparison', 'Compare two Texas school-district tax rates at the same taxable value using the official statewide rate files.', '/texas-school-district-property-tax-comparison', 'I want to compare school tax rates'],
  ['MUD / special-district impact', 'Search a MUD or other special district and estimate its annual, monthly and long-term tax impact.', '/texas-mud-tax-impact-calculator', 'I need to understand a MUD or district tax'],
  ['Property-tax rate history', 'Search counties, cities, ISDs, MUDs and other taxing units and compare their finalized annual rates over time.', '/texas-property-tax-rate-history', 'I want to see how a tax rate changed'],
  ['Homestead savings', 'Estimate how entered homestead exemptions can change taxable value and annual taxes, with official local rate autofill.', '/texas-homestead-savings-calculator', 'I want to estimate homestead-exemption savings'],
  ['Property-tax protest savings', 'Compare the tax effect of a proposed appraisal with a lower supportable target value and load the local combined rate.', '/texas-property-tax-protest-savings-calculator', 'I am considering an appraisal protest'],
  ['Escrow', 'Estimate monthly escrow for property taxes, homeowners insurance and HOA costs, with local-rate tax estimation.', '/texas-property-tax-escrow-calculator', 'I need a monthly housing-cost estimate'],
  ['Age 65+', 'Model entered exemptions and an existing school-tax ceiling while loading the selected local school and other taxing-unit rates.', '/texas-over-65-property-tax-calculator', 'I am planning around age-65 tax benefits'],
  ['Disabled veteran', 'Estimate savings from a verified disabled-veteran exemption amount using the local taxing-unit rates that apply to the property.', '/texas-disabled-veteran-property-tax-calculator', 'I need to model a disabled-veteran exemption'],
  ['Agricultural valuation', 'Compare market-value and productivity-value tax scenarios using a selected set of official local taxing-unit rates.', '/texas-agricultural-valuation-calculator', 'I am evaluating agricultural valuation'],
] as const;

const cityTools = [
  ['Houston property tax calculator', '/property-tax-calculator/houston', 'Harris, Fort Bend or Montgomery County starting points with parcel-specific school, city and special-district selection.'],
  ['Austin property tax calculator', '/property-tax-calculator/austin', 'Travis, Williamson or Hays County starting points with the actual local taxing-unit stack.'],
  ['Frisco property tax calculator', '/property-tax-calculator/frisco', 'Collin or Denton County starting points with parcel school, city and other taxing units.'],
] as const;

const countyTools = [
  ['Harris County', '/property-tax-calculator/harris-county'],
  ['Dallas County', '/property-tax-calculator/dallas-county'],
  ['Tarrant County', '/property-tax-calculator/tarrant-county'],
  ['Bexar County', '/property-tax-calculator/bexar-county'],
  ['Travis County', '/property-tax-calculator/travis-county'],
  ['Collin County', '/property-tax-calculator/collin-county'],
  ['Denton County', '/property-tax-calculator/denton-county'],
  ['Fort Bend County', '/property-tax-calculator/fort-bend-county'],
  ['Montgomery County', '/property-tax-calculator/montgomery-county'],
  ['Williamson County', '/property-tax-calculator/williamson-county'],
  ['El Paso County', '/property-tax-calculator/el-paso-county'],
  ['Hidalgo County', '/property-tax-calculator/hidalgo-county'],
] as const;

const localToolsForSchema = [
  ...cityTools.map(([name, path, itemDescription]) => ({ name, path, itemDescription })),
  ...countyTools.map(([name, path]) => ({ name: `${name} property tax calculator`, path, itemDescription: `Build a parcel-specific ${name} property-tax estimate from official county, school, city and applicable special-district rates.` })),
];
const allToolsForSchema = [
  ...tools.map(([name, itemDescription, path]) => ({ name, itemDescription, path })),
  ...localToolsForSchema,
];

export const Route = createFileRoute('/property-tax-calculators')({
  head: () => {
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    const siteUrl = absoluteUrl(texasDefinedBrand, '/');
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Texas Property Tax Calculators | Official Local Rates', description }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          { '@type': 'CollectionPage', '@id': `${pageUrl}#page`, name: 'Texas Property Tax Calculators', description, url: pageUrl, isPartOf: { '@id': `${siteUrl}#website` }, mainEntity: { '@id': `${pageUrl}#tools` }, breadcrumb: { '@id': `${pageUrl}#breadcrumb` } },
          { '@type': 'ItemList', '@id': `${pageUrl}#tools`, numberOfItems: allToolsForSchema.length, itemListElement: allToolsForSchema.map(({ name, itemDescription, path }, index) => ({ '@type': 'ListItem', position: index + 1, url: absoluteUrl(texasDefinedBrand, path), item: { '@type': 'WebPage', name, description: itemDescription, url: absoluteUrl(texasDefinedBrand, path) } })) },
          { '@type': 'BreadcrumbList', '@id': `${pageUrl}#breadcrumb`, itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl }, { '@type': 'ListItem', position: 2, name: 'Property', item: absoluteUrl(texasDefinedBrand, '/property') }, { '@type': 'ListItem', position: 3, name: 'Property-tax calculators', item: pageUrl }] },
        ],
      })],
    };
  },
  component: Page,
});

function Page() {
  return (
    <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
      <article className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground"><Link to="/">Front page</Link><span className="mx-2">/</span><Link to="/property">Property</Link><span className="mx-2">/</span><span>Calculators</span></nav>
        <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-end">
          <div><p className="eyebrow text-primary">Property Taxes</p><h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Texas property-tax calculators</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">Free planning tools for Texas homeowners, homebuyers and landowners. Local-rate tools load finalized county, city, school-district and special-district rates reported to the Texas Comptroller while keeping parcel-specific jurisdictions and exemptions visible.</p></div>
          <p className="border-l border-border pl-6 text-sm leading-6 text-muted-foreground">There is no single Texas, citywide or countywide combined property-tax rate. The exact parcel determines which local taxing units actually apply.</p>
        </header>

        <section className="border-b border-border py-10">
          <p className="eyebrow text-primary">City starting points</p>
          <h2 className="mt-2 font-display text-4xl">Start with the city, finish with the parcel</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">These pages do not assign a metro average. They narrow the county choices first, then use the same official-rate engine as the statewide estimator so the school district, municipality and special districts remain explicit.</p>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {cityTools.map(([title, href, copy]) => <a key={href} href={href} className="rounded-md border border-border p-5 hover:border-primary/50"><strong className="font-display text-2xl">{title}</strong><span className="mt-3 block text-sm leading-6 text-muted-foreground">{copy}</span><span className="eyebrow mt-5 inline-block text-primary">Open city calculator →</span></a>)}
          </div>
        </section>

        <section className="border-b border-border py-10">
          <p className="eyebrow text-primary">Major county calculators</p>
          <h2 className="mt-2 font-display text-4xl">Build an address-level scenario in a major Texas county</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">County selection is only the first layer. Every calculator below preselects the county, then requires the parcel's actual school, municipality and applicable special districts before the combined estimate is useful.</p>
          <div className="mt-7 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {countyTools.map(([name, href]) => <a key={href} href={href} className="group bg-background p-5"><strong className="font-display text-2xl group-hover:text-primary">{name}</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Official local-rate calculator →</span></a>)}
          </div>
        </section>

        <section className="border-b border-border py-10">
          <p className="eyebrow text-primary">Start here</p><h2 className="mt-2 font-display text-4xl">Use official local rate data</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{tools.slice(0, 6).map(([title, , to, question]) => <Link key={`${to}-question`} to={to} className="rounded-md border border-border p-5 hover:border-primary/50"><span className="text-sm leading-6 text-muted-foreground">{question}</span><strong className="mt-2 block font-display text-2xl">{title} →</strong></Link>)}</div>
        </section>

        <section className="py-10">
          <div className="border-b border-border pb-4"><p className="eyebrow text-primary">All statewide tools</p><h2 className="mt-2 font-display text-4xl">Calculate a Texas property-tax scenario</h2></div>
          <div className="grid gap-x-8 md:grid-cols-2">{tools.map(([title, copy, to]) => <Link key={to} to={to} className="border-b border-border py-8"><span className="eyebrow text-primary">Calculator / tool</span><h3 className="mt-2 font-display text-3xl">Texas {title}</h3><p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">{copy}</p><span className="mt-5 inline-block font-semibold text-primary">Open tool →</span></Link>)}</div>
        </section>

        <section className="grid gap-8 border-t border-border py-10 lg:grid-cols-2">
          <div><p className="eyebrow text-primary">Need another county?</p><h2 className="mt-2 font-display text-3xl">Browse all 254 county guides</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">Texas Defined maintains county guides with finalized county, school, city and special-district rate tables alongside appraisal, exemption, protest and payment resources.</p><Link to="/property-tax/counties" className="mt-5 inline-block font-semibold text-primary underline decoration-primary/40 underline-offset-4">Browse all county property-tax guides →</Link></div>
          <div><p className="eyebrow text-primary">Need the rules first?</p><h2 className="mt-2 font-display text-3xl">Read the Texas property-tax guide</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">Understand appraised value, taxable value, taxing units, exemptions, protests and payments before interpreting a calculator result.</p><Link to="/learn/property-taxes" className="mt-5 inline-block font-semibold text-primary underline decoration-primary/40 underline-offset-4">How Texas property taxes work →</Link></div>
        </section>

        <p className="border-t border-border pt-6 text-sm leading-6 text-muted-foreground">These calculators are planning tools, not tax statements or eligibility determinations. Verify appraisal values, exemptions, adopted rates, tax ceilings and exact parcel jurisdiction with the responsible appraisal district, taxing unit or collecting office before making a financial decision.</p>
      </article>
    </Container>
  );
}
