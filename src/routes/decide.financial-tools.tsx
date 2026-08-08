import { createFileRoute, Link } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { Container } from '@/components/layout/Container';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const description = 'Clear, practical ways to work through housing costs, paychecks, utilities, insurance, moving expenses and the other numbers that shape life here.';

const sections = [
  ['Estimate your property taxes', '/decide/property-taxes', 'See an estimated taxable value and annual or monthly property-tax cost.'],
  ['Estimate a mortgage payment', '/texas-mortgage-calculator', 'Combine principal, interest, property taxes and insurance in one monthly estimate.'],
  ['See what home may fit your budget', '/texas-home-affordability-calculator', 'Use income, debts and housing costs to explore a possible price range.'],
  ['Plan your down payment', '/texas-down-payment-calculator', 'Estimate the down payment, closing costs, reserves and cash you may need.'],
  ['Estimate closing costs', '/texas-closing-cost-calculator', 'Get a practical look at buyer and seller transaction costs.'],
  ['Explore down-payment help', '/texas-down-payment-assistance-calculator', 'Estimate possible assistance and what may still be left to cover.'],
  ['Compare renting and buying', '/texas-rent-vs-buy-calculator', 'Compare simplified long-term costs side by side.'],
  ['See the full cost of owning', '/texas-homeownership-cost-calculator', 'Bring mortgage, taxes, insurance, utilities, maintenance and fees together.'],
  ['Estimate your home equity', '/texas-home-equity-calculator', 'See estimated equity, the share of your home value still owed and possible borrowing room.'],
  ['Project equity over time', '/texas-home-equity-growth-calculator', 'Explore how value, loan balance and equity may change.'],
  ['See what extra payments could do', '/texas-mortgage-payoff-calculator', 'Estimate payoff timing and interest when you add extra principal.'],
  ['Compare a refinance', '/texas-refinance-savings-calculator', 'Look at payments, savings and how long it may take for savings to cover the refinance cost.'],
  ['Compare cost of living', '/texas-cost-of-living-calculator', 'Adjust household spending to compare local costs.'],
  ['Estimate take-home pay', '/texas-salary-calculator', 'See an estimated paycheck after adjustable deductions.'],
  ['Compare salaries by city', '/texas-salary-comparison-by-city', 'Estimate a cost-adjusted salary for another Texas city.'],
  ['Build a household budget', '/texas-budget-planner', 'Organize monthly spending and set a savings target.'],
  ['Estimate moving costs', '/texas-moving-cost-calculator', 'Plan for transportation, packing, setup costs and a little breathing room.'],
  ['Estimate utility costs', '/texas-utility-cost-calculator', 'Explore possible monthly and annual household utility costs.'],
  ['Estimate home-insurance costs', '/texas-home-insurance-calculator', 'Build a starting premium estimate from replacement cost and additions.'],
  ['Understand property taxes', '/learn/property-taxes', 'A plain-English guide to appraisals, exemptions, rates, bills, protests and payments.'],
  ['File a homestead exemption', '/do/homestead-exemption', 'Review eligibility, filing steps and what to check after approval.'],
  ['Prepare an appraisal protest', '/do/property-tax-protest', 'Work through deadlines, evidence, informal review and appraisal review board hearing steps.'],
  ['Find your county', '/browse/counties', 'Continue to county offices, appraisal districts and official local information.'],
  ['Find a city', '/browse/cities', 'Look up cities across the state by county and region.'],
  ['Plan your move', '/moving-to-texas', 'Compare places, understand likely costs and get settled.'],
  ['Use the moving checklist', '/moving-to-texas-checklist', 'Keep the practical before-and-after steps in one place.'],
] as const;

const hubUrl = absoluteUrl(texasDefinedBrand, '/decide/financial-tools');

export const Route = createFileRoute('/decide/financial-tools')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath: '/decide/financial-tools', title: 'Money & Property', description }),
    links: [canonicalLink(texasDefinedBrand, '/decide/financial-tools')],
    scripts: [jsonLd({ '@context': 'https://schema.org', '@graph': [
      { '@type': 'CollectionPage', '@id': `${hubUrl}#page`, url: hubUrl, name: 'Money & Property', description, isPartOf: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#website` }, mainEntity: { '@id': `${hubUrl}#tools` } },
      { '@type': 'BreadcrumbList', '@id': `${hubUrl}#breadcrumb`, itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Front page', item: absoluteUrl(texasDefinedBrand, '/') }, { '@type': 'ListItem', position: 2, name: 'Money & Property', item: hubUrl }] },
      { '@type': 'ItemList', '@id': `${hubUrl}#tools`, name: 'Calculators and guides for everyday money decisions', numberOfItems: sections.length, itemListElement: sections.map(([name, path, itemDescription], index) => ({ '@type': 'ListItem', position: index + 1, url: absoluteUrl(texasDefinedBrand, path), item: { '@type': 'WebPage', name, description: itemDescription, url: absoluteUrl(texasDefinedBrand, path) } })) },
    ] })],
  }),
  component: Page,
});

function Page() {
  return <>
    <DepartmentHero current="Money & Property" eyebrow="Money & Property" title="Plan the numbers behind life in Texas." description={description} tone="surface" />

    <Container className="py-14 sm:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
        <div><p className="eyebrow text-primary">Start with the question</p><h2 className="mt-2 font-display text-3xl">Calculators, guides and practical next steps</h2></div>
        <p className="text-sm text-muted-foreground">{sections.length} helpful starting points</p>
      </div>
      <ol className="grid border-b border-border sm:grid-cols-2 lg:grid-cols-3">
        {sections.map(([title, to, copy], index) => (
          <li key={to} className={`border-b border-border py-7 sm:px-6 ${index % 3 === 0 ? 'lg:pl-0' : ''} ${index % 3 !== 2 ? 'lg:border-r' : ''}`}>
            <Link to={to} className="group block h-full">
              <p className="eyebrow text-muted-foreground">{String(index + 1).padStart(2, '0')}</p>
              <h3 className="mt-3 font-display text-2xl leading-tight transition-colors group-hover:text-primary">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{copy}</p>
              <span className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">Start here →</span>
            </Link>
          </li>
        ))}
      </ol>
      <aside className="mt-10 max-w-3xl border-t border-border pt-6 text-sm leading-7 text-muted-foreground"><p className="eyebrow text-primary">Planning note</p><p className="mt-3">These estimates are a starting point. Confirm official rates, eligibility, deadlines, quotes and property details with the responsible provider or agency.</p></aside>
    </Container>
  </>;
}
