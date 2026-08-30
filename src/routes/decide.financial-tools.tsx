import { createFileRoute, Link } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { Container } from '@/components/layout/Container';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const description = 'Texas calculators and practical guides for mortgages, home insurance, property taxes, utilities, salary, moving costs and everyday household decisions.';

const sections = [
  ['Estimate your property taxes', '/decide/property-taxes', 'See an estimated taxable value and annual or monthly property-tax cost.', 'Property taxes'],
  ['Understand MUDs, PIDs, HOAs and special districts', '/article/muds-pids-hoas-special-districts-texas', 'See how district taxes, assessments and private association dues can change the true carrying cost of a Texas home.', 'Property taxes'],
  ['Estimate a mortgage payment', '/texas-mortgage-calculator', 'Combine principal, interest, property taxes and insurance in one monthly estimate.', 'Home buying'],
  ['See what home may fit your budget', '/texas-home-affordability-calculator', 'Use income, debts and housing costs to explore a possible price range.', 'Home buying'],
  ['Understand salary and home affordability', '/article/salary-needed-to-buy-a-house-in-texas', 'Work backward from the complete housing payment, recurring debts, reserves and household budget before testing a price range.', 'Home buying'],
  ['Plan your down payment', '/texas-down-payment-calculator', 'Estimate the down payment, closing costs, reserves and cash you may need.', 'Home buying'],
  ['Calculate buyer cash to close', '/texas-cash-to-close-calculator', 'Combine down payment, closing costs and prepaids, then account for credits, deposits, verified assistance and a post-closing reserve.', 'Home buying'],
  ['Estimate closing costs', '/texas-closing-cost-calculator', 'Get a practical look at buyer and seller transaction costs.', 'Home buying'],
  ['Estimate seller net proceeds', '/texas-seller-net-proceeds-calculator', 'Work from sale price through loan payoff, seller transaction costs, credits, repairs and other modeled deductions.', 'Home selling'],
  ['Understand closing costs and cash to close', '/article/texas-closing-costs-guide', 'Learn the Loan Estimate, Closing Disclosure and cash-to-close concepts behind the calculator.', 'Home buying'],
  ['Explore down-payment help', '/texas-down-payment-assistance-calculator', 'Estimate possible assistance and what may still be left to cover.', 'Home buying'],
  ['Compare renting and buying', '/texas-rent-vs-buy-calculator', 'Compare simplified long-term costs side by side.', 'Home buying'],
  ['See the full cost of owning', '/texas-homeownership-cost-calculator', 'Bring mortgage, taxes, insurance, utilities, maintenance and fees together.', 'Homeownership'],
  ['Estimate your home equity', '/texas-home-equity-calculator', 'See estimated equity, the share of your home value still owed and possible borrowing room.', 'Homeownership'],
  ['Project equity over time', '/texas-home-equity-growth-calculator', 'Explore how value, loan balance and equity may change.', 'Homeownership'],
  ['See what extra payments could do', '/texas-mortgage-payoff-calculator', 'Estimate payoff timing and interest when you add extra principal.', 'Homeownership'],
  ['Compare a refinance', '/texas-refinance-savings-calculator', 'Look at payments, savings and how long it may take for savings to cover the refinance cost.', 'Homeownership'],
  ['Compare cost of living', '/texas-cost-of-living-calculator', 'Adjust household spending to compare local costs.', 'Household costs'],
  ['Estimate utility costs', '/texas-utility-cost-calculator', 'Explore possible monthly and annual household utility costs.', 'Household costs'],
  ['Read the utility-cost guide', '/article/texas-utility-costs-guide', 'Build an address-specific utility budget and understand seasonal usage before running the calculator.', 'Household costs'],
  ['Estimate take-home pay', '/texas-salary-calculator', 'See an estimated paycheck after adjustable deductions.', 'Income & budget'],
  ['Compare salaries by city', '/texas-salary-comparison-by-city', 'Estimate a cost-adjusted salary for another Texas city.', 'Income & budget'],
  ['Build a household budget', '/texas-budget-planner', 'Organize monthly spending and set a savings target.', 'Income & budget'],
  ['Estimate moving costs', '/texas-moving-cost-calculator', 'Plan for transportation, packing, setup costs and a little breathing room.', 'Moving'],
  ['Estimate home-insurance costs', '/texas-home-insurance-calculator', 'Build a starting homeowners-insurance estimate without entering personal contact information.', 'Insurance'],
  ['Understand property taxes', '/learn/property-taxes', 'A plain-English guide to appraisals, exemptions, rates, bills, protests and payments.', 'Property taxes'],
  ['Browse county property-tax guides', '/property-tax/counties', 'Find appraisal districts, tax offices, exemption resources and county-level property-tax guidance.', 'Property taxes'],
  ['Use property-tax calculators', '/property-tax-calculators', 'Choose a calculator for homestead savings, protests, escrow, age-65 scenarios and more.', 'Property taxes'],
  ['File a homestead exemption', '/do/homestead-exemption', 'Review eligibility, filing steps and what to check after approval.', 'Property taxes'],
  ['Prepare an appraisal protest', '/do/property-tax-protest', 'Work through deadlines, evidence, informal review and appraisal review board hearing steps.', 'Property taxes'],
  ['Find your county', '/browse/counties', 'Continue to county offices, appraisal districts and official local information.', 'Texas reference'],
  ['Find a city', '/browse/cities', 'Look up cities across the state by county and region.', 'Texas reference'],
  ['Plan your move', '/moving-to-texas', 'Compare places, understand likely costs and get settled.', 'Moving'],
  ['Use the moving checklist', '/moving-to-texas-checklist', 'Keep the practical before-and-after steps in one place.', 'Moving'],
] as const;

const hubUrl = absoluteUrl(texasDefinedBrand, '/decide/financial-tools');
const priorityGroups = [
  ['Property taxes', 'Property-tax guides, county resources and calculators'],
  ['Home buying', 'Mortgage, affordability, down payment and closing-cost tools'],
  ['Homeownership', 'Equity, refinance, payoff and total ownership costs'],
  ['Insurance', 'Texas homeowners-insurance estimates'],
  ['Household costs', 'Utilities and cost-of-living planning'],
  ['Income & budget', 'Salary comparisons, take-home pay and budgeting'],
] as const;

export const Route = createFileRoute('/decide/financial-tools')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath: '/decide/financial-tools', title: 'Texas Financial Calculators | Home, Tax, Insurance & Salary Tools', description }),
    links: [canonicalLink(texasDefinedBrand, '/decide/financial-tools')],
    scripts: [jsonLd({ '@context': 'https://schema.org', '@graph': [
      { '@type': 'CollectionPage', '@id': `${hubUrl}#page`, url: hubUrl, name: 'Texas Financial Calculators and Guides', description, isPartOf: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#website` }, mainEntity: { '@id': `${hubUrl}#tools` }, breadcrumb: { '@id': `${hubUrl}#breadcrumb` } },
      { '@type': 'BreadcrumbList', '@id': `${hubUrl}#breadcrumb`, itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Front page', item: absoluteUrl(texasDefinedBrand, '/') }, { '@type': 'ListItem', position: 2, name: 'Money & Property', item: hubUrl }] },
      { '@type': 'ItemList', '@id': `${hubUrl}#tools`, name: 'Texas calculators and practical money guides', numberOfItems: sections.length, itemListElement: sections.map(([name, path, itemDescription], index) => ({ '@type': 'ListItem', position: index + 1, url: absoluteUrl(texasDefinedBrand, path), item: { '@type': 'WebPage', name, description: itemDescription, url: absoluteUrl(texasDefinedBrand, path) } })) },
    ] })],
  }),
  component: Page,
});

function Page() {
  return <>
    <DepartmentHero current="Money & Property" eyebrow="Money & Property" title="Texas calculators for the numbers behind everyday life." description={description} tone="surface" />
    <Container className="py-14 sm:py-20">
      <section className="border-b border-border pb-10">
        <p className="eyebrow text-primary">Popular starting points</p>
        <h2 className="mt-2 font-display text-4xl">Start with the decision you are making</h2>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {priorityGroups.map(([group, copy]) => {
            const first = sections.find(([, , , itemGroup]) => itemGroup === group);
            if (!first) return null;
            return <Link key={group} to={first[1]} className="rounded-md border border-border p-5 hover:border-primary/50"><span className="eyebrow text-primary">{group}</span><strong className="mt-2 block font-display text-2xl">{copy}</strong><span className="mt-4 block text-sm font-semibold text-primary">Start here →</span></Link>;
          })}
        </div>
      </section>
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5 pt-10">
        <div><p className="eyebrow text-primary">All tools & guides</p><h2 className="mt-2 font-display text-3xl">Calculators, guides and practical next steps</h2></div>
        <p className="text-sm text-muted-foreground">{sections.length} helpful starting points</p>
      </div>
      <ol className="grid border-b border-border sm:grid-cols-2 lg:grid-cols-3">
        {sections.map(([title, to, copy, group], index) => (
          <li key={to} className={`border-b border-border py-7 sm:px-6 ${index % 3 === 0 ? 'lg:pl-0' : ''} ${index % 3 !== 2 ? 'lg:border-r' : ''}`}>
            <Link to={to} className="group block h-full">
              <p className="eyebrow text-muted-foreground">{group}</p>
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
