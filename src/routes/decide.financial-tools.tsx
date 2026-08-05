import { createFileRoute, Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const description = 'Clear, practical ways to work through housing costs, paychecks, utilities, insurance, moving expenses and the other numbers that shape life here.';

export const Route = createFileRoute('/decide/financial-tools')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: '/decide/financial-tools',
      title: 'Texas Money Calculators',
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, '/decide/financial-tools')],
  }),
  component: Page,
});

const sections = [
  ['Estimate your property taxes', '/decide/property-taxes', 'See an estimated taxable value and annual or monthly property-tax cost.'],
  ['Estimate a mortgage payment', '/texas-mortgage-calculator', 'Combine principal, interest, property taxes and insurance in one monthly estimate.'],
  ['See what home may fit your budget', '/texas-home-affordability-calculator', 'Use income, debts and housing costs to explore a possible price range.'],
  ['Plan your down payment', '/texas-down-payment-calculator', 'Estimate the down payment, closing costs, reserves and cash you may need.'],
  ['Estimate closing costs', '/texas-closing-cost-calculator', 'Get an illustrative look at buyer and seller transaction costs.'],
  ['Explore down-payment help', '/texas-down-payment-assistance-calculator', 'Model possible assistance and the cash gap that may remain.'],
  ['Compare renting and buying', '/texas-rent-vs-buy-calculator', 'Compare simplified long-term costs side by side.'],
  ['See the full cost of owning', '/texas-homeownership-cost-calculator', 'Bring mortgage, taxes, insurance, utilities, maintenance and fees together.'],
  ['Estimate your home equity', '/texas-home-equity-calculator', 'See estimated equity, loan-to-value and possible borrowing room.'],
  ['Project equity over time', '/texas-home-equity-growth-calculator', 'Explore how value, loan balance and equity may change.'],
  ['See what extra payments could do', '/texas-mortgage-payoff-calculator', 'Estimate payoff timing and interest when you add extra principal.'],
  ['Compare a refinance', '/texas-refinance-savings-calculator', 'Look at payments, savings and an estimated break-even point.'],
  ['Compare cost of living', '/texas-cost-of-living-calculator', 'Adjust household spending to compare local costs.'],
  ['Estimate take-home pay', '/texas-salary-calculator', 'See an estimated paycheck after adjustable deductions.'],
  ['Compare salaries by city', '/texas-salary-comparison-by-city', 'Estimate a cost-adjusted salary for another Texas city.'],
  ['Build a household budget', '/texas-budget-planner', 'Organize monthly spending and set a savings target.'],
  ['Estimate moving costs', '/texas-moving-cost-calculator', 'Plan for transportation, packing, setup costs and a little breathing room.'],
  ['Estimate utility costs', '/texas-utility-cost-calculator', 'Explore possible monthly and annual household utility costs.'],
  ['Estimate home-insurance costs', '/texas-home-insurance-calculator', 'Build an illustrative premium estimate from replacement cost and additions.'],
  ['Understand property taxes', '/learn/property-taxes', 'A plain-English guide to appraisals, exemptions, rates, bills, protests and payments.'],
  ['File a homestead exemption', '/do/homestead-exemption', 'Review eligibility, filing steps and what to check after approval.'],
  ['Prepare an appraisal protest', '/do/property-tax-protest', 'Work through deadlines, evidence, informal review and ARB hearing steps.'],
  ['Find your county', '/browse/counties', 'Continue to county offices, appraisal districts and official local information.'],
  ['Find a city', '/browse/cities', 'Look up cities across the state by county and region.'],
  ['Plan your move', '/moving-to-texas', 'Compare places, understand likely costs and get settled.'],
  ['Use the moving checklist', '/moving-to-texas-checklist', 'Keep the practical before-and-after steps in one place.'],
] as const;

function Page() {
  return (
    <Container className="py-16 sm:py-24">
      <main className="mx-auto max-w-6xl">
        <p className="eyebrow text-primary">Money Made Clearer</p>
        <h1 className="mt-3 font-display text-4xl sm:text-6xl">Work through the numbers before they surprise you</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{description}</p>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map(([title, to, copy]) => (
            <Link key={to} to={to} className="rounded-lg border border-border p-6 transition hover:-translate-y-0.5 hover:shadow-sm">
              <h2 className="font-display text-2xl">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
              <span className="mt-5 block text-sm font-medium text-primary">Try it →</span>
            </Link>
          ))}
        </div>
        <aside className="mt-10 rounded-lg bg-muted p-6 text-sm leading-6 text-muted-foreground">These estimates are for planning. Confirm official rates, eligibility, deadlines, quotes and property details with the responsible provider or agency.</aside>
      </main>
    </Container>
  );
}
