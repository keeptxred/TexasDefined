import { createFileRoute, Link } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { Container } from '@/components/layout/Container';
import { TEXAS_COUNTIES } from '@/data/texas-places';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/property';
const description = 'Texas Defined’s homeowner and property hub for official local property-tax rates, parcel estimates, exemptions, appraisal protests, county guides, calculators, buying a home and ownership costs.';
const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);

const startHere = [
  { to: '/buying-a-home-in-texas', label: 'Buying a home in Texas', body: 'Build the purchase from affordability and cash to close through mortgage, local taxes, insurance, closing and post-closing reserves.' },
  { to: '/learn/property-taxes', label: 'Understand Texas property taxes', body: 'Start with the full system: values, exemptions, rates, protests, payments and local taxing units.' },
  { to: '/texas-property-tax-estimator', label: 'Estimate your property taxes', body: 'Choose county, ISD, city and applicable special districts, then load finalized official rates.' },
  { to: '/browse/counties', label: 'Find your county', body: 'Open the county guide for local tax rates, appraisal, exemption, protest, payment and office resources.' },
] as const;

const roadmap = [
  { number: '01', title: 'Know the value', body: 'Understand market value, appraised value, taxable value and the role of your appraisal district.', to: '/learn/appraisal-districts' },
  { number: '02', title: 'Claim what applies', body: 'Review homestead, age-65, disability, disabled-veteran and special-valuation rules.', to: '/do/homestead-exemption' },
  { number: '03', title: 'Challenge errors on time', body: 'Check the notice, gather evidence and use the protest process before the deadline.', to: '/do/property-tax-protest' },
  { number: '04', title: 'Build the actual local rate stack', body: 'Identify the county, city, school district and special districts that serve the exact parcel.', to: '/texas-property-tax-estimator' },
  { number: '05', title: 'Plan the payment', body: 'Model the annual bill and monthly escrow, then verify the collector and due date.', to: '/learn/property-tax-payments' },
] as const;

const popularGuides = [
  { to: '/learn/property-taxes', label: 'Texas Property Taxes', body: 'The main guide to the Texas property-tax system.' },
  { to: '/decide/property-taxes', label: 'Property Tax Decisions', body: 'A decision-oriented path through exemptions, protests, payments and the next action to take.' },
  { to: '/do/homestead-exemption', label: 'Homestead Exemption', body: 'Eligibility, filing, appraisal limits and related protections.' },
  { to: '/do/property-tax-protest', label: 'Property Tax Protest', body: 'Deadlines, evidence, ARB hearings and next steps.' },
  { to: '/learn/agricultural-valuation', label: 'Agricultural Valuation', body: 'How qualifying agricultural land can be valued by productivity.' },
  { to: '/learn/wildlife-management-valuation', label: 'Wildlife Management Valuation', body: 'How qualifying land can continue special valuation under wildlife management.' },
  { to: '/learn/mud-taxes-explained', label: 'MUD Taxes Explained', body: 'Understand utility-district taxes, debt and the impact on ownership cost.' },
] as const;

const calculators = [
  { to: '/texas-property-tax-estimator', label: 'Official-Rate Property Tax Estimator', body: 'Build a parcel tax scenario from finalized county, ISD, city and special-district rates.' },
  { to: '/texas-property-tax-bill-breakdown', label: 'Tax Bill Breakdown', body: 'See what share of a combined rate comes from each selected taxing unit.' },
  { to: '/texas-property-tax-county-comparison-calculator', label: 'Location Comparison', body: 'Compare two exact local taxing-unit scenarios instead of county averages.' },
  { to: '/texas-property-tax-rate-history', label: 'Rate History Explorer', body: 'Track counties, cities, ISDs, MUDs and other taxing units across retained annual files.' },
  { to: '/texas-mud-tax-impact-calculator', label: 'MUD / District Impact', body: 'Measure the annual, monthly and long-term impact of a special-district rate.' },
  { to: '/texas-homeownership-cost-calculator', label: 'Homeownership Cost Calculator', body: 'Add official-rate property taxes, insurance, financing and recurring ownership costs.' },
  { to: '/texas-home-affordability-calculator', label: 'Home Affordability Calculator', body: 'Test home price, income and recurring costs before comparing a purchase scenario.' },
] as const;

const updates = [
  { date: 'August 2026', label: 'Official statewide tax-rate platform added', body: 'Texas Defined now imports finalized Texas Comptroller county, city, school-district and special-district rate files into county pages and calculators.' },
  { date: 'August 2026', label: 'Historical taxing-unit references added', body: 'Taxing units now have reusable rate-history references backed by retained annual statewide files.' },
  { date: 'August 2026', label: 'All 254 county guides connected to rate data', body: 'County guides now expose reported local taxing units while warning that exact parcel jurisdiction controls which taxes apply.' },
] as const;

const propertyUpdates = [
  { to: '/learn/property-tax-deadlines', label: 'Property-tax deadlines', body: 'The dates that can change a homeowner’s next move.' },
  { to: '/learn/over-65-property-tax-guide', label: 'Age-65 property-tax relief', body: 'Exemptions, tax ceilings, installments and deferral basics.' },
  { to: '/learn/disabled-veteran-property-tax-benefits', label: 'Disabled-veteran benefits', body: 'A focused guide to Texas property-tax relief for qualifying veterans and survivors.' },
  { to: '/learn/homebuyer-property-tax-checklist', label: 'Homebuyer property-tax checklist', body: 'What to verify before relying on the seller’s current tax bill.' },
] as const;

export const Route = createFileRoute('/property')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Texas Property & Homeowner Guide', description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'CollectionPage', '@id': `${pageUrl}#page`, url: pageUrl, name: 'Texas Property & Homeowner Guide', description, isPartOf: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#website` }, publisher: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` }, mainEntity: { '@id': `${pageUrl}#guides` } },
        { '@type': 'ItemList', '@id': `${pageUrl}#guides`, name: 'Texas property guides', numberOfItems: popularGuides.length, itemListElement: popularGuides.map((guide, index) => ({ '@type': 'ListItem', position: index + 1, item: { '@type': 'WebPage', '@id': absoluteUrl(texasDefinedBrand, guide.to), url: absoluteUrl(texasDefinedBrand, guide.to), name: guide.label, description: guide.body } })) },
        { '@type': 'BreadcrumbList', '@id': `${pageUrl}#breadcrumb`, itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl(texasDefinedBrand, '/') }, { '@type': 'ListItem', position: 2, name: 'Property', item: pageUrl }] },
      ],
    })],
  }),
  component: PropertyHub,
});

function PropertyHub() {
  return <>
    <Container className="pb-12 pt-16 sm:pb-16 sm:pt-24"><p className="eyebrow text-primary">Home & property</p><h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.98] tracking-tight sm:text-7xl">Own a home in Texas with fewer surprises</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">From buying and financing a home to official-rate local tax estimates, exemptions, appraisal notices, county offices and long-term ownership costs, this is the starting point for the practical side of Texas property.</p><div className="mt-8 flex flex-wrap gap-3"><Link to="/buying-a-home-in-texas" className="rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Plan a Texas home purchase</Link><Link to="/texas-property-tax-estimator" className="rounded-sm border border-border px-5 py-3 text-sm font-semibold">Estimate local property taxes</Link><Link to="/learn/property-taxes" className="rounded-sm border border-border px-5 py-3 text-sm font-semibold">Understand the tax system</Link></div></Container>

    <section className="border-y border-border bg-muted/35"><Container className="py-12 sm:py-16"><p className="eyebrow text-primary">Start here</p><h2 className="mt-2 font-display text-3xl sm:text-4xl">Four ways into the property section</h2><div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{startHere.map(item=><Link key={item.to} to={item.to} className="rounded-md border border-border bg-background p-6 transition-colors hover:border-primary/50"><h3 className="font-display text-2xl">{item.label}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{item.body}</p><span className="mt-5 inline-block text-sm font-semibold text-primary">Open →</span></Link>)}</div></Container></section>

    <Container className="py-14 sm:py-20"><p className="eyebrow text-primary">The ownership roadmap</p><h2 className="mt-2 font-display text-3xl sm:text-4xl">Follow the property-tax year in order</h2><ol className="mt-8 grid gap-5 md:grid-cols-2">{roadmap.map(item=><li key={item.number} className="rounded-md border border-border p-6"><span className="eyebrow text-primary">{item.number}</span><h3 className="mt-2 font-display text-2xl">{item.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{item.body}</p><Link to={item.to} className="mt-4 inline-block text-sm font-semibold text-primary underline">Continue</Link></li>)}</ol></Container>

    <section className="border-y border-border bg-muted/35"><Container className="py-14 sm:py-20"><p className="eyebrow text-primary">Calculators & data tools</p><h2 className="mt-2 font-display text-3xl sm:text-4xl">Put official local rates next to the guide</h2><div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{calculators.map(item=><Link key={item.to} to={item.to} className="rounded-md border border-border bg-background p-5"><h3 className="font-display text-xl">{item.label}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{item.body}</p><span className="mt-4 inline-block text-sm font-semibold text-primary">Open →</span></Link>)}</div><Link to="/property-tax-calculators" className="mt-7 inline-block text-sm font-semibold text-primary underline decoration-primary/40 underline-offset-4">See the full property-tax calculator toolkit →</Link></Container></section>

    <Container className="py-14 sm:py-20"><div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center"><div><p className="eyebrow text-primary">County search</p><h2 className="mt-2 font-display text-3xl sm:text-4xl">Property taxes are local. Start with the county.</h2><p className="mt-4 text-base leading-7 text-muted-foreground">Texas Defined connects all {TEXAS_COUNTIES.length} counties to local property-tax research. County pages now include finalized reported county, school, city and special-district rates alongside appraisal, exemption, protest and payment resources.</p><div className="mt-6 flex flex-wrap gap-3"><Link to="/browse/counties" className="rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Find your county</Link><Link to="/property-tax/counties" className="rounded-sm border border-border px-5 py-3 text-sm font-semibold">Browse county tax guides</Link></div></div><div className="rounded-md border border-border p-6"><p className="eyebrow text-primary">What to have ready</p><ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground"><li>Property address or appraisal account number</li><li>Latest appraisal notice</li><li>Current exemptions and taxable values</li><li>Exact city, school district and special-district membership</li><li>Most recent tax bill or escrow analysis</li></ul></div></div></Container>

    <section className="border-y border-border bg-muted/35"><Container className="py-14 sm:py-20"><p className="eyebrow text-primary">Most-used guides</p><h2 className="mt-2 font-display text-3xl sm:text-4xl">The core property library</h2><div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{popularGuides.map(guide=><Link key={guide.to} to={guide.to} className="rounded-md border border-border bg-background p-5"><h3 className="font-display text-xl">{guide.label}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{guide.body}</p><span className="mt-4 inline-block text-sm font-semibold text-primary">Read the guide →</span></Link>)}</div></Container></section>

    <Container className="py-14 sm:py-20"><div className="grid gap-10 lg:grid-cols-2"><section><p className="eyebrow text-primary">Latest updates</p><h2 className="mt-2 font-display text-3xl">What changed in this section</h2><div className="mt-6 space-y-4">{updates.map(item=><article key={item.label} className="border-t border-border pt-4"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{item.date}</p><h3 className="mt-1 font-display text-xl">{item.label}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.body}</p></article>)}</div></section><section><p className="eyebrow text-primary">Property updates</p><h2 className="mt-2 font-display text-3xl">Current guides worth checking</h2><div className="mt-6 grid gap-4 sm:grid-cols-2">{propertyUpdates.map(item=><Link key={item.to} to={item.to} className="rounded-md border border-border p-5"><h3 className="font-display text-xl">{item.label}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.body}</p></Link>)}</div></section></div></Container>
  </>;
}
